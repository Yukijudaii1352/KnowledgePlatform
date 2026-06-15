### DreamerV1 — 梦想者V1 (Dream to Control)

```yaml
id: dreamerv1
name: DreamerV1
full_name: 梦想者V1 (Dream to Control)
year: '2019'
org: DeepMind
paper_url: https://arxiv.org/abs/1912.01603
category: world_model
parent: mbpo
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
