### BLIP-2 — 引导式语言图像预训练2 (Bootstrapping Language-Image Pre-training 2)

```yaml
id: blip2
name: BLIP-2
full_name: "引导式语言图像预训练2 (Bootstrapping Language-Image Pre-training 2)"
year: "2023"
org: "Salesforce"
paper_url: "https://proceedings.mlr.press/v202/li23q"
category: foundation
parent: "clip"
motivation: "Q-Former轻量桥接，冻结编码器高效训练"
```

#### 📝 一句话总结

BLIP-2 提出 Q-Former 作为冻结视觉编码器与冻结大语言模型之间的轻量桥接器，通过两阶段预训练完成视觉语言对齐，解决了端到端训练大规模 VLM 成本高、且难以复用现成单模态模型的问题。

#### 🎯 核心要点

- 冻结两端大模型：图像编码器使用 CLIP/EVA-CLIP ViT，语言模型使用 OPT 或 FlanT5
- Q-Former 桥接模块：188M 参数，包含可学习 query token 与共享 self-attention 的图像/文本 Transformer
- 固定数量查询：常用 32 个 learnable queries 从视觉特征中抽取与文本最相关的信息
- 第一阶段视觉语言表征学习：联合优化 ITC、ITM、ITG 三个目标
- 第二阶段视觉到语言生成学习：将 query 输出线性投影为 LLM 可读的软视觉 prompt
- 高效训练：只训练 Q-Former 和少量投影层，大幅减少可训练参数与显存成本
- 支持零样本图像到文本生成、视觉问答、captioning 与图文检索

#### 🔬 深入细节

##### 核心架构示意图

![BLIP-2 两阶段框架](https://arxiv.org/html/2301.12597v3/x1.png)
*图：BLIP-2 先用 Q-Former 从冻结图像编码器抽取语言相关视觉表示，再把该表示接到冻结 LLM 上做生成。*

##### 算法伪代码

```python
# Stage 1: 从冻结图像编码器学习视觉语言表示
for image, text in image_text_pairs:
    image_feats = frozen_image_encoder(image)
    query_outputs = q_former(learned_queries, image_feats, text=None)
    text_outputs = q_former(text=text, image_feats=None)

    loss_itc = image_text_contrastive(query_outputs, text_outputs)
    loss_itm = image_text_matching(q_former(learned_queries, image_feats, text))
    loss_itg = image_grounded_text_generation(q_former(learned_queries, image_feats, text))
    optimize_q_former(loss_itc + loss_itm + loss_itg)

# Stage 2: 让冻结 LLM 理解视觉 soft prompt
for image, text in image_text_pairs:
    image_feats = frozen_image_encoder(image)
    visual_queries = q_former(learned_queries, image_feats)
    visual_prompt = linear_projection(visual_queries)
    loss = frozen_llm_language_modeling(prefix=visual_prompt, target=text)
    optimize_q_former_and_projection(loss)
```

##### 动机与背景

大规模视觉语言预训练通常需要同时训练视觉 backbone、跨模态融合层和语言模型，成本高且容易破坏预训练模型已有能力。BLIP-2 的核心假设是：强视觉模型已经懂图像，强语言模型已经懂生成和指令，真正缺失的是一个足够小、可训练、能把视觉特征翻译成语言模型可用表示的接口。

Q-Former 正是这个接口。它不是把全部图像 patch 送入 LLM，而是用少量 query token 从冻结图像特征中提取“与语言相关”的瓶颈表示。这个瓶颈既降低计算，也迫使模型过滤掉对文本生成无关的视觉细节。

##### Q-Former 结构

Q-Former 包含两套功能视角：图像 Transformer 用 learnable queries 与冻结图像特征做 cross-attention；文本 Transformer 可以编码或解码文本。两者共享 self-attention 层，但根据任务使用不同 attention mask 控制 query 与 text 的交互。

常用配置中有 32 个 query，每个 query 维度 768。假设 query 输出为 \(Q=\{q_1,\dots,q_M\}\)，文本 `[CLS]` 表示为 \(t\)，图文相似度可以取所有 query 与文本相似度的最大值：

$$
s(I,T)=\max_m \frac{q_m^\top t}{\|q_m\|\|t\|}
$$

这比单个全局图像向量更灵活：不同 query 可以关注物体、属性、关系或背景等不同视觉证据。

##### 第一阶段：视觉语言表征学习

第一阶段只连接冻结图像编码器和 Q-Former，联合三个目标。Image-Text Contrastive Learning 使用 in-batch negatives 对齐图像 query 表示和文本表示；Image-Text Matching 用 hard negatives 训练细粒度匹配分类器；Image-Grounded Text Generation 让文本解码器在 query 条件下生成 caption。

不同目标使用不同 attention mask。ITC 为避免信息泄露，让 query 和 text 互不可见；ITM 使用双向 mask 让两者充分交互；ITG 使用 causal mask，让文本 token 只能看 query 和之前文本。这个设计让同一个 Q-Former 同时学会检索式对齐、匹配判断和生成式视觉 grounding。

##### 第二阶段：接入冻结 LLM

第二阶段把 Q-Former 输出通过全连接层投影到 LLM embedding 维度，并作为 soft visual prompt 前置到语言输入中。对于 decoder-only OPT，训练目标是条件语言建模；对于 encoder-decoder FlanT5，使用 prefix language modeling，把视觉 prompt 和前缀文本送入 encoder，让 decoder 生成后缀文本。

$$
\mathcal{L}_{\text{LM}}=-\sum_t \log p_\text{LLM}(y_t \mid y_{<t}, \mathrm{Proj}(Q(I)))
$$

LLM 参数保持冻结，因此 Q-Former 必须输出能被语言模型解释的视觉 token。相比直接微调 LLM，这种方式训练成本低，也更不容易遗忘语言模型本身的指令和知识能力。

> 💡 关键：BLIP-2 的两阶段训练先让 Q-Former 学“视觉和文本如何对齐”，再学“如何把视觉表示写成 LLM 能读的软提示”。两个问题分开后更稳定。

##### 数据与训练效率

BLIP-2 使用约 129M 图像的混合预训练数据，包括 COCO、Visual Genome、CC3M、CC12M、SBU 以及 LAION400M 子集，并使用 CapFilt 生成/筛选合成 caption。论文报告在冻结 ViT 和 LLM 的条件下，最大模型第一阶段和第二阶段分别只需数天级训练。

##### 与 Flamingo 和 CLIP 的区别

CLIP 学到的是全局图文对比空间，不能直接做开放文本生成。Flamingo 把交叉注意力插入冻结 LM 的多层，表达力强但新增模块更深。BLIP-2 把视觉信息浓缩成少量 soft prompts 输入 LLM，结构更模块化、更便宜，也便于更换视觉编码器或语言模型。

#### 🧪 练习题

```yaml
question: "BLIP-2 中 Q-Former 的核心作用是什么？"
options:
  - "替代冻结语言模型完成所有文本生成"
  - "从冻结图像特征中抽取少量语言相关视觉表示，并桥接到冻结 LLM"
  - "把图像分类标签直接映射成 one-hot 向量"
  - "只用于提高图像编码器的分辨率"
answer: 1
explain: "Q-Former 使用 learnable queries 读取冻结视觉特征，经过两阶段训练后输出 LLM 可理解的视觉 soft prompt。"
```
