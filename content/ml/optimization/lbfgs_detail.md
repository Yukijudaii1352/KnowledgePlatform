### L-BFGS

```yaml
id: lbfgs
name: L-BFGS
full_name: 有限内存BFGS (Limited-memory BFGS)
year: '1980'
org: Northwestern Univ.
paper_url: https://www.ams.org/journals/mcom/1980-35-151/S0025-5718-1980-0572855-7/
category: accelerated
parent: newton
motivation: 仅存近m步向量近似Hessian逆，省内存
```

#### 📝 一句话总结

L-BFGS 提出了一种仅保留最近 \(m\) 步梯度差和位移向量来隐式近似 Hessian 逆矩阵的方法，将标准 BFGS 的 \(O(n^2)\) 存储降至 \(O(mn)\)，使拟牛顿法可扩展到大规模优化问题。

#### 🎯 核心要点

- **有限内存策略**：仅存储最近 \(m\) 对向量 \(\{s_k, y_k\}\)，丢弃最旧信息并替换为最新信息，持续更新近似矩阵
- **乘积形式 BFGS 更新**：将 BFGS 公式改写为乘积形式 \(H_{k+1} = V_k^T H_k V_k + \rho_k s_k s_k^T\)，使"丢弃旧更新"等价于令 \(V=I, \rho ss^T=0\)
- **两类算法**：SQN（拟牛顿方向搜索）和 SCG（预条件共轭梯度），均保持二次终止性
- **正定性保证**：只要 \(y_k^T s_k > 0\)（通过充分精确的线搜索保证），生成的矩阵始终正定
- **拟牛顿方程满足**：在过去 \(m\) 个方向上满足 \(H_k y_j = s_j\)（对严格凸二次函数）
- **存储需求**：仅需 \(2m+1\) 个 \(n\) 维向量（对比标准 BFGS 的 \(n(n+1)/2\) 个标量）
- **数值实验**：性能随 \(m\) 增大持续改善，\(m=3\sim7\) 即可获得显著加速

#### 🔬 深入细节

![L-BFGS 两循环递归示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/L-BFGS_two-loop_recursion.svg/600px-L-BFGS_two-loop_recursion.svg.png)
*图：L-BFGS 两循环递归（two-loop recursion）计算搜索方向的流程示意。该递归利用存储的 m 对 \(\{s_i, y_i\}\) 向量隐式计算 \(H_k g_k\)，无需显式构造矩阵。*

**算法伪代码：L-BFGS 两循环递归**

```python
# L-BFGS Two-Loop Recursion
# 输入: 当前梯度 g_k, 存储的 m 对 {s_i, y_i}, 初始 Hessian 逆近似 H0
# 输出: 搜索方向 d_k = -H_k * g_k

def lbfgs_direction(g_k, S, Y, H0_diag):
    """
    S = [s_{k-m}, ..., s_{k-1}]  # 位移向量
    Y = [y_{k-m}, ..., y_{k-1}]  # 梯度差向量
    """
    m = len(S)
    q = g_k.copy()
    alpha = [0.0] * m
    rho = [1.0 / (Y[i].dot(S[i])) for i in range(m)]
    
    # 第一循环：从最新到最旧
    for i in range(m-1, -1, -1):
        alpha[i] = rho[i] * S[i].dot(q)
        q = q - alpha[i] * Y[i]
    
    # 初始 Hessian 逆近似（通常取标量矩阵）
    r = H0_diag * q  # H0 * q
    
    # 第二循环：从最旧到最新
    for i in range(m):
        beta = rho[i] * Y[i].dot(r)
        r = r + (alpha[i] - beta) * S[i]
    
    return -r  # 搜索方向
```

**L-BFGS 主循环伪代码：**

```python
# L-BFGS 优化主循环
def lbfgs_optimize(f, grad_f, x0, m=5, max_iter=1000, tol=1e-6):
    x = x0
    S, Y = [], []  # 存储最近 m 对向量
    
    for k in range(max_iter):
        g = grad_f(x)
        if norm(g) < tol:
            break
        
        # 计算搜索方向
        H0 = (S[-1].dot(Y[-1]) / Y[-1].dot(Y[-1])) if S else 1.0
        d = lbfgs_direction(g, S, Y, H0)
        
        # 线搜索确定步长
        alpha = line_search(f, grad_f, x, d)  # Wolfe 条件
        
        # 更新
        s = alpha * d
        x_new = x + s
        y = grad_f(x_new) - g
        
        # 存储并维护窗口大小 m
        if y.dot(s) > 0:  # 曲率条件
            if len(S) >= m:
                S.pop(0); Y.pop(0)  # 丢弃最旧
            S.append(s); Y.append(y)
        
        x = x_new
    return x
```

**动机与背景**

标准 BFGS 方法是最高效的拟牛顿优化算法之一，通过迭代构建 Hessian 逆矩阵的近似 \(H_k\)，实现超线性收敛。然而，存储完整的 \(n \times n\) 对称矩阵需要 \(O(n^2)\) 空间，对于大规模问题（\(n\) 达数万甚至数百万）完全不可行。1980 年之前，解决大规模问题的替代方案主要有：

