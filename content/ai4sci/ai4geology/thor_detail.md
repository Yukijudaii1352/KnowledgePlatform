### THOR

```yaml
id: thor
name: THOR
full_name: 多模态地球观测模型 (THOR)
year: '2026'
org: Norwegian Research
paper_url: https://arxiv.org/abs/2601.16011
category: earth_fm
parent: aurora
motivation: 多模态异构观测通用Transformer架构
```

#### 📝 一句话总结

THOR 提出一个 compute-adaptive 的多模态地球观测基础模型，用单个 ViT 统一 Sentinel-1 SAR、Sentinel-2 MSI、Sentinel-3 OLCI/SLSTR 的 10 m 到 1000 m 原生分辨率，并通过随机 patch/输入尺寸预训练解决现有遥感基础模型输入异构与部署刚性的双重问题。

#### 🎯 核心要点

- **统一四类 Copernicus 传感器**：Sentinel-1 SAR、Sentinel-2 MSI、Sentinel-3 OLCI、Sentinel-3 SLSTR，在原生 10 m-1000 m GSD 范围内进入同一模型
- **THOR Pretrain 数据集**：约 22 TB，包含 6273 个全球采样位置和 18332 个 tile-date 组合，并加入 DEM、WorldCover/GlobCover/MODIS 土地覆盖、ERA5-Land 变量
- **per-band patch projection**：每个输入波段有独立 patch 投影层，可处理缺失波段、任意波段子集和不同传感器组合
- **group average pooling**：同一 GSD 的 band group 先各自产生 patch token，再聚合对应位置 token，控制多模态长序列成本
- **FlexiViT 式随机 patch 训练**：预训练时随机采样输入尺寸与 patch size，推理时可在不重训的情况下选择更小 patch 获取密集特征，或选择更大 patch 节省算力
- **GSD-aware 2D-ALiBi**：注意力偏置按真实地面距离而不是像素距离计算，支持不同分辨率、不同 patch 大小之间的相对位置比较
- **多任务 MAE 预训练**：像素重建、土地覆盖/DEM map prediction、ERA5-Land 与经纬度/月序等 image-level prediction、SAR 入射角/轨道方向任务、patch-level soft contrastive loss
- **低标签场景优势**：论文在 PANGAEA 10% 标注 split 上报告 THOR-B 取得最佳平均排名，说明可变 patch 产生的密集 token 能缓解“重 decoder 依赖”

#### 🔬 深入细节

##### 图示与可访问来源

