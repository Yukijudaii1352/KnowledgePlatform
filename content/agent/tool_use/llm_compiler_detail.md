### LLMCompiler: 并行函数调用编译器 (LLMCompiler)

```yaml
id: llm_compiler
name: LLMCompiler
full_name: 并行函数调用编译器 (LLMCompiler)
year: '2023.12'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2312.04511
category: orchestration
parent: react
motivation: 把串行工具链编译成并行执行图
```

#### 📝 一句话总结
LLMCompiler 借鉴经典编译器的指令并行优化思想，将 ReAct 式的"推理-行动-观察"串行循环重构为 Planner→Task Fetching Unit→Executor 的三阶段并行流水线，在多任务/多工具场景下实现最高 3.7× 延迟降低与 6.7× 成本节约。

#### 🎯 核心要点
- 提出 Function Calling Planner (FCP)：通过单次 LLM 推理将用户任务分解为带依赖关系的子任务 DAG，以 `$N` 引用标记标记对前置任务输出的依赖
- 设计 Task Fetching Unit (TFU)：类比 CPU 指令取指单元，贪婪地将所有依赖已满足的任务分发给 Executor，并完成引用标记→实际输出的替换
- 构建并行 Executor：异步并发执行无依赖的子任务，支持搜索引擎、计算器、API、子 LLM Agent 等多种工具类型
- 支持流式规划 (Streaming Planner)：任务一经生成立即流出，不等完整 DAG 完成，进一步降低首 token 延迟
- 引入动态重规划 (Dynamic Replanning)：当执行结果与预期不符时，FCP 可基于中间结果重新生成计划，适配 Game of 24 等需迭代推理的场景
- 在 HotpotQA、Movie Recommendation、ParallelQA、Game of 24、WebShop 五大基准上验证，覆盖易并行、复杂依赖、动态重规划、交互式决策四种模式
- 在 LLaMA-2、GPT-3.5、GPT-4 等模型上均表现优异，且在某些场景超越 OpenAI 原生并行函数调用

#### 🔬 深入细节
##### 核心架构图

