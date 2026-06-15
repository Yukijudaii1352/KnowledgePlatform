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
