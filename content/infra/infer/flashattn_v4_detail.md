### FlashAttention-4: 闪电注意力4代 (FlashAttention-4)

```yaml
id: flashattn_v4
name: FlashAttention-4
full_name: 闪电注意力4代 (FlashAttention-4)
year: '2026.03'
org: Tri Dao
paper_url: https://arxiv.org/abs/2603.05451
category: attention
parent: flashattn_v3
motivation: 算法与内核协同设计适配Blackwell
```

#### 📝 一句话总结

FlashAttention-4 面向 NVIDIA Blackwell 的非对称硬件扩展重新设计 exact attention 的前向、反向和调度流水，核心目标是让 Tensor Core 翻倍后的算力不再被 shared memory、exp 单元和全局原子累加拖住。

#### 🎯 核心要点

- 延续 FlashAttention 的 exact attention 与 IO-aware 思路：不物化 \(N\times N\) attention 矩阵，仍用 tile 与 online softmax 计算精确结果。
- 针对 Blackwell B200/GB200 的硬件变化：Tensor Core BF16/FP16 吞吐显著提升，但 shared memory 带宽、MUFU exp 吞吐和普通 ALU 没有同比例提升。
- 前向使用新的 ping-pong Q-tile pipeline：每个 CTA 交替处理 high/low 两个 128-token query tile，并通过 TMEM 把 MMA、softmax 和 output correction 解耦。
- 用软件模拟 exponential 和条件 softmax rescaling 降低非矩阵乘开销：部分 \(2^x\) 由 FMA 多项式近似完成，不完全依赖 MUFU。
- 反向重新组织五个 MMA 和 elementwise softmax 梯度，利用 Blackwell tensor memory 与 2-CTA MMA mode 减少 shared memory traffic。
- 2-CTA backward 通过 DSMEM 交换半个 \(dS\) tile，让 \(dQ\) 的双倍 reduction 在 CTA pair 内完成，并将 \(dQ\) 全局 atomic add 数量减半。
- 对 causal mask 和 varlen attention 使用 LPT/SPT 风格调度，缓解 worktile 长短不一导致的 SM 负载不均。
- 论文报告在 B200 BF16 上达到最高 1613 TFLOPs/s、约 71% 理论利用率，相比 cuDNN 9.13 最高 \(1.3\times\)、相比 Triton 最高 \(2.7\times\)。
- 实现完全基于 Python 内嵌的 CuTe-DSL，避免传统 C++ template kernel 的长编译周期，论文报告编译时间降低约 \(20\)-\(30\times\)。

#### 🔬 深入细节

