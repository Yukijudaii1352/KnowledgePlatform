### MATH

```yaml
id: math
name: MATH
full_name: 竞赛级数学问题集 (MATH Dataset)
year: '2021'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2103.03874
category: general
parent: gsm8k
motivation: 竞赛级数学题涵盖微积分代数等
```

#### 📝 一句话总结

MATH 提出了 12,500 道竞赛级数学题和逐步 LaTeX 解答，解决了早期数学数据集偏模板化、难度不足、无法衡量复杂推导能力的问题。

#### 🎯 核心要点

- 12,500 道来自数学竞赛的高难度题目，覆盖代数、数论、几何、计数、概率、预代数、预微积分
- 每题带完整 step-by-step solution，可评估最终答案，也可用于训练解释式推理
- 题目按 7 个科目和 5 个难度层级组织，便于分析模型在哪类数学上失败
- 论文同时贡献 AMPS 辅助数学预训练数据，用脚本和 Khan Academy 材料补足基础训练
- 实验显示模型即便经过数学辅助预训练，在 MATH 上准确率仍很低，表明竞赛数学远难于模板算术

#### 🔬 深入细节

![MATH 与既有数学任务难度对比](https://ar5iv.labs.arxiv.org/html/2103.03874/assets/x1.png)
*图源：ar5iv 论文 Figure 2，展示 MATH 相比形式证明和 plug-and-chug 数学任务更具挑战性。*

```python
# MATH 评测流程伪代码
def evaluate_math(model, problems):
    correct = 0
    for p in problems:
        prompt = (
            "Solve the following competition math problem. "
            "Show reasoning and put the final answer in \\boxed{}.\n"
            + p.statement
        )
        solution = model.generate(prompt)
        pred = normalize_math_answer(extract_boxed(solution))
        gold = normalize_math_answer(extract_boxed(p.gold_solution))
        correct += int(equivalent(pred, gold))  # 字符串、分数、代数式需规范化
    return correct / len(problems)
```

MATH 的动机是把数学评测从“套公式的文本题”推进到竞赛问题。许多旧数据集可以通过识别模板、直接代入数字或学习生成规则解决；而竞赛数学需要选择证明路径、引入辅助变量、处理边界情况，并在多个知识点之间组合推理。

数据结构是 MATH 的关键资产。每道题不仅有最终答案，还有完整自然语言与 LaTeX 推导。这让模型训练可以不只最大化最终答案概率，还可以学习从题目到中间步骤再到 boxed answer 的序列：
$$
p_\theta(s,a\mid q)=\prod_t p_\theta(z_t\mid q,z_{<t}),
$$
其中 \(z_t\) 包括推理文字、公式和最终答案。后续许多数学 CoT 数据和监督微调流程都直接受益于这种解答格式。

MATH 的难点还在答案等价性。数学答案可能写成 \(\frac{1}{2}\)、0.5、\(\sqrt{4}/4\) 或等价表达式，简单字符串匹配会低估正确率。因此实际评测常需要规范化分数、去除 LaTeX 包装、处理单位和 boxed 标记，并在可行时做符号等价判断。

与 GSM8K 相比，MATH 更强调抽象数学和竞赛技巧。GSM8K 的解题核心多是小学算术链条，MATH 则可能要求几何构造、数论整除、组合计数或函数变换。两者共同构成数学能力阶梯：GSM8K 测自然语言多步算术，MATH 测专业数学推导和高难度泛化。

#### 🧪 练习题

```yaml
question: "MATH 数据集为什么比许多早期数学数据集更难？"
options:
  - "题目主要来自竞赛数学，需要多步推导和跨知识点组合，而不是简单模板代入"
  - "所有题目都只有一个数字，没有文字描述"
  - "只包含小学加减乘除"
  - "评测完全依赖人工主观打分"
answer: 0
explain: "MATH 覆盖竞赛级数学，要求复杂推理，并带逐步解答；其难度远高于 plug-and-chug 任务。"
```
