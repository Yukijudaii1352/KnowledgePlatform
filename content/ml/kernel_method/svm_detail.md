### 支持向量机 (Support Vector Machine)

```yaml
id: svm
name: SVM
full_name: 支持向量机 (Support Vector Machine)
year: '1992'
org: AT&T Bell Labs
paper_url: https://dl.acm.org/doi/10.1145/130385.130401
category: classification
parent: —
motivation: 核技巧与最大间隔超平面结合，实现非线性分类
```

#### 📝 一句话总结

SVM 通过在高维特征空间中构造最大间隔超平面实现分类，并利用核技巧（Kernel Trick）将输入空间的非线性映射转化为核函数的内积运算，从而在不显式计算高维坐标的情况下高效实现非线性分类。

#### 🎯 核心要点

- **最大间隔超平面**：在所有能正确分类训练数据的超平面中，选择使两类样本间隔最大的唯一最优超平面，保证泛化能力
- **支持向量**：决策边界仅由少数位于间隔边界上的训练样本（支持向量）决定，与训练集规模无关
- **核技巧（Kernel Trick）**：通过核函数 \(K(\mathbf{x}_i, \mathbf{x}_j) = \Phi(\mathbf{x}_i) \cdot \Phi(\mathbf{x}_j)\) 隐式计算高维特征空间内积，避免维度灾难
- **对偶形式优化**：将原始约束优化问题转化为仅依赖样本内积的对偶二次规划问题，利用 Lagrange 乘子法求解
- **软间隔扩展**：引入松弛变量 \(\xi_i\) 和惩罚参数 \(C\)，允许部分样本违反间隔约束，处理线性不可分情况
- **泛化界**：期望测试错误率受支持向量数与训练样本数之比的约束，与特征空间维度无显式关系
- **多种核函数支持**：多项式核 \((x \cdot y + 1)^d\)、RBF 核 \(e^{-\gamma\|x-y\|^2}\) 等满足 Mercer 条件的函数均可使用

#### 🔬 深入细节

![SVM 最大间隔示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/SVM_margin.png/300px-SVM_margin.png)
*图：二维空间中的最大间隔超平面示意。灰色方块为支持向量，虚线为间隔边界，实线为最优决策超平面。*

```python
# SVM 对偶问题求解伪代码
# 输入: 训练集 {(x_i, y_i)}, 核函数 K, 惩罚参数 C
# 输出: 支持向量及对应 α, 偏置 b

# 1. 构造对偶问题
# maximize W(α) = Σα_i - (1/2)ΣΣ α_i α_j y_i y_j K(x_i, x_j)
# subject to: 0 ≤ α_i ≤ C, Σ α_i y_i = 0

# 2. 求解二次规划 (QP) 得到 α*
alpha = solve_QP(K_matrix, y_labels, C)

# 3. 提取支持向量 (α_i > 0 的样本)
support_vectors = [(x_i, y_i, alpha_i) for i if alpha_i > 0]

# 4. 计算偏置 b
# 对任意支持向量 x_s (0 < α_s < C):
# b = y_s - Σ α_i y_i K(x_i, x_s)
b = compute_bias(support_vectors, K)

# 5. 分类决策函数
def predict(x_new):
    score = sum(α_i * y_i * K(x_i, x_new) for x_i, y_i, α_i in support_vectors) + b
    return sign(score)
```

##### 动机与背景

20 世纪 60 年代以来，模式识别领域主要依赖 Fisher 线性判别和感知机等方法。这些方法存在两个根本问题：

1. **线性方法表达力不足**：无法处理非线性可分数据；
2. **高维非线性映射的计算困难**：若将输入映射到高维特征空间再做线性分类，维度爆炸使计算不可行（如 200 维输入的 5 次多项式需要数十亿维特征空间）。

Vapnik 与 Chervonenkis 在 1965 年提出了最优超平面理论，证明了最大间隔分类器具有优良的泛化性能。1992 年 Boser、Guyon 和 Vapnik 的关键突破在于：**将核技巧引入最大间隔框架**，通过交换运算顺序——先在输入空间计算样本对的相似度（内积），再做非线性变换——彻底解决了高维计算问题。

##### 核心机制：最大间隔与对偶形式

**原始问题**：给定训练集 \(\{(\mathbf{x}_i, y_i)\}_{i=1}^{\ell}\)，其中 \(y_i \in \{-1, +1\}\)，寻找超平面 \(\mathbf{w} \cdot \mathbf{x} + b = 0\) 使得间隔最大化：

$$
\min_{\mathbf{w}, b} \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{s.t.} \quad y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1, \quad i = 1, \ldots, \ell
$$

> 💡 关键：间隔（margin）= \(\frac{2}{\|\mathbf{w}\|}\)，最小化 \(\|\mathbf{w}\|^2\) 等价于最大化间隔。

