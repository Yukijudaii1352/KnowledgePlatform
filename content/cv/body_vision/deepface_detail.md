### DeepFace

```yaml
id: deepface
name: DeepFace
full_name: "DeepFace: 缩小与人类水平人脸验证的差距 (Closing the Gap to Human-Level Performance in Face Verification)"
year: "2014"
org: Facebook AI Research
paper_url: "https://openaccess.thecvf.com/content_cvpr_2014/papers/Taigman_DeepFace_Closing_the_2014_CVPR_paper.pdf"
category: foundation
parent: "—"
motivation: "通过3D人脸对齐与大规模深度神经网络，将人脸验证准确率提升至接近人类识别精度"
```

#### 📝 一句话总结

DeepFace 提出了一套结合 **3D 人脸对齐**与**9 层深度神经网络**的端到端人脸验证系统，在 440 万张人脸图像上训练后，在 LFW 基准上达到 97.35% 的准确率，首次将机器人脸验证性能提升至接近人类水平（97.53%）。

#### 🎯 核心要点

- **3D 人脸对齐（Frontalization）**：利用通用 3D 人脸模型将任意姿态的人脸变换到正面视角，消除面外旋转带来的外观差异
- **9 层深度神经网络架构**：包含 3 个卷积层（C1-C3）、2 个局部连接层（L4-L5）、3 个全连接层（F6-F8），共超过 1.2 亿参数
- **局部连接层设计**：L4、L5 层在不同空间位置使用不同的滤波器，利用对齐后人脸各区域统计特性不同的先验
- **大规模训练数据集 SFC**：来自 Facebook 的 Social Face Classification 数据集，包含 4,030 个身份共 440 万张标注人脸
- **多种验证度量**：加权 \(\chi^2\) 距离（由线性 SVM 学习权重）和 Siamese 网络端到端度量学习
- **集成策略**：组合不同输入类型（3D-RGB、灰度+梯度、2D-RGB）的多个网络，进一步提升性能
- **核心结果**：LFW 97.35%（集成，unrestricted）、YTF 91.4%（单模型），后者将此前最优方法的错误率降低超过 50%

#### 🔬 深入细节

##### 系统总览

DeepFace 系统由四个关键阶段组成：**人脸检测 → 人脸对齐（2D + 3D）→ 深度特征提取 → 验证度量**。其核心创新在于将精细的 3D 几何对齐与大容量深度网络相结合，使网络能够专注于学习身份判别特征，而非被姿态变化所干扰。

![DeepFace 系统流程图](https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-24_at_3.44.18_PM_MrpUGKi.png)
*图：DeepFace 的整体流程——从检测、对齐、3D 正面化到 DNN 特征提取*

##### 3D 人脸对齐

传统 2D 对齐仅通过仿射变换对齐关键点，无法处理大角度的面外旋转。DeepFace 引入了基于 3D 模型的对齐流程：

1. **2D 对齐**：使用 LBP 特征的 SVR 检测 6 个基准点（两眼中心、鼻尖、嘴巴三点），通过相似变换将人脸裁剪到 \(152 \times 152\) 的标准位置
2. **3D 建模**：检测 67 个基准点，通过 Delaunay 三角化生成 2D 网格；将 2D 基准点与通用 3D 人脸模型上的对应锚点进行仿射相机匹配，得到 3D-2D 映射关系
3. **正面化（Frontalization）**：将 3D 模型旋转到正面视角，利用逐三角形的仿射变换将原始图像的纹理映射到正面化后的 2D 坐标上

> 💡 **关键直觉**：3D 对齐的本质是"先把人脸贴到一个标准 3D 模具上，再从正面拍一张照片"，这样无论原始姿态如何，网络看到的都是近似正面的人脸。

##### 深度网络架构

网络输入为 \(152 \times 152 \times 3\) 的 RGB 图像（经 3D 对齐后），架构如下：

```
输入: 152×152×3 (RGB)
  ↓
C1: Conv 11×11, stride 4, 32 filters → 32@37×37 → Max-Pool 3×3/2 → 32@18×18
  ↓
C2: Conv 9×9, pad 4, 16 filters → 16@18×18
  ↓
C3: Conv 9×9, pad 4, 16 filters → 16@18×18 → L2-Pool 7×7/2 + Norm → 16@9×9
  ↓
L4: Locally-Connected 9×9, 16 filters → 16@9×9 (每个位置独立滤波器)
  ↓
L5: Locally-Connected 7×7, 16 filters → 16@5×5 (每个位置独立滤波器)
  ↓
F6: Fully-Connected → 4096 (ReLU + Dropout 0.5)
  ↓
F7: Fully-Connected → 4096 (人脸表征向量, 归一化后使用)
  ↓
F8: Softmax → 4030 类 (训练时的身份分类)
```

> ⚠️ **局部连接层的设计动机**：经过 3D 对齐后，人脸图像中不同区域（如眼睛、鼻子、嘴巴）具有不同的局部统计特性。传统卷积层在所有位置共享滤波器，而局部连接层允许每个空间位置学习专属的滤波器，更好地捕捉这种区域特异性。代价是参数量大幅增加（L4 和 L5 贡献了网络 95% 的参数），但这在大规模数据下是可接受的。

