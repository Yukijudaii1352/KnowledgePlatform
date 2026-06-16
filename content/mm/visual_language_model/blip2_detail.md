### BLIP-2 — 用 Q-Former 高效桥接冻结视觉编码器与冻结大语言模型

```yaml
id: blip2
name: BLIP-2
year: '2023'
category: connector
institution: Salesforce
paper: ICML 2023
motivation: Q-Former高效模态桥接
parent: blip
description: 188M参数的Q-Former使用32个可学习查询，两阶段预训练实现极高参数效率，以54倍更少参数超越Flamingo-80B。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/blip2_detail.md
```

#### 📝 一句话总结

BLIP-2 提出一个轻量 Q-Former 作为冻结图像编码器与冻结 LLM 之间的信息瓶颈，通过“视觉-语言表征学习 → 视觉到语言生成学习”的两阶段预训练，解决端到端多模态预训练成本高、冻结 LLM 难以理解视觉特征的问题。

#### 🎯 核心要点

- **模块化冻结策略**：冻结预训练图像编码器和预训练 LLM，只训练 Q-Former 与少量投影层，避免大规模端到端训练和灾难性遗忘。
- **Q-Former 桥接器**：188M 参数，使用 32 个可学习 query，每个 query 维度 768；query 通过交叉注意力从图像特征中抽取固定长度视觉表示。
- **两阶段预训练**：第一阶段面向冻结图像编码器学习视觉-语言表征，第二阶段把 Q-Former 输出投影为冻结 LLM 可消费的 soft visual prompts。
- **三种一阶段目标**：Image-Text Contrastive Learning、Image-Text Matching、Image-grounded Text Generation 共享 Q-Former 参数，但使用不同自注意力 mask 控制 query 与文本交互。
- **兼容多类 LLM**：既可连接 OPT 等 decoder-only LLM，也可连接 FlanT5 等 encoder-decoder LLM，对应使用语言建模或 prefix language modeling。
- **参数效率显著**：在多个零样本视觉语言任务上达到强性能，并以远少于 Flamingo-80B 的可训练参数取得更高 VQAv2 零样本表现。

#### 🔬 深入细节

##### 架构总览