**对偶问题**：通过引入 Lagrange 乘子 \(\alpha_i \geq 0\)，利用 KKT 条件将原始问题转化为对偶形式：

$$
\max_{\boldsymbol{\alpha}} W(\boldsymbol{\alpha}) = \sum_{i=1}^{\ell} \alpha_i - \frac{1}{2} \sum_{i,j=1}^{\ell} \alpha_i \alpha_j y_i y_j (\mathbf{x}_i \cdot \mathbf{x}_j)
$$

$$
\text{s.t.} \quad \alpha_i \geq 0, \quad \sum_{i=1}^{\ell} \alpha_i y_i = 0
$$

对偶形式的关键优势：**目标函数仅依赖训练样本之间的内积** \(\mathbf{x}_i \cdot \mathbf{x}_j\)，这为核技巧的引入提供了天然接口。

##### 核心机制：核技巧（Kernel Trick）

核技巧的核心思想是：用核函数 \(K(\mathbf{x}_i, \mathbf{x}_j)\) 替代对偶问题中的内积 \(\mathbf{x}_i \cdot \mathbf{x}_j\)，等价于在某个高维（甚至无穷维）特征空间 \(\mathcal{H}\) 中构造最优超平面，但**无需显式计算映射** \(\Phi(\mathbf{x})\)：

$$
K(\mathbf{x}_i, \mathbf{x}_j) = \Phi(\mathbf{x}_i) \cdot \Phi(\mathbf{x}_j)
$$

常用核函数：

| 核函数 | 表达式 | 对应特征空间 |
|--------|--------|--------------|
| 多项式核 | \(K(\mathbf{x}, \mathbf{y}) = (\mathbf{x} \cdot \mathbf{y} + 1)^d\) | \(d\) 次多项式的所有单项式 |
| 高斯 RBF 核 | \(K(\mathbf{x}, \mathbf{y}) = \exp(-\gamma\|\mathbf{x} - \mathbf{y}\|^2)\) | 无穷维 Hilbert 空间 |
| Sigmoid 核 | \(K(\mathbf{x}, \mathbf{y}) = \tanh(\kappa \mathbf{x} \cdot \mathbf{y} - \delta)\) | 类神经网络 |

> 💡 关键：Mercer 定理保证，只要核函数对应的积分算子的特征值全为正，该函数就定义了一个合法的内积空间。

##### 核心机制：软间隔（Soft Margin）

对于线性不可分数据，引入松弛变量 \(\xi_i \geq 0\) 允许部分样本违反间隔约束：

$$
\min_{\mathbf{w}, b, \boldsymbol{\xi}} \frac{1}{2} \|\mathbf{w}\|^2 + C \sum_{i=1}^{\ell} \xi_i \quad \text{s.t.} \quad y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0
$$

其对偶形式仅在约束上增加上界：\(0 \leq \alpha_i \leq C\)。参数 \(C\) 控制间隔最大化与分类错误之间的权衡：
- \(C \to \infty\)：硬间隔，不允许任何违反
- \(C\) 较小：允许更多违反，间隔更宽，泛化可能更好

> ⚠️ 注意：软间隔的引入使 SVM 从仅适用于可分数据的理论工具变为通用分类器，是 1995 年 Cortes & Vapnik 论文的核心贡献。

##### 与传统方法的区别

| 方面 | 传统方法（感知机/神经网络） | SVM |
|------|---------------------------|-----|
| 优化目标 | 最小化训练误差 | 最大化间隔（结构风险最小化） |
| 解的唯一性 | 多个局部最优 | 凸优化，全局唯一解 |
| 泛化理论 | 缺乏严格保证 | VC 维理论提供泛化界 |
| 计算复杂度 | 与参数数量相关 | 与支持向量数量相关 |
| 非线性处理 | 多层网络 + 反向传播 | 核技巧，无需设计网络结构 |

SVM 的决策函数形式为两层网络：第一层计算输入与支持向量的核函数值，第二层做加权求和。但与神经网络不同，SVM 的"隐层节点"（支持向量）和权重（Lagrange 乘子）由优化过程自动确定，无需人工设计网络结构。

#### 🧪 练习题

```yaml
question: "SVM 中核技巧的本质作用是什么？"
options:
  - "降低训练数据的维度以加速计算"
  - "在不显式计算高维映射的情况下，计算样本在高维特征空间中的内积"
  - "将非凸优化问题转化为凸优化问题"
  - "自动选择最优的超平面参数 C"
answer: 1
explain: "核技巧通过核函数 K(x_i, x_j) = Φ(x_i)·Φ(x_j) 直接计算高维空间内积，避免了显式映射到高维空间的计算开销，使得在极高维甚至无穷维空间中构造最优超平面成为可能。"
```