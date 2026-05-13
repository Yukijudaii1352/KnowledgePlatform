### OFA — 一次训练全场景 (Once-for-All)

```yaml
id: ofa
name: OFA
full_name: 一次训练全场景 (Once-for-All)
year: '2020'
org: MIT
paper_url: https://arxiv.org/abs/1908.09791
category: nas
parent: enas
motivation: 训练超网支持10^19子网部署
```

#### 📝 一句话总结

OFA 提出"训练一次，处处部署"的超网训练范式，通过渐进收缩（Progressive Shrinking）算法联合优化深度、宽度、卷积核大小和分辨率四个维度，使单个共享权重网络支持超过 \(10^{19}\) 种子网络架构，在部署时零额外训练成本即可为任意硬件平台导出专用高效模型。

#### 🎯 核心要点

- **超网（Once-for-All Network）**：单一共享权重网络包含 \(>10^{19}\) 个子网络，覆盖深度、宽度、卷积核大小、输入分辨率四个弹性维度
- **渐进收缩（Progressive Shrinking, PS）算法**：从最大网络出发，依次引入弹性卷积核→弹性深度→弹性宽度，逐步微调支持更小子网
- **弹性卷积核**：大卷积核中心区域复用为小卷积核，引入核变换矩阵消除角色冲突
- **弹性深度**：保留每个 unit 前 D 层、跳过末尾层，确保权重共享一致性
- **弹性宽度**：按 L1 范数对通道排序，选取最重要通道初始化小子网
- **知识蒸馏**：训练最大网络后，用其软标签指导小子网微调
- **神经网络孪生预测器（Neural-Network-Twins）**：训练精度预测器 + 延迟查找表，进化搜索导出专用子网，搜索成本可忽略
- **部署成本从 O(N) 降至 O(1)**：无论目标场景数量多少，训练成本恒定（约 1200 GPU hours）
- **SOTA 结果**：ImageNet mobile setting 首次达到 80.0% top-1（595M MACs），优于 MobileNetV3 最高 4.0%

#### 🔬 深入细节

##### 核心框架示意图

![OFA 整体框架](https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x1.png)
*图：OFA 框架概览。左：单个超网支持多种架构配置（深度/宽度/卷积核/分辨率）；中：部署成本从 O(N) 降至 O(1)；右：一次训练即可导出多种精度-延迟权衡方案。*

##### 渐进收缩训练流程

![Progressive Shrinking 过程](https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x3.png)
*图：渐进收缩过程示意。依次引入弹性卷积核 K、弹性深度 D、弹性宽度 W，分辨率 R 在整个训练过程中始终弹性采样。*

##### 算法伪代码

```python
# OFA 渐进收缩训练流程伪代码
# Phase 0: 训练最大网络
train_full_network(max_depth=4, max_width=6, max_kernel=7, epochs=180)

# Phase 1: 弹性卷积核 (Elastic Kernel Size)
for epoch in range(PS_epochs_kernel):
    for batch in dataloader:
        # 随机采样卷积核大小 ∈ {3, 5, 7}，深度和宽度保持最大
        subnet = sample_subnet(kernel=[3,5,7], depth=max, width=max)
        # 知识蒸馏: soft_label 来自最大网络
        loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))
        loss.backward()
        optimizer.step()

# Phase 2: 弹性深度 (Elastic Depth)
for epoch in range(PS_epochs_depth):
    subnet = sample_subnet(kernel=[3,5,7], depth=[2,3,4], width=max)
    loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))
    # ...

# Phase 3: 弹性宽度 (Elastic Width)
for epoch in range(PS_epochs_width):
    # 通道按 L1 范数排序后选取前 k 个
    subnet = sample_subnet(kernel=[3,5,7], depth=[2,3,4], width=[3,4,6])
    loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))
    # ...

# 部署阶段: 搜索专用子网
accuracy_predictor = train_predictor(sample_16K_subnets())
latency_table = build_latency_lookup(target_hardware)
best_arch = evolutionary_search(accuracy_predictor, latency_table, constraint)
```

##### 动机与背景

传统的高效模型部署面临严峻的可扩展性问题：每个目标硬件平台（手机、GPU、FPGA 等）都需要独立进行神经架构搜索（NAS）并从头训练模型。随着 IoT 设备数量爆炸式增长（2018 年已超 231 亿台），这种 O(N) 的设计范式在计算成本和碳排放上均不可接受——单次 NAS 搜索（如 NASNet）需要 48,000 GPU hours，相当于 5 辆汽车一生的 CO₂ 排放量。

> 💡 关键：OFA 的核心洞察是**解耦训练与搜索**——只训练一次超网，部署时通过预测器引导搜索直接从超网中选取子网，无需任何额外训练。

##### 核心机制详解

**1. 架构空间设计**

OFA 基于 MobileNetV3 架构空间，将 CNN 划分为 5 个 unit，每个 unit 包含若干层。弹性维度包括：

