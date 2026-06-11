### ToolSandbox: 状态化工具沙箱 (ToolSandbox)

```yaml
id: toolsandbox
name: ToolSandbox
full_name: 状态化工具沙箱 (ToolSandbox)
year: '2024.08'
org: Apple
paper_url: https://arxiv.org/abs/2408.04682
category: environment
parent: agentbench
motivation: 评测多轮状态依赖的工具调用
```

#### 📝 一句话总结
ToolSandbox 提出了首个融合**有状态工具**（Stateful Tools）、**对话式评估**（Conversational Evaluation）和**交互式评估**（Interactive Evaluation）三位一体的 LLM 工具使用基准测试，通过 Milestone/Minefield 机制提供细粒度的中间过程评估，揭示了当前模型在状态依赖推理、规范化（Canonicalization）和信息不足场景下的显著不足，开源与闭源模型间存在超过 20 分的性能鸿沟。

#### 🎯 核心要点
- 提出 **ToolSandbox 基准测试框架**，包含 34 个工具、覆盖消息通信、世界状态管理等真实场景
- 三大创新维度：**Stateful Tools**（工具执行结果持久化改变世界状态）、**State Dependent Tools**（工具行为受当前世界状态影响）、**Canonicalization**（同一实体的多种指称归一化）
- 核心架构三组件：**Message Bus**（消息总线解耦 LLM-Tools-User 三方通信）、**World State**（键值对存储追踪工具副作用）、**User Simulator**（LLM 驱动的模拟用户，支持工具辅助增强）
- 提出 **Milestone**（里程碑，检查中间步骤是否达到预期状态）和 **Minefield**（雷区，检测违规操作如信息泄露、重复调用），实现对话过程的细粒度评估
- 定义三种测试场景类别：**Single-Turn**（单轮工具调用）、**Multi-Turn Non-Interactive**（多轮无用户交互）、**Multi-Turn Interactive**（多轮含用户模拟交互）
- 实验发现：闭源模型整体领先开源模型 >20 分；State Dependency 是最大挑战（所有模型表现最差）；大模型存在反直觉的 State Dependency 性能退化；信息不足场景中模型倾向于"猜测"而非主动询问澄清

