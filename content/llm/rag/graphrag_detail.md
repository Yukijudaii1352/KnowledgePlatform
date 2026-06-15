### GraphRAG：图谱检索增强生成

```yaml
id: graphrag
name: GraphRAG
full_name: 图谱检索增强生成 (Graph Retrieval-Augmented Generation)
year: '2024.02'
org: Microsoft Research
paper_url: https://arxiv.org/abs/2404.16130
category: architecture
parent: rag
motivation: 知识图谱全局关系推理，解决跨文档总结难题
```

#### 📝 一句话总结

GraphRAG 用 LLM 从私有语料中抽取实体、关系和声明，构建图索引并预生成社区摘要，再用 map-reduce 式查询聚合回答全局问题，解决向量 RAG 难以回答“整个语料主题是什么”这类跨文档总结问题。

#### 🎯 核心要点

- **图索引构建**：从文本块中抽取 entity、relationship、claim，并汇总为图元素描述。
- **社区检测**：用 Leiden 等算法把实体图划分为层级社区。
- **社区摘要**：为每个社区预生成 report-like summary，形成可复用的全局语料记忆。
- **全局查询流程**：每个社区摘要先独立回答问题，再把相关中间答案汇总成最终回答。
- **目标场景**：面向 global sensemaking 和 query-focused summarization，而不是单段事实查找。
- **优势与成本**：提升答案全面性和多样性，但索引阶段需要较多 LLM 抽取与摘要调用。

#### 🔬 深入细节

![GraphRAG 社区结构示意](https://ar5iv.labs.arxiv.org/html/2404.16130/assets/Level0Multihop.jpg)

*图源：ar5iv 论文图 3 的 Level 0 社区可视化，展示 GraphRAG 将实体图划分为可摘要的社区。*

```python
def build_graphrag_index(documents, llm):
    chunks = split_documents(documents, chunk_size=600)
    graph = Graph()
    for chunk in chunks:
        entities, relations, claims = llm.extract_graph_elements(chunk)
        graph.add_entities(entities)
        graph.add_relations(relations)
        graph.add_claims(claims)

    graph.merge_and_summarize_elements(llm)
    communities = leiden_hierarchy(graph)
    reports = {}
    for level, groups in communities.items():
        for group in groups:
            reports[(level, group.id)] = llm.summarize_community(group)
    return graph, reports

def global_search(query, community_reports, llm, token_budget):
    partials = []
    for batch in pack_reports(community_reports, token_budget):
        answer, helpfulness = llm.answer_from_reports(query, batch)
        if helpfulness > 0:
            partials.append((helpfulness, answer))
    context = select_by_score(partials, token_budget)
    return llm.reduce_answers(query, context)
```

GraphRAG 的核心判断是：普通向量 RAG 擅长找到“局部答案所在段落”，但不擅长回答需要全语料综合的问题。例如“这个数据集中有哪些主要主题？”没有单个 chunk 能代表答案，语义检索很容易只召回几个局部片段。GraphRAG 把任务改写为 query-focused summarization，通过图社区覆盖整个语料。

索引阶段先由 LLM 从每个 chunk 抽取实体、关系和声明。与传统知识图谱追求严格三元组不同，GraphRAG 更强调 LLM 可读的丰富描述：节点和边都带自然语言摘要，claim 也可以作为 covariate 附着到实体上。这样即便抽取结果有命名不一致，后续社区摘要仍能把同一主题附近的信息聚合起来。

社区检测利用图的模块性。GraphRAG 把实体关系图看成无向加权图，边权通常来自关系实例计数或强度，再用 Leiden 得到层级社区。每个社区覆盖一组强相关实体、关系和声明；社区摘要相当于把局部子图压缩成可检索、可阅读的全局记忆。

查询阶段是 map-reduce：map 步骤让每个社区摘要独立回答问题并给出有用度分数，reduce 步骤按分数选择中间答案并生成最终回答。这样做的优势是并行、可扩展，并且避免把整个语料塞进单个上下文；不足是索引成本较高，而且社区摘要质量受 LLM 抽取和社区划分影响。

#### 🧪 练习题

```yaml
question: "GraphRAG 相比普通向量 RAG 最适合解决哪类问题？"
options:
  - "只需要查找单个精确事实的短问题"
  - "需要综合整个语料主题和跨文档关系的全局问题"
  - "只需要图像分类的问题"
  - "完全不需要外部知识的问题"
answer: 1
explain: "GraphRAG 的社区摘要和 map-reduce 查询专门面向全局 sensemaking，弥补单 chunk 语义检索的覆盖不足。"
```
