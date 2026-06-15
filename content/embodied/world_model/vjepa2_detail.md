### 视频JEPA 2 (V-JEPA 2)

```yaml
id: vjepa2
name: V-JEPA 2
full_name: 视频JEPA 2 (V-JEPA 2)
year: "2025.06"
org: Meta AI
paper_url: "https://arxiv.org/abs/2506.09985"
category: predictive
parent: vjepa
motivation: "增强时空推理应用于机器人规划任务"
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
