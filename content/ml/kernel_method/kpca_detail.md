### 核主成分分析 (Kernel PCA)

```yaml
id: kpca
name: Kernel PCA
full_name: 核主成分分析 (Kernel Principal Component Analysis)
year: '1998'
org: Max-Planck-Institut für biologische Kybernetik
paper_url: https://link.springer.com/article/10.1007/s004220050228
category: dimensionality_reduction
parent: —
motivation: 将PCA推广到非线性情形，通过核技巧在高维特征空间中执行主成分分析，提取数据的非线性主成分
```

#### 📝 一句话总结

Kernel PCA 利用核技巧将数据隐式映射到高维特征空间 $\mathcal{F}$，在该空间中执行线性 PCA，从而在原始输入空间中提取非线性主成分，整个过程仅需计算核矩阵的特征值分解，无需显式构造高维映射。

#### 🎯 核心要点

- **核心思想**：在由核函数 $k(\mathbf{x}, \mathbf{y}) = \langle \Phi(\mathbf{x}), \Phi(\mathbf{y}) \rangle$ 定义的高维特征空间 $\mathcal{F}$ 中执行标准 PCA，等价于求解核矩阵 $K$ 的特征值问题
- **核矩阵特征值问题**：不直接求解协方差矩阵 $C = \frac{1}{M}\sum_{i=1}^{M}\Phi(\mathbf{x}_i)\Phi(\mathbf{x}_i)^\top$ 的特征向量，而是求解 $M\lambda \boldsymbol{\alpha} = K\boldsymbol{\alpha}$，其中 $K_{ij} = k(\mathbf{x}_i, \mathbf{x}_j)$
- **特征空间中心化**：由于映射后的数据不一定零均值，需对核矩阵进行中心化：$\tilde{K} = K - \mathbf{1}_M K - K\mathbf{1}_M + \mathbf{1}_M K \mathbf{1}_M$，其中 $(\mathbf{1}_M)_{ij} = 1/M$
- **主成分提取**：对新样本 $\mathbf{x}$，第 $n$ 个非线性主成分为 $\text{PC}_n(\mathbf{x}) = \sum_{i=1}^{M} \alpha_i^n k(\mathbf{x}_i, \mathbf{x})$
- **归一化条件**：特征向量需满足 $\lambda_k (\boldsymbol{\alpha}^k \cdot \boldsymbol{\alpha}^k) = 1$，确保特征空间中对应的主方向为单位向量
- **Mercer 条件**：核函数必须满足 Mercer 条件（正定核），保证核矩阵半正定，所有特征值非负
- **计算复杂度**：主要瓶颈为 $M \times M$ 核矩阵的特征值分解，复杂度为 $O(M^3)$，适用于中等规模数据集

#### 🔬 深入细节

![Kernel PCA 示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kernel_PCA_Illustration.svg/400px-Kernel_PCA_Illustration.svg.png)
*图：Kernel PCA 将原始空间中线性不可分的非线性结构（如同心圆环）映射到特征空间后，通过线性 PCA 提取有意义的非线性主成分。*

```python
# Kernel PCA 算法伪代码
# 输入: 训练集 {x_1, ..., x_M}, 核函数 k, 提取维度 d
# 输出: 非线性主成分投影函数

# 1. 计算核矩阵
# K[i,j] = k(x_i, x_j), i,j = 1,...,M
K = compute_kernel_matrix(X_train, kernel_func)

# 2. 中心化核矩阵（特征空间零均值化）
# K_tilde = K - 1_M @ K - K @ 1_M + 1_M @ K @ 1_M
# 其中 1_M 是所有元素为 1/M 的 M×M 矩阵
one_M = np.ones((M, M)) / M
K_centered = K - one_M @ K - K @ one_M + one_M @ K @ one_M

# 3. 求解特征值问题: M * lambda * alpha = K_centered * alpha
eigenvalues, eigenvectors = np.linalg.eigh(K_centered)
# 按特征值降序排列
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

# 4. 归一化特征向量: lambda_k * (alpha^k · alpha^k) = 1
for k in range(d):
    eigenvectors[:, k] /= np.sqrt(eigenvalues[k])

# 5. 提取新样本的非线性主成分
def project(x_new):
    # 计算新样本与所有训练样本的核值
    k_vec = np.array([kernel_func(x_i, x_new) for x_i in X_train])
    # 中心化
    k_centered = k_vec - one_M[0] @ K - k_vec.mean() + one_M[0] @ K @ one_M[0]
    # 投影到前 d 个主成分
    return eigenvectors[:, :d].T @ k_centered
```