![FlashAttention-4 前向流水图](https://arxiv.org/html/2603.05451v1/Figures/FA4_FWD_p3.png)
*图：论文 Figure 1。FlashAttention-4 前向 pipeline 中，high/low 两个 128-token Q tile 交替执行，MMA、softmax 和 correction stage 被拆开重叠。*

```python
# High-level FlashAttention-4 forward pipeline on Blackwell.
for q_hi, q_lo in paired_query_tiles(size=128):
    state_hi = OnlineSoftmaxState()
    state_lo = OnlineSoftmaxState()

    prefetch_kv_async(next_kv_tile)          # TMA/async path
    for kv in lpt_or_causal_schedule(kv_tiles):
        S_hi = async_mma(q_hi, kv.K, dst="TMEM")
        S_lo = async_mma(q_lo, kv.K, dst="TMEM")

        P_hi = softmax_warpgroup(S_hi, state_hi, exp_impl="mufu+fma_poly")
        P_lo = softmax_warpgroup(S_lo, state_lo, exp_impl="mufu+fma_poly")

        # Output correction can be separated because P travels through TMEM.
        maybe_rescale_output_if_max_changed(state_hi)
        maybe_rescale_output_if_max_changed(state_lo)

        state_hi.O += async_mma(P_hi, kv.V, dst="TMEM")
        state_lo.O += async_mma(P_lo, kv.V, dst="TMEM")

    store(normalize(state_hi.O, state_hi.lse), normalize(state_lo.O, state_lo.lse))
```

基础 attention 目标没有改变：

$$
O=\operatorname{Softmax}\left(\frac{QK^\top}{\sqrt d}+M\right)V
$$

FlashAttention-4 的出发点是 roofline 已经变了。Hopper 上 FA-3 的重点是异步执行和 warp specialization；Blackwell 上 Tensor Core 更快，B200 的 FP16/BF16 Tensor Core 吞吐约为 H100 的两倍，但 shared memory、MUFU exponential、整数/浮点 ALU 的扩展慢得多。论文指出，在典型 attention workload 中，非 MMA 资源会比 MMA 计算多占 \(25\%\)-\(60\%\) 时间，因此只把 FA-3 kernel 搬到 Blackwell 会把瓶颈暴露在 softmax、shared memory traffic 和原子累加上。

前向 pipeline 的关键是用 Blackwell 的 fully asynchronous MMA 和 256 KB tensor memory。FA-4 每个 CTA 同时考虑 \(Q^H,Q^L\) 两个 128-token query tile；MMA 结果写入 TMEM，softmax warpgroup 从 TMEM 取整行做 max、exp、sum，另设 correction warpgroup 处理 online softmax 的输出 rescale。与 FA-3 相比，\(\mathbf P\) 不再必须经寄存器文件传递，输出 rescale 可以从关键路径拆出去，MMA 与 softmax 之间的重叠空间更大。

online softmax 仍维护行最大值和归一化因子：

$$
m_{\text{new}}=\max(m,\max S),\quad
\alpha=\exp(m-m_{\text{new}})
$$

$$
O_{\text{new}}=\alpha O+\exp(S-m_{\text{new}})V,\quad
\ell_{\text{new}}=\alpha\ell+\sum_j\exp(S_j-m_{\text{new}})
$$

FA-4 额外做了条件 rescaling：如果新的 tile 没有改变 running max，或变化不需要立即校正，就尽量跳过中间 rescale，把最终输出写成：

$$
\text{Output}=\frac{1}{\ell_{\text{final}}}O_{\text{final}}
$$

这样可以减少非 MMA 指令和寄存器压力，但仍保持 exact attention 的数值语义。

exp 是另一个瓶颈。Blackwell 上 MUFU 每 SM 每周期的 exp 能力远低于 Tensor Core MMA；而 softmax 每行都要大量 exp。FA-4 对 \(2^x\) 做范围分解：

$$
2^x=2^{\lfloor x\rfloor}2^{x-\lfloor x\rfloor}
$$

整数部分可通过 IEEE 754 exponent bit 操作高效构造，分数部分用 FMA 计算多项式近似：

$$
2^{x_{\mathrm{frac}}}\approx\sum_{i=0}^{n}p_i x_{\mathrm{frac}}^i,\quad x_{\mathrm{frac}}\in[0,1)
$$

论文没有把所有 exp 都改成软件模拟，而是只对一部分元素使用 FMA polynomial，其余继续用 `MUFU.EX2`。这样能把 exp 工作分摊到 FMA 单元，避免全量模拟带来的寄存器占用、寄存器带宽和延迟反噬。

反向更复杂，因为 FlashAttention backward 每个 tile 要重算 \(\mathbf S\)，再计算 \(\mathbf{dP},\mathbf{dV},\mathbf{dS},\mathbf{dQ},\mathbf{dK}\)，共五个 MMA 加 elementwise softmax 梯度。论文的 roofline 分析在 \(M=N=d=128\) 时给出 1-CTA backward 的 shared memory 总时间约 3328 cycles，高于 MMA compute 的 2560 cycles，说明 shared memory 已成主瓶颈。FA-4 因此用 TMEM 存中间 accumulator，并调整 pipeline 让上一轮的 \(dQ/dK\) MMA 与当前轮的 softmax/elementwise 工作重叠。

2-CTA backward 是 Blackwell 专属优化。CTA pair 用 \(M=256,N=K=128\) 的 MMA tile 共同工作，输出在 M 维切分，每个 CTA 只保留自己的 accumulator slice。对 \(dQ\) 来说 reduction 轴天然跨两块 \(dS\)，所以 FA-4 用 DSMEM 在同 cluster 的两个 CTA 间交换半个 \(dS\) tile，使每个 CTA 拥有 \((M/2)\times2N\) 的 operand 并完成双倍 reduction：

$$
dQ=dS\,K,\quad
dK=dS^\top Q,\quad
dV=P^\top dO
$$

这样不仅减少 shared memory operand traffic，也让每个 CTA 只写半个 \(dQ\) tile，全局 atomic reductions 数量随之减半。确定性 backward 仍需要 semaphore lock 序列化 reduction；FA-4 通过 causal 场景下的 SPT 顺序和 batch/head swizzle 减少等待。

最后，FA-4 把调度当成算法的一部分。causal 和 varlen attention 的 worktile mainloop 长度不同，按自然顺序会让 SM 先处理短任务、后处理长任务，尾部拖慢 makespan。论文使用 Longest Processing Time first 思路：causal 中按 batch 外层、head 分段、mblock 逆序遍历；varlen 中可预处理并缓存 virtual-to-actual batch mapping，让长 context 或 decode-heavy batch 优先进入 attention kernel。这些调度不改变 attention 公式，却直接影响 Blackwell 上的端到端利用率。

#### 🧪 练习题

```yaml
question: "FlashAttention-4 面向 Blackwell 的核心瓶颈变化是什么？"
options:
  - "Tensor Core 变得更快后，shared memory、exp 单元和原子累加等非 MMA 资源成为主要限制"
  - "Blackwell 不支持 Tensor Core，因此必须退回普通 CUDA Core"
  - "注意力矩阵必须完整写入 HBM，无法再使用 tiling"
  - "causal mask 被删除，模型只能做双向 attention"
answer: 0
explain: "FA-4 的主要贡献是围绕 Blackwell 的非对称扩展重排 pipeline、exp、backward 和调度，让 exact attention 不被非 MMA 资源限制。"
```
