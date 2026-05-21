### GRPO：组相对策略优化 (Group Relative Policy Optimization)

```yaml
id: grpo
name: GRPO
full_name: 组相对策略优化 (Group Relative Policy Optimization)
year: 2024.02
org: DeepSeek
paper_url: https://arxiv.org/abs/2402.03300
category: online_rl
parent: ppo
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
