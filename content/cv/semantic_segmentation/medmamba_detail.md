### MedMamba (医学图像分割)

```yaml
id: medmamba
name: "MedMamba"
full_name: "MedMamba: Multi-scale deformable attention via state space models for robust medical image segmentation"
year: "2025"
org: "Chongqing University of Posts and Telecommunications"
paper_url: "https://doi.org/10.1016/j.bspc.2025.108363"
category: "medical_image_segmentation"
parent: "VMamba"
motivation: "将多尺度空间自适应注意力与状态空间模型结合，解决医学图像分割中多尺度结构、弱边界和类别不平衡三大挑战"
```

#### 📝 一句话总结

MedMamba 提出了一种融合多尺度协同感知编码器（MSCP）与全局-变形协同解码器（GDCD）的 UNet 架构，通过状态空间模型（SSM/Mamba）实现线性复杂度的全局建模，并结合 BceDiceFocal 复合损失函数，在超声肾脏和眼底血管分割任务上取得了优于现有方法的性能。

#### 🎯 核心要点

- **编码器 MSCP 模块**：多分支卷积（3×1、1×3、3×3、5×5 四种核）捕获多尺度空间特征，配合 scSE（空间-通道挤压激励）机制自适应重标定特征重要性
- **解码器 GDCD 模块**：双分支设计融合 Local-SS2D（局部状态空间 2D 扫描）和 Conv-SS2D（卷积增强状态空间 2D 扫描），无需可变形卷积即可实现对复杂解剖边界的灵活建模
- **复合损失函数 BceDiceFocal**：组合 BCE（像素级精度）、Dice（区域级重叠）和 Focal Loss（难样本聚焦），自适应加权应对严重类别不平衡
- **骨干网络**：基于 VMamba 的 SSM 视觉模型，具有线性计算复杂度的全局依赖建模能力
- **验证数据集**：CT2USforKidneySeg（超声肾脏分割）和 FIVES（眼底血管分割），覆盖不同模态和分割难度
- **整体架构**：保留 UNet 编码器-解码器框架的结构优势，实现全局建模与局部感知的统一

#### 🔬 深入细节

##### 架构总览

MedMamba 采用经典的 UNet 编码器-解码器结构，在编码器端引入 MSCP 模块增强多尺度特征提取，在解码器端引入 GDCD 模块实现全局-局部协同解码。整体设计遵循"三重增强策略"：多尺度感知、全局-变形协同解码、任务感知复合损失。

> 💡 关键：MedMamba 的核心创新不在于引入全新的基础算子，而在于将 SSM 的全局建模能力与多尺度卷积的局部感知能力进行深度融合，形成互补。

##### 背景与动机

医学图像分割面临三大核心挑战：

1. **多尺度解剖结构**：从粗粒度器官到细粒度血管，需要同时建模全局语义和局部细节
2. **弱边界与低信噪比**：超声、眼底等模态中，结构与噪声背景难以区分
3. **严重类别不平衡**：目标区域仅占图像的极小比例，标准学习目标表现不佳

传统 CNN 受限于局部感受野，难以捕获长程依赖；Transformer 虽能全局建模，但自注意力的二次复杂度 \(O(n^2)\) 在高分辨率医学图像上计算代价过高。状态空间模型（SSM）以线性复杂度 \(O(n)\) 实现全局依赖建模，为医学图像分割提供了新的技术路径。

##### 状态空间模型（SSM）基础

MedMamba 基于 Mamba/VMamba 的选择性状态空间模型。SSM 的连续形式为：

$$h'(t) = Ah(t) + Bx(t)$$
$$y(t) = Ch(t)$$

其中 \(A \in \mathbb{R}^{N \times N}\) 为状态矩阵，\(B \in \mathbb{R}^{N \times 1}\) 和 \(C \in \mathbb{R}^{N \times 1}\) 为投影参数。通过零阶保持（ZOH）离散化，引入时间尺度参数 \(\delta\)：

$$\bar{A} = \exp(\delta A)$$
$$\bar{B} = (\delta A)^{-1}(\exp(\delta A) - I) \cdot \delta B$$

Mamba 的关键创新在于使参数 \(B\)、\(C\)、\(\delta\) 依赖于输入，实现选择性信息过滤，同时通过硬件感知的并行扫描算法保持高效计算。

