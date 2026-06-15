### Hi-CoT：用分层思维链缓解长任务中的计划漂移

```yaml
id: hi_cot
name: Hi-CoT
full_name: 分层思维链 (Hierarchical CoT)
year: 2026
org: arXiv
paper_url: https://arxiv.org/abs/2604.00130
category: frontier_2026
parent: cot
motivation: 分层架构解决超长任务上下文丢失
```

#### 📝 一句话总结

Hi-CoT 让模型交替生成高层 instruction 和低层 execution，把长链推理拆成动态阶段，从而减少普通 CoT 在超长任务中的上下文遗忘和执行漂移。

#### 🎯 核心要点

- **核心问题**：普通 CoT 在长推理中容易越写越散，早期目标被后续细节淹没。
- **关键结构**：用 `<|instruction|>` 表示当前阶段目标，用 `<|execution|>` 执行该目标，两个层级交替展开。
- **动态分段**：阶段数量不是固定模板，而是由模型根据任务复杂度自行决定。
- **部署方式**：Hi-CoT 是推理时 prompting 方法，不要求额外微调或搜索。
- **主要收益**：在数学与长链推理任务上提升准确率，同时压缩不必要的推理长度。

#### 🔬 深入细节

![Hi-CoT comparison](https://arxiv.org/html/2604.00130v1/x2.png)

*图源：arXiv HTML 论文图 2，对比普通 CoT、Plan-and-Solve 与 Hi-CoT 的推理结构。*

```python
def hi_cot(question):
    trace = []
    state = {"question": question, "partial_solution": ""}

    while not solved(state):
        instruction = llm(
            "Generate the next high-level instruction",
            question=question,
            trace=trace,
        )
        execution = llm(
            "Execute only this instruction",
            question=question,
            instruction=instruction,
            trace=trace,
        )
        trace.append(("<|instruction|>", instruction))
        trace.append(("<|execution|>", execution))
        state = update_solution(state, execution)

    return extract_final_answer(trace)
```

**方法动机**：Hi-CoT 针对的是长链 CoT 的“计划-执行混杂”问题。普通 CoT 把所有推理都写在同一层级，等价于直接采样 $r_{1:T}\sim P(r_t\mid r_{<t},x)$；当 $T$ 很长时，早期目标容易被局部计算细节覆盖。

**分层表示**：Hi-CoT 把推理拆成 instruction 和 execution 两种 token 区段。instruction 是短期目标或局部计划，execution 只负责完成该目标；这种结构使模型在每个阶段重新显式声明“现在要做什么”，减少执行过程偏离全局问题。

**与 Plan-and-Solve 区别**：Plan-and-Solve 通常先生成完整计划再逐项执行，若初始计划不完整，后续难以修正。Hi-CoT 则在每个阶段重新生成下一条 instruction，允许计划随中间结果调整，更适合问题结构逐渐显露的长推理任务。

**推理时优势**：Hi-CoT 不改变模型参数，只通过输出格式约束改善搜索路径。可把每个阶段看作最大化 $P(e_t\mid i_t,x,h_{t-1})P(i_t\mid x,h_{t-1})$，其中 $i_t$ 是高层目标，$e_t$ 是执行文本；层级因子化降低了无约束长文本生成的漂移风险。

#### 🧪 练习题

```yaml
question: Hi-CoT 中 `<|instruction|>` 的作用是什么？
options:
  - A. 给当前推理阶段设定高层目标
  - B. 存储模型参数
  - C. 调用数据库
  - D. 删除最终答案
answer: A
explain: Hi-CoT 通过高层 instruction 约束后续 execution，使长链推理更有阶段性。
```
