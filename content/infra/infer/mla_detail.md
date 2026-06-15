### MLA: 多头潜在注意力 (Multi-Head Latent Attention)

```yaml
id: mla
name: MLA
full_name: 多头潜在注意力 (Multi-Head Latent Attention)
year: '2024.05'
org: DeepSeek
paper_url: https://arxiv.org/abs/2405.04434
category: attention
parent: gqa
motivation: KV低秩压缩大幅降低缓存显存占用
```

#### 📝 一句话总结

MLA 用低秩 latent KV 表示替代显式多头 K/V cache，并通过解耦 RoPE 分量保留位置表达，在保持多头注意力能力的同时大幅降低解码缓存。

#### 🎯 核心要点

- 将 Key/Value 压缩为共享 latent vector 写入 KV cache
- 查询时由 latent 表示上投影恢复各头所需 K/V
- 解耦带 RoPE 的 key 分量，避免位置编码与低秩吸收冲突
- 相比 MHA/GQA/MQA 进一步降低每 token cache 大小
- DeepSeek-V2/V3 系列长上下文高效推理的核心注意力设计

#### 🔬 深入细节

![MLA 核心示意图](https://arxiv.org/html/2405.04434/x1.png)
*图：DeepSeek-V2 技术报告中的 MLA 架构图，展示 latent KV 压缩与恢复。*

```python
# MLA decode sketch
c_kv = W_down_kv(x_t)            # compressed latent cache
k_rope = W_k_rope(x_t)           # positional key part
KV_cache.append(c_kv, k_rope)

q = W_q(x_t)
for cached_c, cached_rope in KV_cache:
    k_nope, v = up_project(cached_c)
    k = concat(k_nope, apply_rope(cached_rope))
    score = q @ k
out = softmax(scores) @ values
```

##### 动机与背景

GQA/MQA 通过减少 KV 头数降低 cache，但仍保存显式 K/V。大模型长上下文下，KV cache 仍是服务成本核心。MLA 进一步问：能否缓存更低维的潜在表示，而不是缓存每个头的完整 K/V。

##### 核心机制

MLA 对 K/V 做低秩联合压缩，缓存 \(c^{KV}\) latent；计算注意力时再通过上投影获得各头的 key/value。由于 RoPE 位置编码难以被简单吸收到低秩 latent 中，MLA 将位置相关 key 分量单独保存或处理。

##### 训练/推理流程

prefill/decode 时每个 token 写入 compressed latent 和必要的 RoPE key 分量。attention kernel 读取 latent，按需恢复 K/V 或重排权重以避免显式恢复过大张量。输出仍进入标准多头 attention 聚合。

##### 与传统方法的区别

MQA/GQA 是共享 KV 头，MLA 是压缩 KV 表示本身。它在质量上接近多头注意力，同时 cache 成本更低，是 DeepSeek 系列区别于常规 GQA 模型的重要结构。

#### 🧪 练习题

```yaml
question: "MLA 降低 KV cache 的核心方式是什么？"
options:
  - "缓存低维 latent KV 而非完整多头 K/V"
  - "删除所有 Key"
  - "只保留第一个层"
  - "关闭位置编码"
answer: 0
explain: "MLA 将 K/V 联合压缩到 latent 表示，并在注意力时恢复或等效使用。"
```
