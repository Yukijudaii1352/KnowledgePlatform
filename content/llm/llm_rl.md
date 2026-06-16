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
REINFORCE 提出用随机策略产生的实际奖励乘以对数概率梯度来更新参数，证明这类更新在期望上沿着期望奖励的梯度方向前进，奠定了现代 Monte Carlo policy gradient 与 RLHF 中策略优化的基础。

#### 🎯 核心要点
- 定义一大类 REINFORCE 更新：奖励增量 = 非负学习率因子 × 去基线奖励 × characteristic eligibility。
- 核心公式为 \(\Delta w_{ij}=\alpha_{ij}(r-b_{ij})e_{ij}\)，其中 \(e_{ij}=\partial \ln g_i / \partial w_{ij}\)。
- 证明在满足基线独立性等条件时，期望更新方向与 \(\nabla_W \mathbb{E}[r\mid W]\) 内积非负；学习率一致时是无偏梯度估计。
- 对 Bernoulli-logistic 随机单元，得到局部规则 \(\Delta w_{ij}=\alpha(r-b)(y_i-p_i)x_j\)。
- 扩展到 episodic delayed reward：整条 episode 结束后用总奖励乘以时间上累积的 eligibility。
- 引入 reinforcement baseline / reinforcement comparison，说明基线不依赖当前动作时不改变无偏性，可用于降低方差。
- 支持多参数随机分布，例如 Gaussian 单元可同时学习均值和方差，从而区分“探索位置”和“探索尺度”。
- 说明可与 deterministic hidden layers 的 backpropagation 结合，只在随机输出或随机节点处使用 likelihood-ratio 估计。

