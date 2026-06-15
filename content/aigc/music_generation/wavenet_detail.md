### WaveNet

```yaml
id: wavenet
name: WaveNet
full_name: "波网 (WaveNet)"
year: "2016.09"
org: "Google DeepMind"
paper_url: "https://arxiv.org/abs/1609.03499"
category: "early_neural"
parent: "—"
motivation: "扩张因果卷积实现原始音频波形的自回归生成"
```

#### 📝 一句话总结

WaveNet 提出用扩张因果卷积直接建模原始音频波形的自回归分布，解决了传统声码器和帧级声学模型难以生成自然细粒度波形的问题。它把音频生成从手工声学特征推进到端到端概率建模，并成为后续神经声码器、神经音频合成和音乐生成模型的基础。

#### 🎯 核心要点

- **原始波形自回归建模**：将音频序列分解为 \(p(x)=\prod_t p(x_t \mid x_{<t})\)，逐采样点预测下一个量化值
- **因果卷积**：卷积输出只依赖历史采样点，保证生成时不会看到未来信息
- **扩张卷积栈**：用 dilation \(1,2,4,\ldots\) 指数级扩大感受野，在不显著增加层数和计算量的情况下覆盖更长上下文
- **门控激活单元**：使用 \(\tanh\) 与 \(\sigma\) 的逐元素乘积提升非线性建模能力
- **残差与跳连结构**：深层卷积堆叠通过 residual/skip connections 稳定训练，并汇聚多尺度特征输出 softmax 分布
- **条件生成机制**：支持全局条件（说话人 ID）和局部条件（语言学特征、\(F_0\) 等），可用于 TTS 和音乐条件生成
- **离散输出分布**：早期版本使用 \(\mu\)-law companding 将 16-bit 波形压缩为 8-bit 256 类分类任务

#### 🔬 深入细节

##### 核心示意图/框架图

![WaveNet 残差块与整体架构](https://ar5iv.labs.arxiv.org/html/1609.03499/assets/x3.png)
*图：WaveNet 的残差块和整体网络。输入波形经过多层扩张因果卷积，每层产生 residual 和 skip 输出，最后用 softmax 预测下一个音频采样值。*

![WaveNet 扩张因果卷积](https://ar5iv.labs.arxiv.org/html/1609.03499/assets/x2.png)
*图：dilation 逐层增大后，模型能用较少层数覆盖长时间感受野。*

##### 算法伪代码

```python
# WaveNet 训练与采样核心流程

def wavenet_block(x, cond=None, dilation=1):
    h = causal_dilated_conv(x, dilation=dilation)
    if cond is not None:
        h = h + project_condition(cond)
    z = tanh(filter_proj(h)) * sigmoid(gate_proj(h))
    residual = x + residual_proj(z)
    skip = skip_proj(z)
    return residual, skip

# 训练: teacher forcing
for waveform in dataset:
    x = mu_law_quantize(waveform)      # 256-way categorical target
    h = embed(x[:, :-1])
    skips = []
    for dilation in [1, 2, 4, ..., 512] * num_stacks:
        h, s = wavenet_block(h, cond=local_or_global_cond, dilation=dilation)
        skips.append(s)
    logits = output_network(sum(skips))
    loss = cross_entropy(logits, x[:, 1:])
    optimizer.step(loss)

# 推理: 逐采样点自回归生成
samples = [initial_value]
for t in range(num_audio_samples):
    logits = model(samples, cond)
    next_x = sample_from_softmax(logits[-1])
    samples.append(next_x)
audio = inverse_mu_law(samples)
```

##### 方法解读

WaveNet 的出发点是把音频当作极高频率的一维序列来建模。传统 TTS 或乐音合成常先预测声学特征，再依赖声码器合成波形；这种管线会引入手工特征和声码器假设。WaveNet 直接对原始波形给出概率分布：

$$
p(\mathbf{x})=\prod_{t=1}^{T}p(x_t \mid x_1,\ldots,x_{t-1})
$$

这意味着模型每一步只需要回答一个明确问题：在已有历史波形下，下一个采样点应该是什么。由于音频采样率可达 16 kHz 或更高，普通 RNN 难以稳定覆盖长上下文，普通因果卷积又需要极深网络才能获得足够感受野。WaveNet 的核心设计是扩张因果卷积：第 \(l\) 层以间隔 \(d_l\) 读取过去值，常用 \(d_l=2^l\)。这样感受野随层数指数增长，但输出长度保持不变。

每个残差块包含门控激活：

$$
\mathbf{z}=\tanh(W_{f,k} * \mathbf{x}) \odot \sigma(W_{g,k} * \mathbf{x})
$$

其中 \(W_{f,k}\) 和 \(W_{g,k}\) 是第 \(k\) 层的滤波器和门控卷积核，\(\odot\) 是逐元素乘法。直觉上，\(\tanh\) 分支生成候选声学特征，\(\sigma\) 分支决定哪些信息通过。残差连接让深层网络保留输入路径，skip connection 把不同感受野的特征汇总到输出层，既利于优化，也让模型同时利用短期相位细节和较长的音素/乐句上下文。

条件 WaveNet 在卷积层中加入条件项：

$$
\mathbf{z}=\tanh(W_f * \mathbf{x}+V_f^\top \mathbf{h}) \odot \sigma(W_g * \mathbf{x}+V_g^\top \mathbf{h})
$$

全局条件 \(\mathbf{h}\) 可以是说话人或乐器标签，局部条件可以是与时间对齐的语言学特征、音高或声学控制序列。局部条件通常先上采样到音频采样级别，再注入每个残差块。这个机制解释了为什么 WaveNet 不只是一个无条件波形模型，也能成为 TTS、音色迁移和神经声码器的组件。

> 💡 关键：WaveNet 的突破不在于单个卷积层，而在于“严格因果 + 指数扩张 + 残差/跳连 + 离散概率输出”这一整套可训练的波形密度模型。

##### 与传统方法的区别

与 HMM、拼接式 TTS 或基于参数声码器的系统相比，WaveNet 不显式假设源-滤波器模型，也不把相位、频谱包络等拆成手工模块。与普通 RNN 音频模型相比，扩张卷积可以并行训练，teacher forcing 下整段序列的损失可一次计算；代价是推理仍然逐采样点串行，早期 WaveNet 采样速度非常慢。后续 Parallel WaveNet、WaveRNN、WaveGlow 等工作基本都在继承其波形建模质量的同时解决推理效率问题。

#### 🧪 练习题

```yaml
question: "WaveNet 使用扩张因果卷积的主要目的是什么？"
options:
  - "把连续音频直接压缩成 MIDI token"
  - "在不访问未来采样点的前提下，用较少层数获得更大的历史感受野"
  - "让模型一次性并行生成所有音频采样点"
  - "替代 softmax，使输出变成连续高斯分布"
answer: 1
explain: "扩张因果卷积保持自回归因果性，同时通过逐层增大的 dilation 指数级扩大感受野，使模型能利用更长的历史音频上下文。"
```
