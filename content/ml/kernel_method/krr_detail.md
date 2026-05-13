### 核岭回归 (Kernel Ridge Regression, KRR)

```yaml
id: krr
name: KRR
full_name: 核岭回归 (Kernel Ridge Regression)
year: '1998'
org: Royal Holloway
paper_url: https://pure.royalholloway.ac.uk/en/publications/ridge-regression-learning-algorithm-in-dual-variables
category: regression
parent: —
motivation: 岭回归对偶核化，获得非线性回归闭式解
```

#### 📝 一句话总结

KRR 将标准岭回归重写为对偶形式，并通过核技巧（Kernel Trick）将其扩展为非线性回归方法，在保留闭式解析解的同时获得了强大的非线性拟合能力。

#### 🎯 核心要点

- **对偶重构**：将岭回归从原始变量（primal）转化为对偶变量（dual），权重向量 \(\mathbf{w}\) 被表示为训练样本的线性组合
- **核技巧引入**：对偶形式中仅涉及样本间内积 \(\mathbf{x}_i^\top \mathbf{x}_j\)，可替换为任意正定核函数 \(K(\mathbf{x}_i, \mathbf{x}_j)\)
- **闭式解**：对偶系数 \(\boldsymbol{\alpha}^* = (K + \lambda I)^{-1} \mathbf{y}\)，无需迭代优化
- **正则化控制**：参数 \(\lambda > 0\) 同时控制模型复杂度和核矩阵求逆的数值稳定性
- **预测公式**：\(f(\mathbf{x}) = \sum_{i=1}^{n} \alpha_i K(\mathbf{x}_i, \mathbf{x})\)，所有训练样本均参与预测（非稀疏）
- **与 SVM 回归的区别**：KRR 使用平方损失而非 ε-不敏感损失，解非稀疏但有闭式解

#### 🔬 深入细节

![KRR 与 SVR 在不同核函数下的回归拟合对比](https://scikit-learn.org/stable/_images/sphx_glr_plot_kernel_ridge_regression_002.png)
*图：KRR 与 SVR 在不同核函数下的回归拟合效果对比（来源：scikit-learn 文档）。KRR 使用平方损失获得闭式解，SVR 使用 ε-不敏感损失获得稀疏解。核技巧的核心思想是通过映射函数 \(\phi\) 将输入空间中的数据映射到高维特征空间，在该空间中执行线性回归，而无需显式计算 \(\phi(\mathbf{x})\)，只需核函数 \(K(\mathbf{x}_i, \mathbf{x}_j) = \langle \phi(\mathbf{x}_i), \phi(\mathbf{x}_j) \rangle\)。*

```python
# KRR 核心算法伪代码
import numpy as np

def kernel_ridge_regression(X_train, y_train, X_test, kernel_fn, lam):
    """
    X_train: (n, d) 训练特征
    y_train: (n,)   训练标签
    X_test:  (m, d) 测试特征
    kernel_fn: 核函数 K(x_i, x_j)
    lam: 正则化参数 λ
    """
    n = X_train.shape[0]
    
    # Step 1: 计算核矩阵 K_{ij} = kernel_fn(x_i, x_j)
    K = kernel_fn(X_train, X_train)          # (n, n)
    
    # Step 2: 求解对偶系数 α = (K + λI)^{-1} y
    alpha = np.linalg.solve(K + lam * np.eye(n), y_train)  # (n,)
    
    # Step 3: 预测 f(x) = Σ_i α_i K(x_i, x)
    K_test = kernel_fn(X_train, X_test)      # (n, m)
    y_pred = K_test.T @ alpha                 # (m,)
    
    return y_pred
```

##### 动机与背景

20 世纪 90 年代，支持向量机（SVM）的成功引发了核方法的研究热潮。SVM 通过核技巧实现了非线性分类，但其回归版本（SVR）需要求解二次规划问题，计算成本较高。与此同时，**岭回归**（Ridge Regression）作为经典的线性回归正则化方法，具有简洁的闭式解：

$$
\mathbf{w}^* = (\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I})^{-1} \mathbf{X}^\top \mathbf{y}
$$

然而，原始形式的岭回归只能拟合线性关系。Saunders、Gammerman 和 Vovk 在 1998 年 ICML 论文中提出了一个关键洞察：**将岭回归重写为对偶形式后，可以自然地引入核技巧**，从而在保持闭式解优势的同时获得非线性回归能力。

##### 从原始形式到对偶形式

标准岭回归的优化目标为：

$$
\min_{\mathbf{w}} \sum_{i=1}^{n} (y_i - \mathbf{w}^\top \mathbf{x}_i)^2 + \lambda \|\mathbf{w}\|^2
$$

其矩阵形式的解为 \(\mathbf{w}^* = (\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}_d)^{-1} \mathbf{X}^\top \mathbf{y}\)，其中 \(\mathbf{X} \in \mathbb{R}^{n \times d}\) 是数据矩阵。

> 💡 **关键推导**：利用矩阵恒等式（Woodbury 恒等式的特例），可以证明：
> $$(\mathbf{X}^\top \mathbf{X} + \lambda \mathbf{I}_d)^{-1} \mathbf{X}^\top = \mathbf{X}^\top (\mathbf{X} \mathbf{X}^\top + \lambda \mathbf{I}_n)^{-1}$$

这意味着权重向量可以表示为：

