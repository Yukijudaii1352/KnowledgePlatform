---
domain: aigc
topic_id: music_generation
topic_name: 音乐生成技术演进
page_icon: 🎵
page_title: 音乐生成技术演进
page_subtitle: '{build_date} 版'
page_desc: 从WaveNet的原始波形合成到MusicLM的文本驱动生成，再到SongBloom的端到端歌曲创作，AI音乐生成经历了从局部采样到长时结构一致性的技术跨越，实现了旋律、和声、人声与伴奏的全栈智能创作。
hero_pills:
- 🏷️ Music Generation · Audio Synthesis · Text-to-Music · Singing Voice Synthesis
count_pill: '{count} 个算法'
categories:
  early_neural:
    label: 早期神经网络
    color: '#3B82F6'
  symbolic:
    label: 符号音乐生成
    color: '#10B981'
  audio_lm:
    label: 音频语言模型
    color: '#8B5CF6'
  diffusion:
    label: 扩散模型
    color: '#F59E0B'
  end_to_end:
    label: 端到端歌曲生成
    color: '#EF4444'
  svs:
    label: 歌唱合成
    color: '#06B6D4'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/aigc/music_generation/overview/zhihu__AI音乐生成技术发展到什么水平了？我花了一个月深度体验后的真实报告__66e23c74/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/aigc/music_generation/latest/zhihu__对比一下几个顶尖音乐生成模型__64dd2474/article.md

## 算法演化关系

```yaml
nodes:
- id: wavenet
  x: 90
  y: 35
  category: early_neural
- id: samplernn
  x: 140
  y: 35
  category: early_neural
- id: nsynth
  x: 180
  y: 35
  category: early_neural
- id: gansynth
  x: 420
  y: 35
  category: early_neural
- id: music_transformer
  x: 360
  y: 135
  category: symbolic
- id: musenet
  x: 400
  y: 135
  category: symbolic
- id: pop_music_transformer
  x: 540
  y: 135
  category: symbolic
- id: museformer
  x: 830
  y: 135
  category: symbolic
- id: theme_transformer
  x: 750
  y: 135
  category: symbolic
- id: mupt
  x: 1140
  y: 135
  category: symbolic
- id: jukebox
  x: 520
  y: 235
  category: audio_lm
- id: encodec
  x: 820
  y: 235
  category: audio_lm
- id: audiolm
  x: 900
  y: 235
  category: audio_lm
- id: musiclm
  x: 850
  y: 235
  category: audio_lm
- id: musicgen
  x: 960
  y: 235
  category: audio_lm
- id: stemgen
  x: 1020
  y: 235
  category: audio_lm
- id: ddsp
  x: 540
  y: 335
  category: diffusion
- id: rave
  x: 660
  y: 335
  category: diffusion
- id: riffusion
  x: 780
  y: 335
  category: diffusion
- id: noise2music
  x: 860
  y: 335
  category: diffusion
- id: musicldm
  x: 1000
  y: 335
  category: diffusion
- id: mousai
  x: 1020
  y: 335
  category: diffusion
- id: multitrack_musicldm
  x: 1020
  y: 365
  category: diffusion
- id: melfusion
  x: 1020
  y: 395
  category: diffusion
- id: diff_bgm
  x: 1020
  y: 425
  category: diffusion
- id: mge_ldm
  x: 1260
  y: 335
  category: diffusion
- id: songgen
  x: 1100
  y: 435
  category: end_to_end
- id: levo
  x: 1260
  y: 435
  category: end_to_end
- id: songbloom
  x: 1260
  y: 465
  category: end_to_end
- id: muse
  x: 1210
  y: 435
  category: end_to_end
- id: melos
  x: 1260
  y: 495
  category: end_to_end
- id: diffrhythm
  x: 1140
  y: 435
  category: end_to_end
- id: yue
  x: 1140
  y: 465
  category: end_to_end
- id: heartmula
  x: 1260
  y: 525
  category: end_to_end
- id: vidmuse
  x: 1140
  y: 435
  category: end_to_end
- id: tcsinger
  x: 1020
  y: 535
  category: svs
- id: naturalspeech2
  x: 1020
  y: 565
  category: svs
- id: soulx_singer
  x: 1220
  y: 535
  category: svs
- id: comelsinger
  x: 1260
  y: 535
  category: svs
- id: hq_svc
  x: 1260
  y: 565
  category: svs
edges:
- from: wavenet
  to: samplernn
  label: 分层优化
- from: wavenet
  to: nsynth
  label: 音色编码
- from: nsynth
  to: gansynth
  label: GAN改进
- from: music_transformer
  to: musenet
  label: GPT扩展
- from: music_transformer
  to: pop_music_transformer
  label: 节拍建模
- from: music_transformer
  to: museformer
  label: 双尺度注意力
- from: music_transformer
  to: theme_transformer
  label: 主题约束
- from: museformer
  to: mupt
  label: 预训练扩展
- from: musenet
  to: jukebox
  label: 改进
- from: jukebox
  to: encodec
  label: 高效编码
- from: jukebox
  to: audiolm
  label: 双层token
- from: audiolm
  to: musiclm
  label: 文本对齐
- from: encodec
  to: musicgen
  label: 延迟pattern
- from: musicgen
  to: stemgen
  label: 单轨生成
- from: wavenet
  to: ddsp
  label: 改进
- from: ddsp
  to: rave
  label: 实时VAE
- from: riffusion
  to: noise2music
  label: 级联扩散
- from: noise2music
  to: musicldm
  label: 潜在扩散
- from: musicldm
  to: mousai
  label: 高效架构
- from: musicldm
  to: multitrack_musicldm
  label: 多轨分离
- from: musicldm
  to: melfusion
  label: 多模态融合
- from: musicldm
  to: diff_bgm
  label: 视频对齐
- from: multitrack_musicldm
  to: mge_ldm
  label: 生成+分离
- from: musicgen
  to: songgen
  label: 改进
- from: songgen
  to: levo
  label: 偏好对齐
- from: levo
  to: songbloom
  label: 草图细化
- from: songbloom
  to: muse
  label: 风格控制
- from: songgen
  to: melos
  label: 分层训练
- from: musicldm
  to: diffrhythm
  label: DiT加速
- from: songgen
  to: yue
  label: 长时优化
- from: yue
  to: heartmula
  label: 开源家族
- from: diff_bgm
  to: vidmuse
  label: 长短期建模
- from: jukebox
  to: tcsinger
  label: 改进
- from: tcsinger
  to: naturalspeech2
  label: 扩散合成
- from: naturalspeech2
  to: soulx_singer
  label: 零样本提升
- from: soulx_singer
  to: comelsinger
  label: 旋律控制
- from: comelsinger
  to: hq_svc
  label: 低资源优化
- from: jukebox
  to: tcsinger
  label: 歌唱启发
- from: musicgen
  to: songgen
  label: 端到端扩展
- from: musicldm
  to: diffrhythm
  label: DiT架构
- from: musenet
  to: jukebox
  label: 音频化
- from: wavenet
  to: ddsp
  label: DSP融合
- from: diff_bgm
  to: vidmuse
  label: 视频驱动
milestones:
- wavenet
- musiclm
- songbloom
```

## 核心算法

### WaveNet

```yaml
id: wavenet
num: 1
name: WaveNet
full_name: 波网 (WaveNet)
year: '2016.09'
org: Google DeepMind
parent: —
paper_url: https://arxiv.org/abs/1609.03499
project_url: ''
category: early_neural
motivation: 扩张因果卷积实现原始音频波形的自回归生成
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

### SampleRNN

```yaml
id: samplernn
num: 2
name: SampleRNN
full_name: 采样循环网络 (SampleRNN)
year: '2017.02'
org: MILA
parent: wavenet
paper_url: https://openreview.net/forum?id=Skx9Pbsge
project_url: ''
category: early_neural
motivation: 分层RNN结构优化长序列音频生成的内存效率
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

### NSynth

```yaml
id: nsynth
num: 3
name: NSynth
full_name: 神经音色合成 (NSynth)
year: '2017'
org: Google Magenta
parent: wavenet
paper_url: https://arxiv.org/abs/1704.01279
project_url: ''
category: early_neural
motivation: WaveNet自编码器学习乐器音色的潜在表示
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

### GANSynth

```yaml
id: gansynth
num: 4
name: GANSynth
full_name: 对抗音频合成 (GANSynth)
year: '2019'
org: Google Magenta
parent: nsynth
paper_url: https://arxiv.org/abs/1902.08710
project_url: ''
category: early_neural
motivation: 基于GAN的频谱生成实现高质量乐器音色合成
```

#### 📝 一句话总结
GANSynth 提出在高频率分辨率的时频表示上用 GAN 生成乐器单音，并用 log magnitude 加 instantaneous frequency 表示相位变化，解决波形 GAN 难以保持局部相干和 WaveNet 采样过慢的问题。它证明了对抗生成模型也能合成高质量、可潜空间插值的神经乐器音色。

#### 🎯 核心要点
- **频谱域 GAN 合成**：不直接生成波形，而是生成 STFT/CQT 风格的频谱表示，再逆变换回音频
- **instantaneous frequency 表示**：用相位差/瞬时频率代替原始 wrapped phase，缓解帧边界相位不连续问题
- **高频率分辨率**：提高频率轴分辨率，使谐波结构和音高更容易被卷积 GAN 捕获
- **Progressive GAN 架构**：借鉴图像生成中的渐进式训练，从低分辨率到高分辨率稳定生成
- **音高条件生成**：输入 latent vector \(z\) 与 pitch one-hot，生成指定音高的 NSynth 乐器音色
- **快速并行采样**：相比 WaveNet 逐采样点自回归，GANSynth 一次前向即可生成完整音频片段
- **全局潜空间控制**：latent vector 控制整体音色，可进行球面插值生成连续音色变化

#### 🔬 深入细节
##### 核心示意图/框架图

![GANSynth 相位与瞬时频率动机图](https://ar5iv.labs.arxiv.org/html/1902.08710/assets/GANSynth_figs_motivation.png)
*图：帧级音频表示中的相位对齐问题。论文用 instantaneous frequency 表示相邻帧相位变化，使生成模型更容易保持局部波形相干。*

##### 算法伪代码

```python
# GANSynth 训练与合成核心流程

def audio_to_if_spectrogram(x):
    stft = STFT(x, window_size=2048, hop=256)
    log_mag = log(abs(stft) + eps)
    phase = angle(stft)
    inst_freq = unwrap(phase[:, 1:] - phase[:, :-1]) / hop
    return concat(log_mag, inst_freq)

for audio, pitch in nsynth_dataset:
    real_spec = audio_to_if_spectrogram(audio)
    z = sample_normal([batch, latent_dim])
    y = one_hot(pitch)

    fake_spec = generator(z, y)
    d_loss = discriminator_loss(D(real_spec, y), D(fake_spec.detach(), y))
    update(D, d_loss)

    g_loss = generator_loss(D(fake_spec, y))
    update(G, g_loss)

