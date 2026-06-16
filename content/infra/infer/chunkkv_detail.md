### ChunkKV: 语义分块缓存 (ChunkKV)

```yaml
id: chunkkv
name: ChunkKV
full_name: 语义分块缓存 (ChunkKV)
year: '2026'
org: X Liu等
paper_url: https://arxiv.org/abs/2603.20397
category: kv_cache
parent: h2o
motivation: 保留Token间语义关系的KV压缩
```

#### 📝 一句话总结

ChunkKV 把 KV cache 剪枝的基本单位从孤立 token 改成连续语义 chunk，通过整块保留高注意力片段和跨层复用保留索引，减少 H2O/SnapKV 类 token 级压缩造成的语义碎片化。

> 资料说明：上方 YAML 按任务输入保留；该 `paper_url` 实际是 KV cache 优化综述。本文方法细节依据 ChunkKV 实际论文 `https://arxiv.org/abs/2502.00299` 与 OpenReview 版本。

#### 🎯 核心要点

- 基本压缩单元改变：按固定大小 chunk 聚合连续 token，整块保留或丢弃，避免只留下关键词而丢掉主谓宾/限定关系
- 注意力聚合评分：用 observe window 的 query 对全体 key 计算注意力分数，再对每个 chunk 内 token 的分数求和得到 chunk score
- Top-\(k\) chunk selection：在预算 \(L_{\max}\) 下选择 \(\lfloor L_{\max}/c\rfloor\) 个最高分 chunk，同时保留原始顺序
- Recent/observe window 拼接：压缩 cache 后用原始 KV 的最后 \(w\) 个 token 替换/拼接，保留近邻生成信息
- Layer-wise index reuse：利用 ChunkKV 保留索引在相邻层间更相似的现象，在每组 \(N_{\text{reuse}}\) 层中只在首层计算索引，其余层复用
- 训练无关：不改模型、不微调、不训练边界检测器；chunk size 在论文中通常取 10，消融显示 10-20 较稳健
- 评测覆盖 LongBench、Needle-In-A-HayStack、GSM8K、JailbreakV 和 DeepSeek-R1/LLaMA/Qwen/Mistral 等模型

#### 🔬 深入细节

