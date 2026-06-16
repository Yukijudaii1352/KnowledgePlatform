### BBH：大基准困难任务 (Big-Bench Hard)

```yaml
id: bbh
name: BBH
full_name: 大基准困难任务 (Big-Bench Hard)
year: "2023"
org: Google Research
paper_url: https://arxiv.org/abs/2210.09261
category: general
parent: math
motivation: 23个极限推理任务测试逻辑边界
```

#### 📝 一句话总结

BBH 从 BIG-Bench 中筛选出 23 个当时模型尚未超过平均人类评分的困难任务，用它们专门评测大模型在多步推理、符号操作、逻辑判断和复杂指令遵循上的边界。论文进一步表明，chain-of-thought prompting 会显著改变这些任务上的能力估计，标准 answer-only few-shot 往往低估大模型的真实推理潜力。

#### 🎯 核心要点

- 从 BIG-Bench 的 200 多个任务中筛选出 23 个困难任务，要求此前最佳模型结果低于平均人类评分。
- 过滤流程强调任务清洁度：保留有足够样本、有人工基线、且可用 multiple-choice 或 exact match 自动评测的任务。
- BBH 覆盖算法推理、算术推理、逻辑推理、自然语言理解、常识/世界知识和多语言理解等类型。
- 标准 answer-only prompting 与 chain-of-thought prompting 是论文比较的两个核心评测设置。
- 每个 BBH 任务人工编写 3 个 CoT few-shot exemplars，并在示例推理中使用 “let's think step-by-step” 风格的中间步骤。
- 评测使用 greedy decoding，基于最终答案关键词抽取输出，并用 exact match 计算准确率。
- 结果显示 Codex `code-davinci-002` 加 CoT 在 17/23 个任务上超过平均人类评分，而 answer-only 只在 5/23 个任务上超过。
- 论文强调 CoT 的增益具有规模依赖性：小模型可能无法从 CoT 中获益，足够大的模型才出现明显推理跃迁。

#### 🔬 深入细节

