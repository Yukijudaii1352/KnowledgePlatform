### DiffRhythm

```yaml
id: diffrhythm
name: DiffRhythm
full_name: "DiffRhythm: Blazingly Fast and Embarrassingly Simple End-to-End Full-Length Song Generation with Latent Diffusion"
year: 2025
org: Zhejiang University
paper_url: "https://arxiv.org/abs/2503.01183"
category: end_to_end
parent: musicldm
motivation: "首个全扩散架构的端到端歌曲生成模型，可在10秒内生成4分45秒立体声歌曲（含人声与伴奏），通过VAE+DiT+句级歌词对齐实现高效全长歌曲生成"
```

#### 📝 一句话总结

DiffRhythm 提出了首个完全基于扩散模型的端到端歌曲生成框架，通过 VAE 压缩音频至紧凑连续潜空间、DiT（基于 LLaMA 解码层）进行条件流匹配生成、以及句级歌词对齐机制，实现了在 10 秒内生成 4 分 45 秒 44.1kHz 立体声完整歌曲，推理速度比自回归方法快约 50 倍。

#### 🎯 核心要点

- **全扩散架构**：首个不依赖语言模型的端到端歌曲生成模型，采用 VAE + DiT 两阶段连续潜空间建模，避免了自回归模型的累积误差和高计算开销
- **高效 VAE**：基于 Stable Audio 2 的全卷积 VAE（157M 参数），将 44.1kHz 立体声音频以 2048 倍下采样压缩为 21.5Hz、64 维潜表示；支持有损到无损（MP3→FLAC）重建
- **DiT 骨干**：1.1B 参数，采用 16 层 LLaMA 解码层（2048 维隐藏层、32 头注意力），利用 FlashAttention2 和梯度检查点支持长序列；兼容 Unsloth/Liger-Kernel 加速库实现 25%+ 训练加速
- **条件流匹配（CFM）训练**：采用 logit-normal 时间步采样分布，使训练聚焦于中间困难区域；Euler ODE 求解器 32 步推理，CFG scale=4
- **句级歌词对齐**：仅需句子起始时间戳，通过 G2P 转换后将音素序列放置到对应潜帧位置，解决歌曲中人声不连续和伴奏干扰导致的对齐难题
- **两阶段训练**：先以 \(L_{max}=2048\)（≈95s）训练基础模型，再微调至 \(L_{max}=6144\)（≈4m45s）实现全长生成
- **RTF ≈ 0.034**：4m45s 歌曲仅需约 10 秒生成，比 SongLM 快约 50 倍
- **数据集**：约 100 万首歌曲（6 万小时），中英文歌曲比例 3:6:1

#### 🔬 深入细节

