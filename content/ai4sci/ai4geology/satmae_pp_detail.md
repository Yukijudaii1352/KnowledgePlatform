### SatMAE++

```yaml
id: satmae_pp
name: SatMAE++
full_name: SatMAE++ (SatMAE++)
year: '2024'
org: Stanford University
paper_url: https://arxiv.org/abs/2403.08051
category: rs_analysis
parent: satmae
motivation: 多尺度预训练mAP提升2.5%
```

#### 📝 一句话总结

SatMAE++ 在 SatMAE 的遥感 MAE 预训练框架上加入多尺度重建，用卷积上采样块把低分辨率 MAE 输出恢复到更高尺度，解决了多光谱遥感影像中目标尺度变化大、单尺度遮蔽重建表征不足的问题。

#### 🎯 核心要点

- **来源校正**：给定 `paper_url` 实际指向 arXiv:2403.08051 `Multi-Apartment Rent Division`；SatMAE++ 对应论文是 CVPR 2024 `Rethinking Transformers Pre-training for Multi-Spectral Satellite Imagery`，arXiv:2403.05419
- **多尺度 MAE 预训练**：输入高分辨率影像先下采样为 \((H,W)\)、\((2H,2W)\)、\((4H,4W)\) 多个尺度，最低尺度送入 SatMAE/MAE 主干
- **高尺度重建监督**：MAE decoder 先重建最低尺度影像，再通过卷积 upsample block 逐级恢复到更高分辨率，并在每个尺度计算重建损失
- **卷积上采样块**：每个 upsample block 使用转置卷积扩大空间分辨率，再用两个 \(3\times3\) 卷积组成残差块增强局部细节
- **不依赖 GSDPE**：相比 ScaleMAE 的 GSD 位置编码，SatMAE++ 保留标准/光谱位置编码，用多尺度重建而不是复杂 GSD 编码来学习尺度信息
- **兼容 RGB 与 Sentinel-2 多光谱**：在 fMoW-RGB 与 fMoW-Sentinel 上预训练；多光谱设置沿用 SatMAE 的按 GSD 分组 band embedding 与 75% patch masking
- **下游收益明确**：论文报告在六个遥感数据集上达到 SOTA，并在 BigEarthNet 多标签分类上取得 2.5% mAP 增益

#### 🔬 深入细节

##### 图示与可访问来源

