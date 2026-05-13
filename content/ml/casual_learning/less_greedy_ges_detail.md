### Less Greedy Equivalence Search

```yaml
id: less_greedy_ges
name: Less Greedy Equivalence Search (LGES)
year: 2025.12
organization: 哥伦比亚大学 (Columbia University)
authors: Juan L. Gamella, Armeen Taeb, Christina Heinze-Deml, Peter Bühlmann
url: https://neurips.cc/virtual/2025/poster/96189
parent: ges
category: causal_inference
```

## 📝 一句话总结

LGES 通过在 GES 的前向阶段引入"少贪心"插入策略（当评分函数暗示条件独立时跳过该边插入），大幅减少冗余搜索，实现比 GES 快 10 倍、结构误差降低 2 倍的因果图学习，同时保持渐近正确性，并支持先验知识引导和干预数据整合。

## 🎯 核心要点

- **问题根源**：GES 在前向阶段的贪心搜索会在条件独立的变量对之间插入边（因为某些 INSERT 操作符恰好能提高分数），导致冗余边的插入和删除，浪费大量计算且引入结构误差
- **核心洞察**：如果评分函数表明 $X \perp\!\!\!\perp Y \mid \text{Pa}_Y^G$（即加边 $X \to Y$ 不提高分数），则应跳过所有 INSERT$(X, Y, *)$ 操作符——这是 GES 从未利用的条件独立信号
- **两种插入策略**：SafeInsert（有完整渐近正确性保证，依赖于选定的 DAG $G \in \mathcal{E}$）和 ConservativeInsert（更激进地过滤，检查所有可能的 INSERT 操作符分数，部分理论保证但实践中更准确）
- **三个算法变体**：LGES-0（仅替换插入策略）、LGES（额外优先删除再插入）、LGES+（额外强制边删除并重启搜索），均可搭配两种插入策略
- **扩展能力**：支持通过先验知识 $\mathcal{S} = \langle R, F \rangle$（必需边集 $R$ 和禁止边集 $F$）引导搜索优先级，且对错误先验具有鲁棒性；提出 I-ORIENT 算法利用干预数据进一步定向无向边

## 🔬 深入细节

### 示意图

