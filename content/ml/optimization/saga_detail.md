### SAGA: 快速增量梯度法

```yaml
id: saga
name: SAGA
full_name: "SAGA: A Fast Incremental Gradient Method With Support for Non-Strongly Convex Composite Objectives"
year: 2014
org: INRIA
paper_url: https://arxiv.org/abs/1407.0202
category: stochastic
parent: svrg
motivation: 无偏梯度估计，支持近端算子
```

## 📝 一句话总结

SAGA 是一种基于方差缩减的增量梯度方法，通过维护每个分量函数的历史梯度表并构造**无偏**梯度估计，在支持近端算子和非强凸问题的同时，实现了与 SAG/SVRG 匹配的线性收敛速率。

## 🎯 核心要点

1. **无偏梯度估计**：与 SAG（$\alpha=1/n$，有偏）不同，SAGA 使用 $\alpha=1$ 的方差缩减策略，梯度估计无偏，使得理论分析更简洁、收敛常数更优。

2. **支持近端算子**：SAGA 天然兼容复合目标 $\min_x \frac{1}{n}\sum_{i=1}^n f_i(x) + h(x)$，其中 $h(x)$ 可以是非光滑正则项（如 $\ell_1$ 范数），通过 proximal 步骤处理。

3. **强凸与非强凸统一**：强凸情况下以 $\gamma = \frac{1}{2(\mu n + L)}$ 获得线性收敛；非强凸情况下以 $\gamma = \frac{1}{3L}$ 获得 $O(n/k)$ 次线性收敛率，无需外层循环。

4. **方差缩减原理**：构造 $\theta = (X - Y) + \mathbb{E}Y$，其中 $X = f_j'(x^k)$，$Y = f_j'(\phi_j^k)$，利用 $X$ 和 $Y$ 的高相关性减小方差。

5. **方法定位**：SAGA 是 SAG 和 SVRG 的中间方法——与 SAG 共享增量存储结构，与 SVRG 共享无偏性质，同时避免了 SVRG 的周期性全梯度计算。

## 🔬 深入细节

### 示意图

