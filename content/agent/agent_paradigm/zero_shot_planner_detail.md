### Zero-Shot Planner: 零样本规划器 (Language Models as Zero-Shot Planners)

```yaml
id: zero_shot_planner
name: Zero-Shot Planner
full_name: 零样本规划器 (Language Models as Zero-Shot Planners)
year: "2022.01"
org: "UC Berkeley"
paper_url: "https://arxiv.org/abs/2201.07207"
category: "foundation"
parent: "—"
motivation: "首次把LLM直接用于高层任务分解"
```

#### 📝 一句话总结
Zero-Shot Planner 证明了大语言模型即使不做任务专门训练，也能直接把自然语言目标分解成一串可执行高层动作，并通过动作翻译与迭代重规划，把预训练语言知识转成具身任务中的 planning prior。

#### 🎯 核心要点
- 核心目标是把预训练语言模型中的常识顺序知识直接拿来做 embodied planning，而不是重新训练任务专用策略。
- 规划流程分三步：LM 先生成自由文本计划，再把自然语言步骤翻译成环境允许的动作集合，最后按执行反馈迭代重规划。
- 使用“admissible actions”约束，解决 LM 输出自由文本与机器人/模拟器动作空间不一致的问题。
- 通过 prompt 工程让模型学会把长目标拆成短步骤，例如“找到锅、打开炉子、加热”等高层动作序列。
- 在虚拟家务与机器人操作场景中验证，说明语言模型对“动作顺序”的世界知识可直接迁移到 planning。
- 论文的重要意义不在精细控制，而在首次把 LLM 当成高层 planner，而不是只当问答模型或文本生成器。

#### 🔬 深入细节
![Zero-Shot Planner 框架图](https://ar5iv.labs.arxiv.org/html/2201.07207/assets/x1.png)
*图：论文展示了从自然语言目标到高层文本计划、再到可执行动作序列的整体链路。*

```python
# Zero-Shot Planner 的抽象流程
goal = task_description
history = []

while not task_finished(goal, history):
    # 1) 让语言模型直接生成下一段高层计划
    free_form_plan = llm.plan(goal, history)

    # 2) 把自由文本步骤翻译到环境允许动作
    action_seq = translate_to_admissible_actions(free_form_plan, action_set)

    # 3) 执行动作并记录反馈
    for action in action_seq:
        obs = env.step(action)
        history.append((action, obs))
        if needs_replan(obs):
            break
```

Zero-Shot Planner 的出发点非常朴素：大语言模型在海量文本里已经见过“做一顿饭”“清理桌面”“把东西收纳好”这类任务的常见步骤顺序，因此它天然拥有某种高层 planning prior。论文问的不是“能不能让 LM 学会控制机器人”，而是“能不能先把它当成一个零样本的高层规划器”，把这种顺序知识直接抽出来。

具体做法上，模型先根据任务描述输出自由形式的文本计划，例如 “walk to the kitchen, find the pot, turn on the stove”。这一步不要求动作必须严格符合环境 API，因此生成更自然、更接近语言模型原本擅长的分解方式。随后系统再把这些自由文本步骤映射到环境允许的 admissible actions，解决语言空间与动作空间之间的接口问题。

真正让它成为 agent 范式起点的，是“先规划、再翻译、再按反馈重规划”这条链路。它虽然还没有 ReAct 那样完整的 thought-action-observation 闭环，也没有后来的树搜索、反思、工作记忆，但已经把 LLM 明确放进了 agent 控制栈的最上层，让模型负责“决定先做什么、后做什么”。

从后续演化看，Inner Monologue 把环境反馈写回语言回路，ReAct 把推理与行动交错起来，RAP/LATS 则进一步引入搜索。Zero-Shot Planner 的历史价值就在这里：它是“LLM 做高层规划”这条主线的第一块地基。

> 💡 关键：论文关注的是 high-level planning，不是 low-level control；LM 输出的是“步骤顺序知识”，不是电机级动作。

> ⚠️ 注意：由于自由文本计划仍需动作翻译，这一方法很依赖 action grounding 的质量；如果翻译错误，LM 的高层计划再合理也无法可靠落地。

#### 🧪 练习题
```yaml
question: "Zero-Shot Planner 相比后来的 ReAct，最核心的定位差异是什么？"
options:
  - "它主要解决低层运动控制，而不是高层规划"
  - "它先生成高层文本计划，再做动作翻译，还没有完整的交错式行动闭环"
  - "它依赖大规模强化学习训练后才能规划"
  - "它完全不使用自然语言，而是直接生成 PDDL"
answer: 1
explain: "Zero-Shot Planner 的关键贡献是把 LLM 当作零样本高层 planner；它先产出自由文本计划，再翻译成可执行动作，尚未发展成 ReAct 式的交错闭环。"
```
