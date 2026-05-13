### 自然梯度 (Natural Gradient)

```yaml
id: natural_gradient
name: Natural Gradient
full_name: 自然梯度 (Natural Gradient)
year: '1998'
org: RIKEN
paper_url: https://doi.org/10.1162/089976698300017746
category: accelerated
parent: newton
motivation: Fisher信息矩阵度量参数空间黎曼几何
```

#### 📝 一句话总结

自然梯度方法利用 Fisher 信息矩阵作为参数空间的黎曼度量，将普通梯度转化为参数流形上的最速下降方向，实现了参数化不变的高效学习，是连接信息几何与神经网络优化的奠基性工作。

#### 🎯 核心要点

- 核心洞察：神经网络的参数空间不是欧氏空间，而是具有黎曼几何结构的统计流形
- Fisher 信息矩阵 \(G(\theta)\) 定义了参数空间的自然度量（对应 KL 散度的局部二阶近似）
- 自然梯度公式：\(\tilde{\nabla} L(\theta) = G(\theta)^{-1} \nabla L(\theta)\)
- 参数化不变性：自然梯度的更新方向不随参数的重新参数化而改变
- 渐近有效性：自然梯度下降在在线学习中达到 Cramér-Rao 下界，即 Fisher 有效
- 与牛顿法的关系：当损失函数为负对数似然时，Fisher 信息矩阵是 Hessian 的期望，自然梯度近似于 Gauss-Newton 方法
- 应用验证：盲源分离（BSS）和多层感知器训练中展示显著加速效果

#### 🔬 深入细节

![Fisher信息矩阵与参数空间几何示意](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Fisher_information_metric.svg/400px-Fisher_information_metric.svg.png)
*图：在统计流形上，Fisher 信息矩阵定义了局部度量。欧氏距离（虚线）与 KL 散度诱导的测地距离（实线）在弯曲空间中显著不同，自然梯度沿后者的最速下降方向更新。*

```python
# Natural Gradient Descent 伪代码
import numpy as np

def natural_gradient_descent(loss_fn, grad_fn, fisher_fn, theta0, lr=0.1, max_iter=1000):
    """
    loss_fn: 损失函数 L(θ)
    grad_fn: 普通梯度 ∇L(θ) → R^d
    fisher_fn: Fisher信息矩阵 G(θ) → R^{d×d}
    theta0: 初始参数
    lr: 学习率
    """
    theta = theta0
    for t in range(max_iter):
        g = grad_fn(theta)              # 计算欧氏梯度
        G = fisher_fn(theta)            # 计算Fisher信息矩阵
        
        # 求解自然梯度: G @ nat_grad = g
        nat_grad = np.linalg.solve(G, g)  # 自然梯度 = G^{-1} g
        
        theta = theta - lr * nat_grad    # 沿自然梯度方向更新
    return theta

# Fisher信息矩阵的经验估计（常用方法）
def empirical_fisher(model, data, theta):
    """用采样梯度的外积估计Fisher矩阵"""
    grads = []
    for x in data:
        g = compute_grad_log_likelihood(model, x, theta)
        grads.append(g)
    grads = np.array(grads)  # (N, d)
    G = grads.T @ grads / len(data)  # E[∇logp · (∇logp)^T]
    return G + 1e-4 * np.eye(len(theta))  # 正则化保证正定
```

**动机与背景**

在传统的梯度下降中，参数更新方向为 \(-\alpha \nabla L(\theta)\)，这隐含假设参数空间是欧氏空间——即参数的微小变化 \(d\theta\) 对应的"距离"由欧氏范数 \(\|d\theta\|^2 = d\theta^\top d\theta\) 度量。然而，对于概率模型（包括神经网络），参数空间具有本质的**弯曲结构**：

- 参数的不同分量对模型输出的影响程度不同
- 同样大小的参数变化 \(\|d\theta\|\)，在参数空间的不同位置可能导致截然不同的分布变化
- 模型的重新参数化（如将 \(\sigma\) 换为 \(\log\sigma\)）会改变普通梯度的方向

Amari 在 1998 年的这篇开创性论文中指出：参数空间的正确度量应由 **Fisher 信息矩阵**给出，它刻画了参数微小变化引起的概率分布变化的"真实距离"。

**核心机制：从欧氏梯度到自然梯度**

设统计模型的参数化概率分布为 \(p(x|\theta)\)，Fisher 信息矩阵定义为：

$$G(\theta) = \mathbb{E}_{x \sim p(x|\theta)} \left[ \nabla_\theta \log p(x|\theta) \cdot \nabla_\theta \log p(x|\theta)^\top \right]$$

等价地：

$$G(\theta) = -\mathbb{E}_{x \sim p(x|\theta)} \left[ \nabla^2_\theta \log p(x|\theta) \right]$$

Fisher 信息矩阵的关键性质是：它恰好等于 KL 散度在 \(\theta\) 处的 Hessian：

$$D_{KL}(p_\theta \| p_{\theta + d\theta}) \approx \frac{1}{2} d\theta^\top G(\theta) \, d\theta$$

这意味着 \(G(\theta)\) 定义了参数空间上的**黎曼度量**，使得参数空间成为一个黎曼流形（统计流形）。

在此度量下，**最速下降方向**不再是普通梯度 \(\nabla L\)，而是自然梯度：

$$\tilde{\nabla} L(\theta) = G(\theta)^{-1} \nabla L(\theta)$$

推导过程：在黎曼流形上，最速下降方向是在约束 \(d\theta^\top G(\theta) \, d\theta = \epsilon^2\) 下使 \(dL = \nabla L^\top d\theta\) 最小的方向。通过 Lagrange 乘子法可得上式。

