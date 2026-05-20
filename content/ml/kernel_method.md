---
domain: ml
topic_id: kernel_method
topic_name: 核方法
page_icon: 🔮
page_title: 核方法 算法总结
page_subtitle: '{build_date} 版'
page_desc: 综述从经典支持向量机、核回归到现代大规模核近似与神经正切核，涵盖2026年核方法与深度学习融合的最新进展。
hero_pills:
- 核技巧·高维映射·非线性表征
count_pill: '{count} 个算法'
categories:
  classification:
    label: 核分类方法
    color: '#ff7f0e'
  regression:
    label: 核回归方法
    color: '#2ca02c'
  reduction:
    label: 核降维与特征
    color: '#9467bd'
  approximation:
    label: 大规模核近似
    color: '#d62728'
  frontier:
    label: 前沿扩展
    color: '#17becf'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: svm
  x: 100
  y: 80
  category: classification
- id: csvm
  x: 160
  y: 80
  category: classification
- id: gpr
  x: 160
  y: 200
  category: regression
- id: svr
  x: 180
  y: 280
  category: regression
- id: kpca
  x: 210
  y: 360
  category: reduction
- id: krr
  x: 210
  y: 200
  category: regression
- id: kfda
  x: 240
  y: 360
  category: reduction
- id: lssvm
  x: 240
  y: 80
  category: classification
- id: nystrom
  x: 280
  y: 460
  category: approximation
- id: mkl
  x: 320
  y: 80
  category: classification
- id: rff
  x: 370
  y: 460
  category: approximation
- id: ntk
  x: 520
  y: 560
  category: frontier
- id: performers
  x: 560
  y: 460
  category: frontier
- id: nystrom_lssvm
  x: 660
  y: 80
  category: classification
- id: diff_krr
  x: 660
  y: 200
  category: frontier
- id: topo_ntk
  x: 700
  y: 560
  category: frontier
- id: laplacian_former
  x: 700
  y: 460
  category: frontier
- id: xkv
  x: 740
  y: 560
  category: frontier
edges:
- from: svm
  to: csvm
  label: 引入软间隔
- from: svm
  to: svr
  label: 扩展到回归
- from: csvm
  to: lssvm
  label: 等式约束简化
- from: csvm
  to: mkl
  label: 自动核选择
- from: lssvm
  to: nystrom_lssvm
  label: 低秩加速
- from: nystrom
  to: rff
  label: 随机特征近似
- from: rff
  to: performers
  label: 核化注意力
- from: performers
  to: laplacian_former
  label: 拉普拉斯核替代
- from: krr
  to: ntk
  label: 无限宽等价
- from: ntk
  to: topo_ntk
  label: 拓扑结构扩展
- from: ntk
  to: xkv
  label: 核对齐压缩
- from: krr
  to: diff_krr
  label: 可微化嵌入
- from: kpca
  to: kfda
  label: 判别式扩展
milestones:
- svm
- rff
- ntk
```

## 核心算法

### SVM

```yaml
id: svm
num: 1
name: SVM
full_name: 支持向量机 (Support Vector Machine)
year: '1992'
org: AT&T Bell Labs
parent: —
paper_url: https://dl.acm.org/doi/10.1145/130385.130401
project_url: ''
category: classification
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

### C-SVM

```yaml
id: csvm
num: 2
name: C-SVM
full_name: 软间隔支持向量机 (Soft-Margin SVM)
year: '1995'
org: AT&T Bell Labs
parent: svm
paper_url: https://link.springer.com/article/10.1007/BF00994018
project_url: ''
category: classification
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

### GPR

```yaml
id: gpr
num: 3
name: GPR
full_name: 高斯过程回归 (Gaussian Process Regression)
year: '1995'
org: University of Edinburgh
parent: —
paper_url: https://proceedings.neurips.cc/paper/1995/hash/7cce53cf90577442771720a370c3c723-Abstract.html
project_url: ''
category: regression
motivation: 贝叶斯框架下核函数定义协方差，提供不确定性估计
```

#### 📝 一句话总结
GPR 将高斯过程先验直接应用于函数空间进行回归预测，通过参数化协方差函数实现自动相关性确定（ARD），并提供解析形式的预测均值与不确定性估计，为核方法回归奠定了基础。

#### 🎯 核心要点
- 非参数贝叶斯回归：对函数施加高斯过程先验，预测分布为解析高斯分布
- 预测公式：均值 \(k^T(x)K^{-1}t\)，方差 \(C(x,x) - k^T(x)K^{-1}k(x)\)
- 协方差函数设计：包含局部相关项（指数二次）、线性回归项和噪声项三部分
- 自动相关性确定（ARD）：每个输入维度独立的长度尺度参数 \(w_l\)，自动识别无关输入
- 超参数学习：最大似然估计（共轭梯度优化）和混合蒙特卡洛（HMC）两种方法
- 计算复杂度 \(O(n^3)\)：源于矩阵求逆操作
- 统一框架：将 ARMA 模型、样条平滑、kriging 等方法统一在高斯过程视角下

#### 🔬 深入细节
![高斯过程回归预测示意图](https://proceedings.neurips.cc/paper/1995/file/7cce53cf90577442771720a370c3c723-Paper.pdf)
*图：论文 Figure 1 展示了 GP 预测的核心思想——通过训练点的观测值对联合高斯分布进行条件化，得到测试点的预测分布（含均值和不确定性）。*

> 💡 **核心直觉**：高斯过程回归的本质是：假设任意有限个点的函数值服从联合高斯分布，观测到训练数据后，通过条件化（conditioning）得到测试点的后验预测分布。

```python
# GPR 预测伪代码
def gpr_predict(X_train, t_train, x_test, covariance_fn, theta):
    """
    高斯过程回归预测
    X_train: 训练输入 (n, d)
    t_train: 训练目标 (n,)
    x_test: 测试输入
    covariance_fn: 协方差函数 C(x_i, x_j; theta)
    theta: 超参数 (v0, v1, w1,...,wd, a0, a1)
    """
    n = len(X_train)
    
    # 构建训练集协方差矩阵 K (n x n)
    K = [[covariance_fn(X_train[i], X_train[j], theta) 
          for j in range(n)] for i in range(n)]
    
    # 构建测试点与训练集的交叉协方差向量 k(x)
    k_x = [covariance_fn(x_test, X_train[i], theta) for i in range(n)]
    
    # 预测均值: k^T(x) @ K^{-1} @ t
    K_inv_t = solve(K, t_train)  # O(n^3)
    mean = dot(k_x, K_inv_t)
    
    # 预测方差: C(x,x) - k^T(x) @ K^{-1} @ k(x)
    K_inv_k = solve(K, k_x)
    variance = covariance_fn(x_test, x_test, theta) - dot(k_x, K_inv_k)
    
    return mean, variance

# 超参数优化 (最大似然)
def optimize_hyperparameters(X_train, t_train, covariance_fn, theta_init):
    """
    最大化对数边际似然:
    log p(t|X,theta) = -1/2 log|K| - 1/2 t^T K^{-1} t - n/2 log(2π)
    """
    def neg_log_likelihood(theta):
        K = build_K(X_train, covariance_fn, theta)
        return 0.5 * log_det(K) + 0.5 * dot(t, solve(K, t)) + n/2 * log(2*pi)
    
    # 使用共轭梯度法优化
    theta_opt = conjugate_gradient(neg_log_likelihood, theta_init)
    return theta_opt
```

**1. 动机与背景**

传统的回归方法（如神经网络）面临两个核心问题：（1）模型选择困难——需要确定网络结构、隐藏单元数等；（2）难以提供可靠的预测不确定性估计。虽然贝叶斯神经网络（如 Neal 1994 的工作）通过对权重积分可以解决这些问题，但计算上需要复杂的 MCMC 采样。

Williams 和 Rasmussen 提出了一种更直接的方法：既然贝叶斯神经网络在无限宽度极限下等价于高斯过程（Neal 1994），为什么不直接在函数空间上指定高斯过程先验？这样可以：
- 避免模型选择问题（非参数方法）
- 获得解析形式的预测分布
- 自然地提供不确定性估计

**2. 核心机制：高斯过程预测**

给定训练数据 \(\{(x^{(i)}, t^{(i)})\}_{i=1}^n\)，假设目标值由真实函数加噪声生成：\(t^{(i)} = y(x^{(i)}) + \epsilon\)，其中 \(\epsilon \sim \mathcal{N}(0, v_1)\)。

对函数 \(y(\cdot)\) 施加均值为零的高斯过程先验，其完全由协方差函数 \(C(x, x')\) 确定。对于任意测试点 \(x\)，预测分布为高斯分布：

$$\mu(x) = \mathbf{k}^T(x) K^{-1} \mathbf{t}$$

$$\sigma^2(x) = C(x, x) - \mathbf{k}^T(x) K^{-1} \mathbf{k}(x)$$

其中：
- \(\mathbf{k}(x) = (C(x, x^{(1)}), \ldots, C(x, x^{(n)}))^T\) 是测试点与所有训练点的协方差向量
- \(K_{ij} = C(x^{(i)}, x^{(j)})\) 是训练集的协方差矩阵
- \(\mathbf{t} = (t^{(1)}, \ldots, t^{(n)})^T\) 是训练目标向量

> 💡 **关键直觉**：预测均值是训练目标值的线性加权组合，权重由测试点与训练点的"相似度"（协方差）决定。预测方差反映了先验不确定性减去由训练数据提供的信息量。

**3. 协方差函数设计与 ARD**

论文提出的协方差函数包含三个组成部分：

$$C(x^{(i)}, x^{(j)}) = v_0 \exp\left\{-\frac{1}{2} \sum_{l=1}^d w_l (x_l^{(i)} - x_l^{(j)})^2\right\} + a_0 + a_1 \sum_{l=1}^d x_l^{(i)} x_l^{(j)} + v_1 \delta_{ij}$$

各部分的作用：
- **局部相关项**（第一项）：输入空间中距离近的点具有高度相关的输出。每个维度有独立的长度尺度参数 \(w_l\)——这就是**自动相关性确定（ARD）**的核心：如果某个输入维度无关，对应的 \(w_l\) 会趋近于零，模型自动忽略该维度。\(v_0\) 控制局部相关的整体尺度。
- **线性回归项**（\(a_0 + a_1 \sum x_l^{(i)} x_l^{(j)}\)）：提供全局线性趋势建模能力。
- **噪声项**（\(v_1 \delta_{ij}\)）：建模观测噪声方差。

> ⚠️ **注意**：超参数定义为对应变量的对数（因为它们是正的尺度参数），即 \(\theta = (\log v_0, \log v_1, \log w_1, \ldots, \log w_d, \log a_0, \log a_1)\)。

**4. 超参数学习**

论文提出两种超参数学习方法：

**方法一：最大似然估计（ML）**

对数边际似然为：

$$\ell = -\frac{1}{2} \log \det K - \frac{1}{2} \mathbf{t}^T K^{-1} \mathbf{t} - \frac{n}{2} \log 2\pi$$

使用共轭梯度法最大化 \(\ell\)。对数似然对超参数的梯度可以解析计算：

$$\frac{\partial \ell}{\partial \theta_i} = -\frac{1}{2} \text{tr}\left(K^{-1} \frac{\partial K}{\partial \theta_i}\right) + \frac{1}{2} \mathbf{t}^T K^{-1} \frac{\partial K}{\partial \theta_i} K^{-1} \mathbf{t}$$

**方法二：混合蒙特卡洛（HMC）**

为了避免 ML 可能陷入局部最优，论文采用 HMC 对超参数的后验分布进行采样。HMC 引入辅助动量变量，利用哈密顿动力学进行高效采样：
- 使用 leapfrog 积分器模拟动力学轨迹
- 窗口化 HMC：在轨迹的一个窗口内随机选择接受状态
- 动量持续性（persistence = 0.95）：减缓动量变化速度，避免随机游走

最终预测分布是 200 个高斯分布的混合（对应 200 组采样的超参数值）。

**5. 与传统方法的区别**

| 方法 | 特点 | 局限 |
|------|------|------|
| 参数化神经网络 | 需选择结构，点估计 | 模型选择困难，无不确定性 |
| 贝叶斯神经网络 | 权重积分，MCMC | 计算昂贵，收敛诊断困难 |
| 样条平滑 | 特定正则化器 | 仅在 2m > d 时有效 |
| **GPR** | **非参数，解析预测** | **\(O(n^3)\) 复杂度** |

GPR 的核心优势在于：
1. 预测分布有解析形式（无需 MCMC 采样预测）
2. 自然提供校准的不确定性估计
3. ARD 机制自动进行特征选择
4. 统一了多种经典回归方法（样条、kriging、ARMA）

**6. 实验验证**

在 Neal 的机器人手臂问题上（200 训练/200 测试），GPR 取得了与贝叶斯神经网络可比的性能：
- GPR（2输入）：测试误差 1.126
- GPR（6输入，含噪声/无关输入）：测试误差 1.138
- Neal 的贝叶斯神经网络（2输入）：1.094

关键发现：在 6 输入实验中，GPR 通过 ARD 成功识别出无关输入（对应的 \(w_l\) 值很小），性能几乎不受影响，验证了自动相关性确定的有效性。

#### 🧪 练习题
```yaml
question: "在高斯过程回归中，协方差函数中每个输入维度的长度尺度参数 w_l 的作用是什么？"
options:
  - "控制预测分布的均值大小"
  - "实现自动相关性确定（ARD），当 w_l 趋近零时模型忽略该维度"
  - "决定训练数据的噪声方差"
  - "控制矩阵求逆的数值稳定性"
