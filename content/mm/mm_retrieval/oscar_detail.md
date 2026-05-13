### OSCAR — 对象语义对齐预训练 (OSCAR)

```yaml
id: oscar
name: OSCAR
full_name: 对象语义对齐预训练 (OSCAR)
year: '2020'
org: Microsoft
paper_url: https://arxiv.org/abs/2004.06165
category: foundation
parent: scan
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