### MQA: 多查询注意力 (Multi-Query Attention)

```yaml
id: mqa
name: MQA
full_name: 多查询注意力 (Multi-Query Attention)
year: '2019'
org: Google
paper_url: https://arxiv.org/abs/1911.02150
category: kv_cache
parent: —
motivation: 共享Key/Value头减少带宽压力
```

#### 📝 一句话总结

MQA 让所有 Query 头共享同一组 Key/Value 头，在基本保留多头查询表达能力的同时显著减少自回归解码的 KV cache 带宽。它解决的是增量解码中注意力层被历史 K/V 读写而非计算量限制的问题。

#### 🎯 核心要点

- 共享 Key/Value 投影：多个 Query heads 只写入一份 K/V cache
- KV cache 大小从随头数线性增长降到近似单头规模
- Query 仍保持多头，输出端仍可组合多个查询子空间
- 重点优化低延迟在线生成的 memory bandwidth 瓶颈
- 为 GQA、MLA 和后续 KV cache 优化提供结构基础

#### 🔬 深入细节

![MQA 核心示意图](https://arxiv.org/html/extracted/5314337/images/gmq_architecture.png)
*图：GQA 论文中的 MHA/MQA/GQA 对比图，其中 MQA 展示多个 Query 头共享单组 Key/Value。*

```python
# Multi-Query Attention 解码
for token in generated_tokens:
    q_heads = W_q(token).reshape(num_q_heads, head_dim)
    k = W_k(token)     # 单个共享 K head
    v = W_v(token)     # 单个共享 V head
    K_cache.append(k); V_cache.append(v)
    for h in range(num_q_heads):
        score = q_heads[h] @ K_cache.T / sqrt(head_dim)
        out[h] = softmax(score) @ V_cache
    y = W_o(concat(out))
```

##### 动机与背景

标准 MHA 在每层、每个头都维护独立 K/V。训练时这增加表达能力，但 decode 阶段每步只处理一个新 token，矩阵乘规模很小，反复从显存读取历史 K/V 成为主瓶颈。上下文越长、头数越多，cache 带宽压力越高。

##### 核心机制

MQA 只共享 K/V，不共享 Q。若 MHA 的缓存近似为 \(2HLd\)，MQA 改为 \(2Ld\)，其中 \(H\) 是头数、\(L\) 是上下文长度、\(d\) 是单头维度。每个 Query 头仍独立计算注意力分数，但读取同一份 K/V。

##### 训练/推理流程

prefill 阶段把输入序列编码成共享 K/V cache；decode 阶段每个新 token 只追加一组 K/V，然后所有 Query 头分别与共享历史 K/V 做标准 causal attention。数学输出仍是 exact attention 的一种参数化，不需要近似 softmax。

##### 与传统方法的区别

MQA 不是剪枝或量化，而是改变注意力头的参数共享方式。它用较少 K/V 子空间换取更低缓存和带宽，适合服务端推理；GQA 则在 MQA 和 MHA 之间引入多个 KV 组，弥补纯 MQA 的质量损失。

#### 🧪 练习题

```yaml
question: "MQA 降低解码带宽的主要原因是什么？"
options:
  - "减少 Transformer 层数"
  - "让多个 Query 头共享 Key/Value cache"
  - "把 softmax 改为 ReLU"
  - "删除输出投影矩阵"
answer: 1
explain: "MQA 的核心是所有 Query 头共享一份 K/V，使历史 cache 的存储和读取不再随头数线性增长。"
```
