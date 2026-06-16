### Transformer - Transformer 架构 (Attention Is All You Need)

```yaml
id: transformer
name: Transformer
full_name: Transformer 架构 (Attention Is All You Need)
year: '2017.06'
org: Google Brain / Google Research
paper_url: https://arxiv.org/abs/1706.03762
category: architecture
parent: —
motivation: 自注意力替代循环卷积
```

#### 📝 一句话总结

Transformer 提出完全基于注意力机制的 encoder-decoder 序列转换架构，用多头自注意力和位置编码替代循环、卷积结构，解决了 RNN 训练串行、长程依赖路径长的问题。它在 WMT 2014 机器翻译上以更低训练成本达到当时领先结果，并成为后续 GPT、BERT 等大模型的基础架构。

#### 🎯 核心要点

- 提出只依赖 attention 的序列转换模型，不使用 RNN 或 CNN 来传递序列状态。
- 采用 encoder-decoder 堆叠结构：原论文 base 模型中 encoder 和 decoder 各堆叠 6 层。
- 每个 encoder 层包含 multi-head self-attention 与 position-wise FFN，并配合 residual connection 与 layer normalization。
- 每个 decoder 层额外加入 encoder-decoder attention，并用 masked self-attention 阻止当前位置访问未来 token。
- 定义 scaled dot-product attention：用 \(QK^\top / \sqrt{d_k}\) 控制点积幅度，避免 softmax 进入梯度很小的饱和区。
- 使用 multi-head attention：把 Q/K/V 投影到多个子空间并行计算，使模型能同时捕获局部、长程、句法或对齐关系。
- 用正弦/余弦位置编码补充 token 顺序信息，使无递归模型仍能感知绝对与相对位置。
- 训练上使用 Adam、warmup + inverse square-root 学习率调度、dropout、label smoothing 和 beam search 解码。
- 复杂度权衡明确：训练并行度远高于 RNN，任意两个位置的依赖路径为 \(O(1)\)，代价是全局自注意力的 \(O(n^2)\) 序列长度开销。

#### 🔬 深入细节

![Transformer 架构图](https://arxiv.org/html/1706.03762v7/Figures/ModalNet-21.png)
*图：Transformer 的 encoder-decoder 总体结构。左侧 encoder 由自注意力和前馈网络堆叠，右侧 decoder 在 masked self-attention 之后通过 cross-attention 读取 encoder 输出。*

```python
def scaled_dot_product_attention(Q, K, V, mask=None):
    scores = (Q @ K.T) / sqrt(d_k)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -float("inf"))
    weights = softmax(scores, dim=-1)
    return weights @ V

def multi_head_attention(x_q, x_k, x_v, heads, mask=None):
    head_outputs = []
    for h in range(heads):
        Q = x_q @ W_q[h]
        K = x_k @ W_k[h]
        V = x_v @ W_v[h]
        head_outputs.append(scaled_dot_product_attention(Q, K, V, mask=mask))
    return concat(head_outputs) @ W_o

def encoder_layer(x):
    x = layer_norm(x + multi_head_attention(x, x, x, heads=8))
    x = layer_norm(x + feed_forward(x))  # max(0, xW1+b1)W2+b2
    return x

def decoder_layer(y, encoder_output):
    y = layer_norm(y + multi_head_attention(y, y, y, heads=8, mask=causal_mask))
    y = layer_norm(y + multi_head_attention(y, encoder_output, encoder_output, heads=8))
    y = layer_norm(y + feed_forward(y))
    return y

def transformer(source_tokens, target_prefix):
    src = token_embedding(source_tokens) + sinusoidal_position_encoding(source_tokens)
    memory = repeat(encoder_layer, times=6)(src)
    tgt = token_embedding(target_prefix) + sinusoidal_position_encoding(target_prefix)
    decoded = repeat(decoder_layer, times=6)(tgt, memory)
    return softmax(decoded @ W_vocab)
```

Transformer 的出发点是计算图路径和并行性。RNN 必须按时间步递推，训练样本内部很难并行，而且两个相距 \(n\) 的 token 之间要经过 \(O(n)\) 次状态变换；卷积模型能并行，但要靠多层堆叠或扩张卷积扩大感受野。Transformer 让序列内任意两个位置在一个 self-attention 层中直接交互，把长程依赖路径缩到常数级，同时可以用矩阵乘法一次性处理整段序列。

Scaled dot-product attention 的公式是：

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

其中 \(Q\) 表示“当前位置要找什么”，\(K\) 表示“每个位置提供什么索引”，\(V\) 表示“被取出的内容”。如果不除以 \(\sqrt{d_k}\)，高维向量点积的方差会随 \(d_k\) 增大，softmax 容易接近 one-hot，导致梯度变小。缩放项的作用不是改变注意力语义，而是让注意力分数处在更稳定的数值区间。

Multi-head attention 的设计解决了单头注意力“平均掉不同关系”的问题：

$$
\mathrm{MultiHead}(Q,K,V)=\mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_h)W^O
$$

