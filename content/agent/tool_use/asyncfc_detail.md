### AsyncFC: 异步函数调用框架 (AsyncFC)

```yaml
id: asyncfc
name: AsyncFC
full_name: 异步函数调用框架 (AsyncFC)
year: '2026.05'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2605.15077
category: orchestration
parent: llm_compiler
motivation: 不改模型实现未来值驱动异步调用
```

#### 📝 一句话总结
AsyncFC 利用 **futures（引用标记）** 和基于特殊 token 的**依赖标注**机制，使 Agent 大模型能在函数调用尚未返回时继续解码和发射新调用，实现函数执行的异步并行化；在 BFCL v3/v4、SWE-bench Lite、HotpotQA 等基准上保持准确率不变，端到端延迟降低 1.12–1.44 倍。

#### 🎯 核心要点
- 提出 **futures** 机制：模型生成的函数调用不等待返回，而是立即获得一个引用标记（future），继续后续解码
- 设计 **依赖标注语法** `<function=dep_id>`：模型通过标注显式声明调用间的依赖关系，调度器据此决定并行策略
- 提出 **No Stall Policy**：当模型需要等待某 future 就绪时，调度器允许它转而生成新的函数调用或"不依赖未就绪结果"的响应，避免解码空转
- 构建 **Call Decoder + Response Decoder + Scheduler** 三组件架构：Call Decoder 生成调用与依赖标注，Response Decoder 在 future 就绪后组装最终响应，Scheduler 负责并行调度与状态管理
- 在 BFCL v3 (1.26×)、BFCL v4 (1.12×)、SWE-bench Lite (1.44×)、HotpotQA (1.24×) 上准确率零损失加速
- 跨模型验证（GPT-4o、Gemini 2.5 Pro、GPT-5.2）均有效，证明方法的模型无关性
- 推导了理论加速上界公式 \(R = \frac{T_{\text{LLM}} + T_{\text{tool}}}{\max(T_{\text{LLM}}, T_{\text{cp}})}\)，揭示加速取决于 DAG 并行度与解码-执行重叠度

#### 🔬 深入细节
##### 核心示意图

