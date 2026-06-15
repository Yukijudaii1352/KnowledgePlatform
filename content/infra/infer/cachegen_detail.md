### CacheGen: 缓存生成 (CacheGen)

```yaml
id: cachegen
name: CacheGen
full_name: 缓存生成 (CacheGen)
year: '2023'
org: Univ of Chicago
paper_url: https://arxiv.org/abs/2310.07240
category: kv_cache
parent: —
motivation: 通过流式传输与张量编码降低TTFT
```

#### 📝 一句话总结

CacheGen 将可复用上下文的 KV cache 压缩为可流式传输的比特流，用差分编码、层级量化和通道级熵编码降低远端加载 KV 带来的 TTFT。

#### 🎯 核心要点

- 面向 RAG/多轮对话中的上下文复用和 KV 传输
- 差分编码利用相邻 token KV 的局部性
- 层级量化给浅层更多 bit、深层更激进压缩
- 通道级算术编码利用 layer-channel 分布一致性
- 在线控制器根据带宽和 TTFT 预算选择压缩等级

#### 🔬 深入细节

![CacheGen 核心示意图](https://ar5iv.labs.arxiv.org/html/2310.07240/assets/x1.png)
*图：CacheGen 的离线 KV 编码和在线流式加载架构。*

```python
for chunk in split(kv_cache, chunk_size):
    anchor = quantize(chunk[0], bits=8)
    deltas = [chunk[i] - chunk[i-1] for i in range(1, len(chunk))]
    q = layerwise_quantize(deltas, bits=(x, y, z))
    bitstream = arithmetic_encode(q, channel_model)
    store(anchor, bitstream)

level = controller.choose(bandwidth, ttft_budget)
stream_decode(cachegen_file[level])
```

##### 动机与背景

长上下文应用常重复使用同一文档或历史。如果每次请求重新 prefill，TTFT 高；如果直接传输 FP16 KV cache，网络和存储开销又过大。CacheGen 把 KV cache 当作可压缩张量信号，而不是只能本地保存的临时状态。

##### 核心机制

差分编码让相邻 token 的 KV 差值更集中；层级量化利用浅层更敏感、深层更鲁棒的事实分配 bit；通道级算术编码为每个 layer-channel 建概率模型，进一步逼近熵下界。

##### 训练/推理流程

系统可离线为常用上下文生成多个压缩等级。请求到达时，控制器估计传输时间和解码时间，在满足 TTFT 预算下选择质量最高等级，并边传输边恢复 KV cache。

##### 与传统方法的区别

CacheGen 不丢 token，也不改模型；它优化的是 KV cache 跨请求、跨节点移动。与 H2O/Scissorhands 的 token pruning 正交，也可与 KIVI/GEAR 的量化思想组合。

#### 🧪 练习题

```yaml
question: "CacheGen 使用差分编码的原因是什么？"
options:
  - "相邻 token KV 具有局部性，差值熵更低"
  - "为了删除所有 anchor"
  - "为了让模型从头训练"
  - "为了替代 HTTP"
answer: 0
explain: "差分后数值更集中，后续量化和算术编码更高效。"
```
