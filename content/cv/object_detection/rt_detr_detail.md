### RT-DETR — DETRs Beat YOLOs on Real-time Object Detection

```yaml
id: rt_detr
name: RT-DETR
full_name: "实时检测Transformer (Real-Time DEtection TRansformer)"
year: "2024"
org: "百度 (Baidu Inc.) & 北京航空航天大学 & 中国科学院自动化研究所"
paper_url: "https://arxiv.org/abs/2304.08069"
category: "real-time object detection"
parent: "DETR"
motivation: "首个实时端到端目标检测器，通过高效混合编码器和不确定性最小查询选择，在不使用NMS后处理的前提下超越YOLO系列的速度-精度权衡"
```

#### 📝 一句话总结

RT-DETR 提出了首个实时端到端目标检测器，通过**高效混合编码器**（解耦尺度内交互与跨尺度融合）和**不确定性最小查询选择**（联合优化分类与定位质量），在完全消除 NMS 后处理的前提下，以 RT-DETR-R50 实现 53.1% AP / 108 FPS（T4 GPU, TensorRT FP16），首次在速度和精度上同时超越同规模 YOLO 检测器。

#### 🎯 核心要点

- **首个实时端到端检测器**：将 DETR 范式成功拓展至实时检测场景，彻底消除 NMS 后处理带来的速度瓶颈和超参敏感性
- **NMS 瓶颈的系统性分析**：揭示 NMS 执行时间随预测数量增加而急剧上升，且不同 IoU/score 阈值组合导致精度-速度不可兼得
- **高效混合编码器（Hybrid Encoder）**：
  - **AIFI（Attention-based Intra-scale Feature Interaction）**：仅对最高层特征（S5）执行自注意力，捕获尺度内语义交互
  - **CCFF（CNN-based Cross-scale Feature Fusion）**：使用 RepBlock 卷积融合跨尺度特征，替代昂贵的多尺度 Transformer 编码
- **不确定性最小查询选择（Uncertainty-minimal Query Selection）**：同时约束分类与定位的联合质量，选择预测不确定性最低的 top-K 特征初始化解码器查询
- **灵活速度调节**：通过推理时调整解码器层数（无需重训练）实现速度-精度的灵活权衡
- **模型缩放策略**：支持 ResNet18/34/50/101 等多种骨干网络，覆盖从 S 到 X 的全尺度实时检测需求
- **COCO 基准 SOTA 结果**：RT-DETR-R50 达 53.1% AP / 108 FPS，RT-DETR-R101 达 54.3% AP / 74 FPS，均超越对应规模的 YOLOv5/v6/v7/v8

#### 🔬 深入细节

##### 1. 问题动机：NMS 是实时检测的隐性瓶颈

现有实时检测器（YOLO 系列）依赖 NMS 后处理来消除冗余预测框。作者通过系统实验揭示了 NMS 的两大问题：

**速度瓶颈**：NMS 的执行时间与预测框数量正相关。在 YOLOv5/v8 等模型中，NMS 耗时可达 1-2ms（占总推理时间的 10-20%），且在密集场景下更为严重。

**超参敏感性**：NMS 需要设置 score 阈值和 IoU 阈值两个超参数，二者存在内在矛盾——

> ⚠️ **关键矛盾**：降低 score 阈值可提高召回率（AP 提升），但会引入更多冗余框导致 NMS 变慢；提高 IoU 阈值可减少误抑制，但同样增加后续处理负担。两个阈值无法同时优化速度和精度。

作者以 YOLOv8-L 为例，在 COCO val2017 上测试不同阈值组合，发现 AP 最高的配置（score=0.001, IoU=0.7）对应的 NMS 耗时为 AP 最低配置的数倍。这一分析为端到端检测器的实时化提供了强有力的动机。

##### 2. 整体架构

RT-DETR 整体架构包含三个核心组件：

1. **骨干网络（Backbone）**：ResNet 系列，提取多尺度特征 \(\{S_3, S_4, S_5\}\)
2. **高效混合编码器（Efficient Hybrid Encoder）**：处理多尺度特征并输出融合后的特征序列
3. **带不确定性最小查询选择的 Transformer 解码器**：从编码器输出中选择高质量查询，迭代预测目标

```
Input Image
    │
    ▼
┌─────────────┐
│  Backbone   │ → {S3, S4, S5} 多尺度特征
│ (ResNet-50) │
└─────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│     Efficient Hybrid Encoder         │
│  ┌────────┐    ┌────────────────┐    │
│  │  AIFI  │    │     CCFF       │    │
│  │(S5自注 │ →  │(跨尺度卷积融合)│    │
│  │ 意力)  │    │  Top-down +    │    │
│  └────────┘    │  Bottom-up     │    │
│                └────────────────┘    │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│  Uncertainty-minimal Query Selection │
│  选择 top-300 低不确定性特征          │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│     Transformer Decoder (6 layers)   │
│  自注意力 + 交叉注意力 + FFN          │
│  可变形注意力 (Deformable Attention)  │
└──────────────────────────────────────┘
    │
    ▼
  {类别, 边界框} × N
```