![THOR encoder 架构](https://arxiv.org/html/2601.16011v1/fm4cs_block_diagram_revised_v2.png)
*图：THOR 用 band-wise patch projection、group average pooling 和单个 ViT encoder 处理多传感器、多分辨率输入。论文 HTML: https://arxiv.org/html/2601.16011v1；论文页: https://arxiv.org/abs/2601.16011；代码页: https://github.com/FM4CS/THOR。*

![THOR 预训练任务](https://arxiv.org/html/2601.16011v1/fm4cs_block_diagram_decoder_extended_v2.png)
*图：THOR 的多预训练目标，包括 masked reconstruction、land-cover/DEM map prediction、ERA5-Land 与 SAR 相关 image-level tasks。*

##### 问题背景：遥感基础模型的两个刚性

遥感数据天然异构：SAR、光学、多光谱、热红外的物理含义、波段数、空间分辨率和可用性都不同。很多已有 EO foundation model 会把多源数据重采样到统一网格，或只支持固定传感器组合，这会丢失 Sentinel-3 这类粗分辨率产品的原生尺度信息，也让缺失模态很难处理。

第二个问题是部署刚性。标准 ViT/MAE 通常固定输入尺寸和 patch size，例如 \(16\times16\)。对于语义分割、洪水检测、农田边界等密集任务，粗 patch 产生的 token 太稀，需要 UPerNet 这类重 decoder 做复杂上采样；在标注很少时，decoder 本身会变成数据饥饿组件。THOR 的核心假设是：如果 encoder 本身能在推理时输出更密集 token，简单 decoder 就足够。

##### Encoder：多波段投影 + 可变 patch

THOR 对每个波段使用独立 patch projection。设第 \(g\) 个 band group 的输入为 \(X_g\in\mathbb{R}^{H_g\times W_g\times C_g}\)，patch size 为 \(p_g\)，则该组 token 数近似为：

$$
N_g=\frac{H_gW_g}{p_g^2}
$$

高分辨率 Sentinel-1/2 可以使用更多 token 保留细节，低分辨率 Sentinel-3 可以使用较少 token 表示更大地面范围。对同一 GSD 的多个波段，THOR 先用 band-wise projection 得到 token，再对同位置 token 做 group average pooling，减少序列长度：

$$
z_{g,u}=\frac{1}{|B_g|}\sum_{b\in B_g}\operatorname{Proj}_{b}(X_{b,u})
$$

这里 \(u\) 是 patch 位置，\(B_g\) 是同一 GSD 的波段集合。这样设计让模型既能接收任意波段子集，也不会因为每个波段都单独进入 ViT 而造成序列爆炸。

##### GSD-aware 2D-ALiBi：用真实地面距离做位置偏置

普通位置编码很难同时处理 10 m 光学 patch 和 1000 m 热红外 patch。THOR 扩展 2D-ALiBi，让 attention logit 里的相对位置偏置按真实地面距离计算：

$$
a_{hij}=
\frac{\mathbf{q}_{hi}^{T}\mathbf{k}_{hj}}{\sqrt{d}}
-
\frac{\operatorname{dist}(\mathbf{x}_i,\mathbf{x}_j)}{\max(p)}
\cdot m(h)
$$

\(\operatorname{dist}(\mathbf{x}_i,\mathbf{x}_j)\) 是两个 patch 中心的米级距离，\(\max(p)\) 是最大 patch 尺寸，\(m(h)\) 是第 \(h\) 个 attention head 的 ALiBi slope。这个式子的关键不是“给 token 编号”，而是把不同 GSD 的 token 放在同一个真实空间度量里比较：两个 10 m patch 相隔 8 个像素，和两个 20 m patch 相隔 4 个像素，如果地面距离相同，就应该得到可比较的位置偏置。

##### Flexible ViT MAE loss：让重建目标适配任意 patch 大小

THOR 把 FlexiViT 的可变 patch 思路扩展到 MAE。标准 MAE 的 masked patch 重建损失可写为：

$$
\mathcal{L}_{\text{mae}}
=
\frac{1}{N}
\left\|
\operatorname{vec}(\mathbf{x})-\langle\mathbf{v},\mathbf{z}\rangle
\right\|^2
$$

\(\mathbf{x}\in\mathbb{R}^{p\times p}\) 是目标 patch，\(\mathbf{z}\) 是 decoder token，\(\mathbf{v}\) 是把 token 投影回 patch 像素的权重。patch size 从 \(p\) 变为 \(p^\*\) 时，THOR 用转置卷积和双线性插值调整投影权重，并用伪逆缩放保持损失尺度一致：

$$
\mathcal{L}_{\text{mae}}^\*
=
\frac{1}{N}
\left\|
\mathbf{B}^{+}
\left(
\mathbf{B}\operatorname{vec}(\mathbf{x})
-
\langle\mathbf{v}\mathbf{B}^{T},\mathbf{z}\rangle
\right)
\right\|^2
\approx
\mathcal{L}_{\text{mae}}
$$

这保证随机 patch 大小时，模型收到的重建监督不会因为 patch 像素数变化而失衡。

##### Patch-level contrastive 与总损失

THOR 不只重建输入像素。它把未 mask token 随机分成 \(K\) 组，为每组计算平均 embedding，并从对应位置提取土地覆盖直方图。土地覆盖直方图相似的 patch 组应该在表示空间更接近，于是引入 soft multi-label contrastive loss。简化地说：

$$
\mathcal{L}_{\text{con}}
=
\frac{1}{G}
\sum_{g=1}^{G}
\frac{1}{|T_g|}
\sum_{t\in T_g}
\mathcal{L}_{\text{con},g,t}
$$

最终预训练目标是多任务加权和：

$$
\mathcal{L}_{\text{total}}=
\lambda_1\mathcal{L}_{\text{mae}}
\lambda_2\mathcal{L}_{\text{con}}
\sum_t\lambda_{3,t}\mathcal{L}_{\text{map},t}
\lambda_4\mathcal{L}_{\text{era5}}
\lambda_5\mathcal{L}_{m}
\lambda_6\mathcal{L}_{\text{coord}}
\lambda_7\mathcal{L}_{\text{inc}}
\lambda_8\mathcal{L}_{\text{orb}}
\lambda_9\mathcal{L}_{\text{fft}}
$$

其中 map tasks 包括 WorldCover、GlobCover、MODIS、DEM、scene classification 等；\(\mathcal{L}_{\text{fft}}\) 是 Fourier 域 L1 MAE 重建项，用于稳定训练。

##### 伪代码：THOR 预训练与可变 patch 推理

```python
# THOR 的核心训练逻辑
def pretrain_thor(sample):
    # sample: 对齐后的 S1/S2/S3/DEM/land-cover/ERA5-Land 数据
    ground_cover = uniform(1000, 50000)          # 米级覆盖范围
    product_groups = sample_available_modalities(sample)

    token_budget = MAX_TOKENS
    tokens = []
    masks = []
    for group in product_groups:
        image = crop_native_gsd(sample[group], ground_cover)
        patch_size = draw_patch_size(group.gsd, token_budget, min_p=4, max_p=32)
        group_tokens = []
        for band in group.bands:
            band_tokens = band_patch_projector[band](image[band], patch_size)
            group_tokens.append(band_tokens)
        tokens.append(mean_pool_same_gsd(group_tokens))
        masks.append(random_mae_mask(tokens[-1]))
        token_budget -= len(tokens[-1])

    # GSD-aware 2D-ALiBi 在 ViT attention 中按真实地面距离加偏置
    z = thor_vit_encoder(tokens, masks, gsd_aware_alibi=True)

    # 轻量 decoder 只用于预训练
    loss = 0
    loss += flexible_mae_reconstruction(z, sample.inputs, masks)
    loss += land_cover_and_dem_map_prediction(z, sample.maps)
    loss += image_level_prediction(z, sample.era5_land, sample.month, sample.coords)
    loss += sar_orbit_and_incidence_tasks(z, sample.sar_meta)
    loss += patch_level_soft_contrastive(z, sample.land_cover_histograms)
    loss += fft_reconstruction_regularizer(z, sample.inputs)
    return loss


def finetune_or_infer(image, desired_patch_size):
    # 同一套预训练权重可换 patch size
    tokens = thor_encoder(image, patch_size=desired_patch_size)
    return lightweight_decoder(tokens)
```

##### 为什么 compute-adaptive 对下游任务重要

THOR 的推理 patch size 不是训练后固定死的超参数。对洪水、水体、农田边界等需要细粒度空间定位的任务，可以选 \(4\times4\) 或 \(6\times6\) patch，得到更密集 token，甚至用线性 decoder 就能恢复细节。对全球尺度气候趋势、海洋监测等更重视大范围上下文和吞吐的任务，则可以选更大 patch，减少 token 数和 ViT 计算量。

论文的消融结果正是围绕这个假设：同一个 THOR-B 在 Sen1Floods11 上把推理 patch 从 \(16\times16\) 缩小到 \(4\times4\) 时，线性 probing 的 mIoU 大幅提升；在 Sentinel-3 雪覆盖回归任务中，较小 patch 也降低 RMSE，并使简单线性 decoder 接近 UPerNet。这说明 THOR 的优势不只是“数据更多”，而是 encoder 的特征密度可以按任务调节。

##### 与 SatMAE、CROMA、Copernicus-FM 的差异

SatMAE 主要展示 masked autoencoding 对遥感时空/多光谱数据的价值，但 patch 和输入形态仍较固定；CROMA 强调 SAR-光学对齐和对比/MAE 预训练，但不覆盖完整 10 m-1000 m 传感器范围；Copernicus-FM 统一更多 Copernicus 任务，但重点在输入灵活性而不是部署时 patch compute trade-off。THOR 的独特组合是：输入端 per-band 多模态适配，位置端 GSD-aware ALiBi，训练端随机 patch/input size，输出端轻 decoder 友好的密集 token。

> 💡 关键：THOR 不是简单把多源遥感图像拼在一起，而是把“真实地面尺度”贯穿 patch 投影、位置偏置、MAE 重建和推理 patch 选择，使同一 encoder 能在高精细任务和大范围任务之间调算力与精度。

#### 🧪 练习题

```yaml
question: "THOR 中 GSD-aware 2D-ALiBi 的主要作用是什么？"
options:
  - "把 Sentinel-1 SAR 转换成 RGB 图像"
  - "用真实地面距离而非单纯像素距离构造注意力位置偏置，使不同 GSD 和 patch size 的 token 可在同一空间尺度下交互"
  - "替代所有 masked autoencoder 重建损失"
  - "强制模型只能使用固定 16x16 patch"
answer: 1
explain: "THOR 同时处理 10 m 到 1000 m 的多源观测，位置偏置必须反映真实地面距离；GSD-aware 2D-ALiBi 正是为可变 patch 和多分辨率输入服务。"
```
