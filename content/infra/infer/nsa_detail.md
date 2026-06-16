### NSA: 原生稀疏注意力 (Native Sparse Attention)

```yaml
id: nsa
name: NSA
full_name: 原生稀疏注意力 (Native Sparse Attention)
year: '2025'
org: DeepSeek
paper_url: https://arxiv.org/abs/2502.11089
category: attention
parent: flashattn_v2
motivation: 硬件对齐的原生可训练稀疏注意力
```

#### 📝 一句话总结

NSA 提出一种训练阶段就原生使用的稀疏注意力，把压缩全局摘要、动态块选择和局部窗口三条路径组合起来，解决长上下文中全注意力计算昂贵且后验稀疏化难以高效落地的问题。

#### 🎯 核心要点

- 三分支结构：compressed attention 负责全局粗粒度信息，selected attention 负责重要历史块的精确访问，sliding-window attention 负责近邻局部依赖
- 训练原生稀疏：预训练、前向、反向和解码都使用同一套稀疏结构，避免推理时临时裁剪带来的分布偏移
- 块级动态选择：利用压缩分支的注意力分数推导选择块重要性，再读取 top-n 连续 KV 块以适配 GPU 连续访存和 Tensor Core 计算
- GQA/MQA 友好：在共享 KV 的 query-head group 内聚合块重要性，使同组 query 选择一致的 KV 块，减少解码阶段 KV cache 读取量
- 门控融合：每个 query 对三条路径分别执行 attention，再用输入相关 gate 合并输出，兼顾远程语义、细粒度关键 token 和局部短程模式
- 硬件对齐 kernel：selected attention 采用 group-centric data loading，把同一 GQA 组的 query 和共享稀疏 KV 块放入 SRAM，提升实际而非纸面加速

#### 🔬 深入细节

