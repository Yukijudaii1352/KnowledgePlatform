### 混合精度训练 (Mixed Precision Training)

```yaml
id: mixed_precision
name: 混合精度训练
full_name: 混合精度训练 (Mixed Precision Training)
year: "2018"
org: NVIDIA
paper_url: https://arxiv.org/abs/1710.03740
category: training
parent: —
motivation: FP16计算FP32存储Loss Scaling
```

#### 📝 一句话总结

混合精度训练提出用 FP16 存储与计算前向/反向主路径，同时保留 FP32 master weights、loss scaling 和 FP32 accumulation，从而解决纯 FP16 训练梯度下溢与权重更新丢失的问题。它让深度网络在不改超参数、不损失精度的前提下降低显存和带宽压力，并利用 Tensor Cores 获得更高吞吐。

#### 🎯 核心要点

- 训练主路径：前向、反向中的权重、激活和梯度大多以 FP16 存储，降低显存占用和内存带宽。
- FP32 master weights：优化器更新维护一份 FP32 权重主副本，避免小更新在 FP16 加法中被舍入为 0。
- Loss scaling：先把 loss 乘以缩放因子 \(S\)，反向传播得到放大的梯度，再在 optimizer 前除以 \(S\)，减少 FP16 梯度下溢。
- FP32 accumulation：矩阵乘、卷积、循环层 dot product 使用 FP16 乘法但以 FP32 累加，写回前再转换。
- 特殊算子处理：大 reduction、batch norm 统计、softmax 等对精度敏感的归约通常用 FP32 执行。
- 动态安全性：如果 unscale 后发现 `inf` 或 `NaN`，可以跳过该步更新并调整 loss scale。
- 实验覆盖：CNN 分类、检测、语音识别、Seq2Seq、语言模型、GAN 等任务可匹配 FP32 baseline。
- 硬件背景：NVIDIA Volta Tensor Cores 支持 FP16 输入和 FP32 累加，使混合精度同时带来显存与算力收益。

#### 🔬 深入细节

![Mixed Precision 单层训练迭代图](https://ar5iv.labs.arxiv.org/html/1710.03740/assets/x1.png)
*图：论文 Figure 1 的混合精度训练迭代。FP32 master weights 被转换成 FP16 参与前向/反向，梯度再用于更新 FP32 主副本。*

```python
# Mixed Precision Training 简化伪代码
master_params = fp32_copy(model.parameters())
loss_scale = S

for x, y in dataloader:
    # 1. 用 FP32 master weights 派生 FP16 训练权重
    fp16_params = cast(master_params, dtype="float16")
    model.load(fp16_params)

    # 2. 前向和反向主路径使用 FP16；GEMM/conv 可用 FP32 accumulation
    logits = model.forward(x.astype("float16"))
    loss = criterion(logits, y)
    scaled_loss = loss * loss_scale
    scaled_loss.backward()

    # 3. 梯度恢复到原尺度，再做裁剪、权重衰减等梯度相关操作
    grads = [p.grad.astype("float32") / loss_scale for p in model.parameters()]

    # 4. 如果溢出，跳过更新；否则用 FP32 优化器更新 master weights
    if has_inf_or_nan(grads):
        loss_scale = adjust_down(loss_scale)
        continue
    master_params = optimizer_step(master_params, grads)
```

这篇论文要解决的不是“能否把神经网络量化到 16 位”，而是“训练时如何让 FP16 既快又不破坏收敛”。FP16 的指数和尾数都比 FP32 少，normalized exponent 大致覆盖 \([-14,15]\)，含 denormal 的最小量级约到 \(2^{-24}\)。训练中的梯度常常集中在很小的负指数区间，一旦小于可表示范围就会下溢为 0；即使梯度本身可表示，乘以学习率后的权重更新也可能小到在加到权重时被舍入消失。因此纯 FP16 训练经常不是稍微变差，而是某些网络直接发散或出现显著精度损失。

FP32 master copy 是第一条保险。训练时使用 FP16 权重 \(W_{16}\) 做 forward/backward，但优化器维护 FP32 主权重 \(W_{32}\)。更新公式可以写成：

$$
W_{32}^{(t+1)} = W_{32}^{(t)} - \eta\,g_{32}^{(t)},\qquad
W_{16}^{(t+1)} = \mathrm{cast}_{16}(W_{32}^{(t+1)})
$$

其中 \(g_{32}^{(t)}\) 是 unscale 后以 FP32 表示的梯度。这样做的直觉是：训练计算可以低精度，但权重历史状态和小更新累积必须有足够分辨率。论文用 Mandarin speech recognition 示例说明，如果没有 FP32 master copy，伪 FP16 更新会造成约 80% 相对精度损失；使用 FP32 主副本后可以恢复 FP32 baseline。

Loss scaling 是第二条保险，针对的是梯度下溢。设原始 loss 为 \(L\)，缩放因子为 \(S\)，反向传播使用：

$$
L' = S\cdot L
$$

由链式法则，任意参数梯度变为：

$$
g' = \frac{\partial L'}{\partial W}=S\frac{\partial L}{\partial W}=Sg
$$

