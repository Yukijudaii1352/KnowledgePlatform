### SciBench

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

SciBench 提出大学水平科学问题求解基准，用教材题、标准答案和错误能力归因协议评估 LLM 在数学、物理、化学等复杂科学计算上的真实推理能力。

#### 🎯 核心要点

- 数据集包含 695 道大学教材级科学问题，来源覆盖数学、物理、化学等课程材料
- 问题需要公式建模、单位换算、多步计算和领域知识，不再停留在高中级选择题或简单代数
- 评测比较 zero-shot、few-shot、CoT、Python、Wolfram 等多种提示/工具设置
- 论文引入十类科学解题能力错误归因，用 LLM verifier 辅助分析模型错在概念、公式、计算还是推理链
- 最佳整体成绩仍较低，说明前沿 LLM 在科学问题求解上存在系统性短板

#### 🔬 深入细节

![SciBench 评测协议流程](https://raw.githubusercontent.com/mandyyyyii/scibench/main/assets/pipeline.jpg)
*图：SciBench 官方仓库中的评测协议示意，展示错误归因与能力画像生成流程。*

```python
# SciBench 评测与错误归因伪代码
for problem in scibench:
    prompt = format_science_problem(problem, strategy)
    solution = llm.generate(prompt)
    pred_answer = normalize_numeric_or_symbolic_answer(solution)
    is_correct = compare_with_gold(pred_answer, problem.gold_answer, tolerance=problem.tolerance)

    if not is_correct:
        error_label = llm_verifier.classify_error(
            problem=problem.text,
            model_solution=solution,
            reference_solution=problem.reference_solution,
            taxonomy=ten_science_skills,
        )
        error_profile[error_label] += 1

accuracy = sum(correct) / len(scibench)
analyze_by_subject_and_error_type(accuracy, error_profile)
```

##### 动机与背景

传统科学/数学评测常常偏向高中题和短链代数运算，模型可以靠模式匹配、公式记忆或近似语言线索取得不错分数。大学教材题不同：题干往往要求先识别物理定律或化学关系，再把自然语言转成方程，最后完成带单位的多步计算。

SciBench 因此把评测对象从“是否知道某个事实”提升到“能否完成科学问题求解”。这种设置更接近研究和工程中的实际需求：错误可能发生在建模、推导、数值计算、单位处理、边界条件理解等多个环节，最终答案错并不能直接说明模型缺少哪种能力。

##### 核心机制

数据构造以教材问题为基础，每题包含题干、参考解法和最终答案。评测时模型输出解题过程与答案，系统再进行答案抽取和数值/符号匹配。对数值题，容差匹配很关键，因为科学计算中等价表达、有效数字和单位换算都会影响最终形式。

错误归因是 SciBench 的方法重点。论文预先定义十类科学问题求解能力，例如概念理解、公式选择、代数推导、数值计算、单位换算、条件识别等。对错题，评估器比较模型解法与参考解法，给出主要失败能力，从而形成可解释的能力画像。

##### 提示策略与工具使用

SciBench 比较多种推理设置，原因是科学题的瓶颈不一定只在语言模型本身。CoT 可以帮助模型显式展开推导，Python 和 Wolfram 可以减少算术错误，但工具只有在模型正确建模和调用时才有收益。若模型一开始选错公式，后续计算工具只会更精确地算出错误答案。

从公式角度看，模型需要近似完成一个组合映射：

$$q \rightarrow \text{law/formula} \rightarrow \text{equations} \rightarrow \text{numeric/symbolic answer}$$

其中任何一步的局部错误都会传播到最终答案。SciBench 的错误分类正是为了把这个链条拆开观察。

##### 与传统基准的区别

与 MMLU 或普通科学问答相比，SciBench 更强调开放式计算和参考解法对齐；与纯数学竞赛题相比，它又保留了物理、化学等自然科学中的单位、常数和实验语境。它不是只问“哪个选项正确”，而是检查模型能否把科学文本转化为可执行的解题程序。

> ⚠️ 注意：SciBench 的高质量分析依赖答案归一化和错误归因质量。若模型输出格式极不稳定，自动抽取本身也会成为评测误差来源。

#### 🧪 练习题

```yaml
question: "SciBench 的错误归因协议主要解决什么问题？"
options:
  - "把所有错题统一归为模型知识不足"
  - "识别模型在科学解题链条中主要失败的能力类型"
  - "用人工评分替代所有自动评分"
  - "让模型跳过公式推导直接输出选项"
answer: 1
explain: "SciBench 不只统计最终答案正确率，还尝试定位模型错在概念、公式、计算、单位等具体环节。"
```
