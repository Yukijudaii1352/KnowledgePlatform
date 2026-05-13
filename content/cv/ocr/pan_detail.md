### PAN: Efficient and Accurate Arbitrary-Shaped Text Detection with Pixel Aggregation Network

```yaml
id: pan
name: PAN
full_name: "像素聚合网络 (Pixel Aggregation Network)"
year: "2019"
org: "Zhejiang University / Megvii"
paper_url: "https://arxiv.org/abs/1908.05900"
category: "scene_text_detection"
parent: "PSENet"
motivation: "通过轻量特征提取(FPEM)和可学习后处理(PA)，以极低计算开销实现任意形状文本的实时检测"
```

#### 📝 一句话总结

PAN 提出了低计算量的特征金字塔增强模块（FPEM）和可学习的像素聚合（PA）后处理策略，在保持高精度的同时将任意形状文本检测速度提升至实时水平（26.1 FPS @ 640px，ResNet18 骨干）。

#### 🎯 核心要点

- 轻量骨干 + 可级联 FPEM：使用 ResNet18 作为骨干，FPEM 采用可分离卷积构建 U 形结构，计算量仅为标准 FPN 的 1/5，且可多次级联（默认 \(n_c=2\)）持续增强特征
- 特征融合模块（FFM）：将多个 FPEM 输出逐尺度相加后上采样拼接，生成 \(4 \times 128 = 512\) 通道的融合特征图
- 像素聚合（PA）后处理：预测文本区域分割图、收缩核分割图和相似性向量，通过聚合损失 \(\mathcal{L}_{agg}\) 和判别损失 \(\mathcal{L}_{dis}\) 引导像素向对应核心聚类，实现快速且可学习的实例重建
- 损失函数设计：\(\mathcal{L} = \mathcal{L}_{tex} + 0.5\mathcal{L}_{ker} + 0.25(\mathcal{L}_{agg} + \mathcal{L}_{dis})\)，分割部分使用 Dice Loss 解决正负样本不平衡
- 速度-精度权衡：CTW1500 上 PAN-320 达 79.9% F-measure @ 84.2 FPS；PAN-640 达 83.7% F-measure @ 26.1 FPS

#### 🔬 深入细节