![BBH 两种 prompting 设置](https://github.com/suzgunmirac/BIG-Bench-Hard/raw/main/figures/bbh-setup.png)
*图：BBH 官方仓库中的 prompting 设置示意。answer-only 直接要求答案，CoT prompting 在 few-shot 示例中加入中间推理过程。*

![BBH 上 CoT 与 answer-only 的结果对比](https://github.com/suzgunmirac/BIG-Bench-Hard/raw/main/figures/bbh-results.png)
*图：BBH 官方结果图。CoT prompting 在多个困难任务上显著提高了大模型相对平均人类评分的表现。*

BBH 的方法贡献首先体现在“筛选困难任务”的规则上，而不只是提出一个新排行榜。BIG-Bench 本身任务很多、质量和形式差异也很大；如果直接报告总分，容易把容易题、噪声题和不适合自动评测的题混在一起。BBH 先要求任务拥有可用的人类基线、足够样本，并能用 multiple-choice 或 exact match 评测，再筛掉此前已有模型超过平均人类评分的任务，最后留下 23 个仍能暴露模型能力边界的任务。这个筛选过程让 BBH 更像“压力测试集”，目标是看模型在哪些推理边界上仍然失败。

```python
# BBH 任务筛选流程伪代码
candidate_tasks = all_bigbench_tasks
candidate_tasks = filter(lambda t: num_subtasks(t) <= 3, candidate_tasks)
candidate_tasks = filter(lambda t: num_examples(t) >= 103, candidate_tasks)
candidate_tasks = filter(lambda t: has_human_baseline(t), candidate_tasks)
candidate_tasks = filter(lambda t: metric(t) in {"multiple_choice", "exact_match"}, candidate_tasks)

hard_tasks = []
for task in candidate_tasks:
    if best_reported_model_score(task) < average_human_rater_score(task):
        hard_tasks.append(task)

BBH = manually_remove_out_of_scope_extreme_tasks(hard_tasks)
assert len(BBH) == 23
```

BBH 的第二个核心是把评测设置本身作为变量。answer-only prompting 的输入通常包含任务说明、若干输入输出示例和待解问题，但示例答案只给最终结果；CoT prompting 则在示例中显式写出中间推理链，诱导模型在回答前分解问题。对一个任务 \(t\)，可以把 prompt 记作 \(p_t\)，模型输出经抽取函数 \(E(\cdot)\) 得到最终答案，任务准确率为：

$$
\mathrm{Acc}(m,t,p_t)=\frac{1}{|D_t|}\sum_{(x_i,y_i)\in D_t}\mathbf{1}\left[E(m(p_t,x_i))=y_i\right].
$$

论文还关心模型相对人类基线的差值：

$$
\Delta(m,t,p_t)=\mathrm{Acc}(m,t,p_t)-\mathrm{HumanAvg}(t).
$$

这个 \(\Delta\) 很重要，因为 BBH 的初衷不是问“模型在所有任务上的平均分是多少”，而是问“模型是否越过了这个任务的人类平均表现门槛”。Figure 1 中 answer-only 和 CoT 的柱状对比正是围绕这个差值展开：同一个模型、同一个任务，只要 prompt 中是否包含显式推理链不同，就可能从低于人类平均变成高于人类平均。

```python
# BBH 中 answer-only 与 CoT 的评测流程伪代码
for task in BBH:
    demos_answer_only = build_fewshot_examples(task, include_reasoning=False)
    demos_cot = build_fewshot_examples(task, include_reasoning=True)

    for setting, demos in [("answer_only", demos_answer_only), ("cot", demos_cot)]:
        correct = 0
        for x, y in task.eval_examples:
            prompt = render_instruction(task) + render_options(x) + render_demos(demos) + render_query(x)
            output = model.generate(prompt, temperature=0)
            pred = extract_after_answer_keyword(output)
            correct += int(pred == y)
        report_accuracy(task, setting, correct / len(task.eval_examples))
```

CoT 在 BBH 上有效的直觉是：很多任务不是知识检索，而是需要可执行的中间状态更新。例如 `Tracking Shuffled Objects` 需要维护对象位置交换，`Boolean Expressions` 需要逐步化简逻辑表达式，`Web of Lies` 需要沿着真假陈述链传播真值，`Multi-Step Arithmetic` 需要保留运算优先级和中间结果。answer-only prompt 要求模型直接跳到结论，容易让模型在隐式推理中丢失状态；CoT prompt 则把“状态更新过程”示范出来，使模型更可能模仿分解策略。

> 💡 关键：BBH 不是证明 CoT 让模型真正具备形式逻辑能力，而是证明“不让模型写中间步骤”的评测会系统性低估大模型在多步任务上的可用能力。

不过，论文也明确指出 CoT 不是万能补丁。像 `Causal Judgement`、`Ruin Names`、`Snarks` 这类任务涉及社会常识、幽默感、语用含义或模糊语境，写出更多推理步骤并不一定补足缺失知识，甚至可能让模型把错误假设合理化。另一方面，较小模型即使看到 CoT 示例，也可能只学到表面格式，无法稳定执行推理程序；因此 BBH 的结论是“CoT + 足够大模型 + 合适任务类型”共同产生增益，而不是任何模型、任何任务都能靠 CoT 提升。

与 MATH 这类单领域数学基准相比，BBH 的价值在于任务类型更杂、更接近“推理边界扫描”。它同时包含符号类任务、自然语言类任务和世界知识类任务，能区分模型是在哪种能力上失败。对于研究者来说，BBH 的正确使用方式不是只看总平均分，而是按任务组观察：算法/算术任务是否因 CoT 大幅提升，语言理解任务是否更依赖预训练语料，世界知识任务是否暴露事实和语用缺陷。这样的拆分能避免把一个总分误读为通用智能水平。

#### 🧪 练习题

```yaml
question: "BBH 论文中 chain-of-thought prompting 的主要作用是什么？"
options:
  - "减少测试集样本数量以降低评测成本"
  - "在 few-shot 示例中展示中间推理步骤，从而更好地诱导多步推理"
  - "把所有任务都转换成代码执行问题"
  - "用 BLEU 替代 exact match 作为评测指标"
answer: 1
explain: "BBH 比较了 answer-only 与 CoT prompting；CoT 的关键是示范中间推理链，让模型在复杂任务上更容易分解问题并维护中间状态。"
```
