### 精灵 (Generative Interactive Environments)

```yaml
id: genie
name: Genie
full_name: 精灵 (Generative Interactive Environments)
year: "2024.02"
org: Google DeepMind
paper_url: "https://arxiv.org/abs/2402.15391"
category: generative
parent: videogpt
motivation: "从无标注视频学习生成式交互环境"
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
