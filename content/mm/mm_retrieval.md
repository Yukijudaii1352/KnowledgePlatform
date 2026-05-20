---
domain: multimodal
topic_id: mm_retrieval
topic_name: 多模态检索
page_icon: 🔍
page_title: 多模态检索算法总结
page_subtitle: '{build_date} 版'
page_desc: 从早期跨模态对齐到现代大规模预训练及高效向量检索的发展脉络，涵盖图文检索、向量数据库与ANN检索等核心技术方向。
hero_pills:
- 跨模态对齐
- 图文检索
- 向量数据库
- ANN检索
count_pill: '{count} 个算法'
categories:
  foundation:
    label: foundation
    color: '#7A5AF8'
  dual_encoder:
    label: dual_encoder
    color: '#22a06b'
  fusion_model:
    label: fusion_model
    color: '#0065FF'
  vector_ann:
    label: vector_ann
    color: '#FF8B00'
  frontier_2026:
    label: frontier_2026
    color: '#E34935'
image_base: ../../content/mm/mm_retrieval/assets/
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
- id: vse_pp
  x: 2018
  y: 1
  category: foundation
- id: scan
  x: 2018
  y: 1.5
  category: foundation
- id: oscar
  x: 2020
  y: 1.5
  category: foundation
- id: vilt
  x: 2021
  y: 1.5
  category: foundation
- id: clip
  x: 2021
  y: 2.5
  category: dual_encoder
- id: align
  x: 2021
  y: 2
  category: dual_encoder
- id: siglip
  x: 2023
  y: 2
  category: dual_encoder
- id: blip
  x: 2022
  y: 3
  category: fusion_model
- id: blip2
  x: 2023
  y: 3
  category: fusion_model
- id: imagebind
  x: 2023
  y: 3.5
  category: fusion_model
- id: pq
  x: 2010
  y: 4
  category: vector_ann
- id: hnsw
  x: 2016
  y: 4.5
  category: vector_ann
- id: ivf
  x: 2003
  y: 4
  category: vector_ann
- id: qwen3_vl_emb
  x: 2026
  y: 5
  category: frontier_2026
- id: retrv_r1
  x: 2026
  y: 5.5
  category: frontier_2026
- id: urag
  x: 2026
  y: 5.2
  category: frontier_2026
- id: unime_v2
  x: 2026
  y: 5.8
  category: frontier_2026
edges:
- from: scan
  to: oscar
  label: 对象锚点
- from: oscar
  to: vilt
  label: 纯Transformer
- from: clip
  to: align
  label: 噪声数据
- from: clip
  to: siglip
  label: Sigmoid损失
- from: clip
  to: blip
  label: CapFilt
- from: blip
  to: blip2
  label: Q-Former
- from: clip
  to: imagebind
  label: 多模态扩展
- from: pq
  to: ivf
  label: 倒排索引
- from: blip2
  to: qwen3_vl_emb
  label: 统一框架
- from: clip
  to: retrv_r1
  label: 推理驱动
- from: blip2
  to: urag
  label: 检索生成
- from: imagebind
  to: unime_v2
  label: MLLM标注
milestones:
- clip
- hnsw
- retrv_r1
```

## 核心算法

### VSE++

```yaml
id: vse_pp
num: 1
name: VSE++
full_name: 视觉语义嵌入改进版 (VSE++)
year: '2018'
org: U Toronto
parent: —
paper_url: https://arxiv.org/abs/1707.05612
project_url: ''
category: foundation
motivation: 困难负样本挖掘增强区分能力
```

#### 📝 一句话总结
VSE++ 的核心目标是：困难负样本挖掘增强区分能力。

#### 🎯 核心要点
- 核心动机：困难负样本挖掘增强区分能力
- 代表机构：U Toronto

#### 🔬 深入细节
困难负样本挖掘增强区分能力


### SCAN

```yaml
id: scan
num: 2
name: SCAN
full_name: 堆叠交叉注意力 (Stacked Cross Attention)
year: '2018'
org: Microsoft
parent: —
paper_url: http://openaccess.thecvf.com/content_ECCV_2018/html/Kuang-Huei_Lee_Stacked_Cross_Attention_ECCV_2018_paper.html
project_url: ''
category: foundation
motivation: 细粒度图像区域与文本对齐
```

#### 📝 一句话总结
SCAN 提出堆叠交叉注意力机制（Stacked Cross Attention），通过两阶段注意力推断图像区域与句子词语之间的潜在细粒度对应关系，在不依赖显式对齐标注的情况下实现了图文跨模态检索的 SOTA 性能，在 Flickr30K 和 MS-COCO 上大幅超越此前方法。

#### 🎯 核心要点
- **堆叠交叉注意力（SCA）**：两阶段注意力机制——第一阶段计算跨模态注意力权重，第二阶段基于注意力加权特征评估区域/词语重要性
- **两种对称变体**：Image-Text（以图像区域为查询注意文本词语）和 Text-Image（以词语为查询注意图像区域），捕获不同方面的对齐信息
- **两种聚合策略**：LogSumExp（LSE）池化关注最难对齐片段，Average（AVG）池化关注全局对齐，可组合使用
- **底层注意力（Bottom-Up Attention）**：使用 Faster R-CNN 提取 36 个显著目标区域特征作为图像表示，替代传统网格特征
- **硬负样本三元组损失**：在 mini-batch 中选取最难负样本进行训练，提升判别能力
- **模型集成**：不同变体（t-i/i-t × AVG/LSE）捕获数据不同方面，集成后进一步提升性能
- **可解释性**：注意力权重可视化直观展示模型学到的区域-词语对应关系

#### 🔬 深入细节
##### 核心架构示意图

![SCAN Image-Text Stacked Cross Attention](https://ar5iv.labs.arxiv.org/html/1803.08024v1/assets/x1.png)
*图：Image-Text 堆叠交叉注意力示意。第一阶段对每个图像区域计算其对句子各词语的注意力，得到加权文本特征；第二阶段通过比较区域特征与其对应文本特征的相似度，确定各区域的重要性权重。*

![SCAN Text-Image Stacked Cross Attention](https://ar5iv.labs.arxiv.org/html/1803.08024v1/assets/x2.png)
*图：Text-Image 堆叠交叉注意力示意。方向相反——第一阶段对每个词语计算其对图像各区域的注意力，第二阶段评估各词语的重要性。*

##### 算法伪代码

```python
# SCAN 核心算法伪代码
def scan_similarity(V, E, mode="image-text", pool="avg"):
    """
    V: 图像区域特征 [k, D]  (Faster R-CNN 提取的 k=36 个区域)
    E: 句子词语特征 [n, D]  (bi-GRU 编码的 n 个词)
    """
    # Step 0: 计算跨模态余弦相似度矩阵
    cos_sim = cosine(V, E)  # [k, n]
    
    if mode == "image-text":
        # === Image-Text: 以图像区域为查询 ===
        # Stage 1: 对每个区域 v_i, 注意句子中的词语
        # 阈值归一化: 将负值截断为0
        cos_sim_clamp = clamp(cos_sim, min=0)  # [ReLU]
        alpha = softmax(lambda_1 * cos_sim_clamp, dim=1)  # [k, n] 对词语维度
        a_t = alpha @ E  # [k, D] 每个区域对应的加权文本特征
        
        # Stage 2: 评估每个区域的重要性
        R = cosine(V, a_t)  # [k] 每个区域与其文本对应的相似度
        
    elif mode == "text-image":
        # === Text-Image: 以词语为查询 ===
        cos_sim_clamp = clamp(cos_sim, min=0)
        beta = softmax(lambda_2 * cos_sim_clamp, dim=0)  # [k, n] 对区域维度
        a_v = beta.T @ V  # [n, D] 每个词语对应的加权图像特征
        
        R = cosine(E, a_v)  # [n] 每个词语与其图像对应的相似度
    
    # 最终聚合: 将所有片段相似度汇总为全局相似度
    if pool == "avg":
        S = mean(R)
    elif pool == "lse":
        S = log(mean(exp(lambda * R)))  # LogSumExp
    
    return S

# 训练: 硬负样本三元组损失
def triplet_loss_hard(I, T, margin=0.2):
    S_pos = scan_similarity(I, T)
    T_hard_neg = argmax_{T' != T} scan_similarity(I, T')  # 最难负文本
    I_hard_neg = argmax_{I' != I} scan_similarity(I', T)  # 最难负图像
    loss = max(0, margin - S_pos + scan_similarity(I, T_hard_neg)) \
         + max(0, margin - S_pos + scan_similarity(I_hard_neg, T))
    return loss
