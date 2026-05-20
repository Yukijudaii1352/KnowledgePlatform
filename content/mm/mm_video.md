---
domain: multimodal
topic_id: mm_video
topic_name: 视觉理解
page_icon: 🎬
page_title: 视觉理解技术演进总结
page_subtitle: 2026-05-12 版
page_desc: 概述视频理解从传统时序建模、语义定位到Video-LLM的发展脉络
hero_pills:
- 🏷️ Video-LLM · Temporal Grounding · Summarization · Long Video QA
count_pill: 32 个算法
categories:
  classic:
    label: 经典时序建模
    color: '#3B82F6'
  localization:
    label: 时序动作定位
    color: '#10B981'
  grounding:
    label: 视频时刻检索
    color: '#F59E0B'
  video_llm:
    label: Video-LLM
    color: '#8B5CF6'
  frontier_2026:
    label: 2026年前沿
    color: '#EF4444'
image_base: ../../content/mm/mm_video/assets/
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
- id: movieqa
  x: 100
  y: 50
  category: classic
- id: videobert
  x: 200
  y: 50
  category: classic
- id: clip4clip
  x: 350
  y: 50
  category: classic
- id: cinepile
  x: 500
  y: 50
  category: classic
- id: scnn
  x: 100
  y: 150
  category: localization
- id: cdc
  x: 200
  y: 150
  category: localization
- id: bsn
  x: 300
  y: 150
  category: localization
- id: bmn
  x: 400
  y: 150
  category: localization
- id: gtad
  x: 500
  y: 150
  category: localization
- id: afsd
  x: 600
  y: 150
  category: localization
- id: tallformer
  x: 700
  y: 150
  category: localization
- id: tall
  x: 200
  y: 250
  category: grounding
- id: mcn
  x: 200
  y: 300
  category: grounding
- id: 2dtan
  x: 350
  y: 250
  category: grounding
- id: vslnet
  x: 350
  y: 300
  category: grounding
- id: moment_detr
  x: 500
  y: 275
  category: grounding
- id: univtg
  x: 650
  y: 275
  category: grounding
- id: mqvtg
  x: 800
  y: 275
  category: grounding
- id: dsnet
  x: 300
  y: 400
  category: video_llm
- id: video_chatgpt
  x: 450
  y: 400
  category: video_llm
- id: videollama
  x: 550
  y: 400
  category: video_llm
- id: llava_video
  x: 650
  y: 400
  category: video_llm
- id: internvideo2
  x: 750
  y: 400
  category: video_llm
- id: videollama3
  x: 850
  y: 400
  category: video_llm
- id: hmt
  x: 400
  y: 500
  category: frontier_2026
- id: lvsum
  x: 500
  y: 500
  category: frontier_2026
- id: hitea
  x: 750
  y: 500
  category: frontier_2026
- id: unitime
  x: 600
  y: 550
  category: frontier_2026
- id: markit
  x: 750
  y: 550
  category: frontier_2026
- id: universal_vtg_mllm
  x: 850
  y: 550
  category: frontier_2026
- id: qwen35
  x: 950
  y: 500
  category: frontier_2026
- id: gemini3pro
  x: 950
  y: 550
  category: frontier_2026
edges:
- from: videobert
  to: clip4clip
  label: CLIP迁移
- from: movieqa
  to: cinepile
  label: 长视频扩展
- from: scnn
  to: cdc
  label: 反卷积
- from: cdc
  to: bsn
  label: 边界敏感
- from: bsn
  to: bmn
  label: 边界匹配
- from: bmn
  to: gtad
  label: 图卷积
- from: gtad
  to: afsd
  label: 无锚点
- from: afsd
  to: tallformer
  label: 长程记忆
- from: tall
  to: 2dtan
  label: 二维建模
- from: tall
  to: vslnet
  label: 跨度预测
- from: vslnet
  to: moment_detr
  label: Transformer
- from: moment_detr
  to: univtg
  label: 统一框架
- from: univtg
  to: mqvtg
  label: 时刻量化
- from: clip4clip
  to: video_chatgpt
  label: 对话微调
- from: video_chatgpt
  to: videollama
  label: 音频融合
- from: videollama
  to: llava_video
  label: 合成数据
- from: llava_video
  to: internvideo2
  label: 模型缩放
- from: videollama
  to: videollama3
  label: 动态分辨率
- from: dsnet
  to: hmt
  label: 层次融合
- from: hmt
  to: lvsum
  label: 时间戳感知
- from: univtg
  to: hitea
  label: 无训练
- from: moment_detr
  to: unitime
  label: 零样本
- from: llava_video
  to: markit
  label: 视觉标记
- from: internvideo2
  to: universal_vtg_mllm
  label: 生成式
- from: videollama3
  to: qwen35
  label: 原生多模态
- from: internvideo2
  to: gemini3pro
  label: 超长上下文
milestones:
- tall
- moment_detr
- video_chatgpt
```

## 核心算法

### MovieQA

```yaml
id: movieqa
num: 1
name: MovieQA
full_name: 电影问答基准 (MovieQA)
year: '2016'
org: Toronto
parent: —
paper_url: https://arxiv.org/abs/1512.02902
project_url: ''
category: classic
motivation: 首个电影故事理解数据集
```

#### 📝 一句话总结
MovieQA 提出了首个大规模电影故事理解问答数据集，包含 14,944 道关于 408 部电影的多选题，支持五种信息源（剧情概要、字幕、剧本、DVS、视频片段），并设计了从简单余弦检索到卷积神经网络和记忆网络的多级基线方法，揭示了视频故事理解的巨大挑战（最佳模型 56.7% vs 人类 83.4%）。

#### 🎯 核心要点
- **大规模多源数据集**：14,944 个 QA 对覆盖 408 部电影，每题 5 个选项，支持 5 种信息源（plot synopses、subtitles、scripts、DVS、video clips）
- **视频问答子集**：140 部电影提供时间戳对齐的视频片段（6,462 个 QA），是首个电影级视频 QA 基准
- **偏差分析基线（Hasty Student）**：验证答案长度、答案间相似度、问答相似度等偏差均接近随机（20-28%），证明数据集质量
- **滑动窗口检索方法（Searching Student）**：基于余弦相似度的滑窗匹配，TF-IDF 在 plot 上达 47.6%
- **卷积神经相似度模型（SSCB）**：将问题-故事和答案-故事相似度向量组合为张量，用 CNN 学习评分函数，融合特征后达 56.7%
- **改进的端到端记忆网络（MemN2N）**：引入自然语言答案嵌入层和固定 Word2Vec + 线性投影，解决大词汇量过拟合问题，在 scripts 上达 42.3%
- **文本表示**：对比 TF-IDF、Word2Vec、SkipThought 三种句子表示，TF-IDF 在词匹配任务最优，Word2Vec 在语义泛化上有优势
- **视频 QA 极具挑战**：纯视频 QA 准确率仅 ~23%，接近随机，表明视频故事理解远未解决

#### 🔬 深入细节
![MovieQA 数据集概览](https://ar5iv.labs.arxiv.org/html/1512.02902/assets/x1.png)
*图：MovieQA 数据集示例——一个电影场景对应的问题、5 个候选答案以及多种信息源（plot、subtitle、script、DVS、video）*

![SSCB 神经相似度架构](https://ar5iv.labs.arxiv.org/html/1512.02902/assets/x5.png)
*图：Searching Student with Convolutional Brain (SSCB) 的神经网络架构，输入为 n×5×2 的相似度张量，经 1×1 卷积和最大池化后输出 5 类 softmax 预测*

```python
# MovieQA 问答评分框架伪代码
# 通用评分函数: f(S, q, a_j) → 第j个答案的得分
# 预测: answer = argmax_j f(S, q, a_j)

# === 方法1: Searching Student (余弦滑窗) ===
def searching_student(story_sentences, question, answers, window_H):
    """滑动窗口 + 余弦相似度"""
    for j, a_j in enumerate(answers):
        best_score = -inf
        for l in range(len(story_sentences) - window_H):
            window = story_sentences[l : l + window_H]
            score = sum(cosine(s_k, question) + cosine(s_k, a_j) for s_k in window)
            best_score = max(best_score, score)
        scores[j] = best_score
    return argmax(scores)

# === 方法2: SSCB (卷积神经相似度) ===
def sscb(story_sentences, question, answers):
    """CNN 学习相似度评分函数"""
    # 计算 g_I(S, q): n维向量, 每个元素是 cosine(s_k, q)
    g_q = [cosine(s_k, question) for s_k in story_sentences]  # shape: (n,)
    # 计算 g_I(S, a_j): 对每个答案, shape: (n, 5)
    g_a = [[cosine(s_k, a_j) for s_k in story_sentences] for a_j in answers]
    # 堆叠为张量: (n, 5, 2)
    tensor = stack([replicate(g_q, 5), g_a], dim=-1)
    # CNN: 1x1 conv (h=10) → MaxPool(3) → 1x1 conv → MeanPool + MaxPool → softmax
    return cnn(tensor)  # shape: (5,)

# === 方法3: 改进 MemN2N ===
def memn2n(story_sentences, question, answers):
    """端到端记忆网络 + 自然语言答案"""
    Z = word2vec_embedding  # 固定预训练嵌入
    T = learnable_projection  # d2 × d1 线性投影
    u = T @ Z @ mean_pool(question)           # 问题编码
    m_l = [T @ Z @ mean_pool(s) for s in story_sentences]  # 故事记忆
    c_l = m_l  # 共享嵌入时 c = m
    g_j = [T @ Z @ mean_pool(a) for a in answers]  # 答案编码
    # 注意力机制
    p = softmax([dot(u, m) for m in m_l])     # 故事句子权重
    o = sum(p_l * c_l for p_l, c_l in zip(p, c_l))  # 加权故事表示
    # 预测
    return softmax([(o + u).T @ g for g in g_j])
