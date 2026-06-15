### LoRA

```yaml
id: "lora"
name: "LoRA"
full_name: "低秩适配 (Low-Rank Adaptation)"
year: "2022.01"
org: "Microsoft"
paper_url: "https://arxiv.org/abs/2106.09685"
category: "peft"
parent: "adapter"
motivation: "低秩分解消除推理延迟大幅减少显存"
```

#### 📝 一句话总结

LoRA 冻结原始权重，把微调增量矩阵限制为低秩分解 \(BA\)，只训练低秩因子，从而在大幅减少训练参数和优化器显存的同时几乎不增加推理延迟。

#### 🎯 核心要点

- 对线性层权重 \(W_0\) 冻结，只学习增量 \(\Delta W=BA\)。
- 低秩维度 \(r\ll d\)，显著减少 trainable parameters 和 optimizer states。
- 常用于 Transformer attention 的 \(W_q\)、\(W_v\)，也可扩展到其他线性层。
- 推理时可将 \(BA\) 合并回 \(W_0\)，避免 Adapter 式额外模块延迟。
- 论文在 RoBERTa、GPT-2、GPT-3 175B 上显示低秩更新足以完成多种任务适配。

#### 🔬 深入细节

![LoRA 低秩重参数化](http://ar5iv.labs.arxiv.org/html/2106.09685/assets/x1.png)
*图源：论文 Figure 1，冻结原权重 \(W\)，仅训练低秩矩阵 \(A\) 和 \(B\)。*

```python
# LoRA 线性层伪代码
class LoRALinear:
    def __init__(self, W0, rank, alpha):
        self.W0 = freeze(W0)
        self.A = Parameter(random_normal(rank, in_dim))
        self.B = Parameter(zeros(out_dim, rank))
        self.scale = alpha / rank

    def forward(self, x):
        return x @ self.W0.T + self.scale * (x @ self.A.T @ self.B.T)

for batch in task_data:
    loss = model_with_lora(batch).loss
    update_only(lora_A_and_B, loss)
```

LoRA 的核心假设是：下游任务对大模型权重的有效更新具有低内在秩。全量微调会更新 \(W_0\in\mathbb{R}^{d\times k}\) 的所有元素，但真正需要的任务变化可能集中在低维子空间。于是 LoRA 固定 \(W_0\)，只学习：

$$
h = W_0x + \Delta W x = W_0x + \frac{\alpha}{r}BAx
$$

其中 \(A\in\mathbb{R}^{r\times k}\)，\(B\in\mathbb{R}^{d\times r}\)，\(r\) 是低秩维度，\(\alpha/r\) 是缩放因子。通常初始化 \(B=0\)，使训练开始时 LoRA 分支输出为零，不改变预训练模型初始行为。

训练时只为 \(A\) 和 \(B\) 保存梯度与优化器状态，显存开销远小于全量微调。推理时可把 \(\Delta W\) 合并进 \(W_0\)，得到 \(W'=W_0+\frac{\alpha}{r}BA\)，因此前向计算仍是普通线性层，不像 Adapter 那样增加额外串行层。

LoRA 与 Adapter 都是 PEFT，但设计取舍不同。Adapter 是插入新模块，参数局部独立但有额外前向路径；LoRA 是重参数化已有线性层的更新，天然贴近全量微调的“改权重”形式。与 Prefix/Prompt Tuning 相比，LoRA 不依赖长 prompt 占用上下文窗口，尤其适合 LLM 指令微调和多任务 adapter 权重分发。

> 💡 关键：LoRA 不学习完整新权重，而学习“权重变化的低秩近似”，这解释了它同时省参数、可合并、低延迟。

#### 🧪 练习题

```yaml
question: "LoRA 为什么通常不会增加推理延迟？"
options:
  - "训练后可将低秩增量 BA 合并到原线性层权重中"
  - "它删除了所有注意力层"
  - "它只在 CPU 上运行"
  - "它不需要任何矩阵乘法"
answer: 0
explain: "LoRA 的低秩分支在推理前可合成为普通权重增量，因此前向结构仍是原线性层。"
```
