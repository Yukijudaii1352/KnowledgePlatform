### YourTTS：零样本多说话人 TTS
```yaml
id: "yourtts"
name: "YourTTS"
full_name: "YourTTS: 零样本多说话人TTS (YourTTS: Towards Zero-Shot Multi-Speaker TTS)"
year: "2022"
org: "Coqui"
paper_url: "https://proceedings.mlr.press/v162/casanova22a.html"
category: "voice_clone"
parent: "vits"
motivation: "多语言零样本VITS克隆"
```

#### 📝 一句话总结
YourTTS 在 VITS 基础上加入跨语言多说话人建模和说话人嵌入条件，使模型能用少量参考语音进行零样本语音克隆和跨语言 TTS。

#### 🎯 核心要点
- 以 VITS 为骨干，保留条件 VAE、flow、随机时长预测和 GAN decoder。
- 使用外部 speaker encoder 提取参考语音的说话人嵌入。
- 训练覆盖多说话人、多语言数据，增强零样本泛化。
- 在文本编码、duration、decoder 等模块注入 speaker embedding。
- 支持 zero-shot voice cloning、cross-lingual TTS 和 voice conversion。
- 通过 speaker consistency 指标和 MOS/Sim-MOS 评估相似度与自然度。

#### 🔬 深入细节
![YourTTS 训练流程](https://ar5iv.labs.arxiv.org/html/2112.02418/assets/x1.png)
![YourTTS 推理流程](https://ar5iv.labs.arxiv.org/html/2112.02418/assets/x2.png)
*图：YourTTS 在 VITS 训练和推理流程中加入参考说话人嵌入。*

```python
# YourTTS 零样本克隆流程
ref_audio = load_reference_speech()
speaker_emb = speaker_encoder(ref_audio)

phonemes = text_frontend(text, language_id)
prior = text_encoder(phonemes, speaker_emb, language_id)
duration = stochastic_duration_predictor.sample(prior, speaker_emb)
alignment = length_regulate(duration)
z = inverse_flow(sample(prior, alignment), speaker_emb)
wave = decoder(z, speaker_emb)
```

VITS 已经能端到端生成自然语音，但普通多说话人 VITS 通常依赖训练集中固定 speaker id。YourTTS 的关键改造是把 speaker id 换成由参考音频提取的连续 speaker embedding，使未见说话人也能作为条件输入。

说话人嵌入可以看作 timbre 条件 \(s\)，模型学习：
$$
p(y \mid x, s, l)
$$
其中 \(x\) 是文本或音素，\(s\) 是参考音频的说话人向量，\(l\) 是语言条件。这样，文本内容、语言发音模式和说话人音色被显式分开输入。

训练阶段，posterior encoder 仍从真实语音中得到潜变量，text encoder 产生条件先验，flow 对齐两者分布；不同的是 speaker embedding 会调制多个模块，让音色信息贯穿 duration、prior 和 waveform decoder。

跨语言场景更难，因为参考音频可能是语言 A，而目标文本是语言 B。YourTTS 通过多语言训练让说话人嵌入更偏向音色而非语义内容，同时用语言 id 或语言相关前端帮助模型生成正确发音。

> ⚠️ 资料限制：manifest 给出的 PMLR 页面是正式论文入口；此处方法图采用公开 ar5iv 转换页中的同论文图像路径。若图片服务不可用，正文方法解读仍可独立理解算法流程。

#### 🧪 练习题
```yaml
question: "YourTTS 实现零样本语音克隆的关键条件信息是什么？"
options:
  - "从参考语音提取的 speaker embedding"
  - "随机初始化的 speaker id"
  - "CLAP 文本嵌入"
  - "只包含音量的标量条件"
answer: 0
explain: "YourTTS 使用 speaker encoder 从参考音频提取连续说话人向量，并将其注入 VITS 模块以控制目标音色。"
```
