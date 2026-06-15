### GSM8K

```yaml
id: gsm8k
name: GSM8K
full_name: 小学数学应用题集 (Grade School Math 8K)
year: '2021'
org: OpenAI
paper_url: https://arxiv.org/abs/2110.14168
category: general
parent: —
motivation: 多步推理数学题，CoT研究基石
```

#### 📝 一句话总结

GSM8K 提出了 8.5K 道人工编写的小学数学应用题，并在论文中用生成器加验证器的流程提升解题率，解决了早期数学评测缺少高质量多步自然语言推理题的问题。

#### 🎯 核心要点

- 8.5K 道高质量小学数学应用题，划分为约 7.5K 训练题和 1K 测试题
- 每题通常需要 2 到 8 步基础算术推理，并提供自然语言逐步解法和最终答案
- 论文训练 generator 生成多个候选解，再训练 verifier 判断候选解是否正确
- token-level verifier 在每个解题 token 后预测最终正确性，比只看最终答案更能利用推理过程
- 多样本生成加验证器重排成为后续 CoT、自洽采样和过程监督研究的重要前身

#### 🔬 深入细节

![GSM8K 验证器训练流程](https://ar5iv.labs.arxiv.org/html/2110.14168/assets/figures/verifier_diagram.png)
*图源：ar5iv 论文 Figure 4，展示生成候选解、标注正确性并训练 verifier 的流程。*

```python
# GSM8K generator + verifier 解题流程伪代码
def train_verifier(generator, train_problems):
    verifier_data = []
    for problem in train_problems:
        samples = generator.sample_solutions(problem, n=100)
        for sol in samples:
            label = int(extract_answer(sol) == problem.gold_answer)
            verifier_data.append((problem.question, sol, label))
    return train_token_level_verifier(verifier_data)

def solve_with_verifier(generator, verifier, problem, n=100):
    candidates = generator.sample_solutions(problem, n=n, temperature=0.7)
    ranked = sorted(candidates, key=lambda s: verifier.score(problem.question, s), reverse=True)
    return extract_answer(ranked[0])
```

GSM8K 的基准价值来自题目质量而非题量巨大。每道题由人类问题作者编写，语言表达多样，解法通常需要把自然语言条件转成中间数量，再通过加减乘除逐步计算。这样的题目比单步算术更能测试模型是否能维护变量、顺序和隐含约束。

论文中的方法部分不仅发布数据集，还系统比较了微调生成器和训练验证器两条路线。生成器学习 \(p_\theta(s\mid q)\)，其中 \(s\) 是完整解题过程；验证器学习 \(P_\phi(\text{correct}\mid q,s)\)。测试时不只生成一个答案，而是生成多个候选解，再由验证器挑选最可信的解。这个流程把“会想出多个可能解法”和“会辨别正确解法”拆成两个子问题。

token-level verifier 的直觉是：一个解法的中间步骤已经包含正确或错误信号，不必等到最后答案才监督。若某一步把单位、数量或运算关系弄错，后续 token 的正确性概率应下降。相比 solution-level verifier，token-level 训练能让模型更细粒度地感知推理轨迹质量。

从评测角度看，GSM8K 后来成为 chain-of-thought 的标志性基准，因为题目刚好处于“人类中学生可解、语言模型不能靠记忆或单步模式稳定解”的区间。标准评测通常解析最终数值答案：
$$
\text{Accuracy}=\frac{1}{N}\sum_i \mathbb{1}[\text{parse}(\hat{s}_i)=a_i],
$$
但真正的能力差异往往体现在中间推理是否一致。

#### 🧪 练习题

```yaml
question: "GSM8K 论文中验证器方法的核心思想是什么？"
options:
  - "只让模型输出最终数字，不生成推理过程"
  - "生成多个候选解，并训练 verifier 对候选解正确性打分后重排"
  - "把所有题目改写成选择题"
  - "用人工标注者在测试时挑选答案"
answer: 1
explain: "验证器流程先采样多个完整解法，再根据学习到的正确性评分选择候选，提升测试时解题率。"
```
