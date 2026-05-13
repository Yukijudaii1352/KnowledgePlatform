### DeepSpeed ZeRO

```yaml
id: deepspeed
name: DeepSpeed ZeRO
full_name: DeepSpeed ZeRO
year: "2020"
org: Microsoft
paper_url: https://arxiv.org/abs/1910.02054
category: training_platform
parent: megatron_lm
motivation: 消除冗余状态突破显存限制
```

#### 📝 一句话总结

ZeRO（Zero Redundancy Optimizer）通过将优化器状态、梯度和参数在数据并行进程间分区而非复制，消除了数据并行训练中的内存冗余，在不牺牲通信效率的前提下实现了与设备数量成线性比例的显存节省，使得在 1024 块 GPU 上训练万亿参数模型成为可能。

#### 🎯 核心要点

- **三阶段渐进式内存优化（ZeRO-DP）**：Stage 1 分区优化器状态（4× 节省）、Stage 2 叠加分区梯度（8× 节省）、Stage 3 叠加分区参数（线性于 \(N_d\) 倍节省）
- **通信量几乎不增加**：Stage 1+2 通信量与标准数据并行相同（\(2\Psi\)）；Stage 3 仅增加 50%（\(3\Psi\)）
- **混合精度训练内存分析**：系统量化了 Adam + fp16 训练中优化器状态（fp32 参数副本 + 动量 + 方差 = \(12\Psi\) 字节）占主导的内存消耗
- **ZeRO-R 优化残余内存**：包括激活值分区（\(P_a\)）、固定大小临时缓冲区（\(C_B\)）和主动内存碎片整理（\(M_D\)）
- **超线性加速**：100B 参数模型在 400 GPU 上实现超线性加速，达到 15 PFlops 吞吐
- **无需模型并行即可训练 13B 参数模型**，降低了大模型训练的工程门槛
- **Turing-NLG 17B**：利用 ZeRO 训练了当时最大的语言模型，刷新准确率记录

#### 🔬 深入细节

![ZeRO-DP 三阶段内存对比](https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png)
*图：以 7.5B 参数模型、64 路数据并行为例，展示基线 DP 与 ZeRO 三个阶段（\(P_{os}\)、\(P_{os+g}\)、\(P_{os+g+p}\)）的显存消耗对比。基线需要 120GB/GPU，ZeRO Stage 3 仅需 1.9GB/GPU。*

```python
# ZeRO-DP 三阶段训练伪代码
# 假设 Nd 个数据并行进程，模型参数 Ψ，每个进程负责第 rank 个分区

# ===== Stage 1: 优化器状态分区 (P_os) =====
# 每个进程仅持有 1/Nd 的优化器状态（fp32 参数副本 + momentum + variance）
for step in training_steps:
    loss = forward(model, micro_batch)        # 前向：所有进程持有完整参数
    loss.backward()                           # 反向：计算完整梯度
    all_reduce(gradients)                     # 全规约梯度（与标准 DP 相同）
    # 每个进程仅更新自己负责的 1/Nd 参数分区
    optimizer.step(params[rank_start:rank_end])
    all_gather(params)                        # 收集更新后的完整参数

# ===== Stage 2: + 梯度分区 (P_os+g) =====
for step in training_steps:
    loss = forward(model, micro_batch)
    # 反向传播中，每层梯度就绪后立即 reduce-scatter（而非 all-reduce）
    for layer in reversed(model.layers):
        grad = layer.backward()
        reduce_scatter(grad)                  # 每个进程仅保留自己分区的已规约梯度
        # 非本分区的梯度内存立即释放
    optimizer.step(params[rank_start:rank_end])
    all_gather(params)

# ===== Stage 3: + 参数分区 (P_os+g+p) =====
for step in training_steps:
    # 前向：按需广播参数
    for layer in model.layers:
        all_gather(layer.params)              # 从各进程收集该层完整参数
        output = layer.forward(input)
        # 非本分区的参数用完即释放
    # 反向：同样按需广播参数
    for layer in reversed(model.layers):
        all_gather(layer.params)              # 再次收集完整参数用于梯度计算
        grad = layer.backward()
        reduce_scatter(grad)
    optimizer.step(params[rank_start:rank_end])
    # 无需最终 all_gather——参数始终按需获取
```