```

##### 动机与背景

传统的图文跨模态检索方法（如 VSE++、Order Embeddings）将整张图像和整个句子分别编码为单一的全局向量，然后在联合嵌入空间中计算相似度。这种方法存在一个根本性缺陷：**它忽略了图像区域与句子词语之间的细粒度对应关系**。

> 💡 关键直觉：当人们描述一张图片时，句子中的每个词语通常对应图像中的某个特定区域——"狗"对应图中的狗、"红色"对应某个物体的颜色属性。这种对应关系是潜在的（latent），没有显式标注，但对准确理解图文关系至关重要。

SCAN 的核心思想是：**不直接比较全局表示，而是先推断图像区域与词语之间的潜在对齐，再基于对齐结果计算整体相似度**。

##### 核心机制：堆叠交叉注意力

SCAN 的"堆叠"体现在两阶段串联的注意力计算：

**第一阶段——跨模态注意力对齐：** 给定图像区域特征 \(V = \{v_1, ..., v_k\}\) 和词语特征 \(E = \{e_1, ..., e_n\}\)，首先计算所有区域-词语对的余弦相似度矩阵。以 Image-Text 变体为例，对每个图像区域 \(v_i\)，通过 softmax 归一化得到其对各词语的注意力权重：

$$\alpha_{i,j} = \frac{\exp(\lambda_1 [\cos(v_i, e_j)]_+)}{\sum_{j'=1}^{n} \exp(\lambda_1 [\cos(v_i, e_{j'})]_+)}$$

其中 \([\cdot]_+ = \max(\cdot, 0)\) 是阈值截断（CLAMP），将语义不相关的负相似度归零，防止噪声干扰。\(\lambda_1\) 是逆温度参数，控制注意力分布的尖锐程度。然后计算加权文本特征：

$$a_i^t = \sum_{j=1}^{n} \alpha_{i,j} \cdot e_j$$

> ⚠️ 注意：阈值归一化（CLAMP）是一个关键设计。论文消融实验表明，不使用 CLAMP 会导致性能显著下降，因为负相似度会引入语义无关的噪声。

**第二阶段——重要性评估：** 将每个区域 \(v_i\) 与其对应的加权文本特征 \(a_i^t\) 计算余弦相似度 \(R(v_i, a_i^t)\)，得到该区域的"对齐质量分数"。直觉上，如果一个区域能在文本中找到高度匹配的语义对应，其分数就高。

**最终聚合：** 将所有片段的对齐分数聚合为全局图文相似度。论文提出两种池化策略：

$$S_{AVG}(I, T) = \frac{1}{k} \sum_{i=1}^{k} R(v_i, a_i^t) \quad \text{(平均池化)}$$

$$S_{LSE}(I, T) = \log\left(\sum_{i=1}^{k} \frac{\exp(\lambda_2 \cdot R(v_i, a_i^t))}{k}\right)^{1/\lambda_2} \quad \text{(LogSumExp 池化)}$$

AVG 池化平等对待所有区域，关注全局一致性；LSE 池化是 max 的平滑近似，更关注最匹配的区域片段——类似于"只要有一个区域高度匹配，就认为整体相似"。

##### 对称变体与模型集成

SCAN 提出两种对称的注意力方向：

| 变体 | 第一阶段查询 | 第一阶段键 | 第二阶段评估 |
|------|------------|-----------|------------|
| **Image-Text (i-t)** | 图像区域 \(v_i\) | 词语 \(e_j\) | 区域重要性 |
| **Text-Image (t-i)** | 词语 \(e_j\) | 图像区域 \(v_i\) | 词语重要性 |

两种变体捕获不同方面的对齐信息。论文发现将不同变体的预测相似度取平均进行集成（如 t-i AVG + i-t LSE）能进一步提升性能，这表明它们具有互补性。

##### 图像与文本表示

- **图像端**：采用 Anderson et al. 提出的 Bottom-Up Attention，即使用在 Visual Genome 上预训练的 Faster R-CNN 检测图像中的显著区域（默认 36 个 ROI），提取每个区域的 2048 维特征，经线性变换映射到 1024 维联合空间。
- **文本端**：词语先通过 300 维词嵌入，再经双向 GRU 编码，取各时间步的隐状态作为词语特征（1024 维）。

##### 训练策略

采用硬负样本三元组损失（Hard Negative Triplet Loss）。对于正样本对 \((I, T)\)，在 mini-batch 中选取最难的负样本：

$$\hat{T}_h = \arg\max_{d \neq T} S(I, d), \quad \hat{I}_h = \arg\max_{m \neq I} S(m, T)$$

$$\mathcal{L}_{hard}(I, T) = [\alpha - S(I, T) + S(I, \hat{T}_h)]_+ + [\alpha - S(I, T) + S(\hat{I}_h, T)]_+$$

其中 \(\alpha = 0.2\) 为间隔超参数。使用 Adam 优化器，学习率分阶段衰减。

##### 实验结果

SCAN 在 Flickr30K 和 MS-COCO 两个基准上全面超越此前 SOTA：

| 数据集 | 指标 | 此前 SOTA | SCAN (最佳单模型) | SCAN (集成) | 相对提升 |
|--------|------|----------|-----------------|------------|---------|
| Flickr30K | 句子检索 R@1 | 55.6 (DPC) | 67.9 (i-t AVG) | 67.4 | +22.1% |
| Flickr30K | 图像检索 R@1 | 41.1 (SCO) | 45.8 (t-i AVG) | 48.6 | +18.2% |
| MS-COCO 1K | 句子检索 R@1 | 69.9 (SCO) | 72.7 (t-i AVG) | 74.8 | +7.0% |
| MS-COCO 5K | 句子检索 R@1 | 42.8 (SCO) | 50.4 (t-i AVG) | 51.4 | +17.8% |

> 💡 关键发现：消融实验证实了几个重要设计选择的有效性：(1) 堆叠交叉注意力本身是性能提升的核心来源；(2) CLAMP 阈值归一化至关重要；(3) 不同的池化策略和注意力方向具有互补性。

#### 🧪 练习题
```yaml
question: "SCAN 中堆叠交叉注意力的第一阶段（以 Image-Text 变体为例）的作用是什么？"
options:
  - "直接计算图像和句子的全局相似度"
  - "对每个图像区域，通过注意力机制找到其在句子中最相关的词语语义表示"
  - "使用 Faster R-CNN 检测图像中的显著区域"
  - "通过 GRU 编码句子中每个词语的上下文特征"
answer: 1
explain: "第一阶段的核心是跨模态注意力对齐：对每个图像区域 v_i，计算其对所有词语的注意力权重，加权求和得到该区域对应的文本语义表示 a_i^t，从而建立区域-词语的软对齐关系。"
```

### OSCAR

```yaml
id: oscar
num: 3
name: OSCAR
full_name: 对象语义对齐预训练 (OSCAR)
year: '2020'
org: Microsoft
parent: scan
paper_url: https://arxiv.org/abs/2004.06165
project_url: ''
category: foundation
motivation: 对象标签作为跨模态对齐锚点
```

#### 📝 一句话总结
OSCAR 提出将图像中检测到的**对象标签**（object tags）作为锚点引入视觉-语言预训练的输入三元组，以显式桥接视觉区域特征与文本语义空间，显著缓解了跨模态对齐的弱监督难题，在 6 项 V+L 理解与生成任务上取得了当时的 SOTA。

#### 🎯 核心要点
- **输入三元组表示**：将传统 VLP 的 \((w, v)\) 二元输入扩展为 \((w, q, v)\) 三元组，其中 \(w\) 为文本词嵌入、\(q\) 为对象标签词嵌入、\(v\) 为图像区域特征
- **对象标签作为锚点**：利用 Faster R-CNN 检测的高精度对象标签，在语言语义空间中天然与文本词汇共享表示，从而为视觉-语言对齐提供显式锚点
- **双视角预训练目标**：
- **字典视角（Masked Token Loss）**：对文本词和对象标签联合做 15% 随机掩码预测
- **模态视角（Contrastive Loss）**：以 50% 概率替换对象标签序列构造负样本，训练二分类器判别图文匹配
- **预训练语料**：基于 COCO、Conceptual Captions、SBU、Flickr30k、GQA 等构建 6.5M 图文三元组
- **两种模型规模**：Oscar\_B（BERT-base, H=768）和 Oscar\_L（BERT-large, H=1024），均以 BERT 参数初始化
- **下游任务 SOTA**：在 VQA、GQA、Image-Text Retrieval、Image Captioning、NoCaps、NLVR2 等 6+ 项任务上刷新纪录

#### 🔬 深入细节
##### 核心架构示意图

![OSCAR Pipeline 总览](https://ar5iv.labs.arxiv.org/html/2004.06165/assets/x1.png)
*图 1：OSCAR 流程总览。模型以三元组 [word tokens, object tags, region features] 为输入，使用 Masked Token Loss 和 Contrastive Loss 进行预训练，并在 5 项理解任务和 2 项生成任务上微调。*

![OSCAR 架构详图](https://ar5iv.labs.arxiv.org/html/2004.06165/assets/x5.png)
*图 3：OSCAR 架构详图。输入三元组可从两个视角理解——模态视角（Modality View）将 \(q\) 归入图像侧，字典视角（Dictionary View）将 \(q\) 归入语言侧。对象标签 \(q\) 同时存在于两个视角中，起到跨模态桥梁作用。*

##### 算法伪代码

```python
# OSCAR 预训练伪代码
# 输入: 图文对数据集 D, 预训练好的 BERT 参数 θ_BERT, Faster R-CNN 检测器

for (image, text) in D:
    # Step 1: 提取视觉特征
    regions, tags = FasterRCNN(image)         # v'∈R^{K×2048}, tags=[dog, couch, ...]
    v = LinearProject(concat(regions, positions))  # v∈R^{K×H}
    q = BERTWordEmbed(tags)                   # 对象标签的词嵌入
    w = BERTWordEmbed(text)                   # 文本的词嵌入

    # Step 2: 构造输入三元组
    # 字典视角: h = [w, q] (语言空间), v (视觉空间)
    # 模态视角: w (语言模态), h' = [q, v] (图像模态)

    # Step 3: Masked Token Loss (字典视角)
    h = concat(w, q)
    h_masked = random_mask(h, prob=0.15)      # 15% token 替换为 [MASK]
    loss_mtl = -log P(h_i | h_\i, v)         # 基于上下文+图像预测被掩码 token

    # Step 4: Contrastive Loss (模态视角)
    if random() < 0.5:
        q_polluted = sample_random_tags(D)    # 50% 概率替换为随机标签
        y = 0                                  # 负样本
    else:
        q_polluted = q
        y = 1                                  # 正样本
    h_prime = concat(q_polluted, v)
    cls_repr = Transformer([w, h_prime])[CLS]  # [CLS] 融合表示
    loss_c = -log P(y | FC(cls_repr))          # 二分类损失

    # Step 5: 联合优化
    loss = loss_mtl + loss_c
    optimizer.step(loss)
