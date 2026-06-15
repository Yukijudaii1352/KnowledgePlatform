### DISTFLASHATTN

```yaml
id: distflashattn
name: DISTFLASHATTN
full_name: DISTFLASHATTN (Distributed Memory-efficient Attention)
year: '2026'
org: 学术界
paper_url: https://arxiv.org/abs/2310.03294
category: distributed
parent: flash_attention_2
motivation: Token级负载均衡百万上下文
```

#### 📝 一句话总结

DISTFLASHATTN 将 FlashAttention 扩展到序列维度分布式训练，通过 token/worker 级负载均衡、KV 通信与计算重叠、以及 rematerialization-aware checkpointing，在保持精确注意力的同时支持 32K 到 512K 级长上下文训练。

#### 🎯 核心要点

- 沿 sequence dimension 把一个长序列的 tokens 均匀切到 \(P\) 个 worker，每个 worker 只保存 \(N/P\) 个 query/key/value 激活
- 继承 FlashAttention 的 IO-aware blockwise 计算方式，每次只流式拉取一个远端 \(K,V\) chunk，而不是本地 materialize 全部 \(K,V\)
- 针对 causal attention 的天然三角工作量不均衡，使用 helper worker 计算后段 worker 的部分 attention block，并回传 partial output 与 softmax statistics
- 使用独立通信 stream 预取远端 key/value，使 P2P 通信与当前 attention block 计算重叠
- 将 checkpoint 边界移动到 FlashAttention 输出处，避免 HuggingFace 式 layer-level checkpointing 触发额外一次 FlashAttention forward recomputation
- 通信分析中 DISTFLASHATTN 每轮约 \(3Nd\) 通信量，Megatron-LM 在 checkpointing 下约 \(14Nd\)，理论通信量降低约 4.7x
- 与 FSDP 正交：DISTFLASHATTN 降低长序列 activation/attention 显存，FSDP 分片模型权重、梯度和优化器状态

#### 🔬 深入细节

![DISTFLASHATTN 序列并行与负载均衡](https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x1.png)
*图：论文 Figure 1，左侧为序列维度切分，右侧展示 causal attention 负载均衡前后的 bubble。*

![DISTFLASHATTN 通信计算重叠](https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x2.png)
*图：论文 Figure 2，worker 7 在计算当前 attention block 时用通信 stream 预取下一块远端 KV。*

