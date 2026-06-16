### HumanEval：人工编写代码评测 (HumanEval)

```yaml
id: humaneval
name: HumanEval
full_name: 人工编写代码评测 (HumanEval)
year: "2021"
org: OpenAI
paper_url: https://arxiv.org/abs/2107.03374
category: general
parent: "—"
motivation: 单元测试验证Python函数生成准确性
```

#### 📝 一句话总结

HumanEval 提出了一个由人工编写 Python 编程题和单元测试组成的代码生成评测集，用可执行测试直接衡量模型生成函数的功能正确性。它解决了用文本相似度或参考答案匹配评估代码生成不可靠的问题，并用 pass@k 指标刻画模型多次采样后至少生成一个正确程序的概率。

#### 🎯 核心要点

- 构建 164 道人工编写的 Python 编程问题，每题包含函数签名、docstring、若干示例和隐藏单元测试。
- 评测对象是 Codex 系列代码模型，即在大规模 GitHub 代码上训练或微调的 GPT 模型。
- 使用执行式评测：模型补全函数体，评测器运行单元测试，所有测试通过才判为正确。
- 提出并系统使用 pass@k 指标，衡量每题采样 \(k\) 个候选程序时至少一个通过测试的概率。
- 使用无偏 pass@k 估计式，避免直接用 \(k\) 个样本的经验成功率造成高方差或偏差。
- 强调代码生成评测应关注语义功能正确性，而不是 BLEU、编辑距离或与参考代码的表面相似度。
- HumanEval 后来成为 LLM 代码能力评测的基础基准，也推动了 MBPP、APPS、EvalPlus 等后续代码评测。

#### 🔬 深入细节

![Codex 论文中的代码生成示例](https://ar5iv.labs.arxiv.org/html/2107.03374/assets/figs/codex-figurehead.png)
*图：Codex/HumanEval 论文首页示例图，展示模型根据函数签名与自然语言说明生成 Python 代码的任务形式。*

![Codex 模型在 HumanEval 上的 pass@k 表现](https://ar5iv.labs.arxiv.org/html/2107.03374/assets/figs/codex-main.png)
*图：论文主结果图，展示模型规模、采样数量与 pass@k 表现之间的关系。*

HumanEval 的核心思想是把代码生成评测从“像不像参考答案”转成“能不能运行正确”。同一个编程问题可能有很多等价实现：循环、递归、列表推导、库函数调用都可能通过测试；如果用 BLEU 或字符串匹配，正确但写法不同的程序会被误判。HumanEval 因此为每道题准备测试用例，模型只需要生成满足函数规格的实现，评测器通过执行测试来判断语义正确性。

```python
# HumanEval 单题评测流程伪代码
for problem in HumanEval:
    prompt = problem.signature + problem.docstring + problem.examples
    completions = []

    for _ in range(num_samples):
        code = model.generate(prompt, stop=["\nclass", "\ndef", "\nif", "\nprint"])
        program = prompt + code
        passed = run_unit_tests_in_sandbox(program, problem.hidden_tests)
        completions.append(passed)

    c = sum(completions)   # 通过测试的候选数
    n = len(completions)   # 总采样数
    record_pass_at_k(problem, n, c)
```

论文没有简单报告“第一个样本是否正确”，而是使用 pass@k，因为代码模型经常通过采样产生多个候选解。若每题采样 \(n\) 个程序，其中 \(c\) 个通过测试，那么从这 \(n\) 个候选里不放回抽取 \(k\) 个时，至少一个正确的概率估计为：

$$
\mathrm{pass@}k=\mathbb{E}_{\text{Problems}}\left[1-\frac{\binom{n-c}{k}}{\binom{n}{k}}\right].
$$

直觉上，\(\binom{n-c}{k}/\binom{n}{k}\) 是抽到的 \(k\) 个候选全都错误的概率；用 1 减去它，就得到至少一个正确的概率。如果 \(c=0\)，pass@k 为 0；如果错误样本不足 \(k\) 个，即 \(n-c<k\)，则至少会抽到一个正确样本，pass@k 为 1。这个估计式比“直接生成 \(k\) 次看是否成功”更稳定，因为论文通常会一次采样较大的 \(n\)，再从同一批样本估计多个 \(k\) 值。

```python
# pass@k 的常用无偏估计实现
from math import prod

def estimate_pass_at_k(n: int, c: int, k: int) -> float:
    if n - c < k:
        return 1.0
    return 1.0 - prod(1.0 - k / i for i in range(n - c + 1, n + 1))
```

HumanEval 的每道题通常包含一个明确的函数接口，例如函数名、参数、返回类型暗示和 docstring 中的行为说明。模型的任务不是续写任意文本，而是在给定上下文中补全可执行函数体。这个形式对大语言模型非常有挑战：它要求模型理解自然语言规格，将边界条件转成控制流，生成语法正确的 Python，并避免只满足示例而不能泛化到隐藏测试。隐藏单元测试因此扮演了“语义验证器”的角色。

> ⚠️ 注意：HumanEval 的通过测试不等价于数学意义上的程序完全正确。测试只能覆盖有限输入，模型仍可能写出通过当前测试但在未测边界上失败的代码。

从方法论上，HumanEval 也把代码模型评测和采样策略绑定在一起。temperature 较低时，模型输出更稳定，但可能反复生成同一个错误实现；temperature 较高时，多样性增加，pass@k 可能提高，但单个样本质量可能下降。因此论文关心的不只是模型规模，还包括“给模型多少次尝试机会”。这和真实编程助手场景很接近：用户可能让模型重试、修改或生成多个候选，再通过测试选择可用解。

与传统自然语言生成评测相比，HumanEval 的优势是结果可执行、解释清晰、可自动化；弱点是数据规模小、主要覆盖短函数、Python 单文件问题，且测试集可能被后续模型训练污染。后来许多代码评测工作会在 HumanEval 基础上增加更强测试、去污染检查、多语言版本或更复杂工程任务，但 pass@k + unit test 的评测范式基本沿用了 HumanEval 的设计。

#### 🧪 练习题

```yaml
question: "HumanEval 中 pass@k 指标衡量的是什么？"
options:
  - "生成代码与参考代码的 BLEU 分数"
  - "采样 k 个候选程序时至少一个通过单元测试的概率"
  - "模型生成代码的平均长度"
  - "隐藏测试用例的数量"
answer: 1
explain: "pass@k 关注多次采样中的成功概率；只要 k 个候选里至少有一个通过测试，该题在 pass@k 意义下就被视为可解。"
```
