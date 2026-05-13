### MASTER — Multi-Aspect Non-local Network for Scene Text Recognition

```yaml
id: master
name: MASTER
full_name: "多视角非局部网络场景文字识别 (Multi-Aspect Non-local Network for Scene Text Recognition)"
year: 2021
org: Ping An Technology (Shenzhen)
paper_url: "https://arxiv.org/abs/1910.02562"
category: scene_text_recognition
parent: "—"
motivation: "多视角注意力解决漂移"
```

#### 📝 一句话总结

MASTER 提出了 **Multi-Aspect GCAttention (MAGC) 编码器 + Transformer 解码器** 的场景文字识别架构，通过多头全局上下文注意力机制缓解了传统 RNN 注意力模型中的 **注意力漂移 (attention drift)** 问题，同时利用 Transformer 的并行性大幅提升训练与推理效率。

#### 🎯 核心要点

- **问题定位**：传统 encoder-decoder 文字识别器（如 CRNN、SAR）中，RNN 编码的特征高度相似，导致注意力漂移（相邻字符被重复或跳过识别）
- **编码器创新 — MAGC 模块**：将 GCNet 的 Global Context Block 扩展为多头版本，在 CNN 特征图上捕获全局上下文依赖，替代 BiLSTM
- **解码器 — Transformer Decoder**：采用 \(N=3\) 层标准 Transformer 解码器，同时学习 self-attention（target-target）和 cross-attention（input-output），增强对空间畸变的鲁棒性
- **Memory-Cache 推理机制**：受 XLNet 启发，缓存解码过程中 Masked MHA 的 K/V 中间结果，避免重复计算，加速自回归推理
- **骨干网络 — ResNet31**：使用非对称池化（\(2 \times 1\) max-pooling）保留水平方向信息，输入 \(48 \times 160\) 输出 \(6 \times 40 \times 512\)
- **训练仅用合成数据**：Synth90K (9M) + SynthText (7M) + SynthAdd (1.6M)，无需真实数据微调即在 8 个标准基准上取得 SOTA

#### 🔬 深入细节

##### 整体架构

