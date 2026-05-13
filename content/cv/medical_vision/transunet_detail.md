### TransUNet: Transformers Make Strong Encoders for Medical Image Segmentation

```yaml
id: transunet
name: TransUNet
full_name: "TransUNet: Transformers Make Strong Encoders for Medical Image Segmentation"
year: 2021
org: Johns Hopkins University
paper_url: https://arxiv.org/abs/2102.04306
category: segmentation
parent: unet
motivation: 将 Transformer 引入医学图像分割编码器，结合 CNN 局部特征与 Transformer 全局上下文建模能力，通过 U-Net 式跳跃连接恢复空间细节
```

#### 📝 一句话总结

TransUNet 提出了首个将 Vision Transformer 与 U-Net 结构融合的医学图像分割框架，通过 CNN-Transformer 混合编码器捕获全局上下文，并借助级联上采样器（CUP）与多尺度跳跃连接恢复精细空间细节，在多器官分割和心脏分割任务上取得了当时的最优性能。

#### 🎯 核心要点

- **CNN-Transformer 混合编码器**：先用 ResNet-50 提取多尺度特征图，再将 CNN 特征图切分为 patch 序列送入 12 层 ViT，兼顾局部纹理与全局语义
- **级联上采样器（Cascaded Upsampler, CUP）**：由多个"2× 上采样 + 3×3 卷积 + ReLU"块级联组成，逐步将 Transformer 编码的低分辨率特征恢复至原始分辨率
- **U-Net 式跳跃连接**：在 CUP 的 1/2、1/4、1/8 三个分辨率尺度上引入跳跃连接，将 CNN 编码器的高分辨率特征与上采样特征融合，显著提升边界精度
- **基准数据集**：Synapse 多器官 CT 分割（8 类器官，30 例腹部 CT）和 ACDC 心脏 MRI 分割（LV/RV/MYO，100 例）
- **ImageNet 预训练**：所有 Transformer 和 ResNet-50 骨干均使用 ImageNet-21k 预训练权重初始化
- **性能**：Synapse 数据集上 DSC 77.48%（224×224 输入）/ 84.36%（512×512 输入），ACDC 数据集上 DSC 89.71%，均超越同期 CNN 方法

#### 🔬 深入细节

##### 架构总览

