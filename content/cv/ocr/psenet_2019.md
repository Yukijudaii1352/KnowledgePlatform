---
id: psenet_2019
title: "Shape Robust Text Detection with Progressive Scale Expansion Network"
authors: "Wenhai Wang, Enze Xie, Xiang Li, Wenbo Hou, Tong Lu, Gang Yu, Shuai Shao"
year: 2019
venue: "CVPR 2019"
tldr: "提出渐进式尺度扩展网络PSENet，通过从小核逐步扩展到完整文本实例的方式，解决分割方法中粘连文本实例难以分离的问题，实现任意形状文本检测"
tags: ["scene_text_detection", "segmentation", "arbitrary_shape", "curve_text", "progressive_scale_expansion"]
urls:
  arxiv: "https://arxiv.org/abs/1903.12473"
  ar5iv: "https://ar5iv.labs.arxiv.org/html/1903.12473"
---

## 一句话总结

PSENet通过为每个文本实例生成多个不同尺度的分割核(kernel)，并采用基于BFS的渐进式尺度扩展算法(PSE)从最小核逐步扩展至完整实例，在保持像素级分割精度的同时有效分离粘连文本，实现了任意形状（含弯曲）文本的鲁棒检测。

## 研究背景与动机

### 问题定义

场景文本检测需要定位自然图像中的文本实例。现有方法分为两类：
- **回归方法**（如EAST、TextBoxes）：用矩形/四边形表示文本，无法处理弯曲文本
- **分割方法**（如PixelLink）：像素级分类可处理任意形状，但难以分离相邻/粘连的文本实例

### 核心动机

