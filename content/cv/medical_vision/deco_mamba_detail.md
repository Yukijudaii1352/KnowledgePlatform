### Deco-Mamba

```yaml
id: deco_mamba
name: Deco-Mamba
full_name: "Deco-Mamba: Decoder-Centric Mamba Architecture with Multi-Scale Distributional Alignment for Medical Image Segmentation"
year: 2025
org: ILLS (Université du Québec à Montréal)
paper_url: https://arxiv.org/abs/2603.12547
category: medical_vision
parent: "—"
motivation: "以解码器为中心的 CNN-Mamba 混合架构，通过跨注意力门控、可变形卷积残差块和多尺度分布感知深度监督，提升医学图像分割精度"
```

#### 📝 一句话总结

Deco-Mamba 提出了一种以解码器为中心的 CNN-Mamba 混合 U-Net 架构，通过跨注意力门控（CAG）、视觉状态空间模型块（VSSMB）和可变形残差块（DRB）三级级联解码，并引入基于窗口化 KL 散度的多尺度分布对齐（MSDA）深度监督损失，在多个医学图像分割基准上取得了 SOTA 性能。

#### 🎯 核心要点

- **编码器**：PVT-V2 Transformer + 7×7 CNN 并行双分支，分别捕获全局语义和局部纹理
- **解码器三级级联模块**：CAG（跨注意力门控）→ VSSMB（多方向 SSM 扫描）→ DRB（可变形卷积残差块），逐步完成特征选择、长程建模和细节恢复
- **CAG 跨注意力门控**：双向注意力（编码器→解码器 + 解码器→编码器）+ 通道注意力，替代传统单向注意力门
- **VSSMB**：基于 Mamba 的线性复杂度状态空间模型，4 方向扫描（左→右、右→左、上→下、下→上）捕获全局依赖
- **DRB 可变形残差块**：利用可变形卷积的自适应感受野恢复 SSM 丢失的空间细节
- **MSDA 损失**：窗口化 KL 散度 + 边界加权的多尺度分布对齐深度监督，替代传统像素级深度监督
- **两个变体**：Deco-Mamba-V0（PVT-V2-B0，9.67M 参数）和 Deco-Mamba-V1（PVT-V2-B2，46.93M 参数）
- **实验覆盖**：Synapse（8 类）、BTCV（13 类）、ACDC（心脏）、ISIC17/18（皮肤）、GlaS（腺体）、MoNuSeg（核）共 7 个数据集

#### 🔬 深入细节

##### 架构总览

