### CAMEL：用角色扮演与 Inception Prompting 构造自主协作的交流式智能体

```yaml
id: camel
name: CAMEL
full_name: 交流式智能体 (CAMEL)
year: 2023
org: KAUST
paper_url: https://proceedings.neurips.cc/paper/2023/hash/a3621ee907def47c1b952ade25c67698-Abstract-Conference.html
category: multi_agent
parent: —
motivation: 角色扮演框架实现自主协作
```

#### 📝 一句话总结
CAMEL 提出了 role-playing 交流式多智能体框架，用任务指定器、AI User、AI Assistant 与 Inception Prompting 让两个聊天模型在明确角色约束下自主协作，解决复杂任务依赖人类持续提示和纠偏的问题。

#### 🎯 核心要点
- 提出 task-oriented role-playing 框架：人类只给初始 idea 与角色，后续由智能体互相指令和响应推进任务。
- 包含 Task Specifier、AI User、AI Assistant 三个核心角色，必要时可加入 Critic-in-the-loop 控制对话质量。
- AI User 扮演任务规划者，持续发出 instruction；AI Assistant 扮演任务执行者，返回具体 solution。
- 使用 Inception Prompting 在对话开始前写入任务、角色、通信协议、终止条件和禁止角色翻转等约束。
- 通过对称系统提示减少 role flipping、assistant repeats instruction、flake replies、infinite loop 等多智能体协作失败模式。
- 使用 `<CAMEL_TASK_DONE>` 作为终止信号，避免智能体在感谢、告别或空转对话中无限循环。
- 可将每轮对话转化为 instruction-solution 数据，用于研究 AI society 行为或生成指令微调数据。
- 论文构造并分析 AI Society、Code、Math、Science 等数据，其中 AI Society 由角色组合和任务生成流程规模化得到。
- Critic agent 可以在候选回复之间选择或给出反馈，使 role-playing 扩展到更接近树搜索的决策模式。

#### 🔬 深入细节