```

**动机与背景**

在 MovieQA 之前，视觉问答（VQA）主要关注单张图片的简单事实性问题，而文本 QA 数据集（如 bAbI、MCTest）规模有限且缺乏多模态支持。电影作为一种复杂的叙事媒介，要求理解长时间跨度的因果关系、角色动机和情节发展。MovieQA 的核心动机是构建一个能同时评估文本和视频故事理解能力的大规模基准，弥合视觉感知与语言推理之间的鸿沟。

**数据集构建流程**

数据集的构建分为三个阶段：(1) **QA 生成**：标注者阅读电影的 plot synopsis 后编写问题和正确答案，要求问题涉及"what/who/why/how"等多种类型；(2) **干扰项生成**：另一组标注者为每个问题编写 4 个错误但合理的候选答案，要求与正确答案长度和风格相似以避免偏差；(3) **视频对齐**：对于有视频的电影，标注者将每个 QA 与电影中的具体时间段（视频片段）对齐。最终数据集按电影划分为 train/val/test（约 10:2:3 比例），确保同一电影的所有 QA 在同一划分中。

**核心方法解析**

论文提出了三层递进的方法体系。**第一层（Hasty Student）** 完全不看故事，仅利用答案本身的统计偏差（长度、相互相似度）或问答对的表面匹配来猜测答案，结果均接近随机水平（20-28%），验证了数据集设计的有效性。人类在不看故事时也仅达 27.6%。

**第二层（Searching Student）** 引入故事信息，核心思想是在故事中搜索与问题和答案最相关的片段。具体地，对于故事中的每个长度为 \(H\) 的滑动窗口，计算窗口内句子与问题及答案的余弦相似度之和：

$$f(S, q, a_j) = \max_l \sum_{k=l}^{l+H} \left[ g_{ss}(s_k, q) + g_{ss}(s_k, a_j) \right]$$

其中 \(g_{ss}(s, q) = x(s)^T x(q)\) 是归一化句子表示的点积。这一方法在 plot 上使用 TF-IDF 特征可达 47.6%。

**SSCB** 进一步将上述相似度向量化并输入 CNN 学习更复杂的评分函数。将 \(g_I(S, q)\)（n 维向量）和 \([g_I(S, a_j)]_{j=1}^5\)（n×5 矩阵）堆叠为 n×5×2 张量，经两层 1×1 卷积（h=10 个滤波器）、核大小为 3 的最大池化、以及均值+最大池化聚合后，通过 softmax 输出 5 类预测。融合 TF-IDF、Word2Vec、SkipThought 三种特征后，SSCB 在 plot 上达到 **56.7%** 的最佳准确率。

**第三层（改进 MemN2N）** 对原始端到端记忆网络做了两项关键修改：(1) 添加答案嵌入层 \(F\)，将预测从词汇表选择改为自然语言答案排序：\(a = \text{softmax}((o + u)^T g)\)；(2) 用固定的 Word2Vec 嵌入 \(Z\) 替换可学习的词嵌入，仅学习一个共享线性投影 \(T \in \mathbb{R}^{d_2 \times d_1}\)，将参数量从数百万降至数万。这使得 MemN2N 在长文本源（scripts: 42.3%, DVS: 33.0%）上表现优于 SSCB，因为注意力机制能有效筛选数千句故事中的关键信息。

> 💡 **关键发现**：文本 QA 中 plot 表现最好（因 QA 基于 plot 生成），但 MemN2N 在 scripts 上超越其他文本源，说明复杂的三方评分函数（故事-问题-答案）对长文本至关重要。视频 QA 准确率仅 ~23%（接近随机的 20%），即使融合字幕也仅达 38%，远低于人类的 83.4%，表明视频故事理解是一个极具挑战的开放问题。

> ⚠️ **注意**：所有报告结果均在 val 集上，test 集通过在线评估服务器提交。数据集的 QA 基于 plot synopses 生成，因此 plot 源天然具有优势，其他源（subtitles、scripts、DVS、video）的表现更能反映真实的故事理解能力。

#### 🧪 练习题
```yaml
question: "MovieQA 对原始 MemN2N 的关键改进是什么？"
options:
  - "增加了更多的记忆层（memory hops）以提升推理深度"
  - "用固定 Word2Vec 嵌入替换可学习词嵌入，并添加自然语言答案嵌入层"
  - "引入视觉特征作为额外的记忆输入"
  - "使用 Transformer 注意力机制替换原始的点积注意力"
answer: 1
explain: "原始 MemN2N 的词汇表选择式回答不适用于自然语言多选题，且可学习嵌入在大词汇量下严重过拟合。MovieQA 通过固定 Word2Vec + 共享线性投影解决过拟合，并添加答案嵌入层 F 实现自然语言答案排序。"
```

### VideoBERT

```yaml
id: videobert
num: 2
name: VideoBERT
full_name: 视频预训练模型 (VideoBERT)
year: '2019'
org: Google
parent: —
paper_url: https://arxiv.org/abs/1904.01766
project_url: ''
category: classic
motivation: 首创视频-语言BERT联合预训练
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

### CLIP4Clip

```yaml
id: clip4clip
num: 3
name: CLIP4Clip
full_name: 视频检索模型 (CLIP4Clip)
year: '2021'
org: Microsoft
parent: videobert
paper_url: https://arxiv.org/abs/2104.08860
project_url: ''
category: classic
motivation: 将CLIP迁移至视频-文本检索
```

#### 📝 一句话总结
CLIP4Clip 的核心目标是：将CLIP迁移至视频-文本检索。

#### 🎯 核心要点
- 核心动机：将CLIP迁移至视频-文本检索
- 演化来源：继承或改进自 videobert
- 代表机构：Microsoft

#### 🔬 深入细节
将CLIP迁移至视频-文本检索


### CinePile

```yaml
id: cinepile
num: 4
name: CinePile
full_name: 长视频QA基准 (CinePile)
year: '2024'
org: Google
parent: movieqa
paper_url: https://arxiv.org/abs/2405.08813
project_url: ''
category: classic
motivation: 真实长视频音频对齐基准
```

#### 📝 一句话总结
CinePile 提出了一种基于音频描述（Audio Descriptions）和 LLM 自动化问答生成的可扩展流水线，构建了包含约 30 万训练样本和 5000 测试样本的长视频多模态理解基准，揭示了当前最优视频 LLM（~60%）与人类表现（~73%）之间仍存在显著差距。

#### 🎯 核心要点
- **大规模数据集**：训练集 298,888 个 MCQ，测试集 4,940 个 MCQ，来自 9,396 个电影片段（平均时长约 160 秒）
- **音频描述（AD）作为视觉代理标注**：利用为视障人群制作的专业旁白描述替代昂贵的人工视觉标注，天然包含场景、动作、表情等视觉信息
- **自动化问答生成流水线**：从人工问答数据集中提取 86 个问题模板，再由 GPT-3.5/GPT-4 基于 AD+字幕+元数据自动生成 MCQ
- **多维度质量过滤**：包括退化问题检测（仅凭选项即可作答）、视觉依赖性评估（去除字幕后能否回答）、难度分级（Gemini Pro 能否答对）
- **5 大问题类别**：角色与关系动态（CRD）、叙事与情节分析（NPA）、场景与技术分析（STA）、时间推理（TEMP）、主题探索（TH）
- **全面模型评估**：涵盖 GPT-4o、GPT-4V、Gemini 1.5 Pro、Claude 3 Opus 等商业模型及 mPLUG-Owl、Video-ChatGPT、MovieChat 等开源模型
- **人类基线**：普通人类 73.21%，论文作者 86.00%；最优模型 GPT-4o 仅 59.65%

#### 🔬 深入细节
##### 核心框架总览

