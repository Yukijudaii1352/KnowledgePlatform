### ARMamba

```yaml
id: armamba
name: ARMamba
full_name: "自适应残差Mamba (Adaptive Residual Mamba)"
year: "2026"
org: "Various Institutions"
paper_url: "https://ieeexplore.ieee.org/abstract/document/11501189/"
category: "change_detection"
parent: "glmamba"
motivation: "自适应残差Mamba解决长程依赖问题"
```

#### 📝 一句话总结

ARMamba 提出 Adaptive Residual Mamba，用自适应残差状态块和交叉门控双向扫描替换固定残差与固定扫描策略，使遥感变化检测在保留局部细节的同时更灵活地建模长程空间依赖。

#### 🎯 核心要点

- 官方 DOI 索引题名为 Adaptive Residual Mamba Network for Remote Sensing Change Detection，IEEE GRSL 2026，文档号应为 `11494030`；给定 `11501189` 指向另一篇 IEEE 论文。
- 目标问题：CNN 局部细节强但全局依赖弱，Transformer 全局强但计算重，早期 Mamba-CD 方法又常使用固定残差和固定扫描。
- Adaptive Residual State (ARS) block：用自适应卷积核和可学习缩放动态校准残差信号。
- Cross-Gated Bi-Scanning (CGBS)：沿双向空间序列扫描，并用跨方向门控调节信息流。
- 变化检测主干：对双时相影像提取共享/对称特征，融合差异特征后解码变化图。
- 公开摘要报告在 LEVIR-CD、SYSU-CD、WHU-CD 上相对 ChangeMamba 的 F1-score 分别提升 0.82%、1.95%、1.62%。
- 正文闭源无法确认图表细节，以下结构解读基于 IEEE/DOI 摘要和 Mamba-CD 公开范式做保守还原。

#### 🔬 深入细节

![相关 Mamba-CD 框架图](https://ar5iv.labs.arxiv.org/html/2406.04207/assets/x1.png)
*图：同类 Mamba 变化检测框架示意。ARMamba 的原论文图未开放访问；此图仅用于说明 Mamba-CD 中编码、扫描与融合模块通常嵌入的位置。*

##### 算法伪代码

```python
def armamba_change_detection(img1, img2):
    f1, f2 = stem(img1), stem(img2)
    multi_scale = []

    for stage in stages:
        f1, f2 = stage.down(f1), stage.down(f2)

        # ARS: 残差不是固定相加，而是由局部自适应卷积和可学习尺度校准
        f1 = adaptive_residual_state(f1)
        f2 = adaptive_residual_state(f2)

        # CGBS: 双向扫描，并用另一方向的状态作为 gate
        f1 = cross_gated_bi_scan(f1)
        f2 = cross_gated_bi_scan(f2)

        multi_scale.append(abs(f1 - f2))

    change_features = fuse(multi_scale)
    return decoder(change_features)
```

##### 方法解读

遥感变化检测需要同时看清建筑边界、道路细线等局部细节，也要判断大范围上下文中的真实变化和伪变化。CNN 的固定卷积窗口对边界友好，但难以覆盖长距离依赖；Transformer 能全局建模，却对高分辨率双时相影像成本较高。Mamba/State Space Model 提供线性复杂度长序列建模，因此成为 2024 年后 RSCD 的重要方向。

ARMamba 关注的是早期 Mamba-CD 的两个具体不足：第一，残差连接常是固定的 \(Y=X+\operatorname{Mamba}(X)\)，无法根据区域纹理、尺度和变化难度动态调节；第二，选择性扫描路径常被预设，空间依赖建模的方向适应性不足。

ARS block 可以理解为给残差分支加一个可学习的校准器：

$$
Y=X+\gamma(X)\odot \operatorname{Mamba}(\operatorname{AKC}(X))
$$

其中 \(\operatorname{AKC}\) 表示自适应 kernel convolver，\(\gamma(X)\) 是可学习或数据相关的缩放。这样，纹理复杂或边界区域可以保留更多局部卷积线索，开阔区域则更多依赖 Mamba 的长程状态传播。

CGBS 的核心是双向扫描与跨方向门控。若 \(S_{\rightarrow}\) 和 \(S_{\leftarrow}\) 分别表示两个方向的 Mamba 状态输出，则融合可以写成：

$$
G_{\rightarrow}=\sigma(W_g S_{\leftarrow}),\quad
G_{\leftarrow}=\sigma(W_g S_{\rightarrow})
$$

$$
Y=G_{\rightarrow}\odot S_{\rightarrow}+G_{\leftarrow}\odot S_{\leftarrow}
$$

这种设计让一个方向的上下文决定另一个方向的信息保留强度，缓解单一扫描顺序造成的空间偏置。对双时相变化检测来说，它有助于区分“沿扫描路径出现的局部纹理扰动”和“在多个方向上都一致支持的真实变化”。

训练流程仍是典型二值变化检测：输入配准影像对，输出变化概率图，用 BCE、Dice 或 Focal 类损失优化。公开摘要未披露完整损失公式，因此不应臆造额外监督项；可确定的是模型以 LEVIR-CD、SYSU-CD、WHU-CD 为主要验证集。

> ⚠️ 注意：本条用户给定 IEEE 链接与 ARMamba DOI 不一致；方法图也未开放。因此本文只使用公开摘要可验证的 ARS、CGBS、数据集和增益信息，未编造论文未公开的模块参数。

#### 🧪 练习题

```yaml
question: "ARMamba 中 ARS block 相比固定残差连接的主要目的是什么？"
options:
  - "完全移除局部卷积信息"
  - "动态校准残差信号，使局部细节与长程状态建模按区域自适应融合"
  - "把二值变化检测改成目标检测"
  - "只降低输入图像分辨率"
answer: 1
explain: "ARS 用自适应卷积与可学习缩放调节残差分支，避免所有空间位置都采用同一固定残差强度。"
```
