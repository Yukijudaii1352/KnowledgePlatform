### VITS：条件变分自编码器端到端 TTS
```yaml
id: "vits"
name: "VITS"
full_name: "VITS: 条件变分自编码器端到端TTS (Conditional Variational Autoencoder with Adversarial Learning for End-to-End TTS)"
year: "2021"
org: "Kakao"
paper_url: "https://proceedings.mlr.press/v139/kim21f.html"
category: "tts"
parent: "fastspeech2"
motivation: "VAE+Flow+GAN端到端合成"
```

#### 📝 一句话总结
VITS 将文本编码器、随机时长预测、normalizing flow、HiFi-GAN 式解码器统一到条件 VAE 框架中，实现从文本到波形的并行端到端 TTS。

#### 🎯 核心要点
- 用条件 VAE 连接文本先验、语音后验和 waveform decoder。
- Posterior encoder 从线性谱提取潜变量 \(z\)，prior encoder 从文本生成先验分布。
- Normalizing flow 提升文本条件先验的表达能力，使其更贴近后验。
- 使用 Monotonic Alignment Search 在文本 token 和语音帧之间寻找单调对齐。
- Stochastic Duration Predictor 建模一段文本可有多种节奏的 one-to-many 关系。
- Decoder 采用对抗学习和重建损失，直接生成波形而非 mel 中间结果。

#### 🔬 深入细节
![VITS 训练流程](https://ar5iv.labs.arxiv.org/html/2106.06103/assets/x1.png)
![VITS 推理流程](https://ar5iv.labs.arxiv.org/html/2106.06103/assets/x2.png)
*图：VITS 的训练与推理流程，包含 posterior encoder、flow、text prior、duration predictor 和 waveform decoder。*

```python
# VITS 核心训练流程
x = text_to_phonemes(text)
y = waveform
spec = linear_spectrogram(y)

z_post, q_params = posterior_encoder(spec)
prior_params = text_encoder(x)
alignment = monotonic_alignment_search(z_post, prior_params)
z_flow = flow(z_post, condition=x, alignment=alignment)

duration_loss = stochastic_duration_predictor.loss(x, alignment)
kl_loss = kl_divergence(z_flow, prior_params, alignment)
wave_hat = decoder(z_post)
recon_loss = l1_mel_loss(wave_hat, y)
adv_loss = gan_generator_loss(discriminator(wave_hat))
loss = recon_loss + kl_loss + duration_loss + adv_loss

# inference
prior_params = text_encoder(x)
dur = stochastic_duration_predictor.sample(x)
alignment = length_regulate(dur)
z = inverse_flow(sample(prior_params, alignment))
wave = decoder(z)
```

VITS 的动机是打破两阶段 TTS 的误差传递：mel 预测器和声码器分开训练时，声码器训练看到真实 mel，推理看到预测 mel，二者分布不一致。VITS 用潜变量 \(z\) 把文本和波形放进同一个生成模型，训练目标直接约束最终波形。

条件 VAE 的核心可以写成最大化证据下界：
$$
\log p_\theta(y \mid x) \ge \mathbb{E}_{q_\phi(z \mid y)}[\log p_\theta(y \mid z)] - D_{KL}(q_\phi(z \mid y)\|p_\theta(z \mid x))
$$
其中 \(q_\phi\) 是 posterior encoder，\(p_\theta(z \mid x)\) 是文本条件先验。flow 的作用是把简单先验变换成更灵活的分布，从而减小先验和后验之间的差距。

对齐问题由 Monotonic Alignment Search 处理。它在文本 token 与语音帧之间寻找单调路径，使每帧潜变量都能对应到一个文本 token。由于语音天然按文本顺序发音，单调约束既合理又能避免 attention 漂移。

随机时长预测器不是只回归一个确定 duration，而是学习时长分布。推理时可以采样不同 duration，从而得到不同节奏和停顿。这对应 TTS 的 one-to-many 本质：同一句文本可以用多种自然韵律朗读。

Decoder 类似 HiFi-GAN 生成器，通过 mel 重建损失保证内容和频谱结构，通过判别器损失补足高频自然度。与 FastSpeech 系列相比，VITS 不需要单独训练声码器，也不把 mel 作为必须输出的接口。

#### 🧪 练习题
```yaml
question: "VITS 中 normalizing flow 的主要作用是什么？"
options:
  - "把文本 token 转成字符"
  - "增强文本条件先验分布，使其更贴近后验潜变量分布"
  - "替代判别器计算 GAN loss"
  - "将波形下采样为 mel 频谱"
answer: 1
explain: "Flow 对先验或后验潜变量做可逆变换，提升分布表达能力，从而减小 KL 项中的先验后验差距。"
```