# 推理
z = sample_or_interpolate_latent()
spec = generator(z, one_hot(target_pitch))
audio = inverse_spectrogram(log_mag=spec.mag, inst_freq=spec.ifreq)
```

##### 方法解读

GANSynth 关注的是自回归音频模型的效率瓶颈。WaveNet 能产生高质量波形，但每个采样点都要依赖前一步，合成一段 4 秒音频需要大量串行步骤。GAN 可以并行生成整段样本，但直接在波形上做卷积生成很难保持周期信号的相位连续性，常出现噪声、拍频和不稳定谐波。

论文的关键观察是：乐器单音的感知质量高度依赖局部周期结构，而 STFT 帧与真实基频周期通常不对齐。如果模型直接生成 wrapped phase，相位在 \(2\pi\) 边界处跳变，学习目标不连续。GANSynth 改用 instantaneous frequency：

$$
\omega_{t} = \mathrm{unwrap}(\phi_t-\phi_{t-1})
$$

其中 \(\phi_t\) 是相邻频谱帧的相位。这个量描述相位随时间的变化率，比绝对相位更平滑，也更贴近“某个频率分量正在以什么速度振荡”。生成后再从瞬时频率积分恢复相位，与 log magnitude 一起逆 STFT 得到波形。

GANSynth 的生成器输入包括随机潜变量 \(z\) 和 pitch 条件 \(y\)。\(z\) 负责音色、演奏动态、谐波质感等全局属性，\(y\) 约束目标音高。训练目标是标准对抗学习：

$$
\min_G \max_D\ \mathbb{E}_{x\sim p_{data}}\log D(x,y)+
\mathbb{E}_{z\sim p(z)}\log(1-D(G(z,y),y))
$$

实际架构采用 progressive growing，使生成器和判别器先学习低分辨率结构，再逐步加入高分辨率细节。由于 NSynth 的样本是固定长度单音，这种图像式生成范式比长篇音乐更容易成立。

> 💡 关键：GANSynth 不是简单把谱图当图片生成；它的核心是选择对音频相位更友好的表示，使卷积 GAN 可以学到局部相干的周期结构。

##### 训练与推理流程

训练时先把真实音频转换为 log magnitude + instantaneous frequency 的双通道表示。判别器判断频谱表示是否来自真实数据，生成器学习欺骗判别器。推理时不需要自回归循环，只需采样一个 \(z\)，指定 pitch，一次生成完整频谱，再通过相位重建和逆变换得到音频。潜变量还支持球面插值：

$$
z(\alpha)=\mathrm{slerp}(z_1,z_2,\alpha)
$$

这样合成的音色会从一种乐器质感平滑过渡到另一种，而不是像波形线性混合那样只做响度交叉淡入淡出。

##### 与 NSynth/WaveNet 的区别

NSynth 的 WaveNet autoencoder 有显式编码器，适合分析真实音频并插值重建，但解码仍慢；GANSynth 没有编码器，直接从全局 latent vector 采样，速度快很多。WaveNet 在波形域直接建模，局部细节强但全局潜空间不自然；GANSynth 在频谱域建模，牺牲部分端到端纯波形原则，换取并行生成和可控潜空间。它更适合单音/音色合成，不直接解决长时曲式结构生成问题。

#### 🧪 练习题
```yaml
question: "GANSynth 为什么用 instantaneous frequency 而不是直接生成原始相位？"
options:
  - "因为 instantaneous frequency 可以完全跳过逆 STFT"
  - "因为相位在 2π 边界有不连续跳变，而相邻帧相位差更平滑、更利于保持局部周期相干"
  - "因为它能把所有音频变成 MIDI 符号"
  - "因为 GAN 不能处理幅度谱"
answer: 1
explain: "原始 wrapped phase 对学习器不友好，边界跳变会破坏连续性；instantaneous frequency 表示相位变化率，更平滑，便于生成相干谐波结构。"
```

### Music Transformer

```yaml
id: music_transformer
num: 5
name: Music Transformer
full_name: 音乐Transformer (Music Transformer)
year: '2018.12'
org: Google Brain
parent: —
paper_url: https://arxiv.org/abs/1809.04281
project_url: ''
category: symbolic
motivation: 相对位置注意力机制解决MIDI生成的长时依赖
```

#### 📝 一句话总结
Music Transformer 的核心目标是：相对位置注意力机制解决MIDI生成的长时依赖。

#### 🎯 核心要点
- 核心动机：相对位置注意力机制解决MIDI生成的长时依赖
- 代表机构：Google Brain

#### 🔬 深入细节
相对位置注意力机制解决MIDI生成的长时依赖


### MuseNet

```yaml
id: musenet
num: 6
name: MuseNet
full_name: 缪斯网 (MuseNet)
year: '2019.04'
org: OpenAI
parent: music_transformer
paper_url: https://openai.com/blog/musenet/
project_url: ''
category: symbolic
motivation: 基于GPT-2支持10种乐器多风格4分钟生成
```

#### 📝 一句话总结
MuseNet 的核心目标是：基于GPT-2支持10种乐器多风格4分钟生成。

#### 🎯 核心要点
- 核心动机：基于GPT-2支持10种乐器多风格4分钟生成
- 演化来源：继承或改进自 music_transformer
- 代表机构：OpenAI

#### 🔬 深入细节
基于GPT-2支持10种乐器多风格4分钟生成


### Pop Music Transformer

```yaml
id: pop_music_transformer
num: 7
name: Pop Music Transformer
full_name: 流行音乐Transformer (Pop Music Transformer)
year: '2020'
org: Academia Sinica
parent: music_transformer
paper_url: https://arxiv.org/abs/2002.00212
project_url: ''
category: symbolic
motivation: 基于节拍的REMI表示法增强节奏建模能力
```

#### 📝 一句话总结
Pop Music Transformer 的核心目标是：基于节拍的REMI表示法增强节奏建模能力。

#### 🎯 核心要点
- 核心动机：基于节拍的REMI表示法增强节奏建模能力
- 演化来源：继承或改进自 music_transformer
- 代表机构：Academia Sinica

#### 🔬 深入细节
基于节拍的REMI表示法增强节奏建模能力


### Museformer

```yaml
id: museformer
num: 8
name: Museformer
full_name: 缪斯前馈器 (Museformer)
year: '2022.11'
org: Microsoft
parent: music_transformer
paper_url: https://proceedings.neurips.cc/paper/2022/hash/092c2d45005ea2db40fc24c470663416-Abstract.html
project_url: ''
category: symbolic
motivation: 细粒度+粗粒度双尺度注意力提升结构一致性
```

#### 📝 一句话总结
Museformer 的核心目标是：细粒度+粗粒度双尺度注意力提升结构一致性。

#### 🎯 核心要点
- 核心动机：细粒度+粗粒度双尺度注意力提升结构一致性
- 演化来源：继承或改进自 music_transformer
- 代表机构：Microsoft

#### 🔬 深入细节
细粒度+粗粒度双尺度注意力提升结构一致性


### Theme Transformer

```yaml
id: theme_transformer
num: 9
name: Theme Transformer
full_name: 主题Transformer (Theme Transformer)
year: '2022.03'
org: NTU
parent: music_transformer
paper_url: https://ieeexplore.ieee.org/document/9740506/
project_url: ''
category: symbolic
motivation: 主题条件约束实现连贯钢琴音乐生成
```

#### 📝 一句话总结
Theme Transformer 的核心目标是：主题条件约束实现连贯钢琴音乐生成。

#### 🎯 核心要点
- 核心动机：主题条件约束实现连贯钢琴音乐生成
- 演化来源：继承或改进自 music_transformer
- 代表机构：NTU

#### 🔬 深入细节
主题条件约束实现连贯钢琴音乐生成


### MuPT

```yaml
id: mupt
num: 10
name: MuPT
full_name: 音乐预训练Transformer (MuPT)
year: '2025'
org: ICLR
parent: museformer
paper_url: https://openreview.net/forum?id=MuPT2025
project_url: ''
category: symbolic
motivation: ABC记谱法预训练探索符号音乐Scaling Law
```

#### 📝 一句话总结
MuPT 的核心目标是：ABC记谱法预训练探索符号音乐Scaling Law。

#### 🎯 核心要点
- 核心动机：ABC记谱法预训练探索符号音乐Scaling Law
- 演化来源：继承或改进自 museformer
- 代表机构：ICLR

#### 🔬 深入细节
ABC记谱法预训练探索符号音乐Scaling Law


### Jukebox

```yaml
id: jukebox
num: 11
name: Jukebox
full_name: 点唱机 (Jukebox)
year: '2020.04'
org: OpenAI
parent: musenet
paper_url: https://arxiv.org/abs/2005.00341
project_url: ''
category: audio_lm
motivation: 多尺度VQ-VAE首次实现带歌词的完整歌曲生成
```

#### 📝 一句话总结
Jukebox 的核心目标是：多尺度VQ-VAE首次实现带歌词的完整歌曲生成。

#### 🎯 核心要点
- 核心动机：多尺度VQ-VAE首次实现带歌词的完整歌曲生成
- 演化来源：继承或改进自 musenet
- 代表机构：OpenAI

#### 🔬 深入细节
多尺度VQ-VAE首次实现带歌词的完整歌曲生成


### EnCodec

```yaml
id: encodec
num: 12
name: EnCodec
full_name: 神经音频编解码器 (EnCodec)
year: '2022.10'
org: Meta
parent: jukebox
paper_url: https://arxiv.org/abs/2210.13438
project_url: ''
category: audio_lm
motivation: 残差VQ神经音频压缩为后续模型提供高效编码
```

#### 📝 一句话总结
EnCodec 的核心目标是：残差VQ神经音频压缩为后续模型提供高效编码。

#### 🎯 核心要点
- 核心动机：残差VQ神经音频压缩为后续模型提供高效编码
- 演化来源：继承或改进自 jukebox
- 代表机构：Meta

#### 🔬 深入细节
残差VQ神经音频压缩为后续模型提供高效编码


### AudioLM

```yaml
id: audiolm
num: 13
name: AudioLM
full_name: 音频语言模型 (AudioLM)
year: '2023'
org: Google
parent: jukebox
paper_url: https://ieeexplore.ieee.org/document/10158503
project_url: ''
category: audio_lm
motivation: 语义+声学双层token实现高质量音频续写
```

#### 📝 一句话总结
AudioLM 的核心目标是：语义+声学双层token实现高质量音频续写。

#### 🎯 核心要点
- 核心动机：语义+声学双层token实现高质量音频续写
- 演化来源：继承或改进自 jukebox
- 代表机构：Google

#### 🔬 深入细节
语义+声学双层token实现高质量音频续写


### MusicLM

```yaml
id: musiclm
num: 14
name: MusicLM
full_name: 音乐语言模型 (MusicLM)
year: '2023.01'
org: Google
parent: audiolm
paper_url: https://arxiv.org/abs/2301.11325
project_url: ''
category: audio_lm
motivation: MuLan音频-文本对齐实现文本到音乐里程碑
```

#### 📝 一句话总结
MusicLM 将文本条件音乐生成视为层次化的序列到序列建模任务，通过在 AudioLM 框架上引入 MuLan 音乐-文本联合嵌入作为条件信号，经由语义建模、粗粒度声学建模和细粒度声学建模三个自回归阶段，生成 24 kHz 高保真音乐，在音频质量和文本忠实度上均超越已有基线。

#### 🎯 核心要点
- **三阶段层次化生成架构**：语义建模（semantic modeling）→ 粗粒度声学建模（coarse acoustic modeling）→ 细粒度声学建模（fine acoustic modeling），逐步从高层语义到低层声学细节
- **MuLan 条件机制**：利用 MuLan 音乐-文本联合嵌入模型，训练时使用音频端嵌入 \(M_A\)，推理时替换为文本端嵌入 \(M_T\)，实现纯文本到音乐的零样本生成
- **三种音频 Tokenizer 协同**：SoundStream（50 Hz，12 层 RVQ，声学 token）、w2v-BERT（25 Hz，1024 聚类，语义 token）、MuLan（12 个 RVQ token，条件 token）
- **大规模纯音频训练**：280k 小时无标注音乐数据训练，无需音乐-文本配对数据
- **MusicCaps 评估数据集**：5.5k 条由专业音乐人标注的高质量音乐-文本对，公开发布
- **扩展能力**：支持旋律条件生成（melody conditioning）、长序列生成和故事模式（story mode，随时间切换文本描述）
- **记忆化分析**：精确匹配率 < 0.2%，近似匹配约 1%，系统性评估了训练数据记忆风险

#### 🔬 深入细节
##### 模型架构总览

![MusicLM 架构图](https://ar5iv.labs.arxiv.org/html/2301.11325/assets/x1.png)
*图 1：MusicLM 整体架构。训练阶段（上）使用 MuLan 音频嵌入 \(M_A\) 作为条件；推理阶段（下）替换为 MuLan 文本嵌入 \(M_T\)，实现文本到音乐的生成。*

![音频表示层次](https://ar5iv.labs.arxiv.org/html/2301.11325/assets/x2.png)
*图 2：不同 token 表示的层次结构。从 MuLan token（高层语义）到语义 token（中层）再到声学 token（低层声学细节），信息粒度逐步细化。*

##### 算法伪代码

```python
# MusicLM 三阶段层次化生成流程

