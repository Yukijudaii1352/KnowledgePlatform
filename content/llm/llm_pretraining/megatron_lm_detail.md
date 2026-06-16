### Megatron-LM (Megatron-LM: Training Multi-Billion Parameter)

```yaml
id: megatron_lm
name: Megatron-LM
full_name: "Megatron-LM (Megatron-LM: Training Multi-Billion Parameter)"
year: "2019"
org: NVIDIA
paper_url: "https://arxiv.org/abs/1909.08053"
category: distributed
parent: "—"
motivation: "张量并行Transformer层内切分"
```

#### 📝 一句话总结

Megatron-LM 提出了一种面向 Transformer 的层内张量并行方案，通过按矩阵列/行和 attention head 切分 MLP、Self-Attention 与词表 embedding，在只插入少量 all-reduce 的情况下训练数十亿参数语言模型。

#### 🎯 核心要点

- 将 Transformer 层内部的 GEMM 做 tensor model parallel，而不是只按层做 pipeline parallel。
- MLP 中第一层线性按列切分，GeLU 可在每张 GPU 本地独立执行；第二层线性按行切分，输出通过 all-reduce 合并。
- Self-Attention 中 Q/K/V 按 attention head 或列维度切分，每张 GPU 计算一部分 head，输出投影再按行切分并 all-reduce。
- 引入成对通信算子 \(f\) 与 \(g\)：一个 forward 恒等、backward all-reduce；另一个 forward all-reduce、backward 恒等。
- 每个 Transformer layer 的主要并行区域只需 forward 两次 all-reduce、backward 两次 all-reduce。
- 输入 embedding 按 vocabulary 维度切分；输出 embedding 与 cross-entropy 融合，避免 all-gather 巨大的 vocabulary logits。
- LayerNorm、dropout、residual 等便宜操作在各 GPU 上复制执行，保持 GPU 主要时间花在大 GEMM 上。
- 论文在 512 张 V100 GPU 上训练 8.3B GPT-2-like 模型，达到 15.1 PFLOPs 和 76% scaling efficiency，并报告 WikiText103、LAMBADA、RACE 上的 SOTA 结果。

#### 🔬 深入细节

![Megatron-LM MLP tensor parallel 示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/mlp_mp_2.png)
*图：论文 Figure 3(a)。第一层 MLP 矩阵 \(A\) 按列切分，第二层矩阵 \(B\) 按行切分，GeLU 夹在两次 GEMM 中间但不需要跨卡同步。*

![Megatron-LM Self-Attention tensor parallel 示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/attention_mp_2.png)
*图：论文 Figure 3(b)。Q/K/V 与 attention heads 被分配到不同 GPU，本地完成一部分 head 的注意力计算，输出线性层后再合并。*

Megatron-LM 的基本判断是：Transformer 的主要计算量集中在大矩阵乘法，而这些矩阵乘法具有天然可切分结构。对 MLP 块，设输入为 \(X\)，第一层权重为 \(A\)，第二层权重为 \(B\)，原始计算为：

$$
Y = \mathrm{GeLU}(XA), \quad Z = YB
$$

如果把 \(A\) 按列切分为 \([A_1, A_2]\)，则：

$$
Y = [Y_1, Y_2] = [\mathrm{GeLU}(XA_1), \mathrm{GeLU}(XA_2)]
$$

GeLU 是逐元素非线性，可以在每个分片上本地执行，不需要先把 \(XA_1\) 与 \(XA_2\) 聚合。这是设计的核心直觉：非线性函数不能跨加法随意交换，因此要选择一种切法，让非线性前不需要同步。随后把 \(B\) 按行切为 \(\begin{bmatrix}B_1 \\ B_2\end{bmatrix}\)，输出为：

$$
Z = YB = Y_1B_1 + Y_2B_2
$$

这个求和通过一次 all-reduce 完成。也就是说，MLP 中两个 GEMM 被“配对切分”：第一个 GEMM column-parallel，第二个 GEMM row-parallel，中间的 GeLU 完全本地化，最后只在必要位置同步。

