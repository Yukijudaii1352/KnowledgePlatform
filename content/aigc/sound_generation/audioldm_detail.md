### AudioLDM：文本到音频生成
```yaml
id: "audioldm"
name: "AudioLDM"
full_name: "AudioLDM: 文本到音频生成 (AudioLDM: Text-to-Audio Generation with Latent Diffusion Models)"
year: "2023"
org: "Surrey"
paper_url: "https://arxiv.org/abs/2301.12503"
category: "audio_effect"
parent: "—"
motivation: "潜在扩散+CLAP对齐音效生成"
```

#### 📝 一句话总结
AudioLDM 将 latent diffusion 引入文本到音频生成，通过 CLAP 对齐文本和音频语义，在 VAE latent 空间中生成音频，从而降低计算成本并支持多种零样本音频编辑。

#### 🎯 核心要点
- 用 VAE 将 mel-spectrogram 压缩到连续 latent 空间。
- 在 latent 空间训练条件扩散模型，而非直接在波形或频谱上扩散。
- 使用 CLAP audio embedding 训练条件生成，推理时替换为 CLAP text embedding。
- 采用 classifier-free guidance 控制文本条件强度。
- 支持 text-to-audio、audio inpainting、style transfer 和 super-resolution 等任务。
- 利用 AudioCaps、AudioSet 等音频文本或音频数据进行训练和评估。

#### 🔬 深入细节
![AudioLDM 系统总览](https://ar5iv.labs.arxiv.org/html/2301.12503/assets/x1.png)
*图：AudioLDM 的训练、文本采样、音频补全和风格迁移流程。*

```python
# AudioLDM 潜在扩散训练与采样
mel = wav_to_mel(audio)
z0 = vae_encoder(mel)
condition = clap_audio_encoder(audio)   # training condition

t = sample_timestep()
noise = normal_like(z0)
zt = sqrt(alpha_bar[t]) * z0 + sqrt(1 - alpha_bar[t]) * noise
noise_pred = unet(zt, t, condition)
loss = mse(noise_pred, noise)

# inference
condition = clap_text_encoder(prompt)
z = normal(shape)
for t in reversed(range(T)):
    eps_cond = unet(z, t, condition)
    eps_uncond = unet(z, t, null_condition)
    eps = eps_uncond + guidance_scale * (eps_cond - eps_uncond)
    z = ddim_or_ddpm_step(z, eps, t)
mel_hat = vae_decoder(z)
audio_hat = vocoder(mel_hat)
```

AudioLDM 的核心问题是：音频波形长、频谱二维结构复杂，直接扩散成本很高。它借鉴图像 LDM，将 mel-spectrogram 先压缩为 latent \(z\)，扩散模型只在低维 latent 中学习生成，最后由 VAE decoder 和 vocoder 还原音频。

扩散训练目标是预测加到 latent 上的噪声：
$$
\mathcal{L}_{LDM}=\mathbb{E}_{z_0,\epsilon,t}\left[\|\epsilon-\epsilon_\theta(z_t,t,c)\|_2^2\right]
$$
其中 \(c\) 是条件嵌入。训练时使用 CLAP audio encoder 得到音频条件，推理时使用 CLAP text encoder 得到文本条件。因为 CLAP 把文本和音频放到同一语义空间，模型可以在没有逐条文本标注的音频上学习。

Classifier-free guidance 在采样时混合有条件和无条件预测：
$$
\hat{\epsilon}=\epsilon_\theta(z_t,t,\varnothing)+s(\epsilon_\theta(z_t,t,c)-\epsilon_\theta(z_t,t,\varnothing))
$$
\(s\) 越大，生成结果越贴近文本，但过大可能牺牲自然度和多样性。

AudioLDM 的另一个价值是统一编辑任务。inpainting 可以固定未遮挡 latent，只对遮挡区域反向扩散；style transfer 可以从源音频的中间噪声状态开始，用新文本条件引导反向过程。这些能力来自扩散模型的迭代生成形式。

#### 🧪 练习题
```yaml
question: "AudioLDM 为什么可以在训练时用音频嵌入、推理时用文本嵌入作为条件？"
options:
  - "CLAP 将文本和音频映射到对齐的共享语义空间"
  - "VAE 会自动翻译文本"
  - "DDPM 不需要任何条件"
  - "vocoder 直接读取自然语言"
answer: 0
explain: "CLAP 的文本编码器和音频编码器输出处于对齐空间，因此训练的音频条件可在推理时替换为文本条件。"
```
