### DualPipe：双向流水线并行中的计算-通信重叠

```yaml
id: deepseek_v4_dp
name: DualPipe
full_name: "DualPipe 双向流水线并行算法"
year: "2024"
org: "DeepSeek"
paper_url: "https://arxiv.org/abs/2412.19437"
category: "distributed_training"
parent: "pipeline_parallelism"
motivation: "通过将 Transformer 层内的计算与通信组件交错重叠，并采用双向调度，最大限度减少流水线气泡"
```

#### 📝 一句话总结

DualPipe 将 Transformer 层拆分为计算密集（Attention/MLP）与通信密集（All-to-All Dispatch/Combine）四个组件，利用双向流水线调度在前向与反向之间交错重叠计算与通信，将流水线气泡比降至 \(\frac{p-1}{2pm-1}\)，同时完全隐藏跨节点通信开销。

#### 🎯 核心要点

- **微批次内计算-通信重叠**：将每个 chunk 拆分为 Attention、All-to-All Dispatch、MLP、All-to-All Combine 四个组件，反向进一步拆分为 backward-for-input 和 backward-for-weight
- **双向调度**：从流水线两端同时注入微批次，两个方向的 chunk 在同一设备上交错执行，实现跨 chunk 的通信隐藏
- **极低气泡率**：气泡比为 \(\frac{p-1}{2pm-1}\)（\(p\) 为流水线阶段数，\(m\) 为每方向微批次数），显著优于 ZB1P 和 1F1B
- **内存换效率**：峰值内存为 \(p+1\) 份激活（2× 于 ZB2P），以内存代价换取最小气泡
- **适配 MoE 架构**：专为 DeepSeek-V3 的 MoE + Expert Parallelism 场景设计，重叠 All-to-All 通信与 Attention/MLP 计算

#### 🔬 深入细节

##### 核心示意图

