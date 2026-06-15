### FlashAttention

```yaml
id: flash_attention
name: FlashAttention
full_name: 'FlashAttention (FlashAttention: Fast and Memory-Efficient)'
year: '2022'
org: Stanford
paper_url: https://arxiv.org/abs/2205.14135
category: training
parent: —
motivation: IO感知算法SRAM内完成Attention
```

#### 📝 一句话总结

FlashAttention 提出 IO-aware exact attention：通过按块把 \(Q,K,V\) 搬入片上 SRAM，并用 online softmax 合并分块结果，避免显式 materialize \(N\times N\) 注意力矩阵。它解决的是标准 attention 在长序列下 HBM 读写和显存占用成为瓶颈的问题。

#### 🎯 核心要点

- 不近似 attention，输出与标准 softmax attention 数学等价
- 将 \(Q,K,V\) 按 tile 加载到 SRAM，分块计算 \(S=QK^\top\)、\(P=\text{softmax}(S)\)、\(O=PV\)
- 使用 online softmax 维护每行 running max \(m_i\) 和 running sum \(\ell_i\)，跨 key blocks 稳定合并
- 不保存完整 \(S\) 和 \(P\) 矩阵，反向传播时按块重算必要中间量
- 将 attention memory 从 \(O(N^2)\) 降到 \(O(N)\)，同时减少 HBM traffic
- 支持 block-sparse FlashAttention，把稀疏模式与 IO-aware tiling 结合
- 在 BERT/GPT-2/Long Range Arena 等任务上带来显著训练速度和长上下文能力提升

#### 🔬 深入细节

![FlashAttention IO-aware tiling](https://ar5iv.labs.arxiv.org/html/2205.14135/assets/x1.png)
*图：FlashAttention 论文 Figure 1，展示标准 attention 与 IO-aware 分块 attention 在 HBM/SRAM 之间的数据流差异。*

```python
# FlashAttention forward 简化伪代码
def flash_attention(Q, K, V, block_m, block_n):
    O = zeros_like(Q)
    m = full((Q.rows,), -inf)  # row-wise running max
    l = zeros((Q.rows,))       # row-wise running sum

    for K_j, V_j in blocks(K, V, size=block_n):
        for Q_i in blocks(Q, size=block_m):
            S = Q_i @ K_j.T
            m_new = maximum(m_i, rowmax(S))
            P = exp(S - m_new[:, None])
            l_new = exp(m_i - m_new) * l_i + rowsum(P)
            O_i = (exp(m_i - m_new)[:, None] * l_i[:, None] * O_i + P @ V_j) / l_new[:, None]
            m_i, l_i = m_new, l_new

    return O
```

**动机与背景：attention 的 FLOPs 不是唯一瓶颈。** 标准实现会先算 \(S=QK^\top\)，写入 HBM，再读出做 softmax 得到 \(P\)，再写入 HBM，再读出与 \(V\) 相乘。即使矩阵乘法很快，\(S\) 和 \(P\) 的 \(N^2\) 中间矩阵也会造成巨大显存和带宽压力。FlashAttention 的核心判断是：GPU 层次内存不对称，SRAM 小但快，HBM 大但慢，attention 应该围绕 IO 次数重新组织。

**核心机制：online softmax 让分块 softmax 可精确合并。** softmax 需要整行最大值和归一化分母，似乎必须先看到所有 key。FlashAttention 使用 running max \(m\) 和 running sum \(\ell\) 解决这个问题。处理新 block 时，用新的 \(m'\) 重新缩放旧分母和旧输出：

$$
m'=\max(m,\max_j S_j),\quad
\ell'=e^{m-m'}\ell+\sum_j e^{S_j-m'}
$$

输出同样按比例合并，因此最终结果与一次性 softmax 完全一致。

**训练流程：前向少存，反向重算。** 为了省显存，FlashAttention 前向只保存输出 \(O\) 和 softmax 统计量 \(m,\ell\)，不保存 \(S,P\)。反向传播按 tile 重新计算 \(S\) 和 \(P\)，再计算 \(dQ,dK,dV\)。这是一种特定于 attention 的 rematerialization：多花少量计算，换取大量 HBM 存储和读写减少。

**与近似 attention 的区别：优化系统实现而非改变模型。** Longformer、Performer 等方法通过稀疏或低秩近似降低复杂度，可能改变模型表达；FlashAttention 在 dense setting 下仍计算完整 attention，只改变循环顺序和内存调度。因此它可以无缝替换标准 attention，并保持收敛和精度行为。

> 💡 关键：FlashAttention 的“flash”来自少访问慢内存，而不是少算 attention。

#### 🧪 练习题

```yaml
question: "FlashAttention 为什么能避免保存完整 N×N 注意力矩阵？"
options:
  - "它把 softmax 改成 sigmoid"
  - "它用 online softmax 维护分块归一化统计，并在反向中重算中间量"
  - "它删除所有 key token"
  - "它只支持 batch size 为 1"
answer: 1
explain: "running max/sum 使分块 softmax 精确合并，前向只需保存少量统计量，反向按块重算。"
```
