---
domain: aigc
topic_id: sound_generation
topic_name: AI音频生成技术演化图谱
page_icon: 🔊
page_title: AI音频生成技术演化图谱
page_subtitle: 2026-05-12 版
page_desc: 从WaveNet自回归波形生成到Diffusion Transformer统一框架，AI音频生成经历了自回归时代、GAN时代、扩散模型时代和统一大模型时代四个阶段，涵盖TTS、语音克隆、音效生成、神经编解码器与音乐生成五大技术方向。
hero_pills:
- 文本到语音
- 语音克隆
- 音效生成
- 神经编解码器
- 音乐生成
- Diffusion Transformer
- 零样本克隆
- 实时推理
count_pill: '{count} 个算法'
categories:
  tts:
    label: 文本到语音合成
    color: '#3B82F6'
  vocoder:
    label: 神经网络声码器
    color: '#10B981'
  voice_clone:
    label: 语音克隆
    color: '#8B5CF6'
  audio_effect:
    label: 音效生成
    color: '#F97316'
  neural_codec:
    label: 神经编解码器
    color: '#EF4444'
  music_gen:
    label: 音乐生成
    color: '#06B6D4'
image_base: ../../content/aigc/sound_generation/assets/
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: wavenet
  x: 100
  y: 100
  category: tts
- id: tacotron
  x: 200
  y: 100
  category: tts
- id: tacotron2
  x: 300
  y: 100
  category: tts
- id: fastspeech
  x: 400
  y: 100
  category: tts
- id: fastspeech2
  x: 500
  y: 100
  category: tts
- id: vits
  x: 600
  y: 100
  category: tts
- id: f5tts
  x: 700
  y: 100
  category: tts
- id: dittotts
  x: 800
  y: 100
  category: tts
- id: cosyvoice3
  x: 900
  y: 80
  category: tts
- id: fishaudio_s2
  x: 900
  y: 120
  category: tts
- id: uniaudio2
  x: 900
  y: 160
  category: tts
- id: hifigan
  x: 500
  y: 250
  category: vocoder
- id: bigvgan
  x: 650
  y: 250
  category: vocoder
- id: yourtts
  x: 650
  y: 350
  category: voice_clone
- id: valle
  x: 750
  y: 350
  category: voice_clone
- id: megatts
  x: 800
  y: 380
  category: voice_clone
- id: valle2
  x: 850
  y: 350
  category: voice_clone
- id: xvoice
  x: 950
  y: 330
  category: voice_clone
- id: marcovoice
  x: 950
  y: 370
  category: voice_clone
- id: audioldm
  x: 750
  y: 500
  category: audio_effect
- id: tango
  x: 800
  y: 500
  category: audio_effect
- id: audioldm2
  x: 850
  y: 500
  category: audio_effect
- id: tfoley
  x: 850
  y: 540
  category: audio_effect
- id: audiox
  x: 950
  y: 500
  category: audio_effect
- id: audiogenomni
  x: 1000
  y: 500
  category: audio_effect
- id: soundstream
  x: 600
  y: 650
  category: neural_codec
- id: encodec
  x: 700
  y: 650
  category: neural_codec
- id: wavtokenizer
  x: 800
  y: 650
  category: neural_codec
- id: omnicodec
  x: 950
  y: 650
  category: neural_codec
- id: musicgen
  x: 750
  y: 800
  category: music_gen
- id: stableaudio25
  x: 950
  y: 800
  category: music_gen
edges:
- from: wavenet
  to: tacotron
  label: 端到端架构
- from: tacotron
  to: tacotron2
  label: Mel谱+声码器
- from: tacotron2
  to: fastspeech
  label: 非自回归
- from: fastspeech
  to: fastspeech2
  label: 方差适配器
- from: fastspeech2
  to: vits
  label: VAE+Flow
- from: vits
  to: f5tts
  label: Flow Matching
- from: f5tts
  to: dittotts
  label: DiT架构
- from: f5tts
  to: cosyvoice3
  label: RL优化
- from: f5tts
  to: fishaudio_s2
  label: 情感建模
- from: hifigan
  to: bigvgan
  label: 大规模训练
- from: vits
  to: yourtts
  label: 零样本克隆
- from: encodec
  to: valle
  label: 语言模型范式
- from: valle
  to: megatts
  label: 扩散韵律
- from: valle
  to: valle2
  label: 重复感知
- from: valle2
  to: xvoice
  label: 多语言扩展
- from: valle2
  to: marcovoice
  label: 表达性统一
- from: valle2
  to: uniaudio2
  label: 统一框架
- from: audioldm
  to: tango
  label: 指令微调
- from: audioldm
  to: audioldm2
  label: 自监督学习
- from: tango
  to: tfoley
  label: Foley合成
- from: audioldm2
  to: audiox
  label: DiT架构
- from: audiox
  to: audiogenomni
  label: MM-DiT
- from: soundstream
  to: encodec
  label: 高效压缩
- from: encodec
  to: wavtokenizer
  label: 单层Codebook
- from: wavtokenizer
  to: omnicodec
  label: 语义解耦
- from: encodec
  to: musicgen
  label: 音乐生成
- from: musicgen
  to: stableaudio25
  label: ARC加速
milestones:
- wavenet
- vits
- valle
```

## 核心算法

### WaveNet

```yaml
id: wavenet
num: 1
name: WaveNet
full_name: 'WaveNet: 生成式原始音频模型 (WaveNet: A Generative Model for Raw Audio)'
year: '2016'
org: DeepMind
parent: —
paper_url: https://arxiv.org/abs/1609.03499
project_url: ''
category: tts
motivation: 空洞因果卷积自回归生成原始波形
```

#### 📝 一句话总结
WaveNet 的核心目标是：空洞因果卷积自回归生成原始波形。

#### 🎯 核心要点
- 核心动机：空洞因果卷积自回归生成原始波形
- 代表机构：DeepMind

#### 🔬 深入细节
空洞因果卷积自回归生成原始波形


### Tacotron

```yaml
id: tacotron
num: 2
name: Tacotron
full_name: 'Tacotron: 端到端语音合成 (Tacotron: Towards End-to-End Speech Synthesis)'
year: '2017'
org: Google
parent: wavenet
paper_url: https://arxiv.org/abs/1703.10135
project_url: ''
category: tts
motivation: Seq2Seq注意力机制端到端合成
```

#### 📝 一句话总结
Tacotron 提出了一种基于 Seq2Seq + Attention 的端到端文本到语音合成模型，直接从字符序列生成语音频谱图，无需传统 TTS 流水线中的语言学特征工程和多阶段独立训练，在自然度上超越了生产级参数化系统。

#### 🎯 核心要点
- **端到端架构**：直接以字符序列为输入，输出原始频谱图，省去了文本前端、时长模型、声学模型等传统 TTS 流水线的多个独立模块
- **CBHG 模块**：提出 1-D 卷积组 + Highway 网络 + 双向 GRU 的组合模块，用于编码器和后处理网络，有效提取多尺度序列特征
- **两阶段频谱预测**：Seq2Seq 解码器先预测 80 维 mel 频谱图，再由后处理网络（Post-processing net）转换为线性频谱图
- **输出帧缩减技巧**：每个解码步预测 \(r\) 帧（reduction factor），大幅加速训练收敛和推理速度
- **Griffin-Lim 波形合成**：使用 Griffin-Lim 算法从线性频谱图重建波形，简单高效
- **Pre-net 正则化**：编码器和解码器均使用带 Dropout 的瓶颈层（Pre-net）作为正则化手段，提升泛化能力
- **实验结果**：在美式英语数据集上达到 3.82 MOS，超越生产级参数化 TTS 系统（3.69 MOS）

#### 🔬 深入细节
##### 模型整体架构

![Tacotron 模型架构图](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x1.png)
*图 1：Tacotron 模型架构。模型以字符为输入，输出对应的原始频谱图，再通过 Griffin-Lim 重建算法合成语音波形。*

Tacotron 的核心是一个带注意力机制的 Seq2Seq 模型，包含三个主要组件：**编码器（Encoder）**、**基于注意力的解码器（Attention-based Decoder）** 和 **后处理网络（Post-processing Net）**。

##### CBHG 模块

![CBHG 模块结构](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x2.png)
*图 2：CBHG（1-D 卷积组 + Highway 网络 + 双向 GRU）模块结构。*

CBHG 是 Tacotron 中的核心构建模块，其处理流程如下：

1. **1-D 卷积组（Conv1D Bank）**：使用 \(K\) 组不同宽度的 1-D 卷积滤波器（宽度从 1 到 \(K\)），显式建模从 unigram 到 \(K\)-gram 的局部上下文信息
2. **最大池化**：沿时间轴进行 stride=1 的最大池化，增强局部不变性并保持时间分辨率
3. **1-D 卷积投影**：通过固定宽度的 1-D 卷积进一步处理，并通过残差连接与原始输入相加
4. **Highway 网络**：多层全连接 Highway 网络提取高层特征
5. **双向 GRU**：最终通过双向 GRU 从前后两个方向提取序列特征

> 💡 **关键**：CBHG 的多尺度卷积设计类似于 n-gram 语言模型的思想——不同宽度的卷积核捕获不同粒度的局部模式，这比单纯的 RNN 编码器更能减少过拟合和发音错误。

##### 编码器（Encoder）

编码器将字符序列转换为高层表示：

1. 字符通过 one-hot 编码后嵌入为 256 维连续向量
2. 经过 **Pre-net**（FC-256-ReLU → Dropout(0.5) → FC-128-ReLU → Dropout(0.5)）进行非线性变换
3. Pre-net 输出送入 **CBHG 模块**（\(K=16\)），生成最终的编码器表示

##### 解码器（Decoder）

解码器采用 content-based tanh 注意力机制，逐步生成 mel 频谱图：

$$\text{Attention}(q, K, V) = \text{softmax}\left(\frac{qK^T}{\sqrt{d}}\right)V$$

具体流程：
1. **Attention RNN**（1 层 256 单元 GRU）生成注意力查询向量
2. 注意力模块计算上下文向量，与 Attention RNN 输出拼接
3. 拼接结果送入 **Decoder RNN**（2 层残差 GRU，256 单元）
4. 全连接输出层预测 \(r\) 帧 80 维 mel 频谱图

> ⚠️ **注意**：每步预测 \(r\) 帧（论文中 \(r=2\)）是关键技巧。这不仅将解码步数减少为 \(1/r\)，更重要的是大幅加速了注意力对齐的学习——因为相邻语音帧高度相关，一次输出多帧允许注意力在训练早期就能快速前移。

##### 后处理网络与波形合成

后处理网络的任务是将 mel 频谱图转换为线性频谱图：

- 使用另一个 CBHG 模块（\(K=8\)），能够看到完整的解码序列
- 相比 Seq2Seq 解码器只能从左到右生成，后处理网络同时利用前向和后向信息修正每帧的预测误差

波形合成使用 **Griffin-Lim 算法**，从预测的线性频谱图迭代重建相位信息：

$$x_{n+1} = \text{ISTFT}\left(|S| \cdot \frac{\text{STFT}(x_n)}{|\text{STFT}(x_n)|}\right)$$

其中 \(|S|\) 为预测的幅度谱。论文发现将预测幅度取 1.2 次幂后再送入 Griffin-Lim 可减少合成伪影。

##### 算法伪代码

```python
# Tacotron 端到端 TTS 推理流程
def tacotron_inference(text):
    # 1. 编码器
    chars = char_embedding(text)          # [T_in, 256]
    enc = encoder_prenet(chars)           # [T_in, 128]
    enc = encoder_cbhg(enc)              # [T_in, 256]
    
    # 2. 注意力解码器
    go_frame = zeros(80)                  # <GO> 帧
    decoder_input = go_frame
    mel_outputs = []
    
    for step in range(max_steps):
        prenet_out = decoder_prenet(decoder_input)
        attn_rnn_out = attention_rnn(prenet_out)
        context = attention(attn_rnn_out, enc)
        decoder_out = decoder_rnn(concat(context, attn_rnn_out))
        mel_frames = linear_projection(decoder_out)  # 预测 r 帧
        mel_outputs.append(mel_frames)
        decoder_input = mel_frames[-1]    # 取最后一帧作为下一步输入
        if is_end_of_sequence(mel_frames):
            break
    
    # 3. 后处理网络
    mel_spec = concat(mel_outputs)        # [T_out, 80]
    linear_spec = postprocessing_cbhg(mel_spec)  # [T_out, 1025]
    
    # 4. Griffin-Lim 波形合成
    waveform = griffin_lim(linear_spec, n_iter=50)
    return waveform
