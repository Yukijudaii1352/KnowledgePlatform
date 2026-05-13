### SVRG — 随机方差缩减梯度

```yaml
id: svrg
name: SVRG
full_name: "随机方差缩减梯度 (Stochastic Variance Reduced Gradient)"
year: "2013"
org: "Rutgers University / Baidu Research"
paper_url: "https://papers.nips.cc/paper/2013/hash/ac1dd209cbcc5e5d1c6e28598e8cbbe8-Abstract.html"
category: "optimization"
parent: "—"
motivation: "通过控制变量技术周期性修正随机梯度，消除方差"
```

#### 📝 一句话总结

SVRG 提出了一种利用控制变量（control variate）技术的随机梯度方法，通过周期性计算全梯度作为基准来修正每步随机梯度的方差，在强凸条件下实现线性收敛速率，且无需像 SAG/SDCA 那样存储所有样本梯度。

#### 🎯 核心要点

- 核心思想：利用控制变量技术将随机梯度的方差从 \(O(1)\) 降低到随迭代逐步趋近于零
- 双循环结构：外循环计算全梯度快照 \(\tilde{\mu} = \frac{1}{n}\sum_{i=1}^n \nabla f_i(\tilde{x})\)，内循环执行方差缩减的随机更新
- 修正梯度公式：\(v_t = \nabla f_{i_t}(x_t) - \nabla f_{i_t}(\tilde{x}) + \tilde{\mu}\)，保证无偏且方差随收敛自动缩小
- 收敛性：对 \(L\)-光滑且 \(\mu\)-强凸函数，以线性速率收敛，总梯度计算复杂度为 \(O((n + \kappa)\log(1/\epsilon))\)，其中 \(\kappa = L/\mu\) 为条件数
- 内存高效：仅需 \(O(d)\) 额外存储（存一份全梯度快照），不需要像 SAG 那样存储 \(O(nd)\) 的历史梯度
- 支持非强凸情形：通过混合正则化技巧 \(f(x) + \frac{\lambda}{2}\|x\|^2\) 可扩展到一般凸问题

#### 🔬 深入细节

##### 核心算法示意

SVRG 的核心结构为"快照 + 修正"的双循环设计：

```
┌─────────────────────────────────────────────────────┐
│  外循环 (epoch s = 1, 2, ...)                        │
│  ┌─────────────────────────────────────────────────┐│
│  │ 1. 计算全梯度快照: μ̃ = (1/n)Σ∇f_i(x̃)         ││
│  │ 2. 设置快照点: x̃ = x_prev                      ││
│  │                                                  ││
│  │  内循环 (t = 1, ..., m)                          ││
│  │  ┌───────────────────────────────────────────┐  ││
│  │  │ • 随机采样 i_t ∈ {1,...,n}                │  ││
│  │  │ • 计算修正梯度:                            │  ││
│  │  │   v_t = ∇f_{i_t}(x_t) - ∇f_{i_t}(x̃) + μ̃│  ││
│  │  │ • 更新: x_{t+1} = x_t - η·v_t            │  ││
│  │  └───────────────────────────────────────────┘  ││
│  │                                                  ││
│  │ 3. 输出: x̃ = x_m (或随机选取)                  ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

##### 算法伪代码

```python
# SVRG 算法 (Option I: 取最后一个迭代点)
def SVRG(f, data, x_init, learning_rate, m, S):
    """
    f: 目标函数 f(x) = (1/n) Σ f_i(x)
    data: n 个样本
    x_init: 初始点
    learning_rate: 步长 η
    m: 内循环步数 (通常取 m = O(n))
    S: 外循环轮数
    """
    x_tilde = x_init
    
    for s in range(S):  # 外循环
        # Step 1: 计算全梯度快照
        mu_tilde = (1/n) * sum(grad_f_i(x_tilde) for i in range(n))
        
        x = x_tilde  # 内循环起点
        
        for t in range(m):  # 内循环
            # Step 2: 随机采样
            i_t = random.randint(0, n-1)
            
            # Step 3: 方差缩减梯度估计
            v_t = grad_f_i_t(x) - grad_f_i_t(x_tilde) + mu_tilde
            
            # Step 4: 参数更新
            x = x - learning_rate * v_t
        
        # Step 5: 更新快照点
        x_tilde = x  # Option I
        # x_tilde = random_choice(x_1, ..., x_m)  # Option II
    
    return x_tilde
