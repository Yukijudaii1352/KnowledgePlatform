---
domain: multimodal
topic_id: omni
topic_name: omni
page_icon: "\U0001F310"
page_title: Omni模型技术演进总结
page_subtitle: '{build_date} 版'
page_desc: 全模态统一处理技术的发展脉络，涵盖文本/图像/视频/音频的Any-to-Any交互
hero_pills:
- "\U0001F3F7️ Omni-Modal · Any-to-Any · Foundation Models"
count_pill: '{count} 个算法'
categories:
  unified_seq2seq:
    label: 统一Seq2Seq
    color: '#3498db'
  autoregressive:
    label: 自回归生成
    color: '#27ae60'
  diffusion_fusion:
    label: 扩散模型融合
    color: '#9b59b6'
  encoder_llm_decoder:
    label: 编码器-LLM-解码器
    color: '#e67e22'
  native_e2e:
    label: 原生端到端
    color: '#e74c3c'
  frontier_2026:
    label: 2026前沿
    color: '#1abc9c'
image_base: ../../content/mm/omni/assets/
---

## 领域综述

### 待定
待定。

## 算法演化关系

```yaml
nodes:
- id: ofa
  x: 100
  y: 100
  category: unified_seq2seq
- id: unified-io
  x: 120
  y: 100
  category: unified_seq2seq
- id: uni-perceiver-v2
  x: 200
  y: 100
  category: unified_seq2seq
- id: unival
  x: 220
  y: 100
  category: unified_seq2seq
- id: speecht5
  x: 100
  y: 150
  category: unified_seq2seq
- id: lauragpt
  x: 200
  y: 150
  category: unified_seq2seq
- id: unified-io-2
  x: 300
  y: 200
  category: autoregressive
- id: anygpt
  x: 300
  y: 250
  category: autoregressive
- id: emu3
  x: 320
  y: 250
  category: autoregressive
- id: chameleon
  x: 340
  y: 250
  category: autoregressive
- id: show-o
  x: 360
  y: 250
  category: autoregressive
- id: audiopalm
  x: 200
  y: 300
  category: encoder_llm_decoder
- id: qwen-audio
  x: 220
  y: 300
  category: encoder_llm_decoder
- id: next-gpt
  x: 200
  y: 350
  category: encoder_llm_decoder
- id: onellm
  x: 300
  y: 350
  category: encoder_llm_decoder
- id: imagebind
  x: 200
  y: 400
  category: encoder_llm_decoder
- id: meta-transformer
  x: 220
  y: 400
  category: encoder_llm_decoder
- id: languagebind
  x: 300
  y: 400
  category: encoder_llm_decoder
- id: codi
  x: 200
  y: 500
  category: diffusion_fusion
- id: codi-2
  x: 300
  y: 500
  category: diffusion_fusion
- id: omniflow
  x: 400
  y: 500
  category: diffusion_fusion
- id: gpt-4o
  x: 300
  y: 600
  category: native_e2e
- id: gemini-1.5
  x: 320
  y: 600
  category: native_e2e
- id: llama-4-scout
  x: 400
  y: 600
  category: native_e2e
- id: janus-pro
  x: 400
  y: 700
  category: frontier_2026
- id: minicpm-o
  x: 500
  y: 650
  category: frontier_2026
- id: qwen3.5-omni
  x: 520
  y: 650
  category: frontier_2026
- id: omni-diffusion
  x: 500
  y: 700
  category: frontier_2026
- id: nemotron-3-nano
  x: 540
  y: 650
  category: frontier_2026
- id: gpt-5.5-instant
  x: 560
  y: 650
  category: frontier_2026
edges:
- from: ofa
  to: unified-io
  label: 任务扩展
- from: ofa
  to: uni-perceiver-v2
  label: 视觉增强
- from: ofa
  to: unival
  label: 轻量化
- from: unified-io
  to: unified-io-2
  label: 自回归化
- from: speecht5
  to: audiopalm
  label: LLM融合
- from: speecht5
  to: lauragpt
  label: 端到端
- from: audiopalm
  to: qwen-audio
  label: 规模扩展
- from: anygpt
  to: emu3
  label: 纯Token化
- from: anygpt
  to: chameleon
  label: 早期融合
- from: chameleon
  to: show-o
  label: 混合建模
- from: chameleon
  to: janus-pro
  label: 解耦编码
- from: show-o
  to: omni-diffusion
  label: 扩散统一
- from: next-gpt
  to: onellm
  label: 模态扩展
- from: imagebind
  to: meta-transformer
  label: 编码统一
- from: imagebind
  to: languagebind
  label: 语言中心
- from: codi
  to: codi-2
  label: 交错生成
- from: codi-2
  to: omniflow
  label: 修正流
- from: gpt-4o
  to: gemini-1.5
  label: MoE架构
- from: gpt-4o
  to: minicpm-o
  label: 全双工
- from: gpt-4o
  to: nemotron-3-nano
  label: 智能体优化
- from: gpt-4o
  to: gpt-5.5-instant
  label: 可靠性强化
- from: gemini-1.5
  to: qwen3.5-omni
  label: 双核架构
- from: gemini-1.5
  to: llama-4-scout
  label: 开源MoE
milestones:
- ofa
- gpt-4o
- qwen3.5-omni
```

