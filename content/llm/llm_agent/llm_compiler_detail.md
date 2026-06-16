### LLM Compiler：LLM编译器 (LLM Compiler)

```yaml
id: llm_compiler
name: LLM Compiler
full_name: LLM编译器 (LLM Compiler)
year: 2024
org: Meta AI
paper_url: https://openreview.net/forum?id=uQ2FUoFjnF
category: tool_use
parent: toolllm
motivation: 并行函数调用架构降低多工具延迟
```

#### 📝 一句话总结
LLMCompiler 提出一种面向多工具调用的“编译器式”执行框架，把用户问题编译成带依赖关系的任务 DAG，再按依赖并行调度函数调用，解决 ReAct 式逐步思考-调用带来的高延迟、高成本和中间观测干扰问题。

#### 🎯 核心要点
- 三段式架构：Function Calling Planner 负责任务分解与依赖生成，Task Fetching Unit 负责就绪任务调度与变量替换，Executor 负责异步并行执行工具。
- 关键表示：把自然语言请求转成形如 `$1 = search(...)`、`$3 = math($1 / $2)` 的任务列表，本质上是一个带占位变量的有向无环图。
- 并行策略：独立任务立即并行执行，依赖任务等待前驱结果回填后再触发，整体延迟由关键路径而不是任务总数决定。
- 流式 Planner：Planner 可以边生成任务边发送给调度单元，避免等待完整计划生成后才开始执行。
- 动态重规划：当执行结果决定后续分支时，Executor 可把中间结果反馈给 Planner，重新生成下一阶段任务图。
- 兼容性：只要求用户提供工具定义和可选 in-context 示例，可用于闭源 GPT 系列和开源 LLaMA 系列。
- 实验覆盖：HotpotQA、Movie Recommendation、ParallelQA、Game of 24、WebShop 等多种函数调用依赖模式。

#### 🔬 深入细节

