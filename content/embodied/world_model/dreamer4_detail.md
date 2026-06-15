### 梦想家4 (Scalable World Models)

```yaml
id: dreamer4
name: Dreamer 4
full_name: 梦想家4 (Scalable World Models)
year: "2025.09"
org: Google DeepMind
paper_url: "https://arxiv.org/abs/2509.24527"
category: ssm
parent: dreamerv3
motivation: "扩展模型规模增强长时程记忆与复杂任务想象"
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
