### TRPO: 信任域策略优化

```yaml
id: trpo
name: TRPO
full_name: 信任域策略优化 (Trust Region Policy Optimization)
year: "2015"
org: UC Berkeley (John Schulman, Sergey Levine, Pieter Abbeel, Michael Jordan, Philipp Moritz)
paper_url: https://arxiv.org/abs/1502.05477
category: foundation
parent: "—"
motivation: KL约束信任域保证单调改进
```

#### 📝 一句话总结
TRPO 通过 KL 散度约束构造信任域，在理论上保证策略迭代的单调改进，解决了标准策略梯度方法步长敏感、易导致性能崩溃的问题，成为后续 PPO 等方法的理论基础。

#### 🎯 核心要点
- 提出替代目标函数 \(L_{\pi}(\tilde{\pi})\)，用旧策略的状态访问频率近似新策略的期望回报
- 证明策略改进下界：\(\eta(\tilde{\pi}) \geq L_{\pi}(\tilde{\pi}) - C \cdot D_{\text{KL}}^{\max}(\pi, \tilde{\pi})\)，其中 \(C = \frac{4\epsilon\gamma}{(1-\gamma)^2}\)
- 将理论下界转化为可扩展的信任域约束：最大化 \(L_{\theta_{\text{old}}}(\theta)\)，同时约束 \(\bar{D}_{\text{KL}}^{\rho}(\theta_{\text{old}}, \theta) \leq \delta\)
- 用自然梯度（Fisher 信息矩阵的逆 × 策略梯度）近似求解约束优化问题
- 提出 Single-Path 和 Vine 两种采样估计方案，适应不同场景（无模型 / 有仿真器）
- 在 MuJoCo 连续控制（Swimmer, Hopper, Walker）和 Atari 游戏中显著优于传统策略梯度、自然梯度和 DQN

#### 🔬 深入细节

