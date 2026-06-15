### ChatDev：用多智能体模拟软件公司的聊天驱动开发

```yaml
id: chatdev
name: ChatDev
full_name: 聊天驱动开发 (ChatDev)
year: 2023
org: 清华大学
paper_url: https://arxiv.org/abs/2307.07924
category: multi_agent
parent: camel
motivation: 多Agent模拟软件公司开发流程
```

#### 📝 一句话总结

ChatDev 把软件开发拆成由 CEO、CTO、程序员、测试员等角色参与的多轮聊天流程，让多个 LLM Agent 按类似软件公司的阶段协作生成、审查和修复代码。

#### 🎯 核心要点

- **核心问题**：单个 LLM 直接写完整软件时容易遗漏需求、产生不一致设计，也缺少持续审查、测试和修复环节。
- **关键思想**：把瀑布式软件工程流程转成一条 ChatChain，每个阶段由具备角色设定的 Agent 通过双人或多人对话完成。
- **主要机制**：用角色提示、阶段提示、历史记忆和沟通式去幻觉机制约束 Agent 输出，使讨论围绕可执行产物推进。
- **输出形态**：需求澄清、设计决策、代码文件、审查意见、测试报告和修复补丁都作为阶段产物被传递到后续阶段。
- **适用边界**：适合小到中等规模项目的自动化原型开发；对复杂工程依赖、长期维护和真实用户反馈仍需要人工监督。

#### 🔬 深入细节

![ChatDev framework](https://arxiv.org/html/2307.07924v5/x1.png)

*图源：arXiv HTML 论文图 1，展示 ChatDev 将软件公司角色、聊天链和阶段产物组织成自动化开发流程。*

```python
def chatdev(requirement):
    memory = {"requirement": requirement, "artifacts": {}}
    chat_chain = [
        ("design", ["CEO", "CPO", "CTO"]),
        ("coding", ["CTO", "Programmer"]),
        ("review", ["Reviewer", "Programmer"]),
        ("testing", ["Tester", "Programmer"]),
        ("documentation", ["CEO", "Programmer"]),
    ]

    for phase, roles in chat_chain:
        prompt = build_phase_prompt(phase, roles, memory)
        transcript = []
        while not stop_condition(phase, transcript):
            speaker = select_next_role(roles, transcript)
            message = llm(role=speaker, prompt=prompt, context=transcript)
            message = communicative_dehallucination(message, memory)
            transcript.append((speaker, message))
        memory["artifacts"][phase] = extract_phase_product(phase, transcript)

    return package_project(memory["artifacts"])
```

**方法动机**：ChatDev 的出发点不是让一个模型“一口气”完成软件，而是把工程活动显式拆分成可检查的社会化协作过程。若把需求到代码的映射记为 $P(code \mid req)$，ChatDev 实际引入阶段变量 $z_1,\dots,z_T$，用 $\prod_t P(z_t \mid z_{<t}, req)$ 来逐步收窄搜索空间，降低直接生成的混乱度。

**角色分工**：每个 Agent 都有固定社会身份、目标和发言约束，例如 CEO 更关注愿景和任务定义，CTO 负责技术路线，程序员负责代码实现，测试员寻找运行错误。角色不是装饰，而是给模型施加不同的优化视角；同一问题在多个视角下被重复审视，能暴露单模型容易忽略的需求歧义和实现缺陷。

**ChatChain 流程**：ChatChain 将需求分析、设计、编码、审查、测试等阶段串联起来，每个阶段只接收必要历史和前序产物。这样做的好处是把上下文压力从“全局一次性记住所有东西”改为“阶段性继承关键状态”，同时让后续阶段能对前序产物形成外部反馈。

**沟通式去幻觉**：论文强调的 communicative dehallucination 是让 Agent 在对话中相互质疑、请求澄清和修正不合理输出。它不是传统检索式事实校验，而是在社会交互中触发自我反思；当某个角色输出与需求、文件结构或运行结果冲突时，其他角色会把冲突转化成下一轮修复提示。

#### 🧪 练习题

```yaml
question: ChatDev 相比单个 LLM 直接生成项目，最核心的结构性改动是什么？
options:
  - A. 把软件开发拆成多角色、多阶段的聊天链
  - B. 只增加更大的上下文窗口
  - C. 只使用更多训练数据微调模型
  - D. 完全取消人工需求输入
answer: A
explain: ChatDev 的关键是用角色化 Agent 和 ChatChain 显式模拟软件工程流程，而不是单纯依赖模型规模或上下文长度。
```
