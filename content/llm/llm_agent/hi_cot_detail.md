### Hi-CoT：分层思维链 (Hierarchical CoT)

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
Hi-CoT 提出一种零样本、推理时生效的分层思维链提示方法，通过交替生成 `instruction` 与 `execution` 块，把扁平 CoT 改造成持续规划、持续执行、持续压缩的结构化轨迹，从而缓解长推理中的冗余、漂移和上下文噪声问题。

#### 🎯 核心要点
- 交替式层次结构：每个推理阶段由高层指令 `I_i` 和低层执行 `E_i` 组成，而不是一次性输出完整线性 CoT。
- 零样本推理时方法：不需要微调、不引入额外模型、不做多路径搜索，只通过提示格式约束单条生成轨迹。
- 针对 Plan-and-Solve 的缺陷：避免“先写全局计划、后续执行逐步偏离”的 plan-execution drift。
- 压缩瓶颈机制：每次执行前要求模型把当前状态压缩为一个短指令，过滤重复解释、无关铺垫和低信息量内容。
- 显式可审计轨迹：每个执行步骤都有对应指令，可直接检查“为什么做这一步”和“这一步是否按计划完成”。
- 主要评测：在 Qwen3 与 DeepSeek-R1 蒸馏模型的 13 个配置上，覆盖 AIME24、AMC、MATH500、Minerva Math、OlympiadBench 五个数学推理基准。
- 论文报告效果：平均准确率提升 6.2%，最高任务/模型组合提升 61.4%，相对 CoT 平均减少 13.9% 推理 token；严格遵守格式时，在 AMC 与 MATH500 子集上可达到 100% 准确率。

#### 🔬 深入细节

