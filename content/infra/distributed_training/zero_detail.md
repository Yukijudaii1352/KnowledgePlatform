### ZeRO: Zero Redundancy Optimizer

```yaml
id: zero
name: ZeRO
full_name: "零冗余优化器 (Zero Redundancy Optimizer)"
year: 2020
org: Microsoft
paper_url: "https://arxiv.org/abs/1910.02054"
category: dp
parent: horovod
motivation: "消除数据并行内存冗余分阶段切分状态"
```

#### 📝 一句话总结

ZeRO 通过将优化器状态、梯度和参数在数据并行进程间进行分区（而非复制），分三阶段逐步消除内存冗余，在保持数据并行通信效率的同时实现了模型并行级别的内存效率，使得仅用数据并行即可训练万亿参数模型。

#### 🎯 核心要点

- **内存分析**：混合精度 Adam 训练中每参数占用 \(16\Psi\) 字节（2Ψ fp16 参数 + 2Ψ fp16 梯度 + 12Ψ 优化器状态含 fp32 参数/动量/方差副本）
- **ZeRO-DP 三阶段**：Stage 1 切分优化器状态（\(P_{os}\)）→ 4x 省存；Stage 2 加切分梯度（\(P_{os+g}\)）→ 8x 省存；Stage 3 加切分参数（\(P_{os+g+p}\)）→ \(N_d\)x 省存
- **通信量不变/极低开销**：Stage 1+2 通信量与标准 DP 相同（\(2\Psi\)）；Stage 3 仅增加 50%（\(3\Psi\)）
- **ZeRO-R 残余内存优化**：激活分区（\(P_a\)）按 MP 度切分激活检查点；常量大小临时缓冲区；内存碎片整理
- **ZeRO-100B 实现**：Stage 1+2 + ZeRO-R，400 GPU 上高效训练 100B 参数模型，达 15 PFlops（38 TFlops/GPU）
- **线性扩展**：模型状态内存随 DP 度线性下降，理论上 1024 GPU 可支持万亿参数

#### 🔬 深入细节

##### 核心示意图

![ZeRO-DP 内存节省示意](https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png)
*图：ZeRO-DP 三阶段优化对 7.5B 参数模型内存占用的影响。基线 DP 需要 120GB，Stage 1 降至 31.4GB，Stage 1+2 降至 16.6GB，Stage 1+2+3 降至 1.9GB（Nd=64）。*

##### 算法伪代码

```python
# ZeRO-DP Stage 1+2 训练流程伪代码
# 假设 Nd 个数据并行进程，每个进程负责 1/Nd 的参数分区

def zero_dp_train_step(model, data, rank, world_size):
    # 每个进程持有完整 fp16 参数（Stage 1+2）
    # 但只持有 1/Nd 的优化器状态和梯度
    
    # Forward pass（所有进程用完整参数）
    loss = model.forward(data)
    
    # Backward pass
    loss.backward()  # 计算本地梯度
    
    # Stage 2: Reduce-Scatter 梯度
    # 每个进程只保留自己负责分区的归约梯度
    for partition_id in range(world_size):
        if partition_id == rank:
            # 归约收集本分区梯度（reduce 到本进程）
            reduce(gradients[partition_id], dst=rank)
        else:
            # 发送梯度给负责的进程后释放内存
            reduce(gradients[partition_id], dst=partition_id)
            free(gradients[partition_id])
    
    # 只更新本进程负责的 1/Nd 参数分区
    optimizer.step(params[rank], grads[rank])  # 用本地优化器状态
    
    # All-Gather 更新后的参数
    all_gather(params)  # 收集所有分区的更新参数
```

```python
# ZeRO-DP Stage 3 训练流程伪代码（额外切分参数）
def zero_dp_stage3_train_step(model, data, rank, world_size):
    # 每个进程只持有 1/Nd 的参数、梯度和优化器状态
    
    # Forward pass: 流水线式 All-Gather 参数
    for layer in model.layers:
        # 收集该层完整参数（从负责的进程广播）
        full_params = all_gather(layer.params)
        output = layer.forward(input, full_params)
        del full_params  # 用完即弃，不保留
        input = output
    
    # Backward pass: 反向再次 All-Gather
    for layer in reversed(model.layers):
        full_params = all_gather(layer.params)
        grad = layer.backward(full_params)
        del full_params
        # Reduce-Scatter 梯度到负责进程
        reduce_scatter(grad)
    
    # 更新本地 1/Nd 分区
    optimizer.step(local_params, local_grads)
```

##### 深入解释

**动机与背景**

大模型训练面临严峻的内存墙问题。以混合精度 Adam 训练为例，一个 \(\Psi\) 参数的模型需要：

$$\text{总内存} = \underbrace{2\Psi}_{\text{fp16 参数}} + \underbrace{2\Psi}_{\text{fp16 梯度}} + \underbrace{4\Psi + 4\Psi + 4\Psi}_{\text{fp32 参数副本 + 动量 + 方差}} = 16\Psi \text{ bytes}$$

对于 GPT-2（1.5B 参数），这意味着至少 24GB 内存仅用于模型状态。传统数据并行（DP）在每个 GPU 上完整复制所有 \(16\Psi\) 字节，造成巨大冗余。而模型并行（MP）虽然切分了模型状态，但通信开销大、计算粒度低、扩展性差。