![CinePile 示例与问答展示](https://ar5iv.labs.arxiv.org/html/2405.08813/assets/x1.png)
*图 1：CinePile 数据集的样例电影片段及对应的多选问答示例，涵盖不同问题类别*

CinePile 的核心贡献在于提出了一套**可扩展的长视频问答数据集构建流水线**，整个流程分为四个阶段：数据收集、问题模板生成、自动化 QA 生成、质量过滤。

##### 数据收集与预处理

数据来源于 YouTube 上的电影片段，每个片段平均时长约 160 秒。对于每个视频，系统提取以下多模态信息：

1. **音频描述（Audio Descriptions, AD）**：通过 WhisperX 从视频的描述性音轨中转录获得。AD 是专为视障人群制作的旁白，在对话间隙描述场景中的视觉元素（角色外貌、动作、环境等），是天然的高质量视觉标注
2. **对话字幕**：从主音轨中转录的角色对话
3. **元数据**：电影名称、年份、类型等信息

> 💡 关键：音频描述（AD）是本文的核心创新点之一。相比传统的人工视觉标注，AD 由专业人员为视障人群制作，天然包含丰富的视觉语义信息，且已大量存在于电影资源中，无需额外标注成本。

##### 问题模板生成流水线

![问题模板生成流水线](https://ar5iv.labs.arxiv.org/html/2405.08813/assets/x2.png)
*图 2：问题模板生成流水线——从现有人工问答数据集中提取、泛化并聚类生成 86 个可复用模板*

模板生成分三步：

1. **收集种子问题**：从 MovieQA、TVQA、Perception Test 等现有人工标注数据集中收集约 30,000 个问题
2. **泛化为模板**：使用 GPT-3.5 将具体问题中的实体替换为占位符（如将"Harry 为什么离开？"泛化为"{character} 为什么离开？"），生成通用问题模板
3. **聚类去重**：使用 Sentence-BERT 对模板进行嵌入，通过余弦相似度聚类（阈值 0.7），最终得到 86 个独特的问题模板

这些模板覆盖 5 大类别：
- **角色与关系动态（CRD）**：占比最大，关注角色互动与情感变化
- **叙事与情节分析（NPA）**：围绕核心故事线和情节发展
- **场景与技术分析（STA）**：需要视觉解读的环境和拍摄技术问题
- **时间推理（TEMP）**：涉及事件顺序和时间关系
- **主题探索（TH）**：关于影片深层主题和象征意义

##### 自动化 QA 生成与过滤

![自动化 QA 生成与过滤流程](https://ar5iv.labs.arxiv.org/html/2405.08813/assets/x3.png)
*图 4：自动化 QA 生成与过滤流程——从多模态输入到最终高质量 MCQ 的完整管线*

```python
# CinePile QA 生成伪代码
for video in movie_clips:
    # 1. 提取多模态信息
    ad = whisperx_transcribe(video.ad_track)        # 音频描述
    dialogue = whisperx_transcribe(video.main_track)  # 对话字幕
    metadata = get_movie_metadata(video)               # 元数据
    
    # 2. 构建上下文
    context = f"AD: {ad}\nDialogue: {dialogue}\nMetadata: {metadata}"
    
    # 3. 从86个模板中采样，生成MCQ
    for template in sample_templates(k=32):
        prompt = f"{context}\n\nBased on the above, generate a MCQ following: {template}"
        mcq = gpt4_generate(prompt)  # 含1个正确答案 + 4个干扰项
        
    # 4. 质量过滤
    for mcq in generated_mcqs:
        # 退化检测：仅给选项，不给上下文，看LLM能否答对
        if llm_can_answer_without_context(mcq):
            mcq.mark_degenerate()
        # 视觉依赖性：去除AD仅保留对话，看能否答对
        if llm_can_answer_without_ad(mcq):
            mcq.vision_reliant = False
        # 难度分级：Gemini Pro能否答对
        if gemini_pro_correct(mcq):
            mcq.hard = False
```

**退化问题过滤**是关键的质量控制步骤。具体做法是将问题和选项（不含任何上下文）提供给 Gemini Pro，如果模型仅凭选项就能选出正确答案，说明该问题存在设计缺陷（如正确答案明显更长、更具体），需要被标记为退化问题。测试集中约 4.5% 的问题被过滤。

**视觉依赖性评估**通过去除音频描述（AD），仅保留对话字幕来测试。如果模型在缺少视觉信息的情况下仍能正确回答，则该问题不依赖视觉。测试集中 33.21% 的问题被标记为视觉依赖型。

##### 模型评估与结果分析

评估采用两阶段响应解析：首先归一化模型输出，提取选项字母（A-E）和对应文本；然后与答案键进行匹配比较。

核心实验结果：

| 模型 | 平均 | CRD | NPA | STA | TEMP | TH |
|------|------|-----|-----|-----|------|-----|
| 人类 | 73.21 | 82.92 | 75.00 | 73.00 | 75.52 | 64.93 |
| 作者 | 86.00 | 92.00 | 87.50 | 71.20 | 100.0 | 75.00 |
| GPT-4o | 59.65 | 66.54 | 77.22 | 52.76 | 42.39 | 62.33 |
| GPT-4V | 58.04 | 65.37 | 80.97 | 47.42 | 42.01 | 70.37 |
| Gemini 1.5 Pro | 59.08 | 63.44 | 63.88 | 59.52 | 37.50 | 68.42 |
| Claude 3 Opus | 44.72 | 49.64 | 61.11 | 38.86 | 32.60 | 44.87 |
| Video-ChatGPT | 15.44 | 17.31 | 15.05 | 15.79 | 7.14 | 23.38 |
| MovieChat | 4.61 | 4.95 | 4.29 | 5.23 | 2.48 | 4.21 |

![模型在全部问题与困难问题上的表现对比](https://ar5iv.labs.arxiv.org/html/2405.08813/assets/x9.png)
*图 8：各模型在 CinePile 测试集上全部问题 vs 困难问题的表现对比*

**关键发现**：

1. **商业模型 vs 人类**：最优商业模型（GPT-4o, ~60%）与人类（~73%）之间存在约 13% 的差距，表明长视频多模态理解仍是重大挑战
2. **Gemini 1.5 Pro 的视觉优势**：在视觉依赖性最高的"场景与技术分析"类别中，Gemini 1.5 Pro（59.52%）显著优于 GPT-4V（47.42%），得益于其原生长上下文多模态处理能力
3. **GPT-4 的叙事优势**：在"叙事与情节分析"类别中，GPT-4V（80.97%）大幅领先 Gemini 1.5 Pro（63.88%）
4. **开源模型严重落后**：OSS 模型表现极差（<16%），主要原因并非能力不足，而是**无法遵循指令格式**——频繁输出无关文本、复述字幕、重述选项等
5. **困难子集**：所有模型在困难子集上下降 15-20%，但相对排名基本不变，Gemini 1.5 Pro 在困难子集上超越 GPT-4 模型

> ⚠️ 注意：开源模型的低分数部分源于评估管线的局限性——这些模型经常不按要求输出选项字母，而是生成冗长的自由文本，导致答案提取失败。论文通过子串匹配和 BertScore/CIDEr 等传统指标进行了补充评估，但相对排名未变。

##### 与现有数据集的对比

CinePile 相比现有数据集的核心优势：
- **规模**：~305k 问题，远超 MovieQA（14.9k）、TVQA（152.5k）等
- **视频长度**：平均 ~160 秒，远超 EgoSchema（180s 但仅限自我中心视频）、TVQA（76s）
- **真正多模态**：需要同时理解视觉和对话才能回答，而非仅依赖对话（如 MovieQA）
- **问题多样性**：86 个自动化模板覆盖 5 大类别，远超固定模板的数据集
- **可扩展性**：基于 AD 的自动化流水线可低成本扩展到更多电影

#### 🧪 练习题
```yaml
question: "CinePile 使用什么作为视觉信息的代理标注来避免昂贵的人工视觉标注？"
options:
  - "自动生成的视频描述（Video Captioning 模型输出）"
  - "音频描述（Audio Descriptions，为视障人群制作的专业旁白）"
  - "从电影剧本中提取的场景描述"
  - "通过目标检测模型生成的物体标签序列"
answer: 1
explain: "CinePile 的核心创新之一是利用音频描述（AD）——专为视障人群在对话间隙描述视觉场景的专业旁白——作为视觉信息的代理标注，既保证了高质量的视觉语义覆盖，又避免了昂贵的人工标注成本。"
```

### S-CNN

```yaml
id: scnn
num: 5
name: S-CNN
full_name: 时序动作定位网络 (Segment-CNN)
year: '2016'
org: Columbia
parent: —
paper_url: http://openaccess.thecvf.com/content_cvpr_2016/html/Shou_Temporal_Action_Localization_CVPR_2016_paper.html
project_url: ''
category: localization
motivation: 首个深度时序动作定位框架
```

#### 📝 一句话总结
S-CNN 的核心目标是：首个深度时序动作定位框架。

#### 🎯 核心要点
- 核心动机：首个深度时序动作定位框架
- 代表机构：Columbia

#### 🔬 深入细节
首个深度时序动作定位框架


### CDC

```yaml
id: cdc
num: 6
name: CDC
full_name: 卷积反卷积网络 (CDC Network)
year: '2017'
org: Columbia
parent: scnn
paper_url: http://openaccess.thecvf.com/content_cvpr_2017/html/Shou_CDC_Convolutional-De-Convolutional_Networks_CVPR_2017_paper.html
project_url: ''
category: localization
motivation: 反卷积实现精确边界定位
```

#### 📝 一句话总结
CDC 的核心目标是：反卷积实现精确边界定位。

#### 🎯 核心要点
- 核心动机：反卷积实现精确边界定位
- 演化来源：继承或改进自 scnn
- 代表机构：Columbia

#### 🔬 深入细节
反卷积实现精确边界定位


### BSN

```yaml
id: bsn
num: 7
name: BSN
full_name: 边界敏感网络 (Boundary Sensitive Network)
year: '2018'
org: CUHK
parent: cdc
paper_url: https://arxiv.org/abs/1806.02964
project_url: ''
category: localization
motivation: 边界敏感机制生成高质量提案
```

#### 📝 一句话总结
BSN 的核心目标是：边界敏感机制生成高质量提案。

#### 🎯 核心要点
- 核心动机：边界敏感机制生成高质量提案
- 演化来源：继承或改进自 cdc
- 代表机构：CUHK

#### 🔬 深入细节
边界敏感机制生成高质量提案


### BMN

```yaml
id: bmn
num: 8
name: BMN
full_name: 边界匹配网络 (Boundary Matching Network)
year: '2019'
org: CUHK
parent: bsn
paper_url: https://arxiv.org/abs/1907.09702
project_url: ''
category: localization
motivation: 边界匹配置信度图提升质量
```

#### 📝 一句话总结
BMN 提出了边界匹配（Boundary-Matching）机制，将时序动作提案表示为二维置信度图中的点，通过统一网络同时生成所有提案的边界概率和置信度分数，解决了 BSN 逐提案特征构建效率低下、缺乏全局上下文且需多阶段训练的问题，在 ActivityNet-1.3 和 THUMOS-14 上取得了当时最优的提案生成性能，同时推理速度提升约 12 倍。

#### 🎯 核心要点
- **边界匹配（BM）机制**：将提案表示为 \((t_s, d)\) 即起始时刻与持续时长的组合，映射到二维 BM 置信度图 \(M_{CC} \in \mathbb{R}^{D \times T}\)，实现对所有候选提案的同时评估
- **BM 特征层（BM Layer）**：通过预计算的采样掩码矩阵 \(W\)，将一维时序特征 \(S_F \in \mathbb{R}^{C \times T}\) 转换为二维 BM 特征图 \(M_F \in \mathbb{R}^{C \times N \times D \times T}\)，在每个提案的扩展区域内均匀采样 \(N\) 个特征点
- **三模块统一架构**：Base Module（时序特征编码）+ TEM（边界概率预测）+ PEM（提案置信度评估），端到端联合训练
- **双输出置信度图**：PEM 同时输出分类置信度图 \(M_{CC}\) 和回归置信度图 \(M_{CR}\)，融合后得到最终提案分数
- **评估基准**：ActivityNet-1.3（AUC 67.10%，提升 0.93%）和 THUMOS-14（AR@1000 达 65.49%），推理速度比 BSN 快约 12 倍
- **泛化能力**：在未见过的动作类别上性能几乎无下降，表明模型学习了通用的"动作何时发生"的概念

#### 🔬 深入细节
##### 核心架构图

![BMN 整体框架图](https://ar5iv.labs.arxiv.org/html/1907.09702v1/assets/x3.png)
*图：BMN 网络架构。输入视频经 TSN 编码为时序特征后，Base Module 提取共享特征，TEM 预测边界概率，PEM 通过 BM Layer 生成二维特征图并输出置信度图。*

![BM 机制示意图](https://ar5iv.labs.arxiv.org/html/1907.09702v1/assets/x1.png)
*图：边界匹配机制。左侧为 BSN 的逐提案评估方式，右侧为 BMN 的二维置信度图方式，每个点 \((i,j)\) 对应一个起始于 \(t_i\)、持续 \(d_j\) 的提案。*

##### 算法伪代码

```python
# BMN 训练与推理流程伪代码
# === 特征编码 ===
S_F = TSN_encode(video)              # S_F ∈ R^{C×T}, T=100 for ANet

# === Base Module ===
x = Conv1D(S_F, 256, k=3) + ReLU     # 时序卷积
x = Conv1D(x, 128, k=3) + ReLU       # 共享时序特征

# === TEM: 边界概率预测 ===
P_start = Sigmoid(Conv1D(x, 1, k=3)) # 起始边界概率 ∈ R^T
P_end   = Sigmoid(Conv1D(x, 1, k=3)) # 结束边界概率 ∈ R^T

# === PEM: 提案置信度评估 ===
# BM Layer: 一维特征 → 二维特征图
W = precompute_sampling_mask(N, D, T) # 采样掩码 W ∈ R^{N×D×T×T}
M_F = einsum('ct,ndtk->cndt', x, W)  # BM特征图 M_F ∈ R^{C×N×D×T}

# 3D+2D 卷积生成置信度图
h = Conv3D(M_F, 512, k=(N,1,1))      # 压缩采样维度 → R^{512×D×T}
h = Conv2D_stack(h)                    # 多层2D卷积
M_CC = Sigmoid(Conv2D(h, 1))          # 分类置信度图 ∈ R^{D×T}
M_CR = Sigmoid(Conv2D(h, 1))          # 回归置信度图 ∈ R^{D×T}

# === 推理: 提案生成 ===
proposals = peak_detect(P_start, P_end)  # 从边界概率中选取峰值组合
for (ts, te) in proposals:
    p_s, p_e = P_start[ts], P_end[te]
    cc, cr = M_CC[te-ts, ts], M_CR[te-ts, ts]
    score = p_s * p_e * (cc * cr) ** 0.5  # 融合分数
proposals = SoftNMS(proposals, scores)     # 去冗余
```

##### 动机与背景

时序动作提案生成（Temporal Action Proposal Generation）旨在从未裁剪视频中定位可能包含动作实例的时间区间，是时序动作检测的关键前置步骤。此前最优方法 BSN（Boundary Sensitive Network）采用"局部到全局"的框架：先用 TEM 预测每个时刻的边界概率，再组合边界生成候选提案，最后用 PEM 逐一评估每个提案的置信度。

BSN 存在三个核心缺陷：

1. **逐提案特征构建效率低**：PEM 需要为每个候选提案单独构建特征（通过在边界概率序列上采样），当提案数量达到数千时，计算开销巨大
2. **提案特征缺乏上下文**：BSN 仅使用边界概率序列构建提案特征，丢失了视觉内容信息，限制了置信度评估的准确性
3. **多阶段训练流程**：TEM 和 PEM 需要分别训练，无法端到端优化，增加了工程复杂度

> 💡 关键：BMN 的核心洞察是——如果将所有可能的提案组织为一个二维矩阵（起始时刻 × 持续时长），就可以用一次前向传播同时生成所有提案的置信度，而非逐一评估。

##### 核心机制：边界匹配（Boundary-Matching）

**BM 置信度图的定义**

BMN 将每个提案 \(\phi_{i,j}\) 用起始位置 \(t_i\) 和持续时长 \(d_j\) 来索引，构成一个二维矩阵。置信度图 \(M_C \in \mathbb{R}^{D \times T}\) 中的每个元素 \(m^c_{i,j}\) 表示提案 \(\phi_{i,j} = (t_i, d_j)\) 的置信度分数，其中 \(D\) 为最大持续时长，\(T\) 为时序长度。

这种表示的优势在于：所有合法提案（满足 \(t_i + d_j \leq T\)）构成置信度图的下三角区域，可以通过卷积网络一次性生成。

**BM 特征层（BM Layer）**

BM Layer 是连接一维时序特征与二维置信度图的桥梁。给定共享时序特征 \(S_F \in \mathbb{R}^{C \times T}\)，BM Layer 为每个提案 \(\phi_{i,j}\) 提取一个包含 \(N\) 个采样点的特征向量。

具体地，对于提案 \(\phi_{i,j} = (t_i, d_j)\)，首先计算其扩展区域 \([t_i - 0.25 d_j, \; t_i + d_j + 0.25 d_j]\)，然后在该区域内均匀采样 \(N\) 个位置。扩展 25% 的上下文区域是为了捕获提案边界附近的环境信息。

采样过程通过预计算的掩码矩阵 \(W \in \mathbb{R}^{N \times D \times T \times T}\) 实现：

$$M_F = S_F \cdot W$$

其中 \(M_F \in \mathbb{R}^{C \times N \times D \times T}\) 为 BM 特征图。掩码 \(W\) 的每个元素 \(w^{n}_{i,j,k}\) 表示第 \((i,j)\) 个提案的第 \(n\) 个采样点对时序位置 \(k\) 的权重（通过线性插值计算）。由于 \(W\) 仅依赖于 \(N, D, T\) 的取值，可在训练前一次性计算并固定。

> ⚠️ 注意：BM Layer 的计算本质上是矩阵乘法，因此可以高效地在 GPU 上并行执行，这是 BMN 相比 BSN 速度大幅提升的关键。

**从 BM 特征图到置信度图**

BM 特征图 \(M_F \in \mathbb{R}^{C \times N \times D \times T}\) 经过以下卷积处理生成最终置信度图：

1. **3D 卷积层**：卷积核大小 \((N, 1, 1)\)，将采样维度 \(N\) 压缩，输出 \(\mathbb{R}^{512 \times D \times T}\)
2. **多层 2D 卷积**：逐步提取空间特征
3. **双头输出**：
   - 分类头 \(M_{CC}\)：输出二值分类置信度（该位置是否为有效提案）
   - 回归头 \(M_{CR}\)：输出 IoU 回归值（该提案与真实动作的重叠度）

##### 训练流程

**TEM 损失函数**

TEM 的标签通过 IoR（Intersection over Region）计算：对于每个真实动作实例，其边界区域定义为 \([t_s - d/10, t_s + d/10]\)（起始）和 \([t_e - d/10, t_e + d/10]\)（结束），其中 \(d\) 为动作持续时长。每个时刻的标签为其与所有边界区域的最大 IoR 值。

TEM 采用加权二值逻辑回归损失：

$$L_{TEM} = L_{bl}(P_S, G_S) + L_{bl}(P_E, G_E)$$

其中 \(L_{bl}\) 使用阈值 \(\theta = 0.5\) 将标签二值化，并通过正负样本数量的倒数进行加权，平衡类别不均衡问题：

$$L_{bl}(P, G) = \frac{1}{l_\omega} \sum_{i=1}^{l_\omega} \left( \alpha^+ \cdot b_i \cdot \log(p_i) + \alpha^- \cdot (1-b_i) \cdot \log(1-p_i) \right)$$

**PEM 损失函数**

PEM 的标签 \(G_C\) 为每个提案与所有真实动作的最大 IoU 值。PEM 损失包含分类和回归两部分：

$$L_{PEM} = L_C(M_{CC}, G_C) + \lambda \cdot L_R(M_{CR}, G_C)$$

其中分类损失 \(L_C\) 同样使用 \(L_{bl}\)，回归损失 \(L_R\) 使用 L2 损失，\(\lambda = 10\)。为平衡正负样本，取 IoU > 0.6 的点为正样本，随机采样 IoU < 0.2 的点为负样本，保持正负比例约 1:1。

**总体训练目标**

$$L = L_{TEM} + \lambda_1 \cdot L_{PEM} + \lambda_2 \cdot L_2(\Theta)$$

其中 \(\lambda_1 = 1\)，\(\lambda_2 = 0.0001\)。三个模块端到端联合训练。

##### 推理流程

1. **候选提案生成**：从 TEM 输出的边界概率序列中，选取概率值高于阈值的峰值位置作为候选起始/结束点，两两组合生成候选提案
2. **分数融合**：对每个候选提案 \((t_s, t_e)\)，从置信度图中查询对应位置的分类分数 \(cc\) 和回归分数 \(cr\)，与边界概率融合：

$$score = p_s \cdot p_e \cdot \sqrt{cc \cdot cr}$$

3. **冗余抑制**：使用 Soft-NMS 去除重叠提案

##### 与 BSN 的关键区别

| 对比维度 | BSN | BMN |
|---------|-----|-----|
| 提案评估方式 | 逐提案构建特征并评分 | 一次前向生成所有提案的置信度图 |
| 提案特征来源 | 仅边界概率序列 | 视觉时序特征 + 上下文扩展 |
| 训练方式 | TEM 和 PEM 分别训练 | 端到端联合训练 |
| 推理速度（3min视频） | 0.629s | 0.052s（快 ~12x） |
| AUC (ActivityNet-1.3) | 66.17% | 67.10% |

##### 实验结果

**ActivityNet-1.3**：BMN 在验证集上 AUC 达到 67.10%（BSN 为 66.17%），AR@100 达到 75.01%。在测试集上 AUC 达到 67.19%。结合视频级分类结果后，时序动作检测 average mAP 达到 33.85%（验证集）和 36.42%（测试集），显著优于 BSN 的 30.03% 和 32.87%。

**THUMOS-14**：使用 Two-Stream 特征 + Soft-NMS，AR@50 达到 39.36%，AR@1000 达到 65.49%，全面超越 BSN。

**消融实验关键发现**：
- 端到端联合训练比分别训练 TEM+PEM 提升 AUC 0.67%（67.10% vs 66.43%）
- BM 机制使 PEM 推理时间从 BSN 的 0.624s 降至 0.062s（分别训练）或 0.047s（联合训练）
- 模型在未见过的动作类别上性能几乎无下降（AUC 64.47% vs 64.37%），展现出强泛化能力

#### 🧪 练习题
```yaml
question: "BMN 中 BM Layer 的核心作用是什么？"
options:
  - "将视频帧转换为光流特征"
  - "将一维时序特征转换为二维 BM 特征图，使所有提案可同时评估"
  - "对候选提案进行非极大值抑制"
  - "预测每个时刻的动作类别概率"
answer: 1
explain: "BM Layer 通过预计算的采样掩码矩阵，将共享的一维时序特征映射为二维 BM 特征图，使得后续卷积网络可以一次性生成所有提案的置信度，这是 BMN 相比 BSN 效率大幅提升的关键。"
```

### G-TAD

```yaml
id: gtad
num: 9
name: G-TAD
full_name: 图时序检测 (Graph TAD)
year: '2019'
org: PKU
parent: bmn
paper_url: http://openaccess.thecvf.com/content_ICCV_2019/html/Zeng_Graph_Convolutional_Networks_for_Temporal_Action_Localization_ICCV_2019_paper.html
project_url: ''
category: localization
motivation: 图卷积建模提案间关系
```

#### 📝 一句话总结
G-TAD 的核心目标是：图卷积建模提案间关系。

#### 🎯 核心要点
- 核心动机：图卷积建模提案间关系
- 演化来源：继承或改进自 bmn
- 代表机构：PKU

#### 🔬 深入细节
图卷积建模提案间关系


### AFSD

```yaml
id: afsd
num: 10
name: AFSD
full_name: 无锚点检测器 (Anchor-Free Single-Stage)
year: '2021'
org: SJTU
parent: gtad
paper_url: http://openaccess.thecvf.com/content/CVPR2021/html/Lin_Learning_Salient_Boundary_Feature_for_Anchor-free_Temporal_Action_Localization_CVPR_2021_paper.html
project_url: ''
category: localization
motivation: 首个纯Anchor-free时序定位
```

#### 📝 一句话总结
AFSD 的核心目标是：首个纯Anchor-free时序定位。

#### 🎯 核心要点
- 核心动机：首个纯Anchor-free时序定位
- 演化来源：继承或改进自 gtad
- 代表机构：SJTU

#### 🔬 深入细节
首个纯Anchor-free时序定位


### TallFormer

```yaml
id: tallformer
num: 11
name: TallFormer
full_name: 长程Transformer (TAL Long-Memory Transformer)
year: '2022'
org: UNC
parent: afsd
paper_url: https://link.springer.com/chapter/10.1007/978-3-031-19830-4_29
project_url: ''
category: localization
motivation: 长程记忆处理超长视频
```

#### 📝 一句话总结
TallFormer 的核心目标是：长程记忆处理超长视频。

#### 🎯 核心要点
- 核心动机：长程记忆处理超长视频
- 演化来源：继承或改进自 afsd
- 代表机构：UNC

#### 🔬 深入细节
长程记忆处理超长视频


### TALL

```yaml
id: tall
num: 12
name: TALL
full_name: 语言时序定位 (Temporal Activity Localization via Language)
year: '2017'
org: UCLA
parent: —
paper_url: http://openaccess.thecvf.com/content_iccv_2017/html/Gao_TALL_Temporal_Activity_ICCV_2017_paper.html
project_url: ''
category: grounding
motivation: 首创语言驱动视频定位
```

#### 📝 一句话总结
TALL 的核心目标是：首创语言驱动视频定位。

#### 🎯 核心要点
- 核心动机：首创语言驱动视频定位
- 代表机构：UCLA

#### 🔬 深入细节
首创语言驱动视频定位


### MCN

```yaml
id: mcn
num: 13
name: MCN
full_name: 时刻上下文网络 (Moment Context Network)
year: '2017'
org: Adobe
parent: —
paper_url: https://aclanthology.org/D18-1168/
project_url: ''
category: grounding
motivation: 局部-全局上下文建模
```

#### 📝 一句话总结
提出MLLC（Moment Localization with Latent Context）统一框架，将MCN和TALL纳入同一公式体系，通过引入**隐式上下文变量**（latent context）使模型能够推理时序语言（before/after/then/while），并构建TEMPO数据集验证时序推理能力。

#### 🎯 核心要点
- 核心动机：局部-全局上下文建模
- 代表机构：Adobe

#### 🔬 深入细节
##### 问题形式化与统一框架

给定视频 $v$ 和自然语言查询 $q$，目标是输出时刻 $\tau = (\tau^{(s)}, \tau^{(e)})$。核心评分函数：

$$s_\phi(v, q, \tau) = \max_{\tau' \in T_\tau} f_S\big(f_V(v, \tau, \tau'), f_L(q)\big)$$

其中：
- $\tau$ 为**基础时刻**（base moment），$\tau'$ 为**上下文时刻**（context moment）
- $T_\tau$ 为候选上下文时刻集合
- $f_V$ 为视觉特征函数，$f_L$ 为语言特征函数，$f_S$ 为相似度函数

**统一性**：当 $T_\tau$ 取不同值时退化为已有方法：
- $T_\tau = \{$整个视频$\}$ → **MCN**（全局上下文）
- $T_\tau = \{$前一段, 后一段$\}$ → **TALL**（前后上下文）
- $T_\tau = \{$所有可能时刻$\}$ → **MLLC**（隐式上下文）

##### 模型架构图

```
┌─────────────────────────────────────────────────────────┐
│                    MLLC 模型架构                          │
│                                                          │
│  输入查询 q ──→ [GloVe] ──→ [LSTM] ──→ [FC] ──→ f_L    │
│                                              ↓           │
│  输入视频 v:                              [相似度 f_S]    │
│    ┌──────────────────────────┐              ↑           │
│    │ 基础时刻 τ (绿色)        │              │           │
│    │  RGB+Flow → 池化 → [FC]  │──┐           │           │
│    └──────────────────────────┘  │           │           │
│    ┌──────────────────────────┐  ├→ concat   │           │
│    │ 上下文时刻 τ' (蓝色)     │  │  + TEF  ──→ f_V      │
│    │  RGB+Flow → 池化 → [FC]  │──┘  + conTEF            │
│    └──────────────────────────┘                          │
│                                                          │
│  推理: score(τ) = max_{τ'∈T_τ} f_S(f_V(v,τ,τ'), f_L(q))│
│  选择: τ* = argmax_τ score(τ)                            │
└─────────────────────────────────────────────────────────┘
```

##### 各组件详解

**视觉特征 $f_V$**：
- 基础时刻特征：对时刻内的帧提取 **RGB特征**（VGG16 fc7）和 **光流特征**（Flow网络），均值池化后拼接
- **TEF（Temporal Endpoint Feature）**：$f_T = (\tau^{(s)}, \tau^{(e)})$，编码时刻在视频中的位置
- **conTEF（Context TEF）**：$f_T = (\tau^{(s)}, \tau^{(e)}, \tau'^{(s)}, \tau'^{(e)})$，同时编码基础和上下文时刻的位置
- 最终：$f_V = [f_{RGB}(\tau); f_{Flow}(\tau); f_{RGB}(\tau'); f_{Flow}(\tau'); f_T]$，经FC投影到共享嵌入空间

**语言特征 $f_L$**：
- 词嵌入：GloVe → LSTM → 取最后隐状态 → FC投影到共享嵌入空间

**相似度函数 $f_S$**（消融比较）：

| 方法 | 公式 | DiDeMo R@1 |
|------|------|-----------|
| Distance-based (MCN) | $-\|f_V - f_L\|^2$ | 26.63 |
| TALL similarity | MLP($[f_V; f_L; f_V \odot f_L; f_V + f_L]$) | 27.52 |
| Mult | MLP($f_V \odot f_L$) | 28.19 |
| **Normalized Mult** (最优) | MLP($\hat{f}_V \odot \hat{f}_L$)，$\hat{f}$为L2归一化 | **28.37** |

**训练损失**：
- **Ranking Loss（MCN式）**：鼓励正样本对距离小于负样本对，使用视频内+视频间负样本
- **TALL Loss**：正负样本对上的log-logistic函数之和
- 实验表明 Ranking Loss 在DiDeMo上更优

##### 伪代码

```python
# MLLC 推理过程
def mllc_inference(video, query, all_moments):
    """
    video: 输入视频（预分割为5秒片段）
    query: 自然语言查询
    all_moments: 所有候选时刻（连续片段组合，30秒视频有21个）
    """
    # 1. 提取语言特征
    word_embs = glove_embed(query)          # [seq_len, 300]
    lang_feat = fc(lstm(word_embs))          # [D]
    
    best_moment, best_score = None, -inf
    
    for tau in all_moments:  # 遍历每个候选基础时刻
        # 2. 对每个基础时刻，遍历所有上下文时刻取max
        max_context_score = -inf
        
        for tau_prime in get_context_set(tau, all_moments):
            # 3. 提取视觉特征（基础+上下文+TEF）
            vis_base = mean_pool(rgb_feat(tau) + flow_feat(tau))
            vis_ctx  = mean_pool(rgb_feat(tau_prime) + flow_feat(tau_prime))
            tef = [tau.start, tau.end, tau_prime.start, tau_prime.end]  # conTEF
            vis_feat = fc(concat(vis_base, vis_ctx, tef))  # [D]
            
            # 4. 计算相似度（normalized mult）
            vis_norm = l2_normalize(vis_feat)
            lang_norm = l2_normalize(lang_feat)
            score = mlp(vis_norm * lang_norm)  # Hadamard积 → MLP
            
            max_context_score = max(max_context_score, score)
        
        if max_context_score > best_score:
            best_score = max_context_score
            best_moment = tau
    
    return best_moment  # 返回得分最高的时刻
```

##### 关键实验结果

**Table 3 - 基础模型消融（DiDeMo验证集）**：

| 模型 | 相似度 | 损失 | R@1 | R@5 | mIoU |
|------|--------|------|-----|-----|------|
| MCN | Distance | Ranking | 26.63 | 73.38 | 41.14 |
| TALL | TALL-sim | TALL | 8.04 | 36.32 | 22.68 |
| TALL+TEF | TALL-sim | TALL | 23.56 | 72.74 | 35.58 |
| **MLLC-Base** | **Norm.Mult** | **Ranking** | **28.37** | **78.64** | **43.65** |

**Table 4 - TEMPO-TL 时序推理结果（测试集）**：

| 模型 | Before R@1 | After R@1 | Then R@1 | DiDeMo R@1 | DiDeMo mIoU |
|------|-----------|----------|---------|-----------|-------------|
| MCN | 24.85 | 32.28 | 26.08 | 27.07 | 41.49 |
| TALL | 20.95 | 27.13 | 26.30 | 19.80 | 33.88 |
| MLLC-Global | 26.32 | 31.92 | 25.37 | 27.78 | 42.82 |
| MLLC B/A | 26.04 | 34.04 | **28.50** | 28.54 | 43.15 |
| **MLLC(SS+conTEF)** | **27.46** | **35.31** | 29.38 | **29.74** | **44.22** |

**关键发现**：
1. **Normalized Mult + Ranking Loss** 是最优的基础配置，优于MCN的距离度量和TALL的复杂相似度
2. **TEF至关重要**：TALL无TEF时R@1仅8.04，加TEF后升至23.56
3. **Latent Context + 强监督 + conTEF** 组合效果最佳，尤其在before/after类时序查询上
4. **弱监督 vs 强监督**：强监督（SS）显著优于弱监督（WS），说明上下文时刻的准确定位很重要
5. **TEMPO-HL比TEMPO-TL更难**：人类语言包含共指、改写等复杂现象

##### TEMPO数据集

| 数据集 | Before | After | Then | While | 特点 |
|--------|--------|-------|------|-------|------|
| TEMPO-TL | 23,842 | 23,842 | 11,921 | - | 模板生成，从DiDeMo句子拼接 |
| TEMPO-HL | 6,610 | 5,495 | 5,478 | 5,425 | 人工标注，含共指/改写等复杂语言现象 |

基于DiDeMo数据集（Flickr视频，25-30秒，分割为6个5秒片段），聚焦四个最常见时序词。

#### 🧪 练习题
```yaml
**Q1**：MLLC的统一评分函数 $s_\phi(v,q,\tau) = \max_{\tau' \in T_\tau} f_S(f_V(v,\tau,\tau'), f_L(q))$ 如何退化为MCN？

<details><summary>答案</summary>

当 $T_\tau = \{v_{global}\}$（即上下文时刻集合只包含整个视频的全局特征）时，max操作退化为恒等（只有一个选项），此时 $f_V$ 拼接基础时刻特征和全局视频特征，$f_S$ 使用距离度量 $-\|f_V - f_L\|^2$，训练使用ranking loss——这正是MCN的原始设计。

</details>

**Q2**：为什么TEF（Temporal Endpoint Feature）对模型性能如此关键？（TALL无TEF时R@1从23.56降至8.04）

<details><summary>答案</summary>

TEF编码了候选时刻在视频中的**绝对时间位置**信息 $(\tau^{(s)}, \tau^{(e)})$。没有TEF时，模型只能依赖视觉内容来区分不同时刻，但视频中可能存在视觉相似的片段（如重复动作）。TEF提供了时间锚点，使模型能够区分"视频开头的跑步"和"视频结尾的跑步"，这对时序推理尤为关键。conTEF进一步编码上下文时刻的位置，帮助模型理解"before/after"等时序关系。

</details>

**Q3**：论文发现强监督（SS）显著优于弱监督（WS）的latent context。这对实际应用有什么启示？

<details><summary>答案</summary>

强监督需要标注上下文时刻的ground truth（即"before X"中X对应的视频片段），这在实际中标注成本很高。弱监督通过在训练时对所有候选上下文取max来学习，但效果较差。这说明：① 准确的上下文定位是时序推理的瓶颈；② 未来工作可以探索半监督或自监督方法来提升上下文定位质量；③ 在实际部署中，可以考虑两阶段方法——先定位参考事件，再基于时序关系定位目标时刻。

</details>
```

### 2D-TAN

```yaml
id: 2dtan
num: 14
name: 2D-TAN
full_name: 二维时序网络 (2D Temporal Adjacent Networks)
year: '2020'
org: PKU
parent: tall
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/6984
project_url: ''
category: grounding
motivation: 二维网络建模时刻关系
```

#### 📝 一句话总结
2D-TAN 提出将所有候选时刻组织为二维时序特征图（行列分别表示起止时刻），并利用二维卷积网络建模相邻候选时刻之间的时序依赖关系，从而在自然语言视频时刻定位（Moment Localization）任务上实现了高效且准确的检索。

#### 🎯 核心要点
- **二维时序特征图（2D Temporal Map）**：将所有 \((i, j)\) 起止组合排列为上三角矩阵，每个位置对应一个候选时刻，天然编码了时刻之间的邻接关系
- **稀疏采样策略（Sparse Sampling）**：仅在固定间隔处采样候选时刻，减少约 50% 冗余候选而不损失性能
- **多模态融合**：采用简单的 Hadamard 乘积将语言特征与视频时刻特征融合，无需复杂注意力机制
- **二维卷积上下文建模**：在融合后的 2D 特征图上堆叠多层卷积，使每个候选时刻能感知其时序邻居的信息
- **Scaled IoU 监督**：将 IoU 通过双阈值线性缩放为连续标签，配合 BCE 损失训练，比硬二值标签更平滑
- **三大基准数据集验证**：在 Charades-STA、ActivityNet Captions、TACoS 上均达到当时最优或可比性能

#### 🔬 深入细节
##### 核心框架图

![2D-TAN 框架总览](https://ar5iv.labs.arxiv.org/html/1912.03590v2/assets/x2.png)
*图：2D-TAN 整体框架。视频被切分为 N 个片段并提取特征，所有起止组合构成 2D 时序特征图；语言查询经 LSTM 编码后与视频特征逐元素相乘融合；融合后的 2D 图经多层卷积建模邻接关系，最终输出每个候选时刻的匹配分数。*

![1D 与 2D 时序图对比](https://ar5iv.labs.arxiv.org/html/1912.03590v2/assets/x1.png)
*图：传统方法将候选时刻排成一维序列独立评分（左），2D-TAN 将其组织为二维矩阵（右），使相邻时刻在空间上也相邻，便于卷积建模上下文。*

##### 算法伪代码

```python
# 2D-TAN 核心流程伪代码
def TwoDTAN(video_clips, query_sentence):
    # Step 1: 语言编码
    word_embs = GloVe(query_sentence)           # [l_S, d_S]
    f_S = LSTM_3layer(word_embs)                 # [d_S], 取最后隐状态

    # Step 2: 视频片段特征提取
    clip_feats = []
    for clip in sample_N_clips(video_clips, N):
        feat = pretrained_CNN(clip)              # VGG / C3D
        feat = FC(feat, d_V)                     # 降维到 d_V
        clip_feats.append(feat)                  # [N, d_V]

    # Step 3: 构建 2D 时序特征图 (上三角有效)
    map_2d = zeros(N, N, d_V)
    for i in range(N):
        for j in range(i, N):                    # 仅上三角: 起始 <= 结束
            map_2d[i, j] = max_pool(clip_feats[i:j+1])

    # Step 4: 多模态融合 (Hadamard 乘积)
    f_S_expanded = f_S.expand(N, N, d_V)         # 广播到 2D 图尺寸
    fused_map = map_2d * f_S_expanded            # 逐元素相乘

    # Step 5: 2D 卷积上下文建模
    for layer in Conv2D_layers(L_layers, kernel=K):
        fused_map = ReLU(layer(fused_map))

    # Step 6: 预测匹配分数
    scores = FC(fused_map, 1).sigmoid()          # 每个 (i,j) 一个分数

    # 推理时: NMS 后取 top-n
    return NMS(scores, threshold=0.5)
```

##### 方法详解

**动机与背景**

自然语言视频时刻定位（Moment Localization with Natural Language）的目标是：给定一段未裁剪视频和一句自然语言查询，检索出视频中与查询语义匹配的时间片段。此前的方法主要有两类思路：

1. **滑动窗口方法**（如 MCN、CTRL）：预先生成大量候选时刻，逐一与查询匹配打分。这类方法将每个候选独立评估，忽略了候选之间的时序关系。
2. **序列化方法**（如 TGN）：用 RNN 沿时间轴逐步预测边界，但一维序列难以同时捕捉不同尺度的时序依赖。

> 💡 **关键洞察**：相邻的候选时刻（例如 "第 2-5 秒" 和 "第 3-6 秒"）在语义上高度相关。如果一个候选是正确答案，其邻近候选的分数也应较高。传统方法独立评分无法利用这种结构化先验。

**核心机制：二维时序特征图**

2D-TAN 的核心创新在于将所有候选时刻组织为一个二维矩阵。具体地，将视频均匀采样为 \(N\) 个片段后，任意一个候选时刻可以用起始片段索引 \(i\) 和结束片段索引 \(j\)（\(i \leq j\)）来表示。这样，所有 \(\frac{N(N+1)}{2}\) 个有效候选恰好填充一个 \(N \times N\) 上三角矩阵。

每个位置 \((i, j)\) 的特征通过对第 \(i\) 到第 \(j\) 个片段特征做 max-pooling 得到：

$$\mathbf{f}_{i,j}^{M} = \text{maxpool}(\mathbf{f}_i^V, \mathbf{f}_{i+1}^V, \ldots, \mathbf{f}_j^V)$$

这种设计的精妙之处在于：**在 2D 图上空间相邻的位置，对应的时间段也是时序相邻的**。例如 \((i, j)\) 的右邻 \((i, j+1)\) 表示结束时刻后移一步，下邻 \((i+1, j)\) 表示起始时刻后移一步。这使得标准的 2D 卷积可以自然地建模时序邻接关系。

**多模态融合**

语言查询经 GloVe 词嵌入后送入三层 LSTM，取最后一个隐状态作为句子表示 \(\mathbf{f}^S \in \mathbb{R}^{d_S}\)。融合采用简单的 Hadamard 乘积（逐元素相乘）：

$$\mathbf{F}_{i,j} = \mathbf{f}^S \odot \mathbf{f}_{i,j}^M$$

论文在消融实验中对比了三种融合方式：拼接（Concatenation）、逐元素加法（Addition）和 Hadamard 乘积，发现 **Hadamard 乘积效果最好**。直觉上，乘法融合相当于让语言特征对视频特征的每个维度进行"门控"，能更精确地筛选与查询相关的视觉信息。

**二维卷积上下文建模**

融合后的 2D 特征图经过 \(L\) 层卷积（kernel size 为 \(K\)），每层后接 ReLU 激活：

$$\mathbf{F}^{(l+1)} = \text{ReLU}(\text{Conv2D}(\mathbf{F}^{(l)}))$$

随着层数增加，每个位置的感受野逐渐扩大，能够感知更远的时序邻居。消融实验表明：**感受野大小是性能的关键因素**——当 kernel=1（无邻居信息）时退化为独立评分，性能与 CTRL 相当；增大感受野后性能显著提升，但饱和后继续增大收益有限。

> ⚠️ **注意**：在固定感受野大小的前提下，改变层数和 kernel size 的具体组合对性能影响有限，说明关键在于感受野覆盖范围而非网络深度本身。

**稀疏采样策略**

完整的 2D 图包含 \(\frac{N(N+1)}{2}\) 个候选，其中存在大量高度重叠的冗余候选。2D-TAN 提出稀疏采样：仅保留起止索引间隔为固定步长倍数的候选，可减少约 50% 的计算量。实验表明稀疏采样与密集枚举性能相当。

**训练：Scaled IoU 监督**

传统方法用硬阈值将候选标记为正/负样本。2D-TAN 采用更平滑的 Scaled IoU 作为连续标签：

$$y_i = \begin{cases} 0 & \text{IoU}_i \leq t_{min} \\ \frac{\text{IoU}_i - t_{min}}{t_{max} - t_{min}} & t_{min} < \text{IoU}_i < t_{max} \\ 1 & \text{IoU}_i \geq t_{max} \end{cases}$$

其中 \(t_{min}\) 和 \(t_{max}\) 为缩放阈值（Charades-STA 和 ActivityNet 上设为 0.5/1.0，TACoS 上设为 0.3/0.7）。训练损失为标准 BCE：

$$\mathcal{L} = \frac{1}{C} \sum_{i=1}^{C} y_i \log p_i + (1 - y_i) \log(1 - p_i)$$

这种设计让模型学会区分"高度匹配"和"部分匹配"的候选，而非简单的二分类。

**推理流程**

推理时，对 2D 图中所有有效位置的预测分数应用非极大值抑制（NMS，阈值 0.5），取 top-n 作为最终检索结果。

**与传统方法的对比**

| 特性 | 滑动窗口方法 (CTRL等) | RNN方法 (TGN等) | **2D-TAN** |
|------|----------------------|-----------------|------------|
| 候选组织方式 | 一维列表 | 序列化 | **二维矩阵** |
| 候选间关系建模 | ❌ 独立评分 | 部分（单向） | ✅ 2D卷积全局建模 |
| 多尺度覆盖 | 需多尺度窗口 | 隐式 | **天然覆盖所有尺度** |
| 计算效率 | 候选数多 | 序列瓶颈 | **稀疏采样 + 并行卷积** |

**实验结果亮点**

- 在 Charades-STA 上 Rank1@0.7 达到 **23.31%**，大幅超越此前最优 MAN 的 20.54%
- 在 ActivityNet Captions 上 Rank1@0.5 达到 **44.51%**，超越 CMIN 的 43.40%
- 仅用 136 个候选（N=16）即可达到 CMIN（1400 个候选）的可比性能，验证了上下文建模的有效性

#### 🧪 练习题
```yaml
question: "2D-TAN 中二维时序特征图的位置 (i, j) 代表什么含义？"
options:
  - "第 i 帧和第 j 帧的视觉相似度"
  - "从第 i 个片段到第 j 个片段的候选时刻特征"
  - "第 i 个词和第 j 个视频片段的跨模态注意力权重"
  - "视频第 i 秒到第 j 秒的光流特征"
answer: 1
explain: "2D 时序图的每个上三角位置 (i, j) 对应一个从第 i 个视频片段到第 j 个片段的候选时刻，其特征由对应片段特征的 max-pooling 得到。"
```

### VSLNet

```yaml
id: vslnet
num: 15
name: VSLNet
full_name: 视频跨度网络 (Video Span Localizing Network)
year: '2020'
org: NTU
parent: tall
paper_url: https://aclanthology.org/2020.acl-main.585/
project_url: ''
category: grounding
motivation: 跨度预测与查询高亮机制
```

#### 📝 一句话总结
VSLNet 的核心目标是：跨度预测与查询高亮机制。

#### 🎯 核心要点
- 核心动机：跨度预测与查询高亮机制
- 演化来源：继承或改进自 tall
- 代表机构：NTU

#### 🔬 深入细节
跨度预测与查询高亮机制


### Moment-DETR

```yaml
id: moment_detr
num: 16
name: Moment-DETR
full_name: 时刻检测Transformer (Moment Detection Transformer)
year: '2021'
org: UNC
parent: vslnet
paper_url: https://proceedings.neurips.cc/paper/2021/hash/62e0973455fd26eb03e91d5741a4a3bb-Abstract.html
project_url: ''
category: grounding
motivation: 端到端Transformer定位
```

#### 📝 一句话总结
Moment-DETR 的核心目标是：端到端Transformer定位。

#### 🎯 核心要点
- 核心动机：端到端Transformer定位
- 演化来源：继承或改进自 vslnet
- 代表机构：UNC

#### 🔬 深入细节
端到端Transformer定位


### UniVTG

```yaml
id: univtg
num: 17
name: UniVTG
full_name: 统一时序定位 (Unified VTG)
year: '2023'
org: Tsinghua
parent: moment_detr
paper_url: http://openaccess.thecvf.com/content/ICCV2023/html/Lin_UniVTG_Towards_Unified_Video-Language_Temporal_Grounding_ICCV_2023_paper.html
project_url: ''
category: grounding
motivation: 统一时刻检索与高亮检测
```

#### 📝 一句话总结
UniVTG 的核心目标是：统一时刻检索与高亮检测。

#### 🎯 核心要点
- 核心动机：统一时刻检索与高亮检测
- 演化来源：继承或改进自 moment_detr
- 代表机构：Tsinghua

#### 🔬 深入细节
统一时刻检索与高亮检测


### MQVTG

```yaml
id: mqvtg
num: 18
name: MQVTG
full_name: 时刻量化定位 (Moment Quantization VTG)
year: '2025'
org: CAS
parent: univtg
paper_url: https://openaccess.thecvf.com/content/ICCV2025/html/Sun_Moment_Quantization_for_Video_Temporal_Grounding_ICCV_2025_paper.html
project_url: ''
category: grounding
motivation: 量化机制提升定位精度
```

#### 📝 一句话总结
MQVTG 的核心目标是：量化机制提升定位精度。

#### 🎯 核心要点
- 核心动机：量化机制提升定位精度
- 演化来源：继承或改进自 univtg
- 代表机构：CAS

#### 🔬 深入细节
量化机制提升定位精度


### DSNet

```yaml
id: dsnet
num: 19
name: DSNet
full_name: 检测摘要网络 (Detect-to-Summarize)
year: '2020'
org: —
parent: —
paper_url: https://ieeexplore.ieee.org/abstract/document/9275314/
project_url: ''
category: video_llm
motivation: 时序提案机制做视频摘要
```

#### 📝 一句话总结
DSNet 的核心目标是：时序提案机制做视频摘要。

#### 🎯 核心要点
- 核心动机：时序提案机制做视频摘要
- 代表机构：—

#### 🔬 深入细节
时序提案机制做视频摘要


### Video-ChatGPT

```yaml
id: video_chatgpt
num: 20
name: Video-ChatGPT
full_name: 视频对话模型 (Video-ChatGPT)
year: '2023'
org: MBZUAI
parent: clip4clip
paper_url: https://arxiv.org/abs/2306.05424
project_url: ''
category: video_llm
motivation: 开启视频对话微调范式
```

#### 📝 一句话总结
Video-ChatGPT 的核心目标是：开启视频对话微调范式。

#### 🎯 核心要点
- 核心动机：开启视频对话微调范式
- 演化来源：继承或改进自 clip4clip
- 代表机构：MBZUAI

#### 🔬 深入细节
开启视频对话微调范式


### VideoLLaMA

```yaml
id: videollama
num: 21
name: VideoLLaMA
full_name: 视频大模型 (VideoLLaMA)
year: '2023'
org: Alibaba
parent: video_chatgpt
paper_url: https://arxiv.org/abs/2306.02858
project_url: ''
category: video_llm
motivation: 视觉-音频联合理解
```

#### 📝 一句话总结
VideoLLaMA 的核心目标是：视觉-音频联合理解。

#### 🎯 核心要点
- 核心动机：视觉-音频联合理解
- 演化来源：继承或改进自 video_chatgpt
- 代表机构：Alibaba

#### 🔬 深入细节
视觉-音频联合理解


### LLaVA-Video

```yaml
id: llava_video
num: 22
name: LLaVA-Video
full_name: 视频指令模型 (LLaVA-Video)
year: '2024'
org: ByteDance
parent: videollama
paper_url: https://arxiv.org/abs/2410.02713
project_url: ''
category: video_llm
motivation: 大规模合成数据提升性能
```

#### 📝 一句话总结
LLaVA-Video 的核心目标是：大规模合成数据提升性能。

#### 🎯 核心要点
- 核心动机：大规模合成数据提升性能
- 演化来源：继承或改进自 videollama
- 代表机构：ByteDance

#### 🔬 深入细节
大规模合成数据提升性能


### InternVideo2

```yaml
id: internvideo2
num: 23
name: InternVideo2
full_name: 视频基础模型 (InternVideo2)
year: '2024'
org: Shanghai AI Lab
parent: llava_video
paper_url: https://arxiv.org/abs/2403.15377
project_url: ''
category: video_llm
motivation: 大规模缩放增强多模态对齐
```

#### 📝 一句话总结
InternVideo2 的核心目标是：大规模缩放增强多模态对齐。

#### 🎯 核心要点
- 核心动机：大规模缩放增强多模态对齐
- 演化来源：继承或改进自 llava_video
- 代表机构：Shanghai AI Lab

#### 🔬 深入细节
大规模缩放增强多模态对齐


### VideoLLaMA 3

```yaml
id: videollama3
num: 24
name: VideoLLaMA 3
full_name: 视觉中心架构 (VideoLLaMA 3)
year: '2025'
org: Alibaba
parent: videollama
paper_url: https://github.com/DAMO-NLP-SG/VideoLLaMA3
project_url: ''
category: video_llm
motivation: 动态分辨率视觉编码
```

#### 📝 一句话总结
VideoLLaMA 3 的核心目标是：动态分辨率视觉编码。

#### 🎯 核心要点
- 核心动机：动态分辨率视觉编码
- 演化来源：继承或改进自 videollama
- 代表机构：Alibaba

#### 🔬 深入细节
动态分辨率视觉编码


### HMT

```yaml
id: hmt
num: 25
name: HMT
full_name: 层次多模态Transformer (Hierarchical Multimodal Transformer)
year: '2022'
org: —
parent: dsnet
paper_url: https://www.sciencedirect.com/science/article/pii/S0925231221015253
project_url: ''
category: frontier_2026
motivation: 层次化融合视觉与音频
```

#### 📝 一句话总结
HMT 的核心目标是：层次化融合视觉与音频。

#### 🎯 核心要点
- 核心动机：层次化融合视觉与音频
- 演化来源：继承或改进自 dsnet
- 代表机构：—

#### 🔬 深入细节
层次化融合视觉与音频


### LVSum

```yaml
id: lvsum
num: 26
name: LVSum
full_name: 长视频摘要基准 (Long Video Summarization)
year: '2026'
org: —
parent: hmt
paper_url: https://arxiv.org/abs/2604.10024
project_url: ''
category: frontier_2026
motivation: 时间戳感知长视频摘要
```

#### 📝 一句话总结
LVSum 的核心目标是：时间戳感知长视频摘要。

#### 🎯 核心要点
- 核心动机：时间戳感知长视频摘要
- 演化来源：继承或改进自 hmt
- 代表机构：—

#### 🔬 深入细节
时间戳感知长视频摘要


### HiTeA

```yaml
id: hitea
num: 27
name: HiTeA
full_name: 层次时序对齐 (Hierarchical Temporal Alignment)
year: '2026'
org: ICLR
parent: univtg
paper_url: https://iclr.cc/virtual/2026/poster/HiTeA
project_url: ''
category: frontier_2026
motivation: 无需训练的层次化定位框架
```

#### 📝 一句话总结
HiTeA 的核心目标是：无需训练的层次化定位框架。

#### 🎯 核心要点
- 核心动机：无需训练的层次化定位框架
- 演化来源：继承或改进自 univtg
- 代表机构：ICLR

#### 🔬 深入细节
无需训练的层次化定位框架


### UniTime

```yaml
id: unitime
num: 28
name: UniTime
full_name: 通用时序定位 (Universal Video Temporal Grounding)
year: '2026'
org: NeurIPS
parent: moment_detr
paper_url: https://nips.cc/virtual/2025/poster/UniTime
project_url: ''
category: frontier_2026
motivation: 时间戳token实现零样本泛化
```

#### 📝 一句话总结
UniTime 的核心目标是：时间戳token实现零样本泛化。

#### 🎯 核心要点
- 核心动机：时间戳token实现零样本泛化
- 演化来源：继承或改进自 moment_detr
- 代表机构：NeurIPS

#### 🔬 深入细节
时间戳token实现零样本泛化


### MarkIt

```yaml
id: markit
num: 29
name: MarkIt
full_name: 显式视觉线索定位 (Explicit Visual Cues for Grounding)
year: '2026'
org: CVPR
parent: llava_video
paper_url: https://www.researchgate.net/publication/380000000
project_url: ''
category: frontier_2026
motivation: 帧内嵌入语义标记增强定位
```

#### 📝 一句话总结
MarkIt 的核心目标是：帧内嵌入语义标记增强定位。

#### 🎯 核心要点
- 核心动机：帧内嵌入语义标记增强定位
- 演化来源：继承或改进自 llava_video
- 代表机构：CVPR

#### 🔬 深入细节
帧内嵌入语义标记增强定位


### Universal VTG MLLM

```yaml
id: universal_vtg_mllm
num: 30
name: Universal VTG MLLM
full_name: 通用时序定位大模型 (Universal VTG with Generative MLLM)
year: '2026'
org: NeurIPS
parent: internvideo2
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/5d2e24df9cfaad3189833b819c40b392-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 生成式大模型实现通用定位
```

#### 📝 一句话总结
Universal VTG MLLM 的核心目标是：生成式大模型实现通用定位。

#### 🎯 核心要点
- 核心动机：生成式大模型实现通用定位
- 演化来源：继承或改进自 internvideo2
- 代表机构：NeurIPS

#### 🔬 深入细节
生成式大模型实现通用定位


### Qwen3.5

```yaml
id: qwen35
num: 31
name: Qwen3.5
full_name: 通义千问3.5视频版 (Qwen3.5-122B-A10B)
year: '2026'
org: Alibaba
parent: videollama3
paper_url: https://llm-stats.com/benchmarks/mlvu
project_url: ''
category: frontier_2026
motivation: 原生多模态支持2小时视频
```

#### 📝 一句话总结
Qwen3.5 的核心目标是：原生多模态支持2小时视频。

#### 🎯 核心要点
- 核心动机：原生多模态支持2小时视频
- 演化来源：继承或改进自 videollama3
- 代表机构：Alibaba

#### 🔬 深入细节
原生多模态支持2小时视频


### Gemini 3 Pro

```yaml
id: gemini3pro
num: 32
name: Gemini 3 Pro
full_name: Gemini 3专业版 (Gemini 3 Pro)
year: '2026'
org: Google
parent: internvideo2
paper_url: https://deepmind.google/technologies/gemini/
project_url: ''
category: frontier_2026
motivation: 百万token超长上下文窗口
```

#### 📝 一句话总结
Gemini 3 Pro 的核心目标是：百万token超长上下文窗口。

#### 🎯 核心要点
- 核心动机：百万token超长上下文窗口
- 演化来源：继承或改进自 internvideo2
- 代表机构：Google

#### 🔬 深入细节
百万token超长上下文窗口
