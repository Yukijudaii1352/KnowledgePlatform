### FastSpeech 2: 快速高质量端到端语音合成 (FastSpeech 2: Fast and High-Quality End-to-End Text to Speech)

```yaml
id: fastspeech2
name: FastSpeech 2
full_name: "FastSpeech 2: 快速高质量端到端语音合成 (FastSpeech 2: Fast and High-Quality End-to-End Text to Speech)"
year: '2020'
org: Microsoft / Zhejiang University
paper_url: https://arxiv.org/abs/2006.04558
category: tts
parent: fastspeech
motivation: 去除教师-学生蒸馏流程，引入音高/能量/时长等方差信息直接训练，提升非自回归TTS质量与速度
```

#### 📝 一句话总结

FastSpeech 2 提出直接使用真实语音中提取的时长、音高和能量作为条件输入来训练非自回归 TTS 模型，去除了 FastSpeech 中复杂的教师-学生蒸馏流程，同时提出 FastSpeech 2s 首次实现了文本到波形的完全并行生成，在语音质量和训练速度上均显著优于前作。

#### 🎯 核心要点

- **去除教师-学生蒸馏**：直接使用 ground-truth mel 频谱图训练，避免教师模型蒸馏带来的信息损失和流程复杂性
- **方差适配器（Variance Adaptor）**：包含时长预测器、音高预测器和能量预测器三个子模块，显式建模语音中的多种变化信息
- **时长预测器**：使用 Montreal Forced Alignment (MFA) 提取的真实音素时长替代教师模型的注意力对齐，精度更高
- **音高预测器**：采用连续小波变换（CWT）将连续 F0 分解为多尺度频谱，预测小波系数后通过逆 CWT 重建，更好捕捉音高的时间结构
- **能量预测器**：以 STFT 幅度谱的 L2 范数作为能量特征，量化为 256 个等距 bin 后通过 embedding 注入
- **FastSpeech 2s**：首次实现文本直接并行生成波形（text-to-waveform），跳过 mel 频谱中间表示
- **实验结果**：FastSpeech 2 训练速度为 FastSpeech 的 3 倍，MOS 达 3.83 超越自回归 Transformer TTS（3.86 vs teacher），FastSpeech 2s 推理延迟仅为自回归模型的 1/60

#### 🔬 深入细节

##### 动机与背景

FastSpeech（Ren et al., 2019）是非自回归 TTS 的先驱，通过并行生成 mel 频谱图实现了数十倍的推理加速。然而，FastSpeech 存在三个关键问题：

1. **教师-学生蒸馏流程复杂**：需要先训练一个自回归教师模型（Transformer TTS），从中提取注意力对齐作为时长标签，并用教师生成的 mel 频谱图（而非 ground-truth）作为训练目标，整个流程耗时且繁琐。
2. **时长提取不准确**：从教师模型注意力中提取的时长存在误差，影响合成语音的韵律。
3. **信息损失**：教师模型蒸馏的 mel 频谱图是对真实数据分布的简化，丢失了语音中的细节变化信息。

> 💡 **关键洞察**：TTS 的核心困难在于"一对多映射"——同一文本可以对应多种合法的语音表达（不同语速、音高、能量）。FastSpeech 通过知识蒸馏简化输出分布来回避此问题，而 FastSpeech 2 的思路是**显式提供方差信息作为条件**，从根本上缓解一对多映射的歧义。

##### 模型整体架构

![FastSpeech 2 模型架构图](https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x1.png)
*图 1(a)：FastSpeech 2 整体架构。编码器将音素序列编码为隐藏序列，方差适配器添加时长/音高/能量信息，解码器生成 mel 频谱图。*

FastSpeech 2 的整体架构沿用了 FastSpeech 的 Feed-Forward Transformer (FFT) 设计，包含以下核心模块：

- **编码器（Encoder）**：由 4 个 FFT Block 组成，每个 Block 包含多头自注意力层和 1D 卷积前馈网络（2 层卷积，kernel size 为 9 和 1），将音素序列编码为隐藏表示 \(H_{\text{pho}}\)。
- **方差适配器（Variance Adaptor）**：核心创新模块，包含时长预测器、音高预测器和能量预测器，将编码器输出扩展为帧级别的隐藏序列，并注入音高和能量信息。
- **解码器（Decoder）**：同样由 4 个 FFT Block 组成，将帧级隐藏序列转换为 mel 频谱图。
- **线性层**：最终将解码器输出映射到 80 维 mel 频谱图。

##### 方差适配器（Variance Adaptor）

![方差适配器结构](https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x2.png)
*图 1(b)：方差适配器结构。依次包含时长预测器、音高预测器和能量预测器。*

![预测器内部结构](https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x3.png)
*图 1(c)：时长/音高/能量预测器的共享内部结构——2 层 1D 卷积 + ReLU + LayerNorm + Dropout + 线性层。*

