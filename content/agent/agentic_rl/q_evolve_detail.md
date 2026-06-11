### Q-Evolve: 分布内自进化代理强化学习 (Q-Evolve)

```yaml
id: q_evolve
name: Q-Evolve
full_name: 分布内自进化代理强化学习 (Q-Evolve)
year: '2026.06'
org: Eindhoven University of Technology
paper_url: https://arxiv.org/abs/2606.07367
category: frontier
parent: istar
motivation: 在分布内联合演化过程奖励与策略
```

#### 📝 一句话总结
Q-Evolve 提出了一套四阶段自进化框架：通过 Retrospective Relabeling 构造富含中间监督的混合离线数据、Weighted IQL 学习 In-Distribution Critic、GAE（仅用环境奖励）推导过程奖励、BPPO 进行行为近端策略优化，实现了在极少环境交互下将稀疏回合奖励转化为可靠的 step-level 信用分配，显著提升 LLM Agent 在长程任务上的表现。

#### 🎯 核心要点
- **四阶段自进化流程**：① 混合数据构造（Expert + Self-rollout + 回溯重标注）→ ② In-Distribution Critic Learning（Weighted IQL，Eq.1-5）→ ③ 过程奖励推导（GAE over \(r^{\text{env}}\)，Eq.6）→ ④ In-Distribution Policy Optimization（BPPO，Eq.7），循环 K 轮迭代
- **Weighted IQL（W-IQL）**：在标准 IQL expectile 回归中引入回合回报加权的 V 函数损失，使 Critic 更关注成功轨迹的值分布，缓解稀疏二元奖励下的无判别学习
- **Retrospective Relabeling**：利用整条轨迹的最终成败信号反标每步辅助奖励 \(r_t^{\text{aux}}\)（成功 +1，失败 -1），为 Critic 提供额外的中间监督
- **过程奖励推导的 env-only 设计**：GAE 仅基于环境奖励 \(r^{\text{env}}\) 和 Critic 值估计，辅助奖励仅用于改善 Critic 训练质量而不引入策略梯度偏差（Table 4 验证混合奖励反而降性能）
- **行为近端策略优化（BPPO）**：在 PPO 裁剪目标上引入不对称裁剪区间 \([1-\epsilon_{\text{low}}, 1+\epsilon_{\text{high}}]\) + KL 散度约束 Reference Model，实现对阳性动作的激近鼓励与阴性动作的严格抑制，保护 BC 初始化先验
- **三个环境全面验证**：WebShop（70.5%）、ScienceWorld（76.3% Seen / 69.7% Unseen）、ALFWorld（90.7% Seen / 89.6% Unseen），平均得分 79.4%，全面超越 QLASS、ETO、Best-of-N 等强基线
- **极致样本效率**：仅需 13K 环境步即超越 320K 步在线 RL 方法（PPO 59.4%、RLOO 56.4%、GRPO 39.7%），源于 Critic 训练阶段完全离线

#### 🔬 深入细节
##### 1. 核心框架示意图

