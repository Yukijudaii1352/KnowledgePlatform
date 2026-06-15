### TD-MPC：时序差分模型预测控制 (TD-MPC)

```yaml
id: tdmpc
name: TD-MPC
full_name: "时序差分模型预测控制 (TD-MPC)"
year: "2022.06"
org: UC San Diego
paper_url: "https://arxiv.org/abs/2203.04955"
category: planning
parent: muzero
motivation: "结合TD学习与MPC无需显式重建损失"
```

#### 📝 一句话总结

TD-MPC 提出用时序差分学习训练任务导向潜在动力学模型，并在潜在空间中执行短视野 MPC，用终端价值函数补足长远回报，解决连续控制中长程模型预测昂贵且像素/状态重建不一定服务控制的问题。

#### 🎯 核心要点

- **TOLD 模型**：Task-Oriented Latent Dynamics 同时学习 latent transition、reward、Q value 和 policy
- **无重建损失**：不用预测未来像素或完整状态，只通过奖励、TD 价值和 latent consistency 塑造模型
- **MPC + terminal value**：短 horizon 模型 rollout 负责局部控制，价值函数估计 horizon 之后的回报
- **MPPI 规划**：在潜在空间采样动作序列，根据模型奖励和终端 Q 值加权更新采样分布
- **策略先验引导规划**：学习一个 policy prior，为采样优化提供候选动作轨迹
- **多步反传**：从 reward、value、consistency 三项损失跨多步反传到潜在动力学
- **连续控制适配**：在 DMControl、Meta-World 及高维 Dog/Humanoid 任务上显示样本效率优势

#### 🔬 深入细节

##### 方法总览

![TD-MPC 总览](https://ar5iv.labs.arxiv.org/html/2203.04955/assets/x1.png)
*图：TD-MPC 在 latent state 上做模型 rollout，短期奖励由模型预测，长期收益由 learned value 估计。*

##### 算法伪代码

```python
# TD-MPC inference with a TOLD model
def plan_tdmpc(obs, previous_mean):
    z0 = h_theta(obs)
    mean, std = warm_start(previous_mean), init_std()

    for i in range(num_mppi_iterations):
        action_sequences = sample_gaussian(mean, std, horizon=H)
        action_sequences += sample_from_policy_prior(pi_theta, z0)

        returns = []
        for actions in action_sequences:
            z = z0
            total = 0
            for t, a in enumerate(actions):
                r_hat = R_theta(z, a)
                z = d_theta(z, a)
                total += gamma**t * r_hat
            total += gamma**H * Q_theta(z, pi_theta(z))
            returns.append(total)

        elites = top_k(action_sequences, returns)
        mean, std = weighted_refit(elites, returns)

    return sample_first_action(mean, std)

# training: reward + TD value + latent consistency, no pixel decoder
loss = reward_loss + value_td_loss + latent_consistency_loss + policy_prior_loss
```

##### 动机与背景

传统模型预测控制需要一个可靠动力学模型。若模型来自真实仿真器，规划效果强但计算昂贵；若模型从数据学习，长程预测又容易误差累积。另一方面，纯模型自由方法如 SAC 在连续控制中稳定，但真实交互样本效率较低。TD-MPC 的问题设定是：能否把模型式方法的规划优势和 TD 学习的长期价值估计结合起来？

TD-MPC 的答案是“不学完整世界，只学控制相关世界”。论文认为，让模型重建所有未来像素、阴影或本体状态会浪费容量，并可能学习到与奖励无关的细节。因此 TD-MPC 用任务目标塑造潜在模型，让 latent dynamics 只需要对 reward 和 value 有用。

##### TOLD：任务导向潜在动力学模型

TD-MPC 的 TOLD 模型包含五个组件：

$$z_t = h_\theta(s_t), \quad z_{t+1}=d_\theta(z_t,a_t)$$

$$\hat{r}_t = R_\theta(z_t,a_t), \quad \hat{Q}_t=Q_\theta(z_t,a_t), \quad \hat{a}_t=\pi_\theta(z_t)$$

其中 \(h\) 是 encoder，\(d\) 是 latent transition，\(R\) 是奖励头，\(Q\) 是状态动作价值，\(\pi\) 是策略先验。与 Dreamer、SimPLe 等重建式世界模型不同，TD-MPC 没有 decoder，不产生 \(\hat{s}_{t+1}\) 或 \(\hat{o}_{t+1}\)。

训练时从 replay buffer 采样一段轨迹，只编码第一帧，然后用 \(d_\theta\) recurrently 预测后续 latent。后续真实观测通过 target encoder 得到 \(z^{\text{target}}_{t+k}\)，作为 latent consistency 目标：

$$\mathcal{L}_{\text{cons}} = \| d_\theta^{(k)}(z_t,a_{t:t+k-1}) - \mathrm{sg}(h_{\bar{\theta}}(s_{t+k})) \|^2$$

其中 \(\mathrm{sg}\) 表示 stop-gradient，\(\bar{\theta}\) 是 EMA target network。这个损失不要求 latent 解码成图像，只要求预测 latent 与目标 latent 对齐。

##### TD 学习如何进入世界模型

TOLD 的价值头通过 TD 目标训练：

$$y_t = r_t + \gamma Q_{\bar{\theta}}(z_{t+1}, \pi_\theta(z_{t+1}))$$

$$\mathcal{L}_Q = \|Q_\theta(z_t,a_t)-y_t\|^2$$

因为 \(Q\) 的梯度会穿过多步 latent rollout，模型会被迫学习那些能预测长期价值变化的状态因素。奖励损失负责短期局部正确性，TD 价值损失负责长远控制意义，consistency 损失负责防止 latent dynamics 漂移。

##### MPC：短期模型 + 长期价值

推理阶段 TD-MPC 不直接执行 \(\pi_\theta\)，而是用 MPPI 在 latent space 中优化动作序列。对候选动作序列 \(a_{0:H-1}\)，它评估：

$$J(a_{0:H-1}) =
\sum_{t=0}^{H-1}\gamma^t R_\theta(z_t,a_t)
+ \gamma^H Q_\theta(z_H,\pi_\theta(z_H))$$

这就是 TD-MPC 的关键折中：模型只需要在短 horizon 内相对准确；horizon 之后的收益交给价值函数。策略先验 \(\pi_\theta\) 同时用于 TD target 和规划采样，使优化不必完全从随机动作序列开始。

##### 与 MuZero 的联系和差异

TD-MPC 与 MuZero 都学习不重建观测的潜在模型，也都让模型服务于 reward/value/policy。但 MuZero 面向离散动作和 MCTS，搜索树由 visit count 产生 policy target；TD-MPC 面向连续动作，通过 MPPI/CEM 风格的采样优化产生动作。TD-MPC 也更强调 actor-critic 的 TD 学习，把终端价值函数作为 MPC 的长远补偿。

> 💡 关键：TD-MPC 的世界模型不是“像不像真实世界”，而是“能不能在短 rollout 内给 MPC 排序动作，并用价值函数正确补偿未来”。

#### 🧪 练习题

```yaml
question: "TD-MPC 为什么不使用像素重建损失训练世界模型？"
options:
  - "因为它只能处理低维状态，不能处理图像"
  - "因为像素重建会迫使模型学习大量控制无关细节，TD-MPC 更关注奖励、价值和潜在一致性"
  - "因为 MPC 只能使用真实环境模型"
  - "因为 TD 学习不允许使用 latent 表示"
answer: 1
explain: "TD-MPC 的 TOLD 模型是任务导向的，训练信号来自 reward、TD value 和 latent consistency，而不是重建未来观测。"
```
