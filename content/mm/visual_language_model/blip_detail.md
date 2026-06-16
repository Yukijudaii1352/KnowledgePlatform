### BLIP — 用 CapFilt 引导的统一视觉语言预训练框架

```yaml
id: blip
name: BLIP
year: '2022'
category: encoder_decoder
institution: Salesforce
paper: ICML 2022
motivation: CapFilt数据引导提升质量
parent: albef
description: 通过Captioner生成合成标题并用Filter剔除噪声，联合优化ITC、ITM和LM三个目标。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/blip_detail.md
```

#### 📝 一句话总结

BLIP 提出 Multimodal Mixture of Encoder-Decoder（MED）和 Captioning-and-Filtering（CapFilt），用一个可切换为编码器/解码器的视觉语言模型同时服务理解与生成任务，并通过“生成合成标题 + 过滤噪声文本”提升网络图文数据质量。

#### 🎯 核心要点

- **统一架构 MED**：同一套视觉编码器与文本 Transformer 可作为 unimodal encoder、image-grounded text encoder、image-grounded text decoder 使用。
- **三目标联合预训练**：ITC 对齐全局图文表示，ITM 学习细粒度匹配，LM 以自回归方式生成图像条件文本。
- **参数共享设计**：image-grounded encoder 与 decoder 共享 embedding、cross-attention 和 FFN，仅区分双向 self-attention 与因果 self-attention。
- **CapFilt 数据闭环**：先用预训练 MED 微调 Captioner 和 Filter，再为 web images 生成 synthetic captions，并过滤原始 web texts 与 synthetic texts 中的噪声。
- **继承 ALBEF 的稳健训练技巧**：ITC 使用动量编码器软标签处理潜在正例，ITM 使用 hard negative mining 强化细粒度判别。
- **训练数据强调质量提升**：在 COCO、Visual Genome、Conceptual Captions、Conceptual 12M、SBU，以及扩展 LAION 子集上验证 CapFilt 的可扩展性。

#### 🔬 深入细节

##### 框架图与关键流程

