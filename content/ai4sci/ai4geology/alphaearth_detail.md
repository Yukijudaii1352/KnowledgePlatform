### AlphaEarth

```yaml
id: alphaearth
name: AlphaEarth
full_name: AlphaEarth基础模型 (AlphaEarth Foundations)
year: '2025'
org: Google DeepMind
paper_url: https://deepmind.google/discover/blog/alphaearth-foundations-virtual-satellite/
category: rs_analysis
parent: prithvi_eo2
motivation: 10米全球特征嵌入存储降16倍
```

#### 📝 一句话总结

AlphaEarth Foundations 提出面向地球观测的连续时间嵌入场模型，把多源、多时相、稀疏且不规则的遥感观测压缩成全球 10 米、64 维年度 embedding，解决了传统遥感特征在跨传感器、缺测、云遮挡和低标注场景下难以统一复用的问题。

#### 🎯 核心要点

- **统一嵌入场**：将陆地和近岸水域表示为 10 米网格上的 64 维单位向量，每个像素向量总结一个有效时间段内的地表状态
- **多源输入**：融合 Sentinel-2、Sentinel-1、Landsat、PALSAR-2、ERA5-Land、GEDI、GRACE、DEM、NLCD 等光学、雷达、激光雷达、气候和地表产品
- **连续时间建模**：区分输入观测的 support period 与目标摘要的 valid period，可对任意日期范围做插值、外推或年度摘要
- **STP 主干网络**：Space-Time-Precision blocks 同时使用空间自注意力、时间轴注意力和 3x3 卷积，兼顾长程时空依赖与像素级细节
- **隐式解码训练**：用 embedding 加传感器几何、时间码等条件元数据重建被遮蔽的源观测，按数据源选择 L1 或交叉熵损失
- **教师-学生一致性**：学生模型随机缺失输入源和时间步，最小化师生 embedding 的方向差，提升对云、轨道和缺测的鲁棒性
- **单位球瓶颈**：embedding 作为 von Mises-Fisher 分布的均值方向，并通过 batch uniformity 防止所有像素坍缩到相同方向
- **低存储部署**：论文版本报告每个表示 64 bytes，相对被测试的次紧凑学习表示减少 16 倍信息量；Earth Engine 发布年度 Satellite Embedding 数据集

#### 🔬 深入细节

##### 图示与可访问来源

