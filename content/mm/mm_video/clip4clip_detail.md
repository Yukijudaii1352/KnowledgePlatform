### CLIP4Clip：把图文 CLIP 迁移到视频-文本检索

```yaml
id: clip4clip
name: CLIP4Clip
full_name: 视频检索模型 (CLIP4Clip)
year: '2021'
org: Microsoft
paper_url: https://arxiv.org/abs/2104.08860
category: classic
parent: videobert
motivation: 将CLIP迁移至视频-文本检索
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/clip4clip_detail.md
```

#### 📝 一句话总结

CLIP4Clip 将图文预训练模型 CLIP 直接迁移到视频-文本检索，通过“逐帧 CLIP 编码 + 视频级相似度计算 + 双向对比检索损失”解决视频片段和自然语言描述的匹配问题。

#### 🎯 核心要点

- 以 CLIP ViT-B/32 和 CLIP text encoder 作为视频帧编码器与文本编码器，实现从像素输入到检索损失的端到端微调
- 将视频表示为均匀采样的有序帧序列，而不是依赖离线提取的冻结视频特征
- 系统比较三类 similarity calculator：parameter-free mean pooling、sequential LSTM/Transformer、tight Transformer 跨模态交互
- 采用对称 video-to-text 与 text-to-video cross-entropy，在一个 batch 内构造 \(B \times B\) 相似度矩阵
- 研究 2D patch projection 与 3D patch projection，发现 CLIP 的 2D 初始化在当时更稳，3D temporal projection 需要更充分的视频预训练
- 在 MSR-VTT、MSVD、LSMDC、ActivityNet、DiDeMo 等视频-文本检索数据集上取得当时 SOTA
- 经验结论清晰：小数据集上少加新参数的 mean pooling 更稳，大数据集上 sequential Transformer 更容易学到时间依赖

#### 🔬 深入细节