- **输入分辨率**：128 到 224，步长 4（共 25 种）
- **每 unit 深度**：\(\{2, 3, 4\}\)
- **每层宽度扩展比**：\(\{3, 4, 6\}\)
- **每层卷积核大小**：\(\{3, 5, 7\}\)

总子网数量计算：

$$\left((3 \times 3)^2 + (3 \times 3)^3 + (3 \times 3)^4\right)^5 \approx 2 \times 10^{19}$$

所有子网共享同一组权重 \(W_o\)（仅 7.7M 参数），存储开销极小。

**2. 渐进收缩（Progressive Shrinking）**

训练目标形式化为多目标优化：

$$\min_{W_o} \sum_{arch_i} \mathcal{L}_{val}\big(C(W_o, arch_i)\big)$$

其中 \(C(W_o, arch_i)\) 表示从超网 \(W_o\) 中按配置 \(arch_i\) 选取子网。

直接优化此目标面临两个困难：(1) 枚举所有 \(10^{19}\) 子网计算精确梯度不可行；(2) 随机采样少量子网会因权重干扰导致严重精度下降。

PS 的解决方案是**从大到小渐进训练**：

![弹性卷积核与弹性深度](https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x5.png)
*图：左：核变换矩阵实现弹性卷积核；右：弹性深度保留前 D 层、跳过末尾层。*

- **Phase 1 - 弹性卷积核**：7×7 卷积核的中心 5×5 区域同时作为 5×5 核使用，中心 3×3 区域作为 3×3 核使用。由于中心子核需要扮演多重角色（独立核 vs 大核的一部分），引入**核变换矩阵**（每层仅增加 706 个参数）来消除分布冲突。

- **Phase 2 - 弹性深度**：对于原有 N 层的 unit，深度为 D 的子网保留**前 D 层**（而非任意 D 层），确保权重共享的一致性。前 D 层的权重在大小模型间完全共享。

- **Phase 3 - 弹性宽度**：引入**通道排序**操作，按每个通道权重的 L1 范数排序。选取最重要的前 k 个通道构成小子网，这些通道的权重与大子网共享。

![弹性宽度](https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x6.png)
*图：弹性宽度通过通道排序实现。按 L1 范数选取最重要通道，权重共享。*

> ⚠️ 注意：PS 的关键优势在于——大子网已充分训练后才引入小子网，避免了小子网干扰大子网；同时小子网继承大子网最重要的权重作为初始化，加速收敛。

**3. 与网络剪枝的对比**

PS 可视为**广义网络剪枝**：传统剪枝仅收缩宽度维度并产出单一剪枝网络，而 PS 同时收缩深度、宽度、卷积核大小和分辨率四个维度，且维护所有子网的精度而非单一网络。

**4. 模型特化部署**

训练完成后，部署阶段成本可忽略：

1. 随机采样 16K 子网，在 10K 验证图像上测量精度，训练**精度预测器**
2. 在目标硬件上构建**延迟查找表**
3. 基于预测器进行**进化搜索**，找到满足延迟约束的最优子网

整个搜索过程仅需约 40 GPU hours 收集数据，搜索本身几乎零成本。

##### 与传统方法的关键区别

| 维度 | 传统 NAS (如 MnasNet) | OFA |
|------|----------------------|-----|
| 每新场景成本 | 重新搜索 + 重新训练 | 仅搜索（秒级） |
| 总 GPU hours (40 场景) | 1,600K+ | 1.2K |
| CO₂ 排放 | 453.8K lbs | 0.34K lbs |
| 子网数量 | 1 | \(>10^{19}\) |
| 权重共享 | 无 | 全部共享（7.7M 参数） |

##### 实验亮点

- **ImageNet mobile setting**：OFA 达到 **80.0% top-1**（595M MACs），首次在移动约束下突破 80%
- **vs MobileNetV3**：相同延迟下精度提升最高 4.0%，或相同精度下速度快 1.5×
- **vs EfficientNet**：相同精度下实测延迟快 2.6×
- **多硬件验证**：Samsung S7/Note8/Note10、Google Pixel1/2、LG G8、NVIDIA GPU、Jetson TX2、Xilinx FPGA 等 12+ 平台全面优于 SOTA
- **竞赛冠军**：第 3 届 LPCVC DSP 分类赛道冠军，第 4 届 LPCVC 分类+检测双赛道冠军

#### 🧪 练习题

```yaml
question: "OFA 渐进收缩（Progressive Shrinking）算法中，弹性维度的引入顺序是什么？"
options:
  - "弹性宽度 → 弹性深度 → 弹性卷积核"
  - "弹性卷积核 → 弹性宽度 → 弹性深度"
  - "弹性卷积核 → 弹性深度 → 弹性宽度"
  - "弹性深度 → 弹性卷积核 → 弹性宽度"
answer: 2
explain: "OFA 的渐进收缩按照弹性卷积核→弹性深度→弹性宽度的顺序依次引入，分辨率在整个训练过程中始终弹性采样。这一顺序确保从最容易适配的维度开始，逐步增加难度。"
```