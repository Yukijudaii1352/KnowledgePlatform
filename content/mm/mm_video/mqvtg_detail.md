### MQVTG — 时刻量化定位 (Moment Quantization VTG)

```yaml
id: mqvtg
name: MQVTG
full_name: 时刻量化定位 (Moment Quantization VTG)
year: '2025'
org: CAS
paper_url: https://openaccess.thecvf.com/content/ICCV2025/html/Sun_Moment_Quantization_for_Video_Temporal_Grounding_ICCV_2025_paper.html
category: grounding
parent: univtg
motivation: 量化机制提升定位精度
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/mqvtg_detail.md
```

#### 📝 一句话总结

MQVTG 将向量量化引入视频时序定位，在时序建模后的 moment 表示上学习可训练 codebook，通过“软量化”增强前景与背景的可分性，同时避免硬替换离散码字造成的视觉细节损失。

#### 🎯 核心要点

- **首个 moment-level VTG 量化框架**：把视频时刻看作可由离散 codeword 辅助聚类的对象，用离散语义增强相关/不相关片段区分度
- **clip quantization 到 moment quantization**：clip quantization 在时序建模前量化单 clip，moment quantization 在 temporal encoder 后量化跨 clip 语义特征
- **软量化策略**：不用离散码字 \(\hat z_t\) 替换连续特征，而是继续把连续特征 \(z_t\) 送入定位模块，让 codebook loss 和 commitment loss 间接塑造特征空间
- **moment codebook**：用 CLIP clip-level 特征做 k-means 聚类初始化 codebook，并通过线性投影 \(C'=P(C)\) 建模 codeword 间相关性
- **两种架构兼容**：既能接 encoder-only 架构，也能作为 plug-and-play 模块接入 DETR 式 encoder-decoder VTG 模型
- **训练目标组合**：定位损失 \(L_{mr}\)、高亮损失 \(L_{hd}\)、moment quantization 损失 \(L_{mq}\)、视频-文本对齐损失 \(L_{align}\) 联合优化
- **六个基准验证**：在 QVHighlights、Charades-STA、TACoS、Ego4D-NLQ、YouTube Highlights、TVSum 上验证泛化性

#### 🔬 深入细节

##### 核心框架图

![MQVTG 三种量化方式对比](https://arxiv.org/html/2504.02286v1/x2.png)
*图：MQVTG 对比 image quantization、clip quantization 和 moment quantization，并展示 moment codebook 的 prior initialization 与 joint projection 设计。*

![MQVTG 架构示意](https://arxiv.org/html/2504.02286v1/x3.png)
*图：MQVTG 支持 encoder-only 与 encoder-decoder 两类 VTG 架构，moment codebook 位于时序建模之后，用量化监督增强视频特征判别性。*

##### 算法流程

```python
# MQVTG moment quantization 训练流程伪代码
def train_mqvtg(video, text, gt_moments, gt_saliency):
    # 1. 空间与文本编码
    clip_features = clip_visual_encoder(video)      # frozen CLIP visual features
    z_s = spatial_pool_and_project(clip_features)   # [T, d]
    text_features = clip_text_encoder(text)

    # 2. 时序/跨模态建模，形成 moment-aware 连续特征
    z_t = temporal_encoder(z_s, text_features)      # quantization after temporal modeling

    # 3. moment codebook 量化监督
    C = moment_codebook                            # initialized by k-means centers
    C_projected = linear_projector(C)              # C' = P(C)
    nearest_idx = argmin_l2(z_t, C_projected)
    z_hat = C_projected[nearest_idx]

    # 4. 软量化：定位模块继续使用连续 z_t，而不是 z_hat
    pred_moments = boundary_head(z_t)
    pred_saliency = saliency_head(z_t)
    pred_confidence = classification_head(z_t)

    # 5. 损失
    L_cb = l2(z_hat, stop_gradient(z_t))
    L_cmt = l2(stop_gradient(z_hat), z_t)
    L_mq = L_cb + lambda_cmt * L_cmt
    L_mr = moment_retrieval_loss(pred_moments, pred_confidence, gt_moments)
    L_hd = highlight_detection_loss(pred_saliency, gt_saliency)
    L_align = infonce_alignment_loss(z_t, text_features)

    return L_mr + lambda_hd * L_hd + lambda_mq * L_mq + lambda_align * L_align
```

##### 方法解读

**动机：连续特征容易混淆前景和相似背景。** VTG 的目标是根据语言描述定位相关时刻，但视频中有大量冗余片段，且背景片段可能与前景在视觉上非常接近。此前 UniVTG、DETR 式 VTG 或 R2-Tuning 等方法主要学习连续表征，前景 feature 往往分散，背景 feature 又可能靠得很近。MQVTG 的出发点是：语言描述天然带有离散语义，比如“spoon stirring curry”，那么能否用离散 codeword 帮助连续 video moment 特征形成更清晰的聚类结构？

**从图像量化迁移到视频时刻量化，关键在于量化位置。** 标准 VQ-VAE 风格图像量化会在 latent feature \(z\) 中找最近的 codeword：

$$
\hat z=C(z)=c_k,\quad k=\arg\min_i\|z-c_i\|_2^2,\quad C\in\mathbb{R}^{K\times d}.
$$

如果直接套到视频上，最朴素做法是 clip quantization：在冻结视觉编码器和 projector 后得到 \(z_s\in\mathbb{R}^{T\times d}\)，逐 clip 量化，再交给 temporal encoder。但这忽略了“moment 跨越多个 clip”的事实。MQVTG 因此把量化移到 temporal encoder 之后：先得到语义感知的连续特征 \(z_t=E_t(z_s)\)，再用 moment codebook 对 \(z_t\) 做量化监督。这样 codeword 对齐的是事件/时刻级语义，而不是孤立帧或孤立 clip。

**软量化是 MQVTG 最重要的取舍。** 传统硬量化会把连续特征直接替换成最近码字 \(\hat z_t\)，但视频表达比图像 patch 更复杂，同一语言时刻可能有多种视觉形态。有限 codebook 如果直接替换特征，容易丢掉定位所需细粒度差异。MQVTG 保留连续特征 \(z_t\) 给下游定位头，只用量化损失约束特征-codeword 聚类：

$$
L_{cb}=\|\hat z_t-\operatorname{sg}(z_t)\|_2^2
=\|C(z_t)-\operatorname{sg}(E_t(z_s))\|_2^2,
$$

$$
L_{cmt}=\|\operatorname{sg}(\hat z_t)-z_t\|_2^2
=\|\operatorname{sg}(C(z_t))-E_t(z_s)\|_2^2.
$$

其中 \(\operatorname{sg}(\cdot)\) 是 stop-gradient。\(L_{cb}\) 更新 codebook，使 codeword 靠近时序特征分布；\(L_{cmt}\) 更新 temporal encoder，使 \(z_t\) 靠近 codebook embedding space。定位头仍看连续 \(z_t\)，因此既得到离散聚类带来的前景/背景分离，又尽量保留视觉多样性。

**moment codebook 解决随机初始化和 codeword 独立性问题。** 图像量化常随机初始化 codebook，但 VTG 中 batch 内只有少数 codeword 会被更新，随机初始化容易导致 codebook 利用率低。MQVTG 先用预训练 CLIP 提取训练集 clip-level 特征，再做 k-means，把聚类中心作为 codebook 初值，使码本一开始就落在有效视觉语义空间。随后用一个线性 projector 学习 \(C'=P(C)\)，让 codeword 之间也可以建立类似时序语义的相关性，而不是完全独立地被优化。

**架构上是可插拔的训练正则，而不是重型新检测器。** 在 encoder-only 版本中，MQVTG 使用 CLIP 视觉/文本编码器，temporal encoder 融合多层 CLIP 特征后输出 \(z_t\)，再接三个简单 head：分类置信度、边界位移、显著性分数。对于 DETR 式 encoder-decoder VTG，moment codebook 可以插在 Transformer encoder 和 decoder 之间。论文强调该模块主要增加训练期 codebook 参数，推理期没有额外复杂代价，因为下游仍使用连续特征路径。

**整体训练目标把量化作为辅助判别约束。** 论文把 moment retrieval、高亮检测、moment quantization 和视频-文本对齐联合起来：

$$
L_{\text{overall}}=
L_{mr}+\lambda_{hd}L_{hd}+\lambda_{mq}L_{mq}+\lambda_{align}L_{align},
\quad
L_{mq}=L_{cb}+\lambda_{cmt}L_{cmt}.
$$

这里 \(L_{mr}\) 包含定位相关的 L1/focal 目标，\(L_{hd}\) 采用类似 UniVTG 的 intra-video contrastive saliency 监督，\(L_{align}\) 用 InfoNCE 做视频级和层级约束。与 UniVTG 相比，MQVTG 的核心不是重新统一任务形式，而是在统一 VTG 表征上加入“离散聚类压力”，让前景聚合、背景分离更明确。

#### 🧪 练习题

```yaml
question: "MQVTG 为什么采用软量化而不是直接用离散码字替换连续视频特征？"
options:
  - "因为软量化可以完全跳过 temporal encoder"
  - "因为直接硬替换可能丢失同一时刻的视觉多样性和定位细节"
  - "因为 codebook 只用于文本 token，不能处理视频 token"
  - "因为软量化会把所有背景片段设为同一个固定向量"
answer: 1
explain: "MQVTG 用 codebook loss 和 commitment loss 塑造连续特征空间，但定位头仍使用 z_t，从而兼顾离散聚类判别性和视频视觉细节。"
```
