### LinearRAG：线性图谱检索增强

```yaml
id: linearrag
name: LinearRAG
full_name: 线性图谱检索增强 (Linear Graph Retrieval-Augmented Generation)
year: '2026.01'
org: Tsinghua/Alibaba
paper_url: https://arxiv.org/abs/2412.14833
category: frontier_2026
parent: graphrag
motivation: 三图层级结构使索引成本线性增长，避开关系抽取
```

#### 📝 一句话总结

LinearRAG 提出 relation-free Tri-Graph，用实体、句子和段落三类节点替代昂贵且不稳定的关系抽取，再通过局部语义桥接和全局重要性聚合完成多跳检索，解决 GraphRAG 索引成本高、关系噪声大和可扩展性差的问题。

#### 🎯 核心要点

- **实际论文页**：manifest 中 `2412.14833` 指向骨架动作识别论文；LinearRAG 实际公开论文为 `https://arxiv.org/abs/2510.10114`。
- **Tri-Graph 索引**：构建 entity、sentence、passage 三层节点，仅保留“提及/包含”边。
- **避开关系抽取**：不用 OpenIE 或 LLM 抽取三元组，减少错误关系和额外 token 成本。
- **局部语义桥接**：在 entity-sentence 子图上传播查询语义，激活隐含中间实体。
- **全局重要性聚合**：在 entity-passage 子图上用 Personalized PageRank 聚合 passage 重要性。
- **线性扩展**：句子切分、NER、稀疏邻接矩阵和 SpMM/PPR 让构建与检索近似随语料规模线性增长。

#### 🔬 深入细节

![LinearRAG 框架图](https://ar5iv.labs.arxiv.org/html/2510.10114/assets/x1.png)

*图源：ar5iv 论文图 1，展示 LinearRAG 的 relation-free 图构建与两阶段检索思路。*

```python
def build_trigraph(passages):
    graph = TriGraph()
    for passage in passages:
        p_node = graph.add_passage(passage)
        for sentence in split_sentences(passage):
            s_node = graph.add_sentence(sentence)
            for ent in ner(sentence):
                e_node = graph.add_entity(ent)
                graph.add_edge(e_node, s_node)  # mention matrix M
                graph.add_edge(e_node, p_node)  # contain matrix C
    return graph

def linearrag_retrieve(query, graph, embedder, top_k=5, delta=4):
    seed_entities = match_query_entities(query, graph.entities)
    activation = initialize(seed_entities)

    # Stage 1: local semantic bridging on entity-sentence graph
    for _ in range(4):
        activation = sparse_semantic_propagation(activation, graph.M, embedder)
        activation = prune_below_threshold(activation, delta)
        if no_new_entities(activation):
            break

    # Stage 2: global importance aggregation on entity-passage graph
    ppr_scores = personalized_pagerank(graph.C, seeds=activation)
    return top_passages_by_score(ppr_scores, top_k)
```

LinearRAG 的出发点是对 GraphRAG 做“减法”。许多 GraphRAG 系统会先把文本抽成实体-关系三元组，再在图上做推理；但关系抽取常常把否定、条件、上下文省略或层级关系抽错。一旦错误关系进入图，检索会沿着这些边扩散，把语义相关但事实无关的段落带入上下文。

Tri-Graph 只抽取实体并保留原文段落，不显式抽取关系。图中有三类节点：passage 保存完整上下文，sentence 作为局部语义桥，entity 作为跨段落锚点。两类稀疏矩阵分别表示实体被哪些句子提及、实体出现在哪些段落中。这样关系语义仍留在原文里，由生成模型在读证据时解释，而不是提前压缩成可能错误的三元组。

检索第一阶段是 entity activation。查询中的实体先成为种子，然后在 entity-sentence 子图中传播相似度，找到没有字面出现在查询里、但通过句子语义连接多跳推理链的中间实体。阈值 \(\delta\) 控制扩散边界，避免实体激活指数级膨胀。

第二阶段是 passage retrieval。LinearRAG 把激活实体作为 Personalized PageRank 的种子，在 entity-passage 子图中聚合全局重要性。一个 passage 的分数既来自与查询的直接相似度，也来自它包含多少高激活实体以及这些实体在图中的位置。最终 top-k passage 被送给 LLM 生成答案。

与 GraphRAG 相比，LinearRAG 的核心优势是“结构足够、关系留白”。它仍然利用实体连接跨文档信息，但不让不可靠的关系抽取决定推理路径；因此更适合大规模语料、多跳 QA 和需要频繁增量更新的企业知识库。

#### 🧪 练习题

```yaml
question: "LinearRAG 为什么刻意避免显式关系抽取？"
options:
  - "因为实体节点完全不能用于检索"
  - "因为关系抽取昂贵且容易产生错误边，原文段落能保留更完整的关系语义"
  - "因为 Personalized PageRank 只能处理图片"
  - "因为它不需要任何索引结构"
answer: 1
explain: "LinearRAG 用实体、句子和段落连接保留多跳检索能力，同时避免错误三元组在图中扩散噪声。"
```
