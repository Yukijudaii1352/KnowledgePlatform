### QAT — 量化感知训练 (Quantization-Aware Training)

```yaml
id: qat
name: QAT
full_name: "量化感知训练 (Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference)"
year: 2018
org: Google
paper_url: "https://arxiv.org/abs/1712.05877"
category: model_compression
parent: "—"
motivation: "提出端到端量化感知训练框架，使模型在纯整数推理硬件上高效运行，同时最小化量化精度损失"
```

#### 📝 一句话总结

QAT 提出了一套完整的量化感知训练框架：在训练前向传播中插入模拟量化（fake quantization）节点来模拟定点推理的精度损失，配合 Batch Normalization 折叠和 Straight-Through Estimator 反向传播，使得量化后的模型可以在纯整数算术硬件上高效推理，同时将精度损失控制在极小范围内。

#### 🎯 核心要点

- **仿射量化方案**：采用 \(r = S(q - Z)\) 的非对称量化映射，权重和激活量化为 8-bit 整数，bias 量化为 32-bit 整数
- **纯整数推理**：矩阵乘法完全在整数域完成，唯一的浮点操作是一个预计算的定点乘数 \(M = S_1 S_2 / S_3\)，通过定点乘法实现
- **模拟量化训练（Fake Quantization）**：前向传播中插入 fake_quant 节点模拟量化误差，反向传播使用 STE（Straight-Through Estimator）直通梯度
- **量化范围确定**：权重使用逐层 min/max，激活使用 EMA（指数移动平均）跟踪运行范围
- **BN 折叠量化**：训练时模拟推理阶段的 BN 折叠效果，对折叠后的等效权重进行量化
- **训练 Warmup**：训练初期（50K~2M 步）禁用激活量化，先让网络收敛到合理范围再引入量化噪声
- **实验覆盖广泛**：在 ResNet、InceptionV3、MobileNet 上验证，涵盖分类（ImageNet）、检测（COCO）、人脸检测等任务

#### 🔬 深入细节

