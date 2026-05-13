### 你只需要看一次26 (You Only Look Once 26)

```yaml
id: yolo26
name: YOLO26
full_name: "你只需要看一次26 (You Only Look Once 26)"
year: "2026.01"
org: Ultralytics
paper_url: https://docs.ultralytics.com/models/yolo26/
category: one_stage
parent: yolov12
motivation: "NMS-Free原生推理与MuSGD优化"
```

#### 📝 一句话总结

YOLO26 通过移除 DFL 与 NMS 实现原生端到端推理，并引入 MuSGD（SGD + Muon 混合优化器）将大语言模型训练的优化技术迁移至视觉检测，在 CPU 推理速度上提升最高 43%，成为面向边缘设备最实用的 YOLO 版本。

#### 🎯 核心要点

- **NMS-Free 端到端推理**：采用双头架构（One-to-One + One-to-Many），默认 One-to-One 头直接输出 \((N, 300, 6)\) 预测结果，无需 NMS 后处理，该思路源自 YOLOv10
- **DFL 移除**：去除 Distribution Focal Loss 模块，简化模型导出流程，提升边缘设备与低功耗硬件的兼容性
- **MuSGD 优化器**：融合 SGD 与 Muon 优化器的混合方案，灵感来自 Moonshot AI 的 Kimi K2 大模型训练，带来更稳定的收敛与更快的训练速度
- **ProgLoss + STAL**：改进的损失函数组合，显著提升小目标检测精度，适用于 IoT、机器人、航拍等场景
- **任务专用优化**：分割任务引入语义分割损失 + 多尺度 Proto 模块；姿态估计引入残差对数似然估计（RLE）；旋转框检测引入角度损失解决边界不连续问题
- **5 种规模 × 5 种任务**：n/s/m/l/x 五种模型规模，覆盖检测、实例分割、姿态估计、旋转框检测、分类五大任务
- **YOLOE-26 开放词汇**：集成 YOLOE 系列的开放词汇能力，支持文本/视觉提示的零样本推理
- **CPU 推理提速最高 43%**：针对边缘计算场景深度优化，YOLO26n 在 CPU ONNX 上仅需 38.9ms

#### 🔬 深入细节

