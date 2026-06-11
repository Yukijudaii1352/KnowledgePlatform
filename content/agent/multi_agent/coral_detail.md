### CORAL: 信息流编排范式 (CORAL)

```yaml
id: coral
name: CORAL
full_name: 信息流编排范式 (CORAL)
year: '2026.01'
org: Coral Protocol
paper_url: https://arxiv.org/abs/2601.09883
category: communication
parent: a2a
motivation: 摆脱预设工作流改用信息流调度
```

#### 📝 一句话总结
CORAL 提出了一种**信息流编排（Information-Flow Orchestration）多智能体范式**，用专门的 Orchestrator 通过 Agent-to-Agent (A2A) 通信动态协调各 Agent，彻底摆脱了传统工作流（workflow）MAS 需要人工预定义任务状态和路由规则的限制，在 GAIA benchmark 上以 **63.64% vs OWL 55.15%（+8.49pp）** 显著胜出。

#### 🎯 核心要点
1. **问题动机**：现有 workflow-based MAS（如 OWL、MetaGPT）本质上是规则决策树，需要人类工程师穷举任务状态和路由逻辑。对复杂现实任务来说，既费人工又无法覆盖所有边缘情况（edge cases）。
2. **核心方案**：引入一个专门的 **Information Flow Orchestrator**，通过 `send_message` / `wait_for_mention` 两个 A2A 原语，以自然语言动态协调 Planner、Web Agent、Document Agent、Reasoning & Coding Agent。
3. **关键约束**：所有 Worker Agent 只能与 Orchestrator 通信（星型拓扑），Orchestrator 可以跟任何 Agent 通信，避免通信爆炸。
4. **实验设置**：GAIA validation set（165题），同模型同角色对比 OWL。均质模型（Grok 4.1 Fast）下持平（64.24%），异构模型（主Agent用Grok 4.1 Fast，Worker用GPT 4.1 Mini）下优势显著（63.64% vs 55.15%）。
5. **涌现行为**：通过 case-level 分析发现 4 种协调模式 + 3 种边缘处理策略，均为 Orchestrator 自适应涌现，非人工预定义。

#### 🔬 深入细节
##### 1. 形式化模型：信息流编排的数学框架

CORAL 将 MAS 定义为一个有限智能体集合 $\mathcal{A} = \{a_1, a_2, \dots, a_N\}$，其中指定一个特殊的 **信息流编排器** $a_o \in \mathcal{A}$。系统施加**非对称通信约束**：

$$(a_i \rightarrow a_j) \in \mathcal{C} \Rightarrow (i = o) \lor (j = o)$$

即所有 Worker Agent 只能与 Orchestrator 通信，形成星型拓扑。A2A 通信工具包仅包含两个原语：

$$\mathcal{K}^{\text{A2A}} = \{\texttt{wait\_for\_mention}, \texttt{send\_messages}\}$$

- **`wait_for_mention`**：阻塞等待操作，$\texttt{wait\_for\_mention}(a_i) \rightarrow m$，Agent 进入等待状态直到收到消息 $m$。
- **`send_messages`**：消息发送操作，$\texttt{send\_messages}(a_i, a_j, c)$，将自然语言内容 $c \in \mathcal{M}$ 发送给目标 Agent。

每步交互过程：Orchestrator 基于历史 $\mathcal{H}$ 和查询 $q$ 生成消息 $m_{o,t} \leftarrow f_o(\mathcal{H}, q, p_o)$，发送给选定 Agent；Agent 可调用外部工具获取中间结果 $\tilde{z}_{j,t}$，再生成响应 $m_{j,t} \leftarrow f_j(\tilde{z}_{j,t}, \mathcal{H}, p_j)$ 返回。流程持续到 Orchestrator 调用 `submit_answer_tool` 或达到 30 分钟时限。

##### 2. 架构总览与 Agent 角色

![CORAL Architecture](https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig2_overview.png)

**Figure 2** 展示了完整架构。系统包含以下 Agent 角色（与 OWL 对齐以保证公平对比）：

| Agent 角色 | 功能 | 配备工具 |
|:--|:--|:--|
| **Information Flow Orchestrator** | 持续监控任务进度，动态协调其他 Agent，提交最终答案 | `send_message`, `wait_for_mention`, `submit_answer_tool` |
| **Planner** | 任务分解与重规划 | `send_message`, `wait_for_mention` |
| **Web Agent** | 网页搜索与信息检索 | `send_message`, `wait_for_mention`, web search/browse tools |
| **Document Agent** | 文档读取与理解 | `send_message`, `wait_for_mention`, document parsing tools |
| **Reasoning & Coding Agent** | 逻辑推理与代码执行 | `send_message`, `wait_for_mention`, code execution tools |

**关键创新**：Orchestrator 并非简单的路由器，其 prompt $p_o$ 明确规定了三项职责：(i) 监控执行过程确保可靠性和一致性；(ii) 在需额外推理时主动询问合适的 Agent；(iii) 将任务指令中继或分派给合适的执行 Agent。

