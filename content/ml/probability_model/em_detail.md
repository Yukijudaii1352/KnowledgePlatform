### EM

```yaml
id: em
name: EM
full_name: 期望最大化算法 (Expectation-Maximization)
year: '1977'
org: Harvard
paper_url: https://academic.oup.com/jrsssb/article/39/1/1/7033013
category: foundation
parent: gmm
motivation: 隐变量下迭代极大化似然
```

#### 📝 一句话总结

EM 算法提出了一种在含隐变量（或不完全数据）的概率模型中迭代求解最大似然估计（MLE）的通用框架，通过交替执行**期望步（E-step）**和**最大化步（M-step）**，保证似然函数单调不减地收敛到驻点，成为混合模型、缺失数据处理、隐马尔可夫模型等众多领域的基石算法。

#### 🎯 核心要点

- **不完全数据框架**：将观测数据 \(\mathbf{x}\) 视为完全数据 \((\mathbf{x}, \mathbf{z})\) 的边际化结果，\(\mathbf{z}\) 为隐变量或缺失数据，统一处理多种"不完全"场景
- **E-step**：在当前参数 \(\boldsymbol{\theta}^{(t)}\) 下，计算完全数据对数似然关于隐变量后验的条件期望 \(Q(\boldsymbol{\theta}|\boldsymbol{\theta}^{(t)})\)
- **M-step**：最大化 \(Q\) 函数以更新参数 \(\boldsymbol{\theta}^{(t+1)} = \arg\max_{\boldsymbol{\theta}} Q(\boldsymbol{\theta}|\boldsymbol{\theta}^{(t)})\)
- **似然单调性**：严格证明每次迭代后观测数据对数似然不减，即 \(\ell(\boldsymbol{\theta}^{(t+1)}) \geq \ell(\boldsymbol{\theta}^{(t)})\)
- **收敛性分析**：证明在正则条件下 EM 收敛到似然函数的驻点（局部极大值或鞍点）
- **收敛速率**：线性收敛，速率由缺失信息比例决定——缺失信息越多，收敛越慢
- **广义 EM（GEM）**：M-step 不要求全局最大化，只需使 \(Q\) 函数增大即可保证收敛
- **广泛应用**：混合分布估计、删失/截断数据、分组数据、因子分析、隐马尔可夫模型等

#### 🔬 深入细节

##### 核心框架示意图

