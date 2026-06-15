### 交流式智能体 (CAMEL)

```yaml
id: camel
name: CAMEL
full_name: 交流式智能体 (CAMEL)
year: '2023'
org: KAUST
paper_url: https://proceedings.neurips.cc/paper/2023/hash/a3621ee907def47c1b952ade25c67698-Abstract-Conference.html
category: multi_agent
parent: —
motivation: 角色扮演框架实现自主协作
```

#### 📝 一句话总结

CAMEL 提出 role-playing 多智能体框架，用 inception prompting 给不同聊天代理分配稳定角色，让 AI user 与 AI assistant 在少人工干预下协作完成任务并生成可研究的多智能体对话数据。

#### 🎯 核心要点

- **Role-playing 框架**：通过角色设定让多个 LLM agent 围绕同一任务协作
- **Inception prompting**：在系统提示中植入角色、任务、约束和终止条件，减少角色漂移
- **AI user 与 AI assistant**：用户代理负责提出指令和反馈，助手代理负责执行与回答
- **Task specifier**：可把宽泛任务细化为更具体、可执行的协作目标
- **Critic-in-the-loop**：可引入评论代理提升可控性和任务质量
- **对话数据生成**：通过 agent-agent 交互自动生成大量任务求解轨迹，用于研究 LLM society
- **开源生态**：论文同时开源 CAMEL 库，支持 agent、任务、模型和模拟环境扩展

#### 🔬 深入细节

##### 核心示意图

![CAMEL Role Playing 图](https://raw.githubusercontent.com/camel-ai/camel/master/docs/images/role_playing.png)
*图：CAMEL 官方仓库中的 Role Playing 示意图，展示任务提示、角色分配、结构化交互和最终解答流程。图源：官方 GitHub。*

##### 算法伪代码

```python
# CAMEL role-playing 伪代码
def camel_role_playing(task_prompt, assistant_role, user_role, max_turns=20):
    specified_task = task_specifier.refine(task_prompt, assistant_role, user_role)

    assistant = ChatAgent(
        system_prompt=inception_prompt(
            role=assistant_role,
            task=specified_task,
            constraints="follow role, solve task, avoid role flipping"
        )
    )
    user = ChatAgent(
        system_prompt=inception_prompt(
            role=user_role,
            task=specified_task,
            constraints="give instructions, evaluate progress, keep task on track"
        )
    )

    message = user.init_instruction(specified_task)
    transcript = []
    for _ in range(max_turns):
        solution = assistant.step(message)
        critique = critic.review(solution) if critic_enabled() else None
        message = user.step(solution, critique)
        transcript.append((message, solution, critique))
        if user.decides_task_complete(solution):
            break

    return transcript, extract_final_solution(transcript)
```

##### 方法解读

CAMEL 的核心问题是：聊天模型很擅长响应人类输入，但如果没有人持续引导，多个 LLM 很容易目标漂移、重复对话或互相等待。Role-playing 通过给每个 agent 固定社会角色，把开放式聊天约束成结构化协作。AI user 不是真人，而是另一个 LLM，它负责提出下一步指令；AI assistant 根据指令执行任务。

Inception prompting 是稳定角色的关键。每个 agent 的系统提示不仅写“你是谁”，还写任务目标、对方角色、输出格式、禁止越界行为和终止标准。这样可以降低 role flipping，即助手突然变成用户、用户替助手解题等现象。角色约束相当于给多智能体通信加上协议层。

任务通常先经过 Task Specifier 细化。宽泛目标如“开发一个交易机器人”会被改写成更具体的任务描述，包含领域、约束、预期产物和协作方向。细化后的任务再交给 AI user 与 AI assistant 对话，减少双方对目标理解不一致。

CAMEL 的通信可以用消息集合表示。若第 \(t\) 轮用户代理给出指令 \(I_t\)，助手代理给出解答 \(S_t\)，则对话状态可更新为：

$$M_t = M_{t-1} \cup \{(I_t,S_t)\}$$

后续消息都以 \(M_t\) 为上下文，从而形成递进式协作。

Critic-in-the-loop 是可选增强。评论代理可以审查助手输出是否满足约束、是否偏离任务、是否需要修改。它不一定直接执行任务，而是提供质量控制信号，使多智能体对话更可控。

与单智能体 Agent 相比，CAMEL 的价值在于把“人类持续提示”替换为“代理间结构化沟通”。它也不把重点放在工具调用或搜索算法上，而是研究多个角色化 LLM 如何通过语言协议产生协作行为、数据和可观测的社会交互模式。

> 💡 关键：CAMEL 的角色不是装饰性人格，而是任务分工和通信协议，用来约束多智能体协作的方向和边界。

#### 🧪 练习题

```yaml
question: "CAMEL 中 inception prompting 的主要作用是什么？"
options:
  - "为每个 agent 植入角色、任务和约束，减少角色漂移并稳定协作"
  - "把所有 agent 合并成一个模型参数文件"
  - "只用于压缩对话历史"
  - "替代所有任务评估指标"
answer: 0
explain: "Inception prompting 通过系统提示固定 agent 的角色、目标和交互规则，是 CAMEL role-playing 框架稳定运行的关键。"
```