> 💡 关键直觉：普通梯度告诉你"在欧氏空间中哪个方向下降最快"，而自然梯度告诉你"在保持模型输出分布变化量恒定的约束下，哪个方向下降最快"。后者才是学习的真正目标——我们关心的是模型行为的变化，而非参数数值的变化。

**参数化不变性**

自然梯度的一个核心优势是**参数化不变性**（reparameterization invariance）。设 \(\theta = f(\phi)\) 是一个可逆的参数变换，则：

- 普通梯度在新参数下变为 \(\nabla_\phi L = J^\top \nabla_\theta L\)（其中 \(J = \partial\theta/\partial\phi\)），方向会改变
- 自然梯度在新参数下保持等价：\(G_\phi^{-1} \nabla_\phi L\) 对应的更新与原参数空间中 \(G_\theta^{-1} \nabla_\theta L\) 的更新产生相同的模型变化

这意味着自然梯度的学习效率不依赖于参数的具体表示方式，而普通梯度下降的性能则强烈依赖参数化选择。

**渐近有效性与 Cramér-Rao 界**

Amari 证明了自然梯度在在线学习（online learning）设置中具有**渐近有效性**：当样本量趋于无穷时，自然梯度估计的参数协方差矩阵达到 Cramér-Rao 下界 \(G(\theta^*)^{-1}/n\)。这是统计估计理论中的最优性——没有任何无偏估计器能比这更精确。

相比之下，普通梯度下降的渐近协方差通常大于 Cramér-Rao 界，除非 Fisher 信息矩阵恰好是单位矩阵的倍数。

**与牛顿法和 Gauss-Newton 的关系**

| 特性 | 普通梯度下降 | 牛顿法 | 自然梯度 |
|------|------------|--------|---------|
| 使用的矩阵 | \(I\)（单位矩阵） | \(H = \nabla^2 L\)（Hessian） | \(G = \mathbb{E}[\nabla\log p \cdot \nabla\log p^\top]\)（Fisher） |
| 几何解释 | 欧氏最速下降 | 二阶泰勒近似极值 | 黎曼最速下降 |
| 正定性 | 总是正定 | 不保证正定 | 总是半正定 |
| 计算代价 | \(O(d)\) | \(O(d^3)\) | \(O(d^3)\)（或近似） |
| 参数化不变 | ❌ | ✅ | ✅ |

当损失函数为负对数似然 \(L(\theta) = -\frac{1}{n}\sum_i \log p(x_i|\theta)\) 时：
- Hessian 的期望恰好等于 Fisher 信息矩阵：\(\mathbb{E}[H] = G\)
- 因此自然梯度可视为 Gauss-Newton 方法的推广
- 但 Fisher 矩阵始终半正定（作为外积的期望），而 Hessian 可能不定

> ⚠️ 注意：自然梯度与牛顿法的关键区别在于——Fisher 矩阵是**与数据无关的期望量**（仅依赖模型和当前参数），而 Hessian 依赖于具体的损失函数值。这使得 Fisher 矩阵更稳定，且始终保证正半定性。

**实际计算与近似方法**

精确计算和求逆 \(d \times d\) 的 Fisher 矩阵需要 \(O(d^2)\) 存储和 \(O(d^3)\) 计算，对于现代深度网络不可行。论文之后的发展提出了多种近似：

1. **对角近似**：仅保留 Fisher 矩阵的对角元素，退化为自适应学习率（类似 AdaGrad 的思想）
2. **块对角近似**：按层分块计算 Fisher 矩阵（如 KFAC 方法）
3. **低秩近似**：用少量采样梯度的外积近似 Fisher 矩阵
4. **共轭梯度求解**：不显式构造 Fisher 矩阵，通过 Fisher-向量积迭代求解

**在盲源分离中的应用**

论文的一个重要贡献是将自然梯度应用于**盲源分离**（Blind Source Separation, BSS）。在 BSS 中，分离矩阵 \(W\) 的参数空间是 Lie 群 \(GL(n)\)，其自然度量导出的更新规则为：

$$\Delta W \propto \left[ I - \varphi(y)y^\top \right] W$$

其中 \(y = Wx\) 是分离后的信号，\(\varphi\) 是非线性函数。这个乘法更新规则（右乘 \(W\)）正是自然梯度的体现，它比加法更新 \(\Delta W \propto \left[ I - \varphi(y)y^\top \right]\) 收敛快得多，且具有等变性。

**后续影响**

自然梯度的思想深刻影响了后续优化算法的发展：
- **TRPO/PPO**：信赖域策略优化中的 KL 散度约束本质上是自然梯度的信赖域版本
- **KFAC**：Kronecker 分解近似 Fisher 矩阵，使自然梯度在深度网络中可行
- **Adam/AdaGrad**：对角 Fisher 近似的简化版本
- **弹性权重巩固（EWC）**：用 Fisher 信息矩阵度量参数重要性，防止灾难性遗忘

#### 🧪 练习题

```yaml
question: "自然梯度相比普通梯度的核心区别是什么？"
options:
  - "使用动量加速收敛"
  - "用Fisher信息矩阵度量参数空间的黎曼几何结构，获得参数化不变的最速下降方向"
  - "通过二阶泰勒展开直接求解极值点"
  - "使用随机采样降低梯度方差"
answer: 1
explain: "自然梯度的核心创新在于认识到参数空间是黎曼流形而非欧氏空间，用Fisher信息矩阵作为度量张量，将普通梯度变换为流形上的最速下降方向，从而获得参数化不变性和渐近有效性。"
```