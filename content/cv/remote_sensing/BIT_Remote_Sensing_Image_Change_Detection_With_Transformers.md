# Remote Sensing Image Change Detection With Transformers (BIT)

## 1. 元数据 (Metadata)

| 属性 | 内容 |
|------|------|
| **标题** | Remote Sensing Image Change Detection With Transformers |
| **作者** | Hao Chen, Zipeng Qi, Zhenwei Shi |
| **机构** | Image Processing Center, School of Astronautics, Beihang University, Beijing, China |
| **发表venue** | IEEE Transactions on Geoscience and Remote Sensing (TGRS), 2022 |
| **DOI** | 10.1109/TGRS.2021.3095166 |
| **ArXiv** | 2103.00208 |
| **代码** | https://github.com/justchenhao/BIT_CD |
| **关键词** | Change Detection, Transformer, Remote Sensing, Semantic Tokenizer, Bitemporal Image |

---

## 2. 研究背景 (Research Background)

### 2.1 问题定义

遥感图像变化检测（Change Detection, CD）旨在从同一地理区域不同时间获取的双时相遥感图像中识别感兴趣的变化。给定双时相图像对 $\mathbf{I}^1, \mathbf{I}^2 \in \mathbb{R}^{H \times W \times 3}$，目标是生成二值变化图 $\mathbf{M} \in \{0, 1\}^{H \times W}$，其中1表示发生了感兴趣的语义变化。

### 2.2 现有方法的局限性

1. **基于CNN的方法**：传统全卷积网络（FCN）方法（如FC-EF、FC-Siam-Di、FC-Siam-Conc）受限于卷积操作的局部感受野，难以建模全局上下文关系。这导致：
   - 对大面积变化区域检测不完整
   - 容易将外观相似但语义不同的区域误检为变化（假阳性）
   - 难以区分真实语义变化与季节差异、光照变化等伪变化

2. **基于注意力的方法**：STANet等方法虽然引入了空间-时间注意力机制，但直接在像素级特征空间中计算注意力，计算复杂度为 $O(H^2W^2)$，在高分辨率遥感图像上计算代价极高。

3. **核心挑战**：如何在保持计算效率的同时，有效建模双时相图像之间的全局时空上下文关系。

### 2.3 研究动机

作者观察到：遥感图像中感兴趣的变化通常可以用少量高层语义概念（"视觉词汇"）来描述，例如"建筑物出现"、"建筑物消失"、"背景不变"等。基于这一洞察，作者提出将密集的像素级特征压缩为紧凑的语义token，在token空间中进行高效的Transformer建模，从而避免像素级注意力的二次复杂度问题。

---

## 3. 方法论 (Methodology)

### 3.1 整体架构

BIT（Bitemporal Image Transformer）的整体流程为：

$$\text{Input Images} \xrightarrow{\text{CNN Backbone}} \text{Features} \xrightarrow{\text{Semantic Tokenizer}} \text{Tokens} \xrightarrow{\text{Transformer Encoder}} \text{Context-rich Tokens} \xrightarrow{\text{Transformer Decoder}} \text{Refined Features} \xrightarrow{\text{Differencing + Head}} \text{Change Map}$$

具体步骤：
1. **CNN骨干网络**：使用Siamese ResNet18提取双时相图像的高层特征 $\mathbf{X}^1, \mathbf{X}^2 \in \mathbb{R}^{HW \times C}$
2. **语义分词器（Semantic Tokenizer）**：将像素级特征映射为紧凑的语义token $\mathbf{T}^i \in \mathbb{R}^{L \times C}$（$L \ll HW$）
3. **Transformer编码器**：在拼接的双时相token空间中建模时空上下文
4. **Transformer解码器**：将上下文丰富的token投射回像素空间，增强特征表示
5. **预测头**：通过特征差分和分类器生成变化概率图

### 3.2 语义分词器（Semantic Tokenizer）

语义分词器是BIT的核心创新之一，负责将 $HW$ 个像素级特征压缩为 $L$ 个语义token。

**具体实现**：通过空间注意力机制实现：

$$\mathbf{T}^i = \text{Softmax}(\mathbf{X}^i \mathbf{W}_A)^\top \mathbf{X}^i \in \mathbb{R}^{L \times C}$$

