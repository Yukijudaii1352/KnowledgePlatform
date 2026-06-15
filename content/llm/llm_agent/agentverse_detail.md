### AgentVerse：面向任务求解与群体模拟的多智能体框架

```yaml
id: agentverse
name: AgentVerse
full_name: 智能体宇宙 (AgentVerse)
year: 2024
org: 清华大学
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/578e65cdee35d00c708d4c64bce32971-Abstract-Conference.html
category: multi_agent
parent: camel
motivation: 模拟群体涌现行为与动态调整
```

#### 📝 一句话总结

AgentVerse 提供一个可配置的多智能体环境，让 LLM Agent 既能协作完成任务，也能在模拟环境中表现出群体互动和涌现行为。

#### 🎯 核心要点

- **双重目标**：同时支持 task-solving 框架和 simulation 框架，覆盖协作求解与社会行为研究。
- **核心流程**：专家招募、协作决策、动作执行和评估反馈构成闭环。
- **动态性**：系统可根据任务和表现调整 Agent 组成、角色和协作方式。
- **研究价值**：可观察材料贡献、时间贡献、互助、从众和安全风险等群体行为。
- **与 CAMEL 关系**：继承角色扮演式多 Agent 思路，但进一步关注群体层面的环境交互与评估。

#### 🔬 深入细节

![AgentVerse overview](https://ar5iv.labs.arxiv.org/html/2308.10848/assets/x1.png)

*图源：ar5iv 论文图 1，展示 AgentVerse 中 Agent 群体、环境与协作流程的整体结构。*

```python
def agentverse(task, environment):
    agents = recruit_experts(task)
    state = environment.reset(task)
    history = []

    while not environment.finished(state):
        proposals = []
        for agent in agents:
            observation = environment.observe(state, agent)
            proposals.append(agent.plan(observation, history))
        joint_action = collaborative_decision(proposals, agents)
        state, feedback = environment.step(joint_action)
        history.append((proposals, joint_action, feedback))
        agents = adjust_agents(agents, feedback)

    return evaluate_outcome(state, history)
```

**方法动机**：AgentVerse 关注的问题比单次问答更宽：当多个具备语言能力的 Agent 被放入共享环境时，群体如何分工、协商、行动和适应。它可以被看作在优化联合策略 $\pi(a_1,\dots,a_n \mid s,h)$，其中 $h$ 是群体交互历史。

**任务求解框架**：在 task-solving 模式中，AgentVerse 先根据任务招募不同专家，再通过协作决策整合多个 Agent 的建议，随后在环境中执行动作并接收反馈。这个流程把多 Agent 从“并行生成多个答案”推进到“共同维护一个可执行行动轨迹”。

**模拟框架**：在 simulation 模式中，重点不是单一正确答案，而是观察群体行为如何涌现。论文使用 Minecraft 等环境分析时间贡献、材料贡献、互助和从众现象，说明 LLM Agent 可以作为社会行为模拟的实验对象，但也可能暴露协作偏差和安全问题。

**动态调整机制**：AgentVerse 的关键不只是创建多个 Agent，还包括根据反馈调整参与者和协作方式。若某个 Agent 的提议长期无效，系统可以改变角色、权重或讨论结构；这种闭环让多 Agent 系统具备一定自适应能力。

#### 🧪 练习题

```yaml
question: AgentVerse 的流程闭环通常包括哪些核心阶段？
options:
  - A. 专家招募、协作决策、动作执行、评估反馈
  - B. 只进行单轮文本分类
  - C. 只压缩模型参数
  - D. 只生成静态报告
answer: A
explain: AgentVerse 用招募、协作、执行和评估组成多智能体任务求解与模拟闭环。
```
