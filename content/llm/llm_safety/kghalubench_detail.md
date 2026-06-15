### KGHaluBench: 用知识图谱构造和验证幻觉基准

```yaml
id: kghalubench
name: KGHaluBench
full_name: 知识图谱幻觉基准 (Knowledge Graph Hallucination Benchmark)
year: '2026'
org: EACL
paper_url: https://aclanthology.org/2026.findings-acl.1/
category: hallucination
parent: factscore
motivation: 知识图谱自动化验证
```

#### 📝 一句话总结

KGHaluBench 利用知识图谱自动生成多面向问题，并用实体级与事实级验证流程判断模型回答是否支持、错误或回避，从而评估 LLM 知识广度和深度上的幻觉。

#### 🎯 核心要点

- **数据来源**：从知识图谱中抽取实体、属性和关系，动态构造覆盖不同知识维度的问题。
- **难度控制**：结合实体流行度和图谱统计估计问题难度，缓解只评估热门实体造成的偏差。
- **验证流程**：先判断回答是否回避，再做实体级匹配和事实级蕴含检查。
- **指标设计**：除普通 accuracy 外，还引入加权准确率和不同知识维度的幻觉率。
- **优势场景**：适合评估模型是否真正掌握长尾知识，以及是否在不确定时选择诚实回避。

#### 🔬 深入细节

![KGHaluBench 框架图](https://arxiv.org/html/2602.19643v1/Figures/KGHaluBench_Framework6.png)

图源：KGHaluBench 公开论文页面；manifest 中 ACL 页面作为条目元信息保留。

```text
Algorithm: KGHaluBench question generation and verification
Input:
  knowledge graph G = (E, R, F)
  entity sampling policy pi
  target LLM M
  verifier V
Output:
  weighted accuracy and hallucination metrics

1. Sample entity e and relations or attributes from G.
2. Estimate difficulty from entity popularity and graph statistics.
3. Generate a natural-language question q whose answer is grounded in G.
4. Query target model: y = M(q).
5. If y is an abstention:
     score as abstained, not hallucinated.
6. Run entity-level verification:
     check whether required entities appear or are semantically matched.
7. Run fact-level verification:
     decompose y into facts and test support against KG-derived evidence.
8. Aggregate results with difficulty weights:
     report weighted accuracy, hallucination rate, and abstention behavior.
```

KGHaluBench 的生成侧依赖知识图谱的结构化优势。图谱中实体、关系和属性天然给出可验证事实，因此可以系统性地产生问题，而不是手工收集零散问答。通过控制实体流行度、关系数量和问题组合，benchmark 能覆盖热门知识与长尾知识。

验证侧分两层。实体级过滤先判断回答是否提到了正确实体，避免后续事实验证被明显错位的对象污染；事实级验证再判断具体断言是否被图谱或图谱派生证据支持。公开论文还描述了用 NLI 模型、小型 LLM 和少量专家判定组合的流水线，以平衡速度与可靠性。

难度加权是 KGHaluBench 区别于普通事实问答基准的重要点。热门实体更容易被模型记住，简单平均会高估模型真实知识覆盖。将实体流行度和图谱统计纳入权重后，长尾问题对指标的贡献更合理，能更好反映模型在知识广度和深度上的可靠性。

它与 FactScore 的关系在于都强调事实单元级评估，但 KGHaluBench 更依赖知识图谱自动构造问题和证据。FactScore 常用于长文本生成事实分解，KGHaluBench 则更像一个受控知识压力测试平台，可以系统追踪哪些实体族、关系类型和难度区间最容易触发幻觉。

#### 🧪 练习题

1. 为什么知识图谱适合构造可自动验证的幻觉检测基准？
2. 实体级验证和事实级验证各自能发现什么错误？
3. 如果一个模型经常 abstain，应如何同时评价它的谨慎性和有用性？
