### Megatron-LM 3D 并行 (PTD-P)

```yaml
id: megatron_3d
name: "Megatron-LM 3D Parallelism (PTD-P)"
full_name: "高效大规模语言模型 GPU 集群训练：Pipeline + Tensor + Data 三维并行"
year: "2021"
org: "NVIDIA / Stanford / Microsoft Research"
paper_url: "https://arxiv.org/abs/2104.04473"
category: "distributed_training"
parent: "—"
motivation: "将张量并行、流水线并行与数据并行有机组合，在数千 GPU 上高效训练万亿参数语言模型"
```

#### 📝 一句话总结

Megatron-LM PTD-P 提出将**张量并行（节点内 NVLink）、流水线并行（节点间）与数据并行**三维组合，并设计交错式 1F1B 流水线调度将气泡开销降低至 \(\frac{p-1}{m \cdot v}\)，在 3072 块 A100 GPU 上实现万亿参数模型训练，达到 502 petaFLOP/s（52% 峰值利用率）。

#### 🎯 核心要点

- **三维并行组合 (PTD-P)**：Tensor Parallelism (t) × Pipeline Parallelism (p) × Data Parallelism (d)，总 GPU 数 = t × p × d
- **张量并行限制在节点内**：利用 NVLink 高带宽（Takeaway #1），避免跨节点 all-reduce 瓶颈
- **流水线并行跨节点**：仅需点对点通信，带宽需求低，适合节点间 InfiniBand 互连
- **交错式 1F1B 调度**：每个设备分配 v 个虚拟流水线阶段，气泡比例从 \(\frac{p-1}{m}\) 降至 \(\frac{p-1}{m \cdot v}\)，吞吐提升 10%+
- **Scatter/Gather 通信优化**：将流水线阶段间传输的激活张量拆分为更小块，实现通信与计算重叠
- **激活重计算 (Activation Recomputation)**：用计算换显存，使更大模型可放入 GPU
- **微批次大小优化**：最优微批次大小取决于模型配置、流水线深度和全局批次大小（Takeaway #3）
- **性能**：1T 参数模型在 3072 A100 上达 502 petaFLOP/s；对比 ZeRO-3 吞吐高 70%

#### 🔬 深入细节

##### 系统架构总览

