# FedBN: Federated Learning on Non-IID Features via Local Batch Normalization

## 元数据
| 属性 | 内容 |
|------|------|
| 标题 | FedBN: Federated Learning on Non-IID Features via Local Batch Normalization |
| 作者 | Xiaoxiao Li, Meirui Jiang, Xiaofei Zhang, Michael Kamp, Qi Dou |
| 年份 | 2021 |
| 发表venue | ICLR 2021 (International Conference on Learning Representations) |
| 论文链接 | https://arxiv.org/abs/2102.07623 |
| 代码链接 | https://github.com/med-air/FedBN |
| 领域标签 | 联邦学习, 非IID数据, 批归一化, 分布式学习, 域适应 |

---

## 1. 研究背景与动机

### 1.1 问题定义

联邦学习(Federated Learning)允许多个客户端在不共享原始数据的前提下协作训练模型。现有研究主要关注**标签分布偏移(label distribution skew)**问题，即不同客户端的标签分布不同(如某客户端只有猫的图片，另一个只有狗的图片)。

然而，本文关注一个被忽视但同样重要的问题：**特征分布偏移(feature shift non-IID)**。这指的是不同客户端的输入特征分布不同，即使标签分布相同。典型场景包括：
- 医学影像中不同医院使用不同品牌/型号的扫描仪，导致同一类型病变的图像特征差异显著
- 自动驾驶中不同地区的摄像头拍摄条件不同
- 不同用户的手写数字风格差异

### 1.2 现有方法的不足

- **FedAvg**: 直接平均所有参数（包括BN层），在特征偏移场景下性能下降严重，因为BN统计量反映的是局部数据分布
- **FedProx**: 通过近端项约束局部更新，但未针对特征偏移设计
- **SCAFFOLD**: 使用控制变量修正梯度方向，同样未区分BN层的特殊性
- **域适应方法**: 需要访问源域数据，违反联邦学习的隐私约束

### 1.3 核心观察

