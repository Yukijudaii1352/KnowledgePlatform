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

ChunkKV 将 KV cache 压缩单位从孤立 token 改为语义 chunk，避免 token 级剪枝破坏短语、实体和句法结构，在高压缩下更好保持长上下文语义完整性。

#### 🎯 核心要点

- 把连续语义片段作为基本保留/丢弃单位，而不是单 token
- 针对 chunk 计算重要性，保留包含完整语义结构的片段
- 缓解 H2O 等 token-level eviction 造成的上下文碎片化
- 兼顾 semantic preservation 与 KV cache budget
- 适合长文档问答、摘要和需要实体关系保持的任务

#### 🔬 深入细节

![ChunkKV 核心示意图](https://ar5iv.labs.arxiv.org/html/2603.20397/assets/x1.png)
*图：ChunkKV 的语义分块缓存压缩示意，展示 chunk 级保留比 token 级保留更完整。*

```python
chunks = semantic_chunk(tokens)
for chunk in chunks:
    chunk.score = aggregate_token_importance(chunk.tokens, attention, recency)
selected = knapsack_or_topk(chunks, budget_tokens)
kv_cache.keep_tokens(flatten([c.tokens for c in selected]) + recent_tokens)
```

##### 动机与背景

token 级 KV 剪枝可能保留主语却删除谓语，或保留实体名却删除限定关系，导致剩余上下文语义碎片化。长文档任务往往依赖连续短语和句子结构，因此压缩单位需要对语义边界更友好。

##### 核心机制

ChunkKV 先把输入切成语义 chunk，再基于注意力、位置或语义信号评估 chunk 重要性。选择时整块保留或丢弃，确保被保留的信息仍是完整语言片段，而不是散点 token。

##### 训练/推理流程

prefill 后记录 token 到 chunk 的映射；decode 中更新 chunk-level 重要性；当超出预算时，优先保留高分 chunk 和最近窗口。attention 仍在保留 token 的 KV 上计算，但选择动作发生在 chunk 层。

##### 与传统方法的区别

H2O/Scissorhands 关注单 token 重要性，ChunkKV 关注 token 间关系。它可能牺牲少量细粒度预算最优性，但换来更强语义连贯性，特别适合自然语言长上下文。

#### 🧪 练习题

```yaml
question: "ChunkKV 相比 token 级剪枝的核心优势是什么？"
options:
  - "保留完整语义片段，减少上下文碎片"
  - "取消 KV cache"
  - "只支持短文本"
  - "必须从头训练模型"
answer: 0
explain: "ChunkKV 以 chunk 为单位选择，能保留短语或句子的内部关系。"
```
