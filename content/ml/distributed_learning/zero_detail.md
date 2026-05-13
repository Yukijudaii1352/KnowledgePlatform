### ZeRO

```yaml
id: zero
name: ZeRO
full_name: "零冗余优化器 (Zero Redundancy Optimizer)"
year: "2020"
org: "Microsoft"
paper_url: "https://arxiv.org/abs/1910.02054"
category: "distributed_learning"
parent: "—"
motivation: "通过消除数据并行中的内存冗余，在保持通信效率的同时实现超大模型训练"
```

#### 📝 一句话总结

ZeRO 通过将优化器状态、梯度和模型参数在数据并行进程间进行分区（而非复制），消除了数据并行训练中的内存冗余，使得在保持接近线性扩展效率的同时，能够训练超过 1000 亿参数的模型。

#### 🎯 核心要点

- 识别出数据并行中的核心内存瓶颈：模型状态（优化器状态 + 梯度 + 参数）占据绝大部分显存，且在每个进程中完全冗余复制
- ZeRO-DP 三阶段渐进式优化：Stage 1 分区优化器状态（\(P_{os}\)）、Stage 2 分区梯度（\(P_{os+g}\)）、Stage 3 分区参数（\(P_{os+g+p}\)）
- 内存效率：混合精度 Adam 下，从每设备 \(16\Psi\) 字节降至 Stage 1 的 \(4\Psi + \frac{12\Psi}{N_d}\)、Stage 2 的 \(2\Psi + \frac{14\Psi}{N_d}\)、Stage 3 的 \(\frac{16\Psi}{N_d}\)
- 通信效率：Stage 1 和 Stage 2 通信量与标准数据并行相同（\(2\Psi\)），Stage 3 仅增加 50%（\(3\Psi\)）
- ZeRO-R 优化残余内存：激活值分区（activation partitioning）、恒定大小通信缓冲区（constant size buffer）、内存碎片整理（memory defragmentation）
- 实验验证：成功训练 1000 亿参数模型，在 400 张 GPU 上实现超过 15 PetaFlops 吞吐量，超线性加速比

#### 🔬 深入细节

##### 核心示意图

![ZeRO-DP 三阶段内存消耗对比](https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png)
*图：ZeRO-DP 三个阶段的每设备内存消耗对比。以 7.5B 参数模型、64 张 GPU（\(N_d=64\)）为例，展示了从基线数据并行的 120GB 逐步降低到 Stage 3 的 1.9GB 的过程。*

##### 算法伪代码

```python
# ZeRO-DP Stage 1 (Pos): 优化器状态分区
# 每个进程 rank_i 只维护 1/Nd 的优化器状态

def zero_dp_stage1_training_step(model, data, Nd, rank):
    # Forward pass (每个进程持有完整模型参数副本)
    loss = model.forward(data)
    
    # Backward pass (每个进程计算完整梯度)
    gradients = loss.backward()  # 大小: Ψ
    
    # Reduce-Scatter: 每个进程获得自己负责分区的聚合梯度
    my_grad_partition = reduce_scatter(gradients)  # 大小: Ψ/Nd
    
    # 每个进程只更新自己负责的参数分区
    my_param_partition = optimizer_step(
        my_grad_partition, 
        my_optimizer_states  # 大小: 12Ψ/Nd (Adam: fp32参数+动量+方差)
    )
    
    # All-Gather: 收集所有进程更新后的参数，重建完整模型
    all_params = all_gather(my_param_partition)  # 每个进程获得完整 Ψ
    model.update_params(all_params)

# ZeRO-DP Stage 3 (Pos+g+p): 全分区
def zero_dp_stage3_forward_backward(model, data, Nd, rank):
    # Forward: 逐层 All-Gather 参数 → 计算 → 丢弃非本分区参数
    for layer in model.layers:
        full_params = all_gather(layer.my_partition)  # 临时获取完整层参数
        activation = layer.forward(input, full_params)
        discard(full_params - layer.my_partition)     # 释放非本分区
    
    # Backward: 逐层反向 All-Gather 参数 → 计算梯度 → Reduce-Scatter 梯度
    for layer in reversed(model.layers):
        full_params = all_gather(layer.my_partition)
        grad = layer.backward(activation, full_params)
        my_grad_partition = reduce_scatter(grad)      # 只保留本分区梯度
        discard(full_params - layer.my_partition)
    
    # 每个进程用本分区梯度更新本分区优化器状态和参数
    optimizer_step(my_grad_partition, my_optimizer_states)
```

##### 方法深入解释

**动机与背景：数据并行的内存冗余问题**

当前大模型训练主要依赖数据并行（DP）和模型并行（MP）。模型并行虽能减少每设备内存，但受限于计算/通信比，通常只能在单节点内高效扩展（如 Megatron-LM 最多 8-way MP）。数据并行虽然通信效率高、扩展性好，但每个进程都持有完整的模型状态副本——这在大模型场景下造成了巨大的内存浪费。

以混合精度训练 + Adam 优化器为例，对于参数量为 \(\Psi\) 的模型，每个 DP 进程需要存储：
- fp16 模型参数：\(2\Psi\) 字节
- fp16 梯度：\(2\Psi\) 字节  
- fp32 优化器状态（Adam）：\(12\Psi\) 字节（fp32 参数副本 \(4\Psi\) + fp32 动量 \(4\Psi\) + fp32 方差 \(4\Psi\)）

