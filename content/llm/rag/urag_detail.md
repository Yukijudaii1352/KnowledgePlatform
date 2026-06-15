### URaG：统一检索与生成的多模态长文档理解

```yaml
id: urag
name: URaG
full_name: 统一检索生成 (Unified Retrieval and Generation)
year: '2026.02'
org: Fudan University
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39729
category: frontier_2026
parent: videorag
motivation: 多模态长文档统一架构，检索生成端到端优化
```

#### 📝 一句话总结

URaG 在单一多模态 LLM 内部统一检索与生成：利用早期 Transformer 层的粗粒度证据定位能力选择相关页面，再让深层只处理保留页面，从而在长文档理解中同时提升准确率和效率。

#### 🎯 核心要点

- **统一架构**：不外接独立 retriever，而是在 MLLM 内部加入轻量 cross-modal retrieval module。
- **粗到细观察**：早层广泛关注整份文档，深层更集中到相关证据页。
- **早层检索**：把早期 hidden states 映射后与查询计算相似度，选择 top-k 页面/视觉 token。
- **深层生成**：丢弃不相关视觉 token，让深层 Transformer 专注证据页面。
- **效率收益**：AAAI 摘要报告计算开销降低 44-56%。
- **官方图源**：作者 GitHub 提供 URaG framework 和 layer study 图。

#### 🔬 深入细节

![URaG 框架图](https://github.com/shi-yx/URaG/raw/main/figures/urag_framework.jpg)

*图源：URaG 官方 GitHub，展示早层特征进入 cross-modal retrieval module，筛选 top-k 页面后送入深层生成。*

```python
def urag_forward(document_pages, query, mllm, retriever_head, k):
    visual_tokens = mllm.vision_encoder(document_pages)
    query_tokens = mllm.text_embed(query)

    early_states = mllm.run_early_layers(visual_tokens, query_tokens)
    page_vectors = retriever_head.map_visual_pages(early_states.visual)
    query_vector = retriever_head.map_query(early_states.query)

    sim = cosine_similarity(page_vectors, query_vector)
    selected_pages = top_k_pages(sim, k)
    pruned_tokens = keep_tokens(visual_tokens, selected_pages)

    deep_states = mllm.run_deep_layers(pruned_tokens, query_tokens)
    return mllm.decode_answer(deep_states)
```

URaG 的出发点是多模态长文档理解中的两个瓶颈：无关页面造成信息干扰，Transformer 对长视觉 token 的计算成本近似二次增长。外接 retriever 能筛页面，但会增加系统复杂度，而且检索目标和生成模型不一定端到端一致。

论文的关键观察是 MLLM 本身呈现 coarse-to-fine 规律：早期层对文档页面的注意力比较广，可以作为粗检索信号；深层注意力逐渐集中到回答所需页面。因此 URaG 把早层隐藏状态拿出来做页面级相似度计算，让模型“边推理边检索”。

Cross-modal retrieval module 是轻量映射头。它把视觉页面 token 和文本查询 token 投到同一相似度空间，计算页面分数：

$$
s_i=\cos\left(W_v h_i^{\text{page}}, W_q h^{\text{query}}\right),
$$

然后保留 top-k 页面对应的视觉 token。被丢弃的页面不进入后续深层，从而节省计算并减少干扰。

与 token compression 的区别是，URaG 不是把所有页面压成短摘要，而是显式选择证据页面，保留被选页面的细粒度视觉信息。与外部检索器相比，它共享 MLLM 的视觉编码和查询表示，更容易和生成目标一致；局限是需要在特定 MLLM 结构上插入并训练/适配检索模块。

#### 🧪 练习题

```yaml
question: "URaG 为什么使用 MLLM 的早期层做检索？"
options:
  - "早期层已经生成最终答案"
  - "早期层通常保留较广的页面级注意信息，可用于粗粒度证据定位"
  - "早期层不包含任何视觉信息"
  - "早期层能完全替代深层 Transformer"
answer: 1
explain: "URaG 利用早层的粗到细观察，把早层页面表示转为检索信号，再让深层专注 top-k 证据页。"
```
