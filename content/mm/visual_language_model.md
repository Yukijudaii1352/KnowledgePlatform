---
domain: multimodal
topic_id: visual_language_model
topic_name: 视觉-语言基础模型
page_icon: 🔗
page_title: 视觉-语言基础模型
page_subtitle: '{build_date} 版'
page_desc: 视觉-语言基础模型（VLM）通过跨模态对齐、指令微调和原生多模态训练，实现图像与文本的深度理解与生成，是多模态AI的核心基础设施。
hero_pills: []
count_pill: '{count} 个算法'
categories:
  contrastive:
    label: 对比学习
    color: '#3B82F6'
  encoder_decoder:
    label: 编解码器
    color: '#10B981'
  connector:
    label: 连接器架构
    color: '#F59E0B'
  native_multimodal:
    label: 原生多模态
    color: '#8B5CF6'
  frontier_2026:
    label: 2026前沿
    color: '#EF4444'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: clip
  x: 100
  y: 100
  category: contrastive
- id: align
  x: 150
  y: 120
  category: contrastive
- id: vilt
  x: 120
  y: 250
  category: encoder_decoder
- id: albef
  x: 140
  y: 200
  category: encoder_decoder
- id: blip
  x: 200
  y: 220
  category: encoder_decoder
- id: flamingo
  x: 220
  y: 350
  category: connector
- id: pali
  x: 240
  y: 450
  category: encoder_decoder
- id: blip2
  x: 300
  y: 240
  category: connector
- id: instructblip
  x: 350
  y: 260
  category: connector
- id: minigpt4
  x: 360
  y: 300
  category: connector
- id: llava
  x: 320
  y: 150
  category: connector
- id: qwen_vl
  x: 380
  y: 170
  category: connector
- id: cogvlm
  x: 390
  y: 130
  category: connector
- id: gemini
  x: 340
  y: 480
  category: native_multimodal
- id: llava_next
  x: 450
  y: 160
  category: connector
- id: internvl_2_5
  x: 460
  y: 320
  category: connector
- id: internvl_3_5
  x: 520
  y: 340
  category: connector
- id: siglip2
  x: 600
  y: 80
  category: frontier_2026
- id: llm2clip
  x: 610
  y: 110
  category: frontier_2026
- id: gpt5_4
  x: 640
  y: 500
  category: native_multimodal
- id: gemini_3_1
  x: 650
  y: 520
  category: native_multimodal
- id: claude_opus_4_7
  x: 660
  y: 400
  category: frontier_2026
- id: llama4
  x: 620
  y: 460
  category: native_multimodal
- id: qwen3_5_vlm
  x: 630
  y: 180
  category: frontier_2026
- id: doubao_2_0
  x: 640
  y: 280
  category: frontier_2026
- id: glm_4_5v
  x: 650
  y: 140
  category: frontier_2026
- id: deepseek_v4
  x: 670
  y: 350
  category: frontier_2026
- id: internvl_3_0
  x: 580
  y: 360
  category: native_multimodal
- id: v_jepa2
  x: 680
  y: 220
  category: frontier_2026
- id: drivepi
  x: 690
  y: 250
  category: frontier_2026
edges:
- from: clip
  to: align
  label: 规模扩展
- from: clip
  to: albef
  label: 对齐融合
- from: clip
  to: llava
  label: 指令微调
- from: clip
  to: siglip2
  label: 统一配方
- from: clip
  to: llm2clip
  label: LLM增强
- from: albef
  to: blip
  label: 数据引导
- from: blip
  to: blip2
  label: Q-Former
- from: blip2
  to: instructblip
  label: 指令感知
- from: blip2
  to: minigpt4
  label: 简化投影
- from: llava
  to: qwen_vl
  label: 位置感知
- from: llava
  to: cogvlm
  label: 深度融合
- from: llava
  to: llava_next
  label: 动态切片
- from: qwen_vl
  to: qwen3_5_vlm
  label: 早期融合
- from: cogvlm
  to: glm_4_5v
  label: 思考模式
- from: pali
  to: gemini
  label: 原生训练
- from: gemini
  to: gpt5_4
  label: 统一架构
- from: gemini
  to: gemini_3_1
  label: 超长上下文
