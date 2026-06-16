---
domain: embodied
topic_id: world_model
topic_name: 世界模型
page_icon: 🌍
page_title: 世界模型 算法总结
page_subtitle: '{build_date} 版'
page_desc: 从早期状态空间模型到生成式视频世界模型，涵盖物理世界建模、时空预测与基于模型的规划的完整演化历程。
hero_pills:
- 物理仿真
- 时空预测
count_pill: '{count} 个算法'
categories:
  ssm:
    label: 状态空间世界模型
    color: '#22a06b'
  predictive:
    label: 预测表征学习
    color: '#1f77b4'
  generative:
    label: 生成式世界模型
    color: '#ff7f0e'
  physics:
    label: 物理世界建模
    color: '#9467bd'
  planning:
    label: 基于模型的规划
    color: '#d62728'
  embodied:
    label: 具身智能应用
    color: '#17becf'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/embodied/world_model/overview/zhihu__arXiv：面向具身智能的世界模型综述__b4ac9113/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/embodied/world_model/latest/zhihu__【具身智能】2025~2026.3具身操作相关工作整理(2)_世界模型__ffa50ec9/article.md

## 算法演化关系

```yaml
nodes:
- id: world_models
  x: 2018.03
  y: 0
  category: ssm
- id: planet
  x: 2019.06
  y: 0
  category: ssm
- id: dreamerv1
  x: 2019.12
  y: 0
  category: ssm
- id: dreamerv2
  x: 2020.1
  y: 0
  category: ssm
- id: dreamerv3
  x: 2023.01
  y: 0
  category: ssm
- id: dreamer4
  x: 2025.09
  y: 0
  category: ssm
- id: jepa
  x: 2022.06
  y: 1
  category: predictive
- id: ijepa
  x: 2023.06
  y: 1
  category: predictive
- id: vjepa
  x: 2024.04
  y: 1
  category: predictive
- id: vjepa2
  x: 2025.06
  y: 1
  category: predictive
- id: vjepa21
  x: 2026.02
  y: 1
  category: predictive
- id: videogpt
  x: 2021.04
  y: 2
  category: generative
- id: teco
  x: 2023.07
  y: 2
  category: generative
- id: gaia1
  x: 2023.1
  y: 2
  category: generative
- id: genie
  x: 2024.02
  y: 2
  category: generative
- id: sora
  x: 2024.02
  y: 2
  category: generative
- id: genie2
  x: 2024.12
  y: 2
  category: generative
- id: gaia3
  x: 2026.03
  y: 2
  category: generative
- id: deltaworld
  x: 2026.04
  y: 2
  category: generative
- id: worldreel
  x: 2026.03
  y: 2
  category: generative
- id: occsora
  x: 2026.02
  y: 2
  category: generative
- id: astra
  x: 2026.01
  y: 2
  category: generative
- id: interaction_networks
  x: 2016.12
  y: 3
  category: physics
- id: vin
  x: 2017.12
  y: 3
  category: physics
- id: hnn
  x: 2019.12
  y: 3
  category: physics
- id: lnn
  x: 2020.03
  y: 3
  category: physics
- id: gns
  x: 2020.07
  y: 3
  category: physics
- id: roboscape
  x: 2026.01
  y: 3
  category: physics
- id: newton
  x: 2026.03
  y: 3
  category: physics
- id: mbpo
  x: 2019.12
  y: 4
  category: planning
- id: simple
  x: 2020.04
  y: 4
  category: planning
- id: muzero
  x: 2020.12
  y: 4
  category: planning
- id: tdmpc
  x: 2022.06
  y: 4
  category: planning
- id: iris
  x: 2023.05
  y: 4
  category: planning
- id: tdmpc2
  x: 2024.05
  y: 4
  category: planning
- id: jumpy_wm
  x: 2026.02
  y: 4
  category: planning
- id: rlvr_world
  x: 2026.01
  y: 4
  category: planning
- id: unidrive_wm
  x: 2026.01
  y: 5
  category: embodied
- id: resim
  x: 2026.02
  y: 5
  category: embodied
- id: navthinker
  x: 2026.03
  y: 5
  category: embodied
- id: gen1
  x: 2026.04
  y: 5
  category: embodied
- id: xwam
  x: 2026.04
  y: 5
  category: embodied
- id: vagen
  x: 2026.03
  y: 5
  category: embodied
- id: mindjourney
  x: 2026.03
  y: 5
  category: embodied
- id: chatvla2
  x: 2026.03
  y: 5
  category: embodied
edges:
- from: world_models
  to: planet
  label: 引入RSSM
- from: planet
  to: dreamerv1
  label: 潜在想象
- from: dreamerv1
  to: dreamerv2
  label: 离散潜变量
- from: dreamerv2
  to: dreamerv3
  label: 跨域通用
- from: dreamerv3
  to: dreamer4
  label: 规模扩展
- from: jepa
  to: ijepa
  label: 图像掩码
- from: ijepa
  to: vjepa
  label: 视频扩展
- from: vjepa
  to: vjepa2
  label: 机器人规划
- from: vjepa2
  to: vjepa21
  label: 规模提升
- from: videogpt
  to: teco
  label: 时空一致
- from: videogpt
  to: gaia1
  label: 驾驶场景
- from: videogpt
  to: genie
  label: 交互环境
- from: videogpt
  to: sora
  label: 物理直觉
- from: genie
  to: genie2
  label: 3D实时
- from: gaia1
  to: gaia3
  label: 长尾场景
- from: genie2
  to: deltaworld
  label: 增量编码
- from: sora
  to: worldreel
  label: 几何一致
- from: sora
  to: occsora
  label: 占据栅格
- from: sora
  to: astra
  label: 自回归去噪
- from: interaction_networks
  to: vin
  label: 视觉输入
- from: interaction_networks
  to: hnn
  label: 能量守恒
- from: hnn
  to: lnn
  label: 约束系统
- from: vin
  to: gns
  label: GNN模拟
- from: gns
  to: roboscape
  label: 物理先验
- from: gns
  to: newton
  label: 物理引擎
- from: mbpo
  to: simple
  label: 样本效率
- from: mbpo
  to: muzero
  label: MCTS搜索
- from: muzero
  to: tdmpc
  label: TD+MPC
- from: muzero
  to: iris
  label: Trans建模
- from: tdmpc
  to: tdmpc2
  label: 可扩展性
- from: tdmpc2
  to: jumpy_wm
  label: 跳跃动力学
- from: iris
  to: rlvr_world
  label: RL微调
- from: gaia3
  to: unidrive_wm
  label: 统一架构
- from: gaia3
  to: resim
  label: 闭环仿真
- from: vjepa21
  to: navthinker
  label: 社交导航
- from: vjepa21
  to: gen1
  label: 通用操作
- from: vjepa21
  to: vagen
  label: VLM推理
- from: vjepa21
  to: mindjourney
  label: 空间推理
- from: vjepa21
  to: chatvla2
  label: 开放世界
- from: worldreel
  to: xwam
  label: 动作建模
- from: dreamerv3
  to: vjepa
  label: 预测表征
- from: jepa
  to: genie
  label: 生成架构
- from: gns
  to: roboscape
  label: 具身场景
- from: dreamerv3
  to: iris
  label: 世界模型RL
milestones:
- dreamerv3
- jepa
- genie2
```

## 核心算法

### World Models

```yaml
id: world_models
num: 1
name: World Models
full_name: 世界模型 (World Models)
year: '2018.03'
org: Google Brain
parent: —
paper_url: https://arxiv.org/abs/1803.10122
project_url: ''
category: ssm
motivation: 首次展示智能体可在自身生成的梦境中学习策略
```

#### 📝 一句话总结
World Models 提出把智能体拆成视觉压缩器 V、时序预测器 M 和轻量控制器 C，先用无监督方式学习环境的潜在动力学，再让控制器在真实环境或模型生成的“梦境”中学习策略，证明紧凑世界模型可以显著降低强化学习的搜索难度。

#### 🎯 核心要点
- **三模块架构**：VAE 视觉模型 \(V\) 压缩像素帧，MDN-RNN 记忆模型 \(M\) 预测未来潜变量，线性控制器 \(C\) 根据 \([z_t, h_t]\) 输出动作
- **无监督世界模型训练**：先用随机策略收集轨迹，只用观察和动作训练 \(V\) 与 \(M\)，奖励只用于后续优化控制器
- **混合密度时序预测**：\(M\) 输出下一潜变量的高斯混合分布，能表达随机环境中的多种未来
- **梦境中学习策略**：在 VizDoom 中用 MDN-RNN 与 VAE 解码器构造可交互的 hallucinated environment，并在其中训练控制器再迁移到真实环境
- **极小控制器**：CarRacing 中控制器只有 867 个参数，便于用 CMA-ES 等黑盒优化方法稳定搜索
- **温度调节与不确定性**：通过 MDN 采样温度控制梦境环境的随机性，过低会被策略利用，适中温度提升迁移稳定性

#### 🔬 深入细节
##### 核心示意图