```

##### 动机与背景

现有视觉-语言预训练（VLP）方法（如 ViLBERT、LXMERT、UNITER 等）将图像区域特征 \(v\) 与文本词嵌入 \(w\) 简单拼接后送入 Transformer，依赖自注意力机制以"暴力"方式学习跨模态对齐。然而，这种方式面临两个核心挑战：

1. **语义空间不对齐**：视觉区域特征和文本词嵌入分别处于不同的语义空间，模型需要从零学习跨空间映射；
2. **缺乏显式锚定**：没有标注哪些区域对应哪些词汇，VLP 本质上是弱监督学习，且视觉区域通常过采样、含噪声和歧义。

OSCAR 的关键洞察是：**图像中的显著对象可以被现代目标检测器准确识别，且这些对象往往在配对文本中被提及**。在 MS COCO 数据集上，49.7% 的图文对至少共享 1 个对象，22.2% 共享 2 个，12.9% 共享 3 个。因此，对象标签天然可作为视觉与语言之间的"锚点"。

##### 核心机制：三元组输入与双视角

OSCAR 的核心创新在于将输入从二元组 \((w, v)\) 扩展为三元组 \((w, q, v)\)，其中 \(q\) 是对象标签的词嵌入序列。这一设计的精妙之处在于 **\(q\) 同时属于两个模态**：

- 从**语义空间**角度，\(q\) 是文本词汇，与 \(w\) 共享 BERT 的语言语义空间，二者之间的对齐可以直接利用预训练 BERT 的语言理解能力；
- 从**信息来源**角度，\(q\) 来自图像的目标检测，与 \(v\) 共享视觉信息来源。

> 💡 **关键直觉**：对象标签 \(q\) 像一座桥梁——它在语言空间中与文本 \(w\) 天然可比较（因为都是词），同时在信息来源上与视觉特征 \(v\) 紧密关联（因为来自同一张图）。这使得模型无需从零学习跨模态映射，而是通过 \(q\) 这个"中间人"大幅降低对齐难度。

形式化地，输入三元组可从两个视角解读：

$$\boldsymbol{x} \triangleq [\underbrace{\boldsymbol{w}}_{\text{language}}, \underbrace{\boldsymbol{q}, \boldsymbol{v}}_{\text{image}}] = [\underbrace{\boldsymbol{w}, \boldsymbol{q}}_{\text{language}}, \underbrace{\boldsymbol{v}}_{\text{image}}] \triangleq \boldsymbol{x}'$$

##### 预训练目标详解

**1. Masked Token Loss（字典视角）**

从字典视角出发，将 \(w\) 和 \(q\) 视为同一语言空间中的离散 token 序列 \(h = [w, q]\)，对其进行 15% 的随机掩码，利用上下文 token 和图像区域特征 \(v\) 来预测被掩码的 token：

$$\mathcal{L}_{\text{MTL}} = -\mathbb{E}_{(v, h) \sim \mathcal{D}} \log p(h_i | h_{\backslash i}, v)$$

> ⚠️ **注意**：与标准 BERT MLM 不同，这里的掩码范围包括对象标签 \(q\)，这意味着模型不仅需要理解语言上下文，还需要利用视觉信息来推断被掩码的对象名称，从而实现视觉接地（visual grounding）。

**2. Contrastive Loss（模态视角）**

从模态视角出发，将 \(h' = [q, v]\) 视为图像模态的表示，\(w\) 为语言模态。通过以 50% 概率将 \(q\) 替换为数据集中随机采样的标签序列来构造负样本，然后在 \([CLS]\) 位置的融合表示上训练一个二分类器：

$$\mathcal{L}_{\text{C}} = -\mathbb{E}_{(h', w) \sim \mathcal{D}} \log p(y | f(h', w))$$

其中 \(y=1\) 表示原始匹配对，\(y=0\) 表示被"污染"的对。这一损失迫使模型学习区分正确的图文对齐与错误的对齐。

**联合目标**：

$$\mathcal{L}_{\text{Pre-training}} = \mathcal{L}_{\text{MTL}} + \mathcal{L}_{\text{C}}$$

##### 视觉特征提取

OSCAR 使用 Faster R-CNN 提取每张图像 \(K\) 个区域的特征：
- 区域视觉特征 \(v' \in \mathbb{R}^{P}\)（\(P=2048\)）
- 区域位置编码 \(z \in \mathbb{R}^{R}\)（\(R=4\) 或 \(6\)，包含左上/右下坐标及宽高）
- 拼接后通过线性投影 \(\mathbf{W}\) 映射到与词嵌入相同的维度 \(H\)

同时，Faster R-CNN 输出高置信度的对象标签，作为 \(q\) 的来源。

##### 与传统 VLP 方法的对比

| 特性 | 传统 VLP（ViLBERT/UNITER 等） | OSCAR |
|------|------|------|
| 输入形式 | 二元组 \((w, v)\) | 三元组 \((w, q, v)\) |
| 对齐方式 | 纯自注意力暴力对齐 | 对象标签作为显式锚点 |
| 预训练目标 | MLM + ITM（图文匹配） | MTL（含标签掩码）+ Contrastive Loss |
| 负样本构造 | 替换整张图或整段文本 | 仅替换对象标签序列 |
| 语义空间 | 视觉和语言各自独立 | 标签在语言空间中统一表示 |

> 💡 **核心优势**：当移除对象标签 \(q\) 时，OSCAR 退化为传统 VLP 方法。\(q\) 的引入几乎不增加计算成本（仅多了几个文本 token），但通过在语言空间中提供显式的视觉-语言锚点，大幅提升了对齐学习效率。

##### 下游任务适配

OSCAR 在微调阶段支持两类下游任务：
- **理解任务**（VQA、GQA、NLVR2、Image-Text Retrieval）：在 \([CLS]\) 表示上添加任务特定的分类头
- **生成任务**（Image Captioning、NoCaps）：采用 seq2seq 微调方式生成文本

在所有 6+ 项任务上，OSCAR 均取得了当时的 SOTA 结果，验证了对象标签锚点策略的通用有效性。

#### 🧪 练习题
```yaml
question: "OSCAR 中对象标签（object tags）在预训练中的核心作用是什么？"
options:
  - "替代视觉区域特征，减少计算量"
  - "作为跨模态锚点，桥接视觉区域特征与文本语义空间"
  - "仅用于数据增强，构造更多训练样本"
  - "作为额外的监督信号，直接预测图像类别"
