### V-JEPA 2 — 自监督视频世界模型

```yaml
id: v_jepa2
name: V-JEPA 2
year: '2026'
category: frontier_2026
institution: Meta
paper: ICLR 2026
motivation: 预测编码视频理解
parent: —
description: 预测编码器家族，通过预测潜在表示而非像素，在视频理解和规划中表现卓越。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/v_jepa2_detail.md
```

#### 📝 一句话总结

V-JEPA 2 将 JEPA 的“在潜在空间预测被遮挡内容”扩展到互联网级视频预训练，并在少量机器人交互视频上后训练出 V-JEPA 2-AC，使同一套表征既能做视频理解、动作预测，也能通过潜在空间规划执行机器人操作。

#### 🎯 核心要点

- 自监督视频预训练：使用超过 100 万小时视频和约 100 万张图像，通过 mask-denoising feature prediction 学习物理世界表征
- 潜在预测而非像素生成：预测 EMA target encoder 给出的表示，使用 L1 损失，只在被遮挡 patch 上回归，避免建模不可预测的像素细节
- 可扩展 ViT 视频编码器：从 ViT-L 扩展到约 10 亿参数 ViT-g，tubelet 大小为 \(2\times16\times16\)，并使用 3D-RoPE 建模时间、高度、宽度位置
- 四个扩展要素：数据从 200 万视频扩到 2200 万视频、模型从 300M 扩到 1B、训练步数从 90K 到 252K、后期提高空间分辨率和时间长度
- 视频理解能力：在 Something-Something v2 上达到 77.3 top-1，在 Epic-Kitchens-100 动作预判上达到 39.7 recall-at-5
- 语言对齐能力：把冻结视频编码器接入 LLM 后，在 PerceptionTest、TempCompass 等视频问答基准上达到 8B 级模型 SOTA
- 机器人规划能力：冻结 V-JEPA 2 编码器，在少于 62 小时 DROID 无标签机器人视频上训练 300M action-conditioned predictor
- 模型预测控制：V-JEPA 2-AC 在潜在空间想象动作结果，用 Cross-Entropy Method 搜索动作序列，并以 receding horizon 方式只执行第一步

#### 🔬 深入细节

##### 核心示意图

