### Megatron-LM

```yaml
id: megatron_lm
name: Megatron-LM
full_name: 'Megatron-LM (Megatron-LM: Training Multi-Billion Parameter)'
year: '2019'
org: NVIDIA
paper_url: https://arxiv.org/abs/1909.08053
category: distributed
parent: —
motivation: 张量并行Transformer层内切分
```

#### 📝 一句话总结

Megatron-LM 提出面向 Transformer 的层内张量并行：按列/行切分 MLP GEMM，按 attention heads 切分 self-attention，并只在必要位置插入少量 collective 通信。它解决的是单卡显存无法容纳多十亿参数模型，而通用模型并行框架通信过重、实现复杂的问题。

#### 🎯 核心要点

- 在 Transformer 层内部做 model parallelism，而不是只按层做 pipeline parallelism
- MLP 第一层 GEMM 做 column parallel，GeLU 在各 GPU 本地计算；第二层 GEMM 做 row parallel 后 all-reduce
- Self-attention 按 heads 切分，Q/K/V 和 attention computation 大部分本地完成
- 每个 Transformer 层 forward/backward 只需少量通信操作，论文图示单层共 4 个主要通信点
- 词表 embedding 和输出 logits 也可按 vocabulary 维度切分，降低大词表内存和通信
- 可与 data parallel 组合成 hybrid model+data parallel，在 512 GPUs 上训练 8.3B 参数模型
- 论文报告 15.1 PetaFLOPs sustained，模型并行弱扩展效率约 76-77%

#### 🔬 深入细节

![Megatron-LM Transformer 张量并行](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/x3.png)
*图：Megatron-LM 论文 Figure 3，展示 MLP 和 self-attention 中的列并行、行并行以及 forward/backward 通信算子。*

```python
# Megatron-LM Transformer 层张量并行伪代码
def megatron_transformer_layer(x, tp_group):
    # MLP: column parallel first GEMM
    A_i = shard_columns(W_up, tp_group.rank)
    h_i = gelu(x @ A_i)              # local, no communication before GeLU

    # row parallel second GEMM, then reduce partial outputs
    B_i = shard_rows(W_down, tp_group.rank)
    mlp_partial = h_i @ B_i
    mlp_out = all_reduce_sum(mlp_partial, group=tp_group)

    # Attention: split heads across tensor-parallel ranks
    Q_i, K_i, V_i = local_qkv_projection(x, head_shard=tp_group.rank)
    ctx_i = attention(Q_i, K_i, V_i)
    out_partial = ctx_i @ shard_rows(W_o, tp_group.rank)
    attn_out = all_reduce_sum(out_partial, group=tp_group)

    return layernorm_residual(x, attn_out, mlp_out)
```

**动机与背景：只靠数据并行无法突破单卡模型容量。** Data parallel 每张 GPU 都保存完整模型，参数、梯度和 optimizer state 都受单卡显存限制。GPipe 类 pipeline parallel 可以按层切分，但 Transformer 单层中的大矩阵和 attention heads 本身也可能很大，并且层切分会产生 pipeline bubble。Megatron-LM 选择直接在 Transformer 层内部切张量，让每个大 GEMM 分摊到多张 GPU。

**MLP 切分：利用 GeLU 的逐元素性质减少通信。** Transformer MLP 通常是 \(Y=\text{GeLU}(XA)B\)。Megatron 把 \(A\) 按列切成 \(A_i\)，各 GPU 计算 \(Y_i=\text{GeLU}(XA_i)\)。因为 GeLU 逐元素，不需要先合并 \(XA\)。再把 \(B\) 按行切成 \(B_i\)，每张 GPU 计算 \(Y_iB_i\)，最后 all-reduce 求和得到完整输出：

$$
Y = \sum_i \text{GeLU}(XA_i)B_i
$$

**Attention 切分：按 head 天然并行。** 多头 attention 本来就是多个 head 独立计算后 concat。Megatron 将 Q/K/V projection 和 attention heads 分给不同 tensor-parallel ranks，每张 GPU 只处理一部分 heads。attention 内部的 \(QK^\top\)、softmax、\(PV\) 都可本地完成，只在输出 projection 后合并 partial result。

**通信设计：把 collective 放在 Transformer 子层边界。** 通用张量切分可能每个算子都要通信，而 Megatron 的切法利用 Transformer 结构，把通信压缩到少数 all-reduce。论文把 forward 中的通信算子抽象为 \(f\) 和 \(g\)：一个在 forward identity/backward all-reduce，另一个在 forward all-reduce/backward identity，从而让自动微分中通信位置简洁可控。

**与 GPipe 的区别：层内切分 vs. 层间流水。** GPipe 把不同层放到不同设备，通信 activation；Megatron 把同一层的大矩阵分到多个设备，通信 partial sums。两者正交，现代大模型训练通常同时使用 tensor parallel、pipeline parallel、data parallel 和 optimizer sharding。

> 💡 关键：Megatron-LM 的工程美感在于只针对 Transformer 的 MLP 和 attention 两个结构做最小通信切分，而不是依赖通用图编译器。

#### 🧪 练习题

```yaml
question: "Megatron-LM 为什么把 MLP 第一层按列切分？"
options:
  - "因为 GeLU 可在每个分片的局部输出上独立计算，避免中间 all-gather"
  - "因为列切分会删除反向传播"
  - "因为只支持单层网络"
  - "因为这样不需要任何 GPU 通信"
answer: 0
explain: "第一层列切分后各 GPU 得到一部分 hidden features，GeLU 是逐元素操作，可本地执行；第二层行切分后再 all-reduce 合并。"
```
