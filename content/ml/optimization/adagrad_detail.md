### AdaGrad

```yaml
id: adagrad
name: AdaGrad
full_name: "自适应梯度方法 (Adaptive Gradient Methods)"
year: 2011
org: "UC Berkeley / UPenn / Technion"
paper_url: "https://jmlr.org/papers/v12/duchi11a.html"
category: foundation
parent: "—"
motivation: "根据历史梯度自适应地为每个参数调节学习率"
```

#### 📝 一句话总结

AdaGrad 提出了基于历史梯度二阶矩自适应调整每个参数学习率的在线优化方法，解决了标准梯度下降中所有参数共享同一学习率导致稀疏特征学习不充分的问题，为后续 RMSProp、Adam 等自适应优化器奠定了理论基础。

#### 🎯 核心要点

- 提出对角自适应学习率：每个参数的学习率与其历史梯度的 ℓ₂ 范数成反比，即 \(\eta / \sqrt{\sum_{\tau=1}^{t} g_{\tau,i}^2}\)
- 提出全矩阵版本：利用完整的梯度外积矩阵 \(G_t = \sum_{\tau=1}^t g_\tau g_\tau^\top\) 的平方根进行更新
- 理论保证：Regret bound 为 \(O\left(\max_i \|x^*_i\| \cdot \sum_{i=1}^d \|g_{1:T,i}\|_2\right)\)，在稀疏梯度场景下远优于 \(O(\sqrt{T})\)
- 支持复合正则化：统一框架处理 ℓ₁ 正则化（稀疏）、ℓ₁-ball 投影、ℓ₂ 正则化等约束
- 无需手动调节学习率衰减策略：步长自动适应数据几何结构
- 实验验证：在文本分类（RCV1）和大规模图像排序（ImageNet）任务上显著优于非自适应方法

#### 🔬 深入细节

