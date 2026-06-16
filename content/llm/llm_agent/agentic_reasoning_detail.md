### Agentic Reasoning：智能体推理 (Agentic Reasoning)

```yaml
id: agentic_reasoning
name: Agentic Reasoning
full_name: 智能体推理 (Agentic Reasoning)
year: 2026
org: arXiv
paper_url: https://arxiv.org/abs/2601.12538
category: frontier_2026
parent: react
motivation: 感知规划验证统一组织原则
```

#### 📝 一句话总结
Agentic Reasoning 提出一个面向 LLM Agent 的统一综述框架，把推理从静态文本生成扩展为“规划、行动、反馈、记忆、协作”的交互式控制过程，解决传统 LLM 在开放动态环境中缺少感知、验证和持续适应的问题。

#### 🎯 核心要点
- 核心定义：将推理视为智能体行为的中心机制，覆盖基础能力、自演化适应和多智能体协作三层。
- 三层环境动态：Foundational Agentic Reasoning、Self-evolving Agentic Reasoning、Collective Multi-agent Reasoning。
- 基础单智能体能力：规划 reasoning、工具使用优化、agentic search / RAG，用于稳定环境中的目标分解、外部执行和信息检索。
- 自演化能力：通过 feedback 与 memory 把一次性推理变成跨轮次的经验积累、反思、自我修正和策略更新。
- 多智能体能力：通过 manager、worker、critic、memory keeper、communication facilitator 等角色，把推理分布到协作系统中。
- 两类优化模式：in-context reasoning 在测试时通过工作流、搜索和工具编排扩大交互计算；post-training reasoning 通过 SFT/RL 把成功行为内化到模型参数。
- 形式化视角：把 agentic reasoning 建模为带内部推理变量 \(z_t\)、外部动作 \(a_t\)、记忆状态 \(m_t\) 的 POMDP / Dec-POMDP 控制问题。
- 评测覆盖：论文梳理数学/代码、科学发现、具身智能、医疗、Web、通用工具调用、多智能体环境等 benchmark，而非只评测封闭问答准确率。

#### 🔬 深入细节

