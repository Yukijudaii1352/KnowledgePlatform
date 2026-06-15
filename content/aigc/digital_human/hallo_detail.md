### Hallo — 分层音频驱动视觉合成
```yaml
id: "hallo"
name: "Hallo"
full_name: "分层音频驱动合成 (Hierarchical Audio-Driven Visual Synthesis)"
year: "2024"
org: "复旦/阿里"
paper_url: "https://arxiv.org/abs/2406.08801"
category: "talking_head"
parent: "emo"
motivation: "分层音频注入解决时序一致性"
```

#### 📝 一句话总结
Hallo 在扩散式音频驱动肖像生成中引入分层音频-视觉交叉注意力，把语音分别作用到唇部、表情和姿态层级，以改善口型同步和整体动态一致性。

#### 🎯 核心要点
- **继承 EMO 思路**：参考肖像 + 音频条件 + 视频扩散去噪，避免强依赖 3DMM/landmark。
- **核心创新**：Hierarchical Audio-Visual Cross Attention，将音频信息按唇部、表情、姿态等层级注入。
- **长视频策略**：使用前一段生成的 motion frames 作为连续性条件，缓解分段生成的断裂。
- **训练方式**：先单帧学习身份/外观，再加入 temporal motion module 和音频注意力训练视频动态。

#### 🔬 深入细节
##### 核心示意图
![Hallo pipeline](https://ar5iv.labs.arxiv.org/html/2406.08801/assets/fig_tab/halo.png)

##### 方法拆解
Hallo 的整体框架仍是条件视频扩散。参考图像经 ReferenceNet 提供身份与纹理，音频经 wav2vec 类编码器得到语音特征，denoising UNet 在这些条件下逐步生成视频 latent。基础去噪可抽象为：

$$
z_{t-1}=D_\theta(z_t, f_{ref}, f_{audio}, f_{motion}, t)
$$

其中 \(f_{motion}\) 可以来自上一视频片段的运动帧，用来保持长视频段落之间的头部姿态和表情连续。

分层音频注入是 Hallo 的关键。语音对人脸不同区域的影响并不相同：音素强烈影响嘴唇开合，语调和韵律影响表情，节奏和情绪可能影响头部运动。如果把全部音频特征一次性注入所有视觉 token，网络容易在口型同步和自然运动之间互相干扰。Hallo 将视觉特征分成不同层级或区域，通过交叉注意力分别融合音频：

$$
H_r=\operatorname{softmax}\left(\frac{Q_rK_a^\top}{\sqrt{d}}\right)V_a,\quad
r\in\{\text{lip},\text{expr},\text{pose}\}
$$

最终视觉更新可以看作多个层级响应的加权组合：

$$
H=w_lH_{lip}+w_eH_{expr}+w_pH_{pose}
$$

这种结构让嘴部区域更专注于音素级同步，同时给表情和头姿保留更平滑、更低频的音频响应。训练中 motion module 常初始化自通用图像到视频模型，以获得更好的时序先验。

##### 核心流程伪代码
```python
def hallo_generate(reference_image, audio, previous_motion_frames=None):
    ref_features = reference_net(reference_image)
    audio_features = wav2vec_encoder(audio)
    motion_context = encode_motion_frames(previous_motion_frames)
    latents = init_video_latents(audio_duration=audio.duration)

    for step in reversed(diffusion_steps):
        visual_tokens = denoising_unet.backbone(latents, step, ref_features)
        lip_tokens, expr_tokens, pose_tokens = split_visual_hierarchy(visual_tokens)
        lip_tokens = cross_attention(lip_tokens, audio_features, level="lip")
        expr_tokens = cross_attention(expr_tokens, audio_features, level="expression")
        pose_tokens = cross_attention(pose_tokens, audio_features, level="pose")
        latents = denoise_with_motion_module(
            latents,
            merge(lip_tokens, expr_tokens, pose_tokens),
            motion_context,
            step,
        )

    return decode_video(latents)
```

##### 价值与局限
Hallo 的价值在于承认 audio-to-face 不是单一映射。嘴唇、表情、头姿对音频的敏感频率和语义层级不同，分层注入比简单拼接音频条件更符合问题结构。

局限是扩散采样成本仍高，长视频仍需要分段生成和运动上下文维持。分层注意力能改善同步和自然度，但不能完全保证精确可编辑性；当用户需要指定某个头部轨迹或表情曲线时，显式 landmark 或控制信号仍更直接。

#### 🧪 练习题
```yaml
question: "Hallo 的 Hierarchical Audio-Visual Cross Attention 主要想解决什么问题？"
options:
  - "让所有视觉区域完全忽略音频"
  - "按唇部、表情、姿态等层级注入音频，减少同步和自然运动之间的干扰"
  - "把视频压缩为单张图片"
  - "替代参考图像中的身份信息"
answer: 1
explanation: "Hallo 将音频条件分层作用于不同视觉层级，使唇形同步、表情变化和头姿运动各自获得更合适的音频响应。"
```