## 核心算法

### OFA

```yaml
id: ofa
num: 1
name: OFA
full_name: 统一架构模型 (One For All)
year: '2022'
org: 阿里达摩院
parent: —
paper_url: https://arxiv.org/abs/2202.03052
project_url: ''
category: unified_seq2seq
motivation: 架构/模态/任务三统一的Seq2Seq
```

#### 📝 一句话总结
OFA 的核心目标是：架构/模态/任务三统一的Seq2Seq。

#### 🎯 核心要点
- 核心动机：架构/模态/任务三统一的Seq2Seq
- 代表机构：阿里达摩院

#### 🔬 深入细节
架构/模态/任务三统一的Seq2Seq


### Unified-IO

```yaml
id: unified-io
num: 2
name: Unified-IO
full_name: 统一输入输出模型 (Unified-IO)
year: '2022'
org: Allen AI
parent: ofa
paper_url: https://arxiv.org/abs/2206.08916
project_url: ''
category: unified_seq2seq
motivation: 首个处理95种视觉语言任务
```

#### 📝 一句话总结
Unified-IO 的核心目标是：首个处理95种视觉语言任务。

#### 🎯 核心要点
- 核心动机：首个处理95种视觉语言任务
- 演化来源：继承或改进自 ofa
- 代表机构：Allen AI

#### 🔬 深入细节
首个处理95种视觉语言任务


### Unified-IO 2

```yaml
id: unified-io-2
num: 3
name: Unified-IO 2
full_name: 统一输入输出模型第二代 (Unified-IO 2)
year: '2024'
org: Allen AI
parent: unified-io
paper_url: https://openaccess.thecvf.com/content/CVPR2024/html/Lu_Unified-IO_2_Scaling_Autoregressive_Multimodal_Models_with_Vision_Language_Audio_CVPR_2024_paper.html
project_url: ''
category: autoregressive
motivation: Any-to-Any自回归统一模型
```

#### 📝 一句话总结
Unified-IO 2 的核心目标是：Any-to-Any自回归统一模型。

#### 🎯 核心要点
- 核心动机：Any-to-Any自回归统一模型
- 演化来源：继承或改进自 unified-io
- 代表机构：Allen AI

#### 🔬 深入细节
Any-to-Any自回归统一模型


### Uni-Perceiver v2

```yaml
id: uni-perceiver-v2
num: 4
name: Uni-Perceiver v2
full_name: 通用感知器第二代 (Uni-Perceiver v2)
year: '2023'
org: 商汤/清华
parent: ofa
paper_url: https://openaccess.thecvf.com/content/CVPR2023/html/Li_Uni-Perceiver_v2_A_Generalist_Model_for_Large-Scale_Vision_and_Vision-Language_CVPR_2023_paper.html
project_url: ''
category: unified_seq2seq
motivation: 通用视觉-语言统一建模
```

#### 📝 一句话总结
Uni-Perceiver v2 的核心目标是：通用视觉-语言统一建模。

#### 🎯 核心要点
- 核心动机：通用视觉-语言统一建模
- 演化来源：继承或改进自 ofa
- 代表机构：商汤/清华

#### 🔬 深入细节
通用视觉-语言统一建模


### UniVal

```yaml
id: unival
num: 5
name: UniVal
full_name: 统一价值模型 (UniVal)
year: '2023'
org: Sorbonne
parent: ofa
paper_url: https://arxiv.org/abs/2307.16184
project_url: ''
category: unified_seq2seq
motivation: 四模态轻量统一模型
```

#### 📝 一句话总结
UniVal 的核心目标是：四模态轻量统一模型。

#### 🎯 核心要点
- 核心动机：四模态轻量统一模型
- 演化来源：继承或改进自 ofa
- 代表机构：Sorbonne

#### 🔬 深入细节
四模态轻量统一模型


### SpeechT5

```yaml
id: speecht5
num: 6
name: SpeechT5
full_name: 语音T5模型 (SpeechT5)
year: '2022'
org: Microsoft
parent: —
paper_url: https://aclanthology.org/2022.acl-long.393/
project_url: ''
category: unified_seq2seq
motivation: 语音-文本统一预训练框架
```

