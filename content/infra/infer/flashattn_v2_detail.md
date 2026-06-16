### FlashAttention-2: 闪电注意力2代 (FlashAttention-2)

```yaml
id: flashattn_v2
name: FlashAttention-2
full_name: 闪电注意力2代 (FlashAttention-2)
year: '2023'
org: Stanford
paper_url: https://arxiv.org/abs/2307.08691
category: attention
parent: flashattn
motivation: 优化并行策略提升硬件利用率
```

#### 📝 一句话总结

FlashAttention-2 在 FlashAttention 的 exact attention 与 IO-aware 分块基础上，重写 online softmax 更新、sequence 维度并行和 warp work partition，使注意力 kernel 更接近 GEMM 的硬件利用率。

#### 🎯 核心要点

- 保持 exact attention：输出仍为 \(\mathrm{softmax}(QK^\top)V\)，不是近似注意力
- 减少非矩阵乘 FLOPs：推迟最终归一化，只保存 logsumexp，降低 rescale、mask、bounds check 等开销
- 更高并行度：除 batch/head 外，进一步沿 sequence length 切分 thread block
- 前向并行：每个 thread block 处理一个 query row block，row block 之间无需通信
- 反向并行：按 column block 切分，使用 atomic add 聚合 \(\mathrm{d}Q\)
- Warp 分工改造：从 sliced-K 改为 sliced-Q，减少 warp 间共享内存读写和同步
- 新能力：支持 head dimension 到 256，并支持 MQA/GQA 的 key/value head 复用
- 实测收益：论文报告相比 FlashAttention 一代约 2 倍加速，在 A100 上达到更高比例理论峰值吞吐

#### 🔬 深入细节

