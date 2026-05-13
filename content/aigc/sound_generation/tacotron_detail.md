### Tacotron: 端到端语音合成 (Tacotron: Towards End-to-End Speech Synthesis)

```yaml
id: tacotron
name: Tacotron
full_name: "Tacotron: 端到端语音合成 (Tacotron: Towards End-to-End Speech Synthesis)"
year: '2017'
org: Google
paper_url: https://arxiv.org/abs/1703.10135
category: tts
parent: wavenet
motivation: Seq2Seq注意力机制端到端合成
```

#### 📝 一句话总结

Tacotron 提出了一种基于 Seq2Seq + Attention 的端到端文本到语音合成模型，直接从字符序列生成语音频谱图，无需传统 TTS 流水线中的语言学特征工程和多阶段独立训练，在自然度上超越了生产级参数化系统。

#### 🎯 核心要点

- **端到端架构**：直接以字符序列为输入，输出原始频谱图，省去了文本前端、时长模型、声学模型等传统 TTS 流水线的多个独立模块
- **CBHG 模块**：提出 1-D 卷积组 + Highway 网络 + 双向 GRU 的组合模块，用于编码器和后处理网络，有效提取多尺度序列特征
- **两阶段频谱预测**：Seq2Seq 解码器先预测 80 维 mel 频谱图，再由后处理网络（Post-processing net）转换为线性频谱图
- **输出帧缩减技巧**：每个解码步预测 \(r\) 帧（reduction factor），大幅加速训练收敛和推理速度
- **Griffin-Lim 波形合成**：使用 Griffin-Lim 算法从线性频谱图重建波形，简单高效
- **Pre-net 正则化**：编码器和解码器均使用带 Dropout 的瓶颈层（Pre-net）作为正则化手段，提升泛化能力
- **实验结果**：在美式英语数据集上达到 3.82 MOS，超越生产级参数化 TTS 系统（3.69 MOS）

#### 🔬 深入细节

##### 模型整体架构

![Tacotron 模型架构图](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x1.png)
*图 1：Tacotron 模型架构。模型以字符为输入，输出对应的原始频谱图，再通过 Griffin-Lim 重建算法合成语音波形。*

Tacotron 的核心是一个带注意力机制的 Seq2Seq 模型，包含三个主要组件：**编码器（Encoder）**、**基于注意力的解码器（Attention-based Decoder）** 和 **后处理网络（Post-processing Net）**。

##### CBHG 模块

![CBHG 模块结构](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x2.png)
*图 2：CBHG（1-D 卷积组 + Highway 网络 + 双向 GRU）模块结构。*

CBHG 是 Tacotron 中的核心构建模块，其处理流程如下：

1. **1-D 卷积组（Conv1D Bank）**：使用 \(K\) 组不同宽度的 1-D 卷积滤波器（宽度从 1 到 \(K\)），显式建模从 unigram 到 \(K\)-gram 的局部上下文信息
2. **最大池化**：沿时间轴进行 stride=1 的最大池化，增强局部不变性并保持时间分辨率
3. **1-D 卷积投影**：通过固定宽度的 1-D 卷积进一步处理，并通过残差连接与原始输入相加
4. **Highway 网络**：多层全连接 Highway 网络提取高层特征
5. **双向 GRU**：最终通过双向 GRU 从前后两个方向提取序列特征

> 💡 **关键**：CBHG 的多尺度卷积设计类似于 n-gram 语言模型的思想——不同宽度的卷积核捕获不同粒度的局部模式，这比单纯的 RNN 编码器更能减少过拟合和发音错误。

##### 编码器（Encoder）

编码器将字符序列转换为高层表示：

1. 字符通过 one-hot 编码后嵌入为 256 维连续向量
2. 经过 **Pre-net**（FC-256-ReLU → Dropout(0.5) → FC-128-ReLU → Dropout(0.5)）进行非线性变换
3. Pre-net 输出送入 **CBHG 模块**（\(K=16\)），生成最终的编码器表示

##### 解码器（Decoder）

解码器采用 content-based tanh 注意力机制，逐步生成 mel 频谱图：

$$\text{Attention}(q, K, V) = \text{softmax}\left(\frac{qK^T}{\sqrt{d}}\right)V$$

具体流程：
1. **Attention RNN**（1 层 256 单元 GRU）生成注意力查询向量
2. 注意力模块计算上下文向量，与 Attention RNN 输出拼接
3. 拼接结果送入 **Decoder RNN**（2 层残差 GRU，256 单元）
4. 全连接输出层预测 \(r\) 帧 80 维 mel 频谱图

> ⚠️ **注意**：每步预测 \(r\) 帧（论文中 \(r=2\)）是关键技巧。这不仅将解码步数减少为 \(1/r\)，更重要的是大幅加速了注意力对齐的学习——因为相邻语音帧高度相关，一次输出多帧允许注意力在训练早期就能快速前移。

##### 后处理网络与波形合成

后处理网络的任务是将 mel 频谱图转换为线性频谱图：

- 使用另一个 CBHG 模块（\(K=8\)），能够看到完整的解码序列
- 相比 Seq2Seq 解码器只能从左到右生成，后处理网络同时利用前向和后向信息修正每帧的预测误差

波形合成使用 **Griffin-Lim 算法**，从预测的线性频谱图迭代重建相位信息：

