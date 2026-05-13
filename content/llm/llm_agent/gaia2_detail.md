### Gaia 2: A Second Generation Benchmark and a Research Platform for General AI Assistants

```yaml
id: gaia2
name: Gaia2
full_name: "Gaia 2: A Second Generation Benchmark and a Research Platform for General AI Assistants"
year: 2025
org: Meta
paper_url: https://arxiv.org/abs/2503.20776
category: llm_agent
parent: "—"
motivation: "提出ARE平台与Gaia2基准，通过动态环境、7大能力维度和多Agent协作评估Agent鲁棒性"
```

#### 📝 一句话总结

Gaia2 提出了 ARE（Agent Runtime Environment）研究平台和 Gaia2 基准，通过异步动态模拟环境、7 大能力维度（Execution、Search、Ambiguity、Adaptability、Time、Noise、Agent2Agent）和基于状态变更的验证器，系统评估前沿 LLM Agent 在真实场景中的鲁棒性与协作能力，揭示了当前最强模型（GPT-5 达 42.1% pass@1）仍远未解决的 Agent 挑战。

#### 🎯 核心要点

- **ARE 平台**：提出 5 大核心抽象——Apps（有状态 API）、Environments（应用集合+时间管理）、Events（全量日志化的依赖图）、Notifications（可配置的可观测层）、Scenarios（初始状态+事件 DAG+验证方法），支持异步时间推进
- **Mobile 环境**：实例化 12 个消费级应用（Messages、Chats、Emails、Calendar、Contacts、Shopping、Cabs、Files 等），101 个工具，每个 Universe 包含 400K–800K tokens 的结构化/非结构化内容
- **7 大能力维度**：5 个核心能力（Execution、Search、Ambiguity、Adaptability、Time）+ 2 个环境增强（Noise 注入工具异常/垃圾事件、Agent2Agent 多智能体协作）
- **ARE Verifier**：基于写操作状态变更的目标导向验证器，区分 read/write 操作，支持一致性、因果性、时序性、完整性四维评估，在 450 条标注轨迹上达 0.98 agreement 和 0.99 precision
- **基准规模**：Gaia2 包含 877 个场景（完整版）和 247 个场景（mini 版），每个场景运行 3 次以控制方差
- **实证发现**：GPT-5 (high) 以 42.1% pass@1 领先，Claude-4-Sonnet 34.8%；Time 和 Noise 维度最具挑战性；Agent2Agent 协作对弱模型帮助更大，异构团队（强主+弱执行）可有效平衡计算-质量权衡
- **兼容性验证**：ARE 可忠实复现 τ-bench、τ²-bench、GAIA、BFCL-v3、VendingBench 等现有基准

#### 🔬 深入细节

##### 核心架构图

