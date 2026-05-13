### Mamba-SAM

```yaml
id: mamba_sam
name: "Mamba-SAM"
full_name: "Mamba-SAM: Integrating State Space Models with SAM for Efficient 3D Medical Image Segmentation"
year: "2025"
org: "Independent Research"
paper_url: "https://arxiv.org/abs/2602.00650"
category: "medical_vision"
parent: "SAM"
motivation: "将Mamba SSM与冻结SAM结合，通过双分支融合或轻量Adapter注入实现高效3D医学图像分割"
```

#### 📝 一句话总结

Mamba-SAM 提出两种参数高效策略将 Mamba 状态空间模型与冻结 SAM 结合：双分支交叉注意力融合架构（0.906 Dice）和 3D Adapter 注入架构（TP_MFGC，0.880 Dice / 4.77 FPS），在 ACDC 心脏 MRI 分割任务上以极少可训练参数达到与 UNet++ 相当的性能。

#### 🎯 核心要点

- **双分支架构 (MambaSAM-Base)**：冻结 SAM ViT-B 编码器（~90M 参数不动）并行一个可训练 VMamba 编码器，通过 Cross-Branch Attention (CBA) 融合两路特征
- **Adapter 架构 (TP_MFGC)**：在冻结 SAM ViT 每个 block 后插入 TP-Mamba 适配器，从三正交平面（Axial/Coronal/Sagittal）建模 3D 上下文
- **Multi-Frequency Gated Convolution (MFGC)**：用 3D DCT 变换在频域增强局部特征表示，替代标准 3D CNN 路径
- **参数效率**：双分支仅训练 ~24M/113M 参数（21%），TP-Mamba (LoRA) 训练参数更少，VRAM 仅需 1.9GB
- **线性复杂度优势**：Mamba 的 \\(O(N)\\) 复杂度使 3D adapter 推理速度达 4.77 FPS，远超 2D 逐片方式的 2.78 FPS
- **ACDC 数据集**：150 例心脏 MRI，分割 RV/Myo/LV 三类结构，MambaSAM-Base 在 Myo (0.910) 和 LV (0.971) 上超越所有基线

#### 🔬 深入细节

##### 动机与背景

SAM 在自然图像分割上表现卓越，但直接应用于医学图像面临三大挑战：(1) **领域鸿沟**——医学图像（如 MRI）的灰度、纹理特征与自然图像差异巨大；(2) **2D 限制**——SAM 仅处理 2D 切片，无法建模体积上下文；(3) **计算成本**——全量微调 SAM 的 ~90M 参数代价高昂。传统 Transformer 的 \\(O(N^2)\\) 复杂度在处理 3D 高分辨率医学体积时更是瓶颈。Mamba SSM 以其选择性状态更新机制和 \\(O(N)\\) 线性复杂度，为高效建模长序列依赖提供了理想方案。

##### 架构 1：双分支 MambaSAM

```python
# Dual-Branch MambaSAM 伪代码
def dual_branch_mamba_sam(X_slice):
    # 分支1: 冻结SAM编码器 (通用特征)
    F_sam = frozen_sam_vit_b(X_slice)  # [H/16, W/16, 768]
    
    # 分支2: 可训练VMamba编码器 (领域特征)
    F_mamba = trainable_vmamba(X_slice)  # [H/16, W/16, 384]
    
    # Cross-Branch Attention 融合
    Q = F_mamba @ W_q  # VMamba特征作Query
    K = F_sam @ W_k    # SAM特征作Key
    V = F_sam @ W_v    # SAM特征作Value
    F_cba = softmax(Q @ K.T / sqrt(d_k)) @ V
    
    # 残差连接 + 解码
    F_fused = F_sam + F_cba
    mask = cnn_decoder(F_fused)  # [H, W, N_classes]
    return mask
```

**CBA 融合机制的设计直觉**：VMamba 分支学习了医学领域特有的细粒度纹理（如心肌边界），将其作为 Query 去"查询"SAM 通用特征中的相关语义信息。这种设计让领域特定细节引导通用知识的检索，而非简单拼接。融合公式为：

$$F_{cba} = \text{softmax}\left(\frac{(F_{mamba}W_q)(F_{sam}W_k)^T}{\sqrt{d_k}}\right)(F_{sam}W_v)$$

$$F_{fused} = F_{sam} + F_{cba}$$

> 💡 关键：VMamba 作为 Query 端意味着"领域专家提问，通用模型回答"，这比反向设计更有效，因为医学特征知道该关注什么。

