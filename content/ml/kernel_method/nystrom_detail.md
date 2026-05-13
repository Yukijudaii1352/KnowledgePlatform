### Nyström近似 (Nyström Approximation)

```yaml
id: nystrom
name: Nyström
full_name: Nyström近似 (Nyström Approximation)
year: '2001'
org: University of Edinburgh
paper_url: https://proceedings.neurips.cc/paper/2000/hash/130590ca273143b099a541353748ad29-Abstract.html
category: approximation
parent: —
motivation: 子采样低秩近似核矩阵，降低立方复杂度
```

#### 📝 一句话总结

Nyström 方法通过随机采样少量 landmark 点来近似完整核矩阵的特征分解，将核方法的计算复杂度从 \(O(n^3)\) 降至 \(O(m^2 n)\)（其中 \(m \ll n\)），使大规模核机器的训练成为可能。

#### 🎯 核心要点

- **低秩矩阵近似**：利用 \(m\) 个随机采样列近似 \(n \times n\) 核矩阵，得到秩为 \(m\) 的近似 \(\tilde{K} \approx K_{n,m} K_{m,m}^{-1} K_{m,n}\)
- **Nyström 特征值扩展**：从 \(m \times m\) 子矩阵的特征分解外推完整矩阵的特征值，近似特征值为 \(\tilde{\lambda}_i = \frac{n}{m} \lambda_i^{(m)}\)
- **Nyström 特征向量扩展**：利用公式 \(\tilde{\phi}_i(\mathbf{x}) = \frac{\sqrt{m}}{\sqrt{n} \lambda_i^{(m)}} \sum_{j=1}^m \phi_i^{(m)}(j) K(\mathbf{x}, \mathbf{x}_j)\) 将特征向量从子集扩展到全体样本
- **无替换随机采样**：从 \(n\) 个训练样本中均匀随机选取 \(m\) 个 landmark 点，无需额外先验知识
- **计算复杂度大幅降低**：预测阶段复杂度从 \(O(n^3)\) 降至 \(O(m^2 n)\)，当 \(m \ll n\) 时加速显著
- **实验验证**：在 MNIST（60000 样本）和 Abalones 数据集上，\(m\) 仅需取 \(n\) 的很小比例即可达到接近精确解的精度

#### 🔬 深入细节

