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

CacheGen 将可复用长上下文的 KV cache 编码成可网络传输的压缩 bitstream，并通过变更编码、分层量化、channel-layer 算术编码和加载控制器降低跨请求上下文加载的 TTFT。

#### 🎯 核心要点

- 面向 RAG 和多轮对话中“相同上下文被多个查询复用”的场景，避免每次都重新 prefill 长上下文
- KV encoder/decoder 将原始 KV 张量压缩为 bitstream，在线解码后喂回 LLM 以跳过上下文 attention 计算
- change-based encoding 利用邻近 token 在同层同 channel 上的 KV 数值局部性，以 anchor token 与 delta tensor 表示 chunk
- 层级量化按 transformer 层分配 bit，浅层更高精度、深层更激进压缩
- 算术编码按 channel-layer 建模符号分布，在压缩效率与概率表存储开销之间折中
- loading controller 根据上下文长度、网络带宽、解码开销和 TTFT 预算选择压缩等级，必要时回退到直接加载文本

#### 🔬 深入细节

![CacheGen 系统组件图](https://ar5iv.labs.arxiv.org/html/2310.07240/assets/x6.png)
*图：论文 Figure 6，CacheGen 由离线 KV encoder/decoder 与在线 context-loading controller 组成。*

```python
# CacheGen context KV encoding + loading 伪代码
def encode_context_kv(KV, chunk_size=10, levels=((8, 6, 4), (6, 4, 2))):
    # KV shape: [N_tokens, n_layers, n_channels]
    encoded_versions = {}
    for level in levels:
        bitstreams = []
        for chunk in chunks(KV, chunk_size):
            anchor = vectorwise_quantize(chunk[0], bits=8)
            anchor_decoded = dequantize(anchor)
            deltas = []
            for token_features in chunk[1:]:
                delta = token_features - anchor_decoded
                q_delta = layerwise_quantize(delta, bits=level)
                deltas.append(q_delta)
            stream = arithmetic_encode(anchor, deltas,
                                       prob_model="channel_layer")
            bitstreams.append(stream)
        encoded_versions[level] = bitstreams
    return encoded_versions

def load_context(encoded_versions, bandwidth, ttft_budget, text_context):
    candidates = estimate_transfer_decode_time(encoded_versions, bandwidth)
    level = choose_best_quality_under_budget(candidates, ttft_budget)
    if level is None or candidates[level].time > estimate_prefill(text_context):
        return prefill_from_text(text_context)
    compressed_stream = fetch_stream(encoded_versions[level])
    KV = decode_stream_while_fetching(compressed_stream)
    return resume_llm_with_past_key_values(KV)
```

CacheGen 关注的不是单机 GPU 内 KV cache 太大，而是长上下文服务里的“上下文加载”路径：某个文档、会话历史或检索结果已经被处理过，系统可以复用其 KV cache，但如果把 FP16 KV 直接从存储或远端节点取回，网络传输会成为新的 TTFT 瓶颈。论文把 KV cache 看成形状近似为 \([N,l,c]\) 的张量信号，其中 \(N\) 是 token 数、\(l\) 是层数、\(c\) 是 channel 数，并设计了专门的张量编码器。

第一个机制是 change-based encoding。CacheGen 发现同一 layer、同一 channel 上，邻近 token 的 KV feature 数值具有局部性。它把上下文切成 10 个连续 token 的 chunk，chunk 中第一个 token 是 anchor，用较高精度独立编码；后续 token 不直接编码 \(F_j\)，而是编码相对 anchor 解码值的 delta：

$$
\Delta F_j = F_j - F_i',\quad i=\text{anchor token}
$$

这里使用 anchor 而不是相邻 token 差分，有两个实际原因：多个 token 的 delta 可以并行压缩/解压；自然语言 token 的数值变化不像视频帧那样严格平滑，相对同一 anchor 的收益与相邻差分接近但系统更简单。

第二个机制是层级量化。CacheGen 不删除 token，因为离线压缩时还不知道未来用户 query，也就无法基于 query attention 判断哪些 token 可丢。它改用 quantization 降低每个元素 bit 数，并利用“浅层更敏感、深层更鲁棒”的经验规律分配精度：

$$
(b_{\text{shallow}},b_{\text{middle}},b_{\text{deep}})=(x,y,z),\quad x\ge y\ge z
$$

浅层保留更多 bit，因为浅层误差会继续传到后续层并影响高层语义；深层可以更激进压缩。anchor token 通常仍用 8-bit，因为 anchor 只占每个 chunk 的少数 token，但其误差会影响整个 chunk 的 delta 分布。

第三个机制是算术编码。量化后的符号还可以无损熵编码，但概率模型如果只用一个全局分布，会忽略不同层、channel 的统计差异；如果为每个 token-layer-channel 都建模，概率表开销又过大。CacheGen 的折中是为每个 channel-layer 组合分别维护 anchor 与 delta 的符号分布，共 \(l\times c\) 级别的分布，而不是 \(N\times l\times c\)。论文的微基准显示，相比全局符号分布，这种分组可显著降低 bitstream 大小。

在线加载由 controller 决策。系统可以在离线阶段为同一上下文生成多个压缩等级；当新请求到达时，控制器估计：

$$
T_{\text{load}}(q)=\frac{\operatorname{size}(q)}{\operatorname{bandwidth}}+T_{\text{decode}}(q)+T_{\text{H2D}}(q)
$$

并在 TTFT 预算内选择质量最高的压缩等级 \(q\)。如果上下文很短、带宽很低，或解码加传输比直接文本 prefill 更慢，controller 可以选择加载原始文本并重新计算 KV。这一点让 CacheGen 更像系统级 fast context loading 模块，而不是固定压缩率的张量 codec。

与 KIVI、GEAR 主要服务于 GPU 内存容量和 attention 读取带宽不同，CacheGen 的主战场是跨请求、跨节点、跨存储层移动 KV cache。论文报告在测试管线中可将 KV cache size 降低 3.5-4.3x，并将 fetching plus context processing 的总延迟降低 3.2-3.7x，同时对生成质量影响很小。它也与 GPU 内量化方法正交：CacheGen 可以先把可复用上下文变成可传输 bitstream，解码后再结合其他 KV cache 内存优化。

> 💡 关键：CacheGen 的“压缩”目标不是永久替代 KV cache，而是在请求到来前把上下文 KV 变成小而可流式传输的 bitstream，请求到来后尽快恢复到 LLM 可直接接续生成的 past key values。

#### 🧪 练习题

```yaml
question: "CacheGen 为什么按 channel-layer 而不是按全局分布做算术编码概率建模？"
options:
  - "channel-layer 分组能捕获 KV 符号分布差异，同时避免为每个 token 都存概率表"
  - "全局分布无法用于任何无损编码"
  - "channel-layer 分组会删除深层 token"
  - "这样可以绕过 LLM 的位置编码限制"
answer: 0
explain: "CacheGen 发现 channel 和 layer 的信息增益明显高于 token 位置；按 channel-layer 建模比全局分布更准，又比 token-layer-channel 细粒度建模省概率表。"
```