![AdaGrad 算法框架](https://ar5iv.labs.arxiv.org/html/1101.3618v3/assets/figure1.png)
*图：AdaGrad 自适应学习率更新框架（论文 Figure 1，对角版本伪代码）。核心思想：用累积梯度平方和的平方根归一化每个参数的步长。*

##### 算法伪代码

```python
# AdaGrad 对角版本 (Diagonal AdaGrad)
# 输入: 学习率 η, 初始点 x_1, 小常数 δ
import numpy as np

def adagrad(gradients, eta=0.01, delta=1e-8):
    """
    gradients: T x d 的梯度序列
    """
    T, d = gradients.shape
    x = np.zeros(d)
    G_diag = np.zeros(d)  # 累积梯度平方和
    
    for t in range(T):
        g = gradients[t]  # 第 t 步的(子)梯度
        G_diag += g ** 2   # 累积各维度梯度平方
        
        # 自适应学习率更新
        adjusted_lr = eta / (delta + np.sqrt(G_diag))
        x = x - adjusted_lr * g
        
        # 如有约束集 X，需投影: x = project(x, X)
    
    return x
```

##### 动机与背景

在线凸优化和随机优化中，标准的（子）梯度下降方法对所有参数使用统一的学习率 \(\eta / \sqrt{t}\)。这在以下场景中存在严重缺陷：

1. **稀疏特征问题**：在自然语言处理等任务中，特征空间极高维（如百万级 bigram 特征），大部分特征极少出现。统一学习率导致稀有但有信息量的特征更新不充分。
2. **几何结构忽略**：标准方法使用欧氏距离度量，忽略了数据的内在几何结构。不同方向上的曲率差异巨大时，统一步长效率低下。
3. **学习率调参困难**：实践中需要精心选择学习率衰减策略，对不同问题需要反复调参。

> 💡 关键直觉：如果某个参数的历史梯度一直很大（频繁更新），说明该方向信息充足，应减小步长精细调整；如果历史梯度很小（稀少更新），说明该方向信息稀缺，应保持较大步长快速学习。

##### 核心机制

**1. 自适应矩阵的构造**

AdaGrad 的核心思想是将 Bregman 散度（正则化项）中的距离度量从固定的欧氏距离替换为数据驱动的自适应度量。具体地，定义累积梯度外积矩阵：

$$G_t = \sum_{\tau=1}^{t} g_\tau g_\tau^\top$$

其中 \(g_\tau \in \mathbb{R}^d\) 是第 \(\tau\) 步的梯度向量。

**全矩阵版本**的更新规则为：

$$x_{t+1} = \Pi_X^{G_t^{1/2}} \left( x_t - \eta \, G_t^{-1/2} g_t \right)$$

其中 \(\Pi_X^{A}(y) = \arg\min_{x \in X} (x-y)^\top A (x-y)\) 是在矩阵 \(A\) 定义的 Mahalanobis 距离下的投影。

**对角版本**（实际使用最广泛）简化为逐坐标操作：

$$x_{t+1,i} = \Pi_{X,i} \left( x_{t,i} - \frac{\eta}{\delta + \sqrt{\sum_{\tau=1}^{t} g_{\tau,i}^2}} \cdot g_{t,i} \right)$$

定义 \(s_{t,i} = \|g_{1:t,i}\|_2 = \sqrt{\sum_{\tau=1}^t g_{\tau,i}^2}\)，则每个参数 \(i\) 的有效学习率为 \(\eta / (\delta + s_{t,i})\)。

> ⚠️ 注意：对角版本的计算复杂度为 \(O(d)\)，与标准 SGD 相同；全矩阵版本需要 \(O(d^3)\) 的矩阵平方根运算，仅适用于低维问题。

**2. 理论保证（Regret Bound）**

论文的核心理论结果（Theorem 5 & Corollary 6）给出了对角版本的 regret 上界：

$$\text{Regret}_T \leq 2 \sum_{i=1}^{d} \|x_{1:T,i}^* - x_{1:T,i}\|_\infty \cdot \|g_{1:T,i}\|_2$$

在简化假设 \(\|x^*\|_\infty \leq D_\infty\) 下：

$$\text{Regret}_T \leq 2 D_\infty \sum_{i=1}^{d} \|g_{1:T,i}\|_2$$

**为什么这比标准 bound 好？** 标准在线梯度下降的 regret 为 \(O(D \cdot G \cdot \sqrt{T})\)，其中 \(G = \max_t \|g_t\|_2\)。而 AdaGrad 的 bound 依赖于各坐标梯度的实际范数之和。当梯度稀疏时（大部分坐标的 \(\|g_{1:T,i}\|_2\) 很小），AdaGrad 的 bound 可以远小于 \(O(\sqrt{T})\)。

具体地，如果每步梯度最多有 \(s\) 个非零坐标（\(s \ll d\)），则：

$$\sum_{i=1}^d \|g_{1:T,i}\|_2 \leq \sqrt{s} \cdot \sqrt{T} \cdot \max_t \|g_t\|_\infty$$

相比标准 bound 的 \(\sqrt{d} \cdot \sqrt{T}\) 因子，改进了 \(\sqrt{d/s}\) 倍。

**3. 全矩阵版本的 Regret Bound**

对于全矩阵版本（Corollary 11）：

$$\text{Regret}_T \leq 2D_2 \cdot \text{tr}(G_T^{1/2})$$

其中 \(D_2 = \max_{x \in X} \|x\|_2\)。由于 \(\text{tr}(G_T^{1/2}) \leq \sqrt{d \cdot \text{tr}(G_T)}\)，当梯度集中在少数方向时（低秩结构），全矩阵版本可以进一步利用这种结构。

##### 与 ℓ₁ 正则化的结合

AdaGrad 自然支持复合目标函数 \(\min_x \sum_t f_t(x) + \phi(x)\)，其中 \(\phi(x) = \lambda \|x\|_1\) 用于诱导稀疏性。

**Primal-Dual 子梯度更新**（结合 Regularized Dual Averaging）：

$$x_{t+1,i} = \text{sign}(-\bar{g}_{t,i}) \cdot \frac{\eta t}{H_{t,ii}} \left[ |\bar{g}_{t,i}| - \lambda \right]_+$$

其中 \(\bar{g}_t = \frac{1}{t}\sum_{\tau=1}^t g_\tau\) 是平均梯度，\(H_{t,ii} = \delta + \|g_{1:t,i}\|_2\)。

**Mirror-Descent 更新**（结合 FOBOS 风格的近端步）：

$$x_{t+1,i} = \text{sign}\left(x_{t,i} - \frac{\eta}{H_{t,ii}} g_{t,i}\right) \left[ \left|x_{t,i} - \frac{\eta}{H_{t,ii}} g_{t,i}\right| - \frac{\lambda \eta}{H_{t,ii}} \right]_+$$

> 💡 关键优势：当梯度稀疏时，可以进行"惰性更新"（lazy evaluation）。如果坐标 \(i\) 从时刻 \(t_0\) 到 \(t\) 的梯度都为零，可以在需要时一次性计算更新，大幅提升计算效率。

##### 与传统方法的对比

| 方法 | 学习率 | Regret Bound | 稀疏适应性 |
|------|--------|-------------|-----------|
| SGD | \(\eta/\sqrt{t}\) (全局) | \(O(D \cdot G \cdot \sqrt{T})\) | 无 |
| AdaGrad (对角) | \(\eta/\sqrt{\sum g_{\tau,i}^2}\) (逐参数) | \(O(D_\infty \sum_i \|g_{1:T,i}\|_2)\) | 强 |
| AdaGrad (全矩阵) | \(\eta \cdot G_t^{-1/2}\) (全矩阵) | \(O(D_2 \cdot \text{tr}(G_T^{1/2}))\) | 最强 |

##### 实验验证

论文在两个大规模任务上验证了 AdaGrad 的有效性：

1. **Reuters RCV1 文本分类**：200 万维稀疏 bigram 特征，4 个二分类任务。AdaGrad-RDA 和 AdaGrad-FOBOS 在所有任务上均优于标准 RDA、FOBOS、Passive-Aggressive 和 AROW，同时通过 ℓ₁ 正则化保持了高度稀疏性（仅 ~27% 非零权重）。

2. **ImageNet 大规模图像排序**：15,000 个类别的排序任务，约 200 万张图片。AdaGrad-RDA 在平均精度（0.6022）上显著优于 PA（0.5581）和标准 RDA（0.5042），同时保持了 72.67% 的稀疏度。

#### 🧪 练习题

```yaml
question: "AdaGrad 对角版本中，参数 i 的有效学习率与什么成反比？"
options:
  - "当前步梯度的绝对值 |g_{t,i}|"
  - "历史梯度平方和的平方根 sqrt(sum g_{τ,i}^2)"
  - "时间步 t 的平方根 sqrt(t)"
  - "参数当前值的绝对值 |x_{t,i}|"
answer: 1
explain: "AdaGrad 的核心机制是用历史梯度的二阶矩（各步梯度平方的累积和）的平方根作为分母来缩放学习率，使得频繁更新的参数学习率自动减小，稀疏更新的参数保持较大学习率。"
```