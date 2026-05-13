### Score-SDE

```yaml
id: score-sde
name: Score-SDE
full_name: "基于分数的随机微分方程 (Score-based Stochastic Differential Equations)"
year: 2020
org: Stanford
paper_url: https://arxiv.org/abs/2011.13456
category: diffusion
parent: ddpm
motivation: 将扩散模型统一到连续时间SDE框架
```

#### 📝 一句话总结

Score-SDE 提出了一个基于随机微分方程（SDE）的统一框架，将 SMLD（NCSN）和 DDPM 等离散扩散模型推广到连续时间设定，通过训练时间依赖的分数模型估计逆向 SDE，实现了灵活的采样策略（Predictor-Corrector 采样、概率流 ODE）和精确的似然计算，在 CIFAR-10 上取得了当时最优的 FID 2.20。

#### 🎯 核心要点

- **统一框架**：将 SMLD（Score Matching with Langevin Dynamics）和 DDPM（Denoising Diffusion Probabilistic Models）统一为连续时间 SDE 的离散化特例
- **三种 SDE 变体**：VE SDE（方差爆炸，对应 SMLD）、VP SDE（方差保持，对应 DDPM）、sub-VP SDE（方差有界，似然性能更优）
- **连续时间分数匹配训练**：通过加权去噪分数匹配目标（Eq 7）训练时间依赖的分数网络 \(\mathbf{s}_\theta(\mathbf{x}, t)\)
- **Predictor-Corrector (PC) 采样**：将数值 SDE 求解器（Predictor）与基于分数的 MCMC 方法（Corrector，如 Langevin MCMC）结合，统一并改进了已有采样方法
- **概率流 ODE**：将逆向 SDE 转化为等价的确定性 ODE，支持快速自适应步长采样、精确似然计算和可逆的隐空间编码
- **可控生成**：通过无条件分数模型即可高效估计条件逆向 SDE，实现类别条件生成、图像修复和着色等任务
- **SOTA 结果**：CIFAR-10 无条件生成 FID 2.20（VE SDE + PC 采样），NLL 2.99 bits/dim（sub-VP SDE + 概率流 ODE）

#### 🔬 深入细节

