### PSPNet

```yaml
id: pspnet
name: PSPNet
full_name: "金字塔场景解析网络 (Pyramid Scene Parsing Network)"
year: "2016"
org: "CUHK & SenseTime"
paper_url: "https://arxiv.org/abs/1612.01105"
category: "semantic_segmentation"
parent: "FCN"
motivation: "通过金字塔池化模块聚合多尺度全局上下文信息，解决场景解析中局部感受野不足导致的类别混淆问题"
```

#### 📝 一句话总结

PSPNet 提出金字塔池化模块（Pyramid Pooling Module），通过多尺度全局先验信息聚合解决了场景解析中因缺乏全局上下文而导致的类别误分类问题，在 ADE20K、PASCAL VOC 2012 和 Cityscapes 三大基准上取得当时最优性能。

#### 🎯 核心要点

- 金字塔池化模块（PPM）：4 级自适应池化（1×1, 2×2, 3×3, 6×6）捕获多尺度全局上下文
- 骨干网络：采用 dilated ResNet（output stride=8），在不损失分辨率的前提下扩大感受野
- 深度监督（Auxiliary Loss）：在 ResNet 第 4 阶段（res4b22）添加辅助分类头，权重 0.4，加速收敛
- 多尺度测试 + 水平翻转数据增强用于推理阶段
- ADE20K 2016 场景解析挑战赛冠军（mIoU 57.21%）
- PASCAL VOC 2012 测试集 mIoU 85.4%，Cityscapes 测试集 mIoU 80.2%

#### 🔬 深入细节