![TRPO 信任域约束示意](https://ar5iv.labs.arxiv.org/html/1502.05477/assets/x3.png)
*图：TRPO 的信任域约束——在新策略与旧策略的 KL 散度球内最大化替代目标函数（来源：Schulman et al. 2015）*

##### 算法伪代码

```
Algorithm: Trust Region Policy Optimization (Single-Path)

1. 初始化策略参数 θ_0
2. for i = 0, 1, 2, ... do
3.     用当前策略 π_θ_i 采集 N 条轨迹 {s_0, a_0, r_0, ...}
4.     对每条轨迹，用 GAE 或 Monte Carlo 计算优势估计 Â_t
5.     构造替代损失:
          L(θ) = (1/N) Σ_t [π_θ(a_t|s_t) / π_θ_old(a_t|s_t)] · Â_t
6.     计算 Fisher 信息矩阵: F = (1/N) Σ_t ∇ log π_θ(a_t|s_t) · ∇ log π_θ(a_t|s_t)^T
7.     计算自然梯度: g = ∇_θ L(θ)|_{θ=θ_old}
8.     近似求解约束优化:
          maximize_θ  g^T(θ - θ_old)
          subject to  (1/2)(θ - θ_old)^T F (θ - θ_old) ≤ δ
9.     更新: θ_i+1 = θ_i + √(2δ / g^T F^{-1} g) · F^{-1}g
10.    若实际 KL 散度超限，回退到指数平均
11. end for
```

##### 动机与背景

策略梯度方法（如 REINFORCE）的核心痛点是**步长极度敏感**：步长太小则收敛缓慢，步长稍大会导致策略发生灾难性更新——一旦策略跳到 bad region，后续采样的数据质量骤降，形成恶性循环。这一问题的根源在于策略梯度缺乏对更新幅度的可靠约束：参数空间的小步长可能对应策略分布的巨大变化。

此前的工作（如 Kakade & Langford 2002）已提出了保守策略迭代（CPI）的理论框架，证明了混合策略更新可以保证单调改进。但 CPI 要求将新策略与旧策略按固定比例混合 ((1-α)π_old + απ')，在实践中有严重局限。TRPO 的突破在于**将理论上的单调改进保证转化为一个可扩展的、基于约束的优化问题**，使得每一步更新都"安全"地提升性能。

##### 核心机制一：单调改进下界的证明

TRPO 的理论基石是 Kakade & Langford (2002) 的恒等式（论文等式 1）：

$$\eta(\tilde{\pi}) = \eta(\pi) + \mathbb{E}_{\tau \sim \tilde{\pi}}\left[\sum_{t=0}^{\infty} \gamma^t A_{\pi}(s_t, a_t)\right]$$

此等式将新策略的期望回报 η(π̃) 分解为旧策略回报 η(π) 加上**在新策略轨迹上累积的旧策略优势**。问题在于，期望是对新策略轨迹取的，而新策略尚未部署，因此无法直接利用此等式做优化。

为解决此问题，引入**替代目标函数** L_π(π̃)（论文等式 3）——用旧策略的状态访问频率 ρ_π 替代新策略的访问频率：

$$L_{\pi}(\tilde{\pi}) = \eta(\pi) + \sum_s \rho_{\pi}(s) \sum_a \tilde{\pi}(a|s) A_{\pi}(s,a)$$

当新旧策略差异很小时，L_π 与 η(π̃) 一阶近似相等。TRPO 的核心理论贡献在于证明了它们之间的差距可以被 KL 散度上界（论文等式 9）：

$$\eta(\tilde{\pi}) \geq L_{\pi}(\tilde{\pi}) - C \cdot D_{\text{KL}}^{\max}(\pi, \tilde{\pi})$$

其中惩罚系数 C = 4εγ/(1-γ)²，ε = max_{s,a} |A_π(s,a)|，D_KL^max = max_s D_KL(π(·|s) || π̃(·|s))。

> 💡 **关键直觉**：如果我们通过**最大化 L_π 同时限制 KL 散度**来更新策略，就可以保证新策略的真实回报至少不下降低——即**单调改进**。这是 TRPO 信任域概念的数学根基。

##### 核心机制二：从理论下界到信任域约束

直接最大化下界在实践中有严重问题：惩罚系数 C 通常非常大（当 γ 接近 1 时，C ∝ 1/(1-γ)²），导致步长极小，算法几乎不动。TRPO 的关键工程创新是将惩罚改为**硬约束**（论文第 4 节）：

$$\max_{\theta} L_{\theta_{\text{old}}}(\theta) \quad \text{s.t.} \quad \bar{D}_{\text{KL}}^{\rho}(\theta_{\text{old}}, \theta) \leq \delta$$

其中 D̄_KL^ρ 为平均 KL 散度（用旧策略的访问频率 ρ 加权）。使用平均 KL 而非最大 KL 使约束更灵活且便于计算。

求解此约束问题采用**自然梯度**方法：在旧参数处对 L 做一阶泰勒展开，对 KL 散度做二阶展开（其二阶导数正是 Fisher 信息矩阵 F），问题化为闭式解：

$$\theta_{\text{new}} = \theta_{\text{old}} + \sqrt{\frac{2\delta}{g^T F^{-1} g}} \cdot F^{-1} g$$

其中 g = ∇_θ L_{θ_old}(θ)|_{θ=θ_old}，F^{-1}g 即为**自然梯度**。在深度神经网络中 F 可能不可逆，需通过共轭梯度法求解 Fx = g 并添加微小阻尼。

> ⚠️ **注意**：与标准自然梯度使用固定惩罚系数不同，TRPO 使用**固定 KL 散度阈值 δ** 并动态调整实际步长（通过系数 √(2δ/g^T F^{-1} g) 缩放）。这使其更鲁棒且无需手动调优惩罚参数。

##### 两种采样估计方案（论文第 5 节）

TRPO 提出两种轨迹采集方案来估计目标函数 L_θ_old 和 KL 约束：

**Single-Path（单路径）**：用当前策略采集 N 条完整轨迹，直接用重要性采样比率 π_θ/π_θ_old 和优势估计 Â 构造 L。优势估计可使用 GAE（广义优势估计）或 Monte Carlo 回报。这是最常用的方案，适用于无模型场景，计算高效。

**Vine（藤蔓）**：对每个状态 s_t，额外 rollout 多个动作来估计 Q 值，再用 Q 值计算 L。此方案需要可重置的仿真器交互（有模型或仿真器），但估计更精确。实验中 Vine 在某些 MuJoCo 任务上略微占优，但计算成本更高。

最终实用算法（第 6 节 TRPO Practical Algorithm）采用 Single-Path + GAE + 共轭梯度求解的方式。

##### 与前世方法的对比

| 方法 | 更新方式 | 步长控制 | 单调改进保证 |
|------|----------|----------|--------------|
| Kakade CPI (2002) | 混合策略 π_new = (1-α)π_old + απ' | 固定混合比例 α | 有理论保证 |
| 自然梯度 (Kakade 2002) | π_new 沿自然梯度移动 | 固定惩罚系数 λ | 无保证 |
| **TRPO** | **约束优化，自然梯度求解** | **固定 KL 阈值 δ，动态调步长** | **有下界保证** |

TRPO 的创新在于：保留了理论下界的保证，同时通过硬约束 + 动态步长将其实用化，成为首个在大规模神经网络上稳定运行的策略梯度方法。

#### 🧪 练习题

```yaml
question: "TRPO 的信任域约束直接限制的是什么？"
options:
  - "新旧策略参数向量的 L2 距离"
  - "新旧策略分布之间的平均 KL 散度"
  - "新旧策略回报的绝对差值"
  - "梯度更新步长的绝对值"
answer: 1
explain: "TRPO 约束的是新旧策略分布间的平均 KL 散度 D̄_KL ≤ δ，而非参数空间的 L2 距离。这使得约束与策略空间的实际变化直接相关，不受参数重参数化的影响，是信任域方法的核心特征。"
```