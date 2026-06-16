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

MQA 提出“一个写入头”：保留多组 Query 头，但让所有头共享同一组 Key/Value 投影与 KV cache，从而把自回归解码中反复读取历史 K/V 的带宽开销按头数压缩。它解决的不是注意力计算近似问题，而是标准 MHA 在增量生成阶段被显存带宽限制的问题。

#### 🎯 核心要点

- 结构改动：去掉 Key/Value 的 heads 维度，Query 和输出投影仍保留多头
- KV cache 压缩：每层缓存从 \(2BHLd_h\) 个元素降到 \(2BLd_h\)，相对 MHA 约减少 \(H\) 倍
- 带宽分析：论文将增量 MHA 的访存/计算比从 \(\Theta(n/d + 1/b)\) 改写为 MQA 的 \(\Theta(1/d + n/(dh) + 1/b)\)
- 推理优势：每个新 token 只追加一份 K/V，所有 Query 头共享读取，显著降低 decoder step 延迟
- 正交性：MQA 可与局部注意力等限制上下文的方法叠加，不改变 softmax 注意力的精确计算形式
- 论文实证：WMT14 EN-DE 与 Billion-Word LM 中质量轻微下降，WMT14 greedy decoder 从 46 微秒/token 降到 3.8 微秒/token

#### 🔬 深入细节

![MQA 与 MHA/GQA 的头组织对比](https://arxiv.org/html/2305.13245v3/extracted/5314337/images/gmq_architecture.png)
*图：GQA 论文 Figure 2 的官方图，左到右对比 MHA、GQA、MQA。MQA 原论文没有独立架构图，因此这里引用后续 Google GQA 论文中对 MQA 结构的公开示意。*

```python
# Multi-Query Attention 的增量解码伪代码
# H: query head 数, L: 已有上下文长度, d_h: head 维度
for step, x_t in enumerate(generated_tokens):
    # Query 仍是多头，形状 [B, H, d_h]
    q = einsum("bd,hdk->bhk", x_t, W_q)

    # Key/Value 只写入一份，形状 [B, d_h]
    k_t = einsum("bd,dk->bk", x_t, W_k)
    v_t = einsum("bd,dv->bv", x_t, W_v)
    K_cache.append(k_t)  # [B, L + 1, d_h]
    V_cache.append(v_t)  # [B, L + 1, d_h]

    # 每个 query head 都读同一份 K/V cache
    logits = einsum("bhk,bmk->bhm", q, K_cache) / sqrt(d_h)
    weights = softmax(causal_mask(logits), dim=-1)
    heads = einsum("bhm,bmv->bhv", weights, V_cache)
    y_t = einsum("bhv,hdv->bd", heads, W_o)
```

标准多头注意力为每个头单独生成 \(K_h,V_h\)：

$$
q_h = xW^Q_h,\quad K_h = MW^K_h,\quad V_h = MW^V_h,\quad
o_h = \mathrm{softmax}\left(\frac{q_hK_h^\top}{\sqrt{d_h}}\right)V_h
$$

MQA 只把 \(K_h,V_h\) 改成共享的 \(K,V\)：

$$
q_h = xW^Q_h,\quad K = MW^K,\quad V = MW^V,\quad
o_h = \mathrm{softmax}\left(\frac{q_hK^\top}{\sqrt{d_h}}\right)V
$$

动机来自 Transformer 的训练/推理不对称。训练时整段序列并行计算，矩阵乘足够大，访存被摊薄；但自回归解码每次只生成一个位置，当前 query 必须读取此前所有 token 的 K/V。随着上下文长度 \(L\) 增长，每层每步都要扫历史缓存，标准 MHA 的缓存形状近似为 \([B,H,L,d_h]\)，显存带宽很快变成瓶颈。论文的分析把增量 MHA 的主要坏项写成 \(n/d\)：序列越长，重复读 K/V 的开销相对计算越大。

MQA 的关键选择是“只共享 K/V，不共享 Q”。不同 Query 头仍可从当前 token 投影出不同查询子空间，输出端仍有每头的 \(W^O_h\)，因此保留了多头对当前状态的多视角读取能力；被压缩的是历史记忆的表示方式。换句话说，MQA 不是把注意力头剪掉，也不是对 attention score 做低秩近似，而是把所有头要查询的历史数据库合并成一份。这样每层 cache 元素数从 \(2BHLd_h\) 降到 \(2BLd_h\)，并且每个 decode step 只追加一组 \(k_t,v_t\)。

推理流程上，prefill 阶段可一次性为 prompt 写入共享 K/V；decode 阶段每来一个新 token，模型计算多头 \(q_h\)，再计算一份 \(k_t,v_t\) 并追加到 cache。随后所有头对同一份 \(K,V\) 做 causal attention。这个过程仍然是精确 softmax attention 的一种参数化，因此不会引入近似检索误差；收益主要来自 cache 体积、cache 写入次数和历史 K/V 读取带宽的下降。

论文还给出一个有用的系统直觉：如果只是增大 batch size，可以缓解访存/计算比中的 \(1/b\) 项，但无法解决 \(n/d\) 项；MQA 把这个项进一步除以头数 \(h\)，即 \(n/(dh)\)。这解释了为什么它特别适合长上下文、低延迟、在线生成：这些场景 batch 不一定足够大，而每步读取历史 K/V 的代价非常稳定。

实验中，作者在 WMT14 English-German 翻译和 Billion-Word 语言模型上比较 MHA、MQA、局部注意力以及减少头数/头维度的替代方案。为了让参数量公平，MQA 版本扩大了 FFN 隐层。结果显示，MQA 的质量接近基线，明显好于简单减少 heads 或 \(d_k,d_v\) 的做法；WMT14 上 greedy 增量 decoder 每 token 成本从 MHA 的 46 微秒降到 3.8 微秒，beam-4 decoder 从 203 微秒降到 32 微秒。

> 💡 关键：MQA 把“每个头写一份历史记忆”改成“所有头读同一份历史记忆”。这牺牲了一部分 K/V 表示容量，但换来 KV cache 的头数级压缩，是后续 GQA、KV cache 量化和推理内存管理工作的基础结构之一。

#### 🧪 练习题

```yaml
question: "MQA 在增量解码中降低显存带宽压力的直接原因是什么？"
options:
  - "把 softmax 替换为线性注意力"
  - "让多个 Query 头共享同一份 Key/Value cache"
  - "减少 Transformer 层数"
  - "只在训练阶段使用注意力"
answer: 1
explain: "MQA 保留多头 Query，但去掉 K/V 的 heads 维度，因此历史 K/V 的存储和读取不再随 Query 头数线性增长。"
```
