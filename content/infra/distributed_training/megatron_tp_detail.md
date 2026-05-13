### Megatron-LM 1D TP

```yaml
id: megatron_tp
name: Megatron-LM 1D TP
full_name: 一维张量并行 (Megatron-LM 1D Tensor Parallel)
year: '2019'
org: NVIDIA
paper_url: https://arxiv.org/abs/1909.08053
category: tp
parent: —
motivation: 列并行MLP+行并行Attention每层仅2次通信
```

#### 📝 一句话总结

Megatron-LM 提出了一种简洁高效的层内张量并行方案，通过对 MLP 层采用列并行-行并行的 GEMM 切分策略、对 Self-Attention 层按注意力头分配到不同 GPU，使每个 Transformer 层仅需 2 次 All-Reduce 通信（前向 + 反向各 2 次），在 512 GPU 上实现 76% 的扩展效率。

#### 🎯 核心要点

- **列并行 MLP**：第一个 GEMM 按列切分权重矩阵，GeLU 可独立并行执行；第二个 GEMM 按行切分，输出通过 All-Reduce 聚合
- **行并行 Self-Attention**：Q/K/V 投影按列切分（每个注意力头分配到一个 GPU），输出投影按行切分
- **f / g 共轭算子**：\(f\) 前向恒等 + 反向 All-Reduce；\(g\) 前向 All-Reduce + 反向恒等，仅需几行 PyTorch 代码实现
- **每层 4 次通信**：前向 2 次 All-Reduce（MLP + Attention 各 1 次）+ 反向 2 次 All-Reduce
- **跨层无额外同步**：LayerNorm、Dropout、残差连接在各 GPU 上冗余计算，避免广播开销
- **并行交叉熵**：将 logits 按词表维度切分，仅通信标量 loss，大幅减少输出层通信量
- **与流水线并行正交**：可与 GPipe 等流水线方案组合使用
- **扩展性验证**：8.3B 参数模型在 512 GPU 上达到 15.1 PetaFLOPs，76% 弱扩展效率

#### 🔬 深入细节

##### 核心架构示意图

![Transformer 模型并行切分示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/mlp_mp_2.png)
*图：Megatron-LM 张量并行方案。(a) MLP 块的列并行 + 行并行切分；(b) Self-Attention 块按注意力头切分。f 和 g 为共轭通信算子。*

![通信操作示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/passesmp_2.png)
*图：一个 Transformer 层中的通信操作。前向传播和反向传播各有 2 次 All-Reduce，共 4 次通信操作。*

##### 算法伪代码

```python
# Megatron-LM 1D Tensor Parallel - MLP Block
# 假设有 p 个 GPU，权重矩阵 A ∈ R^{h×4h}, B ∈ R^{4h×h}

# === 前向传播 ===
# 输入 X 在所有 GPU 上相同（通过 f 算子：前向恒等）
X_local = f(X)  # identity in forward

# 第一个 GEMM：列并行（A 按列切分为 A_1, A_2, ..., A_p）
Y_i = GeLU(X @ A_i)  # 每个 GPU 独立计算，无需通信

# 第二个 GEMM：行并行（B 按行切分为 B_1, B_2, ..., B_p）
Z_i = Y_i @ B_i  # 每个 GPU 本地计算

# 输出聚合（通过 g 算子：前向 All-Reduce）
Z = g(Z_i)  # all-reduce in forward: Z = sum(Z_i)

# === f/g 算子实现 ===
class f(torch.autograd.Function):
    @staticmethod
    def forward(ctx, x):
        return x  # identity
    @staticmethod
    def backward(ctx, grad):
        return all_reduce(grad)  # all-reduce gradients

class g(torch.autograd.Function):
    @staticmethod
    def forward(ctx, x):
        return all_reduce(x)  # all-reduce outputs
    @staticmethod
    def backward(ctx, grad):
        return grad  # identity
```

##### 动机与背景

2019 年，随着 GPT-2、BERT 等预训练语言模型规模快速增长，单 GPU 显存已无法容纳数十亿参数的模型。传统的数据并行仅能解决计算瓶颈，无法突破单卡显存限制。已有的模型并行方案如 GPipe（流水线并行）和 Mesh-TensorFlow（通用张量切分）要么引入流水线气泡降低效率，要么需要自定义编译器和框架重写，部署门槛极高。

Megatron-LM 的核心动机是：**利用 Transformer 结构的天然可分性，设计一种仅需插入少量通信原语即可在原生 PyTorch 中实现的层内张量并行方案**，无需编译器支持，且与流水线并行正交可组合。

##### 核心机制：MLP 块的张量并行

MLP 块包含两个连续的线性变换，中间夹一个 GeLU 非线性激活：

$$Y = \text{GeLU}(XA), \quad Z = \text{Dropout}(YB)$$

其中 \(A \in \mathbb{R}^{h \times 4h}\)，\(B \in \mathbb{R}^{4h \times h}\)。