![Hi-CoT 与 CoT、Plan-and-Solve 的结构对比](https://arxiv.org/html/2604.00130v1/x2.png)
*图：论文 Figure 2。CoT 是扁平步骤链，Plan-and-Solve 是一次性全局计划加线性执行，Hi-CoT 则在每个阶段交替生成局部指令和局部执行。*

Hi-CoT 的核心不是让模型“想得更长”，而是让模型“每一步先说明当前要做什么，再执行这件事”。论文把复杂任务 \(T\) 分解为动态长度的阶段序列 \(S_1,S_2,\ldots,S_n\)，其中 \(n\) 不预设，由模型根据题目复杂度决定。每个阶段定义为：

$$
S_i = (I_i, E_i)
$$

其中 \(I_i\) 是 instruction step，用来概括当前状态下的局部目标、策略或下一步计划；\(E_i\) 是 execution step，用来执行该计划，完成具体计算、代数变换、逻辑推断或最终答案生成。完整轨迹可写成：

$$
\tau_{\text{Hi-CoT}} = I_1 \rightarrow E_1 \rightarrow I_2 \rightarrow E_2 \rightarrow \cdots \rightarrow I_n \rightarrow E_n
$$

```python
# Hi-CoT 推理时伪代码：单模型、单轨迹、无搜索

def hi_cot(problem, llm, max_steps=16):
    history = []

    for step in range(1, max_steps + 1):
        instruction = llm.generate(
            problem=problem,
            history=history,
            constraint="输出 <|instruction|>，只规划下一步，不展开计算"
        )

        execution = llm.generate(
            problem=problem,
            history=history + [instruction],
            constraint="输出 <|execution|>，只执行刚才的 instruction"
        )

        history.append((instruction, execution))

        if "\\boxed" in execution or is_final_answer(execution):
            break

    return format_as_hicot(history)
```

传统 CoT 的问题在于没有结构化的中间控制点。模型虽然会输出很多“step by step”的文本，但这些文本通常混合了目标选择、解释、计算、回顾和最终答案，导致长题上容易反复解释、偏离最初目标，甚至在中途引入无关推断。Plan-and-Solve 试图通过先生成全局计划来修正这一点，但它的计划通常只在开头出现一次，后续每一步执行没有强约束；一旦某个局部计算错了，模型不会自然地暂停、重估、压缩当前状态，而是继续沿着已经漂移的轨迹往下写。

Hi-CoT 把“计划”从一次性的全局前缀改造成每一步的局部控制信号。第 \(i\) 步指令 \(I_i\) 依赖上一轮执行结果 \(E_{i-1}\)，可抽象为：

$$
I_i = C(T, E_{<i})
$$

这里 \(C\) 表示一种压缩操作：模型必须把题目、已完成推理和剩余目标压缩成一个短而明确的下一步目标。执行步骤则是：

$$
E_i = F(T, E_{<i}, I_i)
$$

也就是在当前题目、历史执行结果和局部指令的约束下完成具体推理。这个设计的直觉是：如果模型每次都要先把“现在该做什么”说清楚，它就更难在无约束的长文本中游走，也更容易把局部计算和全局目标对齐。

> 💡 关键：Hi-CoT 的“层次”不是多智能体或多模型层次，而是同一个模型在输出格式中显式区分高层计划与低层执行。它把推理链从 `step -> step -> step` 变为 `plan -> act -> plan -> act`。

论文强调的压缩瓶颈非常重要。普通 CoT 往往把历史上下文原样延续下去，模型越写越长，前面产生的冗余内容也会继续进入后续条件分布。Hi-CoT 要求每轮先输出一个短指令，相当于在进入下一轮计算前做一次摘要式状态更新。这个瓶颈会丢弃低价值内容，只保留“下一步需要什么”，因此既减少 token，又降低由冗余文本引发的推理干扰。论文在效率实验中报告，Hi-CoT 相比 CoT 平均减少 13.9% 响应长度，在 MATH500 上常减少数百到上千个 token。

与 Tree-of-Thoughts、Graph-of-Thoughts 或多路径 self-consistency 相比，Hi-CoT 的成本更低，因为它不采样多个候选、不做显式搜索、不调用外部验证器。它的收益来自结构约束而不是算力扩张。可以把它看作一种“单轨迹结构化搜索”：每个 instruction 是局部搜索方向，每个 execution 是沿该方向推进一步；如果 instruction 写得清楚，轨迹就更像受控求解过程，而不是自由文本漫游。

论文还区分了严格格式 Hi-CoT 与 format-relaxed 变体。format-relaxed 只要求模型按层次化思路推理，但不严格检查 `<|instruction|>` 与 `<|execution|>` 的交替。实验显示 relaxed 版本也有收益，但通常低于严格版本，说明关键不只是“提醒模型要有计划”，而是让计划和执行形成可解析、可校验的交替结构。论文对格式合规响应做进一步分析，发现当模型严格遵守交替格式并在结尾使用 `\boxed{}` 给出答案时，准确率和 token 效率都会进一步提升。

Hi-CoT 的局限也很明确：它依赖模型的指令遵循能力。如果模型不能稳定输出指定标签，或在 execution 中混入新的无约束计划，层次结构会退化为普通 CoT。因此论文指出，未来可通过 SFT 或 RL 强化格式遵守，使模型更稳定地把局部规划、局部执行和最终答案分开。对超长任务而言，这一点尤其关键，因为格式失败本身会重新引入上下文污染与步骤漂移。

```yaml
question: "Hi-CoT 中交替生成 <|instruction|> 与 <|execution|> 的主要目的是什么？"
options:
  - "让模型输出更长的推理链，从而覆盖更多可能路径"
  - "在每一步执行前形成压缩瓶颈和局部目标，减少冗余与计划漂移"
  - "把单个模型拆成多个专家模型并进行投票"
  - "用外部搜索算法枚举所有可行推理树"
answer: 1
explain: "Hi-CoT 的核心是每步先规划再执行，让 instruction 压缩当前状态并约束 execution；它不是多模型投票，也不依赖多路径搜索。"
```