##### 3. 动态 MAS 对比：Table 1

CORAL 与现有动态 MAS 的核心区别在于 **运行时显式自然语言指令**：

| Method | Dynamic Orchestration | Adaptive Routing | Explicit NL Instructions |
|:--|:--|:--|:--|
| GTPSwarm (2024) | ✓ | × | × |
| MasRouter (2025) | ✓ | × | × |
| Conductor (2025) | ✓ | × | × |
| Puppeteer (2025) | ✓ | ✓ | × |
| **Ours (A2A-based)** | ✓ | ✓ | **✓** |

此前方法要么在任务执行前确定拓扑和路由策略，要么仅拼接上一个 Agent 的输出作为下一个的上下文（如 Puppeteer），缺乏对中间结果的显式审计和指令细化能力。CORAL 的 Orchestrator 在每一步都能发出**明确的、步骤特定的询问或指令**，这是其处理边缘情况能力的关键来源。

##### 4. 4 种涌现协调模式 (Figure 4)

![Figure 4: Coordination Patterns](https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig4_coordination.png)

通过 case-level 分析，Orchestrator 自发涌现出四种任务协调模式：

1. **Direct Agent Dispatch（直接分派）**：对不可分解的任务，直接分配给合适 Agent，避免不必要的任务分解开销。这与 Kim et al. (2025) 发现“过度规划对不可分解任务有害”一致。
2. **Planner-Mediated Decomposition（规划器中介分解）**：对自然可分解的任务，咨询 Planner 分解为子任务，必要时请求重规划。这是与传统 workflow MAS 最兼容的模式。
3. **Instruction Refinement（指令细化）**：Agent 遇困难时，不立即升级到重规划，而是**精炼或调整上一条指令**，让同一 Agent 继续。这保持了更干净紧凑的上下文，避免已完成子任务的冗余重处理。
4. **Agent Substitution（Agent 替换）**：某任务无法由特定 Agent 完成时，直接**重新分配给另一 Agent**，无需重启整个任务或全量重分解。

##### 5. 3 种边缘处理策略 (Figure 5)

![Figure 5: Edge Case Handling](https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig5_edgecases.png)

三种涌现的边缘处理策略及其与 OWL 对比：

**策略1：Dynamic Explicitization and Tightening of Success Criteria（动态显式化与成功标准收紧）**
- **案例**：Web Agent 被要求搜索所有美国 Survivor 冠军及其出生日期，找到所有姓名但部分人的出生日期缺失。
- **CORAL 行为**：Orchestrator 检测到"出生日期未知"的条目不满足原始查询的**隐式成功标准**，主动识别不匹配并动态细化任务需求，强制要求补全后再继续。
- **OWL 行为**：子任务未被标记为失败，后续步骤在错误前提下执行。

**策略2：Real-Time Auditing and Correction of Intermediate Semantic Assumptions（实时审计与语义假设修正）**
- **案例**：列出 Fiona Apple 和 Paula Cole 在 1999 年**之前**发行的录音室专辑。Agent 返回了含 1999 年专辑的结果。
- **CORAL 行为**：Orchestrator 显式审计"1999 年是否满足 before 1999"这一中间语义假设，在无效条目（*When the Pawn…* 和 *Amen*）传播到下游子任务前裁剪掉。
- **OWL 行为**：中间结果未被标记为错误，后续步骤带着错误数据继续。

**策略3：Continuous Monitoring and Correction of Instruction Alignment（持续监控与指令对齐修正）**
- **案例**：要求访问 Excel 提取 2022 年阅读书目，用**词数**计算阅读速率。Agent 用**页数**代理词数。
- **CORAL 行为**：Orchestrator 检测到请求指标与代理指标之间的**不匹配**，升级给 Planner 生成细化指令："对每本书从可靠在线来源检索总词数"。
- **OWL 行为**：子任务被标记为成功，后续步骤在对齐假设错误下继续。

##### 6. 实验设置与主要结果 (Table 2, Figure 3)

**Table 2: GAIA Validation Set Pass@1 准确率**

| Method | Level 1 (53) | Level 2 (86) | Level 3 (26) | Overall (165) |
|:--|:--|:--|:--|:--|
| **均质模型 (All Grok 4.1 Fast)** | | | | |
| Ours (A2A-based) | 0.7547 | 0.6163 | 0.5000 | **0.6424** |
| OWL (Workflow-based) | 0.8113 | 0.5814 | 0.5000 | **0.6424** |
| **异构模型 (Main: Grok 4.1 Fast / Worker: GPT 4.1 Mini)** | | | | |
| Ours (A2A-based) | **0.7925** | **0.6047** | **0.4231** | **0.6364** |
| OWL (Workflow-based) | 0.7358 | 0.5116 | 0.3077 | 0.5515 |

