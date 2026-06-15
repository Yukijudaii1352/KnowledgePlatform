### ViLT — 视觉语言Transformer (ViLT)

```yaml
id: vilt
name: ViLT
full_name: 视觉语言Transformer (ViLT)
year: '2021'
org: KAIST
paper_url: https://proceedings.mlr.press/v139/kim21k.html
category: foundation
parent: oscar
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