![MASTER 模型架构图](https://ar5iv.labs.arxiv.org/html/1910.02562/assets/x2.png)
*图：MASTER 整体架构。左侧为 Multi-Aspect GCAttention 编码器（ResNet31 + MAGC），右侧为 Transformer 解码器（Masked MHA + Cross MHA + FFN）。*

MASTER 由两个核心模块组成：

1. **Multi-Aspect GCAttention (MAGC) 编码器**：基于 ResNet31 的 CNN 骨干网络，在每个残差阶段后插入 MAGC 模块，用全局上下文注意力增强特征表示
2. **Transformer 解码器**：标准的自回归 Transformer 解码器，将编码器输出的 2D 特征图展平为序列后进行 cross-attention 解码

##### 注意力漂移问题

![注意力漂移示意图](https://ar5iv.labs.arxiv.org/html/1910.02562/assets/x1.png)
*图：注意力漂移现象。由于 RNN 编码的相邻位置特征高度相似，注意力权重容易在相邻字符间漂移，导致重复识别（如 "TIMMMS"）或漏字（如 "FOOTBAL"）。*

传统方法（如 SAR）使用 BiLSTM 编码 CNN 特征后再用 attention 解码，但 BiLSTM 输出的相邻位置特征差异很小，使得 attention 机制难以精确区分相邻字符位置。MASTER 通过两方面解决此问题：

1. **编码端**：MAGC 模块引入全局上下文信息，使每个位置的特征不仅包含局部信息，还融合了全图的语义，从而增大相邻位置特征的区分度
2. **解码端**：Transformer 的 self-attention 直接建模已解码字符之间的依赖关系（target-target relationship），而非像 RNN 那样仅依赖隐状态传递

##### Multi-Aspect GCAttention (MAGC) 模块

MAGC 是对 GCNet 中 Global Context (GC) Block 的多头扩展。单个 GC Block 的计算过程为：

$$\text{gc}(x) = \sum_{j=1}^{N_p} \alpha_j \cdot x_j, \quad \alpha_j = \frac{e^{W_k x_j}}{\sum_{m=1}^{N_p} e^{W_k x_m}}$$

其中 \(N_p = H \times W\) 为特征图的空间位置数。GC Block 通过全局注意力池化将整个特征图压缩为一个全局上下文向量，再经过瓶颈变换（bottleneck transform）广播回每个位置：

$$y = x + \delta(\text{GC}(x))$$

$$\delta(\cdot) = W_{v2} \cdot \text{ReLU}(\text{LN}(W_{v1} \cdot (\cdot)))$$

> 💡 **关键创新**：MAGC 将单一注意力头扩展为 \(h\) 个头，每个头在 \(d_h = d_{\text{model}} / h\) 维子空间中独立计算全局上下文，最后拼接：

$$\text{MAGC}(x) = \text{Concat}(\text{gc}_1, \text{gc}_2, \ldots, \text{gc}_h)$$

每个头使用缩放因子 \(\sqrt{d_h}\) 防止点积过大：

$$\alpha_j^{(i)} = \frac{\exp(W_k^{(i)} x_j / \sqrt{d_h})}{\sum_{m} \exp(W_k^{(i)} x_m / \sqrt{d_h})}$$

多头机制使模型能从**多个语义视角 (multi-aspect)** 捕获全局上下文，不同头关注不同的语义模式。实验表明 \(h=8\) 为最优设置。

##### 编码器网络结构

编码器基于 ResNet31，包含 4 个基本阶段（conv2_x 到 conv5_x），每个阶段的结构为：

```
残差块 (Residual Block) → MAGC 模块 → 卷积块 (Conv Block) → 最大池化 (Max Pooling)
```

关键设计：
- **非对称池化**：前两个阶段使用 \(2 \times 2\) 池化，后两个阶段使用 \(2 \times 1\) 池化（仅在垂直方向下采样），保留水平方向的空间分辨率，这对于文字识别中区分窄字符至关重要
- **输入输出**：灰度图像 \(48 \times 160 \times 1\) → 特征图 \(6 \times 40 \times 512\)，展平后得到 240 个 512 维特征向量

##### Transformer 解码器

解码器包含 \(N=3\) 个相同的 Transformer 解码块，每块包含三个子模块：

1. **Masked Multi-Head Attention (Masked MHA)**：对已解码的目标序列做自注意力，使用下三角掩码防止信息泄露
2. **Multi-Head Attention (Cross MHA)**：Query 来自上一层输出，Key/Value 来自编码器输出，实现 input-output attention
3. **Feed-Forward Network (FFN)**：两层全连接 + ReLU 激活

多头注意力的计算：

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O$$

$$\text{head}_i = \text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)$$

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

> ⚠️ **注意**：编码器输出的 K/V 在所有解码步骤中保持不变，因此可以预计算并缓存。

##### Memory-Cache 推理机制

```python
# Memory-Cache 推理伪代码
# 预计算编码器输出的 K/V 投影（每个 decoder block b）
for b in range(B):
    X_k[b] = W_k[b] * encoder_output  # 缓存，不再重复计算
    X_v[b] = W_v[b] * encoder_output

keys_memory = [[] for _ in range(B)]    # 缓存 Masked MHA 的 Key
values_memory = [[] for _ in range(B)]  # 缓存 Masked MHA 的 Value

t = 0
q = embedding(SOS) + positional_encoding(0)

while q != EOS and t < T:
    for b in range(B):
        # 缓存当前步的 K/V 投影（仅 1 个向量，非整个序列）
        keys_memory[b].append(M_k[b] * q)
        values_memory[b].append(M_v[b] * q)
        # Masked MHA：用缓存的历史 K/V，无需重新计算前 t-1 步
        q = MaskedMHA(M_q[b] * q, keys_memory[b], values_memory[b])
        # Cross MHA：使用预计算的编码器 K/V
        q = CrossMHA(W_q[b] * q, X_k[b], X_v[b])
        q = FeedForward(q)
    p_t = argmax(softmax(linear(q)))
    t += 1
```

> 💡 **关键优化**：传统 Transformer 推理中，每个解码步需要将所有已解码 token 重新输入 Masked MHA 计算，复杂度为 \(O(t^2)\)。Memory-Cache 机制将前序步骤的 K/V 缓存起来，每步仅需处理当前 1 个 token 的 query，复杂度降为 \(O(t)\)。

##### 训练与推理细节

| 配置项 | 值 |
|--------|-----|
| 训练数据 | Synth90K (9M) + SynthText (7M) + SynthAdd (1.6M) |
| 输入尺寸 | \(48 \times 160 \times 1\)（灰度） |
| 优化器 | Adam, lr = \(4 \times 10^{-4}\) |
| Batch Size | \(128 \times 4\) (4 GPU) |
| 训练轮数 | 12 epochs, 每轮约 3 小时 |
| 符号类别 | 66 类（10 数字 + 52 大小写字母 + SOS/EOS/PAD/UNK） |
| 解码最大长度 | T（论文未明确，通常为 25） |
| 硬件 | 4 × NVIDIA Tesla V100 (16GB) |
| 推理技巧 | 对高>宽的图像做 ±90° 旋转，取最大概率输出；不使用 beam search 和 lexicon |

##### 实验结果

在 7 个标准基准上的识别准确率（%），无 lexicon：

| 方法 | IIIT5K | SVT | IC03 | IC13 | IC15 | SVTP | CUTE |
|------|--------|-----|------|------|------|------|------|
| CRNN | 78.2 | 80.8 | 89.4 | 86.7 | — | — | — |
| ASTER | 93.4 | 89.5 | 94.5 | 91.8 | 76.1 | 78.5 | 79.5 |
| SAR | 91.5 | 84.5 | — | 91.0 | 69.2 | 76.4 | 83.3 |
| NRTR | 86.5 | 88.3 | 95.4 | 94.7 | — | — | — |
| MORAN | 91.2 | 88.3 | 95.0 | 92.4 | 68.8 | 76.1 | 77.4 |
| **MASTER** | **95.0** | **90.6** | **96.4** | **95.3** | **79.4** | **84.5** | **87.5** |

> 💡 **关键发现**：MASTER 在不规则文本数据集（IC15、SVTP、CUTE）上提升尤为显著，相比 SAR 在 IIIT5K 上提升 3.5%，SVT 上提升 6.1%，验证了多视角注意力机制对空间畸变的鲁棒性。

##### 消融实验

**MAGC 头数 \(h\) 的影响**（固定 \(N=3\)）：

| \(h\) | IIIT5K | SVTP | CUTE | IC15 |
|-------|--------|------|------|------|
| 0（无 MAGC） | 94.6 | 82.3 | 86.2 | 78.4 |
| 1 | 94.9 | 83.8 | 87.6 | 79.4 |
| 8（标准） | **95.0** | **84.5** | **87.5** | **79.4** |
| 16 | 95.1 | 84.1 | 85.4 | 79.4 |

**解码器层数 \(N\) 的影响**（固定 \(h=8\)）：

| \(N\) | IIIT5K | SVTP | CUTE |
|-------|--------|------|------|
| 1 | 94.3 | 83.1 | 85.4 |
| 3（标准） | **95.0** | **84.5** | **87.5** |
| 6 | 91.3 | 75.7 | 76.7 |

> ⚠️ **注意**：\(N=6\) 时性能急剧下降，说明过深的解码器在合成数据训练下容易过拟合。\(h=0\) 到 \(h \geq 1\) 的提升在不规则文本数据集上最为明显，证实 MAGC 对处理弯曲/畸变文本的有效性。

#### 🧪 练习题

```yaml
question: "MASTER 中 Multi-Aspect GCAttention (MAGC) 模块相比原始 GCNet 的 GC Block，核心改进是什么？"
options:
  - "将全局平均池化替换为全局最大池化"
  - "引入多头机制，从多个语义子空间捕获全局上下文"
  - "增加了残差连接和 Layer Normalization"
  - "将 softmax 注意力替换为 sigmoid 门控机制"
answer: 1
explain: "MAGC 将 GC Block 的单一全局注意力扩展为 h 个头，每个头在 d_model/h 维子空间中独立计算全局上下文后拼接，从而从多个语义视角（multi-aspect）增强特征表示。"
```