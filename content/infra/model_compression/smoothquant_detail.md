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

SmoothQuant 提出训练自由的 W8A8 后训练量化方法，通过数学等价的通道缩放把激活离群值的量化难度转移到更易量化的权重上，解决了大语言模型激活 INT8 量化易崩溃的问题。

#### 🎯 核心要点

- 观察到 LLM 激活存在少数通道离群值，而权重分布相对平滑、容忍缩放
- 对线性层引入通道缩放 \(\mathbf{s}\)，保持 \(\mathbf{X}\mathbf{W}=(\mathbf{X}\mathrm{diag}(\mathbf{s})^{-1})(\mathrm{diag}(\mathbf{s})\mathbf{W})\)
- 用校准数据离线估计平滑因子，运行时不引入额外训练
- 用 \(\alpha\) 在“激活更平滑”和“权重不过度放大”之间调节迁移强度
- 覆盖 Transformer 中线性层和 attention BMM 等主要矩阵乘，目标是硬件友好的 W8A8 推理
- 在 OPT、BLOOM、GLM、MT-NLG 等模型上实现接近无损的 INT8 推理和显存节省

#### 🔬 深入细节

![SmoothQuant 平滑量化直觉图](https://ar5iv.labs.arxiv.org/html/2211.10438/assets/x2.png)
*图：SmoothQuant 将激活中的通道离群值迁移到权重中，使激活和权重都更适合 INT8 量化。*

```python
# SmoothQuant 离线校准与推理伪代码
for linear in transformer_layers:
    X_absmax = collect_channel_absmax(linear.input_activations)
    W_absmax = abs(linear.weight).amax(dim=out_dim)
    s = (X_absmax ** alpha) / (W_absmax ** (1 - alpha))

    # 数学等价变换，可融合到相邻 LayerNorm/Linear 参数中
    X_smooth = X / s
    W_smooth = s[:, None] * W

    linear.weight_int8, linear.scale_w = quantize_int8(W_smooth)
    linear.activation_scale = calibrate_int8_scale(X_smooth)
```

LLM 的 W8A8 难点主要在激活而不是权重。少数激活通道可能比其他通道大很多，per-tensor 或高效的 vector-wise INT8 量化必须覆盖最大值，导致大部分普通值只占很少有效量化级，误差被放大。SmoothQuant 的核心判断是：权重本身分布更均匀，把部分尺度压力转移给权重后，权重仍能被良好量化。

对线性层 \(\mathbf{Y}=\mathbf{X}\mathbf{W}\)，SmoothQuant 插入通道尺度 \(\mathbf{s}\)：

$$
\mathbf{Y}=(\mathbf{X}\mathrm{diag}(\mathbf{s})^{-1})(\mathrm{diag}(\mathbf{s})\mathbf{W})=\hat{\mathbf{X}}\hat{\mathbf{W}}
$$

该变换不改变浮点模型函数，只改变激活和权重的数值范围。平滑因子通常由校准激活和权重最大值估计：

$$
s_j=\frac{\max(|\mathbf{X}_j|)^\alpha}{\max(|\mathbf{W}_j|)^{1-\alpha}}
$$

其中 \(\alpha\) 控制迁移比例。若 \(\alpha\) 较大，更多激活离群值被压低，但权重被放大更多；若 \(\alpha\) 较小，权重量化更轻松，但激活仍可能有离群值。论文中不同模型可调 \(\alpha\)，工程上常通过少量校准集选择。

> 💡 关键：SmoothQuant 不是学习新模型，而是做等价重参数化。平滑尺度可提前融合到 LayerNorm 或前序线性层中，所以运行时仍可走标准 INT8 GEMM/BMM。

与 LLM.int8() 保留离群通道高精度不同，SmoothQuant 的目标是让所有主要矩阵乘都进入统一 INT8 路径，避免混合高精度分支带来的 kernel 复杂度。与 GPTQ/AWQ 这类 weight-only 方法相比，SmoothQuant 同时量化权重和激活，因此更容易把理论压缩转化为硬件吞吐收益。

#### 🧪 练习题

```yaml
question: "SmoothQuant 中平滑因子 s 的主要作用是什么？"
options:
  - "改变模型结构以减少层数"
  - "把激活离群值的量化难度通过等价缩放转移到权重"
  - "用二阶 Hessian 计算每个权重的量化误差"
  - "仅对输出 logits 做温度缩放"
answer: 1
explain: "SmoothQuant 保持 XW 不变，但把 X 除以通道尺度、把 W 乘以通道尺度，从而降低激活离群值对 INT8 量化的影响。"
```
