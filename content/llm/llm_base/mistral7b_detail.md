### Mistral 7B 高效 7B 基础模型 (Mistral 7B)

```yaml
id: mistral7b
name: Mistral 7B
full_name: 高效 7B 基础模型 (Mistral 7B)
year: '2023.10'
org: Mistral AI
paper_url: https://arxiv.org/abs/2310.06825
category: open_foundation
parent: llama
motivation: GQA与滑窗提升小模型效率
```

#### 📝 一句话总结

Mistral 7B 提出了以 Grouped-Query Attention 和 Sliding Window Attention 为核心的高效 7.3B 解码器模型，在显著降低推理 KV 缓存和长序列注意力成本的同时，整体 benchmark 表现超过 Llama 2 13B。

#### 🎯 核心要点

- 7.3B decoder-only 基础模型，目标是在小参数量下提高训练与推理性价比
- Grouped-Query Attention (GQA)：多组 query heads 共享较少 key/value heads，减少 KV cache 与解码带宽
- Sliding Window Attention (SWA)：每个 token 只关注上一层最近 \(W\) 个 token，将注意力复杂度从 \(O(n^2)\) 降为 \(O(nW)\)
- 跨层信息传递：虽然单层窗口有限，堆叠 \(k\) 层后信息可传播约 \(k\times W\) 个 token
- 窗口大小 \(W=4096\)：论文给出约 131K tokens 的理论注意力跨度，并在 16K 序列上报告约 2x 注意力实现加速
- Rolling Buffer Cache：KV 缓存固定为窗口大小，位置 \(i\) 写入 \(i\bmod W\)，32K 序列上缓存内存减少 8x
- Pre-fill and Chunking：长 prompt 预填充时按窗口大小分块，当前块只看缓存窗口和块内因果位置
- 性能结果：在论文评估中超过 Llama 2 13B，并在代码、数学、推理任务上显示出特别强的效率优势
- 指令版本：Mistral 7B-Instruct 使用公开指令数据微调，在 MT-Bench 上达到同规模开源 chat 模型前列

#### 🔬 深入细节

![Mistral 7B 滑动窗口注意力](https://arxiv.org/html/2310.06825v1/x1.png)
*图：Mistral 7B 论文 Figure 1。每层只允许 token 关注前一层最多 \(W\) 个 token，但跨层堆叠后远处信息仍可逐层传递。*

```python
# Mistral 7B Sliding Window Attention + Rolling Buffer Cache 伪代码
W = 4096
kv_cache = RollingBuffer(size=W)

for i, token in enumerate(sequence):
    q_i, k_i, v_i = project_with_grouped_query_attention(token)

    # 缓存位置固定，超过窗口后覆盖最旧 KV
    kv_cache[i % W] = (k_i, v_i)

    # 当前 token 只关注最近 W 个历史位置和自身
    start = max(0, i - W + 1)
    visible_positions = range(start, i + 1)
    keys, values = kv_cache.read_positions(visible_positions)

    scores = (q_i @ keys.T) / sqrt(head_dim)
    scores = apply_causal_mask(scores, visible_positions, current_position=i)
    weights = softmax(scores)
    h_i = weights @ values

    output_i = feed_forward(h_i)
```

Mistral 7B 的核心问题意识是：7B 级模型不能只靠“缩小版大模型配方”竞争，而要在推理成本、上下文处理和能力密度上重新设计。论文把注意力成本作为主要切入点，因为自回归生成时每步都要读取历史 KV cache；序列越长，标准全注意力不仅计算更贵，缓存也会持续增长，吞吐和延迟都会恶化。

GQA 先处理 KV cache 的宽度问题。标准 MHA 中 query、key、value head 数通常一致，每个 query head 都配一套 KV，解码时需要保存并读取大量 key/value。MQA 把所有 query heads 共享同一套 KV，速度快但表达能力可能下降。GQA 则把 query heads 分组，每组共享一套 KV，是 MHA 与 MQA 的中间点。对 Mistral 7B 来说，这让模型在保持质量的同时减少推理时的 KV 带宽和内存占用。

SWA 处理的是 KV cache 的长度问题。标准因果注意力在位置 \(i\) 可以看所有 \(0\ldots i\) 的 token，复杂度随序列长度平方增长；SWA 将可见范围限制为：

$$
\mathcal{A}(i)=\{j\mid \max(0,i-W+1)\le j\le i\}
$$

因此单层注意力成本从 \(O(n^2)\) 变为 \(O(nW)\)。Mistral 7B 使用 \(W=4096\)，这意味着每层只直接看局部上下文，但不会完全失去长程信息。

长程信息通过层间递归传播。第 \(k\) 层位置 \(i\) 的 hidden state 可以从上一层读取 \(W\) 个位置，而上一层的那些 hidden states 又已经聚合了更早的信息，所以理论可达距离约为 \(k\times W\)。论文指出，在最后一层使用 \(W=4096\) 时理论注意力跨度约为 131K tokens。这个机制的直觉类似“逐层接力”：单层只做局部通信，但深层网络把局部消息逐步传远。

Rolling Buffer Cache 是 SWA 在推理端真正省内存的关键。因为模型永远不会读取窗口外 KV，所以缓存无需随生成长度增长，只需要大小为 \(W\) 的环形缓冲区：

$$
\text{cache\_slot}(i)=i\bmod W
$$

当 \(i>W\) 时，新 token 覆盖最旧 token 的 KV。论文报告在 32K token 序列上，这种缓存把内存用量降低 8x，并且不影响模型质量。这个结论直接来自注意力掩码的结构：被覆盖的信息本来就不会被下一步直接访问。

Pre-fill and Chunking 解决长 prompt 的批量预处理。生成时，prompt 已知，可以一次性填充 KV cache；但如果 prompt 很长，一次全量注意力仍会占用大量内存。Mistral 7B 将长 prompt 按窗口大小切块，每个 chunk 对自身使用因果掩码，对缓存中的最近窗口使用滑动窗口掩码，对窗口外旧 token 完全不可见。配合 FlashAttention 和 xFormers 修改，论文在 16K 序列、\(W=4096\) 下报告约 2x 加速。

性能上，Mistral 7B 的意义在于把“模型能力、训练成本、推理成本”同时纳入比较，而不是只看参数量。论文重新评估 Mistral 7B、Llama 2 7B/13B、Llama 1 34B 等模型，显示 Mistral 7B 在所有列出的指标上超过 Llama 2 13B，并在数学、代码、推理上尤其强；作者还用 equivalent model size 说明，在推理、理解和 STEM 类任务中，它接近大于自身 3 倍规模的 Llama 2 表现，而知识类任务的压缩比约 1.9x，受限于参数量存储知识的能力。

> 💡 关键：Mistral 7B 的创新不是把上下文窗口简单拉长，而是让“每层局部、跨层传递、缓存滚动”成为一套一致的推理设计。GQA 减少 KV 的宽度，SWA 限制 KV 的长度，Rolling Buffer 则把这种限制转化为实际内存收益。

#### 🧪 练习题

```yaml
question: "Mistral 7B 的 Rolling Buffer Cache 为什么能把长序列 KV 缓存限制在固定大小？"
options:
  - "因为模型不再使用自回归生成"
  - "因为 Sliding Window Attention 永远不会直接读取窗口外 token 的 KV"
  - "因为 GQA 会删除所有 value heads"
  - "因为 RoPE 会把全部历史 token 压缩成一个向量"
answer: 1
explain: "SWA 将每个 token 的直接注意力限制在最近 W 个位置，因此窗口外 KV 可以被覆盖；缓存槽可写为 i mod W。"
```