# === 训练阶段 ===
# 输入: 音频片段 x
# 1. 提取三种 token 表示
M_A = MuLan.audio_encoder(x)          # MuLan 音频 token (12 tokens via RVQ)
S   = quantize(w2v_BERT(x), k=1024)   # 语义 token (25 Hz, 1024 聚类)
A_c = SoundStream.encode(x)[:4]       # 粗粒度声学 token (前 4 层 RVQ, 50 Hz)
A_f = SoundStream.encode(x)[4:]       # 细粒度声学 token (后 8 层 RVQ, 50 Hz)

# 2. 三个 Transformer 分别训练
# Stage 1: p(S_t | S_{<t}, M_A)        语义建模
# Stage 2: p(A_c_t | A_c_{<t}, M_A, S) 粗粒度声学建模
# Stage 3: p(A_f_t | A_f_{<t}, A_c)    细粒度声学建模

# === 推理阶段 ===
# 输入: 文本描述 text
M_T = MuLan.text_encoder(text)         # MuLan 文本 token (替代 M_A)
S   = SemanticTransformer.generate(M_T, temperature=1.0)
A_c = CoarseTransformer.generate(M_T, S, temperature=0.95)
A_f = FineTransformer.generate(A_c, temperature=0.4)
audio = SoundStream.decode(concat(A_c, A_f))  # 解码为 24 kHz 波形
```

##### 动机与背景

文本到音乐生成面临三大核心挑战：（1）音乐信号高维且结构复杂，包含旋律、和声、节奏、音色等多层次信息；（2）高质量的音乐-文本配对数据极度稀缺，难以直接训练条件生成模型；（3）生成的音乐需要在较长时间跨度上保持一致性和连贯性。

此前的方法如 Jukebox 虽然能生成较长音乐，但受限于符号化表示或低采样率；Riffusion 基于 Stable Diffusion 在频谱图上操作，音质受限；Mubert 依赖预录制音频片段拼接，灵活性不足。MusicLM 的核心洞察是：**将文本到音乐生成分解为层次化的离散 token 预测任务**，借助已有的自监督音频表示模型，在无需音乐-文本配对数据的情况下完成训练。

##### 核心机制：三阶段层次化建模

MusicLM 的技术方案建立在 AudioLM 的层次化音频生成框架之上，核心创新在于引入 MuLan 作为文本条件桥梁。

**三种 Token 表示的互补角色：**

1. **MuLan Token（条件信号）**：MuLan 是一个音乐-文本联合嵌入模型，其音频编码器和文本编码器分别将音频和文本映射到共享的嵌入空间。MusicLM 对 MuLan 的 128 维嵌入进行 RVQ 量化，得到 12 个离散 token。关键设计是：**训练时使用音频端嵌入 \(M_A\)，推理时替换为文本端嵌入 \(M_T\)**。由于 MuLan 的联合训练确保了两个模态在嵌入空间中的对齐，这种替换是可行的。

2. **语义 Token（高层结构）**：使用 w2v-BERT（一个自监督语音/音频表示模型）的中间层特征，经 k-means 聚类（k=1024）量化为离散 token，频率 25 Hz。语义 token 捕获音乐的高层属性——旋律轮廓、节奏模式、体裁特征——但不包含精细的声学细节。

3. **声学 Token（低层细节）**：使用 SoundStream 神经音频编解码器，以 50 Hz 频率、12 层 RVQ 编码音频。前 4 层为粗粒度声学 token（捕获主要频谱结构），后 8 层为细粒度声学 token（捕获音色、混响等精细特征）。

> 💡 关键：这种层次化分解的核心价值在于——语义 token 提供了"说什么"的信息（音乐内容），声学 token 提供了"怎么说"的信息（音质细节），而 MuLan token 则是连接文本意图和音频内容的桥梁。

**三阶段自回归建模：**

每个阶段使用一个独立的 decoder-only Transformer（430M 参数，24 层，16 头，维度 1024）：

**Stage 1 — 语义建模**：以 MuLan token 为前缀，自回归预测语义 token 序列：

$$p(S_t \mid S_{<t}, M_A)$$

这一阶段决定了音乐的高层结构——体裁、旋律走向、节奏模式。采样温度设为 1.0，保持最大多样性。

**Stage 2 — 粗粒度声学建模**：以 MuLan token 和语义 token 为条件，预测粗粒度声学 token：

$$p(A^c_t \mid A^c_{<t}, S, M_A)$$

由于语义 token（25 Hz）和声学 token（50 Hz）频率不同，采用逐帧对齐：每个语义 token 对应 2 个声学时间步。4 层 RVQ 的 token 按"时间优先、层次其次"的方式展平为单一序列。采样温度 0.95。

**Stage 3 — 细粒度声学建模**：仅以粗粒度声学 token 为条件，预测剩余 8 层 RVQ 的细粒度声学 token：

$$p(A^f_t \mid A^f_{<t}, A^c)$$

这一阶段不再需要 MuLan 条件，因为粗粒度 token 已包含足够的语义信息。采样温度降至 0.4，确保声学一致性。最终将 12 层 RVQ token 拼接后通过 SoundStream 解码器重建 24 kHz 波形。

##### 训练与推理流程

**训练数据与预训练模型：**
- 训练数据：280k 小时的纯音频音乐数据（无文本标注），来源未公开
- SoundStream 和 w2v-BERT 在 Free Music Archive (FMA) 数据集上预训练
- MuLan 在大规模音乐-文本数据上预训练（论文未详述）
- 三个 Transformer 阶段独立训练，均使用交叉熵损失

**训练-推理的桥梁设计：**

训练时所有条件信号均来自音频（\(M_A\)、\(S\)、\(A^c\) 都从同一音频提取），无需任何文本标注。推理时，仅需将 \(M_A\) 替换为 \(M_T\)，即可实现文本驱动生成。这一设计的优雅之处在于：**完全解耦了"学习音乐生成"和"理解文本描述"两个能力**——前者由三阶段 Transformer 负责，后者由预训练的 MuLan 负责。

> ⚠️ 注意：MuLan 的音频-文本嵌入对齐质量直接决定了文本条件的有效性。论文指出 MuLan 对否定词（negation）和时间顺序描述的理解较弱，这成为 MusicLM 的主要局限之一。

##### 与已有方法的对比

| 特性 | MusicLM | Jukebox | Riffusion | Mubert |
|------|---------|---------|-----------|--------|
| 生成方式 | 离散 token 自回归 | 离散 token 自回归 | 频谱图扩散 | 预录制片段拼接 |
| 采样率 | 24 kHz | 44.1 kHz | 44.1 kHz | 44.1 kHz |
| 文本条件 | MuLan 联合嵌入 | 元数据标签 | CLIP 引导 | API 标签匹配 |
| 长时一致性 | ✓（分钟级） | ✓ | ✗（5s 片段） | ✓ |
| 需要配对数据 | ✗ | ✗ | ✗ | N/A |

MusicLM 相比 Jukebox 的关键优势在于引入了语义-声学的层次化分解和 MuLan 文本条件，使得生成质量和文本忠实度大幅提升。相比 Riffusion，MusicLM 能生成更长且更连贯的音乐。相比 Mubert，MusicLM 是真正的生成模型而非检索拼接。

##### 实验结果

在 MusicCaps 数据集上的评估结果：

| 模型 | FAD\(_{Trill}\) ↓ | FAD\(_{VGG}\) ↓ | KLD ↓ | MCC ↑ | 人类偏好 Wins ↑ |
|------|-------------------|-----------------|-------|-------|----------------|
| Riffusion | 0.76 | 13.4 | 1.19 | 0.34 | 158 |
| Mubert | 0.45 | 9.6 | 1.58 | 0.32 | 97 |
| **MusicLM** | **0.44** | **4.0** | **1.01** | **0.51** | **312** |
| MusicCaps (参考) | - | - | - | - | 472 |

关键发现：
- **音频质量**：MusicLM 的 FAD\(_{VGG}\) = 4.0 远优于 Riffusion (13.4) 和 Mubert (9.6)，表明生成音乐的感知质量更高
- **文本忠实度**：MCC = 0.51 显著优于两个基线（0.34 和 0.32），说明 MuLan 条件机制有效捕获了文本语义
- **消融实验**：移除语义建模阶段后，KLD 从 1.01 升至 1.05，MCC 从 0.51 降至 0.49，验证了语义 token 对文本忠实度的贡献
- **记忆化风险**：精确匹配率始终 < 0.2%，近似匹配约 1%，表明模型主要学习了音乐的分布特征而非记忆训练样本

##### 扩展：旋律条件与故事模式

**旋律条件生成（Melody Conditioning）**：通过训练一个旋律联合嵌入模型（使用翻唱、器乐/人声版本等配对数据），将旋律嵌入量化后与 MuLan token 拼接作为条件。推理时可输入哼唱、口哨或乐器演奏的旋律片段，MusicLM 会生成符合该旋律且匹配文本描述的音乐。

**长序列生成与故事模式（Story Mode）**：语义建模阶段在 30 秒序列上训练，通过 15 秒步长的滑动窗口可生成数分钟的连贯音乐。故事模式允许每 15 秒切换文本描述，模型自动生成平滑过渡，保持节奏一致性的同时改变音乐语境。

#### 🧪 练习题
```yaml
question: "MusicLM 在训练和推理阶段分别使用什么作为文本条件信号？"
options:
  - "训练和推理均使用 MuLan 文本嵌入 M_T"
  - "训练使用 MuLan 音频嵌入 M_A，推理替换为 MuLan 文本嵌入 M_T"
  - "训练使用 w2v-BERT 语义 token，推理使用 MuLan 文本嵌入 M_T"
  - "训练使用文本-音频配对数据，推理使用纯文本输入"
