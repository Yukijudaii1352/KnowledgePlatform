### MedQA

```yaml
id: medqa
name: MedQA
full_name: 医学问答评测 (Medical Question Answering)
year: '2020'
org: UCSD
paper_url: https://arxiv.org/abs/2009.13081
category: specialized
parent: —
motivation: 基于USMLE执业医师考试诊断能力
```

#### 📝 一句话总结

MedQA 提出了基于中英文医学执业考试的开放域多选问答基准，解决了医学 QA 数据集规模小、临床病例推理弱、难以评估专业诊断知识的问题。

#### 🎯 核心要点

- 数据来自 USMLE、MCMLE、TWMLE 等医学执业考试，覆盖英文和中文医学问答
- 题目多为多选医学诊断、治疗、病理和药理问题，许多是临床病例型描述
- 论文同时构建医学教材与网页文档集合，用于检索增强的 open-domain QA
- 区分单知识点题和真实临床场景题，后者需要多步证据整合和诊断推理
- 评测以选项准确率为主，检索系统还分析 top-N 段落中是否包含完整或部分证据

#### 🔬 深入细节

图源/公开页面：MedQA 论文的示例题和统计主要以表格呈现，公开 ar5iv 页面可访问：[MedQA Table 1 示例题](https://ar5iv.labs.arxiv.org/html/2009.13081#S1.T1) 与 [论文页面](https://arxiv.org/abs/2009.13081)。

```text
MedQA 评测流程示意
医学考试题干/病例
    -> 候选答案 A/B/C/D/E
    -> 可选：从医学文档集合检索 top-N 证据段落
    -> 模型基于题干、选项和证据预测答案
    -> 与考试标准答案比较准确率
```

```python
# MedQA open-domain 多选评测伪代码
def evaluate_medqa(model, retriever, examples, use_retrieval=True):
    correct = 0
    evidence_stats = []
    for ex in examples:
        evidence = []
        if use_retrieval:
            evidence = retriever.search(ex.question + " " + " ".join(ex.options), top_n=25)
            evidence_stats.append(contains_medical_evidence(evidence, ex.gold_rationale))
        prompt = format_medical_mcq(
            question=ex.question,
            options=ex.options,
            evidence=evidence[:5],
        )
        response = model.generate(prompt)
        pred = extract_option(response, valid_options=ex.option_labels)
        correct += int(pred == ex.answer)
    return correct / len(examples), summarize(evidence_stats)
```

MedQA 的关键背景是医学问答不是普通事实检索。许多题目以病例形式给出年龄、症状、实验室指标、病史和治疗反应，要求模型先判断疾病机制或诊断方向，再选择最合适的检查、药物或治疗。题目表面信息很长，但真正决定答案的往往是少数医学线索。

论文把任务设为 open-domain QA，是因为只看题干可能无法区分模型是否真正掌握医学知识。检索系统先从医学材料中取回相关段落，再让阅读理解模型或分类模型结合题干和证据做选择。形式上可以写作：
$$
\hat{y}=\arg\max_{y\in\mathcal{Y}} p_\theta(y\mid q,\mathcal{R}(q),\mathcal{Y}),
$$
其中 \(\mathcal{R}(q)\) 是检索到的医学证据集合。

MedQA 的难点在证据和推理的错位。检索段落可能包含疾病名称却没有完整解释，也可能找到相关症状但缺少关键鉴别诊断。论文因此人工分析 top-25 证据是否足够，并区分 full evidence、partial evidence 和 no evidence。这说明医学 QA 的瓶颈既在检索覆盖，也在模型对临床证据链的组合能力。

与 PubMedQA 相比，MedQA 更接近医学考试和临床诊断，答案来自固定选项；PubMedQA 则更偏生物医学论文摘要理解，答案是 yes/no/maybe。MedQA 因此常用于评估医学大模型的执业考试能力，但它仍是离线考试基准，不能替代真实临床安全评估。

#### 🧪 练习题

```yaml
question: "MedQA 中 open-domain 设置的核心挑战是什么？"
options:
  - "只需要背诵选项字母分布"
  - "需要从医学文档中检索相关证据，并把病例线索与专业知识结合后选择答案"
  - "所有问题都可以用单句常识直接回答"
  - "评测不需要标准答案"
answer: 1
explain: "MedQA 题目常是临床病例型多选题，检索证据和医学推理都影响最终准确率。"
```