![Agentic Reasoning 总览图](https://github.com/weitianxin/Awesome-Agentic-Reasoning/raw/main/figs/overview.png)
*图：论文项目仓库中的 Agentic Reasoning 总览。框架把基础推理、自演化推理、多智能体推理，以及应用/基准统一到“从任务到未来任务泛化”的智能体循环中。*

这篇论文是综述型方法论，不是提出一个单独可训练模型。它的贡献在于把过去分散的 ReAct、Toolformer、Tree-of-Thoughts、Reflexion、Agent Memory、多智能体协作和 agentic RL 等工作，组织成同一个“推理即交互控制”的框架。传统 LLM reasoning 往往被看作静态输入上的一次或少数几次前向生成；Agentic Reasoning 则强调 scaling test-time interaction：模型通过行动获取新观察，通过工具改变环境，通过记忆保留历史，通过反馈修正策略。

论文给出一个控制论式形式化。环境可看作部分可观测马尔可夫决策过程，并额外引入内部推理变量 \(z_t\)：

$$
\langle \mathcal{X}, \mathcal{O}, \mathcal{A}, \mathcal{Z}, \mathcal{M}, \mathcal{T}, \Omega, \mathcal{R}, \gamma \rangle
$$

其中 \(\mathcal{X}\) 是不可直接观测的环境状态，\(\mathcal{O}\) 是观察空间，\(\mathcal{A}\) 是外部动作空间，\(\mathcal{Z}\) 是内部推理轨迹空间，\(\mathcal{M}\) 是记忆或上下文状态。关键分解是把策略拆成“先想、再做”：

$$
\pi_\theta(z_t, a_t \mid h_t)
= \pi_{\text{reason}}(z_t \mid h_t)\cdot \pi_{\text{exec}}(a_t \mid h_t, z_t)
$$

这里 \(h_t=(o_{\le t},z_{<t},a_{<t})\) 表示到当前时刻的观察、内部推理和动作历史。这个分解解释了为什么 Agentic Reasoning 不等同于普通 CoT：CoT 主要产生 \(z_t\)，但 agent 还必须把 \(z_t\) 转化为可执行动作 \(a_t\)，并接收环境返回继续修正。

```python
# Agentic Reasoning 的统一控制循环伪代码

def agentic_reasoning(task, agent, env, memory, max_steps):
    observation = env.reset(task)

    for t in range(max_steps):
        context = memory.retrieve(task, observation)

        # 内部推理：感知、规划、验证、选择工具或协作对象
        thought = agent.reason(
            task=task,
            observation=observation,
            memory=context,
            modes=["plan", "tool_select", "search", "verify"]
        )

        # 外部行动：调用工具、执行代码、检索网页、与其他 agent 通信或提交答案
        action = agent.act(thought)
        new_observation, reward, done, info = env.step(action)

        # 反馈与记忆：把执行错误、奖励、验证结果、经验摘要写回系统状态
        feedback = agent.reflect(thought, action, new_observation, reward, info)
        memory.update(observation, thought, action, feedback)

        observation = new_observation
        if done or agent.verified_success(feedback):
            break

    return agent.finalize(memory)
```

在基础单智能体层，论文把 planning、tool use 和 search 视为三种最小能力。Planning 负责把目标分解成可执行阶段，例如 workflow design、tree search、process formalization、decomposition、external aid / tool use，以及 post-training planning 中的 reward design / optimal control。Tool use 解决“何时用工具、选哪个工具、如何生成合法调用”的问题，覆盖 in-context tool integration、post-training tool integration 和 orchestration-based tool integration。Search / RAG 则让 agent 不只依赖参数知识，而能动态检索网页、代码库、知识图谱或记忆库。

> 💡 关键：ReAct 是 Agentic Reasoning 的早期父类思想，因为它把 reasoning 与 acting 交替起来；这篇综述进一步把 ReAct 扩展到记忆、反馈、自演化、多智能体和 post-training 优化层面。

在 in-context reasoning 中，模型参数 \(\theta\) 固定，系统通过搜索内部推理轨迹来改善行为。论文把这类方法写成对推理轨迹的搜索：

$$
\tau^\star \in \arg\max_{\tau}\sum_t \hat{v}_\phi(u_t)
$$

其中 \(u_t\) 是由历史与中间想法构成的搜索节点，\(\hat{v}_\phi\) 是启发式评估器、验证器或环境反馈。Tree-of-Thoughts、MCTS 风格 agentic search、beam search、自我验证和工具调用工作流都可放进这个框架。它们不改变模型权重，而是在测试时扩展行动空间和搜索空间。

post-training reasoning 则把成功的推理与动作模式写入参数。论文用 GRPO 类目标说明这一方向：给定同一 prompt 的一组输出 \(\{y_i\}_{i=1}^G\)，根据组内相对奖励构造优势：

$$
\hat{A}_i=\frac{r_i-\mu}{\sigma+\delta},\quad
\mu=\frac{1}{G}\sum_{j=1}^G r_j,
\quad
\sigma=\sqrt{\frac{1}{G}\sum_{j=1}^G(r_j-\mu)^2}
$$

再用裁剪比率和 KL 约束优化策略。直觉是：in-context 方法把推理能力外显为工作流，post-training 方法则把有效工作流压回模型行为分布，使模型更稳定地规划、调用工具和处理长期奖励。

自演化层的核心是跨 episode 更新系统状态，而不只在单个任务里做推理。论文把可演化状态记为 \(\mathcal{S}_k\)，例如反思文本、工具库、技能代码、记忆库或 agent 架构；每轮交互后的更新可写成：

$$
\mathcal{S}_{k+1} \leftarrow U(\mathcal{S}_k, \tau_k, \mathcal{F}_k)
$$

其中 \(\tau_k\) 是第 \(k\) 轮轨迹，\(\mathcal{F}_k\) 是环境反馈、奖励、错误日志或用户评价。Reflexion 类型方法更新文字经验，Voyager 类型方法扩展技能库，Memory-R1 / MemAgent 类型方法把记忆读写本身作为可学习策略，AlphaEvolve 类型方法甚至把代码和算法结构当作演化对象。

多智能体层把单个 agent 的推理扩展到 Dec-POMDP。多个 agent 拥有不同观察、角色和通信消息，一个 agent 的外部动作可能成为另一个 agent 的提示，从而触发新的内部推理链。论文强调这不只是“多个模型一起聊天”，而是机制设计问题：如何分配 manager、worker、critic、memory keeper 等角色，如何限制通信开销，如何共享或隔离记忆，以及如何让局部推理对齐全局目标。

与传统 LLM reasoning 相比，Agentic Reasoning 的边界更宽：它关心的不只是答案是否正确，还关心系统是否能在动态网页、代码仓库、机器人环境、临床信息流和多智能体游戏中持续观察、决策、验证和学习。因此论文的 benchmark 讨论覆盖 WebArena、Mind2Web、ALFWorld、AgentBench、MultiAgentBench、ScienceAgentBench、MLAgentBench、医疗 agent benchmark 等，强调评测指标应包含任务完成率、动作有效性、约束满足、反馈利用、长期一致性和协作质量。

```yaml
question: "在 Agentic Reasoning 的形式化中，为什么要把策略分解为 π_reason(z_t|h_t) 和 π_exec(a_t|h_t,z_t)？"
options:
  - "为了让模型只输出隐藏推理，不再执行外部动作"
  - "为了区分内部思考轨迹与外部行动，刻画先推理再交互的 agent 行为"
  - "为了把所有智能体系统简化成一次性文本分类任务"
  - "为了避免使用记忆、反馈和环境观察"
answer: 1
explain: "该分解体现 Agentic Reasoning 的核心：内部推理 z_t 先组织计划和判断，外部动作 a_t 再与工具或环境交互，并把反馈带回后续循环。"
```