![LLMCompiler 框架示意图](https://raw.githubusercontent.com/SqueezeAILab/LLMCompiler/main/figs/thumbnail.png)
*图：官方仓库中的 LLMCompiler 总览图，展示 Planner 将问题拆成任务图、调度器按依赖发射任务、Executor 并行执行工具的整体流程。*

LLMCompiler 的出发点是：多工具调用并不一定必须像 ReAct 那样“想一步、调一个工具、把结果塞回 prompt、再想下一步”。例如“比较 Microsoft 和 Apple 市值差距”这类问题，两个搜索调用彼此独立，只有后续数学运算依赖二者结果。如果强制顺序执行，延迟近似为每个工具延迟与每次 LLM 思考延迟之和；如果先显式建模依赖图，就可以让独立搜索并行发生，只在真正的数据依赖处同步。

论文把这种过程类比为传统编译器优化。程序编译器会识别指令之间的数据依赖，尽量并行化独立指令；LLMCompiler 则把自然语言任务“编译”为函数调用任务图。形式化地，可把 Planner 输出记为一个 DAG：

$$
G=(V,E), \quad v_i=(tool_i, args_i), \quad (v_j, v_i)\in E \Rightarrow args_i \text{ 依赖 } output_j
$$

任意时刻的可执行任务集合是：

$$
R_t=\{v_i\in V \mid \forall (v_j,v_i)\in E,\; output_j \text{ 已完成}\}
$$

Task Fetching Unit 每轮贪心取出 \(R_t\) 中的任务，替换参数中的占位变量，再交给 Executor 并行执行。于是系统延迟从顺序执行的 \(T_{seq}\approx\sum_i T(v_i)+nT_{LLM}\) 变为近似关键路径延迟 \(T_{dag}\approx T_{plan}+\max_{path\in G}\sum_{v_i\in path}T(v_i)\)。这也是它能在高度可并行问题上明显降低延迟和成本的核心原因。

```python
# LLMCompiler 核心执行伪代码

def llm_compiler(user_query, tool_defs, planner_examples=None):
    # 1. Planner: 用 LLM 生成带依赖的任务列表
    # 例：$1 = search("Microsoft market cap")
    #    $2 = search("Apple market cap")
    #    $3 = math("$1 / $2")
    task_dag = planner_llm.generate_dag(
        query=user_query,
        tools=tool_defs,
        examples=planner_examples,
        syntax="indexed_tasks_with_placeholders",
    )

    memory = {}          # task_id -> tool output
    running = set()
    finished = set()

    while not task_dag.all_done():
        ready = []
        for task in task_dag.tasks:
            if task.id in finished or task.id in running:
                continue
            if all(dep in finished for dep in task.dependencies):
                # 2. TFU: 将 $dep 占位符替换成真实工具输出
                task.args = substitute_placeholders(task.args, memory)
                ready.append(task)

        # 3. Executor: 所有就绪任务异步并行执行
        futures = [executor.submit(task.tool, task.args) for task in ready]
        running.update(task.id for task in ready)

        for task, result in wait_any_or_all(ready, futures):
            memory[task.id] = result
            running.remove(task.id)
            finished.add(task.id)

        # 4. 动态重规划：如果工具结果暴露出新分支，则回到 Planner
        if needs_replanning(memory):
            new_tasks = planner_llm.replan(user_query, memory, tool_defs)
            task_dag.extend(new_tasks)

    return final_answer_llm(user_query, memory)
```

Planner 的难点不在“调用 LLM”，而在让 LLM 输出一个可执行的中间表示。论文使用预定义 prompt 约束语法：每个任务都有编号、工具名、参数，参数中可以引用前面任务的编号作为占位符。这样，依赖关系不需要另写邻接表，TFU 只要扫描参数里的 `$1`、`$2` 等引用就能知道任务何时可运行。用户只需提供工具定义和可选示例，类似函数签名加少量“如何拆任务”的 few-shot 样例。

Task Fetching Unit 是 LLMCompiler 中最像系统组件的部分：它不需要 LLM 推理，只做依赖解析、队列调度和变量替换。它采用贪心策略，一旦某个任务所有前驱都完成就立刻发射给 Executor；如果 Planner 启用流式输出，TFU 甚至不必等待完整 DAG 生成。这个设计把“规划开销”与“工具执行开销”重叠起来，类似 CPU 指令流水线，用后续任务生成时间掩盖已经就绪工具的执行时间。

Executor 则把每个工具调用视为独立任务运行，并为任务保留独立 memory。与 ReAct 把每次 observation 都拼回同一个长 prompt 不同，LLMCompiler 只把必要的前驱输出注入后继参数，减少无关中间结果对后续推理的干扰。这解释了论文中不仅看到延迟下降，还观察到部分任务准确率提升：错误循环、重复调用、基于局部 observation 过早停止等 ReAct 常见失败会被显式 DAG 执行部分缓解。

动态重规划补足了静态 DAG 的边界。有些任务像简单搜索-计算可以一次性编译；但 Game of 24 或交互式 WebShop 这类任务，下一步取决于中间状态。LLMCompiler 的做法不是放弃并行，而是在必要时把 Executor 的结果反馈给 Planner，生成下一段任务图。这相当于运行时重新编译：静态可知的部分尽量并行，不可知的分支在结果出现后再规划。

与 ReAct 相比，LLMCompiler 的核心差异是把“推理轨迹”变成“执行计划”。ReAct 的优势是灵活，每一步都能看见上一步结果；代价是每个工具调用都需要一次新的 LLM 决策，且 prompt 越滚越长。LLMCompiler 假设许多函数调用依赖可以提前抽取，于是把 LLM 的主要职责前移到 Planner，后续执行尽量交给确定性的调度器和异步工具系统。这种设计尤其适合搜索、数据库查询、API 聚合、批量分析等天然存在独立子任务的 agent 场景。

> 💡 关键：LLMCompiler 并不是让模型“更会调用单个工具”，而是让系统“更会安排多个工具调用的执行顺序”。它优化的是 agent 运行时的依赖图和关键路径。

#### 🧪 练习题
```yaml
question: "LLMCompiler 相比 ReAct 降低多工具调用延迟的最核心机制是什么？"
options:
  - "把所有工具调用都替换成一个更大的 LLM 调用"
  - "先生成带依赖关系的任务图，并并行执行互不依赖的工具调用"
  - "禁止模型读取任何中间工具结果"
  - "只使用闭源模型的并行 function calling API"
answer: 1
explain: "LLMCompiler 的关键是 Planner 生成任务 DAG，TFU/Executor 根据依赖并行调度就绪任务，使总延迟更接近关键路径而不是顺序路径。"
```
