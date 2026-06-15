### FlashAttention-4

```yaml
id: flash_attention_4
name: FlashAttention-4
full_name: FlashAttention-4 (FlashAttention-4 for Blackwell)
year: '2026.03'
org: Together AI
paper_url: https://tridao.me/blog/2026/flash-attention-4/
category: training
parent: flash_attention_2
motivation: Blackwell架构71%硬件利用率
```

#### 📝 一句话总结

FlashAttention-4 针对 NVIDIA Blackwell 的非对称硬件扩展重新设计 attention kernel，用异步 MMA、TMEM、2-CTA MMA、软件指数和条件 softmax rescaling 重叠 matmul、softmax 与内存瓶颈。它在 B200 BF16 上达到约 1605-1613 TFLOPs/s、约 71% 利用率，解决了 Tensor Core 变快后 SFU 和 shared memory 成为新瓶颈的问题。

#### 🎯 核心要点

- 正确官方博客地址为 https://tridao.me/blog/2026/flash4/，论文为 arXiv:2603.05451
- 面向 Blackwell B200/GB200 的 TMEM、5th-gen async tensor cores 和 2-CTA MMA
- 前向使用 ping-pong Q tiles 和两个 softmax warpgroups，最大化 MMA 与 softmax overlap
- 用 FMA 多项式近似分担部分 \(2^x\) 指数计算，缓解 MUFU/SFU 吞吐瓶颈
- 条件 online softmax rescaling 只在 running max 变化超过阈值时重缩放，减少非 matmul 操作
- 反向把中间 \(P^T,dS^T\) 放入 TMEM，并用 2-CTA MMA 降低 shared memory traffic 与 dQ atomic adds
- 使用 CuTe-DSL/Python 实现，保持底层表达力同时显著缩短编译迭代时间

#### 🔬 深入细节

![FlashAttention-4 前向流水线](https://tridao.me/assets/img/2026-03-05-flash4/fa4_fwd_pipeline.png)
*图：Tri Dao 官方博客中的 FlashAttention-4 forward pipeline，展示 ping-pong Q tiles、softmax warpgroups 和 correction stage。Manifest 的 blog 路径已失效，正文使用官方正确路径 /blog/2026/flash4/ 与 arXiv:2603.05451 补足。*

```python
# FlashAttention-4 forward 高层伪代码
def fa4_forward_blackwell(Q, K, V):
    for cta in schedule_lpt_tiles(Q, K):
        # 两个 Q tile 交替推进，MMA 输出进入 TMEM
        q_hi, q_lo = load_two_q_tiles(cta)
        state_hi = init_online_softmax()
        state_lo = init_online_softmax()

        for k_tile, v_tile in stream_kv_tiles(K, V):
            async_mma_tmem(q_hi, k_tile)  # QK^T for high tile
            softmax_lo = softmax_warpgroup(state_lo, exp_mode="mufu+fma")
            maybe_correction_rescale(state_lo, threshold=tau)

            async_mma_tmem(q_lo, k_tile)  # QK^T for low tile
            softmax_hi = softmax_warpgroup(state_hi, exp_mode="mufu+fma")
            maybe_correction_rescale(state_hi, threshold=tau)

            async_mma_tmem(softmax_hi, v_tile)  # PV
            async_mma_tmem(softmax_lo, v_tile)

        write_normalized_outputs(state_hi, state_lo)
```

**动机与背景：Blackwell 的瓶颈从 GEMM 转移到周边单元。** 从 H100 到 B200，BF16 Tensor Core 峰值大幅增加，但 shared memory bandwidth 和指数单元吞吐没有同等增长。Attention 不是纯 GEMM；它还要做 softmax、mask、归一化、数据搬运和调度。FA4 的 roofline 分析指出，前向常被指数计算卡住，反向常被 shared memory traffic 卡住，因此单纯复用 FA2/FA3 pipeline 会留下大量硬件性能。

**核心机制一：前向把 softmax 藏在 MMA 后面。** Blackwell 的 MMA 异步写入 TMEM，使 tensor core 工作不再强依赖寄存器累加器。FA4 让一个 CTA 同时处理两个 Q tile，交替发射 \(QK^\top\) 和 \(PV\) MMA；当一个 tile 做 tensor core 计算时，另一个 tile 的 softmax warpgroup 读取 TMEM 结果并做 max/sum/exp。这样 softmax 不再完全串在两次 matmul 之间。

**核心机制二：软件指数和条件 rescaling 减少非 matmul 路径。** softmax 需要大量 \(e^x\)，但 MUFU.EX2 吞吐有限。FA4 将一部分 \(2^x\) 用 FMA 上的多项式近似计算，利用空闲 ALU 分担 MUFU 压力。online softmax 的传统更新每次 running max 改变都要 rescale 旧输出；FA4 只在 \(m_j-m_{j-1}>\tau\) 时立即 rescale，否则延迟到最终归一化：

$$
O_j =
\begin{cases}
e^{m_{j-1}-m_j}O_{j-1}+e^{S_j-m_j}V_j, & m_j-m_{j-1}>\tau\\
O_{j-1}+e^{S_j-m_{j-1}}V_j, & \text{otherwise}
\end{cases}
$$

**核心机制三：反向用 TMEM 和 2-CTA MMA 降低共享内存压力。** Backward 需要重算 \(S,P\)，并执行 \(dV,dK,dQ\) 等五类 MMA。FA4 把 \(P^T\) 和 \(dS^T\) 直接放在 TMEM 中作为后续 MMA operand，避免在 shared memory 中反复写读。Blackwell 的 2-CTA MMA 让两个 CTA 协作一个大 tile，各自 staging 一半 operand，减少 B operand 的共享内存流量，并顺带减少 dQ 的全局 atomic reductions。

**与 FA2/FA3 的区别：面向 Blackwell 的算法-内核协同。** FA2 主要优化并行划分，FA3 面向 Hopper 做异步和 warp specialization；FA4 则把 Blackwell 新增的 TMEM、UMMA 和 2-CTA mode 作为算法设计约束。它不只是“换一代 GPU 重新调参”，而是改变 softmax、rescale、backward dataflow 和 scheduler 的配合方式。

> 💡 关键：FA4 的本质是把 attention 中所有非 GEMM 瓶颈重新排进 Blackwell 的异步执行缝隙里。

#### 🧪 练习题

```yaml
question: "FlashAttention-4 在 Blackwell 上重点缓解了哪些新瓶颈？"
options:
  - "Tokenizer 训练和词表合并"
  - "前向指数/softmax 吞吐与反向 shared memory traffic"
  - "CPU 文件读取"
  - "模型参数初始化"
answer: 1
explain: "Blackwell Tensor Core 更快后，attention 的 SFU 指数计算和 shared memory 访问成为主要限制，FA4 围绕这些瓶颈重排流水线。"
```
