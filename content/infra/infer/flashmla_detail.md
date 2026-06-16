### FlashMLA: 闪电MLA内核 (FlashMLA)

```yaml
id: flashmla
name: FlashMLA
full_name: 闪电MLA内核 (FlashMLA)
year: '2025.02'
org: DeepSeek
paper_url: https://github.com/deepseek-ai/FlashMLA
category: attention
parent: mla
motivation: 针对Hopper优化的MLA高效解码内核
```

#### 📝 一句话总结

FlashMLA 是 DeepSeek 为 Multi-head Latent Attention 解码阶段实现的 Hopper 高性能内核，把 MLA 的压缩 KV cache、在线 softmax、split-K/分页调度和 Tensor Core/CUDA Core 重叠执行合到一个服务端可用的推理路径中。

#### 🎯 核心要点

- 面向 MLA decode 而非标准 MHA/GQA：服务 DeepSeek-V2/V3 系列中通过 latent KV cache 降低推理缓存占用的注意力结构。
- 官方仓库接口围绕 `get_mla_metadata` 和 `flash_mla_with_kvcache`：先为变长请求生成 tile scheduler metadata，再在每个解码 step 调用内核。
- 官方 deep-dive 指出 MLA decode 在 DeepSeek 配置下会变成 compute-bound：当 \(h_qs_q\ge128\) 时，Tensor Core 利用率比单纯 HBM 带宽更关键。
- 新版 kernel 使用 seesaw schedule：在一个输出矩阵寄存器预算内处理两个 KV blocks，拆分 \(O_L/O_R\) 和 \(V_L/V_R\)，交错两个 warpgroup 的 Tensor Core 与 CUDA Core 工作。
- 使用细粒度 TMA copy-GEMM pipeline：一个 \(64\times576\) K block 拆成 9 次 \(64\times64\) TMA copy，数据块一就绪就启动对应 GEMM。
- 结合 cache hint、Programmatic Dependent Launch 和 tile scheduler，平衡 SM 任务并重叠 `splitkv_mla` 与 `combine` 内核。
- 官方 README 报告 dense MLA decoding 在 H800 SXM5、CUDA 12.8 上可达 memory-bound 约 3000 GB/s、compute-bound 约 660 TFLOPS。

#### 🔬 深入细节

