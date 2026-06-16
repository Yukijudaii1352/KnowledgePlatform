### ViLT

```yaml
id: vilt
name: ViLT
year: '2021'
category: encoder_decoder
institution: KAIST
paper: ICML 2021
motivation: 首个完全摒弃目标检测器的VLM
parent: —
description: 直接将图像Patch和文本Token拼接输入统一Transformer，解决推理速度慢的痛点。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/vilt_detail.md
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
