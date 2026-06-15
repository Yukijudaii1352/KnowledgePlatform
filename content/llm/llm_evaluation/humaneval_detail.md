### HumanEval

```yaml
id: humaneval
name: HumanEval
full_name: 人工编写代码评测 (HumanEval)
year: '2021'
org: OpenAI
paper_url: https://arxiv.org/abs/2107.03374
category: general
parent: —
motivation: 单元测试验证Python函数生成准确性
```

#### 📝 一句话总结

HumanEval 提出了 164 道人工编写的 Python 函数生成题，并用隐藏单元测试与 pass@k 评估功能正确性，解决了 BLEU 等文本相似指标无法衡量代码是否可运行的问题。

#### 🎯 核心要点

- 164 道手写 Python 编程题，每题包含函数签名、docstring、函数体占位和单元测试
- 评测目标是功能正确性：生成代码必须通过测试，而不是与参考解文本相似
- pass@k 衡量模型采样 \(k\) 次时至少有一个正确程序的概率
- 论文提出无偏 pass@k 估计式，避免不同采样数量下直接估计产生偏差
- 结果显示代码微调和重复采样显著提升性能，也暴露模型对复杂指令链、安全和样例诱导的脆弱性

#### 🔬 深入细节

![HumanEval 上 Codex pass rate 随模型规模变化](https://ar5iv.labs.arxiv.org/html/2107.03374/assets/figs/codex-main.png)
*图源：ar5iv 论文 Figure 1，展示 Codex/Codex-S 在 HumanEval 上的 pass@k 表现。*

```python
# HumanEval 执行式评测与 pass@k 伪代码
def evaluate_humaneval(model, problems, n=200, k=1):
    passk_values = []
    for p in problems:
        samples = [model.generate(p.prompt, temperature=0.8) for _ in range(n)]
        c = 0
        for code in samples:
            program = p.prompt + code
            c += int(run_hidden_tests_safely(program, p.tests))
        passk_values.append(estimate_pass_at_k(n=n, c=c, k=k))
    return mean(passk_values)

def estimate_pass_at_k(n, c, k):
    if n - c < k:
        return 1.0
    return 1.0 - comb(n - c, k) / comb(n, k)
```

HumanEval 的核心洞察是：代码生成评测必须看程序行为。自然语言生成中常用的 BLEU、编辑距离或 token overlap 无法判断两个实现是否等价；一个参考解相似度很低的程序可能完全正确，一个相似度很高的程序也可能边界条件错误。因此 HumanEval 把每题设计为可执行函数，并用单元测试作为判据。

pass@k 是 HumanEval 最重要的指标。若对每题生成 \(n\) 个样本，其中 \(c\) 个通过测试，则无偏估计为：
$$
\text{pass@}k=1-\frac{\binom{n-c}{k}}{\binom{n}{k}}.
$$
它表示随机抽取 \(k\) 个提交时至少一个正确的概率。这个指标适合代码生成，因为实际开发中用户可以让模型生成多个候选，再选择、运行或修复其中一个。

执行式评测也带来工程约束：需要沙箱隔离、超时控制、禁用危险系统调用，并防止生成代码污染评测环境。论文使用隐藏测试减少模型直接拟合测试样例的风险，但 HumanEval 题量只有 164，后续研究还需要关注数据污染和过拟合。

与 MBPP 等后续代码基准相比，HumanEval 更小但更精心，题目通常要求理解 docstring 中的算法约束、字符串处理、列表操作或简单数学逻辑。它奠定了代码 LLM 的基本评测范式：自然语言/签名提示、生成函数实现、运行测试、报告 pass@k。

#### 🧪 练习题

```yaml
question: "HumanEval 为什么使用 pass@k 而不是 BLEU 作为核心指标？"
options:
  - "因为代码是否正确取决于执行行为，pass@k 衡量多次采样中至少一个程序通过测试的概率"
  - "因为 BLEU 只能用于中文文本"
  - "因为 pass@k 不需要运行代码"
  - "因为 HumanEval 每题都有多个自然语言参考答案"
answer: 0
explain: "HumanEval 关注功能正确性，pass@k 与单元测试结合能评估程序是否真正可运行并满足规格。"
```