answer: 1
explain: "w_l 是每个输入维度的独立长度尺度参数，当某维度无关时 w_l→0，使该维度对协方差无贡献，从而实现自动特征选择（ARD）。"
```

### SVR

```yaml
id: svr
num: 4
name: SVR
full_name: 支持向量回归 (Support Vector Regression)
year: '1996'
org: AT&T Bell Labs
parent: svm
paper_url: https://proceedings.neurips.cc/paper/1996/hash/d38901788c533e8286cb6400b40b386d-Abstract.html
project_url: ''
category: regression
motivation: ε-不敏感损失实现稀疏核回归
```

#### 📝 一句话总结
SVR 将支持向量机的最大间隔思想推广到回归问题，通过引入 ε-不敏感损失函数构建一个围绕回归函数的"管道"（ε-tube），仅对落在管道外的样本施加惩罚，从而获得稀疏的核回归解。

#### 🎯 核心要点
- 提出 ε-不敏感损失函数（ε-insensitive loss）：预测误差在 ε 范围内不计损失，超出部分线性惩罚
- 原始优化问题：最小化 \(\frac{1}{2}\|w\|^2 + C\sum(\xi_i + \xi_i^*)\)，兼顾模型平坦性与拟合精度
- 对偶形式通过拉格朗日乘子推导，天然支持核技巧（Kernel Trick）实现非线性回归
- 稀疏性：仅 ε-tube 外的样本对应非零拉格朗日乘子，成为支持向量
- 超参数三元组 \((C, \varepsilon, \text{kernel})\) 控制模型复杂度与泛化能力
- 实验对比 Bagging（基于回归树的集成方法）和特征空间岭回归，SVR 在高维空间中优势显著
- 优化复杂度不依赖输入空间维度，仅依赖样本数量

#### 🔬 深入细节
![SVR ε-tube 示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kernel_Machine.svg/600px-Kernel_Machine.svg.png)
*图：支持向量机/回归的核映射示意。SVR 在高维特征空间中构建 ε-tube，仅管道外的点（支持向量）参与决定回归函数。*

```python
# SVR 训练伪代码
# 输入: 训练集 {(x_i, y_i)}, 参数 C, ε, 核函数 K
# 输出: 回归函数 f(x)

# 1. 构建对偶优化问题
# maximize: -½ Σᵢ Σⱼ (αᵢ - αᵢ*)(αⱼ - αⱼ*) K(xᵢ, xⱼ)
#           - ε Σᵢ (αᵢ + αᵢ*) + Σᵢ yᵢ(αᵢ - αᵢ*)
# subject to: Σᵢ (αᵢ - αᵢ*) = 0
#             0 ≤ αᵢ, αᵢ* ≤ C

# 2. 求解二次规划 (QP) 得到 α, α*
alpha, alpha_star = solve_QP(K, y, C, epsilon)

# 3. 识别支持向量 (α_i > 0 或 α_i* > 0 的样本)
support_vectors = [(i, x_i) for i in range(n) if alpha[i] > 0 or alpha_star[i] > 0]

# 4. 计算偏置 b (利用 KKT 条件, 选取 0 < α_i < C 的样本)
b = y_s - sum((alpha[j] - alpha_star[j]) * K(x_j, x_s) for j in SV) - epsilon

# 5. 预测函数
def f(x):
    return sum((alpha[i] - alpha_star[i]) * K(x_i, x) for i in SV) + b
```

**动机与背景**

在 1996 年之前，回归问题的主流方法包括线性回归、岭回归、神经网络和回归树等。这些方法存在以下局限：

1. **线性回归/岭回归**：在原始空间中只能拟合线性关系，表达能力有限；
2. **神经网络**：虽然具有强大的非线性拟合能力，但容易过拟合，且缺乏统计学习理论的泛化保证；
3. **回归树/Bagging**：对高维数据效率低下，且预测函数不连续。

Vapnik 在 1995 年提出的统计学习理论（VC 理论）为结构风险最小化提供了理论框架。SVM 已在分类问题上取得了巨大成功，自然的问题是：**能否将最大间隔的思想推广到回归问题？** SVR 正是对这一问题的回答。

**核心机制：ε-不敏感损失函数**

SVR 的核心创新在于 ε-不敏感损失函数的设计：

$$L_\varepsilon(y, f(x)) = \max(0, |y - f(x)| - \varepsilon)$$

这个损失函数的直觉是：**如果预测值与真实值的偏差不超过 ε，则认为预测是"足够好的"，不施加任何惩罚。** 只有当误差超过 ε 时，才按超出部分的大小线性惩罚。这与 Huber 损失不同——Huber 损失在零点附近是二次的，而 ε-不敏感损失在 \([-\varepsilon, \varepsilon]\) 区间内完全为零。

> 💡 关键：ε-tube 的宽度直接决定了模型的稀疏性。ε 越大，落在管道内的样本越多，支持向量越少，模型越简单但可能欠拟合。

**原始优化问题**

对于线性回归函数 \(f(x) = \langle w, x \rangle + b\)，SVR 的原始优化问题为：

$$\min_{w, b, \xi, \xi^*} \frac{1}{2}\|w\|^2 + C \sum_{i=1}^{n}(\xi_i + \xi_i^*)$$

$$\text{s.t.} \quad y_i - \langle w, x_i \rangle - b \leq \varepsilon + \xi_i$$
$$\langle w, x_i \rangle + b - y_i \leq \varepsilon + \xi_i^*$$
$$\xi_i, \xi_i^* \geq 0$$

其中：
- \(\frac{1}{2}\|w\|^2\) 是正则化项，控制函数的平坦程度（复杂度）；
- \(C\) 是正则化参数，平衡模型复杂度与训练误差；
- \(\xi_i, \xi_i^*\) 是松弛变量，分别对应上方和下方超出 ε-tube 的偏差。

**对偶形式与核技巧**

通过引入拉格朗日乘子 \(\alpha_i, \alpha_i^*\)，利用 KKT 条件推导对偶问题：

$$\max_{\alpha, \alpha^*} -\frac{1}{2}\sum_{i,j}(\alpha_i - \alpha_i^*)(\alpha_j - \alpha_j^*)\langle x_i, x_j \rangle - \varepsilon\sum_i(\alpha_i + \alpha_i^*) + \sum_i y_i(\alpha_i - \alpha_i^*)$$

$$\text{s.t.} \quad \sum_i(\alpha_i - \alpha_i^*) = 0, \quad 0 \leq \alpha_i, \alpha_i^* \leq C$$

关键观察：对偶问题中，输入数据仅以内积 \(\langle x_i, x_j \rangle\) 的形式出现。因此可以用核函数 \(K(x_i, x_j) = \langle \Phi(x_i), \Phi(x_j) \rangle\) 替换内积，实现非线性回归而无需显式计算高维映射。常用核函数包括：
- 高斯 RBF 核：\(K(x, x') = \exp(-\gamma\|x - x'\|^2)\)
- 多项式核：\(K(x, x') = (\langle x, x' \rangle + c)^d\)

最终回归函数为：

$$f(x) = \sum_{i=1}^{n}(\alpha_i - \alpha_i^*) K(x_i, x) + b$$

> ⚠️ 注意：由 KKT 条件，当 \(|y_i - f(x_i)| < \varepsilon\) 时，\(\alpha_i = \alpha_i^* = 0\)。这意味着 ε-tube 内部的样本对回归函数没有任何贡献——这正是 SVR 稀疏性的来源。

**与传统方法的区别**

| 特性 | SVR | 岭回归 | 神经网络 | 回归树 |
|------|-----|--------|----------|--------|
| 非线性能力 | 核技巧 | 需手动特征工程 | 隐层激活 | 分段常数 |
| 稀疏性 | ✓（仅支持向量） | ✗（所有样本） | ✗ | ✗ |
| 泛化理论 | VC 维/结构风险最小化 | 偏差-方差权衡 | 经验性 | 经验性 |
| 高维适应性 | 优秀（不依赖维度） | 需正则化 | 需大量数据 | 维度灾难 |
| 解的唯一性 | ✓（凸优化） | ✓ | ✗（非凸） | ✗ |

论文实验表明，SVR 在高维输入空间中表现尤为突出，因为其优化过程的复杂度不依赖于输入空间维度，而仅取决于样本数量和支持向量数量。

#### 🧪 练习题
```yaml
question: "SVR 中 ε-不敏感损失函数的核心作用是什么？"
options:
  - "将回归问题转化为分类问题"
  - "对预测误差在 ε 范围内的样本不施加惩罚，从而获得稀疏解"
  - "通过 ε 参数控制核函数的带宽"
  - "限制权重向量的范数不超过 ε"
answer: 1
explain: "ε-不敏感损失使得 ε-tube 内的样本对应的拉格朗日乘子为零，不参与回归函数的构建，从而实现稀疏的支持向量表示。"
```

### KPCA

```yaml
id: kpca
num: 5
name: KPCA
full_name: 核主成分分析 (Kernel PCA)
year: '1998'
org: MPI
parent: —
paper_url: https://link.springer.com/article/10.1007/s11222-011-9259-4
project_url: ''
category: reduction
motivation: 特征空间中做PCA，提取非线性主成分
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

### KRR