方差适配器是 FastSpeech 2 的核心创新，它通过三个预测器显式建模语音的方差信息：

**1. 时长预测器（Duration Predictor）**

时长预测器的目标是预测每个音素对应的 mel 帧数。与 FastSpeech 使用教师模型注意力不同，FastSpeech 2 使用 **Montreal Forced Alignment (MFA)** 工具从真实语音-文本对中提取音素级时长标签，精度更高。

- 结构：2 层 1D 卷积（kernel size = 3，channels = 256）+ ReLU + LayerNorm + Dropout + 线性投影层
- 训练时使用 MFA 提取的 ground-truth 时长，推理时使用预测值
- 损失函数采用对数域的 MSE：

$$\mathcal{L}_{\text{dur}} = \text{MSE}(\log \hat{d}, \log d)$$

其中 \(\hat{d}\) 为预测时长，\(d\) 为 ground-truth 时长。使用 Length Regulator 将音素级隐藏序列按时长扩展为帧级序列。

**2. 音高预测器（Pitch Predictor）**

音高（F0）是影响语音韵律的关键因素。FastSpeech 2 将帧级 F0 轮廓作为条件输入，但直接预测逐帧 F0 存在困难——F0 序列包含复杂的时间依赖结构。

![音高预测器细节](https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x5.png)
*图 2：音高预测器细节。使用 CWT 将 F0 分解为多尺度小波系数，预测后通过 iCWT 重建。*

FastSpeech 2 采用**连续小波变换（Continuous Wavelet Transform, CWT）**来分解 F0：

$$W(t, s) = \frac{1}{\sqrt{s}} \int f(\tau) \psi^*\left(\frac{\tau - t}{s}\right) d\tau$$

其中 \(s\) 为尺度参数，\(\psi\) 为母小波函数。具体流程：

1. 对每个语音样本的帧级 F0 序列进行 CWT 分解，得到 10 个尺度的小波系数 \(\{W_0, W_1, \ldots, W_9\}\)
2. 音高预测器（与时长预测器结构相同）预测这 10 个尺度的小波系数谱
3. 推理时通过逆 CWT（iCWT）从预测的小波系数重建 F0 轮廓
4. 将 F0 量化为 256 个 bin，通过 pitch embedding 层转换为向量，加到隐藏序列上

> ⚠️ **注意**：CWT 的优势在于将 F0 的局部细节和全局趋势分离到不同尺度上，使预测任务更加平滑和可学习，相比直接预测逐帧 F0 效果显著更好。

**3. 能量预测器（Energy Predictor）**

能量反映语音的响度变化。FastSpeech 2 将每帧的能量定义为 STFT 幅度谱的 L2 范数：

$$e_t = \left\| \text{STFT}(x)_t \right\|_2$$

能量处理流程：
1. 计算每帧的 STFT 幅度谱 L2 范数作为能量值
2. 将能量值线性量化为 256 个等距 bin
3. 通过 energy embedding 层将量化后的能量转换为向量，加到隐藏序列上
4. 能量预测器结构与时长预测器相同，使用 MSE 损失训练

##### 训练与推理流程

**训练损失函数**：

$$\mathcal{L} = \mathcal{L}_{\text{mel}} + \alpha \mathcal{L}_{\text{dur}} + \beta \mathcal{L}_{\text{pitch}} + \gamma \mathcal{L}_{\text{energy}}$$

- \(\mathcal{L}_{\text{mel}}\)：mel 频谱图重建的 MSE 损失
- \(\mathcal{L}_{\text{dur}}\)：对数域时长预测的 MSE 损失
- \(\mathcal{L}_{\text{pitch}}\)：音高小波系数谱的 MSE 损失
- \(\mathcal{L}_{\text{energy}}\)：能量预测的 MSE 损失

**训练流程**：
1. 使用 MFA 预处理所有训练数据，提取音素级时长对齐
2. 从语音波形中提取帧级 F0（使用 DIO 算法）和能量
3. 对 F0 进行 CWT 分解得到小波系数谱
4. 训练时，方差适配器使用 ground-truth 的时长、音高和能量（teacher forcing）
5. 编码器-解码器端到端优化上述联合损失

**推理流程**：
1. 编码器编码输入音素序列
2. 时长预测器预测每个音素的时长，Length Regulator 扩展序列
3. 音高预测器预测小波系数，iCWT 重建 F0，量化后通过 embedding 注入
4. 能量预测器预测能量值，量化后通过 embedding 注入
5. 解码器生成 mel 频谱图，再由外部声码器（如 Parallel WaveGAN）合成波形

##### FastSpeech 2s：文本到波形的并行生成