#### 🔬 深入细节
![ToolSandbox 系统架构图](https://ar5iv.labs.arxiv.org/html/2408.04682/assets/x1.png)
*图：ToolSandbox 整体架构——LLM Agent 通过 Message Bus 与工具（Tools）和用户模拟器（User Simulator）交互，World State 记录所有工具执行产生的持久副作用。*

##### 伪代码：Milestone & Minefield 评估机制

```python
# ToolSandbox 核心评估流程（简化）
def evaluate_conversation(llm_agent, scenario, milestones, minefields):
    world_state = {}  # 初始化世界状态（键值对存储）
    messages = [scenario.system_prompt, scenario.initial_user_message]
    milestone_results = []
    minefield_triggers = []

    for turn in range(scenario.max_turns):
        # 1. LLM 生成工具调用或文本回复
        llm_response = llm_agent(messages, available_tools)

        # 2. 执行工具调用，更新 World State
        for tool_call in llm_response.tool_calls:
            result = execute_tool(tool_call, world_state)
            world_state.update(result.state_changes)  # W' = f_tool(W, params)
            messages.append(result)

        # 3. Milestone 检查（在指定轮次检查中间状态）
        for ms in milestones_by_turn[turn]:
            if ms.condition(world_state, messages):
                milestone_results.append({"milestone": ms, "passed": True})
            else:
                milestone_results.append({"milestone": ms, "passed": False})

        # 4. Minefield 检测（检查是否触发违禁行为）
        for mf in minefields:
            if mf.pattern_matches(messages, world_state):
                minefield_triggers.append({"minefield": mf, "turn": turn})

    # 最终 World State 匹配度评分
    final_state_score = compute_state_match(world_state, scenario.expected_state)
    return final_state_score, milestone_results, minefield_triggers
```

##### 核心机制详解

**动机与背景**：传统 LLM 工具使用评估（如 BFCL、ToolBench）存在三个根本缺陷：(1) 工具是**无状态的**——每次调用独立执行，无法模拟现实世界中诸如"预订航班→修改预订→取消预订"的连锁操作；(2) 评估是**非对话式的**——用静态测试集做选择题式评测，忽略了真实用户-助手交互的动态性；(3) 评估指标**只看最终结果**——忽略了中间步骤的正确性，无法区分"碰巧答对"和"推理正确"。

> 💡 关键：ToolSandbox 的核心洞察在于——**世界状态（World State）** 是连接单次工具调用与长期推理的桥梁。每一次工具调用都会产生持久化的副作用（如创建日历事件、转账），后续工具的行为取决于这些累积的状态变化。

**架构设计**：系统由三层组成——
- **Message Bus**：一个中介层，LLM Agent、工具、用户模拟器三者只与 Bus 通信而非彼此直连。这使得工具调用和用户消息可以被透明地拦截、记录和评估。
- **World State**：用键值对字典 `{entity_id: {field: value}}` 存储所有工具执行产生的副作用。例如 `{"calendar_event_42": {"title": "Meeting", "time": "3pm"}}`。每轮工具调用后状态被更新，后续工具调用可以读取这些状态。
- **Milestone & Minefield**：评估指标不再只看最后一轮输出是否正确，而是在预设的**中间轮次**检查 World State 是否达到预期（Milestone）或是否触发了违规行为（Minefield）。

> ⚠️ 注意：Milestone 分为**强制里程碑**（必须在该轮恰好达成）和**可选里程碑**（在某轮及之前达成均可），后者的设计更贴近开放式对话的灵活性。

**State Dependency 挑战**：这是论文发现的最具挑战性的问题。当工具行为依赖于先前操作积累的 World State 时（例如：先创建日历事件 A，再创建事件 B 时需避开 A 的时间），LLM 需要在多次工具调用间维护一致的实体引用和状态推理。实验结果揭示了一个**反直觉现象**：某些闭源大模型在 State Dependent 场景下的性能反而不如简单的 Stateful 场景，说明增加状态依赖反而引入了干扰——模型可能"过度思考"而导致错误的状态推理。

**User Simulator 设计**：不同于传统基准的静态测试用例，ToolSandbox 使用 LLM 驱动的用户模拟器动态生成回复。模拟器接收场景描述（用户目标、偏好、约束）和对话历史，生成逼真的用户响应。为减少幻觉，论文引入了**工具辅助用户模拟器**——提供给模拟器一个 `end_conversation` 工具，实验表明这显著改善了对终止对话指令的遵循。

**Canonicalization 问题**：同一现实实体在对话中可能有多种指称方式（"明天下午的会议" vs "3点的那个事件" vs "event_42"），LLM 需要将这些表面形式归一化到 World State 中的唯一实体 ID。论文发现这是当前模型的显著短板——即使最终结果正确，中间过程中频繁出现实体引用混乱。

**主要实验发现**：(1) 闭源模型（GPT-4 系列）整体得分领先开源模型（Llama-3 系列）超过 20 分（满分 100）；(2) State Dependency 是所有模型得分最低的维度，即使最先进的 GPT-4 在该维度也仅勉强及格；(3) 在信息不足（Insufficient Information）场景中，多数模型倾向于直接调用工具"猜测"而非主动向用户寻求澄清——这是当前对齐训练的副作用；(4) Minefield 检测显示，模型最常见的违规行为是**信息泄露**（在输出中暴露了 World State 中的敏感数据）和**重复冗余调用**。

#### 🧪 练习题
```yaml
question: "ToolSandbox 中 Milestone 与 Minefield 的核心区别是什么？"
options:
  - "Milestone 在开头检查，Minefield 在结尾检查"
  - "Milestone 检查中间状态是否达成预期，Minefield 检测是否触发违禁行为"
  - "Milestone 用于单轮对话，Minefield 用于多轮对话"
  - "Milestone 评估最终结果，Minefield 评估中间过程"
answer: 1
explain: "Milestone 在指定轮次检查 World State 是否达到预设条件（正向指标），Minefield 实时检测模型是否触发了信息泄露、重复调用等违禁模式（负向指标），二者构成细粒度评估的正反两面。"
```
