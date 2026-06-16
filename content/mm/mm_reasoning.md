---
domain: multimodal
topic_id: mm_reasoning
topic_name: 多模态推理
page_icon: 🧠
page_title: 多模态推理技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 涵盖从视觉问答、多模态CoT到2026年原生多模态长链推理（Think with Images）的技术发展历程
hero_pills:
- 🏷️ Multimodal CoT · Visual Reasoning · Think with Images
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 视觉语言对齐基础
    color: '#888888'
  mm_cot:
    label: 多模态思维链
    color: '#888888'
  compositional:
    label: 组合推理与神经符号
    color: '#888888'
  frontier_2026:
    label: 2026前沿技术
    color: '#888888'
image_base: ../../content/mm/mm_reasoning/assets/
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: vilbert
  x: 100
  y: 100
  category: foundation
- id: clip
  x: 200
  y: 100
  category: foundation
- id: flamingo
  x: 300
  y: 100
  category: foundation
- id: blip2
  x: 400
  y: 100
  category: foundation
- id: llava
  x: 420
  y: 250
  category: mm_cot
- id: mm_cot
  x: 410
  y: 300
  category: mm_cot
- id: ddcot
  x: 480
  y: 300
  category: mm_cot
- id: t_sciq
  x: 550
  y: 300
  category: mm_cot
- id: visual_cot
  x: 620
  y: 300
  category: mm_cot
- id: image_of_thought
  x: 680
  y: 280
  category: mm_cot
- id: llava_cot
  x: 750
  y: 250
  category: mm_cot
- id: visprog
  x: 450
  y: 450
  category: compositional
- id: vipergpt
  x: 520
  y: 450
  category: compositional
- id: genome
  x: 600
  y: 450
  category: compositional
- id: cot_vla
  x: 760
  y: 450
  category: compositional
- id: mvot
  x: 720
  y: 550
  category: frontier_2026
- id: latent_sketchpad
  x: 780
  y: 580
  category: frontier_2026
- id: visual_thoughts
  x: 850
  y: 550
  category: frontier_2026
- id: covt
  x: 920
  y: 570
  category: frontier_2026
- id: zebra_cot
  x: 920
  y: 530
  category: frontier_2026
- id: reason_rft
  x: 850
  y: 350
  category: frontier_2026
- id: visionthink
  x: 920
  y: 330
  category: frontier_2026
- id: vl_rethinker
  x: 920
  y: 370
  category: frontier_2026
- id: think_or_not
  x: 990
  y: 350
  category: frontier_2026
- id: grounded_rl
  x: 990
  y: 390
  category: frontier_2026
- id: ssr_cot
  x: 850
  y: 600
  category: frontier_2026
- id: muslr
  x: 850
  y: 450
  category: frontier_2026
- id: med_r1
  x: 990
  y: 310
  category: frontier_2026
edges:
- from: clip
  to: flamingo
  label: 少样本学习
- from: clip
  to: blip2
  label: Q-Former桥接
- from: blip2
  to: llava
  label: 指令微调
- from: blip2
  to: mm_cot
  label: 两阶段推理
- from: mm_cot
  to: ddcot
  label: 职责分离
- from: mm_cot
  to: t_sciq
  label: LLM教导
- from: mm_cot
  to: visual_cot
  label: 数据集构建
- from: visual_cot
  to: image_of_thought
  label: 证据锚定
- from: llava
  to: llava_cot
  label: 逐步推理
- from: blip2
  to: visprog
  label: 程序合成
- from: visprog
  to: vipergpt
  label: 代码执行
- from: vipergpt
  to: genome
  label: 模块重用
- from: llava_cot
  to: cot_vla
  label: 具身智能
- from: visual_cot
  to: mvot
  label: 视觉想象
- from: mvot
  to: latent_sketchpad
  label: 潜空间草图
- from: mvot
  to: visual_thoughts
  label: 统一框架
- from: visual_thoughts
  to: covt
  label: 连续Token
- from: visual_thoughts
  to: zebra_cot
  label: 交错数据
- from: visual_cot
  to: ssr_cot
  label: 空间推理
- from: llava_cot
  to: reason_rft
  label: GRPO微调
- from: reason_rft
  to: visionthink
  label: Token压缩
- from: reason_rft
  to: vl_rethinker
  label: 自反思
- from: reason_rft
  to: think_or_not
  label: 选择性推理
- from: reason_rft
  to: grounded_rl
  label: 接地推理
- from: reason_rft
  to: med_r1
  label: 医学应用
- from: genome
  to: muslr
  label: 符号逻辑
milestones:
- clip
- mm_cot
- reason_rft
```

## 核心算法

### ViLBERT

```yaml
id: vilbert
num: 1
name: ViLBERT
full_name: 视觉语言BERT (Vision-and-Language BERT)
year: '2019'
org: Georgia Tech / Meta
parent: —
paper_url: https://proceedings.neurips.cc/paper/2019/hash/c74d97b59837b67032d2d4d6208c1d39-Abstract.html
project_url: ''
category: foundation
motivation: 首个多模态BERT扩展，双流架构实现跨模态注意力
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

### CLIP

```yaml
id: clip
num: 2
name: CLIP
full_name: 对比语言图像预训练 (Contrastive Language-Image Pre-training)
year: '2021.01'
org: OpenAI
parent: —
paper_url: https://openai.com/index/clip/
project_url: ''
category: foundation
motivation: 4亿图文对对比学习，零样本视觉理解奠基
```

#### 📝 一句话总结
CLIP 在 4 亿互联网图文对上训练图像编码器和文本编码器，用对比学习把两种模态对齐到同一嵌入空间，解决了传统视觉分类器依赖封闭标签集、难以零样本迁移的问题。

#### 🎯 核心要点
- 双编码器架构：图像编码器使用 ResNet 或 ViT，文本编码器使用 Transformer
- 训练数据 WIT：约 4 亿个从互联网收集的 image-text pairs
- 对称对比目标：同时优化 image-to-text 与 text-to-image 的 InfoNCE 交叉熵
- 大 batch 负样本：一个 batch 内 \(N\) 个正样本构成 \(N^2-N\) 个隐式负样本
- 可学习温度参数：缩放余弦相似度 logits，控制对比学习分布锐度
- 零样本分类：用 prompt 模板把类别名变成文本嵌入，将分类转化为图文匹配
- Prompt engineering 与 prompt ensembling 显著提升开放集识别稳定性

#### 🔬 深入细节
##### 核心架构示意图

![CLIP 训练与零样本推理流程](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png)
*图：CLIP 先做图文对比预训练，再用文本 prompt 生成零样本分类器，最后通过图像-文本相似度完成预测。*

##### 算法伪代码

```python
# CLIP 对比预训练核心逻辑
for images, texts in dataloader:
    image_features = image_encoder(images)       # [N, d_i]
    text_features = text_encoder(texts)          # [N, d_t]

    image_emb = l2_normalize(image_features @ W_i)
    text_emb = l2_normalize(text_features @ W_t)

    logits = exp(logit_scale) * image_emb @ text_emb.T
    labels = arange(len(images))                 # 对角线是匹配图文对

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    loss = (loss_i2t + loss_t2i) / 2
    optimize(loss)

# 零样本分类
class_texts = [template.format(label) for label in class_names]
class_emb = l2_normalize(text_encoder(class_texts) @ W_t)
pred = argmax(l2_normalize(image_encoder(image) @ W_i) @ class_emb.T)
```

##### 动机与背景

传统视觉识别依赖 ImageNet 这类人工标注标签，训练好的分类器只能输出固定类别。CLIP 的核心判断是：互联网上天然存在海量图像及其文字描述，自然语言本身可以提供更开放、更可组合的监督信号。只要模型能把“图片”和“描述图片的文字”对齐，就能把任意类别名、属性短语或任务描述变成分类器。

论文比较了预测式目标和对比目标。逐词生成 caption 虽然直观，但训练成本高且要求模型学习完整语言建模；CLIP 只要求匹配图像和文本是否成对，把任务化简为 batch 内 \(N\) 路检索，因此能扩展到 4 亿图文对。

##### 核心机制：对称 InfoNCE

对一个 batch 的 \(N\) 个图文对，CLIP 计算图像嵌入 \(I_i\) 与文本嵌入 \(T_j\) 的余弦相似度矩阵：

$$
s_{ij}=\exp(t)\cdot \frac{I_i^\top T_j}{\|I_i\|\|T_j\|}
$$

其中 \(t\) 是可学习的 logit scale。对称损失为：

$$
\mathcal{L}=\frac{1}{2}\left[
\frac{1}{N}\sum_i -\log\frac{\exp(s_{ii})}{\sum_j\exp(s_{ij})}
+
\frac{1}{N}\sum_i -\log\frac{\exp(s_{ii})}{\sum_j\exp(s_{ji})}
\right]
$$

第一项让每张图像找对文本，第二项让每段文本找对图像。对角线是正样本，其余位置都是负样本。batch 越大，模型看到的对比候选越多，图文空间的语义边界越清晰。

##### 图像编码器、文本编码器与共享空间

CLIP 的图像编码器包含两条路线：改造 ResNet 的版本使用 attention pooling 替代普通全局平均池化；ViT 版本把图像切成 patch 后用 Transformer 编码。文本编码器是 Transformer，使用 BPE 分词，并取文本末尾 token 的表示作为句子特征。

两个编码器输出后分别乘上线性投影矩阵 \(W_i\)、\(W_t\)，映射到同一维共享空间并做 L2 归一化。这样相似度就是超球面上的角度关系，训练目标不会依赖某个模态的特征范数。

> 💡 关键：文本编码器在零样本分类时相当于“动态生成分类器权重”。类别不再是训练时固定的 index，而是自然语言描述。

##### 零样本推理流程

给定一个新数据集，CLIP 不微调模型，而是为每个类别构造 prompt，例如 `a photo of a {label}`。文本编码器把这些 prompt 变成类别原型向量；图像编码器把测试图像变成图像向量；最终选择相似度最高的文本类别。

Prompt engineering 解决了两个问题：类别名通常太短，和训练时的自然语言 caption 分布不一致；某些类别名还有歧义。使用领域相关模板和多个 prompt 的 embedding 平均，可以显著改善 ImageNet 等数据集上的零样本准确率。

##### 与传统方法的区别

监督分类器学习的是固定标签空间中的 \(p(y\mid x)\)，迁移到新类别需要重新标注和训练。CLIP 学习的是 \(p(\text{text matches image})\) 的跨模态相似度，类别、属性、风格甚至任务描述都可以写成文本参与匹配。

与 ViLBERT 这类细粒度交互模型相比，CLIP 的双塔结构不在每个样本内部做 token-region 交互，因此训练和检索极其高效；代价是它更擅长全局对齐与开放分类，对需要复杂多步视觉推理的任务通常需要后续模型在其表征上继续构建。

#### 🧪 练习题
```yaml
question: "CLIP 能进行零样本分类的关键原因是什么？"
options:
  - "它在训练时见过所有下游数据集标签"
  - "它把类别名通过文本编码器转成可匹配的文本嵌入"
  - "它只使用图像编码器，不需要文本输入"
  - "它在推理时重新训练最后一层分类头"
answer: 1
explain: "CLIP 将类别描述写成 prompt 并编码为文本向量，再与图像向量比较相似度，因此可以在未微调的情况下处理新类别。"
```

### Flamingo

```yaml
id: flamingo
num: 3
name: Flamingo
full_name: '少样本视觉语言模型 (Flamingo: Few-Shot VLM)'
year: '2022'
org: DeepMind
parent: clip
paper_url: https://arxiv.org/abs/2204.14198
project_url: ''
category: foundation
motivation: Perceiver+门控交叉注意力，少样本推理突破
```

#### 📝 一句话总结
Flamingo 在冻结视觉编码器和冻结语言模型之间加入 Perceiver Resampler 与门控交叉注意力层，使模型能读取任意交错的图像/视频与文本提示，解决了 CLIP 类模型只能匹配、不能开放式生成和少样本适配的问题。

#### 🎯 核心要点
- 冻结视觉模型：使用预训练 NFNet 从图像或视频中提取高分辨率视觉特征
- Perceiver Resampler：把可变数量的空间/时间视觉特征压缩为固定数量视觉 token
- 冻结 Chinchilla 语言模型：保留大语言模型的文本生成和少样本学习能力
- Gated XAttn-Dense 层：在语言模型层之间插入可训练交叉注意力和前馈层，并用零初始化门控保持训练稳定
- 支持交错多模态上下文：输入可以是 `<image> text <image> text ...` 的任意序列
- 图像因果注意力：每个文本位置只直接 cross-attend 到最近相关视觉输入，历史视觉依赖通过 LM 自注意力传递
- 训练数据混合：M3W 网页交错图文、ALIGN/LTIP 图文对和 VTP 视频文本对共同训练

#### 🔬 深入细节
##### 核心架构示意图

![Flamingo 架构总览](https://ar5iv.labs.arxiv.org/html/2204.14198/assets/x38.png)
*图：Flamingo 用 Perceiver Resampler 将视觉特征变成少量视觉 token，再通过门控交叉注意力注入冻结语言模型。*

##### 算法伪代码

```python
# Flamingo 视觉条件语言建模
for sequence in multimodal_web_corpus:
    text_tokens, visual_inputs = parse_interleaved_sequence(sequence)

    visual_tokens_by_input = []
    for image_or_video in visual_inputs:
        feats = frozen_nfnet(image_or_video)             # spatial / temporal grid
        tokens = perceiver_resampler(feats, n_latents=64)
        visual_tokens_by_input.append(tokens)

    h = token_embedding(text_tokens)
    for lm_block, gated_xattn_dense in flamingo_layers:
        relevant_visual = image_causal_select(visual_tokens_by_input, h.position)
        h = h + tanh(alpha_xattn) * cross_attention(h, relevant_visual)
        h = h + tanh(alpha_ffw) * feed_forward(h)
        h = frozen_lm_block(h)

    loss = next_token_lm_loss(h, text_tokens)
    optimize(trainable_perceiver_and_gated_layers_only(loss))
```

##### 动机与背景

CLIP 证明了自然语言监督能训练强大的开放词表视觉表征，但它的输出是相似度分数，天然适合分类和检索，不适合开放式 VQA、captioning、多轮对话或少样本视觉推理。另一方面，大语言模型已经具备 in-context learning 能力，但只能读取文本。Flamingo 的问题设定就是：如何在尽量不破坏预训练能力的前提下，让大语言模型接收视觉上下文。

Flamingo 采用“冻结强模型 + 训练桥接层”的策略。视觉编码器负责感知，语言模型负责生成和推理，中间模块只学习如何把视觉信息压缩并送入语言模型。这样既减少训练成本，也避免大规模端到端训练导致的灾难性遗忘。

##### Perceiver Resampler：固定长度视觉接口

图像和视频会产生大量 patch 或时空网格特征，直接让语言模型对所有视觉特征 cross-attend 代价很高。Perceiver Resampler 引入一组可学习 latent query，对视觉特征做交叉注意力，输出固定数量的视觉 token：

$$
Z=\mathrm{Transformer}\left(Q_{\text{latent}}, K=V_{\text{vision}}, V=V_{\text{vision}}\right)
$$

无论输入是一张图还是多帧视频，输出都被压缩为固定大小，例如 64 个视觉 token。直觉上，这些 latent query 像一组可学习的“视觉摘要槽”，从高维视觉网格中抽取对语言生成最有用的信息。

##### 门控交叉注意力注入语言模型

Flamingo 不把视觉 token 拼进词序列，而是在冻结 LM 层之间插入新训练的 Gated XAttn-Dense block。该 block 先以语言隐藏状态为 query、视觉 token 为 key/value 做 cross-attention，再经过前馈层：

$$
h' = h + \tanh(\alpha_{\text{xattn}})\cdot \mathrm{CrossAttn}(h, Z)
$$

$$
h'' = h' + \tanh(\alpha_{\text{ffw}})\cdot \mathrm{FFW}(h')
$$

门控参数 \(\alpha\) 初始化为 0，因此训练刚开始时模型几乎等价于原始语言模型。随着训练推进，模型逐步学会在需要时读取视觉 token。

> 💡 关键：零初始化门控不是装饰性技巧，而是让一个已训练好的大语言模型在新增视觉通道后仍保持稳定生成的核心设计。

##### 交错输入与训练目标

Flamingo 的输入是图像/视频和文本交错的序列，例如少样本 VQA 可以写成“图1 + 问答示例1 + 图2 + 问答示例2 + 测试图 + 问题”。训练目标仍然是自回归语言建模：

$$
\mathcal{L}=-\sum_t \log p(y_t \mid y_{<t}, x_{\le t}^{\text{visual}})
$$

其中文本 token 只能利用当前位置之前的视觉输入。论文还设计了 per-image/video attention masking：一个文本位置直接 cross-attend 到最近对应的视觉输入，而更早图像的信息通过语言模型自注意力保留。这使模型训练时只见过有限图像数，也能在评估时扩展到更多 shots。

##### 数据混合与少样本适配

Flamingo 使用三类网页数据：M3W 从约 4300 万网页中恢复图文在 DOM 中的交错位置；ALIGN 与 LTIP 提供大规模图文对；VTP 提供视频文本对。不同数据集的负对数似然加权求和，权重需要调节，因为网页交错数据对 few-shot 能力尤其重要，而图文/视频对提供更密集的视觉描述监督。

推理时 Flamingo 不需要梯度更新，只要把少量示例放进 prompt，就可以做 captioning、open-ended VQA、multiple-choice VQA、视频问答等任务。这是它和“每个任务单独微调”的传统视觉语言系统之间最关键的差异。

##### 与前序方法的区别

与 CLIP 相比，Flamingo 是生成式模型，能输出自由文本而不仅是相似度。与 ViLBERT/BLIP 这类中等规模 VLP 模型相比，Flamingo 直接借用大语言模型的 in-context learning 能力，并通过少量可训练模块把视觉接入进去。与后来的 BLIP-2 相比，Flamingo 的桥接方式更深：它把交叉注意力插入 LM 多层，而 BLIP-2 主要通过 Q-Former 输出软视觉前缀。

#### 🧪 练习题
```yaml
question: "Flamingo 中 Gated XAttn-Dense 层的零初始化门控主要解决什么问题？"
options:
  - "让视觉编码器完全不参与训练"
  - "使新增视觉交叉注意力在训练初期不破坏冻结语言模型的原有行为"
  - "把图像 token 数量固定为 1 个"
  - "强制模型只做图文检索"
answer: 1
explain: "门控参数初始为 0 时，新插入层的输出几乎不影响原语言模型，训练过程再逐步学习如何利用视觉信息。"
```

### BLIP-2

```yaml
id: blip2
num: 4
name: BLIP-2
full_name: 引导式语言图像预训练2 (Bootstrapping Language-Image Pre-training 2)
year: '2023'
org: Salesforce
parent: clip
paper_url: https://proceedings.mlr.press/v202/li23q
project_url: ''
category: foundation
motivation: Q-Former轻量桥接，冻结编码器高效训练
```

#### 📝 一句话总结
BLIP-2 提出 Q-Former 作为冻结视觉编码器与冻结大语言模型之间的轻量桥接器，通过两阶段预训练完成视觉语言对齐，解决了端到端训练大规模 VLM 成本高、且难以复用现成单模态模型的问题。

#### 🎯 核心要点
- 冻结两端大模型：图像编码器使用 CLIP/EVA-CLIP ViT，语言模型使用 OPT 或 FlanT5
- Q-Former 桥接模块：188M 参数，包含可学习 query token 与共享 self-attention 的图像/文本 Transformer
- 固定数量查询：常用 32 个 learnable queries 从视觉特征中抽取与文本最相关的信息
- 第一阶段视觉语言表征学习：联合优化 ITC、ITM、ITG 三个目标
- 第二阶段视觉到语言生成学习：将 query 输出线性投影为 LLM 可读的软视觉 prompt
- 高效训练：只训练 Q-Former 和少量投影层，大幅减少可训练参数与显存成本
- 支持零样本图像到文本生成、视觉问答、captioning 与图文检索

#### 🔬 深入细节
##### 核心架构示意图