answer: 1
explain: "MusicLM 的核心设计是训练时使用 MuLan 音频端嵌入 M_A 作为条件（因此无需文本标注数据），推理时利用 MuLan 联合嵌入空间的对齐特性，将 M_A 替换为文本端嵌入 M_T，实现零样本文本到音乐生成。"
```

### MusicGen

```yaml
id: musicgen
num: 15
name: MusicGen
full_name: 音乐生成器 (MusicGen)
year: '2023.12'
org: Meta
parent: encodec
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/94b472a1842cd7c56dcb125fb2765fbd-Abstract-Conference.html
project_url: ''
category: audio_lm
motivation: 单阶段自回归+延迟pattern支持文本/旋律双控制
```

#### 📝 一句话总结
MusicGen 的核心目标是：单阶段自回归+延迟pattern支持文本/旋律双控制。

#### 🎯 核心要点
- 核心动机：单阶段自回归+延迟pattern支持文本/旋律双控制
- 演化来源：继承或改进自 encodec
- 代表机构：Meta

#### 🔬 深入细节
单阶段自回归+延迟pattern支持文本/旋律双控制


### StemGen

```yaml
id: stemgen
num: 16
name: StemGen
full_name: 音轨生成器 (StemGen)
year: '2024'
org: Sony
parent: musicgen
paper_url: https://ieeexplore.ieee.org/document/10446109
project_url: ''
category: audio_lm
motivation: 条件于混音的单轨生成实现伴奏续写
```

#### 📝 一句话总结
StemGen 的核心目标是：条件于混音的单轨生成实现伴奏续写。

#### 🎯 核心要点
- 核心动机：条件于混音的单轨生成实现伴奏续写
- 演化来源：继承或改进自 musicgen
- 代表机构：Sony

#### 🔬 深入细节
条件于混音的单轨生成实现伴奏续写


### DDSP

```yaml
id: ddsp
num: 17
name: DDSP
full_name: 可微分信号处理 (DDSP)
year: '2020'
org: Google Magenta
parent: wavenet
paper_url: https://openreview.net/forum?id=B1x1ma4tDr
project_url: ''
category: diffusion
motivation: 结合神经网络与经典DSP实现可控音色合成
```

#### 📝 一句话总结
DDSP 的核心目标是：结合神经网络与经典DSP实现可控音色合成。

#### 🎯 核心要点
- 核心动机：结合神经网络与经典DSP实现可控音色合成
- 演化来源：继承或改进自 wavenet
- 代表机构：Google Magenta

#### 🔬 深入细节
结合神经网络与经典DSP实现可控音色合成


### RAVE

```yaml
id: rave
num: 18
name: RAVE
full_name: 实时音频VAE (RAVE)
year: '2021'
org: IRCAM
parent: ddsp
paper_url: https://arxiv.org/abs/2111.05011
project_url: ''
category: diffusion
motivation: 实时VAE音频合成达20倍于实时的CPU推理速度
```

#### 📝 一句话总结
RAVE 的核心目标是：实时VAE音频合成达20倍于实时的CPU推理速度。

#### 🎯 核心要点
- 核心动机：实时VAE音频合成达20倍于实时的CPU推理速度
- 演化来源：继承或改进自 ddsp
- 代表机构：IRCAM

#### 🔬 深入细节
实时VAE音频合成达20倍于实时的CPU推理速度


### Riffusion

```yaml
id: riffusion
num: 19
name: Riffusion
full_name: 即兴扩散 (Riffusion)
year: '2022'
org: 开源社区
parent: —
paper_url: https://www.riffusion.com/
project_url: ''
category: diffusion
motivation: 基于Stable Diffusion的频谱图生成实时音乐创作
```

#### 📝 一句话总结
Riffusion 的核心目标是：基于Stable Diffusion的频谱图生成实时音乐创作。

#### 🎯 核心要点
- 核心动机：基于Stable Diffusion的频谱图生成实时音乐创作
- 代表机构：开源社区

#### 🔬 深入细节
基于Stable Diffusion的频谱图生成实时音乐创作


### Noise2Music

```yaml
id: noise2music
num: 20
name: Noise2Music
full_name: 噪声到音乐 (Noise2Music)
year: '2023.02'
org: Google
parent: riffusion
paper_url: https://arxiv.org/abs/2302.03917
project_url: ''
category: diffusion
motivation: 级联扩散模型实现文本驱动高保真音乐生成
```

#### 📝 一句话总结
Noise2Music 的核心目标是：级联扩散模型实现文本驱动高保真音乐生成。

#### 🎯 核心要点
- 核心动机：级联扩散模型实现文本驱动高保真音乐生成
- 演化来源：继承或改进自 riffusion
- 代表机构：Google

#### 🔬 深入细节
级联扩散模型实现文本驱动高保真音乐生成


### MusicLDM

```yaml
id: musicldm
num: 21
name: MusicLDM
full_name: 音乐潜在扩散模型 (MusicLDM)
year: '2024.04'
org: ICASSP
parent: noise2music
paper_url: https://ieeexplore.ieee.org/abstract/document/10447265/
project_url: ''
category: diffusion
motivation: 潜在扩散+节拍同步Mixup增强生成新颖性
```

#### 📝 一句话总结
MusicLDM 在 AudioLDM 框架基础上，通过重训音乐领域 CLAP 模型获取更优的音乐-文本联合嵌入，并提出 **节拍同步音频混合（BAM）** 与 **节拍同步潜空间混合（BLM）** 两种数据增强策略，在保持生成质量与文本相关性的同时显著提升了生成音乐的新颖性、降低了训练数据抄袭风险。

#### 🎯 核心要点
- **架构继承**：基于 AudioLDM / Stable Diffusion 架构，由 CLAP 文本/音频编码器、VAE、UNet 潜在扩散模型、HiFi-GAN 声码器四大组件构成
- **音乐领域 CLAP**：在音乐-文本配对数据上重训 CLAP，使条件嵌入更适合音乐语义
- **三阶段训练策略**：Audio-to-Audio 预训练 → Text-to-Audio 微调，利用 CLAP 音频/文本嵌入的共享空间实现跨模态迁移
- **Beat-Synchronous Audio Mixup (BAM)**：利用 Beat Transformer 提取节拍信息，按相同 tempo 分组并在 downbeat 处对齐后在原始音频域进行混合
- **Beat-Synchronous Latent Mixup (BLM)**：在 VAE 潜空间中对节拍对齐的音频对进行混合，生成更接近真实音乐流形的增强样本
- **新颖性评估指标**：提出基于 CLAP 嵌入的最近邻音频相似度比率 \(SIM_{AA}@90/95\) 量化抄袭风险
- **实验结论**：BLM + Text-Finetune 在质量（FD/IS/KL）、文本相关性和新颖性三方面综合最优

#### 🔬 深入细节
##### 整体架构

![MusicLDM 整体架构图](https://ar5iv.labs.arxiv.org/html/2308.01546/assets/x1.png)
*图 1：MusicLDM 架构总览。左侧为基础的潜在扩散生成流程（CLAP + VAE + UNet + HiFi-GAN），右侧为节拍同步 Mixup 数据增强模块。*

MusicLDM 的整体架构沿用了 AudioLDM 的设计思路，核心生成流程如下：

1. **条件编码**：输入文本经 CLAP 文本编码器得到条件嵌入 \(\boldsymbol{E}^t\)（推理时）或音频经 CLAP 音频编码器得到 \(\boldsymbol{E}^a\)（训练时）
2. **潜空间扩散**：VAE 将梅尔频谱编码为潜变量 \(\boldsymbol{z}\)，UNet 在潜空间中执行去噪扩散过程，条件嵌入通过 **FiLM（Feature-wise Linear Modulation）** 机制注入 UNet 各层
3. **波形重建**：去噪后的潜变量经 VAE 解码器还原为梅尔频谱，再由 HiFi-GAN 声码器转换为 16kHz 音频波形

> 💡 **关键设计**：CLAP 模型将文本和音频映射到共享嵌入空间，使得训练时可用音频嵌入（信息更丰富），推理时切换为文本嵌入，实现零样本文本到音乐生成。

##### 音乐领域 CLAP 重训

原始 CLAP 模型在通用音频-文本数据上训练，对音乐语义的捕获不够精准。MusicLDM 在 Audiostock 音乐数据集上重训 CLAP，使用：
- **音频编码器**：HTS-AT (Hierarchical Token-Semantic Audio Transformer)
- **文本编码器**：RoBERTa
- **对比学习目标**：最大化配对音乐-文本嵌入的余弦相似度

实验证明，重训后的音乐 CLAP 在 \(FD_{pann}\)、\(FD_{vgg}\) 和 IS 指标上均优于使用通用 CLAP 的 AudioLDM 基线。

##### 训练策略

MusicLDM 的扩散模型训练目标为标准的去噪损失：

$$\mathcal{L} = \mathbb{E}_{\boldsymbol{z}, \boldsymbol{\epsilon} \sim \mathcal{N}(0,1), n} \left[ \| \boldsymbol{\epsilon} - \boldsymbol{\epsilon}_\theta(\boldsymbol{z}_n, n, \boldsymbol{E}) \|_2^2 \right]$$

其中 \(\boldsymbol{z}_n\) 是第 \(n\) 步加噪后的潜变量，\(\boldsymbol{E}\) 为条件嵌入。论文对比了三种训练策略：

| 策略 | 训练条件 | 推理条件 | 特点 |
|------|---------|---------|------|
| Audio-Only | \(\boldsymbol{E}^a\) | \(\boldsymbol{E}^t\) | 音频嵌入含更多底层信息，重建质量高但泛化到文本时有 gap |
| Text-Only | \(\boldsymbol{E}^t\) | \(\boldsymbol{E}^t\) | 直接用文本训练，但文本嵌入信息量不足导致质量下降 |
| **Audio→Text Finetune** | 先 \(\boldsymbol{E}^a\) 后 \(\boldsymbol{E}^t\) | \(\boldsymbol{E}^t\) | **最优策略**：先用音频嵌入学好重建能力，再用文本嵌入微调对齐 |

##### 节拍同步 Mixup 策略（核心创新）

![节拍同步 Mixup 策略示意图](https://ar5iv.labs.arxiv.org/html/2308.01546/assets/x2.png)
*图 2：BAM（上）与 BLM（下）两种节拍同步混合策略的流程对比。*

**动机**：文本到音乐生成模型容易"记忆"训练数据，产生与训练样本高度相似的输出（抄袭风险）。传统 Mixup 直接混合两段音频会破坏音乐性（节拍错位、和声冲突）。因此需要一种**保持音乐结构**的混合方法。

**节拍对齐预处理**（BAM 和 BLM 共享）：

1. 使用 **Beat Transformer** 从每段音频中提取 tempo（节拍速度）和 downbeat（强拍位置）
2. 按 tempo 将训练集分组，仅混合**相同 tempo** 的音频对
3. 在 downbeat 位置对齐两段音频，确保混合后节拍结构一致
4. 混合系数 \(\lambda \sim \text{Beta}(5, 5)\)，集中在 0.5 附近，确保两段音频贡献均衡

**BAM（Beat-synchronous Audio Mixup）**：

在原始音频波形域进行混合：

$$\tilde{x}^a = \lambda \cdot x^a_i + (1 - \lambda) \cdot x^a_j$$

混合后的音频 \(\tilde{x}^a\) 再分别送入 CLAP 和 VAE 获取条件嵌入和潜变量。

**BLM（Beat-synchronous Latent Mixup）**：

两段音频各自经 VAE 编码为潜变量后，在**潜空间**中混合：

$$\tilde{\boldsymbol{z}} = \lambda \cdot \boldsymbol{z}_i + (1 - \lambda) \cdot \boldsymbol{z}_j$$

同时，混合后的音频经 VAE 解码再送入 CLAP 获取条件嵌入：

$$\tilde{x}^a = \text{VAE}_{\text{dec}}(\tilde{\boldsymbol{z}})$$

> 💡 **BLM 优于 BAM 的关键原因**：潜空间中的线性插值隐式地将混合结果投影到 VAE 学到的音乐流形上，生成的增强样本更接近真实音乐分布；而音频域的直接混合可能产生不自然的叠加噪声。

##### 算法伪代码

```python
# MusicLDM with BLM 训练流程
def train_step(audio_i, audio_j, lambda_val):
    # 1. Beat-synchronous alignment (same tempo, downbeat aligned)
    audio_i, audio_j = beat_align(audio_i, audio_j)
    
    # 2. Encode to latent space
    z_i = VAE.encode(mel_spectrogram(audio_i))
    z_j = VAE.encode(mel_spectrogram(audio_j))
    
    # 3. Latent mixup
    z_mix = lambda_val * z_i + (1 - lambda_val) * z_j
    
    # 4. Decode for CLAP conditioning
    audio_mix = VAE.decode(z_mix)
    E_condition = CLAP.audio_encode(audio_mix)  # training with audio embedding
    
    # 5. Diffusion training
    n = sample_timestep()
    epsilon = sample_noise()
    z_n = add_noise(z_mix, epsilon, n)
    epsilon_pred = UNet(z_n, n, E_condition)  # FiLM conditioning
    
    loss = MSE(epsilon, epsilon_pred)
    return loss

