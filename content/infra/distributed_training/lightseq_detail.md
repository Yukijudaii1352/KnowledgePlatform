### LightSeq

```yaml
id: lightseq
name: "LightSeq"
full_name: "LightSeq: Sequence Level Parallelism for Distributed Training of Long Context Transformers"
year: "2023"
org: "UC Berkeley, UCSD, CMU"
paper_url: "https://arxiv.org/abs/2310.03294"
category: "infra"
parent: "—"
motivation: "通过序列级并行和通信优化实现超长序列（百万级token）LLM高效分布式训练"
```

#### 📝 一句话总结

LightSeq 提出了基于序列级并行的分布式注意力机制 DistAttn，结合负载均衡策略和重计算感知检查点技术，将长序列训练的通信量降低 4.7 倍，实现了百万级 token 序列的高效分布式训练。

#### 🎯 核心要点

- 提出 DistAttn（Distributed Attention）：沿序列维度分区注意力计算，支持任意注意力机制（causal/non-causal/多种 mask）
- 通信量仅为 \(3Nd\)（N=序列长度，d=隐藏维度），相比 Ring Attention 的 \(14Nd\) 降低 4.7 倍
- 负载均衡策略：针对 causal attention 的三角形计算不均衡问题，通过 token 重排实现均匀分配
- 重计算感知检查点（Rematerialization-aware Checkpointing）：利用通信与计算重叠隐藏通信开销
- 在 Megatron-LM 基础上实现，支持与 tensor/pipeline/data parallelism 正交组合
- 在 32 个 A100 GPU 上相比 Megatron-LM 实现最高 2.01 倍加速，支持序列长度达 2M tokens

#### 🔬 深入细节

