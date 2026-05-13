### 选择性激活重计算 (Selective Activation Recomputation)

```yaml
id: activation_recomputation
name: Selective Activation Recomputation
full_name: "选择性激活重计算与序列并行 (Reducing Activation Recomputation in Large Transformer Models)"
year: "2022"
org: NVIDIA
paper_url: "https://arxiv.org/abs/2205.05198"
category: infrastructure
parent: "Megatron-LM"
motivation: "通过序列并行和选择性激活重计算，将大模型训练中的激活内存降低5倍，重计算开销从30-40%降至不足5%"
```

#### 📝 一句话总结

本文提出**序列并行 (Sequence Parallelism)** 和**选择性激活重计算 (Selective Activation Recomputation)** 两项互补技术：前者将 LayerNorm/Dropout 等非张量并行区域沿序列维度切分，后者仅对内存占用大但计算量低的注意力核心激活进行重计算，二者结合将 Transformer 训练的激活内存降低约 5 倍，重计算时间开销从 30-40% 降至不足 5%，使 530B 参数模型在 2240 张 A100 上达到 54.2% MFU。

#### 🎯 核心要点

- **问题定义**：大规模 Transformer 训练中，激活内存远超模型参数和优化器状态，成为扩展瓶颈；全量激活重计算虽能节省内存，但引入 30-40% 的计算开销
- **序列并行 (Sequence Parallelism)**：将张量并行未覆盖的 LayerNorm、Dropout 区域沿序列维度切分到 \(t\) 个设备上，引入 \(g/\bar{g}\) 通信算子替换原有 \(f/\bar{f}\)，**不增加任何额外通信量**（ring all-reduce = reduce-scatter + all-gather）
- **选择性激活重计算 (Selective Recomputation)**：仅对 \(QK^T\) 矩阵乘、softmax、attention dropout 等注意力核心操作进行重计算（对应 \(5as/h\) 项），保留其余计算密集型激活（对应 34 项），实现"存少量、算少量"的最优平衡
- **激活内存公式体系**：从无并行 \(sbh(34 + 5as/h)\) 到 TP+SP+选择性重计算 \(34 \cdot sbh/t\)，提供完整的内存分析框架
- **实验验证**：22B 到 1T 参数规模，激活内存降低 5×，单层重计算开销仅 4%；530B GPT-3 级模型 MFU 从 42.1%（全量重计算）提升至 54.2%（提速 29%）

#### 🔬 深入细节

