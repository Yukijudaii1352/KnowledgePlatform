### FlashAttention (FlashAttention: Fast and Memory-Efficient)
```yaml
id: flash_attention
name: FlashAttention
full_name: "FlashAttention (FlashAttention: Fast and Memory-Efficient)"
year: "2022"
org: "Stanford"
paper_url: "https://arxiv.org/abs/2205.14135"
category: "training"
parent: "—"
motivation: "IO感知算法SRAM内完成Attention"
```

#### 📝 一句话总结
FlashAttention 提出了一种 IO-aware 的精确 attention 计算方法，通过分块、在线 softmax 与反向重计算避免把 \(N \times N\) attention 矩阵写入 HBM，解决了长序列 Transformer 中显存访问主导耗时的问题。它不改变 attention 的数学结果，却把显存占用从序列长度的二次级中间矩阵压到近似线性，并显著提升训练速度。

#### 🎯 核心要点
- 精确 attention：计算结果等价于 \(\mathrm{softmax}(QK^\top)V\)，不是低秩、稀疏或随机近似。
- IO-aware 设计：优化目标不是只减少 FLOPs，而是减少 HBM 与片上 SRAM 之间的读写次数。
- 分块 tiling：按块加载 \(Q,K,V\) 到 SRAM，在片上完成矩阵乘、mask、softmax、dropout 与乘 \(V\)。
- 在线 softmax：用每行最大值 \(m\) 与归一化项 \(\ell\) 增量合并不同 key block，避免一次性物化完整 attention 矩阵。
- 反向重计算：前向只保存输出和 softmax 统计量，反向在 SRAM 中重算局部 \(S\) 与 \(P\)，避免保存 \(N^2\) 中间矩阵。
- Kernel fusion：把 attention 的多个 memory-bound 子操作融合进一个 CUDA kernel，减少中间结果反复进出 HBM。
- IO 复杂度优势：标准 attention 需要读写大规模 \(S,P\)，FlashAttention 在 SRAM 大小 \(M\) 合理时把 HBM 访问量降到 \(O(N^2d^2/M)\) 量级。
- 可扩展到 block-sparse FlashAttention：在预定义稀疏块 mask 下跳过零块，进一步降低长上下文 attention 的 IO 与计算。