**Figure 3** 的 Token 消耗 CDF 显示：均质模型下 CORAL token 消耗略高（因为自主 A2A 通信替代了手工上下文拼接）；但在异构模型下，高难度任务（>0.6M tokens）CORAL 消耗**更少**——因为 OWL 触发重规划需重新执行已完成子任务，而 CORAL 通过指令调整即可解决问题。

**核心发现**：
- RQ1（能否匹敌？）：均质模型下准确率持平，token 消耗可比 → ✅
- RQ2（能否超越？）：异构模型下 +8.49pp，且高难度任务更省 token → ✅

##### 7. 伪代码：Orchestrator 主循环

```
def orchestrator_loop(query q, agents A, prompt p_o):
    H = []                    # 消息历史
    t = 0
    while not should_submit and t < 1800s:
        # 1. Orchestrator 生成下一条消息
        m_o = f_o(H, q, p_o)  # 可以是询问(inquiry)或指令(instruction)
        
        # 2. 选择目标 Agent
        a_j = select_target(m_o, A)
        
        # 3. 发送消息
        send_messages(a_o, a_j, m_o.content)
        H.append((a_o, a_j, m_o.content))
        
        # 4. 目标 Agent 等待并处理
        m = wait_for_mention(a_j)
        z_tilde = invoke_tools(a_j, m)      # 可选的工具调用
        m_j = f_j(z_tilde, H, p_j)           # 生成响应
        
        # 5. 响应返回 Orchestrator
        send_messages(a_j, a_o, m_j)
        H.append((a_j, a_o, m_j))
        
        # 6. Orchestrator 评估是否提交
        should_submit = evaluate_submission(H, q, p_o)
        t += elapsed
        
    return submit_answer_tool(H, q)
```

#### 📊 关键图表索引

| 图表 | 内容 | URL |
|:--|:--|:--|
| Figure 1 | OWL 架构的决策树表示及代表性失败案例 | [arxiv.org](https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig1_owl.png) |
| Figure 2 | CORAL 架构总览（核心图） | [arxiv.org](https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig2_overview.png) |
| Figure 3 | Token 消耗 CDF 对比（a/b 两种配置） | [arxiv.org](https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig3_cdf.png) |
| Figure 4 | 4 种涌现协调模式 | [arxiv.org](https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig4_coordination.png) |
| Figure 5 | 3 种边缘处理策略及 OWL 对比 | [arxiv.org](https://arxiv.org/html/2601.09883v1/extracted/6261912/figures/fig5_edgecases.png) |
| Table 1 | 动态 MAS 系统对比 | — |
| Table 2 | GAIA Pass@1 结果 | — |
| Table 3 (Appendix) | Agent 角色与工具详细列表 | — |

#### 💡 思考题

1. **通信拓扑设计**：CORAL 采用严格的星型拓扑（Orchestrator 居中），禁止 Worker 间直接通信。这种设计的优劣各是什么？什么场景下可能需要放宽这一约束？
2. **涌现 vs 预定义**：论文强调 4 种协调模式和 3 种边缘处理策略是"涌现"的而非预定义的。你如何界定"涌现行为"和"prompt engineering 导致的行为"之间的边界？
3. **领域特化**：论文在 general-purpose benchmark (GAIA) 上验证，但 future work 指出需在 domain-specific 场景评估。在强结构先验的领域（如代码生成），信息流编排是否可能反而劣于精心设计的 workflow？
4. **扩展性**：当 Agent 数量从 4 个扩展到 40 个时，星型拓扑下的 Orchestrator 会成为瓶颈。如何设计分层的信息流编排来解决这一问题？

#### 📎 论文信息

- **标题**: Beyond Rule-Based Workflows: An Information-Flow-Orchestrated Multi-Agents Paradigm via Agent-to-Agent Communication from CORAL
- **作者**: Xinxing Ren, Quagmire Zang, Caelum Forder, Suman Deb, Ahsen Tahir, Roman J. Georgio, Peter Carroll, Zekun Guo
- **机构**: Coral Protocol, Brunel University of London, Universitéit Lëtzebuerg, University of Hull, National University of Computer and Emerging Sciences
- **发表**: arXiv:2601.09883, 2026.01
- **代码**: https://github.com/Coral-Protocol/Beyond-Rule-Based-Workflows

#### 🧪 练习题
```yaml
question: "CORAL 为什么强制采用以 Orchestrator 为中心的星型拓扑？"
options:
  - "因为 Worker Agent 完全没有工具能力，只能转发消息"
  - "因为这样能把所有推理外包给单一大模型"
  - "因为它用中心化信息流协调避免通信爆炸，并让中间结果审计与指令细化都集中在 Orchestrator 上"
  - "因为 A2A 协议本身禁止任意两个 Agent 直接通信"
answer: 2
explain: "CORAL 的星型约束是方法设计，不是 A2A 协议硬限制。它的目标是把复杂协作收敛成可审计、可细化的信息流，而不是让 worker 之间自由扩散消息。"
```