![V-JEPA 2 总览图](https://arxiv.org/html/2506.09985v1/x1.png)
*图：V-JEPA 2 先从互联网视频和图像中学习通用视频表征，再用于视频问答、动作分类/预判，以及机器人 action-conditioned world model 后训练。*

![V-JEPA 2-AC 后训练示意](https://arxiv.org/html/2506.09985v1/x10.png)
*图：V-JEPA 2-AC 的 teacher forcing 训练分支。冻结编码器产生当前帧潜在表示，action-conditioned predictor 根据动作与末端执行器状态预测下一帧表示。*

公开来源：论文 `https://arxiv.org/abs/2506.09985`，Meta 官方介绍 `https://ai.meta.com/research/vjepa/`，Meta 博客 `https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/`，官方代码 `https://github.com/facebookresearch/vjepa2`。

##### 核心流程伪代码

```python
# V-JEPA 2: latent-space masked video prediction + action-conditioned planning

def pretrain_vjepa2_step(video):
    tubelets = patchify(video, size=(2, 16, 16))
    visible_tokens, masked_pos = multiblock_mask(tubelets)

    z_context = encoder_theta(visible_tokens, rope="3d")       # trainable encoder
    z_target = ema_encoder_theta_bar(tubelets).detach()        # stop-gradient target

    mask_tokens = learned_position_tokens(masked_pos)
    z_pred = predictor_phi(z_context, mask_tokens, rope="3d")

    loss = l1(z_pred[masked_pos], z_target[masked_pos])
    update(encoder_theta, predictor_phi, loss)
    update_ema(ema_encoder_theta_bar, encoder_theta)
    return loss

def posttrain_vjepa2_ac_step(frames, actions, poses):
    encoder_theta.freeze()
    z = encoder_theta(frames).detach()

    # teacher forcing: use ground-truth previous latents
    z_next_tf = ac_predictor_phi(z[:-1], actions[:-1], poses[:-1],
                                 attention="block_causal")
    loss_tf = l1(z_next_tf, z[1:])

    # rollout: feed predictions back to reduce error accumulation
    z_roll = z[0]
    rollout_loss = 0.0
    for t in range(rollout_horizon):
        z_roll = ac_predictor_phi(z_roll, actions[t], poses[t],
                                  attention="block_causal")
        rollout_loss += l1(z_roll, z[t + 1])

    loss = loss_tf + rollout_loss
    update(ac_predictor_phi, loss)
    return loss

def plan_with_vjepa2_ac(current_image, goal_image, state, horizon):
    z_now = encoder_theta(current_image)
    z_goal = encoder_theta(goal_image)

    gaussian = init_action_distribution(horizon)
    for _ in range(num_cem_iters):
        candidates = gaussian.sample(num_sequences)
        scores = []
        for action_seq in candidates:
            z_future = ac_predictor_phi.rollout(z_now, state, action_seq)
            scores.append(l1(z_future, z_goal))
        gaussian.refit(candidates, scores, top_k="lowest_energy")

    best_sequence = gaussian.mean()
    return best_sequence[0]  # execute first action, then observe and re-plan
```

##### 关键公式

V-JEPA 2 预训练不是重建 RGB 像素，而是让 predictor 根据可见视频片段 \(x\)、被遮挡位置 token \(\Delta_y\)，预测 target encoder 对完整视频 \(y\) 的潜在表示：

$$
\min_{\theta,\phi,\Delta_y}
\left\|
P_{\phi}\left(\Delta_y,E_{\theta}(x)\right)
-
\mathrm{sg}\left(E_{\bar{\theta}}(y)\right)
\right\|_1
$$

其中 \(\bar{\theta}\) 是 encoder 参数 \(\theta\) 的指数滑动平均，\(\mathrm{sg}(\cdot)\) 表示停止梯度。V-JEPA 2-AC 后训练时，冻结视频编码器，只训练 action-conditioned predictor：

$$
\mathcal{L}_{\mathrm{AC}}(\phi)
=
\mathcal{L}_{\mathrm{teacher\ forcing}}(\phi)
+
\mathcal{L}_{\mathrm{rollout}}(\phi)
$$

机器人规划时，给定当前潜在状态 \(z_k\)、末端状态 \(s_k\)、目标图像潜在表示 \(z_g\)，搜索动作序列使想象后的潜在状态接近目标：

$$
\mathcal{E}(\hat{a}_{1:T};z_k,s_k,z_g)
=
\left\|
P(\hat{a}_{1:T};s_k,z_k)-z_g
\right\|_1,\qquad
a_{1:T}^{\star}=\arg\min_{\hat{a}_{1:T}}\mathcal{E}
$$

##### 方法解读

V-JEPA 2 的核心选择是“预测表示”而不是“生成视频”。视频像素里有大量不可预测细节，例如纹理、背景微小变化和压缩噪声；如果用生成式目标，模型会把容量花在复原这些细节上。JEPA 路线只要求预测目标编码器产生的语义/动态表示，因此训练压力更集中在可预测的物体、动作、接触关系和时序变化上。这也是它适合做世界模型的关键：规划不需要生成逼真画面，只需要知道动作会把状态推向哪里。

预训练阶段的结构是一个视频 ViT encoder 加一个 predictor。输入视频先被切成 \(2\times16\times16\) tubelets，然后随机丢弃一组时空块；encoder 只看可见 token，predictor 再结合可学习 mask token 和位置编码去补全被遮挡位置的 latent target。target 由 EMA encoder 产生，并通过 stop-gradient 防止两个网络相互追逐导致表征塌缩。损失只作用在 masked tokens 上，因此模型必须从上下文推断缺失片段，而不是复制输入。

V-JEPA 2 相比 V-JEPA 1 的重要变化在于规模化训练配方。论文把数据扩到 VideoMix22M 级别，使用超过 100 万小时视频；模型扩到约 10 亿参数 ViT-g；训练步数更长；并在训练后期把空间分辨率从 256 提高到 384、视频长度从 16 帧提高到 64 帧。3D-RoPE 将特征维度拆给时间、高度、宽度三个轴分别旋转，使大模型处理长视频时更稳定，也更适合保留运动结构。

V-JEPA 2-AC 不是从头训练机器人策略，而是在冻结的 V-JEPA 2 表征上学习“动作会怎样改变潜在视频状态”。它把每一帧的 patch 表示、机器人动作、末端执行器 pose token 交错输入一个约 300M 参数 transformer，并用 block-causal attention 保证当前时刻只能看当前和过去的信息。teacher forcing 让一步预测稳定，rollout loss 则把预测结果递归喂回模型，训练它在多步想象时减少误差累积。

规划阶段把机器人控制写成潜在空间能量最小化。系统先编码当前图像和目标图像，然后采样多条候选动作序列，用 V-JEPA 2-AC 想象执行后的潜在状态，选出与目标 latent 距离最小的候选。Cross-Entropy Method 反复用低能量样本更新动作分布，最后只执行第一步，再根据新观测重新规划。这种 receding-horizon 方式避免一次性开环执行整条轨迹，能在真实机器人误差和视觉反馈变化下持续修正。

与行为克隆 VLA 不同，V-JEPA 2-AC 不依赖任务特定示范和文本指令；与视频扩散世界模型不同，它也不需要在规划内反复生成高保真视频。它牺牲了可视化像素的直观性，换来更轻的潜在预测和更快的动作搜索。论文报告在单张未标定 RGB 摄像头、跨实验室 Franka 机械臂设置下可 zero-shot 完成 reach、grasp、pick-and-place，说明自监督视频表征可以成为低数据机器人规划的可行底座。

> 💡 关键：V-JEPA 2 的“世界模型”不是一个像素级视频生成器，而是一个能在 latent space 中理解当前状态、预测未来状态，并用目标图像反推动作的预测编码器。

#### 🧪 练习题

```yaml
question: "V-JEPA 2 为什么选择预测 latent representation，而不是直接预测 RGB 像素？"
options:
  - "因为 latent prediction 更关注可预测的语义和动态结构，减少对不可预测像素细节的建模压力"
  - "因为 RGB 像素无法被 Vision Transformer 切分成 patch"
  - "因为 latent prediction 可以完全不需要视频数据"
  - "因为机器人规划必须输出自然语言 token"
answer: 0
explain: "JEPA 的目标是在表征空间预测被遮挡内容，使模型学习稳定的物理和时序结构；像素生成会消耗大量容量去复原纹理和噪声。"
```
