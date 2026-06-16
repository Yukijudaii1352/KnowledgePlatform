### HISA: 层次化索引稀疏注意力 (HISA)

```yaml
id: hisa
name: HISA
full_name: 层次化索引稀疏注意力 (HISA)
year: '2026'
org: Y Xu等
paper_url: https://arxiv.org/abs/2603.28458
category: attention
parent: nsa
motivation: 层次化索引实现细粒度稀疏注意力
```

#### 📝 一句话总结

HISA 把 DSA 的全前缀 token-wise indexer 改造成“先选块、再选 token”的两阶段层次化索引，在不改 Sparse MLA、不重新训练的前提下，降低长上下文稀疏注意力中逐 token 搜索的 \(O(L^2)\) 瓶颈。

#### 🎯 核心要点

- 定位瓶颈：DSA 的 Sparse MLA 已经只对 top-k token 做 attention，但 indexer 仍要为每个 query 扫描全部历史 token
- 两阶段搜索：先用 pooled block representatives 做 block-level coarse filtering，再只在候选块内执行原 DSA token-level refinement
- 接口兼容：输出仍是每个 query 的 token index set \(\mathcal{T}_t\)，下游 Sparse MLA operator、KV cache layout 和模型权重保持不变
- 训练免费：HISA 是 plug-and-play indexer replacement，不需要 finetuning，也不改变注意力主算子
- 复杂度下降：单 query 索引成本从 \(\mathcal{O}(L)\) 变为 \(\mathcal{O}(L/B+mB)\)，单层从 \(\mathcal{O}(L^2)\) 变为 \(\mathcal{O}(L^2/B+LmB)\)
- 实证结果：论文在 DeepSeek-V3.2 和 GLM-5 上替换 indexer，LongBench/NIAH 质量接近原 DSA，同时在 64K indexer kernel 上报告约 \(2.16\times\) 到 \(3.75\times\) 加速

#### 🔬 深入细节

