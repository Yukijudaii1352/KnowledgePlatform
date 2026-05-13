### DeepSpeed-Ulysses

```yaml
id: ulysses
name: DeepSpeed Ulysses
full_name: "DeepSpeed-Ulysses: System Optimizations for Enabling Training of Extreme Long Sequence Transformer Models"
year: "2023"
org: Microsoft
paper_url: "https://arxiv.org/abs/2309.14509"
category: infra/distributed_training
parent: "—"
motivation: "通过序列维度分区+all-to-all通信实现高效长序列训练的序列并行方法"
```

#### 📝 一句话总结

DeepSpeed-Ulysses 提出了一种基于序列维度分区的序列并行方法，通过 all-to-all 集合通信在注意力计算前后转换分区维度（序列↔注意力头），实现了通信量与序列长度无关的 \(O(N/P)\) 高效通信，结合 ZeRO-3 内存优化支持百万级 token 长序列 Transformer 训练。

#### 🎯 核心要点

- **序列维度分区**：将输入序列沿 token 维度均匀切分到 P 个 GPU，每个 GPU 处理 \(N/P\) 个 token
- **All-to-All 通信转换**：在 QKV 线性投影后执行 all-to-all，将分区从"序列切分"转为"注意力头切分"，使每个 GPU 拥有完整序列的部分头
- **注意力机制无关性**：支持任意注意力实现（dense、sparse、FlashAttention），因为 all-to-all 后每个 GPU 上的注意力计算是完整的标准注意力
- **通信复杂度优势**：总通信量 \(O(N/P)\)，与序列长度无关；对比 Megatron-LM 的 \(O(N)\) all-gather 通信
- **与 ZeRO-3 深度集成**：模型状态（参数、梯度、优化器）通过 ZeRO-3 跨数据并行组分区，实现内存与通信的联合优化
- **可组合并行**：可与张量并行（TP）、流水线并行（PP）、数据并行（DP）正交组合
- **实验验证**：7B/30B 模型上持续优于 Megatron-LM，支持 4x 更长序列，dense/sparse 注意力均有效

#### 🔬 深入细节

##### 核心架构图

