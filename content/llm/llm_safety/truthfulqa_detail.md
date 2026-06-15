### TruthfulQA：真实性问答基准 (TruthfulQA Benchmark)
```yaml
id: truthfulqa
name: TruthfulQA
full_name: 真实性问答基准 (TruthfulQA Benchmark)
year: '2022'
org: Oxford
paper_url: https://aclanthology.org/2022.acl-long.226/
category: hallucination
parent: —
motivation: 虚假陈述倾向基准
```

#### 📝 一句话总结
TruthfulQA 构造了专门诱发常见误解和模仿式虚假陈述的问题集，用来评估语言模型是否在面对误导性问题时仍能给出真实回答。

#### 🎯 核心要点
- 数据集包含 817 个问题，覆盖健康、法律、金融、政治、迷信、谣言等 38 个类别。
- 问题经过 adversarial filtering，刻意选择人类容易形成错误直觉、模型容易模仿网络谬误的题目。
- 同时评估生成式回答和多选式回答，常见指标包括 truthfulness、informativeness、MC1 和 MC2。
- 论文发现更大模型并不必然更 truthful，规模增长可能增强模仿互联网上错误说法的能力。
- TruthfulQA 成为幻觉与真实性评测的经典基准，常与后续 FActScore、事实核查和对齐方法结合使用。

#### 🔬 深入细节
![TruthfulQA 模型规模与真实性关系](https://lh3.googleusercontent.com/hiIs5DK83BWL-bA1JknqPottQqXWg6oIKBT_pCUx85jnKx0KOqgTcJSKS_Srk6Dcw9j4Uwi7p1VLT9geRuARsG0NBBVKYZfxlTZYpZK2dcUTyqY-AYRDr6UPQPvFHLkYGKVD9MsP%3Ds0)
*图：TruthfulAI 官方页面中的 Figure 2，展示不同模型规模和真实回答比例的关系。*

```python
# TruthfulQA 评测简化伪代码
def evaluate_truthfulqa(model, dataset):
    records = []
    for item in dataset:
        answer = model.generate(item.question)
        truth = truth_judge(answer, item.reference_true_answers, item.reference_false_answers)
        info = informativeness_judge(answer)

        mc_scores = model.score_options(item.multiple_choice_options)
        mc1 = is_best_option_true(mc_scores, item.true_options)
        mc2 = probability_mass_on_true_options(mc_scores, item.true_options)

        records.append((truth, info, mc1, mc2))

    return aggregate(records)
```

TruthfulQA 的核心不是收集普通问答，而是构造“容易答错”的问题。许多问题表面上有流行答案，但流行答案并不真实。语言模型在预训练中学习的是文本分布，如果网络上错误说法更常见或更醒目，模型就可能给出流畅但错误的回答。

论文区分 truthfulness 和 informativeness。一个回答可以真实但没信息量，例如“我不知道”；也可以信息量高但错误。因此评估时需要同时看回答是否真实、是否有效回答了问题。这个设计避免模型通过一律拒答或模糊回答刷高真实性。

多选设置提供更稳定的自动指标。MC1 看模型是否把唯一最佳真实答案排在最高；MC2 看模型给所有真实答案分配的概率质量。生成式设置更贴近实际使用，但需要人工或强判定器判断，这也是后来事实评测工作继续发展的原因。

与 FActScore 相比，TruthfulQA 更像压力测试集。它固定了一组高诱导性问题，测试模型是否会复述错误信念；FActScore 则在任意长文本中逐条核查事实。两者互补：一个评估抗误导能力，一个评估生成事实精度。

#### 🧪 练习题
```yaml
question: "TruthfulQA 为什么不只看回答是否真实，还看 informativeness？"
options:
  - "因为回答越长越好"
  - "因为模型可以用无信息的安全回答避免犯错"
  - "因为多选题无法评分"
  - "因为数据集只包含数学题"
answer: 1
explain: "如果只看 truthfulness，模型总说不知道也可能得高分；informativeness 用来衡量是否真正回答问题。"
```
