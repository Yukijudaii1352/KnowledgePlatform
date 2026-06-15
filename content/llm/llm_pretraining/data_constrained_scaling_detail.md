### 数据受限规模定律

```yaml
id: data_constrained_scaling
name: 数据受限规模定律
full_name: 数据受限规模定律 (Scaling Data-Constrained Language Models)
year: '2023.05'
org: HuggingFace
paper_url: https://arxiv.org/abs/2305.16264
category: scaling
parent: chinchilla_law
motivation: 揭示数据重复训练的衰减幂律
```

#### 📝 一句话总结

数据受限规模定律研究当高质量唯一文本不足时，重复训练同一批数据如何影响语言模型 scaling。论文发现少量重复（约 4 个 epoch 内）与新数据差异很小，但更多重复的边际价值会逐渐衰减到零，因此需要用“有效数据量”而非原始 token 数规划训练。

#### 🎯 核心要点

- 面向 Chinchilla 之后的问题：如果计算预算继续增长，但高质量唯一数据不够，应该重复数据、放大模型还是放宽数据来源
- 训练 400 多个 GPT-2 风格 Transformer，规模最高约 9B 参数、900B 总训练 token，部分实验重复到上千 epoch
- 经验结论：固定计算预算下，重复数据不超过约 4 个 epoch 时 loss 与使用唯一数据差别很小
- 提出数据受限 scaling law，用 \(D_{\text{eff}}\) 描述重复 token 的折扣价值，并对“过量参数”也引入有效参数折扣
- 当重复次数很大时，新增训练 token 的价值趋近于零，无法无限替代新数据
- 缓解策略包括混入代码数据、重新评估过度过滤策略、针对噪声数据做选择性过滤

#### 🔬 深入细节

![数据受限缩放主图](https://ar5iv.labs.arxiv.org/html/2305.16264/assets/x1.png)
*图：论文 Figure 1，展示重复数据时的回报衰减和计算最优资源分配变化。*

```python
# 数据受限规模定律训练规划伪代码
def data_constrained_plan(unique_tokens, compute_budget):
    best = None
    for N in candidate_model_sizes:
        total_tokens = compute_budget / (6 * N)
        epochs = total_tokens / unique_tokens

        # 重复 token 不是按原始 token 数等价计入，而是折扣为有效数据量
        D_eff = 0.0
        for epoch in range(1, ceil(epochs) + 1):
            fraction = min(1.0, max(0.0, epochs - (epoch - 1)))
            D_eff += unique_tokens * fraction * repeat_discount(epoch)

        N_eff = parameter_discount(N, unique_tokens)
        loss = E + A / (N_eff ** alpha) + B / (D_eff ** beta)
        best = min_by_loss(best, {"N": N, "epochs": epochs, "D_eff": D_eff, "loss": loss})
    return best
```

**动机与背景：Chinchilla 假设“数据可继续增加”，现实未必如此。** Chinchilla 说固定计算下应该增加训练 token，但它默认有足够多的新鲜高质量数据。现实中，英文高质量网页、书籍、代码和学术文本都存在版权、质量、语言覆盖和采集成本限制；对低资源语言来说，这个约束更早出现。数据受限规模定律要回答的问题是：当 \(D_{\text{unique}}\) 固定时，额外 FLOPs 花在重复数据上还有多少价值？

**核心机制：重复 token 需要折扣成有效数据量。** 论文将 Chinchilla 的数据项从原始训练 token 数 \(D\) 改写为有效数据量 \(D_{\text{eff}}\)。直觉上，第 1 次看到一个 token 最有信息量，第 2 到第 4 次仍可帮助优化，但第 100 次看到同一分布样本时，新增泛化信息很少。因此可以写成：

$$
L(N,D_{\text{eff}})=E+\frac{A}{N_{\text{eff}}^\alpha}+\frac{B}{D_{\text{eff}}^\beta}
$$

其中 \(D_{\text{eff}}\leq D_{\text{tokens}}\)，重复越多，折扣越重。论文还对 \(N\) 做了对称处理：当模型参数相对唯一数据过大时，额外参数也不能完全转化为有效能力，因此引入 \(N_{\text{eff}}\) 描述过量参数的收益衰减。

**训练流程：固定唯一数据、固定 FLOPs、参数化拟合三路实验。** 论文先在固定唯一数据量下扫描参数量和 epoch 数，观察计算分配；再在固定 FLOPs 下比较“更多唯一数据”和“更多重复数据”的差异；最后用所有训练 run 拟合参数化公式。实验显示，一次训练中重复到约 4 个 epoch 通常不会显著恶化 loss 或下游表现，这对现实工程很有用，因为数据去重和切分很难保证每个 token 只出现一次。但当重复次数继续升高，loss 改善速度会放缓，最终新增计算基本无法降低验证 loss。

**与 Chinchilla 的区别：最优策略转向更小模型加更多 epoch，但不能无限重复。** 如果生硬套用 Chinchilla，在数据不足时会预测继续按 20:1 关系扩大数据；但数据不存在时，只能复用已有数据。数据受限定律给出的结论更细：在唯一数据固定时，额外计算应同时增加参数和重复 epoch，且 epoch 增长可以略快；不过重复不是新数据的完美替代品。论文还发现，混入代码数据能在自然语言任务上提供有效 token 增益，而过滤策略对干净数据和噪声数据的价值不同，不能一概而论地“越严越好”。

> ⚠️ 注意：这条定律并不鼓励无脑多 epoch 训练。它说明少量重复可接受，但当重复次数很大时，模型会进入数据回报枯竭区，继续加 FLOPs 不如获取新数据或拓展数据类型。

#### 🧪 练习题

```yaml
question: "数据受限规模定律中为什么要引入 D_eff？"
options:
  - "为了把训练 token 数换算成显存占用"
  - "为了描述重复 token 的边际价值会低于新 token"
  - "为了避免计算模型参数量"
  - "为了只统计代码数据而忽略自然语言数据"
answer: 1
explain: "在数据重复训练时，后续 epoch 的 token 不能等价于新数据；D_eff 用折扣后的有效数据量刻画这种收益衰减。"
```
