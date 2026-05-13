### ConvNeXt V2

```yaml
id: convnext_v2
name: ConvNeXt V2
full_name: "ConvNeXt V2: Co-designing and Scaling ConvNets with Masked Autoencoders"
year: 2023
org: Meta AI (FAIR)
paper_url: https://arxiv.org/abs/2301.00808
category: image_classification
parent: ConvNeXt
motivation: "通过协同设计自监督学习框架(FCMAE)与模型架构改进(GRN层)，使纯卷积网络首次成功适配掩码图像建模预训练，在多种模型尺寸和下游任务上超越监督基线"
```

#### 📝 一句话总结

ConvNeXt V2 提出了全卷积掩码自编码器（FCMAE）预训练框架和全局响应归一化（GRN）层，通过协同设计解决了卷积网络在掩码图像建模中的特征坍塌问题，首次在从 3.7M 到 650M 参数的广泛模型谱系中验证了掩码预训练对 ConvNet 的有效性，最终以纯卷积架构在 ImageNet 上达到 88.9% 的 SOTA 精度。

#### 🎯 核心要点

- **FCMAE 预训练框架**：基于稀疏卷积的全卷积掩码自编码器，使 ConvNet 能高效进行掩码图像建模预训练
- **GRN（全局响应归一化）层**：通过全局特征聚合、归一化和校准三步操作增强通道间特征竞争，解决自监督预训练中的特征坍塌问题
- **协同设计理念**：FCMAE + GRN 单独使用效果有限，组合使用产生显著协同增益（V2-B: 84.6% vs V1-B supervised: 83.8%）
- **8 种模型尺寸**：Atto(3.7M)、Femto(5.2M)、Pico(9.1M)、Nano(15.6M)、Tiny(28M)、Base(89M)、Large(198M)、Huge(659M)
- **全面的下游任务验证**：ImageNet 分类（88.9%）、COCO 检测/分割（AP^box 55.7）、ADE20K 语义分割（mIoU 57.0）
- **稀疏卷积编码**：使用 MinkowskiEngine 的 submanifold sparse convolution 实现对可见 patch 的高效编码，避免掩码信息泄露

#### 🔬 深入细节

