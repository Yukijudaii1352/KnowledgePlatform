### 卷积增强Transformer (Conformer)

```yaml
id: conformer
name: Conformer
full_name: 卷积增强Transformer (Conformer)
year: '2020'
org: Google
paper_url: https://arxiv.org/abs/2005.08100
category: asr
parent: rnn_t
motivation: CNN+Transformer混合架构
```

#### 📝 一句话总结

Conformer 提出在 ASR 编码器中把 Transformer 的全局自注意力与 CNN 的局部卷积建模组合起来，用 Macaron 式双前馈层夹住 MHSA 和深度可分离卷积模块，解决纯 Transformer 局部模式不足、纯 CNN 全局依赖建模低效的问题。

#### 🎯 核心要点

- **Conformer block**：由半步残差 FFN、相对位置 MHSA、卷积模块、半步残差 FFN 和最终 LayerNorm 串联组成
- **局部+全局联合建模**：MHSA 负责内容相关的长程依赖，卷积模块负责相对位置局部相关和细粒度声学模式
- **Macaron FFN 结构**：两个 feed-forward module 分布在注意力/卷积前后，每个使用 \(1/2\) residual weight
- **卷积模块设计**：LayerNorm → pointwise convolution → GLU → 1D depthwise convolution → BatchNorm → Swish → pointwise convolution → Dropout
- **相对位置编码**：借鉴 Transformer-XL 的 relative sinusoidal positional encoding，增强对不同 utterance 长度的泛化
- **Conformer-Transducer 实例化**：在 LibriSpeech 上以 Conformer encoder + 单层 LSTM decoder + RNN-T/Transducer 训练
- **高参数效率**：10.3M、30.7M、118.8M 三档模型均优于同级强基线；118.8M 大模型在 test-clean/test-other 达到 2.1/4.3 WER，无 LM 时已很强

#### 🔬 深入细节

##### 架构总览

![Conformer 编码器架构图](https://ar5iv.labs.arxiv.org/html/2005.08100/assets/x1.png)
*图：Conformer encoder 先做卷积下采样，再堆叠 N 个 Conformer block；每个 block 用两个半步 FFN 夹住 MHSA 和卷积模块。*

![Conformer 卷积模块图](https://ar5iv.labs.arxiv.org/html/2005.08100/assets/x2.png)
*图：Conformer convolution module 使用 pointwise convolution + GLU 做通道门控，再用 1D depthwise convolution 捕获局部时间模式。*

```python
# Conformer encoder block 伪代码
def conformer_block(x):
    # Macaron-style: 前置 FFN 只走半步 residual
    x_tilde = x + 0.5 * feed_forward_module(x)

    # 全局内容依赖：relative positional MHSA
    x_att = x_tilde + mhsa_module(x_tilde, relative_positional_encoding=True)

    # 局部时间模式：GLU + depthwise conv + BN + Swish
    x_conv = x_att + convolution_module(x_att)

    # 后置 FFN 仍然是半步 residual，最后做 layernorm
    y = layer_norm(x_conv + 0.5 * feed_forward_module(x_conv))
    return y

def convolution_module(x):
    h = layer_norm(x)
    h = pointwise_conv1d(h, out_channels=2 * d_model)
    h = glu(h)                         # 门控线性单元
    h = depthwise_conv1d(h, kernel_size=32)
    h = batch_norm(h)
    h = swish(h)
    h = pointwise_conv1d(h, out_channels=d_model)
    h = dropout(h, p=0.1)
    return h

def conformer_transducer(features):
    # 80-channel filterbank, 25 ms window, 10 ms stride
    x = specaugment(features)
    x = convolution_subsampling(x)      # 10 ms -> 40 ms rate
    for _ in range(num_encoder_layers):
        x = conformer_block(x)
    return transducer_loss(encoder=x, decoder=single_layer_lstm_decoder)
```

##### 1. 为什么 ASR 需要同时建模全局和局部

语音识别的输入是长时间序列。Transformer 的 self-attention 擅长让任意两个时间步直接交互，适合捕获跨音节、跨词甚至跨短语的上下文依赖；但它对局部平移等变性没有天然偏置，容易把短时声学模式的学习完全交给数据。CNN 则相反：卷积核在局部窗口内共享参数，天然适合捕获 formant 变化、音素边界、短时能量变化等局部模式，但要覆盖长距离依赖需要堆叠很多层或引入额外全局汇聚。

Conformer 的设计目标不是简单把 CNN 和 Transformer 并排拼接，而是在一个 ASR encoder block 内让二者按顺序协作。论文的消融显示，卷积模块放在 MHSA 之后比放在 MHSA 之前或并行分支更好。这可以理解为：MHSA 先基于全局内容重新组织每个时间步的表示，卷积再在这个更语义化的局部邻域上提取相对位置模式。

##### 2. Conformer block 的数学形式

对第 \(i\) 个 Conformer block，输入为 \(x_i\)，输出为 \(y_i\)。论文给出的 block 公式是：

$$
\begin{aligned}
\tilde{x}_i &= x_i + \frac{1}{2}\mathrm{FFN}(x_i) \\
x'_i &= \tilde{x}_i + \mathrm{MHSA}(\tilde{x}_i) \\
x''_i &= x'_i + \mathrm{Conv}(x'_i) \\
y_i &= \mathrm{LayerNorm}\left(x''_i + \frac{1}{2}\mathrm{FFN}(x''_i)\right)
\end{aligned}
$$

这里的 \(1/2\) residual weight 来自 Macaron-Net。直觉上，一个标准 Transformer block 通常只有一个 FFN，而 Conformer 把 FFN 拆成前后两个“半步”更新：前一个 FFN 先做逐位置非线性变换，随后 MHSA 和 Conv 分别处理全局与局部交互，最后再用第二个 FFN 做逐位置整合。这种结构既增加了表达能力，又避免两个 FFN 残差叠加过强。

##### 3. MHSA 模块：全局依赖与相对位置

Conformer 使用 multi-headed self-attention，并引入 Transformer-XL 风格的 relative sinusoidal positional encoding。ASR 中 utterance 长度差异很大，绝对位置编码会把模型绑定到训练时常见长度；相对位置编码让注意力更关注“两个声学帧相距多远”，这比“它们在整段语音中的绝对下标是多少”更符合语音序列的统计结构。

在每个 attention head 中，标准注意力仍可写作：

$$
\mathrm{Attention}(Q,K,V)
= \mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}} + B_{\mathrm{rel}}\right)V
$$