![DualPipe 重叠策略](https://ar5iv.labs.arxiv.org/html/2412.19437/assets/x4.png)
*图 1：单对前向-反向 chunk 的计算-通信重叠策略。绿色为 Attention（计算密集），蓝色为 All-to-All Dispatch/Combine（通信密集），橙色为 MLP（计算密集）。通信组件与相邻 chunk 的计算组件重叠执行。*

![DualPipe 调度示例](https://ar5iv.labs.arxiv.org/html/2412.19437/assets/x5.png)
*图 2：8 个 PP rank、每方向 20 个微批次的 DualPipe 调度示例。两个方向的微批次从流水线两端同时注入，中间设备同时处理两个方向的 chunk。*

##### 算法伪代码

```python
# DualPipe 核心调度逻辑
def dualpipe_schedule(num_stages, num_microbatches_per_dir):
    """
    num_stages: p (PP ranks)
    num_microbatches_per_dir: m (每方向微批次数)
    """
    # 每个 chunk 内部的组件分解
    def forward_chunk(x):
        # 计算密集 → 通信密集 → 计算密集 → 通信密集
        h = attention(x)           # 计算密集 (可与其他chunk的通信重叠)
        h = all2all_dispatch(h)    # 通信密集 (可与其他chunk的计算重叠)
        h = mlp(h)                 # 计算密集
        h = all2all_combine(h)     # 通信密集
        return h

    def backward_chunk(loss):
        # 拆分为 backward_input 和 backward_weight
        # backward_input: 计算输入梯度 (在关键路径上)
        # backward_weight: 计算权重梯度 (可延迟, 用于重叠)
        grad_input = backward_for_input(loss)
        grad_weight = backward_for_weight(loss)  # 可与下一chunk重叠
        return grad_input, grad_weight

    # 双向调度: 从两端同时注入
    for stage in range(num_stages):
        # 前向方向: micro-batch 0,1,...,m-1 从 stage 0 → stage p-1
        # 反向方向: micro-batch m,m+1,...,2m-1 从 stage p-1 → stage 0
        # 在同一 stage 上交错执行两个方向的 chunk
        overlap_execute(
            forward_chunk_dir1,   # 方向1的前向计算部分
            backward_chunk_dir2,  # 方向2的反向通信部分
        )

    # 气泡仅出现在 warmup/cooldown 阶段
    bubble_ratio = (num_stages - 1) / (2 * num_stages * num_microbatches_per_dir - 1)
```

##### 方法细节解释

**动机与背景**

在大规模 MoE 模型训练中，Expert Parallelism 引入大量跨节点 All-to-All 通信。传统流水线并行（如 1F1B、ZB1P）将前向和反向视为不可分割的整体，无法在 chunk 内部进行计算-通信重叠。当 All-to-All 通信延迟与计算时间相当时，通信成为瓶颈，流水线效率大幅下降。

> 💡 关键：DualPipe 的核心洞察是——Transformer 层天然具有"计算→通信→计算→通信"的交替结构，可以将一个 chunk 的通信阶段与另一个 chunk 的计算阶段重叠。

**核心机制：四组件分解与交错重叠**

DualPipe 将每个 Transformer 层的前向过程分解为四个顺序组件：

$$\text{Forward: } \underbrace{\text{Attention}}_{\text{计算密集}} \rightarrow \underbrace{\text{All-to-All Dispatch}}_{\text{通信密集}} \rightarrow \underbrace{\text{MLP}}_{\text{计算密集}} \rightarrow \underbrace{\text{All-to-All Combine}}_{\text{通信密集}}$$

反向传播进一步拆分为两个独立阶段：
- **Backward-for-Input (B)**：计算输入梯度，位于关键路径上
- **Backward-for-Weight (W)**：计算权重梯度，可延迟执行

这种拆分使得：
1. 一个 chunk 的 Dispatch/Combine 通信可与另一个 chunk 的 Attention/MLP 计算并行
2. Backward-for-Weight 可从关键路径移出，用于填充空闲时隙

**双向调度机制**

DualPipe 从流水线两端同时注入微批次：
- **方向 1**：micro-batch 从 stage 0 流向 stage \(p-1\)
- **方向 2**：micro-batch 从 stage \(p-1\) 流向 stage 0

在稳态阶段，每个 stage 同时持有两个方向的 chunk，将一个方向的通信组件与另一个方向的计算组件重叠：

$$\text{Stage}_i: \quad \underbrace{\text{Attn}^{\text{dir1}}}_{\text{GPU计算}} \parallel \underbrace{\text{Combine}^{\text{dir2}}}_{\text{网络通信}}$$

> ⚠️ 注意：重叠要求 GPU 计算与网络通信使用不同硬件资源（SM vs. NIC），因此可以真正并行而非时分复用。

**气泡分析**

DualPipe 的流水线气泡仅出现在 warmup 和 cooldown 阶段。对于 \(p\) 个流水线阶段、每方向 \(m\) 个微批次，气泡比为：

$$\text{Bubble Ratio} = \frac{p - 1}{2pm - 1}$$

对比其他方法（以 \(p\) 阶段、总共 \(2m\) 个微批次计算）：

| 方法 | 气泡比 | 峰值激活内存 |
|------|---------|-------------|
| 1F1B | \(\frac{p-1}{2m}\) | \(p\) |
| ZB1P | \(\frac{p-1}{3 \times 2m}\) | \(p\) |
| ZB2P | \(\frac{p-1}{3 \times 2m}\) | \(p + \frac{p-1}{3}\) |
| **DualPipe** | \(\frac{p-1}{2pm-1}\) | \(p+1\) |

> 💡 关键：当 \(m \gg 1\) 时，DualPipe 的气泡比趋近于 \(\frac{1}{2m}\)，约为 ZB1P 的 \(\frac{1}{p}\) 倍——阶段数越多优势越明显。

**与传统方法的区别**

1. **vs. 1F1B/Interleaved**：传统方法仅在 chunk 间调度，无法重叠 chunk 内部的通信；DualPipe 深入 chunk 内部实现细粒度重叠
2. **vs. ZB1P/ZB2P (Zero Bubble)**：ZB 系列通过拆分 B 和 W 减少气泡，但不处理通信重叠；DualPipe 同时解决气泡和通信隐藏两个问题
3. **vs. 单向重叠**：仅单向流水线无法在所有 stage 上持续保持计算-通信重叠；双向调度确保稳态时每个 stage 都有两个方向的 chunk 可供交错

#### 🧪 练习题

```yaml
question: "DualPipe 相比 ZB1P 能进一步减少流水线气泡的关键原因是什么？"
options:
  - "使用了更小的微批次尺寸"
  - "双向调度使两个方向的 chunk 在同一 stage 交错，将通信隐藏在计算中从而缩短每个 chunk 的有效时长"
  - "减少了流水线阶段数"
  - "使用梯度累积消除了气泡"
answer: 1
explain: "DualPipe 通过双向注入微批次，使每个 stage 同时持有两个方向的 chunk，将通信密集组件与计算密集组件重叠执行，等效缩短了每个 chunk 的墙钟时间，从而在相同阶段数下获得更小的气泡比。"
```