![ConvNeXt V2 模型缩放与性能对比](https://ar5iv.labs.arxiv.org/html/2301.00808/assets/x1.png)
*图1：ConvNeXt V2 + FCMAE 在所有模型尺寸上均超越监督训练基线，展示了强大的模型缩放能力*

![FCMAE 框架示意图](https://ar5iv.labs.arxiv.org/html/2301.00808/assets/figs/convmae_teaser.png)
*图2：FCMAE 预训练框架概览——稀疏卷积编码器处理可见 patch，轻量解码器重建被掩码像素*

![特征激活可视化](https://ar5iv.labs.arxiv.org/html/2301.00808/assets/figs/feat_act_qual.png)
*图3：特征激活对比——无 GRN 时出现严重特征坍塌（多通道激活相同），加入 GRN 后通道间呈现多样化响应*

##### 算法伪代码

```python
# FCMAE 预训练流程
def fcmae_pretrain(image, model, decoder, mask_ratio=0.6):
    # 1. 随机掩码生成 (patch size 32x32)
    mask = random_mask(image, ratio=mask_ratio, patch_size=32)
    
    # 2. 稀疏卷积编码（仅处理可见patch）
    visible_patches = apply_mask(image, mask)  # 转为稀疏张量
    features = sparse_encoder(visible_patches)  # SubmanifoldSparseConv
    
    # 3. 密集化 + 轻量解码器重建
    dense_features = densify(features)  # 稀疏→密集，掩码位置填0
    reconstruction = decoder(dense_features)  # 单ConvNeXt Block
    
    # 4. 仅在掩码区域计算MSE损失
    loss = mse_loss(reconstruction[mask], image[mask])
    return loss

# GRN 层实现
class GRN(nn.Module):
    def __init__(self, dim):
        self.gamma = nn.Parameter(torch.zeros(1, 1, 1, dim))
        self.beta = nn.Parameter(torch.zeros(1, 1, 1, dim))
    
    def forward(self, x):  # x: (B, H, W, C)
        gx = torch.norm(x, p=2, dim=(1, 2), keepdim=True)  # 全局特征聚合 G(X)
        nx = gx / (gx.mean(dim=-1, keepdim=True) + 1e-6)   # 响应归一化 N(·)
        return self.gamma * (x * nx) + self.beta + x         # 校准 + 残差
```

##### 动机与背景

掩码图像建模（Masked Image Modeling, MIM）已在 Vision Transformer 上取得巨大成功（MAE、BEiT、SimMIM），但将其直接应用于卷积网络面临两个核心挑战：

1. **架构不兼容**：Transformer 可通过丢弃掩码 token 实现高效编码，而标准卷积必须处理所有空间位置，无法自然地"跳过"掩码区域。直接将掩码位置填零会导致训练-测试分布不一致，且掩码信息通过卷积核的感受野泄露到可见区域。

2. **特征坍塌**：实验发现，即使解决了架构问题，ConvNeXt 在 FCMAE 预训练后会出现严重的特征坍塌——不同通道的特征激活高度相似，模型学到的表征缺乏多样性，导致微调性能受限。

##### 核心机制一：FCMAE 框架

FCMAE（Fully Convolutional Masked AutoEncoder）的设计要点：

**稀疏卷积编码器**：采用 MinkowskiEngine 中的 submanifold sparse convolution 替代标准卷积。该操作仅在输入非零位置进行卷积计算，输出也仅保留对应位置的值。这确保了：
- 掩码区域不参与计算，避免信息泄露
- 计算量与可见 patch 数量成正比，提升效率
- 编码器保持 ConvNeXt 的完整架构不变

**掩码策略**：使用 \(32 \times 32\) 的 patch 大小和 0.6 的掩码比例。相比 MAE 的 \(16 \times 16\) patch + 0.75 比例，更大的 patch 更适合卷积网络的层级下采样结构（经过 4 倍下采样后仍保持合理的稀疏粒度）。

**轻量解码器**：仅使用单个 ConvNeXt Block 作为解码器，将编码器输出密集化后进行像素重建。损失函数为仅在掩码区域计算的 MSE：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - x_i \|^2$$

> 💡 关键：轻量解码器的设计迫使编码器承担更多的语义理解任务，而非将重建能力依赖于解码器。

##### 核心机制二：GRN 层

GRN（Global Response Normalization）层通过三步操作解决特征坍塌：

**Step 1 - 全局特征聚合 \(G(\cdot)\)**：对每个通道在空间维度上计算 L2 范数，获得全局统计量：

$$G(X)_i = \| X_i \|_2 = \sqrt{\sum_{h,w} X_{i,h,w}^2}$$

其中 \(X_i\) 是第 \(i\) 个通道的特征图。

**Step 2 - 响应归一化 \(N(\cdot)\)**：通过除法归一化实现通道间竞争：

$$N(g_i) = \frac{g_i}{\sum_{j=1}^{C} g_j}$$

这使得每个通道的重要性相对于其他通道进行衡量——如果某个通道的全局响应远高于平均水平，其归一化值接近 1；反之接近 0。

**Step 3 - 特征校准与残差**：

$$X_i = \gamma \cdot X_i \cdot N(G(X)_i) + \beta + X_i$$

其中 \(\gamma, \beta\) 为可学习参数，初始化为零。零初始化确保 GRN 在训练初期等价于恒等映射，不破坏预训练模型的初始行为。

> ⚠️ 注意：GRN 与 SE-Net 的通道注意力不同——SE 使用 sigmoid 压缩到 [0,1] 进行"门控"，而 GRN 使用除法归一化实现"竞争"，允许值大于 1，更有效地促进通道多样性。

##### 协同设计的重要性

| 配置 | ImageNet-1K Top-1 |
|------|-------------------|
| ConvNeXt V1 + Supervised | 83.8% |
| ConvNeXt V1 + FCMAE | 83.5% |
| ConvNeXt V2 (w/ GRN) + Supervised | 84.0% |
| **ConvNeXt V2 + FCMAE** | **84.6%** |

单独使用 FCMAE（无 GRN）甚至略低于监督基线；单独使用 GRN（监督训练）仅提升 0.2%。但两者组合后产生 0.8% 的显著提升，验证了"模型架构与学习框架需要协同设计"的核心论点。

##### 模型配置与缩放

ConvNeXt V2 采用 4 阶段层级结构，通道数逐阶段翻倍：

| 模型 | 参数量 | 基础通道 C | Block 分布 (B) | IN-1K Acc |
|------|--------|-----------|----------------|-----------|
| Atto | 3.7M | 40 | (2,2,6,2) | 76.7% |
| Femto | 5.2M | 48 | (2,2,6,2) | 78.5% |
| Pico | 9.1M | 64 | (2,2,6,2) | 80.3% |
| Nano | 15.6M | 80 | (2,2,8,2) | 81.9% |
| Tiny | 28M | 96 | (3,3,9,3) | 83.0% |
| Base | 89M | 128 | (3,3,27,3) | 84.9% |
| Large | 198M | 192 | (3,3,27,3) | 85.8% |
| Huge | 659M | 352 | (3,3,27,3) | 86.3% |

##### 与现有方法的对比

**vs. MAE (ViT)**：在 Base/Large 规模下性能相当（84.9 vs 83.6 / 85.8 vs 85.9），但 ConvNeXt V2-L 仅用 198M 参数即达到 ViT-L (307M) 的水平。在 Huge 规模下略有差距（86.3 vs 86.9），但通过 IN-22K 中间微调可弥补。

**vs. SimMIM (Swin)**：在所有模型尺寸上均超越 Swin + SimMIM（Base: 84.9 vs 84.0, Large: 85.8 vs 85.4, Huge: 86.3 vs 85.7）。

**下游任务迁移**：
- COCO 检测：V2-H AP^box = 55.7（vs Swin V2-H 54.4）
- ADE20K 分割：V2-H mIoU = 55.0（vs Swin V2-H 54.2），加 IN-22K 微调达 57.0

#### 🧪 练习题

```yaml
question: "ConvNeXt V2 中 GRN 层的可学习参数 γ 和 β 初始化为零的主要原因是什么？"
options:
  - "减少模型参数量，加速训练收敛"
  - "确保训练初期 GRN 等价于恒等映射，不破坏网络初始行为"
  - "防止梯度爆炸，稳定反向传播"
  - "使 GRN 层在推理时可以被完全移除"
answer: 1
explain: "γ=0, β=0 时 GRN 输出为 0·X·N(G(X)) + 0 + X = X，即恒等映射。这保证了 GRN 在训练初期不改变网络行为，随训练逐步学习有意义的通道竞争模式。"
```