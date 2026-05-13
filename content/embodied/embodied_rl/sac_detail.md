### SAC — 软演员-评论家 (Soft Actor-Critic)

```yaml
id: sac
name: SAC
full_name: 软演员-评论家 (Soft Actor-Critic)
year: '2018'
org: UC Berkeley
paper_url: https://arxiv.org/abs/1801.01290
category: foundation
parent: ddpg
motivation: 最大熵框架提升探索与鲁棒性
```

#### 📝 一句话总结

SAC 提出了基于最大熵强化学习框架的 off-policy actor-critic 算法，通过在策略优化目标中同时最大化累积奖励与策略熵，显著提升了连续控制任务中的探索能力、样本效率和训练稳定性。

#### 🎯 核心要点

- **最大熵目标函数**：在标准 RL 目标上增加策略熵项 \(\alpha \mathcal{H}(\pi(\cdot|s))\)，鼓励策略在完成任务的同时尽可能随机
- **三类函数逼近器**：Soft Q 网络 \(Q_\theta\)（双份）、Soft 价值网络 \(V_\psi\)、随机策略网络 \(\pi_\phi\)
- **Soft Policy Iteration 理论保证**：交替执行 Soft 策略评估与 Soft 策略改进，证明收敛到最优最大熵策略（Theorem 1）
- **双 Q 网络**：使用两个独立训练的 Q 函数取最小值，缓解 Q 值正偏差（借鉴 TD3/Double DQN）
- **重参数化技巧**：策略采样 \(a = f_\phi(\epsilon; s)\)，使策略梯度可通过 Q 网络反向传播
- **目标网络 EMA 更新**：\(\bar{\psi} \leftarrow \tau \psi + (1-\tau)\bar{\psi}\)，稳定训练
- **Off-policy + 经验回放**：从 replay buffer 采样更新，样本效率远超 on-policy 方法
- **基准测试**：在 MuJoCo 连续控制任务（Hopper、Walker2d、HalfCheetah、Ant、Humanoid）上全面超越 DDPG、PPO、TD3 等方法，且跨随机种子稳定性极强

#### 🔬 深入细节

##### 核心训练曲线