##### 动机与背景：数据并行的内存瓶颈

训练超大模型的核心挑战在于**单设备显存不足**。现有解决方案主要有两类：

1. **模型并行（MP）**：将模型按层或按张量切分到多个设备。虽然能减少单卡显存，但带来大量跨设备通信，且实现复杂、通用性差。Megatron-LM 的张量并行在超过单节点（通常 8 GPU）后效率急剧下降。
2. **数据并行（DP）**：每个设备持有完整模型副本，仅切分数据。通信效率高，但**每张卡都冗余存储了完整的模型状态**。

论文首先对混合精度训练（fp16 参数 + fp32 Adam 优化器）的内存消耗进行了精确量化。对于参数量为 \(\Psi\) 的模型：

$$\text{总内存} = \underbrace{2\Psi}_{\text{fp16 参数}} + \underbrace{2\Psi}_{\text{fp16 梯度}} + \underbrace{4\Psi + 4\Psi + 4\Psi}_{K\Psi = 12\Psi \text{ (fp32 参数副本 + 动量 + 方差)}} = 16\Psi \text{ 字节}$$

> 💡 **关键洞察**：优化器状态占据了 75% 的显存（\(12\Psi / 16\Psi\)），而在标准数据并行中这些状态在每个 GPU 上完全冗余复制。这正是 ZeRO 的突破口。

以 GPT-2（1.5B 参数）为例，仅模型状态就需要 24GB，已超出当时主流 GPU（16–32GB）的容量。而 1.4B 参数是标准 DP 在 32GB GPU 上的极限。

##### 核心机制：ZeRO-DP 三阶段分区

ZeRO-DP 的核心思想极为简洁：**既然数据并行中每个进程最终只需要更新 \(1/N_d\) 的参数，那么每个进程也只需要存储对应的 \(1/N_d\) 优化器状态和梯度**。

**Stage 1 — 优化器状态分区（\(P_{os}\)）**：将 Adam 的 fp32 参数副本、一阶动量和二阶方差均匀分成 \(N_d\) 份，第 \(i\) 个进程仅存储和更新第 \(i\) 份。前向和反向仍使用完整参数和梯度（通过标准 all-reduce 同步梯度），更新后通过 all-gather 收集完整参数。内存从 \(4\Psi + 12\Psi = 16\Psi\) 降至 \(4\Psi + 12\Psi/N_d\)，当 \(N_d\) 较大时约为 \(4\Psi\)，实现 **4× 节省**。通信量不变，仍为 \(2\Psi\)（all-reduce = reduce-scatter + all-gather）。

**Stage 2 — 梯度分区（\(P_{os+g}\)）**：既然每个进程只更新 \(1/N_d\) 的参数，那么它只需要对应分区的规约后梯度。因此将 all-reduce 替换为 **reduce-scatter**：反向传播中每层梯度就绪后，立即通过 reduce-scatter 将不同分区的梯度规约到对应进程，非本分区的梯度内存随即释放。内存进一步降至 \(2\Psi/N_d + 12\Psi/N_d\)（加上 \(2\Psi\) 的 fp16 参数），实现 **8× 节省**。通信量仍为 \(2\Psi\)（reduce-scatter \(\Psi\) + all-gather \(\Psi\)），与标准 DP 完全相同。

> ⚠️ **注意**：实现中使用固定大小的桶（bucket）来批量执行 reduce-scatter，在梯度就绪后先写入桶缓冲区，桶满后一次性通信，以提高带宽利用率。

