### SciBench：科学问题求解评测 (Science Benchmark)
```yaml
id: scibench
name: SciBench
full_name: 科学问题求解评测 (Science Benchmark)
year: "2023"
org: UCLA
paper_url: https://arxiv.org/abs/2307.10635
category: specialized
parent: —
motivation: 大学水平物理化学生物复杂计算
```

#### 📝 一句话总结
SciBench 提出了面向大学水平科学问题求解的开放式评测套件，用数学、物理、化学中的复杂计算、多步推理和视觉上下文问题检验 LLM，而不是只考高中代数或选择题。它进一步把错误归因到 10 类科学问题求解能力，揭示 CoT、few-shot 与外部工具并不会一致提升所有能力。

#### 🎯 核心要点
- 数据集包含 789 道大学教材题，覆盖 10 本数学、物理、化学教材，并保留 94 道带图表或示意图的多模态子集。
- 另有 103 道来自 7 套大学课程期中/期末考试的 closed exam 子集，用来降低训练语料泄漏风险。
- 题型以开放式 free-response 数值答案为主，强调微积分、微分方程、统计推断、量子/热力学等复杂计算。
- 评测代表性开源和闭源模型，包括 LLaMA-2、Mistral、Claude2、GPT-3.5、GPT-4、GPT-4-Turbo 以及多模态 LMM。
- 提示策略覆盖 zero-shot、few-shot、Chain-of-Thought、Program/Python 工具调用和 Wolfram Language 工具调用。
- 自动评分对模型输出抽取数值答案，并允许 5% relative tolerance；考试子集则按教师 rubric 给分。
- 错误分析把错误归因为 10 类能力缺口：逻辑分解、假设识别、空间感知、因果推理、问题演绎、抽象推理、科学素养、代码转换、逻辑推理、计算能力。
- 实验发现最强配置在文本教材集上仍只有 43.22% 平均分，多模态子集 GPT-4(PoT) 为 13.8%，说明当前 LLM 距离可靠科学求解仍有明显差距。

