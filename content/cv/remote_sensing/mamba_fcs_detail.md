### Mamba-FCS

```yaml
id: mamba_fcs
name: Mamba-FCS
full_name: "频率-时空Mamba (Mamba-FCS: Frequency-Spatial Mamba for Semantic Change Detection)"
year: 2026
org: Various Institutions
paper_url: https://ieeexplore.ieee.org/abstract/document/11391528/
category: change_detection
parent: changemamba
motivation: 时空频率融合语义变化检测
```

#### 📝 一句话总结

Mamba-FCS 提出了一种基于 VMamba 状态空间模型的语义变化检测框架，通过联合时空-频率特征融合（FFT2 log-amplitude）增强边缘与纹理变化感知，结合变化引导注意力（CGA）模块将二值变化检测与语义变化检测任务显式关联，并引入 Separated Kappa (SeK) 损失函数优化类别不平衡场景下的语义一致性。

#### 🎯 核心要点

- **骨干网络**：采用 Siamese VMamba-Base 编码器（线性复杂度状态空间模型），通过 SS2D 四方向扫描实现全局感受野，提取 4 级多尺度特征
- **联合时空-频率融合**：将空间特征、FFT2 对数幅度频域特征和绝对差异图拼接后经 1×1 卷积压缩 + CBAM 注意力精炼，增强高频变化（边缘/纹理）检测
- **三解码器架构**：BCD 解码器生成二值变化图，两个独立 SCD 解码器分别生成 T1/T2 语义图
- **变化引导注意力（CGA）**：将 BCD 中间变化概率图经 sigmoid 门控逐元素乘以编码器特征，引导 SCD 解码器聚焦变化区域
- **Separated Kappa (SeK) 损失**：将 SeK 评估指标转化为可微损失函数，专门优化变化区域内的语义分类准确性
- **CBAM-based 上采样**：多尺度并行卷积（1×1, 3×3, 5×5）+ CBAM 注意力重加权的上采样模块
- **SOTA 结果**：SECOND 数据集 OA 88.62%/Fscd 65.78%/SeK 25.50%；Landsat-SCD 数据集 OA 96.25%/Fscd 89.27%/SeK 60.26%

#### 🔬 深入细节

