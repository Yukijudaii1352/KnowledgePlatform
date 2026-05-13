### 大规模弱监督语音识别 (Whisper)

```yaml
id: whisper
name: Whisper
full_name: "大规模弱监督语音识别 (Whisper)"
year: "2023"
org: OpenAI
paper_url: "http://proceedings.mlr.press/v202/radford23a.html"
category: asr
parent: conformer
motivation: "68万小时弱监督多任务训练"
```

#### 📝 一句话总结

Whisper 通过在 68 万小时互联网弱监督音频-文本数据上进行多任务训练，构建了一个基于 Encoder-Decoder Transformer 的通用语音识别系统，实现了无需微调即可在多种语音任务和数据集上达到接近人类水平的鲁棒零样本性能。

#### 🎯 核心要点

- **大规模弱监督预训练**：从互联网收集 68 万小时多语言音频-文本对，覆盖 96 种语言，无需人工标注
- **统一多任务格式**：通过特殊 token 序列将语音识别、翻译、语言识别、语音活动检测和时间戳预测统一为单一序列到序列任务
- **Encoder-Decoder Transformer 架构**：音频编码器处理 80 通道 log-Mel 频谱图（30 秒窗口），文本解码器自回归生成输出 token
- **零样本泛化能力**：无需在目标数据集上微调，在多个基准上达到接近有监督 SOTA 的性能
- **卓越的分布外鲁棒性**：相比 LibriSpeech 训练的模型，在分布外数据集上平均降低 55.2% 的相对错误率
- **模型规模系列**：从 39M 到 1550M 参数的 5 个尺寸，性能随规模和数据量平滑提升

#### 🔬 深入细节

