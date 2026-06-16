### Megatron-LM

```yaml
id: megatron_lm
name: Megatron-LM
full_name: Megatron-LM
year: '2019'
org: NVIDIA
paper_url: https://arxiv.org/abs/1909.08053
category: training_platform
parent: pytorch
motivation: 高效张量并行支持千亿参数训练
```

#### 📝 一句话总结

Megatron-LM 提出了一套专门面向 Transformer 的层内张量并行方案，把 MLP 大矩阵和 multi-head attention 按张量维度切分，在原生 PyTorch 中只插入少量 collective 通信即可训练十亿级到百亿级语言模型。

#### 🎯 核心要点

- 提出 intra-layer model parallelism：不按层切模型，而是在单个 Transformer block 内切分矩阵乘和 attention heads
- MLP 并行策略：第一层权重按列切分、第二层权重按行切分，将非线性 GeLU 保持在每个 GPU 的局部分片上
- Attention 并行策略：Q/K/V 与 attention heads 按 head 维度切分，每张 GPU 独立计算一组 heads 后再合并输出投影
- 通信设计极简：用互为伴随的 `f`/`g` autograd 算子把一次 Transformer 层的前向和反向通信限制为 4 次 all-reduce
- 系统实现保持 PyTorch 友好：无需新编译器或自定义框架，配合 mixed precision、activation checkpointing、数据并行和高带宽节点内互联
- 实验训练 GPT-2/BERT 风格模型到 8.3B/3.9B 参数规模，并展示 512 GPU 上约 15.1 PFLOPS 的端到端吞吐

#### 🔬 深入细节

![Megatron-LM MLP 张量并行示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/mlp_mp_2.png)
*图：来自 Megatron-LM 论文 Figure 3(a)，展示 MLP 中 `A` 按列切分、`B` 按行切分，以及 `f`/`g` 通信算子的放置。*

![Megatron-LM Attention 张量并行示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/attention_mp_2.png)
*图：来自 Megatron-LM 论文 Figure 3(b)，展示 self-attention 按 heads 切分，输出投影再通过 row-parallel 方式汇合。*

```python
# Megatron-LM tensor parallel training step, simplified to one Transformer MLP + attention block.
# tp_rank owns one shard of every tensor-parallel weight.
def transformer_block_tp(x, tp_rank, tp_group):
    # MLP: H = GeLU(XA), Y = HB
    A_i = shard_columns(A, rank=tp_rank)        # A = [A_1, ..., A_p]
    H_i = gelu(x @ A_i)                         # no communication before GeLU

    B_i = shard_rows(B, rank=tp_rank)           # B = [B_1; ...; B_p]
    y_partial = H_i @ B_i
    y = all_reduce_sum(y_partial, group=tp_group)

    # Attention: each rank owns a subset of heads.
    Q_i, K_i, V_i = qkv_projection_for_local_heads(x, tp_rank)
    ctx_i = softmax(Q_i @ K_i.T / sqrt(head_dim)) @ V_i
    out_partial = ctx_i @ shard_rows(attention_out_proj, tp_rank)
    attn_out = all_reduce_sum(out_partial, group=tp_group)

    return residual_layer_norm(x + y + attn_out)
```

训练超大 Transformer 的直接瓶颈不是“数据量不够分”，而是单层矩阵、激活和优化器状态已经超过单卡内存。纯数据并行会在每张 GPU 上复制完整模型，只能扩大 batch；纯 pipeline 并行可以把不同层放到不同设备，但每一层内部的大矩阵仍然完整落在某张 GPU 上。Megatron-LM 的关键选择是把 Transformer block 内部最重的算子切开，使模型宽度可以随 GPU 数增长。

MLP 的数学形式可以写成：

$$
Y = \operatorname{GeLU}(XA), \quad Z = YB
$$

若使用 \(p\) 个 tensor-parallel rank，将第一层权重按列切分为 \(A=[A_1,\ldots,A_p]\)，每张 GPU 只计算 \(Y_i=\operatorname{GeLU}(XA_i)\)。由于 GeLU 是逐元素非线性，切分后的 \(Y_i\) 可以在本地直接完成非线性。第二层权重按行切分为 \(B=[B_1;\ldots;B_p]\)，每张 GPU 计算局部结果 \(Z_i=Y_iB_i\)，最终只需：

$$
Z = \sum_{i=1}^{p} Z_i = \operatorname{AllReduceSum}(Z_i)
$$

这解释了为什么 Megatron-LM 选择“列切第一层、行切第二层”：它把中间扩展维度留在本地，避免在 GeLU 前后反复 gather 大激活，只在 block 的必要边界做一次求和同步。

Attention 的切分利用了 multi-head attention 的天然可分解结构。对第 \(i\) 个 rank，它只持有部分 heads 的投影矩阵 \(Q_i,K_i,V_i\)，局部计算：

$$
\operatorname{head}_i(X)=\operatorname{softmax}\left(\frac{XQ_i(XK_i)^T}{\sqrt{d_h}}\right)XV_i
$$

不同 heads 在 softmax 之前没有数据依赖，因此可以并行独立计算；跨 GPU 通信主要发生在输出投影和残差连接需要重新合成完整 hidden state 的位置。论文中的 `f` 和 `g` 是两个简单但重要的 autograd 辅助算子：`f` 前向是 identity、反向做 all-reduce；`g` 前向做 all-reduce、反向是 identity。二者配合后，一个 model-parallel Transformer 层在前向加反向中只需要 4 次 collective，而不是在每个子算子后都同步。

从系统角度看，Megatron-LM 的贡献是把算法结构、通信点和 PyTorch autograd 对齐。它没有要求用户重写模型到新 DSL，也没有依赖全图编译器；实现者只需替换 linear、embedding、cross entropy 等少数模块为 parallel 版本，并让 tensor parallel group 内的 rank 共享切分规则。embedding 和输出词表层也可做 vocabulary parallel：每个 rank 持有一段词表 logits，交叉熵通过跨 rank 的 max/sum 规约得到全词表归一化，从而避免完整 logits 常驻单卡。

与 GPipe/PipeDream 这类 pipeline 并行相比，Megatron-LM 主要解决“层内太宽”的问题；与 ZeRO 这类优化器/参数状态分片相比，它直接改变矩阵乘的计算分布。实践中它常与数据并行、pipeline 并行共同组成 3D 并行：tensor parallel 放在节点内 NVLink 等高带宽域中，pipeline parallel 跨层切分模型深度，data parallel 复制整个并行模型副本来扩大吞吐。这个分工也解释了为什么 Megatron-LM 的层内通信必须非常克制，否则 tensor parallel 的收益会被 all-reduce 开销吞掉。

> 💡 关键：Megatron-LM 的核心不是新的 Transformer 公式，而是找到 Transformer 中可以局部计算的维度，把通信压缩到残差/投影等少数必要汇合点。

#### 🧪 练习题

```yaml
question: "Megatron-LM 为什么在 MLP 中对第一层权重按列切分、第二层权重按行切分？"
options:
  - "为了让每个 GPU 都保存完整中间激活，便于调试"
  - "为了让 GeLU 在本地分片上执行，并只在第二层输出处做 all-reduce 求和"
  - "为了减少训练数据读取次数，与模型并行无关"
  - "为了把 attention heads 全部集中到同一个 GPU"
answer: 1
explain: "列切第一层后 GeLU 可局部执行；行切第二层后每个 rank 产生 partial output，最后 all-reduce 相加得到完整输出。"
```