answer: 1
explain: "OSCAR 的核心创新是将对象标签作为锚点（anchor points），它们在语言空间中与文本词汇共享表示，同时在信息来源上与视觉特征关联，从而显式桥接两个模态的语义空间，降低跨模态对齐的学习难度。"
```

### ViLT

```yaml
id: vilt
num: 4
name: ViLT
full_name: 视觉语言Transformer (ViLT)
year: '2021'
org: KAIST
parent: oscar
paper_url: https://proceedings.mlr.press/v139/kim21k.html
project_url: ''
category: foundation
motivation: 纯Transformer去除目标检测器
```

#### 📝 一句话总结
ViLT 的核心目标是：纯Transformer去除目标检测器。

#### 🎯 核心要点
- 核心动机：纯Transformer去除目标检测器
- 演化来源：继承或改进自 oscar
- 代表机构：KAIST

#### 🔬 深入细节
纯Transformer去除目标检测器


### CLIP

```yaml
id: clip
num: 5
name: CLIP
full_name: 对比语言图像预训练 (CLIP)
year: '2021'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/2103.00020
project_url: ''
category: dual_encoder
motivation: 大规模对比学习实现零样本迁移
```

#### 📝 一句话总结
CLIP 的核心目标是：大规模对比学习实现零样本迁移。

#### 🎯 核心要点
- 核心动机：大规模对比学习实现零样本迁移
- 代表机构：OpenAI

#### 🔬 深入细节
大规模对比学习实现零样本迁移


### ALIGN

```yaml
id: align
num: 6
name: ALIGN
full_name: 大规模图像噪声文本嵌入 (ALIGN)
year: '2021'
org: Google
parent: clip
paper_url: https://arxiv.org/abs/2102.05918
project_url: ''
category: dual_encoder
motivation: 18亿规模噪声数据对比学习
```

#### 📝 一句话总结
ALIGN 的核心目标是：18亿规模噪声数据对比学习。

#### 🎯 核心要点
- 核心动机：18亿规模噪声数据对比学习
- 演化来源：继承或改进自 clip
- 代表机构：Google

#### 🔬 深入细节
18亿规模噪声数据对比学习


### SigLIP

```yaml
id: siglip
num: 7
name: SigLIP
full_name: Sigmoid损失语言图像预训练 (SigLIP)
year: '2023'
org: Google
parent: clip
paper_url: http://openaccess.thecvf.com/content/ICCV2023/html/Zhai_Sigmoid_Loss_for_Language_Image_Pre-Training_ICCV_2023_paper.html
project_url: ''
category: dual_encoder
motivation: Sigmoid损失提升内存效率
```

#### 📝 一句话总结
SigLIP 提出用 **sigmoid 损失**替代 CLIP 中的 softmax 对比损失进行语言-图像预训练，将图文匹配从多类分类问题转化为逐对二分类问题，消除了对全局归一化的依赖，从而实现更高的内存效率和更简单的分布式实现，在小批量场景下显著优于 softmax 基线。

#### 🎯 核心要点
- **Sigmoid 对比损失**：将图文对匹配建模为独立的二分类问题，对 batch 内所有 \(n^2\) 个图文对分别计算 sigmoid 损失，无需 softmax 的全局归一化
- **可学习偏置项 \(b\)**：在相似度计算中引入 learnable bias（初始化为 \(-\log(n)\) 量级），自动平衡正负样本比例（1 正 vs \(n-1\) 负）
- **两种实验设置**：SigLiT（锁定预训练 ViT 图像塔，仅训练文本塔）和 SigLIP（从头训练双塔）
- **Chunked Sigmoid Loss**：分块计算损失，无需在单设备上聚合全局 batch，内存复杂度从 \(O(B^2)\) 降至 \(O(B^2/K)\)（\(K\) 为设备数）
- **批量大小研究**：系统实验表明 32k batch size 即可达到接近最优性能，远小于此前认为需要的超大 batch
- **超参数鲁棒性**：sigmoid 损失在不同 batch size 下无需调整学习率和权重衰减，默认超参即为最优或接近最优
- **多语言扩展 mSigLIP**：在 WebLI 数据集上训练多语言版本，覆盖 36 种语言的跨模态检索

#### 🔬 深入细节
##### 方法总览

![SigLIP 框架对比图](https://ar5iv.labs.arxiv.org/html/2303.15343v2/assets/x1.png)
*图：Softmax 对比损失（左）vs Sigmoid 对比损失（右）。Softmax 需要在整行/列上做归一化（需要全局通信），而 Sigmoid 对每个 cell 独立计算损失。*

SigLIP 的核心思想非常直观：传统 CLIP 使用 softmax 对比损失（InfoNCE），需要对 batch 内所有样本做全局归一化。这意味着在多设备分布式训练时，必须在所有设备间同步完整的相似度矩阵。SigLIP 将其替换为 sigmoid 损失，每个图文对独立判断"是否匹配"，彻底消除了全局依赖。

##### 损失函数设计

**Softmax 对比损失（CLIP 基线）：**

传统的图文对比学习使用 InfoNCE 损失，对 batch 内 \(n\) 个图文对：

$$\mathcal{L}_{\text{softmax}} = -\frac{1}{n}\sum_{i=1}^{n}\left[\log\frac{e^{x_i \cdot y_i / \tau}}{\sum_{j=1}^{n} e^{x_i \cdot y_j / \tau}} + \log\frac{e^{x_i \cdot y_i / \tau}}{\sum_{j=1}^{n} e^{x_j \cdot y_i / \tau}}\right]
$$

其中 \(x_i, y_i\) 分别是图像和文本的归一化嵌入，\(\tau\) 是温度参数。关键问题在于分母中的求和 **必须遍历 batch 内所有样本**，在分布式训练中需要跨设备聚合。

**Sigmoid 对比损失（SigLIP 提出）：**

$$\mathcal{L}_{\text{sigmoid}} = -\frac{1}{n}\sum_{i=1}^{n}\sum_{j=1}^{n}\log\frac{1}{1 + e^{z_{ij}(-x_i \cdot y_j \cdot t + b)}}
$$

其中：
- \(z_{ij} = \begin{cases} 1 & \text{if } i = j \text{（正样本对）} \\ -1 & \text{if } i \neq j \text{（负样本对）} \end{cases}\)
- \(t\) 是可学习的温度参数（对应 \(1/\tau\)）
- \(b\) 是可学习的偏置项

> 💡 **关键直觉**：Sigmoid 损失将每个图文对视为一个独立的二分类问题——"这张图和这段文字是否匹配？"。正样本对（对角线）标签为 1，负样本对（非对角线）标签为 -1。每个 cell 的损失计算完全独立，不依赖同行/同列的其他值。

##### 偏置项 \(b\) 的作用

偏置项 \(b\) 是 SigLIP 的一个精妙设计。在一个 batch 中，正样本对有 \(n\) 个，而负样本对有 \(n^2 - n\) 个，正负比例约为 \(1 : (n-1)\)。如果没有偏置项，sigmoid 函数在零点处输出 0.5，这意味着模型初始化时会将所有对都预测为"匹配"，导致训练不稳定。

偏置项 \(b\) 初始化为 \(-\log(n) \approx -10\)（当 \(n = 32768\) 时），使得初始时 sigmoid 输出接近 0（即"不匹配"），与负样本占绝大多数的先验一致。论文实验表明，\(b\) 的初始化值对最终性能影响不大（在 \(-10\) 到 \(-15\) 范围内结果稳定），但训练过程中 \(b\) 会收敛到约 \(-10\) 附近。

> ⚠️ **注意**：偏置项 \(b\) 的角色类似于逻辑回归中的截距项，它补偿了正负样本的类别不平衡。这与 Focal Loss 中处理类别不平衡的思路异曲同工。

##### Chunked Sigmoid Loss 分布式实现

```python
# Chunked Sigmoid Loss 伪代码
# 假设 K 个设备，每个设备持有 n/K 个样本
# 设备 k 上的图像嵌入: img_emb[k], 文本嵌入: txt_emb[k]

def chunked_sigmoid_loss(img_emb, txt_emb, t, b):
    """每个设备独立计算局部损失，无需聚合全局相似度矩阵"""
    local_loss = 0
    # 本地图像 vs 所有文本（通过 all-gather 获取文本嵌入）
    for k in range(K):
        txt_chunk = all_gather(txt_emb)[k]  # 获取第k个设备的文本
        # 计算局部相似度矩阵 (n/K × n/K)
        logits = img_emb @ txt_chunk.T * t + b
        # 构造标签：只有当 chunk_k 是本设备时对角线为正
        labels = get_labels(k, device_id)  # 1 for pos, -1 for neg
        # Sigmoid 损失：每个元素独立计算
        local_loss += -log_sigmoid(labels * logits).sum()
    return local_loss / (n * n)
```

> 💡 **关键优势**：Softmax 损失需要在单个设备上构建完整的 \(n \times n\) 相似度矩阵来计算归一化分母，内存为 \(O(n^2)\)。Chunked sigmoid 损失将矩阵分成 \(K \times K\) 个块，每个设备只需处理 \(K\) 个大小为 \((n/K) \times (n/K)\) 的块，内存降至 \(O(n^2/K)\)。

##### 与 Softmax 对比损失的关键区别

| 特性 | Softmax (CLIP) | Sigmoid (SigLIP) |
|------|----------------|-------------------|
| 损失类型 | 多类交叉熵 | 逐对二分类 |
| 归一化 | 全局（跨 batch） | 无（每对独立） |
| 分布式通信 | 需要聚合全局矩阵 | 仅需 all-gather 嵌入 |
| 内存复杂度 | \(O(B^2)\) | \(O(B^2/K)\) |
| 小 batch 性能 | 较差 | 显著更优 |
| 超参数敏感性 | 需按 batch 调参 | 默认超参即可 |
| 偏置项 | 无 | 可学习偏置 \(b\) |

##### 实验关键发现

**1. Sigmoid 在小 batch 下优势显著：** 在 SigLiT 设置（锁定预训练 ViT-L/16 图像塔）下，batch size 为 512 时 sigmoid 比 softmax 高 3.0%（72.5% vs 69.5%），随着 batch 增大差距缩小，在 128k 时两者基本持平。

**2. 32k 是性价比最优 batch size：** 论文系统实验了从 512 到 1M 的 batch size，发现 32k 即可达到接近最优性能（84.2% vs 84.7%@1M），而所需计算资源远小于超大 batch。

**3. 从头训练（SigLIP）同样有效：** 在 WebLI 数据集上从头训练 ViT-B/16，SigLIP 在 ImageNet zero-shot 上达到 73.4%（batch=32k, 36B examples），优于同等设置的 softmax 基线。

**4. 噪声鲁棒性：** 在人工注入标签噪声的实验中，sigmoid 损失比 softmax 更鲁棒，在 40% 噪声率下仍保持合理性能。

#### 🧪 练习题
```yaml
question: "SigLIP 中引入可学习偏置项 b 的主要目的是什么？"
options:
  - "加速模型收敛"
  - "补偿正负样本的严重不平衡（1个正样本 vs n-1个负样本）"
  - "替代温度参数 τ 的作用"
  - "防止梯度消失问题"
