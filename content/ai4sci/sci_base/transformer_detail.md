### Transformer

```yaml
id: transformer
name: Transformer
full_name: Transformer (Transformer)
year: "2017"
org: Google
paper_url: https://arxiv.org/abs/1706.03762
category: neural_operator
parent: —
motivation: 自注意力机制奠定科学大模型基础
```

#### 📝 一句话总结

Transformer 提出了完全基于自注意力机制的 Encoder-Decoder 架构，彻底摒弃了循环和卷积结构，在机器翻译任务上取得了 SOTA 结果，同时大幅提升了训练并行性，成为后续所有大语言模型和科学基础模型的核心架构基石。

#### 🎯 核心要点

- **纯注意力架构**：首次证明仅靠注意力机制（无 RNN/CNN）即可在序列转录任务中达到最优性能
- **Scaled Dot-Product Attention**：通过 \(\sqrt{d_k}\) 缩放因子解决高维点积导致的梯度消失问题
- **Multi-Head Attention**：将注意力拆分为 \(h\) 个并行头，让模型同时关注不同子空间的信息
- **三种注意力用法**：Encoder 自注意力、Decoder 掩码自注意力、Encoder-Decoder 交叉注意力
- **位置编码**：使用正弦/余弦函数注入序列位置信息，替代 RNN 的隐式位置建模
- **残差连接 + 层归一化**：每个子层采用 \(\text{LayerNorm}(x + \text{Sublayer}(x))\) 稳定深层训练
- **Position-wise FFN**：两层全连接网络（含 ReLU）为每个位置独立提供非线性变换能力
- **WMT 2014 翻译 SOTA**：EN-DE 达到 28.4 BLEU，EN-FR 达到 41.0 BLEU，训练成本仅为此前最优模型的一小部分

#### 🔬 深入细节

##### 架构总览

![Transformer 模型架构](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-21.png)
*图：Transformer 模型架构。左侧为 Encoder，右侧为 Decoder。*

Transformer 采用经典的 Encoder-Decoder 结构，但内部完全由注意力层和前馈网络构成：

- **Encoder**：由 \(N=6\) 个相同层堆叠而成，每层包含两个子层——Multi-Head Self-Attention 和 Position-wise FFN，每个子层外包裹残差连接和层归一化。
- **Decoder**：同样 \(N=6\) 层，每层在 Encoder 的两个子层基础上增加了一个 Encoder-Decoder Cross-Attention 子层。Decoder 的自注意力层使用掩码（mask）防止位置 \(i\) 关注到未来位置 \(i+1, i+2, \ldots\)，确保自回归生成的合法性。

> 💡 **关键设计**：所有子层的输出维度统一为 \(d_{\text{model}} = 512\)，这使得残差连接可以直接相加，无需额外投影。

##### 核心机制：Scaled Dot-Product Attention

![注意力机制示意图](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-19.png)
*图：Scaled Dot-Product Attention 计算流程*

注意力函数将 Query、Key、Value 三组向量映射为输出：

$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

**为什么需要缩放？** 当 \(d_k\) 较大时，点积 \(QK^T\) 的方差为 \(d_k\)，导致 softmax 进入梯度极小的饱和区。除以 \(\sqrt{d_k}\) 将方差归一化为 1，保持梯度流通畅。这是论文相比加性注意力（Additive Attention）选择点积注意力的关键改进。

```python
# Scaled Dot-Product Attention 伪代码
def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.shape[-1]
    scores = Q @ K.transpose(-2, -1) / math.sqrt(d_k)  # (batch, seq_q, seq_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    attn_weights = softmax(scores, dim=-1)
    attn_weights = dropout(attn_weights)
    return attn_weights @ V  # (batch, seq_q, d_v)
```

##### Multi-Head Attention

![Multi-Head Attention](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/Figures/ModalNet-20.png)
*图：Multi-Head Attention 将 Q、K、V 分别线性投影到多个子空间后并行计算注意力*

单个注意力头只能学习一种关注模式。Multi-Head Attention 将 \(d_{\text{model}}\) 维的 Q、K、V 分别通过 \(h\) 组不同的线性投影映射到 \(d_k = d_v = d_{\text{model}}/h = 64\) 维子空间，并行计算注意力后拼接：

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O$$

$$\text{where } \text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$$

其中 \(W_i^Q \in \mathbb{R}^{d_{\text{model}} \times d_k}\)，\(W_i^K \in \mathbb{R}^{d_{\text{model}} \times d_k}\)，\(W_i^V \in \mathbb{R}^{d_{\text{model}} \times d_v}\)，\(W^O \in \mathbb{R}^{hd_v \times d_{\text{model}}}\)。

论文使用 \(h=8\) 个头，每个头的维度 \(d_k = d_v = 64\)，总计算量与单头全维度注意力相当，但表达能力更强。

> 💡 **直觉理解**：不同的注意力头可以分别学习语法依赖、语义相似性、位置关系等不同类型的关联模式，类似于 CNN 中多个卷积核捕捉不同特征。

