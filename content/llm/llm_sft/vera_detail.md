### VeRA：向量随机矩阵适配
```yaml
id: vera
name: VeRA
full_name: 向量随机矩阵适配 (VeRA)
year: "2024.05"
org: University of Amsterdam
paper_url: https://arxiv.org/abs/2310.11454
category: peft
parent: lora
motivation: 冻结共享矩阵减少10倍参数量
```

#### 📝 一句话总结
VeRA 提出用冻结且跨层共享的随机低秩矩阵替代 LoRA 中每层可训练的 \(A,B\) 矩阵，只训练很小的缩放向量 \(b,d\)，解决 LoRA 在多任务、多用户适配时仍需存储大量 adapter 参数的问题。它保持与 LoRA 类似的可合并、无额外推理延迟特性，但显著降低每个任务需要保存的参数量。

#### 🎯 核心要点
- 继承 LoRA 的低秩残差路径：仍在冻结预训练权重 \(W_0\) 上添加低秩更新 \(\Delta W\)。
- 冻结随机矩阵：低秩矩阵 \(A,B\) 随机初始化后不训练，可由 RNG seed 重建，减少每个 adapter 的存储需求。
- 跨层共享矩阵：同一对随机矩阵在适配层间共享，层间差异由可训练缩放向量表达。
- 只训练向量参数：每层训练输出缩放向量 \(b\) 和 rank 维缩放向量 \(d\)，用 \(\Lambda_b\) 与 \(\Lambda_d\) 调制随机矩阵。
- 参数量从 LoRA 的 \(2L_{\text{tuned}}d_{\text{model}}r\) 下降到 VeRA 的 \(L_{\text{tuned}}(d_{\text{model}}+r)\)。
- 初始化设计关键：\(A,B\) 使用 Kaiming 等随机初始化，\(b\) 初始化为 0 以保证初始输出不扰动原模型，\(d\) 初始化为非零常数。
- 推理无额外延迟：训练结束后 \(\Lambda_bB\Lambda_dA\) 可合并进原始权重矩阵。
- 实验覆盖 GLUE、E2E、Alpaca 指令微调、ViT 图像分类；在 LLaMA/LLaMA2 指令微调中以约百倍更少训练参数接近 LoRA 表现。

