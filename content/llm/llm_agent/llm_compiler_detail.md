### LLM编译器 (LLM Compiler)

```yaml
id: llm_compiler
name: LLM Compiler
full_name: LLM编译器 (LLM Compiler)
year: '2024'
org: Meta AI
paper_url: https://openreview.net/forum?id=uQ2FUoFjnF
category: tool_use
parent: toolllm
motivation: 并行函数调用架构降低多工具延迟
```

#### 📝 一句话总结

LLMCompiler 把多工具调用看成可编译执行计划，先由 Planner 生成带依赖关系的函数调用图，再由 Task Fetching Unit 和 Executor 并行调度，降低 ReAct 式串行调用的延迟和成本。

#### 🎯 核心要点

- **编译器式三组件架构**：Function Calling Planner、Task Fetching Unit、Executor
- **显式执行计划**：Planner 输出编号任务、工具调用和依赖引用，而不是一步一步边想边做
- **流式任务获取**：Task Fetching Unit 可在 Planner 尚未完整输出时解析并派发已就绪任务
- **并行执行器**：对无依赖或依赖已满足的工具调用并发运行，减少等待时间
- **变量引用机制**：后续任务可用 `$1`、`$2` 等引用前置工具结果，表达数据依赖
- **模型无关**：可用于闭源 GPT 模型和开源 LLaMA 类模型
- **实证收益**：论文在多类函数调用任务上报告最高约 3.7x 延迟加速、6.7x 成本节省和约 9% 准确率提升

#### 🔬 深入细节

##### 核心示意图

![LLMCompiler 架构图](https://raw.githubusercontent.com/SqueezeAILab/LLMCompiler/main/figs/thumbnail.png)
*图：LLMCompiler 项目 README 中的系统缩略图，展示 Planner、Task Fetching Unit 与并行 Executor 的协作。图源：官方 GitHub。*

##### 算法伪代码

```python
# LLMCompiler 并行函数调用伪代码
def llm_compiler(query, tools, examples):
    plan_stream = planner.stream_generate(query, tools, examples)
    task_table = {}
    futures = {}

    for task in task_fetching_unit(plan_stream):
        task_table[task.id] = task

        def submit_when_ready(task):
            deps = task.dependencies  # e.g. [1, 2] from $1, $2
            wait([futures[d] for d in deps])
            resolved_args = resolve_refs(task.args, futures)
            return executor.submit(task.tool_name, resolved_args)

        if dependencies_available(task, futures):
            futures[task.id] = executor.submit(task.tool_name, task.args)
        else:
            futures[task.id] = submit_when_ready(task)

    results = {task_id: future.result() for task_id, future in futures.items()}
    return joiner.generate_answer(query, task_table, results)
```

##### 方法解读

ReAct 的典型执行方式是“思考一步、调用一个工具、观察结果、再思考下一步”。这种方式简单稳健，但当任务包含多个相互独立的函数调用时会产生不必要的串行等待。例如同时查询几部电影信息或多个事实证据时，ReAct 仍然按轮次逐个调用，延迟约等于所有调用耗时之和。

LLMCompiler 借鉴传统编译器思想，把 LLM 输出从自然语言轨迹提升为可执行计划。Planner 生成一组任务 \(T=\{t_i\}\)，每个任务包含工具名、参数和依赖集合 \(D_i\)。若 \(D_i=\varnothing\)，任务可以立即执行；若 \(D_i\neq\varnothing\)，则等待依赖任务结果填充后再执行。这样系统从“逐步解释执行”变为“先编译任务图，再调度执行”。

Task Fetching Unit 的流式设计进一步减少等待。它不必等 Planner 输出完整计划，而是边读 token 边解析出可执行任务。只要一个任务的工具名和参数完整，且依赖已满足，就能交给 Executor。这个机制把 Planner 生成时间和工具执行时间重叠起来。

Executor 负责并行运行工具调用，并把结果绑定到任务编号。后续任务通过 `$1`、`$2` 这样的变量引用前置结果，类似编译器中间表示的 SSA 值引用。最终 Joiner 或 LLM 根据原始问题、执行计划和工具返回结果生成最终答案。

与 ToolLLM 侧重训练模型掌握大量 API 不同，LLMCompiler 主要改造推理时的调用架构。它适合依赖结构清晰、工具调用可并行的任务；若任务天然需要上一步观察才能决定下一步行动，LLMCompiler 仍需退化为带依赖的顺序执行。

> 💡 关键：LLMCompiler 把“工具调用轨迹”转成“依赖图调度问题”，性能提升来自发现并行性，而不是让单次工具调用变快。

#### 🧪 练习题

```yaml
question: "LLMCompiler 降低多工具任务延迟的核心机制是什么？"
options:
  - "把所有工具结果预先写入模型参数"
  - "让 Planner 生成带依赖的任务图，并并行执行无依赖函数调用"
  - "只保留第一个工具调用，跳过后续调用"
  - "用更大的 LLM 替代所有外部工具"
answer: 1
explain: "LLMCompiler 显式解析任务依赖，无依赖或依赖已满足的调用可并行运行，因此减少 ReAct 式串行等待。"
```
