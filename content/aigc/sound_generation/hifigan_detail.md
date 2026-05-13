### HiFi-GAN: 高保真语音合成GAN (HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis)

```yaml
id: hifigan
name: HiFi-GAN
full_name: "HiFi-GAN: 高保真语音合成GAN (HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis)"
year: '2020'
org: Kakao
paper_url: https://proceedings.neurips.cc/paper_files/paper/2020/hash/c5d736809766d46260d816d8dbc9eb44-Abstract.html
category: vocoder
parent: —
motivation: MSD+MPD多尺度判别器声码器
```

#### 📝 一句话总结

HiFi-GAN 提出了多周期判别器（MPD）和多尺度判别器（MSD）的双判别器架构，配合生成器中的多感受野融合（MRF）模块，实现了兼具高保真度与高效率的神经网络声码器，在单 V100 GPU 上以 167.9 倍实时速度合成接近人类质量的 22.05 kHz 语音。

#### 🎯 核心要点

- **双判别器架构**：同时使用多周期判别器（MPD）和多尺度判别器（MSD），分别捕获音频的周期性模式和连续性模式
- **多周期判别器（MPD）**：由 5 个子判别器组成，分别以素数周期 \([2, 3, 5, 7, 11]\) 对 1D 波形重塑为 2D 后用 2D 卷积判别，捕获不同周期的隐式结构
- **多尺度判别器（MSD）**：沿用 MelGAN 架构，3 个子判别器分别在原始音频、×2 和 ×4 平均池化音频上操作，捕获长程依赖
- **多感受野融合（MRF）模块**：生成器中每个转置卷积后接 MRF 模块，并行使用不同核大小和膨胀率的残差块，融合多尺度特征
- **三重损失函数**：LSGAN 对抗损失 + 特征匹配损失（\(\lambda_{fm}=2\)）+ Mel 频谱图 L1 损失（\(\lambda_{mel}=45\)）
- **三种模型配置**：V1（最大/最高质量）、V2（中等）、V3（最小，仅 0.92M 参数），在质量与效率间灵活权衡
- **泛化能力**：在未见说话人的 mel 频谱图反演和端到端语音合成中均表现出良好的泛化性

#### 🔬 深入细节

##### 核心架构总览

