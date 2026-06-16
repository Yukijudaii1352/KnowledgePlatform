### Prithvi-EO-2.0

```yaml
id: prithvi_eo2
name: Prithvi-EO-2.0
full_name: Prithvi地球观测2.0 (Prithvi-EO-2.0)
year: '2024'
org: IBM & NASA
paper_url: https://www.ibm.com/blog/nasa-ibm-prithvi-eo-2-0/
category: rs_analysis
parent: prithvi
motivation: 6亿参数多任务微调首次星上部署
```

#### 📝 一句话总结

Prithvi-EO-2.0 将 Prithvi 从美国局部 HLS 预训练扩展为全球多时相地球观测基础模型，引入 300M/600M ViT、4.2M 全球样本以及时间和地理位置嵌入，解决了 Prithvi-EO-1.0 覆盖范围、规模和跨区域任务泛化不足的问题。

#### 🎯 核心要点

- **第二代开放 EO 基础模型**：IBM、NASA 与 Jülich Supercomputing Centre 发布 Prithvi-EO-2.0，提供 300M、300M-TL、600M、600M-TL 等模型权重
- **全球 HLS 时间序列预训练**：使用 NASA HLS V2 30m 数据，构建 4.2M 训练样本和约 46k 验证样本，每个样本由 4 个时间戳、6 个公共波段和 \(256\times256\) patch 组成
- **更强时空采样策略**：从 2014-2023 年 HLS 档案中按 1-6 个月间隔采样四时相序列，覆盖土地覆盖类别和生态区多样性，并过滤缺失值与云污染
- **300M/600M ViT 主干**：300M 版本基于 ViT-L，600M 版本基于 ViT-H，继续采用 MAE 遮蔽重建，但扩大模型容量和全球数据覆盖
- **TL 元数据嵌入**：TL 版本把中心经纬度、年份和 day-of-year 编码为 sin/cos embedding，经可学习权重加到 encoder/decoder token 中，并通过随机 drop 适配元数据缺失场景
- **GEO-Bench 与 SME 任务验证**：在 GEO-Bench、灾害响应、土地覆盖/作物制图、生态系统动态等任务上验证，600M-TL 相比 Prithvi-EO-1.0 平均提升约 8%
- **后续星上部署验证**：NASA 2026 年报道压缩版 Prithvi 被上传至 Kanyini 卫星和 ISS IMAGIN-e 载荷，展示开放地理空间基础模型的在轨推理潜力

#### 🔬 深入细节

##### 图示与可访问来源

