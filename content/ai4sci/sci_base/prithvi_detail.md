### Prithvi — NASA/IBM 地球观测基础模型与在轨部署范式

```yaml
id: prithvi
name: Prithvi
full_name: Prithvi地学基础模型 (Prithvi Geospatial FM)
year: '2026'
org: NASA/IBM
paper_url: https://www.nasa.gov/news-release/nasa-ibm-geospatial-ai-foundation-model-deployed-in-orbit/
category: unified_foundation
parent: —
motivation: 首个在轨部署地学基础模型ISS实时
```

#### 📝 一句话总结

Prithvi 提出了面向地球观测的开放基础模型族，以 HLS/MERRA-2 等 NASA 数据进行自监督预训练，并通过小型任务解码器适配灾害监测、土地覆盖、作物和气候任务；2026 年压缩版 Prithvi 被部署到 Kanyini 卫星和 ISS IMAGIN-e 载荷，证明地学基础模型可以在轨执行云/洪水检测。

#### 🎯 核心要点

- **模型族定位**：IBM-NASA Prithvi family 包含 Prithvi-EO-1.0、Prithvi-EO-2.0 和 Prithvi-WxC，分别覆盖地球观测和天气气候数据
- **在轨部署**：NASA 2026 年报道显示压缩版 Prithvi 被上传到 Kanyini 卫星和 ISS IMAGIN-e 载荷，用于两类轨道平台上的云检测和洪水检测
- **开放科学路线**：Prithvi 权重、模型卡和微调资源发布在 Hugging Face 与 GitHub，并通过 TerraTorch 支持下游任务适配
- **Prithvi-EO-2.0 数据规模**：使用 NASA Harmonized Landsat and Sentinel-2 数据，4.2M 全球时间序列样本，30 m 分辨率，覆盖 2014-2023 年时段
- **多时相 MAE 预训练**：基于 ViT masked autoencoder，把 2D patch embedding 替换为 3D patch embedding，以联合建模时间、高度、宽度
- **时间/位置元数据嵌入**：将采集年份、年内日、中心纬度和经度编码为 sin/cos embedding，并用可学习权重加入 encoder/decoder token
- **鲁棒缺失元数据训练**：预训练时随机丢弃时间或地理位置元数据，使模型在实际数据缺少 metadata 时仍可工作
- **下游任务广泛**：覆盖洪水、火烧迹地、滑坡、作物分类、土地覆盖、生物量和 GPP 等任务
- **GEO-Bench 评估**：Prithvi-EO-2.0-600M-TL 在 GEO-Bench 上比 Prithvi-EO-1.0 平均提升约 8%，并与六类其他地学基础模型比较

#### 🔬 深入细节

##### 架构总览

