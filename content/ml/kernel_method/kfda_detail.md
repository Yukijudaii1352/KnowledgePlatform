### 核Fisher判别分析 (Kernel Fisher Discriminant Analysis, KFDA)

```yaml
id: kfda
name: KFDA
full_name: 核Fisher判别分析 (Kernel Fisher Discriminant Analysis)
year: '1999'
org: GMD FIRST
paper_url: https://ieeexplore.ieee.org/abstract/document/788121/
category: reduction
parent: kpca
motivation: LDA映射到特征空间，最大化核类间散度比
```

#### 📝 一句话总结

KFDA 将经典 Fisher 线性判别分析通过核技巧推广到高维特征空间，在核诱导的特征空间中最大化类间散度与类内散度之比，实现非线性判别降维与分类。

#### 🎯 核心要点

- 将 Fisher 判别准则推广到核特征空间：在 \(\phi\)-映射空间中最大化 \(J(\mathbf{w}) = \frac{\mathbf{w}^\top S_B^\phi \mathbf{w}}{\mathbf{w}^\top S_W^\phi \mathbf{w}}\)
- 利用再生核希尔伯特空间（RKHS）表示定理：投影方向 \(\mathbf{w}\) 可表示为训练样本映射的线性组合 \(\mathbf{w} = \sum_i \alpha_i \phi(\mathbf{x}_i)\)
- 将特征空间中的广义特征值问题转化为核矩阵上的优化：\(N\boldsymbol{\alpha} = \lambda M\boldsymbol{\alpha}\)
- 引入正则化项 \(\mu I\) 解决特征空间中类内散度矩阵的奇异性问题
- 所有计算仅涉及核函数 \(K(\mathbf{x}_i, \mathbf{x}_j)\)，无需显式计算 \(\phi(\mathbf{x})\)
- 实验表明在非线性可分数据上显著优于线性 FDA 和 RBF 网络

#### 🔬 深入细节

![Kernel Fisher Discriminant 示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Kernel_trick_idea.svg/600px-Kernel_trick_idea.svg.png)
*图：核技巧的基本思想。KFDA 将原始空间中线性不可分的数据通过核映射 \(\phi\) 送入高维特征空间，在该空间中执行 Fisher 线性判别，找到最优投影方向实现非线性分类。*

```python
# KFDA 算法伪代码
# 输入: 训练集 {(x_i, y_i)}, 核函数 K, 正则化参数 μ
# 输出: 投影系数 α, 用于新样本的非线性判别投影

# 1. 计算核矩阵
K = [[K(x_i, x_j) for j in range(n)] for i in range(n)]

# 2. 计算各类均值向量 M_1, M_2 (在核空间中的表示)
# (M_i)_j = (1/n_i) * Σ_{k ∈ class_i} K(x_j, x_k)
M1 = (1/n1) * K[:, class1_indices].sum(axis=1)
M2 = (1/n2) * K[:, class2_indices].sum(axis=1)

# 3. 构建类间散度矩阵 M (在α空间中)
M = outer(M1 - M2, M1 - M2)

# 4. 构建类内散度矩阵 N (在α空间中)
# N = Σ_i K_i (I - 1_{n_i}) K_i^T
# 其中 K_i 是核矩阵中对应第 i 类样本的子矩阵
K1 = K[:, class1_indices]  # n × n1
K2 = K[:, class2_indices]  # n × n2
N = K1 @ (I_n1 - (1/n1) * ones_n1) @ K1.T + K2 @ (I_n2 - (1/n2) * ones_n2) @ K2.T

# 5. 正则化: N ← N + μI
N = N + mu * I

# 6. 求解广义特征值问题: N α = λ M α
# 等价于: N^{-1} M α = λ α
alpha = leading_eigenvector(inv(N) @ M)

# 7. 对新样本 x 投影
def project(x_new):
    k_new = [K(x_i, x_new) for i in range(n)]
    return dot(alpha, k_new)
```

**动机与背景**

Fisher 线性判别分析（FDA/LDA）是经典的有监督降维方法，通过寻找使类间散度最大、类内散度最小的投影方向来实现最优线性分类。然而，FDA 本质上只能找到线性决策边界，对于非线性可分的数据表现不佳。

1990 年代末，核方法（Kernel Methods）已在支持向量机（SVM）和核主成分分析（KPCA）中取得巨大成功。核技巧的核心思想是：通过一个非线性映射 \(\phi: \mathbb{R}^d \to \mathcal{F}\) 将数据送入高维（甚至无穷维）特征空间 \(\mathcal{F}\)，然后在该空间中执行线性算法。由于 \(\phi\) 的显式形式不需要知道——只需计算内积 \(K(\mathbf{x}, \mathbf{y}) = \langle\phi(\mathbf{x}), \phi(\mathbf{y})\rangle\)——这使得在极高维空间中进行计算成为可能。

Mika 等人（1999）自然地提出：**能否将核技巧应用于 Fisher 判别分析，从而获得非线性判别能力？** 这就是 KFDA 的核心动机。

**核心机制：特征空间中的 Fisher 准则**

在特征空间 \(\mathcal{F}\) 中，Fisher 判别准则为：

$$J(\mathbf{w}) = \frac{\mathbf{w}^\top S_B^\phi \mathbf{w}}{\mathbf{w}^\top S_W^\phi \mathbf{w}}$$

其中类间散度矩阵和类内散度矩阵分别定义为：