![Gaia2 ARE 框架总览](https://arxiv.org/html/2503.20776v2/x2.png)
*图：ARE 平台架构。左侧为 Environment（包含多个 Apps、Time Manager 和 Rules），中间为 Events 依赖图和 Notifications 层，右侧为 Agent 与 User Interface 的交互。Scenarios 定义初始状态、事件 DAG 和验证方法。*

![Gaia2 能力维度与评估结果](https://arxiv.org/html/2503.20776v2/x5.png)
*图：各模型在 Gaia2 七大能力维度上的雷达图表现。GPT-5 (high) 在多数维度领先，但 Time 维度仅 Gemini-2.5-Pro 和 Claude-4-Sonnet 有显著得分。*

##### 算法/系统伪代码

```python
# ARE 场景执行与验证流程伪代码
class AREScenario:
    def __init__(self, universe, event_dag, oracle_writes):
        self.env = MobileEnvironment(universe)  # 12 apps, 101 tools
        self.event_dag = event_dag              # 事件依赖图 (DAG)
        self.oracle_writes = oracle_writes      # 预期写操作序列
        self.time_manager = TimeManager()       # 异步时间管理

    def run(self, agent, max_steps=200):
        self.env.initialize()                   # 加载 universe 状态
        self.event_dag.schedule_events()        # 按 DAG 调度事件

        for step in range(max_steps):
            # 1. 环境异步推进：模型生成消耗模拟时间
            elapsed = agent.generation_time
            self.time_manager.advance(elapsed)
            triggered_events = self.event_dag.check_triggers(self.time_manager.now)

            # 2. 通知层：根据策略推送事件到 Agent 上下文
            notifications = self.notification_policy.filter(triggered_events)
            agent.context.append(notifications)

            # 3. Agent 执行 ReAct 循环
            action = agent.reason_and_act(self.env.available_tools)
            result = self.env.execute(action)   # read 或 write 操作

            # 4. 在线验证（可选）
            if self.verifier.check_online(action, result):
                break  # 验证完成

        return self.verifier.evaluate(self.env.write_log, self.oracle_writes)

class AREVerifier:
    def evaluate(self, actual_writes, oracle_writes):
        scores = {}
        # (i) 一致性：工具名/参数精确匹配 + LLM rubric 灵活匹配
        scores['consistency'] = self.check_consistency(actual_writes, oracle_writes)
        # (ii) 因果性：写操作必须遵循依赖 DAG 顺序
        scores['causality'] = self.check_dag_order(actual_writes, oracle_writes)
        # (iii) 时序性：操作在容忍窗口内完成
        scores['timing'] = self.check_timing_windows(actual_writes, oracle_writes)
        # (iv) 完整性：所有 oracle 写操作均被匹配
        scores['completeness'] = self.check_completeness(actual_writes, oracle_writes)
        return all(scores.values())
```

##### 方法深入解读

**动机与背景：为什么需要 Gaia2？**

现有 Agent 基准（如 GAIA、AppWorld、τ-bench）存在三个根本局限：(1) **静态环境**——任务在固定快照上执行，无法评估 Agent 对动态事件的响应能力；(2) **同步执行**——Agent 的推理时间不影响环境状态，无法测试时间感知能力；(3) **能力维度单一**——多数基准仅评估工具调用或信息检索，缺乏对歧义处理、适应性、噪声鲁棒性和多 Agent 协作的系统评估。Gaia2 通过 ARE 平台的异步架构和 7 大能力维度，填补了这些空白。

> 💡 关键：ARE 的异步时间机制是核心创新——模型生成直接消耗模拟时间，如果 Agent 响应慢，环境时钟仍在推进，外部事件可能在推理过程中发生。这使得"时间感知"和"响应性"成为可评估的维度。

**ARE 五大抽象的设计逻辑**

ARE 的设计围绕"解耦 Agent 与环境"展开：

1. **Apps**：有状态 API，每个 App 暴露的工具被类型化为 read 或 write。这一区分至关重要——验证器只检查 write 操作（状态变更），Agent 可以自由执行任意数量的 read 操作进行探索，不会被惩罚。这避免了"过度约束探索策略"的问题。

2. **Events 与依赖图**：所有发生的事情（工具调用、状态变更、定时更新）都被建模为 Events，组织为 DAG。事件可以按绝对时间戳调度，也可以相对于其他事件调度。这使得复杂的多步骤场景（如"收到邮件后 30 分钟提醒用户"）可以自然表达。

3. **Notifications**：可配置的可观测层，策略决定哪些事件被推送到 Agent 上下文。这使得研究者可以控制 Agent 的信息获取方式——从完全可观测到部分可观测——从而研究主动性和反应性行为。

$$\text{Notification Policy: } \mathcal{N}(e) = \begin{cases} \text{push to context} & \text{if } \text{priority}(e) \geq \theta \\ \text{filter} & \text{otherwise} \end{cases}$$

**七大能力维度的设计哲学**

论文将能力分为 5 个核心维度和 2 个环境增强：

- **Execution**（执行）：基础工具调用和多步骤操作链，如"创建日历事件并发送邀请"
- **Search**（搜索）：跨应用信息检索和聚合，如"找出所有与 Alice 的未读消息中提到的日期"
- **Ambiguity**（歧义）：用户请求不完整或模糊时，Agent 需要主动澄清而非猜测执行
- **Adaptability**（适应性）：环境在任务执行过程中发生变化（如联系人更新、日程冲突），Agent 需要动态调整计划
- **Time**（时间）：需要在特定时间点执行操作或响应定时事件，直接依赖 ARE 的异步时间机制

> ⚠️ 注意：论文明确指出这些维度不是严格正交的——任何自然任务都具有内在的组合性（如 Time 任务通常也需要 Search 和 Execution）。作者有意避免引入人工的"组合"分割，因为早期实验表明强行组合 3+ 能力会产生不自然的任务。

环境增强维度不需要新的标注：
- **Noise**：注入工具异常（随机执行失败、签名变更）和无关环境事件（垃圾邮件），测试鲁棒性
- **Agent2Agent**：将部分 App 替换为"App-Agent"，主 Agent 失去对这些 App 工具的直接访问，必须通过消息传递与 App-Agent 协调完成任务

**验证器的四维评估机制**

ARE Verifier 是论文的重要技术贡献。与传统的最终答案匹配或 LLM 裁判不同，它是**目标导向**而非**路径最优**的：

$$\text{Score} = \mathbb{1}[\text{Consistency} \wedge \text{Causality} \wedge \text{Timing} \wedge \text{Completeness}]$$

- **一致性**：刚性字段（ID）用精确匹配，灵活字段（文本内容）用 LLM rubric，并加入反作弊检查
- **因果性**：写操作必须尊重依赖 DAG（父操作先于子操作）
- **时序性**：通过容忍窗口强制执行
- **完整性**：所有 oracle 写操作必须被匹配

在 450 条人工标注轨迹上，ARE Verifier 达到 0.98 agreement 和 0.99 precision，远超纯 LLM 裁判（0.72 agreement、0.53 precision）。

**核心实验发现**

| 模型 | Overall | Execution | Search | Ambiguity | Adaptability | Time | Noise | A2A |
|------|---------|-----------|--------|-----------|-------------|------|-------|-----|
| GPT-5 (high) | **42.1** | 65.4 | 72.7 | 40.8 | 43.1 | 6.5 | **35.4** | 30.8 |
| Claude-4-Sonnet Thinking | 37.8 | 62.1 | 60.6 | 27.3 | 42.1 | 8.5 | 31.2 | 32.5 |
| Claude-4-Sonnet | 34.8 | 57.9 | 59.8 | 24.2 | 38.1 | 8.1 | 27.7 | 27.9 |
| Gemini-2.5-Pro | 25.8 | 39.2 | 57.7 | 18.1 | 17.5 | 7.3 | 20.4 | 20.4 |
| Kimi-K2 | 20.1 | 34.2 | 36.0 | 8.3 | 24.0 | 0.8 | 18.8 | 18.3 |

关键发现：
1. **Execution 和 Search 最容易**，与现有基准饱和趋势一致
2. **Time 维度最具区分度**：仅 Gemini-2.5-Pro 和 Claude-4-Sonnet 有显著得分，反映其效率-延迟优势
3. **Agent2Agent 对弱模型帮助更大**：Llama 4 Maverick 在 A2A 设置下 pass@k 随协作比例提升，但 Claude-4-Sonnet 无显著改善
4. **异构团队有效**：Claude 主 Agent + Llama App-Agent（18.3%）优于全 Llama 团队（8.5%），强执行者（Claude App-Agent）可提升弱主 Agent 的表现（16.2%）

> 💡 关键：Agent2Agent 的协作可类比为强化学习中的 Options 框架（Sutton et al., 1999）——主 Agent 向 App-Agent 发出的子目标相当于时间扩展动作。只有当分解收益超过协调成本时，多 Agent 协作才有效。

#### 🧪 练习题

```yaml
question: "ARE Verifier 在评估 Agent 轨迹时，以下哪种操作会被计入目标完成度？"
options:
  - "Agent 执行的所有工具调用（包括 read 和 write）"
  - "仅 Agent 执行的 write 操作（状态变更）"
  - "Agent 的最终文本回答"
  - "Agent 执行的 read 操作数量"
answer: 1
explain: "ARE Verifier 区分 read 和 write 操作，仅检查 write 操作（状态变更）是否匹配 oracle 序列，Agent 可自由执行任意 read 操作进行探索而不受惩罚。"
```