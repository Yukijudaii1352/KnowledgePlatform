### PAL: 程序辅助语言模型 (PAL)
```yaml
id: pal
name: PAL
full_name: 程序辅助语言模型 (PAL)
year: '2023'
org: CMU
paper_url: https://proceedings.mlr.press/v202/gao23f.html
category: reasoning
parent: cot
motivation: 将推理转为可执行代码保证准确性
```

#### 📝 一句话总结
PAL 让语言模型把自然语言问题转成可执行程序，再由 Python 解释器完成计算，解决了 CoT 会写出合理推理但算错或执行不精确的问题。

#### 🎯 核心要点
- Program-aided Language Models 将中间推理表示为代码
- LLM 负责理解问题、分解变量和生成程序，解释器负责执行
- 最终答案来自程序运行结果，而不是模型直接口算
- 在 13 个算术和符号推理任务上评估，尤其适合精确计算
- 使用 Codex 等具备代码能力的模型生成 Python
- 与 CoT 互补：自然语言推理可读，程序执行更可靠

#### 🔬 深入细节
![PAL 与 CoT 对比图](https://ar5iv.labs.arxiv.org/html/2211.10435/assets/x1.png)
*图：论文 Figure 1，对比 CoT 的自然语言推理和 PAL 的 Python 程序执行流程。图源：ar5iv / arXiv。*

```python
# PAL 推理伪代码
def pal_solve(lm, prompt_examples, question, python_executor):
    prompt = prompt_examples + f"\n# Question: {question}\n"
    prompt += "# Write a Python program to solve it.\n"
    program = lm.generate(prompt, stop=["\n\n# Question:"])
    result = python_executor.run(program, entrypoint="solution")
    return result, program
```

PAL 的核心分解是：

$$
c \sim p_\theta(c \mid x, D_{\text{PAL}}), \quad y = \operatorname{Exec}(c)
$$

其中 \(c\) 是模型生成的程序，\(\operatorname{Exec}\) 是外部解释器。模型不再承担所有推理和计算，只负责把语言问题翻译成程序化步骤；精确算术、循环、条件和符号操作交给解释器执行。

CoT 在复杂算术上常见失败是“思路看起来对，但某一步算错”。PAL 把这些易错步骤落到代码里，例如把人数、价格、日期写成变量，再用表达式计算。只要程序语义正确，解释器会稳定给出同一结果，不会像语言模型那样在多位数计算上随机漂移。

Prompt 的示例需要展示从题目到代码的映射风格：如何命名变量、如何写注释、如何把最终结果赋给 `answer` 或从 `solution()` 返回。示例越清楚，模型越容易生成可执行且结构化的程序。这里的“推理链”仍然存在，只是从自然语言句子变成了代码语句。

PAL 的边界也很清楚：如果模型误解题意，解释器只能精确执行错误程序；如果执行环境不安全或库不可用，也会带来工程风险。因此实际系统中通常需要沙箱、超时、依赖白名单和异常回退。

> 💡 关键：PAL 不要求语言模型自己算得更准，而是让模型把问题交给更适合精确执行的符号工具。

#### 🧪 练习题
```yaml
question: "PAL 中 Python 解释器主要承担什么职责？"
options:
  - "生成自然语言题目"
  - "执行模型生成的程序并产出最终答案"
  - "训练语言模型参数"
  - "筛选 few-shot 示例顺序"
answer: 1
explain: "PAL 由 LLM 生成程序，解释器执行程序，因此最终答案来自可执行代码的运行结果。"
```
