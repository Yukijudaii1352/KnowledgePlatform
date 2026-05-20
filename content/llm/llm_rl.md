---
domain: llm
topic_id: llm_rl
topic_name: LLM强化学习
page_icon: 🎯
page_title: LLM强化学习算法演进
page_subtitle: '{build_date} 版'
page_desc: 从PPO到RLHF、DPO、GRPO再到2026年最新VAPO等算法的完整演化图谱，涵盖策略梯度、偏好优化、在线强化学习三大技术路线
hero_pills:
- 🏷️ RLHF · Policy Optimization · Preference Learning · Reasoning RL
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 奠基算法
    color: '#3B82F6'
  rlhf:
    label: 人类反馈强化学习
    color: '#10B981'
  preference:
    label: 偏好优化
    color: '#8B5CF6'
  online_rl:
    label: 在线强化学习
    color: '#F59E0B'
  frontier_2026:
    label: 2026前沿
    color: '#EF4444'
---

## 领域综述

!INCLUDE_RAW ../../pipeline/researcher/output/RL_survey_old/zhihu__知乎专栏_1951985172259004422__a6c6e074/article.md

## 最新进展综述

!INCLUDE_RAW ../../pipeline/researcher/output/RL_survey_new/zhihu__知乎专栏_1951985172259004422__f14be2f1/article.md

## 算法演化关系

```yaml
nodes:
- id: reinforce
  x: 50
  y: 100
  category: foundation
- id: trpo
  x: 200
  y: 100
  category: foundation
- id: ppo
  x: 350
  y: 100
  category: foundation
- id: instructgpt
  x: 500
  y: 250
  category: rlhf
- id: constitutional_ai
  x: 550
  y: 320
  category: rlhf
- id: rlaif
  x: 650
  y: 320
  category: rlhf
- id: dpo
  x: 600
  y: 400
  category: preference
- id: ipo
  x: 700
  y: 450
  category: preference
- id: kto
  x: 800
  y: 400
  category: preference
- id: orpo
  x: 850
  y: 450
  category: preference
- id: simpo
  x: 900
  y: 400
  category: preference
- id: remax
  x: 700
  y: 550
  category: online_rl
- id: spin
  x: 750
  y: 620
  category: online_rl
- id: grpo
  x: 800
  y: 550
  category: online_rl
- id: dapo
  x: 900
  y: 550
  category: online_rl
- id: vapo
  x: 950
  y: 700
  category: frontier_2026
- id: dr_grpo
  x: 1000
  y: 700
  category: frontier_2026
- id: reinforce_pp
  x: 1050
  y: 700
  category: frontier_2026
- id: oapl
  x: 1100
  y: 700
  category: frontier_2026
- id: wdpo
  x: 1050
  y: 770
  category: frontier_2026
- id: mod_dpo
  x: 1100
  y: 770
  category: frontier_2026
edges:
- from: reinforce
  to: trpo
  label: 信任域约束
- from: trpo
  to: ppo
  label: 裁剪代理目标
- from: ppo
  to: instructgpt
  label: RLHF范式
- from: ppo
  to: remax
  label: 移除Critic
- from: ppo
  to: grpo
  label: 组内相对优势
- from: instructgpt
  to: constitutional_ai
  label: 自我修订
- from: instructgpt
  to: rlaif
  label: AI反馈替代
- from: instructgpt
  to: dpo
  label: 移除奖励模型
- from: instructgpt
  to: spin
  label: 自博弈进化
- from: dpo
  to: ipo
  label: 正则化增强
- from: dpo
  to: kto
  label: 二元信号
- from: dpo
  to: orpo
  label: 移除参考模型
- from: dpo
  to: simpo
  label: 长度归一化
- from: dpo
  to: wdpo
  label: 分布鲁棒性
- from: dpo
  to: mod_dpo
  label: 模态解耦
- from: grpo
  to: dapo
  label: 解耦裁剪
- from: grpo
  to: vapo
  label: 价值预训练
- from: grpo
  to: dr_grpo
  label: 偏差修正
- from: grpo
  to: oapl
  label: 离线策略
- from: remax
  to: reinforce_pp
  label: 全局归一化
milestones:
- ppo
- dpo
- grpo
```

## 核心算法

### REINFORCE

```yaml
id: reinforce
num: 1
name: REINFORCE
full_name: 策略梯度算法 (REINFORCE)
year: '1992'
org: Northeastern University
parent: —
paper_url: https://link.springer.com/article/10.1007/BF00992696
project_url: ''
category: foundation
motivation: 通过轨迹回报直接估计策略梯度
```

#### 📝 一句话总结
REINFORCE 首次严格证明含随机单元的连接主义网络可通过沿期望强化信号的梯度方向更新权重，利用似然比（log-derivative）技巧将标量奖励直接转化为无偏策略梯度估计，无需显式计算梯度或维护中间变量。

#### 🎯 核心要点
- 提出 REINFORCE 算法族：利用轨迹采样回报直接估计策略梯度，奠基蒙特卡洛策略梯度方法
- 核心公式 \\(\Delta w_{ij} = \alpha_{ij} (r - b_{ij}) \\, \\frac{\\partial \\ln g_i}{\\partial w_{ij}}\\)，其中 \\(g_i\\) 为单元 i 输出该动作的概率密度，\\(\\frac{\\partial \\ln g_i}{\\partial w_{ij}}\\) 为资格迹（eligibility trace）
- 创新引入 baseline \\(b_{ij}\\)：任意与动作无关的量均可作为基线，不引入偏差但能显著降低估计方差
- 适用于 immediate-reinforcement 任务和受限形式的 delayed-reinforcement（episodic）任务
- 提出 episodic REINFORCE：每完整轨迹结束后根据累积回报 \\(G_t\\) 统一更新，等价于后来广泛使用的 vanilla policy gradient
- 可与反向传播自然集成：输出端随机 REINFORCE 单元与隐藏层确定性单元联合训练
- 分析了 Bernoulli-logistic、Gaussian 及带 softmax 的多项选择单元三类具体实例
- 数学上严格证明权重增量的期望方向与期望强化信号的梯度一致
- 支持从 Bernoulli、Gaussian 到任意指数族分布的随机策略建模

#### 🔬 深入细节
##### 核心示意图

```mermaid
flowchart LR
    S[状态输入 s] --> H[确定性隐藏层<br/>权重 w_h]
    H --> R[随机输出单元<br/>参数化分布 g_w]
    R --> A[动作采样 a ~ g_w]
    A --> ENV[环境]
    ENV --> RE[奖励 r]
    RE --> UPDATE[权重更新]
    R -.->|资格迹 e = ∇_w ln g| UPDATE
    UPDATE -->|Δw = lr × (r-b) × e| R
    UPDATE -->|BP反传| H
```
*图：REINFORCE 网络架构。随机输出单元从参数化分布采样动作，利用资格迹 \(e = \nabla_w \ln g\) 将标量奖励转化为权重梯度，并通过反向传播更新隐藏层确定性权重。*

##### 动机与背景

在 1992 年，强化学习面临一个关键瓶颈：如何将标量奖励信号转化为含随机探索机制的网络的权重更新方向。监督学习中反向传播依赖「目标输出 − 实际输出」的逐节点误差信号，但强化学习中仅有单一标量奖励，缺乏逐动作的精确监督。传统做法试图用 TD 或 Q-Learning 逼近值函数再间接推导策略，但这些方法要么要求离散动作空间（需全局 argmax），要么对连续动作无优雅支持。Williams 将问题重新定义为：寻找权重更新 \\(\Delta w\\)，使得期望强化信号 \\(\mathbb{E}[r]\\) 最大化的方向上优化——即沿 \\(\\nabla_w \\mathbb{E}[r]\\) 走；但从不等同于试图显式计算该梯度，而是通过采样巧妙获得无偏估计。

##### 核心机制：似然比梯度估计

REINFORCE 的数学核心是基于似然比（likelihood ratio）恒等式，也称 log-derivative trick。设随机策略 \\(\pi_w(a|s)\\) 以参数 w 输出动作 a 的分布，r 为执行 a 后获得的强化信号，有：

$$\nabla_w \mathbb{E}[r] = \nabla_w \int r \\; g_w(a) \\, da = \int r \\; \nabla_w g_w(a) \\, da = \int r \\; g_w(a) \\; \nabla_w \\ln g_w(a) \\, da = \mathbb{E}\left[r \\cdot \\nabla_w \\ln g_w(a)\right]$$

推导关键：\\(\\nabla_w g_w = g_w \\cdot \\nabla_w \\ln g_w\\)，将对概率密度的梯度转化为可通过采样估计的期望形式。实际算法中，每步执行：

$$\Delta w = \alpha \\cdot r \\cdot \\nabla_w \\ln g_w(a)$$

其中 \\(\\alpha\\) 为学习率。这是一条极简洁的更新：采样一次动作，观测奖励，将奖励与 log-概率的梯度相乘作为权重增量。该估计是无偏的——多次更新的期望正是真正的策略梯度方向。

> 💡 关键：REINFORCE 将「强化学习」问题转化为「统计梯度估计」问题。每个随机单元仅需知道自身输出的概率密度梯度（资格迹），与网络其余部分解耦，天然支持模块化的网络架构。

##### Baseline 减方差

最直接的 REINFORCE 形式存在高方差问题——奖励的绝对大小（可能从 -∞ 到 +∞）直接影响更新尺度，导致训练不稳定。Williams 提出引入 baseline \\(b\\)：

$$\Delta w = \alpha \\cdot (r - b) \\cdot \\nabla_w \\ln g_w(a)$$

> ⚠️ 注意：baseline b 必须与动作 a 无关（即不含动作信息），否则该减法项会在期望中引入偏差。由于 \\(\mathbb{E}[\\nabla_w \\ln g_w] = \int g_w \\cdot \\nabla_w \\ln g_w = \int \\nabla_w g_w = \\nabla_w \\int g_w = \\nabla_w 1 = 0\\)，故 \\(\mathbb{E}[b \\cdot \\nabla_w \\ln g_w] = 0\\)，因此引入 baseline 不改变梯度的期望值，但能从原始奖励中减去常数级偏移，显著平滑波动。实际中 b 可取奖励的指数移动平均、训练出的值函数估计，或同一批样本的均值。

##### Episodic REINFORCE 与 Monte Carlo Policy Gradient

对 episodic 任务（完整轨迹结束后才获得回报），Williams 提出 natural extension：每时间步的更新权重改为该步之后整个轨迹的累积折扣回报 \\(G_t = \sum_{k=t}^{T} \gamma^{k-t} r_k\\)。这就是后来广泛使用的 vanilla policy gradient / Monte Carlo policy gradient 的标准形式：

$$\nabla_\theta J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta} \left[ \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t|s_t) \\, G_t \right]$$

这一定义揭示了 REINFORCE 是后来所有梯度类策略搜索方法的共同祖先：Actor-Critic（用 \\(Q(s,a)\\) 替代 \\(G_t\\) 降方差）、PG with GAE（广义优势估计）、TRPO/PPO（约束更新幅度）均由此衍生。

##### 与反向传播的集成

REINFORCE 的一个重要贡献是展示了随机输出单元与确定性隐藏层可联合训练。具体而言，输出端 REINFORCE 单元的误差信号 \\((r - b) \\cdot e\\)（其中 \\(e = \\nabla_w \\ln g\\)）通过标准反向传播通路传递至隐藏层的确定性单元，隐藏层按常规 SGD 更新权重。这一混合架构为 Actor-Critic 提供了概念原型：随机策略网络（Actor）输出动作分布，确定性特征提取网络提供状态表示，两者端到端联合优化。

##### 算法伪代码

```python
# Episodic REINFORCE (Monte Carlo Policy Gradient)
for episode in range(max_episodes):
    states, actions, rewards = [], [], []
    # 1. 生成轨迹
    done = False
    s = env.reset()
    while not done:
        logits = policy_net(s)          # 输出分布参数
        a = sample(logits)              # 从分布中采样动作
        s_next, r, done = env.step(a)
        states.append(s)
        actions.append(a)
        rewards.append(r)
        s = s_next
    # 2. 计算折扣回报
    G = 0
    returns = []
    for r in reversed(rewards):
        G = r + gamma * G
        returns.insert(0, G)
    # 3. 策略梯度更新
    loss = 0
    for t in range(len(states)):
        log_prob = log_prob_calc(policy_net(states[t]), actions[t])
        loss += -log_prob * (returns[t] - baseline)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 与传统方法的区别

| 维度 | Q-Learning / SARSA (TD方法) | REINFORCE |
|------|---------------------------|-----------|
| 优化目标 | 值函数 \\(V(s)\\) 或 \\(Q(s,a)\\) | 策略分布 \\(\pi(a|s)\\) 直接优化 |
| 梯度来源 | 隐式（Bellman 方程误差驱动） | 显式（似然比梯度，严格无偏） |
| 偏差-方差折衷 | 有偏但低方差（bootstrap） | 无偏但高方差（需完整轨迹） |
| 动作空间 | 离散动作为主（需 argmax） | 天然支持连续/离散/混合动作 |
| 样本效率 | 每步均可学习 | episodic 任务需完整轨迹 |
| 探索机制 | \\(\epsilon\\)-greedy 等显式设计 | 策略分布本身提供随机探索 |

#### 🧪 练习题
```yaml
question: "在 REINFORCE 算法中引入 baseline 的主要作用是什么？"
options:
  - "增加梯度估计的偏差以加速收敛"
  - "降低梯度估计的方差而不引入偏差"
  - "替代需要完整轨迹的回报计算"
  - "使算法适用于连续动作空间"
answer: 1
explain: "baseline 须与动作无关，其加权期望为零 (\u2207\u2097 \u222b g\u2097 = 0)，不改变梯度估计的期望值，但能将奖励中的大常数偏移减去，显著降低估计方差。"
```

### TRPO

```yaml
id: trpo
num: 2
name: TRPO
full_name: 信任域策略优化 (Trust Region Policy Optimization)
year: '2015'
org: UC Berkeley
parent: reinforce
paper_url: https://arxiv.org/abs/1502.05477
project_url: ''
category: foundation
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
motivation: 裁剪目标函数简化TRPO
```

#### 📝 一句话总结
PPO 的核心目标是：裁剪目标函数简化TRPO。

#### 🎯 核心要点
- 核心动机：裁剪目标函数简化TRPO
- 演化来源：继承或改进自 trpo
- 代表机构：OpenAI

#### 🔬 深入细节
裁剪目标函数简化TRPO


### InstructGPT

```yaml
id: instructgpt
num: 4
name: InstructGPT
full_name: 指令遵循GPT (InstructGPT/RLHF)
year: '2022.03'
org: OpenAI
parent: ppo
paper_url: https://arxiv.org/abs/2203.02155
project_url: ''
category: rlhf
motivation: 首次大规模验证RLHF对齐有效性
```

#### 📝 一句话总结
InstructGPT 提出 **RLHF（基于人类反馈的强化学习）三阶段训练范式**：先通过人工标注的 demonstrations 进行监督微调（SFT），再训练偏好排序的奖励模型（RM），最后用 PPO 算法最大化奖励信号（同时加 KL 惩罚和预训练梯度混合），使 GPT-3 的输出更好地对齐人类指令和偏好，显著优于纯 GPT-3 和 SFT 基线。

#### 🎯 核心要点
- **三阶段训练流程**：Supervised Fine-Tuning (SFT) → Reward Model (RM) → PPO RL（含 KL 散度约束和预训练梯度混合）
- **数据集构建**：雇佣 40 位标注员，收集人工编写的高质量 demonstrations（约 13K prompts）和 comparison 排序数据（约 33K prompts）
- **奖励模型**：基于 SFT 模型末尾移除 unembedding 层，输入 prompt + response 输出标量 reward，使用 K=4~9 个 response 的 pairwise 对比损失
- **PPO-RL 优化**：在 bandit 环境中最大化 RM 奖励，同时加入 KL 散度惩罚项防止策略偏离 SFT 太远
- **PPO-ptx 变体**：混合预训练梯度到 PPO 更新中，缓解在 NLP 标准基准上的性能退化（"alignment tax"）
- **模型规模**：SFT 和 RM 使用 6B 参数（RM 的 175B 版本训练不稳定），PPO 策略使用 1.3B/6B/175B
- **核心优势**：人工评估中 175B InstructGPT 输出被偏好率 85±3% vs GPT-3，且显著降低有害输出、幻觉和不真实性

#### 🔬 深入细节
##### 示意图：三阶段训练框架

论文 Figure 2 描述了三步训练流程图：

> **Step 1 (SFT)**: 从 prompt 分布中采样，标注员编写高质量演示回答 → 监督微调 GPT-3  
> **Step 2 (RM)**: 对同一 prompt 采样 K 个 response，标注员排序 → 训练奖励模型预测偏好  
> **Step 3 (PPO)**: 对新 prompt 用 PPO 策略生成 response，RM 给出奖励 → 用 KL 散度约束更新策略

```
┌─────────────┐    ┌─────────────────┐    ┌───────────────────┐
│  Step 1     │    │     Step 2      │    │      Step 3       │
│  SFT        │───▶│  Reward Model   │───▶│   PPO RL          │
├─────────────┤    ├─────────────────┤    ├───────────────────┤
│ GPT-3 +     │    │ SFT 去头 +      │    │ pi_RL 生成 response │
│ 标注 demo   │    │ pairwise 排序   │    │ RM 打分           │
│ -> pi_SFT   │    │ -> r_theta(x,y) │    │ + KL(pi_RL||pi_SFT)│
│             │    │                 │    │ -> 更新 pi_RL      │
└─────────────┘    └─────────────────┘    └───────────────────┘
```

##### 算法伪代码

```python
# ========= InstructGPT 三阶段训练 =========