#### 🔬 深入细节
![FlashAttention IO-aware tiling 示意图](https://ar5iv.labs.arxiv.org/html/2205.14135/assets/x1.png)
*图：FlashAttention 利用 GPU 内存层级差异，将 \(Q,K,V\) 分块搬入 SRAM，避免把完整 attention 矩阵写回 HBM。左侧展示 HBM/SRAM 带宽差异，中间展示分块循环，右侧展示 attention kernel 的速度收益。*

标准 self-attention 通常写成 \(S=QK^\top\)、\(P=\mathrm{softmax}(S)\)、\(O=PV\)。问题不只是 \(O(N^2d)\) 的矩阵乘计算量，而是常规实现会把 \(S\) 和 \(P\) 这两个 \(N\times N\) 中间矩阵写入 HBM，再被 mask、softmax、dropout 和后续矩阵乘反复读取。GPU 上 SRAM 的容量远小于 HBM，但带宽通常高一个数量级；当 attention 中大量操作是逐元素或归约操作时，真正拖慢 wall-clock time 的往往是 HBM IO，而不是 Tensor Core 可高效执行的 matmul FLOPs。

FlashAttention 的核心做法是把 attention 重新组织为“流式分块计算”。对每个 query block \(Q_i\)，算法逐个扫描 key/value block \((K_j,V_j)\)，在片上计算局部分数 \(S_{ij}=Q_iK_j^\top\)。由于 softmax 的归一化需要整行所有 key 的信息，不能简单对每个块单独 softmax 后相加；因此论文引入在线 softmax 统计量：行最大值 \(m\) 用于数值稳定，行指数和 \(\ell\) 用于最终归一化。对一个向量 \(x\)，稳定 softmax 可写为：

$$
m(x)=\max_k x_k,\qquad \ell(x)=\sum_k e^{x_k-m(x)},\qquad \mathrm{softmax}(x)_k=\frac{e^{x_k-m(x)}}{\ell(x)}.
$$

当一行分数被拆成两个块 \(x^{(1)},x^{(2)}\) 时，不需要保存全部分数，只要合并统计量：

$$
m=\max(m^{(1)},m^{(2)}),\qquad
\ell=e^{m^{(1)}-m}\ell^{(1)}+e^{m^{(2)}-m}\ell^{(2)}.
$$

这个公式给出了 FlashAttention 正确性的直觉：每个块内部先以本块或当前全局最大值为基准计算指数，再用指数缩放把旧块贡献调整到新的全局最大值坐标系中。输出 \(O\) 也以相同方式重标定，所以处理完所有 key block 后得到的结果与完整 \(\mathrm{softmax}(QK^\top)V\) 完全一致。

```python
# FlashAttention forward 的核心逻辑，省略 batch/head/dropout 的工程细节
# Q, K, V: [N, d] in HBM; SRAM can hold one Q block plus one K/V block
split Q into row blocks Q_i of size B_r
split K, V into column blocks K_j, V_j of size B_c
initialize O_i = 0, m_i = -inf, l_i = 0 for every Q block

for each K_j, V_j block:
    load K_j, V_j from HBM to SRAM
    for each Q_i block:
        load Q_i, O_i, m_i, l_i from HBM to SRAM
        S_ij = Q_i @ K_j.T
        m_new = maximum(m_i, rowmax(S_ij))
        P_tilde = exp(S_ij - m_new[:, None])
        l_new = exp(m_i - m_new) * l_i + rowsum(P_tilde)
        O_i = (
            exp(m_i - m_new)[:, None] * l_i[:, None] * O_i
            + P_tilde @ V_j
        ) / l_new[:, None]
        write O_i, m_new, l_new back to HBM

return O
```

反向传播的关键是“少存、多算”，但这里的多算是刻意设计的。常规训练会在前向保存 \(P\) 以便反向计算 \(dQ,dK,dV\)，这会产生 \(O(N^2)\) 的显存占用。FlashAttention 前向只保存输出 \(O\) 和 softmax 统计量 \((m,\ell)\)；反向时重新加载局部 \(Q_i,K_j,V_j\)，在 SRAM 中重算局部 \(S_{ij}\) 和 \(P_{ij}\)，再计算梯度贡献。虽然重计算增加了一些 FLOPs，但这些 FLOPs 主要是块内矩阵乘，GPU 擅长处理；相比之下，避免 HBM 读写大矩阵通常带来更大的实际加速。

FlashAttention 与许多“高效 attention”工作的区别在于它不牺牲精度。低秩、局部窗口、哈希或随机特征方法通常试图降低理论计算复杂度，但会改变 attention 矩阵或引入近似误差，并且不一定有真实速度收益。FlashAttention 反过来承认精确 attention 的 \(N^2\) 交互仍然要算，却把这些交互安排在更合适的内存层级中完成。论文也给出 IO 复杂度分析：在 head dimension 为 \(d\)、SRAM 大小为 \(M\) 时，FlashAttention 的 HBM 访问规模约为 \(O(N^2d^2/M)\)，而标准实现要物化并访问 \(N^2\) 级中间矩阵。

> 💡 关键：FlashAttention 的“快”不是因为少算了 attention，而是因为不把 \(S\) 和 \(P\) 这两个巨大中间矩阵写到慢速 HBM。它把计算重排成适合 GPU 内存层级的形式，让 expensive IO 变少、cheap recompute 变多。

在训练流程中，FlashAttention 通常作为 Transformer attention kernel 的 drop-in replacement：上层模型仍然生成 \(Q,K,V\)，仍然使用 causal mask 或 padding mask，仍然得到同形状输出 \(O\)。区别在 kernel 内部：mask、softmax、dropout、矩阵乘 \(V\) 被融合，局部块在 SRAM 生命周期内完成尽可能多的操作。对于自回归 causal attention，还可以跳过完全位于未来位置的块；对于 block-sparse 版本，只需在同一分块框架中跳过稀疏 mask 为零的块。

论文实验表明，FlashAttention 在 BERT-large、GPT-2 与 Long Range Arena 等场景中带来端到端训练加速，并让模型能处理更长上下文。更重要的是，它把“高效 Transformer”的优化视角从单纯 FLOPs 转向 IO complexity，这也解释了为什么很多理论上 FLOPs 更低的近似 attention 并没有稳定获得 wall-clock speedup。

#### 🧪 练习题
```yaml
question: "FlashAttention 为什么能够在不近似 attention 的情况下节省显存并加速？"
options:
  - "把 softmax 替换成线性 attention，降低理论计算复杂度"
  - "通过分块和在线 softmax 避免把完整 attention 矩阵写入 HBM"
  - "只保留局部窗口内的 token-token 交互"
  - "冻结 K/V 矩阵，只训练 Q 矩阵"
answer: 1
explain: "FlashAttention 仍计算精确的 softmax attention，但用 tiling、在线归一化和反向重计算减少 HBM 读写，因此显存占用和实际运行时间下降。"
```

#### 📚 参考来源
- 论文：<https://arxiv.org/abs/2205.14135>
- HTML 图与算法说明：<https://ar5iv.labs.arxiv.org/html/2205.14135>