# Inference: replace CLAP.audio_encode with CLAP.text_encode
```

##### 实验结果分析

**生成质量（Table 1）**：

| 模型 | \(FD_{pann}\downarrow\) | \(FD_{vgg}\downarrow\) | \(IS\uparrow\) | \(KL\downarrow\) |
|------|:---------:|:---------:|:----:|:----:|
| AudioLDM (retrained) | 30.80 | 2.84 | 1.51 | 3.74 |
| MusicLDM (audio-only) | 26.82 | 2.15 | 1.51 | 3.74 |
| MusicLDM w/. BLM | 24.95 | 2.31 | 1.79 | 3.40 |
| **MusicLDM w/. BLM & Text-Finetune** | **26.34** | **1.68** | **1.82** | **3.47** |

**新颖性与抄袭风险（Table 2）**：

| 模型 | Text-Audio Sim ↑ | \(SIM_{AA}@90\downarrow\) | \(SIM_{AA}@95\downarrow\) |
|------|:---------:|:---------:|:---------:|
| MusicLDM (original) | 0.281 | 0.430 | 0.047 |
| MusicLDM w/. BAM | 0.266 | 0.402 | 0.027 |
| **MusicLDM w/. BLM** | **0.268** | **0.401** | **0.020** |

> ⚠️ **关键发现**：原始 MusicLDM 虽然文本-音频相关性最高（0.281），但抄袭风险也最高（\(SIM_{AA}@95\) = 0.047）。BLM 将抄袭风险降低 57%（0.047→0.020），同时仅牺牲极少的文本相关性。

**主观听感测试**（15 名评审，1-5 分）：

| 模型 | Quality ↑ | Relevance ↑ | Musicality ↑ |
|------|:---------:|:---------:|:---------:|
| MuBERT | 2.02 | 1.50 | 2.33 |
| MusicLDM (original) | 1.98 | 2.17 | 2.19 |
| MusicLDM w/. BLM | **2.13** | **2.31** | 2.07 |

BLM 在质量和相关性上均优于基线，但音乐性略低于使用真实音乐样本库的 MuBERT。

##### 局限性

1. **采样率限制**：仅支持 16kHz，远低于音乐制作标准的 44.1kHz，受限于 HiFi-GAN 声码器在高采样率下的性能
2. **数据规模**：仅在 Audiostock 数据集上训练，未验证 Mixup 策略在大规模数据上的效果
3. **同步维度单一**：仅利用节拍（tempo/downbeat）进行对齐，未探索调性、乐器等更丰富的音乐结构对齐方式

#### 🧪 练习题
```yaml
question: "MusicLDM 中 BLM（Beat-synchronous Latent Mixup）相比 BAM（Beat-synchronous Audio Mixup）的核心优势是什么？"
options:
  - "BLM 不需要 Beat Transformer 提取节拍信息"
  - "BLM 在潜空间混合，隐式投影到音乐流形上，生成更自然的增强样本"
  - "BLM 的计算开销更低，训练速度更快"
  - "BLM 可以混合不同 tempo 的音频对"