![DeepSpeed-Ulysses 序列并行设计](https://ar5iv.labs.arxiv.org/html/2309.14509/assets/figs/mha_v1.png)
*图：DeepSpeed-Ulysses 核心设计。输入序列按 token 维度分区到 P 个 GPU，经 QKV 投影后通过 all-to-all 转换为按注意力头分区，执行完整注意力后再 all-to-all 回到序列分区。*

##### 算法伪代码

```python
# DeepSpeed-Ulysses 序列并行核心流程
# 假设 P 个 GPU，序列长度 N，注意力头数 h

# Step 1: 输入分区 - 每个 GPU i 持有 input[i*(N/P) : (i+1)*(N/P)]
local_input = partition_sequence(input, rank, world_size)  # shape: [N/P, d]

# Step 2: 本地 QKV 线性投影
Q_local = W_q @ local_input  # shape: [N/P, h*d_h]
K_local = W_k @ local_input  # shape: [N/P, h*d_h]
V_local = W_v @ local_input  # shape: [N/P, h*d_h]

# Step 3: All-to-All 通信 (序列分区 → 头分区)
# 每个 GPU 从持有 [N/P, h] 变为持有 [N, h/P]
Q_heads = all_to_all(Q_local)  # shape: [N, (h/P)*d_h]
K_heads = all_to_all(K_local)  # shape: [N, (h/P)*d_h]
V_heads = all_to_all(V_local)  # shape: [N, (h/P)*d_h]

# Step 4: 本地注意力计算 (完整序列, 部分头) - 支持任意attention实现
attn_output = attention(Q_heads, K_heads, V_heads)  # FlashAttention/Sparse/Dense

# Step 5: All-to-All 通信 (头分区 → 序列分区)
output_local = all_to_all(attn_output)  # shape: [N/P, h*d_h]

# Step 6: 输出投影 + 后续 FFN (仍在序列分区下)
output = W_o @ output_local
```

##### 动机与背景

长序列训练是大语言模型的核心需求——从文档理解、代码生成到科学计算，序列长度从 2K 扩展到 100K+ tokens。然而，自注意力机制的 \(O(N^2)\) 计算和内存复杂度使得单 GPU 无法容纳长序列。

现有序列并行方案存在明显缺陷：

1. **Megatron-LM 序列并行**：仅并行化 LayerNorm 和 Dropout（非注意力核心），使用 all-gather + reduce-scatter 通信，总通信量为 \(O(N)\)，与序列长度线性相关
2. **Ring Attention (Li et al. 2022)**：通过环形传递 KV 块实现序列并行，但需要特定的注意力内核实现，不支持通用注意力机制

> 💡 关键洞察：注意力计算在头维度上天然独立——不同注意力头之间无数据依赖。因此可以将"序列切分"转换为"头切分"，让每个 GPU 独立计算部分头的完整注意力。

##### 核心机制：All-to-All 通信设计

DeepSpeed-Ulysses 的核心创新在于利用 **all-to-all 集合通信** 实现分区维度的高效转换：

**前向传播中的两次 all-to-all：**

1. **注意力前 all-to-all**：将 QKV 张量从 \([N/P, h \cdot d_h]\)（序列分区）重组为 \([N, (h/P) \cdot d_h]\)（头分区）
2. **注意力后 all-to-all**：将注意力输出从 \([N, (h/P) \cdot d_h]\)（头分区）重组回 \([N/P, h \cdot d_h]\)（序列分区）

**通信量分析：**

每次 all-to-all 中，每个 GPU 发送和接收的数据量为：

$$M_{a2a} = \frac{N}{P} \cdot h \cdot d_h \cdot (P-1)/P \approx \frac{N \cdot h \cdot d_h}{P} = \frac{N \cdot d}{P}$$

其中 \(d = h \cdot d_h\) 为隐藏维度。注意通信量与 \(N/P\)（每 GPU 的本地序列长度）成正比，**与总序列长度 N 无关**（当 P 随 N 线性增长时）。

对比 Megatron-LM 的 all-gather 通信量为 \(O(N)\)，DeepSpeed-Ulysses 在长序列场景下通信效率显著更优。

##### 注意力机制无关性

由于 all-to-all 后每个 GPU 持有**完整序列**的部分注意力头，本地注意力计算与标准单 GPU 注意力完全相同。这意味着：

- ✅ 直接支持 FlashAttention-2（高效 dense attention）
- ✅ 直接支持 Sparse Attention（block-sparse 等）
- ✅ 未来新的注意力变体无需修改并行逻辑

> ⚠️ 注意：序列并行度 P 必须整除注意力头数 h，即 \(h \mod P = 0\)。这是唯一的约束条件。

##### 与 ZeRO-3 的集成

DeepSpeed-Ulysses 与 ZeRO-3 内存优化深度集成，形成二维并行：

- **序列并行组**（SP group, P 个 GPU）：负责序列维度的分区和 all-to-all 通信
- **数据并行组**（DP group, D 个 GPU）：负责 ZeRO-3 的模型状态分区（参数、梯度、优化器状态）

总 GPU 数 = P × D。ZeRO-3 将模型参数分片到 D 个 GPU，每个 GPU 仅存储 \(1/D\) 的参数，通过 all-gather 在前向/反向时临时聚合。这使得：

$$\text{Memory per GPU} \propto \frac{\text{Model States}}{D} + \frac{\text{Activations}(N/P)}{1}$$

序列并行减少激活内存（与 \(N/P\) 相关），ZeRO-3 减少模型状态内存，两者正交互补。

##### 与传统方法的对比

| 特性 | DeepSpeed-Ulysses | Megatron-LM SP | Ring Attention |
|------|------------------|----------------|----------------|
| 并行维度 | 序列→头→序列 | LayerNorm/Dropout | 序列（环形KV传递） |
| 通信原语 | All-to-All | All-Gather + Reduce-Scatter | P2P Send/Recv |
| 通信量 | \(O(N/P)\) | \(O(N)\) | \(O(N/P)\) per step × P steps |
| 注意力支持 | 任意 | 需绑定特定实现 | 需定制内核 |
| 内存优化 | ZeRO-3 集成 | 张量并行绑定 | 独立 |
| 可扩展性 | P ≤ h | 受限于 TP 度 | 理论无限 |

##### 实验结果

在 A100 GPU 集群上的评估显示：

- **7B 模型 (32 GPU)**：DeepSpeed-Ulysses 在所有可比序列长度上吞吐量超过 Megatron-LM，且支持更长序列
- **30B 模型 (64 GPU)**：类似趋势，DeepSpeed-Ulysses 支持 4x 更长序列
- **强扩展性**：固定 131K 序列长度，64→256 GPU 时执行时间近线性下降
- **弱扩展性**：GPU 数与序列长度同比增长时，保持 >135 TFLOPs/GPU（接近峰值性能）
- **收敛验证**：1.3B 模型 32K 序列长度下，与 Megatron-LM 收敛曲线完全一致

#### 🧪 练习题

```yaml
question: "DeepSpeed-Ulysses 在注意力计算前后使用 all-to-all 通信的核心目的是什么？"
options:
  - "将模型参数分布到不同 GPU 以减少内存占用"
  - "将分区维度从序列切分转换为注意力头切分，使每个 GPU 可独立计算完整序列的部分头"
  - "实现梯度的跨 GPU 同步以保证训练一致性"
  - "将 KV cache 分布存储以支持更长的推理序列"
answer: 1
explain: "All-to-all 的作用是转换张量的分区维度：从按序列切分（每 GPU 持有部分 token 的所有头）变为按头切分（每 GPU 持有所有 token 的部分头），从而让每个 GPU 可以对完整序列执行标准注意力计算。"
```