### 梦想家V2 (Mastering Atari)

```yaml
id: dreamerv2
name: DreamerV2
full_name: 梦想家V2 (Mastering Atari)
year: "2020.10"
org: Google DeepMind
paper_url: "https://arxiv.org/abs/2010.02193"
category: ssm
parent: dreamerv1
motivation: "引入离散潜在变量首次在Atari达到人类水平"
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
