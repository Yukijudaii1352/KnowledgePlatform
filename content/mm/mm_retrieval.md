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
VSE++ 将传统视觉语义嵌入的“所有负样本 hinge 求和”改为只优化 mini-batch 中最难的图像和文本负样本，解决了普通排序损失被大量容易负样本稀释的问题。它用极小的目标函数改动显著增强图文检索的判别边界。

#### 🎯 核心要点
- 提出 Max-of-Hinges 损失：每个正样本对只取当前 batch 内得分最高、最容易混淆的负图像和负文本
- 保留 VSE 双塔框架：图像编码器和句子编码器分别映射到同一嵌入空间，用余弦相似度排序
- 对比 Sum-of-Hinges：证明传统损失会让大量低风险负样本主导梯度，而不是集中修正近邻错误
- 支持更强视觉端：使用 ResNet-152 并微调图像编码器，进一步放大困难负样本训练的收益
- 使用数据增强和 mini-batch 内负样本挖掘，在 MS-COCO 与 Flickr30K 图文检索上明显提升 R@1

#### 🔬 深入细节
![VSE++ MH 损失行为分析](https://ar5iv.labs.arxiv.org/html/1707.05612/assets/images/sum_vs_max_f30k.png)
*图：论文 Figure 2 展示 Sum-of-Hinges 与 Max-of-Hinges 在 Flickr30K 训练中的行为差异。VSE++ 关注最高代价负样本，因此更直接优化检索排序前列的错误。*

```python
# VSE++ 训练伪代码
for images, captions in dataloader:
    img = l2_normalize(image_encoder(images))
    txt = l2_normalize(text_encoder(captions))
    scores = img @ txt.T

    pos = diag(scores)
    caption_cost = margin + scores - pos[:, None]   # image -> wrong captions
    image_cost = margin + scores - pos[None, :]     # caption -> wrong images

    caption_cost.fill_diagonal_(0)
    image_cost.fill_diagonal_(0)

    loss = relu(caption_cost).max(dim=1).values.mean()
    loss += relu(image_cost).max(dim=0).values.mean()
    loss.backward()
    optimizer.step()
```

VSE++ 的背景是图文检索中的联合嵌入学习：给定图像 \(i\) 和描述 \(c\)，模型学习两个编码器 \(f(i)\)、\(g(c)\)，并用相似度 \(s(i,c)=f(i)^\top g(c)\) 排序。检索指标 R@K 只关心正确结果是否排在前几名，因此真正危险的是那些得分接近甚至超过正样本的负例，而不是已经远离决策边界的普通负例。

传统 VSE 使用 Sum-of-Hinges 损失：

$$
\mathcal{L}_{SH}(i,c)=\sum_{c'\neq c}[\alpha+s(i,c')-s(i,c)]_+ + \sum_{i'\neq i}[\alpha+s(i',c)-s(i,c)]_+
$$

这里 \([x]_+=\max(x,0)\)，\(\alpha\) 是 margin。问题在于，求和会把许多“稍微违反 margin”的负例累加起来，使梯度不一定集中在最影响 R@1/R@5 的近邻错误上。VSE++ 改成 Max-of-Hinges：

$$
\mathcal{L}_{MH}(i,c)=\max_{c'\neq c}[\alpha+s(i,c')-s(i,c)]_+ + \max_{i'\neq i}[\alpha+s(i',c)-s(i,c)]_+
$$

这个公式的直觉很直接：对一张图，只惩罚当前最像它但不匹配的 caption；对一句话，只惩罚当前最像它但不匹配的 image。这样每个更新步骤都把正样本推离最近的错误邻居，优化目标和检索排序的失败模式更一致。

> 💡 关键：VSE++ 不是换架构，而是换训练信号。它把“全局平均变好”改成“最危险的局部排序错误必须先被修正”。

训练时的困难负样本通常只在 mini-batch 内搜索，因此 batch 越大，越可能采到真正困难的负例。论文还展示了微调图像编码器、使用更强 ResNet 特征和数据增强会进一步提升效果，因为更强的视觉表示让 hard negative 的差异更可学习。与后来的 SCAN、CLIP 相比，VSE++ 仍属于全局向量匹配范式，但它把“负样本质量”这件事推到了图文检索训练的中心。

#### 🧪 练习题
```yaml
question: "VSE++ 将 Sum-of-Hinges 改为 Max-of-Hinges 的主要目的是什么？"
options:
  - "减少图像编码器参数量"
  - "让训练集中优化 batch 内最容易混淆的负图像和负文本"
  - "把双塔模型改成跨注意力模型"
  - "避免使用余弦相似度"
answer: 1
explain: "Max-of-Hinges 只保留得分最高的错误负样本项，使梯度集中在最影响检索排序前列的混淆样本上。"
```

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
SCAN 提出堆叠交叉注意力，在没有显式区域-词标注的情况下推断图像区域与句子词语的潜在对齐，解决全局向量匹配忽略细粒度语义对应的问题。它让图文检索从“整图对整句”推进到“区域对词语”的可解释匹配。

#### 🎯 核心要点
- 使用 Faster R-CNN bottom-up attention 提取显著图像区域，而不是只用整图 CNN 特征
- 文本端用双向 GRU 编码词序列，保留每个词的上下文表示
- 提出 Image-Text 与 Text-Image 两个方向的 Stacked Cross Attention
- 第一阶段跨模态注意力生成局部对齐表示，第二阶段计算局部对齐质量并聚合为全局相似度
- 提供 AVG 与 LogSumExp 聚合，分别强调整体一致性和高置信局部匹配
- 训练使用 hardest negative triplet loss，继承并强化 VSE++ 的困难负样本思想

#### 🔬 深入细节
![SCAN Image-Text 堆叠交叉注意力](https://ar5iv.labs.arxiv.org/html/1803.08024/assets/x2.png)
*图：论文 Figure 2 的 Image-Text SCAN。每个图像区域先注意句子词语生成 attended sentence vector，再与原区域比较得到区域级对齐分数。*

![SCAN Text-Image 堆叠交叉注意力](https://ar5iv.labs.arxiv.org/html/1803.08024/assets/x3.png)
*图：论文 Figure 3 的 Text-Image SCAN。每个词反向注意图像区域，适合突出句子中最关键的实体、属性和动作。*

```python
# SCAN 相似度与训练伪代码
def scan_similarity(regions, words, direction="image_text"):
    sim = cosine_matrix(regions, words)
    sim = relu(sim)  # thresholded similarity, 去除负相关噪声

    if direction == "image_text":
        alpha = softmax(lambda1 * sim, dim="words")
        attended_text = alpha @ words
        local_scores = cosine(regions, attended_text)
    else:
        beta = softmax(lambda1 * sim, dim="regions")
        attended_regions = beta.T @ regions
        local_scores = cosine(words, attended_regions)

    return logsumexp(lambda2 * local_scores) / lambda2  # 或 mean(local_scores)

for image, caption in batch:
    pos = scan_similarity(image, caption)
    neg_caption = argmax_caption_in_batch(scan_similarity(image, other_caption))
    neg_image = argmax_image_in_batch(scan_similarity(other_image, caption))
    loss = relu(margin - pos + sim(image, neg_caption))
    loss += relu(margin - pos + sim(neg_image, caption))
```

SCAN 的动机来自 VSE/VSE++ 的局限：全局图像向量和全局句子向量能表达整体语义，却很难说明“哪一个区域对应哪一个词”。对于 “a young boy holding a tennis racket” 这类句子，检索失败通常不是整图主题错了，而是实体、属性或动作局部对不上。

在 Image-Text 方向，给定区域特征 \(V=\{v_i\}_{i=1}^k\) 和词特征 \(E=\{e_j\}_{j=1}^n\)，先计算区域-词相似度，并用截断后的 softmax 得到注意力：

$$
\alpha_{ij}=\frac{\exp(\lambda_1[\cos(v_i,e_j)]_+)}{\sum_{j'=1}^{n}\exp(\lambda_1[\cos(v_i,e_{j'})]_+)}
$$

其中 \([\cdot]_+\) 把负相似度置零，避免无关词被强行纳入对齐。随后每个区域得到一个对应的文本语义向量：

$$
a_i^t=\sum_{j=1}^{n}\alpha_{ij}e_j,\quad R_i=\cos(v_i,a_i^t)
$$

最终将局部分数 \(R_i\) 聚合成图文相似度。AVG 适合整体描述都准确的情况；LogSumExp 是 max pooling 的平滑形式，更强调少数高度匹配的关键区域：

$$
S_{LSE}(I,T)=\frac{1}{\lambda_2}\log\sum_i \exp(\lambda_2R_i)
$$

Text-Image 方向完全对称，只是查询从“区域”变为“词”。这让模型能回答另一个问题：句子中的某个词是否能在图像中找到对应区域。两个方向和两种聚合方式可以互补集成。

> 💡 关键：SCAN 的“堆叠”不是多层 Transformer，而是先做跨模态软对齐，再基于对齐结果估计局部重要性。它把相似度计算拆成了“找对应关系”和“评估对应关系”两步。

训练目标仍是硬负样本三元组损失。对于正样本 \((I,T)\)，在 batch 中找最相似的错误文本 \(\hat{T}\) 和错误图像 \(\hat{I}\)：

$$
\mathcal{L}=[\alpha-S(I,T)+S(I,\hat{T})]_+ + [\alpha-S(I,T)+S(\hat{I},T)]_+
$$

因此 SCAN 同时结合了区域级细粒度对齐和 VSE++ 的 hardest negative 训练信号，成为后续 OSCAR 等对象锚点预训练方法的重要前序。

#### 🧪 练习题
```yaml
question: "SCAN 的第一阶段交叉注意力主要在做什么？"
options:
  - "把整张图像压缩成一个全局向量"
  - "为每个区域或词语寻找另一模态中最相关的软对齐表示"
  - "直接生成图像描述文本"
  - "用对象标签替换视觉区域特征"
answer: 1
explain: "SCAN 先根据区域-词相似度计算注意力权重，生成 attended text 或 attended image，再用第二阶段评估局部对齐质量。"
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
OSCAR 将目标检测器输出的对象标签加入视觉语言预训练输入，使对象词同时连接视觉区域和语言 token，解决纯区域特征与文本语义空间难以对齐的问题。它把弱监督图文预训练改造成带显式对象锚点的三元组学习。

#### 🎯 核心要点
- 将输入从 \((w,v)\) 扩展为 \((w,q,v)\)：文本词 \(w\)、对象标签 \(q\)、图像区域特征 \(v\)
- 对象标签来自 Faster R-CNN 检测结果，在语言空间中与文本共享词嵌入，在视觉来源上与区域特征绑定
- 使用 BERT 初始化的单流 Transformer 融合 word tokens、object tags 与 region features
- 预训练目标包含 Masked Token Loss 和基于标签替换的 Contrastive Loss
- 预训练语料约 6.5M 图文对，覆盖 COCO、Flickr30K、GQA、Conceptual Captions、SBU 等
- 在图文检索、VQA、GQA、NLVR2、Image Captioning、NoCaps 等理解与生成任务上迁移

#### 🔬 深入细节
![OSCAR 三元组架构](https://ar5iv.labs.arxiv.org/html/2004.06165/assets/x5.png)
*图：论文 Figure 3。OSCAR 把 image-text pair 表示为 [word tokens, object tags, region features]，其中 object tags 是跨模态语义对齐的 anchor points。*

```python
# OSCAR 预训练伪代码
for image, text in corpus:
    regions, tags = faster_rcnn(image)       # v: region features, q: object tags
    word_tokens = tokenize(text)             # w

    x = concat(word_tokens, tags, regions)
    h = transformer(x)

    # 字典视角：mask 文本词和对象标签
    masked_tokens = random_mask(word_tokens + tags, p=0.15)
    loss_mtl = cross_entropy(predict(masked_tokens, h), target_tokens)

    # 模态视角：替换对象标签构造污染样本
    if random() < 0.5:
        tags = sample_tags_from_other_image()
        label = 0
    else:
        label = 1
    h_cls = transformer(concat(word_tokens, tags, regions))[CLS]
    loss_c = binary_cross_entropy(match_head(h_cls), label)

    loss = loss_mtl + loss_c
    loss.backward()
