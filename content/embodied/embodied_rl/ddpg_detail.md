### 深度确定性策略梯度 (Deep Deterministic Policy Gradient, DDPG)

```yaml
id: ddpg
name: DDPG
full_name: 深度确定性策略梯度 (Deep Deterministic Policy Gradient)
year: '2015'
org: DeepMind
paper_url: https://arxiv.org/abs/1509.02971
category: foundation
parent: —
motivation: 首次将DQN扩展至连续动作空间
```

#### 📝 一句话总结

DDPG 将 DQN 的**经验回放**与**目标网络**思想引入 Actor-Critic 框架，结合**确定性策略梯度**定理，首次实现了在高维连续动作空间中稳定、高效的端到端深度强化学习。

#### 🎯 核心要点

- **Actor-Critic 架构**：Actor 网络 \(\mu(s|\theta^\mu)\) 输出确定性动作，Critic 网络 \(Q(s,a|\theta^Q)\) 估计动作价值函数
- **经验回放缓冲区 (Replay Buffer)**：存储 \((s_t, a_t, r_t, s_{t+1})\) 转移元组，随机采样小批量训练，打破样本时序相关性
- **目标网络 (Target Network)**：Actor 和 Critic 各维护一个目标网络副本，通过软更新 \(\theta' \leftarrow \tau\theta + (1-\tau)\theta'\) 缓慢跟踪，稳定 TD 目标
- **Ornstein-Uhlenbeck 噪声**：为确定性策略添加时序相关的探索噪声，适合惯性物理控制任务
- **批归一化 (Batch Normalization)**：对网络各层输入归一化，解决不同物理量纲的状态特征尺度差异问题
- **20+ MuJoCo 物理控制任务**验证，包括 cartpole swing-up、灵巧操作、腿式运动等，且支持从原始像素端到端学习

#### 🔬 深入细节

##### 框架示意

![DDPG 测试环境示例](https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x1.png)
*图：DDPG 论文中使用的部分 MuJoCo 物理控制环境。从左到右：cartpole swing-up、reaching、grasp-and-move、puck-hitting。*

![DDPG 各组件消融实验](https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x2.png)
*图：不同 DPG 变体的性能曲线对比——原始 DPG（浅灰）、加入批归一化（浅灰）、加入目标网络（深灰）、完整 DDPG（彩色）。可以看到目标网络和批归一化对训练稳定性的关键作用。*

##### 算法伪代码

```python
# DDPG 算法核心流程
随机初始化 Critic 网络 Q(s,a|θ^Q) 和 Actor 网络 μ(s|θ^μ)
初始化目标网络: θ^Q' ← θ^Q, θ^μ' ← θ^μ
初始化经验回放缓冲区 R

for episode = 1 to M:
    初始化 Ornstein-Uhlenbeck 噪声过程 N
    获取初始观测 s_1
    for t = 1 to T:
        # 选择动作（确定性策略 + 探索噪声）
        a_t = μ(s_t|θ^μ) + N_t

        # 执行动作，获取奖励和下一状态
        r_t, s_{t+1} = env.step(a_t)

        # 存入经验回放
        R.store((s_t, a_t, r_t, s_{t+1}))

        # 从 R 中随机采样 mini-batch (s_i, a_i, r_i, s_{i+1})
        # 计算 TD 目标
        y_i = r_i + γ · Q'(s_{i+1}, μ'(s_{i+1}|θ^μ')|θ^Q')

        # 更新 Critic：最小化 L = (1/N) Σ (y_i - Q(s_i,a_i|θ^Q))²
        update θ^Q by minimizing L

        # 更新 Actor：沿策略梯度方向
        ∇_{θ^μ} J ≈ (1/N) Σ ∇_a Q(s,a|θ^Q)|_{a=μ(s)} · ∇_{θ^μ} μ(s|θ^μ)

        # 软更新目标网络
        θ^Q' ← τ·θ^Q + (1-τ)·θ^Q'
        θ^μ' ← τ·θ^μ + (1-τ)·θ^μ'
```

##### 动机与背景

DQN (Mnih et al., 2015) 在 Atari 游戏上取得了突破性成功，但其核心操作——对所有动作取 \(\arg\max_a Q(s,a)\)——要求动作空间是离散且低维的。然而，机器人控制、自动驾驶等真实物理任务天然具有**连续高维动作空间**（如关节力矩、电机电压）。简单地将连续空间离散化会遭遇**维度灾难**：一个 7 自由度机械臂即使每个关节仅 3 档离散化，动作空间也达到 \(3^7 = 2187\) 维。

> 💡 **关键洞察**：DDPG 的核心思路是——既然无法在连续空间中枚举 \(\arg\max\)，不如直接用一个神经网络（Actor）来**学习**从状态到最优动作的映射 \(\mu(s)\)，同时用另一个网络（Critic）来评估该动作的好坏。

##### 核心机制：确定性策略梯度

DDPG 建立在 Silver et al. (2014) 提出的**确定性策略梯度 (DPG)** 定理之上。与随机策略 \(\pi(a|s)\) 不同，确定性策略 \(\mu: \mathcal{S} \to \mathcal{A}\) 直接输出一个确定的动作值。DPG 定理证明，确定性策略的性能梯度为：

