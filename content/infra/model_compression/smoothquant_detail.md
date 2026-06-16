### SmoothQuant

```yaml
id: smoothquant
name: SmoothQuant
full_name: 平滑量化 (SmoothQuant)
year: 2023
org: MIT/NVIDIA
paper_url: http://proceedings.mlr.press/v202/xiao23c.html
category: quantization
parent: qat
motivation: 将激活量化难度平滑转移至权重
```

#### 📝 一句话总结

SmoothQuant 提出一种训练自由的 W8A8 后训练量化方法，通过等价的逐通道缩放把大语言模型中难量化的激活离群值平滑迁移到更易量化的权重上，解决了激活 INT8 量化在大模型上严重掉点的问题。

#### 🎯 核心要点

- 观察到 LLM 的量化瓶颈主要来自激活通道中的系统性离群值，而权重分布相对平滑、对通道缩放更鲁棒
- 对每个线性层做数学等价变换：\(\mathbf{X}\mathbf{W}=(\mathbf{X}\mathrm{diag}(\mathbf{s})^{-1})(\mathrm{diag}(\mathbf{s})\mathbf{W})\)
- 使用少量校准样本离线估计平滑因子 \(\mathbf{s}\)，不需要反向传播或重新训练模型参数
- 用迁移强度 \(\alpha\) 控制激活和权重之间的量化难度分配，典型甜点区间约为 0.4 到 0.6
- 支持 Transformer 中线性层和 attention BMM 等主要计算密集算子走统一 INT8 GEMM/BMM 路径
- 在 OPT、BLOOM、GLM、LLaMA、MT-NLG 等模型上实现接近无损的 W8A8 推理，并报告最高 1.56 倍加速和 2 倍显存节省

#### 🔬 深入细节

![SmoothQuant 平滑量化直觉图](https://ar5iv.labs.arxiv.org/html/2211.10438/assets/x2.png)
*图：来源为论文 Figure 2 的 ar5iv 渲染。SmoothQuant 将激活中的跨通道尺度差异迁移到权重中，使平滑后的激活和调整后的权重都更适合 INT8 量化。*

```python
# SmoothQuant 离线校准与部署伪代码
def smoothquant_transform(model, calibration_batches, alpha=0.5):
    for layer in model.transformer_layers:
        for linear in layer.quantized_linears:
            # 1. 在校准集上统计该线性层输入激活的逐输入通道最大幅值
            x_absmax = collect_input_channel_absmax(linear, calibration_batches)
            # 2. 统计权重在相同输入通道上的最大幅值
            w_absmax = abs(linear.weight).amax(dim=0)
            eps = 1e-6

            # 3. 计算平滑因子：alpha 越大，越多难度从激活迁移到权重
            s = (x_absmax.clamp_min(eps) ** alpha) / (
                w_absmax.clamp_min(eps) ** (1 - alpha)
            )

            # 4. 做等价重参数化；工程实现中可把 1 / s 融合进前序 LayerNorm/Linear
            linear.weight = linear.weight * s.reshape(1, -1)
            linear.input_smoother = 1.0 / s

            # 5. 对平滑后的权重和运行时激活使用硬件友好的 INT8 量化
            linear.weight_int8, linear.weight_scale = quantize_weight_int8(linear.weight)
            linear.act_scale = calibrate_activation_scale(linear, calibration_batches)
    return export_int8_runtime(model)
```

LLM 的普通 W8A8 量化会失败，是因为少数激活通道的幅值远大于其他通道。对称均匀量化通常用最大绝对值确定量化步长：

$$
\bar{\mathbf{X}}^{\mathrm{INT8}}=
\left\lfloor\frac{\mathbf{X}^{\mathrm{FP16}}}{\Delta}\right\rceil,\quad
\Delta=\frac{\max(|\mathbf{X}|)}{2^{N-1}-1}
$$

当 \(\max(|\mathbf{X}|)\) 被离群值主导时，大部分非离群值只能落在很少的整数桶里，有效量化级数急剧下降。论文指出，激活离群值不是随机散落，而是长期集中在少数固定通道；这意味着如果能按输入通道缩放激活，就可以显著降低量化误差。但直接做激活 per-channel scaling 不适合标准 INT8 GEMM，因为缩放发生在矩阵乘的 inner dimension 上，硬件 kernel 难以高效插入。

SmoothQuant 的核心是把这个不可高效实现的激活逐通道缩放，改写成线性层的离线等价重参数化：

$$
\mathbf{Y}=\mathbf{X}\mathbf{W}
=\left(\mathbf{X}\mathrm{diag}(\mathbf{s})^{-1}\right)
\left(\mathrm{diag}(\mathbf{s})\mathbf{W}\right)
=\hat{\mathbf{X}}\hat{\mathbf{W}}
$$

这里 \(\mathbf{s}\) 是输入通道维度的平滑因子。平滑后的 \(\hat{\mathbf{X}}\) 不再有严重通道离群值，而权重 \(\hat{\mathbf{W}}\) 虽被相反方向放大，但权重原本更平坦，通常仍能被 INT8 良好表示。由于浮点函数完全等价，校准阶段只改变参数化方式，不改变模型预测函数；部署时 \(\mathbf{s}^{-1}\) 还可以融合到前序 LayerNorm 或前序线性层的参数中，避免额外 runtime kernel。

平滑因子的常用估计式为：

$$
s_j=\frac{\max(|\mathbf{X}_j|)^\alpha}{\max(|\mathbf{W}_j|)^{1-\alpha}}
$$

其中 \(\max(|\mathbf{X}_j|)\) 来自校准样本中第 \(j\) 个输入通道的激活峰值，\(\max(|\mathbf{W}_j|)\) 是相同通道对应权重的峰值。\(\alpha=0\) 时几乎不迁移激活难度，激活仍难量化；\(\alpha=1\) 时把难度几乎全压给权重，权重量化误差会变大。论文消融显示 \(\alpha\) 过小或过大都会损害精度，OPT/BLOOM 等模型常用 0.5 左右，离群更强的模型可取更大的迁移强度。

> 💡 关键：SmoothQuant 不是学习一个新稀疏结构或低秩补偿，而是把同一个线性映射换成更量化友好的坐标系。正因为它是等价变换，才能作为 PTQ 方法直接用于大模型部署。

在 Transformer 块中，SmoothQuant 默认对 self-attention 和 FFN 的线性层输入做 smoothing，并把线性层权重与激活都量化到 INT8；attention 中的 BMM 也可量化为 INT8。LayerNorm、Softmax、残差加法、激活函数等轻量算子保留 FP16，以避免把不占主要耗时的部分复杂化。与 LLM.int8() 通过 FP16 旁路保留离群通道不同，SmoothQuant 的目标是消除混合精度分支，让主要矩阵乘全部落到标准 INT8 kernel 上；与 GPTQ/AWQ 这类 weight-only 方法相比，它同时量化激活，因此在批量推理和长上下文阶段更容易兑现硬件吞吐收益。

#### 🧪 练习题

```yaml
question: "SmoothQuant 中平滑因子 s 的核心作用是什么？"
options:
  - "学习一个低秩适配器来恢复量化误差"
  - "通过等价缩放把激活离群值的量化难度转移到权重"
  - "只量化权重并在推理时反量化为 FP16"
  - "把所有 LayerNorm 和 Softmax 都改成 INT8"
answer: 1
explain: "SmoothQuant 保持 XW 完全等价，但把输入激活除以通道尺度、把权重乘以同一尺度，从而让激活和权重都更适合 INT8 表示。"
```
