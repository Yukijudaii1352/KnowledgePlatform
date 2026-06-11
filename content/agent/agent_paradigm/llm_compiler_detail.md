### LLMCompiler: 并行函数调用编译器 (LLMCompiler)

```yaml
id: llm_compiler
name: LLMCompiler
full_name: 并行函数调用编译器 (LLMCompiler)
year: '2023.12'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2312.04511
category: decomposition
parent: rewoo
motivation: 将工具调用编译成并行执行图
```

#### 📝 一句话总结
LLMCompiler 借鉴经典编译器原理，通过将 LLM 的多函数调用规划为有向无环依赖图（DAG）并并行执行，解决了传统 ReAct 模式串行推理-行动导致的高延迟、高成本和误差累积问题，实现最高 3.7× 加速和 ~9% 准确率提升。

#### 🎯 核心要点
- 三组件架构：Function Calling Planner（规划器）制定调用计划与依赖关系，Task Fetching Unit（任务分发器）管理依赖图的状态与调度，Executor（执行器）并行执行无依赖冲突的任务
- 依赖图（DAG）自动推导：Planner 一次生成调用计划，标注工具间的 `$var` 符号变量依赖，形成并行执行拓扑
- Task Fetching Unit 实现非阻塞调度：每当一个任务完成、变量被填充，立即释放所有依赖该变量的后续任务，类似操作系统的动态任务调度
- 支持开源与闭源 LLM，无需额外微调，Planner 依赖 LLM 原生推理能力，通过精心设计的提示模板生成结构化输出
- 与 ReAct 相比，在 HotpotQA、Movie Recommendation、ParallelQA 等场景下：延迟降低最高 3.7×，成本节省最高 6.7×，准确率提升最高 ~9%
- 开源代码与基准：https://github.com/SqueezeAILab/LLMCompiler

#### 🔬 深入细节
##### 1. 动机与背景

传统 ReAct 模式（Reasoning + Acting）将 LLM 的函数调用组织为顺序链：规划一步 → 执行一步 → 观察结果 → 再规划。这种串行模式的问题有三：(1) **高延迟**——每次推理和工具调用串行等待；(2) **高成本**——每步都需调用 LLM 生成完整推理链（包含下一次的工具调用说明）；(3) **误差累积**——前一步的错误可能通过推理链传播，且冗长的上下文稀释注意力。

LLMCompiler 的核心洞察是：**多函数调用场景中的大多数独立工具调用天然可并行**，正如经典编译器通过数据流分析发掘指令级并行性。LLMCompiler 将 LLM 的函数调用计划“编译”为依赖图，由 Task Fetching Unit 按拓扑顺序非阻塞地分发任务，Executor 并行落地。

##### 2. 核心架构与流程

