### SigLIP 2 — 把 Sigmoid 图文对齐扩展成多语言、定位和稠密特征统一训练配方

```yaml
id: siglip2
name: SigLIP 2
year: '2026.02'
category: frontier_2026
institution: Google
paper: arXiv
motivation: 统一训练配方增强定位
parent: clip
description: 整合描述、自蒸馏和掩码预测任务，显著增强定位能力，成为新一代视觉编码器标准。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/siglip2_detail.md
```

#### 📝 一句话总结
SigLIP 2 在 SigLIP 的 pairwise sigmoid 图文对齐目标上，统一加入 LocCa 式 caption/localization 解码器、自蒸馏、masked prediction、多语言数据和 NaFlex 分辨率适配，解决 CLIP/SigLIP 全局语义强但定位、稠密特征和多语言覆盖不足的问题。

#### 🎯 核心要点
- 沿用 SigLIP 双塔架构以保持向后兼容：标准 ViT 图像塔、文本塔、MAP attention pooling，并将 tokenizer 换成 256k 词表的 multilingual Gemma tokenizer
- 使用 WebLI 级别大规模图文数据，覆盖 109 种语言，训练混合中包含 90% 英文网页图文对和 10% 非英文网页图文对
- 第一阶段把 SigLIP sigmoid loss 与 LocCa decoder loss 等权结合，使视觉编码器同时学习全局图文匹配、captioning、referring expression 和 grounded captioning
- 在训练后 20% 加入 SILC/TIPS 风格自蒸馏和 masked prediction，让 un-pooled patch feature 获得更好的局部语义与稠密预测能力
- 支持固定分辨率适配：从 256 序列长度 checkpoint 恢复训练，并对位置嵌入或 patch embedding 做 resize 以适配 224/256/384/512 等分辨率
- 引入 NaFlex 变体：单 checkpoint 支持原生宽高比和可变序列长度，降低 OCR、文档、屏幕截图等任务中的形变损失
- 小模型使用 ACID active data curation 做隐式蒸馏，用强 teacher 和 learner 的 learnability 分数从 super-batch 中选训练样本
- 发布 ViT-B、L、So400m、g 四档 checkpoint，并在零样本分类、图文检索、VLM 视觉编码器迁移、dense prediction 和 localization 上系统评估

#### 🔬 深入细节
##### 核心示意图

