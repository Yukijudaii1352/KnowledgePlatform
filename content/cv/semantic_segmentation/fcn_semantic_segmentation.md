---
id: fcn_semantic_segmentation
title: "Fully Convolutional Networks for Semantic Segmentation"
authors: "Jonathan Long, Evan Shelhamer, Trevor Darrell"
year: 2015
venue: "CVPR 2015"
arxiv_id: "1411.4038"
tldr: "首次提出全卷积网络(FCN)用于语义分割，将分类网络的全连接层转换为卷积层实现任意尺寸输入的密集像素预测，并通过skip architecture融合多尺度特征实现精细分割。"
tags: ["semantic_segmentation", "fully_convolutional_network", "dense_prediction", "skip_connection", "transfer_learning"]
---

# Fully Convolutional Networks for Semantic Segmentation

## 一句话总结

本文提出全卷积网络(FCN)，通过将分类CNN的全连接层转为卷积层、使用反卷积进行上采样、并设计skip architecture融合多尺度特征，首次实现了端到端、像素到像素的语义分割，在PASCAL VOC 2012上达到62.2% mIoU，相比当时最优方法提升20%。

## 研究动机与贡献

### 研究动机

- 传统语义分割方法依赖手工特征或分块分类(patch-based)，无法实现真正的端到端像素级预测
- 分类CNN(如AlexNet、VGG、GoogLeNet)在图像识别上取得巨大成功，但其全连接层限制了输入尺寸且丢失空间信息
- 已有的密集预测方法(如R-CNN、SDS)需要复杂的后处理流程(proposals、refinement)，推理速度慢

### 核心贡献

1. **全卷积化思想**：首次系统性地将分类网络改造为全卷积网络，使其能接受任意尺寸输入并输出对应空间尺寸的密集预测
2. **Skip Architecture**：提出跳跃连接结构，融合深层语义信息与浅层空间细节(FCN-32s → FCN-16s → FCN-8s)，逐步精细化分割结果
3. **迁移学习范式**：证明了从ImageNet预训练分类模型微调到分割任务的有效性，建立了"预训练+微调"的语义分割标准范式
4. **端到端训练**：实现了从输入图像到像素级标签的完全端到端学习，无需任何后处理

## 方法详解

### 整体架构

FCN的核心思想是将传统分类CNN中的全连接层替换为卷积层，使网络能够处理任意尺寸的输入图像并输出相应空间分辨率的分割图。