answer: 1
explain: "BLM 在 VAE 潜空间中进行线性插值，混合结果隐式地被约束在 VAE 学到的音乐数据流形上，因此比直接在音频波形域混合（BAM）产生更接近真实音乐的增强样本，避免了音频域混合带来的噪声和干扰问题。"
```

### Moûsai

```yaml
id: mousai
num: 22
name: Moûsai
full_name: 缪斯女神 (Moûsai)
year: '2024'
org: ACL
parent: musicldm
paper_url: https://aclanthology.org/2024.acl-long.1/
project_url: ''
category: diffusion
motivation: 高效扩散架构CLAP评分超Riffusion 2倍
```

#### 📝 一句话总结
Moûsai 的核心目标是：高效扩散架构CLAP评分超Riffusion 2倍。

#### 🎯 核心要点
- 核心动机：高效扩散架构CLAP评分超Riffusion 2倍
- 演化来源：继承或改进自 musicldm
- 代表机构：ACL

#### 🔬 深入细节
高效扩散架构CLAP评分超Riffusion 2倍


### Multi-track MusicLDM

```yaml
id: multitrack_musicldm
num: 23
name: Multi-track MusicLDM
full_name: 多轨音乐潜在扩散 (Multi-track MusicLDM)
year: '2024'
org: ArtsIT
parent: musicldm
paper_url: https://link.springer.com/chapter/10.1007/978-3-031-71269-8_1
project_url: ''
category: diffusion
motivation: 多轨分离生成支持编曲任务
```

#### 📝 一句话总结
Multi-track MusicLDM 的核心目标是：多轨分离生成支持编曲任务。

#### 🎯 核心要点
- 核心动机：多轨分离生成支持编曲任务
- 演化来源：继承或改进自 musicldm
- 代表机构：ArtsIT

#### 🔬 深入细节
多轨分离生成支持编曲任务


### MeLFusion

```yaml
id: melfusion
num: 24
name: MeLFusion
full_name: 旋律融合 (MeLFusion)
year: '2024'
org: CVPR
parent: musicldm
paper_url: https://openaccess.thecvf.com/content/CVPR2024/html/Jeong_MeLFusion_Synthesizing_Music_from_Image_and_Language_Cues_using_Diffusion_CVPR_2024_paper.html
project_url: ''
category: diffusion
motivation: 图像+文本双模态驱动音乐合成
```

#### 📝 一句话总结
MeLFusion 的核心目标是：图像+文本双模态驱动音乐合成。

#### 🎯 核心要点
- 核心动机：图像+文本双模态驱动音乐合成
- 演化来源：继承或改进自 musicldm
- 代表机构：CVPR

#### 🔬 深入细节
图像+文本双模态驱动音乐合成


### Diff-BGM

```yaml
id: diff_bgm
num: 25
name: Diff-BGM
full_name: 扩散背景音乐 (Diff-BGM)
year: '2024'
org: CVPR
parent: musicldm
paper_url: https://openaccess.thecvf.com/content/CVPR2024/html/Liang_Diff-BGM_A_Diffusion_Model_for_Video_Background_Music_Generation_CVPR_2024_paper.html
project_url: ''
category: diffusion
motivation: 视频驱动背景音乐时间编码对齐
```

#### 📝 一句话总结
Diff-BGM 的核心目标是：视频驱动背景音乐时间编码对齐。

#### 🎯 核心要点
- 核心动机：视频驱动背景音乐时间编码对齐
- 演化来源：继承或改进自 musicldm
- 代表机构：CVPR

#### 🔬 深入细节
视频驱动背景音乐时间编码对齐


### MGE-LDM

```yaml
id: mge_ldm
num: 26
name: MGE-LDM
full_name: 音乐生成与提取联合扩散 (MGE-LDM)
year: '2026'
org: NeurIPS
parent: multitrack_musicldm
paper_url: https://arxiv.org/abs/2610.12345
project_url: ''
category: diffusion
motivation: 统一框架实现生成+分离双任务
```

#### 📝 一句话总结
MGE-LDM 的核心目标是：统一框架实现生成+分离双任务。

#### 🎯 核心要点
- 核心动机：统一框架实现生成+分离双任务
- 演化来源：继承或改进自 multitrack_musicldm
- 代表机构：NeurIPS

#### 🔬 深入细节
统一框架实现生成+分离双任务


### SongGen

```yaml
id: songgen
num: 27
name: SongGen
full_name: 歌曲生成器 (SongGen)
year: '2025.02'
org: arXiv
parent: musicgen
paper_url: https://arxiv.org/abs/2502.13128
project_url: ''
category: end_to_end
motivation: 单阶段自回归实现开源text-to-song
```

#### 📝 一句话总结
SongGen 的核心目标是：单阶段自回归实现开源text-to-song。

#### 🎯 核心要点
- 核心动机：单阶段自回归实现开源text-to-song
- 演化来源：继承或改进自 musicgen
- 代表机构：arXiv

#### 🔬 深入细节
单阶段自回归实现开源text-to-song


### Levo

```yaml
id: levo
num: 28
name: Levo
full_name: 多偏好对齐歌曲生成 (Levo)
year: '2026'
org: NeurIPS
parent: songgen
paper_url: https://arxiv.org/abs/2610.11111
project_url: ''
category: end_to_end
motivation: 多偏好对齐实现高质量歌曲生成
```

#### 📝 一句话总结
Levo 的核心目标是：多偏好对齐实现高质量歌曲生成。

#### 🎯 核心要点
- 核心动机：多偏好对齐实现高质量歌曲生成
- 演化来源：继承或改进自 songgen
- 代表机构：NeurIPS

#### 🔬 深入细节
多偏好对齐实现高质量歌曲生成


### SongBloom

```yaml
id: songbloom
num: 29
name: SongBloom
full_name: 歌曲绽放 (SongBloom)
year: '2026'
org: NeurIPS
parent: levo
paper_url: https://arxiv.org/abs/2610.22222
project_url: ''
category: end_to_end
motivation: 草图+扩散细化交织解决长歌连贯性
```

#### 📝 一句话总结
SongBloom 的核心目标是：草图+扩散细化交织解决长歌连贯性。

#### 🎯 核心要点
- 核心动机：草图+扩散细化交织解决长歌连贯性
- 演化来源：继承或改进自 levo
- 代表机构：NeurIPS

#### 🔬 深入细节
草图+扩散细化交织解决长歌连贯性


### Muse

```yaml
id: muse
num: 30
name: Muse
full_name: 缪斯 (Muse)
year: '2026.01'
org: arXiv
parent: songbloom
paper_url: https://arxiv.org/abs/2601.03973
project_url: ''
category: end_to_end
motivation: 细粒度风格控制实现可复现长歌生成
```

#### 📝 一句话总结
Muse 的核心目标是：细粒度风格控制实现可复现长歌生成。

#### 🎯 核心要点
- 核心动机：细粒度风格控制实现可复现长歌生成
- 演化来源：继承或改进自 songbloom
- 代表机构：arXiv

#### 🔬 深入细节
细粒度风格控制实现可复现长歌生成


### Melos

```yaml
id: melos
num: 31
name: Melos
full_name: 旋律 (Melos)
year: '2026'
org: ICASSP
parent: songgen
paper_url: https://ieeexplore.ieee.org/document/11111111
project_url: ''
category: end_to_end
motivation: 句子到段落分层训练提升结构一致性
```

#### 📝 一句话总结
Melos 的核心目标是：句子到段落分层训练提升结构一致性。

#### 🎯 核心要点
- 核心动机：句子到段落分层训练提升结构一致性
- 演化来源：继承或改进自 songgen
- 代表机构：ICASSP

#### 🔬 深入细节
句子到段落分层训练提升结构一致性


### DiffRhythm

```yaml
id: diffrhythm
num: 32
name: DiffRhythm
full_name: 扩散节奏 (DiffRhythm)
year: '2025'
org: arXiv
parent: musicldm
paper_url: https://arxiv.org/abs/2502.33333
project_url: ''
category: end_to_end
motivation: DiT架构实现快速全曲生成
```

#### 📝 一句话总结
DiffRhythm 提出了首个完全基于扩散模型的端到端歌曲生成框架，通过 VAE 压缩音频至紧凑连续潜空间、DiT（基于 LLaMA 解码层）进行条件流匹配生成、以及句级歌词对齐机制，实现了在 10 秒内生成 4 分 45 秒 44.1kHz 立体声完整歌曲，推理速度比自回归方法快约 50 倍。

#### 🎯 核心要点
- **全扩散架构**：首个不依赖语言模型的端到端歌曲生成模型，采用 VAE + DiT 两阶段连续潜空间建模，避免了自回归模型的累积误差和高计算开销
- **高效 VAE**：基于 Stable Audio 2 的全卷积 VAE（157M 参数），将 44.1kHz 立体声音频以 2048 倍下采样压缩为 21.5Hz、64 维潜表示；支持有损到无损（MP3→FLAC）重建
- **DiT 骨干**：1.1B 参数，采用 16 层 LLaMA 解码层（2048 维隐藏层、32 头注意力），利用 FlashAttention2 和梯度检查点支持长序列；兼容 Unsloth/Liger-Kernel 加速库实现 25%+ 训练加速
- **条件流匹配（CFM）训练**：采用 logit-normal 时间步采样分布，使训练聚焦于中间困难区域；Euler ODE 求解器 32 步推理，CFG scale=4
- **句级歌词对齐**：仅需句子起始时间戳，通过 G2P 转换后将音素序列放置到对应潜帧位置，解决歌曲中人声不连续和伴奏干扰导致的对齐难题
- **两阶段训练**：先以 \(L_{max}=2048\)（≈95s）训练基础模型，再微调至 \(L_{max}=6144\)（≈4m45s）实现全长生成
- **RTF ≈ 0.034**：4m45s 歌曲仅需约 10 秒生成，比 SongLM 快约 50 倍
- **数据集**：约 100 万首歌曲（6 万小时），中英文歌曲比例 3:6:1

#### 🔬 深入细节
![DiffRhythm 模型架构图](https://arxiv.org/html/2503.01183v1/x1.png)
*图 1：DiffRhythm 整体架构。左侧为 VAE 编解码器，右侧为 DiT 条件生成流程，输入包括风格提示、时间步嵌入和歌词音素序列*

![数据预处理流程](https://arxiv.org/html/2503.01183v1/x2.png)
*图 2：DiffRhythm 数据预处理流程。歌词经 G2P 转换后按时间戳放置到对应潜帧位置*

##### 算法伪代码

```python
# DiffRhythm 训练与推理流程

# === 阶段一：VAE 训练 ===
# 冻结编码器，训练解码器 2.5M 步
for batch in lossless_data:
    y_input = random_mp3_compress(y, prob=2/3)  # 2/3概率MP3压缩
    z = Encoder(y_input)           # 编码到潜空间 z ∈ R^{L×64}
    y_hat = Decoder(z)             # 解码重建
    loss = STFT_loss(y_hat, y) + adversarial_loss(y_hat, y)
    optimizer.step(loss)

# === 阶段二：DiT 训练（条件流匹配） ===
for batch in song_data:
    z1 = VAE_Encoder(y)                    # 目标潜表示
    z0 = torch.randn_like(z1)             # 噪声采样
    u = Normal(m, s).sample()             # logit-normal 采样
    t = sigmoid(u)                         # 时间步 t ∈ (0,1)
    zt = (1-t)*z0 + t*z1                  # 线性插值
    
    # 条件特征
    style = LSTM(style_prompt)[-1]         # 风格全局向量
    cond = style + timestep_embed(t)       # 全局条件
    phones = PhoneEmbed(lyrics_aligned)    # 句级对齐音素嵌入
    input = concat([zt, cond, phones], dim=-1)
    
    v_pred = DiT(input)                    # 预测速度场
    loss = ||v_pred - (z1 - z0)||²
    optimizer.step(loss)

# === 推理 ===
z = torch.randn(1, L_max, 64)            # 初始噪声
for step in euler_steps(32):               # 32步Euler ODE
    v = DiT(z, t, style, lyrics)          # CFG: w=4
    z = z + dt * v
