### FastSpeech：快速鲁棒的 TTS
```yaml
id: "fastspeech"
name: "FastSpeech"
full_name: "FastSpeech: 快速鲁棒的TTS (FastSpeech: Fast, Robust and Controllable Text to Speech)"
year: "2019"
org: "Microsoft"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2019/hash/f63f65b5870931065885e0afa52ad6a8-Abstract.html"
category: "tts"
parent: "tacotron2"
motivation: "非自回归并行合成+长度预测器"
```

#### 📝 一句话总结
FastSpeech 提出了基于 Feed-Forward Transformer 的非自回归 TTS，用 duration predictor 和 length regulator 显式展开音素长度，解决 Tacotron 类自回归解码慢、易漏读或重复的问题。

#### 🎯 核心要点
- 将 mel-spectrogram 生成从自回归改为并行非自回归。
- 使用教师模型提取 phoneme-to-mel attention alignment 作为 duration 监督。
- Length Regulator 按音素时长复制 hidden states，使文本侧序列长度匹配 mel 侧。
- Duration Predictor 训练后可在推理时预测每个音素持续帧数。
- 基础块为 Feed-Forward Transformer block，包含 self-attention 与 1D convolution。
- 可通过调节 duration 长度控制语速，也可插入停顿改善韵律。

#### 🔬 深入细节
![FastSpeech 前馈 Transformer](https://ar5iv.labs.arxiv.org/html/1905.09263/assets/x1.png)
![FastSpeech Length Regulator](https://ar5iv.labs.arxiv.org/html/1905.09263/assets/x3.png)
*图：FastSpeech 的非自回归前馈结构与长度调节器。论文 Figure 1 还包含 FFT block 与 duration predictor 子图。*

```python
# FastSpeech 训练和推理流程
teacher = train_or_load_autoregressive_tts()
durations = extract_durations_from_teacher_attention(text, mel_target)

h_phoneme = phoneme_side_fft(phoneme_embeddings)
h_mel = length_regulator(h_phoneme, durations)  # repeat each phoneme state
mel_pred = mel_side_fft(h_mel)
duration_pred = duration_predictor(h_phoneme)

loss = mse(mel_pred, mel_target) + mse(log(duration_pred + 1), log(durations + 1))

# inference
h_phoneme = phoneme_side_fft(phoneme_embeddings)
dur_hat = round(exp(duration_predictor(h_phoneme)) - 1) * speed_control
h_mel = length_regulator(h_phoneme, dur_hat)
mel = mel_side_fft(h_mel)
waveform = vocoder(mel)
```

Tacotron 2 的瓶颈在于 mel 帧逐步生成，每一步依赖上一帧，还要依赖 attention 自动对齐。若 attention 在长句中偏移，就会出现重复、跳词或提前结束。FastSpeech 把对齐从隐变量变成显式 duration，使 mel 生成可以一次性并行完成。

Length Regulator 是方法的关键。给定音素隐状态序列 \(H=[h_1,\dots,h_n]\) 和时长 \(D=[d_1,\dots,d_n]\)，它将每个 \(h_i\) 复制 \(d_i\) 次：
$$
\mathrm{LR}(H,D)=[\underbrace{h_1,\dots,h_1}_{d_1},\underbrace{h_2,\dots,h_2}_{d_2},\dots,\underbrace{h_n,\dots,h_n}_{d_n}]
$$
这样输出长度直接对齐 mel 帧数，后续 FFT block 只需并行建模帧间依赖。

Duration Predictor 的监督来自教师模型 attention 的硬对齐统计，而不是人工标注。训练后推理时无需教师，模型先预测 \(d_i\)，再展开隐状态。语速控制可通过 \(d_i'=\alpha d_i\) 实现，\(\alpha<1\) 加快语速，\(\alpha>1\) 放慢语速。

FFT block 不是完整 Transformer decoder，而是前馈结构：self-attention 捕获全局上下文，1D convolution 捕获局部连续性。没有 autoregressive feedback 后，训练和推理都更稳定，但也更依赖 duration 质量和教师对齐质量。

> ⚠️ 注意：FastSpeech 仍不是端到端波形模型，它输出 mel-spectrogram，最终音频质量仍依赖外部声码器。

#### 🧪 练习题
```yaml
question: "FastSpeech 中 Length Regulator 的作用是什么？"
options:
  - "把 mel 频谱压缩成离散 token"
  - "按预测或提取的 duration 复制音素隐状态，使其匹配 mel 帧长度"
  - "对 WaveNet 输出做后处理"
  - "计算 CLAP 文本音频相似度"
answer: 1
explain: "Length Regulator 将音素级序列显式展开到帧级序列，这是 FastSpeech 能并行生成 mel 的核心。"
```