```

传统 VLP 方法通常把文本 token 和区域特征直接拼接，让 Transformer 自注意力自己学跨模态关系。但区域特征是连续视觉向量，文本 token 是离散词语嵌入，二者语义空间差异大；而且图文对只有弱监督，没有告诉模型哪个词对应哪个区域。

OSCAR 的关键洞察是：图像中的显著对象经常会出现在配对文本中，并且现代检测器能给出较准确的对象类别词。对象标签 \(q\) 因此具有双重身份：它是从图像检测来的，和区域特征 \(v\) 同源；它又是自然语言词，和文本 \(w\) 共享词表与 BERT 语义空间。

形式上，OSCAR 的输入可从两个视角理解：

$$
\boldsymbol{x}=[\underbrace{\boldsymbol{w}}_{\text{language}},\underbrace{\boldsymbol{q},\boldsymbol{v}}_{\text{image}}]
=[\underbrace{\boldsymbol{w},\boldsymbol{q}}_{\text{dictionary}},\underbrace{\boldsymbol{v}}_{\text{visual}}]
$$

Masked Token Loss 从“字典视角”工作：随机 mask 文本词和对象标签，让模型结合上下文和图像区域预测被遮盖 token：

$$
\mathcal{L}_{MTL}=-\mathbb{E}\log p(h_i\mid h_{\backslash i},v)
$$

Contrastive Loss 从“模态视角”工作：以一定概率把对象标签替换成其他图片的标签，训练 \([CLS]\) 表示判断当前文本、标签和区域是否匹配：

$$
\mathcal{L}_{C}=-\mathbb{E}\log p(y\mid f(w,q,v))
$$

> 💡 关键：OSCAR 不是简单增加几个类别词，而是让对象词成为“语言空间里的视觉证据”。移除 \(q\) 后，模型退化为常规的区域特征 + 文本 token 预训练。

与 SCAN 的区域-词注意力相比，OSCAR 将对齐信号前移到预训练阶段，并用对象标签提供显式锚点。SCAN 需要在检索相似度计算时动态推断区域和词的软对齐；OSCAR 则让 Transformer 在大规模预训练中反复看到“区域-对象标签-文本词”的三角关系，从而提升下游理解和生成任务的可迁移性。

#### 🧪 练习题
```yaml
question: "OSCAR 中对象标签 q 的核心作用是什么？"
options:
  - "完全替代图像区域特征，降低视觉计算量"
  - "作为跨模态锚点，把视觉区域特征和文本语义空间连接起来"
  - "只用于最终分类头，不参与预训练输入"
  - "将单流 Transformer 改成双流 Transformer"
answer: 1
explain: "对象标签来自图像检测，同时又是语言词，能在视觉来源和文本语义空间之间建立显式桥接。"
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
ViLT 提出不依赖 CNN 或目标检测器的视觉语言 Transformer，把图像直接切成 patch 后与文本 token 一起送入多模态 Transformer，解决传统 VLP 大量计算耗在视觉特征提取上的效率瓶颈。它用极简视觉嵌入换取更快的端到端预训练和推理。

#### 🎯 核心要点
- 去除 Faster R-CNN 区域监督和卷积视觉 backbone，只用 patch projection 生成图像 token
- 将文本 token、图像 patch token、位置嵌入和模态类型嵌入输入同一个 Transformer
- 论文将 VLP 组件拆成 Visual Embedder、Textual Embedder、Modality Interaction，ViLT 把主要计算集中到 MI
- 预训练目标包括 Image-Text Matching、Masked Language Modeling 和 Word-Patch Alignment
- WPA 用最优传输近似衡量词 token 与图像 patch token 的细粒度对齐
- 在速度上比依赖区域检测器的 VLP 模型快很多，同时保持有竞争力的下游性能

#### 🔬 深入细节
![ViLT 模型总览](https://ar5iv.labs.arxiv.org/html/2102.03334/assets/x3.png)
*图：论文 Figure 3。ViLT 将图像 patch 与文本 token 拼接，加入模态和位置嵌入后直接进入 Transformer，实现无卷积、无区域监督的视觉语言融合。*

```python
# ViLT 预训练伪代码
for image, text in dataloader:
    patches = split_into_patches(image, patch_size=32)
    v_tokens = linear_projection(patches) + image_pos_embed + image_type_embed
    t_tokens = word_embedding(tokenize(text)) + text_pos_embed + text_type_embed

    sequence = concat([CLS], t_tokens, v_tokens)
    hidden = transformer(sequence)

    loss_mlm = masked_language_modeling(hidden.text_tokens)
    loss_itm = binary_match_loss(hidden.cls, matched_or_mismatched_label)
    loss_wpa = optimal_transport_distance(hidden.text_tokens, hidden.image_tokens)

    loss = loss_mlm + loss_itm + 0.1 * loss_wpa
    loss.backward()
```

ViLT 的核心动机是重新审视 VLP 的计算分布。许多早期模型虽然把 Transformer 用于跨模态交互，但视觉端先要经过 ResNet 或 Faster R-CNN，尤其是 per-class NMS 和区域特征提取非常慢。论文指出，这让“输入特征提取”比真正的多模态交互更重，模型表达能力也被检测器的视觉词表限制。

ViLT 的做法是把视觉输入处理成类似 BERT token 的形式。图像被划分为固定大小 patch，每个 patch 展平后用线性层投影到隐藏维度；文本用普通 token embedding。两类 token 加上位置编码和 modality embedding 后拼接，由同一个 Transformer 学习跨模态关系。

预训练目标之一是 ITM，将 \([CLS]\) 的融合表示送入二分类头，判断图文是否匹配：

$$
\mathcal{L}_{ITM}=-y\log p_{\theta}(y=1\mid I,T)-(1-y)\log p_{\theta}(y=0\mid I,T)
$$

MLM 与 BERT 类似，mask 文本词并根据完整图像上下文预测词。Word-Patch Alignment 则补上“没有区域检测器后如何学习细粒度对齐”的问题：它取文本子集和视觉 patch 子集，通过最优传输计算近似 Wasserstein 距离，并把该距离以小权重加到 ITM 损失中。

> ⚠️ 注意：ViLT 的“纯 Transformer”不是说没有任何线性图像嵌入，而是没有重型卷积网络和目标检测器。视觉端只保留 patch projection 这种轻量映射。

与 OSCAR 相比，ViLT 不再使用对象标签作为显式锚点，也不依赖区域特征；与 CLIP/ALIGN 相比，它不是纯双塔，而是在 Transformer 内直接进行图文 token 交互。因此 ViLT 更适合 VQA、NLVR2 等需要细粒度融合的任务，但在大规模检索场景中通常不如双塔模型易于预计算全库向量。

#### 🧪 练习题
```yaml
question: "ViLT 相比 OSCAR 等区域特征 VLP 模型的关键变化是什么？"
options:
  - "用对象标签替代所有文本 token"
  - "去除目标检测器和卷积视觉特征提取，直接使用图像 patch token"
  - "只训练图像编码器，不训练文本编码器"
  - "放弃 Transformer，改用 GRU 融合图文"
answer: 1
explain: "ViLT 的核心是把图像处理简化为 patch projection，并让图像 patch 与文本 token 直接进入同一个 Transformer。"
```

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
CLIP 用 4 亿互联网图文对训练图像编码器和文本编码器，通过对称对比学习把自然语言描述变成可迁移的视觉监督，解决传统分类模型只能预测固定标签空间、迁移到新任务依赖再标注的问题。

#### 🎯 核心要点
- 训练数据是 WebImageText：约 4 亿个从互联网收集的图像-文本对
- 采用双编码器结构：图像塔为 ResNet 或 ViT，文本塔为 Transformer，二者输出同维度归一化向量
- 使用 batch 内所有非配对样本作为负样本，训练目标是让正确图文对在相似度矩阵对角线上得分最高
- 损失是对称的 image-to-text 与 text-to-image 交叉熵，配合可学习温度参数控制 softmax 尖锐度
- 零样本分类通过 prompt 模板把类别名转成文本嵌入，文本嵌入直接充当分类器权重
- 推理阶段图像和文本可以独立编码，因此天然适合大规模图文检索、向量库召回和开放词表分类
- 论文系统展示了自然语言监督的可扩展性，同时也指出 CLIP 对分布偏移、细粒度计数和抽象推理仍有限制

#### 🔬 深入细节
##### 框架总览

![CLIP 方法总览](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png)
*图：论文 Figure 1。CLIP 训练时预测 batch 内正确图文配对；测试时用文本编码器把类别 prompt 转成零样本分类器。*

##### CLIP 训练与零样本分类伪代码

```python
# CLIP 的核心训练循环
for images, texts in web_image_text_loader:
    image_features = image_encoder(images)      # ResNet 或 ViT
    text_features = text_encoder(texts)         # Transformer

    image_features = l2_normalize(image_projection(image_features))
    text_features = l2_normalize(text_projection(text_features))

    # N x N 相似度矩阵；对角线是正确配对
    logits = exp(logit_scale) * image_features @ text_features.T
    labels = arange(batch_size)

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    loss = (loss_i2t + loss_t2i) / 2

    loss.backward()
    optimizer.step()

# 零样本分类：类别名经 prompt 模板变成文本分类器
prompts = [f"a photo of a {class_name}" for class_name in class_names]
class_emb = l2_normalize(text_encoder(prompts))
image_emb = l2_normalize(image_encoder(image))
prediction = argmax(image_emb @ class_emb.T)
```

##### 方法细节

CLIP 的出发点是监督信号瓶颈。传统 ImageNet 训练把图像映射到固定的 1000 类，这种监督很干净，但标签空间窄、扩展成本高，而且迁移到新类别需要重新标注。互联网图像天然带有标题、alt-text、周边文字或用户描述，虽然噪声大，却覆盖了更开放的概念空间。CLIP 的关键判断是：与其继续人工扩充固定标签集，不如直接学习图像和自然语言之间的匹配关系。

结构上，CLIP 刻意选择双编码器而不是跨注意力融合模型。图像编码器 \(f_\theta(I)\) 和文本编码器 \(g_\phi(T)\) 独立输出向量，再投影到同一嵌入空间并做 L2 归一化：

$$
v_i=\frac{f_\theta(I_i)}{\lVert f_\theta(I_i)\rVert_2},\qquad
u_j=\frac{g_\phi(T_j)}{\lVert g_\phi(T_j)\rVert_2}
$$

给定一个 batch 的 \(N\) 个匹配图文对，CLIP 构造相似度矩阵：

$$
S_{ij}=\exp(\tau)\,v_i^\top u_j
$$

其中 \(\tau\) 是可学习的 logit scale。因为向量被归一化，点积本质上是余弦相似度；温度缩放控制 softmax 分布的尖锐程度，避免 batch 很大时正负样本分数差异过小。

训练目标是对称 InfoNCE。每张图像要在 \(N\) 条文本中找回自己的文本，每条文本也要在 \(N\) 张图像中找回自己的图像：

$$
\mathcal{L}_{i2t}
=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(S_{ii})}{\sum_{j=1}^{N}\exp(S_{ij})}
$$

$$
\mathcal{L}_{t2i}
=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(S_{ii})}{\sum_{j=1}^{N}\exp(S_{ji})}
$$

$$
\mathcal{L}_{CLIP}=\frac{1}{2}\left(\mathcal{L}_{i2t}+\mathcal{L}_{t2i}\right)
$$

这个损失的工程价值很高：batch 中其他 \(N-1\) 个样本自动成为负样本，不需要人工构造 hard negatives；图像和文本塔也可以分布式并行训练，只需在计算相似度前聚合 embedding。

CLIP 的零样本分类来自同一个嵌入空间。对一个下游类别集合 \(\mathcal{C}\)，不是训练新的线性层，而是把类别名写入 prompt，例如 “a photo of a {label}”，得到文本向量 \(u_c\)。图像 \(I\) 的类别概率可以写成：

$$
p(y=c\mid I)=
\frac{\exp(\exp(\tau)\,v_I^\top u_c)}
{\sum_{c'\in\mathcal{C}}\exp(\exp(\tau)\,v_I^\top u_{c'})}
$$

因此，文本编码器在推理时相当于动态分类器生成器。改变 prompt 模板、加入同义词或对多个模板做 ensemble，都会改变分类边界；这也是论文中 prompt engineering 能显著影响零样本精度的原因。

与早期视觉语言模型相比，CLIP 的取舍非常清楚。跨注意力模型能做更细粒度的 token-region 交互，但每个图文候选对都要一起前向，无法高效服务亿级检索库。CLIP 的双塔结构让图像库和文本库都能离线编码，在线阶段只需点积或近似最近邻搜索，因此更适合开放词表检索和大规模召回。

CLIP 也不是“理解视觉语言”的终点。它主要学习全局图文对齐，容易受数据偏见、prompt 表达和语境歧义影响；对计数、空间关系、细粒度属性组合、OCR 长文本和需要多步推理的任务并不稳定。后续 ALIGN、SigLIP、LiT、BLIP 系列和多模态大模型，很大程度上都是在 CLIP 打开的自然语言监督路线基础上继续改进数据规模、损失函数、模型交互方式或生成能力。

> 💡 关键：CLIP 的核心贡献不是某个复杂模块，而是证明“大规模噪声图文对 + 双塔对比学习 + prompt 形式的标签描述”可以把视觉模型从封闭标签空间推向开放词表迁移。

#### 🧪 练习题
```yaml
question: "CLIP 为什么可以做零样本图像分类？"
options:
  - "它在预训练时已经见过所有下游测试图像"
  - "它可以把类别名称或 prompt 编码成文本向量，并直接与图像向量比较"
  - "它在推理时先训练一个新的线性分类头"
  - "它使用目标检测器输出所有候选类别框"
answer: 1
explain: "CLIP 学到共享图文嵌入空间，类别文本向量可以充当分类器权重，因此新类别可通过自然语言 prompt 动态定义。"
```

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
ALIGN 提出用 18 亿规模噪声网页 alt-text 图文对训练简单双编码器，解决视觉语言预训练长期依赖昂贵人工清洗数据的问题。它的核心结论是：在足够大规模下，轻量过滤的噪声数据配合标准对比学习，也能得到强零样本分类和大规模图文检索表示。

