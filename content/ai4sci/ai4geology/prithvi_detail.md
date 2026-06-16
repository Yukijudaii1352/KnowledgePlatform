### Prithvi

```yaml
id: prithvi
name: Prithvi
full_name: 地球基础模型 (Prithvi)
year: '2023'
org: IBM & NASA
paper_url: https://huggingface.co/ibm-nasa-geospatial
category: rs_analysis
parent: satmae
motivation: 地理空间基础模型HLS数据预训练
```

#### 📝 一句话总结

Prithvi 将 MAE/ViT 预训练扩展到多时相、多光谱 HLS 卫星影像，用 3D patch embedding 和 3D 位置编码学习可迁移的地表表征，解决了遥感任务高度依赖小规模标注、模型难以跨任务复用的问题。

#### 🎯 核心要点

- **100M 参数地理空间基础模型**：IBM 与 NASA 基于 ViT-MAE 训练 Prithvi-100M，并在 Hugging Face 开源模型权重、推理和微调工作流
- **HLS 多光谱预训练数据**：使用 NASA Harmonized Landsat Sentinel-2 30m 地表反射率数据，输入包含 Blue、Green、Red、Narrow NIR、SWIR 1、SWIR 2 六个波段
- **视频式遥感输入格式**：模型接受 \((B,C,T,H,W)\) 形状的多时相影像序列，既可处理 \(T=3\) 的时间序列，也可退化为 \(T=1\) 的静态图像
- **3D MAE 改造**：把原始 MAE 的 2D patch embedding、2D positional embedding、2D patchify/unpatchify 改为 3D 版本，以同时编码空间位置和时间维度
- **云与缺失值过滤流水线**：通过 FMask 和离线索引筛选高质量 HLS 子区域，并用 Zarr 组织训练样本，降低大规模 GeoTIFF 随机读取瓶颈
- **多任务微调验证**：在云缺口补全、洪水制图、野火烧毁迹地分割、多时相作物分割等任务中验证预训练权重的收敛速度和数据效率

#### 🔬 深入细节

##### 图示与可访问来源

