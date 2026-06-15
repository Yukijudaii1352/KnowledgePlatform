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

FlashAttention-2 在保持 exact attention 的基础上重写并行化策略，减少非矩阵乘操作并改进线程块/warp 分工，使 GPU 利用率显著高于 FlashAttention-1。

#### 🎯 核心要点

- 减少 rescale、mask、bounds check 等非 matmul FLOPs
- 并行化维度从 batch/head 扩展到 sequence length
- 改进 warp 级 work partition，降低共享内存同步
- 前向和反向都采用更高效的 block 调度
- 在 A100/H100 上接近更高比例的理论峰值吞吐

#### 🔬 深入细节

![FlashAttention-2 核心示意图](https://ar5iv.labs.arxiv.org/html/2307.08691/assets/figs/flash_attention_diagram.png)
*图：FlashAttention-2 对 FlashAttention 分块计算和并行策略的改进。*

```python
# FlashAttention-2 simplified schedule
parallel_for (batch, head, q_block):
    # split long sequence over multiple thread blocks when needed
    for kv_block in scheduled_kv_blocks(q_block):
        acc = mma_tile(Q[q_block], K[kv_block])
        update_online_softmax(acc)
        O_partial += softmax_tile @ V[kv_block]
    reduce_partials_if_sequence_parallel()
```

##### 动机与背景

FlashAttention-1 解决了 IO 问题，但实际 GPU 吞吐仍受并行度不足和非 matmul 操作比例影响。短 batch、长序列或少头场景下，仅按 batch/head 并行可能无法填满 GPU。

##### 核心机制

FA-2 把更多工作放到 Tensor Core 友好的矩阵乘上，减少每 tile 的额外标量操作；同时允许沿序列维度切分，多个线程块共同处理一个 head 的长序列，再合并 partial results。

##### 训练/推理流程

kernel 调度根据序列长度、head 数和硬件资源选择 block 划分。每个 block 执行局部 online softmax 和 O 累积；当同一 query block 被多个 kv split 处理时，再做归约合并。

##### 与传统方法的区别

FA-1 的重点是 IO-aware 算法，FA-2 的重点是更高硬件利用率。数学结果仍是 exact attention，但 kernel 工程和并行策略更接近 GPU 峰值。

#### 🧪 练习题

```yaml
question: "FlashAttention-2 相比一代的主要提升点是什么？"
options:
  - "更好的 GPU 并行策略和更少非 matmul 开销"
  - "改为近似注意力"
  - "删除反向传播"
  - "只支持短序列"
answer: 0
explain: "FA-2 主要通过序列维度并行、warp 分工和减少额外操作提升硬件利用率。"
```
