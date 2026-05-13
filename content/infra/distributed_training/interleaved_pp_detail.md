### Interleaved 1F1B Pipeline Parallelism

```yaml
id: interleaved_pp
name: "Interleaved 1F1B"
full_name: "Interleaved 1F1B Pipeline Schedule"
year: "2021"
org: "NVIDIA"
paper_url: "https://arxiv.org/abs/2104.04473"
category: "infra/distributed_training"
parent: "pipeline_parallelism"
motivation: "通过将模型分为多个虚拟阶段交错分配给设备，将流水线气泡缩小 v 倍，在通信开销可控的前提下显著提升 GPU 利用率"
```

#### 📝 一句话总结

Interleaved 1F1B 将每个设备分配 \(v\) 个非连续的模型块（model chunks），使流水线气泡从 \(\frac{p-1}{m}\) 缩小到 \(\frac{p-1}{m \cdot v}\)，以额外 \(v\) 倍点对点通信为代价显著提升大规模语言模型训练的设备利用率。

#### 🎯 核心要点

- **虚拟阶段划分**：将模型的 \(L\) 层均匀分为 \(v \times p\) 个虚拟阶段，每个设备承载 \(v\) 个非连续的 model chunks
- **气泡时间缩减**：流水线气泡比例从 \(\frac{p-1}{m}\) 降至 \(\frac{1}{v} \cdot \frac{p-1}{m}\)，即缩小 \(v\) 倍
- **通信代价**：点对点（P2P）通信量增加 \(v\) 倍，但可利用节点内 NVLink 高带宽隐藏
- **微批次约束**：微批次数量 \(m\) 必须是流水线并行度 \(p\) 的整数倍
- **内存不变**：稳态阶段仍保持 1F1B 的内存特性，峰值激活内存与 default schedule 相同
- **与 PTD-P 结合**：配合 Tensor 并行（节点内）+ Data 并行（节点间）实现千卡高效扩展

#### 🔬 深入细节

##### 核心示意图

