### AniPortrait — 音频到 landmark 再到视频的逼真肖像动画
```yaml
id: "aniportrait"
name: "AniPortrait"
full_name: "音频驱动逼真肖像 (Audio-driven Photorealistic Portrait)"
year: "2024"
org: "腾讯"
paper_url: "https://arxiv.org/abs/2403.17694"
category: "talking_head"
parent: "emo"
motivation: "双流ReferenceNet双条件扩散"
```

#### 📝 一句话总结
AniPortrait 采用“Audio2Lmk + Lmk2Video”两阶段路线，先把音频转为 3D/2D landmark 和头姿，再用参考图条件扩散模型生成逼真的说话肖像视频。

#### 🎯 核心要点
- **两阶段框架**：Audio2Lmk 负责从语音预测可控运动结构，Lmk2Video 负责把结构渲染成目标身份视频。
- **显式控制**：landmark 作为中间表示，便于编辑、平滑和检查，区别于 EMO 的直接 Audio2Video。
- **扩散渲染**：Lmk2Video 基于参考图、PoseGuider/landmark 条件和 temporal module 生成连续视频。
- **训练数据**：利用人脸视频数据和 MediaPipe 等 landmark 标注，分开学习音频到运动与运动到图像。

#### 🔬 深入细节
##### 核心示意图
![AniPortrait framework](https://ar5iv.labs.arxiv.org/html/2403.17694/assets/x1.png)

##### 方法拆解
AniPortrait 的第一阶段把音频特征映射为面部运动。语音经 wav2vec2.0 类模型编码后，Transformer 或序列网络预测 3D mesh/landmark 和头部姿态，再投影成 2D landmark 序列：

$$
L_{1:T},P_{1:T}=F_{audio}(A(a_{1:T}))
$$

其中 \(L\) 表示脸部关键点，\(P\) 表示头姿。因为 landmark 是显式几何轨迹，系统可以在这一阶段做平滑、幅度调整或和外部控制信号混合。

第二阶段 Lmk2Video 用参考图保持身份，用 landmark 图驱动运动。它和 AnimateAnyone/ControlNet 风格的视频扩散模型相近：ReferenceNet 提取参考外观，PoseGuider 或 landmark encoder 把 2D landmark 转为多尺度控制特征，denoising UNet 在 temporal module 帮助下生成视频 latent。

可以把图像生成写成：

$$
\hat{V}=G_\theta(I_{ref}, \operatorname{Rasterize}(L_{1:T},P_{1:T}), \epsilon)
$$

其中 landmark rasterization 把点序列画成结构图，让扩散模型在每一帧知道嘴唇、眼睛、脸轮廓和头部位置。相比纯音频条件，landmark 条件给模型提供更明确的空间对齐信号。

##### 核心流程伪代码
```python
def aniportrait_generate(reference_image, audio):
    audio_features = wav2vec_encoder(audio)
    mesh_seq, pose_seq = audio_to_mesh_and_pose(audio_features)
    landmark_seq = project_to_2d_landmarks(mesh_seq, pose_seq)
    landmark_seq = smooth_and_normalize(landmark_seq)

    ref_features = reference_net(reference_image)
    landmark_conditions = pose_guider(rasterize_landmarks(landmark_seq))
    latents = sample_video_noise(len(landmark_seq))

    for step in reversed(diffusion_steps):
        eps = denoising_unet(
            latents,
            timestep=step,
            reference=ref_features,
            landmark_condition=landmark_conditions,
            temporal_context=True,
        )
        latents = scheduler_step(latents, eps, step)

    return vae_decode_video(latents)
```

##### 优势与局限
AniPortrait 的优势是把可控几何和扩散生成结合起来。Audio2Lmk 给出结构化运动，Lmk2Video 用生成模型补足真实纹理和细节；当用户需要修改口型、头姿或表情时，landmark 序列比纯 latent 音频条件更容易干预。

局限是两阶段误差会传递：Audio2Lmk 如果预测口型或头姿错误，后续扩散模型通常会忠实渲染错误条件。landmark 本身也压缩了细微表情、舌头、牙齿和眼神细节。与 EMO/Hallo 这类直接生成方法相比，它更可控但上限受中间表示表达能力限制。

#### 🧪 练习题
```yaml
question: "AniPortrait 采用 Audio2Lmk + Lmk2Video 两阶段设计的主要好处是什么？"
options:
  - "完全不需要参考图像"
  - "通过 landmark 中间表示提供可检查、可编辑的运动控制，再由扩散模型合成真实视频"
  - "只能处理静音视频"
  - "让音频编码器直接输出最终 RGB 像素"
answer: 1
explanation: "AniPortrait 先预测 landmark/头姿，再用这些显式条件驱动视频扩散模型，因此控制性比纯 Audio2Video 更强。"
```
