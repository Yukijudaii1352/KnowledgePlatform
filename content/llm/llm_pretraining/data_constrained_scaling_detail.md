### 数据受限规模定律 (Scaling Data-Constrained Language Models)
```yaml
id: data_constrained_scaling
name: 数据受限规模定律
full_name: 数据受限规模定律 (Scaling Data-Constrained Language Models)
year: "2023.05"
org: HuggingFace
paper_url: https://arxiv.org/abs/2305.16264
category: scaling
parent: chinchilla_law
motivation: 揭示数据重复训练的衰减幂律
```

#### 📝 一句话总结
数据受限规模定律将 Chinchilla 的 \(L(N,D)\) 扩展到“有限唯一数据、多 epoch 重复训练”的场景，用有效数据量 \(D'\) 和有效参数量 \(N'\) 描述重复 token 与过量参数的边际价值衰减。它解决了高质量文本即将耗尽时，LLM 应如何在重复数据、扩大参数和继续增加 compute 之间分配预算的问题。

#### 🎯 核心要点
- 针对 Chinchilla 默认“训练 token 足够且近似唯一”的限制，研究数据受限 regime 下的 compute allocation 与 return。
- 训练 400+ 个模型，规模从 10M 到 9B 参数，总训练 token 最高约 900B，重复 epoch 最高达 1500。
- 将总 token \(D\) 拆成唯一 token \(U_D\) 和重复次数 \(R_D\)，其中 \(U_D=\min(D_C,D)\)、\(R_D=D/U_D-1\)。
- 用指数衰减定义有效数据 \(D'=U_D+U_D R_D^*(1-e^{-R_D/R_D^*})\)，刻画重复 token 价值逐步下降。
- 对参数也引入对称的有效参数 \(N'=U_N+U_N R_N^*(1-e^{-R_N/R_N^*})\)，刻画数据受限时过量参数的收益递减。
- 损失函数沿用 Chinchilla 结构：\(L=A/(N')^\alpha+B/(D')^\beta+E\)。
- 实验发现最多约 4 epochs 的重复训练与使用新数据相比损失差异很小；约 16 epochs 后收益快速衰减。
- 拟合得到 \(R_D^*\approx15.39\)、\(R_N^*\approx5.31\)，说明过量参数比重复数据更快进入收益递减，因此数据受限时应相对更快增加 epoch。
- 补充研究代码数据混合、perplexity filtering、deduplication 等缓解数据稀缺的策略。

#### 🔬 深入细节

![Data-Constrained Scaling Laws Figure 1](https://github.com/huggingface/datablations/raw/main/plotstables/return_alloc.png)
*图：官方仓库中的 Figure 1 展示重复数据的 return 和 allocation。左图显示 4 epochs 内重复几乎像新数据一样有效，右图显示数据受限 frontier 会偏向更小模型与更多重复 token。*

```python
# Data-Constrained Scaling Laws 的核心拟合与决策伪代码
def effective_data(unique_tokens, repeat_count, R_D_star):
    # D' = U_D + U_D * R_D* * (1 - exp(-R_D / R_D*))
    return unique_tokens + unique_tokens * R_D_star * (1 - exp(-repeat_count / R_D_star))

def effective_params(unique_params, param_repeat, R_N_star):
    # N' = U_N + U_N * R_N* * (1 - exp(-R_N / R_N*))
    return unique_params + unique_params * R_N_star * (1 - exp(-param_repeat / R_N_star))

def data_constrained_loss(N, D, data_budget, chinchilla_fit, R_D_star, R_N_star):
    U_D = min(data_budget, D)
    R_D = D / U_D - 1

    # U_N 是在 U_D 唯一 token 下的 Chinchilla compute-optimal 参数量上限
    U_N = min(chinchilla_N_opt_for_tokens(U_D), N)
    R_N = N / U_N - 1

    D_eff = effective_data(U_D, R_D, R_D_star)
    N_eff = effective_params(U_N, R_N, R_N_star)
    return chinchilla_fit.E + chinchilla_fit.A / (N_eff ** chinchilla_fit.alpha) + chinchilla_fit.B / (D_eff ** chinchilla_fit.beta)

for C in compute_budgets:
    # 在 FLOPs(N,D) ≈ 6ND 且 U_D <= D_C 的约束下搜索最小预测 loss
    best = argmin(lambda N, D: data_constrained_loss(N, D, D_C, fit, R_D_star, R_N_star),
                  constraint=lambda N, D: close(6 * N * D, C))
```

这篇论文的动机来自 Chinchilla 的外推悖论：如果 compute-optimal 训练要求参数和 token 近似等比例增长，那么超大模型会需要数万亿乃至更多高质量 token；但真实世界中，高质量自然语言数据是有限的。问题不再是“给定 compute 训练多大模型”，而是“给定 compute 和唯一数据预算 \(D_C\)，重复数据是否仍有价值，以及该如何分配参数和 epoch”。

作者首先把数据项拆开。设总训练 token 为 \(D\)，可用唯一数据预算为 \(D_C\)，则：

$$
U_D=\min\{D_C,D\},\quad R_D=\frac{D}{U_D}-1
$$

其中 \(U_D\) 是实际用到的唯一 token 数，\(R_D\) 是重复次数，也就是 epochs 减 1。单 epoch 时 \(R_D=0\)，完全退化回 Chinchilla 的无限数据假设。数据受限优化目标变为：

$$
\operatorname*{argmin}_{N,D} L(N,D)\quad \text{s.t.}\quad \mathrm{FLOPs}(N,D)=C,\ U_D\le D_C
$$

核心机制是“有效数据量”而不是原始 token 计数。重复 token 的价值不是 0，也不是与新 token 完全相同，而是随重复次数指数衰减：

$$
D'=U_D+U_D R_D^*\left(1-e^{-R_D/R_D^*}\right)
$$

当 \(R_D=0\) 时，\(D'=U_D=D\)。当 \(R_D\ll R_D^*\) 时，\(1-e^{-R_D/R_D^*}\approx R_D/R_D^*\)，所以 \(D'\approx U_D(1+R_D)=D\)，重复数据近似等同新数据。随着 \(R_D\) 变大，第二项逐渐饱和在 \(U_D R_D^*\)，意味着无限重复同一批数据也不可能无限降低 loss。

论文还为参数引入对称形式。给定唯一数据 \(U_D\)，先根据 Chinchilla frontier 计算适合这些唯一数据的“基础参数量” \(U_N\)，再把真实参数量 \(N\) 表示为 \(U_N\) 的重复/超额：

$$
R_N=\frac{N}{U_N}-1
$$

$$
N'=U_N+U_N R_N^*\left(1-e^{-R_N/R_N^*}\right)
$$

这个项的直觉是：当数据非常有限时，继续扩大模型并不会像无限数据条件下那样有效，因为新增参数缺少足够多样的监督信号。最终损失函数延续 Chinchilla 的三项分解：

$$
L(N,D)=E+\frac{A}{(N')^\alpha}+\frac{B}{(D')^\beta}
$$

论文基于 C4 重新拟合 Chinchilla 型基础参数，给出一个用于计算的形式：

$$
L(N,D)=1.87+\frac{521}{N^{0.353}}+\frac{1488}{D^{0.353}}
$$

在重复数据扩展中，再把 \(N\) 与 \(D\) 替换成 \(N'\) 与 \(D'\)。作者用 LBFGS 在 182 个样本上拟合衰减常数，得到 \(R_D^*\approx15.3878\)、\(R_N^*\approx5.3097\)。这意味着重复数据的“半衰期”更长，而过量参数更快失去边际价值；因此在数据受限、继续增加 compute 时，efficient frontier 会偏向增加 epochs，而不是按 Chinchilla 假设同等增加参数。

实验结论可以分成 return 和 allocation 两类。Return 问题问“重复数据还值不值”：4.2B 参数模型训练 4 epochs 时，最终验证损失只比单 epoch 唯一数据高约 0.5%，说明少量重复很安全；但重复次数继续增加后，loss 曲线逐渐变平，约 16 epochs 附近进入明显收益递减，40 epochs 左右重复几乎不再带来有效改进。Allocation 问题问“compute 怎么花”：在固定唯一数据预算下，单 epoch compute-optimal 模型会严重低估可从数据中榨取的信号，适当增加参数和 epoch 都有必要，但 epoch 应该增长得略快。

与 Chinchilla 相比，这篇论文不是推翻“参数与数据平衡”，而是给平衡关系增加了数据约束条件。Chinchilla 假设每个 token 都是新信息；Data-Constrained Scaling 说如果 token 是重复的，就要先折算成 \(D'\)。这让 scaling law 能回答更实际的问题：低资源语言、垂直领域、小语料高质量数据、经过严格过滤的数据集，在无法继续收集同质量文本时仍能通过有限重复获得收益，但不能无限重复。

> ⚠️ 注意：论文的结论不是“重复数据总是无害”。它强调的是全量数据重复、少量 epochs 时收益接近新数据；当重复过多或出现局部重复/记忆化时，收益会快速衰减甚至可能出现训练不稳定。

#### 🧪 练习题
```yaml
question: "数据受限规模定律中，有效数据量 D' 的主要作用是什么？"
options:
  - "把重复 token 按指数衰减折算，避免把多 epoch 数据视为完全等价的新数据"
  - "把所有重复 token 完全丢弃，只保留第一轮 epoch"
  - "只统计 embedding 参数对应的 token"
  - "强制所有模型都训练 exactly 20 tokens/parameter"
answer: 0
explain: "D'=U_D+U_D R_D^*(1-e^{-R_D/R_D^*}) 描述重复 token 的边际价值从近似新数据逐渐衰减到饱和。"
```
