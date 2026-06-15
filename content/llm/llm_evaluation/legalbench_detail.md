### LegalBench

```yaml
id: legalbench
name: LegalBench
full_name: 法律推理基准 (LegalBench)
year: '2023'
org: Stanford Law School
paper_url: https://arxiv.org/abs/2308.11462
category: specialized
parent: —
motivation: 162个法律推理任务协同构建
```

#### 📝 一句话总结

LegalBench 提出了由法律专家和 NLP 研究者协作构建的 162 个法律推理任务，解决了法律 LLM 评测过于零散、只覆盖少量合同或案例任务的问题。

#### 🎯 核心要点

- 162 个任务覆盖 issue spotting、rule recall、rule conclusion、interpretation、rhetorical understanding 等法律能力
- 任务来自合同、法规、案例、隐私政策、司法伦理、证据规则、税法和法律文本解释等多种法律材料
- 既包含分类、选择题、抽取，也包含开放生成和 rule application 分析
- 论文比较商业模型与开源模型，并区分 correctness 与 legal analysis 质量
- 研究提示形式影响：规则描述 vs 规则引用、普通语言 vs 法律术语、in-context 示例选择等

#### 🔬 深入细节

![LegalBench 任务规模与输入长度](https://ar5iv.labs.arxiv.org/html/2308.11462/assets/figures/task_input_lengths.png)
*图源：ar5iv 论文 Figure 4，展示 LegalBench 各任务数据规模和输入文本长度差异。*

```python
# LegalBench 评测流程伪代码
def evaluate_legalbench(model, tasks, prompt_policy):
    report = {}
    for task in tasks:  # 162 tasks
        scores = []
        for ex in task.test_examples:
            prompt = build_legal_prompt(
                task_description=task.instruction,
                legal_rule=task.rule_text if prompt_policy.include_rule else None,
                demonstrations=select_icl_examples(task, prompt_policy.k),
                input_text=ex.input,
            )
            output = model.generate(prompt)
            if task.output_type in ["classification", "multiple_choice"]:
                pred = extract_label(output, task.labels)
                scores.append(pred == ex.label)
            else:
                scores.append(grade_generation(output, ex.reference, rubric=task.rubric))
        report[task.name] = aggregate(scores)
    return aggregate_by_reasoning_category(report)
```

LegalBench 的核心动机是法律能力不是单一 QA 能力。律师和法官处理法律文本时，需要识别争点、回忆规则、把规则应用到事实、解释合同或法规措辞、理解判决中的修辞功能。单个合同问答数据集或少量案例分类任务无法覆盖这些能力维度。

基准采用协作式构建：不同贡献者提交任务、数据、说明和评测方式，再按法律推理类型归类。这样形成的任务矩阵更接近法律实践的异质性。形式上，每个任务可看作一个法律函数
$$
f_t: (\text{facts}, \text{legal text}, \text{prompt}) \rightarrow \text{label or analysis},
$$
但不同 \(t\) 的输入长度、标签空间和评分标准差异很大，因此汇总时需要按类别观察，而不是只看一个平均分。

论文特别分析 prompt 对法律模型表现的影响。给出规则全文的 description prompt 往往不同于只引用规则名称的 reference prompt；使用专业法律术语有时帮助模型定位规则，有时也会让非专业模型误解。in-context 示例选择同样会带来显著方差，说明法律任务对提示上下文高度敏感。

LegalBench 与 MedQA、PubMedQA 类似，都属于高风险专业领域评测，但法律任务还有额外的规范性和管辖区问题。同一个术语在不同法域可能含义不同，开放生成答案即使“听起来合理”也可能缺少必要要件分析。因此论文在 rule application 任务中同时考察结论 correctness 和分析质量，避免模型只猜对标签却无法给出法律推理。

#### 🧪 练习题

```yaml
question: "LegalBench 为什么要按法律推理类型组织任务，而不是只报告单一总分？"
options:
  - "因为法律能力包含争点识别、规则回忆、规则适用、解释和修辞理解等不同技能"
  - "因为所有任务输入长度完全相同"
  - "因为法律任务不需要标准答案"
  - "因为只评估模型是否会写代码"
answer: 0
explain: "LegalBench 的 162 个任务覆盖多种法律能力，按推理类型汇总能暴露模型具体短板。"
```