- from: internvl_2_5
  to: internvl_3_5
  label: RL对齐
- from: internvl_3_5
  to: internvl_3_0
  label: 原生预训练
milestones:
- id: clip
  label: 对比学习奠基
  description: CLIP开创大规模图文对比学习范式，成为VLM视觉编码器标准
- id: llava
  label: 指令微调开创
  description: LLaVA首次将指令微调引入多模态，开启开源VLM对话模型浪潮
- id: gemini
  label: 原生多模态标杆
  description: Gemini实现从预训练阶段的原生多模态联合训练，树立新范式标杆
```

## 核心算法

### CLIP

```yaml
id: clip
num: 1
name: CLIP
full_name: CLIP
year: '2021'
org: OpenAI
parent: —
paper_url: ICML 2021
project_url: ''
category: contrastive
motivation: 利用自然语言监督学习通用视觉表征
```

#### 📝 一句话总结
在4亿图文对上进行对比学习，通过双塔架构（ViT+Transformer）实现零样本分类，成为多模态AI的视觉基石。

#### 🎯 核心要点
- 核心动机：利用自然语言监督学习通用视觉表征
- 代表机构：OpenAI
- 在4亿图文对上进行对比学习，通过双塔架构（ViT+Transformer）实现零样本分类，成为多模态AI的视觉基石。

#### 🔬 深入细节
在4亿图文对上进行对比学习，通过双塔架构（ViT+Transformer）实现零样本分类，成为多模态AI的视觉基石。

### ALIGN

```yaml
id: align
num: 2
name: ALIGN
full_name: ALIGN
year: '2021'
org: Google
parent: clip
paper_url: ICML 2021
project_url: ''
category: contrastive
motivation: 验证规模胜于质量的假设
```

#### 📝 一句话总结
使用18亿对原始噪声Alt-text数据，证明简单架构在大规模数据下的强大生命力。

#### 🎯 核心要点
- 核心动机：验证规模胜于质量的假设
- 演化来源：继承或改进自 clip
- 代表机构：Google
- 使用18亿对原始噪声Alt-text数据，证明简单架构在大规模数据下的强大生命力。

#### 🔬 深入细节
使用18亿对原始噪声Alt-text数据，证明简单架构在大规模数据下的强大生命力。

### ViLT

```yaml
id: vilt
num: 3
name: ViLT
full_name: ViLT
year: '2021'
org: KAIST
parent: —
paper_url: ICML 2021
project_url: ''
category: encoder_decoder
motivation: 首个完全摒弃目标检测器的VLM
```

#### 📝 一句话总结
直接将图像Patch和文本Token拼接输入统一Transformer，解决推理速度慢的痛点。

#### 🎯 核心要点
- 核心动机：首个完全摒弃目标检测器的VLM
- 代表机构：KAIST
- 直接将图像Patch和文本Token拼接输入统一Transformer，解决推理速度慢的痛点。

#### 🔬 深入细节
直接将图像Patch和文本Token拼接输入统一Transformer，解决推理速度慢的痛点。

### ALBEF

```yaml
id: albef
num: 4
name: ALBEF
full_name: ALBEF
year: '2021'
org: Salesforce
parent: clip
paper_url: NeurIPS 2021
project_url: ''
category: encoder_decoder
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

### BLIP

```yaml
id: blip
num: 5
name: BLIP
full_name: BLIP
year: '2022'
org: Salesforce
parent: albef
paper_url: ICML 2022
project_url: ''
category: encoder_decoder
motivation: CapFilt数据引导提升质量
```

#### 📝 一句话总结
通过Captioner生成合成标题并用Filter剔除噪声，联合优化ITC、ITM和LM三个目标。

#### 🎯 核心要点
- 核心动机：CapFilt数据引导提升质量
- 演化来源：继承或改进自 albef
- 代表机构：Salesforce
- 通过Captioner生成合成标题并用Filter剔除噪声，联合优化ITC、ITM和LM三个目标。

#### 🔬 深入细节
通过Captioner生成合成标题并用Filter剔除噪声，联合优化ITC、ITM和LM三个目标。

### Flamingo

