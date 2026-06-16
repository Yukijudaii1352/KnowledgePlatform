---
domain: multimodal
topic_id: visual_language_model
topic_name: 视觉-语言基础模型
page_icon: 🔗
page_title: 视觉-语言基础模型
page_subtitle: '{build_date} 版'
page_desc: 视觉-语言基础模型（VLM）通过跨模态对齐、指令微调和原生多模态训练，实现图像与文本的深度理解与生成，是多模态AI的核心基础设施。
hero_pills: []
count_pill: '{count} 个算法'
categories:
  contrastive:
    label: 对比学习
    color: '#3B82F6'
  encoder_decoder:
    label: 编解码器
    color: '#10B981'
  connector:
    label: 连接器架构
    color: '#F59E0B'
  native_multimodal:
    label: 原生多模态
    color: '#8B5CF6'
  frontier_2026:
    label: 2026前沿
    color: '#EF4444'
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
- id: clip
  x: 100
  y: 100
  category: contrastive
- id: align
  x: 150
  y: 120
  category: contrastive
- id: vilt
  x: 120
  y: 250
  category: encoder_decoder
- id: albef
  x: 140
  y: 200
  category: encoder_decoder
- id: blip
  x: 200
  y: 220
  category: encoder_decoder
- id: flamingo
  x: 220
  y: 350
  category: connector
- id: pali
  x: 240
  y: 450
  category: encoder_decoder
- id: blip2
  x: 300
  y: 240
  category: connector
- id: instructblip
  x: 350
  y: 260
  category: connector
- id: minigpt4
  x: 360
  y: 300
  category: connector
- id: llava
  x: 320
  y: 150
  category: connector
- id: qwen_vl
  x: 380
  y: 170
  category: connector
- id: cogvlm
  x: 390
  y: 130
  category: connector
- id: gemini
  x: 340
  y: 480
  category: native_multimodal
- id: llava_next
  x: 450
  y: 160
  category: connector
- id: internvl_2_5
  x: 460
  y: 320
  category: connector
- id: internvl_3_5
  x: 520
  y: 340
  category: connector
- id: siglip2
  x: 600
  y: 80
  category: frontier_2026
- id: llm2clip
  x: 610
  y: 110
  category: frontier_2026
- id: gpt5_4
  x: 640
  y: 500
  category: native_multimodal
- id: gemini_3_1
  x: 650
  y: 520
  category: native_multimodal
- id: claude_opus_4_7
  x: 660
  y: 400
  category: frontier_2026
- id: llama4
  x: 620
  y: 460
  category: native_multimodal
- id: qwen3_5_vlm
  x: 630
  y: 180
  category: frontier_2026
- id: doubao_2_0
  x: 640
  y: 280
  category: frontier_2026
- id: glm_4_5v
  x: 650
  y: 140
  category: frontier_2026
- id: deepseek_v4
  x: 670
  y: 350
  category: frontier_2026
- id: internvl_3_0
  x: 580
  y: 360
  category: native_multimodal
- id: v_jepa2
  x: 680
  y: 220
  category: frontier_2026
- id: drivepi
  x: 690
  y: 250
  category: frontier_2026
edges:
- from: clip
  to: align
  label: 规模扩展
- from: clip
  to: albef
  label: 对齐融合
- from: clip
  to: llava
  label: 指令微调
- from: clip
  to: siglip2
  label: 统一配方
- from: clip
  to: llm2clip
  label: LLM增强
- from: albef
  to: blip
  label: 数据引导
- from: blip
  to: blip2
  label: Q-Former
- from: blip2
  to: instructblip
  label: 指令感知
- from: blip2
  to: minigpt4
  label: 简化投影
- from: llava
  to: qwen_vl
  label: 位置感知
- from: llava
  to: cogvlm
  label: 深度融合
- from: llava
  to: llava_next
  label: 动态切片
- from: qwen_vl
  to: qwen3_5_vlm
  label: 早期融合
- from: cogvlm
  to: glm_4_5v
  label: 思考模式
- from: pali
  to: gemini
  label: 原生训练
- from: gemini
  to: gpt5_4
  label: 统一架构
- from: gemini
  to: gemini_3_1
  label: 超长上下文
- from: internvl_2_5
  to: internvl_3_5
  label: RL对齐
- from: internvl_3_5
  to: internvl_3_0
  label: 原生预训练
milestones:
- id: clip
  label: 对比学习奠基
  description: CLIP开创大规模图文对比学习范式，成为VLM视觉编码器标准
- id: llava
  label: 指令微调开创
  description: LLaVA首次将指令微调引入多模态，开启开源VLM对话模型浪潮
- id: gemini
  label: 原生多模态标杆
  description: Gemini实现从预训练阶段的原生多模态联合训练，树立新范式标杆
```

## 核心算法

### CLIP

```yaml
id: clip
num: 1
name: CLIP
full_name: CLIP
year: '2021'
org: OpenAI
parent: —
paper_url: ICML 2021
project_url: ''
category: contrastive
motivation: 利用自然语言监督学习通用视觉表征
```

#### 📝 一句话总结
CLIP 提出 Contrastive Language-Image Pre-training，用 4 亿图文对训练图像/文本双塔，把图像分类从固定标签头改造成“图像与文本描述匹配”问题，解决了传统视觉模型换任务就要重训分类器的限制。

#### 🎯 核心要点
- 大规模自然语言监督：构建约 4 亿个网络图文对，用原始文本而不是人工类别标签监督视觉表征
- 双塔对齐架构：图像编码器使用 ResNet 或 ViT，文本编码器使用 Transformer，二者映射到同一个归一化嵌入空间
- 对称对比损失：在一个 batch 内构造 \(N \times N\) 图文相似度矩阵，同时优化 image-to-text 与 text-to-image 交叉熵
- 可学习温度参数：用 logit scale 控制 softmax 锐度，使归一化余弦相似度具有足够判别性
- 零样本分类器合成：把类别名写入 prompt 模板，用文本编码器生成分类权重，再与图像嵌入做相似度匹配
- Prompt engineering 与 prompt ensembling：通过自然语言模板缓解类别名歧义，并提升跨数据集零样本表现
- 迁移能力强：在 30 多个视觉数据集上验证 OCR、动作识别、细粒度分类、地理定位等开放任务迁移

#### 🔬 深入细节
##### 核心示意图

![CLIP 总览图](https://raw.githubusercontent.com/openai/CLIP/main/CLIP.png)
*图：OpenAI CLIP 官方仓库中的方法总览。训练时预测 batch 内哪段文本与哪张图像匹配；推理时用文本编码器把类别描述变成零样本分类器。*

公开来源：论文 `https://arxiv.org/abs/2103.00020`，官方项目 `https://github.com/openai/CLIP`。

##### 核心流程代码

```python
# CLIP: symmetric image-text contrastive learning

def train_clip_step(images, texts, image_encoder, text_encoder, logit_scale):
    image_features = image_encoder(images)          # [N, D]
    text_features = text_encoder(texts)             # [N, D]

    image_emb = l2_normalize(linear_i(image_features))
    text_emb = l2_normalize(linear_t(text_features))

    logits = exp(logit_scale) * image_emb @ text_emb.T
    labels = arange(len(images))                    # diagonal pairs are positives

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    return (loss_i2t + loss_t2i) / 2

def zero_shot_predict(image, class_names, templates):
    image_emb = l2_normalize(encode_image(image))
    text_embs = []
    for name in class_names:
        prompts = [tmpl.format(name) for tmpl in templates]
        text_embs.append(mean(l2_normalize(encode_text(prompts))))
    return argmax(image_emb @ stack(text_embs).T)
```

##### 关键公式

给定 batch 内 \(N\) 个图文对，图像嵌入 \(\hat{i}_k\) 与文本嵌入 \(\hat{t}_k\) 都经过 L2 归一化，CLIP 先计算相似度：

$$
s_{ij} = \exp(\alpha)\,\hat{i}_i^\top \hat{t}_j
$$

其中 \(\alpha\) 是可学习的 logit scale。对称训练目标为：

$$
\mathcal{L}
= \frac{1}{2N}\sum_{i=1}^{N}
\left[
-\log \frac{\exp(s_{ii})}{\sum_{j=1}^{N}\exp(s_{ij})}
-\log \frac{\exp(s_{ii})}{\sum_{j=1}^{N}\exp(s_{ji})}
\right]
$$

第一项让每张图像找回正确文本，第二项让每段文本找回正确图像；同一个 batch 中其余 \(N-1\) 个样本自然成为负例。

##### 方法解读

CLIP 的核心动机不是再做一个更大的 ImageNet 分类器，而是把监督信号从封闭的类别集合扩展到自然语言。传统监督视觉模型学习的是固定标签空间，例如 1000 个 ImageNet 类；当任务换成 OCR、地理定位或细粒度物种分类时，模型必须重新收集标注并训练新头。CLIP 直接学习“图像和文本是否匹配”，使模型在预训练阶段接触开放词汇、属性、动作和上下文描述，推理时可以用任意自然语言描述指定目标概念。

架构上，CLIP 保持了非常清晰的双塔设计。图像塔可以是改造过的 ResNet，也可以是 Vision Transformer；文本塔是 Transformer，处理 BPE token 序列，并取句末表示映射到共享嵌入空间。两个塔最后都接线性投影和 L2 归一化，所以相似度就是余弦相似度。双塔没有跨注意力，牺牲了一部分细粒度交互能力，但换来极高的检索和零样本推理效率：文本类别向量可以预先算好，图像只需编码一次。

对比目标是 CLIP 的效率关键。论文早期尝试过图像到文本的生成式 caption 预测，但生成精确文本需要建模大量语言细节，学习视觉可迁移概念的效率低。CLIP 改成只判断哪段文本与哪张图像配对，在 batch 中形成 \(N \times N\) 个候选配对，真实配对在对角线上。这样每个样本都会同时收到大量负例信号，训练目标直接服务于跨模态检索和零样本分类。

零样本分类时，CLIP 不再学习一个固定的线性分类头，而是把类别名写成自然语言 prompt，例如 `a photo of a {label}`。文本编码器输出的类别向量相当于动态分类器权重，图像向量与所有类别文本向量做相似度，最高者就是预测类别。Prompt 的作用不是装饰文本，而是把孤立类别名放回训练分布中：`crane` 可能是鸟也可能是机械，模板和 prompt ensemble 可以显著降低歧义。

CLIP 对后续 VLM 的影响在于它把“视觉编码器 + 语言空间对齐”变成了通用前端。后来的 LLaVA、BLIP、Flamingo 等模型大量复用或继承这条路径：先用大规模图文对学到开放词汇视觉特征，再通过连接器、跨注意力或指令微调补上细粒度推理与对话能力。CLIP 本身的限制也很清楚：它擅长全局语义匹配，但对精确计数、空间关系、细粒度 OCR 和需要复杂组合推理的任务并不充分。

#### 🧪 练习题
```yaml
question: "CLIP 能做零样本分类的关键原因是什么？"
options:
  - "图像编码器在 ImageNet 上有监督预训练"
  - "文本编码器可以把类别描述编码成动态分类器权重"
  - "模型使用跨注意力逐区域比较图文 token"
  - "训练时为每个下游数据集都保留了分类头"
answer: 1
explain: "CLIP 将类别名或类别描述写成 prompt，用文本编码器得到类别向量，再与图像向量比较相似度，因此可以在没有下游训练样本的情况下构造分类器。"
```

### ALIGN

```yaml
id: align
num: 2
name: ALIGN
full_name: ALIGN
year: '2021'
org: Google
parent: clip
paper_url: ICML 2021
project_url: ''
category: contrastive
motivation: 验证规模胜于质量的假设
```

#### 📝 一句话总结
ALIGN 用 18 亿 noisy image-alt-text 对训练极简图文双塔，证明在图文对比学习中，大规模弱清洗数据可以弥补噪声，并在零样本分类和跨模态检索上获得强性能。

#### 🎯 核心要点
- 数据策略极端简化：从网页 alt-text 构造 1.8B 图文对，只做基础安全、尺寸、长度、频率和去重过滤
- 双塔架构直接有效：图像端用 EfficientNet，文本端用 BERT 的 `[CLS]` 表示，经线性层映射到共享嵌入空间
- 从零训练：论文强调图像编码器和文本编码器均从头训练，避免依赖人工标签预训练
- 归一化 softmax 对比损失：同时优化 image-to-text 和 text-to-image 两个方向，把 batch 内其他样本作为负例
- 大 batch 与温度学习：跨 TPU core 拼接嵌入形成 16384 全局 batch，并学习共享温度 \(\sigma\)
- 规模胜过清洗：消融显示同规模 noisy 数据不如 CC-3M，但 12M noisy 数据已超过 3M clean 数据
- 强迁移结果：ImageNet 零样本 top-1 达 76.4%，线性/微调视觉迁移和 Flickr30K、MSCOCO 检索均很强

#### 🔬 深入细节
##### 核心示意图