# Phase 1: Supervised Fine-Tuning (SFT)
pi_sft = pretrained_GPT3.clone()
for epoch in range(16):
    for prompt, demo in human_demonstrations:  # ~13K samples
        # 标准最大似然估计，在人工编写的回答上微调
        loss = neg_log_prob(pi_sft, demo, prompt)
        loss.backward()
        optimizer.step()

# Phase 2: Reward Model Training
r_theta = pi_sft.clone()
r_theta.replace_head(scalar_output)  # 去掉 unembedding，换标量输出头
for prompt, ranked_responses in comparison_data:  # ~33K prompts
    # K=4~9 responses per prompt
    for (y_win, y_lose) in all_pairs(ranked_responses):  # C(K,2) 对
        # Bradley-Terry pairwise loss
        loss = -log(sigmoid(r_theta(y_win) - r_theta(y_lose)))
    loss.backward()
# 后处理：归一化，让标注 demo 的平均 reward = 0

# Phase 3: PPO Reinforcement Learning
pi_rl = pi_sft.clone()
V = r_theta.clone()  # 价值函数从 RM 初始化
for step in range(num_steps):  # ~2M episodes
    prompt = sample(API_distribution)
    response = pi_rl.sample(prompt)
    # 奖励 = RM分数 - KL惩罚
    reward = r_theta(prompt, response)
    reward -= beta * KL_divergence(pi_rl, pi_sft, prompt)
    # PPO-ptx: 可选混合预训练损失
    loss = -reward + gamma * pretrain_loss(pi_rl, x)
    PPO_clip_update(pi_rl, V, loss)
```

##### 深入解释

**1. 动机与背景：GPT-3 的"对齐"困境**

GPT-3 虽然在各类 NLP 任务上展现出强大的能力，但其行为存在严重的对齐问题：它常常产生不符合用户意图的输出——例如编造事实（幻觉）、生成有害内容、或不能正确遵循明确的指令约束。核心矛盾在于，标准语言模型的目标是预测下一个 token（最大化训练数据的似然），而用户的真实目标是获得有帮助的、真实的、无害的回答。这两者并不等价。"对齐税"（alignment tax）现象表明，简单地对模型进行指令微调虽然能提升在特定基准上的表现，但可能在其他能力维度上退化。

InstructGPT 的核心洞察是：**人类偏好可以提供比"下一个 token 预测"更精确的信号**。通过让标注员对模型生成的多个回答进行排序，可以训练一个"奖励模型"来模拟人类的偏好判断，然后用强化学习（PPO）来最大化这个奖励信号。

**2. 奖励模型：从排序到标量奖励**

RM 训练是连接人类偏好与策略优化的桥梁。具体做法是：对同一个输入 prompt \\(x\\)，让策略模型生成 \\(K = 4\\sim 9\\) 个不同的 response，然后让标注员按质量排序。这原本只产生一个全序关系，但论文将排序转化为 \\(C_K^2\\) 个 pairwise 比较——每对 \\((y_w, y_l)\\) 标注"哪个更好"。

损失函数采用 Bradley-Terry 偏好模型的交叉熵形式：

$$\text{loss}(\theta) = -\frac{1}{\binom{K}{2}}\mathbb{E}_{(x, y_w, y_l)\sim D}\left[\log\left(\sigma\left(r_\theta(x, y_w) - r_\theta(x, y_l)\right)\right)\right]$$

> 💡 **关键设计**：将所有 \\(C_K^2\\) 个比较放在同一个 batch 中训练（而非独立打散），因为单个 prompt 内的多个比较高度相关。这一技巧不仅避免了过拟合（只扫一遍数据就过拟合），还计算效率更高——只需对 K 个 completion 各做一次前向传播，而非 \\(C_K^2\\) 次。

RM 只有 6B 参数（实验发现 175B RM 训练不稳定，不适合作为 RL 阶段的价值函数），且最终损失对奖励平移不变，因此在 RL 前将标注 demonstrations 的平均分数归零。

**3. PPO 目标函数：三个力量的平衡**

最终的 RL 目标函数需要同时优化三个目标，发表于论文公式(2)：

$$\begin{aligned}\text{objective}(\phi) = &\mathbb{E}_{(x,y)\sim D_{\pi_\phi^{RL}}}\left[r_\theta(x, y) - \beta \log\left(\frac{\pi_\phi^{RL}(y|x)}{\pi^{SFT}(y|x)}\right)\right] \\ &+ \gamma \mathbb{E}_{x\sim D_{\text{pretrain}}}\left[\log\left(\pi_\phi^{RL}(x)\right)\right]\end{aligned}$$

- **第一项 (RM reward)**：来自训练好的奖励模型 \\(r_\\theta\\)，鼓励策略生成人类偏好的回答
- **第二项 (KL 散度惩罚)**：以系数 \\(\\beta\\) 控制新策略相对于 SFT 模型的偏离程度。这防止策略过度优化 RM（reward hacking），因为 RM 只在有限分布上训练，可能对 OOD 响应给出虚高奖励
- **第三项 (预训练混合，PPO-ptx)**：以系数 \\(\\gamma\\) 加入原始预训练数据的语言建模损失。这在保持模型基本语言能力方面至关重要——纯 PPO 模型（\\(\\gamma = 0\\)）在 SQuAD、HellaSwag、翻译等公共 NLP 基准上出现显著退化，PPO-ptx 通过"不忘记预训练语料"来缓解这一对齐税

> ⚠️ **注意**：环境是**bandit 环境**——每次 interaction 是独立的 prompt-response 对，不存在时序状态转移。这简化了 RL 问题：策略只负责生成 response，没有后续状态。

**4. 与以前 RLHF 工作的区别**

InstructGPT 是首个将 RLHF 范式在大规模语言模型上系统性验证的工作（Stiennon et al., 2020 在摘要任务上使用类似方法，但只在 1.3B 模型上实验）。关键区别：
- **规模**：扩展到 175B 参数模型和真实 API 用户分布
- **数据质量闭环**：标注员反复与模型交互，数据质量随时间迭代提升
- **PPO-ptx**：首次提出混合预训练梯度来缓解对齐税
- **多维度评估**：不仅衡量标签偏好，还评估幻觉率、有害性、真实性等关键安全维度

#### 🧪 练习题
```yaml
question: "InstructGPT 的奖励模型损失函数将 K 个 response 的排序转化为多少对 pairwise 比较？"
options:
  - "K 对"
  - "K(K-1) 对"
  - "C(K,2) 对，即 K(K-1)/2"
  - "K² 对"
answer: 2
explain: "K 个 response 的完全排序可产生所有两两组合，即组合数 C(K,2)=K(K-1)/2。例如 K=5 时产生 10 对比较，论文使用 K=4~9。"
```

```yaml
question: "InstructGPT 中 PPO-ptx 变体的主要目的是什么？"
options:
  - "加快 PPO 训练收敛速度"
  - "提高奖励模型的排序精度"
  - "缓解对齐税，防止在公共 NLP 基准上的性能退化"
  - "减少 KL 散度惩罚项的数值不稳定"
answer: 2
explain: "PPO-ptx 通过在 PPO 梯度中混合预训练损失，保留模型在原始语料上的通用语言能力，从而在提升对齐性的同时减少在 SQuAD、HellaSwag 等基准上的退化。"
```
</file_content>

### CAI

```yaml
id: constitutional_ai
num: 5
name: CAI
full_name: 宪法AI (Constitutional AI)
year: '2022.12'
org: Anthropic
parent: instructgpt
paper_url: https://arxiv.org/abs/2212.08073
project_url: ''
category: rlhf
motivation: 基于原则的自我批判与修订
```

#### 📝 一句话总结
CAI 的核心目标是：基于原则的自我批判与修订。

#### 🎯 核心要点
- 核心动机：基于原则的自我批判与修订
- 演化来源：继承或改进自 instructgpt
- 代表机构：Anthropic

#### 🔬 深入细节
基于原则的自我批判与修订


### RLAIF

```yaml
id: rlaif
num: 6
name: RLAIF
full_name: AI反馈强化学习 (RL from AI Feedback)
year: '2023.09'
org: Google
parent: instructgpt
paper_url: https://arxiv.org/abs/2309.00267
project_url: ''
category: rlhf
motivation: AI反馈替代昂贵的人工标注
```

#### 📝 一句话总结
RLAIF 利用现成的 LLM 自动标注偏好来替代人类标注，再通过蒸馏式（训练奖励模型）或直接式（LLM 直接打分）两种方式获取奖励信号进行 RL 训练，在摘要生成、对话等任务上取得与 RLHF 相当甚至更优的人类评分。

#### 🎯 核心要点
- 提出 RLAIF 框架：用 off-the-shelf LLM 替代人类标注者生成偏好标签，大幅降低标注成本
- 两种 RL 训练范式：**蒸馏式 RLAIF**（先训练 Reward Model 再做 RL）和**直接式 RLAIF**（LLM 直接输出 1-10 分作为奖励信号，绕过 RM 训练）
- 位置偏差缓解：对每对候选两次推理（交换顺序）后取平均偏好分布
- Prompt 结构四段式：Preamble + Few-shot Exemplars + Sample + Ending，支持 Chain-of-Thought 推理增强标注质量
- 3 个评估指标：AI Labeler Alignment（AI vs 人类标签准确率）、Win Rate（人工评价胜率）、Harmless Rate（无害率）
- 实验覆盖 3 个任务：摘要生成（TL;DR）、有帮助对话（Helpful Dialogue）、无害对话（Harmless Dialogue）
- 关键发现：AI 标注器和策略模型同尺寸时 RLAIF 仍优于 SFT；直接式 RLAIF 甚至优于蒸馏式

#### 🔬 深入细节
##### 核心框架对比

![RLAIF vs RLHF 框架对比](https://ar5iv.labs.arxiv.org/html/2309.00267/assets/x3.png)
*图：RLAIF（上）用 LLM 替代人类标注生成偏好标签训练 RM，RLHF（下）依赖人类标注者。*

##### AI 偏好标注流程

![AI 偏好标注流程](https://ar5iv.labs.arxiv.org/html/2309.00267/assets/x4.png)
*图：LLM 先进行 Chain-of-Thought 推理（蓝色），将结果拼接回 Prompt 后再次输入 LLM 获取"1" vs "2" 的 log-probability 分布。*

##### 动机与背景

传统 RLHF 的核心瓶颈在于**高质量人类偏好标注的成本高昂且难以规模化**——每对候选响应的对比标注需耗费大量人力与时间。Bai et al. (2022b) 首次提出 RLAIF 概念，但仅验证了"AI+人类混合标签 + Constitutional AI"的组合效果，**未直接回答一个核心问题：AI 反馈能否完全替代人类反馈？** 本文首次在严格控制变量的条件下系统对比 RLAIF 与 RLHF。

##### 偏好标注机制

给定一段上下文和两个候选回答 \(y_1, y_2\)，向 LLM 输入构造好的 Prompt，提取其生成 token "1" 和 "2" 的 log-probability，经 softmax 得到**软偏好分布**：

$$P_{AI} = \text{softmax}(\log P(\text{"1"}), \log P(\text{"2"}))$$

> 💡 关键：使用 soft 标签（如 [0.6, 0.4]）而非 one-hot 硬标签，保留了标注的不确定性信息，对后续 RM 训练更友好。

**位置偏差缓解**：LLM 存在倾向第一位候选的位置偏差（Pezeshkpour & Hruschka, 2023; Wang et al., 2023），本文对每对候选做两次推断——交换顺序后再次评分，最终偏好为两次结果的均值。

**Chain-of-Thought (CoT) 推理**：先让 LLM 生成对两候选质量的文字分析（如"摘要 A 更全面但 B 更简洁…"），将其拼接回 Prompt 后再次输入以得到偏好分布。实验表明 CoT 可提升标注对齐度。

##### 蒸馏式 RLAIF（Distilled RLAIF）

这是标准的 RLAIF 范式，分两步：

**Step 1 — 训练 Reward Model**：用 LLM 标注的软标签训练 RM。损失函数为交叉熵，将 RM 输出的两个 reward score \(r_1, r_2\) 经 softmax 转为概率分布后与 AI 软标签做交叉熵：

$$\mathcal{L}_{RM} = -\sum_{i} P_{AI}(i) \log \frac{e^{r_i}}{\sum_j e^{r_j}}$$

> ⚠️ 注意：训练 RM 本质是对 LLM 标注器的**知识蒸馏**——用更小/更快的模型近似 LLM 的偏好判断。

**Step 2 — RL 训练**：使用 REINFORCE 算法，以 RM 评分作为最终 token 的奖励（中间 token 奖励为 0），Policy Model 以 SFT 模型初始化，Value Model 用于计算优势函数减小方差：

$$\mathcal{L}_{PG}(\theta) = -\sum_t \log \pi_\theta(A_t|X_t) \cdot \overline{(Z_t - V_\psi^\pi(X_t))}$$

其中 \(Z_t = R_T\)（仅在序列终点获得 RM 奖励，\(\gamma=1\)），上划线表示该项不参与梯度计算；Value Model 的损失为 MSE：

$$\mathcal{L}_{VF}(\psi) = \sum_t (V_\psi^\pi(X_t) - Z_t)^2$$

##### 直接式 RLAIF（Direct RLAIF）

绕过 RM 训练，**直接用 LLM 作为在线奖励函数**。LLM 被 Prompt 要求对生成回答在 1-10 分打分，计算各分数 token 的似然加权和：

$$s(x|c) = \sum_{i=1}^{10} i \cdot P(i | x, c)$$

然后标准化到 \([-1, 1]\) 作为 RL 奖励。此方法虽然计算开销更大（当 AI 标注器大于 RM 时），但**免去了 RM 训练带来的信息损失**，实验发现直接式甚至优于蒸馏式。

##### 实验关键结果

| 任务 | RLAIF vs SFT 胜率 | RLHF vs SFT 胜率 | 差异显著性 |
|------|-------------------|-------------------|------------|
| Summarization | 71% | 73% | 不显著 |
| Helpful Dialogue | 63% | 64% | 不显著 |
| Harmless Dialogue (无害率) | 88% | 76% | RLAIF 显著更优 |

RLAIF vs RLHF 直接对比中，双方胜率统计上与 50% 无显著差异（即**人类认为两者质量相当**）。在 Harmless Dialogue 上 RLAIF 无害率更高。

##### 与传统方法的区别

| 维度 | RLHF | RLAIF (本文) |
|------|------|-------------|
| 偏好来源 | 人类标注者 | Off-the-shelf LLM |
| 标注成本 | 极高（人工逐条标注） | 极低（API 调用） |
| 标注可扩展性 | 受限于人力 | 可无限放大 |
| RM 训练 | 硬标签 → RM | 软标签 → RM (蒸馏) |
| 可选路径 | 仅 RM+RL | RM+RL 或 Direct Score+RL |
| 位置偏差处理 | 无需（人类不偏向位置） | 双推断取平均 |

#### 🧪 练习题
```yaml
question: "RLAIF 中缓解 LLM 偏好标注位置偏差的核心策略是什么？"
options:
  - "只对每个候选对做一次推断"
  - "对每对候选交换顺序做两次推断后取平均偏好分布"
  - "使用 one-hot 标签替代软标签"
  - "增加 Few-shot 示例数量"