```yaml
id: flamingo
num: 6
name: Flamingo
full_name: Flamingo
year: '2022'
org: DeepMind
parent: —
paper_url: NeurIPS 2022
project_url: ''
category: connector
motivation: 冻结双塔+门控交叉注意力
```

#### 📝 一句话总结
80B参数，通过Perceiver Resampler和Gated Cross-Attention连接冻结的视觉与语言模型，实现少样本学习。

#### 🎯 核心要点
- 核心动机：冻结双塔+门控交叉注意力
- 代表机构：DeepMind
- 80B参数，通过Perceiver Resampler和Gated Cross-Attention连接冻结的视觉与语言模型，实现少样本学习。

#### 🔬 深入细节
80B参数，通过Perceiver Resampler和Gated Cross-Attention连接冻结的视觉与语言模型，实现少样本学习。

### PaLI

```yaml
id: pali
num: 7
name: PaLI
full_name: PaLI
year: '2022'
org: Google
parent: —
paper_url: arXiv
project_url: ''
category: encoder_decoder
motivation: 视觉语言联合缩放定律
```

#### 📝 一句话总结
提出视觉编码器和语言模型规模应同步增长，支持100+语言的多语言多模态理解。

#### 🎯 核心要点
- 核心动机：视觉语言联合缩放定律
- 代表机构：Google
- 提出视觉编码器和语言模型规模应同步增长，支持100+语言的多语言多模态理解。

#### 🔬 深入细节
提出视觉编码器和语言模型规模应同步增长，支持100+语言的多语言多模态理解。

### BLIP-2

```yaml
id: blip2
num: 8
name: BLIP-2
full_name: BLIP-2
year: '2023'
org: Salesforce
parent: blip
paper_url: ICML 2023
project_url: ''
category: connector
motivation: Q-Former高效模态桥接
```

#### 📝 一句话总结
188M参数的Q-Former使用32个可学习查询，两阶段预训练实现极高参数效率，以54倍更少参数超越Flamingo-80B。

#### 🎯 核心要点
- 核心动机：Q-Former高效模态桥接
- 演化来源：继承或改进自 blip
- 代表机构：Salesforce
- 188M参数的Q-Former使用32个可学习查询，两阶段预训练实现极高参数效率，以54倍更少参数超越Flamingo-80B。

#### 🔬 深入细节
188M参数的Q-Former使用32个可学习查询，两阶段预训练实现极高参数效率，以54倍更少参数超越Flamingo-80B。

### InstructBLIP

```yaml
id: instructblip
num: 9
name: InstructBLIP
full_name: InstructBLIP
year: '2023'
org: Salesforce
parent: blip2
paper_url: NeurIPS 2023
project_url: ''
category: connector
motivation: 指令感知视觉特征提取
```

#### 📝 一句话总结
将文本指令输入Q-Former，引导查询关注与任务相关的视觉区域，在26个数据集上达到SOTA。

#### 🎯 核心要点
- 核心动机：指令感知视觉特征提取
- 演化来源：继承或改进自 blip2
- 代表机构：Salesforce
- 将文本指令输入Q-Former，引导查询关注与任务相关的视觉区域，在26个数据集上达到SOTA。

#### 🔬 深入细节
将文本指令输入Q-Former，引导查询关注与任务相关的视觉区域，在26个数据集上达到SOTA。

### MiniGPT-4

```yaml
id: minigpt4
num: 10
name: MiniGPT-4
full_name: MiniGPT-4
year: '2023'
org: KAUST
parent: blip2
paper_url: ICLR 2024
project_url: ''
category: connector
motivation: 线性投影+高质量对话微调
```

#### 📝 一句话总结
复用BLIP-2视觉前端，通过单层线性投影连接Vicuna，证明小规模高质量数据在第二阶段的关键作用。

#### 🎯 核心要点
- 核心动机：线性投影+高质量对话微调
- 演化来源：继承或改进自 blip2
- 代表机构：KAUST
- 复用BLIP-2视觉前端，通过单层线性投影连接Vicuna，证明小规模高质量数据在第二阶段的关键作用。

#### 🔬 深入细节
复用BLIP-2视觉前端，通过单层线性投影连接Vicuna，证明小规模高质量数据在第二阶段的关键作用。

### LLaVA