![HiFi-GAN 生成器架构](https://ar5iv.labs.arxiv.org/html/2010.05646/assets/x1.png)
*图 1：HiFi-GAN 生成器架构。生成器通过转置卷积将 mel 频谱图逐步上采样至原始波形的时间分辨率，每个转置卷积后接一个 MRF 模块。MRF 模块将多个不同核大小和膨胀率的残差块输出相加。*

![HiFi-GAN 判别器架构](https://ar5iv.labs.arxiv.org/html/2010.05646/assets/x2.png)
*图 2：(a) MSD 的第二个子判别器；(b) MPD 中周期为 3 的子判别器。MPD 将 1D 音频重塑为 2D 数据后使用 2D 卷积处理。*

##### 算法伪代码

```python
# HiFi-GAN 训练伪代码
# 初始化: Generator G, MPD D_mpd (5个子判别器), MSD D_msd (3个子判别器)

for epoch in range(num_epochs):
    for mel_spec, ground_truth_audio in dataloader:
        # ---- 生成器前向 ----
        fake_audio = G(mel_spec)  # mel → 转置卷积上采样 + MRF → 波形

        # ---- 判别器训练 ----
        # MPD: 对每个周期 p ∈ [2,3,5,7,11]
        for p, D_p in zip([2,3,5,7,11], D_mpd):
            real_2d = reshape(ground_truth_audio, period=p)  # [B,1,T] → [B,1,T/p,p]
            fake_2d = reshape(fake_audio, period=p)
            loss_D_p = (D_p(real_2d) - 1)^2 + D_p(fake_2d)^2  # LSGAN

        # MSD: 对每个尺度 s ∈ [1x, 2x_pool, 4x_pool]
        for s, D_s in zip(scales, D_msd):
            real_s = avg_pool(ground_truth_audio, factor=s)
            fake_s = avg_pool(fake_audio, factor=s)
            loss_D_s = (D_s(real_s) - 1)^2 + D_s(fake_s)^2

        loss_D = sum(loss_D_p) + sum(loss_D_s)
        optimizer_D.step(loss_D)

        # ---- 生成器训练 ----
        loss_adv = sum((D_p(fake) - 1)^2) + sum((D_s(fake) - 1)^2)
        loss_fm  = sum(L1(D_i_features(real), D_i_features(fake)))  # 各层特征匹配
        loss_mel = L1(mel_transform(fake_audio), mel_spec)
        loss_G = loss_adv + 2 * loss_fm + 45 * loss_mel
        optimizer_G.step(loss_G)
```

##### 动机与背景

传统神经网络声码器面临**质量与效率的两难困境**：

- **自回归模型**（WaveNet）：逐样本生成，质量高但速度极慢（每次前向仅产生一个采样点）
- **基于流的模型**（WaveGlow）：并行生成速度快，但需要超过 90 层的深层架构，参数量巨大
- **早期 GAN 模型**（MelGAN、Parallel WaveGAN）：效率高、参数少，但音频质量与自回归/流模型仍有差距

HiFi-GAN 的核心洞察是：**语音信号由多种周期的正弦信号叠加而成，建模这些周期性模式是生成高保真音频的关键**。此前的 GAN 声码器未充分利用这一先验知识。

##### 生成器：转置卷积 + 多感受野融合（MRF）

生成器是一个全卷积网络，输入 mel 频谱图（80 维），通过多级转置卷积逐步上采样至原始波形的时间分辨率（256 倍上采样率，对应 hop size）。

**MRF 模块**是生成器的核心创新。每个转置卷积层后接一个 MRF 模块，其结构为：

$$
\text{MRF}(x) = \sum_{n=1}^{|k_r|} \text{ResBlock}_{n}(x)
$$

其中每个残差块使用不同的核大小 \(k_r[n]\) 和膨胀率序列 \(D_r[n]\)，形成不同的感受野模式。这种设计让网络能**并行观察不同时间尺度的模式**——短核捕获局部细节（如音素边界），长核捕获全局结构（如基频包络）。

> 💡 **关键直觉**：MRF 的"求和融合"而非"拼接"设计，使得不同感受野的特征在同一表示空间中直接叠加，避免了通道维度膨胀，同时保持了计算效率。

生成器提供了可调参数：隐藏维度 \(h_u\)、转置卷积核大小 \(k_u\)、残差块核大小 \(k_r\) 和膨胀率 \(D_r\)，从而支持三种配置（V1/V2/V3）在质量与效率间灵活权衡。

##### 多周期判别器（MPD）：捕获周期性模式

MPD 是 HiFi-GAN 最核心的创新。它由 5 个子判别器组成，每个子判别器仅处理输入音频中**等间隔采样**的部分，间隔即为周期 \(p\)。

**工作原理**：
1. 将 1D 音频信号（长度 \(T\)）重塑为 2D 数据（高度 \(T/p\)，宽度 \(p\)）
2. 对 2D 数据施加 2D 卷积，且**宽度方向核大小限制为 1**，确保不同周期位置的样本独立处理
3. 使用步长卷积 + LeakyReLU 堆叠，逐层提取特征

**周期选择为素数 \([2, 3, 5, 7, 11]\)**，这是为了**最大程度减少不同子判别器之间的采样重叠**。例如，周期 2 和周期 3 的子判别器观察的样本子集几乎不重合，从而确保每个子判别器学习到独特的周期性模式。

> ⚠️ **注意**：通过重塑（reshape）而非直接下采样来提取周期信号，使得 MPD 的梯度可以传递到输入音频的**所有时间步**，避免了信息丢失。

权重归一化（Weight Normalization）应用于 MPD 的所有子判别器。

##### 多尺度判别器（MSD）：捕获连续性模式

由于 MPD 的每个子判别器仅处理**不相交的采样子集**，它可能遗漏相邻样本之间的连续性模式。MSD 正是为了弥补这一不足。

MSD 沿用 MelGAN 的设计，包含 3 个子判别器，分别在不同尺度上操作：
- 子判别器 1：原始波形（应用谱归一化而非权重归一化，以稳定训练）
- 子判别器 2：×2 平均池化后的波形
- 子判别器 3：×4 平均池化后的波形

每个子判别器是步长卷积 + 分组卷积 + LeakyReLU 的堆叠。

> 💡 **MPD 与 MSD 的互补关系**：MPD 在原始波形上操作，关注离散的周期性模式；MSD 在平滑后的波形上操作，关注连续的时间依赖。两者结合，全面覆盖了语音信号的频率和时间特征。

##### 损失函数设计

HiFi-GAN 的训练使用三个损失函数的组合：

**1. LSGAN 对抗损失**

采用最小二乘 GAN（LSGAN）替代原始 GAN 的二元交叉熵，提供非消失梯度流：

$$
\mathcal{L}_{Adv}(D;G) = \mathbb{E}_{(x,s)}\Big[(D(x)-1)^2 + (D(G(s)))^2\Big]
$$

$$
\mathcal{L}_{Adv}(G;D) = \mathbb{E}_{s}\Big[(D(G(s))-1)^2\Big]
$$

**2. Mel 频谱图损失**

生成波形与真实波形的 mel 频谱图之间的 L1 距离，既加速训练收敛，又聚焦于人耳感知质量：

$$
\mathcal{L}_{Mel}(G) = \mathbb{E}_{(x,s)}\Big[||\phi(x) - \phi(G(s))||_1\Big]
$$

其中 \(\phi\) 为 mel 频谱图变换函数。

**3. 特征匹配损失**

提取判别器每一中间层的特征，计算真实样本与生成样本在各层特征空间中的 L1 距离：

$$
\mathcal{L}_{FM}(G;D) = \mathbb{E}_{(x,s)}\Big[\sum_{i=1}^{T}\frac{1}{N_i}||D^i(x) - D^i(G(s))||_1\Big]
$$

**最终损失**：

$$
\mathcal{L}_G = \mathcal{L}_{Adv}(G;D) + 2\,\mathcal{L}_{FM}(G;D) + 45\,\mathcal{L}_{Mel}(G)
$$

$$
\mathcal{L}_D = \mathcal{L}_{Adv}(D;G)
$$

> 💡 **Mel 损失权重高达 45**，远大于特征匹配损失权重 2，说明在训练早期 mel 频谱图重建是主导信号，确保生成器首先学会正确的频谱结构，再通过对抗训练精炼细节。

##### 与传统方法的对比

| 方法 | 类型 | 质量 (MOS) | 速度 | 参数量 |
|------|------|-----------|------|--------|
| WaveNet | 自回归 | 高 | 极慢（逐样本） | 中等 |
| WaveGlow | 基于流 | 高 | 快 | 巨大（>90层） |
| MelGAN | GAN | 中等 | 极快（CPU实时） | 小 |
| HiFi-GAN V1 | GAN | **最高**（≈人类） | 167.9× 实时 (V100) | 13.92M |
| HiFi-GAN V3 | GAN | 高 | 13.4× 实时 (CPU) | **0.92M** |

HiFi-GAN 的核心突破在于：**首次在 GAN 声码器中达到甚至超越自回归和流模型的音频质量，同时保持了 GAN 的高效率优势**。这主要归功于 MPD 对周期性模式的精确建模能力。

#### 🧪 练习题

```yaml
question: "HiFi-GAN 的多周期判别器（MPD）选择周期为 [2, 3, 5, 7, 11] 的主要原因是什么？"
options:
  - "这些数字对应语音中最常见的基频周期"
  - "素数周期使不同子判别器的采样子集重叠最小化"
  - "这些周期恰好覆盖了 mel 频谱图的 80 个频带"
  - "素数分解可以加速 FFT 计算"
answer: 1
explain: "选择素数作为周期是为了最大程度减少不同子判别器之间采样位置的重叠，确保每个子判别器观察到尽可能独特的周期性模式，从而提升判别器整体的覆盖能力。"
```