---
domain: embodied
topic_id: embodied_rl
topic_name: 具身强化学习
page_icon: "\U0001F916"
page_title: 具身强化学习算法总结
page_subtitle: '{build_date} 版'
page_desc: 系统梳理具身智能中强化学习的发展历程，涵盖从基础控制策略到Sim2Real迁移、离线RL预训练及复杂技能层次化学习的技术演进。
hero_pills:
- "\U0001F3F7️ Sim2Real · 离线RL · 技能学习 · 奖励设计"
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 奠基算法
    color: '#22a06b'
  sim2real:
    label: 跨域迁移
    color: '#5b63d3'
  offline_rl:
    label: 离线强化学习
    color: '#e8820c'
  skill_hierarchical:
    label: 技能与层次化
    color: '#d32f2f'
  reward_design:
    label: 奖励与表征
    color: '#00acc1'
  world_model:
    label: 世界模型RL
    color: '#9c27b0'
image_base: ../../content/embodied/embodied_rl/assets/
---

## 领域综述

### 待定
待定。

## 算法演化关系

```yaml
nodes:
- id: ddpg
  x: 100
  y: 80
  category: foundation
- id: trpo
  x: 100
  y: 120
  category: foundation
- id: ppo
  x: 200
  y: 120
  category: foundation
- id: sac
  x: 300
  y: 80
  category: foundation
- id: td3
  x: 300
  y: 40
  category: foundation
- id: domain_rand
  x: 200
  y: 160
  category: sim2real
- id: viral
  x: 900
  y: 140
  category: sim2real
- id: lfi_dr
  x: 900
  y: 180
  category: sim2real
- id: falcon
  x: 900
  y: 100
  category: sim2real
- id: hdmi
  x: 950
  y: 140
  category: sim2real
- id: lide
  x: 900
  y: 220
  category: sim2real
- id: bcq
  x: 400
  y: 240
  category: offline_rl
- id: cql
  x: 500
  y: 240
  category: offline_rl
- id: iql
  x: 600
  y: 240
  category: offline_rl
- id: td3bc
  x: 600
  y: 200
  category: offline_rl
- id: unifloral
  x: 800
  y: 240
  category: offline_rl
- id: cpql
  x: 900
  y: 260
  category: offline_rl
- id: safefql
  x: 900
  y: 300
  category: offline_rl
- id: gail
  x: 150
  y: 320
  category: skill_hierarchical
- id: option_critic
  x: 200
  y: 360
  category: skill_hierarchical
- id: feudal
  x: 200
  y: 400
  category: skill_hierarchical
- id: her
  x: 200
  y: 280
  category: skill_hierarchical
- id: diayn
  x: 300
  y: 320
  category: skill_hierarchical
- id: hiro
  x: 300
  y: 400
  category: skill_hierarchical
- id: skillrl
  x: 900
  y: 360
  category: skill_hierarchical
- id: metaworld_hrl
  x: 950
  y: 380
  category: skill_hierarchical
- id: hcc
  x: 950
  y: 340
  category: skill_hierarchical
- id: icm
  x: 200
  y: 480
  category: reward_design
- id: rnd
  x: 300
  y: 480
  category: reward_design
- id: lagea
  x: 900
  y: 460
  category: reward_design
- id: mrbt
  x: 950
  y: 460
  category: reward_design
- id: vsimr
  x: 800
  y: 480
  category: reward_design
- id: mbpo
  x: 400
  y: 560
  category: world_model
- id: dreamerv1
  x: 400
  y: 600
  category: world_model
- id: dreamerv2
  x: 500
  y: 600
  category: world_model
- id: dreamerv3
  x: 700
  y: 600
  category: world_model
- id: dreamdojo
  x: 900
  y: 580
  category: world_model
- id: adaworldpolicy
  x: 950
  y: 600
  category: world_model
- id: rwml
  x: 900
  y: 620
  category: world_model
- id: hy_embodied
  x: 900
  y: 540
  category: world_model
edges:
- from: trpo
  to: ppo
  label: 简化约束
- from: ddpg
  to: sac
  label: 最大熵
- from: ddpg
  to: td3
  label: 双Q网络
- from: domain_rand
  to: viral
  label: 视觉随机化
- from: domain_rand
  to: lfi_dr
  label: 参数推理
- from: domain_rand
  to: lide
  label: 规划引导
- from: sac
  to: falcon
  label: 力控制
- from: viral
  to: hdmi
  label: 视频学习
- from: ddpg
  to: bcq
  label: 约束动作
- from: bcq
  to: cql
  label: 保守估计
- from: cql
  to: iql
  label: 隐式策略
- from: td3
  to: td3bc
  label: BC正则
- from: cql
  to: unifloral
  label: 统一协议
- from: cql
  to: cpql
  label: Peng算子
- from: iql
  to: safefql
  label: 安全约束
- from: option_critic
  to: feudal
  label: 主从架构
- from: feudal
  to: hiro
  label: 目标修正
- from: sac
  to: diayn
  label: 技能发现
- from: hiro
  to: skillrl
  label: 技能库
- from: skillrl
  to: metaworld_hrl
  label: 技能迁移
- from: skillrl
  to: hcc
  label: 认知缓存
- from: icm
  to: rnd
  label: 随机蒸馏
- from: rnd
  to: lagea
  label: VLM塑形
- from: lagea
  to: mrbt
  label: 逻辑验证
- from: rnd
  to: vsimr
  label: LLM增强
- from: sac
  to: mbpo
  label: 模型rollout
- from: mbpo
  to: dreamerv1
  label: 隐空间
- from: dreamerv1
  to: dreamerv2
  label: 离散隐变量
- from: dreamerv2
  to: dreamerv3
  label: symlog
- from: dreamerv3
  to: dreamdojo
  label: 视频预训练
- from: dreamdojo
  to: adaworldpolicy
  label: 流匹配
- from: dreamerv3
  to: rwml
  label: LLM集成
- from: dreamerv3
  to: hy_embodied
  label: 策略蒸馏
milestones:
- ppo
- sac
- dreamerv3
```

## 核心算法

### DDPG

```yaml
id: ddpg
num: 1
name: DDPG
full_name: 深度确定性策略梯度 (Deep Deterministic Policy Gradient)
year: '2015'
org: DeepMind
parent: —
paper_url: https://arxiv.org/abs/1509.02971
project_url: ''
category: foundation
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

### TRPO

```yaml
id: trpo
num: 2
name: TRPO
full_name: 信任域策略优化 (Trust Region Policy Optimization)
year: '2015'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/1502.05477
project_url: ''
category: foundation
motivation: KL散度约束保证策略单调改进
```

#### 📝 一句话总结
TRPO 的核心目标是：KL散度约束保证策略单调改进。

#### 🎯 核心要点
- 核心动机：KL散度约束保证策略单调改进
- 代表机构：UC Berkeley

#### 🔬 深入细节
KL散度约束保证策略单调改进


### PPO

```yaml
id: ppo
num: 3
name: PPO
full_name: 近端策略优化 (Proximal Policy Optimization)
year: '2017'
org: OpenAI
parent: trpo
paper_url: https://arxiv.org/abs/1707.06347
project_url: ''
category: foundation
motivation: 剪切目标函数简化信任域优化
```

#### 📝 一句话总结
PPO 的核心目标是：剪切目标函数简化信任域优化。

#### 🎯 核心要点
- 核心动机：剪切目标函数简化信任域优化
- 演化来源：继承或改进自 trpo
- 代表机构：OpenAI

#### 🔬 深入细节
剪切目标函数简化信任域优化


### SAC

```yaml
id: sac
num: 4
name: SAC
full_name: 软演员-评论家 (Soft Actor-Critic)
year: '2018'
org: UC Berkeley
parent: ddpg
paper_url: https://arxiv.org/abs/1801.01290
project_url: ''
category: foundation
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

### TD3

```yaml
id: td3
num: 5
name: TD3
full_name: 双延迟深度确定性策略梯度 (Twin Delayed DDPG)
year: '2018'
org: McGill
parent: ddpg
paper_url: https://arxiv.org/abs/1802.09477
project_url: ''
category: foundation
motivation: 双Q网络抑制值函数过估计
```

#### 📝 一句话总结
TD3 针对 Actor-Critic 方法中函数逼近误差导致的 Q 值过估计问题，提出了**截断双 Q 学习、延迟策略更新和目标策略平滑**三项关键技术，在连续控制任务上大幅超越 DDPG 等基线，成为 off-policy 连续控制的标准算法之一。

#### 🎯 核心要点
- **截断双 Q 学习 (Clipped Double Q-learning)**：维护两个独立的 Critic 网络，取二者 Q 值估计的**最小值**作为目标值，有效抑制过估计偏差
- **延迟策略更新 (Delayed Policy Updates)**：Critic 每更新 \(d\) 次（默认 \(d=2\)），Actor 才更新一次，确保 Critic 收敛后再指导策略
- **目标策略平滑 (Target Policy Smoothing)**：在计算目标 Q 值时，向目标动作添加截断高斯噪声，起到值函数正则化的作用，防止策略利用 Q 函数的局部峰值
- **基于 DDPG 框架**：继承确定性策略梯度 + 经验回放 + 目标网络的 off-policy 架构
- **在 OpenAI Gym MuJoCo 7 个连续控制任务上全面超越 DDPG、SAC（早期版本）等方法**

#### 🔬 深入细节
##### 核心示意图

