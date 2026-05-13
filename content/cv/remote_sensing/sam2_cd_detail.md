### SAM2-CD: SAM2 变化检测适配

```yaml
id: sam2_cd
name: SAM2-CD
full_name: "SAM2 变化检测适配"
year: 2026
org: Various Institutions
paper_url: "https://www.researchgate.net/publication/389465432"
arxiv_url: "https://arxiv.org/abs/2509.21894"
category: semantic_segmentation
parent: segformer_rs
motivation: "SAM2适配多时相变化检测达85.51%IoU"
```

#### 📝 一句话总结

LG-CD 提出了一种语言引导的变化检测模型，利用 SAM2 视觉基础模型作为特征提取器，并通过多层适配器（Adapter）、文本融合注意力模块（TFAM）和视觉-语义融合解码器（V-SFD）将自然语言提示与多时相遥感图像深度融合，在 LEVIR-CD、WHU-CD、SYSU-CD 三大基准上均达到 SOTA 水平。

#### 🎯 核心要点

- **SAM2 编码器冻结 + 多层适配器微调**：使用 SAM2 的 Hiera 层级视觉 Transformer 编码器提取 4 级多尺度特征（4×/8×/16×/32× 下采样），编码器参数冻结，仅通过轻量 1×1 Conv + BN + ReLU 适配器进行任务适配
- **双时相特征通道拼接**：对两个时相图像分别经过共享 SAM2 编码器 + 独立适配器后，沿通道维度拼接生成融合全局特征图
- **CLIP 文本编码**：使用 CLIP 文本编码器提取词级嵌入 \(f_w\) 和全局文本嵌入 \(f_g\)，为变化检测提供语义引导
- **文本融合注意力模块（TFAM）**：以视觉特征为 Query、词嵌入为 Key/Value 的多头交叉注意力机制，并引入全局空间学习层增强空间感知
- **视觉-语义融合解码器（V-SFD）**：通过自注意力（MSA）和交叉注意力（MCA）深度融合多模态信息，结合 FPN 多尺度聚合，最终通过相似度计算生成变化掩码
- **混合损失函数**：交叉熵损失 + IoU 损失 + Dice 损失的加权组合（权重 α=0.2, β=0.1）
- **三大数据集 SOTA**：LEVIR-CD F1=90.35% / IoU=83.36%，WHU-CD F1=91.83% / IoU=90.47%，SYSU-CD F1=80.48% / IoU=70.59%

#### 🔬 深入细节

##### 核心架构示意图

