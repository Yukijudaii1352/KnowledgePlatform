### AgentVerse：智能体宇宙 (AgentVerse)

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
AgentVerse 提出一个模拟人类群体解决问题流程的通用多智能体框架，用“专家招募 → 协作决策 → 动作执行 → 评估反馈”的闭环解决静态角色协作难以适配复杂任务的问题。它的核心价值不只是让多个 LLM Agent 投票，而是让团队组成、沟通结构和下一轮行动随环境反馈动态调整，并由此观察到志愿、从众和破坏性等群体涌现行为。

#### 🎯 核心要点
- 四阶段闭环：Expert Recruitment、Collaborative Decision-Making、Action Execution、Evaluation。
- 动态专家招募：由 recruiter agent 根据目标和上一轮反馈生成专家角色，而不是人工预设固定角色。
- 两类协作结构：horizontal structure 用于咨询、工具使用等多路并行任务，vertical structure 用于数学、代码等需要单一精炼答案的任务。
- MDP 化建模：把多智能体群体与环境交互表示为状态、动作、转移、奖励、目标空间上的迭代过程。
- 任务覆盖广：论文在通用理解与推理、HumanEval 代码生成、工具使用、Minecraft embodied AI 等场景比较 CoT、Solo、Group。
- 关注涌现行为：分析 volunteer、conformity、destructive behaviors，强调协作智能的收益与安全风险并存。

