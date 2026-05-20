### PPO: Proximal Policy Optimization

| 属性 | 内容 |
|------|------|
| **id** | ppo |
| **name** | PPO (Proximal Policy Optimization) |
| **year** | 2017 |
| **org** | OpenAI |
| **authors** | John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov |
| **url** | https://arxiv.org/abs/1707.06347 |
| **citation** | Schulman et al., "Proximal Policy Optimization Algorithms", arXiv 2017 |
| **motivation** | 提出一种新的策略梯度方法，通过裁剪目标函数（clipped surrogate objective）简化TRPO的trust region约束，在保持TRPO稳定性的同时实现更简单的实现和更好的样本效率。 |
| **tl;dr** | PPO通过clip操作限制策略更新幅度，用一阶优化实现了TRPO的trust region效果，成为深度强化学习中最广泛使用的策略优化算法之一。 |

---

## 1. 问题背景与动机

策略梯度方法（policy gradient methods）是深度强化学习的核心方法之一，其基本思想是通过梯度上升直接优化策略参数。然而，vanilla policy gradient（如REINFORCE [Wil92]）面临两个关键问题：

1. **样本效率低**：每次梯度更新只能使用一次采样数据（on-policy），数据利用效率低下。
2. **步长敏感**：策略更新步长难以调节——步长过小导致训练缓慢，步长过大则可能导致策略"崩溃"（catastrophic collapse），即一次不好的更新使策略进入不可恢复的差状态。

TRPO（Trust Region Policy Optimization）[Sch+15b] 通过引入KL散度约束（trust region constraint）解决了步长敏感问题，其核心思想是：在每次更新时，限制新旧策略之间的KL散度不超过阈值δ，从而保证策略改进的单调性。TRPO的目标函数为：

$$\max_\theta \mathbb{E}_t\left[\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{old}}(a_t|s_t)}\hat{A}_t\right] \quad \text{s.t.} \quad \mathbb{E}_t[KL[\pi_{\theta_{old}}(\cdot|s_t), \pi_\theta(\cdot|s_t)]] \leq \delta$$

然而，TRPO的实现复杂度较高：需要计算二阶导数（Fisher信息矩阵）并使用共轭梯度法求解约束优化问题，这在实际应用中引入了大量的计算开销和实现难度。

PPO的核心动机是：**能否在保持TRPO稳定性和可靠性的前提下，仅使用一阶优化（如SGD/Adam）来实现策略更新？**

## 2. 核心方法

### 2.1 Clipped Surrogate Objective（裁剪替代目标）

PPO的核心创新是提出了一种**clipped surrogate objective function**，通过简单的clip操作限制策略更新幅度，避免TRPO中复杂的二阶约束优化。

定义概率比（probability ratio）：

$$r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{old}}(a_t|s_t)}$$

其中 $r_t(\theta_{old}) = 1$。TRPO的替代目标函数为 $L^{CPI}(\theta) = \mathbb{E}_t[r_t(\theta)\hat{A}_t]$（CPI = Conservative Policy Iteration [KL02]）。在没有约束的情况下，最大化 $L^{CPI}$ 会导致过大的策略更新。

PPO的**clipped surrogate objective**为：

$$L^{CLIP}(\theta) = \mathbb{E}_t\left[\min\left(r_t(\theta)\hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t\right)\right]$$

其中 $\epsilon$ 是超参数（论文推荐 $\epsilon=0.2$）。clip函数将 $r_t(\theta)$ 限制在 $[1-\epsilon, 1+\epsilon]$ 范围内。

**直觉解释**：
- 当优势函数 $\hat{A}_t > 0$（动作好于预期）时，目标函数为 $\min(r_t(\theta), 1+\epsilon)\hat{A}_t$，即鼓励增大该动作的概率，但上界被限制为 $(1+\epsilon)\hat{A}_t$，防止概率比过大。
- 当优势函数 $\hat{A}_t < 0$（动作差于预期）时，目标函数为 $\max(r_t(\theta), 1-\epsilon)\hat{A}_t$，即鼓励减小该动作的概率，但下界被限制为 $(1-\epsilon)\hat{A}_t$，防止概率比过小。

取min操作确保目标函数是CPI目标的下界（pessimistic bound），从而保证策略更新不会过度偏离旧策略。

