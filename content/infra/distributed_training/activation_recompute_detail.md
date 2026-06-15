### Selective Recomputation: 选择性激活重计算

```yaml
id: activation_recompute
name: Selective Recomputation
full_name: 选择性激活重计算 (Selective Activation Recomputation)
year: '2023'
org: NVIDIA
paper_url: https://arxiv.org/abs/2205.05198
category: tp
parent: sequence_parallel
motivation: 选择性重计算+序列并行减少30-40%开销
```

#### 📝 一句话总结

Selective Activation Recomputation 提出“只重算最占显存但计算便宜的激活”，并与 Megatron 的序列并行结合，解决大 Transformer 训练中全层 checkpoint 带来的 30-40% 额外计算开销。

#### 🎯 核心要点

- 将激活内存拆成 attention、MLP、LayerNorm、dropout、tensor-parallel 通信边界等组成部分，证明全层重计算并不是唯一选择。
- 序列并行把非 tensor-parallel 区域的激活沿 sequence 维切分，使 LayerNorm、dropout 等激活从每张卡完整复制变成分片保存。
- 选择性重计算只丢弃 attention softmax/dropout 等“内存大、FLOPs 相对小”的中间量，避免重算整层 MLP 和投影矩阵乘法。
- 与 tensor parallelism 正交：TP 负责切 hidden/head，sequence parallel 负责切序列维，selective recompute 负责补足剩余峰值内存。
- 在千亿到万亿参数 GPT 风格模型上，将重计算开销降低 90% 以上，并在 530B 模型训练中把 MFU 从约 42.1% 提升到 54.2%。

#### 🔬 深入细节

##### 核心示意图

![Tensor 与 Sequence Parallel 结合示意](https://ar5iv.labs.arxiv.org/html/2205.05198/assets/figures/transformer-tensor-sequence-parallel.jpg)
*图：论文展示的 Transformer tensor-parallel + sequence-parallel 切分方式；sequence parallel 让原本复制在 TP 组内的序列激活变成分片保存。*

##### 算法伪代码

```python
# selective activation recomputation for one Transformer block
def forward_block(x):
    x_sp = scatter_sequence(x)          # sequence parallel: each TP rank keeps S / tp tokens
    h = layer_norm(x_sp)                # save small inputs, not full replicated activations
    q, k, v = column_parallel_qkv(h)

    # Do not save large attention probabilities / dropout outputs.
    # Save only q, k, v and RNG state needed to replay dropout.
    ctx = attention(q, k, v, save_probs=False, save_rng=True)
    y = row_parallel_proj(ctx)

    z = layer_norm(x_sp + y)
    m = mlp(z)                          # keep expensive GEMM boundary activations
    return gather_sequence(x_sp + y + m)

def backward_block(saved):
    # recompute only the attention core, not the whole Transformer layer
    probs = recompute_softmax_dropout(saved.q, saved.k, saved.v, saved.rng)
    return attention_backward(probs, saved)
```

##### 方法解释

传统 activation checkpointing 的做法是整层丢弃激活，反向传播前再完整执行一次前向。它能把显存压下来，但代价是每个 Transformer 层的 QKV、MLP 两个大 GEMM 都要重跑，计算开销通常达到 30-40%。论文的出发点是重新做一遍激活内存账本：并非所有激活都同样昂贵，attention 的概率矩阵和 dropout mask 往往占显存很大，但重算它们主要是矩阵乘法后的 softmax/dropout；而 MLP 中间激活虽然也大，但重算需要昂贵 GEMM，性价比低。

序列并行先降低“必须保存”的部分。Megatron tensor parallelism 在行并行/列并行线性层之间需要 all-reduce 或 all-gather，使一些区域的激活在 TP 组内复制。Sequence parallel 把这些区域改成沿序列维分片，LayerNorm 和 dropout 在本地 token 上独立执行，必要时通过 reduce-scatter/all-gather 与 TP 线性层衔接。若 TP 度为 \(p\)，这类激活的单卡占用近似从 \(O(BSH)\) 降到 \(O(BSH/p)\)。

选择性重计算再处理无法仅靠切分解决的 attention 峰值。对 attention，训练需要保存 softmax 后的概率 \(P=\mathrm{softmax}(QK^T/\sqrt{d})\) 以及 dropout 结果，规模与 \(B \times n_h \times S^2\) 相关。论文选择在前向时不保存这些矩阵，反向时用保存的 \(Q,K,V\) 和随机数状态重新计算：

$$
P = \mathrm{Dropout}\left(\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)\right), \quad O = PV
$$

> 💡 关键：它不是“少保存一切”，而是用显存节省量除以重算 FLOPs 做取舍。只有内存收益高、重算成本低的 attention 中间量被丢弃。

与全层 checkpoint 相比，这种策略保留了 MLP 和线性投影所需的关键边界激活，因此反向不会重复执行最贵的大 GEMM；与单纯 sequence parallel 相比，它仍能压掉 attention \(S^2\) 相关的峰值。二者组合后，大模型训练通常可以关闭或大幅减少 full recomputation，只在极端长序列或显存预算紧张时保留少量 checkpoint。

##### 训练流程与传统方法对比

标准 checkpoint 的流程是“前向少存整层，反向重跑整层”；Selective Recomputation 的流程是“前向分片保存必要激活，attention 内部大张量不保存，反向只重算 attention 内部”。因此它保留了数据并行和 tensor parallel 的编程模型，不需要修改模型数学语义，也不改变优化器状态，只改变 activation 的保存策略。

在 Megatron/NeMo 这类训练栈中，这个方法通常与 TP、PP、DP 同时启用。TP 组内部先用 sequence parallel 缩小本地激活，PP 负责跨层切分，DP 负责扩 batch；selective recompute 只影响每层内部的 autograd 保存点。这个边界很重要，因为它让方法可以作为系统优化加入，而不是引入新的模型结构。

#### 🧪 练习题

```yaml
question: "Selective Activation Recomputation 相比全层 checkpoint 的核心优势是什么？"
options:
  - "重算所有层以获得更稳定的梯度"
  - "只重算显存占用高但计算相对便宜的 attention 中间量"
  - "把优化器状态从 GPU 全部卸载到 CPU"
  - "用 Top-1 路由减少 MoE 通信"
answer: 1
explain: "该方法的核心是按激活内存和重算成本做选择，避免重复执行整层 MLP/GEMM。"
```