![EM 算法在高斯混合模型上的迭代过程](https://upload.wikimedia.org/wikipedia/commons/6/69/EM_Clustering_of_Old_Faithful_data.gif)
*图 1：EM 算法在 Old Faithful 间歇泉数据上拟合二元高斯混合模型的迭代过程。E-step 根据当前高斯参数计算每个数据点的隐变量后验（软分配），M-step 根据软分配重新估计高斯参数，交替迭代直至收敛。*

![scikit-learn GMM 聚类结果示意](https://scikit-learn.org/stable/_images/sphx_glr_plot_gmm_001.png)
*图 2：EM 迭代过程中似然函数单调上升的示意。每次 E-step 构造一个紧贴当前参数点的下界函数（Q 函数），M-step 最大化该下界，从而"抬升"似然值。*

##### 算法伪代码

```python
# EM 算法通用框架
# 输入: 观测数据 X, 初始参数 θ⁰, 收敛阈值 ε

θ = θ⁰
while not converged:
    # ===== E-step =====
    # 计算 Q 函数: 完全数据对数似然在隐变量后验下的期望
    # Q(θ|θ_old) = E_{Z|X,θ_old}[log p(X, Z | θ)]
    Q = compute_Q(X, θ)
    
    # ===== M-step =====
    # 最大化 Q 函数更新参数
    θ_new = argmax_θ Q(θ | θ_old)
    
    # 收敛检查
    if |ℓ(θ_new) - ℓ(θ)| < ε:
        converged = True
    θ = θ_new

return θ

# ===== 高斯混合模型 (GMM) 的 EM 具体实例 =====
# K 个高斯分量, 参数: π_k (混合权重), μ_k (均值), Σ_k (协方差)

θ = initialize(K)
while not converged:
    # E-step: 计算每个数据点属于各分量的后验概率 (责任值)
    for n in range(N):
        for k in range(K):
            γ(z_nk) = π_k * N(x_n | μ_k, Σ_k) / Σ_j π_j * N(x_n | μ_j, Σ_j)
    
    # M-step: 用责任值加权更新参数
    for k in range(K):
        N_k = Σ_n γ(z_nk)                          # 有效样本数
        μ_k = (1/N_k) * Σ_n γ(z_nk) * x_n          # 加权均值
        Σ_k = (1/N_k) * Σ_n γ(z_nk) * (x_n-μ_k)(x_n-μ_k)ᵀ  # 加权协方差
        π_k = N_k / N                               # 混合权重
```

##### 动机与背景

**核心问题**：在含隐变量或不完全数据的统计模型中，如何高效地求解最大似然估计？

在许多实际统计问题中，观测数据是"不完全"的——可能存在缺失值、删失（censoring）、截断（truncation），或者模型本身包含不可观测的隐变量。此时，观测数据的对数似然函数：

$$\ell(\boldsymbol{\theta}) = \log p(\mathbf{x}|\boldsymbol{\theta}) = \log \int p(\mathbf{x}, \mathbf{z}|\boldsymbol{\theta}) \, d\mathbf{z}$$

由于对隐变量 \(\mathbf{z}\) 的积分（或求和），通常没有解析解，直接优化非常困难。传统的 Newton-Raphson 等数值优化方法虽然可用，但需要计算复杂的 Hessian 矩阵，且不保证每步迭代都使似然增大。

在 1977 年之前，E-step 和 M-step 的思想已在特定问题中被独立使用（如混合模型的迭代估计），但缺乏统一的理论框架。Dempster、Laird 和 Rubin 的贡献在于：**将这些分散的方法统一为一个通用算法框架，并严格证明了其收敛性质**。

##### 核心机制：Q 函数与 EM 迭代

EM 算法的核心思想是：**不直接优化难以处理的观测似然 \(\ell(\boldsymbol{\theta})\)，而是反复构造并优化一个更容易处理的替代目标函数——Q 函数**。

**定义 Q 函数**：

$$Q(\boldsymbol{\theta}|\boldsymbol{\theta}^{(t)}) = \mathbb{E}_{\mathbf{z}|\mathbf{x}, \boldsymbol{\theta}^{(t)}} \left[ \log p(\mathbf{x}, \mathbf{z}|\boldsymbol{\theta}) \right] = \int p(\mathbf{z}|\mathbf{x}, \boldsymbol{\theta}^{(t)}) \log p(\mathbf{x}, \mathbf{z}|\boldsymbol{\theta}) \, d\mathbf{z}$$

其中 \(p(\mathbf{z}|\mathbf{x}, \boldsymbol{\theta}^{(t)})\) 是在当前参数估计 \(\boldsymbol{\theta}^{(t)}\) 下隐变量的后验分布。

> 💡 **关键直觉**：完全数据 \((\mathbf{x}, \mathbf{z})\) 的对数似然 \(\log p(\mathbf{x}, \mathbf{z}|\boldsymbol{\theta})\) 通常具有良好的形式（例如在指数族中有闭式解），比边际似然 \(\log p(\mathbf{x}|\boldsymbol{\theta})\) 容易优化得多。Q 函数通过对隐变量取期望，将"缺失"的信息用其后验期望"填补"，从而将不完全数据问题转化为（加权的）完全数据问题。

##### 核心机制：似然单调性证明

EM 算法最重要的理论保证是**每次迭代后观测数据似然不减**。证明的关键在于以下分解：

$$\log p(\mathbf{x}|\boldsymbol{\theta}) = Q(\boldsymbol{\theta}|\boldsymbol{\theta}^{(t)}) - H(\boldsymbol{\theta}|\boldsymbol{\theta}^{(t)})$$

其中：

$$H(\boldsymbol{\theta}|\boldsymbol{\theta}^{(t)}) = \mathbb{E}_{\mathbf{z}|\mathbf{x}, \boldsymbol{\theta}^{(t)}} \left[ \log p(\mathbf{z}|\mathbf{x}, \boldsymbol{\theta}) \right]$$

由 Gibbs 不等式（或 Jensen 不等式），对任意 \(\boldsymbol{\theta}\) 有：

$$H(\boldsymbol{\theta}|\boldsymbol{\theta}^{(t)}) \leq H(\boldsymbol{\theta}^{(t)}|\boldsymbol{\theta}^{(t)})$$

因此，如果 M-step 保证 \(Q(\boldsymbol{\theta}^{(t+1)}|\boldsymbol{\theta}^{(t)}) \geq Q(\boldsymbol{\theta}^{(t)}|\boldsymbol{\theta}^{(t)})\)，则：

$$\ell(\boldsymbol{\theta}^{(t+1)}) \geq \ell(\boldsymbol{\theta}^{(t)})$$

> 💡 **关键直觉**：EM 的每次迭代相当于在当前参数处构造观测似然的一个**紧下界**（Q 函数减去一个常数），然后最大化这个下界。由于下界在当前点与似然相切，最大化下界必然"抬升"似然值。这与后来的变分推断（如 VAE 中的 ELBO）在思想上一脉相承。

##### 收敛速率与缺失信息原理

论文中深入分析了 EM 的收敛速率。在参数真值 \(\boldsymbol{\theta}^*\) 附近，EM 的迭代映射 \(M\) 的 Jacobian 矩阵为：

$$\mathbf{J} = \mathbf{I}_{\text{obs}}^{-1}(\boldsymbol{\theta}^*) \cdot \mathbf{I}_{\text{mis}}(\boldsymbol{\theta}^*)$$

其中 \(\mathbf{I}_{\text{obs}}\) 是观测数据的 Fisher 信息矩阵，\(\mathbf{I}_{\text{mis}}\) 是缺失数据的 Fisher 信息矩阵。它们满足：

$$\mathbf{I}_{\text{obs}} = \mathbf{I}_{\text{com}} - \mathbf{I}_{\text{mis}}$$

其中 \(\mathbf{I}_{\text{com}}\) 是完全数据的 Fisher 信息矩阵。

> ⚠️ **注意**：EM 的收敛速率是**线性**的（不像 Newton 法的二次收敛），且速率由**缺失信息比例** \(\mathbf{I}_{\text{mis}} / \mathbf{I}_{\text{com}}\) 决定。当缺失信息占比大时（如高维混合模型中分量高度重叠），EM 收敛会非常缓慢。这也是后续加速 EM 变体（如 ECME、PX-EM、Aitken 加速）的动机。

##### 广义 EM（GEM）与变体

论文指出 M-step 不必求全局最大值，只要满足：

$$Q(\boldsymbol{\theta}^{(t+1)}|\boldsymbol{\theta}^{(t)}) \geq Q(\boldsymbol{\theta}^{(t)}|\boldsymbol{\theta}^{(t)})$$

即可保证似然单调性。这一放松产生了**广义 EM（GEM）**算法，极大地扩展了 EM 的适用范围——在 M-step 无法求解析解时，只需沿梯度方向走一步即可。

##### 与传统方法的区别

| 方法 | 是否保证似然单调增 | 是否需要 Hessian | 适用于隐变量模型 | 收敛速率 |
|------|:---:|:---:|:---:|------|
| Newton-Raphson | ❌ | ✅ 需要 | 需手动边际化 | 二次 |
| 梯度上升 | ❌ | ❌ | 需手动边际化 | 线性 |
| 坐标上升 | ✅ | ❌ | 受限 | 线性 |
| **EM** | **✅** | **❌** | **✅ 天然适配** | **线性** |

> ⚠️ **注意**：EM 只保证收敛到**局部极大值或鞍点**，不保证全局最优。实践中通常需要多次随机初始化并选择似然最高的解。此外，EM 不直接提供参数估计的标准误（需要额外计算观测信息矩阵或使用 Louis 公式）。

#### 🧪 练习题

```yaml
question: "EM 算法中 E-step 的核心操作是什么？"
options:
  - "直接对观测数据对数似然求梯度"
  - "计算完全数据对数似然在隐变量后验分布下的条件期望（Q 函数）"
  - "对隐变量进行硬分配（取最大后验估计）"
  - "用蒙特卡洛采样近似边际似然"
answer: 1
explain: "E-step 计算 Q(θ|θ^(t)) = E_{z|x,θ^(t)}[log p(x,z|θ)]，即在当前参数下对完全数据对数似然关于隐变量后验取期望，将不完全数据问题转化为加权的完全数据问题。"
```