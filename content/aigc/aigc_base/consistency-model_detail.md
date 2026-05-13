### Consistency Models — 一致性模型

```yaml
id: consistency-model
name: Consistency Models
full_name: 一致性模型 (Consistency Models)
year: 2023
org: OpenAI
paper_url: https://arxiv.org/abs/2303.01469
category: aigc_base
parent: —
motivation: 将扩散模型ODE轨迹映射为一步生成的一致性模型，极速推理
```

#### 📝 一句话总结

Consistency Models 通过学习将概率流 ODE 轨迹上的任意点直接映射到轨迹起点（干净数据），实现**一步生成**，同时支持多步迭代提升质量和零样本图像编辑，在蒸馏模式下 CIFAR-10 单步 FID 达到 3.55，大幅超越此前所有蒸馏方法。

#### 🎯 核心要点

- **自一致性约束**：同一 PF ODE 轨迹上的所有 \((x_t, t)\) 对映射到相同的起点 \(x_\epsilon\)，即 \(f(x_t, t) = f(x_{t'}, t')\)
- **边界条件**：\(f(x_\epsilon, \epsilon) = x_\epsilon\)，通过 skip connection 参数化自动满足：\(f_\theta(x,t) = c_{\text{skip}}(t) \cdot x + c_{\text{out}}(t) \cdot F_\theta(x,t)\)
- **两种训练模式**：
  - Consistency Distillation (CD)：从预训练扩散模型蒸馏，用 ODE solver 生成相邻时间步配对
  - Consistency Training (CT)：无需预训练模型，用无偏 score 估计 \(-\frac{x_t - x}{t^2}\) 独立训练
- **EMA 目标网络**：类似 DQN / MoCo，用指数移动平均维护目标网络 \(\theta^- \leftarrow \mu\theta^- + (1-\mu)\theta\)，稳定训练
- **渐进式调度**：CT 训练中逐步增大离散步数 \(N\) 和 EMA 衰减率 \(\mu\)，平衡收敛速度与样本质量
- **多步采样**：交替执行去噪和加噪，用少量步数（2-3 步）显著提升生成质量
- **零样本编辑**：支持图像修复、上色、超分辨率、SDEdit 风格引导等，无需额外训练
- **SOTA 结果**：CIFAR-10 CD 单步 FID 3.55 / 两步 2.93；ImageNet 64×64 CD 单步 FID 6.20 / 两步 4.70

#### 🔬 深入细节

![Consistency Model 核心示意图](https://ar5iv.labs.arxiv.org/html/2303.01469/assets/figures/scheme.jpg)
*图：Consistency Model 将 PF ODE 轨迹上的任意点映射到同一起点 \(x_\epsilon\)。同一条轨迹上的不同噪声水平 \((x_t, t)\) 和 \((x_{t'}, t')\) 经过一致性函数后得到相同的输出。*

##### 动机与背景

扩散模型（Diffusion Models）通过迭代去噪生成高质量样本，但推理时需要数十到数千步 ODE/SDE 求解，计算代价极高。现有加速方法分为两类：

1. **快速采样器**（DDIM、DPM-Solver 等）：减少采样步数但仍需 10+ 步
2. **蒸馏方法**（Progressive Distillation 等）：将多步知识压缩到少步模型，但质量损失明显

Consistency Models 提出了一种全新范式：不是加速 ODE 求解，而是**直接学习 ODE 轨迹的映射函数**，从任意噪声水平一步跳到干净数据。

##### 核心机制：一致性函数

扩散模型的前向过程将数据 \(x\) 逐步加噪为 \(x_T \sim \mathcal{N}(0, T^2 I)\)，其逆过程由概率流 ODE (PF ODE) 描述：

$$\frac{dx_t}{dt} = -t \cdot s_\phi(x_t, t)$$

其中 \(s_\phi(x_t, t) \approx \nabla \log p_t(x_t)\) 是学习到的 score 函数。沿此 ODE 从 \(x_T\) 积分到 \(x_\epsilon\) 即可生成样本。

**一致性函数** \(f: (x_t, t) \mapsto x_\epsilon\) 将轨迹上任意点直接映射到起点，满足自一致性：

$$f(x_t, t) = f(x_{t'}, t') \quad \forall\, t, t' \in [\epsilon, T]$$

> 💡 **关键直觉**：一致性函数本质上是"记住"了整条 ODE 轨迹的终点。不管你从轨迹的哪个位置出发，它都能告诉你终点在哪里——这就绕过了逐步积分的过程。

##### 参数化设计

为满足边界条件 \(f(x_\epsilon, \epsilon) = x_\epsilon\)，采用 skip connection 参数化：

$$f_\theta(x, t) = c_{\text{skip}}(t) \cdot x + c_{\text{out}}(t) \cdot F_\theta(x, t)$$

其中 \(c_{\text{skip}}(\epsilon) = 1\)，\(c_{\text{out}}(\epsilon) = 0\)，确保 \(t = \epsilon\) 时输出恒等。论文采用：

$$c_{\text{skip}}(t) = \frac{\sigma_{\text{data}}^2}{(t - \epsilon)^2 + \sigma_{\text{data}}^2}, \quad c_{\text{out}}(t) = \frac{\sigma_{\text{data}}(t - \epsilon)}{\sqrt{\sigma_{\text{data}}^2 + t^2}}$$

> ⚠️ **注意**：\(F_\theta\) 的骨干网络与标准扩散模型完全相同（如 U-Net），只是外层包了 skip connection。这意味着可以直接复用扩散模型的架构。

##### 训练方法一：Consistency Distillation (CD)

将时间区间 \([\epsilon, T]\) 离散化为 \(t_1 = \epsilon < t_2 < \cdots < t_N = T\)，利用预训练扩散模型的 ODE solver 生成相邻时间步的配对样本，然后强制一致性：

```python
# Consistency Distillation 伪代码
# 输入: 预训练 score 模型 s_φ, 数据集 D, 学习率 η, EMA 率 μ
θ⁻ = θ  # 初始化目标网络
for x ~ D:
    n ~ Uniform{1, 2, ..., N-1}
    # 从数据加噪到 t_{n+1}
    z ~ N(0, I)
    x_{n+1} = x + t_{n+1} * z
    
    # 用 ODE solver (Euler/Heun) 从 t_{n+1} 估计 t_n 处的点
    x̂_n = x_{n+1} + (t_n - t_{n+1}) * Φ(x_{n+1}, t_{n+1}; s_φ)
    
    # 一致性蒸馏损失: 两个点应映射到同一起点
    loss = d(f_θ(x_{n+1}, t_{n+1}), f_{θ⁻}(x̂_n, t_n))
    
    # 更新在线网络, EMA 更新目标网络
    θ = θ - η * ∇loss
    θ⁻ = stopgrad(μ * θ⁻ + (1-μ) * θ)
```

> 💡 **为什么用 EMA 目标网络？** 如果直接让 \(f_\theta\) 同时作为在线网络和目标网络（即 \(\theta^- = \theta\)），梯度会互相干扰导致训练不稳定。EMA 提供了一个缓慢变化的"锚点"，类似 DQN 中的 target network 和 MoCo 中的 momentum encoder。

##### 训练方法二：Consistency Training (CT)

CT 的关键洞察是：**不需要预训练扩散模型**。利用 score 函数的无偏估计：

$$\nabla \log p_t(x_t) = -\mathbb{E}\left[\frac{x_t - x}{t^2} \,\bigg|\, x_t\right]$$

给定原始数据 \(x\) 和加噪样本 \(x_t = x + t \cdot z\)，可以用 \(-z/t\) 作为 score 的无偏估计。这样就不再需要 ODE solver，而是直接用同一噪声 \(z\) 构造相邻时间步的配对：

$$\text{CT Loss} = \mathbb{E}\left[d\left(f_\theta(x + t_{n+1} z,\, t_{n+1}),\; f_{\theta^-}(x + t_n z,\, t_n)\right)\right]$$

> 💡 **CT 与 CD 的关系**：当 \(N \to \infty\) 且使用 Euler solver 时，CD 损失与 CT 损失仅差一个高阶小量 \(o(\Delta t)\)。CT 本质上是 CD 在无限细分极限下的"免蒸馏"版本。

##### 渐进式 N 调度

CT 训练对离散步数 \(N\) 非常敏感：
- **小 \(N\)**：低方差高偏差，收敛快但质量差
- **大 \(N\)**：高方差低偏差，收敛慢但质量好

论文提出**渐进增大 \(N\)**（类似课程学习），同时调整 EMA 率 \(\mu\)，在训练过程中从粗到细逐步提升精度。

##### 多步采样与零样本编辑

![Consistency Model 生成效果](https://ar5iv.labs.arxiv.org/html/2303.01469/assets/figures/teaser.jpg)
*图：Consistency Model 在 LSUN 256×256 上的单步和多步生成效果*

**多步采样**通过交替去噪-加噪实现质量提升：

```python
# 多步一致性采样
def multistep_sample(f_θ, time_points=[T, τ₁, τ₂, ...]):
    x = N(0, T² * I)          # 从纯噪声开始
    x = f_θ(x, T)             # 第 1 步: 一步去噪
    for τ in time_points[1:]:
        z ~ N(0, I)
        x = x + √(τ² - ε²) * z  # 重新加噪到 τ
        x = f_θ(x, τ)            # 再次去噪
    return x
```

这一机制也使零样本编辑成为可能：对于修复任务，在每次加噪后将已知区域替换为真实值；对于超分辨率，将低频信息注入。

##### 距离函数选择

论文比较了三种距离函数 \(d(\cdot, \cdot)\)：

| 距离函数 | CD (FID↓) | CT (FID↓) |
|---------|-----------|-----------|
| \(\ell_2\) | 3.96 | 14.21 |
| \(\ell_1\) | 3.78 | 12.21 |
| LPIPS | **3.55** | **8.70** |

LPIPS（感知距离）显著优于像素级距离，因为它在特征空间中度量差异，更符合人类视觉感知。

##### 与蒸馏方法的对比

![蒸馏方法对比](https://ar5iv.labs.arxiv.org/html/2303.01469/assets/figures/distillation_compare.jpg)
*图：Consistency Distillation 与 Progressive Distillation 在不同采样步数下的 FID 对比*

CD 在所有采样步数下均大幅优于 Progressive Distillation (PD)：
- 单步：CD 3.55 vs PD 8.34 (CIFAR-10)
- 单步：CD 6.20 vs PD 15.39 (ImageNet 64×64)

#### 🧪 练习题

```yaml
question: "Consistency Model 的自一致性 (self-consistency) 约束指的是什么？"
options:
  - "模型在不同随机种子下生成相同的图像"
  - "同一 PF ODE 轨迹上不同时间步的输入映射到相同的输出"
  - "训练损失在不同 batch 之间保持一致"
  - "在线网络和目标网络的参数始终相同"
answer: 1
explain: "自一致性要求 f(x_t, t) = f(x_t', t')，即属于同一条 ODE 轨迹的任意两个点 (x_t, t) 和 (x_t', t') 经过一致性函数后得到相同的输出（轨迹起点 x_ε）。这是 Consistency Model 的核心训练目标。"
```