![ChunkKV 语义保留示意](https://arxiv.org/html/2502.00299v4/x1.png)
*图：ChunkKV 论文 Figure 1。token 离散选择容易只保留问题相关词而漏掉主体/对象，chunk 选择则保留更完整语义片段。*

```python
# ChunkKV compression
def chunkkv(Q, K, V, observe_window_w, chunk_size_c, max_cache_len):
    # Use recent queries to observe which past positions matter.
    A = Q[-observe_window_w:] @ K.T
    num_chunks = ceil(len(K) / chunk_size_c)

    scores = []
    for i in range(num_chunks):
        left = i * chunk_size_c
        right = min((i + 1) * chunk_size_c, len(K))
        scores.append(A[:, left:right].sum())

    k = floor(max_cache_len / chunk_size_c)
    chosen_chunks = topk_indices(scores, k)
    chosen_token_idx = flatten_chunks_in_original_order(chosen_chunks, chunk_size_c)

    K_comp = K[chosen_token_idx]
    V_comp = V[chosen_token_idx]

    # Keep the most recent/observe window tokens for local generation stability.
    K_comp = replace_tail_with_recent(K_comp, K[-observe_window_w:])
    V_comp = replace_tail_with_recent(V_comp, V[-observe_window_w:])
    return K_comp, V_comp, chosen_token_idx
```

ChunkKV 的问题设定非常直接：KV cache 显存近似随 batch、序列长度、层数、head 数、head 维度线性增长。论文给出的 float16 估算式可写为

$$
M_{\text{KV}}\approx 2\times B\times S\times L\times N\times D\times 2\ \text{bytes},
$$

其中第一个 2 表示 K/V 两份矩阵，最后一个 2 表示 FP16 字节数。长上下文下，token 级 eviction 能降显存，但它把语言片段拆成离散点，可能保留“eat”“bamboo”等高分词，却丢掉“pandas in the wild”这类限定上下文，后续层需要从破碎词集合里重建语义。

方法主体是 chunk-level attention aggregation。设 \(Q_{T_q-w:T_q}\) 是最近 \(w\) 个 query，ChunkKV 先计算 observe attention：

$$
A=Q_{T_q-w:T_q}K^\top.
$$

给定 chunk size \(c\)，key 序列被划分为 \(C=\lceil T_k/c\rceil\) 个连续块。第 \(i\) 个 chunk 的分数为该块内 token 注意力的总和：

$$
A_i=\sum_{j=(i-1)c+1}^{ic} A_{:,j}.
$$

随后选择 \(k=\lfloor L_{\max}/c\rfloor\) 个最高分 chunk，并按原序排列其 token index 生成 \((K',V')\)。这个排序细节很重要：模型仍然看到原文本中的相对顺序，而不是被 top-k 排序打乱的片段。

observe window 的处理体现了 ChunkKV 对“远程语义”和“局部生成”的折中。远程历史由 top chunk 保存，最近 \(w\) 个 token 则从原始 KV cache 直接拼接或替换到压缩 cache 尾部，类似 H2O/SnapKV 中 recent window 的直觉：当前 token 的下一个预测通常强依赖临近上下文，不能只按历史 chunk 分数抽样。

Layer-wise index reuse 是它的系统优化。论文观察到，ChunkKV 选择的是连续语义块，因此相邻层保留下来的 token index 比 SnapKV/H2O 更一致；表中 LLaMA-3-8B、Qwen2-7B、Mistral-7B 上 ChunkKV 相邻层 Jaccard similarity 分别约为 57.74%、44.26%、52.16%，明显高于 token 级方法。于是每 \(N_{\text{reuse}}\) 层为一组，只在组内第一层运行 ChunkKV 得到 \(\mathcal{I}_l\)，后续层直接用

$$
K_{l+r}'=K_{l+r}[\mathcal{I}_l],\qquad V_{l+r}'=V_{l+r}[\mathcal{I}_l],\quad 0<r<N_{\text{reuse}}.
$$

这把“每层重新计算 chunk 分数”的额外开销降下来。论文报告复用索引可减少压缩时间，吞吐提升约 26.5%，并指出相比 FullKV 基线压缩时间约降 20%、性能损失约 0.5%。

从理论解释看，ChunkKV 借用了 in-context learning 的 distinguishability 视角：token 级 sparsification 给历史序列 \(o_{1:t-1}\) 注入离散噪声，会提高区分正确概念 \(\theta^\star\) 与候选 \(\theta\) 所需的 KL 条件；chunk 级保留则让被选中的示例或语义片段更完整，局部依赖链没有被均匀打断。简化地说，token 级方法把所有示例都“轻微污染”，ChunkKV 更像保留少数干净示例、丢弃低价值示例，因此在 many-shot GSM8K、多文档 QA 和 NIAH 检索这类依赖局部完整证据的任务上更稳。

与 H2O/SnapKV 的差异不在于是否用注意力分数，而在于分数的作用粒度。H2O/SnapKV 用单 token score 排名，预算利用更细，但容易破坏短语和实体关系；ChunkKV 用 chunk score 排名，可能牺牲一点 token 级最优预算，却换来语义连贯性、跨层索引复用和更低调度复杂度。论文也承认固定 chunk 对法律/生物医学这类逐字忠实任务可能不够理想，未来可按句法/语义边界自适应切块，但这会增加推理时边界检测开销。

#### 🧪 练习题

```yaml
question: "ChunkKV 相比 H2O/SnapKV 这类 token 级剪枝，最核心的设计变化是什么？"
options:
  - "以连续语义 chunk 为单位聚合注意力分数并整块保留/丢弃"
  - "把所有 KV cache 都量化成 1-bit"
  - "取消 recent/observe window，只保留最旧 token"
  - "训练一个新 Transformer 替代原模型"
answer: 0
explain: "ChunkKV 的关键是压缩粒度从单 token 变成 chunk，从而保留主谓宾、实体限定等连续语义关系。"
```
