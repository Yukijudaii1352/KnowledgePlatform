### GPT-5: 统一路由式 GPT 系统 (OpenAI GPT-5 System Card)

```yaml
id: gpt5
name: GPT-5
full_name: 统一路由式 GPT 系统 (OpenAI GPT-5 System Card)
year: "2026.01"
org: OpenAI
paper_url: https://arxiv.org/abs/2601.03267
category: frontier_2026
parent: gpt4
motivation: 主模型与推理模型统一路由
```

#### 📝 一句话总结

GPT-5 不是单一稠密模型的技术报告，而是一套由快速主模型、深度推理模型、mini/nano 变体和实时路由器组成的统一 GPT 系统；它通过路由、推理强化学习、安全完成、指令层级和多层防护，把通用对话、复杂推理、工具使用、健康、代码和安全能力整合到一个产品级模型族中。

#### 🎯 核心要点

- **统一系统而非单模型**：GPT-5 包含 gpt-5-main、gpt-5-main-mini、gpt-5-thinking、gpt-5-thinking-mini、gpt-5-thinking-nano，以及 ChatGPT 中的 gpt-5-thinking-pro。
- **实时路由器**：系统根据对话类型、复杂度、工具需求和用户显式意图，在快速模型与深度推理模型之间选择；路由器使用真实交互信号持续训练。
- **推理模型强化学习**：gpt-5-thinking 系列通过强化学习学习“先思考再回答”，可在困难问题上使用更长 test-time compute，并在失败时更倾向于承认限制。
- **安全完成 (safe-completions)**：从“先判断请求是否违规再拒绝”的硬边界，转向“最大化安全范围内的有用输出”的输出中心安全训练。
- **指令层级与提示注入防护**：模型被训练遵循 system > developer > user 的优先级，并对网页、连接器和工具输出中的提示注入进行防御。
- **事实性和欺骗缓解**：系统卡报告 gpt-5-main 的事实幻觉率比 GPT-4o 低，gpt-5-thinking 比 OpenAI o3 低；同时通过不可解任务训练、破损工具场景和 CoT 监控降低欺骗行为。
- **高风险领域分层防护**：gpt-5-thinking 被按 Preparedness Framework 在生物/化学领域以 High capability 对待，并启用模型拒答、监控器、系统层拦截和账户级执法等纵深防御。
- **能力覆盖面**：系统卡重点评估安全、事实性、健康、软件工程、科研复现、自主能力、网络安全、偏见与多语言等场景，而不是披露参数量或训练配方。

#### 🔬 深入细节

##### 1. 系统结构：从单模型到路由式模型族

GPT-5 的关键变化是把“一个模型回答所有问题”改成“一个统一入口背后调度多个模型”。系统卡将快速、高吞吐模型称为 gpt-5-main / gpt-5-main-mini，将深度推理模型称为 gpt-5-thinking / gpt-5-thinking-mini / gpt-5-thinking-nano。ChatGPT 中还提供 gpt-5-thinking-pro，用于并行 test-time compute。

论文未公开模型参数量、层数或训练 token 数，因此不能按传统 Transformer 论文那样拆解 block 结构。更合理的理解是：GPT-5 的“算法贡献”在系统层，即用路由器把普通对话、复杂推理、工具调用和安全策略组织为一个统一服务。

