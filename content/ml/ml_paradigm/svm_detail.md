### Support Vector Machine

```yaml
id: svm
name: SVM
full_name: Support Vector Machine
year: '1995'
org: AT&T Bell Labs
paper_url: https://link.springer.com/article/10.1007/BF00994018
category: core
parent: —
motivation: 核函数与最大间隔分类理论
```

#### 📝 一句话总结

SVM 提出了基于最大间隔（maximum margin）原理的分类方法，通过引入软间隔（soft margin）处理不可分数据，并利用核技巧（kernel trick）将线性分类器隐式映射到高维特征空间实现非线性决策面，在手写数字识别等任务上超越了当时的神经网络方法。

#### 🎯 核心要点

- **最大间隔超平面**：在所有能正确分类训练数据的超平面中，选择使两类之间几何间隔最大的唯一最优超平面
- **支持向量**：仅位于间隔边界上的少量训练样本（支持向量）决定最优超平面，其余样本不影响决策面
- **对偶问题与二次规划**：通过 Lagrange 对偶将原始约束优化转化为仅依赖样本内积的二次规划（QP）问题
- **软间隔分类器**：引入松弛变量 \(\xi_i\) 和惩罚参数 \(C\)，允许部分样本违反间隔约束，平衡间隔最大化与误分类最小化
- **核技巧（Kernel Trick）**：利用满足 Mercer 条件的核函数 \(K(\mathbf{u}, \mathbf{v})\) 替代内积，隐式在高维空间构造非线性决策面，无需显式计算特征映射
- **多种核函数**：支持多项式核 \(K(\mathbf{u},\mathbf{v})=({\mathbf{u} \cdot \mathbf{v}}+1)^d\)、径向基函数（RBF）核等，通过更换核函数即可实现不同类型的决策面
- **VC 维与结构风险最小化**：最大间隔原则等价于控制假设空间的 VC 维，天然实现了结构风险最小化（SRM），有效防止过拟合
- **实验验证**：在 USPS 手写数字数据集上，4 阶多项式核 SVM 达到 4.3% 错误率，优于当时最优的 5 层神经网络（5.1%）

#### 🔬 深入细节