![AlphaEarth Foundations 架构图](https://ar5iv.labs.arxiv.org/html/2507.22291/assets/figures/results_model.png)
*图：AlphaEarth Foundations 的多源视频输入、STP 主干、条件摘要、vMF embedding、教师-学生/文本对齐训练和全球 embedding field。可访问来源：arXiv 预印本 https://arxiv.org/abs/2507.22291，DeepMind 博客 https://deepmind.google/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/，Earth Engine 数据集说明 https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_SATELLITE_EMBEDDING_V1_ANNUAL。*

##### 问题背景：为什么不是再做一个遥感分类模型

常规遥感流程通常先人工设计指数或合成影像，例如 NDVI、最佳像素合成、谐波特征，再针对某个任务训练分类器或回归器。这种做法的问题在于特征强依赖传感器、区域和任务；云、轨道空洞、扫描条带、不同空间分辨率和不同时相采样会让同一地点的观测很难拼成稳定特征。AlphaEarth 的目标不是直接输出某一种土地覆盖类别，而是输出可复用的中间表示：让后续少量标注的分类、回归、变化检测都直接在 embedding 上完成。

论文把地球表面看作一个随时间变化的连续场。输入数据来自某个 support period，目标摘要可以是另一个 valid period；两者不要求完全重合。因此模型可以在一年内大量不均匀观测之间推断某段时间的地表状态，也可以在年度数据产品中给出稳定的一年摘要。Google Earth Engine 发布的 Satellite Embedding V1 就是这种年度摘要的产品化版本：2017-2024 年、10 米分辨率、每像素 64 个 band，并说明这些向量已归一化到单位长度，适合聚类、分类和变化检测。

##### 模型机制：多源视频到单位球 embedding

AlphaEarth 的输入是一组按时间排序但稀疏、不规则的源帧。每个源先被归一化，并把采集时间转成 sinusoidal timecode；不同传感器各自通过 source encoder 投影到共同 latent space，再进入 STP 主干。STP block 包含三条并行路径：

- **Space path**：类似 ViT 的空间自注意力，用于捕获较大范围空间关系
- **Time path**：沿时间维做注意力，并用时间码条件化每个观测帧
- **Precision path**：3x3 卷积保留局部纹理和边界，避免大模型只学到粗糙语义

多层 STP block 之间通过 learned Laplacian pyramid rescaling 交换不同尺度的状态。直觉上，Space/Time 分支负责“理解这里长期发生了什么”，Precision 分支负责“不要把 10 米地块边界抹平”。最终 summarizer 根据 valid period 的条件时间码输出 embedding \(\mu \in \mathbb{R}^{64}\)，并约束 \(\|\mu\|_2=1\)。

##### 训练目标：重建、多源一致性、均匀瓶颈和文本对齐

论文把 embedding 作为信息瓶颈，让小型 source decoder 在给定 embedding、传感器元数据和目标时刻的情况下重建观测。整体目标可概括为：

$$
\mathcal{L}
= a\mathcal{L}_{recon}
+ b\mathcal{L}_{uniform}
+ c\mathcal{L}_{consistency}
+ d\mathcal{L}_{text}
$$

其中 \(\mathcal{L}_{recon}\) 对连续源使用 L1，对分类源使用交叉熵；不同源还会按空间错位、重采样尺度和无效像素 mask 做修正。模型不是简单重建输入中的同一帧，而是随机选取与 valid period 相交的目标观测，有时还会把这帧从输入中拿掉，迫使 embedding 学到跨时间、跨源的可预测状态。

教师-学生一致性解决遥感里很实际的问题：某个地方在某一年可能没有干净 Sentinel-2，也可能雷达或 Landsat 时序很稀疏。教师模型看到完整输入，学生模型随机丢弃输入源或时间步，两者共享参数，损失为：

$$
\mathcal{L}_{consistency}=1-\mu_{teacher}^{\top}\mu_{student}
$$

这样训练后，即使部署时某些源缺失，模型也倾向于给出与完整观测相同方向的 embedding，而不是把轨道空洞、云和条带伪影编码成地表变化。

##### 单位球与 batch uniformity：为什么 64 维向量仍然够用

AlphaEarth 把 embedding 看作 vMF 分布的均值方向。解码时可从该方向附近采样，再拼接传感器几何和时间码去重建目标源；这相当于在 bottleneck 上加噪声，避免模型把全部细节死记到高维连续值里。为了避免所有位置坍缩到少数方向，论文引入 batch uniformity。简化写法为：

$$
\mathcal{L}_{uniform}
= \frac{1}{B}\sum_{i=1}^{B}
\left| \mu_i^\top \mu_{\pi(i)} \right|
$$

其中 \(\pi(i)\) 是 batch 维上的错位配对。若 embedding 在单位球上足够均匀，随机两个向量平均应近似正交，点积绝对值趋近 0。这个目标本身不是充分条件，但能有效抑制表示坍缩，并提升少样本线性 probe 和近邻检索的稳定性。

##### 伪代码：AlphaEarth 训练与年度 embedding field 推理

```python
# AlphaEarth Foundations 的核心训练逻辑，省略分布式数据管线细节
for batch in earth_observation_sequences:
    sources = load_multisource_frames(batch)          # optical, SAR, LiDAR, climate, DEM...
    support_period = span_of_input_timestamps(sources)
    valid_period = sample_summary_period(batch)       # 可与 support period 部分重合或不重合

    teacher_inputs = normalize_and_timecode(sources)
    student_inputs = random_drop_sources_and_frames(teacher_inputs)

    # STP encoder + conditional summarizer
    mu_teacher = AEF(teacher_inputs, valid_period)    # [B, H, W, 64], unit-normalized
    mu_student = AEF(student_inputs, valid_period)

    # 从每个源随机选一个目标观测，可能从输入中移除
    recon_loss = 0.0
    for source_name, target_frame in sample_targets(sources, valid_period):
        metadata = sensor_metadata(target_frame)
        tau = normalized_time_in_valid_period(target_frame.time, valid_period)
        pred = source_decoder[source_name](mu_teacher, metadata, tau)
        recon_loss += source_weight[source_name] * source_error(pred, target_frame)

    consistency = 1.0 - dot(mu_teacher, mu_student).mean()
    uniformity = abs(dot(mu_teacher, rotate_batch(mu_teacher))).mean()
    text_align = contrastive_loss(mu_teacher, text_encoder(batch.geo_text))

    loss = a * recon_loss + b * uniformity + c * consistency + d * text_align
    optimizer.step(loss)


def create_annual_embedding_field(year, utm_zone):
    for tile in make_tiles(utm_zone, size_m=960, buffer_m=160):
        frames = collect_sources_from_earth_engine(tile.buffered, year)
        mu = AEF(frames, valid_period=(f"{year}-01-01", f"{year + 1}-01-01"))
        mu = trim_border(mu, trim_m=80)
        save_64d_embedding(tile, quantize_int8(mu, power=2))
```

##### 与 Prithvi-EO、SatMAE 类模型的差异

SatMAE 和 Prithvi-EO 更接近“遥感图像基础模型”：它们从多光谱影像 patch 中学习视觉表征，再迁移到分割、分类等任务。AlphaEarth 的关键变化是把“某一张图像的表示”升级为“某个地理位置在某段时间内的连续状态表示”。因此它天然处理多传感器和不规则时间采样，不要求下游用户重新收集同一时段的所有原始影像。

这种设计也解释了 16 倍存储动机。对全球 10 米级分析来说，保存所有源影像、时序 composite 或多模型特征都极其昂贵；AlphaEarth 把每像素年度状态压缩为 64 维单位向量，后续任务用点积、角距离、近邻、线性 probe 或树模型即可开始工作。代价是单个 embedding 维度不可像光谱 band 那样直接解释，必须把 64 维整体当作一个语义坐标来使用。

#### 🧪 练习题

```yaml
question: "AlphaEarth Foundations 中 teacher-student 一致性目标的主要作用是什么？"
options:
  - "把 64 维 embedding 直接转成 RGB 可视化图"
  - "让缺失输入源或缺失时间步时得到的 embedding 仍接近完整输入下的 embedding"
  - "把所有传感器强制重采样到 1 米分辨率"
  - "只优化土地覆盖分类交叉熵，不再重建连续观测"
answer: 1
explain: "学生模型随机丢弃源和时间步，教师模型使用更完整输入；最小化二者向量方向差可以减弱云、轨道、条带和缺测带来的伪变化。"
```
