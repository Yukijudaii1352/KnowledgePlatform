### FlashAttention — Fast and Memory-Efficient Exact Attention with IO-Awareness

```yaml
id: flash_attention
name: FlashAttention
full_name: IO感知精确注意力计算 (FlashAttention)
year: '2022'
org: Stanford
paper_url: https://arxiv.org/abs/2205.14135
category: hardware_specific
parent: —
motivation: IO感知分块计算精确注意力，突破显存带宽瓶颈
```

#### 📝 一句话总结

FlashAttention 提出一种 IO-aware 的精确注意力算法，通过 SRAM/HBM 分层感知的分块计算、在线 softmax 和反向重计算，避免物化 \(N \times N\) 注意力矩阵，从而把注意力的显存读写和峰值内存从二次瓶颈大幅压低。

#### 🎯 核心要点

- **精确注意力而非近似注意力**：输出等价于标准 \(\mathrm{softmax}(QK^\top)V\)，不通过稀疏、低秩或核方法牺牲模型质量
- **IO-aware tiling**：把 \(Q,K,V\) 切成块，循环把 \(K,V\) block 和 \(Q\) block 放入 GPU on-chip SRAM，在片上完成 score、softmax、乘 \(V\) 的融合计算
- **不物化注意力矩阵**：标准实现会把 \(S=QK^\top\) 和 \(P=\mathrm{softmax}(S)\) 写入 HBM；FlashAttention 只写最终 \(O\) 和少量归一化统计
- **在线 softmax 归并**：每行维护最大值 \(m_i\) 和归一化项 \(\ell_i\)，使跨 block softmax 数值稳定且等价于一次性 softmax
- **反向重计算**：forward 存储 softmax normalizer，backward 在 SRAM 中重算局部 attention block，避免从 HBM 读取 \(O(N^2)\) 中间矩阵
- **IO 复杂度改进**：标准 attention 需要 \(\Theta(Nd+N^2)\) HBM 访问；FlashAttention 在 SRAM 大小 \(M\) 下为 \(\Theta(N^2d^2/M)\)，并且在一段 SRAM 范围内 IO 最优
- **工程实现**：CUDA kernel 融合 masking、softmax、dropout、matmul 等操作；论文还扩展到 block-sparse FlashAttention

#### 🔬 深入细节