只要在 optimizer step 前恢复：

$$
g=\frac{g'}{S}
$$

最终更新与 FP32 训练在数学上等价，但反向传播中间的梯度被整体“平移”到 FP16 可表示范围内。论文以 Multibox SSD 为例，未做 loss scaling 时 mixed precision 会发散；用 \(S=8\) 后恢复到 FP32 mAP。对 bigLSTM，缩放因子 128 可避免 perplexity 曲线在 300K iterations 后发散。

> ⚠️ 注意：loss scaling 不能无限大。若 \(S\cdot g\) 超过 FP16 最大有限值 65,504，就会产生 `inf` 或 `NaN`，因此训练系统需要在 unscale 时检测溢出并跳过更新。

第三个关键点是算术精度分层。论文把神经网络算子分为 dot products、reductions 和 point-wise operations。矩阵乘、卷积、循环层中的 dot product 可以使用 FP16 乘法，但累加最好用 FP32：

$$
y=\sum_i a_i b_i,\qquad a_i,b_i\in\mathrm{FP16},\ \mathrm{accumulator}\in\mathrm{FP32}
$$

这是 Volta Tensor Cores 的核心路径：输入半精度，乘积累加到单精度，再根据需要写回 FP16。大型 reduction，例如 batch norm 的均值方差统计、softmax 归约，也应该用 FP32，因为大量元素求和会放大舍入误差。相反，ReLU、逐元素乘加等 point-wise operations 常受内存带宽限制，使用 FP16 或 FP32 对速度影响不大，可按实现便利和精度需求选择。

混合精度训练的收益主要来自两个方面。第一是显存：权重、激活和梯度以 FP16 存储时，训练中占大头的 activation memory 近似减半，这允许更大 batch size、更大模型或更长序列。虽然 FP32 master weights 会让权重部分额外增加一份拷贝，但训练显存通常不是只由权重主导，所以整体仍接近减半。第二是吞吐：在支持半精度矩阵单元的硬件上，FP16 GEMM/conv 的 arithmetic throughput 更高，且内存带宽压力更低。

与早期低精度或量化训练不同，NVIDIA 这篇方法强调“不改模型结构、不调窄层宽、不牺牲 baseline accuracy”。以前很多方法只量化推理，或仅量化权重/激活但保留反向 FP32，因此训练成本没有真正下降；也有方法需要改变超参数或网络尺寸。混合精度训练的工程价值在于它能作为训练系统的一层数值策略：同一模型、同一学习率日程、同一优化器语义，只在 dtype、master weights、loss scaling 和 accumulator precision 上做系统性处理。

在现代 LLM 训练中，论文的三条原则仍然是基础。FP32 master weights 后来演化出 FP32 optimizer states、BF16/FP16 parameters、ZeRO/FSDP shard 等组合；loss scaling 在 FP16 中仍常用，而 BF16 因指数范围更大通常不需要同样强的 scaling；FP32 accumulation 则成为 Tensor Core 路径的默认假设。换句话说，混合精度训练不是单纯“把模型 `.half()`”，而是一套数值稳定性协议。

#### 🧪 练习题

```yaml
question: "混合精度训练中保留 FP32 master weights 的主要目的是什么？"
options:
  - "让模型推理时一定使用 FP32"
  - "避免小梯度更新在 FP16 权重更新中因舍入或下溢而丢失"
  - "减少 optimizer state 的显存占用到原来一半"
  - "替代 loss scaling，使所有梯度都不会溢出"
answer: 1
explain: "FP16 的尾数和指数范围有限，小更新可能在加到权重时变成 0；FP32 master copy 用更高精度累积优化器更新。"
```
