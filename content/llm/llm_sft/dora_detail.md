### DoRA

```yaml
id: "dora"
name: "DoRA"
full_name: "权重分解低秩适配 (DoRA)"
year: "2024.02"
org: "NVIDIA"
paper_url: "https://arxiv.org/abs/2402.09353"
category: "peft"
parent: "lora"
motivation: "幅值方向分解缩小与全参微调差距"
```

#### 📝 一句话总结

DoRA 将预训练权重分解为幅值和方向两部分，单独学习幅值并用 LoRA 更新方向，从而缓解 LoRA 同时承担幅值与方向变化时表达能力不足的问题。

#### 🎯 核心要点

- 借鉴 Weight Normalization，将权重按列分解为 magnitude 和 direction。
- Magnitude 作为可训练向量直接更新，direction 由 LoRA 低秩增量更新。
- 分析发现全量微调与 LoRA 在幅值/方向更新模式上差异明显，DoRA 更接近全量微调。
- 可在推理时把 magnitude 和 direction 合并为普通权重，保持 LoRA 类部署方式。
- 在 commonsense reasoning、视觉语言任务和指令微调中通常优于 LoRA，低 rank 时收益更明显。

#### 🔬 深入细节

![DoRA 权重分解框架](http://ar5iv.labs.arxiv.org/html/2402.09353/assets/x1.png)
*图源：论文 Figure 1，DoRA 把权重分解为幅值和方向，并用 LoRA 高效更新方向。*

![DoRA 与 LoRA/FT 的更新模式对比](http://ar5iv.labs.arxiv.org/html/2402.09353/assets/x2.png)
*图源：论文 Figure 2，对比全量微调、LoRA 和 DoRA 在幅值与方向变化上的模式。*

```python
# DoRA 线性层伪代码
class DoRALinear:
    def __init__(self, W0, rank, alpha):
        self.W0 = freeze(W0)
        self.m = Parameter(column_norm(W0))      # 幅值
        self.A = Parameter(random_normal(rank, in_dim))
        self.B = Parameter(zeros(out_dim, rank)) # 方向增量
        self.scale = alpha / rank

    def forward(self, x):
        V = self.W0 + self.scale * (self.B @ self.A)
        direction = V / column_norm(V)
        W_dora = self.m * direction
        return x @ W_dora.T

for batch in task_data:
    loss = model_with_dora(batch).loss
    update_only(dora_magnitude_and_lora_factors, loss)
```

DoRA 的动机来自对 LoRA 与全量微调的行为分析。LoRA 只通过低秩矩阵改变 \(W_0\)，它同时需要表达权重列的长度变化和方向变化；全量微调则可以更自由地分别调整这两类属性。论文观察到 LoRA 的幅值变化和方向变化高度正相关，而全量微调呈现更灵活甚至负相关的模式。

DoRA 使用权重归一化形式表示线性层权重。对权重矩阵 \(W\) 的列向量做范数分解：

$$
W = m \frac{V}{\lVert V\rVert_c}
$$

其中 \(m\) 是列范数幅值，\(V/\lVert V\rVert_c\) 是方向。DoRA 将 \(m\) 设为可训练参数，而方向基底 \(V\) 由冻结权重加 LoRA 增量得到：

$$
V = W_0 + \Delta V,\quad \Delta V = \frac{\alpha}{r}BA
$$

这样低秩分支主要负责方向适配，幅值变化由独立向量承担，降低了 LoRA 分支的表达压力。对于低 rank 设置，这种分工尤其有用，因为少量低秩方向不必同时拟合所有尺度变化。

训练流程上，DoRA 仍只更新少量参数：幅值向量 \(m\) 和 LoRA 因子 \(A,B\)。推理时可以计算合成后的 \(W_{\text{DoRA}}\)，因此部署形态接近 LoRA。相比 AdaLoRA 的“动态分配 rank”，DoRA 解决的是“同一低秩更新内部如何表达幅值与方向”的问题，二者关注点不同。

> 💡 关键：DoRA 的收益来自把 LoRA 的一个任务拆成两个更容易的任务：低秩方向更新 + 显式幅值更新。

#### 🧪 练习题

```yaml
question: "DoRA 相比 LoRA 额外引入了什么可训练部分？"
options:
  - "每列权重的幅值 magnitude 参数"
  - "完整预训练模型副本"
  - "人工偏好奖励模型"
  - "离散 prompt 搜索器"
answer: 0
explain: "DoRA 将权重分解为幅值和方向，方向由 LoRA 更新，幅值由单独可训练向量控制。"
```