#### 🔬 深入细节
![Policy gradient general form 示意图](https://lilianweng.github.io/posts/2018-04-08-policy-gradient/general_form_policy_gradient.png)
*图：REINFORCE 原论文没有框架图或 Figure；这里使用远程公开的 policy-gradient 总式图辅助说明。REINFORCE 对应其中用 trajectory return 或 reward-to-go 作为 \(\Psi_t\) 的 Monte Carlo 策略梯度估计。*

Williams 1992 的论文标题是 “Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning”。它研究的问题不是现代 Gym 风格 MDP 的完整算法工程，而是更基础的随机 connectionist network 如何从标量 reinforcement signal 中学习。设网络参数为 \(W\)，给定输入和参数后，随机单元 \(i\) 以概率质量或密度函数 \(g_i\) 产生输出 \(y_i\)。系统只看到奖励 \(r\)，并不知道环境的可微模型，也不显式计算 \(\partial r / \partial W\)。REINFORCE 的核心是用 score function identity 把“奖励对参数的梯度”变成“奖励乘以采样动作 log-prob 的梯度”。

论文给出的通用单步更新是：

$$
\Delta w_{ij}=\alpha_{ij}(r-b_{ij})e_{ij}
$$

其中 characteristic eligibility 定义为：

$$
e_{ij}=\frac{\partial \ln g_i}{\partial w_{ij}}
$$

\(\alpha_{ij}\ge 0\) 是学习率因子，\(b_{ij}\) 是 reinforcement baseline。只要 baseline 在条件上不依赖当前随机输出，减去它不会改变梯度估计的期望；它只是改变方差。论文 Theorem 1 的要点是：任意这种 REINFORCE algorithm 的期望更新 \(\mathbb{E}[\Delta W\mid W]\) 与期望奖励梯度 \(\nabla_W\mathbb{E}[r\mid W]\) 的内积非负；当所有学习率相同，更新就是该梯度的常数倍无偏估计。

```python
# 现代符号下的 episodic REINFORCE 伪代码
initialize policy parameters theta
for episode in range(num_episodes):
    trajectory = []
    s = env.reset()

    # 1. on-policy 采样整条轨迹
    while not done:
        probs = policy_theta(s)
        a = sample(probs)
        next_s, r, done = env.step(a)
        trajectory.append((s, a, r, log_prob(probs, a)))
        s = next_s

    # 2. Monte Carlo return 或 reward-to-go
    G = 0
    returns = []
    for (_, _, r, _) in reversed(trajectory):
        G = r + gamma * G
        returns.insert(0, G)

    # 3. 用 return 减 baseline 加权 log-prob 梯度
    loss = 0
    for (s_t, a_t, r_t, logp_t), G_t in zip(trajectory, returns):
        advantage_estimate = G_t - baseline(s_t)   # baseline 可选，不能依赖当前采样动作
        loss += -logp_t * advantage_estimate

    theta = optimizer.step(loss)
```

对 Bernoulli-logistic 单元，输出 \(y_i\in\{0,1\}\)，取 1 的概率为 \(p_i=\sigma(\sum_j w_{ij}x_j)\)。此时 log-likelihood 的导数有非常简单的局部形式：

$$
\frac{\partial \ln g_i}{\partial w_{ij}}=(y_i-p_i)x_j
$$

代入通用 REINFORCE 规则得到：

$$
\Delta w_{ij}=\alpha(r-b)(y_i-p_i)x_j
$$

这个公式的直觉很强：如果实际输出 \(y_i\) 比模型概率 \(p_i\) 更“偏向被采样到”，且得到的奖励高于基线，那么增加导致该输出的权重；如果奖励低于基线，则降低这次采样路径的概率。它不需要知道哪个动作“本来应该”被选，只需要知道这次随机选择之后的结果比基线好还是坏。

延迟奖励场景是论文的另一核心贡献。一个 episode 有 \(k\) 个时间步，最后才收到奖励 \(r\)。论文通过 unfolding-in-time 把循环网络在时间上展开成无环网络，然后得到 episodic REINFORCE：

$$
\Delta w_{ij}=\alpha_{ij}(r-b_{ij})\sum_{t=1}^{k}e_{ij}(t)
$$

对同步更新的 Bernoulli-logistic recurrent network，可写成：

$$
\Delta w_{ij}=\alpha_{ij}(r-b_{ij})\sum_{t=1}^{k}(y_i(t)-p_i(t))x_j(t-1)
$$

这就是“轨迹回报直接估计策略梯度”的早期形式。现代强化学习通常把它写成：

$$
\nabla_\theta J(\theta)=\mathbb{E}_{\tau\sim\pi_\theta}\left[\sum_{t=0}^{T}G_t\nabla_\theta\log\pi_\theta(a_t\mid s_t)\right]
$$

其中 \(G_t\) 是从时刻 \(t\) 开始的 Monte Carlo return。Williams 论文中的 \((r-b)\sum_t e(t)\) 与现代写法中的 \(G_t\nabla\log\pi\) 是同一个 likelihood-ratio 思想在不同符号系统下的表达。

baseline 是理解 REINFORCE 的关键。因为：

$$
\mathbb{E}_{a\sim\pi_\theta}[b(s)\nabla_\theta\log\pi_\theta(a\mid s)] = b(s)\nabla_\theta\sum_a\pi_\theta(a\mid s)=0
$$

只要 \(b(s)\) 不依赖当前动作，减去 baseline 不改变期望梯度。但它会把“所有正奖励都增强”的粗糙信号变成“高于通常水平才增强，低于通常水平就削弱”。论文把这类思想称为 reinforcement comparison，并讨论用过去奖励的指数平均作为比较项。现代 actor-critic、GAE、PPO 中的 value baseline，本质上都是为了在保持梯度方向尽量无偏或低偏的同时显著降低方差。

论文还讨论了多参数分布。例如 Gaussian 随机单元输出 \(y\sim\mathcal{N}(\mu,\sigma^2)\)，则均值参数的 characteristic eligibility 为：

$$
\frac{\partial\ln g}{\partial\mu}=\frac{y-
\mu}{\sigma^2}
$$

方差或标准差参数也有对应的 score function 项。这使算法不仅能学习“往哪里输出”，还能学习“探索范围多大”。这对连续控制尤其重要，后来连续动作策略梯度中的 Gaussian policy 就延续了这种思想：policy network 输出均值和方差，采样动作后用 log-prob 梯度更新策略参数。

> 💡 关键：REINFORCE 的优点是估计简单、适用范围广、无需可微环境模型；缺点是 Monte Carlo 方差高、样本效率低、必须依赖 on-policy 采样。后来的 actor-critic 用 learned value 减方差，TRPO/PPO 用 trust region 或 clipping 控制更新幅度，但底层仍是 \(\nabla\log\pi\) 乘以回报/优势的策略梯度结构。

在 LLM/RLHF 语境中，REINFORCE 可以直接对应到“语言模型作为随机策略”：状态是 prompt 与已生成 token，动作是下一个 token，\(\log\pi_\theta(a_t\mid s_t)\) 是模型给采样 token 的 log-prob，奖励可以来自 reward model 或规则评分。若直接用整段回复奖励更新所有 token，就得到高方差的序列级 REINFORCE；PPO、GRPO、RLOO 等方法都是在这一基础上改变 baseline、归一化、KL 约束或样本复用方式。

#### 🧪 练习题
```yaml
question: "REINFORCE 中 baseline 的主要作用是什么？"
options:
  - "改变最优策略，使模型偏向短轨迹"
  - "在不依赖当前动作的条件下降低梯度估计方差，同时保持期望梯度不变"
  - "替代随机策略，使训练变成监督学习"
  - "消除 Monte Carlo 采样需求"
answer: 1
explain: "因为动作无关 baseline 与 score function 的期望乘积为 0，减去 baseline 不改变无偏性，但能减少回报尺度带来的方差。"
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
PPO 用一个极其简单的裁剪替代目标函数近似实现了 TRPO 的 trust region 思想，在不依赖复杂二阶优化的前提下稳定约束策略更新幅度，最终成为深度强化学习和 RLHF 中最常用的策略优化算法。

#### 🎯 核心要点
- 核心创新是 clipped surrogate objective，用 `clip` 限制新旧策略概率比
- 保留 on-policy policy gradient 框架，但允许同一批 rollout 数据做多轮 minibatch 更新
- 提供两条近端化路线：clip 版本和自适应 KL penalty 版本，论文最终发现 clip 更稳更好
- 实际训练通常采用 actor-critic 形式，同时优化策略损失、价值函数损失和熵奖励
- 本质是在一阶 SGD/Adam 框架下近似 TRPO 的保守更新思想
- 在 MuJoCo 连续控制上整体优于 TRPO、A2C 等基线，在 Atari 上也表现强劲
- 后续成为 RLHF 标准优化器，InstructGPT、ChatGPT 早期 RL 流水线都沿用了 PPO 范式

#### 🔬 深入细节
##### 核心示意图

![PPO 裁剪目标函数示意](https://ar5iv.labs.arxiv.org/html/1707.06347/assets/x1.png)
*图：论文 Figure 1。横轴是新旧策略概率比 \(r_t(\theta)\)，纵轴是单步 surrogate term。可以直观看到，一旦概率比超出 \([1-\epsilon, 1+\epsilon]\)，目标函数就不再继续鼓励更激进的更新。*

##### 算法伪代码

```python
# PPO, actor-critic style
for iteration in range(num_iters):
    trajectories = collect_rollouts(policy_old, env, T)
    advantages = estimate_advantages(trajectories, value_fn)
    returns = compute_returns(trajectories)

    for epoch in range(K):
        for batch in minibatches(trajectories, advantages, returns):
            ratio = pi_theta(batch.a, batch.s) / pi_old(batch.a, batch.s)
            unclipped = ratio * batch.adv
            clipped = clip(ratio, 1 - eps, 1 + eps) * batch.adv
            policy_loss = -mean(min(unclipped, clipped))
            value_loss = mse(value_fn(batch.s), batch.ret)
            entropy_bonus = entropy(pi_theta(batch.s))
            loss = policy_loss + c1 * value_loss - c2 * entropy_bonus
            update(theta, loss)

    policy_old = policy.copy()
```

##### 1. PPO 想解决的其实是 TRPO 的工程问题

PPO 不是凭空出现的。它面对的是策略梯度方法一个非常老但很难处理的问题：策略一旦更新太大，性能就可能瞬间崩掉。TRPO 用 trust region 解决了这个问题，做法是在每次更新时显式约束新旧策略的 KL 散度不能太大，因此理论上更稳。

但 TRPO 的代价也很明显：需要二阶近似、Fisher 信息矩阵、共轭梯度等一整套复杂 machinery。对于研究原型还行，一旦想大规模训练或者做频繁实验，这套东西就显得笨重。PPO 的问题于是变成了：能不能保留“不要一步走太远”的思想，但把优化过程简化成普通 SGD/Adam 就能做的形式？

##### 2. 核心对象：先看概率比，再看更新是否过头

PPO 沿用了 TRPO / CPI 那条线里的 surrogate objective，先定义新旧策略在样本动作上的概率比：

$$
r_t(\theta)=\frac{\pi_\theta(a_t\mid s_t)}{\pi_{\theta_{\mathrm{old}}}(a_t\mid s_t)}.
$$

如果 \(r_t(\theta) > 1\)，说明新策略更偏好这个动作；如果小于 1，说明新策略在压低这个动作。再结合优势函数 \(\hat A_t\)，最朴素的目标就是：

$$
L^{\mathrm{CPI}}(\theta)=
\mathbb{E}_t\left[r_t(\theta)\hat A_t\right].
$$

这个目标本身没错，但问题在于它会持续奖励“把好动作概率推得越来越大、把坏动作概率压得越来越小”。只要优化器还能继续走，它就没有天然刹车，于是容易出现单次更新过猛的问题。

##### 3. PPO 的关键：不是限制梯度，而是限制“继续获益的区间”

PPO 的 clip 目标写成：

$$
L^{\mathrm{CLIP}}(\theta)=
\mathbb{E}_t\left[
\min\left(
r_t(\theta)\hat A_t,\;
\operatorname{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat A_t
\right)
\right].
$$

这个式子是 PPO 最重要的部分。它的直觉可以分两种情况看：

- 如果 \(\hat A_t > 0\)，说明这个动作比基线好，优化器会倾向于增大它的概率。但一旦 \(r_t(\theta)\) 超过 \(1+\epsilon\)，clip 项就把额外收益截平，不再鼓励你继续往上推。
- 如果 \(\hat A_t < 0\)，说明这个动作不好，优化器会倾向于减小它的概率。但一旦 \(r_t(\theta)\) 跌破 \(1-\epsilon\)，同样不再鼓励进一步激进地下压。

> 💡 关键：PPO 不是硬性要求“参数不能走远”，而是更巧妙地让“走太远不再有优化收益”。这就是它为什么能在一阶优化框架里近似 trust region 效果。

论文强调 `min` 的作用是构造一个 pessimistic bound。也就是说，当 unclipped objective 和 clipped objective 冲突时，PPO 选择更保守的那个。这让更新天然偏向“不犯大错”，而不是“尽可能贪心吃掉所有优势”。

##### 4. 为什么它允许多轮复用同一批数据

传统 vanilla policy gradient 往往一批数据只更新一次，因为一旦策略变化太快，旧样本就不再可信。PPO 的近端化设计缓解了这个问题：虽然它仍然是 on-policy，但由于每一步更新都被 clip 机制束缚在局部区域内，同一批 rollout 可以安全地做多个 epoch 的 minibatch SGD。

这件事对样本效率很关键。论文里 Algorithm 1 的核心套路就是：

1. 用旧策略收集 \(N\times T\) 个时间步数据；
2. 估计优势函数；
3. 对同一批数据做 \(K\) 轮小批量优化；
4. 再同步 `policy_old <- policy`，进入下一轮。

因此 PPO 的收益不只来自“更稳”，还来自“更能榨干同一批 on-policy 数据”。这也是它相对简单 policy gradient 方法明显更实用的地方。

##### 5. KL penalty 版本为什么没成为主流

论文其实还给了另一个版本，即在 surrogate objective 上直接加 KL 惩罚：

$$
L^{\mathrm{KLPEN}}(\theta)=
\mathbb{E}_t\left[
r_t(\theta)\hat A_t
- \beta\,\mathrm{KL}\!\left(\pi_{\theta_{\mathrm{old}}}(\cdot\mid s_t),\pi_\theta(\cdot\mid s_t)\right)
\right].
$$

同时根据当前 KL 大小自适应调节 \(\beta\)。这条路线在思想上更接近 TRPO，因为它直接监控策略偏移。但论文实验发现，这种方法整体不如 clip 版本稳定、也不如 clip 版本好调。因此后面社区说“PPO”时，通常默认就是 clipped PPO，而不是 KL-penalty PPO。

这也是 PPO 设计里一个很漂亮的地方：它最终赢的不是更“理论优雅”的版本，而是更“训练实用”的版本。

##### 6. 完整训练目标并不只有策略项

真实训练里，PPO 往往配合 actor-critic 使用，所以总损失不只包含 clip 策略项，还会包含价值函数回归误差和熵奖励：

$$
L(\theta)=
\mathbb{E}_t\left[
L^{\mathrm{CLIP}}_t(\theta)
- c_1 L^{\mathrm{VF}}_t(\theta)
+ c_2 S[\pi_\theta](s_t)
\right].
$$

其中：

- \(L^{\mathrm{VF}}\) 负责让 value function 学会估计回报，用于构造优势函数；
- 熵项 \(S\) 鼓励策略保留一定探索性；
- \(c_1,c_2\) 用来平衡策略优化、价值拟合和探索。

这也是 PPO 在后续 RLHF 中看起来更“重”的原因：到了语言模型场景，除了 policy 之外，通常还会额外维护 value model、reward model 和 reference model，所以整个系统不只是一个 clip 公式，而是一个多模型训练流水线。

##### 7. 论文结果说明了什么

论文最核心的经验结论有两个。第一，在 MuJoCo 上，clip 版本整体优于“无 clipping”、固定 KL、以及自适应 KL 这些替代方案；其中 \(\epsilon=0.2\) 是表现最好的典型设置。第二，在连续控制和 Atari 上，PPO 与 TRPO、A2C 等强基线相比都非常有竞争力，而且训练过程相对稳定。

这两点合起来说明了一件事：PPO 的成功并不是因为它给出了一个更强的理论保证，而是因为它找到了一种极简但够用的更新约束。它把“稳定策略优化”从少数复杂算法的专长，变成了一个几乎所有工程师都能直接上手的标准模板。

##### 8. 为什么它后来统治了 RLHF

当 PPO 被搬到语言模型对齐里时，它的优点变得更突出。RLHF 训练非常依赖稳定性，因为 reward model 本身就可能噪声很大，若策略更新再失控，很容易 reward hacking 或直接崩坏。PPO 恰好提供了一种足够稳、足够成熟、已有大量实现经验的默认选择。

所以从 InstructGPT 到后来的很多 RLHF 系统，PPO 都成了事实标准。它当然不是最轻量的方法，这也是后来 DPO、IPO、KTO 等工作试图绕开在线 PPO 的原因；但如果你要理解“经典 RLHF 是怎么训起来的”，PPO 仍然是最关键的地基算法之一。

#### 🧪 练习题
```yaml
question: "PPO 中 clipped surrogate objective 的主要作用是什么？"
options:
  - "让算法变成 off-policy，提高经验回放效率"
  - "通过截断新旧策略概率比，抑制过大的单步策略更新"
  - "去掉价值函数网络，只保留策略网络"
  - "让 PPO 不再需要优势函数"
answer: 1
explain: "PPO 的核心就是用 clip 限制概率比超出 [1-eps, 1+eps] 后的继续获益，从而稳定策略更新。"
```

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
InstructGPT 首次把“监督微调 + 奖励模型 + PPO”三阶段 RLHF 流水线在大规模语言模型上系统跑通，证明用人类偏好而不是纯 next-token 目标，可以显著提升指令遵循、真实性和安全性。

#### 🎯 核心要点
- 三阶段训练范式：SFT 监督微调、RM 奖励建模、PPO 强化学习
- 数据来自两路：标注员编写 prompts 与真实 OpenAI API prompts
- SFT 数据约 13k prompts，RM 数据约 33k prompts，PPO 阶段约 31k prompts
- 奖励模型基于 pairwise preference 训练，单个标注任务让标注员对 \(K=4\sim 9\) 个回答排序
- PPO 阶段使用每 token 的 KL 惩罚，约束策略不要偏离 SFT 初始化过远
- 提出 PPO-ptx，把预训练分布上的语言建模梯度混入 RL 更新以缓解 alignment tax
- 人工评测中，175B InstructGPT 相比 175B GPT-3 被偏好约 85% 的时间，且 1.3B InstructGPT 也可胜过 175B GPT-3

#### 🔬 深入细节
##### 核心框架图

![InstructGPT 三阶段 RLHF 流程](https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)
*图：论文 Figure 2。流程被明确拆成 SFT、RM、PPO 三步，这基本奠定了后续 RLHF 系列工作的标准工业模板。*

##### 算法伪代码

```python
# InstructGPT: SFT -> Reward Model -> PPO

# 1. Supervised Fine-Tuning
pi_sft = pretrained_gpt3.clone()
for prompt, demo in sft_data:
    loss = -log_prob(pi_sft, demo, prompt)
    update(pi_sft, loss)

# 2. Reward Model
r_theta = init_from_sft_backbone()
for prompt, ranked_responses in rm_data:
    for y_win, y_lose in all_preference_pairs(ranked_responses):
        loss = -log(sigmoid(r_theta(prompt, y_win) - r_theta(prompt, y_lose)))
        update(r_theta, loss)

# 3. PPO RLHF
pi_rl = pi_sft.clone()
value_model = init_from_reward_model()
for prompt in ppo_prompts:
    response = sample(pi_rl, prompt)
    reward = r_theta(prompt, response)
    reward -= beta * kl_to_sft(pi_rl, pi_sft, prompt, response)
    loss = ppo_objective(pi_rl, value_model, prompt, response, reward)
    loss += gamma * pretraining_loss(pi_rl)   # PPO-ptx 可选
    update(pi_rl, loss)
```

##### 1. 为什么它是 RLHF 的真正起点

在 InstructGPT 之前，语言模型已经能通过 few-shot prompt 做很多任务，但“能做”不等于“按用户意图去做”。论文把问题说得很直接：模型越大，并不会自然变得更会听话，反而会继续放大预训练目标和用户目标之间的不一致。预训练优化的是网页分布上的下一个 token 预测，而用户真正想要的是有帮助、真实、无害且能遵循约束的回答。

InstructGPT 的贡献不是发明了“偏好”这个想法，而是第一次把它在 GPT-3 级别的模型上做成一条可复现、可扩展、可量化评估的对齐流水线。后面几乎所有 RLHF、RLAIF、偏好优化工作，都是在这个三阶段框架上做局部替换或简化。

##### 2. SFT：先把模型拉到“会听指令”的分布上

论文先雇佣 40 位标注员，收集高质量 demonstrations。这里的作用不是直接把模型训到最终最优，而是给后续偏好学习一个稳定起点。论文报告 SFT 训练集大约有 13k prompts，来源同时包括标注员编写数据和 API 真实分布数据。

这一步非常关键，因为后续 RM 和 PPO 都默认模型已经大致会“回答任务本身”。如果跳过这一步，RL 阶段会浪费大量样本在探索最基本的指令遵循行为上。很多后续工作把 SFT 当作默认前置步骤，本质上就是承认 InstructGPT 这一步是必要的 distribution shaping。

##### 3. Reward Model：把人类排序蒸馏成可优化标量

奖励模型训练对应论文的第二步。对同一个 prompt，系统会生成多条候选回答，让标注员对它们排序。论文里一个标注任务通常包含 \(K=4\sim 9\) 个回答，因此一个排序任务可以展开出 \(\binom{K}{2}\) 个两两偏好比较。

RM 的核心目标可以写成：

$$
\mathcal{L}_{\mathrm{RM}}(\theta)
=
- \mathbb{E}_{(x,y_w,y_l)}
\log \sigma\!\left(r_\theta(x,y_w)-r_\theta(x,y_l)\right).
$$

其中 \(y_w\) 是更受偏好的回答，\(y_l\) 是较差回答，\(r_\theta(x,y)\) 是奖励模型输出的标量分数。直觉上，这个目标要求“优回答分数高于劣回答分数”，并通过 sigmoid 把差值转成偏好概率。

论文还指出一个很工程但很重要的细节：不能把同一排序任务拆出来的所有 pair 完全打散独立训练，否则相关性过高，RM 很容易过拟合。于是他们把同一 prompt 下的比较当成一个 batch 元素处理，这个设计后来也被大量后续工作沿用。

##### 4. PPO：真正把“人类偏好”写进策略更新

有了 RM 后，第三步就是用 PPO 最大化奖励模型分数，同时防止策略过快偏离 SFT 模型。论文给出的 RL 目标本质上是：

$$
\mathcal{J}(\phi)
=
\mathbb{E}_{(x,y)\sim D_{\pi_\phi^{\mathrm{RL}}}}
\left[
r_\theta(x,y)
- \beta \log \frac{\pi_\phi^{\mathrm{RL}}(y\mid x)}{\pi^{\mathrm{SFT}}(y\mid x)}
\right]
+
\gamma
\mathbb{E}_{x\sim D_{\mathrm{pretrain}}}
\left[\log \pi_\phi^{\mathrm{RL}}(x)\right].
$$

这里有三个力量同时作用：

- \(r_\theta(x,y)\)：鼓励模型产出更符合标注员偏好的回答。
- KL 项：限制策略不要偏离 SFT 太远，避免 reward hacking。
- 预训练混合项：也就是 PPO-ptx，用来缓解 RL 后模型在通用 NLP 能力上的退化。

> 💡 关键：InstructGPT 并不是“只用 PPO 提高奖励”。它真正重要的是把 PPO 放进一个被 SFT 和 RM 夹住的受控系统里。没有前面的分布初始化和后面的 KL 约束，PPO 很容易把模型推到奇怪区域。

##### 5. PPO-ptx：为什么它后来那么重要

论文很早就观察到 alignment tax。也就是说，模型在“更符合人类偏好”的同时，可能在 SQuAD、DROP、HellaSwag、翻译等公共基准上回退。这说明 RLHF 不是免费午餐，它会把参数容量从通用语言建模能力重新分配给偏好目标。

PPO-ptx 的思路很直接：在 RL 更新时继续混入预训练分布上的语言建模梯度。这样做并不改变“偏好对齐是主目标”，但能减少模型对原始语言能力的遗忘。论文明确指出，单纯把 KL 系数调大，并不能像 pretraining mix 那样有效地修复这些回退。

这件事影响很深，因为它定义了一个后续普遍接受的认知：RLHF 不只是优化 reward，还要处理“保持基座能力”这个正交约束。很多后来工作看似在改 RL，其实都在解决这个问题。

##### 6. 结果为什么有说服力

论文最有代表性的结果有两条。第一，175B InstructGPT 相比原始 175B GPT-3，被人类评测偏好的比例约为 85% 左右。第二，1.3B InstructGPT 甚至能在偏好评测里超过 175B GPT-3，这说明“对齐方式”有时比“参数规模”更重要。

更重要的是，这个提升不只体现在“更像客服模板”，而是同时体现在真实性和毒性控制上。论文报告 InstructGPT 在 TruthfulQA 上更好，在封闭域任务上的幻觉更少，且 toxic output 有所下降。这也是后来大家把它视为现代对齐起点的原因：它第一次用相对完整的证据说明，RLHF 确实能让模型更像“用户想要的系统”，而不是更像“互联网上的平均文本生成器”。

##### 7. 它和后续方法的边界

InstructGPT 也有明显代价：需要高质量人工 demonstrations、需要大规模人工排序、还要在线 PPO 训练，整条链条又贵又慢。这正是后续 DPO、IPO、KTO、ORPO、SimPO 等方法不断尝试“去掉 RM”或“去掉在线 RL”的原因。

但这些后续工作并没有推翻 InstructGPT，反而是在继承它定义的问题设置。它提出的核心问题一直没变：如何把“用户偏好”转成可优化目标，同时不把模型推坏。只是不同方法在答案上做了不同工程折中。

#### 🧪 练习题
```yaml
question: "InstructGPT 中 PPO-ptx 相比纯 PPO 的主要作用是什么？"
options:
  - "把奖励模型替换成价值模型"
  - "缓解 alignment tax，减少公共 NLP 基准上的能力退化"
  - "避免收集人类偏好排序数据"
  - "让 PPO 不再需要 KL 惩罚"
answer: 1
explain: "PPO-ptx 会把预训练分布上的语言建模梯度混入 RL 更新，用来减少模型在通用任务能力上的遗忘和退化。"
```

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
CAI 把“人类逐条标注什么有害”替换成“一小组自然语言原则”，先让模型按原则自我批判和修订，再用 AI 反馈替代人类 harmlessness 偏好标签做 RL，从而训练出更无害且不回避问题的助手。

#### 🎯 核心要点
- 两阶段训练：SL-CAI 的 critique-revision 监督阶段，加上 RL-CAI/RLAIF 的 AI 反馈强化学习阶段
- 监督信号来自 constitution，而不是逐条 harmlessness 人工标签
- 16 条自然语言原则随机采样，用于驱动批判、修订和偏好判断
- SL 阶段把 helpful RLHF 模型的有害回答改写成无害且更透明的回答
- RL 阶段使用 AI feedback 生成 harmlessness 比较标签，再与人类 helpfulness 标签混合训练 preference model
- 支持 chain-of-thought 形式的 AI 评审，并发现 CoT 下需做概率 clamping 才更稳健
- 核心目标不是单纯“更安全”，而是减少 evasiveness，让模型学会解释为何拒绝有害请求

#### 🔬 深入细节
##### 核心框架图

![CAI 两阶段流程图](https://ar5iv.labs.arxiv.org/html/2212.08073/assets/x1.png)
*图：论文 Figure 1。上半部分是自我批判与修订的监督阶段，下半部分是 AI 反馈驱动的偏好建模与 RL 阶段。*

##### 算法伪代码

```python
# Constitutional AI: SL-CAI -> RL-CAI

# 1. Supervised Constitutional AI
for prompt in red_team_prompts:
    response = helpful_rlhf.sample(prompt)
    for _ in range(num_revisions):
        principle = sample(constitution)
        critique = model.critique(prompt, response, principle)
        response = model.revise(prompt, response, critique, principle)
    save_supervised_pair(prompt, response)

sl_cai = finetune(pretrained_lm, supervised_pairs + helpfulness_pairs)

# 2. RL from AI Feedback
for prompt in prompts:
    y_a, y_b = sample_two_responses(sl_cai, prompt)
    principle = sample(constitution)
    q = feedback_model.preference_prob(prompt, y_a, y_b, principle)
    save_ai_preference(prompt, y_a, y_b, q)

pm = train_preference_model(human_helpfulness_pairs + ai_harmlessness_pairs)
policy = ppo_train(init=sl_cai, reward_model=pm)
```

##### 1. 它到底想修复 RLHF 的什么问题

CAI 的直接出发点不是“让模型更安全”这么泛，而是针对早期 RLHF 的两个具体缺陷。第一，harmlessness 的人工偏好标注太贵，而且很难规模化。第二，传统 HH-RLHF 往往把“无害”学成“回避”，模型遇到敏感问题时会大量输出“我不能回答这个”，看起来安全，但其实既不透明，也不够有帮助。

论文因此提出一个更激进的问题：能不能不用人类逐条告诉模型“哪个回答更无害”，而只给它一小组人类写下的原则，让模型自己按这些原则做批判、修订和评估？如果能做到，就相当于把监督从“海量隐式标签”压缩成“少量显式规则”。

##### 2. SL-CAI：先让模型学会自我批判与修订

第一阶段是监督学习，但不是普通的 instruction tuning。具体做法是：先让 helpful-only 的 RLHF 模型对红队 prompt 生成初始回答，这些回答往往很危险；然后随机抽一条 constitution principle，让模型先批判自己的回答，再根据批判重写出一个更合规的新回答。

论文强调这个过程可以多轮迭代，而且每轮都可以随机切换原则。这样做的好处是，模型学到的不只是“拒绝某个具体 prompt”，而是把“按原则检查并修订回答”的行为模式内化进参数里。文中使用了 16 条原则，并指出它们是以研究为目的手工写出的自然语言规则。

在数据规模上，SL-CAI 使用了 42,496 条人工 red-team prompts，加上 140,335 条模型生成 red-team prompts，总共 182,831 条；每条 red-team prompt 采样 4 个 critique-revision 对。与此同时，还混入 135,296 条 helpfulness prompts，避免模型只学会“安全”而遗忘“帮助用户”。

##### 3. 为什么自我批判比直接改写更重要

论文专门比较了两条路线：一条是先 critique 再 revision，另一条是直接 revision。结果是，小模型上 critique 明显更重要，大模型上差距缩小但仍略有优势。

这背后的直觉很清楚：批判步骤强迫模型先显式说出“哪里错了、为什么违反原则”，等于先把隐含判断展开成自然语言中间变量，再据此改写回答。对能力没那么强的模型，这个中间推理支架尤其重要。后面很多 self-refine、self-critique 类工作，本质上都在重复这个发现。

##### 4. RL-CAI：把 harmlessness 偏好标签从“人类给”改成“AI 给”

第二阶段才是这篇论文真正与 InstructGPT 分叉的地方。它保留了 RLHF 的总体框架，但把 harmlessness 比较标签改成 AI feedback 生成。具体来说，对同一 prompt 采样两条回答 \(y_A\) 和 \(y_B\)，再给反馈模型一条 constitution principle，让它回答“哪条更符合原则”。

偏好模型依旧学习一个标量奖励：

$$
p_\psi(A \succ B \mid x)
=
\sigma\!\left(r_\psi(x,y_A)-r_\psi(x,y_B)\right).
$$

不同之处在于监督目标不一定是硬标签 \(0/1\)，而可以是反馈模型给出的软概率 \(q\)。因此 preference model 的训练更像：

$$
\mathcal{L}_{\mathrm{PM}}(\psi)
=
- q \log p_\psi(A \succ B \mid x)
- (1-q)\log\!\left(1-p_\psi(A \succ B \mid x)\right).
$$

这就是论文里“soft labels 比 hard labels 更好”的核心原因。模型不是只学“谁赢了”，而是连同“不确定程度”一起学进去。

##### 5. CoT、soft labels 和 clamping 为什么关键

论文一个非常有价值的发现是：如果反馈模型不用 CoT，那么 normalized log-probabilities 形成的 soft labels 往往校准得不错；但一旦用了 CoT，模型通常会在推理文本里过早承诺某一选项，导致概率接近 0 或 1，反而不稳定。

因此 CAI 在 CoT 版本里没有直接使用原始 soft labels，而是把概率钳在更窄的区间里。论文报告 20-80 的 clamping 有提升，而 40-60 更稳，最终主结果采用了 40-60。这个结论很重要，因为它说明“更会推理”不自动等于“更适合作为教师信号”，中间还要做校准。

> ⚠️ 注意：CAI 的关键并不是简单把“人类标签”换成“模型标签”，而是要把模型反馈重新设计成一个足够稳定、足够可蒸馏的监督分布，否则 RL 阶段会学到过度极端的偏好。

##### 6. 为什么它比普通 HH-RLHF 更少回避

CAI 的一个核心成果是 non-evasive。传统 HH-RLHF 在很多危险 prompt 上会学到模板化拒绝，因为历史人工标注经常把“最无害”近似成“最不回答”。CAI 则把原则写得更显式，并在评测时要求比较者更偏好“既无害又解释清楚为什么拒绝”的回答。

这样一来，模型学到的不是“避开风险内容即可”，而是“用理由化、透明化的方式处理风险内容”。论文明确写到 RL-CAI 几乎不会像旧 HH-RLHF 那样持续输出 canned refusal，而更常给出有解释的拒绝或重定向回答。这也是它被称为“constitutional”而不是普通 harmlessness tuning 的原因之一。

##### 7. 它和 InstructGPT 的关系

如果说 InstructGPT 定义了“人类偏好 -> 奖励模型 -> PPO”这条主干，那么 CAI 做的就是把其中一大块昂贵的人类监督，替换成“原则 + AI 反馈”。所以它不是脱离 RLHF 的另一条路线，而是 RLHF 的一次监督源重写。

从结构上看，CAI 没有推翻 InstructGPT，反而承认 InstructGPT 框架是对的：仍然需要 SFT、仍然需要 preference model、仍然需要 RL。它改变的是“偏好从哪里来”。这也解释了为什么后续 RLAIF、AI judge、self-rewarding 等工作都能自然接到 CAI 之后。

#### 🧪 练习题
```yaml
question: "CAI 相比标准 RLHF 的最核心变化是什么？"
options:
  - "完全去掉了偏好模型，只保留监督微调"
  - "把 harmlessness 的大量人工偏好标签替换为 constitution 驱动的 AI feedback"
  - "不再使用强化学习，只做对比学习"
  - "用更大的基础模型替换 PPO"
answer: 1
explain: "CAI 仍然保留 preference model 和 RL，但把 harmlessness 监督从大量人工比较标签改成了原则驱动的 AI 反馈。"
```

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
RLAIF 用现成 LLM 生成偏好或奖励信号来替代昂贵的人类偏好标注，并证明在摘要、帮助性对话和无害性对话任务上可达到与 RLHF 接近的对齐效果。

#### 🎯 核心要点
- 系统比较 RLAIF 与 RLHF：用 AI 偏好标签训练奖励模型，再用强化学习优化策略模型
- AI 标注器使用 off-the-shelf LLM，不针对下游任务微调，主要实验使用 PaLM 2 系列
- 偏好标签来自 token “1” 与 “2” 的 log-probability softmax，保留软标签不确定性
- 通过交换候选回答顺序做两次推断并平均，缓解 LLM 对第一/第二位置的偏置
- 引入 CoT 两阶段偏好标注：先让 LLM 生成理由，再把理由拼回 prompt 中计算偏好分布
- 提出 canonical RLAIF 和 direct-RLAIF：前者蒸馏 AI 偏好到 Reward Model，后者直接让 LLM 在 RL 时给 1-10 分奖励
- RL 阶段采用带 baseline 的 REINFORCE 语言模型目标，终止 token 获得 RM 或 LLM 奖励
- 实验覆盖 Reddit TL;DR、OpenAI human preferences、Anthropic Helpful/Harmless 偏好数据集
- 人类评估中 RLAIF 与 RLHF 在摘要和帮助性对话上无显著差异，在无害性对话上 RLAIF harmless rate 更高

#### 🔬 深入细节
![RLAIF 与 RLHF 流程对比](https://arxiv.org/html/2309.00267v3/x3.png)
*图：论文 Figure 2。RLAIF 用 LLM 生成偏好标签训练 RM，而 RLHF 使用人类偏好标注。*

![RLAIF 的 AI 偏好标注流程](https://arxiv.org/html/2309.00267v3/x4.png)
*图：论文 Figure 3。LLM 先生成偏好理由，再基于拼接后的 prompt 输出 “1” 与 “2” 的偏好分布。*

![Direct-RLAIF 流程](https://arxiv.org/html/2309.00267v3/x5.png)
*图：论文 Figure 4。Direct-RLAIF 直接调用通用 LLM 给生成结果打分，把分数作为 RL 奖励。*

```python
# Canonical RLAIF + Direct-RLAIF 训练流程伪代码
def ai_preference_labeler(llm, context, response_a, response_b):
    prompt_ab = build_preference_prompt(context, response_a, response_b)
    p_ab = softmax(llm.logprob(prompt_ab, tokens=["1", "2"]))

    prompt_ba = build_preference_prompt(context, response_b, response_a)
    p_ba_reversed = softmax(llm.logprob(prompt_ba, tokens=["2", "1"]))

    return average(p_ab, p_ba_reversed)  # 缓解位置偏差的软偏好标签


def canonical_rlaif(policy_sft, ai_labeler, preference_pairs):
    ai_labels = []
    for context, y1, y2 in preference_pairs:
        ai_labels.append(ai_preference_labeler(ai_labeler, context, y1, y2))

    reward_model = train_reward_model_cross_entropy(preference_pairs, ai_labels)

    policy = copy(policy_sft)
    value_model = initialize_value_model(policy_sft)
    for batch in rollout_prompts():
        responses = policy.generate(batch)
        rewards = reward_model.score(batch, responses)
        policy, value_model = reinforce_update(policy, value_model, batch, responses, rewards)

    return policy


def direct_rlaif(policy_sft, scoring_llm):
    policy = copy(policy_sft)
    value_model = initialize_value_model(policy_sft)

    for batch in rollout_prompts():
        responses = policy.generate(batch)
        rewards = []
        for context, response in zip(batch, responses):
            probs = normalize(scoring_llm.logprob(score_prompt(context, response), tokens=list("123456789") + ["10"]))
            score = sum(i * probs[str(i)] for i in range(1, 11))
            rewards.append(normalize_to_minus_one_one(score))
        policy, value_model = reinforce_update(policy, value_model, batch, responses, rewards)

    return policy
```

RLAIF 的动机来自 RLHF 的标注瓶颈。RLHF 需要人类对候选回答做成对偏好比较，这在摘要、对话安全、复杂指令等任务中成本高、周期长且扩展困难。本文要回答的问题不是“AI 反馈能不能辅助人类反馈”，而是更强的版本：在控制任务和训练流程的情况下，AI 反馈能否作为人类反馈的可行替代。

AI 偏好标注的基本单元是一段上下文 \(x\) 和两个候选回答 \(y_1,y_2\)。论文把 prompt 组织为 preamble、few-shot exemplars、sample、ending 四段，然后读取 LLM 生成 token “1” 和 “2” 的 log-probability：
$$
P_{\text{AI}}=\operatorname{softmax}(\log p(\text{"1"}\mid x,y_1,y_2),\log p(\text{"2"}\mid x,y_1,y_2)).
$$
使用软标签比硬标签更有信息量，因为 \(P_{\text{AI}}=[0.55,0.45]\) 和 \([0.99,0.01]\) 代表完全不同的置信度。

位置偏差是 AI 标注器的主要噪声源。LLM 可能偏向第一或第二个展示的回答，而不是只根据内容判断。论文对同一候选对做两次推断：一次按 \((y_1,y_2)\)，一次交换为 \((y_2,y_1)\)，再把第二次结果映射回原顺序后平均。这个设计把“内容偏好”和“位置偏好”拆开，尤其能缓解小模型标注器更强的位置偏置。

Canonical RLAIF 把 AI 偏好蒸馏进 Reward Model。若 RM 给两个回答的分数为 \(r_\phi(x,y_1)\)、\(r_\phi(x,y_2)\)，训练目标是让 RM 的 softmax 分布匹配 AI 软偏好：
$$
\mathcal{L}_{RM}
=-\sum_{i\in\{1,2\}}P_{\text{AI}}(i)
\log\frac{\exp r_\phi(x,y_i)}{\exp r_\phi(x,y_1)+\exp r_\phi(x,y_2)}.
$$
这样做的好处是 RL 阶段只需调用较小 RM，成本低；缺点是 RM 固定在初始策略生成的数据分布上，随着策略更新可能出现 reward model staleness。

Direct-RLAIF 直接绕过 RM。论文让 off-the-shelf LLM 对生成回答给 1 到 10 分，读取每个分数 token 的概率并计算期望分：
$$
s(y\mid x)=\sum_{i=1}^{10} i\cdot P(i\mid x,y),
$$
再归一化到 \([-1,1]\) 作为 RL 奖励。它省掉了偏好数据生成和 RM 训练，也避免 RM 过时；代价是 RL 过程中需要频繁调用 LLM 标注器，计算成本更高。

RL 优化采用语言模型版 REINFORCE。状态 \(X_t\) 是 prompt 加上已生成 token，动作 \(A_t\) 是下一个 token，只有完整回答结束时获得非零奖励 \(R_T\)。当 \(\gamma=1\) 时，每个时间步的 return 都是 \(Z_t=R_T\)，策略梯度损失写作：
$$
\mathcal{L}_{PG}(\theta)
=-\sum_t \log\pi_\theta(A_t\mid X_t)\,
\overline{(Z_t-V^\pi_\psi(X_t))}.
$$
上划线表示优势项不反传梯度；\(V^\pi_\psi\) 是 value baseline，用 MSE 拟合 return，从而降低 REINFORCE 的方差。

实验结论的关键是：RLAIF 不只是省钱，还能在端到端人类评估中接近 RLHF。论文报告摘要任务中 RLAIF/RLHF 相对 SFT 胜率为 71%/73%，帮助性对话为 63%/64%，两者差异不显著；无害性对话中 RLAIF harmless rate 为 88%，高于 RLHF 的 76%。不过 AI 反馈也会继承标注 LLM 的偏见和盲点，在医疗、法律等高风险场景仍不应把 AI 标注器视为人类专家的无条件替代。

> 💡 关键：RLAIF 的核心不是换一个奖励函数名称，而是把“人类偏好数据采集”替换为“LLM 偏好或评分生成”，并用位置去偏、CoT、软标签和 direct scoring 控制 AI 标注噪声。

#### 🧪 练习题
```yaml
question: "Direct-RLAIF 相比 canonical RLAIF 的主要区别是什么？"
options:
  - "Direct-RLAIF 不使用任何强化学习"
  - "Direct-RLAIF 直接调用 LLM 给生成结果打分作为奖励，不先训练 Reward Model"
  - "Direct-RLAIF 只能使用人类偏好标签"
  - "Direct-RLAIF 只适用于分类任务，不能用于文本生成"
answer: 1
explain: "Canonical RLAIF 先用 AI 偏好训练 RM，再用 RM 奖励做 RL；Direct-RLAIF 在 RL 过程中直接用 LLM 打分作为奖励，避免 RM staleness。"
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
ORPO 将监督微调和偏好对齐合并为单阶段训练，在标准 SFT 负对数似然旁加入 odds ratio 偏好损失，让模型提升 chosen 响应概率的同时温和惩罚 rejected 响应，从而不再需要 DPO/RLHF 中的冻结参考模型。

#### 🎯 核心要点
- 单阶段对齐：直接在偏好数据 \((x,y_w,y_l)\) 上训练，无需先 SFT 再单独做 DPO/PPO 对齐
- 无参考模型：损失只依赖当前策略 \(\pi_\theta\)，不需要 \(\pi_{\text{ref}}\) 的额外前向与显存
- 监督项保留领域适配：\(\mathcal{L}_{\text{SFT}}\) 只对 chosen 响应做 NLL，维持指令跟随和输出格式学习
- 偏好项使用 odds ratio：用 \(\text{odds}_\theta(y|x)=P_\theta(y|x)/(1-P_\theta(y|x))\) 对 chosen/rejected 做相对比较
- 关键观察：普通 SFT 会同时提高 chosen 与 rejected 的 log probability，缺少显式“压低坏回答”的机制
- 计算效率高：相对 DPO 省去 reference model，训练时主要多计算同一模型上 chosen/rejected 两条序列的 log probability
- 论文在 OPT、Phi-2、Llama-2、Mistral 等模型上验证；Mistral-ORPO 在 AlpacaEval 2.0、IFEval、MT-Bench 上达到强同规模表现

#### 🔬 深入细节
##### 核心示意图

![ORPO 对齐流程对比](https://arxiv.org/html/2403.07691v2/x2.png)
*图：论文 Figure 2。ORPO 将 SFT 的强适配信号和 rejected 响应的弱惩罚放在同一个目标函数内，不再维护 reference model 或额外对齐阶段。*

##### 算法伪代码

```python
# ORPO: one-stage SFT + odds-ratio preference optimization
for batch in dataloader:
    x, y_w, y_l = batch  # prompt, chosen response, rejected response

    logp_w_tokens = model.log_probs(x, y_w)
    logp_l_tokens = model.log_probs(x, y_l)

    # chosen-only supervised fine-tuning term
    loss_sft = -mean(logp_w_tokens)

    # sequence-level mean log likelihood
    logp_w = mean(logp_w_tokens)
    logp_l = mean(logp_l_tokens)
    p_w, p_l = exp(logp_w), exp(logp_l)

    log_odds_w = log(p_w) - log(1 - p_w + eps)
    log_odds_l = log(p_l) - log(1 - p_l + eps)
    loss_or = -log_sigmoid(log_odds_w - log_odds_l)

    loss = loss_sft + lambda_or * loss_or
    loss.backward()
    optimizer.step()
```

##### 1. 动机：SFT 本身不会惩罚 rejected 风格

ORPO 的出发点不是“完全抛弃 SFT”，而是指出 SFT 在偏好数据上缺了一个关键方向。普通 SFT 只最大化 chosen 响应 token 的似然；对 rejected 响应里出现的 token，没有直接惩罚。论文在 HH-RLHF 上观察到，随着 SFT 进行，chosen 和 rejected 的 log probability 都会上升。这说明模型学到的是“对话/指令域的通用分布”，而不是“chosen 比 rejected 更好”的偏好边界。

因此，ORPO 把问题改写成一个单阶段目标：chosen 响应用 NLL 提供强适配信号，rejected 响应通过 odds ratio 项参与对比。这样模型仍然能快速适应目标域，但不会像单纯 SFT 那样无差别抬高不受偏好的回答。

##### 2. 核心机制：为什么是 odds ratio 而不是 probability ratio

对输出序列 \(y=(y_1,\dots,y_m)\)，ORPO 先定义平均 log likelihood：

$$
\log P_\theta(y\mid x)=\frac{1}{m}\sum_{t=1}^{m}\log P_\theta(y_t\mid x,y_{<t}).
$$

然后定义序列级 odds：

$$
\text{odds}_\theta(y\mid x)=\frac{P_\theta(y\mid x)}{1-P_\theta(y\mid x)}.
$$

chosen 对 rejected 的 odds ratio 写作：

$$
\text{OR}_\theta(y_w,y_l\mid x)=
\frac{\text{odds}_\theta(y_w\mid x)}
{\text{odds}_\theta(y_l\mid x)}.
$$

直觉上，probability ratio 只看 \(P(y_w)/P(y_l)\)，而 odds ratio 还考虑“不是该序列”的补集概率。当序列概率很小或模型还没有充分适应目标域时，odds ratio 给出的梯度更适合做温和区分，不会过早把 rejected 中仍有用的语言模式整体压低。

##### 3. 目标函数：SFT 主导适配，OR 项负责偏好分离

ORPO 的完整目标是：

$$
\mathcal{L}_{\text{ORPO}}=
\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}
\left[
\mathcal{L}_{\text{SFT}}(x,y_w)
+\lambda\mathcal{L}_{\text{OR}}(x,y_w,y_l)
\right].
$$

其中 SFT 项为：

$$
\mathcal{L}_{\text{SFT}}=
-\frac{1}{|y_w|}\sum_{t=1}^{|y_w|}
\log P_\theta(y_w^{(t)}\mid x,y_w^{(<t)}).
$$

偏好项为：

$$
\mathcal{L}_{\text{OR}}=
-\log\sigma\left(
\log\frac{\text{odds}_\theta(y_w\mid x)}
{\text{odds}_\theta(y_l\mid x)}
\right).
$$

当 chosen 的 odds 明显大于 rejected 时，\(\mathcal{L}_{\text{OR}}\) 很小；当 rejected 反而更可能时，该项会产生更强梯度，推动模型上调 chosen、下调 rejected。这里的 \(\lambda\) 控制偏好惩罚强度，论文常用小权重，使训练仍以 SFT 的稳定适配为主。

##### 4. 与 DPO/RLHF 的差别

RLHF 通常需要 reward model、reference model、policy、value model 等多组件流水线；DPO 虽然省掉显式 reward model，但仍要用 \(\pi_{\text{ref}}\) 计算相对 log ratio。ORPO 的关键取舍是：不再用 reference model 衡量“相对旧策略的提升”，而是直接让当前模型在同一 prompt 下区分 chosen 与 rejected 的 odds。

这也解释了 ORPO 的工程优势。它不是在线 RL，不需要采样 rollout 后再用 PPO 优化；它也不像 DPO 那样每个 batch 都要冻结模型前向。训练数据仍是偏好对，但训练形态更接近普通 causal LM fine-tuning，只是在 loss 中增加一项对 rejected 的序列级对比。

##### 5. 训练和推理流程

训练时，每条样本包含 prompt、chosen、rejected。模型分别计算两条响应的 token log probability：chosen 的 token 用于 NLL；chosen/rejected 的序列平均概率再转为 odds，进入 OR loss。两个损失相加后做一次反向传播。推理时只保留训练后的 policy model，没有 reward model、reference model 或 value model。

> 💡 关键：ORPO 的“无参考模型”不是没有偏好基准，而是把基准改成同一 prompt 下 chosen 与 rejected 的 odds 对比。

##### 6. 实验解读

论文在 HH-RLHF 和 Binarized UltraFeedback 上比较 SFT、RLHF、DPO 与 ORPO，并覆盖 OPT 125M/350M/1.3B、Phi-2 2.7B、Llama-2 7B、Mistral 7B。结果显示，ORPO 对中小规模模型尤其有效：它能在单阶段训练中同时获得领域适配和偏好分离，避免 SFT 只学到“对话格式”而不学“好坏边界”。

在公开 leaderboard 上，Mistral-ORPO 系列在 AlpacaEval 2.0、IFEval 和 MT-Bench 上达到强表现。这个结果的意义不只是分数，而是说明 reference-free 的偏好损失可以成为 DPO/RLHF 的轻量替代，尤其适合资源受限、希望把 SFT 和 alignment 合并的场景。

#### 🧪 练习题
```yaml
question: "ORPO 相比 DPO 最核心的工程变化是什么？"
options:
  - "引入一个更大的 reward model 来提高偏好分数精度"
  - "使用 odds ratio 偏好损失，把 SFT 和偏好对齐合并到单阶段，并去掉 reference model"
  - "只训练 rejected 响应，不再使用 chosen 响应"
  - "把在线 PPO rollout 替换成 beam search"
answer: 1
explain: "ORPO 的核心是 L_SFT + lambda L_OR：chosen 仍做监督微调，chosen/rejected 通过 odds ratio 做偏好分离，因此不需要 DPO 的冻结参考模型。"
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
SimPO 提出了一种无参考模型的直接偏好优化方法，用序列平均对数概率作为隐式奖励，并用目标奖励间隔增强 winner 和 loser 的区分。它重点解决 DPO 奖励与生成概率不一致、以及 token 累加奖励导致的长度偏见问题。

#### 🎯 核心要点
- **长度归一化奖励**：把 \(\log \pi_\theta(y|x)\) 除以响应长度 \(|y|\)，使用平均 token 对数概率比较长短回答。
- **无参考模型**：移除 DPO 中的 \(\pi_{\mathrm{ref}}\)，训练时不再需要参考模型前向传播，降低显存与计算开销。
- **目标奖励间隔**：在 Bradley-Terry 偏好目标中加入 \(\gamma\)，要求 chosen response 的奖励不仅高于 rejected response，还要高出指定 margin。
- **训练-推理对齐**：SimPO 的奖励形式直接对应推理中常用的平均 log-likelihood，减少 DPO 中“训练奖励排序”和“生成概率排序”不一致的问题。
- **与 DPO 家族的关系**：保留 DPO 的成对偏好监督形式，但把奖励从 log-ratio 改成 reference-free 的长度归一化概率。
- **经验验证范围**：论文在 Mistral、Llama 3、Gemma 2 的 base/instruct 设置上，与 DPO、IPO、KTO、CPO、ORPO 等偏好优化方法比较，并在 AlpacaEval 2、MT-Bench、Arena-Hard 等聊天评测上报告提升。

#### 🔬 深入细节
![SimPO 与 DPO 奖励对比](https://arxiv.org/html/2405.14734v3/x1.png)
*图：论文 Figure 1 展示了 DPO 和 SimPO 的奖励形式差异。DPO 使用相对参考模型的 log-ratio，SimPO 直接使用当前策略的长度归一化平均对数概率。*

```python
# SimPO preference optimization, simplified from the paper objective
for x, y_w, y_l in preference_batches:
    # y_w: preferred/chosen response, y_l: rejected response
    logp_w = policy.log_prob(x, y_w).sum()
    logp_l = policy.log_prob(x, y_l).sum()

    reward_w = beta * logp_w / len(y_w)
    reward_l = beta * logp_l / len(y_l)

    # target reward margin gamma enforces reward_w - reward_l >= gamma
    margin = reward_w - reward_l - gamma
    loss = -log_sigmoid(margin).mean()

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

DPO 的隐式奖励为

$$
r_{\mathrm{DPO}}(x,y)=\beta \log \frac{\pi_\theta(y|x)}{\pi_{\mathrm{ref}}(y|x)}
$$

这个奖励依赖参考模型，并且由整段响应的 token log-probability 累加得到。由于长响应包含更多 token，累加概率和长度会发生耦合，模型可能学到“更长就是更优”的捷径。SimPO 的核心改动是把奖励改成

$$
r_{\mathrm{SimPO}}(x,y)=\frac{\beta}{|y|}\log \pi_\theta(y|x)
$$

这里的 \(|y|\) 是响应长度。直觉上，SimPO 比较的是“平均每个 token 有多符合当前策略”，而不是“整段响应累计得分多高”。这使短而高质量的回答不会因为 token 少而在偏好损失中天然吃亏，也让训练目标更接近推理阶段的长度归一化解码标准。

目标奖励间隔 \(\gamma\) 是第二个关键设计。SimPO 的训练损失写作

$$
\mathcal{L}_{\mathrm{SimPO}}=
-\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}
\left[
\log \sigma\left(
\frac{\beta}{|y_w|}\log\pi_\theta(y_w|x)
-
\frac{\beta}{|y_l|}\log\pi_\theta(y_l|x)
-
\gamma
\right)
\right].
$$

