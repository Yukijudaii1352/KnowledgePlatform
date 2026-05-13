### 迁移成分分析 (Transfer Component Analysis)

```yaml
id: tca
name: TCA
full_name: 迁移成分分析 (Transfer Component Analysis)
year: '2011'
org: 香港科技大学
paper_url: https://ieeexplore.ieee.org/document/5640675/
category: domain_adapt
parent: kmm
motivation: MMD核空间提取公共迁移成分
```

#### 📝 一句话总结

TCA 提出在再生核希尔伯特空间（RKHS）中利用最大均值差异（MMD）学习一组迁移成分，将源域和目标域数据投影到该子空间后分布差异大幅缩小，从而可直接使用标准机器学习方法进行跨域分类或回归。

#### 🎯 核心要点

- **核心思想**：在 RKHS 中寻找一组迁移成分（transfer components），使得两域数据投影后的 MMD 距离最小化
- **优化目标**：最小化投影后的域间分布距离 + 正则化项，同时保留数据方差（类似核 PCA 约束）
- **核参数化技巧**：通过学习核矩阵的低秩变换 \(W\)，将非参数 MMD 嵌入转化为参数化特征提取，支持 out-of-sample 泛化
- **高效求解**：问题归结为广义特征值分解，复杂度远低于前驱方法 MMDE 的半定规划（SDP）
- **半监督扩展 SSTCA**：引入少量目标域标签信息，通过 HSIC（Hilbert-Schmidt Independence Criterion）进一步约束投影保留判别信息
- **应用验证**：跨时间/跨设备 WiFi 室内定位、跨领域文本情感分类

#### 🔬 深入细节

