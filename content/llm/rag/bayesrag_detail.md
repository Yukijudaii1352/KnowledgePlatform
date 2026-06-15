### BayesRAG：贝叶斯多模态证据互证

```yaml
id: bayesrag
name: BayesRAG
full_name: 贝叶斯多模态RAG (Bayesian Multimodal RAG)
year: '2026.01'
org: KAIST
paper_url: https://arxiv.org/abs/2601.07329
category: frontier_2026
parent: videorag
motivation: 概率性证据互证机制解决多模态保真度融合
```

#### 📝 一句话总结

BayesRAG 将多模态检索重写为贝叶斯证据融合问题，用查询相关 likelihood、跨模态一致性 prior 和 Dempster-Shafer 证据理论共同计算后验置信度，解决文本、图像和版面证据高相似但互相矛盾的问题。

#### 🎯 核心要点

- **多模态证据 tuple**：把文本、视觉元素和页面/截图布局组合成候选证据单元。
- **贝叶斯后验排序**：以 \(P(E\mid Q)\propto P(Q\mid E)P(E)\) 重排检索结果。
- **Dempster-Shafer likelihood**：融合不同模态的相关性质量函数，处理不确定和冲突证据。
- **一致性 prior**：用 graph-topology prior 或 layout prior 衡量文本-图像是否天然属于同一证据单元。
- **冲突惩罚**：对高单模态相似但跨模态语义不一致的候选降权。
- **适用场景**：面向图文混排、表格图表丰富的长文档 QA，如 DocBench、MMLongBench-Doc。

#### 🔬 深入细节

![BayesRAG 架构图](https://ar5iv.labs.arxiv.org/html/2601.07329/assets/x1.png)

*图源：ar5iv 论文图 1，展示 BayesRAG 把多模态检索候选通过 likelihood、prior 和 posterior 进行证据融合。*

```python
def bayesrag_rank(query, text_hits, image_hits, page_hits, graph_or_layout):
    candidates = make_evidence_tuples(text_hits, image_hits, page_hits)
    ranked = []
    for E in candidates:
        # likelihood: 各模态与 query 的相关性，经 Dempster-Shafer 融合
        masses = [mass_function(similarity(query, item)) for item in E]
        likelihood = dempster_shafer_combine(masses).belief("relevant")

        # prior: tuple 内部是否互相支持
        if graph_or_layout.type == "graph":
            prior = graph_topology_consistency(E, graph_or_layout)
        else:
            prior = layout_proximity(E, graph_or_layout)

        posterior = likelihood * prior
        ranked.append((posterior, E))
    return [E for _, E in sorted(ranked, reverse=True)]
```

BayesRAG 针对视觉丰富文档中的“bag-of-evidence”问题。普通多模态 RAG 往往分别检索文本、图片和页面，再把 top-k 合并；但高相似并不等于互相支持。例如文本候选可能说水果 apple，图像候选却是 Apple 公司 logo，二者都与查询相似，却组合成错误证据。

论文将候选证据表示为 \(E=(e_{\text{text}}, e_{\text{vision}}, e_{\text{screenshot}})\)，目标是估计：

$$
P(E\mid Q)\propto P(Q\mid E)P(E).
$$

其中 \(P(Q\mid E)\) 是 evidence tuple 对查询的解释能力，来自各模态 embedding 相似度；\(P(E)\) 是证据内部一致性，即这些文本、图片和页面元素在语义或布局上是否本来就应该关联。

likelihood 部分使用 Dempster-Shafer 证据理论。每个模态根据相似度给出“相关/不相关/不确定”的质量函数，组合规则会显式处理冲突：多个模态一致支持时 belief 上升，彼此矛盾时联合置信度下降。这比简单平均相似度更适合多模态噪声场景。

prior 部分有两种实现。Graph-topology prior 把文档元素构成多模态知识图，优先选择在图中连接强、语义一致的 tuple；layout prior 使用页面坐标和邻近关系，认为同页相邻的图文更可能互相解释。最终 posterior 重排让 BayesRAG 优先选择“既与查询相关，又相互 corroborate”的证据。

#### 🧪 练习题

```yaml
question: "BayesRAG 中 prior P(E) 主要表示什么？"
options:
  - "语言模型参数的先验分布"
  - "证据 tuple 内部在语义、图结构或版面上的一致性"
  - "检索器返回文档的原始顺序"
  - "答案长度的惩罚项"
answer: 1
explain: "BayesRAG 用 prior 衡量文本、图像和页面证据是否天然互相支持，从而惩罚跨模态冲突。"
```
