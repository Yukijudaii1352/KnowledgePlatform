### SatMAE

```yaml
id: satmae
name: SatMAE
full_name: 卫星掩码自编码器 (SatMAE)
year: '2022'
org: Stanford University
paper_url: https://arxiv.org/abs/2207.08051
category: rs_analysis
parent: deeplabv3plus
motivation: 卫星图像时空多光谱掩码预训练
```

#### 📝 一句话总结

SatMAE 将 Masked Autoencoder 改造成适配卫星遥感的自监督预训练框架，通过时间/光谱位置编码、按时间或波段组独立 masking、以及多光谱分组 patch embedding，解决自然图像 MAE 难以直接利用卫星时序与多光谱结构的问题。

#### 🎯 核心要点

- **MAE 基础框架**：只把未遮挡 patch token 送入 ViT encoder，decoder 用 mask token 重建被遮挡 patch，并只在 masked patches 上计算 MSE
- **Temporal SatMAE**：对同一地点的不规则时间序列分别 patchify，共享 patch embedding，并把 year、month、hour 编码并入位置编码
- **Independent Masking**：时间序列或光谱组上的 masking 不要求同一空间位置同时被遮挡，让模型能利用其他时间或波段的可见信息重建当前遮挡区域
- **Multi-spectral SatMAE**：不简单把 Sentinel-2 波段堆成通道，而是按 RGB+NIR、Red Edge、SWIR 等光谱组分开 patch embedding
- **Spectral Encoding**：为每个波段组加入 group encoding，使 token 同时知道空间位置和所属光谱组
- **新数据集 fMoW-Sentinel**：论文构建了跨 fMoW 位置的 Sentinel-2 多光谱数据，用于多光谱预训练与评测
- **下游迁移有效**：论文报告 SatMAE 在 fMoW、fMoW-Sentinel、NAIP、SpaceNet、EuroSAT、BigEarthNet 等分类和分割任务上提升表现

#### 🔬 深入细节

##### 图示与整体框架