answer: 1
explain: "在 batch size 为 n 的对比学习中，每个 anchor 有 1 个正样本和 n-1 个负样本。偏置项 b 初始化为约 -log(n)，使 sigmoid 初始输出偏向'不匹配'，与负样本占多数的先验一致，从而稳定训练。"
```

### BLIP

```yaml
id: blip
num: 8
name: BLIP
full_name: 自举语言图像预训练 (BLIP)
year: '2022'
org: Salesforce
parent: clip
paper_url: https://proceedings.mlr.press/v162/li22n.html
project_url: ''
category: fusion_model
motivation: CapFilt机制提升数据质量
```

#### 📝 一句话总结
BLIP 的核心目标是：CapFilt机制提升数据质量。

#### 🎯 核心要点
- 核心动机：CapFilt机制提升数据质量
- 演化来源：继承或改进自 clip
- 代表机构：Salesforce

#### 🔬 深入细节
CapFilt机制提升数据质量


### BLIP-2

```yaml
id: blip2
num: 9
name: BLIP-2
full_name: 自举语言图像预训练v2 (BLIP-2)
year: '2023'
org: Salesforce
parent: blip
paper_url: https://proceedings.mlr.press/v202/li23q
project_url: ''
category: fusion_model
motivation: Q-Former连接冻结编码器与LLM
```

#### 📝 一句话总结
BLIP-2 提出了一种通用且计算高效的视觉-语言预训练方法，通过轻量级的 Querying Transformer（Q-Former）分两阶段桥接冻结的图像编码器与冻结的大语言模型，以极少的可训练参数（最少 104M）在多项零样本视觉-语言任务上超越了参数量大 54 倍的 Flamingo80B。

#### 🎯 核心要点
- **Q-Former 架构**：轻量级 Transformer（188M 参数），包含 32 个可学习查询向量（768 维），通过交叉注意力从冻结图像编码器中提取固定数量的视觉特征
- **两阶段预训练策略**：第一阶段从冻结图像编码器引导视觉-语言表征学习（ITC + ITG + ITM），第二阶段从冻结 LLM 引导视觉到语言的生成学习
- **三种互补的预训练目标**：Image-Text Contrastive Learning（ITC）、Image-grounded Text Generation（ITG）、Image-Text Matching（ITM），通过不同的自注意力掩码策略在同一架构中实现
- **冻结骨干网络**：图像编码器（ViT-L/14, ViT-g/14）和 LLM（OPT, FlanT5）全程冻结，仅训练 Q-Former 和线性投影层
- **兼容 Decoder-only 和 Encoder-Decoder LLM**：分别支持 OPT 系列和 FlanT5 系列，通过全连接层将 Q-Former 输出投影到 LLM 的文本嵌入空间
- **大规模预训练数据**：使用 129M 图像（COCO、Visual Genome、CC3M、CC12M、SBU、LAION400M 子集），共 1.29 亿图文对
- **零样本 SOTA**：VQAv2 上达到 65.0%（超 Flamingo80B 8.7%），同时可训练参数仅为其 1/54

#### 🔬 深入细节
##### 整体架构

![BLIP-2 整体框架](https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x1.png)
*图 1：BLIP-2 框架总览。第一阶段从冻结图像编码器引导表征学习，第二阶段从冻结 LLM 引导生成学习。Q-Former 作为两者之间的桥梁。*

BLIP-2 的核心思想是：**不从头联合训练视觉和语言模型，而是利用一个轻量级的中间模块（Q-Former）来桥接已有的强大冻结模型**。这种设计的动机来自两个观察：

1. **端到端训练代价极高**：视觉-语言模型的规模不断增长，端到端预训练需要大量计算资源
2. **灾难性遗忘风险**：如果微调 LLM，可能导致其语言生成能力退化

> 💡 关键：BLIP-2 的"Bootstrapping"体现在逐步利用冻结模型的能力——先从图像编码器"引导"出视觉表征，再从 LLM"引导"出生成能力，而非同时学习两者。

##### Q-Former 架构详解

![Q-Former 架构](https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x2.png)
*图 2：Q-Former 架构及第一阶段预训练目标。左侧为图像 Transformer，右侧为文本 Transformer，两者共享自注意力层。*

Q-Former 由两个共享自注意力层的 Transformer 子模块组成：

1. **图像 Transformer**：以一组可学习的查询向量 \(\mathbf{Z} \in \mathbb{R}^{32 \times 768}\) 作为输入，通过交叉注意力层与冻结图像编码器的输出特征交互。这些查询向量充当"信息瓶颈"，将高维视觉信息压缩为固定数量（32 个）的紧凑表征。

2. **文本 Transformer**：同时作为文本编码器和文本解码器，其功能由自注意力掩码控制。它与图像 Transformer **共享自注意力层**，使得查询向量可以同时关注视觉和文本信息。

> ⚠️ 注意：Q-Former 的参数从 BERT-base 初始化（除了交叉注意力层随机初始化），这为训练提供了良好的起点。交叉注意力层每隔一个 Transformer block 插入一次。

##### 第一阶段：视觉-语言表征学习

第一阶段的目标是训练 Q-Former，使其学会从冻结图像编码器中提取与文本最相关的视觉特征。这一阶段联合优化三个互补的损失函数：

**1. Image-Text Contrastive Learning (ITC)**

ITC 对齐图像表征和文本表征，使匹配的图文对在特征空间中更接近。具体地，将每个查询向量的输出与文本的 `[CLS]` token 输出计算相似度，取最大值作为图文相似度：

$$s(\mathbf{I}, \mathbf{T}) = \max_{i \in \{1, \ldots, 32\}} \mathbf{z}_i^\top \mathbf{t}_{\text{cls}}$$

为防止信息泄漏，ITC 使用**单模态自注意力掩码**（unimodal self-attention mask），即查询向量和文本 token 互相不可见。

**2. Image-grounded Text Generation (ITG)**

ITG 训练 Q-Former 在给定图像条件下生成对应文本。它使用**因果自注意力掩码**（causal self-attention mask）：查询向量之间可以互相关注，但文本 token 只能关注之前的 token 和所有查询向量。

> 💡 关键：ITG 迫使查询向量捕获包含所有文本信息的视觉特征，因为文本生成的唯一视觉信息来源就是这 32 个查询向量。这实际上是一种"信息瓶颈"设计。

**3. Image-Text Matching (ITM)**

ITM 是一个二分类任务，预测图文对是否匹配。它使用**双向自注意力掩码**（bi-directional self-attention mask），允许查询向量和文本 token 完全交互。采用 hard negative mining 策略选择困难负样本。

```python
# 第一阶段预训练伪代码
# Q-Former 包含: queries Z (32×768), image_transformer, text_transformer (共享self-attn)
# 冻结: image_encoder (ViT-L/g)

for images, texts in dataloader:
    # 提取冻结视觉特征
    with torch.no_grad():
        image_features = image_encoder(images)  # [B, N_patch, D_vis]
    
    # === ITC: 单模态掩码，查询与文本互不可见 ===
    query_output = q_former(Z, image_features, mask="unimodal")  # [B, 32, 768]
    text_output = q_former.text_encode(texts, mask="unimodal")   # [B, 768]
    sim = max_over_queries(query_output @ text_output.T)
    loss_itc = contrastive_loss(sim)
    
    # === ITG: 因果掩码，文本仅能看到之前token和所有查询 ===
    logits = q_former(Z, image_features, texts, mask="causal")
    loss_itg = cross_entropy(logits, texts)
    
    # === ITM: 双向掩码，查询与文本完全交互 ===
    match_logits = q_former(Z, image_features, texts, mask="bidirectional")
    loss_itm = binary_cross_entropy(match_logits, labels)  # hard negatives
    
    loss = loss_itc + loss_itg + loss_itm
    optimizer.step(loss)  # 仅更新 Q-Former 参数
```

##### 第二阶段：视觉到语言的生成学习

![第二阶段预训练](https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x3.png)
*图 3：第二阶段预训练。Q-Former 的输出通过全连接层投影后作为 soft visual prompt 输入冻结 LLM。*

第二阶段将 Q-Former 的输出连接到冻结的 LLM，使其获得视觉理解能力。具体步骤：

1. 使用一个全连接层（FC layer）将 Q-Former 的输出 \(\mathbf{Z} \in \mathbb{R}^{32 \times 768}\) 线性投影到 LLM 的文本嵌入空间维度
2. 投影后的向量作为 **soft visual prompts** 前置到 LLM 的输入文本嵌入之前
3. 这些 visual prompts 为 LLM 提供了最相关的视觉信息，引导其生成与图像相关的文本

对于不同类型的 LLM，训练目标略有不同：

- **Decoder-only LLM（OPT）**：使用语言建模损失（language modeling loss），即预测下一个 token
- **Encoder-Decoder LLM（FlanT5）**：将文本分为前后两部分，前半部分与 visual prompts 一起作为编码器输入，后半部分作为解码器的生成目标

$$\mathcal{L}_{\text{LM}} = -\sum_{t=1}^{T} \log p_{\theta_{\text{LLM}}}(y_t \mid \text{FC}(\mathbf{Z}), y_{<t})$$

> 💡 关键：第一阶段的表征学习至关重要。实验表明，没有第一阶段直接训练第二阶段时，OPT 会出现灾难性遗忘（性能随训练急剧下降），FlanT5 的性能也显著降低。这说明 Q-Former 需要先学会提取与文本相关的视觉特征，才能有效地与 LLM 对接。

##### 预训练细节

| 配置项 | 值 |
|--------|-----|
| 预训练数据 | 129M 图像（COCO, VG, CC3M, CC12M, SBU, LAION400M 子集） |
| 图像分辨率 | 224×224 |
| 第一阶段训练 | 250K 步，batch size 2320，lr 1e-4（cosine decay） |
| 第二阶段训练 | 80K 步，batch size 1920，lr 1e-5 |
| Q-Former 参数 | 188M（含查询向量） |
| 可训练参数（最小配置） | 104M（ViT-L + OPT 2.7B） |
| 图像编码器 | ViT-L/14（CLIP 预训练）或 ViT-g/14（EVA-CLIP 预训练） |
| LLM | OPT（2.7B/6.7B）或 FlanT5（XL/XXL） |

##### 关键实验结果

**零样本视觉问答（Zero-shot VQA）**：

| 模型 | 可训练参数 | 总参数 | VQAv2 | GQA |
|------|-----------|--------|-------|-----|
| Flamingo9B | 1.8B | 9.3B | 51.8 | 44.7 |
| Flamingo80B | 10.2B | 80B | 56.3 | 50.6 |
| BLIP-2 ViT-g FlanT5-XL | 107M | 4.1B | 63.1 | 63.0 |
| BLIP-2 ViT-g FlanT5-XXL | 108M | 12.1B | **65.0** | **65.0** |

BLIP-2 在 VQAv2 上超越 Flamingo80B 达 **8.7%**，而可训练参数仅为其 **1/54**。

**关键发现**：
- 更强的图像编码器（ViT-g > ViT-L）和更强的 LLM（FlanT5-XXL > XL > OPT）都能带来性能提升，验证了 BLIP-2 作为通用视觉-语言预训练框架的有效性
- 指令微调的 LLM（FlanT5）在 VQA 任务上显著优于无监督训练的 LLM（OPT）
- 第一阶段的表征学习对第二阶段至关重要，缺少它会导致 OPT 灾难性遗忘

##### 与传统方法的对比

| 方面 | 传统方法（如 Flamingo） | BLIP-2 |
|------|----------------------|--------|
| 视觉-语言对齐 | Perceiver Resampler 直接映射 | 两阶段渐进式对齐（先表征后生成） |
| 训练成本 | 端到端训练大量参数 | 仅训练轻量级 Q-Former（~100M） |
| 图像编码器 | 可能微调 | 完全冻结 |
| LLM | 可能部分微调（gated cross-attention） | 完全冻结 |
| 可扩展性 | 受限于计算资源 | 可即插即用更强的视觉/语言模型 |

BLIP-2 的核心优势在于其**模块化设计**：当更强的图像编码器或 LLM 出现时，只需重新训练轻量级的 Q-Former 即可获得性能提升，无需重新训练整个系统。

#### 🧪 练习题
```yaml
question: "BLIP-2 的 Q-Former 在第一阶段预训练中使用了三种不同的自注意力掩码策略，其中 Image-grounded Text Generation (ITG) 使用的是哪种掩码？"
options:
  - "双向自注意力掩码（bi-directional），查询和文本完全可见"
  - "单模态自注意力掩码（unimodal），查询和文本互不可见"
  - "因果自注意力掩码（causal），文本 token 仅能关注之前的 token 和所有查询向量"
  - "无掩码（no mask），所有 token 之间完全自由注意"
