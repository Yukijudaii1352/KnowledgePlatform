### C-SVM

```yaml
id: csvm
name: C-SVM
full_name: 软间隔支持向量机 (Soft-Margin SVM)
year: '1995'
org: AT&T Bell Labs
paper_url: https://link.springer.com/article/10.1007/BF00994018
category: classification
parent: svm
motivation: 引入松弛变量与惩罚参数C，容忍噪声样本
```

#### 📝 一句话总结

C-SVM 通过引入松弛变量 \(\xi_i\) 和惩罚参数 \(C\)，将硬间隔 SVM 推广至线性不可分情形，在最大化分类间隔与容忍训练误差之间取得可控平衡，奠定了现代支持向量机的标准范式。

#### 🎯 核心要点

- **软间隔公式化**：引入松弛变量 \(\xi_i \geq 0\) 允许部分样本违反间隔约束，解决训练数据线性不可分问题
- **惩罚参数 C**：控制间隔最大化与误分类惩罚之间的权衡，C 越大越不容忍错误
- **对偶问题**：将原始优化转化为对偶二次规划，Lagrange 乘子受上界约束 \(0 \leq \alpha_i \leq C\)
- **核函数方法**：通过核函数 \(K(\mathbf{x}_i, \mathbf{x}_j)\) 隐式映射到高维特征空间，实现非线性分类
- **Mercer 条件**：给出核函数合法性的充要条件（正定性）
- **支持向量稀疏性**：仅少量支持向量决定决策边界，模型具有良好的泛化能力
- **OCR 实验验证**：在手写数字识别基准上，多项式核 SVM 达到与当时最优神经网络相当的性能

#### 🔬 深入细节

