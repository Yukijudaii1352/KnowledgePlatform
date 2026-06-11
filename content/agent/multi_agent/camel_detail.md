### CAMEL: 交流式智能体 (CAMEL)

```yaml
id: camel
name: CAMEL
full_name: 交流式智能体 (CAMEL)
year: '2023.03'
org: KAUST
paper_url: https://arxiv.org/abs/2303.17760
category: foundation
parent: —
motivation: 以角色扮演启动自主多Agent协作
```

#### 📝 一句话总结
CAMEL 提出了基于"初始提示"(Inception Prompting)的**角色扮演通信代理框架**，让 AI User 和 AI Assistant 在多轮对话中自主合作完成复杂任务，仅需人类提供一个初步想法，从而解决了聊天语言模型高度依赖人工引导的问题，并系统性地研究了多智能体自主合作的挑战与能力涌现。

#### 🎯 核心要点
- 提出 **Role-Playing 框架**：AI User（发布指令）+ AI Assistant（执行解答）双智能体角色扮演，模拟人类社会中的协作模式
- 提出 **Inception Prompting**：让智能体之间通过对话互相提示，自动将初步想法细化为具体任务并求解，大幅减少人工介入
- 引入 **Task Specifier Agent**：将人类给出的模糊 idea 细化为具体的、可执行的任务描述
- 设计 **AI User 自主判定终止**的机制：AI User 判断任务是否完成，决定对话终止，形成闭环
- 系统识别了多智能体自主合作的**四大挑战**：role flipping（角色翻转）、assistant repeating instructions（助手重复指令）、flake replies（敷衍回复）、infinite loop of messages（无限消息循环）
- 生成了五种大规模对话数据集：**AI Society**（社会对话）、**Code**（代码生成）、**Math**（数学问答）、**Science**（科学问答）、**Misalignment**（对齐风险模拟）
- 在 GPT-4 和人类评估中，CAMEL 框架产生的解决方案显著优于 `gpt-3.5-turbo` 单轮生成
- 利用渐进式增长的数据集微调 LLaMA，**验证了 LLM 知识涌现**现象
- 完全开源框架和数据集：https://github.com/camel-ai/camel

#### 🔬 深入细节
##### 1. 核心框架图

