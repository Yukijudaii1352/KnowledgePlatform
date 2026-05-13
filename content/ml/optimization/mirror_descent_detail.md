### 镜像下降 (Mirror Descent)

```yaml
id: mirror_descent
name: Mirror Descent
full_name: 镜像下降 (Mirror Descent)
year: '1983'
org: USSR Academy
paper_url: https://en.wikipedia.org/wiki/Mirror_descent
category: accelerated
parent: gd
motivation: Bregman散度替代欧氏距离适配非欧几何
```

#### 📝 一句话总结

镜像下降（Mirror Descent）通过将梯度更新中的欧氏距离替换为 Bregman 散度，使优化算法能够自适应地匹配问题的内在几何结构，从而在单纯形、概率分布空间等非欧几何约束集上获得维度无关的最优收敛速率，是在线学习与凸优化领域的基础性框架算法。

#### 🎯 核心要点

- **核心思想**：用 Bregman 散度 \(D_h(x \| y)\) 替代梯度下降中的欧氏距离 \(\|x - y\|^2\) 作为邻近项，适配非欧几何
- **镜像映射**：通过距离生成函数 \(h\) 的梯度 \(\nabla h\) 将原始空间映射到对偶空间，在对偶空间中执行梯度步，再映射回原始空间
- **统一框架**：当 \(h(x) = \frac{1}{2}\|x\|_2^2\) 时退化为标准梯度下降；当 \(h(x) = \sum_i x_i \log x_i\)（负熵）时退化为指数梯度/乘法权重更新
- **维度无关收敛**：在概率单纯形上使用 KL 散度时，收敛速率为 \(O(\sqrt{\log n / T})\)，仅对维度 \(n\) 取对数依赖
- **强凸性要求**：距离生成函数 \(h\) 需相对于给定范数 \(\|\cdot\|\) 满足 \(\alpha\)-强凸性，以保证算法稳定性
- **广泛影响**：奠定了在线凸优化（Online Mirror Descent）、自然梯度、信息几何优化等方向的理论基础

#### 🔬 深入细节

![Mirror Descent 几何示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Mirror_descent_illustration.svg/800px-Mirror_descent_illustration.svg.png)
*图：Mirror Descent 的几何直觉——通过镜像映射 \(\nabla h\) 将原始空间点映射到对偶空间，在对偶空间执行线性梯度步后，再通过逆映射 \((\nabla h)^{-1}\) 返回原始空间，最后通过 Bregman 投影回到可行域。*

##### 算法伪代码

```python
# Mirror Descent 算法
# 输入: 凸函数 f, 可行域 K, 距离生成函数 h, 学习率序列 {η_t}
# 输出: 近似最优解

def mirror_descent(f, K, h, grad_h, grad_h_inv, eta, T, x0):
    """
    f: 目标函数
    K: 凸可行域
    h: 距离生成函数 (α-强凸)
    grad_h: h 的梯度 (镜像映射)
    grad_h_inv: 镜像映射的逆
    eta: 学习率序列
    T: 迭代次数
    x0: 初始点 ∈ K
    """
    x = x0
    for t in range(T):
        # Step 1: 映射到对偶空间
        theta = grad_h(x)
        
        # Step 2: 在对偶空间执行梯度步
        g = grad_f(x)  # 计算目标函数梯度
        theta_new = theta - eta[t] * g
        
        # Step 3: 映射回原始空间
        x_tilde = grad_h_inv(theta_new)
        
        # Step 4: Bregman 投影回可行域
        x = bregman_projection(x_tilde, K, h)
    
    return x

def bregman_projection(y, K, h):
    """Bregman 投影: argmin_{x ∈ K} D_h(x || y)"""
    # D_h(x||y) = h(x) - h(y) - ⟨∇h(y), x - y⟩
    return argmin(lambda x: D_h(x, y), constraint=K)
```

##### 动机与背景

标准梯度下降的更新规则可以等价地写为一个邻近点问题：

$$x_{t+1} = \arg\min_{x} \left\{ \langle \nabla f(x_t), x - x_t \rangle + \frac{1}{2\eta_t} \|x - x_t\|_2^2 \right\}$$

这里的邻近项 \(\|x - x_t\|_2^2\) 使用的是欧氏距离，它隐含地假设参数空间是"平坦"的。然而，在许多实际优化问题中，可行域具有非欧几何结构：

- **概率单纯形** \(\Delta_n = \{x \geq 0 : \sum_i x_i = 1\}\)：在组合优化、在线学习中频繁出现
- **正定矩阵锥**：在协方差估计、量子信息中出现
- **核范数球**：在矩阵补全中出现

在这些场景下，欧氏距离无法有效刻画点之间的"真实距离"。例如，在概率单纯形上，欧氏投影的计算复杂度为 \(O(n \log n)\)，且收敛速率为 \(O(\sqrt{n/T})\)，显式依赖维度 \(n\)。

> 💡 **关键洞察**：Nemirovsky 和 Yudin (1983) 提出，将欧氏距离替换为与问题几何匹配的 Bregman 散度，可以显著改善算法在特定几何结构上的收敛性能。

##### 核心机制：Bregman 散度与镜像映射

**Bregman 散度的定义：**

给定严格凸且可微的函数 \(h: \mathbb{R}^n \to \mathbb{R}\)，其诱导的 Bregman 散度定义为：

$$D_h(x \| y) = h(x) - h(y) - \langle \nabla h(y), x - y \rangle$$

