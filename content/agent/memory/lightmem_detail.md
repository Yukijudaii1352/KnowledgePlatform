### LightMem: 轻量级代理记忆 (LightMem)

```yaml
id: lightmem
name: LightMem
full_name: 轻量级代理记忆 (LightMem)
year: '2026.04'
org: UESTC/Kyung Hee University
paper_url: https://arxiv.org/abs/2604.07798
category: management
parent: memoryos
motivation: 小模型分工处理在线离线记忆
```

#### 📝 一句话总结
LightMem 提出了一种由多个专用小语言模型（SLM）协同驱动的轻量级代理长期记忆系统，通过将高频在线操作（查询规划、语义重排、记忆写入）与离线知识整合解耦，在固定检索预算下实现高效、准确的记忆调用，解决了现有检索式记忆精度不稳、LLM 驱动记忆延迟高的问题。

#### 🎯 核心要点
- **三层记忆架构**：STM（短期工作记忆）、MTM（用户级中期情景记忆）、LTM（去标识化跨用户语义知识图），分层管理不同粒度的记忆
- **三个专用 SLM 分工**：Controller（SLM-1）生成假设查询与检索计划，Selector（SLM-2）执行两阶段检索与语义重排，Writer（SLM-3）压缩写入新记忆
- **两阶段检索机制**：Stage 1 向量粗检索压缩候选集至 2K，Stage 2 语义一致性重排序精选出最终 Top-K，弥补向量相似与“任务相关”之间的鸿沟
- **在线/离线分离**：在线路径严格限制 SLM 调用和检索预算（中位 83 ms），离线 LLM 批量增量整合 MTM 高价值条目到图结构 LTM
- **用户级隔离**：每条记忆嵌入用户标识符，支持严格的多用户逻辑隔离
- **在 LoCoMo（长对话逻辑推理）和 DialSim（多用户对话模拟）上验证**：平均 F1 提升约 2.5（相对 A-MEM），多跳和时序任务改善尤为显著
- **端到端中位延迟仅 581 ms**，有效上下文长度约 1K tokens，显著低于 LLM 驱动记忆系统

#### 🔬 深入细节
##### 1. 动机与背景

大型语言模型驱动的 AI 代理在长期交互中面临严重的记忆退化问题。现有方案分为两类：
- **检索式记忆**（如 MemoryBank）：效率高，但查询构造差、向量纯相似度检索引入大量噪声，精度随记忆增长而急剧恶化
- **LLM 驱动记忆**（如 MemGPT、A-MEM）：精度高，但每次交互需反复调用大模型，延迟累积严重（尤其在长对话中）

LightMem 用一个关键洞察填补了这道鸿沟：**将记忆系统的结构化决策模块（意图路由、语义过滤、摘要压缩）分配给专门的 SLM，远比反复调用通用 LLM 更高效且可控**。

