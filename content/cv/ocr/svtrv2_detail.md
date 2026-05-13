### SVTRv2

```yaml
id: svtrv2
name: SVTRv2
full_name: "SVTRv2: CTC Beats Encoder-Decoder Models in Scene Text Recognition (CTC超越Encoder-Decoder)"
year: 2024
org: South China University of Technology
paper_url: https://arxiv.org/abs/2411.15858
category: improvement
parent: SVTR
motivation: "通过多尺度缩放、特征重排和语义引导模块增强CTC模型，使其超越Encoder-Decoder"
```

#### 📝 一句话总结

SVTRv2 提出多尺度缩放（MSR）、特征重排模块（FRM）和语义引导模块（SGM）三大创新组件，系统性解决了 CTC 模型在不规则文本识别上的短板，首次使纯 CTC 模型在 15 个场景中的 12 个超越了主流 Encoder-Decoder 方法。

#### 🎯 核心要点

- 提出 Multi-Size Resizing（MSR）：根据文本宽高比将图像缩放到多个预定义尺寸，避免不规则文本被拉伸变形
- 提出 Feature Rearrangement Module（FRM）：通过水平和垂直重排矩阵将 2D 特征图转换为 1D CTC 对齐序列，解决弯曲/旋转文本的对齐问题
- 提出 Semantic Guidance Module（SGM）：利用 CTC 解码的初步结果通过交叉注意力将语言上下文注入视觉特征，弥补 CTC 缺乏语言建模的缺陷
- 构建 U14M 基准：包含 1400 万真实文本图像的统一评测集，覆盖常规、弯曲、遮挡、长文本等 15 个场景
- SVTRv2-B 在 U14M 上达到 86.14% 准确率，比 MAERec 高 0.97% 且推理速度快 8 倍
- 三个模块可即插即用到其他视觉骨干（ResNet、FocalNet、ConvNeXtV2、ViT、SVTR）

#### 🔬 深入细节

![SVTRv2 整体架构图](https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x1.png)
*图：SVTRv2 整体框架，包含 Multi-Size Resizing、视觉编码器、Feature Rearrangement Module 和 Semantic Guidance Module*

##### 动机与背景

场景文本识别（STR）的主流方法分为两类：基于 CTC 的方法和基于 Encoder-Decoder（EDTR）的方法。CTC 方法具有推理速度快、天然支持长文本的优势，但在不规则文本（弯曲、旋转、遮挡）上表现远逊于 EDTR。作者分析了 CTC 模型的三大瓶颈：

1. **固定尺寸缩放导致变形**：将不同宽高比的文本图像统一缩放到固定尺寸（如 32×128），导致弯曲/竖排文本严重变形
2. **2D→1D 特征压缩丢失空间信息**：CTC 需要将 2D 特征图按列压缩为 1D 序列，对于非水平排列的文本会导致字符错位
3. **缺乏语言上下文建模**：CTC 逐位置独立预测，无法利用语言先验修正遮挡/模糊字符

##### 核心机制

**1. Multi-Size Resizing (MSR)**

MSR 根据输入图像的宽高比 \(r = W/H\) 将其分配到预定义的尺寸集合中：

$$S = \{(H_1, W_1), (H_2, W_2), \ldots, (H_N, W_N)\}$$

具体地，SVTRv2 定义了 4 个尺寸区间：
- \(R_1\)：宽高比 < 2，缩放到 64×128（适合竖排/方形文本）
- \(R_2\)：宽高比 ∈ [2, 4)，缩放到 48×160
- \(R_3\)：宽高比 ∈ [4, 8)，缩放到 32×256
- \(R_4\)：宽高比 ≥ 8，缩放到 32×384（适合长文本）

> 💡 关键：MSR 的核心思想是"让缩放适应文本，而非让文本适应缩放"。通过保持合理的宽高比，避免了弯曲文本被拉伸后字符粘连的问题。

![MSR 和 FRM 详细结构](https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x2.png)
*图：(a) Multi-Size Resizing 策略示意；(b) Feature Rearrangement Module 结构*

**2. Feature Rearrangement Module (FRM)**

FRM 解决的核心问题是：对于弯曲/旋转文本，简单的按列压缩会导致不同字符的特征混在同一列中。FRM 通过学习重排矩阵，将 2D 特征图中属于同一字符的特征聚合到正确的位置。

设视觉编码器输出特征图 \(F \in \mathbb{R}^{H' \times W' \times C}\)，FRM 包含两个子模块：

