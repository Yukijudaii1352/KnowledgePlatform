### Agentic Reasoning：把感知、规划、行动和验证统一到智能体推理框架

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

Agentic Reasoning 将 LLM 推理扩展为感知环境、制定计划、调用工具、执行动作并自我验证的闭环组织原则，用于解释和设计更复杂的智能体系统。

#### 🎯 核心要点

- **研究定位**：这是一篇综述式框架论文，梳理 LLM 从链式推理走向智能体推理的关键组件。
- **核心闭环**：感知、记忆、规划、工具使用、行动、反馈和验证共同构成 Agentic Reasoning。
- **三类范式**：基础智能体推理、自进化智能体推理和集体多智能体推理。
- **优化方式**：包括上下文内推理编排、测试时搜索、后训练、强化学习和偏好优化。
- **开放挑战**：长期交互、个性化、世界模型、多智能体训练扩展性和治理安全。

#### 🔬 深入细节

![Agentic Reasoning overview](https://raw.githubusercontent.com/weitianxin/Awesome-Agentic-Reasoning/main/figs/overview.png)

*图源：Agentic Reasoning 论文配套 Awesome-Agentic-Reasoning 仓库，展示智能体推理的组成与分类。*

```python
def agentic_reasoning_loop(goal, environment):
    memory = Memory()
    belief = initialize_belief(goal)

    while not goal_satisfied(goal, belief):
        observation = environment.observe()
        memory.write(observation)
        plan = planner(goal, belief, memory)
        action = select_action(plan, tools=environment.tools)
        result = environment.execute(action)
        verification = verifier(goal, plan, action, result)
        belief = update_belief(belief, observation, action, result, verification)
        if verification.requires_replan:
            plan = repair_plan(plan, verification)

    return produce_answer_or_policy(memory, belief)
```

**方法动机**：Agentic Reasoning 的核心是把推理从静态文本内部过程扩展为环境闭环。传统 CoT 可写成 $y=f(x,r)$，其中 $r$ 是推理文本；智能体推理则需要处理 $s_{t+1}=Env(s_t,a_t)$，模型必须根据观察、动作结果和验证信号持续更新信念。

**基础智能体推理**：基础层面包括计划生成、工具使用、搜索、反思和验证。ReAct 类方法把 reasoning 和 acting 交替出现，是这一范式的早期代表；后续系统进一步加入记忆、检索、代码执行和多模态感知，使推理不再局限于文本空间。

**自进化智能体推理**：自进化范式强调 Agent 能从反馈中改进自身策略，例如通过经验记忆、错误反思、偏好数据、强化学习或测试时搜索提升后续表现。这里的关键变量是反馈 $f_t$ 如何转化为策略更新 $\pi_{t+1}=\mathcal{U}(\pi_t,f_t)$。

**集体智能体推理**：多智能体范式关注角色分工、协商、共享记忆和群体决策。多个 Agent 可以通过专家化提高覆盖面，也可能产生冗余、从众或冲突；因此 Agentic Reasoning 需要同时考虑协作协议和验证机制，而不是简单增加 Agent 数量。

#### 🧪 练习题

```yaml
question: Agentic Reasoning 与普通 CoT 的核心区别是什么？
options:
  - A. 引入环境观察、行动、反馈和验证闭环
  - B. 只把字体变大
  - C. 只训练词向量
  - D. 只做离线翻译
answer: A
explain: Agentic Reasoning 把推理放入环境交互中，模型需要感知、计划、行动并根据反馈修正。
```
