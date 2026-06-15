### 梦想家V1 (Dream to Control)

```yaml
id: dreamerv1
name: DreamerV1
full_name: 梦想家V1 (Dream to Control)
year: "2019.12"
org: Google DeepMind
paper_url: "https://arxiv.org/abs/1912.01603"
category: ssm
parent: planet
motivation: "通过潜在想象进行行为学习的Actor-Critic框架"
```

#### 📝 一句话总结

DreamerV1 在 PlaNet 的潜在世界模型上引入 actor-critic 行为学习，通过在 RSSM 潜在空间中想象轨迹并把价值梯度反传给策略，解决了 CEM 在线规划计算昂贵且 horizon 固定的问题。

#### 🎯 核心要点

- **潜在想象 actor-critic**：从 replay 的真实后验状态出发，在 RSSM prior 中生成 imagined trajectories 来训练 actor 和 value
- **价值模型补足长 horizon**：用 \(\lambda\)-return 和 value bootstrap 估计想象 horizon 之外的回报，避免短视规划
- **解析梯度穿过动力学**：连续动作下使用重参数化，让策略梯度穿过动作、RSSM 状态、奖励和价值预测
- **三阶段循环**：学习世界模型、在想象中学习行为、用 actor 与真实环境交互并扩充数据集
- **兼容多种表征学习目标**：论文强调 Dreamer 可以搭配现有潜在动力学学习方法，实际使用 RSSM
- **视觉控制强性能**：在 20 个 DeepMind Control Suite 像素任务上超过 PlaNet、A3C、D4PG 等方法的数据效率和最终表现

#### 🔬 深入细节

##### 核心示意图

![DreamerV1 潜在想象训练](https://ar5iv.labs.arxiv.org/html/1912.01603/assets/x1.png)
*图：Dreamer 从经验数据学习潜在动力学，再在该潜在空间中学习价值和动作模型，最后把动作模型部署到真实环境采集新经验。*

##### 动机与背景

PlaNet 已经证明从像素学习 RSSM 并在潜在空间中规划是可行的，但每个动作都要运行 CEM，推理成本高；同时固定 planning horizon 容易短视，尤其在稀疏奖励或长程任务中。DreamerV1 的核心改动是把“在线搜索动作序列”替换为“离线训练一个 actor”，并用 value model 承接 horizon 之外的回报。

Dreamer 的世界模型仍然包含 representation model、transition model 和 reward model：

$$
\begin{aligned}
\text{posterior: } & q_\theta(s_t \mid s_{t-1}, a_{t-1}, o_t) \\
\text{prior: } & p_\theta(s_t \mid s_{t-1}, a_{t-1}) \\
\text{reward: } & p_\theta(r_t \mid s_t)
\end{aligned}
$$

其中 \(s_t\) 代表紧凑 model state，可包含 RSSM 的确定性与随机部分。posterior 用于从真实序列中推断状态，prior 用于想象未来。

##### 算法伪代码

```python
# DreamerV1: learn world model, then learn actor-critic in latent imagination
initialize_dataset_with_seed_episodes()
initialize(world_model, actor, value)

while not converged:
    for update in range(update_steps):
        seq = sample_sequences(dataset)

        # 1. Dynamics learning
        states = world_model.observe(seq.obs, seq.actions)
        model_loss = reconstruction_loss(seq.obs)
        model_loss += reward_loss(seq.rewards)
        model_loss += kl_loss(posterior_states=states, prior_states=world_model.priors)
        optimize(world_model, model_loss)

        # 2. Behavior learning in imagination
        start_states = stop_gradient(states)
        imagined = rollout_prior(start_states, actor, horizon=H)
        lambda_returns = compute_lambda_returns(imagined.rewards, value(imagined.states))
        optimize(value, regression_loss(value(imagined.states), lambda_returns))
        optimize(actor, -expected_return(lambda_returns))

    # 3. Environment interaction
    collect_episode(lambda obs_history: actor(world_model.filter(obs_history)))
```

##### 价值梯度如何进入 actor

DreamerV1 的行为学习目标是在想象 MDP 中最大化未来奖励。想象轨迹从真实数据推断出的状态 \(s_\tau\) 开始：

$$
s_{t+1} \sim p_\theta(s_{t+1}\mid s_t, a_t), \qquad
a_t \sim q_\phi(a_t \mid s_t), \qquad
\hat r_t = r_\theta(s_t)
$$

为了考虑超过想象 horizon 的收益，Dreamer 使用 value model \(v_\psi(s_t)\) 和 \(\lambda\)-return：

$$
V^\lambda_t
=
\hat r_t
+
\gamma\left(
(1-\lambda)v_\psi(s_{t+1})
+
\lambda V^\lambda_{t+1}
\right)
$$

actor 最大化这些 imagined returns。由于动作分布采用 tanh-transformed Gaussian 并可重参数化，采样动作可以写成确定性函数 \(a_t=f_\phi(s_t,\epsilon)\)，梯度可穿过 actor、RSSM transition、reward model 和 value model：

$$
\nabla_\phi \mathbb{E}[V^\lambda_t]
\approx
\nabla_\phi V^\lambda_t(s_t, a_t, s_{t+1}, \dots)
$$

> 💡 关键：Dreamer 不是用模型生成额外 replay 给无模型算法，而是直接把可微世界模型当成训练策略的计算图。

##### 为什么比 PlaNet 更适合长程任务

PlaNet 每步 CEM 只能优化有限 horizon 内的预测奖励，即使 horizon 加长也会让模型误差和计算成本上升。DreamerV1 的 value model 学习“horizon 之外”的回报，因此 actor 在短想象轨迹中也能获得长程信号。论文中的 horizon 消融显示，有 value model 的 Dreamer 对 imagination horizon 更鲁棒。

此外，actor 学好后执行只需要一次前向推理，不必每步采样和评估大量动作序列。这让 Dreamer 训练和部署都比 PlaNet 更高效，尤其适合需要连续闭环控制的视觉任务。

##### 与无模型 actor-critic 的区别

无模型 actor-critic 从真实 replay 或在线轨迹中学习 TD 目标，价值误差和策略更新都受真实样本数量限制。DreamerV1 在每次参数更新时可以从 replay 状态启动大量潜在想象，得到密集的模型预测奖励和价值梯度。它用模型泛化过去经验，而不是只重放过去经验。

局限在于世界模型误差会影响 imagined return。DreamerV1 通过从真实后验状态启动短 horizon 想象、停止 actor/value 梯度更新世界模型、以及持续用新环境数据更新 RSSM 来控制这种误差。后续 DreamerV2 进一步把连续随机潜变量替换为离散分类潜变量，并引入 KL balancing 来提升 Atari 等离散复杂环境的建模能力。

#### 🧪 练习题

```yaml
question: "DreamerV1 相比 PlaNet 的关键行为学习变化是什么？"
options:
  - "把 RSSM 替换为纯 CNN 视频预测器"
  - "用 actor-critic 在潜在想象轨迹中学习策略和值函数，减少每步在线 CEM 规划"
  - "完全取消世界模型，只保留策略网络"
  - "只在真实环境中用 PPO 训练 actor"
answer: 1
explain: "DreamerV1 继承 PlaNet 的 RSSM，但不再依赖每步 CEM，而是在潜在空间中想象轨迹训练 actor 和 value。"
```
