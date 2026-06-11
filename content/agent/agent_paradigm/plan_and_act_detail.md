### Plan-and-Act: 计划并行动 (Plan-and-Act)

```yaml
id: plan_and_act
name: Plan-and-Act
full_name: 计划并行动 (Plan-and-Act)
year: '2025.03'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2503.09572
category: decomposition
parent: adapt
motivation: 显式拆分Planner与Executor两层
```

#### 📝 一句话总结
Plan-and-Act 将长程网页智能体显式拆成 Planner 和 Executor 两层，并用三阶段合成数据管线专门训练规划能力，再配合执行期动态重规划，在 WebArena-Lite 上做到 57.58% 成功率、在文本版 WebVoyager 上做到 81.36%。

#### 🎯 核心要点
- 明确拆分高层 Planner 与底层 Executor，避免单模型同时承担“定策略”和“点按钮”两类负担。
- 提出三阶段合成数据流程：轨迹生成、轨迹到接地计划的反标注、计划扩增，用来规模化制造 planner supervision。
- Planner 生成结构化高层步骤，Executor 只负责把当前步骤翻译成环境动作。
- 执行受阻时触发 dynamic replanning，Planner 基于已完成步骤、当前状态和失败反馈重写剩余计划。
- 论文同时报告 WebArena-Lite 与 text-only WebVoyager 结果，证明分层规划不仅改善长程网页导航，也提升跨环境泛化。
- 官方代码仓库中给出的最新结果是 WebArena-Lite 57.58%、WebVoyager 81.36%，高于早期草稿版本中的数值。

#### 🔬 深入细节
![Plan-and-Act 框架图](https://raw.githubusercontent.com/SqueezeAILab/plan-and-act/main/Plan-And-Act.jpg)
*图：Plan-and-Act 的核心工作流。Planner 先输出高层计划，Executor 逐步执行；若观察到阻塞，再把当前状态回传给 Planner 重规划。*

```python
# Plan-and-Act 的核心推理循环
plan = planner.make_plan(user_query)
completed = []

while not task_done():
    current_step = plan.next_incomplete_step()
    action = executor.act(step=current_step, state=env_state())
    obs = env.step(action)

    if executor.is_blocked(obs):
        plan = planner.replan(
            query=user_query,
            completed_steps=completed,
            current_state=env_state(),
            feedback=obs,
        )
        continue

    if current_step_finished(obs):
        completed.append(current_step)
```

Plan-and-Act 的出发点很直接：现有网页 Agent 往往让同一个 LLM 一边理解用户目标、一边维护全局计划、一边处理具体 DOM/元素操作。这会把“长期策略一致性”和“短期界面反应”混在一个上下文里，任务一长，模型就容易出现计划漂移、步骤遗忘和局部试错过多的问题。论文的核心判断是，这不是单纯 prompt 写得不够好，而是职责没有分离。

因此系统被拆成两个角色。Planner 只回答“接下来应该先做哪几个高层步骤”，输出的是结构化、接地但不含具体点击坐标的计划；Executor 只回答“为了完成当前这一步，现在在页面上该执行什么动作”。这样的分工把 long-horizon reasoning 和 environment-specific control 解耦了。Planner 不需要被 HTML 噪声淹没，Executor 也不用背负全局目标维护。

真正让这篇论文成立的是训练数据问题的解决。作者提出三阶段合成管线：第一阶段先生成成功动作轨迹；第二阶段把成功轨迹反标注成高层计划，使每段动作都对应到“为什么要这么做”的步骤；第三阶段再对已有计划做扩增，补足更丰富的长程规划形态。也就是说，这篇工作的重点不只是“分两层”，而是“专门造 Planner 的监督数据”，让高层计划成为可训练对象，而不是继续把规划能力寄托在通用指令微调的副产物上。

推理时的 dynamic replanning 也很关键。Executor 一旦发现元素找不到、页面状态与计划假设不一致，或者当前步骤无法推进，就把失败反馈、当前网页状态和已完成步骤回传给 Planner。Planner 不是从零重来，而是基于当前进度修订剩余计划。这一点使它和纯 open-loop plan-and-execute 方法区分开，也让它能在真实网页这种高噪声、易偏离的环境里稳定工作。

与 ReAct 相比，Plan-and-Act 不是把思考和操作交错到每一步，而是先显式产出步骤级意图，再让执行层消费这些意图；与 ADaPT 相比，它不是“卡住了再递归分解子任务”，而是默认就维护一份独立的高层计划表示。论文因此把“规划”从 agent prompt engineering 里的隐变量，提升成了一个可单独训练、单独评测、单独重写的模块。

> 💡 关键：这篇工作的真正增益来源，不只是双模型架构本身，而是“把 planner supervision 数据集系统化制造出来”。

#### 🧪 练习题
```yaml
question: "Plan-and-Act 中 dynamic replanning 的直接触发条件是什么？"
options:
  - "每执行一个动作后都固定重规划一次"
  - "Executor 遇到阻塞或观察与原计划假设不一致时，把反馈回传给 Planner"
  - "Planner 发现 token 长度过长时自动压缩计划"
  - "用户修改目标后，Executor 自己改写后续步骤"
answer: 1
explain: "Plan-and-Act 的重规划由执行期失败或状态偏移触发，Executor 将当前状态和失败反馈交给 Planner，由 Planner 修订剩余高层计划。"
```
