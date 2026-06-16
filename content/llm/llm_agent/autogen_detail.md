### AutoGen：自动生成智能体 (AutoGen)

```yaml
id: autogen
name: AutoGen
full_name: 自动生成智能体 (AutoGen)
year: 2024
org: 微软
paper_url: https://openreview.net/forum?id=BAakY1hNKS
category: multi_agent
parent: camel
motivation: 可定制可对话的多Agent工作流框架
```

#### 📝 一句话总结
AutoGen 提出一个通用多 Agent 对话编程框架，把复杂 LLM 应用抽象为可定制、可对话、可调用人类与工具的 Agent 之间的消息流，从而统一实现顺序对话、嵌套对话、群聊和动态工作流。

#### 🎯 核心要点
- 提出 ConversableAgent 抽象：每个 Agent 都能 send、receive、generate_reply，并可注册自定义 reply 函数。
- Agent 能组合三类能力：LLM 推理、人类输入、工具或代码执行，支持混合配置而非只依赖单个 LLM。
- 提供 AssistantAgent、UserProxyAgent、GroupChatManager 等内置 Agent，用于代码生成、人工代理、工具执行和群聊管理。
- 提出 Conversation Programming：先定义可对话 Agent，再用自然语言与 Python 代码共同描述对话计算和控制流。
- 自动回复机制使对话在满足终止条件前持续推进，不需要额外中央控制器手写每一步调度。
- 支持 sequential chat、nested chat、group chat、hierarchical chat 和函数调用驱动的动态 Agent 路由。
- 在数学、代码、RAG 问答、ALFWorld 决策、供应链优化和对话式棋类应用中展示通用性。

#### 🔬 深入细节
![AutoGen 多 Agent 对话总览](https://ar5iv.labs.arxiv.org/html/2308.08155/assets/x1.png)
*图：AutoGen 将 Agent 定义、灵活对话模式和实际 Agent Chat 统一到多 Agent conversation 框架中。*

AutoGen 的核心动机是：真实 LLM 应用越来越像工作流，而不是一次提示词调用。单 Agent 往往需要同时做推理、写代码、执行工具、解释错误、向用户追问、判断是否结束，这会让系统脆弱且难复用。AutoGen 的解法是把每个参与者建模为“可对话 Agent”，再让任务通过消息传递自然推进。论文强调两个问题：如何设计可复用、可配置的 Agent；以及如何用统一接口覆盖不同的对话拓扑。前者由 ConversableAgent 解决，后者由 conversation programming 解决。

可以把 AutoGen Agent 形式化为：

$$
a_i = (role_i, cap_i, h_i, R_i, T_i),
$$

其中 \(role_i\) 是角色描述，\(cap_i\) 是能力集合，例如 LLM、人类输入、代码执行、函数调用，\(h_i\) 是消息历史，\(R_i\) 是回复生成函数，\(T_i\) 是终止条件。收到消息 \(m_t\) 后，Agent 更新上下文并产生回复：

$$
h_i^{t+1}=h_i^t \cup \{m_t\}, \quad m_{t+1}=R_i(h_i^{t+1}; cap_i),
$$

若 \(T_i(h_i^{t+1})=1\)，对话停止；否则回复被发送给下一个 Agent。这个公式看似简单，但它把 LLM 调用、人工输入、工具执行、代码解释器反馈都压进同一个 `generate_reply` 接口中，因此工作流可以通过注册不同回复函数组合出来。

```python
# AutoGen 对话编程伪代码
assistant = AssistantAgent(
    name="assistant",
    llm_config=gpt4_config,
    system_message="Write code, inspect execution feedback, and terminate when solved."
)
user_proxy = UserProxyAgent(
    name="user_proxy",
    human_input_mode="ALWAYS",
    code_execution_config={"work_dir": "workspace"}
)

def reply_func_A2B(message, sender, receiver, context):
    if contains_code(message):
        return execute_code(message)
    if need_human_feedback(message):
        return ask_human(message)
    return receiver.generate_reply(message)

user_proxy.register_reply(sender=assistant, reply_func=reply_func_A2B)
assistant.initiate_chat(
    recipient=user_proxy,
    message="Plot META and TESLA stock price change YTD."
)
```

![AutoGen 对话编程机制](https://ar5iv.labs.arxiv.org/html/2308.08155/assets/x2.png)
*图：AutoGen 用统一接口、注册回复函数和自动回复机制把开发者代码转化为自动化 Agent Chat。*

Conversation Programming 是 AutoGen 最重要的方法论贡献。它区分“计算”和“控制流”：计算是某个 Agent 在收到消息后做什么，例如调用 LLM、执行代码、请求人类输入；控制流是这些计算以什么顺序发生，以及下一条消息发给谁。传统链式框架通常把这两者写死在一个 pipeline 中，而 AutoGen 允许开发者用 Python 注册 reply function，也允许 LLM 通过自然语言规则或 function calling 决定下一步。这样，一个简单的两 Agent 代码执行循环、一个带检索器的 RAG Chat、一个多专家群聊，都可以复用同一套 send/receive/generate_reply 语义。

自动回复机制降低了复杂工作流的样板代码。只要 conversation 初始化，接收方会自动调用 `generate_reply` 并返回消息，直到触发终止条件或最大轮数。终止条件既可以是自然语言协议，例如 assistant 输出 `TERMINATE`，也可以是程序规则，例如达到最大自动回复次数、代码执行成功、人工确认通过。这个设计避免了显式中央调度器，但并不意味着无控制；控制被分散到每个 Agent 的系统消息、reply 函数、工具配置和终止检查中。

AutoGen 的可扩展性来自嵌套对话和动态路由。若某个 Agent 在生成回复前需要咨询其他专家，它可以在自定义 `generate_reply` 中临时启动一个 nested chat，再把内部对话总结为外层回复。GroupChatManager 则把一组 Agent 放入群聊，并动态选择下一个发言者，适合开放式协作或辩论。对应的抽象可以写作：

$$
next = \pi(M_t, A), \quad m_{t+1}=R_{next}(M_t),
$$

其中 \(M_t\) 是群聊消息池，\(A\) 是候选 Agent 集合，\(\pi\) 可以由规则、LLM 或函数调用实现。相较 CAMEL 固定双 Agent 角色扮演，AutoGen 不限制 Agent 数量和拓扑结构，也不要求任务必须沿预设阶段前进。

AutoGen 的设计还把“人类参与”变成一等能力。UserProxyAgent 可以每轮请求人工输入，也可以在无人输入时自动执行代码；这使系统能在自动化和人工把关之间切换。论文中的应用表明，这种混合模式特别适合高风险或长链任务：数学题中可让用户补充思路，RAG 中可让检索上下文迭代更新，ALFWorld 中可加入 grounding agent 避免环境行动循环，OptiGuide 场景中可用 Safeguard Agent 防止生成不安全优化代码。AutoGen 因此不是一个单一算法，而是一个可编程的多 Agent 运行时抽象。

#### 🧪 练习题
```yaml
question: "AutoGen 中 conversation programming 的关键含义是什么？"
options:
  - "只用自然语言提示词串联多个固定 Agent，不允许代码控制"
  - "把 LLM 应用统一表示为 Agent 间对话，并用自然语言与代码共同定义计算和控制流"
  - "把所有工具调用都集中到一个不可修改的中央规划器中"
  - "通过监督微调训练专门的多 Agent 路由模型"
answer: 1
explain: "AutoGen 的核心是用可对话 Agent 和统一接口表达工作流，开发者既能用提示词控制行为，也能用 Python 注册回复函数与终止条件。"
```
