### NSynth

```yaml
id: nsynth
name: NSynth
full_name: "神经音色合成 (NSynth)"
year: "2017"
org: "Google Magenta"
paper_url: "https://arxiv.org/abs/1704.01279"
category: "early_neural"
parent: "wavenet"
motivation: "WaveNet自编码器学习乐器音色的潜在表示"
```

#### 📝 一句话总结

NSynth 提出 WaveNet-style autoencoder 来学习乐器单音的时间分布式潜在表示，并发布大规模 NSynth 数据集，解决神经音频合成缺少高质量、可控音色数据和可插值表示的问题。它把 WaveNet 从纯自回归生成扩展为可编码、可重建、可音色插值的神经乐器模型。

#### 🎯 核心要点

- **WaveNet 自编码器**：编码器从原始音频提取时间分布式 embedding，解码器用 WaveNet 在 embedding 条件下自回归重建波形
- **时间分布式潜变量**：不是单一全局向量，而是约每 32 ms 一个 embedding，能捕获音色包络和动态变化
- **音高条件控制**：可将 MIDI pitch one-hot 与 embedding 拼接，使音色表示更少纠缠音高
- **NSynth 数据集**：305,979 个 4 秒单音样本，覆盖 1,006 种乐器、多个音高、力度、音源和乐器家族标注
- **音色插值能力**：在 embedding 空间线性插值可生成介于两种乐器之间的新音色
- **对比频谱自编码器**：论文比较 WaveNet AE 与基于频谱的 baseline，强调原始波形解码对听感和相位细节的优势

#### 🔬 深入细节

##### 核心示意图/框架图

![NSynth WaveNet 自编码器结构](https://ar5iv.labs.arxiv.org/html/1704.01279/assets/NSynth_figs_Diagrams.png)
*图：论文比较的两个模型。右侧 WaveNet autoencoder 用非因果卷积编码器提取时间 embedding，再用条件 WaveNet 解码原始波形。*

##### 算法伪代码

```python
# NSynth WaveNet Autoencoder 核心流程

for note_audio, pitch in nsynth_dataset:
    # 1. 编码：从原始波形提取较低帧率的时间 embedding
    z = encoder_noncausal_conv(note_audio)      # [T_embed, D]
    z = average_pool(z, stride=512)             # 约 32 ms 一个 embedding

    # 2. 可选音高条件：帮助 disentangle timbre and pitch
    if use_pitch_condition:
        z = concat(z, one_hot(pitch).repeat(T_embed))

    # 3. 上采样到采样级，作为每层 WaveNet decoder 的局部条件
    cond = nearest_neighbor_upsample(z, target_len=len(note_audio))

    # 4. 自回归重建
    logits = wavenet_decoder(previous_samples=note_audio[:-1], condition=cond)
    loss = cross_entropy(logits, mu_law_quantize(note_audio[1:]))
    optimizer.step(loss)

# 音色插值
z_mix = (1 - alpha) * encoder(audio_a) + alpha * encoder(audio_b)
new_timbre = wavenet_decode(z_mix, pitch=target_pitch)
```

##### 方法解读

NSynth 的问题意识来自早期神经音频模型的两难：WaveNet/SampleRNN 能生成高质量局部波形，但无条件模型缺少可控的全局表示；传统频谱自编码器有潜变量，但频谱重建和 Griffin-Lim 等相位恢复容易损失音质。NSynth 结合两者：用编码器学习潜在表示，用 WaveNet 解码器负责高保真波形生成。

模型的生成分布可写为：

$$
p(\mathbf{x}\mid \mathbf{z}, y)=\prod_{t=1}^{T}p(x_t \mid x_{<t}, \mathrm{upsample}(\mathbf{z}), y)
$$

其中 \(\mathbf{z}\) 是编码器输出的时间 embedding，\(y\) 是可选 pitch 条件。这里的 \(\mathbf{z}\) 不像图像自编码器那样压成一个向量，而是保留时间轴。对乐器音色而言，起音、稳定段、衰减段都很关键；时间分布式 embedding 能作为“驱动函数”控制 WaveNet 解码器的动态行为。

NSynth 数据集同样是核心贡献。每个样本是 4 秒单音：前 3 秒持续发声，最后 1 秒自然衰减；采样率 16 kHz；标注包含 pitch、velocity、instrument family、source 等。这个设计将复杂音乐生成问题拆成可控的单音合成任务，让模型能学习“同一个音高下不同乐器音色如何变化”和“同一乐器跨音高/力度如何变化”。

> 💡 关键：NSynth 的 embedding 空间不是为了压缩音频本身，而是为了得到可插值、可控制的音色表示；WaveNet decoder 则负责把该表示还原为听感自然的波形。

##### 训练与推理流程

训练阶段，编码器和 WaveNet 解码器端到端优化重建交叉熵。编码器使用非因果卷积，因此可以同时查看音符的前后上下文；解码器保持因果性，只在生成第 \(t\) 个采样时看历史采样和上采样后的 embedding。推理时可以输入真实乐器音频得到 \(\mathbf{z}\)，也可以在两个 embedding 间插值：

$$
\mathbf{z}_{mix}=(1-\alpha)\mathbf{z}_A+\alpha\mathbf{z}_B
$$

再指定目标 pitch 让 decoder 合成新音色。论文展示这种线性插值不是简单音频叠加，而是在潜空间中形成更平滑的中间音色。

##### 与传统方法的区别

频谱自编码器通常在幅度谱上建模，重建时必须处理相位；WaveNet AE 直接输出波形概率，能保留更自然的瞬态和谐波结构。无条件 WaveNet 学到的是音频分布，不提供显式音色控制；NSynth 增加编码器后，模型具备分析-合成能力。对音乐生成后续工作而言，NSynth 的重要性不只是一个模型，而是证明了“可学习音频表示 + 神经解码器”可以成为乐器合成和音色迁移的基础范式。

#### 🧪 练习题

```yaml
question: "NSynth 的 WaveNet autoencoder 为什么使用时间分布式 embedding，而不是单个全局向量？"
options:
  - "因为 WaveNet 只能接收二维图片输入"
  - "为了保留起音、稳定段和衰减等随时间变化的音色动态"
  - "为了避免使用任何自回归解码器"
  - "为了把所有乐器强制映射到同一个音高"
answer: 1
explain: "乐器单音的音色随时间变化明显，时间分布式 embedding 能为 WaveNet 解码器提供局部动态条件，比单个全局向量更适合控制包络和细节。"
```
