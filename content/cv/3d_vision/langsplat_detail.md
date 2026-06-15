### LangSplat

```yaml
id: langsplat
name: LangSplat
full_name: 语言高斯泼溅 (LangSplat)
year: '2024'
org: NTU
paper_url: https://arxiv.org/abs/2312.16084
category: gaussian_splatting
parent: 3dgs
motivation: 语言特征嵌入高斯点云实现语义级3D理解
```

#### 📝 一句话总结

LangSplat 提出将 CLIP 语言特征蒸馏到 3D Gaussian Splatting 中，用带语言嵌入的高斯点云构建可实时查询的 3D language field，解决 NeRF 语言场渲染慢、边界模糊和多尺度查询低效的问题。

#### 🎯 核心要点

- **语言高斯表示**：在每个 3D Gaussian 上附加多层级语言特征，使显式高斯点云同时承载外观、几何和开放词表语义
- **SAM 层级语义监督**：利用 SAM 对每张训练图像生成 subpart、part、whole 三个语义层级的 mask，再对每个 mask 提取 CLIP embedding
- **场景级语言自编码器**：将 512 维 CLIP 特征压缩到场景特定的低维 latent，降低显式高斯存储和 splatting 渲染成本
- **两阶段训练**：先训练或加载 RGB 3DGS，再固定高斯几何与不透明度，仅优化语言 latent 特征
- **tile-based feature splatting**：复用 3DGS 的瓦片光栅化，把语言特征像颜色一样 alpha 合成到视图平面
- **开放词表查询**：渲染语言 latent 后用 decoder 还原 CLIP 空间，并与任意文本 query 的 CLIP embedding 计算相关性
- **效率优势**：论文报告在 1440×1080 分辨率下相对 LERF 获得约 199× 的查询/渲染加速

#### 🔬 深入细节

##### 核心示意图