1. **稀疏拟牛顿法**（Toint, Shanno）：利用 Hessian 的稀疏结构，但需要预知稀疏模式
2. **共轭梯度法（CG）**：仅需 3-4 个向量存储，但收敛较慢
3. **重启型方法**（Buckley, Nazareth）：积累若干步后丢弃全部信息重启，信息利用不连续

Nocedal 的核心洞察是：**能否在有限存储下持续更新拟牛顿矩阵，而非周期性丢弃？**

**核心机制：乘积形式与滚动窗口**

标准 BFGS 更新有两种等价形式：

**加法形式（Sum-Form）：**

$$H_{k+1} = H_k + U(s_k, y_k, H_k)$$

其中 \(U\) 是秩-2 修正项：

$$U(s,y,H) = \frac{(s^Ty + y^THy)(ss^T)}{(s^Ty)^2} - \frac{Hys^T + sy^TH}{s^Ty}$$

**乘积形式（Product-Form）：**

$$H_{k+1} = V_k^T H_k V_k + \rho_k s_k s_k^T$$

其中 \(\rho_k = \frac{1}{y_k^T s_k}\)，\(V_k = I - \rho_k y_k s_k^T\)。

> 💡 关键：乘积形式的优势在于，"丢弃一次更新"等价于简单地令 \(V_i = I\) 且 \(\rho_i s_i s_i^T = 0\)，不会影响后续更新的独立性。而加法形式中各更新项相互耦合，无法独立丢弃。

利用乘积形式，经过 \(k+1\) 步（\(k+1 > m\)）后的矩阵为：

$$H_{k+1} = V_k^T \cdots V_{k-m+1}^T H_0 V_{k-m+1} \cdots V_k + V_k^T \cdots V_{k-m+2}^T \rho_{k-m+1} s_{k-m+1} s_{k-m+1}^T V_{k-m+2} \cdots V_k + \cdots + \rho_k s_k s_k^T$$

这意味着只需存储 \(\{s_i, y_i\}_{i=k-m+1}^{k}\) 共 \(2m\) 个向量加上对角初始矩阵 \(H_0\)，即可完整重构当前近似矩阵。

**两类使用方式**

论文提出两种利用有限内存 BFGS 矩阵的迭代格式：

1. **SQN（Special Quasi-Newton）**：直接用 \(d_k = -H_k g_k\) 作为搜索方向
2. **SCG（Special Conjugate Gradient）**：将 \(H_k\) 作为预条件子用于共轭梯度迭代：\(d_k = -H_k g_k + \beta_k d_{k-1}\)

两者均保持**二次终止性**：对严格凸二次函数配合精确线搜索，最多 \(n\) 步收敛到精确解。

**与标准 BFGS 的关键区别**

| 特性 | 标准 BFGS | L-BFGS |
|------|-----------|--------|
| 存储 | \(O(n^2)\) | \(O(mn)\) |
| 每步计算 | \(O(n^2)\)（矩阵-向量乘） | \(O(mn)\)（两循环递归） |
| 信息保留 | 全部历史 | 最近 \(m\) 步 |
| 收敛速度 | 超线性 | 依赖 \(m\)，\(m\) 越大越接近超线性 |
| 适用规模 | \(n < 10^3\) | \(n\) 可达 \(10^6\) 以上 |

> ⚠️ 注意：当 \(m=1\) 时，L-BFGS 退化为 Shanno 的"无记忆 BFGS"（memoryless BFGS），本质上等价于带缩放的共轭梯度法。实践中 \(m\) 通常取 3~20，\(m=5\sim10\) 是常见默认值。

**初始矩阵选择**

论文使用对角正定矩阵 \(H_0\) 作为初始近似。后续实践中，常见的自适应选择为：

$$H_0^{(k)} = \frac{s_{k-1}^T y_{k-1}}{y_{k-1}^T y_{k-1}} I$$

这一缩放使初始近似沿最近梯度方向具有正确的曲率量级。

**数值实验结论**

论文在 Extended Rosenbrock、Penalty I、Penalty II、Trigonometric 等标准测试函数上进行实验，结论包括：
- SQN 在 \(m \geq 3\) 时显著优于标准共轭梯度和 Shanno 方法
- SCG 对小 \(m\) 值表现良好
- 性能随 \(m\) 增大**持续改善**，极少出现退化情况

#### 🧪 练习题

```yaml
question: "L-BFGS 相比标准 BFGS 的核心改进是什么？"
options:
  - "使用更精确的线搜索策略提高收敛速度"
  - "仅存储最近 m 步的向量对来隐式近似 Hessian 逆，将存储从 O(n²) 降至 O(mn)"
  - "通过稀疏矩阵分解减少 Hessian 的存储需求"
  - "用共轭梯度法替代拟牛顿更新以节省计算量"
answer: 1
explain: "L-BFGS 的核心创新是利用 BFGS 的乘积形式，仅保留最近 m 对 {s_k, y_k} 向量隐式表示 Hessian 逆近似，存储从 O(n²) 降至 O(mn)，同时保持正定性和二次终止性。"
```