**水平重排（H-rearranging）**：学习水平方向的重排矩阵 \(M_h \in \mathbb{R}^{H' \times W' \times W'}\)：

$$F_h = M_h \cdot F$$

其中 \(M_h\) 对每一行学习一个 \(W' \times W'\) 的软置换矩阵，将水平方向上错位的特征重新对齐。

**垂直重排（V-rearranging）**：学习垂直方向的重排矩阵 \(M_v \in \mathbb{R}^{W' \times H' \times H'}\)：

$$F_v = M_v \cdot F_h$$

垂直重排将不同行中属于同一字符的特征聚合，最终通过列方向池化得到 1D 序列。

> ⚠️ 注意：FRM 的重排矩阵是通过网络预测的"软"矩阵（经 Softmax 归一化），而非硬置换，因此可以端到端训练。

```python
# FRM 伪代码
def FRM(feature_map):
    # feature_map: [B, H', W', C]
    
    # 水平重排：对每行学习 W'×W' 的重排矩阵
    M_h = predict_h_matrix(feature_map)  # [B, H', W', W']
    M_h = softmax(M_h, dim=-1)
    F_h = einsum('bhwk,bhkc->bhwc', M_h, feature_map)
    
    # 垂直重排：对每列学习 H'×H' 的重排矩阵
    M_v = predict_v_matrix(F_h)  # [B, W', H', H']
    M_v = softmax(M_v, dim=-1)
    F_v = einsum('bwhn,bhnc->bwhc', M_v, F_h.permute(0,2,1,3))
    
    # 列方向池化得到 1D 序列
    output = F_v.mean(dim=2)  # [B, W', C]
    return output
```

**3. Semantic Guidance Module (SGM)**

SGM 的目标是在不引入自回归解码器的前提下，为 CTC 模型注入语言上下文。其核心设计是一个"先粗后精"的两阶段预测：

**阶段一（CTC 初步解码）**：视觉特征经 CTC 头得到初步预测结果 \(\hat{Y}\)

**阶段二（语义增强）**：
1. 将 \(\hat{Y}\) 通过嵌入层得到语义查询 \(Q_s\)
2. 使用 Transformer 解码器中的交叉注意力，以 \(Q_s\) 为 Query、视觉特征为 Key/Value：

$$F_{enhanced} = \text{CrossAttn}(Q_s, F_{visual}, F_{visual}) + F_{visual}$$

3. 增强后的特征再次通过 CTC 头得到最终预测

> 💡 关键：SGM 的精妙之处在于利用 CTC 自身的初步预测作为"语义锚点"，通过交叉注意力让模型关注与语义相关的视觉区域，从而修正遮挡/模糊导致的错误。这种设计保持了 CTC 的并行解码优势，不引入自回归的速度开销。

训练时使用 Ground Truth 标签替代 CTC 预测作为语义输入（Teacher Forcing），损失函数为：

$$\mathcal{L} = \mathcal{L}_{CTC}^{(1)} + \mathcal{L}_{CTC}^{(2)}$$

其中 \(\mathcal{L}_{CTC}^{(1)}\) 和 \(\mathcal{L}_{CTC}^{(2)}\) 分别是两阶段的 CTC 损失。

##### 与传统方法的区别

| 特性 | 传统 CTC (SVTR) | Encoder-Decoder (MAERec) | SVTRv2 |
|------|----------------|--------------------------|--------|
| 解码方式 | CTC 并行 | 自回归逐字 | CTC 并行（两阶段） |
| 不规则文本处理 | 固定缩放 | 注意力机制隐式处理 | MSR + FRM 显式处理 |
| 语言建模 | 无 | 解码器隐式建模 | SGM 显式注入 |
| 长文本支持 | ✓（天然支持） | ✗（固定长度限制） | ✓（MSR 自适应） |
| 推理速度 | 快 | 慢（自回归） | 快（仅增加少量计算） |

##### 实验验证

消融实验证实了各模块的有效性：
- **MSR**：在高宽高比文本（R1）上提升 15.3%，R2 上提升 5.2%
- **FRM**：在遮挡文本（MO）上提升 2.46%，水平+垂直重排协同效果最佳
- **SGM**：在遮挡场景文本（OST）上提升 5.11%，U14M 整体提升 2.28%

![定性对比结果](https://ar5iv.labs.arxiv.org/html/2411.15858/assets/x4.png)
*图：SVTRv2 与其他方法在不规则和遮挡文本上的定性对比。绿色为正确识别，红色为错误识别*

#### 🧪 练习题

```yaml
question: "SVTRv2 中 Feature Rearrangement Module (FRM) 的主要作用是什么？"
options:
  - "通过数据增强生成更多弯曲文本训练样本"
  - "学习重排矩阵将2D特征中属于同一字符的特征对齐到正确的CTC位置"
  - "使用空间变换网络对输入图像进行矫正"
  - "通过注意力机制替代CTC解码器实现自回归预测"
answer: 1
explain: "FRM 通过学习水平和垂直方向的软重排矩阵，将弯曲/旋转文本的2D特征重新排列，使同一字符的特征聚合到正确的列位置，从而实现准确的CTC对齐。"
```