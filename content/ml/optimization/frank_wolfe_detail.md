### 条件梯度法 (Frank-Wolfe)

```yaml
id: frank_wolfe
name: Frank-Wolfe
full_name: 条件梯度法 (Frank-Wolfe)
year: '1956'
org: Princeton
paper_url: https://onlinelibrary.wiley.com/doi/abs/10.1002/nav.3800030109
category: accelerated
parent: —
motivation: 线性子问题替代投影，投影无关优化
```

#### 📝 一句话总结

Frank-Wolfe 算法（又称条件梯度法）通过在每一步迭代中求解一个线性子问题来替代传统投影操作，实现了对复杂约束集上凸优化问题的高效求解，是投影无关（projection-free）优化方法的奠基之作。

#### 🎯 核心要点

- **投影无关设计**：用线性最小化预言机（Linear Minimization Oracle, LMO）替代欧式投影，避免了对复杂约束集投影的高计算代价
- **线性子问题**：每步仅需求解 \(\min_{s \in \mathcal{C}} \langle s, \nabla f(x_t) \rangle\)，对许多结构化约束集（核范数球、流多面体、矩阵体等）有高效闭式解
- **天然可行性**：迭代点始终为可行点的凸组合，保证全程满足约束
- **稀疏解特性**：当约束集为多面体时，迭代解可表示为顶点的稀疏凸组合，天然产生结构化稀疏解
- **对偶间隙证书**：Frank-Wolfe 间隙 \(g_t = \langle \nabla f(x_t), x_t - s_t \rangle\) 提供可计算的次优性上界，可作为停止准则
- **收敛速率**：对光滑凸函数达到 \(O(1/t)\) 的次线性收敛速率，与投影梯度法相当
- **原始应用场景**：最初为二次规划（Quadratic Programming）设计，后推广至一般凸优化

#### 🔬 深入细节

![Frank-Wolfe 算法几何示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Frank-Wolfe_algorithm_illustration.svg/400px-Frank-Wolfe_algorithm_illustration.svg.png)
*图：Frank-Wolfe 算法的几何直觉。在当前点 \(x_t\) 处线性化目标函数，在约束集 \(\mathcal{C}\) 上求解线性最小化得到顶点 \(s_t\)，然后沿 \(s_t - x_t\) 方向移动。迭代点始终保持在约束集内部。*

##### 算法伪代码

```python
# Frank-Wolfe (Conditional Gradient) Algorithm
# 输入: 凸可微目标 f, 紧凸约束集 C, 初始点 x_0 ∈ C
# 输出: 近似最优解 x_T

def frank_wolfe(f, grad_f, lmo, x0, T):
    """
    f: 目标函数
    grad_f: 梯度函数
    lmo: 线性最小化预言机, lmo(d) = argmin_{s in C} <s, d>
    x0: 初始可行点
    T: 迭代次数
    """
    x = x0
    for t in range(T):
        # Step 1: 计算当前梯度
        g = grad_f(x)
        
        # Step 2: 求解线性子问题 (调用 LMO)
        s = lmo(g)  # s_t = argmin_{s in C} <s, grad_f(x_t)>
        
        # Step 3: 计算 Frank-Wolfe 间隙 (可选, 用作停止准则)
        fw_gap = g @ (x - s)
        if fw_gap < tolerance:
            break
        
        # Step 4: 选择步长
        gamma = 2.0 / (t + 2)  # 经典步长: γ_t = 2/(t+2)
        # 或使用线搜索: gamma = argmin_{γ∈[0,1]} f(x + γ(s - x))
        
        # Step 5: 凸组合更新
        x = x + gamma * (s - x)  # 等价于 x = (1-γ)x + γs
    
    return x
```

##### 动机与背景

1956 年，Marguerite Frank 和 Philip Wolfe 在普林斯顿大学研究二次规划问题时，面临一个核心难题：对于线性约束下的二次目标函数最小化问题