```

##### 动机与背景

**传统 SGD 的根本问题：方差不消失。** 对于有限和优化问题：

$$f(x) = \frac{1}{n}\sum_{i=1}^n f_i(x)$$

标准 SGD 每步使用单个样本梯度 \(\nabla f_i(x)\) 作为全梯度 \(\nabla f(x)\) 的无偏估计。虽然期望正确，但其方差：

$$\text{Var}[\nabla f_i(x)] = \mathbb{E}\|\nabla f_i(x) - \nabla f(x)\|^2$$

即使在最优解 \(x^*\) 处也不为零（因为各 \(\nabla f_i(x^*)\) 通常不全为零）。这导致 SGD 必须使用递减步长才能收敛，最终收敛速率仅为次线性的 \(O(1/T)\)。

**已有方法的局限：**
- **SAG (Stochastic Average Gradient)**：通过维护所有 \(n\) 个样本梯度的历史记录实现方差缩减，但需要 \(O(nd)\) 内存
- **SDCA (Stochastic Dual Coordinate Ascent)**：利用对偶结构，但仅适用于特定问题形式
- **Full GD**：每步计算 \(O(n)\) 个梯度，计算代价过高

> 💡 关键洞察：SVRG 的核心思想来自蒙特卡洛方法中的**控制变量**（control variate）技术——如果我们有一个与目标量高度相关的已知量，就可以用它来减小估计方差。

##### 核心机制：控制变量方差缩减

SVRG 的梯度估计器设计为：

$$v_t = \nabla f_{i_t}(x_t) - \nabla f_{i_t}(\tilde{x}) + \tilde{\mu}$$

其中 \(\tilde{x}\) 是快照点，\(\tilde{\mu} = \nabla f(\tilde{x}) = \frac{1}{n}\sum_{i=1}^n \nabla f_i(\tilde{x})\) 是在快照点处的精确全梯度。

**无偏性验证：**

$$\mathbb{E}_{i_t}[v_t] = \nabla f(x_t) - \nabla f(\tilde{x}) + \tilde{\mu} = \nabla f(x_t)$$

**方差分析：** 关键在于 \(v_t\) 的方差会随着 \(x_t\) 接近 \(\tilde{x}\) 而自动缩小：

$$\mathbb{E}\|v_t - \nabla f(x_t)\|^2 = \mathbb{E}\|\nabla f_{i_t}(x_t) - \nabla f_{i_t}(\tilde{x}) - (\nabla f(x_t) - \nabla f(\tilde{x}))\|^2$$

利用 Lipschitz 连续梯度条件 \(\|\nabla f_i(x) - \nabla f_i(y)\| \leq L\|x-y\|\)，可以证明：

$$\mathbb{E}\|v_t - \nabla f(x_t)\|^2 \leq 4L[f(x_t) - f(x^*) + f(\tilde{x}) - f(x^*)]$$

> ⚠️ 注意：当 \(x_t \to x^*\) 且 \(\tilde{x} \to x^*\) 时，方差趋近于零！这是 SVRG 能够使用固定步长并实现线性收敛的根本原因。

##### 收敛性分析

**定理（强凸情形）：** 假设每个 \(f_i\) 是 \(L\)-光滑的，\(f\) 是 \(\mu\)-强凸的。取步长 \(\eta < \frac{1}{2L}\)，内循环长度 \(m\) 足够大使得：

$$\alpha = \frac{1}{\mu \eta (1-2L\eta)m} + \frac{2L\eta}{1-2L\eta} < 1$$

则 SVRG 以几何速率收敛：

$$\mathbb{E}[f(\tilde{x}_s) - f(x^*)] \leq \alpha^s [f(\tilde{x}_0) - f(x^*)]$$

**最优参数选择：** 取 \(\eta = O(1/L)\)，\(m = O(\kappa)\)（其中 \(\kappa = L/\mu\)），则每个外循环的计算量为 \(O(n + \kappa)\) 次梯度计算，达到 \(\epsilon\) 精度的总复杂度为：

$$O\left((n + \kappa)\log\frac{1}{\epsilon}\right)$$

**与其他方法的复杂度对比：**

| 方法 | 梯度计算复杂度 | 额外内存 |
|------|---------------|---------|
| GD | \(O(n\kappa\log(1/\epsilon))\) | \(O(d)\) |
| SGD | \(O(1/(\mu\epsilon))\) | \(O(d)\) |
| SAG | \(O((n+\kappa)\log(1/\epsilon))\) | \(O(nd)\) |
| **SVRG** | \(O((n+\kappa)\log(1/\epsilon))\) | \(O(d)\) |

> 💡 关键优势：SVRG 达到了与 SAG 相同的最优梯度复杂度，但内存开销仅为 \(O(d)\) 而非 \(O(nd)\)，对大规模问题（\(n\) 很大）极为重要。

##### 与传统方法的关键区别

1. **vs. SGD**：SGD 的方差恒定不变，必须用递减步长 \(\eta_t \to 0\) 才能收敛，导致次线性速率。SVRG 通过控制变量使方差自动缩减，可用固定步长实现线性收敛。

2. **vs. SAG**：SAG 维护一个 \(n \times d\) 的梯度表来跟踪每个样本的历史梯度，内存需求 \(O(nd)\)。SVRG 仅需周期性计算一次全梯度（额外存储 \(O(d)\)），以少量额外计算换取巨大的内存节省。

3. **vs. Full GD**：全梯度下降每步需 \(O(n)\) 计算，总复杂度 \(O(n\kappa\log(1/\epsilon))\)。当 \(\kappa \ll n\) 时，SVRG 显著更快。

4. **Option I vs. Option II**：
   - Option I（取最后一个迭代点）：实践中通常更好
   - Option II（随机选取内循环中的一个点）：理论分析更简洁，可用于非强凸情形

##### 实际考量

- **内循环长度 \(m\) 的选择**：论文建议 \(m = 2n\) 或 \(m = 5n\)，实验表明对具体选择不太敏感
- **步长选择**：理论要求 \(\eta < 1/(2L)\)，实践中 \(\eta = 1/L\) 通常可行
- **mini-batch 扩展**：可以在内循环中使用 mini-batch 进一步降低方差，但单样本版本已经足够高效
- **非强凸扩展**：对一般凸问题，可添加微小正则化 \(\frac{\lambda}{2}\|x\|^2\) 使其变为强凸，收敛速率为 \(O(1/T)\)

#### 🧪 练习题

```yaml
question: "SVRG 相比 SAG 的主要优势是什么？"
options:
  - "收敛速率更快（指数级 vs 线性）"
  - "不需要计算全梯度"
  - "额外内存需求从 O(nd) 降低到 O(d)"
  - "适用于非凸优化问题"
answer: 2
explain: "SVRG 和 SAG 具有相同的 O((n+κ)log(1/ε)) 梯度复杂度，但 SAG 需要存储所有 n 个样本的历史梯度（O(nd) 内存），而 SVRG 仅需存储一份全梯度快照（O(d) 内存），这在大规模问题中是决定性优势。"
```