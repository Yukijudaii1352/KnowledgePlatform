### Scissorhands: 剪刀手 (Scissorhands)

```yaml
id: scissorhands
name: Scissorhands
full_name: 剪刀手 (Scissorhands)
year: '2023'
org: Rice Univ
paper_url: https://arxiv.org/abs/2305.17118
category: kv_cache
parent: —
motivation: 基于重要性持久化假设压缩缓存
```

#### 📝 一句话总结

Scissorhands 提出“重要性持久化”假设，用历史注意力识别未来仍可能关键的 pivotal tokens，并在固定 KV cache 预算下优先保留这些 token，从而实现无需微调的测试时缓存压缩。

#### 🎯 核心要点

- 观察到 Repetitive Attention Pattern：不同生成位置会反复关注相同的一小批历史 token
- 提出 Persistence of Importance Hypothesis：过去显著影响生成的 pivotal tokens 未来仍更可能显著影响生成
- 用 attention score 大于平均值阈值 \(\alpha=1/t\) 定义 pivotal token，并用 persistence ratio 验证重合度
- 采用固定预算 KV buffer，超预算时依据历史窗口内的低注意力计数淘汰非关键 token
- 永久保护 recent window，因为最新 token 的重要性尚未被充分观测
- 历史窗口、最近窗口和丢弃量在实验中取 \(w=400\)、\(r=10\)、\(m=0.5B\)，可降低压缩频率开销
- 可与 4-bit quantization 叠加，论文报告 KV cache 最高 5x 压缩且进一步达到更高组合压缩率

#### 🔬 深入细节

