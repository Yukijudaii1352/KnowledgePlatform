### C-Eval

```yaml
id: c_eval
name: C-Eval
full_name: 中文综合能力评测 (Chinese Evaluation Suite)
year: '2023'
org: 清华大学/上海交通大学
paper_url: https://arxiv.org/abs/2305.08322
category: general
parent: mmlu
motivation: 中文学术能力4级难度分层评测
```

#### 📝 一句话总结

C-Eval 提出了覆盖 52 个中文学科、四级难度分层的多选评测套件，解决了 MMLU 主要面向英文知识体系、难以衡量中文教育与专业考试能力的问题。

#### 🎯 核心要点

- 13,948 道中文多选题覆盖 52 个学科，分为中学、高中、大学、专业四个难度层级
- 题目覆盖人文、社科、理工和其他专业考试，并包含面向中国教育与职业资格的知识点
- 提供 C-Eval Hard 子集，挑选高级数学、物理、化学等更依赖推理的困难科目
- 评测设置包含 zero-shot、five-shot answer-only 和 five-shot chain-of-thought
- 开发集带解释，可用于 few-shot 示例；测试集隐藏答案，降低排行榜过拟合风险

#### 🔬 深入细节

![C-Eval 学科与难度总览](https://ar5iv.labs.arxiv.org/html/2305.08322/assets/x1.png)
*图源：ar5iv 论文 Figure 1，展示 C-Eval 的 52 个学科以及四级难度分层。*

```python
# C-Eval 评测流程伪代码
def evaluate_ceval(model, subjects, mode="five_shot_ao"):
    results = {}
    for subject in subjects:
        dev = load_dev_examples(subject)  # 带解释，可构造 few-shot
        test = load_test_examples(subject)
        correct = 0
        for item in test:
            prompt = build_chinese_exam_prompt(
                examples=dev[:5] if "five_shot" in mode else [],
                question=item.question,
                choices=item.choices,
                use_cot=(mode == "five_shot_cot"),
            )
            response = model.generate(prompt)
            pred = extract_choice(response, choices=["A", "B", "C", "D"])
            correct += int(pred == item.answer)
        results[subject] = correct / len(test)
    return macro_average(results)
```

C-Eval 的背景是中文大模型快速出现后，缺少一个能像 MMLU 一样稳定比较“广泛学科知识”的中文基准。直接翻译英文题会引入文化、术语和教育体系偏差；使用公开高考或资格考试题又容易造成训练污染。C-Eval 因此从中文考试语境中构建多学科题库，并把题目按教育阶段和专业难度分层。

其核心评测形式继承了 MMLU 的多选框架：给定中文题干 \(q\) 和四个选项，模型需要输出一个离散标签。整体分数通常采用学科宏平均：
$$
\text{Score}=\frac{1}{|\mathcal{S}|}\sum_{s\in\mathcal{S}}\frac{1}{N_s}\sum_{i=1}^{N_s}\mathbb{1}[\hat{y}_{s,i}=y_{s,i}],
$$
这样大科目不会压倒小科目，模型必须在多个知识区域都表现稳定。

C-Eval Hard 是设计上的重要补充。普通多选题可能被语言模式或常识猜测部分解决，而 Hard 子集聚焦高级数学、大学物理等需要公式操作和多步推理的科目。论文发现，即使强模型在整体 C-Eval 上能取得较好成绩，在 Hard 子集上也会显著掉分，这说明中文能力评测不能只看一般问答流畅性。

与 MMLU 相比，C-Eval 的创新主要体现在本土化和分层：它不仅测“中文表达”，也测中国教育语境中的学科知识、考试格式和专业术语。与开放式中文问答相比，多选形式降低了自动评估歧义，使不同模型、不同提示策略和不同年份结果更容易横向比较。

#### 🧪 练习题

```yaml
question: "C-Eval Hard 的主要作用是什么？"
options:
  - "减少题目数量以加快评测"
  - "挑选更依赖高级推理和专业知识的科目，观察模型在困难中文考试题上的能力"
  - "把所有中文题翻译成英文后再评测"
  - "专门评估模型的摘要能力"
answer: 1
explain: "C-Eval Hard 是困难子集，用于暴露模型在高级数学、物理等强推理科目上的短板。"
```