![SVM 软间隔分类示意图](https://upload.wikimedia.org/wikipedia/commons/2/2a/Svm_max_sep_hyperplane_with_margin.png)
*图：支持向量机最大间隔超平面示意。支持向量（实心点）位于间隔边界上，软间隔允许部分样本落入间隔内或被误分类。*

**算法伪代码（C-SVM 训练流程）：**

```python
# C-SVM 软间隔支持向量机训练
# 输入: 训练集 {(x_i, y_i)}, i=1..l, y_i ∈ {-1, +1}
#        惩罚参数 C, 核函数 K(·,·)

# 1. 构建核矩阵
D[i,j] = y_i * y_j * K(x_i, x_j)   # l×l 对称矩阵

# 2. 求解对偶二次规划问题
# maximize   W(α) = Σ α_i - (1/2) Σ_ij α_i α_j D[i,j]
# subject to Σ α_i y_i = 0
#            0 ≤ α_i ≤ C,  ∀i

α* = solve_QP(D, y, C)

# 3. 提取支持向量 (α_i > 0 的样本)
SV = {(x_i, y_i) : α_i* > 0}

# 4. 计算偏置 b（利用 0 < α_i < C 的支持向量）
b = y_k - Σ_{i∈SV} α_i* y_i K(x_i, x_k)   # 对任意 0 < α_k < C

# 5. 分类决策函数
f(x) = sign( Σ_{i∈SV} α_i* y_i K(x_i, x) + b )
```

##### 动机与背景

1992 年 Boser、Guyon 和 Vapnik 提出的最优超平面算法（硬间隔 SVM）要求训练数据完全线性可分。然而现实数据几乎总包含噪声和异常点，严格的可分性假设使得：
- 若数据不可分，优化问题无可行解
- 即使可分，少量噪声点可能导致间隔极小，泛化能力差

Cortes 和 Vapnik 在 1995 年的这篇论文中提出了**软间隔**（Soft Margin）方法，通过容忍一定程度的训练误差来获得更鲁棒的分类器。

##### 核心机制：软间隔公式化

**原始优化问题**：对每个训练样本 \((x_i, y_i)\) 引入松弛变量 \(\xi_i \geq 0\)，将硬间隔约束放松为：

$$y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0, \quad i = 1, \ldots, \ell$$

目标函数在最大化间隔的同时惩罚违反约束的样本：

$$\min_{\mathbf{w}, b, \boldsymbol{\xi}} \quad \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^{\ell} \xi_i$$

> 💡 **关键直觉**：\(\frac{1}{2}\|\mathbf{w}\|^2\) 控制间隔宽度（越小间隔越大），\(C\sum \xi_i\) 惩罚误分类程度。参数 \(C\) 是用户可调的超参数——**C → ∞ 退化为硬间隔 SVM，C → 0 则完全忽略训练误差**。

松弛变量的几何含义：
- \(\xi_i = 0\)：样本正确分类且在间隔外
- \(0 < \xi_i < 1\)：样本正确分类但落入间隔内
- \(\xi_i \geq 1\)：样本被误分类

##### 对偶形式与 KKT 条件

通过 Lagrange 乘子法，原始问题转化为对偶问题：

$$\max_{\boldsymbol{\alpha}} \quad W(\boldsymbol{\alpha}) = \sum_{i=1}^{\ell} \alpha_i - \frac{1}{2} \sum_{i,j=1}^{\ell} \alpha_i \alpha_j y_i y_j (\mathbf{x}_i \cdot \mathbf{x}_j)$$

$$\text{s.t.} \quad \sum_{i=1}^{\ell} \alpha_i y_i = 0, \quad 0 \leq \alpha_i \leq C, \quad \forall i$$

> ⚠️ **注意**：与硬间隔 SVM 的唯一区别在于 Lagrange 乘子增加了**上界约束** \(\alpha_i \leq C\)。这正是惩罚参数 C 在对偶空间中的体现——它限制了任何单个样本对决策边界的影响力。

KKT 互补条件揭示了三类样本的角色：
- \(\alpha_i = 0\)：非支持向量，不参与决策
- \(0 < \alpha_i < C\)：**自由支持向量**，恰好位于间隔边界上（\(\xi_i = 0\)）
- \(\alpha_i = C\)：**约束支持向量**，位于间隔内部或被误分类（\(\xi_i > 0\)）

##### 核函数扩展

论文的另一核心贡献是将软间隔方法与核技巧结合。对偶问题中只涉及样本间的内积 \(\mathbf{x}_i \cdot \mathbf{x}_j\)，可用核函数替换：

$$K(\mathbf{x}_i, \mathbf{x}_j) = \boldsymbol{\Phi}(\mathbf{x}_i) \cdot \boldsymbol{\Phi}(\mathbf{x}_j)$$

论文验证了多项式核 \(K(\mathbf{x}, \mathbf{y}) = (\mathbf{x} \cdot \mathbf{y} + 1)^d\) 的有效性，并引用 Mercer 定理给出核函数合法性的充要条件：

$$\iint K(\mathbf{u}, \mathbf{v}) g(\mathbf{u}) g(\mathbf{v}) \, d\mathbf{u} \, d\mathbf{v} \geq 0, \quad \forall g \in L_2$$

##### 与硬间隔 SVM 的关键区别

| 特性 | 硬间隔 SVM (1992) | 软间隔 C-SVM (1995) |
|------|-------------------|---------------------|
| 数据要求 | 必须线性可分 | 允许不可分 |
| 松弛变量 | 无 | \(\xi_i \geq 0\) |
| 乘子约束 | \(\alpha_i \geq 0\) | \(0 \leq \alpha_i \leq C\) |
| 超参数 | 无 | 惩罚参数 C |
| 鲁棒性 | 对噪声敏感 | 可容忍噪声/异常 |
| 适用性 | 理论受限 | 实际通用 |

##### 实验验证

论文在美国邮政手写数字识别数据集（USPS）上进行了系统实验：
- 使用多项式核 \(d = 1, 2, \ldots, 7\)
- 与 5 种经典方法对比：线性分类器、k-NN、RBF 网络、两层/三层神经网络
- **结果**：4 阶多项式核 SVM 达到 4.0% 错误率，与最优的三层神经网络（4.0%）持平，优于其他所有方法

#### 🧪 练习题

```yaml
question: "在 C-SVM 的对偶问题中，惩罚参数 C 的作用体现为什么？"
options:
  - "控制核函数的映射维度"
  - "作为 Lagrange 乘子 α_i 的上界约束"
  - "决定支持向量的数量下限"
  - "调节学习率大小"
answer: 1
explain: "在对偶形式中，C 直接表现为约束 0 ≤ α_i ≤ C，限制了单个样本对决策边界的最大影响力。C 越大允许 α_i 越大，对误分类惩罚越重。"
```