### GSM8K：小学数学应用题集 (Grade School Math 8K)

```yaml
id: "gsm8k"
name: "GSM8K"
full_name: "小学数学应用题集 (Grade School Math 8K)"
year: "2021"
org: "OpenAI"
paper_url: "https://arxiv.org/abs/2110.14168"
category: "general"
parent: "—"
motivation: "多步推理数学题，CoT研究基石"
```

#### 📝 一句话总结

GSM8K 提出了 8.5K 道高质量小学数学应用题及自然语言解答，并通过“生成多个解答候选 + verifier 排序”的方法提升多步数学推理可靠性，解决了大语言模型单次自回归生成在中间步骤出错后难以恢复的问题。

#### 🎯 核心要点

- 数据集包含约 8.5K 道人工编写题目，划分为 7.5K 训练题和 1K 测试题。
- 每题通常需要 2 到 8 步基础算术推理，概念不超过早期代数，但语言表达高度多样。
- 解答以自然语言 reasoning trace 为主，而不是只给方程或最终答案，这使其成为后续 chain-of-thought 研究的重要基准。
- 方法上比较 finetuning 与 verification：前者单次低温采样，后者采样多个高温候选并由 verifier 选择。
- verifier 训练流程是：generator 训练 2 个 epoch，每题采样 100 个解答，按最终答案是否正确打标签，再训练 verifier。
- 论文强调 token-level verifier、语言模型辅助目标、dropout 和 calculator annotation 对泛化与稳定性都有重要作用。

#### 🔬 深入细节

![GSM8K verifier 训练流程图](https://ar5iv.labs.arxiv.org/html/2110.14168/assets/figures/verifier_diagram.png)
*图：论文 Figure 4，先训练 generator 生成大量候选解答，再按最终答案自动标注正确性，最后训练 verifier 在测试时从多个候选中选出最高分解答。*

```python
# GSM8K verification pipeline 简化伪代码
train_set = {(problem, natural_language_solution, final_answer)}

# 1. 训练生成器，避免训练太久导致多样性坍缩
generator = finetune_gpt(train_set, objective="language_modeling", epochs=2)

# 2. 为每道训练题采样多个候选，并用最终答案自动打标签
verifier_data = []
for problem, _, gold_answer in train_set:
    candidates = generator.sample(problem, n=100, temperature=0.7)
    for solution in candidates:
        pred_answer = extract_final_answer(solution)
        label = int(pred_answer == gold_answer)
        verifier_data.append((problem, solution, label))

# 3. 训练 verifier 预测候选解答是否正确
verifier = train_verifier(
    verifier_data,
    objective="binary_correctness + auxiliary_language_modeling",
    epochs=1,
)

# 4. 测试时 sample-and-rank
def solve(problem):
    candidates = generator.sample(problem, n=100, temperature=0.7)
    return max(candidates, key=lambda sol: verifier.score(problem, sol))
```

GSM8K 的核心问题是：多步数学推理对单个局部错误极其敏感。自回归语言模型一旦在中间计算、变量指代或数量关系上偏离，后续 token 往往会沿着错误状态继续生成，几乎没有机制主动回溯。论文因此没有只把问题建模为“训练一个更大的生成器”，而是把求解拆成“覆盖候选空间”和“识别正确候选”两部分：generator 负责提出多个可能的自然语言解答，verifier 负责判断哪个解答更可信。

数据集设计本身也服务于这个目标。GSM8K 避免从网页大规模抓取低质量题目，而是由人工编写，并通过一致性检查控制错误率；题目要求足够多样，避免模板化替换数字；难度被刻意放在“中学生应能解、但大模型仍容易错”的区间。每个解答包含自然语言步骤，因此模型必须生成类似内部草稿的推理过程，而不是只拟合一个最终数值。

finetuning baseline 使用标准语言模型交叉熵：给定题目 \(x\) 和解答 token 序列 \(y_{1:T}\)，优化

$$
\mathcal{L}_{LM}(\theta)=-\sum_{t=1}^{T}\log p_\theta(y_t\mid x,y_{<t})
$$

测试时低温采样一个解答并抽取最终答案。论文特别指出，如果让 6B 模型直接输出最终答案而不写中间步骤，性能会从约 20.6% 降到约 5.2%，说明自然语言推理轨迹不是附属解释，而是模型完成多步计算的重要工作区。

verification 的目标函数可以看成二分类正确性预测。设候选解答 \(\hat{y}^{(j)}\) 的标签为 \(z^{(j)}\in\{0,1\}\)，其中标签只由最终答案是否匹配 gold answer 决定。solution-level verifier 可优化：

$$
\mathcal{L}_{V}(\phi)=-\sum_j\left[z^{(j)}\log V_\phi(x,\hat{y}^{(j)})+(1-z^{(j)})\log(1-V_\phi(x,\hat{y}^{(j)}))\right]
$$

论文默认更偏向 token-level verifier：在每个前缀 \(\hat{y}_{\le t}\) 后预测最终解答正确概率，可视为一种 value function。它更难训练、噪声更大，但提供了更密集的监督信号，迫使 verifier 学会评估推理过程中的局部状态，而不是只记住最终答案形式。论文还把语言模型目标作为 auxiliary objective，使 verifier 更好理解解答分布。

测试时的选择规则非常直接：

$$
\hat{y}=\arg\max_{j\in\{1,\dots,N\}}V_\phi(x,\hat{y}^{(j)}),\qquad N=100
$$

这体现了 verifier 的“optionality”：只要 generator 在 100 个候选中至少生成一个正确解，verifier 就有机会把它选出来。相比单次采样，这种方法把错误风险从“必须一次生成全对”转为“生成器覆盖正确解 + verifier 排序正确”。论文观察到，当训练数据足够多时，verification 的收益相当于大幅增加模型规模，并且随数据扩展更有效。

GSM8K 还引入 calculation annotations 来缓解纯语言模型的算术错误。训练解答中可插入计算标记，测试时如果模型触发这些标记，外部 calculator 会覆盖采样结果并返回精确计算值。这不是把问题简化成符号求解器，因为模型仍要决定何时计算、计算什么表达式、如何把结果接回自然语言推理链；它只是把脆弱的基础算术交给可靠工具，保留语言模型对问题建模和步骤规划的责任。

> 💡 关键：GSM8K 后来常被视为 CoT 基准，但原论文的重点还包括 verifier scaling：数学推理不只是“写出思路”，还需要在多个候选思路中识别哪条链条没有中途出错。

#### 🧪 练习题

```yaml
question: "GSM8K 论文中 verifier 在测试阶段的作用是什么？"
options:
  - "直接替代生成器逐 token 生成最终解答"
  - "从生成器采样出的多个候选解答中选择正确概率最高的一个"
  - "把所有自然语言题目转换为数据库查询"
  - "只检查最终答案格式，不看解答过程"
answer: 1
explain: "verification 使用 sample-and-rank：生成器产生多个候选，verifier 根据题目和候选解答预测正确性并选择最高分。"
```
