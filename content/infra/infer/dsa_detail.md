### DSA: DeepSeek稀疏注意力 (DeepSeek Sparse Attention)

```yaml
id: dsa
name: DSA
full_name: DeepSeek稀疏注意力 (DeepSeek Sparse Attention)
year: '2026'
org: DeepSeek
paper_url: https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
category: attention
parent: nsa
motivation: 混合架构减90%KV缓存
```

#### 📝 一句话总结

DSA 在 DeepSeek-V4-Pro 技术报告中落地为 CSA + HCA 的混合压缩稀疏注意力：先把长历史压缩成更少的 KV 入口，再用稀疏选择、强压缩和局部窗口共同支撑 1M-token 上下文的低 FLOPs、低 KV cache 推理。

#### 🎯 核心要点

- 官方 DeepSeek-V4-Pro 模型卡与技术报告将混合注意力定义为 Compressed Sparse Attention (CSA) + Heavily Compressed Attention (HCA)
- CSA 先以压缩率 \(m\) 将连续 token 聚合成 compressed KV entries，再沿用 DSA 式轻量 indexer 在压缩入口上执行 top-k 稀疏选择
- HCA 使用更大的压缩率 \(m'\gg m\)，把大范围历史强压缩后执行共享 KV 的 MQA，不再做稀疏 top-k
- CSA/HCA 都补充 sliding-window KV entries，弥补压缩块内当前 token 无法访问同块近邻信息的问题
- 注意力内部采用低秩 query 生成、shared key-value MQA、grouped output projection、RMSNorm、partial RoPE 和 attention sink 等稳定性/效率设计
- 官方报告给出的 1M-token 场景收益：DeepSeek-V4-Pro 相比 DeepSeek-V3.2 只需 27% single-token inference FLOPs 和 10% KV cache

#### 🔬 深入细节

![DeepSeek-V4 官方效率图](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/main/assets/dsv4_performance.png)
*图：DeepSeek-V4-Pro 官方模型卡中的性能/效率图；右侧展示 DeepSeek-V4 系列相对 DeepSeek-V3.2 的 single-token FLOPs 与累计 KV cache 优势。*

```python
# DeepSeek-V4 hybrid sparse attention sketch: CSA + HCA
def csa_layer(h, top_k, m, window):
    # Compressed Sparse Attention
    C = h @ W_KV                         # token-level KV entries
    Z = h @ W_Z                          # token-level compression weights
    C_comp = overlapped_weighted_compress(C, Z, rate=m, positional_bias=B)

    K_I_comp = compress_indexer_keys(h, rate=m)
    c_q = h_t @ W_DQ                     # low-rank query latent
    q_index = c_q @ W_IUQ                # indexer query heads
    w_index = h_t @ W_w                  # per-indexer-head gates

    scores = []
    for s, k_s in enumerate(K_I_comp[:floor(t / m)]):
        scores.append(sum(w_index[j] * relu(dot(q_index[j], k_s))
                          for j in range(num_index_heads)))
    sparse_ids = topk(scores, top_k)
    C_sparse = gather(C_comp, sparse_ids)

    local = uncompressed_recent_kv(h, window)
    q_core = c_q @ W_UQ
    return grouped_output_projection(mqa(q_core, key_value=C_sparse + local))

def hca_layer(h, m_prime, window):
    # Heavily Compressed Attention
    C = h @ W_KV
    Z = h @ W_Z
    C_comp = non_overlapped_weighted_compress(C, Z, rate=m_prime, positional_bias=B)
    local = uncompressed_recent_kv(h, window)
    q_core = (h_t @ W_DQ) @ W_UQ
    return grouped_output_projection(mqa(q_core, key_value=C_comp + local))
```

DeepSeek-V4 的公开资料不是一篇只介绍“DSA”的独立论文，而是 DeepSeek-V4-Pro 模型卡和技术报告。报告中的混合注意力可以理解为 DeepSeek 稀疏注意力路线的工程化版本：CSA 保留 DSA 的“轻量 indexer + top-k 选择”思想，但把被选择对象从原始 token 改成压缩后的 KV entries；HCA 则进一步用更强压缩覆盖超长历史，降低 KV cache 规模。这样做的核心取舍是：精确 token 级历史太贵，压缩入口上的稀疏选择在信息保留和推理成本之间更可控。

CSA 的第一步是构造压缩 KV。报告给出 token-level KV 和压缩权重：

$$
C=H W_{KV},\quad Z=H W_Z
$$

随后每个压缩入口由一段 KV 按 learned compression weights 和 positional bias 加权得到。对于 HCA 的非重叠强压缩，公式更直接：

$$
S_{m'i:m'(i+1)-1}=\operatorname{Softmax}_{row}(Z_{m'i:m'(i+1)-1}+B)
$$

$$
C_i^{\mathrm{Comp}}=\sum_{j=m'i}^{m'(i+1)-1} S_j\odot C_j
$$

其中 \(m'\) 是 HCA 的压缩率，\(\odot\) 是逐元素乘法。CSA 的压缩形式与此类似，但使用较小 \(m\) 且带重叠压缩，所以有效上把序列长度压到原来的 \(1/m\)，同时降低块边界造成的信息损失。压缩后的入口既是 attention key，也是 value，这是后续 shared key-value MQA 的基础。

CSA 的稀疏选择由 lightning indexer 完成。它先用低秩方式生成 indexer queries：

$$
\mathbf{c}^Q_t=\mathbf{h}_t W_{DQ},\quad
[\mathbf{q}^I_{t,1};\ldots;\mathbf{q}^I_{t,n_h^I}]=\mathbf{c}^Q_t W_{IUQ}
$$

再从 hidden state 得到每个 indexer head 的权重 \(\mathbf{w}^I_t=\mathbf{h}_t W_w\)，对第 \(s\) 个压缩块打分：

$$
I_{t,s}=\sum_{h=1}^{n_h^I} w^I_{t,h}\cdot
\operatorname{ReLU}(\mathbf{q}^I_{t,h}\cdot K^{IComp}_s)
$$

最终保留 top-k 压缩 KV 入口：

$$
C_t^{\mathrm{SprsComp}}=\{C_s^{\mathrm{Comp}}\mid I_{t,s}\in\operatorname{TopK}(I_{t,:})\}
$$

这与 HISA 论文中回顾的 DSA 接口一致：indexer 输出一个稀疏集合，后端 sparse MLA/MQA 只对该集合做核心 attention。差别在于 DeepSeek-V4 的 CSA 把集合元素换成 compressed KV entries，从而同时减少索引长度、attention FLOPs 和 KV cache 体积。

核心 attention 采用 shared key-value MQA。对第 \(i\) 个 query head，CSA 的核心计算可以写成：

$$
\mathbf{o}_{t,i}=\operatorname{CoreAttn}(
\mathrm{query}=\mathbf{q}_{t,i},
\mathrm{key}=C_t^{\mathrm{SprsComp}},
\mathrm{value}=C_t^{\mathrm{SprsComp}})
$$

HCA 则把 \(C^{\mathrm{Comp}}\) 整体作为 key/value 做 MQA，不再先 top-k。它适合承载更远的大范围历史：压缩率 \(m'\) 很大，单个入口信息更粗，但由于入口数量少，可以用密集方式扫过强压缩历史。CSA 更像“可检索的压缩历史”，HCA 更像“全局强摘要通道”，两者和局部窗口一起覆盖不同时间尺度。

滑动窗口不是附属细节。为了严格因果，压缩块 attention 只允许 query 看见之前的压缩块；这意味着 query 不能直接访问与自己同一个压缩块内的近邻 token，而语言建模中近邻通常最重要。因此 CSA 和 HCA 都额外加入最近 \(n_{win}\) 个未压缩 KV entries，让局部依赖保持细粒度。报告还对 CSA/HCA 的 query、KV entries 和 core attention outputs 的最后 64 维使用 partial RoPE，并对 outputs 施加反向位置的 RoPE，使输出携带相对位置而不是错误累积绝对位置。

从效率角度看，DeepSeek-V4 的收益来自多层叠加：压缩 attention 降低有效序列长度，CSA 的 top-k 降低参与核心 attention 的入口数，HCA 用大压缩率降低长历史 cache，FP8/BF16 混合 KV 存储接近把 KV cache 再减半，lightning indexer 使用 FP4 加速超长上下文下的打分。官方报告因此给出 1M context 下相对 DeepSeek-V3.2 的 27% single-token FLOPs 和 10% KV cache；若对比常见 BF16 GQA8、head dimension 128 的配置，DeepSeek-V4 系列 KV cache 可降到约 2% 量级。

#### 🧪 练习题

```yaml
question: "在 DeepSeek-V4 的混合注意力中，CSA 与 HCA 的关键区别是什么？"
options:
  - "CSA 对压缩 KV entries 做 top-k 稀疏选择，HCA 用更大压缩率生成强压缩历史并直接做共享 KV MQA"
  - "CSA 只用于训练，HCA 只用于分词"
  - "CSA 使用完整 token KV cache，HCA 完全不使用 attention"
  - "CSA 和 HCA 都是 optimizer，不参与模型前向"
answer: 0
explain: "CSA 保留 DSA 式 indexer/top-k 选择，但选择对象是压缩 KV；HCA 使用更强压缩并省去稀疏选择，用少量强压缩入口覆盖长历史。"
```
