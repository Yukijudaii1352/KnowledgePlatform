### WinoGrande：大规模代词消解挑战 (WinoGrande)

```yaml
id: "winogrande"
name: "WinoGrande"
full_name: "大规模代词消解挑战 (WinoGrande)"
year: "2020"
org: "Allen Institute for AI"
paper_url: "https://arxiv.org/abs/1907.10641"
category: "general"
parent: "hellaswag"
motivation: "44K众包问题测试代词消解常识"
```

#### 📝 一句话总结

WinoGrande 提出了一个 44K 规模的 Winograd 风格代词消解数据集，并用 AfLite 从 RoBERTa 嵌入中自动发现和删除可被线性分类器利用的偏置样本，解决了小规模 WSC 及其变体容易被词汇关联和数据集 artifact 高估模型常识能力的问题。

#### 🎯 核心要点

- 任务形式是二选一填空/代词消解：给定含空位或代词的句子，在两个候选实体中选择正确指代对象。
- 论文把原始 WSC 的 273 个专家题扩展到约 44K 个众包题，同时保留“人类容易、统计捷径困难”的目标。
- 数据构造先用受约束众包提升题目多样性，再用 AfLite 做系统性 bias reduction。
- AfLite 使用 RoBERTa 预计算嵌入和 logistic regression 集成，删除那些仅凭嵌入就能稳定预测标签的样本。
- 论文给出的关键超参为 \(m=10{,}000\)、\(n=64\)、\(k=500\)、\(\tau=0.75\)。
- WinoGrande 既是评测集，也是 transfer learning 资源；但论文强调高迁移分数也可能说明相关基准存在共同偏置。

#### 🔬 深入细节

![WinoGrande AfLite 去偏效果图面板](https://ar5iv.labs.arxiv.org/html/1907.10641/assets/x1.png)
![WinoGrande AfLite 分布直方图面板](https://ar5iv.labs.arxiv.org/html/1907.10641/assets/x5.png)
*图：论文 Figure 1 的 ar5iv 拆分面板。Figure 1 展示 AfLite 前后 RoBERTa 嵌入空间与标签分布的变化；去偏后，标签在嵌入空间中的可分性下降，说明简单统计捷径被削弱。*

```python
# WinoGrande Algorithm 1: AfLite 简化伪代码
# D = {(x_i, y_i)}，x_i 是预计算 RoBERTa embedding，y_i 是答案标签
D_prime = D
while len(D_prime) > m:
    E = {example: [] for example in D_prime}

    for i in range(n):
        T_i, V_i = random_partition(D_prime, train_size=m)
        L_i = train_logistic_regression(T_i)
        for x, y in V_i:
            E[(x, y)].append(L_i.predict(x))

    score = {}
    for x, y in D_prime:
        preds = E[(x, y)]
        score[(x, y)] = count(p == y for p in preds) / len(preds)

    S = top_k_examples_with(score >= tau, k=k)
    D_prime = D_prime - S
    if len(S) < k:
        break

return D_prime
```

WinoGrande 的动机来自 Winograd Schema Challenge 的一个悖论：WSC 被设计成避免简单词汇关联，例如“奖杯放不进箱子，因为它太大”中代词必须依赖物理常识；但后来强语言模型在一些 WSC 变体上接近 90% 准确率。论文指出，这不一定说明模型掌握了常识，因为即使专家编写的小数据集也会无意中包含触发词、候选实体、句式或语义极性的偏置。小样本 benchmark 尤其危险，因为少量重复写作策略就能被预训练模型放大成稳定捷径。

WinoGrande 的第一步是扩大题目规模。众包题目仍保持 Winograd 风格：句子中有两个候选实体，正确答案需要依赖事件语义、角色属性或因果关系，而不能只靠局部语法。论文使用“creativity from constraints”的思想降低众包作者从零构题的认知负担，通过约束激发多样化句子，避免所有人反复写同一类模板。这个阶段解决规模和多样性问题，但它不能保证没有统计偏置，因此还需要算法化过滤。

AfLite 与 HellaSwag 的 AF 相关，但目标不同。HellaSwag 的 AF 主要生成并替换错误选项，让负例更难；WinoGrande 的 AfLite 不修改题目，而是从已有题库中删除“机器可预测”的样本。论文先用 6K 实例微调 RoBERTa 得到 \(\text{RoBERTa}_{embed}\)，再为剩余约 47K 实例预计算 dense embedding，并把这 6K 实例从最终数据集中丢弃，避免把 embedding 训练集泄漏进评测集。

AfLite 的核心判断是：如果一个很简单的线性分类器在不同随机划分上都能从 embedding 预测正确答案，那么这个样本很可能包含机器可检测的 artifact。论文定义每个样本 \(e=(\mathbf{x},y)\) 的可预测性分数为：

$$
score(e)=\frac{\left|\{p\in E(e)\;\text{s.t.}\;p=y\}\right|}{|E(e)|}
$$

其中 \(E(e)\) 是多个 logistic regression 分类器在该样本上的预测集合。每一轮过滤中，AfLite 删除得分最高且 \(score(e)\ge \tau\) 的前 \(k\) 个样本；如果本轮删除数少于 \(k\)，或者剩余数据量不足训练大小 \(m\)，算法停止。这个设计把“偏置”定义为在当前强表示空间中可被稳定线性读出的标签信息，而不是只依赖人工枚举的词表规则。

论文还用 PMI 过滤作为对比。对于 twin 句 \((t_1,t_2)\)，PMI 方法可写成：

$$
f(t_1,t_2)=\sum_{w\in t_1}\text{PMI}(y=1;w)-\sum_{w\in t_2}\text{PMI}(y=1;w)
$$

PMI 只能捕捉词与标签的显式共现，而 AfLite 利用 RoBERTa embedding 捕捉更隐蔽的语义、句法和写作风格线索。因此 AfLite 更符合论文目标：不假设偏置来源，直接问“当前强模型的表示是否已经让标签变得容易线性分离”。

最终 WinoGrande 保持了高人类准确率，论文报告人类约 94%，而模型根据训练数据规模不同仍显著落后。更重要的是，它把“去偏”作为 benchmark 构造流程的一部分，而不是事后分析步骤。对 LLM 评测来说，WinoGrande 的启发是：大规模本身不能消除偏置，必须用强表示和简单探针主动寻找样本中可被利用的捷径。

> ⚠️ 注意：AfLite 删除的是“当前表示空间中容易”的样本，不等价于证明剩余样本完全无偏；它更像一个随着强模型演化而更新的 benchmark 清洗策略。

#### 🧪 练习题

```yaml
question: "WinoGrande 中 AfLite 为什么要删除 score(e) 很高的样本？"
options:
  - "因为这些样本对人类太难，无法标注"
  - "因为线性分类器能稳定预测其标签，说明样本可能含有机器可利用的偏置"
  - "因为这些样本的句子长度超过模型最大上下文"
  - "因为这些样本来自原始 WSC，而不是众包数据"
answer: 1
explain: "AfLite 把高 score 视为标签可从 embedding 中被简单读出的信号，因此删除这些样本以降低数据集捷径。"
```