![ALIGN 方法总览图](https://ar5iv.labs.arxiv.org/html/2102.05918/assets/x1.png)
*图：ALIGN Figure 1。模型从 noisy image-alt-text 数据中学习图像和文本表征，并用于零样本分类、跨模态检索和图文组合查询。*

公开来源：论文 `https://arxiv.org/abs/2102.05918`。

##### 核心流程代码

```python
# ALIGN: normalized softmax contrastive learning on noisy alt-text pairs

def align_train_step(images, alt_texts, image_encoder, text_encoder, sigma):
    img = image_encoder(images)                 # EfficientNet + global pooling
    txt = text_encoder(alt_texts).cls_token     # BERT [CLS]

    img_emb = l2_normalize(img_projection(img))
    txt_emb = l2_normalize(txt_projection(txt))

    # Embeddings from all TPU cores are concatenated before this step.
    logits = img_emb @ txt_emb.T / sigma
    labels = arange(len(images))

    loss_i2t = cross_entropy(logits, labels, label_smoothing=0.1)
    loss_t2i = cross_entropy(logits.T, labels, label_smoothing=0.1)
    return (loss_i2t + loss_t2i) / 2
```

##### 关键公式

设 \(x_i\) 是第 \(i\) 张图像的归一化嵌入，\(y_i\) 是其 alt-text 的归一化嵌入，\(\sigma\) 是温度参数。ALIGN 的 image-to-text 损失为：

$$
L_{i2t}
= -\frac{1}{N}\sum_{i=1}^{N}
\log
\frac{\exp(x_i^\top y_i / \sigma)}
{\sum_{j=1}^{N}\exp(x_i^\top y_j / \sigma)}
$$

text-to-image 损失对称定义：

$$
L_{t2i}
= -\frac{1}{N}\sum_{i=1}^{N}
\log
\frac{\exp(y_i^\top x_i / \sigma)}
{\sum_{j=1}^{N}\exp(y_i^\top x_j / \sigma)}
$$

总目标为 \(\mathcal{L}=L_{i2t}+L_{t2i}\)。由于 \(x\) 和 \(y\) 都经过 L2 归一化，\(\sigma\) 直接控制余弦相似度 softmax 的锐度。

##### 方法解读

ALIGN 的问题意识非常工程化：视觉-语言预训练的数据通常依赖精细清洗或人工标注，规模受限；互联网网页的 alt-text 虽然噪声很大，却天然提供了海量图文弱配对。论文保留了 Conceptual Captions 式的数据来源，但移除了大量昂贵的语义清洗，只过滤色情内容、异常图片尺寸/宽高比、过短或过长文本、出现频率过高的模板化 alt-text，以及下游评测集近重复样本。最终得到的 1.8B 数据噪声更高，但覆盖面远大于干净小数据集。

模型本身几乎没有复杂结构。图像端是 EfficientNet，经 global pooling 得到视觉表示；文本端是 BERT，用 `[CLS]` token 表示整段 alt-text，并生成 100k wordpiece 词表。二者各自接线性层映射到同一维度，再做 L2 归一化。这个设计与跨注意力 VLP 模型的差异很大：ALIGN 不在训练或检索时逐 token 做深度交互，而是先把图像和文本独立编码成向量，所以可以直接服务于大规模检索系统。

损失函数与 CLIP 同属对称对比学习，但 ALIGN 更强调“超大 batch + noisy 数据”的组合。训练时每个 TPU core 处理 16 个正样本对，1024 个 Cloud TPUv3 core 拼接后形成 16384 的全局 batch，因此每个样本都有大量 in-batch 负例。论文还使用 label smoothing 0.1、LAMB 优化器、10k step warmup 到 \(10^{-3}\)，再在约 1.2M steps 内线性衰减；温度 \(\sigma\) 从 1.0 初始化并可学习，消融中收敛到约 \(1/64\)。

“规模胜于质量”不是说噪声无害，而是说在模型容量和数据规模足够大时，数据多样性会压过单样本噪声。论文消融显示，3M noisy ALIGN 子集明显差于 3M clean Conceptual Captions，但 6M、12M noisy 子集迅速追上并超过 clean 数据。这说明 noisy alt-text 的价值在于覆盖长尾实体、场景、属性和语言表达；单条标注可能错，但海量弱相关信号可以在对比学习中形成统计优势。

ALIGN 与 CLIP 的主要区别集中在数据策略和工程取舍。CLIP 使用更有意图的数据收集和过滤流程，ALIGN 则尽量顺着网页 alt-text 原始分布扩张规模；CLIP 的公开代表模型大量使用 ViT，ALIGN 的主模型使用 EfficientNet-L2 + BERT-Large；两者都避免跨注意力，因此都能高效检索。ALIGN 进一步展示了图像向量和文本向量可以相加用于 image+text query，这为“用一张图加一句话检索相似但带指定属性变化的图片”提供了早期范式。

#### 🧪 练习题
```yaml
question: "ALIGN 为什么能从 noisy alt-text 数据中获得强表示？"
options:
  - "它使用了人工清洗到接近标注数据质量的文本"
  - "它用跨注意力过滤掉所有错误图文对"
  - "它用极大规模数据和 batch 内负例让统计相关性压过单样本噪声"
  - "它只在 ImageNet 类别名上训练文本编码器"
answer: 2
explain: "ALIGN 的核心论点是数据规模可以补偿噪声。模型仍然会受到噪声影响，但 1.8B 图文对提供了足够多样的弱监督信号，对比学习能从总体统计中学习跨模态对齐。"
```

### ViLT

```yaml
id: vilt
num: 3
name: ViLT
full_name: ViLT
year: '2021'
org: KAIST
parent: —
paper_url: ICML 2021
project_url: ''
category: encoder_decoder
motivation: 首个完全摒弃目标检测器的VLM
```

#### 📝 一句话总结
ViLT 提出不依赖卷积骨干、目标检测器或区域监督的视觉-语言 Transformer，直接把图像 patch 和文本 token 拼接进单流 Transformer，让 VLP 的计算重心从昂贵视觉特征提取转回跨模态交互。

#### 🎯 核心要点
- 完全移除检测器：不使用 Faster R-CNN、Visual Genome 区域标签、RoI head 或 NMS
- 线性 patch projection：把图像切成 \(32 \times 32\) patch，用一个线性层投影成视觉 token，视觉嵌入部分约 2.4M 参数
- 单流 Transformer：文本 token 与图像 patch token 拼接后统一输入 Transformer，在同一层堆栈中完成模态内和模态间交互
- ViT 初始化：交互 Transformer 权重从预训练 ViT 初始化，以弥补没有深层视觉 embedder 的表达压力
- 主训练目标简洁：使用 image-text matching（ITM）与 masked language modeling（MLM），并在 ITM 中加入 word-patch alignment（WPA）式对齐约束
- Whole word masking：整词遮盖避免模型只靠残留子词恢复 token，迫使 MLM 更依赖图像信息
- 推理速度优势明显：论文表格中 ViLT-B/32 约 15ms，显著快于典型 region-feature VLP 约 900ms 的视觉特征提取流程

#### 🔬 深入细节
##### 核心示意图

![ViLT 架构比较图](https://ar5iv.labs.arxiv.org/html/2102.03334/assets/x1.png)
*图：ViLT Figure 1。传统 VLP 的视觉嵌入部分由检测器或 CNN 占据主要计算，ViLT 将视觉嵌入压缩为轻量 patch projection，使 Transformer 成为主要计算模块。*

公开来源：论文 `https://arxiv.org/abs/2102.03334`，官方项目 `https://github.com/dandelin/vilt`。

##### 核心流程代码

```python
# ViLT: concatenate text tokens and image patch tokens into one Transformer

def vilt_forward(image, input_ids, attention_mask):
    text_tok = word_embedding(input_ids) + text_pos_embedding(input_ids)
    text_tok = text_tok + modality_embedding("text")

    patches = patchify(image, patch_size=32)             # [N_patches, 32*32*3]
    image_tok = linear_patch_projection(patches)
    image_tok = image_tok + image_pos_embedding(patches)
    image_tok = image_tok + modality_embedding("image")

    cls = cls_token + modality_embedding("text")
    sequence = concat([cls, text_tok, image_tok])
    hidden = transformer(sequence, attention_mask)

    cls_hidden = hidden[0]
    itm_logits = itm_head(cls_hidden)
    mlm_logits = mlm_head(hidden[text_positions_masked])
    return itm_logits, mlm_logits, hidden
```

##### 关键公式

图像 \(I \in \mathbb{R}^{C \times H \times W}\) 被切成 \(N\) 个 patch，单个 patch 展平后维度为 \(P^2C\)。ViLT 的视觉 token 只做线性投影：

$$
v_k = W_p\,\mathrm{vec}(I_k) + e^{\mathrm{pos}}_k + e^{\mathrm{mod}}_{\mathrm{image}}
$$

文本 token 则使用词嵌入、位置嵌入和文本模态嵌入：

$$
t_l = E(w_l) + e^{\mathrm{pos}}_l + e^{\mathrm{mod}}_{\mathrm{text}}
$$

单流输入序列为：

$$
Z^0 = [z_{\mathrm{cls}};\,t_1,\ldots,t_L;\,v_1,\ldots,v_N]
$$

主训练目标可概括为：

$$
\mathcal{L}
= \mathcal{L}_{\mathrm{MLM}}
+ \mathcal{L}_{\mathrm{ITM}}
+ 0.1\,\mathcal{W}_{\mathrm{WPA}}
$$

其中 \(\mathcal{W}_{\mathrm{WPA}}\) 是 word-patch alignment 中通过 optimal transport 近似得到的词-token 与 patch-token 对齐距离，作为 ITM 的附加对齐项。

##### 方法解读

ViLT 要解决的是早期 VLP 的速度和归纳偏置问题。UNITER、LXMERT、ViLBERT、Oscar 等模型通常先用 Visual Genome 监督的目标检测器抽取 region features，再把这些区域向量送入跨模态 Transformer。这个流程的瓶颈往往不在 Transformer，而在检测器、RoI、NMS 和 CNN backbone；而且区域检测器的视觉词表由固定对象类别和属性定义，会限制模型表达未标注、非物体或细粒度视觉模式的能力。

ViLT 的激进之处在于把视觉 embedder 简化到和文本 embedder 同一量级。文本进入 Transformer 前只是 token lookup 加位置嵌入；ViLT 让图像也只经过 \(32 \times 32\) patch 切分和线性投影。这样，视觉 token 不再带有检测器预先编码的对象语义，跨模态 Transformer 必须自己从 patch 与词之间学习关系。代价是底层视觉先验减少，收益是端到端、低延迟、无区域标注依赖。

单流 Transformer 是 ViLT 保持性能的关键。模型把 `[CLS]`、文本 token 和图像 patch token 拼成一条序列，通过同一套自注意力层传播信息；自注意力天然允许文本词关注图像 patch，也允许图像 patch 互相交互。论文还从预训练 ViT 初始化交互层，而不是常见的 BERT 初始化，因为在没有深视觉 embedder 的情况下，Transformer 层需要更强的视觉 patch 处理能力。

训练目标延续 VLP 的两个核心任务。ITM 判断图文是否匹配，使用 `[CLS]` 表示做二分类；MLM 遮盖文本 token 并要求模型恢复词。ViLT 特别强调 whole word masking，因为普通 wordpiece 随机遮盖可能留下同一词的其他子词，让模型只靠语言上下文猜答案。例如只遮掉 `giraffe` 的中间子词时，模型不需要看图也能恢复；整词遮盖会迫使模型利用图像 patch 信息。

WPA 是 ViLT 为弥补没有 region-level supervision 而设计的细粒度对齐约束。它从最后一层隐藏状态中取文本子集和视觉子集，用最优传输近似计算词与 patch 的匹配成本，并把该距离以 0.1 权重加入 ITM 损失。直觉上，ITM 只告诉模型整图整句是否匹配，WPA 则鼓励模型知道“哪个词对应哪些 patch”，因此更接近早期 region-word alignment 的作用，但不需要检测器产生候选框。

ViLT 的贡献不在于刷新所有精度榜，而在于重新定义 VLP 计算分配。论文的分类把 VLP 模型拆成 Visual Embedder、Textual Embedder 和 Modality Interaction 三部分；ViLT 证明视觉嵌入不必永远是最重模块，跨模态 Transformer 本身可以承担更多视觉-语言联合建模。后续大量轻量 VLM、patch-level encoder 和端到端多模态 Transformer 都继承了这种去检测器化方向。

#### 🧪 练习题
```yaml
question: "ViLT 相比 region-feature VLP 模型最核心的结构变化是什么？"
options:
  - "把图像先转换成目标检测框，再输入双流 Transformer"
  - "直接用线性 patch projection 生成视觉 token，并与文本 token 拼接进单流 Transformer"
  - "只训练文本编码器，冻结所有视觉模块"
  - "用生成式 caption loss 替代所有匹配损失"
answer: 1
explain: "ViLT 的关键是完全移除检测器和 CNN 区域特征流程，把图像 patch 当作 token，与文本 token 一起输入统一 Transformer，从而大幅降低视觉嵌入开销。"
```

### ALBEF

```yaml
id: albef
num: 4
name: ALBEF
full_name: ALBEF
year: '2021'
org: Salesforce
parent: clip
paper_url: NeurIPS 2021
project_url: ''
category: encoder_decoder
motivation: 对齐后融合+动量蒸馏处理噪声
```

#### 📝 一句话总结
ALBEF 提出在跨模态融合之前先通过对比学习对齐图像与文本表征，并引入动量蒸馏（Momentum Distillation）从噪声网络数据中学习鲁棒的多模态表征，在图文检索、VQA、NLVR2、视觉蕴含等多项下游任务上取得当时的 SOTA 性能。

#### 🎯 核心要点
- **"先对齐再融合"架构**：图像编码器（ViT-B/16）和文本编码器（BERT 前 6 层）先独立编码，通过 ITC 对比损失在融合前对齐单模态表征，再送入 6 层多模态编码器进行深度交互
- **三大预训练目标联合优化**：Image-Text Contrastive Learning（ITC）、Image-Text Matching（ITM）、Masked Language Modeling（MLM）
- **动量蒸馏（MoD）**：维护一个指数移动平均的动量模型，生成伪标签（软目标）替代噪声的 one-hot 标签，显著提升对网络噪声数据的鲁棒性
- **难负例挖掘**：利用 ITC 的对比相似度选取最具迷惑性的负样本用于 ITM 训练，提升细粒度匹配能力
- **预训练数据**：使用 4M 或 14M 规模的网络图文对数据（来自 Conceptual Captions、SBU、COCO、Visual Genome 等）
- **下游任务全面 SOTA**：在 Flickr30K 检索（TR R@1 95.9%）、COCO 检索、VQA（76.04）、NLVR2（82.55）、Visual Entailment（80.91）等任务上超越同期方法

#### 🔬 深入细节
##### 模型架构总览

![ALBEF 模型架构图](https://ar5iv.labs.arxiv.org/html/2107.07651/assets/x1.png)
*图：ALBEF 预训练框架。左侧为图像编码器（12 层 ViT）和文本编码器（6 层 Transformer），右侧为多模态编码器（6 层带交叉注意力的 Transformer）。三个预训练目标 ITC、ITM、MLM 联合优化。动量模型（虚线框）用于生成伪标签进行蒸馏。*

##### 算法伪代码

```python
# ALBEF 预训练伪代码
# 初始化
image_encoder = ViT_B_16()          # 12层 Vision Transformer
text_encoder = BERT_base[:6]         # BERT 前6层
multimodal_encoder = BERT_base[6:]   # BERT 后6层 + 交叉注意力
# 动量模型（指数移动平均）
mom_image_encoder = copy(image_encoder)
mom_text_encoder = copy(text_encoder)
mom_multimodal_encoder = copy(multimodal_encoder)

for images, texts in dataloader:
    # === 单模态编码 ===
    img_feat = image_encoder(images)       # [B, N+1, D], 含[CLS]
    txt_feat = text_encoder(texts)         # [B, L, D], 含[CLS]
    img_cls = normalize(img_proj(img_feat[:, 0]))  # 图像[CLS]投影
    txt_cls = normalize(txt_proj(txt_feat[:, 0]))  # 文本[CLS]投影

    # === 1. ITC: Image-Text Contrastive Loss ===
    sim_i2t = img_cls @ txt_cls.T / tau   # 温度缩放的相似度矩阵
    # 动量模型生成软目标
    with no_grad():
        mom_img_cls = mom_image_encoder(images)[:, 0]
        mom_txt_cls = mom_text_encoder(texts)[:, 0]
        soft_target = softmax(mom_img_cls @ mom_txt_cls.T / tau)
    # ITC损失 = (1-α)*CE(sim, one_hot) + α*KL(sim, soft_target)
    L_itc = (1 - alpha) * cross_entropy(sim_i2t, labels) \
          + alpha * kl_div(log_softmax(sim_i2t), soft_target)

    # === 2. ITM: Image-Text Matching Loss ===
    # 利用ITC相似度挖掘难负例
    hard_neg_texts = select_hard_negatives(sim_i2t, texts)
    hard_neg_images = select_hard_negatives(sim_i2t.T, images)
    # 正样本 + 难负例 送入多模态编码器
    itm_logits = multimodal_encoder(img_feat, txt_feat)  # 交叉注意力融合
    L_itm = binary_cross_entropy(itm_logits, match_labels)

    # === 3. MLM: Masked Language Modeling Loss ===
    masked_texts = random_mask(texts, prob=0.15)
    masked_feat = text_encoder(masked_texts)
    mlm_logits = multimodal_encoder(img_feat, masked_feat)
    # 动量蒸馏：软目标替代one-hot
    with no_grad():
        mom_mlm_soft = mom_multimodal_encoder(mom_img_feat, mom_masked_feat)
    L_mlm = (1 - alpha) * cross_entropy(mlm_logits, true_tokens) \
          + alpha * kl_div(log_softmax(mlm_logits), softmax(mom_mlm_soft))

    # === 总损失 ===
    loss = L_itc + L_itm + L_mlm
    loss.backward()
    optimizer.step()

    # === 更新动量模型 ===
    mom_image_encoder = m * mom_image_encoder + (1 - m) * image_encoder   # m=0.995
    mom_text_encoder = m * mom_text_encoder + (1 - m) * text_encoder
    mom_multimodal_encoder = m * mom_multimodal_encoder + (1 - m) * multimodal_encoder
```

##### 动机与背景

视觉-语言预训练（VLP）旨在从大规模图文对中学习通用的多模态表征。在 ALBEF 之前，主流方法面临两大核心问题：

1. **视觉特征瓶颈**：早期方法（如 ViLBERT、UNITER）依赖预训练的目标检测器（如 Faster R-CNN）提取区域特征，导致计算开销巨大且视觉特征无法端到端优化。虽然 ViLT 尝试直接使用图像 Patch，但其简单拼接的方式缺乏有效的跨模态对齐。

2. **网络数据噪声**：从互联网收集的图文对（如 Conceptual Captions）普遍存在文本与图像弱相关甚至不相关的噪声问题。传统方法使用 one-hot 标签监督，将每个图文对视为严格匹配/不匹配，无法处理这种模糊性。

> 💡 关键洞察：ALBEF 的核心思想是"**先对齐，再融合**"——在将图像和文本特征送入昂贵的多模态融合模块之前，先通过轻量级的对比学习将两个模态的表征空间对齐，使融合模块能更高效地学习细粒度的跨模态交互。

##### 核心机制详解

**（1）模型架构：三段式设计**

ALBEF 采用三段式架构，而非传统的单一 Transformer：

- **图像编码器**：12 层 ViT-B/16，将 \(256 \times 256\) 图像分割为 \(16 \times 16\) 的 Patch 序列，输出 \(\{v_{\text{cls}}, v_1, \ldots, v_N\}\)，其中 \(N = 256\)（含 1 个 [CLS] token）。使用 ImageNet-1K 预训练的 DeiT 权重初始化。

- **文本编码器**：6 层 Transformer（取 BERT-base 前 6 层），输出 \(\{w_{\text{cls}}, w_1, \ldots, w_L\}\)。使用 BERT-base 预训练权重初始化。

- **多模态编码器**：6 层带交叉注意力（Cross-Attention）的 Transformer（取 BERT-base 后 6 层，并插入交叉注意力层）。文本特征作为 Query，图像特征作为 Key/Value，通过交叉注意力实现深度融合。

> ⚠️ 注意：多模态编码器中的交叉注意力层是新增的（随机初始化），而自注意力和前馈层则继承自 BERT-base 后 6 层的权重。

**（2）三大预训练目标**

**Image-Text Contrastive Learning (ITC)**：在融合之前对齐单模态表征。将图像 [CLS] 和文本 [CLS] 分别通过线性投影映射到归一化的低维空间，计算余弦相似度：

$$s(I, T) = g_v(v_{\text{cls}})^\top g_w(w_{\text{cls}})$$

其中 \(g_v, g_w\) 为线性投影头。对比损失采用 InfoNCE 形式，正样本为匹配的图文对，负样本来自同一 batch 内的其他样本。此外，ALBEF 维护两个动量队列（momentum queue）存储最近的特征向量，扩大负样本数量而不增加 GPU 显存开销。

**Image-Text Matching (ITM)**：二分类任务，判断图文对是否匹配。将图像和文本特征送入多模态编码器，取输出的 [CLS] token 经线性分类头预测匹配概率。关键创新在于**难负例挖掘**：利用 ITC 计算的相似度矩阵，为每张图像选择与之最相似但不匹配的文本作为负样本（反之亦然），迫使模型学习更细粒度的区分能力。

$$p^{\text{itm}} = \text{softmax}(f_{\text{cls}}(\text{MultimodalEnc}(v, w)))$$

**Masked Language Modeling (MLM)**：随机遮蔽 15% 的文本 token，利用图像信息和上下文预测被遮蔽的词。与 BERT 的 MLM 不同，这里的预测同时依赖文本上下文和视觉信息，迫使模型学习细粒度的视觉-语言对齐。

$$L_{\text{mlm}} = \mathbb{E}_{(I,\hat{T}) \sim D}\, H\big(y^{\text{msk}},\, p^{\text{msk}}(I, \hat{T})\big)$$

其中 \(\hat{T}\) 是遮蔽后的文本，\(y^{\text{msk}}\) 是被遮蔽 token 的真实标签。

**（3）动量蒸馏（Momentum Distillation, MoD）**

这是 ALBEF 最重要的创新之一。核心思想是：网络图文对的 one-hot 标签不可靠（一张图可能与多个文本相关），因此用动量模型生成的软标签（soft pseudo-targets）替代硬标签。

动量模型是在线模型的指数移动平均（EMA）版本：

$$\theta' = m \cdot \theta' + (1 - m) \cdot \theta, \quad m = 0.995$$

对于 ITC 损失，动量模型生成的软目标为：

$$q^{\text{i2t}} = \frac{\exp(s'(I, T_i) / \tau)}{\sum_j \exp(s'(I, T_j) / \tau)}$$

最终 ITC 损失变为原始 CE 损失与 KL 散度的加权组合：

$$L_{\text{itc}}^{\text{mod}} = (1 - \alpha) \cdot H(y^{\text{i2t}}, p^{\text{i2t}}) + \alpha \cdot \text{KL}(q^{\text{i2t}} \| p^{\text{i2t}})$$

类似地，MLM 损失也引入动量蒸馏。这使得模型能从动量模型的"集体智慧"中学习，即使原始标签有噪声，软目标也能提供更准确的监督信号。

> 💡 关键：动量蒸馏的本质是**自训练（self-training）**——用模型自身的平滑版本生成伪标签。由于 EMA 模型是多步训练的集成，其预测比单步模型更稳定，能有效抑制噪声标签的影响。

##### 下游任务适配与训练流程

ALBEF 的下游任务适配非常灵活：

- **图文检索**：直接使用 ITC 相似度进行粗排，再用 ITM 分数精排。ITC 提供高效的全局匹配，ITM 提供精确的细粒度判断。
- **VQA**：将多模态编码器的输出接一个 6 层 Transformer 解码器，以自回归方式生成答案（开放式生成而非分类）。
- **NLVR2**：需要判断两张图片与一段文本的关系。ALBEF 对两张图分别与文本进行多模态编码，然后合并 [CLS] 特征进行分类。
- **Visual Entailment**：类似 ITM，判断图像是否蕴含文本假设。

预训练配置：使用 AdamW 优化器，学习率 \(1 \times 10^{-4}\)（图像编码器 \(1 \times 10^{-5}\)），在 8 张 A100 上训练 30 个 epoch（4M 数据）。

##### 与传统方法的关键区别

| 特性 | 传统方法（UNITER等） | ViLT | ALBEF |
|------|---------------------|------|-------|
| 视觉特征 | 目标检测器（Faster R-CNN） | 原始 Patch | 原始 Patch（ViT） |
| 跨模态交互 | 直接拼接融合 | 直接拼接融合 | **先对齐再融合** |
| 噪声处理 | 无 | 无 | **动量蒸馏** |
| 负例策略 | 随机采样 | 随机采样 | **难负例挖掘** |
| 推理效率 | 慢（需检测器） | 快 | 中等（三段式） |

ALBEF 的核心优势在于：(1) 对比学习预对齐使融合更高效；(2) 动量蒸馏使模型对噪声数据鲁棒；(3) 端到端训练避免了目标检测器的瓶颈。

#### 🧪 练习题
```yaml
question: "ALBEF 中动量蒸馏（Momentum Distillation）的主要目的是什么？"
options:
  - "加速模型训练收敛"
  - "增加负样本数量以改善对比学习"
  - "用动量模型生成软伪标签，缓解网络图文对的噪声标签问题"
  - "减少多模态编码器的计算开销"
answer: 2
explain: "网络爬取的图文对存在大量噪声（文本与图像弱相关），one-hot 硬标签不可靠。动量蒸馏通过 EMA 模型生成软目标分布，为 ITC 和 MLM 提供更准确的监督信号，显著提升模型对噪声数据的鲁棒性。"
```

### BLIP

```yaml
id: blip
num: 5
name: BLIP
full_name: BLIP
year: '2022'
org: Salesforce
parent: albef
paper_url: ICML 2022
project_url: ''
category: encoder_decoder
motivation: CapFilt数据引导提升质量
```

#### 📝 一句话总结
BLIP 提出 Multimodal Mixture of Encoder-Decoder（MED）和 Captioning-and-Filtering（CapFilt），用一个可切换为编码器/解码器的视觉语言模型同时服务理解与生成任务，并通过“生成合成标题 + 过滤噪声文本”提升网络图文数据质量。

#### 🎯 核心要点
- **统一架构 MED**：同一套视觉编码器与文本 Transformer 可作为 unimodal encoder、image-grounded text encoder、image-grounded text decoder 使用。
- **三目标联合预训练**：ITC 对齐全局图文表示，ITM 学习细粒度匹配，LM 以自回归方式生成图像条件文本。
- **参数共享设计**：image-grounded encoder 与 decoder 共享 embedding、cross-attention 和 FFN，仅区分双向 self-attention 与因果 self-attention。
- **CapFilt 数据闭环**：先用预训练 MED 微调 Captioner 和 Filter，再为 web images 生成 synthetic captions，并过滤原始 web texts 与 synthetic texts 中的噪声。
- **继承 ALBEF 的稳健训练技巧**：ITC 使用动量编码器软标签处理潜在正例，ITM 使用 hard negative mining 强化细粒度判别。
- **训练数据强调质量提升**：在 COCO、Visual Genome、Conceptual Captions、Conceptual 12M、SBU，以及扩展 LAION 子集上验证 CapFilt 的可扩展性。

#### 🔬 深入细节
##### 框架图与关键流程

![BLIP MED 预训练架构](https://ar5iv.labs.arxiv.org/html/2201.12086/assets/x2.png)
*图：BLIP 的 MED 以同一视觉编码器连接三种文本功能形态，分别计算 ITC、ITM 和 LM。*

![BLIP CapFilt 数据自举流程](https://ar5iv.labs.arxiv.org/html/2201.12086/assets/x3.png)
*图：CapFilt 先从预训练 MED 派生 Captioner 与 Filter，再用合成标题和过滤后的标题构造更干净的预训练语料。*

##### 算法/流程伪代码

```python
# BLIP + CapFilt 训练流程伪代码
web_pairs = {(image_w, text_w)}
human_pairs = {(image_h, text_h)}  # COCO / VG 等高质量标注

# 1. 在原始图文对上预训练一个 MED
med = MultimodalMixtureEncoderDecoder()
for image, text in pretrain_loader(web_pairs + human_pairs):
    image_feat = med.visual_encoder(image)

    # Unimodal encoder: ITC
    img_cls, txt_cls = med.encode_unimodal(image_feat, text)
    loss_itc = contrastive_loss_with_momentum_targets(img_cls, txt_cls)

    # Image-grounded text encoder: ITM
    hard_neg = sample_hard_negatives(img_cls, txt_cls)
    loss_itm = image_text_matching_loss(med, image_feat, text, hard_neg)

    # Image-grounded text decoder: LM
    loss_lm = autoregressive_caption_loss(med, image_feat, text)

    update(med, loss_itc + loss_itm + loss_lm)

# 2. 从 MED 派生两个数据自举模块
captioner = finetune_as_decoder(med, human_pairs)  # image -> synthetic caption
filter_model = finetune_as_matching_encoder(med, human_pairs)  # image/text -> match?

# 3. 对 web 图像生成并过滤文本
bootstrapped_pairs = []
for image_w, text_w in web_pairs:
    text_s = captioner.generate(image_w, sampling="nucleus")

    if filter_model.is_matched(image_w, text_w):
        bootstrapped_pairs.append((image_w, text_w))
    if filter_model.is_matched(image_w, text_s):
        bootstrapped_pairs.append((image_w, text_s))

# 4. 用过滤后数据重新预训练最终 BLIP
final_train_set = bootstrapped_pairs + human_pairs
blip = pretrain_MED(final_train_set, objectives=["ITC", "ITM", "LM"])
```

##### 1. 动机：统一模型能力与清洗网络噪声是同一个问题

BLIP 的出发点有两层。第一层是模型形态问题：CLIP/ALBEF 一类 encoder-based 模型擅长检索、匹配、分类等理解任务，但直接做 captioning、VQA answer generation 并不自然；纯 encoder-decoder 生成模型可以生成文本，但通常没有高效的全局图文对齐能力，检索效果不稳定。BLIP 的 MED 把这两类能力放进一个可切换的多模态 Transformer 里，使同一个模型既能学图文对比，也能学图像条件语言建模。

第二层是数据质量问题：大规模 VLP 依赖 web alt-text，但网页文本经常只是文件名、广告语、上下文碎片，未必描述图像主体。直接扩大噪声数据会提高覆盖面，却把错误对齐也放大。CapFilt 的设计把模型能力反过来用于数据自举：Captioner 给图像补充更“视觉中心”的描述，Filter 删除不匹配的原始文本和合成文本，因此预训练信号不再完全受原始 alt-text 质量限制。

##### 2. MED：三种功能由同一骨架切换出来

BLIP 使用 ViT 作为视觉编码器，把图像切成 patch 后输出视觉 token 序列；文本侧使用 BERT 风格 Transformer，并插入 cross-attention 来接收视觉信息。MED 的关键不是简单堆三个模型，而是把文本模块切成三种工作模式：unimodal encoder 只看文本，用于和图像全局表示做对比；image-grounded text encoder 使用双向 self-attention 和 cross-attention，用于判断一对图文是否匹配；image-grounded text decoder 把 self-attention 改成 causal mask，用于从左到右生成标题。

三种目标可以写成总损失：

$$
\mathcal{L}_{\text{BLIP}}
= \mathcal{L}_{\text{ITC}}
+ \mathcal{L}_{\text{ITM}}
+ \mathcal{L}_{\text{LM}} .
$$

ITC 在融合前对齐图像和文本的全局 embedding。令归一化后的图像/文本向量为 \(v_i,t_j\)，温度为 \(\tau\)，图像到文本的概率为：

$$
p_{i \rightarrow j}
= \frac{\exp(v_i^\top t_j / \tau)}
{\sum_k \exp(v_i^\top t_k / \tau)} .
$$

BLIP 沿用 ALBEF 的动量编码器软标签：batch 内某些“负例”可能其实也是合理描述，硬 one-hot 会误惩罚这些潜在正例。动量模型给出的相似度分布可作为更平滑的目标，ITC 因而兼具对齐与抗噪能力。

##### 3. ITM 与 LM：一个负责判别，一个负责生成

ITM 激活 image-grounded text encoder。它不是只比较两个全局向量，而是让文本 token 通过 cross-attention 读取视觉 token，再由 `[Encode]` 表示预测 match/unmatch。负样本也不是纯随机采样，而是按 ITC 相似度挑选最像正样本的 hard negatives。这样训练出来的匹配头会被迫关注局部实体、属性和关系，而不是只利用粗粒度主题相似性。

LM 激活 image-grounded text decoder。给定图像 \(I\) 和文本序列 \(T=(w_1,\dots,w_L)\)，它最大化自回归似然：

$$
\mathcal{L}_{\text{LM}}
= - \sum_{\ell=1}^{L} \log p_\theta(w_\ell \mid w_{<\ell}, I).
$$

这一步使 BLIP 获得图像描述生成能力，也为 CapFilt 的 Captioner 提供基础。与 MLM 相比，LM 直接训练“视觉信息到自然语言”的转换，因此更适合 captioning、开放式 VQA 和后续合成标题。

##### 4. CapFilt：Captioner 与 Filter 是数据质量控制器

CapFilt 的具体流程是：先用噪声 web 数据和高质量标注数据预训练一个 MED；再用 COCO 等人工标注数据分别微调 Captioner 和 Filter。Captioner 是 image-grounded decoder，输入 web image 输出 synthetic caption；Filter 是 image-grounded encoder，用 ITC/ITM 判断某个文本是否真的匹配图像。

过滤规则可以抽象为：

$$
\mathcal{D}_{\text{boot}}
= \{(I_w,T_w) \mid F(I_w,T_w)=1\}
\cup
\{(I_w,T_s) \mid F(I_w,T_s)=1\}
\cup \mathcal{D}_{\text{human}} .
$$

其中 \(T_w\) 是原始网页文本，\(T_s\) 是合成标题。这个集合既保留了 web 数据的规模，又用 Filter 控制语义对齐质量。论文中特别强调合成标题的多样性：nucleus sampling 生成的标题噪声率更高，但信息更丰富，经过过滤后比 beam search 生成的保守标题更能提升下游性能。

##### 5. 与 ALBEF 和传统 VLP 的区别

BLIP 的 parent 可视为 ALBEF，因为它继承了 ITC/ITM、动量软标签、hard negative mining 等思想；但 BLIP 的核心增量在两个地方。其一，ALBEF 主要是理解型 encoder 框架，而 BLIP 把 decoder 作为一等公民纳入预训练目标，统一了检索、匹配、captioning、VQA 等任务。其二，ALBEF 侧重在噪声标签上做软监督，BLIP 进一步把模型用作数据清洗和数据生成工具，用 CapFilt 改造下一轮训练语料。

这种设计的优势是工程上很实用：视觉编码器只需一次前向，文本侧按不同功能分支计算三个损失；下游任务也可以按需要选择 encoder 或 decoder 形态。检索时用 ITC 快速召回、ITM 精排；captioning 时直接用 decoder；VQA 则把问题和图像作为条件生成答案。

#### 🧪 练习题
```yaml
question: "BLIP 中 CapFilt 的核心作用是什么？"
options:
  - "把图像 patch 压缩成固定数量视觉 token"
  - "通过 Captioner 生成合成标题，并用 Filter 删除不匹配的原始/合成文本"
  - "只用图文对比学习替代所有生成目标"
  - "冻结视觉编码器，只训练语言模型"
answer: 1
explain: "CapFilt 是 BLIP 的数据自举机制：Captioner 补充视觉相关标题，Filter 控制图文匹配质量，最终得到更干净、更有信息量的预训练图文对。"
```

### Flamingo

```yaml
id: flamingo
num: 6
name: Flamingo
full_name: Flamingo
year: '2022'
org: DeepMind
parent: —
paper_url: NeurIPS 2022
project_url: ''
category: connector
motivation: 冻结双塔+门控交叉注意力
```

#### 📝 一句话总结
Flamingo 通过 Perceiver Resampler 将任意数量的图像/视频特征压缩成固定视觉 token，再用从零训练的 gated cross-attention-dense 层接入冻结语言模型，使一个 80B 视觉语言模型可以用少量图文示例完成 captioning、VQA、视觉对话和视频问答。

#### 🎯 核心要点
- **冻结双塔再连接**：冻结预训练 NFNet-F6 视觉编码器和 Chinchilla 语言模型，只训练 Perceiver Resampler 与 gated xattn-dense 适配层。
- **Perceiver Resampler**：把可变分辨率图像或多帧视频的时空特征压缩为固定 64 个视觉 token，降低语言模型跨注意力成本。
- **门控交叉注意力注入视觉信息**：在冻结 LM 层之间插入新训练的 cross-attention + FFN，并用 \(\tanh(\alpha)\) 门控使初始状态等价于原语言模型。
- **支持任意图文交错序列**：输入可包含多张图片/视频与文本，借助 per-image/video attention masking 控制每个文本 token 可看的视觉上下文。
- **网页级多模态预训练数据**：使用 M3W interleaved webpages、ALIGN image-text pairs、LTIP long image-text pairs 和 VTP video-text pairs 的加权语言建模目标。
- **少样本任务适配**：推理时用交错的 support examples 和 query 组成 prompt，不需要为每个任务更新模型参数。

#### 🔬 深入细节
##### 架构图与核心模块

![Flamingo 总体架构](https://ar5iv.labs.arxiv.org/html/2204.14198/assets/x38.png)
*图：Flamingo 用 Perceiver Resampler 处理视觉特征，并在冻结 LM 中插入 gated xattn-dense 层来注入视觉上下文。*

![Flamingo Perceiver Resampler](https://ar5iv.labs.arxiv.org/html/2204.14198/assets/x42.png)
*图：Perceiver Resampler 以可学习 latent queries 查询图像/视频时空特征，输出固定数量视觉 token。*

![Flamingo Gated XAttn-Dense](https://ar5iv.labs.arxiv.org/html/2204.14198/assets/x39.png)
*图：gated xattn-dense 块由 cross-attention 和 dense FFN 组成，两个残差分支都带可学习 tanh 门控。*

##### 算法/流程伪代码

```python
# Flamingo 预训练与少样本推理伪代码
vision_encoder = FrozenNFNetF6()
language_model = FrozenChinchillaLM()
resampler = PerceiverResampler(num_latents=64)
gated_layers = insert_gated_xattn_dense(language_model, frequency="model_size_dependent")

def encode_visual(media):
    # media 可以是单张图像，也可以是视频帧序列
    grid = vision_encoder(media)              # [T, H, W, D] or [H, W, D]
    grid = add_temporal_embedding(grid)
    visual_tokens = resampler(flatten(grid))  # [64, D_lm]
    return visual_tokens

for batch in mixed_datasets:  # M3W / ALIGN / LTIP / VTP
    text_tokens, media_positions, media_items = batch
    visual_cache = [encode_visual(m) for m in media_items]

    loss = 0
    for token_index, target_token in enumerate(text_tokens):
        visible_media = last_media_before(token_index, media_positions)
        xattn_mask = allow_only(visual_cache[visible_media])

        logits = language_model.forward_with_gated_xattn(
            prefix=text_tokens[:token_index],
            visual_tokens=visual_cache,
            visual_mask=xattn_mask,
            trainable_layers=gated_layers,
        )
        loss += cross_entropy(logits, target_token)

    update([resampler, gated_layers], loss)  # vision encoder 和 LM 均冻结

# 推理：把少量示例和待回答图像拼成交错 prompt
prompt = [
    image_1, "Question: ... Answer: ... <EOC>",
    image_2, "Question: ... Answer: ... <EOC>",
    query_image, "Question: ... Answer:"
]
answer = autoregressive_decode(language_model, prompt)
```

##### 1. 动机：让大语言模型获得视觉 in-context learning

Flamingo 解决的问题不是单个 VQA benchmark 上的微调精度，而是“能否像 GPT-3 处理文本任务一样，用几个多模态示例快速适配新视觉任务”。早期视觉语言模型通常依赖任务特定头或大规模任务内微调；CLIP/ALIGN 的双塔表示适合检索和分类，却不自然地产生开放文本答案；把视觉 token 直接拼进语言模型又会带来序列长度和稳定性问题。

Flamingo 的取舍很明确：保留已经很强的预训练视觉模型和语言模型，不反向更新它们的大部分参数；在二者之间训练一个可扩展连接器。这样既减少训练成本，又降低“多模态训练破坏语言模型能力”的风险。门控层初始化为近似关闭，使模型一开始等价于原始 LM，然后逐步学习何时读取视觉信息。

##### 2. Perceiver Resampler：把可变视觉输入压成固定接口

视觉编码器输出的是空间网格；视频还多一个时间维。若让语言模型对所有 patch/帧做 cross-attention，代价会随分辨率和帧数快速增长。Flamingo 用 Perceiver Resampler 建立固定带宽的视觉接口：先把视觉特征 \(X \in \mathbb{R}^{T \times S \times d}\) 展平为 \(X_f \in \mathbb{R}^{TS \times d}\)，再用 \(R=64\) 个可学习 latent queries \(Z \in \mathbb{R}^{R \times d}\) 反复 cross-attend 到视觉特征。

一层 Resampler 可抽象为：

$$
Z \leftarrow Z + \operatorname{Attn}(Q=Z,\ K=[X_f;Z],\ V=[X_f;Z]),
$$

$$
Z \leftarrow Z + \operatorname{FFN}(Z).
$$

论文中一个细节是 keys/values 不只来自视觉特征 \(X_f\)，还拼接了当前 latents \(Z\)。这让 latent token 之间也能在重采样过程中交换信息。最终输出固定 64 个视觉 token，无论输入是一张图、不同分辨率图像，还是多帧视频，都给语言模型一个一致的视觉上下文形状。

##### 3. Gated XAttn-Dense：在不破坏冻结 LM 的前提下注入视觉

Flamingo 不把视觉 token 直接拼到文本序列里，而是在冻结 LM block 之间插入新训练的 gated xattn-dense 层。给定语言隐藏状态 \(y\) 和视觉 token \(x\)，新增层的核心计算可写为：

$$
y \leftarrow y + \tanh(\alpha_{\text{xattn}})
\operatorname{CrossAttn}(Q=y,\ K=x,\ V=x),
$$

$$
y \leftarrow y + \tanh(\alpha_{\text{ffn}})
\operatorname{FFN}(y).
$$

\(\alpha_{\text{xattn}}\) 和 \(\alpha_{\text{ffn}}\) 是逐层可学习标量，初始化为 0；因此 \(\tanh(0)=0\)，训练开始时新分支不会改变 LM 输出。这是 Flamingo 稳定训练的关键：它不是强行让 LM 立刻消费视觉特征，而是在语言先验保持完整的情况下逐步打开视觉通道。

##### 4. 图文交错输入：视觉注意力也要因果化

Flamingo 的训练样本可以来自网页：文本中间插入 `<image>`，每个 chunk 以 `<EOC>` 标记结束。对第 \(\ell\) 个文本 token，模型只允许 cross-attend 到它前面最近一张图像/视频的视觉 token，而不是看所有历史图片。目标似然可概括为：

$$
p_\theta(y \mid x)
= \prod_{\ell=1}^{L}
p_\theta(y_\ell \mid y_{<\ell},\ \mathcal{V}_{<\ell}),
$$

其中 \(\mathcal{V}_{<\ell}\) 是当前位置之前可见的视觉输入。虽然 cross-attention 一次只看最近视觉输入，冻结 LM 的 self-attention 仍然能把早先图片对应的文本描述带到后续上下文里。这种 masking 让训练时最多 5 张图的模型，在评估时仍可用 32-shot 图文示例 prompt。

##### 5. 训练目标与数据混合

Flamingo 的主训练目标是多数据源加权的文本负对数似然：

$$
\mathcal{L}
= \sum_{m=1}^{M} \lambda_m
\mathbb{E}_{(x,y)\sim \mathcal{D}_m}
\left[-\sum_{\ell=1}^{L}\log p_\theta(y_\ell \mid y_{<\ell}, x)\right].
$$

数据源包括 M3W（约 4300 万网页抽取的交错图文）、ALIGN（18 亿图文对）、LTIP（3.12 亿更长描述图文对）和 VTP（2700 万视频文本对）。成对图文数据会被改写成类似 M3W 的格式，即 caption 前后加 `<image>` 和 `<EOC>`，统一成语言建模问题。这样 Flamingo 不需要为 captioning、VQA、分类分别设计 loss；任务差异主要由 prompt 表达。

##### 6. 与传统连接器方法的区别

Flamingo 的连接器思想和后来的 BLIP-2/Q-Former、LLaVA 投影层都不同。它面向的是“冻结巨大 LM 的少样本通用性”：Perceiver Resampler 控制视觉 token 数，gated xattn-dense 控制视觉信息进入 LM 的强度，per-image masking 控制交错序列的因果结构。代价是新增适配层参数并不小，80B 模型中 gated xattn-dense 约 10B 参数；但换来的是不必对每个下游任务微调，就能通过上下文示例完成开放式视觉语言任务。

#### 🧪 练习题
```yaml
question: "Flamingo 的 gated cross-attention 为什么要用 tanh 门控并初始化为 0？"
options:
  - "让新增视觉分支在训练初始不改变冻结语言模型输出，从而提升稳定性"
  - "把 64 个视觉 token 压缩成 1 个全局 token"
  - "强制语言模型只能处理单张图片"
  - "替代所有文本 self-attention 层"
answer: 0
explain: "门控参数初始为 0 时 tanh 输出为 0，新增 cross-attention 和 FFN 残差分支暂时关闭，模型初始行为接近原始冻结 LM，随后再学习使用视觉信息。"
```

### PaLI

```yaml
id: pali
num: 7
name: PaLI
full_name: PaLI
year: '2022'
org: Google
parent: —
paper_url: arXiv
project_url: ''
category: encoder_decoder
motivation: 视觉语言联合缩放定律
```

#### 📝 一句话总结
PaLI 提出一个简洁的 ViT + mT5 encoder-decoder 架构，用文本生成接口统一 captioning、VQA、OCR、检测和纯语言任务，并通过 WebLI 多语言数据与 ViT/mT5 联合缩放证明视觉侧和语言侧都需要同步增大。

#### 🎯 核心要点
- **统一 text-in/text-out 接口**：输入图像和文本 prompt，输出文本序列，不为不同任务添加专用分类头。
- **架构简单可扩展**：ViT 输出 patch features 作为视觉 token 送入 mT5 encoder，decoder 以 teacher forcing 学习目标文本。
- **联合缩放结论**：PaLI-3B 使用 mT5-Large + ViT-G，PaLI-15B 使用 mT5-XXL + ViT-G，PaLI-17B 使用 mT5-XXL + 4B 参数 ViT-e。
- **WebLI 多语言语料**：构建覆盖 109 种语言的 WebLI，原始规模约 10B images、12B alt-texts，并提取 29B OCR pairs。
- **八类预训练任务混合**：text-only span corruption、WebLI split-captioning、CC3M-35L captioning、OCR、VQA、VQG、object-aware VQA、generative detection。
- **开放词表多语言评估**：在 COCO/NoCaps captioning、VQAv2/OKVQA/TextVQA、Crossmodal-3600、xGQA/MaXM 等任务上展示多语言与场景文字能力。

#### 🔬 深入细节
##### 架构图

![PaLI 主架构](https://ar5iv.labs.arxiv.org/html/2209.06794/assets/x1.png)
*图：PaLI 使用大规模 ViT 提取视觉 token，并将它们送入 encoder-decoder Transformer 以生成文本答案。*

##### 算法/流程伪代码

```python
# PaLI 预训练与任务统一伪代码
vit = FrozenOrPartiallyTrainableViT(size="G_or_e")
mt5 = MT5EncoderDecoder(size="Large_or_XXL")
mixture = [
    TextOnlySpanCorruption(),
    WebLISplitCaptioning(),
    CC3M35LCaptioning(),
    WebLIOCR(),
    CrossLingualVQA(),
    CrossLingualVQG(),
    ObjectAwareVQA(),
    GenerativeDetection(),
]

for task in sample_by_mixture_weights(mixture):
    image, prompt, target_text = task.sample()

    if image is not None:
        patch_tokens = vit(image)  # no pooling, keep visual token sequence
        encoder_input = concat(patch_tokens, tokenize(prompt))
    else:
        encoder_input = tokenize(prompt)

    decoder_input = shift_right(tokenize(target_text))
    logits = mt5(encoder_input, decoder_input)
    loss = cross_entropy(logits, tokenize(target_text))
    update_trainable_parameters(loss)

# 推理时不同任务只换 prompt 和候选输出格式
caption = generate(image, prompt="Generate alt_text in EN:")
answer = generate(image, prompt="Answer in ZH: 图中有什么?")
boxes = generate(image, prompt="detect cat and dog")
```

##### 1. 动机：多模态模型不能只缩放语言侧

PaLI 的论文标题强调 jointly-scaled。此前许多大 VLM 把参数主要放在语言模型侧，视觉编码器相对小；这在开放式文本生成上合理，但会限制细粒度视觉、OCR、跨语言 captioning 和 VQA。PaLI 的核心问题是：当语言模型已经达到 13B 级别后，继续扩大视觉 backbone 是否仍能带来多模态收益？

论文给出的答案是肯定的。PaLI-15B 和 PaLI-17B 的语言侧同为 mT5-XXL，主要区别是视觉侧从 1.8B ViT-G 升级到 4B ViT-e。结果显示视觉语言任务仍有增益，说明多模态性能并未在视觉侧饱和。这个结论对后续 VLM 很重要：只把图像压成少量弱视觉特征再交给超大 LLM，不一定是最优缩放路径。

##### 2. 架构：ViT patch token 直接进入 encoder-decoder

PaLI 的架构刻意保持简单：图像由 ViT 编码，输出 patch-level visual tokens；这些 token 不做 pooling，而是与文本 prompt 一起输入 mT5 encoder。decoder 只负责生成目标文本。因此所有任务都变成条件文本生成：

$$
p_\theta(y \mid I, x)
= \prod_{t=1}^{T} p_\theta(y_t \mid y_{<t},\ \operatorname{Enc}_\theta([\operatorname{ViT}(I); x])) .
$$

训练损失是标准 teacher-forcing cross entropy：

$$
\mathcal{L}
= -\sum_{t=1}^{T}\log p_\theta(y_t^\star \mid y_{<t}^\star, I, x).
$$

这套接口的优点是任务头极少：captioning 输出一句话，VQA 输出答案字符串，OCR 输出识别文字，检测输出坐标和类别的文本序列。模型不需要维护“分类头/检测头/问答头”的并行体系，迁移到新语言或新任务时主要改变 prompt 和目标格式。

##### 3. WebLI：规模、多语言和 OCR 三个维度一起做

PaLI 构建 WebLI 来补足多语言图文数据。原始 WebLI 覆盖约 10B images 和 12B alt-texts，语言覆盖 109 种；同时对所有图像提取 OCR，得到约 29B image-OCR pairs。为了兼顾质量和规模，论文使用跨模态相似度给 image-alt-text pair 打分，并保留前 10% 高质量图文对，约 1B examples。

最终预训练混合约 1.6B examples，八类任务覆盖纯文本、图文描述、OCR、VQA、问题生成、object-aware VQA 和生成式检测。任务混合可写为：

$$
\mathcal{L}_{\text{mix}}
= \sum_{k=1}^{8} \lambda_k
\mathbb{E}_{(I,x,y)\sim \mathcal{D}_k}
\left[-\log p_\theta(y \mid I,x)\right].
$$

其中 object detection 的输出也被文本化，例如用 \(0\) 到 \(999\) 的整数坐标生成 `ymin xmin ymax xmax class`。这让 PaLI 在不引入检测器头的情况下学习空间定位能力，但也意味着检测精度依赖文本序列建模和坐标离散化质量。

##### 4. 训练策略：先冻结视觉侧，再做高分辨率联合阶段

PaLI 各规模模型先在 224×224 分辨率上跑完整 1.6B 预训练混合；这一阶段只更新语言组件，视觉组件冻结。这个选择有两个作用：复用强 ViT 表征，控制大规模训练成本；同时避免在噪声多语言数据上过早破坏视觉 backbone。

对最大 PaLI-17B，论文额外加入 588×588 高分辨率阶段，约 10k steps、10M examples，并更新所有参数。高分辨率阶段对 OCR、TextVQA、细粒度 captioning 等任务尤其关键，因为这些任务需要读取小文字或局部细节。可以把它理解为先用低分辨率完成跨任务/跨语言对齐，再用短程高分辨率训练补足视觉细节。

##### 5. ViT-e 与联合缩放：视觉侧的参数仍然有价值

PaLI-17B 使用新训练的 ViT-e：宽度、深度和 MLP 维度都比 ViT-G 进一步放大，总参数约 4B。论文比较显示，ViT-e 在传统 ImageNet 分类上的提升相对有限，但在 PaLI 的视觉语言任务中能带来更明显收益，例如 COCO captioning 和 VQAv2 等指标均随视觉侧放大提高。

这个现象说明 V&L 任务对视觉表征的要求和单纯分类不同。分类可以由全局语义支撑，而 captioning/VQA/OCR 需要对象属性、数量、文字、空间关系等细节；因此当语言模型足够强时，视觉 token 的容量和分辨率会成为瓶颈。PaLI 的价值不只是一个模型结果，而是提出了“语言和视觉共同扩展”的经验路线。

##### 6. 与 Flamingo、BLIP 类方法的区别

Flamingo 更像冻结 LM 的少样本连接器，强调 in-context learning；BLIP 更强调 CapFilt 改善英文图文预训练质量，并统一理解/生成目标。PaLI 则选择 encoder-decoder 生成接口和多语言数据混合，核心关注联合缩放、开放词表和 100+ 语言覆盖。它不是把视觉信息当作少量 prompt token 附加给 decoder-only LM，而是让视觉 token 进入 encoder，decoder 在 mT5 的多语言词表上生成答案。

这种设计带来两个直接结果：一是 VQA 不再局限于 3k 答案分类，而是开放词表生成；二是同一模型可以在英文 captioning、跨语言 captioning、xGQA/MaXM 多语言 VQA 和 OCR-heavy benchmarks 上复用。代价是训练数据和模型规模都很大，且许多能力依赖 WebLI 这种高覆盖多语言数据集。

#### 🧪 练习题
```yaml
question: "PaLI 论文中“jointly-scaled”的主要含义是什么？"
options:
  - "只扩大语言模型，视觉编码器保持很小即可"
  - "视觉编码器和语言 encoder-decoder 都应随任务规模同步扩大"
  - "把所有任务都改成闭集分类"
  - "用单语言英文数据替代多语言数据"
answer: 1
explain: "PaLI 比较了 mT5 与 ViT 的不同组合，并用 ViT-e 证明视觉侧继续放大仍能提升多模态任务表现，因此强调视觉和语言组件需要联合缩放。"
```

### BLIP-2

```yaml
id: blip2
num: 8
name: BLIP-2
full_name: BLIP-2
year: '2023'
org: Salesforce
parent: blip
paper_url: ICML 2023
project_url: ''
category: connector
motivation: Q-Former高效模态桥接
```

#### 📝 一句话总结
BLIP-2 提出一个轻量 Q-Former 作为冻结图像编码器与冻结 LLM 之间的信息瓶颈，通过“视觉-语言表征学习 → 视觉到语言生成学习”的两阶段预训练，解决端到端多模态预训练成本高、冻结 LLM 难以理解视觉特征的问题。

#### 🎯 核心要点
- **模块化冻结策略**：冻结预训练图像编码器和预训练 LLM，只训练 Q-Former 与少量投影层，避免大规模端到端训练和灾难性遗忘。
- **Q-Former 桥接器**：188M 参数，使用 32 个可学习 query，每个 query 维度 768；query 通过交叉注意力从图像特征中抽取固定长度视觉表示。
- **两阶段预训练**：第一阶段面向冻结图像编码器学习视觉-语言表征，第二阶段把 Q-Former 输出投影为冻结 LLM 可消费的 soft visual prompts。
- **三种一阶段目标**：Image-Text Contrastive Learning、Image-Text Matching、Image-grounded Text Generation 共享 Q-Former 参数，但使用不同自注意力 mask 控制 query 与文本交互。
- **兼容多类 LLM**：既可连接 OPT 等 decoder-only LLM，也可连接 FlanT5 等 encoder-decoder LLM，对应使用语言建模或 prefix language modeling。
- **参数效率显著**：在多个零样本视觉语言任务上达到强性能，并以远少于 Flamingo-80B 的可训练参数取得更高 VQAv2 零样本表现。

#### 🔬 深入细节
##### 架构总览

![BLIP-2 Q-Former 架构与一阶段训练目标](https://arxiv.org/html/2301.12597v3/x2.png)
*图：BLIP-2 的 Q-Former 结构。可学习 query 与冻结图像特征交叉注意力交互，并在 ITC、ITM、ITG 三个目标下使用不同的 query-text attention mask。*

##### 核心流程伪代码

```python
# BLIP-2 pretraining sketch
image_encoder.freeze()
llm.freeze()
q_former = QFormer(num_queries=32, hidden_size=768)  # BERT initialized
proj_to_llm = Linear(q_former_dim, llm_embed_dim)

for image, text in image_text_loader:
    image_feat = image_encoder(image)  # frozen ViT features

    # Stage 1: representation learning from frozen image encoder
    q_out_itc = q_former(queries, image_feat, text, mask="unimodal")
    txt_cls = q_former.text_encode(text, mask="unimodal").cls
    sim = max_query_cosine(q_out_itc.queries, txt_cls) / tau
    loss_itc = contrastive_ce(sim)

    q_out_itm = q_former(queries, image_feat, text_or_hard_negative, mask="bidirectional")
    loss_itm = binary_ce(mean(itm_head(q_out_itm.queries)), match_label)

    q_out_itg = q_former(queries, image_feat, shifted_text, mask="multimodal_causal")
    loss_itg = autoregressive_ce(q_out_itg.text_logits, target_text)

    loss_stage1 = loss_itc + loss_itm + loss_itg
    update(q_former, loss_stage1)

for image, text in image_text_loader:
    image_feat = image_encoder(image)
    visual_tokens = q_former(queries, image_feat).queries
    soft_prompt = proj_to_llm(visual_tokens)

    # Stage 2: make frozen LLM interpret visual prompts
    llm_input = concat(soft_prompt, tokenize(text_prefix))
    loss_stage2 = language_modeling_loss(llm, llm_input, target=text_suffix_or_full_text)
    update(q_former, proj_to_llm, loss_stage2)
```

##### 方法解读

BLIP-2 的出发点是多模态预训练的“昂贵对齐”问题：如果像早期 VLP 那样联合训练视觉编码器、跨模态 Transformer 和语言模型，训练成本会随模型与数据规模迅速上升；如果直接把视觉特征塞给冻结 LLM，语言模型又没有在预训练中见过图像，单纯的图像到文本生成损失不足以建立稳定的跨模态对齐。BLIP-2 的选择是把强大的单模态模型视为固定资产，只学习一个小而强的连接器，让视觉信息先被压缩成 LLM 容易解释的少量 token。

Q-Former 是这个连接器的核心。它包含共享 self-attention 的 image transformer 与 text transformer，并在 image transformer 中每隔一层插入 cross-attention，让 32 个 query token 去读取冻结 ViT 的 patch 特征。每个 query 都是可学习参数，输出为 \(Z=\{z_1,\ldots,z_M\}\)，其中 \(M=32\)。由于 \(M\) 远小于 ViT patch 数，Q-Former 被迫学习“哪些视觉信息对语言最有用”，而不是把全部图像网格原样传给 LLM。

第一阶段的三个目标分别塑造不同粒度的对齐能力。ITC 用于全局图文对齐，图像与文本相似度不是单个图像向量与文本向量相乘，而是让多个 query 与文本 [CLS] 逐一匹配后取最大值：

$$
s(I,T)=\max_{m \in \{1,\ldots,M\}} \frac{z_m^\top t_{\mathrm{cls}}}{\tau}
$$

这样做允许不同 query 捕获不同语义区域，最终由最相关的 query 支撑图文匹配。ITM 则使用双向注意力，让 query 与文本 token 充分交互后做二分类，并配合 hard negative mining 学细粒度差异。ITG 使用类似 UniLM 的多模态因果 mask：query 不能偷看未来文本，文本 token 可以看 query 和历史 token，因此 query 必须先把足够的图像信息抽取出来，再支撑文本生成。

第二阶段把 Q-Former 从“能对齐图文”推进到“能被 LLM 理解”。具体做法是把 query 输出经线性层投影到 LLM 词嵌入维度：

$$
E_v = W Z + b,\qquad
\mathcal{L}_{\mathrm{LM}}=-\sum_t \log p_{\theta_{\mathrm{LLM}}}(y_t \mid E_v, x_{<t})
$$

这里 LLM 参数 \(\theta_{\mathrm{LLM}}\) 保持冻结，训练压力集中在 Q-Former 和投影层上。对于 OPT 这类 decoder-only LLM，\(E_v\) 被当作前缀 soft prompt，目标是生成整段文本；对于 FlanT5 这类 encoder-decoder LLM，视觉 prompt 与文本 prefix 进入 encoder，decoder 预测 suffix。这个设计把视觉对齐问题变成“学习一组语言模型可解释的前缀嵌入”。

与 Flamingo 一类在 LLM 内部插入交叉注意力层的方法相比，BLIP-2 更保守：它不改动大语言模型内部结构，也不要求反向传播穿过 LLM 的全部参数。代价是视觉信息必须经过 32 个 query 的瓶颈，可能丢失细粒度空间信息；收益是训练便宜、模型可替换性强，并且能继承不同冻结 LLM 的语言与指令能力。BLIP-2 也因此成为后续 InstructBLIP、MiniGPT-4 等 connector 路线的直接基础。

> 💡 关键：BLIP-2 的“高效”并不是只靠少训练参数，而是靠两阶段目标先让 query 学会抽取语言相关视觉信息，再让这些 query 输出落到冻结 LLM 的嵌入空间中。

#### 🧪 练习题
```yaml
question: "BLIP-2 为什么要在第一阶段同时使用 ITC、ITM 和 ITG，而不是只用图像到文本生成损失？"
options:
  - "因为三个目标分别提供全局对齐、细粒度匹配和条件生成信号，能让 Q-Former 更充分学习语言相关视觉表示"
  - "因为冻结图像编码器无法输出 patch 特征，只能依赖多个损失补偿"
  - "因为 ITG 会训练冻结 LLM 的全部参数，需要 ITC 和 ITM 防止过拟合"
  - "因为 Q-Former 没有自注意力层，只能通过多任务损失模拟 token 交互"
answer: 0
explain: "BLIP-2 的第一阶段不连接 LLM，而是用互补目标训练 Q-Former 抽取可对齐、可匹配、可生成的视觉表示；冻结图像编码器和 LLM 并不会被这些损失端到端更新。"
```

### InstructBLIP

```yaml
id: instructblip
num: 9
name: InstructBLIP
full_name: InstructBLIP
year: '2023'
org: Salesforce
parent: blip2
paper_url: NeurIPS 2023
project_url: ''
category: connector
motivation: 指令感知视觉特征提取
```

#### 📝 一句话总结
InstructBLIP 在 BLIP-2 的冻结视觉编码器、Q-Former、冻结 LLM 框架上引入“指令感知视觉特征提取”，让 Q-Former 同时读取图像和任务指令，从而为不同任务抽取不同的视觉证据并提升未见数据集与未见任务的零样本泛化。

#### 🎯 核心要点
- **指令输入 Q-Former**：文本指令不仅给 LLM，也输入 Q-Former，与 learnable query 通过 self-attention 交互，引导 query 抽取任务相关视觉特征。
- **继承 BLIP-2 模块化设计**：初始化自预训练 BLIP-2，冻结图像编码器和 LLM，视觉语言指令微调阶段主要更新 Q-Former。
- **26 个公开数据集统一为指令格式**：覆盖 11 类任务，划分 13 个 held-in 数据集用于训练和 13 个 held-out 数据集用于零样本评估。
- **任务级泛化评估更严格**：完全 hold out 视觉推理、视频问答、视觉对话、图像分类等任务类别，测试模型是否学会按自然语言指令迁移。
- **数据均衡采样**：按数据集大小平方根采样并手工微调部分权重，缓解多数据集混训中小数据集过拟合、大数据集欠训练的问题。
- **多种 LLM 适配**：基于同一 ViT-g/14 视觉编码器，评估 FlanT5-XL/XXL、Vicuna-7B/13B 等冻结 LLM，验证方法不是绑定单一语言模型。

#### 🔬 深入细节
##### 架构总览

![InstructBLIP 指令感知视觉特征提取架构](https://arxiv.org/html/2305.06500v2/x3.png)
*图：InstructBLIP 架构。图像经冻结视觉编码器输出视觉特征；指令 token 与 query 一起输入 Q-Former，Q-Former 输出经投影后作为 soft visual prompt 输入冻结 LLM。*

##### 核心流程伪代码

```python
# InstructBLIP instruction tuning sketch
vision_encoder.freeze()
llm.freeze()
q_former.load_from_blip2()

for image, instruction, answer, dataset_id in mixed_instruction_loader:
    image_feat = vision_encoder(image)

    # Instruction-aware visual feature extraction:
    # query tokens can self-attend with instruction tokens,
    # and query tokens cross-attend to frozen image features.
    q_tokens = learnable_queries(num_queries=32)
    q_out = q_former(
        query_tokens=q_tokens,
        image_features=image_feat,
        text_tokens=tokenize(instruction),
        cross_attention_to_image=True,
    )

    visual_prompt = linear_proj(q_out.query_states)
    llm_input = concat(visual_prompt, tokenize(instruction))
    logits = llm(llm_input, labels=tokenize(answer))
    loss = autoregressive_ce(logits, answer)

    update(q_former, loss)  # image encoder and LLM stay frozen

# Dataset balancing
sampling_prob[dataset_i] = sqrt(num_examples[dataset_i]) / sum_j sqrt(num_examples[dataset_j])
```

##### 方法解读

BLIP-2 的 query 在推理时对同一张图像通常抽取一组相对静态的视觉表示；但视觉语言指令微调的核心难点恰恰是“同图不同问”。同一张街景图，如果指令是“读出招牌文字”，模型需要关注 OCR 区域；如果指令是“判断是否会发生交通危险”，模型需要关注车辆、行人和空间关系。InstructBLIP 的关键改动是把 instruction token 送入 Q-Former，让 query 在抽取图像特征之前就知道当前任务目标。

形式上，令图像编码器输出为 \(V\)，learnable query 为 \(Q\)，指令 token 表示为 \(X\)。BLIP-2 更接近学习 \(Z=f_{\phi}(Q,V)\)，而 InstructBLIP 学习的是：

$$
Z=f_{\phi}(Q, X, V)
$$

其中 \(Q\) 与 \(X\) 通过 Q-Former 的 self-attention 交互，\(Q\) 再通过 cross-attention 读取 \(V\)。这意味着输出视觉 token \(Z\) 不再只是“图片摘要”，而是“针对当前指令筛选后的视觉证据”。随后 \(Z\) 被线性投影成 LLM 的 soft prompt，并与原始文本指令一起输入冻结 LLM 生成答案。

训练目标仍是标准语言建模损失。给定指令 \(x\)、图像 \(I\)、答案序列 \(y\)，模型最大化答案 token 的条件概率：

$$
\mathcal{L}_{\mathrm{IT}}=-\sum_{t=1}^{|y|}\log p_{\theta_{\mathrm{LLM}}}\left(y_t \mid \mathrm{Proj}(f_{\phi}(Q,x,\mathrm{Enc}(I))), x, y_{<t}\right)
$$

在这个损失中，\(\theta_{\mathrm{LLM}}\) 和视觉编码器参数被冻结，主要更新 \(\phi\)。这使 InstructBLIP 的训练成本仍接近 connector tuning，却能让视觉抽取过程对指令敏感。消融结果显示，去掉 instruction-aware visual features 后，ScienceQA、iVQA 等需要空间、常识或时序推理的任务下降更明显，说明指令确实在指导 query 抽取不同证据。

数据构造同样是论文贡献的一半。作者把 26 个公开数据集转换成自然语言指令格式，并为多数任务设计 10 到 15 个 instruction template；对涉及场景文字的数据，额外把 OCR tokens 放入指令中作为辅助信息。训练只用 13 个 held-in 数据集，评估包含 13 个 held-out 数据集，并且把若干任务类别整体排除在训练外。这种设置比普通“同任务不同数据集”的零样本评估更严格，因为模型必须从指令语义中推断任务行为。

多数据集混训容易出现优化不同步：如果均匀按样本采样，大数据集支配训练；如果均匀按数据集采样，小数据集会被反复看到。InstructBLIP 用平方根采样折中：

$$
p_i=\frac{\sqrt{n_i}}{\sum_j \sqrt{n_j}}
$$

其中 \(n_i\) 是第 \(i\) 个数据集的样本数。这个分布压低超大数据集权重、抬高小数据集权重，再通过少量手工调整处理 A-OKVQA、OKVQA 等任务形态差异。它不是架构创新，但对“26 数据集统一训练”这种设置非常关键。

与 LLaVA/MiniGPT-4 这类强调对话数据或单层投影的路线相比，InstructBLIP 更强调可控的视觉特征抽取：LLM 仍然负责语言生成和指令遵循，但 Q-Former 根据指令决定给 LLM 什么视觉 token。这一设计保留 BLIP-2 的参数效率，也解释了它在 caption、VQA、OCR、视频问答、视觉对话等分布差异很大的任务上能稳定提升。

> 💡 关键：InstructBLIP 的指令微调不是只把更多任务文本喂给 LLM，而是把指令前移到视觉抽取阶段，让“看什么”也由指令决定。

#### 🧪 练习题
```yaml
question: "InstructBLIP 中 instruction-aware Q-Former 的主要作用是什么？"
options:
  - "把冻结 LLM 改造成可以端到端更新的多模态 Transformer"
  - "让 query 在抽取视觉特征时读取任务指令，从图像中选择更相关的证据"
  - "用 OCR tokens 完全替代图像特征，降低视觉编码器成本"
  - "把 26 个数据集合并成一个无指令的分类任务"
answer: 1
explain: "InstructBLIP 将指令 token 输入 Q-Former，使 query 与指令交互后再通过交叉注意力读取图像特征；图像编码器和 LLM 仍保持冻结。"
```

### MiniGPT-4

```yaml
id: minigpt4
num: 10
name: MiniGPT-4
full_name: MiniGPT-4
year: '2023'
org: KAUST
parent: blip2
paper_url: ICLR 2024
project_url: ''
category: connector
motivation: 线性投影+高质量对话微调
```

#### 📝 一句话总结
MiniGPT-4 复用冻结的 BLIP-2 视觉编码器与 Q-Former，只训练一个线性投影层把视觉 token 对齐到冻结 Vicuna 的词嵌入空间，并用少量高质量对话式图文数据显著改善第一阶段粗对齐后的重复、碎片化输出。

#### 🎯 核心要点
- **极简连接器**：视觉侧使用 BLIP-2 的 EVA-CLIP ViT-G/14 与 Q-Former，语言侧使用 Vicuna，中间只加入一个线性投影层。
- **冻结大部分参数**：视觉编码器、Q-Former 和 Vicuna 均冻结，训练集中在投影层，突出“视觉特征到 LLM 嵌入空间”的对齐。
- **两阶段训练**：第一阶段用约 5M 图文对做粗粒度视觉语言对齐；第二阶段用约 3.5K 高质量详细图文描述和对话模板做精调。
- **高质量数据作用突出**：第一阶段后模型能理解图像但语言输出常重复、不连贯；第二阶段小数据显著提升生成可靠性和可用性。
- **能力来自 LLM 迁移**：将视觉 token 对齐到 Vicuna 后，模型展现详细描述、基于图像写作、网页草图转代码、食物做法建议等开放式生成能力。
- **BLIP-2 后续路线代表**：MiniGPT-4 证明在强视觉前端和强 LLM 已经存在时，一个很小的 connector 加优质指令数据即可形成可用多模态助手。

#### 🔬 深入细节
##### 架构总览

![MiniGPT-4 架构图](https://minigpt-4.github.io/images/overview.png)
*图：MiniGPT-4 官方架构图。BLIP-2 的 Q-Former 与 ViT 输出视觉表示，单层线性层将其投影到 Vicuna 嵌入空间，再由 Vicuna 生成回答。*

##### 核心流程伪代码

```python
# MiniGPT-4 training sketch
vit_g, q_former = load_blip2_vision_frontend()
vicuna = load_vicuna()
vit_g.freeze()
q_former.freeze()
vicuna.freeze()

projector = Linear(q_former_dim, vicuna_embed_dim)

# Stage 1: coarse image-text alignment on large noisy/short caption data
for image, caption in large_image_text_pairs:  # about 5M pairs
    image_feat = vit_g(image)
    query_states = q_former(image_feat).query_states
    visual_embeds = projector(query_states)
    prompt = concat(visual_embeds, tokenize("### Human: <Img><ImageHere></Img> Describe this image. ### Assistant:"))
    loss = lm_loss(vicuna, prompt, target=caption)
    update(projector, loss)

# Stage 2: high-quality conversational alignment
for image, detailed_response in curated_3500_pairs:
    image_feat = vit_g(image)
    query_states = q_former(image_feat).query_states
    visual_embeds = projector(query_states)
    prompt = concat(visual_embeds, tokenize(conversation_template))
    loss = lm_loss(vicuna, prompt, target=detailed_response)
    update(projector, loss)

# Inference
answer = vicuna.generate(concat(projector(q_former(vit_g(image))), tokenize(user_prompt)))
```

##### 方法解读

MiniGPT-4 的问题意识与 BLIP-2 一脉相承，但更激进地把可训练部分压缩到一个线性层。作者认为 GPT-4 展示出的许多多模态生成能力很可能来自强语言模型的迁移，而不是必须从零训练一个庞大的多模态模型。因此 MiniGPT-4 直接借用 BLIP-2 已经训练好的视觉前端：EVA-CLIP ViT-G/14 负责视觉表征，Q-Former 把图像压缩成少量 query token；再把这些 token 投影到 Vicuna 的词嵌入维度。

核心数学形式非常简单。设 Q-Former 输出视觉 query 表示为 \(Z \in \mathbb{R}^{M \times d_q}\)，线性投影为 \(W \in \mathbb{R}^{d_q \times d_l}\)，则输入 Vicuna 的视觉嵌入为：

$$
E_v = ZW + b
$$

Vicuna 接收视觉嵌入和文本 prompt 后自回归生成答案，训练目标是常规 next-token loss：

$$
\mathcal{L}=-\sum_{t=1}^{T}\log p_{\theta_{\mathrm{Vicuna}}}(y_t \mid E_v, x, y_{<t})
$$

其中 \(\theta_{\mathrm{Vicuna}}\) 冻结，BLIP-2 视觉前端也冻结，优化对象主要是 \(W,b\)。这使 MiniGPT-4 的训练更像“把视觉 token 翻译成 Vicuna 能读懂的软提示”，而不是重新学习视觉或语言能力。

第一阶段用大规模图文对训练投影层，让 Vicuna 初步把 \(E_v\) 解释为图像条件。论文和项目页都强调，这一步之后模型已经能感知图像内容，但输出质量并不好：短 caption 数据只提供稀疏监督，容易让模型生成重复句、断裂短语或不自然回答。也就是说，粗对齐解决“看见什么”的问题，但没有解决“如何像对话助手一样回答”的问题。

第二阶段是 MiniGPT-4 最有启发性的部分。作者构造约 3,500 条高质量详细图文描述，并套入对话模板进行微调。数据规模很小，但每条样本的信息密度高、语言风格接近真实助手回答，因此对生成可靠性影响巨大。这个结果说明多模态指令模型的数据质量不能只按样本数衡量：当视觉前端和 LLM 都足够强时，少量高质量对齐样本可以有效校正输出风格和稳定性。

与 BLIP-2 相比，MiniGPT-4 不是重新提出视觉语言预训练目标，而是证明一种极低成本的工程组合：冻结 BLIP-2 视觉侧，冻结 Vicuna，只训练投影层并补一轮高质量对话式数据。与 InstructBLIP 相比，它没有让 Q-Former 显式读取指令，因此“看什么”的过程相对固定；但它更突出 Vicuna 的开放式语言能力，适合展示长文本生成、创意写作、代码生成等能力迁移。

> ⚠️ 注意：MiniGPT-4 的“Mini”主要指可训练连接器和训练成本很小，不表示总推理模型很小；推理时仍然需要运行冻结的视觉前端和 Vicuna。

#### 🧪 练习题
```yaml
question: "MiniGPT-4 第二阶段少量高质量数据的核心作用是什么？"
options:
  - "重新训练 ViT-G/14，让视觉编码器适应 Vicuna"
  - "替代第一阶段大规模图文对，使模型不再需要视觉语言粗对齐"
  - "改善第一阶段后重复、碎片化、不自然的语言输出，使回答更符合对话模板"
  - "把 Q-Former 的 32 个 query 扩展成完整图像 patch 序列"
answer: 2
explain: "第一阶段主要建立视觉 token 到 Vicuna 嵌入空间的粗对齐；第二阶段用高质量详细描述和对话模板校正生成风格与可靠性。"
```

### LLaVA

```yaml
id: llava
num: 11
name: LLaVA
full_name: LLaVA
year: '2023'
org: UW-Microsoft
parent: clip
paper_url: NeurIPS 2023 Oral
project_url: ''
category: connector
motivation: 视觉指令微调开创者
```

#### 📝 一句话总结
LLaVA 提出 Visual Instruction Tuning：用 GPT-4 将图像 caption、检测框等符号信息改写成 158K 多模态指令数据，并用一个轻量投影层把 CLIP 视觉特征接入 Vicuna，解决了开源模型缺少视觉对话指令监督的问题。

#### 🎯 核心要点
- 架构极简：冻结 CLIP ViT-L/14 视觉编码器，用线性投影 \(W\) 将视觉 patch 特征映射到 Vicuna 的词嵌入空间。
- 数据创新：用 caption 与 bounding box 作为图像的文本化代理，让语言模型 GPT-4 生成 conversation、detailed description、complex reasoning 三类视觉指令数据。
- 两阶段训练：先在 595K 过滤后的 CC3M 图文对上只训练投影层做特征对齐，再在 158K LLaVA-Instruct 数据上微调投影层与 LLM。
- 统一自回归目标：把图像 token、用户问题、历史对话拼成同一序列，只对 assistant answer token 计算 next-token loss。
- 影响力关键：它证明“高质量指令数据 + 简单 connector”足以产生强视觉对话能力，成为后续 MiniGPT-4、LLaVA-1.5、LLaVA-NeXT 等开源 VLM 的直接起点。

#### 🔬 深入细节
##### 框架图

![LLaVA 网络架构](https://ar5iv.labs.arxiv.org/html/2304.08485/assets/x1.png)
*图：LLaVA 用 CLIP 视觉编码器抽取图像特征，经投影矩阵 \(W\) 转成视觉 token，再与语言指令一起送入 Vicuna 生成回答。*

##### 训练流程伪代码

```python
# LLaVA Visual Instruction Tuning 简化流程
vision_encoder = FrozenCLIPViTL14()
llm = Vicuna()
projector = Linear(clip_dim, llm_hidden_dim)

# Stage 1: feature alignment，只训练 projector
freeze(vision_encoder)
freeze(llm)
for image, caption in cc3m_595k:
    z_v = vision_encoder(image)          # patch-level visual features
    h_v = projector(z_v)                 # visual tokens in LLM space
    prompt = "<image>\nDescribe the image briefly."
    target = caption
    loss = next_token_loss(llm([h_v, prompt]), target)
    update(projector, loss)

# Stage 2: visual instruction tuning，冻结视觉编码器，训练 projector + LLM
unfreeze(projector)
unfreeze(llm)
freeze(vision_encoder)
for image, dialog in llava_instruct_158k:
    z_v = vision_encoder(image)
    h_v = projector(z_v)
    sequence, answer_mask = format_multiturn_dialog(h_v, dialog)
    logits = llm(sequence)
    loss = cross_entropy(logits[answer_mask], sequence.next_tokens[answer_mask])
    update([projector, llm], loss)
```

##### 关键公式

CLIP 输出的视觉特征记为 \(Z_v\)，线性连接器把它投影到语言模型的 hidden size：

$$
H_v = W Z_v
$$

对多轮样本，模型仍使用标准自回归语言建模目标，只是条件中加入视觉 token、当前问题与历史回答：

$$
p_\theta(X_a \mid X_v, X_q)
= \prod_{i=1}^{L} p_\theta(x_i \mid X_v, X_q, X_{a,<i})
$$

训练损失只作用在 assistant 的答案 token 上：

$$
\mathcal{L}
= - \sum_{i \in \mathcal{A}} \log p_\theta(x_i \mid X_v, X_{<i})
$$

##### 方法解读

LLaVA 的核心问题不是“如何设计更复杂的跨模态注意力”，而是“如何让一个已经会遵循文本指令的 LLM 学会在视觉条件下遵循指令”。此前 BLIP-2、Flamingo 等模型已经能把图像输入语言模型，但训练目标主要来自 caption、VQA 或 few-shot transfer，缺少面向开放对话的 instruction-following 信号。LLaVA 把 NLP 中 instruction tuning 的思想搬到图像-语言场景，直接优化“用户看图提问，助手按指令回答”的交互格式。

数据生成是论文最重要的工程创新。GPT-4 当时不能直接读取图像，所以作者没有把图片喂给 GPT-4，而是把 COCO 图像的 caption 与检测框转换成文本上下文，让 GPT-4 生成三类响应：面向多轮问答的 conversation、面向密集描述的 detailed description、面向常识和空间推理的 complex reasoning。这个设计把昂贵的人类标注替换成“已有视觉标注 + 强语言模型重写”，使 158K 样本虽然规模不大，却高度贴近聊天助手的输出分布。

模型连接器故意保持简单：CLIP ViT-L/14 产生 patch grid 特征，线性层 \(W\) 把每个视觉向量投到 Vicuna 的词嵌入维度，作为一串 pseudo tokens 放在文本指令前。这样做的好处是训练稳定、复现实验成本低、能够快速验证数据质量的价值；代价是视觉和语言只在 LLM 内部通过自注意力融合，连接器本身没有显式的定位、压缩或跨注意力推理能力。

两阶段训练对应两个不同的对齐目标。第一阶段只训练投影层，等价于为冻结 LLM 学一个“视觉 tokenizer”，让视觉 token 的分布落到 Vicuna 能理解的嵌入空间；第二阶段在视觉指令数据上更新 projector 和 LLM，使模型学会把图像内容、用户指令和对话历史共同作为条件。视觉编码器始终冻结，这降低了训练成本，也保留了 CLIP 的开放词汇视觉表征。

与传统 VLP 方法相比，LLaVA 的突破点在交互范式而不是底层视觉能力。它不引入检测头、不设计复杂任务专用输出，而是把所有任务都变成自然语言生成。因此，模型可以用同一套接口回答描述、计数、解释异常现象、做简单视觉推理；但它对 OCR、精确 grounding、高分辨率细节的支持较弱，这些短板后来推动了 LLaVA-NeXT、Qwen-VL、CogVLM 等后续工作在分辨率、位置编码和深层融合上继续改进。

> 💡 关键：LLaVA 的经验是，开源多模态模型的瓶颈不只在模型结构，也在“回答应该长什么样”的监督分布。GPT-4 生成的视觉指令数据给 LLM 提供了对话式视觉行为的模板。

#### 🧪 练习题
```yaml
question: "LLaVA 第一阶段只训练线性投影层的主要目的是什么？"
options:
  - "让 CLIP 视觉特征对齐到 Vicuna 可消费的词嵌入空间"
  - "提升 CLIP 在 ImageNet 上的分类准确率"
  - "让 GPT-4 直接读取原始图像像素"
  - "训练一个独立的目标检测器输出 bounding box"
answer: 0
explain: "第一阶段冻结视觉编码器和 LLM，只更新投影矩阵 W，相当于学习一个把 CLIP patch 特征转成 LLM 视觉 token 的轻量视觉 tokenizer。"
```

### Qwen-VL

```yaml
id: qwen_vl
num: 12
name: Qwen-VL
full_name: Qwen-VL
year: '2023.08'
org: 阿里巴巴
parent: llava
paper_url: arXiv
project_url: ''
category: connector
motivation: 位置感知跨注意力适配器
```

#### 📝 一句话总结
Qwen-VL 在 OpenCLIP ViT-bigG 与 Qwen-7B 之间加入位置感知的单层 cross-attention adapter，用 256 个可学习查询压缩视觉序列并保留 2D 空间信息，解决了通用 VLM 在中文、多图、OCR 与 grounding 上能力不足的问题。

#### 🎯 核心要点
- 三组件架构：OpenCLIP ViT-bigG 视觉编码器、0.08B 参数的 position-aware VL adapter、Qwen-7B 语言模型，总规模约 9.6B。
- 位置感知适配器：单层交叉注意力用 256 个 learnable query 聚合可变长图像 patch，并在 query-key 中注入 2D absolute position encoding。
- 统一 I/O 表示：用 `<img>...</img>` 包裹视觉 token，用 `<box>...</box>` 与 `<ref>...</ref>` 将定位、引用表达和 grounded caption 统一为文本生成。
- 三阶段训练：1.4B 清洗图文对做低分辨率预训练，随后 448 分辨率多任务预训练，最后用指令数据训练 Qwen-VL-Chat。
- 原生中英与多图能力：训练语料包含英文、中文与交错图文格式，使模型可处理中文问答、多图比较和文档/OCR 场景。

#### 🔬 深入细节
##### 框架图

![Qwen-VL 三阶段训练流程](https://ar5iv.labs.arxiv.org/html/2308.12966/assets/x2.png)
*图：Qwen-VL 的三阶段训练。第一阶段冻结 QwenLM 做视觉-语言对齐，第二阶段全模型多任务高分辨率训练，第三阶段冻结 ViT 做指令微调。*

##### 训练与推理流程伪代码

```python
# Qwen-VL position-aware adapter 简化流程
vit = OpenCLIP_ViT_bigG()
adapter = PositionAwareCrossAttention(num_queries=256)
llm = Qwen7B()

def encode_image(image):
    patches = vit(resize(image))                 # [num_patches, d_v]
    q = learnable_queries(256) + pos2d_queries()
    k = linear_k(patches) + pos2d_patches(patches)
    v = linear_v(patches)
    visual_tokens = softmax(q @ k.T / sqrt(d)) @ v
    return visual_tokens                         # fixed 256 tokens

for sample in training_data:
    image_tokens = [encode_image(img) for img in sample.images]
    prompt = interleave(sample.text, image_tokens, tags=["<img>", "</img>"])
    target = sample.answer                       # caption, VQA answer, OCR text, boxes, dialog
    logits = llm(prompt)
    loss = cross_entropy(logits[target_positions], target)
    update_trainable_modules(loss)

# grounding 输出也作为普通文本生成
# <ref>the red bus</ref><box>(125,230),(640,812)</box>
```

##### 关键公式

位置感知 VL adapter 的核心是 cross-attention 压缩。设 ViT patch 特征为 \(V \in \mathbb{R}^{N \times d}\)，256 个可学习查询为 \(Q \in \mathbb{R}^{256 \times d}\)，2D 位置编码为 \(P_q, P_k\)：

$$
Y = \operatorname{softmax}
\left(
\frac{(Q + P_q)(VW_k + P_k)^\top}{\sqrt{d}}
\right) VW_v
$$

其中 \(Y \in \mathbb{R}^{256 \times d}\) 是送入 Qwen-7B 的固定长度视觉 token。对 grounding，边界框坐标被归一化到 \([0,1000)\) 的离散整数空间：

$$
b = \left(
\left\lfloor 1000 \frac{x_1}{W} \right\rfloor,
\left\lfloor 1000 \frac{y_1}{H} \right\rfloor,
\left\lfloor 1000 \frac{x_2}{W} \right\rfloor,
\left\lfloor 1000 \frac{y_2}{H} \right\rfloor
\right)
$$

最终仍然用自回归语言建模目标训练：

$$
\mathcal{L}_{\text{LM}}
= - \sum_{t \in \mathcal{T}_{\text{answer}}}
\log p_\theta(x_t \mid x_{<t}, Y)
$$

##### 方法解读

Qwen-VL 针对 LLaVA 式线性投影的两个短板做了改造：一是高分辨率图像会产生很长的 patch 序列，直接塞给 LLM 成本高；二是线性投影缺少显式空间建模，模型在 grounding、OCR、文档问答等细粒度任务上容易丢失位置。Qwen-VL 的 position-aware adapter 用 256 个查询把任意图像压缩成固定长度 token，同时在 cross-attention 的 query-key 交互中加入 2D 绝对位置编码，让压缩后的 token 仍携带空间布局。

这个 adapter 介于 LLaVA 的线性投影和 BLIP-2 的多层 Q-Former 之间。它比线性投影多了内容选择能力：query 可以主动从 patch 中聚合与语言任务相关的信息；又比 Q-Former 更轻，只用单层 cross-attention 控制参数和计算。256 个 token 的选择也服务于细粒度任务：相比 32 个查询，它保留更多局部信息；相比直接保留 1024 个高分辨率 patch，它显著降低 LLM 的上下文压力。

输入输出接口是 Qwen-VL 的第二个关键。图像被 `<img>...</img>` 标记包裹后与文本交错输入，因此模型天然支持多图对比和图文混排。定位任务不额外接检测头，而是把框坐标作为普通 token 输出：`<ref>` 表示被引用短语，`<box>` 表示其边界框。这样 caption、VQA、OCR、grounding、grounded caption 都能共享同一个 decoder 和同一个 next-token objective。

三阶段训练使模型逐步获得能力。第一阶段在从约 5B 原始图文对清洗出的 1.4B 图文对上训练，冻结 QwenLM，只优化 ViT 与 adapter，目标是让视觉表示对齐语言模型；第二阶段把输入分辨率从 224 提升到 448，解冻全模型，在 caption、VQA、OCR、grounding、grounded caption、纯文本等任务上联合训练；第三阶段冻结 ViT，用多模态指令数据训练对话格式，得到 Qwen-VL-Chat。

与 LLaVA 相比，Qwen-VL 的创新点不是更强的聊天模板，而是把位置、OCR、中文和多图交互放进基础训练闭环。它的 box-as-text 方案让 grounding 与生成统一，但也带来坐标离散化和格式依赖问题：模型必须稳定生成合法标签与坐标，且精确检测能力受视觉分辨率、adapter 压缩率和训练框质量共同限制。

> 💡 关键：Qwen-VL 的 2D position-aware adapter 是“压缩但不忘位置”的折中设计，正好服务于 OCR、文档理解和 refer expression grounding 这类需要细粒度空间信息的任务。

#### 🧪 练习题
```yaml
question: "Qwen-VL 在 VL adapter 中加入 2D 绝对位置编码的主要原因是什么？"
options:
  - "减少 Qwen-7B 的词表大小"
  - "让压缩后的视觉 token 保留 patch 的空间位置信息"
  - "替代自回归语言建模目标"
  - "让模型只能处理单张图片"
answer: 1
explain: "adapter 会把高分辨率 patch 压缩成固定 256 个视觉 token，2D 位置编码帮助 cross-attention 在压缩过程中保留行列位置，对 OCR 与 grounding 尤其关键。"
```

### CogVLM

```yaml
id: cogvlm
num: 13
name: CogVLM
full_name: CogVLM
year: '2023'
org: 智谱AI
parent: llava
paper_url: arXiv
project_url: ''
category: connector
motivation: 视觉专家模块深度融合
```

#### 📝 一句话总结
CogVLM 提出在冻结语言模型的每一层加入可训练 visual expert，为图像 token 单独配置 QKV 矩阵和 FFN/MLP，从而解决浅层投影方法只在输入端对齐、跨模态融合深度不足的问题。

#### 🎯 核心要点
- 深层融合架构：由 EVA2-CLIP-E ViT、两层 SwiGLU MLP adapter、Vicuna-1.5-7B、逐层 visual expert 组成。
- 视觉专家模块：每个 LLM block 中，图像 token 使用独立可训练的 QKV 矩阵与 FFN，文本 token 继续使用原始冻结 LLM 参数。
- 不牺牲文本能力：无图输入时只走冻结语言模型原路径，因此保留 Vicuna 的纯文本行为；有图输入时图像 token 通过 visual expert 对齐到各层语义空间。
- 训练数据与流程：先用约 1.5B 公开图文对做 caption 预训练，再混合 image captioning 与 referring expression comprehension，引入约 40M grounding 数据。
- 消融结论明确：只训练 adapter 的浅层对齐明显弱于每层 visual expert；从 LLM 权重初始化 visual expert 优于随机初始化。

#### 🔬 深入细节
##### 框架图

![CogVLM visual expert 架构](https://ar5iv.labs.arxiv.org/html/2311.03079/assets/figures/cogvlm.png)
*图：CogVLM 先用 ViT 与 MLP adapter 生成图像 token，再在 LLM 每层为图像 token 走独立的视觉 QKV 与 FFN 分支，实现深层视觉-语言融合。*

##### 训练流程伪代码

```python
# CogVLM visual expert 简化流程
vit = EVA2_CLIP_E(remove_last_layer=True)
adapter = SwiGLUMLP(vit_dim, llm_hidden_dim)
llm = FrozenVicuna15_7B()
visual_experts = init_from_llm_weights(llm.layers)  # per-layer visual QKV + FFN

def cogvlm_block(block, x_img, x_txt):
    # 图像 token 使用 visual expert，文本 token 使用冻结 LLM 原参数
    q_i, k_i, v_i = block.visual_qkv(x_img)
    q_t, k_t, v_t = block.text_qkv_frozen(x_txt)

    q = concat(q_i, q_t)
    k = concat(k_i, k_t)
    v = concat(v_i, v_t)
    y = causal_attention(q, k, v)
    y_img, y_txt = split_image_text(y)

    x_img = x_img + block.visual_ffn(y_img)       # trainable expert FFN
    x_txt = x_txt + block.text_ffn_frozen(y_txt)  # frozen language FFN
    return x_img, x_txt

for image, prompt, answer in multimodal_batches:
    x_img = adapter(vit(image))
    x_txt = llm.word_embedding(prompt)
    for block in llm.layers:
        x_img, x_txt = cogvlm_block(block, x_img, x_txt)
    logits = llm.output_head(concat(x_img, x_txt))
    loss = next_token_loss(logits, answer_positions=answer)
    update([vit, adapter, visual_experts], loss)
```

##### 关键公式

设某层输入 hidden states 拆成图像 token \(X_I\) 与文本 token \(X_T\)。CogVLM 为两类 token 使用不同参数生成注意力的 Q/K/V：

$$
Q = [X_I W_I^Q;\; X_T W_T^Q],\quad
K = [X_I W_I^K;\; X_T W_T^K],\quad
V = [X_I W_I^V;\; X_T W_T^V]
$$

其中 \(W_I^\*\) 是 visual expert 的可训练参数，\(W_T^\*\) 是冻结语言模型参数。注意力仍在拼接序列上计算：

$$
\operatorname{Attn}(X)
= \operatorname{softmax}
\left(
\frac{QK^\top}{\sqrt{d}} + M_{\text{causal}}
\right)V
$$

FFN 也按模态分支处理：

$$
Y_I = \operatorname{FFN}_I(H_I),\qquad
Y_T = \operatorname{FFN}_T(H_T)
$$

总体生成目标仍是答案部分的 next-token prediction：

$$
\mathcal{L}
= - \sum_{t \in \mathcal{A}}
\log p_\theta(x_t \mid X_I, X_{T,<t})
$$

##### 方法解读

CogVLM 的出发点是反思“浅层对齐”。LLaVA、BLIP-2 一类方法通常先把视觉特征映射成 LLM 输入 token，再依赖原语言模型层去融合图文信息。这类似只学习一个前缀或输入投影：视觉信息进入了序列，但每一层的注意力头和 FFN 仍主要是在语言预训练分布上形成的。CogVLM 认为，视觉 token 需要在每个 Transformer block 中拥有自己的可训练变换，才能对齐到不同层、不同 attention head 所表达的语义空间。

visual expert 的设计非常直接：文本 token 不动，继续使用冻结 Vicuna 的 QKV 与 FFN；图像 token 走一套同形状的 QKV 与 FFN 参数，这些参数从 LLM 原权重初始化后再训练。注意力计算仍发生在图像和文本拼接后的同一个序列中，所以图像 token 可以参与跨模态交互；但图像 token 的投影和非线性变换由视觉专家负责，避免把视觉分布硬塞进语言参数。

这种结构的工程优势是“深融合但不破坏文本模型”。当输入没有图像时，路径退化为冻结的原始语言模型，纯文本能力不被多模态训练改写；当输入包含图像时，额外参数只服务图像 token，给模型足够容量学习视觉特征在每层的表示转换。论文也指出 visual expert 会增加参数量，但由于序列计算路径基本不变，推理 FLOPs 不会按参数量同比例增加。

位置编码处理也体现了对 LLM 结构的适配。CogVLM 让所有视觉 token 在 RoPE 中共享同一个 position id，因为图像 token 已经从 ViT 中带有空间信息。如果把数百到上千个视觉 token 当作普通文本 token 逐个递增位置，后面的文本 query 会被推到很远的位置，还可能更偏向图像序列末端；共享视觉 position id 能缓解这种由长视觉前缀引入的位置衰减。

训练流程分为大规模图文预训练与 grounding 强化。第一阶段用 LAION-2B、COYO-700M 等公开数据清洗后的约 1.5B 图文对做 captioning next-token prediction；第二阶段混合图像描述和 referring expression comprehension，并构建约 40M 带框 grounding 数据，把目标定位写成 VQA 风格的文本输出。这个训练设置让 CogVLM 不只是会聊天，也在 RefCOCO 系列与 OCR/VQA 类任务上获得强视觉定位和细粒度理解能力。

> 💡 关键：CogVLM 把“连接器”从输入端推进到 LLM 的每一层。视觉专家不是单独的检测器，而是让视觉 token 在语言模型内部拥有逐层可训练的注意力和 FFN 变换。

#### 🧪 练习题
```yaml
question: "CogVLM 的 visual expert 相比只训练 MLP adapter 的核心优势是什么？"
options:
  - "它把图像压缩成更少的 token，但完全不参与 LLM 内部计算"
  - "它在每个 LLM 层为图像 token 提供独立 QKV 与 FFN，实现深层跨模态对齐"
  - "它用检测器替代自回归语言模型"
  - "它要求文本 token 也全部随机初始化"
answer: 1
explain: "CogVLM 的视觉专家分布在每个 Transformer block 中，图像 token 用可训练 QKV 和 FFN 对齐各层语义空间，而文本 token 保留冻结 LLM 参数。"
```

### Gemini

```yaml
id: gemini
num: 14
name: Gemini
full_name: Gemini
year: '2023.12'
org: Google
parent: pali
paper_url: Technical Report
project_url: ''
category: native_multimodal
motivation: 原生多模态联合训练
```

#### 📝 一句话总结
Gemini 提出了一组从预训练阶段就联合建模文本、图像、音频、视频的原生多模态 Transformer，解决了“先训练语言模型、再外挂视觉适配器”难以自然处理交错多模态上下文的问题，并在 30/32 个报告基准上刷新或追平当时最佳结果。

#### 🎯 核心要点
- 原生多模态：预训练数据同时包含 web 文档、书籍、代码、图像、音频、视频，而不是只在后期做视觉指令微调
- 统一序列接口：文本 token、视觉 token、音频特征和视频帧可在同一个上下文窗口中交错输入
- Decoder-only Transformer：支持 32K 上下文，使用 Multi-Query Attention 等高效注意力机制优化长上下文推理和 KV cache
- 三档模型族：Ultra 面向复杂推理，Pro 面向成本/延迟平衡，Nano-1/Nano-2 面向端侧部署并由大模型蒸馏
- 视觉与音频处理：视觉编码继承 Flamingo、CoCa、PaLI 路线，视频被表示为帧序列，音频以 16kHz USM 特征直接接入
- 后训练流程：以 SFT、reward model 和 RLHF 对预训练模型进行指令跟随、安全性和产品化能力对齐
- 评测表现：Gemini Ultra 在 MMLU 达到约 90%，并在图像理解、视频理解、语音识别/翻译等多模态基准上取得强结果

#### 🔬 深入细节
##### 核心示意图

![Gemini 官方多模态发布图](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/06_Foundation_01.width-1000.format-webp.webp)
*图：Google 官方 Gemini 发布页配图。技术报告 Figure 2 的核心含义是：文本、图像、音频、视频被组织为同一条交错 token 序列，模型可输出文本以及离散图像 token。*

公开来源：arXiv 技术报告 `https://arxiv.org/abs/2312.11805`，Google 官方报告 PDF `https://storage.googleapis.com/deepmind-media/gemini/gemini_1_report.pdf`，Google 官方发布页 `https://blog.google/innovation-and-ai/technology/ai/google-gemini-ai/`。

##### 核心流程代码

```python
# Gemini-style native multimodal pretraining/inference flow

def encode_interleaved_inputs(items):
    sequence = []
    for item in items:
        if item.type == "text":
            sequence.extend(sentencepiece_tokenizer(item.text))
        elif item.type == "image":
            visual_tokens = vision_encoder(item.image, variable_resolution=True)
            sequence.extend(visual_tokens)
        elif item.type == "video":
            frames = sample_frames(item.video)
            for frame in frames:
                sequence.extend(vision_encoder(frame, variable_resolution=True))
        elif item.type == "audio":
            audio_features = usm_encoder(item.waveform, sample_rate=16000)
            sequence.extend(audio_features)
    return sequence

def train_step(multimodal_example, decoder):
    x = encode_interleaved_inputs(multimodal_example.context)
    y = encode_interleaved_inputs(multimodal_example.target)
    logits = decoder(x + y[:-1])
    return cross_entropy(logits[-len(y):], y)

def generate_response(prompt_items, decoder):
    tokens = encode_interleaved_inputs(prompt_items)
    while not stop(tokens):
        next_token = sample(decoder(tokens)[-1])
        tokens.append(next_token)
    return detokenize_text_and_image_tokens(tokens)
```

##### 关键公式

Gemini 的统一接口可以抽象为把不同模态映射到同一自回归序列：

$$
z = [E_{\text{text}}(x_t), E_{\text{img}}(x_i), E_{\text{aud}}(x_a), E_{\text{vid}}(x_v)]
$$

随后 decoder-only Transformer 以标准 next-token objective 训练：

$$
\mathcal{L}_{\text{NTP}}
= -\sum_{k=1}^{T}\log p_{\theta}(z_k \mid z_{<k})
$$

对于 Multi-Query Attention，可把每个 head 独立的 \(Q_h\) 与共享的 \(K,V\) 结合：

$$
\text{MQA}_h(Q_h,K,V)=\text{softmax}\left(\frac{Q_hK^\top}{\sqrt{d}}\right)V
$$

共享 \(K,V\) 的直觉是降低长上下文生成时的 KV cache 规模，使 32K 上下文、多帧视频和交错图文输入更容易服务。

##### 方法解读

Gemini 的主要动机是把多模态能力前移到预训练阶段。此前很多视觉语言模型沿用“强视觉编码器 + 语言模型 + 连接器”的路线，视觉能力常在后期通过图文对齐或指令数据补进去；这种方案能快速获得视觉问答能力，但模型内部仍然以语言为中心，遇到音频、视频、多图交错、图像输出等场景时需要额外拼接模块。Gemini 则把文本、图像、音频、视频都当成可进入同一上下文的序列元素，让跨模态推理在预训练目标中反复出现。

架构上，Gemini 1.0 仍是 decoder-only Transformer 家族，但它不是纯文本 LLM。技术报告明确提到模型支持 32K 上下文，并采用 Multi-Query Attention 等高效注意力机制；视觉编码设计继承了 Google 在 Flamingo、CoCa、PaLI 上的经验，但区别在于 Gemini 从一开始就是多模态模型。输入端，图像、图表、截图、PDF、视频帧和文本可以自然交错；音频端，模型接收 16kHz 的 USM 特征，而不是先把语音转写成文本再推理，因此保留了更多语音细节。

视频理解在 Gemini 中被处理为长上下文内的帧序列。这个设计看似朴素，但和 32K 上下文、可变分辨率视觉编码结合后，可以在任务需要细粒度视觉信息时投入更多计算，在需要时间关系时把多帧放入同一上下文。其优势是接口统一：视频帧、图片、语音提问和文本说明都进入同一条序列，模型用同一个自回归机制学习“下一步应该输出什么”。

训练数据是 Gemini 区别于后接式 VLM 的关键。报告描述其预训练语料为多模态、多语言混合数据，包含网页文档、书籍、代码以及图像、音频、视频数据；同时使用启发式规则、模型分类器、安全过滤和评测集去污染。训练混合还会分阶段调整，例如在后期提高领域相关数据权重。这意味着 Gemini 的能力不是单靠某个视觉指令集堆出来，而是来自大规模跨模态语料、训练基础设施和后训练策略的组合。

模型族设计也服务于不同部署约束。Ultra 追求复杂推理和多模态 SOTA，Pro 追求质量、成本和延迟平衡，Nano 则由大模型蒸馏并做 4-bit 量化以适配端侧。这个分层非常重要：原生多模态不只是“最大模型能力展示”，还要能把一部分能力迁移到手机等低资源环境。报告中 Nano-1 为 1.8B、Nano-2 为 3.25B，说明 Gemini 从设计上就把模型压缩和端侧运行纳入体系。

与 PaLI/LLaVA 等路线相比，Gemini 的核心差别不在某个连接器，而在训练范式。PaLI 已经证明大规模图文训练有效，LLaVA 证明轻量连接器加视觉指令微调很高效；Gemini 则把范围扩展到音频、视频、代码、图像输出和交错上下文，并用同一个模型族覆盖云端与端侧。代价是报告没有公开完整参数量和所有数据配比，复现难度很高；但它确立了后续原生多模态模型的方向：统一 token 化、统一上下文、统一生成目标。

#### 🧪 练习题
```yaml
question: "Gemini 被称为原生多模态模型的关键原因是什么？"
options:
  - "只在语言模型训练完成后增加一个视觉分类头"
  - "从预训练阶段就联合使用文本、图像、音频、视频等数据，并把它们组织为交错序列"
  - "只使用更高分辨率图像提升 OCR 能力"
  - "把所有音频先转写为文本后再送入语言模型"
answer: 1
explain: "Gemini 的核心是跨模态联合预训练和统一序列接口，而不是后期外挂单一视觉模块。"
```

### LLaVA-NeXT

```yaml
id: llava_next
num: 15
name: LLaVA-NeXT
full_name: LLaVA-NeXT
year: '2024.01'
org: UW-ByteDance
parent: llava
paper_url: arXiv
project_url: ''
category: connector
motivation: AnyRes动态分辨率切片
```

#### 📝 一句话总结
LLaVA-NeXT 在 LLaVA-1.5 的 CLIP ViT + MLP connector + LLM 框架上加入 AnyRes 动态高分辨率切片，把一张高分辨率图像拆成多个 336×336 局部视图并保留全局视图，解决低分辨率输入导致 OCR、文档、图表细节丢失的问题。

#### 🎯 核心要点
- AnyRes 切片：支持 \(\{2\times2, 1\times\{2,3,4\}, \{2,3,4\}\times1\}\) 网格，覆盖方图、竖长图和横长图
- 4 倍像素量：典型输入从 LLaVA-1.5 的 336×336 扩展到 672×672、336×1344、1344×336
- 全局 + 局部表示：保留一张下采样全局图作为上下文，再拼接高分辨率局部 crop 的视觉 token
- 架构保持轻量：继续使用 303.5M CLIP ViT-L/336px 视觉编码器、MLP connector 和不同规模 LLM
- 数据混合增强：加入高质量用户指令数据、LAION-GPT-V/ShareGPT-4V 类数据、DocVQA、SynDog-EN、ChartQA、DVQA、AI2D 等文档/图表数据
- 两阶段训练：Stage 1 用 558K 数据训练 connector，Stage 2 用 760K 数据全模型微调，总样本约 1.318M
- 工程可训练：官方模型卡给出 7B/13B/34B 训练成本分别约 8×20、16×24、32×30 GPU-hours

#### 🔬 深入细节
##### 核心示意图

![LLaVA-NeXT AnyRes 动态高分辨率切片](https://llava-vl.github.io/blog/assets/images/llava-1-6/high_res_arch_v2.png)
*图：LLaVA-NeXT 官方博客中的动态高分辨率方案。图像先按网格切为多个 336×336 局部块，同时保留下采样全局图，再将视觉特征拼接给 LLM。*

公开来源：LLaVA-NeXT 官方博客 `https://llava-vl.github.io/blog/2024-01-30-llava-next/`，更新版 LLaVA-1.5 技术报告 `https://static.hliu.cc/files/llava/improved_llava.pdf`，项目页 `https://github.com/LLaVA-VL/LLaVA-NeXT`。

##### 核心流程代码

```python
# LLaVA-NeXT AnyRes preprocessing and visual-token assembly

GRID_CANDIDATES = [(2, 2), (1, 2), (2, 1), (1, 3), (3, 1), (1, 4), (4, 1)]
PATCH_SIZE = 336

def choose_grid(width, height):
    aspect = width / height
    return min(
        GRID_CANDIDATES,
        key=lambda g: abs(aspect - (g[1] / g[0]))  # g = (rows, cols)
    )

def anyres_encode(image, vision_encoder, mlp_projector):
    rows, cols = choose_grid(image.width, image.height)
    resized = resize(image, width=cols * PATCH_SIZE, height=rows * PATCH_SIZE)

    global_view = resize_and_pad(image, PATCH_SIZE, PATCH_SIZE)
    local_views = []
    for r in range(rows):
        for c in range(cols):
            crop = resized.crop(
                c * PATCH_SIZE, r * PATCH_SIZE,
                (c + 1) * PATCH_SIZE, (r + 1) * PATCH_SIZE
            )
            local_views.append(crop)

    visual_tokens = []
    for view in [global_view] + local_views:
        patch_tokens = vision_encoder(view)       # CLIP ViT-L/336px tokens
        visual_tokens.extend(mlp_projector(patch_tokens))
    return add_image_newline_tokens(visual_tokens, rows, cols)
```

##### 关键公式

AnyRes 的目标是从候选网格中选择最接近原图宽高比的布局：

$$
(r^\*, c^\*) =
\arg\min_{(r,c)\in\mathcal{G}}
\left|\frac{W}{H} - \frac{c}{r}\right|,
\quad
\mathcal{G}=\{(2,2),(1,2),(2,1),(1,3),(3,1),(1,4),(4,1)\}
$$

若每个 336×336 视图经 ViT 得到 \(L\) 个视觉 token，保留全局图后的总视觉 token 近似为：

$$
N_{\text{vision}}=(1+r^\*c^\*)L
$$

相比只输入一张 336×336 图像，\((2,2)\) 网格可观察到 \(4\) 倍局部像素，同时全局图缓解切片造成的上下文碎片化。

##### 方法解读

LLaVA-1.5 的成功在于架构极简：CLIP ViT-L/336px 负责视觉编码，MLP connector 把视觉特征投影到 LLM 词向量空间，Vicuna 等 LLM 负责生成。这条路线训练成本低，但 336×336 的单图输入会把文档、表格、代码截图、票据和小字压缩得很厉害。LLaVA-NeXT 的第一步不是换一个复杂 resampler，而是让同一个视觉编码器多看几块局部高分辨率图像。

AnyRes 的核心设计是“网格化而非强行拉伸”。模型根据原图宽高比选择候选网格：方形图可用 \(2\times2\)，横向长图可用 \(1\times4\)，纵向长图可用 \(4\times1\)。每个局部 crop 都被缩放到 CLIP 已支持的 336×336，因此不需要对 ViT 位置编码做高分辨率插值，也不需要重新训练一个高分辨率视觉 backbone。这解释了为什么 LLaVA-NeXT 仍然保持了 LLaVA 系列的数据效率。

全局图是这个方案里容易被忽略但很关键的一步。单纯把图像切成局部块会让 LLM 丢失整体布局，例如表格标题和具体单元格被拆到不同 crop，或者图表坐标轴和图例被分离。LLaVA-NeXT 额外拼接一张下采样全局图，让语言模型先获得整体场景和布局，再从局部块中读取细节。对 OCR 和文档理解来说，这相当于同时给模型“缩略图导航”和“局部放大镜”。

数据混合也同步服务于高分辨率输入。官方博客提到移除与 TextVQA 共享训练图片的 TextCaps，以更干净地观察 zero-shot OCR；同时加入 DocVQA、SynDog-EN、ChartQA、DVQA、AI2D 等文档、图表和示意图数据。也就是说，AnyRes 提供了读取细节的表示能力，文档/图表数据则教模型如何把这些细节转成答案、JSON、推理链或对话回复。

与 LLaVA-1.5-HD 的实验探索相比，LLaVA-NeXT 把高分辨率切片做成稳定发布配方。官方模型卡显示，7B/13B/34B 共享 303.5M 视觉编码器，但 connector 和 LLM 随规模增大；分辨率统一表示为 `336 x [(2,2), (1,2), (2,1), (1,3), (3,1), (1,4), (4,1)]`。这说明 NeXT 的升级重点不是堆视觉参数，而是在不破坏原有 LLaVA 训练范式的前提下扩大可见像素和任务覆盖。

局限也很清楚：AnyRes 会线性增加视觉 token，\((2,2)\) 加全局图约为 5 份 ViT token，长图同理；当 LLM 上下文有限时，多图或视频场景会很快吃满 token budget。此外，切片虽然避免了 ViT 位置插值，但局部块之间的空间关系需要靠拼接顺序和 newline token 间接表达，跨块细粒度定位仍不如显式二维位置建模或专门的高分辨率架构。

#### 🧪 练习题
```yaml
question: "LLaVA-NeXT AnyRes 中保留下采样全局图的主要作用是什么？"
options:
  - "替代所有局部 crop，减少视觉 token 到一个固定长度"
  - "提供整图布局和上下文，缓解局部切片带来的上下文碎片化"
  - "让模型不再需要 MLP connector"
  - "把 OCR 任务转换成纯文本任务"
answer: 1
explain: "局部 crop 提供细节，全局图提供整体布局；二者拼接后模型既能读小字，也能理解这些细节在整图中的位置。"
```

### InternVL 2.5

```yaml
id: internvl_2_5
num: 16
name: InternVL 2.5
full_name: InternVL 2.5
year: '2024'
org: 上海AI Lab
parent: —
paper_url: arXiv
project_url: ''
category: connector
motivation: 动态高分辨率+Pixel Unshuffle
```

#### 📝 一句话总结
InternVL 2.5 沿用 ViT-MLP-LLM 框架，但用 InternViT-6B/300M、动态高分辨率切片和 Pixel Unshuffle 把每个 448×448 tile 的视觉 token 从 1024 压到 256，解决高分辨率视觉输入与 LLM 上下文成本之间的矛盾，并成为首个 MMMU 验证集超过 70 分的开源 MLLM。

#### 🎯 核心要点
- ViT-MLP-LLM 架构：以 InternViT-6B 或 InternViT-300M 为视觉编码器，通过 2 层 MLP projector 连接 InternLM 2.5/Qwen 2.5 等 LLM
- Pixel Unshuffle 压缩：448×448 tile 产生的 32×32=1024 个视觉 token 被重排为 16×16=256 个 token，token 数降为 1/4
- 动态高分辨率：按输入宽高比选择最接近的 tile 网格，resize 后切成多个 448×448 tile，并可追加 448×448 thumbnail 全局视图
- 多数据类型统一：单图、多图、视频分别采用不同 tile budget 分配方式，统一用 `<img>`、`</img>`、`Image-i`、`Frame-i` 等格式组织
- 三阶段训练：Stage 1 MLP warmup，Stage 1.5 可选 ViT incremental learning，Stage 2 full model instruction tuning
- 渐进式扩展：先用较小 LLM 优化 InternViT，再把视觉端迁移到更大 LLM，减少大模型重复训练成本
- 测试时扩展：在 MMMU 等困难任务上结合 CoT、majority voting 提升结果，InternVL2.5-78B CoT 达到 70+ MMMU 验证集表现

#### 🔬 深入细节
##### 核心示意图

![InternVL 2.5 总体架构](https://arxiv.org/html/2412.05271v1/x2.png)
*图：InternVL 2.5 论文 Figure 2。模型保留 ViT-MLP-LLM 范式，视觉端输出经 Pixel Unshuffle 降低 token 数，再通过 MLP projector 接入语言模型。*

公开来源：arXiv HTML `https://arxiv.org/html/2412.05271v1`，论文页 `https://arxiv.org/abs/2412.05271`，Hugging Face 项目页 `https://huggingface.co/OpenGVLab`。

##### 核心流程代码

```python
# InternVL 2.5 dynamic high-resolution + pixel unshuffle pipeline

TILE = 448

def build_target_ratios(n_min, n_max, n):
    ratios = []
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            if n_min <= i * j <= n_max:
                ratios.append((i, j, i / j))
    return ratios

def dynamic_tiles(image, n_min=1, n_max=12, n=12, add_thumbnail=True):
    W, H = image.width, image.height
    aspect = W / H
    i_best, j_best, _ = min(
        build_target_ratios(n_min, n_max, n),
        key=lambda x: abs(aspect - x[2])
    )
    resized = resize(image, width=TILE * i_best, height=TILE * j_best)
    tiles = split_into_tiles(resized, tile_size=TILE)
    if add_thumbnail and len(tiles) > 1:
        tiles.append(resize(image, TILE, TILE))
    return tiles

def pixel_unshuffle_tokens(vit_feature_map, factor=2):
    # vit_feature_map: [32, 32, C] from one 448x448 tile with patch size 14
    # output: [16, 16, 4C], then flatten to 256 tokens
    x = rearrange(
        vit_feature_map,
        "(h r) (w s) c -> h w (r s c)",
        r=factor,
        s=factor
    )
    return flatten(linear_project(x))  # [256, D_llm]

def internvl_forward(sample, internvit, mlp, llm):
    visual_tokens = []
    for tile in dynamic_tiles(sample.image):
        fmap = internvit(tile)
        visual_tokens.extend(mlp(pixel_unshuffle_tokens(fmap)))
    prompt = chatml_wrap("<img>", visual_tokens, "</img>", sample.question)
    return llm.generate(prompt)
```

##### 关键公式

动态分辨率首先构造候选宽高比集合：

$$
\mathcal{R}=
\left\{i/j \mid 1\le i,j\le n,\ i\times j\in[n_{\min},n_{\max}]\right\}
$$

给定原图 \(W\times H\)，选择最接近原图宽高比的目标：

$$
r_{\text{best}}=
\arg\min_{r_{\text{target}}\in\mathcal{R}}
\left|\frac{W}{H}-r_{\text{target}}\right|
$$

若 \(S=448\)，对应网格为 \(i_{\text{best}}\times j_{\text{best}}\)，resize 后尺寸为：

$$
W_{\text{new}}=S\cdot i_{\text{best}},\quad
H_{\text{new}}=S\cdot j_{\text{best}}
$$

Pixel Unshuffle 的 token 压缩可写成：

$$
F\in\mathbb{R}^{32\times32\times C}
\rightarrow
\text{Unshuffle}_{2}(F)\in\mathbb{R}^{16\times16\times4C}
\rightarrow
256\ \text{tokens}
$$

这一步把空间分辨率折叠进通道维，使每个 tile 的 token 数从 \(1024\) 降为 \(256\)。

##### 方法解读

InternVL 2.5 的基本架构并不追求花哨的跨注意力模块，而是继续采用被大量开源 MLLM 验证过的 ViT-MLP-LLM 范式。视觉端可以是 InternViT-6B，也可以是较小的 InternViT-300M；中间使用随机初始化的 2 层 MLP projector；语言端接入 InternLM 2.5 或 Qwen 2.5 等不同规模 LLM。论文强调这种架构与 InternVL 1.5/2.0 保持一致，真正的提升来自视觉端持续增量训练、动态高分辨率、数据质量和测试时推理策略的共同扩展。

Pixel Unshuffle 是 InternVL 处理高分辨率成本的核心。一个 448×448 tile 经过 patch size 14 的 ViT 后会得到 \(32\times32=1024\) 个 patch token；如果多 tile 直接送入 LLM，token 成本会迅速爆炸。Pixel Unshuffle 用因子 2 把相邻 \(2\times2\) 空间位置重排到通道维，得到 \(16\times16\) 个位置，每个位置通道数变成 \(4C\)，再由线性/MLP 投影到 LLM 维度。它牺牲一部分显式空间粒度，但保留局部邻域信息，换来 4 倍 token 压缩。

动态高分辨率负责决定“看哪些 tile”。InternVL 不是把所有图像都压成固定方图，而是先根据原图宽高比在候选集合 \(\mathcal{R}\) 中找最接近的网格，再把图像 resize 到 \(448i\times448j\)，切成多个 448×448 tile。若 tile 数大于 1，还会追加一个 448×448 thumbnail 作为全局视图。这个设计和 LLaVA-NeXT 的全局+局部思想相近，但 InternVL 用更大的 tile 和 Pixel Unshuffle 控制 token 预算。

InternVL 2.5 还把动态高分辨率扩展到多图和视频。单图样本会尽量把 \(n_{\max}\) 分配给一张图，以获得最高分辨率；多图样本会把 tile budget 按图片数分配，并用 `Image-1` 等辅助标签区分；视频样本则通常把 \(n_{\max}=1\)，每帧 resize 到 448×448，因为 32 或 64 帧已经会产生 8192 或 16384 个视觉 token。这个数据格式设计让单图、多图、视频都能复用同一个 LLM 接口。

训练流程分三步。Stage 1 只训练 MLP projector，冻结 InternViT 和 LLM，用 next-token prediction 让视觉特征先进入语言空间；Stage 1.5 可选地解冻视觉编码器和 MLP，用同样的预训练数据增强 InternViT，重点补强多语言 OCR、数学图表等 web-scale CLIP 数据不充分覆盖的领域；Stage 2 全模型 instruction tuning，让 ViT、MLP、LLM 一起适配高质量多模态指令。论文特别强调 Stage 2 数据质量，因为 LLM 已经可训练，少量噪声就可能诱发重复输出等异常行为。

渐进式扩展是 InternVL 2.5 的工程亮点。作者观察到，即便 InternViT 和某个较小 LLM 通过 NTP 联合训练，视觉特征仍能迁移给其他 LLM；因此可以先用较小 LLM 优化视觉端，再把训练好的 InternViT 接到 72B/78B 等更大语言模型，跳过昂贵的重复视觉增量学习。论文给出的对比是 Qwen2-VL 累计处理约 1.4T token，而 InternVL2.5-78B 约 120B token，体现了组件复用对训练成本的意义。

性能提升不只来自模型训练，也来自测试时扩展。InternVL2.5-78B 在 MMMU 直接回答和 CoT 设置中取更高分，CoT 可带来明显提升；进一步的 majority voting 也能改善困难多模态问答。这里的启发是：高分辨率视觉输入负责提供可见证据，Pixel Unshuffle 控制 token 成本，CoT/投票把推理时间换成更稳定的答案，三者共同支撑了其 MMMU 70+ 的开源结果。

#### 🧪 练习题
```yaml
question: "InternVL 2.5 中 Pixel Unshuffle 的主要作用是什么？"
options:
  - "把 448×448 图像放大到更高分辨率"
  - "将 32×32 视觉特征重排为 16×16 特征，把每个 tile 的 token 数降到 1/4"
  - "替代语言模型中的自注意力层"
  - "把多图样本随机丢弃到单图样本"
answer: 1
explain: "Pixel Unshuffle 将局部空间邻域折叠到通道维，保留局部信息的同时显著降低送入 LLM 的视觉 token 数。"
```

### InternVL 3.5

```yaml
id: internvl_3_5
num: 17
name: InternVL 3.5
full_name: InternVL 3.5
year: '2025'
org: 上海AI Lab
parent: internvl_2_5
paper_url: arXiv
project_url: ''
category: connector
motivation: 级联RL逻辑对齐
```

#### 📝 一句话总结
InternVL 3.5 在既有 ViT-MLP-LLM 多模态架构上加入 Cascade RL，把离线 MPO 的稳定热启动和在线 GSPO 的自生成探索串联起来解决复杂视觉推理对齐问题；同时通过 ViR 动态压缩视觉 token、DvD 解耦视觉与语言部署，使模型在保持性能的同时显著降低推理延迟。

#### 🎯 核心要点
- 维持 InternVL 系列的 “ViT-MLP-LLM” connector 范式，视觉侧使用 InternViT-300M/6B，语言侧覆盖 Qwen3 与 GPT-OSS，模型规模从 1B 到 241B-A28B
- 训练流程分为原生多模态预训练、SFT、Cascade RL，并为 Flash 版本追加 Visual Consistency Learning 与 router training
- Cascade RL 先用离线 MPO 训练偏好/质量/生成三类损失，再用在线 GSPO 基于模型自采样 rollout 继续提升推理上限
- GSPO 使用同一 query 下多候选 response 的归一化 reward 作为优势，并用序列级几何均值 ratio 代替逐 token ratio
- Visual Resolution Router (ViR) 对图像 patch 按语义信息量选择 \(1/4\) 或 \(1/16\) 压缩率，使高信息 patch 保留更多视觉 token
- Visual Consistency Learning (ViCO) 用 KL 约束不同视觉压缩率下的输出分布，让 Flash 版本压缩视觉 token 时尽量保持原模型行为
- Decoupled Vision-Language Deployment (DvD) 将 ViT/MLP/ViR 与 LLM 分别部署在视觉服务器和语言服务器，用异步流水线重叠视觉编码、特征传输和语言解码
- 公开来源显示 InternVL3.5 相比 InternVL3 最高获得 +16.0% 推理性能提升，并在 DvD+ViR 设置下报告最高 4.05x 推理加速

#### 🔬 深入细节
##### 核心示意图

![InternVL3.5 总体架构](https://arxiv.org/html/2508.18265v1/x2.png)
*图：InternVL3.5 仍采用 ViT-MLP-LLM 主干；InternVL3.5-Flash 在视觉 token 压缩路径上加入 ViR，为不同 patch 选择不同压缩率。*

![InternVL3.5 DvD 部署框架](https://arxiv.org/html/2508.18265v1/x4.png)
*图：DvD 将视觉模块和语言模块拆到不同服务，视觉编码与 LLM prefill/decoding 可以异步重叠执行。*

公开来源：论文 `https://arxiv.org/abs/2508.18265`，论文 HTML `https://arxiv.org/html/2508.18265v1`，官方项目 `https://github.com/OpenGVLab/InternVL`。

##### 核心流程代码

```python
# InternVL3.5: post-training, Flash compression, and DvD inference sketch

def train_internvl35(model, sft_data, mmpr_pairs, online_queries, vico_data):
    # 1) Native pretraining is inherited from the InternVL3-style ViT-MLP-LLM setup.
    # 2) SFT teaches instruction following, thinking traces, GUI/embodied/SVG skills.
    train_sft(model, sft_data, max_context=32_000)

    # 3) Cascade RL, stage A: offline MPO warm-up from existing preference pairs.
    for batch in mmpr_pairs:
        loss_pref = dpo_loss(model, batch.chosen, batch.rejected)
        loss_quality = bco_loss(model, batch.quality_labels)
        loss_gen = lm_loss(model, batch.reference_responses)
        loss_mpo = wp * loss_pref + wq * loss_quality + wg * loss_gen
        update(model, loss_mpo)

    # 4) Cascade RL, stage B: online GSPO on model-sampled rollouts.
    for query in online_queries:
        responses = sample_group(model.old_policy, query, group_size=G)
        rewards = score_with_rule_or_reward_model(query, responses)
        advantages = normalize_within_query(rewards)
        loss_gspo = clipped_sequence_policy_loss(model, query, responses, advantages)
        update(model, -loss_gspo)  # maximize clipped objective

    # 5) ViCO: make compressed visual tokens imitate the full-resolution policy.
    ref = freeze(copy_model(model))
    for sample in vico_data:
        xi = random_choice([1 / 4, 1 / 16])
        compressed_image = compress_visual_tokens(sample.image, rate=xi)
        loss_vico = kl(ref(sample.image), model(compressed_image))
        update(model, loss_vico)

    # 6) Router training: freeze MLLM, train ViR to select compression per patch.
    freeze(model.vit, model.mlp, model.llm)
    for patch in visual_patches(vico_data):
        r = vico_loss(patch, rate=1 / 16) / vico_loss(patch, rate=1 / 4)
        target = 1 if r >= dynamic_percentile_threshold() else 0
        update(model.visual_resolution_router, cross_entropy(router(patch), target))


def dvd_inference(request):
    # Vision server: high-throughput image-side batching.
    visual_features = vision_server.encode_with_vit_mlp_vir(request.images)
    send_bf16_features_to_language_server(visual_features)

    # Language server: only LLM prefill/decoding, overlapped with vision work.
    prompt = fuse_text_and_visual_features(request.text, visual_features)
    return language_server.decode(prompt)
```

##### 关键公式

离线阶段使用 Mixed Preference Optimization，将偏好学习、质量约束和生成保持合为一个目标：

$$
\mathcal{L}_{\text{MPO}}
=w_p\mathcal{L}_p+w_q\mathcal{L}_q+w_g\mathcal{L}_g
$$

在线 GSPO 对同一输入 \(x\) 采样 \(G\) 个回答，先在组内标准化 reward 得到优势：

$$
\widehat{A}_i=
\frac{r(x,y_i)-\operatorname{mean}(\{r(x,y_i)\}_{i=1}^{G})}
{\operatorname{std}(\{r(x,y_i)\}_{i=1}^{G})}
$$

然后用序列级几何均值 ratio 做裁剪策略优化：

$$
s_i(\theta)=
\left(
\frac{\pi_{\theta}(y_i\mid x)}
{\pi_{\theta_{\text{old}}}(y_i\mid x)}
\right)^{1/|y_i|}
=
\exp\left(
\frac{1}{|y_i|}\sum_{t=1}^{|y_i|}
\log\frac{\pi_{\theta}(y_{i,t}\mid x,y_{i,<t})}
{\pi_{\theta_{\text{old}}}(y_{i,t}\mid x,y_{i,<t})}
\right)
$$

$$
\mathcal{L}_{\mathrm{GSPO}}(\theta)=
\mathbb{E}\left[
\frac{1}{G}\sum_{i=1}^{G}
\min\left(
s_i(\theta)\widehat{A}_i,\;
\operatorname{clip}(s_i(\theta),1-\varepsilon,1+\varepsilon)\widehat{A}_i
\right)
\right]
$$

Flash 版本的 ViCO 用未压缩参考模型约束压缩视觉输入下的策略输出：

$$
\mathcal{L}_{\text{ViCO}}=
\mathbb{E}_{\xi\sim\mathcal{R}}
\left[
\frac{1}{N}\sum_{i=1}^{N}
\mathrm{KL}\left(
\pi_{\theta_{\mathrm{ref}}}(y_i\mid y_{<i},I)
\;\|\;
\pi_{\theta_{\mathrm{policy}}}(y_i\mid y_{<i},I_{\xi})
\right)
\right]
$$

其中 \(\xi\in\{\frac{1}{4},\frac{1}{16}\}\)。Router 训练时用压缩带来的相对损失增长给 patch 打标签：

$$
r_i=
\frac{\mathcal{L}_{\text{ViCO}}(y_i\mid I_{1/16})}
{\mathcal{L}_{\text{ViCO}}(y_i\mid I_{1/4})},
\qquad
y_i^{\text{router}}=
\begin{cases}
0,& r_i<\tau\\
1,& r_i\ge\tau
\end{cases}
$$

##### 方法解读

InternVL3.5 的主要矛盾不是“如何再接一个更大的 LLM”，而是如何让多模态模型在复杂数学、科学、图表和视觉推理任务上形成更稳定的长链路推理行为。纯 SFT 能注入高质量 thinking 数据，但它主要学习正样本分布，缺少显式压低坏答案的信号；纯在线 RL 又昂贵、采样噪声大，尤其在多模态高分辨率输入和大模型规模下 rollout 成本很高。Cascade RL 的设计就是把这两个阶段拆开：先用已有偏好数据做离线 MPO，把模型从 SFT 分布推到更好的区域，再让在线 GSPO 在这个更强的初始策略上继续采样和优化。

离线 MPO 的直觉是“三种约束同时拉住模型”。\(\mathcal{L}_p\) 负责偏好方向，通常对应 chosen 优于 rejected；\(\mathcal{L}_q\) 负责质量判别，避免模型只学会形式上偏好某类输出；\(\mathcal{L}_g\) 维持语言建模能力，防止偏好优化过度破坏基础生成分布。这样做比只做 DPO 更保守，但更适合 MLLM：图像理解、OCR、数学推理和对话格式都需要保留，不能为了某一类 reward 把通用能力牺牲掉。

在线 GSPO 与常见 PPO/GRPO 的关键差异在于 ratio 的粒度。它不用逐 token 的重要性比率直接驱动整个序列，而是把 per-token log ratio 求平均后指数化，形成 \(s_i(\theta)\)。这相当于用“整段回答的平均策略变化”作为裁剪对象，减少长答案因为少数 token ratio 极端而导致的优化不稳定。优势 \(\widehat{A}_i\) 在同一个 query 的多条回答内部标准化，使 reward 更像相对排序信号：同题下更好的推理链被增强，更差的推理链被压低。

ViR 解决的是另一个瓶颈：动态高分辨率视觉输入会把很多 patch 送入 ViT 和 LLM，但并不是每个 patch 都同等重要。文档、图表、公式或小目标区域需要较高视觉 token 密度，背景或低信息区域可以更强压缩。ViCO 先让模型适应 \(1/4\) 与 \(1/16\) 两种压缩率，并通过 KL 让压缩输入下的输出贴近 full token 参考模型；随后 router 用压缩前后损失比 \(r_i\) 学习哪些 patch 不能压缩。这个监督来自模型自身输出分布，而不是人工标注区域，因此能规模化应用到 SFT 数据。

DvD 则是工程层面的 connector 优化。传统 MLLM 推理把 ViT、MLP、LLM 串行放在同一服务路径里，高分辨率或多图输入会阻塞 LLM prefill，语言解码又会让视觉 GPU 利用率不稳定。DvD 把视觉侧作为独立服务批量编码图像，再把 BF16 视觉特征单向传给语言服务；语言服务只负责融合视觉 token 与文本上下文并解码。由于视觉编码高度并行、LLM 解码强依赖 KV cache 和内存带宽，二者拆开后可以分别调度硬件，减少互相等待。

与 InternVL2.5/InternVL3 相比，InternVL3.5 的贡献不只是“更大模型 + 更多数据”。它把 post-training、视觉 token 预算和线上部署三个层面串起来：Cascade RL 提高复杂推理能力，ViR/ViCO 降低视觉 token 成本，DvD 把视觉与语言计算重叠起来。这个组合使它更像一个可落地的多模态系统方案，而不是单一模型架构改动。

> 💡 关键：Cascade RL 提升的是输出空间的推理分布，ViR/ViCO 优化的是输入视觉 token 的预算，DvD 优化的是服务端执行图；三者分别对应能力、输入成本和系统吞吐。

#### 🧪 练习题
```yaml
question: "InternVL3.5 为什么要先做离线 MPO 再做在线 GSPO？"
options:
  - "离线 MPO 用已有偏好样本稳定热启动，在线 GSPO 再用模型自采样 rollout 提高性能上限"
  - "离线 MPO 只训练视觉编码器，在线 GSPO 只训练语言模型"
  - "离线 MPO 负责压缩视觉 token，在线 GSPO 负责把 ViT 部署到独立服务器"
  - "离线 MPO 会删除所有负样本，在线 GSPO 再恢复负样本"
answer: 0
explain: "Cascade RL 的核心是把高效稳定的离线偏好优化放在前面，再用在线采样继续细化策略分布；这降低直接在线 RL 的成本和不稳定性。"
```

### SigLIP 2

```yaml
id: siglip2
num: 18
name: SigLIP 2
full_name: SigLIP 2
year: '2026.02'
org: Google
parent: clip
paper_url: arXiv
project_url: ''
category: frontier_2026
motivation: 统一训练配方增强定位
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

### LLM2CLIP

```yaml
id: llm2clip
num: 19
name: LLM2CLIP
full_name: LLM2CLIP
year: '2026.01'
org: AAAI 2026杰出论文
parent: clip
paper_url: AAAI 2026
project_url: ''
category: frontier_2026
motivation: 语言模型解锁视觉表示
```

#### 📝 一句话总结
LLM2CLIP 提出先用 caption-to-caption 对比学习把 LLM “embedding 化”，再冻结该 LLM 作为强文本教师去微调预训练 CLIP 视觉编码器，解决 vanilla CLIP 文本塔短上下文、弱语义理解以及原始 LLM embedding 不适合直接做图文对比监督的问题。

#### 🎯 核心要点
- 识别出直接把 LLM 接进 CLIP 的核心障碍：原始 LLM 输出 embedding 在 caption 检索中可分性差，难以支撑 batch 内对比学习
- Stage 1 使用 Caption-Contrastive (CC) fine-tuning，将同一图像的不同 caption 视为正样本、其他 caption 视为负样本，用 supervised SimCSE 提升 LLM caption embedding 判别性
- LLM 侧采用平均池化、可选双向注意力/LoRA 等 embedding 化技巧；论文最终强调 supervised SimCSE 是最关键训练信号，MNTP 不是默认主因
- Stage 2 丢弃原 CLIP text encoder，冻结 CC-tuned LLM，把 LLM sentence embedding 经小 adaptor/projector 与 CLIP visual encoder 做图文对比学习
- 训练成本接近普通 CLIP 微调：LLM 梯度冻结，文本特征可预提取，主要更新视觉编码器、adapter 和 projection layer
- 支持长文本、dense caption 和跨语言检索，因为 LLM 教师具备更长上下文窗口和开放世界语言知识
- 官方项目显示论文获得 AAAI 2026 Outstanding Paper Award，并发布代码、模型与 LLM2CLIP-enhanced CLIP/EVA/SigLIP2 系列 checkpoint
- 实验覆盖短/长文本检索、多语言检索、零样本分类、检测、分割，以及作为 LLaVA-1.5 视觉编码器的替换效果

#### 🔬 深入细节
##### 核心示意图

![LLM2CLIP 方法总览](https://arxiv.org/html/2411.04997v5/x1.png)
*图：LLM2CLIP 先对 LLM 做 caption contrastive fine-tuning，提高文本 embedding 可分性；随后冻结 LLM，让其作为文本教师微调 CLIP 视觉编码器。*

公开来源：论文 `https://arxiv.org/abs/2411.04997`，论文 HTML `https://arxiv.org/html/2411.04997v5`，官方项目页 `https://microsoft.github.io/LLM2CLIP/`，官方仓库 `https://github.com/microsoft/LLM2CLIP`。

##### 核心流程代码

```python
# LLM2CLIP two-stage training sketch

def stage1_caption_contrastive_tune(llm, caption_pairs, text_pairs):
    # Turn an autoregressive LLM into a caption embedding model.
    llm.enable_lora(rank=16, alpha=32)
    llm.remove_or_relax_causal_mask()      # bidirectional attention variant

    for batch in mix(caption_pairs, text_pairs):
        # Positive pairs: two captions describing the same image,
        # or paired pure-text samples to preserve general language ability.
        q_text, pos_text = batch.query, batch.positive
        q = average_pool(llm(prompt(q_text)))
        k = average_pool(llm(prompt(pos_text)))
        zq, zk = l2_normalize(q), l2_normalize(k)
        loss_cc = supervised_simcse_loss(zq, zk, temperature=tau)
        update_lora(llm, loss_cc)

    return freeze(llm)


def stage2_llm2clip_post_tune(pretrained_clip, frozen_llm, image_text_data):
    # Discard the original CLIP text tower; use the CC-tuned LLM as text teacher.
    vision_encoder = pretrained_clip.visual_encoder
    adaptor = MLPOrTransformerAdaptor()
    image_proj = Linear(...)
    text_proj = Linear(...)

    # Optional efficiency trick: pre-extract frozen LLM text features to disk.
    text_feature_cache = precompute(frozen_llm, [x.caption for x in image_text_data])

    for images, captions in image_text_data:
        v = image_proj(vision_encoder(images))
        t = text_proj(adaptor(text_feature_cache[captions]))

        logits = exp(logit_scale) * l2_normalize(v) @ l2_normalize(t).T
        labels = arange(len(images))
        loss_i2t = cross_entropy(logits, labels)
        loss_t2i = cross_entropy(logits.T, labels)
        loss = (loss_i2t + loss_t2i) / 2

        update(vision_encoder, adaptor, image_proj, text_proj, loss)

    return EnhancedCLIP(vision_encoder, frozen_llm, adaptor, image_proj, text_proj)
```

##### 关键公式

Stage 1 的 caption-contrastive 目标可写成 supervised SimCSE。对同一图像的两条 caption \(c_i^a,c_i^b\)，用 LLM 得到归一化 embedding \(z_i^a,z_i^b\)，batch 内其他 caption 作为负样本：

$$
\mathcal{L}_{\mathrm{CC}}
=
-\frac{1}{B}\sum_{i=1}^{B}
\log
\frac{\exp(\operatorname{sim}(z_i^a,z_i^b)/\tau)}
{\sum_{j=1}^{B}\exp(\operatorname{sim}(z_i^a,z_j^b)/\tau)}
$$

Stage 2 冻结 CC-tuned LLM，令图像 embedding 为 \(\hat v_i\)，LLM 文本 embedding 经 adaptor/projector 后为 \(\hat e_j\)，使用 CLIP 式对称图文对比损失：

$$
\ell_{i\rightarrow t}
=
-\log
\frac{\exp(\alpha\,\hat v_i^\top \hat e_i)}
{\sum_{j=1}^{B}\exp(\alpha\,\hat v_i^\top \hat e_j)}
,\qquad
\ell_{t\rightarrow i}
=
-\log
\frac{\exp(\alpha\,\hat e_i^\top \hat v_i)}
{\sum_{j=1}^{B}\exp(\alpha\,\hat e_i^\top \hat v_j)}
$$

$$
\mathcal{L}_{\mathrm{LLM2CLIP}}
=
\frac{1}{2B}\sum_{i=1}^{B}
\left(
\ell_{i\rightarrow t}+\ell_{t\rightarrow i}
\right)
$$

直觉上，\(\mathcal{L}_{\mathrm{CC}}\) 先让 LLM 输出空间具备 caption 级判别性，\(\mathcal{L}_{\mathrm{LLM2CLIP}}\) 再把这种更强文本语义投射到视觉编码器上。

##### 方法解读

LLM2CLIP 的出发点很直接：CLIP 的强大来自自然语言监督，但原始 CLIP 文本塔上下文短、参数小、语言理解弱，难以充分利用长 caption、dense caption 和复杂描述。直觉上，把 Llama、Mistral 这类 LLM 作为文本塔应该能提供更强监督；但论文首先证明了一个反直觉问题：vanilla LLM 的最后层表示并不天然适合 CLIP contrastive learning。它们可能擅长生成下一个 token，却不一定让两条语义相近的 caption 在 embedding 空间中相近，也不一定让细粒度不同的 caption 分开。

因此 Stage 1 不是训练图像模型，而是先“改造 LLM 输出空间”。同一张图的不同 caption 被当成正样本，因为它们描述同一视觉语义；不同图像的 caption 是负样本，因为它们应当在 retrieval 空间中区分开。Supervised SimCSE 直接优化 caption-to-caption retrieval 所需的几何结构，使 LLM embedding 从生成式 token head 转向判别式 sentence embedding。官方 FAQ 也说明 SimCSE 是关键损失，MNTP 更像早期初始化步骤，去掉后不改变主要结论。

Stage 2 的设计故意保持简单：原 CLIP text encoder 被移除，CC-tuned LLM 冻结，视觉编码器和少量 adaptor/projector 学习对齐到 LLM 文本空间。冻结 LLM 有两个好处。第一，显存和计算接近普通 CLIP 微调，尤其在大 batch 对比学习中不需要为 LLM 反传保存激活；第二，LLM 的开放世界知识和长文本理解能力不会被小规模图文数据破坏。文本特征还可以预提取到磁盘，训练时直接读取 embedding，让主要成本集中在视觉侧。

这种方案和“直接训练一个更长上下文 CLIP 文本塔”不同。长上下文 CLIP 仍然需要从图文数据中学习语言理解，而 LLM2CLIP 先借用已经训练好的 LLM 语言能力，再通过 CC 让它适配 caption embedding。也就是说，LLM 不是下游对话模型里的推理器，而是视觉表示学习中的文本教师。它给视觉编码器提供更细粒度、更长上下文、更具世界知识的监督信号，视觉侧最终变强后可继续作为检索模型、VLM 视觉塔或检测/分割 backbone 使用。

LLM2CLIP 的另一个重要点是它解释了为什么“强文本模型”不能直接等价于“强 CLIP 文本塔”。图文对比学习需要的是 batch 内可分、跨模态可对齐的向量空间，而不是能生成流畅回答的 hidden state。Stage 1 的 caption-to-caption 检索实验把这个缺口显性化：如果纯 LLM caption embedding 连同图不同描述都找不准，就很难当作视觉训练的教师。CC fine-tuning 修复这个几何结构后，Stage 2 才能有效把 LLM 能力迁移给 CLIP。

从工程角度看，LLM2CLIP 的价值在于“低成本后训练”。它不要求从零重训 CLIP，也不要求把 LLM 全量纳入反向传播；3M、15M、60M 级别图文数据即可显著提升多个 CLIP/EVA/SigLIP2 变体。官方项目还展示了 SigLIP2 + LLM2CLIP 在短文本、长文本和多语言检索上的提升，这说明该方法更像一种可套在已有视觉语言编码器上的 post-training recipe。

> 💡 关键：LLM2CLIP 的核心不是“把 LLM 接到 CLIP 上”这一动作本身，而是先把 LLM 输出空间训练成适合 caption retrieval 的判别空间，再用冻结 LLM 作为低成本、高语义密度的文本教师。

#### 🧪 练习题
```yaml
question: "LLM2CLIP 为什么需要先做 Caption-Contrastive fine-tuning？"
options:
  - "因为原始 LLM 的 caption embedding 可分性不足，直接用于 CLIP 对比学习会提供不稳定监督"
  - "因为 CLIP 图像编码器只能读取 LLM 的 token id，不能读取 embedding"
  - "因为 Caption-Contrastive fine-tuning 会把图像压缩成 64 个视觉 token"
  - "因为 Stage 2 必须全量更新 LLM，否则无法计算交叉熵"
answer: 0
explain: "LLM2CLIP 先用同图 caption 正样本和 batch 内负样本训练 LLM 输出空间，使其具备 caption 级判别性；之后冻结该 LLM 才能稳定地指导 CLIP 视觉编码器微调。"
```

### GPT-5.4

```yaml
id: gpt5_4
num: 20
name: GPT-5.4
full_name: GPT-5.4
year: '2026.03'
org: OpenAI
parent: gemini
paper_url: —
project_url: ''
category: native_multimodal
motivation: 原生统一架构+1M上下文
```

#### 📝 一句话总结
GPT-5.4 没有公开论文，公开资料显示它把文本、图像/截图、长上下文、工具搜索和计算机操作放进同一个 agentic reasoning 工作流，重点解决长任务中“看见界面、选择工具、执行动作、验证结果”的闭环问题。

#### 🎯 核心要点
- 官方发布信息：OpenAI 于 2026-03-05 发布 GPT-5.4，覆盖 ChatGPT、API 和 Codex，定位为面向专业工作的 frontier model。
- 原生计算机使用：OpenAI 将 GPT-5.4 描述为首个具备原生 state-of-the-art computer-use 能力的通用模型，可基于截图发出鼠标/键盘动作，也可写代码操作应用。
- 1M 长上下文：Codex 和 API 中支持 up to 1M tokens context，用于长文档、代码库、计划-执行-验证链路和跨工具任务。
- 工具搜索：不把所有工具 schema 一次性塞进上下文，而是让模型在大工具生态中按需发现和加载工具，降低上下文占用。
- 视觉/交互评测：官方发布页报告 OSWorld-Verified 75.0%、WebArena-Verified 67.3%、Online-Mind2Web 92.8%，强调屏幕理解和浏览器/桌面操作。
- 安全卡片：GPT-5.4 Thinking system card 将其作为 GPT-5 系列 reasoning model 讨论，并说明其首次在通用模型上实现 High cybersecurity capability mitigation。
- 公开资料核验：输入描述中的 “MMMU Pro 75%” 未在 GPT-5.4 主发布页中出现；OpenAI 后续 GPT-5.4 mini/nano 发布页给出的 GPT-5.4 xhigh 为 MMMUPro 81.2、MMMUPro w/ Python 81.5，可能对应不同时间或 harness。

#### 🔬 深入细节
##### 官方示意图

![GPT-5.4 电子表格能力示例](https://images.ctfassets.net/kftzwdyauwt9/6HIfga5zjofGwccjVeZA2e/fcca68f123b1110c7b4f275caa2d3669/Spreadsheet_-_desktop_-_light.png?fm=webp&q=90&w=3840)
*图：OpenAI GPT-5.4 发布页中的 spreadsheet 输出对比示例。它不是网络架构图，但能代表 GPT-5.4 面向“可视化文档/表格 + 操作执行 + 结果产物”的产品化能力边界。*

公开来源：OpenAI GPT-5.4 发布页 `https://openai.com/index/introducing-gpt-5-4/`；GPT-5.4 Thinking System Card `https://openai.com/index/gpt-5-4-thinking-system-card/`；GPT-5.4 mini/nano benchmark 页 `https://openai.com/index/introducing-gpt-5-4-mini-and-nano/`。

##### Agentic computer-use 流程伪代码

```python
# GPT-5.4: long-context multimodal computer-use loop (公开资料抽象版)

def run_gpt54_agent(task, long_context, tool_catalog, computer):
    memory = load_project_memory()
    trace = []

    while not solved(task, trace):
        # 1. 原生多模态观察：文本、文件、截图、历史轨迹共同进入上下文
        screenshot = computer.capture_screen()
        state = build_context(
            task=task,
            text_context=long_context,
            image_context=screenshot,
            memory=memory,
            action_trace=trace,
        )

        # 2. 工具搜索：只在需要时加载候选工具的详细 schema
        tool_query = model.decide_tool_need(state)
        tools = tool_search(tool_catalog, tool_query) if tool_query else []

        # 3. 推理与行动：输出自然语言、代码、函数调用或鼠标/键盘动作
        action = model.plan_and_act(state, tools=tools, effort="xhigh")
        observation = execute(action, computer=computer, tools=tools)
        trace.append((action, observation))

        # 4. 验证：检查 UI 状态、文件产物、测试结果或用户约束
        verdict = model.verify(task, trace, observation)
        if verdict.needs_repair:
            trace.append(("repair_note", verdict.feedback))
            continue

        update_memory(memory, task, trace)
        return model.final_answer(task, trace)
```

##### 关键公式

可以把公开能力抽象成“多模态状态到动作”的策略模型。给定任务 \(g\)、文本/代码上下文 \(X\)、截图或图像 \(I_t\)、可用工具集合 \(\mathcal{T}\)、历史轨迹 \(H_t\)，模型在第 \(t\) 步的状态为：

$$
s_t = [g;\, X_{\le 1M};\, E_{\text{img}}(I_t);\, E_{\text{tool}}(\mathcal{T}_t);\, H_t]
$$

动作可以是文本 token、函数调用、代码片段或 GUI 操作：

$$
a_t \sim \pi_\theta(a \mid s_t), \quad
a_t \in \{\text{text}, \text{tool\_call}, \text{code}, \text{mouse/key}\}
$$

对长任务，单步正确率不够，目标更接近带成本约束的闭环效用：

$$
\max_\theta \; \mathbb{E}\left[
R_{\text{task}} + \beta R_{\text{verify}}
- \lambda_{\text{tok}} C_{\text{tokens}}
- \lambda_{\text{err}} C_{\text{tool-errors}}
\right]
$$

这里 \(R_{\text{verify}}\) 表示模型主动检查输出、运行测试、读取界面状态后的收益；\(C_{\text{tokens}}\) 和 \(C_{\text{tool-errors}}\) 对应 OpenAI 强调的 token-efficient reasoning 与更可靠工具使用。

##### 方法解读

GPT-5.4 的关键不是单独“能看图”，而是把视觉理解放进可行动的环境循环。传统 VLM 通常把图像转成答案，例如描述图表或回答视觉问答；GPT-5.4 的公开定位更接近 UI agent：它需要读取截图中的按钮、表格、错误提示、浏览器状态，再把视觉判断转化为鼠标、键盘、Playwright 代码或 API 工具调用。OSWorld-Verified、WebArena-Verified 和 Online-Mind2Web 这类 benchmark 衡量的正是这种“看见界面后完成任务”的能力。

1M 上下文的价值也不只是一次塞入更多 token。长上下文让模型能同时保留任务说明、项目文件、网页材料、历史操作轨迹和验证日志，但如果每一步都把无关信息完整重读，成本和干扰都会上升。因此 GPT-5.4 与 tool search 的组合更像一个上下文调度系统：长上下文负责保留全局任务状态，工具搜索负责在需要时展开局部工具说明，验证步骤负责把执行结果写回轨迹。

从视觉语言模型角度看，GPT-5.4 的“原生统一架构”应谨慎理解为公开能力层面的统一，而不是已公开的网络结构。OpenAI 没有披露参数量、视觉编码器结构、训练数据规模或是否使用特定 MoE 路由；可验证的事实是同一模型接口能处理文本、图像输入、工具调用、代码执行和计算机控制。与 CLIP/BLIP 这类图文对齐模型相比，它的输出空间从“答案 token”扩展到了“可执行动作 token”。

工具搜索是 GPT-5.4 面向真实生产环境的另一个核心机制。大型 agent 系统可能有成百上千个 connector、MCP server、内部函数和文件工具，直接把所有 schema 放进 prompt 会消耗上下文并引入选择噪声。按需检索工具 schema 相当于把 \(p(a_t \mid s_t)\) 分解为先选工具子空间、再生成调用参数，降低无关工具对推理的干扰，也让长任务中的工具集合可以动态变化。

安全卡片说明 GPT-5.4 Thinking 延续 GPT-5 系列的安全评估，并把高能力网络安全风险作为部署重点之一。这一点对 computer-use 模型尤其重要：一旦模型能操作浏览器、文件系统和软件，风险不再局限于生成文本，而包括自动化执行、凭据处理、越权访问和高影响代码操作。因此实际部署时，模型能力必须与权限边界、用户确认、沙箱、审计日志和工具级策略一起设计。

> 💡 关键：GPT-5.4 的方法贡献更像“多模态推理模型 + 工具搜索 + 计算机使用环境 + 长上下文记忆”的系统级整合，而不是一篇公开论文中可复现的单一网络模块。

#### 🧪 练习题
```yaml
question: "从公开资料看，GPT-5.4 相比传统图文问答 VLM 的核心变化是什么？"
options:
  - "只把图像编码器换成更大的 CNN"
  - "把视觉理解接入工具调用和计算机操作闭环"
  - "只支持离线图像分类，不处理文本"
  - "完全依赖外部 OCR，模型本身不看截图"
answer: 1
explain: "GPT-5.4 的公开重点是原生 computer-use、1M 上下文和工具搜索；模型需要根据截图和任务上下文执行动作并验证结果，而不只是回答图像问题。"
```

### Gemini 3.1 Pro

```yaml
id: gemini_3_1
num: 21
name: Gemini 3.1 Pro
full_name: Gemini 3.1 Pro
year: '2026.02'
org: Google
parent: gemini
paper_url: —
project_url: ''
category: native_multimodal
motivation: 2M超长上下文多模态
```

#### 📝 一句话总结
Gemini 3.1 Pro 是基于 Gemini 3 Pro 的原生多模态 reasoning model，把文本、图像、音频、视频、PDF 和代码库放入长上下文推理与工具执行流程，重点提升复杂问题求解、agentic coding 和跨模态综合能力。

#### 🎯 核心要点
- 官方 model card：Gemini 3.1 Pro 是 Gemini 3 系列的下一代版本，属于 highly capable, natively multimodal reasoning models。
- 模型依赖：Google DeepMind 明确说明 Gemini 3.1 Pro is based on Gemini 3 Pro，未公开参数量、训练细节或完整网络结构。
- 输入输出：官方 model card/API 文档列出输入支持文本、图像、音频、视频、PDF/代码，输出为文本，最大输出 64K tokens。
- 上下文核验：公开 model card 和 API 文档写的是 up to 1M / 1,048,576 input tokens；这与输入 YAML 中“2M超长上下文多模态”不一致，YAML 已按要求原样保留。
- 推理控制：Google Cloud 文档列出 improved token efficiency and thinking，并新增 `MEDIUM` thinking level，用于在成本、速度和性能之间折中。
- 工具与 agent：支持 Google Search grounding、code execution、function calling、structured output、context caching，并提供 `gemini-3.1-pro-preview-customtools` 端点优化 bash/custom tools 工作流。
- 评测：官方 blog 报告 ARC-AGI-2 verified 77.1%；model card 覆盖 reasoning、multimodal、agentic tool use、multilingual 和 long-context 等评估。

#### 🔬 深入细节
##### 官方示意图

![Gemini 3.1 Pro benchmark overview](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini_3-1-pro__benchmarks.gif)
*图：Google 官方 Gemini 3.1 Pro 发布页中的 benchmark 对比图，展示 3.1 Pro 相比 Gemini 3 Pro 在核心推理评测上的提升。*

公开来源：Gemini 3.1 Pro model card `https://deepmind.google/models/model-cards/gemini-3-1-pro/`；Gemini API model spec `https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview`；Google Cloud Agent Platform spec `https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro`；Gemini 2.5 technical report `https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf`。

##### 多模态长上下文流程伪代码

```python
# Gemini 3.1 Pro: native multimodal long-context reasoning loop (公开资料抽象版)

def build_gemini31_prompt(task, files, code_repo, tools, thinking_level="MEDIUM"):
    context = []

    for item in files:
        if item.type == "text":
            context.append(encode_text(item.content))
        elif item.type == "image":
            context.append(encode_image(item.bytes, resolution_tokens=1120))
        elif item.type == "pdf":
            context.append(encode_pdf(item.bytes, resolution_tokens=560))
        elif item.type == "video":
            context.append(encode_video(item.bytes, tokens_per_frame=70))
        elif item.type == "audio":
            context.append(encode_audio(item.bytes))

    context.append(encode_code_index(code_repo))
    assert token_count(context) <= 1_048_576

    return {
        "model": "gemini-3.1-pro-preview",
        "input": [task, *context],
        "tools": select_tools(tools, task),
        "thinking_level": thinking_level,
    }

def solve_with_tools(request):
    while True:
        step = gemini.generate(request)
        if step.type == "function_call":
            result = run_tool(step.name, step.args)
            request["input"].append({"tool_result": result})
            continue
        if step.type == "code_execution":
            result = execute_python(step.code)
            request["input"].append({"code_result": result})
            continue
        return step.text
```

##### 关键公式

Gemini 3.1 Pro 的公开资料没有披露内部架构，可以用统一多模态 token 序列来抽象其接口行为。设文本、图像、音频、视频、PDF 和代码分别编码为：

$$
Z = [E_{\text{text}}(X), E_{\text{img}}(I), E_{\text{audio}}(A), E_{\text{video}}(V), E_{\text{pdf}}(D), E_{\text{code}}(C)]
$$

在最大输入长度约束下：

$$
|Z| \le 1{,}048{,}576
$$

模型按自回归方式生成答案或工具调用：

$$
p_\theta(Y \mid Z, \mathcal{T}, e)
= \prod_{t=1}^{m} p_\theta(y_t \mid y_{<t}, Z, \mathcal{T}, e)
$$

其中 \(\mathcal{T}\) 是可用工具集合，\(e \in \{\text{LOW}, \text{MEDIUM}, \text{HIGH}\}\) 可理解为 thinking level。实际系统要优化的是质量、成本和延迟的折中：

$$
U(e) = Q(e) - \lambda C_{\text{tokens}}(e) - \mu L_{\text{latency}}(e)
$$

`MEDIUM` thinking level 的意义就是在 \(Q\)、token 成本和延迟之间给开发者多一个可控点。

##### 方法解读

Gemini 3.1 Pro 的核心定位是“基于 Gemini 3 Pro 的多模态推理增强版”，而不是公开可复现的新结构论文。model card 只说明它是 Gemini 3 系列的 natively multimodal reasoning model，并把详细架构指向 Gemini 3 Pro model card；因此精读时应避免假设具体参数量、MoE 规模或视觉编码器实现。可验证的技术主线是：多模态输入、长上下文、thinking 控制、工具调用和 agentic 工作流在同一模型接口中协同。

长上下文在 Gemini 3.1 Pro 中服务于“跨来源综合”，而不仅是长文摘要。Google Cloud 文档列出它可处理文本、代码、图像、音频、视频、PDF，甚至整个代码库；同时给出每类媒体的工程限制，例如视频约 45 分钟含音频、音频约 8.4 小时或 up to 1M tokens、PDF 和图像各自有 resolution token 设置。这意味着模型面对的是异质证据池，需要在同一推理链里把时间序列、页面布局、视觉区域和代码符号关系对齐。

thinking level 是 Gemini 3.1 Pro 相比普通多模态模型更偏“推理系统”的信号。固定推理深度会让简单请求浪费 token，也会让困难任务推理不足；`LOW/MEDIUM/HIGH` 这样的控制把 test-time compute 暴露给开发者，使应用可以按任务风险选择预算。比如批量分类可以低 effort，文档审查和复杂代码修改可用 medium/high，并结合 code execution 或 search grounding 做验证。

custom tools endpoint 说明 Gemini 3.1 Pro 的 agentic 能力不仅依赖模型本体，还依赖工具选择分布的校准。普通函数调用只要求模型生成合法参数；代码库任务还要求模型优先选择 `view_file`、`search_code`、bash 等局部检索/执行工具。专门的 customtools 端点相当于把工具先验调向工程 agent 场景，让模型在“读文件、定位符号、执行命令、修复错误”的循环中更稳定。

与 Gemini 2.5 technical report 中的方向一致，Gemini 3.1 Pro 延续了“原生多模态 + 长上下文 + tool use + thinking”的路线。差别在于 3.1 Pro 作为 2026 年的产品模型，把这些能力更明确地暴露为 API/Agent Platform 规格：输入类型、token 上限、thinking level、code execution、function calling、Google Search grounding 和 context caching 都成为开发者可编排的接口，而不只是论文 benchmark 中的能力描述。

> ⚠️ 注意：本条 YAML 的 “2M超长上下文” 与 2026-06-15 Google Cloud 文档、Gemini 3.1 Pro model card 的公开 1M/1,048,576 token 上限不一致；正文方法解读按公开官方文档写作。

#### 🧪 练习题
```yaml
question: "Gemini 3.1 Pro 的 `MEDIUM` thinking level 主要解决什么工程问题？"
options:
  - "让模型只能处理图像，不能处理文本"
  - "在推理质量、token 成本和延迟之间提供中间档控制"
  - "把最大上下文从 1M 降到 8K"
  - "关闭所有工具调用以减少系统复杂度"
answer: 1
explain: "官方文档将 MEDIUM 描述为 expanded thinking level 的一部分，用于优化 cost、performance 和 speed 的 trade-off。"
```

### Claude Opus 4.7

```yaml
id: claude_opus_4_7
num: 22
name: Claude Opus 4.7
full_name: Claude Opus 4.7
year: '2026.04'
org: Anthropic
parent: —
paper_url: —
project_url: ''
category: frontier_2026
motivation: xhigh深度推理模式
```

#### 📝 一句话总结
Claude Opus 4.7 是 Anthropic 面向长任务、代码 agent 和高分辨率视觉理解的 Opus 级模型，公开技术重点是 `xhigh` effort、更高视觉 token 上限、1M 上下文、严格指令跟随和更主动的自我验证。

#### 🎯 核心要点
- 官方发布时间：Anthropic 于 2026-04-16 发布 Claude Opus 4.7，定位为当时最强的 generally available model for complex reasoning and agentic coding。
- xhigh effort：新增 `xhigh` effort level，位于 `high` 与 `max` 之间，用于长时间 agentic/coding 任务；Claude Code 对所有计划默认提升到 `xhigh`。
- 高分辨率视觉：Claude Opus 4.7 是首个支持 high-resolution image support 的 Claude 模型，最大 native image resolution 为 2576 px 长边、4784 visual tokens。
- 3.75MP 含义：2576 px 长边在 4:3 附近约为 2576×1450 量级，接近 3.75MP；官方文档强调 4K 仍会下采样到 2576×1449。
- 长上下文与输出：迁移文档列出 Opus 4.7 支持 1M token context、128k max output、adaptive thinking、Files API、PDF、vision 和全套工具。
- 视觉/文档场景：官方发布页强调 dense screenshots、complex diagrams、document analysis、computer-use agents；视觉导航图显示高分辨率输入显著提升 ScreenSpot-Pro。
- 公开资料核验：输入 YAML 的 OmniDocBench 87.7 未在 Anthropic 官方发布页/vision docs 中直接出现；官方公开视觉相关指标包括 ScreenSpot-Pro、CharXiv Reasoning、OfficeQA Pro 等。

#### 🔬 深入细节
##### 官方示意图

![Claude Opus 4.7 visual navigation benchmark](https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fe97dffe5ee2a8764d5f122578f2ad8cde957070e-1920x1080.png&w=3840)
*图：Anthropic 官方 Claude Opus 4.7 发布页中的 ScreenSpot-Pro 视觉导航结果。高分辨率 Opus 4.7 相比低分辨率设置和 Opus 4.6 有明显提升。*

公开来源：Anthropic 发布页 `https://www.anthropic.com/news/claude-opus-4-7`；Claude migration guide `https://platform.claude.com/docs/en/about-claude/models/migration-guide`；Claude vision docs `https://platform.claude.com/docs/en/build-with-claude/vision`；Claude effort docs `https://platform.claude.com/docs/en/build-with-claude/effort`；Anthropic system cards index `https://www.anthropic.com/system-cards`。

##### xhigh + 高分辨率视觉流程伪代码

```python
# Claude Opus 4.7: high-resolution vision + adaptive thinking + effort control

def call_opus47_for_document_task(task, images, documents, tools):
    visual_blocks = []
    for image in images:
        # Opus 4.7 native high-res: up to 2576 px long edge / 4784 visual tokens
        resized = resize_preserve_aspect(image, max_long_edge=2576)
        visual_blocks.append({
            "type": "image",
            "data": resized,
            "coordinate_space": "resized_pixels",
        })

    request = {
        "model": "claude-opus-4-7",
        "thinking": {"type": "adaptive"},
        "output_config": {"effort": "xhigh"},
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": task},
                *visual_blocks,
                *load_documents(documents),
            ],
        }],
        "tools": tools,
        "max_tokens": 128_000,
    }

    while True:
        response = claude.messages.create(**request)
        if response.stop_reason == "tool_use":
            tool_result = run_tool(response.tool_name, response.tool_input)
            request["messages"].append(format_tool_result(tool_result))
            continue
        return verify_and_format(response.text)
```

##### 关键公式

Claude vision docs 说明图像按 \(28 \times 28\) patch 计为 visual tokens。给定图像宽高 \((W,H)\)，视觉 token 近似为：

$$
N_{\text{vis}} =
\left\lceil \frac{W'}{28} \right\rceil
\times
\left\lceil \frac{H'}{28} \right\rceil
$$

其中 \((W',H')\) 是按长边上限和 token 上限缩放后的尺寸。Opus 4.7 的上限可抽象为：

$$
\max(W', H') \le 2576,\quad N_{\text{vis}} \le 4784
$$

effort 控制可以看作在能力收益和 token/延迟成本之间选点：

$$
e^\* = \arg\max_{e \in \{\text{low}, \text{medium}, \text{high}, \text{xhigh}, \text{max}\}}
\left[
Q_{\text{task}}(e) - \lambda C_{\text{tokens}}(e) - \mu L(e)
\right]
$$

`xhigh` 的定位是让 \(Q_{\text{task}}\) 在长时程任务上接近 `max`，但成本和延迟低于无约束 `max`。

##### 方法解读

Claude Opus 4.7 的视觉改动可以理解为“提升模型实际看到的图像细节”，而不是简单放宽上传文件大小。早期 Claude 模型会把大图下采样到较低 native resolution，导致密集截图、小字号表格、坐标指向和复杂文档布局中的关键信息丢失。Opus 4.7 将 native 视觉上限提高到 2576 px 长边和 4784 visual tokens，使模型在 computer use、文档问答、图表解析和 UI 定位中保留更多局部线索。

这种高分辨率支持直接改变了坐标类任务的工程处理方式。vision docs 说明，当要求 Claude 输出点或 bounding boxes 时，最好使用模型实际看到的 resized image 坐标；migration guide 也强调 Opus 4.7 返回的 pointing/bounding-box coordinates 与实际图像像素 1:1 对齐，不需要额外 scale-factor conversion。对视觉语言模型而言，这意味着输出不只是语义描述，还可以稳定落到屏幕或文档页面的具体像素位置。

`xhigh` effort 是 Opus 4.7 的另一条主线。旧式 extended thinking 常通过手工 `budget_tokens` 控制推理预算；Opus 4.7 起迁移到 adaptive thinking + effort parameter。effort 不是严格 token 上限，而是模型在回答、工具调用参数和 thinking 中愿意投入多少 token 的行为信号。`xhigh` 介于 `high` 与 `max` 之间，特别面向 30 分钟以上的 coding/agentic 任务和百万级 token budget。

在长任务中，Opus 4.7 强调“自我验证”与严格指令跟随。发布页多次提到模型会在报告结果前设计验证方式，合作方反馈也集中在日志分析、代码修复、缺失数据如实报告、持续执行工具失败后的恢复等场景。这类能力不是单轮 VQA 可以覆盖的：模型需要保持任务状态、决定何时调用工具、检查中间产物，并在发现不一致时回滚或修正。

相较于只追求最高视觉 benchmark 的模型，Opus 4.7 的设计更偏向可控生产工作流。更高分辨率带来最多约 3 倍图像 token 成本，updated tokenizer 也可能让相同文本映射到 1.0-1.35 倍 token；因此 Anthropic 同时给出 effort、task budgets、downsampling 和迁移指南。实际使用时应把高分辨率视觉留给小字、UI、表格、图表和坐标敏感任务，而不是对所有图片无差别开启最高保真。

> 💡 关键：Opus 4.7 的 VLM 价值在于“看得更细 + 想得更久 + 更会验证”，三者合在一起才支撑文档、截图和代码 agent 的长时程任务。

#### 🧪 练习题
```yaml
question: "Claude Opus 4.7 的 high-resolution image support 最直接改善哪类任务？"
options:
  - "只包含纯文本的短问答"
  - "密集截图、文档布局、图表和坐标定位"
  - "无需视觉输入的随机文本续写"
  - "把所有图像都原样保存为训练数据"
answer: 1
explain: "官方文档强调 2576px 长边和 4784 visual tokens 主要服务 computer use、screenshot understanding、document analysis，以及需要坐标/小字细节的视觉任务。"
```

### Llama 4

```yaml
id: llama4
num: 23
name: Llama 4
full_name: Llama 4
year: '2025.04'
org: Meta
parent: —
paper_url: —
project_url: ''
category: native_multimodal
motivation: 原生MoE+1M上下文
```

#### 📝 一句话总结
Llama 4 把 Llama 系列从密集文本模型推进到原生多模态 MoE：用 early fusion 统一文本与视觉 token，用稀疏专家把总容量扩到百亿到千亿级，同时保持每 token 约 17B 激活参数。输入元信息中的 1M 上下文与 LMArena ELO 1417 对应 Llama 4 Maverick；同系列 Scout 进一步展示了 10M token 长上下文路线。

#### 🎯 核心要点
- 首批开放权重模型包含 Scout 与 Maverick：Scout 为 109B 总参数、17B 激活、16 experts、10M context；Maverick 为 400B 总参数、17B 激活、128 experts、1M context。
- MoE 前馈层采用共享专家 + 路由专家：每个 token 总是进入 shared expert，并被 router 分配到少量 routed expert，从而在高总容量下控制推理 FLOPs。
- 原生多模态 early fusion：文本、图像和视频帧 token 进入同一主干，而不是在外部拼接一个独立视觉模块后再交给文本模型。
- 视觉编码器基于 MetaCLIP 思路单独适配，模型在预训练中见过多图输入，官方披露预训练最多 48 张图、后训练测试到 8 张图。
- 长上下文核心是 iRoPE：多数层仍使用 RoPE，部分 interleaved attention layers 不使用位置编码，并在推理时做 attention temperature scaling 来改善长度外推。
- 训练上使用 Behemoth 教师模型进行 codistillation，再用轻量 SFT、大规模在线 RL、动态过滤与 DPO 改善推理、编码、图像理解和对话质量。

#### 🔬 深入细节
##### 框架图

![Llama 4 MoE 层结构](https://scontent-sjc3-1.xx.fbcdn.net/v/t39.2365-6/488655517_650996354186993_1043942188415715102_n.png?_nc_cat=105&_nc_gid=9gjaxdwM37lCTDyVZx66-Q&_nc_ht=scontent-sjc3-1.xx&_nc_oc=AdoyPuzYlJDMUskw4VipzPX9gfdmPolpOdYbxqYJ7HWQyz6OzZlr62BkwVuAZ_Qjtjc&_nc_ohc=MLLT0x0HCvAQ7kNvwECBnTY&_nc_sid=e280be&_nc_ss=78100&_nc_zt=14&ccb=1-7&oe=6A4B4D80&oh=00_Af_gHYOpTVUdeomqREPZi-BuS1ULoxAUZVQfdp6YCNTPJw)
*图：Meta 官方博客给出的 Llama 4 MoE 层示意。左侧是 Transformer block 堆叠，右侧显示 token 经 router 进入 routed expert 与 shared expert 后再汇合。*

##### 推理与训练流程伪代码

```python
# Llama 4 Maverick/Scout 的简化前向流程
def llama4_forward(text_tokens, images=None, video_frames=None):
    vision_tokens = []
    for frame_or_image in (images or []) + sample_video_stills(video_frames):
        vision_tokens.extend(meta_clip_encoder(frame_or_image))

    # early fusion: 图像/视频 token 与文本 token 进入同一自回归主干
    x = embed(interleave_modal_tokens(text_tokens, vision_tokens))

    for layer_id, block in enumerate(transformer_layers):
        x = block.attention(x, rope_mode=irope_schedule(layer_id))

        if block.is_moe:
            route_logits = router(x)
            routed_id = top1(route_logits)       # Maverick: 128 routed experts 中选少量，公开描述强调每 token 进 1 个 routed expert
            y_shared = shared_expert(x)
            y_routed = expert[routed_id](x)
            x = x + combine(y_shared, y_routed, route_logits)
        else:
            x = x + dense_ffn(x)

    return lm_head(x)

# Behemoth codistillation 的核心思想
for batch in multimodal_pretraining_data:
    teacher_logits = behemoth(batch)             # 2T 级教师模型，离线或在线产生软目标
    student_logits = maverick_or_scout(batch)
    hard_loss = cross_entropy(student_logits, batch.next_tokens)
    soft_loss = kl_divergence(student_logits, teacher_logits)
    loss = alpha(step) * soft_loss + (1 - alpha(step)) * hard_loss
    update_student(loss)
```

##### 关键公式

MoE 层可以抽象成条件计算。设 token 表示为 \(h_t\)，router 给出专家分布 \(p_t=\operatorname{softmax}(W_r h_t)\)，被选中的专家集合为 \(\mathcal{E}_t\)，shared expert 为 \(E_s\)：

$$
\operatorname{MoE}(h_t)
= E_s(h_t) + \sum_{e \in \mathcal{E}_t} p_{t,e} E_e(h_t)
$$

因此单 token 的推理成本主要随激活专家数增长，而不是随总专家数线性增长：

$$
\operatorname{FLOPs}_{\text{token}}
\approx \operatorname{FLOPs}_{\text{attn}}
+ \operatorname{FLOPs}(E_s)
+ |\mathcal{E}_t| \cdot \operatorname{FLOPs}(E_e)
$$

iRoPE 的直觉是把位置归纳偏置拆开：多数层保留 RoPE 的局部相对位置能力，少数 interleaved attention layer 弱化或移除显式位置编码，让长距离 token 不被训练长度内的位置频率强行绑定。可以把第 \(l\) 层注意力写成：

$$
A_l =
\begin{cases}
\operatorname{softmax}\left(\frac{Q_l R(\theta) (K_l R(\theta))^\top}{\tau_l \sqrt{d}}\right), & l \notin \mathcal{I} \\
\operatorname{softmax}\left(\frac{Q_l K_l^\top}{\tau_l \sqrt{d}}\right), & l \in \mathcal{I}
\end{cases}
$$

其中 \(\mathcal{I}\) 是不使用位置编码的 interleaved 层集合，\(\tau_l\) 是推理时 attention temperature scaling。

##### 方法解读

Llama 4 的核心变化不是单纯把 Llama 3 放大，而是换成“稀疏容量 + 原生多模态 + 长上下文外推”的组合。密集模型每个 token 都激活全部 FFN 参数，扩总参数会直接推高推理成本；MoE 则把 FFN 容量拆成专家池，让 token 只访问 shared expert 与少量 routed expert。这样 Maverick 可以存储约 400B 总参数，却维持 17B 级激活规模，服务成本更接近小模型，知识与任务容量更接近大模型。

shared expert 的作用是给所有 token 一条稳定通路。纯 top-k routed experts 容易出现负载不均、领域漂移和专家过窄的问题；shared expert 则承担通用变换，routed expert 才负责条件化的专门能力。对多模态模型来说，这一点尤其重要，因为文本 token、OCR token、图像区域 token、视频帧 token 的分布差异很大，统一 shared path 能减少路由错误导致的表示断裂。

early fusion 是 Llama 4 相对“视觉编码器 + 投影器 + 文本 LLM”范式的关键升级。传统 late fusion 多在对齐阶段把视觉 embedding 映射进 LLM 词向量空间，视觉与语言主干的共同训练深度有限；Llama 4 在预训练中直接混合文本、图像和视频帧 token，使 attention 层可以从底层开始学习跨模态对应关系。这样做的代价是训练数据与算力要求更高，但收益是多图推理、视觉 grounding、图表/OCR 和视频帧关系不再完全依赖后期指令微调补救。

长上下文部分解决的是另一个瓶颈：RoPE 在训练长度外可能出现频率外推不稳定，而完全去掉位置编码又会损害局部顺序建模。iRoPE 用交错策略折中：大部分层继续保留 RoPE 的顺序归纳偏置，少数层提供更弱位置约束的全局混合通道，再通过推理时温度缩放调节超长序列的 attention sharpness。Scout 从 256K 训练长度外推到 10M 级上下文，说明这种设计服务于“训练成本可控但推理上下文极长”的目标。

Behemoth codistillation 则解释了为什么 17B 激活模型能接近更大模型的表现。教师模型提供软标签，包含比 one-hot token 更丰富的分布信息；学生模型同时学习硬目标和教师分布，相当于在预训练阶段吸收大模型的偏好与不确定性。后训练阶段再用轻量 SFT、大规模在线 RL 和 DPO 清理对话风格、推理路径和边界样例，形成面向聊天与视觉任务的最终模型。

> 💡 关键：Llama 4 的“17B active”不是小模型参数量，而是每 token 的激活预算；真正的能力来自数百亿到数千亿总参数专家池、原生跨模态预训练和教师模型蒸馏的叠加。

#### 🧪 练习题
```yaml
question: "Llama 4 Maverick 使用 MoE 的主要工程收益是什么？"
options:
  - "让每个 token 同时激活全部 400B 参数"
  - "在扩大总参数容量的同时，让每个 token 只激活共享专家和少量路由专家"
  - "完全取消 attention 计算"
  - "只支持图像输入，不再支持文本输入"
answer: 1
explain: "MoE 的核心是条件计算。Maverick 保存大量专家参数，但单 token 只走 shared expert 与少量 routed expert，因此能在高容量和可控推理成本之间折中。"
```

### Qwen3.5-VLM

```yaml
id: qwen3_5_vlm
num: 24
name: Qwen3.5-VLM
full_name: Qwen3.5-VLM
year: '2026.02'
org: 阿里巴巴
parent: qwen_vl
paper_url: —
project_url: ''
category: frontier_2026
motivation: GDN早期融合架构
```

#### 📝 一句话总结
Qwen3.5-VLM 的公开模型卡对应 Qwen3.5-397B-A17B / Qwen3.5-Plus 路线：它用 Gated DeltaNet 线性注意力、周期性全注意力和细粒度 MoE 路由组合，解决原生视觉语言模型在 256K 级长上下文、多图文档和视频输入下的推理成本问题。

#### 🎯 核心要点
- 397B 总参数、17B 激活参数，模型类型为带 Vision Encoder 的 causal language model，支持文本、图像和视频输入。
- 60 层语言主干采用重复的 3:1 混合结构：`15 * (3 * (Gated DeltaNet -> MoE) -> 1 * (Gated Attention -> MoE))`。
- Gated DeltaNet 层使用线性注意力状态更新，公开配置为 V 侧 64 个 linear attention heads、QK 侧 16 个 heads、head dimension 128。
- Gated Attention 层提供周期性全局 softmax attention，公开配置为 Q 侧 32 heads、KV 侧 2 heads、head dimension 256、RoPE dimension 64。
- MoE 使用 512 个专家，每个 token 激活 10 个 routed experts + 1 个 shared expert，expert intermediate dimension 为 1024。
- 原生上下文长度为 262,144 tokens，模型卡也给出通过 YaRN RoPE scaling 扩展到 1,010,000 tokens；托管版 Qwen3.5-Plus 默认面向 1M context。
- 早期融合训练把文本、图像和视频 token 作为统一多模态序列建模，官方视觉语言表中 OmniDocBench 1.5 达到 90.8。

#### 🔬 深入细节
##### 框架图

![Qwen3.5-Omni 原生多模态 Thinker/Talker 框架](https://arxiv.org/html/2604.15804v1/figures/model.jpg)
*图：Qwen3.5-Omni 技术报告中的原生多模态框架图。Qwen3.5-VLM 模型卡未单独给出架构图，但同系列公开资料显示视觉、音频和文本 token 通过统一主干进行早期融合；本文重点解读 VLM 公开模型卡中的 Gated DeltaNet + MoE 主干。*

##### 混合注意力与 MoE 前向伪代码

```python
# Qwen3.5-397B-A17B / Qwen3.5-VLM 的简化主干
def qwen35_vlm_forward(text, images=None, video=None, thinking=True):
    text_tokens = tokenizer(text)
    vision_tokens = vision_encoder(images, sample_video(video, fps=2))
    x = early_fusion_pack(text_tokens, vision_tokens)  # text/image/video token 统一序列

    # 60 layers = 15 groups，每组 3 个 Gated DeltaNet block + 1 个 Gated Attention block
    for group in range(15):
        for _ in range(3):
            x = x + gated_deltanet(x)                 # 线性时间长上下文混合
            x = x + sparse_moe(x, top_k=10, shared=True, num_experts=512)

        x = x + gated_attention(x, q_heads=32, kv_heads=2, rope_dim=64)
        x = x + sparse_moe(x, top_k=10, shared=True, num_experts=512)

    if thinking:
        x = generate_hidden_reasoning_tokens(x)       # 模型卡默认 thinking mode
    return decode_text(lm_head(x), max_tokens=81920)

def sparse_moe(h, top_k, shared, num_experts):
    router_logits = router(h)
    routed = topk(router_logits, k=top_k)
    y = shared_expert(h) if shared else 0
    for expert_id, weight in routed:
        y += softmax(router_logits)[expert_id] * experts[expert_id](h)
    return y
```

##### 关键公式

Gated DeltaNet 可以看作固定大小 fast-weight memory 的在线更新。设当前 token 的 query/key/value 为 \(q_t,k_t,v_t\)，状态矩阵为 \(S_t\)，遗忘门为 \(\alpha_t\)，写入步长为 \(\beta_t\)：

$$
\tilde{S}_t = \alpha_t S_{t-1}
$$

$$
S_t = \tilde{S}_t + \beta_t \left(v_t - \tilde{S}_t k_t\right) k_t^\top
$$

$$
o_t = S_t q_t
$$

其中 \(\left(v_t - \tilde{S}_t k_t\right)\) 是“当前记忆对 key 的预测误差”。MoE 路由则把高容量 FFN 写成条件专家求和：

$$
\operatorname{MoE}(h_t)
= E_s(h_t) + \sum_{e \in \operatorname{TopK}(W_r h_t, 10)}
\operatorname{softmax}(W_r h_t)_e E_e(h_t)
$$

混合层比例使序列混合成本在长上下文下更接近线性层主导，而周期性 full attention 负责补充精确全局交互：

$$
C_{\text{group}}(n)
\approx 3 \cdot O(n d^2) + 1 \cdot O(n^2 d_{\text{attn}}) + 4 \cdot C_{\text{MoE-active}}
$$

##### 方法解读

Qwen3.5-VLM 的核心动机是让“原生多模态”和“超长上下文”同时成立。标准 Transformer attention 对长度 \(n\) 的成本是 \(O(n^2)\)，在 256K token、长文档、多页图像或视频帧序列中会迅速不可承受。Gated DeltaNet 把历史压进固定大小状态 \(S_t\)，每个 token 只更新一次状态并读取一次状态，因此长序列成本更接近线性，适合文档和视频这类输入长度远大于普通聊天的问题。

但纯线性注意力也有风险：所有历史都被压缩进状态矩阵，精确检索、跨段对齐和细粒度引用可能下降。Qwen3.5 的 3:1 hybrid layout 就是折中方案：大多数层用 Gated DeltaNet 维持吞吐和长上下文，周期性插入 Gated Attention 层做全局 softmax 交互，帮助模型在长文档中找回具体表格单元、OCR 片段或视频关键帧。这个设计比“全层 softmax attention”便宜，也比“全层线性注意力”更稳。

MoE 是第二个效率杠杆。397B 总参数提供足够大的知识和任务容量，但每个 token 只激活 17B 级参数；512 个专家中只选择 10 个 routed experts，再加一个 shared expert。shared expert 提供通用语言/视觉变换，routed experts 让不同 token 走向更专门的能力区域，例如代码、数学、OCR、视频理解或多语言表达。对 VLM 来说，细粒度 MoE 还能缓冲不同模态 token 分布差异带来的训练冲突。

早期融合使 Qwen3.5 不再把视觉理解看成外接任务。图像和视频经过 vision encoder 后与文本 token 打包为同一序列，语言主干直接在统一 token 流上做推理。这样模型能在同一次自回归生成中处理“图像区域 -> OCR 文本 -> 表格关系 -> 用户问题 -> 推理答案”的链条。OmniDocBench 1.5 的 90.8 说明这种训练方式对复杂文档解析特别有效，因为文档理解需要同时使用版面、文字、图表和跨页上下文。

推理侧的长上下文能力还依赖上下文管理。模型卡给出 262,144 原生长度，托管版 Qwen3.5-Plus 面向 1M context；这并不意味着所有任务都应把原始材料无差别塞满上下文。更合理的工程做法是保留原始多模态证据、按任务构造检索或折叠策略，再让模型在关键片段上执行 thinking mode 和结构化输出。也就是说，GDN+MoE 降低了长上下文成本，但高质量答案仍依赖输入组织、采样帧率和证据选择。

> 💡 关键：Qwen3.5-VLM 的新意不是单点指标，而是把 Gated DeltaNet 的线性长程记忆、周期性 full attention、512-expert 稀疏 MoE 和 early-fusion 多模态训练放进同一个主干里。

#### 🧪 练习题
```yaml
question: "Qwen3.5-VLM 为什么采用 3 个 Gated DeltaNet 层接 1 个 Gated Attention 层的混合布局？"
options:
  - "让所有层都退化成普通 CNN"
  - "用线性注意力降低长上下文成本，同时用周期性全注意力补充精确全局交互"
  - "避免模型处理图像和视频"
  - "让每个 token 激活全部 512 个专家"
answer: 1
explain: "Gated DeltaNet 适合长序列高吞吐，但全注意力有更强的精确检索和跨段交互能力。3:1 混合布局是在效率和精度之间折中。"
```

### 豆包2.0 Pro

```yaml
id: doubao_2_0
num: 25
name: 豆包2.0 Pro
full_name: 豆包2.0 Pro
year: '2026.02'
org: 字节跳动
parent: —
paper_url: —
project_url: ''
category: frontier_2026
motivation: 万亿MoE视频解析
```

#### 📝 一句话总结
豆包2.0 Pro / Doubao-Seed-2.0-pro 的公开资料显示，它把视觉、文档、长视频、复杂指令和 Agent 工作流作为同一类“真实长链路任务”来优化，重点解决企业场景中非结构化信息多、上下文长、证据分散和输出需可执行的问题。输入元信息写有“万亿参数 MoE”，但官方博客与 Model Card 未公开可核验的专家数、路由策略或参数拆分；下文仅把公开报告披露的多模态与视频工具链写成确定事实。

#### 🎯 核心要点
- Seed2.0 系列包含 Pro、Lite、Mini 三档通用 Agent 模型和 Code 模型；Pro 面向复杂推理、长上下文和真实工作流稳健性。
- 官方 Model Card 将“视觉与多模态理解、快速灵活推理、复杂指令执行、真实世界复杂任务”作为 Seed2.0 的核心设计目标。
- 视觉评测覆盖 50 个公开图像 benchmark、24 个公开视频 benchmark，维度包含数学/STEM、视觉谜题、文档图表、长上下文、多视频和流式视频。
- 文档与图表理解突出：官方报告给出 ChartQAPro 71.2、OmniDocBench 1.5 NED 0.099（越低越好）、MMLongBench-Doc 61.4。
- 视频理解突出：官方报告给出 VideoMME 89.5、LongVideoBench 80.3、VideoReasonBench 77.8、TempCompass 89.6，并强调运动感知与时序理解。
- VideoCut 是公开报告中最明确的长视频工具机制：遇到长视频或高帧率细节时，模型可重放相关片段并提高 FPS，以改善长视频推理。
- SuperCLUE-VLM 90.66 来自公开榜单/报道口径；官方 Model Card 中可直接复核的多模态指标主要是上述文档、图像和视频 benchmark。

#### 🔬 深入细节
##### 框架图

![Seed2.0 文档与长上下文理解指标](https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/4og2ymllvivtj.jpg)
*图：Seed2.0 官方发布页中的文档、图表和长上下文理解指标。复杂文档解析是豆包2.0 Pro 的核心公开能力之一。*

![Seed2.0 长视频与流式视频理解指标](https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/4og2ymllvkcvt.jpg)
*图：Seed2.0 官方发布页中的长视频、多视频和流式视频指标。公开报告进一步描述了 VideoCut 对长视频推理的增强。*

##### 文档与视频解析流程伪代码

```python
# Doubao-Seed-2.0-pro 公开资料可推断的多模态工作流抽象
def doubao_seed20_answer(query, files):
    evidence = []

    for file in files:
        if file.type in ["pdf", "scan", "chart", "image"]:
            layout = detect_layout(file)                 # 文档块、表格、图、OCR 文本
            visual_tokens = encode_visual_regions(file, layout)
            evidence.extend(read_order_pack(layout, visual_tokens))

        if file.type == "video":
            coarse_clips = uniform_or_scene_sample(file)
            relevant = retrieve_clips(coarse_clips, query)

            if requires_motion_detail(query) or is_hour_level(file):
                # 官方 Model Card 中披露的 VideoCut 思路：定位片段后高 FPS 重放
                relevant = VideoCut(file, intervals=relevant, higher_fps=True)

            evidence.extend(encode_video_segments(relevant))

    plan = decompose_instruction(query)                   # 多约束、多步骤任务拆解
    answer = reason_over_evidence(plan, evidence)
    return structured_output(answer)                      # 摘要、表格、报告、决策结论或可执行步骤
```

##### 关键公式

长视频工具化推理可以抽象成“粗检索 + 精重放”。设第 \(i\) 个视频片段的语义 embedding 为 \(e_i\)，运动变化特征为 \(m_i\)，用户查询为 \(q\)，片段得分为：

$$
s_i = \lambda_1 \operatorname{sim}(e_i, q)
+ \lambda_2 \operatorname{motion}(m_i)
+ \lambda_3 \operatorname{timestamp\_prior}(i)
$$

选出 top-\(M\) 片段后，将其时间窗扩展并用更高帧率重新编码：

$$
\mathcal{T}
= \bigcup_{i \in \operatorname{TopM}(s)}
[t_i-\Delta, t_i+\Delta],
\qquad
X_{\text{fine}} = \operatorname{EncodeVideo}(\mathcal{T}, \operatorname{fps}_{\text{high}})
$$

如果部署模型采用输入元信息所述的 MoE，总体上会遵循条件计算形式，但公开报告没有披露豆包2.0 Pro 的 expert 规模与 top-k 细节：

$$
y(x) = \sum_{e \in \operatorname{TopK}(g(x), k)}
\operatorname{softmax}(g(x))_e E_e(x),
\qquad
\text{active\_compute} \ll \text{total\_parameters}
$$

##### 方法解读

豆包2.0 Pro 的公开技术重点不是一个单独的视觉 encoder，而是围绕真实业务负载重构评测和能力边界。官方报告指出，企业 MaaS 中高比例需求来自混杂图表、文档等非结构化信息处理，模型要先“读得多、想得多”，再进入专业流程。因此它的多模态能力被放在文档抽取、图表理解、长上下文、视频总结、复杂指令和 Agent 任务中一起评估，而不是只看单图 VQA。

复杂文档理解的难点在于输入不是规整文本。PDF、扫描件、表格、图表和混排页面同时包含 OCR、版面顺序、表格拓扑、图例坐标和跨页引用。Seed2.0 Pro 在 ChartQAPro、OmniDocBench 1.5、DUDE、MMLongBench-Doc 等指标上的公开结果，说明它优化的是“视觉版面 + 文本语义 + 长上下文引用”的联合问题。对实际应用而言，这比普通图片问答更接近合同审阅、研报抽取、发票归档和企业知识库整理。

视频解析的关键是时间。单帧视觉模型可以识别物体，却难以判断动作、节奏、因果和状态转移；长视频还会把关键信息稀释到几小时材料中。Seed2.0 的公开报告把视频能力拆成 knowledge、reasoning、motion/perception、long video、multi video、streaming 六类，并在 VideoReasonBench、TempCompass、VideoMME、LongVideoBench、OVBench 等任务上报告成绩。这个拆分很重要，因为“看懂视频”至少包含内容检索、时序状态跟踪和运动细节判别三件事。

VideoCut 是报告中最值得单独解读的机制。它不是把整段长视频都用高 FPS 编码，而是先定位与问题相关的片段，再对这些片段重放或提高采样率。这样能把有限上下文预算用在真正需要细粒度运动感知的位置，例如高速动作、物体交互、比赛瞬间或跨镜头证据。其本质是工具增强的多模态推理：模型先做粗粒度证据选择，再调用视频处理工具获得更密集的视觉证据，最后回到语言主干做解释和决策。

与传统 VLM 相比，豆包2.0 Pro 更像“多模态 Agent 基座”。它面向的输出不是单句答案，而是结构化报告、操作方案、复杂任务执行和下游决策结论。因此指令遵循和长链路稳定性与视觉指标同等重要。官方 Model Card 在 Search Agent、Deep Research、Vision Agent、Tool Use、现实经济价值任务上给出大量评测，说明模型训练与评估目标已经从“回答看图问题”扩展到“围绕多模态证据完成任务”。

需要注意的是，公开资料对底层架构的披露程度低于 Llama 4 或 Qwen3.5。输入元信息中的“万亿参数 MoE”只能作为元数据保留；在缺少官方 expert 数、路由规则、激活参数和训练 recipe 的情况下，不能把通用 MoE 公式进一步写成豆包2.0 Pro 的确切实现。更稳妥的精读重点是：它公开可核验地强化了复杂文档、长上下文视频、VideoCut 工具使用和真实长链路 Agent 任务。

> 💡 关键：豆包2.0 Pro 的公开价值点在“证据密集型多模态任务”上，而不是单张图片问答；文档、图表、长视频和 Agent 工作流共同构成了它的主要技术画像。

#### 🧪 练习题
```yaml
question: "Seed2.0 Pro 中 VideoCut 这类长视频工具的主要作用是什么？"
options:
  - "把所有视频帧都永久丢弃，只保留标题"
  - "先定位相关片段，再以更高帧率重放关键区间，提高长视频和运动细节推理质量"
  - "把文档 OCR 转换成音频"
  - "让模型只能处理单张静态图片"
answer: 1
explain: "长视频上下文很长且关键信息稀疏。VideoCut 的公开思路是用粗到细的工具化流程，把高帧率预算集中在与问题相关的片段上。"
```

### GLM-4.5V

```yaml
id: glm_4_5v
num: 26
name: GLM-4.5V
full_name: GLM-4.5V
year: '2026'
org: 智谱AI
parent: cogvlm
paper_url: —
project_url: ''
category: frontier_2026
motivation: 3D-RoPE思考模式
```

#### 📝 一句话总结
GLM-4.5V 基于 GLM-4.5-Air 的 106B-A12B MoE 语言底座，采用 ViT Encoder + MLP Projector + LLM Decoder 的多模态架构，并通过“思考/非思考”模式与 RLCS 课程化强化学习提升 STEM、GUI、长文档、视频和空间推理能力。

#### 🎯 核心要点
- 模型主干由视觉编码器、MLP projector 和 GLM-4.5-Air decoder 组成；公开技术报告标注 GLM-4.5V 为 106B 总参数、12B 激活参数
- 视觉侧以 AIMv2-Huge 初始化，使用 3D convolution 处理视频时间维，并在 ViT self-attention 中加入 2D-RoPE 以适配原生分辨率和极端长宽比
- Thinking 与 Non-Thinking 两种模式让同一模型在快速响应和长链路推理之间切换，适用于科学解题、文档理解、GUI agent 和视觉 grounding 等任务
- 训练框架分为大规模知识密集多模态预训练、标准化推理格式 SFT、多域 RLCS 强化学习三个阶段
- RLCS 使用 GRPO 目标，并按子领域难度、当前正确率与 rollout 有效性动态调整采样，避免大量“全对 batch”浪费梯度
- 奖励系统按 STEM、OCR/Chart/Doc、Grounding、Spatial、GUI、Video 等域分别设计 verifier，强调弱 verifier 会导致 reward hacking 与跨域崩塌
- 官方报告在 42 个公开视觉语言 benchmark 上评估 GLM-4.5V，并报告其在同规模开源模型中取得 SOTA 或接近 SOTA 的综合表现
- 输入元信息中的“3D-RoPE”可理解为空间/时间位置建模动机；公开报告中可核验的具体做法是视频 3D convolution、ViT 2D-RoPE、时间 index token 与原生分辨率处理

#### 🔬 深入细节
##### 核心示意图

![GLM-4.5V 系列架构图](https://arxiv.org/html/2507.01006v6/x2.png)
*图：GLM-4.1V-Thinking、GLM-4.5V 与 GLM-4.6V 的共享架构，包含 ViT Encoder、MLP Projector 和 LLM Decoder；视频帧后插入 time index token，图像/视频以原生分辨率和长宽比进入视觉编码器。*

![GLM-4.5V 强化学习收益图](https://arxiv.org/html/2507.01006v6/x1.png)
*图：官方报告展示 GLM-4.5V 相对同类模型的性能，以及 RL 对 GLM-4.5V 的性能提升。*

公开来源：技术报告 `https://arxiv.org/abs/2507.01006`，论文 HTML `https://arxiv.org/html/2507.01006v6`，官方项目 `https://github.com/zai-org/GLM-V`，官方模型卡 `https://huggingface.co/zai-org/GLM-4.5V`。

##### 核心流程代码

```python
# GLM-4.5V reasoning-centric training and inference sketch

def encode_visual_input(image_or_video):
    frames = sample_frames(image_or_video)
    if len(frames) == 1:
        frames = duplicate_single_image(frames)  # keep the video-style temporal path consistent

    # 3D conv handles temporal downsampling for videos; 2D-RoPE handles spatial coordinates.
    patch_tokens = vit_3d_patch_embed(frames, temporal_stride=2)
    patch_tokens = vit_self_attention_with_2d_rope(patch_tokens)
    visual_tokens = mlp_projector(patch_tokens)

    if is_video(image_or_video):
        visual_tokens = insert_time_index_tokens(visual_tokens)
    return visual_tokens


def train_glm45v(base_vlm, pretrain_corpus, sft_data, rl_domains):
    # Stage 1: knowledge-intensive multimodal pre-training.
    for batch in pretrain_corpus:
        x = mix_text_image_video_doc_grounding(batch)
        loss = autoregressive_lm_loss(base_vlm, x)
        update(base_vlm, loss)

    # Stage 2: SFT teaches a standardized reasoning / answer format.
    for sample in sft_data:
        prompt, answer = sample.prompt, sample.answer
        loss = next_token_loss(base_vlm(prompt), answer)
        update(base_vlm, loss)

    # Stage 3: RLCS, multi-domain GRPO with curriculum sampling.
    for step in range(num_rl_steps):
        domain = sample_domain_by_budget_and_difficulty(rl_domains)
        prompts = select_prompts_with_effective_accuracy(domain, target_range=(0.1, 0.9))
        rollouts = [sample_group(base_vlm, p, group_size=G) for p in prompts]
        rewards = domain.verifier.score(rollouts)  # rule, model judge, IoU, edit distance, etc.
        loss = grpo_loss(base_vlm, rollouts, rewards)
        update(base_vlm, loss)


def infer_glm45v(request, thinking=True):
    visual_tokens = encode_visual_input(request.media)
    mode = "thinking" if thinking else "non_thinking"
    prompt = build_prompt(request.text, visual_tokens, mode=mode)
    return glm45v_decoder.generate(prompt)
```

##### 关键公式

ViT 侧的 2D-RoPE 可以看成把 patch 的二维坐标 \((u,v)\) 显式写入 Query/Key 旋转中，而不是把任意分辨率图像强行压到固定位置表：

$$
\operatorname{Attn}(q_i,k_j,v_j)
=
\operatorname{softmax}_j
\left(
\frac{
\left(R_{\theta}(u_i,v_i)q_i\right)^\top
\left(R_{\theta}(u_j,v_j)k_j\right)
}{\sqrt{d}}
\right)v_j
$$

多域 RLCS 的策略优化沿用 GRPO 的组内相对优势思想。对同一提示 \(x\) 采样 \(G\) 个回答 \(y_i\)，先在组内归一化奖励：

$$
\widehat{A}_i=
\frac{r(x,y_i)-\operatorname{mean}(\{r(x,y_j)\}_{j=1}^{G})}
{\operatorname{std}(\{r(x,y_j)\}_{j=1}^{G})+\epsilon}
$$

再用 clipped ratio 约束策略更新幅度：

$$
\mathcal{L}_{\mathrm{GRPO}}
=
-\frac{1}{G}\sum_{i=1}^{G}
\min\left(
\rho_i\widehat{A}_i,\;
\operatorname{clip}(\rho_i,1-\varepsilon,1+\varepsilon)\widehat{A}_i
\right),
\qquad
\rho_i=\frac{\pi_\theta(y_i\mid x)}
{\pi_{\theta_{\mathrm{old}}}(y_i\mid x)}
$$

课程采样的直觉可写成基于有效样本率的重加权。若某子域 \(d\) 的近期正确率为 \(a_d\)，则样本难度权重应压低“几乎全对”和“几乎全错”的 batch：

$$
w_d \propto \operatorname{EMA}\left(a_d(1-a_d)\right)\cdot b_d
$$

其中 \(b_d\) 是人工设定或试验得到的领域预算。\(a_d(1-a_d)\) 在 \(a_d\approx 0.5\) 时最大，表示 rollout 里同时有正负样本，GRPO 才能产生有效相对优势。

##### 方法解读

GLM-4.5V 的架构延续了“视觉编码器 + 投影器 + 语言解码器”的主流 VLM 路线，但关键点在于视觉输入没有被过早规整成固定方形分辨率。报告说明它用 3D convolution 替代原始 2D convolution 来处理视频输入，时间维做 2 倍下采样；单图输入会复制成一致的时间路径。空间侧则在 ViT self-attention 中加入 2D-RoPE，同时保留原始 learnable absolute position embedding，并对可变分辨率输入做插值。这种组合让模型可以处理极端长宽比、4K 以上高分辨率图像、长文档页面和视频帧，而不是依赖裁剪后的小图。

“思考模式”解决的是推理预算分配问题。Non-Thinking 适合 OCR、简单 VQA、格式转换等低延迟场景；Thinking 则允许模型在输出最终答案前展开更长的中间推理，适合数学、科学、空间关系、GUI 操作规划和代码生成。它不是单独的模型，而是同一底座上的推理行为切换：SFT 阶段先让模型学会规范化的 reasoning/answer 格式，RL 阶段再通过可验证奖励强化长链路推理中真正带来正确答案的行为。

RLCS 的核心不是简单“多跑 RL”，而是让多域 RL 的 rollout 更有信息量。VLM 的任务分布跨度很大：STEM 题可以用数值/符号 verifier，grounding 要算 IoU，OCR 可以用 edit distance，GUI agent 可能要比较 action 与目标坐标。若所有子域按固定比例采样，训练后期会出现大量全对或全错 batch，GRPO 的组内优势接近零，既浪费计算又增加不稳定性。课程采样根据子域难度、改进潜力和当前准确率动态扩展采样，使模型持续看到“刚好可学”的问题。

奖励系统是 GLM-4.5V 报告里最值得注意的工程细节。论文明确指出，多域 VLM RL 中某个弱 verifier 会拖垮整体训练：例如 chart、multi-image QA 或 GUI verifier 被模型找到漏洞后，reward 上升但真实准确率下降，还会连带影响 STEM 等本来 reward 稳定的领域。因此 GLM-V 把 reward 拆成可复用的格式检查、boxed answer 抽取、精确匹配、Sympy 数值判断、LLM 语义判断、IoU、编辑距离和领域特定函数评估，并建议对每个 verifier 做单元测试。

与 CogVLM 的 visual expert 路线相比，GLM-4.5V 的公开报告没有强调在 LLM 每层加入独立视觉专家，而是更偏系统化地把基础视觉模型、原生分辨率处理、思考格式、RLCS 和 reward 工程串起来。也就是说，它的能力提升主要来自三层叠加：视觉输入表示更适配复杂文档/视频/空间任务，语言底座具备强 MoE 推理能力，后训练阶段用多域可验证反馈把复杂任务的 reasoning 行为推上去。

> 💡 关键：GLM-4.5V 的“空间感知 + 思考模式”不是一个单点模块，而是视觉位置建模、时间索引、标准化推理格式和多域 RLCS 共同形成的训练/推理范式。

#### 🧪 练习题
```yaml
question: "GLM-4.5V 的 RLCS 为什么要动态选择 rollout 样本？"
options:
  - "因为全对或全错的 rollout batch 几乎不给 GRPO 提供有效相对优势，难以继续学习"
  - "因为 RLCS 只训练视觉编码器，不更新语言模型"
  - "因为动态采样可以完全替代奖励系统，不再需要 verifier"
  - "因为 GLM-4.5V 只能处理固定分辨率图片"
answer: 0
explain: "GRPO 依赖同一 prompt 下多条回答的相对奖励；当样本太简单或太难时，组内奖励缺少区分度，课程采样能把训练预算集中到仍有学习信号的问题上。"
```

### DeepSeek-V4

```yaml
id: deepseek_v4
num: 27
name: DeepSeek-V4
full_name: DeepSeek-V4
year: '2026.04'
org: DeepSeek
parent: —
paper_url: —
project_url: ''
category: frontier_2026
motivation: Engram条件内存
```

#### 📝 一句话总结
DeepSeek-V4 官方技术报告把核心贡献定义为 1.6T/49B-active MoE、百万 token 上下文、CSA+HCA 混合注意力、mHC 残差连接、Muon 优化器和 on-policy distillation；输入元信息中的 Engram 条件内存与 DeepSeek 同期公开论文高度相关，但在官方 V4 模型卡和技术报告中不是已披露的 V4 主架构模块。

#### 🎯 核心要点
- DeepSeek-V4-Pro 为 1.6T 总参数、49B 激活参数的 MoE；DeepSeek-V4-Flash 为 284B 总参数、13B 激活参数，两者官方均标注支持 1M token context
- 官方 V4 架构保留 DeepSeekMoE 与 MTP，引入 CSA+HCA 混合注意力以降低超长上下文 FLOPs 与 KV cache
- 官方报告称在 1M token 设置下，V4-Pro 的单 token 推理 FLOPs 约为 DeepSeek-V3.2 的 27%，KV cache 约为 10%
- mHC 将 residual stream 扩展为多个 hyper-connection 槽位，并通过流形约束稳定信号传播，缓解普通 HC 在深层堆叠时的数值不稳定
- Muon 优化器用于大规模预训练，提高收敛效率和训练稳定性；MoE expert 参数在发布权重中使用 FP4/FP8 混合精度
- 后训练采用两阶段范式：先分别训练数学、代码、agent、指令遵循等领域专家，再用 on-policy distillation 把多专家能力蒸馏到统一模型
- Engram 论文提出“条件内存”作为 MoE 条件计算之外的新稀疏轴，用 N-gram 式确定性查表进行 \(O(1)\) 静态知识检索，并可把大表放在 host memory
- “空间导航胜过 GPT-5.4”未在官方 V4 技术报告的公开 benchmark 表中作为视觉语言或空间导航结论披露；本文不将该点写成已证实结论

#### 🔬 深入细节
##### 核心示意图

![DeepSeek-V4 性能与长上下文效率图](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/main/assets/dsv4_performance.png)
*图：DeepSeek-V4 官方模型卡展示的 benchmark 对比，以及 V4-Pro/V4-Flash 相比 V3.2 在百万 token 上下文下的推理 FLOPs 与 KV cache 优势。*

![Engram 条件内存架构图](https://raw.githubusercontent.com/deepseek-ai/Engram/main/figures/arch.png)
*图：DeepSeek Engram 仓库中的条件内存架构。Engram 用局部 N-gram key 查表得到静态 memory embedding，再与动态 hidden state 融合。*

公开来源：DeepSeek-V4 官方模型卡 `https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro`，官方技术报告 PDF `https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/main/DeepSeek_V4.pdf`，Engram 论文 `https://arxiv.org/abs/2601.07372`，Engram 官方仓库 `https://github.com/deepseek-ai/Engram`。

##### 核心流程代码

```python
# DeepSeek-V4 official path + Engram conditional-memory research path

def deepseek_v4_block(x, layer, kv_cache):
    # mHC expands and mixes residual streams before and after the Transformer block.
    x_in = layer.mhc_pre_block_mixing(x)

    if layer.attention_type == "CSA":
        # Compress KV along sequence, then run sparse attention over selected chunks.
        k_comp, v_comp = compress_kv_by_blocks(kv_cache.k, kv_cache.v)
        selected = sparse_indexer(query=x_in, compressed_keys=k_comp)
        attn_out = sparse_attention(x_in, k_comp[selected], v_comp[selected])
    else:  # HCA
        # More aggressive compression, but dense attention over compressed states.
        k_h, v_h = heavily_compress_kv(kv_cache.k, kv_cache.v)
        attn_out = dense_attention(x_in, k_h, v_h)

    x_mid = layer.mhc_residual_mixing(x, attn_out)
    moe_out = deepseek_moe(x_mid)          # routed experts + shared experts
    x_out = layer.mhc_post_block_mixing(x_mid, moe_out)
    return x_out


def post_train_v4(base_model, domain_data):
    teachers = []
    for domain in ["math", "code", "agent", "instruction"]:
        expert = copy(base_model)
        train_sft(expert, domain_data[domain].sft)
        train_grpo(expert, domain_data[domain].rl, reward_model=domain_data[domain].reward)
        teachers.append(expert)

    student = copy(base_model)
    for prompt in on_policy_prompts():
        teacher_logits = route_to_best_teacher(teachers, prompt).generate_logits(prompt)
        student_logits = student(prompt)
        loss = reverse_kl(student_logits, teacher_logits)
        update(student, loss)
    return student


def engram_memory_lookup(tokens, hidden):
    # Engram is a separately published DeepSeek conditional-memory module.
    key = hash_ngram(tokens[-N:])          # deterministic O(1) address
    mem = memory_table[key]               # can be hosted outside GPU memory
    gate = sigmoid(Wg @ hidden)
    return hidden + gate * Wm(mem)
```

##### 关键公式

mHC 的基础形式来自 Hyper-Connections：把残差状态从单条向量扩展为 \(n_{\mathrm{hc}}\) 条槽位，让层函数只作用于映射后的 \(d\)-维输入，再写回扩展残差空间：

$$
X_{l+1}
=
B_lX_l + C_lF_l(A_lX_l),
\qquad
X_l\in\mathbb{R}^{n_{\mathrm{hc}}\times d}
$$

CSA/HCA 的共同目标是减少 KV 随序列长度线性增长带来的显存和带宽压力。若把长度为 \(L\) 的 KV cache 按块压缩为 \(M\ll L\) 个条目，attention 可近似写成：

$$
\tilde{K},\tilde{V}=\operatorname{Compress}(K,V),
\qquad
\operatorname{Attn}_{\mathrm{HCA}}(q)
=
\operatorname{softmax}
\left(\frac{q\tilde{K}^{\top}}{\sqrt{d}}\right)\tilde{V}
$$

CSA 在压缩后进一步选择 query-critical chunk，只对集合 \(S(q)\) 中的压缩 KV 做稀疏注意力：

$$
\operatorname{Attn}_{\mathrm{CSA}}(q)
=
\operatorname{softmax}_{j\in S(q)}
\left(\frac{q\tilde{k}_j^{\top}}{\sqrt{d}}\right)\tilde{v}_j
$$

Engram 的条件内存可以抽象为确定性地址函数 \(h(\cdot)\) 与查表融合：

$$
m_t = E[h(x_{t-N+1:t})],
\qquad
\hat{h}_t = h_t + \sigma(W_g h_t)\odot W_m m_t
$$

这里 \(E\) 是大规模静态 memory table，\(h(\cdot)\) 用最近 \(N\)-gram token 构造 key。直觉上，MoE 选择“计算专家”，Engram 选择“静态记忆条目”，两者是不同稀疏轴。

##### 方法解读

DeepSeek-V4 的官方叙事核心是“百万 token 上下文的效率”。传统 Transformer 在长上下文下最大瓶颈不是参数量，而是 attention FLOPs 与 KV cache：prefill 要处理海量历史 token，decoding 时每个新 token 都要访问越来越大的 KV。V4 用 CSA+HCA 组合把这一问题拆开：CSA 保留稀疏选择能力，让模型只关注与当前 query 相关的压缩块；HCA 更激进地压缩 KV，但维持 dense attention，给模型一条更稳定的全局上下文通道。二者混用，使 1M context 不只是“位置编码拉长”，而是推理成本曲线被重写。

mHC 解决的是大模型深层信号传播问题。普通 residual connection 把每层输出加回同一个 residual stream，表达路径相对固定；Hyper-Connections 扩展出多个残差槽位，用 \(A_l,B_l,C_l\) 控制每层读入和写回的位置，相当于在深度方向增加可学习的信息路由。但 HC 扩展后容易出现数值不稳定，mHC 通过把残差映射限制在特定流形上提高稳定性。对 1.6T 级别 MoE 来说，这类连接结构的意义不只是涨分，而是让超深/超宽训练能稳定跑完。

后训练阶段的 on-policy distillation 也与传统“一个模型直接 RL 到底”不同。DeepSeek-V4 先把数学、代码、agent、指令等领域分别培养成专家：每个专家先 SFT 再 GRPO，对应各自的 reward 或 success criteria。随后统一模型作为学生，在自身分布上学习多个专家的输出分布，优化 reverse KL。这样做的工程动机是降低多目标 RL 的互相干扰：专家阶段追求单域强，蒸馏阶段再合并能力，而不是让一个 reward 混合体同时拉扯所有能力。

Engram 论文与用户元信息中的“条件内存”高度对应，但需要和 V4 官方报告区分开。Engram 认为 MoE 只解决“该激活哪个计算专家”，没有给 Transformer 一个原生的“静态知识查表”原语；于是它用现代化 N-gram embedding 作为 \(O(1)\) lookup，把局部 token 模式映射到超大 memory table。论文报告 27B Engram 在等参数、等 FLOPs 条件下优于纯 MoE baseline，并指出确定性寻址允许从 CPU/host memory 预取，降低 GPU 显存压力。这是一个很合理的下一代稀疏方向，但官方 V4 报告公开披露的主线仍是 CSA/HCA、mHC、Muon 和 OPD。

从视觉语言模型视角看，DeepSeek-V4 本身不是公开披露的原生 VLM；它更像可作为多模态系统语言/推理底座的长上下文 MoE。若要服务视觉语言任务，通常还需要视觉编码器、投影器、OCR/文档解析器或 GUI/空间任务工具链，把视觉 token、结构化坐标、页面文本和行动轨迹送入 V4 的长上下文窗口。它的“百万 token + 高效 KV”优势会在长视频、长文档、多屏 GUI agent、跨文件代码审查这类场景中体现，而不是直接等价于有视觉感知能力。

> ⚠️ 注意：输入描述里的“Engram 条件内存机制”和“空间导航胜过 GPT-5.4”不能从官方 DeepSeek-V4 技术报告直接核验。本文保留元信息不改动，但正文按可核验来源把 V4 官方架构与 Engram 相邻研究分开解读。

#### 🧪 练习题
```yaml
question: "DeepSeek-V4 官方技术报告中，降低百万 token 上下文成本的核心架构手段是什么？"
options:
  - "CSA+HCA 混合注意力压缩 KV 并进行稀疏/压缩注意力计算"
  - "把所有 MoE expert 改成稠密 FFN"
  - "只增加视觉编码器分辨率，不改变语言模型注意力"
  - "取消 KV cache，每次 decoding 都从头重算完整上下文"
answer: 0
explain: "官方报告明确把 CSA+HCA 作为长上下文效率核心：V4-Pro 在 1M token 设置下仅需 V3.2 约 27% 的单 token FLOPs 和约 10% 的 KV cache。"
```

### InternVL 3.0

```yaml
id: internvl_3_0
num: 28
name: InternVL 3.0
full_name: InternVL 3.0
year: '2025.04'
org: 上海AI Lab
parent: internvl_3_5
paper_url: —
project_url: ''
category: native_multimodal
motivation: V2PE原生多模态预训练
```

#### 📝 一句话总结
InternVL 3.0 提出 native multimodal pre-training，把纯文本语料和图文/视频/交错多模态数据放在同一自回归预训练阶段中联合优化，并用 V2PE 为视觉 token 分配更小可变位置增量，从而缓解后接式多模态对齐和长上下文位置窗口压力。

#### 🎯 核心要点
- 架构延续 InternVL 系列 ViT-MLP-LLM 范式，视觉编码器采用 InternViT-300M 或 InternViT-6B，语言侧初始化自 Qwen2.5 系列或 InternLM3-8B base 模型
- 与先训练文本 LLM 再做多模态 adapter 对齐的 post-hoc 流程不同，InternVL3 在预训练阶段同时学习语言能力和多模态能力
- Pixel unshuffle 将每个 448×448 tile 的视觉 token 数降到原来的四分之一，使每个 tile 表示为 256 个视觉 token
- V2PE 对文本 token 使用位置增量 1，对视觉 token 使用 \(\delta\in\{1,\frac12,\frac14,\dots,\frac1{256}\}\)，用更小视觉位置步长容纳更多图像、视频帧或文档页
- 预训练目标仍是自回归 next-token prediction，但通过 token-level weight \(w_i\) 对不同模态/输出位置控制损失贡献
- Post-training 使用 SFT 和 Mixed Preference Optimization (MPO)，在指令遵循、复杂推理、OCR、文档、图表、GUI、工业图像和空间感知等数据上继续增强
- 推理阶段采用 test-time scaling，可通过多次采样、答案重排序或更大视觉/文本上下文预算提高复杂任务表现
- InternVL3-78B 在 MMMU 上报告 72.2，成为当时开放 MLLM 中的强基线，并保持较强纯语言能力

#### 🔬 深入细节
##### 核心示意图

![InternVL3 多模态性能对比](https://arxiv.org/html/2504.10479v1/x1.png)
*图：InternVL3 相比 InternVL 系列前代和其他开放/闭源 MLLM 的多模态能力对比。*

![InternVL3 OpenCompass 榜单表现](https://arxiv.org/html/2504.10479v1/x2.png)
*图：InternVL3 在 OpenCompass 多模态学术榜单中的表现，官方报告强调 InternVL3-78B 接近 Gemini-2.5-Pro 等闭源强模型。*

公开来源：InternVL3 论文 `https://arxiv.org/abs/2504.10479`，论文 HTML `https://arxiv.org/html/2504.10479v1`，官方项目页 `https://internvl.github.io/blog/2025-04-11-InternVL-3.0/`，官方仓库 `https://github.com/OpenGVLab/InternVL`，V2PE 论文 `https://arxiv.org/abs/2412.09616`。

##### 核心流程代码

```python
# InternVL3 native multimodal pre-training and V2PE sketch

DELTA_SET = [1, 1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256]

def build_v2pe_positions(tokens, delta):
    pos = [0]
    for i in range(1, len(tokens)):
        if tokens[i].modality == "text":
            step = 1.0
        else:  # image patch, video patch, document visual token
            step = delta
        pos.append(pos[-1] + step)
    return pos


def encode_image_tiles(image):
    tiles = dynamic_tile(image, tile_size=448)
    patch_tokens = internvit(tiles)
    patch_tokens = pixel_unshuffle(patch_tokens)  # reduce token count to 1/4
    visual_tokens = mlp_projector(patch_tokens)   # 256 visual tokens per tile
    return visual_tokens


def native_pretrain(model, mixed_corpus):
    for sample in mixed_corpus:
        # sample can be pure text, image-text, video-text, or interleaved image-text.
        tokens = tokenize_and_pack(sample, encode_image_tiles)
        delta = random_choice(DELTA_SET)
        positions = build_v2pe_positions(tokens, delta)

        logits = model(tokens, position_ids=positions)
        loss = 0.0
        for i in range(1, len(tokens)):
            if tokens[i].is_training_target:
                loss += tokens[i].weight * cross_entropy(logits[i - 1], tokens[i])
        update(model, loss)


def post_train(model, sft_data, preference_pairs):
    train_sft(model, sft_data)
    for batch in preference_pairs:
        loss_pref = preference_loss(model, batch.chosen, batch.rejected)
        loss_quality = quality_loss(model, batch.quality_labels)
        loss_gen = lm_loss(model, batch.reference)
        update(model, wp * loss_pref + wq * loss_quality + wg * loss_gen)
```

##### 关键公式

Native multimodal pre-training 把任意训练样本表示成统一 token 序列：

$$
\mathbf{x}=(x_1,x_2,\dots,x_L),
$$

其中 \(x_i\) 可以是文本 token、图像 tile token、视频 patch token 或交错文档 token。完整自回归目标为：

$$
\mathcal{L}_{\text{full}}(\theta)
=
-\sum_{i=2}^{L}
w_i\log p_\theta(x_i\mid x_1,\dots,x_{i-1})
$$

V2PE 递归构造位置索引。传统做法不分模态统一 \(+1\)，V2PE 则让视觉 token 用更小步长：

$$
p_i=
\begin{cases}
0, & i=1,\\
p_{i-1}+1, & x_i \text{ is a textual token},\\
p_{i-1}+\delta, & x_i \text{ is a visual token},
\end{cases}
\qquad
\delta\in
\left\{1,\frac12,\frac14,\frac18,\frac1{16},\frac1{32},\frac1{64},\frac1{128},\frac1{256}\right\}
$$

MPO 后训练可以概括成偏好、质量和生成保持三项的加权和：

$$
\mathcal{L}_{\mathrm{MPO}}
=
w_p\mathcal{L}_{p}
+w_q\mathcal{L}_{q}
+w_g\mathcal{L}_{g}
$$

##### 方法解读

InternVL3 的核心转变是从“后接多模态”走向“原生多模态”。传统 MLLM 通常先得到一个纯文本 LLM，再冻结或部分冻结它，接入视觉 encoder 和 adapter，最后用图文数据做 alignment。这种路线工程上高效，但会产生明显的模态间隙：LLM 的预训练分布从未见过视觉 token，adapter 必须把视觉特征硬塞进语言空间，同时还要避免破坏原有语言能力。InternVL3 仍使用已有 ViT/LLM 初始化来节约成本，但训练目标上把纯文本和多模态数据统一到同一个自回归预训练阶段，让语言能力和视觉语言能力共同形成。

V2PE 解决的是多模态长上下文中的位置预算问题。假设一页文档或一帧高分辨率图像被切成大量视觉 token，如果每个视觉 token 都像文本一样让 position id 加 1，那么后面的文本 query 会被推到非常靠后的位置，视频、多图、长文档很快超过上下文窗口。V2PE 对视觉 token 使用 \(\delta<1\) 的可变步长，把大量视觉 token “压缩”到更短的位置跨度内，但不减少 token 本身，因此它不同于 pooling 式视觉 token 压缩。模型仍能看到细粒度视觉表示，只是 RoPE/位置索引增长更慢。

这个设计的细节在于 \(\delta\) 是可变的，而不是固定小数。训练时从 \(\{1,\frac12,\dots,\frac1{256}\}\) 中采样，让模型习惯不同视觉位置密度；推理时根据实际序列长度选择 \(\delta\)，在不越过位置窗口的前提下尽量保留位置分辨率。若输入较短，\(\delta=1\) 退化为 InternVL2.5 的常规位置编码；若输入包含多图、视频帧或长 PDF，可以选择更小 \(\delta\) 支持万级甚至更长的多模态 token。

Pixel unshuffle 是另一个实用的可扩展性设计。InternVL3 继续把图像拆成 448×448 tile，但经过 pixel unshuffle 后，每个 tile 只保留 256 个视觉 token，相当于把视觉 token 数降到原来的四分之一。它和 V2PE 的作用互补：pixel unshuffle 减少实际 token 数，降低计算成本；V2PE 减少视觉 token 对 position window 的占用，提升长上下文可用性。两者结合，使 InternVL3 能处理更高分辨率图像、更多图像和更长文档。

后训练阶段的 SFT/MPO 用于把预训练得到的通用能力转成可用助手能力。SFT 让模型遵循指令、输出规范答案，并覆盖 GUI、OCR、chart、document、industrial image、3D/spatial 等新场景；MPO 则利用 preference pair、质量标签和生成保持项继续优化输出分布。相比只用 SFT，MPO 能显式压低劣质回答；相比只做偏好优化，加入生成保持项能减少模型在格式、语言和通用问答上的退化。

与 InternVL2.5 相比，InternVL3 的贡献不只是 benchmark 更高。它把训练范式、位置编码和工程扩展性三个问题一起解决：native pre-training 减少模态间隙，V2PE 让多模态长上下文不被视觉 token 位置撑爆，pixel unshuffle 控制视觉 token 成本，SFT/MPO/test-time scaling 再把能力推向实际任务。InternVL3-78B 在 MMMU 上达到 72.2 的意义也在这里：它证明开放 VLM 可以在保持语言能力的同时，通过更原生的训练范式接近闭源多模态模型的复杂学科推理表现。

> 💡 关键：V2PE 不是“删掉视觉 token”，而是让视觉 token 的 position index 以更小可变步长增长；native multimodal pre-training 则让这些视觉 token 从预训练阶段就参与语言模型的自回归学习。

#### 🧪 练习题
```yaml
question: "InternVL3 中 V2PE 的主要作用是什么？"
options:
  - "让视觉 token 使用更小可变位置增量，从而在长多模态序列中降低位置窗口压力"
  - "把所有视觉 token 全部删除，只保留 OCR 文本"
  - "把语言模型替换成扩散模型"
  - "只用于训练 reward model，与位置编码无关"
answer: 0
explain: "V2PE 对文本 token 保持 +1，对视觉 token 使用可变的 δ 小步长，使多图、视频和长文档能占用更少位置跨度，同时保留视觉 token 表示。"
```

### V-JEPA 2

```yaml
id: v_jepa2
num: 29
name: V-JEPA 2
full_name: V-JEPA 2
year: '2026'
org: Meta
parent: —
paper_url: ICLR 2026
project_url: ''
category: frontier_2026
motivation: 预测编码视频理解
```

#### 📝 一句话总结
V-JEPA 2 将 JEPA 的“在潜在空间预测被遮挡内容”扩展到互联网级视频预训练，并在少量机器人交互视频上后训练出 V-JEPA 2-AC，使同一套表征既能做视频理解、动作预测，也能通过潜在空间规划执行机器人操作。

#### 🎯 核心要点
- 自监督视频预训练：使用超过 100 万小时视频和约 100 万张图像，通过 mask-denoising feature prediction 学习物理世界表征
- 潜在预测而非像素生成：预测 EMA target encoder 给出的表示，使用 L1 损失，只在被遮挡 patch 上回归，避免建模不可预测的像素细节
- 可扩展 ViT 视频编码器：从 ViT-L 扩展到约 10 亿参数 ViT-g，tubelet 大小为 \(2\times16\times16\)，并使用 3D-RoPE 建模时间、高度、宽度位置
- 四个扩展要素：数据从 200 万视频扩到 2200 万视频、模型从 300M 扩到 1B、训练步数从 90K 到 252K、后期提高空间分辨率和时间长度
- 视频理解能力：在 Something-Something v2 上达到 77.3 top-1，在 Epic-Kitchens-100 动作预判上达到 39.7 recall-at-5
- 语言对齐能力：把冻结视频编码器接入 LLM 后，在 PerceptionTest、TempCompass 等视频问答基准上达到 8B 级模型 SOTA
- 机器人规划能力：冻结 V-JEPA 2 编码器，在少于 62 小时 DROID 无标签机器人视频上训练 300M action-conditioned predictor
- 模型预测控制：V-JEPA 2-AC 在潜在空间想象动作结果，用 Cross-Entropy Method 搜索动作序列，并以 receding horizon 方式只执行第一步

#### 🔬 深入细节
##### 核心示意图

![V-JEPA 2 总览图](https://arxiv.org/html/2506.09985v1/x1.png)
*图：V-JEPA 2 先从互联网视频和图像中学习通用视频表征，再用于视频问答、动作分类/预判，以及机器人 action-conditioned world model 后训练。*

![V-JEPA 2-AC 后训练示意](https://arxiv.org/html/2506.09985v1/x10.png)
*图：V-JEPA 2-AC 的 teacher forcing 训练分支。冻结编码器产生当前帧潜在表示，action-conditioned predictor 根据动作与末端执行器状态预测下一帧表示。*

公开来源：论文 `https://arxiv.org/abs/2506.09985`，Meta 官方介绍 `https://ai.meta.com/research/vjepa/`，Meta 博客 `https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/`，官方代码 `https://github.com/facebookresearch/vjepa2`。

##### 核心流程伪代码

```python
# V-JEPA 2: latent-space masked video prediction + action-conditioned planning

def pretrain_vjepa2_step(video):
    tubelets = patchify(video, size=(2, 16, 16))
    visible_tokens, masked_pos = multiblock_mask(tubelets)

    z_context = encoder_theta(visible_tokens, rope="3d")       # trainable encoder
    z_target = ema_encoder_theta_bar(tubelets).detach()        # stop-gradient target

    mask_tokens = learned_position_tokens(masked_pos)
    z_pred = predictor_phi(z_context, mask_tokens, rope="3d")

    loss = l1(z_pred[masked_pos], z_target[masked_pos])
    update(encoder_theta, predictor_phi, loss)
    update_ema(ema_encoder_theta_bar, encoder_theta)
    return loss

def posttrain_vjepa2_ac_step(frames, actions, poses):
    encoder_theta.freeze()
    z = encoder_theta(frames).detach()

    # teacher forcing: use ground-truth previous latents
    z_next_tf = ac_predictor_phi(z[:-1], actions[:-1], poses[:-1],
                                 attention="block_causal")
    loss_tf = l1(z_next_tf, z[1:])

    # rollout: feed predictions back to reduce error accumulation
    z_roll = z[0]
    rollout_loss = 0.0
    for t in range(rollout_horizon):
        z_roll = ac_predictor_phi(z_roll, actions[t], poses[t],
                                  attention="block_causal")
        rollout_loss += l1(z_roll, z[t + 1])

    loss = loss_tf + rollout_loss
    update(ac_predictor_phi, loss)
    return loss

def plan_with_vjepa2_ac(current_image, goal_image, state, horizon):
    z_now = encoder_theta(current_image)
    z_goal = encoder_theta(goal_image)

    gaussian = init_action_distribution(horizon)
    for _ in range(num_cem_iters):
        candidates = gaussian.sample(num_sequences)
        scores = []
        for action_seq in candidates:
            z_future = ac_predictor_phi.rollout(z_now, state, action_seq)
            scores.append(l1(z_future, z_goal))
        gaussian.refit(candidates, scores, top_k="lowest_energy")

    best_sequence = gaussian.mean()
    return best_sequence[0]  # execute first action, then observe and re-plan
```

##### 关键公式

V-JEPA 2 预训练不是重建 RGB 像素，而是让 predictor 根据可见视频片段 \(x\)、被遮挡位置 token \(\Delta_y\)，预测 target encoder 对完整视频 \(y\) 的潜在表示：

$$
\min_{\theta,\phi,\Delta_y}
\left\|
P_{\phi}\left(\Delta_y,E_{\theta}(x)\right)
-
\mathrm{sg}\left(E_{\bar{\theta}}(y)\right)
\right\|_1
$$

其中 \(\bar{\theta}\) 是 encoder 参数 \(\theta\) 的指数滑动平均，\(\mathrm{sg}(\cdot)\) 表示停止梯度。V-JEPA 2-AC 后训练时，冻结视频编码器，只训练 action-conditioned predictor：

$$
\mathcal{L}_{\mathrm{AC}}(\phi)
=
\mathcal{L}_{\mathrm{teacher\ forcing}}(\phi)
+
\mathcal{L}_{\mathrm{rollout}}(\phi)
$$

机器人规划时，给定当前潜在状态 \(z_k\)、末端状态 \(s_k\)、目标图像潜在表示 \(z_g\)，搜索动作序列使想象后的潜在状态接近目标：

$$
\mathcal{E}(\hat{a}_{1:T};z_k,s_k,z_g)
=
\left\|
P(\hat{a}_{1:T};s_k,z_k)-z_g
\right\|_1,\qquad
a_{1:T}^{\star}=\arg\min_{\hat{a}_{1:T}}\mathcal{E}
$$

##### 方法解读

V-JEPA 2 的核心选择是“预测表示”而不是“生成视频”。视频像素里有大量不可预测细节，例如纹理、背景微小变化和压缩噪声；如果用生成式目标，模型会把容量花在复原这些细节上。JEPA 路线只要求预测目标编码器产生的语义/动态表示，因此训练压力更集中在可预测的物体、动作、接触关系和时序变化上。这也是它适合做世界模型的关键：规划不需要生成逼真画面，只需要知道动作会把状态推向哪里。

预训练阶段的结构是一个视频 ViT encoder 加一个 predictor。输入视频先被切成 \(2\times16\times16\) tubelets，然后随机丢弃一组时空块；encoder 只看可见 token，predictor 再结合可学习 mask token 和位置编码去补全被遮挡位置的 latent target。target 由 EMA encoder 产生，并通过 stop-gradient 防止两个网络相互追逐导致表征塌缩。损失只作用在 masked tokens 上，因此模型必须从上下文推断缺失片段，而不是复制输入。

V-JEPA 2 相比 V-JEPA 1 的重要变化在于规模化训练配方。论文把数据扩到 VideoMix22M 级别，使用超过 100 万小时视频；模型扩到约 10 亿参数 ViT-g；训练步数更长；并在训练后期把空间分辨率从 256 提高到 384、视频长度从 16 帧提高到 64 帧。3D-RoPE 将特征维度拆给时间、高度、宽度三个轴分别旋转，使大模型处理长视频时更稳定，也更适合保留运动结构。

V-JEPA 2-AC 不是从头训练机器人策略，而是在冻结的 V-JEPA 2 表征上学习“动作会怎样改变潜在视频状态”。它把每一帧的 patch 表示、机器人动作、末端执行器 pose token 交错输入一个约 300M 参数 transformer，并用 block-causal attention 保证当前时刻只能看当前和过去的信息。teacher forcing 让一步预测稳定，rollout loss 则把预测结果递归喂回模型，训练它在多步想象时减少误差累积。

规划阶段把机器人控制写成潜在空间能量最小化。系统先编码当前图像和目标图像，然后采样多条候选动作序列，用 V-JEPA 2-AC 想象执行后的潜在状态，选出与目标 latent 距离最小的候选。Cross-Entropy Method 反复用低能量样本更新动作分布，最后只执行第一步，再根据新观测重新规划。这种 receding-horizon 方式避免一次性开环执行整条轨迹，能在真实机器人误差和视觉反馈变化下持续修正。

与行为克隆 VLA 不同，V-JEPA 2-AC 不依赖任务特定示范和文本指令；与视频扩散世界模型不同，它也不需要在规划内反复生成高保真视频。它牺牲了可视化像素的直观性，换来更轻的潜在预测和更快的动作搜索。论文报告在单张未标定 RGB 摄像头、跨实验室 Franka 机械臂设置下可 zero-shot 完成 reach、grasp、pick-and-place，说明自监督视频表征可以成为低数据机器人规划的可行底座。

> 💡 关键：V-JEPA 2 的“世界模型”不是一个像素级视频生成器，而是一个能在 latent space 中理解当前状态、预测未来状态，并用目标图像反推动作的预测编码器。

#### 🧪 练习题
```yaml
question: "V-JEPA 2 为什么选择预测 latent representation，而不是直接预测 RGB 像素？"
options:
  - "因为 latent prediction 更关注可预测的语义和动态结构，减少对不可预测像素细节的建模压力"
  - "因为 RGB 像素无法被 Vision Transformer 切分成 patch"
  - "因为 latent prediction 可以完全不需要视频数据"
  - "因为机器人规划必须输出自然语言 token"
answer: 0
explain: "JEPA 的目标是在表征空间预测被遮挡内容，使模型学习稳定的物理和时序结构；像素生成会消耗大量容量去复原纹理和噪声。"
```

### DrivePI

```yaml
id: drivepi
num: 30
name: DrivePI
full_name: DrivePI
year: '2026'
org: —
parent: —
paper_url: CVPR 2026
project_url: ''
category: frontier_2026
motivation: 4D多模态自动驾驶
```

#### 📝 一句话总结
DrivePI 提出空间感知 4D MLLM，把 LiDAR 点云、多视角图像和语言指令统一到可训练的 VLA 框架中，并并行输出文本理解、3D occupancy、occupancy flow 和规划动作，解决 VLA 模型缺少细粒度 3D 中间结果、VA 模型缺少语言交互的问题。

#### 🎯 核心要点
- 统一 VLA/VA 范式：同时保留 VLA 的语言交互能力和 VA 模型的精细 3D 感知、预测、规划能力
- 多模态输入：融合 nuScenes 风格的 6 路多视角图像、LiDAR 点云和文本指令，由多模态视觉编码器转成 BEV latent feature
- 空间投影器：将 \(F_{bev}\in\mathbb{R}^{H\times W\times C}\) patchify 成 \(K\times K\) 局部块，再用 cross-attention 压缩为 MLLM 可消费的 vision tokens
- 0.5B MLLM 骨干：论文使用 0.5B Qwen2.5 作为 MLLM backbone，证明小型语言模型也可承载精细 4D 自动驾驶任务
- 四个任务头：text head 自回归回答场景问题，3D occupancy head 输出体素占据，occupancy flow head 预测动态流，action diffusion head 输出轨迹规划
- 数据引擎：用 InternVL3-78B 生成前/后视角描述，再基于 occupancy、flow、未来轨迹标注生成 text-occupancy、text-flow 和 text-planning QA
- 联合优化：总损失由 \(L_{llm}\)、\(L_{occ}\)、\(L_{flow}\)、\(L_{action}\) 加权求和，所有任务端到端共同训练
- 评测覆盖：在 nuScenes、nuScenes-QA、OpenOcc、Occ3D 上评估理解、3D 占据、占据流和规划，报告优于 VLA 与专用 VA 基线

#### 🔬 深入细节
##### 核心示意图

![DrivePI 框架图](https://arxiv.org/html/2512.12799v1/sec/figures/framework.png)
*图：DrivePI 先把多视角图像与 LiDAR 点云编码为 BEV 表示，经 spatial projector 映射为视觉 token，再由 MLLM 和四类任务头并行完成理解、3D perception、prediction 与 planning。*

![DrivePI 数据引擎](https://arxiv.org/html/2512.12799v1/x2.png)
*图：DrivePI 的多阶段数据管线。先生成前后视角 caption，再构造 4D spatial QA 与 planning reasoning QA，使语言模型学习 occupancy、flow 和规划相关空间知识。*

公开来源：CVPR OpenAccess `https://openaccess.thecvf.com/content/CVPR2026/html/Liu_DrivePI_Spatial-aware_4D_MLLM_for_Unified_Autonomous_Driving_Understanding_Perception_CVPR_2026_paper.html`，论文 PDF `https://openaccess.thecvf.com/content/CVPR2026/papers/Liu_DrivePI_Spatial-aware_4D_MLLM_for_Unified_Autonomous_Driving_Understanding_Perception_CVPR_2026_paper.pdf`，arXiv `https://arxiv.org/abs/2512.12799`。

##### 核心流程伪代码

```python
# DrivePI: spatial-aware 4D MLLM for autonomous driving

def spatial_projector(F_bev, patch_size, llm_dim):
    # F_bev: [H, W, C], usually much denser than language-token budget allows
    patches = patchify(F_bev, size=(patch_size, patch_size))  # [N, K*K, C]
    pooled = mean_pool(patches, dim=1, keepdim=True)           # [N, 1, C]

    # Use pooled token as query, local patch tokens as key/value.
    local = cross_attention(query=pooled, key=patches, value=patches)
    vision_tokens = linear(local.squeeze(dim=1), out_dim=llm_dim)  # [N, C_l]
    return vision_tokens

def drivepi_forward(multiview_images, lidar_points, text_prompt, labels):
    F_bev = multimodal_vision_encoder(multiview_images, lidar_points)
    vision_tokens = spatial_projector(F_bev, patch_size=K, llm_dim=C_l)
    text_tokens = tokenizer(text_prompt)

    hidden = qwen25_mllm(tokens=[vision_tokens, text_tokens], trainable=True)

    text_logits = text_head(hidden)                 # scene understanding / QA
    occ_logits = occupancy_head(hidden.vision)      # 3D occupancy
    flow_pred = occupancy_flow_head(hidden.vision)  # occupancy flow
    action_traj = action_diffusion_head(hidden)     # trajectory planning

    loss_llm = autoregressive_ce(text_logits, labels.answer_tokens)
    loss_occ = occupancy_loss(occ_logits, labels.occupancy)
    loss_flow = velocity_loss(flow_pred, labels.occupancy_flow)
    loss_action = diffusion_planning_loss(action_traj, labels.future_traj)

    loss = (lambda_1 * loss_llm
            + lambda_2 * loss_occ
            + lambda_3 * loss_flow
            + lambda_4 * loss_action)
    update_all_trainable_modules(loss)
    return text_logits, occ_logits, flow_pred, action_traj
```

##### 关键公式

DrivePI 首先把 BEV latent feature 切成局部块，并计算视觉 token 数：

$$
F_{bev}\in\mathbb{R}^{H\times W\times C},\qquad
F_{patch}\in\mathbb{R}^{N\times K^2\times C},\qquad
N=\frac{H}{K}\times\frac{W}{K}
$$

空间投影器用池化后的局部摘要作为 query，用原始 patch token 作为 key/value，避免直接池化丢失局部几何：

$$
F_v
=
\mathrm{Linear}\left(
\mathrm{Attn}(Q=F_{pool},K=F_{patch},V=F_{patch})
\right),
\qquad
F_v\in\mathbb{R}^{N\times C_l}
$$

训练目标把语言、占据、流和动作规划四个损失联合起来：

$$
L_{total}
=
\lambda_1L_{llm}
+
\lambda_2L_{occ}
+
\lambda_3L_{flow}
+
\lambda_4L_{action}
$$

其中 \(L_{llm}\) 约束文本回答和场景描述，\(L_{occ}\) 约束 3D occupancy，\(L_{flow}\) 约束动态占据流，\(L_{action}\) 约束规划轨迹或动作扩散输出。

##### 方法解读

DrivePI 的问题设定来自自动驾驶里两条路线的互补短板。传统 Vision-Action 模型如 UniAD/VAD 强在 3D perception、prediction、planning 的结构化输出，因此可解释性和安全检查更清晰，但自然语言交互弱；VLA/MLLM 路线可以回答问题、接受指令并解释场景，却常常只输出文本或动作，缺少 occupancy 与 flow 这样的细粒度 3D 中间量。DrivePI 的核心贡献是把二者放进同一个可训练框架：语言模型不只是“看图说话”，还必须通过专门头输出可度量的 4D 空间结果。

输入侧，DrivePI 不满足于多视角 camera-only VLA，而是加入 LiDAR 点云来补足精确几何。视觉编码器把多视角图像和点云转换成 BEV feature \(F_{bev}\)，这一步继承了自动驾驶感知系统擅长的鸟瞰空间表示。BEV 的分辨率通常超过 \(100\times100\)，如果直接把每个位置当成 token 喂给 MLLM，长度和显存都会失控；如果简单池化，又会损失车辆、行人、可行驶区域边界等局部结构。

空间投影器是 DrivePI 连接 BEV 与语言模型的关键。它先把 BEV 切成 \(K\times K\) 局部块，每个块形成 \(K^2\) 个局部 token；再把该块池化成一个 query，原始局部 token 作为 key/value 做 cross-attention。这样每个输出 vision token 仍是一块 BEV 的压缩摘要，但摘要是内容自适应的，而不是固定平均池化。直觉上，模型可以在同样 token budget 下保留“这个区域里哪些空间细节值得带给 MLLM”。

MLLM 主体接收 vision tokens 和 text tokens 后，DrivePI 不只用 text head 预测自然语言答案，还从多模态 hidden state 中抽取对应视觉 token，经线性投影还原为空间特征图，再接 3D occupancy、occupancy flow、action diffusion 三类细粒度头。这个设计让语言模型内部表征同时服务文本推理和几何任务：如果模型想在 QA 中说“左前方车辆正在靠近”，它也需要在 occupancy/flow 头中给出相应空间证据。

数据引擎补齐了普通驾驶 QA 数据缺少 4D supervision 的问题。论文先用强 MLLM 为前后视角生成 caption，再合并成完整场景描述；随后基于真实 occupancy 和 flow 标注构造多轮 text-occupancy/text-flow QA，例如某个位置是否被占据、属于什么类别、速度如何；最后基于未来 ego 轨迹生成 planning QA。论文报告训练集包含 nuScenes-QA 的 377k QA、84k 场景描述、560k 4D spatial reasoning QA 和 24k planning reasoning QA，总规模超过 100 万 QA。

联合损失使 DrivePI 的优势不只来自“多任务头堆叠”。如果只训练文本头，MLLM 可能学会模糊描述但无法保证几何一致；如果只训练 VA 头，模型缺少语言可控性和解释能力。加权总损失把两类约束施加到同一个多模态表征上：语言目标提供交互式语义，occupancy/flow 提供可验证空间中间结果，action diffusion 负责把这些中间结果落实到未来轨迹。论文因此报告单个 0.5B Qwen2.5 backbone 的 DrivePI 能在 nuScenes-QA、OpenOcc、Occ3D 和规划指标上同时对比 VLA 与专用 VA 方法。

实验结果也体现了这种统一目标的收益。CVPR OpenAccess 摘要报告 DrivePI 相比 OpenDriveVLA-7B 在 nuScenes-QA 上 mean accuracy 高 2.5%，相对 ORION 将 nuScenes collision rate 从 0.37% 降到 0.11%；相对专用 VA 模型，OpenOcc 3D occupancy 比 FB-OCC 高 10.3 RayIoU，occupancy flow 的 mAVE 从 0.591 降到 0.509，规划 L2 error 相对 VAD 从 0.72m 降到 0.49m。更重要的是，这些结果来自一个统一模型，而不是为理解、感知、预测、规划分别训练不同系统。

> 💡 关键：DrivePI 的“4D MLLM”不是把驾驶结果都转成文字，而是让语言模型内部表征同时接受文本、3D occupancy、occupancy flow 和动作规划监督，从而把可交互性与可验证空间输出结合起来。

#### 🧪 练习题
```yaml
question: "DrivePI 的 spatial projector 为什么不用简单平均池化直接压缩 BEV feature？"
options:
  - "因为 BEV feature 没有空间维度，无法池化"
  - "因为 cross-attention 可以在压缩 token 数的同时保留局部块内更细的空间信息"
  - "因为 MLLM 只能接收 LiDAR 原始点云，不能接收 BEV token"
  - "因为 occupancy flow 只能由文本 token 预测"
answer: 1
explain: "DrivePI 将 BEV 切成局部 patch 后，用 pooled token 查询原始局部 token，避免简单池化丢掉细粒度几何，同时控制进入 MLLM 的 token 数。"
```