![Deco-Mamba 架构图](https://arxiv.org/html/2603.12547v1/x1.png)
*图：Deco-Mamba 整体架构。左侧为 PVT+CNN 双分支编码器，右侧为四级 CAG→VSSMB→DRB 级联解码器，底部展示 MSDA 多尺度分布对齐监督。*

Deco-Mamba 采用经典的 U-Net 对称结构，但将设计重心从编码器转移到解码器。编码器使用预训练的 PVT-V2 提取多尺度语义特征，同时并行一个 7×7 大核 CNN 分支保留局部纹理细节。解码器由四个级联阶段组成，每个阶段依次执行三个操作：**特征选择**（CAG）、**全局建模**（VSSMB）和**细节恢复**（DRB）。

##### 动机与背景

传统医学图像分割方法大多采用"编码器中心"的设计哲学——将最强的建模能力集中在编码器（如 ViT、Swin Transformer），而解码器仅做简单的上采样和跳跃连接拼接。这导致两个问题：

1. **语义鸿沟**：编码器深层特征与浅层特征之间存在巨大的语义差距，简单拼接无法有效融合
2. **细节丢失**：上采样过程中空间细节逐步退化，边界模糊

Deco-Mamba 的核心洞察是：**解码器才是决定分割精度的关键瓶颈**。因此，它在解码器中引入了三种互补的机制来分别解决特征选择、长程依赖建模和空间细节恢复问题。

##### 编码器：PVT + CNN 双分支

编码器由两个并行分支组成：

- **PVT-V2 分支**：使用预训练的 Pyramid Vision Transformer V2，输出四个尺度的特征图 \(\{E_i^T\}_{i=1}^{4}\)，分辨率分别为 \(H/4 \times W/4\) 到 \(H/32 \times W/32\)
- **CNN 分支**：单层 7×7 大核卷积 + BatchNorm + ReLU，输出 \(E^C\)，保留输入图像的局部纹理和边缘信息

两个分支的特征在每个解码器阶段通过 CAG 进行自适应融合。

##### CAG：跨注意力门控

CAG 是解码器每个阶段的第一个模块，负责从编码器跳跃连接中选择性地提取有用信息。与传统注意力门（AG）仅计算单向注意力不同，CAG 采用**双向交叉注意力**：

$$\alpha_{e \to d} = \sigma\big(W_1 \cdot \text{ReLU}(W_e \cdot E + W_d \cdot D + b)\big)$$

$$\alpha_{d \to e} = \sigma\big(W_2 \cdot \text{ReLU}(W_d' \cdot D + W_e' \cdot E + b')\big)$$

其中 \(E\) 为编码器特征，\(D\) 为解码器特征。双向注意力分别生成两个门控权重，然后通过加权融合：

$$F_{\text{fused}} = \alpha_{e \to d} \odot E + \alpha_{d \to e} \odot D$$

融合后还经过**通道注意力**（全局平均池化 → FC → ReLU → FC → Sigmoid）进一步优化通道权重分配。

> 💡 **关键**：双向注意力让编码器和解码器特征互相"审视"对方，比单向门控更能弥合语义鸿沟。

##### VSSMB：视觉状态空间模型块

CAG 输出的融合特征送入 VSSMB 进行全局依赖建模。VSSMB 基于 Mamba 的选择性状态空间模型（S6），核心是将 2D 特征图展平为 1D 序列后进行状态空间递推：

$$h_t = \bar{A} h_{t-1} + \bar{B} x_t, \quad y_t = C h_t$$

其中 \(\bar{A} = \exp(\Delta A)\)，\(\bar{B} = (\Delta A)^{-1}(\exp(\Delta A) - I) \cdot \Delta B\) 为离散化后的状态转移矩阵。

为了克服 1D 扫描的方向偏差，VSSMB 采用**四方向扫描**策略（左→右、右→左、上→下、下→上），四个方向的输出通过求和融合：

$$Y = \sum_{d=1}^{4} \text{SSM}_d(\text{scan}_d(X))$$

> 💡 **关键**：Mamba 的线性复杂度 \(O(N)\) 相比 Transformer 的 \(O(N^2)\) 在高分辨率医学图像上具有显著的效率优势，而多方向扫描弥补了序列模型在 2D 空间建模上的不足。

##### DRB：可变形残差块

VSSMB 虽然能捕获全局依赖，但 SSM 的序列化处理会丢失部分空间细节。DRB 使用**可变形卷积**来恢复这些细节：

$$y(p) = \sum_{k=1}^{K} w_k \cdot x(p + p_k + \Delta p_k) \cdot \Delta m_k$$

其中 \(\Delta p_k\) 和 \(\Delta m_k\) 分别是学习到的偏移量和调制权重。可变形卷积能够自适应地调整采样位置，聚焦于器官边界等关键区域。DRB 采用残差连接，确保梯度流畅传播。

> ⚠️ **注意**：消融实验表明，将可变形卷积替换为标准卷积、Involution 或动态卷积都会导致性能下降，说明自适应空间采样对细节恢复至关重要。

##### MSDA：多尺度分布对齐损失

MSDA 是本文提出的新型深度监督策略，核心思想是用**分布级别**的对齐替代传统的**像素级别**监督。

**第一步：窗口化 KL 散度。** 在每个解码器尺度 \(s\)，将预测图和标签图划分为 \(K \times K\) 的窗口，在每个窗口内计算归一化直方图，然后用 KL 散度度量分布差异：

$$\mathcal{L}_{\text{KL}}^{(s)}(h,w) = \sum_{b=1}^{B} \hat{q}_{h,w}^{(s)}(b) \log \frac{\hat{q}_{h,w}^{(s)}(b)}{\hat{p}_{h,w}^{(s)}(b) + \epsilon}$$

**第二步：边界加权。** 通过 Laplacian 算子检测标签边界区域，对边界附近的窗口赋予更高权重：

$$W_{h,w}^{(s)} = \gamma \cdot \mathbb{1}\big[\text{Lap}(Y_{\downarrow s})(h,w) > 0\big]$$

**第三步：多尺度聚合。** 不同解码器阶段的损失按递增权重聚合：

$$\mathcal{L}_{\text{multi}} = \sum_{s=1}^{S} \lambda_s \mathcal{L}_{\text{dist}}^{(s)}, \quad \lambda_1 < \lambda_2 < \cdots < \lambda_S$$

**最终损失**：

$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{dice}} + \mathcal{L}_{\text{multi}}$$

> 💡 **关键**：传统深度监督强迫低分辨率层产生像素级预测，反而损害边界精度。MSDA 通过分布对齐提供"软"监督，既保证区域一致性又增强边界敏感性。消融实验中，MSDA 将 DSC 从 83.84（仅 Dice）提升至 85.07，同时 HD95 从 14.94 降至 14.72。

##### 算法伪代码

```python
# Deco-Mamba 前向传播伪代码
def forward(x):
    # === 编码器 ===
    E_T = PVT_V2(x)          # {E1_T, E2_T, E3_T, E4_T} 多尺度 Transformer 特征
    E_C = CNN_7x7(x)          # 局部纹理特征
    
    # === 解码器（4 个阶段，从深到浅）===
    D = E_T[4]                 # 最深层特征作为初始解码器输入
    for s in [4, 3, 2, 1]:
        D = Upsample(D)       # 上采样
        # 阶段 1: 跨注意力门控
        F = CAG(encoder=E_T[s], decoder=D, cnn=E_C)
        # 阶段 2: 全局依赖建模
        F = VSSMB(F)           # 4 方向 Mamba 扫描
        # 阶段 3: 细节恢复
        D = DRB(F)             # 可变形卷积残差块
        
        # MSDA 监督（训练时）
        pred_s = SegHead(D)
        L_dist[s] = BoundaryWeighted_KL(pred_s, label_downsampled[s])
    
    # === 损失 ===
    L_total = DiceLoss(pred_1, label) + sum(lambda_s * L_dist[s])
    return pred_1, L_total
```

##### 实验结果

Deco-Mamba 在 7 个医学图像分割基准上进行了全面评估：

| 数据集 | 指标 | Deco-Mamba-V0 | Deco-Mamba-V1 | 对比最优 |
|--------|------|---------------|---------------|----------|
| Synapse (8类) | DSC↑ / HD95↓ | 83.16 / 15.89 | **85.07 / 14.72** | PAG-TransYnet: 83.43/15.82 |
| ACDC (心脏) | DSC↑ | 85.14 | **86.01** | Cascaded-MERIT: 85.67 |
| ISIC18 (皮肤) | DSC↑ | **最优** | 次优 | — |
| MoNuSeg (核) | DSC↑ | 次优 | **最优** | +4.46% vs Swin-UMamba |

> 💡 **效率亮点**：Deco-Mamba-V0 仅 9.67M 参数 / 9.73 GFLOPs，性能却超越 147M+ 参数的 MERIT 系列，体现了解码器中心设计的参数效率。

##### 消融实验关键发现

| 消融项 | DSC | HD95 | 结论 |
|--------|-----|------|------|
| 完整模型 | **85.07** | **14.72** | — |
| 去除 CNN 分支 | 84.07 | 18.92 | CNN 分支对细节保留至关重要 |
| 去除 VSSMB | 83.51 | 15.96 | SSM 全局建模不可或缺 |
| CAG → AG | 82.98 | 15.69 | 双向注意力优于单向 |
| CAG → CBAM | 84.01 | 16.19 | CAG 仍优于通道+空间注意力 |
| DRB → 标准卷积 | 84.53 | 16.18 | 可变形卷积的自适应采样更优 |
| 仅 Dice 损失 | 83.84 | 14.94 | MSDA 提升 +1.23 DSC |
| Dice + 传统深度监督 | 84.24 | 15.89 | MSDA 在 DSC 和 HD95 上均更优 |

#### 🧪 练习题

```yaml
question: "Deco-Mamba 中 MSDA 损失使用窗口化 KL 散度而非像素级交叉熵进行深度监督，主要原因是什么？"
options:
  - "KL 散度的计算速度比交叉熵更快"
  - "窗口化 KL 散度能捕获局部区域的分布一致性，避免低分辨率层产生粗糙像素级预测"
  - "KL 散度对类别不平衡问题更鲁棒"
  - "窗口化操作可以减少 GPU 显存占用"
answer: 1
explain: "传统深度监督强迫低分辨率层产生像素级预测，反而损害边界精度。MSDA 通过窗口化 KL 散度提供分布级别的软监督，既保证区域比例一致性又增强边界敏感性。"
```