![LightMem 核心概念图](https://ar5iv.labs.arxiv.org/html/2604.07798/assets/figures/con.png)
*图 1：LightMem 的核心概念——在检索式记忆和 LLM 驱动记忆之间找到效率与精度的平衡点*

##### 2. 系统架构

LightMem 的整体架构由三条记忆层级和三个协同 SLM 构成：

![LightMem 系统架构图](https://ar5iv.labs.arxiv.org/html/2604.07798/assets/figures/main.jpg)
*图 2：LightMem 完整架构——在线路径由三 SLM 协调执行查询时路由和 STM/MTM 检索，离线路径增量将 MTM 整合入图结构 LTM*

**三层记忆**：
- **STM（短期记忆）**：SLM 上下文窗口本身，仅作工作记忆，逐轮更新，不持久化也不被检索
- **MTM（中期记忆）**：用户级个性化情景记忆库，存储语义摘要、时间戳、嵌入向量和用户 ID，是检索的主要来源
- **LTM（长期记忆）**：去标识化的跨用户语义知识库，以轻量图结构组织，支持多跳推理和知识共享

##### 3. 在线推理算法

\[
\begin{aligned}
\mathcal{Q}_t &= \text{SLM-1}(x_t, C_t) \quad \text{(检索规划)} \\
R_t &= \text{SLM-2}(\mathcal{Q}_t, \mathcal{M}) \quad \text{(两阶段检索)} \\
y_t &\sim \text{LLM}(x_t, C_t, R_t) \quad \text{(生成)} \\
m_t &= \text{SLM-3}(x_t, y_t) \quad \text{(记忆写入)} \\
\mathcal{M} &\leftarrow \mathcal{M} \cup \{m_t\}
\end{aligned}
\]

其中 \(x_t\) 为第 \(t\) 轮输入，\(C_t\) 为当前上下文窗口，\(\mathcal{Q}_t = \langle \{q_t^{(i)}\}_{i=1}^n, \phi_t, K \rangle\) 包含假设查询、元数据约束和 Top-K 预算。

**Stage 1 — 元数据约束粗检索**：在用户 ID、时间窗口、类型标签等元数据约束下，对各 HQ 执行向量相似度搜索，每个 HQ 分配 \(\frac{2K}{n}\) 个候选，候选总数为 \(2K\)。

**Stage 2 — 语义一致性重排序**：SLM-2 接收 HQ 集和 Stage 1 候选列表 \(C\)（含结构化元数据），执行语义一致性验证——判断每条候选是否与用户当前查询意图在语义上真正相关，而非仅向量相似。最终保留 \(|R_t| \leq K\) 条记忆。

```python
# LightMem 在线推理算法伪代码
def online_inference(x_t, C_t, M_MTM, M_LTM, K):
    # 1. 检索规划（SLM-1: Controller）
    HQs, phi_t, budget_split = SLM1_plan(x_t, C_t)  
    # HQs = [q1, q2, ..., qn]  假设查询
    # phi_t = (user_id, time_window, type_tags)  元数据约束
    # budget_split = [K1, K2, ..., Kn], sum=2K

    # 2. Stage 1: 元数据约束粗检索
    C = []
    for q, K1 in zip(HQs, budget_split):
        C_MTM = vector_search(q, M_MTM, phi_t, K1//2)
        C_LTM = vector_search(q, M_LTM, phi_t, K1//2)
        C.extend(C_MTM + C_LTM)
    # |C| = 2K

    # 3. Stage 2: 语义一致性重排序（SLM-2: Selector）
    R_t = SLM2_rerank(HQs, C, K)  
    # SLM-2 进行语义一致性验证，保留 Top-K
    # |R_t| = K

    # 4. 生成回答
    y_t = LLM_generate(x_t, C_t, R_t)

    # 5. 记忆写入（SLM-3: Writer）
    m_t = SLM3_write(x_t, y_t)
    if is_duplicate(m_t, M_MTM):
        merge_or_overwrite(m_t, M_MTM)
    else:
        M_MTM.append(m_t)
    # 容量控制
    if len(M_MTM) > B:
        evict_stale_entries(M_MTM)

    return y_t
```

> 💡 核心创新：两阶段检索将粗召回和精排解耦。Stage 1 保障覆盖面（2K 候选），Stage 2 利用 SLM 的语义理解能力进行控制性精选（2:1 压缩），弥补了向量空间“语义相似”与“任务相关”之间的关键鸿沟。

##### 4. SLM-1 检索规划（假设查询生成）

SLM-1 收到 \((x_t, C_t)\) 后，将其转化为结构化检索计划。该过程首先推断粗粒度意图属性（近期情节 vs 长期知识、个性化程度），随后将原始输入改写为一组假设查询（Hypothetical Queries, HQs）\(\{q_t^{(i)}\}\)，同时输出元数据约束 \(\phi_t\)（用户 ID、时间窗口、类型标签）。

> ⚠️ 关键设计：SLM-1 仅用于检索规划，不参与答案生成。每个 HQ 是对用户可能查询意图的主动假设，而非对 \(x_t\) 的简单转写。这种“意图条件化”改写使检索更具前瞻性和覆盖性。

##### 5. SLM-3 记忆写入与冲突解决

每轮生成 \(y_t\) 后，SLM-3 提取可复用的信息并压缩为简洁记忆条目追加到 MTM：
- **去重与合并**：高重复条目触发合并或重写，避免冗余
- **冲突处理**：冲突信息依据时间线索和证据强度解决——更新的证据优先，强证据覆盖弱证据
- **容量控制**：MTM 容量上限为 \(B\)，达到阈值时淘汰陈旧低效用条目并进一步压缩

##### 6. 离线整合（Offline Consolidation）

离线路径由大上下文窗口的 LLM 批量处理：
- 仅在增量批次上工作（新写入的 MTM、检索重激活条目、容量压力下被标记的低效用候选）
- 将情节记忆抽象为去标识化的隐私保护知识候选
- 通过相似度搜索定位 LTM 最近邻锚点，增量插入并链接到局部图邻域
- 累积证据驱动合并/更新/删除决策，置信度自然衰减实现遗忘

这种“在线轻量 + 离线重量”的分离是效率的关键：在线操作保持毫秒级（中位 83 ms），重量级抽象一步异步处理，避免交互延迟累积。

##### 7. 实验结果摘要

| 数据集 | 关键结果 |
|--------|----------|
| LoCoMo (GPT-4o) | 多跳 F1 34.52（A-MEM 32.86），时序和开放域提升最大 |
| DialSim (GPT-4o-mini) | 语义一致性（SBERT）显著优于所有基线 |
| 消融实验 | 去除 SLM-2 重排序导致性能大幅下降；纯 LTM 或 MTM 均不及并发检索 |
| 级联故障测试 | SLM-1/2/3 同时注入噪声导致 F1 从 4.12 崩溃至 1.85 |
| 延迟分析 | 中位检索延迟 83 ms，端到端 581 ms，有效上下文仅 1K tokens |

#### 🧪 练习题
```yaml
question: "LightMem 的两阶段检索中，Stage 2 语义一致性重排序的主要目的是什么？"
options:
  - "提升向量检索的速度，减少候选数量"
  - "排除向量相似但语义不相关的候选，实现从 2K 到 K 的精选"
  - "将 Stage 1 的候选转换为向量嵌入用于后续计算"
  - "对检索到的记忆按时间戳排序"
answer: 1
explain: "Stage 2 由 SLM-2 执行语义一致性验证，将 Stage 1 的 2K 候选压缩为最终 Top-K。这弥补了向量空间中“语义相似”与“任务相关”之间的鸿沟，排除与用户查询意图不真正相关的噪声条目。"
```
