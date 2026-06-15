### MMLU-Pro

```yaml
id: mmlu_pro
name: MMLU-Pro
full_name: MMLU专业版 (MMLU-Pro)
year: "2024"
org: TIGER Lab
paper_url: https://arxiv.org/abs/2406.01574
category: frontier_2026
parent: mmlu
motivation: 10选项12K研究生级问题难度升级
```

#### 📝 一句话总结

MMLU-Pro 在 MMLU 基础上扩展更难、更偏推理的多学科题目，并把选项从 4 个增加到 10 个，使模型准确率显著下降且对提示变化更稳定。

#### 🎯 核心要点

- 包含超过 12,000 道严格筛选的问题，覆盖 14 个学科领域
- 从 4 选项扩展到 10 选项，随机猜测概率从 25% 降到 10%
- 移除 MMLU 中部分平凡、噪声和低区分度题目，加入更多考试和教材来源的推理题
- 相比原 MMLU，模型准确率下降约 16% 到 33%，区分度更强
- 测试 24 种 prompt 风格后，分数敏感性从 MMLU 的 4-5% 降到约 2%
- CoT 在 MMLU-Pro 上更有帮助，说明题目更依赖多步推理而非直接知识回忆

#### 🔬 深入细节

![MMLU-Pro 数据构建与评测概览](https://ar5iv.labs.arxiv.org/html/2406.01574/assets/x1.png)
*图：MMLU-Pro 论文公开 HTML 图源，概览从 MMLU 到更难十选项评测的升级。*

```python
# MMLU-Pro 构造与评测伪代码
for raw_question in candidate_sources:
    if is_trivial(raw_question) or is_noisy(raw_question):
        continue
    question = rewrite_or_validate(raw_question)
    options = expand_to_ten_choices(question, hard_distractors=True)
    if passes_quality_review(question, options):
        mmlu_pro.append((question, options, gold_answer, subject))

for model in models:
    for question in mmlu_pro:
        prompt = format_10_option_mcq(question, style=prompt_style, cot=use_cot)
        response = model.generate(prompt)
        pred = extract_answer(response, choices=list("ABCDEFGHIJ"))
        score[model] += int(pred == question.gold_answer)
```

##### 动机与背景

MMLU 曾长期是多学科知识评测的核心基准，但随着模型能力提升，许多题目逐渐失去区分度。更严重的是，四选项多选题随机猜测概率较高，且部分题目可以通过表层线索或低难度知识解决，导致排行榜分数接近饱和。

MMLU-Pro 的目标是延长基准寿命。它不是完全抛弃 MMLU 的多学科框架，而是在题目质量、干扰项数量和推理难度上升级，使模型必须在更大候选集合中完成更稳健的判断。

##### 核心机制

十选项设计有两个作用：降低随机猜测收益，并增加干扰项之间的细粒度区分。若题目只有一个明显错误的干扰项，模型可以排除法得分；十个选项要求模型更准确地理解概念边界、公式条件和题干约束。

评测仍使用准确率：

$$Acc=\frac{1}{N}\sum_{i=1}^{N}\mathbb{1}[\hat{a}_i=a_i]$$

但由于选项数增加、题目更难，分数更能拉开模型差距。

##### 稳定性与 CoT

论文系统测试 24 种 prompt 风格，发现 MMLU-Pro 的分数波动小于原 MMLU。这说明题目不再那么容易被提示措辞影响，评测更接近模型真实能力。与此同时，CoT 在 MMLU-Pro 上更有价值，表明新题更需要推理过程。

##### 与 MMLU 的区别

MMLU-Pro 继承 MMLU 的广域学科覆盖，但更接近“专业考试中的困难选择题”。它对模型提出三重要求：知识面足够广、推理链足够稳、最终答案抽取足够规范。因此它常被用作 2024 之后通用能力排行榜中替代或补充 MMLU 的指标。

> ⚠️ 注意：MMLU-Pro 仍是闭式多选题，不能覆盖开放式写作、工具使用或长程任务执行能力。

#### 🧪 练习题

```yaml
question: "MMLU-Pro 将选项从 4 个增加到 10 个的主要效果是什么？"
options:
  - "提高随机猜测准确率"
  - "降低随机猜测收益，并用更多干扰项提升题目区分度"
  - "让所有题目都变成开放问答"
  - "取消答案抽取步骤"
answer: 1
explain: "十选项把随机猜测概率降到 10%，也迫使模型在更多相近干扰项中做专业判断。"
```