![Score-SDE 框架总览](https://ar5iv.labs.arxiv.org/html/2011.13456/assets/x2.png)
*图：Score-SDE 框架总览。通过前向 SDE 将数据逐步扩散为噪声，再通过逆向 SDE（或概率流 ODE）从噪声生成数据。分数函数 \(\nabla_\mathbf{x}\log p_t(\mathbf{x})\) 由神经网络估计。*

![逆向 SDE 示意](https://ar5iv.labs.arxiv.org/html/2011.13456/assets/x1.png)
*图：求解逆向 SDE 即可得到基于分数的生成模型。前向 SDE 将数据变换为简单噪声分布，逆向过程需要每个时间步的分数函数。*

```python
# Score-SDE 训练与 PC 采样伪代码

# === 训练阶段 ===
# 训练时间依赖的分数模型 s_θ(x, t) ≈ ∇_x log p_t(x)
for each training step:
    x_0 ~ p_data                          # 采样真实数据
    t ~ Uniform(0, T)                     # 均匀采样时间
    x_t ~ p_{0t}(x_t | x_0)              # 根据前向 SDE 转移核采样噪声数据
    # 对于 VE SDE: x_t = x_0 + σ(t) * z,  z ~ N(0, I)
    # 对于 VP SDE: x_t = √(ᾱ_t) * x_0 + √(1-ᾱ_t) * z
    loss = λ(t) * ||s_θ(x_t, t) - ∇_{x_t} log p_{0t}(x_t|x_0)||²
    optimizer.step(loss)

# === Predictor-Corrector 采样 ===
x_T ~ p_T (prior noise distribution)     # 从先验分布采样
for t in reversed(time_steps):            # 从 T 到 0
    # Predictor: 数值 SDE 求解器（如 Euler-Maruyama / 逆扩散）
    x_t = sde_solver_step(x_{t+Δt}, s_θ, t)
    # Corrector: 基于分数的 MCMC（如 Langevin 动力学）
    for j in range(n_corrector_steps):
        z ~ N(0, I)
        x_t = x_t + ε * s_θ(x_t, t) + √(2ε) * z
return x_0
```

##### 动机与背景

在 Score-SDE 之前，基于分数的生成模型主要有两大流派：

1. **SMLD / NCSN**（Song & Ermon, 2019）：使用多个递增的噪声尺度 \(\{\sigma_i\}_{i=1}^N\) 对数据加噪，训练分数网络后用退火 Langevin 动力学采样。
2. **DDPM**（Ho et al., 2020）：使用固定的噪声调度 \(\{\beta_i\}_{i=1}^N\)，通过去噪过程逐步恢复数据。

这两类方法虽然都可以被理解为"分数匹配 + 迭代去噪"，但它们使用不同的噪声调度、不同的训练目标和不同的采样算法，缺乏统一的理论框架。此外，离散的噪声尺度数量 \(N\) 是一个需要手动调节的超参数，且采样步数与 \(N\) 绑定，限制了灵活性。

Score-SDE 的核心洞察是：**当噪声尺度数量 \(N \to \infty\) 时，这些离散加噪过程收敛到连续时间的随机微分方程（SDE）**。这一视角不仅统一了两类方法，还打开了利用 SDE 理论工具的大门。

##### 核心机制：前向与逆向 SDE

**前向 SDE** 描述了数据到噪声的扩散过程：

$$\mathrm{d}\mathbf{x} = \mathbf{f}(\mathbf{x}, t)\mathrm{d}t + g(t)\mathrm{d}\mathbf{w}$$

其中 \(\mathbf{f}(\mathbf{x}, t)\) 是漂移系数，\(g(t)\) 是扩散系数，\(\mathbf{w}\) 是标准维纳过程。该 SDE 将数据分布 \(p_0\) 逐步转化为先验分布 \(p_T\)（通常为高斯分布）。

> 💡 **关键直觉**：前向 SDE 不含可训练参数，完全由噪声调度预先确定。不同的噪声调度对应不同的 SDE。

**逆向 SDE**（Anderson, 1982）给出了从噪声到数据的生成过程：

$$\mathrm{d}\mathbf{x} = \left[\mathbf{f}(\mathbf{x}, t) - g(t)^2 \nabla_\mathbf{x}\log p_t(\mathbf{x})\right]\mathrm{d}t + g(t)\mathrm{d}\bar{\mathbf{w}}$$

其中 \(\bar{\mathbf{w}}\) 是逆向维纳过程，\(\nabla_\mathbf{x}\log p_t(\mathbf{x})\) 是时间 \(t\) 处边际分布的**分数函数**（score function）。

> ⚠️ **注意**：逆向 SDE 的唯一未知量就是分数函数 \(\nabla_\mathbf{x}\log p_t(\mathbf{x})\)，这正是神经网络需要学习的目标。

##### 三种 SDE 实例化

论文展示了 SMLD 和 DDPM 分别对应两种不同 SDE 的离散化，并提出了第三种变体：

**1. VE SDE（方差爆炸，对应 SMLD/NCSN）：**

$$\mathrm{d}\mathbf{x} = \sqrt{\frac{\mathrm{d}[\sigma^2(t)]}{\mathrm{d}t}}\,\mathrm{d}\mathbf{w}$$

该 SDE 没有漂移项（\(\mathbf{f} = \mathbf{0}\)），仅有扩散项。随着 \(t\) 增大，过程的方差持续增长（"爆炸"）。

**2. VP SDE（方差保持，对应 DDPM）：**

$$\mathrm{d}\mathbf{x} = -\frac{1}{2}\beta(t)\mathbf{x}\,\mathrm{d}t + \sqrt{\beta(t)}\,\mathrm{d}\mathbf{w}$$

该 SDE 包含一个将 \(\mathbf{x}\) 向零收缩的漂移项，使得过程方差在初始分布为单位方差时保持为 1。

**3. sub-VP SDE（方差有界，新提出）：**

$$\mathrm{d}\mathbf{x} = -\frac{1}{2}\beta(t)\mathbf{x}\,\mathrm{d}t + \sqrt{\beta(t)\left(1 - e^{-2\int_0^t \beta(s)\mathrm{d}s}\right)}\,\mathrm{d}\mathbf{w}$$

sub-VP SDE 的方差在每个中间时间步都被 VP SDE 的方差所界定，在似然估计任务上表现更优。

##### 训练目标：连续时间分数匹配

训练目标是 SMLD 和 DDPM 损失函数的连续推广：

$$\boldsymbol{\theta}^* = \arg\min_{\boldsymbol{\theta}} \mathbb{E}_t\left\{\lambda(t)\,\mathbb{E}_{\mathbf{x}(0)}\mathbb{E}_{\mathbf{x}(t)|\mathbf{x}(0)}\left[\left\|\mathbf{s}_{\boldsymbol{\theta}}(\mathbf{x}(t), t) - \nabla_{\mathbf{x}(t)}\log p_{0t}(\mathbf{x}(t)|\mathbf{x}(0))\right\|_2^2\right]\right\}$$

其中 \(t \sim \text{Uniform}(0, T)\)，\(\lambda(t)\) 为正权重函数。对于仿射漂移的 SDE（如 VE/VP），转移核 \(p_{0t}(\mathbf{x}(t)|\mathbf{x}(0))\) 为高斯分布，其分数有解析形式，训练可高效进行。

> 💡 **关键**：当 \(\lambda(t) = g(t)^2\) 时，训练目标等价于 ELBO（证据下界）的加权形式，可用于似然训练。

##### Predictor-Corrector 采样

PC 采样是 Score-SDE 的核心创新之一，将两类操作交替执行：

- **Predictor（预测器）**：使用数值 SDE 求解器（如 Euler-Maruyama、逆扩散求解器、概率流 ODE 求解器）估计下一时间步的样本。
- **Corrector（校正器）**：使用基于分数的 MCMC 方法（如 Langevin 动力学）校正当前样本的边际分布。

这一框架统一了已有方法：SMLD 使用恒等预测器 + 退火 Langevin 校正器；DDPM 使用祖先采样预测器 + 恒等校正器。PC 采样通过组合两者，在相同计算量下显著提升了生成质量（CIFAR-10 FID 从 ~4.98 降至 ~2.20）。

##### 概率流 ODE

论文证明，对于任意前向 SDE，存在一个确定性的常微分方程（ODE），其边际分布与 SDE 完全一致：

$$\mathrm{d}\mathbf{x} = \left[\mathbf{f}(\mathbf{x}, t) - \frac{1}{2}g(t)^2\nabla_\mathbf{x}\log p_t(\mathbf{x})\right]\mathrm{d}t$$

这一概率流 ODE 带来了多项独特能力：
1. **快速采样**：可使用自适应步长 ODE 求解器（如 RK45），大幅减少函数评估次数
2. **精确似然计算**：利用连续正则化流的瞬时变量公式，可精确计算 \(\log p_0(\mathbf{x})\)
3. **可逆编码**：数据与隐空间之间的映射是确定性且可逆的，支持隐空间插值和数据操控

![概率流 ODE 快速采样](https://ar5iv.labs.arxiv.org/html/2011.13456/assets/x3.png)
*图：概率流 ODE 支持自适应步长的快速采样，同时保持与 SDE 采样相同的边际分布。*

##### 与传统方法的区别

| 特性 | SMLD/NCSN | DDPM | Score-SDE |
|------|-----------|------|-----------|
| 时间设定 | 离散（N 个噪声尺度） | 离散（N 步） | 连续（SDE） |
| 噪声调度 | 手动设定 \(\sigma_i\) | 手动设定 \(\beta_i\) | 连续函数 \(\sigma(t)\) 或 \(\beta(t)\) |
| 采样方法 | 退火 Langevin | 祖先采样 | PC 采样 / 概率流 ODE / 通用 SDE 求解器 |
| 似然计算 | 不支持 | 仅 ELBO | 精确似然（通过概率流 ODE） |
| 采样步数 | 与 N 绑定 | 与 N 绑定 | 灵活（自适应步长） |

> 💡 **核心优势**：Score-SDE 将离散模型统一到连续框架后，不仅继承了两类方法的优点，还解锁了概率流 ODE、精确似然计算、自适应采样等此前不可能的能力。

#### 🧪 练习题

```yaml
question: "Score-SDE 框架中，VE SDE 和 VP SDE 分别对应哪两种离散扩散模型？"
options:
  - "VE 对应 DDPM，VP 对应 SMLD"
  - "VE 对应 SMLD/NCSN，VP 对应 DDPM"
  - "VE 对应 VAE，VP 对应 GAN"
  - "VE 和 VP 都对应 DDPM 的不同变体"
answer: 1
explain: "VE SDE（方差爆炸）的离散化对应 SMLD/NCSN 的多尺度噪声扰动，VP SDE（方差保持）的离散化对应 DDPM 的噪声调度，这是论文的核心统一结论。"
```