### GANSynth

```yaml
id: gansynth
name: GANSynth
full_name: "对抗音频合成 (GANSynth)"
year: "2019"
org: "Google Magenta"
paper_url: "https://arxiv.org/abs/1902.08710"
category: "early_neural"
parent: "nsynth"
motivation: "基于GAN的频谱生成实现高质量乐器音色合成"
```

#### 📝 一句话总结

GANSynth 提出在高频率分辨率的时频表示上用 GAN 生成乐器单音，并用 log magnitude 加 instantaneous frequency 表示相位变化，解决波形 GAN 难以保持局部相干和 WaveNet 采样过慢的问题。它证明了对抗生成模型也能合成高质量、可潜空间插值的神经乐器音色。

#### 🎯 核心要点

- **频谱域 GAN 合成**：不直接生成波形，而是生成 STFT/CQT 风格的频谱表示，再逆变换回音频
- **instantaneous frequency 表示**：用相位差/瞬时频率代替原始 wrapped phase，缓解帧边界相位不连续问题
- **高频率分辨率**：提高频率轴分辨率，使谐波结构和音高更容易被卷积 GAN 捕获
- **Progressive GAN 架构**：借鉴图像生成中的渐进式训练，从低分辨率到高分辨率稳定生成
- **音高条件生成**：输入 latent vector \(z\) 与 pitch one-hot，生成指定音高的 NSynth 乐器音色
- **快速并行采样**：相比 WaveNet 逐采样点自回归，GANSynth 一次前向即可生成完整音频片段
- **全局潜空间控制**：latent vector 控制整体音色，可进行球面插值生成连续音色变化

#### 🔬 深入细节

##### 核心示意图/框架图

![GANSynth 相位与瞬时频率动机图](https://ar5iv.labs.arxiv.org/html/1902.08710/assets/GANSynth_figs_motivation.png)
*图：帧级音频表示中的相位对齐问题。论文用 instantaneous frequency 表示相邻帧相位变化，使生成模型更容易保持局部波形相干。*

##### 算法伪代码

```python
# GANSynth 训练与合成核心流程

def audio_to_if_spectrogram(x):
    stft = STFT(x, window_size=2048, hop=256)
    log_mag = log(abs(stft) + eps)
    phase = angle(stft)
    inst_freq = unwrap(phase[:, 1:] - phase[:, :-1]) / hop
    return concat(log_mag, inst_freq)

for audio, pitch in nsynth_dataset:
    real_spec = audio_to_if_spectrogram(audio)
    z = sample_normal([batch, latent_dim])
    y = one_hot(pitch)

    fake_spec = generator(z, y)
    d_loss = discriminator_loss(D(real_spec, y), D(fake_spec.detach(), y))
    update(D, d_loss)

    g_loss = generator_loss(D(fake_spec, y))
    update(G, g_loss)

# 推理
z = sample_or_interpolate_latent()
spec = generator(z, one_hot(target_pitch))
audio = inverse_spectrogram(log_mag=spec.mag, inst_freq=spec.ifreq)
```

##### 方法解读

GANSynth 关注的是自回归音频模型的效率瓶颈。WaveNet 能产生高质量波形，但每个采样点都要依赖前一步，合成一段 4 秒音频需要大量串行步骤。GAN 可以并行生成整段样本，但直接在波形上做卷积生成很难保持周期信号的相位连续性，常出现噪声、拍频和不稳定谐波。

论文的关键观察是：乐器单音的感知质量高度依赖局部周期结构，而 STFT 帧与真实基频周期通常不对齐。如果模型直接生成 wrapped phase，相位在 \(2\pi\) 边界处跳变，学习目标不连续。GANSynth 改用 instantaneous frequency：

$$
\omega_{t} = \mathrm{unwrap}(\phi_t-\phi_{t-1})
$$

其中 \(\phi_t\) 是相邻频谱帧的相位。这个量描述相位随时间的变化率，比绝对相位更平滑，也更贴近“某个频率分量正在以什么速度振荡”。生成后再从瞬时频率积分恢复相位，与 log magnitude 一起逆 STFT 得到波形。

GANSynth 的生成器输入包括随机潜变量 \(z\) 和 pitch 条件 \(y\)。\(z\) 负责音色、演奏动态、谐波质感等全局属性，\(y\) 约束目标音高。训练目标是标准对抗学习：

$$
\min_G \max_D\ \mathbb{E}_{x\sim p_{data}}\log D(x,y)+
\mathbb{E}_{z\sim p(z)}\log(1-D(G(z,y),y))
$$

实际架构采用 progressive growing，使生成器和判别器先学习低分辨率结构，再逐步加入高分辨率细节。由于 NSynth 的样本是固定长度单音，这种图像式生成范式比长篇音乐更容易成立。

> 💡 关键：GANSynth 不是简单把谱图当图片生成；它的核心是选择对音频相位更友好的表示，使卷积 GAN 可以学到局部相干的周期结构。

##### 训练与推理流程

训练时先把真实音频转换为 log magnitude + instantaneous frequency 的双通道表示。判别器判断频谱表示是否来自真实数据，生成器学习欺骗判别器。推理时不需要自回归循环，只需采样一个 \(z\)，指定 pitch，一次生成完整频谱，再通过相位重建和逆变换得到音频。潜变量还支持球面插值：

$$
z(\alpha)=\mathrm{slerp}(z_1,z_2,\alpha)
$$

这样合成的音色会从一种乐器质感平滑过渡到另一种，而不是像波形线性混合那样只做响度交叉淡入淡出。

##### 与 NSynth/WaveNet 的区别

NSynth 的 WaveNet autoencoder 有显式编码器，适合分析真实音频并插值重建，但解码仍慢；GANSynth 没有编码器，直接从全局 latent vector 采样，速度快很多。WaveNet 在波形域直接建模，局部细节强但全局潜空间不自然；GANSynth 在频谱域建模，牺牲部分端到端纯波形原则，换取并行生成和可控潜空间。它更适合单音/音色合成，不直接解决长时曲式结构生成问题。

#### 🧪 练习题

```yaml
question: "GANSynth 为什么用 instantaneous frequency 而不是直接生成原始相位？"
options:
  - "因为 instantaneous frequency 可以完全跳过逆 STFT"
  - "因为相位在 2π 边界有不连续跳变，而相邻帧相位差更平滑、更利于保持局部周期相干"
  - "因为它能把所有音频变成 MIDI 符号"
  - "因为 GAN 不能处理幅度谱"
answer: 1
explain: "原始 wrapped phase 对学习器不友好，边界跳变会破坏连续性；instantaneous frequency 表示相位变化率，更平滑，便于生成相干谐波结构。"
```
