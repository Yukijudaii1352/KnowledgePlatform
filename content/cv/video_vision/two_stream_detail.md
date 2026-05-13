### Two-Stream ConvNets — 双流卷积网络用于视频动作识别

```yaml
id: two_stream
name: "Two-Stream ConvNets"
full_name: "双流卷积网络 (Two-Stream Convolutional Networks for Action Recognition in Videos)"
year: "2014"
org: "Oxford / VGG"
paper_url: "https://arxiv.org/abs/1406.2199"
category: "foundation"
parent: "—"
motivation: "将空间外观识别与时序运动识别解耦为两条独立的卷积网络流，通过晚期融合实现视频动作识别，奠定了视频理解领域双流解耦架构范式"
```

#### 📝 一句话总结

Two-Stream ConvNets 提出将视频动作识别解耦为空间流（单帧外观）和时间流（堆叠光流）两条独立 ConvNet，通过晚期融合实现互补，首次证明了深度学习在视频理解中可与手工特征（如 IDT）媲美的性能。

#### 🎯 核心要点

- 双流架构：空间流 ConvNet 处理单帧 RGB 图像捕获外观信息，时间流 ConvNet 处理堆叠密集光流捕获运动信息
- 光流输入设计：提出光流堆叠（optical flow stacking）、轨迹堆叠（trajectory stacking）、双向光流三种输入配置
- 时间流输入：将连续 \(L\) 帧的水平/垂直光流分量堆叠为 \(2L\) 通道张量作为 ConvNet 输入
- 均值光流减除：通过减去位移场均值补偿全局相机运动
- 多任务学习：联合 UCF-101 和 HMDB-51 分类任务训练时间流网络，缓解小数据集过拟合
- 晚期融合策略：对两流 softmax 分数进行平均或 SVM 融合
- 空间流预训练：利用 ImageNet ILSVRC-2012 预训练解决视频数据集规模不足问题
- 网络架构：基于 CNN-M-2048（类似 Zeiler & Fergus 网络），5 层卷积 + 3 层全连接
- 在 UCF-101 达到 88.0%、HMDB-51 达到 59.4% 准确率，与当时最优手工特征方法持平

#### 🔬 深入细节