![LG-CD 整体流程图](https://arxiv.org/html/2509.21894v1/x1.png)
*图：LG-CD 整体流程。双时相遥感图像经 SAM2 编码器提取多尺度特征，通过 Adapter 适配后，TFAM 融合文本特征，V-SFD 深度融合视觉与语义信息生成变化检测掩码。*

![TFAM 模块结构](https://arxiv.org/html/2509.21894v1/x2.png)
*图：文本融合注意力模块（TFAM）结构，通过多头交叉注意力将文本语义注入视觉特征。*

##### 算法伪代码

```python
# LG-CD 核心推理流程
def lg_cd_forward(I1, I2, text_prompt):
    # 1. SAM2 编码器提取多尺度特征 (冻结参数)
    f1 = [sam2_encoder.stage_i(I1) for i in range(4)]  # 4级: H/4, H/8, H/16, H/32
    f2 = [sam2_encoder.stage_i(I2) for i in range(4)]
    
    # 2. 适配器微调 + 通道拼接
    fv = [concat(adapter_i(f1[i]), adapter_i(f2[i]), dim='channel') for i in range(4)]
    
    # 3. CLIP 文本编码
    fw, fg = clip_text_encoder(text_prompt)  # 词级嵌入, 全局嵌入
    
    # 4. TFAM: 文本融合注意力
    for i in range(4):
        fv_hat = MultiHeadCrossAttn(Q=fv[i], K=fw, V=fw)
        spatial_attn = GlobalSpatialLayer(fv_hat)
        f_fusion[i] = spatial_attn * fv_hat
    
    # 5. V-SFD: 视觉-语义融合解码器
    for i in range(4):
        f_fusion[i] = flatten(f_fusion[i]) + pos_sin  # 加正弦位置编码
        f_msa = MSA(concat(f_fusion[i], fw))           # 自注意力
        f_mca = MCA(Q=f_msa, K=fw, V=fw)              # 交叉注意力
    fV = FPN(f_mca_all_scales)                          # 多尺度聚合
    fL = MSA(MCA(Q=fg, K=fV, V=fV))                    # 全局语义引导
    
    # 6. 分割头: 相似度计算 + 上采样 + 二值化
    response_map = fV @ fL.T
    mask = binarize(upsample(response_map))
    return mask
```

##### 动机与背景

遥感变化检测（RSCD）旨在通过分析同一区域不同时期的遥感图像来检测地表变化。传统深学习方法主要依赖单模态视觉信息，存在以下瓶颈：

1. **CNN 局部建模局限**：卷积网络难以捕获遥感图像中的长距离上下文信息
2. **数据稀缺与标注昂贵**：遥感变化检测数据获取和标注成本高
3. **单模态泛化不足**：仅依赖视觉信息的模型在复杂场景下泛化能力有限

> 💡 关键：LG-CD 的核心思想是利用自然语言提示引导模型关注特定变化区域，将"检测什么变化"的语义信息显式注入视觉特征提取过程。

##### SAM2 编码器与适配器机制

SAM2 使用 **Hiera 层级视觉 Transformer** 作为图像编码器，具有以下特点：
- 采用窗口绝对位置嵌入和插值全局位置嵌入
- 通过特征金字塔网络（FPN）融合不同阶段特征
- 生成 4 级多尺度特征图：\(f^i \in \mathbb{R}^{\frac{H}{2^{(i+2)}} \times \frac{W}{2^{(i+2)}} \times C_i}\)，其中 \(i=0,1,2,3\)

适配器设计为轻量级结构：

$$f_v^i = \text{Adapter}(f_1^i) \oplus \text{Adapter}(f_2^i)$$

其中 \(\oplus\) 为通道拼接操作，每个 Adapter 由 **1×1 卷积 + BatchNorm + ReLU** 组成。这种设计确保：
- SAM2 预训练权重完全冻结，保留强大的通用视觉表征
- 仅微调少量适配器参数，实现高效的下游任务迁移

> ⚠️ 注意：多层适配器独立作用于每个尺度级别，使得不同分辨率的特征可以被独立优化。

##### 文本融合注意力模块（TFAM）

TFAM 的核心是将文本语义信息注入视觉特征。具体流程：

**Step 1: CLIP 文本编码**

$$f_w, f_g = \text{CLIP}_{text}(T)$$

其中 \(f_w\) 为词级嵌入（捕获细粒度语义），\(f_g\) 为全局文本嵌入（表征整体语义意图）。

**Step 2: 多头交叉注意力**

$$\widehat{f_v} = \text{softmax}\left(\frac{W_q(f_v^i)^T W_k(f_w)}{\sqrt{C^i}}\right) W_v(f_w)^T$$

视觉特征作为 Query 查询文本中的相关语义信息，实现"文本告诉视觉应该关注哪里"。

**Step 3: 全局空间学习层**

通过卷积生成空间注意力图，与融合视觉特征逐元素相乘，增强空间感知能力，生成最终融合特征 \(f_{fusion}^i\)。

##### 视觉-语义融合解码器（V-SFD）

V-SFD 是 LG-CD 的核心解码组件，分为两条路径：

**视觉路径**：
1. 展平融合特征并添加正弦位置编码：\(f_{fusion}^i = \text{Flatten}(f_{fusion}^i) + \text{Pos}_{sin}\)
2. 将视觉特征与词嵌入拼接后进行自注意力：\(f_{MSA}^i = \text{MSA}(f_{fusion}^i \oplus f_w)\)
3. 交叉注意力进一步对齐：\(f_{MCA}^i = \text{MCA}(f_{MSA}^i, f_w)\)
4. FPN 多尺度聚合：\(f_V = \text{FPN}(f_{MCA}^i)\)

**语义路径**：
$$f_L = \text{MSA}(\text{MCA}(f_g, f_V))$$

全局文本嵌入 \(f_g\) 作为 Query，视觉特征 \(f_V\) 作为 Key/Value，将全局语义信息融入视觉表征。

最终通过矩阵乘法计算响应图，双线性插值上采样后二值化得到变化掩码。

##### 损失函数设计

采用三种损失的加权组合：

$$L_{total} = \frac{1}{n}\sum_{i=1}^{n}\left[(1-\alpha-\beta)L_{CE}(Y_p^i, Y_t) + \alpha \cdot L_{IoU}(Y_p^i, Y_t) + \beta \cdot L_{Dice}(Y_p^i, Y_t)\right]$$

其中 \(n=6\)（模型默认输出 6 个预测概率图），\(\alpha=0.2\)，\(\beta=0.1\)。三种损失互补：
- **交叉熵损失**：逐像素分类优化
- **IoU 损失**：直接优化区域重叠度
- **Dice 损失**：缓解类别不平衡问题

##### 与传统方法的区别

| 特性 | 传统 CNN 方法 (FC-EF/SNUNet) | Transformer 方法 (BIT/ChangeFormer) | LG-CD (本文) |
|------|------|------|------|
| 特征提取器 | 随机初始化 CNN | 预训练 ViT | **冻结 SAM2 + 适配器** |
| 上下文建模 | 局部感受野 | 全局自注意力 | **全局注意力 + 文本引导** |
| 模态 | 单模态视觉 | 单模态视觉 | **视觉-语言多模态** |
| 变化类型指定 | 不可控 | 不可控 | **文本提示可控** |

> 💡 关键：LG-CD 的最大创新在于引入语言模态——通过自然语言提示，用户可以指定关注的变化类型（如"建筑物变化"），模型会自动聚焦相应区域，实现可控的变化检测。

##### 消融实验关键发现

| 配置 | LEVIR-CD IoU | WHU-CD IoU |
|------|------|------|
| ResNet + FPN（基线） | 70.65% | 65.40% |
| Hiera 编码器 + FPN | 74.36% (+3.71) | 71.28% (+5.88) |
| + TFAM | 78.49% (+4.13) | 73.89% (+2.61) |
| + V-SFD（完整 LG-CD） | **83.36%** (+4.87) | **90.47%** (+16.58) |

每个模块都带来显著提升，其中 V-SFD 在 WHU-CD 上贡献了最大增益（+16.58%），证明视觉-语义深度融合对变化检测的关键作用。

#### 🧪 练习题

```yaml
question: "LG-CD 中 TFAM 模块的多头交叉注意力机制中，Query 和 Key/Value 分别来自哪里？"
options:
  - "Query 来自文本嵌入，Key/Value 来自视觉特征"
  - "Query 来自视觉特征，Key/Value 来自词级文本嵌入"
  - "Query 和 Key/Value 都来自视觉特征（自注意力）"
  - "Query 来自全局文本嵌入，Key/Value 来自词级文本嵌入"
answer: 1
explain: "TFAM 将多尺度视觉特征作为 Query，CLIP 编码的词级嵌入 f_w 作为 Key 和 Value，通过交叉注意力从文本中提取与视觉任务相关的语义信息。"
```