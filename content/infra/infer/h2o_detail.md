### H2O: 重击者预言机 (Heavy-Hitter Oracle)

```yaml
id: h2o
name: H2O
full_name: 重击者预言机 (Heavy-Hitter Oracle)
year: '2023'
org: Texas A&M
paper_url: https://arxiv.org/abs/2306.14048
category: kv_cache
parent: —
motivation: 动态保留高权重标记剔除冗余缓存
```

#### 📝 一句话总结

H2O 提出 Heavy-Hitter Oracle，把 KV cache 淘汰建模为在线选择少量高累计注意力 token 的问题，并用 heavy-hitter cache 加 recent cache 在固定显存预算内维持生成质量。

#### 🎯 核心要点

- 发现预训练 LLM 的注意力矩阵高度稀疏，少数 token 的累计注意力呈 power-law 分布并主导生成质量
- 将关键 token 定义为 Heavy Hitters，即在历史解码中反复获得高注意力权重的 token
- 使用本地累计注意力近似无法观测的未来全局重要性，在线更新 token 分数
- 缓存预算同时分配给 heavy-hitter tokens 和 recent tokens，兼顾远程关键信息与短程局部依赖
- 将 KV cache eviction 形式化为 dynamic submodular maximization，并给出贪心选择的近似保证
- 无需训练或改模型参数，可接入 OPT、LLaMA、GPT-NeoX 等自回归模型的推理阶段

#### 🔬 深入细节

![H2O 总览图](https://arxiv.org/html/2306.14048v1/x1.png)
*图：论文 Figure 1，展示 H2O 与静态稀疏、局部窗口等缓存策略的差异，图片来源为 arXiv HTML。*

```python
# H2O KV cache eviction, simplified from the paper
hh_scores = defaultdict(float)
cache = OrderedDict()

for t, token in enumerate(decode_stream):
    logits, attn, new_kv = model.decode(token, kv_cache=cache)

    # aggregate across heads/layers in practice; here attn[pos] is attention to cached token pos
    for pos, weight in aggregate_attention(attn).items():
        hh_scores[pos] += weight

    cache[t] = new_kv

    if len(cache) > total_budget:
        recent = set(last_positions(cache, recent_budget))
        candidates = set(cache.keys()) - recent
        heavy = topk(candidates, key=lambda p: hh_scores[p], k=hh_budget)
        keep = recent | heavy
        evict_everything_except(cache, keep)
```

H2O 的动机不是“让注意力计算更快”这么宽泛，而是针对解码阶段的状态内存瓶颈：KV cache 随 batch size 和序列长度线性增长，长对话或长文生成时甚至可能接近或超过模型权重显存。传统稀疏注意力多面向训练时的二次复杂度，KV 量化则降低每个 K/V 的 bit 数；H2O 选择另一条路径，直接减少缓存中的 token 数。

论文的关键实证观察有两个。第一，归一化注意力矩阵在 LLM 中天然很稀疏，论文用“每行最大值 1% 作为阈值”观察到多数层的 sparsity 超过 95%。第二，对历史 token 的注意力做累计后，分数呈 power-law，极少数 token 占据大部分注意力质量；把这些 heavy hitters mask 掉会导致准确率明显下降，而只保留 heavy hitters 加最近 token 仍能接近 full cache。

机制上，H2O 为每个历史位置维护累计注意力分数。可以把第 \(j\) 个 token 在时刻 \(t\) 的重要性写成：

$$
s_j(t)=\sum_{\tau=j+1}^{t}\sum_{h \in \mathcal{H}} A_{\tau,j}^{(h)}
$$

其中 \(A_{\tau,j}^{(h)}\) 是第 \(h\) 个 attention head 在生成第 \(\tau\) 个 token 时分配给位置 \(j\) 的注意力。实际系统会按层/头聚合这个分数；当缓存超过预算时，保留累计分数最高的 \(B_{hh}\) 个历史 token，并额外保留最近 \(B_r\) 个 token：

$$
C_t = \operatorname{TopK}_{B_{hh}}(s_1(t), \ldots, s_{t-B_r}(t)) \cup \{t-B_r+1,\ldots,t\}
$$

recent cache 是一个必要补丁：累计注意力有滞后性，新出现的实体、约束或语法依赖还没有足够时间积累高分，如果只按累计分数淘汰，新 token 会被系统性低估。H2O 因而把“长期重要性”和“短期新鲜度”拆成两个预算池，而不是只做 LFU 或只做滑动窗口。

论文还把这个在线淘汰过程解释为 dynamic submodular problem。理想情况下，如果能看到未来所有 query，最优 cache 应该最大化被保留 token 对未来 attention 的覆盖；但未来不可见，H2O 使用当前可见的本地 attention 统计做贪心近似。论文给出的非正式保证是，在 mild assumption 下，贪心得到的集合 \(\tilde{S}_i\) 满足：

$$
f(\tilde{S}_i) \ge (1-\alpha)(1-1/e)\max_{|S|=k} f(S)-\beta
$$

这条式子的直觉是：如果 attention coverage 具有边际收益递减，持续选择累计贡献高的 token 与经典子模最大化的 greedy 选择一致，因此不需要枚举所有淘汰序列。

推理流程分为 prompt phase 和 token generation phase。prompt phase 正常生成所有初始 KV；generation phase 每一步先用当前 cache 解码，再从 attention 权重中更新分数，最后执行淘汰。工程实现上，论文强调不必为被淘汰 KV 做显存搬移，而是让新 KV 直接填入被释放的位置，从而降低 eviction 造成的内存 I/O 开销。

与纯 Local/Sliding Window 相比，H2O 可以保留远处但持续被访问的实体、主题词或格式约束；与 Sparse Transformer 的固定 strided/fixed pattern 相比，它的可见集合随生成内容动态变化；与 KV quantization 相比，它减少的是序列维度而不是数值精度。主要风险也来自这里：一旦重要 token 被淘汰，后续 attention 无法恢复它，所以分数估计、recent 预算和总预算比例会直接决定质量上限。

#### 🧪 练习题

```yaml
question: "H2O 为什么同时保留 heavy-hitter tokens 和 recent tokens？"
options:
  - "heavy-hitter tokens 负责长期高注意力信息，recent tokens 保护尚未积累分数的新近依赖"
  - "recent tokens 用来替代所有 attention 计算"
  - "heavy-hitter tokens 只用于训练 tokenizer"
  - "两个集合只是为了让 batch size 恒定"
answer: 0
explain: "累计注意力能识别长期关键 token，但对刚出现的 token 有滞后；recent cache 防止新信息被过早淘汰。"
```