![CAMEL 角色扮演框架](https://arxiv.org/html/2303.17760v2/assets/figures/pipeline.pdf)
*图：CAMEL Role-Playing 框架总览——人类输入一个初步 idea（如"开发股票交易机器人"），Task Specifier 将其细化，随后 AI User（股票交易员角色）与 AI Assistant（Python 程序员角色）通过多轮指令-解答对话协作完成任务。*

##### 2. 算法流程伪代码

```python
# CAMEL Role-Playing 主循环（简化）
def camel_role_playing(idea: str, user_role: str, assistant_role: str):
    # Step 1: Task Specification
    task = task_specifier_agent(idea, user_role, assistant_role)
    
    # Step 2: Initialize agents with Inception Prompts
    sys_msg_user = f"你是{user_role}。你的任务是向Assistant下达指令来完成：{task}"
    sys_msg_assistant = f"你是{assistant_role}。你需要遵循User的指令来帮助完成：{task}"
    
    user_agent = ChatAgent(sys_msg_user)
    assistant_agent = ChatAgent(sys_msg_assistant)
    
    # Step 3: Multi-turn conversation loop
    conversation = []
    user_msg = f"请帮我完成以下任务的第一步：{task}"  # 初始指令
    
    while True:
        # Assistant responds
        assistant_response = assistant_agent.chat(user_msg)
        conversation.append(("assistant", assistant_response))
        
        # AI User evaluates and gives next instruction
        user_msg = user_agent.chat(
            f"Assistant的回复：{assistant_response}\n"
            f"基于以上回复，请给出下一步具体指令。"
            f"如果任务已完全解决，请回复'<CAMEL_TASK_DONE>'。"
        )
        
        if "<CAMEL_TASK_DONE>" in user_msg:
            break
        
        conversation.append(("user", user_msg))
    
    return conversation
```

##### 3. 方法深入解读

**动机与背景**

传统的大型语言模型对话系统（如 ChatGPT）虽然在复杂任务求解上取得了显著进展，但其成功**高度依赖人类用户的精准提示**。对于缺乏领域知识的普通用户（如不会编程的人想让 AI 写一个交易程序），他们无法给出有效的指令来引导 AI 完成任务。这引出了一个核心问题：**能否用一个自主的通信智能体来替代人类干预**，仅凭一个初步想法就能引领对话走向任务完成？

**核心机制：Role-Playing + Inception Prompting**

CAMEL 的核心创新在于将"角色扮演"（Role-Playing）与"Inception Prompting"（初始提示）相结合：

- **角色分配**：人类只需提供一个初步 idea 和两个角色名（如"股票交易员"作为 AI User，"Python 程序员"作为 AI Assistant），系统自动生成对应的系统消息（System Message），赋予两个 Agent 特定的身份和目标。

- **Task Specifier**：为了避免 idea 过于模糊，CAMEL 引入了一个 Task Specifier Agent，它会根据角色和 idea 生成一个详细的、可执行的任务描述。例如将"开发交易机器人"细化为"开发一个基于移动平均线交叉策略的股票交易机器人，能够从 Yahoo Finance 获取数据、计算信号并回测"。

- **Inception Prompting**：这是 CAMEL 的命名灵感来源（取自电影《盗梦空间》Inception）——就像在梦中植入一个想法会自发演化，CAMEL 通过精心设计的系统消息将"任务目标"植入两个 Agent 的"潜意识"。AI User 持续给出指令，AI Assistant 持续响应，**双方在对话中自然地将任务向前推进**，无需外部干预。

- **对话结构**：AI User 的职责是"给指令+判断完成"，AI Assistant 的职责是"遵循指令+给出方案"。User 的每次回复都基于 Assistant 的上一轮输出来确定下一步方向，形成一种**自我驱动的渐进式问题解决循环**。

**关键挑战与解决方案**

论文深入分析了自主合作中的四大挑战并提出了应对策略：

- **Role Flipping（角色翻转）**：Assistant 反过来向 User 发号施令或提问，而非执行指令。原因是 Assistant 的系统消息不足以约束其行为。解决方案：在 Assistant 的 Inception Prompt 中强化"你是一个助手，必须遵循用户指令"的设定。

- **Assistant Repeating Instructions（重复指令）**：Assistant 仅仅复述 User 的指令而不给出实际解答。解决方案：在 Prompt 中加入"请直接给出解决方案，不要重复任务描述"的约束。

- **Flake Replies（敷衍回复）**：Assistant 给出"好的，我会做的"之类的空转回复而不执行。解决方案：要求 Assistant"给出具体的、可执行的步骤和代码"。

- **Infinite Loop（无限循环）**：对话在相同内容间重复。解决方案：设置最大轮次限制，并让 AI User 明确判断任务完成状态。

**数据集构建与应用**

CAMEL 利用其框架以**高度可扩展的方式**生成了多种数据集：

| 数据集 | 描述 | 规模 |
|--------|------|------|
| AI Society | 角色扮演社会对话，涵盖 50 种 Assistant 角色 × 50 种 User 角色 | 大规模指令-解答对 |
| Code | 编程任务对话，角色对如"程序员-产品经理" | 含完整代码解决方案 |
| Math | 数学问答单轮数据 | 用于能力涌现研究 |
| Science | 科学问答单轮数据 | 用于能力涌现研究 |
| Misalignment | 模拟恶意应用场景 | 展示未对齐 AI 的潜在风险 |

**与传统方法的区别**

对比此前的数据生成方法（如 Self-Instruct、Alpaca 等），CAMEL 的关键区别在于：
1. **多轮对话而非单轮**：生成的是完整的、有上下文依赖的多轮指令-解答序列，更接近真实的人类协作场景。
2. **角色驱动**：角色扮演使得生成的对话具有人格化特征和领域专业性。
3. **自主驱动**：一旦给定初始 idea，整个过程无需人工示例（zero-shot），高度可扩展。
4. **双重对齐保证**：AI User 保证任务方向对齐，AI Assistant 保证解答质量，两者形成互相监督的闭环。

##### 4. 关键公式与机制

**Inception Prompt 结构**（系统消息设计）：

AI Assistant 的 Inception Prompt 模板：
> "Never forget you are a {ASSISTANT_ROLE} and I am a {USER_ROLE}. Never flip roles! Never instruct me! ... Your reply must be a specific solution to my instruction. Do not repeat my instruction. If you think the task is not achievable based on your capability, explain why."

AI User 的 Inception Prompt 模板：
> "Never forget you are a {USER_ROLE} and I am a {ASSISTANT_ROLE}. ... You should give me instructions based on my responses. Each instruction should be a single, specific task. You must decide whether the task is fully completed."

> 💡 关键：Inception Prompt 的本质是通过**角色固化**和对**行为边界的约束**来确保对话始终朝着任务完成的方向推进，防止偏离。

**任务终止判定**：

AI User 在每个回复轮次中需要做出二元决策：继续给出下一步指令，或发出终止信号 `<CAMEL_TASK_DONE>`。这形成了一个自动的任务完成评估机制，无需外部人工或规则判断。

> ⚠️ 注意：终止判定完全由 AI User 自主完成，这意味着 AI User 的判断能力直接影响对话时长和任务完成质量。实验中观察到 AI User 有时会过早终止（任务未真正完成）或过晚终止（陷入完美主义循环）。

#### 🧪 练习题
```yaml
question: "CAMEL 框架中，Inception Prompting 的核心作用是什么？"
options:
  - "提高单个 Agent 的推理速度"
  - "通过角色固化和行为约束，使 Agent 在自主对话中保持任务方向不偏离"
  - "减少模型参数量以实现轻量化部署"
  - "用多个 Agent 投票来提升生成质量"
answer: 1
explain: "Inception Prompting 将角色身份和任务目标'植入'系统消息，并明确约束行为边界（如禁止角色翻转、禁止重复指令），确保 AI User 和 AI Assistant 在无人干预下始终围绕任务协作，避免对话偏离或陷入无限循环。"
```
