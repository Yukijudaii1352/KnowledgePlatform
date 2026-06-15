### HellaSwag

```yaml
id: hellaswag
name: HellaSwag
full_name: 常识推理挑战 (HellaSwag)
year: '2019'
org: University of Washington
paper_url: https://arxiv.org/abs/1905.07830
category: general
parent: —
motivation: 对抗性过滤确保常识推理挑战性
```

#### 📝 一句话总结

HellaSwag 通过对抗性过滤构造“人类觉得荒谬、模型却容易误判”的句子结尾选项，解决了 SWAG 等常识推理基准被强预训练模型快速饱和的问题。

#### 🎯 核心要点

- 任务要求从四个候选结尾中选择最符合上下文的日常事件延续
- 候选错误结尾由语言模型生成，语法流畅但常识上不合理
- Adversarial Filtering 迭代训练判别器并替换容易识别的负例，使错误选项对模型更难
- 数据来源包括 ActivityNet Captions 和 WikiHow，覆盖短视频行为与步骤式说明
- 人类准确率超过 95%，当时强模型低于 48%，形成高人类低模型的常识推理缺口

#### 🔬 深入细节

![HellaSwag 对抗性过滤流程](https://ar5iv.labs.arxiv.org/html/1905.07830/assets/x2.png)
*图源：ar5iv 论文 Figure 2，展示 Adversarial Filtering 如何迭代替换容易被分类器识别的负例。*

```python
# HellaSwag Adversarial Filtering 伪代码
def adversarial_filter(contexts, gold_endings, generated_negatives, rounds):
    candidates = initialize_choices(gold_endings, generated_negatives)
    for _ in range(rounds):
        train_set, heldout = random_split(candidates)
        discriminator = train_classifier(train_set)
        for item in heldout:
            # 找出分类器最容易识别为错误的负例
            easy_neg = argmax_negative_confidence(discriminator, item.negatives)
            # 用生成池中更能迷惑分类器的负例替换
            hard_neg = sample_hard_negative(discriminator, generated_negatives[item.context])
            item.replace(easy_neg, hard_neg)
    return human_validate(candidates)

def evaluate_hellaswag(model, examples):
    return mean(
        argmax([model.logprob(ex.context + ending) for ending in ex.endings]) == ex.gold
        for ex in examples
    )
```

HellaSwag 的核心问题是“表面语言能力不等于常识推理”。SWAG 曾经通过视频描述构造下一句选择题，但 BERT 等预训练模型很快取得接近人类的表现。论文指出，这并不一定意味着模型真的理解日常事件，而可能是数据中的负例存在可学习的统计痕迹，例如生成文本风格、长度或局部搭配。

Adversarial Filtering 的设计就是把这些浅层痕迹持续清除。给定上下文 \(x\)、正确结尾 \(y^+\) 和一批机器生成错误结尾 \(y^-\)，算法训练一个判别器 \(D_\phi(x,y)\) 区分正确与错误，再找出判别器最容易识别的负例并替换成更难的负例。经过多轮迭代后，剩下的负例对当前模型族更具迷惑性，但仍由人类验证为不合理。

这种机制的直觉是让数据集和模型共同演化：模型越擅长抓住某类伪线索，过滤器越会移除这类伪线索。最终题目呈现出“局部流畅、全局荒谬”的特征，例如动作顺序、物体用途、因果关系或场景约束不符合常识。模型必须综合上下文，而不能只看候选句子的语言自然度。

与传统多选常识题相比，HellaSwag 的创新不在题型，而在负例生成和筛选。普通人工负例可能过于明显，普通语言模型负例可能留下生成器痕迹；AF 负例则专门针对判别器难点构造。这一思想后来影响了 WinoGrande、ANLI 等更强调对抗构建的基准。

#### 🧪 练习题

```yaml
question: "HellaSwag 中 Adversarial Filtering 的主要目的是什么？"
options:
  - "让错误选项更短，便于人工标注"
  - "迭代替换容易被模型识别的负例，保留更能迷惑模型但人类可排除的负例"
  - "把所有题目转换为开放问答"
  - "用人工规则直接写出所有错误选项"
answer: 1
explain: "AF 通过判别器发现浅层可识别负例，并用更困难的机器生成负例替换，从而提升基准挑战性。"
```
