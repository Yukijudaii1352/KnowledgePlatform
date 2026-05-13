### ALBEF — 对齐后融合：基于动量蒸馏的视觉-语言表征学习

```yaml
id: albef
name: ALBEF
full_name: "Align before Fuse: Vision and Language Representation Learning with Momentum Distillation"
year: "2021"
org: Salesforce
paper_url: "https://arxiv.org/abs/2107.07651"
category: encoder_decoder
parent: clip
motivation: 对齐后融合+动量蒸馏处理噪声
```

#### 📝 一句话总结

ALBEF 提出在跨模态融合之前先通过对比学习对齐图像与文本表征，并引入动量蒸馏（Momentum Distillation）从噪声网络数据中学习鲁棒的多模态表征，在图文检索、VQA、NLVR2、视觉蕴含等多项下游任务上取得当时的 SOTA 性能。

#### 🎯 核心要点

- **"先对齐再融合"架构**：图像编码器（ViT-B/16）和文本编码器（BERT 前 6 层）先独立编码，通过 ITC 对比损失在融合前对齐单模态表征，再送入 6 层多模态编码器进行深度交互
- **三大预训练目标联合优化**：Image-Text Contrastive Learning（ITC）、Image-Text Matching（ITM）、Masked Language Modeling（MLM）
- **动量蒸馏（MoD）**：维护一个指数移动平均的动量模型，生成伪标签（软目标）替代噪声的 one-hot 标签，显著提升对网络噪声数据的鲁棒性
- **难负例挖掘**：利用 ITC 的对比相似度选取最具迷惑性的负样本用于 ITM 训练，提升细粒度匹配能力
- **预训练数据**：使用 4M 或 14M 规模的网络图文对数据（来自 Conceptual Captions、SBU、COCO、Visual Genome 等）
- **下游任务全面 SOTA**：在 Flickr30K 检索（TR R@1 95.9%）、COCO 检索、VQA（76.04）、NLVR2（82.55）、Visual Entailment（80.91）等任务上超越同期方法

#### 🔬 深入细节

##### 模型架构总览

