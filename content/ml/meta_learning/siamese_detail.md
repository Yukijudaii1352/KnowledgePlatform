### Siamese Neural Networks for One-shot Image Recognition

```yaml
id: siamese
name: Siamese Neural Networks
full_name: 孪生神经网络用于单样本图像识别 (Siamese Neural Networks for One-shot Image Recognition)
year: 2015
org: University of Toronto
paper_url: https://www.cs.cmu.edu/~rsalakhu/papers/oneshot1.pdf
category: foundation
parent: —
motivation: 通过学习图像对之间的相似度度量，实现单样本图像识别，验证度量学习在少样本场景中的有效性
```

#### 📝 一句话总结

提出使用孪生卷积神经网络（Siamese CNN）学习图像对的相似度度量函数，通过在验证任务上训练的特征表示直接迁移到单样本分类任务，在 Omniglot 数据集上取得 92.0% 的 20-way one-shot 准确率，接近人类水平（95.5%）。

#### 🎯 核心要点

- **孪生网络架构**：两个共享权重的卷积神经网络分别处理输入图像对，通过加权 L1 距离度量特征差异
- **验证→识别迁移**：在二分类验证任务（same/different）上训练，直接迁移到 N-way one-shot 分类任务
- **最优架构**：4 层卷积（64/128/128/256 滤波器，尺寸 10×10/7×7/4×4/4×4）+ 4096 全连接层 + sigmoid 输出
- **数据增强**：全局仿射变换（旋转 ±10°、剪切 ±0.3、缩放 0.8-1.2、平移 ±2px），每样本 8 倍扩增
- **贝叶斯超参数优化**：使用 Whetlab 工具进行架构与学习率等超参数的联合搜索
- **数据集**：Omniglot（50 个字母表、1623 个字符类、每类 20 个手写样本），40 个用于训练/10 个用于评估
- **核心结果**：20-way one-shot 92.0%（卷积孪生网络），验证任务最高 93.42%

#### 🔬 深入细节