![Rematerialization-aware checkpointing](https://ar5iv.labs.arxiv.org/html/2310.03294/assets/x4.png)
*图：论文 checkpointing 对比，将 checkpoint 放在 FlashAttention 输出处，避免重复执行 attention forward。*

```python
# Balanced DISTFLASHATTN forward 伪代码，简化自论文 Algorithm 1/2
def distflashattn_worker(p, Q_p, K_p, V_p, world_size):
    O_p = zeros_like(Q_p)
    stats_p = init_softmax_stats(Q_p)  # m, l 等在线 softmax 统计量

    # 先计算本地 token chunk 的注意力
    O_p, stats_p = flash_attn_block(Q_p, K_p, V_p, O_p, stats_p)

    # causal attention 中只需要访问当前 worker 及更早 worker 的 KV
    for t in range(1, world_size // 2 + 1):
        remote = (p - t) % world_size

        if p > t:
            # owner worker: 预取远端 KV，并与当前计算重叠
            K_r, V_r = async_recv_kv(remote)
            wait_until_ready(K_r, V_r)
            O_p, stats_p = flash_attn_block(Q_p, K_r, V_r, O_p, stats_p)

            # 如果有 helper 替自己算了部分 block，合并 partial output 和 softmax stats
            if has_helper_result(p, t):
                O_h, stats_h = recv_partial_result(helper_rank(p, t))
                O_p, stats_p = rescale_and_merge(O_p, stats_p, O_h, stats_h)
        else:
            # helper worker: 利用空闲时间替后段 worker 计算一块 attention
            owner = owner_rank_for_helper(p, t)
            Q_owner = recv_query(owner)
            O_part, stats_part = flash_attn_block(Q_owner, K_p, V_p, zeros(), init_stats())
            send_partial_result(owner, O_part, stats_part)

    return O_p, stats_p
```

**动机与背景：长上下文训练同时卡在 attention 激活和并行维度上。** 单卡 FlashAttention 已经把 attention 的峰值显存从显式 \(N^2\) softmax 矩阵降到线性级别，但当 \(N\) 到 128K、512K 时，单卡仍无法容纳完整序列激活。Megatron-LM 这类张量并行通常按 attention heads 切分，但并行度受 head 数限制；GQA/MQA 或少头模型尤其难继续扩展。DISTFLASHATTN 改为沿 token 序列切分，最大并行度随上下文长度增长，更适合长上下文。

**核心 attention 公式保持精确，只改变 KV 的放置和流式访问。** 第 \(p\) 个 worker 持有 \(Q_p,K_p,V_p \in \mathbb{R}^{N/P \times d}\)。在 causal attention 下，它需要计算：

$$
O_p =
\operatorname{Softmax}\left(\frac{Q_p [K_1,\ldots,K_p]^T}{\sqrt{d}}\right)
[V_1,\ldots,V_p]
$$

朴素做法会把所有历史 \(K,V\) 都 gather 到本地，重新制造巨大的显存压力。DISTFLASHATTN 利用 FlashAttention 的 blockwise 特性，每次只拉取一个远端 \(K_r,V_r\) chunk，执行一次局部 attention，并维护在线 softmax 的 \(m,l\) statistics 来正确合并不同 block 的 partial output。这样每个 worker 常驻的远端 KV 只是一块，而不是整条序列。

**负载均衡来自 causal mask 的三角结构。** 在序列切分后，越靠后的 worker 需要 attend 的历史 chunk 越多；第一个 worker 很快完成本地块后空闲，最后一个 worker 最忙。未均衡时 idle fraction 近似趋近 \(1/2\)。论文让早完成的 worker 作为 helper，为后段 worker 计算部分 attention block，并把 partial output 与 softmax statistics 回传给 owner。owner 用 `rescale` 合并结果，保持与自己顺序执行所有 block 相同的数值语义。

**通信计算重叠把远端 KV 传输隐藏在 FlashAttention kernel 后面。** 每个 worker 在计算当前 \(Q_p,K_r,V_r\) block 时，可以在另一个 CUDA/NCCL stream 上预取下一块 \(K,V\)。由于 FlashAttention block 的计算量随 \(N/P\) 和 \(d\) 增长，长序列下有足够计算时间覆盖 P2P 传输。这个设计不是减少通信字节本身，而是减少通信暴露在 critical path 上的时间。

**Rematerialization-aware checkpointing 解决了 FlashAttention 与传统 checkpoint 的冲突。** 常见 layer-level checkpointing 在反向时会重算整个 Transformer layer，其中包括 FlashAttention forward；而 FlashAttention backward 内部本来就会为了省显存重算 softmax block。若仍按层边界 checkpoint，就会多做一次 attention forward。DISTFLASHATTN 将 checkpoint 边界移动到 FlashAttention 输出：后续 FFN 需要重算时使用该输出，FlashAttention backward 也直接使用它，从而每层少一次 attention forward recomputation，且不改变数值结果。

**与 Megatron-LM、Ring Attention 和 FSDP 的关系。** Megatron-LM 的 sequence/tensor 并行在长上下文下会产生多次 all-gather/reduce-scatter，且受 head 数约束；Ring Attention/Ring Self-Attention 也沿序列传播 KV，但论文指出其对 causal workload 和 FlashAttention 兼容性优化不足。DISTFLASHATTN 关注 activation 和 attention 的长序列瓶颈；FSDP 关注模型状态分片。因此两者可组合：FSDP 让权重/优化器状态不爆显存，DISTFLASHATTN 让百万级上下文的 attention 激活不爆显存。

> 💡 关键：DISTFLASHATTN 不是近似稀疏注意力；它仍计算精确 causal attention，只是把序列分布到多个 worker，并用 FlashAttention 的在线 softmax 统计量合并跨 worker block。

#### 🧪 练习题

```yaml
question: "DISTFLASHATTN 为什么需要 token/worker 级负载均衡？"
options:
  - "因为 causal attention 中后段 token 需要看更多历史 token，后段 worker 工作量更大"
  - "因为每个 worker 的模型参数数量不同"
  - "因为 FlashAttention 只能在 CPU 上执行"
  - "因为训练数据需要按类别重新采样"
answer: 0
explain: "序列维度切分后，causal mask 形成三角计算量；越靠后的 worker attend 的历史 KV 越多，因此需要 helper worker 减少空闲 bubble。"
```