![LightSeq DistAttn 示意图](https://arxiv.org/html/2310.03294v2/extracted/5909850/figures/distattn.png)
*图：DistAttn 分布式注意力机制示意，展示序列分区后的 Q、K、V 通信与计算流程*

```python
# DistAttn 核心伪代码
# 输入：本地 Q_local, K_local, V_local（序列已按 N/P 分区到 P 个 GPU）

# 步骤 1: All-to-All 通信收集完整 K, V
K_full = all_gather(K_local)  # 收集所有 GPU 的 K 分片
V_full = all_gather(V_local)  # 收集所有 GPU 的 V 分片

# 步骤 2: 本地计算注意力（仅对本地 Q 分片）
O_local = FlashAttention(Q_local, K_full, V_full)

# 步骤 3: 输出无需额外通信，直接用于后续 FFN
# 总通信量：forward 2Nd (gather K,V) + backward Nd (scatter dQ) = 3Nd
```

**动机与背景**

随着大语言模型对长上下文能力的需求急剧增长（如 100K+ token 的文档理解、代码生成），传统的 tensor parallelism 和 data parallelism 面临严重瓶颈：

1. **内存瓶颈**：注意力机制的内存复杂度为 \(O(N^2)\)，即使使用 FlashAttention 降至 \(O(N)\)，单 GPU 仍无法容纳超长序列的激活值
2. **通信瓶颈**：Ring Attention 虽然支持序列并行，但需要在环形拓扑中逐步传递 KV 块，通信量高达 \(14Nd\)
3. **负载不均**：Causal attention 的下三角 mask 导致不同位置的 token 计算量差异巨大

> 💡 关键：LightSeq 的核心洞察是——在序列并行中，Q 不需要通信（每个 GPU 只计算自己的 Q 对应的输出），只需收集完整的 K 和 V。

**核心机制：DistAttn**

DistAttn 的设计基于以下关键观察：对于注意力计算 \(O = \text{softmax}(QK^T/\sqrt{d})V\)，输出 \(O\) 的第 \(i\) 行仅依赖 \(Q\) 的第 \(i\) 行和完整的 \(K, V\)。因此：

$$O_i = \text{softmax}\left(\frac{Q_i K^T}{\sqrt{d}}\right) V$$

这意味着可以将序列均匀分到 \(P\) 个 GPU，每个 GPU 持有 \(Q_{\text{local}}\)（\(N/P\) 个 token），但需要访问完整的 \(K\) 和 \(V\)。

**前向传播通信分析：**
- 每个 GPU 需要 gather 完整 K 和 V：通信量 = \(2 \times N \times d = 2Nd\)
- 输出 \(O_{\text{local}}\) 无需通信

**反向传播通信分析：**
- \(dK\) 和 \(dV\) 通过 reduce-scatter 聚合：已包含在 forward 的 all-gather 对偶操作中
- \(dQ\) 仅需本地梯度，额外通信量 = \(Nd\)

**总通信量** = \(3Nd\)，而 Ring Attention 需要 \(14Nd\)（包含 2P-1 步的 KV 传递）。

> ⚠️ 注意：这里的通信量分析假设使用 all-gather/reduce-scatter 原语，在 NVLink 互联的 GPU 集群上可实现接近带宽上限的效率。

**负载均衡策略**

对于 causal attention，第 \(i\) 个 token 只关注前 \(i\) 个 token，导致计算量呈三角形分布。如果简单按顺序分区，第一个 GPU 的计算量远小于最后一个 GPU。

LightSeq 的解决方案：**交错分配（Interleaved Assignment）**

将 token 按如下方式分配到 \(P\) 个 GPU：
- GPU 0: tokens \(\{0, 2P-1, 2P, 4P-1, ...\}\)
- GPU 1: tokens \(\{1, 2P-2, 2P+1, 4P-2, ...\}\)
- 一般地，将序列折叠后交替分配，使每个 GPU 同时获得"轻"token（序列前部）和"重"token（序列后部）

这确保了每个 GPU 的 FLOPs 近似相等，负载差异从 \(O(N/P)\) 降至 \(O(1)\)。

**重计算感知检查点（Rematerialization-aware Checkpointing）**

传统激活检查点在反向传播时重新计算前向激活，但在分布式设置中，重计算需要重新执行通信操作。LightSeq 的创新在于：

1. **选择性保存**：保存通信获取的 K、V（而非本地计算的中间结果），避免反向时重复通信
2. **通信-计算重叠**：在重计算本地注意力的同时，异步预取下一层所需的 K、V
3. **内存-通信权衡**：通过保存 \(O(N \cdot d / P)\) 的额外内存，完全消除反向传播中的通信等待

$$\text{Memory overhead} = \frac{2Nd}{P} \quad \text{(保存 K, V 的本地分片)}$$

**与传统方法的对比**

| 方法 | 通信量 | 负载均衡 | 适用注意力类型 |
|------|--------|----------|---------------|
| Megatron-SP | \(4Nd\) (all-reduce) | 均衡 | 所有类型 |
| Ring Attention | \(14Nd\) | 不均衡(causal) | 所有类型 |
| DeepSpeed-Ulysses | \(4Nd\) (all-to-all) | 均衡 | 所有类型 |
| **LightSeq (DistAttn)** | **\(3Nd\)** | **均衡(含优化)** | **所有类型** |

LightSeq 相比 DeepSpeed-Ulysses 进一步减少 25% 通信量，因为 Ulysses 需要在输出端执行额外的 all-to-all 将结果重新分配回 head 维度，而 DistAttn 的输出天然保持序列分区无需额外通信。

**实验验证**

在 32 个 A100 80GB GPU（4 节点，NVLink + InfiniBand）上的实验表明：
- 序列长度 64K-2M tokens，模型参数 1.3B-7B
- 相比 Megatron-LM：在 7B 模型、512K 序列上实现 2.01x 加速
- 相比 DeepSpeed-Ulysses：在多数配置下实现 1.24x-1.54x 加速
- 通信时间占比从 Ring Attention 的 60%+ 降至 LightSeq 的 20% 以下

#### 🧪 练习题

```yaml
question: "LightSeq 的 DistAttn 相比 Ring Attention 通信量降低的关键原因是什么？"
options:
  - "使用了更高效的压缩算法减少传输数据量"
  - "Q 不需要通信，只需 gather K 和 V，避免了环形逐步传递的冗余"
  - "通过量化将 KV 精度降低从而减少通信量"
  - "利用稀疏注意力跳过部分 token 的通信"
answer: 1
explain: "DistAttn 的核心洞察是输出 O_i 只依赖本地 Q_i 和完整 K、V，因此 Q 无需通信，只需一次 all-gather 收集 K 和 V（通信量 3Nd），而 Ring Attention 需要在环中逐步传递完整 KV 块（14Nd）。"
```