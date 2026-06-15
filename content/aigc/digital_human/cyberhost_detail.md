### CyberHost
```yaml
id: cyberhost
name: CyberHost
full_name: "单阶段说话身体扩散 (One-stage Diffusion for Talking Body)"
year: "2025"
org: "阿里巴巴"
paper_url: "https://arxiv.org/abs/2409.13501"
category: body_motion
parent: lda
motivation: "音频驱动全身视频单阶段生成"
```

#### 📝 一句话总结
CyberHost 提出单阶段音频驱动 talking body 扩散框架，用 Region Attention Module 和 Human-Prior-Guided Conditions 同时缓解手部细节破损、身份不一致和仅靠音频驱动时的运动不确定性。

#### 🎯 核心要点
- 单阶段生成：直接从参考图像、音频和结构先验生成说话半身/身体视频，不再拆成“音频到姿态”和“姿态到视频”两个独立阶段。
- Region Attention Module：在去噪 U-Net 多层插入区域注意力，用可学习的时空 region latent bank 和局部身份特征强化手部、脸部等关键区域。
- Human-Prior-Guided Conditions：引入 body movement map、hand clarity score、pose-aligned reference features，降低音频到身体动作的一对多不确定性。
- Reference network：利用历史运动帧抽取时序延续线索，提升长片段的身份一致性与动作连续性。
- 资料限制：manifest 中 `paper_url` 可打开但与 CyberHost 题名不匹配；本文精读使用实际公开论文 `https://arxiv.org/abs/2409.01876` 和论文 HTML 图源。

#### 🔬 深入细节
##### 核心示意图/框架图
![CyberHost overall framework](https://arxiv.org/html/2409.01876v3/extracted/6337763/figs/halfbody.png)
*图：CyberHost 总体结构。RAM 插入扩散 U-Net，结构先验和参考网络共同约束音频驱动的视频生成。*

##### 核心流程伪代码
```python
# CyberHost audio-driven talking body generation
for video_clip, audio, reference_image in training_data:
    z0 = video_vae.encode(video_clip)
    t = sample_diffusion_step()
    eps = normal_like(z0)
    zt = add_noise(z0, eps, t)

    face_crop, hand_crop = crop_regions(reference_image)
    region_tokens = RAM.latent_bank_attend(face_crop, hand_crop)
    priors = build_human_priors(audio, video_clip)  # movement map, hand clarity, pose-aligned refs
    ref_feat = reference_net(previous_motion_frames)

    eps_hat = denoising_unet(zt, t, audio, reference_image, region_tokens, priors, ref_feat)
    loss = mse(eps_hat, eps) + lambda_mask * region_mask_loss()
    update(loss)

def infer(audio, reference_image):
    z = normal_latent()
    for t in reversed(diffusion_steps):
        region_tokens = RAM.extract(reference_image)
        priors = build_inference_priors(audio, reference_image)
        z = denoise_step(z, t, audio, reference_image, region_tokens, priors)
    return video_vae.decode(z)
```

##### 方法解读
CyberHost 的问题设定是跨模态 talking body：输入一张人物图像和一段音频，输出与语音同步、身份一致、手和脸不崩的视频。传统级联做法先预测姿态或 motion，再用视频生成器渲染，优点是条件明确，缺点是误差会级联，而且手、脸等局部区域在低分辨率姿态中很容易丢细节。CyberHost 选择单阶段扩散，让视觉合成和运动建模在同一个去噪网络里共同优化。

核心扩散目标仍是噪声预测：
$$
\mathcal{L}_{diff}=\mathbb{E}_{z_0,t,\epsilon}\left[\|\epsilon-\epsilon_\theta(z_t,t,c_{audio},c_{img},c_{prior})\|_2^2\right],
$$
其中 \(z_t\) 是视频 latent 加噪后的状态，条件 \(c\) 包含音频、参考图像、区域特征和人体先验。直觉上，音频告诉模型“什么时候说话、节奏如何”，参考图像告诉模型“是谁、衣服和脸长什么样”，人体先验告诉模型“身体大概该怎样动”。

RAM 的设计是把局部区域拆成“身份无关的结构模式”和“身份相关的外观描述”。论文中 RAM 维护 spatial latent bank 与 temporal latent bank，并对手、脸区域使用局部 descriptor 做注意力融合。这样做的原因是手部拓扑和脸部表情存在可复用的通用模式，但最终渲染必须贴合输入人物的身份细节；单纯靠全局 self-attention 往往会在这些小区域平均化。

Human-Prior-Guided Conditions 处理另一个困难：仅凭语音不能唯一决定身体动作。CyberHost 因此加入 body movement map 约束全局运动范围，用 hand clarity score 区分训练样本中手部清晰度，并用 pose-aligned reference features 补充局部对齐的身份特征。训练时这些条件让模型学到“清晰手部应该对应什么样的局部纹理和运动”；推理时输入更高质量的条件可以把生成分布推向更稳定的样本。

与 LDA 这类音频到动作扩散相比，CyberHost 的重点从“生成骨架/动作序列”扩展到“直接生成视频”。它牺牲了一部分显式可控性，换来端到端优化的视觉一致性；同时通过 RAM 和先验条件补回单阶段模型最容易丢掉的局部结构约束。

> 💡 关键：CyberHost 的贡献不是简单把音频塞进视频扩散模型，而是专门为 talking body 的局部崩坏和运动不确定性设计了区域记忆与人体先验。

#### 🧪 练习题
```yaml
question: "CyberHost 中 RAM 的主要作用是什么？"
options:
  - "把音频转写成文本后再驱动表情"
  - "用区域 latent bank 和局部身份特征增强手部、脸部等关键区域"
  - "将扩散模型替换为自回归 Transformer"
  - "只预测 3D 骨架而不生成像素"
answer: 1
explain: "RAM 被插入去噪 U-Net，用可学习的时空区域记忆和局部 descriptor 强化小区域结构与身份一致性。"
```