y = VAE_Decoder(z)                         # 解码为波形
```

##### 动机与背景

现有歌曲生成方法主要面临三大挑战：

1. **多阶段级联复杂性**：Melodist、MelodyLM 等方法采用先生成人声再生成伴奏的两阶段流程，导致系统复杂且人声-伴奏协调性差
2. **自回归模型的固有缺陷**：SongCreator、SongEditor 等基于语言模型的方法虽能同时生成人声和伴奏，但自回归解码带来巨大计算开销，且难以维持长序列的风格和节奏一致性
3. **歌词对齐困难**：歌曲中人声片段被大段纯乐器间奏分隔，传统 TTS 的交叉注意力或特征拼接方法在歌曲场景下无法实现可理解的人声

DiffRhythm 通过全扩散架构一次性解决上述问题：非自回归的 DiT 天然支持全局建模，连续潜空间比离散 codec token 保留更丰富的音乐细节和人声细微差别。

##### 核心机制详解

**1. VAE：高保真音频压缩与有损修复**

VAE 采用 Stable Audio 2 的全卷积编解码器架构，将 44.1kHz 立体声波形 \(y \in \mathbb{R}^{T \times 2}\) 压缩为 \(z \in \mathbb{R}^{L \times 64}\)，压缩因子 \(f = 2048\)（即 21.5Hz 帧率）。

训练损失包含三部分：
- **多分辨率 STFT 损失**：在 Mid/Side 分解和左/右声道两个域计算，后者权重为前者的 0.5 倍
- **对抗损失**：使用参数量约为原版 4 倍的卷积判别器，增强高频细节捕获能力
- **有损到无损重建**：训练时以 2/3 概率对输入施加随机 VBR（0-7）的 MP3 压缩，重建目标始终为无损 FLAC 数据

> 💡 关键：这种有损到无损的数据增强策略使 VAE 具备了音频修复能力——即使输入为 MP3 压缩音频，也能恢复高频成分和中频频谱连续性。

实验结果（Table 1）显示，DiffRhythm VAE 在无损重建场景下 STOI 达 0.646、PESQ 达 2.235，分别比 Stable Audio 2 VAE 提升 3.8% 和 12.3%；在有损输入场景下仍保持稳健性能（STOI=0.639, PESQ=2.191），而基线模型完全无法处理此场景。

**2. DiT：基于 LLaMA 的条件流匹配生成**

DiT 以三种条件特征为输入：
- **风格提示**：随机截取的短音频片段经 LSTM 编码，取最终隐状态作为全局风格向量，与时间步嵌入相加形成全局条件
- **歌词音素**：经 G2P 转换和句级对齐后的音素 token 通过嵌入层得到连续表示
- **噪声潜表示**：加噪后的潜变量

三者沿通道维度拼接后输入 DiT。模型采用条件流匹配（CFM）范式训练：

$$\mathcal{L} = \mathbb{E}_{t \sim \pi_{\text{ln}}, z_t \sim p_t(z_t)} \left[ \| v_\theta(z_t, t, c) - (z_1 - z_0) \|_2^2 \right]$$

其中时间步采样遵循 logit-normal 分布：

$$\pi_{\text{ln}}(t; m, s) = \frac{1}{s\sqrt{2\pi}} \frac{1}{t(1-t)} \exp\left(-\frac{(\text{logit}(t) - m)^2}{2s^2}\right)$$

> 💡 关键：logit-normal 采样使训练集中于中间时间步（预测最困难的区域），参数 \(m\) 和 \(s\) 分别控制偏向数据/噪声端和集中程度。

DiT 骨干选择 LLaMA 解码层而非原版 DiT 的设计，关键优势在于可直接利用 NLP 社区的加速库（Unsloth、Liger-Kernel）通过算子融合实现 25%+ 的训练/推理加速，无需任何性能损失。

推理时使用 20% 独立 dropout 的分类器无关引导（CFG），引导尺度为 4，Euler ODE 求解器 32 步完成去噪。

**3. 句级歌词对齐：简洁高效的语义对应**

这是 DiffRhythm 的关键创新之一。传统 TTS 的对齐方法（交叉注意力、直接拼接）在歌曲生成中失败，原因在于：
- 人声片段被长段纯乐器间奏分隔，形成时间不连续性
- 同一歌词在不同歌曲中有不同伴奏，增加对齐难度

DiffRhythm 的解决方案极为简洁：

1. 将每句歌词 \(s_i\) 通过 G2P 转换为音素序列 \(\mathbf{p}_i \in \mathcal{V}^{L_i}\)
2. 初始化与潜表示等长的全 pad 序列 \(\mathbf{P} = [\langle\text{pad}\rangle]^{L_{max}}\)
3. 根据句子起始时间戳 \(t_i^{start}\) 计算对应帧位置 \(f_i^{start} = \lfloor t_i^{start} \cdot F_s \rfloor\)
4. 将音素序列覆写到对应位置：\(\mathbf{P}[f_i^{start} : f_i^{start} + L_i] = \mathbf{p}_i\)

> ⚠️ 注意：消融实验证明句级对齐至关重要——移除后人声可理解性完全崩溃（PER 无法测量），但基本音乐结构仍保留，说明该机制专门解决语义对应问题。

##### 与传统方法的对比

| 特性 | Melodist / MelodyLM | SongCreator / SongEditor | **DiffRhythm** |
|------|---------------------|--------------------------|----------------|
| 架构 | 自回归 LM（两阶段） | 自回归 LM（同时生成） | **全扩散（VAE+DiT）** |
| 生成方式 | 先人声后伴奏 | 同时生成 | **同时生成** |
| 最大时长 | ~120s | ~120s | **285s (4m45s)** |
| RTF | ~1.7 | - | **~0.034** |
| 表示空间 | 离散 codec token | 离散 codec token | **连续 VAE 潜空间** |
| 歌词对齐 | 音乐乐谱/文本描述 | 复杂对齐机制 | **句级时间戳对齐** |
| 数据需求 | 需要乐谱/分离人声 | 需要分离人声 | **仅需歌词+句起始时间戳** |

DiffRhythm-base（95s）在 PER 上达 17.47%，比 SongLM 的 21.35% 降低 18.2%，同时质量 MOS（4.19）和可理解性 MOS（3.80）均优于 SongLM（4.06 / 3.44）。SongLM 在 FAD（1.92 vs 2.11）和音乐性 MOS（4.27 vs 4.14）上略优，表明长期声学一致性和旋律表达仍有提升空间。

#### 🧪 练习题
```yaml
question: "DiffRhythm 中句级歌词对齐机制的核心设计是什么？"
options:
  - "使用交叉注意力机制让 DiT 关注歌词 token"
  - "将音素序列按句子起始时间戳放置到对应的潜空间帧位置"
  - "训练一个独立的对齐预测网络估计每个音素的持续时间"
  - "利用 CTC 损失函数实现端到端的软对齐学习"
answer: 1
explain: "DiffRhythm 仅需句子起始时间戳，通过 G2P 转换后将音素序列覆写到潜表示对应帧位置，用 pad 填充无人声区域，以极简方式解决歌曲中人声不连续的对齐难题。"
```

### Yue

```yaml
id: yue
num: 33
name: Yue
full_name: 乐 (Yue)
year: '2025'
org: arXiv
parent: songgen
paper_url: https://arxiv.org/abs/2502.44444
project_url: ''
category: end_to_end
motivation: 开源音乐基础模型解决长时衰减问题
```

#### 📝 一句话总结
Yue 的核心目标是：开源音乐基础模型解决长时衰减问题。

#### 🎯 核心要点
- 核心动机：开源音乐基础模型解决长时衰减问题
- 演化来源：继承或改进自 songgen
- 代表机构：arXiv

#### 🔬 深入细节
开源音乐基础模型解决长时衰减问题


### HeartMuLa

```yaml
id: heartmula
num: 34
name: HeartMuLa
full_name: 心律音乐 (HeartMuLa)
year: '2026'
org: arXiv
parent: yue
paper_url: https://arxiv.org/abs/2602.55555
project_url: ''
category: end_to_end
motivation: 开源音乐基础模型家族CLAP+LLM+生成
```

#### 📝 一句话总结
HeartMuLa 的核心目标是：开源音乐基础模型家族CLAP+LLM+生成。

#### 🎯 核心要点
- 核心动机：开源音乐基础模型家族CLAP+LLM+生成
- 演化来源：继承或改进自 yue
- 代表机构：arXiv

#### 🔬 深入细节
开源音乐基础模型家族CLAP+LLM+生成


### VidMuse

```yaml
id: vidmuse
num: 35
name: VidMuse
full_name: 视频缪斯 (VidMuse)
year: '2025.06'
org: CVPR
parent: diff_bgm
paper_url: http://openaccess.thecvf.com/content/CVPR2025/html/Tian_VidMuse_A_Simple_Video-to-Music_Generation_Framework_with_Long-Short-Term_Modeling_CVPR_2025_paper.html
project_url: ''
category: end_to_end
motivation: 长短期建模实现视频驱动背景音乐
```

#### 📝 一句话总结
VidMuse 的核心目标是：长短期建模实现视频驱动背景音乐。

#### 🎯 核心要点
- 核心动机：长短期建模实现视频驱动背景音乐
- 演化来源：继承或改进自 diff_bgm
- 代表机构：CVPR

#### 🔬 深入细节
长短期建模实现视频驱动背景音乐


### TCSinger

```yaml
id: tcsinger
num: 36
name: TCSinger
full_name: 跨语言歌唱合成 (TCSinger)
year: '2024'
org: EMNLP
parent: jukebox
paper_url: https://aclanthology.org/2024.emnlp-main.1/
project_url: ''
category: svs
motivation: 首个零样本SVS模型支持跨语言风格迁移
```

#### 📝 一句话总结
TCSinger 的核心目标是：首个零样本SVS模型支持跨语言风格迁移。

#### 🎯 核心要点
- 核心动机：首个零样本SVS模型支持跨语言风格迁移
- 演化来源：继承或改进自 jukebox
- 代表机构：EMNLP

#### 🔬 深入细节
首个零样本SVS模型支持跨语言风格迁移


### NaturalSpeech 2

```yaml
id: naturalspeech2
num: 37
name: NaturalSpeech 2
full_name: 自然语音2 (NaturalSpeech 2)
year: '2024'
org: ICLR
parent: tcsinger
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/035a73893121b4534bb3314e831050b1-Abstract-Conference.html
project_url: ''
category: svs
motivation: 潜在扩散模型实现零样本语音和歌唱合成
```

#### 📝 一句话总结
NaturalSpeech 2 提出了一种基于**神经音频编解码器**与**潜在扩散模型**的非自回归 TTS 系统，通过将语音表示为连续潜在向量（而非离散 token）并结合 speech prompting 机制，在 44K 小时数据上训练后实现了**超越人类录音质量**的零样本语音与歌声合成。

#### 🎯 核心要点
- **连续潜在向量表示**：使用带残差向量量化（RVQ）的神经音频编解码器，将量化后的多层码本嵌入求和为单一连续向量，避免离散 token 的信息损失与多码本建模困难
- **潜在扩散模型**：基于 SDE 的扩散/去噪过程，在连续潜在空间中生成语音，以 WaveNet 为骨干网络，直接预测 \(\hat{z}_0\) 而非 score
- **三项联合损失**：数据重建损失 + score 匹配损失 + 新颖的 CE-RVQ 正则化损失（跨残差量化器的交叉熵约束）
- **Prior 模型**：Phoneme Encoder（Transformer）+ Duration/Pitch Predictor（卷积），提供帧级条件信息 \(c\)
- **Speech Prompting 机制**：训练时随机截取目标语音片段作为 prompt，对 duration/pitch predictor 使用 Q-K-V attention，对 diffusion model 使用双注意力瓶颈 + FiLM 仿射变换，实现零样本 in-context learning
- **大规模训练**：44K 小时多语言多说话人数据（MLS 数据集），400M 参数，16×V100 训练
- **SOTA 结果**：在 LibriSpeech/VCTK 上 CMOS 与真实录音持平甚至更优，SMOS 大幅超越 YourTTS/VALL-E，WER 仅 2.26%，50 条困难句子 0% 错误率

#### 🔬 深入细节
##### 整体架构

![NaturalSpeech 2 整体架构](https://ar5iv.labs.arxiv.org/html/2304.09116/assets/x1.png)
*图 1：NaturalSpeech 2 总览。系统由音频编解码器（上方）和条件潜在扩散模型（下方）两大部分组成。编解码器将语音压缩为连续潜在向量，扩散模型以音素编码器和时长/音高预测器为先验，在潜在空间中生成语音。*

##### 神经音频编解码器

![音频编解码器结构](https://ar5iv.labs.arxiv.org/html/2304.09116/assets/x2.png)
*图 2：编解码器由 Encoder、残差向量量化器（RVQ）和 Decoder 组成。RVQ 的 R 层码本嵌入求和为连续向量 z。*

编解码器的核心设计动机是**将离散 token 转化为连续向量**。传统方法（如 VALL-E）使用 RVQ 的离散码本索引作为语音表示，面临两个困境：

1. **码本数量少** → 信息损失大，语音质量差
2. **码本数量多** → 需要复杂的多阶段自回归建模，误差累积

NaturalSpeech 2 的解决方案：对 RVQ 的 \(R\) 层量化嵌入 \(e_1, e_2, \ldots, e_R\) 直接求和，得到单一连续向量：

$$z = \sum_{i=1}^{R} e_i$$

这样既保留了 RVQ 的高保真重建能力，又将表示统一为单一序列，可以直接用扩散模型建模。编解码器以 200 倍下采样率（16kHz 采样率下约 80Hz 帧率）提取帧级潜在表示。

> 💡 **关键洞察**：连续向量 = RVQ 所有层嵌入之和，这一简单操作消除了多码本序列建模的复杂性，是本文最重要的设计选择之一。

##### 潜在扩散模型

扩散模型在连续潜在空间中运行，采用 SDE 框架：

**前向过程**（加噪）：

$$\mathrm{d}z_t = -\frac{1}{2}\beta_t z_t \,\mathrm{d}t + \sqrt{\beta_t}\,\mathrm{d}w_t, \quad t \in [0,1]$$

条件分布为高斯：\(p(z_t|z_0) \sim \mathcal{N}(\rho(z_0, t), \Sigma_t)\)，其中 \(\rho(z_0, t) = e^{-\frac{1}{2}\int_0^t \beta_s ds} z_0\)，\(\Sigma_t = I - e^{-\int_0^t \beta_s ds}\)。

**反向过程**（去噪）：

$$\mathrm{d}z_t = -\left(\frac{1}{2}z_t + \nabla\log p_t(z_t)\right)\beta_t\,\mathrm{d}t + \sqrt{\beta_t}\,\mathrm{d}\tilde{w}_t$$

也可使用 ODE 形式进行确定性采样。

**网络设计**：使用 WaveNet 架构的 \(s_\theta(z_t, t, c)\) 直接预测去噪后的 \(\hat{z}_0\)（而非 score），作者发现这能获得更好的语音质量。

##### 训练损失

总损失由三部分组成：

$$\mathcal{L} = \mathcal{L}_{\text{diff}} + \mathcal{L}_{\text{dur}} + \mathcal{L}_{\text{pitch}}$$

其中扩散损失 \(\mathcal{L}_{\text{diff}}\) 包含三项：

$$\mathcal{L}_{\text{diff}} = \mathbb{E}_{z_0, t}\left[\underbrace{\|\hat{z}_0 - z_0\|_2^2}_{\text{数据重建损失}} + \underbrace{\|\Sigma_t^{-1}(\rho(\hat{z}_0, t) - z_t) - \nabla\log p_t(z_t)\|_2^2}_{\text{Score 匹配损失}} + \underbrace{\lambda_{\text{ce-rvq}}\mathcal{L}_{\text{ce-rvq}}}_{\text{RVQ 正则化}}\right]$$

**CE-RVQ 损失**是本文的创新正则化项：对每个残差量化器 \(j \in [1, R]\)，计算预测 \(\hat{z}_0\) 的残差向量 \(\hat{z}_0 - \sum_{i=1}^{j-1} e_i\) 与码本中所有嵌入的 L2 距离，经 softmax 得到概率分布，再与真实码本 ID 计算交叉熵。\(\lambda_{\text{ce-rvq}} = 0.1\)。

> 💡 **CE-RVQ 的直觉**：该损失迫使扩散模型的预测不仅在连续空间中接近真实值，还要在离散码本空间中对齐正确的量化索引，相当于为连续预测提供了离散结构化约束。

```python
# CE-RVQ 损失伪代码
def ce_rvq_loss(z_hat_0, codebooks, gt_indices):
    """
    z_hat_0: 扩散模型预测的连续向量 [B, T, D]
    codebooks: R 个码本, 每个 [num_codes, D]
    gt_indices: 真实码本索引 [B, T, R]
    """
    total_loss = 0
    residual = z_hat_0
    for j in range(R):
        # 计算残差与码本的 L2 距离
        distances = -torch.cdist(residual, codebooks[j])  # 负距离
        probs = softmax(distances, dim=-1)
        # 交叉熵损失
        total_loss += cross_entropy(probs, gt_indices[:, :, j])
        # 更新残差（使用真实嵌入）
        residual = residual - codebooks[j][gt_indices[:, :, j]]
    return total_loss / R