#### 🎯 核心要点
- 数据路线：从网页 alt-text 构建约 1.8B 图文对，只做色情、尺寸、宽高比、重复、过短/过长文本、高频模板文本等轻量过滤
- 架构路线：采用图像编码器 EfficientNet 与文本编码器 BERT 的双塔结构，图像和文本可独立编码为同一维度的 L2 归一化向量
- 训练目标：使用双向 normalized softmax 对比损失，batch 内正确图文对为正样本，其他组合自动作为 in-batch negatives
- 工程缩放：跨 TPU 核心 all-gather 嵌入扩大负样本池，并把温度参数 \(\sigma\) 设为可学习变量
- 任务迁移：同一嵌入空间支持零样本分类、text-to-image、image-to-text、image+text 组合查询和 CxC 跨/同模态相似检索
- 与 CLIP 的差异：ALIGN 不依赖人工构造高频概念 allowlist，而是更直接地利用网页原始 alt-text 分布验证“规模抵消噪声”

#### 🔬 深入细节
![ALIGN 方法总览](https://ar5iv.labs.arxiv.org/html/2102.05918/assets/x1.png)
*图：论文 Figure 1。ALIGN 从噪声图文对学习共享嵌入，训练后同一表示可迁移到零样本分类、图文互检索以及图像+文本组合查询。*

```python
# ALIGN 双塔对比学习伪代码
for images, alt_texts in noisy_web_pairs:
    image_emb = image_encoder(images)        # EfficientNet family
    text_emb = text_encoder(alt_texts)       # BERT [CLS] representation

    image_emb = l2_normalize(project_image(image_emb))
    text_emb = l2_normalize(project_text(text_emb))

    # 分布式训练中聚合所有设备上的嵌入，扩大 in-batch negatives
    image_global = all_gather(image_emb)
    text_global = all_gather(text_emb)

    logits = image_global @ text_global.T / sigma
    labels = arange(global_batch_size)

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    loss = loss_i2t + loss_t2i

    loss.backward()
    optimizer.step()
```

ALIGN 的动机来自一个很具体的瓶颈：传统视觉模型通常依赖 ImageNet、OpenImages、JFT 等显式类别标签，视觉语言模型又依赖 Conceptual Captions、MSCOCO、Visual Genome 这类经过复杂清洗或人工标注的数据。清洗越精细，数据规模越难继续扩大；而网页 alt-text 虽然有文件名、模板、广告词和错误描述等噪声，却覆盖大量长尾实体、商品、艺术作品和事件。ALIGN 的取舍是放弃重度语义清洗，只做低成本过滤，把算法问题改写成“一个简单对比目标能否吃下足够大的噪声分布”。

数据过滤策略体现了这种取舍。图像侧过滤色情内容、短边小于 200 像素、宽高比过大、同一图片关联 alt-text 过多以及和评测集近重复的样本；文本侧移除被过多图片共享的模板文本、包含极罕见 token 的文本，以及少于 3 个 unigram 或多于 20 个 unigram 的文本。这些规则不能保证每个 caption 都正确，但能移除最明显的垃圾样本，同时保留网页分布中的长尾多样性。论文中随机样例也显示，数据仍然有明显噪声，因此 ALIGN 的贡献不是“构造干净数据集”，而是验证噪声可被规模与对比学习吸收。

模型结构刻意保持工业检索友好。图像塔用 EfficientNet，文本塔用 BERT 的 \([CLS]\) 表示，再通过线性层投影到同一嵌入维度；两个向量都做 L2 归一化，因此相似度就是余弦相似度。给定一个 batch 中 \(N\) 个匹配图文对，归一化图像向量为 \(x_i\)，文本向量为 \(y_j\)，image-to-text 损失为：

$$
\mathcal{L}_{i2t}=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(x_i^\top y_i/\sigma)}
{\sum_{j=1}^{N}\exp(x_i^\top y_j/\sigma)}
$$

text-to-image 损失完全对称：

$$
\mathcal{L}_{t2i}=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(y_i^\top x_i/\sigma)}
{\sum_{j=1}^{N}\exp(y_i^\top x_j/\sigma)},\qquad
\mathcal{L}=\mathcal{L}_{i2t}+\mathcal{L}_{t2i}
$$

这里的 \(\sigma\) 是可学习温度。由于 \(x_i\) 和 \(y_j\) 都被归一化，点积被限制在 \([-1,1]\)，softmax 的尖锐程度高度依赖温度；如果温度过大，正负样本概率差异不足，如果过小，梯度会被少数 hardest negatives 主导。ALIGN 让温度和模型参数一起学习，减少在不同 batch size、噪声强度和模型规模下手工扫参的成本。

> 💡 关键：ALIGN 的负样本不是额外标注出来的，而是 batch 中其他图文组合。跨设备 all-gather 让每次 softmax 看到更大的候选集合，因此 batch size 同时影响统计效率、负样本难度和通信成本。

训练完成后，ALIGN 的双塔结构带来两类能力。第一类是检索：图像库和文本库都可以离线编码，在线阶段只需 ANN 向量检索或矩阵点积排序，因此比跨注意力融合模型适合大规模服务。第二类是零样本分类：把类别名写成 prompt，编码成文本向量，图像向量与这些类别文本向量比较即可得到分类器。这与 CLIP 的推理方式一致，但 ALIGN 的经验重点在于更原始、更噪声、更大的网页 alt-text 训练语料。

与 OSCAR、ViLT、UNITER 等融合式视觉语言模型相比，ALIGN 不在编码阶段做 token-region 交互，也不依赖目标检测器产生区域特征；它牺牲了一部分细粒度推理能力，换来向量可预计算、库规模可扩展和任务接口统一。与 CLIP 相比，二者共享双塔对比学习范式，但 CLIP 的 WebImageText 构建依赖高频视觉概念筛选，ALIGN 则强调最小清洗的自然 alt-text 分布。这个差异使 ALIGN 成为后续 WebLI、LAION、SigLIP 等大规模图文预训练工作的直接前序。

ALIGN 还展示了“组合查询”的实用意义：将图像嵌入与文本嵌入按一定比例相加，再用归一化后的混合向量检索图像，可以表达“像这张图但带有某个文本属性”的需求。这个能力不是来自额外的组合模块，而是来自图像和语言被压到同一几何空间后，属性方向在嵌入空间中近似可加。实际系统仍需处理偏见、网页有害文本和文化分布不均等风险，但从算法角度看，ALIGN 把多模态检索问题简化成了可大规模部署的向量空间学习问题。

#### 🧪 练习题
```yaml
question: "ALIGN 能在噪声 alt-text 数据上取得强检索效果，最关键的算法与工程组合是什么？"
options:
  - "复杂跨注意力模型逐 token 重排序所有候选"
  - "人工清洗每一条 caption 后再训练小规模分类器"
  - "超大规模图文对、双塔编码器、双向 in-batch softmax 对比学习"
  - "只训练文本编码器并固定图像特征"
answer: 2
explain: "ALIGN 的核心是用 18 亿级噪声图文对训练可独立编码的图文双塔，并通过双向对比损失利用 batch 内负样本对齐共享嵌入空间。"
```

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
SigLIP 提出用逐对 sigmoid 二分类损失替代 CLIP/ALIGN 的 batch-level softmax 对比损失，解决大 batch 图文预训练中全局归一化带来的内存与通信压力。它保留双塔检索能力，同时让每个图文 pair 的损失项可独立计算，更适合资源受限或分块分布式训练。

