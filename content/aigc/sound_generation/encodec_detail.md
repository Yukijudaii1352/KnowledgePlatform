### EnCodec: 高保真神经音频压缩 (EnCodec: High Fidelity Neural Audio Compression)

```yaml
id: encodec
name: EnCodec
full_name: "EnCodec: 高保真神经音频压缩 (EnCodec: High Fidelity Neural Audio Compression)"
year: '2022'
org: Meta AI
paper_url: https://arxiv.org/abs/2210.13438
category: neural_codec
parent: soundstream
motivation: 端到端神经音频编解码器,RVQ+语言模型熵编码,1.5-24kbps实时流式压缩
```

#### 📝 一句话总结

EnCodec 提出了一种基于编码器-解码器架构 + 残差向量量化（RVQ）+ 语言模型熵编码的实时流式神经音频编解码器，在 1.5~24 kbps 的极低比特率下实现了超越传统编解码器（Opus、EVS）和同期神经编解码器（Lyra-v2）的音频压缩质量，同时引入了多尺度 STFT 判别器和梯度级别的损失平衡器两项关键技术创新。

#### 🎯 核心要点

- **端到端编码器-解码器架构**：采用 SEANet 骨干的全卷积 Encoder-Decoder 结构，通过 4 层步幅卷积（stride=2,4,5,8）实现 320× 时间降采样，将 24kHz 音频压缩至 75 帧/秒的潜在表示
- **残差向量量化（RVQ）**：使用级联多层码本（每层 1024 个码字 = 10 bits），通过选择不同数量的量化层（\(N_q = 2 \sim 32\)）实现可变比特率（1.5/3/6/12/24 kbps），单一模型支持多带宽
- **语言模型熵编码**：训练小型 Transformer 语言模型估计离散编码的概率分布，结合 range coder 实现无损熵编码，进一步压缩带宽约 25-40%
- **多尺度 STFT 判别器（MS-STFTD）**：基于复数 STFT 的多尺度判别器，替代传统 MSD+MPD 组合，在更少参数下达到同等或更优感知质量
- **损失平衡器（Loss Balancer）**：梯度级别的损失平衡机制，通过控制每个损失项对总梯度的贡献比例（而非简单加权标量损失），稳定多目标训练
- **流式与非流式双模式**：流式模式使用因果卷积，单帧延迟仅 13.3ms，支持单核 CPU 实时编解码
- **双采样率配置**：支持 24kHz 单声道（1.5-24 kbps）和 48kHz 立体声（3-24 kbps）两种配置

#### 🔬 深入细节

##### 核心架构总览

