### 混合精度训练

```yaml
id: mixed_precision
name: 混合精度训练
full_name: 混合精度训练 (Mixed Precision Training)
year: '2018'
org: NVIDIA
paper_url: https://arxiv.org/abs/1710.03740
category: training
parent: —
motivation: FP16计算FP32存储Loss Scaling
```

#### 📝 一句话总结

混合精度训练提出用 FP16 存储和计算前后向主路径，同时保留 FP32 master weights、FP32 accumulation 与 loss scaling，从而在 Tensor Core 上获得更高吞吐并保持 FP32 训练精度。它解决的是 FP16 动态范围窄导致梯度下溢、权重更新丢失和训练不稳定的问题。

#### 🎯 核心要点

- 前向和反向中的权重、激活、梯度尽量使用 FP16，降低显存和带宽压力
- 优化器维护 FP32 master weights，避免小学习率更新在 FP16 权重上被舍入为 0
- GEMM/卷积采用 FP16 输入、FP32 accumulation，匹配 Tensor Core 的高吞吐路径
- Loss scaling 先放大 loss，使反向梯度落入 FP16 可表示范围，再在更新前缩回梯度
- 支持固定 loss scaling 和动态 loss scaling，后者根据 overflow 调整 scale
- 论文在 CNN、检测、语音、机器翻译、GAN 等任务上验证可匹配 FP32 精度
- 成为后续 BF16、FP8、FP4 训练体系的基本模板：低精度算子 + 高精度状态 + 数值缩放

#### 🔬 深入细节

![Mixed Precision 单层训练迭代](https://ar5iv.labs.arxiv.org/html/1710.03740/assets/x1.png)
*图：Mixed Precision Training 论文 Figure 1，展示 FP16 前后向、FP32 master weights 更新和 FP16 权重拷贝的训练迭代。*

```python
# 混合精度训练核心伪代码
master_weights = init_fp32_weights()
fp16_weights = cast(master_weights, fp16)
scale = initial_loss_scale

for batch in dataloader:
    with autocast_fp16():
        loss = model(fp16_weights, batch)
        scaled_loss = loss * scale

    fp16_grads = backward(scaled_loss)
    fp32_grads = cast(fp16_grads, fp32) / scale

    if has_inf_or_nan(fp32_grads):
        scale = scale / 2
        continue

    master_weights = optimizer_step(master_weights, fp32_grads)
    fp16_weights = cast(master_weights, fp16)
    scale = maybe_increase(scale)
```

**动机与背景：FP16 快，但动态范围太窄。** IEEE FP16 的指数范围远小于 FP32，许多激活梯度和权重更新会落到 \(2^{-24}\) 以下并下溢为 0。若直接把所有状态都换成 FP16，模型可能表面上能跑但学习率更新被吞掉，尤其在检测、翻译这类梯度分布很宽的任务中会发散或精度下降。

**核心机制一：FP32 master weights 保护更新精度。** 训练时模型前向使用 FP16 权重副本，但优化器真正更新的是 FP32 master weights。原因是权重更新 \(\Delta w=-\eta g\) 往往比权重本身小很多；如果直接把 \(\Delta w\) 加到 FP16 权重上，尾数位不够会被舍入掉。FP32 master copy 保证小更新可以逐步累积。

**核心机制二：loss scaling 把小梯度搬进 FP16 有效区间。** 反向传播中有许多很小的梯度，直接 FP16 表示会变 0。把 loss 乘以 \(S\) 后，链式法则使梯度也乘以 \(S\)，从而减少下溢；在 optimizer step 前再除以 \(S\)，数学上不改变真实梯度：

$$
\nabla_\theta(SL)=S\nabla_\theta L,\qquad g=\frac{\nabla_\theta(SL)}{S}
$$

**核心机制三：矩阵乘法用低精度输入和高精度累加。** 深度学习算子的大部分 FLOPs 来自 GEMM/卷积。Tensor Core 路径允许 FP16 multiply，但把部分和累加到 FP32 accumulator，再写回 FP16 或 FP32。这避免了大量小乘积求和时的舍入误差，是“速度”和“收敛”之间的关键折中。

**与纯 FP32 的区别：数值状态分层。** 纯 FP32 简单但慢、显存大；纯 FP16 快但不稳。混合精度把训练状态分成三类：计算密集的 tensor 用 FP16，累积和优化器关键状态用 FP32，梯度尺度用 loss scaling 动态调节。这种分层思想后来延伸到 BF16、FP8 和 FP4 训练。

> ⚠️ 注意：混合精度不是“所有东西都用 FP16”，而是明确规定哪些路径可以低精度、哪些状态必须高精度保存。

#### 🧪 练习题

```yaml
question: "混合精度训练中保留 FP32 master weights 的主要原因是什么？"
options:
  - "减少 tokenizer 词表大小"
  - "避免小的权重更新在 FP16 权重上被舍入丢失"
  - "让模型只能在 CPU 上训练"
  - "替代反向传播"
answer: 1
explain: "FP16 尾数位较少，小学习率更新直接加到 FP16 权重时可能变成 0，因此优化器用 FP32 主权重累积更新。"
```