![SAGA方法比较](https://ar5iv.labs.arxiv.org/html/1407.0202/assets/figure1.png)

> **Figure 1**: 方法特性对比。SAGA 是唯一同时支持强凸、非强凸、近端算子、自适应强凸性且具有简单证明的方法。

| 方法 | 强凸 | 非强凸 | 近端算子 | 自适应 | 简单证明 |
|------|:----:|:------:|:--------:|:------:|:--------:|
| SAG  | ✓    | ✗      | ✗        | ✗      | ✗        |
| SVRG | ✓    | ✓      | ✓        | ✗      | ✓        |
| SDCA | ✓    | ✗      | ✓        | ✗      | ✓        |
| **SAGA** | **✓** | **✓** | **✓** | **✓** | **✓** |

### 伪代码

```
Algorithm: SAGA
────────────────────────────────────────────
输入: 步长 γ, 初始点 x⁰, 初始梯度表 {f_i'(φ_i⁰)}_{i=1}^n
初始化: 梯度均值 ḡ⁰ = (1/n) Σᵢ f_i'(φ_i⁰)

for k = 0, 1, 2, ... do
    1. 均匀随机选取 j ∈ {1, ..., n}
    2. 更新参考点: φ_j^{k+1} = x^k (其余不变)
    3. 计算方向: d^k = f_j'(x^k) - f_j'(φ_j^k) + ḡ^k
    4. 更新梯度均值: ḡ^{k+1} = ḡ^k + (1/n)[f_j'(x^k) - f_j'(φ_j^k)]
    5. 近端更新: x^{k+1} = prox_{γh}(x^k - γ d^k)
end for
────────────────────────────────────────────
```

### 方法解释

**问题设定**：最小化复合目标

$$\min_{x \in \mathbb{R}^d} \quad \frac{1}{n}\sum_{i=1}^n f_i(x) + h(x)$$

其中每个 $f_i$ 是 $L$-光滑凸函数，$h$ 是近端友好的凸函数（可能非光滑）。

**方差缩减框架**：给定两个相关随机变量 $X, Y$，构造控制变量估计：

$$\theta_\alpha = \alpha(X - Y) + \mathbb{E}Y$$

- 当 $\alpha = 1$ 时：$\mathbb{E}\theta_1 = \mathbb{E}X$（**无偏**，SAGA 采用）
- 当 $\alpha = 1/n$ 时：有偏但方差更小（SAG 采用）
- 方差为 $\text{Var}(\theta_\alpha) = \alpha^2[\text{Var}(X) + \text{Var}(Y) - 2\text{Cov}(X,Y)]$

**SAGA 更新**：在 SAGA 中，$X = f_j'(x^k)$，$Y = f_j'(\phi_j^k)$，$\mathbb{E}Y = \frac{1}{n}\sum_i f_i'(\phi_i^k)$：

$$x^{k+1} = \text{prox}_{\gamma h}\left(x^k - \gamma\left[f_j'(x^k) - f_j'(\phi_j^k) + \frac{1}{n}\sum_{i=1}^n f_i'(\phi_i^k)\right]\right)$$

**无偏性验证**：

$$\mathbb{E}_j[f_j'(x^k) - f_j'(\phi_j^k) + \frac{1}{n}\sum_i f_i'(\phi_i^k)] = \frac{1}{n}\sum_i f_i'(x^k) = f'(x^k)$$

这是完整梯度的无偏估计，这一性质使得 SAGA 的收敛证明大幅简化。

**与 SVRG 的区别**：SVRG 使用周期性快照点 $\tilde{x}$ 替代逐分量存储：

$$x^{k+1} = x^k - \gamma\left[f_j'(x^k) - f_j'(\tilde{x}) + \frac{1}{n}\sum_i f_i'(\tilde{x})\right]$$

SVRG 需要每隔 $m$ 步计算一次全梯度（$O(n)$ 代价），而 SAGA 通过增量更新梯度表避免了这一开销，但需要 $O(nd)$ 额外存储。

**等价重构（非复合情形）**：引入辅助变量 $u^k = x^k + \gamma\sum_i f_i'(\phi_i^k)$：

$$u^{k+1} = u^k + \frac{1}{n}(x^k - u^k)$$

这揭示了 SAGA 与 Finito/MISO 方法的联系：SAGA 使用期望等价的 $u$ 更新替代 Finito 的精确 $\bar{\phi}$ 更新，从而免去存储所有 $\phi_i$ 的需要。

### 收敛性分析

**定理 1（强凸情形）**：设每个 $f_i$ 为 $L$-光滑凸函数，$f = \frac{1}{n}\sum_i f_i$ 为 $\mu$-强凸（$\mu > 0$），步长取 $\gamma = \frac{1}{2(\mu n + L)}$，则：

$$\mathbb{E}\left[\|x^k - x^*\|^2 + \frac{1}{n}\sum_i \frac{2}{L}\left(f_i(\phi_i^k) - f_i(x^*) - f_i'(x^*)({\phi_i^k - x^*})\right)\right]$$

以速率 $\rho = 1 - \frac{\mu}{2(\mu n + L)}$ 线性收敛。

**总复杂度**：达到 $\epsilon$-精度需要 $O\left(\left(n + \frac{L}{\mu}\right)\log\frac{1}{\epsilon}\right)$ 次梯度计算。

- 当 $L/\mu \leq n$ 时，复杂度为 $O(n\log(1/\epsilon))$，与 SAG 相同
- 当 $L/\mu > n$ 时，复杂度为 $O((L/\mu)\log(1/\epsilon))$，优于全梯度法的 $O(n \cdot (L/\mu)\log(1/\epsilon))$

**定理 2（非强凸情形）**：设每个 $f_i$ 为 $L$-光滑凸函数，步长取 $\gamma = \frac{1}{3L}$，则：

$$\mathbb{E}[f(x^k) - f(x^*)] \leq O\left(\frac{nL\|x^0 - x^*\|^2 + \sum_i \|x^0 - \phi_i^0\|^2}{k}\right)$$

收敛率为 $O(n/k)$，无需重启或外层循环。

**自适应强凸性**：SAGA 自动适应目标函数的固有强凸性——即使用户不知道 $\mu$ 的值，使用非强凸步长 $\gamma = 1/(3L)$ 时，如果问题实际是 $\mu$-强凸的，SAGA 仍能获得线性收敛（虽然常数不如已知 $\mu$ 时最优）。

### 关键公式汇总

| 公式 | 表达式 |
|------|--------|
| SAGA 更新 | $x^{k+1} = \text{prox}_{\gamma h}(x^k - \gamma[f_j'(x^k) - f_j'(\phi_j^k) + \bar{g}^k])$ |
| 梯度表更新 | $\bar{g}^{k+1} = \bar{g}^k + \frac{1}{n}[f_j'(x^k) - f_j'(\phi_j^k)]$ |
| 强凸步长 | $\gamma = \frac{1}{2(\mu n + L)}$ |
| 强凸收敛率 | $\rho = 1 - \frac{\mu}{2(\mu n + L)}$ |
| 非强凸步长 | $\gamma = \frac{1}{3L}$ |
| 非强凸收敛率 | $O\left(\frac{nL}{k}\right)$ |

## 🧪 练习题

1. **概念理解**：解释为什么 SAGA 的梯度估计 $g^k = f_j'(x^k) - f_j'(\phi_j^k) + \bar{g}^k$ 是全梯度 $f'(x^k)$ 的无偏估计。SAG 的对应估计为什么是有偏的？

2. **方差分析**：设所有 $\phi_i^k = x^*$（最优解），证明此时 SAGA 梯度估计的方差为零。这说明了什么？

3. **复杂度比较**：对于 $n = 10^6$，$L/\mu = 10^4$ 的问题，分别计算 SAGA、全梯度下降法（GD）和 SGD 达到 $\epsilon = 10^{-6}$ 精度所需的梯度计算次数（忽略常数）。

4. **近端算子推导**：对于 $h(x) = \lambda\|x\|_1$（Lasso 正则），写出 SAGA 中 $\text{prox}_{\gamma h}(\cdot)$ 的显式表达式，并解释为什么 SAG 不能直接支持这种非光滑正则。

5. **实现优化**：SAGA 需要存储 $n$ 个 $d$ 维梯度向量。对于稀疏数据（如文本分类中的 TF-IDF 特征），如何利用数据稀疏性减少存储和计算开销？提示：考虑 "lazy update" 策略。