```yaml
id: krr
num: 6
name: KRR
full_name: 核岭回归 (Kernel Ridge Regression)
year: '1998'
org: Royal Holloway
parent: —
paper_url: https://pure.royalholloway.ac.uk/en/publications/ridge-regression-learning-algorithm-in-dual-variables
project_url: ''
category: regression
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

### KFDA

```yaml
id: kfda
num: 7
name: KFDA
full_name: 核Fisher判别分析 (Kernel Fisher Discriminant Analysis)
year: '1999'
org: GMD FIRST
parent: kpca
paper_url: https://ieeexplore.ieee.org/abstract/document/788121/
project_url: ''
category: reduction
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

### LS-SVM

```yaml
id: lssvm
num: 8
name: LS-SVM
full_name: 最小二乘支持向量机 (Least Squares SVM)
year: '1999'
org: KU Leuven
parent: csvm
paper_url: https://link.springer.com/article/10.1023/A:1018628609742
project_url: ''
category: classification
motivation: 等式约束加平方损失，将QP化为线性方程组
```

#### 📝 一句话总结
LS-SVM 将标准 SVM 中的不等式约束替换为等式约束，并采用平方损失函数代替铰链损失，使得原本需要求解二次规划（QP）的训练过程简化为求解一组线性方程组（KKT 系统），大幅降低了计算复杂度。

#### 🎯 核心要点
- **等式约束替代不等式约束**：将 \(y_i[\mathbf{w}^T\varphi(\mathbf{x}_i)+b] \geq 1-\xi_i\) 改为 \(y_i[\mathbf{w}^T\varphi(\mathbf{x}_i)+b] = 1-e_i\)，消除了互补松弛条件
- **平方误差损失**：目标函数中使用 \(\frac{\gamma}{2}\sum e_i^2\) 代替 \(C\sum \xi_i\)，使得 KKT 条件变为线性系统
- **线性方程组求解**：训练归结为求解一个 \((N+1)\times(N+1)\) 的线性系统，避免了 QP 求解器
- **KKT 矩阵形式**：最终形式为分块矩阵方程 \(\begin{bmatrix}0 & \mathbf{1}^T\\ \mathbf{1} & \boldsymbol{\Omega}+\gamma^{-1}\mathbf{I}\end{bmatrix}\begin{bmatrix}b\\ \boldsymbol{\alpha}\end{bmatrix}=\begin{bmatrix}0\\ \mathbf{y}\end{bmatrix}\)
- **全体样本为支持向量**：由于等式约束，所有训练样本的 Lagrange 乘子通常非零，丧失了经典 SVM 的稀疏性
- **正则化参数 γ**：控制拟合精度与模型复杂度的权衡，类似于 C-SVM 中的惩罚参数 C
- **Two-spiral 基准验证**：在经典的双螺旋分类问题上验证了方法的有效性

