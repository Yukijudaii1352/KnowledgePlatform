### CQL — 保守Q学习 (Conservative Q-Learning)

```yaml
id: cql
name: CQL
full_name: 保守Q学习 (Conservative Q-Learning)
year: '2020'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2006.04779
category: offline_rl
parent: bcq
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