![QAT 量化感知训练流程](https://arxiv.org/html/1712.05877v1/extracted/figures/training_graph.png)
*图：QAT 训练与推理流程对比。训练时在浮点权重/激活后插入 fake_quant 节点模拟量化；推理时将权重直接量化为整数，所有计算在整数域完成。*

```python
# QAT 核心训练流程伪代码 (Algorithm 1)
# Phase 1: 构建训练图
float_graph = build_model()                    # 构建浮点模型
for layer in float_graph.layers:
    # 在权重后插入 fake_quant 节点
    layer.weight = fake_quantize(layer.weight, n_bits=8)
    # 在激活后插入 fake_quant 节点
    layer.activation = fake_quantize(layer.activation, n_bits=8)

# Phase 2: 训练（前向模拟量化，反向 STE）
for step in range(total_steps):
    if step < warmup_steps:
        disable_activation_quantization()       # 初期禁用激活量化
    else:
        enable_activation_quantization()
    loss = forward_with_fake_quant(batch)
    loss.backward()                             # STE: 梯度直通 fake_quant 节点
    optimizer.step()

# Phase 3: 导出推理图
for layer in float_graph.layers:
    layer.weight = quantize_to_int8(layer.weight)  # 真正量化为整数
    layer.bn = fold_into_weight(layer.bn)           # BN 折叠
# 推理时所有计算在 int8/int32 域完成
```

**动机与背景**

深度神经网络在移动端和嵌入式设备上的部署面临两大挑战：（1）模型体积大，内存受限；（2）浮点运算慢，能耗高。量化（Quantization）将 32-bit 浮点参数压缩为 8-bit 或更低位宽的整数，可以同时解决存储和计算效率问题。然而，直接对训练好的模型进行 Post-Training Quantization（PTQ）往往导致显著的精度损失，尤其是对 MobileNet 等轻量模型。QAT 的核心思想是：**在训练过程中就模拟量化带来的精度损失，让模型学会适应量化噪声**。

**核心机制一：仿射量化方案**

论文采用仿射（非对称）量化，将实数值 \(r\) 映射到整数 \(q\)：

$$r = S(q - Z)$$

其中 \(S\)（scale）和 \(Z\)（zero-point）由数据范围决定：

$$S = \frac{r_{\max} - r_{\min}}{q_{\max} - q_{\min}}, \quad Z = \text{round}\left(q_{\min} - \frac{r_{\min}}{S}\right)$$

> 💡 **关键**：zero-point \(Z\) 是整数，确保实数 0.0 可以被精确表示为某个量化值。这对 ReLU 激活（大量零值）和 zero-padding 至关重要，避免了系统性偏差。

权重量化到 \([-127, 127]\)（int8，排除 -128 以保持对称性），激活量化到 \([0, 255]\)（uint8，因 ReLU 后非负）。

**核心机制二：纯整数矩阵乘法**

两个量化矩阵相乘时，展开仿射映射后得到：

$$q_3^{(i,k)} \approx Z_3 + M \sum_{j=1}^{N} \left(q_1^{(i,j)} - Z_1\right)\left(q_2^{(j,k)} - Z_2\right)$$

其中 \(M = \frac{S_1 \cdot S_2}{S_3}\) 是唯一需要浮点的部分。论文的关键洞察是：\(M\) 总在 \((0, 1)\) 区间内，可以表示为 \(M = 2^{-n} M_0\)，其中 \(M_0 \in [0.5, 1)\) 用定点整数乘法实现，\(2^{-n}\) 用位移实现。这样**整个推理过程完全在整数域完成**。

> ⚠️ **注意**：Bias 使用 int32 量化，其 scale 为 \(S_{\text{bias}} = S_1 \cdot S_2\)，zero-point 为 0。由于累加器本身就是 int32，bias 加法无额外开销。

**核心机制三：模拟量化训练（Fake Quantization）**

训练时不真正将权重转为整数，而是在浮点域模拟量化-反量化过程：

$$\text{clamp}(r; a, b) = \min(\max(r, a), b)$$

$$s = \frac{b - a}{n - 1}$$

$$q(r; a, b, n) = \left\lfloor \frac{\text{clamp}(r; a, b) - a}{s} \right\rceil \cdot s + a$$

其中 \(a, b\) 是量化范围，\(n\) 是量化级数（8-bit 时 \(n = 2^8 = 256\)），\(\lfloor \cdot \rceil\) 表示四舍五入。这个操作将浮点值"snap"到最近的量化格点上，模拟了量化引入的舍入误差。

反向传播时，由于 round 操作不可导，使用 **Straight-Through Estimator（STE）**：在 \([a, b]\) 范围内梯度直通（即 \(\frac{\partial q}{\partial r} = 1\)），范围外梯度为零（clamp 的效果）。

**量化范围确定策略**：
- **权重**：每层使用当前 batch 的 \(\min(w)\) 和 \(\max(w)\)，训练中动态更新
- **激活**：使用 EMA 跟踪运行统计量的范围，平滑因子接近 1（如 0.999），避免单 batch 异常值影响

**核心机制四：Batch Normalization 折叠**

推理时 BN 层会被折叠进卷积权重以减少计算。训练时必须模拟这一折叠效果，否则训练和推理的量化行为不一致。折叠后的等效权重为：

$$w_{\text{fold}} = \frac{\gamma \cdot w}{\sqrt{\text{EMA}(\sigma_B^2) + \epsilon}}$$

> 💡 **关键**：分母使用的是 BN 的 EMA 统计量（而非当前 batch 统计量），这样折叠后的权重变化更平滑，有利于训练稳定性。训练时对 \(w_{\text{fold}}\) 进行 fake quantization，确保量化行为与推理一致。

**训练 Warmup 策略**

论文发现，在训练初期直接引入量化噪声会导致收敛困难。因此采用延迟量化策略：
- 前 50K~2M 步（视模型大小而定）仅做正常浮点训练
- 之后再开启激活的 fake quantization
- 权重量化通常从一开始就启用（因为权重分布相对稳定）

**实验结果与对比**

| 模型 | 任务 | Float 精度 | Int8 精度 | 精度损失 |
|------|------|-----------|----------|---------|
| ResNet-50 | ImageNet Top-1 | 76.4% | 74.9% | -1.5% |
| ResNet-150 | ImageNet Top-1 | 78.8% | 76.7% | -2.1% |
| InceptionV3 (ReLU6) | ImageNet Top-1 | 78.4% | 75.4% | -3.0% |
| InceptionV3 (ReLU6, 7-bit) | ImageNet Top-1 | 78.4% | 75.0% | -3.4% |
| MobileNet SSD (DM=100%) | COCO mAP | 22.1 | 21.7 | -1.8% |
| MobileNet SSD (DM=50%) | COCO mAP | 16.7 | 16.6 | -0.6% |

与同期方法对比（ResNet-50 ImageNet Top-1）：BWN 68.7%、TWN 72.5%、INQ 74.8%、FGQ 70.8%，本文方法 **74.9%** 在 8-bit 量化中达到最优。

**延迟收益**：在 Qualcomm Snapdragon 835 上，量化 MobileNet 在相同延迟预算下精度提升约 **10%**（LITTLE 核心，33ms 实时约束下）。COCO 检测任务中延迟降低高达 **50%**（370ms → 272ms，big 核心）。人脸检测中实现约 **2× 加速**，25% DM 模型从 23fps 提升到 36fps 达到实时。

> 💡 **关键洞察**：论文主张不应仅关注"给定模型的量化精度损失"，而应关注**延迟-精度权衡曲线**。量化后可以使用更大的模型在相同延迟下获得更高精度，这比单纯比较同一模型的精度损失更有实际意义。

**与传统 PTQ 方法的区别**

| 维度 | Post-Training Quantization (PTQ) | QAT（本文） |
|------|--------------------------------|------------|
| 训练开销 | 无需重训练 | 需要完整训练流程 |
| 精度损失 | 较大（尤其轻量模型） | 极小 |
| BN 处理 | 推理时直接折叠 | 训练时模拟折叠后量化 |
| 范围确定 | 校准集统计 | EMA 动态跟踪 |
| 适用场景 | 大模型、精度不敏感 | 轻量模型、精度敏感 |

#### 🧪 练习题

```yaml
question: "QAT 训练中使用 Straight-Through Estimator (STE) 的原因是什么？"
options:
  - "加速训练收敛"
  - "round 操作不可导，STE 让梯度在量化范围内直通以实现反向传播"
  - "减少模型参数量"
  - "避免 Batch Normalization 折叠带来的数值不稳定"
answer: 1
explain: "fake quantization 中的 round 操作导数几乎处处为零，无法传递梯度。STE 在量化范围 [a,b] 内将梯度直通（视为恒等映射），范围外梯度置零，从而使训练可以正常进行。"
```