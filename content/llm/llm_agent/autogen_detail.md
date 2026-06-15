### AutoGen：可编程的多智能体对话工作流框架

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

AutoGen 把 LLM、工具、代码执行器和人类反馈都封装成可对话 Agent，让开发者通过定义消息流与自动回复规则来搭建复杂工作流。

#### 🎯 核心要点

- **核心问题**：真实任务常需要模型、工具、代码执行和人工确认混合协作，固定链式调用难以表达开放式交互。
- **抽象单位**：Conversable Agent 既能接收消息，也能根据 LLM、工具、代码或人类输入自动回复。
- **工作流表达**：开发者通过 reply function、group chat、manager 和终止条件定义多 Agent 之间的对话协议。
- **工程价值**：同一框架可覆盖代码生成、问答、工具调用、检索增强和人机协同任务。
- **局限性**：框架提供编排能力，但任务成功仍依赖底层模型能力、工具可靠性和对话协议设计。

#### 🔬 深入细节

![AutoGen agents](https://microsoft.github.io/autogen/0.2/assets/images/autogen_agents-b80434bcb15d46da0c6cbeed28115f38.png)

*图源：Microsoft AutoGen 官方文档，展示多个可对话 Agent 通过消息、工具和人类反馈协作。*

```python
def autogen_workflow(task):
    assistant = ConversableAgent(
        name="assistant",
        llm_config={"model": "gpt"},
        tools=[search, calculator],
    )
    user_proxy = ConversableAgent(
        name="user_proxy",
        human_input_mode="on_demand",
        code_executor=local_sandbox,
    )
    manager = GroupChatManager(agents=[assistant, user_proxy])

    message = {"role": "user", "content": task}
    while not manager.done(message):
        receiver = manager.select_next_agent(message)
        message = receiver.generate_reply(message)
        if contains_code(message):
            result = user_proxy.execute_code(message)
            message = attach_result(message, result)

    return manager.final_answer()
```

**方法动机**：AutoGen 的核心判断是，复杂应用不是单条 prompt 能稳定表达的，而是由多个可中断、可恢复、可执行的交互回合组成。若任务状态为 $s_t$、消息为 $m_t$，框架关心的是定义转移 $s_{t+1}=F(s_t,m_t,a_t)$，其中动作 $a_t$ 可以来自 LLM、工具、代码执行器或人类。

**Agent 抽象**：Conversable Agent 统一了“模型说话”“用户确认”“执行代码”“调用工具”等行为。每个 Agent 可以注册自动回复函数，并根据消息内容选择是否调用 LLM、运行代码或转交给人类；这使得工作流不必被硬编码成单向 DAG，而可以保留对话式的动态分支。

**对话编排**：AutoGen 的 group chat manager 承担调度角色，决定下一位发言者、维护共享历史并判断何时结束。开发者可以定义双 Agent 协作，也可以定义多 Agent 会议；同一个任务既能自动推进，也能在敏感步骤插入 human-in-the-loop。

**工程含义**：AutoGen 更像一个 Agent 应用的运行时，而不是单个算法。它的成功取决于对角色职责、消息格式、代码执行边界和错误恢复策略的设计；因此论文价值在于把“LLM 应用编排”抽象成可复用的软件接口。

#### 🧪 练习题

```yaml
question: AutoGen 中 Conversable Agent 的主要作用是什么？
options:
  - A. 统一封装能收发消息并自动回复的模型、工具、代码执行或人类代理
  - B. 只负责训练一个新的基础模型
  - C. 只保存向量数据库
  - D. 只用于网页截图
answer: A
explain: AutoGen 的核心抽象是可对话 Agent，它通过消息和回复函数把多种执行能力纳入统一工作流。
```
