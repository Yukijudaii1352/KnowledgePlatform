### LoRA-E2：高效低秩适配E2 (LoRA-E2)
```yaml
id: lora_e2
name: LoRA-E2
full_name: 高效低秩适配E2 (LoRA-E2)
year: "2026.01"
org: Alibaba
paper_url: https://dl.acm.org/doi/abs/10.1145/3774904.3792500
category: frontier
parent: dora
motivation: 正则化优化稳定训练超越DoRA
```

#### 📝 一句话总结
LoRA-E2 针对标准 LoRA 在大宽度模型中 feature learning 低效、且零初始化 \(B\) 导致 \(A\) 早期几乎无有效更新的问题，提出稳定尺度的 \(A\) 高斯初始化与 Gauss-Seidel 式 \(B/A\) 交替更新。它在不增加推理结构复杂度的前提下，让低秩适配获得更稳定、更快的有效参数更新。

#### 🎯 核心要点
- 保持 LoRA 的基本结构：冻结预训练权重 \(W_0\)，只训练低秩更新 \(\Delta W = BA\)。
- 识别标准 LoRA 的两个问题：大 width \(n\) 下特征学习效率下降；\(B=0\) 初始化使 \(\Delta W=0\)，导致 \(A\) 的早期梯度更新无效或很弱。
- 提出 stable initialization：对 \(A\) 使用方差为 \(\Theta(n^{-3/4})\) 的高斯初始化，代码实现中标准差为 \(\sqrt{2/n^{0.75}}\)，\(B\) 仍初始化为 0。
- 提出 Gauss-Seidel iteration：每个训练 step 先冻结 \(A\) 更新 \(B\)，再冻结 \(B\) 更新 \(A\)，区别于标准 LoRA 同时更新两个矩阵。
- 保持参数高效和推理友好：训练后仍可把 \(BA\) merge 回原线性层，不改变 LoRA 的部署路径。
- 可与 rsLoRA、DoRA 等 LoRA 变体组合，论文报告 LoRA-E2 及其组合在 NLU/NLG 上都有稳定收益。
- 实验覆盖 GLUE + T5-base，以及 MetaMathQA/GSM8K + LLaMA 2-7B；报告相对 LoRA 在 GLUE 上提升 1–10%，在数学生成任务上提升约 1–2% 并最高约 3× 更快收敛。
- 官方代码将 NLU 和 NLG 分开实现，分别训练 T5-base/GLUE 与 LLaMA2-7B/MetaMathQA，核心改动集中在 LoRA layer 初始化和自定义 Trainer 的训练步。

#### 🔬 深入细节