$$\min_{x \in \mathcal{C}} \frac{1}{2} x^\top Q x + c^\top x, \quad \mathcal{C} = \{x : Ax \leq b, x \geq 0\}$$

传统方法（如梯度投影法）需要在每一步将更新后的点投影回约束集 \(\mathcal{C}\)。然而，对于多面体约束集，投影操作本身就是一个二次规划问题，计算代价与原问题相当，形成了"用 QP 解 QP"的循环困境。

Frank 和 Wolfe 的关键洞察是：**既然投影困难，何不用一个更简单的子问题来替代？** 他们观察到，在当前点处对目标函数做一阶 Taylor 展开后，最小化这个线性近似在多面体上的问题就是一个**线性规划（LP）**——而 LP 在当时已有成熟的单纯形法可以高效求解。

> 💡 **关键**：Frank-Wolfe 的核心思想是"以线性子问题的廉价求解替代投影的昂贵计算"，这一思想在约束集结构复杂但线性优化容易的场景中具有决定性优势。

##### 核心机制：线性化与凸组合

**问题设定**

考虑约束凸优化问题：

$$\min_{x \in \mathcal{C}} f(x)$$

其中 \(f\) 是凸且 \(L\)-光滑的（即 \(\nabla f\) 是 \(L\)-Lipschitz 连续的），\(\mathcal{C}\) 是紧凸集。

**Step 1: 线性化目标函数**

在当前迭代点 \(x_t\) 处，将 \(f\) 用一阶 Taylor 展开近似：

$$f(x) \approx f(x_t) + \langle \nabla f(x_t), x - x_t \rangle$$

忽略常数项，最小化线性近似等价于求解：

$$s_t = \arg\min_{s \in \mathcal{C}} \langle \nabla f(x_t), s \rangle$$

这就是**线性最小化预言机（LMO）**。对于不同的约束集，LMO 有不同的高效实现：

| 约束集 \(\mathcal{C}\) | LMO 求解方式 | 复杂度 |
|---|---|---|
| 单纯形 \(\Delta_n\) | 选梯度最小分量的标准基向量 | \(O(n)\) |
| \(\ell_1\) 球 | 选绝对值最大梯度分量的符号向量 | \(O(n)\) |
| 核范数球 | 计算梯度矩阵的最大奇异向量对 | \(O(mn \min(m,n))\) 或更快 |
| 多面体 | 线性规划（单纯形法） | 多项式时间 |
| 流多面体 | 最短路径算法 | \(O(V + E)\) |

**Step 2: 凸组合更新**

得到 LMO 解 \(s_t\) 后，新迭代点通过凸组合生成：

$$x_{t+1} = (1 - \gamma_t) x_t + \gamma_t s_t$$

其中步长 \(\gamma_t \in [0, 1]\)。由于 \(x_t \in \mathcal{C}\) 且 \(s_t \in \mathcal{C}\)，凸组合保证 \(x_{t+1} \in \mathcal{C}\)——**无需任何投影操作**。

> 💡 **关键**：凸组合更新是 Frank-Wolfe 保持可行性的根本机制。这与投影梯度法"先走出约束集再投影回来"的策略形成鲜明对比。

**Step 3: 步长选择**

经典步长策略为：

$$\gamma_t = \frac{2}{t + 2}, \quad t = 0, 1, 2, \ldots$$

这一递减步长保证了 \(O(1/t)\) 的收敛速率。也可使用精确线搜索：

$$\gamma_t = \arg\min_{\gamma \in [0,1]} f(x_t + \gamma(s_t - x_t))$$

线搜索通常能加速实际收敛，但增加了每步的计算量。

##### 收敛性分析

**定理（Frank-Wolfe 收敛速率）**：设 \(f\) 是凸且 \(L\)-光滑的，\(\mathcal{C}\) 是紧凸集，直径为 \(D = \max_{x,y \in \mathcal{C}} \|x - y\|\)。使用步长 \(\gamma_t = 2/(t+2)\)，Frank-Wolfe 算法满足：