#### 🔬 深入细节
![LS-SVM 与标准 SVM 对比示意](https://upload.wikimedia.org/wikipedia/commons/2/2a/Svm_max_sep_hyperplane_with_margin.png)
*图：支持向量机分类示意。LS-SVM 与标准 SVM 共享相同的决策边界几何结构，但训练时所有样本均参与决策（非稀疏），且求解过程从 QP 简化为线性系统。*

**算法伪代码（LS-SVM 训练流程）：**

```python
# LS-SVM 最小二乘支持向量机训练
# 输入: 训练集 {(x_i, y_i)}, i=1..N, y_i ∈ {-1, +1}
#        正则化参数 γ, 核函数 K(·,·)

# 1. 构建核矩阵 Ω
Omega[i,j] = y_i * y_j * K(x_i, x_j)   # N×N 对称矩阵

# 2. 构建 KKT 线性系统
#    [ 0    | 1^T        ] [b]     [0]
#    [ 1    | Ω + γ^{-1}I] [α]  =  [y]
A = [[0,       ones(1,N)    ],
     [ones(N,1), Omega + I/gamma]]
rhs = [0, y]

# 3. 求解线性方程组
[b, alpha] = solve_linear_system(A, rhs)

# 4. 分类决策函数
f(x) = sign( Σ_{i=1}^{N} α_i * K(x_i, x) + b )
```

##### 动机与背景

标准 C-SVM 通过求解一个带不等式约束的二次规划问题来获得最优分类超平面。虽然 QP 问题有成熟的求解算法（如 SMO、chunking），但其计算复杂度仍然较高：
- 对于 \(N\) 个训练样本，QP 的时间复杂度介于 \(O(N^2)\) 到 \(O(N^3)\) 之间
- 需要专门的 QP 求解器（如 LOQO、CPLEX 或 SMO 算法）
- 不等式约束导致的互补松弛条件（KKT 条件）使得求解过程本质上是组合优化

Suykens 和 Vandewalle 在 1999 年提出了一个优雅的简化方案：**如果将不等式约束改为等式约束，同时将线性损失改为平方损失，那么 KKT 条件将退化为一个线性方程组**，可以直接用标准线性代数方法求解。

##### 核心机制：从 QP 到线性系统

**原始优化问题**：LS-SVM 的原始形式为

$$\min_{\mathbf{w}, b, \mathbf{e}} \quad \frac{1}{2}\|\mathbf{w}\|^2 + \frac{\gamma}{2}\sum_{i=1}^{N} e_i^2$$

$$\text{s.t.} \quad y_i[\mathbf{w}^T\varphi(\mathbf{x}_i) + b] = 1 - e_i, \quad i = 1, \ldots, N$$

与 C-SVM 的关键区别：
1. **等式约束**：\(= 1 - e_i\) 而非 \(\geq 1 - \xi_i\)
2. **平方损失**：\(\frac{\gamma}{2}\sum e_i^2\) 而非 \(C\sum \xi_i\)
3. **误差变量无非负约束**：\(e_i\) 可取任意实数值

> 💡 **关键直觉**：等式约束意味着每个样本都"紧贴"在约束面上，没有"自由"样本的概念。平方损失使得目标函数对 \(e_i\) 是二次的，与正则项 \(\|\mathbf{w}\|^2\) 一起构成纯二次目标，其 KKT 条件自然是线性的。

**构建 Lagrangian**：

$$\mathcal{L}(\mathbf{w}, b, \mathbf{e}, \boldsymbol{\alpha}) = \frac{1}{2}\|\mathbf{w}\|^2 + \frac{\gamma}{2}\sum_{i=1}^{N} e_i^2 - \sum_{i=1}^{N} \alpha_i \left\{ y_i[\mathbf{w}^T\varphi(\mathbf{x}_i) + b] - 1 + e_i \right\}$$

其中 \(\alpha_i \in \mathbb{R}\)（注意：由于是等式约束，Lagrange 乘子**无符号约束**）。

**KKT 最优性条件**：对各变量求偏导并令其为零：

$$\frac{\partial \mathcal{L}}{\partial \mathbf{w}} = 0 \Rightarrow \mathbf{w} = \sum_{i=1}^{N} \alpha_i y_i \varphi(\mathbf{x}_i)$$

$$\frac{\partial \mathcal{L}}{\partial b} = 0 \Rightarrow \sum_{i=1}^{N} \alpha_i y_i = 0$$

$$\frac{\partial \mathcal{L}}{\partial e_i} = 0 \Rightarrow \alpha_i = \gamma e_i$$

$$\frac{\partial \mathcal{L}}{\partial \alpha_i} = 0 \Rightarrow y_i[\mathbf{w}^T\varphi(\mathbf{x}_i) + b] - 1 + e_i = 0$$

> ⚠️ **注意**：第三个条件 \(\alpha_i = \gamma e_i\) 是 LS-SVM 的核心——它将误差变量与 Lagrange 乘子线性关联。在 C-SVM 中，对应的是互补松弛条件 \(\alpha_i \xi_i = 0\)（非线性），这正是 QP 复杂性的根源。

##### 线性系统的推导

消去 \(\mathbf{w}\) 和 \(\mathbf{e}\)，利用核函数 \(\Omega_{ij} = y_i y_j K(\mathbf{x}_i, \mathbf{x}_j) = y_i y_j \varphi(\mathbf{x}_i)^T\varphi(\mathbf{x}_j)\)，最终得到线性方程组：

$$\begin{bmatrix} 0 & \mathbf{y}^T \\ \mathbf{y} & \boldsymbol{\Omega} + \gamma^{-1}\mathbf{I} \end{bmatrix} \begin{bmatrix} b \\ \boldsymbol{\alpha} \end{bmatrix} = \begin{bmatrix} 0 \\ \mathbf{1} \end{bmatrix}$$

其中 \(\mathbf{y} = [y_1, \ldots, y_N]^T\)，\(\mathbf{1} = [1, \ldots, 1]^T\)。

> 💡 **关键**：这是一个 \((N+1) \times (N+1)\) 的**对称正定**线性系统（当 \(\gamma > 0\) 时），可用 Cholesky 分解、共轭梯度法等高效算法求解，时间复杂度为 \(O(N^3)\)（直接法）或更低（迭代法）。

##### 决策函数与预测

求解得到 \(\boldsymbol{\alpha}\) 和 \(b\) 后，对新样本 \(\mathbf{x}\) 的分类决策为：

$$y(\mathbf{x}) = \text{sign}\left[\sum_{i=1}^{N} \alpha_i y_i K(\mathbf{x}_i, \mathbf{x}) + b\right]$$

形式上与标准 SVM 完全一致，但**所有** \(\alpha_i\) 通常非零。

##### 与标准 C-SVM 的关键区别

| 特性 | C-SVM | LS-SVM |
|------|-------|--------|
| 约束类型 | 不等式 \(\geq 1 - \xi_i\) | 等式 \(= 1 - e_i\) |
| 损失函数 | 铰链损失 \(C\sum\xi_i\) | 平方损失 \(\frac{\gamma}{2}\sum e_i^2\) |
| 乘子约束 | \(0 \leq \alpha_i \leq C\) | \(\alpha_i \in \mathbb{R}\)（无约束） |
| 求解方法 | 二次规划 (QP) | 线性方程组 |
| 稀疏性 | 仅支持向量 \(\alpha_i > 0\) | 所有 \(\alpha_i \neq 0\)（非稀疏） |
| 鲁棒性 | 对异常值较鲁棒（铰链损失有界） | 对异常值敏感（平方损失无界） |
| 计算工具 | 需 QP 求解器 | 标准线性代数即可 |

##### 稀疏性问题与后续改进

LS-SVM 的主要缺点是丧失了稀疏性——所有训练样本都是"支持向量"，导致：
- 模型存储需要保留全部训练数据
- 预测时计算量为 \(O(N)\)，而非稀疏 SVM 的 \(O(N_{SV})\)

后续研究提出了多种稀疏化方法：
- **剪枝法**：训练后移除 \(|\alpha_i|\) 较小的样本，迭代重训练
- **加权 LS-SVM**：对不同样本赋予不同权重，模拟稀疏效果
- **固定大小 LS-SVM**：通过 Nyström 近似或子集选择限制模型规模

##### 实验验证

论文在经典的 **two-spiral** 分类问题上验证了 LS-SVM 的有效性：
- 使用 RBF 核 \(K(\mathbf{x}, \mathbf{y}) = \exp(-\|\mathbf{x}-\mathbf{y}\|^2/\sigma^2)\)
- 成功分离了两条交织的螺旋线
- 验证了从 QP 到线性系统的等价性——分类性能与标准 SVM 相当，但训练速度显著提升

#### 🧪 练习题
```yaml
question: "LS-SVM 相比标准 C-SVM 的核心简化在于什么？"
options:
  - "使用线性核代替非线性核函数"
  - "将不等式约束改为等式约束并用平方损失，使 KKT 条件变为线性系统"
  - "减少训练样本数量以降低计算复杂度"
  - "用梯度下降代替解析求解"
answer: 1
explain: "LS-SVM 的核心创新是将 SVM 的不等式约束替换为等式约束，同时用平方损失代替铰链损失，使得 KKT 最优性条件从非线性互补问题退化为线性方程组，可直接用线性代数方法求解。"
```

### Nyström

```yaml
id: nystrom
num: 9
name: Nyström
full_name: Nyström近似 (Nyström Approximation)
year: '2001'
org: University of Edinburgh
parent: —
paper_url: https://proceedings.neurips.cc/paper/2000/hash/130590ca273143b099a541353748ad29-Abstract.html
project_url: ''
category: approximation
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

### MKL

```yaml
id: mkl
num: 10
name: MKL
full_name: 多核学习 (Multiple Kernel Learning)
year: '2004'
org: UC Berkeley
parent: csvm
paper_url: https://www.jmlr.org/papers/v5/lanckriet04a.html
project_url: ''
category: classification
motivation: 凸优化自动学习多核线性组合
```

#### 📝 一句话总结
MKL 将核矩阵学习问题形式化为半定规划（SDP），并证明当核矩阵限制为已知核的正线性组合时，问题可高效归约为二次约束二次规划（QCQP），从而在保持分类精度的同时大幅降低计算成本，奠定了多核学习领域的理论基础。

#### 🎯 核心要点
- 提出将核矩阵学习建模为 SDP 问题，在正半定锥上优化核矩阵以最大化分类间隔
- 核心约束：\(K \succeq 0\)（正半定）+ \(\text{trace}(K) = c\)（正则化）
- 支持三种 SVM 变体：硬间隔、1-范数软间隔、2-范数软间隔
- 关键定理（Theorem 17）：当 \(K = \sum_{i=1}^m \mu_i K_i,\ \mu \geq 0\) 时，SDP 退化为 QCQP，计算复杂度大幅降低
- 引入核对齐（Kernel Alignment）作为无监督核质量度量，可得闭式解
- 扩展至转导学习（Transduction）：同时优化核矩阵和未标记样本的标签
- 实验表明 QCQP 方法在秒级完成（vs SDP 的分钟级），精度与完整 SDP 相当，优于交叉验证选核

#### 🔬 深入细节
##### 问题背景与动机

传统 SVM 依赖用户手动选择核函数及其超参数（如 RBF 核的带宽 \(\sigma\)），通常通过交叉验证网格搜索完成。这种方法存在以下缺陷：

1. **计算开销大**：需要对每组超参数训练完整 SVM
2. **方差高**：小样本下交叉验证结果不稳定
3. **搜索空间有限**：只能在预定义的离散网格中选择

本文提出的核心思想是：**将核函数选择从离散搜索转化为连续凸优化问题**，直接在核矩阵空间中寻找最优解。

##### 数学框架

**基本优化问题**：给定训练样本 \(\{(x_i, y_i)\}_{i=1}^n\)，学习最优核矩阵 \(K\)：

$$
\min_{K \succeq 0,\ \text{trace}(K)=c} \omega(K_{\text{tr}})
$$

其中 \(\omega(K_{\text{tr}})\) 是 SVM 目标函数值（作为核矩阵的函数）。trace 约束起正则化作用，防止核矩阵无界增长。

**2-范数软间隔 SVM 的对偶形式**（Theorem 9）：

$$
\max_{\alpha} \quad 2\alpha^T e - \alpha^T \left( \text{diag}(y) K_{\text{tr}} \text{diag}(y) + \tau I \right) \alpha
$$
$$
\text{s.t.} \quad \alpha^T y = 0, \quad \alpha \geq 0
$$

其中 \(\tau = 1/C\) 控制正则化强度。将核矩阵优化与 SVM 训练联合，得到 SDP：

$$
\min_{K \succeq 0} \max_{\alpha \geq 0} \quad 2\alpha^T e - \alpha^T (G(K_{\text{tr}}) + \tau I) \alpha
$$
$$
\text{s.t.} \quad \text{trace}(K) = c, \quad \alpha^T y = 0
$$

其中 \(G(K_{\text{tr}}) = \text{diag}(y) K_{\text{tr}} \text{diag}(y)\)。

##### 核心算法：QCQP 求解多核组合

当核矩阵被限制为已知核的正线性组合 \(K = \sum_{i=1}^m \mu_i K_i,\ \mu_i \geq 0\) 时，通过强对偶性交换 min-max 顺序，问题简化为：

```
Algorithm: MKL via QCQP (Theorem 17)
Input: 训练数据 {(x_i, y_i)}, 基核矩阵 {K_1, ..., K_m}, 正则化参数 τ, C
Output: 最优组合系数 μ*, 支持向量系数 α*

1. 计算每个基核的 Gram 矩阵: G(K_i) = diag(y) K_i diag(y)
2. 计算 trace 归一化因子: r_i = trace(K_i)
3. 求解 QCQP:
   max_{α, t}  2α^T e - τ α^T α - c·t
   s.t.  t ≥ (1/r_i) α^T G(K_i) α,  i = 1,...,m
         α^T y = 0
         C ≥ α ≥ 0
4. 从对偶变量恢复 μ*: μ_i* = λ_i* · c / r_i
   (λ_i* 为第 i 个二次约束的拉格朗日乘子)
5. 构造最优核: K* = Σ μ_i* K_i
```

> 💡 关键直觉：变量 \(t\) 是所有核的"最差表现"的上界。优化目标在最大化间隔的同时最小化这个上界，本质上是在所有基核中自动选择最优组合。内层对 \(\mu\) 的最小化退化为取最大值操作（线性规划的极点解），使问题从 SDP 降维为 QCQP。

##### 核对齐（Kernel Alignment）

论文引入了一种无需训练 SVM 即可评估核质量的度量：

$$
A(K_1, K_2) = \frac{\langle K_1, K_2 \rangle_F}{\|K_1\|_F \|K_2\|_F} = \frac{\text{trace}(K_1^T K_2)}{\sqrt{\text{trace}(K_1^T K_1) \cdot \text{trace}(K_2^T K_2)}}
$$

以理想核 \(K^* = yy^T\) 为目标，最大化 \(A(K, yy^T)\) 可得到闭式解：

$$
\mu_i^* = \frac{y^T K_i y}{\sqrt{\sum_j (y^T K_j y)^2}}
$$

> ⚠️ 注意：核对齐方法虽然计算极快（无需求解优化问题），但它不考虑间隔最大化，因此在某些场景下性能不如 SDP/QCQP 方法。

##### 转导学习扩展

对于半监督场景，论文将未标记样本的标签 \(y_u \in \{-1, +1\}^{n_u}\) 也作为优化变量，联合优化核矩阵和标签分配。这使得核矩阵可以利用未标记数据的分布信息，但引入了组合优化的困难（通过松弛处理）。

##### 实验结果与计算效率

在 UCI Heart 和 Sonar 数据集上的实验表明：

| 方法 | Heart 精度 | Sonar 精度 | 计算时间 |
|------|-----------|-----------|---------|
| 最优单核 (交叉验证) | 77.7% - 83.9% | 84.2% | ~多次 QP |
| SDP (完整核学习) | 84.8% | 84.6% | ~10 min |
| QCQP (正权重) | 84.6% | 85.8% | ~3 sec |

> 💡 关键发现：QCQP 方法以约 1/200 的计算时间达到与完整 SDP 相当甚至更优的分类精度，且优于传统交叉验证方法。论文推荐 QCQP 作为实际应用的首选方法。

##### 与传统方法的对比

| 特性 | 交叉验证选核 | SDP 核学习 | QCQP 多核组合 |
|------|------------|-----------|--------------|
| 搜索空间 | 离散有限网格 | 整个 PSD 锥 | 基核的正锥组合 |
| 理论保证 | 无（启发式） | 全局最优 | 受限空间全局最优 |
| 计算复杂度 | \(O(g \cdot n^3)\) | \(O(n^{6.5})\) | \(O(m \cdot n^3)\) |
| 小样本表现 | 高方差 | 稳定 | 稳定 |
| 可扩展性 | 中等 | 差 | 良好 |

其中 \(g\) 为网格点数，\(m\) 为基核数量，\(n\) 为样本数。

#### 🧪 练习题
```yaml
question: "在 MKL 的 QCQP 公式中，将核矩阵限制为 K = Σμ_i K_i (μ≥0) 相比完整 SDP 的主要优势是什么？"
options:
  - "可以学习到更优的核矩阵，因为搜索空间更大"
  - "计算复杂度大幅降低（从 SDP 降为 QCQP），同时保持相当的分类精度"
  - "不需要正半定约束，简化了问题结构"
  - "可以处理无限维特征空间中的核函数"
answer: 1
explain: "正权重线性组合约束使得 K≽0 自动满足（因为各 K_i≽0），SDP 退化为 QCQP，计算时间从分钟级降至秒级，而实验表明精度相当甚至更优。"
```

### RFF

```yaml
id: rff
num: 11
name: RFF
full_name: 随机傅里叶特征 (Random Fourier Features)
year: '2007'
org: Intel Research
parent: nystrom
paper_url: https://proceedings.neurips.cc/paper/2007/hash/013a006f03dbc5392effeb8f18fda755-Abstract.html
project_url: ''
category: approximation
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

### NTK

```yaml
id: ntk
num: 12
name: NTK
full_name: 神经正切核 (Neural Tangent Kernel)
year: '2018'
org: EPFL
parent: krr
paper_url: https://arxiv.org/abs/1806.07572
project_url: ''
category: frontier
motivation: 证明无限宽神经网络等价于固定核回归
```

#### 📝 一句话总结
NTK 证明了在无限宽度极限下，神经网络的梯度下降训练动态完全由一个确定性的核函数——神经正切核（Neural Tangent Kernel）所刻画，从而将深度学习的优化与泛化问题严格归约为经典的核方法理论。

#### 🎯 核心要点
- **Neural Tangent Kernel 定义**：\(\Theta(\mathbf{x}, \mathbf{x}') = \left\langle \frac{\partial f(\mathbf{x}; \theta)}{\partial \theta}, \frac{\partial f(\mathbf{x}'; \theta)}{\partial \theta} \right\rangle\)，即网络输出对参数梯度的内积
- **无限宽收敛定理**：当网络各层宽度趋于无穷时，NTK 在随机初始化下收敛到一个确定性极限核 \(\Theta^*\)
- **训练中核不变性**：在无限宽极限下，NTK 在整个梯度下降训练过程中保持恒定（lazy training regime）
- **等价核回归**：网络训练动态等价于在 NTK 对应的再生核希尔伯特空间（RKHS）中进行核回归
- **递归核计算**：深层网络的 NTK 可通过逐层递推公式精确计算，仅依赖激活函数和网络结构
- **收敛与泛化保证**：利用核矩阵正定性证明训练损失指数收敛，并通过 RKHS 范数给出泛化界
- **适用于全连接与多种架构**：理论框架覆盖全连接网络、卷积网络等多种结构