```python
# Multi-Head Attention 伪代码
def multi_head_attention(Q, K, V, h=8):
    d_model = Q.shape[-1]
    d_k = d_model // h
    heads = []
    for i in range(h):
        Q_i = Q @ W_Q[i]  # (batch, seq, d_k)
        K_i = K @ W_K[i]
        V_i = V @ W_V[i]
        head_i = scaled_dot_product_attention(Q_i, K_i, V_i)
        heads.append(head_i)
    concat = torch.cat(heads, dim=-1)  # (batch, seq, d_model)
    return concat @ W_O
```

##### 三种注意力的应用场景

Transformer 中注意力机制被用于三个不同位置，Q、K、V 的来源各不相同：

| 位置 | Q 来源 | K、V 来源 | 作用 |
|------|--------|-----------|------|
| Encoder Self-Attention | Encoder 当前层输入 | Encoder 当前层输入 | 每个位置关注输入序列所有位置 |
| Decoder Masked Self-Attention | Decoder 当前层输入 | Decoder 当前层输入（带掩码） | 每个位置仅关注已生成的位置 |
| Encoder-Decoder Cross-Attention | Decoder 当前层输入 | Encoder 最终输出 | Decoder 关注输入序列信息 |

> ⚠️ **注意**：Decoder 自注意力中的掩码（mask）将未来位置的注意力权重设为 \(-\infty\)（softmax 后为 0），这是保证自回归生成因果性的关键。

##### Position-wise Feed-Forward Network

每个注意力子层之后紧跟一个两层全连接前馈网络，对每个位置独立且相同地应用：

$$\text{FFN}(x) = \max(0,\; xW_1 + b_1)\, W_2 + b_2$$

内层维度 \(d_{ff} = 2048\)，外层维度 \(d_{\text{model}} = 512\)。这等价于两个 kernel size 为 1 的卷积。FFN 为模型提供了逐位置的非线性变换能力，弥补了注意力层本身线性加权求和的不足。

##### 位置编码（Positional Encoding）

由于 Transformer 不含循环或卷积结构，无法隐式感知序列顺序。论文使用正弦/余弦函数生成位置编码，直接加到输入嵌入上：

$$PE_{(pos, 2i)} = \sin\!\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

$$PE_{(pos, 2i+1)} = \cos\!\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)$$

其中 \(pos\) 为位置索引，\(i\) 为维度索引。选择正弦函数的原因是：对于任意固定偏移 \(k\)，\(PE_{pos+k}\) 可以表示为 \(PE_{pos}\) 的线性函数，使模型能够轻松学习相对位置关系。实验表明，学习式位置编码与正弦编码效果几乎相同，但正弦编码可以外推到训练时未见过的更长序列。

##### 自注意力 vs RNN vs CNN 的复杂度对比

| 层类型 | 每层复杂度 | 顺序操作数 | 最大路径长度 |
|--------|-----------|-----------|-------------|
| Self-Attention | \(O(n^2 \cdot d)\) | \(O(1)\) | \(O(1)\) |
| Recurrent | \(O(n \cdot d^2)\) | \(O(n)\) | \(O(n)\) |
| Convolution | \(O(k \cdot n \cdot d^2)\) | \(O(1)\) | \(O(\log_k(n))\) |

> 💡 **关键优势**：自注意力的最大路径长度为 \(O(1)\)（任意两个位置直接连接），远优于 RNN 的 \(O(n)\)，这使得长距离依赖的学习更加容易。同时，自注意力的所有位置可并行计算（顺序操作 \(O(1)\)），而 RNN 必须逐步展开。当序列长度 \(n < d\) 时（实际中常见），自注意力的计算量也更小。

##### 训练配置

- **数据集**：WMT 2014 EN-DE（450 万句对）和 EN-FR（3600 万句对）
- **优化器**：Adam（\(\beta_1=0.9, \beta_2=0.98, \epsilon=10^{-9}\)）
- **学习率调度**：Warmup + 逆平方根衰减

$$lr = d_{\text{model}}^{-0.5} \cdot \min(step^{-0.5},\; step \cdot warmup\_steps^{-1.5})$$

前 4000 步线性预热，之后按步数的逆平方根衰减。

- **正则化**：Residual Dropout（\(P_{drop}=0.1\)）应用于每个子层输出和嵌入+位置编码之和；Label Smoothing（\(\epsilon_{ls}=0.1\)）牺牲困惑度但提升 BLEU 和准确率
- **硬件**：8 块 NVIDIA P100 GPU，base 模型训练 12 小时（10 万步），big 模型训练 3.5 天（30 万步）

#### 🧪 练习题

```yaml
question: "Transformer 中 Scaled Dot-Product Attention 除以 √d_k 的主要原因是什么？"
options:
  - "减少模型参数量，降低计算复杂度"
  - "防止点积值过大导致 softmax 梯度消失"
  - "使注意力权重之和严格等于 1"
  - "对齐 Query 和 Key 的维度"
answer: 1
explain: "当 d_k 较大时，点积的方差为 d_k，导致 softmax 输入值过大进入饱和区，梯度趋近于零。除以 √d_k 将方差归一化为 1，保持梯度有效流动。"
```