$$
\mathbf{w}^* = \mathbf{X}^\top \boldsymbol{\alpha}^*, \quad \text{其中} \quad \boldsymbol{\alpha}^* = (\mathbf{X} \mathbf{X}^\top + \lambda \mathbf{I}_n)^{-1} \mathbf{y}
$$

这就是**对偶形式**。注意到 \(\mathbf{X} \mathbf{X}^\top\) 的第 \((i,j)\) 元素恰好是 \(\mathbf{x}_i^\top \mathbf{x}_j\)，即样本间的内积。定义核矩阵 \(K_{ij} = \mathbf{x}_i^\top \mathbf{x}_j\)，则：

$$
\boldsymbol{\alpha}^* = (K + \lambda \mathbf{I}_n)^{-1} \mathbf{y}
$$

##### 核技巧的引入

对偶形式的核心优势在于：**所有计算仅依赖样本间的内积**。根据 Mercer 定理，任何正定核函数 \(K(\mathbf{x}_i, \mathbf{x}_j)\) 都隐式对应一个高维（甚至无穷维）特征空间中的内积：

$$
K(\mathbf{x}_i, \mathbf{x}_j) = \langle \phi(\mathbf{x}_i), \phi(\mathbf{x}_j) \rangle
$$

将内积替换为核函数后，KRR 等价于在高维特征空间 \(\phi(\mathbf{x})\) 中执行岭回归，但**无需显式计算映射 \(\phi\)**。常用核函数包括：

| 核函数 | 表达式 | 特点 |
|--------|--------|------|
| 线性核 | \(K(\mathbf{x}, \mathbf{x}') = \mathbf{x}^\top \mathbf{x}'\) | 退化为标准岭回归 |
| 多项式核 | \(K(\mathbf{x}, \mathbf{x}') = (\mathbf{x}^\top \mathbf{x}' + c)^p\) | 有限维特征空间 |
| RBF/高斯核 | \(K(\mathbf{x}, \mathbf{x}') = \exp(-\gamma \|\mathbf{x} - \mathbf{x}'\|^2)\) | 无穷维特征空间，局部性强 |

> ⚠️ **注意**：KRR 的预测需要计算测试点与**所有**训练样本的核值，因此预测复杂度为 \(O(n)\)，不像 SVM 那样具有稀疏性（仅依赖支持向量）。

##### 训练与推理流程

**训练阶段**（复杂度 \(O(n^3)\)）：
1. 计算 \(n \times n\) 核矩阵 \(K\)，其中 \(K_{ij} = K(\mathbf{x}_i, \mathbf{x}_j)\)
2. 求解线性系统 \((K + \lambda \mathbf{I}) \boldsymbol{\alpha} = \mathbf{y}\)（通过 Cholesky 分解，因 \(K + \lambda \mathbf{I}\) 正定）
3. 存储对偶系数 \(\boldsymbol{\alpha}\) 和全部训练数据

**推理阶段**（复杂度 \(O(n)\) per sample）：
$$
f(\mathbf{x}_{new}) = \sum_{i=1}^{n} \alpha_i K(\mathbf{x}_i, \mathbf{x}_{new})
$$

##### 与传统方法的对比

| 方法 | 损失函数 | 解的形式 | 稀疏性 | 求解方式 |
|------|----------|----------|--------|----------|
| 线性岭回归 | 平方损失 + L2 | 闭式解 | 非稀疏 | 矩阵求逆 |
| **KRR** | **平方损失 + L2** | **闭式解** | **非稀疏** | **核矩阵求逆** |
| SVR | ε-不敏感损失 + L2 | 无闭式解 | 稀疏 | 二次规划 |
| 高斯过程回归 | 平方损失 | 闭式解 | 非稀疏 | 核矩阵求逆 |

> 💡 **KRR 与高斯过程回归（GPR）的关系**：当 GPR 使用固定超参数时，其预测均值与 KRR 的预测完全一致。GPR 额外提供了预测的不确定性估计，而 KRR 更侧重于点预测的效率。

##### 正则化参数 λ 的作用

正则化参数 \(\lambda\) 在 KRR 中扮演双重角色：

1. **统计角度**：控制偏差-方差权衡。\(\lambda\) 越大，模型越平滑（高偏差、低方差）；\(\lambda\) 越小，模型越灵活（低偏差、高方差）
2. **数值角度**：确保 \(K + \lambda \mathbf{I}\) 正定且条件数可控，保证求逆的数值稳定性

实践中通常通过交叉验证选择最优 \(\lambda\)。KRR 的一个优势是**留一交叉验证（LOO-CV）可以用闭式公式高效计算**：

$$
\text{LOO-CV} = \frac{1}{n} \sum_{i=1}^{n} \left( \frac{\alpha_i}{[(K + \lambda I)^{-1}]_{ii}} \right)^2
$$

这使得超参数调优非常高效，无需反复重新训练模型。

#### 🧪 练习题

```yaml
question: "KRR 相比 SVM 回归（SVR）的主要优势是什么？"
options:
  - "KRR 的解是稀疏的，预测时只需少量支持向量"
  - "KRR 具有闭式解，无需迭代求解二次规划问题"
  - "KRR 使用 ε-不敏感损失函数，对异常值更鲁棒"
  - "KRR 的训练复杂度为 O(n log n)，比 SVR 更快"
answer: 1
explain: "KRR 的对偶系数通过 α = (K + λI)⁻¹y 直接求得闭式解，而 SVR 需要求解带约束的二次规划问题。但 KRR 的解是非稀疏的，所有训练样本都参与预测。"
```