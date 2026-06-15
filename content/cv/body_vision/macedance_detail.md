### MACE-Dance

```yaml
id: macedance
name: MACE-Dance
full_name: "运动外观级联专家 (Motion-Appearance Cascaded Experts)"
year: "2026.05"
org: "Hugging Face"
paper_url: "https://huggingface.co/papers/2512.18181"
category: "motion"
parent: "cmdm"
motivation: "混合专家系统BiMamba架构降低长序列开销"
```

#### 📝 一句话总结

MACE-Dance 提出运动专家与外观专家级联的音乐驱动舞蹈视频生成框架，先用 BiMamba-Transformer 扩散模型生成 3D SMPL 舞蹈，再用参考图像条件的视频扩散模型合成外观一致的视频。

#### 🎯 核心要点

- **级联 MoE 设计**：Motion Expert 负责 music-to-3D motion，Appearance Expert 负责 motion/reference-to-video
- **3D 中间表示**：使用 SMPL 序列而非 2D keypoints 连接两个专家，减少深度歧义和自遮挡错误
- **BiMamba-Transformer Motion Expert**：BiMamba 捕捉音乐/舞蹈局部时序依赖，Transformer 建模跨模态全局上下文
- **Guidance-Free Training**：用温度参数 \(\beta\) 训练单模型表达不同采样温度，避免 CFG 推理时双前向成本
- **Kinematic-Aesthetic 外观微调**：先微调 Body Adapter 强化动作跟随，再用 LoRA 微调 DiT block 提升纹理和时序外观
- **MA-Data 数据集**：约 70K clips、116 小时、20+ 舞种，结合 3D 渲染数据和互联网舞蹈视频
- **运动-外观评测协议**：运动维度用 ViTPose 关键点评估保真度/多样性/同步，外观维度基于 VBench 选择舞蹈相关指标

#### 🔬 深入细节

![MACE-Dance 框架图](https://arxiv.org/html/2512.18181v3/x2.png)
*图：Motion Expert 将音乐映射为 3D SMPL 动作，3D-to-2D Projector 转换为姿态条件，Appearance Expert 基于参考图像合成舞蹈视频。*

```python
# MACE-Dance 训练与推理伪代码
for music, smpl_motion in motion_loader:
    music_feat = librosa_features(music)
    t = sample_diffusion_step()
    beta = sample_temperature()
    noisy_motion = diffuse(smpl_motion, t)
    pred_motion = motion_expert(noisy_motion, music_feat, t, beta)
    loss = recon_loss(pred_motion, smpl_motion)
    loss += joint_3d_loss(fk(pred_motion), fk(smpl_motion))
    loss += velocity_loss(pred_motion, smpl_motion)
    loss += foot_contact_loss(pred_motion)
    optimize(loss)

for ref_image, music in inference_requests:
    smpl = ddim_sample(motion_expert, music, beta=0.75)
    pose_2d = projector_3d_to_2d(smpl)
    video = appearance_expert(ref_image, pose_2d)
```

**动机与背景。** 直接从音乐生成视频要同时学会音乐节奏、三维身体动力学、人物外观、服装纹理、背景和相机运动，任务耦合过强。已有音乐到 3D 舞蹈方法只解决动作，不保证真实视频外观；已有 pose-driven animation 需要人工姿态驱动；已有音乐驱动视频方法常用 2D keypoints，遇到大幅度舞蹈、遮挡和转身时深度信息丢失。MACE-Dance 把问题拆成“先生成可信 3D 舞蹈，再把 3D 动作渲染成参考人物视频”。

**Motion Expert。** 运动专家是扩散模型，输入为带噪 SMPL 序列、音乐特征、扩散时间步和 GFT 温度参数。BiMamba 的选择来自音乐舞蹈序列的局部连续性：短窗口内节拍、重心和肢体速度需要平滑承接；Transformer cross-attention 则负责长程乐句、高潮和风格语义与身体动作的全局对齐。整体损失不仅包含扩散重建，还加入 forward kinematics 后的 3D joint loss、速度 loss 和 foot contact loss，防止舞蹈脚底滑动、关节漂移和节奏断裂。

**Guidance-Free Training。** 传统 CFG 在推理时需要同时跑 conditional 和 unconditional 两次前向，再线性组合预测，速度成本高且训练-推理分布不一致。MACE-Dance 采用 GFT，把温度 \(\beta\) 作为条件输入，并在训练阶段让模型学习不同采样温度下的目标：

$$
\mathcal{L}_{\text{GFT}}=\mathbb{E}\left[\|\epsilon_\theta(x_t,t,c,\beta)-\epsilon_{\beta}\|_2^2\right]
$$

直觉上，\(\beta\) 变成控制保真度与多样性的旋钮；论文默认 \(\beta=0.75\)，接近 0 偏保守高保真，接近 1 偏多样。

**Appearance Expert。** 外观专家基于 Wan-Animate，但原模型更偏一般人体动画和脸部条件，直接用于舞蹈会出现身体动作跟随不足和纹理不稳定。论文采用两阶段微调：Kinematic Stage 冻结大部分模型，仅训练 Body Adapter，让模型更重视舞蹈身体姿态；Aesthetic Stage 冻结运动路径，只在 DiT block 的注意力和 FFN 上挂 LoRA，针对舞蹈数据提升皮肤、头发、服装和背景的细节稳定性。

**为什么中间用 3D。** 2D keypoints 容易把同一动作在不同视角下混为一谈，也会丢失前后方向和全局平移。SMPL 作为桥接信号可以保留身体几何、根节点运动和朝向，先让 Motion Expert 在干净的运动空间里解决编舞，再让 Appearance Expert 处理视觉渲染。这样也提供了可解释的中间接口，便于编辑舞蹈动作。

**与 CMDM/TokenDance 的关系。** CMDM 关注文本到动作的因果流式扩散；TokenDance 关注音乐到 3D 舞蹈的 token 级高效生成；MACE-Dance 更进一步把 3D 舞蹈与真实视频外观合成级联起来，重点是端到端音乐驱动舞蹈视频，而不是只输出骨架或 SMPL。

> 💡 关键：MACE-Dance 的核心不是单个更大的模型，而是把音乐到视频拆成两个边界清晰的专家，中间用 3D 动作作为可控、可解释的接口。

#### 🧪 练习题

```yaml
question: "MACE-Dance 为什么选择 3D SMPL 作为 Motion Expert 和 Appearance Expert 的中间表示？"
options:
  - "SMPL 可以直接替代视频扩散模型"
  - "3D 表示保留深度、全局运动和身体几何，比 2D keypoints 更稳健"
  - "SMPL 能自动生成音乐特征"
  - "2D keypoints 无法用于任何视频生成模型"
answer: 1
explain: "3D SMPL 减少视角歧义和遮挡问题，并把动作语义与外观渲染解耦，是两个专家之间的稳定接口。"
```
