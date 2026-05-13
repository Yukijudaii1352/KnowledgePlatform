### PC 算法 (PC Algorithm)

```yaml
id: pc
name: PC
full_name: PC算法 (PC Algorithm)
year: 1991
org: 卡内基梅隆大学 (Carnegie Mellon University)
paper_url: https://philpapers.org/rec/SPICPA
category: causal_inference
parent: —
motivation: 基于条件独立性检验从观测数据中发现因果图结构的约束方法，通过仅在邻居集合中搜索分离集将复杂度从指数降为多项式
```

#### 📝 一句话总结

PC 算法通过条件独立性检验逐步删边并识别碰撞结构（collider），从观测数据中恢复因果有向无环图（DAG）的等价类，是约束型因果发现方法的奠基算法。相比 SGS 算法，PC 仅在当前骨架的邻居集合中搜索条件集，将稀疏图上的复杂度从指数级降为多项式级。

#### 🎯 核心要点

- **约束型因果发现**：利用条件独立性关系作为约束条件，从数据中恢复因果图结构
- **三阶段流程**：骨架发现（边删除） → 碰撞结构识别（v-structure） → 边方向传播
- **邻居搜索优化**：PC 算法仅在当前骨架的邻居集中搜索分离集，相比 SGS 的全集搜索大幅降低复杂度
- **核心假设**：因果马尔可夫性（Causal Markov Property）+ 忠实性（Faithfulness）+ 因果充分性（Causal Sufficiency）
- **一致性保证**：当条件独立性检验一致时，PC 算法以概率收敛到真实因果图
- **等价类输出**：输出完成的部分有向无环图（CPDAG），表示马尔可夫等价类中所有兼容的 DAG
- **命名来源**：Peter Spirtes 和 Clark Glymour 的首字母缩写（Peter-Clark）

#### 🔬 深入细节

##### 核心框架示意

```
观测数据 → 条件独立性检验 → 骨架发现 → 碰撞识别 → 方向传播 → CPDAG
     ↓              ↓              ↓           ↓           ↓
  样本矩阵    统计检验(偏相关/   删除独立边    X→Z←Y     Meek规则
              χ²/核方法)        保留依赖边    模式识别    递归定向
```

*图：PC 算法的完整流程。从完全无向图出发，通过条件独立性检验逐步精炼，最终输出因果图的等价类表示（CPDAG）。*

##### 算法伪代码

```python
# PC Algorithm 伪代码
def PC_algorithm(V, CI_test, alpha):
    """
    V: 变量集合 {X1, X2, ..., Xp}
    CI_test: 条件独立性检验函数
    alpha: 显著性水平
    """
    # === 阶段1: 骨架发现 (Skeleton Discovery) ===
    G = complete_undirected_graph(V)  # 从完全图开始
    sep_set = {}  # 记录分离集
    d = 0  # 条件集大小，从0开始递增
    
    while d <= max_degree(G):
        for each edge (X, Y) in G:
            # 关键优化：仅在X的邻居中搜索（排除Y）
            neighbors = adj(G, X) \ {Y}
            for each subset S ⊆ neighbors, |S| = d:
                if CI_test(X, Y | S) > alpha:  # X ⊥ Y | S
                    remove_edge(G, X, Y)
                    sep_set[(X,Y)] = S
                    break
        d += 1
    
    # === 阶段2: 碰撞结构识别 (V-structure Orientation) ===
    for each triple (X, Z, Y) where X-Z-Y and X,Y not adjacent:
        if Z not in sep_set[(X,Y)]:
            orient as X → Z ← Y  # Z是碰撞节点
    
    # === 阶段3: 方向传播 (Orientation Propagation, Meek Rules) ===
    repeat until no change:
        # Rule 1: X → Z - Y 且 X,Y不相邻 → Z → Y
        # Rule 2: X → Z → Y 且 X - Y → X → Y
        # Rule 3: X - Z → Y, X - W → Y, Z,W不相邻 → X → Y
        apply_meek_rules(G)
    
    return G  # CPDAG
```

##### 动机与背景

**核心问题**：给定一组变量的观测数据（非实验数据），能否仅从统计关联中恢复变量间的因果关系？

传统方法的局限：
- **随机对照实验**（RCT）是因果推断的金标准，但在许多场景中不可行（伦理、成本、时间）
- **相关性≠因果性**：仅凭相关矩阵无法区分 \(X \to Y\)、\(Y \to X\) 和 \(X \leftarrow Z \to Y\)
- **贝叶斯方法**（如 K2 算法）需要已知变量排序，且计算代价高

PC 算法的突破在于：利用**忠实性假设**，将因果图结构与条件独立性关系建立双射，从而可以通过统计检验反推因果结构。

##### 核心理论基础

**1. 因果马尔可夫性 (Causal Markov Property)**

在因果 DAG \(G\) 中，每个变量在给定其父节点后，与所有非后代变量条件独立：

$$X \perp\!\!\!\perp \text{NonDesc}(X) \mid \text{Pa}(X)$$

这意味着因果图编码了一组条件独立性约束。

**2. d-分离 (d-separation)**

d-分离是判断图中条件独立性的图论准则。路径 \(X \to \cdots \to Y\) 被条件集 \(S\) 阻断，当且仅当路径上存在：
- **链/叉**节点 \(Z\)（\(X \to Z \to Y\) 或 \(X \leftarrow Z \to Y\)）且 \(Z \in S\)
- **碰撞**节点 \(Z\)（\(X \to Z \leftarrow Y\)）且 \(Z \notin S\) 且 \(Z\) 的后代均不在 \(S\) 中

