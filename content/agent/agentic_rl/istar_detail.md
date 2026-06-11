### iStar: 隐式步骤奖励 (Implicit Step Rewards / iStar)

```yaml
id: istar
name: iStar
full_name: 隐式步骤奖励 (Implicit Step Rewards / iStar)
year: '2025.09'
org: Tongyi Lab
paper_url: https://arxiv.org/abs/2509.19199
category: reward
parent: webagent_r1
motivation: 从轨迹偏好学习隐式步骤奖励
```

#### 📝 一句话总结
iStar 提出了一种**隐式过程奖励模型（implicit PRM）**，通过从轨迹偏好对中学习稠密的步骤级隐式奖励，并将其与轨迹级结果奖励结合形成双层优势函数，从而解决 LLM Agent 在长序列多步交互中的信用分配难题，无需人工标注步骤奖励即可显著提升 RL 训练的样本效率和最终性能。

#### 🎯 核心要点
- **隐式 PRM**：无需显式预测每步得分，而是通过 DPO 式轨迹偏好对比隐式地为每个动作分配步骤奖励
- **双层优势函数**：将轨迹级结果奖励 \(r_o\) 与步骤级隐式奖励 \(r_\phi\) 融合为 episode-level advantage \(A^E\) 和 step-level advantage \(A^S\)，指导策略梯度更新
- **轨迹偏好对构造**：利用结果验证器对同一任务的 N 条轨迹排序，自动构造正负轨迹对，无需人工标注
- **与 vanilla RL 无缝集成**：iStar 是策略无关的插件式方法，可与 GRPO、RLOO、PPO 等任意 RL 算法结合
- **三环境验证**：在 WebShop（网页导航与购买）、VisualSokoban（视觉推箱子推理）、SOTOPIA（社交对话）三个差异显著的环境上均达到 SOTA
- **样本效率大幅提升**：在 WebShop 上，iStar+GRPO 仅需 vanilla RLOO 一半的训练步数（105 vs ~210 steps）即达到同等性能

#### 🔬 深入细节
##### 动机与背景

LLM Agent 的强化学习面临**三重核心挑战**：

1. **奖励稀疏与延迟**：Agent 通常在完整轨迹结束后才能获得一个标量结果奖励（成功/失败或分数），在长达数十步的交互中，这导致信用分配极其困难——模型无法判断到底是哪一步的正确（或错误）行动贡献了最终结果。

2. **长轨迹非马尔可夫性**：每个时间步不仅包含环境动作，还包含大段的 CoT（Chain-of-Thought）推理文本，这使得状态空间巨大且转移函数复杂，传统 MDP 假设难以成立。

3. **环境非稳态与奖励验证困难**：尤其在对话等开放场景中，过程奖励难以客观定义和验证，人工标注步骤奖励成本极高且不可扩展。

传统方法如 RLOO、GRPO 仅使用轨迹级结果奖励，导致信用分配粗糙、训练效率低下。而显式 PRM（如 Math-Shepherd）虽提供步骤奖励，但依赖昂贵的人工标注或启发式规则，难以泛化到多样化的 Agent 任务。iStar 的 key insight 是：**轨迹偏好中已经蕴含了丰富的步骤级信用信息**——好轨迹（高结果奖励）与差轨迹（低结果奖励）之间的差异不仅仅体现在最终结果上，更体现在中间步骤的质量差异上，通过对比学习可以从中蒸馏出隐式的步骤奖励。

##### 核心机制：隐式 PRM 的双层优势架构

iStar 的核心架构由三部分构成：

**（一）轨迹偏好对构造**

对于每个任务 prompt \(x\)，Agent 采样 \(N\) 条独立轨迹 \(\{\tau_1, \dots, \tau_N\}\)。每条轨迹 \(\tau_i = (o_1^i, a_1^i, o_2^i, a_2^i, \dots, o_T^i, a_T^i)\) 包含观察序列和动作序列（动作内含 CoT 推理文本）。使用**结果奖励验证器**（或奖励模型）\(r_o\) 计算每条轨迹的最终得分 \(r_o(\tau_i)\)，据此将 \(N\) 条轨迹按得分排序，构造正负轨迹对 \(\tau^+ \succ \tau^-\)。