如果没有 \(\gamma\)，模型只需要让 chosen 的奖励略高于 rejected 就能降低损失，偏好边界可能较弱。加入 \(\gamma\) 后，优化目标要求两者拉开一个明确间隔，等价于在 Bradley-Terry 成对比较里加入 margin。这个 margin 不能无限增大，过大时会迫使模型过度拉开奖励分布，可能损害生成质量。

SimPO 与 DPO 的另一处重要差异是训练成本。DPO 每个 batch 通常要计算 policy 和 reference policy 的 log-probability；SimPO 只需要当前 policy，因此更适合大模型后训练。它并不是完全放弃约束，而是用长度归一化和 reward margin 让偏好学习更贴近生成目标，同时保留 SFT 初始化带来的语言能力。

从优化流程看，SimPO 仍然是离线偏好优化：输入是固定的 \((x,y_w,y_l)\) 偏好三元组，不需要在线 rollout、奖励模型训练或 PPO。相对 ORPO、CPO 等同样试图简化 RLHF 的方法，SimPO 的特点是损失形式非常紧凑：一个 reference-free reward 加一个 margin logistic loss，主要复杂度都集中在 \(\beta\) 和 \(\gamma\) 两个超参数的尺度选择上。

> 💡 关键：SimPO 的“简单”不只是少了参考模型，更重要的是奖励和推理时的平均 log-probability 对齐；长度归一化是它消除长度偏见的主要机制。

