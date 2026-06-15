### BLIP-2：自举语言图像预训练v2

```yaml
id: blip2
name: BLIP-2
full_name: 自举语言图像预训练v2 (BLIP-2)
year: '2023'
org: Salesforce
paper_url: https://proceedings.mlr.press/v202/li23q
category: fusion_model
parent: blip
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