> 💡 关键：iStar 不需要训练一个独立的奖励模型来生成步骤标签，而是直接从轨迹排序的对比信号中学习。这完全消除了对人工步骤标注的依赖。

**（二）隐式 PRM 训练（DPO 式目标）**

隐式 PRM \(\pi_\phi\) 与策略模型共享初始化权重（从 \(\pi_{\theta_{\text{init}}}\) 初始化），但独立更新。对于每个轨迹对 \((\tau^+, \tau^-)\)，iStar 定义了一个轨迹级别的 DPO 损失，但巧妙地将其分解到步骤级别：

$$r_\phi(a_t) = \log \frac{\pi_\phi(a_t \mid o_{1:t}, x)}{\pi_{\theta_{\text{init}}}(a_t \mid o_{1:t}, x)}$$

即每步的隐式奖励 \(r_\phi(a_t)\) 定义为该步动作在 PRM 和初始策略下的对数概率比。这一设计的精妙之处在于：它借用了 RLHF 中 reward-from-preference 的思想，但将其迁移到了**步骤粒度**——轨迹偏好信号通过对比损失传播到每个时间步，PRM 自然地学到哪些步骤动作"好于"初始策略的基线水平。

PRM 的 DPO 式训练目标为：

$$\mathcal{L}_{\text{PRM}}(\phi) = -\mathbb{E}_{(x, \tau^+, \tau^-)} \left[ \log \sigma \left( \beta \sum_{t=1}^T \left( r_\phi(a_t^+) - r_\phi(a_t^-) \right) \right) \right]$$

其中 \(\beta\) 控制偏好强度。这个损失鼓励正轨迹的累积步骤奖励高于负轨迹，从而隐式地将全局轨迹偏好信号分配到局部步骤上。训练过程中 PRM 和策略交替更新：先用当前策略采样轨迹训练 PRM，再用训练后的 PRM 生成步骤奖励来指导策略更新。

> ⚠️ 注意：PRM 的每一步奖励 \(r_\phi(a_t)\) 都是**隐式**的——它不是显式的标量输出头，而是通过当前 PRM 与 frozen reference（初始策略）的对数概率差计算得到。这种设计避免了额外输出头的训练不稳定问题，同时保证了奖励信号与策略表征空间的对齐。

**（三）双层优势策略优化**

iStar 将步骤级隐式奖励与轨迹级结果奖励结合，形成**双层优势函数**来指导策略梯度更新。对于每条轨迹 \(\tau_i\)：

- **Episode-level advantage** \(A^E(\tau_i)\)：将结果奖励归一化（在 \(N\) 条轨迹内进行 z-score 标准化），提供全局信号——整条轨迹是"好"还是"坏"：

$$A^E(\tau_i) = \frac{r_o(\tau_i) - \mu_o}{\sigma_o}$$

- **Step-level advantage** \(A^S(a_t^i)\)：基于隐式 PRM 的步骤奖励，同样在组内归一化，提供局部信号——这一步动作是"好"还是"坏"：

$$A^S(a_t^i) = \frac{r_\phi(a_t^i) - \mu_{\phi,t}}{\sigma_{\phi,t}}$$

最终的混合优势函数为：

$$A_{\text{mix}}(a_t^i) = A^E(\tau_i) + \alpha \cdot A^S(a_t^i)$$

其中 \(\alpha\) 是混合权重超参数，控制步骤级信号的强度。这一设计巧妙地融合了两种互补信号：轨迹级优势保证了全局目标的对齐（朝高奖励方向优化），步骤级优势提供了精确的局部信用分配（告诉模型哪些具体步骤贡献了高奖励），从而同时解决了稀疏奖励和长序列信用分配两大难题。

策略更新使用标准的 GRPO 目标（以 GRPO 为例，iStar 同样支持 RLOO 和 PPO）：

$$\mathcal{L}_{\text{policy}}(\theta) = -\mathbb{E} \left[ \min\left( \frac{\pi_\theta}{\pi_{\theta_{\text{old}}}} A_{\text{mix}}, \operatorname{clip}\left(\frac{\pi_\theta}{\pi_{\theta_{\text{old}}}}, 1-\epsilon, 1+\epsilon\right) A_{\text{mix}} \right) \right]$$

##### 训练流程