answer: 2
explain: "ITG 要求模型基于图像生成文本，因此使用因果掩码：查询向量之间可互相关注，文本 token 只能看到之前的 token 和所有查询向量，确保生成过程的自回归性质。"
```

### ImageBind

```yaml
id: imagebind
num: 10
name: ImageBind
full_name: 统一嵌入空间 (ImageBind)
year: '2023'
org: Meta
parent: clip
paper_url: http://openaccess.thecvf.com/content/CVPR2023/html/Girdhar_ImageBind_One_Embedding_Space_To_Bind_Them_All_CVPR_2023_paper.html
project_url: ''
category: fusion_model
motivation: 六种模态统一对齐
```

#### 📝 一句话总结
ImageBind 提出以图像为中心枢纽，仅利用图像与其他模态的自然配对数据（无需所有模态两两配对），通过对比学习将六种模态（图像/视频、文本、音频、深度、热成像、IMU）对齐到统一嵌入空间，实现跨模态的涌现零样本能力。

#### 🎯 核心要点
- **六模态统一嵌入**：将图像/视频、文本、音频、深度图、热成像、IMU 六种模态映射到同一向量空间
- **图像中心对齐策略**：仅使用 (image, X) 配对数据训练，无需所有模态两两配对；利用图像作为"绑定"桥梁
- **涌现零样本能力（Emergent Zero-shot）**：未直接训练 (audio, text) 对齐，但通过图像桥梁自动获得音频-文本零样本分类/检索能力
- **编码器架构**：各模态独立编码器 + 线性投影头；图像/文本编码器使用 OpenCLIP ViT-H 初始化并冻结，其余模态编码器训练
- **对比损失**：对称 InfoNCE 损失，固定温度优于可学习温度
- **数据来源**：Audioset (video-audio)、SUN RGB-D (image-depth)、LLVIP (image-thermal)、Ego4D (video-IMU)，小数据集复制 50× 平衡
- **即插即用升级**：可直接替换 CLIP 嵌入，将 Detic 检测器升级为音频驱动、DALL·E 2 升级为音频生成图像
- **嵌入空间算术**：支持跨模态嵌入相加组合语义（如图像+音频→检索）

#### 🔬 深入细节
![ImageBind 框架总览](https://ar5iv.labs.arxiv.org/html/2305.05665/assets/x1.png)
*图：ImageBind 以图像为中心枢纽，将六种模态对齐到统一嵌入空间。仅使用图像配对数据训练，即可涌现出未见模态对之间的零样本对齐能力。*

```python
# ImageBind 核心训练伪代码
# 对称 InfoNCE 对比学习

def imagebind_train_step(image_encoder, modality_encoder, batch):
    """
    image_encoder: 冻结的 OpenCLIP ViT-H 图像编码器
    modality_encoder: 可训练的模态编码器 (audio/depth/thermal/IMU)
    batch: (image, paired_modality) 自然配对数据
    """
    # 1. 编码 + 线性投影 → 归一化嵌入
    q_i = normalize(proj_image(image_encoder(batch.image)))    # [B, d]
    q_m = normalize(proj_modal(modality_encoder(batch.modal)))  # [B, d]
    
    # 2. 计算相似度矩阵
    logits = q_i @ q_m.T / tau  # tau: 固定温度 (depth/thermal/IMU: 0.2, audio: 0.05)
    
    # 3. 对称 InfoNCE 损失
    labels = torch.arange(B)
    loss_i2m = cross_entropy(logits, labels)      # image → modality
    loss_m2i = cross_entropy(logits.T, labels)     # modality → image
    loss = (loss_i2m + loss_m2i) / 2
    
    # 4. 仅更新 modality_encoder 和 proj_modal（image_encoder 冻结）
    loss.backward()
    optimizer.step()
```

**动机与背景：为什么需要统一嵌入空间？**

CLIP 等对比学习方法已经证明了 (image, text) 对齐的强大能力，但现实世界的感知远不止视觉和文本两种模态。音频、深度、热成像、惯性测量（IMU）等模态在机器人、AR/VR、多媒体理解等场景中至关重要。然而，为所有 \(M\) 种模态收集两两配对数据需要 \(O(M^2)\) 种数据集，这在实际中几乎不可行——例如，很难获得大规模的 (audio, depth) 或 (thermal, IMU) 配对数据。ImageBind 的核心洞察是：**图像天然地与几乎所有模态共现**——视频自带音频、RGB-D 相机同时采集深度、热成像与可见光对齐、穿戴设备同时记录视频和 IMU。因此，只需 \(O(M)\) 种 (image, X) 配对数据，即可将所有模态"绑定"到统一空间。

**核心机制：InfoNCE 对齐与涌现零样本**

ImageBind 的训练目标是标准的对称 InfoNCE 对比损失。对于一个 batch 中的 \(B\) 个 (image, modality) 配对 \(\{(I_j, M_j)\}_{j=1}^{B}\)，损失函数为：

$$\mathcal{L}_{I,M} = -\frac{1}{B}\sum_{i=1}^{B}\log\frac{\exp(q_i^I \cdot q_i^M / \tau)}{\sum_{j=1}^{B}\exp(q_i^I \cdot q_j^M / \tau)}$$

其中 \(q^I, q^M\) 分别是图像和配对模态的归一化嵌入，\(\tau\) 是温度超参数。最终损失对称化为 \(\mathcal{L} = \mathcal{L}_{I,M} + \mathcal{L}_{M,I}\)。

> 💡 **关键洞察——涌现对齐（Emergent Alignment）**：假设图像嵌入空间已经与文本对齐（来自 CLIP/OpenCLIP 预训练），当音频编码器被训练为与图像对齐时，音频嵌入自动与文本嵌入对齐。这是因为对齐关系具有传递性：如果 Audio ≈ Image 且 Image ≈ Text，则 Audio ≈ Text。论文将这种未经直接训练但自然获得的跨模态能力称为"涌现零样本"（Emergent Zero-shot），以区别于 AudioCLIP 等直接使用 (audio, text) 对训练的方法。

**编码器架构与训练细节**

各模态使用独立的编码器：
- **图像/视频**：OpenCLIP ViT-H（630M 参数），**冻结不训练**。视频仅采样 2 帧，通过 temporal inflate（将 patch embedding 的卷积核沿时间维度复制并平均）处理
- **文本**：OpenCLIP 文本编码器（302M 参数），**冻结不训练**
- **音频**：ViT-B，将音频转换为 2D 梅尔频谱图后作为"图像"输入 ViT；使用 2 秒音频片段，采样率 16kHz，128 个梅尔频率 bin
- **深度**：ViT-S，将深度图转换为视差图（disparity map）以获得尺度不变性，作为单通道图像输入
- **热成像**：ViT-B，作为单通道图像输入
- **IMU**：6 层 Transformer（512 维，8 头），5 秒 IMU 信号（加速度计+陀螺仪，6 轴），通过 1D 卷积（kernel=8）投影后输入

每个编码器后接一个模态特定的**线性投影头**（实验表明线性优于 MLP），输出固定维度 \(d\) 的归一化嵌入用于 InfoNCE 损失。

**关键消融实验发现**

论文通过大量消融实验揭示了若干重要设计选择：

1. **图像编码器越强，涌现能力越强**：将图像编码器从 ViT-B → ViT-L → ViT-H，深度零样本分类提升 7%，音频提升 4%。这说明更强的视觉表示能更好地"绑定"其他模态
2. **固定温度优于可学习温度**：不同于 CLIP 使用可学习温度，ImageBind 发现固定温度更好；且不同模态最优温度不同（深度/热成像/IMU 偏好高温 \(\tau=0.2\)，音频偏好低温 \(\tau=0.05\)）
3. **空间/时间对齐至关重要**：深度图与图像需要空间对齐裁剪（随机裁剪掉 10%+），音频与视频需要时间对齐采样
4. **数据增强因模态而异**：强增强（RandAugment+RandErase）有助于小数据集的深度分类，但会严重损害音频分类（ESC 下降 34%）
5. **编码器容量需匹配数据规模**：小数据集（SUN RGB-D）适合小编码器（ViT-S），大数据集（Audioset）适合大编码器（ViT-B）

**实验亮点与应用**

在涌现零样本分类中，ImageBind 在 ESC-50 音频分类上达到 66.9%（接近使用 (audio, text) 直接训练的 AudioCLIP 的 68.6%），在 Ego4D IMU 场景分类上达到 25.0%（随机基线 0.9%）。在零样本音频-文本检索中，ImageBind 在 Clotho 数据集上 R@1 达到 6.0，是 AVFIC 方法的两倍，尽管后者使用了自动挖掘的 (audio, text) 对。

> ⚠️ **注意**：ImageBind 的图像/文本编码器完全冻结，因此其图像/文本任务性能等同于 OpenCLIP，并非 ImageBind 自身的贡献。ImageBind 的核心价值在于将其他模态"免费"接入已有的视觉-语言空间。

#### 🧪 练习题
```yaml
question: "ImageBind 实现音频零样本文本分类的关键机制是什么？"
options:
  - "使用大规模 (audio, text) 配对数据直接训练音频-文本对齐"
  - "通过图像作为桥梁，分别对齐 (image, text) 和 (image, audio)，利用对齐的传递性实现涌现对齐"
  - "将音频信号直接转换为文本描述后使用文本编码器处理"
  - "在统一编码器中共享音频和文本的参数权重"