```

##### 训练细节

- **损失函数**：对 mel 频谱图和线性频谱图均使用 \(\ell_1\) 损失，两者权重相等

$$\mathcal{L} = \|\hat{y}_{\text{mel}} - y_{\text{mel}}\|_1 + \|\hat{y}_{\text{linear}} - y_{\text{linear}}\|_1$$

- **优化器**：Adam，学习率从 0.001 开始，在 500K/1M/2M 步分别衰减至 0.0005/0.0003/0.0001
- **批大小**：32，所有序列填充至最大长度
- **音频参数**：24 kHz 采样率，50 ms 帧长，12.5 ms 帧移，2048 点 FFT，0.97 预加重

> 💡 **关键**：训练时不使用 loss mask（即零填充帧也参与损失计算），这是为了让模型学会何时停止输出。使用 loss mask 的模型在推理时不知道何时结束，会在末尾产生重复声音。

##### 注意力对齐对比

![注意力对齐对比](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x3.png)
*图 3(a)：Vanilla Seq2Seq + Scheduled Sampling 的注意力对齐——对齐混乱，注意力频繁卡住。*

![GRU 编码器注意力对齐](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x4.png)
*图 3(b)：GRU 编码器的注意力对齐——对齐有噪声，导致发音错误。*

![Tacotron 注意力对齐](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x5.png)
*图 3(c)：Tacotron（CBHG 编码器）的注意力对齐——干净平滑的对角线对齐。*

消融实验表明：(1) 普通 Seq2Seq 模型学到的对齐质量很差，注意力容易卡住导致语音不清晰；(2) 用 GRU 替换 CBHG 编码器后对齐变得嘈杂，容易产生发音错误；(3) Tacotron 的 CBHG 编码器能学到干净平滑的注意力对齐。

##### 后处理网络效果

![无后处理网络的频谱图](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x6.png)
*图 4(a)：不使用后处理网络时预测的频谱图。*

![有后处理网络的频谱图](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x7.png)
*图 4(b)：使用后处理网络后预测的频谱图——谐波结构更清晰，高频共振峰更完整。*

后处理网络利用双向上下文信息，显著改善了预测频谱图中的谐波分辨率（100-400 bin 之间的高次谐波）和高频共振峰结构，从而减少了合成伪影。

##### 与传统方法的对比

| 特性 | 传统 TTS 流水线 | Tacotron |
|------|----------------|----------|
| 输入 | 语言学特征（音素、时长等） | 原始字符序列 |
| 模块 | 文本前端 + 时长模型 + 声学模型 + 声码器 | 单一端到端模型 |
| 训练 | 各模块独立训练，误差累积 | 端到端联合训练 |
| 特征工程 | 大量领域专家知识 | 无需手工特征 |
| 生成速度 | 取决于声码器 | 帧级生成，远快于样本级自回归方法 |
| MOS | 参数化系统 3.69 | **3.82** |

#### 🧪 练习题
```yaml
question: "Tacotron 中每个解码步预测多帧（reduction factor r）的主要好处是什么？"
options:
  - "减少模型参数量，降低显存占用"
  - "加速注意力对齐的学习，因为相邻帧高度相关无需逐帧关注同一输入"
  - "提升 Griffin-Lim 算法的重建质量"
  - "使模型能够处理更长的输入文本序列"
answer: 1
explain: "每步预测 r 帧将解码步数减少为 1/r，更重要的是允许注意力在训练早期快速前移，而非被迫在同一输入 token 上停留多步，从而大幅加速对齐学习的收敛。"
```

### Tacotron 2

```yaml
id: tacotron2
num: 3
name: Tacotron 2
full_name: 'Tacotron 2: 自然TTS合成 (Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram)'
year: '2018'
org: Google
parent: tacotron
paper_url: https://arxiv.org/abs/1712.05884
project_url: ''
category: tts
motivation: Mel谱预测+WaveNet声码器
```

#### 📝 一句话总结
Tacotron 2 的核心目标是：Mel谱预测+WaveNet声码器。

#### 🎯 核心要点
- 核心动机：Mel谱预测+WaveNet声码器
- 演化来源：继承或改进自 tacotron
- 代表机构：Google

#### 🔬 深入细节
Mel谱预测+WaveNet声码器


### FastSpeech

```yaml
id: fastspeech
num: 4
name: FastSpeech
full_name: 'FastSpeech: 快速鲁棒的TTS (FastSpeech: Fast, Robust and Controllable Text to Speech)'
year: '2019'
org: Microsoft
parent: tacotron2
paper_url: https://proceedings.neurips.cc/paper_files/paper/2019/hash/f63f65b5870931065885e0afa52ad6a8-Abstract.html
project_url: ''
category: tts
motivation: 非自回归并行合成+长度预测器
```

#### 📝 一句话总结
FastSpeech 的核心目标是：非自回归并行合成+长度预测器。

#### 🎯 核心要点
- 核心动机：非自回归并行合成+长度预测器
- 演化来源：继承或改进自 tacotron2
- 代表机构：Microsoft

#### 🔬 深入细节
非自回归并行合成+长度预测器


### FastSpeech 2

```yaml
id: fastspeech2
num: 5
name: FastSpeech 2
full_name: 'FastSpeech 2: 快速高质量TTS (FastSpeech 2: Fast and High-Quality End-to-End Text to Speech)'
year: '2020'
org: Microsoft
parent: fastspeech
paper_url: https://arxiv.org/abs/2006.04558
project_url: ''
category: tts
motivation: 方差适配器改进韵律建模
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

### HiFi-GAN

