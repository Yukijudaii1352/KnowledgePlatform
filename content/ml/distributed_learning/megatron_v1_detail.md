### Megatron-LM v1 — 高效大规模 Transformer 模型并行训练

```yaml
id: megatron_v1
name: Megatron-LM
full_name: "Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism"
year: "2019"
org: NVIDIA
paper_url: "https://arxiv.org/abs/1909.08053"
category: distributed_training
parent: "—"
motivation: "通过简洁高效的层内模型并行方案，在不引入新编译器/框架的前提下，仅用少量通信原语实现数十亿参数 Transformer 的高效训练"
```

#### 📝 一句话总结

Megatron-LM 提出了一种针对 Transformer 的**层内张量模型并行**方案，通过对 MLP 和自注意力层的权重矩阵进行精心设计的列/行切分，仅需每层 2 次 all-reduce 即可实现多 GPU 并行训练，在 512 GPU 上训练 8.3B 参数模型达到 76% 弱扩展效率。

#### 🎯 核心要点

- **MLP 并行策略**：第一个 GEMM 按列切分（Column Parallel），GeLU 无需同步；第二个 GEMM 按行切分（Row Parallel），仅需一次 all-reduce
- **自注意力并行策略**：Q/K/V 投影按列切分（天然对应多头切分），输出投影按行切分，同样仅需一次 all-reduce
- **f / g 共轭算子**：f = 前向 identity + 反向 all-reduce；g = 前向 all-reduce + 反向 identity，成对使用消除冗余通信
- **Embedding 并行**：词表维度切分 + 将输出 logits 的 cross-entropy 融合计算，避免传输巨大的 \(b \times s \times v\) 张量
- **实现简洁**：仅需在 PyTorch 中插入少量通信原语（约 20 行代码改动），无需新编译器或框架
- **规模验证**：在 DGX-2H 集群（512 V100 GPU）上训练 8.3B 参数 GPT-2 模型，达到 15.1 PetaFLOPs 吞吐

#### 🔬 深入细节

##### 核心架构示意图

![Megatron-LM Transformer 模型并行示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/Figures/model-parallel-blocks.png)
*图：Transformer 层的模型并行方案。左侧为 MLP 块（列并行 + 行并行），右侧为自注意力块（按头切分）。f 和 g 为共轭通信算子。*

##### 算法伪代码

```python
# Megatron-LM 模型并行 Transformer 层前向传播伪代码
# 假设有 p 个 GPU，当前为第 i 个 GPU

def megatron_transformer_layer_forward(x, rank, world_size):
    """
    x: 输入张量 [batch, seq_len, hidden]，在所有 GPU 上完整复制
    """
    # ========== MLP Block ==========
    # f 算子：前向 identity（输入已在各 GPU 上复制）
    x_mlp = x  # identity in forward
    
    # 第一个 GEMM：列并行（每个 GPU 持有 A_i = A[:, i*cols:(i+1)*cols]）
    h_i = GeLU(x_mlp @ A_i)  # 各 GPU 独立计算 GeLU，无需同步！
    
    # 第二个 GEMM：行并行（每个 GPU 持有 B_i = B[i*rows:(i+1)*rows, :]）
    y_i = h_i @ B_i  # 局部矩阵乘
    
    # g 算子：前向 all-reduce
    y = all_reduce(y_i)  # 求和得到完整输出
    
    # Residual + LayerNorm（各 GPU 独立计算，输入已完整）
    x = LayerNorm(x + Dropout(y))
    
    # ========== Self-Attention Block ==========
    # f 算子：前向 identity
    x_attn = x
    
    # Q/K/V 列并行（每个 GPU 负责 h/p 个注意力头）
    Q_i = x_attn @ W_Q_i  # [b, s, d_head * (h/p)]
    K_i = x_attn @ W_K_i
    V_i = x_attn @ W_V_i
    
    # 局部注意力计算（各 GPU 独立）
    attn_i = softmax(Q_i @ K_i.T / sqrt(d_k)) @ V_i
    
    # 输出投影：行并行
    out_i = attn_i @ W_O_i
    
    # g 算子：前向 all-reduce
    out = all_reduce(out_i)
    
    # Residual + LayerNorm
    x = LayerNorm(x + Dropout(out))
    
    return x
```

##### 动机与背景

随着语言模型参数量从数亿增长到数十亿甚至更多，单个 GPU 的显存已无法容纳完整模型。传统的数据并行（Data Parallelism）虽然能扩展训练吞吐，但每个 GPU 仍需持有完整模型副本，无法突破单卡显存瓶颈。

已有的模型并行方案存在以下问题：
- **流水线并行**（如 GPipe）：需要精心设计 micro-batch 调度，存在 pipeline bubble，且对模型结构有侵入性修改
- **自动并行框架**（如 Mesh-TensorFlow、FlexFlow）：需要专用编译器或运行时，与现有 PyTorch 生态不兼容
- **层间切分**：通信量大且难以负载均衡

Megatron-LM 的核心洞察是：**Transformer 的结构天然适合层内张量并行**——MLP 的两个线性层和多头注意力的头维度提供了自然的切分点。

##### 核心机制：MLP 的列并行 + 行并行

考虑 MLP 块的计算：\(Y = \text{GeLU}(XA) \cdot B\)，其中 \(A \in \mathbb{R}^{h \times 4h}\)，\(B \in \mathbb{R}^{4h \times h}\)。

**关键设计决策**：第一个 GEMM 采用列切分（Column Parallel）。