#### 🔬 深入细节
![AgentVerse 总体框架图](https://ar5iv.labs.arxiv.org/html/2308.10848/assets/x1.png)
*图：AgentVerse 的四阶段闭环。系统先招募专家，再让专家协作决策，随后在环境中执行动作，最后由评估模块把当前状态与目标差距反馈给下一轮。*

AgentVerse 的动机来自一个很具体的缺口：AutoGPT、BabyAGI、ReAct 等单智能体系统可以把 LLM 接到工具和环境上，但复杂真实任务常常需要不同专长的人共同完成；早期多智能体工作又常把角色、讨论方式和参与者固定下来，导致团队无法随任务进展改变。论文因此把“团队如何变化”放进方法核心：每一轮都先看目标和反馈，再决定当前最需要哪些专家。

论文把整个过程抽象成一个 MDP：

$$
\mathcal{M}=(\mathcal{S},\mathcal{A},\mathcal{T},\mathcal{R},\mathcal{G}),\qquad s_{t+1}=\mathcal{T}(s_t,A_t)
$$

其中 \(\mathcal{S}\) 是智能体与环境状态空间，\(\mathcal{A}\) 是解法与可执行动作空间，\(\mathcal{T}\) 是状态转移函数，\(\mathcal{R}\) 是奖励或评价信号，\(\mathcal{G}\) 是目标空间。这个形式化的意义不是要训练一个 RL policy，而是把“讨论出的群体决策” \(A_t\) 明确放到环境转移中：团队讨论如果只停留在文本层面没有执行与反馈，就不能形成真正的闭环。

```python
# AgentVerse 核心闭环伪代码
state = observe_environment()
feedback = None

for round_id in range(max_rounds):
    # 1. Expert Recruitment: recruiter 按目标和反馈组队
    experts = recruiter.generate_experts(goal, feedback, state)
    agents = [instantiate_agent(role) for role in experts]

    # 2. Collaborative Decision-Making: 选择水平或垂直沟通结构
    if task_requires_parallel_subtasks(goal):
        proposals = [agent.propose(state, goal) for agent in agents]
        group_decision = aggregate(proposals)          # horizontal structure
    else:
        solution = solver.initial_answer(state, goal)
        for _ in range(max_refine_steps):
            critiques = [r.review(solution, goal) for r in reviewers]
            if consensus(critiques):
                break
            solution = solver.refine(solution, critiques)
        group_decision = solution                      # vertical structure

    # 3. Action Execution: 把群体决策落到环境或工具中
    state = environment.step(group_decision)

    # 4. Evaluation: 评估当前状态与目标差距，反馈给下一轮招募
    done, feedback = evaluator.compare(state, goal)
    if done:
        break
```

专家招募阶段的关键是从“人工写死角色”转向“按目标自动生成角色”。给定目标 \(g\in\mathcal{G}\)，论文让一个 recruiter agent \(M_r\) 生成专家描述集合，形成团队 \(M=M_r(g)\)。如果第 \(t-1\) 轮评估指出方案缺少安全审查或工具调用失败，那么下一轮 recruiter 就可以把安全专家、测试员、检索专家等加入团队。这个机制直接对应任务清单里的 motivation：它模拟群体涌现行为与动态调整，而不是只做多 Agent 拼接。

协作决策阶段有两种通信拓扑。水平结构中，每个 agent \(m_i\) 产生自己的决策 \(a_{m_i}\)，群体决策由聚合函数得到：

$$
A=f(\{a_{m_i}\}_{i=1}^{n})
$$

这里的 \(f\) 可以是总结、投票、ensemble 或由主持 agent 归纳出的计划。它适合咨询、工具使用、Minecraft 多人协作等场景，因为任务可以自然拆成多个子任务并行推进。垂直结构中，solver 先提出 \(a^*_0\)，reviewers 连续给反馈，solver 迭代修正直到共识或达到上限：

$$
a^*_k=\operatorname{Refine}(a^*_{k-1},\{\phi_j(a^*_{k-1})\}_{j=1}^{m}),\qquad A=a^*_k
$$

这更适合数学题、代码生成等“最终只需要一个答案”的任务。论文在附录中也说明，代码和通用推理采用垂直结构，工具使用采用水平结构，因为工具任务需要各个 agent 明确自己的子任务并互相补位。

执行与评估让 AgentVerse 区别于普通多轮聊天。动作执行阶段把群体决策真正作用到环境上，例如调用 Bing search、浏览器、代码解释器、任务 API，或在 Minecraft 中由多个 Voyager agent 分别采集、合成、交付物品。评估阶段比较新状态 \(s_{new}\) 与目标 \(g\)，输出自然语言反馈 \(F_t\)，如果目标未达成，就把 \(F_t\) 送回专家招募阶段。这个反馈不只是给原团队“再试一次”，而是允许团队结构本身变化。

实验上，论文比较了 CoT、Solo、Group 三类设置。Solo 仍使用 AgentVerse 的招募、执行和评估模块，但决策阶段只有一个 agent；Group 则启用多 agent 协作。这个对照很重要：如果 Group 优于 Solo，收益来自群体协作；如果 Solo 也优于 CoT，说明闭环式执行和评估本身也有价值。论文报告在 HumanEval 上 GPT-4 从 CoT 的 83.5 pass@1 提升到 Solo 的 87.2、Group 的 89.0；工具使用中，AgentVerse 组队完成 10 个复杂多工具任务中的 9 个，而单个 ReAct agent 只完成 3 个。

更有启发的是，论文把多智能体交互当作研究对象，而不是只看任务分数。在 Minecraft 等场景中，agent 会出现 volunteer behavior，例如空闲 agent 主动帮队友收集材料；也会出现 conformity behavior，例如偏离目标的 agent 在队友批评后回到共同目标；还会出现 destructive behavior，例如错误行动破坏团队成果。AgentVerse 的方法意义因此分成两层：工程上，它提高复杂任务的分解与执行能力；科学上，它提供了观察 LLM agent 群体行为的可复现实验框架。

> 💡 关键：AgentVerse 的“多”不是简单增加 agent 数量，而是让团队组成、沟通结构、执行动作和评价反馈形成同一个闭环。没有 Evaluation 回流到 Expert Recruitment，就缺少论文最核心的动态调整能力。

#### 🧪 练习题
```yaml
question: "AgentVerse 为什么要把 Evaluation 的反馈送回 Expert Recruitment，而不是只让原团队继续讨论？"
options:
  - "为了减少每轮调用的 LLM token 数量"
  - "为了让团队组成能根据当前失败原因动态变化"
  - "为了避免所有 agent 执行动作"
  - "为了把水平结构强制改成垂直结构"
answer: 1
explain: "AgentVerse 的核心是动态组队；评估反馈指出当前状态与目标的差距，recruiter 可以据此加入或替换更合适的专家。"
```