$$X \perp\!\!\!\perp_G Y \mid S \iff \text{所有} X\text{-}Y \text{路径被} S \text{d-分离}$$

**3. 忠实性 (Faithfulness)**

分布 \(P\) 对图 \(G\) 忠实，意味着 \(P\) 中的条件独立性**恰好**是 \(G\) 中 d-分离所蕴含的那些——不多也不少：

$$X \perp\!\!\!\perp_P Y \mid S \iff X \perp\!\!\!\perp_G Y \mid S$$

> 💡 关键：忠实性排除了"巧合性"的独立——即参数恰好取特殊值导致的非结构性独立。这使得我们可以从独立性关系唯一地反推图结构。

**4. 碰撞结构的可辨识性**

考虑三变量模式 \(X - Z - Y\)（X 和 Y 不直接相连）：
- **链** \(X \to Z \to Y\)：\(X \perp\!\!\!\perp Y \mid Z\)（条件于 Z 后独立）
- **叉** \(X \leftarrow Z \to Y\)：\(X \perp\!\!\!\perp Y \mid Z\)（条件于 Z 后独立）
- **碰撞** \(X \to Z \leftarrow Y\)：\(X \perp\!\!\!\perp Y\) 但 \(X \not\!\perp\!\!\!\perp Y \mid Z\)（条件于 Z 后**反而依赖**）

> ⚠️ 注意：碰撞结构（v-structure）是唯一可以从观测数据中区分方向的三变量模式。链和叉产生相同的独立性模式，因此属于同一马尔可夫等价类。

##### PC 与 SGS 的关键区别

SGS 算法（Spirtes-Glymour-Scheines）是 PC 的前身，两者的骨架发现结果相同，但搜索策略不同：

| 特性 | SGS | PC |
|------|-----|-----|
| 条件集搜索范围 | 所有其他变量的子集 | 仅当前邻居的子集 |
| 最坏复杂度 | \(O(2^p)\) | \(O(p^{d+2})\)，\(d\) 为最大度 |
| 稀疏图性能 | 指数级 | 多项式级 |
| 正确性 | 一致 | 一致（等价于SGS） |

> 💡 关键：PC 算法的核心洞察是——如果 \(X \perp\!\!\!\perp Y \mid S\) 对某个集合 \(S\) 成立，那么必然存在一个仅包含 \(X\) 或 \(Y\) 的邻居的子集 \(S'\) 也使得 \(X \perp\!\!\!\perp Y \mid S'\) 成立。这一性质保证了仅搜索邻居集的充分性。

##### 条件独立性检验的实现

PC 算法是模块化的——核心逻辑与具体的条件独立性检验方法解耦：

**高斯线性情况**：检验偏相关系数是否为零

$$\rho_{XY \cdot S} = 0 \iff X \perp\!\!\!\perp Y \mid S$$

使用 Fisher z-变换构造检验统计量：

$$z = \frac{1}{2} \sqrt{n - |S| - 3} \cdot \ln\frac{1 + \hat{\rho}_{XY \cdot S}}{1 - \hat{\rho}_{XY \cdot S}} \sim N(0,1) \text{ under } H_0$$

**离散情况**：使用 \(\chi^2\) 检验或 G-检验

**非参数情况**：核方法（KCIT）、互信息估计等

##### Meek 方向传播规则

在碰撞结构确定后，以下规则递归应用以确定更多边的方向：

- **Rule 1**：若 \(X \to Y - Z\) 且 \(X, Z\) 不相邻，则 \(Y \to Z\)（避免产生新碰撞）
- **Rule 2**：若 \(X \to Y \to Z\) 且 \(X - Z\)，则 \(X \to Z\)（避免产生环）
- **Rule 3**：若存在 \(X - Y \to Z\) 和 \(X - W \to Z\)，且 \(Y, W\) 不相邻，则 \(X \to Z\)

这些规则保证：(1) 不引入新的碰撞结构；(2) 不引入有向环；(3) 结果是唯一的 CPDAG。

##### 一致性与局限性

**一致性定理**：若条件独立性检验是一致的（即随样本量趋于无穷，检验功效趋于1），则：

$$\lim_{n \to \infty} \Pr(\hat{G}_n \neq G) = 0$$

**重要局限**：
1. **无均匀一致性**（Robins et al., 2003）：不存在对所有分布均匀收敛的因果发现方法——对手可以让依赖性任意弱
2. **因果充分性假设**：若存在未观测的混杂变量，PC 算法可能产生错误结果（此时需使用 FCI 算法）
3. **忠实性假设**：在参数空间中测度为零的集合上可能违反，但实践中可能出现近似违反
4. **检验顺序敏感性**：有限样本下，不同的边检验顺序可能导致不同结果（稳定版 PC-stable 解决此问题）

#### 🧪 练习题

```yaml
question: "在PC算法中，碰撞结构(v-structure) X→Z←Y 的识别依据是什么？"
options:
  - "X和Y在给定Z后条件独立"
  - "X和Y边缘独立，但在给定Z后条件依赖"
  - "X和Y在给定Z后条件依赖，且Z不在X-Y的分离集中"
  - "X和Y之间存在直接边"
answer: 2
explain: "碰撞结构的识别需要两个条件：(1) X-Z-Y形成无向路径且X,Y不直接相邻；(2) 中间节点Z不在使X⊥Y的分离集中。这等价于条件于Z后X和Y变得依赖（explaining away效应），即选项C所述。"
```