解码器对比：论文测试了 CNN 解码器（转置卷积）和 IFA 解码器（基于 MLP 的连续坐标解码）。实验表明简单 CNN 解码器效果更优（0.906 vs 0.893 Dice），说明在此场景下简单方案更稳健。

##### 架构 2：3D Adapter TP-Mamba-SAM

```python
# TP-Mamba Adapter 注入伪代码
def tp_mamba_adapter(F_in, depth_slices):
    # 降维 + 重塑为伪3D体积
    V = reshape_to_3d(linear_down(F_in))  # [D_adapter]
    
    # 局部路径: 3D CNN (或MFGC替代)
    F_local = mfgc_block(V)  # 空间+频域联合分析
    
    # 全局路径: 三正交平面Mamba扫描
    F_axial = mamba_block(flatten_axial(V))    # HW平面
    F_coronal = mamba_block(flatten_coronal(V))  # DH平面  
    F_sagittal = mamba_block(flatten_sagittal(V)) # DW平面
    F_global = fuse(F_axial, F_coronal, F_sagittal)
    
    # 融合 + 升维
    F_adapter = linear_up(F_local + F_global)
    return F_in + F_adapter  # 残差注入frozen SAM
```

**TP-Mamba 的三平面设计**：将 3D 体积沿三个正交方向展开为序列，分别用 Mamba 块建模长程依赖。由于 Mamba 的线性复杂度，处理这些长序列的计算开销远低于 3D Transformer。每个 Mamba 块使用选择性状态更新：

$$h_t = \bar{A} h_{t-1} + \bar{B} x_t, \quad y_t = C h_t$$

其中 \\(\bar{A}, \bar{B}, C\\) 均为输入依赖（selective），使模型能动态决定保留或遗忘哪些信息。适配器以残差方式注入：\\(F_{out} = F_{in} + F_{adapter}\\)，不改变冻结 SAM 的原始计算图。

可选地，LoRA 可应用于冻结 MSA 层的 Q/K/V 投影，进一步微调注意力机制本身。实验显示 LoRA 对 TP-Mamba 至关重要：Dice 从 0.679 提升至 0.796。

##### MFGC 模块：频域增强

MFGC 是本文的重要创新，用 3D 离散余弦变换 (DCT) 将特征转换到频域分析：

$$X_i^{s,k} = \sum_{d,h,w} (X_i^s)_{:,d,h,w} \cdot D_{d,h,w}^{z_k, u_k, v_k}$$

其中 DCT 基函数为：

$$D_{d,h,w}^{z_k,u_k,v_k} = \cos\left(\frac{\pi}{D_s}(z_k+\frac{1}{2})d\right) \cdot \cos\left(\frac{\pi}{H_s}(u_k+\frac{1}{2})h\right) \cdot \cos\left(\frac{\pi}{W_s}(v_k+\frac{1}{2})w\right)$$

频域系数经门控机制与空间特征融合：

$$X_{out}^s = \text{Gate}(X_{spatial}^s, X_{freq}^s) = \sigma(W_g \cdot [X_{spatial}^s; X_{freq}^s]) \odot X_{spatial}^s + (1 - \sigma(\cdot)) \odot X_{freq}^s$$

> 💡 关键：医学图像中的组织边界和纹理在频域有独特特征（如心肌的规则纹理对应特定频率成分）。MFGC 通过门控机制选择性融合空间域和频域信息，比纯空间卷积能捕获更丰富的结构特征。

##### 训练细节

- **损失函数**：\\(\mathcal{L}_{total} = \mathcal{L}_{Dice} + \mathcal{L}_{CE}\\)
- **优化器**：AdamW，学习率 \\(1\text{-}2 \times 10^{-4}\\)，余弦退火 + 线性预热
- **数据预处理**：MONAI pipeline，重采样至 1.5mm 各向同性，强度归一化至 [0,1]（0.5-99.5 百分位裁剪），随机裁剪 96×96×16 (3D) 或 96×96 (2D)
- **数据划分**：70% 训练 / 15% 验证 / 15% 测试（按患者划分）
- **硬件**：Google Colab Pro+ (H100/A100/L4)，AMP + 梯度裁剪（max norm 1.0）

##### 与传统方法的对比

