### NAG — Nesterov加速梯度 (Nesterov Accelerated Gradient)

```yaml
id: nag
name: NAG
full_name: Nesterov加速梯度 (Nesterov Accelerated Gradient)
year: '1983'
org: USSR Academy
paper_url: https://hengshuaiyao.github.io/papers/nesterov83.pdf
category: accelerated
parent: gd
motivation: 展望式动量达到一阶方法理论下界O(1/k²)
```

#### 📝 一句话总结

Nesterov 提出了一种非松弛型（non-relaxational）凸优化方法，通过在"展望点"（lookahead point）而非当前点计算梯度并结合特殊的动量序列，将一阶方法的收敛速率从 \(O(1/k)\) 加速至 \(O(1/k^2)\)，达到了凸光滑优化一阶方法的理论最优下界。

#### 🎯 核心要点

- **非松弛序列构造**：最小化序列 \(\{x_k\}\) 不要求函数值单调下降，从而减少每步计算量
- **展望式梯度计算**：在外推点 \(y_k\) 而非当前最优点 \(x_k\) 处计算梯度，实现"先看再走"
- **最优收敛速率**：\(f(x_k) - f^* \leq O(1/k^2)\)，匹配 Nemirovsky-Yudin 一阶方法理论下界
- **动量参数序列**：通过递推 \(a_{k+1} = (1 + \sqrt{1 + 4a_k^2})/2\) 自动确定动量系数
- **自适应步长策略**：采用回溯线搜索确定步长 \(\alpha_k\)，无需预知 Lipschitz 常数 \(L\)
- **强凸扩展**：对强凸函数引入重启策略，达到线性收敛速率的理论最优

#### 🔬 深入细节