![EnCodec 整体架构](https://ar5iv.labs.arxiv.org/html/2210.13438/assets/x1.png)
*图 1：EnCodec 整体架构。编码器将输入波形压缩为离散 token 序列，解码器从 token 重建波形。训练时使用重建损失、对抗损失（通过判别器）和 RVQ 承诺损失联合优化。推理时可选地使用语言模型进行熵编码以进一步压缩比特率。*

![MS-STFT 判别器架构](https://ar5iv.labs.arxiv.org/html/2210.13438/assets/x2.png)
*图 2：多尺度 STFT 判别器架构。输入为复数 STFT（实部 + 虚部 = 2 通道），使用 2D 卷积网络处理。多个判别器使用不同的 STFT 窗口大小（分辨率），捕获不同时频尺度的特征。*

##### 算法伪代码

```python
# EnCodec 编码-量化-解码流程
# 初始化: Encoder E, Decoder D, RVQ with N_q codebooks, LM (optional)

# === 编码 ===
z = E(waveform)                    # [B, D, T/320] 连续潜在表示

# === 残差向量量化 ===
residual = z
codes = []
z_hat = 0
for j in range(N_q):               # N_q 层级联码本
    c_j = nearest_neighbor(residual, codebook_j)  # 最近邻查找
    codes.append(index_of(c_j))    # 存储码本索引 (10 bits each)
    z_hat += c_j                   # 累加量化结果
    residual = residual - c_j      # 更新残差

# === 可选: 语言模型熵编码 ===
probs = LM(codes)                  # Transformer 预测概率分布
compressed = range_encode(codes, probs)  # 无损熵编码, 节省 25-40%

# === 解码 ===
x_hat = D(z_hat)                   # 从量化表示重建波形

# === 训练损失 ===
L_t = ||x - x_hat||_1                              # 时域 L1
L_f = multi_scale_mel_loss(x, x_hat)               # 多尺度 Mel 频谱
L_g = adversarial_loss(D_k(x_hat))                  # 对抗损失
L_feat = feature_matching_loss(D_k(x), D_k(x_hat))  # 特征匹配
L_w = sum(||z_j - sg(c_j)||^2)                      # RVQ 承诺损失
L_total = balancer(L_t, L_f, L_g, L_feat, L_w)      # 梯度平衡
```

##### 编码器-解码器架构

EnCodec 的编码器和解码器基于 SEANet 架构，采用全卷积设计：

**编码器**由以下组件顺序构成：
1. 初始 1D 卷积（kernel=7），将单通道音频映射至 \(C=32\) 通道（48kHz 模型 \(C=64\)）
2. 4 个编码块（EncoderBlock），每个包含：
   - 3 个残差单元：膨胀卷积（dilation=1,3,9）+ 1×1 卷积 + skip connection
   - 步幅下采样卷积（kernel = 2×stride），步幅依次为 2, 4, 5, 8
   - 通道数逐层翻倍：\(32 \to 64 \to 128 \to 256 \to 512\)
3. 2 层 LSTM 用于序列建模
4. 最终 1D 卷积（kernel=7），输出 \(D=128\) 维潜在表示

总下采样率 = \(2 \times 4 \times 5 \times 8 = 320\)，24kHz 输入产生 75 帧/秒的潜在表示。

**解码器**镜像编码器结构，使用转置卷积进行上采样。所有卷积使用权重归一化（Weight Normalization）。

> 💡 **流式 vs 非流式**：流式模式将所有 padding 放在时间步之前（因果卷积），单帧延迟 = 320/24000 = 13.3ms；非流式模式使用双向 padding + 左右各 1 秒 overlap-add 拼接。

##### 残差向量量化（RVQ）

RVQ 是 EnCodec 实现极低比特率的关键。其核心思想是用多层小码本级联逼近连续向量：

$$\hat{\mathbf{z}} = \sum_{j=1}^{N_q} \mathbf{c}_j, \quad \mathbf{c}_j = \text{Quantize}_j\left(\mathbf{z} - \sum_{k=1}^{j-1} \mathbf{c}_k\right)$$

每层量化前一层的残差，逐步细化表示精度。比特率由码本数 \(N_q\) 决定：

$$\text{Bandwidth} = \frac{f_s}{S} \times N_q \times \log_2(K) = 75 \times N_q \times 10 \text{ bits/s}$$

| 目标带宽 (kbps) | 码本数 \(N_q\) | 每秒 token 数 |
|:---:|:---:|:---:|
| 1.5 | 2 | 150 |
| 3.0 | 4 | 300 |
| 6.0 | 8 | 600 |
| 12.0 | 16 | 1200 |
| 24.0 | 32 | 2400 |

> 💡 **为什么不用单层 VQ？** 要达到 30 bits/frame 的精度，单层 VQ 需要 \(2^{30} \approx 10^9\) 个码字，存储和最近邻搜索均不可行。RVQ 用 3 层 1024 码字的码本即可达到等效精度。

**训练技巧**：码本使用指数移动平均（EMA）更新（衰减率 0.99）；当码字使用率低于阈值 2 时，从当前 batch 重新初始化（codebook restart）；训练时随机选择 \(N_q\)，实现单模型多比特率。

##### 语言模型熵编码

RVQ 产生的离散 token 之间存在统计冗余。EnCodec 训练一个小型 Transformer 语言模型来利用这种冗余：

- **架构**：5 层 Transformer，8 头注意力，隐藏维度 200，前馈维度 800
- **建模方式**：自回归预测每个时间步所有 \(N_q\) 个码本的联合分布
- **压缩流程**：LM 输出概率分布 → range arithmetic coder → 无损压缩
- **压缩效果**：低比特率（1.5-3 kbps）可压缩 25-40%，高比特率压缩比降低（受限于小模型容量）

例如，3 kbps 的 EnCodec 配合语言模型熵编码可压缩至约 1.9 kbps，且不损失任何质量。

##### 多尺度 STFT 判别器（MS-STFTD）

论文提出的 MS-STFTD 是对传统 MSD+MPD 组合的简洁替代：

- **输入**：复数 STFT 的实部和虚部拼接为 2 通道输入
- **窗口大小集合**：\(\{2^i \mid i = 5, 6, \ldots, 11\}\)，即从 32 到 2048
- **每个尺度**使用独立的 2D 卷积判别器
- 小窗口捕获高时间分辨率特征，大窗口捕获高频率分辨率特征

> ⚠️ **消融实验关键发现**：单独使用 MS-STFTD 即可达到 MSD+MPD 组合的效果，且参数更少。添加 MPD 仅带来边际提升。

##### 训练目标与损失平衡器

总损失函数由五部分组成：

**(a) 时域重建损失：**
$$\ell_t(\mathbf{x}, \hat{\mathbf{x}}) = \|\mathbf{x} - \hat{\mathbf{x}}\|_1$$

**(b) 频域重建损失（多尺度 Mel 谱）：**
$$\ell_f(\mathbf{x}, \hat{\mathbf{x}}) = \frac{1}{|\alpha| \cdot |s|} \sum_{\alpha_i \in \alpha} \sum_{i \in e} \left(\|\mathcal{S}_i(\mathbf{x}) - \mathcal{S}_i(\hat{\mathbf{x}})\|_1 + \alpha_i \|\mathcal{S}_i(\mathbf{x}) - \mathcal{S}_i(\hat{\mathbf{x}})\|_2\right)$$

其中 \(\mathcal{S}_i\) 是 64-bin Mel 频谱图，窗口大小 \(2^i\)，\(i \in \{5, \ldots, 11\}\)，\(\alpha_i \in \{0.1, \ldots, 2\}\)。

**(c) 对抗损失（Hinge Loss）：**
$$\ell_g(\hat{\mathbf{x}}) = \frac{1}{K} \sum_k \max(0, 1 - D_k(\hat{\mathbf{x}}))$$

**(d) 特征匹配损失：**
$$\ell_{\text{feat}}(\mathbf{x}, \hat{\mathbf{x}}) = \frac{1}{KL} \sum_{k,l} \frac{\|D_k^l(\mathbf{x}) - D_k^l(\hat{\mathbf{x}})\|_1}{\text{mean}(|D_k^l(\mathbf{x})|)}$$

**(e) RVQ 承诺损失：**
$$\ell_w = \sum_{j=1}^{N_q} \|\mathbf{z}_j - \text{sg}[\mathbf{c}_j]\|_2^2$$

**损失平衡器（Loss Balancer）** 是本文的重要贡献。传统方法通过标量权重 \(\lambda_i\) 加权各损失项，但不同损失的梯度量级差异可达数个数量级。Loss Balancer 直接在梯度空间操作：

1. 定义每个损失项 \(\ell_i\) 对总梯度的目标贡献比例 \(\tilde{\lambda}_i\)（\(\sum_i \tilde{\lambda}_i = 1\)）
2. 计算每个损失对编码器最后一层参数的梯度范数 \(\|g_i\|\)
3. 动态调整权重：\(\hat{\lambda}_i = \tilde{\lambda}_i / (\|g_i\| + \epsilon)\)
4. 使用 EMA 平滑梯度范数估计，避免训练不稳定

> 💡 **核心优势**：将超参数从"调损失权重"简化为"设定贡献比例"，显著稳定训练过程。

##### 实验结果

EnCodec 在主观评测（MUSHRA）中展现了显著优势：

| 方法 | 带宽 (kbps) | MUSHRA ↑ |
|:---|:---:|:---:|
| Opus | 6 | ~65 |
| Opus | 12 | ~72 |
| EVS | 9.6 | ~68 |
| Lyra-v2 | 6 | ~70 |
| **EnCodec** | **3** | **~74** |
| **EnCodec** | **6** | **~78** |
| **EnCodec** | **12** | **~82** |

**关键结论**：
1. **EnCodec 3 kbps > Lyra-v2 6 kbps > Opus 12 kbps**（MUSHRA 评分）
2. 语言模型熵编码可将 3 kbps 压缩至 ~1.9 kbps，无质量损失
3. 流式模式相比非流式仅有轻微质量下降
4. 48kHz 立体声模型在 6 kbps 下超越 MP3 64 kbps 和 Opus 64 kbps
5. 单核 CPU 实时编解码

#### 🧪 练习题

```yaml
question: "EnCodec 中损失平衡器（Loss Balancer）的核心创新是什么？"
options:
  - "自动搜索最优的损失权重超参数"
  - "在梯度空间归一化各损失项的贡献比例，而非简单加权损失值"
  - "动态调整学习率以适应不同损失的收敛速度"
  - "使用多个优化器分别优化不同的损失项"
answer: 1
explain: "Loss Balancer 计算每个损失对参数的梯度范数，然后归一化使各项梯度贡献符合预设比例，解决了不同损失梯度量级差异大的问题。"
```