![SAC 在连续控制基准上的训练曲线](https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x1.png)
![SAC 训练曲线 - Walker2d](https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x2.png)
![SAC 训练曲线 - HalfCheetah](https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x3.png)
![SAC 训练曲线 - Ant](https://ar5iv.labs.arxiv.org/html/1801.01290/assets/x4.png)

*图：SAC（黄色）在 Hopper、Walker2d、HalfCheetah、Ant 等连续控制基准上的训练曲线。SAC 在所有任务上表现一致，并在最具挑战性的任务中超越了 on-policy 和 off-policy 基线方法。*

##### 算法伪代码

```
Algorithm 1: Soft Actor-Critic
────────────────────────────────────
初始化参数向量 ψ, ψ̄, θ₁, θ₂, ϕ

for each iteration do
    for each environment step do
        aₜ ~ πϕ(aₜ|sₜ)                    # 从随机策略采样动作
        sₜ₊₁ ~ p(sₜ₊₁|sₜ, aₜ)             # 环境转移
        D ← D ∪ {(sₜ, aₜ, r(sₜ,aₜ), sₜ₊₁)}  # 存入回放缓冲区
    end for

    for each gradient step do
        ψ ← ψ − λ_V ∇̂_ψ J_V(ψ)           # 更新价值网络
        θᵢ ← θᵢ − λ_Q ∇̂_θᵢ J_Q(θᵢ)       # 更新双 Q 网络 (i∈{1,2})
        ϕ ← ϕ − λ_π ∇̂_ϕ J_π(ϕ)           # 更新策略网络
        ψ̄ ← τψ + (1−τ)ψ̄                  # EMA 更新目标网络
    end for
end for
```

##### 动机与背景

传统无模型深度强化学习面临两大核心挑战：**样本效率低**和**超参数敏感**。On-policy 方法（如 TRPO、PPO、A3C）每次梯度更新都需要采集新样本，代价极高；off-policy 方法（如 DDPG）虽然可以复用历史数据，但在连续动作空间中使用确定性策略，容易陷入局部最优且训练不稳定。

SAC 的核心动机是引入**最大熵强化学习框架**（Maximum Entropy RL），在策略优化目标中同时最大化累积奖励和策略的熵。这一设计的直觉是：在完成任务的前提下，策略应当尽可能"随机"——这不仅促进了更充分的探索，还使策略能够捕获多种近优行为模式，提升了对环境扰动的鲁棒性。

##### 最大熵目标函数

SAC 的核心优化目标为：

$$J(\pi) = \sum_{t=0}^{T} \mathbb{E}_{(s_t, a_t) \sim \rho_\pi} \left[ r(s_t, a_t) + \alpha \mathcal{H}(\pi(\cdot|s_t)) \right]$$

其中 \(\alpha\) 为温度参数，控制熵项相对于奖励的重要性。当 \(\alpha \to 0\) 时退化为标准 RL 目标。熵项 \(\mathcal{H}(\pi(\cdot|s)) = -\mathbb{E}[\log \pi(a|s)]\) 鼓励策略输出更均匀的动作分布。

> 💡 **关键直觉**：最大熵目标使策略在多个同样好的动作之间分配概率，而非贪婪地选择单一动作。这带来三个好处：(1) 更广泛的探索；(2) 捕获多模态行为；(3) 对环境变化更鲁棒。

##### Soft Bellman Backup 与策略评估

在最大熵框架下，标准 Bellman 方程被推广为 **Soft Bellman Backup**：

$$\mathcal{T}^\pi Q(s_t, a_t) \triangleq r(s_t, a_t) + \gamma \mathbb{E}_{s_{t+1} \sim p} \left[ V(s_{t+1}) \right]$$

其中 Soft 价值函数定义为：

$$V(s_t) = \mathbb{E}_{a_t \sim \pi} \left[ Q(s_t, a_t) - \log \pi(a_t|s_t) \right]$$

注意与标准 Bellman 方程的关键区别：价值函数中包含了策略的对数概率项 \(-\log \pi(a|s)\)，这正是熵奖励的体现。论文证明（Lemma 1），反复应用 Soft Bellman Backup 算子 \(\mathcal{T}^\pi\) 将收敛到策略 \(\pi\) 的真实 Soft Q 值。

##### Soft 策略改进

在策略改进步骤中，新策略通过最小化与指数化 Q 函数之间的 KL 散度获得：

$$\pi_{\text{new}} = \arg\min_{\pi' \in \Pi} D_{\text{KL}} \left( \pi'(\cdot|s_t) \;\middle\|\; \frac{\exp(Q^{\pi_{\text{old}}}(s_t, \cdot))}{Z^{\pi_{\text{old}}}(s_t)} \right)$$

论文证明（Lemma 2），这一更新保证新策略的 Soft Q 值不低于旧策略，即 \(Q^{\pi_{\text{new}}}(s, a) \geq Q^{\pi_{\text{old}}}(s, a)\)。交替执行策略评估和策略改进（Theorem 1），算法收敛到策略类 \(\Pi\) 中的最优最大熵策略。

> ⚠️ **注意**：配分函数 \(Z^{\pi_{\text{old}}}(s_t)\) 虽然不可解析计算，但它不依赖于新策略参数 \(\phi\)，因此在梯度计算中可以忽略。

##### 实用算法：三网络协同训练

将理论框架实例化为深度学习算法，SAC 使用三类参数化函数逼近器：

**1. Soft 价值网络 \(V_\psi\)**：通过最小化残差的平方来训练：

$$J_V(\psi) = \mathbb{E}_{s_t \sim \mathcal{D}} \left[ \frac{1}{2} \left( V_\psi(s_t) - \mathbb{E}_{a_t \sim \pi_\phi} [Q_\theta(s_t, a_t) - \log \pi_\phi(a_t|s_t)] \right)^2 \right]$$

**2. Soft Q 网络 \(Q_{\theta_i}\)（双份）**：通过最小化 Soft Bellman 残差训练，使用目标价值网络 \(V_{\bar{\psi}}\) 计算目标值：

$$J_Q(\theta_i) = \mathbb{E}_{(s_t, a_t) \sim \mathcal{D}} \left[ \frac{1}{2} \left( Q_{\theta_i}(s_t, a_t) - r(s_t, a_t) - \gamma V_{\bar{\psi}}(s_{t+1}) \right)^2 \right]$$

**3. 策略网络 \(\pi_\phi\)**：通过最小化 KL 散度训练，等价于最大化：

$$J_\pi(\phi) = \mathbb{E}_{s_t \sim \mathcal{D}} \left[ D_{\text{KL}} \left( \pi_\phi(\cdot|s_t) \;\middle\|\; \frac{\exp(Q_\theta(s_t, \cdot))}{Z_\theta(s_t)} \right) \right]$$

策略使用**重参数化技巧**：动作通过 \(a_t = f_\phi(\epsilon_t; s_t)\) 生成（其中 \(\epsilon_t\) 为标准正态噪声），使梯度可以通过 Q 网络反向传播到策略参数。具体地，策略输出高斯分布的均值和对数标准差，动作通过 squashing function（tanh）映射到有界空间。

##### 与 DDPG/TD3 的关键区别

| 特性 | DDPG | TD3 | SAC |
|------|------|-----|-----|
| 策略类型 | 确定性 | 确定性 | **随机性** |
| 探索方式 | 外部噪声（OU/Gaussian） | 外部噪声 | **策略熵（内在）** |
| Q 网络数量 | 1 | 2 | **2** |
| 目标函数 | 标准 RL | 标准 RL | **最大熵 RL** |
| 价值网络 | 无独立 V | 无独立 V | **有独立 V** |
| 训练稳定性 | 差 | 较好 | **最好** |

SAC 相比 DDPG 的核心改进在于：(1) 使用随机策略替代确定性策略，探索不再依赖外部噪声；(2) 最大熵目标提供了内在的探索驱动力；(3) 双 Q 网络 + 独立价值网络的组合使训练更加稳定。

##### 实验亮点

SAC 在 OpenAI Gym 的 MuJoCo 连续控制基准上进行了全面评估，包括 Hopper-v1、Walker2d-v1、HalfCheetah-v1、Ant-v1 和 21 维 Humanoid 等任务。实验结果表明：

1. **性能**：SAC 在所有任务上均达到或超越当时的 SOTA，尤其在高维 Humanoid 任务上优势显著
2. **稳定性**：不同随机种子下的性能方差极小，远优于 DDPG 等 off-policy 方法
3. **消融实验**：验证了双 Q 网络、独立价值网络、随机策略等组件各自的贡献

#### 🧪 练习题

```yaml
question: "SAC 在标准 RL 目标函数基础上增加了什么项来改善探索？"
options:
  - "动作空间的 L2 正则化项"
  - "策略熵（entropy）最大化项"
  - "KL 散度惩罚项（约束新旧策略距离）"
  - "好奇心驱动的内在奖励项"
answer: 1
explain: "SAC 的核心创新是在目标函数中加入策略熵项 αH(π(·|s))，鼓励策略在完成任务的同时保持随机性，从而实现更充分的探索和更鲁棒的行为。"
```