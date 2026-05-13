### Parallel Folding (MoE Parallel Folding)

```yaml
id: parallel_folding
name: Parallel Folding
full_name: MoE Parallel Folding
year: 2025
org: NVIDIA
paper_url: https://arxiv.org/abs/2505.05662
category: distributed_learning
parent: —
motivation: 解耦attention和MoE层的并行配置，打破EP≤DP约束
```

#### 📝 一句话总结

MoE Parallel Folding 通过解耦 attention 层和 MoE 层的并行度映射，使两者可以独立选择最优并行配置（attention 用高 TP/CP，MoE 用高 EP），从根本上打破了传统框架中 EP ≤ DP 的约束，实现了 MoE 模型在数千 GPU 上的高效分布式训练。

#### 🎯 核心要点

- **解决 Dense-Sparse Mismatch**：attention 层（密集）和 MoE 层（稀疏）具有冲突的最优并行配置，Parallel Folding 允许两者独立优化
- **打破 EP ≤ DP 约束**：传统框架中 EP 必须是 DP 的子集，Parallel Folding 允许 EP "折叠"跨越 TP×CP×DP 组，EP 可达 TP×CP×DP
- **双重并行度规格**：attention 使用 (TP, CP, DP, PP)，MoE 使用 (ETP, EP, EDP, PP)，仅要求 TP×CP×DP = ETP×EP×EDP 且 PP 一致
- **降低最小 GPU 需求**：传统 CP=8, EP=8 需至少 64 GPU，Folding 下 CP 和 EP 共享 GPU 组仅需 8 GPU
- **NVLink 域内通信**：CP（attention 的 all-to-all）和 EP（MoE 的 all-to-all）均可保持在 NVLink 连接的 GPU 组内
- **集成 Distributed Optimizer 和 FSDP**：与 EP 兼容的分布式优化器和全分片数据并行进一步降低内存占用

#### 🔬 深入细节