### 2.2 Adaptive KL Penalty Coefficient（自适应KL惩罚系数）

作为clip方法的替代方案，论文还提出了使用KL散度惩罚项的方法：

$$L^{KLPEN}(\theta) = \mathbb{E}_t\left[r_t(\theta)\hat{A}_t - \beta KL[\pi_{\theta_{old}}(\cdot|s_t), \pi_\theta(\cdot|s_t)]\right]$$

其中 $\beta$ 是自适应调整的惩罚系数。调整规则为：
- 计算当前KL散度 $d = \mathbb{E}_t[KL[\pi_{\theta_{old}}(\cdot|s_t), \pi_\theta(\cdot|s_t)]]$
- 如果 $d < d_{targ} / 1.5$，则 $\beta \leftarrow \beta / 2$
- 如果 $d > d_{targ} \times 1.5$，则 $\beta \leftarrow \beta \times 2$

实验表明，clip方法通常优于KL惩罚方法，因此clip版本成为PPO的事实标准。

### 2.3 算法框架

PPO采用Actor-Critic架构，完整的算法流程如下：

**Algorithm: PPO, Actor-Critic Style**

```
for iteration = 1, 2, ... do
    for actor = 1, 2, ..., N do
        使用策略 π_θold 在环境中运行 T 个时间步
        计算优势估计 Â_1, ..., Â_T
    end for
    对 L(θ) 使用小批量SGD/Adam优化 K 个epoch
    θ_old ← θ
end for
```

**关键设计**：
1. **多轮更新**：同一批数据可以进行 K 个epoch的优化（论文中K=10），大幅提高样本效率。
2. **优势估计**：使用GAE（Generalized Advantage Estimation）[Sch+15a] 计算优势函数，平衡偏差和方差。
3. **额外损失项**：完整的损失函数包含价值函数误差和熵奖励：

$$L^{CLIP+VF+S}(\theta) = \mathbb{E}_t\left[L^{CLIP}(\theta) - c_1 L^{VF}(\theta) + c_2 S[\pi_\theta](s_t)\right]$$

其中 $L^{VF}$ 是价值函数的均方误差，$S$ 是策略熵奖励（鼓励探索），$c_1, c_2$ 是权重系数。

## 3. 理论分析

PPO的理论基础可追溯到Kakade和Langford [KL02] 的Conservative Policy Iteration（CPI）理论，该理论证明：如果每次策略更新足够"保守"（即新旧策略之间的差异有界），则策略改进是单调的。TRPO通过KL散度约束实现保守更新，而PPO通过clip操作实现类似的约束效果。

PPO的clip操作可以理解为一种**隐式的trust region**：
- 当 $r_t(\theta)$ 超出 $[1-\epsilon, 1+\epsilon]$ 时，梯度被截断为0（因为min操作选中了clip常数项），策略参数不再更新
- 这等价于在概率比空间上施加了一个硬边界约束

与TRPO的区别：
- TRPO使用二阶方法（共轭梯度）求解约束优化
- PPO使用一阶方法（SGD/Adam）优化无约束目标，通过clip隐式实现约束
- PPO的实现代码量显著少于TRPO，仅需在vanilla policy gradient基础上添加几行代码

## 4. 实验结果

### 4.1 替代目标函数比较（MuJoCo连续控制）

在7个MuJoCo环境（HalfCheetah, Hopper, InvertedDoublePendulum, InvertedPendulum, Reacher, Swimmer, Walker2d）上训练100万时间步：

| 算法 | 平均标准化分数 |
|------|:---------:|
| No clipping or penalty | -0.39 |
| **Clipping, ε=0.2** | **0.82** |
| Clipping, ε=0.1 | 0.76 |
| Clipping, ε=0.3 | 0.70 |
| Adaptive KL, d_targ=0.01 | 0.74 |
| Fixed KL, β=1 | 0.71 |

- Clip方法（ε=0.2）表现最佳，显著优于无约束版本（-0.39 vs 0.82）
- 过大的ε（0.3）和过小的ε（0.1）都会降低性能
- Clip方法整体优于KL惩罚方法

### 4.2 与其他算法比较（连续控制）

在相同的MuJoCo基准上与多种方法对比：

