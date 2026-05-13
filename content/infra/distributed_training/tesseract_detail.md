### Tesseract

```yaml
id: tesseract
name: Tesseract
full_name: "Tesseract: Parallelize the Tensor Parallelism Efficiently"
year: 2022
org: National University of Singapore
paper_url: https://arxiv.org/abs/2105.14500
category: infra
parent: "—"
motivation: "提出3D并行矩阵乘法方案(2D SUMMA + depth维复制)，将通信量从O(n/q)降至O(n/(dq))，在相同GPU数量下显著提升张量并行效率"
```

#### 📝 一句话总结

Tesseract 提出了一种 3D 张量并行方法，在 2D SUMMA 矩阵乘法的基础上引入 depth 维度复制，将 \(p = dq^2\) 个处理器排列为 \([q, q, d]\) 的三维结构，在不引入任何近似的前提下将通信量降低 \(d\) 倍，相比 Megatron-LM（1D）和 Optimus（2D）在 64 GPU 上分别实现 3.37× 和 1.71× 的吞吐提升。

#### 🎯 核心要点

- **3D 处理器排列**：将 \(p = dq^2\) 个 GPU 组织为 \([q, q, d]\) 三维网格，其中 \(q \times q\) 为 2D 平面，\(d\) 为 depth 维度
- **基于 2.5D SUMMA 的矩阵乘法**：在 depth 维度上复制输入矩阵，每层独立执行 2D SUMMA 的子集计算，最终通过 reduce-scatter 合并结果
- **通信量优化**：单次矩阵乘法通信量从 2D 的 \(O(n^2/q)\) 降至 \(O(n^2/(dq))\)，减少 \(d\) 倍
- **Transformer 完整适配**：对 Feed Forward 层和 Multi-Head Attention 层分别设计了并行切分方案，包括 LayerNorm 的分布式计算
- **无精度损失**：不引入任何近似，训练精度与单 GPU 完全一致（在 ViT + ImageNet-100 上验证）
- **可与 Pipeline/Data Parallelism 组合**：Tesseract 作为张量并行组件，可与流水线并行和数据并行正交组合

#### 🔬 深入细节

##### 核心架构图