#### 📝 一句话总结
SpeechT5 提出了一个统一的编码器-解码器预训练框架，通过共享的 Transformer 骨干网络和模态特定的前/后处理网络，将语音和文本任务统一为序列到序列的格式，并利用跨模态向量量化（Cross-Modal VQ）对齐语音与文本的隐空间表示，在 ASR、TTS、语音翻译、声音转换、语音增强和说话人识别等 6 项任务上均取得了显著提升。

#### 🎯 核心要点
- **统一编码器-解码器架构**：共享的 12 层 Transformer 编码器 + 6 层 Transformer 解码器，配合 6 个模态特定的前/后处理网络（speech/text 各 3 个），将所有语音-文本任务统一为 seq2seq 格式
- **跨模态向量量化（Cross-Modal VQ）**：利用共享码本将语音和文本的连续表示离散化，通过随机混合语音/文本的潜在单元实现跨模态对齐，作为编码器与解码器之间的信息瓶颈
- **多任务预训练**：联合使用语音 MLM 损失、语音 seq2seq 重建损失（L1 + BCE）、文本 MLM 损失和 VQ 多样性损失进行预训练
- **预训练数据**：LibriSpeech 960 小时语音 + LibriSpeech LM 文本语料（约 4000 万句）
- **6 项下游任务全面验证**：ASR（WER 5.8%）、TTS（MOS 3.65）、语音翻译（BLEU 35.30）、声音转换（MCD 5.87）、语音增强（WER 8.9%）、说话人识别
- **消融实验**：语音预训练贡献最大；联合语音-文本预训练对跨模态任务有显著增益；MLM 损失有助于语音表示学习

#### 🔬 深入细节
##### 框架总览