**Stage 3 — 参数分区（\(P_{os+g+p}\)）**：每个进程仅存储 \(1/N_d\) 的 fp16 参数。前向和反向传播中，当需要某一层的完整参数时，通过 all-gather 从各进程临时收集，计算完成后立即丢弃非本分区的参数。总内存降至 \(16\Psi/N_d\)，**与 \(N_d\) 成线性比例**。通信量增加到 \(3\Psi\)（前向 all-gather \(\Psi\) + 反向 all-gather \(\Psi\) + 反向 reduce-scatter \(\Psi\)），相比基线的 \(2\Psi\) 仅增加 **50%**。

$$\text{Stage 3 通信量} = \underbrace{\Psi}_{\text{前向 all-gather}} + \underbrace{\Psi}_{\text{反向 all-gather}} + \underbrace{\Psi}_{\text{反向 reduce-scatter}} = 3\Psi = 1.5 \times 2\Psi$$

##### ZeRO-R：残余内存优化

在 ZeRO-DP 大幅削减模型状态内存后，激活值、临时缓冲区和内存碎片成为次要瓶颈。ZeRO-R 提供三项互补优化：

1. **激活值分区（\(P_a\)）**：结合激活检查点（activation checkpointing）技术，将检查点激活值在数据并行组间分区存储，需要时通过 all-gather 恢复。对于超大模型，还可将激活值卸载到 CPU 内存。
2. **固定大小缓冲区（\(C_B\)）**：标准实现中 all-reduce 等操作会将所有梯度融合为一个巨大的扁平缓冲区（如 1.5B 参数模型的 fp32 缓冲区需 6GB）。ZeRO-R 使用固定大小的缓冲区，在保证通信效率的同时避免内存爆炸。
3. **内存碎片整理（\(M_D\)）**：训练过程中频繁的内存分配/释放导致碎片化，即使总空闲内存充足也可能因缺乏连续空间而 OOM（观察到 30% 以上可用内存无法使用的极端情况）。ZeRO-R 通过预分配连续内存块并主动管理张量生命周期来缓解碎片问题。

##### 与传统方法的对比

| 维度 | 标准数据并行 | 模型并行 (Megatron) | ZeRO-DP |
|------|-------------|-------------------|---------|
| 单卡内存 | \(16\Psi\)（完全冗余） | \(\sim 16\Psi/N_m\) | \(16\Psi/N_d\)（Stage 3） |
| 通信量 | \(2\Psi\) | \(\mathcal{O}(\Psi \cdot \text{layers})\) | \(2\Psi\) ~ \(3\Psi\) |
| 可扩展性 | 受单卡内存限制 | 受节点内带宽限制 | 线性扩展至千卡 |
| 实现复杂度 | 低 | 高（需改模型代码） | 低（优化器层面） |
| 最大模型 | ~1.4B (32GB GPU) | ~20B (跨节点效率低) | 万亿级 |

> 💡 **关键优势**：ZeRO 与模型并行正交，可以组合使用。实验中 ZeRO + Megatron 张量并行在 400 GPU 上训练 100B 参数模型达到 15 PFlops，实现超线性加速（因为更大的分区使每卡 batch 更适配 GPU 计算特性）。

#### 🧪 练习题

```yaml
question: "ZeRO-DP Stage 2 (P_os+g) 将标准数据并行的 all-reduce 操作替换为了什么？"
options:
  - "all-gather + broadcast"
  - "reduce-scatter + all-gather"
  - "仅 reduce-scatter"
  - "ring all-reduce + reduce"
answer: 1
explain: "Stage 2 在反向传播中用 reduce-scatter 替代 all-reduce 的前半部分，使每个进程仅保留自己分区的规约梯度；更新后再通过 all-gather 收集完整参数。总通信量 = reduce-scatter(Ψ) + all-gather(Ψ) = 2Ψ，与标准 all-reduce 相同。"
```