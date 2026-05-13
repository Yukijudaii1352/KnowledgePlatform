### GES（贪婪等价搜索）

```yaml
id: ges
name: GES
full_name: 贪婪等价搜索 (Greedy Equivalence Search)
year: 2002
org: Microsoft Research
paper_url: https://www.jmlr.org/papers/volume3/chickering02b/chickering02b.pdf
category: causal_inference
parent: pc
motivation: 在等价类空间贪婪搜索，优化BIC得分
```

#### 📝 一句话总结

GES 提出了一种在 DAG 等价类（CPDAG）空间上进行两阶段贪婪搜索的因果结构学习算法，通过证明 Meek 猜想建立了等价类空间的连通性，并利用可分解评分准则（如 BIC）的局部一致性，证明了算法在大样本极限下能够正确识别生成模型的因果结构。

#### 🎯 核心要点

- **搜索空间**：在 DAG 等价类空间（而非单个 DAG 空间）上搜索，用完全偏向图（CPDAG / Completed PDAG）表示等价类状态
- **两阶段贪婪搜索**：Phase I（前向）从空图开始逐步加边，Phase II（后向）逐步删边，每步选择使评分增加最多的操作
- **核心算子**：Insert(X, Y, T) 在 CPDAG 上插入有向边 X→Y 并定向相关无向边；Delete(X, Y, H) 删除边并调整方向
- **Meek 猜想证明**：证明了若 DAG H 是 DAG G 的独立映射，则存在有限序列的覆盖边反转和单边添加操作将 G 变换为 H
- **大样本一致性**：在数据由 DAG-perfect 分布生成且评分准则局部一致的条件下，GES 渐近收敛到真实等价类
- **评分准则**：使用可分解（decomposable）且等价（score-equivalent）的评分准则，如 BIC / BDeu，支持局部评分缓存加速
- **算子有效性条件**：Insert 要求 \(NA_{Y,X} \cup T\) 为团且 Y 到 X 的每条半有向路径经过 \(NA_{Y,X} \cup T\) 中的节点；Delete 要求 \(NA_{Y,X} \setminus H\) 为团

#### 🔬 深入细节

##### 背景与动机

因果结构学习（Causal Structure Learning）旨在从观测数据中恢复变量间的因果关系，通常表示为有向无环图（DAG）。基于评分的方法通过定义评分函数（如 BIC、BDeu）对候选 DAG 结构打分，搜索最优结构。然而，DAG 空间存在两个核心挑战：

1. **等价类问题**：多个 DAG 可能编码完全相同的条件独立关系（即属于同一 Markov 等价类），在观测数据下不可区分。在单个 DAG 空间（D-space）搜索会导致大量冗余。
2. **搜索空间爆炸**：n 个变量的 DAG 数量超指数增长（8 个变量就有超过 7000 亿个 DAG），即使贪婪搜索也面临巨大的邻域评估开销。

此前的方法包括：
- **D-space 搜索**：直接在 DAG 空间上搜索（Heckerman et al., 1995），使用加边、删边、翻转边操作，但无法保证找到全局最优
- **E-space 搜索**：在等价类空间搜索（Chickering, 1996），但缺乏理论最优性保证
- **约束方法（PC 算法）**：通过条件独立性检验构建骨架和 v-结构，但对检验错误敏感

GES 的核心动机是：**能否设计一种在等价类空间上的贪婪搜索算法，使其在大样本极限下保证找到真实因果结构？**

##### 关键概念

**DAG 等价类与 CPDAG**：两个 DAG 属于同一等价类，当且仅当它们具有相同的骨架（skeleton）和相同的 v-结构（v-structures）集合。每个等价类可以用一个完全偏向图（Completed PDAG, CPDAG）唯一表示：
- 有向边 \(X \to Y\)：表示该边在等价类中所有 DAG 中方向一致
- 无向边 \(X - Y\)：表示该边在不同 DAG 中可以有不同方向

**覆盖边（Covered Edge）**：DAG 中的边 \(X \to Y\) 是覆盖的，当且仅当 \(Pa(Y) = Pa(X) \cup \{X\}\)。覆盖边可以安全反转而不改变等价类。

**可分解评分准则**：评分函数 \(S(G, D)\) 可以分解为各节点的局部评分之和：

$$S(G, D) = \sum_{i=1}^{n} s(X_i, Pa_G(X_i), D)$$

