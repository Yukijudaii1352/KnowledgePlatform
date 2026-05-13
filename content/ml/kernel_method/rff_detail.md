### 随机傅里叶特征 (Random Fourier Features)

```yaml
id: rff
name: RFF
full_name: 随机傅里叶特征 (Random Fourier Features)
year: '2007'
org: Intel Research
paper_url: https://proceedings.neurips.cc/paper/2007/hash/013a006f03dbc5392effeb8f18fda755-Abstract.html
category: approximation
parent: nystrom
motivation: Bochner定理将核近似为随机特征内积
```

#### 📝 一句话总结

RFF 利用 Bochner 定理将平移不变核函数分解为随机傅里叶基的期望，通过显式构造低维随机特征映射 \(z: \mathbb{R}^d \to \mathbb{R}^D\)，使得 \(z(x)^\top z(y) \approx k(x-y)\)，从而将核方法的训练与推理转化为高效的线性方法，彻底规避了 \(O(N^2)\) 的核矩阵计算瓶颈。

#### 🎯 核心要点

- **理论基础**：基于 Bochner 定理——连续平移不变正定核 \(k(\Delta)\) 的傅里叶变换 \(p(\omega)\) 是一个合法概率分布
- **随机傅里叶特征 (Random Fourier Features)**：从 \(p(\omega)\) 中采样 \(D\) 个频率向量，构造 \(z(x) = \sqrt{1/D}[\cos(\omega_1^\top x), \ldots, \cos(\omega_D^\top x), \sin(\omega_1^\top x), \ldots, \sin(\omega_D^\top x)]^\top\)
- **随机分箱特征 (Random Binning Features)**：用随机偏移网格将空间划分为 bin，利用两点落入同一 bin 的概率近似核值，适用于可分解为 hat 核凸组合的核函数
- **均匀收敛保证**：证明了对紧集上所有点对的近似误差以指数速率收敛，所需维度 \(D = O(d\epsilon^{-2}\log(1/\epsilon^2))\)
- **核函数分解而非核矩阵分解**：与 Nyström 等数据依赖方法不同，RFF 的特征映射与训练数据无关
- **推理加速**：评估从 \(O(Nd)\) 降至 \(O(D+d)\)，无需保留训练集

#### 🔬 深入细节