![PAN 整体架构图](https://arxiv.org/html/1908.05900v2/extracted/figures/pipeline.png)
*图：PAN 整体流程——轻量骨干提取多尺度特征 → FPEM 级联增强 → FFM 融合 → 分割头预测文本区域/核/相似向量 → PA 聚合重建实例*

```python
# PAN 像素聚合 (Pixel Aggregation) 后处理伪代码
def pixel_aggregation(P_tex, P_ker, P_sim, threshold=0.5):
    """
    P_tex: 文本区域分割图 (H, W)
    P_ker: 收缩核分割图 (H, W)  
    P_sim: 相似性向量图 (4, H, W)
    """
    # Step 1: 在核分割图上找连通域作为初始实例
    kernels = connected_components(P_ker > threshold)
    
    # Step 2: 计算每个核的相似性向量均值
    for k in kernels:
        k.center = mean(P_sim[:, k.mask])
    
    # Step 3: 对文本区域中的非核像素，按相似性向量距离聚合到最近核
    text_pixels = (P_tex > threshold) & (P_ker <= threshold)
    for pixel in text_pixels:  # BFS/queue-based
        nearest_kernel = argmin(||P_sim[:, pixel] - k.center|| for k in neighbors)
        if distance < delta_agg:  # δ_agg = 0.5
            assign pixel to nearest_kernel
    
    # Step 4: 输出每个实例的像素集合作为检测结果
    return [instance.pixels for instance in kernels]
```

**动机与背景**

基于分割的文本检测方法（如 PSENet）虽然能处理任意形状文本，但面临两个瓶颈：(1) 特征提取网络（如 ResNet50 + FPN）计算量大，难以实时；(2) 后处理中的渐进式尺度扩展（Progressive Scale Expansion）耗时严重，成为速度瓶颈。PAN 的核心目标是同时解决这两个问题。

**FPEM：轻量可级联的特征增强**

FPEM 是一个 U 形模块，包含自底向上和自顶向下两条路径。每条路径在相邻尺度间使用 **可分离卷积**（depthwise separable convolution）进行特征融合：先对低分辨率特征上采样/下采样到目标尺度，再与目标尺度特征逐元素相加，最后通过 3×3 深度可分离卷积精炼。

$$
\text{FPEM 单步}: F_{out} = \text{DWSepConv}_{3\times3}(F_{in} + \text{Resize}(F_{adj}))
$$

关键设计：
- 所有中间通道统一为 128，大幅减少参数
- 可分离卷积使计算量降至标准卷积的 1/5
- **可级联特性**：输入输出通道数相同，可堆叠 \(n_c\) 个 FPEM 持续增强特征，实验表明 \(n_c=2\) 即可获得显著提升

> 💡 关键：FPEM 的级联设计使得即使使用轻量骨干（ResNet18），也能通过多次特征增强弥补表达能力不足。

**FFM：多尺度特征融合**

当使用 \(n_c\) 个级联 FPEM 时，每个尺度会产生 \(n_c\) 组特征图。FFM 的策略是：
1. 对同一尺度的所有 FPEM 输出进行逐元素相加
2. 将 4 个尺度的特征图统一上采样到最大分辨率（1/4 原图）
3. 沿通道维度拼接，得到 \(4 \times 128 = 512\) 通道的融合特征

最终通过 1×1 卷积将 512 通道降维，分别预测：文本区域图 \(P_{tex}\)、核区域图 \(P_{ker}\)、相似性向量图 \(P_{sim}\)（4维）。

**PA：可学习的像素聚合**

PA 是 PAN 最核心的创新，用于替代 PSENet 中耗时的渐进式扩展。其思路是：

1. **预测相似性向量**：网络为每个像素预测一个 4 维向量，语义相同的像素应具有相近的向量
2. **聚合损失** \(\mathcal{L}_{agg}\)：拉近同一文本实例内像素向量与该实例核心向量的距离

$$
\mathcal{L}_{agg} = \frac{1}{N}\sum_{i=1}^{N}\frac{1}{|T_i|}\sum_{p \in T_i} \ln(D(p, K_i) + 1)
$$

其中 \(D(p, K_i) = \max(||F(p) - G(K_i)|| - \delta_{agg}, 0)\)，\(\delta_{agg}=0.5\)

3. **判别损失** \(\mathcal{L}_{dis}\)：推远不同实例核心之间的距离

$$
\mathcal{L}_{dis} = \frac{1}{N(N-1)}\sum_{i=1}^{N}\sum_{j=1,j\neq i}^{N} \ln(D'(K_i, K_j) + 1)
$$

其中 \(D'(K_i, K_j) = \max(\delta_{dis} - ||G(K_i) - G(K_j)||, 0)\)，\(\delta_{dis}=3\)

> ⚠️ 注意：PA 的后处理只需一次 BFS 遍历即可完成实例重建，时间复杂度为 O(像素数)，远快于 PSENet 的多次膨胀操作。

**与 PSENet 的关键区别**

| 方面 | PSENet | PAN |
|------|--------|-----|
| 骨干网络 | ResNet50 + FPN | ResNet18 + FPEM×2 |
| 后处理 | 渐进式尺度扩展（多轮BFS） | 像素聚合（单轮BFS + 相似向量） |
| 后处理可学习 | 否（纯规则） | 是（聚合/判别损失引导） |
| CTW1500 速度 | 3.9 FPS | 26.1 FPS（快 6.7×） |

#### 🧪 练习题

```yaml
question: "PAN 中像素聚合（PA）模块的核心作用是什么？"
options:
  - "替代 NMS 进行候选框筛选"
  - "通过相似性向量将文本像素聚合到对应的收缩核，重建完整文本实例"
  - "对特征图进行多尺度融合增强"
  - "生成文本区域的最小外接矩形"
answer: 1
explain: "PA 利用网络预测的相似性向量，将文本区域像素按距离聚合到对应的收缩核实例上，从而快速重建完整文本区域，替代了 PSENet 中耗时的渐进式扩展。"
```