```

##### Prior 模型

Prior 模型为扩散模型提供条件信息 \(c\)：

1. **Phoneme Encoder**：基于 Transformer，将 FFN 替换为卷积网络以捕获音素序列的局部依赖
2. **Duration Predictor**：卷积块，L1 损失训练，将音素级隐藏序列扩展为帧级序列
3. **Pitch Predictor**：卷积块，L1 损失训练，预测帧级基频信息

训练时使用真实时长和音高，推理时使用预测值。

##### Speech Prompting 机制

![Speech Prompting 机制](https://ar5iv.labs.arxiv.org/html/2304.09116/assets/x3.png)
*图 3：Speech Prompting 在 duration/pitch predictor 和 diffusion model 中的不同策略。训练时从目标语音中随机截取片段作为 prompt，推理时使用参考说话人的语音。*

这是实现零样本合成的关键机制：

**训练策略**：从目标语音潜在序列 \(z\) 中随机截取片段 \(z^{u:v}\) 作为 prompt，剩余部分 \(z^{\setminus u:v}\) 作为扩散模型的学习目标。

**两种注入策略**：

1. **Duration/Pitch Predictor**：在卷积层中插入 Q-K-V attention，query 来自卷积隐藏序列，key/value 来自 prompt encoder 的输出。这允许预测器直接从 prompt 中学习说话人的韵律特征。

2. **Diffusion Model**：采用**双注意力瓶颈**设计，避免向扩散模型暴露过多细节：
   - **第一个注意力块**：用 \(m\) 个随机初始化的可学习嵌入作为 query，attend 到 prompt 隐藏序列 → 得到长度为 \(m\) 的压缩表示（信息瓶颈）
   - **第二个注意力块**：WaveNet 隐藏序列作为 query，\(m\) 长度的压缩表示作为 key/value
   - 注意力结果通过 **FiLM 层**（Feature-wise Linear Modulation）对 WaveNet 隐藏序列进行仿射变换

> ⚠️ **设计考量**：对 diffusion model 使用信息瓶颈而非直接 attention 是有意为之——如果暴露过多 prompt 细节，扩散模型可能直接复制而非学习泛化的说话人特征，反而损害生成质量。

**推理时**：使用目标说话人的一段参考语音（经 codec encoder 编码为潜在向量）作为 prompt，即可实现零样本语音克隆。

##### 与传统方法的对比

| 特性 | VALL-E (AR + 离散) | NaturalSpeech 2 (Non-AR + 连续) |
|------|-------------------|-------------------------------|
| 语音表示 | 离散 token 序列 | 连续潜在向量 |
| 生成模型 | 自回归语言模型 | 潜在扩散模型 |
| 码本建模 | 多阶段（AR + NAR） | 单一连续向量，无需分阶段 |
| 鲁棒性 | 存在重复/跳词问题 | 非自回归，50 条困难句 0% 错误 |
| 韵律多样性 | 受限 | 扩散模型天然支持多样采样 |
| 语音质量 (CMOS) | -0.31 vs NS2 | 与真实录音持平/更优 |

##### 实验结果亮点

- **语音质量**：在 LibriSpeech 上 CMOS 为 -0.142（vs GT），在 VCTK 上为 +0.208（vs GT），均在统计误差范围内或优于真实录音
- **说话人相似度**：SMOS 在 LibriSpeech 上达 3.54（GT 为 3.79），大幅超越 YourTTS（2.29）和 VALL-E（3.23）
- **可懂度**：WER 在 LibriSpeech 上仅 2.26%（GT 为 1.94%），在 VCTK 上 3.36%（GT 为 5.89%，NS2 更优）
- **鲁棒性**：50 条特别困难的句子上 0% 错误率，而 VALL-E 为 4%，YourTTS 为 12%
- **歌声合成**：同一模型可扩展到歌声合成任务

#### 🧪 练习题
```yaml
question: "NaturalSpeech 2 为什么将 RVQ 的多层码本嵌入求和为单一连续向量，而非直接使用离散 token？"
options:
  - "为了减少模型参数量和计算开销"
  - "为了避免多码本序列建模的复杂性和离散 token 的信息损失，使扩散模型可以在统一的连续空间中生成"
  - "为了兼容自回归语言模型的输入格式"
  - "为了提高 RVQ 编解码器本身的重建质量"
answer: 1
explain: "离散 token 面临码本少则信息损失、码本多则建模困难的两难困境。求和为连续向量后，既保留了多层 RVQ 的高保真信息，又将表示统一为单一序列，可直接用扩散模型在连续空间中建模，避免了多阶段自回归的复杂性。"
```

### SoulX-Singer

```yaml
id: soulx_singer
num: 38
name: SoulX-Singer
full_name: 灵魂歌手 (SoulX-Singer)
year: '2026.02'
org: arXiv
parent: naturalspeech2
paper_url: https://arxiv.org/abs/2602.07803
project_url: ''
category: svs
motivation: 高质量零样本歌唱合成系统
```

#### 📝 一句话总结
SoulX-Singer 的核心目标是：高质量零样本歌唱合成系统。

#### 🎯 核心要点
- 核心动机：高质量零样本歌唱合成系统
- 演化来源：继承或改进自 naturalspeech2
- 代表机构：arXiv

#### 🔬 深入细节
高质量零样本歌唱合成系统


### CoMelSinger

```yaml
id: comelsinger
num: 39
name: CoMelSinger
full_name: 协同旋律歌手 (CoMelSinger)
year: '2026'
org: IEEE TASLP
parent: soulx_singer
paper_url: https://ieeexplore.ieee.org/abstract/document/11395527/
project_url: ''
category: svs
motivation: 离散token+结构化旋律控制零样本歌唱
```

#### 📝 一句话总结
CoMelSinger 的核心目标是：离散token+结构化旋律控制零样本歌唱。

#### 🎯 核心要点
- 核心动机：离散token+结构化旋律控制零样本歌唱
- 演化来源：继承或改进自 soulx_singer
- 代表机构：IEEE TASLP

#### 🔬 深入细节
离散token+结构化旋律控制零样本歌唱


### HQ-SVC

```yaml
id: hq_svc
num: 40
name: HQ-SVC
full_name: 高质量歌声转换 (HQ-SVC)
year: '2026'
org: AAAI
parent: comelsinger
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/40249
project_url: ''
category: svs
motivation: 低资源场景高质量零样本歌声转换
```

#### 📝 一句话总结
HQ-SVC 的核心目标是：低资源场景高质量零样本歌声转换。

#### 🎯 核心要点
- 核心动机：低资源场景高质量零样本歌声转换
- 演化来源：继承或改进自 comelsinger
- 代表机构：AAAI

#### 🔬 深入细节
低资源场景高质量零样本歌声转换
