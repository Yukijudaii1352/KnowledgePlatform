### Adam: A Method for Stochastic Optimization

```yaml
id: adam
name: Adam
full_name: 自适应矩估计 (Adaptive Moment Estimation)
year: 2014
org: University of Toronto
paper_url: https://arxiv.org/abs/1412.6980
category: adaptive
parent: rmsprop
motivation: 融合一阶矩(动量)与二阶矩(自适应学习率)估计，并引入偏差修正，实现高效稳健的随机优化
```

#### 📝 一句话总结

Adam 通过同时维护梯度的指数移动平均（一阶矩）和梯度平方的指数移动平均（二阶矩），并对两者进行偏差修正，实现了对每个参数自适应调整学习率的高效优化算法，兼具 Momentum 的加速效果和 RMSProp 的自适应性。

#### 🎯 核心要点

- **自适应学习率**：结合一阶矩估计（类似 Momentum）和二阶矩估计（类似 RMSProp/AdaGrad），对每个参数独立调整有效学习率
- **偏差修正**：通过除以 $(1-\beta_1^t)$ 和 $(1-\beta_2^t)$ 修正零初始化带来的估计偏差，尤其在训练初期和 $\beta$ 接近 1 时至关重要
- **计算高效**：时间和空间复杂度均为 $O(d)$（$d$ 为参数维度），仅需一阶梯度信息，适合大规模高维问题
- **理论保证**：在凸优化设定下证明了 $O(\sqrt{T})$ 的 regret bound，与在线学习最优界匹配
- **默认超参鲁棒**：推荐 $\alpha=0.001, \beta_1=0.9, \beta_2=0.999, \epsilon=10^{-8}$，在多数深度学习任务中无需大量调参
- **AdaMax 变体**：将 $L^2$ 范数推广到 $L^\infty$ 范数，得到更稳定的变体，无需偏差修正二阶矩

#### 🔬 深入细节

