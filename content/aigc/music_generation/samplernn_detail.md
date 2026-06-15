### SampleRNN

```yaml
id: samplernn
name: SampleRNN
full_name: "采样循环网络 (SampleRNN)"
year: "2017.02"
org: "MILA"
paper_url: "https://openreview.net/forum?id=Skx9Pbsge"
category: "early_neural"
parent: "wavenet"
motivation: "分层RNN结构优化长序列音频生成的内存效率"
```

#### 📝 一句话总结

SampleRNN 提出用多层时间尺度的 RNN/MLP 层级结构逐采样点生成音频，解决单一自回归网络难以同时捕获长程结构和局部波形细节的问题。相比 WaveNet 的深层卷积堆叠，它把长序列依赖交给低频帧级 RNN，把采样级细节交给轻量 MLP。

#### 🎯 核心要点

- **层级自回归音频模型**：高层 frame-level RNN 以较粗时间粒度建模长期上下文，底层 sample-level MLP 预测单个采样点
- **多时间尺度设计**：每个 tier 以不同帧长 \(FS^{(k)}\) 和上采样比例运行，逐层向更细粒度条件传递
- **逐样本概率分解**：仍然建模 \(p(x)=\prod_i p(x_i\mid x_{<i})\)，但上下文摘要由层级 RNN 提供
- **truncated BPTT 友好**：高层 RNN 在帧级运行，序列长度显著缩短，降低内存压力
- **离散或连续输出均可**：论文实验包含 8-bit softmax 与 mixture density 等变体，主结果常用离散量化
- **无条件端到端生成**：在语音、音乐和拟声数据集上不依赖外部声学特征，直接学习波形分布

#### 🔬 深入细节

##### 核心示意图/框架图

![SampleRNN 三层级结构](https://ar5iv.labs.arxiv.org/html/1612.07837/assets/x1.png)
*图：SampleRNN 在时间步 \(i\) 的展开结构。高层 RNN 处理较长帧，输出经过上采样传给下一层；最低层 sample-level MLP 结合历史采样点预测当前采样。*

##### 算法伪代码

```python
# SampleRNN K-tier 训练流程（简化）

def frame_rnn_tier(prev_frames, upper_condition, hidden):
    # prev_frames: 当前 tier 的历史帧片段
    inp = linear(prev_frames) + upper_condition
    h = rnn(inp, hidden)
    return upsample(linear(h)), h

for audio in dataset:
    x = quantize(audio)
    # 按不同 frame size 切块，例如 8、2、1 samples
    conditions = None
    hidden_states = init_hidden_states()
    for k in reversed(range(1, K)):  # coarse -> fine
        frame_seq = make_frames(x, frame_size=FS[k])
        conditions, hidden_states[k] = frame_rnn_tier(
            frame_seq.previous_frames(),
            conditions,
            hidden_states[k],
        )

    # sample-level MLP: 使用最近若干真实采样点和上层条件预测下一个采样
    logits = sample_mlp(previous_samples=x[:, :-1], condition=conditions)
    loss = cross_entropy(logits, x[:, 1:])
    optimizer.step(loss)

# 采样时所有 tier 自回归推进，每产生一个采样点就更新底层上下文
```

##### 方法解读

SampleRNN 和 WaveNet 共享同一个概率目标：逐采样点预测原始波形。但它对“长上下文从哪里来”给出了不同答案。WaveNet 通过扩张卷积把感受野做大；SampleRNN 则显式划分时间尺度，让高层 RNN 每一步处理一段帧，低层模型只负责局部样本级细节。形式上，最低层仍输出：

$$
p(x_i \mid x_{<i})=\mathrm{Softmax}(f_\theta(x_{i-q},\ldots,x_{i-1}, c_i))
$$

其中 \(c_i\) 是上层 frame-level RNN 下传的条件向量，\(q\) 是 sample-level MLP 可见的短期历史长度。这样，局部相位和波形连续性由 MLP 直接看最近样本来保证，节奏、音色变化和音素级结构由更粗粒度 RNN 的隐藏状态提供。

每个 frame-level tier 的输入不是单个采样点，而是长度为 \(FS^{(k)}\) 的非重叠帧。高层 tier 的输出通过线性层和重复/上采样对齐到下层时间分辨率。若有三层结构，最上层可能每 8 个采样更新一次，中间层每 2 个采样更新一次，底层每个采样更新一次。这个设计减少了高层 RNN 的有效序列长度，使它能在有限显存下处理更长音频片段。

> 💡 关键：SampleRNN 的“层级”不是多层神经网络的普通堆叠，而是不同时间分辨率上的自回归分解；越高层越慢、越抽象，越低层越快、越贴近波形。

训练时通常使用 teacher forcing：模型看到真实历史采样点，预测下一个量化值。推理时则必须逐样本生成，并把生成值反馈给下一步。由于高层 RNN 的状态可以缓存，采样时不需要每一步重算完整历史；但生成本质仍是串行的。论文还强调 truncated BPTT 的重要性，因为直接对数万采样点做完整反向传播代价过高。

##### 与 WaveNet 的关系

WaveNet 依赖无循环的扩张卷积，训练并行性更好；SampleRNN 依赖 RNN 隐状态，天然适合摘要长程历史。WaveNet 的每个采样点经过相同卷积栈，感受野由 dilation 决定；SampleRNN 的感受野由高层帧状态和 BPTT 截断共同决定。两者都能生成原始音频，但 SampleRNN 的工程重点是内存效率和层级时间抽象，这对早期长音频生成尤其有价值。

#### 🧪 练习题

```yaml
question: "SampleRNN 中 frame-level RNN tier 的核心作用是什么？"
options:
  - "直接输出最终音频文件的频谱图"
  - "在较粗时间尺度上汇总历史上下文，并把条件传给更细粒度层"
  - "把 MIDI 事件转换为乐谱"
  - "替代所有自回归采样，使音频一次生成完成"
answer: 1
explain: "SampleRNN 通过 frame-level RNN 在低频时间尺度建模长期依赖，再将其输出上采样为 sample-level MLP 的条件，从而兼顾长程结构和局部波形细节。"
```