#### 🔬 深入细节
![SciBench 评测与错误归因流程](https://ar5iv.labs.arxiv.org/html/2307.10635/assets/x3.png)
*图：SciBench 的评测协议。模型解答和参考解答先由人工分析错误，再总结为科学问题求解技能集合，最后由 LLM verifier 对大规模错误进行归因。*

```python
# SciBench 核心评测与错误归因伪代码
for problem in scibench_dataset:
    prompt = build_prompt(problem, strategy="zero-shot|few-shot|CoT|tool")
    model_solution = llm.generate(prompt, temperature=0)
    pred = extract_numeric_answer(model_solution)
    gold = normalize_numeric_answer(problem.gold_answer)

    # 教材集采用 5% 相对误差容忍；考试集按 instructor rubric 评分
    correct = relative_error(pred, gold) <= 0.05
    record_score(problem.subject, problem.source, strategy, correct)

    if not correct and problem.has_reference_solution:
        evidence = {
            "question": problem.text,
            "reference_solution": problem.solution,
            "model_solution": model_solution,
        }
        missing_skill = llm_verifier.classify(evidence, skill_set_10)
        record_error_profile(strategy, missing_skill)
```

SciBench 的动机来自一个明确缺口：许多早期科学/数学评测虽然看似困难，但大量问题只要求高中层面的代数操作、标准选择题识别，或者可通过背诵式知识完成。论文把目标改为“大学水平科学问题求解”，要求模型理解题意、选择正确物理/化学/数学公式、进行多步推导、处理高阶计算，并在部分题目中解析图像、图表或空间结构。评测对象因此不再只是语言理解，而是完整的科学解题链路。

其数据构造强调三点。第一，问题来自被广泛使用的大学教材和真实课程考试，覆盖 Calculus、Probability、Differential Equations、Fundamentals of Physics、Physical Chemistry、Quantum Chemistry 等来源。第二，教材题被整理成 LaTeX 文本，答案统一成可比较的数值形式；对于科学记数法，方法会把数量级视为答案单位的一部分，避免简单字符串比较造成溢出或格式误判。第三，closed exam 子集来自大学课程考试且手工抽取，目的不是扩大规模，而是模拟低泄漏、接近真实课程评测的场景。

自动评分可以抽象为数值容忍匹配：

$$
\operatorname{score}(i)=\mathbb{1}\left[\frac{|\hat{y}_i-y_i|}{\max(|y_i|,\epsilon)}\le 0.05\right]
$$

其中 \(\hat{y}_i\) 是从模型解答中抽取并标准化后的数值答案，\(y_i\) 是参考答案，\(\epsilon\) 用于避免真值接近 0 时相对误差不稳定。这个设计比 exact string match 更适合科学计算，因为同一个结果可能写成小数、分数近似、带单位或科学计数法。但它也刻意限制在“可自动判分”的单数值答案上，牺牲了一部分开放推导题的表达多样性，以换取大规模、可复现的模型比较。

论文并没有只比较模型总分，而是系统测试不同提示策略。CoT 能让模型显式展开推理，但不保证公式选取和条件理解正确；Python/PoT 能减少纯数值计算错误，却会引入“把自然语言推导错误翻译成程序”的新风险；Wolfram 这类科学计算工具理论上更强，但模型生成语法、变量和公式转换时仍可能失败。SciBench 的关键结论正是这种能力错配：一个策略可能降低计算错误，同时提高代码转换、因果判断或逻辑分解错误。

错误归因部分是 SciBench 区别于普通排行榜的核心机制。作者先人工检查 GPT-3.5 的错误解答，定位哪一步出错以及出错原因，再借助 GPT-4 总结出 10 类科学问题求解能力。之后用 GPT-3.5 作为 verifier，根据问题、参考解答和模型解答判断缺失能力，并让人工复核，剔除约 20% 被认为不正确的分类。这样得到的 error profile 可以解释“为什么某个设置涨分或掉分”，而不是只报告最终 accuracy。

论文中的示例也说明了工具增强的局限。以黑体辐射的 Planck 分布题为例，模型需要比较两个波长下的能量输出，核心关系可写为：

$$
B(\lambda,T)=\frac{2hc^2}{\lambda^5}\frac{1}{e^{hc/(\lambda kT)}-1},\qquad
R=\frac{B(450\text{ nm},298\text{ K})}{B(700\text{ nm},298\text{ K})}
$$

CoT 可能写出正确形式却在数值上算错，Python 工具提示则可能把公式中的指数项或分子分母位置翻译错。直觉上，外部工具只保证“给定正确程序后算得准”，不能保证模型把科学概念、变量含义和数学结构正确地转写成程序。

与 MMLU、GSM8K、MATH、ScienceQA 等基准相比，SciBench 的创新不在于数据规模最大，而在于问题形态更接近真实科学学习和研究前置技能：开放数值答案、多学科大学教材、多模态上下文、工具调用评测和错误能力剖面。它因此适合判断一个 LLM 是否真的会解决科学问题，而不是只会在熟悉题型中选择看起来合理的答案。

> 💡 关键：SciBench 的结论不是“CoT 或工具没用”，而是“科学问题求解由多个能力瓶颈串联组成”。只优化计算环节，可能仍然被公式理解、假设识别、空间感知或代码转换环节卡住。

#### 🧪 练习题
```yaml
question: "SciBench 为什么要引入 10 类错误能力归因，而不是只报告 accuracy？"
options:
  - "因为所有题目都无法自动判分"
  - "因为同样的总分可能来自不同能力瓶颈，需要解释提示策略提升或伤害了哪些技能"
  - "因为 SciBench 只评测多模态模型，不评测文本模型"
  - "因为外部工具总能保证科学题解答正确"
answer: 1
explain: "SciBench 发现 CoT、few-shot 和工具调用对不同能力的影响不一致；错误归因能揭示总分背后的具体缺陷。"
```
