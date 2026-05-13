### BLIP-2

```yaml
id: blip2
name: BLIP-2
full_name: "Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models"
year: 2023
org: Salesforce
paper_url: "https://arxiv.org/abs/2301.12597"
category: fusion_model
parent: blip
motivation: "通过轻量级 Q-Former 桥接冻结的图像编码器与大语言模型，以极低训练成本实现高效视觉-语言对齐"
```

#### 📝 一句话总结

BLIP-2 提出了一种通用且计算高效的视觉-语言预训练方法，通过轻量级的 Querying Transformer（Q-Former）分两阶段桥接冻结的图像编码器与冻结的大语言模型，以极少的可训练参数（最少 104M）在多项零样本视觉-语言任务上超越了参数量大 54 倍的 Flamingo80B。

#### 🎯 核心要点

- **Q-Former 架构**：轻量级 Transformer（188M 参数），包含 32 个可学习查询向量（768 维），通过交叉注意力从冻结图像编码器中提取固定数量的视觉特征
- **两阶段预训练策略**：第一阶段从冻结图像编码器引导视觉-语言表征学习（ITC + ITG + ITM），第二阶段从冻结 LLM 引导视觉到语言的生成学习
- **三种互补的预训练目标**：Image-Text Contrastive Learning（ITC）、Image-grounded Text Generation（ITG）、Image-Text Matching（ITM），通过不同的自注意力掩码策略在同一架构中实现
- **冻结骨干网络**：图像编码器（ViT-L/14, ViT-g/14）和 LLM（OPT, FlanT5）全程冻结，仅训练 Q-Former 和线性投影层
- **兼容 Decoder-only 和 Encoder-Decoder LLM**：分别支持 OPT 系列和 FlanT5 系列，通过全连接层将 Q-Former 输出投影到 LLM 的文本嵌入空间
- **大规模预训练数据**：使用 129M 图像（COCO、Visual Genome、CC3M、CC12M、SBU、LAION400M 子集），共 1.29 亿图文对
- **零样本 SOTA**：VQAv2 上达到 65.0%（超 Flamingo80B 8.7%），同时可训练参数仅为其 1/54

#### 🔬 深入细节

##### 整体架构

![BLIP-2 整体框架](https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x1.png)
*图 1：BLIP-2 框架总览。第一阶段从冻结图像编码器引导表征学习，第二阶段从冻结 LLM 引导生成学习。Q-Former 作为两者之间的桥梁。*

BLIP-2 的核心思想是：**不从头联合训练视觉和语言模型，而是利用一个轻量级的中间模块（Q-Former）来桥接已有的强大冻结模型**。这种设计的动机来自两个观察：

1. **端到端训练代价极高**：视觉-语言模型的规模不断增长，端到端预训练需要大量计算资源
2. **灾难性遗忘风险**：如果微调 LLM，可能导致其语言生成能力退化

> 💡 关键：BLIP-2 的"Bootstrapping"体现在逐步利用冻结模型的能力——先从图像编码器"引导"出视觉表征，再从 LLM"引导"出生成能力，而非同时学习两者。

##### Q-Former 架构详解

![Q-Former 架构](https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x2.png)
*图 2：Q-Former 架构及第一阶段预训练目标。左侧为图像 Transformer，右侧为文本 Transformer，两者共享自注意力层。*

Q-Former 由两个共享自注意力层的 Transformer 子模块组成：

1. **图像 Transformer**：以一组可学习的查询向量 \(\mathbf{Z} \in \mathbb{R}^{32 \times 768}\) 作为输入，通过交叉注意力层与冻结图像编码器的输出特征交互。这些查询向量充当"信息瓶颈"，将高维视觉信息压缩为固定数量（32 个）的紧凑表征。

2. **文本 Transformer**：同时作为文本编码器和文本解码器，其功能由自注意力掩码控制。它与图像 Transformer **共享自注意力层**，使得查询向量可以同时关注视觉和文本信息。

> ⚠️ 注意：Q-Former 的参数从 BERT-base 初始化（除了交叉注意力层随机初始化），这为训练提供了良好的起点。交叉注意力层每隔一个 Transformer block 插入一次。

