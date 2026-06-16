### FlashAttention-2 (FlashAttention-2: Faster Attention)
```yaml
id: flash_attention_2
name: FlashAttention-2
full_name: "FlashAttention-2 (FlashAttention-2: Faster Attention)"
year: "2023"
org: "Stanford"
paper_url: "https://arxiv.org/abs/2307.08691"
category: "training"
parent: "flash_attention"
motivation: "优化并行度提升2倍速度"
```

#### 📝 一句话总结
FlashAttention-2 在保持 FlashAttention 精确 attention 与线性级中间显存优势的基础上，重写在线 softmax 更新、提升单 head 内并行度，并重新划分 warp 工作，从而解决 FlashAttention GPU 占用率和共享内存通信不足的问题。它把 attention kernel 从约 25-40% 理论峰值提升到接近 GEMM 的 50-73% 峰值利用率，并相对 FlashAttention 约 2 倍加速。

#### 🎯 核心要点
- 保持精确性：仍计算 \(O=\mathrm{softmax}(QK^\top)V\)，不引入 attention 近似。
- 减少 non-matmul FLOPs：维护未归一化输出 \(\tilde O\)，最后一次性除以 \(\ell\)，减少逐元素缩放次数。
- 只保存 logsumexp：前向保存 \(L=m+\log\ell\)，反向不再同时保存行最大值和指数和。
- 单 head 内序列并行：除 batch 和 head 维度外，把一个 head 的 sequence block 分给多个 thread block，提高长序列小 batch 场景的 occupancy。
- Warp 级工作重划分：从 FlashAttention 的 sliced-K 改为 sliced-Q，减少 warp 间规约、同步和 shared memory 读写。
- Causal attention 优化：跳过完全被 causal mask 遮蔽的块，只在边界块应用 mask，降低无效计算。
- 工程覆盖扩大：支持 head dimension 到 256，并支持 MQA/GQA 等现代 LLM 推理常用 attention 变体。
- 训练收益：A100 上达到 50-73% 理论最大 FLOPs/s，GPT 风格模型训练可达约 225 TFLOPs/s 每 A100。

