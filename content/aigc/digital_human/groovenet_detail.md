### GrooveNet

```yaml
id: groovenet
name: "GrooveNet"
full_name: "GrooveNet: 实时音乐驱动的舞蹈动作生成 (Real-Time Music-Driven Dance Movement Generation using Artificial Neural Networks)"
year: "2017"
org: "Simon Fraser University / Metacreation Lab"
paper_url: "https://omid.al/docs/groovenet-ml4c-2017.pdf"
category: "foundation"
parent: "—"
motivation: "利用 FCRBM 学习音频特征与动作捕捉数据之间的跨模态映射，实现实时音乐驱动的舞蹈动作生成"
```

#### 📝 一句话总结

GrooveNet 提出利用 Factored Conditional Restricted Boltzmann Machine (FCRBM) 将音频特征作为条件上下文，学习音乐与舞蹈动作之间的跨模态非线性映射，实现从音乐音频流实时生成连续全身舞蹈动作，是音乐驱动舞蹈生成领域的早期探索性工作。

#### 🎯 核心要点

- **三种映射策略**：提出 one-to-many、synchronized many-to-many、unsynchronized many-to-many 三种音频到动作的映射方案，本文实现 one-to-many 方案
- **FCRBM 生成模型**：采用 Factored Conditional Restricted Boltzmann Machine 作为核心模型，将音频特征输入 context unit 以非线性方式调制动作生成的能量景观
- **自建同步数据集**：录制 4 段同步音乐-动捕数据（约 23 分钟，82151 帧，60fps），使用 40 台 Vicon 摄像头光学动捕系统
- **84 维音频特征**：包含 RMS、Bark bands、MFCC、频谱特征、音高等，经 Essentia 库提取后通过 5Hz FIR 低通滤波平滑
- **52 维动作表示**：将 Euler 角转换为指数映射 (exponential maps)，根节点全局位置替换为地面投影速度
- **训练歌曲上有效**：模型可在训练歌曲上生成节奏同步的舞蹈动作，捕捉到音乐节拍与动作的对应关系
- **泛化能力不足**：模型无法泛化到未见歌曲，主要归因于训练数据过小过稀疏
- **满足实时要求**：500 hidden units + 500 factors + order 30，每帧生成仅需 0.0115s，满足 60fps 实时生成

#### 🔬 深入细节

##### 问题定义与动机

音乐驱动的舞蹈动作生成是一个高度非线性的跨模态时序映射问题。与语音驱动的手势生成不同，音乐与舞蹈之间的关系远更复杂和任意——它依赖于舞蹈和音乐的流派、舞者的专业水平和个人特征，并呈现从短期节拍同步到长期舞蹈模式演变的复杂时间层次结构。

此前的方法主要依赖于 HMM 等概率模型，需要对音频信号进行节拍检测和分类，将舞蹈限制在预定义的动作模式集合中，限制了生成新颖动作的能力。GrooveNet 的核心思路是让模型以**无监督方式**学习从音频信息到动作数据的连续跨模态映射，而非依赖分类或分割。

> 💡 关键：GrooveNet 的目标应用是公共交互装置——观众提供自己的音乐，驱动虚拟角色实时跳舞，因此对实时性和泛化性有严格要求。

##### 数据处理流水线

