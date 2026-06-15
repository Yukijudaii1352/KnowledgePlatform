### 空 (Sora)

```yaml
id: sora
name: Sora
full_name: 空 (Sora)
year: "2024.02"
org: OpenAI
paper_url: "https://openai.com/research/video-generation-models-as-world-simulators"
category: generative
parent: videogpt
motivation: "展现对重力碰撞等物理规律的直觉理解"
```

#### 📝 一句话总结

Sora 将不同长度、分辨率和宽高比的视频/图像压缩为空间-时间 latent patches，并用文本条件 diffusion transformer 生成最长约一分钟的视频，展示了大规模视频生成模型向通用世界模拟器演化的潜力。

#### 🎯 核心要点

- **统一视觉 patch 表示**：先压缩视频到 latent space，再切成 spacetime patches 作为 Transformer token
- **Diffusion Transformer**：在带噪 latent patches 和文本条件下预测干净 patches，而不是逐像素或逐 token 自回归采样
- **原生尺寸训练**：支持可变时长、分辨率和宽高比，避免传统固定裁剪导致的构图损失
- **文本条件增强**：使用视频重描述和 GPT prompt expansion，提高文本遵循和细节可控性
- **多输入能力**：除 text-to-video 外，还支持图像动画、视频延展、视频编辑和视频插值
- **涌现模拟能力**：在 3D 一致性、长程物体持久性、简单交互、Minecraft 类数字世界模拟上表现出规模化收益
- **依据限制**：OpenAI 技术报告明确未公开完整模型和实现细节，因此本文按公开报告中的方法框架进行精读

#### 🔬 深入细节

##### 核心示意图

![Sora spacetime patches](https://images.ctfassets.net/kftzwdyauwt9/1d2955dd-9d05-4f33-13073dc9301d/8dc0bae8cb98054d083ab3cc3ade6859/figure-patches.png?fm=webp&q=90&w=3840)
*图：Sora 将视频压缩为 latent 表示，再切成 spacetime patches，让 Transformer 能在不同尺寸和时长的视频上训练。*

##### 动机与背景

许多早期视频生成方法只训练固定尺寸、固定长度的短片段，例如把所有视频裁剪成 4 秒、256x256。这样做简化了训练，但丢失了真实视频的构图、纵横比、镜头时长和运动分布。Sora 的技术报告把问题改成：如何像语言模型处理任意文本 token 一样，用统一 token 表示处理多样化视觉数据。

Sora 首先训练 video compression network，将原始视频压缩到低维 latent space：

$$
z = E_{\text{video}}(x), \quad \hat x = D_{\text{video}}(z)
$$

然后把 \(z\) 切成 spacetime patches。图像可以看作只有一帧的视频，因此同一 patch 表示同时适用于图片和视频。推理时，通过布置不同形状的随机噪声 patch 网格，就能控制输出视频的分辨率、宽高比和时长。

扩散训练目标可以抽象为：给定带噪 latent patches \(z_t\)、扩散时间 \(t\) 和文本条件 \(c\)，模型预测原始干净 patches 或噪声：

$$
\mathcal{L}_{\text{diff}} =
\mathbb{E}_{z_0,t,\epsilon,c}
\left[
\left\|
\epsilon - \epsilon_\theta(z_t, t, c)
\right\|_2^2
\right]
$$

报告强调 Sora 是 diffusion transformer。Transformer 的作用是让所有 spacetime patches 在统一序列中通信，扩散过程负责从噪声逐步去噪到高保真视频。

##### 算法伪代码

```python
# Publicly described Sora-style training flow
initialize(video_compressor, video_decoder, diffusion_transformer)

for visual_sample, caption in image_video_batches:
    # visual_sample may be image or video with native size/duration
    latent = video_compressor(visual_sample)
    patches = extract_spacetime_patches(latent)

    detailed_caption = recaption_or_expand(caption)
    t = sample_diffusion_timestep()
    noise = sample_gaussian_like(patches)
    noisy_patches = add_noise(patches, noise, t)

    pred_noise = diffusion_transformer(noisy_patches, t, text=detailed_caption)
    loss = mse(pred_noise, noise)
    optimize(diffusion_transformer, loss)

# Sampling
shape = choose_patch_grid(duration, resolution, aspect_ratio)
patches = gaussian_noise(shape)
for t in reversed(diffusion_schedule):
    patches = denoise_step(diffusion_transformer, patches, t, text_prompt)
latent_video = combine_spacetime_patches(patches)
video = video_decoder(latent_video)
```

##### 方法机制拆解

Spacetime patches 是 Sora 与 VideoGPT 类离散自回归方法的关键差别。VideoGPT 依赖 VQ code 序列逐 token 建模，Sora 则在连续 latent patches 上用扩散去噪。这样做可以让模型在一次去噪网络调用中让不同位置、不同帧之间相互注意，适合高分辨率长视频。

原生尺寸训练解决了构图问题。若所有训练视频都被裁剪为正方形，模型会学到错误的取景先验，生成时容易截断主体。Sora 保留原始宽高比和时长分布，因此可以直接生成横屏 1920x1080、竖屏 1080x1920 以及中间比例的视频。

文本理解并非只靠原始用户 prompt。报告使用类似 DALL-E 3 的重描述策略：先用 captioner 为训练视频生成高描述性文本，再用 GPT 将短 prompt 扩展成更具体的 caption。这样视频模型得到的条件信号更精确，文本遵循和细节一致性更好。

Sora 的“世界模拟器”能力来自规模化而非显式物理引擎。报告列举的 3D 一致性、物体持久性、交互影响和 Minecraft 模拟说明模型在大量视频上学到了部分物理和场景动力学。但报告也明确指出，Sora 仍会在玻璃破碎、进食状态变化、长视频一致性和突然出现物体等方面失败。

> ⚠️ 注意：Sora 技术报告没有公开参数规模、训练数据细节和完整架构超参，因此不能把这里的伪代码理解为可复现实现，只能视为公开描述的方法抽象。

#### 🧪 练习题

```yaml
question: "Sora 使用 spacetime latent patches 的主要目的是什么？"
options:
  - "把不同分辨率、宽高比和时长的视频统一成 Transformer 可处理的 token 序列"
  - "把所有视频强制裁剪成固定正方形"
  - "完全移除文本条件"
  - "只生成单帧图像，避免时间建模"
answer: 0
explain: "Sora 先压缩视频再切分时空 patch，使同一 diffusion transformer 能处理可变尺寸、可变时长的视频和图像。"
```
