### MBPP

```yaml
id: mbpp
name: MBPP
full_name: 基础Python编程问题 (Mostly Basic Python Problems)
year: '2021'
org: Google Research
paper_url: https://arxiv.org/abs/2108.07732
category: general
parent: humaneval
motivation: 大规模Python编程问题集扩展覆盖
```

#### 📝 一句话总结

MBPP 提出了 974 道基础 Python 编程题，每题配自然语言描述、参考程序和测试用例，解决了 HumanEval 题量较小、覆盖面有限的问题，并继续用执行正确性评估程序合成。

#### 🎯 核心要点

- 974 个 Mostly Basic Python Problems，面向入门到中等难度的短函数或短程序合成
- 每题包含自然语言任务描述、参考解和约 3 个 assert 风格测试用例
- 评测采用生成代码后运行测试，关注 functional correctness 而非文本相似度
- 论文分析模型规模、采样温度、prompt 示例选择、错误类型和训练数据重合
- 数据集经过人工编辑和质量审查，减少歧义描述与测试不足对结果的干扰

#### 🔬 深入细节

![MBPP 示例程序生成](https://ar5iv.labs.arxiv.org/html/2108.07732/assets/x1.png)
*图源：ar5iv 论文 Figure 1，展示模型根据自然语言提示生成 Python 程序的示例。*

```python
# MBPP 执行式评测伪代码
def evaluate_mbpp(model, tasks, prompt_examples, samples_per_task=80):
    task_scores = []
    for task in tasks:
        prompt = build_prompt(
            few_shot_examples=prompt_examples,
            description=task.text,
            tests=task.visible_tests,
        )
        solved = False
        for _ in range(samples_per_task):
            code = model.generate(prompt, temperature=select_temperature(samples_per_task))
            if run_assert_tests_safely(code, task.hidden_or_eval_tests):
                solved = True
                break
        task_scores.append(int(solved))
    return mean(task_scores)
```

MBPP 的定位是“基础但多样”的程序合成基准。HumanEval 更精炼，题目通常围绕函数 docstring；MBPP 则收集更多短编程任务，覆盖列表、字符串、字典、数学计算、递归、排序和简单数据结构操作。它降低了单题复杂度，但扩大了任务覆盖面，使模型错误类型更容易统计。

评测逻辑继承执行式代码评估：给定任务描述 \(d\)，模型生成程序 \(c\)，再运行测试集合 \(T\)。只有当所有断言通过时才记为正确：
$$
\text{correct}(c)=\prod_{t\in T}\mathbb{1}[\text{run}(c,t)=\text{pass}].
$$
这比 BLEU 更接近真实编程需求，但也依赖测试覆盖度；如果测试太弱，模型可能写出硬编码或偶然通过的程序。

论文特别关注采样温度和样本预算的关系。低温更稳定，适合 pass@1；高温能带来更多样候选，适合较大的采样预算。这个规律与 HumanEval 一致，说明代码生成模型不是只靠单次贪心输出，实际能力还包括在候选空间中产生正确解的概率。

MBPP 还分析了错误类型，例如语法错误、类型错误、运行时错误和逻辑错误。随着模型规模增大，低级错误减少，但逻辑错误仍然存在。这个发现解释了为什么代码 LLM 需要执行反馈、单元测试生成、程序修复和自我调试等后续能力，而不能只依赖更大的语言模型。

#### 🧪 练习题

```yaml
question: "MBPP 与 HumanEval 的共同评测核心是什么？"
options:
  - "比较生成代码和参考代码的 BLEU"
  - "运行测试用例验证生成程序的功能正确性"
  - "只检查代码是否含有注释"
  - "由人工阅读所有程序并给主观分"
answer: 1
explain: "两者都以执行测试作为核心标准，区别主要在题量、题目来源和覆盖范围。"
```