总计每设备需 \(16\Psi\) 字节。一个 GPT-2 级别的 1.5B 参数模型就需要 24GB，而 GPT-3 级别的 175B 参数模型则需要 2.8TB——远超单卡显存。关键观察是：**这些内存在所有 DP 进程中完全冗余复制**。

> 💡 关键洞察：数据并行中，每个进程在任意时刻只需要完整参数做前向/反向计算，而优化器状态只在参数更新时使用，且每个参数的更新是独立的——这为分区提供了天然基础。

**核心机制：ZeRO-DP 三阶段渐进分区**

ZeRO-DP 的核心思想是：将模型状态按参数维度均匀分区到 \(N_d\) 个数据并行进程中，每个进程只存储 \(1/N_d\) 的状态，需要时通过集合通信临时获取。

**Stage 1 — 优化器状态分区（\(P_{os}\)）**：每个进程只保留 \(1/N_d\) 的优化器状态。反向传播后，通过 Reduce-Scatter 操作让每个进程获得其负责分区的聚合梯度，然后各自更新本分区参数，最后通过 All-Gather 同步更新后的完整参数。内存从 \(4\Psi + 12\Psi = 16\Psi\) 降至 \(4\Psi + \frac{12\Psi}{N_d}\)。当 \(N_d = 64\) 时，约为 \(4.19\Psi\)，实现约 **4 倍**内存节省。

**Stage 2 — 梯度分区（\(P_{os+g}\)）**：在 Stage 1 基础上，梯度也只保留本分区部分。由于每个进程只需要本分区的聚合梯度来更新本分区参数，反向传播中一旦某层梯度被 Reduce-Scatter 完成，非本分区的梯度即可释放。内存降至 \(2\Psi + \frac{14\Psi}{N_d}\)，约 **8 倍**节省。

**Stage 3 — 参数分区（\(P_{os+g+p}\)）**：连模型参数也分区存储。前向和反向传播时，通过 All-Gather 临时获取当前层的完整参数，计算完成后立即释放。内存降至 \(\frac{16\Psi}{N_d}\)，实现与 \(N_d\) 成线性的内存缩减。

> ⚠️ 注意：Stage 1 和 Stage 2 的通信量与标准数据并行完全相同（\(2\Psi\) 元素），因为标准 All-Reduce 本质上等价于 Reduce-Scatter + All-Gather。Stage 3 额外增加一次 All-Gather（前向传播时），总通信量为 \(3\Psi\)，仅增加 50%。

**通信量分析**

标准数据并行使用 All-Reduce 同步梯度，通信量为 \(2\Psi\)（Reduce-Scatter \(\Psi\) + All-Gather \(\Psi\)）。

$$\text{Stage 1/2 通信量} = \underbrace{\Psi}_{\text{Reduce-Scatter 梯度}} + \underbrace{\Psi}_{\text{All-Gather 参数}} = 2\Psi$$

$$\text{Stage 3 通信量} = \underbrace{\Psi}_{\text{All-Gather (前向)}} + \underbrace{\Psi}_{\text{All-Gather (反向)}} + \underbrace{\Psi}_{\text{Reduce-Scatter 梯度}} = 3\Psi$$

**ZeRO-R：残余内存优化**

除模型状态外，激活值（activations）、临时缓冲区和内存碎片也消耗大量显存。ZeRO-R 提出三项互补优化：

1. **激活值分区（\(P_a\)）**：将激活值的 checkpoint 也按 DP 进程分区存储，需要时通过 All-Gather 重建。配合激活重计算（activation checkpointing），可将激活内存从 \(O(layers \times hidden)\) 降至 \(O(layers \times hidden / N_d)\)。

2. **恒定大小缓冲区（\(C_B\)）**：大模型中 All-Reduce 等操作常需要与模型大小成正比的临时融合缓冲区。ZeRO-R 使用固定大小的缓冲区，在效率和内存间取得平衡。

3. **内存碎片整理（\(M_D\)）**：训练过程中频繁的内存分配/释放导致碎片化，即使总空闲内存充足也可能 OOM。ZeRO-R 通过预分配连续内存块并动态管理子分配来解决此问题。

**与传统方法的对比**

| 维度 | 标准数据并行 | 模型并行 (Megatron) | ZeRO-DP |
|------|-------------|-------------------|---------|
| 内存效率 | 差（完全冗余） | 好（按层/张量切分） | 极好（线性缩减） |
| 通信效率 | 好（\(2\Psi\)） | 差（\(O(hidden \times batch)\) 每层） | 好（\(2\Psi\) ~ \(3\Psi\)） |
| 扩展性 | 受内存限制 | 受通信限制（≤8 GPU） | 可扩展至数千 GPU |
| 实现复杂度 | 低 | 高（需改模型代码） | 中（对用户透明） |

> 💡 关键优势：ZeRO 实现了"鱼与熊掌兼得"——既获得了模型并行级别的内存效率，又保持了数据并行的通信效率和易用性。

#### 🧪 练习题

```yaml
question: "ZeRO-DP Stage 2 相比标准数据并行，通信量如何变化？"
options:
  - "减少为原来的 1/Nd"
  - "保持不变，仍为 2Ψ"
  - "增加 50%，变为 3Ψ"
  - "增加 100%，变为 4Ψ"
answer: 1
explain: "Stage 1 和 Stage 2 将标准 All-Reduce 分解为等价的 Reduce-Scatter + All-Gather，总通信量仍为 2Ψ，与标准数据并行完全相同。只有 Stage 3 因前向传播额外需要 All-Gather 参数才增加到 3Ψ。"
```