### Striped Attention: 条纹注意力 (Striped Attention)

```yaml
id: striped_attn
name: Striped Attention
full_name: 条纹注意力 (Striped Attention)
year: '2023'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2311.09431
category: attention
parent: ring_attn
motivation: 交错分配标记解决因果掩码负载不均
```

#### 📝 一句话总结

Striped Attention 在 Ring Attention 上交错分配 token，缓解因果掩码导致的设备负载不均，使长上下文分布式 attention 更接近均衡流水。

#### 🎯 核心要点

- 针对 causal attention 中前后序列块计算量不均的问题
- 将 token 以 striped/interleaved 方式分布到设备
- 让每个设备同时拥有早期和后期位置，平摊 mask 下可见 KV 数量
- 保持与 Ring Attention 兼容的环形通信
- 提升长上下文训练时的负载均衡和吞吐

#### 🔬 深入细节

![Striped Attention 核心示意图](https://ar5iv.labs.arxiv.org/html/2311.09431/assets/x1.png)
*图：Striped Attention 的交错 token 分配与负载均衡示意。*

```python
# Striped sequence assignment
for token_pos in range(seq_len):
    device = token_pos % num_devices
    local_shard[device].append(token_pos)

# then run ring attention over striped shards
for step in range(num_devices):
    recv_KV = ring_exchange(local_or_received_KV)
    compute_causal_attention_for_visible_pairs(local_Q, recv_KV)
```

##### 动机与背景

在 causal attention 中，靠前位置可见的历史少，靠后位置可见的历史多。如果按连续块切分，持有后半段的设备计算量更大，Ring Attention 的流水会被慢设备拖住。

##### 核心机制

Striped Attention 把 token 按交错方式分配到设备，使每个设备都包含不同时间位置的 token。这样 causal mask 下的可见 KV 数量在设备间更均匀，减少 straggler。

##### 训练/推理流程

先按 stripe 规则重排或分片序列，再执行类似 Ring Attention 的 K/V 环形通信。attention 计算仍遵守原始位置的 causal mask，只是物理分布更均衡。

##### 与传统方法的区别

Ring Attention 解决显存扩展，Striped Attention 进一步解决因果负载不均。它不改变模型数学，只改变分布式序列布局与调度。

#### 🧪 练习题

```yaml
question: "Striped Attention 主要解决 Ring Attention 的什么问题？"
options:
  - "因果掩码造成的设备负载不均"
  - "词表过大"
  - "无法读取图片"
  - "模型没有 Value"
answer: 0
explain: "交错分配 token 让每台设备的早晚位置混合，从而平摊 causal attention 计算量。"
```