![LoRA 低秩适配结构示意](https://arxiv.org/html/2106.09685v2/x1.png)
*图：LoRA 原论文 Figure 1 的低秩分解结构。LoRA-E2 不改变这一路径，而是改进同一结构中 \(A\)、\(B\) 的初始化尺度和训练顺序。ACM 论文 Figure 1/3 主要展示训练损失曲线和低秩更新幅度对比；该结构图用于定位 LoRA-E2 的改动位置。*

标准 LoRA 对一个冻结线性层 \(W_0\in\mathbb{R}^{d_{out}\times d_{in}}\) 添加低秩更新：

$$
\mathbf{h}=W_0\mathbf{x}+\frac{\alpha}{r}BA\mathbf{x},
\quad A\in\mathbb{R}^{r\times d_{in}},\quad B\in\mathbb{R}^{d_{out}\times r},\quad r\ll \min(d_{in},d_{out}).
$$

标准实践通常随机初始化 \(A\)，把 \(B\) 初始化为零。这样模型在训练开始时 \(BA=0\)，不会破坏预训练模型输出，这是 LoRA 稳定性的来源。但 LoRA-E2 指出，这个设计也有副作用：因为 \(B=0\)，损失对 \(A\) 的梯度 \(\nabla_A\mathcal{L}\) 依赖 \(B^\top\)，初始阶段近似为零；也就是说，\(A\) 在前几步并没有真正学习到有效特征方向，只能等 \(B\) 先被更新后才开始收到有意义梯度。对于宽度 \(n\) 很大的 Transformer 层，这种滞后会放大 feature learning 低效问题。

LoRA-E2 的第一项改动是初始化尺度。论文摘要和作者页给出的核心结论是：对 \(A\) 使用方差 \(\Theta(n^{-3/4})\) 的高斯初始化。官方代码中的 `stable_init` 更具体：

$$
A_{ij}\sim \mathcal{N}\left(0,\frac{2}{n^{0.75}}\right),
\quad B=0.
$$

这里代码变量 `fan_in = in_features`，`std = sqrt(2.0 / fan_in**0.75)`。它不同于常见 Kaiming 风格的 \(\Theta(n^{-1})\) 方差，也不同于过大的 \(\Theta(n^{-1/2})\) 尺度。直觉上，\(A\) 不能太小，否则通过低秩瓶颈投影后的特征信号太弱，\(B\) 更新学不到有效方向；也不能太大，否则 LoRA 分支在 \(B\) 更新后会迅速产生过强扰动，损害稳定性。\(n^{-3/4}\) 是在大宽度下平衡 feature learning 与稳定更新的中间尺度。

第二项改动是 Gauss-Seidel 式训练。标准 LoRA 在一个 backward 中同时对 \(A\) 和 \(B\) 求梯度并更新，近似 Jacobi-style simultaneous update。LoRA-E2 官方实现的 `LoRAGaussSeidelTrainer` 在 `LoRA-A` 模式下把一个训练 batch 拆成两个子步：先设置 `lora_A.requires_grad=False`、`lora_B.requires_grad=True`，更新 \(B\)；然后恢复原学习率，设置 `lora_A.requires_grad=True`、`lora_B.requires_grad=False`，再更新 \(A\)。这与数值线性代数中的 Gauss-Seidel 思想一致：更新第二组变量时使用第一组变量的最新值，而不是用同一旧点同时更新。

```python
# LoRA-E2 核心训练伪代码，来自官方实现的逻辑抽象
for layer in target_linear_layers:
    A = Normal(mean=0, std=sqrt(2 / (fan_in ** 0.75)))  # stable_init
    B = zeros_like_B()
    layer.delta_W = scale * B @ A

for batch in dataloader:
    # Step 1: update B with A fixed
    freeze(A)
    unfreeze(B)
    loss_B = forward_loss(model, batch)
    backward_and_optimizer_step(loss_B)

    # Step 2: update A with updated B fixed
    unfreeze(A)
    freeze(B)
    loss_A = forward_loss(model, batch)
    backward_and_optimizer_step(loss_A)
```

> 💡 关键：LoRA-E2 没有改变低秩适配的参数量公式 \(r(d_{in}+d_{out})\)，而是改变“低秩分支一开始如何获得有效梯度”和“两个低秩因子如何轮流吸收梯度”。

从梯度角度看，设某层输入为 \(x\)，上游梯度为 \(g=\partial\mathcal{L}/\partial h\)，低秩分支为 \(h_{lora}=BAx\)。忽略缩放常数，有：

$$
\nabla_B\mathcal{L}=g(Ax)^\top,
\quad
\nabla_A\mathcal{L}=B^\top g x^\top.
$$

当 \(B=0\) 时，\(\nabla_A\mathcal{L}=0\)，而 \(\nabla_B\mathcal{L}\) 取决于 \(Ax\)。因此第一步最合理的事本来就是先让 \(B\) 学会如何读取 \(A\) 产生的低维特征；当 \(B\) 已经非零后，再更新 \(A\) 才能获得非零而且更贴合当前 \(B\) 的梯度。Gauss-Seidel 更新把这个顺序显式写进训练过程，避免同时更新中 \(A\) 使用“旧的、还没学会的 \(B\)”带来的低效。

与 DoRA 的关系也值得区分。DoRA 把权重更新拆成 magnitude 与 direction，以改善 LoRA 对权重方向和尺度的表达；LoRA-E2 主要处理优化动力学，即初始化尺度和 \(A/B\) 更新耦合。任务元信息把它挂在 DoRA 之后，但 LoRA-E2 并不是 DoRA 的简单正则项，而是可叠加在 LoRA 家族上的训练规则。官方代码里也保留 `use_dora`、`use_rslora` 开关，说明它可以与这些结构变体组合；当 `use_dora=False`、`use_rslora=False` 时，核心仍然是 stable_init + LoRA-A 交替训练。

官方代码把训练模式分成三类：`LoRA-S` 是 simultaneous training，接近标准 LoRA；`LoRA-F` 冻结 \(A\) 只训练 \(B\)，类似只把随机低维特征作为固定投影；`LoRA-A` 则是 LoRA-E2 的交替训练。NLU 实验中目标模块是 T5 的 `q`、`v`，数据是 GLUE；NLG 实验中目标模块扩展到 LLaMA2 的 `q_proj/k_proj/v_proj/o_proj/gate_proj/up_proj/down_proj`，数据是 MetaMathQA，评估关注 GSM8K 数学推理。这个覆盖说明 LoRA-E2 不是只对分类头或小模型有效，而是面向 Transformer 主干的多类线性层。

与标准 LoRA 相比，LoRA-E2 的代价主要在训练阶段：同一个 batch 内做两次 training step，会增加一定计算；但它换来更有效的早期更新和更快收敛。由于最终仍然得到 \(BA\) 低秩矩阵，推理时可以像 LoRA 一样 merge 到 \(W_0\) 或保持 adapter 形式，不引入额外推理深度。实际使用上，若训练预算极紧、只追求最低 step 时间，标准 LoRA 仍然简单；若目标是减少达到同等验证性能所需的步数，LoRA-E2 的稳定初始化和交替更新更有价值。

#### 🧪 练习题
```yaml
question: "LoRA-E2 为什么要在一个 batch 中先更新 B、再更新 A？"
options:
  - "因为标准 LoRA 中 B 初始化为 0，A 的初始梯度近似为 0；先更新 B 后，A 才能获得有效梯度"
  - "因为 A 的参数量总是比 B 大很多，必须延迟训练以节省显存"
  - "因为 LoRA-E2 删除了 B 矩阵，只保留 A 矩阵进行推理"
  - "因为 Gauss-Seidel 只能用于分类任务，不能用于生成任务"
answer: 0
explain: "低秩分支为 BAx，梯度 \nabla_A 依赖 B^T；当 B=0 时 A 几乎不更新。LoRA-E2 先让 B 变成非零，再固定 B 更新 A，从而提高早期训练效率。"
```