![FlashAttention IO-aware 分块示意](https://ar5iv.labs.arxiv.org/html/2205.14135/assets/x1.png)
*图：FlashAttention 分块遍历 \(K,V\) 和 \(Q\)，避免把 \(N \times N\) attention matrix 写入 HBM；右侧展示相对 PyTorch attention 的速度提升。来源：论文 Figure 1。*

```python
# FlashAttention forward pass 伪代码，省略 batch/head 维度和可选 mask/dropout
def flash_attention(Q, K, V, sram_size_M):
    N, d = Q.shape
    Bc = ceil(sram_size_M / (4 * d))
    Br = min(Bc, d)

    O = zeros((N, d))       # HBM
    l = zeros((N,))         # row-wise softmax denominator
    m = full((N,), -inf)    # row-wise running max

    Q_blocks = split_rows(Q, Br)
    K_blocks = split_rows(K, Bc)
    V_blocks = split_rows(V, Bc)

    for j in range(len(K_blocks)):
        Kj = load_to_sram(K_blocks[j])
        Vj = load_to_sram(V_blocks[j])

        for i in range(len(Q_blocks)):
            Qi = load_to_sram(Q_blocks[i])
            Oi, li, mi = load_to_sram(O[i], l[i], m[i])

            Sij = Qi @ Kj.T                         # Br x Bc scores
            mij_new = maximum(mi, rowmax(Sij))
            Pij = exp(Sij - mij_new[:, None])

            li_new = exp(mi - mij_new) * li + rowsum(Pij)
            Oi_new = (
                (exp(mi - mij_new) * li)[:, None] * Oi
                + Pij @ Vj
            ) / li_new[:, None]

            write_to_hbm(O[i], Oi_new)
            write_to_hbm(l[i], li_new)
            write_to_hbm(m[i], mij_new)

    return O, l, m
```

**动机与背景：Transformer 的瓶颈不只是 FLOPs。** 标准 attention 的数学式通常写成：

$$
O = \mathrm{softmax}\left(\frac{QK^\top}{\sqrt d}\right)V.
$$

若序列长度为 \(N\)，head dimension 为 \(d\)，score 矩阵 \(S\) 和概率矩阵 \(P\) 都是 \(N \times N\)。传统实现会先计算 \(S\)，写入 HBM，再读取 \(S\) 做 softmax 得到 \(P\)，再写入 HBM，最后读 \(P\) 和 \(V\) 做矩阵乘。现代 GPU 的算力增长快于显存带宽增长，这类反复读写大矩阵会让 attention 变成 memory-bound。许多近似 attention 降低 FLOPs，却仍可能被非连续访存、额外 kernel launch 或不友好的内存访问拖慢；FlashAttention 的切入点是直接优化 IO。

**在线 softmax 是精确性的核心。** 分块计算的难点是 softmax 的归一化需要整行所有 key 的 score。FlashAttention 对每个 query 行维护两个统计量：当前已见 block 的最大值 \(m\) 和指数和 \(\ell\)。当新 block 的 score 为 \(S_{ij}\) 时，更新为：

$$
m_i^{new} = \max(m_i, \max_j S_{ij}),
$$

$$
\ell_i^{new} =
e^{m_i-m_i^{new}}\ell_i + \sum_j e^{S_{ij}-m_i^{new}},
$$

$$
O_i^{new} =
\frac{e^{m_i-m_i^{new}}\ell_i O_i + e^{S_{ij}-m_i^{new}}V_j}
{\ell_i^{new}}.
$$

这个递推本质上把 softmax 的 log-sum-exp 稳定化技巧搬到 block 聚合里。旧 block 的输出贡献先乘 \(e^{m_i-m_i^{new}}\) 重新缩放，新 block 的贡献用新的最大值归一化。最终遍历完所有 \(K,V\) block 后，得到的 \(O_i\) 与一次性计算全行 softmax 完全一致。

**IO 复杂度解释：为什么多做一点计算反而更快。** 论文证明，在 SRAM 大小为 \(M\)、\(d \le M \le Nd\) 的条件下，标准 attention 的 HBM 访问量为：

$$
\Theta(Nd + N^2),
$$

而 FlashAttention 为：

$$
\Theta\left(\frac{N^2d^2}{M}\right).
$$

直觉上，\(M\) 越大，每次放入 SRAM 的 \(K,V,Q\) block 越大，同一块 \(K,V\) 被更多 \(Q\) 行复用，越少需要反复访问 HBM。FlashAttention 的 FLOPs 仍是 \(O(N^2d)\)，backward 还会因为重计算增加部分计算量；但这些额外计算发生在高吞吐的 GPU core 上，换来的是大量减少 HBM 读写，因此墙钟时间反而下降。

**反向传播：存 normalizer，不存 attention matrix。** 训练时标准实现通常要保留 \(P\) 供 backward 使用，内存为 \(O(N^2)\)。FlashAttention forward 只保存 \(O\) 以及每行的 softmax 统计量（常实现为 log-sum-exp）。Backward 时重新加载对应 \(Q,K,V\) block，在 SRAM 中重算 \(S\) 和局部 \(P\)，再计算 \(dQ,dK,dV\)。这是一种面向 GPU 层次内存的 checkpointing：用可控的重计算换掉不可承受的 \(N^2\) HBM 存储。

**与传统 kernel 组合方式的差异。** PyTorch/JAX 中的朴素实现通常由多个 kernel 组成：matmul、mask、softmax、dropout、matmul，每步之间通过 HBM 交接。FlashAttention 把这些步骤融合到一个 CUDA kernel 内，并显式控制 shared memory/register 的数据流。算法创新和工程实现是绑在一起的：如果只在高层框架中写等价数学式，很难阻止中间矩阵被物化，也很难保证 block 在 SRAM 中被复用。

> ⚠️ 注意：FlashAttention 没有降低 attention 的渐近计算复杂度 \(O(N^2d)\)，它降低的是显存 IO 和激活内存。对长序列和显存带宽受限场景，这比单纯减少 FLOPs 更直接影响真实速度。

#### 🧪 练习题

```yaml
question: "FlashAttention 能避免物化 N×N 注意力矩阵的关键机制是什么？"
options:
  - "把 softmax 换成线性注意力近似"
  - "对每个 query 行维护 running max 和 normalization factor，按 block 精确归并 softmax"
  - "只计算局部窗口内的 key-value 对"
  - "把所有中间矩阵压缩成低秩分解"
answer: 1
explain: "FlashAttention 通过在线 softmax 统计量 m 和 l 在多个 block 间精确合并归一化结果，因此不需要把完整 score 或概率矩阵写入 HBM。"
```
