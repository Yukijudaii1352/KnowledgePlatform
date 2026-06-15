### 梦想家V3 (Mastering Diverse Domains)

```yaml
id: dreamerv3
name: DreamerV3
full_name: 梦想家V3 (Mastering Diverse Domains)
year: "2023.01"
org: Google DeepMind
paper_url: "https://arxiv.org/abs/2301.04104"
category: ssm
parent: dreamerv2
motivation: "固定超参数实现跨领域通用性首次在MC收集钻石"
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