answer: 1
explain: "ImageBind 的核心思想是利用图像作为中心枢纽：图像-文本对齐来自冻结的 OpenCLIP，图像-音频对齐通过 InfoNCE 训练获得，两者的传递性使音频自动与文本对齐，无需任何 (audio, text) 配对数据。"
```

### PQ

```yaml
id: pq
num: 11
name: PQ
full_name: 乘积量化 (Product Quantization)
year: '2010'
org: INRIA
parent: —
paper_url: https://ieeexplore.ieee.org/abstract/document/5432202/
project_url: ''
category: vector_ann
motivation: 子空间分解实现高压缩比
```

#### 📝 一句话总结
PQ 的核心目标是：子空间分解实现高压缩比。

#### 🎯 核心要点
- 核心动机：子空间分解实现高压缩比
- 代表机构：INRIA

#### 🔬 深入细节
子空间分解实现高压缩比


### HNSW

```yaml
id: hnsw
num: 12
name: HNSW
full_name: 分层可导航小世界图 (HNSW)
year: '2016'
org: —
parent: —
paper_url: https://arxiv.org/abs/1603.09320
project_url: ''
category: vector_ann
motivation: 多层导航图平衡精度与速度
```

#### 📝 一句话总结
HNSW 的核心目标是：多层导航图平衡精度与速度。

#### 🎯 核心要点
- 核心动机：多层导航图平衡精度与速度
- 代表机构：—

#### 🔬 深入细节
多层导航图平衡精度与速度


### IVF

```yaml
id: ivf
num: 13
name: IVF
full_name: 倒排文件索引 (IVF)
year: '2003'
org: —
parent: pq
paper_url: —
project_url: ''
category: vector_ann
motivation: 聚类缩小搜索范围
```

#### 📝 一句话总结
IVF 将信息检索中的**倒排索引**思想迁移到向量近邻搜索领域，通过 K-means 聚类将向量空间划分为 Voronoi 单元，查询时仅在最近的少数聚类中进行穷举搜索，将搜索复杂度从 \(O(N)\) 降至 \(O(nprobe \cdot N/K)\)，是 Faiss 等主流向量检索库的核心索引结构。

#### 🎯 核心要点
- **粗量化器 (Coarse Quantizer)**：使用 K-means 将 \(N\) 个数据库向量聚类为 \(K\) 个 Voronoi 单元，每个聚类中心作为"视觉词汇"
- **倒排列表 (Inverted Lists)**：每个聚类中心维护一个列表，存储所有被分配到该单元的向量（或其 ID + 残差编码）
- **多探针搜索 (Multi-probe Search)**：查询时不仅搜索最近的 1 个聚类，而是搜索最近的 \(nprobe\) 个聚类，以 nprobe 参数平衡精度与速度
- **残差编码 (Residual Encoding)**：存储向量与其所属聚类中心的残差 \(\mathbf{r} = \mathbf{x} - c(\mathbf{x})\)，降低量化误差
- **IVF+PQ (IVFADC)**：将倒排索引与乘积量化结合，倒排列表中存储 PQ 编码的残差而非原始向量，实现内存高效的十亿级检索
- **非对称距离计算 (ADC)**：查询向量不量化，直接与 PQ 码本计算距离，保留查询精度
- **源自文本检索**：概念源于 Sivic & Zisserman (2003) 将文本检索的倒排索引应用于视觉词袋模型，后由 Jégou et al. (2011) 推广至通用向量近邻搜索

#### 🔬 深入细节
##### 核心框架图

![IVF 索引结构与搜索过程](assets/ivf_architecture.png)

*图：左侧展示 IVF 索引结构——K-means 将向量空间划分为 Voronoi 单元，每个聚类中心关联一个倒排列表；右侧展示搜索过程——查询向量 \(q\) 仅在最近的 nprobe=2 个聚类（红色虚线圈）中搜索候选向量，灰色区域的向量被完全跳过。*

##### 算法伪代码

```python
# ============================================
# IVF 索引构建 (Offline)
# ============================================
# 输入: 数据库向量集 X = {x_1, ..., x_N}, 聚类数 K
# 输出: 聚类中心 C, 倒排列表 inverted_lists

# Step 1: 训练粗量化器 (K-means)
C = {c_1, ..., c_K} ← KMeans(X, K)

# Step 2: 构建倒排列表
inverted_lists = {k: [] for k in range(K)}
for i, x in enumerate(X):
    k* = argmin_k ||x - c_k||²          # 找到最近的聚类中心
    r = x - c_{k*}                        # 计算残差向量
    inverted_lists[k*].append((i, r))     # 存储 (向量ID, 残差)

# ============================================
# IVF 查询 (Online)
# ============================================
# 输入: 查询向量 q, 探针数 nprobe, 返回数 top_k
# 输出: 最近邻列表

# Step 1: 粗量化——找到 nprobe 个最近聚类
probed_cells = nprobe_nearest(q, C, nprobe)

# Step 2: 在被探测的倒排列表中穷举搜索
candidates = []
for k in probed_cells:
    for (id_i, r_i) in inverted_lists[k]:
        dist = ||q - c_k - r_i||²        # 精确距离 (等价于 ||q - x_i||²)
        candidates.append((dist, id_i))