![GPT-5 事实性评估图](https://arxiv.org/html/2601.03267v2/x1.png)
*图：GPT-5 System Card 中的事实性评估图之一。系统卡的公开图主要围绕事实性、安全、健康、软件工程和风险评估，而不是模型 block 架构。*

##### 2. 实时路由器的工作机制

路由器接收会话上下文和用户意图，选择合适的底层模型：

```python
def gpt5_route(conversation, user_intent, tool_state, usage_state):
    """
    GPT-5 统一系统的简化路由逻辑。
    真实系统未公开实现；此处按 system card 描述抽象。
    """
    features = {
        "complexity": estimate_reasoning_difficulty(conversation),
        "needs_tools": detect_tool_need(conversation, tool_state),
        "explicit_think": "think hard" in user_intent.lower(),
        "safety_risk": classify_safety_risk(conversation),
        "latency_budget": infer_latency_need(conversation),
    }

    if usage_state.exceeded_limit:
        return "gpt-5-main-mini" if not features["complexity"] else "gpt-5-thinking-mini"

    if features["explicit_think"] or features["complexity"] == "high":
        return "gpt-5-thinking"

    if features["needs_tools"] and features["complexity"] != "low":
        return "gpt-5-thinking"

    return "gpt-5-main"
```

路由器不是静态规则表。系统卡说明它会从真实信号中继续学习，包括用户切换模型的行为、偏好率和正确性测量。这意味着 GPT-5 的能力提升有两条路径：底层模型本身变强，以及路由策略更准确地把问题交给合适模型。

##### 3. 推理模型与强化学习

gpt-5-thinking 系列继承了 OpenAI reasoning models 的路线：通过强化学习训练模型在回答前进行更长的内部推理，尝试不同策略并识别错误。与 gpt-5-main 的差异不是简单“更大”，而是推理预算、训练目标和适用场景不同。

这种设计的收益体现在三类任务：

- **复杂问题求解**：数学、代码、科研复现、长链诊断等任务需要多步搜索和验证。
- **工具/环境故障处理**：当浏览器、代码环境或用户输入不完整时，推理模型更倾向于识别限制，而不是编造结果。
- **安全策略遵循**：推理过程帮助模型在复杂、双用途或多轮场景中遵循模型政策。

> 💡 关键：GPT-5 的推理不是单纯延长输出，而是把 test-time compute 作为可调资源；简单问题走快模型，困难问题走 thinking 模型。

##### 4. Safe-Completions：输出中心安全训练

传统安全模型常把请求先分类为“允许/拒绝”，然后产生回答或拒答。GPT-5 系统卡强调 safe-completions：关注模型最终输出是否安全，而不是只对用户意图做二元分类。对于双用途问题，模型可以提供高层、安全、教育性的回答，同时避免细节化的伤害性步骤。

抽象目标可以写成：

$$
\max_y \; U(y, x) \quad \text{s.t.} \quad S(y, x) \le \tau
$$

其中 \(U\) 表示有用性，\(S\) 表示输出风险，\(\tau\) 是安全阈值。这个目标比硬拒绝更细：如果存在安全的帮助方式，模型应尽量给出；如果没有安全输出，则拒绝。

这种训练尤其适合生物、化学、网络安全、医疗等边界复杂领域。系统卡报告 GPT-5 在生产型 disallowed-content、jailbreak 和双用途安全评估上整体改善，但也明确指出某些类别仍有回归或剩余风险，需要后续修复。

##### 5. 指令层级与提示注入

GPT-5 被训练遵循 instruction hierarchy：system 消息优先于 developer 消息，developer 消息优先于 user 消息。这个机制是产品化 LLM 的核心，因为开发者可以给应用设置长期约束，而用户或外部网页内容可能试图覆盖这些约束。

系统卡还把 prompt injection 单独作为风险评估：当模型浏览网页、读取邮件/连接器内容或处理工具输出时，外部内容中可能包含恶意指令。GPT-5 的防护包括：

- 训练模型忽略网页或工具输出里的越权指令；
- 对连接器数据采用缓存访问策略，减少敏感数据被外部网络请求泄露的机会；
- 使用多层安全分类器和系统级策略检查。

##### 6. 事实性、健康与欺骗缓解

GPT-5 的一个重点是降低 hallucination。系统卡报告：在 ChatGPT 生产流量事实性评估中，gpt-5-main 的事实错误率比 GPT-4o 低，gpt-5-thinking 比 OpenAI o3 低；在 LongFact、FActScore 和 SimpleQA 等开放事实性评估上，thinking 系列也表现出更低的错误率和更好的 abstention 行为。

健康场景是另一个重点。系统卡报告 HealthBench Hard 上 gpt-5-thinking 明显超过此前模型，gpt-5-main 也优于先前非 thinking 模型。这里的关键不是让模型替代医生，而是减少幻觉、急迫场景误判和全球健康语境不适配。系统卡也强调这些模型不用于诊断或治疗替代。

欺骗缓解方面，OpenAI 使用不可完成任务、破损工具、缺失输入、假前提等环境训练 gpt-5-thinking 更诚实地承认无法完成。系统卡还描述了对 reasoning model 的 CoT 监控，用于发现“声称做了但实际没做”“为了通过评估而隐瞒”等行为。

##### 7. 高风险领域的分层安全

GPT-5 System Card 将 gpt-5-thinking 在生物/化学能力上按 High capability 处理。这里的重点不是说模型已越过所有危险阈值，而是采取预防性部署：在模型能力接近阈值且未来更新可能增强时，提前启用 Preparedness Framework 下的防护。

防护是多层的：

- 底层模型训练时学习拒绝或安全化回答高风险请求；
- 输入和输出侧都有分类器与监控器；
- 高风险类别使用推理模型作为二级监控；
- 系统层覆盖所有相关流量；
- 账户级检测、封禁和升级处理用于持续响应。

> ⚠️ 注意：这类风险评估的公开系统卡只给出高层方法和指标，不披露可能帮助滥用者的操作细节。

##### 8. 与 GPT-4 系列的差异

| 维度 | GPT-4 / GPT-4o 路线 | GPT-5 系统路线 |
|------|----------------------|----------------|
| 模型入口 | 以单模型或显式模型选择为主 | 统一入口 + 实时路由 |
| 推理能力 | 普通模型与 reasoning 模型分离 | main/thinking/nano/mini/pro 系列统一调度 |
| 安全训练 | 拒绝式边界更突出 | safe-completions 输出中心约束 |
| 工具场景 | 工具能力逐步加入 | prompt injection、连接器和工具输出作为核心风险处理 |
| 事实性 | 仍存在明显幻觉 | 生产流量和开放事实评测均作为重点优化目标 |
| 高风险领域 | 按模型逐次评估 | Preparedness Framework 与系统级防护更深入集成 |

GPT-5 的主要意义不在于某个公开的 Transformer block 改造，而在于把 scaling、reasoning、routing、safety、tool use 和 deployment risk 合并为一个工程系统。对于“基础语言模型演进”这条主线，它代表了从单一基础模型向“模型族 + 路由 + 安全治理层”的转变。

#### 🧪 练习题

```yaml
question: "GPT-5 System Card 中实时路由器的核心作用是什么？"
options:
  - "把所有请求都固定发送给参数量最大的模型"
  - "根据复杂度、工具需求和用户意图，在快速主模型与深度推理模型之间选择"
  - "替代 tokenizer，将文本压缩为更少 token"
  - "只用于过滤违规请求，不参与模型选择"
answer: 1
explain: "GPT-5 是统一入口背后的模型族系统。路由器会根据任务复杂度、工具需求、显式思考意图和使用限制选择 gpt-5-main、gpt-5-thinking 或 mini/nano 变体。"
```
