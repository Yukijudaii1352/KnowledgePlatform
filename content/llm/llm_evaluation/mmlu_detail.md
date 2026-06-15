### MMLU

```yaml
id: mmlu
name: MMLU
full_name: 大规模多任务语言理解 (Massive Multitask Language Understanding)
year: '2021'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2009.03300
category: general
parent: —
motivation: 57学科多选题覆盖，奠定多任务知识评测标准
```

#### 📝 一句话总结

MMLU 提出了覆盖 57 个学科的多项选择知识与推理评测，解决了旧基准学科窄、难度低、容易被单一任务训练饱和的问题，成为衡量大模型通识能力的核心标准。

#### 🎯 核心要点

- 57 个任务横跨 STEM、人文、社会科学和其他专业领域，题目难度从高中到专业资格考试
- 每题采用四选一形式，便于统一使用准确率评估生成式或打分式语言模型
- 数据集包含少量 few-shot development 样例、验证集和大规模测试集，避免只在单任务上调参
- 评测关注跨学科平均准确率，而不是某个单点任务，强调世界知识和问题求解能力
- 论文展示 GPT-3 等模型在多数科目上仍接近随机或只略高于随机，说明真实知识掌握远未饱和

#### 🔬 深入细节

![MMLU 与其他基准的缩放趋势对比](https://ar5iv.labs.arxiv.org/html/2009.03300/assets/x2.png)
*图源：ar5iv 论文 Figure 1(b)，展示 MMLU 相比 HellaSwag、SuperGLUE 更难随模型规模平滑提升。*

```python
# MMLU 评测流程伪代码
def evaluate_mmlu(model, subjects, k_shot=5):
    all_scores = []
    for subject in subjects:  # 57 subjects
        demos = load_dev_examples(subject, k=k_shot)
        for item in load_test_examples(subject):
            prompt = format_prompt(
                subject=subject,
                demos=demos,
                question=item.question,
                choices=item.choices,  # A/B/C/D
            )
            # 生成式模型可直接生成选项；语言模型也可比较每个选项的条件 logprob
            scores = {
                option: model.logprob(prompt + option)
                for option in ["A", "B", "C", "D"]
            }
            pred = argmax(scores)
            all_scores.append(pred == item.answer)
    return mean(all_scores)
```

MMLU 的动机是把语言模型从“单一 NLP 能力”评测拉回到更接近考试式通识能力的场景。早期基准往往只覆盖阅读理解、自然语言推理或常识推断中的某一类能力，模型可以通过任务特定微调、数据模式学习或浅层提示获得高分。MMLU 则把题目扩展到抽象代数、专业医学、商业伦理、国际法、美国历史等 57 个科目，要求模型同时具备事实记忆、概念辨析和多步推理。

核心机制并不复杂，但设计非常有效：所有题目都规约成多选题，给定问题 \(q\) 和候选答案 \(a_1,\dots,a_4\)，模型预测
$$
\hat{a}=\arg\max_{a_i} p_\theta(a_i \mid q, \text{few-shot examples}).
$$
这种形式让 decoder-only 语言模型可以通过选项 log-likelihood 评测，也让指令模型可以用自由生成后解析选项。多选形式牺牲了一部分开放生成的表达空间，但换来了跨学科、跨模型、跨年份的可复现比较。

MMLU 的另一个关键点是“多任务平均”。论文不仅报告整体准确率，也按 STEM、Humanities、Social Sciences、Other 分组观察模型短板。若一个模型只在常识或文本理解上强，但在数学、法律或医学上弱，综合分会直接反映出来。这个设计使 MMLU 成为大模型能力雷达图中的基础维度，而不是单一排行榜分数。

与传统 QA 数据集相比，MMLU 更像“冻结的能力抽样器”：题目来自真实考试和教材体系，测试集足够大，每个学科至少有一定数量的测试题，few-shot 样例只是帮助模型理解格式而非训练新知识。因此它特别适合评估预训练模型是否已经在参数中内化了广泛知识，也能暴露模型在校准、跨学科迁移和专业知识覆盖上的不均衡。

#### 🧪 练习题

```yaml
question: "MMLU 相比单一阅读理解或自然语言推理基准的核心优势是什么？"
options:
  - "把 57 个跨学科多选任务统一到同一评测协议下，能观察模型通识知识和推理能力"
  - "只评估模型是否能生成长文本解释"
  - "主要通过人工偏好评分判断回答是否自然"
  - "完全依赖训练集微调后的任务内准确率"
answer: 0
explain: "MMLU 的贡献在于跨学科、多任务、统一多选评测；它不依赖开放式人工评分，也不是任务内微调基准。"
```