网络总参数量超过 1.2 亿，其中：
- 卷积层（C1-C3）：约 **数十万** 参数（权重共享）
- 局部连接层（L4-L5）：约 **1.17 亿** 参数（无权重共享）
- 全连接层（F6-F7）：约 **数百万** 参数

##### 训练流程

```python
# DeepFace 训练伪代码
# 阶段1: 在 SFC 数据集上训练多类分类器
dataset = SFC(identities=4030, images=4.4M)  # Facebook 社交人脸数据
model = DeepFaceNet(num_classes=4030)

optimizer = SGD(lr=0.01, momentum=0.9)
# 学习率在验证误差停止下降时手动除以10, 最终降至 0.0001
# 权重初始化: N(0, 0.01), 偏置初始化: 0.5

for epoch in range(15):  # 约15个epoch, 训练3天(GPU)
    for batch in dataset.batches(size=128):
        logits = model(batch.images)           # 前向传播
        loss = cross_entropy(logits, batch.labels)  # 4030类分类损失
        loss.backward()
        optimizer.step()

# 阶段2: 提取人脸表征
# 使用 F7 层的 4096 维输出作为人脸描述子
representation = model.extract_F7(aligned_face)  # 4096-d 向量
representation = L2_normalize(representation)

# 阶段3: 验证度量学习
# 方法A: 加权 χ² 距离 + SVM
chi2_vector = [(f1[i] - f2[i])² / (f1[i] + f2[i]) for i in range(4096)]
svm = LinearSVM().fit(chi2_vectors, same_or_not_labels)

# 方法B: Siamese 网络
# 复制两份网络, 输入一对人脸, 通过 |f1-f2| + FC → 同/不同
```

##### 验证度量详解

DeepFace 探索了两种将表征转化为验证决策的方法：

**1. 加权 \(\chi^2\) 距离**

$$\chi^2(\mathbf{f}_1, \mathbf{f}_2) = \sum_i w_i \frac{(f_1[i] - f_2[i])^2}{f_1[i] + f_2[i]}$$

其中权重 \(w_i\) 通过线性 SVM 在 \(\frac{(f_1[i] - f_2[i])^2}{f_1[i] + f_2[i]}\) 向量上学习得到。这种方法允许模型自动发现哪些特征维度对于身份判别更重要。

**2. Siamese 网络**

将预训练的特征提取器复制两份（共享权重），对一对人脸图像分别提取特征后，计算绝对差 \(|\mathbf{f}_1 - \mathbf{f}_2|\)，再通过一个全连接层映射到单个 logistic 输出。其诱导距离为：

$$d(\mathbf{f}_1, \mathbf{f}_2) = \sum_i \alpha_i |f_1[i] - f_2[i]|$$

为防止过拟合，仅微调最顶部两层，并额外收集了 10 万个身份（每人 30 张）的数据用于训练。

##### 与传统方法的关键区别

| 维度 | 传统方法 | DeepFace |
|------|---------|----------|
| **对齐** | 2D 仿射变换 | 3D 模型正面化，消除面外旋转 |
| **特征** | 手工设计（LBP、Fisher Vector 等） | 端到端学习的 4096 维深度表征 |
| **滤波器** | 全局共享（标准卷积） | 局部连接层，区域特异性滤波器 |
| **训练规模** | 通常数万张图像 | 440 万张人脸，4030 个身份 |
| **LFW 准确率** | 最高 96.33%（TL Joint Bayesian） | **97.35%**（集成），接近人类 97.53% |

##### 消融实验关键发现

- **无 3D 对齐**（仅 2D）：准确率从 97% 降至 94.3%，说明 3D 正面化贡献约 **2.7%** 的绝对提升
- **无对齐**（仅中心裁剪）：准确率降至 87.9%
- **无深度学习**（3D 对齐 + LBP/SVM）：准确率为 91.4%，说明深度网络贡献约 **5.6%** 的提升
- **减少训练数据**：从 100% 降至 10% 时，分类错误率从 8.7% 升至 20.7%，表明大规模数据至关重要
- **减少网络深度**：去掉 C3+L4+L5 后错误率从 8.7% 升至 13.5%，验证了深度的必要性

> 💡 **核心洞察**：DeepFace 的成功源于 3D 对齐与深度网络的**协同效应**——3D 对齐将姿态归一化，使网络能更高效地利用其容量学习身份特征；而大容量网络则能从大规模数据中学到对光照、表情、年龄等因素的不变性。

#### 🧪 练习题

```yaml
question: "DeepFace 中局部连接层（Locally Connected Layer）与标准卷积层的核心区别是什么？"
options:
  - "局部连接层使用更大的卷积核尺寸"
  - "局部连接层在不同空间位置使用不同的滤波器权重，不进行权重共享"
  - "局部连接层引入了注意力机制来加权不同区域"
  - "局部连接层使用深度可分离卷积减少参数量"
answer: 1
explain: "局部连接层的核心特点是取消了卷积的权重共享机制，每个空间位置拥有独立的滤波器参数，这是因为经过3D对齐后人脸不同区域（眼睛、鼻子、嘴巴等）具有不同的统计特性，需要不同的滤波器来捕捉。"
```