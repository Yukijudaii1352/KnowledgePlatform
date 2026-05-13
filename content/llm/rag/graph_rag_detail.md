### Graph RAG — 基于图的检索增强生成

```yaml
id: graph_rag
name: Graph RAG
full_name: 基于图的检索增强生成 (Graph-based Retrieval-Augmented Generation)
year: 2024
org: Microsoft Research
paper_url: https://arxiv.org/abs/2404.16130
category: rag
parent: naive_rag
motivation: 构建知识图谱+社区层级摘要，用map-reduce全局总结替代向量相似度检索，支持全语料库推理，解决跨文档总结难题
```

#### 📝 一句话总结

Graph RAG 通过 LLM 从源文档中自动构建实体知识图谱，利用图社区检测生成层级化社区摘要，并在查询时采用 map-reduce 机制对社区摘要进行查询聚焦总结，从而解决了传统 RAG 无法回答需要全语料库推理的全局性问题（如"数据集的主要主题是什么？"）的根本缺陷。

#### 🎯 核心要点

- **问题定义**：针对"全局性 sensemaking 问题"——需要跨越整个文档集合进行推理的查询，传统向量相似度 RAG 无法胜任
- **图索引构建**：使用 LLM 从源文本块中提取实体（节点）和关系（边），构建实体知识图谱；支持多轮 gleanings 提升抽取召回率
- **层级社区检测**：对知识图谱应用 Leiden 算法进行社区检测，生成多层级的社区划分（从根级 C0 到叶级 C3）
- **社区摘要生成**：对每个社区使用 LLM 生成涵盖其内部实体、关系和关键声明的描述性摘要
- **Map-Reduce 查询机制**：查询时将用户问题并行发送到所有社区摘要（map），再将中间答案聚合为最终全局回答（reduce）
- **评估指标**：采用 LLM-as-a-judge 的 head-to-head 比较，衡量 Comprehensiveness、Diversity、Empowerment、Directness 四个维度
- **核心结论**：Graph RAG 在 comprehensiveness（72-83% 胜率）和 diversity（62-82% 胜率）上显著优于 naïve RAG；根级社区摘要（C0）仅需不到 3% 的 token 即可获得竞争力强的全局回答

#### 🔬 深入细节

