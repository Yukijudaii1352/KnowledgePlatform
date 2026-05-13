### ViViT: A Video Vision Transformer

```yaml
id: vivit
name: "ViViT"
full_name: "视频视觉Transformer (Video Vision Transformer)"
year: "2021"
org: "Google Research"
paper_url: "https://arxiv.org/abs/2103.15691"
category: "video_understanding"
parent: "ViT"
motivation: "将纯Transformer架构从图像扩展到视频分类，提出多种时空因子化方案平衡精度与效率"
```

#### 📝 一句话总结

ViViT 提出了四种基于纯 Transformer 的视频分类模型变体，通过不同粒度的时空注意力因子化策略，在大幅降低计算复杂度的同时实现了五个主流视频基准上的 SOTA 性能。

#### 🎯 核心要点

- 提出 4 种时空注意力模型变体：联合时空注意力(Model 1)、因子化编码器(Model 2)、因子化自注意力(Model 3)、因子化点积注意力(Model 4)
- 两种视频 token 化方法：均匀帧采样(Uniform frame sampling) 和 管状嵌入(Tubelet embedding, 3D卷积)
- 管状嵌入的"中心帧初始化"策略优于传统的滤波器膨胀(filter inflation)方法
- 从预训练 ViT 有效初始化视频模型：位置嵌入时间维重复 + 管状嵌入中心帧初始化
- 针对小数据集的正则化策略组合：随机深度 + RandAugment + 标签平滑 + Mixup（+5.3% on Epic Kitchens）
- 在 Kinetics 400/600、Epic Kitchens 100、Something-Something v2、Moments in Time 五个基准上达到 SOTA

#### 🔬 深入细节

