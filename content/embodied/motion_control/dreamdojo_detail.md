### DreamDojo：从大规模人类视频学习的机器人世界模型

```yaml
id: dreamdojo
name: DreamDojo
full_name: 梦境道场 (DreamDojo World Model)
year: "2026"
org: ShengShu
paper_url: https://shengshu-ai.github.io/DreamDojo
category: foundation_model
parent: pi0
motivation: 物理交互预判世界模型
```

#### 📝 一句话总结

DreamDojo 提出从 44k+ 小时第一视角人类视频中预训练机器人世界模型，用连续 latent actions 作为无标注视频的统一代理动作，再经过机器人后训练和蒸馏，实现可交互、接近实时的动作条件未来视频预测。

#### 🎯 核心要点

- 构建 DreamDojo-HV 大规模人类第一视角视频数据，最终混合约 44,711 小时视频
- 目标是学习 open-world、contact-rich 机器人任务的未来视觉结果，而非仅在窄分布机器人数据上预测
- 使用 continuous latent actions 从相邻帧自监督提取“动作”代理标签，解决人类视频缺少机器人动作标注的问题
- 基于 Cosmos-Predict2.5 / latent video diffusion world model，使用 flow matching 预测未来视频 latent
- 后训练时重置并学习目标机器人动作条件层，将真实机器人连续动作接入世界模型
- 提出蒸馏流程，把双向、多步扩散教师压缩为因果、少步学生模型，实现约 10.81 FPS 和超过 1 分钟长时域交互
- 应用包括 live teleoperation、policy evaluation、model-based planning 和真实部署前的虚拟评估

#### 🔬 深入细节

##### 核心示意图

