### H-Mem: 混合结构记忆 (H-Mem)

```yaml
id: h_mem
name: H-Mem
full_name: 混合结构记忆 (H-Mem)
year: '2026.05'
org: CUHK-Shenzhen/Huawei Cloud
paper_url: https://arxiv.org/abs/2605.15701
category: structured
parent: himem
motivation: 树图混合建模记忆演化与检索
```

#### 📝 一句话总结
H-Mem 提出了一种混合树-图记忆结构，通过**时间层次树**（日/周/月/年四级语义摘要）组织对话片段、**实体关系图**维护跨会话实体链接，并结合**Ebbinghaus遗忘曲线**的记忆鲁棒性评分来检索长期对话记忆，在 LoCoMo、LongMemEvalS 和 REALTALK 三个基准上全面超越所有基线方法。

#### 🎯 核心要点
1. **混合索引结构**：H-Mem 同时构建两套互补索引——
   - **时间语义树（Temporal-Semantic Tree）**：4 层金字塔结构（日→周→月→年），底层存储细粒度记忆事件，上层通过语义聚类（阈值从 L2 到 L4 分别为 0.8/0.7/0.6）合并成高层摘要
   - **实体关系图（Entity Graph）**：从记忆片段中提取实体及其关系，构建 Person/Organization/Location/Event 等类型实体节点及带标签的关系边，支持实体中心的记忆检索

2. **记忆鲁棒性建模**：创新性地引入 Ebbinghaus 遗忘曲线来量化记忆的衰减与强化：
   $$R(m,t) = \exp\left(-\frac{t-r_m}{\tau(1+\eta\log(1+n_m))}\right)$$
   （τ=365天，η=0.5，重复强化次数 n_m 越多，衰减越慢），一年后未经强化的记忆 R≈36.8%，在检索排序中赋予稳定/反复出现的记忆更高权重

3. **自适应检索规划器（Retrieval Planner）**：三阶段策略——
   (a) 将复杂 query 分解为原子子查询（sub-query）；
   (b) 为每个子查询预测记忆范围（Short 细粒度时刻 / Long 持久记忆 / Mixed 混合）；
   (c) 首轮证据不足时自动生成**缺失信息追问（missing-information query）**触发二轮目标检索

4. **三基准全面 SOTA**：
   | 数据集 | H-Mem F1 | H-Mem Acc | 最强基线 F1 | 最强基线 Acc |
   |--------|----------|-----------|-------------|--------------|
   | LoCoMo | **55.58** | **92.01** | 50.93 (MemGPT) | 89.32 (MemGPT) |
   | LongMemEvalS | **58.46** | **89.20** | 50.85 (MemGPT) | 86.00 (MemGPT) |
   | REALTALK | **39.31** | **78.16** | 38.92 (MemGPT) | 76.10 (MemGPT) |

5. **消融发现**：结构贡献排序为 **树 > 图 > 记忆鲁棒性**。去除 Temporal Tree 导致 F1 下降 ~6-7 个百分点，去除 Entity Graph 下降 ~3-4 个百分点，去除 Memory Robustness 下降 ~1-2 个百分点。adaptive scope 相比固定 Mixed scope 节省 1.8× 检索 token，而性能无损。

