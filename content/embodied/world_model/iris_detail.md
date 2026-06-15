### IRIS：内部语音想象 (Imagination with auto-Regression)

```yaml
id: iris
name: IRIS
full_name: "内部语音想象 (Imagination with auto-Regression)"
year: "2023.05"
org: Google DeepMind
paper_url: "https://openreview.net/forum?id=vhFu1Acb0xb"
category: planning
parent: muzero
motivation: "Transformer作为世界模型2小时达人类水平"
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