$$
\mathrm{head}_i=\mathrm{Attention}(QW_i^Q,KW_i^K,VW_i^V)
$$

原论文 base 设置使用 \(h=8\)、\(d_{model}=512\)、每头 \(d_k=d_v=64\)。每个头在独立投影空间里学习一种对齐模式，例如相邻词依赖、远距离指代、源-目标词对齐等。由于每头维度降低，多头总计算量接近单个全维注意力，但表达能力更强。

Encoder 和 decoder 的职责不同。Encoder 的 self-attention 可以看到源序列所有位置，输出一组上下文表示；decoder 的第一层 attention 必须使用 causal mask，将未来位置对应的 logits 置为 \(-\infty\)，保证自回归生成时第 \(t\) 个 token 只能依赖 \(<t\) 的前缀；decoder 的第二个 attention 是 cross-attention，query 来自 decoder 当前状态，key/value 来自 encoder 输出，相当于在每个生成步动态读取源句信息。

因为 attention 本身没有顺序概念，Transformer 在输入 embedding 上加位置编码。论文采用固定正弦/余弦形式：

$$
PE_{(pos,2i)}=\sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

$$
PE_{(pos,2i+1)}=\cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

不同维度对应不同频率，模型可以组合这些信号来判断绝对位置；同时，由于三角函数的线性关系，固定偏移 \(k\) 的位置编码可由当前位置编码线性表示，这给学习相对位置提供了有用归纳偏置。论文也测试了可学习位置 embedding，效果接近，但固定正弦编码更自然地支持长度外推。

训练流程仍是标准 teacher forcing。源句经过 encoder 一次计算得到 memory；目标句右移后输入 decoder，模型在每个位置预测下一个 token，并用交叉熵训练。优化器使用 Adam，\(\beta_1=0.9\)、\(\beta_2=0.98\)、\(\epsilon=10^{-9}\)，学习率先 warmup 后按步数平方根倒数衰减；dropout 和 label smoothing 分别改善泛化和过度自信。推理时 encoder 输出可缓存，decoder 逐 token 自回归生成，原论文使用 beam search 和长度惩罚。

与 RNN/CNN 的关键区别不只是模块替换，而是信息流拓扑改变。RNN 将序列压进一个逐步更新的隐藏状态，优势是天然顺序建模，劣势是串行；CNN 通过局部核和层数扩大上下文，优势是并行，劣势是长距离路径仍依赖深度；Transformer 让每一层的每个位置都能全局读取其它位置，所以更适合大规模并行训练。后续长上下文工作，如 Transformer-XL、稀疏注意力、线性注意力，主要是在保留这种全局交互思想的同时降低 \(O(n^2)\) 成本或扩展上下文长度。

> 💡 关键：Transformer 的真正突破是把序列建模的“时间递推”改成“内容寻址”，用 attention 权重决定信息从哪些 token 流向当前 token。

#### 🧪 练习题

```yaml
question: "Transformer 中 scaled dot-product attention 除以 \\(\\sqrt{d_k}\\) 的主要原因是什么？"
options:
  - "让每个注意力头拥有不同参数量"
  - "降低点积分数方差，避免 softmax 饱和导致梯度过小"
  - "把绝对位置编码转成相对位置编码"
  - "减少 decoder 的自回归生成步数"
answer: 1
explain: "当 \\(d_k\\) 增大时，未缩放点积容易取值过大，使 softmax 接近饱和。除以 \\(\\sqrt{d_k}\\) 能稳定分数尺度。"
```