#### 🔬 深入细节
![H-Mem 示意图](https://ar5iv.labs.arxiv.org/html/2605.15701/assets/x1.png)
*图：H-Mem 的核心框架或评测示意。*

##### 1. 架构示意图

```
┌─────────────────────────────────────────────────────────┐
│                    Query (用户提问)                       │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Retrieval Planner (检索规划器)               │
│  ① Query Decomposition → [sub-q1, sub-q2, ...]          │
│  ② Scope Prediction → Short / Long / Mixed               │
│  ③ Evidence Gap Detection → missing-info query (if)      │
└────────┬──────────────────────────────┬─────────────────┘
         ▼                              ▼
┌────────────────────┐     ┌──────────────────────────────┐
│  Temporal-Semantic │     │      Entity Graph             │
│       Tree         │     │  ┌─────┐    ┌─────┐          │
│   L4: Year ──────┐ │     │  │Alice│───▶│Bob  │          │
│   L3: Month ───┐ │ │     │  └──┬──┘    └──┬──┘          │
│   L2: Week  ──┐│ │ │     │     │works_at │lives_in      │
│   L1: Day ──┐ ││ │ │     │  ┌──▼──┐    ┌──▼──┐          │
│   Leaf:     │ ││ │ │     │  │Org X│    │City Y│          │
│   Events   ◄┘ ││ │ │     │  └─────┘    └─────┘          │
│  (fragments)  ▼▼ ▼ │     └──────────────────────────────┘
│  → semantic clustering                               │
└────────────────────┘
         │                              │
         └──────────┬───────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────┐
│       Evidence Ranking (证据排序)                         │
│  s(m,q) = 0.70·sim(m,q) + 0.15·time(m,q) + 0.15·R(m,t) │
│  R(m,t) = exp(-(t-rm) / (τ(1+η·log(1+nm))))            │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│              LLM Answer Generation                       │
│         (with retrieved evidence as context)             │
└─────────────────────────────────────────────────────────┘
```

[架构图](https://ar5iv.org/html/2605.15701/x1.png)

##### 2. 核心算法伪代码

**离线索引构建（Offline Indexing）**

```
Algorithm: H-Mem Offline Indexing
Input: Conversation history C with timestamps
Output: Temporal-Semantic Tree T, Entity Graph G

1.  Split C into fragments F = [(text, ts), ...] by time window
2.  For each fragment f in F:
3.    Extract entities E_f, relations R_f via LLM IE prompt
4.    For each entity e in E_f:
5.      Normalize e (lowercase, type-map, punctuation removal)
6.      if exact match or fuzzy match with existing entity node:
7.        merge e into existing node, store alias if new
8.      else:
9.        create new entity node, link to f (provenance)
10.   For each relation r in R_f:
11.     Resolve source/target entities → entity nodes
12.     if same relation already exists between same nodes:
13.       merge supporting evidence
14.     else:
15.       insert edge with (label, confidence, timestamp)
16. // Tree Construction
17. Assign each fragment to L1 (Day) bucket by timestamp
18. For each L1 bucket:
19.   Cluster fragments semantically → L1 memory events
20.   Generate summary text for each L1 event via LLM
21. For l = 2 to 4:
22.   Within temporal window β_l:
23.     Cluster L(l-1) events where cos_sim > α_l
24.     Generate consolidated summary → L_l events
25. Return T (4-level tree), G (entity graph)
```

**在线检索（Online Retrieval）**

```
Algorithm: H-Mem Retrieval
Input: Query q, Tree T, Graph G
Output: Answer a

1.  // Step 1: Planning
2.  sub_queries = LLM_Decompose(q)
3.  For each sub_q in sub_queries:
4.    scope = LLM_PredictScope(sub_q)  // Short/Long/Mixed
5.    // Step 2: First-pass retrieval
6.    evidence = []
7.    if scope in {Short, Mixed}:
8.      candidates_T = SemanticSearch(sub_q, T.leaf_events, top_k=30)
9.      evidence.extend(candidates_T)
10.   if scope in {Long, Mixed}:
11.     candidates_upper = SemanticSearch(sub_q, T.L2+L3+L4, top_k=10)
12.     evidence.extend(candidates_upper)
13.   // Graph retrieval
14.   entities_in_q = ExtractEntities(sub_q)
15.   for each entity e:
16.     fragments_via_e = G.get_linked_fragments(e, k=10)
17.     evidence.extend(fragments_via_e)
18.   // Step 3: Ranking
19.   For each m in evidence:
20.     score[m] = 0.70·sim(m, sub_q) + 0.15·time(m, sub_q) + 0.15·R(m, now)
21.   top_evidence = TopK(evidence, by score, k=5)
22.   // Step 4: Gap detection
23.   if LLM_IsEvidenceSufficient(top_evidence, sub_q) == False:
24.     missing_q = LLM_GenerateMissingQuery(sub_q, top_evidence)
25.     extra_evidence = Retrieve(missing_q)  // second pass
26.     top_evidence.extend(extra_evidence)
27. // Step 5: Final answer generation
28. a = LLM_GenerateAnswer(q, all_top_evidence)
29. Return a
```

##### 3. 深入细节

**细节一：时间语义树的四级层次设计原理**

H-Mem 的时间语义树并非简单的按时间分桶，而是采用了**金字塔式的渐进语义抽象**策略。具体而言：

- **L1 (Day)**：以天为时间窗口，将一天内的对话片段通过语义聚类（阈值默认 0.6→0.5→0.4 递归合并为记忆事件）组织为原子级的记忆事件。每个 L1 事件保留原始对话证据指针（provenance pointer），使其在后续检索中可被 trace back。
- **L2 (Week)→L3 (Month)→L4 (Year)**：每上升一层，时间窗口扩大一个数量级（7天→30天→365天），同时语义聚类阈值逐步降低（0.8→0.7→0.6）。阈值递减的原因是：高层摘要旨在捕捉更抽象、更持久的记忆模式（如"用户喜欢阅读"这样一个跨年有效的大模式），而低层保留更多具体细节（如"用户上周读了某本书"）。
- **最大活跃层级动态调整**：为避免短历史对话产生无意义的高层空摘要，系统根据对话历史长度动态决定活跃层级——历史 < 7 天仅激活日/周级，7-30 天激活日/周/月级，>30 天才激活全部四级。

这种设计使得系统既能回答高时间特异性问题（"上周三 Alice 说了什么"），也能回答跨时间整合问题（"Bob 的长期饮食偏好是什么"），通过 scope prediction 自适应选择检索层级。

**细节二：实体图构建中的消歧与合并策略**

H-Mem 的实体图构建包含三个精细步骤：

1. **实体抽取与规范化**：每个记忆片段通过 LLM IE prompt 提取实体（包含 surface name、type、role、salience score）和关系（source、target、relation label、confidence）。type 被归一化到 {person, organization, location, event, product, work, date, time, other} 九类。若 LLM 提取失败，降级使用 spaCy NER 保底。

2. **实体解析（Entity Resolution）**：采用分层匹配策略——
   - 首先精确匹配：新提取的实体名称与已存在节点名称完全一致且类型兼容
   - 其次模糊匹配：计算 token overlap + fuzzy string matching（限定编辑距离阈值）
   - 匹配成功则合并到已有节点，并将新 surface name 作为别名存储
   - 匹配失败则创建新节点
   
3. **区别于图修复（Graph Repair）**：对于短单名/昵称形式的变体（如"Bob"和"Bobby"），若不满足合并条件则保持为独立节点，但可能添加 `overlap` 边（基于前缀/后缀匹配）。这种边仅用于提升检索召回率，不表示实体等价，避免错误合并。

每个实体节点和关系边都保留指向原始片段的 provenance 指针，在最终答案生成前通过 provenance 验证证据的可信度。

**细节三：记忆鲁棒性评分的心理学原理与参数设计**

H-Mem 的记忆鲁棒性模型直接受 Ebbinghaus 遗忘曲线启发，其核心公式为：

$$R(m,t) = \exp\left(-\frac{t - r_m}{\tau \cdot (1 + \eta \cdot \log(1 + n_m))}\right)$$

参数设计思路：
- **τ = 365 天**：使未加固记忆在一年后衰减至约 36.8%（e^(-1)），对应遗忘约 63.2%。论文认为这对长期 agent 记忆是合理的——用户偏好、关系等应在年尺度上仍可检索，而非被快速遗忘。
- **η = 0.5**：控制重复强化效果。因子 (1 + η·log(1+n_m)) 使记忆随强化次数 n_m 增加而衰减更慢，模拟了"每次回顾/使用都会强化记忆"的心理学规律。
- **在总分中的权重 w_mem = 0.15**：鲁棒性分数仅作为弱先验，不主导语义相关性（w_sem=0.70），避免过度惩罚近期但不重要的记忆，或过度提升高频但不相关的记忆。
- 当无显式时间提示时（w_time=0），语义相关性权重实际达 0.85，确保检索始终以语义匹配为核心。

消融实验证明，去除记忆鲁棒性后 F1 下降约 1-2 个百分点——虽不及树和图的贡献大，但在年尺度的长期记忆中提供了稳定的增量收益。

#### 🧪 练习题
```yaml
question: "H-Mem 为什么要同时维护时间语义树和实体关系图，而不是只用一种索引结构？"
options:
  - "因为树结构只能做训练，图结构只能做部署"
  - "因为树更适合跨时间层级摘要与时序检索，图更适合实体跳转与关系追溯，两者互补"
  - "因为图结构无法存储时间戳，所以必须再加一棵树做备份"
  - "因为论文要求所有记忆都同时保存三份副本"
answer: 1
explain: "H-Mem 的 hybrid structure 让树负责时间层级组织与摘要，图负责实体关系与多跳追溯；只靠单一结构很难同时兼顾长期演化和关系检索。"
```
