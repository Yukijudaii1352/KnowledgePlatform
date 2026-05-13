### NOTEARS (DAGs with NO TEARS)

```yaml
id: notears
name: NOTEARS
full_name: NOTEARS (DAGs with NO TEARS)
year: '2018'
org: 卡内基梅隆大学
paper_url: https://arxiv.org/abs/1803.01422
category: causal_inference
parent: scm
motivation: 将DAG约束转化为连续可微函数
```

#### 📝 一句话总结

NOTEARS 提出了一种全新的连续优化方法来学习有向无环图（DAG）结构：通过矩阵指数的迹函数 \(h(W) = \text{tr}(e^{W \circ W}) - d\) 将组合式的无环约束转化为光滑等式约束，从而将传统的 NP-hard 组合搜索问题转化为标准的连续约束优化问题，可直接使用 L-BFGS 等数值优化器求解。

#### 🎯 核心要点

- **无环性的连续刻画**：提出 \(h(W) = \text{tr}(e^{W \circ W}) - d = 0\) 作为 DAG 的充要条件，将离散的无环约束转化为光滑可微的等式约束
- **连续优化框架**：将结构学习从组合搜索空间转移到实数矩阵空间 \(\mathbb{R}^{d \times d}\)，使用增广拉格朗日方法（Augmented Lagrangian）求解
- **评分函数**：采用最小二乘损失 \(F(W) = \frac{1}{2n}\|X - XW\|_F^2\) 作为评分函数，支持 \(\ell_1\) 正则化实现稀疏性
- **矩阵指数与闭合游走**：利用矩阵幂的迹与图中闭合游走数量的关系，通过矩阵指数重新加权实现数值稳定的无环性判定
- **极简实现**：整个算法仅需约 50 行 Python 代码，无需图模型领域知识
- **无结构假设**：不要求图具有有界树宽或有界入度等结构限制，适用于一般 DAG
- **实验验证**：在 ER 和 SF 随机图上，多种噪声模型下（Gaussian、Exponential、Gumbel），SHD 指标显著优于 FGS（GES 的快速实现）

#### 🔬 深入细节

##### 问题背景与动机

从观测数据中学习有向无环图（DAG）的结构是机器学习和因果推断中的核心问题。DAG（也称贝叶斯网络）广泛应用于生物学、遗传学和因果推断等领域。然而，DAG 结构学习是一个 NP-hard 问题，其核心困难在于：

1. **搜索空间超指数增长**：\(d\) 个节点的 DAG 数量随 \(d\) 超指数增长（例如 5 个节点有 29281 个 DAG）
2. **无环约束的组合性**：传统方法必须在离散的 DAG 空间中搜索，依赖各种局部启发式策略（如贪心搜索、爬山法）来强制满足无环性

传统的基于评分的方法（如 GES、Hill-Climbing）在离散空间中进行贪心搜索，面临局部最优和可扩展性问题。基于约束的方法（如 PC 算法）通过条件独立性检验推断图结构，但对检验误差敏感。NOTEARS 的核心动机是：**能否将离散的无环约束转化为连续可微的约束，从而利用成熟的连续优化工具？**

##### 核心示意图