将 \(A\) 按列分为 \([A_1, A_2, \ldots, A_p]\)，则：

$$
[XA_1, XA_2, \ldots, XA_p] = [Y_1, Y_2, \ldots, Y_p]
$$

由于 GeLU 是逐元素非线性函数：

$$
\text{GeLU}([Y_1, Y_2]) = [\text{GeLU}(Y_1), \text{GeLU}(Y_2)]
$$

> 💡 **关键洞察**：列切分使得 GeLU 可以在各 GPU 上独立计算，无需任何同步！如果采用行切分第一个 GEMM，则需要在 GeLU 前进行一次 all-reduce 同步，这会增加一次额外通信。

第二个 GEMM 采用行切分：将 \(B\) 按行分为 \([B_1; B_2; \ldots; B_p]\)，每个 GPU 计算 \(\text{GeLU}(Y_i) \cdot B_i\)，最终通过 all-reduce 求和得到完整输出。

##### 核心机制：f 和 g 共轭算子

为了在反向传播中正确计算梯度，Megatron-LM 定义了一对共轭算子：

| 算子 | 前向传播 | 反向传播 |
|------|----------|----------|
| **f** | identity（直通） | all-reduce（梯度聚合） |
| **g** | all-reduce（输出聚合） | identity（梯度直通） |

数学上，对于 MLP 块：
- 输入端放置 \(f\)：前向时各 GPU 拿到相同的输入副本（identity），反向时梯度需要 all-reduce 聚合
- 输出端放置 \(g\)：前向时各 GPU 的部分结果需要 all-reduce 求和，反向时梯度可以直接传回（identity）

$$
\text{Forward: } Y = g(\text{GeLU}(f(X) \cdot A_i) \cdot B_i)
$$

> ⚠️ **注意**：每个 Transformer 层总共只需要 **前向 2 次 all-reduce + 反向 2 次 all-reduce**（MLP 和 Attention 各一对 f/g）。

##### 核心机制：自注意力的头并行

多头注意力天然适合按头维度切分：

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W^O
$$

将 \(h\) 个头均匀分配到 \(p\) 个 GPU，每个 GPU 负责 \(h/p\) 个头。由于各头的计算完全独立，Q/K/V 的投影矩阵按列切分后，各 GPU 可独立完成注意力计算。最终的输出投影 \(W^O\) 按行切分，通过 all-reduce 聚合结果。

##### 核心机制：Embedding 层并行与 Cross-Entropy 融合

对于词表大小 \(v\) 很大的情况（如 50257），输出 embedding 层的权重 \(E \in \mathbb{R}^{h \times v}\) 按词表维度切分到各 GPU。

**通信优化**：如果先计算完整 logits 再做 cross-entropy，需要传输 \(b \times s \times v\) 的张量（非常大）。Megatron-LM 将 cross-entropy 的计算与并行 GEMM 融合：

1. 各 GPU 计算局部 logits \(l_i \in \mathbb{R}^{b \times s \times (v/p)}\)
2. 通过 all-reduce 获取全局最大值（用于数值稳定的 softmax）
3. 各 GPU 局部计算 \(\exp(l_i - \max)\) 并 all-reduce 求和得到归一化常数
4. 最终 loss 只需传输标量

> 💡 **效果**：通信量从 \(O(b \cdot s \cdot v)\) 降低到 \(O(b \cdot s)\)，对于大词表场景节省巨大。

##### 与传统方法的区别

| 方法 | 并行粒度 | 通信模式 | 实现复杂度 | 适用场景 |
|------|----------|----------|------------|----------|
| 数据并行 | 样本级 | 梯度 all-reduce | 低 | 模型能放入单卡 |
| 流水线并行 (GPipe) | 层级 | 点对点 | 中 | 深层网络 |
| Mesh-TensorFlow | 任意张量维度 | 编译器生成 | 高（需新框架） | 通用 |
| **Megatron-LM** | **层内张量级** | **2×all-reduce/层** | **低（~20行改动）** | **大 Transformer** |

Megatron-LM 的核心优势在于：
1. **无需新框架**：纯 PyTorch 实现，仅需 `torch.distributed` 的 all-reduce
2. **通信高效**：利用 Transformer 结构特点，将通信次数降到理论最优
3. **与数据并行正交**：可以同时使用模型并行（节点内）+ 数据并行（节点间）

##### 扩展性结果

在 NVIDIA DGX-2H 集群上的关键结果：
- **8 GPU 单节点**：8.3B 参数模型，模型并行效率 77%
- **512 GPU（64 节点）**：8.3B 参数模型，弱扩展效率 76%，达到 15.1 PetaFLOPs
- **对比基线**：相比单 GPU 训练，8 GPU 模型并行达到 77% 的线性加速比（理想为 100%）

#### 🧪 练习题

```yaml
question: "Megatron-LM 在 MLP 块中对第一个线性层采用列切分（Column Parallel）而非行切分的主要原因是什么？"
options:
  - "列切分可以减少参数量"
  - "列切分后 GeLU 可在各 GPU 上独立计算，避免一次额外的 all-reduce 同步"
  - "列切分的矩阵乘法计算速度更快"
  - "列切分可以使梯度计算更简单"
answer: 1
explain: "GeLU 是非线性函数，如果采用行切分则每个 GPU 只有部分和，必须先 all-reduce 得到完整结果才能应用 GeLU；而列切分使得每个 GPU 持有完整的输出列，GeLU 可独立计算，从而节省一次通信。"
```