![Scissorhands 重复注意力模式](https://ar5iv.labs.arxiv.org/html/2305.17118/assets/x1.png)
*图：论文 Figure 1(a)，展示同一句子中某个生成位置对少数历史位置的高注意力，图片来源为 ar5iv 对 arXiv 源文的 HTML 转换。*

![Scissorhands 持久化比例](https://ar5iv.labs.arxiv.org/html/2305.17118/assets/x4.png)
*图：论文 Figure 2(a)，不同层上的 persistence ratio 多数超过 95%，说明后半段 pivotal tokens 大多已在前半段出现过。*

```python
# Scissorhands budgeted KV cache, simplified from Algorithm 1/2
cache_k, cache_v = [], []
low_score_count = defaultdict(int)

for t, token in enumerate(decode_stream):
    logits, attn, new_kv = model.decode(token, kv_cache=(cache_k, cache_v))
    cache_k.append(new_kv.key)
    cache_v.append(new_kv.value)

    if len(cache_k) > budget:
        low_score_count.clear()

        # collect influence evidence over a recent history window
        for i in range(max(0, t - history_window), t + 1):
            for pos, score in attention_row(i).items():
                if score < 1.0 / max(1, i):
                    low_score_count[pos] += 1

        # newest tokens are protected because their future importance is still unknown
        protected = set(range(max(0, t - recent_window + 1), t + 1))
        candidates = [p for p in cache_positions() if p not in protected]
        evict = topk(candidates, key=lambda p: low_score_count[p], k=drop_amount)
        remove_from_cache(cache_k, cache_v, evict)
```

Scissorhands 面对的问题与普通剪枝不同：模型参数不变，推理仍是自回归的，但 KV cache 的长度不能无限增长。论文以 OPT-175B 为例说明，batch size 128、sequence length 2048 时 KV cache 可达约 950GB，足以超过权重内存。因而它要压缩的是“序列维度上的缓存条目”，不是权重量化，也不是训练阶段的稀疏注意力。

核心观察叫 Repetitive Attention Pattern。作者在 C4 上用 OPT-6B 可视化多个生成位置的 attention map，发现位置 178、228、278 等不同 query 会反复把高注意力分配给类似的历史位置，例如 27、63、98、121、152、177。这说明“谁重要”不是完全随 query 随机变化，而有跨时间的稳定性。

论文把这个稳定性形式化为 pivotal token。若位置 \(t\) 对历史 token 的注意力超过阈值 \(\alpha\)，该历史 token 属于 \(S_t\)。对区间 \([a,b]\) 的 pivotal token 集合定义为：

$$
S_{a \rightarrow b}=\bigcup_{t=a}^{b}S_t
$$

为验证“过去重要的未来仍重要”，论文定义 persistence ratio：

$$
\operatorname{PersistenceRatio}
=\frac{|S_{t+1 \rightarrow l}\cap S_{0 \rightarrow t}|}
{|\{x \mid x \in S_{t+1 \rightarrow l}, x \in \{x_1,\ldots,x_t\}\}|}
$$

实验中取 \(t=l/2\)、\(\alpha=1/t\)。结果显示多数层 persistence ratio 超过 95%，同时 \(|S_{0\rightarrow t}|/t\) 明显小于 1，排除了“所有 token 都重要”的平凡解释。这是 Scissorhands 能在线预测未来重要 token 的经验基础。

算法上，Scissorhands 维护固定大小 \(B\) 的 KV buffer。每次缓存超过预算，不是每步都立即重排所有历史，而是在长度为 \(w\) 的历史窗口里收集重要性证据。论文的 Algorithm 2 用低注意力事件作为淘汰信号：若某 token 在多个历史 attention row 中低于平均注意力 \(1/t\)，它的低分计数增加；压缩时优先丢弃低分计数高、且不在最近窗口内的位置。

完整 attention head 输出为：

$$
a_t=\sum_{i=1}^{t}\alpha_{t,i}\mathcal{V}_t[i],
\quad
\alpha_{t,i}=
\frac{\exp(\langle x_tW_K,\mathcal{K}_t[i]\rangle)}
{\sum_{j=1}^{t}\exp(\langle x_tW_K,\mathcal{K}_t[j]\rangle)}
$$

压缩后只在保留下来的 \(n\le B\) 个 KV 上计算估计输出：

$$
\hat{a}_t=\sum_{i=1}^{n}\hat{\alpha}_{t,i}\bar{\mathcal{V}}_t[i],
\quad
\hat{\alpha}_{t,i}=
\frac{\exp(\langle x_tW_K,\bar{\mathcal{K}}_t[i]\rangle)}
{\sum_{j=1}^{n}\exp(\langle x_tW_K,\bar{\mathcal{K}}_t[j]\rangle)}
$$

这里的风险在于 softmax 归一化分母也被改写了：被删 token 不仅失去 value contribution，也会改变注意力质量在剩余 token 间的分配。Scissorhands 的理论分析用 power-law attention 假设解释为什么删掉低分 token 时误差可控；直觉上，如果注意力质量高度集中，删除尾部低分项对输出向量的扰动相对小。

recent window 的作用与 H2O 类似但理由更直接：新 token 还没有足够历史 attention row 来证明自己是 pivotal token。若不保护最近 \(r\) 个 token，算法会偏向保留“已经被多次观测到”的旧 token，从而误删刚出现但语义关键的内容。论文实验中 \(r=10\)、\(w=400\)，并用 \(m=0.5B\) 控制压缩频率，避免每个解码步都额外做一次历史窗口统计。

与 H2O 相比，Scissorhands 更强调“重要性持久化”的可验证假设，并通过 persistence ratio 来证明未来 pivotal set 与过去 pivotal set 高度重叠；H2O 更强调 heavy-hitter cumulative attention 与 dynamic submodular greedy。与纯 sliding window 相比，Scissorhands 能保留远距离关键 token；与 KV quantization 相比，它减少 KV 条目数，并且可以和 4-bit quantization 正交叠加。

#### 🧪 练习题

```yaml
question: "Scissorhands 为什么要保护 recent window？"
options:
  - "因为最新 token 尚未积累足够历史注意力证据，直接按历史分数淘汰会低估它们"
  - "因为 recent window 可以恢复所有被淘汰 token"
  - "因为只有 recent token 会参与 softmax 分母"
  - "因为模型训练时只见过最近 10 个 token"
answer: 0
explain: "Scissorhands 的重要性估计依赖历史 attention，最新 token 数据不足，因此用 recent window 避免早删。"
```