#### 🔬 深入细节
![FlashAttention-2 warp 工作划分示意图](https://hazyresearch.stanford.edu/static/posts/2023-07-17-flash2/flash_flash2_partitioning.png)
*图：FlashAttention 使用 sliced-K，把 \(K,V\) 分给不同 warp 后需要跨 warp 合并中间输出；FlashAttention-2 使用 sliced-Q，让每个 warp 负责不同 \(Q\) 行切片，共享 \(K,V\)，从而减少 shared memory 通信。*

FlashAttention-2 的出发点不是推翻 FlashAttention，而是解释为什么 FlashAttention 仍明显慢于优化良好的 GEMM。第一版已经避免了 \(N^2\) attention 矩阵的 HBM 读写，但在 A100 上通常只有理论最大 FLOPs/s 的 25-40%。论文指出瓶颈主要来自三类低层问题：在线 softmax 中过多 non-matmul 操作、thread block 数不足导致 SM 利用率不高、warp 之间为了合并局部结果产生 shared memory 通信。现代 GPU 的 Tensor Core 对 matmul 极快，但 FP32 标量/逐元素操作吞吐远低于 matmul，因此 attention kernel 中每一次额外 rescale、bound check 或 mask 都很贵。

算法层面的第一处改动是重写在线 softmax 的输出更新。FlashAttention 在每个 key/value block 后都会维护已经归一化的 \(O\)，这意味着每次合并都要用新的 \(\ell\) 重新缩放旧输出和新输出。FlashAttention-2 改为维护未归一化输出 \(\tilde O\)，只在处理完所有 \(K,V\) block 后执行一次最终归一化：

$$
S_i^{(j)}=Q_iK_j^\top,
\qquad
m_i^{(j)}=\max\left(m_i^{(j-1)},\mathrm{rowmax}(S_i^{(j)})\right),
$$

$$
\tilde P_i^{(j)}=\exp\left(S_i^{(j)}-m_i^{(j)}\right),
\qquad
\ell_i^{(j)}=e^{m_i^{(j-1)}-m_i^{(j)}}\ell_i^{(j-1)}+\mathrm{rowsum}(\tilde P_i^{(j)}),
$$

$$
\tilde O_i^{(j)}=e^{m_i^{(j-1)}-m_i^{(j)}}\tilde O_i^{(j-1)}+\tilde P_i^{(j)}V_j,
\qquad
O_i=\frac{\tilde O_i^{(T_c)}}{\ell_i^{(T_c)}}.
$$

这个变化的直觉很简单：旧块贡献必须随着全局最大值 \(m\) 的变化被重新标尺化，但没有必要在每个块后都把输出除以当前 \(\ell\)。只要最后一次除以最终 \(\ell\)，数学结果仍然等于完整 softmax attention，同时减少了大量逐元素除法和缩放。前向还保存 \(L_i=m_i+\log\ell_i\)，反向可由 \(L\) 恢复 softmax 归一化所需信息。

```python
# FlashAttention-2 forward 的核心逻辑，强调未归一化输出和 logsumexp
split Q into row blocks Q_i
split K, V into column blocks K_j, V_j

for each Q_i block in parallel:
    load Q_i to SRAM
    O_tilde = zeros([B_r, d])
    m = full([B_r], -inf)
    l = zeros([B_r])

    for each K_j, V_j block:
        load K_j, V_j to SRAM
        S = Q_i @ K_j.T
        if causal:
            apply mask only to boundary blocks; skip fully masked blocks
        m_new = maximum(m, rowmax(S))
        P_tilde = exp(S - m_new[:, None])
        l = exp(m - m_new) * l + rowsum(P_tilde)
        O_tilde = exp(m - m_new)[:, None] * O_tilde + P_tilde @ V_j
        m = m_new

    O_i = O_tilde / l[:, None]
    L_i = m + log(l)
    write O_i and L_i to HBM

return O, L
```

并行性是 FlashAttention-2 的第二个关键。FlashAttention 主要按 batch 和 head 维度并行，一个 thread block 处理一个 attention head 的一个工作单元。当 batch size 或 head 数较小而序列很长时，可调度的 thread block 数可能小于 GPU SM 数，导致很多 SM 空闲。FlashAttention-2 额外沿 sequence 维拆分工作，即使是单个 head 也能分给多个 thread block，从而提高 occupancy。这对长上下文 LLM 特别重要，因为长序列训练往往受显存限制，只能使用较小 batch。

第三个关键是 warp 内工作划分。第一版采用 sliced-K：不同 warp 拿不同 \(K,V\) 切片，计算出同一 \(Q\) block 的部分输出后，需要把中间结果写入 shared memory、同步、再规约相加。FlashAttention-2 改成 sliced-Q：不同 warp 处理 \(Q\) 的不同 row slice，共享同一份 \(K,V\)。这样每个 warp 产生的是输出的不同行，不需要跨 warp 合并同一行的 partial sum，减少了 shared memory 读写和同步开销。这个设计没有改变数学公式，但显著改善了 kernel 的数据流。

> 💡 关键：FlashAttention-2 的“2”主要是硬件利用率升级，而不是新 attention 机制。它保留 IO-aware tiling，同时让更多 FLOPs 落在 Tensor Core matmul 上，让更少时间花在逐元素缩放、mask 与 warp 间通信上。

与 FlashAttention 相比，FlashAttention-2 在 causal mask 上也更细。对于自回归 attention，约一半 \((Q_i,K_j)\) 块位于未来位置，完全不需要计算；只有对角线附近的边界块需要真正应用 causal mask。这样既减少矩阵乘，也减少逐元素 mask 判断。工程上，FlashAttention-2 支持 head dimension 到 256，使 GPT-J、CodeGen、Stable Diffusion 1.x 等模型受益；同时支持 MQA/GQA，有利于推理阶段减少 KV cache 体积。

论文的实证结果表明，这些优化让 FlashAttention-2 在 A100 上达到 50-73% 理论最大 FLOPs/s，明显接近 GEMM 效率。在端到端 GPT 风格训练中，FlashAttention-2 可达到约 225 TFLOPs/s 每 A100，约 72% model FLOPs utilization。由于它仍然是 exact attention，迁移成本主要是替换底层 kernel，而不是重新训练或调整模型结构。

#### 🧪 练习题
```yaml
question: "FlashAttention-2 相对 FlashAttention 的主要改进方向是什么？"
options:
  - "把 softmax attention 改成低秩近似"
  - "通过更好的在线 softmax、sequence 并行和 sliced-Q warp 划分提升 GPU 利用率"
  - "删除反向传播中的重计算以保存全部 attention 矩阵"
  - "只支持短序列以减少 kernel 复杂度"
answer: 1
explain: "FlashAttention-2 保持精确 attention 与 IO-aware tiling，核心提升来自减少非矩阵乘操作、增加单 head 内并行度以及减少 warp 间通信。"
```

#### 📚 参考来源
- 论文：<https://arxiv.org/abs/2307.08691>
- Stanford Hazy Research 图解：<https://hazyresearch.stanford.edu/blog/2023-07-17-flash2>