![Q-Evolve 框架总览](https://arxiv.org/html/2606.07367v1/x1.png)
*图：Q-Evolve 四阶段自进化流程 — Stage 1 混合数据构造（Expert + Self-rollout + Retrospective Relabeling）→ Stage 2 In-Distribution Critic Learning（Weighted IQL）→ Stage 3 过程奖励推导（GAE with \(r^{\text{env}}\)）→ Stage 4 In-Distribution Policy Optimization（BPPO），循环 K 轮迭代，每轮用更新后的策略重新采样*

![Weighted IQL 结构示意](https://arxiv.org/html/2606.07367v1/x2.png)
*图：Weighted IQL（W-IQL）对比标准 IQL 的训练范式 — 在稀疏回合奖励下，W-IQL 通过回合级权重 \(w(\tau)=\sigma(\beta \cdot (R_T-\bar{R}))\) 使 Critic 更关注成功轨迹，提升值函数估计的鲁棒性与区分度*

![迭代改进消融](https://arxiv.org/html/2606.07367v1/x3.png)
*图：Ablation on interactive improvement — 从 Iter-1 到 Iter-2 持续增益，验证了自进化框架的稳定累积能力，每次迭代贡献额外的有用监督*

##### 2. 算法伪代码

```python
# Algorithm 1: Q-Evolve — Q-value Guided Self-Evolution for LLM Agents
# Input:  Expert dataset D_expert, Environment Env, Iterations K
# Output: Evolved policy π_θ

# Warm-up: Behavior Cloning on expert data
π_θ = warmup_BC(D_expert)

for k = 1 to K:
    # ── Stage 1: Hybrid Data Construction ──
    D_self = rollout(π_θ, Env)          # 当前策略采样（3条/任务）
    D = D_expert ∪ D_self               # 合并专家数据与自采数据
    for each trajectory τ in D:          # Retrospective Relabeling
        r_t^aux = +1 if R_T=1 else -1   # Eq.3: 利用全局成败信号反标每一步

    # ── Stage 2: In-distribution Critic Learning ──
    for step in critic_training_steps:
        # V 函数: Weighted IQL expectile 回归 (Eq.4-5)
        L_V = E_D[ w(τ) · L2^m( Q_bar(u,s,a) - V(u,s) ) ]
        # Q 函数: 标准 TD 损失 (Eq.2)
        L_Q = E_D[ ( r^{env} + γ·V(u,s') - Q(u,s,a) )^2 ]
        V, Q = update(L_V, L_Q)

    # ── Stage 3: Process Reward Derivation ──
    for each trajectory τ in D:          # GAE with env reward only (Eq.6)
        A_t = GAE(r_t^env, V_t, V_{t+1}, γ=0.99, λ=0.95)

    # ── Stage 4: In-distribution Policy Optimization ──
    for epoch in PPO_epochs:
        η_t = π_θ(a_t|·) / π_old(a_t|·)  # 重要性采样比
        # BPPO 目标 (Eq.7): 不对称裁剪 + KL 正则
        L_π = E_D[ min( η_t·A_t, clip(η_t, 1-ε_low, 1+ε_high)·A_t ) ]
        L_π += α · KL(π_θ || π_ref)      # 保护 BC 初始化先验
        π_θ = optimizer.step(L_π)

return π_θ
```

##### 3. 深度解析

**3.1 动机与背景：LLM Agent 长轨迹中的稀疏奖励困境**

在 Agentic RL 场景（如指令执行、网页导航、具身任务）中，LLM Agent 往往需要执行数十乃至上百步的环境交互——例如在 ALFWorld 中依次完成"拿钥匙→开抽屉→取物品→放桌上"等多步子任务——而环境通常只在最终步提供一个二元信号：成功=1，失败=0。这种极端稀疏的奖励结构导致两个根本性挑战：

1. **信用分配困难（Temporal Credit Assignment）**：无法区分长轨迹中哪些动作是关键贡献、哪些是无害的、哪些是有害的。传统方法（如 RFT，Rejection Sampling Fine-Tuning）直接丢弃整个失败轨迹，浪费了大量可用的中间监督信息。
2. **离线 RL 的外推误差（Extrapolation Error）**：直接从离线数据学习 Q 函数时，对 OOD（out-of-distribution）动作的值估计极易偏离真实值，导致策略在不可预知的方向上退化。

Q-Evolve 的核心洞察在于：**与其用稀疏回合奖励直接做在线策略梯度（PPO/GRPO 需大量在线 rollout，320K 环境步），不如先在离线混合数据上训练一个可靠的 In-Distribution Critic，再从中推导出稠密的 step-level 过程奖励来指导策略优化**。这种"Critic 先行，策略后行"的范式使得整个框架仅需 13K 环境步即可收敛，同时避免了在线 RL 的不稳定性和高样本复杂度。

**3.2 Stage 1 — 混合数据构造与 Retrospective Relabeling**

纯离线 RL 依赖固定数据集，缺乏探索多样性。Q-Evolve 的关键设计在于每轮迭代主动采样：

- **策略自采轨迹** \(\mathcal{D}_{\text{self}}\)：用当前策略 \(\pi_\theta\) 在环境中对每个任务采样少量轨迹（论文设置 3 条/任务），与固定专家数据集 \(\mathcal{D}_{\text{expert}}\) 合并构成混合数据集 \(\mathcal{D}\)。
- **Retrospective Relabeling（回溯重标注）**：对 \(\mathcal{D}\) 中的每条轨迹 \(\tau = \{(c_t,a_t)\}_{t=1}^T\)，利用其最终得分 \(R_T \in \{0,1\}\) 统一标注每一步的辅助奖励：

\[
r_t^{\text{aux}} = \begin{cases} +1, & \text{if } R_T = 1 \text{ (task success)} \\ -1, & \text{if } R_T = 0 \text{ (task failure)} \end{cases}
\]

该操作完全自动化，无需人工标注。其直觉是：**成功轨迹中每一步至少是\"不坏\"的（否则整个任务不会成功），失败轨迹中每一步可能存在问题**。虽然这种\"一刀切\"的标注噪声较大——失败轨迹中也可能存在合理的动作——但它提供了传统离线数据完全缺乏的中间监督信号。Table 3 消融（w/o RT）证实移除该标注会导致显著性能下降。

> 💡 关键设计：自采数据 + 回溯标注是 Q-Evolve 自进化的基石——策略在每轮迭代中主动探索边界案例，积累对当前策略而言最有价值的学习信号；而回溯标注则提供了一种无成本但有意义的步骤级粗略信用信号。

**3.3 Stage 2 — Weighted IQL：In-Distribution Critic Learning**

标准 IQL（Implicit Q-Learning）是一种 Offline RL 算法，通过 expectile 回归学习一个值函数 \(V\) 来隐式地逼近 in-distribution 动作的最大 Q 值，而无需对 OOD 动作显式执行 max 操作，从而避免了外推误差：

\[
\begin{aligned}
\mathcal{L}_V &= \mathbb{E}_{(u,s,a)\sim\mathcal{D}}\left[ L_2^m\big( \bar{Q}(u,s,a) - V(u,s) \big) \right] \\
\mathcal{L}_Q &= \mathbb{E}_{(u,s,a,r^{\text{env}},s')\sim\mathcal{D}}\left[ \big( r^{\text{env}} + \gamma V(u,s') - Q(u,s,a) \big)^2 \right]
\end{aligned}
\]

其中 \(L_2^m(\delta) = |m - \mathbb{1}(\delta < 0)| \cdot \delta^2\) 是非对称平方损失。\(m \in (0.5, 1)\) 控制 expectile 水平，使得 \(V\) 趋近于 Q 分布的上分位数（通常取 \(m=0.7-0.9\)），从而隐式地执行"最优动作选择"。

Q-Evolve 对此做了关键增强——**Weighted IQL（W-IQL）**：在 \(V\) 函数的 expectile 回归损失中引入基于回合回报的权重：

\[
w(\tau) = \sigma\left( \beta \cdot (R_T - \bar{R}) \right), \quad \bar{R} = \frac{1}{B}\sum_{b=1}^{B} R_T^{(b)}
\]

\[
\mathcal{L}_V^{\text{weighted}} = \mathbb{E}_{(u,s,a)\sim\mathcal{D}}\left[ w(\tau) \cdot L_2^m\big( \bar{Q}(u,s,a) - V(u,s) \big) \right]
\]

其中 \(\beta\) 控制 gating 的陡峭程度，\(\sigma(\cdot)\) 是 sigmoid 函数。

> ⚠️ 核心直觉：在稀疏二元奖励下，标准 IQL 无法区分成功和失败轨迹——所有数据无差别地用于训练 Critic，导致 V 函数成为一个"混合分布"的 expectile，对好坏状态失去区分力。W-IQL 通过 \(w(\tau)\) 使得成功轨迹（\(R_T=1\)）占主导，失败轨迹（\(R_T=0\)）被压低权重，迫使 Critic 聚焦于成功行为的值分布，从而提供一个更可靠的内插值函数基础。

> 💡 关键对比：辅助奖励 \(r^{\text{aux}}\) 不直接进入 Q 函数的 TD 目标（Eq.2 仅使用 \(r^{\text{env}}\)），其作用体现在 (1) 作为 V 函数损失的权重 gating 输入 \((R_T)\)；(2) 间接为 Critic 训练提供信息增益。这种设计让辅助信号和策略梯度信号保持在不同的信息通道中，避免交叉污染。

**3.4 Stage 3 — 过程奖励推导：GAE 与 env-only 设计**

获得可靠的 Critic 估值后，Q-Evolve 通过 **Generalized Advantage Estimation（GAE）** 公式推导每步的过程奖励/优势函数：

\[
A_t = \sum_{\ell=0}^{\infty} (\gamma\lambda)^\ell \left( r_{t+\ell}^{\text{env}} + \gamma V(u,h_{t+\ell+1},o_{t+\ell+1}) - V(u,h_{t+\ell},o_{t+\ell}) \right)
\]

**关键设计选择**: GAE 中**仅使用环境奖励 \(r^{\text{env}}\)，不混入辅助奖励 \(r^{\text{aux}}\)**。这背后的原理是：

- **辅助奖励的偏差性**：\(r^{\text{aux}}\) 将所有失败步统一标记为 \(-1\)，即便其中某些动作可能是合理的（如"正确拿起钥匙但后续步骤出错"）。如果直接引入 GAE，会导致对合理动作的误惩罚，使策略梯度带偏差。
- **Critic 的信息传递**：辅助奖励已经通过 W-IQL 的权重机制改善了 V 函数的质量，更准确的 V 自然会传导到更准确的 GAE 估计中——这是一种"间接但无偏"的利用方式。

Table 4 的消融实验直接验证了这一设计：GAE with \(r^{\text{env}}+r^{\text{aux}}\)（81.4%）显著低于 GAE with \(r^{\text{env}}\) only（87.9%），甚至不如一步 \(Q-V\) 信号（74.3%）的改善幅度大（虽然 GAE+\(r^{\text{aux}}\) 仍高于一步信号）。这清晰表明：**辅助奖励是好的 Critic 训练辅助，但不是好的策略梯度输入**。

> 💡 关键洞见：Q-Evolve 在两个信息通道上分别使用不同类型的奖励——\(r^{\text{aux}}\) → Critic（改善 V/Q 质量），\(r^{\text{env}}\) → Actor（提供无偏梯度方向）。这种"双通道"设计是框架性能的核心保障。

**3.5 Stage 4 — BPPO：行为近端策略优化**

Q-Evolve 的策略优化模块并非普通 PPO，而是专为 Offline-to-Online 场景设计的 **Behavior-Proximal PPO（BPPO）**：

\[
\begin{aligned}
\mathcal{L}_\pi(\theta) = \mathbb{E}_{\mathcal{D}}\Big[ \min\Big( \eta_t A_t,\; \mathrm{clip}\big(\eta_t,\, 1-\epsilon_{\text{low}},\, 1+\epsilon_{\text{high}}\big) A_t \Big) \Big] + \alpha \, \mathrm{KL}(\pi_\theta \| \pi_{\text{ref}})
\end{aligned}
\]

其中 \(\eta_t = \pi_\theta(a_t|u,h_t,o_t) / \pi_{\text{old}}(a_t|u,h_t,o_t)\) 是重要性采样比。

BPPO 与标准 PPO 有三个本质区别：

1. **不对称裁剪区间**：\(\epsilon_{\text{low}} \neq \epsilon_{\text{high}}\)，通常设置 \(\epsilon_{\text{high}} > \epsilon_{\text{low}}\)。这意味着：对正向优势动作（\(A_t > 0\)，\"好动作\"），允许更大的策略更新幅度；对负向优势动作（\(A_t < 0\)，\"坏动作\"），实施更严格的裁剪约束。这种**非对称梯度截断**实现了\"积极鼓励好行为，谨慎惩罚坏行为\"的直觉——在长程任务中，坏动作的危害远大于好动作的收益延迟。

2. **In-Distribution 策略更新**：所有优化仅基于数据集 \(\mathcal{D}\) 中的状态和动作进行，而非 on-policy rollout。从根本上避免了离线 RL 中最致命的问题——对未见过动作的 Q 值外推误差导致的策略崩溃。

3. **KL 散度约束 Reference Model**：额外的 KL 正则项 \(\alpha \cdot \text{KL}(\pi_\theta \| \pi_{\text{ref}})\) 约束当前策略不偏离 Behavior Cloning 的初始化先验 \(\pi_{\text{ref}}\)。这类似于 Trust Region 的思想，在少量自采数据上训练时防止过拟合和经验灾难性遗忘。

Table 3 的最后一行给出了 BPPO vs AWR（Advantage-Weighted Regression）的对比：用 AWR 替换 BPPO 后性能明显下降。原因是 AWR 通过加权行为克隆来优化策略，所有动作（包括负优势动作）都在不同程度上被模仿；而 BPPO 通过 signed advantage 和 clip 机制显式地**抑制负优势动作的影响力**，在长程策略改进中这一点至关重要。

> ⚠️ 核心对比：IQL 的原始策略抽取（AWR）是"加权模仿"，BPPO 是"定向纠正"。在需要修正错误行为的长程任务中，后者的显式负信号抑制能力不可替代。

**3.6 迭代自进化的累积效果与极致样本效率**

Q-Evolve 支持多轮迭代：每轮用当前优化后的策略采集新的 \(\mathcal{D}_{\text{self}}\)，重新训练 Critic 并优化策略。Figure 3 显示了从 Iter-1 到 Iter-2 的持续提升，表明框架能**稳定累积**多轮自监督改进，而非一次性的 boost 效应。

Table 5 将 Q-Evolve 与在线 RL 方法（PPO、RLOO、GRPO）做了样本效率的对齐比较。在相同主干模型（Qwen2.5-7B-Instruct）和相同任务（ALFWorld）下：

| 方法 | 环境步数 | Seen | Unseen |
|------|---------|------|--------|
| PPO | 320K | 59.4 | 67.7 |
| RLOO | 320K | 56.4 | 36.6 |
| GRPO | 320K | 39.7 | 32.2 |
| SFT | 0 | 74.9 | 62.3 |
| SFT + PPO | 320K | 72.6 | 77.6 |
| SFT + RLOO | 320K | 75.0 | 51.4 |
| SFT + GRPO | 320K | 66.7 | 74.1 |
| **Q-Evolve (1-iter)** | **13K** | **88.6** | **87.3** |

Q-Evolve 用 1/25 的环境步数，取得了远超所有方法的结果（88.6% vs 最高 75.0%）。这源于其核心设计：**Critic 训练阶段完全离线**，仅策略采样阶段需要少量环境交互。

**3.7 多模型架构泛化**

Table 6 验证了 Q-Evolve 在 Llama-3-8B-Instruct 上的表现，同样超越 MPO、KnowAgent、WKM 等 planning-based 方法。这证明了方法并非绑定特定模型初始化，其改进来自于通用的值估计与策略优化机制。

#### 🧪 练习题
```yaml
question: "Q-Evolve 中 Weighted IQL 的主要作用是什么？"
options:
  - "用回合回报对 IQL 的 expectile 回归损失加权，使 Critic 更关注成功轨迹的值分布"
  - "在 Q 学习中引入 entropy bonus 以鼓励探索"
  - "用 Behavior Cloning 的 log-prob 初始化 Q 函数"
  - "对 OOD 动作实施 trust region 约束以防止外推"
answer: 0
explain: "Weighted IQL 在标准 IQL 的 V 函数 expectile 回归中引入基于回合回报的权重 w(τ)=σ(β·(R_T−R̄))，使得高回报轨迹在 Critic 训练中有更大的影响力，缓解了稀疏二元奖励下 Critic 对好坏轨迹的无判别学习问题，从而提供更准确的值估计基础用于后续 GAE 优势推导。"
```
