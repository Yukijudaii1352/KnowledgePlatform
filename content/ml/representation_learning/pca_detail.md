### PCA

```yaml
id: pca
name: PCA
full_name: 主成分分析 (Principal Component Analysis)
year: '1901'
org: Karl Pearson
paper_url: —
category: manifold
parent: —
motivation: 无监督线性降维奠基方法
```

#### 📝 一句话总结

PCA 通过寻找数据协方差矩阵的特征向量，将高维数据投影到方差最大的正交方向上，实现无监督线性降维，是几乎所有降维与表示学习方法的理论起点。

#### 🎯 核心要点

- **最大方差准则**：选择使投影后数据方差最大的方向作为主成分，逐次正交选取
- **最小重构误差等价性**：最大方差方向等价于最小化数据到投影子空间的重构误差
- **协方差矩阵特征分解**：核心计算归结为对数据协方差矩阵 \(\mathbf{C}\) 进行特征值分解（或对数据矩阵做 SVD）
- **降维与去相关**：投影后各主成分之间互不相关（协方差为零）
- **可解释方差比**：每个主成分对应的特征值衡量其解释的方差比例，可用于选择保留维度数 \(k\)
- **线性方法局限**：仅能捕获线性结构，无法处理非线性流形（后续催生 Kernel PCA、Autoencoder 等方法）

#### 🔬 深入细节

![PCA 几何示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/GaussianScatterPCA.svg/800px-GaussianScatterPCA.svg.png)
*图：二维高斯分布数据的 PCA 示意。两个箭头分别为第一、第二主成分方向，箭头长度正比于对应特征值（即该方向上的方差）。来源：Wikipedia*

##### 算法伪代码

```python
# PCA 核心算法
def PCA(X, k):
    """
    X: (n, d) 数据矩阵，n 个样本，d 维特征
    k: 目标降维维度
    """
    # 1. 中心化
    mu = X.mean(axis=0)          # (d,)
    X_centered = X - mu          # (n, d)
    
    # 2. 计算协方差矩阵
    C = (X_centered.T @ X_centered) / (n - 1)  # (d, d)
    
    # 3. 特征值分解
    eigenvalues, eigenvectors = eig(C)  # 降序排列
    
    # 4. 选取前 k 个主成分
    W = eigenvectors[:, :k]      # (d, k) 投影矩阵
    
    # 5. 投影
    Z = X_centered @ W           # (n, k) 降维结果
    return Z, W, eigenvalues[:k]
```

##### 动机与背景

1901 年，Karl Pearson 在论文 *"On Lines and Planes of Closest Fit to Systems of Points in Space"* 中提出了 PCA 的基本思想。其核心问题是：

> 给定高维空间中的一组数据点，如何找到一个低维子空间，使得数据在该子空间上的表示尽可能保留原始信息？

在 Pearson 的时代，高维数据的可视化和分析面临"维度灾难"的困扰——特征维度增加时，数据变得稀疏，统计估计不可靠，计算也变得昂贵。PCA 提供了一种优雅的解决方案：找到数据中"最重要"的方向，丢弃"不重要"的方向，从而在信息损失最小的前提下降低维度。

##### 核心机制：最大方差与最小重构误差

PCA 的理论基础可以从两个等价视角理解：

**视角一：最大方差（Maximum Variance）**

设数据 \(\mathbf{X} \in \mathbb{R}^{n \times d}\) 已中心化（均值为零）。我们希望找到一个单位向量 \(\mathbf{w}_1 \in \mathbb{R}^d\)，使得数据投影到该方向后的方差最大：

$$\mathbf{w}_1 = \arg\max_{\|\mathbf{w}\|=1} \text{Var}(\mathbf{X}\mathbf{w}) = \arg\max_{\|\mathbf{w}\|=1} \mathbf{w}^\top \mathbf{C} \mathbf{w}$$

其中 \(\mathbf{C} = \frac{1}{n-1}\mathbf{X}^\top\mathbf{X}\) 是样本协方差矩阵。利用拉格朗日乘子法，约束优化问题转化为：

$$\mathbf{C}\mathbf{w} = \lambda \mathbf{w}$$

这正是协方差矩阵的**特征值问题**。最大方差方向 \(\mathbf{w}_1\) 对应最大特征值 \(\lambda_1\)，第二主成分 \(\mathbf{w}_2\) 在与 \(\mathbf{w}_1\) 正交的约束下对应第二大特征值 \(\lambda_2\)，以此类推。

> 💡 关键：特征值 \(\lambda_i\) 的物理意义是数据在第 \(i\) 个主成分方向上的方差。因此 \(\frac{\lambda_i}{\sum_j \lambda_j}\) 就是第 \(i\) 个主成分的**可解释方差比（explained variance ratio）**。

