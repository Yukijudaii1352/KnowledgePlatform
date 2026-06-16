### Transformer-XL：超长上下文 Transformer (Transformer-XL)
```yaml
id: transformer_xl
name: Transformer-XL
full_name: 超长上下文 Transformer (Transformer-XL)
year: "2019.01"
org: CMU / Google Brain
paper_url: https://arxiv.org/abs/1901.02860
category: long_context
parent: transformer
motivation: 分段递归缓解上下文截断
```

#### 📝 一句话总结
Transformer-XL 在标准 Transformer 语言模型中加入分段级递归和相对位置编码，使当前片段能复用前一片段的隐藏状态，从而突破固定上下文长度并缓解上下文碎片化。它解决了 vanilla Transformer 训练时片段之间无信息流、推理时重复计算严重的问题，是长上下文 Transformer 的早期关键架构。

#### 🎯 核心要点
- 提出 segment-level recurrence：把上一片段各层隐藏状态缓存为 memory，作为当前片段 attention 的额外 key/value 上下文。
- 使用 stop-gradient 连接相邻片段，使训练类似截断 BPTT：前向可复用历史，反向梯度仍限制在当前片段，控制显存和计算成本。
- 解决 context fragmentation：当前片段开头 token 不再只能依赖片段内很短前缀，而能看到前一片段的语义上下文。
- 指出绝对位置编码与状态复用冲突：缓存状态在新片段中被复用时，绝对位置编号会混淆，因此必须改用相对位置编码。
- 提出新的 relative positional encoding 打分分解，包括 content-based addressing、content-dependent positional bias、global content bias、global positional bias 四项。
- 推理时复用历史 hidden states，避免每预测一个 token 都从头处理完整窗口，论文报告在 enwiki8 上相对 vanilla Transformer 可达到 1,800+ 倍评估加速。
- 在 WikiText-103、enwiki8、text8、One Billion Word、Penn Treebank 等语言建模基准上刷新当时困惑度或 bpc 结果，并展示千 token 级连贯生成能力。

