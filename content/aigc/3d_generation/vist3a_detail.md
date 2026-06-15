### VIST3A - 视频蒸馏3D (VIST3A)

```yaml
id: vist3a
name: VIST3A
full_name: 视频蒸馏3D (VIST3A)
year: "2026.04"
org: ICLR
paper_url: https://iclr.cc/virtual/2026/poster/25432
category: native_3d
parent: luciddreamer
motivation: 视频生成器缝合3D重建
```

#### 📝 一句话总结

VIST3A 提出 Video VAE Stitching and 3D Alignment，把预训练视频生成器的 latent 空间和预训练 3D 重建网络的后半段“缝合”为 3D VAE，再用直接奖励微调让视频扩散模型生成可被 3D 解码器稳定解码的 latent。

#### 🎯 核心要点

- 通过 model stitching 复用视频 VAE encoder 和 feed-forward 3D 模型 decoder，避免从头训练 3D latent decoder
- 用最小二乘搜索最兼容的 3D 网络层 \(k^\star\)，并用单个 3D 卷积 stitching layer 对齐 latent 与中间特征
- 支持把 Wan、Hunyuan Video、SVD、CogVideoX 等视频 VAE 与 AnySplat、VGGT、MVDUSt3R 等 3D 重建模型组合
- 使用 LoRA 微调 stitching layer 之后的 3D 模块，使 stitched VAE 复现原 3D 模型输出
- 用 direct reward finetuning 将生成模型与 stitched decoder 对齐，奖励包含多视角图像质量、3D 表示质量和 decoded/rendered 一致性
- 输出可以是 3D Gaussian Splatting 或 point map，目标是从文本直接生成可渲染的 3D 场景

#### 🔬 深入细节

##### 核心示意图

![VIST3A 方法框架](https://gohyojun15.github.io/VIST3A/method_figure.png)
*图：VIST3A 先通过 model stitching 构造 3D VAE，再通过直接奖励微调让文本到视频生成器输出 3D 可解码 latent。*

##### 算法伪代码

```python
# VIST3A: stitching + direct reward finetuning
video_vae_encoder = E
video_vae_decoder = D_rgb
three_d_model = F_1_to_l

# 1. Find stitching layer
for k in candidate_layers:
    B = E(multiview_images)              # video VAE latent
    A_k = F_1_to_k(multiview_images)     # 3D model activation
    S_k = least_squares(B, A_k)
    mse[k] = ||B @ S_k - A_k||_F ** 2
k_star = argmin(mse)
D_3d = F_(k_star+1)_to_l ∘ S_k_star

# 2. Self-supervised stitched VAE finetuning
for batch in multiview_data:
    target = three_d_model(batch.images)
    pred = D_3d(E(batch.images))
    loss_stitch = weighted_l1(pred, target)
    update_lora(D_3d, loss_stitch)

# 3. Align generator with 3D decoder
for prompt in prompts:
    z0 = video_generator.denoise(noise, prompt)
    mv_images = D_rgb(z0)
    scene_3d = D_3d(z0)
    reward = quality(mv_images, prompt) + quality(render(scene_3d), prompt)
    reward += consistency(mv_images, render(scene_3d))
    loss = generative_loss(prompt) - lambda_reward * reward
    update_lora(video_generator, loss)
```

##### 方法解读

VIST3A 关注的是 latent diffusion 式 3D 生成中的 decoder 瓶颈。许多方法会把文本到视频/多视角生成器微调成输出多视角 latent，然后再训练一个从 latent 到 3DGS 或 point map 的 decoder。但 3D decoder 从头训练需要大量带 3D 监督的数据，而且与视频生成器分开训练时，生成出来的 latent 未必落在 decoder 熟悉的分布上。

模型缝合的假设是：视频 VAE latent 和某些 feed-forward 3D 模型中间层虽然来自不同预训练任务，但都编码了视角一致的空间信息，因此可能存在近似线性映射。VIST3A 对每个候选层 \(k\) 解一个最小二乘问题：

$$S_k^\star = \arg\min_S \| B S - A_k \|_F^2$$

其中 \(B\) 是视频 VAE encoder 的 latent，\(A_k\) 是 3D 模型第 \(k\) 层激活。选择误差最小的 \(k^\star\) 后，丢弃 3D 模型前半段，把 \(\mathcal{E}\)、\(S_{k^\star}\) 和 \(F_{k^\star+1:l}\) 拼起来：

$$\mathcal{M}_{\text{stitched}} = F_{k^\star+1:l} \circ S_{k^\star} \circ \mathcal{E}$$

这一步的直觉很直接：视频 VAE encoder 负责把多视角视频压缩成 latent，3D 网络后半段负责把兼容特征解码成 3D 输出。只要 stitching layer 把两个空间对齐，后半段的 3D 知识就能被复用。

第二个关键是 direct reward finetuning。仅用多视角重建损失微调视频生成器，会鼓励它生成像视频的 latent，但不保证这些 latent 能被 stitched 3D decoder 稳定解释。VIST3A 因此在 denoising 轨迹末端计算 3D 相关奖励：

$$\mathcal{L} = \mathcal{L}_{\text{gen}} - \lambda r(z_0, c)$$

奖励由三部分组成：视频 decoder 输出的多视角图像质量、3D decoder 输出渲染图的文本对齐/偏好质量，以及 decoded image 与 3D rendered image 在同视角下的 \(\ell_1\)+LPIPS 一致性。这样 reward 可以沿 denoising 过程反传，使生成模型逐渐产生更“3D 可解码”的 latent。

与传统两阶段 text-to-3D 不同，VIST3A 不是先生成视频再另行重建，而是在 latent 层把生成器和 3D decoder 合成一个端到端系统。它避免了显式中间视频的误差累积，也减少了 3D decoder 从零学习的成本；限制是 stitching 是否有效取决于两个预训练模型表示空间的兼容性，并且 direct reward tuning 仍需要较高显存和精心选择奖励权重。

#### 🧪 练习题

```yaml
question: "VIST3A 中 model stitching 的核心目的是什么？"
options:
  - "把视频模型的 RGB decoder 替换为随机初始化的 3D decoder"
  - "寻找视频 VAE latent 与 3D 重建网络中间层之间的线性兼容点，复用 3D 网络后半段作为 decoder"
  - "把所有视频帧先渲染成 NeRF，再用 SDS 优化"
  - "只用 CLIP 分数选择最好的多视角视频"
answer: 1
explain: "VIST3A 通过最小二乘寻找 stitching layer，将视频 latent 对齐到 3D 模型中间特征，从而保留预训练 3D decoder 的重建能力。"
```
