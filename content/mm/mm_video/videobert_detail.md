### VideoBERT

```yaml
id: videobert
name: VideoBERT
full_name: "VideoBERT: A Joint Model for Video and Language Representation Learning"
year: "2019"
org: Google
paper_url: "https://arxiv.org/abs/1904.01766"
category: classic
parent: "—"
motivation: "首创视频-语言BERT联合预训练"
```

#### 📝 一句话总结

VideoBERT 首次将 BERT 的掩码语言模型预训练范式扩展到视频-语言联合建模领域，通过将视频帧量化为离散"视觉词汇"并与文本 token 拼接，利用大规模无标注烹饪视频进行自监督预训练，在零样本动作分类和视频字幕生成任务上展现了强大的跨模态理解能力。

#### 🎯 核心要点

- **视觉 token 化**：利用预训练 S3D 网络提取视频片段特征，通过层次化 k-means（4 层 × 12 簇 = 20,736 个视觉词汇）将连续视频特征离散化为 visual tokens
- **联合序列建模**：将文本 WordPiece tokens 和视觉 tokens 通过特殊分隔符 `[SEP]` 拼接为统一序列，输入 BERT 进行联合编码
- **三种预训练目标**：text-only 掩码语言模型、video-only 掩码视觉 token 预测、text-video 跨模态对齐分类
- **大规模预训练数据**：从 YouTube 收集 312K 烹饪视频（共 23,186 小时），利用 ASR 自动获取文本标注，无需人工标注
- **BERT_LARGE 架构**：24 层 Transformer，1024 维隐藏层，16 头自注意力，词表扩展 20,736 个视觉词条目
- **下游任务验证**：在 YouCook II 数据集上实现零样本动作分类（verb top-5: 43.3%，object top-5: 33.7%）和视频字幕生成 SOTA（CIDEr: 0.55）

#### 🔬 深入细节