| 特性 | Full Fine-tune SAM | UNet++ | Mamba-SAM (双分支) | TP_MFGC (Adapter) |
|------|-------------------|--------|-------------------|-------------------|
| 可训练参数 | ~90M+ | ~36M | ~24M (21%) | ~24M (20%) |
| 3D 上下文 | ❌ | ❌ | ❌ (2D逐片) | ✅ (三平面Mamba) |
| 推理速度 | 慢 | 中 | 2.78 FPS | **4.77 FPS** |
| Mean Dice | — | 0.907 | **0.906** | 0.880 |
| VRAM | >20GB | ~8GB | 11.57GB | 12.99GB |

##### 实验结果详细分析

**Table 1 - ACDC 测试集定量结果：**

| 模型 | RV Dice | Myo Dice | LV Dice | Mean Dice | Mean HD95 (mm) |
|------|---------|----------|---------|-----------|----------------|
| UNet++ | 0.898 | 0.871 | 0.952 | 0.907 | 2.88 |
| Attention UNet | 0.878 | 0.858 | 0.947 | 0.894 | 3.91 |
| AutoSAM (CNN) | 0.888 | 0.860 | 0.942 | 0.897 | 6.60 |
| MambaUNet | 0.835 | 0.789 | 0.918 | 0.847 | 4.58 |
| SwinUNet | 0.572 | 0.607 | 0.782 | 0.654 | 17.18 |
| **MambaSAM-Base** | 0.836 | **0.910** | **0.971** | **0.906** | 7.53 |
| MambaSAM (IFA Dec) | 0.871 | 0.874 | 0.934 | 0.893 | 9.35 |
| **TP_MFGC** | 0.868 | 0.680 | 0.897 | 0.880 | 32.39 |
| TP-Mamba (LoRA) | 0.758 | 0.769 | 0.860 | 0.796 | 8.54 |

**Table 2 - 效率对比：**

| 模型 | Mean Dice | FPS/Volume | Max VRAM (GB) | Total Params (M) | Trainable (M) |
|------|-----------|------------|---------------|-------------------|---------------|
| MambaSAM-Base | 0.906 | 2.78 | 11.57 | 113.55 | 23.88 (~21%) |
| TP_MFGC | 0.880 | 4.77 | 12.99 | 118.55 | 23.72 (~20%) |
| TP-Mamba (LoRA) | 0.796 | — | 1.90 | — | 极少 |

> ⚠️ 注意：TP_MFGC 虽然 Dice 较高（0.880），但 HD95 异常差（32.39mm），表明其在边界定位精度上存在严重问题，可能与 3D 上下文聚合时的空间对齐有关，论文将此列为未来需调查的问题。

**关键发现**：
1. **MambaSAM-Base 在 Myo 和 LV 上超越所有基线**（包括 UNet++），说明 SAM 通用形状先验 + Mamba 细粒度纹理学习的互补性极强
2. **LoRA 对 Adapter 方案至关重要**：TP-Mamba 从 0.679 提升到 0.796 Dice，证明仅靠 adapter 不足以充分利用冻结骨干
3. **CNN 解码器优于 IFA 解码器**（0.906 vs 0.893），简单方案在此场景更稳健
4. **Mamba 线性复杂度的速度优势**：TP_MFGC 达 4.77 FPS（单次 3D 前向传播），双分支 2D 逐片仅 2.78 FPS
5. **RV 分割仍是难点**：所有模型在 RV 上表现最差，MambaSAM-Base RV Dice 仅 0.836，低于 UNet++ 的 0.898

##### 局限性与未来方向

- 仅在 ACDC 单一数据集验证，跨数据集/跨模态泛化能力未知
- TP_MFGC 的 HD95 异常（32.39mm）需深入调查边界定位失败原因
- 计算资源限制未能完成知识蒸馏实验（将高精度双分支蒸馏为轻量学生模型）
- 双分支架构仍为 2D 逐片处理，未充分利用体积连续性
- 未来可探索多模态文本引导分割、跨数据集评估

#### 🧪 练习题

```yaml
question: "在 Mamba-SAM 双分支架构的 Cross-Branch Attention 中，VMamba 特征作为 Query 而 SAM 特征作为 Key/Value 的设计意图是什么？"
options:
  - "减少计算量，因为 VMamba 特征维度更低"
  - "让领域特定特征引导从通用模型中检索相关语义信息"
  - "防止冻结 SAM 编码器的梯度回传"
  - "使 VMamba 分支能够直接复制 SAM 的输出特征"
answer: 1
explain: "VMamba 学习了医学领域特有细节，作为 Query 端能精准定位需要从 SAM 通用特征中提取的相关信息，实现'专家提问、通用模型回答'的知识融合范式。"
```