![YOLO26 性能对比图](https://cdn.jsdelivr.net/gh/ultralytics/assets@main/docs/Ultralytics-YOLO26-Benchmark.jpg)
*图：YOLO26 各规模模型与前代 YOLO 系列在 COCO 数据集上的 mAP-延迟对比*

![YOLO26 端到端性能对比图](https://cdn.jsdelivr.net/gh/ultralytics/assets@main/docs/Ultralytics-YOLO26-Benchmark-E2E.jpg)
*图：YOLO26 端到端（NMS-Free）模式下的性能对比*

##### 算法伪代码

```python
# YOLO26 双头推理伪代码
class YOLO26Detector:
    def __init__(self):
        self.backbone = YOLO26Backbone()       # 特征提取
        self.neck = YOLO26Neck()               # 多尺度特征融合 (FPN/PAN)
        self.head_o2o = OneToOneHead(max_det=300)  # 端到端头 (默认)
        self.head_o2m = OneToManyHead(anchors=8400) # 传统头 (可选)

    def forward(self, x, end2end=True):
        features = self.backbone(x)            # 多尺度特征 {P3, P4, P5}
        fused = self.neck(features)            # 特征融合

        if end2end:
            # One-to-One: 直接输出, 无需 NMS
            preds = self.head_o2o(fused)       # (N, 300, 6) = [x, y, w, h, conf, cls]
        else:
            # One-to-Many: 传统密集预测 + NMS
            raw = self.head_o2m(fused)         # (N, nc+4, 8400)
            preds = nms(raw, iou_thresh=0.7)
        return preds

# MuSGD 优化器伪代码
class MuSGD:
    """SGD + Muon 混合优化器"""
    def __init__(self, params, lr, momentum, muon_strength):
        self.sgd = SGD(params, lr=lr, momentum=momentum)
        self.muon_strength = muon_strength     # Muon 正交化强度

    def step(self, loss):
        grads = compute_gradients(loss)
        # Muon: 对梯度矩阵做正交化投影 (源自 LLM 训练)
        for p, g in zip(params, grads):
            if g.dim() >= 2:
                g = orthogonalize(g, strength=self.muon_strength)
            p.data -= self.sgd.lr * (g + self.sgd.momentum * p.grad_buffer)
```

##### 1. 动机与背景

YOLO 系列自 2015 年诞生以来，一直是实时目标检测的标杆。然而，随着模型部署场景从 GPU 服务器扩展到边缘设备（IoT、机器人、无人机），传统 YOLO 面临三大痛点：

1. **NMS 后处理的部署负担**：非极大值抑制（NMS）是一个独立的后处理步骤，增加了推理延迟、部署复杂度，且在不同硬件平台上行为不一致。YOLOv10 首次提出了端到端方案，但仍需进一步优化。
2. **DFL 的硬件兼容性问题**：Distribution Focal Loss 虽然提升了定位精度，但其复杂的分布预测机制使模型导出困难，限制了在低功耗设备上的部署。
3. **训练优化的瓶颈**：传统 SGD 在视觉模型训练中收敛较慢，而大语言模型领域已涌现出更先进的优化技术。

> 💡 关键：YOLO26 的设计哲学是"**为部署而生**"——每一项架构改动都以简化推理、降低延迟、提升边缘兼容性为首要目标。

##### 2. NMS-Free 端到端推理与双头架构

YOLO26 最核心的架构创新是**原生端到端推理**，通过双头设计实现：

**One-to-One 头（默认）**：每个目标只产生一个最优预测，输出张量形状为 \((N, 300, 6)\)，其中 300 是每张图像的最大检测数。该头在训练时使用匈牙利匹配（Hungarian Matching）进行一对一标签分配，推理时直接输出最终结果，完全跳过 NMS。

**One-to-Many 头（可选）**：保留传统 YOLO 的密集预测方式，输出 \((N, n_c + 4, 8400)\)，其中 8400 为多尺度锚点总数。该头在训练时提供更丰富的监督信号，推理时需要 NMS 后处理，通常能获得略高的精度。

$$
\text{mAP}_{\text{e2e}} \approx \text{mAP}_{\text{o2m}} - 0.6\sim0.8
$$

> ⚠️ 注意：端到端模式的 mAP 略低于传统 NMS 模式（约 0.6-0.8 个点），但省去了 NMS 带来的延迟和部署复杂度，在实际应用中往往是更优的选择。

用户可通过 `end2end` 参数灵活切换：

```python
# 端到端模式 (默认, 无需 NMS)
results = model.predict("image.jpg")              # end2end=True
# 传统模式 (需要 NMS, 精度略高)
results = model.predict("image.jpg", end2end=False)
```

##### 3. DFL 移除与推理简化

Distribution Focal Loss（DFL）在 YOLOv8/v11/v12 中被广泛使用，它将边界框回归建模为离散分布预测问题：

$$
\text{DFL}(S_i, S_{i+1}) = -\left((y_{i+1} - y) \log(S_i) + (y - y_i) \log(S_{i+1})\right)
$$

虽然 DFL 提升了定位精度，但其预测的是一个 \(n\)-bin 分布向量而非直接的坐标值，导致：
- 模型导出时需要额外的 softmax + 期望计算层
- 在某些边缘推理框架（如 TFLite、NNAPI）中兼容性差
- 增加了推理计算量

YOLO26 **完全移除 DFL**，回归直接坐标预测，配合改进的 ProgLoss 损失函数弥补精度损失。这一简化使得模型导出更加直接，在边缘设备上的兼容性大幅提升。

##### 4. MuSGD 优化器：从 LLM 到 CV 的优化迁移

MuSGD 是 YOLO26 在训练层面的核心创新，它将大语言模型训练中的 **Muon 优化器**与经典 SGD 融合：

**Muon 的核心思想**：对梯度矩阵进行正交化投影（Orthogonalization），使参数更新方向更加"高效"，避免冗余更新。这一技术在 Moonshot AI 的 Kimi K2 大模型训练中展现了显著优势。

**MuSGD 的融合策略**：
- 对于高维参数（如卷积核、线性层权重），应用 Muon 的正交化梯度处理
- 对于低维参数（如偏置、BatchNorm 参数），保持经典 SGD 更新
- 结合 SGD 的动量机制，确保训练稳定性

$$
g_{\text{orth}} = \text{Orthogonalize}(\nabla_\theta \mathcal{L}), \quad \theta \leftarrow \theta - \eta \cdot (g_{\text{orth}} + \mu \cdot v)
$$

其中 \(\eta\) 为学习率，\(\mu\) 为动量系数，\(v\) 为动量缓存。

> 💡 关键：MuSGD 的意义在于打破了 CV 与 NLP 训练技术之间的壁垒，证明了 LLM 训练中的优化创新可以有效迁移到视觉模型。

##### 5. ProgLoss + STAL：小目标检测增强

YOLO26 引入了 **Progressive Loss（ProgLoss）** 和 **STAL（Spatial-Temporal Attention Loss）** 的组合，专门针对小目标检测进行优化：

- **ProgLoss**：在训练过程中渐进式调整损失权重，早期阶段侧重学习大目标的粗略定位，后期阶段逐步增加小目标的损失权重，避免小目标信号在训练初期被大目标淹没
- **STAL**：通过空间注意力机制增强小目标区域的特征响应，使检测头对小目标更加敏感

这一组合在 COCO 数据集上带来了显著的小目标检测提升，对于航拍图像、监控场景等小目标密集的应用尤为关键。

##### 6. 任务专用优化

YOLO26 针对不同下游任务引入了专门的优化：

| 任务 | 优化技术 | 效果 |
|------|----------|------|
| 实例分割 | 语义分割损失 + 多尺度 Proto 模块 | 更好的掩码质量与模型收敛 |
| 姿态估计 | 残差对数似然估计（RLE） | 更精确的关键点定位 |
| 旋转框检测 | 角度损失 + 优化解码 | 解决方形目标的边界不连续问题 |

##### 7. 性能数据

YOLO26 在 COCO val2017 上的检测性能（640×640 输入）：

| 模型 | mAP\(_{50-95}\) | mAP\(_{50-95}\)(e2e) | CPU ONNX (ms) | T4 TRT10 (ms) | 参数量 (M) | FLOPs (B) |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| YOLO26n | 40.9 | 40.1 | 38.9 | 1.7 | 2.4 | 5.4 |
| YOLO26s | 48.6 | 47.8 | 87.2 | 2.5 | 9.5 | 20.7 |
| YOLO26m | 53.1 | 52.5 | 220.0 | 4.7 | 20.4 | 68.2 |
| YOLO26l | 55.0 | 54.4 | 286.2 | 6.2 | 24.8 | 86.4 |
| YOLO26x | 57.5 | 56.9 | 525.8 | 11.8 | 55.7 | 193.9 |

> 💡 关键：YOLO26n 仅 2.4M 参数、5.4B FLOPs，CPU 推理 38.9ms，是目前最轻量的高精度实时检测器之一。与前代相比，CPU 推理速度提升最高达 43%。

##### 8. 与前代 YOLO 的对比

| 特性 | YOLOv8/v11 | YOLOv12 | **YOLO26** |
|------|:---:|:---:|:---:|
| NMS 后处理 | 需要 | 需要 | **原生免除** |
| DFL 模块 | 有 | 有 | **移除** |
| 优化器 | SGD/AdamW | SGD/AdamW | **MuSGD** |
| 端到端推理 | ✗ | ✗ | **✓（双头架构）** |
| 小目标优化 | 一般 | 改进 | **ProgLoss+STAL** |
| 边缘部署友好度 | 中等 | 中等 | **高** |

#### 🧪 练习题

```yaml
question: "YOLO26 的 MuSGD 优化器融合了哪两种优化方法？"
options:
  - "Adam 与 LAMB"
  - "SGD 与 Muon"
  - "AdamW 与 LARS"
  - "RMSProp 与 Lookahead"
answer: 1
explain: "MuSGD 是 SGD 与 Muon 的混合优化器，将 Moonshot AI Kimi K2 大模型训练中的 Muon 正交化梯度技术引入视觉模型训练。"
```