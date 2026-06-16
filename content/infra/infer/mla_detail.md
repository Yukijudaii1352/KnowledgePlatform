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

MLA 用共享的低维 latent 向量联合压缩 Key/Value cache，并通过解耦 RoPE 保留位置信息，在接近多头注意力表达能力的同时显著降低长上下文解码显存占用。

#### 🎯 核心要点

- 低秩 KV 联合压缩：每个 token 缓存 \(\mathbf{c}^{KV}\)，而不是缓存所有 attention head 的完整 \(\mathbf{K},\mathbf{V}\)
- Query 也可低秩压缩：先得到 \(\mathbf{c}^{Q}\)，再上投影成各头 query，降低投影计算与参数冗余
- Decoupled RoPE：把带旋转位置编码的 query/key 分量与可吸收的 noPE 分量拆开，避免 RoPE 破坏低秩缓存吸收
- Cache 成本公式清晰：推理时主要缓存 \(d_c+d_h^R\) 维，而 MHA 需要 \(2n_hd_h\) 维
- 可与 FlashAttention 类 kernel 结合：score 侧通过权重吸收避免显式恢复完整多头 K，value 侧可先聚合 latent 再上投影
- DeepSeek-V2/V3/R1 系列高吞吐长上下文服务的核心 attention 结构之一

#### 🔬 深入细节

![MLA 与 MHA/GQA/MQA 对比图](https://arxiv.org/html/2405.04434v5/x4.png)
*图：DeepSeek-V2 技术报告 Figure 3，比较 MHA、GQA、MQA 与 MLA 的 KV cache 组织方式；MLA 将每个 token 的多头 K/V 联合压缩为 latent 表示。*

```python
# MLA prefill/decode sketch
def mla_project(h_t):
    c_q = W_DQ @ h_t                         # optional low-rank query compression
    q_nope = split_heads(W_UQ @ c_q)
    q_rope = split_heads(RoPE(W_QR @ c_q))

    c_kv = W_DKV @ h_t                       # latent KV written to cache
    k_nope = split_heads(W_UK @ c_kv)
    v_nope = split_heads(W_UV @ c_kv)
    k_rope = RoPE(W_KR @ h_t)                # decoupled positional key
    return q_nope, q_rope, c_kv, k_nope, v_nope, k_rope

cache.append(c_kv, k_rope)
for c_j, k_rope_j in cache:
    # In optimized inference, q_nope @ (W_UK @ c_j) can be computed as
    # ((W_UK.T @ q_nope) @ c_j), avoiding materializing full per-head K.
    k_nope_j, v_j = up_project(c_j)
    score_j = dot(concat(q_nope, q_rope), concat(k_nope_j, k_rope_j))
    probs_j = online_softmax(score_j)
output = sum_j(probs_j * v_j)
```

MLA 的 noPE 分量可概括为：

$$
\mathbf{c}_t^{KV}=W^{DKV}\mathbf{h}_t,\qquad
\mathbf{k}_t^C=W^{UK}\mathbf{c}_t^{KV},\qquad
\mathbf{v}_t^C=W^{UV}\mathbf{c}_t^{KV}
$$

Query 侧也使用低秩瓶颈：

$$
\mathbf{c}_t^Q=W^{DQ}\mathbf{h}_t,\qquad
\mathbf{q}_t^C=W^{UQ}\mathbf{c}_t^Q
$$

为兼容 RoPE，MLA 将位置相关分量单独拼接：

$$
\mathbf{q}_{t,i}=[\mathbf{q}_{t,i}^C;\mathbf{q}_{t,i}^R],\qquad
\mathbf{k}_{t,i}=[\mathbf{k}_{t,i}^C;\mathbf{k}_{t}^R]
$$

因此每个 token 的推理缓存由低维 latent 和共享 RoPE key 组成：

$$
\operatorname{Cache}_{MLA}\approx d_c+d_h^R,\qquad
\operatorname{Cache}_{MHA}=2n_hd_h
$$

动机上，MHA 的每个 token 每层都要缓存所有 head 的 K 和 V，长上下文解码时显存随 \(2\times n_h\times d_h\times L\) 线性增长，往往比模型权重本身更快成为服务瓶颈。MQA/GQA 通过减少 KV head 数缓解这个问题，但本质仍然保存显式 K/V，只是在 head 维共享。MLA 更进一步，把“缓存多少个 KV 头”改成“缓存一个能生成所有头 K/V 的低秩 latent”，从表示层面降低 cache 维度。

关键机制是权重吸收。对 noPE key 分量，有 \(\mathbf{k}_{j,i}^C=W_i^{UK}\mathbf{c}_j^{KV}\)，于是 score 中的内积可以改写为：

$$
(\mathbf{q}_{t,i}^C)^\top\mathbf{k}_{j,i}^C
=(\mathbf{q}_{t,i}^C)^\top W_i^{UK}\mathbf{c}_j^{KV}
=((W_i^{UK})^\top\mathbf{q}_{t,i}^C)^\top\mathbf{c}_j^{KV}
$$

这意味着推理时不一定要为历史 token 显式恢复每个 head 的 key；可以把 key 上投影矩阵吸收到 query 侧，用压缩 latent 直接参与打分。Value 侧也有类似线性结构：\(\sum_j p_j W_i^{UV}\mathbf{c}_j^{KV}=W_i^{UV}\sum_j p_j\mathbf{c}_j^{KV}\)，因此可以先在 latent 空间按注意力权重聚合，再映射到各 head 输出。这个线性吸收是 MLA 能在 cache 低维化后仍保持高效 kernel 实现的核心。

RoPE 需要单独处理，是因为旋转位置编码会让 query/key 的内积显式依赖 token 位置。若把带 RoPE 的 key 完全吸收到 \(\mathbf{c}^{KV}\) 或上投影权重里，权重就不再是位置无关的固定线性变换，低秩吸收会失效。DeepSeek 的 decoupled RoPE 把 key 拆成 noPE 的压缩分量 \(\mathbf{k}^C\) 与 RoPE 分量 \(\mathbf{k}^R\)：前者承担大部分内容表示并享受 latent cache 压缩，后者以较小维度保留相对位置建模能力。这样既避免完全移除位置编码，也避免为每个 head 缓存完整带 RoPE 的 K。

训练和推理流程上，MLA 对上层 Transformer 来说仍输出标准 attention 结果，不改变 residual、MLP 或 MoE 的接口。prefill 阶段可以并行计算所有 token 的 latent KV、RoPE key 和 query；decode 阶段每步只追加 \(\mathbf{c}^{KV}\) 与 \(\mathbf{k}^R\) 到 KV cache。attention kernel 读取历史 latent，计算 noPE score 与 RoPE score 的和，再执行 online softmax 与 value 聚合。与 GQA/MQA 相比，MLA 的 trade-off 是增加了上/下投影与更复杂 kernel，但换来更小 cache 和更接近 MHA 的多头表达。

#### 🧪 练习题

```yaml
question: "MLA 为什么需要 decoupled RoPE？"
options:
  - "因为 RoPE 的位置相关变换难以被低秩 KV latent 的固定线性上投影完全吸收"
  - "因为 MLA 不允许使用任何位置编码"
  - "因为 GQA 必须为每个 query head 保存独立 RoPE cache"
  - "因为 latent KV 只能用于训练，不能用于推理"
answer: 0
explain: "noPE 分量可以通过权重吸收直接使用 latent cache，而 RoPE 分量依赖位置，单独缓存小维度位置 key 可以兼顾压缩与位置表达。"
```