**关键洞察**：如果按行切分 \(A\)（即 \(X = [X_1, X_2]\)，\(A = [A_1; A_2]\)），则需要先对 \(X_1 A_1 + X_2 A_2\) 求和后才能应用 GeLU（因为 GeLU 是非线性函数，不满足可加性）。这会引入一次额外的同步点。

**Megatron 的选择**：按列切分 \(A = [A_1, A_2, \ldots, A_p]\)，此时：

$$[Y_1, Y_2, \ldots, Y_p] = [\text{GeLU}(XA_1), \text{GeLU}(XA_2), \ldots, \text{GeLU}(XA_p)]$$

每个 GPU 可以**独立**计算自己的 GeLU，无需同步。随后第二个 GEMM 的权重 \(B\) 按行切分为 \(B_1, B_2, \ldots, B_p\)，每个 GPU 计算 \(Z_i = Y_i B_i\)，最终通过一次 All-Reduce 得到完整输出 \(Z = \sum_i Z_i\)。

> 💡 关键：列并行第一层 + 行并行第二层的配对设计，使得两层 GEMM 之间无需通信，整个 MLP 块前向仅需 1 次 All-Reduce。

##### 核心机制：Self-Attention 块的张量并行

多头注意力天然具有并行结构——各注意力头之间相互独立。Megatron 利用这一特性：

1. **Q/K/V 投影**：按列切分（column-parallel），每个 GPU 负责若干注意力头对应的投影矩阵
2. **注意力计算**：每个 GPU 独立计算自己负责的注意力头，无需跨 GPU 通信
3. **输出投影**：按行切分（row-parallel），每个 GPU 的局部结果通过 All-Reduce 聚合

这样 Self-Attention 块同样仅需 1 次 All-Reduce（前向），与 MLP 块结构完全对称。

##### f / g 共轭算子设计

Megatron 引入了两个互为共轭的通信算子，优雅地将通信嵌入自动微分图：

| 算子 | 前向 | 反向 |
|------|------|------|
| \(f\) | 恒等（identity） | All-Reduce |
| \(g\) | All-Reduce | 恒等（identity） |

- \(f\) 放在并行区域的**入口**：前向时直接传入输入（各 GPU 持有相同副本），反向时对梯度做 All-Reduce 确保各 GPU 获得完整梯度
- \(g\) 放在并行区域的**出口**：前向时对各 GPU 的局部输出做 All-Reduce 得到完整结果，反向时梯度直接回传

> ⚠️ 注意：f 和 g 的组合确保了数学等价性——无论并行度如何，计算结果与单 GPU 完全一致。

##### 通信量分析

对于一个 Transformer 层（hidden size = \(h\)，序列长度 = \(s\)，batch size = \(b\)）：

- 每次 All-Reduce 通信量：\(O(bsh)\)（激活张量大小）
- 每层前向：2 次 All-Reduce（MLP 出口 + Attention 出口）
- 每层反向：2 次 All-Reduce（MLP 入口梯度 + Attention 入口梯度）
- **总计每层 4 次 All-Reduce**

相比之下，LayerNorm、Dropout、残差连接等操作在各 GPU 上冗余执行（参数量极小），避免了额外通信。

##### 并行交叉熵优化

输出层的 logits 维度为 \(b \times s \times V\)（\(V\) 为词表大小，通常 > 30000），直接 All-Gather 通信量巨大。Megatron 将词表维度按列切分到各 GPU，每个 GPU 计算局部 softmax 后仅通信标量 loss（维度 \(b \times s\)），通信量从 \(O(bsV)\) 降低到 \(O(bs)\)。

##### 与传统方法的对比

| 方法 | 并行粒度 | 通信模式 | 是否需要编译器 | 气泡开销 |
|------|----------|----------|---------------|----------|
| 数据并行 | 样本级 | All-Reduce 梯度 | 否 | 无 |
| GPipe 流水线并行 | 层级 | 点对点 | 否 | 有（pipeline bubble） |
| Mesh-TensorFlow | 任意张量维度 | 自动推导 | 是（XLA） | 无 |
| **Megatron 1D TP** | **层内张量** | **All-Reduce** | **否（原生 PyTorch）** | **无** |

Megatron 的优势在于：实现极简（仅需几行通信代码）、无气泡、与流水线并行正交可组合、无需编译器支持。其局限是 All-Reduce 通信量随并行度线性增长，适合节点内高带宽互联（如 NVLink），跨节点扩展性受限（通常 TP 度 ≤ 8）。

#### 🧪 练习题

```yaml
question: "Megatron-LM 对 MLP 第一个 GEMM 采用列并行而非行并行的核心原因是什么？"
options:
  - "列并行可以减少参数量"
  - "列并行允许 GeLU 在各 GPU 上独立计算，避免非线性前的同步"
  - "列并行的通信带宽需求更低"
  - "列并行可以支持更大的 batch size"
answer: 1
explain: "GeLU 是非线性函数，行并行切分需要先 All-Reduce 求和再应用 GeLU（多一次同步），而列并行使各 GPU 输出独立，GeLU 可直接本地执行。"
```