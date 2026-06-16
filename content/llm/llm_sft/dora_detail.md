### DoRA：权重分解低秩适配
```yaml
id: dora
name: DoRA
full_name: 权重分解低秩适配 (DoRA)
year: "2024.02"
org: NVIDIA
paper_url: https://arxiv.org/abs/2402.09353
category: peft
parent: lora
motivation: 幅值方向分解缩小与全参微调差距
```

#### 📝 一句话总结
DoRA 将预训练权重分解为 magnitude 与 direction 两部分，只用 LoRA 更新 direction、单独学习 magnitude，从而让 PEFT 的更新模式更接近全参微调并缩小 LoRA 与 FT 的效果差距。

#### 🎯 核心要点
- 提出 weight decomposition analysis：把权重列向量拆成幅值 \(m\) 与单位方向 \(V/\lVert V\rVert_c\)，比较 FT、LoRA、DoRA 的幅值/方向更新模式。
- 发现 LoRA 的 magnitude update 与 direction update 呈强正相关，而 full fine-tuning 更像负相关或解耦更新，说明 LoRA 学习模式受限。
- DoRA 初始化时从预训练权重得到 \(m=\lVert W_0\rVert_c\)、\(V=W_0\)，训练时冻结 \(V\) 的基座部分、学习 \(m\)，并用 LoRA 低秩增量更新 direction。
- 核心形式为 \(W'=m\frac{V+\Delta V}{\lVert V+\Delta V\rVert_c}\)，其中 \(\Delta V=BA\) 是 LoRA 增量。
- 可在推理前把 DoRA 更新合并回权重矩阵，因此与 LoRA 一样不增加额外推理延迟。
- 为减少训练开销，论文建议对方向归一化分母做 detach，把归一化值视为常数，显著降低反传图显存且几乎不影响精度。
- 在 LLaMA commonsense reasoning、LLaVA visual instruction tuning、VL-BART image/video-text understanding 上稳定优于同 rank LoRA。

#### 🔬 深入细节
![DoRA 权重分解与低秩方向更新框架](https://ar5iv.labs.arxiv.org/html/2402.09353/assets/x1.png)
*图：论文 Figure 1 展示 DoRA 如何把预训练权重分解为 magnitude 与 direction，并用 LoRA 只更新 direction，最后重新合成为可部署权重。*

```python
# DoRA 核心训练流程（简化）
for each adapted pretrained weight W0:
    V = freeze(W0)                    # direction base
    m = trainable(column_norm(W0))     # magnitude vector
    A, B = init_lora(rank=r)           # Delta V = B @ A, with zero-init output path

for batch in dataloader:
    for adapted_linear in model.layers:
        delta_V = B @ A
        direction = V + delta_V
        norm = column_norm(direction)

        # 论文的低开销版本可 detach(norm)，降低反向图显存
        W_dora = m * direction / detach(norm)
        y = x @ W_dora

    loss = task_loss(y, labels)
    loss.backward()
    optimizer.step(params=[m, A, B])

# inference 前可把 W_dora merge 成普通线性层权重
```

LoRA 的基本更新是 \(W'=W_0+\Delta W\)，其中 \(\Delta W=BA\)。这个形式虽然参数高效，也能在推理前 merge，但它把“权重向量长度变化”和“权重方向变化”混在同一个低秩增量里。DoRA 的出发点是：如果全参微调能够自由地调节每列权重的幅值和方向，而 LoRA 的低秩增量必须同时解释两者，那么 LoRA 的容量缺口不只是“参数少”，还包括更新几何受限。

论文先定义列方向上的权重分解。对权重矩阵 \(W\)，记 \(\lVert W\rVert_c\) 为按列计算的向量范数，则：

$$
W=m\frac{V}{\lVert V\rVert_c},\quad m=\lVert W\rVert_c,\quad V=W.
$$

这里 \(m\) 是每一列的 magnitude，\(V/\lVert V\rVert_c\) 是单位方向。论文用这个分解比较 FT 和 LoRA 在不同训练步、不同层上的变化，发现 LoRA 的方向变化越大时幅值变化也越大，呈明显正相关；而 FT 更常出现一方大、一方小的解耦更新。这意味着 FT 可以“主要转方向但少改长度”或“主要改长度但少转方向”，而 LoRA 更容易把两类变化绑定在一起。

DoRA 的方法就是显式拆开这两件事。初始化时从预训练权重得到 \(m\) 与 \(V\)，训练时 \(m\) 是可训练向量，direction 则通过低秩矩阵更新：

$$
\Delta V=BA,
$$

$$
W'=m\frac{V+\Delta V}{\lVert V+\Delta V\rVert_c}.
$$

其中 \(V\) 的基座部分来自冻结的 \(W_0\)，\(A,B\) 是 LoRA 参数。这个公式的直觉很直接：LoRA 不再负责同时学“长度”和“方向”，而是专注于调整归一化方向；每列长度交给独立的 \(m\) 学习。新增的 \(m\) 参数量只和输出/列数相关，通常相对 LLM 总参数极小。

DoRA 与 Weight Normalization 看起来相似，但训练语境不同。Weight Normalization 通常从头训练，把权重重参数化为 magnitude 和 direction 以改善优化条件；DoRA 则从一个已经包含大量知识的 \(W_0\) 出发，保留预训练方向作为初始点，只在下游任务上做小幅适配。因此 DoRA 避免了从零初始化方向的敏感性，也保持了 PEFT 的可合并、低推理成本属性。

梯度分析解释了为什么分解能改善 LoRA 稳定性。对 direction 参数 \(V\) 的梯度会受到归一化结构影响，可直观写成“缩放 + 投影”形式：

$$
\nabla_V\mathcal{L}\propto \frac{m}{\lVert V\rVert_c}\left(I-\frac{VV^\top}{\lVert V\rVert_c^2}\right)\nabla_W\mathcal{L}.
$$

投影项会削弱沿当前权重方向的分量，让更新更集中在改变方向的有效子空间；缩放项则按 magnitude 调整梯度尺度。这种结构使低秩 \(\Delta V\) 接收到的梯度更接近“方向适配”任务，而不是普通 LoRA 中直接对 \(W_0+BA\) 做混合更新。

> 💡 关键：DoRA 不是替代 LoRA 的低秩矩阵，而是把 LoRA 放在 direction 分支里，同时单独学习 magnitude。它保留 LoRA 的可 merge 优点，但改变了 LoRA 更新的几何含义。

训练开销方面，直接对 \(\lVert V+\Delta V\rVert_c\) 反传会让计算图变大。论文提出把分母视为动态计算但不接收梯度的常数，即：

$$
W'=m\frac{V+\Delta V}{\operatorname{detach}(\lVert V+\Delta V\rVert_c)}.
$$

这样前向仍使用当前 direction 的真实范数，反向则避免范数分支带来的额外显存。论文报告该修改在 LLaMA 微调中可显著降低训练显存，精度差异很小。推理时，DoRA 与 LoRA 一样可以预先计算 \(W'\) 并合并到线性层，因此不会像串行 Adapter 那样增加额外推理层。

相较于 AdaLoRA/QLoRA，DoRA 关注的不是“预算分配”或“量化存储”，而是 LoRA 的表达几何。它回答的问题是：在参数量近似不变的情况下，如何让 LoRA 更像 full fine-tuning？答案是把每列权重的长度和方向解耦，让低秩参数只承担方向更新。这个思路也解释了论文实验中 DoRA 在相同 rank 下经常优于 LoRA，甚至在 halved rank 配置下仍能保持竞争力。

#### 🧪 练习题
```yaml
question: "DoRA 为什么要把权重分解为 magnitude 和 direction？"
options:
  - "为了在推理时增加一个额外归一化层"
  - "为了让 LoRA 只负责方向更新，并单独学习幅值，使更新模式更接近全参微调"
  - "为了把所有权重量化到 4-bit"
  - "为了按奇异值重要性动态删除 rank"
answer: 1
explain: "DoRA 的核心是解耦幅值和方向：magnitude 用可训练向量表示，direction 用 LoRA 更新，从而缩小 LoRA 与 FT 的学习模式差距。"
```