![PTD-P 三维并行示意图](https://ar5iv.labs.arxiv.org/html/2104.04473/assets/x4.png)
*图：PTD-P 将 GPU 组织为三维网格。节点内 GPU 通过 NVLink 进行张量并行（绿色），跨节点进行流水线并行（蓝色），剩余维度进行数据并行（红色）。*

##### 流水线调度

![流水线调度对比](https://ar5iv.labs.arxiv.org/html/2104.04473/assets/x5.png)
*图：上方为默认非交错 1F1B 调度，下方为交错式调度。交错式将每个 GPU 分配多个虚拟阶段，显著减小流水线气泡。*

##### 算法伪代码

```python
# PTD-P 三维并行训练伪代码
# 配置：t=tensor_parallel_size, p=pipeline_parallel_size, d=data_parallel_size
# 总 GPU 数 N = t * p * d
# 全局 batch B 被拆分为 m 个 microbatch

def ptd_p_training_step(model, global_batch, t, p, d, m):
    """
    一个训练步骤的执行流程
    """
    # 1. 数据并行：将 global_batch 均分到 d 个数据并行组
    local_batch = global_batch[dp_rank::d]  # 每组 B/d 个样本
    
    # 2. 将 local_batch 拆分为 m 个 microbatch
    microbatches = split(local_batch, m)
    
    # 3. 交错式 1F1B 流水线调度 (每个 GPU 持有 v 个虚拟阶段)
    # Warmup phase: 逐步填充流水线
    for i in range(warmup_microbatches):
        forward(microbatches[i])  # 张量并行: 节点内 all-reduce
    
    # Steady state: 1F1B 交替执行
    for i in range(steady_microbatches):
        backward(microbatches[i - offset])  # 反向传播
        forward(microbatches[i])             # 前向传播
    
    # Cooldown phase: 排空流水线
    for i in range(cooldown_microbatches):
        backward(microbatches[remaining[i]])
    
    # 4. 梯度同步：数据并行组内 all-reduce
    all_reduce_gradients(dp_group)
    
    # 5. 优化器更新
    optimizer.step()
```

##### 动机与背景

大规模语言模型（如 GPT-3 175B）的参数量远超单个 GPU 显存容量，必须使用模型并行。然而，单一并行策略各有局限：

| 并行策略 | 优势 | 局限 |
|---------|------|------|
| 数据并行 (DP) | 实现简单，扩展性好 | 每个 GPU 需存完整模型副本 |
| 张量并行 (TP) | 单层内高效拆分 | 需要高带宽互连（all-reduce），跨节点性能骤降 |
| 流水线并行 (PP) | 仅需点对点通信 | 流水线气泡造成 GPU 空闲 |
| ZeRO | 消除冗余状态存储 | 大规模时通信开销大 |

PTD-P 的核心洞察是：**不同并行策略应映射到不同的硬件拓扑层级**，充分利用各层级的通信带宽特性。

##### 核心机制详解

**1. 张量并行 (Tensor Model Parallelism)**

对 Transformer 中的 MLP 和自注意力层进行列/行切分：

$$\text{MLP: } Y = \text{GeLU}(XA) \cdot B$$

矩阵 \(A\) 按列切分为 \([A_1, A_2]\)，分布在 2 个 GPU 上：

$$Y_i = \text{GeLU}(X A_i), \quad Y = [Y_1, Y_2] B$$

矩阵 \(B\) 按行切分为 \(\begin{bmatrix} B_1 \\ B_2 \end{bmatrix}\)，最终输出通过 **all-reduce** 聚合：

$$Y = Y_1 B_1 + Y_2 B_2$$

每个 Transformer 层的前向传播需要 **2 次 all-reduce**（MLP + Self-Attention），反向传播同样需要 2 次。

> 💡 关键：张量并行的通信量与隐藏层大小 \(h\) 和序列长度 \(s\) 成正比，必须依赖 NVLink（600 GB/s）而非 InfiniBand（~100 GB/s）。

**2. 流水线并行与调度策略**

流水线将模型的 \(L\) 层均分到 \(p\) 个阶段，每阶段 \(L/p\) 层。

**非交错 1F1B 调度**的气泡时间比例为：

$$\text{Bubble fraction} = \frac{p - 1}{m}$$

其中 \(m\) 为微批次数量。当 \(m \gg p\) 时气泡可忽略，但这要求极大的全局批次大小。

**交错式调度**将每个 GPU 分配 \(v\) 个虚拟阶段（每个阶段仅 \(L/(p \cdot v)\) 层），气泡降低为：

$$\text{Bubble fraction (interleaved)} = \frac{p - 1}{m \cdot v}$$

> ⚠️ 注意：交错式调度的代价是通信量增加 \(v\) 倍（每个微批次需经过更多阶段间传输），因此需要 scatter/gather 优化来隐藏额外通信。

**3. 三维并行的组合策略**

给定 \(N\) 个 GPU 和每节点 \(g\) 个 GPU，最优配置遵循三条原则：

> 💡 **Takeaway #1**：张量并行度 \(t \leq g\)（不超过单节点 GPU 数），因为跨节点 all-reduce 代价过高。

> 💡 **Takeaway #2**：模型并行总规模 \(M = t \times p\) 应恰好使模型参数和激活适配 GPU 显存，剩余 GPU 用于数据并行 \(d = N / M\)。

> 💡 **Takeaway #3**：最优微批次大小需通过实验确定——过小则计算效率低（kernel launch 开销），过大则流水线气泡占比增加。

**4. 激活重计算 (Activation Recomputation)**

为节省显存，前向传播时不保存中间激活值，而是在反向传播时重新计算。这使得显存占用从 \(O(L \cdot s \cdot b \cdot h)\) 降至 \(O(s \cdot b \cdot h)\)（仅保存各阶段边界激活），代价是约 33% 的额外前向计算。

**5. 通信分析**

在 PTD-P 中，三种并行的通信模式互不干扰：

| 通信类型 | 操作 | 位置 | 带宽需求 |
|---------|------|------|---------|
| 张量并行 | all-reduce | 节点内 NVLink | 高（每层 2 次） |
| 流水线并行 | 点对点 send/recv | 节点间 | 低（仅阶段边界） |
| 数据并行 | all-reduce 梯度 | 全局 | 中（每步 1 次） |

实测在 3072 GPU 的万亿参数模型上：流水线点对点有效带宽 892 GB/s，数据并行 all-reduce 有效带宽 12.9 TB/s。

##### 与其他方法的对比

| 方法 | 万亿参数支持 | 峰值利用率 | 关键差异 |
|------|------------|-----------|---------|
| **PTD-P (本文)** | ✅ 3072 A100 | **52%** | 三维组合 + 交错调度 + 算子融合 |
| DeepSpeed 3D | ✅ V100 集群 | 36% | 无交错调度，V100 硬件 |
| ZeRO-3 | ✅ 理论上 | ~30% (大规模) | 通信量随规模线性增长 |
| Megatron-LM v1 (仅 TP) | ❌ 受限于节点数 | 高（小规模） | 无法跨节点扩展 |

PTD-P 在 175B 和 530B 模型上比纯 ZeRO-3 快 **70%**（双倍 GPU 时），核心原因是减少了跨节点通信。

##### 关键实验结果

- **万亿参数模型**：1T 参数 GPT，3072 A100 GPU，达 502 petaFLOP/s，预计训练时间约 84 天
- **交错调度增益**：在 175B 模型上，交错调度比非交错提升约 10% 吞吐
- **最优配置**：175B 模型最优为 (t=8, p=64, d=8)，530B 模型为 (t=8, p=35, d=...)
- **弱扩展**：流水线并行在 batch size 充足时接近线性扩展
- **算子融合**：对 175B 模型提升 19% 吞吐（113 → 135 TFLOP/s/GPU）

#### 🧪 练习题

```yaml
question: "在 Megatron-LM PTD-P 中，为什么张量并行度通常不超过单节点 GPU 数量？"
options:
  - "因为张量并行不支持超过 8 路拆分"
  - "因为张量并行需要频繁 all-reduce，跨节点带宽不足会成为瓶颈"
  - "因为流水线并行已经占用了节点间带宽"
  - "因为数据并行必须在节点内进行"
answer: 1
explain: "张量并行每层需要 2 次 all-reduce（前向）+ 2 次（反向），通信量大且延迟敏感。NVLink 提供 600 GB/s 带宽可满足需求，而跨节点 InfiniBand (~100 GB/s) 会严重拖慢训练速度。"
```