![FlashAttention-2 官方博客图：FlashAttention 分块回顾](https://crfm.stanford.edu/static/img/posts/2023-07-17-flash2/flash_recap_diagram.png)
*图：来自 Stanford CRFM 官方 FlashAttention-2 博文。该图回顾 FlashAttention 如何用 tiling 与 softmax rescaling 避免读写完整注意力矩阵。*

![FlashAttention-2 官方博客图：sliced-K 到 sliced-Q 的 warp 分工变化](https://crfm.stanford.edu/static/img/posts/2023-07-17-flash2/flash_flash2_partitioning.png)
*图：来自 Stanford CRFM 官方 FlashAttention-2 博文。FlashAttention-2 将 warp 内分工从 sliced-K 改为 sliced-Q，以减少 shared memory 通信。*

```python
# FlashAttention-2 forward：更少非 matmul FLOPs + 更好的并行调度
parallel_for batch_id, head_id, q_block_id:
    Qi = load_sram(Q[batch_id, head_id, q_block_id])

    # 在片上维护未归一化输出，直到所有 KV block 扫完再除以 l。
    Oi_tilde = zeros(Br, d)
    mi = full(Br, -inf)
    li = zeros(Br)

    for kv_block_id in range(num_kv_blocks):
        Kj, Vj = load_sram(K[kv_block_id], V[kv_block_id])
        Sij = mma(Qi, Kj.T) * scale

        if causal and block_is_future(q_block_id, kv_block_id):
            continue
        Sij = apply_boundary_mask_if_needed(Sij)

        m_new = maximum(mi, rowmax(Sij))
        Pij = exp(Sij - m_new[:, None])
        li = exp(mi - m_new) * li + rowsum(Pij)
        Oi_tilde = exp(mi - m_new)[:, None] * Oi_tilde + Pij @ Vj
        mi = m_new

    Oi = Oi_tilde / li[:, None]
    L_i = mi + log(li)       # backward 只需要 logsumexp
    write_hbm(Oi, L_i)
```

FlashAttention-1 已经解决了“是否要把 \(S,P\) 写回 HBM”的关键问题，但它还没有把 GPU 用满。论文指出，A100 的 FP16/BF16 Tensor Core matmul 理论吞吐远高于普通 FP32 非 matmul 操作；因此即使非 matmul FLOPs 数量占比不大，实际耗时也可能明显拖慢 kernel。FA2 的第一层优化是算法层面的微调：不在每个 KV block 后都把输出归一化为最终 \(O\)，而是维护未归一化的 \(\tilde{O}\)，最后一次性除以 \(\ell\)。

对应地，FA2 的 online softmax 更新可以写成：

$$
m^{(j)}=\max(m^{(j-1)},\mathrm{rowmax}(S^{(j)})),
$$

$$
\ell^{(j)}=e^{m^{(j-1)}-m^{(j)}}\ell^{(j-1)}
+\mathrm{rowsum}(e^{S^{(j)}-m^{(j)}}),
$$

$$
\tilde{O}^{(j)}=e^{m^{(j-1)}-m^{(j)}}\tilde{O}^{(j-1)}
+e^{S^{(j)}-m^{(j)}}V^{(j)},\quad
O=\tilde{O}^{(T_c)}/\ell^{(T_c)}.
$$

这个变形减少了反复 rescale 的标量操作。FA2 还把前向保存的 \((m,\ell)\) 合并为 \(L=m+\log \ell\)，反向重算概率时直接用 \(P^{(j)}=\exp(S^{(j)}-L)\)。这样做没有改变输出，只是把更多时间留给 Tensor Core 友好的矩阵乘。

第二层优化是 thread block 级并行。FA1 的并行主要来自 batch 和 head：大致是 \(\text{batch size} \times \text{num heads}\) 个 thread block。长序列训练或张量并行后，batch/head 数可能很小，A100 这类 GPU 的很多 SM 会空闲。FA2 把 sequence length 也纳入调度：前向让不同 query row block 由不同 thread block 处理，由于各 row 的 attention 输出互不依赖，前向几乎无需跨 block 通信。反向则更适合按 column block 并行，因为 \(\mathrm{d}K,\mathrm{d}V\) 可在 column block 内累积，而共享的 \(\mathrm{d}Q\) 用 atomic add 汇总。

第三层优化发生在一个 thread block 内。FA1 常用 sliced-K：多个 warp 切 \(K,V\)，每个 warp 得到一部分中间结果，随后需要写 shared memory、同步、再归约。FA2 改为 sliced-Q：多个 warp 切 \(Q\)，共享同一份 \(K,V\)，每个 warp 负责不同 query 行的输出 slice。由于不同 query 行天然独立，warp 之间不必交换 partial output，减少了 shared memory traffic 和 barrier，同样提升了吞吐。

FA2 与 FA1 的关系可以概括为：FA1 是算法 IO 复杂度突破，FA2 是硬件执行效率补课。两者都避免物化 \(N \times N\) 注意力矩阵，也都保持 exact attention；FA2 额外关心“GPU 上哪些 FLOPs 贵”“SM 是否被填满”“warp 之间是否在等共享内存”。这也是为什么它在实际训练 GPT 类模型时能把 attention kernel 的吞吐推到更接近 GEMM 的区间。

> ⚠️ 注意：FlashAttention-2 的 sequence 维度并行与 Flash-Decoding 的 KV split 思路相关但目标不同。FA2 主要优化训练/prefill 中多 query 的前向和反向；Flash-Decoding 专门处理 decode 阶段 query length 等于 1 的小 batch 场景。

#### 🧪 练习题

```yaml
question: "FlashAttention-2 中 sliced-Q 分工相对 sliced-K 的主要好处是什么？"
options:
  - "把 exact attention 改成稀疏 attention"
  - "减少 warp 间 shared memory 写入、同步和归约"
  - "让模型不再需要 Value 矩阵"
  - "把序列长度复杂度从二次降为一次"
answer: 1
explain: "sliced-Q 让不同 warp 负责不同 query 行的输出 slice，共享 K/V 后无需跨 warp 合并 partial output，因此 shared memory 通信更少。"
```