![方法对比](https://ar5iv.labs.arxiv.org/html/1903.12473/assets/x1.png)
*Figure 1: (a)原图 (b)回归方法对弯曲文本检测失败 (c)朴素分割方法将3个粘连实例误合为1个 (d)PSENet成功分离4个独立文本实例*

PSENet的设计基于三个关键洞察：
1. **最小尺度核容易分离**：缩小后的文本核之间距离增大，边界远离彼此
2. **最小核不能覆盖完整文本**：需要从小核恢复到完整实例才能用于后续识别
3. **渐进扩展是高效的恢复策略**：逐步扩展确保文本实例的准确定位

![核与完整实例](https://ar5iv.labs.arxiv.org/html/1903.12473/assets/x2.png)
*Figure 2: 完整文本实例可被CRNN正确识别，但缩小的核因不完整而识别失败*

## 方法详解

### 整体架构

![整体流程](https://ar5iv.labs.arxiv.org/html/1903.12473/assets/x3.png)
*Figure 3: PSENet整体流程。左侧为FPN特征提取，右侧为特征融合与渐进式尺度扩展算法*

PSENet的整体架构包含：
1. **骨干网络**：ResNet（50/101/152）提取多尺度特征
2. **FPN特征融合**：将不同层级特征图(P2-P5)统一为256通道，上采样至相同尺寸后拼接为1024通道特征F
3. **分割头**：通过Conv(3×3)-BN-ReLU将F降至256通道，再用Conv(1×1)生成n个分割图 $S_1, S_2, ..., S_n$
4. **PSE后处理**：渐进式尺度扩展算法生成最终检测结果

### 渐进式尺度扩展算法（PSE）

![PSE算法](https://ar5iv.labs.arxiv.org/html/1903.12473/assets/x4.png)
*Figure 4: PSE算法示意。从最小核S1开始，逐步融合更大尺度核S2、S3...Sn，最终得到完整实例*

**核心思想**：为每个文本实例预测n个不同尺度的分割区域（核），从最小核开始逐步扩展：

**算法步骤**：
1. **初始化**：对最小尺度分割图 $S_1$ 使用连通域分析(CC)，得到初始的独立核集合
2. **逐步扩展**：对 $i = 2, 3, ..., n$，依次处理每个尺度的分割图 $S_i$：
   - 使用BFS从当前核的边界像素向外扩展
   - 仅合并属于 $S_i$ 中前景且未被其他实例占据的像素
   - **冲突解决**：当扩展像素已属于另一实例时，不进行合并（保持分离）
3. **输出**：最终扩展到 $S_n$（完整尺度）后得到完整文本实例

### 标签生成

![标签生成](https://ar5iv.labs.arxiv.org/html/1903.12473/assets/x5.png)
*Figure 5: 标签生成过程。通过Vatti裁剪算法按不同比例缩小原始多边形*

对于每个文本实例，使用Vatti裁剪算法生成n个不同尺度的GT核：

$$d_i = \frac{Area(p_n) \times (1 - r_i^2)}{Perimeter(p_n)}$$

其中缩放比例：
$$r_i = 1 - \frac{(1-m) \times (n-i)}{n-1}$$

- $m$：最小缩放比例（超参数）
- $n$：核的数量（超参数）
- $p_n$：原始文本多边形（最大核）

### 损失函数

总损失由文本分割损失和核分割损失组成：

$$L = \lambda \cdot L_c + (1-\lambda) \cdot L_s$$

其中 $\lambda = 0.7$。

**Dice Loss**用于处理正负样本不平衡：

$$D(S_i, G_i) = \frac{2 \sum_{x,y}(S_{i,x,y} \times G_{i,x,y})}{\sum_{x,y} S_{i,x,y}^2 + \sum_{x,y} G_{i,x,y}^2}$$

**OHEM（Online Hard Example Mining）**：对完整文本分割图 $S_n$ 采用OHEM，正负样本比1:3，忽略非文本区域中的简单负样本，使网络聚焦于困难样本。

## 实验结果

### 主要结果

#### CTW1500（弯曲文本）

| 方法 | 外部数据 | P | R | F | FPS |
|------|---------|------|------|------|-----|
| CTPN | - | 60.4 | 53.8 | 56.9 | 7.14 |
| EAST | - | 78.7 | 49.1 | 60.4 | 21.2 |
| CTD+TLOC | - | 77.4 | 69.8 | 73.4 | 13.3 |
| TextSnake | ✓ | 67.9 | 85.3 | 75.6 | - |
| **PSENet-1s** | ✓ | **84.8** | **79.7** | **82.2** | 3.9 |
| PSENet-4s | ✓ | 82.1 | 77.8 | 79.9 | 8.4 |

**PSENet在CTW1500上F值82.2%，超越TextSnake 6.6个百分点。**

#### Total-Text（弯曲文本）

| 方法 | 外部数据 | P | R | F |
|------|---------|------|------|------|
| TextSnake | ✓ | 82.7 | 74.5 | 78.4 |
| **PSENet-1s** | ✓ | **84.0** | **78.0** | **80.9** |

#### ICDAR 2015（多方向文本）

| 方法 | 外部数据 | P | R | F | FPS |
|------|---------|------|------|------|-----|
| EAST | - | 83.6 | 73.5 | 78.2 | 13.2 |
| PixelLink | - | 82.9 | 81.7 | 82.3 | 7.3 |
| TextSnake | ✓ | 84.9 | 80.4 | 82.6 | 1.1 |
| **PSENet-1s** | ✓ | **86.9** | **84.5** | **85.7** | 1.6 |

#### ICDAR 2017 MLT（多语言）

| 方法 | P | R | F |
|------|------|------|------|
| Lyu et al. | 83.8 | 55.6 | 66.8 |
| **PSENet (ResNet152)** | **75.35** | **69.18** | **72.13** |

### 速度分析

| 配置 | 分辨率 | F | backbone | head | PSE | FPS |
|------|--------|------|----------|------|-----|-----|
| PSENet-1s (R50) | 1280 | 82.2 | 50ms | 68ms | 145ms | 3.9 |
| PSENet-4s (R50) | 1280 | 79.9 | 50ms | 60ms | 10ms | 8.4 |
| PSENet-4s (R50) | 640 | 75.6 | 18ms | 20ms | 8ms | 21.65 |
| PSENet-4s (R18) | 960 | 74.3 | 10ms | 17ms | 10ms | 26.75 |

- 输出图为1/4尺寸时PSE耗时降至<10ms，FPS从3.9提升至8.4
- ResNet18骨干可达近实时27FPS，性能仍有竞争力(74.3%)

## 消融实验

![消融实验](https://ar5iv.labs.arxiv.org/html/1903.12473/assets/x6.png)
*Figure 6: 最小核尺度m和核数量n的消融研究*

### 最小核尺度 $m$ 的影响
- 固定 $n=2$，$m$ 从1变化到0.1
- $m$ 过大：无法分离粘连文本；$m$ 过小：文本行被错误拆分，训练难收敛
- 最优值：ICDAR 2015上 $m=0.4$，CTW1500上 $m=0.6$

### 核数量 $n$ 的影响
- 固定最优 $m$，$n$ 从2增至10
- $n \geq 5$ 时性能趋于稳定
- 多核优势：可准确重建尺寸差异大且相邻的文本实例

### 骨干网络深度的影响

| 骨干 | P | R | F |
|------|------|------|------|
| ResNet50 | 73.7 | 68.2 | 70.8 |
| ResNet101 | 74.8 | 68.9 | 71.7 |
| ResNet152 | 75.3 | 69.2 | 72.2 |

更深骨干带来1.4%绝对提升（IC17-MLT）。

## 优缺点分析

### 优点
1. **任意形状检测**：基于像素分割，天然支持弯曲、多方向等任意形状文本
2. **有效分离粘连文本**：渐进扩展机制从小核出发，优雅解决相邻文本粘连问题
3. **简洁统一的框架**：无需复杂的锚点设计或多阶段流程，端到端可训练
4. **灵活的速度-精度权衡**：通过调整输出分辨率(1s/4s)和骨干网络可灵活平衡
5. **泛化性强**：在弯曲(CTW1500/Total-Text)、多方向(IC15)、多语言(IC17-MLT)数据集上均SOTA

### 缺点
1. **PSE后处理速度瓶颈**：1/1输出时PSE占总推理时间50%以上(145ms)，限制实时性
2. **PSE非可微**：基于BFS的后处理无法与网络端到端联合训练
3. **超参数敏感**：最小尺度m和核数量n需要针对不同数据集调优
4. **高分辨率依赖**：在IC15/IC17-MLT等小文本数据集上需要2240px输入才能达到最优
5. **极端粘连场景**：当文本实例高度重叠时，即使最小核也可能无法完全分离

### 对后续工作的启发
- PSE思想可推广至通用实例分割（密集目标场景）
- 后续工作（如PAN、DB）在此基础上优化了后处理速度
- 核扩展策略启发了可学习的边界感知方法

## 关键引用

- **FPN**: Lin et al., "Feature Pyramid Networks for Object Detection", CVPR 2017
- **EAST**: Zhou et al., "EAST: An Efficient and Accurate Scene Text Detector", CVPR 2017
- **TextSnake**: Long et al., "TextSnake: A Flexible Representation for Detecting Text of Arbitrary Shapes", ECCV 2018
- **CTW1500**: Liu et al., "Detecting Curve Text in the Wild: New Dataset and New Solution", arXiv 2017
- **PixelLink**: Deng et al., "PixelLink: Detecting Scene Text via Instance Segmentation", AAAI 2018
- **Vatti Clipping**: Vatti, "A Generic Solution to Polygon Clipping", Communications of the ACM, 1992