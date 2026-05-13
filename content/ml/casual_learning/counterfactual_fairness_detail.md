### Counterfactual Fairness

```yaml
id: counterfactual_fairness
arxiv: "1703.06856"
authors: [Matt J. Kusner, Joshua R. Loftus, Chris Russell, Ricardo Silva]
year: 2017
venue: NeurIPS 2017
tags: [fairness, causal-inference, counterfactual, structural-causal-model, algorithmic-fairness]
status: complete
```

---

## 📝 一句话总结

本文利用**结构因果模型（SCM）**中的反事实推理，提出了**反事实公平性（Counterfactual Fairness）**的形式化定义——要求预测器在假设个体敏感属性（如种族）被改变的反事实世界中输出不变，并给出了基于潜变量后验推断的实用算法。

---

## 🎯 核心要点

1. **反事实公平性定义**：预测器 $\hat{Y}$ 对敏感属性 $A$ 是反事实公平的，当且仅当对所有 $x, y, a, a'$：
   $$P(\hat{Y}_{A \leftarrow a}(U) = y \mid X=x, A=a) = P(\hat{Y}_{A \leftarrow a'}(U) = y \mid X=x, A=a)$$
   即：对于观测到 $(X=x, A=a)$ 的个体，若其敏感属性被反事实地设为 $a'$，预测结果的分布不变。

2. **Lemma 1（充分条件）**：若 $\hat{Y}$ 仅是 $A$ 的**非后代变量**（non-descendants）的函数，则 $\hat{Y}$ 满足反事实公平性。这为实际构建公平预测器提供了操作指南。

3. **三级因果假设**：
   - **Level 1**：仅使用观测到的 $A$ 的非后代变量（最弱假设，可能无可用特征）
   - **Level 2**：引入潜变量 $U$（如"知识 $K$"），$U$ 不是 $A$ 的后代，通过概率模型推断 $P(U \mid X, A)$
   - **Level 3**：完全确定性 SCM，$X_i = f_i(pa_i, U_i)$，误差项 $U_i$ 独立于 $A$，可通过残差直接估计

4. **FairLearning 算法**：用 MCMC 从因果模型 $\mathcal{M}$ 中采样潜变量后验 $P_\mathcal{M}(U \mid x, a)$，构建增广数据集，训练预测器 $g_\theta(U, X_{\not\succ A})$。

5. **与已有公平性概念的关系**：反事实公平性蕴含**人口统计均等（Demographic Parity）**，但不蕴含也不被蕴含于**机会均等（Equality of Opportunity）**——它们关注的层次不同（个体 vs. 群体）。

---

## 🔬 深入细节

### 1. 结构因果模型（SCM）背景

一个因果模型 $\mathcal{M} = \langle U, V, F \rangle$ 包含：
- **外生变量** $U = (U_1, \ldots, U_n)$：背景/噪声变量，服从联合分布 $P(U)$
- **内生变量** $V = (V_1, \ldots, V_n)$：可观测变量
- **结构方程** $F = \{f_1, \ldots, f_n\}$：$V_i = f_i(\text{pa}_i, U_i)$，其中 $\text{pa}_i \subseteq V \setminus \{V_i\}$

**反事实量**定义：$X_{A \leftarrow a}(u)$ 表示在背景变量为 $u$ 的世界中，将 $A$ 干预为 $a$ 后 $X$ 的取值。具体操作是将 $A$ 的结构方程替换为 $A := a$，然后在固定 $U=u$ 下求解所有内生变量。

### 2. 反事实公平性的形式化

**Definition 1（Counterfactual Fairness）**：

$$\forall y, a, a', x: \quad P(\hat{Y}_{A \leftarrow a}(U) = y \mid X=x, A=a) = P(\hat{Y}_{A \leftarrow a'}(U) = y \mid X=x, A=a)$$

关键洞察：条件 $X=x, A=a$ 限定了个体的背景变量 $U$ 的后验分布 $P(U \mid X=x, A=a)$。反事实操作 $A \leftarrow a'$ 改变了 $A$ 的所有后代变量，但不改变 $U$ 本身。

**Lemma 1 的证明思路**：若 $\hat{Y} = g(U, X_{\not\succ A})$，其中 $X_{\not\succ A}$ 是 $A$ 的非后代。在反事实世界 $A \leftarrow a'$ 中，$U$ 不变（外生变量），$X_{\not\succ A}$ 也不变（非后代不受 $A$ 干预影响），因此 $\hat{Y}_{A \leftarrow a'} = g(U, X_{\not\succ A}) = \hat{Y}_{A \leftarrow a}$。