$$x_{n+1} = \text{ISTFT}\left(|S| \cdot \frac{\text{STFT}(x_n)}{|\text{STFT}(x_n)|}\right)$$

其中 \(|S|\) 为预测的幅度谱。论文发现将预测幅度取 1.2 次幂后再送入 Griffin-Lim 可减少合成伪影。

##### 算法伪代码

```python
# Tacotron 端到端 TTS 推理流程
def tacotron_inference(text):
    # 1. 编码器
    chars = char_embedding(text)          # [T_in, 256]
    enc = encoder_prenet(chars)           # [T_in, 128]
    enc = encoder_cbhg(enc)              # [T_in, 256]
    
    # 2. 注意力解码器
    go_frame = zeros(80)                  # <GO> 帧
    decoder_input = go_frame
    mel_outputs = []
    
    for step in range(max_steps):
        prenet_out = decoder_prenet(decoder_input)
        attn_rnn_out = attention_rnn(prenet_out)
        context = attention(attn_rnn_out, enc)
        decoder_out = decoder_rnn(concat(context, attn_rnn_out))
        mel_frames = linear_projection(decoder_out)  # 预测 r 帧
        mel_outputs.append(mel_frames)
        decoder_input = mel_frames[-1]    # 取最后一帧作为下一步输入
        if is_end_of_sequence(mel_frames):
            break
    
    # 3. 后处理网络
    mel_spec = concat(mel_outputs)        # [T_out, 80]
    linear_spec = postprocessing_cbhg(mel_spec)  # [T_out, 1025]
    
    # 4. Griffin-Lim 波形合成
    waveform = griffin_lim(linear_spec, n_iter=50)
    return waveform
```

##### 训练细节

- **损失函数**：对 mel 频谱图和线性频谱图均使用 \(\ell_1\) 损失，两者权重相等

$$\mathcal{L} = \|\hat{y}_{\text{mel}} - y_{\text{mel}}\|_1 + \|\hat{y}_{\text{linear}} - y_{\text{linear}}\|_1$$

- **优化器**：Adam，学习率从 0.001 开始，在 500K/1M/2M 步分别衰减至 0.0005/0.0003/0.0001
- **批大小**：32，所有序列填充至最大长度
- **音频参数**：24 kHz 采样率，50 ms 帧长，12.5 ms 帧移，2048 点 FFT，0.97 预加重

> 💡 **关键**：训练时不使用 loss mask（即零填充帧也参与损失计算），这是为了让模型学会何时停止输出。使用 loss mask 的模型在推理时不知道何时结束，会在末尾产生重复声音。

##### 注意力对齐对比

![注意力对齐对比](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x3.png)
*图 3(a)：Vanilla Seq2Seq + Scheduled Sampling 的注意力对齐——对齐混乱，注意力频繁卡住。*

![GRU 编码器注意力对齐](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x4.png)
*图 3(b)：GRU 编码器的注意力对齐——对齐有噪声，导致发音错误。*

![Tacotron 注意力对齐](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x5.png)
*图 3(c)：Tacotron（CBHG 编码器）的注意力对齐——干净平滑的对角线对齐。*

消融实验表明：(1) 普通 Seq2Seq 模型学到的对齐质量很差，注意力容易卡住导致语音不清晰；(2) 用 GRU 替换 CBHG 编码器后对齐变得嘈杂，容易产生发音错误；(3) Tacotron 的 CBHG 编码器能学到干净平滑的注意力对齐。

##### 后处理网络效果

![无后处理网络的频谱图](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x6.png)
*图 4(a)：不使用后处理网络时预测的频谱图。*

![有后处理网络的频谱图](https://ar5iv.labs.arxiv.org/html/1703.10135/assets/x7.png)
*图 4(b)：使用后处理网络后预测的频谱图——谐波结构更清晰，高频共振峰更完整。*

后处理网络利用双向上下文信息，显著改善了预测频谱图中的谐波分辨率（100-400 bin 之间的高次谐波）和高频共振峰结构，从而减少了合成伪影。

##### 与传统方法的对比

| 特性 | 传统 TTS 流水线 | Tacotron |
|------|----------------|----------|
| 输入 | 语言学特征（音素、时长等） | 原始字符序列 |
| 模块 | 文本前端 + 时长模型 + 声学模型 + 声码器 | 单一端到端模型 |
| 训练 | 各模块独立训练，误差累积 | 端到端联合训练 |
| 特征工程 | 大量领域专家知识 | 无需手工特征 |
| 生成速度 | 取决于声码器 | 帧级生成，远快于样本级自回归方法 |
| MOS | 参数化系统 3.69 | **3.82** |

#### 🧪 练习题

```yaml
question: "Tacotron 中每个解码步预测多帧（reduction factor r）的主要好处是什么？"
options:
  - "减少模型参数量，降低显存占用"
  - "加速注意力对齐的学习，因为相邻帧高度相关无需逐帧关注同一输入"
  - "提升 Griffin-Lim 算法的重建质量"
  - "使模型能够处理更长的输入文本序列"
answer: 1
explain: "每步预测 r 帧将解码步数减少为 1/r，更重要的是允许注意力在训练早期快速前移，而非被迫在同一输入 token 上停留多步，从而大幅加速对齐学习的收敛。"
```