![SpeechT5 框架总览](https://ar5iv.labs.arxiv.org/html/2110.07205/assets/x1.png)
*图 1：SpeechT5 框架示意图。所有语音-文本任务被统一为 speech/text → speech/text 的序列到序列格式，包括 ASR、TTS、ST、VC、SE 和 SID。*

SpeechT5 的核心思想来源于 NLP 领域的 T5（Text-to-Text Transfer Transformer）：**将所有任务统一为同一种输入-输出格式**。在语音领域，这意味着将 ASR（语音→文本）、TTS（文本→语音）、VC（语音→语音）、ST（语音→文本）等任务全部视为序列到序列的转换问题。

> 💡 **关键动机**：此前的语音预训练工作（如 wav2vec 2.0、HuBERT）存在两个问题：(1) 仅使用语音数据预训练，忽略了文本信息对跨模态任务的重要性；(2) 仅预训练编码器，解码器未经预训练，不利于生成类任务。SpeechT5 同时解决了这两个问题。

##### 模型架构

SpeechT5 由三部分组成：**共享编码器-解码器骨干** + **模态特定前处理网络（Pre-net）** + **模态特定后处理网络（Post-net）**。

```
输入 ──→ [Pre-net] ──→ [共享 Encoder (12L)] ──→ [Cross-Modal VQ] ──→ [共享 Decoder (6L)] ──→ [Post-net] ──→ 输出
         ↑ 模态特定                                  ↑ 跨模态对齐                                ↑ 模态特定
```

**共享编码器-解码器**：
- 编码器：12 层 Transformer，隐藏维度 768，FFN 维度 3072，12 个注意力头（与 wav2vec 2.0 Base / HuBERT Base 编码器配置一致）
- 解码器：6 层 Transformer，配置与编码器相同

**6 个模态特定网络**：

| 网络 | 结构 | 功能 |
|------|------|------|
| 语音编码器 Pre-net | 7 层时序卷积（来自 wav2vec 2.0），512 通道，步长 (5,2,2,2,2,2,2)，核大小 (10,3,3,3,3,2,2) | 将原始波形下采样为特征序列 |
| 语音解码器 Pre-net | 3 层全连接 + ReLU | 将 log Mel 滤波器组特征映射到隐空间 |
| 语音解码器 Post-net | 线性层 + 5 层 1D 卷积（残差细化）+ 停止标记预测头 | 从解码器输出生成 Mel 频谱 |
| 文本编码器 Pre-net | 共享词嵌入矩阵 | 将 token 索引映射为嵌入向量 |
| 文本解码器 Pre-net | 共享词嵌入矩阵 | 同上 |
| 文本解码器 Post-net | 共享词嵌入矩阵（转置） | 将隐状态映射回词表概率 |

##### 跨模态向量量化（Cross-Modal VQ）

![跨模态向量量化示意图](https://ar5iv.labs.arxiv.org/html/2110.07205/assets/x2.png)
*图 2：跨模态向量量化机制。通过共享码本将语音和文本的连续表示离散化，并随机混合两种模态的潜在单元。*

跨模态 VQ 是 SpeechT5 最核心的创新，其目标是**在编码器和解码器之间建立一个统一的离散语义空间**，使语音和文本共享相同的表示。

具体流程如下：

1. **编码器输出量化**：将编码器的连续输出 \(\mathbf{u}_i\) 通过最近邻搜索映射到码本 \(\mathbf{C}^K\) 中的离散码：

$$\mathbf{c}_i = \arg\min_j \|\mathbf{u}_i - \mathbf{e}_j\|_2$$

其中 \(\mathbf{e}_j\) 是码本中第 \(j\) 个可学习嵌入向量。

2. **乘积量化**：使用 2 个码本，每个包含 \(V = 100\) 个条目，总共可表示 \(V \times V = 10000\) 种离散状态，在表达能力和压缩率之间取得平衡。

3. **随机混合**：在预训练时，**随机将一个 batch 中的语音和文本量化后的潜在单元进行混合**，作为解码器的输入。这迫使解码器学会从统一的离散表示中恢复两种模态的信息，从而实现跨模态对齐。

4. **多样性损失**：为防止码本坍缩（只使用少数几个码），引入多样性损失最大化码本使用的熵：

$$\mathcal{L}_d = \frac{1}{K}\sum_{k=1}^{K} p_k \log p_k$$

其中 \(p_k\) 是选择第 \(k\) 个码的平均概率。

> ⚠️ **注意**：VQ 的梯度通过 straight-through estimator 传播，即前向传播使用离散码，反向传播时梯度直接复制到编码器输出。

##### 预训练策略

```python
# SpeechT5 预训练伪代码
for step in range(500_000):
    # 1. 采样语音和文本 batch
    speech_batch = sample_speech(LibriSpeech_960h)
    text_batch = sample_text(LibriSpeech_LM)
    
    # 2. 语音分支：Masked Language Model + Seq2Seq
    speech_hidden = speech_encoder_prenet(speech_batch.waveform)
    speech_enc_out = shared_encoder(mask(speech_hidden))
    speech_vq = cross_modal_vq(speech_enc_out)
    
    # 语音 MLM：预测被遮蔽位置的语音特征
    L_mlm_s = mlm_loss(speech_enc_out, speech_hidden)
    
    # 语音 Seq2Seq：自回归重建 Mel 频谱
    mel_pred = shared_decoder(speech_vq) -> speech_decoder_postnet
    L_1_s = L1_loss(mel_pred, target_mel)
    L_bce_s = BCE_loss(stop_pred, stop_target)
    
    # 3. 文本分支：Masked Language Model
    text_hidden = text_encoder_prenet(text_batch.tokens)
    text_enc_out = shared_encoder(mask(text_hidden))
    text_vq = cross_modal_vq(text_enc_out)
    text_pred = shared_decoder(text_vq) -> text_decoder_postnet
    L_mle_t = cross_entropy(text_pred, text_batch.tokens)
    
    # 4. 多样性损失
    L_d = diversity_loss(cross_modal_vq.codebook_usage)
    
    # 5. 总损失
    loss = L_mlm_s + L_1_s + L_bce_s + L_mle_t + 0.1 * L_d
    optimizer.step(loss)
```

预训练的总损失函数为：

$$\mathcal{L} = \mathcal{L}_{mlm}^{s} + \mathcal{L}_{1}^{s} + \mathcal{L}_{bce}^{s} + \mathcal{L}_{mle}^{t} + \gamma \mathcal{L}_{d}$$

其中：
- \(\mathcal{L}_{mlm}^{s}\)：语音遮蔽语言模型损失，预测被遮蔽位置的语音特征
- \(\mathcal{L}_{1}^{s}\)：语音序列到序列的 L1 重建损失
- \(\mathcal{L}_{bce}^{s}\)：停止标记的二元交叉熵损失
- \(\mathcal{L}_{mle}^{t}\)：文本遮蔽语言模型的最大似然损失
- \(\mathcal{L}_{d}\)：VQ 多样性损失，\(\gamma = 0.1\)

##### 训练配置

- **预训练数据**：LibriSpeech 960 小时语音 + LibriSpeech LM 文本语料
- **硬件**：32 块 V100 GPU
- **优化器**：Adam，学习率 \(2 \times 10^{-4}\)
- **预训练步数**：500K 步，更新频率为 2
- **编码器初始化**：语音编码器 Pre-net 使用 wav2vec 2.0 的卷积特征提取器初始化

##### 微调与下游任务结果

预训练完成后，针对不同下游任务微调编码器-解码器骨干，同时替换相应的模态特定前/后处理网络。

| 任务 | 数据集 | 指标 | SpeechT5 | 对比基线 |
|------|--------|------|-----------|----------|
| ASR | LibriSpeech 100h | WER (test-other) | **5.8%** | wav2vec 2.0: 6.3%, HuBERT: 6.3% |
| TTS | LibriTTS | MOS / CMOS | **3.65 / +0.29** | Baseline: 3.36 |
| VC | CMU Arctic (clb→slt) | MCD | **5.87** | VTN: 5.97 |
| ST | MUST-C EN-FR | BLEU | **35.30** | HuBERT init: 34.53 |
| SE | WHAM! | WER | **8.9%** | Baseline: 10.9% |

##### 与传统方法的对比

| 维度 | 传统方法 | SpeechT5 |
|------|----------|----------|
| 预训练范围 | 仅编码器（wav2vec 2.0, HuBERT） | 编码器 + 解码器联合预训练 |
| 模态 | 单模态（仅语音） | 语音 + 文本联合 |
| 任务适配 | 每个任务独立模型 | 统一框架，共享骨干 |
| 跨模态对齐 | 无显式对齐 | Cross-Modal VQ 实现隐式对齐 |
| 生成能力 | 解码器随机初始化 | 解码器经过预训练，生成质量更高 |

> 💡 **消融实验关键发现**：(1) 语音预训练对所有任务贡献最大；(2) 联合语音-文本预训练对跨模态任务（ASR、TTS）有显著增益；(3) 语音 MLM 损失有助于编码器学习更好的语音表示，移除后 TTS 的自然度反而提升（因为 MLM 主要服务于编码器而非解码器）。

#### 🧪 练习题
```yaml
question: "SpeechT5 中跨模态向量量化（Cross-Modal VQ）的核心作用是什么？"
options:
  - "将语音信号压缩为更短的序列以加速推理"
  - "通过共享离散码本对齐语音和文本的隐空间表示，作为编码器与解码器的统一接口"
  - "替代注意力机制实现编码器到解码器的信息传递"
  - "为预训练提供自监督的离散标签"
answer: 1
explain: "Cross-Modal VQ 通过共享码本将语音和文本的连续表示映射到同一离散空间，并随机混合两种模态的量化单元，迫使模型学习统一的跨模态表示，作为编码器和解码器之间的信息瓶颈。"
```

### AudioPaLM

```yaml
id: audiopalm
num: 7
name: AudioPaLM
full_name: 音频PaLM模型 (AudioPaLM)
year: '2023'
org: Google
parent: speecht5
paper_url: https://arxiv.org/abs/2306.12925
project_url: ''
category: encoder_llm_decoder
motivation: 融合PaLM与AudioLM能力
```

#### 📝 一句话总结
AudioPaLM 的核心目标是：融合PaLM与AudioLM能力。

#### 🎯 核心要点
- 核心动机：融合PaLM与AudioLM能力
- 演化来源：继承或改进自 speecht5
- 代表机构：Google

#### 🔬 深入细节
融合PaLM与AudioLM能力


### Qwen-Audio

```yaml
id: qwen-audio
num: 8
name: Qwen-Audio
full_name: 通义千问音频模型 (Qwen-Audio)
year: '2023'
org: 阿里通义
parent: audiopalm
paper_url: https://arxiv.org/abs/2311.07919
project_url: ''
category: encoder_llm_decoder
motivation: 大规模音频-语言统一模型
```

#### 📝 一句话总结
Qwen-Audio 的核心目标是：大规模音频-语言统一模型。

#### 🎯 核心要点
- 核心动机：大规模音频-语言统一模型
- 演化来源：继承或改进自 audiopalm
- 代表机构：阿里通义

#### 🔬 深入细节
大规模音频-语言统一模型


### LauraGPT

```yaml
id: lauragpt
num: 9
name: LauraGPT
full_name: 劳拉GPT音频模型 (LauraGPT)
year: '2023'
org: 阿里达摩院
parent: speecht5
paper_url: https://arxiv.org/abs/2310.04673
project_url: ''
category: unified_seq2seq
motivation: 端到端音频理解与生成
```

#### 📝 一句话总结
LauraGPT 的核心目标是：端到端音频理解与生成。

#### 🎯 核心要点
- 核心动机：端到端音频理解与生成
- 演化来源：继承或改进自 speecht5
- 代表机构：阿里达摩院

#### 🔬 深入细节
端到端音频理解与生成


### GPT-4o

```yaml
id: gpt-4o
num: 10
name: GPT-4o
full_name: GPT-4全模态版 (GPT-4 Omni)
year: '2024'
org: OpenAI
parent: —
paper_url: https://openai.com/index/hello-gpt-4o/
project_url: ''
category: native_e2e
motivation: 原生端到端全模态交互
```

#### 📝 一句话总结
GPT-4o 的核心目标是：原生端到端全模态交互。

#### 🎯 核心要点
- 核心动机：原生端到端全模态交互
- 代表机构：OpenAI

#### 🔬 深入细节
原生端到端全模态交互


### Gemini 1.5 Pro

```yaml
id: gemini-1.5
num: 11
name: Gemini 1.5 Pro
full_name: Gemini 1.5专业版 (Gemini 1.5 Pro)
year: '2024'
org: Google
parent: gpt-4o
paper_url: https://arxiv.org/abs/2403.05530
project_url: ''
category: native_e2e
motivation: 稀疏MoE+200万token上下文
```

#### 📝 一句话总结
Gemini 1.5 Pro 的核心目标是：稀疏MoE+200万token上下文。

#### 🎯 核心要点
- 核心动机：稀疏MoE+200万token上下文
- 演化来源：继承或改进自 gpt-4o
- 代表机构：Google

#### 🔬 深入细节
稀疏MoE+200万token上下文


### CoDi

```yaml
id: codi
num: 12
name: CoDi
full_name: 可组合扩散模型 (Composable Diffusion)
year: '2023'
org: Microsoft
parent: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/33edf072fe44f19079d66713a1831550-Abstract-Conference.html
project_url: ''
category: diffusion_fusion
motivation: 可组合扩散Any-to-Any生成
```

#### 📝 一句话总结
CoDi 的核心目标是：可组合扩散Any-to-Any生成。

#### 🎯 核心要点
- 核心动机：可组合扩散Any-to-Any生成
- 代表机构：Microsoft

#### 🔬 深入细节
可组合扩散Any-to-Any生成


### CoDi-2

```yaml
id: codi-2
num: 13
name: CoDi-2
full_name: 可组合扩散模型第二代 (CoDi-2)
year: '2024'
org: Microsoft
parent: codi
paper_url: https://openaccess.thecvf.com/content/CVPR2024/html/Tang_CoDi-2_In-Context_Interleaved_and_Interactive_Any-to-Any_Generation_CVPR_2024_paper.html
project_url: ''
category: diffusion_fusion
motivation: 上下文交错生成增强交互
```

#### 📝 一句话总结
CoDi-2 的核心目标是：上下文交错生成增强交互。

#### 🎯 核心要点
- 核心动机：上下文交错生成增强交互
- 演化来源：继承或改进自 codi
- 代表机构：Microsoft

#### 🔬 深入细节
上下文交错生成增强交互


### AnyGPT

```yaml
id: anygpt
num: 14
name: AnyGPT
full_name: 任意模态GPT (AnyGPT)
year: '2024'
org: 复旦/上海AI Lab
parent: —
paper_url: https://aclanthology.org/2024.findings-acl.521/
project_url: ''
category: autoregressive
motivation: 离散Token统一处理所有模态
```

#### 📝 一句话总结
AnyGPT 的核心目标是：离散Token统一处理所有模态。

#### 🎯 核心要点
- 核心动机：离散Token统一处理所有模态
- 代表机构：复旦/上海AI Lab

#### 🔬 深入细节
离散Token统一处理所有模态


### NExT-GPT

```yaml
id: next-gpt
num: 15
name: NExT-GPT
full_name: 下一代GPT (NExT-GPT)
year: '2023'
org: NUS
parent: —
paper_url: https://arxiv.org/abs/2309.05519
project_url: ''
category: encoder_llm_decoder
motivation: LLM+编码器+扩散解码器架构
```

#### 📝 一句话总结
NExT-GPT 的核心目标是：LLM+编码器+扩散解码器架构。

#### 🎯 核心要点
- 核心动机：LLM+编码器+扩散解码器架构
- 代表机构：NUS

#### 🔬 深入细节
LLM+编码器+扩散解码器架构


### OneLLM

```yaml
id: onellm
num: 16
name: OneLLM
full_name: 统一大语言模型 (OneLLM)
year: '2024'
org: 上海AI Lab
parent: next-gpt
paper_url: https://github.com/csuhan/OneLLM
project_url: ''
category: encoder_llm_decoder
motivation: 8种模态统一映射对齐
```

#### 📝 一句话总结
OneLLM 的核心目标是：8种模态统一映射对齐。

#### 🎯 核心要点
- 核心动机：8种模态统一映射对齐
- 演化来源：继承或改进自 next-gpt
- 代表机构：上海AI Lab

#### 🔬 深入细节
8种模态统一映射对齐


### Emu3

```yaml
id: emu3
num: 17
name: Emu3
full_name: Emu第三代 (Emu3)
year: '2024'
org: BAAI
parent: anygpt
paper_url: https://baai.ac.cn/news/861
project_url: ''
category: autoregressive
motivation: 纯Token预测统一图文视频生成
```

#### 📝 一句话总结
Emu3 的核心目标是：纯Token预测统一图文视频生成。

#### 🎯 核心要点
- 核心动机：纯Token预测统一图文视频生成
- 演化来源：继承或改进自 anygpt
- 代表机构：BAAI

#### 🔬 深入细节
纯Token预测统一图文视频生成


### Chameleon

```yaml
id: chameleon
num: 18
name: Chameleon
full_name: 变色龙模型 (Chameleon)
year: '2024'
org: Meta FAIR
parent: anygpt
paper_url: https://ai.meta.com/blog/meta-fair-research-new-release-june-2024/
project_url: ''
category: autoregressive
motivation: 早期融合自回归统一架构
```

#### 📝 一句话总结
Chameleon 的核心目标是：早期融合自回归统一架构。

#### 🎯 核心要点
- 核心动机：早期融合自回归统一架构
- 演化来源：继承或改进自 anygpt
- 代表机构：Meta FAIR

#### 🔬 深入细节
早期融合自回归统一架构


### Show-o

```yaml
id: show-o
num: 19
name: Show-o
full_name: 展示-全模态 (Show-o)
year: '2024'
org: NUS
parent: chameleon
paper_url: https://arxiv.org/abs/2408.12528
project_url: ''
category: autoregressive
motivation: 自回归+离散扩散混合建模
```

#### 📝 一句话总结
Show-o 的核心目标是：自回归+离散扩散混合建模。

#### 🎯 核心要点
- 核心动机：自回归+离散扩散混合建模
- 演化来源：继承或改进自 chameleon
- 代表机构：NUS

#### 🔬 深入细节
自回归+离散扩散混合建模


### ImageBind

```yaml
id: imagebind
num: 20
name: ImageBind
full_name: 图像绑定模型 (ImageBind)
year: '2023'
org: Meta
parent: —
paper_url: https://ai.meta.com/blog/imagebind-six-modalities-binding-ai/
project_url: ''
category: encoder_llm_decoder
motivation: 六模态统一嵌入空间
```

#### 📝 一句话总结
ImageBind 的核心目标是：六模态统一嵌入空间。

#### 🎯 核心要点
- 核心动机：六模态统一嵌入空间
- 代表机构：Meta

#### 🔬 深入细节
六模态统一嵌入空间


### Meta-Transformer

```yaml
id: meta-transformer
num: 21
name: Meta-Transformer
full_name: 元Transformer (Meta-Transformer)
year: '2023'
org: 上海AI Lab
parent: imagebind
paper_url: https://arxiv.org/abs/2307.10802
project_url: ''
category: encoder_llm_decoder
motivation: 12种模态单一编码器处理
```

#### 📝 一句话总结
Meta-Transformer 的核心目标是：12种模态单一编码器处理。

#### 🎯 核心要点
- 核心动机：12种模态单一编码器处理
- 演化来源：继承或改进自 imagebind
- 代表机构：上海AI Lab

#### 🔬 深入细节
12种模态单一编码器处理


### LanguageBind

```yaml
id: languagebind
num: 22
name: LanguageBind
full_name: 语言绑定模型 (LanguageBind)
year: '2024'
org: ICLR
parent: imagebind
paper_url: https://arxiv.org/abs/2310.01852
project_url: ''
category: encoder_llm_decoder
motivation: 语言中心N模态语义对齐
```

#### 📝 一句话总结
LanguageBind 的核心目标是：语言中心N模态语义对齐。

#### 🎯 核心要点
- 核心动机：语言中心N模态语义对齐
- 演化来源：继承或改进自 imagebind
- 代表机构：ICLR

#### 🔬 深入细节
语言中心N模态语义对齐


### Janus-Pro

```yaml
id: janus-pro
num: 23
name: Janus-Pro
full_name: Janus专业版 (Janus-Pro)
year: '2025'
org: DeepSeek
parent: chameleon
paper_url: https://arxiv.org/abs/2501.17833
project_url: ''
category: frontier_2026
motivation: 解耦视觉编码解决表征冲突
```

#### 📝 一句话总结
Janus-Pro 的核心目标是：解耦视觉编码解决表征冲突。

#### 🎯 核心要点
- 核心动机：解耦视觉编码解决表征冲突
- 演化来源：继承或改进自 chameleon
- 代表机构：DeepSeek

#### 🔬 深入细节
解耦视觉编码解决表征冲突


### MiniCPM-o 4.5

```yaml
id: minicpm-o
num: 24
name: MiniCPM-o 4.5
full_name: MiniCPM全模态4.5版 (MiniCPM-o 4.5)
year: '2026'
org: OpenBMB
parent: gpt-4o
paper_url: https://minicpm.vercel.app/blog/minicpm-o-2-6-en
project_url: ''
category: frontier_2026
motivation: 全双工实时交互边端模型
```

#### 📝 一句话总结
MiniCPM-o 4.5 的核心目标是：全双工实时交互边端模型。

#### 🎯 核心要点
- 核心动机：全双工实时交互边端模型
- 演化来源：继承或改进自 gpt-4o
- 代表机构：OpenBMB

#### 🔬 深入细节
全双工实时交互边端模型


### Qwen3.5-Omni

```yaml
id: qwen3.5-omni
num: 25
name: Qwen3.5-Omni
full_name: 通义千问3.5全模态版 (Qwen3.5-Omni)
year: '2026'
org: 阿里通义
parent: gemini-1.5
paper_url: https://qwen.ai/blog/qwen2.5-omni/
project_url: ''
category: frontier_2026
motivation: Thinker-Talker双核低延迟架构
```

#### 📝 一句话总结
Qwen3.5-Omni 的核心目标是：Thinker-Talker双核低延迟架构。

#### 🎯 核心要点
- 核心动机：Thinker-Talker双核低延迟架构
- 演化来源：继承或改进自 gemini-1.5
- 代表机构：阿里通义

#### 🔬 深入细节
Thinker-Talker双核低延迟架构


### OmniFlow

```yaml
id: omniflow
num: 26
name: OmniFlow
full_name: 全模态流模型 (OmniFlow)
year: '2025'
org: UCLA
parent: codi-2
paper_url: https://openaccess.thecvf.com/content/CVPR2025/html/Li_OmniFlow_Any-to-Any_Generation_with_Multi-Modal_Rectified_Flows_CVPR_2025_paper.html
project_url: ''
category: diffusion_fusion
motivation: 多模态修正流统一生成
```

#### 📝 一句话总结
OmniFlow 的核心目标是：多模态修正流统一生成。

#### 🎯 核心要点
- 核心动机：多模态修正流统一生成
- 演化来源：继承或改进自 codi-2
- 代表机构：UCLA

#### 🔬 深入细节
多模态修正流统一生成


### Omni-Diffusion

```yaml
id: omni-diffusion
num: 27
name: Omni-Diffusion
full_name: 全模态扩散模型 (Omni-Diffusion)
year: '2026'
org: arXiv
parent: show-o
paper_url: https://arxiv.org/abs/2603.06000
project_url: ''
category: frontier_2026
motivation: 掩码离散扩散统一理解与生成
```

#### 📝 一句话总结
Omni-Diffusion 的核心目标是：掩码离散扩散统一理解与生成。

#### 🎯 核心要点
- 核心动机：掩码离散扩散统一理解与生成
- 演化来源：继承或改进自 show-o
- 代表机构：arXiv

#### 🔬 深入细节
掩码离散扩散统一理解与生成


### Nemotron 3 Nano

```yaml
id: nemotron-3-nano
num: 28
name: Nemotron 3 Nano
full_name: Nemotron 3纳米版 (Nemotron 3 Nano)
year: '2026'
org: NVIDIA
parent: gpt-4o
paper_url: https://nvidianews.nvidia.com/news/nvidia-nemotron-3-nano-omni-open-multimodal-model
project_url: ''
category: frontier_2026
motivation: 高吞吐音视频智能体推理
```

#### 📝 一句话总结
Nemotron 3 Nano 的核心目标是：高吞吐音视频智能体推理。

#### 🎯 核心要点
- 核心动机：高吞吐音视频智能体推理
- 演化来源：继承或改进自 gpt-4o
- 代表机构：NVIDIA

#### 🔬 深入细节
高吞吐音视频智能体推理


### Llama 4 Scout

```yaml
id: llama-4-scout
num: 29
name: Llama 4 Scout
full_name: Llama 4侦察版 (Llama 4 Scout)
year: '2025'
org: Meta
parent: gemini-1.5
paper_url: https://llama.meta.com/llama4-launch
project_url: ''
category: native_e2e
motivation: 开源原生MoE全模态模型
```

#### 📝 一句话总结
Llama 4 Scout 的核心目标是：开源原生MoE全模态模型。

#### 🎯 核心要点
- 核心动机：开源原生MoE全模态模型
- 演化来源：继承或改进自 gemini-1.5
- 代表机构：Meta

#### 🔬 深入细节
开源原生MoE全模态模型


### GPT-5.5 Instant

```yaml
id: gpt-5.5-instant
num: 30
name: GPT-5.5 Instant
full_name: GPT-5.5即时版 (GPT-5.5 Instant)
year: '2026'
org: OpenAI
parent: gpt-4o
paper_url: https://openai.com/gpt-5-5
project_url: ''
category: frontier_2026
motivation: 强化可靠性与Agentic任务
```

#### 📝 一句话总结
GPT-5.5 Instant 的核心目标是：强化可靠性与Agentic任务。

#### 🎯 核心要点
- 核心动机：强化可靠性与Agentic任务
- 演化来源：继承或改进自 gpt-4o
- 代表机构：OpenAI

#### 🔬 深入细节
强化可靠性与Agentic任务
