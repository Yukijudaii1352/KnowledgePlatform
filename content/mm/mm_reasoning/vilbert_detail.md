### ViLBERT — 视觉语言BERT (Vision-and-Language BERT)

```yaml
id: vilbert
name: ViLBERT
full_name: "视觉语言BERT (Vision-and-Language BERT)"
year: "2019"
org: "Georgia Tech / Meta"
paper_url: "https://proceedings.neurips.cc/paper/2019/hash/c74d97b59837b67032d2d4d6208c1d39-Abstract.html"
category: foundation
parent: "—"
motivation: "首个多模态BERT扩展，双流架构实现跨模态注意力"
```

#### 📝 一句话总结

ViLBERT 将 BERT 扩展为视觉流与语言流并行的双流 Transformer，通过跨模态 co-attention 在目标区域和文本 token 之间建立可迁移的视觉语言 grounding，解决了早期视觉语言模型高度依赖任务专用结构的问题。

#### 🎯 核心要点

- 双流架构：语言 token 与图像 object region 分别进入两个 Transformer 流，保留各自模态的结构归纳偏置
- Co-attentional Transformer：视觉流和语言流在若干层中双向交叉注意力交互，而非简单拼接成单序列
- 视觉输入采用检测器区域特征：使用预训练 Faster R-CNN 提取 RoI 特征、位置框和特殊图像 token
- 预训练数据使用 Conceptual Captions：在大规模网页 alt-text 图文对上学习任务无关表征
- 两类预训练代理任务：masked multimodal modeling 与 image-text alignment
- 下游迁移只加轻量任务头：覆盖 VQA、VCR、RefCOCO+ 与 caption-based image retrieval

#### 🔬 深入细节

##### 核心架构示意图

![ViLBERT 双流 co-attention 架构](https://ar5iv.labs.arxiv.org/html/1908.02265/assets/x1.png)
*图：ViLBERT 将文本 token 与图像区域分别送入语言流和视觉流，并通过 Co-TRM 层让两种表示互相注意。*

##### 算法伪代码

```python
# ViLBERT 预训练核心流程
for image, caption in conceptual_captions:
    words = bert_tokenize(caption)
    regions, boxes = faster_rcnn(image)          # RoI features + spatial boxes

    words_masked, word_labels = mask_words(words)
    regions_masked, region_labels = mask_regions(regions)

    text_h = text_embedding(words_masked)
    visual_h = region_embedding(regions_masked, boxes)

    for layer in unimodal_text_layers:
        text_h = transformer_block(text_h)
    for layer in unimodal_visual_layers:
        visual_h = transformer_block(visual_h)

    for layer in co_attention_layers:
        text_h = self_attention(text_h)
        visual_h = self_attention(visual_h)
        text_h = cross_attention(query=text_h, key=visual_h, value=visual_h)
        visual_h = cross_attention(query=visual_h, key=text_h, value=text_h)

    loss_mlm = predict_masked_words(text_h, word_labels)
    loss_mrm = predict_masked_regions(visual_h, region_labels)
    loss_align = image_text_matching(text_h["CLS"], visual_h["IMG"])
    optimize(loss_mlm + loss_mrm + loss_align)
```

##### 动机与背景

BERT 证明了“先用代理任务预训练、再迁移到下游任务”的范式在语言任务上非常有效，但早期视觉语言任务仍大量依赖为 VQA、检索、指代表达等单独设计的网络。ViLBERT 的目标是把视觉 grounding 也变成一种可预训练、可迁移的能力，让同一个 backbone 通过少量任务头适配多种视觉语言任务。

直接把图像区域和词 token 拼成一个序列是一种自然选择，但 ViLBERT 选择双流结构：文本仍像 BERT 一样建模句法与语义，图像区域则在视觉流中建模物体间关系。这样做的好处是早期层可以专注各自模态，只有高层通过 co-attention 交换信息，避免两种输入在底层被过早混合。

##### 核心机制：双向 co-attention

ViLBERT 的关键层是 Co-TRM。给定语言表示 \(H\) 和视觉表示 \(V\)，标准自注意力先在各自模态内更新表示，然后交叉注意力执行：

$$
\mathrm{Attn}_{H \leftarrow V}=\mathrm{softmax}\left(\frac{Q_H K_V^\top}{\sqrt{d}}\right)V_V
$$

$$
\mathrm{Attn}_{V \leftarrow H}=\mathrm{softmax}\left(\frac{Q_V K_H^\top}{\sqrt{d}}\right)V_H
$$

第一式让每个文本 token 查询相关图像区域，第二式让每个图像区域查询相关词语。直觉上，“man shopping for fruit” 中的 `fruit` 会从水果区域获得视觉证据，水果区域也会从 `fruit`、`shopping` 等词获得语义约束。

##### 输入表示与预训练任务

视觉输入不是原始 patch，而是目标检测器产生的 object region。每个区域由外观特征和边界框位置编码组成，再加上一个类似 `[IMG]` 的全图聚合 token。语言输入沿用 BERT 的 token、segment、position embedding，因此 ViLBERT 可以复用 BERT 初始化。

Masked multimodal modeling 同时遮蔽文本词和图像区域：遮蔽词需要由周围词与图像区域恢复，遮蔽区域需要由其他区域与文本语义恢复。Image-text alignment 则判断图像和句子是否匹配，促使 `[CLS]` 与 `[IMG]` 级别的全局表示学到跨模态一致性。

> 💡 关键：ViLBERT 的创新不只是“把图像喂给 BERT”，而是把视觉与语言看成两个需要独立建模、再高层对齐的表示系统。

##### 训练与迁移流程

预训练阶段使用 Conceptual Captions 图文对。每个 batch 中既有真实图文对，也有替换 caption 形成的负样本。优化目标由遮蔽预测损失和图文匹配损失组成：

$$
\mathcal{L}=\mathcal{L}_{\text{MLM}}+\mathcal{L}_{\text{MRM}}+\mathcal{L}_{\text{ITM}}
$$

下游阶段保持同一个双流 backbone，只在不同任务上添加小型输出头。例如 VQA 读取融合后的全局表示做答案分类；图文检索使用全局匹配分数；RefCOCO+ 根据文本条件对区域打分；VCR 则把候选答案或 rationale 组织成文本输入。

##### 与传统方法的区别

传统视觉语言模型常把“视觉注意力”当成某个下游任务的局部模块，模型在一个任务中学到的 grounding 难以迁移。ViLBERT 把 grounding 提前到预训练阶段，并用 co-attention 层显式学习区域与词语之间的双向依赖，因此在多个任务上只需轻量适配即可获得较强表现。

与后来的单流 VisualBERT/UNITER 相比，ViLBERT 的双流设计更强调模态专属编码；与后来的 CLIP 相比，它不是只学习全局图文相似度，而是保留区域级、token 级交互，更适合需要细粒度关系推理的 VQA 和 VCR。

#### 🧪 练习题

```yaml
question: "ViLBERT 使用双流架构和 co-attention 的主要目的是什么？"
options:
  - "减少图像检测器的计算量"
  - "让视觉和语言先分别建模，再在高层进行双向跨模态交互"
  - "把所有视觉区域转换成自然语言 caption"
  - "避免使用任何预训练语言模型"
answer: 1
explain: "ViLBERT 保留视觉流和语言流的模态专属表示，并通过 Co-TRM 层让 token 与区域互相注意，从而学习可迁移的视觉语言 grounding。"
```
