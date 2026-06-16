---
domain: embodied
topic_id: embodied_rl
topic_name: 具身强化学习
page_icon: 🤖
page_title: 具身强化学习算法总结
page_subtitle: '{build_date} 版'
page_desc: 系统梳理具身智能中强化学习的发展历程，涵盖从基础控制策略到Sim2Real迁移、离线RL预训练及复杂技能层次化学习的技术演进。
hero_pills:
- 🏷️ Sim2Real · 离线RL · 技能学习 · 奖励设计
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
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/embodied/embodied_rl/overview/zhihu__2026年RL（强化学习）在Robotics（具身智能）中的新范式分析__c3a943ab/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/embodied/embodied_rl/latest/zhihu__World_Action_Models：具身智能的下一个前沿__1b8e88c6/article.md

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
TRPO 提出用 KL 散度信任域约束策略更新，在最大化策略梯度替代目标的同时限制新旧策略距离，解决大步更新导致策略性能崩溃的问题。它把自然策略梯度、保守策略迭代和深度神经网络策略优化连接起来，成为后续 PPO 等算法的直接基础。

#### 🎯 核心要点
- **单调改进下界**：从 \(L_{\pi_{\text{old}}}(\pi)\) 的局部替代目标出发，用 KL 距离惩罚给出策略改进下界
- **信任域约束**：将理论上的最大 KL 约束近似为采样状态上的平均 KL 约束 \(\bar{D}_{\mathrm{KL}}(\pi_{\text{old}}\|\pi_\theta)\le \delta\)
- **重要性采样替代目标**：用旧策略采集轨迹，通过 \(\frac{\pi_\theta(a|s)}{\pi_{\theta_{\text{old}}}(a|s)}A_{\theta_{\text{old}}}(s,a)\) 估计新策略收益
- **共轭梯度求解**：用 Fisher 信息矩阵的 Hessian-vector product 近似自然梯度方向，不显式构造大矩阵
- **线搜索防崩溃**：沿近似方向回溯搜索，确保替代目标提升且 KL 约束满足
- **两种采样方案**：Single Path 可直接用于真实系统；Vine 需要仿真器可重置到中间状态，以更低方差估计优势
- **实验覆盖广**：在 MuJoCo 机器人运动和 Atari 图像输入任务中验证了稳定性与较少超参数调节需求

#### 🔬 深入细节
##### 方法示意图

![TRPO single-path 采样示意](https://ar5iv.labs.arxiv.org/html/1502.05477/assets/x1.png)
![TRPO vine 采样示意](https://ar5iv.labs.arxiv.org/html/1502.05477/assets/x2.png)

*图：TRPO 论文 Figure 1 的两种采样方式。Single Path 直接沿旧策略生成轨迹；Vine 从主干轨迹的若干状态分支 rollout，用更多局部动作评估降低方差。*

##### 算法伪代码

```python
# Trust Region Policy Optimization
theta = initialize_policy()

while not converged:
    trajectories = rollout(policy=pi(theta_old))
    advantages = estimate_advantage(trajectories)

    # 重要性采样替代目标
    def surrogate(theta):
        ratio = pi(theta, a, s) / pi(theta_old, a, s)
        return mean(ratio * advantages)

    # 平均 KL 约束的二阶近似：0.5 * step.T @ F @ step <= delta
    g = grad(surrogate(theta_old))
    step_dir = conjugate_gradient(Fisher_vector_product, g)
    step_size = sqrt(2 * delta / (step_dir.T @ F @ step_dir))

    # 回溯线搜索：同时检查 surrogate 改进和 KL 约束
    for scale in [1.0, 0.5, 0.25, 0.125]:
        theta_new = theta_old + scale * step_size * step_dir
        if surrogate(theta_new) > surrogate(theta_old) and mean_kl(theta_old, theta_new) <= delta:
            theta_old = theta_new
            break
```

##### 动机与背景

标准策略梯度只告诉我们“朝哪个方向提高期望回报”，但没有给出“走多远才安全”。在深度策略网络中，参数空间的一小步可能让动作分布发生大变化；如果新策略把概率质量移动到优势估计不可靠的动作上，性能会突然下降。TRPO 的核心问题就是：如何在利用梯度样本效率的同时，为每次策略更新设置一个可计算的安全边界。

论文从保守策略迭代出发，把新策略真实性能 \(\eta(\tilde{\pi})\) 下界写成局部替代目标减去策略距离惩罚：

$$
\eta(\tilde{\pi}) \ge L_{\pi}(\tilde{\pi}) - C D_{\mathrm{KL}}^{\max}(\pi,\tilde{\pi})
$$

其中 \(L_\pi(\tilde{\pi})\) 使用旧策略访问分布和旧策略优势函数来近似新策略收益。这个式子的直觉是：只要新策略在旧策略附近，状态分布变化带来的误差可由 KL 距离控制；因此最大化替代目标并限制 KL，就能避免过大的策略漂移。

实际算法不能对所有状态施加最大 KL 约束，所以 TRPO 将其近似为样本上的平均 KL：

$$
\max_\theta L_{\theta_{\text{old}}}(\theta)
\quad \text{s.t.} \quad
\bar{D}_{\mathrm{KL}}^{\rho_{\theta_{\text{old}}}}(\theta_{\text{old}},\theta)\le \delta
$$

替代目标进一步用旧策略采样得到：

$$
L_{\theta_{\text{old}}}(\theta)
=
\mathbb{E}_{s,a\sim\pi_{\theta_{\text{old}}}}
\left[
\frac{\pi_\theta(a|s)}{\pi_{\theta_{\text{old}}}(a|s)}
A_{\theta_{\text{old}}}(s,a)
\right]
$$

求解时，TRPO 对目标做一阶近似、对 KL 做二阶近似，得到接近自然梯度的方向 \(s\approx F^{-1}g\)。这里 \(F\) 是由平均 KL 的 Hessian 给出的 Fisher 信息矩阵。由于神经网络参数很多，论文使用共轭梯度，只需要计算 Fisher-vector product，而不显式保存 \(F\)。

最后的线搜索是工程稳定性的关键。二阶近似只在局部成立，如果直接走满理论步长，非线性网络可能仍然违反 KL 约束或降低替代目标。因此 TRPO 会逐步缩短步长，直到真实 mini-batch 估计下的替代目标提升且平均 KL 小于 \(\delta\)。这也是它比普通自然梯度更稳的原因。

> 💡 关键：TRPO 不是简单“加 KL 正则”，而是把 KL 放进硬约束，并在每次更新后显式检查。这个设计用计算开销换来了策略更新幅度的可控性。

##### 与传统策略梯度的区别

| 方法 | 更新约束 | 样本复用 | 主要风险 |
|---|---|---|---|
| Vanilla Policy Gradient | 学习率隐式控制 | 低 | 学习率敏感，容易震荡 |
| Natural Policy Gradient | Fisher 度量下缩放梯度 | 低 | 步长仍需手调 |
| TRPO | 平均 KL 信任域硬约束 | 中 | 实现复杂，共轭梯度和线搜索开销较高 |

TRPO 的优势在于把“步长”从参数空间转移到策略分布空间。对于机器人控制，动作分布变化比参数范数更接近真实行为变化，因此 KL 信任域比普通学习率更有意义。

#### 🧪 练习题
```yaml
question: "TRPO 中 KL 散度约束的主要作用是什么？"
options:
  - "减少策略网络参数量"
  - "限制新旧策略分布差异，避免单次更新过大"
  - "替代优势函数估计"
  - "让算法变成完全 off-policy"
answer: 1
explain: "TRPO 最大化替代目标时显式约束平均 KL，使新策略保持在旧策略附近，从而让局部近似更可靠并减少性能崩溃。"
```

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
PPO 用裁剪后的概率比替代 TRPO 的复杂信任域约束，使策略更新既能多轮 mini-batch 复用数据，又能抑制新旧策略差异过大。它保留了 TRPO 稳定更新的直觉，但实现成本接近普通策略梯度。

#### 🎯 核心要点
- **裁剪替代目标**：用 \(\min(r_tA_t,\mathrm{clip}(r_t,1-\epsilon,1+\epsilon)A_t)\) 限制单样本策略改进幅度
- **概率比控制**：核心变量 \(r_t(\theta)=\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)}\)，直接刻画新旧策略对同一动作的概率变化
- **多 epoch mini-batch 更新**：同一批 rollout 数据可反复优化多轮，相比普通 on-policy 策略梯度样本效率更高
- **两种近端方案**：论文讨论 KL penalty 与 clipped surrogate，实践中 clipped PPO 更常用
- **Actor-Critic 训练**：策略损失、价值函数损失和 entropy bonus 通常联合优化
- **GAE 优势估计**：常与 Generalized Advantage Estimation 搭配，平衡方差与偏差
- **基准广泛**：在 MuJoCo 连续控制和 Atari 任务上取得优于或接近 TRPO 的效果，同时实现更简单、运行更快

#### 🔬 深入细节
##### 方法示意图

![PPO 论文实验图直链](https://ar5iv.labs.arxiv.org/html/1707.06347/assets/x1.png)

*图：ar5iv 提供的 PPO 论文图像资源。PPO 原文主要通过公式定义裁剪目标，未提供类似 TRPO 的框架示意图；因此方法理解重点在下方目标函数与伪代码。*

##### 算法伪代码

```python
# PPO-Clip
for iteration in range(num_iterations):
    trajectories = rollout(pi_theta_old, horizon=T)
    advantages = compute_gae(trajectories)
    returns = advantages + values_old

    for epoch in range(K):
        for minibatch in split(trajectories):
            ratio = pi_theta(a | s) / pi_theta_old(a | s)
            unclipped = ratio * advantages
            clipped = clip(ratio, 1 - eps, 1 + eps) * advantages
            policy_loss = -mean(min(unclipped, clipped))

            value_loss = mean((V_theta(s) - returns) ** 2)
            entropy_bonus = mean(entropy(pi_theta(. | s)))
            loss = policy_loss + c1 * value_loss - c2 * entropy_bonus
            optimizer.step(loss)

    theta_old = theta
```

##### 动机与背景

TRPO 的稳定性来自 KL 信任域，但它需要 Fisher-vector product、共轭梯度和线搜索，工程实现复杂，也不容易和包含共享网络、离散动作、循环结构的策略一起使用。PPO 的目标是保留“不要让新策略离旧策略太远”这一原则，同时把优化问题改成普通一阶优化器可以直接处理的损失函数。

PPO 的核心变量是新旧策略概率比：

$$
r_t(\theta)=\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)}
$$

如果 \(A_t>0\)，说明旧策略采到的动作比平均更好，优化会倾向提高该动作概率；如果 \(A_t<0\)，则倾向降低该动作概率。问题在于，普通替代目标 \(r_t(\theta)A_t\) 可能把概率推得过远，导致和 TRPO 中同样的过大策略更新问题。

PPO-Clip 将目标改为：

$$
L^{\mathrm{CLIP}}(\theta)
=
\mathbb{E}_t
\left[
\min\left(
r_t(\theta)A_t,
\mathrm{clip}(r_t(\theta),1-\epsilon,1+\epsilon)A_t
\right)
\right]
$$

这个 \(\min\) 的设计非常关键。当 \(A_t>0\) 时，如果 \(r_t\) 已经超过 \(1+\epsilon\)，继续增大动作概率不会带来更多目标收益；当 \(A_t<0\) 时，如果 \(r_t\) 已经低于 \(1-\epsilon\)，继续压低概率也不会得到额外收益。裁剪不是硬性禁止策略变化，而是让“越界方向”的梯度消失，从而降低破坏性更新的诱因。

训练流程上，PPO 仍是 on-policy：先用当前策略采样 rollout，再在这批数据上更新若干 epoch，然后丢弃旧数据。与 vanilla policy gradient 每条数据只用一次不同，PPO 的裁剪目标允许有限复用同一批样本，使得样本效率和 wall-clock 效率都更好。

实际实现通常把策略损失和价值函数损失合并：

$$
L_t(\theta)=
\mathbb{E}_t\left[
L_t^{\mathrm{CLIP}}(\theta)
-c_1(V_\theta(s_t)-V_t^{\mathrm{target}})^2
+c_2\mathcal{H}(\pi_\theta(\cdot|s_t))
\right]
$$

价值函数负责降低优势估计方差，entropy bonus 防止策略过早坍缩。PPO 的简洁性也让它成为 RLHF、机器人控制和游戏智能体中非常常用的默认策略优化器。

> ⚠️ 注意：PPO 的 clip 并不等价于严格 KL 约束。实际训练中仍常监控 approximate KL，若 KL 过大则提前停止 epoch 或调小学习率。

##### 与 TRPO 的区别

| 维度 | TRPO | PPO |
|---|---|---|
| 更新限制 | 显式平均 KL 约束 | 裁剪概率比的软限制 |
| 优化器 | 共轭梯度 + 线搜索 | Adam/SGD 一阶优化 |
| 实现复杂度 | 高 | 低 |
| 数据复用 | 有限 | 多 epoch mini-batch |
| 理论保证 | 更接近单调改进下界 | 更偏工程近似 |

PPO 的贡献不是提出一个全新的 RL 目标，而是把 TRPO 的信任域思想压缩成一个可微、可 mini-batch 优化的目标函数。这种折中让它在实践中成为最通用的 on-policy 强化学习算法之一。

#### 🧪 练习题
```yaml
question: "PPO-Clip 中 clipped surrogate 的主要效果是什么？"
options:
  - "让策略完全不再改变"
  - "限制概率比越界方向的收益，降低过大策略更新风险"
  - "把 on-policy 算法改成 off-policy 算法"
  - "用模型预测替代真实环境采样"
answer: 1
explain: "当概率比超过 [1-ε, 1+ε] 且继续变化只会朝过大更新方向推进时，clip 后的目标不再给额外收益，从而抑制破坏性更新。"
```

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
LFI-DR 将域随机化从手工设定参数范围推进到后验推断：用真实系统观测和仿真 rollout 的差异，通过似然无关推理估计物理参数分布，再从该后验中随机化训练策略。给定 `paper_url` 实际指向核物理论文而非该算法，以下解读基于 YAML 元信息、Domain Randomization 背景和 sim-to-real 中 likelihood-free / simulation-based inference 的通用方法组织。

#### 🎯 核心要点
- **依据限制**：`https://arxiv.org/abs/2602.05678` 标题为 “Three-body Effect in Short-range Correlations”，与 LFI-DR 元信息不匹配，未能获取匹配论文原文或原图
- **后验式域随机化**：将物理参数 \(\phi\) 视为随机变量，目标是估计 \(p(\phi|x_{\mathrm{real}})\)，而不是固定均匀随机化范围
- **似然无关推理**：当 \(p(x|\phi)\) 无法解析时，用仿真器采样 \(\phi\sim p(\phi)\)、\(x_{\mathrm{sim}}\sim \mathrm{Sim}(\phi)\)，再用距离/分类器/密度比学习近似后验
- **参数闭环更新**：真实轨迹进入推断器，推断器输出后验，策略在后验覆盖的仿真环境中训练，再部署收集新真实轨迹
- **降低无效随机化**：相比宽范围 Domain Randomization，后验集中在真实系统可能参数上，提高样本效率并减少过度保守
- **适用对象**：摩擦、质量、阻尼、执行器延迟、接触刚度、传感器噪声等难以直接测量但可在仿真器中参数化的因素
- **风险点**：后验质量依赖 summary statistics、仿真器结构误差和真实数据覆盖；若仿真器缺少关键物理项，后验会自信但错误

#### 🔬 深入细节
##### 概念示意图