这使得每次操作只需重新计算受影响节点的局部评分，大幅降低计算开销。

**局部一致性（Local Consistency）**：设 \(G'\) 是在 \(G\) 中添加边 \(X_i \to X_j\) 得到的 DAG，则在大样本极限下：
1. 若 \(X_j \not\perp\!\!\!\perp_p X_i \mid Pa_G(X_j)\)，则 \(S(G', D) > S(G, D)\)（添加消除了一个不成立的独立约束）
2. 若 \(X_j \perp\!\!\!\perp_p X_i \mid Pa_G(X_j)\)，则 \(S(G', D) < S(G, D)\)（添加引入了冗余参数）

##### Meek 猜想与等价类空间连通性

GES 的理论基础建立在 **Meek 猜想**（1997）的证明之上：

> **定理 4（Meek 猜想）**：设 DAG H 是 DAG G 的独立映射（即 G 蕴含的每个独立关系 H 也蕴含），则存在一个有限操作序列，包含覆盖边反转和单边添加，将 G 变换为 H，且序列中每一步都保持 DAG 性质和独立映射关系。

这个定理保证了等价类空间在 Insert 操作下的连通性：从任何等价类出发，都可以通过一系列单边添加（加上必要的覆盖边反转）到达包含真实分布的等价类。

证明的核心算法 **Apply-Edge-Operation** 的工作流程：
1. 找到同时是 G 和 H 中汇节点（sink）的节点 Y
2. 若 Y 在 G 中无子节点但在 H 中有额外父节点，直接添加边
3. 否则，找到 Y 的后代 D，通过覆盖边反转将 Y→D 路径上的边逐步反转，使 D 成为 Y 的父节点
4. 重复直到 G = H

##### GES 算法伪代码

```
算法: GES (Greedy Equivalence Search)
输入: 数据集 D, 可分解评分准则 S
输出: 等价类 E（以 CPDAG 表示）

# Phase I: 前向搜索（加边）
E ← 空图对应的等价类
repeat:
    对 E 的 CPDAG 中每对非邻接节点 (X, Y):
        对 Y 的邻居中不与 X 邻接的子集 T:
            若 Insert(X, Y, T) 有效（NA_{Y,X} ∪ T 为团 且 半有向路径条件满足）:
                计算 ΔScore = s(Y, Pa_new(Y)) - s(Y, Pa_old(Y))
                              + Σ_{Z∈T} [s(Z, Pa_new(Z)) - s(Z, Pa_old(Z))]
    选择使 ΔScore 最大且 > 0 的操作执行
until 无操作能增加评分

# Phase II: 后向搜索（删边）
repeat:
    对 E 的 CPDAG 中每对邻接节点 (X, Y):
        对 NA_{Y,X} 的子集 H:
            若 Delete(X, Y, H) 有效（NA_{Y,X} \ H 为团）:
                计算 ΔScore（类似上述）
    选择使 ΔScore 最大且 > 0 的操作执行
until 无操作能增加评分

return E
```

##### Insert 与 Delete 算子详解

**Insert(X, Y, T) 算子**：
- **前提**：X 和 Y 在 CPDAG 中不邻接
- **参数**：T 是 Y 的邻居中不与 X 邻接的节点子集
- **操作**：(1) 插入有向边 X→Y；(2) 将 T 中每个节点与 Y 之间的无向边定向为 T→Y
- **有效性条件**：
  - \(NA_{Y,X} \cup T\) 构成团（clique）
  - 从 Y 到 X 的每条半有向路径（semi-directed path）都经过 \(NA_{Y,X} \cup T\) 中的某个节点

> 💡 **关键直觉**：Insert 操作本质上是在等价类层面添加一条边。T 的选择决定了哪些原本无向的边需要被定向（因为新加的边可能引入新的 v-结构）。有效性条件确保操作后的图仍然是合法的 CPDAG。

**Delete(X, Y, H) 算子**：
- **前提**：X 和 Y 在 CPDAG 中邻接（有向或无向边）
- **参数**：H 是 \(NA_{Y,X}\) 的子集（保留为邻居的节点）
- **操作**：(1) 删除 X 和 Y 之间的边；(2) 将 \(NA_{Y,X} \setminus H\) 中每个节点与 Y 之间的无向边定向
- **有效性条件**：\(NA_{Y,X} \setminus H\) 构成团

##### 评分增量的高效计算

由于评分准则的可分解性，每次 Insert 或 Delete 操作只影响少数节点的局部评分。具体地：

对于 Insert(X, Y, T)，评分变化为：

$$\Delta S = s(Y, Pa_{new}(Y)) - s(Y, Pa_{old}(Y))$$

其中 \(Pa_{new}(Y) = Pa_{old}(Y) \cup \{X\} \cup T\)。类似地，T 中节点的父节点集也会改变。

GES 实现中缓存每个节点的局部评分，使得评估单个操作的时间复杂度仅依赖于受影响节点的父节点集大小，而非整个网络。

##### 大样本最优性证明思路

GES 的最优性证明分两步：

**Phase I 正确性（Lemma 9）**：在大样本极限下，Phase I 结束时的等价类 E 包含（contain）真实分布 p。即 E 中的 DAG 蕴含的所有独立关系在 p 中都成立。

证明利用了 DAG-perfect 分布满足的合成公理（composition axiom）的逆否命题：若 X 不独立于集合 **Y** 给定 **Z**，则存在 Y∈**Y** 使得 X 不独立于 Y 给定 **Z**。这保证了只要存在缺失的依赖关系，总能找到一个 Insert 操作来增加评分。

**Phase II 正确性（Theorem 12）**：Phase II 结束时的等价类是真实分布的完美映射（perfect map）。

证明利用 Theorem 4（Meek 猜想）：如果 Phase II 的结果不是完美映射，则存在某个 Delete 操作可以增加评分（因为存在冗余的依赖关系），与局部最大值矛盾。

> ⚠️ **注意**：大样本一致性要求数据由 DAG-perfect 分布生成（即存在一个 DAG 完美表示该分布的所有独立关系）。若真实分布不是 DAG-perfect（如存在隐变量导致的非忠实性），GES 不保证找到正确结构。

##### 与传统方法的对比

| 特性 | D-space 搜索 | E-space 搜索 | PC 算法 | **GES** |
|------|-------------|-------------|---------|---------|
| 搜索空间 | 单个 DAG | 等价类 | — | 等价类 |
| 方法类型 | 基于评分 | 基于评分 | 基于约束 | 基于评分 |
| 大样本一致性 | ✗ | ✗ | ✓ | **✓** |
| 操作 | 加/删/翻转边 | 等价类操作 | 条件独立检验 | Insert/Delete |
| 评分等价性 | 不保证 | 保证 | — | **保证** |
| 冗余搜索 | 多（同一等价类多次访问） | 少 | — | **少** |

GES 相比 D-space 搜索的核心优势：
1. **避免冗余**：等价类空间远小于 DAG 空间
2. **理论保证**：大样本下保证找到真实结构
3. **评分等价性**：同一等价类中的 DAG 评分相同，不会在等价 DAG 间无意义跳转

##### 实验验证

**合成数据实验**：基于 13 变量的 MediaMetrix 数据集结构生成 100 个金标准网络，在 500-10000 样本量范围内比较 GES、D-space 和 E-space 搜索。结果显示 GES 在识别真实等价类方面显著优于其他两种方法，且随样本量增加优势更明显。

**真实数据实验**：在 6 个数据集上评估（MSWeb/292变量、Nielsen、EachMovie、MediaMetrix/13变量、HouseVotes/16变量、Mushroom/22变量），使用 BDeu 评分和 70/30 训练/测试划分。GES 在大多数数据集上取得了与 D-space 和 E-space 搜索相当或更优的测试集对数似然，同时搜索效率更高。

#### 🧪 练习题

```yaml
question: "GES 算法 Phase I（前向搜索）结束时，关于当前等价类 E 与真实分布 p 的关系，以下哪项在大样本极限下成立？"
options:
  - "E 是 p 的完美映射（perfect map）"
  - "E 包含 p（即 E 中 DAG 蕴含的所有独立关系在 p 中成立）"
  - "E 与 p 的真实等价类完全相同"
  - "E 中的 DAG 边数等于真实 DAG 的边数"
answer: 1
explain: "Phase I 结束时 E 包含（contain）真实分布，即 E 可能有多余的边但不会缺少必要的依赖关系。完美映射需要等到 Phase II 删除冗余边后才能达到。"
```