### 世界模型 (World Models)

```yaml
id: world_models
name: World Models
full_name: 世界模型 (World Models)
year: "2018.03"
org: Google Brain
paper_url: "https://arxiv.org/abs/1803.10122"
category: ssm
parent: "—"
motivation: "首次展示智能体可在自身生成的梦境中学习策略"
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