![Parallel Folding 架构示意图](https://arxiv.org/abs/2505.05662)
*图：Parallel Folding 将 attention 和 MoE 的并行度映射解耦，允许在同一组 GPU 上使用不同的并行策略（论文 Figure 5 & 6）。详见原论文 Figure 5（传统 vs Folding 对比）和 Figure 6（解耦映射示意）。*

##### 算法核心逻辑

```python
# Parallel Folding 配置伪代码
# 传统方式：attention 和 MoE 共享同一并行配置
# traditional: TP=4, CP=2, DP=8, PP=4 → EP ≤ DP = 8

# Parallel Folding：解耦配置
attention_config = {
    "TP": 4,   # Tensor Parallelism: 分片 QKV/projection 大矩阵
    "CP": 2,   # Context Parallelism: 分布长序列
    "DP": 8,   # Data Parallelism: 处理不同 batch
    "PP": 4    # Pipeline Parallelism: 按层切分模型
}
# Total GPUs per stage = TP × CP × DP = 4 × 2 × 8 = 64

moe_config = {
    "ETP": 1,   # Expert Tensor Parallelism: 专家内分片（通常=1）
    "EP": 64,   # Expert Parallelism: 跨 GPU 分布专家
    "EDP": 1,   # Expert Data Parallelism: 专家副本
    "PP": 4     # Pipeline Parallelism: 必须与 attention 一致
}
# Total GPUs per stage = ETP × EP × EDP = 1 × 64 × 1 = 64 ✓

# 约束条件：
assert attention_config["TP"] * attention_config["CP"] * attention_config["DP"] == \
       moe_config["ETP"] * moe_config["EP"] * moe_config["EDP"]
assert attention_config["PP"] == moe_config["PP"]

# 执行流程：
# 1. Attention 层：按 (TP=4, CP=2, DP=8) 映射到 GPU 组
# 2. Token Routing：将 token 按 router 决策分发到目标专家
# 3. MoE 层：按 (ETP=1, EP=64, EDP=1) 重新映射同一组 GPU
# 4. 返回 attention 映射继续下一层
```

##### 动机与背景：Dense-Sparse Mismatch

MoE（Mixture-of-Experts）模型的核心特征是**条件计算**：每个 token 仅激活少量专家（如 Top-K routing），使模型参数量可以极大扩展而计算量仅线性增长。然而，这种稀疏性带来了分布式训练中的根本矛盾——**Dense-Sparse Mismatch**：

1. **Attention 层是密集的**：所有参数参与每个 token 的计算。最优策略是高 Tensor Parallelism（TP）来分片大矩阵，高 Context Parallelism（CP）来处理长序列。

2. **MoE 层是稀疏的**：每个专家独立且较小。最优策略是高 Expert Parallelism（EP）将专家分布到不同 GPU，而 Expert Tensor Parallelism（ETP）通常设为 1 以保持单个专家的完整 GEMM 效率。

传统框架（如早期 Megatron-LM）强制 attention 和 MoE 共享同一并行配置，导致 EP 被限制为 DP 的子集（EP ≤ DP）。这意味着：
- 若 attention 需要高 TP（如 TP=8），则 DP 被压缩，EP 上限也被压缩
- 无法同时满足 attention 的高 TP 需求和 MoE 的高 EP 需求

> 💡 **关键洞察**：attention 和 MoE 层虽然在同一模型中交替出现，但它们的计算特性完全不同，不应被迫使用相同的并行策略。

##### 核心机制：Parallel Folding 的设计

Parallel Folding 的核心思想是**在同一组物理 GPU 上，为 attention 和 MoE 层分别定义独立的并行度映射**：

**Attention 并行度**：\(\text{TP} \times \text{CP} \times \text{DP} \times \text{PP}\)

- **TP（Tensor Parallelism）**：将 QKV 和 projection 的大权重矩阵按列/行切分
- **CP（Context Parallelism）**：将长序列分段分配到不同 GPU
- **DP（Data Parallelism）**：不同 GPU 处理不同 mini-batch

**MoE 并行度**：\(\text{ETP} \times \text{EP} \times \text{EDP} \times \text{PP}\)

- **ETP（Expert Tensor Parallelism）**：专家内部的权重分片（通常为 1）
- **EP（Expert Parallelism）**：将不同专家分配到不同 GPU
- **EDP（Expert Data Parallelism）**：专家的数据并行副本

**唯一约束**：

$$\text{TP} \times \text{CP} \times \text{DP} = \text{ETP} \times \text{EP} \times \text{EDP}$$

且 PP 必须在两者间保持一致（确保正确的层间数据流）。

这种设计之所以可行，是因为 attention 和 MoE 层在 Transformer 中**交替执行**，不会同时运行。因此同一组 GPU 可以在执行 attention 时使用一种并行映射，在执行 MoE 时切换到另一种映射。

##### 为什么这样设计有效

考虑一个具体例子：256 GPU，attention 配置为 TP=4, CP=2, DP=8, PP=4：

| 方案 | Attention 配置 | MoE 配置 | 最大 EP |
|------|-----------|-----|---------|
| 传统 | TP=4, CP=2, DP=8, PP=4 | 共享配置，EP ≤ DP | EP ≤ 8 |
| Parallel Folding | TP=4, CP=2, DP=8, PP=4 | ETP=1, EP=64, EDP=1, PP=4 | EP = 64 |

Parallel Folding 将 EP 从最大 8 提升到 64（**8× 提升**），因为 EP 可以"折叠"跨越整个 TP×CP×DP = 64 的 GPU 组。

各并行维度的作用总结：

| 维度 | 适用层 | 作用 |
|------|--------|------|
| TP (Tensor) | Attention | 分片大 QKV/projection 矩阵 |
| CP (Context) | Attention | 分布长序列 |
| DP (Data) | Attention | 处理不同 batch |
| PP (Pipeline) | 两者 | 按层切分模型（必须一致） |
| EP (Expert) | MoE | 跨 GPU 分布专家 |
| ETP (Expert Tensor) | MoE | 专家内分片（通常=1） |
| EDP (Expert Data) | MoE | 专家副本提升吞吐 |

##### 与传统方法的区别

| 特性 | 传统框架 | Parallel Folding |
|------|----------|-----------------|
| 并行配置 | attention 和 MoE 共享 | 独立配置 |
| EP 上限 | EP ≤ DP | EP ≤ TP×CP×DP |
| 最小 GPU 需求 | CP×EP 个 GPU | max(CP, EP) 个 GPU |
| 通信优化 | 受限于共享配置 | 各自优化到 NVLink 域 |
| GEMM 效率 | MoE 可能需要不必要的 ETP | ETP=1 保持完整专家宽度 |

> ⚠️ **注意**：Parallel Folding 要求在 attention→MoE 和 MoE→attention 的过渡点进行通信重组（token redistribution），但由于这些通信可以与计算重叠，且保持在 NVLink 域内，实际开销很小。

##### 配合的内存优化

Parallel Folding 还集成了两种内存优化策略：

1. **Distributed Optimizer + EP**：每个 rank 仅保存本地专家的权重和梯度，优化器状态通过 EDP 在同一专家的副本间分片，消除非本地专家的冗余内存。

2. **FSDP + EP（Megatron-FSDP）**：通过双 DeviceMesh 架构，在数据/专家组间全分片参数、梯度和优化器状态，同时将 AllGather 和 ReduceScatter 与计算重叠。兼容 TP/EP/CP 和混合精度（BF16, FP8, FP4）。

##### 四大核心优势

1. **打破 EP ≤ DP 约束**：EP 可折叠跨越 TP×CP×DP 组，实现数量级更高的专家并行度
2. **降低最小 GPU 需求**：CP 和 EP 共享 GPU 组而非相乘，大幅降低入门门槛
3. **独立优化**：attention 可用高 TP 处理大矩阵，MoE 可用 ETP=1 保持完整专家宽度和更好的 GEMM 效率
4. **高带宽通信局部性**：CP（attention）和 EP（MoE）的 all-to-all 通信均可保持在 NVLink 连接的 GPU 组内，避免跨节点慢速传输

#### 🧪 练习题

```yaml
question: "在 Parallel Folding 中，若 attention 配置为 TP=8, CP=4, DP=4, PP=2（共 256 GPU），MoE 层最大可支持的 EP 值是多少？"
options:
  - "4（等于 DP）"
  - "32（等于 CP×DP）"
  - "128（等于 TP×CP×DP）"
  - "256（等于总 GPU 数）"
answer: 2
explain: "Parallel Folding 允许 EP 折叠跨越整个 TP×CP×DP 组，因此最大 EP = TP×CP×DP = 8×4×4 = 128（当 ETP=1, EDP=1 时）。PP 必须保持一致不参与折叠。"
```