几何上，\(D_h(x \| y)\) 度量了 \(h\) 在点 \(y\) 处的切平面与 \(h(x)\) 之间的"间隙"。当 \(h(x) = \frac{1}{2}\|x\|_2^2\) 时，\(D_h(x \| y) = \frac{1}{2}\|x - y\|_2^2\)，退化为欧氏距离的平方。

**Mirror Descent 的更新规则：**

将标准梯度下降中的欧氏邻近项替换为 Bregman 散度：

$$x_{t+1} = \arg\min_{x \in K} \left\{ \langle \nabla f(x_t), x - x_t \rangle + \frac{1}{\eta_t} D_h(x \| x_t) \right\}$$

> ⚠️ **注意**：这里要求 \(h\) 是 \(\alpha\)-强凸的（相对于某个范数 \(\|\cdot\|\)），即 \(D_h(x \| y) \geq \frac{\alpha}{2}\|x - y\|^2\)，这保证了更新的稳定性。

**四步迭代过程的几何解释：**

1. **原始→对偶（Mirror Map）**：\(\theta_t = \nabla h(x_t)\)，将原始空间中的点通过镜像映射送到对偶空间
2. **对偶空间梯度步**：\(\theta_{t+1} = \theta_t - \eta_t \nabla f(x_t)\)，在对偶空间中执行标准的线性更新
3. **对偶→原始（逆映射）**：\(x'_{t+1} = (\nabla h)^{-1}(\theta_{t+1})\)，通过逆镜像映射返回原始空间
4. **Bregman 投影**：\(x_{t+1} = \arg\min_{x \in K} D_h(x \| x'_{t+1})\)，将点投影回可行域

> 💡 **直觉**：镜像映射 \(\nabla h\) 起到了"坐标变换"的作用——它将原始空间中可能弯曲的几何结构"展平"到对偶空间，使得在对偶空间中的线性操作对应于原始空间中适应几何的非线性操作。

##### 关键特例与收敛分析

**特例 1：欧氏设定（标准梯度下降）**

取 \(h(x) = \frac{1}{2}\|x\|_2^2\)，则 \(\nabla h(x) = x\)（恒等映射），\(D_h(x \| y) = \frac{1}{2}\|x - y\|_2^2\)。Mirror Descent 退化为带投影的梯度下降（Projected Gradient Descent）。

**特例 2：负熵设定（指数梯度/乘法权重）**

取 \(h(x) = \sum_{i=1}^n x_i \log x_i\)（负熵），可行域为概率单纯形 \(\Delta_n\)。此时：
- Bregman 散度 = KL 散度：\(D_h(x \| y) = \text{KL}(x \| y) = \sum_i x_i \log(x_i / y_i)\)
- 镜像映射：\([\nabla h(x)]_i = \log x_i + 1\)
- 更新规则简化为乘法权重更新：\(x_{t+1,i} \propto x_{t,i} \cdot \exp(-\eta_t [\nabla f(x_t)]_i)\)

**收敛速率对比：**

对于 Lipschitz 连续的凸函数 \(f\)（\(\|\nabla f\|_* \leq G\)），经过 \(T\) 步迭代后：

| 设定 | 距离生成函数 | 可行域直径 | 收敛速率 |
|------|-------------|-----------|---------|
| 欧氏 | \(\frac{1}{2}\|x\|_2^2\) | \(O(\sqrt{n})\) | \(O(G\sqrt{n/T})\) |
| 熵 | \(\sum x_i \log x_i\) | \(O(\log n)\) | \(O(G\sqrt{\log n / T})\) |

> 💡 **关键优势**：在概率单纯形上，使用负熵作为距离生成函数，收敛速率从 \(O(\sqrt{n/T})\) 改善为 \(O(\sqrt{\log n / T})\)，实现了指数级的维度依赖改善！

##### 与相关方法的联系

- **自然梯度（Natural Gradient）**：当 \(h\) 的 Hessian 等于 Fisher 信息矩阵时，Mirror Descent 等价于自然梯度下降
- **黎曼梯度下降**：Mirror Descent 可视为在由 \(h\) 的 Hessian 诱导的黎曼度量下的梯度下降
- **在线镜像下降（Online Mirror Descent, OMD）**：将 Mirror Descent 推广到在线凸优化设定，是分析 regret bound 的核心工具
- **对偶平均（Dual Averaging）**：Nesterov (2009) 提出的变体，在对偶空间中累积梯度而非逐步更新，具有更好的稀疏性

##### 实际应用场景

1. **在线学习与博弈论**：Hedge 算法（专家问题）本质上是使用负熵的 Mirror Descent
2. **组合优化**：在排列、匹配等组合结构上的 Frank-Wolfe 型算法
3. **分布式优化**：利用问题局部几何结构加速通信
4. **强化学习**：策略优化中的自然策略梯度可视为 Mirror Descent 的特例

#### 🧪 练习题

```yaml
question: "在概率单纯形上，Mirror Descent 使用负熵作为距离生成函数相比标准投影梯度下降的主要优势是什么？"
options:
  - "计算复杂度从 O(n²) 降低到 O(n)"
  - "收敛速率对维度的依赖从 O(√n) 改善为 O(√(log n))"
  - "不再需要计算目标函数的梯度"
  - "可以处理非凸目标函数"
answer: 1
explain: "负熵诱导的 KL 散度使得单纯形的'有效直径'从 O(√n) 缩小为 O(√(log n))，从而将收敛速率中的维度依赖从多项式改善为对数级别。"
```