![Prithvi-EO-2.0 MAE 架构](https://arxiv.org/html/2412.02732v3/x2.png)
*图：Prithvi-EO-2.0 论文 Figure 3，展示多时相输入经 3D patch embedding、时间/位置 sin-cos embedding、mask/drop、encoder transformer 和 decoder transformer 重建影像的预训练框架。*

主要可访问来源包括 NASA 在轨部署报道 `https://science.nasa.gov/science-research/ai-foundation-model-in-orbit/`、Prithvi-EO-2.0 论文 `https://arxiv.org/abs/2412.02732`、arXiv HTML `https://arxiv.org/html/2412.02732`、GitHub 仓库 `https://github.com/NASA-IMPACT/Prithvi-EO-2.0` 和 Hugging Face 组织页 `https://huggingface.co/ibm-nasa-geospatial`。输入 YAML 中的 NASA news-release URL 已迁移，NASA Science 页面是可访问版本。

##### 预训练流程伪代码

```python
# Prithvi-EO-2.0 的多时相 MAE 预训练伪代码
def prithvi_eo_pretrain(hls_sequence, lat_lon, dates):
    # hls_sequence: [T=4, C=6, H=224, W=224]，来自 HLS Blue/Green/Red/NIR/SWIR1/SWIR2
    cubes = conv3d_patch_embed(hls_sequence, cube_size=(t, h, w))
    pos_3d = sincos_3d_position(time=T, height=H, width=W)

    time_embed = sincos_2d(dates.year, dates.day_of_year)
    loc_embed = sincos_2d(lat_lon.lat, lat_lon.lon)
    if random() < drop_prob:
        time_embed = 0
    if random() < drop_prob:
        loc_embed = 0

    tokens = cubes + pos_3d + w_time * time_embed + w_loc * loc_embed
    visible_tokens, mask = random_mask(tokens)

    encoded = vit_encoder(visible_tokens)
    decoded = vit_decoder(insert_mask_tokens(encoded, mask))
    loss = mse(decoded[mask], normalize_pixels(hls_sequence)[mask])
    return loss

def finetune_for_orbit(prithvi_encoder, task):
    # 轨道上传时尽量复用共享 encoder，只换小型 decoder/head
    encoder = compress_or_quantize(prithvi_encoder)
    decoder = train_small_decoder(task.labels)
    return OnboardModel(encoder, decoder)
```

##### 为什么地球观测需要多时相基础模型

地球观测影像的语义不只由单张图决定。农作物类型、洪水范围、火烧迹地和植被恢复都依赖时间变化；同一块地在不同季节的光谱特征可能完全不同。早期遥感模型往往把每张图当作独立样本，或者用较短、局部的时间序列，难以同时表达空间纹理和长期季节性。

Prithvi-EO-2.0 的输入是四个时间点的 HLS 影像序列。论文构造时间序列时要求相邻时间点至少间隔 1 到 6 个月，从 2014-2023 年 HLS 数据中采样，以捕获季节变化和长期趋势。每个样本来自 \(256 \times 256\) patch，训练时随机裁剪到 \(4 \times 224 \times 224\)，并过滤缺失值和云量较高的样本。

##### 3D patch embedding 与时间/位置编码

标准 ViT-MAE 对二维图像做 patch embedding：

$$
z_i = W_p \operatorname{vec}(x_i) + p_i
$$

Prithvi-EO-2.0 将它扩展到三维时空 cube：

$$
z_{t,h,w}
= \operatorname{Conv3D}(x)_{t,h,w}
+ p^{3D}_{t,h,w}
+ \alpha_t e_{\text{time}}
+ \alpha_l e_{\text{loc}}
$$

其中 \(p^{3D}_{t,h,w}\) 是时间、高度、宽度三个维度的 sin/cos 位置编码，\(e_{\text{time}}\) 来自采集年份和 day-of-year，\(e_{\text{loc}}\) 来自中心纬度和经度，\(\alpha_t,\alpha_l\) 是学习权重。这样，模型既知道 token 在影像序列中的局部位置，也知道这组影像来自地球上的哪里、哪个季节。

这种设计解决了两个遥感特有问题。第一，相同光谱在不同地理区域含义不同，例如高纬积雪、沙漠和城市亮屋顶可能有相近反射特征。第二，相同地物在不同季节变化很大，作物和天然植被尤其依赖 phenology。时间/位置元数据以 bias 形式加入，既提供先验，又不会把模型绑死在必须有 metadata 的输入格式上。

##### MAE 损失函数与下游适配

Prithvi 的核心预训练目标是 masked autoencoder 的重建损失。给定被 mask 的 token 集合 \(\mathcal{M}\)，模型只让 encoder 处理可见 token，再由 decoder 重建全部 token：

$$
\mathcal{L}_{\text{MAE}}
=
\frac{1}{|\mathcal{M}|}
\sum_{i \in \mathcal{M}}
\left\|
\hat{x}_i - x_i
\right\|_2^2
$$

MAE 目标适合遥感基础模型，因为全球标注数据昂贵，但未标注影像丰富。模型在预训练中学习云、植被、水体、土壤、城市纹理和季节变化的通用表示；微调时只需要接入小型分类头或分割解码器，就可以迁移到洪水、水体、作物、土地覆盖等任务。

##### 在轨部署为何重要

NASA 2026 年报道强调，活跃卫星通常无法接收大型软件更新，带宽也不足以频繁上传完整模型。Prithvi 的价值在于共享 encoder 可以长期驻留在轨道计算平台上；当需要新任务时，只上传一个小型 decoder/head，就能复用基础表示完成新的地球观测任务。

可以把在轨适配写成：

$$
\hat{y}=D_{\phi}^{\text{task}}(E_{\theta}^{\text{Prithvi}}(x))
$$

其中 \(E_{\theta}^{\text{Prithvi}}\) 是预训练并压缩后的共享编码器，\(D_{\phi}^{\text{task}}\) 是云检测、洪水检测或火烧迹地检测等任务头。相较“每个任务上传一个完整模型”，这种方式降低了上传体积，也让轨道平台在灾害响应中更快地把影像转成可行动信息。

##### 与传统遥感模型的区别

传统 U-Net、随机森林或任务专用 CNN 通常针对单一传感器、单一地区、单一标签训练。它们在标注充足时有效，但跨地区、跨季节、跨传感器迁移时容易退化。Prithvi 的路线是先用全球未标注数据学习通用地球表征，再通过少量任务数据微调。这类似自然语言中的 foundation model，但它把“上下文”换成了地理位置、时间序列和多光谱反射。

> 💡 关键：Prithvi 的方法贡献不只是在轨运行一次模型，而是证明“地球观测基础编码器 + 轻量任务解码器”的结构可以从地面训练迁移到轨道边缘计算环境。

#### 🧪 练习题

```yaml
question: "Prithvi-EO-2.0 为什么要引入 3D patch embedding 和时间/位置嵌入？"
options:
  - "为了把所有遥感波段压缩成单个灰度通道"
  - "为了同时建模影像序列的空间结构、季节变化和地理位置先验"
  - "为了取消 masked autoencoder 的重建目标"
  - "为了只在美国本土数据上训练模型"
answer: 1
explain: "Prithvi-EO-2.0 面向多时相 HLS 数据，3D patch embedding 建模时间-空间 cube，时间和位置嵌入帮助模型区分季节、地区和地物语义。"
```