![BLIP-2 两阶段框架](https://arxiv.org/html/2301.12597v3/x1.png)
*图：BLIP-2 先用 Q-Former 从冻结图像编码器抽取语言相关视觉表示，再把该表示接到冻结 LLM 上做生成。*

##### 算法伪代码

```python
# Stage 1: 从冻结图像编码器学习视觉语言表示
for image, text in image_text_pairs:
    image_feats = frozen_image_encoder(image)
    query_outputs = q_former(learned_queries, image_feats, text=None)
    text_outputs = q_former(text=text, image_feats=None)

    loss_itc = image_text_contrastive(query_outputs, text_outputs)
    loss_itm = image_text_matching(q_former(learned_queries, image_feats, text))
    loss_itg = image_grounded_text_generation(q_former(learned_queries, image_feats, text))
    optimize_q_former(loss_itc + loss_itm + loss_itg)

# Stage 2: 让冻结 LLM 理解视觉 soft prompt
for image, text in image_text_pairs:
    image_feats = frozen_image_encoder(image)
    visual_queries = q_former(learned_queries, image_feats)
    visual_prompt = linear_projection(visual_queries)
    loss = frozen_llm_language_modeling(prefix=visual_prompt, target=text)
    optimize_q_former_and_projection(loss)
```

##### 动机与背景

大规模视觉语言预训练通常需要同时训练视觉 backbone、跨模态融合层和语言模型，成本高且容易破坏预训练模型已有能力。BLIP-2 的核心假设是：强视觉模型已经懂图像，强语言模型已经懂生成和指令，真正缺失的是一个足够小、可训练、能把视觉特征翻译成语言模型可用表示的接口。

Q-Former 正是这个接口。它不是把全部图像 patch 送入 LLM，而是用少量 query token 从冻结图像特征中提取“与语言相关”的瓶颈表示。这个瓶颈既降低计算，也迫使模型过滤掉对文本生成无关的视觉细节。

##### Q-Former 结构

Q-Former 包含两套功能视角：图像 Transformer 用 learnable queries 与冻结图像特征做 cross-attention；文本 Transformer 可以编码或解码文本。两者共享 self-attention 层，但根据任务使用不同 attention mask 控制 query 与 text 的交互。

常用配置中有 32 个 query，每个 query 维度 768。假设 query 输出为 \(Q=\{q_1,\dots,q_M\}\)，文本 `[CLS]` 表示为 \(t\)，图文相似度可以取所有 query 与文本相似度的最大值：

$$
s(I,T)=\max_m \frac{q_m^\top t}{\|q_m\|\|t\|}
$$

这比单个全局图像向量更灵活：不同 query 可以关注物体、属性、关系或背景等不同视觉证据。

##### 第一阶段：视觉语言表征学习

第一阶段只连接冻结图像编码器和 Q-Former，联合三个目标。Image-Text Contrastive Learning 使用 in-batch negatives 对齐图像 query 表示和文本表示；Image-Text Matching 用 hard negatives 训练细粒度匹配分类器；Image-Grounded Text Generation 让文本解码器在 query 条件下生成 caption。

不同目标使用不同 attention mask。ITC 为避免信息泄露，让 query 和 text 互不可见；ITM 使用双向 mask 让两者充分交互；ITG 使用 causal mask，让文本 token 只能看 query 和之前文本。这个设计让同一个 Q-Former 同时学会检索式对齐、匹配判断和生成式视觉 grounding。

##### 第二阶段：接入冻结 LLM

第二阶段把 Q-Former 输出通过全连接层投影到 LLM embedding 维度，并作为 soft visual prompt 前置到语言输入中。对于 decoder-only OPT，训练目标是条件语言建模；对于 encoder-decoder FlanT5，使用 prefix language modeling，把视觉 prompt 和前缀文本送入 encoder，让 decoder 生成后缀文本。

$$
\mathcal{L}_{\text{LM}}=-\sum_t \log p_\text{LLM}(y_t \mid y_{<t}, \mathrm{Proj}(Q(I)))
$$

LLM 参数保持冻结，因此 Q-Former 必须输出能被语言模型解释的视觉 token。相比直接微调 LLM，这种方式训练成本低，也更不容易遗忘语言模型本身的指令和知识能力。

> 💡 关键：BLIP-2 的两阶段训练先让 Q-Former 学“视觉和文本如何对齐”，再学“如何把视觉表示写成 LLM 能读的软提示”。两个问题分开后更稳定。

##### 数据与训练效率

BLIP-2 使用约 129M 图像的混合预训练数据，包括 COCO、Visual Genome、CC3M、CC12M、SBU 以及 LAION400M 子集，并使用 CapFilt 生成/筛选合成 caption。论文报告在冻结 ViT 和 LLM 的条件下，最大模型第一阶段和第二阶段分别只需数天级训练。

##### 与 Flamingo 和 CLIP 的区别

CLIP 学到的是全局图文对比空间，不能直接做开放文本生成。Flamingo 把交叉注意力插入冻结 LM 的多层，表达力强但新增模块更深。BLIP-2 把视觉信息浓缩成少量 soft prompts 输入 LLM，结构更模块化、更便宜，也便于更换视觉编码器或语言模型。

#### 🧪 练习题
```yaml
question: "BLIP-2 中 Q-Former 的核心作用是什么？"
options:
  - "替代冻结语言模型完成所有文本生成"
  - "从冻结图像特征中抽取少量语言相关视觉表示，并桥接到冻结 LLM"
  - "把图像分类标签直接映射成 one-hot 向量"
  - "只用于提高图像编码器的分辨率"
answer: 1
explain: "Q-Former 使用 learnable queries 读取冻结视觉特征，经过两阶段训练后输出 LLM 可理解的视觉 soft prompt。"
```

### LLaVA

```yaml
id: llava
num: 5
name: LLaVA
full_name: 大型语言视觉助手 (Large Language and Vision Assistant)
year: '2023.04'
org: UW-Madison
parent: blip2
paper_url: https://arxiv.org/abs/2304.08485
project_url: ''
category: mm_cot
motivation: 视觉指令微调，线性投影实现强大通用推理
```

#### 📝 一句话总结
LLaVA 首次系统地把 GPT-4 生成的视觉指令数据用于训练开源多模态助手，用 CLIP 视觉编码器、线性投影和 Vicuna 语言模型构成简单端到端架构，解决了早期 VLM 缺少指令跟随与通用视觉对话能力的问题。

#### 🎯 核心要点
- GPT-assisted 数据生成：用 COCO caption 与 bounding box 的文本化信息提示 GPT-4 生成视觉指令样本
- LLaVA-Instruct-158K：包含 conversation、detailed description、complex reasoning 三类指令数据
- 简洁模型结构：CLIP ViT-L/14 视觉编码器 + 线性投影矩阵 + Vicuna LLM
- 两阶段训练：先在 CC-595K 上做视觉-语言特征对齐，再在 158K 指令数据上微调
- 视觉编码器冻结：主要训练投影层和语言模型，降低视觉侧训练成本
- 统一自回归目标：只对 assistant 回答 token 计算语言建模损失
- ScienceQA 上结合 GPT-4 达到强视觉推理表现，推动后续开源多模态助手路线

#### 🔬 深入细节
##### 核心架构示意图

![LLaVA 网络架构](https://ar5iv.labs.arxiv.org/html/2304.08485/assets/x1.png)
*图：LLaVA 用投影矩阵 \(W\) 将 CLIP 视觉特征映射到 Vicuna 词嵌入空间，再与语言指令一起输入 LLM。*

##### 算法伪代码

```python
# 数据生成
for coco_image in coco:
    symbolic_context = captions(coco_image) + bounding_boxes(coco_image)
    instructions = gpt4_generate(symbolic_context,
                                 types=["conversation", "detail", "reasoning"])
    save(image=coco_image, conversations=instructions)

# Stage 1: feature alignment
for image, caption in cc595k:
    z_v = frozen_clip_vit(image)
    h_v = projection_W(z_v)
    prompt = "<image>\nDescribe the image briefly."
    loss = lm_loss(frozen_vicuna, prefix=h_v, prompt=prompt, target=caption)
    optimize(W)

# Stage 2: visual instruction tuning
for image, dialogue in llava_instruct_158k:
    z_v = frozen_clip_vit(image)
    h_v = projection_W(z_v)
    loss = autoregressive_loss(vicuna, visual_tokens=h_v,
                               dialogue=dialogue,
                               mask_only_assistant_tokens=True)
    optimize(W, vicuna)
```

##### 动机与背景

指令微调让语言模型从“补全文本”变成“遵循用户任务”的助手，但多模态领域当时缺少大规模高质量视觉指令数据。已有 VLM 可以 caption 或 VQA，却不擅长多轮对话、开放式解释和复杂视觉推理。LLaVA 的核心贡献是把语言模型指令微调的思路迁移到图像-语言空间。

由于 GPT-4 当时是文本输入，LLaVA 不能直接把图像交给 GPT-4 生成标注，于是把 COCO 图像的 caption 和 bounding boxes 转成符号化文本上下文。这些文本描述物体、位置和场景，再由 GPT-4 生成三类回答：多轮对话、详细描述和复杂推理。这样用少量已有视觉标注撬动了更丰富的指令数据。

##### 模型结构：线性视觉 tokenizer

LLaVA 选择非常简单的连接器。给定图像 \(X_v\)，CLIP ViT-L/14 输出视觉特征 \(Z_v\)，投影矩阵 \(W\) 将其映射到 LLM 词嵌入维度：

$$
H_v = W Z_v
$$

得到的 \(H_v\) 被当作一串视觉 token，与用户语言指令 token 拼接后输入 Vicuna。与 BLIP-2 的 Q-Former 或 Flamingo 的多层 gated cross-attention 相比，LLaVA 的连接器表达力更弱，但训练和复现成本低，便于快速验证“数据与指令微调是否足够重要”。

##### 两阶段训练流程

第一阶段是 feature alignment。模型在过滤后的 CC3M 子集 CC-595K 上训练，视觉编码器和 Vicuna 都冻结，只训练 \(W\)。输入通常是让模型简要描述图像的单轮指令，目标是原始 caption。这个阶段把视觉特征对齐到语言模型 embedding 空间，相当于训练一个兼容 Vicuna 的视觉 tokenizer。

第二阶段是 visual instruction tuning。视觉编码器继续冻结，投影层和 Vicuna 一起训练。多轮对话被组织成 Vicuna 风格的 prompt，损失只作用于 assistant 的回答部分：

$$
\mathcal{L}=-\sum_{t \in \text{assistant}} \log p_\theta(y_t \mid y_{<t}, H_v, X_q)
$$

这样模型不会被要求预测用户问题本身，而是学习在图像条件下给出符合指令的回答。

> 💡 关键：LLaVA 的性能提升很大程度来自视觉指令数据，而不只是架构。它证明了简单投影连接器配合高质量 instruction tuning 就能产生强多模态助手。

##### 数据类型与推理能力

LLaVA-Instruct-158K 包含约 58K conversation、23K detailed description 和 77K complex reasoning。前两类提高视觉对话和描述能力，complex reasoning 让模型练习基于场景信息进行因果、空间、常识推断。

在 ScienceQA 中，LLaVA 把题目、选项、图像和推理要求组织成单轮问答，训练模型输出 reasoning 和 answer。论文还展示了 LLaVA 与 GPT-4 协同后在 ScienceQA 上达到当时很强的准确率，说明视觉模型生成的中间推理可以与更强语言模型互补。

##### 与 BLIP-2、Flamingo 的区别

BLIP-2 重点是用 Q-Former 高效桥接冻结视觉编码器和冻结 LLM；Flamingo 重点是大规模交错图文预训练和少样本上下文学习。LLaVA 的重点则是 instruction tuning：它并不追求最复杂的桥接结构，而是用简单结构证明“面向用户指令的视觉对话数据”可以显著改变模型行为。

#### 🧪 练习题
```yaml
question: "LLaVA 第一阶段 feature alignment 的主要训练对象是什么？"
options:
  - "CLIP 视觉编码器的全部参数"
  - "Vicuna 的全部参数"
  - "连接视觉特征和语言嵌入空间的投影矩阵"
  - "GPT-4 数据生成器"
answer: 2
explain: "第一阶段冻结视觉编码器和 LLM，只训练线性投影矩阵，使 CLIP 视觉特征能作为 Vicuna 可读的视觉 token。"
```

### Multimodal-CoT

```yaml
id: mm_cot
num: 6
name: Multimodal-CoT
full_name: 多模态思维链 (Multimodal Chain-of-Thought)
year: '2023.02'
org: Amazon
parent: blip2
paper_url: https://arxiv.org/abs/2302.00923
project_url: ''
category: mm_cot
motivation: 两阶段框架生成推理理由，首超人类水平
```

#### 📝 一句话总结
Multimodal-CoT 将多模态问答拆成“先生成视觉语言依据的 rationale、再基于 rationale 推断答案”两个阶段，解决了小于 1B 的语言模型直接生成 CoT 时容易幻觉并误导答案的问题。

#### 🎯 核心要点
- 两阶段框架：Stage 1 生成 rationale，Stage 2 将 rationale 拼回输入后预测答案
- 视觉特征参与两个阶段：图像不是先转成 caption，而是通过冻结 ViT 提供 patch-level features
- T5/FLAN-Alpaca backbone：用 encoder-decoder 语言模型实现文本生成式 rationale 与 answer
- 跨模态交互模块：文本表示作为 query，视觉 patch 表示作为 key/value 做单头注意力
- 门控融合：自适应融合语言表示和视觉注意力输出，降低无关视觉信息干扰
- 支持无图问题：没有图像时使用同形状零向量作为 blank visual features
- ScienceQA 和 A-OKVQA 验证：显示视觉特征可减少幻觉、加速收敛并提升答案准确率

#### 🔬 深入细节
##### 核心架构示意图

![Multimodal-CoT 两阶段框架](https://ar5iv.labs.arxiv.org/html/2302.00923/assets/x4.png)
*图：Multimodal-CoT 先用语言和视觉输入生成 rationale，再把 rationale 加入第二阶段输入以推断最终答案。*

##### 算法伪代码

```python
# 训练阶段：两个模型结构相同，但目标不同
for question, context, choices, image, rationale, answer in scienceqa:
    x1 = concat(question, context, choices)
    v = frozen_vit(image) if image is not None else zeros_like_visual_features()

    pred_rationale = model_rationale(language=x1, vision=v)
    loss_r = seq2seq_loss(pred_rationale, rationale)

    x2 = concat(question, context, choices, rationale)
    pred_answer = model_answer(language=x2, vision=v)
    loss_a = seq2seq_loss(pred_answer, answer)

    optimize(loss_r + loss_a)

# 推理阶段：先生成，再回答
r_hat = model_rationale(language=concat(Q, C, M), vision=V)
a_hat = model_answer(language=concat(Q, C, M, r_hat), vision=V)
```

##### 动机与背景

语言模型的 CoT 能在数学和常识任务上提升推理，但论文发现小模型在 ScienceQA 这类多模态任务上直接输出“rationale 再 answer”反而会降低准确率。原因是模型会生成看似合理但与图像不一致的 rationale，一旦错误 rationale 被放在答案前面，就会强烈误导后续答案生成。

Multimodal-CoT 的核心设计是把 CoT 从一个连续生成问题拆开：第一阶段专门学习生成有视觉依据的 rationale，第二阶段专门学习利用该 rationale 做答案推断。这个拆分让模型可以分别优化“解释质量”和“答案正确性”，也便于把视觉特征注入两个阶段。

##### 视觉语言编码与融合

语言输入 \(X\) 经过 Transformer encoder 得到文本表示：

$$
H=\mathrm{LanguageEncoder}(X)
$$

图像 \(I\) 经冻结 ViT 提取 patch-level 特征，再线性投影到和文本表示相同的维度：

$$
V=W_v\cdot \mathrm{VisionExtractor}(I)
$$

交互阶段以文本表示为 query、视觉 patch 为 key/value 做注意力：

$$
A=\mathrm{softmax}\left(\frac{H V^\top}{\sqrt{d}}\right)V
$$

随后使用门控机制融合文本与视觉注意力输出：

$$
G=\sigma(W_h H + W_a A)
$$

$$
F=G\odot H + (1-G)\odot A
$$

融合后的 \(F\) 输入 Transformer decoder，生成 rationale 或 answer。门控的直觉是：并非每个 token 都需要视觉信息，模型应学会在文本已足够时依赖语言，在图像关键时打开视觉通道。

##### 两阶段目标

第一阶段输入通常是 question、context 和 multiple choices，输出人工标注 rationale：

$$
p(R \mid Q,C,M,I)
$$

第二阶段把生成或标注的 rationale 追加到输入中，输出答案：

$$
p(A \mid Q,C,M,R,I)
$$

训练时两个阶段使用标注 rationale；推理时先由第一阶段生成 \(\hat{R}\)，再用 \(\hat{R}\) 做答案推断。这种 train/inference 设定迫使 rationale 生成模块尽可能提供可用中间证据，而不是只在答案后生成解释。

> ⚠️ 注意：Multimodal-CoT 并不是简单“让模型多说几步”。如果 rationale 缺少视觉 grounding，它会比不使用 CoT 更危险，因为错误中间结论会被第二阶段当作条件。

##### 幻觉缓解机制

论文对错误样本分析发现，文本-only 两阶段模型经常对图中物体关系做错误假设。加入 ViT patch 特征后，rationale 的 RougeL 和答案准确率同时提升，说明视觉信号不仅帮助最终答案，也改善了中间推理链的事实性。

Caption 作为视觉替代只带来有限收益，因为 caption 会丢失空间关系、数量、图表和细粒度视觉属性。直接使用视觉特征则保留更多低层证据，模型可以在 token 与 patch 之间建立更细的注意力对应。

##### 与 BLIP-2/LLaVA 的区别

BLIP-2 和 LLaVA 更关注通用视觉语言接口或指令跟随，Multimodal-CoT 更聚焦“如何让小模型可靠地产生中间推理”。它不是依赖超大模型 few-shot prompting，而是在可训练的小型 encoder-decoder 框架里显式建模 rationale generation 与 answer inference，适合 ScienceQA 这类有解释标注的多模态推理数据。

#### 🧪 练习题
```yaml
question: "Multimodal-CoT 为什么要把 rationale 生成和答案推断拆成两个阶段？"
options:
  - "为了让模型完全不使用图像特征"
  - "为了减少文本输入长度到 1 个 token"
  - "为了先生成有视觉依据的中间推理，再用它辅助答案推断，降低幻觉误导"
  - "为了把所有问题都转成图像分类任务"
answer: 2
explain: "小模型直接生成 CoT 容易产生错误 rationale；两阶段设计让模型先优化中间理由，再将理由作为条件进行答案预测。"
```

### DDCoT

```yaml
id: ddcot
num: 7
name: DDCoT
full_name: 职责分离思维链 (Duty-Distinct Chain-of-Thought)
year: '2023'
org: Tsinghua
parent: mm_cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/108030643e640ac050e0ed5e6aace48f-Abstract-Conference.html
project_url: ''
category: mm_cot
motivation: 职责分离减轻幻觉，提升推理可靠性
```

#### 📝 一句话总结
DDCoT 将多模态 CoT 中的“语言推理”和“视觉识别”职责显式拆开，用 negative-space prompting 标记 LLM 无法仅凭文本确定的部分，再调用视觉模型补全证据，解决了 LLM 在看不见图像时编造视觉事实导致推理幻觉的问题。

#### 🎯 核心要点
- Duty-distinct prompting：把复杂问题拆成子问题，并判断每个子问题是否需要视觉识别
- Negative-space prompting：要求 LLM 在缺少图像时对不可判断子问题回答 `Uncertain`
- 视觉补全：使用现成 VQA/视觉模型回答被标记为不确定的视觉子问题
- 批判式整合：LLM 在整合阶段被提示“补充信息可能无效”，从而筛选或修正视觉模型错误
- 同时支持 zero-shot prompting 和 fine-tuning 两种使用方式
- Deep-Layer Prompting：在微调小模型时为不同 encoder 层加入可学习 prompts
- Rationale-Compressed Visual Embedding：用生成的 rationale 过滤和压缩关键视觉特征

#### 🔬 深入细节
##### 核心架构示意图

![DDCoT 框架总览](https://ar5iv.labs.arxiv.org/html/2310.16436/assets/x5.png)
*图：DDCoT 先把问题拆成语言推理与视觉识别子任务，再将视觉补全结果与原问题联合整合为 rationale，并可用于 zero-shot 或 fine-tuning。*

##### 算法伪代码

```python
# DDCoT rationale generation
def ddcot(question, context, choices, image):
    sub_questions = llm(
        "Think step by step and deconstruct the question "
        "into necessary sub-questions.",
        question, context, choices
    )

    sub_answers = []
    for sq in sub_questions:
        text_answer = llm(
            "Assume you have no image. Answer the sub-question; "
            "write Uncertain if it cannot be determined.",
            sq, question, context, choices
        )
        if text_answer == "Uncertain":
            visual_answer = vqa_model(image, sq)
            sub_answers.append((sq, visual_answer, "visual"))
        else:
            sub_answers.append((sq, text_answer, "language"))

    rationale = llm(
        "Use the supplementary information critically; it may be invalid. "
        "Select valid information and reason step by step.",
        question, context, choices, sub_answers
    )
    return rationale

# 使用方式
rationale = ddcot(Q, C, M, I)
answer = llm_or_finetuned_model(Q, C, M, I, rationale)
```

##### 动机与背景

多模态 CoT 的难点不只是“需要图像”，更在于 LLM 很容易把自身语言先验当成视觉事实。例如问题需要判断图中物体朝向、数量或相对位置时，纯文本 LLM 往往会生成流畅但错误的中间推理。DDCoT 的两个核心洞察是：保持批判性，以及让不同模型做自己擅长的事。

“职责分离”意味着 LLM 不应被迫承担视觉识别职责。它擅长拆解问题、组织逻辑、整合证据；视觉模型擅长回答局部识别问题。把这两类职责混在一个 prompt 中，会让 LLM 在看不见图像时编造缺失信息。

##### Negative-space prompting

DDCoT 首先让 LLM 将原问题拆成一组必要子问题。然后显式设定一个假设：“你没有任何图片信息”。在这个假设下，如果子问题可由题干、选项和常识回答，LLM 给出文本子答案；如果必须看图，则输出 `Uncertain`。

这个 `Uncertain` 就是 negative space：它不是失败，而是把缺失的视觉证据标记出来。相比让 LLM 直接猜测，negative space 把不确定性显式暴露，后续系统才能调用视觉模型补全。

##### 视觉补全与批判式整合

对每个 `Uncertain` 子问题，DDCoT 调用视觉问答模型获取视觉补充答案。视觉模型可能也会出错，因此 DDCoT 不把这些答案当作绝对事实，而是在最终整合 prompt 中明确提醒 LLM：补充信息不一定有效，需要选择可信信息形成 rationale。

> 💡 关键：DDCoT 不是简单“LLM + VQA”。它把视觉模型输出放在可被质疑的补充证据位置，让 LLM 在整合时保留对原问题和常识的一致性检查。

##### Fine-tuning 使用：DLP 与 RCVE

除了 zero-shot prompting，DDCoT 还把生成的 rationale 用于微调较小的多模态模型。Deep-Layer Prompting 在 encoder 的多层插入可学习 prompt，使浅层和深层都能参与跨模态对齐，而不是只在输入层拼接视觉信息。

Rationale-Compressed Visual Embedding 则利用 rationale 作为先验来筛选视觉特征。给定文本/理由表示 \(T\)、全局视觉特征 \(V_g\) 和局部视觉特征 \(V_l\)，模型先用 cross-attention 得到与文本相关的视觉摘要：

$$
\tilde{V}_g=\mathrm{CrossAttn}(Q=T,K=V_g,V=V_g)
$$

再通过低秩中间向量从局部视觉特征中过滤关键区域，形成最终输入语言模型的压缩视觉 embedding。直觉上，rationale 告诉模型“应该看什么”，RCVE 则把视觉输入压缩到与推理相关的部分。

##### 训练/推理流程

Zero-shot 场景中，DDCoT 先生成 rationale，再把 rationale 与题目一起输入 GPT-3/ChatGPT 等 LLM 预测答案。Fine-tuning 场景中，生成的 multimodal rationales 作为训练信号，配合 DLP 和 RCVE 微调 UnifiedQA 等小模型，在 ScienceQA 上提升答案准确率和解释质量。

论文强调 DDCoT 的 rationale 在自动指标上未必总是最高，但在人类评估中的相关性、正确性、完整性、一致性和可解释性更强。这与方法目标一致：它追求的是可靠视觉 grounding，而不只是生成与参考文本表面相似的解释。

##### 与 Multimodal-CoT 的区别

Multimodal-CoT 通过架构注入视觉特征，并用两阶段训练缓解小模型幻觉；DDCoT 则从 prompt 和职责分解角度处理幻觉。它不要求每一步都由同一个模型完成，而是让 LLM 承担推理规划与整合，让视觉模型承担识别，并通过 negative space 避免 LLM 在视觉缺失处过度自信。

#### 🧪 练习题
```yaml
question: "DDCoT 中 negative-space prompting 的主要作用是什么？"
options:
  - "让 LLM 在无法仅凭文本判断的视觉子问题上显式输出不确定"
  - "把所有图像转换成黑白图"
  - "删除最终 rationale 中的所有视觉信息"
  - "强制视觉模型完成语言推理"
answer: 0
explain: "Negative-space prompting 要求 LLM 承认缺失视觉证据，避免编造事实，并为后续视觉模型补全留下明确接口。"
```

### T-SciQ

```yaml
id: t_sciq
num: 8
name: T-SciQ
full_name: 教学式科学问答 (Teaching Multimodal CoT via LLM Signals)
year: '2024'
org: HKUST
parent: mm_cot
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/29884
project_url: ''
category: mm_cot
motivation: LLM信号教导多模态推理，解决数据稀缺
```

#### 📝 一句话总结
T-SciQ 用大语言模型 SciTeacher 自动生成并混合普通 CoT 与计划式 PCoT 教学信号，再微调小型多模态学生模型，解决了 ScienceQA 中人工 rationale 获取昂贵且质量受限的问题。

#### 🎯 核心要点
- Teacher-student 框架：SciTeacher 生成 CoT/PCoT 教学数据，SciStudent 通过监督微调学习
- QA-CoT 样本：用问题、上下文、选项和正确答案提示 LLM 生成详细解释
- QA-PCoT 样本：通过 lecture generation、plan generation、rationale generation 三步生成计划式推理
- 数据混合策略：按 ScienceQA skill 在验证集上选择 CoT 或 PCoT 教学信号
- 学生模型沿用 Multimodal-CoT 两阶段结构：先学 rationale generation，再学 answer inference
- 不依赖人工 CoT：用 LLM 生成信号替换 ScienceQA 原始人工解释
- 在 ScienceQA 上显著提升小模型，Multimodal-T-SciQ 最高达到 96.18% 准确率

#### 🔬 深入细节
##### 核心架构示意图

![T-SciQ 三阶段教学流程](https://ar5iv.labs.arxiv.org/html/2305.03453/assets/figures/aaai2024_main.png)
*图：T-SciQ 先生成 CoT 与 PCoT 两类教学数据，再按验证效果混合，最后用混合信号微调学生模型。*

##### 算法伪代码

```python
# 1. 生成两类教学信号
for example in scienceqa_train:
    qa_cot = sci_teacher(
        question=example.question,
        context=example.context,
        options=example.options,
        correct_answer=example.answer,
        instruction="Please give me a detailed explanation."
    )

for skill, examples in group_by_skill(scienceqa_train):
    lecture = sci_teacher(f"Skill: {skill}. QA pairs: {examples}. Give a lecture.")
    plan = sci_teacher(f"Skill: {skill}. Lecture: {lecture}. Devise a step-by-step plan.")
    for example in examples:
        qa_pcot = sci_teacher(
            f"Skill: {skill}. Lecture: {lecture}. Plan: {plan}. "
            f"QA pair: {example}. Carry out the plan step by step."
        )

# 2. 按 skill 选择更有效的教学信号
for skill in skills:
    err_cot = validate_student(skill, signal="CoT")
    err_pcot = validate_student(skill, signal="PCoT")
    chosen_signal[skill] = "PCoT" if err_pcot < err_cot else "CoT"

# 3. 用混合教学信号训练学生
for example in scienceqa_train:
    rationale = generated_signal[chosen_signal[example.skill]][example.id]
    train_multimodal_cot_student(example, rationale, example.answer)
```

##### 动机与背景

ScienceQA 提供了题目、图像、选项和解释，但高质量 CoT 标注昂贵，且人工解释可能缺少外部知识或不适合训练小模型。T-SciQ 的核心问题是：能否让强 LLM 作为老师，自动生成更适合学生模型学习的推理信号。

与直接让 GPT-4/GPT-3.5 推理不同，T-SciQ 关注的是“教学数据”。SciTeacher 不在测试时替学生答题，而是在训练前生成 rationale，随后由小得多的 SciStudent 通过监督学习掌握多模态 CoT 能力。

##### QA-CoT：普通解释式教学

QA-CoT 使用非常直接的零样本模板，把 question、context、options 和 correct answer 都填入 prompt，并要求 LLM 给出详细解释。正确答案作为 hint 可以减少老师生成错误 rationale 的概率：

$$
R_{\text{CoT}} = \mathrm{LLM}(Q,C,M,A,\text{instruction})
$$

这种信号适合相对简单的问题，因为老师只需解释为什么正确答案成立，不必显式规划解题步骤。

##### QA-PCoT：计划式教学

复杂 science question 往往需要先知道解题知识，再制定步骤。T-SciQ 因此生成 plan-based CoT，分三步完成。第一步按 skill 生成一条通用 lecture；第二步基于 lecture 和同 skill 的样例生成解题 plan；第三步将 lecture、plan 和具体 QA pair 一起输入 LLM，让其按计划执行并生成 rationale。

可以把 PCoT 看成：

$$
R_{\text{PCoT}}=\mathrm{LLM}(Q,C,M,A,\mathrm{Plan}(\mathrm{Lecture}(\text{skill})))
$$

它比普通 CoT 更适合复杂问题，因为学生看到的不只是结论解释，还有可复用的领域知识和解题流程。

##### 混合教学数据：按 skill 选择

T-SciQ 没有假设 PCoT 总是更好。对于简单问题，过长的计划式解释可能引入噪声；对于复杂问题，普通 CoT 又可能缺少分解。论文用验证集为每个 skill 选择更合适的信号：

$$
z_s^\*=\arg\min_{z\in\{\text{CoT},\text{PCoT}\}}\mathrm{Err}_{\text{val}}(s,z)
$$

如果某个 skill 上 PCoT 验证错误更少，就对该 skill 的训练样本使用 PCoT；否则使用 CoT。这个按技能粒度的选择比全局混合更稳，因为 ScienceQA 的不同技能难度差异很大。

> 💡 关键：T-SciQ 的“mixed LLM signals”不是简单拼接两份数据，而是用验证反馈决定每类科学技能更需要解释还是规划。

##### 学生训练流程

学生模型沿用 Multimodal-CoT 的两阶段范式。第一阶段学习从题目、选项和视觉输入生成老师提供的 rationale；第二阶段学习在题目、视觉输入和 rationale 条件下预测答案。区别在于监督信号从人工 annotated rationale 换成 T-SciQ 生成的混合 teacher rationale。

论文默认使用 GPT-3.5 text-davinci-003 作为 teacher，并在 UnifiedQA、Multimodal-CoT 等学生架构上验证。学生模型比 teacher 小约 200 倍，但通过高质量教学信号在 ScienceQA 上取得显著提升，最强 Multimodal-T-SciQ 达到 96.18%。

##### 与 Multimodal-CoT、DDCoT 的区别

Multimodal-CoT 主要设计了两阶段学生架构，并使用已有 rationale 标注训练；T-SciQ 主要解决训练信号来源和质量问题。DDCoT 强调推理/识别职责分离与幻觉控制；T-SciQ 强调把 LLM 生成的不同类型教学信号按问题技能混合，提升小模型学习效率。

#### 🧪 练习题
```yaml
question: "T-SciQ 为什么要混合 QA-CoT 和 QA-PCoT 两类教学信号？"
options:
  - "因为所有问题都只适合最长的推理链"
  - "因为简单问题更适合普通解释，复杂问题更需要计划式分解"
  - "因为学生模型不能读取图像"
  - "因为 CoT 和 PCoT 分别对应不同的答案选项编号"
answer: 1
explain: "T-SciQ 按 skill 在验证集上选择 CoT 或 PCoT，避免简单问题被过度规划干扰，同时让复杂问题获得更清晰的解题计划。"
```

### Visual CoT

```yaml
id: visual_cot
num: 9
name: Visual CoT
full_name: 视觉思维链数据集 (Visual Chain-of-Thought Dataset)
year: '2024'
org: NTU
parent: mm_cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2024/hash/0ff38d72a2e0aa6dbe42de83a17b2223-Abstract-Datasets_and_Benchmarks_Track.html
project_url: ''
category: mm_cot
motivation: 首个综合视觉CoT数据集，定义标注规范
```

#### 📝 一句话总结
Visual CoT 提出大规模视觉思维链数据集和 VisCoT 基线，让 MLLM 先定位回答问题所需的关键图像区域，再裁剪放大局部信息生成答案，解决固定低分辨率视觉 token 容易丢失小目标、文字和细粒度证据的问题。

#### 🎯 核心要点
- 构建 438k 个带关键区域 bounding box 的视觉 CoT 问答样本，其中约 98k 样本包含详细推理步骤
- 覆盖 Text/Doc、Chart、General VQA、Relation Reasoning、Fine-Grained Understanding 五类视觉推理场景
- 数据标注以“问题-答案-关键区域框”为核心，部分样本加入自然语言逐步推理，形成可监督的视觉聚焦过程
- 提出 VisCoT 多轮处理流程：全图编码 → 预测关键区域框 → Visual Sampler 裁剪局部 → 全局和局部 token 联合回答
- Visual Sampler 以 bbox 中心为基准裁剪正方形区域，并保证最小裁剪范围以适配 CLIP 视觉编码器
- 引入 Visual CoT benchmark，专门评估模型在需要定位局部证据时的视觉推理能力

#### 🔬 深入细节
##### 核心示意图

![Visual CoT 数据集示例](https://arxiv.org/html/2403.16999v2/x1.png)
*图：Visual CoT 覆盖图表、文档/文字、通用 VQA、细粒度识别和关系推理，每个样本标出回答所需的关键区域。*

![VisCoT 推理框架](https://arxiv.org/html/2403.16999v2/x3.png)
*图：VisCoT 先用全图视觉 token 预测关键区域，再对局部区域重新编码，最后联合全局与局部证据回答。*

##### 算法伪代码

```python
# VisCoT 两阶段视觉思维链推理
def viscot_inference(image, question, mlm, vision_encoder, projector):
    global_feat = projector(vision_encoder(image))

    # 第一轮：让模型输出最有助于回答问题的关键区域
    bbox_prompt = question + " Please provide the bounding box coordinate of the region that can help you answer the question better."
    bbox = mlm.generate_bbox(global_feat, bbox_prompt)  # [x1, y1, x2, y2]

    # Visual Sampler：根据 bbox 裁剪并放大局部区域
    crop = visual_sampler(image, bbox, input_resolution=vision_encoder.resolution)
    local_feat = projector(vision_encoder(crop))

    # 第二轮：全局 + 局部视觉 token 一起进入 MLLM
    answer = mlm.generate_answer([global_feat, local_feat], question)
    return answer, bbox
```

##### 动机与背景

传统 MLLM 通常把整张图像缩放到固定分辨率，再送入 CLIP 或类似视觉编码器。这个流程对全局语义足够，但对收据里的小字、图表中的局部数字、鸟类细粒度纹理或空间关系中的小目标很脆弱：关键信息在缩放后可能只占少数 patch，模型只能从低分辨率全图中猜测答案。

Visual CoT 的核心判断是：复杂视觉问答不只需要语言 CoT，还需要“视觉注意路径”的监督。数据集中每个样本不仅有答案，还标注了能够支撑答案的关键 bbox；这使模型可以学习“回答前应该看哪里”，从而把不可解释的全图一次性回答拆成可检查的定位和回答两步。

##### Visual Sampler 与局部重编码

给定模型预测的边界框 \([x_1,y_1,x_2,y_2]\)，Visual Sampler 先计算中心点和半宽半高：

$$
c_x=\frac{x_1+x_2}{2}, \quad c_y=\frac{y_1+y_2}{2}
$$

$$
w_h=\frac{x_2-x_1}{2}, \quad h_h=\frac{y_2-y_1}{2}
$$

为了适配正方形视觉编码器输入，它取 \(\max(w_h,h_h,r/2)\) 作为裁剪半边长，其中 \(r\) 是视觉编码器输入分辨率。这样既避免 bbox 过窄导致上下文不足，也避免随意放大一个极小区域造成模糊。

> 💡 关键：Visual CoT 不是额外接一个检测器，而是让 MLLM 自己生成 bbox；检测/OCR 模型主要用于构建监督数据，推理时核心流程仍是 MLLM + 视觉编码器。

##### 训练与推理流程

训练时，VisCoT 基线沿用 LLaVA-1.5 式结构：第一阶段冻结视觉编码器和 LLM，只训练图文投影；第二阶段对指令数据和 Visual CoT 数据进行微调。对带 CoT 标注的数据，模型学习先输出关键区域坐标，再基于局部裁剪生成答案；对没有 CoT 标注的数据，模型仍可直接执行普通 VQA。

推理时用户可以选择是否启用视觉 CoT。启用时，模型在答案前先生成关键区域 bbox，系统用 bbox 裁剪原图并重新编码，再把 \(H_0\)（全图特征）与 \(H_1\)（局部特征）拼接给 LLM：

$$
\text{answer}=f_{\theta}([H_0;H_1], q)
$$

这与简单提高全图分辨率不同。提高分辨率会让 token 数按面积增长，而 Visual CoT 只增加一个局部视角，因此更像“主动变焦”：先用低成本全局理解定位，再把计算集中到最有信息量的位置。

##### 与传统 CoT 的区别

文本 CoT 主要把推理路径写成自然语言，但如果模型一开始没有看清视觉证据，语言推理会放大幻觉。Visual CoT 把中间步骤改为可验证的视觉区域框，使推理链直接锚定图像证据。相比 VisProg/ViperGPT 这类外部工具调用方法，VisCoT 更偏数据监督和端到端 MLLM 能力注入，不要求 LLM 生成可执行程序。

#### 🧪 练习题
```yaml
question: "Visual CoT 中先预测 bbox 再裁剪局部区域的主要目的是什么？"
options:
  - "减少语言模型参数量"
  - "让模型聚焦回答所需的小区域或细节证据，而不是只依赖低分辨率全图"
  - "把所有视觉任务统一转换为图像分类"
  - "用随机裁剪增加数据增强强度"
answer: 1
explain: "Visual CoT 的关键是先定位支持答案的视觉证据，再重新编码局部区域，从而缓解小目标、文字和细粒度区域在全图缩放中丢失的问题。"
```

### Image-of-Thought

```yaml
id: image_of_thought
num: 10
name: Image-of-Thought
full_name: 图像思维提示 (Image-of-Thought Prompting)
year: '2024.05'
org: CUHK
parent: visual_cot
paper_url: https://arxiv.org/abs/2405.13872
project_url: ''
category: mm_cot
motivation: 每步锚定文本与视觉证据，精细化推理
```

#### 📝 一句话总结
Image-of-Thought 提出一种免训练 prompting 方法，让 MLLM 自动把问题拆成子目标，并在每一步调用图像处理工具生成视觉证据，再用“文本理由 + 视觉理由”的混合 rationale 修正最终答案，解决纯文本 CoT 难以可靠锚定图像细节的问题。

#### 🎯 核心要点
- 将 CoT 从纯文本扩展为多模态 rationale：每步包含 step、visual rationale、textual rationale 三元组
- 自动设计 IoT 流程：模型根据问题选择需要关注的目标、区域、空间关系或颜色等视觉操作
- 工具箱包含 FastSAM、GroundingDINO 和 PIL 等图像处理能力，用于分割、检测、裁剪、区域增强和空间辅助
- 将每一步生成的视觉证据重新输入 MLLM，使最终回答建立在显式可见的中间图像证据上
- 不需要额外训练数据或微调，主要依赖提示模板、多轮交互和外部视觉工具
- 在 MMBench、MME、MMVet 上验证，对空间关系、位置、属性比较等认知类任务提升更明显

#### 🔬 深入细节
##### 核心示意图

![Image-of-Thought 方法框架](https://arxiv.org/html/2405.13872v2/x1.png)
*图：IoT prompting 先设计图像处理步骤，逐步提取视觉 rationale，再把混合 rationale 序列反馈给 MLLM 修正答案。*

##### 算法伪代码

```python
# Image-of-Thought Prompting
def image_of_thought(question, image, mllm, toolbox):
    # 1. 让 MLLM 根据问题自动规划视觉证据抽取流程
    sub_goals = mllm.plan_visual_steps(question, image)
    rationales = []

    # 2. 每个子目标选择并执行图像处理操作
    for goal in sub_goals:
        action = mllm.select_tool(goal, toolbox)
        visual_rationale = toolbox.execute(action, image, goal)
        textual_rationale = mllm.explain_step(question, goal, visual_rationale)
        rationales.append({
            "step": goal,
            "visual": visual_rationale,
            "text": textual_rationale,
        })

    # 3. 把图像证据链和文本理由链一起反馈给模型
    answer = mllm.refine_answer(question, image, rationales)
    return answer, rationales
```

##### 动机与背景

多模态 CoT 的核心难点是：语言模型可以生成看似合理的推理步骤，但这些步骤未必真的来自图像。尤其在空间关系、目标位置、局部颜色、遮挡和多目标比较任务中，纯文本 CoT 容易把“猜测的描述”当成证据，导致推理链可读但不可靠。

Image-of-Thought 的思路是把中间推理步骤显式落到图像操作上。模型不只是写“我需要看左上角”，还要选择检测、分割、裁剪、空间标尺、颜色空间转换等操作，得到一个可重新输入模型的视觉 rationale。这样每一步推理都有对应的图像证据。

##### 多模态 rationale 三元组

IoT 把每个中间步骤表示成：

$$
r_i=(s_i, v_i, t_i)
$$

其中 \(s_i\) 是子目标或操作说明，\(v_i\) 是工具生成的视觉证据，\(t_i\) 是 MLLM 对该视觉证据的文字解释。多个步骤串联后形成 multimodal rationale series：

$$
R=\{(s_1,v_1,t_1),\dots,(s_n,v_n,t_n)\}
$$

最终回答不是直接从原图和问题生成，而是基于 \(R\) 做答案 refining：

$$
a=\operatorname{MLLM}(q, I, R)
$$

这种设计把“想什么”和“看到了什么”绑定起来，减少文本理由脱离图像的风险。

##### 工具调用与视觉证据抽取

论文使用可扩展工具箱来生成视觉 rationale。FastSAM 负责快速分割和显著区域提取，GroundingDINO 支持文本条件目标检测，PIL 用于裁剪、区域拼接、坐标标注、颜色变换等基础图像处理。论文还讨论了空间标尺、密集目标检测、referring object detection、颜色空间转换等操作，它们共同服务于把复杂问题拆成更小的视觉检查点。

> 💡 关键：IoT 的工具不是为了替代 MLLM，而是把 MLLM 的注意力落到“可以重新看的中间图像”上；最终判断仍由 MLLM 综合原图、子图和文本理由完成。

##### 训练/推理流程

IoT 是 training-free 方法。推理开始时，提示词要求模型“逐步思考图像特征”，并告知模型可以使用图像处理操作。模型先规划子目标，再为每个子目标选择工具并生成视觉 rationale。得到 rationale 序列后，模型再次看到这些中间结果，并输出修正后的最终答案。

与 Visual CoT 的数据监督不同，IoT 不需要预先标注 bbox 或训练模型学会定位。它更像一个推理时流程控制器：通过 prompt 让 MLLM 自主决定要抽取哪些视觉证据，并把抽取到的图像片段作为额外上下文。优点是部署轻、无需训练；代价是依赖工具质量和多轮调用稳定性。

##### 与传统 CoT 的区别

传统 CoT 只扩展文本上下文，无法保证每一步都被视觉证据支持；IoT 则把每步理由拆为视觉和文本两部分。当问题需要判断“哪一个更靠左”“某个小物体是什么颜色”“两个对象是否接触”时，视觉 rationale 能直接突出相关区域，降低模型在整图中遗漏关键证据的概率。

#### 🧪 练习题
```yaml
question: "Image-of-Thought 中 multimodal rationale 的核心组成是什么？"
options:
  - "只包含最终答案和置信度"
  - "由 step、visual rationale、textual rationale 组成的三元组序列"
  - "仅由模型隐藏层 attention map 组成"
  - "由训练集标签和梯度信息组成"
answer: 1
explain: "IoT 每一步都绑定子目标、图像处理得到的视觉证据和 MLLM 生成的文本解释，再把这些混合理由反馈给模型修正答案。"
```

### LLaVA-CoT

```yaml
id: llava_cot
num: 11
name: LLaVA-CoT
full_name: LLaVA思维链推理 (LLaVA Chain-of-Thought)
year: '2025'
org: ByteDance
parent: llava
paper_url: https://openaccess.thecvf.com/content/ICCV2025/html/Xu_LLaVA-CoT_Let_Vision_Language_Models_Reason_Step-by-Step_ICCV_2025_paper.html
project_url: ''
category: mm_cot
motivation: 让VLM逐步推理，结构化提升多步准确性
```

#### 📝 一句话总结
LLaVA-CoT 提出让 VLM 自主生成 Summary、Caption、Reasoning、Conclusion 四阶段结构化推理，并配合阶段级测试时搜索 SWIRES，解决普通 VLM 在复杂视觉问答中仓促回答、推理路径不稳定的问题。

#### 🎯 核心要点
- 将多模态回答显式拆为 `<SUMMARY>`、`<CAPTION>`、`<REASONING>`、`<CONCLUSION>` 四个阶段
- 构建 LLaVA-CoT-100k 数据集，用 GPT-4o 将多源 VQA 样本重写为结构化推理标注
- 基座模型为 Llama-3.2-11B-Vision-Instruct，使用全参数 SFT 学会阶段化输出
- Summary 负责解题规划，Caption 负责视觉解释，Reasoning 负责逻辑推导，Conclusion 输出最终答案
- 提出 SWIRES 阶段级回溯搜索：在每个阶段生成候选、奖励模型评分、低质量时回溯重试
- 使用 InternLM-XComposer2.5-Reward 作为测试时奖励模型，在 MMStar、MMBench、MMVet、MathVista、AI2D、HallusionBench 上验证

#### 🔬 深入细节
##### 核心示意图

![LLaVA-CoT 推理示例](https://raw.githubusercontent.com/PKU-YuanGroup/LLaVA-CoT/main/figures/reasoning.png)
*图：公开项目示例展示 LLaVA-CoT 如何先总结任务、描述图像，再逐步推理并给出结论。*

![LLaVA-CoT 基准表现](https://raw.githubusercontent.com/PKU-YuanGroup/LLaVA-CoT/main/figures/result.png)
*图：LLaVA-CoT 项目页展示其 11B 模型在六个多模态推理基准上的平均表现。*

##### 算法伪代码

```python
# LLaVA-CoT 四阶段生成 + SWIRES 阶段搜索
STAGES = ["SUMMARY", "CAPTION", "REASONING", "CONCLUSION"]

def llava_cot_answer(image, question, model):
    context = [image, question]
    outputs = {}
    for stage in STAGES:
        outputs[stage] = model.generate(
            context=context,
            prefix=f"<{stage}>"
        )
        context.append(f"<{stage}>{outputs[stage]}</{stage}>")
    return outputs["CONCLUSION"], outputs

def swires(image, question, model, reward_model, m=4, n=2, max_backtracks=3):
    summary = generate_stage(model, image, question, "SUMMARY")
    beams = [(summary, 0.0)]

    for stage in ["CAPTION", "REASONING", "CONCLUSION"]:
        candidates = []
        backtracks = 0
        while backtracks <= max_backtracks:
            for prefix, _ in beams:
                for _ in range(m):
                    out = generate_stage(model, image, question, stage, prefix)
                    score = reward_model.score(image, question, prefix + out)
                    candidates.append((prefix + out, score))
            candidates = sorted(candidates, key=lambda x: x[1], reverse=True)
            if quality_is_enough(candidates, reward_model) or stage == "CONCLUSION":
                break
            backtracks += 1
        beams = candidates[:n]
    return beams[0][0]
```

##### 动机与背景

普通 VLM 在复杂视觉问题中常见两类错误：一是没有先弄清问题就直接回答，二是在推理过程中遗漏或误读视觉证据。简单加一句“think step by step”并不稳定，因为模型仍可能把视觉描述、逻辑计算和最终答案混在一起生成，错误会在长回答中逐步累积。

LLaVA-CoT 的核心设计是给推理过程加结构边界。四个阶段分别承担不同职责：Summary 先决定要解决什么，Caption 把与问题相关的图像事实说清楚，Reasoning 在这些事实上推导，Conclusion 只输出最终结果。这个结构让模型学到更可控的生成顺序。

##### 四阶段结构化推理

模型输出被 XML-like 标签包裹：

```text
<SUMMARY>分析问题目标和所需步骤</SUMMARY>
<CAPTION>描述与问题相关的图像细节</CAPTION>
<REASONING>基于视觉事实逐步推理</REASONING>
<CONCLUSION>给出最终答案</CONCLUSION>
```

从概率建模角度，完整回答被分解为阶段条件生成：

$$
p(y\mid x,q)=\prod_{s\in\{\text{sum,cap,rea,con}\}} p(y_s\mid x,q,y_{<s})
$$

这种分解让后续阶段显式依赖前序阶段，Caption 的视觉事实成为 Reasoning 的条件，Reasoning 的结论再约束 Conclusion。

##### 数据与训练流程

LLaVA-CoT-100k 从多个视觉问答来源构造训练样本，覆盖通用 VQA、图表、文档 OCR、数学、科学和幻觉检测相关任务。作者使用 GPT-4o 生成四阶段标注，并过滤格式错误或答案不一致的样本。训练时对 Llama-3.2-11B-Vision-Instruct 做监督微调，让模型在没有额外提示模板约束时也能自然产出四阶段推理。

损失就是标准自回归语言建模损失，只是目标序列包含结构标签：

$$
\mathcal{L}_{\text{SFT}}=-\sum_t \log p_{\theta}(y_t\mid y_{<t}, I, q)
$$

> 💡 关键：标签不是展示格式而已。消融中去掉结构标签会降低效果，说明阶段边界帮助模型建立更稳定的内部推理流程。

##### SWIRES 测试时搜索

SWIRES 利用四阶段输出的天然边界做 test-time scaling。传统 Best-of-N 对完整回答采样再评分，粒度太粗；如果中间视觉描述错了，后面再好也难修复。SWIRES 在 Caption、Reasoning、Conclusion 等阶段分别生成候选，用奖励模型打分，保留 top-\(N\)，若候选质量低于阈值则回溯重试。

论文用奖励分数均值和方差设定回溯阈值：

$$
\tau=\mu_{\text{reward}} + Z\sigma_{\text{reward}}
$$

当阶段候选的高分项不足以通过阈值时，系统重新生成该阶段，最多回溯 \(C\) 次。这样做的直觉是把搜索预算花在“出错阶段”，而不是盲目生成更多完整答案。

##### 与传统 CoT 的区别

传统 CoT 主要增加推理文本长度，不区分规划、视觉观察和逻辑计算。LLaVA-CoT 把这些职责显式拆开，并用训练数据让模型习惯这种结构。相比 Visual CoT 的 bbox/局部重编码，LLaVA-CoT 更偏语言结构化推理；相比 VisProg/ViperGPT，它不执行外部程序，而是在 VLM 内部完成分阶段生成。

#### 🧪 练习题
```yaml
question: "LLaVA-CoT 中 SWIRES 相比 Best-of-N 的核心区别是什么？"
options:
  - "SWIRES 在完整回答级别一次性采样更多答案"
  - "SWIRES 在推理阶段级别生成、评分和回溯候选，而不是只对完整回答排序"
  - "SWIRES 通过重新训练奖励模型提升结果"
  - "SWIRES 只保留 Summary 阶段，不生成其他阶段"
answer: 1
explain: "SWIRES 利用 Summary、Caption、Reasoning、Conclusion 的阶段边界，在中间阶段就筛选和回溯，从而更早修复视觉描述或逻辑推理错误。"
```

### VisProg

```yaml
id: visprog
num: 12
name: VisProg
full_name: 视觉编程 (Visual Programming)
year: '2023'
org: UW
parent: blip2
paper_url: http://openaccess.thecvf.com/content/CVPR2023/html/Gupta_Visual_Programming_Compositional_Visual_Reasoning_Without_Training_CVPR_2023_paper.html
project_url: ''
category: compositional
motivation: LLM生成Python调用视觉API，无需训练
```

#### 📝 一句话总结
VisProg 提出用 LLM 根据自然语言指令生成 python-like 视觉程序，再调用现成视觉模型、图像处理函数和 Python 逻辑执行组合推理，解决端到端 VLM 难以无训练覆盖长尾复杂视觉任务的问题。

#### 🎯 核心要点
- 使用 GPT-3 的 in-context learning 从少量“指令-程序”示例生成视觉程序，无需梯度训练
- 程序由一系列模块调用组成，每行读取前序变量并产生新的中间变量
- 模块库包含 OWL-ViT、DSFD、MaskFormer、CLIP、ViLT、Stable Diffusion、OpenCV/Python 函数等
- 支持四类任务：组合 VQA、图像对 NLVR 零样本推理、知识目标标注、语言引导图像编辑
- 每个模块实现 `parse`、`execute`、`html` 三类接口，既执行计算也生成可视化 rationale
- 与 Neural Module Networks 不同，VisProg 不学习模块布局和模块参数，而是重用现成模型和 Python 解释器

#### 🔬 深入细节
##### 核心示意图

![VisProg 系统框架](https://ar5iv.labs.arxiv.org/html/2211.11559/assets/x1.png)
*图：VisProg 根据自然语言指令生成模块化视觉程序，执行时调用视觉/语言/图像处理模块，并汇总中间结果形成可解释 rationale。*

##### 算法伪代码

```python
# VisProg 推理流程
def visprog(image_or_images, instruction, llm, examples, module_registry):
    prompt = build_prompt(examples, instruction)
    program_text = llm.generate(prompt)  # python-like module calls

    state = {"IMAGE": image_or_images}
    rationale_html = []
    for step in parse_program(program_text):
        module = module_registry[step.module_name]
        inputs = [state[name] for name in step.input_variables]
        output = module.execute(*inputs, **step.literal_args)
        state[step.output_variable] = output
        rationale_html.append(module.html(inputs, output))

    return state[program_text.return_variable], rationale_html
```

##### 动机与背景

许多真实视觉任务不是单一分类或问答，而是“定位目标、裁剪区域、读取属性、查知识、做计数或逻辑判断”的组合。端到端模型需要为每种任务收集数据并训练，Neural Module Networks 虽然可组合，但通常要学习程序布局和模块参数，监督昂贵且很难扩展到开放长尾任务。

VisProg 的关键判断是：复杂任务的组合逻辑可以交给 LLM 生成程序，而底层感知能力可以复用已有模型。这样系统不需要为每个新任务微调，只要在 prompt 中提供几个示例，LLM 就能根据指令生成调用模块的程序。

##### 模块与程序表示

每个程序步骤包含模块名、输入变量、字面参数和输出变量，例如可以先 `LOC(image=IMAGE, object='person')` 得到人框，再 `CROP` 出区域，最后调用 `VQA` 或 `COUNT`。从形式上看，VisProg 学的是一个函数组合：

$$
y = m_k(\dots m_2(m_1(x))\dots)
$$

其中 \(m_i\) 可以是神经模型、图像处理函数、知识检索或 Python 逻辑。模块的输入输出不局限于文本，也可以是 bbox、mask、图像 patch、对象列表或生成图像。

##### 可解释执行器

VisProg 的执行器维护一个状态字典：

$$
S_t = S_{t-1} \cup \{v_t = m_t(\operatorname{args}_t; S_{t-1})\}
$$

这意味着每一步的中间变量都可检查。模块除了 `execute()` 外还提供 `html()`，用于可视化输入和输出，例如显示检测框、分割 mask、裁剪图或编辑结果。最终 rationale 不是语言模型自己编写的解释，而是执行轨迹的可视化摘要。

> 💡 关键：VisProg 的“思维链”是可运行程序，而不是纯自然语言。程序一旦执行失败或中间结果错误，用户可以定位是哪一步模块或哪条指令出了问题。

##### 训练/推理流程

VisProg 没有任务专属训练阶段。用户为某类任务写少量 in-context 示例，每个示例包含自然语言指令和期望程序。推理时把这些示例与新指令拼接给 GPT-3，得到视觉程序后由解释器执行。由于 LLM 不直接看图像，程序生成依赖指令语义；具体视觉内容则在执行阶段由模块读取。

论文展示了 20 个左右模块的组合能力。对于 GQA，系统可把复杂问题拆成定位、裁剪、VQA、计数、表达式求值；对于 NLVRv2，系统把图像对问题拆成两张图上的局部判断和 Python 布尔表达式；对于知识目标标注，GPT-3 可生成候选类别列表，再用 CLIP 对区域分类；对于图像编辑，则组合分割和 Stable Diffusion 等模块完成局部修改。

##### 与 VLM/Neural Module Networks 的区别

端到端 VLM 把感知和推理都压进一次前向传播，缺少显式中间状态；Neural Module Networks 依赖训练得到的布局或模块，扩展新模块成本高。VisProg 把布局生成交给 LLM，把逻辑执行交给 Python，把感知交给现成专家模型，因此更灵活、更容易调试，但性能也受限于程序生成稳定性和模块库覆盖范围。

#### 🧪 练习题
```yaml
question: "VisProg 相比端到端 VLM 的核心优势是什么？"
options:
  - "通过更大图像分辨率提升所有任务性能"
  - "把复杂视觉任务拆成可执行模块程序，复用现成模型且无需任务专属训练"
  - "只使用一个 CLIP 向量完成所有推理"
  - "完全不依赖语言模型"
answer: 1
explain: "VisProg 让 LLM 生成程序，执行器调用视觉、语言和 Python 模块，显式暴露中间结果，因此更适合组合式长尾任务。"
```

### ViperGPT

```yaml
id: vipergpt
num: 13
name: ViperGPT
full_name: Python执行视觉推理 (Visual Inference via Python Execution)
year: '2023'
org: Columbia
parent: visprog
paper_url: https://openaccess.thecvf.com/content/ICCV2023/html/Suris_ViperGPT_Visual_Inference_via_Python_Execution_for_Reasoning_ICCV_2023_paper.html
project_url: ''
category: compositional
motivation: 代码执行实现可解释可调试的视觉推理
```

#### 📝 一句话总结
ViperGPT 提出让代码生成模型直接编写并执行 Python 函数，通过 API 组合 GLIP、MiDaS、BLIP-2、X-VLM 等视觉语言模块，把复杂视觉问题转化为可审计的程序执行过程，解决端到端模型感知与推理混在一起、难以泛化和解释的问题。

#### 🎯 核心要点
- 用 Codex 作为 program generator，将自然语言视觉查询生成 Python 函数定义
- 提供抽象 API，而不是完整实现，让模型依据函数签名、docstring 和示例生成代码
- 核心类包括 `ImagePatch` 与 `VideoSegment`，支持图像 patch、视频片段、目标列表和任意 Python 返回类型
- 感知模块调用 GLIP、MiDaS、BLIP-2、X-VLM 等预训练模型，逻辑、排序、循环、算术由 Python 解释器完成
- 不训练任务专属模型，可用于 visual grounding、GQA、OK-VQA、视频因果和时间推理
- 程序中间变量可检查，错误可定位到具体 API 调用或 Python 逻辑

#### 🔬 深入细节
##### 核心示意图

![ViperGPT 执行示例](https://ar5iv.labs.arxiv.org/html/2303.08128/assets/x1.png)
*图：ViperGPT 根据图像和查询生成 Python 程序，执行程序并展示中间变量，使最终答案可解释、可调试。*

##### 算法伪代码

```python
# ViperGPT: query -> Python function -> execution
def vipergpt(query, visual_input, codex, api_spec):
    prompt = api_spec + "\n# Query: " + query + "\n"
    code = codex.generate(prompt)  # def execute_command(image): ...

    # 只暴露受控 API 环境，真实实现内部调用预训练模型
    env = {
        "ImagePatch": ImagePatch,
        "VideoSegment": VideoSegment,
        "distance": distance,
        "bool_to_yesno": bool_to_yesno,
    }
    fn = compile_python_function(code, env)
    result = fn(visual_input)
    return result, code
```

##### 动机与背景

视觉问答中的复杂问题常常需要先做感知再做符号推理。例如“每个孩子公平分到几个松饼”需要检测孩子和松饼、计数、再做除法。端到端 VLM 往往把这些步骤隐式压进一次生成，既不能保证计数和数学逻辑可靠，也无法知道错误来自检测、计数还是推理。

ViperGPT 把推理问题拆成两个系统：LLM 负责编写程序，Python 解释器负责执行逻辑，预训练视觉模型负责感知。这等价于把复杂查询 \(q\) 转换成程序 \(p\)，再执行：

$$
p = G_{\phi}(q, \mathcal{A}), \quad y = \operatorname{Exec}(p, x, \mathcal{M})
$$

其中 \(\mathcal{A}\) 是 API 规范，\(\mathcal{M}\) 是可调用的视觉语言模块集合。

##### API 设计

论文强调只把 API 规范放进 prompt，而不是把模块实现塞进上下文。`ImagePatch` 表示图像或裁剪区域，提供 `find(object_name)`、`exists(object_name)`、`verify_property(property)`、`best_text_match(options, prefix)`、`simple_query(question)`、`compute_depth()`、`crop(...)` 等方法。`VideoSegment` 则处理视频区间、帧采样和时间关系。

这种抽象有两个好处。第一，LLM 的上下文只需要理解“能调用什么”和“返回什么”，不会被实现细节占满。第二，模块实现可以升级，例如把 detector 从 GLIP 换成更强模型，而程序生成接口不变。

##### Python 执行与可解释性

ViperGPT 和 VisProg 的差异在于它不是只生成受限的模块调用序列，而是直接生成 Python 函数。Python 的 `if/else`、`for`、`sort`、`math` 等语言能力自然提供符号推理、控制流和算术能力；视觉模块则只处理它们擅长的感知任务。

> 💡 关键：ViperGPT 的可解释性来自真实执行轨迹。生成的代码、中间 patch、检测结果和最终返回值都能被检查，而不是让模型事后生成解释。

##### 模块与任务覆盖

论文实现中使用 GLIP 处理开放词汇检测和存在性判断，MiDaS 处理深度估计，BLIP-2 处理图像问答，X-VLM/CLIP 类模型处理图文匹配。基于这些模块，ViperGPT 在 RefCOCO/RefCOCO+ 做 visual grounding，在 GQA 做组合 VQA，在 OK-VQA 做外部知识依赖问答，在视频任务上处理因果和时间关系。

在 GQA 中，代码可以先定位目标，再裁剪相对区域，最后对局部区域调用 VQA；在 OK-VQA 中，程序可先抽取图像实体，再用 LLM 查询外部知识；在视频任务中，程序能遍历帧或片段并比较时间顺序。这些都利用了 Python 的结构化控制能力。

##### 与 VisProg 的区别

VisProg 生成更接近 DSL 的模块调用列表，强调模块库和可视化 rationale；ViperGPT 进一步放宽为普通 Python 代码，表达力更强，也更自然支持复杂控制流和任意返回类型。代价是代码安全、运行错误和 API 滥用需要额外防护，因此实际系统中应限制执行环境并审计可调用函数。

#### 🧪 练习题
```yaml
question: "ViperGPT 为什么要把视觉查询转换成 Python 代码执行？"
options:
  - "为了让 Python 替代所有视觉模型"
  - "为了显式组合感知模块与符号逻辑，使中间步骤可检查并支持控制流、算术和条件判断"
  - "为了减少图像输入大小"
  - "为了训练一个新的端到端视觉编码器"
answer: 1
explain: "ViperGPT 让 Codex 生成 Python 函数，视觉模块负责感知，Python 负责逻辑执行，因此复杂任务能被拆解、审计和调试。"
```

### GENOME

```yaml
id: genome
num: 14
name: GENOME
full_name: 生成式神经符号推理 (Generative Neuro-Symbolic Reasoning)
year: '2024'
org: MIT
parent: vipergpt
paper_url: https://openreview.net/forum?id=GENOME2024
project_url: ''
category: compositional
motivation: 模块生长与重用，动态扩展组合泛化
```

#### 📝 一句话总结
GENOME 提出让 LLM 从少量训练样例中判断现有模块是否足够、自动生成新模块并通过测试后加入模块库，使神经符号视觉推理系统能像积累技能一样“生长和复用”模块，解决 VisProg/ViperGPT 每个样例都重新生成代码、难以积累可迁移能力的问题。

#### 🎯 核心要点
- 三阶段框架：Module Initialization、Module Generation、Module Execution
- 模块初始化阶段判断现有模块能否解决新任务，若不足则生成新模块签名和输入输出规范
- 模块生成阶段让 LLM 编写新模块代码，并用少量训练样例作为测试用例验证通过率
- 只有通过测试的新模块才被加入可扩展 module library，供后续任务复用
- 模块执行阶段把新查询解析为高层符号操作，并调用已有和新生成模块完成推理
- 覆盖 VQA、referring expression comprehension、Raven、图像编辑、知识标注等任务，强调模块迁移和少样本适应

#### 🔬 深入细节
##### 核心示意图

![GENOME 三阶段框架](https://ar5iv.labs.arxiv.org/html/2311.04901/assets/x2.png)
*图：GENOME 包含模块初始化、模块生成、模块执行三阶段；新模块通过测试后进入模块库，并可在后续任务中复用。*

##### 算法伪代码

```python
# GENOME: grow and reuse visual reasoning modules
def genome_train(task_examples, module_library, llm):
    # Stage 1: 判断现有模块是否足够，并提出新模块签名
    need_new, signatures, reasoning_tests = llm.initialize_modules(
        examples=task_examples,
        existing_signatures=module_library.signatures()
    )

    # Stage 2: 生成并测试新模块
    for sig in signatures if need_new else []:
        for attempt in range(MAX_TRIES):
            code = llm.write_module(sig, task_examples, module_library.signatures())
            module = compile_module(code)
            passed = run_unit_tests(module, reasoning_tests, task_examples)
            if passed:
                module_library.add(sig.name, module)
                break
    return module_library

def genome_infer(image, query, module_library, llm):
    # Stage 3: 将自然语言 query 解析成高层程序并执行
    program = llm.parse_to_symbolic_program(query, module_library.signatures())
    state = {"IMAGE": image}
    for op in program:
        state[op.output] = module_library[op.name](*resolve_args(op, state))
    return state[program.return_value]
```

##### 动机与背景

VisProg 需要人类预先定义模块，ViperGPT 虽然能为每个样例生成代码，但通常是“一次性代码”：每来一个新输入就重新生成完整代码片段，没有把成功经验沉淀成可复用模块。这样既低效，也容易在相似问题上重复犯错。

GENOME 的核心目标是让神经符号系统拥有“模块生长”的能力。系统从少量样例中发现现有模块缺口，生成一个有明确输入输出的新模块，并用这些样例当作测试集验证模块是否真正可用。通过测试后，模块被加入库中，后续任务可以直接复用或组合它。

##### 三阶段机制

第一阶段是 Module Initialization。LLM 读取训练样例和已有模块签名，判断现有操作是否足以表达解题过程。如果不足，它会提出新模块，例如 `COMPARE_ATTRIBUTE(IMAGE, BOX0, BOX1, ATTR)`，并给出输入输出类型与推理步骤。这一步决定“要长出什么技能”。

第二阶段是 Module Generation。LLM 根据模块签名和样例生成 Python 代码，代码可以调用已有视觉模块或基础函数。系统将少量训练样例变成测试用例，执行生成模块并检查输出；失败时继续重试或改写。只有通过测试的模块才会加入库：

$$
\mathcal{M}_{t+1}=\mathcal{M}_t \cup \{m_{\text{new}}\}, \quad \text{if } \operatorname{Pass}(m_{\text{new}}, \mathcal{D}_{\text{few-shot}})
$$

第三阶段是 Module Execution。面对测试查询，LLM 将自然语言解析成高层符号程序，执行器调用模块库中已有模块和新模块得到结果。此时系统不必为每个样例从零写完整程序，而是复用已经验证过的能力块。

##### 为什么测试用例重要

GENOME 与普通代码生成的关键差异是“生成后验证”。视觉推理模块的失败可能来自输入类型不匹配、边界框处理错误、属性比较逻辑错误或对已有模块调用方式错误。少量训练样例虽然不是大规模监督数据，但足以作为 sanity check，过滤明显不可用的模块。

> 💡 关键：GENOME 把 few-shot examples 从“提示 LLM 怎么回答”升级为“测试新模块能否成为可复用技能”的依据。

##### 模块复用与迁移

一旦新模块进入库，它不仅能用于同一任务的新样本，也能迁移到相关任务。例如用于比较对象属性、判断空间关系、识别模式结构的模块，可以从 VQA 迁移到图像编辑、知识标注或 Raven 式视觉推理。模块库越丰富，后续任务越可能通过组合已有模块解决。

这种设计也提升了可解释性。最终答案来自符号程序的执行轨迹，而不是黑箱生成；当结果错误时，可以检查是解析程序错了、某个已有模块错了，还是新模块没有覆盖足够案例。

##### 与 ViperGPT 的区别

ViperGPT 强调直接生成并执行 Python 代码，表达力强但缺少长期记忆；GENOME 进一步把代码片段提升为命名模块，并通过测试后持久化到模块库。它的目标不是为每个输入“临时写脚本”，而是让系统逐步形成可复用的视觉推理技能集。

#### 🧪 练习题
```yaml
question: "GENOME 中新模块为什么要先通过少量训练样例测试再加入模块库？"
options:
  - "为了增加模型参数量"
  - "为了验证生成代码确实满足输入输出规范并能解决目标任务，避免不可用模块污染模块库"
  - "为了把图像转换成更高分辨率"
  - "为了完全替代 LLM 的程序解析能力"
answer: 1
explain: "GENOME 的核心是生成可复用模块；测试用例用于过滤错误实现，只有通过验证的模块才会被沉淀为后续可复用技能。"
```

### CoT-VLA

```yaml
id: cot_vla
num: 15
name: CoT-VLA
full_name: 视觉语言动作思维链 (Chain-of-Thought for Vision-Language-Action)
year: '2025'
org: Stanford
parent: llava_cot
paper_url: http://openaccess.thecvf.com/content/CVPR2025/html/Zhao_CoT-VLA_Visual_Chain-of-Thought_Reasoning_for_Vision-Language-Action_Models_CVPR_2025_paper.html
project_url: ''
category: compositional
motivation: CoT扩展至具身智能，提升机器人决策
```

#### 📝 一句话总结
CoT-VLA 将视觉思维链引入视觉-语言-动作模型，在输出动作前先自回归生成未来子目标图像作为视觉推理中间状态，再预测短动作序列，解决现有 VLA 直接从当前观测到动作、缺少时间规划和视觉想象的问题。

#### 🎯 核心要点
- 把 CoT 从文本推理扩展到机器人控制：中间思维不是文字，而是未来子目标图像
- 基于统一视觉-语言模型生成视觉 token、文本 token 和动作 token
- 视觉 CoT 阶段预测未来图像帧，使模型先“想象目标状态”再行动
- 动作表示为 7-DoF 连续控制离散化后的 token，每个维度映射到 256 个 bin
- 使用 action chunking，一次预测 10 个连续动作以降低闭环控制的自回归开销
- 混合注意力机制：图像/文本 token 保持因果生成，动作 token 使用全注意力互相协调
- 两阶段训练：先用机器人演示和无动作视频预训练视觉预测，再在目标机器人数据上适配

#### 🔬 深入细节
##### 核心示意图

![CoT-VLA 方法动机](https://arxiv.org/html/2503.22020v1/x1.png)
*图：CoT-VLA 相比直接动作预测，先生成未来子目标图像作为视觉思维链，再据此产生动作。*

![CoT-VLA 模型结构](https://arxiv.org/html/2503.22020v1/x2.png)
*图：CoT-VLA 统一处理图像、语言、视觉思维和动作 token。*

![CoT-VLA 混合注意力](https://arxiv.org/html/2503.22020v1/x3.png)
*图：图像/文本生成使用因果注意力，动作 token 间使用全注意力以预测协调的动作 chunk。*

##### 算法伪代码

```python
# CoT-VLA test-time closed-loop control
def cot_vla_control_loop(env, instruction, model, visual_tokenizer):
    obs = env.get_observation()
    while not env.done():
        obs_tokens = visual_tokenizer.encode(obs.image)
        text_tokens = tokenize(instruction)

        # Visual Chain-of-Thought: 生成未来子目标图像 token
        subgoal_tokens = model.generate_visual_tokens(
            context=[obs_tokens, text_tokens],
            attention="causal"
        )

        # Action prediction: 基于当前观测、指令和子目标图像预测动作块
        action_tokens = model.predict_action_chunk(
            context=[obs_tokens, text_tokens, subgoal_tokens],
            chunk_size=10,
            attention_for_actions="full"
        )
        actions = dequantize(action_tokens, bins=256)

        for action in actions:
            obs = env.step(action)
            if env.done():
                break
```

##### 动机与背景

Vision-Language-Action 模型将图像观测和语言指令映射为机器人动作，但多数方法更像反射式策略：看到当前画面后直接预测动作。这对短程拾取可行，对长时操作、需要绕开障碍、先移动到子目标再执行的任务则缺少显式规划。

CoT-VLA 的关键假设是：机器人任务的中间推理更适合用视觉状态表示，而不是自然语言句子。未来子目标图像能直接编码物体位置、机械臂姿态、目标区域和空间关系，比“向左移动一点再靠近杯子”这类文本更精确。

##### 视觉思维链与训练目标

给定当前观测 \(o_t\) 和语言指令 \(l\)，模型先生成未来视觉 token \(\hat{s}_{t+k}\)，再预测动作序列 \(a_{t:t+C-1}\)。视觉生成损失为：

$$
\mathcal{L}_{\text{visual}}=-\sum_i \log p_{\theta}(v_i \mid v_{<i}, o_t, l)
$$

动作损失为离散动作 token 的交叉熵：

$$
\mathcal{L}_{\text{action}}=-\sum_j \log p_{\theta}(a_j \mid o_t, l, \hat{s}_{t+k})
$$

总目标将二者相加：

$$
\mathcal{L}=\mathcal{L}_{\text{visual}}+\mathcal{L}_{\text{action}}
$$

> 💡 关键：视觉损失让模型学习“任务接下来应该长什么样”，动作损失让这个想象状态真正服务于控制。

##### 动作 token 与混合注意力

每个动作是 7 维，包括末端执行器位姿和夹爪控制。论文将每个动作维度按训练数据分位范围离散到 256 个 bin，并复用文本 tokenizer 中较少使用的 token 作为动作 token。一次预测 \(C=10\) 个动作，共 \(10\times7\) 个动作 token。

动作 chunk 内部需要相互一致，例如第 1 步和第 10 步不能指向冲突目标。因此 CoT-VLA 对动作 token 使用全注意力，让所有动作维度和时间步彼此可见；而图像和文本 token 仍保持因果注意力，保证视觉思维链可以自回归生成。

##### 训练/适配流程

预训练阶段使用 Open X-Embodiment 的机器人演示，以及 EPIC-KITCHENS、Something-Something V2 等无动作视频，让模型学习未来视觉预测。无动作视频不能提供机器人控制标签，但可以训练“观察当前状态并想象未来变化”的能力。

适配阶段在目标机器人数据上微调，优化视觉和动作联合目标。论文在 LIBERO 仿真、Bridge-V2 真实机器人和 Franka tabletop 三类设置上评估，展示视觉思维链对仿真与真实操作任务都有帮助。

##### 与传统 VLA 的区别

OpenVLA 等模型主要直接预测动作，CoT-VLA 在动作前加入未来图像作为显式中间变量；SUSIE 等两阶段方法也会生成目标图像，但 CoT-VLA 把视觉生成和动作预测统一在一个自回归模型中训练。相比文本 CoT，视觉 CoT 更贴近机器人操作中的空间状态和时间变化。

#### 🧪 练习题
```yaml
question: "CoT-VLA 中视觉思维链的核心作用是什么？"
options:
  - "把机器人动作翻译成自然语言解释"
  - "在动作预测前生成未来子目标图像，作为空间规划和动作决策的中间状态"
  - "用扩散模型生成训练数据标签"
  - "删除语言指令，只依赖当前图像"
answer: 1
explain: "CoT-VLA 先预测未来视觉状态，再基于当前观测、指令和子目标图像生成动作 chunk，使 VLA 获得显式时间规划能力。"
```

### MVoT

```yaml
id: mvot
num: 16
name: MVoT
full_name: 多模态可视化思维 (Multimodal Visualization-of-Thought)
year: '2025.01'
org: PKU
parent: visual_cot
paper_url: https://arxiv.org/abs/2501.07542
project_url: ''
category: frontier_2026
motivation: 生成图像想象推理过程，空间推理优势
```

#### 📝 一句话总结
MVoT 提出让多模态模型在空间推理过程中交错生成文字思考和图像化中间状态，并用 token discrepancy loss 提升视觉思维图的质量，解决纯文本 CoT 在复杂空间变化中容易坐标描述错误、难以保持视觉状态的问题。

#### 🎯 核心要点
- 将 CoT 扩展为 Multimodal Visualization-of-Thought：每一步既有 verbal thought，也有 visual thought
- 使用能生成交错文本和图像的自回归 MLLM，让模型边推理边“画出”中间状态
- 采用 Anole-7B/Chameleon 式统一离散 token 架构，文本 token 和图像 token 串接进同一个 causal Transformer
- 引入 token discrepancy loss，在视觉 embedding 空间惩罚偏离 ground-truth image token 的预测，改善生成图像一致性
- 在 Maze、MiniBehavior、FrozenLake 三类动态空间推理任务上构造交错文本-图像训练数据
- 与 Direct、纯文本 CoT、普通 interleaved training 对比，强调 MVoT 在更复杂空间环境下的鲁棒性

#### 🔬 深入细节
##### 核心示意图

![MVoT 推理范式](https://arxiv.org/html/2501.07542v1/x1.png)
*图：MVoT 在推理轨迹中交错生成文字步骤和可视化图像状态，让后续推理条件化于此前的视觉思维。*

![Token discrepancy loss](https://arxiv.org/html/2501.07542v1/x3.png)
*图：MVoT 在自回归 MLLM 训练中加入 token discrepancy loss，缓解文本 tokenizer 与图像 tokenizer 表征差异带来的视觉生成质量问题。*

##### 算法伪代码

```python
# MVoT autoregressive reasoning
def mvot_reason(input_image, question, model):
    context = [encode_image(input_image), encode_text(question)]
    thoughts = []

    while not should_answer(context):
        verbal = model.generate_text(context, tag="verbal_thought")
        context.append(encode_text(verbal))

        visual_tokens = model.generate_image_tokens(context, tag="visual_thought")
        visual = decode_image(visual_tokens)
        context.append(visual_tokens)

        thoughts.append((verbal, visual))

    answer = model.generate_text(context, tag="final_answer")
    return answer, thoughts

def mvot_training_loss(logits, labels, visual_token_positions, codebook):
    ce = cross_entropy(logits, labels)
    discrepancy = token_discrepancy_loss(
        logits[visual_token_positions],
        labels[visual_token_positions],
        codebook
    )
    return ce + discrepancy
```

##### 动机与背景

纯文本 CoT 对数学和语言推理很有效，但空间任务经常需要维护动态视觉状态：人在迷宫中走到哪里、物体是否被拿起、FrozenLake 的洞和目标位置如何变化。把这些状态全部翻译成坐标文本既冗长又脆弱，一旦文本描述中某个坐标错了，后续推理会持续偏离。

MVoT 的核心观点是：人类不只用语言思考，也会在脑中形成图像。对于空间推理，模型如果能生成中间图像状态，就可以把“当前我认为世界是什么样”显式保留下来，并让后续步骤直接基于这个视觉状态继续推理。

##### 交错多模态推理形式

给定输入 \(X\)，普通 CoT 生成文本中间步骤：

$$
z_i \sim p_{\theta}(z_i \mid X, z_{<i})
$$

MVoT 为每个文本步骤增加图像可视化 \(v_i\)，后续步骤同时依赖文本和视觉历史：

$$
(z_i, v_i) \sim p_{\theta}(z_i, v_i \mid X, z_{<i}, v_{<i})
$$

最终答案基于完整的交错轨迹：

$$
a \sim p_{\theta}(a \mid X, z_{1:n}, v_{1:n})
$$

这使模型可以把环境变化画出来，而不是只在文本中描述。

##### 自回归 MLLM 与 token discrepancy loss

MVoT 使用统一 Transformer 处理图像和文本 token。图像 tokenizer 将图像映射为离散 codebook index，文本 tokenizer 生成普通语言 token，二者拼接后由 causal Transformer 预测下一 token。训练时，文本和图像 token 都参与交叉熵损失。

问题在于图像 token 的 codebook 有视觉几何结构，而普通交叉熵只把所有错误 token 同等看待。Token discrepancy loss 进一步在视觉 embedding 空间度量预测分布与真实 token 的距离，使模型更少把概率分配给视觉上差异很大的 token：

$$
\mathcal{L}=\mathcal{L}_{\text{CE}}+\lambda \mathcal{L}_{\text{TD}}
$$

其中 \(\mathcal{L}_{\text{TD}}\) 根据 codebook embedding 间距离加权惩罚视觉 token 预测偏差。直觉上，颜色或位置相近的错误比完全无关的错误更可接受，该损失让模型学习这种视觉相似性。

##### 训练与任务设计

论文构造三类受控动态空间推理任务。Maze 要根据初始迷宫和动作序列预测最终位置；MiniBehavior 扩展到 embodied 场景，需要判断打印机、桌子和 agent 的交互结果；FrozenLake 包含更复杂图案和洞，需要判断动作序列是否安全到达目标。

训练数据被组织成交错文本-图像对：模型先生成一步文字说明，再生成对应环境状态图。实验使用 Anole-7B 作为 backbone，并通过 LoRA 做指令微调。与普通 interleaved training 不同，MVoT 对文字和图像预测都计算损失，而不是只监督文本 token。

> 💡 关键：MVoT 的“图像思维”不是展示给人看的附属解释，而是下一步推理的条件；图像质量越可靠，后续空间推理越稳定。

##### 与 Visual CoT / Image-of-Thought 的区别

Visual CoT 和 Image-of-Thought 主要从输入图像中定位、裁剪或提取视觉证据；MVoT 更进一步，让模型生成新的中间图像状态，表达“经过这一步操作后世界应变成什么样”。因此它特别适合空间状态会随动作更新的任务，而不只是静态图像问答。

#### 🧪 练习题
```yaml
question: "MVoT 中 token discrepancy loss 的主要作用是什么？"
options:
  - "让模型只生成文本，不再生成图像"
  - "在视觉 embedding 空间约束图像 token 预测，提升生成视觉思维的连贯性和保真度"
  - "把所有动作转换为 one-hot 文本标签"
  - "降低输入图像分辨率以节省显存"
answer: 1
explain: "普通交叉熵忽略图像 codebook 的视觉相似性；token discrepancy loss 根据视觉 embedding 距离惩罚偏离真实图像 token 的预测。"
```

### Latent Sketchpad

```yaml
id: latent_sketchpad
num: 17
name: Latent Sketchpad
full_name: 潜空间草图板 (Latent Sketchpad)
year: '2025'
org: Google
parent: mvot
paper_url: https://arxiv.org/abs/2501.latentsketchpad
project_url: ''
category: frontier_2026
motivation: 潜空间草图绘制，高效辅助复杂推理
```

#### 📝 一句话总结
Latent Sketchpad 提出在冻结的多模态大模型中外挂 Context-Aware Vision Head，让模型在自回归文本推理过程中生成连续视觉 latent，并用 Sketch Decoder 将这些 latent 渲染成可解释草图，从而把文本 CoT 扩展为“边想边画”的潜空间视觉思考。

#### 🎯 核心要点
- **潜空间视觉草图板**：不直接生成像素图，而是在 MLLM 视觉特征空间中生成连续 visual latents，用作推理中间状态
- **Context-Aware Vision Head**：根据 MLLM 当前隐藏状态、历史图像 latent 和当前图像已生成 latent，自回归地产生下一组视觉 latent
- **Pretrained Sketch Decoder**：独立于主模型训练，将视觉 latent 对齐到 VAE latent 空间，再渲染为草图，便于人类检查推理轨迹
- **冻结主干的模块化训练**：Vision Head 和 Sketch Decoder 可单独训练，尽量保持 Gemma3、Qwen2.5-VL 等预训练 MLLM 的原有理解能力
- **MazePlanning 数据集**：构造 47.8K 训练迷宫和 500 测试迷宫，用 interleaved text-image reasoning 评估空间规划能力
- **与 MVoT 的区别**：MVoT 依赖统一生成模型产生像素级中间图；Latent Sketchpad 复用预训练视觉特征，在 latent 层完成轻量视觉思考

#### 🔬 深入细节
##### 核心示意图

![Latent Sketchpad 总览](https://github.com/hwanyu112/Latent-Sketchpad/raw/main/asset/overview.png)
*图：Latent Sketchpad 在现有 MLLM 上增加 Vision Head 与 Sketch Decoder，使模型可以在文本推理中插入视觉 latent。*

##### 动机与背景

传统多模态 CoT 主要把视觉信息转写为语言，复杂空间关系、路径规划和动态场景状态会被压缩成离散文本描述，容易丢失几何细节。另一类方法调用外部视觉工具或图像生成模型，但工具能力固定，像素生成也往往更关注逼真度而不是推理需要的抽象结构。

Latent Sketchpad 的核心判断是：预训练 MLLM 的视觉编码器已经拥有可用于理解的高质量视觉表征，只是这些表征通常只作为输入感知结果，而不会在推理过程中被主动生成。论文因此把视觉特征空间重新用作“内部草图板”：模型每走一步，可以生成下一段视觉 latent，用它帮助后续语言推理。

这种设计把视觉思考放在 latent 层，而不是像素层。latent 不需要对人类天然可读，但它可以保留空间结构；当需要解释时，再通过 Sketch Decoder 渲染成草图。这样既避免了高成本图像生成，又能让模型拥有可插拔的视觉中间状态。

##### 方法机制

![Vision Head 与 Sketch Decoder 架构](https://github.com/hwanyu112/Latent-Sketchpad/raw/main/asset/task_visualization.png)
*图：Latent Sketchpad 在 MazePlanning 中生成逐步草图，展示模型对路径状态的中间视觉表示。*

给定输入图像 \(X_0\)，视觉编码器先得到 visual latents：

$$l_{X_0}=G(X_0)\in\mathbb{R}^{n_v\times d_v}$$

连接器 \(C(\cdot)\) 将其投影到 LLM embedding 空间：

$$h_{X_0}=C(l_{X_0})$$

Latent Sketchpad 在原有文本 token 流中插入特殊标记，例如 `<start_of_image>` 与 `<end_of_image>`。当模型生成到视觉片段时，Context-Aware Vision Head 负责预测视觉 latent，而不是普通词表 token。它同时利用两类上下文：

- **Global context**：历史图像或历史草图 latent，提供长程视觉记忆
- **Local context**：当前正在生成的草图 latent，保证同一张草图内部连贯

可抽象为：

$$\hat{l}_{t}=H_\phi(h_t,\;l_{<t}^{global},\;l_{<t}^{local})$$

其中 \(H_\phi\) 是 Vision Head，\(h_t\) 是 MLLM 当前隐藏状态。训练时用视觉编码器得到的目标 latent \(l_t\) 监督：

$$\mathcal{L}_{vision}=\sum_t d(\hat{l}_t,l_t)$$

距离 \(d(\cdot)\) 可使用 cosine、L1 或 MSE。关键是主干 MLLM 冻结，只训练 Vision Head，降低对原模型语言/视觉理解能力的扰动。

##### 推理流程伪代码

```python
# Latent Sketchpad 推理伪代码
def latent_sketchpad_reason(model, vision_head, sketch_decoder, image, question):
    visual_latents = vision_encoder(image)
    context = connector(visual_latents) + tokenize(question)
    generated = []
    sketch_latents = []

    while not stop(generated):
        token = model.next_token(context + generated)

        if token == "<start_of_image>":
            current_sketch = []
            for i in range(NUM_VISUAL_TOKENS):
                h_i = model.hidden_state(context + generated + current_sketch)
                z_i = vision_head(
                    hidden_state=h_i,
                    global_visual_memory=sketch_latents,
                    local_visual_context=current_sketch,
                )
                current_sketch.append(z_i)

            sketch_latents.append(current_sketch)
            generated.append("<visual_latents>")
        else:
            generated.append(token)

    sketches = [sketch_decoder.decode(z) for z in sketch_latents]
    return parse_answer(generated), sketches
```

##### Sketch Decoder

Sketch Decoder 解决“latent 有用但人看不懂”的问题。它使用 AlignerNet 将 ViT/SigLIP/CLIP 等视觉特征映射到冻结 VAE 的 latent 空间，再由 VAE decoder 输出草图风格图像。训练目标结合像素重建、VAE latent 分布对齐和 patch embedding 对齐：

$$\mathcal{L}_{decoder}=\mathcal{L}_{focal}+\mathcal{L}_{nll}+\mathcal{L}_{mse}$$

其中 \(\mathcal{L}_{focal}\) 更强调前景笔画区域，\(\mathcal{L}_{nll}\) 对齐 VAE posterior，\(\mathcal{L}_{mse}\) 保持视觉 patch 语义一致。论文用 Quick, Draw! 草图数据预训练 decoder，因此输出更像结构化草图而非真实照片。

> 💡 关键：Sketch Decoder 不参与最终答案生成，它是解释器；模型真正用于推理的是连续视觉 latent。

##### 训练与评估

训练通常分两层：先让 MLLM 在 MazePlanning 上学习 interleaved reasoning 格式，再训练 Vision Head 对齐视觉 latent。MazePlanning 任务要求模型根据迷宫当前状态规划动作序列，输出被 `<actions>` 标签包裹的路径。评估指标包括 Success Rate（完整动作序列正确）和 Progress Rate（首次错误前连续正确动作比例）。

与文本 CoT 相比，Latent Sketchpad 的优势在于可以持续维护“当前路径/状态”的视觉记忆；与外部工具相比，它不需要每一步调用检测器、分割器或绘图程序；与像素级图像生成相比，它只在潜空间中补充推理状态，视觉输出只是可选解释。

##### 与传统方法的区别

| 方法 | 中间推理形态 | 是否依赖外部工具 | 是否直接生成像素 | 主要优势 |
|---|---|---|---|---|
| Text CoT | 文本 rationale | 否 | 否 | 简单、通用 |
| MVoT / Visual Sketchpad | 图像或绘图结果 | 常需要 | 是 | 人类可读、空间直观 |
| Latent Sketchpad | 连续视觉 latent | 否 | 否，解释时才解码 | 轻量、可插拔、保留视觉结构 |

#### 🧪 练习题
```yaml
question: "Latent Sketchpad 为什么选择在视觉 latent 空间生成中间草图，而不是直接生成像素图？"
options:
  - "因为 latent 空间可以复用预训练视觉特征，成本更低且更贴近推理所需的结构信息"
  - "因为像素图无法被 Sketch Decoder 读取"
  - "因为模型只能输出固定长度的文本 token"
  - "因为 MazePlanning 不包含任何视觉输入"
answer: 0
explain: "Latent Sketchpad 的核心是把预训练 MLLM 的视觉特征重新用于生成式视觉思考，推理时使用连续 latent，只有解释时才解码成草图。"
```

### Visual Thoughts

```yaml
id: visual_thoughts
num: 18
name: Visual Thoughts
full_name: '视觉思维统一视角 (Visual Thoughts: Unified Perspective)'
year: '2026'
org: Tsinghua
parent: mvot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/8a57d66b8e0cc468dbb6574114f60f0c-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 统一视觉思维框架，整合多种操作
```

#### 📝 一句话总结
Visual Thoughts 提出一个统一解释框架：多模态 CoT 的收益并不来自“文本 CoT”或“图像 CoT”的形式本身，而来自推理链中显式承载视觉信息的 visual thoughts；其效果取决于视觉信息表达的清晰度、简洁度和与任务的相关性。

#### 🎯 核心要点
- **统一视角**：将 Textual-MCoT 与 Interleaved-MCoT 统一解释为 visual thoughts 在不同模态中的表达
- **视觉缓存假设**：visual thoughts 像任务相关视觉信息的 cache，避免后续推理反复从原始图像中检索所有细节
- **四类表达形式**：Natural Language、Structured Language、Edited Image、Generative Image
- **有效性验证**：去除 visual thoughts 会显著降低推理性能，甚至可能比只看问题更差
- **场景差异**：图像形式在复杂视觉信息传递上更强，文本形式在简单任务或结构化表达清晰时更高效
- **内部机制分析**：visual thoughts 作为输入图像与深层 transformer reasoning 之间的中介，促进视觉信息向更深层流动

#### 🔬 深入细节
##### 核心示意图

![Textual-MCoT 与 Interleaved-MCoT 对比](https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x1.png)
*图：Visual Thoughts 将纯文本 rationale 和图文交错 rationale 都视为 visual thoughts 的不同表达。*

##### 动机与背景

多模态 CoT 领域长期存在一个争论：复杂视觉推理到底应该用文本中间步骤，还是应该生成/编辑中间图像？Textual-MCoT 使用图像描述、场景图或自然语言 rationale；Interleaved-MCoT 则在推理链中插入生成图、编辑图或工具处理图。两者在不同任务上各有优势，但缺少统一解释。

Visual Thoughts 的观点是：形式不是根因，真正起作用的是推理链中是否创建了任务相关的视觉中间表示。这个表示可以是文本，也可以是图像；它的作用是把原图中与问题相关的内容抽取出来，让后续 reasoning 不必每一步都重新访问完整原图。

论文把原始图像类比为外部存储，把 visual thoughts 类比为 cache。外部存储信息完整但访问成本高，cache 信息更少但与当前任务高度相关，能支撑更深、更快的推理。

![Visual Thoughts 缓存机制](https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x2.png)
*图：没有 visual thoughts 时，模型需要反复从原图提取信息；有 visual thoughts 时，推理步骤可直接读取任务相关视觉缓存。*

##### 形式化定义

给定输入图像 \(I\)、问题 \(q\)、已有推理步骤 \(s_{<t}\)，visual thought \(v_t\) 是一个显式传递视觉信息的中间步骤：

$$v_t \sim p_\theta(v_t \mid I, q, s_{<t}, e)$$

其中 \(e\) 表示要求采用的表达形式，例如自然语言描述、结构化场景图、图像编辑结果或生成图。随后模型基于 visual thought 生成派生推理步骤：

$$s_t \sim p_\theta(s_t \mid q, s_{<t}, v_{\le t})$$

这一定义把“描述图片”“生成辅助图”“标注区域”“绘制几何图”都纳入同一个框架：它们都是把原始视觉输入转化为更适合当前推理的中间表达。

##### 四类 Visual Thought

![四类 Visual Thoughts](https://ar5iv.labs.arxiv.org/html/2505.15510/assets/x3.png)
*图：Visual Thoughts 分为文本表达的 N-LANG/S-LANG 和视觉表达的 E-IMG/G-IMG。*

**1. Natural Language (N-LANG)**  
模型先生成与问题相关的自然语言图像描述，再进行推理。例如先描述“左侧有两个苹果，右侧有三个苹果”，再计算总数。优点是实现简单、兼容所有 LVLM；缺点是可能漏掉细粒度视觉细节。

**2. Structured Language (S-LANG)**  
模型输出场景图、JSON、表格或结构化属性列表，再用结构化信息推理。它比自然语言更清晰，适合几何、图表、实体关系等需要约束表达的任务。

**3. Edited Image (E-IMG)**  
通过检测、分割、深度估计、标注、裁剪等工具处理原图，把任务相关区域显式呈现给模型。例如在图上标出目标物体或几何辅助线。它保留图像模态优势，但需要额外工具。

**4. Generative Image (G-IMG)**  
模型调用图像生成器绘制辅助图，例如根据函数表达式生成曲线图，或把文字题转换为几何示意图。它适合原图缺失或需要构造新视觉状态的任务，但成本更高且生成错误会传播。

##### 核心流程伪代码

```python
# Visual Thoughts 统一推理伪代码
def visual_thought_reason(vlm, image, question, mode):
    thoughts = []

    if mode == "N-LANG":
        thoughts.append(vlm.caption(image, question))
    elif mode == "S-LANG":
        thoughts.append(vlm.scene_graph(image, question))
    elif mode == "E-IMG":
        thoughts.append(run_visual_tool(image, question))  # segmentation / grounding / depth
    elif mode == "G-IMG":
        thoughts.append(generate_auxiliary_image(question))

    rationale = vlm.reason(
        image=image,
        question=question,
        visual_thoughts=thoughts,
    )
    return vlm.answer(rationale)
```

##### 为什么 Visual Thoughts 有效

论文的实验设计包括“保留 visual thoughts”“清空 visual thoughts”“用文字替换图像形式 visual thoughts”等对照。结果显示，清空 visual thought cache 后性能下降明显，说明模型并非只靠原图和最终问题就能完成多步推理；visual thoughts 在推理链中确实承载了可复用的视觉信息。

更重要的是，visual thoughts 的表达质量影响效果。清晰、简洁、与问题相关的表达最有效；冗长或含糊的描述会增加噪声；图像形式表达在复杂视觉关系上更强，但如果需要调用外部工具或生成模型，错误也会随链路传播。

论文还用 attention 与信息流分析解释内部机制：visual thoughts 让与任务相关的视觉信息更容易进入深层 transformer block，并成为后续 reasoning token 的主要条件之一。这比“每一步都重新看整张图”更接近显式工作记忆。

> 💡 关键：Visual Thoughts 不是一种单独算法，而是解释和设计多模态 CoT 的方法论；它告诉我们应该优化“视觉信息如何进入推理链”，而不是只争论文本链或图像链。

##### 与传统方法的区别

| 范式 | 中间步骤 | 典型问题 | Visual Thoughts 的解释 |
|---|---|---|---|
| Vanilla VLM | 直接回答 | 缺少显式视觉工作记忆 | 没有 visual thought cache |
| Textual-MCoT | 文本描述/场景图 | 细节可能被语言压缩 | 文本形态的 visual thoughts |
| Interleaved-MCoT | 图像编辑/生成 | 成本高、依赖工具 | 图像形态的 visual thoughts |
| Visual Thoughts | 任意清晰视觉中间表达 | 需要选择合适表达 | 按任务匹配 cache 形式 |

#### 🧪 练习题
```yaml
question: "Visual Thoughts 论文认为多模态 CoT 提升性能的核心原因是什么？"
options:
  - "模型输出越长，准确率一定越高"
  - "推理链中存在能承载任务相关视觉信息的中间表达，作为后续推理的缓存"
  - "所有任务都必须生成中间图像，文本 CoT 没有作用"
  - "只要调用外部视觉工具，就能避免所有幻觉"
answer: 1
explain: "论文把 visual thoughts 视为任务相关视觉信息的 cache；它可以是文本也可以是图像，关键在于清晰、简洁地把视觉信息传给后续推理。"
```

### COVT

```yaml
id: covt
num: 19
name: COVT
full_name: 连续视觉思维链 (Chain-of-Visual-Thought)
year: '2025'
org: SJTU
parent: visual_thoughts
paper_url: https://arxiv.org/abs/2501.covt
project_url: ''
category: frontier_2026
motivation: 连续视觉Token推理，无需外部工具
```

#### 📝 一句话总结
COVT 将视觉语言模型的中间推理从离散文本空间扩展到连续视觉 token 空间，让模型在 `<think>` 中生成少量承载分割、深度、边缘和语义特征的 visual thought tokens，从而在无需外部工具的情况下提升细粒度感知和空间推理。

#### 🎯 核心要点
- **连续视觉 token 推理**：在语言 token 之外插入连续 latent visual tokens，使 VLM 能直接在视觉空间中思考
- **约 20 个 visual thought tokens**：用小预算 token 表达密集视觉线索，兼顾效率和感知保真度
- **多专家蒸馏**：从 SAM、DepthAnything、PIDINet、DINO 等轻量视觉专家中对齐分割、深度、边缘和语义特征
- **四阶段训练管线**：comprehension → generation → reasoning → efficient reasoning，逐步让模型理解、生成并使用视觉思维 token
- **可解释解码**：推理时可只使用 latent；需要解释时可把 visual tokens 解码为 mask、depth、edge 等密集预测
- **广泛基准提升**：在 CV-Bench、MMVP、RealWorldQA、MMStar、WorldMedQA、HRBench 等十余个感知/推理基准上带来 3% 到 16% 增益

#### 🔬 深入细节
##### 核心示意图

![COVT teaser](https://github.com/Wakals/CoVT/raw/main/assets/teaser.png)
*图：COVT 在文本推理链中插入连续视觉 token，使 VLM 不再只能把视觉信息翻译成离散语言。*

##### 动机与背景

标准 VLM 把图像编码成视觉 embedding，再通过投影层送入语言模型。后续推理基本在离散语言空间中展开，这对数学、逻辑和知识推理很有效，但对边界、深度、布局、相对位置等连续视觉信息非常低效。模型必须先把高维视觉关系说成文字，再用文字推理，形成明显的信息瓶颈。

工具增强方法可以调用检测、分割或深度估计模型，但这种方式把感知能力委托给外部模块，成本高，且最终效果受工具能力限制。生成或裁剪中间图像也仍然需要重新投影回文本空间，细粒度信息依然容易丢失。

COVT 的目标是让 VLM 在内部直接拥有“视觉思维链”：模型可以在生成 rationale 时输出少量连续视觉 token，这些 token 不是词表符号，而是携带视觉专家知识的 latent 表征。

##### CoVT Token 设计

![COVT pipeline](https://github.com/Wakals/CoVT/raw/main/assets/pipeline.png)
*图：COVT visual tokens 可对齐分割、深度、边缘、DINO 特征等视觉专家，也可按需解码为可视化结果。*

COVT 把输出序列从纯文本扩展为混合序列：

$$y_t \in \mathcal{V}_{text} \cup \mathbb{R}^{d_v}$$

其中 \(\mathcal{V}_{text}\) 是离散文本词表，\(\mathbb{R}^{d_v}\) 是连续视觉 token 空间。生成时，模型在 `<think>` 内既可以输出文本 token，也可以输出视觉 token：

$$p_\theta(y_t \mid x, y_{<t})$$

当 \(y_t\) 是文本 token 时使用常规交叉熵；当 \(y_t\) 是视觉 token 时，用 projection layer 输出连续向量，并通过专家监督对齐。

论文中典型 token 分配为：

- SAM mask prompts：8 个 visual tokens，用于分割/实例定位
- DepthAnything：4 个 visual tokens，用于深度结构
- PIDINet：4 个 visual tokens，用于边缘结构
- DINO：4 个 visual tokens，用于 patch-level 语义特征

这组约 20 个 tokens 不是要重建完整图像，而是把最关键的感知线索压缩进推理链。

##### 训练目标

COVT 的损失由语言建模和视觉对齐两部分组成：

$$\mathcal{L}=\mathcal{L}_{text}+\lambda_{seg}\mathcal{L}_{seg}+\lambda_{depth}\mathcal{L}_{depth}+\lambda_{edge}\mathcal{L}_{edge}+\lambda_{dino}\mathcal{L}_{dino}$$

其中：

- \(\mathcal{L}_{text}\)：普通 next-token prediction，保持 VLM 的回答能力
- \(\mathcal{L}_{seg}\)：让视觉 token 作为 prompt 重建 SAM 风格 mask
- \(\mathcal{L}_{depth}\)：对齐深度图或深度排序线索
- \(\mathcal{L}_{edge}\)：对齐边缘结构
- \(\mathcal{L}_{dino}\)：匹配 DINO patch 特征，保留语义与局部对应关系

> 💡 关键：视觉专家只用于训练监督；推理阶段 COVT 不需要再调用这些专家，因此它是 self-contained 的视觉推理框架。

##### 四阶段训练流程

```python
# COVT 训练流程伪代码
def train_covt(vlm, data):
    # Stage 1: comprehension
    # 让模型理解带视觉 token 标记的输入/输出格式
    train_text_reasoning_format(vlm, data.caption_and_qa)

    # Stage 2: generation
    # 学会在推理链中生成连续 visual thought tokens
    for batch in data.visual_alignment:
        z = vlm.generate_visual_tokens(batch.image, batch.question)
        loss = align_to_experts(
            z,
            sam_mask=batch.sam_mask,
            depth=batch.depth_map,
            edge=batch.edge_map,
            dino=batch.dino_features,
        )
        update(vlm, loss)

    # Stage 3: reasoning
    # 用带视觉 token 的 CoT 训练最终回答
    train_multimodal_reasoning(vlm, data.reasoning)

    # Stage 4: efficient reasoning
    # 压缩 visual token 数量，只保留能带来收益的视觉思维预算
    train_with_token_budget(vlm, max_visual_tokens=20)
```

##### 推理流程

推理时，COVT 输入图像和问题，先在 `<think>` 中生成文本 reasoning 与 visual thought tokens。最终答案仍以文本输出：

```python
def covt_inference(model, image, question, visualize=False):
    response, visual_tokens = model.generate_interleaved_thoughts(
        image=image,
        question=question,
        format="<think> ... visual_tokens ... </think><answer> ... </answer>",
    )

    if visualize:
        dense_maps = decode_visual_tokens(visual_tokens)
        return extract_answer(response), dense_maps

    return extract_answer(response)
```

如果用户需要解释，visual tokens 可以解码成 segmentation mask、depth map 或 edge map；如果只追求效率，则不解码，模型直接使用 latent token 完成推理。

##### 与传统方法的区别

| 方法 | 推理空间 | 工具依赖 | 密集视觉信息 | 主要限制 |
|---|---|---|---|---|
| Text CoT | 离散文本 | 否 | 弱 | 视觉细节被语言压缩 |
| Tool-augmented VLM | 文本 + 外部输出 | 是 | 强 | 成本高、受工具上限限制 |
| Visual image CoT | 图像/文本交错 | 可能需要 | 中到强 | 生成或重编码成本高 |
| COVT | 文本 + 连续视觉 token | 否 | 强 | 需要训练视觉 token 对齐 |

COVT 的创新点在于把“工具”内化为连续 visual thought tokens。它不是调用 SAM 或 DepthAnything 来回答问题，而是用这些专家训练一个可被 VLM 自回归生成和消费的视觉思维空间。

#### 🧪 练习题
```yaml
question: "COVT 中连续 visual thought tokens 的主要作用是什么？"
options:
  - "替代所有文本 token，使模型只输出图像"
  - "在推理链中编码分割、深度、边缘等细粒度视觉线索，减少纯文本推理的信息瓶颈"
  - "把输入图像压缩成更小的 JPEG 文件"
  - "在推理阶段调用 SAM、DepthAnything 等外部工具"
answer: 1
explain: "COVT 的 visual tokens 是可由模型内部生成和消费的连续 latent，训练时对齐视觉专家，推理时无需外部工具即可保留密集视觉信息。"
```

### Zebra-CoT

```yaml
id: zebra_cot
num: 20
name: Zebra-CoT
full_name: 交错视觉语言推理数据集 (Zebra Chain-of-Thought Dataset)
year: '2025'
org: Meta
parent: visual_thoughts
paper_url: https://arxiv.org/abs/2507.16746
project_url: ''
category: frontier_2026
motivation: 交错视觉语言推理数据，训练基础
```

#### 📝 一句话总结
Zebra-CoT 构建了一个包含 182,384 条图文交错 reasoning trace 的大规模 Visual CoT 数据集，覆盖科学、2D/3D 视觉推理和策略游戏等 18 个领域，用高质量中间图像-文本链解决视觉 CoT 缺少训练数据的问题。

#### 🎯 核心要点
- **大规模 interleaved Visual CoT 数据**：182,384 条逻辑连贯的文本-图像交错推理轨迹
- **覆盖 18 个领域、50+ 任务**：科学推理、2D 视觉推理、3D 视觉推理、视觉逻辑与策略游戏
- **四大任务族**：Scientific Reasoning、2D Visual Reasoning、3D Visual Reasoning、Visual Logic & Strategic Games
- **面向原生视觉 CoT 训练**：训练模型在推理过程中生成中间图像，而不是只输出文本解释
- **Anole-7B 与 Bagel-7B 微调验证**：Anole-7B 在测试集提升约 +12%，标准 VLM benchmark 最高提升约 +13%
- **开放数据与模型**：发布 Hugging Face 数据集和 Bagel-Zebra-CoT 模型，支持后续 visual reasoning 研究

#### 🔬 深入细节
##### 核心示意图

![Zebra-CoT 数据组成](https://github.com/multimodal-reasoning-lab/Bagel-Zebra-CoT/raw/main/assets/zebra_cot_datacard.png)
*图：Zebra-CoT 数据集覆盖科学、2D、3D、视觉逻辑与策略游戏四大类任务。*

##### 动机与背景

Visual CoT 的目标是让模型像人一样在解决复杂问题时画图、标注、移动物体或构造中间视觉状态。但训练这类模型有两个现实困难：第一，现成模型的 visual CoT 能力较弱，用它们做强化学习冷启动很不稳定；第二，高质量图文交错推理数据稀缺，尤其缺少“中间图像确实服务于推理”的样本。

Zebra-CoT 的定位不是提出一个新模型结构，而是补齐训练基础设施。它把任务设计成天然需要视觉辅助的形式，让每个样本包含问题图像、文本思考步骤、中间视觉结果和最终答案，训练模型学会何时生成视觉中间状态以及如何让它推动后续推理。

##### 示例与数据形态

![Bagel-Zebra-CoT 推理示例](https://github.com/multimodal-reasoning-lab/Bagel-Zebra-CoT/raw/main/assets/bagel-cot-example.png)
*图：模型先删除圆柱体、再加入红色球体，逐步生成中间图像并给出答案。*

一个 Zebra-CoT 样本可以抽象为：

$$D_i=(x_0,\;q,\;(t_1,x_1),(t_2,x_2),...,\;a)$$

其中 \(x_0\) 是初始图像，\(q\) 是问题，\(t_k\) 是第 \(k\) 步文本 rationale，\(x_k\) 是对应中间图像，\(a\) 是最终答案。与普通 CoT 数据相比，Zebra-CoT 的关键在于 \(x_k\) 不是装饰图，而是会改变或显式呈现推理状态。

例如在 2D 物体操作任务中，文本步骤“Remove all cylinders”对应一张已删除圆柱体的中间图；下一步“Add 1 red sphere”对应再加入红球的图。最终答案依赖这些视觉状态的逐步更新。

##### 数据构建流程

```python
# Zebra-CoT 数据构建伪代码
def build_zebra_cot(task_spec):
    initial_state = sample_problem_state(task_spec)
    question, answer_plan = create_question_and_plan(initial_state, task_spec)

    trace = []
    state = initial_state
    for step in answer_plan:
        text_thought = render_text_rationale(step, state)
        state = apply_visual_operation(state, step)
        reasoning_image = render_state_as_image(state)
        trace.append((text_thought, reasoning_image))

    final_answer = compute_answer(state, question)

    if verify_trace_consistency(initial_state, question, trace, final_answer):
        return {
            "image": initial_state.image,
            "question": question,
            "interleaved_trace": trace,
            "answer": final_answer,
        }
```

实际构建中，不同任务族使用不同生成器或验证器。例如几何、物理、图算法等科学任务强调符号约束和图形一致性；视觉搜索、拼图、关系推理强调图像状态变化；3D embodied/robot planning 强调空间与动作链；棋类、Connect Four、Tetris、RPM 等强调规则推演。

##### 任务覆盖

Zebra-CoT 特别选择“画图有价值”的任务，而不是任意 VQA：

- **Scientific Reasoning**：几何、物理、化学、图算法、竞赛编程等，需要公式、图形或状态转移辅助推理
- **2D Visual Reasoning**：视觉搜索、jigsaw puzzle、文本/文档搜索、关系推理、通用 VQA
- **3D Visual Reasoning**：具身 CoT、多跳物体计数、机器人规划
- **Visual Logic & Strategic Games**：ARC-AGI、Chess、Checkers、Maze、RPM、Tetris、Connect Four、Ciphers 等

这种任务分布让模型不仅学习“描述图像”，还学习“通过生成/修改图像推进推理”。

##### 训练与目标函数

微调 interleaved 模型时，可以把文本 token 与图像 token 放在同一序列中做自回归建模：

$$\mathcal{L}=-\sum_t \log p_\theta(y_t \mid y_{<t}, x_0, q)$$

其中 \(y_t\) 可能是文本 token，也可能是图像 tokenizer 的离散 image token。模型因此同时学习：

- 在什么位置生成 `<think>` 文本；
- 在什么位置生成中间图像；
- 中间图像如何反映上一步操作；
- 最终 `<answer>` 如何读取视觉状态并给出结果。

对于 Bagel/Anole 这类 any-to-any 模型，Zebra-CoT 可以直接作为 interleaved sequence 训练数据。对于只支持文本输出的 VLM，则可把中间图像转成描述或引用，但会损失 Zebra-CoT 的核心优势。

##### 与传统 CoT 数据的区别

| 数据类型 | 中间步骤 | 是否改变视觉状态 | 适合训练的能力 |
|---|---|---|---|
| 文本 CoT | 文本 rationale | 否 | 语言推理、解释 |
| Visual CoT caption 数据 | 图像描述 + 文本 | 通常否 | 视觉信息提取 |
| Zebra-CoT | 文本 + 中间图像 | 是 | 原生图文交错推理、视觉状态更新 |

> 💡 关键：Zebra-CoT 的价值在于让模型看到“中间图像如何服务于下一步推理”，这比只给最终答案或只给文本解释更接近 visual thinking 的训练信号。

##### 效果与意义

论文用 Anole-7B 和 Bagel-7B 验证数据集效果。Anole-7B 微调后在 Zebra-CoT 测试集上提升约 +12%，在标准 VLM benchmark 上最高带来约 +13% 的增益；Bagel-7B 则能生成更自然的图文交错视觉推理链。

这说明 Zebra-CoT 不只是 benchmark，也能作为训练集提升模型的 multimodal reasoning 能力。它对后续 Visual Thoughts、COVT、Latent Sketchpad 等路线的意义在于：提供了可监督的图文交错推理轨迹，让模型先学会“何时需要视觉中间态”，再进一步用 RL 或 latent token 方法优化。

#### 🧪 练习题
```yaml
question: "Zebra-CoT 相比普通文本 CoT 数据集的核心区别是什么？"
options:
  - "只包含最终答案，不包含任何推理过程"
  - "包含逻辑连贯的文本-图像交错推理轨迹，中间图像会显式推进视觉状态"
  - "只用于 OCR 识别，不涉及复杂推理"
  - "要求模型在推理阶段调用固定外部检测器"
answer: 1
explain: "Zebra-CoT 的每条样本包含 interleaved text-image trace，中间图像是推理状态的一部分，用于训练模型原生执行 Visual CoT。"
```

### Reason-RFT

```yaml
id: reason_rft
num: 21
name: Reason-RFT
full_name: 视觉推理强化微调 (Reinforcement Fine-Tuning for Visual Reasoning)
year: '2026'
org: NTU
parent: llava_cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/08d70284b013c03ba89cd2b642bc864b-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: GRPO强化微调，提升推理泛化能力
```

#### 📝 一句话总结
Reason-RFT 提出两阶段视觉推理强化微调框架，先用少量高质量 CoT SFT 激活 VLM 的推理格式和任务先验，再用 GRPO 与任务可验证奖励提升跨域泛化、数据效率和复杂视觉推理能力。

#### 🎯 核心要点
- **两阶段训练**：Stage 1 用 CoT SFT 做 reasoning activation；Stage 2 用 GRPO 做 RL-based reasoning enhancement
- **面向视觉推理的 GRPO**：不训练单独 value model，而用组内 reward 归一化计算相对优势，降低 RL 微调成本
- **结构化输出奖励**：要求 `<think>...</think>` 包裹推理过程、`<answer>...</answer>` 包裹最终答案
- **三类 accuracy reward**：离散值匹配、数学数值容差匹配、函数序列分步匹配
- **系统化评测任务**：重构视觉计数、结构感知、空间变换三类视觉推理数据，并设计 ID/OOD 域移评测
- **数据效率优势**：少量 CoT 激活 + RL 探索可在少样本设置下接近或超过完整 SFT 基线

#### 🔬 深入细节
##### 核心示意图

![Reason-RFT pipeline](https://tanhuajie.github.io/ReasonRFT/images/pipeline.png)
*图：Reason-RFT 先进行 SFT-based activation，再用 GRPO 与格式/准确性奖励进行强化微调。*

##### 动机与背景

传统视觉推理增强主要依赖两类方法：神经符号程序或 CoT SFT。神经符号方法可解释，但依赖程序生成和模块组合，系统复杂；CoT SFT 更直接，但需要大量高质量推理标注，容易让模型记住训练分布中的固定解题模式，面对视角变化、物体外观变化或题型迁移时泛化不足。

Reason-RFT 的出发点是把 SFT 和 RL 的优势结合起来。SFT 用于冷启动，让模型知道“如何按结构化格式推理”；RL 用于探索，让模型不只模仿标注轨迹，而是根据答案正确性优化自己的推理策略。这样可以缓解纯 SFT 的 cognitive rigidity，也避免纯 RL 初期没有稳定推理格式的问题。

##### Stage 1：SFT-based Reasoning Activation

第一阶段使用带 CoT 的视觉推理数据训练模型生成推理步骤 \(r\) 与答案 \(a\)。给定图像 \(I\)、问题 \(q\)，训练目标是最大化：

$$\mathcal{L}_{SFT}=-\log p_\theta(r,a \mid I,q)$$

这一步不追求覆盖所有任务，只要求建立稳定先验：模型会分解问题、输出 `<think>` 和 `<answer>`，并能在视觉计数、几何结构、空间变换等任务中形成基本推理链。

> 💡 关键：Reason-RFT 不是用 SFT 解决全部问题，而是用 SFT 给 RL 一个可优化的起点。

##### Stage 2：GRPO-based Reasoning Enhancement

第二阶段对每个输入采样一组候选回答：

$$\{o_i\}_{i=1}^{G}\sim \pi_{\theta_{old}}(\cdot\mid I,q)$$

每个候选通过 reward function 得到分数 \(R_i\)。GRPO 不需要 value model，而是在组内计算相对优势：

$$\hat{A}_i=\frac{R_i-\mathrm{mean}(\{R_j\}_{j=1}^{G})}{\mathrm{std}(\{R_j\}_{j=1}^{G})}$$

再用 clipped policy objective 更新策略：

$$\mathcal{J}_{GRPO}=\frac{1}{G}\sum_{i=1}^{G}\frac{1}{|o_i|}\sum_t
\min\left(\rho_{i,t}\hat{A}_i,\mathrm{clip}(\rho_{i,t},1-\epsilon,1+\epsilon)\hat{A}_i\right)
-\beta D_{KL}(\pi_\theta||\pi_{ref})$$

其中 \(\rho_{i,t}\) 是新旧策略在 token \(t\) 上的概率比。KL 项限制模型不要偏离参考模型过远，clip 项避免单次更新过激。

##### Reward 设计

Reason-RFT 的 reward 由格式和准确性组成：

$$R=R_{format}+R_{acc}$$

**格式奖励**检查输出是否遵循：

```text
<think> reasoning process </think>
<answer> final answer </answer>
```

**准确性奖励**按任务类型区分：

- **Discrete-valued reward**：用于计数、选择题、离散结构感知，答案完全匹配得 1，否则 0
- **Mathematical reward**：用于角度、长度、数值或 LaTeX 表达，允许小容差并可给部分分
- **Function-based reward**：用于空间变换序列，按函数名、对象、参数分层匹配，完整匹配得高分，部分匹配得较低分

这种 reward 设计让同一个 GRPO 框架能覆盖不同视觉推理任务，而不必为每个任务训练独立奖励模型。

##### 训练流程伪代码

```python
# Reason-RFT 两阶段训练伪代码
def train_reason_rft(vlm, cot_data, rl_data):
    # Stage 1: reasoning activation
    for image, question, rationale, answer in cot_data:
        target = f"<think>{rationale}</think><answer>{answer}</answer>"
        loss = -vlm.log_prob(target, image=image, question=question)
        update(vlm, loss)

    policy = copy(vlm)
    reference = freeze(copy(vlm))

    # Stage 2: GRPO enhancement
    for image, question, ground_truth in rl_data:
        outputs = policy.sample_group(image, question, group_size=G)
        rewards = []

        for out in outputs:
            r_format = check_format(out)
            r_acc = task_specific_accuracy(out.answer, ground_truth)
            rewards.append(r_format + r_acc)

        advantages = normalize_within_group(rewards)
        loss = grpo_clipped_loss(policy, reference, outputs, advantages)
        update(policy, loss)

    return policy
```

##### 数据与评测

Reason-RFT 将视觉推理拆成三类核心能力：

- **Visual Counting**：基于 CLEVR-Math 构造训练和 ID 测试，并用 Super-CLEVR 资产构造 OOD 视角/外观分布
- **Structure Perception**：从 Geo170K、Math360K 等筛选几何、图表、结构关系题，并用 Geometry3K 测试域移
- **Spatial Transformation**：基于 TRANCE 生成初始/最终 3D 状态，要求预测变换函数序列，并用不同视角渲染评估泛化

实验对比了 ANS-SFT、CoT-SFT、Reason-RFT-Zero 和 Reason-RFT。结论是：纯 SFT 在 ID 上可有效，但 OOD 泛化弱；纯 RL 可探索更短或更灵活的链路，但冷启动不稳；SFT 激活后再 RL 的 Reason-RFT 在准确率、域移鲁棒性和少样本效率上更均衡。

##### 与传统方法的区别

| 方法 | 训练信号 | 优势 | 风险 |
|---|---|---|---|
| ANS-SFT | 只学最终答案 | 简单直接 | 缺少显式推理 |
| CoT-SFT | 模仿标注推理链 | 冷启动稳定 | 可能过拟合标注风格 |
| Reason-RFT-Zero | 直接 RL | 推理更自由 | 初期格式和探索不稳 |
| Reason-RFT | CoT SFT + GRPO | 兼顾稳定性与泛化 | 需要可验证 reward |

#### 🧪 练习题
```yaml
question: "Reason-RFT 为什么要先做 CoT SFT，再进行 GRPO 强化微调？"
options:
  - "因为 GRPO 只能训练文本模型，不能训练视觉语言模型"
  - "因为 SFT 用于激活结构化推理格式和任务先验，GRPO 再通过可验证奖励提升泛化"
  - "因为 SFT 会冻结所有参数，GRPO 只更新视觉编码器"
  - "因为格式奖励无法在强化学习中使用"
answer: 1
explain: "SFT 提供稳定冷启动，避免纯 RL 初期不会按格式推理；GRPO 则用组内相对优势和任务 reward 推动模型探索更泛化的推理策略。"
```

### VisionThink

```yaml
id: visionthink
num: 22
name: VisionThink
full_name: 智能高效视觉语言模型 (Smart and Efficient VLM via RL)
year: '2026'
org: CUHK
parent: reason_rft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/88be023075a5a3ff3dc3b5d26623fa22-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: RL+Token压缩，效率与性能平衡
```

#### 📝 一句话总结
VisionThink 提出一种样本级动态视觉 token 压缩范式：模型先用低分辨率图像回答，只有判断信息不足时才输出特殊 token 请求高分辨率图像，并通过 LLM-as-Judge、Multi-Turn GRPO 和 penalty 控制机制在准确率与推理效率之间取得平衡。

#### 🎯 核心要点
- **按样本动态分辨率**：先输入低分辨率图像以减少视觉 token，必要时再请求高分辨率图像
- **特殊 token / 工具调用机制**：模型通过指定格式发起 image resize 请求，进入第二轮高分辨率推理
- **LLM-as-Judge 奖励**：用外部 LLM 对开放式 VQA 答案做语义正确性判断，突破精确字符串匹配限制
- **Multi-Turn GRPO**：把 GRPO 扩展到多轮工具调用场景，对用户输入和工具返回 token 做 mask，只优化模型生成 token
- **Penalty 控制 resize 比例**：避免模型塌缩为“总是高分辨率”或“总是低分辨率”，使其学会何时值得付出额外视觉 token
- **与传统压缩方法兼容**：不同于固定剪枝比例，VisionThink 在样本级决定 token 预算，可与 FastV、SparseVLM 等空间剪枝方法互补

#### 🔬 深入细节
##### 核心示意图

![VisionThink 框架](https://raw.githubusercontent.com/dvlab-research/VisionThink/main/files/Framework.jpg)
*图：VisionThink 对简单样本直接用低分辨率回答，对 OCR/细节依赖样本请求高分辨率图像。*

##### 动机与背景

VLM 性能提升往往伴随视觉 token 数量增长。例如同一张高分辨率图像，在新一代模型中可能被切成数千个视觉 token。视觉 token 通常比问题文本长得多，因此序列长度和计算成本主要由图像决定。

论文的关键观察是：大多数通用 VQA 场景并不需要完整高分辨率信息，低分辨率甚至四分之一视觉 token 也能答对；但 ChartQA、OCRBench、DocVQA 等 OCR 或细粒度任务对高分辨率高度敏感。固定比例 token pruning 无法区分这两类样本，简单样本浪费计算，困难样本又可能丢失关键文字或细节。

VisionThink 因此把“视觉 token 压缩比例”变成模型策略的一部分：模型先看低分辨率，如果信息足够就直接答；如果不够，就主动请求原始高分辨率图像继续推理。

##### Multi-Turn 推理流程

推理有两条路径：

- **低分辨率路径**：低分辨率图像 + 问题 → `<think>` → `<answer>`
- **高分辨率路径**：低分辨率图像 + 问题 → 判断信息不足 → 输出 resize 调用 → 环境返回高分辨率图像 → 再推理并回答

```python
# VisionThink 推理伪代码
def visionthink_inference(model, image, question):
    low_image = resize(image, scale=0.5)
    prompt = build_prompt(low_image, question)

    first_response = model.generate(prompt)

    if requests_high_resolution(first_response):
        high_image = image
        tool_result = encode_tool_result(high_image)
        second_prompt = prompt + first_response + tool_result
        second_response = model.generate(second_prompt)
        return extract_answer(second_response)

    return extract_answer(first_response)
```

这个过程本质上是多轮交互：模型第一轮不只是回答，也可以选择是否购买更多视觉信息。选择高分辨率会增加 token 和时间成本，但可能提升 OCR/图表/文档题的正确率。

##### LLM-as-Judge 奖励

通用 VQA 的答案常有多种等价表达，规则匹配不够稳定。VisionThink 使用 LLM-as-Judge 判断模型答案 \(a\) 与标准答案 \(a^\*\) 是否语义一致：

$$R_{acc}(q,a,a^\*)\in\{0,1\}$$

判断只基于问题、预测答案和标准答案的文本，不重新看图像，以避免裁判模型视觉能力影响训练 reward。离散 0/1 奖励比连续分数更稳，减少裁判误判对策略更新的放大。

##### Multi-Turn GRPO

标准 GRPO 的组内优势为：

$$\hat{A}_i=\frac{R_i-\mathrm{mean}(\{R_j\})}{\mathrm{std}(\{R_j\})}$$

VisionThink 将其用于多轮输出。由于高分辨率图像 token 是工具/环境返回的内容，不是模型策略生成的 token，训练时需要 mask：

$$\mathcal{J}_{MT-GRPO}=
\mathbb{E}\left[\sum_{i,t}m_{i,t}
\min(\rho_{i,t}\hat{A}_i,\mathrm{clip}(\rho_{i,t},1-\epsilon,1+\epsilon)\hat{A}_i)
-\beta D_{KL}\right]$$

其中 \(m_{i,t}=1\) 表示模型生成 token，\(m_{i,t}=0\) 表示用户输入或工具返回 token。这样优化目标只奖励/惩罚模型可控制的行为，包括是否请求 resize、如何推理、如何回答。

##### Reward 与 Penalty

总 reward 包含三部分：

$$R=R_{acc}+R_{format}+R_{penalty}$$

- \(R_{acc}\)：LLM-as-Judge 判断答案正确性
- \(R_{format}\)：检查 `<think>`、`<answer>` 和 resize 调用 JSON 格式
- \(R_{penalty}\)：控制高分辨率请求比例，避免策略塌缩

Penalty 的难点是两种塌缩都可能发生：不惩罚 resize 时，模型倾向于总是请求高分辨率；过度惩罚 resize 时，模型会总是低分辨率直接猜。VisionThink 根据低分辨率和高分辨率的正确性统计设定阈值，动态决定该惩罚直接回答还是惩罚 resize。

> ⚠️ 注意：VisionThink 的目标不是最少 token，而是在“该省时省、该看清看清”的前提下最大化任务 reward。

##### 训练数据与评估

论文使用 Qwen2.5-VL-7B-Instruct 作为基座，先验证 LLM-as-Judge 能在通用 VQA 上支撑 RL，再训练高低分辨率决策能力。数据覆盖通用 VQA 与细粒度/OCR 任务，使模型同时见到“低分辨率足够”和“必须高分辨率”的样本。

评估包含 ChartQA、OCRBench、DocVQA、MME、MMVet、RealWorldQA、POPE、MathVista、MathVerse 等。相较 FastV、SparseVLM 等固定保留比例方法，VisionThink 在平均使用约一半视觉 token 的情况下保持或提升总体性能，并在 OCR 相关任务上避免固定剪枝造成的大幅退化。

##### 与传统视觉 token 压缩的区别

| 方法 | 决策粒度 | 是否需要固定阈值 | OCR 任务风险 | 与 vLLM/FlashAttention 兼容性 |
|---|---|---|---|---|
| FastV / SparseVLM | token/层级剪枝 | 是 | 可能误删关键 token | 剪枝逻辑增加复杂度 |
| 直接降采样 | 全样本固定 | 是 | 高 | 简单 |
| VisionThink | 样本级动态 | 否，由策略决定 | 低，必要时看高分辨率 | 主要改变输入轮次，工程上更直接 |

#### 🧪 练习题
```yaml
question: "VisionThink 中 penalty 控制机制的主要目的是什么？"
options:
  - "强制所有样本都使用最低分辨率"
  - "避免模型塌缩为总是请求高分辨率或总是直接低分辨率回答"
  - "替代 LLM-as-Judge 的准确性奖励"
  - "减少语言 token 的数量，与视觉 token 无关"
answer: 1
explain: "没有 penalty 时模型可能总是请求高分辨率；惩罚过强又会使模型不敢请求高分辨率。VisionThink 用阈值控制 resize 比例，在效率和性能之间平衡。"
```

### VL-Rethinker

```yaml
id: vl_rethinker
num: 23
name: VL-Rethinker
full_name: 视觉语言自反思 (VL Self-Reflection via RL)
year: '2026'
org: PKU
parent: reason_rft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/2c84844a559e4f962752570bff456ae4-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: RL激励自反思，提升复杂推理性能
```

#### 📝 一句话总结
VL-Rethinker 用强化学习直接激励 VLM 形成“先答、再反思、再修正”的慢思考能力，通过 Selective Sample Replay 缓解大模型 GRPO 的 vanishing advantages，并用 Forced Rethinking 显式训练自我检查步骤，在数学、科学和多学科视觉推理中提升复杂问题表现。

#### 🎯 核心要点
- **面向 VLM 的慢思考 RL**：不依赖蒸馏闭源模型，而用可验证奖励直接训练 Qwen2.5-VL 系列
- **Vanishing Advantages 问题**：大模型训练快速饱和，组内样本 reward 变得相同，导致 GRPO 有效梯度减少
- **Selective Sample Replay (SSR)**：从候选样本中优先重放有非零/高优势的 informative queries，提高训练信号密度
- **Forced Rethinking**：在初始 rollout 后追加反思触发语，强制模型生成 self-reflection 步骤
- **ViRL39K 数据集**：约 39K 可验证多模态问答，覆盖 STEM、图表、文档、空间关系和社会科学等
- **SOTA 结果**：VL-Rethinker-72B 在 MathVista、MathVerse、MathVision、MMMU-Pro、EMMA、MEGA-Bench 等基准上推进开源模型表现

#### 🔬 深入细节
##### 核心示意图

![VL-Rethinker overview](https://tiger-ai-lab.github.io/VL-Rethinker/static/images/overview.png)
*图：VL-Rethinker 由 Selective Sample Replay 和 Forced Rethinking 两个关键训练组件组成。*

##### 动机与背景

GPT-o1、DeepSeek-R1 等慢思考模型证明了显式反思能提升复杂数学和代码问题表现，但视觉语言模型的慢思考能力并未同步提升。很多 VLM 即使用长 CoT，也容易把第一轮错误视觉理解一路推到最终答案，缺少“我刚才看错了吗”的自我检查。

VL-Rethinker 的目标是用 RL 直接诱导 VLM 的 self-reflection，而不是从强模型蒸馏反思文本。它先发现标准 GRPO 在 72B 级 VLM 上存在严重训练信号稀释：模型很快对大量样本全答对或全答错，组内 reward 方差趋近 0，相对优势消失，更新效率下降。

##### Vanishing Advantages

GRPO 依赖组内 reward 差异计算优势：

$$\hat{A}_i=\frac{R_i-\mu_R}{\sigma_R}$$

如果一个 query 的 \(G\) 个采样回答全部正确或全部错误，则 \(\sigma_R\) 很小或为 0，这个 query 几乎不提供有效策略梯度。随着大模型能力增强，这类“全对/全错”的 query 比例上升，有效 query 比例下降。

![Vanishing advantages](https://tiger-ai-lab.github.io/VL-Rethinker/static/images/vanishing_adv.png)
*图：随着训练推进，72B 模型中有效 query 比例下降，说明标准 GRPO 的训练信号逐渐稀疏。*

##### Selective Sample Replay

SSR 从 active learning 角度处理这个问题：训练应该更多关注“接近能力边界”的样本，也就是模型有时答对、有时答错、组内优势不为 0 的样本。它将这些样本放入 replay buffer，并按优势强度采样重放。

```python
# Selective Sample Replay 伪代码
def selective_sample_replay(candidates, replay_size, alpha=1.0):
    # candidates: rollouts grouped by query, each query has rewards and advantages
    effective = []
    for query_group in candidates:
        if has_nonzero_advantage(query_group):
            effective.append(query_group)

    weights = normalize([advantage_strength(q) ** alpha for q in effective])
    replay_batch = sample(effective, size=replay_size, p=weights)
    return replay_batch
```

与简单过滤不同，SSR 不是只丢弃无效样本，而是把 informative samples 重新分配到训练中，提高每个 batch 的有效优势密度。这样可以让大模型继续在边界样本上学习，而不是浪费计算在已经饱和的 query 上。

##### Forced Rethinking

SSR 提升了 RL 效率，但论文观察到仅用 SSR 得到的模型并不一定会自然生成反思或自验证步骤。为此，VL-Rethinker 引入 Forced Rethinking：在 RL 训练的初始 rollout 末尾追加一个反思触发语，引导模型检查自己的第一轮推理。

形式上，模型先生成初始回答：

$$o^{(1)}\sim \pi_\theta(\cdot\mid I,q)$$

训练环境再追加触发语 \(t_{rethink}\)，例如“Wait, does it seem right?”，要求模型继续生成：

$$o^{(2)}\sim \pi_\theta(\cdot\mid I,q,o^{(1)},t_{rethink})$$

最终 reward 根据反思后的答案计算。这样模型会学到：在复杂视觉推理中，先验答案可以被重新检查，必要时修正视觉理解或数学推导。

![Forced Rethinking 示例](https://tiger-ai-lab.github.io/VL-Rethinker/static/images/rethinking.png)
*图：Forced Rethinking 让模型显式复查初始推理，并在发现误读题意时自我修正。*

##### 训练流程伪代码

```python
# VL-Rethinker 训练伪代码
def train_vl_rethinker(policy, data):
    reference = freeze(copy(policy))
    replay_buffer = []

    for batch in data:
        rollouts = policy.sample_group(batch, group_size=G)
        rewards = rule_based_verify(rollouts, batch.answers)
        advantages = group_relative_advantages(rewards)

        replay_buffer.extend(select_informative(rollouts, advantages))
        replay = selective_sample_replay(replay_buffer, replay_size=B)

        rethinking_rollouts = []
        for item in replay:
            first = item.response
            prompt2 = item.prompt + first + "\nWait, does it seem right?"
            second = policy.generate(prompt2)
            rethinking_rollouts.append((first, second))

        final_rewards = verify_after_rethinking(rethinking_rollouts)
        loss = grpo_loss(policy, reference, rethinking_rollouts, final_rewards)
        update(policy, loss)
```

##### 数据与评估

VL-Rethinker 使用 ViRL39K 作为 RL 数据基础。它强调可验证性和覆盖面：数学、物理、化学、生物，图表/表格/文档推理，空间关系，多学科 STEM 和社会科学问题；同时带有模型能力标注，便于给不同规模模型选择合适难度样本。

模型在 Qwen2.5-VL-7B/72B 上训练，72B 版本在 MathVista、MathVerse、MathVision 等数学视觉推理基准上显著增强，也在 MMMU-Pro、EMMA、MEGA-Bench 等综合基准上缩小与强闭源模型差距。

##### 与 Reason-RFT 的关系

Reason-RFT 关注“如何用 SFT + GRPO 提升视觉推理泛化”；VL-Rethinker 更进一步关注“RL 训练出来的模型是否会反思”。它处理两个更细的问题：大模型 GRPO 的有效样本减少，以及模型虽然答得更强但缺少自我检查行为。

| 方法 | 核心训练信号 | 主要目标 |
|---|---|---|
| Reason-RFT | CoT SFT + 任务 reward | 泛化与数据效率 |
| VL-Rethinker | SSR + Forced Rethinking | 大模型 RL 稳定性与自反思 |
| Think or Not | Thought Dropout + GRPO | 动态决定是否需要推理 |

#### 🧪 练习题
```yaml
question: "VL-Rethinker 中 Selective Sample Replay 主要解决什么问题？"
options:
  - "视觉编码器无法读取高分辨率图片"
  - "标准 GRPO 中大量 query 组内 reward 相同，导致相对优势消失、有效训练信号变少"
  - "模型无法输出 JSON 格式"
  - "训练数据没有任何图像"
answer: 1
explain: "SSR 优先重放具有非零或高优势的样本，把训练集中到模型能力边界附近，从而缓解大模型训练中的 vanishing advantages。"
```

### Think or Not

```yaml
id: think_or_not
num: 24
name: Think or Not
full_name: 选择性推理 (Selective Reasoning via RL)
year: '2026'
org: Tsinghua
parent: reason_rft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/a168b27492ec2eb7aa184815fa0cd046-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: GRPO选择性推理，动态调整推理深度
```

#### 📝 一句话总结
Think or Not 提出 TON 两阶段训练策略，让 VLM 先通过 Thought Dropout 学会“空思考”格式，再用 GRPO 自主探索何时跳过推理、何时展开推理，在保持或提升准确率的同时显著减少输出长度和训练/推理成本。

#### 🎯 核心要点
- **选择性推理目标**：模型不是总要长 CoT，而是先决定当前样本是否值得显式推理
- **Thought Dropout**：SFT 阶段随机把 reasoning trace 替换为空 thought，给模型建立 no-think 冷启动格式
- **Reverse Thinking 数据构造**：给定问题、图像和答案，让基座模型反推简洁 reasoning trace，避免依赖闭源教师
- **GRPO 自探索**：RL 阶段不额外加入长度惩罚，让 outcome reward 自然选择 think 或 non-think
- **多任务验证**：在 CLEVR 计数、GeoQA 数学、AITZ 手机导航及 OOD 设置上评估
- **高效收益**：相比 vanilla GRPO，TON 可将 completion length 最高减少约 90%，同时准确率不降甚至提升

#### 🔬 深入细节
##### 核心示意图

![TON teaser](https://github.com/kokolerk/TON/raw/main/assets/teaser.png)
*图：简单题中 TON 跳过冗长思考直接回答，难题中仍保留完整推理链。*

##### 动机与背景

GRPO 等 RL 后训练方法常鼓励模型在回答前生成完整 reasoning trace，这在复杂任务上有效，但也会带来过度推理：简单计数、显然的图形问题或重复模板任务不需要长篇 `<think>`，长输出反而增加训练采样时间、推理延迟和错误暴露面。

论文的核心观察是：有些样本即使去掉整个 reasoning trace，答案仍然正确；而仅靠 prompt 让模型“简单题不要思考”并不可靠，模型会保守地继续输出完整推理。因此，“是否思考”不是推理能力的副产品，而是一种需要训练的格式和策略能力。

##### Stage 1：Thought Dropout

常规 SFT 数据形如：

```text
<think>reasoning trace</think><answer>answer</answer>
```

TON 随机把 `<think>` 中的内容替换为空白，例如只保留换行：

```python
def thought_dropout(thought, dropout_prob):
    if random.random() < dropout_prob:
        thought = "\n\n"
    return thought
```

训练后模型见过两类合法格式：

```text
<think>完整推理</think><answer>...</answer>
<think>

</think><answer>...</answer>
```

这一步的作用不是告诉模型具体哪些题该跳过，而是让“跳过思考”成为可生成的合法动作。真正的选择策略交给第二阶段 RL 学习。

##### Reverse Thinking：构造冷启动 thoughts

如果没有人工 CoT 标注，TON 使用 reverse thinking：给定图像 \(I\)、问题 \(q\) 和标准答案 \(a^\*\)，让基座模型生成解释“如何从输入得到答案”的简洁 thought：

$$r \sim \pi_{base}(r \mid I,q,a^\*)$$

这样可以低成本构造 SFT 所需的 reasoning trace，再对其执行 Thought Dropout。与调用闭源教师相比，这种方式更轻量，也让 thoughts 风格接近目标基座模型。

##### Stage 2：GRPO 选择 think / non-think

SFT 只提供格式能力，GRPO 学习决策。对同一图像问题采样 \(G\) 个候选输出，有的包含完整 thought，有的为空 thought。每个输出根据任务 reward 评分：

$$R=R_{format}+R_{outcome}$$

组内优势为：

$$\hat{A}_i=\frac{R_i-\mu_R}{\sigma_R}$$

如果某个简单样本在 non-think 模式下也能答对，它会得到与 think 模式相同或更稳定的 reward；随着训练推进，模型会提高空 thought 的概率，减少输出长度。对于困难样本，空 thought 更容易答错，完整推理样本获得更高优势，模型会保留推理。

```python
# TON 训练伪代码
def train_ton(model, sft_data, rl_data, dropout_prob=0.5):
    # Stage 1: SFT with thought dropout
    for image, question, thought, answer in sft_data:
        thought = thought_dropout(thought, dropout_prob)
        target = f"<think>{thought}</think><answer>{answer}</answer>"
        update(model, sft_loss(model, image, question, target))

    # Stage 2: GRPO
    reference = freeze(copy(model))
    for image, question, answer in rl_data:
        outputs = model.sample_group(image, question, group_size=G)
        rewards = [
            format_reward(o) + outcome_reward(o.answer, answer)
            for o in outputs
        ]
        advantages = normalize_within_group(rewards)
        update(model, grpo_loss(model, reference, outputs, advantages))

    return model
```

##### Reward 设计

TON 的 reward 不需要显式惩罚长度。它主要使用：

- **Format reward**：输出是否包含合法 `<think>` 和 `<answer>` 标签，空 thought 也是合法格式
- **Discrete matching**：计数、分类、数学数值题要求预测答案匹配 ground truth
- **Continuous matching**：AITZ 等 UI 导航任务对坐标或点击位置设置容差区域，既评估 action type，也评估 exact click

这种设计的重点是给 non-think 留出空间，而不是强制短输出。模型如果空 thought 答错，reward 会自然低；如果空 thought 答对，就会逐步学会跳过。

##### 实验设置

TON 在三类任务上验证：

- **CLEVR / Super-CLEVR**：3D 物体计数，包含 OOD 计数测试
- **GeoQA**：中学几何数学题，推理难度较高
- **AITZ**：移动端 GUI 导航，输出结构化 action 和坐标，包含 Web shopping、Google apps、Install 等 OOD 域

基座使用 Qwen2.5-VL-Instruct-3B/7B。论文发现 TON 在简单或中等任务上能显著提升 skip-thought ratio，输出长度随训练下降；在难题上仍会保留推理链，说明它学到的是样本级自适应，而不是简单截断。

##### 与传统 GRPO 的区别

| 方法 | SFT 格式 | RL 行为空间 | 输出长度 |
|---|---|---|---|
| Vanilla GRPO | 总是完整 `<think>` | 主要探索不同推理内容 | 容易持续变长 |
| 长度惩罚 RL | 完整 `<think>` + 短输出偏好 | 被外部惩罚压短 | 可能压坏难题推理 |
| TON | 完整 thought 与空 thought 都合法 | 同时探索 think / non-think | 简单题短，难题长 |

> 💡 关键：TON 把“是否思考”显式纳入动作空间，而不是事后压缩已经生成的推理链。

#### 🧪 练习题
```yaml
question: "Think or Not 中 Thought Dropout 的核心作用是什么？"
options:
  - "在 SFT 阶段随机删除答案，让模型学会拒答"
  - "把部分 reasoning trace 替换为空 thought，使模型获得跳过显式推理的冷启动格式"
  - "强制所有样本都不输出 `<think>` 标签"
  - "用外部奖励模型给每个 token 打分"
answer: 1
explain: "Thought Dropout 让空 thought 成为合法输出形式；随后 GRPO 根据任务 reward 学习哪些样本适合跳过推理，哪些仍需要完整推理。"
```

### Grounded-RL

```yaml
id: grounded_rl
num: 25
name: Grounded-RL
full_name: 接地强化学习 (Grounded Reinforcement Learning)
year: '2026'
org: CMU
parent: reason_rft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/ddbd83ac1ad27304a72b873124c2dac2-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 推理步骤锚定视觉证据，减少幻觉
```

#### 📝 一句话总结
Grounded-RL 提出 ViGoRL，用强化学习训练视觉语言模型在每一步推理中显式输出图像坐标，把自然语言思考锚定到可检查的视觉证据。它用 MCTS 生成带回溯和区域探索的冷启动轨迹，再用 GRPO 优化最终任务奖励，从而缓解普通 CoT/RL 只追求答案正确却不真正看图的问题。

#### 🎯 核心要点
- **显式接地推理轨迹**：将每个推理节点表示为 \(\langle s_t,(x_t,y_t)\rangle\)，其中 \(s_t\) 是文本思考，\((x_t,y_t)\) 是对应视觉证据位置
- **两阶段训练流程**：先用教师模型和 MCTS 生成接地推理树并做 SFT 冷启动，再用 GRPO 对接地格式和任务正确性进行强化学习
- **MCTS 冷启动数据**：用 Qwen2.5-VL-72B 作为教师扩展搜索树，从 1,500 个 prompts 生成约 30K 条高质量接地推理轨迹
- **复合奖励设计**：总奖励由格式奖励 \(r_{\text{fmt}}\) 和任务奖励 \(r_{\text{task}}\) 加权组成，坐标引用必须合法才给格式分
- **多轮视觉反馈**：模型可通过 `<tool_call>` 请求以预测坐标为中心的高分辨率 crop，再基于 `<observation>` 继续推理
- **跨任务评估**：覆盖 SAT-2、BLINK、RoboSpatial、V*Bench、ScreenSpot、VisualWebArena 等空间推理、视觉搜索和网页 grounding 任务

#### 🔬 深入细节
##### 核心框架

![ViGoRL 方法总览](https://arxiv.org/html/2505.23678v3/Figures/Figure2_V3.jpg)
*图：ViGoRL 先用 MCTS 生成接地图像区域的推理树，线性化为 SFT 冷启动轨迹，再用 GRPO 按最终奖励强化接地推理行为。*

##### 动机与背景

传统多模态 CoT 让模型输出较长的文字推理，但这些推理步骤往往只停留在“图中有某物”“左边那个区域”等模糊引用上。论文观察到，普通 VLM 在复杂视觉推理中常把图像当作静态上下文，而不是在每一步主动定位、检查、回看具体区域；标准 RL 只奖励最终答案时，还可能放大这种捷径，因为模型可以靠语言模式或数据偏置拿到奖励。

Grounded-RL 的核心判断是：视觉推理和数学/代码推理不同，模型不仅要会“想”，还要知道每个想法来自图像中的哪里。因此 ViGoRL 把推理链从纯文本序列改写为带坐标的轨迹：

$$
\tau = [n_1,\ldots,n_T,a], \quad n_t=\langle s_t,(x_t,y_t)\rangle
$$

对应的策略分解为：

$$
\pi_\theta(\tau \mid I,q)=
\left(\prod_{t=1}^{T}\pi_\theta(n_t \mid I,q,n_{<t})\right)
\pi_\theta(a \mid I,q,n_{\le T})
$$

这里的关键不是让模型多输出一个坐标字段，而是把坐标变成策略的一部分。模型必须为每个推理步骤选择一个可定位的视觉证据点，后续训练才能奖励“有效地看图”和“正确地回答”。

##### MCTS 生成接地冷启动轨迹

ViGoRL 不直接从空白模型开始 RL，因为预训练 VLM 的初始采样分布很少包含充分的区域探索、视觉验证和回溯。论文用 MCTS 构造冷启动数据，每个搜索节点就是一个接地推理步骤 \(\langle s_t,(x_t,y_t)\rangle\)：

```python
# ViGoRL MCTS 冷启动伪代码
def build_grounded_traces(image, question, teacher, judge):
    tree = init_root(image, question)
    for _ in range(num_search_iters):
        node = select_by_ucb(tree)                       # 选择高价值且未充分探索的路径
        child = teacher.sample_grounded_step(node)       # 生成 thought + coordinate，或候选答案
        reward = rollout_until_answer(child, teacher, judge)
        backpropagate(child, reward)                     # 将终局正确性回传到路径

    paths = extract_successful_and_corrected_paths(tree)
    return linearize(paths)                              # direct chains + corrected chains
```

MCTS 的价值在于它天然支持分支探索和回溯：如果某个区域或思路导致错误，搜索树可以转向其他区域，并把“等一下，这里不对”的纠正链也保留下来。线性化后有两类 SFT 样本：直接走向正确答案的 direct chains，以及先失败再回溯修正的 corrected chains。这比普通 teacher distillation 更像人类视觉检索过程。

##### GRPO 强化接地格式与答案正确性

SFT 得到的 \(\pi_{\theta_0}\) 只是模仿 MCTS 轨迹，面对新问题不一定最优。ViGoRL 接着用 GRPO 优化长轨迹奖励。对同一输入 \(x\) 采样 \(G\) 条轨迹 \(\{\tau^{(i)}\}_{i=1}^{G}\)，每条轨迹有标量奖励 \(r^{(i)}=R(\tau^{(i)})\)，组内优势为：

$$
\hat{A}^{(i)} = r^{(i)} - \bar{R}, \quad
\bar{R}=\frac{1}{G}\sum_i r^{(i)}
$$

GRPO 的裁剪目标可写为：

$$
\mathcal{L}_{\text{GRPO}}(\theta)=
-\frac{1}{G}\sum_{i=1}^{G}\frac{1}{|\tau^{(i)}|}
\sum_t
\min\left[
\rho_t^{(i)}\hat{A}^{(i)},
\text{clip}(\rho_t^{(i)},1-\epsilon,1+\epsilon)\hat{A}^{(i)}
\right]
\beta D_{\text{KL}}(\pi_\theta\|\pi_{\text{ref}})
$$

其中 \(\rho_t^{(i)}=\frac{\pi_\theta(\tau_t^{(i)}\mid \tau_{<t}^{(i)},x)}{\pi_{\text{old}}(\tau_t^{(i)}\mid \tau_{<t}^{(i)},x)}\)。总奖励为：

$$
R(\tau)=\lambda_{\text{fmt}}r_{\text{fmt}}+\lambda_{\text{task}}r_{\text{task}}
$$

\(r_{\text{fmt}}\) 检查 `<think>`、`<answer>` 和坐标格式是否有效，且只有所有坐标引用合法时才给格式奖励；\(r_{\text{task}}\) 随任务定义，例如 SAT-2 用答案是否匹配，网页 grounding 用预测坐标是否落在标注框内，网页动作预测则拆成 action type 和 argument 两部分。

> 💡 关键：Grounded-RL 不直接奖励“写得像推理”，而是奖励带合法视觉锚点的推理轨迹和最终任务成功。这样可以抑制没有视觉证据支撑的语言化幻觉。

##### 多轮 RL：把坐标变成可交互视觉反馈

单轮接地仍有一个限制：模型虽然输出了坐标，但视觉编码器看到的还是同一张全局缩放图，小文字、按钮、局部边界可能已经被压缩掉。ViGoRL 因此引入多轮设置：模型预测坐标后，可以调用 crop 工具获得局部高分辨率观察。

```python
# ViGoRL 多轮推理伪代码
def vigorl_multiturn(model, image, question, max_turns=5):
    context = [image, question]
    for _ in range(max_turns):
        output = model.generate(context)
        if has_answer(output):
            return extract_answer(output)

        coord = extract_coordinate_from_tool_call(output)
        crop = crop_around(image, coord)                 # 环境返回局部高分辨率图
        context += [output, f"<observation>{crop}</observation>"]

    context += ["<think>Please provide your response now</think>"]
    return extract_answer(model.generate(context))
```

多轮训练把单轮 MCTS 轨迹改写成 dialog：每轮先输出 `<think>`，再输出 `<tool_call>{"name":"crop","arguments":{"coordinate": ...}}</tool_call>` 或 `<answer>`；环境返回 `<observation>` 后继续。RL 时 observation token 被 mask，不作为策略梯度的目标，因为它们来自环境而不是模型策略。

多轮格式奖励还加入了严格 tag 自动机和坐标多样性奖励：如果模型重复同一坐标、不调用工具或破坏对话结构，格式分会下降；若多次选择足够不同的区域，则可获得小额 bonus。这鼓励模型把推理预算花在真正的视觉探索上，而不是一轮结束或反复看同一点。

##### 与普通 CoT/RL 的区别

| 方法 | 推理中间态 | 奖励重点 | 主要风险 |
|---|---|---|---|
| 普通 CoT | 纯文本 thought | 最终答案或格式 | 文本解释看似合理但未真正引用图像 |
| Vanilla GRPO | 纯文本或弱格式输出 | 任务正确性 | RL 放大捷径，可能更少进行视觉验证 |
| Grounded-RL / ViGoRL | thought + coordinate + 可选 crop | 合法接地、任务正确、区域探索 | 需要构造接地冷启动和工具式多轮环境 |

#### 🧪 练习题
```yaml
question: "Grounded-RL 为什么要先用 MCTS 生成接地冷启动轨迹，再进行 GRPO？"
options:
  - "因为 MCTS 可以替代视觉编码器，直接输出最终答案"
  - "因为预训练 VLM 很少自然产生区域探索和回溯行为，冷启动能把接地推理分布先引入策略"
  - "因为 GRPO 只能优化树结构数据，不能优化线性文本"
  - "因为坐标奖励不需要最终答案正确性"
answer: 1
explain: "论文发现普通 VLM 和 vanilla RL 容易产生不接地图像的语言捷径。MCTS 用教师模型搜索 thought+coordinate 路径，并保留探索、验证、回溯轨迹，使后续 GRPO 有更好的初始策略。"
```

### SSR-CoT

```yaml
id: ssr_cot
num: 26
name: SSR-CoT
full_name: 空间推理思维链 (Spatial Reasoning Chain-of-Thought)
year: '2026'
org: SJTU
parent: visual_cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/b3732a13897c4cea145c3bdece80de64-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 百万级空间推理数据，增强深度感知
```

#### 📝 一句话总结
SSR-CoT/SSR 提出用深度图生成空间推理 rationale，并把这些文本 rationale 蒸馏成紧凑的 latent tokens 注入 VLM，使模型在无需显式输出长 CoT 的情况下获得深度感知和空间推理能力。它同时构建百万级 SSR-CoT 数据集与 SSRBench，用于训练和评估图像-深度-问题-推理-答案链路。

#### 🎯 核心要点
- **MIDI 模块**：提出 Mamba-based Image-Depth Interpreter，将 RGB 特征、深度特征和问题编码为深度感知的空间 reasoning latent tokens
- **深度到 rationale 的桥接**：先用 Depth Pro 估计深度，再把空间关系、距离、位置等信息写入中间 rationale
- **latent CoT 蒸馏**：不在推理时输出冗长文字 CoT，而是把 rationale 压缩进 \(Z_R\) latent tokens，插入 VLM 输入序列
- **两阶段训练**：Stage 1 对齐 MIDI latent tokens 与自然语言 rationale；Stage 2 可选地与 VLM 联合训练，直接监督最终答案
- **SSR-CoT 数据集**：整合 LLaVA-CoT、Visual-CoT、VoCoT、SpatialQA，形成超过 100 万条 image-depth-question-rationale-answer 样本
- **SSRBench 基准**：覆盖 general 与 spatial 任务，用于评估深度利用、空间关系理解和 VQA 泛化

#### 🔬 深入细节
##### 核心框架

![SSR 框架图](https://arxiv.org/html/2505.12448v3/x2.png)
*图：SSR 由深度估计、MIDI 模块、VLM 推理与两阶段训练组成；Stage 1 让 MIDI 学会恢复空间 rationale，Stage 2 可选地让 MIDI 与 VLM 联合生成最终答案。*

##### 动机与背景

多数 VLM 只看 RGB 图像，天然缺少几何深度信息。即使引入深度图或点云，传统做法也常把深度当作额外输入特征，缺少“如何把深度用于推理”的中间表达。例如判断“谁在更前面”“物体是否在桌子下面”“人推着什么”时，模型需要把像素级深度转成对象级位置、距离、遮挡和交互关系。

SSR 的核心思想是把深度数据翻译成结构化、可解释的空间 rationale，再把 rationale 压缩为 latent tokens。这样既保留了 CoT 的推理信息，又避免推理阶段生成大量文字带来的成本。

##### MIDI：从图像和深度生成空间 latent tokens

给定 RGB 图像 \(X_V \in \mathbb{R}^{H\times W\times 3}\)、文本问题 \(X_T\)，SSR 首先用 Depth Pro 得到单目深度图：

$$
X_D \in \mathbb{R}^{H\times W\times 1}
$$

随后分别提取 RGB 和深度特征。论文使用 CLIP ViT-L/14 作为视觉编码器 \(E_V\)，使用 SigLIP 作为深度编码器 \(E_D\)：

$$
H_\alpha = E_\alpha(X_\alpha), \quad \alpha \in \{V,D\}
$$

再通过两层 MLP projector \(\phi_V,\phi_D\) 映射到语言模型可用的语义空间：

$$
Z_\alpha = \phi_\alpha(H_\alpha), \quad \alpha \in \{V,D\}
$$

MIDI 的核心是一个 Mamba-based language model \(f_{\text{LM}}\)，它联合 RGB 特征、深度特征和问题，生成表示中间空间 rationale 的隐状态：

$$
H_R = f_{\text{LM}}(Z_V,Z_D,X_T)
$$

最后再用投影层 \(\phi_R\) 变成可插入 VLM 的 latent rationale tokens：

$$
Z_R = \phi_R(H_R)
$$

这些 \(Z_R\) token 被当作“隐式空间思维链”拼入 VLM 的图文输入，最终答案为：

$$
Y_A = f_{\text{VLM}}(X_V,Z_R,X_T)
$$

> 💡 关键：SSR 不是简单把深度图塞给 VLM，而是让 MIDI 把深度转换成任务相关的空间推理表示，再由 VLM 使用这些 latent tokens 回答问题。

##### 两阶段训练目标

**Stage 1：Reasoning and Alignment**

Stage 1 只训练 MIDI，使它产生的 latent tokens 能被冻结或后续 LLM 理解为原始文字 rationale。每个样本包含 ground-truth rationale \(Y_R\)，训练目标是从 \(X_V,X_D,X_T,Z_R\) 自回归重建该 rationale：

$$
\mathcal{L}_1(\theta)=
-\mathbb{E}_{(X_V,X_D,X_T,Z_R,Y_R)\sim D}
\left[
\frac{1}{|Y_R|}
\sum_{i=1}^{|Y_R|}
\log P_\theta(Y_{R,i}\mid X_V,X_D,X_T,Z_R,Y_{R,<i})
\right]
$$

这一阶段解决两个问题：MIDI 必须学会“读懂深度并形成空间推理”，同时还要把 latent tokens 投影到语言语义空间，使后续 VLM 能消费它们。

**Stage 2：Co-Training**

Stage 2 是可选的联合训练。此时不再监督中间 rationale，而是让 VLM 直接生成答案 \(Y_A\)，目标函数为：

$$
\mathcal{L}_2(\theta)=
-\mathbb{E}_{(X_V,X_D,X_T,Y_A)\sim D}
\left[
\frac{1}{|Y_A|}
\sum_{j=1}^{|Y_A|}
\log P_\theta(Y_{A,j}\mid X_V,X_D,X_T,Y_{A,<j})
\right]
$$

因为 Stage 2 不需要 rationale 标注，所以可以引入更多普通 VQA 样本来扩展泛化能力。论文也强调 MIDI 具备 plug-and-play 特性：只做 Stage 1 时，也能把 \(Z_R\) 作为外部模块接入已有 VLM。

##### SSR-CoT 数据构造

![SSR-CoT 标注流程](https://arxiv.org/html/2505.12448v3/x3.png)
*图：SSR-CoT 先估计深度，再结合 bounding box、SpatialRGPT/GPT-4o 等工具生成空间 rationale，并通过质量评估筛选。*

SSR-CoT 的样本格式可以理解为：

```yaml
image: RGB image
depth: estimated depth map
question: spatial or general VQA question
rationale: object locations, depth/order/proximity relations, and reasoning steps
answer: final answer
```

数据来源包括：

- LLaVA-CoT：通用和科学 VQA 的结构化 reasoning 数据
- Visual-CoT：以 bounding box 作为中间思考步骤的多模态 CoT 数据
- VoCoT：包含对象关系和框标注的细粒度 image-text CoT 数据
- SpatialQA：包含深度相关和机器人空间问答的数据

处理流程大致如下：

```python
# SSR-CoT 构造伪代码
def build_ssr_cot(raw_vqa_samples):
    dataset = []
    for sample in raw_vqa_samples:
        depth = depth_pro(sample.image)
        objects = extract_boxes_or_spatial_entities(sample)
        spatial_query = rewrite_as_spatial_query(sample.question, objects)
        rationale = generate_spatial_rationale(
            image=sample.image,
            depth=depth,
            question=spatial_query,
            tools=["SpatialRGPT", "GPT-4o"],
        )
        if quality_check(sample.image, sample.question, rationale, sample.answer):
            dataset.append((sample.image, depth, sample.question, rationale, sample.answer))
    return dataset
```

论文报告，加入 intermediate rationale 后，Qwen2.5-VL-7B-Instruct 的评估准确率从 67.80 提升到 79.42，说明这些 rationale 不只是解释性文本，而是包含了对答案有用的空间信息。

##### 推理效率：显式 CoT 到 latent CoT

显式输出文字 CoT 的问题是推理慢、token 多，还可能引入冗余解释。SSR 把 rationale 蒸馏到少量 latent tokens 后，可以在推理时避免输出长链。论文在 SpatialBench 上对比显示，SFT 文本 CoT 版本每样本需要数百个 token，而 SSR 只需要极少 latent reasoning token，并显著缩短推理时间。

这种设计的直觉是：训练时用文字 rationale 教模型“空间信息应该如何组织”，推理时让 MIDI 在隐藏空间中提供同类信息。VLM 接收到的是压缩后的空间工作记忆，而不是一整段自然语言解释。

##### 与传统空间 VLM 的区别

| 方法 | 深度信息使用方式 | 中间推理 | 推理成本 |
|---|---|---|---|
| RGB-only VLM | 无显式深度 | 依赖语言模型猜测空间关系 | 低，但空间错误多 |
| 直接拼接深度特征 | 深度作为额外视觉输入 | 缺少对象级/关系级 rationale | 中等，深度利用可能浅 |
| 文本 CoT 空间推理 | 显式生成空间描述 | 可解释但 token 长 | 高 |
| SSR / SSR-CoT | 深度经 MIDI 转为 latent rationale | 隐式空间 CoT | 低，且可 plug-and-play |

#### 🧪 练习题
```yaml
question: "SSR 为什么要把空间 rationale 蒸馏成 latent tokens，而不是推理时直接输出完整文字 CoT？"
options:
  - "因为 VLM 不能处理自然语言 rationale"
  - "因为 latent tokens 可以保留空间推理信息，同时显著降低长文本 CoT 的 token 成本"
  - "因为深度图只能用 Mamba 编码，不能用 Transformer 编码"
  - "因为 SSRBench 不允许模型输出解释"
answer: 1
explain: "SSR 用文字 rationale 做训练监督，让 MIDI 学到深度相关的空间推理；推理时以压缩 latent tokens 注入 VLM，避免生成冗长 CoT。"
```

### MuSLR

```yaml
id: muslr
num: 27
name: MuSLR
full_name: 多模态符号逻辑推理 (Multimodal Symbolic Logical Reasoning)
year: '2026'
org: NUS
parent: genome
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/4a69d58b1a64fd931ef72cd93b71dcbe-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 增强鲁棒性与逻辑严密性
```

#### 📝 一句话总结
MuSLR 提出首个面向多模态符号逻辑推理的 benchmark，要求模型结合图像和文本前提，按形式逻辑规则推导答案。论文进一步提出 LogiCAM，把推理拆成前提选择、推理类型识别和符号/启发式推理三个模块，使 VLM 在长链和复杂逻辑上比普通 CoT 更稳健。

#### 🎯 核心要点
- **新任务定义**：MuSLR 要求 VLM 在图像 \(I\) 和文本 \(T\) 的联合上下文中执行形式逻辑推导，而不是只做常识型视觉问答
- **两种任务格式**：Truth Evaluation（True/False/Unknown）与 Multiple Choice，均要求模型应用符号规则得到答案
- **MuSLR-Bench**：包含 1,093 个样本、7 个领域、35 个原子逻辑规则、976 个组合逻辑链，推理深度从 2 到 9
- **三类符号逻辑**：覆盖 propositional logic (PL)、first-order logic (FOL) 和 non-monotonic logic (NM)
- **LogiCAM 框架**：由 Premise Selector、Reasoning Type Identifier、Reasoner 三个模块组成，迭代地产生可追踪推理链
- **关键发现**：当前 VLM 的主要失败来自视觉与文本逻辑前提的 misalignment，约 70% 失败与跨模态逻辑对齐有关

#### 🔬 深入细节
##### 核心框架

![LogiCAM 工作流](https://arxiv.org/html/2509.25851v2/x4.png)
*图：LogiCAM 每轮先选择关键多模态前提，再判断使用形式符号推理还是启发式常识推理，最后把新结论加入上下文继续迭代。*

##### 动机与背景

很多视觉推理 benchmark 关注空间关系、属性识别或常识问答，但高风险场景还需要可验证的形式逻辑。例如自动驾驶中，图像显示“前方道路关闭”，文本规则写着“只有道路开放时车辆才能直行”，模型应通过 Modus Tollens 推出“不能直行”。这类问题不能只靠图像描述或语言常识，而需要把视觉事实映射成逻辑前提，再严格应用形式规则。

MuSLR 的挑战在于两点同时成立：图像和文本各自都不够，模型必须融合两种模态；答案不能只看语义相似度，而要符合逻辑推导链。论文因此把样本组织为：

$$
(I,T,Q) \rightarrow A
$$

其中 \(I\) 是图像，\(T\) 包含文本上下文和符号规则，\(Q\) 是问题，\(A\) 是 Truth Evaluation 或 Multiple Choice 的答案。每个样本还配有 ground-truth reasoning chain，用于分析模型是否真正按逻辑步骤推导。

##### MuSLR-Bench 构造

![MuSLR 数据构造流程](https://arxiv.org/html/2509.25851v2/x2.png)
*图：MuSLR 从多模态数据和符号规则出发，组合推理链、映射到真实场景、生成问答，并经过自动和人工质量检查。*

数据构造流程可以概括为：

```python
# MuSLR-Bench 构造伪代码
def build_muslr_bench(public_mm_sources, logic_rules):
    atomic_rules = select_rules(logic_rules, types=["PL", "FOL", "NM"])
    abstract_chains = compose_meaningful_rule_chains(atomic_rules)
    instances = []
    for chain in abstract_chains:
        context = ground_chain_to_real_world(chain, public_mm_sources)
        question, answer = generate_question_answer(context, chain)
        if automatic_logic_filter(chain, context) and manual_quality_check(question, answer):
            instances.append((context.image, context.text, question, answer, chain))
    return instances
```

论文先选择非平凡逻辑规则，例如 Modus Ponens、Hypothetical Syllogism、De Morgan's Law 等，再由专家组合成有意义的抽象推理链。随后将抽象符号映射到真实图文场景中，得到可问可答的多模态逻辑样本。

质量控制强调两点：逻辑链必须形式上可靠，图像和文本必须都对答案必要。这样可以防止模型只靠文本规则或只靠图像常识绕过真正的多模态符号推理。

##### LogiCAM：模块化多模态逻辑推理

LogiCAM 全称是 Logical reasoning with Commonsense Augmentation with Multimodality。它不是外接传统 theorem prover，而是让强 VLM 在明确模块约束下近似形式推理。完整循环包含四步：

```python
# LogiCAM 推理伪代码
def logicam(image, text_context, question, vlm):
    context = text_context
    reasoning_chain = []
    while True:
        # 1. 选择关键多模态前提
        rule, visual_fact = premise_selector(vlm, image, context, question)
        critical = combine(rule, visual_fact)

        # 2. 判断推理类型
        mode = reasoning_type_identifier(vlm, critical)

        # 3. 执行推理
        if mode == "symbolic":
            conclusion = apply_formal_rule(vlm, critical)
        else:
            conclusion = commonsense_bridge(vlm, critical)

        reasoning_chain.append(conclusion)

        # 4. 检查是否足够回答问题
        if sufficient_to_answer(conclusion, question):
            return answer_from(conclusion), reasoning_chain
        context = context + "\n" + conclusion
```

**1. Premise Selector**

给定图像 \(I\)、文本 \(T\) 和问题 \(Q\)，该模块先从文本中选出最相关的符号规则 \(R_r\)，再分析规则中哪些元素需要图像证据，并从图像抽取对应视觉事实 \(V_r\)。二者组合成关键前提：

$$
I_{\text{critical}} = (R_r,V_r)
$$

这一步解决的是跨模态对齐问题：如果图像事实没有正确映射到规则变量，后续形式推理即使规则正确也会错。

**2. Reasoning Type Identifier**

并非每一步都能只靠形式逻辑推进。该模块判断当前 \(I_{\text{critical}}\) 是否满足某个明确逻辑规则的应用条件。若满足，就优先使用 symbolic reasoning；若符号规则不足以连接真实场景，则允许使用 commonsense heuristics 补充。

**3. Reasoner**

当选择 symbolic reasoning 时，Reasoner 按形式规则推导结论 \(C\)，例如从 \((A\rightarrow B)\) 和 \(A\) 推出 \(B\)，或从 \((A\lor B)\) 和 \(\neg A\) 推出 \(B\)。当选择 heuristic reasoning 时，它只用于补足真实世界上下文中符号系统未覆盖的桥接信息。

**4. Completion Check**

若当前结论 \(C\) 足以回答问题，输出最终答案；否则将 \(C\) 加入上下文：

$$
T' = T \cup C
$$

然后继续下一轮。这个迭代机制让 LogiCAM 能处理深度 2 到 9 的长链，而不是一次性生成一大段容易断裂的 CoT。

##### 为什么普通 VLM 容易失败

MuSLR 的错误分析显示，性能会随逻辑复杂度和链长明显下降。FOL 最难，因为它要求变量绑定、量词和实体映射都精确；PL 相对简单但仍高度依赖文本-图像前提对齐；NM 更接近人类常识推理，但也可能被启发式捷径误导。

LogiCAM 的提升来自显式分工：Premise Selector 把图像事实和符号规则先对齐，Reasoning Type Identifier 避免在需要形式推理时滥用常识，Reasoner 再逐步产生可追踪结论。论文报告 LogiCAM 使 GPT-4.1 的 CoT 平均性能提升 14.13%，且在 FOL 等复杂逻辑上提升更明显。

> ⚠️ 注意：MuSLR 的目标不是证明 VLM 可以取代符号求解器，而是指出多模态逻辑任务中，最难的是把视觉证据、文本规则和形式推理步骤可靠地接起来。

##### 与神经符号/普通 CoT 的区别

| 方法 | 视觉输入 | 形式规则 | 推理可追踪性 | 局限 |
|---|---|---|---|---|
| 普通 VLM CoT | 直接看图 | 隐式使用 | 弱，容易跳步 | 可能输出合理但不合逻辑的解释 |
| LLM + theorem prover | 通常依赖文本 formalization | 显式符号求解 | 强 | 需要可靠把图文转成形式表达 |
| LogiCAM | VLM 直接访问图像和文本 | 模块化近似应用 | 中到强 | 仍受跨模态对齐错误影响 |
| MuSLR-Bench | 用于评估 | PL/FOL/NM | 提供 ground-truth chains | 是 benchmark，不是单一模型 |

#### 🧪 练习题
```yaml
question: "LogiCAM 中 Reasoning Type Identifier 的主要作用是什么？"
options:
  - "把图像编码成更高分辨率 token"
  - "判断当前关键前提应优先使用形式符号推理，还是用启发式常识补充"
  - "直接计算最终答案的准确率"
  - "把所有文本前提交给外部 theorem prover"
answer: 1
explain: "LogiCAM 每轮先选出关键图文前提，再判断是否满足形式逻辑规则的应用条件；若不满足，才用启发式常识补足真实场景中的缺口。"
```

### Med-R1

```yaml
id: med_r1
num: 28
name: Med-R1
full_name: 医学多模态推理 (Medical Multimodal Reasoning via RL)
year: '2026'
org: Stanford Med
parent: reason_rft
paper_url: https://ieeexplore.ieee.org/abstract/document/11371404/
project_url: ''
category: frontier_2026
motivation: GRPO医学推理，跨模态跨任务泛化
```

#### 📝 一句话总结
Med-R1 将 GRPO 引入医学 VQA 后训练，用规则化的格式奖励和答案奖励提升小型 VLM 在八类医学影像和五类医学问答任务上的泛化能力。论文还系统比较 Think、No-Think 与 Think-After，指出医学场景中“更长推理”不一定更好，推理质量和领域对齐比推理长度更关键。

#### 🎯 核心要点
- **医学 VLM 的 RL 后训练框架**：以 Qwen2-VL/Qwen2.5-VL 为基础模型，用 GRPO 训练医学视觉问答策略
- **八类影像模态**：CT、MRI、Ultrasound、Dermoscopy、Fundus Photography、OCT、Microscopy、X-ray
- **五类任务类型**：modality recognition、anatomy identification、disease diagnosis、lesion grading、biological attribute analysis
- **规则奖励而非奖励模型**：使用格式奖励检查 `<think>/<answer>` 标签，使用准确率奖励检查多选题答案字母是否匹配
- **组内相对优势**：GRPO 不训练 critic，而是对同一问题采样多条回答，用组内奖励归一化估计 advantage
- **Think/No-Think/Think-After 对比**：No-Think 往往提升跨模态泛化，Think-After 在保留可解释性和稳定性之间取得折中

#### 🔬 深入细节
##### 核心框架

![Med-R1 奖励与长度曲线](https://arxiv.org/html/2503.13939v4/extracted/6388405/fig_rewards_length.png)
*图：Med-R1 在不同医学模态和任务上的 GRPO 训练奖励与输出长度变化；奖励通常在 100-200 steps 内收敛，输出长度随训练缩短。*

##### 动机与背景

医学影像 VQA 与自然图像 VQA 不同：问题往往要求识别细粒度病灶、解剖结构或影像模态，且不同模态之间视觉分布差异很大。传统 SFT 容易把模型绑定到训练集中的表面模式，例如某种模态的特定纹理或某类问题的常见答案；高质量医学 CoT 标注又昂贵且难以规模化。

Med-R1 的出发点是用 RL 替代单纯最大似然拟合，让模型在规则奖励下探索更稳健的回答策略。与 PPO 相比，GRPO 不需要额外价值模型，适合资源受限的医学 VLM 后训练。

##### GRPO 目标函数

对训练问题集合 \(P(Q)\)，每次采样问题 \(q\)，旧策略 \(\pi_{\theta_{\text{old}}}\) 对同一问题生成 \(G\) 个回答 \(\{o_i\}_{i=1}^{G}\)。GRPO 目标为：

$$
J_{\text{GRPO}}(\theta)=
\mathbb{E}_{q\sim P(Q),\{o_i\}_{i=1}^{G}\sim \pi_{\theta_{\text{old}}}}
\frac{1}{G}\sum_{i=1}^{G}
\left[
\min\left(
\frac{\pi_{\theta_{\text{new}}}(o_i\mid q)}
{\pi_{\theta_{\text{old}}}(o_i\mid q)}A_i,
\text{clip}\left(
\frac{\pi_{\theta_{\text{new}}}(o_i\mid q)}
{\pi_{\theta_{\text{old}}}(o_i\mid q)},
1-\epsilon,1+\epsilon
\right)A_i
\right)
-\beta D_{\text{KL}}(\pi_{\theta_{\text{new}}}\|\pi_{\text{ref}})
\right]
$$

其中 \(\pi_{\text{ref}}\) 是冻结的基础 MLLM，KL 项限制新策略不要偏离基础模型太远。与 PPO 不同，GRPO 的 \(A_i\) 不来自 critic，而来自同组样本的奖励归一化：

$$
A_i = \frac{r_i-\text{mean}(\{r_j\}_{j=1}^{G})}{\text{std}(\{r_j\}_{j=1}^{G})}
$$

直觉上，同一医学问题下多条候选回答互相比，答对且格式正确的回答获得正优势，答错或格式坏的回答获得负优势。

##### 奖励设计

Med-R1 使用两类规则奖励：

- **格式奖励**：要求模型把思考过程放在 `<think>...</think>`，最终答案放在 `<answer>...</answer>` 中；标签存在且格式正确时给 1 分
- **准确率奖励**：医学 VQA 多为选项题，若提取出的首个答案字母与 ground truth 匹配，则给 1 分

```python
# Med-R1 GRPO 奖励伪代码
def med_r1_reward(response, gold_letter, mode="think"):
    if mode == "think":
        format_reward = has_valid_tags(response, ["think", "answer"])
        pred = extract_answer_letter(response)
    elif mode == "no_think":
        format_reward = has_valid_tags(response, ["answer"]) and no_text_outside_answer(response)
        pred = extract_answer_letter(response)
    elif mode == "think_after":
        format_reward = answer_before_rationale(response)
        pred = extract_answer_letter(response)

    accuracy_reward = int(pred == gold_letter)
    return format_reward + accuracy_reward
```

这种奖励很轻量，不依赖医学专家在线判分或训练额外 reward model。代价是它主要适用于有明确答案的 VQA/选择题设置，开放式临床报告生成还需要更复杂的语义和医学事实奖励。

##### Think、No-Think 与 Think-After

Med-R1 的重要贡献不只是“用 GRPO 训练医学 VLM”，还在于比较了推理形式本身。

**Think** 是标准 R1 风格：先输出 `<think>` 中间推理，再在 `<answer>` 中给出答案。它有可解释性，但在医学图像上可能生成领域不对齐的 rationale。例如模型借用自然图像或通用医学常识的语言模式，看似解释充分，实际与影像证据不匹配。

**No-Think** 修改 prompt，只允许输出：

```text
<answer>A</answer>
```

如果 `<answer>` 之外出现任何显式思考文本，答案抽取会变成 null，从而准确率奖励为 0。这会强迫模型直接优化答案选择。论文发现 No-Think 在跨模态泛化中经常优于 Think，说明在缺少高质量医学 CoT 监督时，强行生成中间 rationale 可能反而引入幻觉。

**Think-After** 则先输出答案，再输出事后解释。它的设计目标是让答案优化不被冗长前置推理扰动，同时保留给医生审阅的解释文本：

```text
<answer>B</answer>
<think>post-hoc rationale explaining the decision</think>
```

Think-After 不完全解决推理忠实性问题，但比前置 Think 更稳定，也更符合医学应用中“先给可核验结论，再给解释供审阅”的需求。

##### 训练与推理流程

```python
# Med-R1 训练流程伪代码
def train_med_r1(policy, ref_policy, medical_vqa_data):
    for batch in sample_questions(medical_vqa_data):
        all_responses = []
        for q in batch:
            responses = policy.sample(q, G=group_size)
            rewards = [rule_reward(r, q.gold) for r in responses]
            advantages = normalize_within_group(rewards)
            all_responses.append((q, responses, advantages))

        loss = clipped_grpo_loss(
            policy=policy,
            old_policy=policy.snapshot(),
            ref_policy=ref_policy,
            grouped_samples=all_responses,
            kl_beta=beta,
        )
        policy.update(loss)
    return policy
```

评估时，论文从两个维度测试泛化：跨模态泛化和跨任务泛化。跨模态设置中，模型在某一影像模态上后训练，再测试到其他七类模态；跨任务设置中，模型在某一问题类型上训练，再测试到其他问题类型。这比只测同分布准确率更贴近医学部署，因为真实系统经常遇到新设备、新模态和新问题类型。

##### 关键实验结论

Med-R1 的 2B 模型相对 Qwen2-VL-2B 获得约 29.94% 平均准确率提升，并超过更大的 Qwen2-VL-72B；跨任务泛化相对基础模型提升约 32.06%。这些结果说明，规则 RL 后训练能让小模型更有效地适应医学问答，而不是单纯依赖参数规模。

论文也提醒一个反直觉结论：在医学 VQA 中，推理越长不一定越好。训练曲线显示输出长度会下降，而奖励保持或提升，说明 GRPO 学到的是更直接、更符合标签奖励的决策策略。若没有医学领域对齐的 rationale 监督，长 CoT 可能成为噪声源。

> 💡 关键：Med-R1 把医学 VLM 的问题从“如何让模型多说推理”转为“如何让模型在可验证奖励下学到可泛化且足够可解释的回答策略”。

##### 与 SFT 和通用 R1 的区别

| 方法 | 监督信号 | 优势 | 医学场景风险 |
|---|---|---|---|
| SFT | 固定答案/标注分布 | 稳定、实现简单 | 容易记忆训练模态和任务捷径 |
| 通用 Think CoT | 前置自然语言推理 | 可解释、符合 R1 形式 | rationale 可能与医学影像证据不对齐 |
| No-Think Med-R1 | 只优化答案奖励 | 泛化更稳、训练更直接 | 缺少可审阅解释 |
| Think-After Med-R1 | 先答案后解释 | 兼顾准确率和解释 | 解释仍需进一步校验忠实性 |

#### 🧪 练习题
```yaml
question: "Med-R1 中 No-Think 变体为什么可能比前置 Think 获得更好的跨模态泛化？"
options:
  - "因为医学 VQA 不需要视觉输入"
  - "因为在缺少高质量医学 CoT 监督时，前置自由推理可能产生领域不对齐的幻觉，No-Think 直接优化答案奖励"
  - "因为 GRPO 无法处理 <think> 标签"
  - "因为 No-Think 使用了更大的基础模型"
answer: 1
explain: "论文发现医学场景中推理质量比推理长度更重要。若前置 rationale 来自通用域模式，可能与医学影像证据错位；No-Think 去掉这一路径，直接优化答案正确性。"
```