![CLIP4Clip 总体框架](https://ar5iv.labs.arxiv.org/html/2104.08860/assets/x1.png)
*图：CLIP4Clip 的主框架，视频被采样为帧序列，经 CLIP 图像编码器得到帧特征，再与 CLIP 文本特征计算视频-文本相似度*

![CLIP4Clip 相似度计算器](https://ar5iv.labs.arxiv.org/html/2104.08860/assets/x2.png)
*图：论文比较的三类 similarity calculator：无参数聚合、时序建模、紧耦合跨模态交互*

CLIP4Clip 的问题设定是标准双向检索：给定视频集合 \(\mathcal{V}\) 与文本集合 \(\mathcal{T}\)，学习相似度函数 \(s(v_i,t_j)\)，让正确视频-文本对的相似度高于 batch 内其他负样本。视频 \(v_i\) 被表示成均匀采样的帧序列：

$$
v_i = \{v_i^1, v_i^2, \dots, v_i^{|v_i|}\}
$$

每一帧都被当成图像送入 CLIP visual encoder，取 ViT 的 `[class]` token 得到帧特征序列 \(\mathbf{Z}_i=\{\mathbf{z}_i^1,\dots,\mathbf{z}_i^{|v_i|}\}\)。文本侧直接沿用 CLIP text encoder，取 `[EOS]` 位置表示作为 caption embedding \(\mathbf{w}_j\)。这使 CLIP4Clip 的关键问题从“如何训练一个新的视频编码器”转化为“如何把多个 CLIP 图像特征合成一个可检索的视频表示”。

最保守的 parameter-free 方案是 mean pooling：把所有帧特征平均成“平均帧” \(\hat{\mathbf{z}}_i\)，再与文本向量做余弦相似度：

$$
\hat{\mathbf{z}}_i = \operatorname{mean}(\mathbf{z}_i^1,\mathbf{z}_i^2,\dots,\mathbf{z}_i^{|v_i|})
$$

$$
s(v_i,t_j)=
\frac{\mathbf{w}_j^\top \hat{\mathbf{z}}_i}
{\|\mathbf{w}_j\| \|\hat{\mathbf{z}}_i\|}
$$

这个设计的直觉是：CLIP 已经把单帧图像和文本投到强对齐的共同空间，小数据集上额外引入随机初始化模块反而容易破坏 CLIP 表示。mean pooling 不显式建模时间顺序，但它把多个关键帧的语义证据汇聚起来，在 MSR-VTT Training-7K、MSVD、ActivityNet、DiDeMo 等场景中非常稳。

sequential 类型在 mean pooling 前增加时序编码器，用 LSTM 或 Transformer encoder 对帧序列建模：

$$
\tilde{\mathbf{Z}}_i = \operatorname{LSTM}(\mathbf{Z}_i)
\quad \text{or} \quad
\tilde{\mathbf{Z}}_i = \operatorname{TransformerEnc}(\mathbf{Z}_i+\mathbf{P})
$$

随后仍然执行 mean pooling 和余弦相似度。它的优势是能利用帧顺序、动作变化和事件进展；代价是新增参数需要足够数据。论文的经验结果显示，在更大的 MSR-VTT Training-9K split 和 LSMDC 上，sequential Transformer/LSTM 更有竞争力。

tight 类型则进一步把文本表示和所有帧表示拼成一个序列，让 Transformer 同时看文本和视频帧：

$$
\mathbf{U}_{ij}=[\mathbf{w}_j,\mathbf{z}_i^1,\mathbf{z}_i^2,\dots,\mathbf{z}_i^{|v_i|}]
$$

$$
\tilde{\mathbf{U}}_{ij}=\operatorname{TransformerEnc}(\mathbf{U}_{ij}+\mathbf{P}+\mathbf{T})
$$

$$
s(v_i,t_j)=\operatorname{FC}(\operatorname{ReLU}(\operatorname{FC}(\tilde{\mathbf{U}}_{ij}[0,:])))
$$

这个结构表达力最强，因为它允许文本 token 级语义和视频帧特征直接交互。但 CLIP4Clip 的实验反而显示 tightTransf 往往不如 meanP/seqTransf，核心原因是新增跨模态 Transformer 和线性层缺少对应预训练初始化，在检索数据规模有限时难以学稳。

```python
# CLIP4Clip 训练流程伪代码
for batch in dataloader:
    videos, texts = batch                         # B 个配对样本

    frame_features = []
    for video in videos:
        frames = uniform_sample(video, fps=1, max_frames=L)
        z = clip_image_encoder(frames)            # [L, D]
        frame_features.append(z)

    text_features = clip_text_encoder(texts)      # [B, D]

    # 构造 B x B 相似度矩阵：每个视频都和每条文本比较
    sim = zeros(B, B)
    for i in range(B):
        for j in range(B):
            if calculator == "mean_pooling":
                video_emb = mean(frame_features[i], dim="time")
                sim[i, j] = cosine(video_emb, text_features[j])
            elif calculator == "sequential":
                temporal_emb = temporal_encoder(frame_features[i])
                video_emb = mean(temporal_emb, dim="time")
                sim[i, j] = cosine(video_emb, text_features[j])
            elif calculator == "tight":
                fused = cross_modal_transformer(text_features[j], frame_features[i])
                sim[i, j] = mlp(fused[0])

    labels = arange(B)
    loss_v2t = cross_entropy(sim, labels)          # 每个视频找正确文本
    loss_t2v = cross_entropy(sim.T, labels)        # 每个文本找正确视频
    loss = loss_v2t + loss_t2v
    loss.backward()
    optimizer.step()
```

检索损失本质上复用 CLIP 的 batch 内对比学习思想。给定 batch size \(B\)，模型计算所有正负组合的相似度：

$$
\mathcal{L}_{v2t}
=-\frac{1}{B}\sum_{i=1}^{B}
\log\frac{\exp(s(v_i,t_i))}
{\sum_{j=1}^{B}\exp(s(v_i,t_j))}
$$

$$
\mathcal{L}_{t2v}
=-\frac{1}{B}\sum_{i=1}^{B}
\log\frac{\exp(s(v_i,t_i))}
{\sum_{j=1}^{B}\exp(s(v_j,t_i))}
$$

$$
\mathcal{L}=\mathcal{L}_{v2t}+\mathcal{L}_{t2v}
$$

这个目标函数同时优化“给视频找文本”和“给文本找视频”。相比只做单向排序，双向损失能让视频空间和文本空间互相拉紧；相比离线特征检索，它还允许梯度回传到 CLIP visual encoder，从而微调帧级视觉表示。

论文还探索了 3D linear projection：把 ViT 的 2D patch embedding 扩展为跨时间的 3D kernel \([t \times h \times w]\)，希望在最底层捕获短时运动。但实验中 3D linear 表现不如 2D linear，原因并不是时间建模无用，而是 CLIP 的强初始化来自 2D 图文预训练；把底层 patch 投影改成 3D 后，初始化分布和预训练任务不匹配，需要更大规模视频-文本预训练才能释放潜力。

CLIP4Clip 的定位不是提出复杂的新视频骨干，而是用实验回答“CLIP 到底能否直接做视频检索”。它的结论影响很大：视频-文本检索不一定必须从沉重的视频预训练开始，强图文模型加上简单帧聚合就能显著超过许多 feature-level 视频模型；当数据规模扩大时，再逐步引入时序模块更符合优化稳定性。

#### 🧪 练习题

```yaml
question: "CLIP4Clip 中 parameter-free mean pooling 相似度计算器的主要优势是什么？"
options:
  - "通过跨模态 Transformer 显式建模每个文本 token 和每帧视频的交互"
  - "不引入随机初始化的新参数，最大限度保留 CLIP 已学到的图文对齐空间"
  - "用 3D 卷积替代 ViT patch embedding，从底层学习运动特征"
  - "只训练文本编码器，从而避免视频编码器过拟合"
answer: 1
explain: "mean pooling 直接聚合 CLIP 帧特征并做余弦相似度，没有新增时序或跨模态模块；在小数据检索集上，这种做法更稳定。"
```