![RFF 核心思想示意](https://proceedings.neurips.cc/paper/2007/file/013a006f03dbc5392effeb8f18fda755-Paper.pdf)
*图：论文 Figure 1 展示了 Random Fourier Features 的几何直觉——将数据点投影到随机方向 ω 上，再映射到单位圆上的 cos/sin 分量，使变换后点的内积成为核函数的无偏估计。*

```python
# Algorithm 1: Random Fourier Features
import numpy as np

def random_fourier_features(X, kernel_bandwidth, D):
    """
    X: (N, d) 输入数据
    kernel_bandwidth: 高斯核带宽 sigma
    D: 随机特征维度
    返回: (N, 2D) 的特征矩阵 Z, 使得 Z @ Z.T ≈ K
    """
    d = X.shape[1]
    # Step 1: 计算核的傅里叶变换对应的分布
    # 对高斯核 k(Δ) = exp(-||Δ||² / 2σ²)，p(ω) ~ N(0, 1/σ² I)
    omega = np.random.randn(D, d) / kernel_bandwidth  # (D, d)
    
    # Step 2: 计算随机特征
    projection = X @ omega.T  # (N, D)
    Z = np.sqrt(1.0 / D) * np.hstack([np.cos(projection), np.sin(projection)])
    
    return Z  # (N, 2D)

# 使用: 训练线性模型 w 使得 f(x) = w^T z(x)
# Z_train = random_fourier_features(X_train, sigma, D)
# w = ridge_regression(Z_train, y_train, lambda)
# Z_test = random_fourier_features(X_test, sigma, D)
# y_pred = Z_test @ w
```

##### 动机与背景

核方法（如 SVM）通过核技巧 \(k(x,y) = \langle \phi(x), \phi(y) \rangle\) 隐式地在高维特征空间中操作，无需显式计算 \(\phi\)。然而，这一便利的代价是所有算法必须通过 \(N \times N\) 的核矩阵（Gram 矩阵）访问数据，导致：

- **训练复杂度**：\(O(N^2)\) 存储 + \(O(N^3)\) 求解（或 \(O(N^2)\) 迭代方法）
- **推理复杂度**：\(O(Nd)\) 每个测试点需要与所有支持向量计算核值

当 \(N\) 达到数十万甚至百万级别时，传统核方法变得不可行。已有的加速方法（如 Nyström 近似）通过对核矩阵进行低秩分解来降低复杂度，但它们依赖于训练数据，且近似质量受采样点选择影响。

> 💡 关键洞察：RFF 的核心思想是**分解核函数本身**而非核矩阵。由于特征映射与数据无关，一旦确定映射参数（随机采样的频率向量），就可以将任意新数据点映射到低维空间，然后使用标准线性方法。

##### Bochner 定理与核函数的频域表示

**Bochner 定理**指出：连续的平移不变正定核 \(k(\Delta)\)（其中 \(\Delta = x - y\)）当且仅当它是某个非负测度的傅里叶变换：

$$
k(\Delta) = \int_{\mathbb{R}^d} p(\omega) e^{j\omega^\top \Delta} \, d\omega
$$

当 \(k(0) = 1\) 时（适当归一化），\(p(\omega)\) 成为合法的概率密度函数。这意味着：

$$
k(x - y) = \mathbb{E}_{\omega \sim p}\left[ e^{j\omega^\top(x-y)} \right] = \mathbb{E}_\omega\left[ \zeta_\omega(x) \overline{\zeta_\omega(y)} \right]
$$

其中 \(\zeta_\omega(x) = e^{j\omega^\top x}\)。

由于 \(k\) 和 \(p\) 都是实值函数，虚部在期望中消去，因此可以等价地写为：

$$
k(x - y) = \mathbb{E}_\omega\left[ \cos(\omega^\top(x - y)) \right]
$$

定义实值特征映射 \(z_\omega(x) = [\cos(\omega^\top x), \sin(\omega^\top x)]^\top\)，则有：

$$
z_\omega(x)^\top z_\omega(y) = \cos(\omega^\top x)\cos(\omega^\top y) + \sin(\omega^\top x)\sin(\omega^\top y) = \cos(\omega^\top(x-y))
$$

因此 \(\mathbb{E}[z_\omega(x)^\top z_\omega(y)] = k(x-y)\)，即每个随机特征的内积是核值的**无偏估计**。

##### 从无偏估计到低方差近似

单个随机特征的方差较大。为降低方差，独立采样 \(D\) 个频率 \(\omega_1, \ldots, \omega_D \sim p(\omega)\)，构造拼接特征：

$$
z(x) = \sqrt{\frac{1}{D}} \left[ \cos(\omega_1^\top x), \ldots, \cos(\omega_D^\top x), \sin(\omega_1^\top x), \ldots, \sin(\omega_D^\top x) \right]^\top
$$

则 \(z(x)^\top z(y) = \frac{1}{D}\sum_{i=1}^D \cos(\omega_i^\top(x-y))\) 是 \(D\) 个独立无偏估计的平均，方差以 \(O(1/D)\) 速率下降。

> ⚠️ 注意：论文证明的是**均匀收敛**（Claim 1），即对紧集 \(M\) 上**所有**点对同时成立 \(|z(x)^\top z(y) - k(x-y)| \leq \epsilon\)，而非仅对固定点对。这比 Hoeffding 不等式给出的逐点收敛更强，保证了下游学习算法的泛化性能。

均匀收敛界为：

$$
\Pr\left[\sup_{x,y \in M} |z(x)^\top z(y) - k(x-y)| \geq \epsilon \right] \leq 2^8 \left(\frac{\sigma_p \text{diam}(M)}{\epsilon}\right)^2 \exp\left(-\frac{D\epsilon^2}{4(d+2)}\right)
$$

其中 \(\sigma_p^2 = \mathbb{E}_p[\|\omega\|^2]\) 是频率分布的二阶矩。这表明所需维度 \(D = O(d\epsilon^{-2}\log(1/\epsilon))\)。

##### 常见核函数的频率分布

| 核函数 | \(k(\Delta)\) | \(p(\omega)\) |
|--------|---------------|---------------|
| 高斯核 | \(\exp(-\|\Delta\|^2/2\sigma^2)\) | \(\mathcal{N}(0, \sigma^{-2}I)\) |
| 拉普拉斯核 | \(\exp(-\|\Delta\|_1)\) | \(\prod_d \frac{1}{\pi(1+\omega_d^2)}\)（Cauchy） |
| Cauchy 核 | \(\prod_d \frac{2}{1+\Delta_d^2}\) | \(\exp(-\|\omega\|_1)\)（Laplace） |

##### Random Binning Features（随机分箱特征）

论文还提出了第二种随机特征方法，适用于可分解为 hat 核凸组合的核函数（如拉普拉斯核）：

1. 从分布 \(p(\delta) = \delta \ddot{k}(\delta)\) 中采样网格间距 \(\delta\)
2. 从 \([0, \delta]\) 均匀采样偏移 \(u\)
3. 将每个点 \(x\) 编码为其所在 bin 的 one-hot 向量
4. 两点内积 = 落入同一 bin 的次数比例 ≈ \(k(x-y)\)

该方法对 L1 距离相关的核（如拉普拉斯核）特别有效，在 Forest Cover 数据集上仅用 \(P=50\) 次分箱就达到了精确 SVM 的精度。

##### 与传统方法的对比

| 方法 | 依赖数据？ | 训练复杂度 | 推理复杂度 | 适用核 |
|------|-----------|-----------|-----------|--------|
| 精确 SVM | 是 | \(O(N^2 \sim N^3)\) | \(O(N_{sv} \cdot d)\) | 任意 |
| Nyström | 是 | \(O(Nm^2)\) | \(O(m \cdot d)\) | 任意 |
| **RFF** | **否** | \(O(ND + D^2)\) | \(O(D + d)\) | 平移不变 |
| Random Binning | 否 | \(O(NP + P^2)\) | \(O(P)\) | 可分解核 |

实验表明，在 CPU（6500 样本）、Census（18000 样本）、Adult（32000 样本）、Forest Cover（522000 样本）等数据集上，RFF + 岭回归在精度上与 CVM、精确 SVM 相当，训练速度提升数十到数百倍。

#### 🧪 练习题

```yaml
question: "Random Fourier Features 方法的理论基础是什么定理？"
options:
  - "Mercer 定理：正定核可展开为特征函数的内积"
  - "Bochner 定理：平移不变正定核是其傅里叶变换（非负测度）的逆变换"
  - "中心极限定理：大量随机变量之和趋于正态分布"
  - "Johnson-Lindenstrauss 引理：随机投影保持距离"
answer: 1
explain: "RFF 的核心依据是 Bochner 定理，它保证平移不变正定核 k(Δ) 的傅里叶变换 p(ω) 是合法概率分布，从而可以通过从 p(ω) 采样来构造核函数的无偏蒙特卡洛估计。"
```