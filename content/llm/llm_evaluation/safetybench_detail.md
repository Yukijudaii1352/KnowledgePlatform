### SafetyBench

```yaml
id: safetybench
name: SafetyBench
full_name: 安全性综合评测 (SafetyBench)
year: "2023"
org: 清华大学
paper_url: https://arxiv.org/abs/2309.07045
category: alignment
parent: harmbench
motivation: 非法行为仇恨言论等多维安全评测
```

#### 📝 一句话总结

SafetyBench 构建中英双语、多安全类别的选择题基准，用 11,435 道问题评估 LLM 对非法行为、仇恨言论、隐私等安全风险的理解能力。

#### 🎯 核心要点

- 包含 11,435 道多选题，覆盖 7 类安全风险
- 同时提供中文和英文数据，支持双语安全理解能力评估
- 题目采用 A/B/C/D 选择形式，便于自动抽取答案并计算准确率
- 论文测试 25 个中英文 LLM，在 zero-shot 和 five-shot 设置下比较表现
- 不以 CoT 为默认协议，因为 SafetyBench 更偏安全知识理解而非复杂推理
- 研究发现 SafetyBench 得分与安全生成能力有相关性，但当前模型仍有明显提升空间

#### 🔬 深入细节

![SafetyBench 总览](https://raw.githubusercontent.com/thu-coai/SafetyBench/main/figs/overview.png)
*图：SafetyBench 官方仓库中的总体设计图，展示安全类别、双语数据和评测流程。*

```python
# SafetyBench 多选安全理解评测伪代码
for question in safetybench:
    prompt = build_mcq_prompt(
        question=question.text,
        options=question.options,
        language=question.language,
        shots=sample_dev_examples(k=0 or 5),
    )
    response = model.generate(prompt)
    pred = extract_option(response, mapping={"A": 0, "B": 1, "C": 2, "D": 3})
    correct = pred == question.answer
    metrics[question.category][question.language].append(correct)

report_accuracy(metrics, by=["category", "language", "shot_setting"])
```

##### 动机与背景

LLM 安全性不仅取决于是否会拒绝恶意请求，也取决于模型是否理解安全边界。例如同一段文本可能涉及违法、隐私、仇恨或自伤风险；模型如果不能识别风险类型，就难以在生成阶段执行稳定的安全策略。

SafetyBench 选择多选题形式，是为了把安全理解能力做成高覆盖、低成本、可复现的评测。开放生成题更贴近真实交互，但评分难；多选题牺牲一部分交互真实性，换来大规模自动评估和稳定排行榜。

##### 核心机制

每道题包含题干、最多四个选项、答案和安全类别。评测 prompt 在 zero-shot 或 five-shot 下要求模型输出选项，随后用规则抽取 A/B/C/D 并映射为 0/1/2/3。类别和语言维度的分数可以揭示模型在不同安全知识上的偏差。

该基准的目标函数可以理解为分类准确率：

$$Acc_c=\frac{1}{|D_c|}\sum_{(x,y)\in D_c}\mathbb{1}[\text{extract}(f_\theta(x))=y]$$

其中 \(c\) 是安全类别，\(D_c\) 是该类别题目集合。

##### 双语评测价值

许多安全评测以英文为主，容易高估多语场景下的安全能力。SafetyBench 同时包含中文和英文题目，可以检查模型是否只在英文安全语料上对齐较好，而在中文表达、文化语境或本地法规相关问题上表现下降。

##### 与 HarmBench 的区别

SafetyBench 测量“安全理解”，HarmBench 测量“对抗输入下的安全行为”。一个模型可能在 SafetyBench 上知道正确安全原则，但在越狱攻击下仍输出有害内容；也可能拒答很强但对安全知识题回答不稳。两者应互补使用。

> 💡 关键：SafetyBench 的选择题准确率是安全能力的必要信号，不是完整安全认证。

#### 🧪 练习题

```yaml
question: "SafetyBench 默认不强调 CoT 评测的主要原因是什么？"
options:
  - "它主要测安全知识理解，推理链不是核心瓶颈"
  - "所有题目都没有正确答案"
  - "CoT 会让选择题无法自动评分"
  - "它只评测英文模型"
answer: 0
explain: "SafetyBench 官方协议以 zero-shot 和 five-shot 多选为主，因为任务更偏安全知识判断，而不是像 MMLU 那样的复杂通用推理。"
```