### 3. FairLearning 算法

```
Algorithm: FairLearning(𝒟, ℳ)
Input: 训练数据 𝒟 = {(a⁽ⁱ⁾, x⁽ⁱ⁾, y⁽ⁱ⁾)}, 因果模型 ℳ
Output: 公平预测器参数 θ̂

1. 对每个数据点 i ∈ 𝒟:
   采样 m 个 MCMC 样本 U₁⁽ⁱ⁾, ..., Uₘ⁽ⁱ⁾ ~ P_ℳ(U | x⁽ⁱ⁾, a⁽ⁱ⁾)

2. 构建增广数据集 𝒟':
   每个原始点 (a⁽ⁱ⁾, x⁽ⁱ⁾, y⁽ⁱ⁾) 替换为 m 个点
   {(a⁽ⁱ⁾, x⁽ⁱ⁾, y⁽ⁱ⁾, uⱼ⁽ⁱ⁾) : j = 1,...,m}

3. 最小化经验损失:
   θ̂ = argmin_θ Σᵢ (1/m) Σⱼ l(y⁽ⁱ⁾, g_θ(uⱼ⁽ⁱ⁾, x_≠succ_A⁽ⁱ⁾))

4. 预测阶段:
   对新个体 (a*, x*), 采样 U* ~ P_ℳ(U | x*, a*)
   预测 Ŷ = g_θ̂(U*, x*_≠succ_A)
```

**核心思想**：通过因果模型推断出"去除敏感属性影响"的潜变量表示，再用这些潜变量做预测。

### 4. 三级假设详解与法学院实验

**实验设置**：Law School Admission Council 数据集，21,790 名法学院学生。
- **敏感属性 $A$**：种族 (Race, $R$) 和性别 (Sex, $S$)
- **观测特征 $X$**：入学考试成绩 (LSAT)、本科 GPA
- **预测目标 $Y$**：第一年平均成绩 (FYA)

#### Level 1：仅用观测非后代
由于 LSAT、GPA、FYA 均受种族和性别影响（都是 $A$ 的后代），Level 1 下**没有可用特征**，无法构建有意义的预测器。

#### Level 2：引入潜变量 $K$（知识）

因果图：$R, S \to \text{GPA}, \text{LSAT}, \text{FYA}$；$K \to \text{GPA}, \text{LSAT}, \text{FYA}$；$K \sim \mathcal{N}(0,1)$

结构方程：
$$\text{GPA} \sim \mathcal{N}(b_G + w_G^K K + w_G^R R + w_G^S S, \sigma_G)$$
$$\text{LSAT} \sim \text{Poisson}(\exp(b_L + w_L^K K + w_L^R R + w_L^S S))$$
$$\text{FYA} \sim \mathcal{N}(w_F^K K + w_F^R R + w_F^S S, 1)$$

使用 Stan 进行贝叶斯推断，估计 $K$ 的后验分布 $P(K \mid \text{GPA}, \text{LSAT}, R, S)$。预测器 **Fair $K$** 仅使用推断出的 $K$ 来预测 FYA。

#### Level 3：加性误差模型（Fair Add）

假设完全确定性的结构方程：
$$\text{GPA} = b_G + w_G^R R + w_G^S S + \epsilon_G, \quad \epsilon_G \sim p(\epsilon_G)$$
$$\text{LSAT} = b_L + w_L^R R + w_L^S S + \epsilon_L, \quad \epsilon_L \sim p(\epsilon_L)$$

残差 $\epsilon_G, \epsilon_L$ 通过回归 $R, S$ 预测 GPA/LSAT 后计算残差得到。预测器 **Fair Add** 使用 $(\epsilon_G, \epsilon_L)$ 作为特征。

#### 实验结果（Table 1, Logistic Regression）

| 模型 | 描述 | RMSE |
|------|------|------|
| **Full** | 使用所有特征（GPA, LSAT, R, S） | 0.873 |
| **Unaware** | 去除 R, S 但保留 GPA, LSAT | 0.894 |
| **Fair $K$** | Level 2，仅用推断的 $K$ | 0.929 |
| **Fair Add** | Level 3，用残差 $\epsilon_G, \epsilon_L$ | 0.918 |

