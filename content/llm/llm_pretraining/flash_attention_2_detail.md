### FlashAttention-2

```yaml
id: flash_attention_2
name: FlashAttention-2
full_name: 'FlashAttention-2 (FlashAttention-2: Faster Attention)'
year: '2023'
org: Stanford
paper_url: https://arxiv.org/abs/2307.08691
category: training
parent: flash_attention
motivation: 优化并行度提升2倍速度
```

#### 📝 一句话总结

FlashAttention-2 在保持 FlashAttention 精确 IO-aware attention 的基础上，重写 work partitioning 和并行策略，减少非矩阵乘法 FLOPs 并提高 GPU occupancy。它解决的是 FlashAttention v1 虽然省 IO，但仍远低于 GEMM 峰值吞吐的问题。

#### 🎯 核心要点

- 继续使用分块 attention 和 online softmax，不改变 attention 数学定义
- 调整 online softmax 公式，减少 rescale、mask、bound-check 等 non-matmul 操作
- 前向在 sequence length 维度增加并行度，避免小 batch/少 head 时 SM 不满
- 反向也沿 sequence length 并行，减少单个 thread block 的工作串行度
- 改变 warp partitioning：前向中 split Q across warps，使 K/V 共享，降低 shared memory 往返
- 在 A100 上 attention forward+backward 通常约 2× 快于 FlashAttention，达到理论峰值 50-73%
- 成为长上下文训练、推理和后续 FlashAttention-3/4 的基础实现

#### 🔬 深入细节

![FlashAttention-2 forward 分块流程](https://ar5iv.labs.arxiv.org/html/2307.08691/assets/x1.png)
*图：FlashAttention-2 论文 Figure 1，展示 key/value 按块遍历、query block 独立计算和 online softmax 统计更新。*

```python
# FlashAttention-2 forward 高层伪代码
def flash_attention_2(Q, K, V):
    # 更多 thread blocks 并行覆盖 batch, heads, query blocks
    parallel_for (batch, head, q_block) in grid:
        q = load_Q_block(Q, batch, head, q_block)
        m = -inf
        l = 0
        acc = 0

        for k_block, v_block in stream_KV_blocks(K, V, batch, head):
            scores = q @ k_block.T
            scores = apply_causal_or_local_mask(scores)
            m_new = max(m, rowmax(scores))
            p = exp(scores - m_new)
            acc = acc * exp(m - m_new) + p @ v_block
            l = l * exp(m - m_new) + rowsum(p)
            m = m_new

        write_output(acc / l)
```

**动机与背景：省 IO 后，非 matmul 开始显眼。** FlashAttention v1 已经显著减少 HBM traffic，但 GPU 上 Tensor Core 的矩阵乘法吞吐远高于普通 FP32 标量操作。Attention kernel 中 softmax、rescale、mask、indexing、shared memory 同步等非矩阵乘法操作如果没有组织好，会让整体吞吐卡在远低于 GEMM 峰值的位置。

**核心机制一：减少 non-matmul FLOPs。** FlashAttention-2 重新整理 online softmax 更新，使每个 block 中的 rescale 和除法更少，尽量把工作集中到 \(QK^\top\) 和 \(PV\) 两个 Tensor Core 友好的矩阵乘法上。直觉上，GPU 最擅长大块 GEMM；算法要避免让昂贵的普通 FP32 操作夹在 GEMM 之间成为串行瓶颈。

**核心机制二：沿序列长度增加 thread block 并行。** FlashAttention v1 主要在 batch 和 head 维度并行；当 batch 小、head 数少、序列长时，SM 数可能不够饱和。FA2 让不同 query blocks 在 sequence dimension 上并行执行。由于每个 query block 的输出行独立，前向无需跨 block 通信，能自然提高 occupancy。

**核心机制三：更合理的 warp 级切分。** v1 中常见做法是 split K/V across warps，让不同 warp 产生中间结果后再在 shared memory 合并；FA2 改为 split Q across warps，让 K/V 对多个 warp 共享。这减少了中间结果的 shared memory read/write，也更符合 Tensor Core tile 的数据复用模式。

**与 FlashAttention v1 的关系：同一算法思想，更贴近硬件。** FA1 证明了 IO-aware exact attention 可行；FA2 证明了仅仅少读写还不够，kernel 内 work partitioning 决定能否接近 Tensor Core 峰值。后续 FA3/FA4 的异步流水和硬件特化，也是在这一方向上继续推进。

> 💡 关键：FlashAttention-2 的主要创新不是新的 attention 公式，而是让 exact attention 的计算分解更适合 GPU 并行层级。

#### 🧪 练习题

```yaml
question: "FlashAttention-2 相比 FlashAttention v1 的主要改进方向是什么？"
options:
  - "把精确 attention 改成低秩近似"
  - "减少非矩阵乘法开销，并改进 sequence/warp 维度并行划分"
  - "只支持 CPU 推理"
  - "删除 online softmax"
answer: 1
explain: "FA2 保持精确分块 attention，但通过并行度和 work partitioning 优化接近 Tensor Core 吞吐。"
```