![BLIP MED 预训练架构](https://ar5iv.labs.arxiv.org/html/2201.12086/assets/x2.png)
*图：BLIP 的 MED 以同一视觉编码器连接三种文本功能形态，分别计算 ITC、ITM 和 LM。*

![BLIP CapFilt 数据自举流程](https://ar5iv.labs.arxiv.org/html/2201.12086/assets/x3.png)
*图：CapFilt 先从预训练 MED 派生 Captioner 与 Filter，再用合成标题和过滤后的标题构造更干净的预训练语料。*

##### 算法/流程伪代码

```python
# BLIP + CapFilt 训练流程伪代码
web_pairs = {(image_w, text_w)}
human_pairs = {(image_h, text_h)}  # COCO / VG 等高质量标注

# 1. 在原始图文对上预训练一个 MED
med = MultimodalMixtureEncoderDecoder()
for image, text in pretrain_loader(web_pairs + human_pairs):
    image_feat = med.visual_encoder(image)

    # Unimodal encoder: ITC
    img_cls, txt_cls = med.encode_unimodal(image_feat, text)
    loss_itc = contrastive_loss_with_momentum_targets(img_cls, txt_cls)

    # Image-grounded text encoder: ITM
    hard_neg = sample_hard_negatives(img_cls, txt_cls)
    loss_itm = image_text_matching_loss(med, image_feat, text, hard_neg)

    # Image-grounded text decoder: LM
    loss_lm = autoregressive_caption_loss(med, image_feat, text)

    update(med, loss_itc + loss_itm + loss_lm)

# 2. 从 MED 派生两个数据自举模块
captioner = finetune_as_decoder(med, human_pairs)  # image -> synthetic caption
filter_model = finetune_as_matching_encoder(med, human_pairs)  # image/text -> match?

# 3. 对 web 图像生成并过滤文本
bootstrapped_pairs = []
for image_w, text_w in web_pairs:
    text_s = captioner.generate(image_w, sampling="nucleus")

    if filter_model.is_matched(image_w, text_w):
        bootstrapped_pairs.append((image_w, text_w))
    if filter_model.is_matched(image_w, text_s):
        bootstrapped_pairs.append((image_w, text_s))

# 4. 用过滤后数据重新预训练最终 BLIP
final_train_set = bootstrapped_pairs + human_pairs
blip = pretrain_MED(final_train_set, objectives=["ITC", "ITM", "LM"])
```

##### 1. 动机：统一模型能力与清洗网络噪声是同一个问题

BLIP 的出发点有两层。第一层是模型形态问题：CLIP/ALBEF 一类 encoder-based 模型擅长检索、匹配、分类等理解任务，但直接做 captioning、VQA answer generation 并不自然；纯 encoder-decoder 生成模型可以生成文本，但通常没有高效的全局图文对齐能力，检索效果不稳定。BLIP 的 MED 把这两类能力放进一个可切换的多模态 Transformer 里，使同一个模型既能学图文对比，也能学图像条件语言建模。

第二层是数据质量问题：大规模 VLP 依赖 web alt-text，但网页文本经常只是文件名、广告语、上下文碎片，未必描述图像主体。直接扩大噪声数据会提高覆盖面，却把错误对齐也放大。CapFilt 的设计把模型能力反过来用于数据自举：Captioner 给图像补充更“视觉中心”的描述，Filter 删除不匹配的原始文本和合成文本，因此预训练信号不再完全受原始 alt-text 质量限制。

##### 2. MED：三种功能由同一骨架切换出来

BLIP 使用 ViT 作为视觉编码器，把图像切成 patch 后输出视觉 token 序列；文本侧使用 BERT 风格 Transformer，并插入 cross-attention 来接收视觉信息。MED 的关键不是简单堆三个模型，而是把文本模块切成三种工作模式：unimodal encoder 只看文本，用于和图像全局表示做对比；image-grounded text encoder 使用双向 self-attention 和 cross-attention，用于判断一对图文是否匹配；image-grounded text decoder 把 self-attention 改成 causal mask，用于从左到右生成标题。

三种目标可以写成总损失：

$$
\mathcal{L}_{\text{BLIP}}
= \mathcal{L}_{\text{ITC}}
+ \mathcal{L}_{\text{ITM}}
+ \mathcal{L}_{\text{LM}} .
$$

ITC 在融合前对齐图像和文本的全局 embedding。令归一化后的图像/文本向量为 \(v_i,t_j\)，温度为 \(\tau\)，图像到文本的概率为：

$$
p_{i \rightarrow j}
= \frac{\exp(v_i^\top t_j / \tau)}
{\sum_k \exp(v_i^\top t_k / \tau)} .
$$

BLIP 沿用 ALBEF 的动量编码器软标签：batch 内某些“负例”可能其实也是合理描述，硬 one-hot 会误惩罚这些潜在正例。动量模型给出的相似度分布可作为更平滑的目标，ITC 因而兼具对齐与抗噪能力。

##### 3. ITM 与 LM：一个负责判别，一个负责生成

ITM 激活 image-grounded text encoder。它不是只比较两个全局向量，而是让文本 token 通过 cross-attention 读取视觉 token，再由 `[Encode]` 表示预测 match/unmatch。负样本也不是纯随机采样，而是按 ITC 相似度挑选最像正样本的 hard negatives。这样训练出来的匹配头会被迫关注局部实体、属性和关系，而不是只利用粗粒度主题相似性。

LM 激活 image-grounded text decoder。给定图像 \(I\) 和文本序列 \(T=(w_1,\dots,w_L)\)，它最大化自回归似然：

$$
\mathcal{L}_{\text{LM}}
= - \sum_{\ell=1}^{L} \log p_\theta(w_\ell \mid w_{<\ell}, I).
$$

这一步使 BLIP 获得图像描述生成能力，也为 CapFilt 的 Captioner 提供基础。与 MLM 相比，LM 直接训练“视觉信息到自然语言”的转换，因此更适合 captioning、开放式 VQA 和后续合成标题。

##### 4. CapFilt：Captioner 与 Filter 是数据质量控制器

CapFilt 的具体流程是：先用噪声 web 数据和高质量标注数据预训练一个 MED；再用 COCO 等人工标注数据分别微调 Captioner 和 Filter。Captioner 是 image-grounded decoder，输入 web image 输出 synthetic caption；Filter 是 image-grounded encoder，用 ITC/ITM 判断某个文本是否真的匹配图像。

过滤规则可以抽象为：

$$
\mathcal{D}_{\text{boot}}
= \{(I_w,T_w) \mid F(I_w,T_w)=1\}
\cup
\{(I_w,T_s) \mid F(I_w,T_s)=1\}
\cup \mathcal{D}_{\text{human}} .
$$

其中 \(T_w\) 是原始网页文本，\(T_s\) 是合成标题。这个集合既保留了 web 数据的规模，又用 Filter 控制语义对齐质量。论文中特别强调合成标题的多样性：nucleus sampling 生成的标题噪声率更高，但信息更丰富，经过过滤后比 beam search 生成的保守标题更能提升下游性能。

##### 5. 与 ALBEF 和传统 VLP 的区别

BLIP 的 parent 可视为 ALBEF，因为它继承了 ITC/ITM、动量软标签、hard negative mining 等思想；但 BLIP 的核心增量在两个地方。其一，ALBEF 主要是理解型 encoder 框架，而 BLIP 把 decoder 作为一等公民纳入预训练目标，统一了检索、匹配、captioning、VQA 等任务。其二，ALBEF 侧重在噪声标签上做软监督，BLIP 进一步把模型用作数据清洗和数据生成工具，用 CapFilt 改造下一轮训练语料。

这种设计的优势是工程上很实用：视觉编码器只需一次前向，文本侧按不同功能分支计算三个损失；下游任务也可以按需要选择 encoder 或 decoder 形态。检索时用 ITC 快速召回、ITM 精排；captioning 时直接用 decoder；VQA 则把问题和图像作为条件生成答案。

#### 🧪 练习题

```yaml
question: "BLIP 中 CapFilt 的核心作用是什么？"
options:
  - "把图像 patch 压缩成固定数量视觉 token"
  - "通过 Captioner 生成合成标题，并用 Filter 删除不匹配的原始/合成文本"
  - "只用图文对比学习替代所有生成目标"
  - "冻结视觉编码器，只训练语言模型"
answer: 1
explain: "CapFilt 是 BLIP 的数据自举机制：Captioner 补充视觉相关标题，Filter 控制图文匹配质量，最终得到更干净、更有信息量的预训练图文对。"
```