##### MSCP 模块（编码器 - Multi-Scale Collaborative Perception）

MSCP 模块的设计动机是：不同尺度的解剖结构需要不同大小的感受野来有效捕获。

**多分支卷积设计**：
- **3×1 卷积**：捕获水平方向的细长结构（如血管横截面）
- **1×3 卷积**：捕获垂直方向的细长结构
- **3×3 卷积**：标准局部特征提取
- **5×5 卷积**：较大感受野，捕获更粗粒度的上下文

四个分支的输出进行融合，形成多尺度特征表示。

**scSE 注意力机制**：
在多分支卷积之后，应用空间-通道挤压激励（spatial-channel Squeeze-and-Excitation）机制：

$$\text{scSE}(F) = \max(\text{cSE}(F), \text{sSE}(F))$$

- **cSE（通道挤压激励）**：通过全局平均池化→全连接层→Sigmoid 生成通道权重，强调信息丰富的通道
- **sSE（空间挤压激励）**：通过 1×1 卷积→Sigmoid 生成空间权重图，强调关键空间位置

> 💡 关键：scSE 的双路径设计使模型能够同时在通道维度和空间维度上进行自适应特征选择，特别适合强调细粒度结构（如薄血管、模糊病灶边界）。

```python
# MSCP 模块伪代码
class MSCP(nn.Module):
    def __init__(self, in_channels, out_channels):
        self.branch_3x1 = Conv2d(in_channels, out_channels, kernel_size=(3, 1), padding=(1, 0))
        self.branch_1x3 = Conv2d(in_channels, out_channels, kernel_size=(1, 3), padding=(0, 1))
        self.branch_3x3 = Conv2d(in_channels, out_channels, kernel_size=(3, 3), padding=1)
        self.branch_5x5 = Conv2d(in_channels, out_channels, kernel_size=(5, 5), padding=2)
        self.scse = scSE(out_channels)
    
    def forward(self, x):
        f1 = self.branch_3x1(x)
        f2 = self.branch_1x3(x)
        f3 = self.branch_3x3(x)
        f4 = self.branch_5x5(x)
        fused = f1 + f2 + f3 + f4  # 多尺度特征融合
        out = self.scse(fused)      # 自适应特征重标定
        return out
```

##### GDCD 模块（解码器 - Global-Deformation Collaborative Decoding）

GDCD 模块的名称中"Deformation"并非指使用可变形卷积（Deformable Convolution），而是指其对多样化目标形状（如肿瘤、器官）的灵活适应能力。

**双分支设计**：

1. **Local-SS2D 分支**：局部状态空间 2D 扫描
   - 在局部窗口内执行 SS2D（Selective Scan 2D）操作
   - 捕获局部几何细节和边界信息
   - 保持对细粒度结构的敏感性

2. **Conv-SS2D 分支**：卷积增强状态空间 2D 扫描
   - 将卷积特征与 SS2D 全局扫描相结合
   - 提供更强的全局语义上下文
   - 增强对大尺度结构的理解

两个分支的输出通过动态融合机制进行整合，实现局部细节与全局上下文的互补：

```python
# GDCD 模块伪代码
class GDCD(nn.Module):
    def __init__(self, dim):
        self.local_ss2d = LocalSS2D(dim)   # 局部窗口内的选择性扫描
        self.conv_ss2d = ConvSS2D(dim)     # 卷积增强的选择性扫描
        self.fusion = DynamicFusion(dim)    # 动态融合层
    
    def forward(self, x, skip_connection):
        x = torch.cat([x, skip_connection], dim=1)
        local_feat = self.local_ss2d(x)    # 局部几何细节
        global_feat = self.conv_ss2d(x)    # 全局语义上下文
        out = self.fusion(local_feat, global_feat)  # 动态融合
        return out
```

> ⚠️ 注意：GDCD 的"变形"能力来自 Local-SS2D 和 Conv-SS2D 的堆叠融合机制，而非传统的可变形卷积算子。这种设计在保持计算效率的同时，实现了对复杂解剖边界的精确重建。

##### SS2D（Selective Scan 2D）机制