#### 🔬 深入细节
![NTK 核心概念示意：无限宽网络等价于核方法](https://arxiv.org/html/1806.07572v5/extracted/figures/ntk_convergence.png)
*图：神经正切核的核心思想——当网络宽度趋于无穷时，网络参数在训练过程中仅发生微小变化（lazy training），其训练动态由初始化时的 NTK 完全决定，等价于确定性核回归。*

```python
# NTK 递归计算伪代码（全连接 ReLU 网络）
import numpy as np

def compute_ntk_relu(X1, X2, L, sigma_w=1.0, sigma_b=0.0):
    """
    递归计算 L 层全连接 ReLU 网络的 NTK
    X1: (n1, d) 输入集1
    X2: (n2, d) 输入集2
    L: 网络层数
    返回: Theta (n1, n2) NTK 矩阵
    """
    n1, n2 = X1.shape[0], X2.shape[0]
    
    # 第0层：初始化协方差核 Σ^(0)
    Sigma = (sigma_w**2 / X1.shape[1]) * (X1 @ X2.T) + sigma_b**2
    
    # 初始化 NTK: Theta^(1) = Sigma^(1)
    # 对每层递推
    Theta = Sigma.copy()
    
    for l in range(1, L):
        # 计算 ReLU 激活后的核（Kappa_0 和 Kappa_1）
        # Lambda = Σ^(l) 的归一化角度
        diag1 = np.diag(Sigma) if len(Sigma.shape) > 1 else Sigma
        norm1 = np.sqrt(np.diag(Sigma)).reshape(-1, 1)  # (n1,1)
        norm2 = np.sqrt(np.diag(
            (sigma_w**2 / X2.shape[1]) * (X2 @ X2.T) + sigma_b**2
        )).reshape(1, -1)  # (1,n2) 简化
        
        cos_angle = np.clip(Sigma / (norm1 * norm2), -1, 1)
        angle = np.arccos(cos_angle)
        
        # Kappa_1(ReLU): E[σ(u)σ(v)] 的解析形式
        Kappa1 = (1/(2*np.pi)) * (np.sin(angle) + (np.pi - angle) * cos_angle)
        # Kappa_0(ReLU 导数): E[σ'(u)σ'(v)]
        Kappa0 = (1/(2*np.pi)) * (np.pi - angle)
        
        # 递推 NTK: Theta^(l+1) = Sigma^(l+1) + Theta^(l) * Kappa0
        Sigma_new = sigma_w**2 * Kappa1 * (norm1 * norm2) + sigma_b**2
        Theta = Sigma_new + Theta * (sigma_w**2 * Kappa0)
        Sigma = Sigma_new
    
    return Theta

# 使用 NTK 进行核回归预测
def ntk_regression(X_train, y_train, X_test, L, lam=1e-6):
    """NTK 核回归"""
    K_train = compute_ntk_relu(X_train, X_train, L)
    K_test = compute_ntk_relu(X_train, X_test, L)
    alpha = np.linalg.solve(K_train + lam * np.eye(len(y_train)), y_train)
    return K_test.T @ alpha
```

##### 动机与背景

深度神经网络在实践中表现出色，但其理论理解长期滞后。核心困难在于：

1. **优化问题非凸**：神经网络损失函数高度非凸，为何梯度下降能找到全局最优？
2. **过参数化悖论**：现代网络参数量远超训练样本数，按经典统计理论应严重过拟合，但实际泛化良好。
3. **缺乏统一分析框架**：不同架构、不同宽度的网络缺乏统一的数学描述。

此前的工作（如 Neal 1996）已证明单层无限宽网络在初始化时等价于高斯过程（NNGP），但这仅描述了初始化时的行为，无法刻画训练动态。NTK 理论的突破在于：**不仅描述初始化，更完整刻画了整个训练过程**。

##### 核心机制：Neural Tangent Kernel 的定义与性质

**定义**：考虑参数为 \(\theta \in \mathbb{R}^P\) 的神经网络 \(f(\mathbf{x}; \theta)\)，其 Neural Tangent Kernel 定义为：

$$\Theta(\mathbf{x}, \mathbf{x}') = \sum_{p=1}^{P} \frac{\partial f(\mathbf{x}; \theta)}{\partial \theta_p} \cdot \frac{\partial f(\mathbf{x}'; \theta)}{\partial \theta_p} = \left\langle \nabla_\theta f(\mathbf{x}; \theta), \nabla_\theta f(\mathbf{x}'; \theta) \right\rangle$$

直觉上，NTK 度量了两个输入 \(\mathbf{x}\) 和 \(\mathbf{x}'\) 在参数空间中"梯度方向的相似性"——如果两个输入的梯度方向一致，则更新一个输入的预测时会同时影响另一个。

**核心定理 1（收敛性）**：对于宽度为 \(n_1, \ldots, n_L\) 的全连接网络，当 \(n_1, \ldots, n_L \to \infty\)（按顺序）时，NTK 在初始化处收敛到确定性极限：

$$\Theta^{(L)}_{\text{init}} \xrightarrow{P} \Theta^{(L)*}$$

其中 \(\Theta^{(L)*}\) 仅依赖于网络架构和激活函数，不依赖于随机初始化。

**核心定理 2（训练不变性）**：在无限宽极限下，NTK 在梯度下降训练的整个过程中保持恒定：

$$\Theta(\mathbf{x}, \mathbf{x}'; \theta_t) = \Theta^{(L)*}(\mathbf{x}, \mathbf{x}'), \quad \forall t \geq 0$$

> 💡 关键：这两个定理的组合意味着无限宽网络的训练完全线性化——尽管网络本身是非线性的，但其在参数空间中的演化是线性的（参数仅在初始值附近做微小扰动）。

##### 训练动态：从梯度下降到核回归

考虑均方误差损失 \(\mathcal{L} = \frac{1}{2} \sum_{i=1}^n (f(\mathbf{x}_i; \theta) - y_i)^2\)，连续时间梯度流下网络输出的演化为：

$$\frac{d f(\mathbf{x}; \theta_t)}{dt} = -\sum_{i=1}^n \Theta(\mathbf{x}, \mathbf{x}_i; \theta_t) \cdot (f(\mathbf{x}_i; \theta_t) - y_i)$$

在训练数据点上，记 \(\mathbf{u}(t) = (f(\mathbf{x}_1; \theta_t), \ldots, f(\mathbf{x}_n; \theta_t))^\top\)，则：

$$\frac{d\mathbf{u}(t)}{dt} = -\Theta_{\text{train}} \cdot (\mathbf{u}(t) - \mathbf{y})$$

其中 \(\Theta_{\text{train}} \in \mathbb{R}^{n \times n}\) 是训练数据上的 NTK 矩阵。

当 NTK 恒定时（无限宽极限），该 ODE 有解析解：

$$\mathbf{u}(t) - \mathbf{y} = e^{-\Theta_{\text{train}} \cdot t} (\mathbf{u}(0) - \mathbf{y})$$

> 💡 关键：若 \(\Theta_{\text{train}}\) 正定（其最小特征值 \(\lambda_{\min} > 0\)），则训练误差以指数速率 \(\lambda_{\min}\) 收敛到零。这从理论上解释了为何过参数化网络能快速收敛到全局最优。

训练完成后（\(t \to \infty\)），对新测试点的预测为：

$$f(\mathbf{x}^*) = \Theta(\mathbf{x}^*, X_{\text{train}}) \cdot \Theta_{\text{train}}^{-1} \cdot \mathbf{y}$$

这正是以 \(\Theta^*\) 为核函数的**核回归**（kernel regression）预测公式。

##### NTK 的递归计算

对于 \(L\) 层全连接网络（权重初始化为 \(W^{(l)}_{ij} \sim \mathcal{N}(0, \sigma_w^2/n_l)\)），NTK 可通过以下递推计算：

**第一步**：逐层计算协方差核 \(\Sigma^{(l)}\)（即 NNGP 核）：

$$\Sigma^{(0)}(\mathbf{x}, \mathbf{x}') = \frac{\sigma_w^2}{d} \mathbf{x}^\top \mathbf{x}' + \sigma_b^2$$

$$\Sigma^{(l)}(\mathbf{x}, \mathbf{x}') = \sigma_w^2 \cdot \mathbb{E}_{(u,v) \sim \mathcal{N}(0, \Lambda^{(l-1)})}[\sigma(u)\sigma(v)] + \sigma_b^2$$

其中 \(\Lambda^{(l-1)}\) 是由 \(\Sigma^{(l-1)}\) 构成的 \(2 \times 2\) 协方差矩阵，\(\sigma\) 是激活函数。

**第二步**：计算导数核 \(\dot{\Sigma}^{(l)}\)：

$$\dot{\Sigma}^{(l)}(\mathbf{x}, \mathbf{x}') = \sigma_w^2 \cdot \mathbb{E}_{(u,v) \sim \mathcal{N}(0, \Lambda^{(l-1)})}[\sigma'(u)\sigma'(v)]$$

**第三步**：递推 NTK：

$$\Theta^{(1)} = \Sigma^{(1)}$$

$$\Theta^{(l+1)} = \Sigma^{(l+1)} + \Theta^{(l)} \cdot \dot{\Sigma}^{(l+1)}$$

> ⚠️ 注意：对于 ReLU 激活函数，上述期望有解析闭式解（涉及 arccos），使得 NTK 可以精确高效计算。

##### 与传统方法的区别

| 方面 | 传统核方法（如 KRR） | NTK 理论 |
|------|---------------------|----------|
| 核函数来源 | 人工设计（RBF、多项式等） | 由网络架构自动确定 |
| 核函数含义 | 特征空间内积 | 参数空间梯度内积 |
| 与深度学习关系 | 独立方法 | 深度学习的理论极限 |
| 层数影响 | 不适用 | 更深网络对应更复杂的核 |
| 实际应用 | 直接使用 | 主要作为理论分析工具 |

NTK 理论的重要意义在于：
1. **解释优化**：过参数化网络的损失景观在 NTK regime 下本质是凸的
2. **解释泛化**：NTK 的 RKHS 范数提供了隐式正则化的理论依据
3. **连接两大范式**：统一了核方法和深度学习的理论框架
4. **局限性**：NTK regime（lazy training）无法解释特征学习（feature learning），实际有限宽网络的行为可能偏离 NTK 预测

#### 🧪 练习题
```yaml
question: "在 NTK 理论中，当网络宽度趋于无穷时，以下哪个性质成立？"
options:
  - "NTK 在训练过程中随参数更新而快速变化"
  - "NTK 收敛到确定性极限并在训练中保持恒定"
  - "网络退化为线性模型，无法拟合非线性函数"
  - "训练损失收敛速度与核矩阵特征值无关"
answer: 1
explain: "NTK 的核心结论是：无限宽极限下 NTK 收敛到确定性核并在训练中不变（lazy training），训练动态等价于核回归。网络仍能拟合非线性函数（因核本身是非线性的），收敛速率由核矩阵最小特征值决定。"
```

### Performers

```yaml
id: performers
num: 13
name: Performers
full_name: 核化高效注意力 (Performers / FAVOR+)
year: '2020'
org: Google
parent: rff
paper_url: https://arxiv.org/abs/2009.14794
project_url: ''
category: frontier
motivation: 随机特征近似Softmax注意力，线性复杂度
```

#### 📝 一句话总结
Performers 的核心目标是：随机特征近似Softmax注意力，线性复杂度。

#### 🎯 核心要点
- 核心动机：随机特征近似Softmax注意力，线性复杂度
- 演化来源：继承或改进自 rff
- 代表机构：Google

#### 🔬 深入细节
随机特征近似Softmax注意力，线性复杂度


### Nyström-LSSVM

```yaml
id: nystrom_lssvm
num: 14
name: Nyström-LSSVM
full_name: Nyström加速LS-SVM (Nyström-Accelerated LS-SVM)
year: '2026.01'
org: NeurIPS
parent: lssvm
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/4f2e2aac788230bacd2854df94c0b903-Abstract-Conference.html
project_url: ''
category: classification
motivation: Nyström打破LS-SVM立方复杂度瓶颈
```

#### 📝 一句话总结
Nyström-LSSVM 的核心目标是：Nyström打破LS-SVM立方复杂度瓶颈。

#### 🎯 核心要点
- 核心动机：Nyström打破LS-SVM立方复杂度瓶颈
- 演化来源：继承或改进自 lssvm
- 代表机构：NeurIPS

#### 🔬 深入细节
Nyström打破LS-SVM立方复杂度瓶颈


### Diff-KRR

```yaml
id: diff_krr
num: 15
name: Diff-KRR
full_name: 可微核岭回归 (Differentiable KRR)
year: '2026.05'
org: arXiv
parent: krr
paper_url: https://arxiv.org/abs/2605.02313
project_url: ''
category: frontier
motivation: 可微KRR层嵌入端到端深度学习流水线
```

#### 📝 一句话总结
Diff-KRR 提出了**稀疏核 (Sparse Kernels, SKs)**——一种可微、惰性 (lazy)、局部化的核岭回归变体，将 KRR 作为模块化层嵌入标准深度学习流水线，通过显式暴露特征、目标值和评估点三组参数实现端到端可训练，在迁移学习、网络探测和强化学习中匹配或超越参数化分类头。

#### 🎯 核心要点
- **稀疏核 (Sparse Kernels)** 构造：基于 M-最近邻 (M-NN) 对特征空间进行分区 (tessellation)，在每个局部单元上求解 \(M \times M\) 的小型 KRR 系统，单次查询复杂度 \(O(M^3)\)，总体线性于数据集规模 \(N\)
- **三组参数的统一框架**：特征表示 \(\theta\)、支撑点 \(\theta_x\)、目标值 \(\theta_y\) 可分别固定或学习，涵盖迁移学习（全固定）、探测（部分固定）、混合模型（全可学）等场景
- **惰性推理 (Lazy Inference)**：训练开销推迟到推理阶段，每个预测独立计算，无需全局矩阵求逆
- **两层分析框架**：特征映射 \(f(\cdot, \theta)\) → 核分类器 \(y_k(\cdot, \theta_x, \theta_y)\)，替换传统参数化分类头
- **插值体制 (Interpolation Regime)**：使用基函数 \(\psi_k(z, x) = k(z, x) k(x,x)^{-1}\)，Tikhonov 正则化趋近于零
- **PyTorch 集成**：梯度 \(\nabla_y y_k, \nabla_x y_k, \nabla_z y_k\) 由核库计算并导出至深度学习后端，保持自动微分兼容
- **实验验证**：在 ResNet-18 迁移学习 (CIFAR-10)、VGG-19/ViT 探测、Double DQN 强化学习中均展示有效性

#### 🔬 深入细节
![Diff-KRR 迁移学习实验结果](https://arxiv.org/html/2605.02313v1/extracted/6516072/figures/cifar10_transfer_learning_accuracy.png)
*图：冻结 ImageNet 预训练 ResNet-18 骨干网络后，四种读出头（线性头、MLP、不连续/连续惰性 KRR）在不同 CIFAR-10 标注样本量下的测试准确率对比。惰性 KRR 无需参数训练即可匹配或超越参数化头。*

```python
# Sparse Kernel (SK) 推理伪代码
def sparse_kernel_predict(z, X_train, Y_train, kernel_fn, M):
    """
    z: 待预测点 (D_f,)
    X_train: 训练特征 (N, D_f)
    Y_train: 训练目标 (N, D_y)
    kernel_fn: 核函数 k(·,·) = φ(d(·,·))
    M: 近邻带宽参数
    """
    # Step 1: M-NN 查找 — 找到 z 的 M 个最近邻
    sigma = find_M_nearest_neighbors(z, X_train, M)  # 索引 (M,)
    X_local = X_train[sigma]  # (M, D_f)
    Y_local = Y_train[sigma]  # (M, D_y)

    # Step 2: 构建局部核矩阵并求解
    K_local = kernel_fn(X_local, X_local)      # (M, M)
    k_eval = kernel_fn(z.unsqueeze(0), X_local) # (1, M)

    # Step 3: 基函数插值 — ψ_k(z, x_σ) = k(z, x_σ) K_local^{-1}
    psi = k_eval @ torch.linalg.inv(K_local)   # (1, M)
    y_pred = psi @ Y_local                      # (1, D_y)
    return y_pred

# 端到端可微训练流程
def train_step(model, kernel_layer, x_batch, y_batch, optimizer):
    features = model.backbone(x_batch)          # 特征映射 f(x, θ)
    y_pred = kernel_layer(features)             # 核分类器 y_k(f(x), θ_x, θ_y)
    loss = cross_entropy(y_pred, y_batch)
    loss.backward()   # 梯度通过 ∇_θ f, ∇_{θ_x} y_k, ∇_{θ_y} y_k 反传
    optimizer.step()
```

**动机与背景：核方法与深度学习的融合困境。** 核岭回归 (KRR) 具有坚实的理论基础——再生核希尔伯特空间 (RKHS) 中的表示定理保证了最优解的存在性与唯一性，且无需迭代训练即可获得闭式解。然而，标准 KRR 的 \(O(N^3)\) 矩阵求逆复杂度使其难以直接嵌入深度学习的小批量优化流程。此前的工作如 Deep Kernel Learning (DKL) 和 KISS-GP 虽然尝试了核-神经网络混合架构，但要么需要额外的变分推断层，要么无法保持端到端可微性。Diff-KRR 的核心动机是：**能否将 KRR 作为一个即插即用的可微层，直接替换深度网络中的参数化分类头，同时保持自动微分的完整性？**

**核心机制：稀疏核的 M-NN 分区与局部插值。** Diff-KRR 的技术核心是稀疏核 (Sparse Kernels) 构造。给定训练集 \(x = (x_1, \ldots, x_N)\)，对于任意评估点 \(z\)，首先通过 M-最近邻查找确定其局部邻域 \(\sigma(z) = (\sigma_1, \ldots, \sigma_M)(z)\)，这一映射在空间上定义了一个分区 (tessellation) \(\{1_{\Omega_\sigma}\}\)。在每个单元 \(\Omega_\sigma\) 上，构建局部再生核希尔伯特空间：

$$H_{k,\sigma} = \left\{ y_k(\cdot) = \psi_k(\cdot, x_\sigma) y_\sigma, \quad y_\sigma \in \mathbb{R}^{M \times D_y} \right\}$$

其中基函数 \(\psi_k(\cdot, x_\sigma) = k(\cdot, x_\sigma) k(x_\sigma, x_\sigma)^{-1}\) 仅涉及 \(M \times M\) 的局部核矩阵求逆。这使得单次预测的复杂度从全局的 \(O(N^3)\) 降至 \(O(M^3)\)，其中 \(M\) 通常取 100 左右，远小于数据集规模 \(N\)。全局函数空间 \(H_k^M\) 通过直和构造将所有局部空间联合起来，参数 \(y \in \mathbb{R}^{N \times D_y}\) 全局定义但仅在各单元内局部作用。该构造的一个重要特性是**惰性 (lazy)**：大部分计算推迟到推理时完成，每个预测相互独立，天然适合并行化。

> 💡 关键：稀疏核的"稀疏"不是指对数据集采样，而是指每次预测仅使用评估点附近 M 个最近邻构建局部核系统，从而将全局 \(O(N^3)\) 问题分解为大量独立的 \(O(M^3)\) 局部问题。

**两层模型与三组参数的灵活配置。** 论文将深度网络形式化为两层结构：特征映射 \(f(\cdot, \theta): \mathbb{R}^{D_x} \to \mathbb{R}^{D_f}\) 和分类器 \(y(\cdot, \theta_y): \mathbb{R}^{D_f} \to \mathbb{R}^{D_y}\)。将分类器替换为核岭回归器后，完整模型变为 \(y_\theta(\cdot, \theta_x, \theta_y) = y_k(f(\cdot, \theta), \theta_x, \theta_y)\)，其中 \(y_k(\cdot, \theta_x, \theta_y) = k(\cdot, \theta_x) k(\theta_x, \theta_x)^{-1} \theta_y\)。这引入了三组可独立配置的参数：(1) 骨干网络参数 \(\theta\) 控制特征提取；(2) 支撑点 \(\theta_x\) 可设为传播后的训练点 \(x_\theta = f(x, \theta)\) 或作为可学习参数；(3) 目标值 \(\theta_y\) 可使用真实标签 \(y\) 或作为可学习参数。这种灵活性使同一框架覆盖多种场景：**迁移学习**时 \(\theta\) 冻结、\(\theta_x = x_\theta\)、\(\theta_y = y\)（完全无需训练）；**探测 (probing)** 时固定骨干但学习核参数；**混合模型**时三组参数全部可学。核库提供 \(\nabla_y y_k, \nabla_x y_k, \nabla_z y_k\) 三个方向的梯度，通过 PyTorch 自动微分引擎实现端到端反向传播。

**实验验证与关键发现。** 论文在三个场景中验证了稀疏核的有效性。(1) **迁移学习**：在冻结的 ImageNet 预训练 ResNet-18 上，惰性 KRR 读出头（\(M=100\)）在 CIFAR-10 上无需任何参数训练即达到与线性头和 MLP 相当甚至更优的准确率，证明了非参数方法可有效利用预训练特征的几何结构。(2) **网络探测**：对 VGG-19 和 ViT 的逐层探测发现，中间层表示比最终层更适合核读出——最终层过度特化于原始参数化分类头，丢失了对替代任务有用的信息。这一发现对迁移学习的层选择策略具有实践指导意义。(3) **强化学习**：在 Double DQN 的 LunarLander 环境中，通过在第一层和最后一层添加核扰动项 \(P_{k}(x, y)(s)\)，核增强智能体 (DQK_Agent) 比基线更快达到更高奖励，展示了核模块作为神经网络"即插即用"增强组件的潜力。

> ⚠️ 注意：当前实验仅在 CPU 单机上运行，使用 CIFAR-10 和 LunarLander 等小规模基准。论文尚未在 ImageNet 规模、大语言模型或扩散模型上验证。此外，默认的不连续稀疏构造在单元边界处可能产生不连续性，对需要平滑预测的下游任务（如基于梯度的优化）可能需要采用附录中描述的连续变体。

**与传统方法的对比。** 相比标准 KRR 的 \(O(N^3 + N^2 D_y)\) 全局求解，稀疏核将复杂度降至 \(O(N \cdot M^3)\)（线性于 \(N\)）。相比 Deep Kernel Learning (DKL) 需要高斯过程的变分推断，Diff-KRR 直接使用闭式核插值，无需额外的近似层。相比 KISS-GP 的结构化诱导点方法，稀疏核基于数据驱动的 M-NN 分区，自适应于特征空间的局部密度。相比线性探测 (linear probing) 等标准迁移学习方法，核读出提供了非参数的非线性适应能力，且在小样本场景下优势更为显著。

#### 🧪 练习题
```yaml
question: "Diff-KRR 中稀疏核 (Sparse Kernels) 实现计算加速的核心机制是什么？"
options:
  - "对训练数据进行随机采样，减少参与计算的样本数量"
  - "使用低秩近似分解全局核矩阵"
  - "基于 M-最近邻分区，在每个局部单元上求解 M×M 的小型核系统"
  - "用神经网络近似核函数，避免核矩阵的显式计算"
answer: 2
explain: "稀疏核通过 M-NN 将特征空间分区为局部单元，每次预测仅在评估点的 M 个最近邻上构建 M×M 核矩阵并求逆，将单次查询复杂度从 O(N³) 降至 O(M³)，而非采样或低秩近似。"
```

### TopoNTK

```yaml
id: topo_ntk
num: 16
name: TopoNTK
full_name: 拓扑神经正切核 (Topological NTK)
year: '2026.05'
org: arXiv
parent: ntk
paper_url: https://arxiv.org/abs/2605.01110
project_url: ''
category: frontier
motivation: NTK扩展到单纯复形与拓扑深度学习
```

#### 📝 一句话总结
TopoNTK 将无限宽度神经切线核从图推广到单纯复形，通过 Hodge 消息传递算子（融合下/上 Hodge Laplacian）在边特征上递归构建核矩阵，从而捕获三角形等高阶拓扑结构，并提供基于 Hodge 分解的谱学习动力学分析。

#### 🎯 核心要点
- **核心架构**：在边（1-单纯形）上定义 Hodge 消息传递网络，传播算子 \(P = \gamma I + \alpha L_\downarrow + \beta L_\uparrow\) 融合残差、共享顶点（下邻接）和填充三角形（上邻接）三个通道
- **NTK 递归**：协方差 \(\Sigma^{(\ell+1)} = P_X \Phi(\Sigma^{(\ell)}) P_Y^\top\)，切线核 \(\Theta^{(\ell+1)} = \Theta^{(\ell)} \odot \dot\Phi(\Sigma^{(\ell)}) + \Sigma^{(\ell+1)}\) 逐层累积
- **表达力分离**（Proposition 1）：TopoNTK 对三角形填充敏感，而图 NTK 在固定 1-骨架上不变——高阶结构带来严格表达力增益
- **Hodge 保持性**（Proposition 2）：传播算子保持 Hodge 分解 \(C_1 = \mathcal{E} \oplus \mathcal{H} \oplus \mathcal{C}\)（精确/调和/余精确），\(L_\uparrow\) 仅作用于余精确分量，\(L_\downarrow\) 仅作用于精确分量
- **谱学习动力学**（Theorem 1）：核梯度流下各本征模独立学习，速率由对应核特征值 \(\kappa_j\) 决定
- **稳定性**（Theorem 2）：固定 1-骨架下三角形扰动引起的核变化 Lipschitz 连续，预测误差以 \(O(\|L_\uparrow - L'_\uparrow\| / \lambda)\) 缩放
- **实验验证**：合成任务（三角形检测、Hodge 分量恢复、谱偏差、稳定性）+ DBLP 高阶链接预测

#### 🔬 深入细节
##### 示意图

![TopoNTK 框架总览](https://arxiv.org/html/2605.01110v1/x1.png)
*图：TopoNTK 框架。左：单纯复形上的边信号与 Hodge Laplacian；中：Hodge 消息传递层结构；右：NTK 递归与谱分析。*

##### 算法伪代码

```python
# TopoNTK 核矩阵计算伪代码
def compute_topo_ntk(X, Y, L, gamma, alpha, beta):
    """
    X, Y: 两个单纯复形
    L: 网络深度
    gamma, alpha, beta: Hodge 传播参数
    """
    # 构建传播算子
    P_X = gamma * I + alpha * L_down(X) + beta * L_up(X)
    P_Y = gamma * I + alpha * L_down(Y) + beta * L_up(Y)
    
    # 初始化：边特征协方差
    Sigma = sigma_w^2 * P_X @ P_Y.T + sigma_b^2  # Σ^(0)
    Theta = Sigma.copy()  # Θ^(0)
    
    for ell in range(1, L+1):
        # 激活函数协方差映射 (ReLU arc-cosine kernel)
        Phi_Sigma = activation_covariance(Sigma)      # Φ(Σ^(ℓ-1))
        Phi_dot_Sigma = activation_derivative_cov(Sigma)  # Φ̇(Σ^(ℓ-1))
        
        # 协方差递归
        Sigma_new = sigma_w^2 * P_X @ Phi_Sigma @ P_Y.T + sigma_b^2
        
        # 切线核递归
        Theta = Theta * Phi_dot_Sigma + Sigma_new
        
        # 传播
        Theta = P_X @ Theta @ P_Y.T
        Sigma = Sigma_new
    
    return Theta  # 最终 TopoNTK 矩阵 K(X, Y)
```

##### 方法详解

**1. 动机与背景**

传统图神经网络（GNN）及其对应的 Graph NTK 仅建模节点间的成对关系，无法捕获高阶拓扑结构。例如，三个人两两合作（三角形）与三个人仅两两认识（开放三元组）在图上不可区分，但在社交网络、协作网络中具有本质不同的语义。单纯复形（Simplicial Complex）通过 \(k\)-单纯形显式编码这种高阶关系，而 Hodge Laplacian 提供了在这些结构上进行信号处理的数学工具。

> 💡 关键：TopoNTK 的核心洞察是——将 NTK 的无限宽度分析从图扩展到单纯复形，可以获得一个**封闭形式的、可解释的核**，它同时具备高阶拓扑感知能力和 NTK 的理论优势（确定性、谱可分析性）。

**2. 单纯复形与 Hodge Laplacian**

给定一个单纯复形 \(X\)，其 1-阶 Hodge Laplacian 定义为：

$$L_1 = L_\downarrow + L_\uparrow = B_1^\top B_1 + B_2 B_2^\top$$

其中 \(B_1\) 是节点-边关联矩阵（\(|V| \times |E|\)），\(B_2\) 是边-三角形关联矩阵（\(|E| \times |T|\)）。

- **下 Laplacian** \(L_\downarrow = B_1^\top B_1\)：编码共享顶点的边之间的邻接关系
- **上 Laplacian** \(L_\uparrow = B_2 B_2^\top\)：编码共同参与三角形的边之间的邻接关系

Hodge 分解将边信号空间分解为三个正交子空间：

$$C_1(X) = \underbrace{\text{im}(B_1^\top)}_{\mathcal{E}\text{ (精确)}} \oplus \underbrace{\ker(L_1)}_{\mathcal{H}\text{ (调和)}} \oplus \underbrace{\text{im}(B_2)}_{\mathcal{C}\text{ (余精确)}}$$

> ⚠️ 注意：调和分量 \(\mathcal{H}\) 的维数等于第一 Betti 数 \(\beta_1\)，即单纯复形中独立环路的数量——这是纯粹的拓扑不变量。

**3. Hodge 消息传递与传播算子**

TopoNTK 的核心构建块是 Hodge 消息传递层。对于边特征 \(h \in \mathbb{R}^{|E|}\)，单层传播为：

$$h^{(\ell+1)} = \sigma\left(P \cdot h^{(\ell)} \cdot W^{(\ell)}\right), \quad P = \gamma I + \alpha L_\downarrow + \beta L_\uparrow$$

三个通道的物理含义：
- \(\gamma I\)（残差通道）：保留自身边特征，确保调和分量不被消除
- \(\alpha L_\downarrow\)（下通道）：聚合共享端点的邻居边信息
- \(\beta L_\uparrow\)（上通道）：聚合共同参与三角形的邻居边信息

**4. NTK 递归构建**

在无限宽度极限下，网络参数随机初始化后的核函数收敛到确定性 TopoNTK。对于两个单纯复形 \(X, Y\)，核递归为：

$$\Sigma^{(\ell+1)}(X, Y) = \sigma_w^2 \cdot P_X \cdot \Phi\left(\Sigma^{(\ell)}(X, Y)\right) \cdot P_Y^\top + \sigma_b^2$$

$$\Theta^{(\ell+1)}(X, Y) = P_X \left[\Theta^{(\ell)} \odot \dot\Phi\left(\Sigma^{(\ell)}\right)\right] P_Y^\top + \Sigma^{(\ell+1)}$$

其中 \(\Phi\) 是 ReLU 激活对应的 arc-cosine 核映射：

$$\Phi(\Sigma) = \frac{1}{2\pi}\left(\sqrt{\text{diag}(\Sigma)\text{diag}(\Sigma)^\top - \Sigma^2} + \Sigma \cdot (\pi - \arccos(\hat\Sigma))\right)$$

最终 TopoNTK 矩阵 \(K(X, Y) = \Theta^{(L)}(X, Y)\) 是一个 \(|E_X| \times |E_Y|\) 的矩阵。

**5. 关键理论性质**

*表达力分离*：考虑两个单纯复形 \(X, X'\) 具有相同的 1-骨架但不同的三角形集合。Graph NTK 对两者给出相同的核矩阵，但 TopoNTK 通过 \(L_\uparrow\) 的差异可以区分它们：

$$K_X \neq K_{X'} \quad \text{当且仅当} \quad L_\uparrow(X) \neq L_\uparrow(X')$$

*Hodge 保持性*：传播算子 \(P\) 保持 Hodge 分解的三个子空间不变。特别地：
- \(L_\uparrow\) 在精确子空间 \(\mathcal{E}\) 上为零
- \(L_\downarrow\) 在余精确子空间 \(\mathcal{C}\) 上为零
- 两者在调和子空间 \(\mathcal{H}\) 上均为零

这意味着下通道专门增强精确分量的学习，上通道专门增强余精确分量的学习。

*谱学习动力学*：在核梯度流下，目标信号 \(y\) 的各本征分量独立指数衰减：

$$f_t = \sum_j (1 - e^{-\kappa_j t}) \langle y, u_j \rangle u_j$$

大特征值 \(\kappa_j\) 对应的模式学习更快，形成谱偏差。实验发现调和模式通常对应较小特征值，意味着全局拓扑结构学习较慢。

**6. 与传统方法的对比**

| 方法 | 信号域 | 高阶感知 | 理论保证 | 可解释性 |
|------|--------|----------|----------|----------|
| Graph NTK | 节点 | ❌ | 收敛+泛化 | 谱分析 |
| GNN (finite) | 节点 | ❌ | 有限 | 有限 |
| MPSN/SNN | 边/面 | ✅ | 无 NTK 分析 | 有限 |
| **TopoNTK** | **边** | **✅** | **收敛+Hodge谱** | **Hodge分解** |

**7. 实验亮点**

- **三角形检测**：在固定 1-骨架上，仅改变三角形填充概率。TopoNTK（含上通道）完美区分，Graph NTK 完全失败
- **Hodge 分量恢复**：下通道 (\(\alpha > 0\)) 改善精确分量恢复，上通道 (\(\beta > 0\)) 改善余精确分量恢复，验证理论预测
- **DBLP 高阶链接预测**：预测三人合著关系（三角形闭合），TopoNTK 的 AUC 达 0.76，显著优于 Graph NTK (0.62) 和随机基线 (0.50)

#### 🧪 练习题
```yaml
question: "TopoNTK 相比 Graph NTK 的核心表达力优势来源于什么？"
options:
  - "使用了更深的网络层数"
  - "通过上 Hodge Laplacian L↑ 编码三角形（2-单纯形）填充信息"
  - "采用了更复杂的激活函数"
  - "在节点特征上使用了注意力机制"
answer: 1
explain: "TopoNTK 的传播算子包含 βL↑ 项，L↑ = B₂B₂ᵀ 编码了哪些边共同参与三角形。Graph NTK 仅有 L↓ 对应的边邻接信息，对固定 1-骨架上的三角形变化完全不敏感。"
```

### LaplacianFormer

```yaml
id: laplacian_former
num: 17
name: LaplacianFormer
full_name: 拉普拉斯核注意力 (LaplacianFormer)
year: '2026.04'
org: arXiv
parent: performers
paper_url: https://arxiv.org/abs/2604.20368
project_url: ''
category: frontier
motivation: Nyström加速拉普拉斯核实现线性注意力
```

#### 📝 一句话总结
LaplacianFormer 提出以拉普拉斯核（基于 \(\ell_1\) 距离）替代高斯核作为注意力相似度度量，并结合可证明单射的白化特征映射、Nyström 低秩近似和 Newton–Schulz 迭代求逆，实现了线性复杂度的高表达力注意力机制，在 ImageNet 分类任务上取得 SOTA 性能。

#### 🎯 核心要点
- **拉普拉斯核替代高斯核**：使用 \(k(\mathbf{q},\mathbf{k})=\exp(-\|\mathbf{q}-\mathbf{k}\|_1/\lambda)\) 作为注意力相似度，避免 \(\ell_2^2\) 距离的重尾分布导致的注意力过度抑制
- **可证明单射的特征映射**：通过对角白化（centering + scaling）构造归一化核表示 \(\mathbf{z}_i\)，保证不同 query 产生不同输出，保持注意力矩阵满秩
- **Nyström 低秩近似**：选取 \(m \ll N\) 个 landmark token，将 \(O(N^2)\) 核矩阵近似为 \(\mathbf{C}\mathbf{W}^\dagger\mathbf{C}^\top\)，实现线性复杂度
- **Newton–Schulz 迭代**：仅用矩阵乘法和加法近似 \(\mathbf{W}^\dagger\)，避免 SVD/矩阵求逆，天然适合 GPU 并行
- **深度可分离卷积（DWC）**：补充局部上下文建模，最终注意力输出为 \(\mathbf{Z}\mathbf{V} + \text{DWC}(\mathbf{V})\)
- **自定义 CUDA 核**：融合距离计算与指数变换、优化 Newton–Schulz 矩阵乘法，实现高吞吐前向/反向传播
- **基于 PVT 架构**：金字塔式多尺度设计，配合 RoPE 位置编码
- **ImageNet-1K 全 FLOPs 区间 SOTA**：Tiny 81.4%、Small 83.8%、Medium 85.3%、Large 85.6%、Huge 85.8%

#### 🔬 深入细节
![LaplacianFormer 架构总览](https://arxiv.org/html/2604.20368v1/x4.png)
*图：LaplacianFormer 整体架构。基于 PVT 金字塔结构，在每个 stage 中使用拉普拉斯核注意力模块替代标准 softmax 注意力。*

![L1 vs L2 距离分布](https://arxiv.org/html/2604.20368v1/x1.png)
*图：DeiT/PVT/Swin 中 Q-K 的 \(\ell_1\) 与 \(\ell_2^2\) 距离分布对比。\(\ell_2^2\) 呈重尾分布，经指数函数后导致注意力过度抑制中等相关 token；\(\ell_1\) 更集中、对异常值更鲁棒。*

##### 算法伪代码

```python
# LaplacianFormer 注意力计算核心流程
def laplacian_attention(Q, K, V, lambda_, m, T):
    """
    Q, K, V: [N, d] 查询、键、值矩阵
    lambda_: 拉普拉斯核带宽参数
    m: Nyström landmark 数量
    T: Newton-Schulz 迭代次数
    """
    # Step 1: Nyström landmark 采样 (average pooling)
    Q_tilde, K_tilde = avg_pool(Q, m), avg_pool(K, m)  # [m, d]
    
    # Step 2: 计算 landmark 核矩阵 W ∈ R^{m×m}
    W = exp(-||Q_tilde ⊖ K_tilde||_1 / lambda_)
    
    # Step 3: 计算 cross-kernel C ∈ R^{N×m}
    C = exp(-||Q ⊖ K_tilde||_1 / lambda_)
    
    # Step 4: Newton-Schulz 迭代求 W^†
    W = W + eps * I  # 正则化确保正定
    alpha = 2 / spectral_norm(W)
    X = alpha * W.T
    for k in range(T):
        X = X @ (2*I - W @ X)
    W_inv = X  # ≈ W^†
    
    # Step 5: Nyström 近似注意力矩阵
    G_hat = C @ W_inv @ C.T  # [N, N]
    
    # Step 6: 对角白化 (injective feature map)
    mu = G_hat.mean(dim=0)
    sigma = G_hat.std(dim=0)
    Z = (G_hat - mu) / (sigma + eps) + 1/N
    
    # Step 7: 输出 = 全局核注意力 + 局部 DWC
    output = Z @ V + DWC(V)
    return output
```

##### 动机与背景

传统线性注意力方法（如 Performer、Skyformer、SOFT++）普遍采用**高斯核** \(k(\mathbf{q},\mathbf{k})=\exp(-\|\mathbf{q}-\mathbf{k}\|_2^2/2\sigma^2)\) 来近似 softmax 注意力。然而，作者通过对 DeiT、PVT、Swin 等主流 ViT 的实证分析发现：

1. **\(\ell_2^2\) 距离呈重尾分布**：Q-K 之间的平方欧氏距离方差大、存在大量异常值。经指数函数映射后，这些异常值主导注意力图，而中等相关的 token 被过度抑制。
2. **\(\ell_1\) 距离更集中**：曼哈顿距离对异常值更鲁棒，分布更紧凑，能更忠实地反映 token 间的相关性。
3. **梯度行为差异**：拉普拉斯核的梯度 \(\partial k/\partial x_i = (1/\lambda)\cdot\text{sign}(x_i-y_i)\cdot k\) 即使在 \(\mathbf{x}\approx\mathbf{y}\) 时也不消失（因 \(\ell_1\) 的分段线性性质），而高斯核梯度在距离趋零时线性消失，导致训练早期梯度消失问题。

> 💡 关键：拉普拉斯核的"慢衰减"特性保留了中等距离 token 对的注意力权重，提升了注意力矩阵的有效秩和表达力。

##### 核心机制：单射白化特征映射

直接使用核矩阵作为注意力权重会导致低秩退化（所有 query 得到相似的注意力分布）。为此，LaplacianFormer 构造了**可证明单射**的归一化核表示：

$$\mathbf{z}_i = \mathbf{\Sigma}^{-1/2}\left(\left[k(\mathbf{q}_i,\mathbf{k}_1),\dots,k(\mathbf{q}_i,\mathbf{k}_N)\right]^\top - \frac{1}{N}\sum_{j=1}^N k(\mathbf{q}_i,\mathbf{k}_j)\right) + \frac{1}{N}$$

其中 \(\mathbf{\Sigma}^{-1/2}\) 是白化矩阵。直觉上，这一操作：
- **中心化**：减去均值，消除核值的全局偏移
- **白化/缩放**：除以标准差，使各维度方差一致，避免某些维度主导

由于完整白化矩阵计算需要 \(O(N^3)\)，论文采用**对角近似**：

$$\mathbf{D}^{-1/2} = \text{diag}\left(\frac{1}{\sqrt{\sigma_1^2+\varepsilon}},\dots,\frac{1}{\sqrt{\sigma_N^2+\varepsilon}}\right)$$

这将复杂度降至 \(O(N)\)，同时保持了单射性保证——不同的 query 必然产生不同的注意力分布。

> ⚠️ 注意：单射性是 softmax 注意力的固有属性（softmax 天然满秩），而核方法的低秩近似通常会破坏这一性质。白化映射正是为了恢复这一关键特性。

##### Nyström 近似与 Newton–Schulz 求逆

**Nyström 方法**将 \(N \times N\) 核矩阵分解为低秩形式：

$$\widetilde{\mathbf{G}} = \mathbf{C}\mathbf{W}^\dagger\mathbf{C}^\top$$

其中：
- \(\mathbf{C} \in \mathbb{R}^{N \times m}\)：所有 query 与 \(m\) 个 landmark key 之间的核相似度
- \(\mathbf{W} \in \mathbb{R}^{m \times m}\)：landmark 之间的核矩阵
- Landmark 选取策略：对 query/key 张量做 average pooling（kernel size = \(r\)，stride = \(r\)），将 \(r \times r\) 区域聚合为一个 landmark token

**Newton–Schulz 迭代**用于近似 \(\mathbf{W}^\dagger\)：

$$\mathbf{X}_{k+1} = \mathbf{X}_k(2\mathbf{I} - \mathbf{W}\mathbf{X}_k)$$

初始化 \(\mathbf{X}_0 = \alpha\mathbf{W}^\top\)，其中 \(\alpha = 2/\|\mathbf{W}\|_2\) 确保收敛。该方法的优势：
- 仅需矩阵乘法和加法，无需 SVD 或 LU 分解
- 天然适合 GPU 并行，可通过 tiling 和寄存器复用进一步优化
- 对称正定矩阵上保证收敛（通过小扰动 \(\mathbf{W} \leftarrow \mathbf{W} + \epsilon\mathbf{I}\) 确保正定性）

##### 与传统方法的对比

| 方法 | 核函数 | 复杂度 | 求逆方式 | 单射性 |
|------|--------|--------|----------|--------|
| Softmax Attention | \(\exp(\mathbf{q}^\top\mathbf{k}/\sqrt{d})\) | \(O(N^2)\) | — | ✓ |
| Performer | 随机特征近似 | \(O(N)\) | — | ✗ |
| Nyströmformer | 高斯核 + Nyström | \(O(Nm)\) | SVD | ✗ |
| SOFT++ | 高斯核 + Nyström | \(O(Nm)\) | 矩阵求逆 | ✗ |
| **LaplacianFormer** | **拉普拉斯核 + Nyström** | **\(O(Nm)\)** | **Newton–Schulz** | **✓** |

LaplacianFormer 的关键优势在于：(1) 拉普拉斯核更适合 ViT 中 Q-K 距离的实际分布；(2) 白化映射恢复了单射性；(3) Newton–Schulz 迭代比 SVD 更 GPU 友好且可微。

##### CUDA 加速实现

论文实现了两个自定义 CUDA 核：
1. **拉普拉斯核计算**：将 L1 距离计算与指数变换融合为单一操作，减少全局内存访问
2. **Newton–Schulz 迭代**：通过 tiling 和寄存器复用优化矩阵乘法

实测在反向传播中加速尤为显著（得益于预计算梯度和 in-place 内存复用），前向传播执行时间 < 0.05ms。

#### 🧪 练习题
```yaml
question: "LaplacianFormer 选择拉普拉斯核而非高斯核的主要理由是什么？"
options:
  - "拉普拉斯核的计算复杂度更低"
  - "ViT 中 Q-K 的 L1 距离分布更集中，高斯核基于 L2² 距离会过度抑制中等相关 token"
  - "拉普拉斯核可以直接分解为低秩形式"
  - "拉普拉斯核不需要归一化处理"
answer: 1
explain: "实证分析表明 ViT 中 Q-K 的 ℓ₂² 距离呈重尾分布，经高斯核指数映射后异常值主导注意力图、中等相关 token 被过度抑制；而 ℓ₁ 距离更集中且梯度不消失，拉普拉斯核能保留更丰富的 token 交互。"
```

### xKV

```yaml
id: xkv
num: 18
name: xKV
full_name: '核对齐KV缓存压缩 (xKV: CKA for KV-Cache)'
year: '2026.05'
org: Sakana AI
parent: ntk
paper_url: https://icml.cc/virtual/2026/papers.html
project_url: ''
category: frontier
motivation: CKA识别跨层对齐，压缩LLM推理缓存
```

#### 📝 一句话总结
xKV 的核心目标是：CKA识别跨层对齐，压缩LLM推理缓存。

#### 🎯 核心要点
- 核心动机：CKA识别跨层对齐，压缩LLM推理缓存
- 演化来源：继承或改进自 ntk
- 代表机构：Sakana AI

#### 🔬 深入细节
CKA识别跨层对齐，压缩LLM推理缓存
