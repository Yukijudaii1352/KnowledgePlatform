### FTransMamba: A Multi-Stage Fusion Transformer and Mamba Modeling for Multimodal Remote Sensing Scene Understanding

```yaml
id: ftransmamba
name: FTransMamba
full_name: "FTransMamba: 多阶段融合Transformer与Mamba建模的多模态遥感场景理解"
year: "2026"
org: "辽宁科技大学 + 吉林大学"
paper_url: "https://doi.org/10.1016/j.patcog.2026.113625"
code_url: "https://github.com/lzp-lkd/FTransMamba"
category: "remote_sensing_segmentation"
parent: "Transformer + Mamba (SSM)"
motivation: "结合Transformer全局注意力与Mamba线性复杂度序列建模优势，通过多阶段融合策略实现多模态遥感数据的高效语义分割"
```

#### 📝 一句话总结

FTransMamba 提出了一种多阶段融合框架，将 Transformer 的全局上下文建模能力与 Mamba（状态空间模型）的线性复杂度长程依赖捕获能力相结合，通过分层次的多模态特征融合策略，在多个遥感语义分割基准上实现了高精度的场景理解。

#### 🎯 核心要点

- **双分支编码器架构**：采用 Transformer 分支捕获全局空间注意力 + Mamba（SSM）分支进行高效线性序列建模，兼顾精度与效率
- **多阶段融合策略（Multi-Stage Fusion）**：在编码器的多个层级进行跨模态/跨分支特征融合，逐步增强语义表征
- **多模态输入支持**：融合光学影像（RGB）与辅助模态（如 DSM/nDSM/SAR）进行联合语义分割
- **联合损失函数**：采用 SoftCrossEntropyLoss + DiceLoss 的加权组合，平衡像素级分类与区域级一致性
- **广泛的基准验证**：在 ISPRS Vaihingen、Potsdam、WHU Building、Massachusetts Building 及农田分割等多个数据集上进行评估，指标包括 mIoU、F1、OA

#### 🔬 深入细节

##### 方法论概述

FTransMamba 的核心思想是将两种互补的序列建模范式——Transformer 和 Mamba——统一到一个分割框架中：

1. **Transformer 分支**：利用多头自注意力（MHSA）机制建模全局像素间关系，擅长捕获远距离空间依赖，但计算复杂度为 $O(N^2)$
2. **Mamba 分支**：基于选择性状态空间模型（Selective SSM），以 $O(N)$ 线性复杂度实现长程依赖建模，特别适合处理大尺寸遥感影像

##### 架构设计（推断）

```
┌─────────────────────────────────────────────────────────┐
│                    FTransMamba 架构                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Input: RGB Image (+ Auxiliary Modal, e.g., DSM/SAR)    │
│         ↓                                               │
│  ┌──────────────┐        ┌──────────────┐              │
│  │ Transformer  │        │    Mamba     │              │
│  │   Branch     │        │   Branch     │              │
│  │  (Global     │        │  (Linear     │              │
│  │  Attention)  │        │   SSM)       │              │
│  └──────┬───────┘        └──────┬───────┘              │
│         │    Stage 1 Fusion      │                      │
│         ├────────────────────────┤                      │
│         ↓                        ↓                      │
│  ┌──────────────┐        ┌──────────────┐              │
│  │ Trans Block  │        │ Mamba Block  │              │
│  │   Stage 2    │        │   Stage 2    │              │
│  └──────┬───────┘        └──────┬───────┘              │
│         │    Stage 2 Fusion      │                      │
│         ├────────────────────────┤                      │
│         ↓                        ↓                      │
│  ┌──────────────┐        ┌──────────────┐              │
│  │ Trans Block  │        │ Mamba Block  │              │
│  │   Stage 3    │        │   Stage 3    │              │
│  └──────┬───────┘        └──────┬───────┘              │
│         │    Stage 3 Fusion      │                      │
│         ├────────────────────────┤                      │
│         ↓                        ↓                      │
│  ┌──────────────────────────────────────┐              │
│  │        Decoder (UPerNet/FPN)          │              │
│  └──────────────────┬───────────────────┘              │
│                     ↓                                   │
│              Segmentation Map                           │
└─────────────────────────────────────────────────────────┘
```

##### 核心公式

**1. Mamba 选择性状态空间模型（Selective SSM）**

Mamba 的核心是离散化的状态空间方程：

$$h_t = \bar{A} h_{t-1} + \bar{B} x_t$$
$$y_t = C h_t$$

其中 $\bar{A} = \exp(\Delta A)$，$\bar{B} = (\Delta A)^{-1}(\exp(\Delta A) - I) \cdot \Delta B$，$\Delta$ 为输入依赖的离散化步长（选择性机制的关键）。

**2. Transformer 自注意力**

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

**3. 多阶段融合（Multi-Stage Fusion）**