![Transformer 序列并行架构图](https://ar5iv.labs.arxiv.org/html/2205.05198/assets/figures/transformer-tensor-sequence-parallel.jpg)
*图：带有张量并行和序列并行的 Transformer 层。\(g\) 和 \(\bar{g}\) 是新引入的通信算子，分别在前向/反向传播中执行 all-gather/reduce-scatter 操作，将序列并行区域与张量并行区域无缝衔接。*

![Self-Attention 选择性重计算区域](https://ar5iv.labs.arxiv.org/html/2205.05198/assets/figures/self-attention.jpg)
*图：Self-Attention 块。红色虚线标注的区域（\(QK^T\)、softmax、dropout）即为选择性重计算的目标——这些操作内存占用大（\(5as/h\) 项）但 FLOPs 密度极低。*

```python
# 选择性激活重计算伪代码
class TransformerLayerWithSelectiveRecompute:
    def forward(self, x):
        # === 序列并行区域 (数据沿 seq 维切分到 t 个设备) ===
        x = LayerNorm(x)           # 在 s/t 长度上计算
        x = g(x)                   # all-gather: 收集完整序列 → 进入 TP 区域
        
        # === 张量并行区域 (MHA) ===
        Q, K, V = LinearQKV(x)     # 权重按 head 切分, 激活: 已存储 ✓
        
        # --- 选择性重计算区域 (不存储, 反向时重算) ---
        # checkpoint_start()
        scores = Q @ K.T / sqrt(d) # QK^T: 形状 [b, a/t, s, s], 不存储 ✗
        attn = softmax(scores)     # softmax 输出: 不存储 ✗  
        attn = dropout(attn)       # dropout mask: 不存储 ✗
        # checkpoint_end()         # 总计节省: 5as/(ht) * sbh 字节/层
        
        context = attn @ V         # attention over V: 已存储 ✓
        output = LinearOut(context) # 输出投影: 已存储 ✓
        
        x = g_bar(output)          # reduce-scatter: 切回 s/t → 序列并行区域
        x = Dropout(x)             # 在 s/t 长度上计算
        x = residual + x
        
        # === MLP 部分类似: g → TP线性层 → g_bar → 序列并行 ===
        x = LayerNorm(x)
        x = g(x)                   # all-gather
        x = Linear1(x)             # 第一个线性层 (扩展 4h)
        x = GeLU(x)                # 已存储 ✓
        x = Linear2(x)             # 第二个线性层 (压缩回 h)
        x = g_bar(x)               # reduce-scatter
        x = Dropout(x)
        x = residual + x
        return x
```

##### 动机与背景：激活内存的瓶颈

训练大规模 Transformer 模型时，GPU 内存需要同时容纳三类数据：**模型参数**、**优化器状态**和**激活值 (activations)**。对于使用混合精度训练的模型，参数和优化器状态的内存需求约为每参数 20 字节（fp16 参数 + fp32 主参数副本 + fp32 Adam 一阶/二阶动量）。然而，随着模型规模增大，**激活内存的增长速度远超参数内存**——因为激活与 batch size、序列长度成正比，而参数量仅与模型宽度和深度相关。

> 💡 **关键洞察**：以 GPT-3 175B 为例，即使使用 8 路张量并行，每个 GPU 上的激活内存仍需约 16.9 GB（序列长度 2048，微批大小 1），而参数 + 优化器仅需约 5.2 GB。激活内存是真正的扩展瓶颈。

传统解决方案是**激活检查点 (Activation Checkpointing)**，即在前向传播时丢弃中间激活，反向传播时重新计算。这将激活内存从 \(O(L)\) 降至 \(O(1)\)（每层仅保存输入），但代价是额外执行一次完整前向传播，引入约 **33% 的理论计算开销**（实测因通信重叠等因素可达 **39%**）。

##### 核心机制一：序列并行 (Sequence Parallelism)

**问题**：标准张量并行 (Tensor Parallelism, TP) 仅对 Transformer 层中的线性运算（QKV 投影、输出投影、MLP 两个线性层）进行切分。而 LayerNorm、Dropout 等操作的输入是**完整的** \(s \times b \times h\) 张量，无法被 TP 切分。这导致每个 GPU 上有一部分激活是冗余存储的。

具体而言，在标准 TP 下，每层每 GPU 的激活内存为：

$$\text{TP baseline} = sbh\left(10 + \frac{24}{t} + \frac{5as}{ht}\right)$$

其中 \(10 \cdot sbh\) 对应未被 TP 切分的区域（2 个 LayerNorm 输入、2 个 Dropout mask、2 个 Dropout 输入，各占不同字节数），\(24/t\) 和 \(5as/(ht)\) 对应已被 TP 切分的区域。

**解决方案**：序列并行将这些非 TP 区域沿**序列维度**切分到 \(t\) 个设备上。关键在于引入两个新的通信算子：

- **\(g\) 算子**：前向传播执行 **all-gather**（将 \(s/t\) 长度的片段收集为完整序列 \(s\)），反向传播执行 **reduce-scatter**
- **\(\bar{g}\) 算子**：前向传播执行 **reduce-scatter**（将完整序列的梯度聚合并切分），反向传播执行 **all-gather**

> ⚠️ **关键点：零额外通信开销**。原始 TP 使用 all-reduce 进行梯度同步，而 all-reduce 本质上等价于 reduce-scatter + all-gather。序列并行只是将这两个操作**拆开**，分别放在 TP 区域的入口和出口，因此总通信量完全不变。

应用序列并行后，激活内存变为：

$$\text{TP + SP} = sbh\left(\frac{34}{t} + \frac{5as}{ht}\right) = \frac{sbh}{t}\left(34 + \frac{5as}{h}\right)$$

所有激活现在都被 \(t\) 均匀切分，实现了**完美的内存缩放**。

##### 核心机制二：选择性激活重计算 (Selective Activation Recomputation)

**问题**：即使有序列并行，大模型的激活内存仍可能超出 GPU 容量。传统方法要么全量重计算（开销大），要么按层粒度选择性存储（粒度太粗，如 MT-NLG 每 GPU 仅 3 层）。

**关键观察**：Transformer 层中不同操作的**内存-计算比**差异巨大：

| 操作类别 | 激活内存占比 | FLOPs 密度 | 特征 |
|---------|------------|-----------|------|
| 线性层 (QKV, Out, MLP) | \(34 \cdot sbh\) | 高（矩阵乘法） | 计算密集 |
| 注意力核心 (QK^T, softmax, dropout) | \(5as/h \cdot sbh\) | 低（逐元素操作） | 内存密集 |

对于 GPT-3：\(5as/h = 5 \times 96 \times 2048 / 12288 = 80\)，远大于 34。这意味着注意力核心操作占据了 **70% 的激活内存**，但其计算量仅占总 FLOPs 的极小比例。

**解决方案**：只对注意力核心操作（\(QK^T\) 矩阵乘、softmax、attention dropout）进行检查点和重计算，保留所有线性层的激活。

应用选择性重计算后，结合序列并行：

$$\text{TP + SP + Selective} = \frac{34 \cdot sbh \cdot L}{t}$$

> 💡 **效果量化**：
> - **GPT-3 (175B)**：节省 70% 激活内存，仅增加 2.7% FLOPs
> - **MT-NLG (530B)**：节省 65% 激活内存，仅增加 1.6% FLOPs
> - 对比全量重计算的 33% FLOPs 开销，选择性重计算的效率提升超过 **10 倍**

##### 与传统方法的对比

| 方法 | 每层激活内存 (bytes) | 重计算开销 | 适用场景 |
|------|---------------------|-----------|---------|
| 无重计算 | \(sbh(34 + 5as/h)\) | 0% | 小模型 |
| 全量重计算 | \(2 \cdot sbh\) | 30-40% | 内存极度受限 |
| 本文 (TP+SP+Selective) | \(34 \cdot sbh/t\) | ~4% | 大规模训练最优解 |

在 22B 模型的单层实验中，全量重计算的前向+反向开销为 **39%**，而选择性重计算 + 序列并行的开销仅为 **4%**。在端到端 530B 模型训练中，本文方法达到 **54.2% MFU**，相比全量重计算的 42.1% MFU 提速 **29%**。

![激活内存对比](https://ar5iv.labs.arxiv.org/html/2205.05198/assets/figures/percentage-full-activations.jpg)
*图：不同技术相对于 TP baseline 的激活内存占比。序列并行和选择性重计算各自将内存减半，二者结合实现约 5× 的内存缩减。*

##### 流水线并行下的考量

在流水线并行 (Pipeline Parallelism) 场景下，第一个 stage 需要同时保存所有微批次的激活（因为必须等待所有微批次的反向传播完成）。设流水线并行度为 \(p\)，每个 stage 有 \(L/p\) 层，则第一个 stage 需要存储的激活量为：

$$\text{Pipeline stage 1} = L \cdot \frac{34 \cdot sbh}{t}$$

注意这里是 \(L\)（总层数）而非 \(L/p\)，因为需要为 \(p\) 个微批次各保存 \(L/p\) 层的激活。这意味着流水线并行**不能**减少第一个 stage 的激活内存峰值，序列并行和选择性重计算的内存节省在此场景下尤为关键。

#### 🧪 练习题

```yaml
question: "序列并行相比标准张量并行，其额外通信开销是多少？"
options:
  - "增加一倍通信量，因为需要额外的 all-gather 和 reduce-scatter"
  - "零额外开销，因为原有的 all-reduce 被等价拆分为 reduce-scatter + all-gather"
  - "减少一半通信量，因为只需传输序列的 1/t"
  - "增加 O(log t) 的通信轮次"
answer: 1
explain: "Ring all-reduce 本质上由 reduce-scatter 和 all-gather 两步组成。序列并行只是将这两步拆开，分别放在张量并行区域的入口和出口，总通信量与原始 all-reduce 完全相同。"
```