其中 $\mathbf{W}_A \in \mathbb{R}^{C \times L}$ 是可学习的投影矩阵。Softmax沿空间维度操作，生成注意力图 $\mathbf{A}^i = \text{Softmax}(\mathbf{X}^i \mathbf{W}_A) \in \mathbb{R}^{HW \times L}$，每个token对应一个空间注意力图，表示该语义概念在图像中的空间分布。

**设计直觉**：变化检测中的感兴趣变化可以用少量语义概念描述（如"建筑物"、"道路"、"背景"），因此 $L$ 可以设置得很小（默认 $L=4$），大幅降低后续Transformer的计算量。

### 3.3 Transformer编码器

编码器在token空间中建模双时相之间的上下文关系。

**输入准备**：将双时相token拼接并添加可学习位置编码：

$$\mathbf{T}_{in} = [\mathbf{T}^1; \mathbf{T}^2] + \mathbf{E}_{pos} \in \mathbb{R}^{2L \times C}$$

其中 $\mathbf{E}_{pos} \in \mathbb{R}^{2L \times C}$ 是可学习的位置编码，同时编码空间位置和时间位置信息。

**多头自注意力（MSA）**：

$$\text{MSA}(\mathbf{T}_{in}) = \text{Concat}(\text{head}_1, ..., \text{head}_h)\mathbf{W}^O$$

$$\text{head}_j = \text{Att}(\mathbf{T}_{in}\mathbf{W}_j^q, \mathbf{T}_{in}\mathbf{W}_j^k, \mathbf{T}_{in}\mathbf{W}_j^v)$$

$$\text{Att}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{Softmax}\left(\frac{\mathbf{Q}\mathbf{K}^\top}{\sqrt{d}}\right)\mathbf{V}$$

其中 $\mathbf{W}_j^q, \mathbf{W}_j^k, \mathbf{W}_j^v \in \mathbb{R}^{C \times d}$，$d = C/h$，$h=8$ 为注意力头数。

**编码器层结构**：每层包含MSA和MLP，使用Pre-Norm（LayerNorm前置）和残差连接：

$$\mathbf{T}^{(l)} = \text{MSA}(\text{LN}(\mathbf{T}^{(l-1)})) + \mathbf{T}^{(l-1)}$$

$$\mathbf{T}^{(l)} = \text{MLP}(\text{LN}(\mathbf{T}^{(l)})) + \mathbf{T}^{(l)}$$

MLP由两层全连接层组成，使用GELU激活函数，隐藏层维度为 $4C$。

**关键优势**：由于 $L \ll HW$（$L=4$ vs $HW=4096$），自注意力的计算复杂度从 $O(H^2W^2)$ 降低到 $O(L^2)$，极大提升了效率。

### 3.4 Transformer解码器

解码器将上下文丰富的token投射回像素空间，增强原始特征。

**多头交叉注意力（MA）**：

$$\text{MA}(\mathbf{X}^{i,(l-1)}, \mathbf{T}_{new}^i) = \text{Concat}(\text{head}_1, ..., \text{head}_h)\mathbf{W}^O$$

$$\text{head}_j = \text{Att}(\mathbf{X}^{i,(l-1)}\mathbf{W}_j^q, \mathbf{T}_{new}^i\mathbf{W}_j^k, \mathbf{T}_{new}^i\mathbf{W}_j^v)$$

其中 Query 来自像素特征 $\mathbf{X}^i$，Key 和 Value 来自上下文丰富的token $\mathbf{T}_{new}^i$。

**设计选择**：
- 移除了原始Transformer解码器中的MSA块，避免像素间密集关系的高计算开销
- 不在解码器输入中添加位置编码（实验表明无显著增益）
- 使用Siamese结构分别处理两个时相的特征

### 3.5 预测头

获得增强后的双时相特征 $\mathbf{X}_{new}^1, \mathbf{X}_{new}^2$ 后：