![Adam算法与偏差修正效果](https://ar5iv.labs.arxiv.org/html/1412.6980/assets/adam_fig4.png)

**算法伪代码 (Algorithm 1: Adam)**

```
输入: α (步长, 默认0.001), β₁ (一阶矩衰减率, 默认0.9), β₂ (二阶矩衰减率, 默认0.999), ε (数值稳定项, 默认1e-8)
输入: f(θ) 随机目标函数, θ₀ 初始参数

m₀ ← 0  (初始化一阶矩向量)
v₀ ← 0  (初始化二阶矩向量)
t ← 0   (初始化时间步)

while θ_t 未收敛 do:
    t ← t + 1
    g_t ← ∇_θ f_t(θ_{t-1})          # 计算梯度
    m_t ← β₁ · m_{t-1} + (1-β₁) · g_t    # 更新一阶矩估计(均值)
    v_t ← β₂ · v_{t-1} + (1-β₂) · g_t²   # 更新二阶矩估计(未中心化方差)
    m̂_t ← m_t / (1 - β₁ᵗ)           # 偏差修正一阶矩
    v̂_t ← v_t / (1 - β₂ᵗ)           # 偏差修正二阶矩
    θ_t ← θ_{t-1} - α · m̂_t / (√v̂_t + ε)  # 参数更新
end while
return θ_t
```

**1. 动机与核心思想**

Adam（Adaptive Moment Estimation）的设计动机源于两个经典方法的互补优势：SGD with Momentum 通过累积历史梯度方向加速收敛，而 AdaGrad/RMSProp 通过梯度平方的累积实现参数级别的自适应学习率。Adam 将两者统一到一个框架中：$m_t$ 追踪梯度的一阶矩（均值方向），$v_t$ 追踪梯度的二阶原始矩（尺度信息）。最终更新量 $\alpha \cdot \hat{m}_t / \sqrt{\hat{v}_t}$ 的信噪比（SNR）近似为 $|\mathbb{E}[g]| / \sqrt{\text{Var}[g]}$，当梯度方向一致时 SNR 大、步长大；当梯度噪声大时 SNR 小、步长自动缩小，实现了天然的自适应步长控制。

**2. 偏差修正的必要性**

由于 $m_0 = v_0 = 0$，在训练初期指数移动平均值会系统性地偏向零。具体地，$\mathbb{E}[m_t] = \mathbb{E}[g_t] \cdot (1-\beta_1^t) + \zeta$（其中 $\zeta$ 为高阶小量），因此 $m_t/(1-\beta_1^t)$ 才是 $\mathbb{E}[g_t]$ 的无偏估计。对于 $\beta_2=0.999$，在 $t=1$ 时未修正的 $v_t$ 仅为真实二阶矩的 0.1%，会导致初期学习率爆炸性增大。论文实验（Figure 4）验证了当 $\beta_2$ 接近 1 时，去除偏差修正会导致训练不稳定，而 Adam 在所有超参设置下均优于或等于无修正版本（即 RMSProp with momentum）。

**3. 收敛性分析**

在在线凸优化框架下，作者证明 Adam 的 regret bound 为 $O(\sqrt{T})$：

$$R(T) = \sum_{t=1}^{T} [f_t(\theta_t) - f_t(\theta^*)] \leq \frac{d}{2\alpha(1-\beta_1)} \max_i \|\theta_{1:T,i}\|_2 + \frac{\alpha(1+\beta_1)\sqrt{T}}{(1-\beta_1)\sqrt{1-\beta_2}(1-\gamma)^2} \sum_{i=1}^{d} \|g_{1:T,i}\|_2$$

该界与 AdaGrad 的最优界同阶，但 Adam 额外享有动量带来的实际加速。关键假设包括：有界梯度 $\|g_t\|_\infty \leq G_\infty$、有界参数域 $\|\theta_n - \theta_m\|_2 \leq D$，以及 $\beta_1^2/\sqrt{\beta_2} < 1$（默认参数满足：$0.81/\sqrt{0.999} \approx 0.81$）。

**4. AdaMax 与 L∞ 范数变体**

将二阶矩的 $L^2$ 范数推广到 $L^p$ 范数：$v_t = \beta_2^p v_{t-1} + (1-\beta_2^p)|g_t|^p$。当 $p \to \infty$ 时，更新规则退化为 $u_t = \max(\beta_2 \cdot u_{t-1}, |g_t|)$，即指数加权的历史梯度绝对值最大值。AdaMax 的优势在于：(1) $u_t$ 不需要偏差修正（因为 max 操作不受零初始化影响）；(2) 数值更稳定；(3) 在某些任务上表现优于 Adam。推荐默认参数为 $\alpha=0.002, \beta_1=0.9, \beta_2=0.999$。

**5. 与相关方法的关系**

- 去除偏差修正 → RMSProp with momentum（Tieleman & Hinton, 2012）
- 令 $\beta_1=0$ → 类似 RMSProp（仅自适应学习率，无动量）
- 令 $\beta_2=0$，$v_t$ 累积不衰减 → 类似 AdaGrad（Duchi et al., 2011）
- 有效步长 $\alpha_t = \alpha \cdot \sqrt{1-\beta_2^t}/(1-\beta_1^t)$ 有界于 $[\alpha(1-\beta_1)/\sqrt{1-\beta_2},\ \alpha/\sqrt{1-\beta_2}]$，提供了隐式的学习率退火

#### 🧪 练习题

```yaml
questions:
  - question: "Adam中偏差修正项 1/(1-β₁ᵗ) 的作用是什么？"
    options:
      - "防止梯度爆炸"
      - "修正零初始化导致的矩估计系统性偏小"
      - "实现学习率衰减"
      - "增加正则化效果"
    answer: 1
    explanation: "由于m₀=v₀=0，指数移动平均在初期会系统性偏向零。除以(1-β₁ᵗ)可以补偿这一偏差，使估计值成为真实矩的无偏估计。"

  - question: "当β₂=0.999时，在t=1时刻未经偏差修正的v₁相对于真实二阶矩E[g²]的比例约为？"
    options:
      - "99.9%"
      - "50%"
      - "0.1%"
      - "10%"
    answer: 2
    explanation: "v₁ = (1-β₂)·g₁² = 0.001·g₁²，即真实二阶矩的0.1%。偏差修正后v̂₁ = v₁/(1-0.999¹) = g₁²，恢复为无偏估计。"

  - question: "AdaMax相比Adam的主要区别是什么？"
    options:
      - "使用二阶导数信息"
      - "将L²范数替换为L∞范数来计算自适应学习率"
      - "去除了动量项"
      - "使用固定学习率"
    answer: 1
    explanation: "AdaMax将Adam中基于L²范数的二阶矩估计推广到L∞范数，使用u_t = max(β₂·u_{t-1}, |g_t|)替代v_t的计算，数值更稳定且无需对二阶矩做偏差修正。"

  - question: "Adam的有效步长Δt = α·m̂t/√v̂t 的信噪比(SNR)近似等于什么？"
    options:
      - "|E[g]|² / Var[g]"
      - "|E[g]| / √Var[g]"
      - "√Var[g] / |E[g]|"
      - "E[g²] / E[g]²"
    answer: 1
    explanation: "当β₁→1时，m̂t≈E[g]，v̂t≈E[g²]，有效步长正比于|E[g]|/√E[g²]。当均值远大于标准差时步长接近±1（信号强），反之步长趋近0（噪声大）。"
```