![FCN Architecture](https://ar5iv.labs.arxiv.org/html/1411.4038/assets/x1.png)
*图1：FCN将分类网络转化为全卷积网络，实现密集预测。*

### 全连接层→卷积层转换

对于一个分类网络(如VGG16)，其最后三个全连接层(fc6: 4096, fc7: 4096, fc8: 1000)可以等价地转换为卷积层：
- fc6 → 7×7卷积，4096通道
- fc7 → 1×1卷积，4096通道  
- fc8 → 1×1卷积，C通道(C为分割类别数，PASCAL VOC为21)

这种转换保持了网络的功能等价性，同时使网络能接受任意尺寸输入。对于分类网络，输出为空间热力图(heatmap)而非单一向量。

![Convolutionalization](https://ar5iv.labs.arxiv.org/html/1411.4038/assets/x2.png)
*图2：将全连接层视为覆盖整个输入区域的卷积，实现全卷积化。*

### 上采样(Deconvolution/Bilinear Interpolation)

由于VGG16经过5次2×下采样(pooling)，输出特征图的空间分辨率为输入的1/32。为恢复到原始分辨率，使用**转置卷积(反卷积)**进行上采样：

- 反卷积层的参数初始化为双线性插值权重
- 在训练中可学习(但实验表明固定双线性插值已足够好)
- 一步从1/32上采样到原始分辨率(FCN-32s)

### Skip Architecture (核心创新)

FCN-32s的输出过于粗糙(32像素步长)。为解决此问题，提出skip architecture逐步融合多尺度信息：

![Skip Architecture](https://ar5iv.labs.arxiv.org/html/1411.4038/assets/x3.png)
*图3：Skip Architecture示意图。实线为FCN-32s，虚线为FCN-16s，点线为FCN-8s。*

**FCN-32s**：直接将最终预测层(stride 32)上采样32倍到原始分辨率

**FCN-16s**：
1. 对最终预测层进行2×上采样
2. 在pool4层(stride 16)添加1×1卷积得到预测
3. 将两者逐元素相加
4. 对融合结果上采样16倍到原始分辨率

**FCN-8s**：
1. 在FCN-16s基础上，对融合结果再进行2×上采样
2. 在pool3层(stride 8)添加1×1卷积得到预测
3. 将三者逐元素相加
4. 对融合结果上采样8倍到原始分辨率

### 训练策略

- **损失函数**：逐像素多项式逻辑回归损失(per-pixel multinomial logistic loss)
- **优化器**：SGD with momentum (0.9)
- **学习率**：VGG16基础为10⁻⁴，固定学习率
- **权重衰减**：5×10⁻⁴ 或 2×10⁻⁴
- **Batch size**：20张图像
- **初始化**：分类层零初始化，其余从ImageNet预训练权重初始化
- **数据增强**：未使用(原文未提及显著的数据增强)

### 关键设计细节

- 忽略ground truth中标记为ambiguous或difficult的像素
- 分类评分层使用1×1卷积，通道数为类别数(21 for PASCAL VOC)
- 反卷积层参数可学习但初始化为双线性插值
- Skip连接中的1×1卷积层零初始化，使得初始时网络等价于粗糙版本

## 实验与结果

### 数据集与评估指标

**数据集**：
- PASCAL VOC 2011/2012 (20类+背景，训练/验证/测试)
- NYUDv2 (40类，795训练/654测试，RGB-D)
- SIFT Flow (33语义类+3几何类，2688张图)

**评估指标**：
- Pixel Accuracy (像素准确率)
- Mean Accuracy (类别平均准确率)
- Mean IU (平均交并比，主要指标)
- Frequency Weighted IU (频率加权交并比)

### 主要结果

#### PASCAL VOC (Table 3)

| 方法 | VOC2011 mIoU | VOC2012 mIoU | 推理时间 |
|------|:---:|:---:|:---:|
| R-CNN | 47.9 | - | - |
| SDS | 52.6 | 51.6 | ~50s |
| **FCN-8s** | **62.7** | **62.2** | **~175ms** |

FCN-8s相比SDS实现了**20%的相对提升**，推理速度快**286倍**。

#### 架构对比 (Table 1, PASCAL VOC 2011 val)

| 模型 | mIoU | 推理时间 | 参数量 |
|------|:---:|:---:|:---:|
| FCN-AlexNet | 39.8 | 50ms | 57M |
| FCN-VGG16 | 56.0 | 210ms | 134M |
| FCN-GoogLeNet | 42.5 | 59ms | 6M |

VGG16作为backbone显著优于其他架构。

#### Skip Architecture消融 (Table 2, PASCAL VOC 2011 val)

| 模型 | Pixel Acc. | Mean Acc. | Mean IU | F.W. IU |
|------|:---:|:---:|:---:|:---:|
| FCN-32s-fixed | 83.0 | 59.7 | 45.4 | 72.0 |
| FCN-32s | 89.1 | 73.3 | 59.4 | 81.4 |
| FCN-16s | 90.0 | 75.7 | 62.4 | 83.0 |
| FCN-8s | 90.3 | 75.9 | 62.7 | 83.2 |

Skip architecture从FCN-32s到FCN-8s带来3.3% mIoU的提升。

#### NYUDv2 (Table 4)

| 模型 | Pixel Acc. | Mean IU |
|------|:---:|:---:|
| Gupta et al. | 60.3 | 28.6 |
| FCN-32s RGB | 60.0 | 29.2 |
| FCN-16s RGB-HHA | 65.4 | 34.0 |

#### SIFT Flow (Table 5)

| 模型 | Pixel Acc. | Mean Acc. | Mean IU | Geom. Acc. |
|------|:---:|:---:|:---:|:---:|
| Farabet et al. (best) | 78.5 | 29.6 | - | - |
| Pinheiro et al. | 77.7 | 29.8 | - | - |
| **FCN-16s** | **85.2** | **51.7** | **39.5** | **94.3** |

### 训练细节

- 训练在NVIDIA Tesla K40c上进行
- FCN-VGG16推理时间约210ms (500×500输入)
- 从分类到分割的微调需要至少175个epoch收敛
- FCN-16s和FCN-8s采用stage-wise训练：先训练FCN-32s，再逐步添加skip连接

## 关键图表

### 图3：Skip Architecture

![Skip Architecture](https://ar5iv.labs.arxiv.org/html/1411.4038/assets/x3.png)

**解读**：这是本文最核心的图示。展示了FCN-32s(实线)、FCN-16s(虚线)、FCN-8s(点线)三种架构。通过将高层粗糙预测与低层精细特征融合，逐步提升分割精度。pool4提供stride-16的预测，pool3提供stride-8的预测，与最终层的stride-32预测相结合。

### 图4：分割精细化效果

![Refinement](https://ar5iv.labs.arxiv.org/html/1411.4038/assets/x4.png)

**解读**：直观展示了从FCN-32s到FCN-16s再到FCN-8s的分割精细化过程。FCN-32s输出粗糙块状，FCN-16s边界更清晰，FCN-8s最接近ground truth。

### 图5：定性结果对比

![Results](https://ar5iv.labs.arxiv.org/html/1411.4038/assets/x5.png)

**解读**：展示了FCN-8s在PASCAL VOC上的分割结果，与SDS方法对比。FCN能恢复精细结构、分离紧密交互的物体、对遮挡具有鲁棒性。

## 优缺点分析

### 优点

1. **开创性框架**：首次实现端到端像素级语义分割，奠定了后续所有基于CNN的分割方法的基础
2. **简洁优雅**：架构设计简单直观，全卷积化思想具有很强的通用性
3. **高效推理**：相比SDS快286倍(175ms vs 50s)，实现了实时分割的可能
4. **灵活性强**：可接受任意尺寸输入，适用于不同分辨率的图像
5. **迁移学习**：证明了预训练分类模型对分割任务的巨大价值

### 缺点

1. **分辨率损失**：即使FCN-8s，最终仍是8倍上采样，边界细节仍不够精细
2. **缺乏全局上下文**：没有显式建模全局上下文信息，对大物体的一致性预测不够好
3. **无后处理优化**：未使用CRF等后处理手段优化边界(后续DeepLab等工作补充了这一点)
4. **固定感受野**：感受野大小固定，对不同尺度物体的适应性有限
5. **参数量大**：VGG16-based FCN有134M参数，计算开销较大

### 局限性

- 对小物体和细长结构的分割效果有限
- 训练需要大量像素级标注数据
- Skip architecture的融合方式(简单相加)较为粗糙，后续工作(如U-Net的concatenation)证明了更好的融合方式

## 与相关工作对比

| 方法 | 年份 | 核心思想 | PASCAL VOC mIoU | 优势 | 劣势 |
|------|:---:|------|:---:|------|------|
| R-CNN | 2014 | Region proposals + CNN分类 | 47.9 | 目标检测强 | 非端到端，慢 |
| SDS | 2014 | Hypercolumn + region proposals | 52.6 | 多尺度特征 | 复杂流程，50s/图 |
| **FCN-8s** | **2015** | **全卷积+skip architecture** | **62.7** | **端到端，快速** | **边界粗糙** |
| DeepLab v1 | 2015 | FCN + CRF后处理 | 66.4 | 精细边界 | 需CRF后处理 |
| U-Net | 2015 | 编码器-解码器 + skip concatenation | - (医学) | 对称结构，少样本 | 专注医学图像 |

**与后续工作的关系**：
- **DeepLab系列**：在FCN基础上加入空洞卷积(dilated convolution)和CRF
- **U-Net**：采用对称编码器-解码器结构，skip connection使用concatenation而非addition
- **PSPNet**：在FCN基础上加入金字塔池化模块(PPM)获取多尺度上下文
- **SegNet**：使用编码器的池化索引(pooling indices)进行上采样

## 启发与思考

### 对领域的影响

1. **范式建立**：FCN确立了"编码器(下采样)+解码器(上采样)+skip连接"的语义分割基本范式，至今仍是主流框架的核心
2. **迁移学习标准化**：证明了ImageNet预训练→任务微调的有效性，成为CV领域的标准做法
3. **全卷积思想的泛化**：全卷积化的思想被广泛应用于目标检测(如YOLO、SSD)、实例分割(Mask R-CNN)等密集预测任务

### 技术启发

1. **多尺度特征融合**是密集预测任务的关键，后续FPN、HRNet等工作进一步发展了这一思想
2. **简单有效的上采样**：双线性插值初始化的反卷积已经足够好，过于复杂的上采样设计可能不必要
3. **端到端学习的力量**：相比复杂的多阶段pipeline，端到端训练更简洁且效果更好

### 未来方向(从2015年视角)

- 更精细的上采样和边界恢复 → 催生了DeepLab CRF、SegNet等
- 更好的多尺度上下文建模 → 催生了PSPNet、ASPP等
- 实例级分割 → 催生了Mask R-CNN等
- 轻量化分割网络 → 催生了ENet、ICNet等实时分割方法