![Figure 1](https://ar5iv.labs.arxiv.org/html/2102.07623/assets/x1.png)

*Figure 1: 两个客户端分别有/无BN时的训练误差。BN层的统计参数(均值和方差)能够有效捕获各客户端的局部特征分布信息。*

关键洞察：**Batch Normalization层的参数（均值μ、方差σ、缩放γ、偏移β）本质上编码了局部数据的特征统计信息**。在特征偏移场景下，不同客户端的BN参数应该不同，强制平均会破坏各客户端对本地特征分布的适应能力。

---

## 2. 方法详解

### 2.1 核心思想

**FedBN的核心极其简洁：在联邦聚合时，保留BN层参数在本地不参与聚合，仅聚合非BN层参数。**

这一设计基于以下理论直觉：
- BN层的running mean和running variance直接反映本地数据的特征分布统计
- BN层的可学习参数γ(scale)和β(shift)学习的是对本地特征分布的仿射变换
- 在特征偏移场景下，这些参数在不同客户端间本应不同

### 2.2 算法流程

**Algorithm 1: FedBN - Federated Learning with Local Batch Normalization**

```
输入: K个客户端, 通信轮数T, 本地训练轮数E, 学习率η

服务器端:
  初始化全局模型参数 w⁰
  for t = 0, 1, ..., T-1:
      将非BN层参数 w_non-BN^t 广播给所有客户端
      for 每个客户端 k ∈ {1,...,K} 并行:
          客户端k执行本地更新
      收集所有客户端的非BN层参数
      聚合: w_non-BN^{t+1} = (1/K) Σ_k w_non-BN^{k,t}  ← 仅聚合非BN层!

客户端k端:
  接收服务器的非BN层参数，更新本地模型的非BN层
  保留本地BN层参数不变  ← 关键区别!
  for epoch = 1, ..., E:
      在本地数据上训练完整模型(包括BN层)
  返回更新后的非BN层参数给服务器
```

### 2.3 与FedAvg的关键区别

| 步骤 | FedAvg | FedBN |
|------|--------|-------|
| 下发参数 | 所有层参数 | 仅非BN层参数 |
| 本地训练 | 相同 | 相同 |
| 上传参数 | 所有层参数 | 仅非BN层参数 |
| 服务器聚合 | 平均所有层 | 仅平均非BN层 |
| BN层处理 | 被全局平均覆盖 | 始终保留在本地 |

### 2.4 理论分析：收敛性

![Figure 2](https://ar5iv.labs.arxiv.org/html/2102.07623/assets/x2.png)

*Figure 2: 客户端的误差曲面，模型参数w∈[0.001,12]和BN参数。展示了BN参数的局部最优与全局参数的关系。*

论文提供了收敛性证明，核心结论：

**定理(非正式)**: 在特征偏移non-IID设置下，假设损失函数L-smooth且满足一定正则性条件：
- FedBN的收敛速率为 O(1/T)，其中T为通信轮数
- FedBN的收敛上界比FedAvg更紧，因为FedAvg的上界中包含一个与特征偏移程度成正比的额外误差项
- 特征偏移越大，FedBN相对FedAvg的优势越明显

直觉解释：FedAvg聚合BN参数时引入了"方向噪声"，因为不同客户端的BN最优解方向不同；FedBN通过保留本地BN避免了这种噪声。

### 2.5 网络架构

实验中使用的基础网络为6层CNN：

```
Conv1 → BN1 → ReLU → Pool →
Conv2 → BN2 → ReLU → Pool →
Conv3 → BN3 → ReLU → Pool →
FC1 → BN4 → ReLU →
FC2 → BN5 → ReLU →
FC3 → Softmax
```

每个BN层的参数(γ, β, running_mean, running_var)均保留在本地。

---

## 3. 实验与结果

### 3.1 实验设置

**数据集与特征偏移构造**：

| 实验 | 数据集(每个=一个客户端) | 特征偏移来源 |
|------|------------------------|-------------|
| Digits-5 | SVHN, USPS, SynthDigits, MNIST-M, MNIST | 不同数字图像风格/来源 |
| Office-Caltech10 | Amazon, Caltech, DSLR, Webcam | 不同拍摄设备/环境 |
| DomainNet | Clipart, Infograph, Painting, Quickdraw, Real, Sketch | 不同视觉域 |

![Figure 6](https://ar5iv.labs.arxiv.org/html/2102.07623/assets/x6.png)

*Figure 6: 数据可视化。(a)各数据集样例。(b)非IID特征分布的t-SNE可视化。*

### 3.2 主要结果

**Digits-5分类实验**（5个客户端，每个客户端一个域）：

| 方法 | SVHN | USPS | SynthDigits | MNIST-M | MNIST | 平均 |
|------|------|------|-------------|---------|-------|------|
| SingleSet (本地独立训练) | 65.5 | 96.5 | 82.2 | 78.6 | 97.2 | 84.0 |
| FedAvg | 64.3 | 95.2 | 81.4 | 62.3 | 97.5 | 80.1 |
| FedProx | 64.9 | 95.8 | 81.9 | 63.1 | 97.5 | 80.6 |
| **FedBN** | **72.1** | **97.6** | **85.5** | **81.4** | **98.2** | **87.0** |

关键发现：
- FedBN在所有域上均优于FedAvg和FedProx
- FedBN甚至优于SingleSet(本地独立训练)，说明非BN层的聚合仍然带来了正向知识迁移
- FedAvg在MNIST-M上甚至劣于SingleSet，说明强制聚合BN层在特征偏移下有害

### 3.3 收敛速度

![Figure 3](https://ar5iv.labs.arxiv.org/html/2102.07623/assets/x3.png)

*Figure 3: FedBN和FedAvg在digits分类数据集上的训练损失收敛曲线。FedBN收敛更快且达到更低的损失值。*

### 3.4 消融实验

![Figure 4](https://ar5iv.labs.arxiv.org/html/2102.07623/assets/x4.png)

*Figure 4: 分析实验。(a)不同本地训练轮数E的影响。(b)不同客户端数量的影响。FedBN对这些超参数更鲁棒。*

关键消融发现：
- **本地训练轮数E**: FedBN对E的选择不敏感，而FedAvg在E较大时性能下降（因为BN参数偏离全局平均更远）
- **客户端数量**: 随客户端增加，FedBN性能稳定或提升，FedAvg性能下降
- **部分参与**: FedBN在部分客户端参与场景下同样有效

### 3.5 Benchmark对比

![Figure 5](https://ar5iv.labs.arxiv.org/html/2102.07623/assets/x5.png)

*Figure 5: Benchmark实验性能对比。*

---

## 4. 贡献与局限

### 4.1 主要贡献

1. **问题定义**: 首次系统性地研究联邦学习中的特征偏移(feature shift)非IID问题，区别于此前主要关注的标签偏移
2. **方法设计**: 提出极其简洁有效的FedBN方法——仅需在聚合时跳过BN层，无需修改训练过程或引入额外超参数
3. **理论保证**: 提供了收敛性分析，证明FedBN在特征偏移下比FedAvg收敛更快
4. **实验验证**: 在多个视觉基准和医学影像场景下验证了方法的有效性

### 4.2 局限性

1. **依赖BN层**: 方法前提是模型包含BN层；对于不使用BN的架构(如Transformer中的LayerNorm、GroupNorm)，需要进一步研究适用性
2. **仅针对特征偏移**: 对于标签偏移(label skew)场景，FedBN的优势不明显，因为BN层主要捕获特征统计而非标签信息
3. **隐私考量**: 虽然BN参数不上传减少了通信量，但论文未深入分析这是否带来额外的隐私保护
4. **异构模型**: 所有客户端必须使用相同的网络架构（至少非BN层结构相同）
5. **新客户端加入**: 新客户端没有预训练的BN参数，冷启动问题未讨论
6. **特征偏移程度**: 当特征偏移极端时（完全不同的域），仅共享非BN层是否足够存疑

---

## 5. 个人思考

### 5.1 方法评价

FedBN的最大优点是**极致的简洁性**。它不需要额外的超参数调优、不增加计算开销、不需要修改训练流程，仅仅是在聚合时"跳过"BN层。这种简洁性使其非常容易集成到现有联邦学习框架中。

### 5.2 启发与延伸

1. **层级选择性聚合的一般化**: FedBN启发我们思考——联邦学习中是否应该对不同层采用不同的聚合策略？例如：
   - 浅层特征提取器可能更具域特异性，应减少聚合权重
   - 深层分类器可能更具通用性，应加强聚合
   
2. **与个性化联邦学习的联系**: FedBN本质上是一种**部分个性化**策略——BN层个性化，其余层共享。这与FedPer(个性化头部)、LG-FedAvg(个性化底层)等方法形成互补。

3. **对Transformer架构的启示**: 现代视觉模型越来越多使用LayerNorm而非BatchNorm。FedBN的思想能否迁移？LayerNorm的参数是否也编码了域特异信息？

4. **与域泛化/域适应的关系**: FedBN实际上让每个客户端保留了自己的"域适应层"(BN层)，这与域适应中的AdaBN方法思想一致，但在联邦学习框架下实现。

### 5.3 实践建议

- 在存在明显特征偏移的联邦学习场景中（如多中心医学影像），FedBN应作为默认baseline
- 可以与其他联邦学习优化方法（如FedProx的近端项）组合使用
- 实际部署时，BN层不上传还能节省通信带宽（虽然BN参数量通常很小）

---

## 参考信息

- 论文PDF: https://arxiv.org/pdf/2102.07623
- 代码实现: https://github.com/med-air/FedBN
- ICLR 2021 OpenReview: https://openreview.net/forum?id=6YEQUn0QICG