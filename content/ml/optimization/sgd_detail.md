### 随机梯度下降 (Stochastic Gradient Descent)

```yaml
id: sgd
name: SGD
full_name: 随机梯度下降 (Stochastic Gradient Descent)
year: '1951'
org: Columbia Univ.
paper_url: https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-22/issue-3/A-Stochastic-Approximation-Method/10.1214/aoms/1177729586.full
category: stochastic
parent: gd
motivation: 单样本梯度近似全梯度，大规模优化奠基
```

#### 📝 一句话总结

Robbins 与 Monro 提出了随机近似方法（Stochastic Approximation），证明了在仅能获得含噪声观测的条件下，通过递减步长的迭代更新序列可以收敛到目标值，奠定了随机梯度下降（SGD）的理论基础，使得大规模数据上的在线优化成为可能。

#### 🎯 核心要点

- **随机近似框架**：提出求解 \(M(\theta) = \alpha\) 的迭代方法，其中 \(M(x) = E[Y|x]\) 为未知回归函数，仅可通过含噪声的观测 \(Y_n\) 获取信息
- **核心更新规则**：\(x_{n+1} = x_n - a_n (Y_n - \alpha)\)，用单次含噪观测替代精确函数值进行迭代
- **步长条件（Robbins-Monro 条件）**：要求 \(\sum_{n=1}^{\infty} a_n = \infty\) 且 \(\sum_{n=1}^{\infty} a_n^2 < \infty\)，保证既能到达任意远的目标又能抑制噪声累积
- **收敛性证明**：在单调性条件 \(M(\theta)\) 严格递增（或递减）和有界性条件下，证明 \(x_n \to \theta\)（均方收敛）
- **优化应用**：令 \(M(\theta) = f'(\theta)\)、\(\alpha = 0\)，即得到随机梯度下降——用单样本梯度替代全梯度来寻找极值点
- **计算复杂度革命**：将每步更新从 \(O(N)\)（遍历全部 \(N\) 个样本）降低到 \(O(1)\)（仅需一个样本），使在线学习和大规模优化成为可能

#### 🔬 深入细节

![SGD 与 Batch GD 在损失曲面上的收敛轨迹对比](https://ar5iv.labs.arxiv.org/html/1609.04747/assets/images/contours_evaluation_optimizers_final_frame.png)
*图 1：SGD 的收敛轨迹（蓝色）相比 Batch GD 呈现明显的随机波动特性。噪声使其路径曲折，但也赋予了跳出局部最优的能力。（图源：Ruder, 2016 优化综述）*

##### 算法伪代码

```python
# === Robbins-Monro 随机近似法 ===
# 目标：求解 M(theta) = alpha，其中 M(x) = E[Y|x]
# 仅能观测到含噪声的 Y_n（给定 x_n 时的随机响应）

theta = theta_0  # 初始估计
for n in range(1, max_iter + 1):
    a_n = c / n  # 步长序列，满足 Σa_n=∞, Σa_n²<∞
    Y_n = observe(theta)  # 在 theta 处获得含噪观测，E[Y_n|theta] = M(theta)
    theta = theta - a_n * (Y_n - alpha)  # 核心更新

# === 应用于优化（SGD）===
# 目标：min f(theta)，即求 f'(theta) = 0
# 令 M(theta) = f'(theta), alpha = 0
# Y_n = g(theta, xi_n) 为随机梯度，E[g] = f'(theta)

theta = theta_0
for n in range(1, max_iter + 1):
    a_n = eta / n  # 学习率衰减
    xi_n = sample_data()  # 随机抽取一个样本
    g_n = compute_gradient(theta, xi_n)  # 单样本梯度（f'(theta) 的无偏估计）
    theta = theta - a_n * g_n  # SGD 更新
```

##### 动机与背景

1951 年之前，求解方程 \(M(\theta) = \alpha\) 的标准方法要求精确知道函数 \(M\) 的解析形式，或能够在每个点 \(x\) 处进行大量重复实验以精确估计 \(M(x)\)。Robbins 和 Monro 提出了一个革命性的问题：

> 💡 **关键问题**：如果我们在每个点只能获得一次含噪声的观测 \(Y\)（满足 \(E[Y|x] = M(x)\)），是否仍然能够找到方程的根？

这一问题的肯定回答开创了**随机近似**（Stochastic Approximation）这一全新领域，并直接催生了随机梯度下降方法。

在优化语境下，传统梯度下降要求计算精确梯度 \(\nabla f(\theta) = \frac{1}{N}\sum_{i=1}^N \nabla f_i(\theta)\)，当数据集规模 \(N\) 极大时计算代价不可接受。SGD 的核心洞察是：**单个样本的梯度 \(\nabla f_i(\theta)\) 是全梯度的无偏估计**，因此可以用它来替代全梯度进行参数更新。

##### 核心机制：Robbins-Monro 定理

**问题设定**

设 \(M(x)\) 为定义在实数上的回归函数，满足：
- \(M(\theta) = \alpha\)（\(\theta\) 是我们要找的根）
- 在每个 \(x\) 处，我们只能观测到随机变量 \(Y\)，满足 \(E[Y|x] = M(x)\)

**更新规则**

$$x_{n+1} = x_n - a_n (Y_n - \alpha)$$

其中 \(Y_n\) 是在 \(x = x_n\) 处的一次观测。

**收敛条件**

Robbins-Monro 定理要求以下条件同时成立：

1. **单调性**：\(M(x)\) 在 \(\theta\) 附近严格单调递增（即 \(x < \theta \Rightarrow M(x) < \alpha\)，\(x > \theta \Rightarrow M(x) > \alpha\)）

2. **步长条件**：
$$\sum_{n=1}^{\infty} a_n = \infty, \quad \sum_{n=1}^{\infty} a_n^2 < \infty$$

3. **有界方差**：存在常数 \(C\)，使得 \(E[(Y_n - M(x_n))^2] \leq C\) 对所有 \(n\) 成立

> 💡 **步长条件的直觉解释**：
> - \(\sum a_n = \infty\) 保证步长总和足够大，使得迭代序列能够从任意初始点到达目标 \(\theta\)（"走得够远"）
> - \(\sum a_n^2 < \infty\) 保证步长衰减足够快，使得噪声的累积效应趋于零（"噪声可控"）
> - 典型选择：\(a_n = c/n\)，满足 \(\sum 1/n = \infty\) 且 \(\sum 1/n^2 = \pi^2/6 < \infty\)

**收敛结论**

在上述条件下：
$$x_n \xrightarrow{L^2} \theta, \quad \text{即} \quad E[(x_n - \theta)^2] \to 0 \text{ as } n \to \infty$$

##### 从随机近似到 SGD

将 Robbins-Monro 框架应用于优化问题 \(\min_\theta f(\theta)\)：

| Robbins-Monro 框架 | SGD 优化对应 |
|---|---|
| 回归函数 \(M(x)\) | 梯度函数 \(f'(\theta)\) |
| 目标值 \(\alpha\) | 0（极值点梯度为零） |
| 含噪观测 \(Y_n\) | 单样本梯度 \(g(\theta_n, \xi_n)\) |
| 更新 \(x_{n+1} = x_n - a_n(Y_n - \alpha)\) | 更新 \(\theta_{n+1} = \theta_n - a_n \cdot g(\theta_n, \xi_n)\) |
| 单调性条件 | 凸性条件（\(f''\) > 0） |

SGD 的更新公式为：

$$\theta_{n+1} = \theta_n - \eta_n \cdot \nabla f(\theta_n; \xi_n)$$

其中 \(\nabla f(\theta_n; \xi_n)\) 是基于随机样本 \(\xi_n\) 计算的梯度，满足：

$$E[\nabla f(\theta; \xi)] = \nabla f(\theta) = \frac{1}{N}\sum_{i=1}^N \nabla f_i(\theta)$$

> ⚠️ **注意**：原始 Robbins-Monro 定理要求步长递减（\(a_n \to 0\)），但现代深度学习实践中常使用固定学习率配合学习率调度器。固定学习率的 SGD 不保证收敛到精确最优解，而是收敛到最优解附近的一个邻域，邻域大小与学习率成正比。

##### 与全梯度下降的核心区别

| 特性 | Batch GD | SGD (Robbins-Monro) |
|------|----------|---------------------|
| 每步计算量 | \(O(N)\)，遍历全部数据 | \(O(1)\)，仅需一个样本 |
| 梯度估计 | 精确梯度 \(\nabla f(\theta)\) | 含噪估计 \(g(\theta, \xi)\) |
| 更新方差 | 0 | \(\sigma^2 > 0\)（梯度噪声） |
| 收敛轨迹 | 平滑单调下降 | 随机波动，整体趋势下降 |
| 收敛速率（凸） | \(O(1/T)\) | \(O(1/\sqrt{T})\) |
| 逃逸局部最优 | 困难（确定性轨迹） | 噪声提供隐式正则化 |
| 适用规模 | 小数据集 | 任意规模，支持在线学习 |

> 💡 **关键洞察**：SGD 的"劣势"（梯度噪声）在深度学习中反而成为优势——噪声提供了隐式正则化效果，帮助模型找到更平坦的极小值（flat minima），这些极小值通常具有更好的泛化性能。

##### 历史影响与后续发展

Robbins-Monro 1951 年的工作是随机优化领域的开山之作：

- **1952 年**：Kiefer-Wolfowitz 将随机近似扩展到梯度未知的情况（有限差分估计）
- **1958 年**：Rosenblatt 的感知机学习算法本质上是 SGD 的特例
- **1960s-80s**：SGD 成为自适应信号处理（LMS 算法）的核心
- **1986 年**：Rumelhart 等人将 SGD 与反向传播结合，开启神经网络训练时代
- **2010s 至今**：Mini-batch SGD 及其变体（Momentum、Adam 等）成为深度学习的标准优化器

#### 🧪 练习题

```yaml
question: "Robbins-Monro 随机近似法对步长序列 {a_n} 的要求是什么？"
options:
  - "a_n 必须为常数，即固定学习率"
  - "Σa_n < ∞ 且 Σa_n² < ∞，保证总步长有限"
  - "Σa_n = ∞ 且 Σa_n² < ∞，保证可达性与噪声抑制"
  - "a_n 必须单调递增，以加速收敛"
answer: 2
explain: "Σa_n = ∞ 确保迭代序列能从任意初始点到达目标（可达性），Σa_n² < ∞ 确保噪声累积效应趋于零（噪声抑制）。典型选择如 a_n = c/n 同时满足两个条件。"
```