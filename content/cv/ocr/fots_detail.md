### FOTS: Fast Oriented Text Spotting with a Unified Network

```yaml
id: fots
name: FOTS
full_name: 快速定向文本检测与识别统一网络 (Fast Oriented Text Spotting with a Unified Network)
year: "2018"
org: Megvii (Face++)
paper_url: "https://arxiv.org/abs/1801.01671"
category: end-to-end
parent: EAST
motivation: 通过RoIRotate实现首个实时端到端多方向文本检测与识别统一框架
```

#### 📝 一句话总结

FOTS 提出了一种端到端可训练的统一网络，通过可微分的 RoIRotate 操作将文本检测与识别融合在共享卷积特征上，在实现多方向文本检测与识别的同时达到实时速度（22.6 fps），并在 ICDAR 2015 端到端识别任务上超越此前最优方法 15% 以上。

#### 🎯 核心要点

- **端到端统一架构**：检测与识别共享 ResNet-50 + FPN 特征提取骨干，避免两阶段方法的重复计算
- **RoIRotate 操作**：核心创新，通过仿射变换从共享特征图中提取任意方向文本区域特征，支持梯度反向传播
- **检测分支**：基于 EAST 的全卷积逐像素预测（分类分数 + 4 距离 + 1 旋转角度），配合 OHEM 和 IoU Loss
- **识别分支**：CNN（VGG-like 6 层卷积 + 高度方向 max-pool）→ BiLSTM → CTC 解码器
- **实时性能**：FOTS RT 版本（ResNet-34 骨干）达到 22.6 fps，端到端识别仅比纯检测多 2.5ms 开销
- **多尺度测试**：FOTS MS 在 ICDAR 2015 端到端 Strong 词典下达到 F=84.77
- **互利训练**：识别损失的监督信号帮助检测分支学习字符级细节特征，减少漏检、误检、断裂、合并四类错误

#### 🔬 深入细节