```python
# Megatron-LM Transformer layer 的张量并行伪代码，world_size 张 GPU 组成一个 model-parallel group
for layer in transformer_layers:
    # Self-Attention: QKV column-parallel，按 head 分片
    x_norm = layernorm_replicated(x)
    q_i, k_i, v_i = column_parallel_qkv(x_norm, shard_id=rank)
    attn_i = scaled_dot_product_attention(q_i, k_i, v_i)   # 每张 GPU 只算自己的 heads
    attn_out_i = row_parallel_projection(attn_i, shard_id=rank)
    attn_out = all_reduce_sum(attn_out_i)                  # g: forward all-reduce
    x = x + dropout_replicated(attn_out)

    # MLP: A column-parallel，B row-parallel
    x_norm = layernorm_replicated(x)
    hidden_i = gelu(x_norm @ A_i)                          # 不需要同步即可 GeLU
    mlp_out_i = hidden_i @ B_i
    mlp_out = all_reduce_sum(mlp_out_i)                    # g: forward all-reduce
    x = x + dropout_replicated(mlp_out)
```

论文中的 \(f\) 与 \(g\) 是实现这个图的关键抽象。\(f\) 在 forward pass 中是 identity，在 backward pass 中对梯度 all-reduce；\(g\) 在 forward pass 中 all-reduce，在 backward pass 中是 identity。二者是共轭的 autograd function，因此可以用少量 PyTorch 自定义 autograd 代码实现，而不用新编译器或重写整个框架。直观上，\(f\) 让各 GPU 在前向拿到同样输入但反向时合并输入梯度；\(g\) 让分片输出在前向相加，反向时每个分片自然接收自己的梯度。

Self-Attention 的切分利用了 multi-head attention 的结构。多个 attention head 在 softmax 前后基本独立，所以可以把 Q/K/V 的投影矩阵按列切分，使每张 GPU 负责一部分 head：

$$
Q_i = XW^Q_i, \quad K_i = XW^K_i, \quad V_i = XW^V_i
$$

然后每张 GPU 本地计算 \(\mathrm{softmax}(Q_iK_i^\top / \sqrt{d})V_i\)。只有在 attention 输出投影时，需要像 MLP 第二层那样把行切分的结果求和。这样的好处是把最重的 attention-head 内部计算留在本地，通信只发生在 block 边界，而不是每个中间张量之后都同步。

Embedding 层也需要特殊处理。语言模型的输出 logits 维度是 vocabulary size，GPT-2 词表约五万量级，直接 all-gather logits 会产生很大的通信。Megatron-LM 把 input embedding 按 vocabulary 维度切分，并对 output embedding GEMM 与 cross-entropy loss 做融合：每张 GPU 只保留自己词表分片上的 logits，计算局部 loss 所需项，再通过较小的标量或向量归约得到全局 loss。这样避免了把 \(B \times S \times V\) 的大 logits 张量完整聚合到每张 GPU。

与 GPipe 的层间流水线不同，Megatron-LM 的 2019 论文重点是层内切分：单个 Transformer layer 的参数、激活和计算被拆到多张 GPU 上。它与 pipeline parallelism 正交，后续大规模训练系统通常会组合 tensor parallel、pipeline parallel 和 data parallel。论文当时强调的工程价值在于“少量侵入式修改”：原有 PyTorch Transformer 只需替换线性层、QKV 投影、embedding 和通信函数，就能扩展到多 GPU model-parallel group。

> ⚠️ 注意：张量并行并不是免费扩展。切得越细，每张 GPU 上的 GEMM 越小，通信占比越高；attention head 数也会影响切分粒度。Megatron-LM 的设计目标是让 GPU 仍然 compute-bound，即把 all-reduce 限制在少数必须同步的位置，并尽量复用 Transformer 里最规则的大矩阵乘法。

论文还指出 BERT-like 模型放大时 layer normalization 的位置会影响训练稳定性。Megatron-LM 使用类似 GPT-2/BERT 常见的 pre-LN 风格，把 LayerNorm 放在 attention 和 MLP 子层输入侧，使更大 BERT 模型随规模增加仍能获得更好的下游结果。这部分不是张量并行本身，但说明大模型扩展同时依赖并行系统和可训练架构细节。

#### 🧪 练习题

```yaml
question: "Megatron-LM 在 MLP 中为什么把第一层 GEMM 按列切分、第二层 GEMM 按行切分？"
options:
  - "为了让 GeLU 在每个分片本地执行，并只在第二层输出处做一次 all-reduce"
  - "为了把所有参数复制到每张 GPU，减少显存占用"
  - "为了让每个 attention head 共享同一个 Q/K/V 投影"
  - "为了完全消除 forward 和 backward 中的通信"
answer: 0
explain: "第一层列切分后 GeLU 可独立作用于每个输出分片；第二层行切分后各分片结果求和，用一次 all-reduce 合并即可。"
```