![波形解码器](https://ar5iv.labs.arxiv.org/html/2006.04558/assets/x4.png)
*图 1(d)：FastSpeech 2s 的波形解码器结构。*

FastSpeech 2s 在 FastSpeech 2 的基础上，将 mel 解码器替换为**波形解码器**，直接从隐藏序列生成波形，实现完全端到端的推理。波形解码器的设计借鉴了 WaveNet 的膨胀卷积结构：

- 使用多组 1D 膨胀卷积层（dilation rate 指数增长：1, 2, 4, ..., 512），共 4 组，每组 10 层
- 每层包含门控激活函数（tanh + sigmoid）和残差连接
- 最终通过线性层输出波形样本

由于波形解码器直接生成高维波形（采样率 22050 Hz），训练难度更大。FastSpeech 2s 额外引入了：
- **mel 频谱图解码器辅助损失**：在训练初期帮助隐藏序列学习有意义的表示
- **对抗训练损失**：使用判别器区分生成波形和真实波形，提升音质

##### 与 FastSpeech 的关键区别

| 特性 | FastSpeech | FastSpeech 2 |
|------|-----------|--------------|
| 训练目标 | 教师蒸馏的 mel 频谱图 | Ground-truth mel 频谱图 |
| 时长来源 | 教师模型注意力对齐 | MFA 强制对齐 |
| 方差信息 | 仅时长 | 时长 + 音高 + 能量 |
| 音高建模 | 无 | CWT 分解 + 小波系数预测 |
| 能量建模 | 无 | STFT L2 范数 + 量化 embedding |
| 端到端波形 | 不支持 | FastSpeech 2s 支持 |
| 训练速度 | 1× | 3× |

> 💡 **核心创新总结**：FastSpeech 2 的本质思想是——与其通过知识蒸馏"简化"输出分布来回避一对多映射问题，不如**显式提供缺失的条件信息**（音高、能量、精确时长），让模型在给定这些条件后面对的是一个近似一对一的映射，从而可以直接在 ground-truth 数据上训练。

##### 算法伪代码

```python
# FastSpeech 2 训练伪代码
def fastspeech2_train(phonemes, mel_gt, duration_gt, f0_gt, energy_gt):
    # 编码器
    h_pho = encoder(phonemes)  # [B, T_pho, D]
    
    # 方差适配器（训练时使用 ground-truth）
    # 1. 时长：使用 GT 时长扩展序列
    dur_pred = duration_predictor(h_pho)  # [B, T_pho]
    h_frame = length_regulator(h_pho, duration_gt)  # [B, T_mel, D]
    
    # 2. 音高：CWT 分解 + 预测小波系数
    cwt_spec_gt = CWT(f0_gt)  # [B, T_mel, 10]
    cwt_spec_pred = pitch_predictor(h_frame)  # [B, T_mel, 10]
    pitch_emb = pitch_embedding(quantize(f0_gt, 256))
    h_frame = h_frame + pitch_emb
    
    # 3. 能量：量化 + embedding
    energy_pred = energy_predictor(h_frame)  # [B, T_mel]
    energy_emb = energy_embedding(quantize(energy_gt, 256))
    h_frame = h_frame + energy_emb
    
    # 解码器
    mel_pred = decoder(h_frame)  # [B, T_mel, 80]
    
    # 损失计算
    loss = MSE(mel_pred, mel_gt) + MSE(log(dur_pred), log(duration_gt)) \
         + MSE(cwt_spec_pred, cwt_spec_gt) + MSE(energy_pred, energy_gt)
    return loss
```

```python
# FastSpeech 2 推理伪代码
def fastspeech2_inference(phonemes):
    h_pho = encoder(phonemes)
    
    # 使用预测值
    dur_pred = duration_predictor(h_pho)
    h_frame = length_regulator(h_pho, round(dur_pred))
    
    cwt_spec = pitch_predictor(h_frame)
    f0_pred = iCWT(cwt_spec)  # 逆小波变换重建 F0
    h_frame = h_frame + pitch_embedding(quantize(f0_pred, 256))
    
    energy_pred = energy_predictor(h_frame)
    h_frame = h_frame + energy_embedding(quantize(energy_pred, 256))
    
    mel_pred = decoder(h_frame)
    waveform = vocoder(mel_pred)  # 外部声码器
    return waveform
```

#### 🧪 练习题

```yaml
question: "FastSpeech 2 中音高预测器使用连续小波变换（CWT）的主要原因是什么？"
options:
  - "减少模型参数量，降低计算开销"
  - "将 F0 的多尺度时间结构分解为更平滑的小波系数，使预测更容易"
  - "将连续的 F0 值转换为离散类别，简化分类任务"
  - "利用小波变换的压缩特性减少序列长度"
answer: 1
explain: "CWT 将 F0 序列分解为不同尺度的小波系数，分离了局部细节和全局趋势，使得预测目标更加平滑和结构化，相比直接预测逐帧 F0 值更容易学习。"
```