![HISA block-to-token indexer](https://arxiv.org/html/2603.28458v3/x2.png)
*图：arXiv HTML 中的 HISA indexer 子图；先选择相关 block，再在候选 block 内做 token-level top-k。*

![DSA flat token-wise indexer](https://arxiv.org/html/2603.28458v3/x1.png)
*图：作为对比，原 DSA indexer 对每个 query 扫描全部历史 indexing keys，成本随前缀长度线性增长。*

```python
# HISA: Hierarchical Indexed Sparse Attention
def hisa_indexer(q_index_heads, gate_weights, token_index_keys, B, m, k):
    # token_index_keys: {k_s^I}_{s=1..L}
    blocks = partition_contiguous_blocks(token_index_keys, block_size=B)
    pooled = [mean_pool(block) for block in blocks]  # \tilde{k}_b^I

    selected_tokens = {}
    for t in query_positions:
        # Stage 1: block-level coarse filtering under the causal mask.
        block_scores = {}
        for b, k_block in causal_eligible_blocks(pooled, t):
            block_scores[b] = sum(
                gate_weights[t][j] * relu(dot(q_index_heads[t][j], k_block))
                for j in range(num_index_heads)
            )
        candidate_blocks = topk(block_scores, m)
        candidate_blocks |= {first_block(), local_or_last_block(t)}

        # Stage 2: original DSA scoring restricted to candidate tokens.
        omega_t = union_tokens(candidate_blocks)
        token_scores = {}
        for s in omega_t:
            token_scores[s] = sum(
                gate_weights[t][j] * relu(dot(q_index_heads[t][j], token_index_keys[s]))
                for j in range(num_index_heads)
            )
        selected_tokens[t] = topk(token_scores, k)

    return selected_tokens  # consumed unchanged by Sparse MLA
```

HISA 的出发点是：token-level sparse attention 的主 attention 已经很省，但“决定看哪些 token”的 indexer 仍可能像全注意力一样贵。以 DSA 为例，indexer 为 query 位置 \(t\) 维护 indexing query \(\mathbf{q}^I_{t,j}\)、indexing key \(\mathbf{k}^I_s\) 和 per-head gate \(w^I_{t,j}\)，对每个历史 token \(s\) 打分：

$$
I_{t,s}=\sum_{j=1}^{H^I} w^I_{t,j}\cdot
\operatorname{ReLU}(\mathbf{q}^I_{t,j}\cdot\mathbf{k}^I_s)
$$

然后选出：

$$
\mathcal{T}_t=\operatorname{TopK}(I_{t,:},k)
$$

Sparse MLA 只在 \(\mathcal{T}_t\) 上计算：

$$
\mathbf{u}_t=\operatorname{Attn}\left(\mathbf{h}_t,\{\mathbf{c}_s\mid s\in\mathcal{T}_t\}\right)
$$

问题在于，虽然主 attention 从 dense \(\mathcal{O}(L^2)\) 降到 sparse \(\mathcal{O}(Lk)\)，但 indexer 对每个 query 仍扫描长度为 \(L\) 的前缀，单层索引成本还是 \(\mathcal{O}(L^2)\)。上下文到 128K、1M 后，这个 indexer 会从小开销变成主瓶颈。

HISA 的第一阶段把前缀切成 \(M=\lceil L/B\rceil\) 个连续 causal blocks \(\mathcal{B}_1,\ldots,\mathcal{B}_M\)，并为每个块维护 mean-pooled representative key：

$$
\tilde{\mathbf{k}}^I_b=\operatorname{Pool}(\{\mathbf{k}^I_s\mid s\in\mathcal{B}_b\})
$$

对 query \(t\)，HISA 复用 DSA 的 query/gate，但先对块代表打分：

$$
J_{t,b}=\sum_{j=1}^{H^I}w^I_{t,j}\cdot
\operatorname{ReLU}(\mathbf{q}^I_{t,j}\cdot\tilde{\mathbf{k}}^I_b)
$$

选出 top-\(m\) 个候选块：

$$
\mathcal{C}_t=\operatorname{TopK}(J_{t,:},m),\quad
\Omega_t=\bigcup_{b\in\mathcal{C}_t}\mathcal{B}_b
$$

论文还强制纳入 first block 和当前 query 附近的 last/local block：first block 承担 attention sink 作用，last/local block 保留最近上下文；所有块选择都遵守 causal mask。这一点很实用，因为 HISA 不是为了得到任意稀疏模式，而是要替换生产系统里的 DSA indexer，边界条件必须稳定。

第二阶段在候选 token 集 \(\Omega_t\) 内执行原始 DSA 打分：

$$
I_{t,s}=\sum_{j=1}^{H^I}w^I_{t,j}\cdot
\operatorname{ReLU}(\mathbf{q}^I_{t,j}\cdot\mathbf{k}^I_s),\quad s\in\Omega_t
$$

最终：

$$
\mathcal{T}_t=\operatorname{TopK}(\{I_{t,s}\mid s\in\Omega_t\},k)
$$

为了保证候选池足够大，需要满足 \(mB\ge k\)。当 \(t\le k\) 时，所有前缀 token 都可被选中，行为等价于 dense；当 \(k<t\le mB\) 时，粗筛不会真正剪掉块，HISA 退化为原 DSA；只有当 \(t>mB\) 时，块级粗筛开始显著减少搜索空间，这正是长上下文场景。

复杂度上，如果 pooled representatives 可以随 KV cache 增量维护，则单 query 只需扫 \(\lceil L/B\rceil\) 个块代表，再扫最多 \(mB\) 个候选 token：

$$
\mathcal{O}\left(\frac{L}{B}+mB\right)
$$

对一层内所有 query 求和：

$$
\mathcal{O}\left(\frac{L^2}{B}+LmB\right)
$$

相比原 DSA indexer 的 \(\mathcal{O}(L^2)\)，HISA 的收益随 \(m\ll M\)、\(B\ll L\) 越明显。这里有清晰 trade-off：更大的 \(B\) 减少块数但代表更粗，过小的 \(m\) 更快但更可能漏掉关键块；论文的经验设置在 block size 128、候选 token 池 8192、最终 token budget 2048 等配置下验证了速度和质量平衡。

HISA 与纯 block-sparse 的关键区别在第二阶段。纯块稀疏一旦选中一个块，就把块内所有 token 都交给 attention，预算会被许多无关 token 消耗；HISA 只把块当作快速候选生成器，最终仍返回 token-level sparse pattern。因此它可以保持 DSA 的细粒度选择接口，又避免对全前缀逐 token 打分。论文在 Needle-in-a-Haystack 和 LongBench 上发现，HISA 接近原 DSA，而 Block-Sparse 明显更容易在中间位置或语义混杂块中漏检。

#### 🧪 练习题

```yaml
question: "HISA 能作为 DSA indexer 的 plug-and-play 替换，关键原因是什么？"
options:
  - "它最终仍输出每个 query 的 token index set，Sparse MLA 和 KV cache layout 不需要改变"
  - "它把所有 attention 都替换成卷积"
  - "它删除了 token-level refinement，只保留 block-level selection"
  - "它需要重新预训练模型后才能使用"
answer: 0
explain: "HISA 只改变搜索路径：先块级粗筛再 token 级细筛；输出接口仍是 \\(\\mathcal{T}_t\\)，所以下游 Sparse MLA 可以原样消费。"
```
