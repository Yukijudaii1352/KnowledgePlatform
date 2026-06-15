### 深度规划网络 (Deep Planning Network)

```yaml
id: planet
name: PlaNet
full_name: 深度规划网络 (Deep Planning Network)
year: "2019.06"
org: Google DeepMind
paper_url: "https://proceedings.mlr.press/v97/hafner19a.html"
category: ssm
parent: world_models
motivation: "引入RSSM循环状态空间模型实现像素级规划"
```

#### 📝 一句话总结

PlaNet 提出 Recurrent State-Space Model (RSSM) 和 latent overshooting，用像素观测学习可多步预测的潜在动力学，并通过 CEM 在潜在空间中在线规划动作，显著提升纯模型式强化学习在视觉连续控制任务上的样本效率。

#### 🎯 核心要点

- **RSSM 潜在动力学**：把确定性 RNN 状态 \(h_t\) 与随机潜变量 \(s_t\) 结合，同时保留长时记忆和多未来建模能力
- **像素到潜在规划**：观测模型用于训练表征，规划时只在潜在状态中预测奖励，不生成图像
- **CEM 在线 MPC**：每个环境步采样大量候选动作序列，选取高回报 elite 序列更新高斯分布，并只执行第一个动作
- **latent overshooting**：把一阶 KL 正则推广为多步潜在预测一致性，训练模型在规划 horizon 内保持稳定
- **纯模型式智能体**：不使用策略网络或价值网络，行为完全来自 learned dynamics + online planning
- **视觉控制样本效率**：在 DeepMind Control Suite 像素任务上以远少于 A3C/D4PG 的 episode 数达到接近或更高表现

#### 🔬 深入细节

##### 核心示意图