##### 第一阶段：视觉-语言表征学习

第一阶段的目标是训练 Q-Former，使其学会从冻结图像编码器中提取与文本最相关的视觉特征。这一阶段联合优化三个互补的损失函数：

**1. Image-Text Contrastive Learning (ITC)**

ITC 对齐图像表征和文本表征，使匹配的图文对在特征空间中更接近。具体地，将每个查询向量的输出与文本的 `[CLS]` token 输出计算相似度，取最大值作为图文相似度：

$$s(\mathbf{I}, \mathbf{T}) = \max_{i \in \{1, \ldots, 32\}} \mathbf{z}_i^\top \mathbf{t}_{\text{cls}}$$

为防止信息泄漏，ITC 使用**单模态自注意力掩码**（unimodal self-attention mask），即查询向量和文本 token 互相不可见。

**2. Image-grounded Text Generation (ITG)**

ITG 训练 Q-Former 在给定图像条件下生成对应文本。它使用**因果自注意力掩码**（causal self-attention mask）：查询向量之间可以互相关注，但文本 token 只能关注之前的 token 和所有查询向量。

> 💡 关键：ITG 迫使查询向量捕获包含所有文本信息的视觉特征，因为文本生成的唯一视觉信息来源就是这 32 个查询向量。这实际上是一种"信息瓶颈"设计。

**3. Image-Text Matching (ITM)**

ITM 是一个二分类任务，预测图文对是否匹配。它使用**双向自注意力掩码**（bi-directional self-attention mask），允许查询向量和文本 token 完全交互。采用 hard negative mining 策略选择困难负样本。

```python
# 第一阶段预训练伪代码
# Q-Former 包含: queries Z (32×768), image_transformer, text_transformer (共享self-attn)
# 冻结: image_encoder (ViT-L/g)

for images, texts in dataloader:
    # 提取冻结视觉特征
    with torch.no_grad():
        image_features = image_encoder(images)  # [B, N_patch, D_vis]
    
    # === ITC: 单模态掩码，查询与文本互不可见 ===
    query_output = q_former(Z, image_features, mask="unimodal")  # [B, 32, 768]
    text_output = q_former.text_encode(texts, mask="unimodal")   # [B, 768]
    sim = max_over_queries(query_output @ text_output.T)
    loss_itc = contrastive_loss(sim)
    
    # === ITG: 因果掩码，文本仅能看到之前token和所有查询 ===
    logits = q_former(Z, image_features, texts, mask="causal")
    loss_itg = cross_entropy(logits, texts)
    
    # === ITM: 双向掩码，查询与文本完全交互 ===
    match_logits = q_former(Z, image_features, texts, mask="bidirectional")
    loss_itm = binary_cross_entropy(match_logits, labels)  # hard negatives
    
    loss = loss_itc + loss_itg + loss_itm
    optimizer.step(loss)  # 仅更新 Q-Former 参数
```

##### 第二阶段：视觉到语言的生成学习