![LangSplat 语言场可视化](https://langsplat.github.io/static/images/teaser.png)
*图：LangSplat 官方项目页 teaser。图中对比了 LERF 与 LangSplat 学到的 3D 语言特征；LangSplat 的特征边界更贴近物体轮廓，体现了 SAM mask 监督和显式高斯语言特征的作用。*

##### 算法伪代码

```python
# LangSplat 训练与查询伪代码
def train_langsplat(images, cameras, pretrained_3dgs):
    gaussians = load_rgb_gaussians(pretrained_3dgs)
    freeze_geometry_opacity_color(gaussians)

    clip_features = []
    for image in images:
        masks_by_level = SAM(image, levels=["subpart", "part", "whole"])
        for level, masks in masks_by_level.items():
            for mask in filter_redundant_masks(masks):
                feat = CLIP_image_encoder(crop_or_mask(image, mask))
                assign_feature_to_pixels(level, mask, feat)
                clip_features.append(feat)

    autoencoder = train_scene_autoencoder(
        clip_features,
        loss="L1 + cosine",
        latent_dim=3,
    )

    for step in range(30000):
        view = sample_training_view(images, cameras)
        target_latent = autoencoder.encode(pixel_clip_features(view))
        rendered_latent = splat_language_features(gaussians, view.camera)
        loss = distance(rendered_latent, target_latent)
        update_only_language_features(gaussians, loss)

    return gaussians, autoencoder.decoder


def open_vocab_query(gaussians, decoder, camera, text):
    latent_map = splat_language_features(gaussians, camera)
    clip_map = decoder(latent_map)
    text_feat = CLIP_text_encoder(text)
    relevancy = cosine_similarity(clip_map, text_feat)
    return threshold_or_argmax(relevancy)
```

##### 动机与背景

LERF 等早期 3D language field 方法通常把 CLIP/DINO 特征蒸馏进 NeRF。这个路线能支持开放词表查询，但它要沿光线密集采样并体渲染特征，查询时还常要在多个尺度上重复渲染，所以高分辨率交互很慢。更关键的是，CLIP 本身是图像级或区域级对齐模型，不是像素级模型；用中心 crop 的多尺度 CLIP 特征监督 3D 点，会让同一个点在“物体整体、部件、子部件”之间语义混淆，边界也容易被背景和邻近物体污染。

LangSplat 的核心判断是：3DGS 已经把场景显式表示为可实时 rasterize 的高斯集合，那么语言场也不必继续依赖 NeRF 的隐式体渲染。论文把每个高斯扩展为语言高斯，让高斯携带语言 latent \(\mathbf{l}_i^s\)，其中 \(s\) 表示 SAM 定义的语义层级。渲染时语言特征与 RGB 一样按可见性和不透明度合成：

$$
\mathbf{L}^s(p)=\sum_{i\in \mathcal{N}(p)} T_i \alpha_i \mathbf{l}_i^s,\quad
T_i=\prod_{j<i}(1-\alpha_j)
$$

这里 \(\mathcal{N}(p)\) 是覆盖像素 \(p\) 的高斯集合，\(\alpha_i\) 是投影后高斯的不透明度贡献。直觉上，语言特征不再通过 MLP 对每个采样点查询，而是被显式绑定在高斯 primitive 上，依靠 3DGS 的排序和 alpha compositing 得到像素级语义图。

##### SAM 层级语义与 CLIP 特征

论文用 SAM 的 mask 层级来替代手工 crop 尺度。对输入图像中的网格点提示，SAM 可以生成不同粒度的 mask：subpart、part、whole。LangSplat 对每个层级分别去重、过滤低质量 mask，然后对 mask 区域提取 CLIP 图像特征，并把该特征赋给 mask 内像素：

$$
\mathbf{f}^s(p)=E_{\text{CLIP}}\left(I \odot M^s(p)\right)
$$

这一步解决了两个问题。第一，mask 边界来自 SAM，不是方形 crop，因此像素监督更贴近物体轮廓。第二，层级由 SAM 显式给出，查询时只需要在少数语义层级上比较相关性，而不是像 LERF 那样密集搜索很多物理尺度。

##### 场景级自编码器

直接让每个高斯学习 512 维 CLIP embedding 会让显存、缓存和 rasterizer 带宽迅速膨胀。LangSplat 观察到单个场景里的语义区域远少于 CLIP 训练时覆盖的开放世界分布，因此可以训练一个场景级 autoencoder：

$$
\mathbf{z}=E_{\phi}(\mathbf{f}_{\text{CLIP}}),\quad
\hat{\mathbf{f}}_{\text{CLIP}}=D_{\psi}(\mathbf{z})
$$

$$
\mathcal{L}_{\text{AE}}=
\|\hat{\mathbf{f}}_{\text{CLIP}}-\mathbf{f}_{\text{CLIP}}\|_1+
\lambda\left(1-\cos(\hat{\mathbf{f}}_{\text{CLIP}},\mathbf{f}_{\text{CLIP}})\right)
$$

论文实现中将 CLIP 特征压缩到 3 维 latent，这不仅节省内存，也让 latent 可直接作为 RGB-like 通道可视化。训练语言高斯时，目标不再是原始 CLIP 向量，而是 autoencoder encoder 输出的低维 latent；推理时再用 decoder 回到 CLIP 空间，与文本 embedding 计算余弦相似度。

##### 训练与查询流程

LangSplat 通常不从零开始同时优化几何和语言，而是先使用标准 3DGS 获得高质量 RGB 高斯。随后固定高斯中心、协方差、不透明度等几何/外观参数，只优化语言 latent。这样做可以把语义学习限制在已有几何支架上，减少语言监督噪声对几何的破坏。

开放词表查询时，给定文本 \(q\)，使用 CLIP text encoder 得到 \(\mathbf{t}_q\)。模型对目标相机渲染三个层级的语言图，decoder 还原为 CLIP 特征图 \(\hat{\mathbf{F}}^s\)，再计算 relevancy：

$$
R^s(p,q)=\cos\left(\hat{\mathbf{F}}^s(p), \mathbf{t}_q\right)
$$

定位任务取相关性最高的 3D/2D 位置，分割任务对相关性图阈值化或选取最大响应区域。由于底层是 splatting，整个查询过程接近普通 3DGS 渲染，远快于多尺度 NeRF feature rendering。

> 💡 关键：LangSplat 的贡献不是“把 CLIP 特征塞进 3DGS”这么简单，而是同时处理了三件事：用 SAM 给出边界清晰的层级监督，用自编码器控制显式特征维度，用 3DGS rasterizer 保持高分辨率实时查询。

#### 🧪 练习题

```yaml
question: "LangSplat 使用场景级语言自编码器的主要目的是什么？"
options:
  - "把 RGB 图像压缩成低分辨率训练图"
  - "把高维 CLIP 特征压缩成场景特定低维 latent，降低显式高斯语言特征的存储和渲染成本"
  - "替代 SAM 完成图像分割"
  - "在没有相机位姿时估计 3DGS 的初始点云"
answer: 1
explain: "LangSplat 显式地为大量高斯存储语言特征，直接使用 512 维 CLIP 特征代价很高；场景级 autoencoder 利用单场景语义分布稀疏性，将特征压缩后再 splat。"
```