$$S_B^\phi = (\mathbf{m}_1^\phi - \mathbf{m}_2^\phi)(\mathbf{m}_1^\phi - \mathbf{m}_2^\phi)^\top$$

$$S_W^\phi = \sum_{i=1}^{2}\sum_{\mathbf{x} \in X_i} (\phi(\mathbf{x}) - \mathbf{m}_i^\phi)(\phi(\mathbf{x}) - \mathbf{m}_i^\phi)^\top$$

这里 \(\mathbf{m}_i^\phi = \frac{1}{n_i}\sum_{\mathbf{x}\in X_i}\phi(\mathbf{x})\) 是第 \(i\) 类在特征空间中的均值。

**关键推导：核化表示**

由于 \(S_B^\phi\) 和 \(S_W^\phi\) 的列空间都在训练样本映射 \(\{\phi(\mathbf{x}_1), \ldots, \phi(\mathbf{x}_n)\}\) 的张成空间内，因此最优 \(\mathbf{w}\) 也在该空间内（表示定理）：

$$\mathbf{w} = \sum_{i=1}^{n} \alpha_i \phi(\mathbf{x}_i)$$

将此代入 Fisher 准则，所有内积 \(\langle\phi(\mathbf{x}_i), \phi(\mathbf{x}_j)\rangle\) 都可用核函数 \(K(\mathbf{x}_i, \mathbf{x}_j)\) 替代。最终优化问题转化为：

$$J(\boldsymbol{\alpha}) = \frac{\boldsymbol{\alpha}^\top M \boldsymbol{\alpha}}{\boldsymbol{\alpha}^\top N \boldsymbol{\alpha}}$$

其中：
- \(M = (\mathbf{M}_1 - \mathbf{M}_2)(\mathbf{M}_1 - \mathbf{M}_2)^\top\)，\((\mathbf{M}_i)_j = \frac{1}{n_i}\sum_{k \in \text{class}_i} K(\mathbf{x}_j, \mathbf{x}_k)\)
- \(N = \sum_{i=1}^{2} K_i(I_{n_i} - \mathbf{1}_{n_i})K_i^\top\)，\(K_i\) 是核矩阵中对应第 \(i\) 类的 \(n \times n_i\) 子矩阵

> 💡 关键：矩阵 \(M\) 是秩为 1 的矩阵（二分类情况），因此最优解唯一确定为 \(\boldsymbol{\alpha}^* \propto N^{-1}(\mathbf{M}_1 - \mathbf{M}_2)\)。

**正则化的必要性**

在高维（甚至无穷维）特征空间中，类内散度矩阵 \(S_W^\phi\) 几乎必然是奇异的（样本数远小于特征空间维度）。对应到核空间中，矩阵 \(N\) 也可能奇异或病态。因此需要正则化：

$$N_\mu = N + \mu I$$

其中 \(\mu > 0\) 是正则化参数。这等价于在特征空间中对 \(S_W^\phi\) 添加单位矩阵的缩放，即 Tikhonov 正则化。正则化后的解为：

$$\boldsymbol{\alpha}^* = N_\mu^{-1}(\mathbf{M}_1 - \mathbf{M}_2)$$

> ⚠️ 注意：正则化参数 \(\mu\) 的选择对性能有显著影响，通常通过交叉验证确定。

**新样本的投影与分类**

对于新样本 \(\mathbf{x}\)，其在判别方向上的投影为：

$$y = \mathbf{w}^\top \phi(\mathbf{x}) = \sum_{i=1}^{n} \alpha_i K(\mathbf{x}_i, \mathbf{x})$$

分类决策通过比较投影值与阈值（通常取两类投影均值的中点）来完成。

**与传统方法的对比**

| 方法 | 决策边界 | 特征空间 | 计算复杂度 |
|------|---------|----------|-----------|
| 线性 FDA | 线性超平面 | 原始空间 | \(O(d^2 n)\) |
| KFDA | 非线性曲面 | 核特征空间 | \(O(n^3)\) |
| SVM | 非线性曲面 | 核特征空间 | \(O(n^2)\)~\(O(n^3)\) |

与 SVM 相比，KFDA 的优势在于：(1) 直接优化类间/类内散度比，具有明确的统计意义；(2) 可自然推广到多类问题（提取多个判别方向）；(3) 提供降维后的连续投影值而非仅分类标签。

与 KPCA 相比，KFDA 是有监督方法，利用类别标签信息寻找判别性最强的方向，而 KPCA 是无监督的，仅保留方差最大的方向。

**实验验证**

论文在玩具数据集（非线性可分的二维数据）和真实数据集上验证了 KFDA 的有效性。使用高斯 RBF 核 \(K(\mathbf{x}, \mathbf{y}) = \exp(-\|\mathbf{x}-\mathbf{y}\|^2 / 2\sigma^2)\)，KFDA 能够学习到复杂的非线性决策边界，显著优于线性 FDA。

#### 🧪 练习题

```yaml
question: "KFDA 中引入正则化项 μI 的主要原因是什么？"
options:
  - "加快求解广义特征值问题的收敛速度"
  - "防止特征空间中类内散度矩阵奇异导致无法求逆"
  - "控制核函数的带宽参数"
  - "将多类问题简化为二类问题"
answer: 1
explain: "在高维核特征空间中，样本数通常远小于特征空间维度，导致类内散度矩阵 N 奇异或病态，添加 μI 正则化使其可逆。"
```