```yaml
id: llava
num: 11
name: LLaVA
full_name: LLaVA
year: '2023'
org: UW-Microsoft
parent: clip
paper_url: NeurIPS 2023 Oral
project_url: ''
category: connector
motivation: 视觉指令微调开创者
```

#### 📝 一句话总结
首次将指令微调引入多模态，通过GPT-4生成15万条对话数据，开启开源多模态对话模型浪潮。

#### 🎯 核心要点
- 核心动机：视觉指令微调开创者
- 演化来源：继承或改进自 clip
- 代表机构：UW-Microsoft
- 首次将指令微调引入多模态，通过GPT-4生成15万条对话数据，开启开源多模态对话模型浪潮。

#### 🔬 深入细节
首次将指令微调引入多模态，通过GPT-4生成15万条对话数据，开启开源多模态对话模型浪潮。

### Qwen-VL

```yaml
id: qwen_vl
num: 12
name: Qwen-VL
full_name: Qwen-VL
year: '2023.08'
org: 阿里巴巴
parent: llava
paper_url: arXiv
project_url: ''
category: connector
motivation: 位置感知跨注意力适配器
```

#### 📝 一句话总结
单层Cross-attention适配器支持细粒度定位和强OCR能力，首个原生支持中文的开源多模态大模型。

#### 🎯 核心要点
- 核心动机：位置感知跨注意力适配器
- 演化来源：继承或改进自 llava
- 代表机构：阿里巴巴
- 单层Cross-attention适配器支持细粒度定位和强OCR能力，首个原生支持中文的开源多模态大模型。

#### 🔬 深入细节
单层Cross-attention适配器支持细粒度定位和强OCR能力，首个原生支持中文的开源多模态大模型。

### CogVLM

```yaml
id: cogvlm
num: 13
name: CogVLM
full_name: CogVLM
year: '2023'
org: 智谱AI
parent: llava
paper_url: arXiv
project_url: ''
category: connector
motivation: 视觉专家模块深度融合
```

#### 📝 一句话总结
17B参数，在LLM每一层引入独立的视觉QKV矩阵和MLP层，实现视觉优先的深度融合。

#### 🎯 核心要点
- 核心动机：视觉专家模块深度融合
- 演化来源：继承或改进自 llava
- 代表机构：智谱AI
- 17B参数，在LLM每一层引入独立的视觉QKV矩阵和MLP层，实现视觉优先的深度融合。

#### 🔬 深入细节
17B参数，在LLM每一层引入独立的视觉QKV矩阵和MLP层，实现视觉优先的深度融合。

### Gemini

```yaml
id: gemini
num: 14
name: Gemini
full_name: Gemini
year: '2023.12'
org: Google
parent: pali
paper_url: Technical Report
project_url: ''
category: native_multimodal
motivation: 原生多模态联合训练
```

#### 📝 一句话总结
从预训练阶段即在跨模态数据上联合训练，支持文本、图像、音频、视频无缝交错，在30/32个基准上刷新SOTA。

#### 🎯 核心要点
- 核心动机：原生多模态联合训练
- 演化来源：继承或改进自 pali
- 代表机构：Google
- 从预训练阶段即在跨模态数据上联合训练，支持文本、图像、音频、视频无缝交错，在30/32个基准上刷新SOTA。

#### 🔬 深入细节
从预训练阶段即在跨模态数据上联合训练，支持文本、图像、音频、视频无缝交错，在30/32个基准上刷新SOTA。

### LLaVA-NeXT

```yaml
id: llava_next
num: 15
name: LLaVA-NeXT
full_name: LLaVA-NeXT
year: '2024.01'
org: UW-ByteDance
parent: llava
paper_url: arXiv
project_url: ''
category: connector
motivation: AnyRes动态分辨率切片
```

#### 📝 一句话总结
将高分辨率图像切分为多个336x336子图并保留全局图，支持4倍像素量，显著提升OCR和文档理解能力。

#### 🎯 核心要点
- 核心动机：AnyRes动态分辨率切片
- 演化来源：继承或改进自 llava
- 代表机构：UW-ByteDance
- 将高分辨率图像切分为多个336x336子图并保留全局图，支持4倍像素量，显著提升OCR和文档理解能力。

