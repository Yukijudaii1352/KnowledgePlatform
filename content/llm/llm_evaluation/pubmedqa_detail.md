### PubMedQA

```yaml
id: pubmedqa
name: PubMedQA
full_name: 生物医学文献问答 (PubMed Question Answering)
year: '2019'
org: Georgia Tech
paper_url: https://arxiv.org/abs/1909.06146
category: specialized
parent: medqa
motivation: 生物医学文献理解与推理评测
```

#### 📝 一句话总结

PubMedQA 提出了基于 PubMed 摘要的生物医学研究问答任务，将论文标题问题、摘要上下文和 yes/no/maybe 答案结合起来，解决了医学文献理解中缺少可监督推理基准的问题。

#### 🎯 核心要点

- 每个样本由研究问题、结构化摘要上下文、长答案和 yes/no/maybe 短答案组成
- 数据分为 PQA-L 人工标注、PQA-U 未标注和 PQA-A 自动生成三个子集
- 问题来自 PubMed 论文标题，摘要结论部分作为长答案来源，正文摘要作为证据上下文
- 论文提出多阶段微调：先用自动数据，再用未标注伪标签，最后用少量人工标注数据
- 评测关注生物医学文献中的因果、比较、相关性和统计结论推断

#### 🔬 深入细节

![PubMedQA 数据集结构](https://ar5iv.labs.arxiv.org/html/1909.06146/assets/x1.png)
*图源：ar5iv 论文 Figure 2，展示 PubMedQA 的 PQA-A、PQA-U、PQA-L 三个子集结构。*

```python
# PubMedQA 数据构建与评测伪代码
def build_pubmedqa(pubmed_articles):
    examples = []
    for article in pubmed_articles:
        question = article.title  # 通常是研究问题式标题
        context = article.abstract_without_conclusion
        long_answer = article.conclusion
        short_answer = annotate_yes_no_maybe(question, context, long_answer)
        examples.append((question, context, long_answer, short_answer))
    return examples

def evaluate_pubmedqa(model, examples):
    correct = 0
    for q, context, _, label in examples:
        prompt = f"Question: {q}\nContext: {context}\nAnswer yes, no, or maybe:"
        pred = normalize(model.generate(prompt), labels=["yes", "no", "maybe"])
        correct += int(pred == label)
    return correct / len(examples)
```

PubMedQA 的任务设计非常贴合生物医学论文阅读。很多 PubMed 论文标题本身就是一个问题，例如某种治疗是否有效、某个指标是否相关。摘要的背景、方法、结果提供证据，而结论段回答问题。数据集把这种天然结构抽取出来，形成“问题 + 上下文 + 答案”的监督样本。

三个子集体现了标注成本与规模的权衡。PQA-L 由专家人工标注，质量最高但规模小；PQA-U 有问题和上下文但无标签；PQA-A 通过规则从陈述式标题和摘要中自动生成问题与答案，规模大但噪声更高。多阶段训练利用大规模弱监督预热，再用高质量标注校正。

论文中的多阶段微调可理解为逐步改变训练分布：
$$
\theta_1 \leftarrow \text{train}(\theta_0,\text{PQA-A}),\quad
\theta_2 \leftarrow \text{train}(\theta_1,\text{pseudo(PQA-U)}),\quad
\theta_3 \leftarrow \text{train}(\theta_2,\text{PQA-L}).
$$
这样做的直觉是先学习生物医学摘要语言和 yes/no/maybe 任务格式，再用人工标注提高精确推理。

与 MedQA 的考试题不同，PubMedQA 更重视文献证据解释。它不要求模型直接记忆医学事实，而是根据给定摘要判断研究结论。难点包括统计结果是否支持标题问题、摘要中是否存在条件限制，以及结论是肯定、否定还是不确定。这个结构使它成为医学 RAG、论文阅读模型和科学事实推理的重要基准。

#### 🧪 练习题

```yaml
question: "PubMedQA 中 PQA-L、PQA-U、PQA-A 三个子集的主要区别是什么？"
options:
  - "分别对应人工标注、未标注和自动生成的数据来源"
  - "分别对应中文、英文和法文问题"
  - "分别对应代码、数学和法律任务"
  - "只有 PQA-A 包含摘要上下文"
answer: 0
explain: "PQA-L 是专家标注，PQA-U 未标注，PQA-A 自动生成；三者用于平衡质量和规模。"
```
