### GoT: 思维图 (Graph of Thoughts)
```yaml
id: got
name: GoT
full_name: 思维图 (Graph of Thoughts)
year: '2024'
org: ETH Zurich
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/29720
category: reasoning
parent: tot
motivation: 将思维建模为有向图支持聚合循环
```

#### 📝 一句话总结
Graph of Thoughts 将中间思维从线性链或树扩展为有向图，使模型能生成、聚合、评分、筛选并循环改写 thought，解决了 ToT 难以表达多分支合并和复杂工作流的问题。

#### 🎯 核心要点
- 将 thought 表示为图中的顶点，将操作依赖表示为有向边
- 支持 Generate、Aggregate、Score、KeepBest 等 thought transformation
- 比 CoT、Self-Consistency、ToT 更自然地表达分支合并和循环 refinement
- 引入 Graph Reasoning State / controller 思路来调度图执行
- 在排序、集合交集、关键词计数、文档合并等任务中验证
- 目标是在质量、成本和延迟之间获得更灵活的 tradeoff

#### 🔬 深入细节
![Graph of Thoughts 与其他 prompting 策略对比](https://ar5iv.labs.arxiv.org/html/2308.09687/assets/x1.png)
*图：论文 Figure 1，对比 GoT 与 IO、CoT、Self-Consistency、ToT 等提示策略。图源：ar5iv / arXiv。*

```python
# Graph of Thoughts 调度伪代码
def run_got(lm, graph_plan, input_data):
    graph = ThoughtGraph()
    graph.add_node("input", value=input_data)

    for op in graph_plan:
        parents = graph.get_nodes(op.inputs)
        if op.type == "Generate":
            children = generate_thoughts(lm, parents, n=op.n)
            graph.add_children(parents, children)
        elif op.type == "Aggregate":
            merged = aggregate_thoughts(lm, parents)
            graph.add_node(op.output, merged, parents=parents)
        elif op.type == "Score":
            graph.attach_scores(score_thoughts(lm, parents))
        elif op.type == "KeepBest":
            graph.keep_top_k(parents, k=op.k)
    return graph.best_output()
```

GoT 把推理过程表示为有向图 \(G=(V,E)\)。每个顶点 \(v \in V\) 是一个 thought，可以是部分答案、候选列表、摘要片段或中间分析；边 \(e \in E\) 表示某个 thought transformation 的输入输出依赖。这样，多个 thought 可以被聚合成一个新 thought，一个 thought 也可以被多次扩展或回到前面步骤重新 refinement。

ToT 的结构是树，适合“从一个状态分裂出多个候选，再继续向下搜索”。但许多任务需要合并：例如把长列表切块排序后再合并，把多个文档摘要融合成一个摘要，把多个候选解的优点整合。树结构表达合并很别扭，图结构则可以把 Aggregate 作为一等操作。

GoT 的操作层使 prompt workflow 更像可编排程序。Generate 负责产生候选，Score 负责评价候选，KeepBest 做剪枝，Aggregate 负责融合多个候选。不同任务可以复用这些算子，只替换 prompt 模板和图计划。例如排序任务可以“分块生成排序结果 → 聚合 → 再评分修正”。

与 ReAct 的工具调用不同，GoT 的重点不是外部环境反馈，而是组织 LLM 自身的多次生成与选择。它牺牲一些实现复杂度，换来更强的工作流表达能力；当任务需要多轮合并、改写和筛选时，这种图式结构比线性 CoT 更稳定。

> 💡 关键：GoT 的创新在于允许 thought 之间多对一、一对多和循环依赖，把 prompt reasoning 从搜索树升级为可编排图。

#### 🧪 练习题
```yaml
question: "GoT 相比 ToT 最重要的结构扩展是什么？"
options:
  - "完全移除中间 thought"
  - "允许多个 thought 聚合成新 thought，并支持图式依赖"
  - "只保留一条贪心路径"
  - "要求所有任务都调用外部搜索引擎"
answer: 1
explain: "GoT 将思维组织为有向图，因此可以表达分支、合并、评分、筛选和循环改写等复杂流程。"
```
