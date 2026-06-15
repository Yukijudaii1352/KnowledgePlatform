### ZeRO

```yaml
id: zero
name: ZeRO
full_name: 'ZeRO (ZeRO: Memory Optimizations Toward Training Trillion)'
year: '2020'
org: Microsoft
paper_url: https://arxiv.org/abs/1910.02054
category: distributed
parent: —
motivation: 优化器/梯度/参数分片存储
```

#### 📝 一句话总结

ZeRO 通过在数据并行进程之间分片优化器状态、梯度和参数，消除传统 Data Parallel 中模型状态的冗余存储，使训练显存随数据并行规模近似线性扩展，同时尽量保持数据并行的计算粒度和通信效率。

#### 🎯 核心要点

- ZeRO-DP 将数据并行中的 model states 从“每卡完整复制”改为“按 rank 分片保存”，覆盖 optimizer states、gradients、parameters 三类最大显存来源
- Stage 1 \(P_{os}\)：分片 Adam 等优化器状态，混合精度 Adam 下可达到约 4x model-state 显存降低，通信量与普通 DP 基本一致
- Stage 2 \(P_{os+g}\)：继续分片梯度，显存降低约 8x，梯度规约从 all-reduce 组织为 reduce-scatter 语义
- Stage 3 \(P_{os+g+p}\)：继续分片参数，需要前向/反向按需 all-gather 参数，model-state 显存随数据并行度 \(N_d\) 近似线性降低
- ZeRO-R 处理残余显存：partitioned activation checkpointing、constant-size buffers、memory defragmentation，避免激活、临时通信缓冲和碎片成为新瓶颈
- ZeRO 保持数据并行的高计算粒度，可与模型并行组合；论文分析显示 1024 张 GPU 可支撑 1T 参数级模型状态存储

#### 🔬 深入细节

![ZeRO-DP 三阶段显存对比](https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png)
*图：ZeRO 论文 Figure 1，对比标准数据并行和 ZeRO-DP 三个阶段的单卡 model-state 显存。*

```python
# ZeRO-DP 训练步骤伪代码，展示三阶段的核心通信/存储逻辑
def zero_train_step(model, batch, rank, world_size, stage):
    # 每个 rank 始终只拥有自己的优化器状态分片
    optimizer_state = load_optimizer_state_shard(rank)

    # Stage 3: 参数也只保留本地分片；每层计算前临时收集完整参数
    for layer in model.layers:
        if stage >= 3:
            full_param = all_gather(layer.param_shard)
        else:
            full_param = layer.full_param

        activation = layer.forward(batch, full_param)

        if stage >= 3:
            release_non_owned_param_shards(full_param, rank)

    loss = compute_loss(activation)

    for layer in reversed(model.layers):
        if stage >= 3:
            full_param = all_gather(layer.param_shard)

        grad = layer.backward(loss)

        if stage >= 2:
            grad_shard = reduce_scatter(grad)       # 梯度求和并只留下本 rank 分片
        else:
            grad_shard = all_reduce(grad)           # 普通 DP 梯度同步

        if stage >= 3:
            release_non_owned_param_shards(full_param, rank)

    # Stage 1/2/3: 只更新自己负责的参数/优化器状态分片
    updated_param_shard = optimizer_step(
        param_shard=get_param_shard(rank),
        grad_shard=grad_shard,
        optimizer_state=optimizer_state,
    )

    if stage < 3:
        all_gather_updated_params(updated_param_shard)
```

**动机与背景：大模型训练的显存瓶颈首先来自 model states，而不是参数本身。** 以混合精度 Adam 为例，训练时不仅要保存 FP16 参数和 FP16 梯度，还要保存 FP32 master parameters、momentum、variance 等优化器状态。若模型参数量为 \(\Psi\)，优化器状态 multiplier 为 \(K\)，标准数据并行每张卡都保存完整状态，model-state 显存近似为：

$$
M_{\text{DP}} = 2\Psi_{\text{param}} + 2\Psi_{\text{grad}} + K\Psi_{\text{optim}}
$$

混合精度 Adam 中 \(K=12\)，因此总量约为 \(16\Psi\) bytes。普通数据并行增加 GPU 数只增加 batch 并复制这些状态，单卡显存并不会下降；模型并行虽然能切参数，但会破坏算子粒度并引入层内通信。ZeRO 的核心判断是：数据并行已经有最好的编程模型和较大的计算粒度，真正浪费的是每个 rank 上重复保存同一份模型状态。

**ZeRO-DP 的三阶段是累积启用的显存去冗余策略。** Stage 1 \(P_{os}\) 只分片 optimizer states：每个 rank 只维护自己负责的 Adam 状态和参数更新，更新后通过 all-gather 让各 rank 得到一致参数。此时显存从 \((4+K)\Psi\) 降到：

$$
M_{P_{os}} = 4\Psi + \frac{K\Psi}{N_d}
$$

Stage 2 \(P_{os+g}\) 进一步分片梯度，反向传播结束后不再让每张卡保存完整梯度，而是通过 reduce-scatter 只保留对应分片：

$$
M_{P_{os+g}} = 2\Psi + \frac{(2+K)\Psi}{N_d}
$$

Stage 3 \(P_{os+g+p}\) 连参数也分片保存，前向和反向只在某一层需要时临时 all-gather 该层参数，用完立即释放非本地分片，最终 model-state 显存降到：

$$
M_{P_{os+g+p}} = \frac{(4+K)\Psi}{N_d}
$$

**关键机制不是“少算”，而是“只在需要时 materialize”。** 标准 DP 在整个训练 step 中静态持有完整参数、梯度和优化器状态，但 Transformer 层的参数只在该层前向和反向附近被使用。ZeRO-3 把参数视为有生命周期的临时对象：计算前 all-gather，计算后释放；梯度在反向完成后 reduce-scatter；优化器只更新本地分片。这样仍执行和普通训练等价的数学更新，但把常驻显存从“完整模型”改成“本地分片 + 当前层临时完整参数”。

**ZeRO-R 解决 ZeRO-DP 之后暴露出的残余显存问题。** 当 model states 大幅下降后，activation checkpoint、通信临时 buffer 和 CUDA 内存碎片会变得更突出。ZeRO-R 对模型并行中的激活做 partitioned activation checkpointing，避免每个 MP rank 保存重复激活；对 all-reduce 等操作使用固定大小通信 buffer，避免超大临时张量直接占满显存；同时按张量生命周期管理内存，减少“总空闲足够但没有连续块”的碎片化 OOM。

**与传统数据并行和模型并行的区别在于效率取舍。** 普通 DP 通信简单但显存完全冗余；MP/PP 能降低显存但要求模型结构切分，跨节点通信和 pipeline bubble 会降低效率。ZeRO 试图保留 DP 的用户体验和大矩阵计算粒度，只改变状态放置和通信调度。因此它特别适合把单机无法容纳的大模型扩展到多机多卡，同时仍能和 Megatron-LM 这类模型并行技术组合使用。

> 💡 关键：ZeRO 的“Zero Redundancy”不是压缩模型或改变优化器，而是把每个 rank 上不必要的重复状态移除；训练结果应与对应的数据并行优化过程保持等价。

#### 🧪 练习题

```yaml
question: "ZeRO Stage 3 相比 Stage 2 额外分片了哪一类 model state？"
options:
  - "激活值 activation"
  - "模型参数 parameters"
  - "训练样本 batch"
  - "注意力分数矩阵 attention scores"
answer: 1
explain: "Stage 2 已经分片优化器状态和梯度；Stage 3 进一步分片参数，并在每层计算前按需 all-gather。"
```
