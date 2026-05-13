### Transformer (Attention Is All You Need)

```yaml
id: transformer
name: Transformer
full_name: "Transformer (Attention Is All You Need)"
year: "2017"
org: "Google Brain / Google Research"
paper_url: "https://arxiv.org/abs/1706.03762"
category: foundation
parent: "—"
motivation: "完全基于注意力机制的序列转换模型，摒弃了循环和卷积结构，实现高度并行化训练"
```

#### 📝 一句话总结

Transformer 提出了完全基于注意力机制（Self-Attention）的 Encoder-Decoder 架构，彻底摒弃循环和卷积结构，通过多头注意力机制和位置编码实现序列建模，在机器翻译任务上取得 SOTA 结果的同时大幅提升了训练并行性，成为现代大语言模型（GPT、BERT 等）的基础架构。

#### 🎯 核心要点

- **纯注意力架构**：完全抛弃 RNN/CNN，仅依赖注意力机制进行序列转换，解决了 RNN 无法并行训练的根本瓶颈
- **Scaled Dot-Product Attention**：通过 \(\frac{QK^T}{\sqrt{d_k}}\) 缩放点积防止梯度消失，是整个模型的基本计算单元
- **Multi-Head Attention**：将注意力拆分为 \(h=8\) 个并行头（\(d_k=d_v=64\)），让模型同时关注不同子空间的信息
- **三种注意力用法**：Encoder 自注意力、Decoder 掩码自注意力（防止看到未来信息）、Encoder-Decoder 交叉注意力
- **Position-wise FFN**：每个位置独立的两层全连接网络（\(d_{ff}=2048\)），提供非线性变换能力
- **正弦/余弦位置编码**：用不同频率的三角函数注入位置信息，使模型能泛化到训练中未见过的序列长度
- **残差连接 + Layer Normalization**：每个子层输出为 \(\text{LayerNorm}(x + \text{Sublayer}(x))\)，稳定深层网络训练
- **权重共享**：两个 Embedding 层和 pre-softmax 线性变换共享权重矩阵，减少参数量
- **训练效率**：在 WMT 2014 英德/英法翻译上达到 SOTA，训练成本仅为此前最优模型的一小部分（8 GPU 训练 3.5 天）

#### 🔬 深入细节

##### 模型总体架构

![Transformer 模型架构图](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-21.png)
*图 1：Transformer 模型架构。左侧为 Encoder（N=6 层），右侧为 Decoder（N=6 层）。每层包含多头注意力和前馈网络子层，均配有残差连接和层归一化。*

Transformer 采用经典的 **Encoder-Decoder** 结构，但完全用注意力机制替代了传统的循环/卷积操作：

- **Encoder**：由 \(N=6\) 个相同的层堆叠而成。每层包含两个子层：(1) Multi-Head Self-Attention；(2) Position-wise Feed-Forward Network。每个子层都使用残差连接和层归一化。
- **Decoder**：同样由 \(N=6\) 个相同的层堆叠。每层包含三个子层：(1) Masked Multi-Head Self-Attention（防止关注未来位置）；(2) Multi-Head Encoder-Decoder Attention（Query 来自 Decoder，Key/Value 来自 Encoder 输出）；(3) Position-wise Feed-Forward Network。

模型的所有子层以及 Embedding 层的输出维度均为 \(d_{\text{model}} = 512\)。

##### 核心机制：Scaled Dot-Product Attention

![Scaled Dot-Product Attention 与 Multi-Head Attention](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-19.png)
*图 2：（左）Scaled Dot-Product Attention；（右）Multi-Head Attention 由多个并行的注意力头组成。*

**动机与背景**：传统序列模型（RNN、LSTM）按时间步顺序处理输入，导致无法并行计算，且长距离依赖信息需要经过多步传递才能到达。注意力机制允许任意两个位置之间直接建立联系，将路径长度缩短为 \(O(1)\)。

**注意力计算公式**：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

其中 \(Q \in \mathbb{R}^{n \times d_k}\) 为查询矩阵，\(K \in \mathbb{R}^{m \times d_k}\) 为键矩阵，\(V \in \mathbb{R}^{m \times d_v}\) 为值矩阵。