```yaml
id: hifigan
num: 6
name: HiFi-GAN
full_name: 'HiFi-GAN: 高保真语音合成GAN (HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis)'
year: '2020'
org: Kakao
parent: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2020/hash/c5d736809766d46260d816d8dbc9eb44-Abstract.html
project_url: ''
category: vocoder
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

### VITS

```yaml
id: vits
num: 7
name: VITS
full_name: 'VITS: 条件变分自编码器端到端TTS (Conditional Variational Autoencoder with Adversarial Learning for End-to-End TTS)'
year: '2021'
org: Kakao
parent: fastspeech2
paper_url: https://proceedings.mlr.press/v139/kim21f.html
project_url: ''
category: tts
motivation: VAE+Flow+GAN端到端合成
```

#### 📝 一句话总结
VITS 的核心目标是：VAE+Flow+GAN端到端合成。

#### 🎯 核心要点
- 核心动机：VAE+Flow+GAN端到端合成
- 演化来源：继承或改进自 fastspeech2
- 代表机构：Kakao

#### 🔬 深入细节
VAE+Flow+GAN端到端合成


### SoundStream

```yaml
id: soundstream
num: 8
name: SoundStream
full_name: 'SoundStream: 端到端神经音频编解码器 (SoundStream: An End-to-End Neural Audio Codec)'
year: '2021'
org: Google
parent: —
paper_url: https://arxiv.org/abs/2107.03312
project_url: ''
category: neural_codec
motivation: RVQ神经音频编码框架
```

#### 📝 一句话总结
SoundStream 的核心目标是：RVQ神经音频编码框架。

#### 🎯 核心要点
- 核心动机：RVQ神经音频编码框架
- 代表机构：Google

#### 🔬 深入细节
RVQ神经音频编码框架


### BigVGAN

```yaml
id: bigvgan
num: 9
name: BigVGAN
full_name: 'BigVGAN: 通用神经声码器 (BigVGAN: A Universal Neural Vocoder with Large-Scale Training)'
year: '2022'
org: NVIDIA
parent: hifigan
paper_url: https://arxiv.org/abs/2206.04658
project_url: ''
category: vocoder
motivation: Snake激活大规模通用声码器
```

#### 📝 一句话总结
BigVGAN 的核心目标是：Snake激活大规模通用声码器。

#### 🎯 核心要点
- 核心动机：Snake激活大规模通用声码器
- 演化来源：继承或改进自 hifigan
- 代表机构：NVIDIA

#### 🔬 深入细节
Snake激活大规模通用声码器


### EnCodec

```yaml
id: encodec
num: 10
name: EnCodec
full_name: 'EnCodec: 高保真神经音频压缩 (High Fidelity Neural Audio Compression)'
year: '2022'
org: Meta
parent: soundstream
paper_url: https://arxiv.org/abs/2210.13438
project_url: ''
category: neural_codec
motivation: 高效音频压缩与Token化
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

### YourTTS

```yaml
id: yourtts
num: 11
name: YourTTS
full_name: 'YourTTS: 零样本多说话人TTS (YourTTS: Towards Zero-Shot Multi-Speaker TTS)'
year: '2022'
org: Coqui
parent: vits
paper_url: https://proceedings.mlr.press/v162/casanova22a.html
project_url: ''
category: voice_clone
motivation: 多语言零样本VITS克隆
```

#### 📝 一句话总结
YourTTS 的核心目标是：多语言零样本VITS克隆。

#### 🎯 核心要点
- 核心动机：多语言零样本VITS克隆
- 演化来源：继承或改进自 vits
- 代表机构：Coqui

#### 🔬 深入细节
多语言零样本VITS克隆


### AudioLDM

```yaml
id: audioldm
num: 12
name: AudioLDM
full_name: 'AudioLDM: 文本到音频生成 (AudioLDM: Text-to-Audio Generation with Latent Diffusion Models)'
year: '2023'
org: Surrey
parent: —
paper_url: https://arxiv.org/abs/2301.12503
project_url: ''
category: audio_effect
motivation: 潜在扩散+CLAP对齐音效生成
```

#### 📝 一句话总结
AudioLDM 的核心目标是：潜在扩散+CLAP对齐音效生成。

#### 🎯 核心要点
- 核心动机：潜在扩散+CLAP对齐音效生成
- 代表机构：Surrey

#### 🔬 深入细节
潜在扩散+CLAP对齐音效生成


### VALL-E

```yaml
id: valle
num: 13
name: VALL-E
full_name: 'VALL-E: 神经编解码语言模型 (Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers)'
year: '2023'
org: Microsoft
parent: encodec
paper_url: https://arxiv.org/abs/2301.02111
project_url: ''
category: voice_clone
motivation: 神经编解码语言模型TTS范式
```

#### 📝 一句话总结
VALL-E 首次将文本转语音（TTS）重新定义为**条件编解码语言建模**任务，利用 EnCodec 将语音离散化为 token 序列，通过自回归（AR）+ 非自回归（NAR）两阶段 Transformer 解码器在 60K 小时 LibriLight 数据上训练，仅需 3 秒语音提示即可实现高质量零样本语音合成，在说话人相似度和语音自然度上显著超越现有零样本 TTS 系统。

#### 🎯 核心要点
- **TTS 即语言建模**：将 TTS 从传统的连续信号回归问题转化为离散 token 的条件语言建模问题，利用神经编解码器（EnCodec）将 24kHz 语音压缩为 8 层残差向量量化（RVQ）码本的离散 token 序列
- **两阶段生成架构**：AR 模型自回归生成第 1 层（最粗粒度）编码，NAR 模型以第 1 层为条件并行生成第 2-8 层（精细细节）编码，兼顾生成质量与效率
- **上下文学习（In-context Learning）**：借鉴 GPT-3 的 prompt 机制，将 3 秒参考语音的编解码 token 作为 prompt 拼接在输入中，无需微调即可克隆未见说话人的声音特征
- **大规模数据驱动**：在 LibriLight 60K 小时英语语音数据上训练（比此前 TTS 系统大数百倍），是首个利用如此大规模半监督数据的 TTS 模型
- **强零样本性能**：在 LibriSpeech 测试集上，WER 5.9%、说话人相似度 0.580、SMOS 3.8，显著优于 YourTTS 基线（WER 7.7%、相似度 0.510、SMOS 2.4）
- **多样性生成**：AR 模型的采样机制使得同一文本+同一 prompt 可生成多种不同的语音输出，具备多样性和表现力

#### 🔬 深入细节
##### 核心架构总览

