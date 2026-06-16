### LoRA：用低秩增量高效适配大模型

```yaml
id: lora
name: LoRA
full_name: 低秩适配 (Low-Rank Adaptation)
year: "2022.01"
org: Microsoft
paper_url: https://arxiv.org/abs/2106.09685
category: peft
parent: adapter
motivation: 低秩分解消除推理延迟大幅减少显存
```

#### 📝 一句话总结

LoRA 提出冻结预训练权重，只训练权重增量的低秩分解矩阵，解决全量微调在大模型上训练显存、任务存储和部署切换成本过高的问题。由于低秩增量可以在推理前合并回原权重，LoRA 相比传统 adapter 不引入额外推理延迟。

#### 🎯 核心要点

- 对预训练权重 \(W_0\) 保持冻结，把任务更新 \(\Delta W\) 约束为低秩分解 \(BA\)。
- 只训练两个小矩阵 \(A\in\mathbb{R}^{r\times k}\) 和 \(B\in\mathbb{R}^{d\times r}\)，其中 \(r\ll\min(d,k)\)。
- 前向计算为 \(h = W_0x + \frac{\alpha}{r}BAx\)，训练结束可合并为 \(W'=W_0 + \frac{\alpha}{r}BA\)。
- 初始化采用 \(A\) 随机高斯、\(B\) 为零，使训练开始时 \(\Delta W=0\)，模型初始行为与原始预训练模型一致。
- 论文主要在 Transformer attention 的 \(W_q\) 和 \(W_v\) 上注入 LoRA，实验也讨论不同矩阵选择和 rank 的影响。
- 相比 full fine-tuning，LoRA 每个任务只保存很小的低秩模块；相比 adapter，线性低秩增量可合并进权重，不增加在线推理深度。
- 在 RoBERTa、DeBERTa、GPT-2、GPT-3 175B 上验证，展示了接近或超过全量微调的质量，并显著减少可训练参数和优化器显存。

#### 🔬 深入细节

![LoRA 低秩重参数化示意图](https://ar5iv.labs.arxiv.org/html/2106.09685/assets/x1.png)
*图：论文 Figure 1 展示 LoRA 的重参数化。冻结原权重 \(W_0\)，旁路训练低秩矩阵 \(A\) 和 \(B\)，二者乘积构成任务增量。*

LoRA 的出发点是大模型微调的部署现实：如果每个下游任务都复制一份完整模型，GPT-3 175B 这类模型会带来巨大的存储、加载和优化器状态成本。传统 adapter 通过插入小模块减少训练参数，但会增加网络深度，在线推理时仍要额外执行 adapter 计算。Prefix/prompt tuning 不改权重，但会占用序列长度，并且在某些任务上优化不稳定。LoRA 选择直接作用于权重更新本身：不学习完整 \(\Delta W\)，只学习一个低秩近似。

对任意线性层，原始前向是 \(h=W_0x\)，其中 \(W_0\in\mathbb{R}^{d\times k}\)。全量微调会让 \(W_0\) 变成 \(W_0+\Delta W\)，而 \(\Delta W\) 与 \(W_0\) 同形，参数量很大。LoRA 假设任务适配所需的权重变化具有低“内在秩”，因此令：

$$
\Delta W = BA, \quad B\in\mathbb{R}^{d\times r}, \quad A\in\mathbb{R}^{r\times k}, \quad r\ll\min(d,k)
$$

前向计算变为：

$$
h = W_0x + \frac{\alpha}{r}BAx
$$

其中 \(\alpha/r\) 是缩放因子，用来让不同 rank 下的更新幅度更稳定。若 \(d=k=12288\) 且 \(r=8\)，完整 \(\Delta W\) 需要约 1.5 亿个参数，而 LoRA 只需要 \(2\times12288\times8\) 量级的参数，差距非常大。

初始化设计是 LoRA 稳定性的一个细节。论文将 \(A\) 用随机高斯初始化，将 \(B\) 初始化为零，因此 \(BA=0\)，训练第一步前模型行为完全等同于原预训练模型。这个设计避免了刚插入 LoRA 模块时扰乱模型输出。训练过程中，梯度只更新 \(A\) 和 \(B\)，冻结的 \(W_0\) 不产生梯度，也不需要保存 Adam 的一阶和二阶优化器状态，从而降低显存。

LoRA 在 Transformer 中可以应用到任何 dense matrix，包括 self-attention 的 \(W_q,W_k,W_v,W_o\) 以及 MLP 层。论文为了简洁和效率，很多实验主要把 LoRA 加到 query 和 value 投影上，即 \(W_q\) 与 \(W_v\)。这样做的直觉是注意力的查询和值直接影响信息选择和信息写入，对任务行为的调节很敏感；同时不必在所有矩阵上都增加低秩旁路，可以保持参数量极低。参数量通常可近似为 \(n\cdot r(d+k)\)，其中 \(n\) 是注入 LoRA 的矩阵数量。

LoRA 的部署优势来自线性可合并性。训练时为了清晰和高效，通常保留旁路计算 \(W_0x + BAx\)。推理前可以显式计算 \(W'=W_0 + \frac{\alpha}{r}BA\)，然后像普通线性层一样执行 \(W'x\)。因此 LoRA 不增加推理层数、不占用额外 token 位置，也不需要像 adapter 一样在每层多跑一个瓶颈 MLP。切换任务时，只需卸载当前任务的 \(BA\) 增量并加载另一个任务的低秩增量，主模型权重仍可共享。

从方法边界看，LoRA 不是声称所有任务更新都天然低秩，而是提供一个可调的秩约束。当 \(r\) 增大并覆盖更多权重矩阵时，LoRA 的表达能力逐步接近全量微调；当 \(r\) 很小时，它成为强参数约束的高效适配器。论文的实验和 rank-deficiency 分析表明，许多语言模型适配任务确实不需要满秩更新，较小 rank 就能达到很强效果。这解释了 LoRA 为什么能在 GPT-2、GPT-3、RoBERTa、DeBERTa 上同时兼顾质量和效率。

```python
# LoRA 注入到一个线性层的核心逻辑
class LoRALinear:
    def __init__(self, W0, rank, alpha):
        self.W0 = freeze(W0)                         # pretrained weight, no gradients
        self.A = normal(shape=(rank, W0.in_dim))      # trainable
        self.B = zeros(shape=(W0.out_dim, rank))      # trainable, starts with zero update
        self.scale = alpha / rank

    def forward(self, x):
        base = self.W0 @ x
        delta = self.B @ (self.A @ x)
        return base + self.scale * delta

    def merge_for_inference(self):
        return self.W0 + self.scale * (self.B @ self.A)
```

> 💡 关键：LoRA 的参数高效性来自低秩约束，推理高效性来自可合并的线性结构。训练时是旁路，部署时可以变回普通权重矩阵。

#### 🧪 练习题

```yaml
question: "LoRA 为什么通常不会像传统 adapter 那样增加推理延迟？"
options:
  - "因为 LoRA 在推理时删除了 Transformer 的 attention 层"
  - "因为 LoRA 的低秩增量可以合并到原始线性层权重中，推理仍执行普通矩阵乘法"
  - "因为 LoRA 只改变 tokenizer，不改变模型计算图"
  - "因为 LoRA 必须在每个任务上全量微调一次"
answer: 1
explain: "LoRA 训练的是 \(BA\) 形式的线性权重增量，推理前可合并为 \(W_0 + \alpha BA/r\)，因此不会额外增加 adapter 层的串行计算。"
```