answer: 1
explain: "LLM 存在偏好第一位候选的位置偏差，两次推断交换候选顺序后取平均可消除偏置影响，这是本文发现小模型上偏差更显著的直接应对。"
```

### DPO

```yaml
id: dpo
num: 7
name: DPO
full_name: 直接偏好优化 (Direct Preference Optimization)
year: '2023.05'
org: Stanford
parent: instructgpt
paper_url: https://arxiv.org/abs/2305.18290
project_url: ''
category: preference
motivation: 无需奖励模型的闭式解对齐
```

#### 📝 一句话总结
DPO 通过奖励函数重参数化技巧将 RLHF 中「显式训练奖励模型 + 强化学习」的两阶段流程简化为单一分类损失，直接从偏好数据中优化语言模型，实现了稳定、轻量的对齐训练。

#### 🎯 核心要点
- 核心创新：将 Bradley-Terry 偏好模型中的奖励函数重参数化为策略概率比的对数形式，消去了显式奖励模型
- 闭式最优解：证明在 KL 约束下，RLHF 最优策略与奖励函数之间存在闭式等价关系 \(r(x,y) = \beta \log \frac{\pi_r(y|x)}{\pi_{\text{ref}}(y|x)} + \beta \log Z(x)\)
- 单一损失函数：最终目标函数是一个二分类交叉熵损失，直接最大化偏好样本的概率，无需采样或强化学习
- 消去了分区函数：Bradley-Terry 模型只依赖奖励之差，代入重参数化后分区函数 \(Z(x)\) 自动抵消
- 稳定训练：无需 Reward Model 训练、无需 PPO 策略搜索、无需从 LM 在线采样，大幅降低计算与调参开销
- 隐式奖励解释：训练后的模型「内隐」一个奖励函数 \(\hat{r}_\theta(x,y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}\)
- 梯度分析：DPO 梯度自动对预测错误的样本赋予更高权重，同时增大偏好响应概率、降低非偏好响应概率

#### 🔬 深入细节
##### 1. 核心示意图

![DPO 核心示意图](https://ar5iv.labs.arxiv.org/html/2305.18290/assets/figures/diagrams/teaser.png)

*图：DPO vs 传统 RLHF 流程对比。传统 RLHF（左）需先训练奖励模型，再用 PPO 优化策略；DPO（右）直接将偏好数据作为分类损失优化语言模型，流程极简。*

##### 2. 从 RLHF 到 DPO 的核心推导

**背景：RLHF 的 Bottleneck**

传统 RLHF（以 InstructGPT 为代表）分三步：
1. **SFT**：在高质量人工标注上微调基础模型得到参考策略 \(\pi_{\text{ref}}\)
2. **Reward Modeling**：收集偏好对比数据 \((x, y_w, y_l)\)，用 Bradley-Terry 模型训练奖励函数：\(p^*(y_1 \succ y_2 | x) = \sigma(r^*(x, y_1) - r^*(x, y_2))\)
3. **PPO 优化**：以学到的奖励函数为信号最大化期望奖励，同时加 KL 约束防止偏离 \(\pi_{\text{ref}}\) 过远

> ⚠️ **痛点**：步骤 2 训练奖励模型需要大量偏好数据和计算，步骤 3 的 PPO 在语言模型空间中进行不稳定、超参数敏感、需要在线采样。

**关键洞察：奖励 → 策略的闭式等价**

上述 KL 约束 RLHF 问题存在闭式解（论文附录 A.1）：

$$\pi_r(y|x) = \frac{1}{Z(x)} \pi_{\text{ref}}(y|x) \exp\left(\frac{1}{\beta} r(x,y)\right)$$

取对数重排得到 **奖励函数重参数化**（核心公式 Eq.5）：

$$r(x,y) = \beta \log \frac{\pi_r(y|x)}{\pi_{\text{ref}}(y|x)} + \beta \log Z(x)$$

这意味着：**给定最优策略 \(\pi_r\) 和参考策略 \(\pi_{\text{ref}}\)，可反解出对应奖励函数——策略本身「内隐」了奖励信息。**

> 💡 **关键**：这正是论文标题 "Your Language Model is Secretly a Reward Model" 的由来——DPO 训练后的语言模型同时扮演了奖励模型的角色。

**代入 Bradley-Terry 消去 \(Z(x)\)**

Bradley-Terry 偏好概率只依赖奖励之差：
$$p^*(y_w \succ y_l | x) = \sigma(r^*(x, y_w) - r^*(x, y_l))$$

代入重参数化：
$$r^*(x, y_w) - r^*(x, y_l) = \beta \log \frac{\pi^*(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi^*(y_l|x)}{\pi_{\text{ref}}(y_l|x)}$$

**\(Z(x)\) 项相减时自动消去！** 这是 DPO 方法最精妙的设计——无需显式估计昂贵的分区函数。

**DPO 损失函数**

由此将 RLHF 转化为简单的最大似然分类问题。定义隐式奖励 \(\hat{r}_\theta(x,y) = \beta \log \frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}\)，DPO 损失为：

$$\mathcal{L}_{\text{DPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma\left( \beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)} \right) \right]$$

##### 3. 算法伪代码

```python
# DPO 训练流程伪代码
def dpo_train(pi_ref, dataset, beta, optimizer, epochs):
    """pi_ref: 冻结的参考策略（SFT模型）"""
    pi_theta = copy_params(pi_ref)  # 初始化训练策略

    for epoch in range(epochs):
        for (x, y_w, y_l) in dataset:
            # 1. 计算对数概率（训练模型 vs 参考模型）
            log_pi_w   = pi_theta.log_prob(y_w | x)
            log_pi_l   = pi_theta.log_prob(y_l | x)
            log_ref_w  = pi_ref.log_prob(y_w | x)
            log_ref_l  = pi_ref.log_prob(y_l | x)

            # 2. 隐式奖励差异
            reward_w    = beta * (log_pi_w - log_ref_w)
            reward_l    = beta * (log_pi_l - log_ref_l)
            reward_diff = reward_w - reward_l

            # 3. 二分类交叉熵 = -log(sigmoid(diff))
            loss = -log(sigmoid(reward_diff))

            # 4. 反向传播
            loss.backward()
            optimizer.step()
```

##### 4. 梯度分析 — DPO 学到了什么？

对 DPO 损失求梯度（论文 Eq.7）：

$$\nabla_\theta \mathcal{L}_{\text{DPO}} = -\beta \mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \sigma(\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w)) \cdot \left[ \nabla_\theta \log \pi(y_w|x) - \nabla_\theta \log \pi(y_l|x) \right] \right]$$

此梯度公式揭示的学习机制：
- **自适应加权**：\(\sigma(\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w))\) 当模型「搞反了」（给非偏好响应更高隐式奖励）时接近 1，梯度更新大；已正确区分时接近 0，梯度自然衰减
- **对比方向**：+∇θ log π(y_w|x) 拉高偏好响应概率，-∇θ log π(y_l|x) 压低非偏好响应概率。本质上是对偏好数据的**对比学习**
- 直觉：DPO 像「拉-推」机制——往偏好方向拉、推开非偏好方向，力度自适应：错越多，纠正越猛

##### 5. 与 PPO-RLHF 的本质差异

| 维度 | PPO-RLHF | DPO |
|------|----------|-----|
| **奖励建模** | 需显式训练 Reward Model | 无需，策略隐式编码奖励 |
| **优化方式** | 强化学习（PPO），需在线采样 | 监督式分类损失，纯离线 |
| **训练稳定性** | 易崩溃，需大量调参 | 稳定，标准交叉熵优化 |
| **计算开销** | 高（4 模型：Policy + Value + Reward + Ref） | 低（2 模型：Policy + Ref） |
| **采样需求** | 每步需从策略在线采样 | 仅需离线偏好数据集 |
| **超参数** | 学习率、KL 系数、clip 范围、GAE 参数… | 仅 β（KL 惩罚系数）和学习率 |

> ⚠️ **注意**：β 是 DPO 最关键的参数。过小→偏离参考模型过远（reward hacking 风险），过大→过于保守（学习不充分）。论文经验值 β ∈ [0.01, 0.5] 按任务调节。

##### 6. 实验验证要点

DPO 在三大任务上验证：
- **情感控制**（IMDb）：控制正/负面情感倾向优于 PPO-RLHF，生成文本质量波动更小
- **摘要生成**（TL;DR/Reddit）：Rouge 和人评 Win Rate 匹配或超越已有方法
- **单轮对话**（Anthropic HH）：与 Pythia 6.9B 组合，达到与更大 PPO 模型相当的对话质量

#### 🧪 练习题
```yaml
question: "DPO 方法中，为什么分区函数 Z(x) 不会出现在最终的损失函数中？"
options:
  - "因为 Z(x) 可通过蒙特卡洛采样近似计算"
  - "Bradley-Terry 模型只依赖奖励之差，代入重参数化后 Z(x) 项相减抵消"
  - "因为 DPO 不需要参考模型所以 Z(x)=1"
  - "训练时自动学习了一个归一化层吸收 Z(x)"
answer: 1
explain: "重参数化 r(x,y)=β log(π_r/π_ref)+β log Z(x) 代入 Bradley-Terry 后两个 Z(x) 相减自消，这是 DPO 避免显式估计分区函数的核心设计。"
```

### IPO

```yaml
id: ipo
num: 8
name: IPO
full_name: 恒等映射偏好优化 (Identity Preference Optimization)
year: '2023.10'
org: Google DeepMind
parent: dpo
paper_url: https://arxiv.org/abs/2310.12036
project_url: ''
category: preference
motivation: 移除BT假设缓解过拟合
```

#### 📝 一句话总结
IPO 提出了 ΨPO 通用偏好优化框架，统一了 RLHF 和 DPO，并通过将非线性映射 \(\Psi\) 设为恒等函数（identity），推导出无需 Bradley-Terry 奖励模型假设即可直接从 pairwise 偏好数据学习策略的 IPO 算法，从理论上解决了 DPO 因隐式依赖 BT 假设而导致的过拟合问题。

#### 🎯 核心要点
- **ΨPO 统一框架**：提出通用目标函数 \(J_{\Psi PO}(\pi) = \mathbb{E}[\Psi(p^*(y_1 \succ y_2))] \cdot \log \frac{\pi(y_1)}{\pi(y_2)}\)，通过选择不同的 \(\Psi\) 函数统一 RLHF（\(\Psi = \log\frac{q}{1-q}\)）和 IPO（\(\Psi = \text{id}\)）
- **移除 Bradley-Terry 假设**：IPO 直接优化 pairwise 偏好概率，无需将偏好转化为 pointwise 奖励，避免了 BT 模型不成立时的系统性偏差
- **DPO 过拟合的理论分析**：证明 DPO 在确定性偏好（\(p^*=1\)）下无论正则化强度 \(\tau\) 如何，最优策略均退化为确定性策略，完全忽略参考策略 \(\pi_{\text{ref}}\)
- **IPO 损失函数**：采样版 IPO 损失为简洁的 MSE 回归形式 \(\mathbb{E}[(h_\pi(y_w, y_l) - \frac{1}{2\tau})^2]\)，其中 \(h_\pi\) 为策略与参考策略的对数似然比之差
- **唯一全局最优**：Theorem 2 证明在 KL 正则化下 IPO 目标函数存在唯一全局最优策略
- **正则化始终生效**：与 DPO 不同，IPO 通过控制对数似然比的 gap 始终将策略正则化向 \(\pi_{\text{ref}}\)，\(\tau\) 越大正则化越强

#### 🔬 深入细节
![IPO 与 DPO 学习曲线对比](https://arxiv.org/html/2310.12036v1/x2.png)
*图：IPO 与 DPO 在三动作 bandit 设定下的学习曲线对比。DPO 将未观测动作概率压至 0（过拟合），而 IPO 通过 \(\tau\) 控制正则化强度，保持对未观测动作的合理概率分配。*

```python
# Sampled IPO 伪代码 (Algorithm 1)
# 输入: 偏好数据集 D = {(x, y_w, y_l)}, 参考策略 π_ref, 温度 τ

def h_pi(y_w, y_l, x, pi, pi_ref):
    """计算策略与参考策略的对数似然比之差"""
    return (log(pi(y_w|x)) - log(pi_ref(y_w|x))) - \
           (log(pi(y_l|x)) - log(pi_ref(y_l|x)))

# 从 π = π_ref 开始训练
pi = copy(pi_ref)

for batch in DataLoader(D):
    x, y_w, y_l = batch
    # IPO 损失: MSE 回归到 1/(2τ)
    loss = mean((h_pi(y_w, y_l, x, pi, pi_ref) - 1/(2*tau))**2)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 动机与背景：DPO 的隐含缺陷

RLHF 的标准流程分为两步：(1) 基于 Bradley-Terry 模型从偏好数据训练奖励模型；(2) 用 PPO 等 RL 算法优化策略。DPO 将这两步合并为一步，直接从偏好数据优化策略，避免了 RL 训练的不稳定性。然而，DPO 的推导**本质上仍然依赖 Bradley-Terry 假设**——它假设 pairwise 偏好可以分解为 pointwise 奖励的函数：

$$p^*(y_1 \succ y_2) = \sigma(r^*(y_1) - r^*(y_2))$$

这一假设在现实中常常不成立。人类偏好可能是非传递的（A > B, B > C, 但 C > A），或者无法用单一标量奖励刻画。当 BT 假设不成立时，DPO 会将偏好数据强行拟合到一个不存在的奖励函数上，导致**过拟合到偏好数据的噪声而非真实偏好结构**。

> ⚠️ 注意：DPO 的过拟合不仅是经验现象，而是理论上可证明的。论文 Section 4.2 证明：当偏好为确定性（\(p^*(y_1 \succ y_2) = 1\)）时，DPO 的最优策略为 \(\pi^*(y_1) = 1, \pi^*(y_2) = 0\)，**与正则化强度 \(\tau\) 完全无关**。这意味着 DPO 的 KL 正则化在极端偏好下完全失效。

##### 核心机制一：ΨPO 统一框架

论文首先提出了一个通用的偏好优化目标，称为 ΨPO：

$$J_{\Psi PO}(\pi, \pi_{\text{ref}}) = \underset{\substack{y \sim \mu \\ y' \sim \mu}}{\mathbb{E}} \left[ \Psi(p^*(y \succ y')) \left( \log \frac{\pi(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi(y')}{\pi_{\text{ref}}(y')} \right) \right]$$