#### 🔬 深入细节
![Transformer-XL 分段递归机制](https://ar5iv.labs.arxiv.org/html/1901.02860/assets/x3.png)
*图：Transformer-XL 的训练阶段分段递归。上一段的隐藏状态被固定并缓存，作为当前段的扩展上下文；绿色路径表示当前 token 可以直接注意到历史片段中的 hidden states。*

```python
# Transformer-XL segment-level recurrence, simplified

memory = init_empty_memory(num_layers)

for segment in stream_as_segments(tokens, length=L):
    h = [None] * (num_layers + 1)
    h[0] = token_embedding(segment)

    for layer in range(1, num_layers + 1):
        # Reuse previous segment states as fixed memory.
        mem = stop_gradient(memory[layer - 1])
        extended_context = concat(mem, h[layer - 1], dim="time")

        # Query comes from current segment; key/value come from memory + current segment.
        q = h[layer - 1] @ W_q[layer]
        k_content = extended_context @ W_k_content[layer]
        v_content = extended_context @ W_v[layer]

        rel_pos = relative_sinusoidal_positions(query_len=len(segment), key_len=len(extended_context))
        attn_score = relative_attention_score(q, k_content, rel_pos, u[layer], v_bias[layer])
        attn_out = softmax(mask_future(attn_score)) @ v_content
        h[layer] = feed_forward(layer_norm(attn_out + h[layer - 1]))

    # Cache latest hidden states for the next segment.
    for layer in range(num_layers):
        memory[layer] = keep_last(concat(memory[layer], h[layer]), mem_len)
```

标准 Transformer 语言模型在长文本上通常把语料切成固定长度片段，然后在每个片段内部做因果 self-attention。这个做法计算方便，但有两个硬伤。第一，最长依赖被片段长度上界截断，片段外信息完全不可见；第二，切片往往不尊重句子或段落边界，片段开头 token 缺少必要前文，形成 context fragmentation。推理阶段也不理想：为了让每个新 token 用到最长窗口，vanilla Transformer 往往把窗口右移一位并重新计算整个窗口，历史状态不能复用，成本极高。

Transformer-XL 的第一项核心改动是 segment-level recurrence。设第 \(\tau\) 个片段在第 \(n-1\) 层的隐藏状态为 \(\mathbf{h}_{\tau}^{n-1}\)，上一片段的对应隐藏状态为 \(\mathbf{h}_{\tau-1}^{n-1}\)。当前层计算前先拼接一个扩展上下文：

$$
\tilde{\mathbf{h}}_{\tau}^{n-1}=[\mathrm{SG}(\mathbf{h}_{\tau-1}^{n-1})\circ \mathbf{h}_{\tau}^{n-1}]
$$

其中 \(\mathrm{SG}\) 是 stop-gradient，\(\circ\) 表示沿时间维拼接。然后当前片段的 query 只来自当前片段，而 key/value 来自“历史 memory + 当前片段”：

$$
\mathbf{q}_{\tau}^{n}=\mathbf{h}_{\tau}^{n-1}W_q^n,\quad
\mathbf{k}_{\tau}^{n}=\tilde{\mathbf{h}}_{\tau}^{n-1}W_{k,E}^n,\quad
\mathbf{v}_{\tau}^{n}=\tilde{\mathbf{h}}_{\tau}^{n-1}W_v^n
$$

$$
\mathbf{h}_{\tau}^{n}=\mathrm{TransformerLayer}(\mathbf{q}_{\tau}^{n},\mathbf{k}_{\tau}^{n},\mathbf{v}_{\tau}^{n})
$$

这个设计让当前片段的每个位置都可以 attend 到上一片段的缓存表示，但梯度不会穿回上一片段，因此显存不会随全文长度线性爆炸。多层网络连续应用这种机制后，信息会跨片段逐层传播，最大可利用依赖长度随层数和片段长度近似线性增长，而不是被单个 segment length 固定封死。

> 💡 关键：Transformer-XL 的 memory 不是 RNN 那样只传一个最终 hidden state，而是缓存一整段 hidden state 序列。这样当前 token 能用 attention 选择历史中不同位置的信息，保留了 Transformer 的直接长距离连接优势。

第二项核心改动是相对位置编码。直接把标准绝对位置编码搬到 recurrence 上会出错：上一片段缓存的第 \(i\) 个位置和当前片段的第 \(i\) 个位置可能带着相同绝对位置向量，模型无法判断二者在真实时间轴上的先后距离。Transformer-XL 因此不再把绝对位置静态加到输入 embedding 中，而是在每层 attention score 中注入相对距离 \(i-j\)。单头注意力中，位置 \(i\) 对位置 \(j\) 的打分可写成四项：

$$
A_{i,j}^{\mathrm{rel}}=q_i^{\top}k_{E,j}+q_i^{\top}W_{k,R}R_{i-j}+u^{\top}k_{E,j}+v^{\top}W_{k,R}R_{i-j}
$$

这里 \(q_i\) 是当前位置 query，\(k_{E,j}\) 是内容 key，\(R_{i-j}\) 是相对距离的正弦编码，\(u\) 和 \(v\) 是可学习全局偏置。四项分别有清晰含义：\(q_i^{\top}k_{E,j}\) 做内容寻址；\(q_i^{\top}W_{k,R}R_{i-j}\) 表示“当前内容想关注多远”；\(u^{\top}k_{E,j}\) 是全局内容偏置；\(v^{\top}W_{k,R}R_{i-j}\) 是全局位置偏置。相较 Shaw 等相对位置方法，Transformer-XL 保留 sinusoidal relative encoding 的外推归纳偏置，并把内容 key 与位置 key 的投影矩阵分开。

这种位置设计和 memory 机制是配套的。只有 recurrence 而没有相对位置，模型会在复用缓存时产生时间混淆；只有相对位置而没有 recurrence，仍然无法跨片段传递历史信息。两者结合后，训练时可固定片段长度，评估时可以把 memory length 设得更长，因为相对距离编码比训练过的绝对位置编号更容易外推到长上下文。

从计算流程看，Transformer-XL 在训练阶段像截断 BPTT：每个 segment 做一次前向和反向，上一段 hidden states 作为固定 memory。推理阶段则更像缓存式自回归模型：旧片段的各层表示保留在 memory 中，新片段只需计算新增 token 的表示，不需要每次滑窗都从头重算历史。这就是论文能报告大幅评估加速的原因。它不仅扩大有效上下文，也把“长上下文语言模型”从重复窗口计算推进到状态复用范式。

与后来的长上下文 Transformer 相比，Transformer-XL 的思路朴素但影响很大。它没有依赖稀疏注意力、检索索引或外部记忆库，而是在标准 Transformer 内部加入可缓存的 hidden-state recurrence；它也没有把长上下文问题只看作位置编码问题，而是同时处理信息流、位置一致性和推理效率。对于现代 LLM，KV cache 已成为自回归推理的基础设施，Transformer-XL 则是较早系统性说明“Transformer 状态可以跨片段复用，并且位置编码必须随之改造”的代表工作。

#### 🧪 练习题
```yaml
question: "Transformer-XL 为什么不能直接复用标准 Transformer 的绝对位置编码？"
options:
  - "因为缓存的历史状态与当前片段可能共享相同绝对位置编号，导致模型无法区分真实相对距离"
  - "因为绝对位置编码会让模型参数量变成两倍"
  - "因为绝对位置编码只能用于图像，不能用于文本"
  - "因为相对位置编码会完全取消 attention mask"
answer: 0
explain: "Transformer-XL 复用上一片段 hidden states 时，需要知道当前 query 与历史 key 的相对距离；绝对位置编号在跨片段缓存下会造成时间混淆。"
```
