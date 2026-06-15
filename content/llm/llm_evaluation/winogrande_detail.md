### WinoGrande

```yaml
id: winogrande
name: WinoGrande
full_name: 大规模代词消解挑战 (WinoGrande)
year: '2020'
org: Allen Institute for AI
paper_url: https://arxiv.org/abs/1907.10641
category: general
parent: hellaswag
motivation: 44K众包问题测试代词消解常识
```

#### 📝 一句话总结

WinoGrande 提出了 44K 规模的 Winograd 风格代词消解数据集，并用 AfLite 过滤机器可检测偏差，解决了小规模 WSC 基准易被统计线索和迁移训练高估的问题。

#### 🎯 核心要点

- 将 Winograd Schema 的双候选代词消解扩展到 44K 众包样本
- 题目形式为填空句子加两个候选实体，必须依赖常识判断空格指代对象
- 众包阶段通过 twin sentence 和 trigger word 思想控制语义翻转
- AfLite 使用预训练表示和轻量分类器集合检测并移除带数据集偏差的样本
- 最终数据既可作为困难评测，也可迁移提升 WSC、DPR、COPA、KnowRef、Winogender 等相关任务

#### 🔬 深入细节

![WinoGrande AfLite 去偏效果](https://ar5iv.labs.arxiv.org/html/1907.10641/assets/x1.png)
*图源：ar5iv 论文 Figure 1，展示 AfLite 前后样本在表示空间中的标签偏差变化。*

```python
# AfLite 偏差过滤伪代码
def aflite_filter(examples, embedder, rounds, keep_size):
    pool = [(ex, embedder(ex.sentence, ex.option1, ex.option2)) for ex in examples]
    while len(pool) > keep_size:
        removable = set()
        for _ in range(rounds):
            train, probe = random_split(pool)
            clf = train_linear_classifier([v for _, v in train], [ex.label for ex, _ in train])
            for ex, vec in probe:
                if clf.confidence(vec, ex.label) > threshold:
                    removable.add(ex.id)  # 该样本可能含有可被模型表示捕捉的伪线索
        pool = [(ex, vec) for ex, vec in pool if ex.id not in removable]
    return [ex for ex, _ in pool]

def evaluate_winogrande(model, examples):
    return mean(
        argmax([
            model.logprob(ex.sentence.replace("_", ex.option1)),
            model.logprob(ex.sentence.replace("_", ex.option2)),
        ]) == ex.label
        for ex in examples
    )
```

WinoGrande 的动机来自 Winograd Schema Challenge 的悖论：原始 WSC 只有数百题，设计上要求常识推理，但现代预训练模型在若干变体上已经取得很高分数。论文认为这可能来自数据集偏差和小样本过拟合，而不是真正掌握了因果、角色和社会常识。

数据构建首先保留 WSC 的关键结构：句子中有一个空格或代词，两个候选实体都在语法上可行，正确答案由句子中的触发词决定。例如改变一个形容词或动词就能翻转指代对象。模型如果只学习实体频率或局部搭配，就会在这类题上失败。

AfLite 是 WinoGrande 的核心技术。它将每个样本转成预训练模型表示，然后用一组简单分类器反复尝试预测标签。若某个样本的正确选项能被这些轻量模型稳定高置信预测，说明它可能携带“机器可检测”的偏差，例如某个词与某个选项强相关。算法会移除这些样本，留下更难被浅层统计线索解决的子集。

与 HellaSwag 的对抗性过滤相比，WinoGrande 的 AfLite 更强调“去偏”而不是“生成难负例”。HellaSwag 从机器生成候选中挑选难选项，WinoGrande 则从人类众包题中剔除可被表示空间线性分离的样本。二者都体现了同一思想：基准构建不能假设人工题天然无偏，必须用强模型反向审计数据。

#### 🧪 练习题

```yaml
question: "WinoGrande 中 AfLite 过滤样本的依据是什么？"
options:
  - "题目是否太长"
  - "样本标签是否能被基于预训练表示的轻量分类器高置信预测"
  - "人工标注者是否给出了解释"
  - "候选实体是否都是专有名词"
answer: 1
explain: "AfLite 通过模型表示和简单分类器检测可学习偏差，高置信可预测的样本会被视为可能含伪线索而移除。"
```