##### 动机与背景

传统 PCA 是一种线性降维方法，仅能捕获数据中的线性相关性。对于具有非线性结构的数据（如流形数据、同心圆环等），线性 PCA 无法提取有意义的低维表示。Schölkopf 等人（1998）提出的 Kernel PCA 将核技巧引入 PCA 框架：

1. **映射思路**：通过非线性映射 $\Phi: \mathbb{R}^d \to \mathcal{F}$ 将数据映射到高维（甚至无穷维）特征空间
2. **核技巧**：利用 Mercer 核函数 $k(\mathbf{x}, \mathbf{y}) = \langle \Phi(\mathbf{x}), \Phi(\mathbf{y}) \rangle$ 隐式计算特征空间内积，避免显式构造 $\Phi$
3. **线性→非线性**：在 $\mathcal{F}$ 中的线性 PCA 对应于原始空间中的非线性主成分分析

##### 核心推导

**标准 PCA 回顾**：给定零均值数据 $\{\mathbf{x}_1, \ldots, \mathbf{x}_M\}$，PCA 求解协方差矩阵的特征值问题：

$$
C\mathbf{v} = \lambda \mathbf{v}, \quad C = \frac{1}{M}\sum_{i=1}^{M}\mathbf{x}_i \mathbf{x}_i^\top
$$

**特征空间中的 PCA**：将数据映射为 $\Phi(\mathbf{x}_1), \ldots, \Phi(\mathbf{x}_M)$（假设已中心化），协方差矩阵变为：

$$
\bar{C} = \frac{1}{M}\sum_{i=1}^{M}\Phi(\mathbf{x}_i)\Phi(\mathbf{x}_i)^\top
$$

求解 $\bar{C}\mathbf{V} = \lambda \mathbf{V}$。关键观察：所有满足 $\lambda \neq 0$ 的特征向量 $\mathbf{V}$ 必然位于 $\Phi(\mathbf{x}_1), \ldots, \Phi(\mathbf{x}_M)$ 的张成空间中，即：

$$
\mathbf{V} = \sum_{i=1}^{M} \alpha_i \Phi(\mathbf{x}_i)
$$

将此代入特征值方程，并左乘 $\Phi(\mathbf{x}_j)^\top$，得到：

$$
\frac{1}{M}\sum_{i=1}^{M}\left(\sum_{k=1}^{M}\alpha_k k(\mathbf{x}_i, \mathbf{x}_k)\right) k(\mathbf{x}_i, \mathbf{x}_j) = \lambda \sum_{i=1}^{M}\alpha_i k(\mathbf{x}_i, \mathbf{x}_j)
$$

这等价于矩阵形式：

$$
K^2 \boldsymbol{\alpha} = M\lambda K \boldsymbol{\alpha} \quad \Longrightarrow \quad K\boldsymbol{\alpha} = M\lambda \boldsymbol{\alpha}
$$

即只需求解 $M \times M$ 核矩阵 $K$ 的特征值问题。

**中心化处理**：若映射后数据未中心化，定义中心化核矩阵：

$$
\tilde{K}_{ij} = K_{ij} - \frac{1}{M}\sum_{r=1}^{M}K_{ir} - \frac{1}{M}\sum_{r=1}^{M}K_{rj} + \frac{1}{M^2}\sum_{r,s=1}^{M}K_{rs}
$$

矩阵形式为 $\tilde{K} = K - \mathbf{1}_M K - K\mathbf{1}_M + \mathbf{1}_M K \mathbf{1}_M$。

