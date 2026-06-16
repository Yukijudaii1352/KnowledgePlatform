### FlashAttention-3: 闪电注意力3代 (FlashAttention-3)

```yaml
id: flashattn_v3
name: FlashAttention-3
full_name: 闪电注意力3代 (FlashAttention-3)
year: '2024'
org: Stanford
paper_url: https://arxiv.org/abs/2407.08691
category: attention
parent: flashattn_v2
motivation: 针对Hopper架构实现异步计算重叠
```

#### 📝 一句话总结

FlashAttention-3 针对 NVIDIA Hopper 的 WGMMA、TMA 和 FP8 Tensor Core 重新设计 exact attention kernel，用异步流水把数据搬运、矩阵乘和 softmax 交叠起来，解决 FlashAttention-2 在 H100 上利用率不足的问题。

#### 🎯 核心要点

- Hopper 专用 exact attention：继承 FlashAttention 的 IO-aware 分块与在线 softmax，不近似注意力结果
- Producer/Consumer warp-group 分工：producer 通过 TMA 异步搬运 Q/K/V，consumer 通过 WGMMA 执行两个 attention GEMM
- Pingpong scheduling：两个 consumer warp-group 交替执行 GEMM 与 softmax，使一个 warp-group 的 softmax 隐藏在另一个 warp-group 的 WGMMA 后台计算中
- 2-stage/3-stage WGMMA-softmax pipeline：跨 K/V tile 打破局部依赖，把第二个 GEMM 与下一轮 softmax 交叠
- FP8 路径：通过块量化、in-kernel transpose 和 incoherent processing 缓解低精度布局与离群值量化误差
- 论文报告 FP16 forward 在 H100 上达到最高约 740 TFLOPs/s、约 75% 理论峰值，FP8 forward 接近 1.2 PFLOPs/s

#### 🔬 深入细节