![VideoBERT 模型总览](https://ar5iv.labs.arxiv.org/html/1904.01766/assets/x1.png)
*图 1：VideoBERT 模型总览。上方展示预训练过程：将视频帧通过 S3D + 向量量化转为视觉 token，与 ASR 文本 token 拼接后输入 BERT 进行联合预训练。下方展示下游应用：零样本分类和视频字幕生成。*

![VideoBERT 输入格式与预训练目标](https://ar5iv.labs.arxiv.org/html/1904.01766/assets/x2.png)
*图 2：VideoBERT 的输入构造方式。文本 token 和视频 token 通过 `[CLS]`、`[SEP]`、`[>]` 等特殊符号组织为统一序列，支持掩码预测和跨模态对齐两种预训练目标。*

##### 算法核心流程

```python
# VideoBERT 预训练伪代码
# Step 1: 视频特征提取与量化
for video in youtube_cooking_videos:  # 312K videos
    clips = sample_frames(video, fps=20, window=30)  # 1.5s non-overlapping clips
    features = S3D_pretrained(clips)  # 1024-dim per clip
    visual_tokens = hierarchical_kmeans_quantize(features, d=4, k=12)  # 20736 clusters

# Step 2: 文本预处理
for video in videos_with_asr:  # ~120K English ASR videos
    text = youtube_asr_api(video)
    sentences = add_punctuation_lstm(text)
    text_tokens = wordpiece_tokenize(sentences)  # 30K vocab

# Step 3: 联合预训练 (BERT_LARGE, 4 TPUs, 0.5M iters)
for batch in data_loader:
    # 目标 1: Text-only MLM
    loss_text = masked_lm(text_tokens)
    
    # 目标 2: Video-only masked token prediction  
    loss_video = masked_lm(visual_tokens)
    
    # 目标 3: Text-Video alignment classification
    # [CLS] text_tokens [SEP] video_tokens [SEP]
    combined = concat(text_tokens, video_tokens)
    loss_align = binary_classification(combined, is_aligned)
    
    loss = w1 * loss_text + w2 * loss_video + w3 * loss_align
    adam_optimizer.step(loss, lr=1e-5, linear_decay)
```

##### 动机与背景

自然语言处理领域中，BERT 通过在大规模无标注文本上进行自监督预训练，学到了强大的通用语言表征，并在多项下游任务上取得了突破性进展。然而，视频理解领域长期依赖有监督学习范式——需要大量人工标注的动作标签或字幕数据来训练模型。这种范式面临两个核心瓶颈：

1. **标注成本高昂**：视频标注远比文本标注复杂，需要标注者观看完整视频并理解时序关系
2. **语义鸿沟**：视觉特征与语言描述之间存在巨大的表征差异，传统方法难以建立有效的跨模态关联

VideoBERT 的核心洞察在于：**互联网上存在海量的教学视频（如烹饪视频），其中的语音内容天然地描述了视觉场景中正在发生的事情**。通过 ASR（自动语音识别）技术，可以零成本地获取与视频对齐的文本描述，从而构建大规模的视频-语言配对数据进行自监督预训练。

##### 核心机制：视觉 Token 化

VideoBERT 面临的首要技术挑战是：BERT 处理的是离散 token 序列，而视频是连续的高维信号。论文提出了一种优雅的解决方案——**视觉向量量化（Visual Vector Quantization）**：

1. **特征提取**：对输入视频以 20fps 采样，划分为 1.5 秒（30 帧）的非重叠片段，使用在 Kinetics 数据集上预训练的 S3D 网络提取每个片段的 1024 维特征向量

2. **层次化聚类**：对所有视频片段特征执行层次化 k-means 聚类，设置层次深度 \(d=4\)，每层簇数 \(k=12\)，总共产生 \(12^4 = 20{,}736\) 个视觉词汇（visual words）

3. **Token 映射**：每个视频片段被映射到最近的聚类中心，用该中心的索引作为其离散 token ID

> 💡 **关键**：层次化聚类的设计使得语义相近的视频片段被映射到相同或相邻的 token，保留了语义信息而非低级视觉外观。例如，不同视频中"搅拌碗中食材"的片段会被量化为相同的视觉 token。

![视觉量化示例](https://ar5iv.labs.arxiv.org/html/1904.01766/assets/x3.png)
*图 3：视觉 token 化示例。左侧为原始视频帧，右侧为对应的视觉聚类中心。可以看到量化过程保留了语义信息（如"倒入液体"、"搅拌"）而非像素级细节。*

##### 输入构造与预训练目标

**输入序列构造**：VideoBERT 将文本和视频 token 拼接为统一序列。对于文本-视频配对输入，格式为：

$$\text{[CLS]}\ t_1\ t_2\ \cdots\ t_m\ \text{[SEP]}\ v_1\ v_2\ \cdots\ v_n\ \text{[SEP]}$$

其中 \(t_i\) 为 WordPiece 文本 token，\(v_j\) 为量化后的视觉 token。文本句子通过 ASR 时间戳与对应的视频片段对齐。

**预训练目标 1 — 掩码 Token 预测（Cloze Task）**：

与 BERT 的 MLM 类似，随机掩码输入序列中的部分 token（文本或视觉），让模型预测被掩码的 token。对于 text-only 和 video-only 输入，分别独立执行掩码预测：

$$\mathcal{L}_{\text{cloze}} = -\sum_{i \in \mathcal{M}} \log p(x_i \mid x_{\setminus \mathcal{M}})$$

其中 \(\mathcal{M}\) 为被掩码的 token 索引集合。这使得模型不仅学习语言建模，还学习"视频语言模型"——即视频中状态转换的时序动态。

**预训练目标 2 — 语言-视觉对齐分类**：

对于文本-视频配对输入，模型需要判断文本句子和视频片段是否来自同一时间段。具体地，利用 `[CLS]` token 的输出表征进行二分类：

$$\mathcal{L}_{\text{align}} = -\left[ y \log \sigma(f_{\text{CLS}}) + (1-y) \log (1 - \sigma(f_{\text{CLS}})) \right]$$

其中 \(y \in \{0, 1\}\) 表示是否对齐，\(f_{\text{CLS}}\) 为 `[CLS]` token 的输出经线性层映射后的 logit。

**总训练目标**为三个损失的加权和：

$$\mathcal{L} = \lambda_1 \mathcal{L}_{\text{text-cloze}} + \lambda_2 \mathcal{L}_{\text{video-cloze}} + \lambda_3 \mathcal{L}_{\text{align}}$$

> ⚠️ **注意**：由于 ASR 文本与视频内容的时间对齐并不精确（说话者可能提前或延后描述视觉内容），论文采用了两个关键的数据增强策略：(1) 随机拼接相邻句子以容忍时间偏移；(2) 随机以 1-5 倍的步长对视频 token 进行子采样，以适应不同视频速度并捕获更长时间跨度的动态。

##### 模型架构与训练细节

VideoBERT 基于 **BERT_LARGE** 架构：
- 24 层 Transformer 块
- 1024 维隐藏层
- 16 个自注意力头
- 词表：原始 BERT 的 ~30,000 个 WordPiece token + 20,736 个视觉 token

模型从预训练的 BERT_LARGE 文本检查点初始化，新增的 20,736 个视觉词嵌入使用对应聚类中心的 S3D 特征初始化，且**输入嵌入在预训练过程中冻结**。

训练配置：
- 4 个 Cloud TPU（Pod 配置），batch size = 128
- Adam 优化器，初始学习率 \(1 \times 10^{-5}\)，线性衰减
- 训练 50 万次迭代（约 8 个 epoch），耗时约 2 天

##### 下游应用

**零样本动作分类**：利用预训练模型的掩码预测能力，构造模板句 "now let me show you how to [MASK] the [MASK]"，将视频 token 与该模板拼接后，让模型预测两个 [MASK] 位置的词，分别作为动词和名词预测结果。在 YouCook II 上，无需任何微调即可达到 verb top-5 43.3%、object top-5 33.7% 的准确率。

**视频字幕生成**：提取 `[CLS]` token 的内部表征作为视频的稠密特征，结合 S3D 特征输入解码器生成字幕。在 YouCook II 上取得 CIDEr 0.55 的 SOTA 结果，超越了此前所有方法。

| 方法 | BLEU-4 | METEOR | CIDEr |
|------|--------|--------|-------|
| Zhou et al. | 3.84 | 11.55 | 0.38 |
| S3D | 3.24 | 9.52 | 0.31 |
| VideoBERT (video only) | 3.81 | 10.81 | 0.47 |
| **VideoBERT + S3D** | **4.33** | **11.94** | **0.55** |

##### 与传统方法的核心区别

1. **自监督 vs 有监督**：传统视频理解方法依赖人工标注数据训练，VideoBERT 利用 ASR 文本作为免费的监督信号，可扩展到数十万视频
2. **离散化 vs 连续化**：不同于直接使用连续视觉特征的方法，VideoBERT 将视频量化为离散 token，使其能直接复用 BERT 的成熟架构和训练策略
3. **联合建模 vs 独立建模**：传统方法通常独立训练视觉和语言编码器再进行融合，VideoBERT 在统一的 Transformer 中同时建模两种模态，实现了深层的跨模态交互
4. **预训练-微调范式**：首次将 NLP 中成功的预训练-微调范式引入视频-语言领域，为后续 VisualBERT、VILBERT、UniVL 等工作奠定了基础

#### 🧪 练习题

```yaml
question: "VideoBERT 将视频转化为离散 token 的核心方法是什么？"
options:
  - "使用 VQ-VAE 对视频帧进行端到端的向量量化"
  - "对 S3D 提取的视频特征进行层次化 k-means 聚类"
  - "使用 CNN 直接将每帧分类为预定义的视觉类别"
  - "通过目标检测器提取区域特征并离散化"
answer: 1
explain: "VideoBERT 使用预训练 S3D 网络提取 1.5 秒视频片段的 1024 维特征，然后通过层次化 k-means（d=4, k=12）聚类为 20,736 个视觉 token，而非使用 VQ-VAE、分类器或目标检测器。"
```