$$\nabla_{\theta^\mu} J \approx \mathbb{E}_{s \sim \rho^\beta}\left[\nabla_a Q(s,a|\theta^Q)\big|_{a=\mu(s|\theta^\mu)} \cdot \nabla_{\theta^\mu} \mu(s|\theta^\mu)\right]$$

这个梯度的直觉非常清晰：
1. **\(\nabla_a Q(s,a)\)**：Critic 告诉 Actor "动作往哪个方向调整能提高 Q 值"
2. **\(\nabla_{\theta^\mu} \mu(s)\)**：Actor 通过链式法则将这个信号反向传播到自身参数

> ⚠️ **注意**：与随机策略梯度不同，确定性策略梯度**不需要对动作空间积分**，这使得它在高维连续动作空间中计算效率更高。

##### Critic 的训练：Bellman 方程与 TD 学习

Critic 网络通过最小化 TD 误差来逼近真实的动作价值函数。对于从经验回放中采样的转移 \((s_i, a_i, r_i, s_{i+1})\)，TD 目标为：

$$y_i = r_i + \gamma \, Q'(s_{i+1}, \mu'(s_{i+1}|\theta^{\mu'})|\theta^{Q'})$$

其中 \(Q'\) 和 \(\mu'\) 是**目标网络**。Critic 的损失函数为：

$$L = \frac{1}{N}\sum_i \left(y_i - Q(s_i, a_i|\theta^Q)\right)^2$$

##### 稳定训练的三大技巧

**1. 经验回放 (Experience Replay)**

与 DQN 相同，DDPG 将所有交互经验 \((s, a, r, s')\) 存入一个有限大小的缓冲区，训练时随机采样小批量。这一机制：
- 打破了在线学习中样本的时序相关性
- 提高了数据利用效率（每条经验可被多次使用）
- 使得训练过程更接近 i.i.d. 假设

**2. 目标网络软更新 (Soft Target Update)**

DQN 使用硬拷贝（每隔固定步数完全复制参数），而 DDPG 创新性地采用**软更新**：

$$\theta' \leftarrow \tau\theta + (1-\tau)\theta', \quad \tau \ll 1$$

论文中 \(\tau = 0.001\)。这意味着目标网络的参数缓慢跟踪主网络，避免了 TD 目标的剧烈波动，显著提升了训练稳定性。

> 💡 **关键**：软更新是 DDPG 相比 DQN 的重要改进之一。硬拷贝会导致目标值在更新瞬间发生跳变，而软更新使目标值平滑变化，约束了优化景观。

**3. 批归一化 (Batch Normalization)**

不同物理任务的状态特征量纲差异巨大（如位置可能是米级，速度可能是弧度/秒级）。DDPG 在 Actor 和 Critic 网络的每一层输入前应用批归一化，将特征归一化到相似尺度，使得同一套超参数可以跨任务通用。

##### 探索策略：Ornstein-Uhlenbeck 噪声

由于确定性策略本身不具备探索能力，DDPG 通过向动作添加噪声来实现探索：

$$a_t = \mu(s_t|\theta^\mu) + \mathcal{N}_t$$

论文选择了 **Ornstein-Uhlenbeck (OU) 过程**作为噪声源。OU 过程生成的噪声具有**时序相关性**（均值回复特性），相比独立高斯噪声更适合物理控制任务——因为这些任务通常具有惯性，时序相关的探索能产生更有意义的动作序列。

##### 与 DQN 的核心区别

| 特性 | DQN | DDPG |
|------|-----|------|
| 动作空间 | 离散 | 连续 |
| 策略类型 | 隐式（\(\arg\max Q\)） | 显式 Actor 网络 |
| 目标网络更新 | 硬拷贝（周期性） | 软更新（每步） |
| 探索方式 | ε-greedy | OU 噪声 |
| 网络数量 | 1 个 Q 网络 | Actor + Critic 各 2 个（含目标） |

##### 实验验证

![Q 值估计精度](https://ar5iv.labs.arxiv.org/html/1509.02971/assets/x3.png)
*图：估计 Q 值与实际回报的密度图。在简单任务（pendulum、cartpole）中 Q 值估计准确，复杂任务中存在一定高估但仍能学到有效策略。*

DDPG 在 20+ MuJoCo 物理控制任务上使用**完全相同的网络结构和超参数**取得了优异表现，部分任务甚至超越了拥有完整动力学模型的规划算法 (iLQG)。此外，DDPG 在多个任务中成功实现了从原始像素到控制信号的端到端学习。

#### 🧪 练习题

```yaml
question: "DDPG 中目标网络的软更新机制 θ' ← τθ + (1-τ)θ' 的主要作用是什么？"
options:
  - "加速 Actor 网络的收敛速度"
  - "使 TD 目标缓慢变化，避免训练过程中目标值剧烈波动"
  - "减少经验回放缓冲区的内存占用"
  - "增强探索噪声的时序相关性"
answer: 1
explain: "软更新通过极小的 τ（如 0.001）使目标网络参数缓慢跟踪主网络，从而让 TD 目标平滑变化，避免了硬拷贝导致的目标值跳变，显著提升训练稳定性。"
```