![CAMEL Role-Playing Framework](https://izualzhy.cn/assets/images/ai-paper/camel_figure_1.png)
*图：论文 Figure 1 的公开镜像。人类输入 idea 与角色后，Task Specifier 细化任务，AI User 与 AI Assistant 在 Role Playing Session 中通过指令-解决方案回合协作。*

```python
# CAMEL role-playing 核心流程伪代码
idea = human_input.idea
assistant_role, user_role = human_input.role_assignment

specified_task = task_specifier_llm(
    idea=idea,
    assistant_role=assistant_role,
    user_role=user_role,
)

assistant = ChatAgent(system_prompt=build_assistant_prompt(
    role=assistant_role,
    partner_role=user_role,
    task=specified_task,
    protocol="return concrete Solution and request Next request"
))
user = ChatAgent(system_prompt=build_user_prompt(
    role=user_role,
    partner_role=assistant_role,
    task=specified_task,
    protocol="send one Instruction with optional Input per turn"
))

messages = []
while True:
    instruction = user.generate_instruction(messages)
    if instruction == "<CAMEL_TASK_DONE>":
        break

    solution = assistant.solve(messages, instruction)

    if critic_enabled:
        solution = critic.select_or_refine(
            task=specified_task,
            history=messages,
            proposal=solution,
        )

    messages.append((instruction, solution))
```

CAMEL 的出发点很具体：当用户用聊天模型解决复杂任务时，真正困难的不是让模型回答一次，而是持续把对话推向正确方向。用户需要知道下一步该问什么、如何补充约束、何时结束、如何纠正跑偏。CAMEL 的设计把这个“持续提示的人类”替换为另一个智能体，也就是 AI User；把“执行请求的聊天模型”形式化为 AI Assistant。二者不是自由聊天，而是在预先写好的角色剧本中协作。

论文把对话历史形式化为 instruction-solution 对集合：

$$
M_t = \{(I_0,S_0),\ldots,(I_t,S_t)\}
$$

下一轮中，AI User 读取历史 \\(M_t\\) 并产生新指令：

$$
I_{t+1} = U(M_t)
$$

AI Assistant 再基于历史与新指令生成解决方案：

$$
S_{t+1} = A(M_t, I_{t+1})
$$

最后把新回合写回历史：

$$
M_{t+1} = M_t \cup \{(I_{t+1}, S_{t+1})\}
$$

这个公式看似简单，但它把多智能体协作压缩成一个可重复的数据生成算子：每轮都产生一个 instruction-solution pair，并且下一轮指令依赖此前所有 pair。因此 CAMEL 不仅是任务求解框架，也是合成对话数据的框架。只要系统提示足够稳定，就可以规模化生成“角色明确、任务导向、指令跟随”的多轮数据。

Task Specifier 是 CAMEL 中容易被忽略但很关键的模块。人类输入通常只是模糊 idea，例如“开发一个股票交易机器人”，并不天然适合直接交给两个智能体执行。Task Specifier 根据 assistant/user 的角色把 idea 细化成明确任务，使后续对话有共同目标。这个模块承担“想象力”和“任务收敛”两种功能：既把抽象意图扩展为具体可做的任务，又防止两个智能体在任务定义不清时发散。

Inception Prompting 是整套方法的控制核心。CAMEL 的 prompt engineering 只发生在角色扮演开始前，之后两个智能体自动互相 prompt。系统提示中写入四类约束：角色身份、共同任务、通信协议、终止条件。角色身份用于防止 role flipping，例如 assistant 不应该突然开始指挥 user；通信协议要求 user 每轮给出一条 instruction 和必要 input，assistant 返回具体 solution；终止条件让 user 在认为任务完成时输出 `<CAMEL_TASK_DONE>`。这些约束让开放式聊天变成可收集、可分析、可停止的协作流程。

CAMEL 论文特别强调多智能体协作的失败模式。Role flipping 会让执行者和规划者互换职责，导致对话结构崩掉；assistant repeats instruction 是模型看似响应但没有实际执行；flake replies 指 assistant 用“我将会……”这类承诺代替完成；infinite loop 则是两个 agent 反复感谢或告别。CAMEL 的提示模板并不是装饰，而是针对这些失败模式设计的行为边界。它说明在 LLM 多智能体系统中，“协议设计”与“模型能力”同样重要。

Critic-in-the-loop 提供了另一层可控性。基础 CAMEL 是二智能体回合制，但论文提出可以加入 critic agent 或人类 critic，对候选方案选择、打分或反馈。这样对话不再只是线性链条，而可以变成 proposal -> critique -> selection/refinement 的结构。它与后来的多智能体 debate、planner-executor-critic 架构有明显联系：规划者不直接保证正确性，而由批评者在关键节点施加选择压力。

与单 Agent 相比，CAMEL 的优势不是底层模型更强，而是把任务分解为两个互补角色：User 负责“下一步问什么”，Assistant 负责“如何完成这一步”。与 AutoGPT/BabyAGI 式任务队列不同，CAMEL 的状态主要是自然语言对话历史，而不是显式队列；与 ReAct 不同，CAMEL 的动作不是工具调用格式优先，而是角色间自然语言通信优先。因此它更适合研究“智能体社会”与协作行为，而不是单个 agent 的工具执行效率。

从数据角度看，CAMEL 的贡献也很重要。AI Society 数据通过自动生成 assistant roles、user roles 和 tasks 扩展到大量角色组合；Code 场景则用编程语言、领域和任务组合生成代码相关协作对话；Math/Science 场景进一步生成问题与解答。论文的重点不是这些数据一定完全正确，而是展示 role-playing 可以成为一种低人工成本的对话数据生成机制，用来观察模型能力、协作失败、任务覆盖和潜在风险。

> ⚠️ 注意：CAMEL 解决的是“让两个 LLM 自主协作”的协议问题，不保证每个任务结果真实正确。实际系统仍需要工具验证、外部评测或 critic/human-in-the-loop 来控制可靠性。

#### 🧪 练习题
```yaml
question: "CAMEL 中 Inception Prompting 的主要作用是什么？"
options:
  - "在训练阶段更新两个智能体的模型参数"
  - "在对话开始前注入角色、任务、通信协议和终止条件，使智能体能自主协作"
  - "把所有用户问题改写成单轮零样本提示"
  - "用向量数据库检索历史任务结果"
answer: 1
explain: "CAMEL 的 prompt engineering 主要发生在 role-playing 开始前，目的是固定角色和协议，降低角色翻转、空转循环等失败。"
```