![FlashAttention-3 pingpong scheduling](https://arxiv.org/html/2407.08608v2/extracted/5728672/figs/pingpong_pipelining.png)
*图：FlashAttention-3 论文 Figure 1，两个 consumer warp-group 采用 pingpong 调度，将一个 warp-group 的 softmax 安排在另一个 warp-group 的 GEMM 执行期间。注：worker 元信息中的 arXiv ID 保持原样；本图与方法细节来自官方 FlashAttention-3 论文 arXiv:2407.08608v2。*

```python
# FlashAttention-3 forward kernel sketch, CTA-level view
for q_block in partition(Q):
    m = full([rows(q_block)], -inf)       # row-wise running max
    l = zeros([rows(q_block)])            # row-wise running denominator
    o = zeros([rows(q_block), head_dim])  # unnormalized output accumulator

    producer.tma_prefetch(q_block, K[0], V[0])
    for j in range(num_kv_blocks):
        producer.tma_prefetch_async(K[j + 1], V[j + 1])  # fill circular SMEM buffer

        # Consumer warp-groups issue asynchronous WGMMA.
        s_j = consumer.wgmma(q_block, K[j].T) * scale
        p_j, m, l = online_softmax_update(s_j, m, l)

        # Pingpong / 2-stage pipeline overlaps this PV GEMM with another stage's softmax.
        o = rescale_old_o_and_accumulate(o, p_j, V[j], m, l)

        producer.release_consumed_stage(j)
    O[q_block] = o / l[:, None]
```

标准注意力仍然是：

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

FlashAttention 系列的关键是按 K/V block 在线更新 softmax，而不是把完整 \(S=QK^\top\) 和 \(P=\operatorname{softmax}(S)\) 写回 HBM。对第 \(j\) 个 K/V block，设 \(S_j=Q_iK_j^\top/\sqrt{d}\)，行级统计量可写成：

$$
m_j=\max(m_{j-1}, \operatorname{rowmax}(S_j))
$$

$$
\ell_j=e^{m_{j-1}-m_j}\ell_{j-1}+\operatorname{rowsum}\left(e^{S_j-m_j}\right)
$$

$$
O_j=e^{m_{j-1}-m_j}O_{j-1}+e^{S_j-m_j}V_j,\qquad
O=O_T/\ell_T
$$

动机上，FlashAttention-2 已经通过更好的 work partitioning 改善了 A100 上的并行度，但它仍基本遵循同步执行模型。Hopper H100 新增的 WGMMA 是 warp-group 级异步矩阵乘，TMA 是 global memory 到 shared memory 的专用异步搬运单元；如果 kernel 仍按“加载完再算、算完再 softmax”的串行节奏执行，就会让 Tensor Core、TMA 和执行指数函数的 multi-function unit 互相等待。论文指出 FA-2 在 H100 上约只有 35% 理论峰值利用率，而 optimized GEMM 可达到更高利用率，因此 FA-3 的核心不是改 attention 数学，而是把 exact attention 重新映射到 Hopper 的异步硬件模型上。

核心机制第一层是 warp specialization。一个 CTA 内的 warp-group 被分为 producer 和 consumer：producer 主要负责 TMA load，把 Q/K/V tile 放进多阶段 circular shared-memory buffer；consumer 主要负责 WGMMA、online softmax 和输出累加。Hopper 的 `setmaxnreg` 允许给 producer 少分寄存器、给 consumer 多分寄存器，从而让 GEMM 累加器和 softmax 中间量留在寄存器中。这个设计把“谁搬数据、谁做矩阵乘、谁等待 barrier”固定下来，使 TMA load 不必阻塞 WGMMA 的发射，下一块 K/V 在当前块计算时已经进入 shared memory。

核心机制第二层是 GEMM-softmax overlap。注意力 forward 每个 K/V block 至少包含两个 GEMM：\(QK^\top\) 得到 score，softmax 后再乘 \(V\)。softmax 的指数函数吞吐远低于 Tensor Core GEMM，尤其在 FP8 路径中 GEMM 更快，softmax 更容易成为可见瓶颈。FA-3 的 pingpong scheduling 用两个 consumer warp-group 交替推进：warp-group 1 做某一轮 GEMM 时，warp-group 2 执行上一轮 softmax；随后角色交换。论文还提出 2-stage pipeline，在单个 warp-group 内跨迭代保存额外中间量，使第 \(j\) 轮的第二个 WGMMA 与第 \(j+1\) 轮的 softmax 局部重叠。代价是寄存器压力上升，因此 block size、pipeline stage 数和 occupancy 需要通过 profiling 折中。

FP8 路径的难点不只是把输入转成 8 bit。Hopper FP8 WGMMA 对 operand layout 有更严格要求，例如第二个 GEMM 需要适配 k-major 布局，而 attention kernel 中 \(P\) 的 FP32 accumulator layout 与 FP8 operand layout 并不天然一致。FA-3 通过 producer warp-group 中的 LDSM/STSM 做 tile 级 in-kernel transpose，并用 byte permute 调整 accumulator 到下一次 WGMMA 可接受的布局。为了降低离群激活导致的量化误差，论文使用 block quantization，并借鉴 QuIP 类方法做 incoherent processing：对 Q/K 施加随机符号 Hadamard 变换，把少数大幅值特征“摊开”到多个维度，再进行 FP8 量化。

与 FA-2 相比，FA-3 的区别在于优化边界从“减少 HBM IO 与更好划分线程块”推进到“算法-内核-硬件异步调度协同”。它仍然计算 exact softmax attention，在线 softmax 的数学语义没有改变；改变的是执行图：TMA load、WGMMA、softmax、PV GEMM 被安排成多层流水，让 Hopper 的专用单元更少空转。这个思路也解释了为什么 attention kernel 会随 GPU 代际重写：同一组公式在 Ampere 与 Hopper 上的最优执行顺序并不相同。

#### 🧪 练习题

```yaml
question: "FlashAttention-3 相比 FlashAttention-2 最核心的新增优化是什么？"
options:
  - "利用 Hopper 的 WGMMA/TMA 异步能力，把数据搬运、GEMM 和 softmax 流水重叠"
  - "把 softmax attention 改成稀疏近似 attention"
  - "只减少 Transformer 层数来降低计算量"
  - "把 KV cache 全部移动到 CPU 内存"
answer: 0
explain: "FA-3 保持 exact attention 语义，主要贡献是面向 Hopper 的异步 warp-specialized pipeline、GEMM-softmax overlap 和 FP8 低精度路径。"
```
