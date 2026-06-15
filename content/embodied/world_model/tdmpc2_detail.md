### TD-MPC2：时序差分模型预测控制2 (TD-MPC2)

```yaml
id: tdmpc2
name: TD-MPC2
full_name: "时序差分模型预测控制2 (TD-MPC2)"
year: "2024.05"
org: UC San Diego
paper_url: "https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html"
category: planning
parent: tdmpc
motivation: "可扩展鲁棒的连续控制世界模型"
```

#### 📝 一句话总结

TD-MPC2 在 TD-MPC 的任务导向潜在模型和 MPC 框架上加入 SimNorm、离散回归、Q ensemble、最大熵策略先验和多任务 task embedding，使同一套超参数能扩展到 104 个连续控制任务，并训练 317M 参数的多任务世界模型。

#### 🎯 核心要点

- **可扩展隐式世界模型**：继续采用无 decoder 的 latent dynamics，只预测动作、奖励和价值
- **SimNorm latent normalization**：把 latent 投影到多个 simplex，增强稀疏性并缓解梯度爆炸
- **离散 reward/value 回归**：在 \(h\)-transform 空间用 soft cross-entropy 建模奖励和值，提升跨任务稳定性
- **Q ensemble**：训练多个 Q 函数，并用随机子采样的最小值计算 TD target，降低过估计偏差
- **最大熵 policy prior**：替代 TD-MPC 的确定性 policy prior，使任务无关超参数更稳定
- **多任务世界模型**：使用可学习 task embedding、zero padding 和 action mask 适配多 observation/action 空间
- **大规模验证**：覆盖 DMControl、Meta-World、ManiSkill2、MyoSuite 等 104 个在线 RL 任务

#### 🔬 深入细节

##### 架构图