![DiffRhythm 模型架构图](https://arxiv.org/html/2503.01183v1/x1.png)
*图 1：DiffRhythm 整体架构。左侧为 VAE 编解码器，右侧为 DiT 条件生成流程，输入包括风格提示、时间步嵌入和歌词音素序列*

![数据预处理流程](https://arxiv.org/html/2503.01183v1/x2.png)
*图 2：DiffRhythm 数据预处理流程。歌词经 G2P 转换后按时间戳放置到对应潜帧位置*

##### 算法伪代码

```python
# DiffRhythm 训练与推理流程

# === 阶段一：VAE 训练 ===
# 冻结编码器，训练解码器 2.5M 步
for batch in lossless_data:
    y_input = random_mp3_compress(y, prob=2/3)  # 2/3概率MP3压缩
    z = Encoder(y_input)           # 编码到潜空间 z ∈ R^{L×64}
    y_hat = Decoder(z)             # 解码重建
    loss = STFT_loss(y_hat, y) + adversarial_loss(y_hat, y)
    optimizer.step(loss)

# === 阶段二：DiT 训练（条件流匹配） ===
for batch in song_data:
    z1 = VAE_Encoder(y)                    # 目标潜表示
    z0 = torch.randn_like(z1)             # 噪声采样
    u = Normal(m, s).sample()             # logit-normal 采样
    t = sigmoid(u)                         # 时间步 t ∈ (0,1)
    zt = (1-t)*z0 + t*z1                  # 线性插值
    
    # 条件特征
    style = LSTM(style_prompt)[-1]         # 风格全局向量
    cond = style + timestep_embed(t)       # 全局条件
    phones = PhoneEmbed(lyrics_aligned)    # 句级对齐音素嵌入
    input = concat([zt, cond, phones], dim=-1)
    
    v_pred = DiT(input)                    # 预测速度场
    loss = ||v_pred - (z1 - z0)||²
    optimizer.step(loss)

# === 推理 ===
z = torch.randn(1, L_max, 64)            # 初始噪声
for step in euler_steps(32):               # 32步Euler ODE
    v = DiT(z, t, style, lyrics)          # CFG: w=4
    z = z + dt * v
y = VAE_Decoder(z)                         # 解码为波形
```

##### 动机与背景

现有歌曲生成方法主要面临三大挑战：

1. **多阶段级联复杂性**：Melodist、MelodyLM 等方法采用先生成人声再生成伴奏的两阶段流程，导致系统复杂且人声-伴奏协调性差
2. **自回归模型的固有缺陷**：SongCreator、SongEditor 等基于语言模型的方法虽能同时生成人声和伴奏，但自回归解码带来巨大计算开销，且难以维持长序列的风格和节奏一致性
3. **歌词对齐困难**：歌曲中人声片段被大段纯乐器间奏分隔，传统 TTS 的交叉注意力或特征拼接方法在歌曲场景下无法实现可理解的人声

DiffRhythm 通过全扩散架构一次性解决上述问题：非自回归的 DiT 天然支持全局建模，连续潜空间比离散 codec token 保留更丰富的音乐细节和人声细微差别。

##### 核心机制详解

**1. VAE：高保真音频压缩与有损修复**

VAE 采用 Stable Audio 2 的全卷积编解码器架构，将 44.1kHz 立体声波形 \(y \in \mathbb{R}^{T \times 2}\) 压缩为 \(z \in \mathbb{R}^{L \times 64}\)，压缩因子 \(f = 2048\)（即 21.5Hz 帧率）。

训练损失包含三部分：
- **多分辨率 STFT 损失**：在 Mid/Side 分解和左/右声道两个域计算，后者权重为前者的 0.5 倍
- **对抗损失**：使用参数量约为原版 4 倍的卷积判别器，增强高频细节捕获能力
- **有损到无损重建**：训练时以 2/3 概率对输入施加随机 VBR（0-7）的 MP3 压缩，重建目标始终为无损 FLAC 数据

> 💡 关键：这种有损到无损的数据增强策略使 VAE 具备了音频修复能力——即使输入为 MP3 压缩音频，也能恢复高频成分和中频频谱连续性。

实验结果（Table 1）显示，DiffRhythm VAE 在无损重建场景下 STOI 达 0.646、PESQ 达 2.235，分别比 Stable Audio 2 VAE 提升 3.8% 和 12.3%；在有损输入场景下仍保持稳健性能（STOI=0.639, PESQ=2.191），而基线模型完全无法处理此场景。

**2. DiT：基于 LLaMA 的条件流匹配生成**

DiT 以三种条件特征为输入：
- **风格提示**：随机截取的短音频片段经 LSTM 编码，取最终隐状态作为全局风格向量，与时间步嵌入相加形成全局条件
- **歌词音素**：经 G2P 转换和句级对齐后的音素 token 通过嵌入层得到连续表示
- **噪声潜表示**：加噪后的潜变量

三者沿通道维度拼接后输入 DiT。模型采用条件流匹配（CFM）范式训练：

$$\mathcal{L} = \mathbb{E}_{t \sim \pi_{\text{ln}}, z_t \sim p_t(z_t)} \left[ \| v_\theta(z_t, t, c) - (z_1 - z_0) \|_2^2 \right]$$

其中时间步采样遵循 logit-normal 分布：

$$\pi_{\text{ln}}(t; m, s) = \frac{1}{s\sqrt{2\pi}} \frac{1}{t(1-t)} \exp\left(-\frac{(\text{logit}(t) - m)^2}{2s^2}\right)$$

> 💡 关键：logit-normal 采样使训练集中于中间时间步（预测最困难的区域），参数 \(m\) 和 \(s\) 分别控制偏向数据/噪声端和集中程度。

DiT 骨干选择 LLaMA 解码层而非原版 DiT 的设计，关键优势在于可直接利用 NLP 社区的加速库（Unsloth、Liger-Kernel）通过算子融合实现 25%+ 的训练/推理加速，无需任何性能损失。

推理时使用 20% 独立 dropout 的分类器无关引导（CFG），引导尺度为 4，Euler ODE 求解器 32 步完成去噪。

**3. 句级歌词对齐：简洁高效的语义对应**

这是 DiffRhythm 的关键创新之一。传统 TTS 的对齐方法（交叉注意力、直接拼接）在歌曲生成中失败，原因在于：
- 人声片段被长段纯乐器间奏分隔，形成时间不连续性
- 同一歌词在不同歌曲中有不同伴奏，增加对齐难度

DiffRhythm 的解决方案极为简洁：

1. 将每句歌词 \(s_i\) 通过 G2P 转换为音素序列 \(\mathbf{p}_i \in \mathcal{V}^{L_i}\)
2. 初始化与潜表示等长的全 pad 序列 \(\mathbf{P} = [\langle\text{pad}\rangle]^{L_{max}}\)
3. 根据句子起始时间戳 \(t_i^{start}\) 计算对应帧位置 \(f_i^{start} = \lfloor t_i^{start} \cdot F_s \rfloor\)
4. 将音素序列覆写到对应位置：\(\mathbf{P}[f_i^{start} : f_i^{start} + L_i] = \mathbf{p}_i\)

> ⚠️ 注意：消融实验证明句级对齐至关重要——移除后人声可理解性完全崩溃（PER 无法测量），但基本音乐结构仍保留，说明该机制专门解决语义对应问题。

##### 与传统方法的对比

| 特性 | Melodist / MelodyLM | SongCreator / SongEditor | **DiffRhythm** |
|------|---------------------|--------------------------|----------------|
| 架构 | 自回归 LM（两阶段） | 自回归 LM（同时生成） | **全扩散（VAE+DiT）** |
| 生成方式 | 先人声后伴奏 | 同时生成 | **同时生成** |
| 最大时长 | ~120s | ~120s | **285s (4m45s)** |
| RTF | ~1.7 | - | **~0.034** |
| 表示空间 | 离散 codec token | 离散 codec token | **连续 VAE 潜空间** |
| 歌词对齐 | 音乐乐谱/文本描述 | 复杂对齐机制 | **句级时间戳对齐** |
| 数据需求 | 需要乐谱/分离人声 | 需要分离人声 | **仅需歌词+句起始时间戳** |

DiffRhythm-base（95s）在 PER 上达 17.47%，比 SongLM 的 21.35% 降低 18.2%，同时质量 MOS（4.19）和可理解性 MOS（3.80）均优于 SongLM（4.06 / 3.44）。SongLM 在 FAD（1.92 vs 2.11）和音乐性 MOS（4.27 vs 4.14）上略优，表明长期声学一致性和旋律表达仍有提升空间。

#### 🧪 练习题

```yaml
question: "DiffRhythm 中句级歌词对齐机制的核心设计是什么？"
options:
  - "使用交叉注意力机制让 DiT 关注歌词 token"
  - "将音素序列按句子起始时间戳放置到对应的潜空间帧位置"
  - "训练一个独立的对齐预测网络估计每个音素的持续时间"
  - "利用 CTC 损失函数实现端到端的软对齐学习"
answer: 1
explain: "DiffRhythm 仅需句子起始时间戳，通过 G2P 转换后将音素序列覆写到潜表示对应帧位置，用 pad 填充无人声区域，以极简方式解决歌曲中人声不连续的对齐难题。"
```