![FOTS 整体架构图](https://arxiv.org/html/1801.01671v2/extracted/figures/pipeline.png)
*图：FOTS 端到端架构。共享特征经检测分支输出文本区域，RoIRotate 提取旋转区域特征送入识别分支。*

##### 算法伪代码

```python
# FOTS 端到端文本检测与识别流程
def FOTS_forward(image):
    # 1. 共享特征提取
    C2, C3, C4, C5 = ResNet50(image)  # 多尺度特征
    # FPN 特征融合（自顶向下 + 横向连接）
    P5 = conv1x1(C5)
    P4 = conv1x1(C4) + upsample(P5)
    P3 = conv1x1(C3) + upsample(P4)
    P2 = conv1x1(C2) + upsample(P3)  # 1/4 分辨率
    shared_features = conv3x3(P2)  # 最终共享特征图
    
    # 2. 检测分支（逐像素预测）
    score_map = conv(shared_features)      # H/4 × W/4, 1ch (文本/非文本)
    geo_map = conv(shared_features)        # H/4 × W/4, 4ch (到上下左右边界距离)
    angle_map = conv(shared_features)      # H/4 × W/4, 1ch (旋转角度)
    
    # 3. NMS 后处理得到文本区域
    text_regions = NMS(score_map, geo_map, angle_map, threshold=0.5)
    
    # 4. RoIRotate：从共享特征中提取旋转文本区域
    for region in text_regions:
        # 仿射变换 + 双线性插值 → 固定高度8，宽度按比例
        roi_features = affine_transform(shared_features, region)
    
    # 5. 识别分支
    cnn_out = RecogCNN(roi_features)       # 6层卷积，高度压缩为1
    lstm_out = BiLSTM(cnn_out)             # 双向LSTM序列建模
    text_result = CTC_decode(lstm_out)     # CTC 解码得到文本
    
    return text_regions, text_result

# 训练损失
L_total = L_detect + λ * L_recog  # λ = 1
L_detect = L_cls(OHEM) + λ_geo * L_geo(IoU_loss + angle_loss)
L_recog = CTC_loss(predicted_sequence, ground_truth_text)
```

##### 动机与背景

传统场景文本识别系统采用两阶段流水线：先用检测模型定位文本区域，再将裁剪的图像块送入独立的识别模型。这种方法存在三个核心问题：

1. **计算冗余**：检测和识别各自维护独立的特征提取网络，重复计算卷积特征
2. **误差累积**：检测错误直接传播到识别阶段，无法通过识别反馈修正检测
3. **速度瓶颈**：两个网络串行执行，难以达到实时速度

FOTS 的核心思想是：既然检测和识别都依赖图像的视觉特征，为何不共享一个特征提取器，让两个任务互相促进？

##### 核心机制：RoIRotate

RoIRotate 是连接检测与识别的桥梁，其核心挑战在于：如何从共享特征图中提取**任意方向**的文本区域特征，同时保持**可微分**以支持端到端训练。

给定一个旋转文本区域（由中心点、宽高、旋转角度定义），RoIRotate 执行以下步骤：

1. **构建仿射变换矩阵**：将目标输出坐标映射回原始特征图坐标

$$T = \begin{pmatrix} \cos\theta & -\sin\theta & t_x \\ \sin\theta & \cos\theta & t_y \end{pmatrix}$$

其中 \(\theta\) 为文本区域旋转角度，\((t_x, t_y)\) 为平移参数。

2. **坐标映射**：对输出特征图的每个位置 \((x^t, y^t)\)，计算其在输入特征图上的对应位置：

$$\begin{pmatrix} x^s \\ y^s \end{pmatrix} = T \begin{pmatrix} x^t \\ y^t \\ 1 \end{pmatrix}$$

3. **双线性插值采样**：由于映射后的坐标通常不是整数，使用双线性插值从四个相邻像素获取特征值，保证梯度可传播。

> 💡 关键：与传统 RoI Pooling 使用最大池化不同，RoIRotate 使用双线性插值，这使得梯度能够平滑地传回特征图的每个位置，实现真正的端到端训练。

输出特征的高度固定为 8 像素，宽度根据文本区域的宽高比动态调整，保持原始比例关系。

##### 检测分支设计

检测分支基于 EAST 的设计理念，采用全卷积网络进行逐像素预测：

- **分类分数**：每个像素预测属于文本区域的概率
- **几何信息**：每个正样本像素预测到文本框上、下、左、右四条边的距离 + 旋转角度 \(\theta \in [-\pi/4, \pi/4]\)

检测损失函数：

$$L_{detect} = L_{cls} + \lambda_{geo} \cdot L_{geo}$$

其中分类损失使用交叉熵配合 OHEM（每张图选 512 困难负样本 + 512 随机负样本 + 全部正样本，正负比从 1:60 提升到 1:3）。

几何损失采用 IoU Loss + 角度损失：

$$L_{geo} = -\log \text{IoU}(\hat{R}, R^*) + \lambda_\theta (1 - \cos(\hat{\theta} - \theta^*))$$

> 💡 关键：IoU Loss 对不同尺度的文本框具有天然的尺度不变性，避免了 L1/L2 回归对大框偏向的问题。

##### 识别分支设计

识别分支接收 RoIRotate 输出的固定高度特征序列：

1. **CNN 编码器**：6 层卷积（类 VGG 结构），通过高度方向的 max-pooling 将特征压缩为高度=1 的序列
2. **BiLSTM**：双向 LSTM 捕获序列上下文依赖
3. **CTC 解码**：使用 Connectionist Temporal Classification 处理不定长文本输出，无需字符级对齐标注

CTC 损失定义为：

$$L_{recog} = -\log p(\text{target} | \text{features})$$

其中概率通过对所有合法路径求和得到（CTC forward-backward 算法）。

##### 训练策略

- **预训练**：ImageNet 预训练 ResNet-50 骨干
- **第一阶段**：Synth800K 合成数据训练 10 个 epoch
- **第二阶段**：真实数据（ICDAR 2017 MLT + ICDAR 2015 + ICDAR 2013）微调至收敛
- **数据增强**：长边缩放 640-2560 → 随机旋转 [-10°, 10°] → 高度缩放 0.8-1.2 → 随机裁剪 640×640
- **训练时使用 GT 区域**：识别分支训练时使用真实标注区域（非预测区域），避免早期检测不准影响识别训练

##### 与传统方法的关键区别

| 特性 | 两阶段方法 | FOTS |
|------|-----------|------|
| 特征提取 | 检测+识别各自独立 | 共享骨干网络 |
| 方向处理 | 需额外旋转校正 | RoIRotate 原生支持 |
| 速度 (IC15) | 3.7 fps | 7.5 fps (2倍加速) |
| 模型参数 | 63.90M (28.67+35.23) | 34.98M (减少45%) |
| 端到端训练 | ❌ 分别训练 | ✅ 联合优化 |
| 识别对检测的反馈 | ❌ 无 | ✅ 减少漏检/误检/断裂/合并 |

##### 实验结果

FOTS 在三个主流基准上取得了当时的最优性能：

- **ICDAR 2015 检测**：F-measure = 87.99%（单尺度），91.99%（多尺度）
- **ICDAR 2015 端到端**：Strong=81.09%, Weak=75.90%, Generic=60.80%（单尺度）
- **ICDAR 2017 MLT 检测**：F-measure = 62.30%（单尺度），67.25%（多尺度）
- **ICDAR 2013 检测**：F-measure = 92.82%（多尺度，DetEval）

> ⚠️ 注意：FOTS 在 ICDAR 2015 端到端任务上超越此前最优方法（SegLink + CRNN）15% 以上，证明了端到端联合训练的巨大优势。

#### 🧪 练习题

```yaml
question: "FOTS 中 RoIRotate 相比传统 RoI Pooling 的核心区别是什么？"
options:
  - "使用最大池化提取固定尺寸特征"
  - "通过仿射变换和双线性插值提取旋转区域特征，支持梯度反向传播"
  - "仅支持水平方向的文本区域提取"
  - "需要预先将图像旋转为水平方向再提取特征"
answer: 1
explain: "RoIRotate 通过仿射变换处理任意方向的文本区域，使用双线性插值（而非最大池化）保证梯度可微，实现端到端训练。"
```