![TCA 框架示意图](https://img-blog.csdnimg.cn/20200408164516663.png)
*图：TCA 将源域和目标域数据通过特征变换映射到公共子空间，使两域分布对齐后可直接训练分类器*

##### 算法伪代码

```python
# Transfer Component Analysis (TCA) 核心流程
def TCA(X_source, X_target, kernel='rbf', n_components=m, mu=1.0):
    """
    输入:
        X_source: 源域数据 (n1 × d)
        X_target: 目标域数据 (n2 × d)
        kernel: 核函数类型
        n_components: 迁移成分数量 m
        mu: 正则化参数
    输出:
        Z: 变换后的低维表示 (n × m)
    """
    n1, n2 = len(X_source), len(X_target)
    n = n1 + n2
    
    # Step 1: 计算核矩阵 K ∈ R^{n×n}
    X = concat(X_source, X_target)
    K = compute_kernel(X, X, kernel)
    
    # Step 2: 构造 MMD 矩阵 L ∈ R^{n×n}
    L = zeros(n, n)
    L[:n1, :n1] = 1.0 / (n1 * n1)
    L[n1:, n1:] = 1.0 / (n2 * n2)
    L[:n1, n1:] = -1.0 / (n1 * n2)
    L[n1:, :n1] = -1.0 / (n1 * n2)
    
    # Step 3: 构造中心化矩阵 H = I_n - (1/n) * 1*1^T
    H = eye(n) - (1.0 / n) * ones(n, n)
    
    # Step 4: 求解广义特征值问题
    # (KLK + μI)W = KHKW Λ
    # 取最小的 m 个特征值对应的特征向量
    A = K @ L @ K + mu * eye(n)
    B = K @ H @ K
    eigenvalues, W = generalized_eig(A, B, smallest_m=n_components)
    
    # Step 5: 投影得到新表示
    Z = K @ W  # (n × m)
    
    return Z[:n1], Z[n1:]  # 源域和目标域的新表示
```

##### 动机与背景

域适应（Domain Adaptation）的核心挑战在于：源域和目标域的数据分布不同（\(P(X_S) \neq Q(X_T)\)），但共享相同的条件分布（\(P(Y|X_S) = P(Y|X_T)\)）。直接在源域训练的模型应用到目标域时，由于分布偏移（distribution shift）会导致性能严重下降。

在 TCA 之前，主要有两类方法：
1. **实例加权方法**（如 KMM、KLIEP）：通过重新加权源域样本使其分布接近目标域，但当分布差异大时权重方差过大
2. **MMDE 方法**：在核空间中学习共享潜在空间，但需要求解半定规划（SDP），计算复杂度为 \(O(n^{6.5})\)，且无法处理 out-of-sample 问题

TCA 的核心动机是：**能否找到一种参数化的特征变换，使得变换后两域的 MMD 距离最小化，同时保留数据的几何结构？**

##### 核心机制：MMD 最小化 + 核 PCA 约束

**MMD 距离的核表示**

给定源域样本 \(\{x_1^S, \ldots, x_{n_1}^S\}\) 和目标域样本 \(\{x_1^T, \ldots, x_{n_2}^T\}\)，MMD 的经验估计为：

$$
\text{Dist}(X_S, X_T) = \left\| \frac{1}{n_1}\sum_{i=1}^{n_1}\phi(x_i^S) - \frac{1}{n_2}\sum_{i=1}^{n_2}\phi(x_i^T) \right\|_{\mathcal{H}}
$$

其中 \(\phi: \mathcal{X} \to \mathcal{H}\) 是到 RKHS 的映射。

**关键洞察：学习核空间中的线性变换**

TCA 的核心创新在于：不直接在原始空间学习变换，而是在 RKHS 中学习一个线性映射 \(\tilde{W}\)，使得新的特征表示为：

$$
\tilde{\phi}(x) = \tilde{W}^{\top} \phi(x)
$$

将 MMD 用核矩阵 \(K\) 表示，投影后的 MMD 距离为：

$$
\text{Dist}^2 = \text{tr}(W^{\top} K L K W)
$$

其中 \(L \in \mathbb{R}^{n \times n}\) 是 MMD 矩阵：

$$
L_{ij} = \begin{cases} \frac{1}{n_1^2} & x_i, x_j \in X_S \\ \frac{1}{n_2^2} & x_i, x_j \in X_T \\ -\frac{1}{n_1 n_2} & \text{otherwise} \end{cases}
$$

**优化问题**

TCA 的完整优化目标为：

$$
\min_{W} \quad \text{tr}(W^{\top} K L K W) + \mu \cdot \text{tr}(W^{\top} W)
$$
$$
\text{s.t.} \quad W^{\top} K H K W = I_m
$$

其中：
- 第一项最小化投影后的域间 MMD 距离
- 第二项 \(\mu \cdot \text{tr}(W^{\top} W)\) 是正则化项，控制变换的复杂度
- 约束条件要求投影后数据的协方差为单位矩阵（保留方差信息），\(H = I_n - \frac{1}{n}\mathbf{1}\mathbf{1}^{\top}\) 是中心化矩阵

> 💡 **关键直觉**：约束 \(W^{\top} K H K W = I\) 本质上等价于核 PCA 的约束——确保投影方向捕获数据的主要方差。TCA 在此基础上加入 MMD 最小化目标，使得提取的成分既保留数据结构，又对齐两域分布。

**求解方法**

该优化问题等价于广义特征值分解：

$$
(KLK + \mu I) W = KHK \cdot W \Lambda
$$

取最小的 \(m\) 个特征值对应的特征向量即为所求的迁移成分。计算复杂度为 \(O(n^3)\)，远优于 MMDE 的 \(O(n^{6.5})\)。

##### 半监督扩展：SSTCA

当目标域有少量标签时，TCA 可扩展为 SSTCA（Semi-Supervised TCA）。其思想是在优化目标中加入 HSIC（Hilbert-Schmidt Independence Criterion）项，最大化投影后特征与标签之间的依赖性：

$$
\min_{W} \quad \text{tr}(W^{\top} K L K W) + \mu \cdot \text{tr}(W^{\top} W) - \lambda \cdot \text{HSIC}(\tilde{X}, Y)
$$

其中 HSIC 项鼓励投影后的特征保留与标签相关的判别信息。

##### 与传统方法的关键区别

| 方法 | 策略 | 复杂度 | Out-of-sample | 核心局限 |
|------|------|--------|---------------|----------|
| KMM | 实例加权 | \(O(n^3)\) | ✓ | 分布差异大时权重方差高 |
| MMDE | SDP 学习核矩阵 | \(O(n^{6.5})\) | ✗ | 计算昂贵，转导式 |
| **TCA** | **核空间线性变换** | \(O(n^3)\) | **✓** | **需选择核函数和维度** |

> ⚠️ **注意**：TCA 的 out-of-sample 能力来自其参数化形式——对新样本 \(x^*\)，只需计算 \(\tilde{\phi}(x^*) = W^{\top} [k(x^*, x_1), \ldots, k(x^*, x_n)]^{\top}\)，无需重新求解优化问题。

##### 实验验证

论文在两个任务上验证了 TCA 的有效性：

1. **跨域 WiFi 室内定位**：跨时间段（Time Period A → B）和跨设备（Device A → B）的定位精度显著优于 KMM、KLIEP 等基线
2. **跨域文本情感分类**：在 books → DVD、books → electronics 等迁移任务上，TCA 和 SSTCA 均超越 SCL、KMM 等方法

#### 🧪 练习题

```yaml
question: "TCA 优化目标中约束条件 W^T K H K W = I 的作用是什么？"
options:
  - "确保变换矩阵 W 是正交矩阵"
  - "最小化源域和目标域的 MMD 距离"
  - "保证投影后数据保留方差信息（类似核 PCA 约束）"
  - "使投影后的特征与标签最大相关"
answer: 2
explain: "该约束等价于核 PCA 中的方差保留条件，H 为中心化矩阵，KHKW=I 确保投影方向捕获数据主要方差结构，防止退化解。"
```