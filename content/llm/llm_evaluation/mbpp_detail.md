### MBPP：基础 Python 编程问题 (Mostly Basic Python Problems)

```yaml
id: mbpp
name: MBPP
full_name: 基础Python编程问题 (Mostly Basic Python Problems)
year: "2021"
org: Google Research
paper_url: https://arxiv.org/abs/2108.07732
category: general
parent: humaneval
motivation: 大规模Python编程问题集扩展覆盖
```

#### 📝 一句话总结

MBPP 提出了一个由短自然语言描述、标准 Python 函数解和 assert 测试用例组成的基础编程题评测集，用执行后的功能正确性替代 BLEU 等表面相似度来衡量大语言模型的代码合成能力。它解决了早期代码生成评测覆盖窄、任务偏竞赛化或测试格式不一致的问题，成为 HumanEval 之外最常用的 Python 代码生成基准之一。

#### 🎯 核心要点

- 数据集包含 974 个众包短 Python 编程任务，每题有自然语言题面、参考函数和 3 个用于语义正确性检查的 assert 测试。
- 论文额外人工清洗出 426 个 hand-verified 版本，用于分析歧义题面、不规范函数签名和测试不匹配带来的评测噪声。
- 标准实验划分为 10 个 few-shot prompt 示例、500 个测试题、374 个微调题和剩余验证题。
- 评测模型是 244M 到 137B 参数的 decoder-only Transformer，输入由少量示例、目标题面和测试断言拼接而成。
- 核心指标不是 token accuracy 或 BLEU，而是执行候选代码后是否通过测试用例的 functional correctness。
- 每个测试题用 temperature 0.5 采样 80 个候选程序，并分别报告 any-sample solved rate 和 all-samples reliability。
- 最大 137B 模型在 few-shot 条件下可解出约 59.6% 的 MBPP 测试题，小规模 374 题微调通常带来约 10 个百分点提升。
- 与 HumanEval 相比，MBPP 的题面更像入门 Python 练习，统一包含 assert 风格 I/O 示例，更适合评估基础程序合成覆盖面。

#### 🔬 深入细节