##### 3. 高效混合编码器（Efficient Hybrid Encoder）

这是 RT-DETR 最核心的设计创新。作者通过消融实验发现，DETR 编码器中的**尺度内交互**和**跨尺度融合**是两种不同性质的操作，应当解耦处理。

**设计演进（消融实验 A→E）**：

| 变体 | 设计 | AP (%) | 延迟 (ms) |
|------|------|--------|-----------|
| A | 单尺度 Transformer 编码器 (S5) | 43.0 | 8.3 |
| B | 多尺度 Transformer 编码器 (拼接) | 44.0 | 12.2 |
| C | 尺度内 Transformer + 跨尺度 Transformer | 46.5 | 14.5 |
| D | 尺度内 Transformer + 跨尺度 CNN 融合 | 44.9 | 9.4 |
| E | **仅 S5 自注意力 (AIFI) + 跨尺度 CNN 融合 (CCFF)** | **47.9** | **9.5** |

> 💡 **关键洞察**：变体 C→D 的对比表明，跨尺度融合用 CNN 替代 Transformer 可大幅降低延迟（14.5→9.4ms）；变体 D→E 的对比表明，尺度内交互只需在最高语义层（S5）执行自注意力即可（因为低分辨率特征已包含高层语义信息），AP 反而提升 3.0%。

**AIFI（Attention-based Intra-scale Feature Interaction）**：

仅对 S5 特征（最低分辨率、最高语义）执行单层 Transformer 自注意力：

$$\text{AIFI}(S_5) = \text{TransformerLayer}(Q=S_5, K=S_5, V=S_5)$$

这一设计基于两个观察：(1) 高层特征包含丰富的语义概念，自注意力可捕获概念间的联系；(2) 低层特征主要包含细粒度纹理，对其执行自注意力收益有限但计算开销巨大。

**CCFF（CNN-based Cross-scale Feature Fusion）**：

采用类似 FPN 的 top-down 和 bottom-up 双路径融合，但使用 RepBlock（训练时多分支、推理时重参数化为单卷积）替代标准卷积：

$$\text{Fusion}(F_{high}, F_{low}) = \text{RepBlocks}(\text{Concat}(\text{Upsample}(F_{high}), F_{low}))$$

融合过程：
1. **Top-down 路径**：S5 → 上采样 → 与 S4 融合 → 上采样 → 与 S3 融合
2. **Bottom-up 路径**：融合后的 S3 → 下采样 → 与 S4 融合 → 下采样 → 与 S5 融合

最终输出三个尺度的融合特征 \(\{P_3, P_4, P_5\}\)。

##### 4. 不确定性最小查询选择（Uncertainty-minimal Query Selection）

传统 DETR 的查询选择（如 Deformable DETR 的 top-K 分类分数选择）仅关注分类置信度，忽略了定位质量。这导致选出的特征可能分类分数高但定位不准确。

**问题分析**：

作者将编码器特征的预测视为一个联合分类-定位任务。对于每个特征 \(f_i\)，编码器输出分类分数 \(\hat{p}_i\) 和定位预测 \(\hat{b}_i\)。理想情况下，高分类分数应对应高定位质量（高 IoU），但实际中二者常不一致。

**不确定性建模**：

作者将分类与定位的不一致性定义为**认知不确定性（epistemic uncertainty）**。具体地，将定位质量（预测框与 GT 的 IoU）视为分类分数的隐式约束：

$$U(f_i) = -P(\hat{p}_i) \cdot \log(P(\hat{p}_i))$$

其中 \(P(\hat{p}_i)\) 是分类概率分布。当分类分数与定位质量一致时，预测的不确定性最低。

**实现方式**：

训练时，将分类损失的目标从 one-hot 标签替换为 **IoU-aware 软标签**：

$$y_i = \hat{y}_i \cdot \text{IoU}(\hat{b}_i, b_i^{gt})$$

其中 \(\hat{y}_i\) 是类别的 one-hot 向量，\(\text{IoU}(\hat{b}_i, b_i^{gt})\) 是预测框与 GT 的 IoU。这样，分类分数被约束为同时反映分类正确性和定位质量。

推理时，选择 top-300 个分类分数最高的特征作为解码器查询。由于训练中已将 IoU 信息注入分类分数，高分类分数自然对应高定位质量，从而实现不确定性最小化。

> 💡 **效果**：不确定性最小查询选择使高分类分数（>0.5）特征的比例从 0.35% 提升至 0.82%，高 IoU（>0.5）特征的比例从 0.30% 提升至 0.67%，最终带来 +0.8% AP 的提升（48.7% vs 47.9%）。

##### 5. 灵活速度调节

RT-DETR 的 Transformer 解码器由多层堆叠组成（默认 6 层），每层独立输出预测结果。作者发现相邻解码器层的精度差异随层数增加而递减：