![SVM 最大间隔分类示意图](https://upload.wikimedia.org/wikipedia/commons/7/72/SVM_margin.png)
*图：SVM 最大间隔分类器示意。实线为最优超平面，虚线为间隔边界，间隔边界上的样本即为支持向量（用圆圈标出）。SVM 的目标是最大化两条虚线之间的距离（margin）。*

##### 算法伪代码

```python
# SVM 训练与预测伪代码（对偶形式 + 核函数）
def svm_train(X, y, C, kernel_fn):
    """
    X: 训练样本 (n × d)
    y: 标签 ∈ {-1, +1} (n,)
    C: 软间隔惩罚参数
    kernel_fn: 核函数 K(u, v)
    """
    n = len(X)
    
    # Step 1: 构造核矩阵
    D = [[y[i] * y[j] * kernel_fn(X[i], X[j]) for j in range(n)] for i in range(n)]
    
    # Step 2: 求解对偶二次规划问题
    #   maximize  W(α) = Σα_i - (1/2) Σ α_i α_j y_i y_j K(x_i, x_j)
    #   subject to: 0 ≤ α_i ≤ C,  Σ α_i y_i = 0
    alpha = solve_qp(D, y, C)
    
    # Step 3: 提取支持向量 (α_i > 0)
    support_vectors = [(X[i], y[i], alpha[i]) for i in range(n) if alpha[i] > 0]
    
    # Step 4: 计算偏置 b（利用 0 < α_i < C 的支持向量）
    b = compute_bias(support_vectors, kernel_fn)
    
    return support_vectors, b

def svm_predict(x, support_vectors, b, kernel_fn):
    # 决策函数: f(x) = Σ y_i α_i K(x, x_i) + b
    score = sum(y_i * alpha_i * kernel_fn(x, x_i) for x_i, y_i, alpha_i in support_vectors)
    return sign(score + b)
```

##### 动机与背景

传统的感知机（Perceptron）算法虽然能找到一个将两类数据分开的超平面，但这样的超平面并不唯一——存在无穷多个可行解，且不同解的泛化能力差异巨大。Vapnik 和 Chervonenkis 的统计学习理论指出，分类器的泛化误差不仅取决于训练误差，还取决于假设空间的复杂度（VC 维）。一个自然的问题是：**能否找到一个具有最优泛化保证的超平面？**

论文的核心洞察是：在所有正确分类训练数据的超平面中，**几何间隔最大的超平面具有最小的 VC 维**，从而拥有最优的泛化能力上界。这就是"最大间隔"原则的理论基础。此外，现实数据往往线性不可分，论文进一步提出了两个关键扩展：（1）软间隔允许部分误分类以换取更大的间隔；（2）核技巧将输入空间非线性映射到高维特征空间，使得原本不可分的数据在新空间中变得线性可分。

##### 核心机制：最优超平面与对偶问题

给定训练集 \(\{(\mathbf{x}_i, y_i)\}_{i=1}^{\ell}\)，其中 \(y_i \in \{-1, +1\}\)，超平面 \(\mathbf{w} \cdot \mathbf{x} + b = 0\) 将两类分开。最优超平面的构造等价于以下约束优化问题：

$$
\min_{\mathbf{w}, b} \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{s.t.} \quad y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1, \quad i = 1, \ldots, \ell
$$

约束条件要求所有样本到超平面的函数间隔至少为 1，而目标函数最小化 \(\|\mathbf{w}\|^2\) 等价于最大化几何间隔 \(\rho = \frac{2}{\|\mathbf{w}\|}\)。通过引入 Lagrange 乘子 \(\alpha_i \geq 0\)，可以将原始问题转化为对偶问题：

$$
\max_{\boldsymbol{\alpha}} W(\boldsymbol{\alpha}) = \sum_{i=1}^{\ell} \alpha_i - \frac{1}{2} \sum_{i,j=1}^{\ell} \alpha_i \alpha_j y_i y_j (\mathbf{x}_i \cdot \mathbf{x}_j)
$$

$$
\text{s.t.} \quad \alpha_i \geq 0, \quad \sum_{i=1}^{\ell} \alpha_i y_i = 0
$$

对偶问题的关键优势在于：（1）约束更简单（非负约束 + 一个等式约束）；（2）目标函数仅依赖样本之间的**内积** \(\mathbf{x}_i \cdot \mathbf{x}_j\)，这为后续的核技巧奠定了基础。在最优解中，只有满足 \(y_i(\mathbf{w} \cdot \mathbf{x}_i + b) = 1\) 的样本对应 \(\alpha_i > 0\)，这些样本就是**支持向量**。最优权重向量可表示为支持向量的线性组合：\(\mathbf{w}_0 = \sum_{i=1}^{\ell} \alpha_i y_i \mathbf{x}_i\)。

> 💡 **关键直觉**：最优超平面完全由少数支持向量决定，与训练集大小无关。这意味着 SVM 天然具有稀疏性，预测时只需计算新样本与支持向量的内积。

##### 软间隔分类器

当训练数据线性不可分时，不存在满足所有约束的超平面。论文引入松弛变量 \(\xi_i \geq 0\) 放松约束，并通过惩罚参数 \(C\) 控制误分类代价：

$$
\min_{\mathbf{w}, b, \boldsymbol{\xi}} \frac{1}{2} \|\mathbf{w}\|^2 + C \sum_{i=1}^{\ell} \xi_i \quad \text{s.t.} \quad y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0
$$

当 \(\xi_i = 0\) 时样本被正确分类且在间隔外；\(0 < \xi_i < 1\) 时样本在间隔内但仍被正确分类；\(\xi_i \geq 1\) 时样本被误分类。参数 \(C\) 控制间隔最大化与误分类惩罚之间的权衡：\(C\) 越大越倾向于零训练误差（硬间隔），\(C\) 越小越倾向于更大间隔（容忍更多误分类）。

对偶形式中，软间隔仅在约束上增加了上界：\(0 \leq \alpha_i \leq C\)，其余形式与硬间隔完全一致。论文还讨论了使用 \(F(u) = u^2\) 的二次惩罚变体，此时对偶目标函数增加一个正则项 \(\frac{\alpha_{\max}}{C}\)，保证解的唯一性。

##### 核技巧与非线性扩展

SVM 最深刻的创新在于**核技巧**。设 \(\phi: \mathbb{R}^n \to \mathbb{R}^N\) 是将输入映射到高维特征空间的变换，则在特征空间中构造线性分类器等价于在输入空间中构造非线性分类器。由于对偶问题和决策函数都只依赖内积 \(\phi(\mathbf{x}_i) \cdot \phi(\mathbf{x}_j)\)，只要存在核函数 \(K(\mathbf{u}, \mathbf{v}) = \phi(\mathbf{u}) \cdot \phi(\mathbf{v})\) 可以直接计算，就无需显式构造 \(\phi\)。

根据 **Mercer 定理**，任何满足正定条件的对称函数都可以作为合法的核函数：

$$
\iint K(\mathbf{u}, \mathbf{v}) g(\mathbf{u}) g(\mathbf{v}) \, d\mathbf{u} \, d\mathbf{v} \geq 0, \quad \forall g \in L^2
$$

论文中使用的核函数包括：

| 核函数 | 表达式 | 对应特征空间 |
|--------|--------|-------------|
| 多项式核 | \(K(\mathbf{u},\mathbf{v}) = (\mathbf{u} \cdot \mathbf{v} + 1)^d\) | \(d\) 阶多项式的所有单项式 |
| RBF 核 | \(K(\mathbf{u},\mathbf{v}) = \exp\left(-\frac{\|\mathbf{u}-\mathbf{v}\|^2}{2\sigma^2}\right)\) | 无穷维 Hilbert 空间 |

决策函数变为：

$$
f(\mathbf{x}) = \text{sign}\left(\sum_{i=1}^{\ell} y_i \alpha_i K(\mathbf{x}, \mathbf{x}_i) + b\right)
$$

> ⚠️ **注意**：核技巧的计算复杂度与特征空间维度 \(N\) 无关，仅与训练样本数 \(\ell\) 相关。例如 7 阶多项式核对应 \(\sim 10^{16}\) 维特征空间，但核函数计算仅需 \(O(n)\) 时间（\(n\) 为输入维度）。

##### 与传统方法的对比

论文在 USPS 手写数字数据集（7300 训练 / 2000 测试，16×16 像素）上进行了系统实验。使用多项式核 \(d=1\) 到 \(d=7\)，结果显示：线性 SVM 错误率 12.0%，2 阶多项式降至 4.7%，4 阶以上稳定在 ~4.3%，最优为 6 阶的 4.2%。作为对比，当时最优的 5 层特殊架构神经网络（LeNet1）错误率为 5.1%，标准两层神经网络为 6.6%，决策树（CART/C4.5）为 16-17%。

值得注意的是，随着多项式阶数从 3 增加到 7，特征空间维度从 \(10^6\) 增长到 \(10^{16}\)，但支持向量数量仅从 148 增加到 190（增长 28%），且测试错误率几乎不变。这有力地验证了 SVM 通过最大间隔原则控制 VC 维、抵抗过拟合的理论预测——即使在极高维特征空间中，SVM 的泛化能力仍由支持向量数量（而非特征维度）决定。

#### 🧪 练习题

```yaml
question: "SVM 中核技巧（Kernel Trick）的本质作用是什么？"
options:
  - "降低训练数据的维度以加速计算"
  - "通过核函数隐式计算高维特征空间中的内积，避免显式构造特征映射"
  - "将非凸优化问题转化为凸优化问题"
  - "自动选择最优的惩罚参数 C"
answer: 1
explain: "核技巧利用满足 Mercer 条件的核函数 K(u,v) = φ(u)·φ(v) 直接计算高维特征空间中的内积，无需显式计算映射 φ，从而以输入空间的计算代价实现高维（甚至无穷维）特征空间中的线性分类。"
```