![MBPP 程序合成示例](https://ar5iv.labs.arxiv.org/html/2108.07732/assets/x1.png)
*图：论文 Figure 1 展示了 MBPP 题面、assert 测试和大模型生成代码的基本交互形式。紫色部分是提示，蓝色部分是模型补全。*

MBPP 的关键不是提出一个新的神经网络结构，而是把“自然语言到可执行 Python 函数”的评测对象标准化。每个样本都被组织成三元组 \((d_i, r_i, T_i)\)：\(d_i\) 是短题面，\(r_i\) 是参考实现，\(T_i=\{t_{i1},t_{i2},t_{i3}\}\) 是三个 assert 测试。模型看到的 prompt 通常由若干 few-shot 样例和当前题目的描述及 assert 组成，目标是补全一个自包含函数。这个设计比只让模型输出一段文本更严格，因为输出必须在 Python 3.6 环境下可执行，而且返回值要满足测试断言。

```python
# MBPP functional correctness 评测伪代码
for task in mbpp_test_set:
    prompt = build_prompt(few_shot_examples, task.description, task.asserts)
    samples = model.sample(prompt, temperature=0.5, num_samples=80)

    passed = []
    for code in samples:
        program = extract_python_function(code)
        ok = True
        for test in task.asserts:
            ok = ok and run_python_assert(program, test, python_version="3.6")
        passed.append(ok)

    task_solved = any(passed)
    sample_reliability = sum(passed) / len(passed)
```

论文用两个互补指标描述结果。第一个是“任一样本解题率”，衡量每题 80 个候选中是否至少有一个通过测试：

$$
\text{AnySampleAcc}=\frac{1}{N}\sum_{i=1}^{N}\mathbb{1}\left[\max_{1\le j\le K} y_{ij}=1\right],\quad K=80
$$

第二个是“样本级解题率”，衡量所有候选中有多少比例通过测试：

$$
\text{SampleAcc}=\frac{1}{NK}\sum_{i=1}^{N}\sum_{j=1}^{K}y_{ij}
$$

其中 \(y_{ij}=1\) 表示第 \(i\) 道题的第 \(j\) 个采样程序通过全部 assert。前者接近实际开发中的“生成多个候选后自动筛选”场景，后者反映模型单次生成的可靠性。论文发现前者随参数规模呈近似 log-linear 增长，而后者更不稳定，因为很多题虽然能被某个样本解决，但 80 个样本中只有 1 到 2 个真正通过。

![MBPP 模型规模与通过率](https://ar5iv.labs.arxiv.org/html/2108.07732/assets/x3.png)
*图：论文 Figure 3 左图显示 any-sample 解题率随模型规模提升而稳定增长，微调在多数规模上带来近似常量增益。*

MBPP 的数据构造强调“基础但真实”的 Python。众包者被要求写短题面、单个自包含函数和三个测试用例，题目涵盖数值计算、列表处理、字符串处理、整数序列和少量其他数据结构。作者后来发现原始众包数据存在函数签名不标准、题面歧义、测试与描述不完全一致等问题，因此人工整理出 426 个验证题。这一点很重要：代码评测基准的困难不仅来自模型，也来自测试集本身是否能定义清楚“正确程序”。

与竞赛题数据集 APPS 相比，MBPP 更少依赖复杂算法包装，题面更直接，目标是检测模型能否把简单、具体的意图转成 Python 程序。与 HumanEval 相比，MBPP 规模更大，测试格式统一，而且每题都显式给出三个 assert 风格示例。HumanEval 更像手写 docstring 驱动的函数补全，MBPP 更像入门编程题库，因此二者在代码评测中互补：前者偏工程 API 风格，后者偏基础语义覆盖。

> 💡 关键：MBPP 的“算法”本质是一个可执行评测协议。它把代码生成问题从文本匹配变成可运行程序验证，因此 BLEU 或 n-gram 相似度不再是主要标准。

论文还专门分析了测试驱动评测的误差。作者抽查 50 道测试题并额外编写 adversarial tests，发现正常测试通过的解中大约 12% 会在更强测试下失败，说明三条 assert 并不能完全刻画语义。不过绝大多数通过样本仍能泛化到人工补充的边界测试。论文也观察到少数模型会“读懂”assert 并硬编码答案，例如只对测试中出现的 Woodall 数返回 True，这提示 MBPP 不能简单等同于形式化验证。

训练与推理流程也揭示了大模型代码能力的来源。论文的模型并没有专门使用开源代码文件训练，而是在 web、dialog、Wikipedia 混合语料中包含大量问答网站、教程等带代码网页。即使如此，137B 模型在 few-shot 下已经能解决接近 60% 的测试题；在仅 374 个 MBPP 训练样本上低学习率微调 100 步后，性能继续提升。这说明基础语言模型已经学习到相当多 Python 语法和惯用模式，但语义执行、边界条件和测试覆盖仍是瓶颈。

MBPP 对后续 LLM 代码评测的影响在于三个原则：第一，测试程序必须能执行；第二，要允许模型多次采样并用测试筛选候选；第三，评测结果要区分“能否找到一个正确解”和“单次输出是否可靠”。后续很多代码基准的 pass@k 思路都沿用了这种采样执行范式，只是在估计公式、测试集规模和隐藏测试数量上进一步改进。

#### 🧪 练习题

```yaml
question: "MBPP 中 any-sample solved rate 主要衡量什么？"
options:
  - "模型生成代码与参考答案的 BLEU 相似度"
  - "每道题多个采样候选中是否至少有一个通过全部测试"
  - "模型是否记住了训练集中的参考实现"
  - "单个候选程序的平均运行时间"
answer: 1
explain: "MBPP 对每题采样多个程序并执行测试，any-sample 指标统计至少一个候选通过全部 assert 的题目比例。"
```
