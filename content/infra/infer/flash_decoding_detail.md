### Flash-Decoding: 闪电解码 (Flash-Decoding)

```yaml
id: flash_decoding
name: Flash-Decoding
full_name: 闪电解码 (Flash-Decoding)
year: '2023'
org: Stanford
paper_url: https://crfm.stanford.edu/2023/10/12/flash-decoding.html
category: attention
parent: flashattn_v2
motivation: 沿序列维度切分并行加速长文本解码
```

#### 📝 一句话总结

Flash-Decoding 针对长上下文自回归解码中 query length 通常为 1、batch 又较小导致 GPU 并行度不足的问题，沿 KV cache 的序列维度切分并行计算局部 attention，再用 log-sum-exp 归约得到 exact attention 输出。

#### 🎯 核心要点

- 专门优化 decoding：每步只生成一个 token，query length 通常为 1
- 新增并行维度：把 KV cache 沿 sequence length 拆成多个 split 并行读取
- 两阶段计算：第一阶段每个 split 独立做 attention，第二阶段归约 partial output
- 保持 exact attention：用每个 split 的 log-sum-exp 重新缩放贡献，不改变 softmax 结果
- 小 batch 友好：长上下文推理常因显存限制无法用大 batch，KV split 能补足 SM occupancy
- 与 FlashAttention 互补：prefill/training 仍适合 FA2，decode 长上下文场景使用 Flash-Decoding
- 官方可用性：Stanford CRFM 博文说明该方法已进入 FlashAttention 2.2 和 xFormers 相关路径
- 实测收益：官方博文报告长序列生成最高约 8 倍 end-to-end 加速，attention microbenchmark 最高约 50 倍

#### 🔬 深入细节

![Flash-Decoding 官方图：沿 KV 序列维度并行](https://crfm.stanford.edu/static/img/posts/2023-10-13-flashdecoding/parallelization_kv.gif)
*图：来自 Stanford CRFM 官方 Flash-Decoding 博文。Flash-Decoding 除 batch/query 维度外，还把 keys/values 的序列长度拆成多个并行 split，最后做小规模归约。*

![Flash-Decoding 官方图：长序列吞吐对比](https://crfm.stanford.edu/static/img/posts/2023-10-13-flashdecoding/performance.png)
*图：来自 Stanford CRFM 官方 Flash-Decoding 博文。长上下文 batch size 为 1 时，Flash-Decoding 随序列长度增长的生成速度下降更慢。*

```python
# Flash-Decoding：两阶段 decode attention
# q: 当前 token 的 query，形状约为 [num_q_heads, d]
# K_cache, V_cache: 历史 token 的 KV cache，沿 sequence 维度切成多个 split

# Stage 1: 每个 KV split 独立并行，写出少量 partial 结果。
parallel_for split_id in range(num_kv_splits):
    K_s = K_cache[split_id]                  # [split_len, d]
    V_s = V_cache[split_id]                  # [split_len, d]

    scores = q @ K_s.T / sqrt(d)
    m_s = max(scores, axis=-1)               # 局部最大值
    p_s_unnorm = exp(scores - m_s[..., None])
    l_s = sum(p_s_unnorm, axis=-1)           # 局部 exp 和
    o_s = p_s_unnorm @ V_s                  # 未按全局 softmax 归一化的局部输出

    write_partial(split_id, m_s, l_s, o_s)

# Stage 2: 用 online softmax / log-sum-exp 合并所有 split。
m = max_over_splits(m_s)
l = sum_over_splits(exp(m_s - m) * l_s)
O = sum_over_splits(exp(m_s - m)[..., None] * o_s) / l[..., None]
return O
```

自回归推理分成 prefill 和 decode 两个阶段。Prefill 处理整段 prompt，有很多 query token，因此 FlashAttention/FlashAttention-2 可以沿 batch、head 和 query block 获得足够并行度。Decode 阶段不同：模型一次只生成下一个 token，当前 query 长度通常是 1；虽然它需要 attend 到全部历史 KV cache，但传统 FlashAttention 调度主要按 batch 和 query 维度并行。如果 batch size 因长上下文显存压力被压到 1 或很小，即使上下文有 32K/64K token，也可能只有很少 thread block 在工作。

Flash-Decoding 的核心改动是把 KV cache 的序列长度也变成并行维度。设当前 query 为 \(q\)，历史 keys/values 被切成 \(S\) 个片段 \((K_s,V_s)\)。每个 split 独立计算局部分数：

$$
a_s=qK_s^\top/\sqrt{d},\quad
m_s=\max(a_s),\quad
\ell_s=\sum_t e^{a_{s,t}-m_s},\quad
\tilde{o}_s=\sum_t e^{a_{s,t}-m_s}v_{s,t}.
$$

第一阶段的每个 split 都可以由独立 thread block 或一组 thread block 处理，因此长 KV cache 会自然产生更多并行任务。关键是第一阶段只写出 \((m_s,\ell_s,\tilde{o}_s)\)，而不是把所有 attention scores 或概率写回 HBM；这延续了 FlashAttention 的 IO-aware 风格。

第二阶段负责把 split 级 softmax 合成全局 softmax。全局最大值为：

$$
m=\max_s m_s,
$$

全局归一化项为：

$$
\ell=\sum_s e^{m_s-m}\ell_s,
$$

最终输出为：

$$
o=\frac{\sum_s e^{m_s-m}\tilde{o}_s}{\ell}.
$$

这个公式与 FlashAttention 的 online softmax 合并本质一致：每个 split 在自己的数值尺度下计算指数和输出，归约时用 \(e^{m_s-m}\) 重新缩放到全局尺度。因此 Flash-Decoding 仍然是 exact attention，不会因为切分 KV cache 改变 softmax 结果。

与直接用 matmul primitives 的实现相比，Flash-Decoding 避免了多个 kernel 反复写读中间 attention 结果；与原始 FlashAttention decode 相比，它牺牲一个很小的最终 reduction kernel，换来按 KV 长度扩展的并行度。长上下文越长，可切出的 KV split 越多，越容易填满 GPU SM；当上下文较短时，额外归约开销可能不值得，因此实际系统通常根据问题规模在 FlashAttention 和 Flash-Decoding 之间调度。

在 MQA/GQA 模型中，多组 query heads 共享较少的 key/value heads，KV cache 更小，但 decode attention 仍要读完整历史。Flash-Decoding 与这种结构兼容：split 维度作用在共享的 KV 序列上，局部输出再映射到相应 query heads。官方博文以 CodeLLaMA-34B 场景为例，说明在 512 到 64K sequence length 的长上下文推理中，该方法能让 attention 时间更接近常数区间，从而改善 token/s。

> 💡 关键：Flash-Decoding 加速的是“单 token query 读长 KV cache”的场景。它不缩短上下文，也不跳过历史 token，而是把读 KV cache 这件事并行化，并用 log-sum-exp 保证合并后的 softmax 精确。

#### 🧪 练习题

```yaml
question: "Flash-Decoding 为什么需要在每个 KV split 写出 log-sum-exp 或等价的 softmax 统计量？"
options:
  - "用于训练奖励模型"
  - "用于把各 split 的局部 attention 输出重新缩放为全局 softmax 输出"
  - "用于删除 KV cache 中的旧 token"
  - "用于把模型权重量化到 int4"
answer: 1
explain: "不同 split 的局部 softmax 使用不同最大值和归一化项，最终归约必须用这些统计量恢复全局 softmax 的尺度。"
```