#### 🧪 练习题
```yaml
question: "SimPO 中把 \\(\\log\\pi_\\theta(y|x)\\) 除以响应长度 \\(|y|\\) 的主要目的是什么？"
options:
  - "把序列累计对数概率变成平均 token 对数概率，减少长度偏见"
  - "让模型必须生成更长的回答"
  - "替代 tokenizer 的分词规则"
  - "把离线偏好优化改成在线 PPO"
answer: 0
explain: "长度归一化让长短响应在同一平均概率尺度上比较，避免仅因 token 数更多而获得系统性奖励优势。"
```

### ReMax

```yaml
id: remax
num: 12
name: ReMax
full_name: 贪心基线强化学习 (REINFORCE with Max Baseline)
year: '2023.10'
org: CUHK-Shenzhen / Nanjing University / Polixir.ai
parent: ppo
paper_url: https://arxiv.org/abs/2310.10505
project_url: ''
category: online_rl
motivation: 移除Critic节省50%显存
```

#### 📝 一句话总结
ReMax 观察到 RLHF 具有“快速仿真、确定性转移、轨迹级奖励”三项特殊结构，因此不再沿用通用 RL 的 PPO+value model 方案，而是回到 REINFORCE，并用同一 prompt 下的贪心响应作为 baseline 做方差约简，在大幅降低显存和训练时间的同时保持甚至超过 PPO 的对齐效果。

#### 🎯 核心要点
- 重新审视 RLHF 的任务结构，指出 PPO 对 LLM 对齐来说过于复杂，value model 带来大量显存和调参负担
- 基于 REINFORCE 构造无偏策略梯度，不再训练额外 critic / value model
- 关键方差约简技巧：对每个 prompt 额外生成一个 greedy baseline response，用 reward 差值替代原始 reward
- 保留 reference model 用于 KL regularization，但移除所有与 value model 相关的模块
- 相比 PPO 能少掉至少 4 个关键超参数，例如 clip ratio、GAE 系数、value lr、off-policy epoch 数
- 在 7B 模型上约节省 46% GPU 显存，训练吞吐约为 PPO 的 1.6 倍
- 在 Mistral-7B 上取得 94.78% AlpacaEval 胜率和 7.739 MT-Bench 分数，论文报告为当时开源 7B 模型新 SOTA

#### 🔬 深入细节
##### 1. 核心框架图

