### DiffTalk：基于潜在扩散的通用音频驱动肖像动画

```yaml
id: difftalk
name: DiffTalk
full_name: "扩散模型肖像动画 (Crafting Diffusion Models for Portraits)"
year: "2023"
org: "学术界"
paper_url: "https://arxiv.org/abs/2301.03786"
category: "lip_sync"
parent: "wav2lip"
motivation: "首个扩散模型口型同步方法"
```

#### 📝 一句话总结

DiffTalk 将 talking-head 生成建模为音频条件的潜在扩散去噪过程，并同时引入参考人脸和 landmark 条件，解决传统方法在生成质量与跨身份泛化之间难以兼顾的问题。

#### 🎯 核心要点

- 将肖像动画放入 Latent Diffusion Model 中生成，降低像素扩散成本。
- 不只使用音频，还引入参考人脸图像和 landmark 作为身份与结构条件。
- 通过时序一致的去噪过程生成连贯 talking-head 序列。
- 将口型同步、身份保持和视觉质量统一到扩散生成框架。
- 相比纯 GAN/flow 方法，具备更好的生成多样性和修复能力。

#### 🔬 深入细节

![DiffTalk 框架图](https://ar5iv.labs.arxiv.org/html/2301.03786/assets/x1.png)
*图：DiffTalk 将参考肖像、音频和 landmark 条件注入潜在扩散模型，逐步去噪生成说话人视频。*

DiffTalk 的背景是 2023 年前后潜在扩散在图像生成上已经表现出强大的细节建模能力，但 talking-head 还常依赖 GAN、landmark renderer 或局部口型修复。DiffTalk 的关键尝试是把肖像动画改写为“条件视频 latent 去噪”。

在训练中，真实视频经 VAE 编码为 latent \(z_0\)，扩散前向过程加入噪声得到 \(z_t\)。模型学习在音频 \(a\)、参考图 \(r\)、landmark \(l\) 条件下预测噪声：

$$\mathcal{L}=\mathbb{E}_{z_0,t,\epsilon}\|\epsilon-\epsilon_\theta(z_t,t,a,r,l)\|_2^2$$

音频决定嘴部动态，参考图约束身份外观，landmark 提供几何结构和大致姿态。三者结合后，扩散模型不必从音频中同时猜身份、纹理和结构，生成难度显著降低。

```python
# DiffTalk 采样伪代码
def difftalk_generate(reference_image, audio, landmarks):
    ref_cond = reference_encoder(reference_image)
    audio_cond = audio_encoder(audio)
    lm_cond = landmark_encoder(landmarks)
    z = sample_noise_latent()

    for step in diffusion_steps:
        eps = latent_unet(z, step, ref_cond, audio_cond, lm_cond)
        z = scheduler.step(z, eps, step)
    return vae.decode(z)
```

与 Wav2Lip 相比，DiffTalk 不局限于嘴部修复，而是能生成更完整的肖像动画；与后来的 DiT/实时方法相比，它的推理速度较慢，但奠定了“扩散模型 + 多条件 talking-head”的基本范式。

#### 🧪 练习题

```yaml
question: "DiffTalk 为什么同时使用音频、参考图和 landmark 条件？"
options:
  - "三类条件分别约束口型动态、身份外观和几何结构，降低扩散生成难度"
  - "为了让模型忽略音频"
  - "为了只生成随机头像"
  - "为了取消 VAE latent"
answer: 0
explain: "音频、参考图和 landmark 分别提供不同信息，组合后能同时提升同步、身份保持和结构稳定性。"
```