![Mamba-FCS 整体架构图](https://arxiv.org/html/2508.08232v1/x2.png)
*图：Mamba-FCS 整体架构。左侧为 Siamese VSSM 编码器提取双时相多尺度特征，中间为联合时空-频率融合机制，右侧为 BCD 解码器和两个 CGA 条件化的 SCD 解码器。*

![联合时空-频率融合机制](https://arxiv.org/html/2508.08232v1/x3.png)
*图：Joint Spatio-Frequency Feature Fusion 模块。将空间特征、FFT2 频域特征和差异特征拼接后经 1×1 卷积 + CBAM 注意力输出融合特征。*

```python
# Mamba-FCS 核心流程伪代码
import torch
import torch.fft as fft

class MambaFCS:
    def __init__(self):
        self.encoder = SiameseVMambaBase()  # 共享权重, C=[128,256,512,1024], L=[2,2,15,2]
        self.bcd_decoder = BinaryChangeDecoder()
        self.scd_decoder_t1 = SemanticDecoder()
        self.scd_decoder_t2 = SemanticDecoder()  # 独立权重
    
    def forward(self, img_t1, img_t2):
        # 1. Siamese 编码: 提取4级多尺度特征
        feats_t1 = self.encoder(img_t1)  # [X1_T1, X2_T1, X3_T1, X4_T1]
        feats_t2 = self.encoder(img_t2)  # [X1_T2, X2_T2, X3_T2, X4_T2]
        
        # 2. BCD 解码器: 自顶向下融合 + 生成中间变化图
        change_maps = []  # CM_i at each stage
        for i in [4, 3, 2, 1]:
            # 联合时空-频率融合
            fused = spatio_freq_fusion(feats_t1[i], feats_t2[i])
            # VSS Block + CBAM上采样
            cm_i = vss_block(fused)
            change_maps.append(cm_i)
        
        y_bcd = predict_binary(change_maps[-1])  # 最终二值变化图
        
        # 3. CGA + SCD 解码器
        for j, decoder in [(1, self.scd_decoder_t1), (2, self.scd_decoder_t2)]:
            for i in [4, 3, 2, 1]:
                # Change-Guided Attention
                x_hat = feats_t1[i] * torch.sigmoid(change_maps[i])  # CGA
                # 解码
                decoder.decode_stage(x_hat, i)
        
        y_t1 = self.scd_decoder_t1.predict()
        y_t2 = self.scd_decoder_t2.predict()
        return y_bcd, y_t1, y_t2

def spatio_freq_fusion(x_t1, x_t2):
    """联合时空-频率特征融合"""
    # FFT2 分支: 对数幅度频谱
    f_t1 = torch.log(1 + torch.abs(fft.fft2(x_t1, norm='ortho')))
    f_t2 = torch.log(1 + torch.abs(fft.fft2(x_t2, norm='ortho')))
    # 差异分支
    diff = torch.abs(x_t1 - x_t2)
    # 拼接 + 压缩 + CBAM
    cat = torch.cat([x_t1, f_t1, x_t2, f_t2, diff], dim=1)  # 5*C channels
    reduced = conv1x1(cat)  # -> C channels
    fused = cbam(reduced)   # 通道注意力 + 空间注意力
    return fused
```

##### 动机与背景

语义变化检测（SCD）需要同时检测"哪里发生了变化"（BCD）和"变化前后的语义类别是什么"（SCD），传统方法面临三大挑战：

1. **长程依赖建模**：CNN 受限于局部感受野，Transformer 虽有全局注意力但计算复杂度为 \(O(n^2)\)
2. **细微变化感知**：光照变化、季节差异等伪变化干扰，真实的边缘/纹理变化难以捕捉
3. **BCD 与 SCD 任务脱节**：多数方法独立处理两个任务，未利用它们的内在关联

Mamba-FCS 通过三个核心创新分别解决上述问题。

##### 核心机制一：VMamba 状态空间编码器

采用 VMamba-Base 作为骨干，核心是 SS2D（2D Selective Scan）模块：

$$\mathbf{h}_t = \bar{\mathbf{A}} \mathbf{h}_{t-1} + \bar{\mathbf{B}} x_t, \quad y_t = \mathbf{C} \mathbf{h}_t$$

其中 \(\bar{\mathbf{A}}, \bar{\mathbf{B}}\) 为离散化的状态转移矩阵。SS2D 沿四个方向（左上→右下、右下→左上、右上→左下、左下→右上）扫描 2D 特征图，将非序列化的视觉数据桥接到 1D 状态空间模型，实现 **\(O(n)\) 线性复杂度的全局感受野**。

> 💡 关键：VMamba 相比 ViT 在保持全局建模能力的同时，计算复杂度从 \(O(n^2)\) 降至 \(O(n)\)，特别适合高分辨率遥感图像。

编码器配置：\(C = [128, 256, 512, 1024]\)，\(L = [2, 2, 15, 2]\)，输出分辨率为 \(H/4, H/8, H/16, H/32\)。

##### 核心机制二：联合时空-频率融合

该融合机制在每个尺度 \(i\) 执行：

**FFT2 分支**：将空间特征变换到频域，提取高频成分（边缘、纹理）：

$$F_i^{T_j} = \log(1 + |\text{FFT2}(X_i^{T_j})|)$$

使用正交归一化（`norm='ortho'`），对数压缩动态范围使高频成分更显著。

**差异分支**：直接计算空间特征的绝对差异：

$$D_i = |X_i^{T_1} - X_i^{T_2}|$$

**融合与精炼**：将 5 组特征（\(X_i^{T_1}, F_i^{T_1}, X_i^{T_2}, F_i^{T_2}, D_i\)）沿通道轴拼接，经 1×1 卷积压缩至 \(C_i\) 通道，再通过 CBAM 的通道注意力和空间注意力依次精炼：

$$X_i^{\text{fused}} = \text{CBAM}(\text{Conv}_{1\times1}(\text{Concat}(X_i^{T_1}, F_i^{T_1}, X_i^{T_2}, F_i^{T_2}, D_i)))$$

> 💡 关键：频域特征对光照变化具有鲁棒性（光照主要影响低频分量），而高频分量保留了真实的结构变化信息，有效抑制伪变化。

##### 核心机制三：变化引导注意力（CGA）

BCD 解码器在每个尺度输出中间变化概率图 \(CM_i\)，CGA 将其作为软注意力门控施加于 SCD 解码器的输入特征：

$$\widehat{X}_i^{T_j} = X_i^{T_j} \odot \sigma(CM_i)$$

其中 \(\sigma\) 为 sigmoid 函数。这一简洁设计使 SCD 解码器自动聚焦于可能发生变化的区域，抑制无关背景的干扰。

> ⚠️ 注意：CGA 是轻量级设计（仅一次 sigmoid + 逐元素乘法），几乎不增加计算开销，但消融实验表明移除 CGA 后 Fscd 下降 2.17%。

##### 核心机制四：Separated Kappa (SeK) 损失

SeK 指标仅在变化区域内评估语义分类的一致性，论文将其转化为可微损失：

$$\text{SeK} = \exp(\text{IoU}_2 - 1) \cdot \frac{\hat{\rho} - \hat{\eta}}{1 - \hat{\eta}}$$

其中：
- \(\text{IoU}_2\) 为变化类的 IoU（排除无变化类）
- \(\hat{\rho}\) 为变化区域内的观测一致性比例
- \(\hat{\eta}\) 为随机一致性期望

最终损失函数为：

$$\mathcal{L} = \mathcal{L}_{\text{CE}}^{\text{BCD}} + \mathcal{L}_{\text{CE}}^{T_1} + \mathcal{L}_{\text{CE}}^{T_2} + \lambda_1 \mathcal{L}_{\text{mIoU}} + \lambda_2 \mathcal{L}_{\text{SeK}}$$

> 💡 关键：SeK 损失专门奖励模型在变化区域内的语义正确性，对少数类转换（如 water→building）特别有效，使模型在稀有类别上的噪声从 8%+ 降至 4.2%。

##### 实验结果对比

| 方法 | SECOND OA | SECOND Fscd | SECOND SeK | Landsat OA | Landsat Fscd | Landsat SeK |
|------|-----------|-------------|------------|------------|--------------|-------------|
| Bi-SRNet (CNN) | 87.84% | 62.61% | 23.22% | 93.80% | 82.01% | 44.27% |
| TED (CNN) | 87.39% | 60.34% | 22.17% | 94.39% | 83.63% | 48.33% |
| ScanNet (Transformer) | 87.86% | 63.66% | 23.94% | 96.04% | 85.62% | 52.63% |
| ChangeMamba (Mamba) | 88.12% | 64.03% | 24.11% | 96.08% | 86.61% | 53.66% |
| **Mamba-FCS** | **88.62%** | **65.78%** | **25.50%** | **96.25%** | **89.27%** | **60.26%** |

在 Landsat-SCD 上，Mamba-FCS 的 SeK 指标比 ChangeMamba 提升 **6.6 个百分点**，表明其在变化区域语义分类上的显著优势。

##### 与 ChangeMamba 的区别

| 维度 | ChangeMamba | Mamba-FCS |
|------|-------------|-----------|
| 特征融合 | 仅空间域差异 | 空间+频域+差异三路融合 |
| BCD-SCD 关联 | 独立解码 | CGA 显式引导 |
| 损失函数 | CE + Dice | CE + mIoU + SeK |
| 高频变化感知 | 无 | FFT2 log-amplitude |

#### 🧪 练习题

```yaml
question: "Mamba-FCS 中联合时空-频率融合机制使用 FFT2 的主要目的是什么？"
options:
  - "降低模型计算复杂度"
  - "捕获高频成分（边缘/纹理变化）并抑制光照伪变化"
  - "将特征从空间域转换到频域以减少特征维度"
  - "替代 CBAM 注意力机制进行特征选择"
answer: 1
explain: "FFT2 提取对数幅度频谱，高频分量对应边缘和纹理等结构变化，而光照变化主要影响低频分量，因此频域特征能有效区分真实变化与光照伪变化。"
```