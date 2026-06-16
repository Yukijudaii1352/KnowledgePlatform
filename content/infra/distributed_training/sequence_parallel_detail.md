### Sequence Parallelism (序列并行)

```yaml
id: sequence_parallel
name: Sequence Parallelism
full_name: 序列并行 (Sequence Parallelism)
year: '2023'
org: NUS/Colossal-AI
paper_url: https://aclanthology.org/2023.acl-long.134/
category: tp
parent: megatron_tp
motivation: 沿序列维度切分LayerNorm和Dropout激活值
```

#### 📝 一句话总结

Sequence Parallelism 沿序列维度把输入切到多张 GPU，并用 Ring Self-Attention 在不复制完整序列激活的情况下计算跨分片注意力，解决 Transformer 长序列训练中单卡激活内存随序列长度快速增长的问题。

#### 🎯 核心要点

- 输入序列按长度维度切分：第 \(i\) 张 GPU 只保存 \(L/N\) 个 token 的激活和本地 \(Q_i,K_i,V_i\)。
- Ring Self-Attention：先环形传递 Key 计算完整注意力分数，再环形传递 Value 聚合输出。
- 与 Data、Pipeline、Tensor Parallelism 兼容：论文将其作为可组成的第四个并行维度。
- MLP 层天然本地化：逐 token 的 MLP 不需要跨序列通信，通信主要集中在 attention。
- 长序列内存优势明确：当 \(BL>32H\) 或 \(BL>16AZ\) 时，序列维度切分比 Megatron 式 tensor parallel 更节省激活内存。
- 实验结果：ACL 2023 版本报告在 64 张 NVIDIA P100 上，相比 tensor parallelism 支持 13.7x 最大 batch size 和 3.0x 最大序列长度；结合高效注意力可处理 114K token。

#### 🔬 深入细节

##### 远程示意图