在每个编码阶段 $s$，Transformer 特征 $F_T^s$ 和 Mamba 特征 $F_M^s$ 通过融合模块交互：

$$F_{fused}^s = \alpha \cdot \phi(F_T^s, F_M^s) + (1-\alpha) \cdot \psi(F_T^s, F_M^s)$$

其中 $\phi$ 可为交叉注意力，$\psi$ 可为逐元素门控融合，$\alpha$ 为可学习权重。

**4. 联合损失函数**

$$\mathcal{L} = \lambda_{ce} \cdot \mathcal{L}_{SCE} + \lambda_{dice} \cdot \mathcal{L}_{Dice}$$

其中 SoftCrossEntropy 带标签平滑因子 $\epsilon = 0.05$：

$$\mathcal{L}_{SCE} = -\sum_{c=1}^{C} \tilde{y}_c \log(\hat{y}_c), \quad \tilde{y}_c = (1-\epsilon)y_c + \frac{\epsilon}{C}$$

Dice Loss：

$$\mathcal{L}_{Dice} = 1 - \frac{2\sum_{i} p_i g_i + \epsilon}{\sum_{i} p_i + \sum_{i} g_i + \epsilon}$$

##### 算法伪代码

```python
# FTransMamba 前向推理流程（推断自代码与方法论）
def forward(img, aux_modal=None):
    """
    Args:
        img: RGB image tensor [B, 3, H, W], H=W=512
        aux_modal: optional auxiliary modality [B, C_aux, H, W]
    """
    # 1. 输入嵌入（多模态融合）
    if aux_modal is not None:
        x = concat_and_embed(img, aux_modal)  # 早期融合或双流输入
    else:
        x = patch_embed(img)
    
    # 2. 多阶段双分支编码
    trans_features = []
    mamba_features = []
    
    for stage in range(num_stages):  # 通常 4 个阶段
        # Transformer 分支：全局注意力
        f_trans = transformer_blocks[stage](x_trans)
        # Mamba 分支：选择性 SSM
        f_mamba = mamba_blocks[stage](x_mamba)
        
        # 多阶段融合
        f_trans, f_mamba = fusion_module[stage](f_trans, f_mamba)
        
        trans_features.append(f_trans)
        mamba_features.append(f_mamba)
        
        # 下采样
        x_trans = downsample(f_trans)
        x_mamba = downsample(f_mamba)
    
    # 3. 解码器
    multi_scale_features = merge(trans_features, mamba_features)
    pred = decoder(multi_scale_features)  # [B, num_classes, H, W]
    
    return pred

# 训练配置（来自代码仓库）
# - Optimizer: AdamW, lr=6e-4 (head), backbone_lr=6e-5
# - Scheduler: CosineAnnealingWarmRestarts (T_0=15, T_mult=2)
# - Batch size: 8, Input: 512x512
# - Augmentation: RandomScale[0.5,0.75,1.0,1.25,1.5] + SmartCrop + RandomRotate90
# - Loss: SoftCE(smooth=0.05) + DiceLoss(smooth=0.05), weight 1:1
# - Early stopping: patience=10, monitor=val_F1
```

##### 训练细节（来自 GitHub 代码）

| 配置项 | 值 |
|--------|-----|
| 输入尺寸 | 512 × 512 |
| 优化器 | AdamW |
| 学习率（Head） | 6e-4 |
| 学习率（Backbone） | 6e-5 |
| 权重衰减 | 2.5e-4 |
| 调度器 | CosineAnnealingWarmRestarts (T₀=15, T_mult=2) |
| 批大小 | 8 (train) / 4 (val) |
| 损失函数 | SoftCE + Dice (1:1) |
| 标签平滑 | ε = 0.05 |
| 梯度裁剪 | 0.5 |
| 早停 | patience=10, monitor=val_F1 |
| 数据增强 | 多尺度缩放 + 智能裁剪 + 随机旋转90° + Mosaic |
| 随机种子 | 42 |

##### 评估数据集

| 数据集 | 任务 | 类别数 | 说明 |
|--------|------|--------|------|
| ISPRS Vaihingen | 城市语义分割 | 6 | 航空影像 + DSM |
| ISPRS Potsdam | 城市语义分割 | 6 | 航空影像 + DSM |
| WHU Building | 建筑物提取 | 2 | 高分辨率航空影像 |
| Massachusetts Building | 建筑物提取 | 2 | 航空影像 |
| Cropland (Pengg) | 农田分割 | 8 | farmland/city/village/water/forest/road/others/background |

##### 动机与背景

遥感语义分割面临的核心挑战：

1. **大幅面影像的长程依赖**：遥感影像通常具有极高分辨率（数千×数千像素），标准 Transformer 的 $O(N^2)$ 复杂度难以直接处理
2. **多模态数据融合**：现代遥感数据包含光学、SAR、DSM、红外等多种模态，如何有效融合互补信息是关键
3. **多尺度地物目标**：从小型建筑到大面积农田，目标尺度跨度极大