#### 🎯 核心要点
- 损失函数：把图文对齐从 \(N\) 类 softmax 分类改成 \(N^2\) 个 pairwise 二分类项，对角线为正样本，非对角线为负样本
- 可学习参数：保留温度 \(t=\exp(t')\)，新增偏置 \(b\) 处理正负 pair 极度不均衡，论文使用负偏置初始化让训练先验接近“多数 pair 不匹配”
- 计算优势：sigmoid loss 不需要对整行/整列相似度做全局 softmax 归一化，单个 pair 的损失只依赖自己的 logit
- 分布式实现：支持 chunked/ring-style 交换文本或图像块，局部累加损失，避免每个设备完整物化 \(|B|\times|B|\) 全局相似度矩阵
- 经验结论：在小于 16k 的 batch 下 sigmoid 明显优于 softmax，32k 左右 batch 已接近收益饱和，继续推到百万 batch 收益有限
- 模型接口：沿用 CLIP 式图像塔与文本塔，推理阶段仍可做零样本分类、图文检索和向量库召回

#### 🔬 深入细节
![SigLIP sigmoid loss 伪代码](https://raw.githubusercontent.com/ahmdtaha/distributed_sigmoid_loss/main/imgs/sigmoid_loss_pseudo_implementation.png)
*图：SigLIP 论文 Algorithm 1 的 sigmoid loss 伪实现公开转存图。它构造对角线为 \(+1\)、非对角为 \(-1\) 的标签矩阵，并对所有图文组合累加 log-sigmoid 损失。*

```python
# SigLIP pairwise sigmoid loss 伪代码
def siglip_loss(image_emb, text_emb, t_prime, bias):
    t = exp(t_prime)
    z_img = l2_normalize(image_emb)
    z_txt = l2_normalize(text_emb)

    logits = z_img @ z_txt.T * t + bias
    labels = 2 * eye(batch_size) - ones(batch_size, batch_size)  # +1 diagonal, -1 otherwise
    loss = -log_sigmoid(labels * logits).sum() / batch_size
    return loss

# chunked distributed sketch
for local_images, local_texts in device_batch:
    img = image_encoder(local_images)
    txt_block = text_encoder(local_texts)
    total_loss = local_positive_and_negative_loss(img, txt_block)
    for _ in range(num_devices - 1):
        txt_block = send_to_next_and_receive_from_prev(txt_block)
        total_loss += negative_loss_against_received_texts(img, txt_block)
    total_loss.backward()
```

CLIP/ALIGN 的 softmax 对比损失把每张图像看成一个 batch 内 \(N\) 类分类问题：正确文本是唯一正类，其余 \(N-1\) 个文本是负类；同时再做一次 text-to-image 方向。这个目标效果强，但它的概率分母依赖整行或整列所有相似度。分布式训练时，为了计算这些分母，通常要 all-gather 所有设备上的图像/文本嵌入，并在设备上物化大矩阵；batch size 越大，内存、通信、数值稳定化中的额外 pass 都越贵。

SigLIP 的核心改写是把 batch 分类问题变成 pairwise binary classification。给定图像编码器 \(f(\cdot)\)、文本编码器 \(g(\cdot)\)，令 \(x_i=f(I_i)\)、\(y_j=g(T_j)\) 为 L2 归一化嵌入，标签为：

$$
z_{ij}=
\begin{cases}
1, & i=j \\
-1, & i\neq j
\end{cases}
$$

则 sigmoid loss 写作：

$$
\mathcal{L}=-\frac{1}{|B|}
\sum_{i=1}^{|B|}\sum_{j=1}^{|B|}
\log\sigma\left(z_{ij}\left(t\,x_i^\top y_j+b\right)\right)
$$

其中 \(t=\exp(t')\) 是可学习温度，\(b\) 是可学习偏置。温度仍然控制相似度尺度，偏置则是 SigLIP 相比朴素二分类对比损失的关键补丁：一个 batch 中正样本只有 \(|B|\) 个，负样本有 \(|B|^2-|B|\) 个，初始化时负样本项会压倒梯度。论文用负偏置初始化，使模型一开始就倾向于判断“随机图文 pair 不匹配”，避免早期优化步被类别不均衡强行拉偏。

> 💡 关键：softmax 的一个样本概率必须“看见”整行或整列候选；SigLIP 的每个 \((i,j)\) 项是局部二分类损失，因此可以分块计算、交换块、累加标量损失。

chunked 实现的直觉很简单。假设全局 batch 被切到 \(D\) 个设备上，每个设备有 \(b\) 对图文。设备先计算本地 \(b\times b\) 块，其中包含 \(b\) 个正 pair 和本地负 pair；随后把文本块按环形发送给下一个设备，每轮只计算当前图像块与收到文本块之间的负样本损失。重复 \(D-1\) 轮后，每个设备已经覆盖了所有跨设备负样本，但任一时刻只需保存一个小块相似度矩阵，而不是全局 \(|B|\times|B|\) 矩阵。

与 softmax 的优化语义相比，SigLIP 也改变了 batch size 的角色。softmax 中 batch size 直接定义分类任务的类别数，batch 变大通常意味着每个正样本面对更多负类；sigmoid 中损失定义不依赖全局归一化，batch size 更多决定每步采样多少 pair、正负比例以及梯度估计质量。论文系统扫描 batch size 后发现，小 batch 下 sigmoid 优势明显；随着 batch 增大，softmax 会逐渐追上，但 32k 附近已经接近最优，继续扩大到数十万甚至百万 batch 的收益很快变小。

在模型使用层面，SigLIP 不是新的跨模态融合架构，而是替换了 CLIP/ALIGN 训练目标。图像塔可用 ViT，文本塔为 Transformer；训练完成后依然输出可独立预计算的图像/文本向量。因此它对部署链路的影响集中在训练端：更低峰值内存、更简单的分布式 loss、更可接受的小资源训练配方；推理端仍然保持双塔模型的零样本分类和 ANN 检索优势。

SigLIP 还解释了为什么“更大 batch”不是无限收益。超大 batch 会减少每个 epoch 的更新步数，若训练总样本数固定，优化动态可能变慢；同时许多负样本已经足够容易，继续增加随机负样本对梯度的信息量有限。sigmoid loss 的价值因此不只是能塞进更大 batch，而是把 batch size 从 loss 定义中解耦出来，让研究者可以根据硬件、数据噪声、训练时长和负样本比例选择更合理的点。

#### 🧪 练习题
```yaml
question: "SigLIP 中引入可学习偏置 b 的主要原因是什么？"
options:
  - "让文本编码器输出更长的 token 序列"
  - "补偿 batch 内正 pair 少、负 pair 多造成的二分类先验不均衡"
  - "替代图像编码器中的位置编码"
  - "保证推理阶段必须使用跨注意力重排序"
answer: 1
explain: "Sigmoid loss 会对所有图文组合做二分类，一个 batch 中负 pair 数量远多于正 pair；负偏置初始化让模型从多数 pair 不匹配的合理先验开始训练。"
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
BLIP 提出统一理解与生成的视觉语言预训练框架，并用 CapFilt 让 captioner 生成更干净的合成描述、filter 移除噪声图文对，解决网页图文数据质量低和模型只擅长理解或生成单一任务的问题。它把数据自举与多目标预训练结合起来。

#### 🎯 核心要点
- 提出 Multimodal Mixture of Encoder-Decoder (MED)，同一套参数支持图文理解和文本生成
- 三种功能模式：unimodal encoder、image-grounded text encoder、image-grounded text decoder
- 预训练目标包括 Image-Text Contrastive、Image-Text Matching、Language Modeling
- CapFilt 包含 Captioner 与 Filter：前者为网页图像生成合成 caption，后者剔除原始和合成文本中的噪声
- Captioner 与 Filter 从同一个预训练 MED 初始化，再在小规模人工标注数据上分别微调
- 可扩展到 129M 图像级别数据，在图文检索、图像描述、VQA 及零样本视频语言任务上表现强

#### 🔬 深入细节
![BLIP 学习框架](https://ar5iv.labs.arxiv.org/html/2201.12086/assets/x3.png)
*图：论文 Figure 3。BLIP 用 Captioner 生成合成 caption，用 Filter 去除噪声 image-text pairs，再将过滤后的数据与人工标注数据合并继续预训练。*

![BLIP MED 架构与目标](https://ar5iv.labs.arxiv.org/html/2201.12086/assets/x2.png)
*图：论文 Figure 2。MED 通过共享模块实现图文对比、图文匹配和条件语言建模三类目标。*

```python
# BLIP / CapFilt 训练伪代码
med = pretrain_MED(clean_pairs, losses=["ITC", "ITM", "LM"])

captioner = finetune_as_decoder(med, human_annotated_pairs)
filter_model = finetune_as_matching_model(med, human_annotated_pairs)

bootstrapped_pairs = []
for image, web_text in noisy_web_pairs:
    synthetic_text = captioner.generate(image)
    for text in [web_text, synthetic_text]:
        if filter_model.is_matched(image, text):
            bootstrapped_pairs.append((image, text))

med = pretrain_MED(clean_pairs + bootstrapped_pairs, losses=["ITC", "ITM", "LM"])
```

BLIP 面对两个问题。第一，很多 VLP 模型偏理解任务，例如检索、VQA、NLVR2；另一些模型偏生成任务，例如 image captioning，很难用同一架构自然覆盖两类任务。第二，网页图文对规模大但噪声重，简单扩大数据不一定提供高质量监督。

MED 是 BLIP 的模型答案。它由视觉 Transformer、文本 Transformer 和跨注意力模块组成，通过不同 attention mask 与模块激活方式实现三种模式：unimodal encoder 用于 ITC，对齐图像和文本全局向量；image-grounded text encoder 用于 ITM，判断图文是否匹配；image-grounded text decoder 用于 LM，根据图像生成文本。

三个预训练目标分别服务不同能力。ITC 学全局对齐：

$$
\mathcal{L}_{ITC}=\operatorname{CE}(s(I,T), y)
$$

ITM 在融合表示上做二分类，细查候选图文对是否匹配；LM 则最大化条件文本生成概率：

$$
\mathcal{L}_{LM}=-\sum_t \log p(w_t\mid w_{<t}, I)
$$

CapFilt 是 BLIP 的数据答案。Captioner 是 image-grounded text decoder，给网页图像生成一条新的 synthetic caption；Filter 是 image-grounded text encoder，用 ITC/ITM 判断原始网页文本 \(T_w\) 和合成文本 \(T_s\) 是否与图像匹配。不匹配的文本被丢弃，剩余样本与人工标注数据合并，形成更干净的自举训练集。

> 💡 关键：BLIP 不是只“清洗数据”，而是用当前视觉语言模型主动重写和筛选监督信号。Captioner 提供更语义化的描述，Filter 提供匹配判别，两者互补。

与 CLIP/ALIGN 的纯双塔不同，BLIP 同时保留全局对比学习和深度图文融合，因此既能做高效检索候选召回，也能通过 ITM 重排或通过 decoder 生成 caption。与 OSCAR 相比，它不依赖对象标签作为唯一锚点，而是通过生成式自举提升网页图文数据质量。

#### 🧪 练习题
```yaml
question: "BLIP 的 CapFilt 机制为什么能提升网页图文预训练质量？"
options:
  - "它只保留网页原始 alt-text，不生成新文本"
  - "Captioner 生成合成 caption，Filter 移除与图像不匹配的原始或合成文本"
  - "它用目标检测标签替代所有 caption"
  - "它取消了图文匹配损失，只训练语言模型"
answer: 1
explain: "CapFilt 用生成模型补充更干净的描述，再用匹配模型筛除噪声文本，使大规模网页数据的监督信号更可靠。"
```

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
BLIP-2 用一个轻量 Q-Former 把冻结视觉编码器和冻结大语言模型连接起来，在几乎不更新大模型参数的情况下完成视觉-语言对齐与生成。它的核心价值不是重新训练一个端到端巨型 VLM，而是把昂贵的视觉表征和语言能力作为现成组件，用查询瓶颈高效地“翻译”视觉信息。

#### 🎯 核心要点
- **问题背景**：CLIP/BLIP 类模型擅长对齐图文表征，但把视觉编码器直接接入 LLM 会遇到模态维度、语义粒度和训练成本三重问题。
- **关键结构**：Q-Former 位于冻结图像编码器和冻结 LLM 之间，由一组可学习 query 从图像特征中抽取固定数量的视觉 token。
- **两阶段训练**：第一阶段用图文对齐目标训练 Q-Former 理解图像；第二阶段把 query 输出映射成 LLM 的软视觉提示，训练其服务文本生成。
- **效率来源**：图像编码器和 LLM 都冻结，主要训练 Q-Former 与少量投影层，因此参数效率和数据效率高于从头训练多模态大模型。
- **局限性**：视觉信息被压缩到少量 query token，细粒度定位、复杂空间关系和需要逐像素证据的任务会受瓶颈影响。

#### 🔬 深入细节
![BLIP-2 framework](https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x1.png)

*图：BLIP-2 的两阶段框架。Q-Former 先从冻结图像编码器中抽取视觉语义，再把这些语义作为软提示喂给冻结语言模型。*

```python
def train_blip2(image_encoder, q_former, llm, image_text_pairs):
    freeze(image_encoder)
    freeze(llm)

    # Stage 1: vision-language representation learning.
    for image, text in image_text_pairs:
        vision_tokens = image_encoder(image)
        query_tokens = q_former.learnable_queries()
        query_features = q_former.cross_attend(query_tokens, vision_tokens)

        loss_itc = image_text_contrastive(query_features, text)
        loss_itm = image_text_matching(query_features, text)
        loss_itg = image_grounded_text_generation(query_features, text)
        update(q_former, loss_itc + loss_itm + loss_itg)

    # Stage 2: vision-to-language generative bootstrapping.
    for image, target_text in image_text_pairs:
        vision_tokens = image_encoder(image)
        query_features = q_former.cross_attend(
            q_former.learnable_queries(), vision_tokens
        )
        soft_visual_prompt = linear_project(query_features, llm.embedding_dim)
        loss = llm.language_modeling_loss(prefix=soft_visual_prompt, text=target_text)
        update(q_former.projection_layers(), loss)
```

BLIP-2 的设计从一个非常实际的矛盾出发：视觉编码器已经可以从大规模图像上学到稳定表征，LLM 已经拥有强语言生成能力，但直接把两者端到端拼起来代价极高。论文把这个矛盾拆成“视觉侧不动、语言侧不动、中间学一个接口”的问题，因此 Q-Former 成为整个方法的主角。

Q-Former 包含一组固定数量的可学习 query。每个 query 可以看作一个可训练的信息槽，它通过 cross-attention 从冻结图像编码器输出的 patch/token 特征中读取信息。与把所有视觉 token 原样交给 LLM 不同，BLIP-2 让 Q-Former 输出一小组更紧凑、更语义化的视觉表示，从而控制后续 LLM 的输入长度和训练成本。

第一阶段训练 Q-Former 的目标是让这些 query 真正承载图文对齐信息。图文对比学习使匹配图文在表示空间中靠近，图文匹配目标让模型判断图像和文本是否对应，图像条件文本生成目标则迫使 query features 支持语言级描述。论文通过不同 attention mask 控制 query 与 text 的交互方式，使同一个 Q-Former 能同时服务判别式对齐和生成式表征学习。

第二阶段把 Q-Former 输出接到冻结 LLM。若 Q-Former 输出为 $Q \in \mathbb{R}^{n_q \times d_q}$，投影层 $W \in \mathbb{R}^{d_q \times d_l}$ 会得到软视觉提示：

$$
P_v = QW,\quad P_v \in \mathbb{R}^{n_q \times d_l}
$$

其中 $d_l$ 是 LLM 的词嵌入维度。语言模型随后以 $P_v$ 作为 prefix 生成文本，其训练目标仍是标准自回归似然：

$$
\mathcal{L}_{LM} = -\sum_{t=1}^{T}\log p_\theta(y_t \mid P_v, y_{<t})
$$

由于 LLM 参数冻结，梯度主要更新 Q-Former 和投影层，视觉知识被压缩成 LLM 可读的连续提示。

这种接口式设计也解释了 BLIP-2 为什么成为后续多模态检索和生成模型的重要父节点。它展示了一个可复用范式：用小型中间模块连接强视觉模型和强语言模型，而不是把所有能力绑定到单一端到端训练流程中。后续许多模型把 Q-Former 替换为 resampler、projector、adapter 或 cross-attention bridge，但思路仍然相似：让少量可训练参数负责跨模态转换。

#### 🧪 练习题
```yaml
question: 为什么 BLIP-2 不直接微调冻结图像编码器和 LLM 的全部参数？
answer: 因为全量微调训练成本高、容易破坏已有视觉和语言能力，并且需要更大规模高质量图文数据。BLIP-2 通过训练 Q-Former 和投影层，在保留预训练模型能力的同时完成跨模态适配。
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
PQ 将高维向量拆成多个低维子空间，并分别用小码本量化每个子向量，从而用极短 code 近似表示原向量，解决大规模近邻搜索中原始向量存储和距离计算成本过高的问题。它用笛卡尔积构造指数级大码本，却只需训练和存储线性数量的子码本，是 IVFADC、Faiss IVFPQ 等向量检索系统的基础。

#### 🎯 核心要点
- 子空间分解：把 \(D\) 维向量切成 \(m\) 个互不重叠的 \(D/m\) 维子向量，每个子空间独立训练一个 k-means 子量化器
- 笛卡尔积码本：若每个子量化器有 \(k^\*\) 个 centroid，总组合码本大小为 \((k^\*)^m\)，但只需存储 \(m k^\*\) 个低维 centroid
- 短码表示：每个数据库向量只保存 \(m\) 个 centroid ID；常见 \(k^\*=256\) 时，每个子码只需 1 byte，\(m=8\) 即 8 byte/向量
- 距离查表：查询时预计算每个查询子向量到对应子码本 centroid 的距离表，再对数据库 code 查表求和
- ADC 优于 SDC：Asymmetric Distance Computation 保持查询向量不量化，只量化数据库向量，通常比查询和库向量都量化的 SDC 更准确
- IVFADC 扩展：先用粗量化器把库向量分桶，再对残差做 PQ 编码，查询时只扫描少量倒排列表，兼顾低内存和低延迟
- 标志性结果：论文在 SIFT/GIST 图像描述子和十亿级/二十亿级向量上验证了短码近似检索的可扩展性

#### 🔬 深入细节
![PQ 子空间训练示意](https://mccormickml.com/assets/ProductQuantizer/kmeans_clustering.png)
*图：Product Quantization 的子空间训练过程示意。高维向量被切成多个子向量，每个子空间独立运行 k-means 得到子码本，数据库向量最终保存各子空间最近 centroid 的编号。*

```python
# Product Quantization 训练、编码与 ADC 查询伪代码
def train_pq(train_vectors, m, k_star=256):
    # train_vectors: [n, D], D must be divisible by m
    D = train_vectors.shape[1]
    d_sub = D // m
    codebooks = []
    for j in range(m):
        sub_vectors = train_vectors[:, j*d_sub:(j+1)*d_sub]
        centroids = kmeans(sub_vectors, k=k_star)
        codebooks.append(centroids)
    return codebooks

def encode_pq(x, codebooks):
    codes = []
    for j, centroids in enumerate(codebooks):
        x_j = slice_subvector(x, j)
        codes.append(argmin_l2(x_j, centroids))  # one byte if k_star=256
    return codes

def adc_distance(query, code, codebooks):
    # query is not quantized: asymmetric distance computation
    dist = 0.0
    for j, centroid_id in enumerate(code):
        q_j = slice_subvector(query, j)
        c_j = codebooks[j][centroid_id]
        dist += squared_l2(q_j, c_j)
    return dist

def search(query, database_codes, codebooks, top_k):
    # 先构建 m x k_star 查找表，再扫描短码
    tables = build_distance_tables(query, codebooks)
    heap = TopK(top_k)
    for vector_id, code in database_codes:
        d = sum(tables[j][code[j]] for j in range(len(codebooks)))
        heap.push(d, vector_id)
    return heap.items()
```

PQ 的出发点是高维近邻搜索的两个成本同时爆炸：存储 \(N\) 个 \(D\) 维 float32 向量需要 \(4ND\) 字节，暴力搜索每个查询还要计算 \(N\) 次 \(D\) 维距离。传统矢量量化可以把向量替换成最近 centroid 的编号，但要在高维空间获得低失真，需要极大的码本；例如想用 64 bit code 表示 \(2^{64}\) 个可能 centroid，直接训练和存储这个码本完全不可行。PQ 的关键是把一个不可训练的巨大码本写成多个小码本的笛卡尔积。

形式化地，把向量 \(x\in\mathbb{R}^D\) 分成 \(m\) 个子向量：

$$
x = [x^{(1)},x^{(2)},\ldots,x^{(m)}],\qquad x^{(j)}\in\mathbb{R}^{D/m}
$$

每个子空间有一个量化器 \(q_j\)，对应码本 \(C_j=\{c_{j,1},\ldots,c_{j,k^\*}\}\)。整体 product quantizer 是：

$$
q(x)=\left[q_1(x^{(1)}),q_2(x^{(2)}),\ldots,q_m(x^{(m)})\right]
$$

其隐含总码本为：

$$
C = C_1\times C_2\times\cdots\times C_m,\qquad |C|=(k^\*)^m
$$

这就是 PQ 的压缩杠杆：若 \(m=8,k^\*=256\)，总组合数是 \(256^8=2^{64}\)，但训练时只需要 8 次 256 类低维 k-means，存储时只保存 \(8\times256\) 个低维 centroid。一个 128 维 float32 SIFT 向量原本占 512 byte；PQ 用 \(m=8\) 且每个子码 8 bit 时，只需 8 byte，不含 ID 时压缩 64 倍。

由于子空间正交切分，重构误差可以分解为各子空间误差之和：

$$
\lVert x-q(x)\rVert^2
=\sum_{j=1}^{m}\lVert x^{(j)}-q_j(x^{(j)})\rVert^2
$$

因此每个子码本可以独立训练。这个独立性让 PQ 很高效，但也带来一个假设：原始坐标切分后，各子空间的方差和相关性要相对均衡。如果某几个维度携带大部分方差，平均切分会让部分子码本承担过多信息，量化误差上升；这也是后续 OPQ 通过旋转/学习投影来优化 PQ 前空间分解的原因。

搜索时，PQ 的核心不是先解压所有向量，而是查表求近似距离。对查询 \(x\) 和数据库向量 \(y\) 的 PQ code \((i_1,\ldots,i_m)\)，ADC 距离为：

$$
d_{\mathrm{ADC}}(x,y)^2
= \lVert x-q(y)\rVert^2
= \sum_{j=1}^{m}\lVert x^{(j)}-c_{j,i_j}\rVert^2
$$

实现中先为查询构建 \(m\) 张长度 \(k^\*\) 的表：

$$
T_j[\ell]=\lVert x^{(j)}-c_{j,\ell}\rVert^2
$$

然后每个数据库向量只需读取 \(m\) 个 byte code，并累加 \(T_j[i_j]\)。这把每向量的距离计算从 \(D\) 次浮点差平方，变成 \(m\) 次查表加法，实际瓶颈也从大规模浮点向量读取转为紧凑 code 的顺序扫描。

> 💡 关键：PQ 不是降低向量维度，而是把连续向量替换成离散码字组合。压缩后的 code 本身没有几何意义，距离必须通过码本查表解释。

论文区分了 SDC 和 ADC。SDC（Symmetric Distance Computation）把查询也量化，计算 \(\lVert q(x)-q(y)\rVert\)，可以进一步用 centroid-centroid 表加速，但查询量化会额外引入误差。ADC 保持查询为原始 float 向量，只量化数据库向量，因此估计的是 \(\lVert x-q(y)\rVert\)，通常召回更好。实际向量数据库和 Faiss 的 IVFPQ 默认思路也更接近 ADC：查询即时建表，库端长期保存 PQ code。

PQ 单独使用时仍然要扫描全部数据库 code，只是每个距离便宜很多。论文进一步把它和倒排文件结合为 IVFADC：先训练粗量化器 \(q_c\)，把数据库向量 \(y\) 分配到最近 coarse centroid；再对残差 \(r(y)=y-q_c(y)\) 做 PQ 编码。查询 \(x\) 时只访问最近的 \(w\) 个 coarse cell，对每个 cell 使用查询残差 \(x-c\) 与库中残差 PQ code 做 ADC 查表。近似式为：

$$
y \approx q_c(y)+q_p(y-q_c(y)),\qquad
\lVert x-y\rVert^2 \approx
\lVert x-q_c(y)-q_p(y-q_c(y))\rVert^2
$$

这种“粗分桶 + 残差 PQ”的组合解决了 PQ 的两层问题：倒排文件减少候选数，残差编码降低量化范围和失真，ADC 查表降低每个候选的排序成本。代价是引入更多参数，例如 coarse centroid 数、查询探测的 cell 数 \(w\)、子空间数 \(m\)、每个子码本大小 \(k^\*\)，它们共同决定召回率、延迟和内存占用。

从算法谱系看，PQ 处在“压缩驱动 ANN”的核心位置。它不像 HNSW 主要依赖图导航减少访问点数量，也不像 LSH 依赖随机哈希碰撞；PQ 的第一目标是让数据库常驻内存并让距离估计足够便宜。大规模系统常把 PQ 与 IVF、HNSW、重排序结合：先用索引结构召回候选，再用 PQ 距离快速排序，最后可选读取原始向量做精排。这个分层设计正是现代十亿级向量检索的常见工程形态。

#### 🧪 练习题
```yaml
question: "PQ 相比直接训练一个巨大高维码本的核心优势是什么？"
options:
  - "通过多个低维子码本的笛卡尔积获得指数级组合容量，但训练和存储成本只随子码本数量线性增长"
  - "完全避免任何量化误差"
  - "不需要计算查询向量和码本 centroid 的距离"
  - "只能用于二维向量，因此实现更简单"
answer: 0
explain: "PQ 将高维空间拆成多个子空间，每个子空间只训练小码本；整体码本是子码本的笛卡尔积，因此能用很少 centroid 表达大量组合码字。"
```

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
HNSW 提出可增量构建的分层 NSW 近邻图，用稀疏高层做长距离导航、稠密底层做精细搜索，解决单层图检索容易陷入局部极小和大规模搜索效率不足的问题。

#### 🎯 核心要点
- 分层图结构：每个向量随机分配最高层级，层级越高节点越少、边越长
- 两阶段查询：高层用 `ef=1` 贪心下降到底层，底层用较大的 `efSearch` 维护候选集
- 增量插入：新点从全局入口点开始逐层搜索，并在目标层及以下连接邻居
- 近邻选择启发式：优先保留方向多样的邻居，缓解聚簇数据中边界处卡住的问题
- 关键参数：`M` 控制每层连接数与内存，`efConstruction` 控制建图质量，`efSearch` 控制查询召回与延迟
- 复杂度直觉：指数衰减的层级分布使高层节点数按比例缩小，近似得到对数级导航路径

#### 🔬 深入细节
![HNSW 分层搜索示意图](https://cdn.sanity.io/images/vr8gru94/production/e63ca5c638bc3cd61cc1cd2ab33b101d82170426-1920x1080.png)
*图：HNSW 查询从最高层入口点开始贪心移动，逐层下降到底层后扩展候选集并返回近邻。*

```python
# HNSW 查询与插入的核心流程
def search_hnsw(graph, query, top_k, ef_search):
    ep = graph.entry_point

    # 高层只做贪心导航，快速接近查询所在区域
    for level in range(graph.max_level, 0, -1):
        ep = search_layer(graph, query, [ep], ef=1, level=level)[0]

    # 底层保留 ef_search 个候选，最后截取 top_k
    candidates = search_layer(graph, query, [ep], ef=ef_search, level=0)
    return sorted(candidates, key=lambda x: distance(query, x))[:top_k]

def insert_hnsw(graph, x, M, ef_construction, m_L):
    level_x = floor(-log(uniform(0, 1)) * m_L)
    ep = graph.entry_point

    for level in range(graph.max_level, level_x, -1):
        ep = search_layer(graph, x, [ep], ef=1, level=level)[0]

    for level in range(min(graph.max_level, level_x), -1, -1):
        candidates = search_layer(graph, x, [ep], ef=ef_construction, level=level)
        neighbors = select_neighbors_heuristic(x, candidates, M)
        graph.add_bidirectional_edges(x, neighbors, level)
        graph.shrink_overfull_neighbors(level)
        ep = candidates
```

HNSW 的出发点是改造 Navigable Small World 图。单层 NSW 通过近邻边和少量长边支持贪心搜索，但当数据量变大或分布强聚簇时，查询路径可能在局部最小点停住；如果单纯提高每个点的度数，又会推高内存和距离计算。HNSW 的核心想法是把“长距离跳转”和“局部精修”拆到不同层：顶层只保留少数点，承担粗导航；底层包含所有点，承担最终近邻判定。

层级由指数衰减分布生成。论文插入算法中，新点最高层级为：

$$
l=\left\lfloor-\ln(U)\cdot m_L\right\rfloor,\quad U\sim \operatorname{Uniform}(0,1)
$$

因此更高层的节点数快速减少，可理解为图版本的 skip list。若 \(P(l\geq t)\approx e^{-t/m_L}\)，每下降一层都会进入更密的候选空间；高层长边降低全局路径长度，底层短边提高局部精度。

查询阶段分两段。第一段从入口点 `ep` 在最高层开始，每层运行 `SEARCH-LAYER(q, ep, ef=1)`，只保留当前最近点并继续向下。这一步不追求完整召回，只负责把入口点搬到查询附近。第二段在第 0 层运行 `SEARCH-LAYER(q, ep, efSearch)`，维护一个大小为 `efSearch` 的动态候选集合 \(W\)。当待扩展候选 \(c\) 已经比 \(W\) 中最远元素还远时，可以停止扩展：

$$
d(c,q)> \max_{w\in W} d(w,q)
$$

`efSearch` 是运行时最重要的精度-速度旋钮。更大的 `efSearch` 会访问更多邻居，召回率更高，但距离计算和延迟也更高；返回 \(K\) 个结果时通常要求 `efSearch >= K`。

插入阶段与查询类似，但在新点所属层及以下把搜索结果当成连边候选。朴素做法是直接选最近的 \(M\) 个候选；HNSW 论文进一步提出邻居选择启发式：按离新点距离从近到远检查候选，只保留那些不被已选邻居“遮挡”的点。直觉上，它不是只堆叠同一方向的近邻，而是保留覆盖不同方向的边，让图在聚簇边界处仍有跨区域通路。

> 💡 关键：`M` 决定图的平均出度和内存，`efConstruction` 决定建图时候选搜索深度，`efSearch` 决定查询时召回。HNSW 的工程优势正来自这三个参数把内存、构建时间、查询延迟和召回率分开调节。

与 IVF/PQ 这类量化或聚类索引相比，HNSW 不需要先训练粗量化器，也不把空间切成固定桶；它依赖图导航动态逼近查询区域。这使它在高召回 ANN 场景中非常强，但代价是图边会占用较多内存，并且大规模批量构建时 `efConstruction` 和 `M` 的选择会明显影响构建成本。

#### 🧪 练习题
```yaml
question: "HNSW 中 efSearch 参数的主要作用是什么？"
options:
  - "决定每个向量最高能进入哪一层"
  - "控制底层查询阶段保留和扩展的候选集合大小"
  - "控制每个节点最多连接多少条边"
  - "决定向量是否需要乘积量化"
answer: 1
explain: "efSearch 越大，底层搜索会保留更多候选并访问更多邻居，通常召回更高但延迟也更高。"
```

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
Qwen3-VL-Embedding 基于 Qwen3-VL 构建统一多模态向量模型，并配套 Qwen3-VL-Reranker 形成“召回 + 重排”框架，解决文本、图像、文档图像和视频检索难以同时兼顾泛化、精度与部署效率的问题。

#### 🎯 核心要点
- 统一输入模态：支持文本、图像、截图、视频及混合多模态实例
- 双模型框架：Embedding 用双塔独立编码做高效召回，Reranker 用单塔交叉编码做精细相关性判断
- 表征方式：Embedding 取 Qwen3-VL 上下文末尾 PAD token 的最后隐状态作为 dense vector
- 多阶段训练：大规模对比预训练 → 多任务对比学习与 reranker SFT → reranker 蒸馏与模型合并
- 检索目标：多模态 retrieval 用带 hard negative 和 false-negative mask 的 InfoNCE 变体
- 部署增强：支持 Matryoshka Representation Learning、量化感知训练、32K 上下文和 2B/8B 两档规模

#### 🔬 深入细节
![Qwen3-VL-Embedding 官方示意图](https://model-demo.oss-cn-hangzhou.aliyuncs.com/Qwen3-VL-Embedding.png)
*图：官方模型卡示意。论文 Figure 2 进一步给出 Qwen3-VL-Embedding 与 Qwen3-VL-Reranker 的架构总览：Embedding 输出向量，Reranker 输出 yes/no 相关性分数。*

```python
# Qwen3-VL-Embedding + Reranker 两阶段检索流程
def encode_instance(instance, instruction="Represent the user's input"):
    tokens = qwen3_vl_format(
        system=instruction,
        user=instance,
        assistant_suffix="<|endoftext|>",
    )
    hidden = qwen3_vl(tokens).last_hidden_state
    return l2_normalize(hidden[position_of("<|endoftext|>")])

def retrieve_and_rerank(query, corpus, top_k=100):
    q_vec = encode_instance(query, instruction="Retrieve relevant multimodal content.")
    d_vecs = [encode_instance(doc) for doc in corpus]
    recall = topk(cosine(q_vec, d_vecs), k=top_k)

    scores = []
    for doc in recall:
        logits = qwen3_vl_reranker(instruction, query, doc).next_token_logits
        score = sigmoid(logits["yes"] - logits["no"])
        scores.append((score, doc))
    return sorted(scores, reverse=True)
```

Qwen3-VL-Embedding 的核心设计是把 Qwen3-VL 的多模态理解能力转成可离线存储的检索向量。输入遵循 Qwen3-VL 对话格式：系统消息放任务 instruction，用户消息放待表示的文本、图像、视频或混合实例，最后追加 PAD token `<|endoftext|>`；模型取该 token 对应的最后一层隐状态作为实例向量 \(z\)。查询和文档独立编码，因此大规模语料可以提前建库，在线只做向量相似度。

对于检索数据，论文使用多任务对比学习。给定查询 \(q_i\)、正样本文档 \(d_i^+\)、hard negatives \(d_{i,k}^-\)，Stage 1 的核心目标为：

$$
\mathcal{L}_{\mathrm{retrieval}}
=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(s(q_i,d_i^+)/\tau)}{Z_i}
$$

其中 \(s(\cdot,\cdot)\) 是余弦相似度，\(\tau\) 是温度。\(Z_i\) 不只包含正样本和 hard negatives，还包含 batch 内 query-query、document-document、query-document 等负项；论文用 mask \(m_{ij}\) 过滤潜在 false negatives，避免把比正样本还相似的样本硬当负例。Stage 2 面向更高质量数据时移除了 query-query 和 document-document 项，让目标更贴近实际检索排序。

Reranker 是同一框架的精排模块。它不再独立编码查询和文档，而是把 instruction、query、document 一起送入 Qwen3-VL，做 pointwise 二分类：相关输出 `yes`，不相关输出 `no`。训练损失为：

$$
\mathcal{L}_{\mathrm{reranking}}=-\log p(l\mid I,q,d)
$$

推理时把 yes/no logits 转成连续相关性分数：

$$
s=\operatorname{sigmoid}(\operatorname{logit}(\text{yes})-\operatorname{logit}(\text{no}))
$$

这种设计牺牲了独立编码的效率，但能让查询和文档在 Transformer 内充分交互，因此适合对 Embedding 召回的 top candidates 做二阶段重排。

训练流程的第三阶段把 Reranker 的细粒度判断蒸馏回 Embedding。对一个 query 的正样本和 \(k\) 个负样本，先离线计算 reranker 分布，再让 embedding 相似度分布去拟合它：

$$
\mathcal{L}_{\text{distill}}
=-\sum_{i=1}^{k+1}P_{\text{reranker}}(d_i\mid q)
\log P_{\text{embedding}}(d_i\mid q)
$$

这一步把交叉编码器的精排知识压进双塔向量空间，让最终 Embedding 在保持检索效率的同时获得更强的相关性边界。论文还使用模型合并缓解蒸馏后分类、QA 等非检索任务的退化。

MRL 和 QAT 是面向部署的关键补丁。MRL 在完整向量及多个前缀维度上同时优化，使用户可以按存储预算截断维度，例如从 4096 维降到更低维仍保持可用效果；QAT 在训练时同时考虑全精度和低精度嵌入，并用 LSQ/STE 让模型适应 int8 或二值化等量化格式。它们共同把“好用的多模态向量”推进到可大规模建索引的形态。

> 💡 关键：Qwen3-VL-Embedding 不是只做图文 CLIP 式对齐，而是把 instruction-aware、多模态长上下文、reranker 蒸馏和可变维/量化部署放在同一个检索框架里。

#### 🧪 练习题
```yaml
question: "Qwen3-VL-Embedding 为什么还需要配套 Qwen3-VL-Reranker？"
options:
  - "Embedding 不能处理图像，只能处理文本"
  - "Reranker 可对召回候选做查询-文档交叉编码，提供更细粒度的相关性评分"
  - "Reranker 用来替代所有向量索引，直接遍历全库"
  - "Embedding 只在训练阶段使用，推理时不会输出向量"
answer: 1
explain: "Embedding 适合高效召回，Reranker 通过单塔交互精排 top candidates，两者组合兼顾效率与精度。"
```

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
Retrv-R1 提出面向通用多模态检索的 R1-style MLLM 框架，通过候选信息压缩、细节检查和课程式 GRPO 奖励，让模型用显式推理链选择检索结果，同时控制多候选推理的 token 成本。

#### 🎯 核心要点
- 两阶段检索：先用 embedding 模型召回 top-K 候选，再用推理型 MLLM 选择最佳候选
- Information Compression Module：把每个候选压缩成 content token 和 query-aware relationship token
- Details Inspection Mechanism：CoT 中自动触发特殊 token，给困难候选追加未压缩完整特征
- 冷启动激活：用检索定制合成 CoT 数据先做 SFT，避免直接 RL 训练不稳定
- 强化学习增强：使用 GRPO，并引入格式奖励与结果-效率奖励
- 课程式效率约束：训练早期弱化检查次数惩罚，后期逐步提高效率权重

#### 🔬 深入细节
![Retrv-R1 方法总览](https://arxiv.org/html/2510.02745v2/x1.png)
*图：论文 Figure 1。Retrv-R1 包含两阶段检索、ICM 候选压缩、细节检查机制，以及 self-alignment、SFT、RL 三阶段训练。*

```python
# Retrv-R1 推理驱动重排流程
def retrv_r1(query, all_candidates, embedder, reasoning_mllm, K=50):
    # Stage 1: 先做粗召回
    q_vec = embedder(query)
    cand_vecs = [embedder(c) for c in all_candidates]
    shortlist = topk(cosine(q_vec, cand_vecs), K)

    # Stage 2: 压缩候选，给推理 MLLM 留出 CoT 上下文
    compressed = []
    for c in shortlist:
        t_con = ATT1(query=e_con, key=c.tokens, value=c.tokens)
        rel = ATT2(query=c.tokens, key=query.tokens, value=query.tokens)
        t_rel = ATT1(query=e_con, key=rel, value=rel)
        compressed.append((t_con, t_rel, c.full_tokens))

    cot = reasoning_mllm.generate(query, compressed)
    for idx in cot.requested_inspection_indices():
        cot.append_full_tokens(idx, compressed[idx].full_tokens)
        cot = reasoning_mllm.continue_generate(cot)

    return cot.answer_index()
```

Retrv-R1 的问题设定是 universal multimodal retrieval：查询 \(q\) 可以是文本、图像或交错多模态输入，候选集合为 \(\Omega=\{c_n\}_{n=1}^N\)。直接让 MLLM 看所有候选并逐步推理成本过高，所以框架先用 embedding 模型 \(\phi\) 做粗召回，得到 top-K 子集 \(C=\{c_k\}_{k=1}^K\)，再用第二阶段推理模型 \(\theta\) 在候选内输出最终结果：

$$
\hat{c}=\theta(q,C)
$$

论文的关键判断是：把 DeepSeek-R1 式 RL 直接套到检索并不可行。原因有两个：多候选输入叠加 CoT 会迅速吃满上下文和显存；检索数据上直接 GRPO 容易收敛不稳，模型可能生成看似合理但结果错误的推理。因此 Retrv-R1 先做结构压缩和 SFT 激活，再进入 RL。

Information Compression Module 让每个候选只以两个 token 进入 LM。第一个是候选自身内容 token：

$$
t_{\mathrm{con}}^{c_k}
=\operatorname{ATT}_1(Q_{e_{\mathrm{con}}},K_{T_{c_k}},V_{T_{c_k}})
$$

第二个是 query-aware relationship token，先用候选 token attend 到查询 token 得到关系特征 \(R_{q,c_k}\)，再压缩为关系 token：

$$
t_{\mathrm{rel}}^{c_k}
=\operatorname{ATT}_1(Q_{e_{\mathrm{con}}},K_{R_{q,c_k}},V_{R_{q,c_k}}),
\quad
R_{q,c_k}=\operatorname{ATT}_2(Q_{T_{c_k}},K_{T_q},V_{T_q})
$$

这比只压缩候选内容更适合检索，因为判断相关性往往依赖“与查询相比相同在哪里、不同在哪里”。论文用 self-alignment 预训练 ICM：冻结 LM，让压缩 token 触发的内容/关系描述尽量对齐完整 token 触发的描述，从而减少压缩后语义漂移。

细节检查机制负责补回压缩损失。大多数候选用 \((t_{\mathrm{con}},t_{\mathrm{rel}})\) 就够判断，但困难候选可能需要完整 token。Retrv-R1 给词表加入 `<inspection-index-start>` 和 `<inspection-index-end>`；当 CoT 生成这对标记及候选索引 `idx` 时，系统把 \(T_{c_{idx}}\) 追加到上下文，让模型继续细读。这样模型不是无差别展开所有候选，而是在推理过程中按需申请细节。

训练上，Retrv-R1 先合成检索专用 CoT 数据做 SFT，使模型学会“先猜测理想结果、快速排除负例、对困难正例细查、最后输出索引”的格式。随后用 GRPO 做增强：

$$
\mathcal{J}_{\mathrm{GRPO}}(\theta)
=\mathbb{E}\left[
\frac{1}{G}\sum_{i=1}^{G}
\min\left(\rho_i A_i,\operatorname{clip}(\rho_i,1-\epsilon,1+\epsilon)A_i\right)
-\beta D_{\mathrm{KL}}(\pi_\theta\|\pi_{\mathrm{ref}})
\right]
$$

其中 \(\rho_i=\pi_\theta(o_i)/\pi_{\theta_{\mathrm{old}}}(o_i)\) 表示新旧策略概率比，\(A_i\) 由同组 rollout 的奖励标准化得到。奖励分为格式奖励 \(r_f\) 和结果-效率奖励 \(r_r\)。后者把检索正确性和检查次数同时纳入：

$$
r_r=\mathbf{1}(\hat{c}=\hat{c}_{gt})\left(1-\lambda\frac{N_{\mathrm{ins}}}{K}\right)
$$

\(N_{\mathrm{ins}}\) 是 CoT 中触发细节检查的候选数。课程策略令 \(\lambda_i=i/N_{\mathrm{iter}}\)，早期先允许模型多看细节把准确率学起来，后期再逐步惩罚过度检查，最终同时提升效果和效率。

> ⚠️ 注意：Retrv-R1 的“推理”不是把检索问题改写成普通聊天问答，而是围绕候选压缩、按需展开和可验证索引输出设计了专门的模型结构与奖励。

#### 🧪 练习题
```yaml
question: "Retrv-R1 引入 Details Inspection Mechanism 的主要目的是什么？"
options:
  - "让所有候选都以完整 token 输入，从而避免压缩"
  - "让模型在 CoT 中只对困难候选按需请求完整 token，兼顾准确率和效率"
  - "替代第一阶段 embedding 召回"
  - "把检索任务转换为无监督聚类任务"
answer: 1
explain: "ICM 会压缩候选以节省上下文，但困难样本可能需要细节；DIM 允许模型按索引展开少数候选，并由奖励约束过度使用。"
```

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
URaG 提出在单个多模态大语言模型内部统一检索与生成，把早期 Transformer 层的隐藏状态转化为证据页选择器，解决长文档理解中无关页面干扰和长序列计算开销过高的问题。它不额外引入独立检索器，而是在推理过程中保留 top-k 相关页面、丢弃无关视觉 token，让深层 LLM 只对关键证据进行精读和回答生成。

#### 🎯 核心要点
- **统一检索与生成**：在一个 MLLM 内完成证据页检索和答案生成，避免外部 retriever 与 generator 分离带来的系统复杂度和误差传播。
- **粗到细观察**：论文发现 MLLM 处理多页文档时，早层注意力更分散，中深层逐渐聚焦证据页，说明模型内部已经具备可利用的证据定位能力。
- **轻量跨模态检索模块**：在早期 LLM 层隐藏状态上接入两层线性投影和 GELU，把视觉 token 与查询 token 映射到低维归一化特征空间。
- **Contextualized late interaction**：对每个查询 token 取其与页面视觉 token 的最大相似度，再对查询 token 求和，得到 query-page 相关性分数。
- **Top-k 页面保留**：默认在第 6 层检索 top-5 页面，并直接从隐藏状态中删除未命中页面的视觉 token，降低后续深层 Transformer 的序列长度。
- **两阶段训练**：先冻结 MLLM、只预训练检索模块；再给 LLM 和检索模块加入 LoRA，用检索损失与生成交叉熵联合微调。
- **基座与数据**：URaG-3B/7B 基于 Qwen2.5-VL，在 MPDocVQA、DUDE、SlideVQA 等多页文档数据上训练和评测。
- **效率收益**：在长输入设置下相对 baseline 降低约 44%-56% FLOPs，同时在多个长文档理解与证据页检索基准上达到或刷新最佳结果。

#### 🔬 深入细节
![URaG 框架图](https://raw.githubusercontent.com/shi-yx/URaG/main/figures/urag_framework.jpg)
*图：URaG 在早期 LLM 层后插入跨模态检索模块，选择 top-k 证据页，并让深层 LLM 只继续处理保留下来的视觉 token。*

![URaG 层级分析](https://raw.githubusercontent.com/shi-yx/URaG/main/figures/layer_study.png)
*图：论文对不同模型和数据集的层级分析。早层 attention entropy 较高，深层更聚焦证据页；embedding-based retrieval 在中早层已经能取得较稳定的证据检索效果。*

```python
# URaG 推理与训练核心流程（简化版）

def urag_forward(document_pages, query, mllm, retriever, top_k=5, retrieve_layer=6):
    visual_tokens = []
    page_spans = []
    for page in document_pages:
        start = len(visual_tokens)
        visual_tokens.extend(mllm.vision_encoder(page))
        page_spans.append((start, len(visual_tokens)))

    text_tokens = mllm.tokenize(query)
    hidden = mllm.embed(visual_tokens, text_tokens)

    for layer_id, layer in enumerate(mllm.llm_layers, start=1):
        hidden = layer(hidden)

        if layer_id == retrieve_layer:
            query_features, page_features = retriever.project_and_split(
                hidden, text_tokens, page_spans
            )
            scores = {}
            for page_id, features in page_features.items():
                # late interaction: each query token matches its best visual token
                scores[page_id] = sum(
                    max(dot(q, v) for v in features) for q in query_features
                )

            keep_pages = topk(scores, k=top_k)
            hidden = drop_visual_tokens_except(hidden, page_spans, keep_pages)

    answer = mllm.decode(hidden)
    return answer


def train_urag(batch, mllm, retriever):
    # Stage 1: freeze MLLM and pretrain only the retrieval module.
    freeze(mllm)
    for document_pages, query, positive_pages, negative_pages in batch:
        scores = retriever.score_pages(mllm.early_hidden(document_pages, query))
        s_pos = sum(scores[p] for p in positive_pages)
        hard_negs = select_hard_negatives(scores, negative_pages, len(positive_pages))
        s_neg = sum(scores[p] for p in hard_negs)
        loss_retrieval = log(1 + exp(s_neg - s_pos))
        update(retriever, loss_retrieval)

    # Stage 2: add LoRA adapters and jointly optimize retrieval + generation.
    add_lora(mllm.llm_layers)
    add_lora(retriever)
    for document_pages, query, positive_pages, answer in batch:
        pred_answer, scores = urag_forward_with_scores(document_pages, query)
        loss_generation = cross_entropy(pred_answer, answer)
        loss_retrieval = retrieval_ranking_loss(scores, positive_pages)
        update_lora_and_retriever(loss_retrieval + loss_generation)
```

**动机与背景：长文档 MLLM 的瓶颈在哪里？**

多页文档理解不是把单页 VQA 简单扩展到更多图片。若把所有页面的高分辨率视觉 token 都送入 LLM，一方面会引入大量与问题无关的页面，答案生成阶段容易被噪声干扰；另一方面 Transformer self-attention 的计算复杂度随序列长度近似二次增长，页数增加后推理成本迅速上升。传统做法主要有两类：压缩所有视觉 token，代价是细粒度表格、图表和版面信息会丢失；或者先用外部检索器选页面，再交给 MLLM 回答，代价是检索器与生成器分开训练，部署链路更复杂，也难以端到端协调。

URaG 的关键判断是：MLLM 在内部已经出现了“先粗看、再精读”的层级行为。论文用 attention entropy 和证据页检索准确率分析不同 LLM 层，发现早层通常对多页输入分布较均匀，中间层开始形成可区分的 query-page 语义表示，深层则更集中在证据页上。因为 embedding-based retrieval 在中早层已经较稳定，URaG 不等到最终层再检索，而是在第 6 层左右把隐藏状态拿出来做页面选择，既能利用已经成形的语义特征，又能让后续大部分深层计算只发生在少数相关页面上。

**核心机制：用早层隐藏状态做跨模态页面检索**

设长文档包含页面 \(\{p_1,p_2,\dots,p_n\}\)，查询为 \(Q\)。每页图像经过视觉编码器和 projector 得到视觉 token，查询经 tokenizer 得到文本 token，二者一起进入 LLM。到某个早期层 \(\ell\) 后，模型得到隐藏状态：

$$
H^{(\ell)} \in \mathbb{R}^{L \times D}
$$

跨模态检索模块是一个很轻的映射层，论文实现为两层线性投影加 GELU，把隐藏状态降维并做 L2 归一化：

$$
H' = \operatorname{Norm}\left(W_2\,\operatorname{GELU}(W_1 H^{(\ell)})\right), \qquad
H' \in \mathbb{R}^{L \times D'}
$$

随后根据 token 位置切分出查询特征 \(E_q\) 和第 \(p\) 页的视觉特征 \(E_v^{(p)}\)。由于这些特征来自同一个 MLLM 的上下文化隐藏状态，视觉 token 已经受到查询和文档上下文影响，页面检索不再是一个独立编码器上的静态相似度计算。

**Late interaction：为什么不是简单平均池化？**

URaG 使用类似 ColBERT 的 contextualized late interaction。对每个查询 token \(E_{q_i}\)，它在某一页的所有视觉 token 中寻找最相似的 token，再把所有查询 token 的最佳匹配求和：

$$
s_{q,v}(p)=
\sum_{i=1}^{|E_q|}
\max_{j \in [|E_v^{(p)}|]}
E_{q_i}\cdot \left(E_{v_j}^{(p)}\right)^\top
$$

这个公式的直觉是：一个问题通常由多个语义片段组成，例如“图表标题”“某一行指标”“年份范围”。平均池化会把页面压成一个向量，容易抹平局部证据；late interaction 则允许每个查询 token 分别寻找页面中最相关的视觉证据，再合成页面级分数。因此它既保留了 token 级细粒度匹配，又只输出页面级 top-k 决策，适合“先找页、再生成”的长文档场景。

**隐藏状态裁剪：检索结果如何影响生成？**

得到每页分数 \(s_{q,v}(p)\) 后，URaG 选择 top-k 页面，默认 \(k=5\)。关键点是它不是把选中页面重新送进一个新模型，而是在当前 LLM 的隐藏状态序列中直接删除未选中页面对应的视觉 token，只保留文本 token 与 top-k 页面视觉 token 继续向深层传播。若保留页面集合为 \(\mathcal{K}\)，深层输入可以理解为：

$$
\tilde{H}^{(\ell)} =
\operatorname{Keep}\left(H^{(\ell)}, \text{text tokens} \cup \{ \text{visual tokens of } p \mid p \in \mathcal{K} \}\right)
$$

这样做有两个直接收益。第一，深层 self-attention 不再被无关页面占据，答案生成时更容易集中在证据上；第二，后续层的序列长度显著缩短，页数越多，计算节省越明显。论文在 20、60、100 页输入上报告相对 baseline 的 FLOPs 降低约 44.0%、53.9%、55.8%，说明 URaG 的效率收益主要来自“尽早裁掉无关视觉 token”。

**训练策略：先让检索器会找证据，再让检索和生成协同**

URaG 采用两阶段训练。第一阶段冻结 MLLM，只训练跨模态检索模块。若正证据页集合为 \(P\)，负页集合为 \(N\)，页面分数为 \(s_i\)，正负分数聚合为：

$$
S_{\mathrm{pos}} = \sum_{i\in P} s_i
$$

$$
S_{\mathrm{neg}} =
\begin{cases}
\sum_{j\in N} s_j, & |N| < |P| \\
\sum_{j\in \operatorname{TopK}(\{s_k \mid k\in N\}, |P|)} s_j, & |N| \ge |P|
\end{cases}
$$

检索损失是一个 pairwise ranking 目标：

$$
\mathcal{L}_{\mathrm{retrieval}} =
\log\left(1 + \exp(S_{\mathrm{neg}} - S_{\mathrm{pos}})\right)
$$

它要求正证据页总分高于最有迷惑性的负页总分。第二阶段给 LLM 和检索模块加入 LoRA，联合优化检索损失和生成交叉熵：

$$
\mathcal{L}_{\mathrm{total}} =
\mathcal{L}_{\mathrm{retrieval}} +
\mathcal{L}_{\mathrm{generation}}
$$

训练时还会强制保留 ground-truth evidence pages，再用检索分数补足到最多 5 页，避免早期检索错误导致生成端完全看不到答案证据。这个细节很重要：它让生成模型在联合微调时持续接触正确证据，同时仍学习如何在有限页面预算内处理真实检索结果。

**与传统 RAG 和 token compression 的区别**

URaG 和传统 RAG 的目标相似，都是先定位证据再生成答案，但实现位置完全不同。传统 RAG 通常在模型外部运行 OCR、文本检索器、视觉检索器或独立 MLLM retriever，再把检索结果作为新的输入交给 generator；URaG 则在同一个 MLLM 的中间层完成检索，检索特征来自生成模型自身的上下文化表示，后续生成也直接沿用同一条前向传播。与 token compression 相比，URaG 不是均匀压缩每一页，而是选择性保留少数页面的较完整视觉 token，因此更适合需要图表、表格、图片和版面细节的问答。

> 💡 关键：URaG 的“统一”不只是把两个模块放在一个系统里，而是让检索决策发生在 MLLM 的推理过程中，并且让检索后的隐藏状态继续服务答案生成。

#### 🧪 练习题
```yaml
question: "URaG 为什么把跨模态检索模块插入到早期 LLM 层，而不是在最终层之后再检索？"
options:
  - "早中层已经形成可用于证据页选择的语义表示，同时越早裁剪无关页面，后续深层计算节省越明显"
  - "最终层没有任何视觉 token，因此无法计算 query-page 相似度"
  - "早期层的参数量比深层更大，所以检索模块必须放在早期层"
  - "URaG 需要先生成完整答案，再根据答案反向选择证据页"
answer: 0
explain: "论文观察到 embedding-based retrieval 在中早层已较稳定；把检索放在第 6 层附近可以在保留足够语义信息的同时尽早删除无关视觉 token，让深层 LLM 专注于 top-k 证据页。"
```

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
UniME-V2 提出用 MLLM-as-a-Judge 自动给查询-候选对打语义匹配软分，解决传统 in-batch 难负样本挖掘样本多样性不足、误把 false negative 当负样本以及 one-hot 监督过硬的问题。它进一步把嵌入模型与 reranker 组成两阶段检索流程，在 MMEB 和多类图文检索任务上提升通用多模态检索能力。

#### 🎯 核心要点
- **MLLM-as-a-Judge 难负样本挖掘**：先用现成多模态嵌入模型做全局检索，为每个 query 取 top-50 潜在难负样本，再让 MLLM 判断 query-candidate 语义匹配度
- **语义匹配软分数**：根据 MLLM 输出 Yes/No token 的概率生成 \(s_{q,c}\)，同时用于过滤 false negatives、筛选高质量 hard negatives 和构造软标签
- **分布对齐训练 UniME-V2**：把 query 与候选的余弦相似度分布 \(P\) 对齐到 MLLM 语义匹配分布 \(Q\)，缓解传统 one-hot 对比学习只承认一个正样本的刚性约束
- **多模态 MLLM 嵌入抽取**：将 query、正候选和 hard negatives 输入 MLLM，取最后 token 表征并归一化，支持图像、文本以及图文交错样本的统一检索
- **UniME-V2-Reranker**：用挖掘出的 hard negatives 训练 reranker，pairwise 任务判断正/负候选，listwise 任务在候选列表中选出正确位置
- **两阶段推理**：UniME-V2 先用向量相似度召回 top-10，UniME-V2-Reranker 再基于 query 与候选列表做精排
- **训练与评测设置**：使用 MMEB 的 20 个 in-distribution 训练集共 662k 样本，覆盖分类、VQA、检索和 grounding，并在 MMEB 36 个测试集及短/长 caption、组合检索任务上验证

#### 🔬 深入细节
![UniME-V2 与传统方法对比](https://garygutc.github.io/UniME-v2/static/image_uniMEv2/introduction.png)
*图：传统方法主要在 batch 内找难负样本，并用 one-hot 目标训练；UniME-V2 改为全局检索候选、用 MLLM-as-a-Judge 给软语义分数，再把嵌入相似度分布对齐到语义分布。*

![MLLM-as-a-Judge 难负样本挖掘流程](https://garygutc.github.io/UniME-v2/static/image_uniMEv2/method1.png)
*图：UniME-V2 先通过现成嵌入模型召回潜在难负样本，再用 MLLM 判断 query-candidate 是否语义匹配，从而过滤 false negatives 并保留更有训练价值的 hard negatives。*

![UniME-V2 训练框架与 Reranker](https://garygutc.github.io/UniME-v2/static/image_uniMEv2/method2.png)
*图：UniME-V2 使用 MLLM 语义分数作为软监督训练嵌入模型；UniME-V2-Reranker 通过 pairwise 和 listwise 目标学习候选重排序。*

```python
# UniME-V2 核心流程伪代码（简化版）

for query, positive, candidate_pool in training_data:
    # 1. 全局检索构造潜在难负样本，而不是只依赖当前 batch
    sim_scores = vlm2vec.cosine_search(query, candidate_pool)
    top50 = rank_top_k([c for c in candidate_pool if sim_scores[c] < delta], k=50)

    # 2. MLLM-as-a-Judge 生成 query-candidate 语义匹配软分
    judge_scores = {}
    for cand in top50:
        yes_logit, no_logit = judge_mllm.score_yes_no(query, cand)
        judge_scores[cand] = softmax([no_logit, yes_logit])[1]

    # 3. 过滤 false negatives，并用循环采样保持 hard negative 多样性
    pos_score = judge_mllm.score_yes_probability(query, positive)
    false_negative_threshold = pos_score - beta
    refined = [c for c in top50 if judge_scores[c] <= false_negative_threshold]
    hard_negatives = cyclic_sample(refined, stride=5, k=8)

    # 4. 训练 UniME-V2：相似度分布 P 对齐 MLLM 软标签分布 Q
    candidates = [positive] + hard_negatives
    eq, ec = unime_v2.last_token_embeddings(query, candidates)
    P = softmax(cosine(eq, ec) / tau)
    semantic_scores = [pos_score] + [judge_scores[c] for c in hard_negatives]
    Q = softmax(as_tensor(semantic_scores) / tau)
    loss_embed = 0.5 * (kl_div(P, Q) + kl_div(Q, P))

    # 5. 训练 reranker：pairwise 判断 + listwise 选位置
    hardest_negative = hard_negatives[0]
    loss_pair = ce(reranker(query, positive), "YES") + ce(reranker(query, hardest_negative), "NO")
    shuffled_list, positive_index = insert_positive_randomly(hard_negatives, positive)
    loss_list = ce(reranker(query, shuffled_list), positive_index)
    loss = loss_embed + loss_pair + loss_list
    loss.backward()
```

**动机与背景：为什么要让 MLLM 当 judge？**

CLIP、ImageBind 和 VLM2Vec 这类嵌入模型的共同目标，是把不同模态样本映射到同一向量空间，用向量相似度完成检索。但当训练依赖 batch 内负样本时，模型只能在一个小范围里找“看起来相近”的候选，难负样本的覆盖面有限；更麻烦的是，向量相似度本身不一定能分清 false negative 和真正 hard negative。比如一个 query 要找“相似的日常图像”，多个候选都可能语义相关，如果只按 one-hot 目标把其中一个视作正样本，其余全压成负样本，会把语义上合理的候选错误惩罚掉。

UniME-V2 的核心变化是：不用当前嵌入模型的相似度直接决定监督信号，而是先把候选扩大到全局检索空间，再调用理解能力更强的 MLLM 对每个 query-candidate 对做语义判断。对每个 query \(q\) 和候选池 \(\Omega_c=\{c_1,c_2,\dots,c_n\}\)，嵌入模型先召回候选，再由 reranker 精排：

$$
\Omega_k = \Phi_{\mathrm{emb}}(q, \Omega_c), \qquad
\hat{\Omega}_k = \Phi_{\mathrm{rank}}(q, \Omega_k)
$$

这里 \(\Phi_{\mathrm{emb}}\) 是 UniME-V2 嵌入模型，\(\Phi_{\mathrm{rank}}\) 是 UniME-V2-Reranker。这样的两阶段结构保留了向量检索的效率，也允许在较小候选集上使用更强但更贵的 MLLM 精细判断。

**第一步：全局检索构造潜在 hard negatives**

论文先用 VLM2Vec 为 query 和候选生成嵌入，在全局候选池中取 top-50 作为潜在 hard negative 集合。为了降低 false negative 的干扰，还会基于相似度阈值 \(\delta\) 过滤过于相似的候选：

$$
\Omega_p = \operatorname{Rank}_{50}(\{x_1,\dots,x_n\}), \quad x_i < \delta
$$

其中 \(x_i\) 表示 query 与第 \(i\) 个候选的相似度。这个步骤解决的是“batch 约束”：传统 in-batch mining 只能在一个 mini-batch 内找负样本，而 UniME-V2 从全局池检索，负样本更多样，也更容易找到真正有区分价值的样本。

**第二步：用 MLLM-as-a-Judge 生成语义匹配软分**

对潜在 hard negative 集合 \(\Omega_p\)，UniME-V2 用 MLLM 接收 prompt：“给定 query 和 candidate，判断 candidate 是否满足 query；满足输出 Yes，否则输出 No”。然后根据 Yes/No 两个 token 的概率得到语义匹配分：

$$
s_{q,c_i} =
\frac{\exp(\ell_{\mathrm{Yes}}^{i})}
{\exp(\ell_{\mathrm{Yes}}^{i}) + \exp(\ell_{\mathrm{No}}^{i})}
$$

其中 \(\ell_{\mathrm{Yes}}^{i}\) 与 \(\ell_{\mathrm{No}}^{i}\) 是 MLLM 对第 \(i\) 个候选输出 Yes/No 的 logits。分数越高，说明 MLLM 认为候选越可能满足 query。随后，论文使用正样本分数与 margin \(\beta\) 构造阈值：

$$
\alpha = s_{q,c_t} - \beta
$$

若某个负候选的语义匹配分超过该阈值，它很可能是 false negative，会被排除；剩下的候选再用五步间隔的循环采样保留多样性。如果过滤后不足 10 个候选，则重复采样补齐；极少数无候选可用的情况，则从初始 top-50 中随机取 10 个并给默认分数。

> 💡 关键：UniME-V2 的 judge 分数不是只做数据清洗，而是同时进入训练目标。它既决定哪些样本该作为 hard negatives，也告诉模型这些 negatives 之间“有多负”。

**第三步：用软分布监督嵌入模型**

传统对比学习通常把正样本设为 1，其余候选设为 0。但在多模态检索中，候选之间常有语义层级：一个候选可能完全匹配，另一个候选部分匹配，还有一个候选完全无关。UniME-V2 把这种层级显式建模为软分布。

对于 query \(q\)、正候选 \(c_t\) 和 \(k\) 个 hard negatives \(\{c_1,\dots,c_k\}\)，模型取 MLLM 最后 token 的 query 表征 \(e_q\) 和候选表征 \(E_c=\{e_{c_t}^{+}, e_{c_1}^{-}, \dots, e_{c_k}^{-}\}\)，再计算相似度分布：

$$
P_j =
\frac{\exp(\cos(e_q, e_{c_j})/\tau)}
{\sum_{u \in \{c_t,c_1,\dots,c_k\}}\exp(\cos(e_q, e_u)/\tau)}
$$

同时，把 MLLM judge 的语义分数转成目标分布：

$$
Q_j =
\frac{\exp(s_{q,c_j}/\tau)}
{\sum_{u \in \{c_t,c_1,\dots,c_k\}}\exp(s_{q,u}/\tau)}
$$

训练目标是让模型自己的相似度分布 \(P\) 靠近 judge 分布 \(Q\)。论文使用对称的分布对齐损失，写成双向 KL 形式：

$$
\mathcal{L}_{\mathrm{emb}} =
\frac{1}{2N}\sum_{i=1}^{N}
\left[
\mathrm{KL}(P_i \parallel Q_i) +
\mathrm{KL}(Q_i \parallel P_i)
\right]
$$

直觉上，模型不再被要求“只把唯一正样本拉近，其他全部推远”，而是学习一个更细的排序结构：最匹配的候选应最高，部分相关候选可以保留中等分数，明显无关候选才被压低。这正是 MLLM-as-a-Judge 给表示学习带来的信息增量。

**第四步：训练 UniME-V2-Reranker 做精排**

向量召回高效，但最终 top-k 里仍可能存在非常细粒度的语义差异。为此，论文额外训练 UniME-V2-Reranker，并同时使用 pairwise 与 listwise 两种目标。

Pairwise 训练把 query 与正候选 \(c_t\)、最难负候选 \(c_h\) 分别组成样本，要求模型对正候选输出 YES，对负候选输出 NO：

$$
\mathcal{L}_{\mathrm{pair}} =
\mathcal{L}_{\mathrm{ce}}(\mathrm{YES}, \eta(q,c_t)) +
\mathcal{L}_{\mathrm{ce}}(\mathrm{NO}, \eta(q,c_h))
$$

Listwise 训练则从 hard negatives 中按语义分数选 top-\(x\) 候选，把正候选随机插入列表并要求 reranker 输出其位置 \(I_{c_t}\)：

$$
\mathcal{L}_{\mathrm{list}} =
\mathcal{L}_{\mathrm{ce}}(I_{c_t}, \eta(q,c_t,\{c_1,\dots,c_x\}))
$$

Reranker 的最终损失为：

$$
\mathcal{L}_{\mathrm{rank}} =
\mathcal{L}_{\mathrm{pair}} + \mathcal{L}_{\mathrm{list}}
$$

这两个目标互补：pairwise 强化“这个候选是否满足 query”的二分类能力，listwise 训练模型在候选列表里做相对排序，更贴近真实检索精排场景。

**与传统方法的区别**

与 CLIP 式对比学习相比，UniME-V2 不把 batch 内其他样本全部当作等价负样本，而是引入 MLLM 语义判断，显式区分 false negative、hard negative 和 easy negative。与 ImageBind 这类统一嵌入方法相比，UniME-V2 的重点不是新增模态桥接，而是让 MLLM 的理解能力反过来监督嵌入空间，使统一表示更能分辨细粒度语义差异。与 UniME/VLM2Vec 等 MLLM 嵌入模型相比，UniME-V2 的关键增量在于全局 hard negative mining、软语义分布对齐，以及一个利用同一批高质量 negatives 训练出来的 reranker。

实验实现上，论文使用 VLM2Vec(Qwen2-VL-7B) 构造潜在 hard negative 集合，用 Qwen2.5-VL-7B 生成语义匹配分数；UniME-V2 分别基于 Qwen2-VL 和 LLaVA-OneVision 训练，并用 LoRA 与 DeepSpeed ZeRO stage-2 降低显存压力。在 MMEB 上，UniME-V2 相比对应 UniME 基线整体提升，并且 reranker 在只使用约 0.6M 数据时仍能超过使用更多数据的 LamRA 精排结果，说明高质量 hard negatives 与 listwise 训练对最终排序很关键。

#### 🧪 练习题
```yaml
question: "UniME-V2 使用 MLLM-as-a-Judge 生成语义匹配分数的核心目的是什么？"
options:
  - "把所有候选都转换成自然语言描述，从而完全避免训练嵌入模型"
  - "替代向量检索，在全量候选池上直接用 MLLM 做最终排序"
  - "区分 false negatives 与真正 hard negatives，并把候选间语义差异作为软标签监督嵌入模型"
  - "减少 MLLM 参数量，使其可以在移动端完成多模态检索"
answer: 2
explain: "UniME-V2 的 judge 分数一方面用于过滤 false negatives 和采样高质量 hard negatives，另一方面被转成软语义分布，与模型相似度分布对齐，从而学习候选之间的细粒度差异。"
```