![ALBEF 模型架构图](https://ar5iv.labs.arxiv.org/html/2107.07651/assets/x1.png)
*图：ALBEF 预训练框架。左侧为图像编码器（12 层 ViT）和文本编码器（6 层 Transformer），右侧为多模态编码器（6 层带交叉注意力的 Transformer）。三个预训练目标 ITC、ITM、MLM 联合优化。动量模型（虚线框）用于生成伪标签进行蒸馏。*

##### 算法伪代码

```python
# ALBEF 预训练伪代码
# 初始化
image_encoder = ViT_B_16()          # 12层 Vision Transformer
text_encoder = BERT_base[:6]         # BERT 前6层
multimodal_encoder = BERT_base[6:]   # BERT 后6层 + 交叉注意力
# 动量模型（指数移动平均）
mom_image_encoder = copy(image_encoder)
mom_text_encoder = copy(text_encoder)
mom_multimodal_encoder = copy(multimodal_encoder)

for images, texts in dataloader:
    # === 单模态编码 ===
    img_feat = image_encoder(images)       # [B, N+1, D], 含[CLS]
    txt_feat = text_encoder(texts)         # [B, L, D], 含[CLS]
    img_cls = normalize(img_proj(img_feat[:, 0]))  # 图像[CLS]投影
    txt_cls = normalize(txt_proj(txt_feat[:, 0]))  # 文本[CLS]投影

    # === 1. ITC: Image-Text Contrastive Loss ===
    sim_i2t = img_cls @ txt_cls.T / tau   # 温度缩放的相似度矩阵
    # 动量模型生成软目标
    with no_grad():
        mom_img_cls = mom_image_encoder(images)[:, 0]
        mom_txt_cls = mom_text_encoder(texts)[:, 0]
        soft_target = softmax(mom_img_cls @ mom_txt_cls.T / tau)
    # ITC损失 = (1-α)*CE(sim, one_hot) + α*KL(sim, soft_target)
    L_itc = (1 - alpha) * cross_entropy(sim_i2t, labels) \
          + alpha * kl_div(log_softmax(sim_i2t), soft_target)

    # === 2. ITM: Image-Text Matching Loss ===
    # 利用ITC相似度挖掘难负例
    hard_neg_texts = select_hard_negatives(sim_i2t, texts)
    hard_neg_images = select_hard_negatives(sim_i2t.T, images)
    # 正样本 + 难负例 送入多模态编码器
    itm_logits = multimodal_encoder(img_feat, txt_feat)  # 交叉注意力融合
    L_itm = binary_cross_entropy(itm_logits, match_labels)

    # === 3. MLM: Masked Language Modeling Loss ===
    masked_texts = random_mask(texts, prob=0.15)
    masked_feat = text_encoder(masked_texts)
    mlm_logits = multimodal_encoder(img_feat, masked_feat)
    # 动量蒸馏：软目标替代one-hot
    with no_grad():
        mom_mlm_soft = mom_multimodal_encoder(mom_img_feat, mom_masked_feat)
    L_mlm = (1 - alpha) * cross_entropy(mlm_logits, true_tokens) \
          + alpha * kl_div(log_softmax(mlm_logits), softmax(mom_mlm_soft))

    # === 总损失 ===
    loss = L_itc + L_itm + L_mlm
    loss.backward()
    optimizer.step()

    # === 更新动量模型 ===
    mom_image_encoder = m * mom_image_encoder + (1 - m) * image_encoder   # m=0.995
    mom_text_encoder = m * mom_text_encoder + (1 - m) * text_encoder
    mom_multimodal_encoder = m * mom_multimodal_encoder + (1 - m) * multimodal_encoder
```

##### 动机与背景

视觉-语言预训练（VLP）旨在从大规模图文对中学习通用的多模态表征。在 ALBEF 之前，主流方法面临两大核心问题：

1. **视觉特征瓶颈**：早期方法（如 ViLBERT、UNITER）依赖预训练的目标检测器（如 Faster R-CNN）提取区域特征，导致计算开销巨大且视觉特征无法端到端优化。虽然 ViLT 尝试直接使用图像 Patch，但其简单拼接的方式缺乏有效的跨模态对齐。

2. **网络数据噪声**：从互联网收集的图文对（如 Conceptual Captions）普遍存在文本与图像弱相关甚至不相关的噪声问题。传统方法使用 one-hot 标签监督，将每个图文对视为严格匹配/不匹配，无法处理这种模糊性。

> 💡 关键洞察：ALBEF 的核心思想是"**先对齐，再融合**"——在将图像和文本特征送入昂贵的多模态融合模块之前，先通过轻量级的对比学习将两个模态的表征空间对齐，使融合模块能更高效地学习细粒度的跨模态交互。

##### 核心机制详解

**（1）模型架构：三段式设计**

ALBEF 采用三段式架构，而非传统的单一 Transformer：

- **图像编码器**：12 层 ViT-B/16，将 \(256 \times 256\) 图像分割为 \(16 \times 16\) 的 Patch 序列，输出 \(\{v_{\text{cls}}, v_1, \ldots, v_N\}\)，其中 \(N = 256\)（含 1 个 [CLS] token）。使用 ImageNet-1K 预训练的 DeiT 权重初始化。

- **文本编码器**：6 层 Transformer（取 BERT-base 前 6 层），输出 \(\{w_{\text{cls}}, w_1, \ldots, w_L\}\)。使用 BERT-base 预训练权重初始化。

- **多模态编码器**：6 层带交叉注意力（Cross-Attention）的 Transformer（取 BERT-base 后 6 层，并插入交叉注意力层）。文本特征作为 Query，图像特征作为 Key/Value，通过交叉注意力实现深度融合。

> ⚠️ 注意：多模态编码器中的交叉注意力层是新增的（随机初始化），而自注意力和前馈层则继承自 BERT-base 后 6 层的权重。

**（2）三大预训练目标**

**Image-Text Contrastive Learning (ITC)**：在融合之前对齐单模态表征。将图像 [CLS] 和文本 [CLS] 分别通过线性投影映射到归一化的低维空间，计算余弦相似度：

$$s(I, T) = g_v(v_{\text{cls}})^\top g_w(w_{\text{cls}})$$

其中 \(g_v, g_w\) 为线性投影头。对比损失采用 InfoNCE 形式，正样本为匹配的图文对，负样本来自同一 batch 内的其他样本。此外，ALBEF 维护两个动量队列（momentum queue）存储最近的特征向量，扩大负样本数量而不增加 GPU 显存开销。

**Image-Text Matching (ITM)**：二分类任务，判断图文对是否匹配。将图像和文本特征送入多模态编码器，取输出的 [CLS] token 经线性分类头预测匹配概率。关键创新在于**难负例挖掘**：利用 ITC 计算的相似度矩阵，为每张图像选择与之最相似但不匹配的文本作为负样本（反之亦然），迫使模型学习更细粒度的区分能力。

$$p^{\text{itm}} = \text{softmax}(f_{\text{cls}}(\text{MultimodalEnc}(v, w)))$$

**Masked Language Modeling (MLM)**：随机遮蔽 15% 的文本 token，利用图像信息和上下文预测被遮蔽的词。与 BERT 的 MLM 不同，这里的预测同时依赖文本上下文和视觉信息，迫使模型学习细粒度的视觉-语言对齐。

$$L_{\text{mlm}} = \mathbb{E}_{(I,\hat{T}) \sim D}\, H\big(y^{\text{msk}},\, p^{\text{msk}}(I, \hat{T})\big)$$

其中 \(\hat{T}\) 是遮蔽后的文本，\(y^{\text{msk}}\) 是被遮蔽 token 的真实标签。

**（3）动量蒸馏（Momentum Distillation, MoD）**

这是 ALBEF 最重要的创新之一。核心思想是：网络图文对的 one-hot 标签不可靠（一张图可能与多个文本相关），因此用动量模型生成的软标签（soft pseudo-targets）替代硬标签。

动量模型是在线模型的指数移动平均（EMA）版本：

$$\theta' = m \cdot \theta' + (1 - m) \cdot \theta, \quad m = 0.995$$

对于 ITC 损失，动量模型生成的软目标为：

$$q^{\text{i2t}} = \frac{\exp(s'(I, T_i) / \tau)}{\sum_j \exp(s'(I, T_j) / \tau)}$$

最终 ITC 损失变为原始 CE 损失与 KL 散度的加权组合：

$$L_{\text{itc}}^{\text{mod}} = (1 - \alpha) \cdot H(y^{\text{i2t}}, p^{\text{i2t}}) + \alpha \cdot \text{KL}(q^{\text{i2t}} \| p^{\text{i2t}})$$

类似地，MLM 损失也引入动量蒸馏。这使得模型能从动量模型的"集体智慧"中学习，即使原始标签有噪声，软目标也能提供更准确的监督信号。

> 💡 关键：动量蒸馏的本质是**自训练（self-training）**——用模型自身的平滑版本生成伪标签。由于 EMA 模型是多步训练的集成，其预测比单步模型更稳定，能有效抑制噪声标签的影响。

##### 下游任务适配与训练流程

ALBEF 的下游任务适配非常灵活：

- **图文检索**：直接使用 ITC 相似度进行粗排，再用 ITM 分数精排。ITC 提供高效的全局匹配，ITM 提供精确的细粒度判断。
- **VQA**：将多模态编码器的输出接一个 6 层 Transformer 解码器，以自回归方式生成答案（开放式生成而非分类）。
- **NLVR2**：需要判断两张图片与一段文本的关系。ALBEF 对两张图分别与文本进行多模态编码，然后合并 [CLS] 特征进行分类。
- **Visual Entailment**：类似 ITM，判断图像是否蕴含文本假设。

预训练配置：使用 AdamW 优化器，学习率 \(1 \times 10^{-4}\)（图像编码器 \(1 \times 10^{-5}\)），在 8 张 A100 上训练 30 个 epoch（4M 数据）。

##### 与传统方法的关键区别

| 特性 | 传统方法（UNITER等） | ViLT | ALBEF |
|------|---------------------|------|-------|
| 视觉特征 | 目标检测器（Faster R-CNN） | 原始 Patch | 原始 Patch（ViT） |
| 跨模态交互 | 直接拼接融合 | 直接拼接融合 | **先对齐再融合** |
| 噪声处理 | 无 | 无 | **动量蒸馏** |
| 负例策略 | 随机采样 | 随机采样 | **难负例挖掘** |
| 推理效率 | 慢（需检测器） | 快 | 中等（三段式） |

ALBEF 的核心优势在于：(1) 对比学习预对齐使融合更高效；(2) 动量蒸馏使模型对噪声数据鲁棒；(3) 端到端训练避免了目标检测器的瓶颈。

#### 🧪 练习题

```yaml
question: "ALBEF 中动量蒸馏（Momentum Distillation）的主要目的是什么？"
options:
  - "加速模型训练收敛"
  - "增加负样本数量以改善对比学习"
  - "用动量模型生成软伪标签，缓解网络图文对的噪声标签问题"
  - "减少多模态编码器的计算开销"
answer: 2
explain: "网络爬取的图文对存在大量噪声（文本与图像弱相关），one-hot 硬标签不可靠。动量蒸馏通过 EMA 模型生成软目标分布，为 ITC 和 MLM 提供更准确的监督信号，显著提升模型对噪声数据的鲁棒性。"
```