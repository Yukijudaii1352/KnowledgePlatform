### BCQ — 批量约束Q学习 (Batch-Constrained Q-learning)

```yaml
id: bcq
name: BCQ
full_name: 批量约束Q学习 (Batch-Constrained Q-learning)
year: '2019'
org: McGill
paper_url: https://arxiv.org/abs/1812.02900
category: offline_rl
parent: ddpg
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
