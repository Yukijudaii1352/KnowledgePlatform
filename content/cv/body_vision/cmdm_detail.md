### CMDM

```yaml
id: cmdm
name: CMDM
full_name: "因果动作扩散模型 (Causal Motion Diffusion Models)"
year: "2026.02"
org: "arXiv"
paper_url: "https://arxiv.org/abs/2602.22594"
category: "motion"
parent: "mdm"
motivation: "因果扩散Transformer支持流式无尽长度生成"
```

#### 📝 一句话总结

CMDM 提出在运动-语言对齐的因果潜空间中做扩散生成，用 Causal-DiT 和逐帧噪声调度把传统全序列扩散改造成可流式、可长序列生成的自回归运动模型。

#### 🎯 核心要点

- **MAC-VAE 因果潜表示**：用因果卷积/ResNet 编码器和解码器把运动序列压缩到只依赖历史帧的潜空间
- **运动-语言语义对齐**：用 Part-TMR 类运动语言模型监督潜特征，加入局部余弦相似和距离矩阵结构一致性损失
- **Causal Diffusion Forcing**：每个潜帧使用独立噪声等级，并用因果 mask 防止未来信息泄漏
- **Causal-DiT 骨干**：结合因果自注意力、文本 cross-attention、AdaLN 时间步调制和 RoPE 长程位置编码
- **Frame-wise Sampling Schedule**：推理时让过去帧低噪声、未来帧高噪声，从部分去噪历史中预测下一帧
- **流式与长时程生成**：支持在线生成和 long-horizon motion composition，在 HumanML3D 与 SnapMoGen 上提升语义一致性和速度

#### 🔬 深入细节

![CMDM 框架图](https://arxiv.org/html/2602.22594v1/x2.png)
*图：CMDM 由 MAC-VAE、Causal-DiT 与 Causal Diffusion Forcing 组成，逐帧噪声深浅表示因果不确定性。*

```python
# CMDM 训练与流式推理伪代码
for motion, text in dataloader:
    z = MAC_VAE.encode_causal(motion)          # z_t 只能依赖 x_<=t
    e_text = text_encoder(text)
    tau = sample_independent_noise_steps(T=len(z))
    noisy_z, eps = add_noise_per_frame(z, tau)
    eps_pred = causal_dit(noisy_z, tau, e_text, causal_mask=True)
    loss_df = mse(eps_pred, eps)
    loss_align = motion_language_alignment(z, pretrained_motion_encoder(motion))
    loss_vae = reconstruction_loss(MAC_VAE.decode_causal(z), motion) + kl_loss(z)
    optimize(loss_df + loss_vae + loss_align)

cache = []
for frame_idx in stream:
    schedule = framewise_uncertainty_schedule(cache, future_noise="high")
    z_next = iterative_denoise_with_causal_context(cache, schedule, text)
    cache.append(partially_or_fully_denoised(z_next))
    yield MAC_VAE.decode_next(z_next)
```

**动机与背景。** MDM、MotionDiffuse、MLD 等扩散式文本到运动模型通常在整段序列上做双向去噪：模型可以同时看见过去和未来，离线质量高，但天然不满足实时交互、边生成边播放和无限长序列拼接。T2M-GPT、MotionGPT 等自回归模型具备因果性，却容易受 teacher forcing 暴露偏差影响，长时间滚动后误差积累。CMDM 的目标是保留扩散模型的稳定性，同时获得自回归模型的时间因果性。

**MAC-VAE：先把运动压到因果语义潜空间。** 论文没有直接在高维关节序列上扩散，而是训练 Motion-Language-Aligned Causal VAE。编码器和解码器使用因果 1D 卷积与因果 ResNet block，使第 \(t\) 个潜变量只依赖 \(x_{\le t}\)。VAE 损失包含重建和 KL：

$$
\mathcal{L}_{\text{vae}}=\mathcal{L}_{\text{rec}}+\beta D_{\mathrm{KL}}(q(z|x)\|p(z))
$$

为了让潜空间不只是压缩运动，还能保持文本可控性，CMDM 使用预训练运动-语言模型提取语义特征，并加入两类对齐项：点对点余弦相似损失拉近对应时刻/部位的语义，距离矩阵损失保持潜特征内部的相对几何关系。直觉上，前者保证“这个动作像文本描述的动作”，后者保证“动作片段之间的语义关系也像预训练模型看到的关系”。

**Causal Diffusion Forcing：每一帧有自己的噪声时间。** 标准扩散通常给整段序列同一个时间步 \(\tau\)，训练目标近似为：

$$
\epsilon_\theta(x_\tau,\tau,c)\rightarrow \epsilon
$$

CMDM 改为给每个潜帧独立噪声 \(\tau_t\)，形成 \(\tilde z_t=\alpha_{\tau_t}z_t+\sigma_{\tau_t}\epsilon_t\)。Causal-DiT 在因果 mask 下预测每帧噪声：

$$
\mathcal{L}_{\text{cdf}}=\mathbb{E}\left[\sum_t\|\epsilon_\theta(\tilde z_{\le t},\tau_{\le t},c)_t-\epsilon_t\|_2^2\right]
$$

这相当于把“下一 token 预测”推广成“下一潜帧去噪”：当前帧只能从历史帧和文本条件中获得信息，但历史帧本身也可以是不同去噪程度的状态。

**推理流程与 FSS。** 朴素自回归扩散会等前一帧完全去噪后再生成下一帧，质量稳定但慢，而且会把单帧预测误差当作真值继续传播。Frame-wise Sampling Schedule 让过去帧保持较低不确定性、未来帧保持较高不确定性，并允许下一帧从“部分去噪的历史”中开始推断。这样一来，模型可以边滚动边修正局部过渡，降低延迟。

**与 MDM 的区别。** MDM 是全序列、双向、离线扩散；CMDM 是潜空间、因果注意力、逐帧噪声、可缓存推理。它不是简单把 Transformer mask 改成 causal，而是同时改了表示空间、训练噪声分布和采样调度。论文报告 CMDM 总参数约 114M，在 A100 上标准 AR 约 28 fps，FSS 最高约 125 fps，适合流式运动生成。

> 💡 关键：CMDM 的“因果”不只发生在 Transformer mask 上，也发生在 VAE 编码、扩散噪声设计和推理调度中；三者共同避免未来信息泄漏。

#### 🧪 练习题

```yaml
question: "CMDM 中 Frame-wise Sampling Schedule 的主要作用是什么？"
options:
  - "把运动序列转换为离散 token"
  - "让过去帧低噪声、未来帧高噪声，从部分去噪历史中低延迟预测下一帧"
  - "用 3D 渲染器把 SMPL 转成视频"
  - "用人脸关键点监督运动生成"
answer: 1
explain: "FSS 通过逐帧不确定性安排减少完整自回归扩散的等待成本，并缓解长序列中的误差积累。"
```
