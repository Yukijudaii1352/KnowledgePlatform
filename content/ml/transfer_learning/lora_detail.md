### LoRA

```yaml
id: lora
name: LoRA
full_name: 低秩自适应 (Low-Rank Adaptation of Large Language Models)
year: "2021"
org: Microsoft
paper_url: https://arxiv.org/abs/2106.09685
category: parameter_efficient_finetuning
parent: —
motivation: 通过低秩矩阵分解冻结预训练权重并注入可训练旁路，以极少参数实现大模型高效微调
```

#### 📝 一句话总结

LoRA 提出冻结预训练模型权重，通过向 Transformer 的注意力层注入可训练的低秩分解矩阵 \(B \cdot A\) 来实现参数高效微调，在 GPT-3 175B 上将可训练参数减少 10,000 倍且推理无额外延迟。

#### 🎯 核心要点

- 核心思想：预训练模型的权重更新 \(\Delta W\) 具有低"内在秩"，可用低秩矩阵 \(BA\) 近似
- 参数效率：GPT-3 175B 可训练参数从 175B 降至 4.7M（减少约 10,000×），GPU 显存降低 3 倍
- 零推理延迟：部署时将 \(\Delta W = BA\) 合并回原始权重 \(W_0 + BA\)，无需额外计算
- 初始化策略：\(A\) 使用高斯随机初始化，\(B\) 初始化为零矩阵，训练开始时 \(\Delta W = 0\)
- 适配位置：实验表明同时适配 \(W_q\) 和 \(W_v\) 效果最佳，即使 rank 很低（r=1~4）也能取得优异性能
- 可切换性：多个任务的 LoRA 模块可热切换，仅需存储和加载小型低秩矩阵

#### 🔬 深入细节

![LoRA 核心示意图](https://ar5iv.labs.arxiv.org/html/2106.09685/assets/x1.png)
*图：LoRA 的重参数化示意。左侧为冻结的预训练权重 \(W \in \mathbb{R}^{d \times k}\)，右侧为可训练的低秩旁路 \(BA\)，其中 \(B \in \mathbb{R}^{d \times r}\)，\(A \in \mathbb{R}^{r \times k}\)，\(r \ll \min(d, k)\)。*

```python
# LoRA 前向传播伪代码
class LoRALinear(nn.Module):
    def __init__(self, in_features, out_features, r=4, alpha=1):
        self.W = pretrained_weight  # 冻结，不参与梯度计算
        self.A = nn.Parameter(torch.randn(r, in_features) * 0.01)  # 高斯初始化
        self.B = nn.Parameter(torch.zeros(out_features, r))         # 零初始化
        self.scaling = alpha / r

    def forward(self, x):
        # 原始路径 + 低秩旁路
        h = x @ self.W.T + (x @ self.A.T @ self.B.T) * self.scaling
        return h

    def merge_weights(self):
        """部署时合并，消除推理延迟"""
        self.W.data += self.B @ self.A * self.scaling
```

**动机与背景**

大规模预训练语言模型（如 GPT-3 175B）的全参数微调面临严峻的计算和存储挑战：每个下游任务都需要存储一份完整的模型副本，且微调过程需要计算所有参数的梯度，GPU 显存需求巨大。此前的参数高效方法如 Adapter 会引入推理延迟（增加额外层），Prefix Tuning 会占用有限的序列长度且优化困难。LoRA 的核心洞察来自 Aghajanyan et al. (2020) 的发现：预训练语言模型具有很低的"内在维度"（intrinsic dimensionality），即模型适应新任务时，权重变化实际上处于一个低维子空间中。

**核心机制**

LoRA 的数学表达极为简洁。对于预训练权重矩阵 \(W_0 \in \mathbb{R}^{d \times k}\)，LoRA 将其更新约束为低秩分解形式：

$$h = W_0 x + \Delta W x = W_0 x + B A x$$

其中 \(B \in \mathbb{R}^{d \times r}\)，\(A \in \mathbb{R}^{r \times k}\)，秩 \(r \ll \min(d, k)\)。训练时 \(W_0\) 完全冻结不接收梯度更新，仅 \(A\) 和 \(B\) 为可训练参数。输出还会乘以缩放因子 \(\alpha / r\)，其中 \(\alpha\) 是一个常数超参数。当 \(\alpha\) 固定时，调整 \(r\) 近似等价于调整学习率，这简化了超参数搜索。

> 💡 关键：\(B\) 初始化为零意味着训练开始时 \(\Delta W = BA = 0\)，模型行为与预训练模型完全一致，保证了训练的稳定起点。

**训练与推理流程**

训练阶段，LoRA 仅需计算和存储低秩矩阵 \(A\) 和 \(B\) 的梯度。以 GPT-3 175B 为例，当 \(r = 4\) 且仅适配 \(W_q, W_v\) 时，可训练参数仅约 4.7M（相比原始 175B 减少约 10,000 倍），检查点大小从 350GB 降至约 35MB。推理阶段，由于 \(W = W_0 + BA\) 可以预先合并为一个矩阵，模型结构与原始 Transformer 完全相同，不引入任何额外的计算开销或延迟。这是 LoRA 相比 Adapter 方法的关键优势。

在多任务场景中，可以保留一份冻结的 \(W_0\)，为不同任务存储不同的 \(\{A_i, B_i\}\)，切换任务时仅需替换低秩矩阵并重新计算 \(W_0 + B_i A_i\)，极大降低了部署成本。

**适配位置选择与秩分析**

论文在 GPT-3 上的实验表明，在固定参数预算（18M）下，同时适配 \(W_q\) 和 \(W_v\)（每个用 \(r=4\)）的效果优于仅适配单一矩阵（用 \(r=8\)）。这说明在更多权重矩阵上分配低秩更新比在少数矩阵上使用更高秩更有效。

> ⚠️ 注意：实验发现即使 \(r=1\)（在 \(d=12288\) 的 GPT-3 上）也能取得有竞争力的结果，证实了更新矩阵 \(\Delta W\) 确实具有极低的内在秩。增大 \(r\) 并不总能提升性能，反而可能引入噪声。

**与传统方法的对比**

| 方法 | 可训练参数 | 推理延迟 | 序列长度影响 | 多任务切换 |
|------|-----------|---------|-------------|-----------|
| Full Fine-tuning | 100% | 无 | 无 | 需存储完整模型 |
| Adapter | ~3.6% | 有（额外层） | 无 | 需存储 adapter |
| Prefix Tuning | ~0.1% | 无 | 占用前缀 token | 切换前缀 |
| **LoRA** | **~0.01%** | **无** | **无** | **仅切换小矩阵** |

LoRA 在 RoBERTa、DeBERTa、GPT-2、GPT-3 上均达到或超过全参数微调的性能，同时具备最优的参数效率和推理效率。

#### 🧪 练习题

```yaml
question: "LoRA 中矩阵 B 初始化为零的主要目的是什么？"
options:
  - "减少模型参数量以节省显存"
  - "确保训练开始时 ΔW=0，模型输出与预训练模型一致"
  - "防止梯度爆炸导致训练不稳定"
  - "使低秩分解的秩在训练中自适应增长"
answer: 1
explain: "B=0 使得 ΔW=BA=0，训练起点与预训练模型完全一致，保证了微调的稳定起步，这是一种'零初始化残差'设计。"
```