![Kernel Approximation 示意图](https://scikit-learn.org/stable/_images/sphx_glr_plot_kernel_approximation_001.png)
*图：核近似方法效果对比（来自 scikit-learn）。Nyström 近似的核心思想是从完整核矩阵 K 中采样 m 列（子矩阵 W 和交叉矩阵 C），利用 \(\tilde{K} = C W^{-1} C^T\) 重构完整矩阵的低秩近似。*

```python
# Nyström 近似核心算法伪代码
import numpy as np

def nystrom_approximation(X, kernel_func, m):
    """
    输入:
        X: 训练数据 (n 个样本)
        kernel_func: 核函数 K(x_i, x_j)
        m: 采样 landmark 点数 (m << n)
    输出:
        近似特征值和特征向量
    """
    n = len(X)
    
    # Step 1: 随机采样 m 个 landmark 点 (无替换)
    indices = np.random.choice(n, m, replace=False)
    X_m = X[indices]
    
    # Step 2: 计算子矩阵 W (m×m) 和交叉矩阵 C (n×m)
    W = kernel_matrix(X_m, X_m, kernel_func)  # K_{m,m}
    C = kernel_matrix(X, X_m, kernel_func)     # K_{n,m}
    
    # Step 3: 对 W 做特征分解
    eigenvalues_m, eigenvectors_m = np.linalg.eigh(W)
    
    # Step 4: Nyström 扩展特征值
    eigenvalues_approx = (n / m) * eigenvalues_m
    
    # Step 5: Nyström 扩展特征向量到全体 n 个样本
    # φ̃_i(x) = (√m / (√n · λ_i^m)) * Σ_j φ_i^m(j) · K(x, x_j)
    eigenvectors_approx = (np.sqrt(m) / (np.sqrt(n) * eigenvalues_m)) * C @ eigenvectors_m
    
    # Step 6: 近似核矩阵 K̃ = C W^{-1} C^T
    K_approx = C @ np.linalg.inv(W) @ C.T
    
    return eigenvalues_approx, eigenvectors_approx, K_approx
```

##### 动机与背景

核方法（如 SVM、高斯过程回归）的核心运算是构造和分解 \(n \times n\) 的 Gram 矩阵 \(K\)，其中 \(K_{ij} = k(\mathbf{x}_i, \mathbf{x}_j)\)。对该矩阵的特征分解或求逆的计算复杂度为 \(O(n^3)\)，存储复杂度为 \(O(n^2)\)。当训练样本数 \(n\) 达到数万甚至数十万时，这一计算瓶颈使核方法完全不可行。

传统解决方案包括：
1. **稀疏近似**：仅使用支持向量子集，但需要先完成完整训练才能确定支持向量；
2. **特征空间截断**：直接截断特征分解的低阶项，但仍需 \(O(n^3)\) 完成初始分解。

Williams 和 Seeger 的关键洞察在于：**可以通过对少量样本点的核矩阵进行特征分解，然后利用 Nyström 积分方程数值解法将结果外推到全体样本**，从而绕过对完整矩阵的直接操作。

##### 核心机制：Nyström 方法的数学推导

**从积分方程到矩阵近似**：Nyström 方法最初用于求解 Fredholm 第二类积分方程：

$$
\int k(\mathbf{x}, \mathbf{y}) \phi(\mathbf{y}) \, p(\mathbf{y}) \, d\mathbf{y} = \lambda \phi(\mathbf{x})
$$

其中 \(k\) 为核函数，\(p\) 为数据分布，\(\phi\) 和 \(\lambda\) 为特征函数和特征值。在有限样本情况下，该积分可用蒙特卡洛近似：

$$
\frac{1}{n} \sum_{j=1}^{n} k(\mathbf{x}, \mathbf{x}_j) \phi(\mathbf{x}_j) = \lambda \phi(\mathbf{x})
$$

这等价于对 Gram 矩阵 \(K\) 做特征分解。Nyström 方法的核心思想是：**仅对 \(m\) 个采样点求解特征问题，然后利用积分方程本身将特征函数扩展到任意点**。

> 💡 关键：Nyström 扩展公式利用了核函数的连续性——如果我们知道特征函数在 \(m\) 个点上的值，就可以通过核函数"插值"得到其在任意点的值。

**具体步骤**：

1. **采样与子矩阵构造**：从 \(n\) 个训练点中随机选取 \(m\) 个点，计算 \(m \times m\) 子矩阵 \(W = K_{m,m}\) 和 \(n \times m\) 交叉矩阵 \(C = K_{n,m}\)。

2. **子矩阵特征分解**：对 \(W\) 做特征分解 \(W = U_m \Lambda_m U_m^T\)，得到特征值 \(\lambda_1^{(m)} \geq \ldots \geq \lambda_m^{(m)}\) 和特征向量 \(U_m\)。

3. **特征值扩展**：完整矩阵的近似特征值为：

$$
\tilde{\lambda}_i = \frac{n}{m} \lambda_i^{(m)}, \quad i = 1, \ldots, m
$$

4. **特征向量扩展**：完整矩阵的近似特征向量为：

$$
\tilde{\mathbf{u}}_i = \frac{\sqrt{m}}{\sqrt{n} \cdot \lambda_i^{(m)}} C \mathbf{u}_i^{(m)}
$$

其中 \(\mathbf{u}_i^{(m)}\) 是 \(W\) 的第 \(i\) 个特征向量。

5. **矩阵近似**：完整核矩阵的 Nyström 近似为：

$$
\tilde{K} = C W^{-1} C^T
$$

> ⚠️ 注意：当 \(W\) 存在很小的特征值时，直接求逆可能导致数值不稳定。实践中通常对 \(W\) 进行正则化或截断小特征值。

##### 计算复杂度分析

| 操作 | 精确方法 | Nyström 近似 |
|------|---------|-------------|
| 核矩阵存储 | \(O(n^2)\) | \(O(mn)\) |
| 特征分解 | \(O(n^3)\) | \(O(m^3 + m^2 n)\) |
| 预测（单样本） | \(O(n)\) | \(O(m)\) |

当 \(m \ll n\) 时（如 \(m = 200, n = 60000\)），计算加速比约为 \((n/m)^2 = 90000\) 倍。

##### 与传统方法的区别

| 方面 | 精确核方法 | Nyström 近似 |
|------|-----------|-------------|
| 核矩阵 | 完整 \(n \times n\) | 低秩近似 \(\tilde{K} = C W^{-1} C^T\) |
| 计算复杂度 | \(O(n^3)\) | \(O(m^2 n)\) |
| 采样策略 | 不需要 | 均匀随机采样 \(m\) 个 landmark |
| 近似质量 | 精确 | 取决于核矩阵的特征值衰减速度 |
| 适用场景 | 小规模数据 (\(n < 10^4\)) | 大规模数据 (\(n > 10^4\)) |

**与后续工作的关系**：
- **随机 Fourier 特征 (RFF, Rahimi & Recht 2007)**：通过随机采样 Fourier 基来近似平移不变核，是数据无关的方法；而 Nyström 是数据依赖的，通常在相同近似维度下更精确。
- **不完全 Cholesky 分解**：另一种低秩近似方法，通过贪心选择 pivot 列；Nyström 使用随机采样，更简单但可能需要更多列。
- **改进的采样策略**：后续工作（如 leverage score sampling, k-means Nyström）通过更智能的采样策略改进了均匀采样的近似质量。

##### 实验结果与实践指导

论文在两个数据集上验证了方法的有效性：

1. **MNIST 手写数字**（\(n = 60000\)）：使用高斯核，当 \(m = 200\)（仅 0.33% 的样本）时，Nyström 近似的分类精度与使用完整核矩阵的结果几乎无差异。

2. **Abalones 数据集**：回归任务，同样展示了少量 landmark 点即可获得高质量近似。

> 💡 实践建议：\(m\) 的选择取决于核矩阵的有效秩（即特征值衰减速度）。对于光滑核（如高斯核），特征值通常指数衰减，因此较小的 \(m\) 即可捕获大部分信息。

#### 🧪 练习题

```yaml
question: "Nyström 方法中，完整核矩阵 K 的近似公式是什么？"
options:
  - "K̃ = C · C^T，其中 C 是 n×m 的交叉核矩阵"
  - "K̃ = C · W^{-1} · C^T，其中 W 是 m×m 子矩阵，C 是 n×m 交叉矩阵"
  - "K̃ = W · C^T · C · W^T，其中 W 是 m×m 子矩阵"
  - "K̃ = (1/m) · Σ K(:,i) · K(i,:)，对 m 个随机列求和"
answer: 1
explain: "Nyström 近似的核心公式为 K̃ = C W^{-1} C^T，其中 W = K_{m,m} 是采样点间的核子矩阵，C = K_{n,m} 是全体样本与采样点间的交叉核矩阵。该公式本质上是利用 W 的逆来'校准'交叉矩阵的外积，得到对完整核矩阵的最优低秩近似。"
```