# Step 3: 返回 top-k 最近邻
return top_k_smallest(candidates, top_k)
```

##### 动机与背景

在大规模向量检索场景中（如图像检索、推荐系统、RAG），数据库可能包含数十亿个高维向量。**穷举搜索 (Brute-force)** 需要计算查询向量与所有数据库向量的距离，复杂度为 \(O(N \cdot d)\)，其中 \(N\) 为数据库大小，\(d\) 为向量维度。当 \(N\) 达到百万甚至十亿级别时，穷举搜索的延迟完全无法接受。

传统的加速方法包括：
- **树结构 (KD-Tree, Ball Tree)**：在低维空间有效，但在高维空间（\(d > 20\)）退化为穷举搜索（维度灾难）
- **局部敏感哈希 (LSH)**：通过随机投影将相似向量映射到同一桶，但需要大量哈希表才能保证召回率，内存开销大

IVF 的核心洞察来自文本检索领域：**如果我们能将向量空间预先划分为若干区域，查询时只需搜索最相关的少数区域，就能大幅缩小搜索范围**。这正是文本搜索引擎中倒排索引的工作原理——每个"词"对应一个文档列表，查询时只检索包含查询词的文档。

> 💡 **关键直觉**：K-means 聚类将向量空间划分为 Voronoi 单元，查询向量的最近邻大概率落在与查询最近的几个聚类中。通过只搜索这几个聚类的倒排列表，搜索量从 \(N\) 降至 \(nprobe \cdot N/K\)。

##### 核心机制：粗量化与倒排索引

**1. 粗量化器 (Coarse Quantizer)**

IVF 的第一步是使用 K-means 算法将整个数据库的 \(N\) 个向量聚类为 \(K\) 个簇。每个聚类中心 \(c_k\) 定义了一个 Voronoi 单元：

$$V_k = \{\mathbf{x} \in \mathbb{R}^d : \|\mathbf{x} - c_k\| \leq \|\mathbf{x} - c_j\|, \forall j \neq k\}$$

典型的 \(K\) 值选择为 \(\sqrt{N}\) 到 \(4\sqrt{N}\)。例如，对于 \(N = 10^6\) 的数据库，\(K\) 通常设为 1024 到 4096。

**2. 倒排列表 (Inverted Lists)**

对于每个聚类中心 \(c_k\)，维护一个倒排列表 \(L_k\)，包含所有被分配到该 Voronoi 单元的向量。列表中存储的内容取决于具体实现：

| 存储方式 | 倒排列表内容 | 内存占用 | 精度 |
|---------|-------------|---------|------|
| IVFFlat | 原始向量 \(\mathbf{x}_i\) | \(N \cdot d \cdot 4\) 字节 | 精确 |
| IVFPQ (IVFADC) | PQ 编码的残差 \(PQ(\mathbf{x}_i - c_k)\) | \(N \cdot m\) 字节 | 近似 |
| IVFScalarQuantizer | 标量量化的残差 | \(N \cdot d\) 字节 | 近似 |

**3. 残差编码的重要性**

直接对原始向量进行 PQ 编码会引入较大的量化误差。IVF 的一个关键设计是**先减去聚类中心，再对残差进行编码**：

$$\mathbf{r}_i = \mathbf{x}_i - c_{q(\mathbf{x}_i)}$$

其中 \(q(\mathbf{x}_i)\) 是 \(\mathbf{x}_i\) 所属的聚类中心。残差向量的方差远小于原始向量，因此 PQ 编码的精度更高。

> ⚠️ **注意**：残差编码是 IVFADC 相比朴素 PQ 的关键改进。Jégou et al. (2011) 实验表明，残差编码可将 1-recall@100 从 0.35 提升至 0.45（SIFT1M 数据集）。

##### 搜索流程：多探针策略

查询时，IVF 的搜索分为两个阶段：

**阶段一：粗量化（Coarse Quantization）**

计算查询向量 \(\mathbf{q}\) 与所有 \(K\) 个聚类中心的距离，选出最近的 \(nprobe\) 个聚类：

$$\mathcal{S} = \text{nprobe-nearest}(\mathbf{q}, \{c_1, \ldots, c_K\})$$

此步复杂度为 \(O(K \cdot d)\)，通常 \(K \ll N\)，开销很小。

**阶段二：倒排列表内搜索**

仅在被选中的 \(nprobe\) 个倒排列表中搜索最近邻：

$$\text{NN}(\mathbf{q}) = \underset{i : q(\mathbf{x}_i) \in \mathcal{S}}{\text{argmin}} \|\mathbf{q} - \mathbf{x}_i\|^2$$

假设向量在聚类间均匀分布，每个列表平均包含 \(N/K\) 个向量，则搜索的向量总数为 \(nprobe \cdot N/K\)。

**nprobe 的精度-速度权衡**：

| nprobe | 搜索比例 (K=1024) | 典型 Recall@10 | 相对延迟 |
|--------|-------------------|---------------|---------|
| 1 | 0.1% | ~40% | 1× |
| 8 | 0.8% | ~80% | 8× |
| 32 | 3.1% | ~95% | 32× |
| 64 | 6.3% | ~98% | 64× |
| 1024 | 100% | 100% | 穷举 |

> 💡 **关键**：nprobe 是 IVF 最重要的运行时参数。实践中通常设为 \(K\) 的 1%~10%，在保证 >90% 召回率的同时实现 10~100 倍加速。

##### IVF+PQ (IVFADC)：内存高效的十亿级检索

IVFFlat 虽然搜索快，但仍需存储所有原始向量，内存占用为 \(N \cdot d \cdot 4\) 字节。对于 \(N = 10^9, d = 128\) 的场景，需要约 512 GB 内存。

**IVFADC (Inverted File with Asymmetric Distance Computation)** 由 Jégou et al. (2011) 提出，将 IVF 与乘积量化 (PQ) 结合：

1. **索引构建**：对每个向量的残差 \(\mathbf{r}_i = \mathbf{x}_i - c_{q(\mathbf{x}_i)}\) 进行 PQ 编码，倒排列表中仅存储 PQ 码（通常 8~16 字节/向量）
2. **非对称距离计算 (ADC)**：查询时，查询向量 \(\mathbf{q}\) 不进行量化，直接与 PQ 码本计算子空间距离表，再查表累加得到近似距离：

$$\hat{d}(\mathbf{q}, \mathbf{x}_i) = \sum_{j=1}^{m} \|q_j - c_j^{PQ}(r_{i,j})\|^2$$

其中 \(m\) 为 PQ 子空间数，\(q_j\) 为查询向量在第 \(j\) 个子空间的分量，\(c_j^{PQ}(r_{i,j})\) 为残差第 \(j\) 个子空间的 PQ 码本中心。

**内存对比**（\(N = 10^9, d = 128\)）：

| 方法 | 每向量内存 | 总内存 |
|------|----------|-------|
| Brute-force | 512 B | 512 GB |
| IVFFlat | 512 B + 聚类开销 | ~512 GB |
| IVFPQ (m=8) | 8 B + ID | ~16 GB |
| IVFPQ (m=16) | 16 B + ID | ~24 GB |

##### 与传统方法的区别

| 特性 | 穷举搜索 | LSH | KD-Tree | **IVF** | HNSW |
|------|---------|-----|---------|---------|------|
| 搜索复杂度 | \(O(Nd)\) | \(O(N^{\rho}d)\) | \(O(N^{1-1/d})\) | \(O(nprobe \cdot N/K \cdot d)\) | \(O(d \log N)\) |
| 索引构建 | 无 | \(O(NLd)\) | \(O(Nd \log N)\) | \(O(NKTd)\) (K-means) | \(O(Nd \log N)\) |
| 高维适应性 | ✓ | ✓ | ✗ | ✓ | ✓ |
| 可与 PQ 结合 | ✓ | ✗ | ✗ | **✓ (IVFADC)** | ✓ |
| 动态更新 | ✓ | ✓ | 需重建 | ✓ (追加到列表) | ✓ |
| 参数敏感性 | 无 | 哈希表数 L | 无 | **K, nprobe** | ef, M |

IVF 相比 HNSW 的优势在于：(1) 内存占用更低（尤其结合 PQ）；(2) 索引构建更快；(3) 更适合磁盘存储（倒排列表可分段加载）。HNSW 的优势在于单次查询延迟更低（对数复杂度 vs 线性扫描列表）。

##### 实践中的关键参数选择

- **聚类数 \(K\)**：通常取 \(\sqrt{N}\) 到 \(4\sqrt{N}\)。\(K\) 过小则每个列表太长，加速不明显；\(K\) 过大则聚类质量下降，且粗量化阶段开销增大
- **nprobe**：运行时参数，控制精度-速度权衡。通常从 1 开始逐步增大，直到召回率满足需求
- **PQ 子空间数 \(m\)**：决定每个向量的压缩比。\(m\) 越大精度越高但内存越大。常见选择为 8、16、32
- **训练集大小**：K-means 训练不需要全部数据，通常取 \(30K\) 到 \(256K\) 个样本即可

#### 🧪 练习题
```yaml
question: "在 IVF 索引中，增大 nprobe 参数的直接效果是什么？"
options:
  - "减少索引构建时间"
  - "降低每个向量的内存占用"
  - "提高搜索召回率但增加查询延迟"
  - "增加聚类中心的数量"
answer: 2
explain: "nprobe 控制查询时探测的聚类数量。增大 nprobe 意味着搜索更多的倒排列表，覆盖更多候选向量，因此召回率提高；但同时需要计算更多距离，查询延迟也相应增加。"
```

### Qwen3-VL-Embedding

```yaml
id: qwen3_vl_emb
num: 14
name: Qwen3-VL-Embedding
full_name: 通义千问多模态嵌入 (Qwen3-VL-Embedding)
year: '2026'
org: Alibaba
parent: blip2
paper_url: https://arxiv.org/abs/2601.04720
project_url: ''
category: frontier_2026
motivation: 统一检索与重排序框架
```

#### 📝 一句话总结
Qwen3-VL-Embedding 的核心目标是：统一检索与重排序框架。

#### 🎯 核心要点
- 核心动机：统一检索与重排序框架
- 演化来源：继承或改进自 blip2
- 代表机构：Alibaba

#### 🔬 深入细节
统一检索与重排序框架


### Retrv-R1

```yaml
id: retrv_r1
num: 15
name: Retrv-R1
full_name: 推理驱动多模态检索 (Retrv-R1)
year: '2026'
org: —
parent: clip
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/fac28e6ecee78ddcaa938d10bc90cf50-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 推理链驱动解决语义鸿沟
```

#### 📝 一句话总结
Retrv-R1 的核心目标是：推理链驱动解决语义鸿沟。

#### 🎯 核心要点
- 核心动机：推理链驱动解决语义鸿沟
- 演化来源：继承或改进自 clip
- 代表机构：—

#### 🔬 深入细节
推理链驱动解决语义鸿沟


### URaG

```yaml
id: urag
num: 16
name: URaG
full_name: 统一检索生成 (URaG)
year: '2026'
org: —
parent: blip2
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39729
project_url: ''
category: frontier_2026
motivation: 检索与生成深度耦合
```

#### 📝 一句话总结
URaG 的核心目标是：检索与生成深度耦合。

#### 🎯 核心要点
- 核心动机：检索与生成深度耦合
- 演化来源：继承或改进自 blip2
- 代表机构：—

#### 🔬 深入细节
检索与生成深度耦合


### UniME-V2

```yaml
id: unime_v2
num: 17
name: UniME-V2
full_name: 通用多模态嵌入v2 (UniME-V2)
year: '2026'
org: —
parent: imagebind
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39284
project_url: ''
category: frontier_2026
motivation: MLLM-as-a-Judge自动标注
```

#### 📝 一句话总结
UniME-V2 的核心目标是：MLLM-as-a-Judge自动标注。

#### 🎯 核心要点
- 核心动机：MLLM-as-a-Judge自动标注
- 演化来源：继承或改进自 imagebind
- 代表机构：—

#### 🔬 深入细节
MLLM-as-a-Judge自动标注