![SatMAE 主框架](https://ar5iv.labs.arxiv.org/html/2207.08051/assets/x1.png)
*图：SatMAE 将时间或光谱序列切成 patch token，加入空间和时间/光谱位置编码，在 MAE encoder-decoder 中重建 masked patches。开放 HTML 来源见 https://ar5iv.labs.arxiv.org/html/2207.08051，论文页见 https://arxiv.org/abs/2207.08051。*

![SatMAE 时间与光谱编码](https://ar5iv.labs.arxiv.org/html/2207.08051/assets/x2.png)
*图：Temporal SatMAE 共享 patch embedding 并加入 year/month/hour 编码；Spectral SatMAE 为不同波段组使用不同 patch embedding 并加入 group encoding。*

![SatMAE masking 策略](https://ar5iv.labs.arxiv.org/html/2207.08051/assets/x3.png)
*图：时间序列中的 consistent masking 与 independent masking。论文认为卫星图像时间间隔大、季节和人类活动变化明显，independent masking 不会像高帧率视频那样简单泄漏答案。*

##### 算法伪代码

```python
# SatMAE self-supervised pre-training 伪代码
def satmae_pretrain(batch, mode):
    # batch 可以是 temporal images: [B, T, C, H, W]
    # 也可以是 multispectral groups: [B, G, C_g, H, W]
    tokens = []
    metadata = []

    if mode == "temporal":
        for t in range(batch.num_times):
            # 时间维共享 patch embedding
            patch_tokens = shared_patch_embed(batch.images[:, t])
            pos = spatial_pos_encoding(patch_tokens.xy)
            temp = temporal_encoding(year=batch.year[t], month=batch.month[t], hour=batch.hour[t])
            tokens.append(patch_tokens + concat_encoding(pos, temp))
    elif mode == "spectral":
        for g, bands in enumerate(batch.band_groups):
            # 不同光谱组使用独立 patch embedding
            patch_tokens = group_patch_embed[g](batch.images[:, bands])
            pos = spatial_pos_encoding(patch_tokens.xy)
            spec = spectral_group_encoding(g)
            tokens.append(patch_tokens + concat_encoding(pos, spec))

    tokens = concatenate(tokens, dim="sequence")

    # Independent Masking: 在完整 token 序列上随机遮挡
    visible_tokens, mask_index = random_mask(tokens, mask_ratio=0.75, strategy="independent")
    latent = vit_encoder(visible_tokens)

    # Decoder 接收编码后的 visible token 和 learnable mask tokens，复原原始序列顺序
    full_tokens = insert_mask_tokens(latent, mask_index)
    reconstructed = mae_decoder(full_tokens)

    # 只在 masked patches 上计算像素重建误差
    loss = mse(reconstructed[mask_index], target_patches(tokens.original_images)[mask_index])
    loss.backward()
    optimizer.step()
```

##### 为什么自然图像 MAE 不能直接解决卫星图像

标准 MAE 假设输入是一张 RGB 图像，patch token 的位置主要由二维坐标决定。卫星影像不只是一张图：同一地点可能有多年多季节观测，时间间隔不规则；同一像素还可能包含可见光、近红外、红边、短波红外等多光谱信息。简单把时间帧或光谱波段堆到 channel 维度，会让模型只在初始 patch embedding 看到这些维度，进入 transformer 后 token 不再明确知道自己来自哪个时间或哪个波段组。

SatMAE 的核心思路是把时间和光谱也变成 token 身份的一部分。每个 token 不仅有空间坐标 \((x,y)\)，还带有时间坐标或光谱组坐标；模型在预训练时必须根据可见的空间、时间和光谱上下文重建被遮挡 patch。

##### Temporal SatMAE：不规则时间的显式编码

给定同一地点的时间序列输入：

$$
\mathbf{X}\in\mathbb{R}^{T\times C\times H\times W}
$$

SatMAE 对每个时刻的图像分别 patchify，并对所有时间共享同一个 patch embedding \(f_p\)。对第 \(t\) 个时间、空间位置 \((x,y)\) 的 patch，token 可表示为：

$$
\mathbf{z}_{t,x,y}
=f_p(\mathbf{x}_{t,x,y})
+\operatorname{PE}_{xy}(x,y)
+\operatorname{TE}(\text{year}_t,\text{month}_t,\text{hour}_t)
$$

论文保留 year、month、hour，而不强调 day、minute、second。直觉是：年份可以反映长期土地变化，月份对应季节和植被周期，小时影响太阳高度和阴影；而具体日期、分钟、秒通常对遥感语义不如前三者稳定。

##### Independent Masking 的作用

对时间序列，consistent masking 会在所有时间帧遮住同一空间位置；independent masking 则在整个 \(T\times L\) token 集合中随机遮挡，不同时间的同一位置可能一个可见、一个不可见。论文认为，对高帧率视频这可能让模型“抄答案”，但卫星图像的时间间隔往往跨月跨年，同一地点会因为季节、云影、人类活动或地表变化而不同，因此利用其他时间的可见 token 仍要求模型学习语义和变化规律。

如果 \(M\) 是 masked token 集合，MAE 重建损失为：

$$
\mathcal{L}_{\text{MAE}}
=\frac{1}{|M|}
\sum_{i\in M}
\left\|
\hat{\mathbf{x}}_i-\mathbf{x}_i
\right\|_2^2
$$

这里的 \(i\) 不再只是二维 patch 索引，而是空间、时间或光谱组联合索引。

##### Multi-spectral SatMAE：分组比堆叠更合理

Sentinel-2 有多个空间分辨率和波长范围不同的波段。简单 `Stack Channels` 会让一个卷积 patch embedding 同时处理所有波段，容易混合物理含义不同的信号。SatMAE 提出 `Group Channels`：把波段划分为若干组，例如论文实验中去掉 60m 的 B1、B9、B10 后，把 10 个波段分为：

- RGB+NIR：B2、B3、B4、B8
- Red Edge：B5、B6、B7、B8A
- SWIR：B11、B12

对第 \(g\) 个光谱组使用独立 patch embedding \(f_{p,g}\)，并加入 group encoding：

$$
\mathbf{z}_{g,x,y}
=f_{p,g}(\mathbf{x}_{g,x,y})
+\operatorname{PE}_{xy}(x,y)
+\operatorname{SE}(g)
$$

这样 transformer 能区分“同一空间 patch 的 RGB token”和“同一空间 patch 的 SWIR token”。这对地物识别很关键：植被、水体、裸土、积雪、建筑材料在近红外和短波红外上的响应往往比 RGB 更有判别力。

##### 训练、迁移与和 DeepLabv3+ 的关系

SatMAE 预训练结束后，通常丢弃 MAE decoder，保留 ViT encoder 作为下游任务的初始化。分类任务接线性头或 MLP 头；语义分割任务需要把 transformer token 转回空间特征，再接分割 head。元信息里把 parent 指向 DeepLabv3+，可以理解为遥感分析范式从“监督分割架构设计”进一步转向“用海量未标注卫星影像预训练表征，再迁移到分类/分割任务”。SatMAE 本身不是 DeepLabv3+ 的 decoder 改造，而是自监督预训练层面的上游能力。

论文实验显示，SatMAE 的收益来自三个方面：MAE 让 ViT 能在缺少标签的遥感影像上学习通用表征；temporal encoding 让模型理解季节和长期变化；spectral grouping 与 spectral encoding 让模型保留不同波段的物理意义。对建筑分割、土地覆盖分类等任务，这些表征可减少对人工标注的依赖。

> 💡 关键：SatMAE 的创新不是“把 MAE 用在卫星图上”这么简单，而是把 token 的坐标系从二维空间扩展为“空间 + 时间/光谱”，并设计 masking 让模型主动利用遥感数据特有的冗余和互补信息。

#### 🧪 练习题

```yaml
question: "SatMAE 中 independent masking 的主要目的是什么？"
options:
  - "确保同一空间位置在所有时间或波段组中都被同时遮挡"
  - "让模型可以利用其他时间或光谱组的可见 token 重建被遮挡区域，从而学习时空/光谱互补表征"
  - "把所有 Sentinel-2 波段永久丢弃，只保留 RGB"
  - "取消 MAE decoder，只训练监督分类头"
answer: 1
explain: "Independent masking 在联合 token 序列上随机遮挡，不强制同一位置跨时间或跨光谱一致遮挡，因此模型需要学习不同时间和波段之间的关系来完成重建。"
```