![Whisper 多任务训练格式](https://raw.githubusercontent.com/openai/whisper/main/approach.png)
*图：Whisper 的多任务训练格式。所有任务通过一系列特殊 token 联合表示为解码器的输入/输出序列，包括语言标识、任务类型、时间戳和转录/翻译文本。*

```python
# Whisper 多任务训练与推理伪代码
def whisper_forward(audio_chunk, task="transcribe", language="en"):
    """
    audio_chunk: 30秒音频片段
    task: "transcribe" | "translate" 
    language: 目标语言代码
    """
    # 1. 音频编码
    mel = log_mel_spectrogram(audio_chunk)  # -> (80, 3000)
    # 两层1D卷积下采样 (stride=2)
    x = conv1(mel)  # GELU激活
    x = conv2(x)    # -> (d_model, 1500)
    x = x + sinusoidal_position_embedding
    encoder_out = transformer_encoder(x)  # N层Transformer编码器

    # 2. 多任务解码 (自回归)
    tokens = [SOT]  # <|startoftranscript|>
    tokens.append(LANG_TOKEN[language])    # <|en|>
    tokens.append(TASK_TOKEN[task])        # <|transcribe|> 或 <|translate|>
    
    if has_timestamps:
        tokens.append(NOTIMESTAMPS if no_ts else timestamp_token)
    
    # 自回归生成
    while tokens[-1] != EOT:  # <|endoftranscript|>
        logits = transformer_decoder(tokens, encoder_out)
        next_token = sample(logits)
        tokens.append(next_token)
    
    return decode_tokens(tokens)

# 长音频推理：滑动窗口 + beam search
def transcribe_long_audio(audio, model):
    segments = []
    seek = 0
    while seek < len(audio):
        chunk = audio[seek : seek + 30*16000]  # 30秒窗口
        result = beam_search(model, chunk, 
                            beam_size=5,
                            temperature_schedule=[0, 0.2, 0.4, 0.6, 0.8, 1.0])
        segments.append(result)
        # 根据预测的时间戳移动窗口
        seek += result.end_timestamp * 16000
    return merge_segments(segments)
```

**动机与背景**

传统语音识别系统依赖于在特定数据集（如 LibriSpeech）上的有监督训练，虽然在基准测试中取得了优异成绩，但存在严重的**分布外泛化问题**——在训练分布之外的数据上性能急剧下降。例如，在 LibriSpeech 上达到人类水平的模型，在其他数据集上的错误率是人类的两倍。自监督预训练方法（如 wav2vec 2.0）虽然减少了对标注数据的需求，但仍需要微调步骤，且微调本身又引入了分布偏移问题。

Whisper 的核心洞察是：**互联网上已经存在海量的弱监督音频-文本配对数据**（如视频字幕、播客转录等），通过直接在这些数据上训练，可以同时获得大规模数据的泛化优势和有监督学习的简洁性，无需复杂的自监督预训练-微调流水线。

**核心机制**

**1. 数据收集与处理**

Whisper 从互联网收集音频-文本对，经过以下处理流程：

- 使用现有语音识别系统检测音频语言，过滤掉机器生成的转录（通过检测与现有 ASR 输出的高重叠度）
- 将音频-文本对分为三类：英语转录（43.8 万小时）、多语言转录（11.7 万小时）、X→英语翻译（12.5 万小时）
- 对文本进行标准化处理，使用 Unicode 规范化和去除标点变体

> 💡 关键：数据质量控制至关重要——通过过滤机器生成的伪标签，避免模型学习到其他 ASR 系统的错误模式。

**2. 模型架构**

Whisper 采用标准的 Encoder-Decoder Transformer 架构：

- **音频编码器**：输入为 80 通道 log-Mel 频谱图（25ms 窗口，10ms 步长），先经过两层 1D 卷积（核大小 3，步长 2）将时间维度从 3000 降至 1500，再经过 \(N\) 层 Transformer 编码器块处理。使用正弦位置编码。
- **文本解码器**：使用学习的位置编码，通过交叉注意力关注编码器输出，自回归生成 token 序列。

模型提供 5 种规模：

| 模型 | 层数 | 宽度 | 注意力头 | 参数量 |
|------|------|------|----------|--------|
| Tiny | 4 | 384 | 6 | 39M |
| Base | 6 | 512 | 8 | 74M |
| Small | 12 | 768 | 12 | 244M |
| Medium | 24 | 1024 | 16 | 769M |
| Large | 32 | 1280 | 20 | 1550M |

**3. 多任务训练格式**

所有任务通过特殊 token 序列统一表示：

$$\text{<|startoftranscript|>} \rightarrow \text{<|lang|>} \rightarrow \text{<|task|>} \rightarrow \text{[<|timestamps|>]} \rightarrow \text{text tokens} \rightarrow \text{<|endoftranscript|>}$$

- **语言识别**：预测 `<|lang|>` token（覆盖 99 种语言）
- **语音活动检测**：若音频无语音，预测 `<|nospeech|>` token
- **转录 vs 翻译**：通过 `<|transcribe|>` 或 `<|translate|>` token 切换
- **时间戳预测**：特殊时间戳 token 表示 0-30 秒内每 20ms 的时间点

> ⚠️ 注意：这种多任务设计使得单一模型可以同时处理语音识别、翻译、语言识别和时间戳对齐，无需为每个任务训练单独的模型。

**4. 训练细节**

- 使用 AdamW 优化器，配合线性学习率预热（2048 步）和余弦退火
- 数据增强：仅使用 SpecAugment（频率和时间掩码）
- BPE 分词器：英语使用 GPT-2 分词器（无进一步修改），多语言使用重新训练的分词器
- 训练 \(2^{20}\) 次更新（约 2-3 个 epoch），batch size 256

**5. 推理策略——长音频处理**

由于模型仅处理 30 秒片段，长音频需要特殊策略：

- 使用滑动窗口，根据模型预测的时间戳确定下一个窗口的起始位置
- 采用 beam search（beam size=5）和温度调度：从贪心解码开始，若检测到重复或低置信度，逐步提高采样温度
- 使用前一个窗口的最后几个 token 作为解码器的提示（prompt），保持上下文连贯性

**与传统方法的对比**

| 维度 | 传统有监督 ASR | 自监督 (wav2vec 2.0) | Whisper |
|------|---------------|---------------------|---------|
| 预训练数据 | 人工标注（千小时级） | 无标注音频（万小时级） | 弱监督配对（68万小时） |
| 是否需要微调 | — | 是 | 否（零样本） |
| 分布外鲁棒性 | 差 | 中等 | 优秀 |
| 多语言支持 | 通常单语 | 有限 | 96 种语言 |
| 多任务能力 | 单任务 | 单任务 | 识别+翻译+语言ID+时间戳 |

> 💡 关键：Whisper 的核心优势不在于在某个特定基准上刷新 SOTA，而在于**无需任何微调即可在广泛的任务和数据分布上保持稳定的高性能**。在 LibriSpeech 上，Whisper 的 WER 为 2.5%（接近但未超越 SOTA），但在 12 个分布外数据集上平均比同等 LibriSpeech 性能的有监督模型降低 55.2% 的错误率。

**关键公式**

Whisper 的训练目标是标准的序列到序列交叉熵损失：

$$\mathcal{L} = -\sum_{t=1}^{T} \log P_\theta(y_t \mid y_{<t}, \mathbf{x})$$

其中 \(\mathbf{x}\) 为编码器输出的音频表示，\(y_t\) 为第 \(t\) 个目标 token（包括特殊任务 token 和文本 token），\(\theta\) 为模型参数。

音频前端将原始波形转换为 log-Mel 频谱图：

$$\text{Mel}(f) = \log\left(\sum_k |X(k)|^2 \cdot H_f(k)\right)$$

其中 \(X(k)\) 为 STFT 系数，\(H_f(k)\) 为第 \(f\) 个 Mel 滤波器组的权重。

模型性能与数据量的缩放关系（多语言场景）：

$$\log(\text{WER}) \propto -\frac{1}{2} \log(\text{hours of training data})$$

即训练数据每增加 16 倍，WER 减半（在 Fleurs 数据集上 \(R^2 = 0.83\)）。

#### 🧪 练习题

```yaml
question: "Whisper 相比传统有监督语音识别模型的最核心优势是什么？"
options:
  - "在 LibriSpeech 上达到了最低的词错误率"
  - "无需微调即可在分布外数据集上保持鲁棒的高性能"
  - "使用了更大的 Transformer 模型架构"
  - "采用了自监督预训练方法减少标注需求"
answer: 1
explain: "Whisper 在 LibriSpeech 上的 WER(2.5%) 并非 SOTA，但其核心优势在于零样本泛化——在 12 个分布外数据集上比同等 LibriSpeech 性能的有监督模型平均降低 55.2% 的错误率，接近人类的鲁棒性水平。"
```