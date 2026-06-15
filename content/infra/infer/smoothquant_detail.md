### SmoothQuant: 平滑量化 (SmoothQuant)

```yaml
id: smoothquant
name: SmoothQuant
full_name: 平滑量化 (SmoothQuant)
year: '2022'
org: MIT
paper_url: https://arxiv.org/abs/2211.10438
category: quantize
parent: —
motivation: 迁移激活值量化难度实现W8A8推理
```

#### 📝 一句话总结

SmoothQuant 通过等价缩放把激活中的 outlier 难度迁移到权重上，使 Transformer 可以使用硬件友好的 W8A8 量化进行高效推理。

#### 🎯 核心要点

- 观察 LLM 激活存在显著通道 outlier，直接 INT8 激活量化困难
- 对每个通道选择平滑因子 \(s\)，缩小激活、放大对应权重
- 保持线性层数学等价：\(XW=(X/s)(sW)\)
- 使用迁移强度 \(\alpha\) 在激活和权重量化难度间折中
- 无需重训练即可支持 OPT/BLOOM/GLM 等大模型 W8A8 推理

#### 🔬 深入细节

![SmoothQuant 核心示意图](https://ar5iv.labs.arxiv.org/html/2211.10438/assets/x1.png)
*图：SmoothQuant 的激活平滑框架，将激活 outlier 迁移到权重。*

```python
# SmoothQuant calibration and inference
act_max = max_abs_activation_per_channel(calibration_data)
weight_max = max_abs_weight_per_input_channel(W)
s = act_max ** alpha / weight_max ** (1 - alpha)
X_smooth = X / s
W_smooth = W * s[:, None]
Y = int8_gemm(quantize(X_smooth), quantize(W_smooth))
```

##### 动机与背景

权重通常较容易 INT8 量化，但 LLM 激活的少数通道 outlier 会导致 scale 被拉大，普通值分辨率下降。混合精度保留 outlier 成本高，纯 INT8 激活又降质。

##### 核心机制

SmoothQuant 利用线性层的通道缩放等价性：把输入激活通道除以 \(s_j\)，同时把对应权重通道乘以 \(s_j\)，输出不变。这样激活范围被平滑，量化难度转移到更稳定的权重上。

##### 训练/推理流程

离线校准阶段统计激活和权重每通道最大值，计算平滑因子并融合到模型权重或归一化参数中。部署时直接执行 W8A8 INT8 GEMM，不需要在线特殊处理。

##### 与传统方法的区别

GPTQ/AWQ 主要是 weight-only 低比特量化，SmoothQuant 目标是 activation+weight 双 INT8，以获得更通用的硬件加速。它不是补偿量化误差，而是重分配量化难度。

#### 🧪 练习题

```yaml
question: "SmoothQuant 的核心操作是什么？"
options:
  - "缩小激活 outlier 并等价放大权重"
  - "删除所有 outlier token"
  - "增加模型层数"
  - "训练草稿模型"
answer: 0
explain: "通道缩放保持线性层输出不变，同时让激活更容易 INT8 量化。"
```
