### WaveNet：生成式原始音频模型
```yaml
id: "wavenet"
name: "WaveNet"
full_name: "WaveNet: 生成式原始音频模型 (WaveNet: A Generative Model for Raw Audio)"
year: "2016"
org: "DeepMind"
paper_url: "https://arxiv.org/abs/1609.03499"
category: "tts"
parent: "—"
motivation: "空洞因果卷积自回归生成原始波形"
```

#### 📝 一句话总结
WaveNet 提出了直接在原始音频采样点上建模的自回归生成网络，用空洞因果卷积扩大感受野，解决了传统 TTS 声码器和统计参数模型难以生成自然波形细节的问题。

#### 🎯 核心要点
- 将音频联合分布分解为逐采样点条件概率，直接生成 raw waveform。
- 使用因果卷积保证预测 \(x_t\) 时不泄漏未来采样点。
- 使用指数增长的 dilated causal convolution，在较少层数下覆盖长时间上下文。
- 每个残差块采用 gated activation、residual connection 和 skip connection。
- 输出端可使用 \(\mu\)-law 量化后的 softmax，也可扩展为 mixture density 输出。
- 条件生成支持全局说话人条件和局部语言学特征条件，可用于多说话人 TTS。

#### 🔬 深入细节
![WaveNet 残差块与整体架构](https://ar5iv.labs.arxiv.org/html/1609.03499/assets/x3.png)
*图：WaveNet 的残差块、跳连聚合与整体自回归波形生成结构。*

```python
# WaveNet 训练与采样核心流程
for waveform in training_set:
    x = mu_law_quantize(waveform)
    h = causal_conv(x[:, :-1])
    skip_sum = 0
    for dilation in [1, 2, 4, ..., 512] * num_stacks:
        z = dilated_causal_conv(h, dilation)
        gated = tanh(z.filter) * sigmoid(z.gate)
        h = h + conv1x1(gated)          # residual path
        skip_sum += conv1x1(gated)      # skip path
    logits = post_net(relu(skip_sum))
    loss = cross_entropy(logits, x[:, 1:])

samples = []
for t in range(num_samples):
    logits = wavenet(samples, conditioning)
    samples.append(sample_softmax(logits[-1]))
```

WaveNet 的核心建模假设是把波形 \(x = \{x_1,\dots,x_T\}\) 写成自回归分解：
$$
p(x)=\prod_{t=1}^{T}p(x_t \mid x_1,\dots,x_{t-1})
$$
这使模型不再依赖手工声学参数或传统声码器，而是学习每一个采样点在历史波形条件下的离散分布。代价是采样天然串行，因此 WaveNet 的训练很并行，推理却较慢。

因果卷积解决了时间顺序约束：卷积核只看当前位置之前的输入。仅用普通因果卷积会让感受野线性增长，覆盖 16 kHz 或 24 kHz 音频中的长程韵律需要极深网络。WaveNet 因此引入空洞卷积，若 dilation 按 \(1,2,4,\dots\) 增长，感受野可指数扩展：
$$
y_t = \sum_{k=0}^{K-1} w_k x_{t-dk}
$$
其中 \(d\) 是 dilation。直觉上，低层捕获局部波形周期，高层以稀疏间隔观察更长上下文。

每个残差块使用门控激活：
$$
z = \tanh(W_{f,k} * x) \odot \sigma(W_{g,k} * x)
$$
\(\tanh\) 分支生成候选特征，\(\sigma\) 分支控制通过多少信息。残差连接让深层空洞卷积可训练，skip connection 将每层不同尺度的证据汇聚到输出端。

在 TTS 条件生成中，WaveNet 可以接收全局条件 \(h\)，如 speaker id；也可以接收局部条件 \(h_t\)，如 linguistic features 或 mel-spectrogram。条件项进入门控卷积后，相当于让每个采样点的分布同时受历史波形和文本派生声学信息控制。

> 💡 关键：WaveNet 的突破不只是“卷积生成音频”，而是把 PixelCNN 式自回归密度估计搬到一维高采样率波形上，并用空洞因果卷积让长上下文建模变得可训练。

#### 🧪 练习题
```yaml
question: "WaveNet 使用空洞因果卷积的主要目的是什么？"
options:
  - "减少输出采样率"
  - "在不泄漏未来信息的前提下扩大感受野"
  - "把波形转换为 mel 频谱"
  - "让采样过程完全并行"
answer: 1
explain: "因果卷积保证只依赖过去采样点，空洞卷积让感受野随层数快速增大；WaveNet 的原始采样过程仍是自回归串行的。"
```