![Interleaved 1F1B Pipeline Schedule](https://ar5iv.labs.arxiv.org/html/2104.04473/assets/x4.png)
*图：上方为 Default 1F1B Schedule，下方为 Interleaved 1F1B Schedule。每个设备被分配多个 model chunks（用不同颜色深浅表示），微批次在虚拟阶段间交替执行，warmup 和 cooldown 阶段更短，气泡更小。*

##### 算法伪代码

```python
# Interleaved 1F1B Pipeline Schedule
# p: pipeline parallel size, v: num model chunks per device
# m: num microbatches (must be divisible by p)
# Device i holds model chunks: [i, i+p, i+2p, ..., i+(v-1)*p]

def interleaved_1f1b(device_id, microbatches, model_chunks):
    p = pipeline_size
    v = len(model_chunks)  # number of chunks per device
    m = len(microbatches)
    
    # === Warmup Phase ===
    # Execute forward passes to fill the pipeline
    # Number of warmup microbatches is smaller than default
    num_warmup = (p - 1) * v  # across all virtual stages on this device
    for i in range(num_warmup):
        chunk_id = i % v  # rotate through model chunks
        micro_id = i // v
        forward(model_chunks[chunk_id], microbatches[micro_id])
    
    # === Steady State (1F1B) ===
    # Alternate one forward and one backward per microbatch
    for i in range(m - num_warmup):
        # Backward for an earlier microbatch
        chunk_id_b = schedule_backward(i)
        backward(model_chunks[chunk_id_b], ...)
        # Forward for the next microbatch
        chunk_id_f = schedule_forward(i)
        forward(model_chunks[chunk_id_f], microbatches[...])
    
    # === Cooldown Phase ===
    # Drain remaining backward passes
    for i in range(num_warmup):
        chunk_id = schedule_cooldown(i)
        backward(model_chunks[chunk_id], ...)
```

##### 方法细节

**动机与背景**

在大规模语言模型（如 GPT-3 175B）训练中，单设备无法容纳完整模型，流水线并行（Pipeline Parallelism）是必要的分布式策略。传统的 GPipe 方法将所有前向传播执行完毕后再执行反向传播，导致巨大的激活内存开销。PipeDream 提出的 1F1B（One Forward One Backward）调度通过交替执行前向和反向来限制内存，但仍存在不可避免的流水线气泡：

$$
\text{Bubble fraction (default)} = \frac{t_{pb}}{t_{id}} = \frac{p - 1}{m}
$$

其中 \(p\) 为流水线并行度，\(m\) 为微批次数量，\(t_{pb}\) 为气泡时间，\(t_{id}\) 为理想执行时间。当 \(p\) 较大时（如 \(p=64\)），即使 \(m\) 很大，气泡仍然显著。

> 💡 关键：气泡的根本原因是流水线的"填充"和"排空"阶段——第一个微批次必须经过所有阶段后，最后一个阶段才能开始反向传播。

**核心机制：虚拟阶段与交错调度**

Interleaved 1F1B 的核心思想是：**将每个设备分配多个非连续的模型层（model chunks）**，从而创建更多但更小的虚拟流水线阶段。

具体地，假设模型有 \(L\) 层，流水线并行度为 \(p\)，每个设备持有 \(v\) 个 model chunks：
- 总虚拟阶段数 = \(v \times p\)
- 每个 chunk 包含 \(\frac{L}{v \times p}\) 层
- 设备 \(i\) 持有阶段：\(i,\ i+p,\ i+2p,\ \ldots,\ i+(v-1)p\)

例如，当 \(p=4, v=2\) 时：
- Device 0 持有 Stage 0 和 Stage 4
- Device 1 持有 Stage 1 和 Stage 5
- Device 2 持有 Stage 2 和 Stage 6
- Device 3 持有 Stage 3 和 Stage 7

微批次按照虚拟阶段顺序 0→1→2→...→7 流动，但由于设备 0 同时持有 Stage 0 和 Stage 4，它会在处理完 Stage 0 的前向后，等待数据回到自己时再处理 Stage 4 的前向。这种交错使得流水线的"深度"在逻辑上不变，但每个阶段的计算量变为原来的 \(\frac{1}{v}\)，因此填充和排空时间也缩短为原来的 \(\frac{1}{v}\)：

$$
\text{Bubble fraction (interleaved)} = \frac{1}{v} \cdot \frac{p-1}{m}
$$

> ⚠️ 注意：这里的关键约束是微批次数量 \(m\) 必须是 \(p\) 的整数倍，以确保调度的均匀性。

**通信开销分析**

交错调度的代价是通信量增加。在 default schedule 中，每个微批次在相邻设备间传递一次激活张量（前向）和一次梯度张量（反向），共 \(2 \times (p-1)\) 次点对点通信。在 interleaved schedule 中，由于虚拟阶段数变为 \(v \times p\)，通信次数变为 \(2 \times v \times (p-1)\)，即增加 \(v\) 倍。

然而，论文指出这一额外通信可以通过以下方式缓解：
1. **节点内高带宽互联**：将 Tensor 并行放在节点内（NVLink），Pipeline 并行跨节点，利用 DGX A100 的 8 块 InfiniBand 网卡
2. **通信-计算重叠**：点对点通信可与其他设备上的计算并行执行
3. **散射/聚集优化**：将多个小消息合并为大消息传输

**与传统方法的对比**

| 特性 | GPipe | Default 1F1B | Interleaved 1F1B |
|------|-------|-------------|-----------------|
| 气泡比例 | \(\frac{p-1}{m}\) | \(\frac{p-1}{m}\) | \(\frac{p-1}{m \cdot v}\) |
| 激活内存 | \(O(m)\) | \(O(p)\) | \(O(p)\) |
| 通信量 | 基准 | 基准 | \(v\) 倍 |
| 微批次约束 | 无 | 无 | \(m \mod p = 0\) |
| 每设备层数 | 连续 \(\frac{L}{p}\) 层 | 连续 \(\frac{L}{p}\) 层 | \(v\) 个非连续块，每块 \(\frac{L}{vp}\) 层 |

**实际部署策略（PTD-P）**

论文提出 PTD-P（Pipeline, Tensor, Data Parallelism）组合策略：
- **Tensor 并行**（\(t\)）：节点内，利用 NVLink 高带宽（600 GB/s on A100）
- **Pipeline 并行**（\(p\)）：跨节点，使用 Interleaved 1F1B，通信量相对较小
- **Data 并行**（\(d\)）：跨节点，梯度 all-reduce 可与计算重叠

总 GPU 数 \(n = p \times t \times d\)。实验表明在 3072 块 A100 GPU 上训练 1T 参数模型可达 52% 峰值 FLOPS 利用率。

#### 🧪 练习题

```yaml
question: "在 Interleaved 1F1B 中，若流水线并行度 p=8，每设备持有 v=2 个 model chunks，微批次数 m=16，则流水线气泡占比约为多少？"
options:
  - "43.75%"
  - "21.88%"
  - "10.94%"
  - "3.13%"
answer: 1
explain: "气泡比例 = (p-1)/(m·v) = (8-1)/(16×2) = 7/32 ≈ 21.88%。选项 A 是未使用 interleaved 时的结果 (p-1)/m = 7/16；选项 C 和 D 分别对应 v=4 和 v=16 的情况。"
```