![LLMCompiler 架构对比图](https://raw.githubusercontent.com/SqueezeAILab/LLMCompiler/main/figs/thumbnail.png)
*图：LLMCompiler（右）与 ReAct（左）的运行时对比。LLMCompiler 中 Planner 一次性生成任务依赖图，独立任务并行执行。*

LLMCompiler 由三个核心单元协同工作：

**① Function Calling Planner（函数调用规划器）**

输入用户查询和可用工具定义，Planner 一次性生成包含以下信息的结构化调用计划：

- 任务列表：分解后的子任务，每个子任务对应一次工具调用，参数可引用前置任务的输出（用 `$task_id` 语法）
- 依赖关系：显式标注每个任务的输入依赖，构成 DAG
- 最终合并器（Joiner）：在所有任务完成后，由 LLM 合成最终答案

> 💡 关键：Planner **只调用一次 LLM**，生成整张 DAG，而非如 ReAct 逐轮调用。Prompt 模板指导 LLM 输出严格遵循 JSON/结构化 schema，包含 `task_id`、`function_name`、`arguments`、`depends_on` 等字段。

**② Task Fetching Unit（任务分发单元）**

该组件是调度的核心引擎，持续追踪每项任务的状态（等待/就绪/执行中/完成）：

- 初始化时扫描任务列表，将无未满足依赖的任务标记为 `ready`
- 每当 Executor 返回一个任务结果，Fetching Unit 遍历依赖图，将结果中的变量值替换到所有下游任务的参数中，解除依赖
- 一旦某任务的 `depends_on` 全部满足，立即将其放入就绪队列

> ⚠️ 注意：Task Fetching Unit 完全在 LLM 外部运行（传统代码逻辑），不消耗 LLM token。它只做符号级别的变量替换（`$1.title` → `"Inception"`），零推理开销。

**③ Executor（执行器）**

从就绪队列中取出任务，并发调用对应的工具函数。由于同一批次内的任务无依赖，它们可以被线程池/异步并行执行。完成后将结果回传给 Fetching Unit。

##### 3. 算法伪代码

```python
# LLMCompiler 核心执行流程
def llm_compiler(query, tools):
    # 第1步：Planner 生成依赖图 DAG
    plan = planner(query, tools)
    # plan = {"tasks": [...], "joiner": {...}}
    
    # 初始化
    task_states = {}       # 任务状态表
    variable_store = {}    # 变量值存储
    ready_queue = deque()  # 就绪队列
    
    # 第2步：扫描初始无依赖任务
    for task in plan.tasks:
        task_states[task.id] = "pending"
        if not task.depends_on:
            ready_queue.append(task)
    
    # 第3步：调度循环
    while ready_queue or any(t.state in ["pending", "running"] for t in plan.tasks):
        # 并行执行所有就绪任务
        batch = [ready_queue.popleft() for _ in range(len(ready_queue))]
        results = parallel_execute(batch)
        
        # 回传结果，更新变量表
        for task_id, result in results.items():
            variable_store[f"${task_id}"] = result
            task_states[task_id] = "completed"
        
        # 解除下游依赖，扫描新就绪任务
        for task in plan.tasks:
            if task_states[task.id] == "pending":
                if all(dep in variable_store for dep in task.depends_on):
                    # 替换符号变量为实际值
                    task.args = substitute(task.args, variable_store)
                    ready_queue.append(task)
                    task_states[task.id] = "running"
    
    # 第4步：Joiner 合成最终输出
    return joiner(query, variable_store, plan.joiner)
```

##### 4. 与传统方法的关键区别

| 维度 | ReAct | LLMCompiler |
|------|-------|-------------|
| 规划方式 | 串行，每步规划下一个动作 | 一次性编译全图 |
| LLM 调用次数 | N 次（N = 工具调用步数） | Planner 1 次 + Joiner 1 次 |
| 执行模式 | 串行 | 最大并行度 |
| 调度逻辑 | LLM 隐式推理 | Task Fetching Unit 显式状态机 |
| 依赖性分析 | 利用 LLM 推理自然语言 | 结构化 `depends_on` 字段 |
| token 消耗 | 高（每步含历史） | 低（一次规划轻量化） |

##### 5. 关键实验结果

在 HotpotQA（多跳问答）、Movie Recommendation（电影推荐）和 ParallelQA（并行问答）等基准上：

- **延迟**：LLMCompiler 相比 ReAct 加速最高 **3.7×**（由于并行消除了工具的串行等待）
- **成本**：token 消耗节省最高 **6.7×**（消灭了 ReAct 中多轮 LLM 推理的成本）
- **准确率**：最高提升 **~9%**（并行执行减少了中间错误传播和长上下文的注意力分散）

> 💡 关键洞察：LLMCompiler 的性能增益直接与任务图的可并行度（max DAG width）成正比——工具调用之间独立性越强，加速比越高。

#### 🧪 练习题
```yaml
question: "LLMCompiler 中 Task Fetching Unit 的核心作用是什么？"
options:
  - "使用 LLM 推理分析工具调用的语义依赖关系"
  - "管理 DAG 依赖图的状态，在任务完成后解除下游依赖并调度就绪任务"
  - "直接执行工具调用并将结果返回给用户"
  - "定期对 Planner 生成的计划进行再优化，调整并行策略"
answer: 1
explain: "Task Fetching Unit 是纯代码逻辑的调度器，负责状态跟踪和符号变量替换，不消耗 LLM token。当一项任务完成并填充变量后，它扫描下游任务、解除依赖、将新就绪任务送入执行队列。"
```
