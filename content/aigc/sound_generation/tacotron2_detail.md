### Tacotron 2：自然 TTS 合成
```yaml
id: "tacotron2"
name: "Tacotron 2"
full_name: "Tacotron 2: 自然TTS合成 (Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram)"
year: "2018"
org: "Google"
paper_url: "https://arxiv.org/abs/1712.05884"
category: "tts"
parent: "tacotron"
motivation: "Mel谱预测+WaveNet声码器"
```

#### 📝 一句话总结
Tacotron 2 提出了“文本到 mel 频谱，再由 WaveNet 声码器生成波形”的两阶段神经 TTS 系统，用紧凑 mel 表示替代复杂语言学声学特征，显著提升合成自然度。

#### 🎯 核心要点
- 使用 seq2seq acoustic model 从字符序列预测 mel-spectrogram。
- 编码器由字符嵌入、卷积层和双向 LSTM 组成。
- 解码器采用 attention RNN、decoder RNN、自回归 mel frame 预测和 stop token。
- post-net 对初始 mel 预测做卷积残差修正，训练时同时监督修正前后 mel。
- 使用改造后的 WaveNet 以 mel-spectrogram 为局部条件生成时域波形。
- 证明 mel 条件足以驱动高质量神经声码器，简化传统 TTS 特征工程。

#### 🔬 深入细节
![Tacotron 2 系统结构](https://ar5iv.labs.arxiv.org/html/1712.05884/assets/x1.png)
*图：Tacotron 2 从文本到 mel 频谱，再到 WaveNet 波形合成的整体架构。*

```python
# Tacotron 2 核心流程
chars = normalize_and_tokenize(text)
enc = bidirectional_lstm(conv_stack(embed(chars)))

mel_frames = []
state = init_decoder_state()
prev = go_frame
while True:
    query = prenet(prev)
    context, align = attention(query, enc)
    state = decoder_rnn(concat(query, context), state)
    mel, stop_logit = linear_projection(state, context)
    mel_frames.append(mel)
    if sigmoid(stop_logit) > threshold:
        break
    prev = mel

mel_refined = mel_frames + postnet(mel_frames)
waveform = wavenet_vocoder(mel_refined)
```

Tacotron 2 的设计动机是拆开 TTS 中最难的两个问题：先让一个注意力 seq2seq 模型学习文本到声学中间表示的对齐，再让声码器根据该表示生成波形。mel-spectrogram 比线性频谱低维，也比 phoneme duration、\(F_0\)、能量等手工特征更容易从数据中学习。

声学模型的训练目标是最小化预测 mel 与真实 mel 的均方误差，并加入 stop token 的二分类损失：
$$
\mathcal{L}=\|Y-\hat{Y}\|_2^2+\|Y-\hat{Y}_{post}\|_2^2+\mathcal{L}_{stop}
$$
其中 \(\hat{Y}\) 是解码器初始输出，\(\hat{Y}_{post}\) 是 post-net 修正后的输出。post-net 的作用不是重新生成频谱，而是补充局部频谱细节，使输出更接近真实分布。

attention 模块承担隐式对齐功能：每一步 mel 解码都会在文本编码状态上产生权重。相比显式 duration 模型，这种方式更灵活，但也带来漏词、重复、长句失稳等问题，后来 FastSpeech 等方法正是针对这些缺陷改进。

WaveNet 声码器接收 mel 作为局部条件 \(c_t\)，建模：
$$
p(x)=\prod_t p(x_t \mid x_{<t}, c_t)
$$
论文的重要结论是，仅使用 mel 条件就能训练出自然度很高的 WaveNet，说明前端声学模型不必输出复杂的传统声码器参数。

> 💡 关键：Tacotron 2 的影响在于确立了现代 TTS 的经典分工：文本前端负责预测 mel，神经声码器负责从 mel 还原高保真波形。

#### 🧪 练习题
```yaml
question: "Tacotron 2 中 post-net 的主要作用是什么？"
options:
  - "把文本转换成字符嵌入"
  - "预测 stop token"
  - "对解码器生成的 mel 频谱做残差修正"
  - "替代 WaveNet 直接输出波形"
answer: 2
explain: "post-net 是卷积网络，输出加到初始 mel 预测上，用于补充局部频谱细节并改善收敛。"
```