![Graph RAG 整体流程图](https://arxiv.org/html/2404.16130v2/x1.png)
*图：Graph RAG 流程概览——从源文档到文本块、到实体图、到社区层级、到社区摘要，最终通过 map-reduce 生成全局答案*

##### 算法伪代码

```python
# Graph RAG 索引构建与查询流程

# ===== Phase 1: 索引构建 (Indexing) =====
def build_graph_index(documents):
    # Step 1: 文本分块
    chunks = split_into_chunks(documents, chunk_size=600, overlap=100)
    
    # Step 2: LLM 实体与关系抽取 (含多轮 gleanings)
    entities, relations = [], []
    for chunk in chunks:
        e, r = llm_extract_entities_relations(chunk)  # 首轮抽取
        for _ in range(num_gleanings):  # 多轮追加抽取遗漏实体
            missed = llm_gleaning(chunk, already_found=e)
            e.extend(missed)
        entities.extend(e); relations.extend(r)
    
    # Step 3: 构建知识图谱并做社区检测
    graph = build_graph(entities, relations)  # 实体=节点, 关系=边
    communities = leiden_algorithm(graph)      # 多层级社区划分
    
    # Step 4: 为每个社区生成摘要
    for level in communities.levels():         # C0(根) → C3(叶)
        for community in communities.at(level):
            summary = llm_summarize(community.entities, 
                                     community.relations,
                                     community.claims)
            community.summary = summary
    return graph, communities

# ===== Phase 2: 查询 (Query) =====
def query_graph_rag(question, communities, level):
    # Map: 对选定层级的每个社区摘要生成中间回答
    intermediate_answers = []
    for community in communities.at(level):
        answer = llm_answer(question, context=community.summary)
        score = llm_rate_helpfulness(answer)  # 0-100 评分
        if score > 0:
            intermediate_answers.append((answer, score))
    
    # Reduce: 按评分排序，贪心填充 context window，生成最终回答
    intermediate_answers.sort(key=lambda x: x[1], reverse=True)
    context = greedy_fill(intermediate_answers, max_tokens=8000)
    final_answer = llm_synthesize(question, context)
    return final_answer
```

##### 动机与背景

传统 RAG（Retrieval-Augmented Generation）的核心思路是将用户查询嵌入向量空间，检索语义最相似的文本块作为 LLM 的上下文。这种方法对**局部性问题**（如"X 是谁？""Y 发生在哪里？"）效果良好，但面对**全局性问题**（如"这个数据集的主要主题有哪些？""不同社区之间有什么共同特征？"）时存在根本性缺陷：

1. **检索盲区**：向量相似度检索倾向于返回与查询表面相似的片段，无法覆盖分散在整个语料库中的相关信息
2. **上下文窗口限制**：即使模型支持 128k token 的上下文窗口，直接塞入全部源文本也存在"lost in the middle"问题——中间位置的信息容易被忽略
3. **缺乏全局视角**：没有机制将分散的局部信息聚合为全局性的结构化理解

Graph RAG 的核心洞察是：**利用知识图谱的天然模块性（modularity）来组织和压缩信息**，通过社区检测将图划分为语义连贯的子结构，再对每个子结构生成摘要，从而实现对全语料库的层级化理解。

##### 核心机制详解

**1. 实体与关系抽取**

Graph RAG 使用 LLM（论文中为 GPT-4 Turbo）从每个文本块中抽取实体和关系。与传统 NER 不同，这里的实体类型由领域需求灵活定义（如人物、组织、事件、地点等），关系同样以自然语言描述形式保留。

关键创新是 **多轮 gleanings 机制**：首轮抽取后，LLM 被反复提示"是否还有遗漏的实体？"，每轮追加新发现的实体。论文发现这显著提升了抽取的召回率，尤其对于信息密度高的长文本块。

**2. 图构建与社区检测**

所有抽取的实体作为节点、关系作为边构建加权无向图。同一实体在不同文本块中的多次出现会被合并，边权重反映关系被提及的频次。

社区检测采用 **Leiden 算法**（Traag et al., 2019），这是 Louvain 算法的改进版本，能保证社区的连通性。Leiden 算法递归地将图划分为层级化的社区结构：

$$Q = \frac{1}{2m} \sum_{ij} \left[ A_{ij} - \frac{k_i k_j}{2m} \right] \delta(c_i, c_j)$$

其中 \(Q\) 是模块度，\(A_{ij}\) 是邻接矩阵，\(k_i\) 是节点度数，\(m\) 是总边数，\(\delta(c_i, c_j)\) 在节点 \(i\) 和 \(j\) 属于同一社区时为 1。Leiden 算法通过最大化模块度来发现紧密连接的社区。

这产生了从粗粒度（根级 C0，少量大社区）到细粒度（叶级 C3，大量小社区）的层级结构。例如，Podcast 数据集产生了 8564 个节点、20691 条边的图，其中 C0 仅有 34 个社区摘要，而 C3 有 1310 个。

**3. 社区摘要生成**

对每个社区，将其包含的实体描述、关系描述和声明（claims）按重要性排序后输入 LLM，生成一段综合性摘要。叶级社区直接从元素描述生成摘要；上层社区则从其子社区的摘要递归生成。

> 💡 关键：社区摘要是一种**预计算的全局索引**——它在索引阶段一次性生成，查询时可直接复用，避免了每次查询都遍历原始文本的高昂成本。

**4. Map-Reduce 查询聚焦总结**

查询时，Graph RAG 采用经典的 map-reduce 模式：

- **Map 阶段**：将用户问题与每个社区摘要配对，LLM 为每对生成一个中间回答，并自评 0-100 的有用性评分。评分为 0 的回答被过滤。
- **Reduce 阶段**：将中间回答按评分降序排列，贪心地填充到上下文窗口（8k tokens），最后由 LLM 综合所有中间回答生成最终答案。

$$\text{FinalAnswer} = \text{LLM}_{\text{reduce}}\left(q, \text{TopK}\left(\{(a_i, s_i)\}_{i=1}^{N}\right)\right)$$

其中 \(q\) 是用户查询，\(a_i\) 是第 \(i\) 个社区的中间回答，\(s_i\) 是其有用性评分，TopK 按评分选取能填满上下文窗口的回答子集。

##### 与传统方法的关键区别

| 维度 | Naïve RAG (SS) | 全局文本总结 (TS) | Graph RAG |
|------|---------------|-----------------|-----------|
| 检索方式 | 向量相似度 top-k | 全文 map-reduce | 社区摘要 map-reduce |
| 全局覆盖 | ❌ 仅局部片段 | ✅ 遍历全文 | ✅ 遍历所有社区 |
| Token 效率 | 低（固定 k 块） | 最低（全文） | 高（C0 仅需 ~3% token） |
| 信息组织 | 无结构 | 无结构 | 图+层级社区结构 |
| 预计算 | 仅嵌入 | 无 | 图索引+社区摘要 |

##### 实验结果

论文在两个约 100 万 token 的数据集上评估：Podcast 转录文本（1669 条 600-token 块）和新闻文章（3197 条块）。使用 GPT-4 Turbo 作为 LLM evaluator 进行 head-to-head 比较，每组 125 个问题，每个比较重复 5 次取均值。

**核心发现**：
- **Graph RAG vs. Naïve RAG**：所有 Graph RAG 层级（C0-C3）在 comprehensiveness 上获得 72-83% 胜率，diversity 上获得 62-82% 胜率
- **Graph RAG vs. 全局文本总结（TS）**：中间层级社区摘要（C1-C2）在 comprehensiveness 和 diversity 上略优于 TS，同时节省 26-33% 的 token
- **根级摘要（C0）的效率优势**：C0 仅需全文 2.3-2.6% 的 token，却仍保持 72% 的 comprehensiveness 胜率和 62% 的 diversity 胜率（vs. Naïve RAG）
- **Directness（控制指标）**：Naïve RAG 在 directness 上表现最佳，符合预期——直接检索的片段更具针对性，但缺乏全局视角
- **上下文窗口**：8k token 的上下文窗口在 comprehensiveness 上优于 16k/32k/64k（平均 58.1% 胜率），验证了"lost in the middle"效应

> ⚠️ 注意：Empowerment 指标上各方法差异不大，分析表明这与具体引用和示例的保留程度有关——Graph RAG 的摘要过程可能丢失了部分原始细节。

#### 🧪 练习题

```yaml
question: "Graph RAG 在查询阶段使用什么机制来综合多个社区摘要的信息？"
options:
  - "向量相似度检索最相关的社区摘要"
  - "将所有社区摘要拼接后直接输入 LLM"
  - "Map-Reduce：先对每个社区摘要生成中间回答，再聚合为最终答案"
  - "使用图遍历算法沿关系路径逐步推理"
answer: 2
explain: "Graph RAG 在查询时采用 map-reduce 模式：map 阶段对每个社区摘要独立生成中间回答并评分，reduce 阶段将高分中间回答聚合生成最终全局答案。这避免了上下文窗口限制，同时保证了全局覆盖。"
```