![TD-MPC2 架构](https://arxiv.org/html/2310.16828v2/x3.png)
*图：TD-MPC2 将观测编码为归一化 latent，递归预测动作、奖励和终端价值，不解码未来观测。*

##### 算法伪代码

```python
# TD-MPC2 online training
initialize world_model = {encoder h, dynamics d, reward R, Q ensemble, policy prior pi}
initialize task_embeddings e_task
replay = ReplayBuffer()

while training:
    # 1. 用 MPC 与环境交互
    z = h(obs, e_task)
    action = MPPI_plan(z, d, R, Q_ensemble, pi, action_mask)
    next_obs, reward, done = env.step(action)
    replay.add(obs, action, reward, next_obs, done, task_id)

    # 2. 采样多步轨迹训练隐式世界模型
    batch = replay.sample_uniform()
    z0 = SimNorm(h(batch.obs0, e_task))
    loss = 0
    z = z0
    for k in range(H):
        r_logits = R(z, batch.action[k], e_task)
        q_logits = Q_ensemble(z, batch.action[k], e_task)
        z_next = SimNorm(d(z, batch.action[k], e_task))

        loss += soft_ce(r_logits, h_transform(batch.reward[k]))
        loss += soft_ce(q_logits, td_target_min_two_Q(batch, k))
        loss += latent_consistency(z_next, stopgrad(target_encoder(batch.obs[k+1])))
        z = z_next

    # 3. 最大熵策略先验
    loss += alpha * entropy_loss(pi) - Q_value(pi(z))
    optimizer.step(loss)
```

##### 动机与背景

TD-MPC 已证明“潜在短程模型 + TD 价值 + MPC”在连续控制中有效，但原始版本仍偏向中小规模单任务设置。不同任务的奖励尺度、观测维度、动作空间和动力学复杂度差异很大，导致同一套超参数不够稳；简单扩大模型容量也可能带来梯度不稳定。TD-MPC2 的目标是把 TD-MPC 变成可扩展、鲁棒、适合多任务的世界模型算法。

论文的重点不是推翻 TD-MPC，而是系统性修补其工程和算法脆弱点：latent 需要归一化，reward/value 需要尺度鲁棒，Q target 需要抑制过估计，policy prior 需要跨任务稳定，多任务输入输出需要统一接口。

##### 隐式世界模型与训练目标

TD-MPC2 的基本建模仍是：

$$z_t = h_\theta(s_t, e), \quad z_{t+1}=d_\theta(z_t,a_t,e)$$

$$\hat{r}_t = R_\theta(z_t,a_t,e), \quad \hat{q}_t = Q_\theta(z_t,a_t,e), \quad \hat{a}_t \sim \pi_\theta(z_t,e)$$

其中 \(e\) 是 task embedding。模型目标结合 joint-embedding prediction、reward prediction 和 TD learning：

$$\mathcal{L} =
\sum_{k=0}^{H}\lambda^k
\left[
\mathcal{L}_{\text{repr}}(z_{t+k}, \bar{z}_{t+k})
+ \mathcal{L}_{r}(\hat{r}_{t+k}, r_{t+k})
+ \mathcal{L}_{q}(\hat{q}_{t+k}, y_{t+k})
\right]$$

关键是 \(\mathcal{L}_r\) 和 \(\mathcal{L}_q\) 不再是普通 MSE，而是在 \(h\)-transform 后做离散回归。这类似把一个连续标量投到分桶分布上，用 soft target 交叉熵训练。这样 reward/value 的数值尺度变化不会直接导致梯度爆炸或任务间 loss 不平衡。

##### SimNorm：让 latent 稳定可扩展

TD-MPC2 使用 SimNorm 将 latent 分组投影到 simplex：

$$\mathrm{SimNorm}(x) =
\mathrm{concat}\left(\mathrm{softmax}(x_1/\tau), \ldots, \mathrm{softmax}(x_G/\tau)\right)$$

每组 latent 的元素和为 1。这带来两个效果：一是 latent 范数被约束，降低 recurrent rollout 中的梯度爆炸；二是 softmax 使表示天然稀疏，类似软离散化但仍可微。论文把 SimNorm 视为 TD-MPC2 稳定放大模型容量的关键。

##### 规划：MPPI + policy prior + terminal value

推理仍采用 TD-MPC 的 MPC 形式：

$$J(a_{0:H-1}) =
\sum_{t=0}^{H-1}\gamma^t R_\theta(z_t,a_t,e)
+ \gamma^H Q_\theta(z_H,\pi_\theta(z_H,e),e)$$

MPPI 对动作序列采样、打分、重拟合分布，并执行第一个动作。与 TD-MPC 相比，TD-MPC2 的 policy prior 用最大熵目标训练，因而在不同任务上保持更稳定的探索；规划时还通过 action mask 处理多任务中不同动作维度的合法性。

##### 多任务与大模型

TD-MPC2 的多任务版本把 task embedding 注入 encoder、dynamics、reward、Q 和 policy prior。不同任务的 observation/action 维度通过 padding 统一形状，动作维度通过 mask 避免无效动作参与损失和熵计算。这样，一个 317M 参数模型可以在多个 domain、embodiment 和 action space 上共享世界模型能力。

> 💡 关键：TD-MPC2 的贡献在于把 TD-MPC 从“强单任务算法”推进到“可扩展世界模型系统”：稳定归一化、尺度鲁棒损失、ensemble target、多任务接口缺一不可。

#### 🧪 练习题

```yaml
question: "TD-MPC2 中 SimNorm 的主要作用是什么？"
options:
  - "把连续动作离散化为固定动作集合"
  - "将 latent 表示约束在 simplex 结构中，提高训练稳定性并缓解梯度爆炸"
  - "把奖励函数改为人工规则"
  - "替代 MPC，使模型直接输出最终动作序列"
answer: 1
explain: "SimNorm 对 latent 分组做 softmax simplex 投影，约束表示尺度并引入稀疏性，是 TD-MPC2 稳定扩展模型容量的重要组件。"
```
