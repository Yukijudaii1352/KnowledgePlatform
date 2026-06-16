### MATH：竞赛级数学问题集 (MATH Dataset)

```yaml
id: math
name: MATH
full_name: 竞赛级数学问题集 (MATH Dataset)
year: "2021"
org: UC Berkeley
paper_url: https://arxiv.org/abs/2103.03874
category: general
parent: gsm8k
motivation: 竞赛级数学题涵盖微积分代数等
```

#### 📝 一句话总结

MATH 提出了一个面向竞赛级数学推理的高难度评测集，用 12,500 道带分步解答的题目检验模型是否真正能进行多步符号推理，而不是只会套用浅层模板。它解决了早期数学数据集过于简单、容易被语言模型模式匹配突破的问题，并额外引入 AMPS 预训练语料来研究数学领域数据对推理能力的帮助。

#### 🎯 核心要点

- 构建 12,500 道竞赛级数学题，划分为 7,500 训练题和 5,000 测试题。
- 覆盖 7 个数学主题：Prealgebra、Algebra、Number Theory、Counting and Probability、Geometry、Intermediate Algebra、Precalculus。
- 每道题标注 1 到 5 的难度等级，并提供自然语言分步解答与最终答案。
- 评测目标不是单步算术，而是跨多个推理步骤的公式变换、代数化简、组合计数、几何关系和高阶函数分析。
- 采用最终答案 exact match 作为主指标，通常从模型生成的解答中抽取 `\boxed{...}` 或最终答案并做规范化比较。
- 引入 AMPS（Auxiliary Mathematics Problems and Solutions）辅助数学预训练数据，包含 Khan Academy 题目和程序生成题，用于验证领域预训练能否提升数学解题能力。
- 论文显示大规模语言模型在 MATH 上仍处于低准确率区间，说明竞赛级数学推理远难于 GSM8K 一类小学应用题。

#### 🔬 深入细节

![MATH 数据集与其他数学评测的难度对比](https://github.com/hendrycks/math/raw/main/dataset_comparison.png)
*图：MATH 官方仓库给出的数据集对比图。MATH 将评测目标从短算术题推进到竞赛级、多主题、多步骤证明式解题。*

MATH 的关键设计不是“再收集一批数学题”，而是系统性提高数学评测的推理密度。GSM8K 主要考察小学应用题中的算术链条，很多题可以通过短程加减乘除和少量语义理解解决；MATH 则来自竞赛训练语境，题目常常需要先识别题型，再构造中间变量、选择定理或恒等式，最后完成符号化计算。也就是说，模型面对的不是单一答案生成任务，而是一个从自然语言题面到形式化推理轨迹再到最终答案的完整问题求解过程。

```python
# MATH 评测流程伪代码：从生成解答到最终 exact match
for problem in MATH_test:
    prompt = render_problem(problem.statement)
    solution_text = model.generate(prompt)

    # 常见策略：优先抽取 \boxed{...}，否则抽取最后出现的显式答案
    pred = extract_final_answer(solution_text)
    pred = normalize_math_answer(pred)

    gold = normalize_math_answer(problem.final_answer)
    score += int(pred == gold)

accuracy = score / len(MATH_test)
```

形式上，每个样本可以写成三元组 \((x_i, r_i, y_i)\)：\(x_i\) 是题目文本，\(r_i\) 是人工分步解答，\(y_i\) 是最终答案。若模型生成 \(\hat{s}_i\)，评测器从中抽取最终答案 \(\hat{y}_i = E(\hat{s}_i)\)，再经过答案规范化函数 \(N(\cdot)\) 比较：

$$
\mathrm{Acc}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\left[N\left(E(\hat{s}_i)\right)=N(y_i)\right].
$$

这个公式看起来简单，但它揭示了 MATH 的一个重要取舍：主指标只看最终答案，不直接评分推理链质量。这样做的好处是评测稳定、自动化、成本低；坏处是模型可能通过错误推理偶然得到正确答案，或者写出正确思路但因格式不规范被判错。因此在使用 MATH 分析模型时，通常不能只看 accuracy，还要抽样检查生成的推理链是否真的可靠。

MATH 的数据组织也服务于细粒度诊断。7 个学科和 5 个难度等级让研究者可以观察模型的能力边界：模型可能在 Prealgebra 上表现尚可，却在 Number Theory、Geometry 或 Precalculus 上急剧下降；也可能在低难度题上能完成模板化推导，但到 Level 4/5 题时无法选择合适的引理或分情况讨论。这种按主题和难度拆分的结构，使 MATH 不只是排行榜数据集，而是一个定位数学推理短板的诊断工具。

论文还引入 AMPS 作为辅助训练资源，核心问题是：模型做不好 MATH，是因为缺少数学知识语料，还是缺少可泛化的推理机制？AMPS 通过大量数学题和解答提供领域语料，让模型在微调前先接触数学符号、解题格式、常见变换和答案表达。若 AMPS 预训练提升了 MATH 准确率，说明数学语言和符号分布本身有帮助；但若提升有限，则说明竞赛数学还要求更强的搜索、规划和验证能力，不能只靠更多同域文本解决。

> 💡 关键：MATH 的难点不在“数字更大”，而在“解题程序更长”。模型必须学会把题面转成中间命题，维护多个符号关系，并在最后给出可规范化的答案。

从训练角度看，MATH 也推动了后来的 chain-of-thought、program-of-thought、self-consistency 和 verifier/reranker 方法。因为数据集中有完整分步解答，模型可以学习“先推理、再作答”的输出格式；而由于最终答案可自动判分，也可以对多个候选解进行采样、验证和选择。一个典型改进流程如下：

```python
# 基于 MATH 的多样本推理 + 验证式解题框架
candidates = []
for _ in range(num_samples):
    reasoning = model.generate(problem, temperature=0.7)
    answer = extract_final_answer(reasoning)
    candidates.append((reasoning, normalize_math_answer(answer)))

# 简单版本：多数投票；复杂版本：用 verifier 给每条推理链打分
selected_answer = majority_vote([a for _, a in candidates])
return selected_answer
```

与传统数学 NLP 数据集相比，MATH 的创新在于它把评测重点从“是否理解题面并做几步计算”提升到“是否具备竞赛题级别的多步问题求解能力”。这直接暴露了语言模型的两个弱点：一是长链推理中早期小错误会被后续步骤放大；二是模型可能生成看似合理的数学文本，但没有执行严格的代数验证。也正因为如此，MATH 后来成为评测大模型数学能力、推理增强方法和自动验证技术的重要基准。

#### 🧪 练习题

```yaml
question: "MATH 相比 GSM8K 一类数据集最核心的难点提升是什么？"
options:
  - "题目都要求模型输出 Python 程序"
  - "题目更强调竞赛级、多主题、多步骤的符号推理"
  - "评测指标从 accuracy 改成 BLEU"
  - "所有题目都只考察小学算术"
answer: 1
explain: "MATH 的核心贡献是用竞赛级题目测试复杂数学推理，覆盖代数、几何、数论、微积分预备知识等主题，而不是只测试短程算术。"
```