#### 🔬 深入细节
将高分辨率图像切分为多个336x336子图并保留全局图，支持4倍像素量，显著提升OCR和文档理解能力。

### InternVL 2.5

```yaml
id: internvl_2_5
num: 16
name: InternVL 2.5
full_name: InternVL 2.5
year: '2024'
org: 上海AI Lab
parent: —
paper_url: arXiv
project_url: ''
category: connector
motivation: 动态高分辨率+Pixel Unshuffle
```

#### 📝 一句话总结
采用InternViT-6B视觉端，通过像素逆置减少Token数量，首个在MMMU上突破70分的开源模型。

#### 🎯 核心要点
- 核心动机：动态高分辨率+Pixel Unshuffle
- 代表机构：上海AI Lab
- 采用InternViT-6B视觉端，通过像素逆置减少Token数量，首个在MMMU上突破70分的开源模型。

#### 🔬 深入细节
采用InternViT-6B视觉端，通过像素逆置减少Token数量，首个在MMMU上突破70分的开源模型。

### InternVL 3.5

```yaml
id: internvl_3_5
num: 17
name: InternVL 3.5
full_name: InternVL 3.5
year: '2025'
org: 上海AI Lab
parent: internvl_2_5
paper_url: arXiv
project_url: ''
category: connector
motivation: 级联RL逻辑对齐
```

#### 📝 一句话总结
引入级联式强化学习进行逻辑对齐，采用解耦部署架构（DvD），响应速度提升4倍。

#### 🎯 核心要点
- 核心动机：级联RL逻辑对齐
- 演化来源：继承或改进自 internvl_2_5
- 代表机构：上海AI Lab
- 引入级联式强化学习进行逻辑对齐，采用解耦部署架构（DvD），响应速度提升4倍。

#### 🔬 深入细节
引入级联式强化学习进行逻辑对齐，采用解耦部署架构（DvD），响应速度提升4倍。

### SigLIP 2

```yaml
id: siglip2
num: 18
name: SigLIP 2
full_name: SigLIP 2
year: '2026.02'
org: Google
parent: clip
paper_url: arXiv
project_url: ''
category: frontier_2026
motivation: 统一训练配方增强定位
```

#### 📝 一句话总结
整合描述、自蒸馏和掩码预测任务，显著增强定位能力，成为新一代视觉编码器标准。

#### 🎯 核心要点
- 核心动机：统一训练配方增强定位
- 演化来源：继承或改进自 clip
- 代表机构：Google
- 整合描述、自蒸馏和掩码预测任务，显著增强定位能力，成为新一代视觉编码器标准。

#### 🔬 深入细节
整合描述、自蒸馏和掩码预测任务，显著增强定位能力，成为新一代视觉编码器标准。

### LLM2CLIP

```yaml
id: llm2clip
num: 19
name: LLM2CLIP
full_name: LLM2CLIP
year: '2026.01'
org: AAAI 2026杰出论文
parent: clip
paper_url: AAAI 2026
project_url: ''
category: frontier_2026
motivation: 语言模型解锁视觉表示
```

#### 📝 一句话总结
展示如何利用强大的语言模型解锁更丰富的视觉表示，获得AAAI 2026杰出论文奖。

#### 🎯 核心要点
- 核心动机：语言模型解锁视觉表示
- 演化来源：继承或改进自 clip
- 代表机构：AAAI 2026杰出论文
- 展示如何利用强大的语言模型解锁更丰富的视觉表示，获得AAAI 2026杰出论文奖。

#### 🔬 深入细节
展示如何利用强大的语言模型解锁更丰富的视觉表示，获得AAAI 2026杰出论文奖。

### GPT-5.4

```yaml
id: gpt5_4
num: 20
name: GPT-5.4
full_name: GPT-5.4
year: '2026.03'
org: OpenAI
parent: gemini
paper_url: —
project_url: ''
category: native_multimodal
motivation: 原生统一架构+1M上下文
```

#### 📝 一句话总结
原生统一架构支持1M上下文，强化计算机交互能力，在MMMU Pro上达到75%。