![Tesseract 3D 处理器排列](https://ar5iv.labs.arxiv.org/html/2105.14500/assets/x3.png)
*图：\(p = dq^2\) 个处理器的 Tesseract 排列，形状为 \([q, q, d]\)。每个 depth 层包含 \(q \times q\) 个处理器，共 \(d\) 层。*

![Feed Forward 并行化](https://ar5iv.labs.arxiv.org/html/2105.14500/assets/x7.png)
*图：Tesseract 对 Transformer Feed Forward 层的并行化方案*

![Multi-Head Attention 并行化](https://ar5iv.labs.arxiv.org/html/2105.14500/assets/x8.png)
*图：Tesseract 对 Multi-Head Attention 层的并行化方案*

##### 算法伪代码

```python
# Tesseract 3D 并行矩阵乘法 C = A × B
# 处理器排列: [q, q, d], 总处理器数 p = d * q^2
# 每个处理器坐标: (i, j, k), i,j ∈ [0,q), k ∈ [0,d)

def tesseract_matmul(A, B, q, d):
    """
    A: [n, n] 输入矩阵
    B: [n, n] 参数矩阵
    每个处理器持有:
      A_local: [n/q, n/(dq)] — A 的子块
      B_local: [n/(dq), n/q] — B 的子块
    """
    # Step 1: 初始化 — 将 A 按行列切分到 q×q 网格,
    #          depth 维度上进一步切分列(A)或行(B)
    # 处理器(i,j,k) 持有 A[i, j*d+k] 和 B[j*d+k, i]

    C_local = zeros(n/q, n/q)

    # Step 2: 2D SUMMA 风格迭代 (共 q 步,而非 dq 步)
    for t in range(q):
        # 在行方向广播 A 的列块
        A_col = broadcast_row(A_local, source_col=t)  # 沿行通信

        # 在列方向广播 B 的行块
        B_row = broadcast_col(B_local, source_row=t)  # 沿列通信

        # 本地矩阵乘法累加
        C_local += A_col @ B_row

    # Step 3: 沿 depth 维度 reduce-scatter 合并部分和
    C_final = reduce_scatter_depth(C_local)

    return C_final  # 每个处理器持有 C 的 [n/q, n/q] 子块
```

##### 方法详解

**动机与背景**

随着大规模语言模型（如 GPT-3、BERT）参数量急剧增长，单 GPU 内存已无法容纳完整模型。张量并行（Tensor Parallelism）通过将模型参数和激活值切分到多个 GPU 上来解决这一问题。然而，现有方法存在明显瓶颈：

- **1D 并行（Megatron-LM）**：将参数矩阵按列或行切分到 \(p\) 个 GPU，每次矩阵乘法需要一次 all-reduce 通信，通信量为 \(O(n^2/p)\) 但通信带宽利用率低
- **2D 并行（Optimus/SUMMA）**：将 \(p\) 个 GPU 排列为 \(\sqrt{p} \times \sqrt{p}\) 网格，使用 SUMMA 算法，通信量为 \(O(n^2/\sqrt{p})\)，但仍受限于 2D 网格的通信开销

Tesseract 的核心洞察是：可以通过引入第三个维度（depth）来进一步降低通信量。这一思想源自高性能计算领域的 2.5D 矩阵乘法算法（Solomonik & Demmel, 2011），Tesseract 将其适配到深度学习的张量并行场景。

**核心机制：3D 处理器排列与矩阵切分**

Tesseract 将 \(p = dq^2\) 个处理器排列为三维网格 \([q, q, d]\)，其中：
- \(q\)：2D 平面的维度（行和列方向各 \(q\) 个处理器）
- \(d\)：depth 维度（复制层数）

对于矩阵乘法 \(C = A \times B\)，其中 \(A \in \mathbb{R}^{n \times n}\)，\(B \in \mathbb{R}^{n \times n}\)：

矩阵 \(A\) 被切分为 \(q \times (dq)\) 个子块，每个子块大小为 \([n/q, n/(dq)]\)：

$$A_{i,(j \cdot d + k)} \in \mathbb{R}^{n/q \times n/(dq)}, \quad i \in [0,q),\ j \in [0,q),\ k \in [0,d)$$

矩阵 \(B\) 被切分为 \((dq) \times q\) 个子块，每个子块大小为 \([n/(dq), n/q]\)：

$$B_{(j \cdot d + k), i} \in \mathbb{R}^{n/(dq) \times n/q}, \quad i \in [0,q),\ j \in [0,q),\ k \in [0,d)$$

> 💡 关键：depth 维度的引入使得每个处理器持有的子块更小（列/行方向多切了 \(d\) 倍），从而每步通信的数据量减少 \(d\) 倍。

**通信流程**

Tesseract 的前向传播包含三种通信操作：

1. **行方向广播（Broadcast along row）**：在 SUMMA 的每一步中，将 \(A\) 的列块沿行方向广播，通信量为 \(n^2/(dq^2)\)
2. **列方向广播（Broadcast along column）**：将 \(B\) 的行块沿列方向广播，通信量为 \(n^2/(dq^2)\)
3. **Depth 方向 reduce-scatter**：将各 depth 层的部分积合并，通信量为 \(n^2/q^2 \cdot (d-1)/d\)

总通信量分析：

$$W_{forward} = 2q \cdot \frac{n^2}{dq^2} + \frac{n^2}{q^2} \cdot \frac{d-1}{d} = \frac{2n^2}{dq} + \frac{n^2(d-1)}{dq^2}$$

当 \(d > 1\) 时，相比 2D SUMMA 的通信量 \(2n^2/q\)，Tesseract 将主要通信项降低了 \(d\) 倍。

**Transformer 层的适配**

对于 Transformer 的 Feed Forward 层（输入 \([b, s, h]\)，参数 \([h, 4h]\) 和 \([4h, h]\)）：
- 输入切分为 \([b/(dq), s, h/q]\)
- 第一层参数切分为 \([h/q, 4h/q]\)
- 第二层参数切分为 \([4h/q, h/q]\)
- 输出形状仍为 \([b/(dq), s, h/q]\)

对于 Multi-Head Attention 层：
- QKV 投影参数切分为 \([h/q, 3h/q]\)
- 每个处理器处理 \(n/q\) 个注意力头
- 注意力计算完全本地化（无跨位置通信）
- 输出投影参数切分为 \([h/q, h/q]\)

**LayerNorm 的分布式计算**

LayerNorm 需要计算全局均值和方差。由于隐藏维度 \(h\) 被切分到 \(q\) 个处理器上，需要：

$$E[X] = \frac{\Sigma X_i}{n}, \quad Var[X] = E[X^2] - E[X]^2$$

Tesseract 通过在行方向执行 all-reduce 来聚合局部统计量，然后各处理器独立完成归一化计算。

**与传统方法的对比**

| 方法 | 处理器排列 | 通信量（前向） | 内存/GPU |
|------|-----------|--------------|----------|
| Megatron-LM (1D) | \([p]\) | \(O(n^2)\) | \(O(n^2/p)\) |
| Optimus (2D) | \([q, q]\) | \(O(n^2/q)\) | \(O(n^2/q^2)\) |
| **Tesseract (3D)** | \([q, q, d]\) | \(O(n^2/(dq))\) | \(O(n^2/(dq^2))\) |

> ⚠️ 注意：Tesseract 的 depth 维度需要额外复制输入数据，因此存在内存-通信的 trade-off。当 \(d\) 增大时，通信减少但每层的输入需要在 depth 维度上分发。

**实验结果**

在 64 GPU 的强扩展实验中，Tesseract \([4,4,4]\) 相比 Megatron-LM 实现 1.37× 加速，相比 Optimus 实现 1.53× 加速。在弱扩展实验中，Tesseract 达到 Megatron-LM 的 3.37× 吞吐量和 4.02× 推理速度。同时，在 Vision Transformer 训练中验证了 Tesseract 不影响模型精度。

#### 🧪 练习题

```yaml
question: "Tesseract 相比 2D SUMMA 并行降低通信量的核心机制是什么？"
options:
  - "使用更高效的通信原语（如 NCCL Ring AllReduce）"
  - "引入 depth 维度复制输入矩阵，使每步广播的子块更小"
  - "通过梯度压缩减少传输数据量"
  - "将通信与计算完全重叠隐藏延迟"
answer: 1
explain: "Tesseract 在 2D 网格基础上增加 depth 维度，将矩阵列/行方向多切 d 份分配到不同 depth 层，使得 SUMMA 每步广播的数据量从 n²/q² 降至 n²/(dq²)，总通信量减少约 d 倍。"
```