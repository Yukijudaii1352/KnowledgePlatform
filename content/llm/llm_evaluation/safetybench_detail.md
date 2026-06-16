### SafetyBench：安全性综合评测 (SafetyBench)

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
SafetyBench 提出了一个中英双语、多类别、选择题形式的 LLM 安全理解评测基准，用 11,435 道题覆盖 7 类安全风险，解决开放式安全生成评测成本高、自动判分不稳定的问题。它把“模型是否理解安全边界”转化为可自动抽取答案并计算准确率的标准化测试。

#### 🎯 核心要点
- 数据集包含 11,435 道多项选择题，覆盖中文和英文两种语言
- 覆盖 7 类安全问题：Offensiveness、Unfairness and Bias、Physical Health、Mental Health、Illegal Activities、Ethics and Morality、Privacy and Property
- 题目来源包括已有中英安全数据集、安全相关考试题、ChatGPT 数据增强和人工校验
- 采用 single-correct-answer multiple choice 格式，便于低成本、自动化、稳定评测
- 评测设置包括 zero-shot 与 five-shot，使用规则从模型回复中抽取选项字母
- 测试 25 个中英文 LLM，并额外构造 2,100 题 filtered Chinese subset 以适配严格过滤的中文 API 模型
- 不使用 CoT 评测，因为论文认为 SafetyBench 相比 C-Eval、AGIEval 等通用能力测试更少依赖复杂推理
- 通过把选择题改写为 constrained/open-ended 生成问题，验证 SafetyBench 的安全理解分数与安全生成能力高度相关

#### 🔬 深入细节

![SafetyBench overview](https://raw.githubusercontent.com/thu-coai/SafetyBench/main/figs/overview.png)
*图：SafetyBench 官方仓库中的基准总览，展示 7 类安全问题与中英数据覆盖。*

SafetyBench 的设计选择非常明确：它不直接让模型生成长篇安全回答再由人工或另一个 LLM 打分，而是将安全评测改造成类似 MMLU 的多项选择题。这样做牺牲了一部分开放式交互的真实性，但换来了自动评分、低成本、跨模型可比和中英双语统一。论文认为，安全生成能力背后首先需要安全理解能力：模型必须能识别什么表达有攻击性、什么行为非法、什么建议会损害身心健康、什么选择侵犯隐私或财产。

7 类安全维度来自已有安全风险框架并经过调整。论文排除了 Sensitive Topics，原因是政治类问题在中英文语境下可能存在答案分歧，难以保证跨语言一致标准。保留下来的 7 类更偏向可操作、可判定的安全常识与价值判断：冒犯/攻击性、偏见与不公平、身体健康、心理健康、违法行为、伦理道德、隐私与财产。这种分类让模型评测不再只看 toxicity 或 bias，而是覆盖更接近真实产品安全策略的多维风险面。

数据构造采用三条路径。第一，从已有公开数据集转换为选择题，例如攻击性语言、偏见、道德判断、健康建议等；第二，从考试和安全知识来源中收集题目，使部分样本具有明确规范答案；第三，在样本不足的类别中用 ChatGPT 做数据增强，再经过过滤和人工检查。所有数据都至少经过人工核验，以降低增强数据的噪声。这个流程的重点是让每道题都有唯一正确选项，而不是让模型自由发挥。

```python
# SafetyBench 数据构造伪代码
categories = ["OFF", "UB", "PH", "MH", "IA", "EM", "PP"]
for category in categories:
    raw_items = collect_from_existing_datasets(category)
    raw_items += collect_from_exams_or_safety_sources(category)
    raw_items += chatgpt_augment(category, few_shot_examples=True)

    for item in raw_items:
        question = convert_to_multiple_choice(item, single_correct_answer=True)
        if human_verify(question):
            add_to_safetybench(question)
```

评测时，模型输入为题干和候选项，输出应包含一个选项。系统用规则抽取预测答案；如果无法抽出唯一答案，则随机采样一个选项作为预测。论文指出这类无法抽取的情况通常少于 1%，对总体结果影响很小。形式化地，对 \(N\) 道题，题目为 \(q_i\)，标准答案为 \(a_i\)，模型回复为 \(r_i=M(q_i)\)，抽取函数为 \(\mathrm{ext}(r_i)\)，准确率为：

$$
\mathrm{Acc}=\frac{1}{N}\sum_{i=1}^{N}\mathbb{1}\left[\mathrm{ext}(M(q_i))=a_i\right]
$$

类别准确率则在每个安全类别内部计算：

$$
\mathrm{Acc}_c=\frac{1}{|D_c|}\sum_{(q_i,a_i)\in D_c}\mathbb{1}\left[\mathrm{ext}(M(q_i))=a_i\right]
$$

这种评测形式的优势是稳定，但它也容易被误解为“只测考试能力”。论文为此进一步做了生成相关性验证：从每个类别抽取具有挑战性的中文选择题，改写成 constrained queries 和 open-ended queries，再人工评估模型生成是否安全。结果显示，选择题准确率与 constrained safety generation 的系统级 Pearson correlation 为 0.99，与 open-ended safety generation 的相关性为 0.91。这说明选择题虽然不是开放式红队，但能暴露模型潜在安全理解缺陷。

```python
# SafetyBench zero-shot / five-shot 评测伪代码
for model in evaluated_models:
    for setting in ["zero-shot", "five-shot"]:
        predictions = []
        for sample in safetybench:
            prompt = build_prompt(sample.question, sample.options, setting=setting)
            response = model.generate(prompt, temperature=0)
            pred = extract_single_option(response)
            if pred is None:
                pred = random_choice(sample.options)
            predictions.append(pred)

        report_accuracy(predictions, gold_answers, by_category=True, by_language=True)
```

SafetyBench 的另一个工程细节是 filtered Chinese subset。部分中文 API 模型会对含敏感关键词的问题直接拒答，导致无法在完整测试集上公平比较。论文因此删除高度敏感关键词样本，并为每个类别选择 300 道题，形成总计 2,100 道题的中文过滤子集。这个做法不是降低安全标准，而是区分“API 入口过滤导致无法回答”和“模型本身是否理解安全选项”，让被严格过滤的线上模型仍可纳入比较。

实验结论显示，GPT-4 在整体上显著领先，很多开源或较小模型仍有明显安全理解缺口；同时不同语言和不同类别之间差异很大。中文机构模型通常在中文数据上表现更好，而 GPT 系列在中英之间更均衡。GPT-4 在 Unfairness and Bias 上也会出错，论文分析认为部分错误来自对隐晦词汇、社会事件或“客观描述偏见现象”与“表达偏见”之间差异的理解不足。这提醒我们，安全评测不是简单关键词检测，而需要语义、语境和规范判断的结合。

> 💡 关键：SafetyBench 的方法论是用选择题稳定测量安全理解，再用生成相关性实验证明这种理解分数与安全生成能力有关。它与 HarmBench 的自动红队互补：SafetyBench 更像“安全常识考试”，HarmBench 更像“攻击压力测试”。

#### 🧪 练习题
```yaml
question: "SafetyBench 采用多项选择题形式的主要原因是什么？"
options:
  - "让安全评测可以自动判分、低成本且跨模型可比较"
  - "让模型必须输出完整安全解释"
  - "替代所有开放式红队测试"
  - "避免覆盖中文数据"
answer: 0
explain: "SafetyBench 通过唯一正确选项和规则化答案抽取降低评测成本与判分噪声，使 25 个中英文模型可以在统一设置下比较。"
```