#### 🎯 核心要点
- 核心动机：原生统一架构+1M上下文
- 演化来源：继承或改进自 gemini
- 代表机构：OpenAI
- 原生统一架构支持1M上下文，强化计算机交互能力，在MMMU Pro上达到75%。

#### 🔬 深入细节
原生统一架构支持1M上下文，强化计算机交互能力，在MMMU Pro上达到75%。

### Gemini 3.1 Pro

```yaml
id: gemini_3_1
num: 21
name: Gemini 3.1 Pro
full_name: Gemini 3.1 Pro
year: '2026.02'
org: Google
parent: gemini
paper_url: —
project_url: ''
category: native_multimodal
motivation: 2M超长上下文多模态
```

#### 📝 一句话总结
支持2M超长上下文，实现音视频图文同步处理，在MMMU Pro上达到79%。

#### 🎯 核心要点
- 核心动机：2M超长上下文多模态
- 演化来源：继承或改进自 gemini
- 代表机构：Google
- 支持2M超长上下文，实现音视频图文同步处理，在MMMU Pro上达到79%。

#### 🔬 深入细节
支持2M超长上下文，实现音视频图文同步处理，在MMMU Pro上达到79%。

### Claude Opus 4.7

```yaml
id: claude_opus_4_7
num: 22
name: Claude Opus 4.7
full_name: Claude Opus 4.7
year: '2026.04'
org: Anthropic
parent: —
paper_url: —
project_url: ''
category: frontier_2026
motivation: xhigh深度推理模式
```

#### 📝 一句话总结
支持3.75MP高分辨率输入，引入"xhigh"深度推理模式，在OmniDocBench上达到87.7。

#### 🎯 核心要点
- 核心动机：xhigh深度推理模式
- 代表机构：Anthropic
- 支持3.75MP高分辨率输入，引入"xhigh"深度推理模式，在OmniDocBench上达到87.7。

#### 🔬 深入细节
支持3.75MP高分辨率输入，引入"xhigh"深度推理模式，在OmniDocBench上达到87.7。

### Llama 4

```yaml
id: llama4
num: 23
name: Llama 4
full_name: Llama 4
year: '2025.04'
org: Meta
parent: —
paper_url: —
project_url: ''
category: native_multimodal
motivation: 原生MoE+1M上下文
```

#### 📝 一句话总结
原生多模态MoE架构，17B激活参数，1M上下文，LMArena ELO达到1417。

#### 🎯 核心要点
- 核心动机：原生MoE+1M上下文
- 代表机构：Meta
- 原生多模态MoE架构，17B激活参数，1M上下文，LMArena ELO达到1417。

#### 🔬 深入细节
原生多模态MoE架构，17B激活参数，1M上下文，LMArena ELO达到1417。

### Qwen3.5-VLM

```yaml
id: qwen3_5_vlm
num: 24
name: Qwen3.5-VLM
full_name: Qwen3.5-VLM
year: '2026.02'
org: 阿里巴巴
parent: qwen_vl
paper_url: —
project_url: ''
category: frontier_2026
motivation: GDN早期融合架构
```

#### 📝 一句话总结
Gated Delta Network+MoE，256K原生上下文，早期融合架构，在OmniDocBench上达到90.8。

#### 🎯 核心要点
- 核心动机：GDN早期融合架构
- 演化来源：继承或改进自 qwen_vl
- 代表机构：阿里巴巴
- Gated Delta Network+MoE，256K原生上下文，早期融合架构，在OmniDocBench上达到90.8。

#### 🔬 深入细节
Gated Delta Network+MoE，256K原生上下文，早期融合架构，在OmniDocBench上达到90.8。

### 豆包2.0 Pro

```yaml
id: doubao_2_0
num: 25
name: 豆包2.0 Pro
full_name: 豆包2.0 Pro
year: '2026.02'
org: 字节跳动
parent: —
paper_url: —
project_url: ''
category: frontier_2026
motivation: 万亿MoE视频解析
```

#### 📝 一句话总结
万亿参数MoE架构，强化复杂文档与视频解析能力，在SuperCLUE-VLM上达到90.66。

#### 🎯 核心要点
- 核心动机：万亿MoE视频解析
- 代表机构：字节跳动
- 万亿参数MoE架构，强化复杂文档与视频解析能力，在SuperCLUE-VLM上达到90.66。