#### 🔬 深入细节
![VeRA 与 LoRA 结构对比图](https://ar5iv.labs.arxiv.org/html/2310.11454/assets/x1.png)
*图：左侧 LoRA 训练每层低秩矩阵 \(A,B\)；右侧 VeRA 冻结并共享随机矩阵，只训练缩放向量 \(d,b\)。两者最终都可以把低秩分支合并回原权重，因此推理时没有额外层级延迟。*

```python
# VeRA 的核心逻辑，按一个线性层 W0: R^{d_in}->R^{d_out} 描述
# A, B 是共享且冻结的随机矩阵，可由同一个 seed 重建
A = frozen_random_matrix(shape=(r, d_in), init="kaiming", seed=seed_A)
B = frozen_random_matrix(shape=(d_out, r), init="kaiming", seed=seed_B)

# 每个被适配的层只保存两个可训练向量
b = zeros(d_out)              # 让初始 delta W 为 0
d = constant(c, shape=(r,))   # 非零 rank 缩放

for batch in finetune_loader:
    x = layer_input(batch)
    delta = diag(b) @ B @ diag(d) @ A
    h = W0 @ x + delta @ x
    loss = task_loss(h)
    update_only([b, d])       # W0, A, B 都不更新

# 部署前可合并：W_merged = W0 + diag(b) @ B @ diag(d) @ A
```

VeRA 的问题设定比“能否微调一个模型”更偏向“能否保存大量个性化 adapter”。LoRA 已经把全量微调的参数量从 \(mn\) 降到 \(r(m+n)\)，但如果一个服务要为成千上万个用户或任务保留不同 LoRA 权重，存储仍会快速膨胀。论文举例说明，在 GPT-3 这类深宽模型上，即便只对 query/value 层使用 rank 16 LoRA，每个适配版本也会带来可观的参数文件；当版本数达到百万级时，问题从训练显存转变成 adapter 存储和切换成本。

LoRA 的基本形式是：

$$
h = W_0x + \Delta W x = W_0x + BAx,
$$

其中 \(W_0\) 冻结，\(B\in\mathbb{R}^{d_{out}\times r}\)、\(A\in\mathbb{R}^{r\times d_{in}}\) 是每层独立训练的低秩矩阵。VeRA 保留这条“低秩残差分支”，但把可训练矩阵替换为冻结随机矩阵加可训练向量缩放：

$$
h = W_0x + \Delta W x
  = W_0x + \Lambda_b B \Lambda_d A x.
$$

这里 \(A,B\) 不再为每个任务学习，\(\Lambda_b=\operatorname{diag}(b)\) 负责按输出通道缩放，\(\Lambda_d=\operatorname{diag}(d)\) 负责按 rank 维缩放。可以把它理解为：随机矩阵提供一个固定的候选低秩基底，训练过程只学习“哪些输出维度和哪些 rank 通道应该被放大、压低或关闭”。这样虽然牺牲了一部分自由度，但避免了为每层、每任务存储完整 \(A,B\)。

参数量差异来自矩阵参数与向量参数的数量级差别。若有 \(L_{\text{tuned}}\) 个适配层、隐藏维度近似为 \(d_{\text{model}}\)、rank 为 \(r\)，LoRA 的训练参数量近似为：

$$
|\Theta_{\text{LoRA}}|=2L_{\text{tuned}}d_{\text{model}}r.
$$

VeRA 每层主要保存 \(b\in\mathbb{R}^{d_{model}}\) 和 \(d\in\mathbb{R}^{r}\)，因此为：

$$
|\Theta_{\text{VeRA}}|=L_{\text{tuned}}(d_{\text{model}}+r).
$$

当 \(r\) 增大时，LoRA 参数随 \(d_{model}r\) 成倍增长，而 VeRA 只随 \(r\) 线性增加一个很小的向量项。论文表格中在 RoBERTa-large、GPT-3 等设置下展示了这种差异：rank 越大、层越宽，VeRA 相对 LoRA 的存储优势越明显。

初始化是 VeRA 能稳定工作的关键。论文对冻结随机矩阵使用 Kaiming 初始化，使不同 rank 下矩阵乘积的方差更可控，避免每个 rank 都重新调学习率。\(b\) 初始化为零，这与 LoRA 常把其中一个低秩矩阵初始化为零的思想一致：训练开始时 \(\Delta W=0\)，模型输出完全等于原始预训练模型，避免随机 adapter 一开始破坏表示。\(d\) 初始化为非零常数，使 rank 通道在 \(b\) 开始学习后能立即提供可调制路径。

为什么随机矩阵可以工作？VeRA 借用了随机投影和低内在维度的经验事实：大模型适配某个下游任务时，真正需要学习的自由度远少于完整参数空间。冻结的 \(A,B\) 不需要精确等于最优低秩基，只要提供足够丰富且可重用的随机方向，\(b,d\) 就能选择和组合这些方向。对部署系统而言，\(A,B\) 可通过 seed 重新生成，adapter 文件主要由很小的向量组成，因此更适合多租户、个性化助手、边缘设备或需要频繁切换任务头的场景。

训练与推理流程也保持 PEFT 的工程优势。训练时冻结 \(W_0,A,B\)，只对 \(b,d\) 反向传播并维护优化器状态；推理前把 \(\Lambda_bB\Lambda_dA\) 算成一个普通矩阵增量并加到 \(W_0\)，即可删除额外分支。因此 VeRA 不像串联 adapter 那样增加额外前向层，也不像 prompt tuning 那样改变输入长度。它与 LoRA 一样具备“训练时轻量、部署时可合并”的性质，但 adapter 存储更小。

与 LoRA 的权衡在于表达能力与存储效率。LoRA 每层学习完整 \(A,B\)，自由度更高；VeRA 用共享随机 \(A,B\) 固定了候选方向，层特异性只靠向量缩放表达，所以在极难任务或需要高精度拟合时可能不如全自由 LoRA 灵活。论文的实验结论是，在 GLUE、E2E、图像分类和 LLaMA/LLaMA2 指令微调中，这种表达能力损失通常较小，而参数减少可达到 10 倍甚至 100 倍量级，尤其适合“每个任务都要存一个 adapter”的应用。

> 💡 关键：VeRA 不是把 LoRA 的 rank 简单调小，而是把“可学习矩阵”换成“冻结随机基底 + 可学习缩放向量”。这使 adapter 大小与 rank 的关系变得更温和，也让随机矩阵可以通过 seed 共享和重建。

#### 🧪 练习题
```yaml
question: "VeRA 相比 LoRA 主要通过什么方式减少每个任务需要保存的参数？"
options:
  - "删除低秩分支，只训练原始模型最后一层"
  - "把 LoRA 的 A、B 矩阵量化到 4-bit，但仍逐层保存"
  - "冻结并共享随机 A、B 矩阵，只保存可训练缩放向量 b 和 d"
  - "把所有 Transformer 层替换成卷积层"
answer: 2
explain: "VeRA 的核心是随机 A、B 不作为每个 adapter 的可训练权重保存，任务差异主要由小向量 b、d 表示。"
```