> 💡 **关键直觉**：注意力机制本质上是一种"软寻址"——用 Query 去查询所有 Key 的相似度，得到权重后对 Value 做加权求和。缩放因子 \(\sqrt{d_k}\) 的作用是：当 \(d_k\) 较大时，点积的量级会增大，导致 softmax 进入梯度极小的饱和区，除以 \(\sqrt{d_k}\) 可以将方差控制在合理范围内。

> ⚠️ **注意**：Decoder 的自注意力中使用了 **Mask**（将未来位置设为 \(-\infty\)），确保位置 \(i\) 的预测只能依赖于位置 \(< i\) 的已知输出，保持自回归特性。

##### 核心机制：Multi-Head Attention

![Multi-Head Attention 结构](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-20.png)
*图 3：Multi-Head Attention 将输入分别线性投影到多个子空间，并行计算注意力后拼接。*

与其使用单一的 \(d_{\text{model}}\) 维注意力，Multi-Head Attention 将 Q、K、V 分别通过 \(h\) 组不同的线性投影映射到低维空间，并行计算注意力后拼接：

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h) W^O$$

$$\text{where } \text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$

参数维度：\(W_i^Q \in \mathbb{R}^{d_{\text{model}} \times d_k}\)，\(W_i^K \in \mathbb{R}^{d_{\text{model}} \times d_k}\)，\(W_i^V \in \mathbb{R}^{d_{\text{model}} \times d_v}\)，\(W^O \in \mathbb{R}^{hd_v \times d_{\text{model}}}\)。

论文使用 \(h=8\) 个头，\(d_k = d_v = d_{\text{model}}/h = 64\)。由于每个头的维度降低，总计算量与单头全维度注意力相当。

> 💡 **关键直觉**：不同的注意力头可以学习关注不同类型的关系——例如某些头关注局部语法结构，某些头关注长距离语义依赖。这比单一注意力函数的表达能力更强。

**三种注意力的使用方式**：

| 使用位置 | Query 来源 | Key/Value 来源 | 是否 Mask | 作用 |
|---------|-----------|---------------|----------|------|
| Encoder Self-Attention | Encoder 当前层输入 | Encoder 当前层输入 | 否 | 编码输入序列的全局上下文 |
| Decoder Masked Self-Attention | Decoder 当前层输入 | Decoder 当前层输入 | 是（遮蔽未来） | 自回归地编码已生成序列 |
| Encoder-Decoder Attention | Decoder 当前层 | Encoder 最终输出 | 否 | 让 Decoder 关注输入序列信息 |

##### Position-wise Feed-Forward Network

每个注意力子层之后都跟一个逐位置的前馈网络，对每个位置独立且相同地应用：

$$\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2$$

内层维度 \(d_{ff} = 2048\)，输入输出维度 \(d_{\text{model}} = 512\)。这等价于两个 kernel size 为 1 的卷积。不同层之间的 FFN 参数不共享。

> 💡 **关键直觉**：注意力层负责"信息聚合"（从不同位置收集信息），FFN 负责"信息变换"（对每个位置的表示进行非线性映射）。两者互补，缺一不可。

##### 位置编码（Positional Encoding）

由于 Transformer 没有循环或卷积结构，模型本身无法感知序列中 token 的顺序。因此需要在输入 Embedding 上加入位置编码：

$$PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

$$PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

其中 \(pos\) 是位置索引，\(i\) 是维度索引。

> 💡 **关键直觉**：选择正弦/余弦函数有两个优势：(1) 对于任意固定偏移 \(k\)，\(PE_{pos+k}\) 可以表示为 \(PE_{pos}\) 的线性函数，使模型能学习相对位置关系；(2) 不同频率的三角函数覆盖不同尺度的位置信息，类似于二进制编码的不同位。

##### 算法伪代码