![TD3 过估计偏差分析](https://ar5iv.labs.arxiv.org/html/1802.09477/assets/x1.png)
*图 1：DDPG 在 Hopper-v1 上的训练过程中，估计 Q 值（蓝色）持续高于真实回报（橙色），展示了 Actor-Critic 方法中严重的过估计现象。TD3 的核心动机即消除此偏差。*

![TD3 与基线方法的学习曲线对比](https://ar5iv.labs.arxiv.org/html/1802.09477/assets/x5.png)
*图 2：TD3 在多个 MuJoCo 连续控制环境上的学习曲线对比，显著优于 DDPG、SAC、PPO 等方法。*

##### 算法伪代码

```python
# TD3 算法伪代码
# 初始化
Q_θ1, Q_θ2 = init_critics()        # 两个 Critic 网络
π_φ = init_actor()                   # Actor 网络
Q_θ1', Q_θ2', π_φ' = copy_targets() # 对应的目标网络
B = ReplayBuffer()

for t in range(T_max):
    # 1. 环境交互：带探索噪声
    a = π_φ(s) + ε,  ε ~ N(0, σ_explore)
    s', r, done = env.step(a)
    B.add(s, a, r, s', done)

    # 2. 采样 mini-batch
    (s, a, r, s', d) = B.sample(N)

    # 3. 计算目标值（目标策略平滑 + 截断双 Q）
    ã = π_φ'(s') + clip(N(0, σ_smooth), -c, c)   # 目标动作 + 截断噪声
    y = r + γ * (1-d) * min(Q_θ1'(s', ã), Q_θ2'(s', ã))  # 取最小值

    # 4. 更新两个 Critic
    loss_critic = MSE(Q_θ1(s,a), y) + MSE(Q_θ2(s,a), y)
    update(θ1, θ2, loss_critic)

    # 5. 延迟策略更新（每 d 步更新一次 Actor 和目标网络）
    if t % d == 0:
        loss_actor = -mean(Q_θ1(s, π_φ(s)))   # 仅用 Q_θ1 指导策略
        update(φ, loss_actor)
        # 软更新目标网络
        θ1' ← τ·θ1 + (1-τ)·θ1'
        θ2' ← τ·θ2 + (1-τ)·θ2'
        φ'  ← τ·φ  + (1-τ)·φ'
```

##### 动机与背景：Actor-Critic 中的过估计危机

在离散动作空间中，Q-learning 的过估计问题已被广泛研究——由于 \(\max\) 操作对含噪声的 Q 值取最大，会系统性地高估真实值。Double DQN 通过解耦动作选择与值评估来缓解此问题。然而，在连续动作空间的 Actor-Critic 框架中，这一问题同样严重却长期被忽视。

DDPG 中，Actor 通过梯度上升最大化 Critic 的 Q 值输出来更新策略。如果 Critic 存在过估计，Actor 就会被"欺骗"，倾向于选择那些被错误高估的动作。更糟糕的是，这种偏差通过时序差分 (TD) 的自举机制不断累积：

$$Q_{\theta}(s, a) \leftarrow r + \gamma Q_{\theta'}(s', \pi_{\phi'}(s'))$$

每次更新都使用了下一状态的估计值，误差会像滚雪球一样逐步放大。论文通过实验证实（如图 1），DDPG 的 Q 值估计在训练过程中会严重偏离真实回报，最终导致策略性能崩溃。

> 💡 **关键洞察**：Double DQN 的思路在 Actor-Critic 中直接套用效果不佳。因为 Actor-Critic 的策略更新缓慢，当前网络和目标网络的 Q 值估计过于相似，无法真正解耦以消除偏差。

##### 核心机制一：截断双 Q 学习 (Clipped Double Q-learning)

TD3 维护两个独立参数化的 Critic 网络 \(Q_{\theta_1}\) 和 \(Q_{\theta_2}\)，在计算 TD 目标时取二者的**最小值**：

$$y = r + \gamma \min_{i=1,2} Q_{\theta'_i}(s', \pi_{\phi'}(s'))$$

**为什么取最小值而非均值？** 取均值虽然能降低方差，但仍可能产生过估计。取最小值则提供了一个**近似上界**——即便某个 Critic 过估计了，另一个较低的估计也能将其拉回。这种策略倾向于产生轻微的**低估**，而低估在实践中远比过估计安全：低估的动作会被策略自然回避，不会像过估计那样引发正反馈循环。

两个 Critic 使用相同的目标值 \(y\) 独立训练，损失函数为：

$$L(\theta_i) = \mathbb{E}\left[(y - Q_{\theta_i}(s, a))^2\right], \quad i = 1, 2$$

> ⚠️ **注意**：Actor 的更新仅依赖 \(Q_{\theta_1}\)（而非两个 Critic 的组合），避免引入额外的耦合。

##### 核心机制二：延迟策略更新 (Delayed Policy Updates)

传统 Actor-Critic 方法中，Actor 和 Critic 每步同时更新。但如果 Critic 尚未收敛，Actor 就会基于不准确的值函数更新策略，进而产生的新数据又反过来干扰 Critic 的学习——形成恶性循环。

TD3 的解决方案极为简洁：**每 \(d\) 次 Critic 更新才执行一次 Actor 更新**（论文中 \(d=2\)）。这给了 Critic 足够的时间在当前策略下收敛，使得 Actor 获得更可靠的梯度信号。

Actor 的更新遵循确定性策略梯度定理：

$$\nabla_\phi J(\phi) = \mathbb{E}_{s \sim \mathcal{B}}\left[\nabla_a Q_{\theta_1}(s, a)\big|_{a=\pi_\phi(s)} \cdot \nabla_\phi \pi_\phi(s)\right]$$

目标网络的软更新也仅在 Actor 更新时执行：

$$\theta'_i \leftarrow \tau \theta_i + (1 - \tau)\theta'_i, \quad \phi' \leftarrow \tau \phi + (1 - \tau)\phi'$$

其中 \(\tau\) 为软更新系数（论文中 \(\tau = 0.005\)）。

##### 核心机制三：目标策略平滑 (Target Policy Smoothing)

确定性策略的一个固有问题是：Critic 可能在某些动作处形成尖锐的峰值（局部过拟合），而确定性策略恰好会精确地利用这些峰值，导致 Q 值估计不稳定。

TD3 借鉴了期望 SARSA 的思想，在计算目标 Q 值时向目标动作注入**截断高斯噪声**：

$$\tilde{a} = \pi_{\phi'}(s') + \epsilon, \quad \epsilon \sim \text{clip}(\mathcal{N}(0, \sigma), -c, c)$$

其中 \(\sigma\) 为噪声标准差，\(c\) 为截断范围（论文中 \(\sigma=0.2, c=0.5\)）。这等价于对 Q 值在动作空间的局部邻域内做平滑，使得策略不会过度依赖 Q 函数的局部尖峰。截断操作确保噪声不会将动作推出有效范围。

> 💡 **直觉理解**：如果一个动作只在精确的某个点上 Q 值很高，但其邻域 Q 值很低，那么加噪声后的平均 Q 值就会降低，策略不会被这种"虚假峰值"误导。

##### 与 DDPG 的关键区别总结

| 特性 | DDPG | TD3 |
|------|------|-----|
| Critic 数量 | 1 个 | **2 个**（取 min） |
| 策略更新频率 | 每步更新 | **每 \(d\) 步更新一次** |
| 目标动作噪声 | 无 | **截断高斯噪声** |
| 过估计控制 | 无显式机制 | **Clipped Double Q** |
| 探索噪声 | Ornstein-Uhlenbeck | **简单高斯噪声** |

##### 默认超参数

| 参数 | 值 | 说明 |
|------|-----|------|
| \(\tau\) | 0.005 | 目标网络软更新系数 |
| \(d\) | 2 | 策略延迟更新间隔 |
| \(\sigma_{\text{smooth}}\) | 0.2 | 目标策略平滑噪声标准差 |
| \(c\) | 0.5 | 噪声截断范围 |
| \(\gamma\) | 0.99 | 折扣因子 |
| batch size | 256 | 小批量大小 |
| 学习率 | 3e-4 | Actor 和 Critic 均使用 Adam |

#### 🧪 练习题
```yaml
question: "TD3 中使用两个 Critic 网络并取最小值的主要目的是什么？"
options:
  - "增加模型容量以拟合更复杂的值函数"
  - "通过集成学习降低值函数的方差"
  - "抑制 Q 值的过估计偏差，提供近似值上界"
  - "加速 Critic 网络的收敛速度"
answer: 2
explain: "取两个独立 Critic 的最小值可以有效抑制过估计偏差。即使其中一个 Critic 过估计，较低的那个估计也能将目标值拉回，倾向于产生轻微低估而非危险的过估计。"
```

### Domain Randomization

```yaml
id: domain_rand
num: 6
name: Domain Randomization
full_name: 域随机化 (Domain Randomization)
year: '2017'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/1703.06907
project_url: ''
category: sim2real
motivation: 仿真参数随机化实现零样本迁移
```

#### 📝 一句话总结
Domain Randomization 提出在仿真器中对纹理、光照、相机位姿和干扰物等视觉参数进行大规模随机化，使得仅在合成数据上训练的目标检测网络能够零样本迁移到真实世界，在物体定位任务上达到 1.5 cm 精度并成功完成机器人抓取。

#### 🎯 核心要点
- **零样本 Sim-to-Real 迁移**：完全不使用真实图像数据，仅依赖仿真渲染的随机化图像训练目标检测器，即可在真实场景中工作
- **多维度域随机化**：同时随机化纹理（桌面/地板/天空盒/物体）、光照（数量/位置/颜色）、相机（位置/朝向/FOV）、物体位姿和干扰物（0-10 个随机几何体）
- **VGG-16 回归架构**：基于 VGG-16 提取特征，接全连接层直接回归物体的 \((x, y, z)\) 三维坐标
- **纹理数量是关键因素**：消融实验表明纹理种类超过 1000 时性能显著提升，此时甚至不需要 ImageNet 预训练
- **干扰物对鲁棒性至关重要**：训练时加入随机干扰物体，使模型在真实杂乱场景中仍能准确定位
- **端到端抓取验证**：在 Fetch 机器人上实现了 76.6% 的杂乱场景抓取成功率，全部视觉能力来自仿真训练

#### 🔬 深入细节
##### 方法总览

![Domain Randomization 方法总览](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/x1.png)
*图 1：Domain Randomization 方法示意。在仿真中对场景进行大规模随机化渲染（左），训练目标检测器后直接部署到真实世界（右）。核心思想是让真实世界成为随机化训练分布中的"普通一员"。*

##### 核心思想：让真实世界变得"不特殊"

Domain Randomization 的核心直觉非常优雅：**如果仿真训练数据的视觉多样性足够大，那么真实世界的外观只不过是这个巨大分布中的又一个采样点**。模型被迫学习对视觉外观变化不变的特征表示，从而自然地泛化到真实场景。

> 💡 **关键洞察**：与传统 sim-to-real 方法追求"逼真仿真"不同，Domain Randomization 反其道而行之——故意让仿真场景看起来"不真实但多样"，通过覆盖足够大的外观空间来包含真实世界。

##### 模型架构

![VGG-16 目标检测架构](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/x2.png)
*图 2：基于 VGG-16 的目标定位网络架构。卷积特征提取后接全连接层，直接回归物体的三维坐标。*

网络架构基于 VGG-16，具体设计如下：

1. **特征提取**：使用 VGG-16 的卷积层（可选 ImageNet 预训练权重）
2. **回归头**：在 VGG-16 的 `pool5` 层后接两个全连接层（分别为 4096 和 4096 维），最终输出 3 维向量 \((x, y, z)\)
3. **损失函数**：采用 L2 损失直接回归物体的三维笛卡尔坐标

$$\mathcal{L} = \| \hat{\mathbf{p}} - \mathbf{p}^* \|_2^2$$

其中 \(\hat{\mathbf{p}} = (\hat{x}, \hat{y}, \hat{z})\) 为网络预测坐标，\(\mathbf{p}^* = (x^*, y^*, z^*)\) 为真实坐标。

##### 随机化参数空间

Domain Randomization 的核心在于对仿真渲染的多个维度同时进行随机化。每次渲染一张训练图像时，以下参数均从均匀分布中独立采样：

| 随机化维度 | 具体参数 | 采样范围 |
|:---|:---|:---|
| **纹理** | 桌面、地板、天空盒、目标物体、干扰物体的纹理 | 从纹理库中随机选取并施加随机颜色 |
| **光照** | 光源数量（1-4）、位置、颜色 | 位置在场景上方随机，颜色 RGB 各通道独立采样 |
| **相机** | 位置、朝向、视场角（FOV） | 在目标物体周围的球壳区域内采样 |
| **物体位姿** | 目标物体在桌面上的 \((x, y)\) 位置和旋转角 | 桌面范围内均匀采样 |
| **干扰物** | 数量（0-10）、形状、大小、位置、纹理 | 随机几何体散布在桌面上 |
| **噪声** | 像素级随机噪声 | 叠加到最终渲染图像上 |

![随机化训练图像示例](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/example_imgs.png)
*图 7：Domain Randomization 生成的训练图像示例。注意纹理、光照、干扰物的巨大多样性。*

##### 训练流程伪代码

```python
# Domain Randomization 训练流程
def generate_randomized_scene(simulator, texture_library):
    """在仿真器中生成一个随机化场景"""
    # 1. 随机化纹理
    for surface in [table, floor, skybox, target_object]:
        surface.texture = random.choice(texture_library)
        surface.color = random_rgb()
    
    # 2. 随机化光照
    n_lights = random.randint(1, 4)
    for _ in range(n_lights):
        add_light(position=random_position_above_table(),
                  color=random_rgb())
    
    # 3. 随机化相机
    camera.position = sample_on_sphere(center=table_center, 
                                        radius=random.uniform(r_min, r_max))
    camera.fov = random.uniform(fov_min, fov_max)
    
    # 4. 随机放置目标物体
    target.position = random_position_on_table()
    target.rotation = random.uniform(0, 2 * pi)
    
    # 5. 添加随机干扰物
    n_distractors = random.randint(0, 10)
    for _ in range(n_distractors):
        add_distractor(shape=random_geometry(),
                       position=random_position_on_table(),
                       texture=random.choice(texture_library))
    
    # 6. 渲染并添加噪声
    image = simulator.render()
    image += random_noise()
    label = target.get_3d_position()
    return image, label

# 主训练循环
model = VGG16_Regressor(output_dim=3)
for iteration in range(100000):
    image, label = generate_randomized_scene(mujoco_sim, textures)
    prediction = model(image)
    loss = l2_loss(prediction, label)
    optimizer.step(loss)
```

##### 动机与背景：为什么需要 Domain Randomization？

传统的 sim-to-real 迁移面临一个根本矛盾：**仿真器永远无法完美复现真实世界的视觉复杂性**。此前的方法主要有两条路径：

1. **提升仿真逼真度**（Photorealistic Rendering）：通过精细建模材质、光照、物理属性来缩小 sim-real gap。但这需要大量人工标注和领域知识，且总存在未建模的视觉差异。
2. **域适应**（Domain Adaptation）：利用 GAN 等方法将仿真图像转换为"看起来像真实的"图像，或学习域不变特征。但这仍然需要真实世界的无标签数据。

Domain Randomization 提出了第三条路径：**不追求逼真，而是追求多样性**。这一思路的理论基础是：

$$P(\text{real} \in \text{support}(\mathcal{D}_{\text{rand}})) \to 1 \quad \text{as} \quad |\text{randomization}| \to \infty$$

即当随机化的范围足够大时，真实世界的视觉外观几乎必然落在训练分布的支撑集内。

> ⚠️ **注意**：这并不意味着随机化越极端越好。论文的消融实验表明，随机化参数的范围需要合理设置——过小则无法覆盖真实分布，过大则引入过多噪声降低学习效率。

##### 关键实验发现

**1. 纹理数量的临界效应**

![纹理数量消融实验](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/texture_ablation.png)
*图 5：纹理数量对真实世界检测精度的影响。当纹理数量超过约 1000 时，性能出现显著跃升。*

这是论文最重要的发现之一：纹理多样性存在一个**临界点**。当纹理库中的纹理数量从 10 增加到 100 时，性能提升有限；但从 100 增加到 1000 以上时，真实世界的检测精度出现质的飞跃。这说明：
- 少量纹理变化不足以让模型学到真正的形状特征
- 超过临界点后，模型被迫放弃依赖纹理线索，转而学习更本质的几何特征

**2. 预训练 vs 随机初始化**

| 配置 | 真实世界误差 (cm) |
|:---|:---|
| ImageNet 预训练 + 少量纹理 | 较低 |
| 随机初始化 + 少量纹理 | 较高 |
| ImageNet 预训练 + 大量纹理 (>1000) | 最低 |
| 随机初始化 + 大量纹理 (>1000) | 接近最低 |

> 💡 **关键发现**：当纹理数量足够多时，ImageNet 预训练带来的优势几乎消失。这意味着 Domain Randomization 本身就能提供足够丰富的视觉先验。

**3. 各随机化维度的贡献**

论文通过逐一移除各随机化维度进行消融：

| 移除的随机化维度 | 对精度的影响 |
|:---|:---|
| 移除纹理随机化 | **严重下降**（最关键因素） |
| 移除干扰物 | 显著下降（尤其在杂乱场景中） |
| 移除相机随机化 | 轻微下降 |
| 移除光照随机化 | 轻微下降 |

纹理随机化是最关键的因素，其次是干扰物。这与直觉一致：纹理变化迫使模型学习形状而非颜色/纹理特征，干扰物则训练模型在杂乱中定位目标。

**4. 真实世界抓取验证**

![机器人抓取示例](https://ar5iv.labs.arxiv.org/html/1703.06907/assets/grasping_vF.png)
*图 6：Fetch 机器人使用仅在仿真中训练的视觉模型执行真实世界抓取任务。*

在 Fetch 机器人平台上，使用仅在仿真中训练的目标检测器，配合简单的抓取策略，实现了：
- **单物体场景**：接近 100% 的抓取成功率
- **杂乱场景（5 个物体）**：76.6% 的抓取成功率
- **定位精度**：约 1.5 cm 的三维定位误差

##### 与传统方法的对比

| 方法 | 是否需要真实数据 | 仿真要求 | 泛化能力 | 工程复杂度 |
|:---|:---|:---|:---|:---|
| **真实数据训练** | ✅ 大量标注 | 不需要 | 受限于数据分布 | 数据采集成本高 |
| **逼真仿真** | ❌ | 极高逼真度 | 受限于仿真精度 | 建模成本极高 |
| **域适应 (DA)** | ⚠️ 需无标签真实数据 | 中等 | 依赖适应质量 | 需训练额外模型 |
| **Domain Randomization** | ❌ | 低（仅需基本渲染） | 强（覆盖大分布） | 低（仅需调参数范围） |

Domain Randomization 的最大优势在于**极低的工程门槛**：不需要精细的 3D 资产、不需要真实数据采集、不需要复杂的域适应训练，只需要一个基本的物理仿真器和一组随机纹理。

#### 🧪 练习题
```yaml
question: "Domain Randomization 消融实验中，对 sim-to-real 迁移性能影响最大的随机化维度是什么？"
options:
  - "光照随机化（光源数量、位置、颜色）"
  - "纹理随机化（桌面、物体、地板等表面纹理）"
  - "相机随机化（位置、朝向、视场角）"
  - "物体位姿随机化（目标物体的位置和旋转）"
answer: 1
explain: "论文消融实验明确表明纹理随机化是最关键的因素，移除后性能严重下降。纹理多样性迫使模型学习基于形状而非颜色/纹理的特征表示，这是实现 sim-to-real 泛化的核心。"
```

### VIRAL

```yaml
id: viral
num: 7
name: VIRAL
full_name: 视觉Sim2Real大规模迁移 (Visual Sim-to-Real at Scale)
year: '2026'
org: UPenn
parent: domain_rand
paper_url: https://tairanhe.com/
project_url: ''
category: sim2real
motivation: 大规模视觉随机化+Real2Sim对齐
```

#### 📝 一句话总结
VIRAL 提出了一套完整的 Teacher-Student 视觉 Sim-to-Real 框架，通过特权教师 RL 训练 + RGB 学生蒸馏 + 大规模视觉/物理域随机化，使 29-DoF 人形机器人仅凭单目 RGB 图像即可零样本部署完成长时程移动操作（行走-放置-抓取-转身），在 59 次连续真实世界试验中达到 91.5% 成功率，速度超越人类专家遥操作。

#### 🎯 核心要点
- **Teacher-Student 两阶段范式**：Teacher 使用特权状态观测（物体位姿、阶段标签等）+ PPO 训练；Student 使用 RGB 图像 + 本体感知，通过蒸馏学习
- **Teacher 四大关键设计**：
- 分阶段奖励设计（walk / place / grasp / turn 四类奖励）
- Delta 动作空间（输出增量而非绝对关节角，显著加速训练）
- WBC（HOMIE）作为底层 API（策略输出高层命令而非底层力矩）
- 参考状态初始化 RSI（从 200 条仿真遥操作演示中采样初始状态）
- **Student 三大关键设计**：
- DAgger + BC 混合蒸馏（\(\alpha=0.5\) 混合教师/学生 rollout）
- DINOv3 视觉骨干网络提取 RGB 特征
- 分布式仿真训练系统（最高 64 GPU 并行，近线性加速）
- **Sim-to-Real 三大关键设计**：
- 灵巧手系统辨识 SysID（校准手指 armature/stiffness/damping）
- 相机外参对齐 + 外参随机化
- 大规模视觉域随机化（材质/光照/图像质量/相机延迟）
- **实验结果**：59 次连续试验 54 次成功（91.5%），周期时间 20.2s 快于专家 21.4s
- **全面消融**：验证了 RSI、delta action、DINOv3、DAgger-BC 比例、历史架构、域随机化、GPU 规模等 10 个设计选择的必要性

#### 🔬 深入细节
![VIRAL 框架总览](https://arxiv.org/html/2511.15200v1/x2.png)
*图：VIRAL 训练流程。左侧 Teacher 使用特权状态观测 + PPO 训练；右侧 Student 通过 DAgger/BC 蒸馏，以 RGB 图像 + 本体感知作为输入，最终部署到真实机器人。*

##### 算法伪代码

```python
# ========== 阶段 1: Teacher 训练 (PPO + 特权观测) ==========
teacher = PolicyNetwork(input_dim=226)  # 特权状态观测
wbc = HOMIE_Controller()  # 全身控制器作为底层 API
demo_buffer = load_teleop_demos(n=200)  # 200 条仿真遥操作演示

for episode in range(N_episodes):
    # 参考状态初始化 (RSI): 从演示中采样场景快照
    snapshot = sample(demo_buffer)
    env.reset(robot=snapshot.robot, objects=snapshot.objects, tables=snapshot.tables)
    
    for t in range(T):
        o_t = [o_proprio, o_exte_priv]  # 本体感知 + 特权外感知
        delta_a = teacher(o_t)           # 输出 delta 动作增量
        wbc_cmd += delta_a               # 累加到 WBC 命令
        wbc.execute(wbc_cmd)             # WBC 执行底层控制
        
        # 分阶段奖励: r = Σ w_i * 1(stage==i) * r_i
        r = stage_weighted_reward(walk=r_walk, place=r_place, 
                                   grasp=r_grasp, turn=r_turn)
    PPO_update(teacher, trajectories)

# ========== 阶段 2: Student 蒸馏 (DAgger + BC) ==========
student = VisionPolicy(backbone=DINOv3(), input_dim=113+128)
alpha = 0.5  # teacher/student rollout 混合比例

for iteration in range(M):
    # 混合 rollout: α 比例用 teacher, (1-α) 比例用 student
    obs_teacher = rollout(env, teacher, frac=alpha)    # BC 数据
    obs_student = rollout(env, student, frac=1-alpha)  # DAgger 数据
    
    # 蒸馏损失: MSE(teacher_action, student_action)
    for o_t, o_s in mix(obs_teacher, obs_student):
        rgb_feat = DINOv3(o_t.image)  # 108×192 RGB → 128-dim
        a_student = student(rgb_feat, o_t.proprio)
        a_teacher = teacher(o_t.privileged)
        loss = MSE(a_teacher, a_student)
        optimizer.step(loss)
```

##### 动机与背景

人形机器人的移动操作（loco-manipulation）要求机器人在行走的同时完成抓取、放置等精细操作，是通往通用家庭服务机器人的关键能力。现有方法面临三大困境：

1. **纯遥操作 + 模仿学习**：需要大量真实世界数据采集，成本高昂且难以泛化
2. **纯 Sim-to-Real 运动控制**：虽然盲行走已经成熟，但缺乏视觉感知无法完成操作任务
3. **视觉 Sim-to-Real 操作**：主要局限于桌面场景，未扩展到全身移动操作

VIRAL 的核心洞察是：将成熟的 Sim-to-Real 运动控制（通过 WBC 封装）与大规模视觉域随机化结合，通过 Teacher-Student 范式实现端到端的 RGB 移动操作策略。

##### 核心机制详解

**1. Delta 动作空间 vs 绝对动作空间**

传统腿式运动 RL 通常输出绝对关节目标角度。VIRAL 发现对于移动操作任务，delta 动作空间（输出增量）至关重要：

$$a_t^{\text{abs}} = a_{t-1}^{\text{abs}} + \Delta a_t, \quad \Delta a_t = \pi_\theta(o_t)$$

直觉上，delta 动作提供了一种隐式的"位置记忆"——策略只需关注"如何微调"而非"从零开始到达目标"，这大幅降低了学习难度。消融实验（Figure 9）表明，绝对动作空间完全无法收敛。

**2. 参考状态初始化 (RSI)**

长时程任务（行走→放置→抓取→转身）的探索空间极大，从零开始的 RL 几乎无法发现有效行为。VIRAL 收集 200 条仿真遥操作演示，在每个 episode 重置时随机采样一个演示快照作为初始状态：

> 💡 **关键**：RSI 不是模仿学习——它不约束策略动作，只是将机器人"传送"到任务中间的各种状态，让策略从一开始就能体验到抓取成功等稀疏奖励信号。

消融表明（Figure 9），没有 RSI 的 Teacher 成功率停滞在 10% 以下，而有 RSI 的达到 95%。

**3. WBC 作为安全 API 层**

VIRAL 不直接输出底层关节力矩，而是输出 HOMIE 全身控制器的高层命令（速度/高度跟踪 + 上半身关节 + 手指动作）：

$$\text{Action Space} = [\underbrace{v_x, v_y, \omega, h}_{\text{locomotion}} , \underbrace{q_{\text{upper}}}_{\text{upper body}} , \underbrace{q_{\text{finger}}}_{\text{fingers}}]$$

这将策略的动作空间限制在安全可靠的运动区域内，显著提升了 Sim-to-Real 的可部署性。

**4. DAgger + BC 混合蒸馏**

纯 BC（\(\alpha=1\)）只在教师分布上训练，学生遇到自身误差导致的分布偏移时无法纠错；纯 DAgger（\(\alpha=0\)）收敛慢。VIRAL 采用混合策略：

$$\rho^o = \alpha \cdot \rho^o_{\pi_{\text{teacher}}} + (1-\alpha) \cdot \rho^o_{\pi_{\text{student}}}$$

$$\mathcal{L}_{\text{distill}} = \mathbb{E}_{o_t \sim \rho^o} \left[ \| \pi_{\text{teacher}}(o_t^{\text{teacher}}) - \pi_{\text{student}}(o_t^{\text{student}}) \|_2^2 \right]$$

\(\alpha=0.5\) 在训练速度和部署鲁棒性之间取得最佳平衡（Figure 11）。

**5. 大规模视觉域随机化**

为弥合 Sim-to-Real 视觉差距，VIRAL 在训练中随机化：
- **图像质量**：亮度、对比度、色调、饱和度、高斯噪声、模糊
- **相机外参**：模拟硬件制造公差和漂移
- **全局光照**：穹顶光环境贴图
- **材质属性**：地板、桌子、物体、机器人部件的颜色和材质

消融（Figure 13）表明关闭所有随机化导致性能下降 35.1%，且各组件互补。

**6. 计算规模的关键作用**

VIRAL 发现 GPU 规模不仅加速训练，还直接影响最终性能：
- **Teacher**：1-2 GPU 永远无法达到高成功率，8-16 GPU 才能突破 90%（Figure 14）
- **Student**：64 GPU 训练不仅更快收敛，还获得更高的最终成功率和更平滑的优化曲线（Figure 15）

> ⚠️ **注意**：大规模计算不是"锦上添花"而是"必要条件"——不充分的计算资源会导致策略永远无法收敛到可部署水平。

##### 分阶段奖励设计

任务被分解为 5 个阶段（行走→预放置→放置→抓取提升→转身），总奖励为阶段加权和：

$$r_t = \sum_{i=0}^{4} w_i \cdot \mathbb{1}(\text{stage} = i) \cdot r_i$$

四类核心奖励：

| 奖励 | 公式 | 直觉 |
|------|------|------|
| 行走 | \(r_{\text{walk}} = \exp(-4(\|p_{\text{robot}} - p_{\text{obj}}\| - 0.45)^2)\) | 引导机器人走向目标物体，0.45m 为最佳抓取距离 |
| 放置 | \(r_{\text{place}} = -\|f_{\text{PlaceObj}}\| \cdot \mathbb{1}(\|p_{\text{obj}} - p_{\text{tray}}\| < 0.3)\) | 在托盘附近时鼓励松手（减小指尖力） |
| 抓取 | \(r_{\text{grasp}} = \min(h_{\text{obj}} - h_{\text{table}}, 0.15)\) | 鼓励将物体提升离桌面，上限 0.15m |
| 转身 | \(r_{\text{turn}} = -|y_{\text{robot}} - y_{\text{desired}}|\) | 最小化当前朝向与目标朝向的偏差 |

##### 与现有方法的对比

| 维度 | 遥操作+模仿学习 | 盲 Sim-to-Real 运动 | VIRAL |
|------|-----------------|---------------------|-------|
| 感知模态 | RGB（真实数据） | 无/深度 | RGB（仿真数据） |
| 操作能力 | ✅ 灵巧 | ❌ 无 | ✅ 灵巧手 |
| 移动能力 | ✅ | ✅ | ✅ |
| 真实数据需求 | 大量 | 零 | 零 |
| 泛化性 | 依赖数据覆盖 | 强（运动） | 强（视觉+运动） |
| 部署速度 | 受遥操作者限制 | 实时 | 实时（20.2s/周期） |

#### 🧪 练习题
```yaml
question: "VIRAL 框架中，参考状态初始化 (RSI) 的核心作用是什么？"
options:
  - "约束策略动作使其模仿演示轨迹"
  - "将 episode 初始状态设置为演示中的多样化中间状态，加速稀疏奖励的探索"
  - "替代奖励函数，直接用演示作为监督信号"
  - "减少仿真环境的域随机化需求"
answer: 1
explain: "RSI 不约束策略动作（非模仿学习），而是在每次 episode 重置时从 200 条遥操作演示中采样场景快照作为初始状态，使策略从一开始就能体验到任务各阶段的奖励信号，解决长时程任务的探索瓶颈。消融实验表明没有 RSI 成功率停滞在 10% 以下。"
```

### LFI-DR

```yaml
id: lfi_dr
num: 8
name: LFI-DR
full_name: 似然无关推理域随机化 (Likelihood-Free Inference DR)
year: '2026'
org: Edinburgh
parent: domain_rand
paper_url: https://arxiv.org/abs/2602.05678
project_url: ''
category: sim2real
motivation: 似然无关推理计算物理参数后验
```

#### 📝 一句话总结
LFI-DR 的核心目标是：似然无关推理计算物理参数后验。

#### 🎯 核心要点
- 核心动机：似然无关推理计算物理参数后验
- 演化来源：继承或改进自 domain_rand
- 代表机构：Edinburgh

#### 🔬 深入细节
似然无关推理计算物理参数后验


### FALCON

```yaml
id: falcon
num: 9
name: FALCON
full_name: 力自适应移动操控 (Force-Adaptive Loco-manipulation)
year: '2026'
org: L4DC
parent: sac
paper_url: https://arxiv.org/abs/2602.08901
project_url: ''
category: sim2real
motivation: 双智能体RL力自适应控制
```

#### 📝 一句话总结
FALCON 提出了一种**双智能体强化学习**框架，将人形机器人的上半身（操控）与下半身（运动）解耦为两个协作策略，并设计了**力矩极限感知的 3D 力课程训练**机制，使机器人无需力传感器即可在 sim-to-real 中完成负载搬运、拉车、开门等力自适应移动操控任务。

#### 🎯 核心要点
- **双智能体架构**：上半身 RL 智能体负责关节跟踪（隐式力补偿），下半身 RL 智能体负责速度跟踪与步态稳定，两者共享本体感知信息并联合训练
- **力矩极限感知的 3D 力课程**：通过雅可比矩阵和关节力矩上限计算末端执行器可承受的最大力，结合 Dirichlet 分布在 3D 力空间中采样训练力，并通过渐进式缩放因子 \(\alpha_g\) 逐步增加力的强度
- **非对称 Actor-Critic**：Actor 仅使用本体感知，Critic 额外获取特权信息（真实根速度、末端执行器外力），提升训练效率
- **AMASS 动作捕捉数据集**驱动上半身目标姿态采样，使策略泛化到多种操控姿势
- **跨平台验证**：在 Unitree G1 和 Booster T1 两款人形机器人上实现 sim-to-real 部署，完成 0–20N 负载搬运、0–100N 拉车、0–40N 开门等任务

#### 🔬 深入细节
![FALCON 系统总览](https://ar5iv.labs.arxiv.org/html/2505.06776/assets/x2.png)
*图：FALCON 双智能体训练框架。上半身智能体跟踪参考关节角度（来自 AMASS 数据集采样），下半身智能体跟踪速度指令。训练时通过 3D 力课程在末端执行器施加随机外力，Critic 获取特权信息（根速度、外力）。*

##### 算法伪代码

```python
# FALCON 双智能体联合训练伪代码
Initialize: upper_policy πU, lower_policy πL, critics VU, VL
Load: AMASS motion dataset for upper-body reference poses

for iteration in range(N_iterations):
    # === 力课程采样 ===
    for each environment:
        # 1. 计算当前姿态下的力矩极限 → 力空间边界
        J_EE = compute_jacobian(q_upper)           # 末端执行器雅可比
        tau_margin = tau_max - tau_gravity(q)       # 可用力矩余量
        F_max_per_axis = J_EE_inv_T @ tau_margin   # 各轴最大可施加力 (Eq.3)
        
        # 2. Dirichlet 分布采样力方向 + 渐进缩放
        d ~ Dirichlet(α=1, k=3)                    # 3D 方向权重
        F_applied = α_g * d * F_max_per_axis        # α_g ∈ [0,1] 渐进增大 (Eq.5)
        apply_force(F_applied, at=EE_position + Δp)  # Δp 随机偏移
    
    # === 上半身智能体 ===
    s_upper = [q, dq, ω_root, g, a_{t-1}^U]       # 本体感知
    a_upper = πU(s_upper)                           # 输出: 上半身关节目标
    r_upper = exp(-||q_upper - q_ref||² / σ²)      # 关节跟踪奖励
    
    # === 下半身智能体 ===
    s_lower = [q, dq, ω_root, g, a_{t-1}^L, v_cmd, h_cmd, ω_cmd, phase]
    a_lower = πL(s_lower)                           # 输出: 下半身关节目标
    r_lower = r_vel + r_height + r_gait + r_penalty # 运动跟踪奖励
    
    # === PPO 更新（非对称 Critic）===
    s_critic_U = [s_upper, v_root_true, F_EE_true]  # 特权信息
    s_critic_L = [s_lower, v_root_true, F_EE_true]
    Update πU, πL, VU, VL via PPO with clipped objective
```

##### 动机与背景

人形机器人的移动操控（loco-manipulation）要求同时完成稳定行走和上肢力交互，这在传统方法中面临两大挑战：

1. **力感知困难**：大多数消费级人形机器人不配备末端力/力矩传感器，无法直接测量交互力
2. **上下肢耦合**：上半身施加或承受外力时，会通过动力学耦合影响下半身的平衡与步态

现有方法要么依赖力传感器进行显式力补偿（如 Lower-RL-Upper-IK + Force Estimator），要么仅在 2D 平面施加简单推力进行鲁棒性训练，无法处理复杂的 3D 力交互场景。

> 💡 **关键洞察**：FALCON 的核心思想是——与其估计力再补偿，不如让策略在训练中**隐式学会**应对各种力扰动。通过在物理仿真中系统性地施加力矩极限范围内的 3D 外力，策略自然获得力自适应能力。

##### 核心机制详解

**1. 双智能体分离训练**

FALCON 将全身控制分解为两个独立但协作的 RL 智能体：

- **上半身智能体 \(\pi^U\)**：观测本体感知 \(s^U_t = [q_{t-4:t}, \dot{q}_{t-4:t}, \omega^{\text{root}}_{t-4:t}, g_{t-4:t}, a^U_{t-1}]\)，输出上半身关节 PD 目标。奖励函数为关节角度跟踪误差：

$$r^U_t = \exp\!\left(-\frac{\|q^{\text{upper}}_t - q^{\text{ref}}_t\|^2}{\sigma^2}\right)$$

- **下半身智能体 \(\pi^L\)**：额外观测速度指令 \(v^{\text{cmd}}\)、高度指令 \(h^{\text{cmd}}\)、角速度指令 \(\omega^{\text{cmd}}\) 和步态相位 \(\phi_t\)，输出下半身关节 PD 目标。奖励包含速度跟踪、高度跟踪、步态周期奖励和多项稳定性惩罚。

两个智能体**共享完整的本体感知**（全身关节角度、角速度、IMU 数据），使上半身的动作变化能被下半身感知并做出补偿。

> ⚠️ **注意**：虽然两个智能体独立输出动作，但它们在同一仿真环境中联合训练，下半身智能体能观测到上半身动作对机器人状态的影响，从而学会动态平衡补偿。

**2. 力矩极限感知的 3D 力课程**

这是 FALCON 最核心的技术创新。训练时在末端执行器上施加随机 3D 外力，但力的大小受限于关节力矩极限：

**Step 1 — 力矩余量计算**：给定当前关节构型 \(q\)，计算重力补偿后的可用力矩余量：

$$\tau_{\text{margin}} = \tau_{\max} - \tau_{\text{gravity}}(q)$$

**Step 2 — 力空间边界映射**：通过末端执行器雅可比矩阵 \(J_{EE}\) 将力矩空间映射到笛卡尔力空间，得到各轴最大可施加力：

$$F^{\max}_{\text{axis}_i} = \left|(J^{-T}_{EE} \cdot \tau_{\text{margin}})_i\right|, \quad i \in \{x, y, z\}$$

**Step 3 — Dirichlet 采样 + 渐进缩放**：使用 Dirichlet 分布在 3D 力方向上采样，确保力在各轴间合理分配：

$$d \sim \text{Dir}(\alpha \cdot \mathbf{1}_3), \quad F^{\text{applied}} = \alpha_g \cdot d \odot F^{\max}_{\text{axis}}$$

其中 \(\alpha_g \in [0, 1]\) 是渐进缩放因子，随训练进程从 0 线性增长到 1，实现从无力到满力的课程学习。每个力的施加位置还会在末端执行器表面随机偏移 \(\Delta p\)，增加力矩扰动的多样性。

> 💡 **为什么用 Dirichlet 分布？** Dirichlet 分布天然生成归一化的非负权重向量（\(\sum d_i = 1\)），非常适合在固定总力预算下分配各轴力分量。当 \(\alpha = 1\) 时为均匀分布，各方向等概率；增大 \(\alpha\) 可使分布更集中。

**3. 非对称 Actor-Critic**

为了在不依赖力传感器的前提下提升训练效率，FALCON 采用非对称设计：

- **Actor**（部署时使用）：仅接收本体感知信息，不需要力传感器
- **Critic**（仅训练时使用）：额外接收特权信息——真实根部速度 \(v^{\text{root}}\) 和末端执行器外力 \(F^{EE}\)

这使得 Critic 能更准确地估计状态价值，指导 Actor 学习更好的策略，而部署时 Actor 完全不依赖特权信息。

**4. 上半身参考姿态采样**

训练时，上半身的目标关节角度从 AMASS 动作捕捉数据集中随机采样。具体流程：
1. 从 AMASS 数据集中随机选取一个动作片段
2. 通过逆运动学将 SMPL 人体模型的关节角度映射到机器人关节空间
3. 仅提取上半身关节角度作为跟踪目标
4. 每个 episode 随机采样不同的目标姿态

这种设计使策略能泛化到各种上半身构型，而非仅适用于特定操控姿势。

##### 与基线方法的对比

| 方法 | 力处理方式 | 上半身控制 | 上体跟踪误差 | 力自适应 |
|------|-----------|-----------|-------------|---------|
| Vanilla Single-Agent | 无力课程 | RL 联合控制 | 基线 | ✗ |
| Lower-RL-Upper-IK | 力估计器+雅可比补偿 | IK+前馈力矩 | 较差 | 需力传感器 |
| ExBody2 (2D push) | 仅 2D 水平推力 | RL | 中等 | 有限 |
| **FALCON** | **3D 力课程+力矩感知** | **双智能体 RL** | **最优 (↓2×)** | **✓ 无需传感器** |

实验结果表明，FALCON 在上半身跟踪误差上比最佳基线降低约 **2 倍**，同时在 Unitree G1 上实现了 107.9N 的拉车峰值力和 47.3N 的开门峰值力。

##### 训练与部署细节

- **仿真器**：MuJoCo，4096 个并行环境
- **优化器**：PPO，学习率 \(1 \times 10^{-4}\)，clip ratio \(\epsilon = 0.2\)
- **控制频率**：50 Hz（策略）/ 200 Hz（PD 控制器）
- **Domain Randomization**：摩擦系数 \(\mathcal{U}(0.5, 1.25)\)、连杆质量 \(\mathcal{U}(0.9, 1.2)\times\) 默认值、基座质量偏移 \(\mathcal{U}(-1, 3)\) kg、PD 增益 \(\mathcal{U}(0.9, 1.1)\times\) 默认值、控制延迟 \(\mathcal{U}(0, 20)\) ms
- **外部扰动**：每 5 秒施加 1 m/s 的随机推力
- **硬件限制**：实际部署中手腕电机容易过热，限制了持续高力矩输出（每臂 ≤2kg 持续负载），但短时高力矩任务（如拉车）不受影响

#### 🧪 练习题
```yaml
question: "FALCON 的 3D 力课程训练中，使用 Dirichlet 分布的主要目的是什么？"
options:
  - "生成均匀分布的力方向向量，确保各轴力分量相等"
  - "在固定总力预算下对三维力轴进行归一化的随机分配，增加训练力扰动的多样性"
  - "替代高斯分布以避免生成负值力分量"
  - "对力矩极限进行概率建模，估计关节失效概率"
answer: 1
explain: "Dirichlet 分布天然输出归一化的非负权重向量 (Σdi=1)，用于将力矩极限映射的最大力在 x/y/z 三轴间随机分配，配合渐进缩放因子 αg 实现从弱到强的力课程训练。"
```

### HDMI

```yaml
id: hdmi
num: 10
name: HDMI
full_name: 人形交互模仿 (HumanoiD iMitation for Interaction)
year: '2026'
org: CVPR
parent: viral
paper_url: https://arxiv.org/abs/2602.12345
project_url: ''
category: sim2real
motivation: 互联网视频学习全身交互技能
```

#### 📝 一句话总结
HDMI 的核心目标是：互联网视频学习全身交互技能。

#### 🎯 核心要点
- 核心动机：互联网视频学习全身交互技能
- 演化来源：继承或改进自 viral
- 代表机构：CVPR

#### 🔬 深入细节
互联网视频学习全身交互技能


### LIDE

```yaml
id: lide
num: 11
name: LIDE
full_name: 规划引导扩散 (Planning-Guided Diffusion)
year: '2026'
org: MIT
parent: domain_rand
paper_url: https://arxiv.org/abs/2602.15678
project_url: ''
category: sim2real
motivation: 规划引导扩散解决双臂接触任务
```

#### 📝 一句话总结
LIDE 的核心目标是：规划引导扩散解决双臂接触任务。

#### 🎯 核心要点
- 核心动机：规划引导扩散解决双臂接触任务
- 演化来源：继承或改进自 domain_rand
- 代表机构：MIT

#### 🔬 深入细节
规划引导扩散解决双臂接触任务


### BCQ

```yaml
id: bcq
num: 12
name: BCQ
full_name: 批量约束Q学习 (Batch-Constrained Q-learning)
year: '2019'
org: McGill
parent: ddpg
paper_url: https://arxiv.org/abs/1812.02900
project_url: ''
category: offline_rl
motivation: 生成模型约束缓解外推误差
```

#### 📝 一句话总结
BCQ 的核心目标是：生成模型约束缓解外推误差。

#### 🎯 核心要点
- 核心动机：生成模型约束缓解外推误差
- 演化来源：继承或改进自 ddpg
- 代表机构：McGill

#### 🔬 深入细节
生成模型约束缓解外推误差


### CQL

```yaml
id: cql
num: 13
name: CQL
full_name: 保守Q学习 (Conservative Q-Learning)
year: '2020'
org: UC Berkeley
parent: bcq
paper_url: https://arxiv.org/abs/2006.04779
project_url: ''
category: offline_rl
motivation: 悲观Q值正则约束分布外动作
```

#### 📝 一句话总结
CQL 的核心目标是：悲观Q值正则约束分布外动作。

#### 🎯 核心要点
- 核心动机：悲观Q值正则约束分布外动作
- 演化来源：继承或改进自 bcq
- 代表机构：UC Berkeley

#### 🔬 深入细节
悲观Q值正则约束分布外动作


### IQL

```yaml
id: iql
num: 14
name: IQL
full_name: 隐式Q学习 (Implicit Q-Learning)
year: '2021'
org: UC Berkeley
parent: cql
paper_url: https://arxiv.org/abs/2110.06169
project_url: ''
category: offline_rl
motivation: 分位数回归隐式提取最优策略
```

#### 📝 一句话总结
IQL 提出了一种**完全不需要评估数据集外动作**的离线强化学习方法：通过对 Q 值进行 expectile 回归来隐式逼近最优状态值函数，再结合优势加权回归（AWR）提取策略，在 D4RL 基准上取得了 SOTA 性能，尤其在需要"轨迹拼接"的 AntMaze 任务上大幅超越先前方法。

#### 🎯 核心要点
- **完全 in-sample 学习**：训练过程中从不查询数据集外动作的 Q 值，从根本上避免了 OOD 动作的值函数外推问题
- **Expectile 回归估计 V**：用非对称 L2 损失（expectile loss）对 \(V(s)\) 进行回归，当 \(\tau \to 1\) 时逼近 \(\max_a Q(s,a)\)，实现隐式策略改进
- **三网络架构**：V 网络（状态值函数）、Q 网络（动作值函数）、π 网络（策略），外加 Q 的目标网络 \(\hat{\theta}\)
- **两阶段训练**：第一阶段交替更新 V 和 Q（TD 学习），第二阶段通过 AWR 提取策略
- **AWR 策略提取**：以 \(\exp(\beta \cdot A(s,a))\) 为权重的行为克隆，仅使用数据集中的动作
- **Clipped Double Q-learning**：使用两个 Q 网络取最小值，抑制过估计
- **D4RL SOTA**：在 MuJoCo locomotion 和 AntMaze 任务上均达到当时最优，且支持在线微调

#### 🔬 深入细节
##### 框架示意

![IQL 方法示意图](https://ar5iv.labs.arxiv.org/html/2110.06169/assets/x1.png)
*图：IQL 的核心思想——将 Q(s,·) 视为关于动作的随机变量，通过 expectile 回归估计其上分位值作为 V(s)，避免显式查询 OOD 动作*

##### 算法伪代码

```python
# Algorithm 1: Implicit Q-Learning (IQL)
# 初始化: V网络(ψ), Q网络(θ1,θ2), 目标Q网络(θ̂), 策略网络(ϕ)

# ===== 第一阶段: TD 学习 =====
for each gradient step:
    # 从数据集采样 (s, a, r, s')
    batch = sample(D)
    
    # 1. 更新 V 网络 (expectile 回归)
    # L_V(ψ) = E[L_2^τ(Q_θ̂(s,a) - V_ψ(s))]
    u = min(Q_θ̂1(s,a), Q_θ̂2(s,a)) - V_ψ(s)
    weight = τ * (u >= 0) + (1 - τ) * (u < 0)  # 非对称权重
    loss_V = mean(weight * u²)
    ψ -= λ_V * ∇loss_V
    
    # 2. 更新 Q 网络 (标准 TD 学习, 用 V 替代 max)
    # L_Q(θ) = E[(r + γ·V_ψ(s') - Q_θ(s,a))²]
    target = r + γ * V_ψ(s')
    loss_Q = mean((target - Q_θ(s,a))²)
    θ -= λ_Q * ∇loss_Q
    
    # 3. 更新目标网络 (EMA)
    θ̂ ← (1 - α)·θ̂ + α·θ

# ===== 第二阶段: 策略提取 (AWR) =====
for each gradient step:
    # L_π(ϕ) = E[exp(β·(Q_θ̂(s,a) - V_ψ(s))) · log π_ϕ(a|s)]
    advantage = Q_θ̂(s,a) - V_ψ(s)
    weights = exp(β * advantage)
    loss_π = -mean(weights * log_π_ϕ(a|s))
    ϕ -= λ_π * ∇loss_π
```

##### 动机与背景

离线强化学习面临的核心矛盾是：**策略改进**要求评估当前策略可能选择的动作（这些动作可能不在数据集中），而**分布偏移**意味着对数据集外（OOD）动作的 Q 值估计极不可靠。

先前方法的解决思路主要有两类：
1. **约束策略**（如 BCQ、BEAR、CQL）：限制策略不要偏离行为策略太远，但仍需在训练中查询 OOD 动作的 Q 值
2. **正则化 Q 函数**（如 CQL）：对 OOD 动作的 Q 值施加惩罚，但需要额外采样 OOD 动作

> 💡 **关键洞察**：IQL 提出了一个根本不同的思路——能否**完全不查询任何 OOD 动作的 Q 值**，仅使用数据集中已有的 (s, a) 对来完成策略改进？

##### 核心机制：Expectile 回归实现隐式策略改进

**问题转化**：标准 Q-learning 的 Bellman 最优方程需要 \(\max_a Q(s,a)\)，这要求遍历所有动作（包括 OOD 动作）。IQL 的关键在于**不显式计算 max，而是通过 expectile 回归隐式逼近**。

**Expectile 的直觉**：对于随机变量 \(X\)，其 \(\tau\)-expectile \(m_\tau\) 满足：

$$m_\tau = \arg\min_m \mathbb{E}[L_2^\tau(X - m)]$$

其中非对称 L2 损失为：

$$L_2^\tau(u) = |\tau - \mathbf{1}(u < 0)| \cdot u^2$$

- 当 \(\tau = 0.5\) 时，\(m_\tau\) 就是均值（普通最小二乘）
- 当 \(\tau \to 1\) 时，\(m_\tau \to \max(X)\)（逼近最大值）

> ⚠️ **注意**：\(\tau\) 的选择至关重要。\(\tau\) 越大，越接近 max 操作，策略改进越激进；但过大的 \(\tau\) 可能导致对数据集中噪声或异常值过度敏感。实验中通常取 \(\tau \in [0.7, 0.9]\)。

**V 网络的 Expectile 回归（Eq. 5）**：

$$L_V(\psi) = \mathbb{E}_{(s,a) \sim \mathcal{D}}\left[L_2^\tau\left(Q_{\hat{\theta}}(s,a) - V_\psi(s)\right)\right]$$

这里将 \(Q(s, \cdot)\) 视为关于数据集中动作分布的随机变量，\(V_\psi(s)\) 通过 expectile 回归学习其上分位值。当 \(\tau\) 较大时，\(V(s)\) 会偏向数据集中 Q 值较高的动作，从而**隐式地实现了策略改进**——无需显式地对所有动作取 max。

**Q 网络的 TD 更新（Eq. 6）**：

$$L_Q(\theta) = \mathbb{E}_{(s,a,s') \sim \mathcal{D}}\left[\left(r(s,a) + \gamma V_\psi(s') - Q_\theta(s,a)\right)^2\right]$$

Q 网络使用标准的 MSE TD 损失，但 target 中用 \(V_\psi(s')\) 替代了 \(\max_{a'} Q(s', a')\)。由于 \(V\) 已经通过 expectile 回归隐式逼近了最优值，因此 Q 的更新也隐式地朝着最优 Q 函数收敛。

##### 策略提取：优势加权回归（AWR, Eq. 7）

值函数训练完成后，通过**优势加权行为克隆**提取策略：

$$L_\pi(\phi) = \mathbb{E}_{(s,a) \sim \mathcal{D}}\left[\exp\left(\beta \cdot (Q_{\hat{\theta}}(s,a) - V_\psi(s))\right) \cdot \log \pi_\phi(a|s)\right]$$

其中 \(\beta \in [0, \infty)\) 是逆温度参数：
- **\(\beta \to 0\)**：退化为普通行为克隆（均匀加权）
- **\(\beta \to \infty\)**：只模仿优势最大的动作

> 💡 **关键**：AWR 的优势在于它只使用数据集中的 (s, a) 对，权重 \(\exp(\beta \cdot A(s,a))\) 让策略更多地模仿高优势的动作，同时天然地保持在数据分布内。

##### 与传统方法的区别

| 特性 | CQL | BCQ/BEAR | IQL |
|------|-----|----------|-----|
| 是否查询 OOD 动作 | ✅ 需要采样 OOD 动作计算正则项 | ✅ 需要约束策略输出 | ❌ **完全不需要** |
| 值函数训练是否依赖策略 | 是 | 是 | **否**（V/Q 训练与策略解耦） |
| 计算开销 | 高（需额外采样） | 中等 | **低**（仅多一个 V 网络） |
| 是否支持在线微调 | 困难 | 困难 | **天然支持**（值函数不依赖策略） |
| 轨迹拼接能力 | 强 | 中等 | **强**（多步动态规划） |

IQL 的一个独特优势是**值函数训练与策略完全解耦**：V 和 Q 的训练不依赖任何显式策略，这使得：
1. 训练更稳定（无策略-值函数的循环依赖）
2. 天然支持在线微调（离线训练的值函数可直接用于在线阶段）
3. 实现极其简单（只需在 SARSA-style TD 更新中修改 V 的损失函数）

#### 🧪 练习题
```yaml
question: "IQL 中 expectile 回归的超参数 τ 趋近于 1 时，V(s) 的行为最接近以下哪个？"
options:
  - "数据集中所有动作 Q 值的均值 E_a[Q(s,a)]"
  - "数据集中所有动作 Q 值的最大值 max_a Q(s,a)"
  - "行为策略的状态值函数 V^β(s)"
  - "数据集中所有动作 Q 值的中位数"
answer: 1
explain: "当 τ→1 时，expectile 回归的非对称损失使得 V(s) 几乎只关注 Q 值最高的动作（对 Q>V 的样本赋予极大权重），从而逼近 max_a Q(s,a)。τ=0.5 时才是均值。"
```

### TD3+BC

```yaml
id: td3bc
num: 15
name: TD3+BC
full_name: TD3行为克隆正则 (TD3 with Behavior Cloning)
year: '2021'
org: Google
parent: td3
paper_url: https://arxiv.org/abs/2106.06860
project_url: ''
category: offline_rl
motivation: 极简行为克隆正则
```

#### 📝 一句话总结
TD3+BC 在 TD3 的策略更新目标中加入行为克隆（BC）正则项，并通过自适应权重 \(\lambda = \alpha / \frac{1}{N}\sum|Q(s,a)|\) 平衡 RL 与模仿信号，仅需数行代码改动即可在 D4RL 基准上达到与 CQL、Fisher-BRC 等复杂 SOTA 方法相当的性能，同时将训练时间缩减至不到一半。

#### 🎯 核心要点
- **极简设计哲学**：仅在 TD3 基础上添加 BC 正则项和状态归一化，无需额外网络架构、预训练生成模型或复杂约束机制
- **策略更新公式**：\(\pi = \arg\max_\pi \; \mathbb{E}_{(s,a) \sim \mathcal{D}} \left[ \lambda\, Q(s, \pi(s)) - (\pi(s) - a)^2 \right]\)，将 Q 值最大化与行为克隆损失直接相加
- **自适应权重归一化**：\(\lambda = \alpha / \frac{1}{N}\sum_{(s_i, a_i)}|Q(s_i, a_i)|\)，通过 Q 值绝对值均值归一化，使 Q 项和 BC 项量级可比，唯一超参 \(\alpha=2.5\)
- **状态特征归一化**：将状态归一化为均值 0、标准差 1（\(\epsilon=10^{-3}\) 防除零），提升跨任务稳定性
- **D4RL 基准全面评测**：在 Gym MuJoCo 的 random/medium/medium-replay/medium-expert/expert 数据集上全面评估
- **计算效率优势**：总训练时间 39 分钟，CQL 需 4h11m，Fisher-BRC 需 2h8m，效率提升超 3 倍
- **仅 1 个额外超参数**：\(\alpha=2.5\) 在所有任务上通用，无需逐任务调参

#### 🔬 深入细节
##### 核心框架示意

![TD3+BC 与其他离线 RL 方法的实现复杂度对比](https://ar5iv.labs.arxiv.org/html/2106.06860/assets/x1.png)
*图：Table 1 — 各离线 RL 算法相对于其基础在线算法所需的额外实现改动对比。TD3+BC 仅需添加 BC 损失项和状态归一化，而 CQL、Fisher-BRC 等方法需要大量架构和训练流程修改。*

![TD3+BC 学习曲线对比](https://ar5iv.labs.arxiv.org/html/2106.06860/assets/x5.png)
*图：TD3+BC 与 BC、CQL、Fisher-BRC 在 D4RL 数据集上的学习曲线对比。TD3+BC 展现出与 SOTA Fisher-BRC 相似的学习速度和最终性能。*

##### 算法伪代码

```python
# TD3+BC 核心伪代码
# 在标准 TD3 基础上仅修改策略更新步骤

# 预处理：计算数据集状态的均值和标准差
mu_s, sigma_s = dataset.states.mean(), dataset.states.std()

for step in range(max_steps):
    # 采样 mini-batch
    s, a, r, s_next, done = replay_buffer.sample(batch_size)
    
    # 状态归一化
    s = (s - mu_s) / (sigma_s + 1e-3)
    s_next = (s_next - mu_s) / (sigma_s + 1e-3)
    
    # === Critic 更新（与标准 TD3 完全相同）===
    with torch.no_grad():
        a_next = target_actor(s_next) + clipped_noise
        target_Q = r + gamma * min(target_Q1(s_next, a_next), 
                                     target_Q2(s_next, a_next))
    critic_loss = MSE(Q1(s, a), target_Q) + MSE(Q2(s, a), target_Q)
    
    # === Actor 更新（TD3+BC 的核心改动）===
    if step % policy_delay == 0:
        pi = actor(s)
        Q_val = Q1(s, pi)
        # 自适应权重：归一化 Q 值量级
        lmbda = alpha / Q_val.abs().mean().detach()
        # 策略损失 = -λ·Q(s,π(s)) + (π(s)-a)²
        actor_loss = -lmbda * Q_val.mean() + F.mse_loss(pi, a)
        actor_optimizer.step(actor_loss)
```

##### 动机与背景

离线强化学习（Offline RL）旨在从固定的历史数据集中学习策略，无需与环境交互。其核心挑战在于**分布偏移（distribution shift）**：当学习到的策略选择了数据集中未见过的动作时，Q 函数会对这些 OOD（out-of-distribution）动作产生不可靠的高估值，导致策略退化。

近年来的 SOTA 方法（如 CQL、BRAC、Fisher-BRC）通过各种复杂机制来解决这一问题：CQL 在 Q 函数上添加保守性正则项，BRAC 使用 KL/MMD 散度约束策略，Fisher-BRC 则需要预训练行为策略的生成模型。然而，这些方法引入了大量额外的实现复杂度、超参数和计算开销。

> 💡 **关键洞察**：作者指出，许多 SOTA 方法的性能提升可能并非来自其复杂的算法创新，而是来自额外的工程细节（如网络架构调整、归一化技巧等）。这启发了一个问题：**能否用最简单的方式达到同样的效果？**

##### 核心机制详解

**1. 行为克隆正则化**

TD3+BC 的核心思想极其直观：在标准 TD3 的策略梯度目标中，直接添加一个 MSE 行为克隆损失项：

$$\pi = \arg\max_\pi \; \mathbb{E}_{(s,a) \sim \mathcal{D}} \left[ \lambda\, Q(s, \pi(s)) - (\pi(s) - a)^2 \right]$$

- 第一项 \(\lambda Q(s, \pi(s))\) 是标准的 Q 值最大化目标，驱动策略向高回报方向优化
- 第二项 \(-(\pi(s) - a)^2\) 是行为克隆损失，约束策略输出接近数据集中的实际动作

这种设计的直觉是：BC 项隐式地将策略约束在数据集的动作分布支撑集内，从而避免 Q 函数对 OOD 动作的错误外推，而 Q 值项则在数据集支撑集内进行策略改进。

> ⚠️ **注意**：与显式约束策略分布的方法（如 KL 散度约束）不同，BC 正则项是逐样本的点约束，不需要估计完整的行为策略分布，因此实现极为简单。

**2. 自适应权重 \(\lambda\) 的设计**

直接将 Q 值和 BC 损失相加面临一个问题：两者的量级可能差异巨大。Q 值的绝对大小取决于奖励尺度和折扣因子，而 BC 损失取决于动作空间的范围。为此，作者设计了自适应归一化权重：

$$\lambda = \frac{\alpha}{\frac{1}{N} \sum_{(s_i, a_i)} |Q(s_i, a_i)|}$$

其中 \(\alpha = 2.5\) 是唯一的超参数。这个设计确保：
- Q 值项被归一化到与 BC 项可比的量级
- \(\alpha\) 控制 RL 与模仿之间的相对权重
- 使用 mini-batch 内 Q 值绝对值的均值进行归一化，计算开销几乎为零

> 💡 **关键**：\(\alpha\) 的鲁棒性很强——消融实验表明 \(\alpha \in [2, 3]\) 范围内性能几乎无差异，仅在极端值（\(\alpha=1\) 偏向纯模仿，\(\alpha=4\) 偏向纯 RL）时部分任务性能下降。

**3. 状态特征归一化**

作者对所有状态特征进行标准化处理：

$$s = \frac{s - \mu_s}{\sigma_s + \epsilon}, \quad \epsilon = 10^{-3}$$

其中 \(\mu_s\) 和 \(\sigma_s\) 在整个数据集上预计算。虽然这一改动看似微小，但消融实验表明它在多个任务上提供了稳定的性能提升，尤其是在不同环境的状态特征量级差异较大时。

##### 与现有方法的对比

| 特性 | CQL | Fisher-BRC | BRAC | TD3+BC |
|------|-----|-----------|------|--------|
| 基础算法 | SAC | SAC | SAC | TD3 |
| 额外网络 | 无 | 行为策略生成模型 | 判别器/值网络 | 无 |
| 预训练需求 | 否 | 是（行为策略） | 否 | 否 |
| 额外超参数 | 多个 | 多个 | 多个 | 1 个（\(\alpha\)） |
| 实现改动量 | 大 | 大 | 中 | **极小** |
| 训练时间 | 4h 11m | 2h 8m | — | **39m** |

> 💡 **关键发现**：论文还指出了离线 RL 中一个被忽视的问题——**高 episode 方差**。离线训练的策略相比在线训练的策略，在不同 episode 间的性能波动显著更大。这意味着仅报告平均性能可能掩盖了策略的不稳定性。

##### 实验结果

在 D4RL Gym MuJoCo 基准的 12 个任务上（HalfCheetah/Hopper/Walker2d × random/medium/medium-replay/medium-expert），TD3+BC 在大多数任务上匹配或超越了 CQL 和 Fisher-BRC 的性能。特别值得注意的是：

- 在 **medium** 和 **medium-replay** 数据集上，TD3+BC 表现尤为突出
- 在 **expert** 数据集上，TD3+BC 不会退化到低于纯 BC 的水平
- 在 **random** 数据集上，RL 组件的贡献最为显著（纯 BC 性能很差）

##### 消融实验

消融研究验证了三个组件的必要性：
1. **去除 BC 正则项**：性能大幅下降（除 random 数据集外），证实了行为约束的必要性
2. **去除 TD3（纯 BC）**：在非 expert 数据集上性能显著下降，证实了 RL 优化的价值
3. **去除状态归一化**：影响最小但仍在多个任务上提供一致的性能提升

#### 🧪 练习题
```yaml
question: "TD3+BC 中自适应权重 λ 的设计目的是什么？"
options:
  - "加速 Q 网络的收敛速度"
  - "将 Q 值项归一化到与 BC 损失项可比的量级，平衡 RL 与模仿信号"
  - "防止 Q 值对 OOD 动作的过高估计"
  - "动态调整学习率以适应不同训练阶段"
answer: 1
explain: "λ = α / mean(|Q|) 通过 Q 值绝对值均值对 Q 项进行归一化，确保策略损失中 RL 项和 BC 项的量级可比，从而使超参数 α 能够稳定地控制两者的相对权重。"
```

### Unifloral

```yaml
id: unifloral
num: 16
name: Unifloral
full_name: 统一离线RL协议 (Unified Offline RL Protocol)
year: '2025'
org: NeurIPS
parent: cql
paper_url: https://neurips.cc/virtual/2025/oral/105555
project_url: ''
category: offline_rl
motivation: 统一评估协议量化在线调参预算
```

#### 📝 一句话总结
Unifloral 的核心目标是：统一评估协议量化在线调参预算。

#### 🎯 核心要点
- 核心动机：统一评估协议量化在线调参预算
- 演化来源：继承或改进自 cql
- 代表机构：NeurIPS

#### 🔬 深入细节
统一评估协议量化在线调参预算


### CPQL

```yaml
id: cpql
num: 17
name: CPQL
full_name: 保守Peng's Q学习 (Conservative Peng's Q-Learning)
year: '2026'
org: ICLR
parent: cql
paper_url: https://openreview.net/forum?id=Ml4AtrrfQT
project_url: ''
category: offline_rl
motivation: Peng's Q算子保守价值估计
```

#### 📝 一句话总结
CPQL 的核心目标是：Peng's Q算子保守价值估计。

#### 🎯 核心要点
- 核心动机：Peng's Q算子保守价值估计
- 演化来源：继承或改进自 cql
- 代表机构：ICLR

#### 🔬 深入细节
Peng's Q算子保守价值估计


### SafeFQL

```yaml
id: safefql
num: 18
name: SafeFQL
full_name: 安全流Q学习 (Safe Flow Q-Learning)
year: '2026'
org: arXiv
parent: iql
paper_url: https://arxiv.org/abs/2603.15136
project_url: ''
category: offline_rl
motivation: 可达性流策略扩展安全边界
```

#### 📝 一句话总结
SafeFQL 的核心目标是：可达性流策略扩展安全边界。

#### 🎯 核心要点
- 核心动机：可达性流策略扩展安全边界
- 演化来源：继承或改进自 iql
- 代表机构：arXiv

#### 🔬 深入细节
可达性流策略扩展安全边界


### GAIL

```yaml
id: gail
num: 19
name: GAIL
full_name: 生成对抗模仿学习 (Generative Adversarial Imitation Learning)
year: '2016'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/1606.03476
project_url: ''
category: skill_hierarchical
motivation: 生成对抗框架模仿专家演示
```

#### 📝 一句话总结
GAIL 将生成对抗网络 (GAN) 的思想引入模仿学习，提出通过最小化策略与专家的 **占用度量 (occupancy measure)** 之间的 Jensen-Shannon 散度来直接学习策略，绕过了传统逆强化学习中显式恢复奖励函数的中间步骤，在高维连续控制任务上以极少量专家演示实现了接近专家水平的表现。

#### 🎯 核心要点
- **理论基础——占用度量匹配**：证明了 IRL 本质上是寻找一个占用度量与专家匹配的策略，将模仿学习问题转化为分布匹配问题
- **GAN 式对抗训练框架**：策略网络 \(\pi_\theta\) 作为生成器，判别器网络 \(D_w\) 区分策略与专家的 (state, action) 对，二者交替优化
- **新型代价正则化器 \(\psi_{\text{GA}}\)**：其凸共轭恰好等价于 JS 散度，使得优化目标可以用判别器的分类损失表示
- **核心优化目标**：\(\min_\pi D_{\text{JS}}(\rho_\pi, \rho_{\pi_E}) - \lambda H(\pi)\)，其中 \(\lambda H(\pi)\) 为因果熵正则项
- **TRPO 策略更新**：使用 Trust Region Policy Optimization 进行策略步，防止策略因梯度噪声而剧烈变化
- **判别器即代价函数**：\(c(s,a) = \log D_w(s,a)\) 直接作为策略优化的代价信号，无需显式恢复奖励
- **实验验证**：在 9 个 MuJoCo 物理仿真环境上超越 Behavioral Cloning、FEM、GTAL 等基线，尤其在高维 Humanoid 任务上优势显著

#### 🔬 深入细节
##### 核心框架示意

![GAIL 实验结果：MuJoCo 连续控制任务上的性能对比](https://ar5iv.labs.arxiv.org/html/1606.03476/assets/x1.png)
*图：GAIL 在多个 MuJoCo 环境上与基线方法的性能对比。横轴为专家演示轨迹数，纵轴为归一化性能。GAIL（红色）在几乎所有任务和数据量设置下均达到或接近专家水平。*

##### 算法伪代码

```
Algorithm 1: Generative Adversarial Imitation Learning (GAIL)
──────────────────────────────────────────────────────
输入: 专家轨迹 τ_E ~ π_E, 初始参数 θ_0, w_0

for i = 0, 1, 2, ... do
    1. 采样当前策略轨迹: τ_i ~ π_{θ_i}

    2. 更新判别器 (Adam 梯度上升):
       w_{i+1} ← w_i + α_w · ∇_w [ Ê_{τ_i}[log D_w(s,a)]
                                    + Ê_{τ_E}[log(1 - D_w(s,a))] ]

    3. 更新策略 (TRPO 步):
       θ_{i+1} ← TRPO_step(θ_i, cost = log D_{w_{i+1}}(s,a))
       即: 以 log D_w(s,a) 为代价函数，用 TRPO 减小期望代价

end for

输出: 学到的策略 π_{θ}
```

##### 动机与背景

**传统模仿学习的困境：** 从专家演示中学习策略有两条经典路径：

1. **行为克隆 (Behavioral Cloning)**：将模仿学习视为监督学习，直接拟合 \(\pi(a|s)\)。简单高效，但受 **分布漂移 (distribution shift)** 问题困扰——策略执行时遇到的状态分布与训练数据不同，误差会随时间步指数累积（复合误差问题）。

2. **逆强化学习 (IRL)**：先从专家演示中恢复奖励函数 \(r(s,a)\)，再用 RL 优化策略。理论上更鲁棒，但存在两大瓶颈：(a) 奖励函数恢复本身是一个欠定问题（多个奖励可解释同一行为）；(b) 需要在内循环中反复求解完整的 RL 问题，计算代价极高。

> 💡 **关键洞察**：GAIL 的核心观察是——如果最终目标是获得策略而非奖励函数，那么 IRL 的中间步骤（恢复奖励）是不必要的。可以直接将模仿学习表述为策略的占用度量与专家占用度量之间的分布匹配问题。

##### 理论基础：占用度量 (Occupancy Measure)

论文的理论贡献建立在**占用度量**这一概念之上。对于策略 \(\pi\)，其占用度量定义为：

$$\rho_\pi(s,a) = \pi(a|s) \sum_{t=0}^{\infty} \gamma^t P(s_t = s | \pi)$$

这是策略在执行过程中访问各 (state, action) 对的折扣频率分布。论文证明了一个关键定理：

> ⚠️ **核心定理 (Theorem 2)**：策略与占用度量之间存在一一对应关系 \(\pi \leftrightarrow \rho_\pi\)。因此，匹配占用度量等价于匹配策略。

基于此，IRL 的一般形式可以写为：

$$\max_{c \in \mathcal{C}} \left( \min_\pi -H(\pi) + \mathbb{E}_\pi[c(s,a)] \right) - \mathbb{E}_{\pi_E}[c(s,a)]$$

其中 \(\mathcal{C}\) 是代价函数类。通过对偶变换，这等价于：

$$\min_\pi -H(\pi) + \psi^*(\rho_\pi - \rho_{\pi_E})$$

其中 \(\psi^*\) 是正则化器 \(\psi\) 的凸共轭。不同的正则化器 \(\psi\) 对应不同的 IRL/模仿学习算法。

##### 核心创新：\(\psi_{\text{GA}}\) 正则化器与 GAN 连接

GAIL 的关键创新在于提出了一个新的代价正则化器 \(\psi_{\text{GA}}\)：

$$\psi_{\text{GA}}(c) \triangleq \begin{cases} \mathbb{E}_{\pi_E}[g(c(s,a))] & \text{if } c < 0 \\ +\infty & \text{otherwise} \end{cases}$$

其中 \(g(x) = -x - \log(1 - e^x)\)（当 \(x < 0\) 时）。

这个看似复杂的正则化器有一个优美的性质——其凸共轭恰好等于 **GAN 的判别器目标**：

$$\psi_{\text{GA}}^*(\rho_\pi - \rho_{\pi_E}) = \max_{D \in (0,1)^{\mathcal{S} \times \mathcal{A}}} \mathbb{E}_\pi[\log D(s,a)] + \mathbb{E}_{\pi_E}[\log(1 - D(s,a))]$$

这正是二分类问题的最优负对数损失，等价于（相差常数）策略与专家占用度量之间的 **Jensen-Shannon 散度**：

$$D_{\text{JS}}(\rho_\pi, \rho_{\pi_E}) = D_{\text{KL}}\left(\rho_\pi \middle\| \frac{\rho_\pi + \rho_{\pi_E}}{2}\right) + D_{\text{KL}}\left(\rho_{\pi_E} \middle\| \frac{\rho_\pi + \rho_{\pi_E}}{2}\right)$$

> 💡 **GAN 类比**：策略 \(\pi\) 扮演 GAN 中生成器的角色——它生成 (state, action) 轨迹数据；判别器 \(D\) 试图区分策略生成的数据与专家数据。当判别器无法区分二者时，策略就成功模仿了专家。

##### 完整优化目标与训练流程

将因果熵 \(H(\pi)\) 作为策略正则项（由 \(\lambda \geq 0\) 控制），GAIL 的完整优化目标为：

$$\min_\pi \max_D \ \mathbb{E}_\pi[\log D(s,a)] + \mathbb{E}_{\pi_E}[\log(1 - D(s,a))] - \lambda H(\pi)$$

训练交替进行两步：

**Step 1 — 判别器更新（Adam 梯度上升）：** 固定策略 \(\pi_{\theta_i}\)，用采样的策略轨迹和专家轨迹更新判别器参数 \(w\)，使其更好地区分策略数据与专家数据：

$$\nabla_w \left[ \hat{\mathbb{E}}_{\tau_i}[\log D_w(s,a)] + \hat{\mathbb{E}}_{\tau_E}[\log(1 - D_w(s,a))] \right]$$

**Step 2 — 策略更新（TRPO 步）：** 将判别器输出 \(\log D_{w_{i+1}}(s,a)\) 作为代价函数，使用 TRPO 更新策略参数 \(\theta\)，使策略向"更像专家"的方向移动。TRPO 通过 KL 散度约束确保每步更新幅度可控：

$$\theta_{i+1} = \arg\min_\theta \ \mathbb{E}_{\pi_\theta}[\log D_{w_{i+1}}(s,a)] \quad \text{s.t.} \ \overline{D}_{\text{KL}}(\pi_{\theta_i}, \pi_\theta) \leq \delta$$

> ⚠️ **TRPO 的必要性**：由于策略梯度估计的高方差，普通梯度下降容易导致策略崩溃。TRPO 的信赖域约束是 GAIL 稳定训练的关键保障。

##### 与传统方法的对比

| 方法 | 是否需要恢复奖励 | 是否需要 RL 内循环 | 可扩展性 | 表达能力 |
|------|:---:|:---:|:---:|:---:|
| Behavioral Cloning | ✗ | ✗ | ✓ | 受分布漂移限制 |
| MaxEnt IRL | ✓ | ✓ | ✗（需枚举状态） | 受代价函数类限制 |
| 线性 Apprenticeship Learning | ✓ | ✓ | ✓（用 TRPO） | 仅线性代价函数 |
| **GAIL** | **✗** | **✗** | **✓** | **任意复杂行为** |

GAIL 的核心优势在于：
1. **绕过奖励恢复**：直接优化策略，避免了 IRL 的欠定性问题
2. **无需 RL 内循环**：判别器梯度步替代了完整的 RL 求解
3. **表达能力强**：神经网络判别器可以表示任意复杂的代价函数，不受线性/凸函数类限制
4. **数据高效**：在专家数据方面非常高效，少量演示即可学到良好策略

##### 实验亮点

论文在 9 个经典 MuJoCo 连续控制任务上进行了实验（CartPole、Mountain Car、Reacher、HalfCheetah、Hopper、Walker、Ant、Humanoid、Disabled Ant），对比了 4 种基线方法：

- **Behavioral Cloning**：直接监督学习
- **FEM (Feature Expectation Matching)**：线性代价函数的 IRL
- **GTAL (Game-Theoretic Apprenticeship Learning)**：凸代价函数的 IRL
- **Random**：随机策略

关键发现：
- GAIL 在几乎所有任务上以 ≥70% 的专家性能稳定运行
- 在高维 **Humanoid**（376 维观测）任务上，GAIL 在所有数据量设置下均达到 100% 专家性能，而 Behavioral Cloning 最高仅 60%
- FEM 和 GTAL 在 Ant 任务上甚至不如随机策略
- 因果熵正则化 \(\lambda > 0\) 在部分任务上有帮助，但 \(\lambda = 0\) 已经足够好

#### 🧪 练习题
```yaml
question: "GAIL 中判别器 D(s,a) 的输出在策略优化中扮演什么角色？"
options:
  - "直接作为策略网络的监督标签"
  - "作为策略优化的代价函数 c(s,a) = log D(s,a)"
  - "用于估计状态价值函数 V(s)"
  - "用于计算专家策略的占用度量"
answer: 1
explain: "GAIL 将 log D(s,a) 作为代价函数传入 TRPO 策略优化步骤。当 D 认为 (s,a) 来自策略（而非专家）时，log D 较大（代价高），驱动策略向专家行为靠拢。"
```

### Option-Critic

```yaml
id: option_critic
num: 20
name: Option-Critic
full_name: 选项-评论家 (Option-Critic Architecture)
year: '2017'
org: AAAI
parent: —
paper_url: https://arxiv.org/abs/1609.05140
project_url: ''
category: skill_hierarchical
motivation: 自动学习子策略与终止条件
```

#### 📝 一句话总结
Option-Critic 的核心目标是：自动学习子策略与终止条件。

#### 🎯 核心要点
- 核心动机：自动学习子策略与终止条件
- 代表机构：AAAI

#### 🔬 深入细节
自动学习子策略与终止条件


### FeUdal Networks

```yaml
id: feudal
num: 21
name: FeUdal Networks
full_name: 封建网络 (FeUdal Networks)
year: '2017'
org: DeepMind
parent: option_critic
paper_url: https://arxiv.org/abs/1703.01161
project_url: ''
category: skill_hierarchical
motivation: 主从架构分离目标设定与执行
```

#### 📝 一句话总结
FeUdal Networks 的核心目标是：主从架构分离目标设定与执行。

#### 🎯 核心要点
- 核心动机：主从架构分离目标设定与执行
- 演化来源：继承或改进自 option_critic
- 代表机构：DeepMind

#### 🔬 深入细节
主从架构分离目标设定与执行


### HER

```yaml
id: her
num: 22
name: HER
full_name: 后见经验回放 (Hindsight Experience Replay)
year: '2017'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/1707.01495
project_url: ''
category: skill_hierarchical
motivation: 后见经验回放解决稀疏奖励
```

#### 📝 一句话总结
HER 的核心目标是：后见经验回放解决稀疏奖励。

#### 🎯 核心要点
- 核心动机：后见经验回放解决稀疏奖励
- 代表机构：OpenAI

#### 🔬 深入细节
后见经验回放解决稀疏奖励


### DIAYN

```yaml
id: diayn
num: 23
name: DIAYN
full_name: 多样即所需 (Diversity is All You Need)
year: '2018'
org: UC Berkeley
parent: sac
paper_url: https://arxiv.org/abs/1802.06070
project_url: ''
category: skill_hierarchical
motivation: 最大化互信息发现多样化技能
```

#### 📝 一句话总结
DIAYN 的核心目标是：最大化互信息发现多样化技能。

#### 🎯 核心要点
- 核心动机：最大化互信息发现多样化技能
- 演化来源：继承或改进自 sac
- 代表机构：UC Berkeley

#### 🔬 深入细节
最大化互信息发现多样化技能


### HIRO

```yaml
id: hiro
num: 24
name: HIRO
full_name: 数据高效层次化RL (Data-Efficient Hierarchical RL)
year: '2018'
org: Google Brain
parent: feudal
paper_url: https://arxiv.org/abs/1805.08296
project_url: ''
category: skill_hierarchical
motivation: 目标条件奖励与离线策略修正
```

#### 📝 一句话总结
HIRO 的核心目标是：目标条件奖励与离线策略修正。

#### 🎯 核心要点
- 核心动机：目标条件奖励与离线策略修正
- 演化来源：继承或改进自 feudal
- 代表机构：Google Brain

#### 🔬 深入细节
目标条件奖励与离线策略修正


### SkillRL

```yaml
id: skillrl
num: 25
name: SkillRL
full_name: 递归技能增强RL (Recursive Skill-Augmented RL)
year: '2026'
org: arXiv
parent: hiro
paper_url: https://arxiv.org/abs/2602.08234
project_url: ''
category: skill_hierarchical
motivation: 技能库递归演进处理超长程任务
```

#### 📝 一句话总结
SkillRL 的核心目标是：技能库递归演进处理超长程任务。

#### 🎯 核心要点
- 核心动机：技能库递归演进处理超长程任务
- 演化来源：继承或改进自 hiro
- 代表机构：arXiv

#### 🔬 深入细节
技能库递归演进处理超长程任务


### MetaWorld-HRL

```yaml
id: metaworld_hrl
num: 26
name: MetaWorld-HRL
full_name: 元世界层次化RL (MetaWorld Hierarchical RL)
year: '2026'
org: arXiv
parent: skillrl
paper_url: https://arxiv.org/abs/2601.17507
project_url: ''
category: skill_hierarchical
motivation: 层次化世界模型技能迁移组合
```

#### 📝 一句话总结
MetaWorld-HRL 的核心目标是：层次化世界模型技能迁移组合。

#### 🎯 核心要点
- 核心动机：层次化世界模型技能迁移组合
- 演化来源：继承或改进自 skillrl
- 代表机构：arXiv

#### 🔬 深入细节
层次化世界模型技能迁移组合


### HCC

```yaml
id: hcc
num: 27
name: HCC
full_name: 层次认知缓存 (Hierarchical Cognitive Caching)
year: '2026'
org: arXiv
parent: skillrl
paper_url: https://arxiv.org/abs/2601.10402
project_url: ''
category: skill_hierarchical
motivation: 认知缓存保持长时策略一致性
```

#### 📝 一句话总结
HCC（Hierarchical Cognitive Caching）提出了一种受CPU缓存层次结构启发的三层认知缓存架构（Evolving Experience → Refined Knowledge → Prior Wisdom），配合上下文预取、命中与晋升三种迁移机制，使LLM Agent在24小时超长ML任务中将上下文从200k+压缩至~70k tokens而不丢失关键策略信息，在MLE-Bench上以56.4%平均奖牌率达到SOTA。

#### 🎯 核心要点
- **三层缓存架构**：L1 Evolving Experience（工作记忆，原始交互trace）、L2 Refined Knowledge（中期策略记忆，phase级蒸馏摘要）、L3 Prior Wisdom（跨任务长期记忆，embedding检索的可迁移策略）
- **三种上下文迁移机制**：Context Prefetching（L3→任务初始化）、Context Hit（L1优先/L2回退的缓存命中策略）、Context Promotion（P1 phase级压缩 + P2 task级蒸馏）
- **层次研究计划**：每个phase生成 m 个探索方向 × q 个具体建议，并行执行后由P1算子压缩为精炼知识单元
- **跨任务迁移**：L3使用语义embedding + cosine相似度阈值δ检索历史任务wisdom，407个Kaggle竞赛预热构建先验库
- **骨干模型**：DeepSeek-V3.2-Speciale（编码/研究）+ DeepSeek-V3.2 with thinking（上下文晋升），24h/task，双RTX 4090
- **SOTA结果**：MLE-Bench 75题，56.4%平均奖牌率（Low 75.8%/Medium 50.9%/High 42.2%），超越Leeroo（50.7%）、Thesis（48.4%）等闭源方案
- **消融验证**：去L1→22.7%（崩溃），去L2→59.1%（下降），去L3→54.5%（轻微下降），证明三层缺一不可

#### 🔬 深入细节
##### 动机与背景

现有LLM Agent在处理超长时间跨度的科学研究任务（如24小时Kaggle竞赛）时面临根本性瓶颈：**上下文窗口爆炸**。随着Agent与环境交互步数增加，原始执行日志（代码、终端输出、调试信息）呈指数级增长，很快超出LLM的有效上下文窗口。简单的截断或滑动窗口策略会导致**认知遗忘**——Agent丢失早期关键决策和实验洞察，陷入重复探索。

传统方法的缺陷：
- **线性上下文保留**（如OpenHands、AIDE）：保留全部历史或简单截断，无法区分信息价值层次
- **固定摘要**：一次性压缩丢失决策理由和实验细节
- **无跨任务迁移**：每个任务从零开始，无法利用历史经验

HCC的核心洞察是：**Agent的认知应像CPU缓存一样分层管理**——热数据（当前执行trace）保持原始精度，温数据（已完成phase的洞察）压缩为策略摘要，冷数据（跨任务经验）蒸馏为可迁移的先验知识。

![HCC 框架总览](https://ar5iv.labs.arxiv.org/html/2601.10402/assets/x1.png)
*图1：ML-Master 2.0 的 HCC 架构总览。左侧为三层缓存结构（L1/L2/L3），右侧为上下文迁移的三种操作（预取/命中/晋升）。*

##### 问题形式化

将Agent与环境的交互建模为序列决策过程。在时间步 \(t\)，Agent观察上下文 \(C_{t-1}\) 并生成动作 \(a_t = \pi_\theta(C_{t-1})\)，环境返回事件 \(e_t\)。核心挑战是设计上下文构造函数 \(g(\cdot)\)，使得：

$$C_{t-1} = g(\mathcal{E}_{t-1})$$

其中 \(\mathcal{E}_{t-1} = \{e_0, e_1, \ldots, e_{t-1}\}\) 是完整历史事件序列。朴素方法直接拼接所有事件，导致 \(|C_{t-1}|\) 线性增长直至超出窗口。HCC通过三层缓存和迁移机制重新定义 \(g(\cdot)\)。

##### 三层缓存架构

**L1: Evolving Experience（工作记忆）**

L1存储当前活跃phase的原始交互trace，是Agent的"工作记忆"。在phase \(p\) 的时间步 \(t \in [t_{p-1}, t_p)\)：

$$\mathcal{L}_1(t) = \mathcal{E}_{t_0:t_{p-2}} \cup \{P_{p-1}\} \cup \mathcal{E}_{t_{p-1}+1:t}$$

其中 \(\mathcal{E}_{t_0:t_{p-2}}\) 是历史phase边界事件，\(P_{p-1}\) 是上一个研究计划，\(\mathcal{E}_{t_{p-1}+1:t}\) 是当前phase的完整trace。L1保持原始精度，支持精细调试和代码修正。

**L2: Refined Knowledge（中期策略记忆）**

L2存储已完成phase的蒸馏摘要，由P1算子从L1压缩而来。定义 \(\kappa_{i:j}\) 为事件段 \(\mathcal{E}_{i:j}\) 的紧凑知识摘要：

$$\mathcal{L}_2(t) = \{\kappa_{t_{r-1}+1:t_r-1}\}_{r=1}^{p-1}$$

每个 \(\kappa_p\) 保留关键判断（如"特征X有害"）、实验洞察（如"CV在split Y上泄漏"）和决策理由，同时移除冗长的执行日志。这使Agent能回顾已验证的决策而无需携带完整执行记录。

**L3: Prior Wisdom（跨任务长期记忆）**

L3存储从历史任务蒸馏的可迁移策略，以embedding-value对形式持久化：

$$\mathcal{L}_3 \triangleq \{(\mathbf{h}_n, w_n)\}_{n=1}^{N}$$

其中 \(\mathbf{h}_n = E(d_n)\) 是任务描述符的语义embedding，\(w_n\) 是对应的蒸馏wisdom文本。L3跨任务持久化，仅在任务完成时通过P2算子更新。

##### 上下文迁移机制

![上下文迁移示例](https://ar5iv.labs.arxiv.org/html/2601.10402/assets/x2.png)
*图2：在plant-pathology-2021-fgvc8任务中的上下文迁移示例，展示预取、命中和晋升的完整流程。*

**1. Context Prefetching（预取：L3 → 初始化）**

任务开始前，计算当前任务描述符的embedding \(\mathbf{q} = E(d_\tau)\)，通过cosine相似度阈值检索相关先验：

$$\Omega_\tau = \{w_n \mid (\mathbf{h}_n, w_n) \in \mathcal{L}_3, \cos(\mathbf{q}, \mathbf{h}_n) > \delta\}$$

初始上下文构造为：\(e_0 = \text{concat}(d_\tau, u_{\text{user}}, \Omega_\tau)\)，确保Agent从强先验启动。

**2. Context Hit（命中：L1优先 / L2回退）**

上下文构造函数 \(g(\cdot)\) 实现类缓存命中策略：

$$\Psi_t(k) = \begin{cases} e_k, & e_k \in \mathcal{L}_1(t) \\ \kappa_{t_{r-1}+1:t_r-1}, & e_k \notin \mathcal{L}_1(t), e_k \in \mathcal{L}_2(t) \\ \varnothing, & \text{otherwise} \end{cases}$$

当前phase的事件从L1以原始形式检索（缓存命中），已完成phase的事件回退到L2的精炼摘要（缓存未命中），最终上下文为所有命中结果的拼接。

**3. Context Promotion（晋升：L1 → L2 → L3）**

晋升分两级：

- **Phase级晋升（P1算子）**：每个phase完成时，P1将该phase的 \(m \times q\) 条并行探索轨迹压缩为单个知识单元 \(\kappa_p\)，写入L2并从L1移除原始trace：

$$\kappa_p = P_1(\{\sigma_{p,i,j}\}_{(i,j) \in \mathcal{I}_p}), \quad \mathcal{L}_2 \leftarrow \mathcal{L}_2 \cup \{\kappa_p\}, \quad \mathcal{L}_1 \leftarrow \mathcal{L}_1 \setminus \{e \mid e \in \sigma_{p,i,j}\}$$

- **Task级晋升（P2算子）**：任务完成时，P2从完整任务历史（L1+L2）蒸馏出可迁移的wisdom \(w_\tau\)，写入L3：

$$w_\tau = P_2(C_{t_{\max}-1}), \quad \mathcal{L}_3 \leftarrow \mathcal{L}_3 \cup \{(E(d_\tau), w_\tau)\}$$

##### 整体工作流伪代码

```python
# HCC Agent 工作流伪代码
def hcc_agent(task_description, L3_wisdom_store):
    # Phase 0: Context Prefetching
    q = embed(task_description)
    Omega = {w for (h, w) in L3 if cosine(q, h) > delta}
    context = concat(task_description, user_instructions, Omega)
    
    # Generate initial code submission
    initial_code = LLM(context, prompt="generate baseline code")
    submit(initial_code)
    
    for phase_p in range(1, max_phases + 1):
        # Step 1: Hierarchical Research Plan
        plan = LLM(context, prompt="propose m directions × q suggestions")
        
        # Step 2: Parallel Execution
        trajectories = {}
        for direction_i in range(m):
            for suggestion_j in range(q):
                sigma_ij = execute_suggestion(plan[i][j])  # code → run → debug
                trajectories[(i,j)] = sigma_ij
        
        # Step 3: Context Hit (build context for next phase)
        # Current phase traces from L1 (raw), past phases from L2 (summaries)
        
        # Step 4: Phase-level Promotion (P1)
        kappa_p = P1_summarize(trajectories)  # LLM-based compression
        L2.add(kappa_p)
        L1.remove(raw_traces_of_phase_p)
        
        # Update context via hit policy
        context = build_context_with_hit_policy(L1, L2)
    
    # Task-level Promotion (P2)
    wisdom = P2_distill(full_task_history)
    L3.add((embed(task_description), wisdom))
```

##### 上下文压缩效果

![Token统计](https://ar5iv.labs.arxiv.org/html/2601.10402/assets/figures/token_count.png)
*图3：在random-acts-of-pizza任务中的上下文长度增长曲线。橙线为无HCC的原始上下文（>200k tokens），蓝线为HCC管理后的上下文（~70k tokens）。Agent在第4次研究计划迭代中成功获得奖牌。*

HCC的关键效果是将上下文从超过200k tokens压缩至约70k tokens，同时保留了所有关键的策略洞察和实验结论。这使得Agent能在有限的上下文窗口内维持跨越数十小时的战略连贯性。

##### 实验结果

在MLE-Bench（75个真实Kaggle任务）上的评估结果：

| Agent | Backbone | Low(%) | Medium(%) | High(%) | Avg Medal(%) |
|-------|----------|--------|-----------|---------|--------------|
| MLAB | gpt-4o | 4.6 | 0.0 | 0.0 | 1.6 |
| OpenHands | gpt-4o | 12.1 | 1.8 | 2.2 | 4.9 |
| AIDE | o1-preview | 35.9 | 8.5 | 11.7 | 17.1 |
| R&D-Agent | gpt-5 | 68.2 | 21.1 | 22.2 | 35.1 |
| FM Agent | Gemini-2.5-Pro | 62.1 | 36.8 | 33.3 | 43.6 |
| Thesis | gpt-5-codex | 65.2 | 45.6 | 31.1 | 48.4 |
| Leeroo* | Gemini-3-pro | 68.2 | 44.7 | 40.0 | 50.7 |
| ML-Master | DeepSeek-R1 | 48.5 | 20.2 | 24.4 | 29.3 |
| **ML-Master 2.0** | **DS-V3.2-Speciale** | **75.8** | **50.9** | **42.2** | **56.4** |

消融实验（MLE-Bench-Lite, 22题）：

| 配置 | Valid(%) | Median+(%) | Medal(%) |
|------|----------|------------|----------|
| ① 去L1（无迭代交互） | 54.5 | 36.4 | 22.7 |
| ② 去L2（无上下文压缩） | 95.5 | 81.8 | 59.1 |
| ③ 去L3（无跨任务迁移） | 95.5 | 72.7 | 54.5 |
| ④ 完整HCC | 95.5 | 81.8 | **72.7** |

> 💡 **关键发现**：L1是基础（去除后奖牌率暴跌至22.7%），L2提升顶尖表现（59.1%→72.7%），L3提供强初始化（54.5%→72.7%）。三层协同效果远超各层独立贡献之和。

##### 与传统方法的核心区别

| 维度 | 线性保留（OpenHands等） | 固定摘要 | HCC |
|------|------------------------|---------|-----|
| 上下文增长 | 线性，终将溢出 | 固定大小但信息损失 | 分层压缩，动态平衡 |
| 历史访问 | 全部或截断 | 仅摘要 | 热数据原始+冷数据摘要 |
| 跨任务迁移 | 无 | 无 | L3 embedding检索 |
| 认知连贯性 | 截断后丢失 | 摘要粒度粗 | Phase级精炼保留决策理由 |

#### 🧪 练习题
```yaml
question: "在HCC架构中，当Agent需要回顾一个已完成phase的实验结论时，上下文构造函数g(·)会从哪一层缓存获取信息？"
options:
  - "L1 Evolving Experience，因为它保存了所有原始交互记录"
  - "L2 Refined Knowledge，因为已完成phase的原始trace已被P1算子压缩并迁移至此"
  - "L3 Prior Wisdom，因为所有历史信息最终都会蒸馏到长期记忆"
  - "直接从LLM的参数记忆中检索，无需显式缓存"
answer: 1
explain: "HCC的Context Hit机制实现L1优先/L2回退策略：当前phase的事件从L1获取原始形式，而已完成phase的原始trace在Phase级晋升时已被P1算子压缩为精炼知识单元κ并存入L2，同时从L1中移除。因此回顾已完成phase时，g(·)从L2获取压缩后的摘要。"
```

### ICM

```yaml
id: icm
num: 28
name: ICM
full_name: 内在好奇心模块 (Intrinsic Curiosity Module)
year: '2017'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/1705.05363
project_url: ''
category: reward_design
motivation: 预测误差产生好奇心内在奖励
```

#### 📝 一句话总结
ICM 的核心目标是：预测误差产生好奇心内在奖励。

#### 🎯 核心要点
- 核心动机：预测误差产生好奇心内在奖励
- 代表机构：UC Berkeley

#### 🔬 深入细节
预测误差产生好奇心内在奖励


### RND

```yaml
id: rnd
num: 29
name: RND
full_name: 随机网络蒸馏 (Random Network Distillation)
year: '2018'
org: OpenAI
parent: icm
paper_url: https://arxiv.org/abs/1810.12894
project_url: ''
category: reward_design
motivation: 随机网络蒸馏衡量状态新颖性
```

#### 📝 一句话总结
RND 的核心目标是：随机网络蒸馏衡量状态新颖性。

#### 🎯 核心要点
- 核心动机：随机网络蒸馏衡量状态新颖性
- 演化来源：继承或改进自 icm
- 代表机构：OpenAI

#### 🔬 深入细节
随机网络蒸馏衡量状态新颖性


### LaGEA

```yaml
id: lagea
num: 30
name: LaGEA
full_name: 时间接地奖励塑形 (Temporally Grounded Reward Shaping)
year: '2026'
org: arXiv
parent: rnd
paper_url: https://arxiv.org/abs/2602.03001
project_url: ''
category: reward_design
motivation: VLM反射时间接地奖励塑形
```

#### 📝 一句话总结
LaGEA 的核心目标是：VLM反射时间接地奖励塑形。

#### 🎯 核心要点
- 核心动机：VLM反射时间接地奖励塑形
- 演化来源：继承或改进自 rnd
- 代表机构：arXiv

#### 🔬 深入细节
VLM反射时间接地奖励塑形


### MRBT

```yaml
id: mrbt
num: 31
name: MRBT
full_name: 掩码奖励行为树 (Masking Reward Behavior Tree)
year: '2026'
org: arXiv
parent: lagea
paper_url: https://arxiv.org/abs/2602.04567
project_url: ''
category: reward_design
motivation: 行为树+SMT确保奖励逻辑可验证
```

#### 📝 一句话总结
MRBT 的核心目标是：行为树+SMT确保奖励逻辑可验证。

#### 🎯 核心要点
- 核心动机：行为树+SMT确保奖励逻辑可验证
- 演化来源：继承或改进自 lagea
- 代表机构：arXiv

#### 🔬 深入细节
行为树+SMT确保奖励逻辑可验证


### VSIMR

```yaml
id: vsimr
num: 32
name: VSIMR
full_name: 变分状态内在奖励 (Variational State Intrinsic Reward)
year: '2025'
org: arXiv
parent: rnd
paper_url: https://arxiv.org/abs/2508.18420
project_url: ''
category: reward_design
motivation: 状态新颖性+LLM解决极端稀疏奖励
```

#### 📝 一句话总结
VSIMR 的核心目标是：状态新颖性+LLM解决极端稀疏奖励。

#### 🎯 核心要点
- 核心动机：状态新颖性+LLM解决极端稀疏奖励
- 演化来源：继承或改进自 rnd
- 代表机构：arXiv

#### 🔬 深入细节
状态新颖性+LLM解决极端稀疏奖励


### MBPO

```yaml
id: mbpo
num: 33
name: MBPO
full_name: 基于模型的策略优化 (Model-Based Policy Optimization)
year: '2019'
org: UC Berkeley
parent: sac
paper_url: https://arxiv.org/abs/1906.08253
project_url: ''
category: world_model
motivation: 短步长模型rollout平衡偏差与效率
```

#### 📝 一句话总结
MBPO 的核心目标是：短步长模型rollout平衡偏差与效率。

#### 🎯 核心要点
- 核心动机：短步长模型rollout平衡偏差与效率
- 演化来源：继承或改进自 sac
- 代表机构：UC Berkeley

#### 🔬 深入细节
短步长模型rollout平衡偏差与效率


### DreamerV1

```yaml
id: dreamerv1
num: 34
name: DreamerV1
full_name: 梦想者V1 (Dream to Control)
year: '2019'
org: DeepMind
parent: mbpo
paper_url: https://arxiv.org/abs/1912.01603
project_url: ''
category: world_model
motivation: 隐空间世界模型想象训练
```

#### 📝 一句话总结
DreamerV1 的核心目标是：隐空间世界模型想象训练。

#### 🎯 核心要点
- 核心动机：隐空间世界模型想象训练
- 演化来源：继承或改进自 mbpo
- 代表机构：DeepMind

#### 🔬 深入细节
隐空间世界模型想象训练


### DreamerV2

```yaml
id: dreamerv2
num: 35
name: DreamerV2
full_name: 梦想者V2 (Mastering Atari with Discrete World Models)
year: '2020'
org: DeepMind
parent: dreamerv1
paper_url: https://arxiv.org/abs/2010.02193
project_url: ''
category: world_model
motivation: 离散隐变量提升表征能力
```

#### 📝 一句话总结
DreamerV2 的核心目标是：离散隐变量提升表征能力。

#### 🎯 核心要点
- 核心动机：离散隐变量提升表征能力
- 演化来源：继承或改进自 dreamerv1
- 代表机构：DeepMind

#### 🔬 深入细节
离散隐变量提升表征能力


### DreamerV3

```yaml
id: dreamerv3
num: 36
name: DreamerV3
full_name: 梦想者V3 (Mastering Diverse Domains through World Models)
year: '2023'
org: DeepMind
parent: dreamerv2
paper_url: https://arxiv.org/abs/2301.04104
project_url: ''
category: world_model
motivation: symlog变换实现跨任务通用性
```

#### 📝 一句话总结
DreamerV3 通过 symlog 预测、离散回归（twohot 编码）和鲁棒的回报归一化等一系列信号尺度无关的设计，使得一套固定超参数即可在超过 150 个跨领域基准任务（Atari、DMC、Minecraft 等）上达到或超越专门调参的算法，首次以通用 MBRL 智能体在 Minecraft 中无人类数据地从零收集钻石。

#### 🎯 核心要点
- **Symlog 预测**：对世界模型的解码器和奖励预测器使用 \(\operatorname{symlog}\) 变换压缩目标尺度，使同一网络适应从 \(10^{-1}\) 到 \(10^{4}\) 量级的信号
- **RSSM 世界模型**：由序列模型（GRU）、编码器、动力学先验、解码器、奖励预测器和 continue 预测器组成，在隐空间中进行想象训练
- **KL 平衡 + Free Bits**：世界模型损失中对 KL 散度使用 \(\alpha=0.5\) 的 KL 平衡和 1 nat 的 free bits，避免后验坍缩和先验过拟合
- **Critic 离散回归**：Critic 在 symlog 空间的 255 个等距桶上输出 softmax 分布，使用 twohot 编码的软标签进行分类交叉熵训练，有效处理多模态回报分布
- **鲁棒回报归一化**：使用 \(\lambda\)-return 的第 5 至第 95 百分位距作为缩放因子 \(S\)，仅在 \(S>1\) 时缩小回报，避免稀疏奖励下放大噪声
- **固定超参数**：单一熵正则化系数 \(\eta=3\times10^{-4}\)、折扣因子 \(\gamma=0.997\)、想象步长 \(T=16\) 等超参数在所有领域通用
- **跨领域验证**：在 7 大领域超过 150 个任务上测试，包括连续/离散动作、稠密/稀疏奖励、2D/3D 视觉输入等多种设置
- **Minecraft 钻石里程碑**：首个无人类演示、无课程学习、从零在 Minecraft 中收集钻石的通用智能体

#### 🔬 深入细节
##### 整体架构示意图

![DreamerV3 整体架构](https://ar5iv.labs.arxiv.org/html/2301.04104v2/assets/figures/method.png)

*图：DreamerV3 的三阶段训练流程。(1) 世界模型从经验中学习紧凑的隐空间表征；(2) Actor-Critic 在世界模型的想象轨迹中学习行为策略；(3) 智能体在真实环境中执行动作并收集新经验。*

##### 算法伪代码

```python
# DreamerV3 训练循环伪代码
Initialize world model (RSSM), actor π_θ, critic v_ψ, replay buffer D

for each training step:
    # === Phase 1: Environment Interaction ===
    s_t = world_model.encode(o_t)          # 编码观测为模型状态
    a_t ~ π_θ(a_t | s_t)                   # 从策略采样动作
    o_{t+1}, r_t, done = env.step(a_t)     # 环境交互
    D.add(o_t, a_t, r_t, done)             # 存入回放缓冲区

    # === Phase 2: World Model Learning ===
    batch = D.sample(B=16, T=64)           # 采样序列批次
    # RSSM: 编码 → 动力学预测 → 解码
    L_pred = -ln p(o_t|s_t) - ln p(r_t|s_t) - ln p(c_t|s_t)  # symlog MSE + twohot CE
    L_dyn  = max(1, KL[sg(posterior) || prior])                 # free bits
    L_rep  = max(1, KL[posterior || sg(prior)])                 # free bits
    L_WM   = 1·L_pred + 0.5·L_dyn + 0.1·L_rep
    update world_model with L_WM

    # === Phase 3: Imagination (Actor-Critic Learning) ===
    imagine s_{1:T} using dynamics + actor (T=16 steps)
    r_{1:T} = reward_predictor(s_{1:T})
    c_{1:T} = continue_predictor(s_{1:T})

    # Compute λ-returns with bootstrapping
    R^λ_T = v_ψ(s_T)
    for t = T-1 to 1:
        R^λ_t = r_t + γ·c_t·((1-λ)·v_ψ(s_{t+1}) + λ·R^λ_{t+1})

    # Critic: discrete regression with twohot targets
    targets = sg(twohot(symlog(R^λ_t)))
    L_critic = -Σ targets^T · ln p_ψ(·|s_t)     # cross entropy
    update critic with L_critic (+ EMA regularization)

    # Actor: normalized returns + entropy
    S = Percentile(R^λ, 95) - Percentile(R^λ, 5)
    L_actor = -Σ sg(R^λ_t) / max(1, S) - η·H[π_θ(·|s_t)]   # η=3e-4
    update actor with L_actor
```

##### 动机与背景

基于模型的强化学习（MBRL）通过学习环境的世界模型并在模型内部进行"想象"训练，具有极高的样本效率。DreamerV1/V2 在 Atari 和连续控制任务上取得了优异成绩，但面临一个根本性挑战：**不同任务的奖励尺度、频率和动态范围差异巨大**，导致同一套超参数无法跨领域通用。例如，Atari 中奖励可达数千，而机器人控制中奖励通常在 \([0, 1]\) 范围内。

DreamerV3 的核心动机是设计一系列**信号尺度无关（scale-invariant）**的机制，使算法无需针对每个任务调参即可在多样化领域中表现良好。

##### 核心机制 1：Symlog 预测

传统世界模型使用均方误差（MSE）损失训练解码器和奖励预测器。当目标值跨越多个数量级时，大值主导梯度，小值被忽略。DreamerV3 引入 symlog 变换：

$$\operatorname{symlog}(x) \doteq \operatorname{sign}(x)\ln(|x|+1)$$

$$\operatorname{symexp}(x) \doteq \operatorname{sign}(x)(\exp(|x|)-1)$$

网络在 symlog 空间中预测，损失函数变为：

$$\mathcal{L}(\theta) = \frac{1}{2}\big(\operatorname{symlog}(y) - \hat{y}_\theta\big)^2$$

> 💡 **关键直觉**：symlog 是一种"软对数"变换——对大值近似取对数压缩，对小值近似恒等保持。这使得网络可以同时精确预测 0.01 和 10000 量级的目标，而无需调整损失权重。

##### 核心机制 2：RSSM 世界模型

世界模型基于循环状态空间模型（RSSM），模型状态 \(s_t = \{h_t, z_t\}\) 由确定性循环状态 \(h_t\) 和随机离散表征 \(z_t\)（32 个类别 × 32 维 one-hot）组成：

$$\begin{aligned}
\text{Sequence model:} \quad & h_t = f_\phi(h_{t-1}, z_{t-1}, a_{t-1}) \\
\text{Encoder:} \quad & z_t \sim q_\phi(z_t \mid h_t, x_t) \\
\text{Dynamics (prior):} \quad & \hat{z}_t \sim p_\phi(\hat{z}_t \mid h_t) \\
\text{Decoder:} \quad & \hat{x}_t \sim p_\phi(\hat{x}_t \mid h_t, z_t) \\
\text{Reward:} \quad & \hat{r}_t \sim p_\phi(\hat{r}_t \mid h_t, z_t) \\
\text{Continue:} \quad & \hat{c}_t \sim p_\phi(\hat{c}_t \mid h_t, z_t)
\end{aligned}$$

世界模型损失由三部分组成：

$$\mathcal{L}_\text{WM}(\phi) = \beta_\text{pred}\,\mathcal{L}_\text{pred} + \beta_\text{dyn}\,\mathcal{L}_\text{dyn} + \beta_\text{rep}\,\mathcal{L}_\text{rep}$$

其中 \(\beta_\text{pred}=1, \beta_\text{dyn}=0.5, \beta_\text{rep}=0.1\)。动力学损失和表征损失分别使用 stop-gradient 实现 **KL 平衡**：

$$\mathcal{L}_\text{dyn}(\phi) = \max\big(1, \mathrm{KL}[\operatorname{sg}(q_\phi) \| p_\phi]\big)$$

$$\mathcal{L}_\text{rep}(\phi) = \max\big(1, \mathrm{KL}[q_\phi \| \operatorname{sg}(p_\phi)]\big)$$

> ⚠️ **注意**：free bits 阈值为 1 nat，意味着当 KL 散度低于 1 nat 时不产生梯度。这允许编码器保留少量不可预测的信息（如随机噪声），避免过度压缩表征。此外，后验分布混入 1% 均匀分布以防止梯度稀疏。

##### 核心机制 3：Critic 离散回归

传统 Critic 使用标量回归预测回报值，但当回报分布呈多模态（如稀疏奖励下大量零回报 + 少量高回报）时，均值回归会产生偏差。DreamerV3 的 Critic 输出一个在 symlog 空间 \([-20, +20]\) 范围内 255 个等距桶上的 softmax 分布：

$$v_\psi(s_t) \doteq \operatorname{symexp}\big(p_\psi(\cdot\mid s_t)^T B\big), \quad B \doteq [-20 \;\ldots\; +20]$$

训练目标使用 **twohot 编码**的 \(\lambda\)-return 作为软标签，通过分类交叉熵优化：

$$\mathcal{L}_\text{critic}(\psi) = -\sum_{t=1}^{T} y_t^T \ln p_\psi(\cdot \mid s_t), \quad y_t = \operatorname{sg}\big(\operatorname{twohot}(\operatorname{symlog}(R_t^\lambda))\big)$$

其中 twohot 编码将连续值分配到最近的两个桶上，权重与距离成反比。\(\lambda\)-return 的递推公式为：

$$R_t^\lambda \doteq r_t + \gamma c_t \big((1-\lambda)v_\psi(s_{t+1}) + \lambda R_{t+1}^\lambda\big), \quad R_T^\lambda \doteq v_\psi(s_T)$$

> 💡 **关键直觉**：离散回归让 Critic 维护完整的回报分布而非单一均值。在稀疏奖励环境中，Critic 可以同时表示"大概率零回报"和"小概率高回报"两个模态，显著加速学习。

##### 核心机制 4：鲁棒回报归一化

Actor 损失为：

$$\mathcal{L}(\theta) \doteq \sum_{t=1}^{T} \operatorname{E}_{\pi_\theta, p_\phi}\big[\operatorname{sg}(R_t^\lambda) / \max(1, S)\big] - \eta\,\mathrm{H}[\pi_\theta(a_t \mid s_t)]$$

其中 \(\eta = 3 \times 10^{-4}\) 为熵正则化系数。关键创新在于缩放因子 \(S\)：

$$S = \operatorname{Per}(R_t^\lambda, 95) - \operatorname{Per}(R_t^\lambda, 5)$$

使用百分位距而非标准差有两个优势：(1) 对异常值鲁棒；(2) 通过 \(\max(1, S)\) 确保**只缩小大回报、不放大小回报**——当奖励稀疏时 \(S < 1\)，回报不被缩放，策略保持足够的探索熵。

> 💡 **关键直觉**：这一简单的非对称归一化是 DreamerV3 能用单一 \(\eta\) 同时适应稠密和稀疏奖励的核心。传统方法除以标准差会在稀疏奖励下放大噪声，导致策略过早确定化而无法探索。

##### 与 DreamerV2 的关键区别

| 特性 | DreamerV2 | DreamerV3 |
|------|-----------|-----------|
| 预测损失 | MSE / 交叉熵 | **Symlog MSE** |
| Critic 输出 | 标量回归 | **255 桶离散回归 (twohot)** |
| 回报归一化 | 除以标准差 | **百分位距 + max(1, S)** |
| 熵正则 | 需要调参 | **固定 η=3e-4** |
| KL 平衡 | α=0.8 | **α=0.5** |
| 后验分布 | 纯分类 | **混入 1% 均匀分布** |
| 网络初始化 | 默认 | **奖励/Critic 输出层零初始化** |
| 适用范围 | 主要 Atari | **7 大领域 150+ 任务** |

##### 实验亮点

DreamerV3 在以下领域均使用**完全相同的超参数**取得了强竞争力的表现：

- **Atari 100K & 200M**：匹配或超越专门调参的 EfficientZero、MuZero
- **DMControl (Proprio & Vision)**：连续控制基准上达到 SOTA
- **BSuite**：诊断性基准上表现优异
- **Crafter**：程序生成的 2D 生存游戏中刷新记录
- **Minecraft (钻石收集)**：首次无人类数据从零收集钻石，需要完成约 20 步的长程依赖任务链（砍树→制作工作台→制作木镐→挖石头→制作石镐→挖铁→熔炼→制作铁镐→挖钻石）

#### 🧪 练习题
```yaml
question: "DreamerV3 中 Critic 使用离散回归（twohot 编码 + softmax 分布）而非传统标量回归的主要原因是什么？"
options:
  - "减少 Critic 网络的参数量"
  - "使 Critic 能够表示多模态回报分布，加速稀疏奖励环境中的学习"
  - "避免使用目标网络（target network）"
  - "使 Critic 的输出可微分以支持反向传播"
answer: 1
explain: "稀疏奖励环境中回报分布通常呈双模态（大量零回报+少量高回报），标量回归只能预测均值，而离散回归让 Critic 维护完整分布，能同时表示两个模态，显著加速学习。"
```

### DreamDojo

```yaml
id: dreamdojo
num: 37
name: DreamDojo
full_name: 梦想道场 (Generalist Robot World Model)
year: '2026'
org: arXiv
parent: dreamerv3
paper_url: https://arxiv.org/abs/2602.06949
project_url: ''
category: world_model
motivation: 人类视频预训练通用世界模型
```

#### 📝 一句话总结
DreamDojo 提出了一种基于大规模人类视频预训练的通用机器人世界模型框架，通过隐式动作（latent action）桥接人类视频与机器人数据之间的动作空间鸿沟，结合三阶段训练流程（预训练→后训练→蒸馏）和 Self Forcing 实时推理技术，在灵巧操作任务中实现了高保真视频预测，并成功应用于策略评估（Pearson r=0.995）、模型规划（2× 提升）和实时遥操作等下游任务。

#### 🎯 核心要点
- **DreamDojo-HV 数据集**：从 Ego4D、Epic-Kitchens 等来源精心筛选 44,000 小时人类手部操作视频，通过手部检测、运动过滤、美学评分等多阶段管线进行质量控制
- **隐式动作模型（Latent Action Model）**：训练 VAE 从连续帧对 \((o_t, o_{t+1})\) 中提取连续隐式动作向量 \(z_t\)，使无动作标注的人类视频也能以动作条件方式训练世界模型
- **相对动作表示 + 因果动作分块**：使用 \(a_t^{\text{rel}} = a_t - a_{t-1}\) 消除不同机器人形态的绝对动作偏移；因果分块确保生成第 \(t\) 帧时仅使用 \(a_{1:t}\) 而非未来动作
- **三阶段训练流程**：(1) 在人类视频上用隐式动作预训练；(2) 在目标机器人数据上用真实动作后训练（50/50 数据混合最优）；(3) Self Forcing 蒸馏实现实时自回归生成
- **架构设计**：基于 Cosmos-Predict2.5（DiT 架构），动作通过自适应层归一化（adaLN）注入，与扩散时间步共享条件通道
- **时间一致性损失**：在相邻帧的 latent token 之间施加余弦相似度约束，抑制自回归漂移
- **下游应用验证**：策略评估（与真实成功率 Pearson r=0.995）、基于模型的规划（相比无模型基线 2× 提升）、实时遥操作反馈

#### 🔬 深入细节
##### 系统架构总览

![DreamDojo 系统架构](https://ar5iv.labs.arxiv.org/html/2602.06949/assets/figures/teaser.png)

*图：DreamDojo 的三阶段训练流程。Stage 1 在大规模人类视频上用隐式动作预训练世界模型；Stage 2 在目标机器人数据上用真实动作后训练；Stage 3 通过 Self Forcing 蒸馏实现实时自回归推理。下游应用包括策略评估、模型规划和实时遥操作。*

##### 算法伪代码

```
Algorithm: DreamDojo 三阶段训练流程
══════════════════════════════════════════════════

【Stage 0: 隐式动作模型训练】
初始化 VAE 编码器 q_φ(z|o_t, o_{t+1}), 解码器 p_ψ(o_{t+1}|o_t, z)
for each (o_t, o_{t+1}) in 人类视频数据 do
    z ~ q_φ(z|o_t, o_{t+1})                    # 编码隐式动作
    ô_{t+1} = p_ψ(o_{t+1}|o_t, z)              # 解码预测下一帧
    L_VAE = L_recon(ô_{t+1}, o_{t+1}) + β·KL(q_φ || N(0,I))
    更新 φ, ψ
end for

【Stage 1: 人类视频预训练】
初始化世界模型 W_θ (基于 Cosmos-Predict2.5 DiT)
for each 视频片段 {o_1,...,o_T} in DreamDojo-HV do
    for t = 1 to T-1 do
        z_t = q_φ(z|o_t, o_{t+1})              # 提取隐式动作（冻结VAE）
    end for
    a^{rel}_t = z_t - z_{t-1}                   # 相对隐式动作
    A_{1:t} = CausalChunk(a^{rel}_{1:T})        # 因果动作分块
    L_pretrain = L_flow(W_θ(o_{1:T}|A_{1:T}))   # Flow matching 损失
                + λ·L_temporal                    # 时间一致性损失
    更新 θ
end for

【Stage 2: 机器人数据后训练】
for each (视频, 动作) in 机器人数据 ∪ 人类视频(50/50) do
    if 机器人数据:
        a^{rel}_t = a_t - a_{t-1}               # 真实相对动作
    else:
        a^{rel}_t = z_t - z_{t-1}               # 隐式相对动作
    L_posttrain = L_flow(W_θ(o_{1:T}|A_{1:T})) + λ·L_temporal
    更新 θ
end for

【Stage 3: Self Forcing 蒸馏】
for each 训练样本 do
    # 教师：完整上下文（真实帧）
    ô^{teacher} = W_θ(noise | o_{1:T}, A)       # 全上下文前向
    # 学生：自回归（用自己的预测帧）
    for t = 1 to T do
        ô_t = W_θ(noise | ô_{1:t-1}, A_{1:t})  # 用预测帧做上下文
    end for
    L_distill = ||ô^{student} - sg(ô^{teacher})||²  # sg=stop gradient
    更新 θ（仅学生路径）
end for
```

##### 动机与背景

构建通用机器人世界模型面临两大核心挑战：

1. **数据稀缺**：高质量机器人操作数据极其有限（如 DROID 仅约 350 小时），远不足以训练大规模视频生成模型
2. **动作空间鸿沟**：人类视频虽然海量但缺乏动作标注，且人手与机器人末端执行器的形态差异巨大

DreamDojo 的核心洞察是：**人类操作视频蕴含丰富的物理交互先验**（物体动力学、接触力学、空间推理），这些先验可以通过隐式动作模型迁移到机器人世界模型中。这一思路类似于大语言模型先在大规模文本上预训练、再在特定任务上微调的范式。

##### 隐式动作模型（Latent Action Model）

隐式动作模型是连接人类视频与机器人数据的关键桥梁。其核心思想是：即使没有显式动作标注，连续两帧之间的变化本身就隐含了"动作"信息。

**模型结构**：采用 VAE 架构
- **编码器** \(q_\phi(z_t | o_t, o_{t+1})\)：输入连续两帧，输出隐式动作向量 \(z_t \in \mathbb{R}^d\)
- **解码器** \(p_\psi(\hat{o}_{t+1} | o_t, z_t)\)：给定当前帧和隐式动作，重建下一帧

**训练目标**：

$$\mathcal{L}_{\text{VAE}} = \mathbb{E}_{q_\phi}\left[\|o_{t+1} - \hat{o}_{t+1}\|^2\right] + \beta \cdot D_{\text{KL}}\left(q_\phi(z|o_t, o_{t+1}) \| \mathcal{N}(0, I)\right)$$

> 💡 **关键设计**：隐式动作向量 \(z_t\) 捕获的是帧间"发生了什么变化"的抽象表示，而非具体的关节角度或末端位姿。这使得同一个隐式动作空间可以统一描述人手抓取和机械臂操作。

##### 相对动作表示（Relative Action Representation）

直接使用绝对动作值会引入机器人形态相关的偏移，阻碍跨形态迁移。DreamDojo 采用相对动作表示：

$$a_t^{\text{rel}} = a_t - a_{t-1}$$

对于机器人真实动作和隐式动作均适用。这样做的好处是：
- 消除不同机器人之间的绝对位置偏移
- 使动作语义更聚焦于"变化量"而非"绝对状态"
- 实验证明相对表示在 FVD 指标上比绝对表示提升约 15%

##### 因果动作分块（Causal Action Chunking）

在视频扩散模型中，标准做法是将整个动作序列 \(a_{1:T}\) 作为条件输入。但这存在**信息泄漏**问题：生成第 \(t\) 帧时不应看到未来动作 \(a_{t+1:T}\)。

DreamDojo 提出因果动作分块机制：
- 将视频帧按时间分为多个 chunk
- 每个 chunk 仅接收当前及之前的动作作为条件
- 通过在 DiT 的注意力机制中施加因果掩码实现

$$\text{ActionCond}(t) = \text{adaLN}\left(\text{MLP}(a_{1:\lfloor t/C \rfloor \cdot C})\right)$$

其中 \(C\) 为 chunk 大小。实验表明因果分块相比非因果方式在 FVD 上提升约 10%。

##### 世界模型架构

DreamDojo 基于 **Cosmos-Predict2.5**（NVIDIA 的视频生成基础模型），核心为 DiT（Diffusion Transformer）架构：

- **视频 Tokenizer**：将视频帧编码为连续 latent tokens（非离散 token）
- **DiT 主干**：Transformer 处理 spatiotemporal latent tokens
- **动作条件注入**：通过 **自适应层归一化（adaLN）** 将动作嵌入注入每个 Transformer 块，与扩散时间步 \(t\) 共享条件通道：

$$\text{adaLN}(h, a, t) = \gamma(a, t) \cdot \text{LayerNorm}(h) + \beta(a, t)$$

其中 \(\gamma, \beta\) 由动作和时间步的拼接嵌入经 MLP 生成。

- **训练目标**：Flow Matching（连续归一化流），相比离散扩散更高效：

$$\mathcal{L}_{\text{flow}} = \mathbb{E}_{t, x_0, \epsilon}\left[\|v_\theta(x_t, t, c) - (x_0 - \epsilon)\|^2\right]$$

其中 \(x_t = (1-t)x_0 + t\epsilon\) 为插值噪声样本，\(v_\theta\) 为速度场预测网络。

##### 时间一致性损失（Temporal Consistency Loss）

自回归生成中，误差会随时间步累积导致视觉漂移。DreamDojo 引入时间一致性正则项：

$$\mathcal{L}_{\text{temporal}} = 1 - \frac{1}{T-1}\sum_{t=1}^{T-1} \cos(h_t, h_{t+1})$$

其中 \(h_t\) 为第 \(t\) 帧的 latent token 表示，\(\cos(\cdot, \cdot)\) 为余弦相似度。该损失鼓励相邻帧在隐空间中保持平滑过渡。

##### Self Forcing 蒸馏

标准扩散模型在推理时需要多步去噪（如 35 步 DDPM），无法满足实时需求。DreamDojo 采用 **Self Forcing** 蒸馏策略：

1. **教师模型**：使用完整真实上下文帧进行多步去噪，生成高质量预测
2. **学生模型**：以自回归方式运行，用自己之前的预测帧作为上下文
3. **蒸馏损失**：学生输出对齐教师输出（stop gradient 在教师端）

$$\mathcal{L}_{\text{SF}} = \|\hat{x}_0^{\text{student}} - \text{sg}(\hat{x}_0^{\text{teacher}})\|^2$$

蒸馏后的模型可以在**单步去噪**下实现自回归视频生成，推理速度提升约 35×，支持实时遥操作场景。

##### 实验结果

**评估基准**：DROID 数据集上 7 个灵巧操作任务（抓取、放置、开抽屉等）

**关键发现**：

| 配置 | FVD ↓ | FID ↓ | SSIM ↑ | LPIPS ↓ |
|------|-------|-------|--------|---------|
| 仅机器人数据 | 基线 | 基线 | 基线 | 基线 |
| + 人类视频预训练 | **显著提升** | **显著提升** | **提升** | **提升** |
| + 相对动作 | 额外 ~15% 提升 | — | — | — |
| + 因果分块 | 额外 ~10% 提升 | — | — | — |
| + 时间一致性 | 额外提升 | — | — | — |

**数据混合比例消融**：

| 人类:机器人 | FVD |
|------------|-----|
| 0:100 | 较高 |
| 25:75 | 中等 |
| **50:50** | **最优** |
| 75:25 | 回升 |
| 100:0 | 最高 |

> 💡 **关键发现**：50/50 的数据混合比例在后训练阶段表现最优，说明人类视频提供的物理先验与机器人特定数据的平衡至关重要。

**下游应用结果**：

1. **策略评估**：世界模型预测的成功率与真实环境成功率的 Pearson 相关系数达到 **r = 0.995**，可作为策略选择的可靠代理指标
2. **模型规划**：基于世界模型的 CEM（交叉熵方法）规划相比无模型基线实现 **2× 成功率提升**
3. **实时遥操作**：Self Forcing 蒸馏后的模型支持实时视频预测反馈，操作员可在执行前预览动作效果

##### 与相关工作的对比

| 方法 | 预训练数据 | 动作条件 | 实时推理 | 下游任务 |
|------|-----------|---------|---------|---------|
| UniSim | 互联网视频 | 文本/动作 | ✗ | 数据增强 |
| Genie | 互联网视频 | 隐式动作 | ✗ | 游戏生成 |
| IRASim | 机器人数据 | 机器人动作 | ✗ | 数据增强 |
| **DreamDojo** | **人类视频+机器人** | **隐式+真实动作** | **✓（Self Forcing）** | **评估+规划+遥操作** |

DreamDojo 的独特贡献在于：(1) 首次系统性地利用大规模人类视频预训练机器人世界模型；(2) 通过隐式动作统一了异构数据源；(3) 通过 Self Forcing 实现了实时推理能力。

#### 🧪 练习题
```yaml
1. **概念理解**：为什么 DreamDojo 使用相对动作表示 \(a_t^{\text{rel}} = a_t - a_{t-1}\) 而非绝对动作？如果直接使用绝对动作，在跨机器人形态迁移时会遇到什么问题？

2. **设计分析**：隐式动作模型（Latent Action Model）的 VAE 编码器输入是 \((o_t, o_{t+1})\) 两帧而非单帧。请解释为什么需要两帧输入，以及如果只用单帧 \(o_t\) 作为编码器输入会导致什么问题？

3. **因果性思考**：因果动作分块（Causal Action Chunking）解决了什么信息泄漏问题？请举一个具体的灵巧操作场景说明：如果生成第 \(t\) 帧时看到了未来动作 \(a_{t+1}\)，会导致什么不合理的生成结果？

4. **工程权衡**：Self Forcing 蒸馏将多步去噪压缩为单步推理，推理速度提升约 35×。请分析这种蒸馏可能带来的生成质量损失，以及在哪些下游任务中这种损失是可接受的、哪些任务中不可接受？

5. **拓展思考**：DreamDojo 在后训练阶段发现 50/50 的人类-机器人数据混合比例最优。请从"正则化"和"领域迁移"两个角度解释为什么纯机器人数据（0:100）和纯人类数据（100:0）都不是最优选择。如果机器人数据量增加 10 倍，你认为最优混合比例会如何变化？
```

### AdaWorldPolicy

```yaml
id: adaworldpolicy
num: 38
name: AdaWorldPolicy
full_name: 自适应世界策略 (Adaptive World-Model-Driven Policy)
year: '2026'
org: arXiv
parent: dreamdojo
paper_url: https://arxiv.org/abs/2602.07890
project_url: ''
category: world_model
motivation: 流匹配DiT动作生成与未来想象
```

#### 📝 一句话总结
AdaWorldPolicy 提出了一个统一的世界模型驱动扩散策略框架，将预训练视频世界模型（Cosmos）与动作专家、力预测器通过多模态自注意力（MMSA）深度融合，并创新性地利用世界模型的预测误差作为自监督信号，在测试时通过 LoRA 在线自适应学习（AdaOL）持续缩小视觉与物理域偏移，在仿真和真实机器人操作任务中均达到 SOTA。

#### 🎯 核心要点
- **三模块统一架构**：World Model（2B 参数，基于 Cosmos-Predict2）、Action Model（0.4B DiT）、Force Predictor（0.4B DiT），通过共享的多模态自注意力层（MMSA）深度耦合
- **双运行模式**：Mode I（Action Generation）——给定观测生成动作；Mode II（Future Imagination）——给定观测和动作预测未来帧，世界模型在训练时作为动作模型的主动监督者
- **多模态自注意力（MMSA）**：在 DiT 的 Transformer 层中，将世界模型、动作模型、力预测器的 token 拼接后做联合自注意力，实现跨模态信息流动，优于简单拼接或交叉注意力
- **Flow Matching 训练**：动作模型和力预测器均采用 Rectified Flow Matching 进行去噪训练，损失函数为 \(L_1\)（动作）和 \(L_2\)（力）
- **在线自适应学习（AdaOL）**：测试时利用世界模型预测的未来帧与真实观测在 VAE 隐空间的误差 \(\|E(o_{t+1}) - E(\hat{o}_{t+1})\|^2\) 作为自监督信号，通过 LoRA（rank 16，前 4 层，<0.1% 参数）以极低开销在线更新模型
- **联合训练目标**：\(L_{total} = L_{WM} + \lambda_1 L_{AM} + \lambda_2 L_{FP}\)，世界模型损失同时监督动作模型的学习质量
- **实验覆盖广泛**：LIBERO-10（0.96 成功率 SOTA）、Variant PushT（OOD 恢复）、CALVIN ABC→D（Avg. Len. 3.54 SOTA）、真实机器人 4 任务 4 种 OOD 场景

#### 🔬 深入细节
##### 框架总览

![AdaWorldPolicy 框架总览](https://ar5iv.labs.arxiv.org/html/2602.20057/assets/x2.png)

*图：AdaWorldPolicy 整体架构。左侧为统一的世界模型驱动扩散策略，包含 World Model、Action Model 和 Force Predictor 三个模块，通过 MMSA 层深度耦合。右侧为在线自适应学习（AdaOL）流程：利用世界模型预测误差驱动 LoRA 在线更新。*

##### 算法伪代码

```python
# ===== 离线训练阶段 =====
# 输入: 数据集 D = {(o_t, a_t, f_t, o_{t+1})}
for batch in DataLoader(D):
    o_t, a_t, f_t, o_next = batch
    
    # 编码观测到 VAE 隐空间
    z_t = VAE_Encode(o_t)
    z_next = VAE_Encode(o_next)
    
    # --- Mode I: Action Generation ---
    # 对动作和力加噪 (Flow Matching)
    noise_a, noise_f = sample_noise()
    t = uniform(0, 1)
    a_noisy = (1-t) * noise_a + t * a_t
    f_noisy = (1-t) * noise_f + t * f_t
    
    # MMSA 联合前向: WM tokens + AM tokens + FP tokens
    wm_out, am_out, fp_out = MMSA_Forward(
        wm_input=z_t,           # 世界模型: 当前帧
        am_input=a_noisy,       # 动作模型: 带噪动作
        fp_input=f_noisy,       # 力预测器: 带噪力
        timestep=t
    )
    
    L_AM = L1(am_out, a_t - noise_a)      # 动作 flow matching loss
    L_FP = L2(fp_out, f_t - noise_f)      # 力 flow matching loss
    
    # --- Mode II: Future Imagination ---
    z_next_pred = WorldModel_Forward(z_t, a_t)  # 用真实动作预测下一帧
    L_WM = diffusion_loss(z_next_pred, z_next)  # 世界模型重建损失
    
    # 联合优化
    L_total = L_WM + lambda1 * L_AM + lambda2 * L_FP
    optimizer.step(L_total)

# ===== 在线自适应阶段 (AdaOL) =====
# 测试时, 每收到新观测 o_{t+1}:
for each new observation o_{t+1}:
    # 1. 用上一步动作 a_t 和观测 o_t 预测未来帧
    o_hat_next = WorldModel_Predict(o_t, a_t)
    
    # 2. 计算 VAE 隐空间预测误差
    L_AdaOL = ||VAE_Encode(o_{t+1}) - VAE_Encode(o_hat_next)||^2
    
    # 3. LoRA 在线更新 (rank=16, 前4层, lr=5e-7, 2 gradient steps)
    lora_optimizer.step(L_AdaOL)
    
    # 4. 生成下一步动作
    a_{t+1} = ActionModel_Generate(o_{t+1})  # Mode I 推理
```

##### 动机与背景

传统的机器人操作策略学习面临两大核心挑战：

1. **策略与世界理解的割裂**：现有方法要么将世界模型仅用于数据增强或辅助表征学习，要么完全依赖行为克隆，无法让世界模型在训练过程中主动指导策略优化。世界模型蕴含的丰富物理先验（物体运动规律、接触动力学）未被充分利用。

2. **域偏移下的脆弱性**：离线训练的策略在部署时面临不可避免的视觉偏移（光照、背景、物体外观变化）和物理偏移（摩擦力、物体质量变化），性能急剧下降。传统方法缺乏测试时自适应能力。

AdaWorldPolicy 的核心洞察是：**世界模型不仅是一个被动的环境模拟器，更应该是策略学习的主动监督者**。通过将世界模型与动作策略深度耦合，世界模型的预测质量直接影响策略的学习信号；而在测试时，世界模型的预测误差天然提供了一个无需人工标注的自监督信号，可用于在线自适应。

##### 核心机制详解

**1. 多模态自注意力（MMSA）融合**

AdaWorldPolicy 的三个模块（World Model、Action Model、Force Predictor）并非简单串联，而是通过 MMSA 在 Transformer 层级深度交互。具体而言，在每个 DiT block 中：

$$
[\mathbf{h}_{WM}, \mathbf{h}_{AM}, \mathbf{h}_{FP}] = \text{SelfAttn}([\mathbf{z}_{WM} \| \mathbf{z}_{AM} \| \mathbf{z}_{FP}])
$$

其中 \(\mathbf{z}_{WM}\) 是世界模型的视频 token（来自 Cosmos-Predict2 的 2B 参数骨干），\(\mathbf{z}_{AM}\) 和 \(\mathbf{z}_{FP}\) 分别是动作模型和力预测器的 token。三者在同一注意力矩阵中自由交互，使得：
- 动作模型可以"看到"世界模型对未来的预测，从而学习物理一致的动作
- 力预测器可以感知视觉上下文，提升接触力估计精度
- 世界模型可以获得动作意图信息，提升预测准确性

> 💡 关键：消融实验表明，将 MMSA 替换为简单拼接（Concatenation）成功率从 76.3% 暴跌至 36.3%，替换为交叉注意力（Cross-Attention）也仅有 50.0%，证明了联合自注意力对多模态融合的必要性。

**2. 双模式训练机制**

框架支持两种运行模式，共享同一套参数：

- **Mode I（Action Generation）**：输入当前观测 \(o_t\)，通过 Flow Matching 去噪过程生成动作序列 \(a_t\) 和力预测 \(f_t\)。此模式用于实际部署。

- **Mode II（Future Imagination）**：输入当前观测 \(o_t\) 和真实动作 \(a_t\)，世界模型预测未来帧 \(\hat{o}_{t+1}\)。此模式的损失 \(L_{WM}\) 反向传播时会通过 MMSA 影响动作模型的参数更新，实现"世界模型监督策略学习"。

联合训练目标为：

$$
L_{total} = L_{WM} + \lambda_1 L_{AM} + \lambda_2 L_{FP}
$$

其中 \(L_{AM}\) 采用 \(L_1\) 损失（对动作的稀疏变化更鲁棒），\(L_{FP}\) 采用 \(L_2\) 损失（力信号更连续）。

> ⚠️ 注意：消融实验显示，移除世界模型监督（\(L_{WM}\)）后，框架退化为普通行为克隆，成功率从 76.3% 降至 46.3%，这是所有消融中影响最大的因素。

**3. 在线自适应学习（AdaOL）**

AdaOL 是本文最具创新性的贡献之一。其核心思想是：在测试时，世界模型对下一帧的预测 \(\hat{o}_{t+1}\) 与真实观测 \(o_{t+1}\) 之间的差异，直接反映了当前模型与真实环境之间的域偏移程度。

自适应损失定义为：

$$
L_{AdaOL} = \| E(o_{t+1}) - E(\hat{o}_{t+1}) \|^2
$$

其中 \(E(\cdot)\) 是 VAE 编码器，将比较放在隐空间而非像素空间，既降低计算量又过滤无关的高频噪声。

为实现高效在线更新，AdaOL 采用以下策略：
- **LoRA 微调**：仅在前 4 层 Transformer 插入 rank=16 的 LoRA 适配器，可训练参数 <0.1%
- **极低学习率**：\(lr = 5 \times 10^{-7}\)，防止灾难性遗忘
- **少量梯度步**：每个新样本仅做 2 步梯度更新
- **实时性**：整个闭环（动作生成 + 在线更新 + 设备延迟）平均运行在 4Hz，仅比无 AdaOL 慢约 5%

**4. 力预测器的作用**

力预测器（Force Predictor）是一个 0.4B 参数的 DiT，与动作模型共享 MMSA 层。它预测机器人末端执行器的接触力 \(f_t \in \mathbb{R}^6\)（6 维力/力矩）。

力预测的意义在于：
- 为动作模型提供隐式的物理约束（通过 MMSA 的信息流动）
- 帮助模型理解接触动力学，对抓取、推动等需要精细力控的任务至关重要
- 消融实验显示移除力预测器后成功率从 76.3% 降至 53.8%

##### 与传统方法的区别

| 维度 | Diffusion Policy | 世界模型+策略（松耦合） | **AdaWorldPolicy** |
|------|-----------------|----------------------|-------------------|
| 世界模型角色 | 无 | 数据增强/表征学习 | **主动监督者** |
| 模态融合 | 单模态 | 串联/独立 | **MMSA 深度耦合** |
| 力感知 | 无 | 通常无 | **力预测器联合训练** |
| 测试时适应 | 无 | 无 | **AdaOL 在线 LoRA** |
| 自监督信号 | 无 | 无 | **世界模型预测误差** |

##### 实验亮点

- **LIBERO-10**：平均成功率 0.96，超越 OpenVLA (0.82)、DP (0.78)、π₀-ft (0.92) 等强基线
- **CALVIN ABC→D**：Avg. Len. 3.54（带 AdaOL），超越 GR-MG (3.42)、MoDE (3.39)、OpenVLA (3.27)
- **Variant PushT OOD**：在背景/颜色/形状偏移下，AdaOL 将成功率从 0.47 提升至 0.51（背景偏移），从 0.61 提升至 0.66（形状偏移）
- **真实机器人**：4 种 OOD 场景（光照、背景、桌面、物体变化）下，AWP (ol) 一致性显著优于离线版本

#### 🧪 练习题
```yaml
question: "AdaWorldPolicy 在测试时在线自适应学习（AdaOL）使用的自监督信号是什么？"
options:
  - "机器人动作与专家动作之间的模仿误差"
  - "世界模型预测的未来帧与真实观测在 VAE 隐空间的重建误差"
  - "力预测器输出与真实力传感器读数的差异"
  - "策略网络输出动作的熵值变化"
answer: 1
explain: "AdaOL 的核心是利用世界模型预测的下一帧 ô_{t+1} 与真实观测 o_{t+1} 在 VAE 编码器隐空间的 L2 距离作为自监督损失，无需任何人工标注即可驱动在线适应。"
```

### RWML

```yaml
id: rwml
num: 39
name: RWML
full_name: 强化世界模型学习 (Reinforcement World Model Learning)
year: '2026'
org: ICML
parent: dreamerv3
paper_url: https://arxiv.org/abs/2602.05842
project_url: ''
category: world_model
motivation: 帮助LLM智能体预测动作后果
```

#### 📝 一句话总结
RWML 的核心目标是：帮助LLM智能体预测动作后果。

#### 🎯 核心要点
- 核心动机：帮助LLM智能体预测动作后果
- 演化来源：继承或改进自 dreamerv3
- 代表机构：ICML

#### 🔬 深入细节
帮助LLM智能体预测动作后果


### HY-Embodied-0.5

```yaml
id: hy_embodied
num: 40
name: HY-Embodied-0.5
full_name: 混元具身0.5 (HY-Embodied Foundation Model)
year: '2026'
org: Tencent
parent: dreamerv3
paper_url: https://arxiv.org/abs/2604.07430
project_url: ''
category: world_model
motivation: 混合Transformer在线策略蒸馏
```

#### 📝 一句话总结
HY-Embodied-0.5 的核心目标是：混合Transformer在线策略蒸馏。

#### 🎯 核心要点
- 核心动机：混合Transformer在线策略蒸馏
- 演化来源：继承或改进自 dreamerv3
- 代表机构：Tencent

#### 🔬 深入细节
混合Transformer在线策略蒸馏