| 解码器层 ID | Det4 AP | Det5 AP | Det6 AP | 延迟 (ms) |
|------------|---------|---------|---------|-----------|
| 6 | - | - | 53.1 | 9.3 |
| 5 | - | 52.9 | 53.0 | 8.8 |
| 4 | 52.7 | 52.7 | 52.7 | 8.3 |
| 3 | 52.4 | 52.3 | 52.4 | 7.9 |

> 💡 **实用价值**：使用第 5 层替代第 6 层推理仅损失 0.1% AP（53.0% vs 53.1%），但节省 0.5ms 延迟。这意味着部署时可根据实际延迟预算灵活选择解码器层数，无需重新训练模型。

##### 6. 核心实验结果

**与 YOLO 系列 L/X 模型对比**（COCO val2017, T4 GPU, TensorRT FP16）：

| 模型 | AP (%) | FPS | 参数量 (M) |
|------|--------|-----|-----------|
| YOLOv5-L | 49.0 | 68 | 46.5 |
| YOLOv6-L | 51.7 | 58 | 59.6 |
| YOLOv7-L | 51.4 | 60 | 36.9 |
| YOLOv8-L | 52.9 | 63 | 43.7 |
| **RT-DETR-R50** | **53.1** | **108** | **42** |
| YOLOv5-X | 50.7 | 49 | 86.7 |
| YOLOv7-X | 53.1 | 44 | 71.3 |
| YOLOv8-X | 53.9 | 46 | 68.2 |
| **RT-DETR-R101** | **54.3** | **74** | **76** |

**与端到端检测器对比**：

| 模型 | AP (%) | FPS | 加速比 |
|------|--------|-----|--------|
| DINO-Deformable-DETR-R50 | 50.9 | 5 | 1x |
| **RT-DETR-R50** | **53.1** | **108** | **21x** |

RT-DETR-R50 比 DINO-R50 快 **21 倍**，同时 AP 高出 **2.2%**。

**Objects365 预训练提升**：

| 模型 | 无预训练 AP | 预训练后 AP | 提升 |
|------|-----------|-----------|------|
| RT-DETR-R18 | 46.5 | 49.2 | +2.7 |
| RT-DETR-R50 | 53.1 | 55.3 | +2.2 |
| RT-DETR-R101 | 54.3 | 56.2 | +1.9 |

##### 7. 训练细节

```python
# RT-DETR 核心训练配置
config = {
    "optimizer": "AdamW",
    "base_lr": 1e-4,
    "backbone_lr": 1e-5,
    "weight_decay": 0.0001,
    "batch_size": 16,  # 4x V100 GPUs
    "epochs": 72,       # 6x configuration (6x12)
    "ema_decay": 0.9999,
    
    # 编码器
    "aifi_layers": 1,
    "ccff_repblocks": 3,
    "embed_dim": 256,
    "ffn_dim": 1024,
    "nheads": 8,
    "feature_scales": 3,  # S3, S4, S5
    
    # 解码器
    "decoder_layers": 6,
    "num_queries": 300,
    "decoder_npoints": 4,  # 可变形注意力采样点
    
    # 损失函数 (匈牙利匹配 + 去噪训练)
    "class_cost_weight": 2.0,
    "bbox_cost_weight": 5.0,
    "giou_cost_weight": 2.0,
    "denoising_number": 200,
    "label_noise_ratio": 0.5,
    "box_noise_scale": 1.0,
}
```

##### 8. 局限性与展望

**局限性**：RT-DETR 在小目标检测上仍弱于最强 YOLO 模型。RT-DETR-R50 的 \(AP_S\) 比 YOLOv8-L 低 0.5%，RT-DETR-R101 的 \(AP_S\) 比 YOLOv7-X 低 0.9%。这是 DETR 系列的共性问题。

**展望**：RT-DETR 的解码器与其他大型 DETR 模型（如 DINO、Co-DETR）同构，因此可以利用高精度预训练的大型 DETR 模型对轻量级 RT-DETR 进行**知识蒸馏**，这是 RT-DETR 相对于 YOLO 系列的独特优势。

#### 🧪 练习题

```yaml
question: "RT-DETR 的高效混合编码器中，为什么只对最高层特征 S5 执行自注意力（AIFI），而不对所有尺度特征都执行？"
options:
  - "因为 S5 特征的分辨率最低，计算量最小，所以只是为了节省计算"
  - "因为高层特征包含丰富语义概念，自注意力可捕获概念间联系；低层特征主要是细粒度纹理，自注意力收益有限但开销巨大"
  - "因为低层特征已经通过骨干网络的残差连接获得了充分的全局信息"
  - "因为多尺度自注意力会导致梯度消失问题"
answer: 1
explain: "消融实验（变体 D→E）表明，仅对 S5 执行自注意力比对所有尺度都执行自注意力不仅更快（避免了低分辨率特征上昂贵的注意力计算），而且 AP 更高（+3.0%），因为高层特征的语义交互对检测最为关键，而低层特征的自注意力引入了噪声。"
```