![SatMAE++ 多尺度重建框架](https://ar5iv.labs.arxiv.org/html/2403.05419/assets/figures/overall_architecture.png)
*图：SatMAE++ 论文 Figure 1。低尺度图像进入 MAE，decoder 输出再经上采样块恢复到 \((2H,2W)\) 和 \((4H,4W)\)，各尺度共同参与损失。*

![SatMAE++ 上采样块](https://ar5iv.labs.arxiv.org/html/2403.05419/assets/figures/upsample.png)
*图：论文 Figure 2。Upsample block 由转置卷积、归一化与激活、两层 \(3\times3\) 残差卷积组成，用于补回高分辨率局部纹理。*

来源说明：本文件保留任务 YAML 中的 `paper_url`，但实际精读来源为 arXiv:2403.05419、CVPR OpenAccess PDF 和官方仓库 `https://github.com/techmn/satmae_pp`。

##### 算法伪代码

```python
# SatMAE++ 三尺度预训练伪代码
def train_satmae_pp(high_res_image, mask_ratio=0.75):
    # high_res_image: I_bar, shape [C, 4H, 4W]
    I_bar = high_res_image
    I_hat = downsample(I_bar, scale=0.5)   # [C, 2H, 2W]
    I = downsample(I_hat, scale=0.5)       # [C, H, W]

    # 1. 最低尺度执行 SatMAE/MAE 遮蔽重建
    patches = patchify(I)
    visible, mask_index = random_mask(patches, ratio=mask_ratio)
    tokens = grouped_patch_embed(visible) + spectral_or_rgb_pos_embed(visible)
    latent = transformer_encoder(tokens)
    F = transformer_decoder_restore_and_reconstruct(latent, mask_index)

    # 2. 把低尺度重建投影回特征空间，并逐级上采样
    feat = linear_project(F)
    F_hat_feat = upsample_block(feat)      # -> [C_feat, 2H, 2W]
    F_bar_feat = upsample_block(F_hat_feat)  # -> [C_feat, 4H, 4W]

    F_hat = linear_to_image(F_hat_feat)
    F_bar = linear_to_image(F_bar_feat)

    # 3. 低尺度用 MSE，高尺度用 L1，联合优化
    L1 = mse(F, I)
    L2 = l1(F_hat, I_hat)
    L3 = l1(F_bar, I_bar)
    loss = alpha1 * L1 + alpha2 * L2 + alpha3 * L3
    return loss
```

##### SatMAE++ 要解决的具体问题

遥感图像和自然图像最大的差别之一是尺度不稳定。同样大小的 patch，在 0.3m 航拍图里可能覆盖几栋建筑，在 10m Sentinel-2 图里可能覆盖一片农田，在 30m Landsat/HLS 图里又可能覆盖更大地物混合区域。多光谱 Sentinel-2 还存在不同 band 的 Ground Sample Distance 不一致：B2/B3/B4/B8 为 10m，红边和 SWIR 多为 20m，B1/B9/B10 为 60m。

SatMAE 已经通过多光谱 band grouping 和光谱位置编码适配 Sentinel-2，但其遮蔽重建主要发生在单一尺度。SatMAE++ 的判断是：不一定要像 ScaleMAE 那样引入复杂的 GSD-based positional encoding；只要让模型在预训练阶段必须同时恢复低尺度语义和高尺度细节，就能迫使 ViT token 学到更好的尺度鲁棒表征。

##### 多尺度损失函数

对两尺度设置，设最低尺度输入为 \(I\in\mathbb{R}^{C\times H\times W}\)，高一档尺度输入为 \(\hat{I}\in\mathbb{R}^{C\times 2H\times 2W}\)。MAE decoder 先输出最低尺度重建 \(F\)，对应 MSE 损失：

$$
L_1=\frac{1}{n}\sum_{i=1}^{n}\left(F_i-I_i\right)^2
$$

随后，SatMAE++ 将 \(F\) 投影到特征空间，经上采样块得到高尺度重建 \(\hat{F}\)，并使用 L1 损失：

$$
L_2=\frac{1}{n}\sum_{i=1}^{n}\left|\hat{F}_i-\hat{I}_i\right|
$$

两尺度总损失为：

$$
\mathcal{L}_{2\text{-scale}}=\alpha_1L_1+\alpha_2L_2
$$

对多光谱三尺度设置，额外使用最高尺度 \(\bar{I}\in\mathbb{R}^{C\times 4H\times 4W}\) 和重建 \(\bar{F}\)：

$$
L_3=\frac{1}{n}\sum_{i=1}^{n}\left|\bar{F}_i-\bar{I}_i\right|
$$

$$
\mathcal{L}_{3\text{-scale}}=\alpha_1L_1+\alpha_2L_2+\alpha_3L_3
$$

论文选择在高尺度用 L1，是因为高分辨率重建更像超分辨率/细节恢复任务，L1 通常比 MSE 更少产生过度平滑；最低尺度仍用 MSE，以保持与 MAE 主干的重建目标一致。

##### 上采样块的机制

Upsample block 接收 \(X\in\mathbb{R}^{C\times H\times W}\)，先通过转置卷积扩大空间大小：

$$
U=\mathrm{LeakyReLU}\left(\mathrm{Norm}\left(\mathrm{ConvTranspose}_{4\times4}(X)\right)\right)
$$

再用残差卷积块补强局部纹理：

$$
\tilde{X}=U+\mathrm{Norm}\left(\mathrm{Conv}_{3\times3}\left(
\sigma\left(\mathrm{Conv}_{3\times3}(U)\right)\right)\right)
$$

这种设计把 Transformer 的全局 token 表征和卷积的局部归纳偏置结合起来。ViT encoder 负责学习跨 patch 的语义依赖；上采样块负责把语义特征翻译回高尺度空间细节。对于遥感图像，这一点很重要，因为道路、田块边界、小建筑、河道边缘等目标往往依赖局部纹理。

##### 多光谱分组如何接入

SatMAE++ 的多光谱主干沿用 SatMAE 的思想：不要把所有 Sentinel-2 band 简单拼成一个大通道输入，而是按空间分辨率/语义接近性分组，再为每组建立 patch embedding。官方仓库示例中，训练 fMoW-Sentinel 时丢弃 B1、B9、B10，并将可用 band 分为：

- B2、B3、B4、B8
- B5、B6、B7、B8A
- B11、B12

每组 patch token 在空间维拼接，然后进入同一个 ViT。这样做的直觉是：10m 可见光/NIR、20m 红边与 SWIR 的物理含义不同，单独投影可以减少不同传感器尺度之间的混淆；进入 Transformer 后，注意力再学习跨 band 与跨空间位置的组合关系。

##### 与 SatMAE 和 ScaleMAE 的区别

SatMAE 的优势是证明了 MAE 可以有效处理时间和多光谱卫星影像，但它的重建目标仍偏单尺度。ScaleMAE 针对尺度问题引入 GSD-aware positional encoding 和 Laplacian decoder，但 GSDPE 对 RGB 光学数据更自然，在多光谱 band 具有不同 GSD 时会变复杂。SatMAE++ 的取舍更朴素：保持 SatMAE 的标准位置编码和分组输入，只通过“多尺度重建任务”向模型注入尺度约束。

> 💡 关键：SatMAE++ 的创新点不在于更大的 ViT，而在于把预训练目标从“恢复一个尺度的遮蔽 patch”改成“从低尺度语义同时恢复多个空间尺度”，从目标函数上逼迫表示具备尺度感。

##### 训练与评估设置

论文在 fMoW-RGB 和 fMoW-Sentinel 上做预训练。RGB 实验使用 ViT-Large、224 输入、16 patch、800 epoch；Sentinel-2 实验使用 96 输入、8 patch、50 epoch，并保持 75% masking。下游评估覆盖 fMoW-RGB、fMoW-Sentinel、EuroSAT、RESISC-45、UCMerced、BigEarthNet 等遥感分类/多标签任务。结果显示，多尺度预训练不仅提升最终指标，也让 fMoW-Sentinel 微调更快达到峰值验证分数。

#### 🧪 练习题

```yaml
question: "SatMAE++ 相比 SatMAE 的主要改动是什么？"
options:
  - "删除 MAE 遮蔽重建，只使用监督分类损失"
  - "在 MAE 低尺度重建后加入卷积上采样块，并对更高空间尺度施加重建损失"
  - "只使用 RGB 波段，完全不支持 Sentinel-2 多光谱输入"
  - "用语言模型解码器替代 ViT encoder"
answer: 1
explain: "SatMAE++ 保留 SatMAE/MAE 主干，但新增多尺度重建分支，高尺度由卷积上采样块恢复，并用 L1 损失约束细节，从而学习尺度鲁棒表征。"
```