![NAG 与 GD/Momentum 对比示意图](https://distill.pub/2017/momentum/thumbnail.jpg)
*图：NAG 的核心思想——在展望点计算梯度（图源：Distill "Why Momentum Really Works"）。标准动量法在当前点计算梯度后加动量，而 NAG 先沿动量方向"展望"，再在展望点计算梯度进行修正。*

##### 算法伪代码

```python
# Nesterov Accelerated Gradient (NAG) - 已知 L 的简化版本
def nag(f, grad_f, y0, L, max_iter):
    """
    f: 目标函数 (凸, 梯度 L-Lipschitz)
    grad_f: 梯度函数
    y0: 初始点
    L: 梯度 Lipschitz 常数
    max_iter: 最大迭代次数
    """
    x_prev = y0
    x_curr = y0
    a_prev = 1.0
    
    for k in range(max_iter):
        # 1. 计算动量参数
        a_curr = (1 + math.sqrt(1 + 4 * a_prev**2)) / 2
        
        # 2. 构造展望点 (lookahead / extrapolation)
        beta_k = (a_prev - 1) / a_curr
        y_k = x_curr + beta_k * (x_curr - x_prev)
        
        # 3. 在展望点做梯度下降
        x_next = y_k - (1/L) * grad_f(y_k)
        
        # 4. 更新
        x_prev = x_curr
        x_curr = x_next
        a_prev = a_curr
    
    return x_curr
```

##### 动机与背景

在 1983 年之前，求解光滑凸优化问题 \(\min_{x \in E} f(x)\) 的一阶方法（仅使用梯度信息）主要有两类：

1. **梯度下降法 (GD)**：\(x_{k+1} = x_k - \alpha \nabla f(x_k)\)，收敛速率为 \(O(1/k)\)
2. **重球法 (Heavy Ball, Polyak 1964)**：加入动量项 \(x_{k+1} = x_k - \alpha \nabla f(x_k) + \beta(x_k - x_{k-1})\)，在二次函数上可加速，但对一般凸函数无理论保证

Nemirovsky 和 Yudin (1979) 证明了一阶方法在 \(L\)-光滑凸函数类上的收敛速率下界为 \(\Omega(1/k^2)\)，即不存在一阶方法能比 \(O(1/k^2)\) 更快。然而在 Nesterov 之前，没有任何方法能达到这个下界。

> 💡 **关键洞察**：传统方法要求函数值单调下降（松弛性），这限制了每步的"冒险"程度。Nesterov 放弃了单调性要求，允许序列在某些步"变差"，换取整体更快的收敛。

##### 核心机制详解

**1. 展望点（Extrapolation Point）的构造**

NAG 的核心创新在于引入辅助序列 \(\{y_k\}\)：

$$y_{k+1} = x_k + \frac{a_k - 1}{a_{k+1}} (x_k - x_{k-1})$$

这里 \(\frac{a_k - 1}{a_{k+1}}\) 是动量系数（约趋近于 \(\frac{k-1}{k+2}\)）。展望点 \(y_k\) 是当前点 \(x_k\) 沿上一步方向的外推，相当于"预测"下一步可能到达的位置。

**2. 动量参数序列的递推**

参数 \(a_k\) 通过以下递推确定：

$$a_{k+1} = \frac{1 + \sqrt{1 + 4a_k^2}}{2}, \quad a_0 = 1$$

这保证了 \(a_k \geq 1 + k/2\)，从而动量系数 \(\beta_k = (a_k - 1)/a_{k+1}\) 从 0 逐渐增大趋近于 1。这个特定的递推关系是收敛证明的关键——它使得 Lyapunov 函数能够逐步递减。

**3. 梯度步与更新**

在展望点 \(y_k\) 处执行标准梯度步：

$$x_{k+1} = y_k - \alpha_k \nabla f(y_k)$$

当 \(L\) 已知时取 \(\alpha_k = 1/L\)；未知时通过回溯线搜索找到满足以下条件的最小 \(i \geq 0\)：

$$f(y_k - 2^{-i}\alpha_{k-1} \nabla f(y_k)) \leq f(y_k) - 0.5 \cdot 2^{-i}\alpha_{k-1} \|\nabla f(y_k)\|^2$$

> ⚠️ **注意**：线搜索从上一步的步长 \(\alpha_{k-1}\) 开始（而非从 1 开始），这保证了总的额外函数求值次数仅为 \(O(\log L)\)。

**4. 收敛性定理**

**定理 1**（Nesterov, 1983）：设 \(f(x)\) 为凸函数且 \(\nabla f\) 满足 \(L\)-Lipschitz 条件，\(X^*\) 为最优解集非空。则方法 (3)-(5) 生成的序列满足：

$$f(x_k) - f^* \leq \frac{4L\|y_0 - x^*\|^2}{(k+2)^2}$$

- 达到 \(\varepsilon\) 精度所需梯度计算次数：\(N_G = \lceil\sqrt{4L\|y_0 - x^*\|^2 / \varepsilon}\rceil\)
- 额外的函数求值次数：\(N_F = 2N_G + \lfloor\log_2(2L\alpha_{-1})\rfloor + 1\)

**证明核心思路**：构造 Lyapunov 函数 \(V_k = 2a_k a_{k-1}(f(x_k) - f^*) + \|p_k - x^*\|^2\)（其中 \(p_k\) 为辅助点），证明 \(V_{k+1} \leq V_k\)，再利用 \(a_k \geq 1 + k/2\) 得到最终估计。

##### 与传统方法的对比

| 方法 | 收敛速率 | 单调性 | 梯度计算点 | 理论最优 |
|------|----------|--------|------------|----------|
| 梯度下降 (GD) | \(O(1/k)\) | ✅ 单调 | 当前点 \(x_k\) | ❌ |
| 重球法 (Heavy Ball) | 无一般凸保证 | ❌ | 当前点 \(x_k\) | ❌ |
| **NAG** | \(O(1/k^2)\) | ❌ 非单调 | **展望点** \(y_k\) | ✅ |

> 💡 **直觉理解**：想象一个球在山谷中滚动。GD 每步只看脚下的坡度；Heavy Ball 加了惯性但仍看脚下；NAG 则"先滑行一段再看坡度"——如果发现滑过头了，梯度会自动修正方向。这种"先行动后修正"的策略比"先观察后行动"更高效。

##### 强凸情形的重启策略

对于强凸函数（\(f(x) - f^* \geq \frac{m}{2}\|x - x^*\|^2\)），Nesterov 提出每 \(\lceil 4\sqrt{L/m}\rceil - 1\) 次迭代后重启算法。每次重启后残差减半，从而达到线性收敛速率：

$$f(x_N) - f^* \leq \varepsilon \quad \Rightarrow \quad N = O\left(\sqrt{\frac{L}{m}} \log \frac{1}{\varepsilon}\right)$$

这同样匹配强凸函数类的一阶方法下界（条件数 \(\kappa = L/m\) 的平方根依赖）。

#### 🧪 练习题

```yaml
question: "NAG 相比标准梯度下降的核心区别是什么？"
options:
  - "使用二阶导数（Hessian）信息加速收敛"
  - "在外推展望点而非当前点计算梯度，并允许函数值非单调下降"
  - "通过增大学习率来加速收敛"
  - "使用随机梯度代替全梯度以降低计算量"
answer: 1
explain: "NAG 的两个关键创新：(1) 在展望点 y_k 而非当前点 x_k 计算梯度；(2) 放弃函数值单调下降的要求。这两点共同使其达到 O(1/k²) 的最优收敛速率，而非 GD 的 O(1/k)。"
```