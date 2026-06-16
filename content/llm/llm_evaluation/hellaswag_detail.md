### HellaSwag：常识推理挑战 (HellaSwag)

```yaml
id: "hellaswag"
name: "HellaSwag"
full_name: "常识推理挑战 (HellaSwag)"
year: "2019"
org: "University of Washington"
paper_url: "https://arxiv.org/abs/1905.07830"
category: "general"
parent: "—"
motivation: "对抗性过滤确保常识推理挑战性"
```

#### 📝 一句话总结

HellaSwag 提出了一个由对抗性过滤构造的 70K 常识推理数据集，用 GPT 生成候选负例、用 BERT 类判别器迭代筛掉容易被识别的伪线索，解决了 SWAG 被预训练模型快速学到数据集偏差后近乎“刷榜式解决”的问题。

#### 🎯 核心要点

- 任务形式是四选一 commonsense NLI：给定一个活动或教程上下文，从 4 个候选结尾中选出唯一真实后续事件。
- 数据源同时包含 ActivityNet Captions 与 WikiHow，其中 WikiHow 提供更长、更复杂、更多样的日常过程文本。
- 核心构造方法是 Adversarial Filtering：语言模型大量生成错误结尾，BERT-Large 判别器反复替换掉容易识别的负例。
- 论文强调“Goldilocks zone”：约 3 句上下文和 2 句生成结尾最容易达到“人类一眼觉得荒谬、模型却难以识别”的难度区间。
- 人工验证用于过滤“看起来也合理”的 false negative，并保留高一致性的 25K ActivityNet 与 45K WikiHow 样本。
- 论文报告人类准确率约 95.6%，而当时的 BERT-Large 约 47.3%，暴露出预训练模型对常识事件合理性的脆弱性。

#### 🔬 深入细节

![HellaSwag Adversarial Filtering 概览](https://ar5iv.labs.arxiv.org/html/1905.07830/assets/x2.png)
*图：论文 Figure 2，Adversarial Filtering 在随机 dummy split 上训练判别器，并把 dummy test 中容易识别的机器负例替换为更具迷惑性的候选。*

```python
# HellaSwag / SWAG 风格 Adversarial Filtering 简化伪代码
D = {(context, gold_ending, generated_negative_pool)}
for round in range(max_rounds):
    D_train, D_test = random_split(D)
    adversaries = []

    for seed in ensemble_seeds:
        clf = init_from_pretrained_BERT_large(seed)
        clf.train(binary_or_4way_labels(D_train))  # 判断 ending 是真实还是生成
        adversaries.append(clf)

    replaced = 0
    for item in D_test:
        negatives = item.current_negatives
        pool = item.generated_negative_pool
        easy = [n for n in negatives if ensemble_confident_generated(adversaries, item.context, n)]
        hard = rank_by_p_real(adversaries, item.context, pool)
        item.current_negatives = replace(easy, hard)  # 用更像真实后续的生成结尾替换
        replaced += len(easy)

    if adversary_accuracy_has_converged() or replaced == 0:
        break

D = human_validation_filter(D)  # 去掉人类也认为合理的机器结尾
```

HellaSwag 的背景不是“缺少一个更大数据集”，而是旧基准 SWAG 被 BERT 快速攻破后，研究者需要判断模型到底学会了事件常识，还是只学会了人类结尾与机器结尾之间的表面分布差异。论文先用 ablation 说明 SWAG 中存在明显 artifact：BERT 在不看 context、只看 ending，甚至打乱 ending 词序时仍能获得远高于随机的准确率。这意味着模型可以把任务退化为“检测哪一句更像人写的”，而非真正判断“这个后续事件是否符合当前世界状态”。

对抗性过滤的关键目标是让最终数据集对任意训练/测试划分都困难。设上下文为 \(c\)，真实结尾为 \(e^+\)，生成候选为 \(e^-\)。判别器给出候选像真实文本的概率 \(p_{\theta_m}(\text{real}\mid c,e^-)\)，则一个候选负例的迷惑度可以写成：

$$
a(c,e^-)=\frac{1}{M}\sum_{m=1}^{M}p_{\theta_m}(\text{real}\mid c,e^-)
$$

AF 每轮训练一组判别器，然后把判别器能轻易识别为 generated 的负例替换掉，优先保留 \(a(c,e^-)\) 高的候选。这样做的直觉是：如果一个负例已经被强判别器稳定识别，它携带的就是浅层伪线索；如果一个负例让判别器以为它像真实结尾，但人类仍能判断其语义荒谬，它才真正逼迫模型进行常识推理。

HellaSwag 还把“生成器质量”提升为数据集难度的核心变量。旧 SWAG 使用较浅的生成模型，BERT 仍能把 AF 后的负例识别到约 75% 准确率；换成 OpenAI GPT 生成负例后，BERT 在 ActivityNet 上的识别准确率可以被压到接近随机。论文进一步加入 WikiHow，因为教程文本天然包含多步骤过程、目标状态、工具使用和因果约束，比短视频字幕更适合制造“局部相关但整体不合理”的错误结尾。

“Goldilocks zone”是这篇论文最重要的构造经验：负例太短时，语言模型容易生成流畅但语义不足的句子，模型与人类都可能难以区分；负例太长时，机器生成更容易露出明显破绽，判别器也更容易识别。论文最终采用大约三句上下文、两句 WikiHow 生成结尾的折中设置，使负例对 BERT 足够困难，同时人类仍能稳定发现逻辑或常识错误。

训练和评测时，HellaSwag 可以看作一个四分类问题。模型对每个候选结尾打分，选择分数最高者：

$$
\hat{i}=\arg\max_{i\in\{1,2,3,4\}}s_\theta(c,e_i),\qquad
\mathcal{L}=-\log\frac{\exp s_\theta(c,e_{y})}{\sum_{i=1}^{4}\exp s_\theta(c,e_i)}
$$

与普通多选题不同，HellaSwag 的难点不在标签空间，而在负例构造。候选负例通常包含与上下文高度相关的词汇，因此词袋、主题匹配或 ending-only 策略都不够；正确模型必须跟踪事件前提、人物意图、物体状态和过程约束。例如“给狗洗澡”的场景中，错误结尾可能提到狗、水、主人等相关实体，但它违反了狗未被洗、会逃避洗澡这一隐含状态转移。

> 💡 关键：HellaSwag 的贡献不是提出新模型，而是提出一种让 benchmark 与强模型共同演化的数据构造机制；它把评测重点从“模型能否利用数据集 artifact”转回到“模型是否真正理解日常事件的合理后续”。

#### 🧪 练习题

```yaml
question: "HellaSwag 中 Adversarial Filtering 的主要作用是什么？"
options:
  - "让人工标注者直接编写所有错误选项"
  - "用判别器迭代移除容易识别的机器负例，保留对模型更难但对人类仍明显错误的结尾"
  - "把四选一任务改成开放式文本生成任务"
  - "只增加训练集规模，不改变负例分布"
answer: 1
explain: "AF 的核心是用强判别器发现并替换带有表面伪线索的负例，使最终候选对模型更具对抗性。"
```