![Two-Stream Architecture](https://arxiv.org/html/1406.2199v2/extracted/figures/two_stream_arch.png)
*图：Two-Stream ConvNet 架构示意。上方为空间流（输入单帧 RGB），下方为时间流（输入多帧堆叠光流），最终通过晚期融合得到动作分类结果。*

> 💡 **核心思想**：受神经科学中视觉皮层"双通路假说"（腹侧通路负责物体识别，背侧通路负责运动感知）启发，将视频理解分解为外观识别和运动识别两个独立子问题。

```python
# Two-Stream ConvNet 推理伪代码
def two_stream_predict(video):
    # 1. 空间流：随机采样帧 → ImageNet预训练ConvNet
    frames = sample_frames(video, n=25)
    spatial_scores = spatial_convnet(frames)  # 输入: 224x224x3
    
    # 2. 时间流：计算光流 → 堆叠L=10帧 → ConvNet
    for frame_t in frames:
        flow_volume = stack_optical_flow(video, t=frame_t, L=10)
        # flow_volume shape: 224x224x20 (dx,dy × 10帧)
        flow_volume -= flow_volume.mean(axis=(0,1))  # 均值减除
    temporal_scores = temporal_convnet(flow_volume)
    
    # 3. 晚期融合
    # 方式A: 平均融合
    final_score = (spatial_scores + temporal_scores) / 2
    # 方式B: SVM融合 (L2归一化后拼接，训练线性SVM)
    # final_score = svm(l2_norm(spatial_scores), l2_norm(temporal_scores))
    
    return argmax(final_score)
```

##### 动机与背景

2014 年之前，视频动作识别领域主要依赖手工特征方法，如改进密集轨迹（Improved Dense Trajectories, IDT），其通过 HOF、MBH 等手工描述子编码光流信息。虽然 CNN 在图像分类上已取得突破（AlexNet, 2012），但直接将 CNN 应用于视频面临两大挑战：

1. **时序建模困难**：简单堆叠 RGB 帧（如 Karpathy 等人的"slow fusion"）效果远不如手工特征，因为 CNN 难以从原始像素中隐式学习运动模式
2. **训练数据不足**：当时最大的标注视频数据集 UCF-101 仅有 9.5K 训练视频，远不足以从零训练深度网络

Two-Stream ConvNets 的核心洞察是：**将运动信息显式化**——用预计算的密集光流作为时间流的输入，而非让网络自行从原始帧中学习运动。

##### 空间流 ConvNet

空间流接收单帧 RGB 图像（\(224 \times 224 \times 3\)），本质上执行静态图像的动作识别（类似物体/场景识别）。关键设计：

- **ImageNet 预训练**：由于视频数据集过小，空间流使用在 ILSVRC-2012 上预训练的 CNN-M-2048 网络，仅微调最后分类层即可达到 72.8% 准确率（UCF-101）
- 从零训练仅达 52.3%，证明预训练的必要性
- 采用 dropout=0.5 的最后层训练策略

##### 时间流 ConvNet——核心创新

时间流是本文最重要的贡献。它将密集光流显式编码为多通道"图像"输入 ConvNet：

**光流堆叠（Optical Flow Stacking）**：对于时刻 \(\tau\) 的帧，将其前后 \(L\) 帧的光流水平分量 \(d^x_t\) 和垂直分量 \(d^y_t\) 堆叠：

$$I_\tau(u, v, 2k-1) = d^x_{\tau+k}(u, v), \quad I_\tau(u, v, 2k) = d^y_{\tau+k}(u, v)$$

其中 \(k = 0, \ldots, L-1\)，最终输入张量维度为 \(w \times h \times 2L\)。实验中 \(L=10\)，即 20 通道输入。

**轨迹堆叠（Trajectory Stacking）**：沿运动轨迹采样光流，而非固定空间位置：

$$I_\tau(u, v, 2k-1) = d^x_{\tau+k}(p_k), \quad I_\tau(u, v, 2k) = d^y_{\tau+k}(p_k)$$

其中 \(p_k\) 为从 \((u,v)\) 出发沿光流追踪到第 \(k\) 帧的位置。

**双向光流**：使用 \(L/2\) 帧前向光流 + \(L/2\) 帧后向光流，总通道数不变。

> ⚠️ **关键发现**：堆叠多帧光流（\(L=10\)）比单帧光流（\(L=1\)）提升约 7%，证明长程时序信息的重要性。光流堆叠略优于轨迹堆叠，双向光流仅带来微小提升。

**均值光流减除**：从每个位移场中减去其空间均值向量，补偿全局相机运动，类似于图像处理中的零均值化。实验证明这一简单操作可提升约 1% 准确率。

##### 与手工特征的关系

论文深刻揭示了时间流 ConvNet 与传统手工描述子的联系：

- **HOF/MBH 描述子**：基于光流方向直方图，可由第一层卷积（方向敏感滤波器）+ ReLU + 池化实现
- **运动学特征**（散度、旋度、剪切）：基于光流梯度，同样可被卷积层捕获
- **轨迹特征**：沿轨迹堆叠位移向量，对应轨迹堆叠输入方式

第一层学到的 96 个滤波器（\(7 \times 7 \times 20\)）可视化显示：部分滤波器计算光流的空间导数（类似 MBH），部分计算时间导数（捕获运动变化）。

##### 多任务学习

为缓解时间流在小数据集（尤其是 HMDB-51 仅 3.7K 训练视频）上的过拟合，采用多任务学习：

- 在最后全连接层之上添加两个 softmax 分类头（UCF-101 和 HMDB-51）
- 总损失为两个任务损失之和，通过反向传播联合优化
- HMDB-51 上从 46.6% 提升至 55.4%（+8.8%），UCF-101 上从 81.0% 提升至 81.5%

##### 训练与测试细节

| 配置项 | 空间流 | 时间流 |
|--------|--------|--------|
| 输入尺寸 | 224×224×3 | 224×224×20 |
| 预训练 | ImageNet ILSVRC-2012 | 无（从零训练） |
| Dropout | 0.5 | 0.9 |
| 学习率 | 10⁻² → 10⁻³(14K) → stop(20K) | 10⁻² → 10⁻³(50K) → 10⁻⁴(70K) → stop(80K) |
| 数据增强 | 随机裁剪 + 翻转 + RGB抖动 | 随机裁剪 + 翻转 |

- **测试**：均匀采样 25 帧，每帧 10 次裁剪（4角+中心 × 翻转），对所有分数取平均
- **光流计算**：使用 Brox 等人的 GPU 实现（OpenCV），0.06s/帧对，预计算并 JPEG 压缩存储（UCF-101 从 1.5TB 压缩至 27GB）
- **多 GPU 训练**：基于 Caffe，4× NVIDIA Titan，数据并行，3.2× 加速

##### 晚期融合与最终结果

两流融合方式对比（UCF-101 split 1）：

| 融合方式 | 准确率 |
|----------|--------|
| 仅空间流 | 72.8% |
| 仅时间流 | 81.2% |
| 平均融合 | 85.9% |
| SVM 融合 | 87.0% |

> 💡 **互补性**：融合后比单独时间流提升 6%，比空间流提升 14%，证明外观和运动信息高度互补。

**与当时最优方法对比（3-split 平均）**：

| 方法 | UCF-101 | HMDB-51 |
|------|---------|---------|
| IDT [Wang & Schmid, 2013] | 85.9% | 57.2% |
| IDT + 高维编码 | 87.9% | 61.1% |
| Slow Fusion ConvNet [Karpathy, 2014] | 65.4% | - |
| **Two-Stream (SVM 融合)** | **88.0%** | **59.4%** |

Two-Stream ConvNets 首次使深度学习方法在视频动作识别上达到与精心设计的手工特征方法持平的性能，开创了视频理解的双流范式。

#### 🧪 练习题

```yaml
question: "Two-Stream ConvNets 中时间流网络的输入是什么？"
options:
  - "连续多帧 RGB 图像堆叠"
  - "单帧 RGB 图像的梯度图"
  - "连续多帧的密集光流位移场堆叠"
  - "视频帧的频域变换特征"
answer: 2
explain: "时间流的核心创新在于使用预计算的密集光流作为显式运动表示，将连续 L=10 帧的水平和垂直光流分量堆叠为 2L=20 通道的输入张量，而非直接使用原始 RGB 帧。"
```