![FlashMLA seesaw 调度图](https://raw.githubusercontent.com/deepseek-ai/FlashMLA/refs/heads/main/docs/assets/MLA%20Kernel%20Sched.drawio.svg)
*图：DeepSeek 官方 FlashMLA deep-dive 中的 MLA kernel schedule。该项目没有独立论文图，图源为官方仓库 `docs/assets/MLA Kernel Sched.drawio.svg`。*

```python
# Host-side decode loop exposed by the official FlashMLA API.
tile_scheduler_metadata, num_splits = get_mla_metadata(
    cache_seqlens=cache_seqlens,
    s_q_times_h_q_over_h_kv=s_q * h_q // h_kv,
    h_kv=h_kv,
    h_q=h_q,
    is_fp8=is_fp8_kvcache,
    topk=topk,                  # optional sparse token selection
)

for layer in decoder_layers:
    q = layer.project_query(hidden_states)
    out, lse = flash_mla_with_kvcache(
        q, kvcache[layer], block_table, cache_seqlens, dv,
        tile_scheduler_metadata, num_splits,
        is_causal=True,
        is_fp8_kvcache=is_fp8_kvcache,
        indices=selected_token_indices,
    )
```

MLA 的模型侧动机是压缩 KV cache。典型写法是把每个 token 的 hidden state \(h_t\) 下投影成 latent cache，再在注意力中恢复 key/value 的有效表示：

$$
c_t^{KV}=W^{DKV}h_t,\quad
k_t^C=W^{UK}c_t^{KV},\quad
v_t^C=W^{UV}c_t^{KV}
$$

RoPE 部分通常单独保留或拼接：

$$
k_t=[k_t^C;\,k_t^R],\quad
o_t=\operatorname{Softmax}\left(\frac{q_t k_{\le t}^{\top}}{\sqrt{d}}\right)v_{\le t}
$$

FlashMLA 的价值在于把这个模型结构收益转成内核收益。标准 FlashAttention 假设 \(K,V\) 已经按 MHA/GQA 的常规 head 布局存在，而 MLA decode 的 cache 更像压缩/吸收后的大维度 MQA 表示。官方 README 的支持矩阵把 dense decoding 标成 SM90、MQA、BF16；FP8 KV cache 格式还把每个 token 的 NoPE 部分量化存放，并保留 RoPE 部分为 BF16 以保证精度。因此内核既要做 attention，又要适配 DeepSeek 推理系统真实使用的 cache layout、block table、变长 batch 和可选 sparse indices。

官方 deep-dive 的理论分析解释了为什么这个 decode kernel 不只是 memory-bound。设 query head 数为 \(h_q\)，每请求 query token 数为 \(s_q\)，KV 长度为 \(s_k\)，key/value 维度为 \(d_k,d_v\)。一次 decode 的 FLOPs 与访存近似为：

$$
F\approx2h_qs_qs_k(d_k+d_v),\quad
B\approx2s_kd_k,\quad
\frac{F}{B}\approx h_qs_q\frac{d_k+d_v}{d_k}\approx2h_qs_q
$$

在 DeepSeek 的在线推理配置中，decode instance 不做 tensor parallel，\(h_q=128\)。因此即使 \(s_q=1\)，\(h_qs_q\) 也达到官方分析中的 compute-bound 阈值，优化目标从“少读 HBM”变成“让 Tensor Core 持续忙、同时隐藏 CUDA Core softmax 与 TMA copy 延迟”。

seesaw schedule 是新版 FlashMLA 的关键。由于一个 \(64\times512\) 输出矩阵需要 32768 个 32-bit registers，而一个 SM 只有 65536 个 32-bit registers，不能像 FA-3 ping-pong 那样同时放两个完整输出矩阵。FlashMLA 每步取两组 KV block \(K_0,K_1,V_0,V_1\)，把输出拆成 \(O_L,O_R\)，把 value 拆成 \(V_{0L},V_{0R},V_{1L},V_{1R}\)，在两个 warpgroup 间交错计算：

```python
# Simplified seesaw-style online softmax update.
m = -float("inf")
l = 0.0
O_L, O_R = 0.0, 0.0

for K0, V0, K1, V1 in paired_kv_blocks:
    S0 = q @ K0.T / qk_scale
    S1 = q @ K1.T / qk_scale

    m0 = max(m, max(S0))
    a0 = exp(m - m0)
    P0 = exp(S0 - m0)
    O_L = O_L * a0 + P0 @ V0.left
    l = l * a0 + sum(P0)
    m = m0

    m1 = max(m, max(S1))
    a1 = exp(m - m1)
    P1 = exp(S1 - m1)
    O_R = O_R * a1 + P1 @ V1.right
    O_L = O_L * a1 + P1 @ V1.left
    O_R = O_R + (P0 * a1) @ V0.right
    l = l * a1 + sum(P1)
    m = m1

O = concat(O_L, O_R) / l
```

这个伪代码省略了寄存器归属和 TMA 细节，但保留了数学直觉：它仍是 FlashAttention 的 online softmax，只是把输出矩阵左右拆分后，用一个输出矩阵预算模拟 ping-pong 重叠。这样 Tensor Core 做 \(qK^\top\) 和 \(PV\) 时，CUDA Core 可以处理 max/exp/rescale；当数据不再需要时立即发 TMA，把内存访问也塞进流水。

最后，FlashMLA 还处理服务端内核常见的调度问题。细粒度 TMA copy 把 \(64\times576\) 的 K block 拆成 9 个 \(64\times64\) copy，使 GEMM 不必等整个 block 到齐；cache hint 提升 L2 命中；Programmatic Dependent Launch 用于重叠 `splitkv_mla` 和 `combine`；tile scheduler 把 request/block 工作分配到 SM，缓解不同上下文长度造成的负载不均。相比只描述 MLA 架构，FlashMLA 的重点是这些低层调度把压缩 KV cache 的理论优势落实成 decode 吞吐。

#### 🧪 练习题

```yaml
question: "官方 FlashMLA deep-dive 为什么认为 DeepSeek 配置下的 MLA decode 可能是 compute-bound？"
options:
  - "因为 FLOPs/byte 近似为 2h_qs_q，DeepSeek decode 中 h_q=128，使 Tensor Core 计算成为主要瓶颈"
  - "因为 MLA 完全不访问 KV cache，所以没有内存流量"
  - "因为 decode 阶段不需要 softmax，因此只剩矩阵乘"
  - "因为 FlashMLA 把所有请求固定成相同长度，消除了调度开销"
answer: 0
explain: "官方分析给出 FLOPs/byte 约为 2h_qs_q；DeepSeek decode 不做 tensor parallel，h_q=128，达到 H800 上的 compute-bound 阈值。"
```