**主成分提取**：对新样本 $\mathbf{x}$，其第 $n$ 个非线性主成分（在第 $n$ 个特征方向上的投影）为：

$$
\text{PC}_n(\mathbf{x}) = \langle \mathbf{V}^n, \Phi(\mathbf{x}) \rangle = \sum_{i=1}^{M} \alpha_i^n k(\mathbf{x}_i, \mathbf{x})
$$

##### 常用核函数

| 核函数 | 表达式 | 特征空间维度 |
|--------|--------|--------------|
| 多项式核 | $k(\mathbf{x}, \mathbf{y}) = (\mathbf{x} \cdot \mathbf{y})^d$ | $\binom{n+d-1}{d}$ 维 |
| 非齐次多项式核 | $k(\mathbf{x}, \mathbf{y}) = (\mathbf{x} \cdot \mathbf{y} + c)^d$ | $\binom{n+d}{d}$ 维 |
| 高斯 RBF 核 | $k(\mathbf{x}, \mathbf{y}) = \exp\left(-\frac{\|\mathbf{x} - \mathbf{y}\|^2}{2\sigma^2}\right)$ | 无穷维 |
| Sigmoid 核 | $k(\mathbf{x}, \mathbf{y}) = \tanh(\kappa \mathbf{x} \cdot \mathbf{y} + \theta)$ | — |

> 💡 关键：高斯核对应无穷维特征空间，使 Kernel PCA 能够提取任意复杂的非线性结构，但需注意过拟合风险（$\sigma$ 过小时每个点成为独立主成分）。

##### 与标准 PCA 的关系

| 方面 | 标准 PCA | Kernel PCA |
|------|----------|------------|
| 映射类型 | 线性 | 非线性（通过核函数隐式实现） |
| 特征值问题规模 | $d \times d$（$d$ 为数据维度） | $M \times M$（$M$ 为样本数） |
| 可提取成分数 | 最多 $\min(d, M)$ 个 | 最多 $M$ 个 |
| 计算复杂度 | $O(d^2 M + d^3)$ | $O(M^2 d + M^3)$ |
| 逆映射（重构） | 直接可得 | 需求解 pre-image 问题（不精确） |
| 适用场景 | 线性相关数据 | 非线性流形数据 |

> ⚠️ 注意：Kernel PCA 的一个重要局限是 **pre-image 问题**——从特征空间的投影反推回原始空间中的点没有解析解，只能通过迭代优化近似求解。论文中讨论了这一问题并提出了基于不动点迭代的近似方法。

##### 论文的关键贡献

1. **理论框架**：首次系统地将核方法与 PCA 结合，证明了在特征空间中执行 PCA 等价于求解核矩阵的特征值问题
2. **中心化方案**：给出了特征空间中数据中心化的核矩阵修正公式，使算法不依赖于映射后数据的均值假设
3. **实验验证**：在人工数据（同心圆环、多簇结构）和真实数据（手写数字）上验证了 Kernel PCA 提取非线性特征的能力
4. **与 ICA 的联系**：讨论了 Kernel PCA 与独立成分分析（ICA）的关系，指出在特征空间中的 PCA 可以实现类似于 ICA 的非线性特征提取

#### 🧪 练习题

```yaml
question: "Kernel PCA 中为什么需要对核矩阵进行中心化处理？"
options:
  - "为了使核矩阵成为正定矩阵，保证所有特征值为正"
  - "为了确保特征空间中映射后的数据具有零均值，与标准 PCA 的前提一致"
  - "为了降低核矩阵的秩，减少计算复杂度"
  - "为了消除不同核函数之间的尺度差异"
answer: 1
explain: "标准 PCA 要求数据中心化（零均值）。在 Kernel PCA 中，我们无法直接在特征空间中减去均值（因为不显式计算 Φ(x)），因此需要通过修正核矩阵来等效实现特征空间中的中心化：K̃ = K - 1_M·K - K·1_M + 1_M·K·1_M。这确保了在特征空间中 Σ_i Φ̃(x_i) = 0。"
```