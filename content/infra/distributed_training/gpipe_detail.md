### GPipe

```yaml
id: gpipe
name: GPipe
full_name: "GPipe: 使用流水线并行高效训练巨型神经网络"
year: 2019
org: Google Brain
paper_url: "https://arxiv.org/abs/1811.06965"
category: infra/distributed_training
parent: "—"
motivation: "通过同步微批次流水线并行与重计算技术，使单层可放入单卡的任意深度网络能近线性扩展到多加速器，解决巨型模型训练的显存与效率瓶颈"
```

#### 📝 一句话总结

GPipe 提出了一种基于微批次拆分的同步流水线并行算法，结合激活重计算（re-materialization）技术，使任意可表示为层序列的深度网络能够在多加速器间近线性扩展模型规模，同时保持训练一致性和高硬件利用率。

#### 🎯 核心要点

- **流水线并行**：将网络按层顺序切分为 K 个分区，每个分区放置在一个独立加速器上
- **微批次拆分**：将 mini-batch 拆分为 M 个 micro-batch，在各分区间流水线式执行，减少 bubble 空闲时间
- **同步梯度更新**：所有 micro-batch 的梯度在 mini-batch 结束时累积并同步应用，保证训练一致性（等价于单卡训练）
- **激活重计算（Re-materialization）**：前向传播仅保留分区边界激活，反向时重新计算中间激活，将峰值显存从 \(O(N)\) 降至 \(O(N/K + L/K \cdot N/M)\)
- **Bubble 开销分析**：空闲时间比例为 \(O((K-1)/(M+K-1))\)，当 \(M \geq 4K\) 时可忽略不计
- **通信开销极低**：仅在分区边界传输激活张量，无需 AllReduce，适用于无高速互联的场景
- **规模验证**：AmoebaNet 扩展至 18 亿参数（8 GPU），Transformer 扩展至 839 亿参数（128 TPU），ImageNet top-1 达 84.4%，102 语言多语言翻译任务达 SOTA

#### 🔬 深入细节