![DreamDojo 方法总览](https://dreamdojo-world.github.io/overview.png)
*图：DreamDojo 先用 latent actions 从大规模人类视频中学习物理交互，再在目标机器人数据上后训练，最后通过蒸馏获得实时交互能力。*

![DreamDojo-HV 数据统计](https://dreamdojo-world.github.io/hv.png)
*图：DreamDojo-HV 数据覆盖大量场景、物体和技能，用于扩大世界模型的物理交互先验。*

> ⚠️ 依据限制：清单中的 `paper_url` 当前不是 DreamDojo 公开项目主页；公开项目页为 `https://dreamdojo-world.github.io/`，论文为 arXiv:2602.06949。以下内容基于这些公开资料整理，YAML 元信息按任务清单原样保留。

##### 算法伪代码

```python
# DreamDojo: pretrain from human videos, post-train on robots, distill for real time

# 1. Train latent action model from video frame pairs
for frame_t, frame_tp1 in human_video_pairs:
    z = latent_action_encoder(frame_t, frame_tp1)
    pred_next = latent_action_decoder(frame_t, z)
    loss_lam = recon_loss(pred_next, frame_tp1) + beta * kl_or_vq_loss(z)
    update(latent_action_model, loss_lam)

# 2. Pretrain world model with latent action chunks
for video_clip in human_video_dataset:
    latent_actions = extract_latent_actions(video_clip)
    noisy_video_latent, timestep = add_noise(video_clip.future_latents)
    pred_velocity = world_model(
        condition_frame=video_clip.first_frame,
        action_chunks=latent_actions,
        timestep=timestep,
    )
    loss = flow_matching_loss(pred_velocity, target_velocity)
    update(world_model, loss)

# 3. Post-train on target robot with real continuous actions
reset_action_condition_layer(world_model)
for robot_clip, robot_actions in robot_dataset:
    relative_actions = rebase(robot_actions)
    loss = action_conditioned_video_loss(world_model, robot_clip, relative_actions)
    update(world_model, loss)

# 4. Distill to causal few-step student for online rollout
student = initialize_from_teacher(world_model)
replace_bidirectional_attention_with_causal(student)
train_student_with_teacher_ode_and_distribution_matching(student, teacher=world_model)
```

##### 方法详解

**动机与背景：为什么从人类视频预训练？**

机器人世界模型需要见过足够多的物体、场景和接触方式，才能在新环境中预测“如果这样推/拿/拉，会发生什么”。但真实机器人数据昂贵，且常集中在少数实验室场景。人类第一视角视频天然包含大量日常交互：开门、拿取、整理、倒入、按压、拖拽、行走和双手操作。虽然人手与机器人形态不同，但许多物理规律共享，例如物体受力后移动、遮挡变化、容器开合和软物体形变。

DreamDojo 的核心假设是：先从人类视频学广泛物理交互，再用较小规模目标机器人数据把动作空间对齐到机器人 embodiment。

**核心机制一：continuous latent actions**

人类视频没有机器人动作标签。若直接做无动作视频预测，模型可能学到“场景会怎样变化”，却不知道变化由什么动作导致，反事实控制能力差。DreamDojo 用 latent action model 从相邻帧中提取低维连续动作：

$$
z_t = E_\phi(I_t, I_{t+1})
$$

再让解码器用 \(I_t\) 和 \(z_t\) 重构 \(I_{t+1}\)。信息瓶颈迫使 \(z_t\) 捕获导致帧变化的关键动作因素，而不是完整复制图像上下文。训练后，\(z_t\) 可作为所有无标注人类视频的代理动作条件。

这种设计比手部关键点更通用，因为它不要求动作一定来自可见手部，也能覆盖相机运动、身体移动和遮挡严重的交互。

**核心机制二：动作条件视频 diffusion world model**

DreamDojo 基于 latent video diffusion / Cosmos-Predict2.5。给定条件帧、动作条件和视频 latent，模型用 flow matching 学习去噪向量场：

$$
\mathcal{L}_{fm} =
\mathbb{E}_{x_0,\epsilon,t,c}
\left\|
v_\theta(x_t,t,c) - (\epsilon - x_0)
\right\|_2^2
$$

其中 \(c\) 包含条件帧、文本或动作条件。论文还强调 temporal consistency loss，使模型不仅单帧逼近真实视频，还更好匹配相邻帧的物理过渡，减少长时域 rollout 中的物体破碎和接触漂移。

**核心机制三：目标机器人后训练**

预训练阶段使用 latent actions；后训练阶段需要让模型理解真实机器人动作。DreamDojo 重置动作条件层，把目标机器人动作转成相对动作并接入模型：

$$
a_{t:t+H}^{rel} = a_{t:t+H} - a_t^{base}
$$

相对动作空间更集中，能降低跨轨迹和跨机器人差异。后训练使用较小机器人数据把“人类视频中学到的物理先验”对齐到具体机器人，例如 GR-1、G1、AgiBot 或 YAM。

**核心机制四：蒸馏到实时交互**

标准视频扩散模型需要多步去噪且常用双向注意力，难以在线交互。DreamDojo 将教师模型蒸馏为因果、少步学生模型：先用教师 ODE 轨迹做 warmup，再让学生在自己的历史输出上训练，减少推理时分布偏移。蒸馏后模型能以约 10.81 FPS 进行长时域生成，并在超过 1 分钟的 rollout 中保持较好一致性。

> 💡 关键：DreamDojo 的贡献不只是“视频预测”，而是解决机器人世界模型的三个瓶颈：数据规模、动作条件和实时交互。

**与传统仿真的区别**

传统仿真器需要显式几何、接触和材质参数，优点是可控、可解释，缺点是开放世界建模成本高。DreamDojo 直接在像素/latent 视频空间预测未来，能覆盖更丰富外观和复杂交互，但物理精度和可验证性仍需评估。因此更现实的用法是与 Isaac Lab、MuJoCo 等物理仿真互补：物理仿真提供可控动力学，世界模型提供开放外观、反事实视觉和策略筛选。

#### 🧪 练习题

```yaml
question: "DreamDojo 为什么引入 continuous latent actions？"
options:
  - "为无动作标注的人类视频提供统一代理动作条件，提升动作可控的未来预测"
  - "把所有视频压缩成文本描述，完全不做视觉生成"
  - "替代机器人后训练，使模型无需任何机器人数据"
  - "只用于加密数据，与模型训练无关"
answer: 0
explain: "人类视频规模大但缺少机器人动作标签；latent actions 通过自监督从帧间变化中提取动作因素，使世界模型能学习动作条件的物理后果。"
```