![World Models 的 V-M-C 架构](https://ar5iv.labs.arxiv.org/html/1803.10122/assets/x1.png)
*图：智能体由 Vision、Memory、Controller 三部分构成；复杂感知和预测能力放在世界模型中，控制器保持尽量简单。*

##### 动机与背景

传统深度强化学习常把感知、记忆和控制都塞进一个端到端策略网络里，导致奖励稀疏、信用分配困难和样本效率低。World Models 的切入点是：环境中大量结构可以不依赖奖励而通过观察学习到，策略优化只需要在一个更小、更抽象的空间中做决策。

论文把“世界模型”具体化为两个可微生成模型。视觉模型 \(V\) 学会把 \(64\times64\) RGB 图像压缩为低维潜变量 \(z_t\)，记忆模型 \(M\) 学会根据过去潜变量、动作和 RNN 隐状态预测未来潜变量分布。控制器不直接看像素，而是读出当前压缩状态 \(z_t\) 和记忆状态 \(h_t\)，因此动作选择可以写成一个简单线性映射：

$$
a_t = W_c [z_t, h_t] + b_c
$$

这种分工的关键价值在于把高维表征学习从强化学习目标中剥离出来。\(V\) 和 \(M\) 可以用标准反向传播快速训练，而 \(C\) 参数很少，可以用 CMA-ES 在真实环境或模型环境中搜索。

##### 算法流程

```python
# World Models 的训练与控制流程
collect_random_rollouts()

# 1. 训练视觉模型 V
for image_batch in replay_images:
    z = VAE.encoder(image_batch)
    reconstruction = VAE.decoder(z)
    optimize(reconstruction_loss + kl_regularizer)

# 2. 训练记忆模型 M
for sequence in replay_sequences:
    z_t = VAE.encoder(o_t)
    params = MDN_RNN(z_t, a_t, h_t)
    optimize(-log_prob_mixture(params, z_{t+1}))

# 3. 训练控制器 C
for candidate_controller in CMA_ES.population:
    rollout_return = rollout(lambda z, h: W @ concat(z, h) + b)
    CMA_ES.update(candidate_controller, rollout_return)
```

##### V：从像素到潜变量

VAE 的目标是把每一帧图像编码为潜变量分布 \(q_\phi(z_t \mid o_t)\)，并通过解码器重建图像。训练目标是标准 VAE 证据下界的负号：

$$
\mathcal{L}_V
=
\mathbb{E}_{q_\phi(z_t \mid o_t)}
[-\log p_\theta(o_t \mid z_t)]
+
D_{\mathrm{KL}}\big(q_\phi(z_t \mid o_t)\,\|\,p(z_t)\big)
$$

直觉上，\(z_t\) 不需要保留每个像素细节，只需要保留足以重建任务场景的主要空间结构。CarRacing 中，这让道路、车身位置和弯道形状进入低维状态；VizDoom 中，它压缩走廊、火球和敌人等视觉信息。

##### M：用 MDN-RNN 预测未来

记忆模型 \(M\) 是一个 RNN，输入当前潜变量 \(z_t\)、动作 \(a_t\) 和隐状态 \(h_t\)，输出下一潜变量 \(z_{t+1}\) 的高斯混合分布：

$$
p(z_{t+1}\mid z_t, a_t, h_t)
=
\sum_{k=1}^{K} \pi_k
\mathcal{N}(z_{t+1}; \mu_k, \Sigma_k)
$$

高斯混合不是装饰，而是解决“未来不唯一”的核心机制。同一个当前画面和动作可能对应多个未来，例如转弯后的赛道形状、敌人是否发射火球等。MDN-RNN 通过混合分量表达这些可能性，采样温度 \(\tau\) 则控制生成环境的随机程度。

##### C：小控制器与梦境训练

控制器 \(C\) 只接收 \(z_t\) 和 \(h_t\)。在 CarRacing 中，加入 \(M\) 的隐状态后，控制器能根据未来道路趋势做更稳定的转向；只看 \(z_t\) 时车会出现明显摇摆。论文报告完整 \(V+M+C\) 在 CarRacing-v0 上达到平均 906 分，超过当时常见深度 RL 基线。

更具标志性的实验是 VizDoom。作者先训练世界模型模拟游戏环境，再把控制器放入梦境环境中训练。训练出的策略可以迁移回真实 VizDoom，并且在适当温度下避免利用模型缺陷：

> 💡 关键：World Models 不是把模型当成辅助特征，而是让模型本身成为可交互环境，策略可以在其中获得大量低成本经验。

##### 与传统模型式强化学习的区别

World Models 与经典 Dyna 或 MPC 方法不同。它并不要求模型在原始状态空间精确预测所有细节，也不在每一步做显式规划；它学习一个潜在生成模型，再让一个简单策略直接在该潜在状态上行动。这让它更像“学会可用于控制的内部表征”，而不是“学会一个完美仿真器”。

局限也很清楚：\(V\) 和 \(M\) 分开训练，控制目标不能反向影响表征；MDN-RNN 的长时程一致性有限，梦境环境也可能被策略钻空子。后续 PlaNet 和 Dreamer 系列正是在这个基础上，把 RSSM、潜在规划、actor-critic 想象训练和更稳定的训练目标逐步引入。

#### 🧪 练习题
```yaml
question: "World Models 中控制器 C 为什么可以设计得很小？"
options:
  - "因为环境奖励已经被 VAE 直接预测出来"
  - "因为 V 和 M 已经把像素和历史压缩成当前与未来相关的潜在状态"
  - "因为 CMA-ES 只能优化线性模型，不能优化神经网络"
  - "因为论文只处理离散动作空间"
answer: 1
explain: "VAE 提供当前视觉摘要，MDN-RNN 的隐状态提供历史和未来预测信息，控制器只需在压缩状态上做动作映射，因此参数可以很少。"
```

### PlaNet

```yaml
id: planet
num: 2
name: PlaNet
full_name: 深度规划网络 (Deep Planning Network)
year: '2019.06'
org: Google DeepMind
parent: world_models
paper_url: https://proceedings.mlr.press/v97/hafner19a.html
project_url: ''
category: ssm
motivation: 引入RSSM循环状态空间模型实现像素级规划
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

### DreamerV1

```yaml
id: dreamerv1
num: 3
name: DreamerV1
full_name: 梦想家V1 (Dream to Control)
year: '2019.12'
org: Google DeepMind
parent: planet
paper_url: https://arxiv.org/abs/1912.01603
project_url: ''
category: ssm
motivation: 通过潜在想象进行行为学习的Actor-Critic框架
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

### DreamerV2

```yaml
id: dreamerv2
num: 4
name: DreamerV2
full_name: 梦想家V2 (Mastering Atari)
year: '2020.10'
org: Google DeepMind
parent: dreamerv1
paper_url: https://arxiv.org/abs/2010.02193
project_url: ''
category: ssm
motivation: 引入离散潜在变量首次在Atari达到人类水平
```

#### 📝 一句话总结
DreamerV2 将 Dreamer 的 RSSM 随机状态改为多个分类变量，并加入 straight-through 梯度、KL balancing 和 discount predictor，使智能体首次能只在单独训练的世界模型内部学习策略并在 55 个 Atari 游戏上达到人类水平。

#### 🎯 核心要点
- **离散 RSSM 潜变量**：用多个 categorical variables 替代 DreamerV1 的高斯随机状态，更适合 Atari 中离散、符号化和多模态变化
- **straight-through estimator**：前向采样 one-hot 离散状态，反向用 softmax 概率传递梯度，保持可微训练
- **KL balancing**：对 prior 学习和 posterior 正则化施加不同梯度权重，避免未训练好的 prior 过早压制表示能力
- **discount predictor**：显式预测 episode continuation，用于想象中处理终止概率和 Atari 生命/结束信号
- **纯世界模型行为学习**：actor-critic 只在固定世界模型的潜在预测中训练，证明模型足够准确可支撑高性能策略
- **Atari 里程碑**：在 200M frames、单 GPU 设置下超过 Rainbow 和 IQN 等强单 GPU model-free 基线

#### 🔬 深入细节
##### 核心示意图

![DreamerV2 离散世界模型](https://ar5iv.labs.arxiv.org/html/2010.02193/assets/x2.png)
*图：DreamerV2 的世界模型用 CNN 编码图像，用 RSSM 维护确定性状态 \(h_t\) 与离散随机状态 \(z_t\)，posterior 看当前图像，prior 只根据历史和动作预测。*

##### 动机与背景

DreamerV1 在连续控制视觉任务上表现强，但 Atari 长期被认为更考验模型式方法：游戏包含离散事件、对象出现/消失、得分突变、终止条件和高随机性。过去 Atari 世界模型常能生成看似合理的画面，却不足以让策略在模型里学到人类水平行为。

DreamerV2 的核心假设是：对于 Atari 这类离散环境，连续高斯潜变量并不是最自然的表示。论文将随机潜变量设计为 \(32\) 个 categorical，每个 categorical 有 \(32\) 个类别，组合后形成高容量但离散的 latent code。模型状态仍由确定性 GRU 状态与随机状态拼接：

$$
s_t = (h_t, z_t), \qquad z_t \in \{0,1\}^{32\times 32}
$$

##### 算法伪代码

```python
# DreamerV2 world model + imagined actor-critic
for batch in replay_sequences:
    embed = cnn_encoder(batch.images)
    posterior = q_theta(z_t | h_t, embed_t)
    prior = p_theta(z_t | h_t)
    z_t = straight_through_sample(posterior.logits)
    h_{t+1} = gru(h_t, z_t, action_t)

    model_loss = image_nll(decoder(h_t, z_t), batch.images)
    model_loss += reward_nll(reward_head(h_t, z_t), batch.rewards)
    model_loss += discount_nll(discount_head(h_t, z_t), batch.discounts)
    model_loss += kl_balance(posterior, prior, alpha)
    optimize(world_model, model_loss)

for start in posterior_states:
    imagined = rollout_prior_with_actor(start, horizon=H)
    lambda_returns = compute_lambda_returns(
        imagined.rewards, imagined.discounts, critic(imagined.states)
    )
    optimize(critic, loss_to_targets(lambda_returns))
    optimize(actor, actor_objective(lambda_returns))
```

##### 离散潜变量与 straight-through 梯度

直接采样 one-hot 离散变量不可微。DreamerV2 使用 straight-through estimator，把前向值设为采样结果，但反向梯度当作 softmax 概率：

```python
sample = one_hot(draw(logits))       # forward: 离散 one-hot
probs = softmax(logits)              # backward: 连续概率梯度
z = sample + probs - stop_gradient(probs)
```

直觉上，这让模型在前向预测时真的使用离散状态，避免训练/推理不一致；反向传播时又能像连续分布一样更新 logits。相比高斯 latent，categorical latent 更容易表示“球在左/右”“敌人出现/未出现”“奖励事件发生/未发生”等离散因素。

##### KL balancing

RSSM 的 ELBO 里 KL 项有双重角色：训练 prior 追 posterior，也把 posterior 正则到 prior。如果 prior 还很差，强行把 posterior 拉向 prior 会削弱表征学习。DreamerV2 将 KL 梯度拆成两部分：

$$
\mathcal{L}_{\mathrm{KL}}
=
\alpha\,D_{\mathrm{KL}}(\mathrm{sg}(q_\theta) \,\|\, p_\theta)
+
(1-\alpha)\,D_{\mathrm{KL}}(q_\theta \,\|\, \mathrm{sg}(p_\theta))
$$

第一项主要训练 prior，第二项主要约束 posterior。通过设置 \(\alpha\) 更偏向 prior 学习，模型先学会预测 posterior 聚合分布，而不是过早牺牲图像和奖励信息。

> 💡 关键：KL balancing 不是简单减小 KL 系数，而是改变 KL 对 prior 与 posterior 两边的学习速度。

##### 行为学习与终止建模

DreamerV2 的 actor-critic 延续 DreamerV1：世界模型固定，actor 和 critic 在潜在想象中训练。不同的是，它加入 discount predictor \(\gamma_t\)，让 imagined return 能处理 episode 结束：

$$
V^\lambda_t
=
\hat r_t
+
\hat\gamma_t\left((1-\lambda)v(s_{t+1})+\lambda V^\lambda_{t+1}\right)
$$

这对 Atari 很重要，因为许多游戏的生命、回合或终止状态会改变未来回报。discount predictor 让模型不仅预测“会得到什么奖励”，还预测“这个想象轨迹还能继续多久”。

##### 与 DreamerV1 的区别

DreamerV1 已经把 PlaNet 的 CEM 替换为潜在 actor-critic，DreamerV2 则主要增强世界模型本身。离散 latent 让表示更贴合 Atari 的结构，KL balancing 稳定 prior 学习，discount head 支持终止预测。论文强调策略学习与世界模型分开：世界模型先从 replay 学习，actor/critic 的梯度不更新世界模型，这使“策略完全在模型内部学会”成为对世界模型质量的强检验。

局限是 DreamerV2 仍需要对不同领域调整一些训练设置，且图像重建仍会消耗容量建模任务无关细节。DreamerV3 后续主要解决跨领域固定超参数、奖励尺度不一致和鲁棒归一化问题。

#### 🧪 练习题
```yaml
question: "DreamerV2 中 KL balancing 的主要目的是什么？"
options:
  - "让图像解码器完全不参与训练"
  - "使 prior 更快追上 posterior，同时避免 posterior 被差的 prior 过早压制"
  - "把离散潜变量改回连续高斯变量"
  - "用环境真实状态替代像素输入"
answer: 1
explain: "KL balancing 通过 stop-gradient 将 KL 对 prior 和 posterior 的作用拆开，鼓励 prior 学习而不过早牺牲 posterior 表示能力。"
```

### DreamerV3

```yaml
id: dreamerv3
num: 5
name: DreamerV3
full_name: 梦想家V3 (Mastering Diverse Domains)
year: '2023.01'
org: Google DeepMind
parent: dreamerv2
paper_url: https://arxiv.org/abs/2301.04104
project_url: ''
category: ssm
motivation: 固定超参数实现跨领域通用性首次在MC收集钻石
```

#### 📝 一句话总结
DreamerV3 在 DreamerV2 的离散世界模型和潜在 actor-critic 上加入 symlog 预测、free bits、two-hot critic 与鲁棒 return 归一化，使同一套超参数能跨连续控制、Atari、DMLab、Crafter 和 Minecraft 等多领域工作，并首次从零在 Minecraft 收集钻石。

#### 🎯 核心要点
- **固定超参数跨领域**：同一算法覆盖连续/离散动作、视觉/低维输入、稠密/稀疏奖励、2D/3D 环境和不同数据预算
- **symlog / symexp 变换**：对观测、奖励和值预测压缩大尺度信号，同时保留零附近近似线性
- **free bits + KL balancing**：把 dynamics loss 和 representation loss 低于 1 nat 的部分裁掉，避免过度正则化表示
- **two-hot 离散回归**：reward 和 critic 用 symlog 后的离散桶分布预测连续值，加快稀疏/多峰回报学习
- **鲁棒 actor 目标**：只缩小大 return，不放大小 return 噪声，让固定 entropy regularizer 能适配多奖励尺度
- **可扩展性实验**：模型规模从 8M 到 200M，规模增大带来更高数据效率和最终性能

#### 🔬 深入细节
##### 核心示意图

![DreamerV3 世界模型学习](https://ar5iv.labs.arxiv.org/html/2301.04104/assets/x3.png)
*图：DreamerV3 的世界模型把输入编码为离散表示，RSSM 根据动作预测未来表示，并通过重建、奖励和 continuation 预测获得学习信号。*

![DreamerV3 actor-critic 想象学习](https://ar5iv.labs.arxiv.org/html/2301.04104/assets/x4.png)
*图：actor 和 critic 在世界模型预测出的抽象状态轨迹中学习，二者的梯度不反向更新世界模型。*

##### 动机与背景

DreamerV2 已经在 Atari 上展示了离散世界模型的能力，但强化学习算法常常需要为不同领域重新调奖励尺度、KL 权重、entropy 权重和网络规模。DreamerV3 的目标不是只刷新某个 benchmark，而是让世界模型 RL 成为“拿来就能用”的通用算法。

跨领域困难集中在信号尺度。Minecraft 稀疏奖励和长 horizon 与 Control Suite 稠密奖励差异极大，像素输入和低维输入的 reconstruction loss 规模也不同。如果直接用 MSE 回归大值，梯度容易爆炸；如果做运行归一化，又会引入非平稳目标。DreamerV3 用 symlog 统一处理：

$$
\mathrm{symlog}(x)=\mathrm{sign}(x)\log(|x|+1),
\qquad
\mathrm{symexp}(x)=\mathrm{sign}(x)(\exp(|x|)-1)
$$

它压缩大正值和大负值，但在零附近近似恒等，因而不会破坏小尺度任务。

##### 算法伪代码

```python
# DreamerV3 training loop
for seq in replay:
    # 1. world model
    states = rssm.observe(symlog_inputs(seq.obs), seq.actions)
    pred_loss = decoder_loss(states, symlog_inputs(seq.obs))
    pred_loss += twohot_reward_loss(states, seq.rewards)
    pred_loss += continue_binary_loss(states, seq.continues)

    dyn_loss = max(1.0, kl(stop_grad(states.posterior), states.prior))
    rep_loss = max(1.0, kl(states.posterior, stop_grad(states.prior)))
    optimize(world_model, pred_loss + beta_dyn * dyn_loss + beta_rep * rep_loss)

    # 2. actor critic in imagination
    imagined = rollout_prior(states, actor, horizon=H)
    returns = lambda_returns(imagined.rewards, imagined.continues, critic)
    optimize(critic, twohot_symlog_loss(critic(imagined.states), returns))
    scaled_returns = scale_down_large_returns(returns)
    optimize(actor, -scaled_returns - entropy_bonus(actor))
```

##### 世界模型：free bits 与稳定 KL

DreamerV3 仍使用离散 RSSM。世界模型损失分为 prediction loss、dynamics loss 和 representation loss。dynamics loss 训练 prior 预测 posterior，representation loss 让 posterior 在包含足够信息的同时保持可预测：

$$
\mathcal{L}_{\mathrm{dyn}}
=
\max\left(1, D_{\mathrm{KL}}(\mathrm{sg}(q)\,\|\,p)\right),
\quad
\mathcal{L}_{\mathrm{rep}}
=
\max\left(1, D_{\mathrm{KL}}(q\,\|\,\mathrm{sg}(p))\right)
$$

这里的 \(1\) nat free bits 表示：当 KL 已经足够小时，不再继续惩罚。这样能防止模型为了让 latent 更容易预测而丢掉任务相关信息，也避免复杂 3D 视觉和简单 2D 游戏需要不同正则强度。

##### critic：two-hot symlog 回归

直接让 critic 用 MSE 拟合 return 的期望，会在稀疏奖励任务里学习很慢。DreamerV3 先把 return 做 symlog，再映射到两个相邻离散桶的 soft label，即 two-hot 编码。critic 输出桶分布，训练目标是交叉熵：

$$
\mathcal{L}_{V}
=
-\sum_i \mathrm{twohot}_i(\mathrm{symlog}(R^\lambda))
\log p_\psi(i\mid s_t)
$$

输出值则通过桶值期望再 symexp 回原尺度。这相当于让 critic 保持一个粗粒度分布，比单点回归更容易处理稀疏、双峰或长尾回报。

##### actor：跨奖励尺度的归一化

策略目标需要 entropy regularizer，但 entropy 权重对奖励尺度极敏感。DreamerV3 的做法不是把所有 return 标准化到单位方差，因为稀疏奖励下这会把近零噪声放大，导致策略过早确定。它只“缩小大的 return”，不“放大小的 return”，例如用 batch 的 5% 到 95% 分位范围作为尺度并设置最小阈值。

> 💡 关键：DreamerV3 的泛化性主要来自一系列尺度处理细节，而不是单个新网络结构。

##### 结果与意义

论文在超过 150 个任务上评估 DreamerV3，包括 Control Suite、Atari 100k/200M、BSuite、Crafter、DMLab 和 Minecraft。最受关注的是 Minecraft：在没有人类数据或手工课程的情况下，DreamerV3 从零探索并收集钻石，说明潜在世界模型可以支撑极长 horizon、稀疏奖励和开放世界任务。

与 DreamerV2 相比，DreamerV3 的技术路线更像“鲁棒工程化的世界模型 RL”：保留离散 RSSM 和想象 actor-critic，但把输入/输出尺度、KL 下限、critic 表示和 actor 归一化都设计成跨任务稳定。Dreamer 4 后续则进一步把重点转向可扩展 Transformer 世界模型、离线视频数据和模型内部的长程想象训练。

#### 🧪 练习题
```yaml
question: "DreamerV3 中 symlog 变换的主要作用是什么？"
options:
  - "把所有动作空间都变成离散动作"
  - "压缩大尺度正负信号，同时保留零附近近似线性，从而稳定跨领域预测"
  - "替代 RSSM 中的 recurrent state"
  - "让模型不再需要 replay buffer"
answer: 1
explain: "symlog 对大幅值奖励、值和输入进行对数压缩，避免梯度尺度失控；零附近近似恒等，因此小信号不会被破坏。"
```

### Dreamer 4

```yaml
id: dreamer4
num: 6
name: Dreamer 4
full_name: 梦想家4 (Scalable World Models)
year: '2025.09'
org: Google DeepMind
parent: dreamerv3
paper_url: https://arxiv.org/abs/2509.24527
project_url: ''
category: ssm
motivation: 扩展模型规模增强长时程记忆与复杂任务想象
```

#### 📝 一句话总结
Dreamer 4 提出基于 causal tokenizer、interactive dynamics Transformer 与 shortcut forcing 的可扩展世界模型，让智能体能在快速、高保真模型内部通过离线想象训练学习 Minecraft 长程任务，并首次仅凭离线数据获得钻石。

#### 🎯 核心要点
- **三阶段训练**：世界模型预训练、带任务输入的 agent finetuning、在世界模型中进行 imagination training
- **causal tokenizer**：把视频帧压缩为连续 latent tokens，并用时间因果注意力支持逐帧交互式解码
- **interactive dynamics Transformer**：在动作、噪声水平、步长和 latent 表示交织序列上建模未来
- **shortcut forcing objective**：结合 diffusion forcing 与 shortcut models，用少量采样步实现实时交互推理并降低长视频误差累积
- **离线 Minecraft diamond challenge**：仅使用固定 VPT contractor 数据集，不进行环境交互，仍能通过想象 RL 改进行为
- **少量 action grounding**：世界模型可从大量无动作视频学习视觉知识，只需少量动作标注视频学习动作条件化

#### 🔬 深入细节
##### 核心示意图

![Dreamer 4 离线 Minecraft 结果](https://danijar.com/asset/dreamer4/benchmark.png)
*图：Dreamer 4 项目页展示的离线 Minecraft 里程碑结果；论文 Figure 2 的架构图描述了 causal tokenizer 与 interactive dynamics 两个模块。*

> ⚠️ 注意：YAML 中的 arXiv 论文可下载，但当前 ar5iv/html 转换不可用；本文依据 arXiv PDF、摘要和作者项目页公开资料整理，并使用项目页可访问图片作为示意图。

##### 动机与背景

DreamerV3 的 RSSM 世界模型在多领域 RL 中非常稳健，但它仍主要面向相对窄的交互分布。Dreamer 4 面对的是更接近通用视频世界模型的问题：Minecraft 有复杂物体交互、长时间记忆、UI 操作、工具使用和超过 20,000 个鼠标键盘动作的任务链。模型不仅要预测画面，还要让策略能在其中训练。

论文指出，通用视频模型虽然规模大，但通常生成慢、交互动作条件弱，难以作为训练智能体的神经仿真器。Dreamer 4 因此采用高容量 Transformer 世界模型，同时针对交互式 rollout 做速度和稳定性设计。

##### 算法伪代码

```python
# Dreamer 4 三阶段训练
# Phase 1: World model pretraining
train_tokenizer(videos, loss=mse + 0.2 * lpips, patch_dropout=True)
z = tokenizer.encode(videos)
train_dynamics_transformer(
    tokens=z,
    actions=optional_actions,
    objective=shortcut_forcing_loss
)

# Phase 2: Agent finetuning
insert_task_tokens(dynamics_transformer)
train_policy_and_reward_heads(
    task_conditioned_sequences,
    loss=multi_token_action_nll + multi_token_reward_nll + video_prediction_loss
)

# Phase 3: Imagination training
freeze_world_model_transformer()
for context in offline_dataset:
    imagined = rollout_world_model(context, policy_head, K_sampling_steps=4)
    rewards = reward_head(imagined.states)
    lambda_returns = td_lambda(rewards, value_head(imagined.states))
    optimize(value_head, twohot_value_loss(lambda_returns))
    optimize(policy_head, pmpo_loss(lambda_returns, behavioral_prior))
```

##### causal tokenizer

tokenizer 负责把原始视频压缩成 dynamics model 可处理的连续表示。它由 encoder、瓶颈和 decoder 组成，时间维度上保持因果性，因此可以在交互推理时逐帧编码和解码。训练使用 masked autoencoding：

$$
\mathcal{L}_{\mathrm{tok}}
=
\mathcal{L}_{\mathrm{MSE}}
+
0.2\,\mathcal{L}_{\mathrm{LPIPS}}
$$

patch dropout 概率随机采样，促使 latent 学到空间一致表示。与 DreamerV3 的离散 RSSM 不同，Dreamer 4 更像把视频压缩成连续 token，再让大 Transformer 学习这些 token 的动作条件化动态。

##### shortcut forcing 与 interactive dynamics

Dreamer 4 的 dynamics model 建在 flow matching、diffusion forcing 和 shortcut models 之上。普通 flow matching 训练网络从噪声数据 \(x_\tau\) 预测指向干净数据的速度：

$$
x_\tau = (1-\tau)x_0+\tau x_1,
\qquad
\mathcal{L}=\|f_\theta(x_\tau,\tau)-(x_1-x_0)\|^2
$$

shortcut models 进一步把步长 \(d\) 输入网络，让模型学会用较大步长直接逼近多个小步的结果。Dreamer 4 将其用于序列 latent dynamics，并偏向 **x-prediction**：直接预测干净表示 \(z_1\)，而不是预测高频速度项。这能减少逐帧生成长视频时的误差累积。

论文还提出 ramp loss weight：

$$
w(\tau)=0.9\tau+0.1
$$

低信号水平更接近纯噪声，学习信号弱；较高 \(\tau\) 处更接近真实 latent，权重更大可让容量集中到对交互 rollout 更有用的区域。

##### agent finetuning 与想象训练

为把世界模型变成智能体，Dreamer 4 插入 task tokens，并从这些 token 上预测动作、奖励和值。动作和奖励先通过行为克隆/奖励建模学习：

$$
\mathcal{L}
=
-\sum_{n=0}^{L}\log p_\theta(a_{t+n}\mid h_t)
-\sum_{n=0}^{L}\log p_\theta(r_{t+n}\mid h_t)
$$

随后进入想象训练：冻结主体 world model，只更新 policy/value heads。rollout 从离线数据 context 出发，模型自己生成未来 latent，policy 采样动作，reward head 给出奖励，value head 用 \(\lambda\)-return 学习：

$$
R^\lambda_t
=
r_t+\gamma c_t\big((1-\lambda)v_t+\lambda R^\lambda_{t+1}\big)
$$

策略使用 PMPO，只关注 advantage 的符号而非幅值，并用 behavioral prior KL 约束策略不要离开合理行为空间。这对纯离线 RL 很关键，因为策略如果在模型内跑到离线数据之外，可能会利用世界模型漏洞。

##### 与 DreamerV3 的区别

DreamerV3 的世界模型核心仍是 RSSM，强调固定超参数和在线/从零交互学习。Dreamer 4 则面向“大规模离线视频 + 少量动作标注 + 神经仿真器内训练”：它把 recurrent state-space model 换成 block-causal Transformer，把图像空间压缩交给 causal tokenizer，并用 shortcut forcing 让生成足够快，能支撑人类交互和策略想象训练。

结果上，Dreamer 4 在 VPT contractor 数据集的离线 Minecraft diamond challenge 中，显著超过 VPT offline agent、行为克隆和基于 Gemma 3 的 VLA 行为克隆；论文还报告世界模型在 Minecraft 物体交互、人类实时操控和机器人视频交互预测上优于此前模型。其意义在于把 Dreamer 系列从“样本高效在线 RL”推进到“可从固定视频数据中训练可交互世界模型，再在模型中改进策略”。

#### 🧪 练习题
```yaml
question: "Dreamer 4 中 shortcut forcing 的核心作用是什么？"
options:
  - "用更多环境交互替代离线数据"
  - "让世界模型用少量采样步生成高质量未来，从而支持实时交互和想象训练"
  - "把所有视频帧重建任务替换为文本预测"
  - "取消策略和值函数，只保留行为克隆"
answer: 1
explain: "shortcut forcing 让 dynamics model 条件化于采样步长，学习用大步近似多个小步，显著减少交互生成所需前向次数。"
```

### JEPA

```yaml
id: jepa
num: 7
name: JEPA
full_name: 联合嵌入预测架构 (Joint Embedding Predictive Architecture)
year: '2022.06'
org: Meta AI
parent: —
paper_url: https://openreview.net/forum?id=BZ5a_v_S_s
project_url: ''
category: predictive
motivation: 预测潜在表征而非像素避免建模噪声
```

#### 📝 一句话总结
JEPA 提出在联合嵌入空间中预测未来或缺失部分的表征，而不是重建像素、声音或 token 细节，从而让世界模型聚焦可预测、语义相关的信息，并为层级规划和自主智能提供非生成式表征学习框架。

#### 🎯 核心要点
- **非生成式预测**：预测 \(y\) 的表征 \(s_y\)，而不是直接生成 \(y\) 本身，避免浪费容量建模不可预测细节
- **双编码器 + predictor**：\(x\)-encoder 产生 \(s_x\)，\(y\)-encoder 产生 \(s_y\)，predictor 从 \(s_x\) 和可选 latent \(z\) 预测 \(\hat{s}_y\)
- **能量式解释**：预测误差 \(D(s_y,\hat{s}_y)\) 可视为兼容性能量，低能量代表 \(x\) 与 \(y\) 可互相解释
- **多模态未来表达**：通过 \(y\)-encoder 的不变性和 predictor latent \(z\) 表达一个 \(x\) 对应多个合理 \(y\)
- **非对比防坍塌**：主张用信息最大化、predictability 和 latent 信息最小化等正则，而非大量负样本
- **层级 JEPA**：低层做短期细节预测，高层做长期抽象预测，为多时间尺度规划提供表征基础

#### 🔬 深入细节
##### 核心示意图

![JEPA 通用架构](https://ar5iv.labs.arxiv.org/html/2404.08471/assets/x2.png)
*图：JEPA 从一个输入的表征预测另一个输入的表征，额外变量提供两者之间的变换、遮挡或时间关系信息。该图来自 V-JEPA 论文中的通用 JEPA 示意。*

> ⚠️ 注意：YAML 中的 OpenReview 链接 `BZ5a_v_S_s` 当前无法直接访问；公开 OpenReview PDF 对应 Yann LeCun 的 2022 年路线论文《A Path Towards Autonomous Machine Intelligence》，本文据该论文和后续 I-JEPA/V-JEPA 公开资料整理。

##### 动机与背景

LeCun 的 JEPA 观点针对两个问题。第一，智能体需要学习世界模型来预测未来、补全缺失信息和规划动作，但真实世界未来通常是多模态的，不适合要求模型生成唯一像素结果。第二，像素级生成模型会花费大量容量预测树叶纹理、阴影、噪声等对行为无关且不可精确预测的细节。

JEPA 的核心想法是：把预测目标从数据空间移到表征空间。给定观测部分 \(x\) 和目标部分 \(y\)，编码器产生：

$$
s_x = E_x(x), \qquad s_y = E_y(y)
$$

predictor 根据 \(s_x\) 和可选 latent \(z\) 预测目标表征：

$$
\hat{s}_y = P(s_x, z)
$$

能量或损失为：

$$
E(x,y,z)=D(s_y,\hat{s}_y)
$$

如果 \(z\) 未知，可通过最小化能量推断：

$$
F(x,y)=\min_z D(E_y(y), P(E_x(x), z))
$$

##### 算法伪代码

```python
# Generic JEPA training sketch
for x, y, transform_info in unlabeled_pairs:
    sx = x_encoder(x)
    with stop_gradient_or_target_update():
        sy = y_encoder(y)

    z = infer_or_sample_latent(transform_info)
    pred = predictor(sx, z)
    pred_loss = distance(pred, sy)

    info_regularizer = maximize_information(sx) + maximize_information(sy)
    latent_regularizer = minimize_information(z)
    optimize(pred_loss + info_regularizer + latent_regularizer)
```

##### 为什么预测表征而不是像素

设 \(x\) 是一段车驶向岔路口的视频，\(y\) 是几秒后的画面。像素级模型必须决定车向左还是向右、树叶如何摆动、路面纹理如何变化；但对规划来说，关键可能只是“车的位置、速度、道路分支、潜在风险”。JEPA 允许 \(E_y\) 把不可预测或无关细节映射掉，使多个像素不同但语义等价的未来共享近似表征。

这与生成式模型的差异很重要。生成式模型必须构造 \(y\) 或像素重建 \(\hat y\)，损失通常迫使它解释所有低层细节；JEPA 只要求 \(\hat{s}_y\) 接近 \(s_y\)，因此更适合学习“对任务和预测有用的抽象”。

> 💡 关键：JEPA 的抽象不是人工规定的，而是由“可预测且信息充足”两个目标共同塑造。

##### 防止表示坍塌

简单的 joint embedding 容易坍塌：两个 encoder 都输出常数，预测误差为零但表征无信息。JEPA 路线论文提出非对比训练原则：

- \(s_x\) 应尽量包含 \(x\) 的信息
- \(s_y\) 应尽量包含 \(y\) 的信息
- \(s_y\) 应容易由 \(s_x\) 预测
- latent \(z\) 的信息容量应受限，避免 predictor 只靠 \(z\) 复制目标

用公式概括，可写成：

$$
\mathcal{L}_{\mathrm{JEPA}}
=
D(s_y, P(s_x,z))
+
\mathcal{R}_{\mathrm{info}}(s_x,s_y)
+
\mathcal{R}_{\mathrm{latent}}(z)
$$

其中 \(\mathcal{R}_{\mathrm{info}}\) 可由 VICReg、Barlow Twins、EMA target encoder、variance/covariance 正则等具体机制实现；\(\mathcal{R}_{\mathrm{latent}}\) 则限制 latent 维度、离散度、稀疏度或噪声。

##### 层级 JEPA 与世界模型

路线论文进一步提出 H-JEPA：低层 JEPA 学习短期、细粒度预测，高层 JEPA 接收低层表征并做长期、抽象预测。这样，系统可以在不同时间尺度上规划：毫秒级动作控制依赖低层细节，分钟级路线或任务规划依赖高层状态。

对具身智能而言，这意味着世界模型不必只有一个统一 latent。它可以形成从局部视觉特征、对象、事件到任务状态的层级表征，并在每层预测未来。I-JEPA 与 V-JEPA 是该思想在图像和视频上的具体实例，后续世界模型研究则进一步探索把这种表征预测用于机器人控制、视频理解和规划。

#### 🧪 练习题
```yaml
question: "JEPA 相比像素重建式世界模型的核心优势是什么？"
options:
  - "它完全不需要编码器"
  - "它在表征空间预测目标，可以忽略不可预测或任务无关的低层细节"
  - "它只能用于有监督分类"
  - "它通过增加负样本数量来生成更清晰图像"
answer: 1
explain: "JEPA 预测的是目标表征而非原始数据，因此模型容量集中在可预测的语义结构上，而不是纹理、噪声等细节。"
```

### I-JEPA

```yaml
id: ijepa
num: 8
name: I-JEPA
full_name: 图像JEPA (Image-JEPA)
year: '2023.06'
org: Meta AI
parent: jepa
paper_url: https://arxiv.org/abs/2301.08243
project_url: ''
category: predictive
motivation: 通过掩码块预测学习强语义特征训练效率高
```

#### 📝 一句话总结
I-JEPA 将 JEPA 落地到图像自监督学习：从单个上下文块预测同一图像中多个目标块的 latent representations，而不是重建像素，从而在不依赖手工数据增强的情况下高效学到语义表征。

#### 🎯 核心要点
- **单视图自监督**：不生成多种 crop/color jitter 视图，只从同一图像采样 context block 和 target blocks
- **表征空间预测**：target encoder 先编码完整图像 patch 表征，predictor 只预测被 mask 目标块的表征
- **EMA target encoder**：target encoder 由 context encoder 的指数滑动平均更新，配合 stop-gradient 防止坍塌
- **语义尺度 mask**：target blocks 采样较大连续区域，context block 保持足够信息但移除与 target 重叠部分
- **ViT 可扩展性**：结合 Vision Transformer，ViT-H/14 可在 ImageNet 上用 16 张 A100 于 72 小时内完成训练
- **下游泛化**：在线性分类、少样本分类、目标计数和深度预测等任务上表现强，说明表征不只服务分类

#### 🔬 深入细节
##### 核心示意图

![I-JEPA 架构](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x5.png)
*图：I-JEPA 用 context encoder 处理可见上下文块，predictor 结合目标位置 mask tokens 预测目标块表征，target encoder 提供 stop-gradient 目标。*

##### 动机与背景

图像自监督学习主流有两类：对比/不变性方法依赖手工增强构造正样本视图，生成式方法通过 MAE 等方式重建缺失像素。前者的增强不一定适合所有任务，后者会把容量花在低层纹理和颜色细节上。I-JEPA 的目标是学习“无需手工增强、无需像素解码”的图像语义表征。

给定图像 \(x\)，I-JEPA 先把它切成 patch token。target encoder \(E_{\bar\theta}\) 编码完整图像，得到每个 patch 的目标表征；context encoder \(E_\theta\) 只处理 context block 中未被遮挡的 patch；predictor \(P_\phi\) 接收 context 表征和目标位置 mask tokens，预测多个 target block 的 patch-level 表征。

##### 算法伪代码

```python
# I-JEPA pretraining
for image in dataloader:
    target_masks = sample_large_semantic_blocks(image, num_blocks=M)
    context_mask = sample_context_block(image)
    context_mask = remove_overlap(context_mask, target_masks)

    with stop_gradient():
        target_repr = target_encoder(image)          # EMA encoder, full image
        targets = [target_repr[mask] for mask in target_masks]

    context_tokens = image_patches(image)[context_mask]
    context_repr = context_encoder(context_tokens)

    preds = []
    for mask in target_masks:
        mask_tokens = positional_mask_tokens(mask)
        preds.append(predictor(context_repr, mask_tokens))

    loss = mean_distance(preds, targets)
    optimize(context_encoder, predictor, loss)
    update_ema(target_encoder, context_encoder)
```

##### 损失函数

I-JEPA 的目标是让预测表征接近 target encoder 给出的表征。若第 \(i\) 个目标块的 patch 表征为 \(s_{y_i}\)，预测为 \(\hat{s}_{y_i}\)，可写作：

$$
\mathcal{L}
=
\frac{1}{M}\sum_{i=1}^{M}
D\left(
P_\phi(E_\theta(x_{\mathrm{ctx}}), m_i),
\mathrm{sg}(E_{\bar\theta}(x)_{m_i})
\right)
$$

其中 \(m_i\) 表示目标块位置，\(\mathrm{sg}\) 表示 stop-gradient。target encoder 参数用 EMA 更新：

$$
\bar\theta \leftarrow \tau\bar\theta + (1-\tau)\theta
$$

这种结构与 BYOL/data2vec 的 target network 思路相近，但 I-JEPA 的关键是“预测空间”和“mask 采样策略”。

##### mask 设计为什么关键

如果 target block 太小，模型可利用局部纹理补全，学到的是低层边缘和颜色；如果 context 太窄，预测任务过难且不稳定。论文强调两个条件：

- target blocks 要足够大，迫使目标表征偏向对象和语义区域
- context block 要信息充足且空间分布合理，但不能与 target 大量重叠

> 💡 关键：I-JEPA 的语义性很大程度来自 mask 任务设计，而不仅是“把 MAE 的 decoder 换成 predictor”。

##### 与 MAE / 对比学习的区别

MAE 预测像素，decoder 必须重建局部纹理，因此预训练表征往往需要大量 fine-tuning 才释放性能。I-JEPA 预测 target encoder 的 latent representation，避免像素解码器，计算更省，也更偏向高层语义。

对比学习和 DINO/iBOT 等方法通常依赖多视图增强来定义不变性。I-JEPA 只处理单个图像视图，不需要手工设计“哪些变化应保持不变”。这让它更接近 JEPA 的一般目标：通过预测上下文与目标之间的表征关系，让系统自己形成有用抽象。

##### 实验意义

论文报告 I-JEPA 在 ImageNet linear evaluation 上优于不使用手工增强的 MAE、CAE、data2vec 等方法，并展现良好规模化。更重要的是，I-JEPA 的表征可迁移到目标计数、深度预测等非分类任务，说明它保留了比分类标签更丰富的图像结构信息。这也是它成为 V-JEPA 和后续具身世界模型表征基础的原因。

#### 🧪 练习题
```yaml
question: "I-JEPA 为什么强调 target blocks 要足够大？"
options:
  - "为了让模型直接复制像素纹理"
  - "为了让预测任务偏向语义区域，而不是只靠局部低层线索完成"
  - "为了减少 target encoder 的参数量"
  - "为了让 context encoder 可以看到完整目标块"
answer: 1
explain: "大块目标更难用局部纹理猜出，迫使模型学习对象级和场景级语义表征；同时 context 会移除与目标重叠区域以避免泄漏。"
```

### V-JEPA

```yaml
id: vjepa
num: 9
name: V-JEPA
full_name: 视频JEPA (Video-JEPA)
year: '2024.04'
org: Meta AI
parent: ijepa
paper_url: https://arxiv.org/abs/2404.08471
project_url: ''
category: predictive
motivation: 扩展至视频域学习时空特征理解物理运动
```

#### 📝 一句话总结
V-JEPA 将 JEPA 式特征预测扩展到视频，通过遮挡大块时空区域并预测其 latent features，在不使用文本、负样本、预训练图像编码器或像素重建的情况下学习兼具外观和运动理解的视频表征。

#### 🎯 核心要点
- **视频特征预测目标**：从视频中可见 token 表征预测被遮挡时空 token 的 target encoder 表征
- **无需额外监督**：不使用标签、文本、负样本、预训练 image encoder 或像素级 decoder
- **多块时空 mask**：目标块为空间连续区域，并沿整个时间维重复，减少视频冗余造成的信息泄漏
- **EMA target encoder + stop-gradient**：用动量 target encoder 提供稳定目标，避免常数表示坍塌
- **VideoMix2M 预训练**：整合 HowTo100M、Kinetics、Something-Something-v2 等约 200 万公开视频
- **冻结骨干评估强**：同一 frozen backbone 在 Kinetics、Something-Something-v2、ImageNet 等外观和运动任务上表现稳健

#### 🔬 深入细节
##### 核心示意图

![V-JEPA 训练流程](https://ar5iv.labs.arxiv.org/html/2404.08471/assets/x3.png)
*图：V-JEPA 丢弃视频中的可见 token 输入 context encoder，再用 predictor 和 mask tokens 预测被遮挡时空位置的 target encoder 表征。*

##### 动机与背景

视频理解需要同时捕获外观、运动、物体交互和时间因果。像素级视频重建方法容易把容量花在颜色、纹理、压缩噪声等低层细节上；对比学习则常依赖负样本或强增强。V-JEPA 的问题是：单独的 latent feature prediction 是否足以让视频模型学到通用表征？

V-JEPA 的答案是肯定的。它沿用 JEPA 的非生成式思想，把目标定义为“预测另一个视频区域的表征”。给定视频 clip \(x\)，采样上下文区域 \(x_c\) 和目标区域 \(x_t\)，模型优化：

$$
\mathcal{L}
=
\left\|
P_\phi(E_\theta(x_c), m_t)
-
\mathrm{sg}(E_{\bar\theta}(x)_{m_t})
\right\|_1
$$

其中 \(m_t\) 是目标时空位置的 mask token/positional embedding，\(E_{\bar\theta}\) 是 EMA target encoder。

##### 算法伪代码

```python
# V-JEPA pretraining
for video in VideoMix2M:
    tokens = patchify_video(video)  # 3D spatio-temporal patches
    target_masks = sample_multiblock_masks(tokens)
    context_tokens = drop_tokens(tokens, target_masks)

    context_repr = context_encoder(context_tokens)
    with stop_gradient():
        full_target_repr = target_encoder(tokens)
        targets = full_target_repr[target_masks]

    mask_tokens = positional_tokens(target_masks)
    preds = predictor(context_repr, mask_tokens)

    loss = l1_distance(preds, targets)
    optimize(context_encoder, predictor, loss)
    update_ema(target_encoder, context_encoder)
```

##### 时空 mask 设计

视频有强冗余，如果只随机遮挡少量 patch，模型可能从相邻帧和相邻像素直接插值，而不是学习运动或对象关系。V-JEPA 采样空间连续的大块区域，并把这些区域沿整个时间维重复遮挡。论文使用短程和长程 mask：短程目标覆盖较小比例，长程目标可覆盖很大比例，从而同时训练局部和全局预测能力。

这种 mask 让任务更接近“根据可见场景推断被遮挡对象/动作在整段视频中的表征”，而不是补一小块纹理。对于 Something-Something-v2 这类动作类别高度依赖物体运动关系的数据集，这种时空预测尤其关键。

##### 网络结构与目标编码器

V-JEPA 使用 ViT 视频骨干，把视频切成 3D patch tokens。context encoder 只处理未被遮挡 token，因此计算类似 MAE 一样高效；predictor 是较窄的 Transformer，接收 context 表征和 learnable mask tokens，输出每个目标 token 的表征预测。

target encoder 是 context encoder 的 EMA 版本，输出 stop-gradient 目标。没有这个机制时，最简单的表征预测损失会允许 encoder 输出常数，导致坍塌。EMA target 让 predictor 追逐一个缓慢变化、信息更稳定的目标。

> 💡 关键：V-JEPA 的“非生成式”不是不预测，而是只预测抽象特征，让模型保留对下游任务有用的运动和语义信息。

##### 结果与意义

论文在约 200 万公开视频组成的 VideoMix2M 上预训练 ViT-L/16、ViT-H/16 和更高分辨率模型。最大模型在 frozen backbone 评估下同时覆盖外观任务和运动任务：Kinetics-400 更偏外观识别，Something-Something-v2 更考验时序和物体交互。V-JEPA 在不微调骨干的情况下表现稳健，说明特征预测能学习通用视觉表征。

与 I-JEPA 相比，V-JEPA 的新增挑战是时间维冗余和运动理解；与视频 MAE 相比，它不重建像素，训练周期更短且冻结表征更强。对于具身智能，V-JEPA 提供了一个重要方向：先从大量无标签视频学习物理和时空表征，再把这些表征接入规划、控制或世界模型预测。

#### 🧪 练习题
```yaml
question: "V-JEPA 为什么把空间目标块沿整个时间维重复遮挡？"
options:
  - "为了让模型只学习单帧分类"
  - "为了减少视频相邻帧泄漏，迫使模型学习更高层的时空关系"
  - "为了让 target encoder 不需要 EMA 更新"
  - "为了把所有视频都转换成文本数据"
answer: 1
explain: "视频相邻帧冗余很强，若遮挡太局部，模型可直接插值；沿时间维遮挡连续区域能强化运动和对象关系预测。"
```

### V-JEPA 2

```yaml
id: vjepa2
num: 10
name: V-JEPA 2
full_name: 视频JEPA 2 (V-JEPA 2)
year: '2025.06'
org: Meta AI
parent: vjepa
paper_url: https://arxiv.org/abs/2506.09985
project_url: ''
category: predictive
motivation: 增强时空推理应用于机器人规划任务
```

#### 📝 一句话总结
V-JEPA 2 将 V-JEPA 的联合嵌入预测目标扩展到互联网规模视频预训练，并通过少量机器人轨迹后训练出 action-conditioned latent world model，解决了仅靠视觉观测学习物理预测和零样本机器人规划的问题。

#### 🎯 核心要点
- **两阶段训练**：先在大规模视频和图像上做 action-free V-JEPA 2 预训练，再用少量机器人交互视频训练 V-JEPA 2-AC
- **表示空间预测**：不重建像素，而是在 EMA target encoder 的 latent feature 空间预测被 mask 的时空片段
- **规模化配方**：使用 VideoMix22M、Curated-YT1B、ViT-g 级模型、长视频 clip 和高分辨率 cooldown 提升视频理解能力
- **预测能力评估**：在 Something-Something v2、EPIC-KITCHENS-100、视频问答等任务上验证 motion understanding 和 action anticipation
- **V-JEPA 2-AC**：冻结 V-JEPA 2 encoder，在 DROID 的少量 Franka 机器人视频上训练 frame-causal action-conditioned predictor
- **图像目标规划**：用 CEM 在 latent 空间搜索动作序列，最小化想象未来状态与目标图像状态的 \(L_1\) 距离
- **零样本机器人部署**：无需目标实验室数据、任务专用训练或奖励函数，在不同实验室的 Franka 机械臂上执行 reaching、grasping、pick-and-place

#### 🔬 深入细节
##### 核心示意图

![V-JEPA 2 总览](https://arxiv.org/html/2506.09985v1/x1.png)
*图：V-JEPA 2 先从大规模视频学习视觉世界表征，再把冻结表征用于 action-conditioned world model 和机器人规划。*

##### 动机与背景

V-JEPA 的核心主张是“预测表征而不是预测像素”：如果模型只需要预测抽象 latent feature，它可以忽略像素级纹理噪声，集中学习物体、运动和可预测的物理结构。V-JEPA 2 的问题设置更进一步：仅从观察式视频学习到的模型，能否迁移到机器人控制，并在没有目标环境示范的情况下进行规划。

V-JEPA 2 的第一阶段沿用 JEPA 风格的 masked feature prediction。给定视频 \(v\)，context view \(x\) 删除一组时空 patch，target view \(y\) 保留对应 patch。在线 encoder \(E_\theta\) 编码 context，predictor \(P_\phi\) 根据 mask 位置预测 target encoder \(\bar E_\theta\) 的表示：

$$
\mathcal{L}_{\text{V-JEPA}} =
\sum_{m \in \mathcal{M}}
\left\|
P_\phi(E_\theta(x), m) - \text{sg}(\bar E_\theta(y_m))
\right\|_1
$$

其中 \(\bar E_\theta\) 通常由 \(E_\theta\) 的 EMA 更新得到，\(\text{sg}\) 表示 stop-gradient。这个目标避免了生成模型必须还原每个像素的负担，使预训练更像学习“什么会发生”的语义和动力学表征。

V-JEPA 2-AC 的第二阶段把冻结的视觉 encoder 变成机器人 latent dynamics 的状态抽取器。给定当前图像和动作 \(a_t\)，action-conditioned predictor 预测下一步或多步 latent state。论文同时使用 teacher forcing loss 和 rollout loss：前者稳定单步预测，后者让模型在把自身预测再喂回去时仍能维持多步一致性。

$$
\mathcal{L}_{\text{AC}} =
\sum_t \|\hat z_{t+1} - \text{sg}(z_{t+1})\|_1
+ \lambda
\sum_{k=1}^{H} \|\hat z_{t+k}^{\text{rollout}} - \text{sg}(z_{t+k})\|_1
$$

##### 算法伪代码

```python
# V-JEPA 2 and V-JEPA 2-AC training + planning
initialize(video_encoder, predictor, target_encoder_ema)

# Stage 1: action-free video pretraining
for video in internet_video_batches:
    context, targets, masks = sample_masked_views(video)
    context_tokens = video_encoder(context)
    with no_grad():
        target_tokens = target_encoder_ema(targets)
    pred_tokens = predictor(context_tokens, masks)
    loss = l1(pred_tokens, target_tokens)
    optimize(video_encoder, predictor, loss)
    update_ema(target_encoder_ema, video_encoder)

# Stage 2: robot action-conditioned world model
freeze(video_encoder)
initialize(action_predictor)
for frames, actions in droid_robot_batches:
    z = video_encoder(frames)
    one_step = action_predictor(z[:-1], actions[:-1])
    rollout = autoregressive_rollout(action_predictor, z[0], actions, horizon=H)
    loss = l1(one_step, stopgrad(z[1:])) + rollout_loss(rollout, stopgrad(z))
    optimize(action_predictor, loss)

# Planning with image goals
def plan(current_image, goal_image):
    z0 = video_encoder(current_image)
    zg = video_encoder(goal_image)
    action_sequence = cem_search(
        objective=lambda a_seq: l1(rollout(action_predictor, z0, a_seq)[-1], zg)
    )
    return action_sequence[0]
```

##### 训练与推理流程

在预训练时，模型看不到动作，只学习视频内部“可预测的表征结构”。这使 encoder 能捕捉物体外观、运动方向、交互关系和时间上下文。论文的规模化配方重点不只是扩大参数，还包括更丰富的视频数据、更长时域、更高分辨率和更稳定的 EMA/weight decay 训练设置。

在机器人阶段，V-JEPA 2-AC 不重新学习像素世界，而是在已经具备视频理解能力的 frozen representation 上学习动作到 latent 变化的映射。这样做的直觉是：机器人数据少而昂贵，不应从零开始学习视觉语义；少量交互数据只负责告诉模型“动作如何推动世界状态变化”。

规划时，任务由目标图像指定，而不是由手写奖励指定。给定当前图像和目标图像，系统在 latent 空间想象不同动作序列的结果，选择让最终 latent 最接近目标 latent 的序列：

$$
a_{1:H}^{*} =
\arg\min_{a_{1:H}}
\left\|
\hat z_{t+H}(a_{1:H}) - z_{\text{goal}}
\right\|_1
$$

实际执行采用 receding-horizon control：每次只执行 CEM 搜到的第一个动作，然后重新观察、重新规划。这样可以用闭环反馈纠正模型误差，避免一次性开环 rollout 在真实机器人上漂移。

> 💡 关键：V-JEPA 2 的“世界模型”不是像素级视频生成器，而是 latent prediction model。它牺牲像素可视化，换来更高效的物理表征、动作预测和目标图像规划。

#### 🧪 练习题
```yaml
question: "V-JEPA 2-AC 用于机器人规划时，为什么要在 latent 空间最小化与目标图像的距离？"
options:
  - "因为 latent 表征包含任务相关的物体和空间状态，比像素差更适合做目标匹配"
  - "因为它需要先生成完整高清视频再计算奖励"
  - "因为 CEM 只能优化离散动作，不能优化连续动作"
  - "因为 target encoder 会直接输出机器人关节角"
answer: 0
explain: "V-JEPA 2-AC 使用冻结视觉 encoder 的表征作为状态，规划目标是让想象未来状态接近目标图像状态，而不是重建像素或依赖人工奖励。"
```

### V-JEPA 2.1

```yaml
id: vjepa21
num: 11
name: V-JEPA 2.1
full_name: 视频JEPA 2.1 (Understanding Physical World)
year: '2026.02'
org: Meta AI
parent: vjepa2
paper_url: https://ai.meta.com/blog/v-jepa-2-1-physical-world/
project_url: ''
category: predictive
motivation: 扩展至20亿参数实现80%零样本抓取成功率
```

#### 📝 一句话总结
V-JEPA 2.1 在 V-JEPA 2 的全局视频理解基础上加入 dense predictive loss、deep self-supervision 和多模态 tokenizer，使自监督视频表征同时具备局部空间密度、时间一致性和机器人可用性。

#### 🎯 核心要点
- **Dense Predictive Loss**：对 masked tokens 和 visible context tokens 都施加预测损失，显式保留局部时空结构
- **Context loss 加权**：对靠近 mask 区域的 context token 赋予更高权重，增强 mask 与可见区域之间的局部连续性
- **Deep Self-Supervision**：在多个中间 encoder 层级施加自监督目标，避免最终层只保留全局语义而损失局部细节
- **Multi-Modal Tokenizers**：使用图像和视频专用 patch embedding，在共享 encoder 中联合训练静态图像和视频
- **规模化到 ViT-G 2B**：模型容量、VisionMix163M 图像数据、高分辨率 cooldown 共同提升 dense 与 global 任务表现
- **具身任务收益**：论文报告短期物体交互预测、动作预测、深度估计、语义分割、机器人抓取和导航均受益
- **依据限制**：YAML 的 `paper_url` 指向 Meta 博客；方法细节主要依据公开 arXiv 论文 `V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning`

#### 🔬 深入细节
##### 核心示意图

![V-JEPA 2.1 架构](https://arxiv.org/html/2603.14482v2/diagrams/architecture_vjepa2_1.jpg)
*图：V-JEPA 2.1 使用图像/视频 tokenizers、3D RoPE、multi-level encoder features 和 predictor，对 masked 与 context tokens 同时做自监督预测。*

##### 动机与背景

V-JEPA 2 擅长 motion understanding、action anticipation 和机器人目标规划，但其 feature map 对 dense prediction 不够友好。直观地说，原始 JEPA 目标主要监督 masked patch，visible context token 可以退化成全局信息汇聚器，导致局部边界、物体部件和深度结构在最后层表示中不够清晰。

V-JEPA 2.1 的关键改动是把“预测被遮挡部分”扩展为“让所有 token 都承担局部表征责任”。设 \(M\) 是 masked token 集合，\(C\) 是 context token 集合，原始预测损失可写作：

$$
\mathcal{L}_{\text{pred}} =
\frac{1}{|M|}
\sum_{i \in M}
d(\hat y_i, \text{sg}(y_i))
$$

V-JEPA 2.1 额外引入 context loss：

$$
\mathcal{L}_{\text{ctx}} =
\frac{1}{|C|}
\sum_{i \in C}
\lambda_i d(\hat y_i, \text{sg}(y_i))
$$

其中 \(d(\cdot,\cdot)\) 是特征距离，\(\lambda_i\) 与 context token 到最近 mask token 的距离有关。靠近缺失区域的 context token 更需要携带精确局部信息，因此被更强监督。总损失不只作用在最终层，还作用在多个中间层：

$$
\mathcal{L}_{\text{V-JEPA 2.1}} =
\sum_{\ell \in \mathcal{S}}
\left(
\mathcal{L}_{\text{pred}}^{(\ell)}
+ \mathcal{L}_{\text{ctx}}^{(\ell)}
\right)
$$

##### 算法伪代码

```python
# V-JEPA 2.1 dense self-supervised training
for sample in image_video_batches:
    tokens = modality_tokenizer(sample)       # 2D image patches or 3D video tubelets
    visible, masked, mask_info = random_mask(tokens)

    # Shared encoder produces multi-level context features
    layer_features = encoder(visible, return_layers=selected_layers)
    fused_context = mlp_fuse(layer_features)

    # Predictor receives context tokens plus learnable mask tokens
    predictions = predictor(fused_context, mask_tokens(mask_info))

    loss = 0.0
    for layer in selected_layers:
        target = stopgrad(target_encoder(tokens, layer=layer))
        loss += distance(predictions.masked[layer], target.masked)
        loss += weighted_context_loss(predictions.context[layer], target.context)

    optimize(encoder, predictor, modality_tokenizers, loss)
    update_ema(target_encoder, encoder)
```

##### 方法机制拆解

Dense Predictive Loss 解决的是“表征是否能被像素级下游任务线性读出”的问题。传统 V-JEPA 表征更偏向全局语义，适合分类和动作预测；V-JEPA 2.1 要求 visible context token 自己也被预测到 target 表征，因此每个 patch 需要保留更强的位置、边界和物体部件信息。

Deep Self-Supervision 解决的是“中间层有局部信息，最终层有语义信息”之间的矛盾。模型把若干中间层和最终层特征拼接，经 MLP 融合后送入 predictor，并在多个层级计算损失。这样最终层不必为了分类而完全丢掉局部结构，dense downstream task 也不再强依赖多层 probing。

Multi-Modal Tokenizer 让同一个 encoder 同时吃图像和视频。图像提供大规模外观、物体和边界多样性，视频提供运动、时序和物理连续性。V-JEPA 2.1 通过模态专用 patch embedding、3D RoPE 和 modality embedding 把二者纳入统一表征学习流程。

在机器人任务中，dense feature 的价值尤其直接。抓取和导航不仅需要知道“这是什么物体”，还需要知道物体边界、深度关系和相对位置。V-JEPA 2.1 改善的局部空间结构可以让后续 latent planner 更准确地估计目标物和夹爪之间的几何关系。

> 💡 关键：V-JEPA 2.1 不是把 V-JEPA 变成像素重建模型，而是在表征预测目标中补上 context token 和中间层监督，使 latent feature 同时服务全局理解和局部控制。

#### 🧪 练习题
```yaml
question: "V-JEPA 2.1 中 context loss 的核心作用是什么？"
options:
  - "让可见 token 也被自监督约束，从而保留局部空间结构"
  - "把所有视频帧压缩成单个全局分类 token"
  - "替代 target encoder 的 EMA 更新"
  - "只提升文本问答任务，与视觉密集任务无关"
answer: 0
explain: "context loss 对 visible context tokens 也施加预测约束，避免它们只做全局汇聚，从而提升分割、深度和机器人几何理解。"
```

### VideoGPT

```yaml
id: videogpt
num: 12
name: VideoGPT
full_name: 视频GPT (VideoGPT)
year: '2021.04'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/2104.10157
project_url: ''
category: generative
motivation: 利用VQ-VAE和Transformer自回归生成视频
```

#### 📝 一句话总结
VideoGPT 用 3D VQ-VAE 将视频压缩为离散时空 latent token，再用 GPT 式 Transformer 自回归建模 token 序列，解决了直接在像素空间生成视频维度过高、训练和采样成本过大的问题。

#### 🎯 核心要点
- **两阶段生成框架**：先训练 VQ-VAE tokenizer，再训练 autoregressive Transformer prior
- **3D VQ-VAE**：用 3D convolution 和 transposed convolution 在时间与空间上共同下采样和上采样
- **Axial self-attention**：在 VQ-VAE residual block 中加入轴向注意力，提升重建和生成质量
- **离散 latent prior**：把视频 latent 展平成序列，用 GPT-like masked self-attention 预测下一个 code
- **时空位置编码**：为 latent token 注入空间和时间位置信息，使 Transformer 能区分帧内位置和帧间顺序
- **条件生成扩展**：通过 cross-attention 做帧条件生成，通过 conditional LayerNorm 做动作或类别条件生成
- **基准验证**：在 BAIR Robot Pushing、UCF-101、TGIF、ViZDoom 等数据上展示无条件、单帧条件、动作条件视频生成

#### 🔬 深入细节
##### 核心示意图

![VideoGPT 训练流程](https://raw.githubusercontent.com/wilson1yan/VideoGPT/master/VideoGPT.png)
*图：VideoGPT 先把视频编码为离散 latent codes，再用 Transformer 预测 latent 序列，最后由 VQ-VAE decoder 还原为视频。*

##### 动机与背景

视频生成比图像生成难，核心原因是输入维度同时沿空间和时间膨胀。若直接用自回归模型预测每个像素，序列长度巨大，训练和采样都很慢。VideoGPT 的选择是保留 likelihood-based autoregressive model 的稳定训练优势，但把建模对象从像素换成 VQ-VAE 的离散 latent token。

第一阶段训练 VQ-VAE。encoder \(E\) 把视频 \(x\) 映射到连续 latent，再通过 codebook \(e_k\) 做最近邻量化，decoder \(G\) 重建视频。典型目标为：

$$
\mathcal{L}_{\text{VQ}} =
\|x - G(z_q)\|_2^2
+ \|\text{sg}(E(x)) - z_q\|_2^2
+ \beta \|E(x) - \text{sg}(z_q)\|_2^2
$$

其中 \(z_q\) 是量化后的 codebook embedding，第二项训练 codebook，第三项是 commitment loss。VideoGPT 的 VQ-VAE 在 encoder/decoder 中使用 3D 卷积处理视频时空结构，并在 residual block 中用 axial attention 增强长程依赖。

第二阶段训练 GPT prior。将离散 code \(z_{1:N}\) 展平成序列后，Transformer 学习：

$$
p_\theta(z_{1:N}) =
\prod_{i=1}^{N} p_\theta(z_i \mid z_{<i})
$$

条件生成时，可以把单帧或前缀帧编码成条件表示，通过 cross-attention 输入 prior；动作或类别则可以通过 conditional normalization 调制 Transformer 层。

##### 算法伪代码

```python
# Stage 1: train video tokenizer
for video in video_batches:
    z_e = encoder_3d_conv_axial_attn(video)
    z_q, code_ids = nearest_codebook_lookup(z_e)
    recon = decoder_3d_deconv_axial_attn(z_q)
    loss = recon_loss(video, recon)
    loss += codebook_loss(stopgrad(z_e), z_q)
    loss += beta * commitment_loss(z_e, stopgrad(z_q))
    optimize(vqvae, loss)

# Stage 2: train autoregressive prior
freeze(vqvae)
for video in video_batches:
    code_ids = vqvae.encode_to_codes(video)
    seq = flatten_spacetime(code_ids)
    logits = transformer_prior(seq[:-1], position="spacetime")
    loss = cross_entropy(logits, seq[1:])
    optimize(transformer_prior, loss)

# Sampling
seq = autoregressive_sample(transformer_prior, condition=optional_context)
video = vqvae.decode_from_codes(unflatten_spacetime(seq))
```

##### 方法机制拆解

VideoGPT 的核心不是提出复杂的新模块，而是把两个成熟组件组合成一个可复现的视频生成基线。VQ-VAE 负责去除视频中的低层冗余，Transformer 负责建模高层离散序列的时空依赖。这样既避免 GAN 的训练不稳定，也避免像素自回归的巨大计算成本。

3D convolution 的作用是让 tokenizer 从一开始就把时间维度纳入压缩，而不是逐帧编码。若只逐帧压缩，prior 仍要独自学习大量运动一致性；3D tokenizer 能把局部运动模式编码进 latent token，降低 prior 的负担。

Axial attention 是 VideoGPT 在 VQ-VAE 里提升建模能力的重要细节。完整时空 self-attention 成本高，轴向注意力分解为沿时间、高度、宽度等轴分别建模，使局部长程依赖更可控。论文的消融表明，加入 axial attention 的 VQ-VAE 重建和生成质量更好。

与传统视频 GAN 相比，VideoGPT 的优点是目标函数明确、可以用 likelihood 和 cross entropy 训练、条件生成接口自然。缺点也很直接：自回归采样仍然逐 token 进行，长视频生成会变慢，且 codebook 压缩质量限制了最终像素质量。

> 💡 关键：VideoGPT 的“GPT”不是处理文本，而是处理 VQ-VAE 离散视频 token；它把视频生成转化为离散时空 token 的语言建模问题。

#### 🧪 练习题
```yaml
question: "VideoGPT 为什么先训练 VQ-VAE 再训练 Transformer prior？"
options:
  - "为了把高维视频压缩为更短的离散 latent 序列，降低自回归建模成本"
  - "为了让 Transformer 直接预测 RGB 像素"
  - "为了完全避免使用位置编码"
  - "为了把视频生成改成监督分类任务"
answer: 0
explain: "VQ-VAE 去除时空冗余并生成离散 code，Transformer 只需在压缩后的 token 空间建模序列分布。"
```

### TECO

```yaml
id: teco
num: 13
name: TECO
full_name: 时序一致Transformer (Temporally Consistent Transformer)
year: '2023.07'
org: Google Research
parent: videogpt
paper_url: http://proceedings.mlr.press/v202/yan23b.html
project_url: ''
category: generative
motivation: 弱瓶颈潜在表示解决长视频时空一致性
```

#### 📝 一句话总结
TECO 通过“高质量 VQ latent 压缩 - temporal causal transformer - spatial MaskGIT 展开”的结构，在保持长上下文的同时降低注意力成本，解决了 VideoGPT 类模型长视频生成中内容遗忘和时序不一致的问题。

#### 🎯 核心要点
- **面向长时域一致性**：关注物体离开视野后再出现时是否保持一致，而不只评估短 horizon 清晰度
- **三类长依赖基准**：构建 DMLab 迷宫、Minecraft 世界、Habitat 室内场景等部分可观测 3D 视频预测数据集
- **VQ latent dynamics**：先用 VQ-GAN/VQ tokenizer 将图像帧压缩成离散视觉 token
- **弱瓶颈压缩**：将高分辨率时空 token 序列进一步压成较少 temporal embeddings，显著降低长序列注意力开销
- **Temporal causal transformer**：在压缩后的时间序列上建模长程动态，支持数百帧上下文
- **Spatial MaskGIT prior**：在每个时间步并行迭代生成空间 token，比纯自回归逐 token 采样更快
- **强于滑窗方法**：相比只能看短窗口的模型，TECO 更能记住全局地图、场景布局和被遮挡对象

#### 🔬 深入细节
##### 核心示意图

![TECO 架构](https://raw.githubusercontent.com/wilson1yan/teco/master/TECO.png)
*图：TECO 将视频 token 压缩到更短的时间表征，在 temporal transformer 中建模长程依赖，再通过 spatial MaskGIT 还原每帧 token。*

##### 动机与背景

VideoGPT 证明了“VQ tokenizer + Transformer prior”可以用于视频生成，但长视频里有一个硬问题：如果直接对所有时空 token 做 Transformer，注意力复杂度随 token 数平方增长；如果用滑动窗口分段生成，模型只能看到短历史，物体、地图和场景布局很容易在长程 rollout 中漂移。

TECO 的核心假设是，长程一致性并不要求 temporal transformer 处理每个空间位置的所有细节。模型可以先把一帧的 VQ token 压成较少的 latent embeddings，让 temporal module 负责“场景状态和动态记忆”，再让 spatial generator 负责把该时间步展开成清晰图像。

设输入视频为 \(x_{1:T}\)，VQ tokenizer 得到离散 token \(z_{1:T}\)。TECO 学习压缩表征 \(h_t\)，并在时间上自回归建模：

$$
h_t = C_\psi(z_t), \quad
p_\theta(h_{1:T}) =
\prod_{t=1}^{T} p_\theta(h_t \mid h_{<t}, a_{<t})
$$

随后 spatial MaskGIT 根据 \(h_t\) 和可见/已生成 token 预测该帧的空间 token：

$$
\mathcal{L}_{\text{mask}} =
-\mathbb{E}_{z,m}
\left[
\log p_\omega(z \mid z \odot m, h_t)
\right]
$$

其中 \(m\) 是随机 mask。MaskGIT 在推理时可以多轮并行填充 token，而不是像 VideoGPT 那样完全逐 token 自回归，因此采样速度更好。

##### 算法伪代码

```python
# TECO training
freeze_or_train_vq_tokenizer()
initialize(spatial_compressor, temporal_transformer, spatial_maskgit)

for video, actions in long_video_batches:
    z = vq_tokenizer.encode(video)            # [T, H, W] discrete codes
    h = spatial_compressor(z)                 # [T, small_h, small_w, dim]

    # Long-horizon dynamics over compressed temporal states
    h_pred = temporal_transformer(h[:-1], actions[:-1])
    temporal_loss = cross_entropy_or_regression(h_pred, stopgrad(h[1:]))

    # Spatial reconstruction/prediction with MaskGIT
    masked_z, mask = random_mask(z)
    logits = spatial_maskgit(masked_z, h, mask)
    maskgit_loss = cross_entropy(logits[mask], z[mask])

    optimize(spatial_compressor, temporal_transformer, spatial_maskgit,
             temporal_loss + maskgit_loss)

# TECO sampling
z_context = vq_tokenizer.encode(context_frames)
h_context = spatial_compressor(z_context)
for t in future_steps:
    h_t = temporal_transformer.sample_next(h_context, actions)
    z_t = maskgit_iterative_decode(spatial_maskgit, h_t)
    append(h_context, spatial_compressor(z_t))
video = vq_tokenizer.decode(all_z)
```

##### 方法机制拆解

TECO 的“弱瓶颈”很重要。瓶颈太强会牺牲画面细节，导致生成模糊或语义丢失；瓶颈太弱又会让 temporal transformer 面对过长序列。TECO 在二者之间折中：长程模块只看压缩状态，空间细节由 MaskGIT 根据当前 latent state 并行恢复。

Temporal transformer 使用 causal mask，因此未来帧只能依赖过去帧和动作条件。这与世界模型的预测需求一致：给定历史和动作，预测下一段视觉状态。对于 DMLab、Minecraft、Habitat 这类部分可观测 3D 场景，模型必须记住曾经看到但当前不可见的空间布局。

Spatial MaskGIT 与纯自回归 decoder 的区别在于生成顺序。纯 AR decoder 每次只生成一个 token，误差和采样时间都随空间 token 数累积；MaskGIT 每轮填充一批 token，并用置信度机制逐步 refine，因此可以更快生成整帧，同时保持清晰度。

与传统 FitVid、CW-VAE 或短窗口 latent models 相比，TECO 的优势不是单帧重建更锐利，而是可以把长视频中的“世界状态”传递得更久。论文的长 horizon benchmark 正是为了评估模型是否在回到同一地点时记住原来的几何和物体。

> ⚠️ 注意：TECO 的核心收益来自架构化分工。VQ tokenizer 负责压缩和像素还原，temporal transformer 负责长程状态，MaskGIT 负责空间细节。把三者合成一个巨大时空 Transformer 会明显增加长序列成本。

#### 🧪 练习题
```yaml
question: "TECO 为什么要先把每帧 VQ token 压缩成更少的 temporal embeddings？"
options:
  - "为了让 temporal transformer 能在数百帧上建模长程依赖，同时避免完整时空注意力的平方开销"
  - "为了完全丢弃空间信息，只保留动作标签"
  - "为了让模型只能生成单帧图像"
  - "为了把 MaskGIT 替换成像素级 GAN"
answer: 0
explain: "弱瓶颈压缩降低了长视频序列长度，temporal transformer 负责长期记忆，spatial MaskGIT 再恢复每帧细节。"
```

### GAIA-1

```yaml
id: gaia1
num: 14
name: GAIA-1
full_name: 自动驾驶生成式AI (Generative AI for Autonomy)
year: '2023.10'
org: Wayve
parent: videogpt
paper_url: https://arxiv.org/abs/2309.17080
project_url: ''
category: generative
motivation: 9B参数模型预测驾驶场景理解交通规则
```

#### 📝 一句话总结
GAIA-1 将自动驾驶世界建模表述为多模态 token 的下一 token 预测问题，用视频、文本和动作条件生成可控驾驶视频，解决了真实道路长尾场景难以穷尽采集和测试的问题。

#### 🎯 核心要点
- **多模态输入**：同时利用视频、文本和动作信号，生成真实感驾驶场景
- **统一 token 序列建模**：将视频和文本离散化为 token，将速度、曲率等动作标量投影到共享表示
- **自回归 world model**：核心 6.5B 参数 Transformer 根据历史图像 token、文本 token 和动作 token 预测未来图像 token
- **视频扩散解码器**：2.6B 参数 diffusion decoder 将预测出的图像 token 转回像素视频，提高视觉真实感和时序一致性
- **总规模超过 9B 参数**：Wayve 技术报告版本比早期 1B GAIA-1 扩展到 9B 级别
- **驾驶数据训练**：使用 2019-2023 年在伦敦采集的约 4,700 小时专有驾驶数据
- **可控生成能力**：支持未来 rollout、文本改写场景属性、动作控制 ego vehicle 行为、无条件采样等模式

#### 🔬 深入细节
##### 核心示意图

![GAIA-1 模型架构](https://wayve.ai/wp-content/uploads/2023/09/gaia_schematic_animated_v2.gif)
*图：GAIA-1 将视频、文本和动作编码到共享 token 序列，经 autoregressive transformer 预测未来 token，再用视频 diffusion decoder 还原为驾驶视频。*

##### 动机与背景

自动驾驶系统需要理解未来可能发生什么，尤其是 ego vehicle 的动作会如何改变周围交通参与者和道路状态。真实世界采集覆盖不了所有危险组合，传统仿真又常缺少视觉真实感和行为多样性。GAIA-1 的目标是做一个神经世界模型，让模型从真实驾驶数据中学习“场景如何随动作和语义条件演化”。

GAIA-1 把世界建模转成类似语言模型的 next-token prediction。给定历史视频 token \(v_{\le t}\)、文本 token \(c\) 和动作 token \(a_{t:t+H}\)，world model 学习未来视觉 token 分布：

$$
p_\theta(v_{t+1:t+H} \mid v_{\le t}, c, a_{t:t+H})
=
\prod_{i=t+1}^{t+H}
p_\theta(v_i \mid v_{<i}, c, a_{t:i})
$$

视频 tokenizer/encoder 负责把视觉输入离散化，文本 encoder 负责将提示词变成条件 token，动作 encoder 则把速度、曲率等连续控制量投影到同一个时间轴上。所有条件在时间上对齐后输入 Transformer。

生成出的并不是最终像素，而是未来图像 token。GAIA-1 再用视频 diffusion decoder 将 token 转换为像素空间视频。这个设计结合了 autoregressive token model 的可控序列建模能力和 diffusion decoder 的高保真视觉生成能力。

##### 算法伪代码

```python
# GAIA-1 world model training
initialize(video_encoder, text_encoder, action_encoder)
initialize(autoregressive_world_model, video_diffusion_decoder)

for clip, text_prompt, ego_actions in driving_batches:
    video_tokens = video_encoder.discretize(clip)
    text_tokens = text_encoder(text_prompt)
    action_tokens = action_encoder(ego_actions)  # speed, curvature, steering-like signals

    aligned_tokens = temporal_align(video_tokens, text_tokens, action_tokens)
    logits = autoregressive_world_model(aligned_tokens[:-1])
    token_loss = cross_entropy(logits, video_tokens[1:])

    predicted_tokens = sample_or_teacher_force(logits)
    reconstructed_video = video_diffusion_decoder(predicted_tokens)
    decoder_loss = diffusion_reconstruction_loss(reconstructed_video, clip)

    optimize(all_trainable_modules, token_loss + decoder_loss)

# Controlled generation
context_tokens = video_encoder.discretize(context_video)
condition = encode(text="make it snowy at night", actions=future_speed_curvature)
future_tokens = autoregressive_sample(world_model, context_tokens, condition)
future_video = video_diffusion_decoder(future_tokens)
```

##### 方法机制拆解

GAIA-1 的文本条件可以修改场景属性，例如天气、光照、交通灯颜色或道路状态；动作条件可以控制 ego vehicle 的未来行为，例如转向、速度和曲率。多模态条件让生成结果不仅是“看起来像驾驶视频”，还可以成为可干预的 what-if 场景。

与 VideoGPT 相比，GAIA-1 的任务更具体也更具控制需求。VideoGPT 主要展示通用视频生成，而 GAIA-1 面向自动驾驶：它需要生成道路几何、交通参与者、信号灯、车道线和 ego motion 之间的耦合关系。这要求模型同时学习视觉语义和交通动力学。

与传统仿真相比，GAIA-1 不依赖显式建模所有几何和材质，而是从真实驾驶视频中学习分布。优势是视觉真实感和场景多样性更强；限制是自回归长视频生成计算成本高，且 GAIA-1 技术报告阶段主要聚焦单摄像头输出，完整多相机闭环评估仍是后续方向。

> 💡 关键：GAIA-1 的世界模型不是单纯的视频生成器，而是条件化的驾驶未来预测器。动作条件使它能回答“如果车这样开，场景会怎样变化”。

#### 🧪 练习题
```yaml
question: "GAIA-1 将驾驶世界建模为 next-token prediction 的主要好处是什么？"
options:
  - "可以把视频、文本和动作统一到序列建模框架中，并预测可控的未来驾驶场景"
  - "可以完全不需要驾驶视频数据"
  - "可以只用单帧图像完成所有交通规则推理"
  - "可以避免任何形式的视频解码器"
answer: 0
explain: "GAIA-1 把不同模态映射为 token 序列，用自回归 Transformer 预测未来视觉 token，再由视频扩散解码器生成像素视频。"
```

### Genie

```yaml
id: genie
num: 15
name: Genie
full_name: 精灵 (Generative Interactive Environments)
year: '2024.02'
org: Google DeepMind
parent: videogpt
paper_url: https://arxiv.org/abs/2402.15391
project_url: ''
category: generative
motivation: 从无标注视频学习生成式交互环境
```

#### 📝 一句话总结
Genie 从无动作标注的互联网视频中同时学习视频 tokenizer、latent action model 和 dynamics model，使用户能用离散 latent action 逐帧控制生成环境，解决了交互式世界模型依赖人工动作标签和特定环境数据的问题。

#### 🎯 核心要点
- **生成式交互环境**：不是只生成固定视频，而是根据用户动作逐帧生成可交互轨迹
- **三组件架构**：spatiotemporal video tokenizer、latent action model、autoregressive dynamics model
- **无动作标签学习**：latent action model 从相邻帧中推断动作 code，不依赖游戏手柄、机器人控制或人工标注
- **VQ tokenization**：视频 tokenizer 将原始帧压缩为离散 token，降低 dynamics model 的建模难度
- **ST-transformer**：空间层和时间层分解注意力，处理视频 token 的高维时空结构
- **MaskGIT dynamics**：给定历史视频 token 和 latent actions，预测下一帧 token
- **规模化 foundation world model**：最终模型达到 11B 级别，可由文本生成图、手绘图、照片等作为 prompt 启动
- **潜在动作可迁移**：学到的 latent action 可用于从未见过的视频中提取行为标签，支持 imitation/behavior cloning 实验

#### 🔬 深入细节
##### 核心示意图

![Genie 模型训练](https://arxiv.org/html/2402.15391v1/figures/genie_architecture.png)
*图：Genie 将视频帧 token 化，latent action model 从相邻帧推断动作，dynamics model 根据历史 token 和 latent action 预测后续帧。*

##### 动机与背景

传统世界模型常需要动作标签：游戏环境有按键，机器人数据有关节或末端执行器动作。但互联网视频绝大多数没有动作标注。Genie 的核心问题是：能否仅从视频帧变化中反推出“可控动作空间”，并把这个动作空间用于生成可交互环境。

Genie 的 video tokenizer 将视频帧 \(x_{1:T}\) 压缩成离散 token：

$$
z_{1:T} = \text{Tokenizer}(x_{1:T})
$$

latent action model 观察相邻帧，推断中间动作：

$$
a_t = \text{LAM}(x_t, x_{t+1})
$$

dynamics model 则学习在历史 token 和 latent actions 条件下预测下一帧 token：

$$
p_\theta(z_t \mid z_{<t}, a_{<t})
$$

这个分解让 Genie 可以在推理时接受用户选择的 latent action。虽然用户最初不知道每个 latent action 的含义，但论文观察到动作含义在不同 prompt 中相对一致，类似学习一个新游戏手柄的按键映射。

##### 算法伪代码

```python
# Phase 1: train video tokenizer
for video in unlabeled_video_batches:
    z = tokenizer.encode(video)
    recon = tokenizer.decode(z)
    loss = reconstruction_loss(video, recon) + vq_commitment_loss(z)
    optimize(tokenizer, loss)

# Phase 2: train latent action model and dynamics model
freeze(tokenizer)
for video in unlabeled_video_batches:
    z = tokenizer.encode(video)
    latent_actions = lam(video[:-1], video[1:])  # inferred from pixels

    logits = dynamics_model(z[:-1], stopgrad(latent_actions))
    loss = token_prediction_loss(logits, z[1:])
    loss += latent_action_regularization(latent_actions)
    optimize(lam, dynamics_model, loss)

# Interactive inference
z_current = tokenizer.encode(prompt_frame)
while user_or_agent_is_playing:
    action_id = get_discrete_latent_action()
    z_next = dynamics_model.sample_next(z_current, action_id)
    frame_next = tokenizer.decode(z_next)
    render(frame_next)
    z_current = append_context(z_current, z_next)
```

##### 方法机制拆解

Video tokenizer 是 Genie 的视觉基础。它把原始帧转换为离散 token，使 dynamics model 不必直接生成像素。论文使用 spatiotemporal transformer tokenizer，并发现扩大 decoder 比扩大 encoder 更有效，因为最终交互体验对解码质量敏感。

Latent Action Model 是 Genie 与普通视频生成模型的关键区别。它不是从外部动作标签学习，而是通过相邻帧变化学习一个离散动作 codebook。这个 codebook 不必对应人类语义中的“左、右、跳”，但如果同一 code 在不同场景中产生一致变化，它就可以作为可控接口。

Dynamics model 接收历史 video tokens 和 latent actions，生成下一帧 token。它本质上是一个 action-conditioned video model，但动作来自模型自己从无标注视频中学习到的 latent space。这样，Genie 可以从平台游戏、机器人视频或其他互联网视频中学习交互规则。

与 VideoGPT 相比，Genie 多了 latent action inference 和交互式闭环。VideoGPT 更像一次性采样视频序列，Genie 则每一步接收动作、生成观察、再接收动作。这个“frame-by-frame control”是把视频生成模型转化为环境模拟器的关键。

> 💡 关键：Genie 的动作不是人工给定的真实动作，而是从视频变化中自监督发现的 latent action。只要这些动作在生成时保持一致，用户或 agent 就能把它当作控制接口。

#### 🧪 练习题
```yaml
question: "Genie 能在无动作标注视频上学习交互控制，关键依赖哪个模块？"
options:
  - "Latent Action Model，从相邻帧中推断离散潜在动作"
  - "只用于图像分类的线性 probe"
  - "人工编写的游戏物理引擎"
  - "固定的真实键盘动作标签"
answer: 0
explain: "LAM 从视频帧变化中学习 latent action code，使 dynamics model 可以在没有真实动作标签的情况下变成 action-conditioned world model。"
```

### Sora

```yaml
id: sora
num: 16
name: Sora
full_name: 空 (Sora)
year: '2024.02'
org: OpenAI
parent: videogpt
paper_url: https://openai.com/research/video-generation-models-as-world-simulators
project_url: ''
category: generative
motivation: 展现对重力碰撞等物理规律的直觉理解
```

#### 📝 一句话总结
Sora 将不同长度、分辨率和宽高比的视频/图像压缩为空间-时间 latent patches，并用文本条件 diffusion transformer 生成最长约一分钟的视频，展示了大规模视频生成模型向通用世界模拟器演化的潜力。

#### 🎯 核心要点
- **统一视觉 patch 表示**：先压缩视频到 latent space，再切成 spacetime patches 作为 Transformer token
- **Diffusion Transformer**：在带噪 latent patches 和文本条件下预测干净 patches，而不是逐像素或逐 token 自回归采样
- **原生尺寸训练**：支持可变时长、分辨率和宽高比，避免传统固定裁剪导致的构图损失
- **文本条件增强**：使用视频重描述和 GPT prompt expansion，提高文本遵循和细节可控性
- **多输入能力**：除 text-to-video 外，还支持图像动画、视频延展、视频编辑和视频插值
- **涌现模拟能力**：在 3D 一致性、长程物体持久性、简单交互、Minecraft 类数字世界模拟上表现出规模化收益
- **依据限制**：OpenAI 技术报告明确未公开完整模型和实现细节，因此本文按公开报告中的方法框架进行精读

#### 🔬 深入细节
##### 核心示意图

![Sora spacetime patches](https://images.ctfassets.net/kftzwdyauwt9/1d2955dd-9d05-4f33-13073dc9301d/8dc0bae8cb98054d083ab3cc3ade6859/figure-patches.png?fm=webp&q=90&w=3840)
*图：Sora 将视频压缩为 latent 表示，再切成 spacetime patches，让 Transformer 能在不同尺寸和时长的视频上训练。*

##### 动机与背景

许多早期视频生成方法只训练固定尺寸、固定长度的短片段，例如把所有视频裁剪成 4 秒、256x256。这样做简化了训练，但丢失了真实视频的构图、纵横比、镜头时长和运动分布。Sora 的技术报告把问题改成：如何像语言模型处理任意文本 token 一样，用统一 token 表示处理多样化视觉数据。

Sora 首先训练 video compression network，将原始视频压缩到低维 latent space：

$$
z = E_{\text{video}}(x), \quad \hat x = D_{\text{video}}(z)
$$

然后把 \(z\) 切成 spacetime patches。图像可以看作只有一帧的视频，因此同一 patch 表示同时适用于图片和视频。推理时，通过布置不同形状的随机噪声 patch 网格，就能控制输出视频的分辨率、宽高比和时长。

扩散训练目标可以抽象为：给定带噪 latent patches \(z_t\)、扩散时间 \(t\) 和文本条件 \(c\)，模型预测原始干净 patches 或噪声：

$$
\mathcal{L}_{\text{diff}} =
\mathbb{E}_{z_0,t,\epsilon,c}
\left[
\left\|
\epsilon - \epsilon_\theta(z_t, t, c)
\right\|_2^2
\right]
$$

报告强调 Sora 是 diffusion transformer。Transformer 的作用是让所有 spacetime patches 在统一序列中通信，扩散过程负责从噪声逐步去噪到高保真视频。

##### 算法伪代码

```python
# Publicly described Sora-style training flow
initialize(video_compressor, video_decoder, diffusion_transformer)

for visual_sample, caption in image_video_batches:
    # visual_sample may be image or video with native size/duration
    latent = video_compressor(visual_sample)
    patches = extract_spacetime_patches(latent)

    detailed_caption = recaption_or_expand(caption)
    t = sample_diffusion_timestep()
    noise = sample_gaussian_like(patches)
    noisy_patches = add_noise(patches, noise, t)

    pred_noise = diffusion_transformer(noisy_patches, t, text=detailed_caption)
    loss = mse(pred_noise, noise)
    optimize(diffusion_transformer, loss)

# Sampling
shape = choose_patch_grid(duration, resolution, aspect_ratio)
patches = gaussian_noise(shape)
for t in reversed(diffusion_schedule):
    patches = denoise_step(diffusion_transformer, patches, t, text_prompt)
latent_video = combine_spacetime_patches(patches)
video = video_decoder(latent_video)
```

##### 方法机制拆解

Spacetime patches 是 Sora 与 VideoGPT 类离散自回归方法的关键差别。VideoGPT 依赖 VQ code 序列逐 token 建模，Sora 则在连续 latent patches 上用扩散去噪。这样做可以让模型在一次去噪网络调用中让不同位置、不同帧之间相互注意，适合高分辨率长视频。

原生尺寸训练解决了构图问题。若所有训练视频都被裁剪为正方形，模型会学到错误的取景先验，生成时容易截断主体。Sora 保留原始宽高比和时长分布，因此可以直接生成横屏 1920x1080、竖屏 1080x1920 以及中间比例的视频。

文本理解并非只靠原始用户 prompt。报告使用类似 DALL-E 3 的重描述策略：先用 captioner 为训练视频生成高描述性文本，再用 GPT 将短 prompt 扩展成更具体的 caption。这样视频模型得到的条件信号更精确，文本遵循和细节一致性更好。

Sora 的“世界模拟器”能力来自规模化而非显式物理引擎。报告列举的 3D 一致性、物体持久性、交互影响和 Minecraft 模拟说明模型在大量视频上学到了部分物理和场景动力学。但报告也明确指出，Sora 仍会在玻璃破碎、进食状态变化、长视频一致性和突然出现物体等方面失败。

> ⚠️ 注意：Sora 技术报告没有公开参数规模、训练数据细节和完整架构超参，因此不能把这里的伪代码理解为可复现实现，只能视为公开描述的方法抽象。

#### 🧪 练习题
```yaml
question: "Sora 使用 spacetime latent patches 的主要目的是什么？"
options:
  - "把不同分辨率、宽高比和时长的视频统一成 Transformer 可处理的 token 序列"
  - "把所有视频强制裁剪成固定正方形"
  - "完全移除文本条件"
  - "只生成单帧图像，避免时间建模"
answer: 0
explain: "Sora 先压缩视频再切分时空 patch，使同一 diffusion transformer 能处理可变尺寸、可变时长的视频和图像。"
```

### Genie 2

```yaml
id: genie2
num: 17
name: Genie 2
full_name: 精灵2 (Large-scale Foundation World Model)
year: '2024.12'
org: Google DeepMind
parent: genie
paper_url: https://deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model/
project_url: ''
category: generative
motivation: 11B参数支持实时3D环境生成与交互
```

#### 📝 一句话总结
Genie 2 将 Genie 的交互式世界模型扩展到可由单张图像提示生成、可用键盘鼠标控制的 3D playable environments，并用自回归 latent diffusion dynamics 支持 embodied agent 的训练和评估。

#### 🎯 核心要点
- **单图提示生成世界**：从 Imagen 3 生成图、概念图或真实照片启动一个可交互 3D 环境
- **动作可控**：人类或 AI agent 通过键盘和鼠标逐步输入动作，模型生成下一帧观察
- **自回归 latent diffusion world model**：视频经 autoencoder 进入 latent frames，再由 causal transformer dynamics model 逐帧预测
- **Classifier-free guidance**：推理时用于增强动作可控性
- **长程一致性**：官方博客展示最长约一分钟的世界一致性，多数样例为 10-20 秒
- **涌现能力**：支持长程记忆、3D 结构、物体交互、角色动画、NPC、水/烟/重力/光照/反射等模拟现象
- **Agent 评估用途**：DeepMind 展示 SIMA agent 在 Genie 2 生成的新环境中按自然语言指令完成任务
- **依据限制**：官方博客给出架构级描述但没有完整论文超参；YAML 标注 11B 参数，公开博客没有给出完整参数表

#### 🔬 深入细节
##### 核心示意图

![Genie 2 推理流程](https://lh3.googleusercontent.com/NWpfbDUhaC1ivgNDaRc7d3kmDjVh5vGPPOJV34yN6trHaFIPmBVasa7URKn-UQo0-l3PegAOOGUa78Bu4eSi2uht2zGm3KeIGCcVfw2a0FjyZGim7w%3Dw1440)
*图：Genie 2 从图像提示编码 latent world state，并在每一步接收键盘/鼠标动作，自回归生成下一帧。*

##### 动机与背景

Genie 1 证明了从无标注视频中学习 2D 交互环境是可行的，但未来 embodied agents 需要更丰富的训练和评估环境：3D 视角、复杂物体交互、长期记忆、NPC 行为以及多样化任务。真实游戏和模拟器制作成本高，Genie 2 的目标是把“生成环境”本身变成一个基础模型能力。

官方描述中，Genie 2 是 autoregressive latent diffusion model。给定图像提示 \(x_0\)，autoencoder 得到 latent frame \(z_0\)。随后在每个时间步接收动作 \(a_t\)，causal transformer dynamics model 预测下一 latent：

$$
p_\theta(z_{t+1} \mid z_{\le t}, a_{\le t}, c)
$$

其中 \(c\) 是 prompt 或场景条件。由于 latent transition 使用 diffusion 生成，可将单步采样写成去噪过程：

$$
z_{t+1}^{(k-1)} =
\text{Denoise}_\theta(z_{t+1}^{(k)}, k, z_{\le t}, a_{\le t}, c)
$$

生成后的 latent 再由 decoder 转回图像帧。和 Genie 1 相比，Genie 2 不只学习抽象 latent actions，而是面向通用键盘/鼠标控制和 3D playable worlds。

##### 算法伪代码

```python
# Publicly described Genie 2 inference abstraction
prompt_image = imagen3_or_user_image(prompt)
z_context = autoencoder.encode(prompt_image)

while episode_not_done:
    action = read_keyboard_mouse_or_agent_action()

    # Autoregressive latent diffusion next-frame generation
    z_next = gaussian_latent()
    for denoise_step in reversed(schedule):
        z_next = transformer_dynamics.denoise(
            z_next,
            denoise_step,
            context_latents=z_context,
            actions=history_actions + [action],
            guidance="classifier_free"
        )

    frame = autoencoder.decode(z_next)
    render(frame)
    z_context = append_context(z_context, z_next)
    history_actions.append(action)
```

##### 方法机制拆解

Genie 2 的关键接口是“single prompt image + action stream”。用户先用文本生成一张图，或直接提供照片/概念图，模型把它解释成一个可进入的世界。此后每一步动作都改变下一个观察，这使模型更像环境模拟器而不是离线视频生成器。

Causal transformer dynamics model 的作用类似语言模型中的 next-token model，只是 token 换成 autoencoder latent frames，并额外条件化动作。causal mask 保证当前预测只依赖过去观察和动作历史，这符合交互环境的时间因果结构。

自回归 latent diffusion 与 Genie 1 的离散 token dynamics 不同。它用 diffusion 的逐步去噪来生成下一帧 latent，理论上更适合高保真 3D 场景、复杂光照和视觉细节。官方博客还提到，未蒸馏 base model 质量更高，蒸馏版本可实时游玩但质量下降。

Genie 2 在 agent 训练上的意义是“无限新环境”。如果每个 prompt 都能生成一个未见过的可交互世界，那么 agent 可以在合成环境中进行泛化评估。DeepMind 展示 SIMA agent 在 Genie 2 生成场景中执行“打开蓝门”“绕到房子后面”等任务，说明这种世界模型可作为评估平台。

> ⚠️ 注意：Genie 2 官方博客没有发布可复现实验细节和完整训练配方，因此它更接近研究发布和技术报告，而不是完整论文。本文的算法解释依据公开架构描述和 YAML 元信息。

#### 🧪 练习题
```yaml
question: "Genie 2 与 Genie 1 相比，最关键的扩展是什么？"
options:
  - "从 2D 交互视频扩展到单图提示的可控 3D playable worlds，并使用自回归 latent diffusion dynamics"
  - "只保留静态图像生成，不再支持动作输入"
  - "放弃世界模型，改为纯文本语言模型"
  - "只能在已有游戏引擎地图中重放固定轨迹"
answer: 0
explain: "Genie 2 从图像提示生成可交互 3D 环境，逐步接收动作并由 latent diffusion dynamics 生成下一观察，用于 agent 训练和评估。"
```

### GAIA-3

```yaml
id: gaia3
num: 18
name: GAIA-3
full_name: 自动驾驶生成式AI 3 (GAIA-3)
year: '2026.03'
org: Wayve
parent: gaia1
paper_url: https://wayve.ai/news/series-d-funding-1-2-billion/
project_url: ''
category: generative
motivation: 生成极端长尾场景助力伦敦L4级测试
```

#### 📝 一句话总结
GAIA-3 将 Wayve 的驾驶世界模型从视觉合成推进到可度量的安全评估，使用 15B 参数 latent diffusion world model 生成受控、可重复的反事实驾驶场景，解决真实道路长尾风险难以规模化复现和验证的问题。

#### 🎯 核心要点
- **资料限制说明**：清单 `paper_url` 指向融资新闻，非 GAIA-3 技术页；本文依据 Wayve 官方 `GAIA-3: Scaling World Models to Power Safety and Evaluation` 页面完成
- **15B latent diffusion world model**：官方技术页披露 GAIA-3 是 15B 参数、面向自动驾驶离线评估的潜在扩散世界模型
- **规模化训练**：相比 GAIA-2 使用约 5 倍训练计算、约 10 倍数据，覆盖 9 个国家和 3 个大洲
- **更大视频 tokenizer**：新 tokenizer 规模约为 GAIA-2 的 2 倍，强化行人、骑行者、标志、交通控制设施等安全关键结构
- **World-on-Rails**：改变 ego vehicle 轨迹时保持其他车辆、静态场景、光照和天气等元素一致
- **安全关键场景生成**：可生成碰撞、近碰撞、NCAP 风格 CCFTAP/CCRS 等可重复测试场景
- **离线评估套件**：通过动作条件和轨迹扰动生成多个 what-if 测试，评估驾驶模型从偏离状态恢复的能力
- **Embodiment transfer**：用少量未配对目标 rig 样本，把同一场景重渲染到不同车辆相机配置

#### 🔬 深入细节
##### 核心示意图

![GAIA-3 embodiment transfer](https://wayve.ai/wp-content/uploads/2025/11/EmbodimentGraph-1920x737.jpg)
*图：GAIA-3 支持把同一驾驶场景迁移到不同车辆和相机 rig，用于跨 embodiment 的评估复用。*

##### 动机与背景

真实道路测试是自动驾驶安全验证的必要环节，但效率很低：模型越强，真实道路上可观察错误越少，想得到统计显著的安全结论就需要更多里程。传统仿真可控但不够真实，3D 重建仿真更真实但难处理遮挡和动态交通参与者。GAIA-3 试图把真实数据的视觉/行为真实性与仿真的可控性结合起来。

GAIA-3 的核心任务可以抽象成条件化世界重生成。给定真实种子序列 \(x_{1:T}^{\text{seed}}\)、ego 轨迹或动作条件 \(u_{1:T}^{\text{ego}}\)、外观条件 \(c\) 和相机 embodiment \(e\)，模型生成一个结构一致但可控变化的视频：

$$
x'_{1:T} \sim
p_\theta(
x_{1:T}
\mid x_{1:T}^{\text{seed}},
u_{1:T}^{\text{ego}},
c,
e
)
$$

作为 latent diffusion model，它在压缩 latent 空间中完成去噪生成：

$$
\mathcal{L}_{\text{diff}} =
\mathbb{E}_{z_0,t,\epsilon}
\left[
\|\epsilon - \epsilon_\theta(z_t, t, \text{conditions})\|_2^2
\right]
$$

条件不仅包括动作，还包括光照、天气、语义外观、相机 rig 和 seed scene structure。这样 GAIA-3 可以只改变被指定的因素，其他因素保持一致，用于可归因的评估。

##### 算法伪代码

```python
# GAIA-3-style counterfactual evaluation generation
seed_sequence = load_real_driving_clip()
scene_latents = video_tokenizer.encode(seed_sequence)

for perturbation in evaluation_suite:
    conditions = {
        "ego_trajectory": perturbation.ego_path,      # drift left, too fast, collision path
        "appearance": perturbation.weather_or_light,  # night, rain, sunset
        "embodiment": perturbation.camera_rig,        # target vehicle sensor setup
        "world_on_rails": True                        # keep non-ego scene consistent
    }

    noisy_latents = sample_noise_like(scene_latents)
    generated_latents = latent_diffusion_denoise(
        noisy_latents,
        context=scene_latents,
        conditions=conditions
    )
    generated_video = video_tokenizer.decode(generated_latents)

    metrics = evaluate_driving_policy(
        policy=model_under_test,
        scenario=generated_video,
        metrics=["occupancy", "trajectory", "recovery"]
    )
    log(metrics)
```

##### 方法机制拆解

World-on-Rails 是 GAIA-3 从“生成好看视频”走向“可评估仿真”的关键。假设只想测试 ego 车偏离车道时模型能否恢复，那么其他交通参与者、道路、天气和场景结构应尽量保持不变。否则策略表现变化无法归因到 ego perturbation。

安全关键场景生成关注低频高风险事件，例如迎面碰撞、追尾、前车急刹、车辆横穿等。这些事件在真实道路上稀有且不能主动制造。GAIA-3 用真实场景作为基础，通过动作条件和轨迹扰动生成反事实碰撞或近碰撞视频，再用占用、轨迹等指标评估驾驶策略。

Embodiment transfer 解决的是数据复用问题。不同车型的相机高度、视场角、遮挡和车身外观不同，同一真实数据不能直接迁移。GAIA-3 通过目标 rig 的少量未配对样本学习重渲染条件，使评估套件能跨 OEM 和传感器配置复用。

Robustness 与 interpretable control 则让外观变量可控：同一几何与运动结构可以被渲染成白天、夜晚、雨天或不同光照。这样可以直接测量驾驶模型对视觉域变化的敏感性，而不是把几何变化和外观变化混在一起。

官方页面还披露，GAIA-3 相比 GAIA-2 在模型规模、tokenizer、数据覆盖和生成质量上提升明显，尤其更擅长生成清晰标志、行人运动、地标和长轨迹遮挡后的场景一致性。这些能力都服务于离线评估，而不仅是视觉展示。

> ⚠️ 注意：YAML 中的年份与链接和 Wayve 官方 GAIA-3 技术页存在不一致。为保持元信息一致，YAML 原样保留；正文按当前可访问的官方 GAIA-3 技术资料说明依据限制。

#### 🧪 练习题
```yaml
question: "GAIA-3 中 World-on-Rails 机制对自动驾驶评估的核心价值是什么？"
options:
  - "只改变指定的 ego 行为或外观因素，保持其他场景元素一致，从而让评估结果可归因"
  - "随机改变所有车辆和道路，使每次测试完全不可重复"
  - "只生成静态图片，不生成视频"
  - "替代驾驶策略模型本身，不再需要评估"
answer: 0
explain: "World-on-Rails 让反事实场景在保持背景和非 ego 动态一致的前提下改变测试变量，适合构造可重复、可度量的安全评估套件。"
```

### DeltaWorld

```yaml
id: deltaworld
num: 19
name: DeltaWorld
full_name: 增量世界 (Efficient World Modeling with Delta Tokens)
year: '2026.04'
org: ETH Zurich
parent: genie2
paper_url: https://arxiv.org/abs/2604.04913
project_url: ''
category: generative
motivation: 仅编码帧间差异计算量降低2000倍
```

#### 📝 一句话总结
DeltaWorld 提出用 DeltaTok 将相邻帧在视觉基础模型特征空间中的变化压缩成单个连续 delta token，并在这些 token 上训练生成式世界模型，解决了视频世界模型因空间 token 过多和多次采样导致的高计算成本问题。

#### 🎯 核心要点
- **DeltaTok 单 token 差分压缩**：只编码相邻帧 VFM 特征差异，而不是重建整帧空间特征图
- **一维时间序列世界模型**：将视频从时空三维 token 网格压缩为每帧一个 delta token 的时间序列
- **Best-of-Many 生成训练**：并行产生多个未来假设，只监督最接近真实未来的样本
- **单次前向多未来预测**：推理时用不同噪声查询在一次前向中输出多个合理未来
- **密集预测评估**：在 Cityscapes、VSPW 语义分割和 KITTI 深度预测等 dense forecasting 任务上评估
- **高效率收益**：论文报告相对既有生成式世界模型参数少 35 倍以上、FLOPs 少约 2000 倍

#### 🔬 深入细节
![DeltaWorld 总览](https://deltatok.github.io/assets/fig4_deltaworld.svg)
*图：DeltaWorld 使用单个 delta token 表示每个未来步的视觉变化，并在 token 序列上生成多种未来。*

##### 算法伪代码

```python
# DeltaWorld 训练与推理核心流程
for video in dataset:
    features = frozen_vfm(video.frames)              # DINO/CLIP 类 VFM patch features
    delta_tokens = []
    for t in range(1, T):
        z_t = DeltaTok.encode(features[t - 1], features[t])
        delta_tokens.append(z_t)

    # Best-of-Many: 一次生成 K 个未来 token 假设
    hypotheses = DeltaWorld(context=delta_tokens[:c], noise_queries=sample_noise(K))
    losses = [smooth_l1(h, target_delta_tokens) for h in hypotheses]
    loss = min(losses)                               # 只监督最接近真实未来的样本
    update(loss)

# 推理
samples = DeltaWorld(context_delta_tokens, sample_noise(K))
future_features = rollout_decode(previous_feature, samples, DeltaTok.decode)
```

##### 动机与背景

视频世界模型需要预测未来，而真实未来通常是多模态的：行人可能左转或直行，车辆可能加速或减速。判别式模型用回归损失输出单一预测，容易变成“平均未来”；扩散或自回归生成模型可以采样多种未来，但常常需要多次前向、逐空间 patch 生成，成本很高。

DeltaWorld 的切入点是：下游任务并不总需要像素级重建，很多决策任务只需要 VFM 特征中的语义和几何信息。更进一步，相邻帧的大部分内容不变，真正需要预测的是“从上一帧到下一帧发生了什么”。因此论文把目标从“生成整帧特征图”改成“生成单个变化 token”。

##### 核心机制：DeltaTok

给定相邻两帧的视觉基础模型特征 \(F_{t-1}\) 与 \(F_t\)，DeltaTok 编码器学习一个紧凑表示：

$$
z_t = E_{\Delta}(F_{t-1}, F_t)
$$

解码器则利用上一帧特征和 delta token 重建当前帧特征：

$$
\hat{F}_t = D_{\Delta}(F_{t-1}, z_t)
$$

训练目标是让 \(\hat{F}_t\) 接近 \(F_t\)，通常可用 MSE 或 smooth L1 形式：

$$
\mathcal{L}_{tok} = \|D_{\Delta}(F_{t-1}, E_{\Delta}(F_{t-1}, F_t)) - F_t\|_2^2
$$

这个设计的直觉很直接：如果场景没有变化，delta token 可以接近“无变化”；如果只有局部运动，token 只需表达变化的语义方向，而不用重新携带整张图的空间背景。

##### 生成式世界模型与 Best-of-Many

DeltaWorld 在 delta token 序列上预测未来。设历史 token 为 \(z_{1:c}\)，模型用多个随机查询 \(\epsilon_k\) 生成 \(K\) 个未来候选：

$$
\hat{z}_{c+1:T}^{(k)} = f_{\theta}(z_{1:c}, \epsilon_k)
$$

Best-of-Many 训练只对最接近真实未来的候选反传：

$$
\mathcal{L}_{BoM} = \min_{k \in \{1,\dots,K\}} d(\hat{z}_{c+1:T}^{(k)}, z_{c+1:T})
$$

这避免了普通回归把多种未来平均掉，也避免了扩散模型多步 denoising 的高开销。推理时保留所有候选，就能在单次前向里获得多样未来。

##### 与传统视频生成世界模型的区别

传统视频生成器通常在像素 latent 或空间 patch token 上建模，序列长度随分辨率和时间一起增长。DeltaWorld 通过 delta token 将每个时间步压到一个 token，使未来预测主要沿时间维展开。对 \(512 \times 512\) 输入，论文报告可达到约 \(1024\times\) token reduction；在另一个 DINO-Foresight 迁移实验中，delta token 也可带来约 \(2048\times\) token reduction。

> 💡 关键：DeltaWorld 不是追求直接生成最漂亮的 RGB 视频，而是让世界模型在 VFM 特征空间中高效生成“对下游感知任务有用”的多未来表示。

#### 🧪 练习题
```yaml
question: "DeltaWorld 计算量显著下降的核心原因是什么？"
options:
  - "完全取消未来预测，只复制最后一帧"
  - "把每帧空间特征图压缩成表示帧间变化的单个 delta token"
  - "使用更大的扩散模型减少训练轮数"
  - "只在低分辨率 RGB 像素上训练"
answer: 1
explain: "DeltaTok 只编码相邻帧的 VFM 特征差异，将时空 token 网格压缩为一维时间 token 序列，因此生成多个未来的成本大幅降低。"
```

### WorldReel

```yaml
id: worldreel
num: 20
name: WorldReel
full_name: 世界卷轴 (4D Video via Consistent Geometry)
year: '2026.03'
org: SenseTime
parent: sora
paper_url: https://arxiv.org/abs/2603.worldreel
project_url: ''
category: generative
motivation: 几何一致性建模解决视频生成幻觉问题
```

#### 📝 一句话总结
WorldReel 提出把视频生成从单纯 RGB 帧生成提升为联合生成 RGB、点图、相机轨迹、光流和 3D scene flow 的 4D 生成框架，解决视频扩散模型在大相机运动和动态物体下容易出现几何漂移与时空不一致的问题。

#### 🎯 核心要点
- **输入链接限制**：清单中的 `https://arxiv.org/abs/2603.worldreel` 疑似占位符；实际可访问公开论文为 `https://arxiv.org/abs/2512.07821`
- **统一 4D 输出**：同时生成 RGB、per-frame geometry、calibrated camera trajectory、optical flow、scene flow 和 object masks
- **geo-motion augmented latent**：在视频扩散 Transformer 的 latent 中显式携带几何与运动信息
- **appearance-independent 表征**：减少外观纹理泄漏到几何/运动通道，提升跨视角和跨光照泛化
- **Temporal DPT 多任务解码器**：共享轻量 DPT 风格主干，任务头分别预测点图、相机、动态 mask、scene flow
- **混合数据训练**：结合有精确 4D 标注的合成数据和更具真实外观多样性的真实视频

#### 🔬 深入细节
![WorldReel 框架图](https://arxiv.org/html/2512.07821/figures/figure2_v2.png)
*图：WorldReel 在视频扩散模型中加入 geo-motion latent，并通过 temporal DPT 解码统一 4D 表征。*

##### 算法伪代码

```python
# WorldReel 的联合 4D 视频生成训练
for batch in mixed_synthetic_real_videos:
    rgb_latent = video_vae.encode(batch.rgb)
    geo_motion_latent = encode_geometry_motion(
        depth=batch.depth_or_pseudo_depth,
        optical_flow=batch.flow,
        camera=batch.camera,
        scene_flow=batch.scene_flow,
        mask=batch.dynamic_mask,
    )

    noisy_latent, noise, t = diffusion_forward(rgb_latent, geo_motion_latent)
    pred = video_dit(noisy_latent, t, prompt=batch.prompt, geo_motion=geo_motion_latent)

    rgb_loss = diffusion_loss(pred.rgb, noise.rgb)
    task_outputs = temporal_dpt(pred.geo_motion_features)
    four_d_loss = (
        l1(task_outputs.pointmap, batch.pointmap)
        + pose_loss(task_outputs.camera, batch.camera)
        + huber(task_outputs.scene_flow, batch.scene_flow)
        + bce(task_outputs.dynamic_mask, batch.dynamic_mask)
    )
    consistency_loss = static_geometry_consistency() + dynamic_motion_smoothness()
    update(rgb_loss + four_d_loss + consistency_loss)
```

##### 动机与背景

强视频生成模型可以产生逼真的局部纹理和运动，但它们通常没有维护“同一个 3D 世界随时间演化”的内部状态。因此在视角外推、相机大幅移动或非刚体运动中，常见失败包括物体形状漂移、背景几何闪烁、相机运动和物体运动相互混淆。

WorldReel 的目标不是只让视频“看起来连续”，而是让生成过程显式输出一个随时间一致的 4D 场景。这里的 4D 指 3D 几何随时间演化：每帧有点图/深度，相机轨迹可标定，动态区域有 3D scene flow 描述其运动。

##### 核心机制：geo-motion augmented latent

普通 latent video diffusion 可以写成：

$$
\epsilon_{\theta}(z_t, t, c)
$$

其中 \(z_t\) 是带噪视频 latent，\(c\) 是文本或图像条件。WorldReel 扩展为：

$$
\epsilon_{\theta}(z_t, g_t, t, c)
$$

\(g_t\) 是几何-运动增强 latent，包含与外观解耦的深度、点图、相机、光流和 3D scene flow 信息。这样做的关键收益是把生成约束从“RGB 相邻帧像不像”提升到“同一个 3D 结构在不同时间和视角下是否一致”。

##### 多任务 4D 解码与正则

WorldReel 使用 temporal DPT-style decoder 将 latent 特征映射为多个 4D 任务输出。共享 backbone 学习统一几何表示，最后用轻量任务头预测不同输出：

$$
(\hat{P}, \hat{C}, \hat{F}_{3D}, \hat{M}) = D_{\phi}(h)
$$

其中 \(\hat{P}\) 是 pointmap，\(\hat{C}\) 是相机参数，\(\hat{F}_{3D}\) 是 scene flow，\(\hat{M}\) 是动态 mask。训练损失组合为：

$$
\mathcal{L} =
\mathcal{L}_{diff}
+ \lambda_p \mathcal{L}_{point}
+ \lambda_c \mathcal{L}_{camera}
+ \lambda_f \mathcal{L}_{flow}
+ \lambda_m \mathcal{L}_{mask}
+ \lambda_r \mathcal{L}_{reg}
$$

正则项区分静态背景和动态前景：背景更强调跨帧几何一致，前景更强调非刚体 motion smoothness 和 camera/object motion 解耦。

##### 数据策略与传统方法区别

只用合成数据可获得精确 4D 监督，但外观域窄；只用真实视频则标签噪声大。WorldReel 的混合策略让合成数据负责精确几何/运动监督，让真实视频补充视觉多样性。真实视频的伪标签来自深度、相机和光流估计模型，再通过 back-projection 与 scene flow 构造 4D 监督。

与后处理式 4D 重建不同，WorldReel 在生成时就联合输出视频和 4D 表征，而不是先生成 RGB 再尝试补救几何错误。这个“生成即 4D”的设计使模型更适合作为世界模型：agent 可以在同一稳定时空表征中渲染、编辑和推理。

> ⚠️ 注意：本文实际机构与 YAML 中的 `SenseTime` 不一致，公开 arXiv/CVPR 页面列出的作者机构包括 UT Austin、Adobe Research 和 UCL；本文件保留清单 YAML 原文。

#### 🧪 练习题
```yaml
question: "WorldReel 相比普通视频扩散模型最关键的改动是什么？"
options:
  - "只提高 RGB 视频分辨率"
  - "在生成过程中显式联合建模几何、相机和 3D 运动"
  - "删除所有真实视频数据，只用合成数据"
  - "把视频生成改成纯文本生成任务"
answer: 1
explain: "WorldReel 的核心是 geo-motion augmented latent 和多任务 4D 解码器，使 RGB 生成受到点图、相机轨迹和 scene flow 等几何运动约束。"
```

### OccSora

```yaml
id: occsora
num: 21
name: OccSora
full_name: 占据空 (4D Occupancy Generation)
year: '2026.02'
org: Tsinghua University
parent: sora
paper_url: https://ieeexplore.ieee.org/abstract/document/11511396/
project_url: ''
category: generative
motivation: 利用4D占据栅格提供几何稳定环境
```

#### 📝 一句话总结
OccSora 提出面向自动驾驶的扩散式 4D occupancy 世界模型，用 4D 场景 tokenizer 压缩长时序占据栅格，再用轨迹条件 DiT 生成未来占据 token，解决自回归 occupancy 预测长时程低效且几何稳定性不足的问题。

#### 🎯 核心要点
- **公开资料限制**：清单中的 IEEE 链接可能对应后续版本；主要可访问论文和图源为 arXiv:2405.20337 与项目页
- **4D occupancy 表征**：用体素语义占据网格表示 3D 场景，并显式加入时间维度
- **4D scene tokenizer**：通过类别嵌入、3D encoder、codebook 量化和 3D decoder 压缩/重建占据视频
- **扩散式世界模型**：在离散/潜在 occupancy token 空间中加噪与去噪，避免逐步自回归生成长序列
- **轨迹条件控制**：将 ego vehicle trajectory 作为条件嵌入，使生成结果与车辆运动逻辑一致
- **nuScenes + Occ3D 评估**：基于 nuScenes occupancy 标注验证 16 秒级 4D occupancy 生成能力

#### 🔬 深入细节
![OccSora 总体流程](https://arxiv.org/html/2405.20337v1/x2.png)
*图：OccSora 先用 4D occupancy tokenizer 压缩真实占据序列，再用轨迹条件扩散 Transformer 从噪声生成可控 4D occupancy token。*

##### 算法伪代码

```python
# OccSora: tokenizer + trajectory-conditioned diffusion world model
for occ_video, ego_traj in dataset:
    # 1. 4D occupancy scene tokenizer
    category_tokens = category_embedding(occ_video)       # [D, H, W, T] semantic occupancy
    latent = encoder3d(category_tokens)                   # spatiotemporal compression
    quantized = nearest_codebook(latent)                  # vector quantization
    recon_occ = decoder3d(quantized)
    tokenizer_loss = reconstruction_loss(recon_occ, occ_video) + vq_loss(latent, quantized)

    # 2. diffusion world model on compressed tokens
    eps = normal_like(quantized)
    noisy_tokens, step = add_noise(quantized, eps)
    traj_embed = mlp(ego_traj)
    eps_pred = diffusion_transformer(noisy_tokens, step, condition=traj_embed)
    diffusion_loss = mse(eps_pred, eps)

    update(tokenizer_loss + diffusion_loss)

# sampling
tokens = denoise_from_gaussian(condition=target_trajectory)
generated_4d_occ = decoder3d(tokens)
```

##### 动机与背景

自动驾驶世界模型需要理解“车辆如何运动”和“周围 3D 场景如何随时间演化”的耦合关系。只生成前视 RGB 视频容易缺失三维空间约束；只预测下一步 occupancy 又容易受自回归误差累积限制，长时程生成效率低。

OccSora 将世界状态放在 4D occupancy 空间中：每个体素位置不仅记录是否被占据，还记录语义类别，并沿时间维形成 occupancy video。这种表示比 RGB 更接近规划与安全决策所需的几何结构，也更容易检查物体是否穿插、道路空间是否连续。

##### 4D Scene Tokenizer

输入 4D occupancy 可抽象为：

$$
R_{in} \in \mathbb{R}^{D \times H \times W \times T}
$$

类别嵌入后，3D encoder 在空间和时间维上共同下采样，得到低维 latent：

$$
R_{latent} = \tau_{en}(R_{in})
$$

再用 codebook 做向量量化：

$$
z_i = \arg\min_{e_j \in \mathcal{C}} \|R_{latent,i} - e_j\|_2
$$

最后 3D decoder 将 token 还原为原始分辨率 occupancy。这个 tokenizer 的作用类似视频 VQ-VAE，但处理对象不是 RGB，而是 4D 占据语义体。

##### 轨迹条件扩散生成

扩散模型在 tokenizer 的 latent token 空间工作。前向过程逐步加入高斯噪声：

$$
q(z_t \mid z_0) = \mathcal{N}(\sqrt{\bar{\alpha}_t}z_0,\ (1-\bar{\alpha}_t)I)
$$

去噪网络学习在给定 ego 轨迹 \(a\) 和扩散步 \(t\) 时预测噪声：

$$
\mathcal{L}_{diff} =
\mathbb{E}_{z_0,\epsilon,t,a}\left[
\|\epsilon - \epsilon_{\theta}(z_t, t, a)\|_2^2
\right]
$$

轨迹 \(a\) 被编码为条件向量并注入 Transformer token 序列，使模型学会“车辆直行/右转/静止”对应的未来场景演化差异。

##### 与自回归 occupancy 世界模型的区别

OccWorld 等方法通常按时间递推下一帧 occupancy token，误差会在长 rollout 中累积。OccSora 用扩散模型一次性建模完整时空 occupancy token 分布，把长序列生成转化为条件去噪问题，因此更适合生成 16 秒级长时序场景。

> 💡 关键：OccSora 的世界模型不是“像素视频模拟器”，而是“可控 4D 几何-语义场景模拟器”，因此更贴近自动驾驶规划对可通行空间和动态障碍物的需求。

#### 🧪 练习题
```yaml
question: "OccSora 为什么选择 4D occupancy 作为世界状态？"
options:
  - "因为 occupancy token 可以直接替代所有相机图像传感器"
  - "因为 4D occupancy 同时表达 3D 几何、语义和时间演化，更适合自动驾驶规划"
  - "因为扩散模型只能处理体素数据，不能处理 RGB"
  - "因为轨迹条件只能加到 occupancy decoder 上"
answer: 1
explain: "4D occupancy 将空间占据、语义类别和时间演化统一起来，比纯 RGB 更能提供几何稳定的驾驶环境表示。"
```

### Astra

```yaml
id: astra
num: 22
name: Astra
full_name: 星辰 (Autoregressive Denoising World Model)
year: '2026.01'
org: Tsinghua/Kuaishou
parent: sora
paper_url: https://arxiv.org/abs/2512.08931
project_url: ''
category: generative
motivation: 自回归流与扩散去噪确保长时序物理连贯
```

#### 📝 一句话总结
Astra 提出把预训练视频扩散骨干改造成自回归去噪世界模型，通过 ACT-Adapter、噪声增强历史记忆和 Mixture of Action Experts 统一处理相机、机器人和键鼠等动作条件，解决长时序视频世界模型难以同时保持历史一致性和动作响应性的问题。

#### 🎯 核心要点
- **自回归去噪架构**：以 chunk 为单位从历史观测、动作和可选文本提示生成未来视频
- **Temporal causal attention**：保证模型只能使用过去 chunk 作为条件，支持流式长时程输出
- **ACT-Adapter**：在预训练 video DiT 的 latent 特征空间直接注入 action-induced shift
- **Noise-as-mask 历史记忆**：训练时污染历史帧，缓解模型过度复制历史而忽视动作的 visual inertia
- **Action-free guidance**：类似 CFG，通过有/无动作条件的速度场差异放大动作响应
- **MoAE 多动作专家**：动态路由相机 pose、机器人 pose、键鼠离散命令等异构动作模态
- **跨场景数据训练**：使用 nuScenes、Sekai、SpatialVID、RT-1、Multi-Cam Video 等多源数据

#### 🔬 深入细节
![Astra 框架图](https://arxiv.org/html/2512.08931v3/x2.png)
*图：Astra 以初始图像、历史 chunk、动作和提示为条件，逐 chunk 进行自回归去噪生成。*

##### 算法伪代码

```python
# Astra autoregressive denoising training
for video, actions, prompt in dataset:
    history, target_chunk = sample_history_and_target(video)

    # noise-as-mask: 训练时弱化历史视觉条件，避免 visual inertia
    corrupted_history = add_context_noise(history)
    action_embed = MoAE(actions)                       # camera / robot / keyboard-mouse

    z_t, noise, t = flow_matching_noising(target_chunk)
    pred_velocity = video_dit_with_act_adapter(
        noisy_target=z_t,
        history=corrupted_history,
        action=action_embed,
        prompt=prompt,
        timestep=t,
    )
    loss = flow_matching_loss(pred_velocity, noise)
    update(loss)

# inference with action-free guidance
history = [initial_frame]
for chunk_id in range(num_chunks):
    v_action = model(history, action=actions[chunk_id])
    v_null = model(history, action=null_action)
    v_guided = v_null + guidance_scale * (v_action - v_null)
    next_chunk = denoise(v_guided)
    history.append(next_chunk)
```

##### 动机与背景

现有视频生成模型的强项是短视频质量，但世界模型要求更苛刻：它必须从过去观测和动作预测未来，且能长时间滚动。简单地把视频扩散模型串成自回归 rollout 会遇到两个问题：历史帧太强导致模型只维持视觉惯性、不响应新动作；动作条件太强又会破坏时序一致性。

Astra 的核心思路是保留预训练视频扩散模型的生成先验，同时用轻量模块让它变成交互式世界模型。论文基于 Wan-2.1 类 flow transformer backbone，仅添加动作适配和专家路由，避免从零训练大视频模型。

##### 自回归去噪世界模型

设历史视频 chunk 为 \(H_{<i}\)，动作序列为 \(a_i\)，目标是生成下一段视频 \(X_i\)：

$$
p(X_i \mid H_{<i}, a_i, c)
$$

Astra 使用 flow matching / denoising 形式学习速度场：

$$
v_{\theta}(z_t, t, H_{<i}, a_i, c)
$$

推理时逐 chunk 去噪得到 \(X_i\)，再把 \(X_i\) 追加到历史中，用于下一步预测。Temporal causal attention 保证生成过程符合时间因果。

##### ACT-Adapter 与动作注入

动作不是文本提示，而是会在 latent dynamics 中导致特征位移的控制信号。Astra 将动作编码为与视频 latent 对齐的向量，并在每个 Transformer block 中通过 ACT-Adapter 注入：

$$
h_{\ell}' = h_{\ell} + A_{\ell}(e_a)
$$

其中 \(A_{\ell}\) 是初始化为近似恒等的轻量线性层。论文还冻结大部分 backbone，只微调 self-attention 和 adapter，既保留视频生成能力，又学习动作对未来状态的影响。

##### 噪声历史记忆与 visual inertia

长历史能提升一致性，但也让模型过度依赖过去画面，忽略“转向、抓取、移动”等新动作。Astra 在训练时对历史条件加入独立噪声：

$$
\tilde{H}_{<i} = H_{<i} + \sigma \epsilon
$$

这相当于 soft mask：历史仍提供场景身份和粗结构，但不能被模型直接复制。这样模型被迫综合动作和历史，而不是只做视觉外推。

##### MoAE：统一异构动作

不同任务的动作结构差异很大：相机控制可能是 7D/12D pose，机器人操作常是 7D end-effector pose，游戏/探索可能是键鼠离散输入。MoAE 先把每种动作投影到共享空间，再由 router 选择 top-k MLP experts：

$$
e_a = \sum_{m \in \text{TopK}(r(a))} \alpha_m E_m(P_m(a))
$$

这种设计让模型共享世界生成能力，同时保留动作模态专门化。论文在 397K 视频片段、约 360 小时数据上训练，并报告在 instruction following、subject/background consistency 和 motion smoothness 等指标上优于 Wan-2.1、MatrixGame 和 YUME。

> 💡 关键：Astra 的贡献不是单个动作编码器，而是把“预训练视频去噪 + 自回归历史 + 动作响应”组织成可扩展的交互式世界模型训练范式。

#### 🧪 练习题
```yaml
question: "Astra 中 noise-as-mask 历史记忆的主要作用是什么？"
options:
  - "减少视频分辨率以节省显存"
  - "弱化历史帧的直接复制倾向，让模型更重视动作条件"
  - "把连续动作离散化成文本 token"
  - "替代扩散模型中的随机噪声"
answer: 1
explain: "训练时给历史条件加噪可以缓解 visual inertia，使模型在保持长期一致性的同时对当前动作更敏感。"
```

### IN

```yaml
id: interaction_networks
num: 23
name: IN
full_name: 交互网络 (Interaction Networks)
year: '2016.12'
org: DeepMind
parent: —
paper_url: https://proceedings.neurips.cc/paper/2016/hash/3147da8ab4a0437c15ef51a5cc7f2dc4-Abstract.html
project_url: ''
category: physics
motivation: 通过对象关系图建模实现物理系统推理
```

#### 📝 一句话总结
Interaction Networks 提出把物理系统表示为对象和关系组成的图，并分别用关系模型和对象模型计算交互效应与状态更新，解决普通神经网络难以泛化到不同对象数量、关系结构和物理组合的问题。

#### 🎯 核心要点
- **对象-关系图输入**：节点表示对象状态，边表示物理关系或约束，外部效应单独作为输入
- **关系模型 \(f_R\)**：对每条边计算 sender 对 receiver 的 interaction effect
- **对象模型 \(f_O\)**：聚合所有作用到同一对象的 effect，再预测对象未来状态
- **共享权重与置换不变性**：同一个 \(f_R\)、\(f_O\) 作用于所有边和节点，可泛化到不同对象数
- **可学习物理引擎**：在 n-body、弹性碰撞、非刚体弹簧系统中学习多步 rollout
- **抽象属性推断**：可加 global abstraction model 估计系统势能等整体属性

#### 🔬 深入细节
![Interaction Network 框架图](https://ar5iv.labs.arxiv.org/html/1612.00222/assets/x1.png)
*图：Interaction Network 先计算关系交互效应，再把效应聚合到对象上执行对象动力学更新。*

##### 算法伪代码

```python
# Interaction Network one-step prediction
def interaction_network(objects, relations, external_effects):
    # objects: O_j, relations: (receiver_i, sender_i, attr_i)
    effects_by_receiver = defaultdict(list)

    for receiver, sender, rel_attr in relations:
        b_ij = concat(objects[receiver], objects[sender], rel_attr)
        e_ij = f_R(b_ij)                       # relation-centric reasoning
        effects_by_receiver[receiver].append(e_ij)

    predictions = []
    for j, obj in enumerate(objects):
        e_bar = sum(effects_by_receiver[j])    # commutative aggregation
        c_j = concat(obj, external_effects[j], e_bar)
        p_j = f_O(c_j)                         # object-centric dynamics
        predictions.append(p_j)

    return predictions
```

##### 动机与背景

物理系统的复杂性来自组合：同一种物体、同一种关系可以在不同数量、不同拓扑和不同初始条件下反复出现。普通 MLP 若把所有状态展平成向量，就把“第 1 个物体”和“第 2 个物体”绑定到固定输入位置，难以迁移到 3 个、6 个或 12 个物体。

IN 的关键假设是物理推理应分解为两类局部计算：关系计算和对象更新。关系模型学习“两个对象之间的相互作用”，对象模型学习“对象在外部效应和所有交互作用下如何变化”。这种分解与传统物理引擎的接触/力计算非常接近，但参数由神经网络从数据中学习。

##### 核心公式

设对象集合为 \(O = \{o_j\}\)，关系集合为 \(R = \langle R_r, R_s, R_a\rangle\)，其中 \(R_r\) 和 \(R_s\) 分别索引 receiver 与 sender，\(R_a\) 是关系属性。IN 的基本计算为：

$$
B = m(O, R)
$$

$$
E = \phi_R(B)
$$

$$
C = a(O, R, E, X)
$$

$$
P = \phi_O(C)
$$

其中 \(m\) 是 marshalling function，把对象和关系整理成每条边的输入；\(\phi_R\) 是共享的关系 MLP；\(a\) 把同一 receiver 的边效应求和聚合；\(\phi_O\) 是共享的对象 MLP。

##### 为什么能泛化

IN 的泛化来自两个结构约束。第一，\(f_R\) 在所有边上共享，相当于学习一种局部相互作用规则；第二，边效应用 sum 聚合，满足交换律和结合律，因此对象顺序不会改变结果：

$$
\bar{e}_j = \sum_{i: r(i)=j} e_i
$$

这让模型可以处理训练时未见过的对象数量和关系图。例如论文中 n-body 训练用 6 个天体，测试可以评估 3 个和 12 个天体；弹簧串训练一种端点固定方式，测试不同长度和固定方式。

##### 训练与 rollout

论文主要用监督方式训练单步速度预测：

$$
\mathcal{L} = \| \hat{v}_{t+1} - v_{t+1} \|_2^2
$$

多步 rollout 时，把模型输出的速度用于更新位置，再作为下一步输入。虽然只训练单步，IN 在 n-body、bouncing balls 和 string 系统中可以滚动上千步并保持物理上合理的轨迹。

> 💡 关键：IN 把“可学习神经网络”放进“对象-关系-聚合”的物理归纳偏置里，是后续 Graph Network Simulator、Visual Interaction Networks 和很多学习型物理引擎的基础模板。

#### 🧪 练习题
```yaml
question: "Interaction Network 为什么能泛化到不同数量的对象？"
options:
  - "因为它固定只处理 6 个对象"
  - "因为关系模型和对象模型在所有边/节点上共享，并用求和聚合交互效应"
  - "因为它不使用对象属性"
  - "因为它只预测系统总能量"
answer: 1
explain: "共享的 f_R 和 f_O 学习局部规则，sum 聚合保证置换不变性，因此同一模型可应用到不同规模和拓扑的对象关系图。"
```

### VIN

```yaml
id: vin
num: 24
name: VIN
full_name: 视觉交互网络 (Visual Interaction Networks)
year: '2017.12'
org: DeepMind
parent: interaction_networks
paper_url: https://proceedings.neurips.cc/paper/7040-visual-interaction-networks
project_url: ''
category: physics
motivation: 从原始视频中学习物理模拟器
```

#### 📝 一句话总结
Visual Interaction Networks 将 CNN 视觉编码器与 Interaction Network 动力学预测器端到端结合，从少量原始视频帧中解析对象 latent 状态并执行物理 rollout，解决 IN 依赖显式对象状态、无法直接从视觉观测学习模拟器的问题。

#### 🎯 核心要点
- **视觉前端 + IN 后端**：CNN 从视频帧估计对象状态，IN 在对象状态图上预测未来动力学
- **六帧输入长期预测**：论文展示模型可从 6 个输入视频帧预测数百步未来轨迹
- **factored latent object representation**：视觉模块被动力学任务驱动，学习对象分解式 latent 表示
- **多物理域评估**：弹簧、重力、磁力、弹球和漂移等二维物理系统
- **不可见对象推断**：可从可见物体受力效果推断不可见物体的未来状态
- **隐式物理属性推断**：模型能从运动中隐式估计未知质量等物理属性

#### 🔬 深入细节
![VIN 预测器结构](https://ar5iv.labs.arxiv.org/html/1706.01433/assets/Predictor.png)
*图：VIN 的 dynamics predictor 基于 Interaction Network，对对象 latent 状态执行交互推理与未来 rollout。*

##### 算法伪代码

```python
# Visual Interaction Network
def vin_forward(video_frames, relation_graph, rollout_steps):
    # 1. 视觉编码：用连续帧估计对象状态
    state_codes = []
    for triplet in sliding_window(video_frames, size=3):
        state_codes.append(cnn_encoder(triplet))

    # 2. 从多个 state code 估计当前位置/速度等 latent state
    object_states = infer_object_state(state_codes)

    # 3. IN 动力学 rollout
    predictions = []
    for _ in range(rollout_steps):
        delta_state = interaction_network(object_states, relation_graph)
        object_states = integrate(object_states, delta_state)
        predictions.append(object_states)

    return predictions
```

##### 动机与背景

Interaction Network 已证明对象-关系图是学习物理模拟器的强归纳偏置，但它假设对象状态、关系属性和外部效应已经可得。真实机器人或视觉系统通常只看到像素视频，不直接知道每个物体的位置、速度、质量或相互作用。

VIN 的问题设定因此更接近感知到规划的闭环：输入是视频帧，输出是未来物体轨迹。模型必须同时解决感知解析和动力学学习，而且这两部分要互相配合。视觉模块不需要显式监督“这是第几个物体”，而是通过预测未来轨迹的损失被迫学习适合物理推理的对象 latent。

##### 架构拆解

VIN 由两个模块组成：

$$
s_t = E_{\theta}(I_{t-2:t})
$$

$$
\hat{s}_{t+1:t+H} = D_{\phi}(s_t, R)
$$

其中 \(E_{\theta}\) 是基于 CNN 的 visual encoder，输入若干帧图像以推断位置和速度等状态；\(D_{\phi}\) 是 Interaction Network 风格的 dynamics predictor，输入对象状态和关系图 \(R\)，递推未来状态。

由于单帧无法确定速度，VIN 使用多个连续帧形成 state code。论文中视觉编码器通常取三帧片段，模型整体从六帧视频中估计当前动力学状态。

##### 动力学预测器如何使用 IN

预测器保留 IN 的核心结构：对每条关系计算 interaction effect，再聚合到每个对象并预测状态变化。若对象状态为 \(o_i\)，关系为 \(r_{ij}\)，则：

$$
e_{ij} = f_R(o_i, o_j, r_{ij})
$$

$$
\bar{e}_j = \sum_i e_{ij}
$$

$$
\Delta o_j = f_O(o_j, \bar{e}_j)
$$

这让 VIN 不只是从像素拟合轨迹，而是在 latent 对象空间里执行类似物理引擎的结构化推理。

##### 与传统视觉预测的区别

普通视频预测模型直接预测未来像素，容易把物理规律混在纹理生成中；VIN 先解析对象状态，再在对象图上预测动力学。这样做的优势是长期 rollout 更稳定，也能自然处理不同关系类型，如弹簧、重力、磁力和碰撞。

论文还展示了隐变量推断能力：当某些对象不可见时，VIN 可通过可见对象受到的影响推断隐藏因素；当质量未知时，模型可从历史运动中形成足以预测未来的 latent 表示。

> ⚠️ 注意：VIN 仍需要监督目标对象状态，视觉编码器并不是完全无监督对象发现；它的贡献是把视觉解析与关系动力学端到端对齐。

#### 🧪 练习题
```yaml
question: "VIN 相比原始 Interaction Network 主要增加了什么能力？"
options:
  - "从原始视频帧中学习对象状态表示并进行物理 rollout"
  - "用哈密顿量保证能量守恒"
  - "把所有对象合并成一个全局向量"
  - "只预测单步像素重建"
answer: 0
explain: "VIN 在 IN 前加入 CNN 感知模块，使模型可从视频观测中解析对象 latent 状态，再用 IN 预测未来物理轨迹。"
```

### HNN

```yaml
id: hnn
num: 25
name: HNN
full_name: 哈密顿神经网络 (Hamiltonian Neural Networks)
year: '2019.12'
org: Google Brain
parent: interaction_networks
paper_url: https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html
project_url: ''
category: physics
motivation: 引入哈密顿力学确保能量守恒
```

#### 📝 一句话总结
HNN 用神经网络参数化系统的哈密顿量 \(H(q,p)\)，再通过哈密顿方程从能量梯度导出动力学，解决普通神经网络直接拟合状态导数时容易违反能量守恒、长期 rollout 漂移的问题。

#### 🎯 核心要点
- **学习标量 Hamiltonian**：网络输出单个能量式标量，而不是直接输出状态导数
- **辛梯度动力学**：通过 \(\dot{q}=\partial H/\partial p\)、\(\dot{p}=-\partial H/\partial q\) 构造向量场
- **无监督守恒量学习**：不需要能量标签，只用状态导数监督即可学到近似能量守恒量
- **时间可逆性**：哈密顿系统的流映射满足相空间体积守恒和可逆性
- **多任务验证**：质量弹簧、理想摆、真实摆、二体问题和像素摆
- **像素到 Hamiltonian**：结合 autoencoder 在 latent 空间学习 pendulum 的哈密顿动力学

#### 🔬 深入细节
![HNN 质量弹簧示意](https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x1.png)
*图：普通神经网络 rollout 出现能量漂移，而 HNN 学到近似总能量的守恒量并保持轨道稳定。*

##### 算法伪代码

```python
# Hamiltonian Neural Network training
def hnn_derivative(q, p):
    x = concat(q, p)
    H = hamiltonian_mlp(x)          # scalar
    dH_dq, dH_dp = grad(H, (q, p))
    q_dot = dH_dp
    p_dot = -dH_dq
    return q_dot, p_dot

for q, p, q_dot_true, p_dot_true in dataset:
    q_dot_pred, p_dot_pred = hnn_derivative(q, p)
    loss = mse(q_dot_pred, q_dot_true) + mse(p_dot_pred, p_dot_true)
    update(loss)

# rollout 用 ODE integrator 积分 hnn_derivative
trajectory = solve_ivp(hnn_derivative, initial_state)
```

##### 动机与背景

普通神经网络学习动力学时通常直接拟合：

$$
\dot{x} = f_{\theta}(x)
$$

这种方法可以在训练分布内拟合单步导数，但没有物理守恒约束。长期积分时，即使每步误差很小，也可能表现为能量逐渐增加或衰减，最终轨迹从真实系统中漂走。

HNN 的核心想法是把输出空间从“任意向量场”限制为“某个哈密顿量的辛梯度”。如果系统有正则坐标 \(x=(q,p)\)，哈密顿力学给出：

$$
\frac{d}{dt}
\begin{bmatrix}
q \\
p
\end{bmatrix}
=
\begin{bmatrix}
\frac{\partial H}{\partial p} \\
-\frac{\partial H}{\partial q}
\end{bmatrix}
$$

这样构造出的动力学天然沿着 \(H\) 的等值线运动，因此不会随意改变能量。

##### 学习目标

HNN 参数化标量函数：

$$
H_{\theta}(q,p) \in \mathbb{R}
$$

再用自动微分得到导数：

$$
\hat{\dot{q}} = \frac{\partial H_{\theta}}{\partial p}, \quad
\hat{\dot{p}} = -\frac{\partial H_{\theta}}{\partial q}
$$

训练损失只比较预测导数和观测导数：

$$
\mathcal{L}_{HNN} =
\left\|
\frac{\partial H_{\theta}}{\partial p} - \dot{q}
\right\|_2^2
+
\left\|
-\frac{\partial H_{\theta}}{\partial q} - \dot{p}
\right\|_2^2
$$

论文强调不需要真实能量标签；网络学到的是与真实总能量成比例或相差常数的守恒量，这已足以稳定轨迹。

##### 像素摆实验

在像素观测中，模型先用 autoencoder 把连续两帧 pendulum 图像编码为 latent 坐标 \(z=(q,p)\)，再在 latent 空间应用 HNN。损失包括像素重建、HNN 导数拟合和 latent 辅助约束，使 latent 的两半近似满足正则坐标关系。

这说明 HNN 不一定只能接收人工定义的坐标；只要编码器能学出接近正则坐标的表示，就可以把哈密顿先验用于高维观测。

##### 与 IN/GNS 的区别

IN 和 GNS 通过对象关系图表达局部相互作用，适合多对象组合泛化；HNN 则从守恒律出发，约束整个系统的动力学向量场。它不要求显式对象图，但要求状态能表示为正则坐标 \((q,p)\)，且系统近似保守。

> ⚠️ 注意：HNN 对摩擦、耗散、碰撞等非保守过程不天然适配。真实摆实验中如果存在阻尼，HNN 会倾向于学习一个近似守恒系统，无法解释能量损失本身。

#### 🧪 练习题
```yaml
question: "HNN 为什么比直接预测状态导数的 MLP 更能保持长期稳定？"
options:
  - "因为 HNN 输出更多参数"
  - "因为 HNN 通过哈密顿量的辛梯度构造动力学，天然约束能量式守恒量"
  - "因为 HNN 不需要训练数据"
  - "因为 HNN 只预测位置，不预测动量"
answer: 1
explain: "HNN 学习标量 H(q,p)，再用哈密顿方程生成向量场，使轨迹沿守恒量等值线演化，从结构上减少能量漂移。"
```

### LNN

```yaml
id: lnn
num: 26
name: LNN
full_name: 拉格朗日神经网络 (Lagrangian Neural Networks)
year: '2020.03'
org: MIT
parent: hnn
paper_url: https://arxiv.org/abs/2003.04630
project_url: ''
category: physics
motivation: 基于拉格朗日力学处理复杂约束系统
```

#### 📝 一句话总结
LNN 提出用神经网络直接参数化拉格朗日量 \(L(q, \dot{q})\)，通过欧拉-拉格朗日方程推导运动方程，解决了哈密顿神经网络 (HNN) 必须依赖正则坐标的限制，使物理先验神经网络能够处理任意坐标系下的复杂约束系统。

#### 🎯 核心要点
- **拉格朗日参数化**：用神经网络学习系统的拉格朗日量 \(L(q, \dot{q})\)，而非直接学习动力学映射
- **任意坐标兼容**：不要求正则坐标 \((q, p)\)，可直接使用广义坐标 \((q, \dot{q})\)，适用范围远超 HNN
- **欧拉-拉格朗日约束**：通过 \(\frac{d}{dt}\frac{\partial L}{\partial \dot{q}} - \frac{\partial L}{\partial q} = 0\) 将物理守恒律硬编码进网络结构
- **二阶自动微分**：利用深度学习框架的自动微分计算 Hessian \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 及混合偏导数
- **拉格朗日图网络 (LGN)**：将方法扩展到 PDE 系统，通过图网络对拉格朗日密度求和建模连续场
- **实验验证**：在双摆、相对论粒子、1D 波动方程三个任务上展示了长时程能量守恒与坐标无关性优势

#### 🔬 深入细节
![LNN 核心框架图](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/new_lnn_figv3_fat.png)
*图：LNN 核心思想示意。物理学家用拉格朗日量描述双摆等物理系统的动力学（黑色）。普通神经网络在长时间预测中因误差累积而失败（红色），而 LNN 通过学习拉格朗日量并利用物理约束推导运动方程，实现精确的长期预测（蓝色）。*

##### 算法伪代码

```python
# Lagrangian Neural Network 前向推理
# 输入: 广义坐标 q, 广义速度 q_dot
# 输出: 广义加速度 q_ddot

def lnn_forward(q, q_dot, lagrangian_nn):
    """通过欧拉-拉格朗日方程计算加速度"""
    # 1. 神经网络预测拉格朗日量
    L = lagrangian_nn(q, q_dot)  # L: scalar
    
    # 2. 计算所需的偏导数（自动微分）
    dL_dq = grad(L, q)           # ∂L/∂q
    dL_dq_dot = grad(L, q_dot)   # ∂L/∂q̇
    
    # 3. 计算 Hessian 和混合偏导
    H = jacobian(dL_dq_dot, q_dot)  # ∂²L/∂q̇² (Hessian)
    J = jacobian(dL_dq_dot, q)      # ∂²L/∂q∂q̇ (混合项)
    
    # 4. 通过欧拉-拉格朗日方程求解加速度
    # q̈ = H⁻¹ [∂L/∂q - (∂²L/∂q∂q̇) q̇]
    q_ddot = solve(H, dL_dq - J @ q_dot)
    
    return q_ddot

# 训练循环
for (q, q_dot, q_ddot_true) in dataset:
    q_ddot_pred = lnn_forward(q, q_dot, lagrangian_nn)
    loss = MSE(q_ddot_pred, q_ddot_true)
    optimizer.step(loss)
```

##### 动机与背景

物理系统的动力学建模是科学计算的核心问题。传统方法直接用神经网络拟合状态到状态的映射 \(\dot{x} = f_\theta(x)\)，虽然短期预测准确，但由于缺乏物理约束，长时间积分后会严重违反能量守恒等基本物理定律。

**哈密顿神经网络 (HNN)** 率先引入物理先验，通过学习哈密顿量 \(H(q, p)\) 并利用哈密顿方程 \(\dot{q} = \frac{\partial H}{\partial p},\ \dot{p} = -\frac{\partial H}{\partial q}\) 来保证能量守恒。然而 HNN 有一个关键限制：**它要求输入必须是正则坐标 \((q, p)\)**，其中 \(p\) 是正则动量。在许多实际问题中（如机器人关节角度、传感器读数），我们获得的是广义坐标和广义速度 \((q, \dot{q})\)，而非正则动量。从 \(\dot{q}\) 到 \(p\) 的转换本身就需要知道系统的拉格朗日量，形成了鸡生蛋的困境。

> 💡 **关键洞察**：拉格朗日力学与哈密顿力学在物理上等价，但拉格朗日形式直接使用 \((q, \dot{q})\) 作为状态变量，天然兼容任意广义坐标，无需正则变换。

##### 核心机制：欧拉-拉格朗日方程驱动的神经网络

LNN 的核心思想极为优雅：用一个神经网络 \(\mathcal{L}_\theta\) 参数化拉格朗日量，然后通过经典力学的欧拉-拉格朗日方程自动推导出运动方程。

**拉格朗日量**定义为动能减去势能：

$$L(q, \dot{q}) = T(\dot{q}) - V(q)$$

**欧拉-拉格朗日方程**给出系统的运动方程：

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{q}} - \frac{\partial L}{\partial q} = 0$$

将全导数展开，可以得到加速度的显式表达：

$$\ddot{q} = \left(\frac{\partial^2 L}{\partial \dot{q}^2}\right)^{-1} \left[\frac{\partial L}{\partial q} - \left(\frac{\partial^2 L}{\partial q \partial \dot{q}}\right) \dot{q}\right]$$

这个公式是 LNN 的核心计算步骤。其中：
- \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 是拉格朗日量对广义速度的 **Hessian 矩阵**，对应系统的广义质量矩阵
- \(\frac{\partial^2 L}{\partial q \partial \dot{q}}\) 是**混合偏导数**，捕捉坐标与速度之间的耦合（如科里奥利力）
- \(\frac{\partial L}{\partial q}\) 包含广义力的信息

> ⚠️ **注意**：Hessian 矩阵 \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 必须可逆。对于合理的物理系统，这等价于要求广义质量矩阵正定，这在物理上总是成立的。

##### 自动微分的关键作用

LNN 的实现高度依赖现代深度学习框架的**自动微分**能力。具体来说，需要计算：

1. **一阶梯度** \(\frac{\partial L}{\partial q}\) 和 \(\frac{\partial L}{\partial \dot{q}}\)：标准反向传播
2. **二阶导数** \(\frac{\partial^2 L}{\partial \dot{q}^2}\)：对一阶梯度再次求导（Hessian）
3. **混合二阶导数** \(\frac{\partial^2 L}{\partial q \partial \dot{q}}\)：交叉偏导数

这些高阶导数在 JAX 等框架中可以通过嵌套的 `grad` 和 `jacobian` 调用高效计算。论文使用 JAX 实现，利用其函数式自动微分特性。

##### 与 HNN 的核心区别

| 特性 | HNN | LNN |
|------|-----|-----|
| 学习目标 | 哈密顿量 \(H(q, p)\) | 拉格朗日量 \(L(q, \dot{q})\) |
| 输入坐标 | 正则坐标 \((q, p)\) | 任意广义坐标 \((q, \dot{q})\) |
| 运动方程 | 哈密顿方程（一阶ODE） | 欧拉-拉格朗日方程（二阶ODE） |
| 坐标限制 | 必须正则变换 | **无限制** |
| 约束系统 | 困难 | 自然处理 |
| 计算代价 | 一阶导数 | 二阶导数（Hessian） |

> 💡 **关键优势**：在相对论粒子实验中，HNN 在非正则坐标下完全失败（轨迹发散），而 LNN 在同样的任意坐标下仍能准确学习动力学。这验证了坐标无关性是 LNN 的核心优势。

##### 拉格朗日图网络：扩展到 PDE 系统

论文进一步提出了**拉格朗日图网络 (Lagrangian Graph Networks, LGN)**，将 LNN 的思想扩展到偏微分方程（PDE）描述的连续系统。

核心思想是将连续场离散化为图上的节点，每个节点的**拉格朗日密度** \(\mathcal{L}_i\) 由其局部邻域决定：

$$L_{\text{total}} = \sum_i \mathcal{L}_\theta(q_i, \dot{q}_i, q_{\mathcal{N}(i)})$$

其中 \(\mathcal{N}(i)\) 是节点 \(i\) 的邻居集合。这种设计使得 LNN 可以建模波动方程等连续物理系统，同时保持平移不变性和守恒律。

![双摆实验结果](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x1.png)
*图：双摆任务实验结果对比。LNN 和基线模型在短期动力学建模上表现相似，但在能量守恒方面 LNN 显著优于无物理先验的基线。*

![相对论粒子实验](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x4.png)
*图：相对论粒子任务。(a) HNN 在非正则坐标下失败；(b) HNN 在正则坐标下成功；(c) LNN 在任意坐标下均成功，验证了坐标无关性优势。*

#### 🧪 练习题
```yaml
question: "与哈密顿神经网络 (HNN) 相比，拉格朗日神经网络 (LNN) 的核心优势是什么？"
options:
  - "训练速度更快，因为只需一阶导数"
  - "能够在任意广义坐标下工作，无需正则坐标变换"
  - "网络参数量更少，更容易收敛"
  - "可以直接预测系统能量，无需积分"
answer: 1
explain: "LNN 基于拉格朗日力学，直接使用广义坐标 (q, q̇) 作为输入，而 HNN 要求正则坐标 (q, p)。这使得 LNN 能处理无法轻易获得正则动量的复杂约束系统。"
```

### GNS

```yaml
id: gns
num: 27
name: GNS
full_name: 图网络模拟器 (Learning to Simulate)
year: '2020.07'
org: DeepMind
parent: vin
paper_url: https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html
project_url: ''
category: physics
motivation: 利用GNN模拟流体刚体可变形材料
```

#### 📝 一句话总结
GNS 将复杂物理系统表示为粒子图，用 encode-process-decode 图网络通过多轮消息传递预测粒子加速度，并用噪声扰动训练缓解 rollout 误差累积，解决学习型模拟器难以统一模拟流体、刚体和可变形材料的问题。

#### 🎯 核心要点
- **粒子图表示**：每个粒子是节点，局部邻域内粒子关系是边，边随 rollout 动态重建
- **Encode-Process-Decode**：编码粒子/边特征，多轮 GN message passing，再解码为每粒子加速度
- **Euler update**：模型预测 \(\hat{a}_t\)，由固定积分器更新速度和位置
- **相对位置归纳偏置**：边特征使用相对位移和距离，提升空间平移泛化
- **训练噪声注入**：向输入速度加入 random-walk noise，让模型适应自身 rollout 产生的偏差
- **跨材料统一模拟**：覆盖 Water、Sand、Goop、MultiMaterial、WaterRamps 等流体/颗粒/黏塑材料
- **尺度泛化**：训练单步、测试长 rollout，并可泛化到更多粒子和更大场景

#### 🔬 深入细节
![GNS 复杂材料模拟](https://ar5iv.labs.arxiv.org/html/2002.09405/assets/x1.png)
*图：GNS 在 Water-3D、Goop-3D、Sand-3D 等粒子系统上生成长时程 rollout。*

##### 算法伪代码

```python
# Graph Network-based Simulator
def gns_step(particles, velocity_history, globals):
    # 1. 动态构图：连接半径内粒子
    edges = radius_graph(particles.positions, radius=R)

    # 2. Encoder：节点/边特征编码到 latent graph
    node_feat = concat(particles.positions, velocity_history, particles.material, globals)
    edge_feat = relative_displacement_and_distance(edges, particles.positions)
    graph = encode_nodes_edges(node_feat, edge_feat)

    # 3. Processor：M 轮消息传递
    for _ in range(M):
        graph = graph_network_block(graph)      # edge update + node update + residual

    # 4. Decoder：输出每粒子加速度
    accel = decode_node_acceleration(graph.nodes)

    # 5. 固定积分器更新
    new_velocity = particles.velocity + accel * dt
    new_position = particles.position + new_velocity * dt
    return new_position, new_velocity

for pair in sampled_trajectory_pairs:
    noisy_input = add_random_walk_noise(pair.input)
    accel_pred = gns_step(noisy_input)
    loss = mse(normalize(accel_pred), normalize(pair.target_accel))
    update(loss)
```

##### 动机与背景

传统物理模拟器通常需要针对材料类型和场景手工设计：流体、沙子、黏塑性材料、刚体交互往往使用不同方程或求解器。学习型模拟器希望直接从轨迹数据中学习动力学，但标准端到端网络难以处理数千到数万个粒子的高维状态。

GNS 的关键观察是：粒子模拟本身就可以看作图上的局部消息传递。粒子只与半径内邻居强交互，压力、碰撞、摩擦和材料约束都可以由局部边消息逐步传播。

##### 模型框架

GNS 将状态 \(S_t\) 表示为粒子集合，学习动力学函数：

$$
\hat{a}_t = f_{\theta}(S_t)
$$

再用固定 update procedure 预测下一状态：

$$
v_{t+1} = v_t + \hat{a}_t \Delta t
$$

$$
x_{t+1} = x_t + v_{t+1} \Delta t
$$

与直接预测位置不同，预测加速度让模型更接近物理求解器中的“计算动力学信息 + 积分更新”分工。

##### Encode-Process-Decode 图网络

Encoder 将粒子状态和边属性映射为 latent graph：

$$
G^0 = E(S_t)
$$

Processor 执行 \(M\) 轮消息传递：

$$
G^{m+1} = P_m(G^m)
$$

Decoder 从最终节点 latent 输出加速度：

$$
\hat{a}_i = D(G^M_i)
$$

论文发现 message-passing steps 是长期性能的关键超参数，因为多轮传递允许局部约束沿粒子邻域传播，从而模拟更长程的物理影响。

##### 训练噪声与 rollout 稳定性

GNS 训练用单步监督，但测试要自回归 rollout 上百到上千步。若训练输入总是真实状态，模型从未见过自己预测带来的小误差，rollout 时会快速偏离分布。论文用 random-walk noise 污染输入速度，并相应调整位置，使训练分布更接近 rollout 分布：

$$
\tilde{v}_t = v_t + \eta_t
$$

$$
\mathcal{L} = \|\hat{a}_{\theta}(\tilde{S}_t) - a_t\|_2^2
$$

这个技巧与 DAgger/数据增强思想类似，是 GNS 长时程稳定的主要因素之一。

##### 与 IN/VIN 的区别

IN 更像一般对象关系推理框架，VIN 解决从像素得到对象状态的问题；GNS 则专门面向大规模粒子物理，把图构建、message passing、加速度预测和积分更新组织成可扩展模拟器。它能在训练时几千粒子、测试时更多粒子的情形下运行，并覆盖多种材料。

> 💡 关键：GNS 的“物理先验”不来自显式方程，而来自粒子局部相互作用、共享消息函数、相对坐标和固定积分器这些结构选择。

#### 🧪 练习题
```yaml
question: "GNS 中训练时向输入速度加入 random-walk noise 的目的是什么？"
options:
  - "让图的节点数量减少"
  - "让模型在训练时见到类似 rollout 误差的扰动，从而减轻长期误差累积"
  - "把连续粒子状态离散成 codebook"
  - "替代图网络中的消息传递"
answer: 1
explain: "GNS 测试时会反复喂入自己的预测，输入会带偏差；训练噪声让模型提前适应这种分布偏移，提高长 rollout 稳定性。"
```

### Roboscape

```yaml
id: roboscape
num: 28
name: Roboscape
full_name: 机器人场景 (Physics-informed Embodied World Model)
year: '2026.01'
org: Tsinghua University
parent: gns
paper_url: https://arxiv.org/abs/2601.roboscape
project_url: ''
category: physics
motivation: 引入物理先验提升机器人场景预测准确性
```

#### 📝 一句话总结
RoboScape 提出在自回归机器人视频世界模型中联合学习 RGB 生成、时间深度预测和自适应关键点动力学，用几何一致性与接触区域运动约束提升机器人交互视频的物理合理性。

#### 🎯 核心要点
- **输入链接限制**：清单中的 `https://arxiv.org/abs/2601.roboscape` 疑似占位符；实际公开论文为 `https://arxiv.org/abs/2506.23135`
- **物理先验数据管线**：从 AGIBOT-World 视频中抽取 RGB、深度、动作、关键点轨迹和质量过滤标签
- **双分支 co-autoregressive Transformer**：RGB token 分支和 depth token 分支并行预测未来帧
- **Temporal depth prediction**：深度分支为 RGB 生成注入 3D 几何一致性约束
- **Adaptive keypoint dynamics learning**：选择运动幅度最大的关键点，约束接触和形变区域的时序 token 一致性
- **Keypoint-guided attention**：对关键点轨迹覆盖区域提高训练权重，强化复杂局部运动学习
- **下游机器人用途**：生成数据可辅助 Diffusion Policy、pi0 等策略训练，也可作为 policy evaluator

#### 🔬 深入细节
![RoboScape 框架图](https://arxiv.org/html/2506.23135v1/x2.png)
*图：RoboScape 将 RGB 视频生成、时间深度预测和关键点动力学学习合并到统一自回归世界模型中。*

##### 算法伪代码

```python
# RoboScape physics-informed world model
for clip in agibot_world_clips:
    rgb_tokens = magvit2.encode_rgb(clip.rgb_frames)
    depth_maps = video_depth_anything(clip.rgb_frames)
    depth_tokens = tokenize_depth(depth_maps)
    keypoints = spatial_tracker(clip.rgb_frames)
    active_kpts = select_top_motion_keypoints(keypoints, top_k=K)
    action_embed = robot_action_encoder(clip.actions)

    # 双分支自回归预测
    rgb_pred, depth_pred, hidden_rgb, hidden_depth = dct_transformer(
        history_rgb=rgb_tokens[:-1],
        history_depth=depth_tokens[:-1],
        actions=action_embed,
    )

    rgb_loss = cross_entropy(rgb_pred, rgb_tokens[1:])
    depth_loss = cross_entropy(depth_pred, depth_tokens[1:])
    kp_consistency = temporal_token_consistency(hidden_rgb, active_kpts)
    kp_weighted_loss = keypoint_guided_attention_loss(rgb_pred, rgb_tokens[1:], active_kpts)

    loss = rgb_loss + lambda_d * depth_loss + lambda_k * kp_consistency + lambda_a * kp_weighted_loss
    update(loss)
```

##### 动机与背景

机器人视频世界模型常被用来生成交互数据、想象未来和评估策略，但纯 RGB 目标会鼓励模型拟合表面纹理，而不是理解物体接触、深度结构和材料形变。对机器人来说，这些错误非常致命：布料可能无物理原因地变形，物体可能穿透，抓取过程可能视觉上平滑但动作不可执行。

RoboScape 的核心判断是：物理合理性不一定要通过昂贵的外部物理仿真器注入，也可以通过多任务辅助监督让视频模型在训练中学习几何和运动先验。论文选用两个易从视频中提取的先验：时间深度一致性和关键点轨迹一致性。

##### 数据处理管线

论文从 AGIBOT-World 构建大规模机器人视频片段，使用多个现成模型产生物理相关标注：Video Depth Anything 生成深度序列，SpatialTracker 采样并跟踪关键点，TransNetV2 检测镜头边界，InternVL 标注动作语义与关键帧，FlowNet 用于过滤低质量或运动混乱片段。

这个管线的作用是把原始互联网/机器人视频整理为更适合世界模型训练的多模态样本：

$$
(o_{1:T}^{rgb}, o_{1:T}^{depth}, a_{1:T}, k_{1:T})
$$

其中 \(a_t\) 是机器人动作，\(k_t\) 是关键点坐标轨迹。

##### 双分支 RGB-Depth 自回归

RoboScape 用 MAGVIT-2 将 RGB 帧压缩为离散 token，也将深度图 token 化。RGB 和 depth 分支都用 Spatial-Temporal Transformer block，并接收动作嵌入：

$$
\hat{z}^{rgb}_{t+1} = f_{rgb}(z^{rgb}_{\le t}, z^{dep}_{\le t}, a_t)
$$

$$
\hat{z}^{dep}_{t+1} = f_{dep}(z^{dep}_{\le t}, a_t)
$$

深度分支的中间特征通过线性投影注入 RGB 分支：

$$
h^{rgb}_{\ell} \leftarrow h^{rgb}_{\ell} + W_{\ell} h^{dep}_{\ell}
$$

这样 RGB 生成不仅学习“下一帧长什么样”，还受到 3D 深度结构的约束。

##### 自适应关键点动力学

对于机器人操作，最关键的物理信息往往集中在接触区域和高运动区域。RoboScape 不依赖手工分割，而是根据关键点运动幅度选择 top-k active keypoints：

$$
\mathcal{K} = \text{TopK}_i \sum_t \|k_{i,t} - k_{i,t-1}\|
$$

然后对这些关键点在各帧对应的视觉 token 施加时序一致性：

$$
\mathcal{L}_{kp} =
\sum_{i \in \mathcal{K}}\sum_t
\|h_{t, k_{i,t}} - h_{0, k_{i,0}}\|_2^2
$$

直觉是：布料、袋子、工具和被抓取物体的局部关键点轨迹反映了材料和接触动力学。让模型关注这些点，比对整幅图平均施加约束更能改善物理交互细节。

##### 联合目标与下游意义

最终训练目标组合 RGB token 预测、depth token 预测、关键点一致性和关键点加权 token loss：

$$
\mathcal{L} =
\mathcal{L}_{rgb}
+ \lambda_d \mathcal{L}_{depth}
+ \lambda_k \mathcal{L}_{kp}
+ \lambda_a \mathcal{L}_{attn}
$$

论文报告在 50,000 视频 clips、约 6.5M 训练 clips 上训练，并在外观保真、几何一致和动作可控性指标上优于 IRASim、iVideoGPT、Genie 和 CogVideoX。更重要的是，RoboScape 生成的视频可作为机器人策略训练数据，也能作为 policy evaluator，与真实仿真评估结果保持相关。

> 💡 关键：RoboScape 的物理先验不是显式求解牛顿方程，而是把“深度几何”和“关键点运动”变成世界模型训练时必须同时解释的监督信号。

#### 🧪 练习题
```yaml
question: "RoboScape 中自适应关键点动力学学习主要约束什么？"
options:
  - "整幅图所有静态背景像素"
  - "运动幅度较大的接触/形变区域在时间上的 token 一致性"
  - "语言提示与动作标签的一致性"
  - "相机内参的标定误差"
answer: 1
explain: "RoboScape 选择运动最活跃的关键点并约束其跨帧 token 表示，促使模型学习接触、形变和材料相关的局部动力学。"
```

### Newton 1.0

```yaml
id: newton
num: 29
name: Newton 1.0
full_name: 牛顿物理引擎 (Newton Physics Engine)
year: '2026.03'
org: NVIDIA
parent: gns
paper_url: https://blogs.nvidia.com/blog/2026/04/gtc26-robots/
project_url: ''
category: physics
motivation: 开源物理引擎实现精确刚体流体动力学
```

#### 📝 一句话总结
Newton 1.0 提出面向机器人学习的开源、GPU 加速、可扩展物理引擎，用统一的 OpenUSD/Warp 架构把刚体、接触、变形体、自定义求解器和 Isaac/MuJoCo 工作流连接起来，解决高保真接触仿真与大规模强化学习训练难以兼得的问题。

#### 🎯 核心要点
- **开源物理引擎定位**：由 NVIDIA、Google DeepMind、Disney Research 发起，Linux Foundation 治理，面向机器人仿真与学习
- **统一架构**：以 OpenUSD 作为场景与资产数据层，以 NVIDIA Warp/CUDA 作为 GPU 计算层
- **多求解器设计**：包含 MuJoCo Warp、Kamino、变形体求解器、规范求解器与用户自定义求解器
- **高保真接触建模**：支持 SDF 碰撞、hydroelastic contact、摩擦与复杂闭链机构，用于接触丰富的操控和装配任务
- **可微与可扩展**：支持通过仿真反传梯度，便于系统辨识、控制优化和学习算法集成
- **机器人学习工作流**：可作为 Isaac Lab/Isaac Sim 的后端，使同一 MDP、奖励、PPO 训练循环在不同物理后端间切换
- **视觉 RL 支持**：Warp tiled camera sensor 支持 RGB、深度、法线、实例分割等批量观测生成

#### 🔬 深入细节
##### 资料来源说明

> ⚠️ 注意：清单中的 `paper_url` 指向 NVIDIA 新闻/博客页，而不是同行评审论文。以下内容基于 NVIDIA 官方 Newton 技术博客、Newton Developer 页面和开源仓库 README 中公开的架构与接口说明整理；因此这里更接近“系统/算法精读”，而不是传统论文复现。

![Newton 架构图](https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/newton-architecture.webp)
*图：Newton 以 OpenUSD 连接 Isaac、MuJoCo、Warp 和内部多求解器；核心模块包含 collision、contact、sensor、control 与多种 solver。*

##### 核心仿真循环

```python
# Newton 典型仿真/训练后端伪代码
builder = newton.ModelBuilder()
builder.add_usd("robot_or_scene.usd")      # 统一资产入口，也可来自 URDF/MJCF
model = builder.finalize()                 # 上传到 GPU

solver = newton.solvers.SolverKamino(model)  # 或 MuJoCo Warp / custom solver
state_0 = model.state()
state_1 = model.state()
control = model.control()
contacts = model.contacts()

for step in range(num_steps):
    state_0.clear_forces()
    policy_action = policy(observation(state_0))
    control.apply(policy_action)

    model.collide(state_0, contacts)       # 碰撞检测和接触生成
    solver.step(state_0, state_1, control, contacts, sim_dt)

    reward = task_reward(state_1)
    replay.add(state_0, policy_action, reward, state_1)
    state_0, state_1 = state_1, state_0
```

##### 动机与背景

机器人世界模型有两类常见瓶颈：一类是学习式世界模型容易在接触、摩擦、闭链机构和变形体上产生不可控误差；另一类是传统物理引擎虽可解释，但在大规模 RL 中常受限于 CPU 性能、求解器耦合和资产格式割裂。Newton 的目标不是学习一个神经动力学模型，而是提供一个可用于学习的物理底座：把高保真物理、GPU 并行、可微分和通用场景描述整合成同一后端。

其核心抽象可以写成：

$$s_{t+1} = \mathrm{Solver}_{\phi}(s_t, a_t, c_t, \Delta t)$$

其中 \(s_t\) 是系统状态，\(a_t\) 是控制输入，\(c_t\) 是由碰撞检测与接触模型生成的约束/接触信息，\(\phi\) 表示求解器和物理参数。与纯神经世界模型不同，Newton 把动力学先验写进求解器，把需要学习的部分留给策略、参数辨识或自定义模块。

##### 核心机制：模块化物理栈

Newton 的设计重点是“可替换但统一”。OpenUSD 负责表达机器人、环境、材质、传感器和资产组合；Newton 中的 collision、contact、sensor、control 模块把场景转换为求解器可处理的运行时数据；不同 solver 再负责推进物理状态。这样做的价值在于，研究者可以在同一个机器人学习任务中替换物理后端，观察策略是否依赖某个求解器的偏差。

接触丰富任务是 Newton 重点覆盖的场景。传统点接触模型在插拔、装配、手内操控中容易出现不稳定或不真实的摩擦行为。Newton 引入 SDF 碰撞和 hydroelastic contact，使接触不再只是单点冲量，而可以表达接触面积、压力分布和扭转摩擦。对工业装配来说，这比只关心质心运动的粗糙刚体仿真更接近真实任务。

##### 与学习式世界模型的关系

在 KnowledgePipeline 的世界模型谱系里，Newton 更像“可微物理世界模型”而不是“数据驱动潜在动力学模型”。它不直接学习 \(p(s_{t+1}|s_t,a_t)\)，而是提供一个可批量调用的近似物理转移函数。训练时，策略可以通过 Isaac Lab 的 RL 环境调用 Newton：

$$\pi_\theta(a_t|o_t) \rightarrow \text{Newton step} \rightarrow (o_{t+1}, r_t, d_t)$$

如果启用可微仿真，还可以把目标函数对物理参数或控制变量的梯度反传：

$$\nabla_\phi J = \frac{\partial J}{\partial s_T}\prod_{t=0}^{T-1}\frac{\partial s_{t+1}}{\partial s_t}\frac{\partial s_t}{\partial \phi}$$

这使 Newton 同时支持两种用途：作为大规模 RL 的快速环境，以及作为系统辨识和轨迹优化的可微动力学模型。

##### 与传统仿真器的区别

Newton 相比单一物理引擎的关键区别在于它把“求解器生态”作为一等公民。MuJoCo Warp 提供 GPU 化 MuJoCo 能力；Kamino 处理闭链机构和复杂机制；变形体求解器覆盖软物体；自定义 solver 允许研究者接入新物理模型。OpenUSD 则降低了不同机器人资产、仿真器和渲染管线之间的转换成本。

> 💡 关键：Newton 的算法价值不在某一个新损失函数，而在把机器人学习需要的物理求解、资产表达、传感器生成和训练后端统一到可扩展 GPU 运行时中。

#### 🧪 练习题
```yaml
question: "Newton 1.0 相比纯学习式世界模型的核心优势是什么？"
options:
  - "只通过视频预测未来帧，不需要物理约束"
  - "用可扩展物理求解器提供高保真、可并行、可微的状态转移"
  - "完全替代强化学习策略，不再需要奖励函数"
  - "只支持单一 MuJoCo 场景格式"
answer: 1
explain: "Newton 的核心是 GPU 加速、多求解器、OpenUSD 统一资产和可微物理，使机器人学习可以在物理约束下获得高吞吐仿真。"
```

### MBPO

```yaml
id: mbpo
num: 30
name: MBPO
full_name: 基于模型的策略优化 (Model-Based Policy Optimization)
year: '2019.12'
org: UC Berkeley
parent: —
paper_url: https://proceedings.neurips.cc/paper/2019/hash/5faf461eff3099671ad63c6f3f094f7f-Abstract.html
project_url: ''
category: planning
motivation: 短步长模型生成数据极大提升样本效率
```

#### 📝 一句话总结
MBPO 提出从真实数据状态出发、利用学习到的动力学模型进行短步长分支 rollout 来生成训练数据，并给出了基于模型误差和 rollout 长度的单调改进理论保证，在连续控制任务上实现了比无模型方法快一个数量级的样本效率，同时保持了相当的渐近性能。

#### 🎯 核心要点
- **分支 rollout 机制**：从真实经验回放池中采样状态，用学习到的模型执行 \(k\) 步短 rollout，而非从初始状态分布开始长 rollout，有效控制模型误差累积
- **单调改进理论保证**：Theorem 4.1 给出模型下策略回报与真实回报的下界关系；Theorem 4.2 证明分支 rollout 的误差随 \(k\) 线性增长而非随 \(1/(1-\gamma)\) 二次增长
- **概率集成模型**：使用多个概率神经网络（输出高斯分布的均值和方差）组成的集成模型作为动力学模型，同时捕获认知不确定性和随机不确定性
- **高梯度更新比**：短 rollout 生成的大量模型数据使得每个真实环境步可执行 20–40 次策略梯度更新（远高于纯无模型方法的稳定上限）
- **基于 SAC 的策略优化**：在模型生成数据上使用 Soft Actor-Critic 进行策略学习，继承其最大熵框架的探索优势
- **模型泛化分析**：实验表明训练数据越多，模型对策略分布偏移的敏感度越低（\(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi\) 递减），为使用更长 rollout 提供了实践依据

#### 🔬 深入细节
##### 动机与背景

基于模型的强化学习（MBRL）通过学习环境动力学模型来提升样本效率，但长期以来面临一个核心困境：**模型误差在多步预测中会指数级累积**，导致策略在模型中被"利用"（model exploitation），学到的策略在真实环境中表现很差。

传统的 Dyna 风格方法从初始状态分布开始做完整 episode 的模型 rollout，误差随 horizon 长度急剧放大。而纯无模型方法（如 SAC、PPO）虽然渐近性能好，但需要大量真实交互样本。MBPO 的核心问题是：**能否找到一种"恰到好处"的模型使用方式，既利用模型提升效率，又不被模型误差拖累？**

##### 理论框架：单调改进下界

MBPO 的理论基础建立在策略改进下界之上。首先定义关键符号：

- \(\eta[\pi]\)：策略 \(\pi\) 在**真实环境**中的期望回报
- \(\hat{\eta}[\pi]\)：策略 \(\pi\) 在**学习到的模型**中的期望回报
- \(\epsilon_m = \max_t \mathbb{E}_{s \sim \pi_t} [D_{\mathrm{TV}}(p(s'|s,a) \| \hat{p}(s'|s,a))]\)：模型误差（TV 距离）
- \(\epsilon_\pi = \max_t \mathbb{E}_{s \sim d_{\pi_D}^t} [D_{\mathrm{TV}}(\pi \| \pi_D)]\)：策略偏移

**Theorem 4.1（模型下的单调改进）**：

$$\eta[\pi] \geq \hat{\eta}[\pi] - C(\epsilon_m, \epsilon_\pi)$$

其中惩罚项 \(C\) 同时依赖模型误差 \(\epsilon_m\) 和策略偏移 \(\epsilon_\pi\)。这意味着：只要模型足够准确且策略更新幅度受控，在模型中改进策略就能保证在真实环境中也改进。

> 💡 **关键直觉**：该 bound 将"信任模型的程度"量化为两个可控量——模型精度和策略变化幅度。

**Theorem 4.2（分支 rollout 的更紧下界）**：

对于从真实数据分布 \(d_{\pi_D}\) 出发、在模型中执行 \(k\) 步的分支 rollout：

$$\eta[\pi] \geq \hat{\eta}_k^{\mathrm{branch}}[\pi] - 2r_{\max}\left[\frac{\gamma^{k+1}\epsilon_\pi}{(1-\gamma)^2} + \frac{\gamma^k + 2}{1-\gamma}\epsilon_\pi + \frac{k}{1-\gamma}(\epsilon_m + 2\epsilon_\pi)\right]$$

> ⚠️ **注意**：bound 中有两个竞争因素——随 \(k\) 指数衰减的项（来自真实数据的"锚定"效应）和随 \(k\) 线性增长的项（模型误差累积）。这意味着存在一个最优的 rollout 长度 \(k^*\)，在理论上平衡了模型利用与误差控制。

##### 模型泛化的实证分析

理论 bound 在字面意义上取最大值时 \(k=0\)（即完全不用模型），这是因为分析对模型泛化能力做了最悲观的假设。论文通过实验发现：

![模型泛化分析](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x1.png)
*图 1：(a) 模型误差随策略偏移的变化——训练数据越多，误差增长越慢；(b) 模型误差对策略偏移的局部导数 \(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi\) 随训练数据量递减，说明模型泛化能力随数据增加而增强。*

实验表明模型误差对策略偏移的敏感度可以用线性近似：

$$\hat{\epsilon}_{m'}(\epsilon_\pi) \approx \epsilon_m + \epsilon_\pi \cdot \frac{\mathrm{d}\epsilon_{m'}}{\mathrm{d}\epsilon_\pi}$$

当 \(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi < 2\) 时（实验中训练数据充足时成立），这比理论中悲观的 \(\epsilon_m + 2\epsilon_\pi\) 上界更紧，使得更长的 rollout 在实践中变得可行。

##### 算法：实用 MBPO

```python
# Algorithm 2: Model-Based Policy Optimization (MBPO)
初始化策略 π_φ, 环境回放池 D_env, 模型回放池 D_model
for N epochs:
    # 1. 训练动力学模型
    在 D_env 上通过最大似然训练模型集成 p_θ

    for E environment steps:
        # 2. 真实环境交互
        用 π_φ 在环境中执行动作, 将 (s, a, r, s') 加入 D_env

        # 3. 模型分支 rollout
        for M model rollouts:
            从 D_env 中均匀采样状态 s_t
            从 s_t 出发, 用 π_φ 在模型 p_θ 中执行 k 步 rollout
            将生成的 (s, a, r, s') 加入 D_model

        # 4. 策略优化（高更新比）
        for G gradient updates:  # G = 20~40, 远高于无模型方法
            φ ← φ - λ_π · ∇̂_φ J_π(φ, D_model)
```

> 💡 **关键设计**：即使 rollout 长度 \(k\) 很短（甚至 \(k=1\)），通过执行大量（\(M\) 次）短 rollout，仍可生成足够多的模型数据来支撑高频策略更新。这是 MBPO 能做到每个环境步 20–40 次梯度更新的关键。

##### 核心机制详解

**1. 概率集成动力学模型**

模型由 \(B\) 个独立的概率神经网络组成（论文中 \(B=7\)，每次 rollout 随机选 5 个），每个网络输出下一状态的高斯分布参数：

$$\hat{p}_{\theta_b}(s_{t+1} | s_t, a_t) = \mathcal{N}(\mu_{\theta_b}(s_t, a_t),\; \Sigma_{\theta_b}(s_t, a_t))$$

- **随机不确定性**（aleatoric）：由每个网络输出的方差 \(\Sigma_{\theta_b}\) 捕获
- **认知不确定性**（epistemic）：由集成中不同网络预测的分歧捕获

训练损失为负对数似然：

$$\mathcal{L}(\theta_b) = -\sum_{(s,a,s') \in \mathcal{D}_{\text{env}}} \log \hat{p}_{\theta_b}(s' | s, a)$$

**2. 分支 rollout 与数据混合**

与传统 Dyna 从初始状态分布 rollout 不同，MBPO 从 \(\mathcal{D}_{\text{env}}\) 中均匀采样真实状态作为 rollout 起点。这保证了：
- rollout 起始状态分布接近真实策略的状态访问分布
- 短步长 rollout 的状态不会偏离真实分布太远
- 模型只需在真实数据附近的局部区域保持准确

**3. 与传统方法的关键区别**

| 方法 | rollout 起点 | rollout 长度 | 数据用途 |
|------|------------|-------------|---------|
| Dyna / SLBO | 初始状态分布 | 完整 episode | 策略训练 |
| MVE / STEVE | 真实数据 | 短 | 值函数目标改进 |
| **MBPO** | **真实数据** | **短（1–15步）** | **策略训练** |

MBPO 结合了两个优势：从真实数据出发（控制分布偏移）+ 用模型数据直接训练策略（比仅改进值目标更充分利用模型）。

##### 实验结果

![训练曲线](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x2.png)
*图 2：MBPO 与五个基线在 MuJoCo 连续控制任务上的学习曲线。MBPO 在 Ant 任务上 30 万步达到 SAC 300 万步的性能，样本效率提升约 10 倍。*

关键实验发现：

- **样本效率**：MBPO 在所有任务上比 SAC 快约 10 倍，在 Hopper 和 Walker2d 上分别仅需 14 分钟和 40 分钟的等效实时仿真
- **渐近性能**：与最优无模型方法（SAC）相当，远超纯模型方法（PETS 在高维 Ant 任务上失败）
- **消融实验**：
  - 仅提高无模型 SAC 的梯度更新比（不用模型数据）无法匹配 MBPO，证明模型数据确实有帮助
  - 固定 \(k=1\) 的单步 rollout 已能获得大部分收益，验证了理论分析中"短 rollout 最优"的结论
  - 模型足够准确支持 200 步 rollout，但用于策略优化时短 rollout 效果更好；500 步 rollout 则误差过大

![消融实验](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x3.png)
*图 3：消融实验——无模型高更新比、不同 rollout 长度、值展开对比。单步 rollout 提供了一个难以超越的强基线。*

#### 🧪 练习题
```yaml
question: "MBPO 中分支 rollout 从哪里采样起始状态？"
options:
  - "从环境的初始状态分布中采样"
  - "从真实经验回放池中均匀采样已访问过的状态"
  - "从模型生成的虚拟状态中采样"
  - "从当前策略的在线轨迹末端状态采样"
answer: 1
explain: "MBPO 的核心设计是从真实经验回放池 D_env 中均匀采样状态作为模型 rollout 的起点（Algorithm 2 第 7 行），这保证了 rollout 起始分布接近真实数据分布，从而控制模型误差累积。"
```

### SimPLe

```yaml
id: simple
num: 31
name: SimPLe
full_name: 模拟策略学习 (Simulated Policy Learning)
year: '2020.04'
org: Google Research
parent: mbpo
paper_url: https://arxiv.org/abs/1903.00374
project_url: ''
category: planning
motivation: 在Atari 100k展示极高样本效率
```

#### 📝 一句话总结
SimPLe 提出用视频预测世界模型反复生成短程模拟轨迹，再用 PPO 在模型内训练策略，解决 Atari 低样本场景中无模型 RL 需要海量真实交互的问题。

#### 🎯 核心要点
- **迭代式 Dyna 框架**：真实环境采样、训练世界模型、在世界模型中训练策略三步循环执行
- **Atari 100k 设置**：只使用 100k agent-environment interactions，约等于两小时真实游戏时间
- **视频预测世界模型**：输入 4 帧堆叠图像和动作，预测下一帧与奖励
- **离散随机潜变量模型**：用离散 bit latent 表达环境随机性，训练 LSTM 自回归预测 latent bits
- **短 rollout 策略训练**：从真实 replay buffer 中随机状态启动模型 rollout，定期重置以控制模型误差累积
- **PPO 作为模型内优化器**：不直接用模型做树搜索，而是在学习到的模拟器里训练策略网络
- **经验聚合**：新策略回到真实 Atari 环境采样，扩展数据集后再更新世界模型

#### 🔬 深入细节
##### 主循环示意

![SimPLe 主循环](https://arxiv.org/html/1903.00374v5/extracted/1903.00374v5/figures/Cycle_full.png)
*图：SimPLe 的三阶段循环：真实环境交互收集数据、训练世界模型、在世界模型中训练策略。*

##### 算法伪代码

```python
# SimPLe: Simulated Policy Learning
initialize policy pi
initialize world_model M
replay = []

while real_env_budget_not_exhausted:
    # 1. 用当前策略收集真实 Atari 交互
    for t in range(real_steps_per_iter):
        a_t = pi(o_t)
        o_next, r_t, done = real_env.step(a_t)
        replay.append((o_t, a_t, r_t, o_next, done))
        o_t = reset_if_done(o_next, done)

    # 2. 用真实 replay 训练视频预测世界模型
    M.fit(replay, targets=["next_frame", "reward", "done"])

    # 3. 在世界模型中短 rollout，并用 PPO 更新策略
    for update in range(ppo_updates):
        start = sample_observation_stack(replay)
        simulated_traj = M.rollout(pi, start, horizon=short_horizon)
        pi = PPO_update(pi, simulated_traj, bootstrap_value=True)
```

##### 动机与背景

Atari 是像素输入、部分可观测、长时序决策的典型基准。DQN、Rainbow、IMPALA 等无模型算法可以获得很强最终性能，但通常需要数千万到数亿帧交互；这和人类玩家几分钟内形成游戏物理直觉的样本效率差距很大。SimPLe 的核心问题是：能否把“预测未来图像和奖励”转化为真实的策略学习收益？

论文采用近似 Dyna 的思想，但关键难点在于 Atari 的图像动力学非常复杂。世界模型如果直接长程展开，像素误差会逐步放大，策略还可能利用模型错误得到虚假高奖励。因此 SimPLe 不把模型当作完美模拟器，而是只用它提供短程、反复重启的想象经验。

##### 世界模型：从动作条件视频预测到随机 latent

SimPLe 的世界模型学习：

$$\hat{o}_{t+1}, \hat{r}_t, \hat{d}_t = M_\phi(o_{t-3:t}, a_t, z_t)$$

其中 \(o_{t-3:t}\) 是 4 帧堆叠观测，\(a_t\) 是 one-hot 动作，\(z_t\) 是随机潜变量。确定性版本用卷积编码器和反卷积解码器预测下一帧；随机版本增加一个近似后验网络，在训练时看到真实下一帧并产生离散 latent bits，在推理时由 LSTM 自回归生成这些 bits。

这种离散随机设计解决了两个问题。第一，Atari 中存在闪烁、遮挡、敌人行为等不确定性，单一确定性预测会平均化未来。第二，连续 VAE latent 的 KL 权重对游戏很敏感，离散 bit + 自回归 prior 更容易在多游戏上稳定工作。

训练损失由图像预测和奖励预测组成。图像输出既可以是连续 RGB，也可以是每像素 256 类 softmax。论文强调 clipped loss 很重要，因为 Atari 大面积背景像素容易主导梯度，而真正影响控制的是球、敌人、子弹等小区域。

##### 策略训练：短 rollout 控制模型偏差

在模型内训练策略时，SimPLe 使用 PPO。每个模拟 episode 不从模型自己生成的任意状态开始，而是从真实 replay buffer 的状态堆叠启动，并且只展开较短 horizon。这个设计类似后来 MBPO 的短分支 rollout：

$$\tau_{\text{model}} = (o_i, a_i, \hat{r}_i, \hat{o}_{i+1}, \ldots, \hat{o}_{i+k})$$

当 \(k\) 较短时，模型误差还没有严重累积；当 \(k\) 太长时，策略会进入模型未见过的状态区域，导致 model exploitation。SimPLe 还在 rollout 末尾用价值函数 bootstrap，缓解短 rollout 无法看到远期奖励的问题：

$$G_t = \sum_{j=0}^{k-1}\gamma^j \hat{r}_{t+j} + \gamma^k V_\psi(\hat{o}_{t+k})$$

##### 与传统方法的区别

SimPLe 与纯无模型 Atari 算法的差异在于：真实交互只用于改进世界模型，策略的大量梯度更新发生在模型里。它与 MuZero 的差异也很明显：MuZero 学习的是只服务于价值、奖励和策略的潜在模型，并通过 MCTS 规划；SimPLe 学习可视化的下一帧模拟器，并用 PPO 在该模拟器中训练策略。

> 💡 关键：SimPLe 的贡献不是证明像素世界模型完美，而是证明“短程视频预测 + 模型内策略优化 + 数据聚合”足以在 Atari 100k 低样本设置中取得强样本效率。

#### 🧪 练习题
```yaml
question: "SimPLe 在世界模型中训练策略时为什么使用短 rollout？"
options:
  - "因为 PPO 不能处理超过 1 步的轨迹"
  - "为了减少模型预测误差在长序列中的累积和被策略利用"
  - "因为 Atari 游戏没有长期奖励"
  - "为了完全避免价值函数 bootstrap"
answer: 1
explain: "SimPLe 的 learned simulator 并不完美，长程展开会放大像素和奖励误差；短 rollout 从真实 buffer 状态重启，可以控制模型偏差。"
```

### MuZero

```yaml
id: muzero
num: 32
name: MuZero
full_name: 无模型零 (MuZero)
year: '2020.12'
org: DeepMind
parent: mbpo
paper_url: https://www.nature.com/articles/s41586-020-03051-4
project_url: ''
category: planning
motivation: 学习对价值奖励策略有用的潜在动力学
```

#### 📝 一句话总结
MuZero 提出只学习对规划有用的潜在动力学、奖励、价值和策略，而不重建环境观测本身，从而在不知道规则的情况下把 AlphaZero 式 MCTS 扩展到 Atari、Go、Chess 和 Shogi。

#### 🎯 核心要点
- **三网络世界模型**：representation \(h_\theta\)、dynamics \(g_\theta\)、prediction \(f_\theta\)
- **不预测原始观测**：潜在状态只需保留能预测 reward、value、policy 的信息
- **潜在空间 MCTS**：树搜索在 learned hidden state 上展开，不需要真实环境模拟器
- **搜索策略监督**：训练目标中的 policy target 来自 MCTS visit distribution
- **奖励和值联合训练**：unroll 多步后同时预测即时奖励、折扣回报和值
- **跨领域统一**：同一算法同时处理已知完美规则游戏和未知视觉 Atari 环境
- **Reanalyze 思想**：可用最新网络重新分析历史轨迹，提升数据利用效率

#### 🔬 深入细节
##### 规划示意

![MuZero 潜在空间规划](https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/original_images/62277f565ad61d23ae431c30_Fig202.gif)
*图：MuZero 先用 representation function \(h\) 把历史观测映射到隐藏状态，再用 dynamics \(g\) 和 prediction \(f\) 在搜索树中评估未来动作。*

##### 算法伪代码

```python
# MuZero training and acting
for iteration in range(num_iterations):
    # Acting: 用 MCTS 改进当前策略
    history = env.reset()
    while not done:
        s0 = h_theta(history)
        search_tree = MCTS(root=s0, dynamics=g_theta, prediction=f_theta)
        pi_search = visit_count_distribution(search_tree)
        action = sample_or_argmax(pi_search)
        obs, reward, done = env.step(action)
        replay.add(history, action, reward, pi_search)
        history = history + [action, obs]

    # Training: 对真实轨迹做 recurrent unroll
    batch = replay.sample_sequences()
    for history_t, actions, rewards, value_targets, policy_targets in batch:
        s = h_theta(history_t)
        losses = prediction_loss(f_theta(s), policy_targets[0], value_targets[0])
        for k, a in enumerate(actions):
            s, r_hat = g_theta(s, a)
            p_hat, v_hat = f_theta(s)
            losses += reward_loss(r_hat, rewards[k])
            losses += value_loss(v_hat, value_targets[k + 1])
            losses += policy_loss(p_hat, policy_targets[k + 1])
        theta = optimizer.step(losses)
```

##### 动机与背景

AlphaZero 的强大来自 MCTS 与深度策略/价值网络的闭环：搜索产生更强的动作分布，网络再学习搜索结果。但 AlphaZero 依赖已知规则模拟器；它能在棋盘游戏中展开未来局面，却不能直接用于 Atari 这类只有像素观测、规则未知的环境。传统模型式 RL 试图学习完整环境模型 \(p(o_{t+1}|o_t,a_t)\)，但精确预测每个像素既难又未必与决策相关。

MuZero 的核心洞察是：规划不需要知道完整世界，只需要知道“动作会如何改变未来的奖励、价值和可选策略”。因此它学习的是 value-equivalent model，而不是 reconstruction model。

##### 三个函数：h、g、f

MuZero 的内部模型由三个函数组成：

$$s^0 = h_\theta(o_{1:t})$$

$$r^k, s^k = g_\theta(s^{k-1}, a^k)$$

$$p^k, v^k = f_\theta(s^k)$$

\(h_\theta\) 把历史观测编码为初始潜在状态；\(g_\theta\) 在潜在空间执行动作并预测即时奖励；\(f_\theta\) 从潜在状态预测策略先验 \(p\) 和价值 \(v\)。注意这里没有 decoder，也没有 \(\hat{o}_{t+1}\)。隐藏状态 \(s\) 只要能支持搜索和训练目标即可。

##### 潜在 MCTS 与动作选择

在每个真实环境步，MuZero 以 \(s^0\) 为根节点执行 MCTS。每条边维护访问次数 \(N(s,a)\)、平均价值 \(Q(s,a)\)、先验概率 \(P(s,a)\)、奖励 \(R(s,a)\) 和后继隐藏状态。选择动作时使用 PUCT 类规则：

$$a = \arg\max_a \left[ Q(s,a) + U(s,a) \right]$$

其中 \(U(s,a)\) 随先验 \(P(s,a)\) 和父节点访问次数增加，随该动作访问次数增加而下降。搜索结束后，真实动作不是直接由网络 policy 输出，而是由访问次数分布 \(\pi(a|s) \propto N(s,a)^{1/\tau}\) 产生。这使网络每次训练都在模仿一个比自己更强的搜索策略。

##### 训练目标：奖励、价值、策略三重监督

对一段真实轨迹，MuZero 从时间 \(t\) 的历史观测开始，在模型中按真实动作 unroll \(K\) 步，并在每一步监督：

$$\mathcal{L}_t(\theta)=
\sum_{k=0}^{K}\ell^v(v_t^k, z_{t+k})
+ \sum_{k=0}^{K}\ell^p(p_t^k, \pi_{t+k})
+ \sum_{k=1}^{K}\ell^r(r_t^k, u_{t+k})
+ c\|\theta\|^2
$$

其中 \(z\) 是 n-step bootstrapped return，\(\pi\) 是 MCTS visit distribution，\(u\) 是真实环境奖励。这个目标把“学模型”和“学规划”绑在一起：模型只会被奖励、价值和策略误差塑形，不会被像素重建误差牵引到任务无关细节。

##### 与 SimPLe/MBPO 的区别

SimPLe 和 MBPO 都使用模型生成经验再训练策略，因此模型误差可能直接污染策略梯度。MuZero 不把模型 rollout 当作 replay 数据，而是用模型在搜索树中评估候选动作；真实训练目标仍来自真实轨迹和搜索改进策略。相对 AlphaZero，MuZero 去掉了规则模拟器依赖；相对视频预测世界模型，它去掉了观测重建负担。

> 💡 关键：MuZero 的“世界模型”不是为了看见未来画面，而是为了让搜索树在隐藏空间里可靠地比较动作。

#### 🧪 练习题
```yaml
question: "MuZero 为什么不需要预测下一帧原始观测？"
options:
  - "因为它只在棋盘游戏中使用，没有像素输入"
  - "因为它学习的潜在模型只需预测奖励、价值和策略，足够支持规划"
  - "因为 MCTS 可以直接访问真实环境未来状态"
  - "因为策略网络完全不参与动作选择"
answer: 1
explain: "MuZero 的核心是 value-equivalent latent model；隐藏状态不重建观测，只服务于 reward/value/policy 预测和 MCTS。"
```

### TD-MPC

```yaml
id: tdmpc
num: 33
name: TD-MPC
full_name: 时序差分模型预测控制 (TD-MPC)
year: '2022.06'
org: UC San Diego
parent: muzero
paper_url: https://arxiv.org/abs/2203.04955
project_url: ''
category: planning
motivation: 结合TD学习与MPC无需显式重建损失
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

### IRIS

```yaml
id: iris
num: 34
name: IRIS
full_name: 内部语音想象 (Imagination with auto-Regression)
year: '2023.05'
org: Google DeepMind
parent: muzero
paper_url: https://openreview.net/forum?id=vhFu1Acb0xb
project_url: ''
category: planning
motivation: Transformer作为世界模型2小时达人类水平
```

#### 📝 一句话总结
IRIS 提出把 Atari 图像离散化为“inner speech”视觉 token，再用自回归 Transformer 建模动作条件未来 token 序列，并在该世界模型中训练策略，使 Atari 100k 仅约两小时交互即可达到人类归一化平均分 1.046。

#### 🎯 核心要点
- **离散自编码器**：将每帧图像压缩成离散 token 网格，形成可被 Transformer 建模的视觉语言
- **自回归世界模型**：Transformer 按序预测下一帧 token、reward 和 episode continuation
- **想象中训练智能体**：actor-critic 策略在 learned world model 中生成大量 imagined trajectories
- **无 lookahead search**：不使用 MCTS，仅依靠世界模型内的策略优化
- **Atari 100k SOTA**：在 26 个游戏上平均人类归一化分数 1.046，其中 10 个超过人类
- **分阶段训练**：真实交互更新 tokenizer/world model，再用想象轨迹更新 actor-critic
- **序列建模视角**：将动力学学习转化为离散 token 语言建模问题

#### 🔬 深入细节
##### 官方展示图

![IRIS 官方展示](https://raw.githubusercontent.com/eloialonso/iris/main/assets/iris.gif)
*图：IRIS 官方仓库展示的 Atari agent 行为。OpenReview 页面未提供稳定的 HTML 论文图片直链，因此这里引用官方代码仓库的公开展示图，并在下方用文字流程图说明架构。*

```text
真实 Atari 交互
      │
      ▼
离散自编码器 tokenizer: o_t -> tokens x_t
      │
      ▼
Transformer world model: p(x_{t+1}, r_t, d_t | x_{\le t}, a_{\le t})
      │
      ▼
想象 rollout: (tokens, actions, rewards)
      │
      ▼
Actor-Critic / PPO-style policy update
```

##### 算法伪代码

```python
# IRIS high-level training loop
initialize tokenizer E, D
initialize transformer_world_model W
initialize actor_critic pi, V
dataset = collect_random_atari_steps()

while real_step_budget_not_exhausted:
    # 1. 用真实帧训练离散 autoencoder
    tokens = E(dataset.frames)
    recon = D(tokens)
    update_tokenizer(reconstruction_loss(recon, dataset.frames))

    # 2. 训练动作条件 Transformer 世界模型
    seq = build_token_action_reward_sequences(dataset, E)
    update(W, next_token_loss + reward_loss + done_loss)

    # 3. 在世界模型中想象轨迹并训练策略
    for imagination_batch in range(num_batches):
        start_tokens = sample_context(dataset, E)
        imagined = W.rollout(policy=pi, start=start_tokens, horizon=H)
        update_actor_critic(pi, V, imagined)

    # 4. 回到真实 Atari 用新策略采样
    dataset += collect_real_steps(pi)
```

##### 动机与背景

SimPLe 证明了 Atari 中视频预测模型可以提升样本效率，但卷积/随机 latent 视频模型在长程一致性和细节表达上仍然困难。IRIS 的动机来自语言建模：如果图像能被转成离散 token，那么环境动力学就可以被建模为条件序列生成问题。Transformer 擅长长上下文和离散序列，因此可以替代传统的卷积递归视频预测模型。

IRIS 的名字来自 “Imagination with auto-Regression over an Inner Speech”。这里的 inner speech 指视觉 token 序列：agent 不直接在连续像素空间想象，而是在离散视觉语言空间中想象下一步会发生什么。

##### 离散 tokenizer：把帧变成视觉词表

给定 Atari 帧 \(o_t\)，离散自编码器将其编码为 token 网格：

$$x_t = E(o_t), \quad \hat{o}_t = D(x_t)$$

每个 token 来自有限 codebook。这样，一帧图像不再是连续像素矩阵，而是类似句子的离散符号序列。tokenizer 的好处有三点：压缩观测、降低预测维度、让 Transformer 使用标准 next-token objective。

##### Transformer 世界模型

世界模型学习如下分布：

$$p_\theta(x_{t+1}, r_t, d_t \mid x_{\le t}, a_{\le t})$$

其中 \(x_{t+1}\) 是下一帧 token，\(r_t\) 是奖励，\(d_t\) 表示 episode 是否继续。训练目标是 token 交叉熵、reward 分类/回归损失与 continuation 损失的组合：

$$\mathcal{L}_{WM}
= -\log p_\theta(x_{t+1}|x_{\le t},a_{\le t})
+ \mathcal{L}_r(\hat{r}_t,r_t)
+ \mathcal{L}_d(\hat{d}_t,d_t)$$

与 MuZero 不同，IRIS 的模型确实生成未来观测 token；与 SimPLe 不同，它把未来帧预测转成离散 Transformer 语言建模，而不是直接在像素空间卷积预测。

##### 想象中的策略学习

训练策略时，IRIS 从真实数据中采样上下文 token，之后交给世界模型自回归展开。策略 \(\pi_\psi(a_t|x_t)\) 在 imagined trajectory 中选择动作，世界模型返回下一个 token、奖励和终止信号。actor-critic 用这些想象轨迹更新：

$$A_t = \sum_{k=0}^{H-t-1}\gamma^k \hat{r}_{t+k} + \gamma^{H-t} V(\hat{x}_H) - V(\hat{x}_t)$$

这种方式的风险是模型偏差，但 Atari 100k 的收益很明显：真实样本少，想象样本便宜；Transformer 世界模型比早期视频模型更能维持短中期一致性。

##### 与 MuZero 和 Dreamer 的区别

MuZero 学 latent model 并用 MCTS 规划，不生成未来画面；Dreamer 学连续或随机 latent model，并在 latent imagination 中训练 actor；IRIS 则显式生成离散视觉 token，并把世界模型训练变成自回归序列建模。IRIS 不依赖 lookahead search，因此结果更直接体现 Transformer world model 的样本效率。

> 💡 关键：IRIS 的核心不是“更复杂的策略优化器”，而是把世界模型从像素回归改造成视觉 token 的语言建模问题。

#### 🧪 练习题
```yaml
question: "IRIS 中 'inner speech' 最准确指什么？"
options:
  - "策略网络生成的自然语言推理文本"
  - "离散自编码器把 Atari 图像转换成的视觉 token 序列"
  - "MCTS 搜索树中的访问次数分布"
  - "奖励函数的人工解释"
answer: 1
explain: "IRIS 将图像离散化为 token，Transformer 在这些 token 上做动作条件自回归预测，因此称为 inner speech。"
```

### TD-MPC2

```yaml
id: tdmpc2
num: 35
name: TD-MPC2
full_name: 时序差分模型预测控制2 (TD-MPC2)
year: '2024.05'
org: UC San Diego
parent: tdmpc
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html
project_url: ''
category: planning
motivation: 可扩展鲁棒的连续控制世界模型
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

### Jumpy WM

```yaml
id: jumpy_wm
num: 36
name: Jumpy WM
full_name: 跳跃式世界模型 (Compositional Planning with Jumpy WM)
year: '2026.02'
org: DeepMind
parent: tdmpc2
paper_url: https://icml.cc/Conferences/2026
project_url: ''
category: planning
motivation: 跳跃式动力学解决长程规划误差累积
```

#### 📝 一句话总结
Jumpy WM 提出学习跨多个时间尺度的“跳跃式”多步动力学模型，用它在测试时组合预训练策略而不是逐步规划原始动作，从而缓解长程规划中一步模型误差累积和任务特定层级训练成本的问题。

#### 🎯 核心要点
- **资料限制**：清单 `paper_url` 是 ICML 2026 会议首页，正文基于可访问 arXiv 论文 `Compositional Planning with Jumpy World Models`
- **策略级规划**：把预训练策略作为 temporally extended actions，在测试时规划策略序列
- **Jumpy world model / GHM**：学习 policy-conditioned、horizon-conditioned 的未来状态分布
- **多时间尺度预测**：用几何折扣 horizon 表达短期到长期 successor occupancy
- **Horizon consistency**：提出 Temporal Difference Horizon Consistency，使不同时间尺度预测彼此一致
- **CompPlan**：用 learned GHM 估计任意策略序列的价值，并通过随机 shooting 选择组合
- **OGBench 验证**：在 antmaze 和 cube manipulation 长程任务上，组合规划显著优于 zero-shot 策略和 action-level planning

#### 🔬 深入细节
##### 论文图与框架说明

![Jumpy WM 结果图](https://arxiv.org/html/2602.19634v1/x1.png)
*图：论文 Figure 1 展示 ActionPlan、GPI 和 CompPlan 在长程任务上的成功率变化。arXiv HTML 暴露的主图偏结果对比，方法框架见下方流程图。*

```text
离线数据 + 一组预训练策略 π_i
      │
      ▼
训练 policy-conditioned GHM:
    p_\theta(s' | s, policy_id / policy_embedding, horizon γ)
      │
      ├── td-flow: 学习多步 successor distribution
      └── td-hc: 对齐不同 horizon 的预测
      ▼
测试时 CompPlan:
    采样候选策略序列和切换时间尺度
      │
      ▼
用 GHM 估计执行该策略序列后的 future occupancy 和 return
      │
      ▼
执行第一段策略，随后 receding-horizon replanning
```

##### 算法伪代码

```python
# Jumpy WM / CompPlan simplified pseudocode
pretrained_policies = [pi_1, pi_2, ..., pi_n]
GHM = train_geometric_horizon_model(
    offline_dataset,
    condition_on=["state", "policy_embedding", "discount_horizon"],
    losses=["td_flow", "temporal_difference_horizon_consistency"]
)

def compplan(state, goal_or_reward):
    candidates = []
    for _ in range(num_random_shooting_samples):
        # 候选是策略序列，而不是原始动作序列
        policy_seq = sample_policy_sequence(pretrained_policies)
        switch_probs = sample_or_fix_switching_probabilities()

        value = evaluate_policy_sequence_with_GHM(
            GHM, state, policy_seq, switch_probs, reward=goal_or_reward
        )
        candidates.append((value, policy_seq, switch_probs))

    best = max(candidates, key=lambda x: x[0])
    return best.policy_seq[0]  # 执行第一段策略，之后重新规划
```

##### 动机与背景

长程任务中，一步世界模型会遇到典型误差累积问题。即使每一步预测误差很小，规划 horizon 一长，模型 rollout 也会逐渐偏离真实可达状态。层级强化学习试图用 options 或 high-level policies 缩短规划长度，但通常需要为目标任务训练层级结构，泛化到新任务时不够灵活。

Jumpy WM 采取不同路线：给定一组已经训练好的 base policies，不再学习新的高层策略，而是在测试时直接规划“执行哪个策略、执行多久”。这把动作空间从 primitive actions 提升到 behavior level。世界模型也从一步转移：

$$p(s_{t+1}|s_t,a_t)$$

变成策略和时间尺度条件的多步 occupancy 预测：

$$p_\theta(s'|s, \pi, \gamma)$$

其中 \(\gamma\) 可理解为几何分布的时间尺度或折扣 horizon。

##### Jumpy world model：预测 successor occupancy

论文把模型称为 Geometric Horizon Model (GHM)。它不是预测固定 \(k\) 步后的单一状态，而是预测某个策略在几何时间尺度下诱导的状态分布。直观上，如果从状态 \(s\) 开始执行策略 \(\pi\)，GHM 预测“若在未来某个随机时间截断，可能落到哪里”。

这种表示比一步模型更适合行为组合：当 base policy 自身已经能完成局部导航或局部操控时，规划器不必逐动作模拟每个细节，只需要知道执行该策略一段时间后状态分布如何变化。

##### Horizon consistency：跨时间尺度对齐

多 horizon 模型的风险是各时间尺度彼此不一致：短 horizon 预测说能到 A，长 horizon 预测却像是从另一套动力学产生。Jumpy WM 基于 Temporal Difference Flows 加入 horizon consistency，让长时间尺度预测可由短时间尺度预测 bootstrap：

$$\text{long-horizon occupancy}
\approx \text{short-horizon step}
\circ \text{remaining-horizon occupancy}$$

对应损失可概括为：

$$\mathcal{L}_{\text{td-hc}}
= \mathcal{L}_{\text{td-flow}}
+ \beta \cdot D\left(
p_\theta(\cdot|s,\pi,\gamma_{\text{long}}),
\tilde{p}_\theta(\cdot|s,\pi,\gamma_{\text{short}},\gamma_{\text{long}})
\right)$$

其中 \(D\) 是分布匹配项，\(\tilde{p}\) 表示由短 horizon 预测递推组合出的目标。实践中只对部分 mini-batch 使用 consistency 项，以免模型早期错误自举造成偏差。

##### CompPlan：把策略当动作组合

给定奖励函数或目标，CompPlan 要找一段策略序列：

$$\pi_{i_1}, \pi_{i_2}, \ldots, \pi_{i_m}$$

每段策略有自己的 switching probability，控制执行时间尺度。GHM 负责估计执行该序列后的状态分布和期望回报。优化上，论文使用 random shooting：采样候选策略序列和中间 subgoals，用 GHM 快速评分，选择最高值方案，并只执行第一段，之后重新规划。

这个框架包含多个已有方法作为特例：若每一步都切换，就退化成 action-level MPC；若只选择一个策略并执行到结束，就接近 GPI；若固定几何切换时间，则对应 GGPI。CompPlan 的优势在于允许不同策略和不同时间尺度灵活组合。

##### 与 TD-MPC2 的关系

TD-MPC2 仍是在 action space 中做短 horizon latent MPC；Jumpy WM 把规划粒度提升到 policy space。前者依赖 learned latent dynamics 对短期动作序列排序，后者依赖 GHM 对“执行一个已有策略一段时间后会到哪里”建模。对长程稀疏任务，policy-level jump 可以显著缩短有效规划深度。

> 💡 关键：Jumpy WM 的“jump”不是跳过建模，而是把模型预测对象从一步动作转移提升到多步策略诱导状态分布，从而让组合规划避开长链一步误差。

#### 🧪 练习题
```yaml
question: "Jumpy WM 中 CompPlan 规划的基本单元是什么？"
options:
  - "单个 primitive action"
  - "像素级未来帧"
  - "预训练策略及其执行时间尺度"
  - "人工标注的任务子目标文本"
answer: 2
explain: "CompPlan 把预训练策略视作 temporally extended actions，并用 jumpy world model 估计策略序列的未来 occupancy 和价值。"
```

### RLVR-World

```yaml
id: rlvr_world
num: 37
name: RLVR-World
full_name: RL微调世界模型 (Training World Models with RL)
year: '2026.01'
org: Tsinghua University
parent: iris
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/4ec03ed08a3fcb59e1c815b5598beff1-Abstract-Datasets_and_Benchmarks_Track.html
project_url: ''
category: planning
motivation: 利用RL微调提升多步预测因果连贯性
```

#### 📝 一句话总结
RLVR-World 提出把语言和视频世界模型统一为自回归序列模型，并用可验证预测指标作为奖励进行 RLVR/GRPO 微调，解决最大似然训练目标与实际世界转移评估指标不一致的问题。

#### 🎯 核心要点
- **资料说明**：清单给的是 NeurIPS 2025 proceedings 链接，方法细节和图源来自同题 arXiv 与项目页公开资料
- **统一序列建模**：语言状态、视觉状态、动作和连续控制量都转成 token 序列
- **RLVR 后训练**：用 verifiable rewards 直接优化预测准确率、F1、MSE、LPIPS、SSIM 等任务指标
- **GRPO 优化**：采样一组候选未来状态，用组内归一化奖励估计优势，无需单独 value function
- **语言世界模型**：覆盖 text game state prediction 与 web page state prediction
- **视频世界模型**：对机器人操作视频未来帧进行视觉 tokenizer/decoder 建模
- **下游收益**：提升 WebArena web agent MPC 成功率，并改善机器人视频预测质量与重复伪影

#### 🔬 深入细节
##### 方法框架

![RLVR-World 方法图](https://thuml.github.io/RLVR-World/static/images/method.png)
*图：RLVR-World 将语言和视频世界模型统一成序列模型，对采样输出解码后用可验证指标计算奖励，并通过 GRPO 更新模型。*

##### 算法伪代码

```python
# RLVR-World: post-training a pretrained world model
pretrained_WM = load_mle_world_model()

for batch in world_transition_dataset:
    q = tokenize_state_action(batch.state, batch.action)
    gt_next = batch.next_state

    # 1. group sampling
    samples = [pretrained_WM.generate(q) for _ in range(group_size)]

    # 2. modality-specific detokenization / extraction
    decoded = [decode_or_extract(sample) for sample in samples]

    # 3. verifiable reward from task metric
    rewards = [metric(pred, gt_next) for pred in decoded]
    advantages = normalize_within_group(rewards)

    # 4. GRPO update with KL regularization
    loss = 0
    for sample, adv in zip(samples, advantages):
        ratio = prob_theta(sample, q) / prob_old(sample, q)
        loss += -min(ratio * adv, clip(ratio, 1-eps, 1+eps) * adv)
        loss += beta * KL(policy_theta, reference_model)
    optimizer.step(loss)
```

##### 动机与背景

世界模型通常用最大似然训练：

$$\max_\theta \log p_\theta(s_{t+1}|s_t,a_t)$$

但 MLE 优化的是 token 级似然，不一定等价于下游关心的“状态转移是否正确”。在文本游戏中，一个对象属性错了就会导致状态预测失败；在网页环境中，DOM 元素或字段 F1 才是关键；在视频世界模型中，像素 token 似然高也可能产生重复、模糊或因果不连贯的未来帧。RLVR-World 的核心动机就是把训练目标改为直接优化这些可验证指标。

##### 世界模型作为序列模型

RLVR-World 把不同模态统一成 prompt-response：

$$q = \mathrm{Template}(s_t,a_t), \quad y = \mathrm{Tokens}(s_{t+1})$$

语言状态用文本 tokenizer；图像/视频用视觉 tokenizer；低维连续控制量可量化成离散 bins。这样，语言世界模型和视频世界模型都可以用 decoder-only Transformer 形式表示：

$$p_\theta(y|q)=\prod_i p_\theta(y_i|q,y_{<i})$$

这与 IRIS 的思想一致：把世界转移预测看成 token 序列生成。但 RLVR-World 进一步关注后训练目标，不满足于 token likelihood。

##### 可验证奖励：从 token loss 到 decoded metric

给定模型生成的一组候选输出 \(\{y^{(i)}\}_{i=1}^G\)，RLVR-World 先把它们解码成预测状态：

$$\hat{s}_{t+1}^{(i)} = \mathrm{Decode}(y^{(i)})$$

再用任务指标与 ground truth 比较：

$$r^{(i)} = R(\hat{s}_{t+1}^{(i)}, s_{t+1})$$

语言任务中，\(R\) 可以是 exact match、accuracy 或 F1；视频任务中，\(R\) 可以是 MSE、LPIPS、SSIM 等视觉质量指标。关键是奖励不来自 learned reward model，而来自可验证的外部评估函数，因此比 RLHF 更少受到偏好模型漂移影响。

##### GRPO 更新与组内相对优势

RLVR-World 采用 GRPO。对同一个输入采样多条输出，用组内奖励均值和标准差归一化得到 advantage：

$$A^{(i)} = \frac{r^{(i)}-\mathrm{mean}(\{r^{(j)}\})}{\mathrm{std}(\{r^{(j)}\})+\epsilon}$$

优化目标类似 PPO 裁剪目标，并加入参考模型 KL 约束：

$$\mathcal{L}_{\text{GRPO}}
= -\mathbb{E}_i
\left[
\min(\rho_i A^{(i)}, \mathrm{clip}(\rho_i,1-\epsilon,1+\epsilon)A^{(i)})
- \beta D_{\mathrm{KL}}(\pi_\theta \| \pi_{\text{ref}})
\right]$$

其中 \(\rho_i\) 是新旧模型生成该响应的概率比。因为 advantage 来自同输入的样本组，GRPO 不需要训练 value function，适合生成模型后训练。

##### 语言与视频实验的意义

在语言世界模型中，RLVR-World 用 text game 和 WebArena 风格网页状态转移评估，直接提升状态字段预测准确率/F1；更重要的是，改进后的网页世界模型可用于 MPC 式 web agent，在候选动作前模拟网页状态，从而提升下游成功率。

在视频世界模型中，RLVR-World 对机器人操作轨迹预测进行 RL 微调。模型先用视觉 tokenizer 编码视频帧和动作，再生成未来视觉 token，最后解码成帧并用视觉指标打分。相对纯 MLE，RLVR 能直接惩罚重复和视觉失真，使未来帧更符合真实操作因果。

> 💡 关键：RLVR-World 把“世界模型训练”从 token 级拟合推进到 metric-level 后训练，让模型直接对下游可验证预测质量负责。

#### 🧪 练习题
```yaml
question: "RLVR-World 相比最大似然训练的核心变化是什么？"
options:
  - "完全取消自回归建模，只使用物理引擎"
  - "用 decoded prediction 的可验证任务指标作为奖励进行 RL 微调"
  - "只训练奖励模型，不训练世界模型"
  - "把所有视频帧改成人工文本标签"
answer: 1
explain: "RLVR-World 仍可基于自回归世界模型，但后训练阶段用 accuracy/F1/LPIPS 等可验证指标直接优化生成预测。"
```

### UniDrive-WM

```yaml
id: unidrive_wm
num: 38
name: UniDrive-WM
full_name: 统一驾驶世界模型 (Unified Driving World Model)
year: '2026.01'
org: UC Berkeley
parent: gaia3
paper_url: https://arxiv.org/abs/2601.04453
project_url: ''
category: embodied
motivation: 统一理解规划生成支持多摄像头一致性
```

#### 📝 一句话总结
UniDrive-WM 提出一个统一 VLM 驾驶世界模型，在同一架构中联合完成多视角场景理解、轨迹规划和轨迹条件未来图像生成，解决自动驾驶中感知、预测、规划和生成模块割裂导致的信息瓶颈与误差累积问题。

#### 🎯 核心要点
- **统一 VLM 框架**：将 scene understanding、trajectory planning、future image generation 集成到同一多模态模型
- **QT-Former 编码器**：融合多摄像头视觉输入、历史记忆、感知查询和场景查询
- **连续轨迹规划头**：输出未来 ego trajectory，将语言/视觉推理空间连接到动作空间
- **轨迹条件未来图像生成**：用预测轨迹作为条件生成未来前视图像，形成可视化世界模型
- **两种生成路径**：比较离散 AR visual token 生成和连续 AR+diffusion/flow-matching 生成
- **联合训练流程**：先联合规划与图像生成，再加入 VQA/场景理解任务
- **Bench2Drive 评估**：在规划 L2 error、collision rate 和生成质量上优于此前方法

#### 🔬 深入细节
##### Pipeline 图

![UniDrive-WM pipeline](https://unidrive-wm.github.io/UniDrive-WM/static/png/pipeline2.png)
*图：UniDrive-WM 将多视角图像、历史和查询输入 QT-Former，再送入 LLM/LoRA，统一输出轨迹规划、未来图像生成和 VQA/场景理解结果。*

##### 算法伪代码

```python
# UniDrive-WM training and inference pipeline
def unidrive_forward(multiview_images, history, instruction):
    # 1. 多视角视觉与历史编码
    image_features = vision_encoder(multiview_images)
    query_features = QTFormer(
        image_features,
        perception_queries=True,
        scene_queries=True,
        history_queries=history
    )

    # 2. VLM reasoning space
    text_tokens = text_tokenizer(instruction)
    vlm_tokens = fuse_text_vision(text_tokens, query_features)
    hidden = LLM_with_LoRA(vlm_tokens)

    # 3. 多任务输出
    trajectory = trajectory_head(hidden)             # future ego waypoints
    future_image = image_generator(hidden, trajectory)
    vqa_answer = language_head(hidden)
    return trajectory, future_image, vqa_answer

# training objective
loss = planning_loss(trajectory, gt_waypoints)
loss += future_image_loss(future_image, gt_future_frame)
loss += vqa_loss(vqa_answer, gt_text_answer)
```

##### 动机与背景

自动驾驶世界模型通常要同时回答三个问题：当前场景是什么、未来会怎样、车辆应该怎么走。现有系统常把它们拆成独立模块：感知网络检测物体，规划器预测轨迹，生成模型渲染未来帧，VLM 再做文本推理。这种流水线会产生信息瓶颈。例如，丰富的几何和运动线索被压缩成文本描述后再用于规划，会丢失细节；生成模型可以合成逼真画面，却未必与规划轨迹一致。

UniDrive-WM 的动机是把理解、规划和生成统一在一个 VLM-centric world model 中，使动作空间、视觉未来和语言推理空间互相约束。论文在 arXiv 上已有 v3 更新；清单中的通用 abs 链接保持有效，正文按当前可访问版本总结。

##### 统一任务形式

论文把驾驶世界建模写成联合预测：

$$p_\theta(s_{t+1}, \tau_{t:t+H} \mid s_{\le t}, I)$$

其中 \(s_{\le t}\) 包含多视角图像、历史上下文和感知特征，\(I\) 是语言/高层指令，\(\tau\) 是未来 ego trajectory，\(s_{t+1}\) 的一部分由未来图像表示。更具体地：

$$\hat{\tau}, \hat{x}_{t+1}, \hat{y}_{\text{VQA}}
= f_\theta(\text{multi-view images}, \text{history}, \text{instruction})$$

这种联合输出让规划不再只是数值轨迹，未来图像也不再只是无条件生成，而是轨迹条件的可视化预测。

##### QT-Former：多视角和历史融合

UniDrive-WM 建立在 Orion 风格的 VLM 驾驶规划模型上，使用 QT-Former 处理视觉特征。多摄像头图像先经 vision encoder 得到 image features，再通过 learnable queries 与图像特征做 cross-attention。查询分成几类：perception queries 用于对象、车道、交通状态等感知辅助头；scene queries 用于场景语义；history queries 通过 memory bank 保留历史帧信息。

这种结构的价值在于把多视角几何、时间历史和场景语义压成可送入 LLM 的 vision embeddings。LLM 不直接处理原始多摄像头像素，而是在查询抽取后的紧凑表示上进行推理和输出。

##### 轨迹规划与未来图像生成的耦合

UniDrive-WM 的 trajectory planner 输出连续未来 waypoint。这个轨迹不仅是最终规划结果，还作为 future image generation 的条件。生成分两条路线：

- **离散 AR 路线**：把未来图像离散为 visual tokens，让 LLM/AR decoder 预测 token，再用 MoVQGAN 等 detokenizer 还原图像
- **AR+Diffusion 路线**：先自回归预测连续 latent，再用 diffusion/flow-matching 风格 decoder 生成更高保真图像

两者体现了世界模型中的经典权衡：离散 AR 更统一、更像语言建模；连续扩散路径生成质量更强，但系统复杂度和计算成本更高。

##### 联合损失与训练流程

训练目标可以概括为：

$$\mathcal{L}
= \lambda_{\text{plan}}\mathcal{L}_{\text{traj}}(\hat{\tau},\tau)
+ \lambda_{\text{img}}\mathcal{L}_{\text{img}}(\hat{x}_{t+1},x_{t+1})
+ \lambda_{\text{vqa}}\mathcal{L}_{\text{text}}(\hat{y},y)$$

规划损失约束未来 waypoint，图像损失约束轨迹条件未来帧，VQA/文本损失增强场景理解和动作推理。论文训练流程先联合规划与图像生成，使模型学会把动作和视觉未来对齐；随后加入 VQA 等理解任务，提高 VLM 对驾驶场景的语义解释能力。

##### 与传统自动驾驶世界模型的区别

GAIA、DriveDreamer 等驾驶世界模型侧重视觉未来生成；VLM planning 方法侧重语言/视觉推理到轨迹；UniDrive-WM 的重点是统一三者。未来图像为规划提供额外监督，规划轨迹为图像生成提供可控条件，VQA 任务又迫使共享表示保留语义和因果信息。

> 💡 关键：UniDrive-WM 的世界模型不是单纯“生成未来街景”，而是把未来街景生成变成轨迹规划的可视化一致性约束。

#### 🧪 练习题
```yaml
question: "UniDrive-WM 中未来图像生成为什么要以规划轨迹为条件？"
options:
  - "为了让生成的未来场景与 ego 车辆计划动作保持一致"
  - "为了取消多视角视觉编码器"
  - "为了只输出文本，不再输出轨迹"
  - "为了避免训练时使用任何真实未来帧"
answer: 0
explain: "轨迹条件生成把动作空间和视觉未来连接起来，使模型预测的未来画面能反映计划中的车辆运动。"
```

### ReSim

```yaml
id: resim
num: 39
name: ReSim
full_name: 可靠仿真 (Reliable World Simulation)
year: '2026.02'
org: University of Tübingen
parent: gaia3
paper_url: https://proceedings.neurips.cc/paper/2026/resim
project_url: ''
category: embodied
motivation: 丰富驾驶日志生成高保真闭环仿真环境
```

#### 📝 一句话总结
ReSim 提出可靠驾驶世界仿真范式，用动作条件视频世界模型生成未来自车视角，并用 Video2Reward 从视频中估计轨迹奖励，解决驾驶评测中开环日志无法暴露误差累积和非专家行为的问题。清单中的 NeurIPS 2026 链接疑似占位符；本精读依据可访问论文 arXiv:2506.09981v2、NVIDIA/OpenDriveLab 项目页整理。

#### 🎯 核心要点
- 基于真实驾驶日志和仿真数据训练动作可控的未来视频世界模型，支持专家动作、非专家动作和无动作条件预测。
- 生成 4 秒、10Hz 的未来自车视角视频，条件包括历史视觉帧、高层导航指令和 4 秒、2Hz waypoint 序列。
- 引入 Video2Reward (V2R)：用 CARLA infraction score 监督冻结 DINOv2 特征上的轻量奖励头，从预测视频估计轨迹质量。
- 提供三类应用：视频预测式策略、奖励引导的多策略选择、闭环视觉仿真。
- 相比 Vista 等驾驶世界模型，论文报告 ReSim 在 Waymo 零样本动作条件预测中显著降低轨迹误差，并在非专家动作上获得更好的真实感和轨迹跟随。
- 关键思想是把“驾驶动作是否可靠”转化为“给定动作后未来视频是否真实、是否跟随轨迹、是否可由奖励模型判定安全”。

#### 🔬 深入细节
![ReSim 总体框架](https://arxiv.org/html/2506.09981v2/x1.png)
*图：ReSim 将驾驶日志、动作条件视频预测、Video2Reward 和闭环评测连接成可靠世界仿真流程。*

```python
# ReSim 训练与闭环使用伪代码
def train_resim(real_logs, carla_rollouts):
    video_data = mix(real_logs, carla_rollouts)
    resim = finetune_video_world_model(
        video_data,
        condition=["history_frames", "route_command", "future_waypoints"],
        target="future_ego_view_video"
    )

    # CARLA 提供安全/危险行为及 infraction score，V2R 学会从视频估计奖励
    v2r = train_reward_head(
        frozen_backbone="DINOv2",
        videos=carla_rollouts.videos,
        labels=carla_rollouts.infraction_scores
    )
    return resim, v2r

def closed_loop_eval(agent, resim, v2r, obs):
    for t in range(T):
        candidates = agent.propose_trajectories(obs)
        scores = []
        for traj in candidates:
            future_video = resim.predict(obs.history, obs.command, traj)
            scores.append(v2r(future_video))
        action = candidates[argmax(scores)]
        obs = resim.step(obs, action)  # 预测视频帧回灌给 agent
```

ReSim 的动机是自动驾驶评测长期依赖开环日志：模型只在固定历史场景上预测轨迹，无法观察“模型自己执行动作后世界会怎样变化”。这会掩盖两个关键风险：第一，策略在前几步产生偏差后会进入日志中没有覆盖的状态；第二，非专家或危险动作下，传统世界模型往往只会生成模糊或不跟随动作的视频，无法作为可靠仿真器。

ReSim 把世界模型写成条件生成问题：

$$
p_\theta(x_{t+1:t+H}\mid x_{t-K:t}, c_t, a_{t:t+H}),
$$

其中 \(x\) 是自车视角视频，\(c_t\) 是高层指令，\(a_{t:t+H}\) 是未来 waypoint/轨迹条件。核心难点不只是视频清晰，而是要在动作偏离专家分布时仍保持可控；否则闭环评测会把世界模型错误误认为策略错误。论文因此使用仿真数据补充真实日志中的动作覆盖，尤其覆盖急转、碰撞、低速等非专家行为。

V2R 是 ReSim 区别于普通视频世界模型的第二个关键模块。它不手写复杂 3D 规则，而是利用 CARLA 的 infraction score 作为监督信号，学习：

$$
\hat r = g_\phi(\mathrm{DINOv2}(x_{t+1:t+H})),
\qquad
\mathcal{L}_{\text{V2R}} = \|\hat r-r_{\text{CARLA}}\|_2^2 .
$$

直觉上，ReSim 负责“想象如果这么开会看到什么”，V2R 负责“从想象视频判断这个未来有多安全”。因为接口是视频，V2R 可以迁移到真实驾驶视频预测，而不依赖 CARLA 的内部状态或手工 3D 语义。

在推理阶段，ReSim 可作为策略本身：先无动作条件生成未来视频计划，再由 inverse dynamics model (IDM) 把视频转成自车轨迹。也可以作为策略选择器：多个 planner 输出候选轨迹，ReSim 分别渲染未来视频，V2R 打分后选择最高奖励轨迹。进一步地，它还能作为闭环视觉仿真器，把 agent 的动作执行成下一帧观测，再让 agent 基于新观测继续决策。

与 GAIA-1、DriveDreamer、Vista 等传统驾驶世界模型相比，ReSim 的重点不是只做高保真视频生成，而是补齐“动作可控性 + 奖励估计 + 闭环回灌”。这使它能评估非专家动作、长时滚动误差和策略选择效果，更接近真实部署中 agent 会连续改变世界状态的情况。

> ⚠️ 注意：清单 `paper_url` 指向的 NeurIPS 2026 页面当前不可作为论文来源；可访问公开版本显示该工作为 ReSim: Reliable World Simulation for Autonomous Driving，论文与项目页由 OpenDriveLab/NVIDIA/University of Tübingen 等团队发布。

#### 🧪 练习题
```yaml
question: "ReSim 中 Video2Reward 的主要作用是什么？"
options:
  - "把 RGB 视频压缩成低维 token 以减少显存"
  - "从预测未来视频中估计候选轨迹的安全/任务奖励"
  - "替代世界模型直接输出车辆控制指令"
  - "把 CARLA 场景转换成真实驾驶日志"
answer: 1
explain: "V2R 用 CARLA infraction score 监督，从视频特征估计轨迹奖励；推理时它给 ReSim 生成的候选未来打分，支持策略选择和闭环评测。"
```

### NavThinker

```yaml
id: navthinker
num: 40
name: NavThinker
full_name: 导航思考者 (Social Navigation via World Models)
year: '2026.03'
org: Zhejiang University
parent: vjepa21
paper_url: https://arxiv.org/abs/2603.15359
project_url: ''
category: embodied
motivation: 深度特征空间前瞻思考降低碰撞率
```

#### 📝 一句话总结
NavThinker 提出面向社交导航的动作条件世界模型，在 Depth Anything V2 patch 特征空间中预测未来场景几何和行人轨迹，并把想象结果注入 DD-PPO 策略，解决机器人在人群中只看当前观测、缺乏前瞻交互推理的问题。

#### 🎯 核心要点
- 将社交导航建模为部分可观测 POMDP，显式处理机器人动作与行人运动相互耦合的问题。
- 世界模型运行在冻结 Depth Anything V2 的 patch feature 空间，用 causal Transformer 做动作条件自回归预测。
- 多头解码器从未来 latent 中预测深度图、行人未来轨迹和奖励，使 latent imagination 与可通行几何和交互风险对齐。
- 策略端使用 ResNet+GRU 编码当前深度观测，并为所有候选离散动作查询世界模型，获得 look-ahead future features。
- 训练采用 DD-PPO，同时使用两种前瞻信号：动作条件未来特征融合、基于预测行人轨迹的 social reward shaping。
- 在 Social-HM3D 单机器人、多机器人设置中超过 A*/ORCA/Habitat/Falcon，并零样本迁移到 Social-MP3D；还在 Unitree Go2 上做真实部署。

#### 🔬 深入细节
![NavThinker 架构图](https://arxiv.org/html/2603.15359v2/x2.png)
*图：NavThinker 由动作条件场景-交互世界模型和 imagination-augmented planner policy 两部分组成。*

```python
# NavThinker 世界模型与策略训练伪代码
def train_world_model(batch):
    z = depth_anything_v2(batch.depth_frames)       # frozen DA-V2 patch tokens
    action_tokens = embed(batch.actions)
    z_pred = causal_transformer(z.history, action_tokens)
    depth_pred = depth_decoder(z_pred)
    traj_pred = human_traj_decoder(z_pred)
    reward_pred = reward_decoder(z_pred)
    loss = latent_loss(z_pred, z.target) \
         + depth_loss(depth_pred, batch.future_depth) \
         + traj_loss(traj_pred, batch.future_humans) \
         + reward_loss(reward_pred, batch.reward)
    update(world_model, loss)

def act_with_imagination(obs, goal):
    h = gru(resnet(obs.depth), obs.prev_action)
    imagined = []
    for a in discrete_actions:
        z_next = world_model.transition(obs.depth_latent, action=a)
        imagined.append(z_next)
    policy_input = fuse(h, concat(imagined), goal)
    return actor_critic(policy_input)  # DD-PPO update
```

社交导航的难点是“预测”和“规划”不能拆开做。若把行人预测看成固定输入，机器人自己的动作对行人的影响就被忽略；若只用 RL 从经验中隐式学习，又很难在遮挡、盲角和密集交互中提前规避冲突。NavThinker 的核心假设是：策略在执行前应该比较不同动作导致的未来场景，从而把未来交互风险纳入当前决策。

论文将机器人状态、静态场景和行人状态拆成潜在状态 \(s_t=(p_t, m_t, h_t^1,\dots,h_t^N)\)，但机器人只能看到局部深度图 \(d_t\)、目标 \(g_t\) 和自身位姿。世界模型用冻结 DA-V2 编码深度：

$$
z_t = E_{\text{DA-V2}}(d_t),
\qquad
\hat z_{t+1}^{(a)} = F_\theta(z_{t-C:t}, a_t),
$$

其中动作 token 被追加到 patch 序列中，causal sliding-window mask 保证模型按时间自回归地想象未来。冻结深度基础模型的好处是 latent 自带几何结构，比从 RGB/深度端到端学动态更稳，也更容易迁移到新场景。

为了让 latent 不只“像特征”，还对导航有用，NavThinker 给预测 latent 接了三个任务头：

$$
\mathcal{L}
= \mathcal{L}_{\text{latent}}
+ \lambda_d \mathcal{L}_{\text{depth}}
+ \lambda_h \mathcal{L}_{\text{traj}}
+ \lambda_r \mathcal{L}_{\text{reward}} .
$$

深度重建让模型关注可通行几何，行人轨迹预测让模型关注动态交互，奖励头把未来与任务收益关联起来。论文消融显示，加入深度和轨迹解码器能提升 latent cosine similarity、降低 depth RMSE 和行人轨迹误差。

策略学习阶段，NavThinker 不让策略完全依赖生成的 latent，而是保持当前真实观测编码 \(h_t\)，再融合每个候选动作的 imagined future：

$$
\pi(a_t\mid o_{\le t}, g_t)
= \pi_\psi\left(h_t, \mathrm{Fuse}\left(\{\hat z_{t+1}^{(a)}\}_{a\in\mathcal{A}}\right), g_t\right).
$$

同时，奖励中加入预测行人轨迹带来的 social cost，使策略在训练时为“未来可能碰撞/侵犯个人空间”的动作付出代价。这样设计的直觉很直接：look-ahead feature 负责让 actor 看到不同动作的后果，trajectory reward shaping 负责让 critic/return 把社会合规性量化进优化目标。

与 ORCA/A* 等规则规划相比，NavThinker 不需要手工规定所有人群交互；与 Falcon 这类未来感知 RL 相比，它的未来来自动作条件世界模型，而不是与动作弱耦合的静态预测。论文结果显示，单机器人 Social-HM3D 上 NavThinker SR/SPL 为 59.46/55.00，并把 human collision 降到 39.09；多机器人设置也在团队成功率和碰撞上取得更好表现。

#### 🧪 练习题
```yaml
question: "NavThinker 为什么选择在 Depth Anything V2 patch feature 空间训练世界模型？"
options:
  - "为了完全避免使用深度图输入"
  - "为了获得与几何结构对齐、可迁移的空间表征，再预测动作条件未来"
  - "为了把离散动作变成连续电机扭矩"
  - "为了让策略不再需要强化学习训练"
answer: 1
explain: "冻结 DA-V2 patch 特征保留丰富几何信息，世界模型在该空间做动作条件自回归预测，再用深度/轨迹/奖励头对齐导航风险。"
```

### GEN-1

```yaml
id: gen1
num: 41
name: GEN-1
full_name: 通用具身模型1 (Scaling Embodied Foundation Models)
year: '2026.04'
org: Generalist AI
parent: vjepa21
paper_url: https://generalistai.com/blog/apr-02-2026-gen-1-scaling-embodied-foundation-models-to-mastery/
project_url: ''
category: embodied
motivation: 原生交互基础模型任务成功率达99%
```

#### 📝 一句话总结
GEN-1 通过在 50 万小时真实世界交互数据上大规模预训练（不含机器人数据），结合后训练、强化学习与推理时技术（Harmonic Reasoning），使具身基础模型首次在多项灵巧操作任务上达到 99% 成功率、约 3 倍于 SOTA 的完成速度，并展现出训练分布外的即兴恢复能力，仅需约 1 小时机器人数据即可适配新任务。

#### 🎯 核心要点
- **Scaling Law 延续**：延续 GEN-0 发现的机器人学习 Scaling Law，通过进一步扩大数据（50 万+ 小时）和计算规模，将性能从"演示级"推至"商用级"
- **精通三要素定义**：提出 Mastery = Reliability（可靠性 99%+）+ Speed（~3× SOTA）+ Improvisation（即兴恢复智能），作为具身模型评估框架
- **无机器人数据预训练**：基础模型完全使用低成本可穿戴设备采集的人类活动数据预训练，无需遥操作或仿真数据
- **极致数据效率**：每个任务仅需约 1 小时机器人数据微调；相比 GEN-0 可用 10× 更少的任务数据达到同等性能
- **系统级创新**：涵盖预训练效率提升、后训练技术、经验学习（RL）、多模态人类引导、推理时 Harmonic Reasoning 等多项技术
- **6 项任务验证**：汽车零件分拣、T 恤折叠、扫地机器人维修、积木打包、纸箱折叠、手机包装，均达到 99%+ 成功率
- **速度突破**：纸箱折叠 12.1 秒（SOTA 34 秒，2.8× 提速）；手机包装 15.5 秒（2.8× 提速）
- **即兴恢复行为**：模型展现训练分布外的创造性恢复策略（重新抓取、利用外部灵巧性、双手协作等）
- **对齐问题前瞻**：指出具身模型的涌现行为既是优势也是风险，需要发展具身 AI 对齐方法

#### 🔬 深入细节
##### 核心框架示意

> ⚠️ 注意：GEN-1 以技术博客形式发布，未提供传统论文中的模型架构图。以下基于文中描述整理其系统框架。

```
┌─────────────────────────────────────────────────────────┐
│                    GEN-1 系统架构                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │ 预训练数据引擎 │    │  任务适配数据  │                   │
│  │ 50万+小时     │    │  ~1小时/任务   │                   │
│  │ 可穿戴设备    │    │  机器人数据    │                   │
│  │ (无机器人数据) │    │              │                   │
│  └──────┬───────┘    └──────┬───────┘                   │
│         │                   │                           │
│         ▼                   ▼                           │
│  ┌──────────────────────────────────┐                   │
│  │     大规模多模态基础模型           │                   │
│  │  (预训练 → 后训练 → RL微调)       │                   │
│  └──────────────┬───────────────────┘                   │
│                 │                                       │
│                 ▼                                       │
│  ┌──────────────────────────────────┐                   │
│  │     推理时系统 (Harmonic Reasoning)│                   │
│  │  + 多模态人类引导                  │                   │
│  │  + 实时动作输出                    │                   │
│  └──────────────┬───────────────────┘                   │
│                 │                                       │
│                 ▼                                       │
│         实时机器人控制                                    │
│   (可靠性 99% | 速度 3× | 即兴恢复)                      │
└─────────────────────────────────────────────────────────┘
```

##### 性能对比伪代码

```python
# GEN-1 训练与部署流程概览
# Phase 1: 预训练（无机器人数据）
pretrain_data = collect_wearable_data(hours=500_000)  # 可穿戴设备采集人类活动
foundation_model = pretrain(
    data=pretrain_data,
    modality="multimodal",  # 视觉 + 本体感觉 + 语言
    robot_data=None  # 关键：预训练不使用任何机器人数据
)

# Phase 2: 后训练 + RL
model = post_train(foundation_model, techniques=[
    "compute_efficiency_optimization",  # 预训练计算效率曲线偏移
    "reinforcement_learning",           # 从经验中学习
    "multimodal_human_guidance",        # 多模态人类引导
])

# Phase 3: 任务适配（仅需 ~1 小时机器人数据）
for task in ["box_folding", "phone_packing", "tshirt_folding", ...]:
    task_data = collect_robot_data(task, hours=1)  # 极少量任务数据
    task_model = finetune(model, task_data)
    # GEN-1: 10x less data than GEN-0 for comparable performance

# Phase 4: 推理时增强
deployed_model = apply_inference_techniques(
    task_model,
    harmonic_reasoning=True,  # 新型推理时技术
    real_time=True            # 实时动作输出
)

# 结果对比
# Task          | No Pretrain | GEN-0 | GEN-1
# Vacuum Repair |     2%      |  50%  |  99%
# Box Folding   |    13%      |  81%  |  99%
# Phone Packing |    42%      |  62%  |  99%
# Average       |    19%      |  64%  |  99%
```

##### 动机与背景

GEN-1 的核心动机源于具身基础模型从"可演示"到"可商用"的跨越需求。此前的 GEN-0 首次证明了机器人学习中 Scaling Law 的存在——随着预训练数据和计算量的增加，所有零样本任务的性能同步提升。然而，GEN-0 的平均成功率仅为 64%，远未达到商业部署的门槛。

这一进程与大语言模型（LLM）的发展轨迹高度平行：GPT-2 展示了多任务学习的可扩展路径但难以商用，GPT-3 通过规模扩展使 Scaling Law 延续并在特定任务（如广告文案）上实现经济价值。类似地，GEN-1 通过进一步扩展 GEN-0 的基础，使简单物理任务首次跨越商用性能阈值。

> 💡 关键洞察：GEN-1 的预训练数据完全来自人类佩戴低成本可穿戴设备进行日常活动的记录，而非昂贵的遥操作数据或仿真数据。这提供了一个存在性证明——无需大规模遥操作或仿真数据集，仅通过人类活动预训练即可达到高水平的任务精通。

##### 核心机制：精通（Mastery）三要素

GEN-1 将"精通"定义为三个维度的综合：

**1. 可靠性（Reliability）**

传统工业机器人通过精确控制和严格约束环境实现可靠性，但这种方式无法泛化。端到端机器人学习模型长期以来难以达到高可靠性。GEN-1 在 6 项任务上实现了 99%+ 的成功率：

| 任务 | 无预训练 | GEN-0 | GEN-1 | 连续成功次数 |
|------|---------|-------|-------|------------|
| 汽车零件分拣 | — | — | 99%+ | 50+ (1小时) |
| T恤折叠 | — | — | 99%+ | 86次连续 |
| 扫地机维修 | 2% | 50% | 99% | 200+次连续 |
| 积木打包 | — | — | 99%+ | 1800+次连续 |
| 纸箱折叠 | 13% | 81% | 99% | 200+次连续 |
| 手机包装 | 42% | 62% | 99% | 100+次连续 |

**2. 速度（Speed）**

速度提升并非简单加快电机转速。随着速度增加，世界不再是准静态的：速度项增大、摩擦动力学变化、运动模糊加剧，对精度、反应性和推理提出更高要求。GEN-1 的速度突破来自多个因素：

- **经验学习（RL）**：模型通过强化学习自主发现更快的完成策略
- **Harmonic Reasoning**：新型推理时技术，优化实时决策
- **预训练数据优势**：可穿戴设备采集的数据包含人类以自然速度完成各种任务的记录，相比遥操作数据更流畅、更快速（遥操作受限于力反馈缺失、延迟和视野问题）

具体速度对比：
- 纸箱折叠：GEN-1 12.1 秒 vs SOTA 34 秒（GEN-0 和 π₀ 在相同纸箱上均约 34 秒），**2.8× 提速**
- 手机包装：GEN-1 15.5 秒 vs GEN-0，**2.8× 提速**

> 💡 关键：GEN-1 的任务完成速度可以超过演示数据中的速度，说明模型通过 RL 学会了比人类示范更高效的策略。

**3. 即兴恢复智能（Improvisational Intelligence）**

这是 GEN-1 最具突破性的能力维度。在非结构化环境中，机器人必须能够创造性地即兴解决意外情况。GEN-1 展现的训练分布外恢复行为包括：

- 垫圈被碰落后：可选择放下重新抓取、部分插入缝隙利用外部灵巧性重新抓取、或使用另一只手进行双手协作重新抓取
- 大型可变形物体出现异常构型时：模型自主找到恢复路径
- 这些行为直接贡献于从意外长尾事件中恢复

正如 William James（现代心理学奠基人）所述：**智能是通过不同手段达到相同目标的能力**。即兴恢复智能不仅使机器人能在非结构化环境中工作，还反过来提升了通用模型的可靠性和速度。

##### 数据引擎与预训练范式

GEN-1 的数据策略是其核心竞争优势之一：

```
传统方法:  遥操作数据(昂贵/难扩展) → 任务特定模型 → 窄泛化
GEN-1方法: 可穿戴设备数据(低成本/可扩展) → 通用基础模型 → 少量机器人数据微调
```

- **预训练数据**：50 万+ 小时高保真物理交互数据，来自人类佩戴可穿戴设备进行数百万种活动
- **预训练中无机器人数据**：模型在适配新任务时，同时首次适配该机器人形态和该任务
- **任务适配**：仅需约 1 小时机器人数据
- **数据效率提升**：GEN-1 可用 GEN-0 的 1/10 任务数据达到同等性能

> ⚠️ 注意：此前超过 90% 成功率的通用机器人模型依赖大规模遥操作数据集，成本高且难以扩展。GEN-1 证明了基于可穿戴设备的预训练路线可以达到更高性能，这对整个领域的数据采集范式具有重要启示。

##### 系统级设计

GEN-1 不仅是一个模型，更准确地说是一个**系统**。类似于前沿 LLM 聊天机器人和 API，系统级组件在推理和模型调用层面显著提升了性能：

1. **预训练效率**：通过计算效率曲线偏移（shifting the curve），在相同计算量下获得更高的预训练智能
2. **后训练技术**：包括理论 RL 基础和多模态人类引导
3. **推理时技术**：Harmonic Reasoning——一种新型分页注意力机制，支持实时推理
4. **分布式训练基础设施**：重新设计以支持 PB 级物理交互数据作为一等公民
5. **硬件协同**：设计新硬件，在新地理区域部署数千个机器人手以获取多样化物理活动数据

##### 与相关工作的对比

| 维度 | 传统工业机器人 | PaLM-E / RT-2 (VLA) | π₀ | GEN-0 | **GEN-1** |
|------|-------------|---------------------|-----|-------|-----------|
| 泛化能力 | 极低（硬编码） | 中等 | 中等 | 高 | **高** |
| 可靠性 | 高（受限环境） | 低-中 | 中 | 64% | **99%** |
| 速度 | 高（受限任务） | 慢 | ~34s(折箱) | ~34s(折箱) | **~12s(折箱)** |
| 即兴能力 | 无 | 有限 | 有限 | 有限 | **显著** |
| 数据需求 | 编程 | 大量遥操作 | 大量遥操作 | ~10h/任务 | **~1h/任务** |
| 预训练数据 | 无 | 互联网数据 | 遥操作 | 可穿戴设备 | **可穿戴设备(50万h)** |

##### 局限性与展望

GEN-1 并非没有局限：
- 并非所有尝试的任务都能达到 99%+ 成功率
- 某些任务在实际部署中可能需要更高的成功率或速度
- 当前主要验证的是"简单物理任务"的精通

但 Scaling Law 的延续意味着：每一代新模型都将解锁更多更复杂任务的精通能力。此外，GEN-1 提出了具身 AI 对齐的前瞻性思考——随着模型能力增强，涌现行为（如未经训练的恢复动作）既是优势也可能是风险，需要发展精确引导模型行为的对齐方法。

#### 🧪 练习题
```yaml
question: "GEN-1 的预训练数据主要来源是什么？"
options:
  - "大规模机器人遥操作数据"
  - "物理仿真环境生成的合成数据"
  - "人类佩戴低成本可穿戴设备采集的活动数据"
  - "互联网视频和图像数据"
answer: 2
explain: "GEN-1 的预训练数据完全来自人类佩戴可穿戴设备进行日常活动的记录（50万+小时），不包含任何机器人数据。这是其核心创新之一，证明了无需昂贵的遥操作数据即可达到高水平任务精通。"
```

### X-WAM

```yaml
id: xwam
num: 42
name: X-WAM
full_name: 统一4D世界动作建模 (Unified 4D World Action Modeling)
year: '2026.04'
org: Stanford/NVIDIA
parent: worldreel
paper_url: https://arxiv.org/abs/2604.26694v2
project_url: ''
category: embodied
motivation: 统一4D合成与动作执行异步噪声采样
```

#### 📝 一句话总结
X-WAM 提出统一 4D World Action Model，把多视角 RGB-D 未来生成、3D 重建和机器人动作解码放进同一个视频扩散框架，并用轻量深度分支和异步噪声采样解决“视频要慢慢去噪、动作要实时输出”的冲突。

#### 🎯 核心要点
- 从预训练视频扩散模型出发，联合预测未来多视角 RGB-D 视频、机器人状态和动作。
- 通过复制 DiT 最后若干层构造 dedicated depth branch，避免把深度拼成额外 token 导致注意力成本翻倍，也避免通道拼接破坏视频先验。
- 提出 Asynchronous Noise Sampling (ANS)：推理时少步快速解码动作，后续继续用完整步数生成高保真视频。
- 训练时不独立采样视频/动作噪声，而是按与异步推理一致的 joint timestep distribution 采样，减少 train-test mismatch。
- 统一状态/动作接口支持单臂和双臂机器人：状态是末端位姿+夹爪，动作是相对末端运动+夹爪变化。
- 在约 1,492,026 episodes、5,873.9 小时机器人数据上预训练，并在 RoboCasa、RoboTwin 2.0、真实双臂耳机打包任务中验证。
- RoboCasa 平均成功率 79.2%，RoboTwin 2.0 Clean/Randomized 为 89.8%/90.7%，同时获得更好的 RGB、深度和点云重建指标。

#### 🔬 深入细节
![X-WAM 总览图](https://arxiv.org/html/2604.26694v2/x1.png)
*图：X-WAM 同时面向策略执行、视频生成和 4D 几何重建，并用 ANS 平衡动作时延与视频质量。*

```python
# X-WAM 单步去噪与 ANS 推理伪代码
def denoise_xwam(video_latent, state_noisy, action_noisy, t_video, t_action, cond):
    tokens = encode_rgb_state_action(video_latent, state_noisy, action_noisy, cond)
    tokens = add_view_embeddings(tokens)
    shared = dit_shared_trunk(tokens)

    main = shared
    depth = shared
    for block_main, block_depth in interleaved_tail_blocks:
        depth = block_depth(depth, cross_attend_to=main)
        main = block_main(main)

    rgb_velocity, state_velocity, action_velocity = regress_main(main)
    inverse_depth = regress_depth(depth)
    return rgb_velocity, state_velocity, action_velocity, inverse_depth

def asynchronous_inference(cond, video_steps=Nv, action_steps=Na):
    video, state, action = init_noise()
    for i in range(Nv):
        if i < Na:
            # joint denoising: action becomes usable after only Na steps
            v_pred, s_pred, a_pred, depth = denoise_xwam(video, state, action, t_v[i], t_a[i], cond)
            state, action = action_scheduler.step(s_pred, a_pred)
        else:
            # video-only continuation conditioned on already decoded action
            v_pred, _, _, depth = denoise_xwam(video, state, action, t_v[i], t_a=0, cond=cond)
        video = video_scheduler.step(v_pred)
    return action, video, depth
```

X-WAM 面对的核心矛盾来自统一世界模型本身。视频生成需要较多扩散步数才能得到清晰、多视角一致的未来；低维动作却必须尽快输出，否则机器人闭环控制时延过大。若把视频和动作完全同步去噪，动作会被视频拖慢；若完全分离训练，推理时“动作已经干净而视频仍很 noisy”的状态又没有在训练中见过。

第一项设计是轻量 4D 空间适配。常见做法是把 RGB 和 depth 都作为 token 输入，但 token 数翻倍会带来二次注意力开销；把 depth 拼到通道维则改变预训练视频模型的输入分布。X-WAM 保持主视频 DiT 基本不变，只复制最后若干 block 作为深度分支：

$$
h = \mathrm{DiT}_{\text{trunk}}(x_t, s_t, a_t, c),
\qquad
(\hat v_x,\hat v_s,\hat v_a)=\mathrm{Head}_{\text{main}}(h),
\qquad
\hat d=\mathrm{Head}_{\text{depth}}(\mathrm{DiT}_{\text{depth}}(h)).
$$

这样主分支继续利用视频先验，深度分支从共享 latent 中抽取 3D 结构。论文结果显示，显式深度监督不仅改善点云重建，也提升策略成功率，说明空间感知对动作解码本身有帮助。

第二项设计是 ANS。设视频 timestep 为 \(\tau_v\)，动作 timestep 为 \(\tau_a\)。推理中前 \(N_a\) 步同时去噪视频和动作，得到可执行动作后，后 \(N_v-N_a\) 步继续优化视频：

$$
\tau_a =
\begin{cases}
\mathrm{schedule}_a(i), & i < N_a, \\
0, & i \ge N_a .
\end{cases}
$$

训练时，ANS 从 \((\tau_v,\tau_a)\) 的联合分布中采样，使模型经常看到“视频仍 noisy、动作已接近 clean”的状态。这个细节很重要：如果训练时视频和动作噪声独立随机，模型并不会适配推理时的异步轨迹，动作质量和视频质量都会受损。

X-WAM 的数据工程也服务于统一建模。论文把单臂/双臂机器人统一到末端执行器接口：状态为 16 维绝对向量 \((position_3 + quaternion_4 + gripper_1)\times2\)，动作为 14 维相对向量 \((position_3 + axisangle_3 + gripper_1)\times2\)。单臂数据只监督左臂维度，使大规模异构机器人数据能进入同一个模型。

与 UWM、Motus、Cosmos Policy 等 2D world-action 模型相比，X-WAM 的区别在于它把“未来世界长什么样”“未来 3D 空间结构是什么”“机器人下一步怎么动”绑定在同一扩散轨迹中。它不是在视频模型后面接一个动作头，也不是视频生成后再用 Depth Anything 做后处理，而是在训练目标中同时优化 RGB、depth、point cloud consistency 和动作成功率。

#### 🧪 练习题
```yaml
question: "X-WAM 的 Asynchronous Noise Sampling 主要解决什么问题？"
options:
  - "让视频和动作永远使用完全相同的去噪步数"
  - "在动作少步实时解码和视频多步高质量生成之间对齐训练与推理分布"
  - "把深度图从训练数据中全部删除"
  - "用规则控制器替代扩散动作模型"
answer: 1
explain: "ANS 推理时先快速解码动作，再继续生成视频；训练时从匹配该异步流程的联合噪声分布采样，避免 train-test mismatch。"
```

### Vagen

```yaml
id: vagen
num: 43
name: Vagen
full_name: 视觉智能体生成 (Reinforcing World Model Reasoning)
year: '2026.03'
org: Peking University
parent: vjepa21
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/fc6688d75adde86b9df910769c1d02e3-Abstract-Conference.html
project_url: ''
category: embodied
motivation: 显式视觉状态推理强化VLM世界建模
```

#### 📝 一句话总结
VAGEN 提出将 VLM 智能体训练为显式的世界模型（World Model），通过状态估计（State Estimation）和转移预测（Transition Modeling）两种推理策略增强多轮视觉决策能力，并设计了 WorldModeling Reward 与 Bi-Level GAE 机制实现细粒度的奖励塑形与信用分配，在 Qwen2.5-VL-3B 上超越 GPT-5 等大规模闭源模型。

#### 🎯 核心要点
- **POMDP 建模**：将多轮视觉智能体任务形式化为部分可观测马尔可夫决策过程，每轮接收图像观测并输出动作
- **5 种推理策略**：NoThink、FreeThink、StateEstimation、TransitionModeling、WorldModeling（前两者组合），通过结构化 `<think>` 标签控制推理内容
- **VAGEN-Base 训练框架**：基于 PPO 的多轮 RL 训练，关键创新为 Observation Token Masking——将图像 token 排除在策略梯度之外
- **WorldModeling Reward**：利用 LLM-as-a-Judge 评估智能体的状态估计与转移预测质量，提供密集的推理质量奖励信号
- **Bi-Level GAE**：两层优势估计机制——先在 turn 级别用 \(\gamma_{\text{turn}}\) 计算每轮优势，再在 token 级别用 \(\gamma_{\text{token}}\) 向回传播，解决稀疏奖励下的信用分配问题
- **视觉状态表征研究**：对比自然语言、符号化、结构化三种表征格式，发现最优格式依赖于任务特性
- **6 个评测环境**：Sokoban、FrozenLake、PrimitiveSkill（4 子任务）、Navigation（2 子任务）、SVG Reconstruction，覆盖规划、操控、导航、推理
- **VAGEN-Full（3B）得分 0.82**，超越 GPT-5（0.75）、Claude 4.5 Sonnet（0.64）等闭源模型

#### 🔬 深入细节
##### 框架总览

![VAGEN 框架总览与五种推理策略](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x1.png)
*图 1：VAGEN 框架。左侧展示多轮交互流程（观测→推理→动作→环境反馈），右侧展示五种推理策略的结构化输出格式。WorldModeling 策略同时包含 `<observation>`（状态估计）和 `<prediction>`（转移预测）字段。*

![VAGEN-Base 多轮 RL 训练流程](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x2.png)
*图 2：VAGEN-Base 训练流程。智能体在环境中执行多轮交互生成轨迹，通过 PPO 优化策略，其中 Observation Token Masking 确保只对动作 token 计算策略梯度。*

![Bi-Level GAE 与 Token-Level GAE 对比](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x3.png)
*图 3：标准 Token-Level GAE（左）将稀疏的终端奖励逐 token 回传；Bi-Level GAE（右）先在 turn 级别分配奖励（紫色箭头），再在 token 级别传播（橙色箭头），实现层次化信用分配。*

##### 算法伪代码

```python
# VAGEN-Full 多轮 RL 训练框架伪代码
def vagen_full_training(env, policy_vlm, critic, llm_judge):
    for iteration in range(N_iterations):
        # === Rollout 阶段 ===
        trajectories = []
        for episode in range(batch_size):
            obs = env.reset()  # 初始图像观测
            trajectory = []
            for turn in range(max_turns):
                # 智能体生成结构化输出：<think><observation>...</observation><prediction>...</prediction>...</think><answer>action</answer>
                response = policy_vlm.generate(obs, strategy="WorldModeling")
                action = parse_action(response)
                obs_belief = parse_observation(response)   # 状态估计 ŝ_t
                pred_belief = parse_prediction(response)   # 转移预测 ŝ_{t+1}
                
                next_obs, task_reward, done = env.step(action)
                
                # WorldModeling Reward: LLM-as-Judge 评估推理质量
                gt_state = env.get_ground_truth_state()
                gt_next_state = env.get_ground_truth_state()
                r_reason = β_s * judge_match(obs_belief, gt_state) \
                         + β_w * judge_match(pred_belief, gt_next_state)
                
                r_turn = r_reason + r_format + task_reward
                trajectory.append((obs, response, action, r_turn, next_obs))
                obs = next_obs
                if done: break
            trajectories.append(trajectory)
        
        # === Bi-Level GAE 优势估计 ===
        for traj in trajectories:
            # 第一层：Turn-Level GAE
            turn_advantages = compute_turn_gae(
                rewards=[t.r_turn for t in traj],
                values=critic.evaluate(traj),
                gamma=gamma_turn, lambda_=lambda_turn
            )
            # 第二层：Token-Level GAE（以 turn advantage 初始化末尾 token）
            token_advantages = []
            for t, turn_adv in enumerate(turn_advantages):
                token_advs = compute_token_gae(
                    kl_penalties=compute_kl(traj[t].response),
                    values=critic.token_values(traj[t]),
                    gamma=gamma_token, lambda_=lambda_token,
                    terminal_advantage=turn_adv  # 关键：用 turn 级优势初始化
                )
                token_advantages.extend(token_advs)
        
        # === PPO 优化（带 Observation Token Masking）===
        for epoch in range(K_epochs):
            # 仅对 action tokens 计算策略梯度，mask 掉 observation tokens
            ratio = policy_vlm.prob(actions) / old_policy.prob(actions)
            clipped = clip(ratio, 1-ε, 1+ε)
            loss = -min(ratio * token_advantages, clipped * token_advantages)
            loss = loss * action_token_mask  # Observation Token Masking
            policy_vlm.update(loss)
```

##### 方法详解

**1. 动机与问题定义：多轮视觉智能体的推理瓶颈**

当前 VLM（视觉语言模型）在单轮视觉问答任务上表现出色，但在需要多轮交互的智能体任务中（如推箱子、机器人操控、迷宫导航）表现显著下降。论文将这一问题归因于两个核心缺陷：（1）VLM 缺乏对视觉状态的显式推理能力——它们不会主动"描述当前看到了什么"以及"执行动作后世界会变成什么样"；（2）现有 RL 训练方法（如 GRPO、标准 PPO）无法有效处理多轮交互中的信用分配问题——稀疏的终端奖励难以指导中间每一步的决策质量。

VAGEN 的核心洞察是：**让 VLM 像世界模型一样思考**。具体来说，在每轮决策前，智能体需要显式地完成两项推理任务：**状态估计**（State Estimation，用自然语言描述当前观测到的环境状态 \(\hat{s}_t\)）和**转移预测**（Transition Modeling，预测执行动作后环境将变成什么状态 \(\hat{s}_{t+1}\)）。这种设计受到认知科学中"内部世界模型"概念的启发——人类在行动前会在脑中模拟动作的后果。

**2. 核心机制：结构化推理策略与 VAGEN-Base**

论文设计了 5 种推理策略来系统性地研究不同推理深度的影响。所有策略都通过结构化的 XML 标签控制输出格式：

- **NoThink**：直接输出动作，不进行任何推理（`<answer>action</answer>`）
- **FreeThink**：在 `<think>` 标签中自由推理，类似 Chain-of-Thought
- **StateEstimation**：在 `<think>` 中必须包含 `<observation>` 字段，描述当前视觉状态
- **TransitionModeling**：在 `<think>` 中必须包含 `<prediction>` 字段，预测下一状态
- **WorldModeling**：同时包含 `<observation>` 和 `<prediction>`，完整的世界建模

> 💡 **关键发现**：StateEstimation 在导航任务中表现最佳（理解当前位置是关键），TransitionModeling 在操控任务中表现最佳（预测物体运动是关键），而 WorldModeling 在所有任务上都表现稳定且最优。

VAGEN-Base 的训练框架基于 PPO，但引入了一个关键创新——**Observation Token Masking**。在多轮交互中，轨迹由交替出现的观测 token（图像编码）和动作 token（模型生成）组成。由于观测 token 不是由智能体策略生成的，对其计算策略梯度在理论上是错误的，且冗长的观测序列会主导梯度权重分布。因此，VAGEN 在计算 PPO 损失时将所有观测 token 的 mask 设为 0，仅对动作 token 进行优化。

**3. WorldModeling Reward：基于 LLM 裁判的推理质量奖励**

为了监督智能体的世界建模推理质量，VAGEN 引入了 WorldModeling Reward。其核心思路是：从环境中获取真实状态信息（如 Sokoban 中玩家/箱子/目标的 2D 坐标），然后评估智能体在 `<observation>` 和 `<prediction>` 中的描述与真实状态的匹配程度。

论文最初尝试使用 CLIP 计算图文相似度作为奖励，但发现 CLIP 对细粒度的空间和几何细节不够敏感。最终采用 **LLM-as-a-Judge** 方案：将智能体的推理文本和真实状态文本一起输入 LLM，由 LLM 直接判断匹配程度（二元判断或提取结构化信息后进行 F1 评分）。每轮的推理奖励定义为：

$$r^{\text{reason}}_t = \beta_s \cdot \mathcal{I}_{\text{SE}}(\hat{s}_t, s_t) + \beta_w \cdot \mathcal{I}_{\text{TM}}(\hat{s}_{t+1}, s_{t+1})$$

其中 \(\mathcal{I}\) 为匹配得分函数，\(\beta_s, \beta_w\) 为奖励系数（默认均为 0.5）。

**4. Bi-Level GAE：层次化信用分配**

标准 GAE 在多轮交互中面临严重的信用分配问题：稀疏的终端奖励需要跨越数十个 turn、数百个 token 进行回传，信号极度衰减。VAGEN 提出 **Bi-Level GAE**，将优势估计分解为两个层次：

**Turn 级别**（外层）：将每轮的复合奖励 \(r_t = r^{\text{reason}}_t + r^{\text{format}}_t + R(s_t, a_t)\) 作为该轮的即时奖励，使用 critic 在每轮动作末尾的价值估计计算 TD 误差：

$$\delta^{\text{turn}}_t = r_t + \gamma_{\text{turn}} V_\phi(\bar{\tau}_{\leq a_{t+1}}) - V_\phi(\bar{\tau}_{\leq a_t})$$

然后通过标准 GAE 递推计算 turn 级优势：\(A^{\text{turn}}_t = \delta^{\text{turn}}_t + \gamma_{\text{turn}} \lambda_{\text{turn}} A^{\text{turn}}_{t+1}\)。

**Token 级别**（内层）：在每个 turn 内部，以 KL 惩罚作为 token 级奖励，计算 token 级 TD 误差和优势。**关键连接**：每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势 \(A^{\text{turn}}_t\)，从而将 turn 级别的反馈注入 token 级别并向前传播。

> ⚠️ **与传统方法的区别**：Vanilla PPO 不做 observation masking 导致训练失败；GRPO 因场景变化导致轨迹多样性过高，需要不可承受的样本量；Turn-level PPO 对同一 turn 内所有 token 使用均匀优势估计，无法区分各 token 的贡献。Bi-Level GAE 同时解决了这三个问题。

**5. 消融实验与关键发现**

消融实验揭示了两个组件的互补性：Bi-Level GAE 单独使用时提升显著但不稳定（对奖励稀疏性和准确性敏感）；WorldModeling Reward 单独使用时一致性提升但受限于粗粒度的轨迹级信用分配。两者结合的 VAGEN-Full 在所有任务上都是最稳定且表现最优的方法。特别值得注意的是，在 PrimitiveSkill 任务上，VAGEN-Base 和 VAGEN-Full 的训练准确率相近，但 VAGEN-Full 的测试准确率显著更高，表明世界建模推理增强了泛化能力。

#### 🧪 练习题
```yaml
question: "VAGEN 中 Bi-Level GAE 的 token 级优势估计是如何与 turn 级优势关联的？"
options:
  - "将所有 turn 级优势求平均后作为每个 token 的优势"
  - "每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势，然后向前传播"
  - "token 级优势独立计算，与 turn 级优势相加得到最终优势"
  - "使用 turn 级优势对 token 级优势进行归一化"
answer: 1
explain: "Bi-Level GAE 的关键连接机制是将每个 turn 最后一个 action token 的优势初始化为预先计算好的 turn 级优势 A^turn_t，然后通过 token 级 GAE 的反向递推将该信号传播到 turn 内所有 token，实现层次化的信用分配。"
```

### MindJourney

```yaml
id: mindjourney
num: 44
name: MindJourney
full_name: 心智旅程 (Test-time Scaling with World Models)
year: '2026.03'
org: Shanghai Jiao Tong University
parent: vjepa21
paper_url: https://proceedings.neurips.cc/paper/2026/mindjourney
project_url: ''
category: embodied
motivation: 推理阶段利用世界模型增强空间推理
```

#### 📝 一句话总结
MindJourney 提出测试时世界模型扩展框架，让 VLM 在回答空间推理问题前主动规划相机轨迹、调用可控视频世界模型生成新视角，并基于多视角证据作答，解决单图 VLM 缺乏 3D 内部动态模型的问题。清单中的 NeurIPS 2026 链接疑似占位符；本精读依据可访问论文 arXiv:2507.12508v2 与项目页整理。

#### 🎯 核心要点
- 不微调 VLM，只在测试时把 VLM 与可控视频扩散 world model 组合，实现 plug-and-play 的 spatial reasoning 增强。
- 将空间推理转化为“3D imagination space”中的主动搜索：VLM 选择短相机轨迹，世界模型渲染对应新视角。
- 提出 Spatial Beam Search：用探索分数更新 beam，用有用性分数把关键视角缓存到 evidence buffer。
- 支持不同世界模型，包括 Stable Virtual Camera (SVC) 和作者训练的 Search World Model (SWM)。
- SWM 基于 Wan2.2-TI2V-5B/ReCamMaster 思路，使用 Habitat 合成几何控制数据，并混合 RealEstate-10K、DL3DV-10K 缩小外观域差距。
- 在 SAT 空间推理基准上无需微调带来约 7.7%/8% 平均提升，并能增强 GPT-4o、GPT-4.1、InternVL3、o1 等不同 VLM。

#### 🔬 深入细节
![MindJourney 流程图](https://arxiv.org/html/2507.12508v2/figure/pipeline.png)
*图：MindJourney 让 VLM 在测试时控制世界模型扩展视角，并把有用观测汇总为最终回答证据。*

```python
# MindJourney Spatial Beam Search 伪代码
def mindjourney_answer(image, question, vlm, world_model, actions, depth, beam_width):
    beam = [(empty_trajectory(), image)]
    evidence = []

    for step in range(depth):
        candidates = []
        for traj, obs in beam:
            for action_seq in expand(actions):
                new_traj = traj + action_seq
                frames = world_model.render(image, camera_trajectory=new_traj)
                candidates.append((new_traj, frames))

        # VLM 同时评估：是否值得继续探索、是否值得保存为证据
        scored = vlm.score_candidates(question, candidates)
        beam = topk(scored, key="exploration_score", k=beam_width)
        evidence.extend(topk(scored, key="helpfulness_score", k=K_help))

        if len(beam) == 0:
            break

    return vlm.answer(question, evidence)
```

MindJourney 的出发点是：很多空间题并非语言推理不够，而是单张图像缺少必要视角。例如“从当前位置向右转后能否看到某物”“哪个物体在目标背后”“沿某方向移动后目标相对位置如何变化”，人类会在脑中模拟视角变换，而普通 VLM 只能基于当前 2D 投影猜测。

因此 MindJourney 把测试时计算从“生成更多文字 token”扩展为“生成更多视觉证据”。给定初始图像 \(I_0\)、问题 \(q\)、动作集合 \(\mathcal{A}\) 和世界模型 \(W\)，候选轨迹 \(\tau=(a_1,\dots,a_H)\) 生成新视角：

$$
\hat I_{1:H} = W(I_0, \tau).
$$

VLM 不直接回答，而是先对 \((\tau,\hat I)\) 评分：一个分数衡量是否继续沿该轨迹探索，另一个分数衡量该视角是否应该进入证据缓存。搜索更新可以写成：

$$
B_{t+1}=\mathrm{TopK}_{\text{explore}}\{(\tau,\hat I)\},
\qquad
E \leftarrow E \cup \mathrm{TopK}_{\text{help}}\{(\tau,\hat I)\}.
$$

最后，VLM 接收原问题、轨迹自然语言描述和 evidence buffer 中的多视角图像，输出答案。这个流程让 VLM 的高层语义判断负责“往哪里看”和“哪些视角有用”，而世界模型负责低层几何想象。

SWM 的训练体现了任务约束带来的简化：MindJourney 不需要生成任意动作视频，只需要执行有限的 egocentric primitive actions，如前进、后退、左右转。作者用 Habitat 2.0 合成大量几何精确的室内导航 clips，再混合 RealEstate-10K 和 DL3DV-10K 这类真实多视角视频数据，让模型既学到相机控制，也保留真实外观多样性。

与传统视觉提示或 CoT prompting 相比，MindJourney 的核心区别是它引入了外部可控世界模型作为“可查询环境”。与训练一个新 VLM 相比，它完全发生在测试时，可以叠加到强闭源模型或开源模型上。论文在 SAT-Real 表中报告 GPT-4o 从 60.3 提升到 70.6（搭配 SWM），说明多视角想象对真实图像空间题有直接收益。

局限也很明确：世界模型若生成错误几何或幻觉视角，VLM 可能把错误证据当真；搜索也会增加推理成本。MindJourney 的贡献不是证明世界模型已完美，而是展示一种通用接口：让 VLM 通过动作条件视觉想象扩展测试时计算。

#### 🧪 练习题
```yaml
question: "MindJourney 的 Spatial Beam Search 中 evidence buffer 的作用是什么？"
options:
  - "保存训练梯度，供后续微调 VLM"
  - "缓存被 VLM 判断为有助于回答问题的新视角证据"
  - "记录所有被剪枝的错误答案"
  - "替代世界模型生成相机轨迹"
answer: 1
explain: "搜索过程中 VLM 会给候选新视角打 helpfulness 分数，高分视角进入 evidence buffer，最终回答时作为多视角证据输入。"
```

### ChatVLA-2

```yaml
id: chatvla2
num: 45
name: ChatVLA-2
full_name: 对话视觉语言动作2 (Open-world Reasoning VLA)
year: '2026.03'
org: Fudan University
parent: vjepa21
paper_url: https://proceedings.neurips.cc/paper/2026/chatvla2
project_url: ''
category: embodied
motivation: 保留VLM能力扩展开放世界具身推理
```

#### 📝 一句话总结
ChatVLA-2 提出带动态 Mixture-of-Experts 和两阶段训练的 VLA，使机器人在微调后仍能保留 VLM 的 OCR、数学和空间推理能力，并把内部推理可靠转化为动作。清单中的 NeurIPS 2026 链接疑似占位符；本精读依据可访问论文 arXiv:2505.21906v2 整理。

#### 🎯 核心要点
- 以 DexVLA/Qwen2-VL 风格架构为基础，视觉观测和语言 token 进入 VLM，输出 reasoning tokens 与 action tokens。
- 使用动态 MoE 解耦多模态理解与机器人控制的冲突参数空间；实践中共 8 个 experts，推理时动态选择 2 个。
- Action tokens 经两层线性层和 LayerNorm 投影后送入预训练 1B ScaleDP action expert。
- 提出 reasoning-following enhancement module：用 reasoning tokens 调制动作专家后半层的 scale/shift，使动作跟随模型内部推理。
- 两阶段训练：Stage 1 混合图文数据和机器人数据保留开放世界推理；Stage 2 冻结 VLM、只训练 action expert，加强推理到动作的连接。
- 图文数据包含 COCO、TextVQA、GQA 及机器人场景图文；机器人数据包含 600 条 math-matching 和 300 条 toy-placement 轨迹。
- 开放世界 math matching 中 ChatVLA-2 达到 43/52 成功，toy placement 中达到 127/156，显著优于 OpenVLA、DexVLA、ChatVLA、π0 等基线。

#### 🔬 深入细节
![ChatVLA-2 模型架构](https://arxiv.org/html/2505.21906v2/x1.png)
*图：ChatVLA-2 在 VLM backbone 中加入动态 MoE，并在动作专家中加入 reasoning-following 增强模块。*

```python
# ChatVLA-2 训练与推理伪代码
def stage1_cotrain(batch):
    image_tokens = vision_encoder(batch.multi_view_images)
    text_tokens = tokenizer(batch.instruction)
    hidden = qwen2_vl_dynamic_moe(image_tokens, text_tokens, top_k_experts=2)
    reasoning_tokens, action_tokens = split_outputs(hidden)
    actions = scaledp_action_expert(project(action_tokens), batch.robot_state)
    loss = vlm_loss(reasoning_tokens, batch.text_targets) + action_loss(actions, batch.actions)
    update(vlm_and_action_expert, loss)

def stage2_reasoning_following(robot_batch):
    freeze(qwen2_vl_dynamic_moe)
    hidden = qwen2_vl_dynamic_moe(robot_batch.images, robot_batch.instruction)
    reasoning_tokens, action_tokens = split_outputs(hidden)
    scale_shift = reasoning_to_modulation(reasoning_tokens)
    actions = scaledp_action_expert(project(action_tokens), modulation=scale_shift)
    loss = action_loss(actions, robot_batch.actions)
    update(action_expert_only, loss)

def infer(obs, instruction):
    reasoning, action_tokens = qwen2_vl_dynamic_moe(obs.images, instruction)
    return scaledp_action_expert(project(action_tokens), reasoning_condition=reasoning)
```

ChatVLA-2 关注的问题不是“VLA 能否学会某个机器人任务”，而是“VLA 微调后是否还记得 VLM 原本会的东西”。普通端到端 VLA 在机器人数据上微调后，往往牺牲 OCR、数学、常识和空间关系能力；但开放世界机器人任务恰恰需要这些能力，例如读白板公式、识别未见过玩具、理解“放到杯子右侧/架子上方”。

动态 MoE 是为了解决参数空间冲突。给定 hidden state \(h\)，router 选择 top-k experts：

$$
y = \sum_{e\in \mathrm{TopK}(G(h))} G_e(h)\,E_e(h).
$$

某些 experts 可专注机器人动作，某些保留多模态理解，还有一些承载空间推理等共享能力。论文特别强调不用 static/shared expert 粗暴改结构，因为 Qwen2-VL 的 LLM 部分本来不是 MoE，过度改动会破坏预训练知识；动态 MoE 尽量保持原架构，同时让输入自适应选择专家。

Reasoning-following enhancement module 解决另一个问题：模型“想对了”不代表“动对了”。ChatVLA-2 不只把语言指令送给动作头，而是把上层 reasoning tokens 投影成调制信号，作用于动作专家后半层：

$$
(\gamma,\beta)=\mathrm{MLP}(r_{\text{reason}}),
\qquad
h'=\gamma\odot h+\beta .
$$

只注入后半层是一个工程取舍：深层更接近语义和动作决策，改变它们对低层控制稳定性的破坏较小。这样模型可以在遇到训练外推理类型时，把 OCR/数学/空间判断显式传递给动作生成。

两阶段训练也服务于“先保留知识，再学会执行”。Stage 1 用 COCO、TextVQA、GQA、机器人场景图文和机器人轨迹混训，让模型同时见到图文问答和动作模仿；论文保持图文数据:机器人数据约 1:3，并用 reasoning phrase 标注机器人数据。Stage 2 冻结 VLM，只训练 action expert，使动作专家学习跟随已经形成的 reasoning，而不继续侵蚀 VLM 知识。

实验设计很直接。Math matching 要机器人读白板手写公式、识别数字卡片并选择答案；toy placement 要机器人识别未见过的物体并执行相对空间放置。开放世界设置中，公式、物体或方向组合不在训练集内。ChatVLA-2 在 math matching 开放世界中 OCR 3.58/4、数学 1.73/2、执行 43/52；toy placement 开放世界中 object recognition 0.94、spatial affordance 0.88、执行 127/156。

与 OpenVLA、DexVLA、π0 等模型相比，ChatVLA-2 的优势不主要来自更强低层控制，而是来自“保留并调用预训练知识”。论文消融显示，去掉动态 MoE 或只用 dense 7B 模型并不能解决开放世界失败；去掉 Stage 2 则会让推理产生但动作不跟随，说明架构和训练流程必须同时存在。

#### 🧪 练习题
```yaml
question: "ChatVLA-2 的第二阶段训练为什么冻结 VLM、只训练 action expert？"
options:
  - "为了删除 VLM 的开放世界知识"
  - "为了让动作专家学习跟随 VLM 产生的推理，同时避免继续破坏预训练能力"
  - "为了把所有机器人动作转换成文本答案"
  - "为了让 MoE router 固定选择同一个专家"
answer: 1
explain: "Stage 2 保持 VLM 推理能力不被机器人数据继续侵蚀，只优化动作专家，使动作更可靠地执行 reasoning tokens 表达的结果。"
```
