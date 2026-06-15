### LayoutLM: 版面语言模型 (Layout Language Model)

```yaml
id: layoutlm
name: LayoutLM
full_name: "版面语言模型 (Layout Language Model)"
year: "2020"
org: Microsoft Research Asia
paper_url: https://arxiv.org/abs/1912.13318
category: document_ai
parent: "—"
motivation: 融合文本版面图像预训练
```

#### 📝 一句话总结

LayoutLM 在 BERT 文本预训练中加入二维版面坐标和图像外观特征，解决了传统语言模型忽略文档空间结构的问题。它开创了将 OCR 文本、布局位置和视觉特征联合建模的 Document AI 预训练范式。

#### 🎯 核心要点

- 在 BERT 输入中加入 2D position embedding，编码每个 OCR token 的 \((x_0,y_0,x_1,y_1)\) 文档坐标
- 结合文本 embedding、1D position embedding、segment embedding 和 2D layout embedding 建模文档序列
- 在下游任务中引入 Faster R-CNN 提取的 image embedding，用于补充字体、颜色、方向等视觉外观
- 预训练目标包括 Masked Visual-Language Model (MVLM) 和可选 Multi-label Document Classification (MDC)
- 预训练数据来自 IIT-CDIP，覆盖 600 万文档、1100 万扫描图像，适合大规模文档自监督学习
- 在 FUNSD 表单理解、SROIE 票据理解、RVL-CDIP 文档分类上显著优于纯文本 BERT/RoBERTa

#### 🔬 深入细节

##### 核心架构图

![LayoutLM 架构](https://ar5iv.labs.arxiv.org/html/1912.13318/assets/x1.png)
*图：LayoutLM 在 BERT 文本输入基础上加入 2D layout embedding，并在下游任务中与 Faster R-CNN image embedding 融合。*

##### 算法伪代码

```python
# LayoutLM 预训练和微调伪代码
def build_layoutlm_input(words, boxes):
    word_emb = WordEmbedding(words)
    pos1d = PositionEmbedding(range(len(words)))
    seg_emb = SegmentEmbedding(words)
    layout_emb = (
        XEmbedding(boxes.x0) + YEmbedding(boxes.y0) +
        XEmbedding(boxes.x1) + YEmbedding(boxes.y1)
    )
    return word_emb + pos1d + seg_emb + layout_emb

def pretrain(document_image, ocr_words, boxes, doc_tags=None):
    masked_words = mask_tokens(ocr_words)
    h = Transformer(build_layoutlm_input(masked_words, boxes))
    loss_mvlm = cross_entropy(predict_word(h[masked_positions]), ocr_words[masked_positions])
    loss_mdc = multilabel_bce(predict_doc_tags(h[CLS]), doc_tags) if doc_tags else 0
    return loss_mvlm + loss_mdc

def finetune_for_ie(document_image, ocr_words, boxes):
    text_layout_h = Transformer(build_layoutlm_input(ocr_words, boxes))
    image_h = faster_rcnn_roi_features(document_image, boxes)
    return token_classifier(concat(text_layout_h, image_h))
```

##### 方法详解

**1. 动机与背景**

普通 NLP 预训练模型把文档看作一维 token 序列，但真实商业文档的含义高度依赖版面。例如发票中的金额、日期、公司名常由空间邻近关系决定；表单中的 key-value 关系也不一定按阅读顺序连续出现。只使用文本序列会丢失这些二维结构。

LayoutLM 的核心思想是把 OCR 给出的文本框坐标作为一种“版面语言”注入 Transformer。模型仍继承 BERT 的文本建模能力，但每个 token 还知道自己在页面上的空间位置。

**2. 2D Layout Embedding**

对每个 OCR token，LayoutLM 使用归一化到固定范围的 bounding box：

$$
b_i = (x_0, y_0, x_1, y_1)
$$

输入表示由多种 embedding 相加：

$$
\mathbf{e}_i =
\mathbf{e}^{word}_i +
\mathbf{e}^{1D}_i +
\mathbf{e}^{seg}_i +
\mathbf{e}^{x_0}_i +
\mathbf{e}^{y_0}_i +
\mathbf{e}^{x_1}_i +
\mathbf{e}^{y_1}_i
$$

这种做法保持了 BERT 的结构，只是扩展了位置编码维度。二维坐标让注意力层可以学习“同一行”“上下邻近”“表格列对齐”等文档关系。

**3. MVLM 预训练**

MVLM 与 BERT MLM 类似，随机 mask 文本 token 并预测原词。区别在于：被 mask token 的 2D 坐标仍保留，模型必须利用上下文文本和空间位置共同恢复词：

$$
\mathcal{L}_{MVLM} = -\sum_{i \in \mathcal{M}} \log p(w_i | w_{\setminus \mathcal{M}}, b)
$$

> 💡 关键：保留被 mask 词的坐标很重要。模型不仅要学语言上下文，还会学到某些字段在页面中的典型位置和空间关系。

**4. MDC 预训练**

IIT-CDIP 中每个文档有多标签元数据。LayoutLM 可在 `[CLS]` 表示上加入多标签分类任务：

$$
\mathcal{L}_{MDC} = -\sum_c y_c\log p_c + (1-y_c)\log(1-p_c)
$$

MDC 的作用是让模型获得文档级类别信息，改善 `[CLS]` 全局表示。论文也指出该任务依赖文档标签，因此是可选预训练目标。

**5. 图像特征融合**

LayoutLM 原始预训练主要依赖文本和布局；在下游任务中，论文使用 Faster R-CNN 为 OCR token 或整页图像提取 image embedding。图像特征补充字体、颜色、方向、表格线等视觉线索，尤其对文档分类和票据理解有帮助。

**6. 与纯文本模型的区别**

BERT/RoBERTa 只能看到 OCR 文本序列，无法区分两个相同词在不同页面区域的作用。LayoutLM 通过 2D 坐标把页面结构纳入自注意力，因而在表单/票据等结构化文档中提升显著。它的局限也很清楚：依赖外部 OCR，OCR 错误和框坐标噪声会直接传递给模型。

#### 🧪 练习题

```yaml
question: "LayoutLM 的 MVLM 与普通 BERT MLM 最大的区别是什么？"
options:
  - "MVLM 不预测被 mask 的词，只预测文档类别"
  - "MVLM 在预测被 mask 词时保留其 2D 坐标，使模型利用版面信息恢复文本"
  - "MVLM 只使用图像 patch，不使用 OCR 文本"
  - "MVLM 必须使用字符级标注进行训练"
answer: 1
explain: "LayoutLM mask 文本 token 时仍保留对应的 2D layout embedding，因此模型需要联合上下文和空间位置进行预测。"
```