![LFI-DR 概念流程图](https://placehold.co/1200x480/png?text=LFI-DR+Posterior+Domain+Randomization)

*图：给定 URL 未提供匹配论文原图，上图为结构占位。LFI-DR 的核心流程可概括为：真实轨迹 → 似然无关参数后验 → 后验域随机化 → 策略训练 → 真实部署反馈。*

##### 算法伪代码

```python
# LFI-DR conceptual pipeline
prior = p_phi()                         # 物理参数先验：质量、摩擦、延迟等
posterior = prior

for round in range(num_rounds):
    # 1. 用当前后验随机化仿真，生成参数-轨迹样本
    sim_data = []
    for k in range(num_simulations):
        phi = sample(posterior)
        traj = simulator.rollout(policy=current_policy, physics=phi)
        sim_data.append((phi, summary(traj)))

    # 2. 通过 likelihood-free inference 拟合 p(phi | summary(real))
    inference_model.fit(sim_data)
    z_real = summary(real_robot_rollouts())
    posterior = inference_model.condition(z_real)

    # 3. 用后验分布进行域随机化训练
    for update in range(policy_updates):
        phi = sample(posterior)
        batch = simulator.rollout(policy=current_policy, physics=phi)
        current_policy = rl_update(current_policy, batch)
```

##### 动机与背景

经典 Domain Randomization 的核心假设是：只要随机化范围足够宽，真实世界就会落在仿真训练分布里。但这个假设在接触丰富的机器人任务中代价很高。摩擦、软接触、执行器延迟等参数若随机得过窄，策略无法迁移；随机得过宽，训练分布包含大量不可能的物理世界，策略会变得保守且学习效率低。

LFI-DR 的动机是把“随机化范围怎么选”变成统计推断问题。设真实观测为 \(x_{\mathrm{real}}\)，仿真物理参数为 \(\phi\)，理想目标是：

$$
p(\phi|x_{\mathrm{real}})\propto p(x_{\mathrm{real}}|\phi)p(\phi)
$$

难点在于 \(p(x|\phi)\) 通常不可写出：仿真器可以前向生成轨迹，却不会返回轨迹的解析似然。似然无关推理（Likelihood-Free Inference，也常称 simulation-based inference）正适合这种“能采样、不能写似然”的场景。

一种简单形式是 ABC（Approximate Bayesian Computation）：从先验采样 \(\phi\)，仿真得到 \(x_{\mathrm{sim}}\)，如果摘要统计距离 \(d(S(x_{\mathrm{sim}}),S(x_{\mathrm{real}}))<\epsilon\)，就接受该 \(\phi\)。更现代的做法会训练条件密度估计器、神经后验估计器或分类器密度比模型，使推断器输出连续后验而不是只接受/拒绝样本。

后验式随机化的关键收益在于把训练分布从人工大盒子变成数据约束分布：

$$
\phi \sim q(\phi|x_{\mathrm{real}}), \qquad
\pi^*=\arg\max_\pi \mathbb{E}_{\phi\sim q}\left[J_{\mathrm{sim}}(\pi;\phi)\right]
$$

其中 \(q\) 是 LFI 得到的近似后验。若真实系统信息足够，\(q\) 会比原始先验更集中，策略不必在大量无关物理配置上浪费能力；若信息不足，后验仍保留不确定性，训练仍具备鲁棒性。

> 💡 关键：LFI-DR 不是“用真实数据拟合一个单点仿真参数”，而是拟合参数后验。后验的不确定性本身就是域随机化分布。

##### 与传统 Domain Randomization 的区别

| 维度 | 传统 DR | LFI-DR |
|---|---|---|
| 参数分布 | 人工设定，多为均匀分布 | 由真实观测推断后验 |
| 真实数据使用 | 可为零样本，也可只用于验证 | 直接用于更新随机化分布 |
| 主要风险 | 范围过宽/过窄 | 后验受摘要统计和仿真偏差影响 |
| 策略训练 | 在固定随机化分布上训练 | 可随真实部署数据迭代收缩或修正 |

在具身强化学习中，这类方法特别适合“可观测轨迹很少但仿真可大量采样”的设置。它把真实系统辨识和策略鲁棒训练合并为一个闭环：先推断真实世界可能在哪些物理参数区域，再把策略训练集中到这些区域。

##### 依据限制说明

由于清单中的 `paper_url` 与算法名称、机构和动机不匹配，无法确认 LFI-DR 是否已有公开论文、原始公式或实验设置。本文中的公式和伪代码是基于 YAML 元信息和 sim-to-real 中 LFI/SBI + Domain Randomization 的标准范式抽象，不能替代原文细节。

#### 🧪 练习题
```yaml
question: "LFI-DR 相比普通域随机化最核心的变化是什么？"
options:
  - "完全取消仿真训练"
  - "用真实观测推断物理参数后验，并从后验中随机化训练"
  - "只随机化视觉纹理，不随机化动力学"
  - "把策略优化从强化学习换成监督学习"
answer: 1
explain: "LFI-DR 的核心是通过似然无关推理得到 p(φ|x_real)，再把该后验作为域随机化分布，从而减少手工范围选择带来的偏差。"
```

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
HDMI 可理解为面向人形机器人交互技能的互联网视频模仿学习框架：从视频中抽取人体、物体和接触关系，将其 retarget 到人形机器人，再通过仿真模仿强化学习获得可执行策略。给定 `paper_url` 实际指向理论物理论文而非该算法，以下解读基于 YAML 元信息和视频模仿/人形控制的公开通用范式完成。

#### 🎯 核心要点
- **依据限制**：`https://arxiv.org/abs/2602.12345` 标题为 “Lazarides-Shafi axion models as Dijkgraaf-Witten theories”，与 HDMI 元信息不匹配，未能获取匹配论文原文或原图
- **互联网视频作为示范源**：从大规模公开视频中挖掘坐、推、拿、开门、搬运等全身交互行为
- **三类中间表示**：人体姿态/根轨迹、物体 6D 轨迹、接触事件或手脚接触标签
- **人形 retargeting**：把人类骨架动作映射到机器人关节，约束足底接触、质心稳定、关节限位和自碰撞
- **交互模仿奖励**：同时奖励身体姿态跟踪、末端执行器轨迹、物体状态变化和接触时序一致性
- **仿真到真实迁移**：结合动力学随机化、扰动注入和低层 PD/力控接口，让策略在真实人形机器人上更稳
- **区别于纯运动模仿**：HDMI 的重点不是复现人体动作本身，而是复现“身体动作如何改变外部物体”

#### 🔬 深入细节
##### 概念示意图

![HDMI 概念流程图](https://placehold.co/1200x480/png?text=HDMI+Video-to-Humanoid+Interaction+Imitation)

*图：给定 URL 未提供匹配论文原图，上图为结构占位。HDMI 的核心流程可抽象为：互联网视频 → 3D 人体/物体/接触重建 → 人形 retargeting → 仿真模仿 RL → 真实交互。*

##### 算法伪代码

```python
# HDMI conceptual pipeline
videos = crawl_interaction_videos(keywords=["sit", "push", "open", "carry"])
demos = []

for video in videos:
    human_pose = estimate_3d_human_motion(video)
    object_traj = estimate_object_pose(video)
    contacts = infer_contact_events(human_pose, object_traj)
    robot_motion = retarget_to_humanoid(
        human_pose,
        constraints=[feet_contact, joint_limits, balance, contacts],
    )
    demos.append((robot_motion, object_traj, contacts))

policy = initialize_humanoid_policy()
for update in range(num_updates):
    demo = sample(demos)
    rollout = simulate(policy, randomized_physics=True)
    reward = (
        w_pose * pose_tracking(rollout, demo.robot_motion)
        + w_ee * end_effector_tracking(rollout, demo)
        + w_obj * object_state_match(rollout, demo.object_traj)
        + w_contact * contact_timing_match(rollout, demo.contacts)
        - w_energy * action_penalty(rollout)
    )
    policy = rl_update(policy, rollout, reward)
```

##### 动机与背景

人形机器人要完成真实交互任务，难点不只是“走得像人”，而是要让全身运动、接触力和物体状态变化协调起来。传统 motion imitation 数据多来自动作捕捉，质量高但规模小、场景单一；互联网视频规模大，但没有机器人关节标签、力信息和精确 3D 状态。HDMI 的动机就是把大规模视频中的交互先验转化为可被机器人策略学习的中间表示。

一个合理的 HDMI 管线会先把视频转成结构化示范：

$$
v \rightarrow \{q^{\mathrm{human}}_{1:T},\; o_{1:T},\; c_{1:T}\}
$$

其中 \(q^{\mathrm{human}}\) 是人体姿态，\(o_t\) 是物体状态，\(c_t\) 是接触事件。相比只跟踪人体姿态，接触和物体状态是交互任务的核心，因为机器人最终要改变的是外部世界，而不是在空中复现一段动作。

retargeting 阶段需要解决身体结构差异。人类动作不能直接投到人形机器人关节上，否则会产生足底滑动、质心越界、关节超限或手部无法接触物体等问题。通常会优化：

$$
\min_{q^{\mathrm{robot}}_{1:T}}
\sum_t
\left[
\|f_{\mathrm{ee}}(q_t)-x^{\mathrm{human}}_{\mathrm{ee},t}\|^2
+ \lambda_c \mathcal{L}_{\mathrm{contact}}
+ \lambda_b \mathcal{L}_{\mathrm{balance}}
+ \lambda_j \mathcal{L}_{\mathrm{joint}}
\right]
$$

模仿强化学习阶段再把 retargeted motion 转成闭环策略。闭环策略比直接播放轨迹更重要，因为真实交互中的物体位置、摩擦、接触时机都会有偏差。奖励通常由姿态跟踪、末端位置、物体目标和接触一致性组成：

$$
r_t =
w_p r^{\mathrm{pose}}_t
+w_e r^{\mathrm{ee}}_t
+w_o r^{\mathrm{object}}_t
+w_c r^{\mathrm{contact}}_t
-w_a\|a_t\|^2
$$

> 💡 关键：HDMI 类方法的价值在于把“视频里的人做了什么”拆成机器人可优化的状态、接触和目标，而不是直接让机器人逐帧模仿像素或人体骨架。

##### 与纯视频模仿的区别

| 维度 | 纯视频动作模仿 | HDMI 式交互模仿 |
|---|---|---|
| 学习目标 | 人体姿态相似 | 物体变化和接触成功 |
| 数据表示 | 视频帧或人体关键点 | 人体姿态 + 物体轨迹 + 接触标签 |
| 控制对象 | 多为身体运动 | 全身运动与环境交互 |
| sim-to-real 重点 | 姿态稳定 | 接触鲁棒性、物体动力学、延迟 |

真正落地时，HDMI 还需要处理视频中的遮挡、相机运动、物体尺度不确定和不可观测接触力。可行做法通常是引入多候选重建、用物理仿真筛掉不可行轨迹，并在 RL 训练中加入随机扰动让策略学会从偏差中恢复。

##### 依据限制说明

由于清单中的 `paper_url` 与 HDMI 不匹配，无法确认原论文中的模型结构、实验机器人或具体指标。本文将 HDMI 解释为“互联网视频到人形机器人交互技能”的算法族抽象，保留 YAML 中的动机，不声称包含原文未公开的实验结论。

#### 🧪 练习题
```yaml
question: "HDMI 类人形交互模仿方法相比只模仿人体姿态，最需要额外建模什么？"
options:
  - "视频压缩码率"
  - "物体轨迹与接触事件"
  - "图像背景颜色"
  - "策略网络的参数命名"
answer: 1
explain: "交互技能的成败取决于机器人如何通过接触改变物体状态，因此物体轨迹和接触时序比单纯姿态相似更关键。"
```

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
LIDE 可理解为将任务规划/运动规划约束注入扩散策略的双臂接触控制方法：扩散模型负责生成多模态动作轨迹，规划器在采样过程中提供可达性、碰撞、接触和目标约束引导。给定 `paper_url` 实际指向文学大模型论文而非该算法，以下内容基于 YAML 元信息和 diffusion policy + planning guidance 的通用技术路线整理。

#### 🎯 核心要点
- **依据限制**：`https://arxiv.org/abs/2602.15678` 标题为 “Revisiting Northrop Frye's Four Myths Theory with Large Language Models”，与 LIDE 元信息不匹配
- **扩散轨迹生成**：用条件扩散模型表示 \(p(\tau|o,g)\)，生成双臂动作或末端轨迹，天然支持多峰解
- **规划引导采样**：在 denoising 每一步加入来自规划代价的梯度或重打分，如碰撞、可达性、同步抓取、接触顺序
- **双臂接触建模**：显式考虑两臂协同、闭链约束、接触切换和物体稳定性
- **仿真训练与迁移**：在随机化动力学和接触参数下训练，减少真实部署时摩擦/刚度误差影响
- **与纯 Diffusion Policy 区别**：不是只拟合示范分布，而是在采样时用规划器把生成结果推向物理可行且任务可达的区域
- **典型任务**：双臂搬运、插拔、开合、推拉、协同装配等长接触序列任务

#### 🔬 深入细节
##### 概念示意图

![LIDE 概念流程图](https://placehold.co/1200x480/png?text=LIDE+Planning-Guided+Diffusion+for+Bimanual+Contact)

*图：给定 URL 未提供匹配论文原图，上图为结构占位。LIDE 的抽象流程是：观测/目标条件 → 扩散轨迹采样 → 规划代价引导 → 低层控制执行 → 接触反馈修正。*

##### 算法伪代码

```python
# LIDE conceptual planning-guided diffusion
diffusion = train_diffusion_policy(demos, condition=["observation", "goal"])
planner = build_planner(costs=["collision", "reachability", "contact", "goal"])

def sample_action_sequence(obs, goal):
    x = gaussian_noise(shape=(horizon, action_dim))
    for k in reversed(range(num_diffusion_steps)):
        score = diffusion.score(x, obs, goal, step=k)
        plan_grad = grad(planner.cost(x, obs, goal), x)
        x = denoise_step(x, score - guidance_scale * plan_grad, step=k)
        x = project_to_constraints(x, planner.hard_constraints)
    return x

for control_step in range(T):
    action_seq = sample_action_sequence(current_obs, task_goal)
    execute(action_seq[0])
    current_obs = observe()
```

##### 动机与背景

双臂接触任务的困难来自两个方面：一是动作解高度多模态，例如同一个物体可以从不同侧抓取、不同顺序插入；二是物理约束很硬，轻微碰撞、闭链误差或接触时机错误都会让任务失败。传统规划器能处理约束，但在高维连续动作和复杂接触中搜索困难；纯行为克隆或扩散策略能学习示范分布，却可能生成看似合理但不可达或碰撞的动作。

LIDE 式方法的核心思想是把两者结合。扩散模型学习示范轨迹分布：

$$
p_\theta(\tau|o,g)
$$

其中 \(\tau\) 可以是双臂末端轨迹、关节轨迹或低层动作序列，\(o\) 是当前观测，\(g\) 是任务目标。扩散模型通过从噪声逐步 denoise 生成轨迹，因此每一步都可以被外部代价函数引导。

规划器定义可微或可近似求梯度的代价：

$$
C(\tau)=
\lambda_{\mathrm{goal}}C_{\mathrm{goal}}
+\lambda_{\mathrm{col}}C_{\mathrm{collision}}
+\lambda_{\mathrm{reach}}C_{\mathrm{reach}}
+\lambda_{\mathrm{contact}}C_{\mathrm{contact}}
+\lambda_{\mathrm{sync}}C_{\mathrm{bimanual}}
$$

采样时不只是沿扩散模型 score \(\nabla_\tau \log p_\theta(\tau|o,g)\) 走，而是加入规划引导：

$$
\tilde{s}(\tau)
=
\nabla_\tau \log p_\theta(\tau|o,g)
- \eta \nabla_\tau C(\tau)
$$

这样生成轨迹既保持示范分布的自然性，又被推向满足任务约束的低代价区域。对于不可微约束，也可以采用候选轨迹重采样、MPC 打分或投影步骤来实现规划引导。

在双臂任务中，规划代价应特别关注闭链与同步。比如搬运刚性物体时，两只手的相对位姿必须维持物体几何；插入任务中，一只手固定、另一只手施加位移时接触力方向必须稳定。这些约束很难仅靠示范模仿自动学到，规划引导能在推理时持续纠偏。

> 💡 关键：扩散模型解决“生成多种可行候选”，规划器解决“筛掉物理不可行候选”。LIDE 的价值在于把规划代价放进采样过程，而不是采样后才简单选择。

##### 与传统规划和 Diffusion Policy 的区别

| 方法 | 优点 | 局限 |
|---|---|---|
| 传统运动规划 | 约束清晰，可解释 | 高维接触搜索成本高，示范先验弱 |
| Diffusion Policy | 多模态、动作自然 | 可能生成不可达/碰撞轨迹 |
| LIDE 式规划引导扩散 | 多模态生成 + 约束引导 | 依赖规划代价设计和实时采样效率 |

sim-to-real 阶段，LIDE 需要把接触参数、物体质量、摩擦和控制延迟纳入随机化。否则扩散轨迹在仿真中可行，真实接触中仍可能因为力学偏差失败。一个实用实现通常会在 MPC 执行层加入短视野反馈，让每次只执行轨迹前几步并持续重采样。

##### 依据限制说明

由于清单中的 `paper_url` 与 LIDE 不匹配，无法确认原论文的命名、公式、实验或机器人平台。本文只依据 YAML 中“规划引导扩散解决双臂接触任务”的元信息，给出符合该技术路线的精读式结构化说明。

#### 🧪 练习题
```yaml
question: "LIDE 式规划引导扩散中，规划器最主要在采样阶段提供什么？"
options:
  - "随机噪声初始化"
  - "可达性、碰撞、接触和目标等约束代价的引导"
  - "图像数据增强"
  - "价值函数的 Bellman backup"
answer: 1
explain: "扩散模型负责生成候选轨迹，规划器通过代价梯度、投影或重打分把轨迹推向物理可行且满足任务目标的区域。"
```

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
BCQ 提出在离线/固定批数据中只从与数据集相似的动作集合里选择动作，用条件 VAE 生成候选动作、扰动网络做小范围修正、双 Q 网络估值，从而缓解 DDPG 等 off-policy 方法在数据集外动作上的外推误差。

#### 🎯 核心要点
- **外推误差定义**：离线数据未覆盖的 \((s,a)\) 会被函数逼近器错误估值，最大化 Q 值会持续选择这些错误高估动作
- **批量约束策略**：策略应诱导与 batch 中状态-动作访问分布相近的行为，避免查询远离数据支撑的动作
- **条件 VAE 行为模型**：学习 \(G_\omega(s)\) 生成数据集中给定状态下可能出现的动作
- **扰动模型**：\(\xi_\phi(s,a,\Phi)\) 只允许在 \([-\Phi,\Phi]\) 小范围调整生成动作，兼顾约束和改进
- **候选动作最大化**：对每个状态采样 \(n\) 个 VAE 动作，经扰动后选择 Q 值最高的动作
- **Clipped Double Q 变体**：训练两个 Q 网络，用加权 min/max target 减少不确定未来状态的过估计
- **连续控制离线 RL**：在 MuJoCo 的固定 batch、并行学习、专家模仿和不完美示范设置中显著优于 DDPG/BC 等基线

#### 🔬 深入细节
##### 方法示意图

![BCQ 外推误差实验图](https://ar5iv.labs.arxiv.org/html/1812.02900/assets/x1.png)
![BCQ 结果图](https://ar5iv.labs.arxiv.org/html/1812.02900/assets/x2.png)

*图：BCQ 论文中的外推误差现象与 BCQ 对比结果。标准 off-policy 深度 RL 在固定数据上会高估未见动作并性能崩溃；BCQ 通过 batch constraint 稳定价值估计。*

##### 算法伪代码

```python
# Batch-Constrained deep Q-learning
for gradient_step in range(num_steps):
    s, a, r, s_next = sample(D)

    # 1. 训练条件 VAE 重构数据动作
    z = encoder(s, a)
    a_recon = decoder(s, z)
    loss_vae = mse(a_recon, a) + beta * kl(q(z | s, a), Normal(0, 1))

    # 2. 在下一状态生成候选动作并小范围扰动
    candidates = []
    for i in range(n):
        a_i = decoder(s_next, clipped_normal_noise())
        a_tilde = a_i + perturb_target(s_next, a_i, Phi)
        candidates.append(clip_action(a_tilde))

    # 3. 用双 Q 的加权保守 target 更新 critic
    q_target = max_over_candidates(
        lambda_ * min(Q1_target, Q2_target) + (1 - lambda_) * max(Q1_target, Q2_target)
    )
    y = r + gamma * q_target
    loss_q = mse(Q1(s, a), y) + mse(Q2(s, a), y)

    # 4. 扰动网络只学习在 VAE 动作附近提升 Q
    a_gen = decoder(s, clipped_normal_noise())
    loss_perturb = -Q1(s, a_gen + perturb(s, a_gen, Phi))
```

##### 动机与背景

离线 RL 的核心矛盾是：Q-learning 的 Bellman target 需要在下一状态上取最大动作，但离线数据只覆盖行为策略访问过的动作。对于数据集外动作，神经 Q 函数只能外推，估值可能毫无依据。一旦某个 OOD 动作被误高估，策略改进会更倾向选择它，而离线设置又无法通过真实交互纠正这个错误。

BCQ 把这个问题称为 extrapolation error，并提出一个直接原则：策略应该只在 batch 支撑内或其邻域内改进。对于表格情形，批量约束 Q-learning 的更新是：

$$
Q(s,a)\leftarrow (1-\alpha)Q(s,a)
+\alpha\left(r+\gamma\max_{a'\ \mathrm{s.t.}\ (s',a')\in\mathcal{B}}Q(s',a')\right)
$$

也就是最大化只在数据集中出现过的动作上进行。连续动作空间不能枚举“出现过的动作”，因此 BCQ 用条件 VAE 近似行为数据的动作分布 \(P_\mathcal{B}(a|s)\)。

VAE 由编码器 \(E_{\omega_1}(s,a)\) 和解码器 \(D_{\omega_2}(s,z)\) 组成，训练目标为：

$$
\mathcal{L}_{\mathrm{VAE}}
=
\|D_{\omega_2}(s,z)-a\|^2
+\lambda D_{\mathrm{KL}}(\mathcal{N}(\mu,\sigma)\|\mathcal{N}(0,I))
$$

推理时，从 VAE 采样多个候选动作。为了避免纯生成模型只能模仿、不能改进，BCQ 引入扰动模型：

$$
\pi(s)=
\arg\max_{a_i+\xi_\phi(s,a_i,\Phi)}
Q_\theta(s,a_i+\xi_\phi(s,a_i,\Phi)),
\quad a_i\sim G_\omega(s)
$$

\(\Phi\) 控制策略能离开数据动作多远。若 \(\Phi\) 太大，BCQ 退化得更像 DDPG，重新暴露在 OOD 外推风险下；若太小，则更像行为克隆，改进能力有限。论文的消融显示增大 \(\Phi\) 会带来更不稳定的价值估计。

BCQ 还使用两个 Q 网络构造 target：

$$
y=r+\gamma\max_i\left[
\lambda\min_{j=1,2}Q_{\theta'_j}(s',\tilde{a}_i)
+(1-\lambda)\max_{j=1,2}Q_{\theta'_j}(s',\tilde{a}_i)
\right]
$$

这里 \(\lambda=0.75\) 时偏向保守的 min，但保留一部分 max 以避免过度低估。这个设计同时服务于“不要高估未知动作”和“不要把所有动作都压得过低”。

> 💡 关键：BCQ 的策略不是直接输出一个动作，而是先从数据分布生成候选，再在候选邻域内做 Q 最大化。生成模型是约束，Q 网络是改进信号。

##### 与 DDPG/行为克隆的区别

| 方法 | 动作来源 | 是否能超越数据 | OOD 风险 |
|---|---|---|---|
| 行为克隆 | 直接拟合数据动作 | 弱 | 低 |
| DDPG 离线训练 | Actor 任意输出 | 理论上强 | 高 |
| BCQ | VAE 数据动作 + 小扰动 | 中到强 | 低到中 |

BCQ 的贡献在于明确指出“离线 off-policy”不同于带 replay buffer 的在线 off-policy。在线 DDPG 可以探索并纠正外推误差；离线 DDPG 不能。因此离线算法必须把策略改进限制在可被数据支持的区域。

#### 🧪 练习题
```yaml
question: "BCQ 使用条件 VAE 的主要目的是什么？"
options:
  - "压缩状态向量以减少内存"
  - "生成与 batch 中动作相似的候选动作，限制策略查询 OOD 动作"
  - "替代 Q 网络估计奖励"
  - "让算法只能复现专家动作，不能做任何改进"
answer: 1
explain: "BCQ 用 VAE 近似行为数据的动作分布，再只在生成动作的小邻域内最大化 Q 值，从而缓解离线数据外动作的外推误差。"
```

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
CQL 在标准 Bellman 误差上加入保守 Q 值正则，主动压低策略可能选择的分布外动作 Q 值、抬高数据动作相对优势，使离线策略优化基于价值下界而不是乐观外推。它不需要显式学习行为策略约束，就能在复杂离线数据集上缓解过估计和分布偏移。

#### 🎯 核心要点
- **保守价值估计**：学习一个使当前策略期望价值成为真实价值下界的 Q 函数
- **CQL 正则项**：最常用形式为 \(\log\sum_a \exp Q(s,a)-\mathbb{E}_{a\sim\hat{\pi}_\beta}Q(s,a)\)，压低非数据动作、相对抬高数据动作
- **兼容 Q-learning 和 Actor-Critic**：可接入 DQN/QR-DQN，也可接入 SAC 类连续控制 actor-critic
- **无需行为策略模型**：相比 BCQ/BEAR 等显式约束方法，CQL 不必额外拟合 \(\hat{\pi}_\beta(a|s)\)
- **gap-expanding 性质**：扩大数据内动作与分布外动作之间的 Q 值差距，降低策略被 OOD 高估动作吸引的风险
- **安全改进分析**：理论上给出保守下界和高置信策略改进关系
- **D4RL 与 Atari 验证**：在 MuJoCo、AntMaze、Adroit、Kitchen 和 Atari 离线设置中优于大量基线，复杂多模态数据集上优势更明显

#### 🔬 深入细节
##### 方法示意图

![CQL 论文图像资源](https://ar5iv.labs.arxiv.org/html/2006.04779/assets/x1.png)

*图：CQL 论文的 ar5iv 图像资源。CQL 的方法核心主要由保守 Q 目标函数定义，而不是单一架构图；下方公式展示其关键机制。*

##### 算法伪代码

```python
# Conservative Q-Learning, actor-critic style
initialize Q_theta, policy pi_phi

for step in range(num_steps):
    s, a, r, s_next = sample(offline_dataset)

    # SAC/actor-critic Bellman target
    a_next = pi_phi.sample(s_next)
    target = r + gamma * (Q_target(s_next, a_next) - alpha_ent * log_prob(a_next))
    bellman_loss = mse(Q_theta(s, a), target)

    # CQL(H) regularizer: penalize high Q on broad action samples
    sampled_actions = sample_actions_from([pi_phi, uniform, current_policy])
    cql_penalty = logsumexp(Q_theta(s, sampled_actions)) - Q_theta(s, dataset_action=a)

    critic_loss = bellman_loss + alpha_cql * cql_penalty
    theta = gradient_step(theta, critic_loss)

    # actor can remain SAC-style; no extra behavior constraint is required
    actor_loss = -mean(Q_theta(s, pi_phi.sample(s)) - alpha_ent * log_prob(pi_phi.sample(s)))
    phi = gradient_step(phi, actor_loss)
```

##### 动机与背景

离线 RL 中，标准 off-policy actor-critic 会在 Bellman backup 和策略改进中查询当前策略动作。但当前策略逐渐偏离行为数据后，Q 网络会在数据集外动作上外推。若这些动作被错误高估，策略优化会进一步偏向它们，形成自我强化的过估计循环。BCQ 通过限制动作生成来解决，CQL 则从另一个方向出发：让 Q 函数本身对非数据动作保持悲观。

最基础的保守 off-policy evaluation 目标是在 Bellman 误差外增加最小化 Q 值的项：

$$
\hat{Q}^{k+1}\leftarrow
\arg\min_Q
\alpha\mathbb{E}_{s\sim\mathcal{D},a\sim\mu(a|s)}[Q(s,a)]
+\frac{1}{2}\mathbb{E}_{s,a,s'\sim\mathcal{D}}
\left[
\left(Q(s,a)-\hat{\mathcal{B}}^\pi\hat{Q}^k(s,a)\right)^2
\right]
$$

如果只压低 \(\mu\) 下的 Q 值，可能过度悲观。CQL 因此加入数据分布上的 Q 值最大化项，得到更紧的期望价值下界：

$$
\alpha\left(
\mathbb{E}_{s\sim\mathcal{D},a\sim\mu(a|s)}[Q(s,a)]
-
\mathbb{E}_{s\sim\mathcal{D},a\sim\hat{\pi}_\beta(a|s)}[Q(s,a)]
\right)
$$

实际 CQL(\(\mathcal{H}\)) 将 \(\mu\) 取为 Boltzmann/均匀先验诱导的 softmax，形成常见的 log-sum-exp 正则：

$$
\min_Q
\alpha
\mathbb{E}_{s\sim\mathcal{D}}
\left[
\log\sum_a \exp(Q(s,a))
-\mathbb{E}_{a\sim\hat{\pi}_\beta(a|s)}Q(s,a)
\right]
+\frac{1}{2}\mathbb{E}_{\mathcal{D}}
\left[
\left(Q-\hat{\mathcal{B}}^{\pi_k}\hat{Q}^k\right)^2
\right]
$$

这项的直觉很直接：\(\log\sum\exp\) 会关注当前 Q 值高的动作，其中很多可能是 OOD 动作；减去数据动作的 Q 值，相当于要求“不要让非数据动作比数据动作高太多”。因此 CQL 不必显式把 actor 限制在行为策略附近，Q 函数的保守性会间接让 actor 避开 OOD 高估动作。

CQL 的理论分析强调两个性质。第一，学到的 Q 值在当前策略期望下是保守下界，即 \(\hat{V}^\pi(s)\le V^\pi(s)\)。第二，CQL backup 具有 gap-expanding 行为，会扩大数据内动作与 OOD 动作之间的价值差距。这解释了为什么 CQL 在混合质量数据、稀疏奖励 AntMaze 和人类示范 Adroit/Kitchen 等任务上比只做策略约束更稳。

> ⚠️ 注意：CQL 的 \(\alpha\) 控制悲观程度。太小无法压住 OOD 过估计，太大则可能把有用的泛化也压掉；论文实践中还使用 Lagrange 版本自适应调节保守强度。

##### 与 BCQ 的区别

| 维度 | BCQ | CQL |
|---|---|---|
| 核心思想 | 限制 actor 只能选数据附近动作 | 让 critic 对 OOD 动作悲观 |
| 是否拟合行为分布 | 是，条件 VAE | 不必须 |
| 约束位置 | 策略/动作生成 | Q 函数训练目标 |
| 泛化能力 | 受生成模型支撑影响 | 可允许 actor 自由优化，但由 Q 值抑制 OOD |

CQL 的工程吸引力在于它可以作为一个 critic loss 插件加到现有 SAC 或 DQN 代码中。它牺牲一些乐观探索能力，换取离线设置下更可信的价值估计。

#### 🧪 练习题
```yaml
question: "CQL 正则项中 logsumexp(Q(s,a)) - E_data[Q(s,a)] 的核心作用是什么？"
options:
  - "鼓励所有动作 Q 值都变大"
  - "压低高 Q 的非数据动作，相对提高数据动作的价值优势"
  - "替代奖励函数"
  - "学习环境动力学模型"
answer: 1
explain: "logsumexp 会惩罚当前估值较高的广泛动作，而减去数据动作 Q 值使数据内动作相对更高，从而形成保守的 OOD 价值估计。"
```

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
Unifloral 在论文 “A Clean Slate for Offline Reinforcement Learning” 中提出统一的离线 RL 评估协议和统一算法空间，用显式在线调参预算衡量方法性能，并把多种离线 RL 设计拆成可组合超参数。它的核心贡献不是单一损失函数，而是让离线 RL 的算法比较、消融和新方法搜索变得更可复现。

#### 🎯 核心要点
- **官方对应关系**：NeurIPS 2025 oral 条目对应 OpenReview `8P3QNSckMp` 与 arXiv `2504.11453`，题名为 “A Clean Slate for Offline Reinforcement Learning”
- **问题重定义**：指出许多离线 RL 论文隐含使用大量在线评估调参，导致“离线”算法比较不公平
- **在线调参预算量化**：用预部署评估 episode 数 \(N\) 表示可用在线交互预算，并模拟 bandit 式 policy selection
- **统一算法空间**：把模型设计、critic objective、actor objective、dynamics modeling 四类设计做成统一超参数空间
- **单文件重实现**：提供简洁一致的 model-free/model-based 离线 RL 实现，减少 boilerplate 差异
- **Unifloral 作为元算法**：不是固定一组超参数，而是一个覆盖多种既有方法和新组合的配置空间
- **派生新方法**：用统一空间提出 TD3-AWR（model-free）和 MoBRAC（model-based），展示组合式研究流程

#### 🔬 深入细节
##### 方法示意图

![Unifloral 离线 RL 变体分类图](https://ar5iv.labs.arxiv.org/html/2504.11453/assets/x1.png)

*图：Unifloral 论文中的离线 RL 变体形式化图。论文区分零样本部署、预部署 policy selection、部署后选择和在线微调等设置，强调必须报告在线调参预算。*

##### 算法伪代码

```python
# Unifloral evaluation protocol + unified search space
method_space = {
    "model_design": sample_arch_optimizer_and_ensemble(),
    "critic_objective": sample_value_target_bc_entropy_diversity(),
    "actor_objective": sample_q_bc_entropy_awr_weights(),
    "dynamics_modeling": sample_model_based_options(),
}

policies = []
for i in range(P):
    config = sample(method_space)
    policy = train_offline(config, dataset=D)
    scores = evaluate_policy(policy, episodes=R)  # collected once for analysis
    policies.append((policy, scores))

for online_budget_N in budgets:
    selected = simulate_ucb_policy_selection(policies, budget=online_budget_N)
    report(best_arm_performance(selected))
```

##### 动机与背景

离线 RL 名义上不允许训练时与环境交互，但很多论文会在目标任务上训练大量超参数配置，再用在线评估挑选最好的结果。这相当于把“在线调参”藏在实验流程里，而不同方法的超参数空间大小、调参次数和报告方式并不一致。Unifloral 的第一项贡献就是把这个隐含成本显式化：一个离线 RL 方法不仅包含算法，还包含固定超参数范围和允许的在线 policy selection 预算。

论文形式化了多种离线 RL 变体。最严格的是训练一个策略后直接部署；更常见的是训练多个策略，通过 \(N\) 次目标环境评估在部署前选择；还有部署后选择和在线 fine-tuning。Unifloral 认为若使用了预部署评估，就应报告对应预算，而不是只报告无限调参后的最好结果。

评估协议可以抽象为：先从算法的固定超参数范围采样 \(P\) 个配置，离线训练得到策略集合；再用一个 UCB bandit 在有限在线 episode 预算下模拟策略选择：

$$
\pi_{\mathrm{deploy}}
=
\mathrm{BanditSelect}(\{\pi_i\}_{i=1}^P, N)
$$

这样同一算法可以画出随在线调参预算变化的性能曲线。若一个方法只有在大量在线选择下表现好，而小预算下不稳，就能被直接看出来。

Unifloral 的第二项贡献是统一算法空间。它把既有方法拆成四类组件：模型设计、critic 目标、actor 目标、动力学建模。比如 critic 可以选择 IQL 式 value target 或 TD3 式 target policy smoothing，可以加入 BC/entropy/diversity 项；actor 可以组合 Q 最大化、行为克隆、熵和 AWR 权重：

$$
\mathcal{L}_{\mathrm{actor}}
=
\beta_q\mathcal{L}_q
+\beta_{\mathrm{BC}}\mathcal{L}_{\mathrm{BC}}
-\beta_{\mathcal{H}}\mathcal{H}(\pi(\cdot|s))
$$

其中 \(\mathcal{L}_{\mathrm{BC}}\) 可进一步变为 AWR：

$$
\mathcal{L}_{\mathrm{BC}}
=
d(a_t,\hat{a}_t)
\cdot
\min(A_{\max}, \exp(\eta(Q(s_t,a_t)-V(s_t))))
$$

统一空间的意义是研究者可以在同一个实现里组合 IQL、TD3-BC、ReBRAC、EDAC、MOPO 等思想，而不是每次比较一套代码库。论文用这个框架提出 TD3-AWR：把 ReBRAC/TD3-BC 的 actor Q 优化与 IQL 的优势加权行为克隆结合；又提出 MoBRAC：把 MOPO 式模型 rollout 与 ReBRAC 式 policy optimizer 结合。

> 💡 关键：Unifloral 不是“又一个离线 RL 单点算法”，而是把算法、超参数范围和在线评估预算绑定成可比较对象。

##### 与传统离线 RL 论文的区别

| 维度 | 常规报告方式 | Unifloral |
|---|---|---|
| 超参数 | 常按任务调优，预算不透明 | 固定范围，显式采样 |
| 在线评估 | 往往只报告最佳配置 | 报告随预算变化的选择性能 |
| 实现 | 多代码库混合比较 | 单文件、组件化一致实现 |
| 方法开发 | 增加新算法整体 | 在统一空间内组合和消融 |

这使 Unifloral 更像一个离线 RL “实验协议 + 元算法空间”。对于具身任务，尤其是机器人离线数据昂贵、真实评估成本高的场景，这种预算意识比单纯追求最高表格分数更接近真实部署。

#### 🧪 练习题
```yaml
question: "Unifloral 评估协议为什么要显式量化在线调参预算？"
options:
  - "因为离线 RL 不需要任何数据集"
  - "因为目标环境评估本身是一种在线交互，会显著影响最终报告性能"
  - "因为所有算法都必须使用同一个神经网络宽度"
  - "因为只能评估 model-based 方法"
answer: 1
explain: "很多离线 RL 结果隐含用在线评估挑选超参数；Unifloral 将评估 episode 数作为预算报告，避免不同方法因隐藏调参成本而不可比。"
```

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
CPQL 将 Peng's Q(\(\lambda\)) 多步算子嵌入 CQL 的保守价值估计，用离线轨迹的多步信息缓解单步 Bellman backup 的过度悲观，同时保持对分布外动作的保守约束。它的固定点对应行为策略与学习策略的混合策略价值，因此天然带有隐式行为正则。

#### 🎯 核心要点
- **官方论文**：OpenReview 条目为 ICLR 2026 poster；arXiv 可访问版本为 `2605.14779`
- **多步离线算子**：使用 Peng's Q(\(\lambda\)) operator，而不是单步 Bellman operator
- **固定点解释**：PQL 在离线设置下收敛到 \(\lambda\hat{\pi}_\beta+(1-\lambda)\pi\) 的混合策略价值
- **保守项继承 CQL**：critic loss 保留 CQL 风格 log-sum-exp 减数据动作 Q 的正则
- **缓解过度悲观**：多步轨迹信息使 Q 估计比 CQL 更温和，减少 conservative value estimation 的过低估值
- **理论保证**：给出混合策略价值下界、至少不低于行为策略、缩小次优间隙等结果
- **离线到在线**：CPQL 预训练 Q 函数后接在线 PQL，可缓解 online fine-tuning 开始阶段的性能掉落

#### 🔬 深入细节
##### 方法示意图

![CPQL 方法示意图](https://arxiv.org/html/2605.14779v1/x1.png)

*图：CPQL 论文 arXiv HTML 中的主图资源。核心思想是用 PQL 多步目标替换 CQL 的单步 Bellman 目标，同时保留保守 Q 正则。*

##### 算法伪代码

```python
# Conservative Peng's Q(lambda)
initialize Q1, Q2, policy pi, target_Q1, target_Q2

for gradient_step in range(num_steps):
    traj = sample_partial_trajectories(D, length=n)

    # 从尾到头构造 Peng's Q(lambda) 多步目标
    for i in reversed(range(n)):
        for j in [1, 2]:
            q_hat[j][i] = (
                r[i]
                + gamma * target_Qj(s[i+1], pi(s[i+1]))
                + gamma * lambda_ * (q_hat[j][i+1] - target_Qj(s[i+1], pi(s[i+1])))
            )

    y = min(q_hat[1][0], q_hat[2][0]) - gamma**n * alpha_td * log_prob(pi, s[n])

    # CQL-style conservative critic loss
    conservative = logsumexp(Qj(s, all_actions)) - mean(Qj(s, dataset_actions))
    critic_loss = 0.5 * mse(Qj(s0, a0), y) + alpha_cql * conservative
    update(Q1, Q2, critic_loss)

    # SAC-style actor update
    actor_objective = mean(min(Q1(s, pi(s)), Q2(s, pi(s))) - alpha_pol * log_prob(pi, s))
    update(pi, -actor_objective)
    soft_update_targets()
```

##### 动机与背景

CQL 解决了离线 RL 的 OOD 动作过估计问题，但保守正则也可能带来过度悲观：Q 值被压得太低时，策略改进信号变弱，尤其在高质量数据或需要轨迹拼接的任务中会损失性能。另一方面，很多离线数据以完整轨迹存在，单步 Bellman backup 没有充分利用多步回报信息。CPQL 的问题意识是：能否用多步算子提供更丰富的价值传播，同时仍保持 CQL 的保守性？

Peng's Q(\(\lambda\)) operator 定义为：

$$
\mathcal{T}^{\pi_\beta,\pi}_\lambda Q
=
(1-\lambda)\sum_{n=1}^{\infty}\lambda^{n-1}
\mathcal{T}^{\pi_\beta,\pi}_n Q
$$

其中 \(\mathcal{T}^{\pi_\beta,\pi}_n Q=(\mathcal{T}^{\pi_\beta})^{n-1}\mathcal{T}^{\pi}Q\)。直觉上，前 \(n-1\) 步沿行为策略轨迹传播，最后一步使用学习策略评估。这非常适合离线数据，因为真实轨迹来自行为策略，而目标仍希望朝学习策略改进。

CPQL 将 CQL 的单步 Bellman 目标替换为 PQL 目标：

$$
\widehat{Q}_{k+1}
\in
\arg\min_Q
\left\{
\frac{1}{2}\mathbb{E}_{\mathcal{D}}
\left[
\left(Q(s,a)-\mathcal{T}_{\lambda}^{\hat{\pi}_\beta,\pi_k}\widehat{Q}_k(s,a)\right)^2
\right]
+\alpha
\left(
\mathbb{E}_{s\sim\mathcal{D},a\sim\pi_k}Q(s,a)
-\mathbb{E}_{s,a\sim\mathcal{D}}Q(s,a)
\right)
\right\}
$$

这个公式说明 CPQL 不是丢掉 CQL，而是把 CQL 的 target 从单步换成多步。保守项继续压制学习策略在 OOD 动作上的高 Q，PQL target 则利用离线轨迹的长时序信息，避免所有改进都依赖单步 bootstrapping。

论文给出的关键固定点解释是：PQL operator 在离线设置下对应混合策略 \(\lambda\hat{\pi}_\beta+(1-\lambda)\pi\) 的价值。这样 \(\lambda\) 控制行为策略锚定强度：\(\lambda=0\) 退回单步 CQL 风格；\(\lambda\) 较大时价值更接近行为策略，分布偏移更小，但过大也会限制最优性。

实际算法从离线数据中采样长度为 \(n\) 的 partial trajectories，从尾到头递推：

$$
\widehat{Q}_{\theta_j}^{i}
=
r_i+\gamma Q_{\theta_j^-}(s_{i+1},\pi_\phi(s_{i+1}))
+\gamma\lambda
\left(
\widehat{Q}_{\theta_j}^{i+1}
-Q_{\theta_j^-}(s_{i+1},\pi_\phi(s_{i+1}))
\right)
$$

然后用双 Q 的最小值构造 target，并加上 entropy 项。actor 更新与 SAC 类似，最大化 \(\min_jQ_{\theta_j}(s,a)-\alpha_{\mathrm{pol}}\log\pi(a|s)\)。因此 CPQL 可视为“CQL critic 正则 + PQL 多步 target + SAC actor”的组合。

> 💡 关键：CPQL 的 \(\lambda\) 不是普通 TD(\(\lambda\)) 的工程技巧，而是控制行为策略与学习策略混合固定点的保守性旋钮。

##### 与 CQL 的区别

| 维度 | CQL | CPQL |
|---|---|---|
| Backup | 单步 Bellman target | Peng's Q(\(\lambda\)) 多步 target |
| 保守性来源 | Q 正则压低 OOD 动作 | Q 正则 + 行为策略混合固定点 |
| 轨迹利用 | 主要用单步 transition | 使用 partial trajectory 多步信息 |
| 主要改进 | 防过估计 | 防过估计同时缓解过度悲观 |

CPQL 的代价是多步 target 会增加一些计算和实现复杂度，并且在低质量数据上过长轨迹可能传播不理想行为。论文因此将轨迹长度、\(\alpha\) 和 \(\lambda\) 作为关键超参数，并报告 CPQL 可在 \(\lambda=0\) 时复现单步 TD 学习。

#### 🧪 练习题
```yaml
question: "CPQL 中 Peng's Q(λ) 算子的核心作用是什么？"
options:
  - "完全移除 CQL 的保守正则项"
  - "用离线轨迹的多步信息替换单步 Bellman target，并形成行为策略与学习策略的混合固定点"
  - "把离线 RL 改成纯行为克隆"
  - "只用于图像数据增强"
answer: 1
explain: "CPQL 将 PQL 多步算子嵌入 CQL critic 目标，使价值估计利用离线轨迹长程信息，同时通过混合策略固定点减轻分布偏移和过度悲观。"
```

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
SafeFQL 把 Flow Q-Learning 的快速生成式策略提取与 Hamilton-Jacobi 可达性安全 critic 结合起来，在离线数据上学习一个既接近高回报行为、又被可达安全边界约束的一步式策略。

#### 🎯 核心要点
- **安全问题**：离线 RL 不能通过在线试错修正危险动作，普通 FQL 只强调从数据分布中快速抽取高价值动作，缺少对未来不可恢复风险的显式建模。
- **核心做法**：同时训练奖励 critic、可达性安全 critic 与 flow 行为教师，再把教师蒸馏成一步 actor；actor 只在安全 critic 判定可行的动作区域内做 Q 最大化。
- **安全边界**：安全约束来自 Hamilton-Jacobi reachability，将“未来是否会进入失败集合”写成状态-动作价值的递推，而不是只用单步 cost 累积近似。
- **效率优势**：策略执行阶段不需要扩散模型的多步去噪或拒绝采样，保持 FQL 的一步生成推理速度，适合机器人和具身控制的实时约束。
- **校准机制**：论文还引入 conformal prediction 对安全阈值做有限样本校准，让离线估计的安全集合更少依赖手调 margin。

#### 🔬 深入细节
##### 框架示意

![SafeFQL framework overview](https://ar5iv.labs.arxiv.org/html/2603.15136/assets/x1.png)

图中展示了 SafeFQL 的三条主线：从离线数据学习奖励与安全 critic，用 flow matching 拟合行为分布，再把 flow 教师压缩为一步策略。需要注意的是，SafeFQL 的安全不是在执行时做后处理，而是提前进入 actor 训练目标。

##### 从 FQL 到安全离线 RL

FQL 的基本思想是先用 flow 模型描述数据中的行为动作分布，再通过 Q 函数把策略推向高价值动作。SafeFQL 保留了这一点，但将目标从单纯的

$$
\max_\pi \mathbb{E}_{s \sim \mathcal{D}, a \sim \pi(\cdot|s)}[Q_r(s,a)]
$$

改成带可行域的优化：

$$
\max_\pi \mathbb{E}[Q_r(s,\pi(s))] \quad
\text{s.t.}\quad Q_c(s,\pi(s)) \le \tau .
$$

这里 $Q_r$ 是任务回报 critic，$Q_c$ 是安全 critic，$\tau$ 是经过校准的安全阈值。这个形式的关键不是惩罚危险动作，而是把危险动作排除在 actor 的有效改进区域之外。

##### Hamilton-Jacobi 安全 critic

论文使用可达性视角描述安全：如果从当前状态动作出发，在未来某个时间会不可避免地进入失败集合，那么这个点就应被判为不安全。可达安全值可以写成类似

$$
V_\ell^\*(x_0)=\min_\pi \max_{t\ge0}\ell(x_t),
$$

其中 $\ell(x)$ 是安全边界函数，$\ell(x)\le0$ 通常表示安全。对应到离线 TD 训练时，安全 critic 使用 reachability 风格的 max-backup：

$$
Q_c(s,a) \leftarrow \max\left(\ell(s), \min_{a'} Q_c(s',a')\right).
$$

这与累计 cost 的区别很大：累计 cost 可能把一次灾难事件平均掉，而可达性备份关注轨迹上的最坏状态，因此更适合碰撞、越界、跌倒这类“不能发生一次”的具身任务。

##### 一步 flow 策略提取

SafeFQL 先训练一个 flow 行为教师，用连续时间流把简单噪声分布变换为数据动作分布；随后训练一个一步 actor 近似教师动作，同时用奖励 critic 做改进。actor 的损失可以概括为

$$
\mathcal{L}_{actor}
= - Q_r(s,\pi_\theta(s))
+ \lambda \|\pi_\theta(s)-a_{flow}(s)\|_2^2
+ \alpha [Q_c(s,\pi_\theta(s))-\tau]_+ .
$$

第二项保证 actor 不偏离离线数据支持集太远，第三项把安全约束转为可优化的 hinge penalty。实际训练中，论文强调“feasibility-gated”的更新：只有安全 critic 判断可行时才鼓励策略追逐更高奖励。

##### Conformal 校准

离线 critic 难免存在估计误差，尤其在分布边缘的危险区域。SafeFQL 将一部分离线数据留作校准集，计算安全分数的经验分位数，并用 conformal prediction 调整 $\tau$。直观地说，如果校准集中真实不安全轨迹经常被 critic 低估，阈值就会变得更保守。

这种校准不需要改变训练数据，也不要求知道真实动力学模型。它提供的是有限样本意义下的概率覆盖保证，适合作为离线安全 RL 中 critic 过度乐观的补丁。

##### 算法伪代码

```text
Input: offline dataset D, safety boundary l(s), target risk alpha

1. Split D into training data D_train and calibration data D_cal.
2. Train reward critic Q_r with offline TD or IQL-style targets.
3. Train reachability critic Q_c using max-backup:
      target_c = max(l(s), min_a' Q_c_target(s', a'))
4. Fit a flow behavior teacher p_flow(a | s) on D_train.
5. Distill a one-step actor pi_theta(s):
      keep pi close to flow teacher
      maximize Q_r(s, pi(s))
      penalize or mask actions with Q_c(s, pi(s)) > tau
6. On D_cal, compute conformal residuals for safety prediction.
7. Set calibrated threshold tau_alpha by the empirical quantile.
8. Deploy one-step actor with the calibrated safety gate.

Output: safe one-step policy pi_theta
```

##### 适用边界

SafeFQL 适合安全约束明确、失败集合可由状态函数描述的任务，例如导航越界、机器人碰撞、速度限制或姿态跌倒。它不解决“安全函数本身不可观测”的问题；如果 $\ell(s)$ 或离线数据中的失败标注不可靠，reachability critic 也会学习到错误边界。

另外，论文是 2026 年 arXiv 工作，公开资料主要来自论文页面与 HTML 版本。这里的解读基于论文公开摘要、方法图、算法描述和可达性 RL 的标准递推形式；若后续正式版本修改实现细节，应以最终论文为准。

#### 🧪 练习题
```yaml
- question: "SafeFQL 相比普通 FQL 最关键的新增模块是什么？"
  options:
    A: "只使用更大的 replay buffer"
    B: "引入可达性安全 critic 并约束 actor 改进区域"
    C: "把离线 RL 改成纯模仿学习"
    D: "取消 Q 函数，只保留 flow model"
  answer: B
  explain: "SafeFQL 的核心是在 FQL 的 flow 策略提取上加入 HJ reachability 安全 critic，使策略优化受未来安全边界约束。"
- question: "为什么 SafeFQL 强调一步 actor？"
  options:
    A: "为了在执行时避免多步扩散采样或拒绝采样的延迟"
    B: "为了完全不需要离线数据"
    C: "为了让安全 critic 失效"
    D: "为了把连续动作变成离散动作"
  answer: A
  explain: "一步 actor 保留生成式策略的表达能力，同时使部署阶段推理更快，适合实时控制。"
```

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
Option-Critic 把 options 框架中的子策略和终止函数都写成可微参数化模块，使智能体可以端到端学习“做什么技能、技能内部怎么行动、什么时候结束技能”。

#### 🎯 核心要点
- **解决的问题**：传统 options 往往需要人工指定子目标、终止集合或技能库，Option-Critic 让这些结构从任务回报中自动学习。
- **三个策略层次**：高层策略 $\pi_\Omega(\omega|s)$ 选择 option；option 内策略 $\pi_\omega(a|s)$ 选择动作；终止函数 $\beta_\omega(s)$ 决定当前 option 是否结束。
- **关键理论**：论文给出 intra-option policy gradient 和 termination gradient，可以直接对 option 内策略与终止函数做 actor-critic 更新。
- **行为语义**：如果某个 option 在状态 $s$ 的优势 $A_\Omega(s,\omega)$ 为正，就应该降低终止概率；如果优势为负，就更倾向结束并重新选择 option。
- **影响**：它是深度层次化 RL 的基础架构之一，后续 FeUdal Networks、HIRO 等方法都在不同方向上重写了“高层技能如何指定低层行为”。

#### 🔬 深入细节
##### 论文图示

![Option-Critic experimental illustration](https://ar5iv.labs.arxiv.org/html/1609.05140/assets/x1.png)

原论文主要用 Four Rooms、Pinball 与 Atari 实验展示学习到的 options 与学习曲线，而不是给出单独的网络结构图。上图来自论文 HTML 版本，用于帮助理解 option 在环境中形成可复用的时序行为。

##### Options 的参数化

一个 option 可表示为三元组

$$
\omega = (\mathcal{I}_\omega,\pi_\omega,\beta_\omega),
$$

其中 $\mathcal{I}_\omega$ 是可启动集合，$\pi_\omega(a|s)$ 是 option 内策略，$\beta_\omega(s)$ 是终止概率。Option-Critic 的常见设定是所有 option 在所有状态都可启动，即 $\mathcal{I}_\omega=\mathcal{S}$，这样模型重点放在学习内部行为与终止边界。

执行时采用 call-and-return 机制：高层先采样一个 option，低层连续执行该 option 的动作；每一步之后根据 $\beta_\omega(s')$ 判断是否终止。如果终止，就由 $\pi_\Omega$ 重新选 option；如果不终止，就继续沿用当前 option。

##### Intra-option policy gradient

Option-Critic 的第一条核心结果是 option 内策略梯度：

$$
\frac{\partial \rho}{\partial \theta}
= \sum_{s,\omega}\mu_\Omega(s,\omega|s_0,\omega_0)
\sum_a
\frac{\partial \pi_{\omega,\theta}(a|s)}{\partial\theta}
Q_U(s,\omega,a).
$$

$Q_U(s,\omega,a)$ 表示在状态 $s$、当前 option 为 $\omega$ 时采取动作 $a$ 的价值；$\mu_\Omega$ 是状态-option 对的折扣访问分布。这个公式说明，option 内策略可以像普通策略梯度一样训练，只是 critic 需要知道当前 option。

##### 终止函数梯度

第二条核心结果是终止函数梯度：

$$
\frac{\partial \rho}{\partial \vartheta}
= - \sum_{s',\omega}
\mu_\Omega(s',\omega|s_1,\omega_0)
\frac{\partial \beta_{\omega,\vartheta}(s')}{\partial \vartheta}
A_\Omega(s',\omega),
$$

其中

$$
A_\Omega(s,\omega)=Q_\Omega(s,\omega)-V_\Omega(s).
$$

负号很重要：当当前 option 比重新选择的平均价值更好时，$A_\Omega>0$，梯度会降低终止概率；当当前 option 已经不合适时，$A_\Omega<0$，终止概率会上升。这让 option 学到相对自然的边界，而不是人为规定固定长度。

##### Actor-Critic 实现

深度实现中，critic 估计 $Q_\Omega(s,\omega)$、$V_\Omega(s)$ 或 $Q_U(s,\omega,a)$；actor 同时更新 $\pi_\Omega$、$\pi_\omega$ 和 $\beta_\omega$。经验上，终止函数可能过早学成“每步都终止”，因此论文实现中会加入 termination regularization 或 deliberation cost 的思想，让 option 保持一定持续性。

Option-Critic 的优势在于形式统一：它不需要额外的子目标奖励，也不要求环境暴露层次结构。缺点也同样明显：所有 option 都从同一个任务回报中学习，在稀疏奖励或长程探索任务中，option 可能塌缩成相似策略，难以自动产生真正有语义的技能。

##### 算法伪代码

```text
Initialize policy over options pi_Omega, intra-option policies pi_omega,
termination functions beta_omega, and critic Q_Omega.

for each episode:
    observe state s
    sample option omega ~ pi_Omega(. | s)
    while episode not done:
        sample action a ~ pi_omega(. | s)
        execute a, observe r, s'

        update critic with option-value TD target
        update intra-option policy using Q_U(s, omega, a)
        update beta_omega(s') using - d beta * A_Omega(s', omega)

        if beta_omega(s') terminates:
            sample new option omega ~ pi_Omega(. | s')
        s = s'

Output: learned options and high-level option policy
```

##### 经验结论

在 Four Rooms 中，Option-Critic 能学到穿越门口、移动到房间区域等具有持续性的 option；在 Atari 中，它可以在端到端像素输入上联合学习 option 与控制策略。它的价值更多在于提供了“可微 options”的通用接口，而不是保证每次都能发现人类可解释的技能。

#### 🧪 练习题
```yaml
- question: "Option-Critic 中 beta_omega(s) 表示什么？"
  options:
    A: "option 的终止概率"
    B: "环境转移概率"
    C: "动作价值函数"
    D: "探索噪声强度"
  answer: A
  explain: "beta_omega(s) 决定当前 option 到达状态 s 后是否结束。"
- question: "当 A_Omega(s, omega) 为正时，合理的终止行为是什么？"
  options:
    A: "提高终止概率"
    B: "降低终止概率，继续执行当前 option"
    C: "删除该 option"
    D: "忽略 critic"
  answer: B
  explain: "正优势表示当前 option 比重新选择更好，因此 termination gradient 会倾向于降低终止概率。"
```

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
FeUdal Networks 用 Manager-Worker 架构把“在抽象状态空间中设定方向性目标”和“把目标落地为动作”分开，让高层专注长程目标，低层通过内在奖励学习执行。

#### 🎯 核心要点
- **层次结构**：Manager 每隔较慢时间尺度产生 latent goal，Worker 每个环境步根据 goal 输出原始动作。
- **目标形式**：高层目标不是离散 option，也不是环境坐标，而是特征空间中的方向向量，表示希望未来状态表征朝哪个方向变化。
- **信用分配**：Worker 通过目标达成的内在奖励训练；Manager 主要由外部任务奖励训练，并通过 transition policy gradient 处理长程依赖。
- **梯度隔离**：论文强调不让 Worker 的梯度直接穿回 Manager，避免低层动作损失扭曲高层语义。
- **实验意义**：在 Atari 和 DeepMind Lab 的长程任务中，FuN 展示了层次目标设定对稀疏奖励和记忆任务的帮助。

#### 🔬 深入细节
##### 架构示意

![FeUdal Networks architecture](https://ar5iv.labs.arxiv.org/html/1703.01161/assets/x1.png)

图中可以看到共享感知模块、Manager、Worker 与目标调制动作层。Manager 生成的 goal 不是直接动作，而是传给 Worker 的条件信号。

##### Manager 与 Worker

设感知网络把观测编码为 latent state $s_t$。Manager 在较慢时间尺度上输出 goal：

$$
g_t = \frac{h_t^M}{\|h_t^M\|_2},
$$

其中 $h_t^M$ 来自 Manager 的循环网络状态。Worker 接收当前状态和若干最近 goals，生成动作策略 $\pi_W(a_t|s_t,g_t)$。Worker 的动作 logits 可理解为由状态相关的动作嵌入矩阵 $U_t$ 与 goal embedding $w_t$ 相乘得到：

$$
\pi_W(a_t|s_t,g_t) = \text{softmax}(U_t w_t).
$$

这个结构让 goal 改变动作偏好，而不是简单拼接到输入后交给普通 MLP。

##### 内在奖励

Worker 的学习信号来自 goal 与实际状态变化方向的对齐。若 $c$ 是高层时间跨度，内在奖励可概括为

$$
r_t^I = \frac{1}{c}\sum_{i=1}^{c}
\cos(s_t - s_{t-i}, g_{t-i}).
$$

也就是说，如果 Worker 的动作让 latent state 按照 Manager 指定方向移动，它就得到正奖励。这个设计把高层 goal 转换成低层可密集学习的信号，使 Worker 不必等待稀疏外部奖励。

##### Manager 的长程学习

Manager 不直接被 Worker 的动作损失训练，而是通过外部回报学习“什么方向有助于任务”。论文提出 transition policy gradient，将 Manager 的 goal 与未来 latent transition 的方向联系起来。直观地说，如果某个 goal 之后的未来状态变化带来了高外部回报，那么 Manager 应该更倾向输出类似方向。

Manager 还使用 dilated LSTM 增强长程记忆，减少每一步都反向传播造成的短视问题。这样，高层既能看到较长历史，又不会被低层动作频率淹没。

##### 与 Option-Critic 的差异

Option-Critic 学习的是离散 option 及其终止概率，核心问题是“哪个 option 继续执行”。FuN 则没有显式终止函数，而是让 Manager 周期性地产生连续 goal。它把层次结构从“选择一个子策略”改成“给低层一个方向性控制信号”。

这种连续目标形式在高维控制和像素输入上更灵活，但解释性弱于传统 options。一个 latent goal 未必对应人类能命名的技能，它只需要在表征空间中对 Worker 有用。

##### 算法伪代码

```text
Initialize shared encoder, Manager M, Worker W.

for each rollout:
    encode observation o_t into latent state s_t
    Manager produces normalized goal g_t at a slower temporal scale
    Worker receives s_t and recent goals
    Worker samples primitive action a_t
    environment returns extrinsic reward r_t and next observation

    compute intrinsic reward r_t^I from cosine alignment:
        direction = s_t - s_{t-c}
        r_t^I = cosine(direction, previous Manager goal)

    update Worker to maximize intrinsic reward and action return
    update Manager with extrinsic reward using transition policy gradient
    stop Worker gradients from directly updating Manager

Output: hierarchical Manager-Worker policy
```

##### 适用与局限

FuN 适合存在长程依赖、稀疏外部奖励、但可以通过状态表征变化定义进展的任务。它的主要风险在于 latent space 质量：如果编码器没有学到与任务进展相关的表示，Manager 的方向目标就可能变成噪声。另外，goal 的时间跨度 $c$ 是重要超参，太短会退化成普通低层控制，太长则让 Worker 难以完成目标。

#### 🧪 练习题
```yaml
- question: "FeUdal Networks 中 Manager 输出的 goal 主要表示什么？"
  options:
    A: "原始动作编号"
    B: "特征空间中的目标方向"
    C: "环境奖励函数"
    D: "终止概率"
  answer: B
  explain: "Manager 输出的是 latent state 空间中的方向性目标，Worker 根据该目标执行动作。"
- question: "Worker 的内在奖励通常来自什么？"
  options:
    A: "状态变化方向与 Manager goal 的余弦相似度"
    B: "随机噪声大小"
    C: "高层策略熵的负值"
    D: "replay buffer 的容量"
  answer: A
  explain: "Worker 被奖励去实现 Manager 指定的状态表征变化方向。"
```

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
HER 把失败轨迹重新解释为“完成了另一个目标”的成功经验，通过目标重标注让稀疏奖励任务也能产生大量可学习的监督信号。

#### 🎯 核心要点
- **核心洞察**：即使智能体没有达到原目标，它通常也达到了某个实际状态；把这个实际状态当作替代目标，失败经验就能变成成功样本。
- **适用前提**：任务必须是 goal-conditioned，策略、价值函数和奖励都能以目标 $g$ 为条件，例如 $\pi(a|s,g)$ 和 $Q(s,a,g)$。
- **算法依赖**：HER 生成的是重标注后的 off-policy 经验，因此最自然地与 DQN、DDPG、SAC 等 off-policy 方法结合。
- **目标采样策略**：论文比较 final、future、episode、random 等策略，其中从同一 episode 的未来 achieved goals 中采样通常最稳定。
- **具身价值**：FetchReach、FetchPush、FetchSlide、FetchPickAndPlace 等机器人任务说明，HER 能在二值稀疏奖励下学习复杂操作。

#### 🔬 深入细节
##### 示意图

![HER FetchPush illustration](https://images.ctfassets.net/kftzwdyauwt9/305fUDgKTf0wZ8IXN8FHNv/7f3b757f7f3cc08899ea9bc53ce056c0/ingredients-for-robotics-research-5.png?w=3840&q=90&fm=webp)

论文 arXiv HTML 中的图片资源未能稳定解析；这里使用 OpenAI 官方 robotics/HER 相关文章中的 FetchPush 示意图。它展示的是 HER 最典型的设定：机械臂推动物体到目标位置，奖励只在达到目标时给出。

##### Goal-conditioned 形式

HER 假设状态中可以区分 desired goal $g$ 与 achieved goal $m(s)$。奖励函数由目标决定：

$$
r_g(s,a,s') =
\begin{cases}
0, & \|m(s')-g\| \le \epsilon,\\
-1, & \text{otherwise}.
\end{cases}
$$

策略和 critic 都接收目标：

$$
a_t \sim \pi_\theta(a|s_t,g), \quad Q_\phi = Q_\phi(s_t,a_t,g).
$$

这样，同一段状态动作轨迹可以在不同目标下拥有不同奖励。HER 的全部威力都来自这个可重解释性。

##### 后见重标注

假设一条 episode 的原始目标是 $g$，轨迹为

$$
(s_0,a_0,s_1,\ldots,s_T).
$$

普通 replay 只存储原始 transition：

$$
(s_t,g,a_t,r_g(s_t,a_t,s_{t+1}),s_{t+1},g).
$$

HER 会额外采样一个后见目标 $g' = m(s_k)$，其中 $k>t$ 通常来自同一轨迹的未来时间步，然后重算奖励：

$$
r_{g'}(s_t,a_t,s_{t+1}).
$$

如果智能体最终碰巧把物体推到了某个位置，那么以这个位置为目标时，轨迹后段就包含成功样本。稀疏奖励不再意味着 replay buffer 里几乎全是失败。

##### 为什么 future 策略有效

future 策略从当前 transition 之后的 achieved goals 中采样 $g'$。这比 random 更有效，因为未来状态确实受当前动作影响；也比只用 final 更丰富，因为一条轨迹里有多个中间达成目标。它让 critic 看到“当前动作如何推动系统接近后续实际状态”的局部因果关系。

HER 不改变环境，不添加 shaped reward，也不需要演示数据。它只是改变 replay buffer 中 transition 的目标标签与对应奖励，因此实现成本很低。

##### 与层次技能的关系

虽然 HER 本身不是传统 HRL 架构，但在具身任务中它常被当作技能学习与目标条件控制的基础组件。低层策略可以被训练成“达到任意目标”的通用技能，高层再负责产生目标序列。许多后续层次化方法都复用了 HER 的目标重标注思想。

##### 算法伪代码

```text
Initialize off-policy RL algorithm A and replay buffer R.

for each episode:
    sample desired goal g
    collect trajectory using policy pi(a | s, g)

    for each transition t in the trajectory:
        store original transition with goal g in R

        for k hindsight samples:
            sample new goal g' from achieved goals in the same episode
            recompute reward r' = r(s_t, a_t, s_{t+1}, g')
            store relabeled transition (s_t, g', a_t, r', s_{t+1}, g') in R

    update off-policy algorithm A using minibatches from R

Output: goal-conditioned policy pi(a | s, g)
```

##### 局限

HER 需要可以定义 achieved goal，并能对任意替代目标重算奖励。如果任务目标是语言描述、偏好判断或长期历史属性，简单 HER 就不够直接。它也依赖 off-policy 学习稳定性；如果 critic 在高维连续控制中外推严重，重标注样本可能放大估计误差。

#### 🧪 练习题
```yaml
- question: "HER 如何把失败轨迹变成有用经验？"
  options:
    A: "删除失败轨迹"
    B: "把轨迹实际达到的状态重标注为新的目标并重算奖励"
    C: "把所有奖励都设为 1"
    D: "只训练监督分类器"
  answer: B
  explain: "HER 的核心是 hindsight relabeling：没有达成原目标，也可以视为达成了另一个实际目标。"
- question: "HER 最适合和哪类 RL 算法结合？"
  options:
    A: "off-policy 算法"
    B: "只能使用 on-policy 算法"
    C: "不使用 replay buffer 的算法"
    D: "纯动态规划算法"
  answer: A
  explain: "重标注后的 transition 不来自当前策略目标分布，因此与 off-policy replay 学习最匹配。"
```

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
DIAYN 在没有外部奖励的环境中最大化技能变量与访问状态之间的互信息，让智能体自动发现可区分、可持续且高熵的多样化技能。

#### 🎯 核心要点
- **无监督技能发现**：不给任务奖励，只给一个离散或连续 skill code $z$，要求不同 $z$ 产生可被判别器区分的状态分布。
- **互信息目标**：最大化 $I(S;Z)$，让状态能反推出技能；同时最大化策略熵，使每个技能内部仍保持探索性。
- **判别器奖励**：训练判别器 $q_\phi(z|s)$ 预测当前状态来自哪个技能，策略获得 $\log q_\phi(z|s)-\log p(z)$ 作为内在奖励。
- **SAC 结合**：DIAYN 使用最大熵 RL，通常以 SAC 作为底层优化器，天然匹配熵正则目标。
- **迁移方式**：预训练技能可作为下游任务的初始化、层次化高层动作空间或模仿学习的行为先验。

#### 🔬 深入细节
##### 算法图

![DIAYN algorithm overview](https://ar5iv.labs.arxiv.org/html/1802.06070/assets/x1.png)

图中有两个同时更新的模块：判别器学习从状态识别技能，技能策略学习访问让自己更容易被识别的状态。这个闭环不需要环境任务奖励。

##### 互信息目标

DIAYN 的核心目标可写成

$$
\max_\theta I(S;Z) + H[A|S] - I(A;Z|S).
$$

其中 $I(S;Z)$ 鼓励不同技能访问不同状态；$H[A|S]$ 鼓励动作熵；$I(A;Z|S)$ 的负项避免技能只在同一状态下选择不同动作，而不产生状态差异。通过变分下界，互信息项可近似为

$$
I(S;Z) \ge
\mathbb{E}_{z\sim p(z),s\sim \pi_\theta(\cdot|z)}
[\log q_\phi(z|s)-\log p(z)].
$$

这就把无监督技能发现转化成普通 RL 奖励设计。

##### 内在奖励

策略在每一步收到的奖励是

$$
r_z(s,a,s') = \log q_\phi(z|s') - \log p(z).
$$

如果技能先验 $p(z)$ 是均匀分布，$-\log p(z)$ 是常数；真正驱动学习的是判别器对 $z$ 的置信度。某个技能越能把智能体带到独特状态，判别器越容易识别它，该技能得到的奖励越高。

判别器只看状态，不看动作。这一点防止策略通过不可见或无意义的动作编码技能，例如在原地抖动不同关节但不改变环境状态。

##### 与 SAC 的结合

SAC 的最大熵目标为

$$
J(\pi)=
\sum_t \mathbb{E}[r_z(s_t,a_t,s_{t+1})+\alpha H(\pi(\cdot|s_t,z))].
$$

DIAYN 直接把判别器奖励作为 SAC 的任务奖励。策略输入包含状态和技能 code，critic 也以 $z$ 为条件。训练完成后，固定 $z$ 就得到一个具体技能；高层策略可以在下游任务中选择 $z$ 作为抽象动作。

##### 为什么不会只学随机行为

单纯最大化熵会导致随机游走，但 DIAYN 要求状态能预测技能。随机行为如果所有技能访问同一分布，判别器无法区分，奖励就低。反过来，技能如果只做确定性动作但状态不变化，也不会被判别器可靠识别。因此 DIAYN 倾向学习“可区分的状态占据分布”。

##### 算法伪代码

```text
Initialize skill prior p(z), policy pi_theta(a | s, z),
discriminator q_phi(z | s), and SAC critics.

while not converged:
    sample skill z ~ p(z)
    reset environment and condition policy on z
    for each environment step:
        sample action a ~ pi_theta(. | s, z)
        observe next state s'
        compute intrinsic reward:
            r = log q_phi(z | s') - log p(z)
        store (s, z, a, r, s') in replay buffer

    update q_phi to maximize log q_phi(z | s)
    update SAC policy and critics using intrinsic reward r

Output: diverse skill-conditioned policy pi_theta(a | s, z)
```

##### 实验与局限

论文展示了 MuJoCo 等环境中的多样技能，例如不同方向移动、跳跃或姿态变化，并验证这些技能可迁移到下游奖励任务。局限在于“多样”不等于“有用”：如果环境中最容易区分的状态与下游任务无关，DIAYN 可能学到漂亮但不实用的技能。因此实际系统常把 DIAYN 与任务筛选、高层规划或示范数据结合。

#### 🧪 练习题
```yaml
- question: "DIAYN 中判别器 q_phi(z|s) 的作用是什么？"
  options:
    A: "预测状态来自哪个技能，并为策略提供互信息奖励"
    B: "预测环境真实奖励"
    C: "替代 replay buffer"
    D: "生成物理仿真参数"
  answer: A
  explain: "判别器越能从状态识别技能，说明技能越可区分，策略获得的内在奖励越高。"
- question: "DIAYN 为什么通常与 SAC 搭配？"
  options:
    A: "SAC 是最大熵 RL，天然匹配 DIAYN 的熵正则目标"
    B: "SAC 不需要任何 critic"
    C: "SAC 只能处理离散动作"
    D: "SAC 会自动提供人工子目标"
  answer: A
  explain: "DIAYN 需要同时最大化判别器奖励和策略熵，SAC 正好提供稳定的最大熵 off-policy 优化。"
```

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
HIRO 让高层策略每隔若干步输出相对状态目标，低层策略学习达到这些目标，并用 off-policy correction 修正旧经验中的高层动作，从而让层次化 RL 能高效复用 replay 数据。

#### 🎯 核心要点
- **两层结构**：高层每 $c$ 步输出一个 goal $g_t$；低层在每个环境步根据当前状态和 goal 输出原始动作。
- **相对目标**：goal 通常表示状态差值，低层希望在短时间内让 $s_{t+c}$ 接近 $s_t+g_t$。
- **内在奖励**：低层奖励是达到高层目标的负距离，例如 $-\|s_t+g_t-s_{t+1}\|_2$。
- **核心难点**：低层策略不断变化，旧 replay 中的高层 goal 对当前低层而言不再有相同语义，导致高层 off-policy 学习不稳定。
- **关键修正**：HIRO 通过最大化当前低层策略解释旧动作序列的 likelihood，重新标注高层 goal，提升样本效率。

#### 🔬 深入细节
##### 任务与架构示意

![HIRO hierarchical RL task illustration](https://ar5iv.labs.arxiv.org/html/1805.08296/assets/x2.png)

论文在 Ant Maze、Ant Push、Ant Fall 等连续控制任务中评估 HIRO。图中蓝色箭头表示高层给出的目标方向，低层负责把目标转化为关节控制。

##### 高低层 MDP

低层策略为

$$
a_t \sim \pi^{lo}(a|s_t,g_t),
$$

高层策略每隔 $c$ 步输出目标

$$
g_t \sim \pi^{hi}(g|s_t).
$$

如果使用相对目标，那么在下一步会把目标按状态变化平移：

$$
g_{t+1}=s_t+g_t-s_{t+1}.
$$

这使低层始终看到“从当前状态还差多少到达高层目标”，而不是固定的绝对坐标。

##### 低层内在奖励

HIRO 的低层奖励可写成

$$
r^{lo}(s_t,g_t,a_t,s_{t+1})
= -\|s_t + g_t - s_{t+1}\|_2.
$$

这个奖励与外部任务无关，只衡量低层是否执行了高层命令。高层则接收环境外部奖励，并在时间尺度 $c$ 上学习哪个 goal 有助于任务完成。

##### Off-policy correction

层次化 off-policy 学习的问题是：replay buffer 中某段低层动作 $a_t,\ldots,a_{t+c-1}$ 是旧低层策略在旧 goal $g_t$ 下生成的。当前低层策略已经变了，如果高层仍把旧 $g_t$ 当成动作来训练，TD 目标会出现严重语义偏移。

HIRO 的修正是寻找一个新 goal $\tilde g_t$，使当前低层策略最有可能产生这段历史动作：

$$
\tilde g_t
= \arg\max_g
\sum_{i=t}^{t+c-1}
\log \pi^{lo}(a_i|s_i,g_i).
$$

实际实现不会在连续 goal 空间中全局优化，而是构造候选集合，包括原始 goal、加噪 goal 和直接由 $s_{t+c}-s_t$ 得到的 hindsight goal，再选 likelihood 最大者。

##### 与 FeUdal Networks 的关系

FuN 的高层目标是 latent direction，主要解决长程信用分配；HIRO 的高层目标是可由低层追踪的状态差值，并重点解决 off-policy 经验复用。可以把 HIRO 看成更贴近连续控制和 replay 学习的层次化目标条件框架。

这种设计牺牲了一些抽象性，但带来更明确的低层学习信号：goal 是否完成可以直接用状态距离衡量，而不依赖难解释的 latent 表征。

##### 算法伪代码

```text
Initialize high-level policy pi_hi, low-level policy pi_lo,
critics Q_hi and Q_lo, and replay buffers.

for each episode:
    every c steps:
        high-level samples goal g_t ~ pi_hi(. | s_t)

    for each low-level step:
        low-level samples action a_i ~ pi_lo(. | s_i, g_i)
        environment returns s_{i+1}, extrinsic reward r_i
        compute low-level reward -||s_i + g_i - s_{i+1}||
        store low-level transition
        update remaining goal by relative-state shift

    store high-level transition (s_t, g_t, sum extrinsic rewards, s_{t+c})

    when training high-level from replay:
        relabel old goal with off-policy correction:
            choose g maximizing likelihood of recorded low-level actions
        update Q_hi and pi_hi using corrected goal
    update Q_lo and pi_lo with intrinsic rewards

Output: hierarchical policy with corrected off-policy replay
```

##### 实验结论与局限

HIRO 在 Ant Maze、Ant Push、Ant Fall 和 Ant Gather 中显著优于没有 off-policy correction 的层次化方法，并比许多探索增强基线更省样本。它的局限是 goal space 需要能用状态差值表达；如果任务的高层意图是语言、接触模式或不可观测事件，单纯的 $s_{t+c}-s_t$ 目标就不足够。

#### 🧪 练习题
```yaml
- question: "HIRO 中高层策略输出的是什么？"
  options:
    A: "每一步的原始关节力矩"
    B: "低层要在短时间内达到的状态目标或状态差值"
    C: "环境奖励函数参数"
    D: "判别器类别标签"
  answer: B
  explain: "高层每 c 步输出 goal，低层以该 goal 为条件产生原始动作。"
- question: "HIRO 的 off-policy correction 主要修正什么问题？"
  options:
    A: "旧 replay 中的高层 goal 与当前低层策略语义不一致"
    B: "环境观测维度太小"
    C: "奖励函数无法计算"
    D: "动作空间必须离散化"
  answer: A
  explain: "低层策略变化后，旧 goal 不再能解释历史动作序列，因此需要重新标注高层动作。"
```

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
SkillRL 面向长程 LLM agent 任务，把轨迹蒸馏成可检索技能库，再在 RL 训练中根据失败案例递归更新技能，使策略和技能库共同演化。

#### 🎯 核心要点
- **任务背景**：ALFWorld、WebShop、搜索类任务需要长程规划、工具使用和多步环境交互，单纯强化学习容易在稀疏成功信号下低效探索。
- **技能表示**：SkillRL 将历史轨迹压缩成自然语言技能，组织为 general skills 与 task-specific skills 的层次化 SkillBank。
- **训练流程**：先从基础模型采样轨迹，再用教师模型蒸馏技能，随后进行冷启动 SFT 和基于 GRPO 的 RL 微调。
- **递归演进**：每轮验证后分析失败轨迹，生成或修订技能，将新技能加入 SkillBank，并在后续训练中检索使用。
- **经验发现**：论文报告 SkillRL 在 ALFWorld 等任务上优于直接 GRPO，说明“轨迹蒸馏成技能”比把完整轨迹塞进上下文更稳定。

#### 🔬 深入细节
##### 框架示意

![SkillRL framework overview](https://ar5iv.labs.arxiv.org/html/2602.08234/assets/x2.png)

图中展示了 SkillRL 的闭环：收集轨迹、蒸馏技能、冷启动训练、RL 优化、失败分析与动态技能演化。与传统 HRL 的连续控制 goal 不同，这里的技能主要是可读、可检索的语言程序或策略片段。

##### 为什么需要技能库

长程 agent 任务的动作空间通常是自然语言命令、网页点击、搜索查询或工具调用，episode 成功率低且延迟奖励严重。直接用 RL 从最终成功奖励学习，会让模型反复探索同类错误。SkillRL 的假设是：历史轨迹中包含可迁移的局部策略，应被抽象成技能并在新 episode 中复用。

技能库可以看成高层记忆：

$$
\mathcal{B}=\{b_i=(d_i,u_i,c_i)\}_{i=1}^{N},
$$

其中 $d_i$ 是技能描述，$u_i$ 是使用方式或步骤，$c_i$ 是适用条件。策略在当前状态 $s_t$ 下检索 top-$K$ 技能，再把技能作为上下文的一部分生成动作。

##### 差分轨迹处理

SkillRL 不把所有轨迹同等加入训练。成功轨迹会被保留为正向 demonstration，用于提炼可复用步骤；失败轨迹则被压缩成 failure lessons，强调哪些判断、顺序或工具调用导致失败。这样可以避免把冗长、重复、低质量的原始轨迹直接灌入上下文。

这种差分处理对应一个信息过滤过程：

$$
\text{Skill} = f_{teacher}(\tau, y),
$$

其中 $\tau$ 是轨迹，$y$ 是成功或失败标签。成功样本提供“该怎么做”，失败样本提供“不要再怎么做”以及可修正的新技能。

##### 冷启动与 GRPO

在 RL 之前，SkillRL 先做 cold-start SFT，让基础模型学会读取检索技能并按技能格式行动。随后使用 GRPO 进行策略优化。GRPO 的核心是对同一问题采样一组回答或轨迹，用组内相对奖励估计优势，而不单独训练 critic：

$$
J_{\text{GRPO}}(\theta)=
\mathbb{E}\left[
\frac{1}{G}\sum_{i=1}^{G}
\min\left(
r_i(\theta)A_i,\,
\text{clip}(r_i(\theta),1-\epsilon,1+\epsilon)A_i
\right)
\right].
$$

这里 $r_i(\theta)$ 是新旧策略概率比，$A_i$ 来自组内奖励归一化。对长程 agent 来说，省掉 critic 可以降低不稳定性，但仍保留 PPO 式 clipped update。

##### 递归技能演化

每轮 RL 后，系统在验证环境上运行当前 agent，收集失败案例。教师模型分析失败原因，可能产生新技能、合并旧技能或修改技能适用条件。于是下一轮训练的策略分布变为

$$
\pi_{\theta_{k+1}}(a|s,\text{Retrieve}(s,\mathcal{B}_{k+1})),
$$

而技能库也从 $\mathcal{B}_k$ 更新到 $\mathcal{B}_{k+1}$。这就是“recursive skill-augmented”的含义：策略改进改变数据分布，数据分布反过来触发技能库演进。

##### 算法伪代码

```text
Input: base LLM policy, environments, teacher model, initial trajectories.

1. Collect successful and failed trajectories with the base policy.
2. Distill trajectories into a hierarchical SkillBank:
      successful trajectories -> reusable procedural skills
      failed trajectories -> failure lessons and corrected skills
3. Train a cold-start policy with SFT to use retrieved skills.
4. Repeat for RL iterations:
      retrieve top-K skills for each environment state/task
      sample G rollouts with the current policy
      compute task rewards and GRPO advantages
      update policy with clipped GRPO objective
      run validation episodes
      analyze failures with teacher model
      add, revise, or merge skills in SkillBank

Output: skill-augmented agent and evolved SkillBank
```

##### 与具身 HRL 的联系

虽然 SkillRL 面向 LLM agents，而不是传统机器人连续控制，它与 HIRO 等 HRL 方法共享一个思想：高层结构减少长程探索难度。HIRO 的高层动作是状态目标，SkillRL 的高层结构是语言技能检索。二者都把长 episode 拆成可复用的局部能力，只是技能载体不同。

公开资料显示该论文为 2026 年 arXiv 工作，解读依据 arXiv 摘要、HTML 论文图与公开方法描述。若正式会议版本调整实验数字或算法细节，应以后续版本为准。

#### 🧪 练习题
```yaml
- question: "SkillRL 的 SkillBank 主要存储什么？"
  options:
    A: "可检索、可复用的语言技能和失败经验"
    B: "MuJoCo 关节角速度"
    C: "随机初始化权重"
    D: "只包含最终奖励的标量表"
  answer: A
  explain: "SkillBank 把成功轨迹和失败分析蒸馏成可供 agent 检索使用的技能。"
- question: "SkillRL 中递归演进指的是什么？"
  options:
    A: "每轮训练后根据失败案例更新技能库，再用新技能继续训练策略"
    B: "只增加神经网络层数"
    C: "把所有旧数据删除"
    D: "固定技能库不再变化"
  answer: A
  explain: "策略训练与技能库更新形成闭环，失败案例会触发新技能或技能修订。"
```

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
MetaWorld-HRL 用 VLM 语义解析、专家技能迁移和 latent world model 控制组成三层架构，把高层指令分解为可组合技能并在物理层执行。

#### 🎯 核心要点
- **目标问题**：复杂具身任务需要从语言或视觉指令中识别意图，再组合已有技能完成长程物理控制。
- **三层架构**：语义层用 VLM 解析任务；技能迁移层选择和融合专家策略；物理层在世界模型中做低层控制。
- **专家融合**：VLM 根据任务和环境给出专家权重，动态专家选择模块再根据当前状态调整每个专家的贡献。
- **世界模型**：低层采用 latent dynamics model，把高维观测压缩成可规划状态，并结合专家先验改进动作搜索或策略优化。
- **公开限制**：该论文是 2026 年 arXiv/Workshop 工作；以下解读基于公开 arXiv 摘要、HTML 正文、方法图与实验表述。

#### 🔬 深入细节
##### 框架示意

![MetaWorld-HRL framework](https://ar5iv.labs.arxiv.org/html/2601.17507/assets/framework.jpg)

图中可以看到三层：semantic layer 负责把观察和指令转成技能序列，skill transfer layer 利用专家策略先验，physical layer 通过 latent dynamics model 执行控制。这里的 MetaWorld-HRL 是该论文中的层次世界模型方法，不等同于早期的 Meta-World 多任务基准本身。

##### 语义到物理的分解

论文将策略分解为高层语义决策和低层物理控制：

$$
\pi(a_t|s_t,T)=\pi_{\text{phys}}(a_t|s_t,\pi_{\text{sem}}(T)),
$$

其中 $T$ 是高层任务指令，$\pi_{\text{sem}}$ 产生技能组合或专家先验，$\pi_{\text{phys}}$ 在当前状态下执行具体动作。这种分解的好处是：语言理解和接触动力学不必由同一个端到端策略同时学习。

##### VLM 专家权重

给定任务 $T$ 和环境观测 $E$，VLM 输出专家相关性评分：

$$
w=f_{\text{VLM}}(T,E).
$$

论文用 softmax 归一化得到专家权重：

$$
w_i=\frac{\exp(\text{score}_i)}
{\sum_j \exp(\text{score}_j)}.
$$

高层技能先验可写为专家策略的加权组合：

$$
\pi_{\text{sem}}(T)=\sum_i w_i \pi_{\text{exp}}^i.
$$

这个模块让模型能够从“开门”“移动”“保持平衡”等已有专家中组合出新任务策略。

##### 状态感知动态选择

静态 VLM 权重只反映任务整体相似性，但同一任务不同阶段可能需要不同专家。MetaWorld-HRL 因此引入状态感知选择：

$$
p(i|s_t)=
\frac{\exp(\phi(s_t)^\top \psi(\pi_{\text{exp}}^i))}
{\sum_{j=1}^{K}\exp(\phi(s_t)^\top \psi(\pi_{\text{exp}}^j))}.
$$

$\phi(s_t)$ 是状态表示，$\psi(\pi_{\text{exp}}^i)$ 是专家嵌入。这样系统可以在接近门把手时更依赖 reach/grasp 专家，在推动阶段更依赖 door/open 专家。

##### 层次化世界模型控制

物理层借助 latent dynamics model 预测未来：

$$
z_{t+1}=f_\theta(z_t,a_t), \quad
\hat r_t = r_\theta(z_t,a_t).
$$

专家策略不是直接替代控制器，而是作为 motion prior 或 guidance 融入模型预测控制。低层在 latent space 中搜索动作时，会同时考虑任务回报、动力学一致性和专家先验，从而减少从零探索复杂运动的成本。

##### 实验信号

公开论文描述了 Humanoid-Bench 等任务上的结果，尤其强调 walk、stand、run、reach、door 等技能迁移与组合。消融实验显示，去掉 VLM 语义层、专家 guidance 或动态专家选择都会明显降低性能，说明三层结构不是简单堆模块，而是在任务解析、技能选择和物理执行上各自承担角色。

##### 算法伪代码

```text
Input: task instruction T, visual observation E, expert policy library,
latent world model, physical controller.

1. Semantic layer:
      use VLM to parse T and E
      produce skill sequence or expert relevance scores
2. Skill transfer layer:
      normalize expert weights with softmax
      compute state-aware expert probabilities p(i | s_t)
      fuse selected expert priors into a motion prior
3. Physical layer:
      encode observation into latent state z_t
      roll out candidate actions with latent dynamics model
      score candidates by task reward and expert guidance
      execute the first action
4. Repeat until task completion or horizon limit.

Output: composed hierarchical policy for the instruction
```

##### 适用与局限

MetaWorld-HRL 适合已经有专家库、并且新任务可由已有技能组合完成的场景。它不适合完全没有可迁移专家的冷启动问题；VLM 解析错误也会把后续控制引向错误技能。另外，世界模型在接触丰富的机器人任务中可能积累预测误差，因此需要动态重规划和真实反馈闭环。

#### 🧪 练习题
```yaml
- question: "MetaWorld-HRL 的三层架构不包括哪一项？"
  options:
    A: "语义层"
    B: "技能迁移层"
    C: "物理控制层"
    D: "固定随机动作层"
  answer: D
  explain: "论文框架由语义解析、技能迁移和物理控制组成，没有固定随机动作层。"
- question: "VLM 在 MetaWorld-HRL 中的主要作用是什么？"
  options:
    A: "根据任务和环境解析高层意图并给出专家/技能权重"
    B: "直接输出每个关节的力矩"
    C: "替代世界模型预测动力学"
    D: "删除所有专家策略"
  answer: A
  explain: "VLM 负责语义层，把高层指令映射到可组合技能或专家先验。"
```

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
ICM 用特征空间中的前向动力学预测误差作为内在奖励，并用逆动力学学习只关注可由智能体动作影响的状态表示，从而驱动稀疏奖励环境中的探索。

#### 🎯 核心要点
- **核心问题**：外部奖励稀疏时，智能体缺少探索方向；直接预测像素误差又容易被不可控噪声吸引。
- **表示学习**：ICM 通过逆动力学任务学习特征 $\phi(s)$，让表示保留与动作控制相关的信息，忽略无关背景变化。
- **好奇心奖励**：在该特征空间中预测下一状态，预测误差越大，说明转移越新颖或模型越不熟悉，内在奖励越高。
- **联合训练**：策略最大化外部奖励与内在奖励之和；ICM 自身同时优化 inverse model 与 forward model。
- **影响**：ICM 是后续探索奖励、prediction-error curiosity 和 embodied exploration 方法的重要基础。

#### 🔬 深入细节
##### 模块示意

![Intrinsic Curiosity Module](https://ar5iv.labs.arxiv.org/html/1705.05363/assets/x1.png)

图中，agent 执行动作后收到外部奖励，同时 ICM 根据状态转移产生 curiosity reward。ICM 内部包含特征编码器、逆模型和前向模型。

##### 为什么不用原始像素误差

如果直接预测下一帧像素，智能体可能被电视噪声、背景闪烁或随机物体吸引，因为这些信号难以预测但与控制无关。ICM 的解决方案是学习一个只强调可控因素的特征空间：

$$
\phi_t=\phi(s_t), \quad \phi_{t+1}=\phi(s_{t+1}).
$$

这个特征不是通过重建图像学习，而是通过逆动力学学习。只有那些有助于从 $(s_t,s_{t+1})$ 推断动作 $a_t$ 的信息才会被保留。

##### 逆动力学模型

逆模型预测导致状态变化的动作：

$$
\hat a_t = g_\psi(\phi(s_t),\phi(s_{t+1})).
$$

离散动作时，损失通常是交叉熵：

$$
\mathcal{L}_I
= -\log p_\psi(a_t|\phi(s_t),\phi(s_{t+1})).
$$

如果某个环境变化与 agent 动作无关，它无法帮助预测 $a_t$，因此不会被编码器重点保留。这是 ICM 抵抗不可控噪声的关键。

##### 前向模型与内在奖励

前向模型根据当前特征和动作预测下一特征：

$$
\hat \phi(s_{t+1}) = f_\eta(\phi(s_t),a_t).
$$

前向损失为

$$
\mathcal{L}_F =
\frac{1}{2}\|\hat \phi(s_{t+1})-\phi(s_{t+1})\|_2^2.
$$

ICM 将同一个误差作为内在奖励：

$$
r_t^i =
\frac{\eta_r}{2}
\|\hat \phi(s_{t+1})-\phi(s_{t+1})\|_2^2.
$$

策略优化时使用总奖励

$$
r_t = r_t^e + r_t^i,
$$

其中 $r_t^e$ 是环境外部奖励。未被模型掌握的新转移会产生较大 $r_t^i$，推动 agent 去探索。

##### 联合目标

ICM 模块本身的训练目标是

$$
\min_{\phi,\psi,\eta}
(1-\beta)\mathcal{L}_I+\beta\mathcal{L}_F.
$$

策略部分则可使用 A3C 或其他 RL 算法最大化累计总奖励。论文原始实验使用 A3C，并在 VizDoom 和 Super Mario Bros 等稀疏奖励场景中验证：即使没有外部奖励，ICM 也能推动 agent 学会移动、探索地图和发现新区域。

##### 与后续方法的关系

ICM 的好奇心来自“模型还预测不好”的区域，因此它可能在随机性强、不可学习的区域过度停留。后续方法如 RND、episodic curiosity、information gain 等从不同角度处理这个问题。尽管如此，ICM 提出的“在可控特征空间中计算 prediction error”仍是探索奖励设计的经典模板。

##### 算法伪代码

```text
Initialize policy pi, value function V, encoder phi,
inverse model g, and forward model f.

for each rollout:
    observe state s_t
    sample action a_t ~ pi(. | s_t)
    execute action and observe extrinsic reward r_e and next state s_{t+1}

    encode features phi_t = phi(s_t), phi_next = phi(s_{t+1})
    inverse model predicts a_t from (phi_t, phi_next)
    forward model predicts phi_next from (phi_t, a_t)

    compute forward error:
        r_i = eta_r / 2 * ||f(phi_t, a_t) - phi_next||^2
    train ICM with inverse loss and forward loss
    train policy with reward r_e + r_i

Output: exploration policy driven by intrinsic curiosity
```

##### 适用边界

ICM 适合稀疏奖励、状态变化主要受 agent 控制、且探索新转移有助于任务完成的环境。如果环境存在大量 agent 无法影响但可预测困难的随机因素，ICM 仍可能受到干扰。实际具身系统常会把 ICM 与状态过滤、episodic novelty 或任务约束结合，避免追逐无意义的新奇性。

#### 🧪 练习题
```yaml
- question: "ICM 的内在奖励来自哪里？"
  options:
    A: "特征空间中前向模型预测下一状态的误差"
    B: "人工设定的每步固定奖励"
    C: "判别器对技能编号的分类准确率"
    D: "高层 option 的终止概率"
  answer: A
  explain: "ICM 把 forward model 在可控特征空间中的预测误差作为 curiosity reward。"
- question: "ICM 为什么使用逆动力学来学习特征？"
  options:
    A: "为了保留与 agent 动作相关的可控因素，弱化无关噪声"
    B: "为了预测任务语言描述"
    C: "为了删除前向模型"
    D: "为了保证所有状态奖励相同"
  answer: A
  explain: "逆动力学要求从状态转移推断动作，因此鼓励编码器关注可由动作影响的变化。"
```

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
RND 提出用一个固定随机目标网络和一个可训练预测网络之间的预测误差作为内在奖励，解决稀疏奖励环境中“状态是否新颖”难以稳定估计的问题。它把探索信号从复杂的动力学预测改成简单的特征蒸馏误差，因此在 Montezuma's Revenge 等硬探索 Atari 任务上显著提升样本效率。

#### 🎯 核心要点
- **双网络新颖性估计**：固定随机目标网络 \(f\) 产生观测特征，可训练预测网络 \(\hat f_\theta\) 学习预测该特征
- **内在奖励**：使用 \(\|\hat f_\theta(o_t)-f(o_t)\|_2^2\) 衡量预测误差，误差越大说明状态越少见
- **与 PPO 结合**：论文主要把 RND 奖励加入 PPO 训练流程，策略同时最大化外在奖励和内在奖励
- **奖励归一化**：对观测、内在奖励和外在奖励做运行统计归一化，减少尺度漂移
- **双 Value 头**：分别估计外在回报和内在回报，因为两类奖励的折扣因子和动态范围不同
- **抗“噪声电视”问题**：目标网络固定且随机，预测误差只随访问频率下降，不直接追逐环境随机性
- **硬探索验证**：重点实验在 Montezuma's Revenge、Gravitar、Pitfall 等 Atari 稀疏奖励任务上展开

#### 🔬 深入细节
##### 整体机制示意图

![RND 随机网络蒸馏机制](https://ar5iv.labs.arxiv.org/html/1810.12894/assets/x1.png)

*图：RND 使用固定随机目标网络提供不可学习的特征目标，预测网络只在访问过的状态上逐渐降低误差，剩余误差被解释为探索奖励。*

##### 算法伪代码

```python
# Random Network Distillation + PPO 伪代码
initialize fixed random target network f
initialize predictor network f_hat_theta
initialize policy pi_phi and two value heads V_ext, V_int
initialize replay/statistics for observation and reward normalization

for iteration in range(num_updates):
    trajectories = []
    for t in range(rollout_length):
        o_t = normalize_obs(env.obs)
        a_t = pi_phi.sample(o_t)
        o_next, r_ext, done = env.step(a_t)

        # RND intrinsic reward
        target = stop_gradient(f(normalize_obs(o_next)))
        pred = f_hat_theta(normalize_obs(o_next))
        r_int = mean_squared_error(pred, target)

        trajectories.append(o_t, a_t, r_ext, r_int, done)

    # 分别估计外在与内在优势，再合成为 PPO 优化信号
    adv_ext = GAE(trajectories.r_ext, V_ext, gamma_ext)
    adv_int = GAE(normalize(trajectories.r_int), V_int, gamma_int)
    adv = adv_ext + beta * adv_int

    update pi_phi with PPO clipped objective using adv
    update V_ext and V_int with value regression losses
    update f_hat_theta to minimize ||f_hat_theta(o) - f(o)||^2
```

##### 动机与背景

硬探索任务的困难不在于局部控制，而在于智能体很长时间都收不到外在奖励。例如 Montezuma's Revenge 中，随机策略很难偶然完成“取钥匙、避开敌人、打开门”等长序列动作。传统基于计数的探索在高维图像观测上难以定义“同一个状态”，而基于动力学预测的 curiosity 方法又容易被不可控噪声吸引。

RND 的关键简化是把新颖性估计转化为一个监督学习问题。目标网络 \(f\) 在初始化后冻结，预测网络 \(\hat f_\theta\) 只在智能体实际访问过的观测上训练。因此，某个观测被访问越多，预测网络越会记住它，误差越低；新观测还没有被训练覆盖，误差自然更高。

核心内在奖励写作：

$$r_t^{\text{int}} = \left\|\hat f_\theta(o_t) - f(o_t)\right\|_2^2$$

这里的 \(f(o_t)\) 不是语义标签，而是随机投影后的特征。随机目标看似粗糙，但它有两个好处：一是固定不变，避免目标随训练漂移；二是足够高维时能把不同观测映射到可区分特征，让预测误差成为访问频率的近似代理。

##### 训练流程与奖励组合

RND 不是替代 RL 算法，而是提供额外奖励。论文中策略优化仍使用 PPO，轨迹采样后同时得到环境奖励 \(r_t^{\text{ext}}\) 与内在奖励 \(r_t^{\text{int}}\)，总优化信号通常写成：

$$r_t = r_t^{\text{ext}} + \beta r_t^{\text{int}}$$

由于外在奖励可能极稀疏、内在奖励会随着学习不断衰减，RND 使用运行均值和方差做归一化，并为两类奖励维护不同的 value function。外在 value 关注任务目标，内在 value 关注未来探索收益；把二者混到同一个 critic 中会让尺度和折扣选择互相干扰。

RND 与 ICM 的区别在于新颖性来源。ICM 预测动作导致的下一个特征状态，容易把环境中不可预测但与控制无关的噪声当成奖励；RND 预测的是固定随机函数输出，误差下降只依赖训练覆盖，而不是环境动力学是否随机。因此 RND 在随机背景、随机敌人等场景中更不容易被“预测不了的噪声”劫持。

> 💡 关键：RND 的探索奖励不是“这个状态是否重要”，而是“这个状态我是否还不会预测”。重要性仍由外在任务奖励最终筛选，RND 只负责把智能体推向未访问区域。

##### 与传统方法的区别

| 方法 | 新颖性信号 | 主要风险 | RND 的改进 |
|------|------------|----------|------------|
| 计数探索 | 离散状态访问次数 | 图像状态难以计数 | 用神经预测误差近似访问频率 |
| 动力学 curiosity | 下一状态预测误差 | 被不可控随机性吸引 | 固定随机目标不建模环境噪声 |
| 手工奖励塑形 | 人工中间奖励 | 任务依赖强且可能改写目标 | 通用内在奖励，少量额外网络即可接入 |

#### 🧪 练习题
```yaml
question: "RND 中内在奖励为什么会随状态访问次数增加而下降？"
options:
  - "因为 PPO 会自动降低所有奖励的尺度"
  - "因为预测网络在访问过的观测上逐渐拟合固定随机目标网络的输出"
  - "因为目标网络会把常见状态映射为更小的特征向量"
  - "因为外在奖励会抵消内在奖励"
answer: 1
explain: "目标网络固定不变，预测网络只在访问到的观测上训练；访问越频繁，预测误差越小，因此内在奖励随熟悉度下降。"
```

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
LaGEA 提出把 VLM 对失败轨迹的结构化语言反思转成时间局部化的 dense reward shaping，解决机器人操作中稀疏奖励无法指出“何时、为何失败”的问题。它通过关键帧、图文反馈对齐、delta potential 和自适应塑形权重，让语言反馈在早期探索中强介入、在策略变好后逐渐退出。

#### 🎯 核心要点
- **结构化 VLM 反思**：每个 rollout 后由 Qwen-2.5-VL-3B 生成 schema-constrained JSON 反馈，避免自由文本漂移
- **关键帧时间接地**：从目标相似度轨迹中选取接近目标、变化快或转折明显的帧，把反馈权重扩散到局部时间窗口
- **反馈-视觉对齐**：用图像、目标、指令和反馈投影器把状态图像与语言反馈嵌入到共享空间
- **Goal-delta reward**：根据当前状态与目标图像/指令的 potential 变化奖励真实进展
- **Feedback-delta reward**：根据状态与 VLM 诊断反馈的一致性变化奖励纠错方向
- **自适应塑形系数**：只在失败轨迹上强化塑形，并随成功率 EMA 和进展信号提升而衰减
- **在线 RL 接入**：最终奖励输入 SAC critic，保留环境 sparse reward，同时添加 bounded VLM shaping
- **资料限制**：清单中的 `paper_url` 指向 arXiv:2602.03001，但该链接实际是非 LaGEA 的 batch-size/GNS 论文；本文正文基于公开 LaGEA 论文 arXiv:2509.23155 与其 arXiv HTML 页面，YAML 元信息按清单原样保留

#### 🔬 深入细节
##### 整体架构示意图

![LaGEA 框架总览](https://arxiv.org/html/2509.23155v2/x1.png)

*图：LaGEA 在每次 rollout 后抽取关键帧并查询 VLM，随后把结构化反馈与视觉状态对齐，最终把目标进展和反馈一致性转成 step-wise shaping reward。*

##### 算法伪代码

```python
# LaGEA 训练循环伪代码
initialize SAC policy, critic, replay buffer
initialize visual encoder, text encoder, feedback/image projectors

for episode in range(num_episodes):
    traj = rollout(policy, env)
    keyframes, weights = select_keyframes(traj.obs, goal_image)

    feedback_json = VLM_reflect(
        task_instruction=instruction,
        frames=keyframes,
        error_taxonomy=taxonomy,
        recent_history=history,
    )
    f = encode_feedback(feedback_json)

    for transition (s_t, a_t, r_env, s_next) in traj:
        phi_goal_t = goal_potential(s_t, goal_image, instruction)
        phi_goal_next = goal_potential(s_next, goal_image, instruction)
        r_goal = gamma * phi_goal_next - phi_goal_t

        phi_fb_t = feedback_potential(s_t, f)
        phi_fb_next = feedback_potential(s_next, f)
        r_feedback = weight_t * (gamma * phi_fb_next - phi_fb_t)

        confidence = instruction_feedback_agreement(instruction, f)
        r_vlm = mix(confidence, r_goal, r_feedback)
        alpha = failure_aware_schedule(success_ema, progress)
        r_total = r_env + alpha * r_vlm
        replay.add(s_t, a_t, r_total, s_next)

    update projectors with calibration + contrastive losses
    update SAC actor and critic from replay
```

##### 动机与背景

VLM 可以判断图像是否接近语言目标，但直接把 VLM 分数作为 reward 往往不稳定：同一失败可能被不同视角解释成不同原因，单帧评分也无法告诉 RL 哪一步造成了失败。机器人操作任务又常是长程、稀疏奖励，只有 episode 末端的成功/失败信号会导致大量无效探索。

LaGEA 的设计目标是把“自然语言反思”变成 RL 可用的局部学习信号。它不让 VLM 直接控制动作，而是在每个 episode 后生成可审计的结构化反馈，例如失败阶段、约束违反、可恢复建议等；再用关键帧选择把这段反馈绑定到轨迹中真正关键的时间片。

关键帧选择以目标相似度轨迹为基础。设图像嵌入为 \(e_t\)，目标嵌入为 \(g\)，则可以得到接近度 \(c_t=\cos(e_t,g)\)，并结合一阶变化和局部转折得到 saliency \(u_t\)。选出的关键帧再通过三角核扩散成逐步权重 \(w_t\)，避免把同一段反馈平均撒到所有 transition 上。

##### Delta Potential 奖励

LaGEA 的奖励塑形借鉴 potential-based shaping：不直接奖励某个状态的高分，而奖励 potential 的变化：

$$r_t^{\Delta\Phi}=\gamma \Phi(s_{t+1})-\Phi(s_t)$$

这能缓解“站在看起来接近目标的位置反复刷分”的问题。Goal potential 由当前状态与目标图像、任务指令的相似度组成；Feedback potential 则衡量当前状态与 VLM 反馈 embedding 的一致性，并由关键帧权重 \(w_t\) 控制强度。

两个 delta 奖励通过置信度混合：

$$r_t^{\text{vlm}}=\lambda_t r_t^{\text{goal}} + (1-\lambda_t) r_t^{\text{feedback}}$$

其中 \(\lambda_t\) 可由指令和反馈的一致性估计得到。若 VLM 反馈与任务指令高度一致，反馈项权重大；若反馈不可靠，系统更多依赖目标图像/指令的进展信号。

##### 动态塑形与 SAC 训练

LaGEA 的最终奖励为：

$$r_t = r_t^{\text{env}} + \alpha_t r_t^{\text{vlm}}$$

\(\alpha_t\) 不是常数，而是 failure-aware schedule：失败时塑形较强，成功率 EMA 上升后逐步减弱。这样做的直觉是，语言反馈适合帮助早期探索和失败恢复，但当策略已经学会任务后，继续过度依赖 VLM 可能造成 reward hacking 或偏离真实环境目标。

与 RND 这类通用新颖性奖励相比，LaGEA 的内在信号更“任务语义化”：RND 奖励没见过的状态，LaGEA 奖励“按反馈看起来在纠错的状态变化”。因此它更适合目标明确但中间奖励稀缺的机器人操作任务；代价是需要 VLM、视觉语言嵌入与反馈模板，系统复杂度高于纯预测误差方法。

> 💡 关键：LaGEA 的核心不是“让 VLM 打分”，而是把 VLM 反思先结构化、再时间接地、最后只以 potential difference 的形式进入 RL 奖励。

#### 🧪 练习题
```yaml
question: "LaGEA 为什么使用 delta potential 而不是直接把状态-目标相似度作为奖励？"
options:
  - "为了让 VLM 可以直接输出动作"
  - "为了奖励朝目标或反馈方向的进展，避免静态高相似状态被反复奖励"
  - "为了完全替代环境 sparse reward"
  - "为了减少视觉编码器的参数量"
answer: 1
explain: "Delta potential 使用 γΦ(s_{t+1})-Φ(s_t) 奖励变化方向，强调进展而不是静态分数，更不容易让策略停在高相似但无进展的位置刷奖励。"
```

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
MRBT 提出用行为树同时组织奖励塑形和动作掩码，解决组合任务中 LLM 生成奖励缺乏反应性、模块性和形式化验证的问题。它让 LLM 填充 MRBT 模板，再用 SMT 求解器验证子任务逻辑，最后把可验证的 symbolic reward/mask 接入神经 RL 训练。

#### 🎯 核心要点
- **Masking Reward Behavior Tree**：行为树叶节点是带 action mask 的 masking behavior reward machine，tick 后输出奖励和动作掩码
- **组合任务模板**：面向顺序 object-interaction subtasks，模板包含子任务完成条件、接近目标对象条件和对应动作 mask
- **反应性回退**：BT 的 Sequence/Fallback 结构允许前置子任务失效后回到对应子树，而不是继续奖励后续子任务
- **动作掩码与奖励联合设计**：同一符号结构既限制无效动作，又输出 shaping reward，减少奖励和动作约束互相矛盾
- **SMT 形式化验证**：把 completion correctness、non-triviality、proximity correctness、composition persistence 等规格交给 Z3 检查
- **LLM 自动生成闭环**：LLM 依据模板和任务空间生成 MRBT；若 SMT 不满足规格，则把错误反馈重新提示 LLM 修正
- **Neurosymbolic RL**：训练时神经策略负责感知与控制，MRBT 负责基于符号标签提供 reward/mask 指导
- **资料限制**：清单中的 `paper_url` 指向 arXiv:2602.04567，但该链接实际是短视频推荐数据集论文；本文正文基于公开 MRBT 论文 arXiv:2605.05795，YAML 元信息按清单原样保留

#### 🔬 深入细节
##### MRBT 模板示意图

![MRBT 行为树模板](https://arxiv.org/html/2605.05795v2/x2.png)

*图：MRBT 把多个子任务组织成行为树模板，每个叶节点维护简单 reward-machine 状态、奖励函数和动作掩码，内部节点负责反应式执行顺序。*

##### 算法伪代码

```python
# LLM + SMT + MRBT 的自动奖励/掩码生成流程
input: task_space, environment_predicates, MRBT_template

while True:
    mrbt_spec = LLM_generate(
        template=MRBT_template,
        task_space=task_space,
        predicates=environment_predicates,
    )

    logic_formulas = extract_logic(mrbt_spec)
    smt_result = Z3_verify(
        formulas=logic_formulas,
        specs=[
            "completion correctness",
            "completion non-triviality",
            "object proximity correctness",
            "object proximity non-triviality",
            "composition persistence",
        ],
        transition_model=symbolic_env_model,
    )

    if smt_result.sat:
        break
    else:
        MRBT_template = add_counterexample_feedback(MRBT_template, smt_result)

for episode in training:
    task = sample(task_space)
    state = env.reset(task)
    mrbt_state = mrbt.initial_state()

    while not done:
        labels = labeling_function(state, task)
        ticked_leaves = mrbt.tick(labels, mrbt_state)
        reward = sum(leaf.reward for leaf in ticked_leaves)
        action_mask = ticked_leaves[-1].action_mask
        action = policy.sample(obs, mask=action_mask)
        next_state, env_reward, done = env.step(action)
        update_policy(obs, action, env_reward + reward, next_state)
```

##### 动机与背景

许多具身任务本质上是组合任务：先找到某个物体，再操作门，再到达目标区域。直接用 LLM 生成一段奖励代码可以降低人工设计成本，但如果没有反应性，当前置子任务失效时奖励逻辑可能仍然鼓励后续动作；如果没有模块性，换一个物体颜色或房间布局就要重写；如果没有验证，生成代码看似合理却可能在边界状态下给出错误奖励。

行为树适合解决反应性和模块性。BT 每一步从根节点 tick，Sequence 保证顺序，Fallback 支持条件失败后的回退。MRBT 在 BT 叶节点中嵌入 masking behavior reward machine：每个叶节点不仅返回 Success/Running/Failure，还维护状态转移、奖励函数和可用动作集合。

论文把一个 MRBT 形式化为共享逻辑公式集合 \(\mathcal{F}\) 和动作空间 \(\mathcal{A}\) 上的一组叶节点。给定当前标签 \(l_t\)，BT tick 得到叶序列 \(\mathcal{B}_t\)，只更新被 tick 的叶节点：

$$x_{t+1}^b =
\begin{cases}
\delta^b(x_t^b,l_t), & b \in \mathcal{B}_t \\
x_t^b, & b \notin \mathcal{B}_t
\end{cases}$$

奖励和动作掩码由被 tick 的叶节点给出：

$$r_t = \sum_{b \in \mathcal{B}_t} r^b(x_t^b,l_t), \qquad m_t = m^{b_{\text{last}}}(x_t^{b_{\text{last}}},l_t)$$

##### LLM 生成与 SMT 验证

MRBT 的自动化流程并不盲信 LLM。LLM 接收任务空间、环境谓词和 MRBT 模板，生成完成条件、接近条件、奖励函数和动作掩码。随后系统把这些公式放入 Z3，在符号环境转移模型约束下检查若干规格：完成条件必须真的对应子任务完成，接近条件不能平凡为真/假，组合后不能因前序子任务回退而仍保持错误的后续奖励。

这种验证方式比只用专家演示测试更强。演示只能覆盖有限轨迹，SMT 可以主动寻找反例；若发现 unsat 或违反规格，系统把反例作为反馈重新提示 LLM 修正。最终得到的 MRBT 再用于 RL 训练，神经策略仍学习感知到动作的映射，但 symbolic MRBT 提供更密集、更可信的训练信号。

与 LaGEA 的 VLM 时间接地奖励相比，MRBT 更强调离散逻辑正确性。LaGEA 适合视觉连续控制中的失败诊断，MRBT 适合能抽取谓词和任务结构的组合任务。它的主要限制也来自这里：需要环境能提供或学习出稳定谓词，并且 MRBT 模板当前主要覆盖顺序 object-interaction 子任务。

> 💡 关键：MRBT 的价值不只是“LLM 写奖励”，而是让 LLM 的奖励/掩码设计落在行为树模板内，并接受 SMT 反例驱动的形式化检查。

#### 🧪 练习题
```yaml
question: "MRBT 相比普通 LLM 生成奖励函数的核心优势是什么？"
options:
  - "完全不需要环境状态谓词"
  - "把奖励塑形和动作掩码放入可反应、可模块化、可 SMT 验证的行为树结构中"
  - "只使用端到端神经网络，不包含符号逻辑"
  - "通过增加随机探索奖励替代任务奖励"
answer: 1
explain: "MRBT 用行为树管理子任务顺序和回退，用叶节点同时输出奖励与动作掩码，并通过 SMT 检查逻辑规格，减少 LLM 生成奖励的隐藏错误。"
```

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
VSIMR 将 VAE 的状态新颖性奖励与 LLM 基于任务描述生成的语义引导奖励结合起来，解决极端稀疏奖励环境中单一好奇心信号方向性不足的问题。它在 A2C 训练中把环境奖励、VAE KL 内在奖励和 LLM 评分奖励相加，使探索既覆盖新状态，也更偏向任务相关状态。

#### 🎯 核心要点
- **VAE 新颖性奖励**：用 VAE 编码状态并以 KL divergence 衡量状态对潜变量分布的“惊讶度”
- **LLM 语义奖励**：把 MiniGrid 状态和任务 mission 格式化成 prompt，请 LLaMA 3.2 评估新状态对目标的帮助程度
- **三路奖励融合**：A2C 接收 \(r^{env}+\beta r^{VAE}+\alpha r^{LLM}\) 作为训练回报
- **Prompt 缓存**：维护 prompt-answer 数据集，避免对重复状态反复调用 LLM
- **周期性 VAE 训练**：收集最近状态后每 \(N\) 步训练 VAE，使新颖性估计随访问覆盖更新
- **A2C 主干**：Actor-Critic 仍负责策略学习，VSIMR/LLM 只改变奖励信号
- **实验环境**：MiniGrid DoorKey-8x8-v0，论文把最大步数从默认 640 增加 40% 到 896 以观察稀疏奖励学习
- **结果观察**：聚合结果中 LLM+VAE 比单独 VAE 更快、更稳定，但不同随机运行仍有明显方差

#### 🔬 深入细节
##### 方法流程示意图

![VSIMR + LLM 内在动机流程](https://arxiv.org/html/2508.18420v1/RL_VAE_AGENTpng.png)

*图：智能体执行动作得到新状态后，VAE 计算状态新颖性奖励，LLM 根据状态文本和任务目标给出语义进展奖励，二者与环境奖励融合后训练 A2C。*

##### 算法伪代码

```python
# A2C with VSIMR and LLM intrinsic reward
initialize actor_critic
initialize VAE encoder/decoder
initialize D_vae = []          # states for VAE training
initialize D_prompt = {}       # prompt cache

for episode in range(num_episodes):
    s = env.reset()
    for t in range(T):
        a = actor_critic.policy.sample(s)
        s_next, r_env, done = env.step(a)

        # VSIMR: variational state novelty
        mu, logvar = VAE.encode(s_next)
        r_vae = KL(q(z | s_next) || p(z))
        D_vae.append(s_next)

        # LLM reward: task-aware semantic guidance
        prompt = build_prompt(mission=env.mission, state=s_next)
        if prompt not in D_prompt:
            D_prompt[prompt] = LLM_score(prompt, scale="0-10")
        r_llm = normalize(D_prompt[prompt])

        r_total = r_env + beta * r_vae + alpha * r_llm
        actor_critic.store(s, a, r_total, s_next, done)

        if t % N == 0:
            actor_critic.update()
            VAE.train(D_vae)
            D_vae.clear()

        s = s_next
        if done:
            break
```

##### 动机与背景

在 DoorKey 这类 MiniGrid 任务里，智能体必须找到钥匙、开门并到达目标，但大多数中间步骤没有外在奖励。仅靠环境奖励训练 A2C，早期几乎没有可学习信号。RND 等预测误差方法能鼓励访问新状态，但它们不理解“钥匙”“门”“目标”之间的任务语义，可能把探索预算花在新颖但无关的区域。

VSIMR 的变分状态奖励来自 VAE。VAE 将状态 \(s\) 编码为潜变量分布 \(q_\phi(z|s)\)，并通过重构损失和 KL 项学习状态结构。对当前状态的内在奖励可以取：

$$r_t^{VAE} = D_{KL}\big(q_\phi(z|s_t)\,\|\,p(z)\big)$$

直觉上，如果一个状态在当前 VAE 表征中不常见或信息量大，它的后验会偏离先验更多，KL 项更高，因此应鼓励智能体访问。这与 RND 的“预测误差高说明不熟悉”相似，但 VSIMR 使用概率潜变量而不是固定随机网络特征。

##### LLM 奖励与融合

论文进一步加入 LLM 奖励。系统把环境 mission、当前可见对象和状态描述写入 prompt，要求 LLM 在 0 到 10 的尺度上判断“这个新状态是否帮助智能体完成最终目标”。这样得到的 \(r_t^{LLM}\) 为探索提供任务方向：看见钥匙、接近门、拿到关键物体等状态可获得比无关移动更高的语义分数。

总奖励写成：

$$r_t = r_t^{env} + \beta r_t^{VAE} + \alpha r_t^{LLM}$$

\(\beta\) 控制新颖性探索强度，\(\alpha\) 控制语言引导强度。若 \(\alpha\) 太大，LLM 的粗糙评分可能覆盖真实任务奖励；若 \(\beta\) 太大，智能体可能持续追逐新状态而不收敛。因此 VSIMR 的关键并不是“更多奖励项”，而是让状态新颖性和任务语义互补。

##### 训练流程与缓存机制

每一步环境交互后，A2C 保存带融合奖励的 transition。VAE 不是每步都立即更新，而是在累计一批状态后周期性训练，以降低噪声和计算开销。LLM 调用同样昂贵，因此实现中保存 prompt-answer 对：若同一个状态描述已经问过，就直接复用结果。

与 RND 相比，VSIMR 的优势是奖励更懂任务；与纯 LLM reward 相比，VAE 新颖性保留了自主探索能力。当 LLM 评分不够细或错误时，VAE 仍能推动智能体覆盖未知区域；当 VAE 只会鼓励无方向探索时，LLM 语义信号又能把探索拉回目标路径。

> ⚠️ 注意：论文实验显示 LLM+VAE 的聚合表现更好，但不同 run 的差异仍然大。这说明该方向有效，但 prompt、奖励权重和 VAE 更新频率仍是敏感超参数。

#### 🧪 练习题
```yaml
question: "VSIMR 中同时使用 VAE 奖励和 LLM 奖励的主要目的是什么？"
options:
  - "让 VAE 负责动作选择，LLM 负责价值函数估计"
  - "把状态新颖性探索与任务语义引导结合，缓解极端稀疏奖励"
  - "用 LLM 替代环境模拟器"
  - "避免训练 Actor-Critic 网络"
answer: 1
explain: "VAE 奖励鼓励访问新状态，LLM 奖励根据任务描述偏向有目标进展的状态，二者组合比单一探索信号更适合稀疏奖励任务。"
```

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
MBPO 提出只在学习到的动力学模型中生成短步长 rollout，并把这些模型样本与真实样本混合训练 SAC，解决模型式 RL 中“样本便宜但误差会随 rollout 长度累积”的核心权衡。它用模型 ensemble 和短 horizon 让模型生成数据足够有用，同时避免长程模型偏差破坏策略优化。

#### 🎯 核心要点
- **短模型 rollout**：从真实 replay buffer 的状态出发，只展开 \(k\) 步模型轨迹，通常 \(k\) 很小
- **模型 ensemble**：训练多个 probabilistic dynamics models，降低单模型过拟合并估计不确定性
- **Dyna 风格混合数据**：真实环境样本进入 \(\mathcal{D}_{env}\)，模型生成样本进入 \(\mathcal{D}_{model}\)，SAC 从混合 buffer 更新
- **理论分析**：论文分析模型误差、策略分布偏移和 rollout 长度对单调改进界的影响
- **模型使用调度**：训练早期使用更短 rollout，随模型变准逐渐增加 rollout horizon
- **低模型偏差优先**：MBPO 不追求完全用模型规划，而是让模型只负责补充局部 transition
- **基准验证**：在 MuJoCo 连续控制任务上以远少于无模型 SAC 的真实交互达到强性能

#### 🔬 深入细节
##### 模型 rollout 示意图

![MBPO 模型使用与 rollout 分析](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x1.png)

*图：MBPO 论文围绕“何时信任模型”分析 rollout 长度与模型误差的权衡，核心结论是短 rollout 能提供样本效率而不过度放大模型偏差。*

##### 算法伪代码

```python
# Model-Based Policy Optimization
initialize SAC policy pi, Q-functions
initialize environment replay buffer D_env
initialize model replay buffer D_model
initialize probabilistic dynamics ensemble {p_theta_i}

for epoch in range(num_epochs):
    # 真实环境交互
    for step in range(env_steps_per_epoch):
        a = pi.sample(s)
        s_next, r, done = env.step(a)
        D_env.add(s, a, r, s_next, done)
        s = reset_if_done(s_next, done)

    # 训练动力学模型 ensemble
    for model_update in range(model_train_steps):
        batch = D_env.sample()
        update each p_theta_i to maximize log p(s_next, r | s, a)

    # 从真实状态启动短模型 rollout
    for rollout in range(num_model_rollouts):
        s_model = D_env.sample_state()
        for h in range(k):  # k is short
            a_model = pi.sample(s_model)
            model = random_choice(ensemble)
            s_next_model, r_model = model.predict(s_model, a_model)
            D_model.add(s_model, a_model, r_model, s_next_model)
            s_model = s_next_model

    # 用真实 + 模型数据训练 SAC
    for grad_step in range(policy_updates):
        batch = mix_sample(D_env, D_model)
        update_SAC(pi, Q, batch)
```

##### 动机与背景

基于模型的强化学习有一个诱人的优势：一旦学到环境动力学，模型内部生成 transition 的成本远低于真实交互。但神经动力学模型不可避免有误差，长 rollout 会让误差逐步累积，最终把策略训练到真实环境中不存在或不可靠的状态上。

MBPO 的核心判断是：模型最可信的是局部一步或短步转移，而不是长程预测。因此它不让模型承担完整规划任务，而是从真实 replay buffer 中的状态出发，生成短 horizon 的合成样本。真实状态作为起点限制了分布偏移，短 horizon 限制了复合误差。

动力学模型通常预测状态差分和奖励：

$$p_\theta(s_{t+1}, r_t \mid s_t, a_t)$$

并使用负对数似然训练。采用 ensemble 后，每个模型 \(p_{\theta_i}\) 在 bootstrap 数据或不同初始化下学习，生成 rollout 时随机选择一个模型。这样既能提升鲁棒性，也能在实践中减少单个模型错误被策略利用的风险。

##### 偏差-方差权衡

MBPO 的理论分析可简化理解为：模型 rollout 越长，能生成的数据越多、策略更新越接近 on-policy，但模型偏差项会按 horizon 累积；rollout 越短，模型偏差小，但补充样本有限。短 rollout 是二者之间的实用平衡。

策略训练仍使用 SAC 的最大熵目标：

$$J(\pi)=\mathbb{E}\left[\sum_t r_t + \alpha \mathcal{H}(\pi(\cdot|s_t))\right]$$

不同的是，SAC 的 replay batch 现在可同时包含真实 transition 和模型 transition。模型样本扩大了数据量，使 Q 函数和策略能更频繁更新；真实样本持续校正模型和策略，防止偏差失控。

##### 与传统模型式方法的区别

早期 Dyna 方法同样混合真实与模型样本，但在高维连续控制中，模型误差和策略分布偏移会更严重。PETS 等方法强调模型预测控制（MPC），每一步在模型中规划动作；MBPO 则保持一个 amortized policy，用模型主要提升 off-policy actor-critic 的样本效率。

与纯无模型 SAC 相比，MBPO 增加了模型训练成本，但显著减少真实环境步数。与长 horizon 模型规划相比，它牺牲了一部分模型利用率，换来更稳的策略优化。这也是 MBPO 影响后续 Dreamer 系列的关键思想：世界模型很有用，但必须限制和管理模型误差进入策略学习的方式。

> 💡 关键：MBPO 的“模型”不是为了完全替代环境，而是为了在可信的短局部范围内制造额外训练样本。

#### 🧪 练习题
```yaml
question: "MBPO 为什么偏好从真实 replay buffer 状态启动短步长模型 rollout？"
options:
  - "因为短 rollout 可以完全消除模型误差"
  - "因为真实起点减少状态分布偏移，短 horizon 限制模型误差累积"
  - "因为 SAC 只能处理长度为 1 的轨迹"
  - "因为 ensemble 模型无法预测奖励"
answer: 1
explain: "模型误差会随 rollout 长度累积；从真实状态出发并限制 horizon，可以在获得合成样本效率的同时控制模型偏差。"
```

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
DreamerV1 提出在学习到的 RSSM 隐空间中“想象”长程轨迹，并通过价值梯度训练 actor-critic，解决像素控制中直接在图像空间规划成本高、误差大的问题。它把世界模型学习、隐空间 rollout 和策略优化分离成稳定的三阶段循环，在 DeepMind Control Suite 视觉任务上取得高样本效率。

#### 🎯 核心要点
- **RSSM 世界模型**：由确定性循环状态 \(h_t\) 和随机状态 \(z_t\) 组成，兼顾历史记忆与不确定性
- **像素到隐空间**：encoder 把图像观测压缩到 latent state，decoder/reward head 学习重构观测和奖励
- **Latent Imagination**：actor 不在真实环境或像素空间中 rollout，而是在 RSSM dynamics 的隐空间中展开轨迹
- **Analytic Value Gradient**：通过可微分的想象轨迹，把价值估计梯度反传到 actor
- **Actor-Critic in Model**：critic 学习 imagined trajectory 的 \(\lambda\)-return，actor 最大化想象回报
- **Experience Replay**：真实环境交互只用于训练世界模型，策略可在模型内进行大量更新
- **视觉连续控制验证**：在 20 个 DeepMind Control Suite image-based tasks 上超过 PlaNet、A3C、D4PG 等基线

#### 🔬 深入细节
##### Dreamer 总体架构

![DreamerV1 隐空间想象训练](https://ar5iv.labs.arxiv.org/html/1912.01603/assets/x1.png)

*图：Dreamer 先从真实经验学习紧凑世界模型，再在 latent dynamics 中想象未来轨迹，并通过 critic 的价值梯度训练 actor。*

##### 算法伪代码

```python
# DreamerV1 training loop
initialize RSSM world model p_phi
initialize actor pi_theta and value model v_psi
initialize replay buffer D

for each environment step:
    h_t, z_t = infer_state(world_model, history)
    a_t = pi_theta.sample(h_t, z_t)
    o_next, r, done = env.step(a_t)
    D.add(o_t, a_t, r, done)

    # 1. World model learning from real sequences
    batch = D.sample_sequences()
    states = RSSM.observe(batch.obs, batch.actions)
    L_model = reconstruction_loss(batch.obs)
            + reward_prediction_loss(batch.rewards)
            + KL(q(z_t | h_t, o_t) || p(z_t | h_t))
    update(world_model, L_model)

    # 2. Latent imagination
    start_states = detach(states)
    imagined = []
    s = start_states
    for tau in range(H):
        a = pi_theta.sample(s)
        s = RSSM.imagine_step(s, a)
        r_hat = reward_head(s)
        imagined.append(s, a, r_hat)

    # 3. Actor-Critic learning in imagination
    returns = lambda_returns(imagined.rewards, v_psi(imagined.states))
    update(v_psi, mse(v_psi(imagined.states), stop_gradient(returns)))
    update(pi_theta, -mean(returns))  # gradients flow through imagined dynamics
```

##### 动机与背景

PlaNet 已经证明可以学习 latent dynamics 并用 MPC 在模型中规划，但每一步都进行在线规划计算昂贵，且规划 horizon、候选动作数量等超参数影响很大。纯无模型方法虽然推理快，却需要大量真实交互。DreamerV1 的目标是在二者之间取平衡：用世界模型提供样本效率，用 actor 网络摊销规划结果。

Dreamer 的世界模型是 Recurrent State-Space Model。模型状态 \(s_t=(h_t,z_t)\)，其中 \(h_t\) 是确定性 RNN 隐状态，\(z_t\) 是随机 latent：

$$h_t=f_\phi(h_{t-1}, z_{t-1}, a_{t-1})$$

$$z_t \sim q_\phi(z_t \mid h_t, o_t), \qquad \hat z_t \sim p_\phi(\hat z_t \mid h_t)$$

训练时，后验 \(q_\phi\) 看见当前观测，先验 \(p_\phi\) 只根据历史预测。KL 项让先验学会在没有未来观测时也能产生合理 latent，这正是想象 rollout 所需的动力学能力。

##### 隐空间想象与价值梯度

世界模型训练好后，Dreamer 从真实序列的 posterior state 出发，在模型内递推：

$$s_{t+1} \sim p_\phi(s_{t+1}\mid s_t,a_t), \qquad a_t \sim \pi_\theta(a_t\mid s_t)$$

奖励由 reward head 预测，critic 给出 bootstrap value。想象轨迹上的 \(\lambda\)-return 为：

$$V_t^\lambda = \hat r_t + \gamma\big((1-\lambda)v_\psi(s_{t+1})+\lambda V_{t+1}^\lambda\big)$$

critic 拟合 \(V_t^\lambda\)，actor 最大化这些 imagined returns。与 REINFORCE 式采样梯度不同，Dreamer 的模型和 reward head 可微，因此 actor 可以接收穿过 dynamics 的 analytic gradient，更有效地学习长程行为。

##### 与 MBPO 的区别

MBPO 在真实状态附近用短模型 rollout 生成显式 transition，再交给 SAC；Dreamer 则把整个策略学习搬到 latent space，避免生成像素级未来图像作为训练数据。Dreamer 的 rollout horizon 可以比 MBPO 更长，因为它在紧凑 latent 中预测，并通过 value bootstrap 降低远期误差影响。

不过 DreamerV1 仍依赖连续 latent 的表达能力。后续 DreamerV2 发现，在 Atari 等离散、多模态视觉环境中，离散 latent 更适合表达突变事件和多峰未来，这成为 V2 的主要改进方向。

> 💡 关键：DreamerV1 的“梦”不是生成漂亮图像，而是在可微隐空间中生成足够准确的奖励和价值轨迹，让 actor 能从想象未来中学习。

#### 🧪 练习题
```yaml
question: "DreamerV1 为什么在隐空间而不是像素空间中训练 actor？"
options:
  - "因为隐空间 rollout 更紧凑，可微且误差更易控制，适合反传价值梯度"
  - "因为像素观测不能用于训练世界模型"
  - "因为 actor 只能接收离散动作"
  - "因为 Dreamer 不需要奖励模型"
answer: 0
explain: "RSSM latent state 压缩了历史和不确定性，Dreamer 在该空间中想象轨迹并通过可微 dynamics 反传 critic 价值梯度，从而高效训练策略。"
```

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
DreamerV2 将 Dreamer 的连续随机 latent 改为多组离散 categorical latent，并配合 KL balancing、straight-through estimator 和 latent imagination actor-critic，解决 Atari 这类离散视觉环境中世界模型表达能力不足的问题。它首次让一个单 GPU 世界模型智能体在 55 个 Atari 游戏上达到人类级水平，并仍然完全在学习到的隐空间中训练行为。

#### 🎯 核心要点
- **离散 RSSM latent**：随机状态由多组 categorical 变量组成，比高斯 latent 更适合表示 Atari 中物体、事件和离散模式
- **Straight-through estimator**：前向采样 one-hot 离散变量，反向用连续概率近似传递梯度
- **KL balancing**：把 representation learning 和 dynamics learning 的梯度权重分开，避免先验或后验一方主导
- **Actor-Critic 想象训练**：策略和价值函数仍只在世界模型 latent rollout 中训练，不依赖真实环境中的策略梯度
- **No image reconstruction for acting**：行为学习使用 latent state、reward 和 value，不需要在想象过程中生成像素
- **Atari 55 任务验证**：在 200M frames 设置下超过 Rainbow 和 IQN 等强单 GPU agent
- **连续控制兼容**：同一思想也可用于 humanoid stand/walk 等连续动作视觉控制任务

#### 🔬 深入细节
##### DreamerV2 方法示意图

![DreamerV2 离散世界模型](https://ar5iv.labs.arxiv.org/html/2010.02193/assets/x1.png)

*图：DreamerV2 延续“世界模型学习 + latent imagination + actor-critic”的框架，但将世界模型中的随机表示替换为离散 latent，以提高对 Atari 环境的建模能力。*

##### 算法伪代码

```python
# DreamerV2 training loop
initialize discrete RSSM world model
initialize actor pi_theta and critic v_psi
initialize replay buffer D

for step in range(training_steps):
    # collect real experience
    s_t = RSSM.infer(o_t, history)
    a_t = pi_theta.sample(s_t)
    o_next, r, done = env.step(a_t)
    D.add(o_t, a_t, r, done)

    # world model update
    batch = D.sample_sequences()
    posterior = RSSM.observe(batch.obs, batch.actions)   # q(z_t | h_t, o_t)
    prior = RSSM.imagine_prior(batch.actions)            # p(z_t | h_t)
    z = straight_through_sample(posterior.categorical_probs)

    L_pred = -log p(o_t | h_t, z_t) - log p(r_t | h_t, z_t) - log p(done_t | h_t, z_t)
    L_kl = kl_balance(KL(q || p), alpha)
    update(world_model, L_pred + beta * L_kl)

    # behavior learning in imagination
    start = detach(posterior.states)
    imagined = rollout_discrete_RSSM(start, pi_theta, horizon=H)
    returns = lambda_returns(imagined.rewards, v_psi(imagined.states))
    update critic to predict stop_gradient(returns)
    update actor to maximize imagined returns with entropy regularization
```

##### 动机与背景

DreamerV1 在连续控制图像任务上表现强，但 Atari 带来不同挑战：屏幕中对象和事件是离散的，奖励可能由突然事件触发，未来分布常是多模态的。用连续高斯 latent 表示这些结构时，模型容易把多个可能状态平均到一起，导致奖励预测和长程想象不够稳定。

DreamerV2 的主要变化是离散随机状态。典型表示可以理解为 \(N\) 组 categorical 变量，每组有 \(K\) 个类别：

$$z_t = \{z_t^{(1)},\ldots,z_t^{(N)}\}, \qquad z_t^{(i)} \in \{1,\ldots,K\}$$

世界模型仍由 deterministic hidden state \(h_t\) 和 stochastic state \(z_t\) 构成。后验 \(q_\phi(z_t|h_t,o_t)\) 看见观测，先验 \(p_\phi(z_t|h_t)\) 只从历史预测。离散 latent 让模型能组合出大量离散状态码，更自然地表达“钥匙是否出现”“敌人在哪个格子”“子弹是否发射”等事件。

##### KL Balancing 与离散梯度

世界模型训练包含预测损失和 KL 正则：

$$\mathcal{L}_{model} =
\mathcal{L}_{image}+\mathcal{L}_{reward}+\mathcal{L}_{discount}
\beta\,D_{KL}\big(q_\phi(z_t|h_t,o_t)\,\|\,p_\phi(z_t|h_t)\big)$$

若直接优化 KL，模型可能出现两类问题：后验为了重构图像携带太多信息，导致先验跟不上；或先验压力过强，导致后验不愿编码细节。KL balancing 通过 stop-gradient 把表示学习和动力学学习分开加权，使后验和先验以更稳定的节奏互相靠近。

离散变量不可直接反传采样梯度，DreamerV2 使用 straight-through estimator：前向用 one-hot 样本参与模型计算，反向把梯度近似传给 softmax 概率。这让模型保留离散表示的组合能力，同时仍能端到端训练。

##### 想象训练与 Atari 适配

行为学习阶段与 DreamerV1 一样，不在真实环境中做 on-policy 策略梯度，而是在 RSSM prior 中 rollout。actor 选择动作，RSSM 预测下一个 latent，reward head 给出奖励，critic 估计 bootstrap value。Actor 最大化 imagined \(\lambda\)-return：

$$V_t^\lambda = \hat r_t + \gamma \hat c_t\left((1-\lambda)v_\psi(s_{t+1})+\lambda V_{t+1}^\lambda\right)$$

Atari 的动作是离散的，DreamerV2 的 actor 输出 categorical action distribution，并使用熵正则保持探索。重要的是，策略学习完全依赖世界模型的 latent 预测，因此模型若不能表示关键离散事件，actor 就会学到错误行为；这正是离散 latent 带来提升的原因。

与 MBPO 相比，DreamerV2 不把模型样本写回 replay buffer 给 SAC，而是直接在模型内部训练 actor-critic。与 DreamerV1 相比，它保持整体训练范式不变，但把世界模型的表征从连续改为离散，并加入一组稳定训练技巧，使方法能扩展到 Atari 这样更复杂的离散视觉任务。

> 💡 关键：DreamerV2 的突破不是更长的规划，而是让世界模型的 latent 代码更像环境中的离散事实，从而让想象轨迹对策略训练足够可信。

#### 🧪 练习题
```yaml
question: "DreamerV2 相比 DreamerV1 的核心表征改动是什么？"
options:
  - "把 RSSM 中的随机 latent 从连续高斯变量改为多组离散 categorical 变量"
  - "取消世界模型，只保留无模型 PPO"
  - "把所有奖励替换为 RND 内在奖励"
  - "只在真实环境中训练 actor，不再使用想象轨迹"
answer: 0
explain: "DreamerV2 的关键是离散世界模型；categorical latent 更适合表达 Atari 中的离散对象和事件，并通过 straight-through 与 KL balancing 稳定训练。"
```

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
RWML 提出用强化学习训练 LLM agent 的动作条件世界模型，让模型根据交互历史和候选动作预测真实下一状态，并用 embedding 空间中的 sim-to-real gap 奖励优化，解决 SFT 预测下一状态过度追求字面复现而忽略语义等价的问题。该方法完全自监督，可在没有专家轨迹、强模型标注或任务成功奖励的情况下提升 ALFWorld 与 \(\tau^2\) Bench 中的代理表现。

#### 🎯 核心要点
- **动作条件世界模型**：LLM 输入历史 \(h_t\) 和动作 \(a_t\)，先生成 reasoning tokens，再预测 simulated next state \(\hat s_{t+1}\)
- **Sim-to-real gap reward**：比较 \(\hat s_{t+1}\) 与真实环境返回 \(s_{t+1}\) 的 embedding 距离，而非要求 token 完全一致
- **二值奖励更稳健**：论文使用阈值化的相似度奖励，降低连续 reward 被 hacking 的风险
- **GRPO 优化**：用 group-relative policy optimization 最大化世界模型奖励，并加入 KL 正则约束
- **自采样数据**：目标模型自己与环境交互收集 rollout，再转换成 \((h_t,a_t,s_{t+1})\) 训练三元组
- **难例子采样**：先用少量数据训练 next-state predictor，过滤过于容易的样本，让 RL 更关注非平凡世界知识
- **组合训练收益**：RWML 单独提升 base agent；与 task-success reward RL 结合时超过直接 policy RL
- **评测环境**：ALFWorld 文本具身任务和 \(\tau^2\) Bench 工具调用任务，均需要预测动作后果和环境动态

#### 🔬 深入细节
##### RWML 流程示意图

![RWML 训练流程](https://arxiv.org/html/2602.05842v2/x1.png)

*图：RWML 先由目标模型在环境中收集交互，把轨迹转成动作条件下一状态预测样本，再用 embedding 相似度构成奖励，通过 GRPO 训练模型的世界模拟能力。*

##### 算法伪代码

```python
# Reinforcement World Model Learning for LLM agents
input: base LLM policy pi_theta, environments E

# 1. Collect self-supervised transition data
D = []
for task in training_tasks:
    for rollout_id in range(M):
        history = env.reset(task)
        while not done:
            action = pi_theta.generate_action(history)
            next_state = env.step(action)
            D.append((history, action, next_state))
            history = history + [action, next_state]

# 2. Subsample hard world-model examples
wm_sft = train_next_state_predictor(D[:10%])
D_hard = []
for sample in D[10%:]:
    rewards = evaluate_multiple_predictions(wm_sft, sample)
    if mean(rewards) < easy_threshold or random() < keep_easy_prob:
        D_hard.append(sample)

# 3. RL train world model with GRPO
for batch in sample_batches(D_hard):
    completions = pi_theta.generate_world_predictions(batch.history, batch.action, n=G)
    rewards = []
    for y_hat, y_real in zip(completions, batch.next_state):
        sim = cosine(embed(y_hat), embed(y_real))
        rewards.append(1 if sim >= tau else 0)
    advantages = group_relative_advantage(rewards)
    update pi_theta with GRPO objective + KL_to_reference

# 4. Optional: continue with task-success policy RL
pi_theta = policy_RL(pi_theta, task_success_reward)
```

##### 动机与背景

LLM agent 在 ALFWorld 或工具调用环境中不仅要知道“下一步说什么”，还要预判动作会如何改变世界。例如执行 `open fridge` 后会看到哪些物品，调用某个客服工具后系统会返回什么字段。若模型不能预测动作后果，规划就会退化成短视试错。

直接用 SFT 训练 next-state prediction 有一个缺陷：文本状态存在大量语义等价表述，SFT 会惩罚所有非字面匹配的输出。模型可能学会复述训练集格式，而不是学会“动作导致状态变化”的语义规律，严重时还会出现 model collapse。

RWML 把世界模型学习写成 RL 目标。模型生成：

$$\hat s_{t+1} \sim \pi_\theta(\cdot \mid h_t, a_t)$$

然后用 embedding 模型比较预测状态和真实状态：

$$d(\hat s_{t+1}, s_{t+1}) = 1 - \cos\big(E(\hat s_{t+1}), E(s_{t+1})\big)$$

奖励可阈值化为：

$$r^{WM} = \mathbb{1}\left[\cos(E(\hat s_{t+1}),E(s_{t+1})) \ge \tau\right]$$

这样，语义正确但措辞不同的预测仍可得到奖励，模型更关注状态转移是否对，而不是 token 是否逐字一致。

##### GRPO 世界模型训练

RWML 使用 GRPO。对同一输入采样一组候选下一状态，计算组内相对优势，再更新当前模型：

$$\mathcal{L}_{GRPO} =
-\mathbb{E}\left[
\min\left(\rho_t A_t,\operatorname{clip}(\rho_t,1-\epsilon,1+\epsilon)A_t\right)
-\beta D_{KL}(\pi_\theta \| \pi_{ref})
\right]$$

其中优势 \(A_t\) 来自同组候选的世界模型奖励。KL 项防止模型为了相似度奖励而偏离原始语言能力。论文还发现二值奖励比连续相似度更不容易被 hacking，因为模型不能通过投机地生成 embedding 友好但人类不可读的文本来获得细粒度奖励。

##### 与传统世界模型的区别

Dreamer/MBPO 学习的是连续或离散环境的状态转移模型，训练信号通常是图像、奖励或 latent 重构误差；RWML 学习的是文本状态空间中的世界模型，核心挑战从像素预测变成语义状态等价。它不直接训练动作策略，而是先提高 LLM 对“动作后果”的内部模拟能力，再与 task-success policy RL 组合。

这种方法尤其适合长期任务：单步任务成功奖励太稀疏，专家轨迹又昂贵；但环境交互自然提供了大量 \((history, action, next_state)\) 三元组。RWML 利用这些自监督转移，把 agent 后训练的一部分目标从“完成任务”拆成“先学会世界如何变化”。

> 💡 关键：RWML 的奖励不是任务成功，而是“我模拟的下一状态是否语义上接近真实下一状态”。这让世界模型学习成为可规模化的自监督 RL 问题。

#### 🧪 练习题
```yaml
question: "RWML 为什么不用普通 SFT 的 token-level next-state prediction 作为主要训练目标？"
options:
  - "因为环境没有真实下一状态"
  - "因为 token-level SFT 会惩罚语义等价但措辞不同的预测，且可能导致模型只学表面复现"
  - "因为 GRPO 不能处理文本输出"
  - "因为世界模型只能用图像状态训练"
answer: 1
explain: "RWML 用 embedding 空间的 sim-to-real gap 奖励评估语义一致性，避免把等价表述视为错误，并降低 next-token SFT 对格式复现的依赖。"
```

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
HY-Embodied-0.5 提出面向真实具身智能体的视觉语言基础模型族，通过原生分辨率视觉编码器、Mixture-of-Transformers、视觉 latent tokens、大规模具身数据和迭代后训练，解决通用 VLM 在空间感知、时间理解和具身推理上不足的问题。其 MoT-2B 变体面向边缘部署，进一步扩展成 VLA 后在真实双臂机器人任务中展示了可迁移控制能力。

#### 🎯 核心要点
- **HY-ViT 2.0**：轻量原生分辨率视觉编码器，支持任意比例输入，并通过蒸馏和重构监督保留细粒度视觉信息
- **Mixture-of-Transformers**：为视觉 token 和文本 token 使用部分非共享 QKV/FFN 与不同 attention 机制，提高视觉建模能力且减少语言能力退化
- **视觉 latent tokens**：在视觉序列末尾追加专用 latent tokens，桥接视觉 full attention 和语言 causal attention
- **100M+ 训练样本**：数据覆盖基础感知、空间感知、具身感知、推理与规划，并包含真实机器人数据和高质量 reasoning 数据
- **迭代后训练**：冷启动数据、rejection sampling SFT 和 RL 交替提升 thinking 能力
- **大到小在线蒸馏**：把大模型能力迁移到小模型，提升 2B 边缘变体的具身推理表现
- **22 项评测**：覆盖视觉感知、空间推理和具身理解，MoT-2B 在同规模模型中表现领先，MoE-A32B 对比前沿 VLM 也有竞争力
- **真实机器人 VLA**：在 MoT-2B 上扩展 Action Expert，先用 5K 小时 UMI 数据微调，再用 300-700 条真实演示适配具体任务

#### 🔬 深入细节
##### MoT 架构示意图

![HY-Embodied-0.5 MoT 架构](https://arxiv.org/html/2604.07430v1/x2.png)

*图：HY-Embodied-0.5 的 Mixture-of-Transformers 为视觉和文本 token 分配不同计算路径，并通过视觉 latent tokens 强化跨模态连接。*

##### 算法伪代码

```python
# HY-Embodied-0.5 训练与部署流程抽象

# 1. Perception-centric pretraining
train HY_ViT_2_0 with native-resolution images
distill visual encoder from stronger internal vision model
add reconstruction/discrete-code supervision to preserve visual detail

# 2. Multimodal foundation model training
initialize LLM backbone
insert Mixture-of-Transformers layers:
    text tokens -> original QKV/FFN + causal attention
    visual tokens -> vision-specific QKV/FFN + visual/full attention
append visual latent tokens after visual sequence
train on 100M+ perception, spatial, embodied, reasoning/planning samples

# 3. Iterative embodied post-training
for round in iterative_training:
    train on cold-start reasoning data
    sample candidate responses / reasoning traces
    apply rejection sampling SFT
    apply RL to improve thinking and embodied reasoning

# 4. Large-to-small on-policy distillation
teacher = HY_Embodied_large
student = HY_Embodied_MoT_2B
collect on-policy teacher/student trajectories
distill reasoning and embodied responses into student

# 5. VLA robot control adaptation
extend MoT-2B with Action Expert
finetune on 5K hours UMI data
SFT on 300-700 real-robot demonstrations per task
deploy on dual-arm robot with head/wrist cameras
```

##### 动机与背景

通用 VLM 通常擅长图文问答和常识推理，但真实具身任务要求更细的能力：识别物体可操作部位、理解三维空间关系、跟踪时间变化、预测动作后果，并最终服务于机器人控制。单纯扩大通用 VLM 规模并不一定提升这些能力，因为训练数据和架构计算路径没有专门面向具身视觉。

HY-Embodied-0.5 的第一层改进是视觉侧。HY-ViT 2.0 面向原生分辨率输入，避免强行缩放造成小物体、距离和局部接触区域丢失。论文还训练更大视觉模型产生离散视觉表示，用于监督视觉 token，从而在接入语言模型时保留更多可 grounding 的细节。

##### Mixture-of-Transformers 与视觉 latent tokens

标准 VLM 常把视觉 token 投影到 LLM embedding 后与文本 token 混合处理，视觉训练过重时可能损伤语言能力。HY-Embodied-0.5 使用 MoT：复制或分离部分 QKV/FFN 参数，让视觉 token 走更适合视觉建模的路径，文本 token 保持原语言路径。

可抽象为：

$$y_i =
\begin{cases}
\operatorname{Block}_{vision}(x_i), & x_i \in \mathcal{V} \\
\operatorname{Block}_{text}(x_i), & x_i \in \mathcal{T}
\end{cases}$$

视觉 latent tokens 则类似跨模态寄存器：它们从视觉 full attention 中聚合关键空间区域，再被语言 causal attention 读取。论文的注意力可视化显示，这些 token 会关注物体部位、空间关系和动作相关区域，因此能把“看见什么”更稳定地转成“如何推理/操作”。

##### 后训练与蒸馏

HY-Embodied-0.5 的后训练不是一次性 SFT。它使用少量冷启动数据建立推理格式，再通过 iterative RL 和 rejection sampling SFT 提升 thinking 能力。大模型探索出的高质量推理和答案，再通过 large-to-small on-policy distillation 迁移给 MoT-2B，使小模型在边缘部署预算下仍保留较强具身能力。

这个流程与 Dreamer/RWML 的“世界模型”概念不同：HY-Embodied-0.5 不是学习一个显式环境动力学模型再在其中 rollout，而是把空间、时间、计划和动作相关知识压进 VLM/VLA 基础模型。它更像具身 agent 的感知-推理底座，可被下游控制头或 Action Expert 接入。

##### 机器人控制部署

论文在 MoT-2B 基础上扩展 Action Expert 得到 VLA 模型。训练先用 5K 小时 UMI 数据进行通用操作微调，再用每个真实任务 300-700 条演示做 SFT。评测在双臂 Xtrainer、头部和腕部相机设置下进行，任务包括 Precision Plug-in Packing、Tableware Stacking 和 Mug Hanging。

这种部署流程体现了 HY-Embodied-0.5 的定位：大规模视觉语言预训练提供空间和任务理解，具身后训练提升推理与规划，少量真实机器人数据完成 embodiment-specific 适配。与纯 RL 世界模型相比，它更依赖监督/后训练与蒸馏；与通用 VLM 相比，它在架构和数据上明确为物理世界 grounding 优化。

> 💡 关键：HY-Embodied-0.5 的核心贡献是把 VLM 改造成具身基础模型，而不是只在通用 VLM 外面接一个机器人控制头。

#### 🧪 练习题
```yaml
question: "HY-Embodied-0.5 中 Mixture-of-Transformers 的主要作用是什么？"
options:
  - "让视觉 token 和文本 token 使用更适配各自模态的计算路径，提升视觉建模同时减少语言能力退化"
  - "把所有视觉输入压缩成一个固定文本 token"
  - "替代真实机器人数据采集"
  - "只用于减少模型文件大小，与性能无关"
answer: 0
explain: "MoT 为视觉和文本 token 引入模态自适应计算，视觉分支增强空间和视觉建模，文本分支保留语言能力，是 HY-Embodied-0.5 的关键架构设计。"
```
