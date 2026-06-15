### SSRAG：结构化语义混合检索增强

```yaml
id: ssrag
name: SSRAG
full_name: 结构化语义RAG (Structured-Semantic RAG)
year: '2026.01'
org: IBM Research
paper_url: https://arxiv.org/abs/2601.12658
category: frontier_2026
parent: self_rag
motivation: 混合检索与智能路由解决语义漂移问题
```

#### 📝 一句话总结

SSRAG 提出 query augmentation、agentic routing、vector + graph hybrid retrieval 和 context unification 的混合框架，通过语义检索与结构化实体关系检索互补，解决标准 RAG 容易检索偏移、上下文不完整和事实性不足的问题。

#### 🎯 核心要点

- **查询增强**：抽取实体、意图、时间线索，扩展缩写并规范别名。
- **Agentic Query Routing**：用 LLM 判断 factual/temporal，把查询路由到 Wikipedia、Google API 等合适来源。
- **混合检索**：并行执行向量检索和图检索，兼顾语义相似与关系推理。
- **Context Unification**：把图结果线性化成文本向量，与向量候选统一重排、去重、截断。
- **工程实现**：FAISS 负责 dense retrieval，Neo4j/Cypher 负责实体关系子图检索。
- **评测数据**：TruthfulQA、SQuAD、WikiQA，覆盖五类 LLM 和 RAGAS/ROUGE/BLEU/事实性指标。

#### 🔬 深入细节

![SSRAG 架构图](https://ar5iv.labs.arxiv.org/html/2601.12658/assets/Learning_to_RAG_Architecture.png)

*图源：ar5iv 论文图 1，展示 SSRAG 的查询增强、路由、混合检索和上下文统一流程。*

```python
def ssrag_answer(query, llm, vector_index, graph_db, web_api, wiki_db, k=20):
    augmented = enhance_query(
        query,
        entities=extract_entities(query),
        intent=detect_intent(query),
        aliases=canonicalize_aliases(query),
    )

    route = llm.classify_route(augmented, labels=["TEMPORAL", "FACTUAL"])
    source = web_api if route == "TEMPORAL" else wiki_db

    vector_hits = vector_index.search(augmented, source=source, top_k=k)
    subgraph = graph_db.retrieve_entities_and_relations(augmented, source=source)
    graph_texts = llm.linearize_graph(subgraph)
    graph_vectors = embed(graph_texts)

    candidates = rerank_by_cosine([*vector_hits, *graph_vectors], augmented)
    unified = deduplicate(candidates, by=["exact_match", "cosine"])
    context = take_top_k(unified, k)
    return llm.generate(query, context)
```

SSRAG 的动机是标准向量 RAG 容易出现 semantic drift：查询和文档 embedding 相似，但证据并不完整，或者缺少关键实体关系。Graph RAG 能表达结构关系，却可能漏掉语义近似但图中未显式连接的材料。SSRAG 把两者做成流水线，而不是二选一。

查询增强是前置的稳定化步骤。系统先识别查询中的实体、意图和时间敏感性，再扩展缩写与别名，例如把 “RL” 改写成 “reinforcement learning”。这一步降低了短查询、歧义查询和别名不一致导致的召回失败。

路由模块把检索源选择显式化。对于“最新突破”“今天”“当前价格”等 temporal 查询，系统路由到实时 Web；对于历史事实或百科知识，则路由到 Wikipedia 或预构建语料。路由可以表示为：

$$
r=\operatorname{Router}(Q_{\text{aug}})\in\{\text{TEMPORAL},\text{FACTUAL}\}.
$$

这比所有查询都用同一个索引更稳，因为检索源的新鲜度和可信度需求并不相同。

混合检索阶段并行运行向量检索和图检索。图检索返回实体、关系和子图路径，随后被 LLM 转成文本表示并嵌入到同一向量空间；系统把 graph-to-text 候选和 dense 候选统一重排，选 top-2k 后去重，再截断为最终上下文。这样既能保留结构化关系，也能在最终 prompt 中以 LLM 可读文本呈现。

#### 🧪 练习题

```yaml
question: "SSRAG 中 Agentic Query Routing 的核心作用是什么？"
options:
  - "把所有查询强制送到同一个向量库"
  - "根据查询是否时间敏感或事实型选择合适的数据源和检索路径"
  - "删除查询中的所有实体"
  - "只负责压缩最终答案"
answer: 1
explain: "SSRAG 用路由减少来源不匹配导致的语义漂移，例如实时问题走 Web，稳定事实走 Wikipedia。"
```
