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

Flash-Decoding 将长上下文解码中的 attention 沿 KV 序列维度切分并行，解决 batch 小、query 长度为 1 时 FlashAttention 并行度不足的问题。

#### 🎯 核心要点

- 专门优化 decode 阶段的一 token query attention
- 把 KV 序列分块并由多个线程块并行计算 partial attention
- 对各 KV split 的 softmax 统计和输出做二阶段归约
- 在长上下文、小 batch 场景显著提升 GPU occupancy
- 与 FlashAttention 思路一致，仍计算 exact attention

#### 🔬 深入细节

![Flash-Decoding 核心示意图](https://crfm.stanford.edu/static/img/posts/2023-10-13-flashdecoding/parallelization_kv.gif)
*图：Stanford CRFM 官方 Flash-Decoding 博文中的 KV 维度并行化示意。*

```python
# Flash-Decoding two-stage attention
parallel_for kv_split in split(KV_cache):
    scores = q @ K[kv_split].T / sqrt(d)
    m = max(scores); l = sum(exp(scores - m))
    o = exp(scores - m) @ V[kv_split]
    write_partial(m, l, o)

# reduce splits with online softmax merge
m_global, l_global, O = merge_partials(partials)
```

##### 动机与背景

训练/prefill attention 有许多 query positions 可并行；decode 阶段通常只有一个 query token。即使 KV 很长，传统 kernel 也可能只用少量线程块，导致 GPU 空转。

##### 核心机制

Flash-Decoding 将同一个 query 对长 KV cache 的计算切成多个 KV splits。每个 split 独立计算局部最大值、归一化和局部输出；第二阶段用 online softmax 合并这些 partials，保证结果与完整 attention 一致。

##### 训练/推理流程

第一阶段大量线程块并行扫不同 KV 区间；第二阶段轻量归约 partial softmax statistics。KV 越长，可用的 split 越多，越能填满 GPU。

##### 与传统方法的区别

FlashAttention-2 已优化训练和 prefill，但 decode 小 batch 场景仍并行度不足。Flash-Decoding 专门沿序列维度切分 KV，是长上下文服务中的 decode kernel 补充。

#### 🧪 练习题

```yaml
question: "Flash-Decoding 主要沿哪个维度增加并行度？"
options:
  - "KV 序列长度维度"
  - "模型层数维度"
  - "词表字母顺序"
  - "数据集文件数"
answer: 0
explain: "它把长 KV cache 切成多个 split 并行处理，再合并 softmax 结果。"
```