![Prithvi MAE 预训练结构](https://ar5iv.labs.arxiv.org/html/2310.18660/assets/x2.png)
*图：Prithvi 论文 Figure 3。多时相多光谱 HLS 影像被随机遮蔽后，经 3D patch embedding 输入 ViT 编码器，解码器重建原始影像并用 MSE 训练。*

![Prithvi 基础模型开发流程](https://ar5iv.labs.arxiv.org/html/2310.18660/assets/x1.png)
*图：Prithvi 论文 Figure 1。完整流程包含地理空间数据采样、过滤预处理、自监督预训练、下游微调和推理部署。*

来源说明：任务给出的 `paper_url` 是 Prithvi Hugging Face 模型家族页；方法细节主要来自技术论文 `Foundation Models for Generalist Geospatial Artificial Intelligence`（arXiv:2310.18660）和官方模型卡 `ibm-nasa-geospatial/Prithvi-EO-1.0-100M`。

##### 算法伪代码

```python
# Prithvi-EO-1.0 的 MAE 预训练与微调流程
def pretrain_prithvi(hls_timeseries, mask_ratio=0.75):
    # hls_timeseries: [B, C=6, T, H, W], HLS 多光谱多时相反射率
    x = normalize_and_filter_with_fmask(hls_timeseries)

    # 1. 3D patchify: 用时间 x 高 x 宽的 tubelet 切分输入
    patches = patchify_3d(x, patch_size=(1, 16, 16))
    visible, masked_index = random_mask(patches, ratio=mask_ratio)

    # 2. 3D ViT encoder 只处理可见 token
    tokens = patch_embed_3d(visible) + positional_encoding_3d(visible)
    latent = vit_encoder(tokens)

    # 3. Decoder 放回可见 token 并补入 mask token，重建完整影像
    full_tokens = restore_with_mask_tokens(latent, masked_index)
    pred_patches = vit_decoder(full_tokens)

    # 4. 仅在 masked patch 上计算像素空间 MSE
    loss = mse(pred_patches[masked_index], patches[masked_index])
    return loss


def finetune_prithvi(pretrained_encoder, labeled_chips, task_decoder):
    for image_sequence, label in labeled_chips:
        features = pretrained_encoder(image_sequence)
        prediction = task_decoder(features)
        loss = task_loss(prediction, label)  # segmentation CE/Dice 或回归损失
        update(pretrained_encoder, task_decoder, loss)
```

##### 为什么遥感基础模型不能直接套普通 MAE

自然图像 MAE 默认输入是 RGB 单帧图像，空间 patch 的含义比较稳定；HLS 遥感影像不同，单个样本既有多个光谱波段，又可能包含同一地点的多个观测时间。若把每个时间片单独当作 2D 图像处理，模型很难知道“同一地块在不同日期的观测”应当共享空间语义；若把时间和波段粗暴拼到通道维，时间顺序和时相差异又会被弱化。

Prithvi 的核心改造是把输入看成一个 3D 遥感体：

$$
X \in \mathbb{R}^{C \times T \times H \times W}
$$

其中 \(C=6\) 为 HLS 公共波段，\(T\) 为时间步。3D patch embedding 用 3D 卷积把输入切成 tubelet token：

$$
z_i = \mathrm{Conv3D}_{(t_p,h_p,w_p)}(X_i)
$$

论文实现中时间 tubelet 可设为 1，使每个 token 仍对应一个具体观测日期的局部空间块；但位置编码扩展为时间、高度、宽度三维，使模型知道 token 在序列中的时空位置：

$$
p_{t,h,w} = \mathrm{PE}_t(t) \oplus \mathrm{PE}_h(h) \oplus \mathrm{PE}_w(w)
$$

这样做的直觉是：同一地块的农作物物候、洪水退水和烧毁迹地恢复都体现为时序变化；同一时间的邻近 patch 又构成空间纹理。3D ViT 让二者在同一个 token 序列里被注意力机制联合建模。

##### 遮蔽重建目标

Prithvi 沿用 MAE 的非对称编码器-解码器思想。随机遮蔽 patch 集合 \(\mathcal{M}\)，编码器只看未遮蔽集合 \(\mathcal{V}\)：

$$
H_{\mathcal{V}} = f_{\theta}\left(E_{3D}(X_{\mathcal{V}})+P_{3D,\mathcal{V}}\right)
$$

解码器接收编码后的可见 token 与可学习 mask token，重建完整 HLS 影像：

$$
\hat{X}_{\mathcal{M}} = g_{\phi}\left(H_{\mathcal{V}}, m_{\mathcal{M}}, P_{3D}\right)
$$

预训练损失是在被遮蔽 patch 的像素空间计算均方误差：

$$
\mathcal{L}_{\mathrm{MAE}}
= \frac{1}{|\mathcal{M}|}
\sum_{i \in \mathcal{M}}
\left\|\hat{x}_i - x_i\right\|_2^2
$$

这个目标逼迫模型根据空间邻域、其它波段和相邻时相补全缺失区域。对遥感而言，这比普通分类预训练更合适，因为大量 HLS 数据没有人工标签，但自监督遮蔽重建可以直接利用未标注影像。

##### 数据工程也是方法的一部分

Prithvi 论文不只提出一个网络结构，还强调大规模地理空间预训练的工程框架。HLS 原始数据以多日期、多波段 GeoTIFF 分散存放，若训练时每个 batch 动态打开大量文件，I/O 会压住 GPU 利用率。论文因此先基于云掩膜和缺失值离线筛选可用子区域，再把样本与元信息组织为 Zarr 数组。

预处理可概括为：

$$
\mathrm{keep}(r,t)=
\mathbf{1}\left[
\mathrm{cloud}(r,t) < \tau_c
\land
\mathrm{nodata}(r,t) < \tau_n
\right]
$$

其中 \(r\) 是 HLS tile 中的空间窗口，\(t\) 是观测日期。保留下来的窗口才进入训练索引。这个步骤避免模型把云、云影和传感器缺测当作正常地表模式学习，同时减少需要搬运到训练环境的数据量。

##### 下游微调方式

预训练完成后，Prithvi 的编码器作为通用遥感特征提取器接入不同 decoder。对语义分割任务，例如洪水或火烧迹地映射，常见目标是逐像素分类：

$$
\mathcal{L}_{\mathrm{seg}}
= -\frac{1}{HW}\sum_{u,v}\sum_{k=1}^{K}
y_{u,v,k}\log p_{u,v,k}
$$

也可以与 Dice、Lovasz 或类别加权交叉熵结合，以处理洪水、烧毁区域这类前景稀疏类别。论文比较了三种设置：完整微调、冻结编码器只训任务 decoder、随机初始化训练。结果显示预训练权重通常能更快收敛，并在标注数据减少时保持更强的数据效率。

> 💡 关键：Prithvi 的贡献不是把 ViT 放到卫星图上，而是把多时相、多光谱 HLS 数据组织成可自监督学习的时空 token，并配套解决云过滤、采样和大规模读取问题。

##### 与 SatMAE 的关系

SatMAE 已经证明 MAE 可以适配卫星影像中的时间或多光谱结构；Prithvi 进一步把这一思想做成面向 HLS 的开放地理空间基础模型。它更强调端到端工程闭环：从 HLS 数据发现、质量过滤、自监督预训练，到面向洪水、火灾、作物等任务的可复用微调流程。因此在图谱中，Prithvi 可视为 SatMAE 思路走向大规模开放地球观测基础模型的代表。

#### 🧪 练习题

```yaml
question: "Prithvi 相比普通图像 MAE 的关键结构改造是什么？"
options:
  - "把 HLS 六个波段转换成单通道灰度图，只训练 CNN 分类器"
  - "把 2D patch/位置编码改为 3D 版本，使模型能处理多时相多光谱遥感输入"
  - "完全依赖人工标注的洪水和火灾数据进行监督预训练"
  - "只用 RGB 航拍图像训练，不使用 HLS 数据"
answer: 1
explain: "Prithvi 将输入组织为 (B,C,T,H,W)，用 3D patch embedding 和 3D positional encoding 建模空间与时间维度，再用 MAE 遮蔽重建进行自监督预训练。"
```