1. **特征差分**：$\mathbf{X}_{diff} = |\mathbf{X}_{new}^1 - \mathbf{X}_{new}^2|$
2. **分类器**：两层MLP（$C \to C \to 2$）+ Softmax，生成变化概率图 $\mathbf{P} \in [0,1]^{H \times W \times 2}$
3. **上采样**：双线性插值恢复到原始分辨率

### 3.6 CNN骨干网络细节

使用修改版ResNet18：
- **ResNet18_S5**（默认）：使用全部5个stage，将最后两个stage的stride改为1，添加逐点卷积（输出通道 $C=32$）降维，双线性插值上采样，最终下采样因子为4
- **ResNet18_S4**：仅使用前4个stage
- **ResNet18_S3**：仅使用前3个stage

### 3.7 训练策略

- **损失函数**：二元交叉熵损失（BCE Loss）
- **优化器**：SGD，momentum=0.99，weight decay=0.0005
- **学习率**：初始lr=0.01（LEVIR-CD/WHU-CD）或0.1（DSIFN-CD），线性预热+余弦退火
- **数据增强**：随机翻转和旋转
- **训练轮数**：200 epochs（LEVIR-CD/WHU-CD），100 epochs（DSIFN-CD）
- **Batch size**：8
- **输入尺寸**：256×256

---

## 4. 实验设计 (Experimental Design)

### 4.1 数据集

| 数据集 | 图像对数 | 分辨率 | 变化类型 | 划分方式 |
|--------|---------|--------|---------|---------|
| **LEVIR-CD** | 637对 | 1024×1024 (0.5m) | 建筑物变化 | 训练/验证/测试: 7120/1024/2048 (裁剪为256×256) |
| **WHU-CD** | 1对 | 32507×15354 (0.075m) | 建筑物变化 | 训练/验证/测试: 6096/762/762 (裁剪为256×256) |
| **DSIFN-CD** | 3940对 | 512×512 | 多类变化(道路/建筑/植被/水体等) | 训练/验证/测试: 3940/340/48 (裁剪为256×256) |

### 4.2 评估指标

$$\text{Precision} = \frac{TP}{TP + FP}, \quad \text{Recall} = \frac{TP}{TP + FN}$$

$$\text{F1} = \frac{2 \times \text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}, \quad \text{IoU} = \frac{TP}{TP + FN + FP}$$

$$\text{OA} = \frac{TP + TN}{TP + TN + FN + FP}$$

### 4.3 对比方法

| 方法 | 类型 | 特点 |
|------|------|------|
| FC-EF | 图像级融合 | 拼接双时相图像输入FCN |
| FC-Siam-Di | 特征级融合 | Siamese FCN + 特征差分 |
| FC-Siam-Conc | 特征级融合 | Siamese FCN + 特征拼接 |
| DTCDSCN | 多尺度特征拼接 | 深度Siamese FCN + 通道/空间注意力 |
| STANet | 度量学习 | Siamese FCN + 空间-时间注意力 |
| IFNet | 多尺度特征拼接 | 通道/空间注意力 + 深监督 |
| SNUNet | 多尺度特征拼接 | Siamese NestedUNet + 通道注意力 + 深监督 |

---

## 5. 结果与分析 (Results and Analysis)

### 5.1 主要定量结果

**表1：三个测试集上的对比结果（%）**