![NSA 三分支架构图](https://arxiv.org/html/2502.11089v1/x2.png)
*图：arXiv HTML 中的 NSA 架构图，展示 compressed、selected、sliding-window 三条注意力路径及其稀疏模式。*

```python
# Native Sparse Attention core logic
def native_sparse_attention(q_t, K, V, gates, l, d, l_select, top_n, window):
    # 1. Compress historical K/V blocks into coarse-grained memory.
    K_cmp, V_cmp = [], []
    for start in range(0, len(K) - l + 1, d):
        K_cmp.append(phi_key(K[start:start + l]))      # learnable block compressor
        V_cmp.append(phi_value(V[start:start + l]))

    # 2. Use compression attention scores to estimate block importance.
    p_cmp = softmax(q_t @ transpose(K_cmp))
    p_slc = map_compression_scores_to_selection_blocks(p_cmp, l, d, l_select)
    selected_block_ids = topk(sum_over_gqa_group(p_slc), top_n)
    K_slc, V_slc = gather_contiguous_blocks(K, V, selected_block_ids, l_select)

    # 3. Keep exact local context for recent tokens.
    K_win, V_win = K[-window:], V[-window:]

    # 4. Separate attentions are fused by learned gates.
    o_cmp = attention(q_t, K_cmp, V_cmp)
    o_slc = attention(q_t, K_slc, V_slc)
    o_win = attention(q_t, K_win, V_win)
    return gates["cmp"] * o_cmp + gates["slc"] * o_slc + gates["win"] * o_win
```

NSA 先把普通 causal attention 改写成“为当前 query 动态构造更小的 K/V 集合”。标准形式是 \(\mathbf{o}_t=\operatorname{Attn}(\mathbf{q}_t,\mathbf{k}_{:t},\mathbf{v}_{:t})\)，NSA 将其替换为：

$$
\tilde{K}_t=f_K(\mathbf{q}_t,\mathbf{k}_{:t},\mathbf{v}_{:t}),\quad
\tilde{V}_t=f_V(\mathbf{q}_t,\mathbf{k}_{:t},\mathbf{v}_{:t}),\quad
\mathbf{o}_t^*=\operatorname{Attn}(\mathbf{q}_t,\tilde{K}_t,\tilde{V}_t)
$$

更具体地，NSA 使用三类映射 \(\mathcal{C}=\{\mathrm{cmp},\mathrm{slc},\mathrm{win}\}\)，并用 MLP+sigmoid 生成的 gate 合并三路输出：

$$
\mathbf{o}_t^*=\sum_{c\in\mathcal{C}} g_t^c\cdot
\operatorname{Attn}(\mathbf{q}_t,\tilde{K}_t^c,\tilde{V}_t^c),\quad
N_t=\sum_{c\in\mathcal{C}}\operatorname{size}[\tilde{K}_t^c]\ll t
$$

压缩分支把连续历史 token 聚合成块级表示。设压缩块长为 \(l\)，步长为 \(d\)，\(\phi\) 是带块内位置编码的可学习 MLP，则：

$$
\tilde{K}^{\mathrm{cmp}}_t=
\left\{\phi(\mathbf{k}_{id+1:id+l})\mid
0\le i\le \left\lfloor\frac{t-l}{d}\right\rfloor\right\}
$$

这一路牺牲 token 级精度，换来覆盖整个长上下文的粗粒度语义视野。论文中特别采用 \(d<l\) 的重叠压缩来缓解边界切断信息的问题：同一段上下文会被相邻压缩块以不同相对位置编码观察，减少“关键 token 恰好落在块边界”造成的信息损失。

选择分支解决压缩分支的细节损失。NSA 不直接对所有历史 token 做 top-k，因为那会产生随机访存和昂贵索引；它把历史切为选择块，并复用压缩注意力得到的分数估计块重要性。压缩注意力分数为：

$$
\mathbf{p}^{\mathrm{cmp}}_t=\operatorname{Softmax}(\mathbf{q}_t^\top\tilde{K}^{\mathrm{cmp}}_t)
$$

当压缩块和选择块不同步时，NSA 按空间覆盖关系把压缩块分数累加到选择块。设选择块长为 \(l'\)，且 \(l\le l'\)、\(d\mid l\)、\(d\mid l'\)，则：

$$
\mathbf{p}^{\mathrm{slc}}_t[j]
=\sum_{m=0}^{l'/d-1}\sum_{n=0}^{l/d-1}
\mathbf{p}^{\mathrm{cmp}}_t\left[\frac{l'}{d}j-m-n\right]
$$

在 GQA/MQA 场景中，同一 KV group 被多个 query head 共享。如果每个 head 独立选块，解码时需要读取这些选择的并集，实际访存会膨胀。NSA 因此在组内聚合分数 \({\mathbf{p}^{\mathrm{slc}}_t}'=\sum_{h=1}^{H}\mathbf{p}^{\mathrm{slc},(h)}_t\)，再选择 top-n 块：

$$
\mathcal{I}_t=\{i\mid \operatorname{rank}({\mathbf{p}^{\mathrm{slc}}_t}'[i])\le n\},\quad
\tilde{K}^{\mathrm{slc}}_t=
\operatorname{Cat}\left[\{\mathbf{k}_{il'+1:(i+1)l'}\mid i\in\mathcal{I}_t\}\right]
$$

滑动窗口分支保留最近 \(w\) 个 token：\(\tilde{K}^{\mathrm{win}}_t=\mathbf{k}_{t-w:t}\)、\(\tilde{V}^{\mathrm{win}}_t=\mathbf{v}_{t-w:t}\)。它不只是“补一点局部上下文”，更重要的是隔离局部模式：语言模型很容易从近邻 token 获得强信号，如果把局部和长程信息混在同一个稀疏集合里，模型可能走捷径而不学习压缩/选择分支。NSA 用独立 K/V 和独立 attention 路径降低这种梯度干扰。

硬件层面，NSA 的关键不是稀疏率本身，而是让稀疏访问仍然像 FlashAttention 一样可调度。selected attention 的 kernel 不按一段连续 query block 加载，因为相邻 query 可能选到不同 KV 块；它改为对每个位置加载同一 GQA 组的全部 query head 及其共享稀疏 KV 块，把连续 KV block 放进 SRAM 后循环计算。这样既避免同组 head 重复拉取 KV，也把随机 token 读取变成块级连续读取，提升算术强度并减少 HBM 带宽瓶颈。

与 H2O、SnapKV、Quest 等推理时稀疏或 cache eviction 方法相比，NSA 的稀疏结构参与预训练，因此模型参数会适应“压缩摘要 + 精选块 + 局部窗口”的信息接口。它也不同于 Longformer 这类固定稀疏模板：NSA 的选择块由 query 动态决定，同时又通过块级访问维持工程可实现性。直观地说，NSA 把“检索哪些历史信息”变成模型架构的一部分，而不是推理服务端的后处理策略。

#### 🧪 练习题

```yaml
question: "NSA 为什么要把 selected attention 做成块级 top-n，而不是直接逐 token top-k？"
options:
  - "因为块级选择能产生连续 KV 读取，更适合 GPU kernel，同时仍可用压缩分数动态定位重要历史区域"
  - "因为逐 token top-k 无法表达任何长程依赖"
  - "因为 sliding-window attention 已经覆盖所有历史 token"
  - "因为 NSA 只用于评测阶段，不参与训练"
answer: 0
explain: "NSA 的块级选择兼顾动态稀疏和硬件效率；逐 token 随机读取会破坏连续访存，实际延迟可能无法接近理论稀疏收益。"
```