**视角二：最小重构误差（Minimum Reconstruction Error）**

等价地，PCA 也可以理解为寻找一个 \(k\) 维线性子空间，使得数据点到该子空间的投影误差最小：

$$\min_{\mathbf{W} \in \mathbb{R}^{d \times k}} \sum_{i=1}^{n} \|\mathbf{x}_i - \mathbf{W}\mathbf{W}^\top\mathbf{x}_i\|^2 \quad \text{s.t.} \quad \mathbf{W}^\top\mathbf{W} = \mathbf{I}_k$$

展开后可以证明，最小化重构误差等价于最大化投影方差，两者给出完全相同的解。

> 💡 关键：这一等价性意味着 PCA 同时是"保留最多信息"和"丢失最少信息"的最优线性降维。

##### SVD 视角与高效计算

在实践中，直接计算 \(d \times d\) 协方差矩阵在 \(d\) 很大时代价高昂。更高效的方法是对中心化数据矩阵直接做**奇异值分解（SVD）**：

$$\mathbf{X} = \mathbf{U}\boldsymbol{\Sigma}\mathbf{V}^\top$$

其中 \(\mathbf{V}\) 的列即为主成分方向（协方差矩阵的特征向量），\(\boldsymbol{\Sigma}\) 的对角元素 \(\sigma_i\) 与特征值的关系为 \(\lambda_i = \frac{\sigma_i^2}{n-1}\)。降维结果为：

$$\mathbf{Z} = \mathbf{U}_k \boldsymbol{\Sigma}_k$$

其中下标 \(k\) 表示取前 \(k\) 个分量（截断 SVD）。现代实现（如 scikit-learn 的 `PCA`）默认使用随机化 SVD（Randomized SVD），时间复杂度从 \(O(d^3)\) 降至 \(O(ndk)\)。

##### 维度选择策略

选择保留多少个主成分 \(k\) 是 PCA 应用中的关键决策。常用方法包括：

1. **累积方差阈值**：选择最小的 \(k\) 使得 \(\sum_{i=1}^k \lambda_i / \sum_{j=1}^d \lambda_j \geq \tau\)（常取 \(\tau = 0.95\)）
2. **碎石图（Scree Plot）**：绘制特征值随序号的衰减曲线，在"肘部"截断
3. **Kaiser 准则**：保留特征值大于均值（即 \(\lambda_i > \bar{\lambda}\)）的主成分

##### 与传统方法的区别及后续发展

PCA 作为线性降维的奠基方法，其局限性催生了大量后续工作：

| 方法 | 与 PCA 的关系 | 核心改进 |
|------|-------------|---------|
| **Kernel PCA** | 核化扩展 | 通过核技巧在高维特征空间做 PCA，捕获非线性结构 |
| **Probabilistic PCA** | 概率化建模 | 将 PCA 解释为潜变量模型，支持缺失值处理和贝叶斯推断 |
| **Sparse PCA** | 稀疏约束 | 在主成分上施加 L1 正则，提升可解释性 |
| **Autoencoder** | 非线性推广 | 用神经网络学习非线性编码-解码映射；线性 AE 退化为 PCA |
| **t-SNE / UMAP** | 非线性可视化 | 保局部邻域结构而非全局方差，适合高维数据可视化 |

> ⚠️ 注意：PCA 假设数据的主要变异方向是线性的，且以方差作为"重要性"度量。当数据分布在弯曲流形上，或方差大的方向并非任务相关方向时（如监督学习场景），PCA 可能不是最优选择。此时应考虑 LDA（有监督）或非线性方法。

##### PCA 的经典性质总结

1. **去相关性**：PCA 投影后的各分量协方差为零，即 \(\text{Cov}(z_i, z_j) = 0, \; i \neq j\)
2. **最优性**：在所有线性降维方法中，PCA 在均方重构误差意义下是最优的（Eckart–Young–Mirsky 定理）
3. **旋转不变性**：PCA 结果不依赖于原始坐标系的选择（仅依赖数据的协方差结构）
4. **与高斯分布的关系**：若数据服从多元高斯分布，PCA 的主成分方向恰好是概率密度等高线的主轴方向

#### 🧪 练习题

```yaml
question: "PCA 中，第一主成分方向 w₁ 的求解等价于以下哪个优化问题？"
options:
  - "最小化数据投影后的方差"
  - "最大化数据投影后的方差，即求协方差矩阵的最大特征值对应的特征向量"
  - "最小化数据各维度之间的相关系数"
  - "最大化数据投影后各分量之间的协方差"
answer: 1
explain: "PCA 第一主成分是使投影方差最大的方向，通过拉格朗日乘子法可知其为协方差矩阵最大特征值对应的特征向量。"
```