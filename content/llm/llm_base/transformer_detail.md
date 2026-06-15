### Transformer (Attention Is All You Need)

#### 📝 一句话总结

Transformer 提出了第一个完全基于自注意力机制的序列转换架构，用多头自注意力（Multi-Head Self-Attention）替代循环和卷积，在 WMT 2014 英德/英法翻译任务上以更少训练时间达到 SOTA，奠定了后续 GPT、BERT 等所有大语言模型的基石。

#### 🎯 核心要点

- 提出 **Multi-Head Scaled Dot-Product Attention**：通过 Query、Key、Value 三组线性投影并行计算多子空间注意力，捕获不同表征子空间中的依赖关系
- 设计 **Encoder-Decoder 堆叠架构**：Encoder 和 Decoder 各由 N=6 个相同层堆叠，每层含自注意力子层和逐位置前馈网络（FFN），均包裹残差连接 + LayerNorm
- **Decoder 引入因果掩码（Masked Self-Attention）**：在自注意力中屏蔽未来位置，确保自回归生成的因果关系
- **Encoder-Decoder Attention**：Decoder 中额外插入交叉注意力子层，Query 来自 Decoder，Key/Value 来自 Encoder 输出
- **位置编码（Positional Encoding）**：用固定正弦/余弦函数注入序列位置信息，使无递归的注意力模型能感知 token 顺序
- **Scaling Factor** \(\frac{1}{\sqrt{d_k}}\)：缩放点积防止维度增大导致的 softmax 梯度消失
- 英德翻译：28.4 BLEU（超过集成模型 >2 BLEU），英法翻译：41.0 BLEU（8 张 P100 训练 3.5 天）
- 完全并行化训练：相比 RNN 按时间步串行，自注意力允许同时计算序列所有位置的表示，大幅缩短训练时间
- 泛化能力验证：在英语成分句法解析任务上也取得优异结果，证明架构通用性

#### 🔬 深入细节

##### 核心示意图

