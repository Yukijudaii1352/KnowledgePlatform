### EMO — 直接音频到肖像视频的扩散生成
```yaml
id: "emo"
name: "EMO"
full_name: "情感肖像生成 (Emote Portrait Alive)"
year: "2024"
org: "阿里巴巴"
paper_url: "https://arxiv.org/abs/2402.17485"
category: "talking_head"
parent: "fomm"
motivation: "直接Audio2Video无需中间表征"
```

#### 📝 一句话总结
EMO 用扩散模型直接从参考肖像和语音生成会说话的视频，弱化 3DMM、landmark 或 mesh 等中间表示，让表情、头动和口型由音频条件共同驱动。

#### 🎯 核心要点
- **直接 Audio2Video**：不显式预测 landmark、blendshape 或 3D 网格，减少中间表示误差传递。
- **扩散骨架**：以 Stable Diffusion/UNet 风格的视频扩散模型为基础，加入 ReferenceNet、Audio-Attention 和 Temporal Modules。
- **身份保持**：参考图像通过 ReferenceNet 注入外观特征，face locator/mask 限定人脸区域。
- **训练分阶段**：先图像级身份与外观建模，再视频级时间建模和音频对齐，最后训练运动速度相关控制。

#### 🔬 深入细节
##### 核心示意图
![EMO pipeline](https://ar5iv.labs.arxiv.org/html/2402.17485/assets/images/pipeline.png)

##### 方法拆解
EMO 的输入是一张参考肖像 \(I_{ref}\) 和一段音频 \(a_{1:T}\)，输出视频帧 \(\hat{I}_{1:T}\)。扩散模型从噪声 latent 开始，逐步在参考身份和音频条件下去噪：

$$
z_{t-1}=D_\theta(z_t, I_{ref}, A(a), m, c_{speed}, t)
$$

其中 \(A(a)\) 是预训练音频编码器提取的语音特征，\(m\) 是人脸区域或运动区域 mask，\(c_{speed}\) 是运动速度相关条件。相比先预测 landmark 再渲染，EMO 让网络在视频生成空间内直接学习音频到口型、表情和头部运动的对应关系。

ReferenceNet 负责从参考图中提取身份和细节特征，并通过 attention 注入 denoising UNet。音频特征通常需要覆盖当前帧附近的上下文窗口，因为口型不仅由当前音素决定，还受前后音素和发音过渡影响。可以抽象为：

$$
A_t = [A(a_{t-w}),\ldots,A(a_t),\ldots,A(a_{t+w})]
$$

Temporal Modules 在帧间传播信息，减少闪烁并让头部运动连续。Face locator 或 facial mask 提供弱空间约束，帮助模型知道应该在哪些区域生成与语音相关的变化，而不是让整个图像随音频无规律抖动。

##### 核心流程伪代码
```python
def emo_generate(reference_image, audio):
    ref_features = reference_net(reference_image)
    audio_features = audio_encoder(audio)
    face_mask = face_locator(reference_image)
    latents = sample_video_noise(num_frames=audio_to_frames(audio))

    for step in reversed(diffusion_steps):
        local_audio = collect_audio_context(audio_features, step)
        eps = denoising_unet(
            latents,
            timestep=step,
            reference=ref_features,
            audio=local_audio,
            face_mask=face_mask,
            temporal_context=True,
        )
        latents = diffusion_scheduler.step(latents, eps, step)

    return vae_decode_video(latents)
```

##### 意义与局限
EMO 的意义在于把 audio-driven portrait 从“中间结构预测 + 图像合成”的管线推向端到端视频生成。它能利用扩散模型强大的视觉先验，生成更丰富的表情和头动，而不被 landmark 的低维表达限制。

局限是推理成本较高，采样速度慢于 LivePortrait 这类 warping 方法。直接生成也意味着精确编辑更难：如果用户希望锁定某个眼神、头部轨迹或特定口型，显式控制不如 landmark/3DMM 路线直接。长视频还需要额外的分段连续性策略，否则身份、姿态和背景可能随时间漂移。

#### 🧪 练习题
```yaml
question: "EMO 相比传统 audio-to-landmark-to-video 管线的主要区别是什么？"
options:
  - "EMO 不使用任何参考图像"
  - "EMO 直接在视频扩散模型中注入音频和参考身份条件，减少显式中间表征"
  - "EMO 只能生成静态图片"
  - "EMO 必须先训练目标人物专属 3DMM"
answer: 1
explanation: "EMO 的核心是直接 Audio2Video，依赖扩散模型和参考特征生成视频，而不是先预测 landmark 或 mesh。"
```