![BLIP-2 Q-Former 架构与一阶段训练目标](https://arxiv.org/html/2301.12597v3/x2.png)
*图：BLIP-2 的 Q-Former 结构。可学习 query 与冻结图像特征交叉注意力交互，并在 ITC、ITM、ITG 三个目标下使用不同的 query-text attention mask。*

##### 核心流程伪代码

```python
# BLIP-2 pretraining sketch
image_encoder.freeze()
llm.freeze()
q_former = QFormer(num_queries=32, hidden_size=768)  # BERT initialized
proj_to_llm = Linear(q_former_dim, llm_embed_dim)

for image, text in image_text_loader:
    image_feat = image_encoder(image)  # frozen ViT features

    # Stage 1: representation learning from frozen image encoder
    q_out_itc = q_former(queries, image_feat, text, mask="unimodal")
    txt_cls = q_former.text_encode(text, mask="unimodal").cls
    sim = max_query_cosine(q_out_itc.queries, txt_cls) / tau
    loss_itc = contrastive_ce(sim)

    q_out_itm = q_former(queries, image_feat, text_or_hard_negative, mask="bidirectional")
    loss_itm = binary_ce(mean(itm_head(q_out_itm.queries)), match_label)

    q_out_itg = q_former(queries, image_feat, shifted_text, mask="multimodal_causal")
    loss_itg = autoregressive_ce(q_out_itg.text_logits, target_text)

    loss_stage1 = loss_itc + loss_itm + loss_itg
    update(q_former, loss_stage1)

for image, text in image_text_loader:
    image_feat = image_encoder(image)
    visual_tokens = q_former(queries, image_feat).queries
    soft_prompt = proj_to_llm(visual_tokens)

    # Stage 2: make frozen LLM interpret visual prompts
    llm_input = concat(soft_prompt, tokenize(text_prefix))
    loss_stage2 = language_modeling_loss(llm, llm_input, target=text_suffix_or_full_text)
    update(q_former, proj_to_llm, loss_stage2)
```

##### 方法解读

BLIP-2 的出发点是多模态预训练的“昂贵对齐”问题：如果像早期 VLP 那样联合训练视觉编码器、跨模态 Transformer 和语言模型，训练成本会随模型与数据规模迅速上升；如果直接把视觉特征塞给冻结 LLM，语言模型又没有在预训练中见过图像，单纯的图像到文本生成损失不足以建立稳定的跨模态对齐。BLIP-2 的选择是把强大的单模态模型视为固定资产，只学习一个小而强的连接器，让视觉信息先被压缩成 LLM 容易解释的少量 token。

Q-Former 是这个连接器的核心。它包含共享 self-attention 的 image transformer 与 text transformer，并在 image transformer 中每隔一层插入 cross-attention，让 32 个 query token 去读取冻结 ViT 的 patch 特征。每个 query 都是可学习参数，输出为 \(Z=\{z_1,\ldots,z_M\}\)，其中 \(M=32\)。由于 \(M\) 远小于 ViT patch 数，Q-Former 被迫学习“哪些视觉信息对语言最有用”，而不是把全部图像网格原样传给 LLM。

第一阶段的三个目标分别塑造不同粒度的对齐能力。ITC 用于全局图文对齐，图像与文本相似度不是单个图像向量与文本向量相乘，而是让多个 query 与文本 [CLS] 逐一匹配后取最大值：

$$
s(I,T)=\max_{m \in \{1,\ldots,M\}} \frac{z_m^\top t_{\mathrm{cls}}}{\tau}
$$

这样做允许不同 query 捕获不同语义区域，最终由最相关的 query 支撑图文匹配。ITM 则使用双向注意力，让 query 与文本 token 充分交互后做二分类，并配合 hard negative mining 学细粒度差异。ITG 使用类似 UniLM 的多模态因果 mask：query 不能偷看未来文本，文本 token 可以看 query 和历史 token，因此 query 必须先把足够的图像信息抽取出来，再支撑文本生成。

第二阶段把 Q-Former 从“能对齐图文”推进到“能被 LLM 理解”。具体做法是把 query 输出经线性层投影到 LLM 词嵌入维度：

$$
E_v = W Z + b,\qquad
\mathcal{L}_{\mathrm{LM}}=-\sum_t \log p_{\theta_{\mathrm{LLM}}}(y_t \mid E_v, x_{<t})
$$

这里 LLM 参数 \(\theta_{\mathrm{LLM}}\) 保持冻结，训练压力集中在 Q-Former 和投影层上。对于 OPT 这类 decoder-only LLM，\(E_v\) 被当作前缀 soft prompt，目标是生成整段文本；对于 FlanT5 这类 encoder-decoder LLM，视觉 prompt 与文本 prefix 进入 encoder，decoder 预测 suffix。这个设计把视觉对齐问题变成“学习一组语言模型可解释的前缀嵌入”。

与 Flamingo 一类在 LLM 内部插入交叉注意力层的方法相比，BLIP-2 更保守：它不改动大语言模型内部结构，也不要求反向传播穿过 LLM 的全部参数。代价是视觉信息必须经过 32 个 query 的瓶颈，可能丢失细粒度空间信息；收益是训练便宜、模型可替换性强，并且能继承不同冻结 LLM 的语言与指令能力。BLIP-2 也因此成为后续 InstructBLIP、MiniGPT-4 等 connector 路线的直接基础。

> 💡 关键：BLIP-2 的“高效”并不是只靠少训练参数，而是靠两阶段目标先让 query 学会抽取语言相关视觉信息，再让这些 query 输出落到冻结 LLM 的嵌入空间中。

#### 🧪 练习题

```yaml
question: "BLIP-2 为什么要在第一阶段同时使用 ITC、ITM 和 ITG，而不是只用图像到文本生成损失？"
options:
  - "因为三个目标分别提供全局对齐、细粒度匹配和条件生成信号，能让 Q-Former 更充分学习语言相关视觉表示"
  - "因为冻结图像编码器无法输出 patch 特征，只能依赖多个损失补偿"
  - "因为 ITG 会训练冻结 LLM 的全部参数，需要 ITC 和 ITM 防止过拟合"
  - "因为 Q-Former 没有自注意力层，只能通过多任务损失模拟 token 交互"
answer: 0
explain: "BLIP-2 的第一阶段不连接 LLM，而是用互补目标训练 Q-Former 抽取可对齐、可匹配、可生成的视觉表示；冻结图像编码器和 LLM 并不会被这些损失端到端更新。"
```