![ViViT 模型架构总览](https://ar5iv.labs.arxiv.org/html/2103.15691v1/assets/x1.png)
*图：ViViT 的四种模型变体示意图。从左到右分别为：联合时空注意力、因子化编码器、因子化自注意力、因子化点积注意力。*

```python
# ViViT 因子化编码器 (Model 2) 伪代码
def vivit_factorised_encoder(video, spatial_transformer, temporal_transformer):
    # Step 1: Tokenization - 提取 tubelet embeddings
    # video: [B, T, H, W, C] -> tubelets via 3D conv
    tokens = tubelet_embedding(video)  # [B, n_t, n_h*n_w, d]
    
    # Step 2: 空间编码器 - 独立处理每帧的空间token
    spatial_outputs = []
    for t in range(n_t):
        frame_tokens = tokens[:, t]  # [B, n_h*n_w, d]
        frame_tokens = prepend_cls(frame_tokens)
        encoded = spatial_transformer(frame_tokens)  # L_s layers
        spatial_outputs.append(encoded[:, 0])  # CLS token as frame repr
    
    # Step 3: 时间编码器 - 聚合帧级表示
    temporal_tokens = stack(spatial_outputs)  # [B, n_t, d]
    temporal_tokens = prepend_cls(temporal_tokens)
    output = temporal_transformer(temporal_tokens)  # L_t layers
    
    # Step 4: 分类
    return classify(output[:, 0])  # final CLS token
```

**动机与背景**

视频理解长期依赖 3D 卷积网络（如 I3D、SlowFast），但卷积的感受野有限且随深度线性增长，难以高效建模长程时空依赖。Vision Transformer (ViT) 在图像分类上展现了纯注意力架构的潜力，但直接将 ViT 扩展到视频面临严峻的计算挑战：对于 \(n_t\) 帧、每帧 \(n_h \times n_w\) 个 patch 的视频，联合注意力的复杂度为 \(O((n_t \cdot n_h \cdot n_w)^2)\)，这在实际视频长度下是不可接受的。

**核心机制：四种时空因子化策略**

**Model 1 — 联合时空注意力（Spatio-temporal attention）**

最直接的方案：将视频所有时空 token 拼接后送入标准 Transformer 编码器。每个 token 可以关注所有其他时空位置，建模能力最强但计算量最大：

$$\mathbf{y} = \text{MSA}(\text{LN}(\mathbf{z})) + \mathbf{z}, \quad \text{复杂度} = O((n_t \cdot n_h \cdot n_w)^2)$$

**Model 2 — 因子化编码器（Factorised encoder）**

将编码过程分为两个串联阶段：首先用空间 Transformer 独立编码每帧的空间 token，提取帧级 CLS 表示；然后用时间 Transformer 聚合所有帧的表示进行时序建模。

$$\mathbf{h}_s^i = \text{SpatialTransformer}(\mathbf{z}^i), \quad i = 1, \ldots, n_t$$
$$\mathbf{y} = \text{TemporalTransformer}([\mathbf{h}_s^1, \ldots, \mathbf{h}_s^{n_t}])$$

> 💡 关键：Model 2 将复杂度从 \(O((n_t \cdot n_s)^2)\) 降至 \(O(n_t \cdot n_s^2 + n_t^2)\)，其中 \(n_s = n_h \cdot n_w\)。实验显示仅需 \(L_t = 4\) 层时间 Transformer 即可达到饱和性能，推理速度比 Model 1 快 3.4 倍。

**Model 3 — 因子化自注意力（Factorised self-attention）**

在同一个 Transformer 编码器的每一层内，将多头自注意力分为两步：先计算空间注意力（同一时间步内的 token 互相关注），再计算时间注意力（同一空间位置跨时间步互相关注）：

$$\mathbf{a}_s = \text{MSA}_{\text{spatial}}(\text{LN}(\mathbf{z})), \quad \mathbf{y} = \text{MSA}_{\text{temporal}}(\text{LN}(\mathbf{a}_s))$$

**Model 4 — 因子化点积注意力（Factorised dot-product attention）**

最细粒度的因子化：在注意力头级别操作。将每层的注意力头分为两组，一半计算空间注意力，另一半计算时间注意力，最后拼接输出：

$$\text{Attention}_{\text{spatial}}(\mathbf{Q}_s, \mathbf{K}_s, \mathbf{V}_s), \quad \text{Attention}_{\text{temporal}}(\mathbf{Q}_t, \mathbf{K}_t, \mathbf{V}_t)$$
$$\mathbf{y} = \text{Concat}(\text{head}_s^1, \ldots, \text{head}_s^{N_h/2}, \text{head}_t^1, \ldots, \text{head}_t^{N_h/2}) \mathbf{W}_O$$

**Tokenization 与初始化**

两种 token 化方法：
1. **均匀帧采样**：从视频中均匀采样 \(n_t\) 帧，每帧独立用 2D 卷积（ViT 的 patch embedding）提取 token
2. **管状嵌入（Tubelet embedding）**：用 3D 卷积核 \(\mathbb{R}^{t \times h \times w}\) 直接从视频体中提取时空 token，可在 tokenization 阶段即融合时间信息

从 ViT 预训练权重初始化 3D 管状嵌入的三种策略：
- **滤波器膨胀**：将 2D 卷积核沿时间维复制并除以 \(t\)（77.6%）
- **中心帧初始化**：仅在中心时间位置放置 2D 权重，其余置零（**79.2%，最优**）
- **随机初始化**：仅随机初始化 3D 卷积（73.2%，最差）

> ⚠️ 注意：中心帧初始化优于滤波器膨胀 1.6%，这是因为它在训练初期保持了与 ViT 完全一致的行为（仅看中心帧），然后逐步学习时间信息。

**效率与精度权衡**

| 模型 | K400 Top-1 | FLOPs (×10⁹) | 参数量 (M) | 推理时间 (ms) |
|------|-----------|--------------|-----------|--------------|
| Model 1: 联合时空 | 80.0 | 455.2 | 88.9 | 58.9 |
| Model 2: 因子化编码器 | 78.8 | 284.4 | 115.1 | 17.4 |
| Model 3: 因子化自注意力 | 77.4 | 372.3 | 117.3 | 31.7 |
| Model 4: 因子化点积 | 76.3 | 277.1 | 88.9 | 22.9 |

Model 2 在精度仅损失 1.2% 的情况下，推理速度提升 3.4 倍，是最佳的精度-效率折中方案。

**SOTA 结果**

使用 ViViT-H/14x2 (JFT 预训练) 配合 Factorised Encoder，在 Kinetics 400 达到 **84.9%** Top-1，Kinetics 600 达到 **85.8%** Top-1，大幅超越此前基于 3D CNN 的方法（SlowFast: 79.8%）和同期 TimeSformer（82.2%）。

**与传统方法的区别**

与 3D CNN（I3D、SlowFast）相比：ViViT 通过全局自注意力在每一层即可建模任意距离的时空依赖，无需堆叠多层来扩大感受野。与同期 TimeSformer 相比：ViViT 提出了更多样化的因子化方案（尤其是 Model 2 的双编码器设计），并通过系统的正则化策略在小数据集上取得更好效果（SSv2 上超出 TimeSformer 2.9%）。

#### 🧪 练习题

```yaml
question: "ViViT 的因子化编码器(Model 2)相比联合时空注意力(Model 1)的主要优势是什么？"
options:
  - "精度更高，因为分开建模空间和时间更有效"
  - "推理速度提升约3.4倍，精度仅损失约1.2%"
  - "参数量更少，因此更容易训练"
  - "不需要预训练模型即可达到SOTA"
answer: 1
explain: "Model 2 将时空注意力分解为串联的空间编码器和时间编码器，复杂度从 O((n_t·n_s)²) 降至 O(n_t·n_s² + n_t²)，推理时间从58.9ms降至17.4ms（快3.4倍），而K400精度仅从80.0%降至78.8%。"
```