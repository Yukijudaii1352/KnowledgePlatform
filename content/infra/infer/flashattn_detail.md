### FlashAttention: 闪电注意力 (FlashAttention)

```yaml
id: flashattn
name: FlashAttention
full_name: 闪电注意力 (FlashAttention)
year: '2022'
org: Stanford
paper_url: https://arxiv.org/abs/2205.14135
category: attention
parent: —
motivation: IO感知的分块计算减少内存访问
```

#### 📝 一句话总结

FlashAttention 提出 IO-aware 的 exact attention：用分块、online softmax、重计算和 CUDA kernel fusion 避免读写完整 \(N \times N\) 注意力矩阵，解决标准注意力在长序列上受 HBM 带宽和显存容量限制的问题。

#### 🎯 核心要点

- IO-aware 设计：优化 GPU HBM 与片上 SRAM 之间的读写量，而不是改变注意力数学形式
- 分块计算：将 \(Q,K,V\) 切成 tile，把 \(K,V\) 和当前 \(Q\) block 搬入 SRAM 后局部计算
- Online softmax：维护每一行的最大值 \(m\) 和归一化项 \(\ell\)，跨 block 合并 softmax
- 不物化注意力矩阵：前向不把 \(S=QK^\top\) 或 \(P=\mathrm{softmax}(S)\) 写回 HBM
- 反向重计算：只保存输出 \(O\) 与 softmax 统计量，在反向按 block 重算 \(S,P\)
- 理论性质：保持 exact attention，额外显存从 \(O(N^2)\) 降到 \(O(N)\)，HBM 访问量显著低于标准实现
- 扩展能力：论文还给出 block-sparse FlashAttention，用相同 IO-aware 思路加速稀疏注意力

#### 🔬 深入细节

