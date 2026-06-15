### Lyra - 视频扩散自蒸馏 (Lyra)

```yaml
id: lyra
name: Lyra
full_name: 视频扩散自蒸馏 (Lyra)
year: "2026.04"
org: ICLR
paper_url: https://iclr.cc/virtual/2026/poster/lyra
category: native_3d
parent: vist3a
motivation: 视频扩散自蒸馏到3DGS
```

#### 📝 一句话总结

Lyra 用相机可控视频扩散模型作为 teacher，在同一 latent 上训练 3DGS decoder 作为 student，把视频模型隐含的 3D 一致性蒸馏成显式 3D Gaussian Splatting 表示，并进一步扩展到动态 4D 场景。

#### 🎯 核心要点

- 使用 camera-controlled video diffusion model 生成多轨迹视频 latent，RGB decoder 输出作为 teacher 监督
- 训练 3DGS decoder 直接从视频 latent 和 Plucker 相机编码预测显式 3D Gaussian 参数
- 不依赖真实多视角数据集，训练监督主要由视频扩散模型自蒸馏产生
- 多轨迹监督使用 6 条相机轨迹扩大视角覆盖，decoder 学习融合不同轨迹 latent 并填补遮挡区域
- 3DGS decoder 在压缩 latent 空间工作，避免像素空间重建模型处理长视频序列时的显存爆炸
- 动态版本加入 source/target time embedding，生成时间条件 3DGS，实现单目视频到 4D 场景

#### 🔬 深入细节

##### 核心示意图

![Lyra 自蒸馏框架](https://arxiv.org/html/2509.19296v1/x2.png)
*图：Lyra 的 teacher-student 自蒸馏框架。视频模型 RGB 分支提供监督，3DGS decoder 分支学习输出显式 3D 表示。*

##### 核心流程伪代码

```python
# Lyra self-distillation
freeze(video_diffusion_model)
freeze(video_vae_rgb_decoder)
train(gaussian_decoder)

for image_or_video in synthetic_inputs:
    trajectories = sample_camera_trajectories(num=6)
    latents = []
    teacher_frames = []

    for cameras in trajectories:
        z = video_diffusion_model.denoise(image_or_video, cameras)
        latents.append(z)
        teacher_frames.append(rgb_decoder(z))

    plucker = encode_plucker_rays(trajectories)
    gaussians = gaussian_decoder(latents, plucker)

    rendered = render_3dgs(gaussians, trajectories)
    loss = mse(rendered, teacher_frames)
    loss += lambda_lpips * lpips(rendered, teacher_frames)
    loss += lambda_depth * scale_invariant_depth(rendered, teacher_depth)
    update(gaussian_decoder, loss)
```

##### 方法解读

Lyra 的出发点是：视频扩散模型已经从大规模视频中学到相机运动、遮挡和场景连续性，但这些知识通常只存在于 RGB 序列里，不能直接用于交互式三维渲染。Lyra 不再收集真实多视角重建数据，而是把相机可控视频模型当作 teacher，让它合成具有指定相机轨迹的视频，再训练 student 3DGS decoder 去复现这些视频的渲染结果。

训练时，输入可以是单张图像或单目视频。视频扩散模型根据相机轨迹生成 denoised latent \(\mathbf{z}\)，同一个 latent 有两条解码路径：冻结的 RGB decoder 得到 teacher 视频 \(\hat{I}_{\text{rgb}}\)，可训练的 3DGS decoder 得到高斯集合 \(\mathcal{G}\)。渲染函数将 \(\mathcal{G}\) 从对应相机视角渲染成 \(\hat{I}_{\text{gs}}\)，损失约束二者一致：

$$\mathcal{L}_{\text{img}} =
\lambda_{\text{mse}}\|\hat{I}_{\text{gs}} - \hat{I}_{\text{rgb}}\|_2^2
+ \lambda_{\text{lpips}}\text{LPIPS}(\hat{I}_{\text{gs}}, \hat{I}_{\text{rgb}})$$

只用 RGB loss 容易得到扁平几何，因此 Lyra 还使用视频深度估计器提供深度监督：

$$\mathcal{L} = \mathcal{L}_{\text{img}} + \lambda_{\text{depth}}\mathcal{L}_{\text{depth}}$$

其中深度项通常使用尺度不变形式，重点约束相对几何而不是绝对尺度。3DGS decoder 输出每个高斯的中心、尺度、旋转、透明度和颜色等参数，显式 3D 表示保证推理后可以从任意视角实时渲染。

多轨迹训练是 Lyra 区别于普通单轨迹蒸馏的关键。单条相机轨迹通常只能覆盖场景一侧，student 容易把未观察区域压扁或忽略。Lyra 为每个输入采样 6 条轨迹，每条轨迹有长序列帧，decoder 在 latent 空间融合这些轨迹信息。latent 空间维度远低于像素空间，使模型可以处理长序列和多视角，而不需要把数百张高分辨率图像都送进像素级 transformer。

动态扩展中，Lyra 为 decoder 加入 source time 和 target time embedding。静态 3DGS 只需输出一个固定场景，动态 4D 则要输出某个目标时刻的高斯。训练时对每个目标时间选择对应 teacher 帧监督，并用 motion-reversed augmentation 改善早期/远端视角覆盖不均的问题。这样从单目视频中也能学到“同一运动状态在不同视角下应如何呈现”。

与 VIST3A 相比，Lyra 不强调把两个预训练模型结构切开再缝合，而是让视频模型自己生成监督信号，训练一个显式 3DGS student。它的优势是数据闭环更简单、输出直接可渲染；限制是最终 3D 一致性受 teacher 视频模型相机控制能力约束，teacher 的幻觉和遮挡错误也可能被 student 蒸馏下来。

#### 🧪 练习题

```yaml
question: "Lyra 为什么选择在视频 latent 空间训练 3DGS decoder，而不是在像素空间输入所有帧？"
options:
  - "因为 3DGS 只能读取 latent，不能读取 RGB 图像"
  - "因为 latent 空间压缩了时空信息，可高效融合长视频和多轨迹，避免像素级注意力显存过高"
  - "因为 RGB decoder 在训练时必须被更新"
  - "因为深度监督只在 latent 空间有定义"
answer: 1
explain: "多轨迹长视频在像素空间会带来极高的 token 数和显存开销；Lyra 直接处理视频扩散 latent，可以高效聚合视角信息并输出显式 3DGS。"
```