![VALL-E 系统概览](https://ar5iv.labs.arxiv.org/html/2301.02111/assets/prompt.jpg)
*图 1：VALL-E 系统概览。给定一段 3 秒的语音片段作为 prompt，VALL-E 能够合成高质量的个性化语音。VALL-E 在说话人情感保持和声学环境一致性方面显著优于基线系统。*

![EnCodec 编解码器结构](https://ar5iv.labs.arxiv.org/html/2301.02111/assets/codec.jpg)
*图 2：EnCodec 编解码器的离散化过程。24kHz 语音通过编码器降采样至 75Hz 的连续表示，再经 8 层残差向量量化（RVQ）得到离散 token 矩阵 $C \in \{0,...,1023\}^{8 \times T'}$，其中每层码本大小为 1024。*

![VALL-E 模型架构](https://ar5iv.labs.arxiv.org/html/2301.02111/assets/x1.png)
*图 3：VALL-E 的两阶段模型架构。左侧为自回归（AR）编解码器，逐 token 生成第 1 层量化码；右侧为非自回归（NAR）编解码器，并行生成第 2-8 层量化码。两者均以音素序列和声学 prompt 为条件。*

##### 算法伪代码

```python
# VALL-E 推理伪代码
# 输入: phoneme_seq (音素序列), prompt_audio (3秒参考语音)
# 模型: AR_decoder, NAR_decoder, EnCodec

# Step 0: 对 prompt 语音提取 EnCodec token
prompt_tokens = EnCodec.encode(prompt_audio)  # [8, T_prompt], 8层RVQ码

# Step 1: AR 模型 —— 自回归生成第1层编码
# 条件: 音素序列 x, prompt第1层token C̃[:,1]
# 输出: 目标语音第1层token C[:,1]
ar_input = concat(phoneme_embedding(x), prompt_tokens[0])  # 拼接prompt
C_layer1 = []
for t in range(max_length):
    # p(c_t,1 | C_{<t,1}, x, C̃_{:,1})
    logits = AR_decoder(ar_input, C_layer1)
    next_token = sample(logits, top_p=0.95)  # nucleus sampling
    if next_token == EOS:
        break
    C_layer1.append(next_token)

# Step 2: NAR 模型 —— 非自回归逐层生成第2-8层编码
C = [C_layer1]  # 已有第1层
for j in range(2, 9):  # 第2层到第8层
    # p(C_{:,j} | C_{:,<j}, x, C̃)
    # NAR模型使用层级嵌入区分不同量化层
    # 对前j-1层的嵌入求和作为声学输入
    acoustic_input = sum(Embedding_l(C[l]) for l in range(j-1))
    C_layer_j = NAR_decoder(phoneme_embedding(x), acoustic_input, 
                             prompt_tokens, layer_id=j)  # 并行输出所有时间步
    C.append(C_layer_j)

# Step 3: EnCodec 解码器将8层离散token还原为波形
C_matrix = stack(C)  # [8, T']
waveform = EnCodec.decode(C_matrix)  # 24kHz 语音波形
```

##### 动机与背景

传统 TTS 系统面临**零样本泛化能力不足**的核心挑战：

- **数据规模受限**：现有 TTS 模型通常在数百至数千小时的单/多说话人录音棚数据上训练，导致泛化到未见说话人时质量急剧下降
- **连续信号建模困难**：传统方法将 TTS 视为连续 mel 频谱图的回归任务，需要复杂的编码器-解码器-声码器流水线，且难以利用语言模型的强大建模能力
- **微调依赖**：现有说话人适应方法（如 speaker embedding、adapter 微调）需要额外的适应步骤，无法实现真正的零样本

VALL-E 的核心洞察是：**将语音视为一种"语言"**，通过神经编解码器将连续波形离散化为 token，就可以直接复用大语言模型的训练范式（大数据 + Transformer + 上下文学习），从而突破传统 TTS 的数据和架构瓶颈。

##### 方法详解

###### 1. 语音离散化：EnCodec 残差向量量化

VALL-E 使用 Meta 的 EnCodec 模型作为语音 tokenizer：

- **编码器**：将 24kHz 波形降采样 320 倍至 75Hz 的连续表示
- **残差向量量化（RVQ）**：8 层级联量化，每层码本大小 1024
  - 第 1 层捕获最重要的粗粒度信息（说话人身份、韵律）
  - 第 2-8 层逐步补充精细的声学细节
  - 总比特率：75 × 8 × 10 = 6000 bps
- **解码器**：从 8 层离散 token 重建 24kHz 波形

关键性质：RVQ 的层级结构天然适合分阶段生成——第 1 层最重要且依赖关系最强（适合 AR），后续层可基于前面层并行生成（适合 NAR）。

###### 2. 自回归（AR）模型：生成第 1 层编码

AR 模型是一个仅解码器的 Transformer，建模第 1 层 token 的条件分布：

$$p(C_{:,1} | \tilde{C}_{:,1}, x) = \prod_{t=0}^{T'} p(c_{t,1} | C_{<t,1}, \tilde{C}_{:,1}, x; \theta_{AR})$$

其中：
- $x = (x_0, ..., x_L)$：音素序列
- $\tilde{C}_{:,1}$：prompt 语音的第 1 层 token
- $C_{:,1} = (c_{0,1}, ..., c_{T',1})$：目标语音的第 1 层 token

模型结构细节：
- 音素序列和声学 token 共享同一个 Transformer，但使用不同的嵌入层
- 音素部分使用**双向注意力**（可看到完整文本），声学部分使用**因果注意力**（仅看到历史 token）
- Prompt 的声学 token $\tilde{C}_{:,1}$ 直接拼接在目标序列 $C_{:,1}$ 前面
- 训练目标：标准的交叉熵损失（next-token prediction）

###### 3. 非自回归（NAR）模型：生成第 2-8 层编码

NAR 模型同样是 Transformer 架构，但以非自回归方式并行生成每一层：

$$p(C_{:,2:8} | C_{:,1}, \tilde{C}, x) = \prod_{j=2}^{8} p(C_{:,j} | C_{:,<j}, \tilde{C}, x; \theta_{NAR})$$

模型结构细节：
- 8 个独立的声学嵌入层 $E_1, ..., E_8$，每层对应一个 RVQ 量化层
- 输入声学表示：前 $j-1$ 层嵌入的**逐元素求和** $\sum_{l=1}^{j-1} E_l(C_{:,l})$
- 使用**层级嵌入（layer embedding）**告知模型当前生成的是第几层
- Prompt 的完整 8 层 token $\tilde{C}$ 同样通过嵌入求和后拼接
- 所有位置使用**双向注意力**（NAR 无需因果约束）
- 训练时随机采样层 $j \in \{2,...,8\}$，仅计算该层的交叉熵损失

###### 4. 推理策略

- AR 阶段使用 **nucleus sampling**（top-p = 0.95），支持多样性生成
- NAR 阶段使用 **greedy decoding**（argmax），确保精细层的稳定性
- 最终将 8 层 token 送入 EnCodec 解码器重建波形

##### 实验设置

| 配置项 | 详情 |
|--------|------|
| **训练数据** | LibriLight 60K 小时（含 7000+ 说话人），使用现有 ASR 模型生成转录文本 |
| **音素化** | 使用 G2P 工具将文本转为音素序列 |
| **编解码器** | EnCodec 24kHz，8 层 RVQ，每层码本 1024，帧率 75Hz |
| **AR 模型** | 12 层 Transformer 解码器，16 头注意力，嵌入维度 1024，FFN 维度 4096，约 0.37B 参数 |
| **NAR 模型** | 12 层 Transformer 解码器，16 头注意力，嵌入维度 1024，FFN 维度 4096，约 0.37B 参数 |
| **优化器** | AdamW，学习率线性预热 + 逆平方根衰减 |
| **训练步数** | 800K 步（AR），400K 步（NAR） |
| **批大小** | 6K 声学 token / GPU |
| **硬件** | 16 × NVIDIA V100 32GB GPU |
| **评估数据** | LibriSpeech test-clean（续写任务），VCTK（跨数据集零样本） |

##### 实验结果

###### LibriSpeech 续写任务（Continuation）

| 模型 | WER ↓ | 说话人相似度 ↑ | SMOS ↑ | CMOS |
|------|-------|----------------|--------|------|
| Ground Truth | 2.2% | 0.754 | 4.09 | 0 |
| YourTTS | 7.7% | 0.510 | 2.41 | -0.52 |
| **VALL-E** | **5.9%** | **0.580** | **3.81** | **+0.12** |

- VALL-E 在所有指标上大幅超越 YourTTS 基线
- CMOS +0.12 表明 VALL-E 的合成质量甚至略优于真实语音的续写拼接
- WER 5.9% 接近真实语音的 2.2%，表明语音内容的准确性很高

###### VCTK 跨数据集零样本

| 模型 | WER ↓ | 说话人相似度 ↑ | SMOS ↑ |
|------|-------|----------------|--------|
| YourTTS | 9.2% | 0.337 | — |
| **VALL-E** | **6.2%** | **0.381** | **3.40** |

- 在完全未见过的 VCTK 数据集上，VALL-E 仍保持较好的零样本性能
- 说话人相似度从 0.337 提升至 0.381

###### Prompt 长度消融

| Prompt 长度 | WER ↓ | 说话人相似度 ↑ | SMOS ↑ |
|-------------|-------|----------------|--------|
| 原始 enrolled（完整句） | 3.8% | 0.617 | — |
| 3 秒 | 5.9% | 0.580 | 3.81 |

- 更长的 prompt 提供更多说话人信息，可进一步提升性能

##### 消融实验

论文通过以下消融验证了关键设计选择：

1. **AR+NAR vs 纯 AR**：纯 AR 模型（逐层自回归生成所有 8 层）的推理速度极慢（8 倍），且后续层的自回归建模收益递减。AR+NAR 的两阶段设计在质量和效率间取得最优平衡。

2. **Prompt 长度影响**：3 秒 prompt 已足够捕获说话人特征（相似度 0.580），但更长的 prompt（完整句子）可将相似度提升至 0.617。

3. **采样策略**：AR 阶段使用 nucleus sampling（top-p=0.95）相比 greedy decoding 能生成更自然、更多样的语音，但 WER 略有上升。

4. **数据规模**：60K 小时的大规模数据是零样本能力的关键——论文指出这是首个在如此大规模数据上训练的 TTS 模型，数据规模比此前系统大数百倍。

##### 关键公式

**AR 模型目标函数（第 1 层自回归生成）：**

$$\mathcal{L}_{AR} = -\sum_{t=1}^{T'} \log p(c_{t,1} | c_{<t,1}, \tilde{C}_{:,1}, x; \theta_{AR})$$

**NAR 模型目标函数（第 j 层非自回归生成）：**

$$\mathcal{L}_{NAR} = -\sum_{t=1}^{T'} \log p(c_{t,j} | C_{:,<j}, \tilde{C}, x; \theta_{NAR}), \quad j \sim \text{Uniform}\{2,...,8\}$$

**声学嵌入融合（NAR 输入构造）：**

$$e_t = \sum_{l=1}^{j-1} E_l(c_{t,l})$$

其中 $E_l$ 为第 $l$ 层的嵌入矩阵，$c_{t,l}$ 为时间步 $t$ 第 $l$ 层的量化码。

### MusicGen

```yaml
id: musicgen
num: 14
name: MusicGen
full_name: 'MusicGen: 简单可控音乐生成 (Simple and Controllable Music Generation)'
year: '2023'
org: Meta
parent: encodec
paper_url: https://arxiv.org/abs/2306.05284
project_url: ''
category: music_gen
motivation: 单Transformer可控音乐生成
```

#### 📝 一句话总结
MusicGen 的核心目标是：单Transformer可控音乐生成。

#### 🎯 核心要点
- 核心动机：单Transformer可控音乐生成
- 演化来源：继承或改进自 encodec
- 代表机构：Meta

#### 🔬 深入细节
单Transformer可控音乐生成


### TANGO

```yaml
id: tango
num: 15
name: TANGO
full_name: 'TANGO: 文本到音频生成 (Text-to-Audio Generation using Instruction Guided Latent Diffusion Model)'
year: '2023'
org: 多机构
parent: audioldm
paper_url: https://arxiv.org/abs/2304.13731
project_url: ''
category: audio_effect
motivation: 指令微调潜在扩散音效生成
```

#### 📝 一句话总结
TANGO 的核心目标是：指令微调潜在扩散音效生成。

#### 🎯 核心要点
- 核心动机：指令微调潜在扩散音效生成
- 演化来源：继承或改进自 audioldm
- 代表机构：多机构

#### 🔬 深入细节
指令微调潜在扩散音效生成


### Mega-TTS

```yaml
id: megatts
num: 16
name: Mega-TTS
full_name: 'Mega-TTS: 零样本大规模TTS (Mega-TTS: Zero-Shot Text-to-Speech at Scale)'
year: '2023'
org: 多机构
parent: valle
paper_url: https://arxiv.org/abs/2306.03509
project_url: ''
category: voice_clone
motivation: 扩散韵律建模长文本合成
```

#### 📝 一句话总结
Mega-TTS 的核心目标是：扩散韵律建模长文本合成。

#### 🎯 核心要点
- 核心动机：扩散韵律建模长文本合成
- 演化来源：继承或改进自 valle
- 代表机构：多机构

#### 🔬 深入细节
扩散韵律建模长文本合成


### AudioLDM 2

```yaml
id: audioldm2
num: 17
name: AudioLDM 2
full_name: 'AudioLDM 2: 通用音频生成 (AudioLDM 2: Learning Holistic Audio Generation with Self-supervised Pretraining)'
year: '2024'
org: Surrey
parent: audioldm
paper_url: https://arxiv.org/abs/2308.05734
project_url: ''
category: audio_effect
motivation: 自监督音频语言表示学习
```

#### 📝 一句话总结
AudioLDM 2 的核心目标是：自监督音频语言表示学习。

#### 🎯 核心要点
- 核心动机：自监督音频语言表示学习
- 演化来源：继承或改进自 audioldm
- 代表机构：Surrey

#### 🔬 深入细节
自监督音频语言表示学习


### VALL-E 2

```yaml
id: valle2
num: 18
name: VALL-E 2
full_name: 'VALL-E 2: 人类水平零样本TTS (VALL-E 2: Neural Codec Language Models are Human Parity Zero-Shot Text to Speech Synthesizers)'
year: '2024'
org: Microsoft
parent: valle
paper_url: https://www.microsoft.com/en-us/research/project/vall-e-x/vall-e-2/
project_url: ''
category: voice_clone
motivation: 重复感知采样达人类水平TTS
```

#### 📝 一句话总结
VALL-E 2 的核心目标是：重复感知采样达人类水平TTS。

#### 🎯 核心要点
- 核心动机：重复感知采样达人类水平TTS
- 演化来源：继承或改进自 valle
- 代表机构：Microsoft

#### 🔬 深入细节
重复感知采样达人类水平TTS


### T-Foley

```yaml
id: tfoley
num: 19
name: T-Foley
full_name: 'T-Foley: 可控波形域扩散Foley (T-Foley: A Controllable Waveform-Domain Diffusion Model)'
year: '2024'
org: 多机构
parent: tango
paper_url: https://ieeexplore.ieee.org/abstract/document/10447380/
project_url: ''
category: audio_effect
motivation: 时间事件引导扩散Foley合成
```

#### 📝 一句话总结
T-Foley 提出了 Block-FiLM 条件化机制，将**时间事件特征（RMS 包络）**作为显式条件注入波形域扩散模型，首次实现了对 Foley 音效合成中声音事件时序的精确控制，同时支持人声模仿作为直觉化输入接口。

#### 🎯 核心要点
- **波形域扩散架构**：基于 DAG（Full-band General Audio Synthesis）的 UNet 结构，含双向 LSTM 瓶颈层，直接在波形域生成高保真音频，无需预训练声码器
- **双重条件化**：声音类别（class embedding）通过标准 FiLM 注入，时间事件特征（RMS 包络）通过 Block-FiLM 注入，前半部分下/上采样块用 FiLM，后半部分用 Block-FiLM
- **Block-FiLM（BFiLM）**：对 TFiLM 的简化——将序列建模层（LSTM）替换为逐块 MLP，利用 UNet 瓶颈处的 LSTM 承担跨块时序建模，参数量减少 ~30%（74M vs 101M），推理速度提升 ~27%
- **RMS 包络作为时间事件特征**：帧级均方根能量（W=512, h=128），相比 onset/offset 更适合无明确起止的声音类别（如雨声、喷嚏）
- **Event-L1 距离**：新提出的客观评估指标，衡量生成音频与目标时间事件特征之间的 L1 距离
- **人声模仿接口**：支持从人声模仿（Vocal Imitation Set / VocalSketch）中提取 RMS 作为条件，实现直觉化控制
- **数据集**：DCASE 2023 Foley Sound Synthesis 任务数据集，7 类声音（DogBark, Footstep, GunShot, Keyboard, MovingMotorVehicle, Rain, Sneeze_Cough），约 5k 样本 / 5.4 小时

#### 🔬 深入细节
##### 任务定义与动机

![T-Foley 任务示意图](https://ar5iv.labs.arxiv.org/html/2401.09294/assets/task.png)
*图 1：时间事件引导的 Foley 音效合成任务。给定声音类别和时间事件条件（如 RMS 包络），生成时序对齐的 Foley 音效。*

Foley 音效是影视后期制作中由拟音师手工创建的、与画面同步的声音效果。传统 Foley 合成方法主要关注**声音类别**条件（生成"什么声音"），但忽略了**时间维度**的控制（"何时发声"以及"声音的时间包络如何"）。

现有方法的局限：
- **文本引导方法**（如 AudioLDM、DiffSound）：文本描述难以精确表达时间信息
- **视频引导方法**（如 SpecVQGAN、FoleyGAN）：依赖视频输入，且时间对齐效果有限
- **无条件/类别条件方法**（如 DAG、CRASH）：无法控制声音事件的时序

T-Foley 的核心思路：**将时间事件特征（temporal event feature）作为独立的显式条件**，与声音类别共同引导波形扩散过程。

##### 模型架构

![T-Foley 模型架构](https://ar5iv.labs.arxiv.org/html/2401.09294/assets/model_arch.png)
*图 2：(a) T-Foley 整体架构。UNet 的前半部分下/上采样块使用 FiLM 注入类别+扩散时间步条件，后半部分使用 Block-FiLM 注入时间事件条件。(b) Block-FiLM 的工作原理。*

T-Foley 的架构基于 DAG 模型的 UNet 设计：

1. **编码器（下采样路径）**：将含噪波形 \(\mathbf{x}\) 逐层下采样为潜在向量
2. **瓶颈层**：双向 LSTM，维护样本内的音色一致性，同时承担跨时间块的序列建模
3. **解码器（上采样路径）**：通过线性投影调整尺寸后逐层上采样，输出噪声预测 \(\hat{\epsilon}\)

**条件注入策略**：UNet 的每个下/上采样块分为两部分：
- **前半部分**：使用标准 **FiLM** 注入扩散时间步 \(\sigma\) 和声音类别 \(\mathbf{c}\)
- **后半部分**：使用 **Block-FiLM** 注入时间事件特征 \(T\)（RMS 包络）

##### 时间事件特征：RMS 包络

时间事件特征采用帧级 RMS（Root Mean Square）能量：

$$E_i(x) = \sqrt{\frac{1}{W} \sum_{t=ih}^{ih+W} x^2(t)}$$

其中 \(x(t)\) 为音频波形，\(W=512\) 为窗口大小，\(h=128\) 为跳步大小。

> 💡 **为什么选择 RMS 而非 onset/offset？** 论文实验发现 RMS 和 power（RMS 的平方）效果相当，但 onset/offset 对某些声音类别（如雨声、喷嚏）不适用——这些声音没有明确的起止点，但有随时间变化的强度包络。RMS 能统一表征所有类型声音的时间模式。

##### Block-FiLM 核心机制

Block-FiLM 是论文的核心技术创新，它是对 TFiLM（Temporal FiLM）的高效简化。

**标准 FiLM** 对整个特征图施加全局仿射变换：

$$\text{FiLM}(\mathbf{x}, \mathbf{y}, \gamma, \beta) = \gamma \odot \mathbf{x} + \beta$$

其中 \(\gamma, \beta = \text{MLP}(\mathbf{y})\)，\(\gamma, \beta \in \mathbb{R}^{C_{out}}\) 是**通道级**参数，不区分时间维度。

**TFiLM** 将特征图沿时间轴分为 \(N\) 个块，每个块有独立的仿射参数：

$$\text{TFiLM}(\mathbf{x}, \mathbf{y}) = \text{Concat}\left[\gamma_i \cdot \mathbf{1}_d^T \odot X_{b_i} + \beta_i \cdot \mathbf{1}_d^T\right]_{i=1}^{N}$$

其中 \((\gamma_i, \beta_i) = \text{LSTM}(Y_{b_i}^{\text{pool}})\)，使用 LSTM 建模块间时序依赖。

**Block-FiLM** 的关键简化——**用 MLP 替换 LSTM**：

$$(\gamma_i, \beta_i) = \text{MLP}(Y_{b_i}^{\text{pool}})$$

```python
# Block-FiLM 伪代码
def block_film(x, y_temporal, N_blocks):
    """
    x: 待调制特征 [C_out, L_out]
    y_temporal: 时间事件特征(RMS) [C_in, L_in]  
    N_blocks: 块数量
    """
    # 将时间事件特征分为 N 个块并池化
    y_blocks = split_and_pool(y_temporal, N_blocks)  # [N, C_in]
    
    # 将待调制特征分为 N 个块
    x_blocks = split(x, N_blocks)  # [N, C_out, d]  d = L_out / N
    
    output = []
    for i in range(N_blocks):
        # 每个块独立计算仿射参数（无跨块序列建模）
        gamma_i, beta_i = MLP(y_blocks[i])  # 各 [C_out]
        
        # 块级仿射变换
        x_mod = gamma_i[:, None] * x_blocks[i] + beta_i[:, None]
        output.append(x_mod)
    
    return concat(output, dim=-1)  # [C_out, L_out]
```

> 💡 **为什么 Block-FiLM 能省去 LSTM？** 论文的关键洞察是：RMS 包络中嵌入的时间事件具有**弱依赖性**——例如 t=1.3s 处的枪声事件不影响 t=3s 处的另一个事件。因此块间的序列建模并非必要。而 UNet 瓶颈处已有的双向 LSTM 足以在全局层面处理跨块的时序一致性。这种"分工"设计使 Block-FiLM 以更少参数（74M vs TFiLM 的 101M）和更快推理（9.5s vs 13s）取得更好性能。

##### 块数量的权衡

![块数量权衡](https://ar5iv.labs.arxiv.org/html/2401.09294/assets/block_tradeoff.png)
*图 3：不同块数量 N 在性能（E-L1、FAD-P）和效率（推理时间）之间的权衡。*

块数量 \(N\) 控制时间条件的分辨率：
- **更多块**（如 N=245）→ 更精细的时间控制，E-L1 更低，但推理更慢
- **更少块**（如 N=7）→ 更平滑的条件，效率更高，但时间精度下降
- 论文选择 **N=49** 作为精度与效率的最佳平衡点

##### 训练与推理

**训练配置**：
- 方差保持（VP）余弦调度的连续时间 L2 噪声预测损失
- Classifier-free guidance：训练时以 \(p=0.1\) 随机丢弃条件
- 500 epoch 训练
- 数据：22,050 Hz 单声道，4 秒时长

**推理**：采用 DDPM 风格的 SDE 离散化 + classifier-free guidance

##### 实验结果

| 模型 | 参数量 | 推理时间 | E-L1↓ | FAD-P↓ | FAD-V↓ | IS↑ |
|------|--------|---------|-------|--------|--------|-----|
| Real data | - | - | 0.0 | 22.81 | 4.06 | 2.18 |
| DAG (无时间条件) | 87M | 12s | 0.2212 | 53.94 | 36.10 | 1.46 |
| T-Foley (FiLM) | 83M | 6.3s | 0.0772 | 54.59 | 36.06 | 1.94 |
| T-Foley (TFiLM) | 101M | 13s | 0.0469 | 49.44 | 36.10 | 1.74 |
| **T-Foley (BFiLM)** | **74M** | **9.5s** | **0.0367** | **41.59** | **36.09** | 1.79 |

> ⚠️ **注意**：FiLM 的 IS 值较高可能是因为生成了多样但低质量的音频（与真实数据分布偏离较大），而非真正的质量优势。

主观评估（MOS，23 名参与者）：

| 模型 | 类别保真度↑ | 时间保真度↑ | 音频质量↑ |
|------|-----------|-----------|---------|
| FiLM | 3.85±0.12 | 4.11±0.10 | 3.28±0.11 |
| TFiLM | 4.02±0.11 | 4.00±0.13 | 3.75±0.11 |
| **BFiLM** | **4.22±0.11** | **4.41±0.09** | **4.06±0.10** |

BFiLM 在所有三个主观指标上均显著优于 FiLM 和 TFiLM。

##### 人声模仿控制

![生成样本示例](https://ar5iv.labs.arxiv.org/html/2401.09294/assets/event-guided_samples.png)
*图 4：第一行为用于提取目标事件特征的控制声音，后续行为不同类别的生成结果。生成音频的 RMS 包络与控制信号高度对齐。*

T-Foley 支持从**人声模仿**中提取 RMS 包络作为条件输入。用户只需用嘴模仿目标声音的节奏和强度模式，模型即可生成对应类别的、时序对齐的 Foley 音效。这为影视后期制作提供了极为直觉化的交互方式。

##### 与传统方法的核心区别

| 维度 | 传统方法 | T-Foley |
|------|---------|---------|
| 时间控制 | 无显式时间条件 | RMS 包络作为显式时间事件条件 |
| 条件化方式 | 全局 FiLM | 双重条件：FiLM（类别）+ Block-FiLM（时间） |
| 生成域 | 多为频谱域+声码器 | 直接波形域生成 |
| 交互方式 | 文本/视频 | 支持人声模仿的直觉化输入 |
| 评估指标 | FAD/IS | 新增 Event-L1 衡量时间保真度 |

#### 🧪 练习题
```yaml
question: "T-Foley 中 Block-FiLM 相比 TFiLM 的核心简化是什么？"
options:
  - "将块级仿射变换替换为全局仿射变换"
  - "用 MLP 替换 LSTM 进行块级参数生成，依赖瓶颈层 LSTM 处理跨块时序"
  - "减少块的数量以降低计算复杂度"
  - "将 RMS 特征替换为 onset/offset 特征以简化输入"
answer: 1
explain: "Block-FiLM 的核心简化是将 TFiLM 中用于块间序列建模的 LSTM 替换为独立的 MLP，因为时间事件间具有弱依赖性，而 UNet 瓶颈处已有的双向 LSTM 足以处理全局时序一致性。"
```

### WavTokenizer

```yaml
id: wavtokenizer
num: 20
name: WavTokenizer
full_name: 'WavTokenizer: 高效声学离散编解码器 (WavTokenizer: An Efficient Acoustic Discrete Codec Tokenizer)'
year: '2025'
org: 多机构
parent: encodec
paper_url: https://proceedings.iclr.cc/paper_files/paper/2025/hash/ea1f5f0878d43ff4fb8bf64ef4a2326c-Abstract-Conference.html
project_url: ''
category: neural_codec
motivation: 单层Codebook高效Token化
```

#### 📝 一句话总结
WavTokenizer 的核心目标是：单层Codebook高效Token化。

#### 🎯 核心要点
- 核心动机：单层Codebook高效Token化
- 演化来源：继承或改进自 encodec
- 代表机构：多机构

#### 🔬 深入细节
单层Codebook高效Token化


### F5-TTS

```yaml
id: f5tts
num: 21
name: F5-TTS
full_name: 'F5-TTS: Flow Matching扩散TTS (F5-TTS: A Fairytaler that Fakes Fluent and Faithful Speech with Flow Matching)'
year: '2025'
org: 多机构
parent: vits
paper_url: https://arxiv.org/abs/2410.06885
project_url: ''
category: tts
motivation: Flow Matching+DiT非自回归
```

#### 📝 一句话总结
F5-TTS 的核心目标是：Flow Matching+DiT非自回归。

#### 🎯 核心要点
- 核心动机：Flow Matching+DiT非自回归
- 演化来源：继承或改进自 vits
- 代表机构：多机构

#### 🔬 深入细节
Flow Matching+DiT非自回归


### DiTTo-TTS

```yaml
id: dittotts
num: 22
name: DiTTo-TTS
full_name: 'DiTTo-TTS: 扩散Transformer TTS (DiTTo-TTS: Efficient and Scalable Zero-Shot Text-to-Speech with Diffusion Transformer)'
year: '2025'
org: KRAFTON/NVIDIA
parent: f5tts
paper_url: https://arxiv.org/abs/2406.11427
project_url: ''
category: tts
motivation: 无音素扩散Transformer零样本
```

#### 📝 一句话总结
DiTTo-TTS 的核心目标是：无音素扩散Transformer零样本。

#### 🎯 核心要点
- 核心动机：无音素扩散Transformer零样本
- 演化来源：继承或改进自 f5tts
- 代表机构：KRAFTON/NVIDIA

#### 🔬 深入细节
无音素扩散Transformer零样本


### CosyVoice 3

```yaml
id: cosyvoice3
num: 23
name: CosyVoice 3
full_name: 'CosyVoice 3: 可扩展多语言多任务语音生成 (CosyVoice 3: Scalable Multilingual and Multitask Speech Generation)'
year: '2026.01'
org: 阿里巴巴
parent: f5tts
paper_url: https://github.com/FunAudioLLM/CosyVoice
project_url: ''
category: tts
motivation: RL优化双向流式多语言TTS
```

#### 📝 一句话总结
CosyVoice 3 的核心目标是：RL优化双向流式多语言TTS。

#### 🎯 核心要点
- 核心动机：RL优化双向流式多语言TTS
- 演化来源：继承或改进自 f5tts
- 代表机构：阿里巴巴

#### 🔬 深入细节
RL优化双向流式多语言TTS


### X-Voice

```yaml
id: xvoice
num: 24
name: X-Voice
full_name: 'X-Voice: 30语言零样本克隆 (X-Voice: Enabling Everyone to Speak 30 Languages via Zero-Shot Cross-Lingual Voice Cloning)'
year: '2026.05'
org: 多机构
parent: valle2
paper_url: https://arxiv.org/abs/2605.05611
project_url: ''
category: voice_clone
motivation: 30语言零样本跨语言克隆
```

#### 📝 一句话总结
X-Voice 的核心目标是：30语言零样本跨语言克隆。

#### 🎯 核心要点
- 核心动机：30语言零样本跨语言克隆
- 演化来源：继承或改进自 valle2
- 代表机构：多机构

#### 🔬 深入细节
30语言零样本跨语言克隆


### Marco-Voice

```yaml
id: marcovoice
num: 25
name: Marco-Voice
full_name: 'Marco-Voice: 统一表达性语音合成 (Marco-Voice: A Unified Framework for Expressive Speech Synthesis)'
year: '2026'
org: 多机构
parent: valle2
paper_url: https://ieeexplore.ieee.org/abstract/document/11463753/
project_url: ''
category: voice_clone
motivation: 统一表达性语音合成框架
```

#### 📝 一句话总结
Marco-Voice 的核心目标是：统一表达性语音合成框架。

#### 🎯 核心要点
- 核心动机：统一表达性语音合成框架
- 演化来源：继承或改进自 valle2
- 代表机构：多机构

#### 🔬 深入细节
统一表达性语音合成框架


### AudioX

```yaml
id: audiox
num: 26
name: AudioX
full_name: 'AudioX: 万物转音频 (AudioX: Diffusion Transformer for Anything-to-Audio Generation)'
year: '2026.03'
org: 多机构
parent: audioldm2
paper_url: https://arxiv.org/abs/2503.10522
project_url: ''
category: audio_effect
motivation: DiT万物转音频多模态生成
```

#### 📝 一句话总结
AudioX 的核心目标是：DiT万物转音频多模态生成。

#### 🎯 核心要点
- 核心动机：DiT万物转音频多模态生成
- 演化来源：继承或改进自 audioldm2
- 代表机构：多机构

#### 🔬 深入细节
DiT万物转音频多模态生成


### AudioGen-Omni

```yaml
id: audiogenomni
num: 27
name: AudioGen-Omni
full_name: 'AudioGen-Omni: 统一多模态音频生成 (AudioGen-Omni: A Unified Multimodal Diffusion Transformer)'
year: '2026'
org: 多机构
parent: audiox
paper_url: https://ieeexplore.ieee.org/abstract/document/11461581/
project_url: ''
category: audio_effect
motivation: MM-DiT统一多模态音频生成
```

#### 📝 一句话总结
AudioGen-Omni 的核心目标是：MM-DiT统一多模态音频生成。

#### 🎯 核心要点
- 核心动机：MM-DiT统一多模态音频生成
- 演化来源：继承或改进自 audiox
- 代表机构：多机构

#### 🔬 深入细节
MM-DiT统一多模态音频生成


### OmniCodec

```yaml
id: omnicodec
num: 28
name: OmniCodec
full_name: 'OmniCodec: 低帧率通用编解码器 (OmniCodec: Low Frame Rate Universal Audio Codec with Semantic-Acoustic Disentanglement)'
year: '2026.03'
org: 多机构
parent: wavtokenizer
paper_url: https://arxiv.org/abs/2603.20638
project_url: ''
category: neural_codec
motivation: 低帧率语义声学解耦编解码
```

#### 📝 一句话总结
OmniCodec 提出了一种全域通用神经音频编解码器，通过将预训练 Qwen3-Omni-AuT-Encoder 的语义知识蒸馏到第一层码本、其余码本专注声学重建的双分支解耦架构，并引入自引导（Self-Guidance）机制提升码本利用率，在语音、音乐和通用声音三个领域均实现了优于 Mimi codec 的重建质量与语义保持能力。

#### 🎯 核心要点
- **全域通用编解码器**：单一模型同时处理语音（Speech）、音乐（Music）和通用声音（Sound）三个领域，训练数据达 160K 小时
- **双分支架构**：语义分支（Semantic Branch）利用冻结的 Qwen3-Omni-AuT-Encoder 提取语义表示，声学分支（Acoustic Branch）基于 SEANet 编码器提取声学特征
- **语义-声学解耦**：第一层码本通过语义向量量化器（Semantic VQ）编码语义信息，后续 31 层残差向量量化器（RVQ）专注声学细节重建
- **解耦适配器（Decoupled Adapters）**：两个独立适配器分别将语义和声学表示映射到解码器输入空间，避免信息耦合
- **自引导损失（Self-Guidance Loss）**：利用码本自身的量化误差信号引导训练，提升码本利用率（从 0.974 到 0.982）并稳定训练过程
- **极低帧率**：支持 12.5 Hz 和 6.25 Hz 的 token 速率，在极低比特率下保持高质量重建
- **因果 Transformer 解码器**：8 层因果 Transformer 增强解码器的序列建模能力
- **实验结果**：在 LibriSpeech、GTZAN、AudioSet 等基准上，重建质量和语义保持均优于 Mimi codec 和 DAC 等基线

#### 🔬 深入细节
##### 模型整体架构

![OmniCodec 模型架构图](https://ar5iv.labs.arxiv.org/html/2603.20638/assets/x1.png)
*图 1：OmniCodec 模型架构。上方语义分支利用冻结的 Qwen3-Omni-AuT-Encoder 提取语义表示，下方声学分支通过 SEANet 编码器提取声学特征，两者分别经过解耦适配器后送入 SEANet 解码器进行重建。*

OmniCodec 的核心设计思想是**将语义理解与声学重建解耦到不同的码本层级**。整体架构包含以下关键组件：

1. **语义分支（Semantic Branch）**：冻结的 Qwen3-Omni-AuT-Encoder（来自预训练多模态理解模型）提取 12.5 Hz 的语义隐藏表示
2. **声学分支（Acoustic Branch）**：SEANet 编码器以分层下采样比 \([8, 6, 5, 4]\) 或 \([12, 8, 5, 4]\) 将 24 kHz 音频压缩到 12.5 Hz 或 6.25 Hz
3. **向量量化层**：语义 VQ（codebook size 2048, dim 1024）+ 31 层声学 RVQ（codebook size 2048, dim 256）
4. **因果 Transformer**：8 层、8 头、dim 512 的因果 Transformer 增强解码能力
5. **SEANet 解码器**：将量化后的表示上采样重建为波形

##### 核心算法流程

```python
# OmniCodec 编码-解码伪代码
def encode(audio):
    # 语义分支：冻结的预训练编码器
    semantic_repr = qwen3_omni_aut_encoder(audio)  # [B, T/downsample, D_sem]
    semantic_tokens = semantic_vq(semantic_repr)     # 第1层码本, codebook=2048

    # 声学分支：SEANet 编码器
    acoustic_repr = seanet_encoder(audio)            # [B, T/downsample, D_aco]
    acoustic_tokens = rvq(acoustic_repr, layers=31)  # 第2~32层码本

    return semantic_tokens, acoustic_tokens

def decode(semantic_tokens, acoustic_tokens):
    # 解耦适配器：独立映射语义和声学表示
    sem_embed = adapter_semantic(semantic_vq.lookup(semantic_tokens))
    aco_embed = adapter_acoustic(rvq.lookup(acoustic_tokens))

    # 融合后送入因果 Transformer + SEANet 解码器
    combined = sem_embed + aco_embed
    enhanced = causal_transformer(combined)
    waveform = seanet_decoder(enhanced)
    return waveform
```

##### 语义-声学解耦机制

OmniCodec 的核心创新在于**利用预训练多模态理解模型的语义知识**来指导编解码器的第一层码本学习。

**为什么需要解耦？** 传统神经编解码器（如 EnCodec、DAC）的所有码本层级混合编码语义和声学信息，导致下游语言模型难以高效建模。理想情况下，第一层码本应捕获高层语义（如语音内容、音乐结构），后续码本逐层补充声学细节（如音色、混响）。

**语义分支的设计**：OmniCodec 选择 Qwen3-Omni 的音频理解编码器（AuT-Encoder）作为语义教师。该编码器在大规模多模态数据上预训练，具备跨语音、音乐、声音的通用语义理解能力。其输出以 12.5 Hz 的速率产生隐藏表示，通过语义向量量化器离散化为第一层码本：

$$\mathbf{z}_{\text{sem}} = \text{VQ}(\text{AuT-Encoder}(\mathbf{x})), \quad \text{codebook size} = 2048$$

**声学分支的设计**：SEANet 编码器独立提取声学特征，经过 31 层 RVQ 逐步量化。每层 RVQ 量化前一层的残差：

$$\mathbf{r}_0 = \mathbf{z}_{\text{aco}}, \quad \mathbf{r}_i = \mathbf{r}_{i-1} - \text{VQ}_i(\mathbf{r}_{i-1}), \quad i = 1, \ldots, 31$$

**解耦适配器**：为防止语义和声学信息在解码端重新耦合，OmniCodec 设计了两个独立的适配器网络（Decoupled Adapter 1 和 Adapter 2），分别将语义量化表示和声学量化表示映射到解码器的输入空间后相加：

$$\mathbf{h}_{\text{dec}} = \text{Adapter}_1(\hat{\mathbf{z}}_{\text{sem}}) + \text{Adapter}_2(\hat{\mathbf{z}}_{\text{aco}})$$

> 💡 **关键**：解耦适配器的存在至关重要。消融实验表明，移除 Adapter 1 会导致 PPL 略微上升且重建指标下降，说明独立的映射路径有效防止了语义信息被声学细节"淹没"。

##### 自引导损失（Self-Guidance Loss）

传统 VQ 训练中常见的问题是**码本利用率低**（codebook collapse），即大量码字从未被使用。OmniCodec 提出自引导损失来缓解这一问题。

核心思想是：**利用量化误差本身作为额外的监督信号**。具体而言，在训练过程中，模型计算每个码本层级的量化残差，并将其作为自监督目标引导编码器产生更均匀分布的表示：

$$\mathcal{L}_{\text{sg}} = \sum_{i=1}^{N} \|\text{sg}[\mathbf{z}_i] - \mathbf{e}_i\|_2^2 + \beta \|\mathbf{z}_i - \text{sg}[\mathbf{e}_i]\|_2^2$$

其中 \(\text{sg}[\cdot]\) 表示停止梯度操作，\(\mathbf{e}_i\) 是最近码字，\(\beta\) 是承诺损失系数。自引导机制在此基础上额外引入码本间的协调信号，使得不同层级的量化器协同工作。

> ⚠️ **注意**：消融实验显示，不使用自引导损失时，码本利用率从 0.982 降至 0.974，同时重建指标也出现轻微下降，验证了该机制对训练稳定性和码本利用率的双重贡献。

##### 训练细节与损失函数

OmniCodec 的总训练损失包含多个组件：

$$\mathcal{L}_{\text{total}} = \lambda_t \mathcal{L}_{\text{time}} + \lambda_f \mathcal{L}_{\text{freq}} + \lambda_g \mathcal{L}_{\text{GAN}} + \lambda_{\text{feat}} \mathcal{L}_{\text{feat}} + \lambda_{\text{vq}} \mathcal{L}_{\text{vq}} + \lambda_{\text{sem}} \mathcal{L}_{\text{sem}} + \lambda_{\text{sg}} \mathcal{L}_{\text{sg}}$$

各损失项说明：
- **\(\mathcal{L}_{\text{time}}\)**：时域 L1 损失，约束波形重建
- **\(\mathcal{L}_{\text{freq}}\)**：多分辨率 STFT 频域损失
- **\(\mathcal{L}_{\text{GAN}}\)**：对抗损失（使用多尺度判别器），提升感知质量
- **\(\mathcal{L}_{\text{feat}}\)**：判别器特征匹配损失
- **\(\mathcal{L}_{\text{vq}}\)**：向量量化承诺损失
- **\(\mathcal{L}_{\text{sem}}\)**：语义蒸馏损失，约束第一层码本对齐预训练语义表示
- **\(\mathcal{L}_{\text{sg}}\)**：自引导损失

训练配置：
- 全局 batch size 24，梯度累积 2，4 × A100 GPU
- AdamW 优化器，峰值学习率 1e-4，2.5K 步线性预热 + 500K 步余弦衰减
- 模型约 134M 参数
- 训练数据：160K 小时（Emilia 语音数据集 + 内部数据集 + AudioSet）
- 量化器 dropout 用于 RVQ 层，支持可变比特率

##### 与现有方法的对比

| 特性 | EnCodec/DAC | Mimi codec | OmniCodec |
|------|------------|------------|-----------|
| 语义-声学解耦 | ❌ 混合编码 | ✅ WavLM 蒸馏 | ✅ Qwen3-Omni 蒸馏 |
| 支持领域 | 主要语音 | 语音为主 | 语音+音乐+通用声音 |
| 语义教师 | 无 | WavLM（语音专用） | Qwen3-Omni-AuT-Encoder（全域） |
| 自引导机制 | ❌ | ❌ | ✅ |
| 因果 Transformer | ❌ | ✅ | ✅ |
| 最低帧率 | 75 Hz | 12.5 Hz | 6.25 Hz |

> 💡 **关键区别**：Mimi codec 使用 WavLM 作为语义教师，WavLM 基于 BERT 架构和掩码自监督学习，在语音领域的语义捕获能力极强，但在音乐和通用声音领域泛化有限。OmniCodec 选择 Qwen3-Omni 的音频编码器作为教师，该模型在多模态理解任务上预训练，天然具备跨领域语义理解能力。实验表明，OmniCodec 在音乐和通用声音的 PPL 指标上优于 Mimi，但在纯语音领域略逊，这与 WavLM 在语音精细语音学特征上的优势一致。

##### 实验结果亮点

**重建质量**（LibriSpeech test-clean，16 层 RVQ）：
- OmniCodec-16L 在 PESQ（3.04）、STOI（0.941）上均优于 Mimi codec-16L（PESQ 2.59, STOI 0.924）
- 主观评测 N-MOS 达 3.86±0.06，显著优于 Mimi 的 3.51±0.07

**语义保持**（LLM PPL 评测）：
- 音乐领域 PPL0：OmniCodec 4.14 vs Mimi 4.43
- 通用声音领域 PPL0：OmniCodec 3.32 vs Mimi 3.74
- 语音领域 PPL0：OmniCodec 10.02 vs Mimi 8.73（Mimi 因 WavLM 优势略优）

#### 🧪 练习题
```yaml
question: "OmniCodec 中自引导损失（Self-Guidance Loss）的主要作用是什么？"
options:
  - "提升语义分支的语义捕获能力"
  - "提高码本利用率并稳定训练过程"
  - "加速模型收敛速度"
  - "降低模型参数量以提升推理效率"
answer: 1
explain: "自引导损失利用码本自身的量化误差信号引导训练，使码本利用率从 0.974 提升至 0.982，同时稳定训练过程并轻微改善重建指标。"
```

### UniAudio 2.0

```yaml
id: uniaudio2
num: 29
name: UniAudio 2.0
full_name: 'UniAudio 2.0: 统一音频语言模型 (UniAudio 2.0: A Unified Audio Language Model)'
year: '2026.02'
org: 字节跳动
parent: valle2
paper_url: https://arxiv.org/abs/2602.04683
project_url: ''
category: tts
motivation: 因子化Token统一音频框架
```

#### 📝 一句话总结
UniAudio 2.0 的核心目标是：因子化Token统一音频框架。

#### 🎯 核心要点
- 核心动机：因子化Token统一音频框架
- 演化来源：继承或改进自 valle2
- 代表机构：字节跳动

#### 🔬 深入细节
因子化Token统一音频框架


### Fish Audio S2

```yaml
id: fishaudio_s2
num: 30
name: Fish Audio S2
full_name: 'Fish Audio S2: 高保真情感TTS (Fish Audio S2: High-Fidelity Emotional Text-to-Speech)'
year: '2026'
org: Fish Audio
parent: f5tts
paper_url: https://github.com/fishaudio/fish-speech
project_url: ''
category: tts
motivation: 50+情感标签高保真TTS
```

#### 📝 一句话总结
Fish Audio S2 的核心目标是：50+情感标签高保真TTS。

#### 🎯 核心要点
- 核心动机：50+情感标签高保真TTS
- 演化来源：继承或改进自 f5tts
- 代表机构：Fish Audio

#### 🔬 深入细节
50+情感标签高保真TTS


### Stable Audio 2.5

```yaml
id: stableaudio25
num: 31
name: Stable Audio 2.5
full_name: 'Stable Audio 2.5: 企业级音频生成 (Stable Audio 2.5: Enterprise Sound Production)'
year: '2026'
org: Stability AI
parent: musicgen
paper_url: https://www.stability.ai/news/stable-audio-2-5-enterprise-sound-production
project_url: ''
category: music_gen
motivation: ARC快速立体声音乐生成
```

#### 📝 一句话总结
Stable Audio 2.5 的核心目标是：ARC快速立体声音乐生成。

#### 🎯 核心要点
- 核心动机：ARC快速立体声音乐生成
- 演化来源：继承或改进自 musicgen
- 代表机构：Stability AI

#### 🔬 深入细节
ARC快速立体声音乐生成
