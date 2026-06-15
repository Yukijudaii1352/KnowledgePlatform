### HieraSparse

```yaml
id: hierasparse
name: HieraSparse
full_name: 分层稀疏注意力 (HieraSparse)
year: 2026
org: arXiv
paper_url: https://arxiv.org/abs/2604.16864
category: sparsity_deploy
parent: bigbird
motivation: 分层半结构化稀疏KV注意力
```

#### 📝 一句话总结

HieraSparse 提出分层半结构化稀疏 KV Cache 压缩与注意力 kernel，在 block 级和 N:M element 级同时稀疏化 key/value，并分别支持 prefill 与 decode，加速长上下文 LLM 中逐渐占主导的 KV attention 计算。

#### 🎯 核心要点

- 面向长上下文 LLM 的 KV Cache 显存和 attention 延迟瓶颈
- 将 KV cache 划分为 dense blocks 与 sparse blocks，形成 block-level 稀疏
- 对 sparse blocks 内部进一步执行 N:M 半结构化 element-level 稀疏
- 分别支持 key cache 和 value cache 的不同稀疏设置
- 支持 prefill 和 decode 阶段使用不同稀疏策略
- 提供压缩 kernel、metadata/memory pool 管理和 GPU sparse tensor core attention kernel

#### 🔬 深入细节

![HieraSparse 工作流](https://arxiv.org/html/2604.16864v1/x1.png)
*图：HieraSparse 将 KV cache 分为 dense/sparse block，对 sparse block 做 N:M 压缩，并用专门 attention kernel 在 prefill/decode 中读取。*

```python
# HieraSparse KV attention 伪代码
K_blocks, V_blocks = split_kv_cache_by_block(K_cache, V_cache)
for block in K_blocks, V_blocks:
    if important(block):
        dense_pool.store(block)
        block_index.add(block, type="dense", offset=dense_pool.offset)
    else:
        values, metadata = nm_prune_and_compress(block, N, M)
        sparse_pool.store(values, metadata)
        block_index.add(block, type="sparse", offset=sparse_pool.offset)

prefill_attention(query, dense_pool, sparse_pool, block_index)
optional_reprune_after_prefill()
decode_attention(new_query, dense_pool, sparse_pool, block_index)
```

长上下文 LLM 的 attention 成本随上下文长度快速增长。prefill 阶段要处理长输入，attention 可能占据 time-to-first-token 的主要部分；decode 阶段每生成一个 token 都要读历史 KV cache，KV 显存带宽和存储也会成为瓶颈。HieraSparse 同时压缩计算和 cache。

它的“分层”体现在两级稀疏。第一层是 block-level：把 KV cache 按序列块划分，重要块保持 dense，不重要块进入 sparse 路径。第二层是 element-level：对 sparse block 内部使用半结构化 N:M 稀疏，使它能被 sparse tensor core 加速。

若一个 sparse block 的向量被分成长度 \(M\) 的组，则约束为：

$$
\|\mathbf{v}_{k:k+M}\|_0\le N
$$

压缩后需要同时保存非零值和 metadata。block index mapping 记录每个块在 dense pool 或 sparse pool 中的位置，使 attention kernel 能按块类型加载数据。

> 💡 关键：HieraSparse 不只“剪 KV cache”，还提供与压缩格式匹配的 prefill/decode attention kernel，否则稀疏很难转化为真实速度。

prefill 与 decode 的最优稀疏策略不同。prefill 可批量处理长序列，decode 则是小 query 反复访问大 KV cache；HieraSparse 允许两个阶段使用不同稀疏率、key/value 也可分别设置稀疏模式。这种灵活性让质量、显存和延迟可以按部署目标调节。

与 BigBird/Longformer 的静态注意力图稀疏不同，HieraSparse 更贴近现代 LLM serving：模型结构可不变，重点压缩运行时 KV cache 并写专用 kernel。它适合百万 token 上下文、RAG 和 agent memory 等 KV cache 极大的场景。

#### 🧪 练习题

```yaml
question: "HieraSparse 的分层稀疏主要指哪两层？"
options:
  - "block-level KV cache 稀疏和 block 内 N:M element-level 半结构化稀疏"
  - "embedding 层稀疏和输出层稀疏"
  - "数据集剪枝和标签剪枝"
  - "教师模型和学生模型双模型蒸馏"
answer: 0
explain: "HieraSparse 先决定哪些 KV block 走 dense/sparse 路径，再对 sparse block 内部做 N:M 压缩以适配 sparse tensor core。"
```