![序列并行总体架构](https://ar5iv.labs.arxiv.org/html/2105.13120/assets/x3.png)
*图：论文 Figure 1(c) 的序列并行总览，来自 ar5iv 对 arXiv:2105.13120 的 HTML 渲染。Device 1 与 Device 2 共享相同参数，但各自处理不同子序列。*

![Ring Self-Attention 的 Key 环形传递](https://ar5iv.labs.arxiv.org/html/2105.13120/assets/x4.png)
*图：论文 Figure 2(a)，Key 在设备间环形流动，用本地 Query 与所有 Key 分块计算注意力分数。*

![Ring Self-Attention 的 Value 环形传递](https://ar5iv.labs.arxiv.org/html/2105.13120/assets/x5.png)
*图：论文 Figure 2(b)，Value 继续沿环传递，各设备用本地注意力概率块累加本地输出。*

##### 算法伪代码

```python
# Ring Self-Attention, rank i holds X_i with length L / N
def ring_self_attention(x_i, rank, world_size):
    q_i = x_i @ W_q
    k_i = x_i @ W_k
    v_i = x_i @ W_v

    # Stage 1: circulate K blocks and build logits for local Q_i against all K_j
    logits_blocks = []
    k_block = k_i
    owner = rank
    for step in range(world_size):
        logits_blocks.append((owner, q_i @ k_block.transpose(-1, -2) / sqrt(d_head)))
        k_block, owner = ring_send_recv(k_block, owner)

    logits = concat_in_sequence_order(logits_blocks)
    probs = softmax(logits, dim=-1)

    # Stage 2: circulate V blocks and accumulate local output O_i
    out_i = zeros_like(q_i)
    v_block = v_i
    owner = rank
    for step in range(world_size):
        probs_block = slice_probs_for_owner(probs, owner)
        out_i += probs_block @ v_block
        v_block, owner = ring_send_recv(v_block, owner)

    return out_i @ W_o
```

##### 机制解读

传统 Tensor Parallelism 主要切 hidden/head 维度，因此每张 GPU 仍要保存完整长度 \(L\) 的序列激活。当 \(L\) 很长时，注意力 logits 或中间激活包含 \(L^2\) 或 \(BLH\) 级别项，单卡内存很快被序列长度打满。Sequence Parallelism 的出发点是：模型参数可以复制，序列 token 可以切分；每张卡只保存 \(X_i \in \mathbb{R}^{B \times L/N \times H}\)，把长序列的激活压力按 \(N\) 分摊。

注意力层是唯一不能简单本地计算的部分，因为本地 Query 需要看见所有 Key/Value。RSA 的第一阶段让 \(K_0,\ldots,K_{N-1}\) 沿环传递；第 \(i\) 张卡在每一步计算一块 \(Q_iK_j^\top\)，最后拼出针对本地 Query 的完整 logits：

$$
S_i =
\left[
Q_iK_0^\top,\ Q_iK_1^\top,\ \ldots,\ Q_iK_{N-1}^\top
\right] / \sqrt{d}
$$

softmax 必须在拼接后的完整 key 维度上做，而不是每个块单独归一化。第二阶段再让 \(V_j\) 沿环传递，并按 softmax 后对应的概率块累加：

$$
P_i=\operatorname{softmax}(S_i), \qquad
O_i=\sum_{j=0}^{N-1} P_{i,j}V_j
$$

这样每张 GPU 最终只得到自己 \(L/N\) 个 token 的输出 \(O_i\)，无需 materialize 其他设备的输出激活。MLP、LayerNorm、Dropout 等逐 token 操作则不需要跨设备交互，这也是序列维度切分可以和 Megatron TP 的非矩阵算子激活切分思想兼容的原因。

论文从内存角度给出两个判断条件。MLP 块中，Tensor Parallelism 切权重但保留完整序列；Sequence Parallelism 保留完整权重但只处理子序列。论文推导出在 MLP 块中满足

$$
BL > 32H
$$

时，Sequence Parallelism 的激活内存更优。对于多头注意力，Tensor Parallelism 切 head 但每个 head 仍面对完整 \(L \times L\) 关系；Sequence Parallelism 把注意力矩阵的 query 行切成 \(L/N\)，论文给出的优势条件为

$$
BL > 16AZ
$$

其中 \(B\) 为 batch size，\(A\) 为每头维度，\(Z\) 为 attention head 数。直觉上，序列越长、batch 越大，切序列比切隐藏维度更直接地压低激活峰值。

通信上，Sequence Parallelism 把成本集中在 attention 的两次 ring P2P 与反向传播的对应通信；MLP 层无通信。论文将其和 Megatron Tensor Parallelism 的单层总通信量比较，得到同阶且可写成：

$$
\text{Comm}_{\mathrm{SP}} =
8(N-1)BZA\frac{L}{N}
\approx
\text{Comm}_{\mathrm{TP}}
$$

差异在于 Pipeline Parallelism 组合时的激活传递。TP 下跨 pipeline stage 传递完整序列激活常需要 split 与 all-gather；SP 的激活天然已经按序列切好，可以直接把子序列交给下一 stage，因此减少额外 all-gather。这个工程差异解释了为什么论文不仅关注单层通信量，还强调 4D parallelism 的可组合性。

#### 🧪 练习题

```yaml
question: "Ring Self-Attention 为什么需要先传 Key 再传 Value？"
options:
  - "因为 Key 用于计算完整 softmax 归一化所需的 logits，Value 用于按概率块累加输出"
  - "因为 Value 不能跨 GPU 通信，只能在本地复制"
  - "因为 MLP 层需要先聚合所有 Key"
  - "因为序列并行会把模型权重切成 Key 和 Value 两部分"
answer: 0
explain: "本地 Query 必须先和所有 Key 分块形成完整 logits 并做全局 softmax；随后才用对应概率块乘以各 Value 分块得到本地输出。"
```
