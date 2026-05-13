### LS-SVM

```yaml
id: lssvm
name: LS-SVM
full_name: 最小二乘支持向量机 (Least Squares SVM)
year: '1999'
org: KU Leuven
paper_url: https://link.springer.com/article/10.1023/A:1018628609742
category: classification
parent: csvm
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