![PlaNet RSSM 架构](https://planetrl.github.io/assets/fig/rssm.png)
*图：PlaNet 的 RSSM 同时包含确定性路径和随机路径；确定性路径负责记忆，随机状态负责表达不确定性和多种可能未来。*

##### 动机与背景

从像素规划的难点不只是图像维度高，还包括部分可观测、接触动力学、稀疏奖励和多步误差累积。早期基于模型方法通常要么在低维真实状态上规划，要么在像素空间做昂贵的视频预测。PlaNet 的关键问题是：能否学到一个足够紧凑、足够可预测的潜在状态，使规划可以直接在这个空间完成？

PlaNet 的答案是 RSSM。纯 RNN 状态容易给出确定性未来，难以表达多个可能结果；纯随机状态空间模型又难以长期记忆。RSSM 把二者结合：

$$
h_t = f_\theta(h_{t-1}, s_{t-1}, a_{t-1}), \qquad
s_t \sim p_\theta(s_t \mid h_t)
$$

训练时还用 encoder 近似后验：

$$
s_t \sim q_\theta(s_t \mid h_t, o_t)
$$

因此模型在看到图像时可以校正信念，在想象未来时可以只用 prior \(p_\theta(s_t\mid h_t)\) 向前滚动。

##### 算法伪代码

```python
# PlaNet: latent dynamics learning + online planning
initialize_replay_with_random_episodes()
initialize_rssm_encoder_decoder_reward()

while not converged:
    # 1. 模型拟合
    for update in range(model_updates):
        chunk = sample_sequence_chunks(replay)
        posteriors = infer_states_with_encoder(chunk.obs, chunk.actions)
        priors = predict_states_with_rssm(chunk.actions)
        loss = reconstruction_loss(chunk.obs)
        loss += reward_prediction_loss(chunk.rewards)
        loss += kl_one_step(posteriors, priors)
        loss += latent_overshooting_kl(posteriors, priors)
        optimize(loss)

    # 2. 数据采集
    obs = env.reset()
    for t in range(episode_length):
        belief = filter_current_state(history)
        action = cem_plan_in_latent_space(belief, rssm, reward_model)
        obs, reward = env.step(action + exploration_noise)
        replay.add(obs, action, reward)
```

##### 潜在规划：为什么不生成图像

PlaNet 的 observation model \(p(o_t\mid h_t,s_t)\) 是训练信号，但不是规划组件。规划时只需要预测奖励：

$$
\max_{a_{t:t+H}}
\mathbb{E}\left[
\sum_{\tau=t+1}^{t+H}
p_\theta(r_\tau \mid h_\tau, s_\tau)
\right]
$$

这样每个环境步可以评估成千上万个动作序列，而不用为每条序列解码像素。图像解码器的作用是迫使潜变量保留足够环境信息；一旦世界模型学好，CEM 只在低维潜在状态上滚动。

##### CEM 与 MPC

PlaNet 使用 Cross-Entropy Method 搜索动作序列。它维护一个关于未来动作序列的时间相关对角高斯分布，反复采样候选序列、用 RSSM 预测回报、保留 elite 序列、重新拟合均值和方差。最终只执行当前时刻的均值动作，下一帧重新规划：

```python
def cem_plan(belief):
    mean, std = zeros(H, action_dim), ones(H, action_dim)
    for _ in range(num_iterations):
        candidates = sample_normal(mean, std, size=num_candidates)
        returns = rollout_rssm_and_reward(belief, candidates)
        elites = topk(candidates, returns, k=num_elites)
        mean, std = elites.mean(axis=0), elites.std(axis=0)
    return mean[0]
```

> 💡 关键：MPC 的“每步重规划”让模型误差不必长期闭环累积；新观测会通过 encoder 校正当前 belief。

##### latent overshooting

标准序列 VAE 的 KL 项主要训练一步 prior：

$$
D_{\mathrm{KL}}\big(q(s_t\mid o_{\le t}, a_{<t}) \,\|\, p(s_t\mid s_{t-1}, a_{t-1})\big)
$$

但规划需要多步预测准确。latent overshooting 将 prior 多次展开，要求从 \(t-d\) 出发的 \(d\) 步预测也接近 \(t\) 时刻后验：

$$
\mathcal{L}_{\mathrm{over}}
=
\sum_{d=1}^{D}
\beta_d\,
D_{\mathrm{KL}}
\left(
q(s_t \mid o_{\le t}, a_{<t})
\;\|\;
p^{(d)}(s_t \mid s_{t-d}, a_{t-d:t-1})
\right)
$$

这个损失在潜在空间计算，避免了 observation overshooting 需要多次图像解码的昂贵成本。它直接训练“规划时会用到的模型行为”：在没有中间观测纠正时，模型仍能保持合理的多步预测。

##### 与 World Models 的区别

World Models 先学习 \(V\) 和 \(M\)，再训练一个反应式控制器；PlaNet 则把“如何选择动作”交给在线规划器。World Models 的控制器快速但固定，PlaNet 的 CEM 每步搜索，更适合低样本阶段利用模型预测。PlaNet 也把 VAE 和 RNN 统一为 RSSM，使用变分后验进行滤波，比单纯 MDN-RNN 更适合部分可观测控制。

PlaNet 的主要代价是推理时需要大量候选动作序列评估，因此实时性受规划预算影响。DreamerV1 随后把 PlaNet 的 RSSM 保留下来，但用 actor-critic 在潜在想象中学习一个策略，避免每步 CEM 搜索。

#### 🧪 练习题

```yaml
question: "PlaNet 在执行规划时为什么不需要生成未来图像？"
options:
  - "因为 PlaNet 只处理低维状态输入"
  - "因为 observation model 只用于训练潜变量，规划时 RSSM 和 reward model 可直接在潜在空间预测回报"
  - "因为 CEM 不能处理图像输入"
  - "因为 latent overshooting 会替代所有奖励预测"
answer: 1
explain: "PlaNet 通过图像重建学习信息充足的潜变量，但在线规划只滚动潜在状态并累加奖励预测，因此避免了昂贵的像素生成。"
```