![LGES 方法概览](https://neurips.cc/virtual/2025/poster/96189)

### GES 的问题：冗余贪心插入

考虑真实 MEC $\mathcal{E}^*$ 包含 DAG $G^*: X_1 \to Z \to Y$。GES 从空图出发，在前向阶段可能走两条路径：

- **路径 τ₁**（理想）：先插入 $X_1 \to Z$，再插入 $Z \to Y$，直接到达 $\mathcal{E}^*$
- **路径 τ₂**（冗余）：先插入 $Z \to Y$，然后贪心地插入 $X_1 \to Y$（虽然 $X_1 \perp\!\!\!\perp Y \mid Z$，但 INSERT$(X_1, Y, \emptyset)$ 对应 $G_1 \cup \{X_1 \to Y\}$ 确实提高分数），之后需要在后向阶段删除多余边

**关键问题**：在路径 τ₂ 中，GES 插入 $X_1 \to Y$ 是因为存在某个 DAG $G_1 \in \mathcal{E}^{(1)}$ 使得 $\text{Pa}_Y^{G_1} = \emptyset$，此时 $X_1 \not\!\perp\!\!\!\perp Y$。但同一 MEC 中另一个 DAG $G_2$ 有 $\text{Pa}_Y^{G_2} = \{Z\}$，此时 $X_1 \perp\!\!\!\perp Y \mid Z$——分数函数已经"知道"不该插这条边。

### 核心算法：LGES (Algorithm 1)

```
算法: Less Greedy Equivalence Search (LGES)
输入: 数据 D ~ P(v), 评分准则 S, 先验假设 S = ⟨R, F⟩, 初始 MEC E₀,
      插入策略 GetInsert ∈ {SafeInsert, ConservativeInsert}
输出: P(v) 的 MEC E

1  E ← E₀
2  repeat
3    // 删除阶段（优先于插入）
4    repeat
5      E ← E + 最高分的 DELETE(X, Y, T)
6    until 无分数提升的删除操作
7    // 翻转阶段
8    repeat
9      E ← E + 最高分的 TURN(X, Y, T)
10   until 无分数提升的翻转操作
11   // 少贪心插入阶段
12   G ← E 中的某个 DAG
13   priorityList ← GetPriorityInserts(E, G, S)  // 利用先验知识排序
14   foreach candidates in priorityList do
15     (X*, Y*, T*) ← GetInsert(E, G, D, candidates, S)
16     if 找到有效插入 then
17       E ← E + INSERT(X*, Y*, T*)
18       break  // 不检查低优先级候选
19 until 无分数提升的操作
20 return E
```

### SafeInsert 策略

**核心思想**：在选定 DAG $G \in \mathcal{E}$ 后，对每个非邻接变量对 $(X, Y)$，检查加边是否提高分数：

$$\text{如果 } S(G, D) > S(G \cup \{X \to Y\}, D) \text{，则丢弃所有 INSERT}(X, Y, *) \text{ 操作符}$$

由局部一致性（Definition 1），当样本量趋于无穷时：
- $X \not\!\perp\!\!\!\perp Y \mid \text{Pa}_Y^G \Rightarrow S(G, D) < S(G \cup \{X \to Y\}, D)$（加边提高分数）
- $X \perp\!\!\!\perp Y \mid \text{Pa}_Y^G \Rightarrow S(G, D) > S(G \cup \{X \to Y\}, D)$（加边降低分数）

**定理 1（SafeInsert 正确性）**：在样本量趋于无穷时，SafeInsert 返回一个有效的分数提升 INSERT 操作符，当且仅当这样的操作符存在。

### ConservativeInsert 策略

比 SafeInsert 更激进：不仅检查单个 DAG $G$ 下的分数，而是检查每个 INSERT$(X, Y, T)$ 操作符对应的具体 DAG 的分数。如果该操作符对应的 DAG 加边后分数降低，则直接丢弃该操作符。

**区别**：SafeInsert 的过滤结果依赖于选择的 $G \in \mathcal{E}$（不同 DAG 可能给出不同的父节点集），而 ConservativeInsert 对每个操作符独立判断，不依赖 $G$ 的选择。实践中 ConservativeInsert 更准确但理论保证较弱。

### I-ORIENT：干预数据定向算法 (Algorithm 2)

```
算法: I-ORIENT
输入: 干预目标 I, 干预数据 (D_I), 观测 MEC E, 评分准则 S
输出: I-MEC E

1  foreach 无向边 X - Y in E do
2    ΔS ← Σ_{I∈I: X∈I, Y∉I} [s_{D_I}(y, x) - s_{D_I}(y)]
3    if ΔS > 0 then
4      定向为 X → Y; 应用 Meek 规则传播
5    else if ΔS < 0 then
6      定向为 X ← Y; 应用 Meek 规则传播
7  return E
```

**直觉**：对变量 $X$ 进行无条件干预会切断其父节点的因果影响。因此在干预数据 $P_I(v)$ 中，$Y$ 是 $X$ 的父节点当且仅当 $X$ 和 $Y$ 在 $P_I(v)$ 下边际独立。通过比较 $s_{D_I}(y, x)$（$Y$ 以 $X$ 为父节点的局部分数）和 $s_{D_I}(y)$（$Y$ 无父节点的局部分数），可判断独立性。

**定理 2（I-ORIENT 正确性）**：给定正确的观测 MEC $\mathcal{E}_0$ 和干预目标 $\mathcal{I}$，当每个干预的样本量趋于无穷时，I-ORIENT 恢复真实的 I-Markov 等价类。

### 先验知识引导

先验知识 $\mathcal{S} = \langle R, F \rangle$ 包含：
- **必需边集 $R$**：认为应该存在的边
- **禁止边集 $F$**：认为不应存在的边

**GetPriorityInserts** 函数将候选插入操作按优先级排序：
1. 最高优先级：$R$ 中的边（先验认为应存在的）
2. 中等优先级：不在 $F$ 中的边
3. 最低优先级：$F$ 中的边（先验认为不应存在的）

**鲁棒性**：即使先验知识完全错误，LGES 仍然渐近正确——错误的先验只影响搜索顺序，不影响最终结果（推论 1）。

### 实验关键结果

| 指标 | LGES vs GES | 说明 |
|------|-------------|------|
| 运行时间 | **快 ~10 倍** | ER-2 图, p=150, n=10⁴ |
| 结构汉明距离 (SHD) | **降低 ~2 倍** | 150 变量 300 边图上仅约 30 个错误边 |
| 误差来源 | 多余邻接 + 错误定向 | 缺失邻接几乎不发生 |
| 干预数据 | LGIES 比 GIES **快 ~10 倍，准确 ~1.5 倍** | p/10 个干预, 10³ 样本/干预 |
| 先验知识 | 正确率 ≥50% 时显著加速 | 优先级策略比初始化策略更鲁棒 |

### 复杂度分析

LGES 的计算节省来自：
- **跳过冗余插入**：SafeInsert 在前向阶段过滤掉条件独立的变量对，避免了 GES 中大量"插入后又删除"的循环
- **优先删除**：LGES 在每轮先执行删除和翻转操作，减少后续插入的搜索空间
- **先验引导**：优先检查高概率候选，找到有效插入后立即跳过低优先级候选

## 🧪 练习题

### Q1：SafeInsert 为什么依赖于 DAG 选择？

**问题**：在 SafeInsert 中，为什么对同一 MEC $\mathcal{E}$ 选择不同的 DAG $G$ 可能导致不同的过滤结果？请用一个具体例子说明。

<details><summary>答案</summary>

考虑 MEC $\mathcal{E}$ 包含两个 DAG：$G_1: X_1 \to Z \to Y$ 和 $G_2: X_1 \to Z \leftarrow Y$。

- 选择 $G_1$：$\text{Pa}_Y^{G_1} = \{Z\}$，若 $X_1 \perp\!\!\!\perp Y \mid Z$，则 SafeInsert 会过滤掉 INSERT$(X_1, Y, *)$
- 选择 $G_2$：$\text{Pa}_Y^{G_2} = \emptyset$，若 $X_1 \not\!\perp\!\!\!\perp Y$，则 SafeInsert 不会过滤 INSERT$(X_1, Y, *)$

因此同一变量对在不同 DAG 下的父节点集不同，导致条件独立性检验的条件集不同，过滤结果也不同。SafeInsert 的正确性保证是：无论选择哪个 $G$，如果存在有效的分数提升插入，它一定能找到一个（但不一定是同一个）。

</details>

### Q2：I-ORIENT 的分数差 ΔS 为什么能判断边的方向？

**问题**：在 I-ORIENT 中，$\Delta S = \sum_{I \in \mathcal{I}: X \in I, Y \notin I} [s_{D_I}(y, x) - s_{D_I}(y)]$ 的正负如何对应边的方向？请从因果机制的角度解释。

<details><summary>答案</summary>

当对 $X$ 进行无条件干预时，$X$ 的分布被设为固定的 $P^*(x)$，切断了 $X$ 的所有父节点对 $X$ 的影响。

**情况 1：真实方向是 $X \to Y$**（$X$ 是 $Y$ 的原因）
干预 $X$ 不切断 $X \to Y$ 的因果路径，$Y$ 仍依赖于 $X$。因此 $s_{D_I}(y, x) > s_{D_I}(y)$（加入 $X$ 作为 $Y$ 的父节点提高分数），$\Delta S > 0$。

**情况 2：真实方向是 $X \leftarrow Y$**（$Y$ 是 $X$ 的原因）
干预 $X$ 切断了 $Y \to X$ 的因果影响，使得 $X$ 和 $Y$ 在干预分布下边际独立。因此 $s_{D_I}(y, x) < s_{D_I}(y)$（加入 $X$ 作为 $Y$ 的父节点反而降低分数，因为是过拟合），$\Delta S < 0$。

</details>

### Q3：为什么 ConservativeInsert 实践中比 SafeInsert 更准确？

**问题**：论文实验显示 ConservativeInsert 在有限样本下通常比 SafeInsert 更准确，尽管理论保证更弱。请分析可能的原因。

<details><summary>答案</summary>

SafeInsert 只检查一个 DAG $G \in \mathcal{E}$ 下的条件独立性，而 ConservativeInsert 检查每个 INSERT 操作符对应的具体 DAG 的分数。这意味着：

1. **更多过滤机会**：ConservativeInsert 可能过滤掉 SafeInsert 遗漏的冗余插入。例如，SafeInsert 选择的 $G$ 可能恰好使某个变量对看起来不独立（因为父节点集不同），而 ConservativeInsert 通过检查该操作符对应的特定 DAG 能发现独立性。

2. **减少级联错误**：在有限样本下，每次错误插入都可能改变 MEC 结构，影响后续操作的评估。ConservativeInsert 更严格的过滤减少了早期错误插入的概率，从而减少了级联错误。

3. **理论保证弱但实践强**：ConservativeInsert 缺乏完整的渐近正确性证明，是因为理论上可能存在某些边缘情况使其遗漏有效插入。但在典型的随机图和有限样本场景下，这些边缘情况极少出现。

</details>