![GrooveNet 数据处理流水线](https://metacreation.net/wp-content/uploads/2017/08/groovenet_pipeline.png)
*图：GrooveNet 的音频与动作数据处理流水线（来自论文 Figure 2）。若链接不可用，请参阅原始论文 PDF。*

**音频特征提取（84 维）：**

原始音频 → 使用 Essentia 库提取低级特征（窗口 66.7ms，跳步 16.7ms）→ FIR 低通滤波（截止频率 5Hz）→ 拼接归一化 → 84 维向量。特征包括：
- 低级特征：RMS 能量、Bark 频带
- 频谱特征：低/中/高频能量、谱质心、谱展宽、谱偏度、谱峰度、谱滚降、谱峰值、谱通量、谱复杂度
- 音色特征：MFCC、Tristimulus
- 旋律特征：基频（YIN 算法）、音高显著性、不谐和度、不协和度

> ⚠️ 注意：5Hz 低通滤波是关键设计——确保音频描述符的时间尺度与舞蹈动作的时间尺度匹配，避免高频音频细节干扰动作生成。

**动作捕捉数据处理（52 维）：**

原始动捕（30 关节，93 维 Euler 角）→ 转换为指数映射 (exponential maps) → 以身体为中心的朝向 → 根节点全局位置替换为地面投影 2D 速度 + 垂直轴旋转速度 → 移除空维度 → 归一化 → 52 维向量。

指数映射的使用避免了 Euler 角的万向锁问题和自由度损失，根节点速度替代全局位置使模型学习相对运动而非绝对位置。

##### FCRBM 模型架构

论文 Figure 3 展示了 FCRBM 的架构：

```
         ┌──────────────┐
         │  Hidden Layer │
         └──────┬───────┘
                │
    ┌───────────┼───────────┐
    │     Multiplicative    │
    │     Three-Way Gates   │
    │   (Factored Weights)  │
    └───┬───────┬───────┬───┘
        │       │       │
  ┌─────┴──┐ ┌─┴────┐ ┌┴──────────┐
  │ Mocap  │ │Context│ │  Mocap    │
  │ Output │ │(Audio)│ │  History  │
  └────────┘ └───────┘ └───────────┘
```

FCRBM 是一种基于能量的生成模型，其核心机制是通过**三组乘法门控 (multiplicative gates)** 实现条件生成：

$$E(\mathbf{v}, \mathbf{h} \mid \mathbf{c}, \mathbf{x}) = -\sum_{f} \left( \sum_i W^v_{if} v_i \right) \left( \sum_j W^h_{jf} h_j \right) \left( \sum_k W^c_{kf} c_k + \sum_l W^x_{lf} x_l \right)$$

其中：
- \(\mathbf{v}\) 是输出可见单元（生成的动捕帧）
- \(\mathbf{h}\) 是隐藏单元
- \(\mathbf{c}\) 是上下文单元（音频特征）
- \(\mathbf{x}\) 是条件单元（动捕历史帧）
- \(f\) 索引因子 (factors)，实现权重的低秩分解

> 💡 关键：Context unit 的值直接调制隐藏层与输出层之间的权重连接，从而以非线性方式控制网络的能量景观——不同的音频输入会导致模型倾向于生成不同风格的动作。

##### 训练与生成流程

```python
# GrooveNet 训练伪代码
# 输入: 同步的音频特征序列 A 和动捕帧序列 M
# 模型: FCRBM with N_hidden=500, N_factors=500, order=30

for epoch in range(num_epochs):
    for t in range(order, len(M)):
        # 构建输入
        mocap_history = M[t-order : t]      # 过去 30 帧动捕数据
        audio_context = A[t]                 # 当前时刻音频特征 (84D)
        mocap_target  = M[t]                 # 目标动捕帧 (52D)
        
        # FCRBM 对比散度 (Contrastive Divergence) 学习
        # 正相: 从数据计算隐藏层激活
        h_pos = sigmoid(W_factor @ (mocap_target, mocap_history, audio_context))
        # 负相: Gibbs 采样重构
        v_neg = sample_visible(h_pos, mocap_history, audio_context)
        h_neg = sigmoid(W_factor @ (v_neg, mocap_history, audio_context))
        
        # 更新权重
        update_weights(h_pos, h_neg, v_pos=mocap_target, v_neg=v_neg)

# 生成伪代码
def generate(audio_stream, seed_frames, order=30):
    """实时逐帧生成舞蹈动作"""
    history = seed_frames[-order:]  # 初始动捕历史
    for t in range(len(audio_stream)):
        audio_t = audio_stream[t]   # 当前音频特征
        # FCRBM 迭代采样: 给定历史和音频，预测下一帧
        new_frame = fcrbm.sample(history, audio_t)
        history = concat(history[1:], new_frame)  # 滑动窗口更新
        yield new_frame  # 输出生成帧 (0.0115s/帧 << 16.7ms/帧@60fps)
```

训练采用标准的对比散度 (Contrastive Divergence, CD) 算法。生成时采用**自回归迭代采样**：模型预测一帧动作后，将其加入历史窗口作为下一步预测的输入，同时读取新的音频帧作为上下文。

##### 实验结果分析

论文报告了三组实验：

**实验 1：独立舞蹈模式生成。** 手动将舞蹈序列按歌曲段落分割并标注，用 one-hot 编码替代音频特征作为 context。结果表明 FCRBM 仅用约 4 分钟的单条动捕序列即可学习并生成不同的舞蹈模式，切换标签可平滑过渡到不同模式。

**实验 2：训练歌曲上的舞蹈生成。** 使用完整 4 段数据无监督训练，用训练集中的歌曲驱动生成。模型成功捕捉到音乐节奏结构与动作之间的同步关系（论文 Figure 6 展示了臀部垂直位置与音频振幅的对应）。但生成的动作偶尔出现抖动和脚滑等伪影。

**实验 3：未见歌曲上的舞蹈生成。** 使用训练集外的歌曲驱动生成，结果表明模型**无法泛化**，严重过拟合于训练数据。作者将此归因于训练数据过小（仅 23 分钟，4 段表演）。

**计算性能：** 模型含 1,452,720 个可训练参数，在 Intel i7-4850HQ CPU 上每帧生成耗时 0.0115 秒，满足 60fps 实时要求。

##### 与传统方法的对比

| 特性 | HMM-based (Ofli et al.) | GrooveNet (FCRBM) |
|------|------------------------|-------------------|
| 音频处理 | 需要节拍检测 + 模式分类 | 直接使用连续低级特征 |
| 动作表示 | 离散舞蹈图案 (dance figures) | 连续动捕帧 (52D) |
| 映射方式 | 分类→检索预定义模式 | 无监督连续映射 |
| 新颖性 | 受限于预定义模式库 | 可生成训练集中未出现的动作 |
| 实时性 | 支持 | 支持（0.0115s/帧） |
| 泛化性 | 依赖模式库覆盖度 | 当前版本泛化能力不足 |

> ⚠️ 注意：本文是 workshop paper，报告的是初步结果。作者规划的后续方向包括：(1) 扩大数据集；(2) 半监督预训练——先在无音乐的舞蹈动捕数据上预训练动作模型，再结合 WaveNet 风格的音频嵌入进行跨模态学习；(3) 探索 LSTM-RNN 和 seq-to-seq 架构实现 many-to-many 映射。

#### 🧪 练习题

```yaml
question: "GrooveNet 中 FCRBM 的 context unit 接收什么输入来控制舞蹈动作的生成？"
options:
  - "动作捕捉的历史帧序列"
  - "舞蹈模式的 one-hot 标签"
  - "当前时刻的音频特征向量"
  - "隐藏层的激活值"
answer: 2
explain: "FCRBM 的 context unit 接收当前时刻的 84 维音频特征向量，通过乘法门控机制调制隐藏层与输出层之间的权重，从而使音频信息以非线性方式控制生成的舞蹈动作。动捕历史帧输入的是 condition unit 而非 context unit。"
```