![iStar 框架总览](https://ar5iv.org/html/2509.19199/assets/x1.png)
*图：iStar 训练流程总览。LLM Agent 与环境交互生成多条轨迹，结果验证器排序后构造正负轨迹对，经由 DPO 目标训练隐式 PRM 隐式生成步骤奖励，最终通过双层优势函数指导策略更新。*

完整训练流程（参见 Algorithm 1）：

```python
# Algorithm 1: Training LLM Agents with iStar (GRPO as an example)

Input:  task distribution p(X), language model π_θ_init,
        outcome reward verifier r_o, training steps M, rollout size N,
        mixing weight α

Output: Optimized policy π_θ and PRM π_ϕ

# Initialize
π_θ ← π_θ_init, π_θ_old ← π_θ_init, π_ϕ ← π_θ_init

for iteration = 1, ..., M do:
    # --- Multi-step Rollouts Collection ---
    Sample task x ~ p(X)
    Initialize N identical environments
    
    for t = 1, ..., T do:
        # Sample actions from current policy for all N trajectories
        {a_t^i ~ π_θ(o_{1:t}^i, x)}_{i=1}^N
        Execute actions, observe {o_{t+1}^i}_{i=1}^N
    
    # --- PRM Training ---
    Compute outcome rewards for N trajectories: r_o(τ_{1:N})
    Rank trajectories, construct positive-negative pairs τ^+ ≻ τ^-
    # Forward pass π_ϕ to obtain step rewards r_ϕ(a_t) via Eq.(1)
    # Update PRM π_ϕ using DPO-style objective (Eq.2)
    
    # --- Policy Training (GRPO) ---
    Compute episode-level advantages A^E(τ_i) using r_o(τ_i) (Eq.3)
    Compute step-level advantages A^S(a_t^i) using r_ϕ(a_t^i) (Eq.4)
    Compute mixed advantage A_mix via Eq.(5): A^E + α·A^S
    
    # Update policy π_θ with clipped objective
    Update π_θ using A_mix
    
    # Sync old policy
    π_θ_old ← π_θ
```

##### 与传统方法的区别

| 维度 | 传统方法（RLOO/GRPO） | 显式 PRM（Math-Shepherd 等） | iStar |
|------|----------------------|------------------------------|-------|
| 奖励信号 | 仅轨迹级结果奖励 | 人工标注/启发式步骤奖励 | 隐式学习步骤奖励 |
| 信用分配 | 粗粒度（整条轨迹均分） | 细粒度但依赖昂贵标注 | 细粒度且自动化 |
| 步骤标注需求 | 无 | 需要（昂贵） | 无 |
| 泛化性 | 通用 | 限于可标注步骤域 | 通用 |
| 奖励来源 | 环境/验证器 | 人工/规则 | 轨迹偏好对比学习 |

iStar 的核心创新在于**用对比学习将廉价的轨迹级偏好信号自动分解为步骤级信用信息**，既避免了显式 PRM 的标注瓶颈，又远超 vanilla RL 的信用分配精度。这种"免费午餐"式的设计使其在多个异构环境上均表现出色。

> 💡 关键 insight：iStar 的成功源于一个优雅的设计选择——**不直接预测"这一步值多少分"，而是隐式地比较"这一步相对于初始策略好多少"**。通过 DPO 目标的 log-ratio 形式，PRM 自动学习到一个相对于初始策略基准的步骤奖励，避免了绝对奖励建模的困难，同时保持了与策略空间的天然对齐。

#### 🧪 练习题
```yaml
question: "iStar 中隐式 PRM 是如何为每个步骤生成奖励信号的？"
options:
  - "通过训练一个独立的标量输出头，直接预测每步的奖励值"
  - "通过计算 PRM 与 frozen initial policy 在该步骤上的对数概率差（log-ratio）"
  - "通过人工标注的步骤质量标签进行监督学习"
  - "通过蒙特卡洛采样估计每步的期望未来回报"
answer: 1
explain: "iStar 的隐式 PRM 不输出显式奖励值，而是通过 r_ϕ(a_t) = log(π_ϕ/π_θ_init) 的对数概率比来衡量当前步骤相对于初始策略的'改善程度'，这种方式避免了独立奖励建模的不稳定，并天然与策略表征空间对齐。"
```