![Prithvi-EO-2.0 架构](https://arxiv.org/html/2412.02732v3/x2.png)
*图：Prithvi-EO-2.0 论文 Figure 3。模型保留 MAE encoder-decoder 框架，同时加入 3D patch/position embedding 和时间、位置元数据嵌入。*

![Prithvi-EO-2.0 全球 HLS 样本分布](https://arxiv.org/html/2412.02732v3/figures/sample_count_map.png)
*图：论文 Figure 2。训练样本覆盖全球 HLS tiles，颜色表示训练样本数量，验证 tiles 以洋红色标注。*

来源说明：任务给出的 `paper_url` 是 IBM Research 新闻页；方法细节主要来自 arXiv:2412.02732v3、Hugging Face `ibm-nasa-geospatial/Prithvi-EO-2.0-600M-TL` 模型卡、NASA-IMPACT GitHub 仓库和 NASA 2026 年在轨部署报道。

##### 算法伪代码

```python
# Prithvi-EO-2.0 TL 版本的 MAE 预训练伪代码
def pretrain_prithvi_eo2(sample, metadata, mask_ratio=0.75, p_drop=0.1):
    # sample: [C=6, T=4, H=224, W=224] after crop from 256x256 HLS patch
    # metadata: center lat/lon, acquisition year and day-of-year for each timestamp
    patches = patchify_3d(sample, patch_size=(1, 16, 16))
    visible, masked_index = random_mask(patches, ratio=mask_ratio)

    token = conv3d_patch_embed(visible)
    token = token + positional_encoding_3d(visible)

    # 时间/位置元数据作为 bias 加到 token，而不是进入 patch embedding
    use_time = random_uniform() > p_drop
    use_loc = random_uniform() > p_drop
    if use_time:
        token = token + w_time_enc * sincos_time(metadata.year, metadata.day_of_year)
    if use_loc:
        token = token + w_loc_enc * sincos_location(metadata.lat, metadata.lon)

    latent = encoder_transformer_blocks(token)

    decoder_token = restore_with_mask_tokens(latent, masked_index)
    decoder_token = decoder_token + decoder_positional_encoding_3d()
    if use_time:
        decoder_token = decoder_token + w_time_dec * sincos_time(metadata.year, metadata.day_of_year)
    if use_loc:
        decoder_token = decoder_token + w_loc_dec * sincos_location(metadata.lat, metadata.lon)

    reconstruction = decoder_transformer_blocks(decoder_token)
    loss = mse(reconstruction[masked_index], patches[masked_index])
    return loss
```

##### 全球样本构建

Prithvi-EO-1.0 主要使用美国连续区域数据；Prithvi-EO-2.0 的第一项升级是全球化。论文先从 HLS tile 层面控制土地覆盖和生态区多样性，再从 2014-2023 年的时间轴中构造四时相序列。相邻时间戳间隔设为 1-6 个月，目的是让样本包含季节变化和长期趋势，而不是只看到相邻几天的近重复观测。

每个候选序列被切成非重叠 \(256\times256\) patch，并执行质量过滤。论文给出的规则包括：任一 band 中缺失像素超过 1% 的样本丢弃，云像素超过 20% 的样本丢弃；缺失值使用最近邻插值补齐。形式化地说，一个样本 \(s\) 被保留需要满足：

$$
\max_{b,t}\mathrm{missing}(s_{b,t}) \le 0.01
\quad\land\quad
\max_t \mathrm{cloud}(s_t) \le 0.20
$$

最终预训练集约为 4.2M 个训练样本和 46k 个验证样本。这比 EO-1.0 更适合学习跨大陆、跨生态区、跨季节的遥感表征。

##### 架构升级：从 Prithvi 到 Prithvi-EO-2.0

基础 MAE 目标与 Prithvi-EO-1.0 相同：遮蔽一部分 3D patch，只让编码器处理可见 token，再由解码器重建被遮蔽区域。损失为：

$$
\mathcal{L}_{\mathrm{MAE}}
=\frac{1}{|\mathcal{M}|}
\sum_{i\in\mathcal{M}}
\left\|\hat{x}_i-x_i\right\|_2^2
$$

EO-2.0 的变化主要有两类。第一是模型和数据规模扩大：300M 对应 ViT-L，600M 对应 ViT-H，训练 400 epoch，使用全局 batch size 3840；300M 训练使用 80 张 A100 40GB，600M 训练使用 240 张 A100 40GB。第二是 TL 版本引入时间和位置元数据。

对于时间，模型编码年份 \(y\) 和 day-of-year \(d\)；对于位置，编码中心纬度 \(\phi\) 和经度 \(\lambda\)。可以抽象写成：

$$
e_{\mathrm{time}} = \mathrm{PE}(y) \oplus \mathrm{PE}(d)
$$

$$
e_{\mathrm{loc}} = \mathrm{PE}(\phi) \oplus \mathrm{PE}(\lambda)
$$

token 输入变为：

$$
z = E_{3D}(x) + p_{3D} + \gamma_t e_{\mathrm{time}} + \gamma_l e_{\mathrm{loc}}
$$

其中 \(\gamma_t,\gamma_l\) 是可学习权重；encoder 和 decoder 各自有独立权重。这个设计没有把元数据拼进像素 patch，而是把它作为类似位置编码的 bias。好处是：没有元数据时模型仍能运行；有元数据时，模型能知道同一光谱纹理在热带、寒带、雨季、旱季可能表示不同地表状态。

##### 元数据 drop 为什么重要

真实下游数据常常缺少完整元数据。例如某些 benchmark 只有裁剪后的 patch 和 band，不提供可靠的中心经纬度或采集日期。如果模型在预训练时总是依赖元数据，微调时一旦没有元数据就会退化。Prithvi-EO-2.0-TL 因此在预训练中以 0.1 的概率随机丢弃时间或位置元数据：

$$
z = E_{3D}(x)+p_{3D}
+ \delta_t \gamma_t e_{\mathrm{time}}
+ \delta_l \gamma_l e_{\mathrm{loc}},
\quad
\delta_t,\delta_l \sim \mathrm{Bernoulli}(1-p_{\mathrm{drop}})
$$

这相当于对元数据通道做 dropout，让模型既能利用外部地理时间信息，又不会把它当作唯一线索。

##### 微调与评估

Prithvi-EO-2.0 通过 TerraTorch 接入多种下游任务。对分类任务，论文使用 accuracy 或 BigEarthNet 的 micro-F1；对分割任务，使用 mIoU：

$$
\mathrm{mIoU}=\frac{1}{K}\sum_{k=1}^{K}
\frac{|P_k\cap G_k|}{|P_k\cup G_k|}
$$

GEO-Bench 评估包含 6 个分类和 6 个语义分割数据集，分辨率从 0.1m 到 15m 不等。论文比较了 MOCO、DINO、DeCUR、ScaleMAE、DOFA、Satlas 和 Prithvi-EO-1.0 等模型，发现更大的模型、全球预训练数据以及 TL 元数据通常带来更强平均性能。值得注意的是，EO-2.0 只在 30m HLS 上预训练，但在更高分辨率的树冠识别、光伏、牲畜等任务上仍能迁移，说明模型学到的不是单一分辨率模板。

##### 多任务应用机制

EO-2.0 的下游使用方式通常是“预训练 encoder + 任务 decoder”。对于洪水和野火分割，decoder 输出每个像素的类别概率；对于生物量或 GPP 等生态变量估计，decoder 输出连续值。统一写作：

$$
h=f_{\theta}^{\mathrm{Prithvi}}(X)
$$

$$
\hat{y}=d_{\psi}^{\mathrm{task}}(h)
$$

$$
\min_{\theta,\psi}\ \mathcal{L}_{\mathrm{task}}(\hat{y},y)
$$

其中 \(\theta\) 可全量微调，也可冻结或低学习率微调；\(\psi\) 是任务头。这个模式降低了把遥感基础模型接入具体业务任务的成本，也解释了为什么 NASA 后续在轨部署强调“只需上传较小 decoder package”就能让同一基础模型适配新任务。

##### 星上部署的来源限制

“首次星上部署”不是 2024 年 EO-2.0 技术报告的核心实验，而是 NASA 在 2026 年 5 月报道的后续演示：研究团队将压缩版 Prithvi 上传到南澳 Kanyini 卫星和 ISS IMAGIN-e 载荷，测试洪水与云检测，展示在轨预处理和低带宽任务适配潜力。因此在算法脉络中，应把它理解为 Prithvi/EO-2.0 开放基础模型生态的部署验证，而不是 EO-2.0 预训练方法本身的必要组成。

> 💡 关键：Prithvi-EO-2.0 的方法核心是“全球 HLS 多时相 MAE + 时间/位置元数据 bias + 更大 ViT 容量”，星上部署体现的是这种开放基础模型在边缘计算场景中的可复用性。

#### 🧪 练习题

```yaml
question: "Prithvi-EO-2.0-TL 中 TL 的关键含义是什么？"
options:
  - "只训练语言文本标签，不使用影像"
  - "在 MAE token 中加入时间和地理位置 sin/cos 元数据嵌入，并用随机 drop 适配元数据缺失"
  - "把所有 HLS 图像降为单时间步 RGB 输入"
  - "将 decoder 完全删除，只保留分类头"
answer: 1
explain: "TL 表示 temporal/location。模型将年份、day-of-year、经纬度编码为元数据 bias 加到 token 中，同时在预训练中随机丢弃部分元数据，提升有无元数据场景下的鲁棒性。"
```