![LLMCompiler 架构总览](https://raw.githubusercontent.com/SqueezeAILab/LLMCompiler/main/figs/thumbnail.png)
*图：LLMCompiler 的三组件流水线架构——Planner 生成 DAG，Task Fetching Unit 调度就绪任务，Executor 并行执行*

##### 算法伪代码

```python
# LLMCompiler 核心执行流程
def llm_compiler(user_input, tools):
    # 阶段1: 规划 (一次LLM推理)
    dag = FunctionCallingPlanner(user_input, tools)
    # dag = [
    #   {"id": 1, "tool": "search", "args": "微软市值", "deps": []},
    #   {"id": 2, "tool": "search", "args": "苹果市值", "deps": []},
    #   {"id": 3, "tool": "math",  "args": "$1 / $2",   "deps": [1,2]},
    #   {"id": 4, "tool": "llm",   "args": "$3",         "deps": [3]}
    # ]

    results = {}
    running = []
    idx = 0

    while idx < len(dag) or running:
        # 阶段2: TFU — 收集依赖已就绪的任务
        ready = []
        while idx < len(dag):
            task = dag[idx]
            if all(dep in results for dep in task["deps"]):
                # 引用标记替换: $1 → 前驱任务实际输出
                resolved_args = task["args"]
                for dep_id in task["deps"]:
                    resolved_args = resolved_args.replace(
                        f"${dep_id}", str(results[dep_id])
                    )
                ready.append((task["id"], task["tool"], resolved_args))
                idx += 1
            elif not task["deps"]:
                ready.append((task["id"], task["tool"], task["args"]))
                idx += 1
            else:
                break  # 后续任务依赖未就绪，阻塞等待

        # 阶段3: Executor — 并行执行所有就绪任务
        if ready:
            outputs = parallel_execute(ready, executor_pool)
            for tid, output in outputs.items():
                results[tid] = output
        else:
            # 动态重规划: 无任务就绪且未完成时触发
            if idx < len(dag):
                dag = replan(dag, results)

    # 最终合并: 一次LLM调用生成面向用户的答案
    return final_merge(results)
```

##### 1. 动机与背景：ReAct 的串行瓶颈

传统 LLM Agent 框架（如 ReAct）遵循"推理→行动→观察→推理→..."的固定循环。每一轮工具调用都需要一次完整的 LLM 前向推理，且必须等待工具返回结果后才能进入下一轮思考。当用户查询包含多个**相互独立**的子任务时——例如"对比微软和苹果的市值"——串行执行搜索引擎两次查询、一次数学计算、一次结果总结，共需 4 轮 LLM 推理，但其中前两次搜索完全可以并行。

LLMCompiler 的核心洞察是：**LLM 的函数调用图本质上是一个指令依赖图（Instruction Dependency Graph）**，与经典编译器中待优化的程序指令图完全同构。编译器通过数据流分析识别可并行基本块，LLMCompiler 则将这一范式迁移到工具调用领域。

##### 2. 三组件流水线详解

**Function Calling Planner (FCP)**
Planner 接收用户自然语言输入和工具定义列表，通过一次 LLM 推理输出结构化的任务 DAG。每个任务包含：
- `id`：唯一标识符
- `tool`：调用的工具名称
- `args`：工具参数，其中 `$N` 表示对第 N 个任务输出的依赖
- `deps`：显式的依赖列表（冗余但增强了可靠性）

Planner 的 prompt 工程是该方法的关键：它要求 LLM 输出严格的 JSON 格式，并通过 in-context examples 引导 LLM 正确识别并行机会。例如，当用户问"查找 A 和 B 的信息并比较"时，Planner 应识别出 A 和 B 的检索无数据依赖，将其标记为可并行任务。

**Task Fetching Unit (TFU)**
TFU 是一个轻量级调度器，不涉及任何 LLM 调用。其工作流程为：
1. 维护一个就绪队列，扫描 DAG 中所有依赖已满足的任务
2. 执行**引用标记替换**（placeholder substitution）：将 `$N` 替换为前驱任务的实际字符串输出
3. 以贪婪策略将所有就绪任务派发给 Executor
4. 若无就绪任务且 DAG 未完成，触发动态重规划信号

引用标记替换机制是 LLMCompiler 区别于 OpenAI 原生并行调用的关键。OpenAI 允许同时触发多个函数，但**不管理函数间的数据依赖**——开发者必须手动将前驱输出填入后继输入。LLMCompiler 的 `$N` 引用标记自动完成这一过程。

**Executor**
Executor 是一个异步并发执行引擎。每个任务配有独立内存空间存储中间结果。支持的工具类型包括：
- 搜索引擎（如 Google Search API）
- 计算器（math tool）
- 子 LLM Agent（递归调用 LLM 完成子任务）
- 通用 API 调用

所有任务完成后，最终结果通过一次 LLM 调用全量合并，生成面向用户的自然语言回答。

##### 3. 动态重规划：当 DAG 不够时

某些任务（如 Game of 24：用 4 个数字通过四则运算得到 24）无法预先规划完整 DAG——每一步的最佳操作取决于上一步的中间结果。LLMCompiler 引入**闭环重规划**机制：

1. Planner 初始生成探索计划（`thought_proposer` 提议候选操作）
2. Executor 并行执行 `state_evaluator` 评估所有候选，`top_k_select` 筛选
3. 若无候选达到目标状态（24），Executor 向 Planner 发送 `replan` 信号
4. Planner 基于上轮筛选后的中间状态重新生成计划

这使得 LLMCompiler 在需要深度搜索的任务中仍能保持并行优势——每轮评估多个候选而非逐一尝试。对比 Tree-of-Thoughts（纯串行树搜索），LLMCompiler 在 Game of 24 上实现 2× 加速。

##### 4. 与传统方法的区别

| 特性 | ReAct | OpenAI Parallel FC | LLMCompiler |
|------|-------|-------------------|-------------|
| 任务分解 | 每步推理一次 | 无显式分解 | 单次 DAG 生成 |
| 并行执行 | 不支持 | 支持（无依赖管理） | 支持（依赖感知） |
| 依赖管理 | 手动编排 | 无 | 引用标记自动替换 |
| 动态重规划 | 天然支持（逐轮调整） | 不支持 | 支持（反馈回路） |
| LLM 调用次数 | O(N) | O(1)（但需手动拼接） | O(1) + 最终合并 |

> 💡 关键：LLMCompiler 的核心优势在于**通过一次 LLM 推理完成全量规划，利用 DAG 依赖分析最大化并行度**。它不是替代 ReAct，而是在"规划阶段"就完成依赖分析，将"思考"和"行动"分离到不同组件。

##### 5. 实验关键结果

LLMCompiler 在五大基准上全面超越 ReAct 基线（使用 GPT-3.5-Turbo）：

| 基准 | 模式 | 加速比 (vs ReAct) | 成本节省 | 准确率 |
|------|------|-------------------|----------|--------|
| HotpotQA | 易并行 | 1.80× | 3.37× | 持平 |
| Movie Recommendation | 易并行 | 3.74× | 6.73× | 持平 |
| ParallelQA | 复杂依赖 | 2.27× | 4.65× | +9% |
| Game of 24 | 动态重规划 | 2.0× (vs ToT) | — | — |
| WebShop | 交互决策 | 101.7× (vs LATS) | — | +28.4% 成功率 |

在 WebShop 上的巨大加速（101.7× vs LATS）尤具说服力：LLMCompiler 将搜索、点击等多步骤并行化，而 LATS 需要逐步骤串行树搜索。在 ParallelQA（新提出的复杂依赖基准）上，LLMCompiler 不仅更快，准确率还提升了 9%——作者认为这是因为并行规划减少了长链推理中的错误累积。

##### 6. 局限性

- **强依赖任务退化为 ReAct**：当任务链几乎无法并行化时，LLMCompiler 与 ReAct 无差异
- **规划质量依赖底层 LLM**：小模型可能输出错误依赖标注，导致 Executor 死锁
- **工具调用可靠性**：并行执行大量工具时的错误处理与重试机制尚需完善
- **动态重规划开销**：闭环场景下额外的 replan 调用可能抵消部分并行增益

#### 🧪 练习题
```yaml
question: "LLMCompiler 中 Task Fetching Unit (TFU) 的核心功能是什么？"
options:
  - "执行 LLM 推理生成子任务 DAG"
  - "扫描依赖已满足的任务并完成引用标记替换后派发给 Executor"
  - "并行调用外部工具并返回结果"
  - "对已完成的任务结果进行最终合并生成用户回答"
answer: 1
explain: "TFU 是轻量级调度器，不涉及 LLM 调用。它贪婪地将所有依赖已就绪的任务（完成 $N→实际输出的引用标记替换后）派发给 Executor。Planner 负责生成 DAG，Executor 负责执行，最终合并由单独的 LLM 调用完成。"
```