![FlashAttention 论文 Figure 1：IO-aware 分块注意力与速度收益](https://ar5iv.labs.arxiv.org/html/2205.14135/assets/x1.png)
*图：来自 arXiv HTML 版本的 FlashAttention 论文 Figure 1。左侧展示将 \(Q,K,V\) 分块搬入 SRAM、避免在 HBM 中物化大注意力矩阵；右侧展示相对 PyTorch attention 的加速。*

```python
# FlashAttention forward：按 tile 计算 exact attention
# 输入 Q, K, V 位于 HBM；SRAM 只容纳若干 Br x d、Bc x d 的块。
for i in range(num_q_blocks):
    Qi = load_sram(Q_block=i)
    Oi = zeros(Br, d)
    mi = full(Br, -inf)   # 每个 query row 的 running max
    li = zeros(Br)        # 每个 query row 的 running sum exp

    for j in range(num_kv_blocks):
        Kj = load_sram(K_block=j)
        Vj = load_sram(V_block=j)

        Sij = Qi @ Kj.T / sqrt(d)          # Br x Bc，只在片上存在
        mij = rowmax(Sij)
        m_new = maximum(mi, mij)

        Pij = exp(Sij - m_new[:, None])    # 未除以全局归一化项
        l_new = exp(mi - m_new) * li + rowsum(Pij)

        Oi = (exp(mi - m_new)[:, None] * li[:, None] * Oi + Pij @ Vj) / l_new[:, None]
        mi, li = m_new, l_new

    write_hbm(O_block=i, value=Oi)
    save_stats(m_block=i, l_block=i)       # 供 backward 重计算使用
```

标准注意力的数学形式是：

$$
S = QK^\top,\quad P = \mathrm{softmax}(S),\quad O = PV.
$$

问题不在 FLOPs 公式本身，而在执行路径。常规实现通常先调用 GEMM 得到 \(S\)，把 \(S\) 写入 HBM；再读出 \(S\) 做 softmax，把 \(P\) 写入 HBM；最后读出 \(P,V\) 做第二次 GEMM。对于序列长度 \(N\) 远大于 head dimension \(d\) 的情形，\(S\) 和 \(P\) 都是 \(N \times N\)，读写这些中间矩阵会把注意力变成典型 memory-bound 操作。FlashAttention 的核心判断是：近似注意力减少 FLOPs 不一定带来 wall-clock 加速，真正的瓶颈常常是 HBM 往返。

FlashAttention 的分块策略把慢速 HBM 和高速片上 SRAM 的层次显式纳入算法。每次只把一个 \(Q_i\) block 以及一个 \(K_j,V_j\) block 放到 SRAM，在片上计算 \(S_{ij}=Q_iK_j^\top\)、局部指数和局部输出，然后立即把结果合并到当前 \(O_i\)。这样 \(S_{ij}\) 只是临时 tile，不会形成全局 \(N \times N\) 矩阵。论文的 IO 分析给出标准 attention 需要 \(\Theta(Nd+N^2)\) 级别 HBM 访问，而 FlashAttention 在 SRAM 大小为 \(M\) 时需要 \(\Theta(N^2d^2/M)\) 级别 HBM 访问；当 \(d\) 为 64/128、SRAM 为百 KB 量级时，后者显著更小。

难点是 softmax 不是逐 block 独立的：一行的归一化分母需要整行所有 key 的分数。FlashAttention 使用 online softmax，把每行状态压缩为最大值 \(m\) 和指数和 \(\ell\)。若已有旧 block 状态 \((m,\ell,O)\)，新 block 分数为 \(S\)，则更新为：

$$
m'=\max(m,\mathrm{rowmax}(S)),
$$

$$
\ell'=e^{m-m'}\ell+\mathrm{rowsum}(e^{S-m'}),
$$

$$
O'=\frac{e^{m-m'}\ell O+e^{S-m'}V}{\ell'}.
$$

这个合并式的直觉是：不同 block 可以先用各自稳定的最大值做指数，再通过 \(e^{m-m'}\) 把旧尺度换到新的全局尺度。因此算法虽然分块执行，最终得到的 \(O\) 仍等价于一次性对整行 \(QK^\top\) 做 softmax；它不是稀疏、低秩或采样近似。

反向传播同样围绕 IO 优化。标准实现为了反向通常保存 \(P\)，这会产生 \(O(N^2)\) 激活显存。FlashAttention 只保存前向输出 \(O\) 与每行 softmax 统计量 \((m,\ell)\)，反向时重新加载 \(Q,K,V\) block，在 SRAM 内重算局部 \(S\) 和 \(P\)，再计算 \(\mathrm{d}Q,\mathrm{d}K,\mathrm{d}V\)。这看起来增加了计算，但减少了大矩阵的 HBM 读写；在 GPU 上，少量额外 FLOPs 往往比大量 HBM 访问便宜。

从工程实现看，tiling 还使 kernel fusion 自然成立：\(QK^\top\)、mask、softmax、dropout、\(PV\) 等步骤可以在一个 CUDA kernel 中串起来，输入只加载必要 block，输出只写最终 \(O\) 和少量统计量。论文中 block-sparse 扩展也体现了同一思想：如果注意力 mask 具有 block 结构，就跳过零 block，使 IO 复杂度随非零 block 比例下降。

> 💡 关键：FlashAttention 的贡献不是“少算注意力”，而是“少搬注意力矩阵”。它保留 \(O(N^2d)\) 计算量，却把最昂贵的 HBM 读写从完整矩阵级别压到 tile 级别。

#### 🧪 练习题

```yaml
question: "FlashAttention 能在保持 exact attention 的同时降低显存和加速，最核心的原因是什么？"
options:
  - "用低秩矩阵近似 QK^T"
  - "不再计算 softmax"
  - "通过分块和 online softmax 避免在 HBM 中物化 N×N 注意力矩阵"
  - "把所有注意力计算移动到 CPU"
answer: 2
explain: "FlashAttention 仍计算完整注意力，但只在 SRAM 内保留局部 tile，并用 running max/normalizer 合并 softmax，避免保存完整 S 或 P。"
```
