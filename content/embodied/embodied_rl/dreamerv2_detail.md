### DreamerV2 — 梦想者V2 (Mastering Atari with Discrete World Models)

```yaml
id: dreamerv2
name: DreamerV2
full_name: 梦想者V2 (Mastering Atari with Discrete World Models)
year: '2020'
org: DeepMind
paper_url: https://arxiv.org/abs/2010.02193
category: world_model
parent: dreamerv1
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