![Transformer 架构图](https://ar5iv.labs.arxiv.org/html/1706.03762/assets/figures/fig-1.png)

*图 1：Transformer 整体架构。左侧为 Encoder（N=6 层堆叠），右侧为 Decoder（N=6 层堆叠）。Encoder 每层含 Multi-Head Self-Attention + FFN，Decoder 额外插入一个 Encoder-Decoder Attention。*

##### 算法伪代码

```python
# Scaled Dot-Product Attention
def ScaledDotProductAttention(Q, K, V, mask=None):
    # Q, K, V: [batch, heads, seq_len, d_k]
    scores = Q @ K.transpose(-2, -1) / sqrt(d_k)   # 缩放点积
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)  # 因果/填充掩码
    attn_weights = softmax(scores)                    # [batch, heads, L, L]
    return attn_weights @ V                           # 加权求和

# Multi-Head Attention
def MultiHeadAttention(Q, K, V, d_model=512, h=8):
    # 1. 线性投影到多子空间
    Q_proj = [Q @ W_q_i for W_q_i in W_q]   # 每个 head 对应 d_k = d_model / h
    K_proj = [K @ W_k_i for W_k_i in W_k]
    V_proj = [V @ W_v_i for W_v_i in W_v]
    # 2. 并行关注意力
    heads = [ScaledDotProductAttention(Q_i, K_i, V_i) for Q_i, K_i, V_i
             in zip(Q_proj, K_proj, V_proj)]
    # 3. 拼接并投影
    concat = concat(heads)               # [batch, seq_len, d_model]
    return concat @ W_o                  # 最终输出投影

# Encoder Layer
def EncoderLayer(x):
    # Sublayer 1: Multi-Head Self-Attention
    attn_out = MultiHeadAttention(x, x, x)
    x = LayerNorm(x + attn_out)          # 残差 + LN
    # Sublayer 2: Position-wise FFN
    ff_out = FFN(x)                      # ReLU(w1*x+b1)w2+b2, d_ff=2048
    return LayerNorm(x + ff_out)         # 残差 + LN

# Decoder Layer
def DecoderLayer(x, enc_output):
    # Sublayer 1: Masked Multi-Head Self-Attention（因果掩码）
    x = LayerNorm(x + MultiHeadAttention(x, x, x, causal_mask=True))
    # Sublayer 2: Encoder-Decoder Attention
    cross = MultiHeadAttention(Q=x, K=enc_output, V=enc_output)
    x = LayerNorm(x + cross)
    # Sublayer 3: FFN
    return LayerNorm(x + FFN(x))

# 训练：Teacher Forcing + Cross-Entropy Loss
# 推理：自回归生成，每次预测下一个 token，拼接后继续解码
```

##### 动机与背景：为什么需要 Transformer？

2017 年之前，序列转换任务（机器翻译、文本生成等）主要由 RNN 及其变体（LSTM、GRU）主导。这些模型的核心缺陷在于**顺序计算**：生成位置 t 必须等待位置 t−1 完成，无法并行化。虽然卷积网络（ConvS2S、ByteNet）缓解了串行问题，但它们在建模长距离依赖时，需要堆叠多层来扩大感受野，路径长度仍随距离线性增长（O(n)）。

注意力机制此前已在 Seq2Seq 中作为 RNN 的补充出现（Bahdanau Attention, 2014），用于动态对齐 Encoder 和 Decoder 的隐藏状态。Transformer 的核心洞察是：**注意力本身可以是唯一的依赖建模工具**——只要添加位置编码来注入顺序信息，就可以完全舍弃递归。

> 💡 关键动机：用常数级操作路径 O(1) 替代 RNN 的 O(n) 长程依赖路径，同时实现训练时的完全并行化。

##### 核心机制：逐块拆解

**1. Scaled Dot-Product Attention（缩放点积注意力）**

给定 Query 矩阵 Q、Key 矩阵 K 和 Value 矩阵 V（维度均为 d_model），注意力函数通过三步计算：

$$ \text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V $$

- **点积** \(QK^T\)：计算 Query 和所有 Key 的相似度得分矩阵 [seq_len, seq_len]
- **缩放因子** \(\frac{1}{\sqrt{d_k}}\)：当 d_k 较大时，点积值方差会增大，导致 softmax 进入饱和区（梯度极小）。除以 \(\sqrt{d_k}\) 使方差稳定在 1
- **Softmax**：将得分归一化为概率分布，每个位置获得对所有位置（含自身）的注意力权重
- **加权求和**：用注意力权重对 V 加权，输出每个位置的上下文表示

> ⚠️ 注意：加性注意力（Bahdanau）和点积注意力理论复杂度相似，但点积可高度利用矩阵乘法的硬件优化，实际更快且空间效率更高。

**2. Multi-Head Attention（多头注意力）**

单一注意力只能捕获一种"联想模式"。Transformer 将 Q/K/V 通过 h=8 组不同的线性投影映射到 d_k=d_v=64 维子空间：

$$ \text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O $$

$$ \text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V) $$

- 8 个 head 各关注不同模式：论文附录可视化显示，部分 head 专注相邻位置（局部语法），部分 head 关注远距离指代关系（如"its" 关注所指名词）
- 各 head 计算完全独立，可以并行执行
- 拼接后经 \(W^O \in \mathbb{R}^{d_{model} \times d_{model}}\) 投影回原维

**3. Position-wise Feed-Forward Network（逐位置前馈网络）**

每个位置独立应用相同的两层全连接：

$$ \text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2 $$

- 内层维度 d_ff = 2048（扩大4倍），外层降回 d_model = 512
- "逐位置"意味着不同位置共享参数但独立计算——类似1×1卷积
- 为模型引入非线性变换能力，注意力模块仅做线性加权

**4. Positional Encoding（位置编码）**

由于注意力没有内置的顺序概念，Transformer 在 Encoder/Decoder 底层的 input embedding 上直接叠加位置向量：

$$ PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right) $$

$$ PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right) $$

- 偶数维用 sin，奇数维用 cos，不同频率对应不同波长（2π ~ 20000π）
- 选择正弦函数是因为模型可以学习相对位置：对于任意固定偏移 k，\(PE_{pos+k}\) 可以表示为 \(PE_{pos}\) 的线性函数
- 实验证明学习的位置嵌入效果相同，但正弦版本可外推到训练时未见过的序列长度