FTransMamba 的解决思路：
- 用 **Mamba** 解决效率问题：线性复杂度处理长序列
- 用 **Transformer** 保证精度：全局注意力捕获关键空间关系
- 用 **多阶段融合** 实现互补：在不同抽象层级融合两种表征

##### 相关工作对比

| 方法 | 骨干网络 | 复杂度 | 多模态 | 特点 |
|------|----------|--------|--------|------|
| UNetFormer | Transformer | O(N²) | ✗ | 轻量级Transformer解码器 |
| DC-Swin | Swin Transformer | O(N·w²) | ✗ | 窗口注意力+密集连接 |
| RSMamba | Mamba | O(N) | ✗ | 纯Mamba遥感分割 |
| CMTFNet | CNN+Transformer | O(N²) | ✓ | CNN-Transformer多模态融合 |
| **FTransMamba** | **Trans+Mamba** | **O(N)~O(N·w²)** | **✓** | **多阶段双分支融合** |

---

> ⚠️ **注意**：本报告基于论文元数据（DOI: 10.1016/j.patcog.2026.113625）、GitHub 代码仓库（https://github.com/lzp-lkd/FTransMamba）及领域知识撰写。论文为非开放获取，全文未能直接访问，部分架构细节为基于标题、代码和方法论的合理推断，标注"推断"处仅供参考。

---

#### 💡 练习题

**Q1（概念理解）**：Mamba（选择性状态空间模型）相比标准 Transformer 自注意力在处理长序列时的核心优势是什么？其"选择性"体现在哪里？

<details><summary>参考答案</summary>

Mamba 的核心优势是**线性计算复杂度** $O(N)$，而 Transformer 自注意力为 $O(N^2)$。对于遥感影像中展平后的长像素序列（如 512×512=262144 tokens），Mamba 可以高效处理而 Transformer 需要窗口化等近似。

"选择性"体现在离散化步长 $\Delta$ 是**输入依赖的**（通过线性投影从输入计算得到），使得模型可以根据输入内容动态决定"记住"或"遗忘"历史信息，类似于 LSTM 的门控机制但更高效。
</details>

**Q2（架构设计）**：为什么 FTransMamba 采用"多阶段融合"而非仅在最终层融合 Transformer 和 Mamba 特征？从多尺度特征的角度分析其优势。

<details><summary>参考答案</summary>

多阶段融合的优势：
1. **层级互补**：浅层特征（纹理、边缘）和深层特征（语义）在不同阶段具有不同特性，逐阶段融合可以让两个分支在每个抽象层级都互相增强
2. **避免信息瓶颈**：仅最终层融合会导致中间层的互补信息丢失，特别是 Mamba 的局部序列模式和 Transformer 的全局关系在浅层就有差异
3. **梯度流优化**：多阶段融合提供了更多的梯度路径，有助于深层网络的训练稳定性
4. **多尺度适配**：遥感目标尺度跨度大，不同阶段的感受野不同，逐级融合可以更好地处理多尺度地物
</details>

**Q3（实验设计）**：该论文使用 SoftCrossEntropy + DiceLoss 的联合损失。请解释为什么在遥感语义分割中需要结合这两种损失，各自解决什么问题？

<details><summary>参考答案</summary>

- **SoftCrossEntropy（带标签平滑）**：逐像素分类损失，提供稳定的梯度信号，标签平滑（ε=0.05）防止模型过度自信，提高泛化能力。但对类别不平衡敏感——遥感中"背景"类通常占主导
- **DiceLoss**：基于区域重叠度的损失，直接优化分割质量指标（类似 F1/IoU），对类别不平衡具有天然鲁棒性，因为它关注前景-背景的重叠比而非逐像素计数

两者结合：CE 提供像素级精确梯度 + Dice 提供区域级平衡约束，在遥感场景（如建筑物提取中建筑仅占少量像素）中尤为重要。
</details>

**Q4（工程实践）**：从代码仓库中可以看到使用了 CosineAnnealingWarmRestarts 调度器（T₀=15, T_mult=2）。请解释这种调度策略的工作原理，以及为什么适合遥感分割任务的训练。

<details><summary>参考答案</summary>

CosineAnnealingWarmRestarts 的工作原理：
- 学习率按余弦曲线从初始值衰减到最小值，然后"重启"回到初始值
- T₀=15 表示第一个周期为 15 个 epoch
- T_mult=2 表示每次重启后周期翻倍（15→30→60...）

适合遥感分割的原因：
1. **周期性重启**帮助模型跳出局部最优，遥感数据的多样性（不同地物、季节、传感器）使得损失面复杂
2. **逐渐延长的周期**允许后期更精细的收敛
3. 配合早停（patience=10），可以在最佳重启周期的低点保存模型
4. 遥感数据集通常较小（相对自然图像），容易过拟合，周期性学习率有正则化效果
</details>