其中 \(B_{\mathrm{rel}}\) 表示由相对位置信息产生的偏置或等价打分项。这个模块负责捕获远距离内容关系，例如当前音素的判定依赖后续上下文、同音词附近词形信息、长音频中的语速变化等。

##### 4. 卷积模块：局部声学偏置

Conformer 的 convolution module 不是普通多层 CNN，而是轻量但有明确分工的局部建模单元。先用 pointwise convolution 把通道扩展到 \(2d\)，再经 GLU：

$$
\mathrm{GLU}(A,B)=A\otimes\sigma(B)
$$

GLU 相当于让模型学习“哪些通道在当前局部上下文中应该通过”。随后 1D depthwise convolution 沿时间轴对每个通道独立卷积，kernel size 在论文主模型中取 32，接着 BatchNorm 和 Swish 激活。depthwise convolution 的参数量远小于普通卷积，却保留了局部时间窗口的 inductive bias。

> 💡 关键：论文消融中，移除 convolution block 会使 Conformer 大模型的 test-other WER 从 4.3 上升到 4.9；把 Macaron FFN 去掉也会变差，说明性能来自多个结构选择的组合，但卷积子块是最关键因素之一。

##### 5. Conformer-Transducer 训练流程

论文把 Conformer 用在端到端 ASR 的 Transducer 框架中。输入是 80-channel filterbank，25 ms 窗口、10 ms 步长；先应用 SpecAugment，再经过 convolution subsampling，把帧率从 10 ms 降到 40 ms；之后堆叠多个 Conformer block。decoder 是单层 LSTM，训练目标是 RNN-T/Transducer loss，推理时可以配合外部 3 层 LSTM language model 做 shallow fusion。

实验给出三档模型：Conformer(S) 10.3M 参数、16 层 encoder、144 维、4 个 attention heads；Conformer(M) 30.7M 参数、16 层 encoder、256 维、4 heads；Conformer(L) 118.8M 参数、17 层 encoder、512 维、8 heads。三者卷积核大小均为 32，decoder 均为单层 LSTM。优化器使用 Adam，\(\beta_1=0.9,\beta_2=0.98,\epsilon=10^{-9}\)，并使用 Transformer learning-rate schedule 和 10k warmup。

##### 6. 与 RNN-T、纯 Transformer、纯 CNN 的区别

RNN-T 是一种序列转录训练目标与解码框架，本身不限定 encoder 必须是 RNN；Conformer 可以看作把 RNN-T 中的 acoustic encoder 升级为局部+全局混合建模器。相比纯 Transformer encoder，Conformer 增加了局部卷积偏置和门控；相比纯 CNN encoder，Conformer 用 self-attention 直接获取全局上下文，而不依赖非常深的卷积堆叠或全局池化。

在 LibriSpeech 上，Conformer(L) 不使用外部 LM 达到 test-clean/test-other 2.1/4.3 WER，使用 LM 后达到 1.9/3.9 WER。更重要的是参数效率：30.7M 的 Conformer(M) 已经超过 139M 参数的 Transformer Transducer 基线，10.3M 的 Conformer(S) 也优于同级 ContextNet(S)。这说明结构偏置对 ASR 的收益不只是更大模型带来的。

#### 🧪 练习题

```yaml
question: "Conformer block 中卷积模块放在 MHSA 之后的主要作用是什么？"
options:
  - "完全替代 self-attention，避免计算全局依赖"
  - "在全局上下文重组后的表示上补充局部时间模式和相对位置声学偏置"
  - "把 RNN-T 损失改写为 CTC 损失"
  - "只用于降低输入 filterbank 的采样率"
answer: 1
explain: "Conformer 先用 MHSA 建模全局内容交互，再用卷积模块捕获局部声学相关性；论文消融也显示这种顺序优于卷积在前或并行结构。"
```