![AsyncFC 架构图](https://ar5iv.labs.arxiv.org/html/2605.15077/assets/Schedueler_Architecture.png)
*图：AsyncFC 三组件架构——Call Decoder 生成调用及依赖标注，Scheduler 异步分派并管理 future 状态，Response Decoder 在依赖就绪后组装最终响应*

![函数调用时间线对比](https://ar5iv.labs.arxiv.org/html/2605.15077/assets/FC_Timeline.png)
*图：同步 vs 异步函数调用时间线。同步模式下解码器必须等待每次函数调用返回；AsyncFC 中模型持续解码，多个调用并行执行*

![端到端加速效果](https://ar5iv.labs.arxiv.org/html/2605.15077/assets/demo_timeline_comparison_horizontal.png)
*图：真实工作负载下的时间线对比——AsyncFC 大幅缩短端到端延迟*

##### 算法伪代码

```python
# AsyncFC 核心调度循环
def asyncfc_scheduler(task, model):
    futures = {}          # dep_id → future 映射
    pending_calls = {}    # dep_id → call_info
    output_buffer = []    # 已完成的响应片段

    while not task_complete:
        # 阶段1: Call Decoder 生成调用 + 依赖标注
        raw_output = model.decode(
            context=task.context,
            pending_futures=futures,  # 模型可看到未就绪的 future
            no_stall=True             # 允许跳过等待
        )

        calls = parse_function_calls(raw_output)
        # 例: <function=dep_1>search("async programming")
        #     <function=dep_2|dep_1>summarize(dep_1.result)

        # 阶段2: 提取依赖关系并发射调用
        for call in calls:
            dep_id = call.dep_id            # 当前调用的 ID
            deps = call.dependencies         # 依赖的前驱 dep_id 列表

            if all_ready(deps, futures):
                future = executor.submit(call.func, call.args)
                futures[dep_id] = future
            else:
                pending_calls[dep_id] = call  # 暂存，等待依赖就绪

        # 阶段3: 检查 future 就绪情况
        for dep_id, future in list(futures.items()):
            if future.done():
                result = future.result()
                output_buffer.append((dep_id, result))
                # 唤醒依赖该 future 的暂存调用
                for pending_id, pending_call in list(pending_calls.items()):
                    if all_ready(pending_call.dependencies, futures):
                        f = executor.submit(pending_call.func, pending_call.args)
                        futures[pending_id] = f
                        del pending_calls[pending_id]

        # 阶段4: Response Decoder 组装最终输出
        if task_complete:
            final_response = response_decoder(output_buffer)
            break

    return final_response
```

##### 深入解释

**1. 动机与背景：Agent 函数调用的"同步困局"**

传统 Agent LLM 采用严格的**同步函数调用范式**：模型生成一个函数调用 → 暂停解码 → 等待函数执行返回 → 将结果拼入上下文 → 继续解码。这种模式的根本问题在于：
- 函数执行期间 GPU 闲置，浪费计算资源
- 多个独立函数调用必须串行执行，无法利用并行性
- 端到端延迟 = 解码时间总和 + 函数执行时间总和，无重叠

AsyncFC 的关键洞察是：**函数调用之间往往存在天然并行性**（如同时搜索多个关键词、并行读取多个文件），且**模型不需要所有调用结果就能继续部分解码**（如开始规划下一步、输出不依赖未就绪结果的文本）。通过引入 futures 概念和依赖标注，AsyncFC 将函数调用的控制流从"同步等待"转变为"异步流水线"。

**2. 核心机制：Futures + 依赖标注**

AsyncFC 的核心创新在于两方面的协同设计：

**(a) Futures 机制**：模型生成函数调用时，系统立即返回一个 future 引用标记——一个不透明的引用，代表"尚未就绪但已提交执行的结果"。模型可以继续解码而无需等待。当模型引用 future 时（如 `dep_1.result`），若 future 已就绪则直接取值，否则触发 No Stall Policy。

**(b) 依赖标注语法**：AsyncFC 不使用复杂的 prompt 工程，而是通过特殊 token `<function=dep_id|deps>` 在函数调用文本中嵌入结构化的依赖信息：
- `<function=dep_1>`：声明一个不依赖前驱的独立调用
- `<function=dep_3|dep_1,dep_2>`：声明 dep_3 依赖 dep_1 和 dep_2 的结果

这种设计的精妙之处在于：依赖标注完全**嵌入在模型原生输出格式中**，无需额外解析层；模型通过微调（fine-tuning）学习何时标注依赖，无需手工规则。

> 💡 **关键设计决策**：AsyncFC 选择让模型显式标注依赖关系，而非由调度器推断。原因是模型天然理解任务语义（"先搜索再总结"），能比静态分析更准确地识别因果依赖。微调时，轨迹中的并行调用组被自动标注为相同时间步，模型从中学习并行性模式。

**3. No Stall Policy：解码不等待的关键**

当模型尝试引用一个未就绪的 future 时，传统的做法是阻塞等待。AsyncFC 的 **No Stall Policy** 提供了两种选择：
- **发射新调用**：如果模型可生成新的独立函数调用（不依赖未就绪结果），调度器允许它继续发射，增加并行度
- **生成不依赖响应**：如果模型可输出不涉及未就绪结果的文本（如"正在执行搜索，同时我先整理已有信息…"），则直接生成

这一策略的理论基础来自加速上界分析：

$$R = \frac{T_{\text{LLM}} + T_{\text{tool}}}{\max(T_{\text{LLM}}, T_{\text{cp}})}$$

其中 \(T_{\text{LLM}}\) 是总解码时间，\(T_{\text{tool}}\) 是所有函数执行时间之和，\(T_{\text{cp}}\) 是 DAG 关键路径上的函数执行时间。当存在充分并行性（\(T_{\text{tool}} \gg T_{\text{cp}}\)）且解码时间与关键路径接近（\(T_{\text{LLM}} \approx T_{\text{cp}}\)）时，加速达到**甜点区**。

> ⚠️ **注意**：引入解码开销 \(\alpha\) 后，加速比修正为分段函数——当关键路径长时，加速受限于 \(T_{\text{cp}}\)；当关键路径短时，加速受限于解码开销。更深/更长延迟的 DAG 从更大模型（更大 \(T_{\text{LLM}}\)）中获益更多，浅 DAG 则相反。

**4. 三组件架构的协同运作**

AsyncFC 的架构由三个解耦组件构成：

- **Call Decoder**：负责在任务上下文中生成函数调用及其依赖标注。在微调阶段，训练数据中的同步调用序列被转换为带时间步标注的并行组，模型学习识别可并行的调用并标注依赖。

- **Scheduler**：管理 future 生命周期——提交调用、追踪就绪状态、在依赖满足时自动唤醒后继调用。Scheduler 维护一个依赖图，当 future 就绪时，检查所有被阻塞的调用是否可执行。

- **Response Decoder**：在所有必要调用完成后，将 future 结果按依赖顺序组装为最终用户响应。它确保输出的一致性和正确顺序，即使底层调用是乱序完成的。

这三个组件的设计使 AsyncFC 对模型的推理过程**透明**——模型看到的是与同步模式几乎相同的接口（只是多了 futures 和依赖标注），现有 LLM 只需微调即可适配。

**5. 与传统方法的区别**

| 维度      | 同步 Function Calling  | 并行 Tool Use（如现有 GPT） | AsyncFC                 |
| --------- | ---------------------- | --------------------------- | ----------------------- |
| 解码-执行 | 严格串行               | 批量发射但等待全部返回      | 异步流水线，持续解码    |
| 依赖处理  | 隐式（顺序即依赖）     | 无显式依赖                  | 模型显式标注 dep_id     |
| 加速来源  | 无                     | 独立调用间并行              | 独立调用并行 + 解码重叠 |
| 模型改动  | 无                     | 微小 prompt 调整            | 微调学习依赖标注        |

现有 GPT-4o 等模型的"并行 tool use"允许在一个 turn 中同时发射多个独立调用，但**必须等待所有调用返回才能继续解码**。AsyncFC 打破了这一限制——解码与函数执行可重叠，模型在等待 slow 函数时可以继续发射 fast 函数或生成文本。

**6. 实验关键发现**

- **BFCL v3/sc-multi-turn（1.26×）**：多轮场景中函数调用链长、依赖复杂，AsyncFC 的并行化 + 解码重叠双重机制带来最大收益
- **BFCL v4/live-single-turn（1.12×）**：单轮场景中并行度有限，但 No Stall Policy 的解码重叠仍带来加速
- **SWE-bench Lite（1.44×）**：代码修复任务涉及大量文件读取，天然高并行度（并行读取多个文件），加速最显著
- **HotpotQA（1.24×）**：多跳问答中的并行搜索符合 DAG 并行性假设
- 消融实验证实：(i) 仅并行执行无 No Stall 收益有限；(ii) 仅 No Stall 无依赖标注导致错误率上升；(iii) 两者结合才达到准确率零损失加速

#### 🧪 练习题
```yaml
question: "AsyncFC 中 No Stall Policy 的核心作用是什么？"
options:
  - "减少模型解码时的 token 消耗"
  - "允许模型在等待函数返回时继续解码或发射新调用，避免 GPU 空转"
  - "通过剪枝降低函数调用 DAG 的深度"
  - "自动将同步函数调用改写为异步调用"
answer: 1
explain: "No Stall Policy 允许 decode 不等待未就绪的 future，转而生成新调用或不依赖未就绪结果的文本，是实现解码-执行时间重叠的关键机制。"
```