$$f(x_t) - f(x^*) \leq \frac{2LD^2}{t + 2}$$

> ⚠️ **注意**：\(O(1/t)\) 的收敛速率是次线性的，慢于投影梯度法在强凸函数上的线性收敛。这是 Frank-Wolfe 为"投影无关"付出的代价。然而在许多实际场景中，LMO 的低计算代价使得 Frank-Wolfe 的**每单位时间进展**反而更快。

**Frank-Wolfe 对偶间隙**

定义 Frank-Wolfe 间隙：

$$g_t = \max_{s \in \mathcal{C}} \langle \nabla f(x_t), x_t - s \rangle = \langle \nabla f(x_t), x_t - s_t \rangle$$

由凸性可知 \(g_t \geq f(x_t) - f(x^*)\)，因此 \(g_t\) 是次优性的可计算上界，可直接用作停止准则——这是 Frank-Wolfe 相比投影梯度法的一个实用优势。

##### 稀疏性与结构化解

Frank-Wolfe 算法的一个独特优势是其迭代解的**稀疏表示**。由于每步更新都是当前点与约束集顶点的凸组合：

$$x_t = \sum_{i=0}^{t} \alpha_i s_i, \quad \alpha_i \geq 0, \sum_i \alpha_i = 1$$

当 \(\mathcal{C}\) 是多面体时，\(s_i\) 都是顶点。因此经过 \(t\) 步迭代后，\(x_t\) 最多是 \(t+1\) 个顶点的凸组合。这种稀疏结构在以下场景中极为有用：

- **稀疏学习**：\(\ell_1\) 约束下自动产生稀疏解
- **低秩矩阵恢复**：核范数约束下产生低秩解
- **组合优化松弛**：解自然接近整数顶点

##### 与投影梯度法的对比

| 特性 | Frank-Wolfe | 投影梯度下降 |
|------|------------|-------------|
| 每步子问题 | 线性最小化（LMO） | 欧式投影 |
| 可行性保持 | 天然保持（凸组合） | 需显式投影 |
| 解的结构 | 稀疏（顶点组合） | 一般无结构保证 |
| 收敛速率（凸） | \(O(1/t)\) | \(O(1/t)\) |
| 收敛速率（强凸） | \(O(1/t)\) | \(O(\rho^t)\) 线性 |
| 适用场景 | 投影昂贵、LMO 廉价 | 投影廉价（如 \(\ell_2\) 球） |
| 次优性证书 | FW 间隙（免费获得） | 需额外计算 |

> 💡 **关键**：Frank-Wolfe 的优势在约束集结构复杂时最为显著。当投影操作本身就很廉价（如投影到 \(\ell_2\) 球只需归一化）时，投影梯度法通常更优。

##### 现代发展与变体

Frank-Wolfe 算法在 2013 年由 Jaggi 重新引入机器学习社区后焕发新生，催生了大量变体：

- **Away-step Frank-Wolfe**：通过"远离步"加速收敛，强凸情况下可达线性收敛
- **Pairwise Frank-Wolfe**：在活跃顶点间重新分配权重，进一步改善收敛
- **Stochastic Frank-Wolfe**：使用随机梯度估计，适用于大规模机器学习
- **Block-coordinate Frank-Wolfe**：分块更新，适用于结构化高维问题

#### 🧪 练习题

```yaml
question: "Frank-Wolfe 算法相比投影梯度下降法的核心优势是什么？"
options:
  - "在强凸函数上具有更快的线性收敛速率"
  - "每步仅需求解线性子问题，避免了对复杂约束集的投影计算"
  - "不需要计算目标函数的梯度"
  - "能保证找到非凸问题的全局最优解"
answer: 1
explain: "Frank-Wolfe 的核心创新是用线性最小化预言机（LMO）替代投影操作。对于核范数球、流多面体等复杂约束集，投影代价极高而线性优化高效，此时 FW 具有决定性优势。"
```