其中 \(\Psi: [0,1] \to \mathbb{R}\) 是一个非递减映射函数，\(p^*(y \succ y')\) 是真实偏好概率，\(\mu\) 是采样分布。

**关键洞察**：不同的 \(\Psi\) 选择对应不同的算法：

| \(\Psi\) 选择 | 对应算法 | 含义 |
|---|---|---|
| \(\Psi(q) = \log\frac{q}{1-q}\)（logit 函数） | RLHF / DPO | 将偏好概率映射为 BT 奖励差 |
| \(\Psi(q) = q\)（恒等函数） | **IPO** | 直接使用偏好概率 |

当 \(\Psi\) 为 logit 函数时，\(\Psi(p^*) = \log\frac{p^*}{1-p^*}\)。若 BT 模型成立，则 \(\Psi(p^*) = r^*(y) - r^*(y')\)，ΨPO 退化为标准 RLHF 目标。但当 BT 模型不成立时，logit 映射会放大极端偏好（\(p^* \to 0\) 或 \(p^* \to 1\) 时 logit 趋向 \(\pm\infty\)），导致过拟合。

> 💡 关键：IPO 选择 \(\Psi = \text{identity}\) 的核心原因是**避免 logit 函数在极端偏好处的发散**。恒等映射保持偏好概率的有界性，使正则化始终有效。

##### 核心机制二：IPO 目标函数推导

将 \(\Psi(q) = q\) 代入 ΨPO 框架，IPO 的目标函数为：

$$J_{IPO}(\pi, \pi_{\text{ref}}) = \underset{y, y' \sim \mu}{\mathbb{E}} \left[ p^*(y \succ y') \left( \log \frac{\pi(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi(y')}{\pi_{\text{ref}}(y')} \right) \right]$$

加入 KL 正则化后，完整优化问题为：

$$\pi^*_{IPO} = \arg\max_\pi \left\{ J_{IPO}(\pi, \pi_{\text{ref}}) - \tau \cdot \text{KL}(\pi \| \pi_{\text{ref}}) \right\}$$

**Theorem 1**（最优策略的充要条件）：策略 \(\pi^*\) 是 IPO 的最优策略，当且仅当对所有 \(y, y'\)：

$$\log \frac{\pi^*(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi^*(y')}{\pi_{\text{ref}}(y')} = \frac{1}{\tau} \left( p^*(y \succ_\mu y') - p^*(y' \succ_\mu y) \right)$$

其中 \(p^*(y \succ_\mu y') = \mathbb{E}_{y'' \sim \mu}[p^*(y \succ y'')]\) 是对采样分布 \(\mu\) 的边际偏好。

这个条件的直觉是：**最优策略相对于参考策略的对数似然比之差，正比于两个动作的边际偏好差**。正则化参数 \(\tau\) 控制这个比例——\(\tau\) 越小，策略越偏离参考策略以追求偏好；\(\tau\) 越大，策略越接近参考策略。

**Theorem 2**（唯一性）：IPO 的最优策略是唯一的，给出闭式解：

$$\pi^*(y) \propto \pi_{\text{ref}}(y) \cdot \exp\left(\frac{p^*(y \succ_\mu \cdot)}{\tau}\right)$$

##### 核心机制三：从总体损失到采样损失

总体 IPO 损失函数为：

$$\mathcal{L}_{IPO}(\pi) = \underset{y, y' \sim \mu}{\mathbb{E}} \left[ \left( h_\pi(y, y') - \frac{p^*(y \succ_\mu \cdot) - p^*(y' \succ_\mu \cdot)}{\tau} \right)^2 \right]$$

其中 \(h_\pi(y, y') = \log\frac{\pi(y)\pi_{\text{ref}}(y')}{\pi(y')\pi_{\text{ref}}(y)}\)。

然而，边际偏好 \(p^*(y \succ_\mu \cdot)\) 在实际中不可直接获取。论文利用偏好对 \((y_w, y_l)\) 的对称性，巧妙推导出**采样版损失**：

$$\mathcal{L}_{IPO}^{\text{sampled}}(\pi) = \underset{(y_w, y_l) \sim D}{\mathbb{E}} \left[ \left( h_\pi(y_w, y_l) - \frac{1}{2\tau} \right)^2 \right]$$

> 💡 关键：采样损失的推导利用了 \(h_\pi(y_w, y_l) + h_\pi(y_l, y_w) = 0\) 的反对称性。将 \((y_w, y_l)\) 视为"偏好标签为 1"的样本，\((y_l, y_w)\) 视为"偏好标签为 0"的样本，两项合并后得到目标值 \(\frac{1}{2\tau}\)。

这个损失函数的物理含义极为清晰：**IPO 将策略与参考策略的对数似然比之差回归到常数 \(\frac{1}{2\tau}\)**。这意味着：
1. 对于每一对 \((y_w, y_l)\)，IPO 要求 \(\pi\) 相对于 \(\pi_{\text{ref}}\) 对 \(y_w\) 的偏好程度恰好为 \(\frac{1}{2\tau}\)
2. \(\tau\) 越小，要求的偏好 gap 越大，策略越偏离参考策略
3. \(\tau\) 越大，要求的偏好 gap 越小，策略越接近参考策略

##### 与 DPO 的关键区别

| 特性 | DPO | IPO |
|---|---|---|
| 偏好模型假设 | 依赖 Bradley-Terry 模型 | 无需 BT 假设，直接使用偏好概率 |
| 损失函数形式 | 交叉熵（logistic loss） | MSE 回归 |
| 正则化行为 | 确定性偏好下 \(\tau\) 失效 | \(\tau\) 始终控制策略与 \(\pi_{\text{ref}}\) 的距离 |
| 极端偏好处理 | logit 发散导致过拟合 | 恒等映射保持有界 |
| 目标值 | 使 \(\sigma(h_\pi) \to 1\)（无上界） | 使 \(h_\pi \to \frac{1}{2\tau}\)（有界目标） |

论文通过三个 bandit 实验验证了上述理论分析：

1. **二动作确定性偏好**（\(\mathcal{D}_1\)）：DPO 收敛到确定性策略 \(\pi(y_1)=1\)，无视 \(\tau\)；IPO 收敛到 \(\pi^*(y_1) = \frac{e^{1/\tau}}{1+e^{1/\tau}}\)，\(\tau\) 有效控制偏好强度
2. **二动作随机偏好**（\(\mathcal{D}_2\)）：DPO 仍然过拟合到采样偏好；IPO 保持稳定
3. **三动作部分观测**（\(\mathcal{D}_3\)）：仅观测 \(y_1 \succ y_2\) 和 \(y_2 \succ y_3\)。DPO 将未直接比较的 \(y_3\) 概率压至 0；IPO 通过 \(\tau\) 合理分配概率

#### 🧪 练习题
```yaml
question: "IPO 采样损失函数中，目标回归值 1/(2τ) 的物理含义是什么？"
options:
  - "偏好对 (y_w, y_l) 的 Bradley-Terry 奖励差"
  - "策略 π 与参考策略 π_ref 的 KL 散度上界"
  - "策略相对于参考策略对 y_w 与 y_l 的对数似然比之差的期望目标"
  - "偏好数据集中 y_w 被选中的经验概率"
answer: 2
explain: "IPO 损失要求 h_π(y_w, y_l) = log(π(y_w)π_ref(y_l)/(π(y_l)π_ref(y_w))) 回归到 1/(2τ)，即控制策略相对于参考策略对优选与劣选响应的对数似然比之差为固定常数，τ 越小目标值越大，策略越偏离参考策略。"
```

### KTO

```yaml
id: kto
num: 9
name: KTO
full_name: 前景理论优化 (Kahneman-Tversky Optimization)
year: '2024.02'
org: Stanford
parent: dpo
paper_url: https://arxiv.org/abs/2402.01306
project_url: ''
category: preference
motivation: 仅需二元信号无需成对数据
```

#### 📝 一句话总结
KTO 将 Kahneman-Tversky 前景理论中的**价值函数**引入 LLM 对齐，定义了**人类感知损失函数 (HALOs)** 的理论框架，并提出仅需 **desirable/undesirable 二元信号**的 KTO 损失函数——直接最大化输出的**前景效用**而非偏好对数似然，从而摆脱对昂贵成对偏好数据的依赖。

#### 🎯 核心要点
- 提出 **HALOs (Human-Aware Loss Functions)** 的概念框架：对齐损失函数需满足前景理论中人类感知偏差（损失厌恶、边际递减敏感性）的特性和概率权重
- 定义 HALO 的两个充分条件：(1) 损失函数必须为**人类值函数**的非线性变换；(2) 概率需经**权重函数**扭曲
- 基于 Kahneman-Tversky 的**累积前景理论**推导出 KTO 损失函数：对各输出采用非对称效用评分，desirable 输出用增益区 (convex)，undesirable 输出用损失区 (concave, loss-averse)
- KTO **不需要偏好对**，仅需知道给定输入下某个输出是 desirable 还是 undesirable（二元信号）
- KTO 可直接处理二分类标注数据，极大降低数据采集成本（用户点赞/点踩、审核通过/驳回等）
- 在 1B~30B 参数量级匹配或超越 DPO 性能，即使将偏好数据拆成 2n 个二元样本后仍优于 DPO
- 支持**极端数据不平衡**：即使 desirable 样本仅剩 10%，KTO 仍能保持性能
- 当预训练模型足够好时，KTO 可**跳过 SFT** 直接对齐，而 DPO 无 SFT 则显著退化

#### 🔬 深入细节
##### 示意图

![KTO vs 传统方法数据需求对比](https://ar5iv.labs.arxiv.org/html/2402.01306/assets/images/fig1.png)
*图：KTO 与传统 RLHF/DPO 的数据需求对比。传统方法需要昂贵的成对偏好数据 (x, y_w, y_l)，而 KTO 仅需知道每个输出是"好"还是"坏"的二元信号，数据来源更丰富、成本更低。*

##### 算法伪代码

```python
# KTO 损失函数（简化版）
def kto_loss(pi_theta, pi_ref, x, y, label, lambda_D, lambda_U, beta):
    """
    x: 输入提示
    y: 模型生成的输出
    label: 1 表示 desirable (好), 0 表示 undesirable (坏)
    """
    # 对数概率比
    log_ratio = pi_theta.log_prob(y|x) - pi_ref.log_prob(y|x)
    r = beta * log_ratio  # 隐式奖励
    
    if label == 1:  # Desirable 输出 → 增益区
        # 前景理论值函数 v(x) = x^α (x ≥ 0), convex gain
        v = r ** alpha  
        # KTO 目标: 最大化期望效用 - KL 惩罚
        loss = -lambda_D * sigma_gain(v - z_ref)  # z_ref 为参考点
    else:  # Undesirable 输出 → 损失区
        # v(x) = -λ * |x|^α (x < 0), concave + 损失厌恶 (λ > 1)
        v = -lambda_loss * (-r) ** alpha
        loss = -lambda_U * sigma_loss(z_ref - v)
    
    return loss
```

##### 方法详解

**1. 动机：偏好数据的获取瓶颈**

传统对齐方法（RLHF、DPO）的核心痛点在于**成对偏好数据**的获取成本极高。每个训练样本需要标注员对同一 prompt 的两个输出进行偏好比较 (x, y_w, y_l)。这种数据不仅昂贵、缓慢，而且在生产环境中难以规模化。相比之下，**二元信号**（如点赞/点踩、通过/拒绝）在真实世界中无处不在、便宜且快速。

KTO 的核心洞察是：**如果损失函数本身具备正确的人类感知偏差（前景理论），那么二元信号就足够了，不需要显式的成对偏好比较。**

**2. HALO 理论框架**

作者首先定义了一类称为 HALO 的损失函数。前景理论（Kahneman & Tversky, 1979/1992）揭示了人类决策的两大特征：

- **价值函数**：相对于参考点，人类对损失比收益更敏感（损失厌恶，λ ≈ 2.25），且对收益呈 concave（风险规避），对损失呈 convex（风险寻求）
- **概率权重函数**：人类倾向于高估小概率事件、低估中大概率事件

HALO 的**充分条件**：
- 损失函数可表达为 $$\ell(r) = -u(r)$$ 形式，其中 $$u(\cdot)$$ 须为满足前景理论特性的**人类效用函数**
- 概率通过逆 S 形权重函数 $$w(p)$$ 进行扭曲

作者证明 DPO、PPO、SLiC 等流行方法都隐式满足 HALO 条件，这解释了它们成功的原因——**和使用的数据无关，而是损失函数本身捕捉了人类偏好结构**。

> 💡 **关键洞察**：既然 HALOs 的有效性来自其函数形式而非数据形式，完全可以用更弱的监督信号（二元标签）来驱动它。

**3. KTO 损失函数推导**

KTO 直接基于 **Tversky & Kahneman (1992)** 的累积前景理论。传统 RLHF/DPO 最大化 **Bradley-Terry 偏好模型中隐含的对数似然**，而 KTO 最大化**每个独立输出的前景理论效用**。

具体地，对于输入 $$x$$ 和输出 $$y$$，定义隐式奖励：
\[
r_{\theta}(x, y) = \beta \log \frac{\pi_{\theta}(y|x)}{\pi_{\text{ref}}(y|x)}
\]

前景理论值函数（参数化版本）：
\[
v(r) = \begin{cases}
r^{\alpha} & r \geq 0 \quad \text{(收益区)}\\
-\lambda |r|^{\alpha} & r < 0 \quad \text{(损失区，λ>1 引入损失厌恶)}
\end{cases}
\]

KTO 损失：
\[
\mathcal{L}_{\text{KTO}} = \mathbb{E}_{(x,y_{\text{good}})\sim\mathcal{D}}\left[
\lambda_D \cdot \sigma\left(\beta \log\frac{\pi_\theta(y_{\text{good}}|x)}{\pi_{\text{ref}}(y_{\text{good}}|x)} - z_0\right)
\right]
\]
\[
+ \mathbb{E}_{(x,y_{\text{bad}})\sim\mathcal{D}}\left[
\lambda_U \cdot \sigma\left(z_0 - \beta \log\frac{\pi_\theta(y_{\text{bad}}|x)}{\pi_{\text{ref}}(y_{\text{bad}}|x)}\right)
\right]
\]

其中 $$z_0$$ 是学习到的参考点，$$\lambda_D, \lambda_U$$ 平衡两类样本的权重。

> ⚠️ **与 DPO 的关键区别**：DPO 的损失要求同一 prompt 的 **一对** 输出同时出现在一个 batch 中进行对比。而 KTO 每个样本**独立计算效用**，batch 内不需要对 prompt 做配对约束——这使得数据组织、shuffling、分布式训练都更灵活。

**4. 训练与推理流程**

- **数据准备**：收集 (x, y, label) 三元组，label ∈ {desirable, undesirable}。数据来源：任何带有二元反馈的信号源（点赞/点踩、人工审批、规则筛选等）
- **训练**：与 DPO 相同的前向传播结构（同时计算 π_θ 和 π_ref 的 log prob），但 KTO 每步迭代在 batch 内独立计算各样本效用后聚合
- **推理**：仅使用 π_θ（Policy Model），与标准 LLM 解码完全一致
- **超参数**：β（温度系数）、λ_D / λ_U（desirable/undesirable 样本权重）、α（值函数曲率参数）、λ（损失厌恶系数），论文推荐 λ_D = λ_U = 1.0 作为默认

**5. 实验结果亮点**

- 在 1B/7B/13B/30B 四个规模上，KTO 匹配或超越 DPO（使用相同数据源时）
- **反直觉发现**：将 DPO 的 n 对偏好数据拆成 2n 个独立二元样本喂给 KTO，效果反而更好——说明"较弱监督 + 更强归纳偏置 > 较强监督 + 较弱归纳偏置"
- 极端数据不平衡下 KTO 鲁棒：desirable 样本仅剩 10% 时仍保持性能
- 可跳过 SFT 直接训练（预训练模型足够好时），而 DPO 无 SFT 效果显著下降

#### 🧪 练习题
```yaml
question: "KTO 损失函数相比 DPO 最核心的优势是什么？"
options:
  - "使用了更复杂的 Transformer 架构"
  - "仅需 binary (desirable/undesirable) 标签，无需成对偏好数据"
  - "需要更大的训练 batch size"
  - "引入了对抗训练机制"
answer: 1
explain: "KTO 基于前景理论值函数直接将二元信号转化为效用最大化问题，摆脱了 DPO 对成对偏好数据 (y_w, y_l) 的依赖，大幅降低数据采集成本。"
```

### ORPO

```yaml
id: orpo
num: 10
name: ORPO
full_name: 无参考模型偏好优化 (Odds Ratio Preference Optimization)
year: '2024.03'
org: KAIST
parent: dpo
paper_url: https://arxiv.org/abs/2403.07691
project_url: ''
category: preference
motivation: SFT与对齐单阶段整合
```

#### 📝 一句话总结
ORPO 提出了一种**无参考模型（reference-free）的单阶段偏好对齐方法**，将监督微调（SFT）和偏好对齐统一到单个训练阶段中，通过引入基于**胜率比（odds ratio）**的惩罚项 $\mathcal{L}_{\text{OR}}$ 直接区分 chosen 和 rejected 响应，消除了 RLHF/DPO 对参考模型和额外偏好对齐阶段的需求，在 $\leq 7$B 规模模型上以更少的计算开销超越了 SFT、RLHF 和 DPO。

#### 🎯 核心要点
- **单阶段训练**：将监督微调（SFT）和偏好对齐合并为一个训练过程，无需 SFT warm-up + 独立的偏好对齐阶段
- **无参考模型**：不需要 reference model（对比 DPO 需要冻结的参考策略），减少 50% 的前向传播开销（每次 batch 只需一次前向）
- **Odds Ratio 惩罚**：使用 $\text{odds}_\theta(y|x) = \frac{P_\theta(y|x)}{1 - P_\theta(y|x)}$ 而非概率比（probability ratio）来计算偏好损失，胜率比对不偏好响应的区分更温和，避免过度抑制
- **核心发现**：SFT 阶段 chosen 和 rejected 的 log probability 会**同步上升**，因此仅靠 SFT 的 NLL loss 无法区分偏好，需要额外信号
- **统一损失函数**：$\mathcal{L}_{\text{ORPO}} = \mathcal{L}_{\text{SFT}} + \lambda \cdot \mathcal{L}_{\text{OR}}$，其中 $\mathcal{L}_{\text{OR}} = -\log\sigma\left(\log\frac{\text{odds}_\theta(y_w|x)}{\text{odds}_\theta(y_l|x)}\right)$
- **实验验证**：OPT (125M/350M/1.3B)、Phi-2 (2.7B)、Llama-2 (7B)、Mistral (7B) 上训练，在 AlpacaEval 2.0 上 Mistral-ORPO-$\beta$ 达 12.20%，MT-Bench 达 7.32，超越更大规模的 Zephyr-$\beta$ (7B)

#### 🔬 深入细节
##### 1. 动机：SFT 阶段的困境

传统偏好对齐（RLHF → DPO）的两阶段流程：
1. **SFT**：用 chosen 响应的 NLL loss 微调模型，适应指令格式
2. **偏好对齐**：用 chosen vs rejected 偏好对训练奖励信号

ORPO 的作者通过实验发现：在 SFT 阶段，**chosen 和 rejected 响应的 log probability 会同时上升**（Figure 3），这意味着 SFT 虽然提升了模型在目标领域的生成能力，但并不能区分优劣响应。因此需要额外的偏好对齐阶段。

![Figure 2: 对齐方法对比](https://arxiv.org/html/2403.07691v2/figures/fig2.png)
*图：ORPO 与传统对齐方法的对比。ORPO 将 SFT 和偏好对齐统一为单阶段训练，无需参考模型。*

##### 2. 核心机制：Odds Ratio

ORPO 的核心创新在于用 **odds ratio（胜率比）**替代 probability ratio（概率比）来衡量 chosen vs rejected 响应的差异：

$$\text{odds}_\theta(y|x) = \frac{P_\theta(y|x)}{1 - P_\theta(y|x)}$$

$$\text{OR}_\theta(y_w, y_l) = \frac{\text{odds}_\theta(y_w|x)}{\text{odds}_\theta(y_l|x)}$$

为什么用 odds ratio 而非 probability ratio（如 DPO 所用）？原因有二：

- **分布更宽**：在相同输入概率对 $(X_1, X_2)$ 下，$\log\text{OR}(X_2|X_1)$ 的分布范围远宽于 $\log\text{PR}(X_2|X_1)$（Figure 6）。当 loss 通过 log-sigmoid 函数最小化时，probability ratio 需要更极端的区分度才能降低 loss，这会**过度抑制** disfavored 响应的 logits
- **温和区分**：在 SFT + 偏好对齐联合训练的场景下，模型尚未适应目标领域，odds ratio 的温和区分避免了过早、过度地惩罚 rejected 响应中的有效 token

![Figure 6: log PR vs log OR 分布](https://arxiv.org/html/2403.07691v2/figures/fig6.png)
*图：log Probability Ratio（含不同β）和 log Odds Ratio 的采样分布对比。log OR 分布范围更宽，区分更温和。*

##### 3. 损失函数

ORPO 的完整训练目标：

$$\mathcal{L}_{\text{ORPO}} = \mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}}\left[\mathcal{L}_{\text{SFT}}(x, y_w) + \lambda \cdot \mathcal{L}_{\text{OR}}(x, y_w, y_l)\right]$$

其中：
- **SFT Loss**：仅有 chosen 响应的标准交叉熵
  $$\mathcal{L}_{\text{SFT}} = -\frac{1}{|y_w|}\sum_{t=1}^{|y_w|} \log P_\theta(y_w^{(t)} | x, y_w^{(<t)})$$

- **OR Loss**（核心创新）：基于 log odds ratio 的偏好损失
  $$\mathcal{L}_{\text{OR}} = -\log\sigma\left(\log\frac{\text{odds}_\theta(y_w|x)}{\text{odds}_\theta(y_l|x)}\right)$$
  其中 $\sigma$ 是 sigmoid 函数。最小化此 loss 等价于**最大化 chosen 响应对 rejected 响应的胜率比**。

- **$\lambda$**：平衡 SFT 和偏好对齐的权重，通常设为 $\lambda = 0.1$

##### 4. 训练流程伪代码

```python
# ORPO 训练循环
for batch in dataloader:
    x, y_w, y_l = batch  # 输入、chosen 响应、rejected 响应
    
    # 单次前向传播（无 reference model）
    logits_w = model(x, y_w)  # chosen 响应的 logits
    logits_l = model(x, y_l)  # rejected 响应的 logits（可选共享编码）
    
    # 1. SFT Loss：仅 chosen 序列的 NLL
    loss_sft = cross_entropy(logits_w, y_w)  # 逐 token 平均
    
    # 2. OR Loss：odds ratio 偏好损失
    logp_w = log_softmax(logits_w).gather(y_w).sum() / len(y_w)  # 序列级 log prob
    logp_l = log_softmax(logits_l).gather(y_l).sum() / len(y_l)
    
    odds_w = logp_w - log(1 - exp(logp_w) + eps)  # log odds
    odds_l = logp_l - log(1 - exp(logp_l) + eps)
    
    loss_or = -log_sigmoid(odds_w - odds_l)  # log sigmoid(log OR)
    
    # 3. 总损失
    loss = loss_sft + lambda * loss_or
    
    loss.backward()
    optimizer.step()
```

##### 5. 与传统方法的对比

| 方法 | 阶段数 | 参考模型 | 损失函数组成 | 前向传播次数/batch |
|------|--------|----------|-------------|-------------------|
| SFT | 1 | — | $\mathcal{L}_{\text{NLL}}$ | 1 |
| RLHF (PPO) | 2–3 | $\pi_{\text{ref}}$ | $\mathcal{L}_{\text{NLL}} + \mathcal{L}_{\text{PPO}}$ | 2 (actor + ref) |
| DPO | 2 | $\pi_{\text{ref}}$ | $\mathcal{L}_{\text{DPO}}$ | 2 (policy + ref) |
| **ORPO** | **1** | **—** | $\mathcal{L}_{\text{SFT}} + \lambda\mathcal{L}_{\text{OR}}$ | **1** |

ORPO 的核心优势：
- 消除参考模型，内存占用减半
- 单阶段训练，无需 SFT checkpoint 保存/加载
- odds ratio 在 SFT 阶段提供适度的偏好信号，避免 probability ratio 的过度惩罚

##### 6. 关键实验结果

- **AlpacaEval 2.0**：Mistral-ORPO-$\alpha$ (7B) 达 11.33%，Mistral-ORPO-$\beta$ (7B) 达 **12.20%**，超越 Zephyr-$\beta$ (7B, 10.99%) 和 Llama-2-Chat (70B)
- **MT-Bench**：Mistral-ORPO 系列达 7.23–7.32，与 GPT-3.5-turbo (7.94) 差距缩小
- **跨尺度一致**：ORPO 在 OPT 125M → 1.3B 和 Phi-2 2.7B 上均一致优于 SFT 和 DPO（Table 2）
- **Reward 分布**：ORPO 的奖励分布比 RLHF（SFT+PPO）更集中且向右偏移（Figure 5），表明更稳定的偏好优化

#### 🧪 练习题
```yaml
1. **Odds Ratio vs Probability Ratio**：假设 $P_\theta(y_w|x)=0.6$ 和 $P_\theta(y_l|x)=0.4$，分别计算 probability ratio 和 odds ratio，并讨论当 $P_\theta(y_l|x) \to 0$ 时两者的行为差异。

2. **Loss 梯度推导**：推导 $\mathcal{L}_{\text{OR}}$ 对 $\log P_\theta(y_w|x)$ 和 $\log P_\theta(y_l|x)$ 的梯度，解释 ORPO 如何同时提升 chosen 概率并抑制 rejected 概率。

3. **为什么不能只用 SFT？** 基于 Figure 3 的发现（chosen 和 rejected log prob 在 SFT 中同步上升），论证为什么仅靠 SFT 无法完成偏好对齐。

4. **$\lambda$ 的敏感性**：如果 $\lambda$ 设置过大（如 $\lambda=1.0$），会如何影响模型在 SFT 目标上的表现？试从 odds ratio 的分布特性（Figure 6）分析。

5. **扩展实验设计**：ORPO 目前仅在 $\leq 7$B 模型上验证。设计一个实验方案来评估 ORPO 在 70B+ 规模模型上的有效性，包括预期的挑战和评估指标。
```

### SimPO

```yaml
id: simpo
num: 11
name: SimPO
full_name: 简单偏好优化 (Simple Preference Optimization)
year: '2024.05'
org: Princeton
parent: dpo
paper_url: https://arxiv.org/abs/2405.14734
project_url: ''
category: preference
motivation: 长度归一化消除长度偏见
```

#### 📝 一句话总结
SimPO 提出了一种简单高效的直接偏好优化方法——使用长度归一化的平均对数概率作为隐式奖励，并引入目标奖励间隔（target reward margin）替代参考模型，在消除长度偏见的同时显著降低了计算开销，在 AlpacaEval 2 和 Arena-Hard 上全面超越 DPO。

#### 🎯 核心要点
- **长度归一化奖励**：使用平均对数概率 \(\frac{1}{|y|}\log\pi_\theta(y|x)\) 作为隐式奖励，直接嵌入长度归一化，消除 DPO 中因 sum-of-tokens 导致的生成长度偏好
- **目标奖励间隔（Target Reward Margin）**：引入超参数 \(\gamma\)，强制 winner 和 loser 之间的奖励差距至少为 \(\gamma\)，有效提升奖励准确率
- **无参考模型设计**：完全移除 DPO 中的参考模型 \(\pi_{\text{ref}}\)，减少约 20% 训练时间和 10% GPU 内存占用
- **训练-推理一致性**：训练时的奖励形式与推理时的解码目标（平均对数似然）完全对齐，消除了 DPO 中奖励与生成指标之间的不匹配问题
- **四组实验配置覆盖 SOTA**：Llama3-Base/Instruct 和 Mistral-Base/Instruct 四个 setting 下全面验证，AlpacaEval 2 上取得最高 61.9% LC win rate（Llama3-Instruct）
- **超参数鲁棒性**：\(\beta\) 在 2.0-2.5 之间、\(\gamma\) 在 0.5-1.5 之间可稳定获得优良性能

#### 🔬 深入细节
##### 1. 核心框架图

![SimPO 与 DPO 对比图](https://ar5iv.labs.arxiv.org/html/2405.14734/assets/x1.png)
*图：SimPO 和 DPO 的核心差异——阴影框标注了二者在奖励公式上的区别。DPO 使用参考模型 \(\pi_{\text{ref}}\) 的对数比作为奖励，而 SimPO 直接使用长度归一化的策略对数概率 \(\frac{\beta}{|y|}\log\pi_\theta(y|x)\) 并以目标间隔 \(\gamma\) 作为margin。*

##### 2. 算法伪代码

```python
# SimPO 训练框架伪代码
for batch in preference_data:
    # batch: (x, y_w, y_l) — 输入、偏好赢家、偏好输家
    
    # 1. 前向传播，计算对数概率
    log_pi_w = model.forward(x, y_w)  # log π_θ(y_w|x)，形状 (B,)
    log_pi_l = model.forward(x, y_l)  # log π_θ(y_l|x)，形状 (B,)
    
    # 2. 长度归一化：除以各自的token数
    len_w = count_tokens(y_w)  # |y_w|
    len_l = count_tokens(y_l)  # |y_l|
    avg_log_p_w = log_pi_w / len_w  # (1/|y_w|)·log π_θ(y_w|x)
    avg_log_p_l = log_pi_l / len_l  # (1/|y_l|)·log π_θ(y_l|x)
    
    # 3. 计算长度归一化的奖励（乘以缩放因子β）
    r_w = beta * avg_log_p_w  # β/|y_w|·log π_θ(y_w|x)
    r_l = beta * avg_log_p_l  # β/|y_l|·log π_θ(y_l|x)
    
    # 4. SimPO 损失函数（logistic loss with margin）
    diff = r_w - r_l - gamma  # 奖励差减去目标间隔
    loss = -log_sigmoid(diff).mean()  # ℒ_SimPO = -log σ(r_w - r_l - γ)
    
    # 5. 反向传播更新参数（无需参考模型前向）
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 3. 方法深入解析

**动机与背景**

DPO（Direct Preference Optimization）虽然简化了 RLHF 流程，但存在三个核心缺陷：

1. **长度偏见（Length Bias）**：DPO 的隐式奖励 \(r_\theta(x,y) = \beta\log\frac{\pi_\theta(y|x)}{\pi_{\text{ref}}(y|x)}\) 本质上是 sum-of-tokens 的对数概率——长响应天然倾向于获得更高的累积对数概率，导致模型偏好生成冗长的输出
2. **训练-推理不匹配**：训练时优化的是与参考模型的比例，而推理时使用平均对数似然 \(\frac{1}{|y|}\log\pi_\theta(y|x)\) 作为解码指标——二者不一致会导致训练阶段学到的「好/坏响应」排序与推理时的实际偏好指标冲突
3. **额外计算开销**：DPO 需要同时维护策略模型和参考模型两份参数，训练时需对同一个 batch 执行两次前向传播，增加了约 50% 的计算量

**核心机制**

SimPO 的奖励设计直接对齐推理时的解码目标：

$$r_{\text{SimPO}}(x,y) = \frac{\beta}{|y|}\log\pi_\theta(y|x)$$

这一公式的本质是**将长度归一化内嵌到奖励函数中**——用平均对数概率（而非累积对数概率）作为衡量标准。其关键洞察在于：

- **为什么不用参考模型？**：DPO 引入参考模型是为了防止策略偏离 SFT 分布过远，但 SimPO 发现，通过**目标奖励间隔 \(\gamma\)** 可以起到类似的约束效果——\(\gamma\) 鼓励模型学习到「winner 的奖励显著高于 loser」的表示，而不是单纯放大二者的差值
- **为什么长度归一化更优？**：直接用 \(\log\pi_\theta(y|x)\)（sum-of-tokens）会导致模型在训练中发展出对长响应的系统性偏好（Spearman 相关系数可达 0.82），而 \(\frac{1}{|y|}\log\pi_\theta(y|x)\) 的相关系数仅为 0.34

**最终损失函数**

SimPO 的损失函数结合了 logistic loss 和目标奖励间隔：

$$\mathcal{L}_{\text{SimPO}} = -\log\sigma\left(\frac{\beta}{|y_w|}\log\pi_\theta(y_w|x) - \frac{\beta}{|y_l|}\log\pi_\theta(y_l|x) - \gamma\right)$$

其中 \(\sigma(\cdot)\) 是 sigmoid 函数，\(\gamma\) 是目标奖励间隔。当 \(\gamma=0\) 时，退化为不带 margin 的 logistic loss；当 \(\gamma > 0\) 时，要求 winner 的奖励不仅高于 loser，还要高出至少 \(\gamma\)。

**与 DPO 及其他方法的对比**

| 方法 | 奖励形式 | 是否需要参考模型 | 长度归一化 |
|------|----------|:---:|:---:|
| DPO | \(\beta\log\frac{\pi_\theta}{\pi_{\text{ref}}}\) | ✅ | ❌ |
| R-DPO | DPO 奖励 + 长度惩罚因子 | ✅ | ❌(软约束) |
| ORPO | 平均对数概率 + odds ratio penalty | ❌ | ✅ |
| **SimPO** | **\(\frac{\beta}{|y|}\log\pi_\theta\)** | **❌** | **✅(硬嵌入)** |

SimPO 是唯一同时实现「无参考模型」和「显式长度归一化」的方法。ORPO 虽也使用了平均对数概率，但其损失函数结构截然不同（SFT loss + odds ratio loss），本质上是两阶段方案；而 SimPO 用单一、紧凑的 logistic loss 完成端到端优化。

**关键消融实验发现**

1. **长度归一化的必要性**（Section 4.2）：移除 LN 后，当 winner 比 loser 短时模型学到**负的奖励差**（即偏好短响应被错误惩罚），同时平均对数似然与长度的 Spearman 相关系数从 0.34 飙升到 0.82
2. **\(\gamma\) 的作用**（Section 4.3）：增大 \(\gamma\) 会持续提升奖励准确率（reward accuracy），但下游生成质量呈 ∩ 形曲线——\(\gamma\) 过大会「压平」奖励分布并压低 winner 的绝对对数似然，最终导致模型退化
3. **DPO vs SimPO 的奖励匹配度**（Section 4.4）：用 DPO 奖励判断为正确的样本中，有近一半在平均对数似然指标上实际是**相反的**（\(p_\theta(y_w) < p_\theta(y_l)\)），而 SimPO 通过奖励与推理指标的直接对齐完全消除了这一矛盾

**效率优势**

在 8×H100 GPU 的 Llama3-Base 训练配置下，SimPO 相比 DPO 节省约 20% 的 wall-clock 时间和约 10% 的 GPU 峰值内存，原因仅在于省去了参考模型的一次完整前向传播。

### ReMax

```yaml
id: remax
num: 12
name: ReMax
full_name: 贪心基线强化学习 (REINFORCE with Max Baseline)
year: '2023.10'
org: CUHK / ByteDance
parent: ppo
paper_url: https://arxiv.org/abs/2310.10505
project_url: ''
category: online_rl
motivation: 移除Critic节省50%显存
```

#### 📝 一句话总结
ReMax 的核心目标是：移除Critic节省50%显存。

#### 🎯 核心要点
- 核心动机：移除Critic节省50%显存
- 演化来源：继承或改进自 ppo
- 代表机构：CUHK / ByteDance

#### 🔬 深入细节
移除Critic节省50%显存


### SPIN

```yaml
id: spin
num: 13
name: SPIN
full_name: 自博弈微调 (Self-Play Fine-Tuning)
year: '2024.01'
org: UCLA
parent: instructgpt
paper_url: https://arxiv.org/abs/2401.01335
project_url: ''
category: online_rl
motivation: 新旧模型博弈实现自我进化
```

#### 📝 一句话总结
SPIN提出了一种无需额外人类标注数据的自博弈微调方法，让LLM通过与其历史版本进行对抗博弈（新模型区分人类回答与旧模型生成回答，旧模型尽力生成无法被区分的回答），从弱模型逐步进化为强模型，理论上证明了该目标函数的全局最优解等价于目标数据分布。

#### 🎯 核心要点
- **自博弈机制**：将微调建模为两玩家博弈——主玩家（新模型 p_θ_{t+1}）学习区分人类回答与对手（旧模型 p_θ_t）生成的回答，对手则尽力模仿人类生成不可区分的内容，迭代推进模型能力边界。
- **无需额外标注数据**：仅使用已有的SFT数据集，无需额外的人类偏好标注或GPT-4等强模型参与，即可实现模型的自我进化。
- **理论保证**：证明了SPIN训练目标函数的全局最优解仅在LLM策略与目标数据分布完全对齐时达到（即 p_θ* = p_data），确保迭代过程不会偏离目标。
- **显著性能提升**：在HuggingFace Open LLM Leaderboard、MT-Bench和Big-Bench等多个基准上显著提升LLM性能，甚至优于使用额外GPT-4偏好数据训练的DPO模型。
- **迭代自举**：从SFT初始模型出发，每次迭代用当前模型生成合成数据，用下一轮模型判别真伪，形成正向反馈循环，逐步释放SFT数据潜力。

#### 🔬 深入细节
![SPIN自博弈机制示意图](https://ar5iv.labs.arxiv.org/html/2401.01335/assets/x1.png)

**图1：SPIN自博弈机制示意图**。图中展示了SPIN的核心流程：给定人类标注的SFT数据集（prompt x 与人类回答 y），旧模型 p_θ_t 对每个 prompt 生成回答 y'；新模型 p_θ_{t+1} 被训练来区分 (x, y) 与 (x, y')，即偏好人类回答胜于旧模型生成回答。随着迭代进行，旧模型生成质量不断提升，最终与人类回答无法区分，模型收敛到目标分布。

---

**算法1：SPIN自博弈微调（Self-Play Fine-Tuning）**

**输入**：SFT数据集 D = {(x_i, y_i)}_{i=1}^N，初始模型参数 θ_0（经SFT训练）

**输出**：优化后的模型参数 θ_T

```
对于 t = 0, 1, ..., T-1 循环:
  1. 对于每个 (x_i, y_i) ∈ D:
      使用当前模型 p_θ_t 生成候选回答 y'_i ~ p_θ_t(· | x_i)
      构造训练对: (x_i, y_i) 为正例（人类回答），(x_i, y'_i) 为反例（生成回答）
  
  2. 最小化 SPIN 损失函数，更新模型参数:
     θ_{t+1} = argmin_{θ} L_SPIN(θ; θ_t, D)
  
  3. 记录新模型 p_θ_{t+1} 作为下一轮对手

返回 θ_T
```

---

**SPIN损失函数推导**：

SPIN的核心训练目标是最小化以下损失函数：

$$L_{\text{SPIN}}(\theta; \theta_t, D) = -\frac{1}{N}\sum_{i=1}^{N}\left[\log\sigma\left(\lambda\log\frac{p_\theta(y_i|x_i)}{p_{\theta_t}(y_i|x_i)}\right) + \log\sigma\left(-\lambda\log\frac{p_\theta(y'_i|x_i)}{p_{\theta_t}(y'_i|x_i)}\right)\right]$$

其中：
- **σ(·)** 为 sigmoid 函数，σ(z) = 1/(1 + e^{-z})
- **λ > 0** 为超参数，控制判别边界的锐度（论文中常用 λ = 1.0）
- **p_θ(y|x)** 和 **p_θ_t(y|x)** 分别为新模型和旧模型在给定 prompt x 下生成回答 y 的概率
- **y_i** 为人类标注的真实回答，**y'_i** 为旧模型 p_θ_t 生成的回答

该损失函数的直观解释：
- 第一项鼓励新模型相对于旧模型提高人类回答的对数概率比，即让 p_θ(y_i|x_i) > p_θ_t(y_i|x_i)
- 第二项鼓励新模型相对于旧模型降低生成回答的对数概率比，即让 p_θ(y'_i|x_i) < p_θ_t(y'_i|x_i)
- 两者结合，使得新模型在每轮迭代中学会区分并偏好人类数据分布

---

**理论分析**：

SPIN的训练目标可视为一个两人零和博弈。其核心理论保证是：当且仅当 p_θ = p_data 时，损失函数达到全局最小值。证明思路如下：

考虑期望损失函数（在数据分布和模型生成分布上的期望）：

$$\mathbb{E}_{x \sim p(x)}\left[ f(p_\theta(\cdot|x), p_{\theta_t}(\cdot|x)) \right]$$

其中 f 为对数 sigmoid 组合函数。通过凸函数分析可证：对任意固定的 p_θ_t，使得期望损失最小化的唯一分布为 p_data。当 p_θ_t = p_data 时，新模型的最优解也是 p_data，即达到纳什均衡点。该理论保证确保了 SPIN 的迭代过程不会发散或偏离目标分布。

---

**与RLHF/DPO的对比分析**：

| 方法 | 所需数据 | 奖励模型 | 区分机制 |
|------|---------|---------|----------|
| RLHF | SFT + 人类偏好对 | 需要 | 奖励最大化 |
| DPO | SFT + 人类偏好对 | 不需要 | 直接偏好优化 |
| **SPIN** | **仅 SFT** | **不需要** | **自博弈判别** |

SPIN的核心创新在于将"偏好"动态定义为"人类回答 vs 当前模型回答"，从而无需人工标注偏好数据。与RLHF相比，SPIN省去了奖励模型训练和PPO强化学习阶段；与DPO相比，SPIN不需要成对的人类偏好标注。这使得SPIN可以在完全无外部监督的情况下进行多轮迭代优化，真正实现"从弱到强"的自我进化。

---

**实验与效果**：

实验基于 `zephyr-7b-sft-full` 作为初始模型（该模型已在 UltraChat200k 上完成 SFT），在此数据集上继续执行 SPIN 迭代。主要发现：
1. **多轮收益**：第1轮 SPIN 后模型性能大幅提升，后续轮次继续改善但收益递减，通常 2-3 轮后收敛
2. **LLM Leaderboard**：在 ARC、HellaSwag、MMLU、TruthfulQA 等核心基准上，SPIN 均优于 SFT 基线和多数同规模模型
3. **MT-Bench 对话评测**：SPIN 在多轮对话场景中表现突出，得分超过使用 GPT-4 偏好数据训练的 DPO 变体
4. **参数效率**：SPIN 仅需少量迭代（2-3轮）即可收敛，训练成本可控

#### 🧪 练习题
```yaml
**问题**：SPIN的损失函数中，参数 λ 的作用是什么？

A. λ 控制学习率的大小，λ 越大模型更新越快  
B. λ 控制判别边界的锐度，影响模型区分人类回答与生成回答的严格程度  
C. λ 控制生成温度，λ 越大生成多样性越低  
D. λ 仅作为归一化因子，对训练没有实质性影响  

**正确答案**：B。λ 是 log ratio 的缩放因子，通过 λ log(p_θ/p_θ_t) 影响 sigmoid 输入的幅值。λ 越大，模型对人类回答与生成回答的区分要求越严格，判决边界越锐利；λ 越小，损失函数越平滑，训练越温和。
```

### GRPO

```yaml
id: grpo
num: 14
name: GRPO
full_name: 组相对策略优化 (Group Relative Policy Optimization)
year: '2024.02'
org: DeepSeek
parent: ppo
paper_url: https://arxiv.org/abs/2402.03300
project_url: ''
category: online_rl
motivation: 组内相对优势移除Critic
```

#### 📝 一句话总结
GRPO 通过同一问题采样一组（G条）输出，用组内标准化分数替代 PPO 中的 Value Model 作为基线，省去了价值网络（Critic）的训练开销，在数学推理任务上显著降低显存与计算资源消耗，同时保持甚至提升模型性能。

#### 🎯 核心要点
- 移除 Value Model（Critic）：GRPO 不需要训练独立的价值函数网络，通过组内相对比较直接估计优势
- 组采样机制：对每个问题同时采样 G 条输出，计算组内均值和标准差，用标准化后的相对分数作为优势估计
- 两种优势计算模式：支持 outcome reward（最终答案正确性）和 process reward（步骤级奖励）两种场景
- KL 散度内置在 loss 中：使用 Schulman 提出的无偏估计器，直接加在 GRPO 目标函数内，无需额外 Value Model 进行 credit assignment
- 迭代训练框架：外循环定期刷新 reference model，内循环多步更新策略，reward model 通过 replay 机制持续训练
- 应用于 DeepSeekMath：在数学推理基准上显著提升，证明去除 Critic 是可行且高效的

#### 🔬 深入细节
##### 动机：为什么需要抛弃 Value Model？

在 PPO 中，优势函数 \(A_t\) 的计算依赖于一个独立训练的 Value Network \(V_\psi\)，该网络需要与策略网络规模相当（同为 7B~70B 参数量），带来巨大的显存和计算开销。对于 LLM 的 RL 微调场景，这种开销尤为突出——每步训练都需要同时维护 Policy、Value、Reference、Reward 四个模型。GRPO 的核心洞察是：**Value Model 本质上在为一个"相对好坏"的判断提供基线，但这种基线完全可以由同一问题的多条采样结果的组内统计量来近似替代**。

##### 从 PPO 到 GRPO：公式对比

**PPO 的目标函数**（带 Value Model）：

$$\mathcal{J}_{\text{PPO}}(\theta) = \mathbb{E}_{q\sim P(Q), o\sim\pi_{\theta_{\text{old}}}(O|q)} \frac{1}{|o|}\sum_{t=1}^{|o|} \min\left[\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\theta_{\text{old}}}(o_t|q,o_{<t})}A_t, \text{clip}\left(\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\theta_{\text{old}}}(o_t|q,o_{<t})}, 1-\varepsilon, 1+\varepsilon\right)A_t\right]$$

其中优势函数 \(A_t\) 由 GAE 算法基于 Value Network \(V_\psi\) 计算得到。

**Token 级奖励定义**（PPO 和 GRPO 通用）：

$$r_t = r_\varphi(q, o_{\leq t}) - \beta\log\frac{\pi_\theta(o_t|q, o_{<t})}{\pi_{\text{ref}}(o_t|q, o_{<t})}$$

其中 \(r_\varphi\) 是 reward model（仅在序列结束时给信号或每一步给信号），\(\pi_{\text{ref}}\) 是 reference model（初始 SFT 模型）。

**GRPO 的目标函数**（核心变化）：

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{q\sim P(Q), \{o_i\}_{i=1}^G\sim\pi_{\theta_{\text{old}}}(O|q)} \frac{1}{G}\sum_{i=1}^{G} \frac{1}{|o_i|}\sum_{t=1}^{|o_i|} \left\{ \min\left[\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,<t})}\hat{A}_{i,t}, \text{clip}\left(\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,<t})}, 1-\varepsilon, 1+\varepsilon\right)\hat{A}_{i,t}\right] - \beta\mathbb{D}_{\text{KL}}\left[\pi_\theta||\pi_{\text{ref}}\right] \right\}$$

关键变化：
1. **组采样**：对每个问题 \(q\) 采样 \(G\) 条输出 \(\{o_1, o_2, \cdots, o_G\}\)，外层期望从单条输出变为一组输出
2. **组相对优势 \(\hat{A}_{i,t}\)**：替代 PPO 中由 Value Network + GAE 计算的 \(A_t\)
3. **KL 散度直接内置**：\(\mathbb{D}_{\text{KL}}\) 项直接加入目标函数，使用无偏估计器

> 💡 关键：GRPO 将 PPO 中的"Value Model → GAE → 优势"路径，替换为"组采样 → 组内标准化 → 优势"路径，省去了一个完整的网络训练。

##### 组相对优势估计（核心创新）

GRPO 的优势估计分为两种场景：

**场景 1：Outcome Reward（结果奖励）**—— 只在序列末尾给出奖励信号（例如数学题的答案正确性）：

$$\hat{A}_{i,t} = \tilde{r}_i = \frac{r_i - \text{mean}(\mathbf{r})}{\text{std}(\mathbf{r})}, \quad \text{其中 } \mathbf{r} = \{r_1, r_2, \cdots, r_G\}$$

- 对同一问题的 \(G\) 条输出分别打分得到 \(\{r_i\}\)，计算组内均值和标准差
- 序列中**每个 token 共享同一个标准化后的优势值** \(\tilde{r}_i\)
- 直觉：比组内平均更好的输出获得正优势，差的获得负优势

**场景 2：Process Reward（过程奖励）**—— 每个步骤有独立的奖励信号：

$$\tilde{r}_i^{\text{index}(j)} = \frac{r_i^{\text{index}(j)} - \text{mean}(\mathbf{R})}{\text{std}(\mathbf{R})}, \quad \hat{A}_{i,t} = \sum_{\text{index}(j) \geq t} \tilde{r}_i^{\text{index}(j)}$$

- \(\{r_i^{\text{index}(1)}, \cdots, r_i^{\text{index}(K_i)}\}\) 表示第 \(i\) 条输出的 \(K_i\) 个步骤的奖励
- \(\mathbf{R}\) 是所有输出的所有步骤奖励的全局集合，在全局视角下做标准化
- 每个 token 的优势 = 该 token 之后所有步骤标准化奖励之和（类似 GAE 的累积思想，但无 Value Network）

> ⚠️ 注意：process reward 场景下标准化是在**所有 G 条输出 × 各自步骤数**的全局奖励池上进行的，确保跨输出和跨步骤的公平比较。

##### KL 散度的无偏估计

GRPO 使用 Schulman 提出的 KL 散度无偏估计器，直接逐 token 计算并加入 loss：

$$\mathbb{D}_{\text{KL}}\left[\pi_\theta||\pi_{\text{ref}}\right] = \frac{\pi_{\text{ref}}(o_{i,t}|q, o_{i,<t})}{\pi_\theta(o_{i,t}|q, o_{i,<t})} - \log\frac{\pi_{\text{ref}}(o_{i,t}|q, o_{i,<t})}{\pi_\theta(o_{i,t}|q, o_{i,<t})} - 1$$

- 该估计器保证期望上无偏
- 优势：只需 forward pass 计算概率比，无需额外网络
- 与 PPO 的 token 级 KL 惩罚相比，GRPO 将 KL 约束整合进裁剪目标函数中，形式更统一

##### 示意图：PPO vs GRPO

![GRPO 与 PPO 的对比](https://ar5iv.labs.arxiv.org/html/2402.03300/assets/x2.png)
*图：PPO 和 GRPO 的框架对比。PPO 需要 Actor、Critic、Reference、Reward 四个模型，GRPO 通过组内相对比较移除了 Critic（Value Model），大幅减少训练资源消耗。*

##### Algorithm：迭代式 GRPO 训练流程

```
Algorithm 1: Iterative Group Relative Policy Optimization

Input: 初始策略模型 π_θ_init; 奖励模型 r_φ; 任务提示集合 D;
       超参数 ε, β, μ

1:  策略模型 π_θ ← π_θ_init
2:  for iteration = 1, ..., I do
3:      reference model π_ref ← π_θ
4:      for step = 1, ..., M do
5:          从 D 中采样一个批次 D_b
6:          旧策略模型 π_θ_old ← π_θ
7:          对每个问题 q ∈ D_b，从 π_θ_old 采样 G 条输出 {o_i}_{i=1}^G
8:          通过 r_φ 计算每条输出 o_i 的奖励 {r_i}_{i=1}^G
9:          对 o_i 的第 t 个 token，通过组相对优势估计计算 Â_{i,t}
10:         for GRPO iteration = 1, ..., μ do
11:             通过最大化 GRPO 目标函数更新策略模型 π_θ
12:     通过 replay 机制持续训练更新 r_φ

Output: π_θ
```

关键设计说明：
- **外层迭代 I**：周期性同步 \(\pi_{\text{ref}} \leftarrow \pi_\theta\)，防止策略漂移过大
- **内层步数 M**：每个 iteration 内进行多步采样和更新
- **μ 次内部更新**：同一批采样数据可以重复利用，提高样本效率
- **replay 机制**：reward model 在训练过程中持续更新，积累历史数据回放训练

##### 与 PPO 的本质区别总结

| 维度 | PPO | GRPO |
|------|-----|------|
| 模型数量 | 4（Actor + Critic + Ref + Reward）| 3（Actor + Ref + Reward）|
| 优势估计 | Value Network + GAE | 组采样 + 标准化 |
| 基线 (baseline) | \(V_\psi(s)\) 学习得到 | 组内均值 \(\text{mean}(\mathbf{r})\) |
| Critic 显存 | 与 Actor 同量级 | 0（完全移除）|
| KL 约束 | token 级 KL 惩罚（独立项）| 内置于裁剪目标 + 无偏估计器 |
| 适用场景 | 通用 RL，需要逐步奖励 | 结果导向 + 可选步骤级奖励 |

#### 🧪 练习题
```yaml
question: "GRPO 移除 Value Model 后，用什么来替代 PPO 中由 Value Network 计算的优势基线？"
options:
  - "使用随机初始化的常量作为基线"
  - "对同一问题的 G 条采样输出的奖励做组内标准化，以均值和标准差替代基线"
  - "使用 Reference Model 的输出分数作为基线"
  - "使用上一个 batch 的平均奖励作为基线"
answer: 1
explain: "GRPO 的核心创新是对同一问题采样多条输出，在组内计算奖励的均值作为基线、标准差用于归一化，从而完全替代 Value Model 的角色。"
```

### DAPO

```yaml
id: dapo
num: 15
name: DAPO
full_name: 解耦自适应策略优化 (Decoupled Adaptive Policy Optimization)
year: '2024.03'
org: ByteDance
parent: grpo
paper_url: https://arxiv.org/abs/2503.14476
project_url: ''
category: online_rl
motivation: 解耦裁剪缓解熵崩塌
```

#### 📝 一句话总结
DAPO（Decoupled Clip and Dynamic sAmpling Policy Optimization）是字节跳动Seed联合清华AIR提出的大规模LLM强化学习系统，通过**解耦裁剪+动态采样+Token级损失+超长惩罚塑形**四项核心技术，在Qwen-32B基座模型上仅用50%的训练步数即达到AIME 2024上50%的准确率（超越DeepSeek-R1-Zero-Qwen-32B的47%），并完全开源了算法、代码基础设施和数据集。

---

#### 🎯 核心要点
- **Clip-Higher**：解耦上下裁剪界，提升探索能力、防止熵坍塌
- **Dynamic Sampling**：过滤零梯度样本（全正确/全错误组），按缓冲区批次训练
- **Token-Level Loss**：从样本级平均改为全局Token级平均，防止长序列中gibberish模式不被充分惩罚
- **Soft Overlong Punishment**：对超长样本实施长度感知的渐进惩罚，替代直接截断+固定惩罚

#### 🔬 深入细节
##### 1. 算法框架：从GRPO到DAPO

DAPO建立在Group Relative Policy Optimization (GRPO) 的基础上。GRPO的目标函数为：

$$\mathcal{J}_{\text{GRPO}}(\theta)=\mathbb{E}_{(q,a)\sim\mathcal{D},\{o_i\}_{i=1}^G\sim\pi_{\theta_{\text{old}}}(\cdot\mid q)}\left[\frac{1}{\sum_{i=1}^G|o_i|}\sum_{i=1}^G\sum_{t=1}^{|o_i|}\min\left(r_{i,t}(\theta)\hat{A}_{i,t},\ \text{clip}\left(r_{i,t}(\theta),1-\varepsilon,1+\varepsilon\right)\hat{A}_{i,t}\right)\right]$$

其中 $$\hat{A}_{i,t}=\frac{r_i-\mu_{\text{group}}}{\sigma_{\text{group}}}$$ 为组内标准化后的优势估计。DAPO在此基础上引入四项关键改进。

##### 2. Decoupled Clipping (解耦裁剪)

传统PPO/GRPO采用对称裁剪界 $$[1-\varepsilon, 1+\varepsilon]$$，DAPO将其解耦为 $$[1-\varepsilon_{\text{low}}, 1+\varepsilon_{\text{high}}]$$，并设置 $$\varepsilon_{\text{high}} > \varepsilon_{\text{low}}$$（具体：$$\varepsilon_{\text{low}}=0.2, \varepsilon_{\text{high}}=0.28$$）。

**核心动机**：在long-CoT RL中，正确样本的概率上升对模型能力增长至关重要。对称裁剪界会**对称地限制概率上升和下降**，当熵坍塌发生时（模型过早收敛），概率上升的限制加剧了探索不足。Clip-Higher通过放大上限、保持下限收紧，使得模型获得奖励时可以大幅提升对应Token的概率，而被惩罚时则限制幅度，从而：

- 提升模型对正向信号的利用效率
- 保持足够的探索空间
- 稳定提升熵值，避免熵坍塌

![[img_fig2.png]]
![[img_fig3.png]]
*图2&3: Clip-Higher策略对熵和概率的影响。注意模型概率提升的同时熵也保持了健康增长。*

**深度解读**：解耦裁剪的思想与信任域优化中的不对称约束有相似之处。在long-CoT场景中，探索性Token的收益需要被更大胆地强化，而错误Token的惩戒则需要谨慎——因为过度的惩戒会迅速压缩探索空间。这一设计哲学可以类比为：**对成功慷慨奖励，对失败温和惩罚**。实验中观察到，若不使用Clip-Higher，熵会持续下降至接近0（熵坍塌），模型陷入几乎确定性生成，丧失探索能力；而加入Clip-Higher后熵维持缓慢上升的健康态势。

##### 3. Dynamic Sampling (动态采样)

传统GRPO对每个prompt采样G个响应后直接训练。DAPO引入过滤机制：

$$\text{约束条件: } 0 < |\{o_i \mid \text{is\_equivalent}(a, o_i)\}| < G$$

即**排除组内全部正确或全部错误的样本组**——这些组产生零梯度（优势全为零），浪费计算资源。过滤后的有效样本进入动态缓冲区，当缓冲区大小达到N后执行一次训练步骤。

![[img_fig6.png]]
*图6: 动态采样对训练效率的影响——尽管采样实例增多，但收敛所需训练步数反而减少。*

**深度解读**：动态采样本质上是一种**在线课程学习**策略。全正确组意味着模型已掌握该题（无需优化），全错误组意味着模型完全不会（无法区分信号）。通过过滤这两类组，训练数据中的每个batch都包含"有改善空间"的样本——既有正确参考又有错误对比，梯度信号最为丰富。值得注意的是，论文指出由于生成时间的瓶颈主要在于长尾样本（少数超长响应的生成），过滤掉零梯度组并不会显著增加总体训练时间，反而因减少无用训练步数而加速收敛。

##### 4. Token-Level Policy Gradient Loss (Token级策略梯度损失)

原始GRPO采用**样本级平均**再聚合的方式，每个样本权重相等。这导致长响应中的每个Token对总损失的贡献被稀释。DAPO改为**全局Token级平均**：

$$\mathcal{J}_{\text{DAPO}}(\theta)=\mathbb{E}\left[\frac{1}{\sum_{i=1}^G|o_i|}\sum_{i=1}^G\sum_{t=1}^{|o_i|}\min\left(r_{i,t}(\theta)\hat{A}_{i,t},\ \text{clip}\left(r_{i,t}(\theta),1-\varepsilon_{\text{low}},1+\varepsilon_{\text{high}}\right)\hat{A}_{i,t}\right)\right]$$

**关键差异**：归一化因子从隐式的样本数归一化变为显式全局Token归一化 $$\frac{1}{\sum|o_i|}$$。

![[img_fig4a.png]]
![[img_fig4b.png]]
*图4: Token级损失前后的熵(a)和平均响应长度(b)对比。样本级平均导致熵和长度不健康增长。*

**深度解读**：这一修改解决了两个问题。其一，**对高质量长样本**：Token级平均确保其中每个有效推理步骤都获得充分的学习信号，而不是被长度"稀释"；其二，**对低质量长样本**（包含gibberish、重复词等）：Token级平均能有效惩罚这些不良模式——在样本级平均下，即使某个长响应包含大段重复内容，只要结尾"碰巧"正确，其整体损失仍然较低，模型难以学到区分。这一简单的修改对训练稳定性和健康长度增长产生了深远影响。

##### 5. Soft Overlong Punishment (软超长惩罚)

传统方案对超长样本直接截断并赋予固定惩罚（如reward=-1）。DAPO提出渐进惩罚机制：

$$R_{\text{length}}(y)=\begin{cases}0,&|y|\leq L_{\text{max}}-L_{\text{cache}}\\
\frac{(L_{\text{max}}-L_{\text{cache}})-|y|}{L_{\text{cache}}},&L_{\text{max}}-L_{\text{cache}}<|y|\leq L_{\text{max}}\\
-1,&L_{\text{max}}<|y|\end{cases}$$

其中 $$L_{\text{max}}=16384$$ tokens，$$L_{\text{cache}}=4096$$ tokens。在软惩罚区间内，响应越长惩罚越重；超过 $$L_{\text{max}}$$ 后截断并赋-1。

![[img_fig5a.png]]
![[img_fig5b.png]]
*图5: 超长惩罚塑形前后的AIME精度(a)和熵(b)对比。*

**深度解读**：硬截断+固定惩罚的问题在于**信号混淆**——一个推理过程正确但恰好较长的响应与一个充满gibberish的响应可能收到相同的惩罚。这使得模型无法区分"好但长"和"差且长"。软惩罚通过提供连续的长度信号，使模型能够学习到"稍长可以，过长不好"的偏好。此外，配合Overlong Filtering（直接mask截断样本的loss），避免截断处不完整的Token对梯度产生噪声干扰。两者结合大幅提升了训练稳定性。

---

##### 完整算法伪代码（Algorithm 1）

```
Algorithm 1: DAPO - Decoupled Clip and Dynamic sAmpling Policy Optimization

Input: 初始策略 pi_theta, 奖励模型 R, 任务prompts D, 超参数 eps_low, eps_high

1: for step = 1,...,M do
2:   从 D 中采样batch D_b
3:   更新旧策略 pi_theta_old <- pi_theta
4:   对每个 q in D_b，采样 G 个输出 {o_i} ~ pi_theta_old(·|q)
5:   对每个 o_i 计算奖励 {r_i}（规则奖励 + 软超长惩罚 R_length）
6:   过滤掉 is_equivalent 全组相同的结果，加入动态采样缓冲区
7:   if 缓冲区大小 n_b < N: continue
8:   对缓冲区中每个 o_i 的每个token t 计算优势 A_hat_{i,t}
9:   for iteration = 1,...,mu do            # 内层策略更新
10:    通过最大化 DAPO目标函数更新 pi_theta
       (Token级损失 + 解耦裁剪 + 超长过滤Mask)

Output: pi_theta
```

---

##### 6. 训练细节与实验结果

| 配置项 | 值 |
|--------|-----|
| 基座模型 | Qwen2.5-32B（预训练模型，无SFT） |
| 优化器 | AdamW, lr=1e-6（常数，20步线性warmup） |
| 每prompt采样数 G | 16 |
| Prompt batch size | 512 |
| Mini-batch size | 512（每rollout步16次梯度更新） |
| 最大生成长度 | 20,480 tokens（L_max=16384 + L_cache=4096） |
| eps_low, eps_high | 0.2, 0.28 |
| 训练框架 | veRL |
| 数据集 | DAPO-Math-17K（17K整数答案数学题） |

**消融实验结果（AIME 2024 avg@32）**：

| 方案 | AIME24 准确率 |
|------|:---:|
| DeepSeek-R1-Zero-Qwen-32B | 47% |
| Naive GRPO | 30% |
| + Overlong Filtering | 36% (+6) |
| + Clip-Higher | 38% (+2) |
| + Soft Overlong Punishment | 41% (+3) |
| + Token-level Loss | 42% (+1) |
| + Dynamic Sampling (**完整DAPO**) | **50%** (+8) |

**深度解读**：消融实验揭示了各技术的贡献模式。Overlong Filtering贡献最大(+6%)，说明截断噪声是影响训练稳定性的首要因素。Dynamic Sampling虽然精度提升最显著(+8%)，但这是叠加了所有前序技术后的增量——它更多是"效率催化"角色，使其他技术的效果更充分发挥。Token-level Loss单独提升最小(+1%)，但论文强调其核心价值在于**稳定训练**和**健康长度控制**，而非直接精度增益。这种"隐性贡献"在复杂RL系统中十分常见。

##### 7. RL训练中推理能力的自发涌现

![[img_fig7a.png]]
![[img_fig7b.png]]
![[img_fig7c.png]]
![[img_fig7d.png]]
*图7: 训练动态监控指标——响应长度(a)、奖励分数(b)、生成熵(c)、平均概率(d)*

论文中最具启发性的观察是**反思与回溯行为的自发涌现**（Table 2）：
- 训练初期模型几乎不表现出检查或反思前序推理步骤的行为
- 随着RL训练推进，模型开始出现"However, wait a moment, let's rethink..."等明显的反思模式
- 这表明RL不仅能强化已有行为，**还能催生出基座模型中不存在的新推理模式**

**深度解读**：这一发现对理解RL在LLM推理能力形成中的角色至关重要。与传统观点（RL只是"挑选"已有能力）不同，DAPO的实验表明RL在long-CoT场景中扮演的是**能力孵化器**角色——通过奖励信号引导模型在广阔的生成空间中探索，逐步发现并强化有效的推理策略。反思行为的涌现尤其值得注意：它不是在SFT中通过模仿人类反思数据学到的，而是模型在RL过程中"自主发现"的元认知策略。这暗示着scaling RL可能带来比scaling SFT更本质的能力突破。

---

##### 8. 训练动态监控

论文强调long-CoT RL是一项复杂的系统工程，四项关键指标需持续监控：

1. **响应长度**（图7a）：通常随训练上升，但会出现平台期甚至下降，需配合验证精度判断是否恶化
2. **训练奖励**（图7b）：稳定上升，但与验证精度相关性弱——暗示训练集过拟合风险
3. **生成熵**（图7c）：需保持在合理区间（过低→探索不足，过高→gibberish/repetition）。Clip-Higher后熵呈缓慢上升趋势，有利于性能提升
4. **生成概率均值**（图7d）：与熵形成互补信号

---

#### 🧪 练习题
```yaml
1. **解耦裁剪分析**：为什么在long-CoT RL中需要对上下裁剪界采用不对称设置（eps_high > eps_low）？如果反过来设置（eps_low > eps_high）会有什么后果？试着从概率比r_{i,t}(theta)的动态范围角度分析。

2. **动态采样的梯度特性**：证明在GRPO的组内优势归一化下，若组内所有响应的奖励相同（全正确或全错误），所有Token的优势A_hat_{i,t}均为零，进而梯度为零。思考这种零梯度过滤是否可能排除有价值的"确定性信号"？

3. **Token级损失的数学推导**：从原始的GRPO样本级平均损失出发，推导Token级平均损失的梯度表达式，分析长序列中每个Token对参数更新的贡献比例变化。

4. **软惩罚设计实验**：假设你要验证Soft Overlong Punishment中缓存区间长度L_cache的影响，设计一组对比实验（包括L_cache=0, 2048, 4096, 8192）并预测各设置下的训练表现差异及原因。

---

*论文: Yu et al., "DAPO: An Open-Source LLM Reinforcement Learning System at Scale", arXiv:2503.14476, 2025.*
```

### VAPO

```yaml
id: vapo
num: 16
name: VAPO
full_name: 价值增强策略优化 (Value-Augmented Policy Optimization)
year: '2025.04'
org: ByteDance / Tsinghua
parent: grpo
paper_url: https://arxiv.org/abs/2504.05118
project_url: ''
category: frontier_2026
motivation: 长度自适应GAE解决奖励稀疏
```

#### 📝 一句话总结
VAPO 的核心目标是：长度自适应GAE解决奖励稀疏。

#### 🎯 核心要点
- 核心动机：长度自适应GAE解决奖励稀疏
- 演化来源：继承或改进自 grpo
- 代表机构：ByteDance / Tsinghua

#### 🔬 深入细节
长度自适应GAE解决奖励稀疏


### Dr.GRPO

```yaml
id: dr_grpo
num: 17
name: Dr.GRPO
full_name: 修正版GRPO (GRPO Done Right)
year: '2026'
org: DeepSeek
parent: grpo
paper_url: https://arxiv.org/abs/2503.20783
project_url: ''
category: frontier_2026
motivation: 修正长度与难度偏差
```

#### 📝 一句话总结
Dr.GRPO 的核心目标是：修正长度与难度偏差。

#### 🎯 核心要点
- 核心动机：修正长度与难度偏差
- 演化来源：继承或改进自 grpo
- 代表机构：DeepSeek

#### 🔬 深入细节
修正长度与难度偏差


### REINFORCE++

```yaml
id: reinforce_pp
num: 18
name: REINFORCE++
full_name: 增强版REINFORCE (REINFORCE++)
year: '2026'
org: NVIDIA / OpenRLHF
parent: remax
paper_url: https://arxiv.org/abs/2501.03262
project_url: ''
category: frontier_2026
motivation: 全局优势归一化大规模训练
```

#### 📝 一句话总结
REINFORCE++ 将 PPO 中的 Token-Level KL 惩罚、PPO-Clip 裁剪机制和全局 Advantage 归一化融入经典 REINFORCE 框架，在移除 Critic 网络的同时实现了与 PPO 相当的性能和远超 GRPO 的训练稳定性，训练时间从 PPO 的 60 小时降至 42 小时。

#### 🎯 核心要点
- 无 Critic 架构：彻底移除 Value Network，通过全局 Advantage 归一化直接估计梯度，减少约一半内存开销
- Token-Level KL 惩罚：在每 token 上施加与 SFT 模型的 KL 散度惩罚，仅在最后 token 加上奖励模型分数，实现更细粒度的信用分配
- PPO-Clip 集成：保留 PPO 的裁剪机制 `clip(r_t(θ), 1-ε, 1+ε)`，约束新旧策略概率比，防止单步更新幅度过大
- Mini-Batch 多轮更新：将 rollout 数据分批进行多次参数更新，引入随机性提升泛化性并加速收敛
- 三层奖励处理：Reward 经 z-score 归一化→裁剪→缩放，消除异常值影响，确保数值稳定
- 全局 Advantage 归一化：对整个 batch 所有 token 的 Advantage 进行 z-score 标准化，使梯度尺度一致，防止训练发散
- 计算效率显著：在 Llama3.1-8B + 70k 样本 + H100 配置下，训练时间较 PPO 减少 30%（60h→42h）
- 稳定性优于 GRPO：在 Bradley-Terry Reward Model 场景下，REINFORCE++ 显著缓解 reward hacking 和长度 hacking 问题

#### 🔬 深入细节
##### 1. 动机：RLHF 中的计算与稳定性困境

RLHF 训练流程通常需要同时维护 Policy Model 和 Value Model（Critic），后者规模常与前者相当，带来巨大的 GPU 内存和计算负担。虽然后续工作如 RLOO、ReMax、GRPO 尝试移除 Critic，但它们引入了新的稳定性问题——例如 GRPO 在 Bradley-Terry Reward Model 场景下容易出现 reward hacking（模型仅优化奖励分数而忽略实际质量）和 output length hacking（生成越来越长的输出以获取更高奖励）。REINFORCE++ 的设计目标是：**在不引入 Critic 的前提下，通过融合 PPO 的成熟稳定化技术，实现简单、稳定且高效的 RLHF 训练**。

![REINFORCE++ 通用领域结果](https://ar5iv.labs.arxiv.org/html/2501.03262/assets/imgs/llama3.png)
*图 1：通用领域 Bradley-Terry Reward Model 场景下，PPO 与 REINFORCE++ 的奖励曲线和输出长度对比。REINFORCE++ 与 PPO 的 reward hacking 和 length hacking 程度相近，远优于 GRPO。*

##### 2. 核心机制：五大增强模块详解

**Token-Level KL 惩罚**：传统 REINFORCE 仅在最终 token 施加 KL 惩罚，但 LLM 的生成是自回归的，仅在末尾约束无法有效控制中间 token 的分布漂移。REINFORCE++ 在每个 token 上计算与 SFT 模型的 KL 散度并累加至奖励函数：

$$r(s_t, a_t) = \mathbf{I}(s_t=[EOS]) \cdot r(x,y) - \beta \cdot \text{KL}(t)$$

$$\text{KL}(t) = \log\left(\frac{\pi_{\theta_{old}}^{RL}(a_t|s_t)}{\pi^{SFT}(a_t|s_t)}\right)$$

其中 \( \mathbf{I}(s_t=[EOS]) \) 确保奖励模型分数仅在序列末尾施加，\( \beta \) 为 KL 惩罚系数（通用领域 0.01，数学领域 0.001）。该设计既保持了奖励信号的干净（不在中间插入外部奖励），又实现了逐 token 的分布约束，为 Process Reward Model 的融合提供了天然接口。

> 💡 关键：Token-Level KL 惩罚与仅末尾 KL 相比，相当于在每个生成步骤都施加了一个"回正力"，防止策略在生成中途大幅偏离 SFT 模型，从而抑制 reward hacking。

**PPO-Clip 集成**：REINFORCE++ 直接沿用 PPO 的裁剪目标函数来约束策略更新：

$$L^{CLIP}(\theta) = \mathbb{E}_t\left[\min\left(r_t(\theta)\hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t\right)\right]$$

$$r_t(\theta) = \frac{\pi_{\theta}(a_t|s_t)}{\pi_{\theta_{old}}(a_t|s_t)}$$

其中 \( \epsilon = 0.2 \) 为裁剪半径。当优势函数 \( \hat{A}_t > 0 \) 时，`clip` 阻止概率比超过 \( 1+\epsilon \) 带来的正向收益；当 \( \hat{A}_t < 0 \) 时，阻止概率比低于 \( 1-\epsilon \) 带来的负向收益。这一设计在不依赖 Value Model 的前提下，为 REINFORCE 提供了"信任域"式的训练约束。

> ⚠️ 注意：PPO 原版裁剪依赖 Advantage 的相对值（通过 GAE 从 Value Model 估算），而 REINFORCE++ 直接使用全局归一化后的 Advantage，裁剪的有效性高度依赖归一化的质量。

**奖励归一化与裁剪**：REINFORCE++ 对 Reward 实施三层处理：首先进行 z-score 归一化（减去 batch 均值除以标准差）消除不同任务间的奖励尺度差异；接着将值裁剪至预定义区间（如 [-5, 5]）防止极端异常值；最后应用缩放因子保证与 Advantage 的量级匹配。这一流程在 reward 信号进入 optimizer 之前完成了"清洗"。

**全局 Advantage 归一化**：REINFORCE++ 中 Advantage 定义为：

$$A_t(s_t, a_t) = r(x,y) - \beta \cdot \sum_{i=t}^{T} \text{KL}(i)$$

即从最终 reward 中减去当前位置起所有后续 token 的 KL 惩罚累积值。整个 batch 所有 token 的 Advantage 随后进行 z-score 标准化：

$$A_{normalized} = \frac{A - \mu_A}{\sigma_A}$$

其中 \( \mu_A, \sigma_A \) 为该 batch 所有样本所有 token 的均值和标准差。这一操作使得每个 batch 内正负 Advantage 各半、梯度尺度一致，有效防止了因 reward 尺度变化导致的训练波动。

**Mini-Batch 更新**：在 rollout 阶段收集 256 个样本为一组后，REINFORCE++ 不进行全量更新，而是切成 batch_size=128 的小批次，对每个 mini-batch 可进行多次（通常 1 epoch）参数更新。这种设计在保证梯度多样性的同时，通过多次利用同批数据提升了收敛速度。

##### 3. 训练流程与超参数

REINFORCE++ 的训练流程遵循标准 RLHF 范式：

1. **Rollout**：固定 batch 中 256 个 prompt，每个 prompt 用当前策略采样 4 个 response（共 1024 条）
2. **Reward 计算**：Reward Model 对每条 response 打分，每个 token 累加 KL 惩罚
3. **Advantage 计算**：每条 response 的每个 token 得到 `Advantage = reward - β × ΣKL(tokens_from_current_onward)`
4. **全局归一化**：收集所有 1024×N 个 token 的 Advantage，进行 z-score 标准化
5. **Mini-Batch 更新**：以 128 条 response 为一批次，计算 PPO-Clip loss，更新策略参数
6. **Repeat**：一轮 rollout 后，可对新 batch 重复上述流程，总共最多 25000 个 prompt

| 参数 | 值 |
|------|-----|
| KL 惩罚系数 \( \beta \) | 0.01 (通用) / 0.001 (数学) |
| 最大样本数 | 25,000 prompts |
| 每 prompt 采样数 | 4 |
| Rollout Batch Size | 256 |
| Training Batch Size | 128 |
| Actor Learning Rate | \( 5 \times 10^{-7} \) |
| Critic Learning Rate | \( 9 \times 10^{-6} \)（保留接口） |
| Discount Factor \( \gamma \) | 1.0 |
| Clip \( \epsilon \) | 0.2 |

##### 4. 伪代码

```python
# REINFORCE++ 核心训练循环（简化版）
for rollout_batch in prompt_loader:
    # 1. 采样阶段
    responses = []
    for prompt in rollout_batch:
        for _ in range(4):  # 每 prompt 采样 4 个 response
            response, logprobs = policy.sample(prompt)
            responses.append((prompt, response, logprobs))
    
    # 2. 计算 Rewards 与 KL 惩罚
    rewards = reward_model.score(responses)
    for resp, r in zip(responses, rewards):
        kl_per_tok = resp.logprobs_rl - resp.logprobs_sft  # token-level KL
        resp.advantage = torch.zeros(len(resp.tokens))
        for t in reversed(range(len(resp.tokens))):
            running_sum = 0 if t == len(resp.tokens)-1 else resp.advantage[t+1]
            resp.advantage[t] = running_sum - beta * kl_per_tok[t]
        resp.advantage[-1] += r  # reward 仅加在 EOS token
    
    # 3. 全局 Advantage 归一化
    all_adv = torch.cat([r.advantage for r in responses])
    all_adv = (all_adv - all_adv.mean()) / (all_adv.std() + 1e-8)
    
    # 4. Mini-Batch PPO-Clip 更新
    for minibatch in split(responses, size=128):
        ratio = torch.exp(policy.logprob - old_policy.logprob)  # π_θ / π_θ_old
        clipped_ratio = torch.clamp(ratio, 1 - eps, 1 + eps)
        loss = -torch.min(ratio * all_adv, clipped_ratio * all_adv).mean()
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
```

##### 5. 实验结果与效率分析

实验在 Llama3.1-8B-SFT 和 Qwen2.5-7B-Instruct 两个基座模型上进行，覆盖三类奖励机制：

- **通用 Bradley-Terry RM**：REINFORCE++ 的 reward 曲线与 PPO 高度一致，output length 增长幅度远低于 GRPO（图 1），证明其有效抑制了长度 hacking
- **规则型 Reward Model**（数学题）：REINFORCE++ 与 GRPO (Group Norm) 达到可比性能（图 2）
- **数学 Reward Model**：在相同 KL 消耗下，REINFORCE++ 和 RLOO 的 reward 提升幅度优于 GRPO（图 3）

| 方法 | 训练时间 (H100, 70k samples) |
|------|------------------------------|
| PPO | 60 小时 |
| REINFORCE++ | 42 小时（↓30%） |

REINFORCE++ 将 Critic 的推理和前向/反向传播完全移除，仅在 rollout 阶段节省了约 40% 的 GPU 内存和 30% 的训练墙钟时间，同时保留了 PPO 的稳定性优势。

![REINFORCE++ 数学场景 1](https://ar5iv.labs.arxiv.org/html/2501.03262/assets/imgs/rule.jpg)
*图 2：规则型奖励下，REINFORCE++ 与 GRPO (Group Norm) 性能相当。*

![REINFORCE++ 数学场景 2](https://ar5iv.labs.arxiv.org/html/2501.03262/assets/imgs/math.jpg)
*图 3：数学 RM 下，相同 KL 消耗时 REINFORCE++ 的 reward 提升优于 GRPO。*

#### 🧪 练习题
```yaml
question: "REINFORCE++ 的全局 Advantage 归一化主要解决了什么问题？"
options:
  - "减少了 Reward Model 的计算量"
  - "替代了 Critic 网络，通过 batch 内 z-score 标准化使梯度尺度一致，防止训练发散"
  - "提升了采样速度"
  - "增加了 KL 惩罚的强度"
answer: 1
explain: "全局 Advantage 归一化取代了 Value Model 的基线估计功能，对 batch 内所有 token 的 Advantage 进行 z-score 标准化，使均值归零、方差为 1，确保梯度幅度稳定，是 REINFORCE++ 在无 Critic 下保持训练稳定的核心设计。"
```

### OAPL

```yaml
id: oapl
num: 19
name: OAPL
full_name: 离线策略滞后学习 (Off-Policy RL with Lagged Inference)
year: '2026.02'
org: MIT
parent: grpo
paper_url: https://arxiv.org/abs/2602.19362
project_url: ''
category: frontier_2026
motivation: 滞后推理解决分布式同步瓶颈
```

#### 📝 一句话总结
OAPL 通过 KL 正则化强化学习目标的闭式解，将策略优化转化为无需重要性采样的平方回归问题，并结合滞后更新的推理引擎实现完全异步的离线策略训练，在数学推理和代码生成任务上全面超越 GRPO。

---

#### 🎯 核心要点
- 使用组内估计器从同一 prompt 的多条 rollout 中估计最优价值函数 V*，无需训练额外神经网络
- 采用滞后推理策略：推理引擎 π_vllm 每隔 L 步才与训练策略 π 同步一次，在两次同步之间完全异步运行
- 损失函数简化为简单的平方回归，无裁剪、无重要性比率
- 数学推理：在 AIME25、HMMT25、BRUMO25 上 Pass@1 全面超越 GRPO
- 代码生成：在 LiveCodeBench 上 Pass@k 和样本效率均优于 DeepCoder
- 训练动态：OAPL 保持策略熵不坍塌，而 GRPO 随训练进行熵快速下降
- 对 Policy Lag 具有天然鲁棒性

#### 🔬 深入细节
##### 一、动机：从 PPO/GRPO 的困境到 Off-Policy 的必要性

当前主流的 LLM 推理增强方法（如 GRPO）沿袭了 PPO 的设计范式，核心包含两个要素：

1. **重要性采样比率** `π(y|x) / π_old(y|x)`：用于修正策略更新前后的分布偏移；
2. **裁剪操作**：将该比率限制在 `[1-ε, 1+ε]` 范围内，防止策略更新过大。

然而，在离线策略（off-policy）设定中，数据由推理引擎异步生成，`π_old` 和 `π` 之间可能存在显著滞后，重要性比率产生极大方差，甚至导致梯度爆炸。论文一针见血地指出：**裁剪操作无法真正阻止策略偏离** ——第一次梯度更新时 `π = π_old`，比率恒为 1，裁剪不触发；若第一步梯度较大，单步即可将 `π` 推离 `π_old` 很远，裁剪于事无补（Hsu et al., 2020）。

OAPL 的核心哲学转变：与其用脆弱的裁剪修补 PPO 框架，不如**从根本上重新设计优化目标**，使策略优化天然适应离线策略数据。

##### 二、方法核心：从 KL 正则化 RL 到平方回归

**优化目标**：OAPL 考虑 KL 正则化的强化学习目标：

```
max_π  E_{x~D, y~π(·|x)} [r(x, y)] - β · KL(π || π_vllm)
```

其中 `π_vllm` 是推理引擎（vLLM 服务）的策略，`β` 控制 KL 惩罚强度。

**闭式解**：对该变分问题求解，可得最优策略的解析形式：

```
π*(y|x) = π_vllm(y|x) · exp(r(x,y)/β) / Z(x)
```

将两边取对数并重整，得到关键关系：

```
β · ln(π*(y|x) / π_vllm(y|x)) = r(x, y) - V*(x)
```

其中 `V*(x) = β · ln Z(x)` 为最优价值函数。

**从闭式解到回归损失**：上述关系表明最优策略下的对数概率比恰好等于优势函数 `A*(x, y) = r(x, y) - V*(x)`。由此，作者提出将策略优化转化为平方回归——直接让当前策略 `π` 的对数概率比拟合优势函数：

```
min_π  Σ_x Σ_i=1^G (β·ln(π(y_i|x)/π_vllm(y_i|x)) - (r(x,y_i) - V̂*(x)))²    (Eq. 3)
```

该损失函数的美妙之处在于：
- **无需重要性采样**：`π_vllm` 直接作为 KL 参考锚点，而非采样分布修正的分母
- **无裁剪操作**：回归目标天然平滑，不会产生 PPO 式的梯度不连续性
- **唯一极小值点即为最优策略**：当 `V̂* = V*` 时，Eq. 3 的全局极小值精确对应 `π*`，无论数据采样分布为何

**V̂* 的估计**：OAPL 采用组内估计（group-based estimator）：对同一 prompt x 生成 G 条 rollout，利用前述关系反推出 V̂*(x)，轻量且无偏。

![Figure 1: OAPL 与 GRPO 在数学推理基准上的对比](https://ar5iv.labs.arxiv.org/html/2602.19362/assets/x1.png)

##### 三、算法架构：滞后推理策略实现完全异步训练

OAPL 的系统设计遵循**生产者-消费者模式**：

**Algorithm 1: OAPL**

| 步骤 | 操作 |
|------|------|
| **初始化** | 同步策略模型 π 和推理引擎 π_vllm 的权重 |
| **循环** t = 1 → T | |
| ① 数据生成（异步） | 从 π_vllm 对 prompt x 采样 G 条 rollout，存入缓冲区 D |
| ② 策略优化（异步） | 从 D 采样数据，对 Eq. 3 执行梯度下降更新 π |
| ③ 同步判断 | 若 t mod L == 0：将 π_vllm 权重同步为 π，清空 D |

该设计的关键属性：

1. **完全异步**：在两次同步之间（L 步），推理引擎和训练器独立运行，互不阻塞，充分释放硬件并行能力
2. **离线策略的本质**：π_vllm 既是数据采样分布，又是 KL 参考分布。缓冲区 D 中的数据全部来自**同一版**推理引擎，确保 V̂* 估计的一致性
3. **滞后更新**：π_vllm 每 L 步才更新一次。这种 infrequent update 机制让策略优化在稳定的采样分布上进行，同时策略熵得以保持

##### 四、与 GRPO 和 A*PO 的深度对比

**vs GRPO**：

| 维度 | GRPO | OAPL |
|------|------|------|
| 策略约束方式 | PPO 式裁剪 π/π_old | KL 正则化到 π_vllm |
| 重要性采样 | 需要 | **不需要** |
| 对 Policy Lag 的鲁棒性 | 脆弱（裁剪失效时梯度爆炸） | **天然鲁棒**（regression target 不变） |
| 策略熵 | 训练后期快速坍塌 | 保持稳定（Fig. 3 Left） |
| 损失函数 | 裁剪 surrogate | 简单平方回归 |

GRPO 的根本问题在于 π_old 与数据采样分布 π_vllm 可能不同，而 OAPL 直接将 π_vllm 编码进优化目标，从根源上消解了分布失配。

**vs A*PO**：A*PO 虽然也使用类似的回归损失，但它设计为**在线策略**算法（on-policy），π_ref 固定不变。OAPL 将其扩展到离线策略设定，周期性更新 π_vllm，并使用推理引擎提供的对数概率直接参与损失计算。

##### 五、实验结果解读

**数学推理**（Figure 1, 2）：在 AIME25/HMMT25/BRUMO25 三个竞赛数学基准上，OAPL 的 Pass@1 均值全面超越 GRPO，误差棒显示结果统计显著。训练曲线表明 OAPL 不仅最终精度更高，且收敛更稳定。

**训练动态**（Figure 3）：左侧图展示了训练过程中的策略熵变化——OAPL 的熵保持平稳，而 GRPO 的熵快速下降，说明 GRPO 的策略在训练中趋于确定性，丧失了探索能力。右侧图展示了 OAPL 对不同 lag 步数 L 的鲁棒性，在多个设置下均表现稳健。

**代码生成**（Figure 5）：在 LiveCodeBench 上，OAPL 的 Pass@k 性能（k=1,5,10）全面超越 DeepCoder，且样本效率显著更优——用更少的训练样本达到更高的 Pass@1。

---

#### 🧪 练习题
```yaml
1. **（推导）** 从 KL 正则化 RL 目标 `max_π E_{y~π}[r(x,y)] - β·KL(π || π_vllm)` 出发，使用变分法证明最优策略的闭式解为 `π*(y|x) ∝ π_vllm(y|x)·exp(r(x,y)/β)`，并推导出 `V*(x) = β·ln Z(x)`。

2. **（设计）** OAPL 的损失函数为何无需重要性采样？请对比 GRPO 的损失函数，分析当 π 和采样分布之间存在显著 lag 时，两者的行为差异。

3. **（实现）** 在 Algorithm 1 中，为什么在同步推理引擎时需要清空缓冲区 D？如果不清空，V̂* 的估计会面临什么问题？

4. **（思考）** 图 3 显示 GRPO 的策略熵随训练快速坍塌，而 OAPL 保持稳定。从优化目标和训练机制两个角度分析可能原因，并讨论熵坍塌对 Test-Time Scaling 的影响。

5. **（扩展）** 考虑将 OAPL 的核心思想（KL 正则化 + 闭式解 to 回归损失）推广到多轮对话或 Agent 交互场景。需要如何修改奖励定义和价值估计？面临的挑战是什么？
```

### WDPO

```yaml
id: wdpo
num: 20
name: WDPO
full_name: Wasserstein直接偏好优化 (Wasserstein DPO)
year: '2026'
org: Research
parent: dpo
paper_url: https://arxiv.org/abs/2512.03320
project_url: ''
category: frontier_2026
motivation: Wasserstein距离增强鲁棒性
```

#### 📝 一句话总结
WDPO 的核心目标是：Wasserstein距离增强鲁棒性。

#### 🎯 核心要点
- 核心动机：Wasserstein距离增强鲁棒性
- 演化来源：继承或改进自 dpo
- 代表机构：Research

#### 🔬 深入细节
Wasserstein距离增强鲁棒性


### MoD-DPO

```yaml
id: mod_dpo
num: 21
name: MoD-DPO
full_name: 模态解耦偏好优化 (Modality Decoupled DPO)
year: '2026'
org: Research
parent: dpo
paper_url: https://arxiv.org/abs/2601.01234
project_url: ''
category: frontier_2026
motivation: 跨模态解耦减少幻觉
```

#### 📝 一句话总结
MoD-DPO 的核心目标是：跨模态解耦减少幻觉。

#### 🎯 核心要点
- 核心动机：跨模态解耦减少幻觉
- 演化来源：继承或改进自 dpo
- 代表机构：Research

#### 🔬 深入细节
跨模态解耦减少幻觉