![SigLIP 2 训练配方](https://arxiv.org/html/2502.14786v1/x1.png)
*图：SigLIP 2 将 SigLIP sigmoid loss、LocCa caption/localization decoder、自蒸馏、masked prediction、active data curation 与 NaFlex 适配组织成统一训练配方。*

公开来源：论文 `https://arxiv.org/abs/2502.14786`，论文 HTML `https://arxiv.org/html/2502.14786v1`，官方 checkpoint 说明 `https://github.com/google-research/big_vision/tree/main/big_vision/configs/proj/image_text/README_siglip2.md`。

##### 核心流程代码

```python
# SigLIP 2 training recipe sketch

def train_siglip2(image_text_loader, model):
    image_tower, text_tower = model.image_tower, model.text_tower
    locca_decoder = TransformerDecoder(cross_attention=True)

    # Stage 1: SigLIP global alignment + LocCa caption/localization decoder.
    for step, batch in enumerate(image_text_loader):
        image_tokens = image_tower(batch.images, return_unpooled=True)
        image_emb = map_pool(image_tokens)
        text_emb = text_tower(batch.texts)

        loss_siglip = pairwise_sigmoid_loss(image_emb, text_emb)

        loss_caption = decoder_ce(locca_decoder, image_tokens, batch.captions)
        loss_refexp = decoder_ce(locca_decoder, image_tokens, batch.region_boxes)
        loss_grounded = decoder_ce(locca_decoder, image_tokens, batch.region_captions)
        loss_locca = loss_caption + loss_refexp + loss_grounded

        loss = loss_siglip + loss_locca

        # Stage 2 starts at the last 20% of training.
        if step >= 0.8 * total_steps:
            teacher = ema_teacher(image_tower)
            global_view = augment_global(batch.images)
            local_views = augment_local(batch.images, n=8)
            masked_view, mask = mask_patches(global_view, ratio=0.50)

            loss_lg = local_to_global_distill(image_tower, teacher, local_views, global_view)
            loss_mask = masked_patch_prediction(image_tower, teacher, masked_view, mask)
            loss += lambda_lg * loss_lg + lambda_mask * loss_mask

        update(model, locca_decoder, loss)

    # Stage 3: resolution adaptation / NaFlex.
    for target_seq_len in target_sequence_lengths:
        resize_positional_embedding(image_tower, target_seq_len)
        finetune_at_resolution(model, target_seq_len)

    # Stage 4: small-model active data curation.
    for super_batch in stream_super_batches():
        learnability = teacher_and_learner_score(super_batch)
        batch = select_optimal_batch(super_batch, learnability, size=32_000)
        update(model, pairwise_sigmoid_loss(model(batch.images), model(batch.texts)))
```

##### 关键公式

SigLIP 的核心是把 batch 内所有图文组合变成二分类，而不是像 CLIP 那样对整行/整列做 softmax。令 \(\hat v_i\) 和 \(\hat t_j\) 为归一化图像/文本向量，\(y_{ij}=1\) 表示匹配图文对，\(y_{ij}=-1\) 表示非匹配对：

$$
\mathcal{L}_{\mathrm{siglip}}
=-\frac{1}{B^2}\sum_{i=1}^{B}\sum_{j=1}^{B}
\log\sigma\left(
y_{ij}\left(\alpha\,\hat v_i^\top \hat t_j + b\right)
\right)
$$

SigLIP 2 的第一阶段把该目标与 LocCa 解码器目标结合：

$$
\mathcal{L}_{\mathrm{stage1}}
=
\mathcal{L}_{\mathrm{siglip}}
+
\mathcal{L}_{\mathrm{caption}}
+
\mathcal{L}_{\mathrm{refexp}}
+
\mathcal{L}_{\mathrm{grounded}}
$$

自蒸馏 teacher 使用 EMA 更新：

$$
\theta_{\mathrm{teacher}}
\leftarrow
m\theta_{\mathrm{teacher}}+(1-m)\theta_{\mathrm{student}}
$$

训练后段加入局部-全局一致性和 masked patch prediction：

$$
\mathcal{L}_{\mathrm{stage2}}
=
\mathcal{L}_{\mathrm{stage1}}
+
\lambda_{\mathrm{lg}}\,
D\left(h_{\mathrm{student}}(I_{\mathrm{local}}),
\operatorname{sg}(h_{\mathrm{teacher}}(I_{\mathrm{global}}))\right)
+
\lambda_{\mathrm{mask}}
\sum_{p\in\mathcal{M}}
D\left(z^{S}_{p},
\operatorname{sg}(z^{T}_{p})\right)
$$

其中 \(\operatorname{sg}\) 表示 stop-gradient，\(\mathcal{M}\) 是被 mask 的 patch 集合。论文中 masked prediction 替换 50% patch，自蒸馏与 masked prediction 只在训练最后 20% 加入。

##### 方法解读

SigLIP 2 的核心动机是把近几年分散出现的 CLIP 改进整合到一个可发布、可替换的视觉语言编码器配方里。原始 CLIP/SigLIP 的全局图文对齐在零样本分类和检索上很强，但它只要求整张图和整句文本匹配，未必会让 patch feature 学到“哪块区域对应哪段短语”。这会限制 open-vocabulary detection、referring expression、segmentation、depth、normal 等需要局部语义的任务。SigLIP 2 因此保留 SigLIP 的全局对齐主目标，同时引入 decoder-based 和 image-only self-supervised 目标补足局部表示。

第一步的 LocCa 解码器是定位能力提升的关键。它不是最终发布模型的一部分，而是训练时挂在未池化的 vision token 上，通过 cross-attention 读取 patch feature，分别学习普通 caption、给定描述预测区域坐标、给定区域预测区域 caption。这样做会迫使图像塔的 patch token 保留对象、属性和空间位置，而不是只把整图压成一个适合检索的全局向量。训练结束后丢掉 decoder，保留下来的视觉编码器仍然可作为普通 SigLIP-style encoder 使用。

第二步的自蒸馏和 masked prediction 面向 dense feature。自蒸馏让 student 的局部 crop 表示去匹配 EMA teacher 在完整图上的表示，相当于要求局部视图能恢复全局语义上下文；masked prediction 则把 50% patch embedding 换成 mask token，让 student 在被遮挡位置预测 teacher 的 patch feature。这两类目标都不依赖文本，因此不会引入 caption 噪声，但能显著强化 un-pooled feature 的局部一致性。论文中特意把它们放在最后 20% 训练加入，是为了降低额外计算/显存开销，同时避免强数据增强破坏早期图文对齐。

NaFlex 针对的是输入预处理的形变问题。普通 ViT 往往把图片 resize 到固定正方形，文档、网页、手机截图、长图表会被压扁或裁切，OCR 与布局理解尤其受影响。NaFlex 结合 FlexiViT 的可变序列长度和 NaViT 的原生宽高比思想：把图像 resize 到 patch size 的倍数、尽量保持宽高比，并用 mask 忽略 padding token；位置嵌入根据实际 patch grid 双线性插值。这样单个 checkpoint 可以处理多种分辨率和长宽比，减少为不同分辨率维护多套权重的成本。

多语言与公平性是 SigLIP 2 与许多开源 CLIP 变体的另一个差异。论文使用包含 109 种语言的 WebLI 数据混合，并采用 90% 英文、10% 非英文网页图文对来平衡英文主流 benchmark 与跨语言检索能力。官方 big_vision README 也强调 checkpoint 可直接下载，并列出 ViT-B、L、So400m、g 以及 NaFlex 变体。实际工程意义是：下游 VLM 可以把 SigLIP 2 当作 SigLIP 的权重替换版本，同时得到更强 multilingual、dense 和 localization 能力。

小模型的 active data curation 则是另一种“蒸馏但不直接蒸馏 logits”的设计。对于 B/16、B/32，SigLIP 2 用强 teacher 和当前 learner 对 super-batch 样本打 learnability 分数，从 64k 或更大 super-batch 中选 32k 样本继续训练。这个过程把 teacher 知识体现在“哪些样本更值得学”上，避免显式 softmax distillation 的额外 teacher forward/logit 存储成本，对小模型尤其有收益。

> 💡 关键：SigLIP 2 不是只把 SigLIP 放大，而是把全局图文匹配、局部 caption/grounding、image-only 自监督、多语言数据和变分辨率输入放进同一训练食谱，使同一个视觉编码器同时适合检索、VLM 接入和稠密任务。

#### 🧪 练习题

```yaml
question: "SigLIP 2 中 LocCa 解码器的主要作用是什么？"
options:
  - "作为发布时的文本生成模块，直接替代下游 LLM"
  - "训练时读取未池化视觉 token，通过 caption 与 grounding 任务增强局部语义和定位能力"
  - "把所有图像强制裁剪成固定正方形，减少位置嵌入插值"
  - "只用于压缩 tokenizer 词表，从而提升多语言检索速度"
answer: 1
explain: "LocCa 解码器只在训练中使用，它通过 captioning、referring expression 和 grounded captioning 让 vision token 学到区域级语义；发布的仍是可替换 SigLIP 的编码器权重。"
```