![NOTEARS 结构学习示例](https://ar5iv.labs.arxiv.org/html/1803.01422v6/assets/x1.png)
*图：NOTEARS 在 ER-2 随机图上的结构学习结果。(a) 真实图结构；(b) n=1000 样本时的估计结果，权重矩阵与真实值高度一致。*

##### 算法伪代码

```python
# NOTEARS 算法核心流程
# 输入: 数据矩阵 X ∈ R^{n×d}, 初始 W_0, α_0, 进度率 c, 容差 ε, 阈值 ω
# 输出: 估计的 DAG 邻接矩阵 W_hat

def notears(X, lambda1=0.1, max_iter=100, h_tol=1e-8, w_threshold=0.3):
    d = X.shape[1]
    W = np.zeros((d, d))          # 初始化权重矩阵
    alpha = 0.0                    # 拉格朗日乘子
    rho = 1.0                      # 惩罚参数

    for t in range(max_iter):
        # Step (a): 求解原始子问题 — 最小化增广拉格朗日函数
        # L^ρ(W, α) = F(W) + (ρ/2)|h(W)|² + α·h(W)
        W_new = minimize(augmented_lagrangian, W, args=(X, alpha, rho))

        # 确保 h(W) 充分下降: h(W_new) < c * h(W_old)
        while h(W_new) >= c * h(W):
            rho *= 10              # 增大惩罚参数
            W_new = minimize(augmented_lagrangian, W, args=(X, alpha, rho))

        # Step (b): 对偶上升 — 更新拉格朗日乘子
        alpha = alpha + rho * h(W_new)

        # Step (c): 收敛判断
        W = W_new
        if h(W) < h_tol:
            break

    # Step 3: 阈值化 — 去除小权重边
    W_hat = W * (np.abs(W) > w_threshold)
    return W_hat

def h(W):
    """无环性约束: h(W) = tr(e^{W∘W}) - d"""
    return np.trace(scipy.linalg.expm(W * W)) - W.shape[0]

def F(W, X):
    """最小二乘评分函数"""
    n = X.shape[0]
    R = X - X @ W
    return 0.5 / n * np.sum(R ** 2)
```

##### 方法细节深入解析

**1. 无环性的连续刻画 — 从离散到连续的关键突破**

NOTEARS 的核心贡献是发现了一个光滑函数 \(h: \mathbb{R}^{d \times d} \to \mathbb{R}\)，其零水平集恰好对应所有 DAG。推导过程分两步：

**第一步：二值邻接矩阵的情形。** 对于二值矩阵 \(B \in \{0,1\}^{d \times d}\)，矩阵幂 \(B^k\) 的迹 \(\text{tr}(B^k)\) 恰好等于图中长度为 \(k\) 的闭合游走数量。因此，图无环当且仅当所有长度的闭合游走数为零：

$$\text{tr}(B^k) = 0, \quad \forall k = 1, 2, \ldots, d$$

利用矩阵指数的定义 \(e^B = \sum_{k=0}^{\infty} \frac{B^k}{k!}\)，可以将上述无穷多个条件压缩为一个等式：

$$h(B) = \text{tr}(e^B) - d = 0$$

> 💡 **直觉**：矩阵指数 \(e^B\) 对各阶闭合游走数按 \(1/k!\) 重新加权求和。如果图中没有环，则所有 \(\text{tr}(B^k) = 0\)（\(k \geq 1\)），因此 \(\text{tr}(e^B) = \text{tr}(I) = d\)，即 \(h(B) = 0\)。反之，任何环都会使 \(h(B) > 0\)。

**第二步：扩展到实值加权矩阵。** 上述刻画对二值矩阵成立，但对含负权重的实值矩阵 \(W\) 不直接适用（负权重可能导致闭合游走贡献相消）。解决方案是使用 Hadamard 积 \(W \circ W\)（逐元素平方），确保所有权重非负：

$$h(W) = \text{tr}(e^{W \circ W}) - d = 0$$

> ⚠️ **关键性质**：\(h(W) \geq 0\) 对所有 \(W\) 成立，且 \(h(W) = 0\) 当且仅当 \(W\) 对应的图是 DAG。这意味着 DAG 集合恰好是 \(h\) 的全局最小值点集。

其梯度具有简洁的解析形式：

$$\nabla h(W) = (e^{W \circ W})^T \circ 2W$$

计算复杂度为 \(O(d^3)\)，与矩阵指数运算相同，可利用成熟的数值库（如 `scipy.linalg.expm`）高效计算。

**2. 评分函数与优化目标**

对于线性结构方程模型（SEM）\(X = W^T X + z\)，其中 \(z\) 是噪声向量，NOTEARS 采用最小二乘评分函数：

$$F(W) = \frac{1}{2n} \|X - XW\|_F^2$$

加入 \(\ell_1\) 正则化以促进稀疏性后，完整的等式约束优化问题（ECP）为：

$$\min_{W \in \mathbb{R}^{d \times d}} \frac{1}{2n} \|X - XW\|_F^2 + \lambda \|W\|_1 \quad \text{subject to} \quad h(W) = 0$$

> 💡 **与无向图模型的类比**：无向图的结构学习可通过 log-det 规划（凸优化）高效求解，这一连续化思路催生了 Graphical Lasso 等一系列突破。NOTEARS 将类似的连续化思想引入有向图，但由于无环约束的非凸性，问题本质上是非凸的。

**3. 增广拉格朗日求解框架**

NOTEARS 使用增广拉格朗日方法将等式约束问题转化为一系列无约束子问题。增广拉格朗日函数定义为：

$$L^{\rho}(W, \alpha) = F(W) + \frac{\rho}{2} |h(W)|^2 + \alpha \cdot h(W)$$

其中 \(\alpha\) 是拉格朗日乘子，\(\rho > 0\) 是二次惩罚参数。算法交替执行：

- **原始最小化**：固定 \(\alpha\)，用 L-BFGS 求解 \(\min_W L^{\rho}(W, \alpha)\)
- **对偶上升**：更新 \(\alpha \leftarrow \alpha + \rho \cdot h(W)\)
- **进度控制**：要求每步 \(h(W_{t+1}) < c \cdot h(W_t)\)，若不满足则增大 \(\rho\)

增广拉格朗日方法的优势在于：不需要将惩罚参数 \(\rho\) 推到无穷大即可获得约束问题的良好近似解。实验中通常只需不到 10 步外层迭代即可收敛。

**4. 与传统方法的关键区别**

| 特性 | 传统方法（GES/PC） | NOTEARS |
|------|-------------------|---------|
| 搜索空间 | 离散 DAG 空间 | 连续实数矩阵空间 \(\mathbb{R}^{d \times d}\) |
| 无环约束 | 局部启发式检查 | 全局光滑等式约束 \(h(W)=0\) |
| 优化方法 | 贪心搜索/条件独立检验 | L-BFGS + 增广拉格朗日 |
| 结构假设 | 部分方法需有界树宽/入度 | 无需任何结构假设 |
| 输出 | CPDAG（等价类） | 加权邻接矩阵（含权重） |
| 实现复杂度 | 需要图搜索专用代码 | ~50 行 Python，调用标准优化库 |

> 💡 **核心优势**：NOTEARS 将 DAG 学习从"图搜索问题"转变为"数值优化问题"，使得整个机器学习和数值优化社区的工具和理论都可以直接应用。

#### 🧪 练习题

```yaml
question: "NOTEARS 中无环性约束 h(W) = tr(e^{W∘W}) - d = 0 的核心原理是什么？"
options:
  - "矩阵指数的特征值之和等于节点数当且仅当图无环"
  - "矩阵幂的迹计数闭合游走数，矩阵指数将各阶游走按 1/k! 加权求和，无环时恰好等于 d"
  - "Hadamard 积使得负权重变为正权重，从而消除所有环"
  - "矩阵指数的行列式为零当且仅当图中存在环"
answer: 1
explain: "tr(B^k) 等于图中长度为 k 的闭合游走数。矩阵指数 e^B = Σ B^k/k! 将各阶闭合游走按 1/k! 加权求和。无环图中所有 tr(B^k)=0 (k≥1)，故 tr(e^B)=tr(I)=d，即 h=0。Hadamard 积 W∘W 是为了处理负权重，使论证对实值矩阵成立。"
```