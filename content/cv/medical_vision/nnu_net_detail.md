### nnU-Net：自适应医学图像分割框架

```yaml
id: nnu_net
category: segmentation
paper_url: "https://www.nature.com/articles/s41592-020-01008-z"
motivation: "通过自动化的预处理、网络拓扑、训练和推理配置，使标准U-Net无需手动调参即可在多种医学分割任务上达到SOTA"
```

#### 📝 一句话总结

nnU-Net 提出了一个自适应的医学图像分割框架，通过系统化的规则驱动（固定参数、基于规则的参数、经验参数）自动配置预处理、网络架构拓扑、训练策略和推理流程，使标准 U-Net 架构在无需人工干预的情况下，在 Medical Segmentation Decathlon 等多个基准上超越大量定制化方法。

#### 🎯 核心要点

- **自适应框架设计**：将所有设计决策分为三类——固定参数（如 Leaky ReLU、Instance Norm）、基于规则的参数（如网络拓扑、patch size）、经验参数（如后处理、模型选择），实现全自动配置
- **三种 U-Net 配置**：2D U-Net、3D U-Net、3D U-Net Cascade（级联），自动根据数据集特性选择最优配置或集成
- **动态网络拓扑**：根据数据集的中位图像形状和体素间距，自动计算 patch size、网络深度、特征图通道数和池化操作
- **自适应预处理**：CT 数据使用全局统计量裁剪+归一化，其他模态使用逐图像 z-score 归一化；各向异性数据智能重采样
- **训练策略**：Dice + Cross-Entropy 联合损失、Adam 优化器（lr=3×10⁻⁴）、自动学习率衰减与早停
- **丰富的数据增强**：旋转、缩放、弹性变形、gamma 校正、镜像翻转，3D 各向异性数据退化为 2D 逐层增强
- **鲁棒推理流程**：滑窗预测（中心加权）、测试时增强（镜像）、5 折交叉验证集成
- **自动后处理**：基于连通域分析自动移除小连通分量
- **Medical Segmentation Decathlon 冠军**：在 7 个高度异质的医学分割任务上取得当时最优成绩

#### 🔬 深入细节