![第二阶段预训练](https://ar5iv.labs.arxiv.org/html/2301.12597/assets/x3.png)
*图 3：第二阶段预训练。Q-Former 的输出通过全连接层投影后作为 soft visual prompt 输入冻结 LLM。*

第二阶段将 Q-Former 的输出连接到冻结的 LLM，使其获得视觉理解能力。具体步骤：

1. 使用一个全连接层（FC layer）将 Q-Former 的输出 \(\mathbf{Z} \in \mathbb{R}^{32 \times 768}\) 线性投影到 LLM 的文本嵌入空间维度
2. 投影后的向量作为 **soft visual prompts** 前置到 LLM 的输入文本嵌入之前
3. 这些 visual prompts 为 LLM 提供了最相关的视觉信息，引导其生成与图像相关的文本

对于不同类型的 LLM，训练目标略有不同：

- **Decoder-only LLM（OPT）**：使用语言建模损失（language modeling loss），即预测下一个 token
- **Encoder-Decoder LLM（FlanT5）**：将文本分为前后两部分，前半部分与 visual prompts 一起作为编码器输入，后半部分作为解码器的生成目标

$$\mathcal{L}_{\text{LM}} = -\sum_{t=1}^{T} \log p_{\theta_{\text{LLM}}}(y_t \mid \text{FC}(\mathbf{Z}), y_{<t})$$

> 💡 关键：第一阶段的表征学习至关重要。实验表明，没有第一阶段直接训练第二阶段时，OPT 会出现灾难性遗忘（性能随训练急剧下降），FlanT5 的性能也显著降低。这说明 Q-Former 需要先学会提取与文本相关的视觉特征，才能有效地与 LLM 对接。

##### 预训练细节

| 配置项 | 值 |
|--------|-----|
| 预训练数据 | 129M 图像（COCO, VG, CC3M, CC12M, SBU, LAION400M 子集） |
| 图像分辨率 | 224×224 |
| 第一阶段训练 | 250K 步，batch size 2320，lr 1e-4（cosine decay） |
| 第二阶段训练 | 80K 步，batch size 1920，lr 1e-5 |
| Q-Former 参数 | 188M（含查询向量） |
| 可训练参数（最小配置） | 104M（ViT-L + OPT 2.7B） |
| 图像编码器 | ViT-L/14（CLIP 预训练）或 ViT-g/14（EVA-CLIP 预训练） |
| LLM | OPT（2.7B/6.7B）或 FlanT5（XL/XXL） |

##### 关键实验结果

**零样本视觉问答（Zero-shot VQA）**：

| 模型 | 可训练参数 | 总参数 | VQAv2 | GQA |
|------|-----------|--------|-------|-----|
| Flamingo9B | 1.8B | 9.3B | 51.8 | 44.7 |
| Flamingo80B | 10.2B | 80B | 56.3 | 50.6 |
| BLIP-2 ViT-g FlanT5-XL | 107M | 4.1B | 63.1 | 63.0 |
| BLIP-2 ViT-g FlanT5-XXL | 108M | 12.1B | **65.0** | **65.0** |

BLIP-2 在 VQAv2 上超越 Flamingo80B 达 **8.7%**，而可训练参数仅为其 **1/54**。

**关键发现**：
- 更强的图像编码器（ViT-g > ViT-L）和更强的 LLM（FlanT5-XXL > XL > OPT）都能带来性能提升，验证了 BLIP-2 作为通用视觉-语言预训练框架的有效性
- 指令微调的 LLM（FlanT5）在 VQA 任务上显著优于无监督训练的 LLM（OPT）
- 第一阶段的表征学习对第二阶段至关重要，缺少它会导致 OPT 灾难性遗忘

##### 与传统方法的对比

| 方面 | 传统方法（如 Flamingo） | BLIP-2 |
|------|----------------------|--------|
| 视觉-语言对齐 | Perceiver Resampler 直接映射 | 两阶段渐进式对齐（先表征后生成） |
| 训练成本 | 端到端训练大量参数 | 仅训练轻量级 Q-Former（~100M） |
| 图像编码器 | 可能微调 | 完全冻结 |
| LLM | 可能部分微调（gated cross-attention） | 完全冻结 |
| 可扩展性 | 受限于计算资源 | 可即插即用更强的视觉/语言模型 |

BLIP-2 的核心优势在于其**模块化设计**：当更强的图像编码器或 LLM 出现时，只需重新训练轻量级的 Q-Former 即可获得性能提升，无需重新训练整个系统。

#### 🧪 练习题

```yaml
question: "BLIP-2 的 Q-Former 在第一阶段预训练中使用了三种不同的自注意力掩码策略，其中 Image-grounded Text Generation (ITG) 使用的是哪种掩码？"
options:
  - "双向自注意力掩码（bi-directional），查询和文本完全可见"
  - "单模态自注意力掩码（unimodal），查询和文本互不可见"
  - "因果自注意力掩码（causal），文本 token 仅能关注之前的 token 和所有查询向量"
  - "无掩码（no mask），所有 token 之间完全自由注意"
answer: 2
explain: "ITG 要求模型基于图像生成文本，因此使用因果掩码：查询向量之间可互相关注，文本 token 只能看到之前的 token 和所有查询向量，确保生成过程的自回归性质。"
```