```python
# Transformer 前向传播伪代码
def transformer_forward(src_tokens, tgt_tokens):
    # 1. Embedding + Positional Encoding
    src_embed = Embedding(src_tokens) * sqrt(d_model) + PositionalEncoding(src_tokens)
    tgt_embed = Embedding(tgt_tokens) * sqrt(d_model) + PositionalEncoding(tgt_tokens)
    
    # 2. Encoder: N=6 层
    enc_out = src_embed
    for layer in encoder_layers:  # 6 layers
        # Self-Attention + Residual + LayerNorm
        attn_out = MultiHeadAttention(Q=enc_out, K=enc_out, V=enc_out)
        enc_out = LayerNorm(enc_out + Dropout(attn_out))
        # FFN + Residual + LayerNorm
        ffn_out = FFN(enc_out)  # max(0, x·W1+b1)·W2+b2
        enc_out = LayerNorm(enc_out + Dropout(ffn_out))
    
    # 3. Decoder: N=6 层
    dec_out = tgt_embed
    for layer in decoder_layers:  # 6 layers
        # Masked Self-Attention (防止看到未来 token)
        masked_attn = MultiHeadAttention(Q=dec_out, K=dec_out, V=dec_out, mask=causal_mask)
        dec_out = LayerNorm(dec_out + Dropout(masked_attn))
        # Encoder-Decoder Attention
        cross_attn = MultiHeadAttention(Q=dec_out, K=enc_out, V=enc_out)
        dec_out = LayerNorm(dec_out + Dropout(cross_attn))
        # FFN
        ffn_out = FFN(dec_out)
        dec_out = LayerNorm(dec_out + Dropout(ffn_out))
    
    # 4. 输出层 (与 Embedding 共享权重)
    logits = dec_out @ Embedding.weight.T  # 共享权重
    return softmax(logits)
```

##### 训练细节与关键设计

**优化器**：使用 Adam 优化器（\(\beta_1=0.9, \beta_2=0.98, \epsilon=10^{-9}\)），配合 Warmup 学习率调度：

$$lr = d_{\text{model}}^{-0.5} \cdot \min(step^{-0.5},\ step \cdot warmup\_steps^{-1.5})$$

前 \(warmup\_steps = 4000\) 步线性增长学习率，之后按步数的平方根倒数衰减。

**正则化**：
- **Residual Dropout**：对每个子层的输出（加入残差之前）以及 Embedding + PE 的求和结果应用 Dropout（\(P_{drop}=0.1\)）
- **Label Smoothing**：使用 \(\epsilon_{ls}=0.1\) 的标签平滑，虽然会降低困惑度（perplexity），但提升了 BLEU 分数和准确率

**实验结果**：
- WMT 2014 英德翻译：**28.4 BLEU**（超越此前所有单模型和集成模型）
- WMT 2014 英法翻译：**41.0 BLEU**（单模型 SOTA，训练成本仅为此前最优的 1/4）
- 训练仅需 8 个 P100 GPU 训练 3.5 天（base 模型）或 12 天（big 模型）

##### 与传统方法的对比

| 特性 | RNN/LSTM | CNN (ConvS2S) | Transformer |
|------|----------|---------------|-------------|
| 序列操作复杂度 | \(O(n)\) 顺序 | \(O(n/k)\) 层数 | \(O(1)\) 常数 |
| 每层计算复杂度 | \(O(n \cdot d^2)\) | \(O(k \cdot n \cdot d^2)\) | \(O(n^2 \cdot d)\) |
| 最大路径长度 | \(O(n)\) | \(O(\log_k(n))\) | \(O(1)\) |
| 并行化能力 | 低（顺序依赖） | 中等 | **高（完全并行）** |

> 💡 **关键优势**：Self-Attention 的最大路径长度为 \(O(1)\)，意味着任意两个位置之间可以直接交互，极大地缓解了长距离依赖问题。代价是 \(O(n^2)\) 的计算复杂度，但对于常见的序列长度（几百到几千），这远优于 RNN 的顺序瓶颈。

#### 🧪 练习题

```yaml
question: "Transformer 中 Scaled Dot-Product Attention 除以 √dk 的主要原因是什么？"
options:
  - "减少模型参数量，提升计算效率"
  - "防止点积值过大导致 softmax 梯度消失"
  - "使注意力权重服从标准正态分布"
  - "确保 Query 和 Key 的维度匹配"
answer: 1
explain: "当 dk 较大时，点积的方差为 dk，值会很大，使 softmax 输出接近 one-hot，梯度趋近于零。除以 √dk 将方差归一化为 1，避免梯度消失问题。"
```