| 方法 | LEVIR-CD (Pre./Rec./F1/IoU/OA) | WHU-CD (Pre./Rec./F1/IoU/OA) | DSIFN-CD (Pre./Rec./F1/IoU/OA) |
|------|------|------|------|
| FC-EF | 86.91/80.17/83.40/71.53/98.39 | 71.63/67.25/69.37/53.11/97.61 | 72.61/52.73/61.09/43.98/88.59 |
| FC-Siam-Di | 89.53/83.31/86.31/75.92/98.67 | 47.33/77.66/58.81/41.66/95.63 | 59.67/65.71/62.54/45.50/86.63 |
| FC-Siam-Conc | **91.99**/76.77/83.69/71.96/98.49 | 60.88/73.58/66.63/49.95/97.04 | 66.45/54.21/59.71/42.56/87.57 |
| DTCDSCN | 88.53/86.83/87.67/78.05/98.77 | 63.92/82.30/71.95/56.19/97.42 | 53.87/**77.99**/63.72/46.76/84.91 |
| STANet | 83.81/**91.00**/87.26/77.40/98.66 | 79.37/**85.50**/82.32/69.95/98.52 | 67.71/61.68/64.56/47.66/88.49 |
| IFNet | 94.02/82.93/88.13/78.77/98.87 | **96.91**/73.19/83.40/71.52/98.83 | 67.86/53.94/60.10/42.96/87.83 |
| SNUNet | 89.18/87.17/88.16/78.83/98.82 | 85.60/81.49/83.50/71.67/98.71 | 60.60/72.89/66.18/49.45/87.34 |
| Base (无BIT) | 88.24/86.91/87.57/77.89/98.76 | 81.80/81.42/81.61/68.93/98.53 | **73.30**/48.65/58.48/41.32/88.26 |
| **BIT** | 89.24/89.37/**89.31**/**80.68**/**98.92** | **86.64**/81.48/**83.98**/**72.39**/**98.75** | 68.36/70.18/**69.26**/**52.97**/**89.41** |

**关键发现**：
- BIT在所有三个数据集上的F1和IoU均取得最优，分别超过次优方法约1.15/0.48/3.08个F1百分点
- 相比STANet，BIT在三个数据集上F1分别提升2.05/1.66/4.70个百分点
- 即使使用简单的ResNet18骨干（无FPN或UNet结构），BIT仍优于使用复杂解码器的方法

### 5.2 模型效率分析

| 方法 | 参数量(M) | FLOPs(G) | LEVIR-CD F1 |
|------|-----------|----------|-------------|
| STANet | 16.93 | 10.07 | 87.26 |
| IFNet | 35.71 | 82.35 | 88.13 |
| SNUNet | 12.03 | 54.83 | 88.16 |
| **BIT** | **3.55** | **8.95** | **89.31** |

**关键发现**：
- BIT仅需3.55M参数和8.95G FLOPs，参数量仅为STANet的1/5、IFNet的1/10、SNUNet的1/3
- BIT_S4（基于ResNet18_S4的BIT）在F1上超过Base_S5（无BIT的ResNet18_S5）1.7/2.4/10.8个百分点，同时参数量和计算量均为后者的1/3
- 证明了在token空间中进行Transformer建模比堆叠更多CNN层更加高效有效

### 5.3 消融实验

#### 5.3.1 Transformer编码器（TE）消融

移除TE后，模型性能在三个数据集上均出现下降，表明在token空间中建模双时相上下文关系对变化检测至关重要。

#### 5.3.2 Transformer解码器（TD）消融

将TD替换为简单的token扩展+求和模块后，性能一致下降。交叉注意力提供了一种优雅的方式，通过建模像素与上下文丰富token之间的关系来增强原始特征。

#### 5.3.3 位置编码（PE）消融

| 配置 | LEVIR-CD F1 | WHU-CD F1 | DSIFN-CD F1 |
|------|-------------|-----------|-------------|
| 无PE（基线） | 88.93 | 82.63 | 67.62 |
| TE中加PE | **89.31** | **83.98** | **69.26** |
| TD中加PE | 88.89 | 82.96 | 67.81 |
| TE+TD中加PE | 89.16 | 83.62 | 68.45 |

**结论**：在TE中添加PE有显著提升（编码时空位置信息对上下文建模关键），在TD中添加PE无明显增益（因为token已经是高度抽象的，不含空间结构信息）。

#### 5.3.4 Token长度分析

| Token长度L | LEVIR-CD F1 | WHU-CD F1 | DSIFN-CD F1 |
|------------|-------------|-----------|-------------|
| 2 | 89.12 | 83.36 | 68.07 |
| **4** | **89.31** | **83.98** | **69.26** |
| 8 | 89.10 | 83.74 | 68.57 |
| 16 | 88.89 | 83.15 | 67.84 |
| 32 | 88.63 | 82.87 | 67.23 |

**结论**：$L=4$ 为最优。过少（$L=2$）会丢失有用信息，过多（$L>4$）引入冗余token反而影响性能。验证了"变化可由少量语义概念描述"的假设。

#### 5.3.5 Transformer深度分析

- **编码器深度**：增加编码器层数无显著提升，1层即可充分建模token间关系
- **解码器深度**：性能与解码器深度正相关，最优为8层
- **最终配置**：编码器1层 + 解码器8层

### 5.4 可视化分析

#### Token可视化
- 不同token关注不同的语义区域：在LEVIR-CD和WHU-CD（建筑物变化）中，token主要关注建筑物像素；在DSIFN-CD（多类变化）中，不同token分别关注建筑物、农田、水体等
- 有趣的是，tokenizer还能隐式学习到建筑物周围的上下文（如阴影），尽管训练时未提供此类显式监督

#### 网络可视化
- 原始特征 $\mathbf{X}^i$ 包含建筑物和边缘等高层概念
- 增强后的特征 $\mathbf{X}_{new}^i$ 更加聚焦于变化相关的语义区域
- 特征差分图清晰地突出了变化区域

### 5.5 定性分析

BIT相比其他方法的优势：
1. **减少假阳性**：通过全局上下文建模，能区分外观相似但语义不同的区域（如游泳池 vs 建筑物）
2. **抗伪变化**：能有效处理季节差异、光照变化等引起的非语义变化
3. **完整检测**：对大面积变化区域能生成更完整的检测结果，得益于全局感受野

---

## 6. 贡献与影响 (Contributions and Impact)

### 6.1 核心贡献

1. **首次将Transformer引入遥感变化检测**：提出BIT框架，开创了Transformer在变化检测领域的应用，为后续大量工作奠定了基础

2. **语义分词器（Semantic Tokenizer）**：创新性地提出将像素级特征压缩为紧凑语义token的方法，巧妙解决了Transformer在高分辨率图像上的二次复杂度问题。这一思想（token化 → token空间建模 → 投射回像素空间）具有广泛的适用性

3. **高效的时空上下文建模**：通过在token空间中拼接双时相token进行自注意力计算，以极低的计算代价实现了全局时空上下文建模

4. **轻量高效**：仅3.55M参数即超越了参数量数倍于己的方法，证明了"紧凑表示 + Transformer建模"范式的有效性

### 6.2 学术影响

- 该论文是遥感变化检测领域引入Transformer的开创性工作之一
- 提出的token化策略启发了后续大量视觉Transformer工作中的token压缩/池化方法
- 代码开源，成为变化检测领域的重要基线方法

---

## 7. 局限性 (Limitations)

### 7.1 作者讨论的局限性

1. **骨干网络简单**：仅使用ResNet18作为骨干，未探索更强大的预训练骨干（如ResNet50、Swin Transformer等）对性能的影响

2. **单尺度特征**：仅使用单一尺度的高层特征，未利用多尺度特征融合（如FPN、UNet），可能在小目标检测上存在不足

### 7.2 潜在局限性

1. **Token数量固定**：$L=4$ 对所有场景使用相同数量的token，可能无法适应变化复杂度差异大的场景。对于包含大量不同类型变化的复杂场景，4个token可能不足以表达所有语义概念

2. **二值变化检测**：仅处理二值变化检测（变/不变），未扩展到语义变化检测（识别变化类型）

3. **数据集规模有限**：实验数据集规模相对较小（如WHU-CD仅1对大图），未在更大规模数据集上验证泛化能力

4. **Tokenizer的信息瓶颈**：将 $HW$ 个特征压缩为 $L$ 个token（压缩比约1000:1），可能存在信息损失，特别是对于细粒度的边界变化

5. **缺乏与ViT骨干的对比**：论文发表时ViT已经提出，但未探索使用ViT作为骨干网络的可能性

6. **位置编码方案**：使用简单的可学习位置编码，未探索相对位置编码等更先进的方案对性能的影响

---

## 附录：关键超参数配置

| 参数 | 值 |
|------|-----|
| 特征维度 C | 32 |
| Token长度 L | 4 |
| 注意力头数 h | 8 |
| 编码器层数 $N_E$ | 1 |
| 解码器层数 $N_D$ | 8 |
| MLP隐藏维度 | 4C = 128 |
| 下采样因子 | 4 |
| 输入尺寸 | 256×256 |
| 总参数量 | 3.55M |
| FLOPs | 8.95G |