![PSPNet 架构总览](https://ar5iv.labs.arxiv.org/html/1612.01105/assets/x3.png)
*图：PSPNet 整体架构。输入图像经 CNN 提取特征图后，通过金字塔池化模块聚合多尺度上下文，最终拼接生成像素级预测。*

##### 算法伪代码

```python
# PSPNet 前向传播伪代码
def forward(image):
    # Step 1: 骨干网络提取特征 (dilated ResNet, output_stride=8)
    feature_map = dilated_resnet(image)  # H/8 × W/8 × 2048
    
    # Step 2: 金字塔池化模块 (PPM)
    pool_1x1 = AdaptiveAvgPool2d(1)(feature_map)   # 1×1×2048 → Conv1x1 → 1×1×512
    pool_2x2 = AdaptiveAvgPool2d(2)(feature_map)   # 2×2×2048 → Conv1x1 → 2×2×512
    pool_3x3 = AdaptiveAvgPool2d(3)(feature_map)   # 3×3×2048 → Conv1x1 → 3×3×512
    pool_6x6 = AdaptiveAvgPool2d(6)(feature_map)   # 6×6×2048 → Conv1x1 → 6×6×512
    
    # 上采样回原特征图尺寸并拼接
    context = Concat([
        feature_map,                          # 2048-d
        Upsample(Conv1x1(pool_1x1)),         # 512-d
        Upsample(Conv1x1(pool_2x2)),         # 512-d
        Upsample(Conv1x1(pool_3x3)),         # 512-d
        Upsample(Conv1x1(pool_6x6))          # 512-d
    ])  # 总计 4096-d
    
    # Step 3: 最终分类
    output = Conv3x3_BN_ReLU(context)  # 降维到 512
    prediction = Conv1x1(output)        # 输出 num_classes 通道
    return Upsample_8x(prediction)      # 上采样到原图尺寸
```

##### 动机与背景

场景解析（Scene Parsing）要求对图像中每个像素进行语义标注，是自动驾驶、机器人导航等应用的基础。基于 FCN 的方法虽然实现了端到端像素预测，但存在三个关键问题：

1. **关系不匹配（Mismatched Relationship）**：局部特征无法利用物体间的共现关系。例如，"船"常出现在"水"上方，但缺乏全局上下文时，网络可能将水面上的物体误判为"车"。
2. **类别混淆（Confusion Categories）**：外观相似的类别（如"田野"和"土地"）在局部区域难以区分，需要全局语义信息辅助判断。
3. **不显眼类别（Inconspicuous Classes）**：小尺寸物体（如路灯、标志牌）容易被周围大面积区域的特征淹没。

> 💡 关键：这三个问题的共同根源是**感受野不足**——即使 dilated convolution 扩大了理论感受野，网络仍然难以有效利用图像级别的全局信息。

##### 核心机制：金字塔池化模块（PPM）

PPM 的设计灵感来自空间金字塔池化（SPP），但目标不同：SPP 用于生成固定长度的特征向量，而 PPM 用于为每个像素注入多尺度全局上下文。

**四级池化的设计逻辑：**

$$\text{PPM}(F) = \text{Cat}\left[F,\; \text{Up}(f_1(P_1(F))),\; \text{Up}(f_2(P_2(F))),\; \text{Up}(f_3(P_3(F))),\; \text{Up}(f_4(P_4(F)))\right]$$

其中 \(P_n\) 为自适应平均池化（输出尺寸分别为 1×1, 2×2, 3×3, 6×6），\(f_n\) 为 1×1 卷积（降维至原通道数的 \(1/N\)，N=4 即 512 维），Up 为双线性上采样。

- **1×1 级别**：捕获全局平均信息（相当于全图统计先验）
- **2×2 级别**：粗粒度空间分区上下文
- **3×3 级别**：中等粒度区域上下文
- **6×6 级别**：细粒度局部区域上下文

> ⚠️ 注意：1×1 卷积的降维操作至关重要——它将每级池化的通道数从 2048 降至 512，确保拼接后的特征维度可控（4096 = 2048 + 512×4），避免全局上下文淹没原始局部特征。

##### 骨干网络：Dilated ResNet

PSPNet 使用预训练的 ResNet（101 或更深）作为骨干，并对最后两个 stage 进行 dilated（空洞）卷积改造：

- **原始 ResNet**：经过 5 次下采样，输出为 1/32 分辨率
- **Dilated 改造**：移除最后两个 stage 的下采样（stride=2→1），用 dilation rate=2 和 4 的空洞卷积补偿感受野损失
- **最终输出**：1/8 分辨率的特征图（60×60 for 473×473 输入）

这样既保持了较高的空间分辨率（有利于精细分割），又维持了足够大的感受野。

##### 深度监督训练策略

![辅助损失示意](https://ar5iv.labs.arxiv.org/html/1612.01105/assets/x4.png)
*图：深度监督策略。在 ResNet 第 4 阶段末尾（res4b22）添加辅助分类头。*

总损失函数为：

$$L = L_{\text{main}} + \alpha \cdot L_{\text{aux}}$$

其中 \(\alpha = 0.4\)。辅助损失作用于 res4b22 层的输出，通过额外的分类头（BN + ReLU + Conv1×1 + 交叉熵）产生梯度。这一设计：
- 缓解深层网络的梯度消失问题
- 为中间层提供直接的语义监督信号
- 推理时辅助分支被丢弃，不增加计算开销

##### 训练细节

- **学习率策略**：Poly 衰减，\(\text{lr} = \text{base\_lr} \times (1 - \frac{\text{iter}}{\text{max\_iter}})^{0.9}\)，初始学习率 0.01
- **优化器**：SGD，momentum=0.9，weight decay=0.0001
- **Batch Size**：16（多 GPU 同步 BN）
- **数据增强**：随机缩放（0.5~2.0）、随机裁剪（473×473）、随机水平翻转
- **推理增强**：多尺度测试 + 水平翻转，取平均

##### 与传统方法的区别

| 方法 | 上下文建模方式 | 局限性 |
|------|--------------|--------|
| FCN | 仅依赖卷积感受野 | 理论感受野远大于有效感受野 |
| DeepLab (ASPP) | 多个 dilation rate 的并行空洞卷积 | 仍是局部操作，无法获取全局信息 |
| ParseNet | 全局平均池化 | 仅单一尺度全局特征，缺乏层次性 |
| **PSPNet (PPM)** | **多尺度全局池化 + 拼接** | **兼顾全局统计与多粒度空间布局** |

> 💡 关键：PSPNet 的核心优势在于 PPM 以极低的计算代价（几个池化 + 1×1 卷积）实现了从全局到局部的多尺度上下文聚合，且通过拼接（而非相加）保留了原始特征的完整性。

#### 🧪 练习题

```yaml
question: "PSPNet 金字塔池化模块中，1×1 卷积的主要作用是什么？"
options:
  - "增加非线性表达能力"
  - "将池化后的特征通道数降维，防止全局上下文淹没局部特征"
  - "替代 3×3 卷积以减少计算量"
  - "实现跨通道的特征融合以提升分类精度"
answer: 1
explain: "PPM 中每级池化后接 1×1 卷积将 2048 维降至 512 维（原通道数的 1/N），确保拼接后全局上下文与原始局部特征的权重平衡。"
```