![PPO 与 ReMax 的模块对比](https://arxiv.org/html/2310.10505v4/x1.png)

*图：论文 Figure 1。ReMax 保留 policy model、reward model 和 reference model，但去掉了 PPO 中占大头的 value model 及其训练链路。*

##### 2. 核心算法伪代码

```python
# ReMax for RLHF
for prompt in dataset:
    # 1. 从当前策略采样一个随机响应
    seq = lm.sample(prompt, greedy=False)

    # 2. 对同一 prompt 再生成一个贪心响应，作为 baseline
    seq_max = lm.sample(prompt, greedy=True)

    # 3. 用 reward 差值做 advantage-like 标量
    rew = rm(prompt, seq) - rm(prompt, seq_max)

    # 4. 计算随机响应的 token log-prob
    logp = lm.inference(prompt, seq)

    # 5. REINFORCE 更新
    loss = -(logp.sum(dim=-1) * rew).mean()
    lm.minimize(loss)
```

##### 3. 为什么 PPO 在 RLHF 里“杀鸡用牛刀”

ReMax 的出发点不是单纯想做一个更轻量的 PPO 变体，而是从任务结构上质疑 PPO 是否真的是 RLHF 的最佳选择。论文指出，RLHF for LLMs 与经典强化学习环境有三个本质区别：

- **fast simulation**：生成一条完整 response 的代价相对低，不像机器人或游戏环境那样需要昂贵交互；
- **deterministic transitions**：下一个状态就是“已有上下文 + 当前生成 token”，不存在环境随机动力学；
- **trajectory-level rewards**：reward model 通常只在整条 response 结束后给一个整体分数，而不是每步 dense reward。

这三点意味着，PPO 在通用 RL 中引入的许多复杂机制，在 RLHF 里并没有被充分利用。特别是 value model：在经典 RL 中，它承担长期回报估计、bootstrapping 和方差控制的重要作用；但在 RLHF 这种 deterministic、terminal-reward 的 setting 下，它的收益并没有大到足以覆盖额外代价。作者认为，PPO 更像是“能用”，而不是“最合适”。

论文因此回到更朴素的策略梯度观点：既然环境转移不随机、奖励在轨迹末端一次性给出，那么用 trajectory-level REINFORCE 就已经能够构造无偏梯度，真正的问题只剩下 **如何把方差压下来**。

##### 4. 从 REINFORCE 到 ReMax：用贪心响应做 baseline

标准 REINFORCE 的形式是：

$$
\nabla_\theta J(\theta)
=
\mathbb{E}_{y\sim\pi_\theta(\cdot|x)}
\left[
r(x,y)\,\nabla_\theta \log \pi_\theta(y|x)
\right].
$$

它是无偏的，但 notoriously 高方差。原因在于不同 prompt 上 reward scale 可能差异极大，而 open-ended generation 的随机性又会进一步放大梯度波动。ReMax 的关键观察是：在 RLHF 中，我们可以对同一个 prompt 很便宜地再生成一条 **greedy response**，把它当作 control variate / baseline。

于是论文把更新量改成：

$$
\nabla_\theta J_{\mathrm{ReMax}}(\theta)
=
\mathbb{E}
\left[
\bigl(r(x,y)-r(x,y_{\max})\bigr)\,
\nabla_\theta \log \pi_\theta(y|x)
\right],
$$

其中 \(y\) 是随机采样响应，\(y_{\max}\) 是当前模型在同一 prompt 下的贪心输出。这个 baseline 有几个好处：

- 它与当前 prompt 强相关，比全局平均 reward 更贴近局部参考；
- 它不依赖额外学习出的 value model，因此不会引入 critic 训练误差；
- 它仍然保持了 REINFORCE 的无偏结构，同时显著降低奖励尺度波动。

直觉上可以这么理解：ReMax 不再问“这个随机响应本身值多少分”，而是问“它比当前模型最稳妥的贪心答案好还是差多少”。这样做以后，优化目标更像“超过自己当前最确定的策略”，而不是在不同 prompt 之间直接比较绝对 reward。

> 💡 关键：ReMax 不是 best-of-n。它不会在推理时保留多个候选里最好的那个，而是在训练时用 greedy response 作为方差约简基线，真正更新的仍然是随机采样 response 的 log-prob。

##### 5. 与 PPO、REINFORCE 和 DPO 的区别

ReMax 可以看作位于 PPO 与纯 REINFORCE 之间的一条折中路线。

和 **PPO** 相比：
- 它保留在线采样和 reward model 更新信号，因此仍属于标准 RLHF 路线；
- 但它完全移除了 value model，不再需要 GAE、clip ratio 调参和多轮 off-policy epoch；
- 同时保留 reference model 的 KL penalty，以防策略偏离初始 SFT/reference 太远。

和 **纯 REINFORCE** 相比：
- 它的无偏性没有变；
- 但通过 `reward(sample) - reward(greedy)` 的结构，把梯度方差压低了很多。

论文 Figure 4 直接展示了这一点：纯 REINFORCE 在大模型上会出现非常不稳定的梯度范数和更差的 reward 演化，而 ReMax 则稳定得多。

和 **DPO** 相比：
- DPO 是离线偏好学习，不需要 reward model 在线打分；
- ReMax 则继续保留在线 RLHF 的 adaptive reward across prompts 和 online update 能力；
- 因此在作者的比较表里，ReMax 同时拥有“在线更新 + reward 自适应 + 高效率”，而 DPO 缺少在线适应能力。

##### 6. 显存与效率：为什么它能省这么多

论文给出的工程结果非常直接。对 7B 模型，reward model 只占很小一部分显存，而 value model 连同其优化状态、激活、梯度等，会吞掉约 46% 的 GPU 内存。因此只要把 value model 删除，ReMax 就能立即获得大幅度资源节省。

![PPO 与 ReMax 的显存和时间开销对比](https://arxiv.org/html/2310.10505v4/x2.png)

*图：论文 Figure 2。ReMax 在 Llama-2-7B 上显著降低显存使用，并缩短训练时间。*

论文报告，在 Llama-2-7B + A800-80GB 的设定下：
- PPO 如果不做 optimizer offload 会顶爆显存；
- ReMax 可以在不依赖这些内存节省技巧的情况下直接训练；
- wall-clock 训练速度大约是 PPO 的 \(1.6\times\)。

这也是 ReMax 在工程上最有现实价值的地方：它不是只在 toy setup 上省一点，而是真的改变了“7B 级 RLHF 在普通算力下能不能跑起来”这个问题。

##### 7. 论文实验结论

论文做了两大类实验：

- **效果实验**：在 full-hh-rlhf 上对比 PPO、DPO、REINFORCE、ReMax 的 reward 演化和 win-rate；
- **效率实验**：测显存、每 iteration 时间、不同模型规模下的可训练性；
- **Leaderboard 实验**：在 Mistral-7B 上做 RLHF，对 AlpacaEval 和 MT-Bench 打榜。

其中最关键的结论有三条：

- ReMax 的最终 reward 和 win-rate 至少能匹配 PPO，在不少设定下更稳定；
- 它显著优于纯 REINFORCE，说明 greedy baseline 确实解决了方差过大问题；
- 它的 compute efficiency 接近 reward-model-free 方法，但保留了在线 RLHF 的性能优势。

作者最终给出的代表性成绩是：Mistral-7B ReMax 模型在 AlpacaEval 上达到 94.78% 胜率，在 MT-Bench 上达到 7.739，论文将其描述为当时开源 7B 模型的新 SOTA。

#### 🧪 练习题
```yaml
question: "ReMax 相比标准 REINFORCE 的核心改进是什么？"
options:
  - "额外训练一个 value model 来估计每个 token 的优势函数"
  - "把离线偏好对转换为 Bradley-Terry 分类损失"
  - "对同一 prompt 生成一个 greedy baseline response，用 reward 差值降低策略梯度方差"
  - "使用 PPO 的裁剪目标限制策略更新幅度"
answer: 2
explain: "ReMax 的关键不是引入 critic 或 PPO clipping，而是用同 prompt 下的贪心输出作为 baseline，使 REINFORCE 在 RLHF 中既无偏又更低方差。"
```

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
SPIN 提出一种只依赖已有 SFT 数据的自博弈微调方法：旧模型为同一 prompt 生成合成回答，新模型学习把人类回答和旧模型回答区分开，并在多轮迭代中逐步逼近人类示范分布。

#### 🎯 核心要点
- 自博弈数据构造：每轮用当前/旧模型 \(p_{\theta_t}\) 为 SFT prompt 生成 synthetic response \(y'\)
- 人类回答作为正例：原始 SFT 响应 \(y\) 来自 \(p_{\text{data}}\)，训练时被视作优于模型自生成回答
- DPO-like 更新：用新旧模型 log probability ratio 构造判别分数，训练 \(p_{\theta_{t+1}}\) 偏好 \(y\) 而非 \(y'\)
- 不需要额外偏好标注：训练信号来自已有示范数据与模型自身生成，不依赖 GPT-4 评审或新的人类 pairwise preference
- 迭代式提升：第 \(t+1\) 轮训练好的模型成为下一轮 opponent，继续产生更强的负例
- 理论保证：在论文假设下，目标函数全局最优仅在模型分布 \(p_\theta=p_{\text{data}}\) 时达到
- 实验基于 zephyr-7b-sft-full 和 UltraChat200k，评估覆盖 HuggingFace Open LLM Leaderboard、MT-Bench 与 Big-Bench

#### 🔬 深入细节
##### 核心示意图

![SPIN 自博弈流程](https://ar5iv.labs.arxiv.org/html/2401.01335/assets/x1.png)
*图：论文 Figure 1。旧模型生成合成回答，新模型学习区分人类回答和旧模型回答；下一轮再用更新后的模型生成更强对手样本。*

![SPIN 官方算法图](https://uclaml.github.io/SPIN/static/images/algorithm.png)
*图：官方项目页给出的 SPIN Algorithm 图源，展示按轮次生成 synthetic data 并更新模型的流程。*

##### 算法伪代码

```python
# SPIN: Self-Play Fine-Tuning
theta = theta_sft
for t in range(num_iterations):
    pairs = []
    old_model = freeze(theta)

    for x, y_human in sft_dataset:
        y_model = old_model.generate(x)
        pairs.append((x, y_human, y_model))

    # Train a new model from the previous model.
    theta_new = copy(theta)
    for batch in minibatches(pairs):
        x, y, y_prime = batch
        score_human = lambda_ * (
            logprob(theta_new, x, y) - logprob(old_model, x, y)
        )
        score_model = lambda_ * (
            logprob(theta_new, x, y_prime) - logprob(old_model, x, y_prime)
        )
        loss = -log_sigmoid(score_human - score_model)
        update(theta_new, loss)

    theta = theta_new

return theta
```

##### 1. 动机：SFT 数据并没有被一次训练“榨干”

SPIN 关注的问题是：当一个模型已经在高质量示范数据上做过 SFT 后，继续用同一批数据多轮 SFT 往往收益很小，甚至可能退化。但这不代表示范数据的信息已经被充分利用。论文的核心想法是把 SFT 数据从“单点监督标签”变成“自博弈中的人类分布样本”：同一个 prompt 下，人类回答是正样本，当前模型回答是负样本。

这样做的好处是训练信号会随着模型能力变化而变化。早期模型生成的负例较弱，新模型容易区分；随着迭代推进，旧模型负例越来越接近人类回答，训练难度也逐渐提高。SPIN 因此把静态 SFT 数据变成了动态 curriculum。

##### 2. 目标函数：判别人类分布与旧模型分布

论文先把主玩家写成一个判别函数 \(f_{t+1}\)，目标是让它给人类回答更高分、给旧模型回答更低分：

$$
f_{t+1}=
\arg\min_{f\in\mathcal{F}_t}
\mathbb{E}_{x\sim q,\ y\sim p_{\text{data}},\ y'\sim p_{\theta_t}}
\left[
\ell\left(f(x,y)-f(x,y')\right)
\right].
$$

其中 \(\ell(t)=\log(1+\exp(-t))\) 是 logistic loss。SPIN 随后把函数类限制为新旧策略的 log ratio：

$$
\mathcal{F}_t=
\left\{
\lambda\log
\frac{p_\theta(y\mid x)}
{p_{\theta_t}(y\mid x)}
\,\middle|\,\theta\in\Theta
\right\}.
$$

代入后，实际训练目标可以写成 DPO-like 形式：

$$
\mathcal{L}_{\text{SPIN}}(\theta;\theta_t)=
-\mathbb{E}
\left[
\log\sigma\left(
\lambda\log\frac{p_\theta(y\mid x)}{p_{\theta_t}(y\mid x)}
-
\lambda\log\frac{p_\theta(y'\mid x)}{p_{\theta_t}(y'\mid x)}
\right)
\right].
$$

这和 DPO 的形态很像，但 winner/loser 不是人工偏好对，而是“人类示范回答 vs 当前模型自生成回答”。\(\theta_t\) 同时扮演 reference policy 和 opponent：它既生成负例，也定义相对提升的基准。

##### 3. 训练流程：生成、判别、替换对手

每一轮 SPIN 包含两个阶段。第一阶段冻结旧模型 \(p_{\theta_t}\)，对每个 SFT prompt 生成回答 \(y'\)。第二阶段用 \((x,y,y')\) 训练新模型 \(p_{\theta_{t+1}}\)，让新模型相对旧模型更偏好人类回答、更不偏好旧模型回答。

训练结束后，\(p_{\theta_{t+1}}\) 不只是输出模型，也会成为下一轮生成负例的 opponent。这个设计让“负样本质量”跟着模型能力一起上升，避免只用初始弱模型生成的一批固定负例导致训练信号很快饱和。

##### 4. 与 DPO/RLHF 的关系

RLHF 需要额外收集偏好数据并训练 reward model；DPO 省掉 reward model，但仍需要同一 prompt 下的人工或模型标注偏好对。SPIN 的监督来源更弱：只需要 SFT demonstration。偏好标签由构造方式自然产生，人类示范 \(y\) 被视为胜者，旧模型生成 \(y'\) 被视为败者。

SPIN 也不是传统在线 RL。它没有显式奖励模型和 rollout reward，而是把自生成回答转化为 offline preference-like batch，再用稳定的二分类/logistic 目标优化。因此它处在 SFT 和偏好优化之间：数据来自 SFT，目标函数像 DPO，样本刷新方式像自博弈。

##### 5. 理论直觉：什么时候停止进步

论文证明，在单调递减且凸的损失假设下，SPIN 的全局最优点对应 \(p_\theta=p_{\text{data}}\)。直观地说，如果旧模型分布仍不同于人类分布，那么总能找到一个判别函数区分人类回答和模型回答，新模型就还有提升方向；当模型分布已经等于人类分布时，自生成回答与人类回答不可区分，自博弈训练自然不再产生有效优势。

> 💡 关键：SPIN 的“自我进化”不是凭空创造新知识，而是通过越来越强的自生成负例，把已有 SFT 示范数据中的分布约束反复转化为可优化的偏好边界。

##### 6. 实验解读

论文以 zephyr-7b-sft-full 为初始模型，从 UltraChat200k 中抽取 prompt 让模型生成 synthetic responses，并在多轮 SPIN 后评估 Open LLM Leaderboard、MT-Bench 和 Big-Bench。结果显示，SPIN 能突破继续 SFT 的平台期；第 0 轮已经能达到接近使用额外偏好数据的 DPO 训练效果，后续迭代还能继续提升但增益逐渐变小。

这个结果说明 SPIN 最适合的场景是：已有质量不错的 SFT 数据，但额外人类偏好标注昂贵或不可得。它的代价是需要多轮生成和训练，且负例质量依赖初始模型与解码设置；如果模型生成过差或过于模板化，训练信号会偏窄，如果生成已经接近人类分布，后续收益也会自然收敛。

#### 🧪 练习题
```yaml
question: "SPIN 中每轮训练的 rejected/负例主要来自哪里？"
options:
  - "额外收集的人类偏好标注"
  - "GPT-4 对 SFT 数据重新生成的答案"
  - "上一轮模型 p_theta_t 对同一 prompt 生成的回答"
  - "随机打乱的其他 prompt 的人类回答"
answer: 2
explain: "SPIN 的自博弈机制用旧模型为 SFT prompt 生成 synthetic response，并把它与原始人类回答组成训练对。"
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

$$\mathcal{J}_{\text{PPO}}(\theta) = \mathbb{E}_{q\sim P(Q), o\sim\pi_{\theta_{\text{old}}}(O|q)} \frac{1}{|o|}\sum_{t=1}^{|o|} \min\left[\frac{\pi_\theta(o_t|q,o_{1:t-1})}{\pi_{\theta_{\text{old}}}(o_t|q,o_{1:t-1})}A_t, \text{clip}\left(\frac{\pi_\theta(o_t|q,o_{1:t-1})}{\pi_{\theta_{\text{old}}}(o_t|q,o_{1:t-1})}, 1-\varepsilon, 1+\varepsilon\right)A_t\right]$$

其中优势函数 \(A_t\) 由 GAE 算法基于 Value Network \(V_\psi\) 计算得到。

**Token 级奖励定义**（PPO 和 GRPO 通用）：

$$r_t = r_\varphi(q, o_{1:t}) - \beta\log\frac{\pi_\theta(o_t|q, o_{1:t-1})}{\pi_{\text{ref}}(o_t|q, o_{1:t-1})}$$

其中 \(r_\varphi\) 是 reward model（仅在序列结束时给信号或每一步给信号），\(\pi_{\text{ref}}\) 是 reference model（初始 SFT 模型）。

**GRPO 的目标函数**（核心变化）：

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{q\sim P(Q), \{o_i\}_{i=1}^G\sim\pi_{\theta_{\text{old}}}(O|q)} \frac{1}{G}\sum_{i=1}^{G} \frac{1}{|o_i|}\sum_{t=1}^{|o_i|} \left\{ \min\left[\frac{\pi_\theta(o_{i,t}|q,o_{i,1:t-1})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,1:t-1})}\hat{A}_{i,t}, \text{clip}\left(\frac{\pi_\theta(o_{i,t}|q,o_{i,1:t-1})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,1:t-1})}, 1-\varepsilon, 1+\varepsilon\right)\hat{A}_{i,t}\right] - \beta\mathbb{D}_{\text{KL}}\left[\pi_\theta||\pi_{\text{ref}}\right] \right\}$$

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

$$\mathbb{D}_{\text{KL}}\left[\pi_\theta||\pi_{\text{ref}}\right] = \frac{\pi_{\text{ref}}(o_{i,t}|q, o_{i,1:t-1})}{\pi_\theta(o_{i,t}|q, o_{i,1:t-1})} - \log\frac{\pi_{\text{ref}}(o_{i,t}|q, o_{i,1:t-1})}{\pi_\theta(o_{i,t}|q, o_{i,1:t-1})} - 1$$

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

![DAPO 在 AIME 2024 上的主要结果](https://arxiv.org/html/2503.14476v1/x1.png)
*图1: DAPO在Qwen2.5-32B基座模型上仅用约50%训练步数即超过DeepSeek-R1-Zero-Qwen-32B在AIME 2024上的表现。*

DAPO建立在Group Relative Policy Optimization (GRPO) 的基础上。GRPO的目标函数为：

$$\mathcal{J}_{\text{GRPO}}(\theta)=\mathbb{E}_{(q,a)\sim\mathcal{D},\{o_i\}_{i=1}^G\sim\pi_{\theta_{\text{old}}}(\cdot\mid q)}\left[\frac{1}{\sum_{i=1}^G|o_i|}\sum_{i=1}^G\sum_{t=1}^{|o_i|}\min\left(r_{i,t}(\theta)\hat{A}_{i,t},\ \text{clip}\left(r_{i,t}(\theta),1-\varepsilon,1+\varepsilon\right)\hat{A}_{i,t}\right)\right]$$

其中 $$\hat{A}_{i,t}=\frac{r_i-\mu_{\text{group}}}{\sigma_{\text{group}}}$$ 为组内标准化后的优势估计。DAPO在此基础上引入四项关键改进。

##### 2. Decoupled Clipping (解耦裁剪)

传统PPO/GRPO采用对称裁剪界 $$[1-\varepsilon, 1+\varepsilon]$$，DAPO将其解耦为 $$[1-\varepsilon_{\text{low}}, 1+\varepsilon_{\text{high}}]$$，并设置 $$\varepsilon_{\text{high}} > \varepsilon_{\text{low}}$$（具体：$$\varepsilon_{\text{low}}=0.2, \varepsilon_{\text{high}}=0.28$$）。

**核心动机**：在long-CoT RL中，正确样本的概率上升对模型能力增长至关重要。对称裁剪界会**对称地限制概率上升和下降**，当熵坍塌发生时（模型过早收敛），概率上升的限制加剧了探索不足。Clip-Higher通过放大上限、保持下限收紧，使得模型获得奖励时可以大幅提升对应Token的概率，而被惩罚时则限制幅度，从而：

- 提升模型对正向信号的利用效率
- 保持足够的探索空间
- 稳定提升熵值，避免熵坍塌

![Clip-Higher 对 AIME 准确率的影响](https://arxiv.org/html/2503.14476v1/x2.png)
![Clip-Higher 对生成熵的影响](https://arxiv.org/html/2503.14476v1/x3.png)
*图2&3: Clip-Higher策略对熵和概率的影响。注意模型概率提升的同时熵也保持了健康增长。*

**深度解读**：解耦裁剪的思想与信任域优化中的不对称约束有相似之处。在long-CoT场景中，探索性Token的收益需要被更大胆地强化，而错误Token的惩戒则需要谨慎——因为过度的惩戒会迅速压缩探索空间。这一设计哲学可以类比为：**对成功慷慨奖励，对失败温和惩罚**。实验中观察到，若不使用Clip-Higher，熵会持续下降至接近0（熵坍塌），模型陷入几乎确定性生成，丧失探索能力；而加入Clip-Higher后熵维持缓慢上升的健康态势。

##### 3. Dynamic Sampling (动态采样)

传统GRPO对每个prompt采样G个响应后直接训练。DAPO引入过滤机制：

$$\text{约束条件: } 0 < |\{o_i \mid \text{is\_equivalent}(a, o_i)\}| < G$$

即**排除组内全部正确或全部错误的样本组**——这些组产生零梯度（优势全为零），浪费计算资源。过滤后的有效样本进入动态缓冲区，当缓冲区大小达到N后执行一次训练步骤。

![Dynamic Sampling 对训练进度的影响](https://arxiv.org/html/2503.14476v1/x10.png)
*图6: 动态采样对训练效率的影响——尽管采样实例增多，但收敛所需训练步数反而减少。*

**深度解读**：动态采样本质上是一种**在线课程学习**策略。全正确组意味着模型已掌握该题（无需优化），全错误组意味着模型完全不会（无法区分信号）。通过过滤这两类组，训练数据中的每个batch都包含"有改善空间"的样本——既有正确参考又有错误对比，梯度信号最为丰富。值得注意的是，论文指出由于生成时间的瓶颈主要在于长尾样本（少数超长响应的生成），过滤掉零梯度组并不会显著增加总体训练时间，反而因减少无用训练步数而加速收敛。

##### 4. Token-Level Policy Gradient Loss (Token级策略梯度损失)

原始GRPO采用**样本级平均**再聚合的方式，每个样本权重相等。这导致长响应中的每个Token对总损失的贡献被稀释。DAPO改为**全局Token级平均**：

$$\mathcal{J}_{\text{DAPO}}(\theta)=\mathbb{E}\left[\frac{1}{\sum_{i=1}^G|o_i|}\sum_{i=1}^G\sum_{t=1}^{|o_i|}\min\left(r_{i,t}(\theta)\hat{A}_{i,t},\ \text{clip}\left(r_{i,t}(\theta),1-\varepsilon_{\text{low}},1+\varepsilon_{\text{high}}\right)\hat{A}_{i,t}\right)\right]$$

**关键差异**：归一化因子从隐式的样本数归一化变为显式全局Token归一化 $$\frac{1}{\sum|o_i|}$$。

![Token级损失对生成熵的影响](https://arxiv.org/html/2503.14476v1/x6.png)
![Token级损失对平均响应长度的影响](https://arxiv.org/html/2503.14476v1/x7.png)
*图4: Token级损失前后的熵(a)和平均响应长度(b)对比。样本级平均导致熵和长度不健康增长。*

**深度解读**：这一修改解决了两个问题。其一，**对高质量长样本**：Token级平均确保其中每个有效推理步骤都获得充分的学习信号，而不是被长度"稀释"；其二，**对低质量长样本**（包含gibberish、重复词等）：Token级平均能有效惩罚这些不良模式——在样本级平均下，即使某个长响应包含大段重复内容，只要结尾"碰巧"正确，其整体损失仍然较低，模型难以学到区分。这一简单的修改对训练稳定性和健康长度增长产生了深远影响。

##### 5. Soft Overlong Punishment (软超长惩罚)

传统方案对超长样本直接截断并赋予固定惩罚（如reward=-1）。DAPO提出渐进惩罚机制：

$$R_{\text{length}}(y)=\begin{cases}0,&|y|\leq L_{\text{max}}-L_{\text{cache}}\\
\frac{(L_{\text{max}}-L_{\text{cache}})-|y|}{L_{\text{cache}}},&L_{\text{max}}-L_{\text{cache}}<|y|\leq L_{\text{max}}\\
-1,&L_{\text{max}}<|y|\end{cases}$$

其中 $$L_{\text{max}}=16384$$ tokens，$$L_{\text{cache}}=4096$$ tokens。在软惩罚区间内，响应越长惩罚越重；超过 $$L_{\text{max}}$$ 后截断并赋-1。

![Soft Overlong Punishment 对 AIME 表现的影响](https://arxiv.org/html/2503.14476v1/x8.png)
![Soft Overlong Punishment 对生成熵的影响](https://arxiv.org/html/2503.14476v1/x9.png)
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

![训练动态：平均响应长度](https://arxiv.org/html/2503.14476v1/x11.png)
![训练动态：奖励分数](https://arxiv.org/html/2503.14476v1/x12.png)
![训练动态：生成熵](https://arxiv.org/html/2503.14476v1/x13.png)
![训练动态：平均概率](https://arxiv.org/html/2503.14476v1/x14.png)
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
VAPO 提出面向长链式推理的 value-model-based augmented PPO 框架，通过价值模型预热、Decoupled-GAE、Length-Adaptive GAE、非对称 clipping、token-level loss 与正例 LM loss，解决长 CoT RL 中价值偏置、序列长度异质和稀疏奖励衰减问题。

#### 🎯 核心要点
- 回到 value-based PPO 路线：相对 GRPO/DAPO 的 value-model-free 组内基线，VAPO 重新引入 value model 做细粒度 credit assignment
- Value-Pretraining：用 reward model 初始化并预热 value network，缓解 PPO 在长 CoT 任务中 critic 初值偏置导致的崩溃
- Decoupled-GAE：critic 用 \(\lambda_{\text{critic}}=1.0\) 学 return，policy 用独立 \(\lambda_{\text{policy}}\) 计算优势，避免一个 GAE 参数同时服务两种目标
- Length-Adaptive GAE：按输出长度 \(l\) 设置 \(\lambda_{\text{policy}}=1-\frac{1}{\alpha l}\)，让长短回答的 TD-error 权重更均衡
- Token-level Policy Gradient Loss：按 token 聚合 PPO loss，而不是按样本平均，减少长序列梯度被样本级归一化稀释的问题
- Clip-Higher：使用非对称裁剪区间 \(\epsilon_{\text{high}}=0.28,\epsilon_{\text{low}}=0.2\)，鼓励对正优势 token 做更充分的策略提升
- Positive Example LM Loss：对 RL 采样中判定正确的回答额外加 NLL imitation loss，提高稀疏正奖励样本利用率
- Group-Sampling：每次采样更少 prompt、每个 prompt 多次生成，论文设置为 512 prompts × 16 samples，增强同题正负对比信号

#### 🔬 深入细节
##### 核心示意图

![VAPO AIME 2024 训练曲线](https://arxiv.org/html/2504.05118v3/extracted/6352862/fig/score.png)
*图：论文 Figure 1。VAPO 在 Qwen 32B base 上的 AIME 2024 分数随训练步数上升，论文报告 5,000 步内达到约 60.4，超过同设置下的 DAPO 与 DeepSeek-R1-Zero-Qwen-32B 报告结果。*

![VAPO 训练动态曲线](https://arxiv.org/html/2504.05118v3/extracted/6352862/fig/length.png)
*图：论文 Figure 2(a) 的图源之一，展示训练中的平均响应长度。论文还提供 reward 与 entropy 曲线：`https://arxiv.org/html/2504.05118v3/extracted/6352862/fig/reward.png`、`https://arxiv.org/html/2504.05118v3/extracted/6352862/fig/entropy.png`。*

##### 算法伪代码

```python
# VAPO: value-model-based augmented PPO for long-CoT reasoning
actor = init_policy(qwen_32b_base)
critic = init_value_from_reward_model(reward_model)

# 1. Value-Pretraining / warmup
for step in range(50):
    prompts = sample_prompts()
    responses = actor.generate(prompts)
    rewards = verifier_or_reward_model(prompts, responses)
    returns = compute_returns(rewards, gamma=1.0, lambda_critic=1.0)
    update_value_model(critic, returns)

for update in range(num_updates):
    # 2. Group-Sampling: fewer prompts, more generations per prompt
    prompts = sample_prompts(num_prompts=512)
    groups = actor_old.generate(prompts, samples_per_prompt=16)
    rewards = verifier_or_reward_model(prompts, groups)

    for response in groups:
        length = len(response.tokens)
        lambda_policy = 1.0 - 1.0 / (alpha * length)  # alpha = 0.05

        deltas = td_errors(critic, response, rewards, gamma=1.0)
        adv_policy = gae(deltas, gamma=1.0, lambda_=lambda_policy)
        ret_critic = gae(deltas, gamma=1.0, lambda_=1.0)

        ratio = actor.prob(response.tokens) / actor_old.prob(response.tokens)
        clipped = clip(ratio, 1 - eps_low, 1 + eps_high)
        ppo_loss_tokens = -min(ratio * adv_policy, clipped * adv_policy)

        if response.is_correct:
            nll_loss = -mean(actor.logprob(response.tokens))
        else:
            nll_loss = 0.0

        actor_loss = mean_over_tokens(ppo_loss_tokens) + mu * nll_loss
        critic_loss = mse(critic.values(response), ret_critic)
        update(actor, critic, actor_loss, critic_loss)
```

##### 1. 动机：为什么要从 GRPO/DAPO 回到 value model

GRPO 和 DAPO 的价值在于去掉 critic，用同一 prompt 的多条采样奖励做组内相对优势，训练更简单、显存更低，也避免 value model 在复杂推理任务中不稳定。但 VAPO 的判断是：value-model-free 方法牺牲了 token 级 credit assignment 的上限。长 CoT 推理里，一个最终正确/错误的 verifier reward 很稀疏，如果所有 token 共享同一个组内 advantage，模型很难知道哪些中间推理动作真正贡献了最终答案。

VAPO 因此回到 value-model-based PPO，但不是直接复用 vanilla PPO。论文指出长 CoT PPO 失败主要来自三类问题：value model bias、heterogeneous sequence lengths、sparse reward signals。VAPO 的七个改动基本都围绕这三点展开。

##### 2. Value-Pretraining 与 Decoupled-GAE：先让 critic 能用

Vanilla PPO 在长推理任务上容易崩溃，一个原因是 value model 初期估计严重偏置，策略更新会被错误优势牵引。VAPO 用 reward model 初始化 value network，并在 policy training 前做 50 步 warmup，让 critic 先学到相对合理的 return 估计。

接着，VAPO 采用 Decoupled-GAE。传统 PPO 往往用同一个 \(\lambda\) 同时服务 critic 的 return target 和 actor 的 advantage target；但这两个目标的偏差-方差取舍不同。VAPO 让 critic 用 \(\lambda_{\text{critic}}=1.0\) 学更完整的回报，让 policy 用另一个 \(\lambda_{\text{policy}}\) 控制优势估计平滑度。

设 TD-error 为：

$$
\delta_t=r_t+\gamma V(s_{t+1})-V(s_t).
$$

critic target 更接近完整 return：

$$
\hat{A}^{\text{critic}}_t=
\sum_{k=t}^{T}(\gamma\lambda_{\text{critic}})^{k-t}\delta_k,
\quad \lambda_{\text{critic}}=1.0.
$$

policy advantage 则使用独立参数：

$$
\hat{A}^{\text{policy}}_t=
\sum_{k=t}^{T}(\gamma\lambda_{\text{policy}})^{k-t}\delta_k.
$$

##### 3. Length-Adaptive GAE：让长回答末端奖励不要指数衰减掉

长 CoT 的一个特殊问题是响应长度差异巨大。若固定 \(\lambda_{\text{policy}}=0.95\)，长度超过 100 的序列中，远端 TD-error 权重约为 \(0.95^{100}\approx0.006\)，几乎无法把最终 verifier reward 回传到早期推理 token。结果是长回答的优势估计会被 bootstrap value 主导，而不是被真实最终奖励主导。

VAPO 的 Length-Adaptive GAE 让 \(\lambda_{\text{policy}}\) 随序列长度 \(l\) 增大。论文设计几何系数和与长度成比例：

$$
\sum_{t=0}^{\infty}\lambda_{\text{policy}}^t
\approx
\frac{1}{1-\lambda_{\text{policy}}}
=\alpha l.
$$

解得：

$$
\lambda_{\text{policy}}=1-\frac{1}{\alpha l},
\quad \alpha=0.05.
$$

直觉是：短回答不需要很大的 \(\lambda\)，否则方差偏高；长回答需要更大的 \(\lambda\)，否则最终奖励传不到前面。这个长度自适应参数把长短序列的 credit assignment 拉到同一尺度。

##### 4. Token-level PPO loss 与 Clip-Higher：按 token 稳定推进策略

VAPO 使用非对称 PPO 裁剪：

$$
\mathcal{L}_{\text{PPO}}(\theta)=
-\frac{1}{\sum_{i=1}^{G}|o_i|}
\sum_{i=1}^{G}\sum_{t=1}^{|o_i|}
\min\left(
r_{i,t}(\theta)\hat{A}_{i,t},
\text{clip}\left(r_{i,t}(\theta),1-\epsilon_{\text{low}},1+\epsilon_{\text{high}}\right)\hat{A}_{i,t}
\right).
$$

其中 \(r_{i,t}(\theta)=\pi_\theta(a_t\mid s_t)/\pi_{\theta_{\text{old}}}(a_t\mid s_t)\)，论文设置 \(\epsilon_{\text{high}}=0.28\)、\(\epsilon_{\text{low}}=0.2\)。上界更宽意味着当 token 的优势为正时，策略可以更充分提高该 token 概率；下界保持较保守，避免过度压低概率造成不稳定。

分母使用所有 token 数 \(\sum_i |o_i|\)，这就是 token-level policy gradient loss。相比 sample-level loss，它不会让一条很长的 CoT 只贡献和短回答同等的样本权重；对长推理而言，更多关键决策 token 应该产生更多训练信号。

##### 5. Positive Example LM Loss：稀疏正奖励要被充分利用

数学推理 RL 的正样本很稀少，尤其在训练早期，大多数采样回答是错的。如果只靠 PPO 把错误样本概率压低，学习效率会很差；一旦采样到正确答案，应该像 imitation learning 一样更强地利用它。

VAPO 对正确回答集合 \(\mathcal{T}\) 加入 NLL：

$$
\mathcal{L}_{\text{NLL}}(\theta)=
-\frac{1}{\sum_{o_i\in\mathcal{T}}|o_i|}
\sum_{o_i\in\mathcal{T}}\sum_{t=1}^{|o_i|}
\log\pi_\theta(a_t\mid s_t).
$$

最终 actor 目标为：

$$
\mathcal{L}(\theta)=
\mathcal{L}_{\text{PPO}}(\theta)
+\mu\mathcal{L}_{\text{NLL}}(\theta),
$$

论文实验中 positive-example LM loss 权重为 \(0.1\)。这相当于给 verifier 判定正确的轨迹额外一条监督学习通道，使稀疏奖励不会只以高方差 policy gradient 的形式进入模型。

##### 6. Group-Sampling 与实验结果

在固定计算预算下，VAPO 选择每轮更少 prompt、每个 prompt 多次生成。论文设置为 512 个 prompt，每个 prompt 采样 16 次。这样同一题内更容易同时出现正确/错误、长/短、不同推理路径的样本，critic 和 policy 都能看到更有辨别度的局部对比。

实验部分用 Qwen 32B base，在 AIME24 avg@32 上比较。论文报告 vanilla PPO 后期只有约 5 分，DeepSeek-R1-Zero-Qwen-32B 约 47，DAPO 约 50，而 VAPO 达到约 60.4。消融也显示各组件都有贡献：去掉 Value-Pretraining 会回到崩溃，去掉 Decoupled-GAE 会让长回答 reward 信号衰减，去掉 Length-Adaptive GAE、Clip-Higher、Token-level Loss、Positive Example LM Loss 和 Group-Sampling 都会带来不同幅度下降。

> ⚠️ 注意：VAPO 的核心不是单个新公式，而是一组专门为长 CoT PPO 稳定性设计的工程化组合；其中 Length-Adaptive GAE 直接对应 manifest 中“长度自适应GAE解决奖励稀疏”的动机。

#### 🧪 练习题
```yaml
question: "VAPO 中 Length-Adaptive GAE 的主要目的是什么？"
options:
  - "让所有回答都使用固定 lambda=0，从而完全移除 value model"
  - "根据响应长度调整 lambda_policy，避免长 CoT 中最终奖励信号在 GAE 回传时指数衰减过快"
  - "把 PPO 的裁剪上界和下界设成完全相同"
  - "只对错误回答加入额外 NLL loss"
answer: 1
explain: "固定 lambda=0.95 时，长序列远端奖励权重会快速衰减；VAPO 用 lambda_policy=1-1/(alpha l) 让长回答保留更长的 credit assignment 路径。"
```

### Dr.GRPO

```yaml
id: dr_grpo
num: 17
name: Dr.GRPO
full_name: 修正版GRPO (GRPO Done Right)
year: '2025.03'
org: Sea AI Lab / NUS / SMU
parent: grpo
paper_url: https://arxiv.org/abs/2503.20783
project_url: ''
category: frontier_2026
motivation: 修正长度与难度偏差
```

#### 📝 一句话总结
Dr.GRPO 指出标准 GRPO 的常见实现会因为“按回复长度归一化”和“按题内奖励标准差归一化”而产生系统性优化偏差，并通过去掉这两项归一化恢复无偏策略梯度，从而在保持推理性能的同时显著改善 token efficiency。

#### 🎯 核心要点
- 出自论文《Understanding R1-Zero-Like Training: A Critical Perspective》中对 R1-Zero 式 RL 的批判性分析，而不是独立单篇算法论文
- 识别出 GRPO 的两类关键偏差：response-level length bias 与 question-level difficulty bias
- 指出长度归一化会让正确短答案获得更大正向更新，而错误长答案受到更小惩罚，导致模型偏向冗长错误推理
- 指出题内标准差归一化会让“太简单/太困难”的问题因标准差更小而被赋予更大更新权重，造成 difficulty bias
- Dr.GRPO 的修正很简单：去掉响应长度归一化和组内标准差归一化，仅保留 unbiased baseline-centered advantage
- 在实现层面，用常数 generation budget 替代 `mask.sum(axis=dim)`，从而恢复 PPO 目标而不是按每个 response 长度缩放
- 在 Qwen2.5-1.5B 的 MATH RL-tuning 中，相比 GRPO 能抑制错误回复长度持续膨胀，并减少 overthinking

#### 🔬 深入细节
##### 1. 核心示意图

![Dr.GRPO 核心示意图](https://arxiv.org/html/2503.20783v2/x1.png)

*图：论文 Figure 1。左图展示了 Dr.GRPO 相比 GRPO 的核心改动：移除 length normalization 和 std normalization；右图展示该无偏优化器能明显抑制错误回复不断变长的现象。*

##### 2. 算法伪代码

```python
# GRPO vs Dr.GRPO 核心差异
# 对同一道题采样 G 个回答，得到组内回报 R_i

mean_R = mean(R)
std_R = std(R)

for response_i in group:
    # 传统 GRPO：长度 + 题内标准差双重归一化
    A_grpo = (R_i - mean_R) / std_R
    loss_grpo += (1 / len(response_i)) * tokenwise_clipped_pg_loss(A_grpo)

    # Dr.GRPO：只保留无偏 baseline，移除两种偏差源
    A_dr = R_i - mean_R
    loss_dr += (1 / MAX_TOKENS) * tokenwise_clipped_pg_loss(A_dr)

update(loss_dr)
```

##### 3. 背景：GRPO 为什么会“越训越长”

R1-Zero 一类工作中，一个最醒目的训练现象是：随着 RL 持续进行，模型回复会越来越长。很多工作把它直接解释成“长链推理和自我反思能力的涌现”。这篇论文对这种解释提出了质疑：长度增长不一定完全来自更强的 reasoning，也可能来自 **优化目标本身对长回答的偏置**。

作者把语言模型生成形式化为 token-level MDP，并回到 PPO 的原始 surrogate objective。与标准 PPO 不同，GRPO 为了避免训练额外 value model，会对同一道题采样一组回答，利用组内回报构造优势函数。问题在于，很多实现不仅使用组内相对回报，还额外做了“按响应长度归一化”和“按题内标准差归一化”。作者指出，这两个看似自然的归一化会一起扭曲真实策略梯度。

因此，Dr.GRPO 的出发点不是提出更复杂的奖励或更强的探索机制，而是回到一个更根本的问题：**我们现在跑的 GRPO，到底还是不是原本希望优化的 PPO/REINFORCE 目标？** 论文结论是否定的，而 Dr.GRPO 就是对这个实现偏差的纠偏。

##### 4. 第一类偏差：response-level length bias

标准 GRPO 在很多实现中会把每个 response 的 loss 再除以该 response 的 token 长度 \( |o_i| \)。这会带来非常隐蔽但系统性的偏差：

- 当某个回答的优势 \(A_i > 0\) 时，也就是它是正确或更优的回答，较短答案会因为分母更小而获得更大的梯度更新；
- 当某个回答的优势 \(A_i < 0\) 时，也就是它是错误或更差的回答，较长答案会因为分母更大而受到更弱惩罚。

于是训练会逐渐形成一种奇怪偏好：**正确答案被鼓励简洁，错误答案却被容忍冗长。** 这正好解释了很多 R1-Zero 复现实验里“错误回答越来越长”的现象。

论文把这一点总结为 response-level length bias。其关键不是模型“主动学会深思熟虑”，而是目标函数在数值上给长错误回答更宽松的梯度惩罚。也就是说，长度增长部分是 reasoning emergence，部分却是 optimizer artifact。

> 💡 关键：Dr.GRPO 不是反对长链推理，而是反对“因为 loss 缩放方式错误，模型被优化器推向无意义变长”。

##### 5. 第二类偏差：question-level difficulty bias

GRPO 的另一处常见设计，是把组内相对回报再除以该题回答组的标准差：

$$
A_i^{\mathrm{GRPO}} \propto \frac{R_i - \mathrm{mean}(R)}{\mathrm{std}(R)}.
$$

这在直觉上像一种 advantage normalization，但论文指出，它和 RL 里常见的“全 batch 归一化”不同，因为这里的标准差是在 **单题内部** 计算的。结果是：

- 如果某道题太简单，组内奖励几乎全是 1，标准差会很小；
- 如果某道题太难，组内奖励几乎全是 0，标准差也会很小；
- 只要标准差小，这道题的更新权重就会被放大。

于是，训练并不是按真实学习价值来分配优化预算，而是在数值上偏向那些组内方差小的问题，形成所谓 question-level difficulty bias。简单说就是：有些问题只是因为奖励分布更集中，就莫名其妙在优化中“声音更大”。

Dr.GRPO 的修正方式也很直接：去掉这项组内标准差归一化，仅保留 baseline-centered 的无偏优势估计

$$
\tilde{A}_i = R_i - \mathrm{mean}(R).
$$

这样保留了“组内相对比较”的思想，但不再让不同问题因为标准差差异而被不公平加权。

##### 6. Dr.GRPO 到底改了什么

论文 Figure 1 和 Section 3.2 给出的结论非常明确：Dr.GRPO 的核心不是换奖励模型，也不是换采样策略，而是 **删掉两项导致偏差的归一化项**，从而恢复原本的无偏策略优化目标。

可以把它和常见 GRPO 目标对比理解：

$$
\text{GRPO:}\quad
\frac{1}{|o_i|}
\sum_t
\min\!\left(
r_{i,t} A_i,\;
\mathrm{clip}(r_{i,t}, 1-\epsilon, 1+\epsilon) A_i
\right),
\quad
A_i = \frac{R_i - \mathrm{mean}(R)}{\mathrm{std}(R)}
$$

而 Dr.GRPO 变成：

$$
\text{Dr.GRPO:}\quad
\frac{1}{M}
\sum_t
\min\!\left(
r_{i,t} \tilde{A}_i,\;
\mathrm{clip}(r_{i,t}, 1-\epsilon, 1+\epsilon) \tilde{A}_i
\right),
\quad
\tilde{A}_i = R_i - \mathrm{mean}(R),
$$

其中 \(M\) 是固定常数，例如 generation budget，而不是每个 response 自己的长度。这个改动看起来很小，但含义很深：它把“每个样本的缩放因子”从变量改成常量，消除了长度耦合；同时把优势从题内 z-score 改回 centered return，消除了 difficulty bias。

作者还特别指出，实现里常见的

```python
(tensor * mask).sum(axis=dim) / mask.sum(axis=dim)
```

本质上就会引入长度偏差；他们建议改成用固定 `MAX_TOKENS` 归一化。也就是说，Dr.GRPO 很大程度上是在修复“公式-实现不一致”的问题。

> ⚠️ 注意：论文甚至指出，不只是 GRPO，多个开源 PPO/LLM RL 实现也存在类似的长度偏差。这说明 Dr.GRPO 的意义并不局限于 DeepSeek-R1 复现，而是更一般的 LLM RL 训练实现修正。

##### 7. 实验结果：更省 token，而不是更会“刷长度”

论文在 Oat 框架上，用 Qwen2.5-1.5B base model + R1 template，在 MATH 训练集上做在线 RL-tuning，对比 vanilla GRPO 和 Dr.GRPO。作者关注的不只是 benchmark accuracy，还看训练动态和错误回复长度。

结果非常有代表性：
- 两者都能像 R1-Zero 一样带来 reward 和 response length 的上升；
- 但 GRPO 即使在 reward 增长放缓后，错误回答长度仍持续膨胀；
- Dr.GRPO 则能抑制这种“无意义变长”，使错误回复明显更短；
- 在多个数学 benchmark 上，它能在维持 reasoning performance 的同时改善 token efficiency，并缓解 overthinking。

这意味着 Dr.GRPO 的价值不是单纯追求更高 accuracy，而是让“推理长度增长”更接近真实 reasoning improvement，而不是被优化器偏置污染。放到 LLM RL 的演化链里，它代表了一类非常重要的工作：**开始从“发明新目标”转向“审视现有目标是否被正确实现”。**

#### 🧪 练习题
```yaml
question: "Dr.GRPO 相比传统 GRPO 的最关键修正是什么？"
options:
  - "增加一个额外的 value model 来估计 GAE"
  - "把组内相对回报改成 pairwise Bradley-Terry 损失"
  - "移除回复长度归一化和组内标准差归一化，恢复无偏策略梯度"
  - "对错误回答额外奖励更长的 Chain-of-Thought"
answer: 2
explain: "Dr.GRPO 的核心不是增加模型组件，而是删去 GRPO 中引入 response-level length bias 和 question-level difficulty bias 的两项归一化。"
```

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
OAPL 将 LLM 强化学习后训练中的 trainer policy 与 lagged inference policy 不一致问题直接建模为 KL 正则化的离策略优化问题，用闭式最优策略导出的平方回归损失替代 GRPO/PPO 的重要性采样与裁剪，从而在推理引擎滞后数百步时仍能稳定训练。

#### 🎯 核心要点
- 明确区分训练器策略 \(\pi\) 与推理引擎策略 \(\pi_{\text{vllm}}\)，承认分布式后训练天然产生 off-policy rollout。
- 将策略更新写成相对于当前推理策略 \(\pi_{\text{vllm}}\) 的 KL 正则化奖励最大化，而不是相对于固定 reference model 的 KL 惩罚。
- 利用 KL 正则化 RL 的闭式解 \(\pi^\star(y|x) \propto \pi_{\text{vllm}}(y|x)\exp(r(x,y)/\beta)\) 推导出最优优势函数关系。
- 用同一 prompt 下的 \(G\) 个推理引擎采样结果估计 \(\hat V^\star(x)\)，以 log-sum-exp 形式在最大奖励与平均奖励之间平滑。
- 训练目标是让 \(\beta\log \frac{\pi(y|x)}{\pi_{\text{vllm}}(y|x)}\) 回归到估计最优优势 \(r(x,y)-\hat V^\star(x)\)，形成简单的 least-squares loss。
- 算法维护 rollout buffer \(\mathcal D\) 和同步间隔 \(L\)，数据生成与梯度更新可异步运行，每次同步推理引擎后清空 buffer。
- 不使用 token/sequence importance sampling ratio，不依赖 PPO/GRPO clip，也不删除“过于离策略”的 token 或样本。
- 论文报告 OAPL 在 AIME-25、HMMT-25、BRUMO-25 等数学推理基准上优于带重要性采样的 GRPO，并在 LiveCodeBench 上以约三分之一训练生成量接近或超过 DeepCoder。
- 在代码实验中可承受约 400 个梯度更新的 policy lag，论文称相比已有方法可处理约 100 倍更强的 off-policyness。

#### 🔬 深入细节
![OAPL 与 GRPO 在数学推理基准上的对比](https://arxiv.org/html/2602.19362v2/x1.png)
*图：论文 Figure 1 展示 OAPL 与带重要性采样的 GRPO 在 HMMT-25、AIME-25、BRUMO-25 上的 Pass@1/5/10 对比。论文没有单独给出架构总览图，因此这里使用其主图，并结合 Algorithm 1 说明训练流程。*

```python
# OAPL: Optimal Advantage-Based Policy Optimization with Lagged Inference Policy
initialize policy pi
initialize inference engine pi_vllm
initialize replay buffer D
sync(pi_vllm, pi)

for t in range(1, T + 1):
    # Data generation can run asynchronously on lagged inference weights.
    batch = []
    for x in sample_prompts():
        ys = [sample(pi_vllm, x) for _ in range(G)]
        rewards = [r(x, y) for y in ys]
        v_hat = beta_v * log(mean(exp(reward / beta_v) for reward in rewards))
        batch.append((x, ys, rewards, v_hat, logprob(pi_vllm, ys, x)))
    D.add(batch)

    # Off-policy update on data generated by pi_vllm.
    for x, ys, rewards, v_hat, old_logp in D.sample():
        loss = 0
        for y, reward, lp_vllm in zip(ys, rewards, old_logp):
            target_adv = reward - v_hat
            pred_adv = beta_pi * (logprob(pi, y, x) - lp_vllm)
            loss += (pred_adv - target_adv) ** 2
        update(pi, loss)

    if t % L == 0:
        sync(pi_vllm, pi)
        D.clear()
```

OAPL 的直接动机是现代 LLM RL 后训练并不满足 GRPO/PPO 假设的 on-policy 条件。大规模训练通常由 HuggingFace trainer 负责反向传播，由 vLLM 等推理引擎负责高速生成；即便二者权重相同，kernel 实现、数值精度和异步 pipeline 都可能让同一 token 序列的 log-prob 不一致。若推理引擎落后训练器若干步，当前用于更新 \(\pi\) 的样本实际来自旧的 \(\pi_{\text{vllm}}\)，这会让 GRPO 的 \(\pi/\pi_{\text{old}}\) 裁剪项和额外重要性采样项同时承担校正任务，方差上升且需要大量启发式 clipping、token deletion 或 rollout filtering。

论文的关键转向是“不把 off-policy 数据伪装成 on-policy”，而是直接优化一个以推理引擎为锚点的 KL 正则目标：

$$
\max_{\pi}\; \mathbb{E}_{x, y\sim \pi(\cdot|x)} r(x,y) - \beta\,\mathrm{KL}(\pi\|\pi_{\text{vllm}}).
$$

这里 \(\pi_{\text{vllm}}\) 不是通常 RLHF 里的 reference policy \(\pi_{\text{ref}}\)，而是当前负责采样的推理策略。这个设计的直觉是：既然数据由 \(\pi_{\text{vllm}}\) 产生，就把它作为行为分布和局部信任域，训练器既要提高奖励，又不能在一个同步周期内离开生成这些样本的分布太远。

KL 正则化 RL 有闭式最优策略：

$$
\pi^\star(y|x) \propto \pi_{\text{vllm}}(y|x)\exp(r(x,y)/\beta),
$$

$$
V^\star(x)=\beta\log\mathbb{E}_{y\sim\pi_{\text{vllm}}(\cdot|x)}\exp(r(x,y)/\beta).
$$

整理后得到最优优势与策略比值的关系：

$$
\beta\log\frac{\pi^\star(y|x)}{\pi_{\text{vllm}}(y|x)} = r(x,y)-V^\star(x)=A^\star(x,y).
$$

这组公式解释了 OAPL 为什么可以把策略优化写成回归：如果当前策略 \(\pi\) 足够接近最优策略，\(\beta\log\frac{\pi(y|x)}{\pi_{\text{vllm}}(y|x)}\) 就应该等于最优优势。由于 \(V^\star\) 的期望本来就在 \(\pi_{\text{vllm}}\) 下计算，同一 prompt 的多个 off-policy rollout 可以直接用于估计：

$$
\hat V^\star(x)=\beta\log\frac{1}{G}\sum_{i=1}^{G}\exp(r(x,y_i)/\beta), \quad y_i\sim\pi_{\text{vllm}}(\cdot|x).
$$

当 \(\beta\to 0\) 时，\(\hat V^\star\) 接近这一组样本的最大奖励；当 \(\beta\to\infty\) 时，它接近平均奖励。这个平滑参数决定了算法更偏向“追逐最优样本”还是“使用组内均值作为 baseline”。最终 OAPL 最小化平方损失：

$$
\min_{\pi}\sum_x\sum_{i=1}^{G}\left(\beta\log\frac{\pi(y_i|x)}{\pi_{\text{vllm}}(y_i|x)} - (r(x,y_i)-\hat V^\star(x))\right)^2.
$$

从训练流程看，OAPL 把分布式系统里的 stale rollout 变成一等公民。推理引擎不断采样 \(\{x,\{y_i\}_{i=1}^G\}\) 并写入 buffer \(\mathcal D\)，训练器从 buffer 取数据按上式更新 \(\pi\)，每隔 \(L\) 次迭代才把 \(\pi_{\text{vllm}}\) 同步到最新 \(\pi\)。同步后清空 buffer 是必要的，因为 \(\hat V^\star\) 和优势估计要求同一组 rollout 来自同一个采样分布；若 buffer 混入多个版本的推理策略，log-prob anchor 和 value estimator 的含义都会变得不一致。

与 GRPO 的差异集中在“约束对象”上。GRPO 沿用 PPO 思路，用 \(\mathrm{clip}(\pi/\pi_{\text{old}},1-\epsilon,1+\epsilon)\) 限制当前训练器不要离前一版训练器太远；但当第一步梯度很大时，clip 在更新发生前并不能阻止模型越界，而且它没有显式处理数据其实来自 \(\pi_{\text{vllm}}\) 的问题。OAPL 直接让训练器贴近采样策略 \(\pi_{\text{vllm}}\)，因此 policy lag 越是系统性存在，OAPL 的建模越贴近真实训练条件。

> 💡 关键：OAPL 的“离线/离策略”不是简单复用旧数据，而是用采样策略的 log-prob 作为目标函数的一部分，让每条旧样本都带着自己的行为分布锚点。

#### 🧪 练习题
```yaml
question: "OAPL 为什么可以在严重 policy lag 下避免使用 GRPO 的重要性采样 ratio？"
options:
  - "因为它完全不需要奖励模型，只训练语言模型的监督交叉熵"
  - "因为它把 lagged inference policy 作为 KL 锚点，并将最优优势关系写成平方回归目标"
  - "因为它每一步都强制同步 trainer 和 inference engine，保证严格 on-policy"
  - "因为它只保留高 reward rollout，丢弃所有低 reward token"
answer: 1
explain: "OAPL 的核心是以采样策略 pi_vllm 为 KL 参考，回归 beta log(pi/pi_vllm) 到估计最优优势，因此不需要把 off-policy 样本再用重要性采样伪装成 on-policy。"
```

### WDPO

```yaml
id: wdpo
num: 20
name: WDPO
full_name: Wasserstein直接偏好优化 (Wasserstein DPO)
year: '2025.02'
org: Texas A&M / Tencent AI Lab / Google DeepMind
parent: dpo
paper_url: https://arxiv.org/abs/2502.01930
project_url: ''
category: frontier_2026
motivation: Wasserstein鲁棒优化应对偏好分布漂移
```

#### 📝 一句话总结
WDPO 将标准 DPO 的经验风险最小化改写为 Wasserstein 不确定集上的最坏情况优化，使模型不再只对训练偏好分布拟合，而是在用户偏好发生分布漂移时仍保持较强的对齐鲁棒性。

#### 🎯 核心要点
- 针对 DPO 在真实部署中容易遭遇的 preference distribution shift，显式建模训练分布附近的一整个偏好分布集合
- 基于 distributionally robust optimization，把 DPO 目标从“最小化经验平均损失”改为“最小化 Wasserstein 球内的最坏情况损失”
- 给出两类鲁棒偏好优化方法：WDPO 和 KLDPO，其中 WDPO 使用 Wasserstein 不确定集
- 推导出 WDPO 的可训练近似：标准 DPO 损失加上一个输入梯度范数正则项，避免直接求解难优化的 min-max 问题
- 给出理论分析，包括 WDPO / KLDPO 的有限样本学习保证和参数收敛性质
- 在 Emotion Alignment、ArmoRM 多目标对齐和 OpenLLM Leaderboard 场景下，相比 vanilla DPO 在偏好漂移时更稳健

#### 🔬 深入细节
##### 1. 论文核心示意图

![WDPO 偏好分布漂移示意图](https://arxiv.org/html/2502.01930v4/x1.png)

*图：论文 Figure 1。训练阶段主要观察到偏好模型 P1，于是普通 DPO 会偏向 Completion 1；但测试用户偏好更接近 P2 时，Completion 2 才是更优答案。WDPO 的目标是在一整个不确定集上做最坏情况优化，而不是只拟合单一训练分布。*

##### 2. 核心训练伪代码

```python
# WDPO 的可训练近似版本
# z = (prompt, chosen, rejected)

for batch in dataloader:
    # 1. 计算标准 DPO 损失
    loss_dpo = dpo_loss(pi_theta, pi_ref, batch)

    # 2. 计算对样本扰动敏感度的梯度正则
    grad_norm_sq = 0.0
    for z in batch:
        l_z = single_pair_dpo_loss(pi_theta, pi_ref, z)
        grad_z = grad_wrt_sample_representation(l_z, z)
        grad_norm_sq += norm(grad_z, 2) ** 2
    reg = rho_o * sqrt(grad_norm_sq / len(batch))

    # 3. 构造近似 WDPO 损失
    loss_wdpo = loss_dpo + reg

    optimizer.step(loss_wdpo)
```

##### 3. 动机：DPO 为什么会在真实用户上失效

WDPO 解决的问题不是“偏好标签噪声”本身，而是更系统性的 **偏好分布漂移**。标准 DPO 假设训练集中 observed preference pairs 就能代表部署阶段的真实用户偏好，因此它最小化的是训练分布上的平均损失。但论文指出，这个假设在现实里通常不成立：不同地区、群体、文化背景、语言表达和时间阶段的用户，对“哪个回答更好”的判断本来就可能不同。

这意味着，普通 DPO 其实在做一种脆弱的经验拟合。它会把训练数据里占多数的偏好模式学得很强，却未必能覆盖测试环境下出现的新偏好结构。论文 Figure 1 的例子非常直观：如果训练人群偏向偏好模型 P1，那么非鲁棒 DPO 会系统性偏向 Completion 1；一旦部署到更偏向 P2 的用户群体，模型就会显著失配。

因此，WDPO 的核心思想不是继续问“训练数据上哪个回答更优”，而是问：**如果真实偏好分布在训练分布附近发生偏移，当前策略还能不能维持对齐？** 这就把问题从经验风险最小化，推进到了 distributionally robust optimization 的框架。

##### 4. 核心机制：在 Wasserstein 不确定集上做最坏情况 DPO

论文先定义一个围绕名义分布 \( \mathsf{P}^{o} \) 的不确定集：

$$
\mathcal{P}(\rho;\mathsf{P}^{o})
\coloneqq
\left\{
\mathsf{P}\in\mathcal{P}(\mathcal{Z})
\;:\;
D(\mathsf{P},\mathsf{P}^{o}) \le \rho
\right\},
$$

其中 \(D(\cdot,\cdot)\) 可以取 Wasserstein 距离或 KL 散度；对 WDPO 而言，这里使用的是 Wasserstein 球。与普通 DPO 直接优化训练分布上的期望损失不同，WDPO 优化的是：

$$
\mathcal{L}_{\mathrm{WDPO}}(\theta)

=
\sup_{\mathsf{P}\in \mathcal{P}(\rho;\mathsf{P}^{o})}
\mathbb{E}_{z\sim\mathsf{P}}
\bigl[l(z;\theta)\bigr].
$$

这相当于引入一个“对手分布”：它会在距离训练分布不太远的范围内，专门寻找那些最容易让当前策略出错的偏好重加权方式。模型训练的目标，则是把这些最坏情况也一起压下去。

从直觉上看，普通 DPO 优化的是“平均正确”，而 WDPO 优化的是“即使用户偏好轻微换了分布，也不要立刻崩”。这使它天然更适合部署环境，因为它不再把训练分布当成唯一真相，而是把它视为一个中心点。

> 💡 关键：WDPO 鲁棒的不是单个 chosen / rejected 样本，而是样本背后的“偏好分布本身”。这比做样本级加权更强，因为它直接针对 deployment-time preference shift。

##### 5. 难点与近似：为什么最终会变成“DPO + 梯度正则”

直接求解上述 Wasserstein min-max 目标在大模型训练中并不现实。原因很简单：最坏情况分布 \( \mathsf{P} \) 本身不是一个显式参数化对象，我们只拥有来自名义训练分布 \( \mathsf{P}^{o}_{n} \) 的数据，而没有从不确定集内部其他分布采样的能力。因此，不能像常见 GAN 或对抗训练那样直接对“分布参数”做交替梯度下降。

论文给出的关键工程化结果，是把 WDPO 推成一个一阶可训练近似。最终的近似目标写成：

$$
\mathcal{L}^{\mathrm{W}}(\theta;\mathcal{D})
\coloneqq
\mathcal{L}^{\mathrm{DPO}}(\pi_\theta;\mathcal{D})
+
\mathcal{R}(\pi_\theta;\mathcal{D}),
$$

其中附加正则项为：

$$
\mathcal{R}(\pi_\theta;\mathcal{D})
=
\rho_o
\left(
\mathbb{E}_{z\sim\mathcal{D}}
\left\|
\nabla_z l(z;\theta)
\right\|_2^2
\right)^{1/2}.
$$

这个式子意义很强：如果某个样本 \(z\) 发生轻微分布扰动，就会让损失 \(l(z;\theta)\) 大幅波动，那么对应的 \(\|\nabla_z l(z;\theta)\|_2\) 就会很大，模型会被额外惩罚。于是 WDPO 逼迫模型学习一种“对局部分布变化不那么敏感”的偏好判别边界。

换句话说：
- DPO 关心的是 chosen 和 rejected 的相对 log-prob margin；
- WDPO 额外关心的是，这个 margin 对训练样本分布附近的小扰动是否过于脆弱。

这让 WDPO 看起来像“在 DPO 上加平滑项”，但本质上它对应的是 Wasserstein 球上的分布鲁棒优化，不是简单的经验 trick。

> ⚠️ 注意：这个正则不是对模型参数梯度做裁剪，而是对样本扰动敏感度做控制。它约束的是“偏好边界的局部稳定性”，不是常规意义的优化稳定技巧。

##### 6. 与标准 DPO 的本质区别

标准 DPO 仍然是一个经验风险最小化方法。它在给定的训练偏好对 \((x, y_w, y_l)\) 上优化：

$$
\mathcal{L}_{\mathrm{DPO}}
=
-\mathbb{E}
\left[
\log \sigma\left(
\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\mathrm{ref}}(y_w|x)}
-
\beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\mathrm{ref}}(y_l|x)}
\right)
\right].
$$

这个目标默认训练偏好分布就是最终分布，因此它对 OOD preference shift 极其敏感。WDPO 没有改掉 DPO 的配对偏好形式，而是在其外层再套一层“对分布扰动求最坏情况”的约束。这样保留了 DPO 的高效训练结构，同时把鲁棒性引入到了目标层。

所以 WDPO 在演化脉络中的价值，不是提出了新的偏好标签形式，也不是改了 chosen/rejected 的比较方式，而是第一次比较系统地把 **distributional robustness** 接入 DPO 对齐。

##### 7. 实验设定与论文结论

论文做了三类实验，核心都围绕“训练时和测试时偏好目标不一致”：

- **Emotion Alignment**：在 Emotion 数据集上把 anger / fear 等目标按不同混合系数组合，训练和测试使用不同混合系数，显式制造 preference shift；
- **ArmoRM Multi-objective Alignment**：在 HelpSteer2 prompt 上用 ArmoRM 生成多目标偏好，再在未参与训练的 reward objective 上测试泛化；
- **OpenLLM Leaderboard**：将鲁棒对齐后的模型放到更广泛能力基准上，观察对齐鲁棒性是否牺牲通用能力。

论文报告表明，WDPO 和 KLDPO 在这些偏好漂移场景下都比 vanilla DPO 更稳，尤其是在训练偏好与评估偏好不一致时退化更慢。作者还给出理论结论：对于 log-linear policy，WDPO / KLDPO 的鲁棒参数学习具有有限样本保证，收敛速度达到 \(O(n^{-1/4})\) 量级。这一点让 WDPO 不只是经验上“看起来更稳”，而是有明确的统计学习支撑。

#### 🧪 练习题
```yaml
question: "WDPO 相比标准 DPO 的最核心变化是什么？"
options:
  - "把 chosen / rejected 二元偏好改成了多分类标签"
  - "完全移除了参考模型，只保留奖励回归"
  - "把 DPO 的经验风险最小化改成了 Wasserstein 不确定集上的最坏情况优化"
  - "仅通过增大学习率让模型更快适应分布变化"
answer: 2
explain: "WDPO 的核心不是改标签形式，而是在训练分布附近引入 Wasserstein 不确定集，对最坏情况偏好分布做鲁棒优化，从而缓解 preference shift。"
```

### MoD-DPO

```yaml
id: mod_dpo
num: 21
name: MoD-DPO
full_name: 模态解耦直接偏好优化 (Modality-Decoupled Direct Preference Optimization)
year: '2026.03'
org: University of Southern California
parent: dpo
paper_url: https://arxiv.org/abs/2603.03192
project_url: ''
category: frontier_2026
motivation: 模态解耦抑制跨模态幻觉
```

#### 📝 一句话总结
MoD-DPO 面向 omni LLM 的跨模态幻觉问题，在标准 DPO 上加入“无关模态保持不变、相关模态必须敏感、文本先验必须受罚”三类约束，使模型更依赖真正相关的音频和视觉证据而不是语言捷径。

#### 🎯 核心要点
- 面向音频-视频-文本统一模型的跨模态幻觉问题，重点缓解伪相关和语言先验主导带来的错误回答
- 在 DPO 的偏好损失之外引入两类 KL 正则：无关模态扰动下的输出不变性，以及相关模态扰动下的输出敏感性
- 新增 Language-Prior Debiasing (LPD) 惩罚，压低只看文本输入时容易产生幻觉的响应
- 对 MoD-DPO 目标给出闭式最优策略推导，而不是仅靠经验式加权损失
- 构造了自动化偏好数据生成流程，最终得到超过 18.1k 条偏好样本，覆盖约 10.8k 个视频
- 主要在 Qwen2.5-Omni 和 MiniCPM-O 2.6 上验证，在 AVHBench、CMM 等跨模态幻觉基准上稳定优于 DPO 与 OmniDPO

#### 🔬 深入细节
##### 1. 核心框架图

![MoD-DPO 核心框架图](https://arxiv.org/html/2603.03192v2/x3.png)

*图：论文 Figure 3。MoD-DPO 以 DPO 为底座，在偏好优化之外额外加入无关模态不变性、相关模态敏感性和语言先验去偏三类约束，直接改变 omni LLM 的模态依赖方式。*

##### 2. 核心训练伪代码

```python
# x_v: 视觉相关问题文本
# a, v: 原始音频/视频
# a_corrupt, v_corrupt: 扰动后的音频/视频
# y_w, y_l: chosen / rejected response

for batch in dataloader:
    logp_w = pi_theta.log_prob(y_w | a, v, x_v)
    logp_l = pi_theta.log_prob(y_l | a, v, x_v)
    logref_w = pi_ref.log_prob(y_w | a, v, x_v)
    logref_l = pi_ref.log_prob(y_l | a, v, x_v)

    # 标准 DPO 偏好项
    dpo_margin = beta * ((logp_w - logref_w) - (logp_l - logref_l))
    loss_dpo = -log_sigmoid(dpo_margin)

    # 无关模态不变性：视觉问题下，扰动音频后输出应尽量不变
    loss_inv = KL(pi_theta(. | a, v, x_v) || pi_theta(. | a_corrupt, v, x_v))

    # 相关模态敏感性：视觉问题下，扰动视频后输出应明显变化
    loss_sens = -KL(pi_theta(. | a, v, x_v) || pi_theta(. | a, v_corrupt, x_v))

    # 语言先验去偏：只给文本时，不应维持同样高的偏好分数
    loss_lpd = reward(pi_theta, text_only_input=x_v)

    loss = loss_dpo + lambda_inv * loss_inv + lambda_sens * loss_sens + lambda_lpd * loss_lpd
    optimizer.step(loss)
```

##### 3. 动机：为什么普通 DPO 不够

MoD-DPO 处理的不是纯文本偏好对齐，而是 **omni LLM 在音频、视频和文本共同输入下的幻觉问题**。论文指出，现有模型即使经过多模态后训练，仍然容易在两类情况下出错：一类是把本来不相关的模态信号当成强证据，例如从视觉画面“脑补”出并不存在的声音；另一类是模型过度依赖语言模板和文本提示，在感知证据很弱时仍然给出看似合理但并不 grounded 的答案。单纯套用 DPO，只能学习“chosen 比 rejected 更好”，却不会显式告诉模型“到底该依赖哪一个模态”。

论文的关键判断是：跨模态幻觉的根因不是简单的偏好建模不足，而是 **模态耦合方式错误**。因此，它把问题重新表述为两个约束目标：
- 对当前问题无关的模态，即使被扰动，输出也应该基本不变；
- 对当前问题真正相关的模态，只要被破坏，输出分布就应该明显变化。

这比普通 DPO 更强，因为它不只要求“选对答案”，而是要求模型形成正确的 **因果依赖结构**。比如当问题问视频里发生了什么时，模型应当主要依赖视觉证据；当视觉被破坏后，输出就应该退化，而不是继续凭音频或语言先验自信作答。

##### 4. 核心目标：在 DPO 上显式加入“模态解耦”

论文从标准 DPO 的 KL 约束最优策略出发，构造了视觉相关 prompt 下的目标。设输入包含音频 \(a\)、视频 \(v\) 和视觉相关文本提示 \(x^v\)，则 MoD-DPO 在 DPO 主目标外新增两项 KL 正则：

$$
\max_{\pi_\theta}
\mathbb{E}_{(a,v,x^v)\sim\mathcal{D},\, y\sim\pi_\theta(\cdot\mid a,v,x^v)}
\left[r(a,v,x^v,y)\right]
- \beta \, \mathbb{D}_{\mathrm{KL}}\!\left(\pi_\theta(\cdot\mid a,v,x^v)\,\|\,\pi_{\mathrm{ref}}(\cdot\mid a,v,x^v)\right)
- \beta_{\mathrm{inv}} \, \mathbb{D}_{\mathrm{KL}}\!\left(\pi_\theta(\cdot\mid a,v,x^v)\,\|\,\pi_\theta(\cdot\mid a',v,x^v)\right)
+ \beta_{\mathrm{sens}} \, \mathbb{D}_{\mathrm{KL}}\!\left(\pi_\theta(\cdot\mid a,v,x^v)\,\|\,\pi_\theta(\cdot\mid a,v',x^v)\right)
$$

其中 \(a'\) 是被扰动的音频，\(v'\) 是被扰动的视频。这个式子非常直观：
- 第二项仍是 DPO 的参考模型约束，防止策略漂移过大；
- 第三项要求在 **无关模态被破坏时输出尽量稳定**，也就是不变性；
- 第四项要求在 **相关模态被破坏时输出必须变化**，也就是敏感性。

对视觉问题来说，音频是“无关模态”、视频是“相关模态”；对于音频问题，论文给出了完全对称的目标，只需要把音频和视频的位置互换即可。这样一来，MoD-DPO 不再只是偏好学习，而是在优化时直接塑造“哪条模态路径该被信任”。

> 💡 关键：普通 DPO 只区分“答案 A 胜过答案 B”，MoD-DPO 进一步区分“这个胜负应当由哪一个模态决定”。这正是它能抑制跨模态幻觉的原因。

##### 5. Language-Prior Debiasing：专门压制文本捷径

论文还指出，多模态模型的语言骨干通常经过大规模文本预训练，因此即使感知输入不足，它也能仅凭语言模式生成“貌似合理”的回答。这会导致一种更隐蔽的失败：模型不是看错了图像或听错了音频，而是 **根本没认真看/听**，直接靠语言先验作答。

为此，MoD-DPO 在偏好优化奖励里又加入了一个 text-only 惩罚项。直觉上，这个项会比较“完整模态输入下的策略”与“只保留文本输入时的策略”，如果模型在 text-only 条件下仍然给出同样高的偏好分数，就说明它过于依赖语言先验，应被惩罚。这个设计和不变性/敏感性正好互补：
- 不变性约束负责“不要误用无关模态”；
- 敏感性约束负责“必须使用相关模态”；
- LPD 负责“不要绕开感知，直接走语言捷径”。

从论文实验结果看，带 LPD 的更强变体在语言主导类任务上提升更明显，这说明跨模态幻觉不只是模态错配问题，也和语言模型本身的先验偏置有关。

> ⚠️ 注意：这里的目标不是让模型“少用文本”，而是防止它在应该依赖感知证据时，仍然把文本模式匹配当作主要依据。

##### 6. 偏好数据如何构造

MoD-DPO 的另一项重要工作是自动生成训练偏好数据，而不是依赖昂贵的人类逐条标注。论文的 Figure 4 给出了一条三阶段流水线：

![MoD-DPO 偏好数据生成流程](https://arxiv.org/html/2603.03192v2/x4.png)

*图：论文 Figure 4。先把音频和视觉信息拆开做 caption/tag，再基于模态相关问题构造 QA，最后用“相关模态信息”生成 chosen，用“无关模态信息”生成 rejected。*

具体来说：
- Stage 1：先把视频拆解为视觉描述和音频描述，获得更干净的单模态语义；
- Stage 2：根据这些模态描述自动生成与音频或视觉相关的问题；
- Stage 3：对每个问题，使用相关模态构造 chosen response，使用无关模态或错误模态构造 rejected response。

这样生成出来的偏好对天然带有“模态监督”属性。普通 DPO 数据只告诉模型哪个答案更好，MoD-DPO 数据则额外告诉模型“为什么这个答案更好，是因为它用了正确模态的信息”。论文最终构造了超过 18.1k 条偏好样本，覆盖约 10.8k 个唯一视频，为后续优化提供了足够多样的幻觉场景。

##### 7. 方法效果与相对位置

论文主要在 Qwen2.5-Omni 和 MiniCPM-O 2.6 两个 omni LLM 上做实验，并在 AVHBench 与 CMM 两类跨模态幻觉基准上与 DPO、OmniDPO 等方法比较。项目页给出的结果显示：
- 在 Qwen2.5-Omni 上，AV Matching 准确率从基线的 54.69 提升到 69.07；
- 在 MiniCPM-O 2.6 上，AV Matching 从 54.26 提升到 60.57；
- 在 CMM 上，Qwen2.5-Omni 的 overall perception accuracy 从 86.4 提升到 88.8，hallucination resistance 从 84.6 提升到 86.2。

这些结果说明，MoD-DPO 并不是简单地“让模型更保守”，而是让模型在真正需要依赖音频/视频证据时更 grounded，因此既减少幻觉，也能提升一般的音视频理解表现。它在 LLM RL 演化链上的意义，是把 DPO 从纯文本偏好优化推进到了 **显式模态归因约束** 的阶段。

#### 🧪 练习题
```yaml
question: "对于视觉相关的问题，MoD-DPO 中“模态解耦”最核心的训练信号是什么？"
options:
  - "要求模型在视频被破坏后依然保持同样输出"
  - "要求模型在音频被破坏后明显改变输出，而在视频被破坏后保持稳定"
  - "要求模型在无关音频被破坏时保持稳定，在相关视频被破坏时显著改变输出"
  - "完全去掉参考模型，只用 chosen / rejected 交叉熵训练"
answer: 2
explain: "视觉问题下，音频通常是无关模态、视频是相关模态；因此 MoD-DPO 同时要求对无关模态扰动保持不变，对相关模态扰动保持敏感。"
```