![TransUNet 架构图](https://ar5iv.labs.arxiv.org/html/2102.04306/assets/x1.png)
*图：TransUNet 整体框架。(a) Transformer 层结构（MSA + MLP + 残差连接）；(b) 完整的 TransUNet 架构，包含 CNN-Transformer 混合编码器、级联上采样器（CUP）和多尺度跳跃连接。*

##### 算法伪代码

```python
# TransUNet 前向传播伪代码
def forward(x):
    # x: [B, C, H, W], 例如 [B, 3, 224, 224]
    
    # ===== 编码阶段 =====
    # Step 1: CNN 特征提取 (ResNet-50 前三个 stage)
    f1 = resnet_stage1(x)    # [B, 64,  H/2,  W/2]   — 1/2 分辨率
    f2 = resnet_stage2(f1)   # [B, 256, H/4,  W/4]   — 1/4 分辨率
    f3 = resnet_stage3(f2)   # [B, 512, H/8,  W/8]   — 1/8 分辨率
    
    # Step 2: Patch Embedding (在 CNN 特征图上切 1×1 patch)
    # 将 f3 展平为序列: [B, (H/16)*(W/16), D]
    z0 = linear_proj(flatten(f3)) + pos_embedding  # [B, N, D], N=196, D=768
    
    # Step 3: Transformer 编码 (12 层)
    for l in range(L):
        z = z + MSA(LayerNorm(z))     # 多头自注意力 + 残差
        z = z + MLP(LayerNorm(z))     # 前馈网络 + 残差
    # z_L: [B, N, D]
    
    # ===== 解码阶段 (CUP) =====
    # Step 4: reshape 回 2D 特征图
    h = reshape(z_L, [B, D, H/16, W/16])  # [B, 768, 14, 14]
    
    # Step 5: 级联上采样 + 跳跃连接
    h = upsample_block(h)                  # → [B, 512, 28, 28]  (1/8)
    h = concat(h, f3) → conv              # 跳跃连接 @ 1/8
    h = upsample_block(h)                  # → [B, 256, 56, 56]  (1/4)
    h = concat(h, f2) → conv              # 跳跃连接 @ 1/4
    h = upsample_block(h)                  # → [B, 128, 112, 112] (1/2)
    h = concat(h, f1) → conv              # 跳跃连接 @ 1/2
    h = upsample_block(h)                  # → [B, 64, 224, 224]  (1/1)
    
    # Step 6: 分割头
    output = conv_1x1(h)                   # [B, num_classes, H, W]
    return output
```

##### 动机与背景

医学图像分割是临床诊断和治疗规划的基础任务。U-Net 凭借对称编码器-解码器结构和跳跃连接成为事实标准，但其核心构建块——卷积操作——具有固有的局部感受野限制，难以显式建模长程依赖关系。这在面对器官形状、纹理和大小存在较大个体差异的场景时尤为突出，例如腹部多器官分割中的胰腺（形状高度不规则）和胆囊（大小变化大）。

Vision Transformer (ViT) 通过全局自注意力机制天然具备长程依赖建模能力，但直接将 ViT 用于分割存在严重问题：ViT 将输入视为 1D 序列，在所有阶段都聚焦于全局上下文建模，输出的特征分辨率极低（如 14×14），缺乏精细的空间定位信息。简单的上采样无法有效恢复这些细节，导致分割结果粗糙。

> 💡 **核心洞察**：Transformer 擅长全局语义建模但缺乏空间细节，CNN 擅长提取局部纹理但缺乏全局视野——TransUNet 通过混合架构将两者优势互补。

##### CNN-Transformer 混合编码器

TransUNet 的编码器分为两部分：

**1. CNN 特征提取器**：使用 ResNet-50 的前三个 stage 作为特征提取器，将输入图像 \(\mathbf{x} \in \mathbb{R}^{H \times W \times C}\) 逐步降采样，生成 1/2、1/4、1/8 分辨率的多尺度特征图。这些中间特征图保留了丰富的局部纹理和边界信息，将在解码阶段通过跳跃连接被复用。

**2. Transformer 编码器**：在 CNN 特征图（1/8 分辨率，经 ResNet-50 stage3 后进一步处理到 1/16）上进行 patch embedding。不同于原始 ViT 直接在原图上切 16×16 的 patch，TransUNet 在 CNN 特征图上切 1×1 的 patch，这等效于在原图上使用 16×16 的感受野。每个 patch 通过线性投影映射到 \(D\) 维嵌入空间，并加上可学习的位置编码：

$$\mathbf{z}_0 = [\mathbf{x}_p^1 \mathbf{E};\, \mathbf{x}_p^2 \mathbf{E};\, \cdots;\, \mathbf{x}_p^N \mathbf{E}] + \mathbf{E}_{pos}$$

其中 \(\mathbf{E} \in \mathbb{R}^{(P^2 \cdot C) \times D}\) 为投影矩阵，\(\mathbf{E}_{pos} \in \mathbb{R}^{N \times D}\) 为位置编码，\(N = \frac{HW}{P^2}\) 为序列长度。

随后，嵌入序列经过 \(L=12\) 层 Transformer 编码器，每层包含多头自注意力（MSA）和多层感知机（MLP），均带有 LayerNorm 和残差连接：

$$\mathbf{z}'_\ell = \text{MSA}(\text{LN}(\mathbf{z}_{\ell-1})) + \mathbf{z}_{\ell-1}$$

$$\mathbf{z}_\ell = \text{MLP}(\text{LN}(\mathbf{z}'_\ell)) + \mathbf{z}'_\ell$$

选择混合编码器而非纯 Transformer 的原因有二：（1）CNN 中间层提供了解码阶段所需的高分辨率特征；（2）实验表明混合编码器性能优于纯 Transformer 编码器（DSC 71.29% vs 67.86%）。

##### 级联上采样器（CUP）与跳跃连接

Transformer 编码器输出 \(\mathbf{z}_L \in \mathbb{R}^{\frac{HW}{P^2} \times D}\)，首先 reshape 为 2D 特征图 \(\frac{H}{P} \times \frac{W}{P} \times D\)（如 14×14×768）。

**CUP** 由多个上采样块级联组成，每个块依次执行：2× 双线性上采样 → 3×3 卷积 → ReLU。通过 4 个这样的块，特征图从 14×14 逐步恢复到 224×224。

**跳跃连接** 在 CUP 的前三个上采样步骤中引入，分别在 1/8（28×28）、1/4（56×56）、1/2（112×112）三个分辨率尺度上，将 CNN 编码器对应层的特征图与上采样特征拼接后通过卷积融合。这一设计直接借鉴了 U-Net 的核心思想。

> ⚠️ **关键消融发现**：跳跃连接的数量对性能影响显著。0 个跳跃连接（即 R50-ViT-CUP）DSC 为 71.29%，1 个跳跃连接提升至约 74%，3 个跳跃连接达到 77.48%。小器官（主动脉、胆囊、胰腺）的提升尤为明显，因为这些器官更依赖精细的边界信息。

##### 与传统方法的对比

论文通过系统的消融实验揭示了各组件的贡献：

| 配置 | 编码器 | 解码器 | 跳跃连接 | DSC (%) | HD (mm) |
|------|--------|--------|----------|---------|---------|
| ViT-None | ViT | 直接上采样 | 无 | 61.50 | 39.61 |
| ViT-CUP | ViT | CUP | 无 | 67.86 | 36.11 |
| R50-ViT-CUP | R50+ViT | CUP | 无 | 71.29 | 32.87 |
| **TransUNet** | **R50+ViT** | **CUP** | **3 个** | **77.48** | **31.69** |
| R50-U-Net | R50 | U-Net 解码器 | 有 | 74.68 | 36.87 |
| R50-AttnUNet | R50 | AttnUNet 解码器 | 注意力门控 | 75.57 | 36.97 |

从表中可以看出：（1）CUP 比直接上采样提升 6.36% DSC；（2）混合编码器比纯 ViT 再提升 3.43%；（3）跳跃连接带来最后 6.19% 的关键提升，使 TransUNet 超越所有纯 CNN 方法。

##### 训练细节

- **优化器**：SGD，学习率 0.01，动量 0.9，权重衰减 1e-4
- **输入分辨率**：默认 224×224，patch size 16×16，序列长度 196
- **预训练**：ViT 和 ResNet-50 均使用 ImageNet-21k 预训练
- **数据增强**：随机旋转和翻转
- **推理**：3D 体积逐切片推理，2D 预测堆叠重建 3D 结果
- **硬件**：单张 NVIDIA RTX 2080Ti

##### 其他消融发现

- **输入分辨率**：从 224×224 提升到 512×512，DSC 从 77.48% 提升至 84.36%（+6.88%），但计算代价显著增加
- **Patch 大小**：patch size 从 32→16→8，DSC 从 76.99%→77.48%→77.83%，更小的 patch（更长的序列）使 Transformer 能编码更复杂的依赖关系
- **模型规模**：Large 模型（24 层，D=1024）比 Base 模型（12 层，D=768）DSC 高约 1%（78.52% vs 77.48%）
- **跳跃连接中的 Transformer**：在 1/8 分辨率的跳跃连接中加入轻量 Transformer，额外提升 1.4% DSC

#### 🧪 练习题

```yaml
question: "TransUNet 相比直接使用 ViT 进行分割（ViT-None）的核心改进是什么？"
options:
  - "使用更大的 Transformer 模型（Large 替代 Base）"
  - "引入 CNN-Transformer 混合编码器 + 级联上采样器 + U-Net 式跳跃连接"
  - "将 patch size 从 16 减小到 8 以获得更长的序列"
  - "使用更高分辨率的 512×512 输入图像"
answer: 1
explain: "TransUNet 的三大核心改进是：(1) 用 ResNet-50 + ViT 混合编码器替代纯 ViT，保留多尺度 CNN 特征；(2) 用级联上采样器（CUP）替代直接上采样，逐步恢复分辨率；(3) 引入 U-Net 式跳跃连接融合高分辨率特征。这三者共同将 DSC 从 61.50% 提升至 77.48%。"
```