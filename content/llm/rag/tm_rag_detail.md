### TM-RAG：Transformer-Mamba 混合长证据聚合

```yaml
id: tm_rag
name: TM-RAG
full_name: Transformer-Mamba混合RAG (Transformer-Mamba RAG)
year: '2026.02'
org: King Saud University
paper_url: https://link.springer.com/article/10.1007/s44443-026-00723-5
category: frontier_2026
parent: self_rag
motivation: Mamba处理长程依赖，Transformer精细聚合证据
```

#### 📝 一句话总结

TM-RAG 将 Transformer 的局部精细注意力与 Mamba 的长程状态建模结合，并用 CAGF 动态融合和多层级对比学习增强证据聚合，解决长证据 RAG 中全局语义弱、细粒度事实对齐不足的问题。

#### 🎯 核心要点

- **Transformer-Mamba 编码**：Transformer 捕捉局部证据交互，Mamba 以线性序列建模处理长程依赖。
- **CAGF 动态融合**：通过 Cross-Attention Gated Fusion 类模块自适应融合两路特征。
- **多层级对比学习**：包含句级、槽位级和 token 级 masked-recovery contrastive learning。
- **长文本证据聚合**：目标是避免检索只偏向主题相似，而忽略事实一致性和关键槽位。
- **评测覆盖**：在中文左宗棠历史数据集、HotpotQA、MuSiQue、SQuAD 等任务上验证。
- **公开来源限制**：Springer 页面可访问摘要与元数据，正文图未暴露稳定图片直链；下方使用官方文章页作为公开图源链接。

#### 🔬 深入细节

![TM-RAG 官方文章页图源](https://link.springer.com/article/10.1007/s44443-026-00723-5)

*图源：Springer Open Access 文章页；该页说明 TM-RAG 由 Transformer-Mamba 编码、CAGF 融合和多层级对比目标组成。*

```python
def tm_rag_train(query, positive_evidence, negative_evidence, encoder, generator):
    evidence = positive_evidence + negative_evidence

    transformer_states = encoder.transformer_branch(query, evidence)
    mamba_states = encoder.mamba_branch(query, evidence)
    fused = cagf_gate(transformer_states, mamba_states)

    sent_loss = contrastive_sentence(fused, positive_evidence, negative_evidence)
    slot_loss = contrastive_slots(fused, extract_slots(positive_evidence))
    token_loss = masked_recovery_contrastive(fused, mask_entity_time_place_slots(evidence))
    gen_loss = generator.nll(query, positive_evidence)

    return gen_loss + sent_loss + slot_loss + token_loss

def tm_rag_answer(query, retriever, tm_encoder, generator):
    docs = retriever.search(query, top_k=20)
    fused_context = tm_encoder.aggregate_long_evidence(query, docs)
    return generator.generate(query, fused_context)
```

TM-RAG 关注的是长证据聚合，而不是单纯检索召回。真实 RAG 场景里，top-k 文档可能跨越很长上下文，普通 dense retrieval 容易根据主题相似召回材料，却没有足够机制判断“这些材料是否共同支持同一个事实”。Transformer 能做细粒度 token 交互，但在长序列上成本高；Mamba 的选择性状态空间模型更适合线性处理长程依赖，却不如注意力直观地建模局部证据对齐。

混合编码器把两者分工：Transformer 分支处理查询和证据之间的局部交互，捕捉实体、时间、地点、动作等关键槽位；Mamba 分支沿长序列传播状态，保留跨段落的全局语义。CAGF 融合模块相当于一个动态门控，按样本决定更信任局部注意力还是长程状态，而不是简单拼接两路特征。

多层级对比学习用于让编码器不只“读过证据”，还要区分事实支持关系。句级对比拉近查询与正证据句，推远负证据句；槽位级对比关注 subject、time、place、action 等结构化事实槽；token 级 masked recovery 则把被遮蔽的关键 token 与原始证据表示对齐，迫使模型保留细粒度事实。

在 RAG 推理中，TM-RAG 的输出可以看作经过长证据聚合的上下文表示：

$$
h_{\text{fused}} = g_{\text{CAGF}}\left(h_{\text{Transformer}}, h_{\text{Mamba}}\right),
$$

再由生成器基于 \(h_{\text{fused}}\) 回答。它与 Self-RAG 的关系在于都强调“不要盲信检索结果”，但 Self-RAG 用反射 token 批判检索内容，TM-RAG 则在编码层面强化长程证据一致性。

#### 🧪 练习题

```yaml
question: "TM-RAG 中引入 Mamba 分支的主要目的是什么？"
options:
  - "替代所有检索器"
  - "以更适合长序列的方式建模跨段落长程依赖"
  - "把文本转换成图片"
  - "只用于生成随机负样本"
answer: 1
explain: "Mamba 的状态空间建模适合长序列信息传播，弥补 Transformer 在长证据上下文中的成本和全局依赖问题。"
```