![GPipe 流水线并行示意图](https://ar5iv.labs.arxiv.org/html/1811.06965/assets/x1.png)
*图：GPipe 将网络分为 K 个分区并将 mini-batch 拆分为 M 个 micro-batch 进行流水线执行。上方为朴素模型并行（大量 bubble），下方为 GPipe 流水线并行（bubble 大幅减少）。*

```python
# GPipe 核心算法伪代码
def gpipe_forward_backward(model_partitions, mini_batch, M):
    """
    model_partitions: K 个分区 [p_0, p_1, ..., p_{K-1}]
    mini_batch: 输入数据
    M: micro-batch 数量
    """
    K = len(model_partitions)
    micro_batches = split(mini_batch, M)  # 拆分为 M 个 micro-batch
    
    # === 前向传播（流水线） ===
    # 每个分区仅保留边界输入激活，丢弃中间激活
    for m in range(M):
        for k in range(K):
            # 分区 k 对第 m 个 micro-batch 执行前向
            # 输出传递给分区 k+1
            output[k][m] = forward(model_partitions[k], input[k][m])
            input[k+1][m] = output[k][m]  # 跨设备传输
    
    # === 反向传播（流水线，逆序） ===
    for m in range(M):
        for k in reversed(range(K)):
            # Re-materialization: 从保存的边界激活重新前向计算
            recompute_activations(model_partitions[k], input[k][m])
            # 计算梯度并累积
            grad[k][m] = backward(model_partitions[k], loss[m])
            accumulated_grad[k] += grad[k][m]
    
    # === 同步更新 ===
    for k in range(K):
        update_weights(model_partitions[k], accumulated_grad[k] / M)
```

##### 动机与背景

近年来深度学习的突破性进展很大程度上依赖于模型规模的增长——从 BERT 的 3.4 亿参数到 GPT-2 的 15 亿参数。然而，单个加速器的内存容量严重限制了可训练模型的大小。传统的数据并行仅能加速训练吞吐量，无法解决单模型过大无法放入单卡的问题。

已有的模型并行方案存在明显缺陷：
- **朴素模型并行**：将不同层放在不同设备上，但同一时刻只有一个设备在计算，硬件利用率极低
- **Mesh-TensorFlow (SPMD)**：将单个矩阵乘法拆分到多设备，但引入大量 AllReduce 通信，且仅适用于特定架构（如 Transformer），对卷积网络不友好
- **PipeDream**：使用异步流水线，引入权重版本不一致（weight staleness）问题，需要维护多份参数副本，反而限制了模型规模

GPipe 的设计目标是：**在保持训练语义完全等价于单卡训练的前提下，实现近线性的模型规模扩展和高硬件利用率**。

##### 核心机制：微批次流水线并行

GPipe 的核心创新在于将流水线并行与微批次拆分相结合：

**1. 模型分区**

网络被建模为 L 层的序列：

$$f = f_L \circ f_{L-1} \circ \cdots \circ f_1$$

将连续的层分为 K 个分区 \(p_0, p_1, \ldots, p_{K-1}\)，第 k 个分区放在第 k 个加速器上。分区策略的目标是使各分区的计算量（FLOPs 估计）尽可能均衡。

**2. 微批次拆分与流水线调度**

将大小为 N 的 mini-batch 均匀拆分为 M 个大小为 \(N/M\) 的 micro-batch。在前向阶段，各 micro-batch 依次注入流水线；当第 1 个 micro-batch 到达分区 \(p_1\) 时，分区 \(p_0\) 可以开始处理第 2 个 micro-batch，形成流水线并行。

> 💡 关键：不同 micro-batch 之间**没有数据依赖**（因为梯度是独立计算后累积的），因此可以完美流水线化。

**3. 同步梯度累积**

所有 M 个 micro-batch 的梯度在各分区本地累积，在整个 mini-batch 处理完毕后执行一次统一的参数更新：

$$\theta_{t+1} = \theta_t - \eta \cdot \frac{1}{M} \sum_{m=1}^{M} \nabla_\theta \mathcal{L}(f(x_m; \theta_t))$$

这保证了训练语义与使用完整 mini-batch 的单卡训练**完全一致**，不存在异步更新带来的收敛问题。

> ⚠️ 注意：与 PipeDream 的关键区别在于，GPipe 使用同步更新，不存在 weight staleness，因此无需维护多版本参数。

##### 显存优化：激活重计算

在标准反向传播中，需要保存所有层的前向激活以计算梯度，显存需求为 \(O(N \cdot L)\)。GPipe 采用 re-materialization 策略：

- 前向传播时，每个分区**仅保存边界处的输入激活**（即从上一分区接收的张量）
- 反向传播时，从保存的边界激活**重新执行前向计算**以恢复中间激活
- 这将每个分区的峰值激活显存从 \(O(N \cdot L/K)\) 降至 \(O(N/M \cdot L/K)\)

总峰值显存为：

$$\text{Memory} = O\left(\frac{N}{M} \cdot \frac{L}{K}\right) + O(N)$$

其中第一项是单个 micro-batch 在单个分区内的激活，第二项是跨分区边界需要保存的所有 micro-batch 的边界激活。

##### Bubble 开销分析

流水线中不可避免存在"气泡"（bubble）——某些加速器在等待上游数据时处于空闲状态。GPipe 的 bubble 时间比例为：

$$\text{Bubble fraction} = \frac{(K-1)}{M + K - 1}$$

当 \(M = 4K\) 时，bubble 仅占 \(\frac{K-1}{5K-1} < 20\%\)；当 \(M \gg K\) 时趋近于 0。实验证实 \(M \geq 4K\) 时性能损失可忽略。

##### 通信特性

GPipe 的跨设备通信**仅发生在分区边界**，每个 micro-batch 仅需传输一次边界激活张量（前向）和一次梯度张量（反向）。这与 SPMD 方法中每层都需要 AllReduce 形成鲜明对比。实验表明，即使在没有 NVLink 的 PCIe 连接 GPU 上，GPipe 仍能实现近线性加速（8 GPU 达 3.3× 加速）。

##### 实验验证

| 场景 | 配置 | 模型规模 | 关键结果 |
|------|------|----------|----------|
| AmoebaNet | 8× GPU (8GB) | 1.8B 参数 | 相比单卡扩展 25× |
| Transformer | 128× TPUv3 (16GB) | 83.9B 参数 | 相比单卡扩展 298× |
| ImageNet | 4 分区, 557M AmoebaNet-B | — | 84.4% top-1 (SOTA) |
| 多语言翻译 | 16 分区, 6B Transformer | 102 语言 | 全面超越双语基线 |

训练效率方面，Transformer 在 \(M=32, K=8\) 时达到 6.3× 加速（理论上限 8×），接近线性扩展。

##### 与其他方法的对比

| 特性 | GPipe | Mesh-TF (SPMD) | PipeDream |
|------|-------|----------------|-----------|
| 通信开销 | 极低（仅边界） | 高（每层 AllReduce） | 中等 |
| 训练一致性 | 完全同步 | 完全同步 | 异步（weight stale） |
| 架构限制 | 任意序列网络 | 特定架构 | 任意 |
| 显存效率 | 高（重计算） | 中 | 低（多版本参数） |
| 互联要求 | 无特殊要求 | 需高速互联 | 无特殊要求 |

> 💡 关键：GPipe 的核心优势在于**通用性**（支持任意可表示为层序列的网络）和**训练一致性**（同步更新保证收敛行为不变），代价是重计算带来约 25% 的额外计算开销。

##### 局限性

- 要求单层能放入单个加速器的显存
- 对 BatchNorm 等需要跨 batch 统计的层需要特殊处理（训练时使用 micro-batch 统计，评估时累积 mini-batch 统计）
- 分区负载均衡对非均匀架构（如 AmoebaNet）较难优化

#### 🧪 练习题

```yaml
question: "GPipe 中将 mini-batch 拆分为 M 个 micro-batch 的主要目的是什么？"
options:
  - "减少每个 micro-batch 的计算量以加速单步训练"
  - "通过流水线并行减少加速器空闲时间（bubble），提高硬件利用率"
  - "实现异步梯度更新以提升收敛速度"
  - "减少跨设备通信的数据量"
answer: 1
explain: "微批次拆分使多个分区能同时处理不同的 micro-batch，形成流水线并行，将 bubble 比例从接近 100%（朴素模型并行）降至 O((K-1)/(M+K-1))，M 越大硬件利用率越高。"
```