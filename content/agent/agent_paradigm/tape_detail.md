### TAPE: 工具引导自适应规划与约束执行 (TAPE)

```yaml
id: tape
name: TAPE
full_name: 工具引导自适应规划与约束执行 (TAPE)
year: '2026.02'
org: University of Wisconsin-Madison
paper_url: https://arxiv.org/abs/2602.19633
category: closed_loop
parent: plan_and_act
motivation: 求解器选可行路径并约束解码执行
```

#### 📝 一句话总结
TAPE 把工具调用规划改写成受约束的可行路径搜索问题，再在生成动作时施加 constrained decoding，保证 LLM 实际输出的调用序列不偏离求解器选出的计划，从而显著降低多工具链路里的级联错误。

#### 🎯 核心要点
- 框架分三段：Plan Graph Construction、Planning Solver、Constrained Execution。
- 先从 LM 给出的多条候选推理路径中抽取工具依赖，构造成带类型和前置约束的 plan graph。
- 再由求解器在图上筛选满足约束的可行执行路径，而不是直接相信 LLM 原始规划文本。
- 最后在动作生成阶段做 constrained decoding，屏蔽与选定计划冲突的 token 或调用。
- 目标场景是多工具、强约束函数调用；论文在 BFCL V3 上给出 53.7% 准确率，相比 ReAct 的 42.8% 有明显提升。
- 核心思想不是“让 LLM 更会计划”，而是把可靠性关键部分外包给显式约束求解与执行约束。

#### 🔬 深入细节
![TAPE 框架图](https://ar5iv.labs.arxiv.org/html/2602.19633/assets/x1.png)
*图：TAPE 先构建 plan graph，再由 planning solver 选择可行路径，最后用 constrained execution 约束实际解码。*

```python
# TAPE 的三阶段执行流程
paths = lm.sample_reasoning_paths(query, tool_specs)
plan_graph = build_plan_graph(paths, tool_specs)
feasible_plan = planning_solver(plan_graph)

for step in feasible_plan:
    action = constrained_decode(
        model=lm,
        allowed_schema=step.schema,
        allowed_tools=step.tools,
        allowed_dependencies=step.dependencies,
    )
    obs = execute(action)
    if violates_runtime_constraints(obs):
        feasible_plan = planning_solver(update_graph(plan_graph, obs))
```

TAPE 的问题设定非常工程化：在复杂工具调用任务里，LLM 往往不是完全不会推理，而是经常在“哪一步该先调哪个工具、参数是否满足类型约束、某个结果是否必须先由前一步产出”这些地方犯错。一旦前面一步调用顺序错了，后面即使语言描述看起来合理，也会因为依赖没满足而整体失败。论文因此把重点从“提升推理自然度”转向“保证执行可行性”。

第一步是 plan graph construction。模型可以给出多条候选 reasoning path，但这些路径本身不直接执行，而是被解析成图结构：节点表示待执行的工具调用或中间变量，边表示输入输出依赖、参数类型约束和先后顺序。这样做的意义在于，原本埋在自然语言里的隐式依赖被显式抽取出来，后续就可以交给传统求解器处理。

第二步是 planning solver。求解器的任务不是生成语言，而是在图里找出满足约束的 feasible path。它会综合考虑工具的输入输出兼容性、依赖是否已满足、以及整体路径是否能完成目标。这一步相当于把“规划正确性”从 LLM 的软约束，提升成一个可以被验证的硬约束过程。也正因如此，TAPE 不是简单的 plan-and-execute，而是 solver-in-the-loop 的 planning。

第三步是 constrained execution，也是这篇论文最关键的一环。很多方法即使拿到了高质量计划，最后仍可能在 token 级别偏航，生成了计划外工具名、错误参数或不合法结构。TAPE 在解码时显式限制可生成的动作空间，只允许与当前计划节点兼容的工具和参数形式出现。于是“计划对了但执行走歪”的问题被压住了，规划和执行之间的缝隙被补上。

与 ReAct 相比，TAPE 并不是把 thought/action 循环做得更长，而是把其中最脆弱的部分形式化；与 Plan-and-Act 相比，TAPE 更强调“计划可行性”和“执行不越轨”，适合工具链依赖和 schema 约束都很强的函数调用场景。它代表的是 agent 里一个很清楚的方向：在工具使用问题上，可靠性往往来自 constraint-aware orchestration，而不是更自由的语言推理。

> 💡 关键：TAPE 的收益来自两次约束注入, 一次在求解阶段筛可行计划，一次在解码阶段防止执行偏航。

#### 🧪 练习题
```yaml
question: "TAPE 中 constrained execution 的直接目的是什么？"
options:
  - "提高 world model 的模拟精度"
  - "把多个候选计划合并成一棵搜索树"
  - "限制生成动作只能落在已求得的可行计划允许范围内"
  - "让 LLM 自动学习新的工具 schema"
answer: 2
explain: "TAPE 不只求可行计划，还在执行时约束解码，让模型不能随意生成计划外工具或参数，从而减少级联错误。"
```