| 方法 | 性能 |
|------|------|
| **PPO (Clip)** | **最优** |
| TRPO | 次优 |
| A2C | 中等 |
| A2C + Trust Region | 中等 |
| CEM | 较差 |
| Vanilla PG (Adaptive) | 较差 |

PPO在几乎所有7个环境上超过或匹配了TRPO和A2C。

### 4.3 高维连续控制展示（Humanoid）

在3D人形机器人任务（RoboschoolHumanoid）上展示了PPO的可扩展性：
- **Humanoid-v0**：前向行走，达到约4000分
- **HumanoidFlagrun-v0**：随机目标位置，机器人能跑向目标并在目标变化时转向
- **HumanoidFlagrunHarder-v0**：机器人被方块击倒后需要重新站起

这些任务展示了PPO在高维（>100维动作空间）连续控制中的有效性。

### 4.4 Atari游戏比较

在49个Atari游戏上与A2C和ACER比较（40M游戏帧训练）：

| 评分指标 | A2C | ACER | PPO |
|----------|:---:|:----:|:---:|
| 全程平均奖励 | 1胜 | 18胜 | **30胜** |
| 最后100回合平均奖励 | 1胜 | 28胜 | 19胜 |

PPO在学习速度上显著优于ACER（30胜 vs 18胜），在最终性能上略逊于ACER（19胜 vs 28胜），但整体表现强劲。在所有49个游戏上，PPO从未出现训练崩溃或不稳定的情况。

## 5. 关键超参数

| 超参数 | MuJoCo值 | Atari值 | 说明 |
|--------|:--------:|:-------:|------|
| Horizon (T) | 2048 | 128 | 每次收集的时间步数 |
| Adam stepsize | 3×10⁻⁴ | 2.5×10⁻⁴×α | 学习率（α线性衰减） |
| Num. epochs (K) | 10 | 3 | 每批数据的优化轮数 |
| Minibatch size | 64 | 32×8 | 小批量大小 |
| Discount (γ) | 0.99 | 0.99 | 折扣因子 |
| GAE parameter (λ) | 0.95 | 0.95 | GAE参数 |
| Clipping ε | 0.2 | 0.1×α | Clip范围（α从1线性衰减至0） |
| Num. actors (N) | - | 8 | 并行Actor数量 |
| VF coeff. c₁ | - | 1 | 价值函数损失权重 |
| Entropy coeff. c₂ | - | 0.01 | 熵奖励权重 |

## 6. 局限性

1. **On-policy本质**：PPO仍是on-policy算法，需要当前策略的采样数据，样本效率不如off-policy方法（如SAC、DQN）。
2. **超参数敏感性**：虽然PPO比TRPO更鲁棒，但ε、K等超参数仍需针对不同任务调节。
3. **离散动作空间**：在Atari上的最终性能不如ACER，说明clip机制在离散动作空间可能不是最优策略约束方式。
4. **缺乏理论保证**：与TRPO不同，PPO的clip操作缺乏严格的单调改进理论保证，更多依赖经验验证。
5. **奖励尺度敏感**：优势函数的尺度影响有效clip范围，可能需要reward normalization或adaptive ε。

## 7. 影响与后续工作

PPO自2017年提出以来，已成为深度强化学习领域最具影响力的算法之一：

1. **工业应用**：OpenAI Five（Dota 2）、OpenAI's Dexterous Hand Manipulation等里程碑项目均使用PPO作为核心算法。
2. **RLHF**：在LLM的RLHF（Reinforcement Learning from Human Feedback）中，PPO是事实上的标准优化算法，被用于ChatGPT、Claude等模型的训练。
3. **后续改进**：
   - **Phasic Policy Gradient (PPG)**：分离策略和价值函数优化阶段
   - **Decoupled PPO**：解耦clip范围和学习率衰减
   - **PPO with learned clipping**：自适应调整ε
4. **工具实现**：Stable-Baselines3、RLlib、CleanRL等主流RL库均提供了高效的PPO实现。
5. **理论分析**：后续工作对PPO的clip机制进行了更深入的理论分析，部分揭示了其隐式trust region的性质。

PPO的核心贡献在于证明了：通过简单的clip技巧，一阶优化方法可以达到甚至超越复杂二阶trust region方法的性能，极大地降低了深度强化学习算法的实现门槛。