> 💡 关键洞察：DP 的内存冗余来自于每个进程都存储完整的模型状态，但实际上每个进程在每一步只需要更新 \(1/N_d\) 的参数。

**ZeRO-DP 核心机制**

ZeRO-DP 的核心思想是：**保留 DP 的高计算效率和低通信量，同时通过分区（partition）而非复制（replicate）来消除内存冗余。**

**Stage 1（\(P_{os}\)）— 优化器状态分区：**

将优化器状态（fp32 参数副本 + 动量 + 方差，共 \(12\Psi\) 字节）均分到 \(N_d\) 个进程。每个进程只维护 \(1/N_d\) 的优化器状态，只更新对应的参数分区。更新后通过 All-Gather 同步完整参数。

$$\text{Stage 1 内存} = 4\Psi + \frac{12\Psi}{N_d} \xrightarrow{N_d \to \infty} 4\Psi \quad (\text{4x 节省})$$

**Stage 2（\(P_{os+g}\)）— 梯度分区：**

既然每个进程只更新 \(1/N_d\) 的参数，那它也只需要对应分区的归约梯度。因此将标准 All-Reduce 替换为 Reduce-Scatter：每个梯度只归约到负责该分区的进程，归约后立即释放其余梯度内存。

$$\text{Stage 2 内存} = 2\Psi + \frac{14\Psi}{N_d} \xrightarrow{N_d \to \infty} 2\Psi \quad (\text{8x 节省})$$

**Stage 3（\(P_{os+g+p}\)）— 参数分区：**

进一步地，每个进程只存储 \(1/N_d\) 的模型参数。前向/反向传播时，通过流水线式 All-Gather 按需获取完整层参数，用完即弃。

$$\text{Stage 3 内存} = \frac{16\Psi}{N_d} \quad (N_d\text{x 线性节省})$$

> ⚠️ 注意：Stage 3 的通信量从 \(2\Psi\) 增加到 \(3\Psi\)（前向 All-Gather \(\Psi\) + 反向 All-Gather \(\Psi\) + 梯度 Reduce-Scatter \(\Psi\)），即 1.5 倍开销，但换来了线性内存缩减。

**通信量分析**

| 方案 | 通信量 | 内存节省 | 通信原语 |
|------|--------|----------|----------|
| 标准 DP (All-Reduce) | \(2\Psi\) | 1x | Reduce-Scatter + All-Gather |
| ZeRO Stage 1+2 | \(2\Psi\) | 8x | Reduce-Scatter + All-Gather |
| ZeRO Stage 3 | \(3\Psi\) | \(N_d\)x | 2×All-Gather + Reduce-Scatter |

标准 All-Reduce 本质上就是 Reduce-Scatter + All-Gather，通信量为 \(2\Psi\)。ZeRO Stage 1+2 将 All-Reduce 拆解为：先 Reduce-Scatter 梯度（\(\Psi\)），再 All-Gather 更新后的参数（\(\Psi\)），总量完全相同。

**ZeRO-R 残余内存优化**

除模型状态外，训练还消耗大量内存用于：

1. **激活内存**（\(P_a\)）：MP 中激活被复制到所有 MP 进程。ZeRO 将激活检查点按 MP 度分区，需要时通过 All-Gather 重建。对于 100B 模型（MP=16），激活从 33GB 降至约 2GB。
2. **临时缓冲区**（\(C_B\)）：All-Reduce 等操作的临时缓冲区随模型增大而膨胀。ZeRO 使用固定大小缓冲区。
3. **内存碎片**（\(M_D\)）：短生命周期（激活）和长生命周期（梯度）对象交错分配导致碎片。ZeRO 将长生命周期对象预分配到连续内存块。

**与传统方法的对比**

| 维度 | 标准 DP | 模型并行 (MP) | ZeRO-DP |
|------|---------|---------------|---------|
| 内存效率 | 差（全复制） | 好（切分） | 好（切分） |
| 计算粒度 | 高 | 低（切分计算） | 高 |
| 通信量 | \(2\Psi\) | 随模型/硬件变化 | \(2\Psi\) ~ \(3\Psi\) |
| 扩展性 | 好 | 差（跨节点） | 好 |
| 易用性 | 高（无需改模型） | 低（需重构） | 高（无需改模型） |

> 💡 关键：ZeRO 证明了"内存效率"和"通信效率"并非不可兼得——通过巧妙利用模型状态的时序特性（不是所有状态在所有时刻都需要），可以在几乎不增加通信的前提下大幅降低内存。

#### 🧪 练习题

```yaml
question: "ZeRO-DP Stage 2 (Pos+g) 相比标准数据并行，通信量变化如何？"
options:
  - "通信量减少为原来的 1/Nd"
  - "通信量保持不变，仍为 2Ψ"
  - "通信量增加 50%，变为 3Ψ"
  - "通信量翻倍，变为 4Ψ"
answer: 1
explain: "Stage 1+2 将 All-Reduce 拆解为 Reduce-Scatter（Ψ）+ All-Gather（Ψ）= 2Ψ，与标准 DP 的 All-Reduce 通信量完全相同，但内存节省 8 倍。"
```