![Siamese Network Architecture](https://sorenbouma.github.io/images/Siamese.png)
*图：孪生卷积神经网络架构示意。两个共享权重的 CNN 分支分别编码输入图像对，顶层通过加权 L1 距离和 sigmoid 输出相似度得分。*

```python
# Siamese Network One-shot Classification 伪代码
# === 训练阶段：验证任务 ===
def train_verification(siamese_net, pairs, labels):
    """训练孪生网络判断图像对是否属于同一类"""
    for epoch in range(200):
        for (x1, x2), y in sample_pairs(pairs, labels):
            # 双分支共享权重前向传播
            h1 = siamese_net.forward(x1)  # 4096-d feature
            h2 = siamese_net.forward(x2)  # 4096-d feature
            # 加权 L1 距离 + sigmoid
            dist = |α| * |h1 - h2|        # element-wise
            p = sigmoid(W @ dist + b)      # scalar probability
            # 二分类交叉熵损失
            loss = -y*log(p) - (1-y)*log(1-p)
            optimizer.step(loss)
        # 每 epoch 学习率衰减 1%
        lr *= 0.99
        # 用 320 个 one-shot 任务做早停验证
        if one_shot_val_acc(siamese_net) stops improving:
            break

# === 推理阶段：N-way One-shot 分类 ===
def one_shot_classify(siamese_net, test_image, support_set):
    """给定测试图像和 N 个支持样本，预测类别"""
    scores = []
    for xc in support_set:  # C 个类别各 1 个样本
        p = siamese_net.predict(test_image, xc)
        scores.append(p)
    return argmax(scores)  # 选择相似度最高的类别
```

##### 动机与背景

传统深度学习方法依赖大规模标注数据进行训练，但在许多实际场景中（如手写字符识别、罕见物种分类），每个类别可能仅有一个或极少量样本。人类具备从单个示例中学习新概念的能力，而当时的深度学习模型在这方面表现不佳。

此前的 one-shot 学习方法主要分为两类：
1. **生成式方法**（如 HBPL）：通过学习字符的生成过程（笔画程序）来识别新字符，需要强领域先验
2. **判别式方法**（如最近邻）：直接在像素空间比较，缺乏有效的特征学习

本文提出的孪生网络方法结合了两者优势：通过判别式训练学习通用的视觉相似度度量，无需特定领域的先验知识，且能自然地泛化到未见过的类别。

##### 核心机制：孪生卷积网络

**网络结构**

孪生网络由两个完全相同（共享所有参数）的卷积神经网络组成。给定输入图像对 \((x_1, x_2)\)，网络结构如下：

$$h_l^{(1)} = \text{ReLU}(\text{maxpool}(W_l * h_{l-1}^{(1)} + b_l))$$

其中 \(l = 1, \ldots, L\) 为卷积层索引，\(*\) 表示卷积操作。最优架构包含：
- **Conv1**: 64 个 10×10 滤波器，步长 1，后接 2×2 max-pooling
- **Conv2**: 128 个 7×7 滤波器，步长 1，后接 2×2 max-pooling  
- **Conv3**: 128 个 4×4 滤波器，步长 1，后接 2×2 max-pooling
- **Conv4**: 256 个 4×4 滤波器，步长 1（无 pooling）
- **FC**: 4096 个 sigmoid 单元的全连接层

**距离度量与预测**

两个分支的 4096 维特征向量通过加权 L1 距离组合：

$$p = \sigma\left(\sum_j \alpha_j |h_1^{(L)}_j - h_2^{(L)}_j| + b\right)$$

其中 \(\alpha_j\) 是可学习的距离权重参数，\(\sigma\) 是 sigmoid 函数，输出表示两个输入属于同一类的概率。

> 💡 关键：加权 L1 距离允许网络学习哪些特征维度对于判断相似性更重要，比固定的欧氏距离更灵活。

**损失函数**

使用标准二分类交叉熵损失：

$$\mathcal{L}(x_1, x_2, y) = -y \log p(x_1, x_2) - (1-y) \log(1 - p(x_1, x_2))$$

其中 \(y = 1\) 表示同类对，\(y = 0\) 表示异类对。同时加入 L2 正则化：

$$\mathcal{L}_{reg} = \mathcal{L} + \lambda \sum_l \|W_l\|_F^2$$

##### 训练流程

**数据准备**
- Omniglot 数据集：50 个字母表，1623 个字符类别，每类 20 个手写样本（105×105 灰度图）
- 训练集划分：40 个字母表（background set）用于训练和验证，10 个字母表（evaluation set）仅用于最终测试
- 配对策略：随机采样同类/异类对，确保每个字母表获得均等的训练表示

**数据增强**
对每个训练样本施加 8 种随机仿射变换：
- 旋转：\(\theta \sim \text{Uniform}(-10°, 10°)\)
- 剪切：\(s \sim \text{Uniform}(-0.3, 0.3)\)
- 缩放：\(z \sim \text{Uniform}(0.8, 1.2)\)
- 平移：\(t_x, t_y \sim \text{Uniform}(-2, 2)\) 像素

**优化策略**
- SGD + momentum（0.5 初始，线性增加至 epoch 的函数）
- 学习率：初始由贝叶斯优化确定，每 epoch 衰减 1%
- Minibatch 大小：128 对
- 最大 200 epochs，基于 320 个 one-shot 验证任务的准确率进行早停

**权重初始化**
- 卷积层权重：\(W \sim \mathcal{N}(0, 10^{-2})\)
- 全连接层权重：\(W \sim \mathcal{N}(0, 2 \times 10^{-1})\)
- 偏置：\(b \sim \mathcal{N}(0.5, 10^{-2})\)

> ⚠️ 注意：偏置初始化为正值（均值 0.5）是为了确保 sigmoid/ReLU 激活在训练初期处于活跃区域。

**超参数优化**
使用 Whetlab（贝叶斯优化工具）联合搜索：
- 卷积层数（1-5）、滤波器数量与尺寸
- 全连接层宽度
- 学习率、正则化强度、momentum 调度

##### 推理：从验证到 One-shot 分类

训练完成后，网络直接用于 N-way one-shot 分类，无需任何微调：

给定测试图像 \(x\) 和 \(C\) 个支持样本 \(\{x_c\}_{c=1}^C\)（每类一个），预测类别为：

$$C^* = \arg\max_c \, p(x, x_c)$$

即选择与测试图像相似度得分最高的支持样本所属类别。

> 💡 关键：这种方法的优雅之处在于——验证任务训练的特征空间天然具有度量性质，可以零样本迁移到任意新类别的分类任务。

##### 实验结果

| 方法 | 20-way One-shot 准确率 |
|------|----------------------|
| Humans | 95.5% |
| HBPL (Hierarchical Bayesian Program Learning) | 95.2% |
| **Convolutional Siamese Net** | **92.0%** |
| Affine model | 81.8% |
| Hierarchical Deep | 65.2% |
| Siamese Neural Net (非卷积) | 58.3% |
| 1-Nearest Neighbor | 21.7% |

验证任务最佳结果：150k 训练对 + 仿射增强 → 93.42% 准确率。

##### 与传统方法的对比

| 维度 | HBPL（生成式） | Siamese CNN（本文） |
|------|---------------|-------------------|
| 先验知识 | 需要笔画分解、运动程序 | 仅需原始像素输入 |
| 泛化能力 | 限于手写字符领域 | 可应用于任意视觉域 |
| 训练数据 | 需要笔画轨迹标注 | 仅需类别标签 |
| 计算效率 | 推理时需 MCMC 采样 | 前向传播即可 |
| 准确率 | 95.2%（领域特化） | 92.0%（通用方法） |

本文方法作为纯判别式、无领域先验的方法，能达到接近生成式专家系统的性能，证明了度量学习在 one-shot 场景中的巨大潜力。

#### 🧪 练习题

```yaml
question: "在 Siamese 网络的 one-shot 分类推理阶段，如何从 N 个支持样本中确定测试图像的类别？"
options:
  - "将测试图像输入分类器，直接输出 N 个类别的概率分布"
  - "计算测试图像与每个支持样本的相似度得分，选择得分最高的类别"
  - "对 N 个支持样本的特征取平均，然后计算测试图像与平均特征的距离"
  - "使用 K-means 聚类将测试图像分配到最近的支持样本簇"
answer: 1
explain: "Siamese 网络通过逐一比较测试图像与每个支持样本的相似度（sigmoid 输出），选择相似度最高的类别作为预测结果，即 C* = argmax_c p(x, x_c)。"
```