**5. 残差连接 + Layer Normalization**

每个子层输出都经过：

$$ \text{output} = \text{LayerNorm}(x + \text{Sublayer}(x)) $$

- 残差连接确保深层网络的梯度流畅通，缓解退化问题
- LayerNorm 在特征维归一化，与 BatchNorm（batch 维）相比不依赖 batch size，适合序列长度变化场景
- 注意：论文中使用 Post-LN（先子层再LN加残差），后续研究（Pre-LN）将 LN 移至子层前更稳定，但原理一致

##### 训练与推理流程

**训练阶段（Teacher Forcing）**：
1. 源语言句子经 Input Embedding + Positional Encoding 送入 Encoder，6 层堆叠处理得到上下文表示 z
2. 目标语言句子（含起始符 <SOS>）经同理编码送入 Decoder
3. Decoder 的 Masked Self-Attention 确保位置 i 只能看到位置 < i 的内容（因果掩码矩阵上三角为 −∞）
4. Decoder Cross-Attention 从 Encoder 输出 z 中提取源语言信息
5. 最后一层输出经线性投影 + softmax 预测下一个 token 概率，与真实标签计算交叉熵损失

**关键训练超参数**：
- 优化器：Adam，\(\beta_1=0.9, \beta_2=0.98, \epsilon=10^{-9}\)
- 学习率调度：warmup_steps 内线性增加，之后按 step 的平方根倒数衰减：\(lr = d_{model}^{-0.5} \cdot \min(step^{-0.5}, step \cdot warmup\_steps^{-1.5})\)
- 正则化：Dropout（rate=0.1）应用于每个子层输出、embeddings 和位置编码；Label Smoothing（\(\epsilon_{ls}=0.1\)）降低过拟合

**推理阶段（自回归解码）**：
1. Encoder 处理源语言序列（一次计算，结果可缓存）
2. Decoder 逐步生成：起始符送入后预测第一个 token，将该 token 拼接到序列末尾再次解码，直到生成结束符 <EOS> 或达到最大长度
3. 使用 Beam Search（beam size=4，\(\alpha=0.6\) 长度惩罚）提升解码质量

##### 与传统方法的对比

| 维度 | RNN (LSTM/GRU) | 卷积 (ConvS2S) | **Transformer** |
|------|----------------|----------------|-----------------|
| 长程依赖路径 | O(seq_len) | O(log_k(seq_len)) | **O(1)** (单层内任意位置直接交互) |
| 训练并行度 | 串行，无法并行 | 可并行 | **完全并行** |
| 每层计算复杂度 | O(n·d²) | O(k·n·d²) | O(n²·d)（自注意力）；可优化 |
| 位置信息 | 隐式（通过时间步） | 隐式（通过卷积层序） | **显式正弦编码** |
| 解释性 | 弱 | 弱 | **强（注意力权重可视化）** |

> 💡 关键洞察：Transformer 将最大路径长度从 O(n) 降为 O(1)，这是其在极长序列上仍能有效建模依赖的根本原因。代价是自注意力的 O(n²) 内存需求，后续的稀疏注意力、线性注意力等变体均围绕解决此外展开。

##### 重要变体与后续影响

- **BERT**（2018）：只用 Transformer Encoder，双向自注意力 + 掩码语言模型预训练
- **GPT**（2018）：只用 Transformer Decoder，单向因果注意力 + 自回归预训练
- **Vision Transformer (ViT)**：将图像切块视为序列，Transformer 成功跨界计算机视觉
- **Transformer-XL**：引入段循环机制和相对位置编码，突破固定长度上下文限制

#### 🧪 练习题

```yaml
question: "Transformer 中 Scaled Dot-Product Attention 除以 \\(\\sqrt{d_k}\\) 的原因是什么？"
options:
  - "增加模型非线性表达能力"
  - "防止点积值过大导致 softmax 梯度消失"
  - "减少注意力矩阵的存储开销"
  - "使 Query 和 Key 向量正交化"
answer: 1
explain: "当 d_k 较大时，QK^T 的点积值方差约为 d_k，导致 softmax 输出趋近 one-hot（饱和区梯度接近零）。除以 √d_k 使方差稳定在 1，保持梯度合理流动。"
```