#### 🔬 深入细节
万亿参数MoE架构，强化复杂文档与视频解析能力，在SuperCLUE-VLM上达到90.66。

### GLM-4.5V

```yaml
id: glm_4_5v
num: 26
name: GLM-4.5V
full_name: GLM-4.5V
year: '2026'
org: 智谱AI
parent: cogvlm
paper_url: —
project_url: ''
category: frontier_2026
motivation: 3D-RoPE思考模式
```

#### 📝 一句话总结
3D-RoPE空间感知技术，支持"思考模式"切换，科学推理能力大幅提升。

#### 🎯 核心要点
- 核心动机：3D-RoPE思考模式
- 演化来源：继承或改进自 cogvlm
- 代表机构：智谱AI
- 3D-RoPE空间感知技术，支持"思考模式"切换，科学推理能力大幅提升。

#### 🔬 深入细节
3D-RoPE空间感知技术，支持"思考模式"切换，科学推理能力大幅提升。

### DeepSeek-V4

```yaml
id: deepseek_v4
num: 27
name: DeepSeek-V4
full_name: DeepSeek-V4
year: '2026.04'
org: DeepSeek
parent: —
paper_url: —
project_url: ''
category: frontier_2026
motivation: Engram条件内存
```

#### 📝 一句话总结
1.6T参数MoE，Engram条件内存机制，推理成本降低10倍，空间导航胜过GPT-5.4。

#### 🎯 核心要点
- 核心动机：Engram条件内存
- 代表机构：DeepSeek
- 1.6T参数MoE，Engram条件内存机制，推理成本降低10倍，空间导航胜过GPT-5.4。

#### 🔬 深入细节
1.6T参数MoE，Engram条件内存机制，推理成本降低10倍，空间导航胜过GPT-5.4。

### InternVL 3.0

```yaml
id: internvl_3_0
num: 28
name: InternVL 3.0
full_name: InternVL 3.0
year: '2025.04'
org: 上海AI Lab
parent: internvl_3_5
paper_url: —
project_url: ''
category: native_multimodal
motivation: V2PE原生多模态预训练
```

#### 📝 一句话总结
原生多模态预训练，V2PE可变位置编码，支持万级token，在MMMU上达到72.2。

#### 🎯 核心要点
- 核心动机：V2PE原生多模态预训练
- 演化来源：继承或改进自 internvl_3_5
- 代表机构：上海AI Lab
- 原生多模态预训练，V2PE可变位置编码，支持万级token，在MMMU上达到72.2。

#### 🔬 深入细节
原生多模态预训练，V2PE可变位置编码，支持万级token，在MMMU上达到72.2。

### V-JEPA 2

```yaml
id: v_jepa2
num: 29
name: V-JEPA 2
full_name: V-JEPA 2
year: '2026'
org: Meta
parent: —
paper_url: ICLR 2026
project_url: ''
category: frontier_2026
motivation: 预测编码视频理解
```

#### 📝 一句话总结
预测编码器家族，通过预测潜在表示而非像素，在视频理解和规划中表现卓越。

#### 🎯 核心要点
- 核心动机：预测编码视频理解
- 代表机构：Meta
- 预测编码器家族，通过预测潜在表示而非像素，在视频理解和规划中表现卓越。

#### 🔬 深入细节
预测编码器家族，通过预测潜在表示而非像素，在视频理解和规划中表现卓越。

### DrivePI

```yaml
id: drivepi
num: 30
name: DrivePI
full_name: DrivePI
year: '2026'
org: —
parent: —
paper_url: CVPR 2026
project_url: ''
category: frontier_2026
motivation: 4D多模态自动驾驶
```

#### 📝 一句话总结
空间感知的4D多模态大模型，统一自动驾驶的感知、预测与规划，实现端到端闭环控制。

#### 🎯 核心要点
- 核心动机：4D多模态自动驾驶
- 代表机构：—
- 空间感知的4D多模态大模型，统一自动驾驶的感知、预测与规划，实现端到端闭环控制。

#### 🔬 深入细节
空间感知的4D多模态大模型，统一自动驾驶的感知、预测与规划，实现端到端闭环控制。
