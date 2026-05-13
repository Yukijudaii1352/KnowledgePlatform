### 语音T5模型 (SpeechT5)

```yaml
id: speecht5
name: SpeechT5
full_name: "语音T5模型 (SpeechT5)"
year: 2022
org: Microsoft
paper_url: "https://aclanthology.org/2022.acl-long.393/"
category: unified_seq2seq
parent: "—"
motivation: "语音-文本统一预训练框架"
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