**关键发现**：
- 公平预测器（Fair $K$, Fair Add）仅牺牲少量精度（RMSE 增加约 3-6%）即可保证反事实公平性
- Fair Add（Level 3）优于 Fair $K$（Level 2），因为更强的因果假设允许提取更多信息
- **Unaware 模型不公平**：虽然不直接使用种族/性别，但 GPA 和 LSAT 作为 $A$ 的后代携带了敏感信息

### 5. 公平性验证

论文通过密度图验证反事实公平性：对比 $\text{FYA}_{A \leftarrow a}$ 和 $\text{FYA}_{A \leftarrow a'}$ 的分布。Fair $K$ 和 Fair Add 模型下两个分布几乎完全重叠，而 Full 和 Unaware 模型下分布有明显差异。

### 6. 与其他公平性概念的关系

| 概念 | 层次 | 定义 | 与 CF 关系 |
|------|------|------|-----------|
| Demographic Parity | 群体 | $P(\hat{Y} \mid A=a) = P(\hat{Y} \mid A=a')$ | CF $\Rightarrow$ DP |
| Equality of Opportunity | 群体 | $P(\hat{Y} \mid A=a, Y=y) = P(\hat{Y} \mid A=a', Y=y)$ | 互不蕴含 |
| Individual Fairness | 个体 | 相似个体得到相似预测 | CF 提供因果度量 |
| Counterfactual Fairness | 个体 | 反事实世界中预测不变 | — |

### 7. 局限性与讨论

- **因果模型依赖**：需要领域专家提供正确的因果图，模型错误会导致不公平
- **不可测试性**：反事实本质上不可从观测数据验证（同一个体无法同时观测两个世界）
- **近似公平性**：论文也讨论了放松为近似反事实公平性 $d(P(\hat{Y}_{A \leftarrow a}), P(\hat{Y}_{A \leftarrow a'})) \leq \epsilon$ 的可能

---

## 🧪 练习题

### Q1（概念理解）
考虑一个招聘场景：敏感属性 $A$ = 性别，观测特征包括"工作年限"和"是否有育儿假记录"。在因果图中，"育儿假记录"是 $A$ 的后代，而"工作年限"不是。根据 Lemma 1，一个反事实公平的预测器可以使用哪些特征？

<details>
<summary>答案</summary>

根据 Lemma 1，反事实公平的预测器只能使用 $A$ 的**非后代变量**。"育儿假记录"是性别的后代（性别因果地影响育儿假），不能直接使用。"工作年限"若不是性别的后代，可以使用。此外，可以通过因果模型推断潜变量（如"真实工作能力"）来间接利用信息。

</details>

### Q2（公式推导）
在 Level 3 的加性误差模型 $\text{GPA} = b_G + w_G^R R + w_G^S S + \epsilon_G$ 中，证明残差 $\epsilon_G = \text{GPA} - b_G - w_G^R R - w_G^S S$ 满足反事实公平性条件（即 $\epsilon_G$ 不是 $A=(R,S)$ 的后代）。

<details>
<summary>答案</summary>

在 Level 3 的 SCM 中，$\epsilon_G$ 是外生变量（背景噪声），其定义为 $\epsilon_G = \text{GPA} - f(\text{pa}_{\text{GPA}})$。在反事实世界 $A \leftarrow a'$ 中，$\epsilon_G$ 保持不变（外生变量不受干预影响）。虽然 $\text{GPA}$ 本身是 $A$ 的后代，但 $\epsilon_G$ 作为结构方程中独立于 $A$ 的误差项，等价于 $U$ 的一部分，因此是 $A$ 的非后代。用残差 $\hat{\epsilon}_G = \text{GPA} - \hat{b}_G - \hat{w}_G^R R - \hat{w}_G^S S$ 近似 $\epsilon_G$，即可作为公平特征使用。

</details>

### Q3（批判性思考）
"Fairness through Unawareness"（不使用敏感属性）为什么不能保证反事实公平性？请用法学院实验的因果图给出具体反例。

<details>
<summary>答案</summary>

在法学院因果图中，种族 $R$ 因果地影响 GPA 和 LSAT（例如通过系统性偏见）。即使预测器不直接使用 $R$，GPA 和 LSAT 作为 $R$ 的后代仍然携带种族信息。具体地，对于一个黑人学生（$R=\text{Black}$），其 GPA 可能因系统性偏见而偏低。在反事实世界 $R \leftarrow \text{White}$ 中，其 GPA 会更高，导致 Unaware 模型的预测发生变化。实验中 Unaware 模型的 FYA 预测分布在不同种族间确实存在显著差异，RMSE=0.894 但不满足反事实公平性。

</details>