![nnU-Net 框架总览](https://raw.githubusercontent.com/MIC-DKFZ/nnUNet/master/documentation/assets/nnU-Net_overview.png)
*图：nnU-Net 框架总览——从数据集指纹提取到自动配置预处理、网络拓扑、训练和推理的完整流程*

##### 算法核心流程

```python
# nnU-Net 自适应配置伪代码
def nnunet_pipeline(dataset):
    # Step 1: 数据集指纹提取
    fingerprint = extract_fingerprint(dataset)  # 图像形状、体素间距、强度分布、类别比例
    
    # Step 2: 自适应预处理
    if modality == 'CT':
        data = clip_to_percentile(data, 0.5, 99.5)  # 全局统计量裁剪
        data = z_score_normalize(data, global_mean, global_std)
    else:
        data = z_score_normalize(data, per_image_mean, per_image_std)
    data = resample_to_target_spacing(data, target_spacing)
    
    # Step 3: 动态网络拓扑配置
    patch_size = compute_patch_size(median_shape, gpu_memory)
    network_depth = determine_depth(patch_size)  # 每轴池化直到特征图 ≤ 某阈值
    
    # Step 4: 训练三个模型
    for config in [UNet2D, UNet3D, UNetCascade]:
        for fold in range(5):  # 5折交叉验证
            model = build_unet(config, network_depth, patch_size)
            train(model, loss=DiceCE, optimizer=Adam(lr=3e-4))
    
    # Step 5: 自动选择最优模型/集成
    best = select_best_ensemble(cross_val_results)
    
    # Step 6: 推理 + 后处理
    prediction = sliding_window_inference(best, test_data, overlap=0.5)
    prediction = apply_tta(prediction)  # 测试时镜像增强
    prediction = postprocess(prediction)  # 连通域分析
    return prediction
```

##### 动机与背景

医学图像分割面临一个核心挑战：**数据集之间的巨大差异性**。不同的成像模态（CT、MRI）、不同的解剖结构（脑肿瘤、肝脏、海马体）、不同的图像尺寸和体素间距，使得没有一套固定的超参数能适用于所有任务。传统方法通常针对每个特定任务进行大量手动调参和架构设计，这不仅耗时，而且难以推广。

nnU-Net 的核心洞察是：**相比于复杂的架构创新，系统化的非架构层面的工程优化（预处理、训练策略、推理技巧）往往更为重要**。论文证明，一个精心配置的标准 U-Net 可以在不修改架构的前提下，超越大量使用注意力机制、残差连接、密集连接等复杂架构的方法。

##### 核心机制详解

**1. 三类参数的设计哲学**

nnU-Net 将所有需要决策的参数分为三类：

- **固定参数（Blueprint Parameters）**：在所有数据集上保持不变的设计选择，如使用 Leaky ReLU（负斜率 0.01）、Instance Normalization、Adam 优化器等。这些是经过大量实验验证的"最佳实践"。
- **基于规则的参数（Rule-based Parameters）**：根据数据集属性通过确定性规则自动推导的参数，如网络拓扑、patch size、重采样策略等。
- **经验参数（Empirical Parameters）**：需要通过实验比较才能确定的参数，如最终选择哪个模型配置、是否使用后处理等。

> 💡 关键：这种分层设计使得 nnU-Net 在保持自动化的同时，避免了对每个参数都进行昂贵的搜索。

**2. 动态网络拓扑配置**

网络拓扑的自动配置是 nnU-Net 最核心的技术之一。给定一个数据集，配置流程如下：

1. **确定目标体素间距**：对于各向同性数据，使用训练集的中位体素间距；对于各向异性数据（最低分辨率轴的间距 > 最高分辨率轴间距的 3 倍），低分辨率轴的间距取中位值与第 10 百分位值中较低的那个。

2. **确定 Patch Size**：从中位重采样后图像形状出发，在 GPU 显存约束（约 5GB per sample）下，通过迭代增大 patch 的各轴尺寸来最大化 patch size。

3. **确定池化策略与网络深度**：沿每个轴进行池化，直到该轴的特征图尺寸降至某个阈值以下。对于各向异性数据，低分辨率轴的池化次数少于高分辨率轴，从而适配不同轴的分辨率差异。

4. **确定特征图通道数**：初始通道数为 32（3D）或 30（2D），每次下采样后翻倍，上限为 320（3D）或 512（2D）。

$$\text{channels}_l = \min(\text{base\_channels} \times 2^l, \text{max\_channels})$$

其中 \(l\) 为网络层级。

**3. 三种 U-Net 配置**

- **2D U-Net**：对 3D 数据逐层（slice-by-slice）处理，适用于各向异性严重的数据集（如层间距远大于层内分辨率）。
- **3D U-Net**：直接处理 3D patch，能捕获三维空间上下文，但受限于 GPU 显存，patch 可能无法覆盖完整图像。
- **3D U-Net Cascade**：两阶段级联方法。第一阶段在降采样的全分辨率图像上训练 3D U-Net 获得粗分割；第二阶段在原始分辨率上训练第二个 3D U-Net，将第一阶段的粗分割作为额外输入通道进行精细化。

> ⚠️ 注意：U-Net Cascade 仅在 3D U-Net 的 patch 无法覆盖完整图像时才启用，否则 3D U-Net 已经能获取足够的全局上下文。

**4. 自适应预处理**

预处理策略根据成像模态自动调整：

- **CT 数据**：由于 CT 值具有物理意义（Hounsfield 单位），使用**全局统计量**进行归一化。首先收集所有训练样本中前景区域的强度值，裁剪到 \([0.5\%, 99.5\%]\) 百分位范围，然后使用全局均值和标准差进行 z-score 归一化。
- **非 CT 数据（MRI 等）**：由于不同扫描仪和协议导致强度分布差异巨大，使用**逐图像** z-score 归一化。

重采样策略同样自适应：
- 各向同性数据：所有轴使用三阶样条插值
- 各向异性数据：高分辨率轴使用三阶样条，低分辨率轴使用最近邻插值（避免引入伪影）
- 分割标签始终使用最近邻插值

**5. 训练策略**

损失函数采用 Dice Loss 与 Cross-Entropy Loss 的加权和：

$$\mathcal{L} = \mathcal{L}_{Dice} + \mathcal{L}_{CE}$$

其中 Dice Loss 定义为：

$$\mathcal{L}_{Dice} = -\frac{2}{|K|} \sum_{k \in K} \frac{\sum_{i \in I} u_{ik} v_{ik}}{\sum_{i \in I} u_{ik} + \sum_{i \in I} v_{ik}}$$

\(u_{ik}\) 为 softmax 预测概率，\(v_{ik}\) 为 one-hot 真值，\(I\) 为像素集合，\(K\) 为类别集合。

训练细节：
- **优化器**：Adam，初始学习率 \(3 \times 10^{-4}\)
- **Epoch 定义**：每 250 个 batch 为一个 epoch
- **学习率调度**：监控训练损失的指数移动平均，若 30 个 epoch 内未改善超过 \(5 \times 10^{-3}\)，学习率除以 5
- **早停**：验证损失 60 个 epoch 内未改善且学习率已降至 \(10^{-6}\) 以下时停止训练
- **前景采样**：强制每个 batch 中超过 1/3 的样本包含至少一个前景类别

**6. 数据增强**

采用丰富的在线数据增强策略：
- 随机旋转、随机缩放、随机弹性变形
- Gamma 校正增强、镜像翻转
- 对于各向异性 3D 数据（patch 最长边 > 最短边的 2 倍），退化为 2D 逐层增强
- U-Net Cascade 第二阶段：对输入的粗分割应用随机形态学操作（腐蚀、膨胀、开运算、闭运算）和随机移除连通分量，防止过度依赖第一阶段结果

**7. 推理与后处理**

推理采用多重策略提升鲁棒性：

- **滑窗预测**：patch 间重叠 50%，使用高斯权重使中心区域权重高于边缘（因为网络在 patch 边缘精度较低）
- **测试时增强（TTA）**：沿所有有效轴进行镜像翻转，每个体素最多聚合 64 次预测（3D U-Net 中心区域）
- **交叉验证集成**：使用 5 折交叉验证的 5 个模型进行集成预测
- **模型集成**：自动尝试所有两两模型组合（2D+3D、2D+Cascade、3D+Cascade），选择交叉验证 Dice 最高的组合
- **后处理**：对训练集标签进行连通域分析，若某类别在所有样本中都只有一个连通分量，则在预测中自动移除该类别的多余连通分量

##### 与传统方法的区别

| 维度 | 传统方法 | nnU-Net |
|------|---------|---------|
| 架构设计 | 针对每个任务设计专用架构（注意力、残差等） | 使用标准 U-Net，自动配置拓扑 |
| 预处理 | 手动选择归一化和重采样策略 | 根据模态和数据集属性自动决定 |
| 超参数 | 大量手动调参或网格搜索 | 规则驱动的自动配置 |
| 泛化性 | 通常只针对单一任务优化 | 一套框架适配所有医学分割任务 |
| 推理 | 简单前向传播 | 滑窗+TTA+集成的多重鲁棒策略 |

> 💡 关键启示：nnU-Net 的成功证明了在医学图像分割中，**系统化的工程优化比架构创新更重要**。这一发现深刻影响了后续医学图像分析领域的研究范式。

#### 🧪 练习题

```yaml
question: "nnU-Net 在处理 CT 数据和 MRI 数据时，归一化策略的核心区别是什么？"
options:
  - "CT 使用 min-max 归一化，MRI 使用 z-score 归一化"
  - "CT 使用全局统计量的 z-score 归一化，MRI 使用逐图像的 z-score 归一化"
  - "CT 不需要归一化，MRI 使用直方图均衡化"
  - "CT 和 MRI 都使用相同的逐图像 z-score 归一化"
answer: 1
explain: "CT 值具有物理意义（HU 单位），不同样本间可比较，因此使用全局统计量归一化；MRI 强度因扫描仪和协议不同而差异巨大，需逐图像独立归一化。"
```