SS2D 是 VMamba 提出的将 1D 选择性扫描扩展到 2D 图像的关键机制。它通过四个方向的扫描路径（左→右、右→左、上→下、下→上）将 2D 特征图展平为 1D 序列，分别执行选择性状态空间扫描后再合并：

$$\text{SS2D}(X) = \text{Merge}(\text{SSM}(\text{Scan}_1(X)), \text{SSM}(\text{Scan}_2(X)), \text{SSM}(\text{Scan}_3(X)), \text{SSM}(\text{Scan}_4(X)))$$

这使得模型能够以线性复杂度捕获图像中任意两点之间的长程依赖关系。

##### 复合损失函数 BceDiceFocal

针对医学图像分割中的类别不平衡和边界模糊问题，MedMamba 设计了三重复合损失：

$$\mathcal{L}_{total} = \lambda_1 \mathcal{L}_{BCE} + \lambda_2 \mathcal{L}_{Dice} + \lambda_3 \mathcal{L}_{Focal}$$

各分量的作用：

- **BCE Loss**（像素级精度）：

$$\mathcal{L}_{BCE} = -\frac{1}{N}\sum_{i=1}^{N}[y_i \log(\hat{y}_i) + (1-y_i)\log(1-\hat{y}_i)]$$

- **Dice Loss**（区域级重叠）：

$$\mathcal{L}_{Dice} = 1 - \frac{2\sum_{i=1}^{N} y_i \hat{y}_i + \epsilon}{\sum_{i=1}^{N} y_i + \sum_{i=1}^{N} \hat{y}_i + \epsilon}$$

- **Focal Loss**（难样本聚焦）：

$$\mathcal{L}_{Focal} = -\frac{1}{N}\sum_{i=1}^{N} \alpha_t (1-p_t)^\gamma \log(p_t)$$

> 💡 关键：三种损失的互补性——BCE 提供稳定的像素级梯度，Dice 直接优化分割指标（对类别不平衡鲁棒），Focal Loss 使模型聚焦于难以分割的边界区域和小目标。

##### 与现有方法的对比

| 特性 | U-Mamba | VM-UNet | SegMamba | **MedMamba** |
|------|---------|---------|----------|-------------|
| 编码器 | SSM+CNN 混合 | 纯 VSS Block | SSM | MSCP + VMamba |
| 解码器 | CNN | VSS Block | CNN | GDCD (Local-SS2D + Conv-SS2D) |
| 多尺度设计 | ✗ | ✗ | ✗ | ✓ (四种卷积核) |
| 注意力机制 | ✗ | ✗ | ✗ | scSE |
| 复合损失 | ✗ | ✗ | ✗ | BceDiceFocal |
| 计算复杂度 | 线性 | 线性 | 线性 | 线性 |

MedMamba 的主要优势在于：
1. 编码器端的多尺度感知能力（MSCP）弥补了纯 SSM 模型缺乏显式多尺度建模的不足
2. 解码器端的双分支 SS2D 设计（GDCD）在保持全局建模的同时增强了局部几何适应性
3. 复合损失函数从像素、区域、难样本三个层面综合优化分割质量

##### 实验验证

MedMamba 在两个公开数据集上进行了验证：

- **CT2USforKidneySeg**：超声肾脏分割数据集，挑战在于超声图像的散斑噪声和低信噪比
- **FIVES**：眼底血管分割数据集，挑战在于血管的细长结构和弱对比度

实验结果表明 MedMamba 在分割精度、对弱结构的敏感性和跨模态泛化能力方面均优于现有最先进方法。

#### 🧪 练习题

```yaml
question: "MedMamba 的 GDCD 解码模块中'Deformation'能力的实现方式是什么？"
options:
  - "使用可变形卷积（Deformable Convolution）学习偏移量"
  - "通过 Local-SS2D 和 Conv-SS2D 的动态融合实现形状自适应"
  - "使用空间变换网络（STN）进行几何变换"
  - "通过注意力机制动态调整卷积核形状"
answer: 1
explain: "GDCD 的'变形'能力并非来自可变形卷积，而是通过 Local-SS2D（局部状态空间扫描）和 Conv-SS2D（卷积增强状态空间扫描）的双分支动态融合机制实现对多样化目标形状的灵活适应。"
```