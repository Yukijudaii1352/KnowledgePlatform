### Least-to-Most: 由易到难提示 (Least-to-Most Prompting)
```yaml
id: least_to_most
name: Least-to-Most
full_name: 由易到难提示 (Least-to-Most Prompting)
year: '2022.05'
org: Google
paper_url: https://arxiv.org/abs/2205.10625
category: reasoning
parent: cot
motivation: 将复杂问题分解为子问题逐步求解
```

#### 📝 一句话总结
Least-to-Most Prompting 先让模型把复杂问题分解成更简单的子问题，再按顺序求解并把前序答案传给后续步骤，解决了普通 CoT 在“测试题比示例更难”时泛化不足的问题。

#### 🎯 核心要点
- 两阶段流程：problem decomposition 与 sequential subproblem solving
- 分解和求解都通过 few-shot prompting 完成，不需要微调
- 后一个子问题的 prompt 会包含前面子问题及其答案
- 针对 easy-to-hard generalization，比普通 CoT 更适合组合泛化
- 在 SCAN、符号操作、数学推理等任务中显著提升
- 可与 CoT 结合：每个子问题内部仍可生成短推理链

#### 🔬 深入细节
![Least-to-Most 两阶段流程](https://ar5iv.labs.arxiv.org/html/2205.10625/assets/figures/ltm-pull-fig_new.png)
*图：论文 Figure 1，展示先分解问题、再按子问题顺序求解的流程。图源：ar5iv / arXiv。*

```python
# Least-to-Most prompting 伪代码
def least_to_most(lm, decomposition_prompt, solving_prompt, problem):
    subquestions = lm.generate(
        decomposition_prompt + f"\nProblem: {problem}\nSubproblems:"
    )
    context = f"Problem: {problem}\n"
    answers = []
    for q in parse_subquestions(subquestions):
        prompt = solving_prompt + "\n" + context + f"Q: {q}\nA:"
        a = lm.generate(prompt)
        answers.append((q, a))
        context += f"Q: {q}\nA: {a}\n"
    return answers[-1][1], answers
```

普通 CoT 假设示例中的推理模式可以直接迁移到测试题，但当测试题需要更多组合步骤时，模型可能学到的是“示例长度附近的解法”。Least-to-Most 把问题显式拆成一串更小的目标，让每次调用都只处理当前可控难度的子任务。

流程可以写成：

$$
q_{1:n} \sim p_\theta(\text{subquestions} \mid x), \quad
a_i \sim p_\theta(a_i \mid x, q_1,a_1,\ldots,q_i)
$$

其中 \(q_{1:n}\) 是分解出的子问题，\(a_i\) 是第 \(i\) 个子问题答案。关键是求解第 \(i\) 个子问题时，模型能看到 \(a_{<i}\)，所以复杂依赖被转化成逐步累积的状态。

这种设计的优势在组合任务上尤其明显。例如 SCAN 这类指令映射任务要求模型把短规则组合成长动作序列；普通 CoT 示例如果都很短，模型不一定能 extrapolate 到长序列。Least-to-Most 则把长指令拆成局部片段，逐步构造最终输出。

与 CoT 的区别在于，CoT 主要控制“答案内部要写推理步骤”，Least-to-Most 控制“问题外部要先规划子问题结构”。前者是一条连续推理链，后者是显式课程式求解；当问题天然可分解时，Least-to-Most 更容易复用前序中间结果，也更便于人工检查失败发生在哪个子问题。

> 💡 关键：Least-to-Most 的核心不是让推理更长，而是让每一步更简单，并让上下文保存已解决的中间状态。

#### 🧪 练习题
```yaml
question: "Least-to-Most Prompting 最核心的两步是什么？"
options:
  - "采样多条答案并多数投票"
  - "先分解复杂问题，再顺序求解子问题"
  - "把答案翻译成 Python 并执行"
  - "训练奖励模型筛选 prompt"
answer: 1
explain: "Least-to-Most 通过 decomposition 和 sequential solving 将难题变成一串依赖前序答案的简单子问题。"
```
