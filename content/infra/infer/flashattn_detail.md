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

FlashAttention 提出 IO-aware exact attention，用 tiling、online softmax 和 kernel fusion 避免显式物化注意力矩阵，在不近似结果的情况下大幅减少 HBM 访问。

#### 🎯 核心要点

- 把 Q/K/V 分块加载到 SRAM，按 tile 计算注意力
- 使用 online softmax 维护每行最大值和归一化和，保证数值稳定
- 前向不写出完整 \(N\times N\) attention matrix
- 反向通过重计算减少激活保存
- 结果与标准 attention 精确等价，但显著降低显存和内存带宽开销

#### 🔬 深入细节

![FlashAttention 核心示意图](https://ar5iv.labs.arxiv.org/html/2205.14135/assets/x1.png)
*图：FlashAttention 的分块 IO-aware attention 计算流程。*

```python
# FlashAttention forward sketch
for Q_block in blocks(Q):
    m = -inf; l = 0; O = 0
    for K_block, V_block in blocks(K, V):
        S = Q_block @ K_block.T / sqrt(d)
        m_new = maximum(m, rowmax(S))
        P = exp(S - m_new)
        l_new = exp(m - m_new) * l + rowsum(P)
        O = (exp(m - m_new) * l * O + P @ V_block) / l_new
        m, l = m_new, l_new
    write(O)
```

##### 动机与背景

标准 attention 先计算并保存 \(QK^T\) 和 softmax 矩阵，显存读写量为 \(O(N^2)\)。在 GPU 上，attention 往往受 HBM 带宽限制，而不是算术 FLOPs 限制。

##### 核心机制

FlashAttention 将 K/V 分块搬入高速 SRAM，每次只处理一个 tile。online softmax 让不同 tile 的局部 softmax 可以合并，维护行最大值 \(m\) 和归一化项 \(l\)，避免物化全矩阵仍保持精确。

##### 训练/推理流程

前向按 Q block 外循环、K/V block 内循环累积输出；只写最终 O 和少量 softmax 统计。反向阶段重算必要的 attention tile，而不是保存完整注意力矩阵，进一步降低内存。

##### 与传统方法的区别

FlashAttention 不是稀疏注意力，也不是低秩近似；它计算的数学结果等同标准 attention。创新点是 IO 复杂度优化：减少 HBM 往返，使 GPU 计算单元更充分工作。

#### 🧪 练习题

```yaml
question: "FlashAttention 为什么能省显存？"
options:
  - "不再保存完整 attention 矩阵"
  - "删除 Value"
  - "降低模型层数"
  - "只支持 CPU"
answer: 0
explain: "它用分块和 online softmax 直接累积输出，避免写出 N×N softmax 矩阵。"
```
