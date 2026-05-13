### X-SAM: From Segment Anything to Any Segmentation

---
id: xsam_detail
title: "X-SAM: From Segment Anything to Any Segmentation"
authors: "Hao Wang, Limeng Qiao, Zequn Jie, Zhijian Huang, Chengjian Feng, Qingfang Zheng, Lin Ma, Xiangyuan Lan, Xiaodan Liang"
venue: "AAAI 2026"
year: 2025
arxiv_id: "2508.04655"
pdf_url: "https://arxiv.org/pdf/2508.04655v2"
tags: [segmentation, MLLM, SAM, unified-framework, visual-prompt, multi-task]
topic: visual_model
significance: 9
novelty: 8
clarity: 8
---

## 📝 一句话总结

X-SAM 提出了一个统一的多模态大语言模型分割框架，通过双编码器（SigLIP2 + SAM-L）架构、文本/视觉双查询机制和三阶段训练策略，将 SAM 从"分割任何东西"扩展为"任何分割任务"，在 7 类分割任务的 20+ 基准上均达到 SOTA。

## 🎯 核心要点

1. **统一任务建模**：将 7 类分割任务（通用/开放词汇/指代/推理/GCG/交互/VGD）统一为"文本查询"和"视觉查询"两种范式，通过 `<p>...</p>` 文本标记和 `<region>` 视觉标记实现统一输入格式，LLM 输出 `<SEG>` 令牌触发掩码生成。

2. **双编码器 + 双投影器架构**：采用 SigLIP2-so400m 作为图像编码器提供语义特征，SAM-L 作为分割编码器提供细粒度空间特征；两路特征分别经 MLP 投影后拼接送入 LLM，同时 SAM 特征通过像素洗牌（pixel-shuffle）构建多尺度分割连接器（1/8, 1/16, 1/32）。

3. **Mask2Former 风格分割解码器**：替换 SAM 原始解码器，使用 `<SEG>` 令牌嵌入作为条件查询，结合可学习掩码查询和多尺度特征，通过交叉注意力生成分割掩码；引入潜在背景嵌入处理"忽略"类别。

4. **三阶段训练策略**：Stage 1 在 COCO-Panoptic 上微调分割器（\(\mathcal{L}_{seg} = \mathcal{L}_{cls} + \mathcal{L}_{mask} + \mathcal{L}_{dice}\)）；Stage 2 在 LLaVA-558K 上对齐预训练（仅训练投影器）；Stage 3 端到端混合微调（\(\mathcal{L}_{total} = \mathcal{L}_{regressive} + \mathcal{L}_{seg}\)），使用数据集平衡重采样。

5. **新任务 VGD 分割**：提出 Visual GrounDed Segmentation，给定视觉提示（点/涂鸦/框/掩码）分割图像中所有相关实例对象，支持单图和跨图场景。X-SAM 在 COCO-VGD 上 AP 达 47.9-49.7，远超 PSALM 的 2.0-3.7。

## 🔬 深入细节

### 示意图

> **Figure 2: X-SAM 整体架构**
> ![X-SAM Architecture](https://ar5iv.labs.arxiv.org/html/2508.04655v2/assets/figures/fig2_arch.png)
>
> X-SAM 由六个核心组件构成：(1) 图像编码器 \(f\)（SigLIP2-so400m）提取语义视觉特征；(2) 分割编码器 \(g\)（SAM-L）提取细粒度空间特征；(3) 双投影器将两路特征映射到 LLM 嵌入空间并拼接；(4) LLM 处理多模态嵌入序列生成文本响应和 `<SEG>` 令牌；(5) 分割连接器通过像素洗牌构建多尺度特征金字塔；(6) Mask2Former 风格分割解码器生成最终掩码。

### 算法伪代码

```
Algorithm: X-SAM Inference Pipeline
────────────────────────────────────────────
Input: Image I, Query Q (text or visual prompt)
Output: Text response T, Segmentation masks M

# Step 1: Dual Encoding
F_img = SigLIP2_Encoder(I)          # 语义视觉特征
F_seg = SAM_L_Encoder(I)            # 细粒度分割特征

# Step 2: Dual Projection
H_img = MLP_Wi(F_img)               # 图像特征投影
H_seg = MLP_Ws(PixelShuffle(F_seg)) # 分割特征投影 + 像素洗牌
H_visual = Concat(H_img, H_seg)     # 拼接视觉嵌入

# Step 3: Query Formulation
if Q is TextQuery:
    prompt = "Segment <p>{category}</p>"   # 文本查询
elif Q is VisionQuery:
    region_feat = ExtractRegion(F_seg, visual_prompt)
    prompt = "Segment <p><region></p>"      # 视觉查询，<region>替换为区域特征

# Step 4: LLM Auto-regressive Generation
H_input = Concat(H_visual, Tokenize(prompt))
T, h_seg_tokens = LLM(H_input)      # 生成文本 + <SEG>令牌嵌入

# Step 5: Multi-scale Feature Construction (Segmentation Connector)
F_ms = {PixelShuffle_s(F_seg) for s in [1/8, 1/16, 1/32]}

# Step 6: Mask Decoding (Mask2Former-style)
for each <SEG> token embedding h_seg:
    # 条件嵌入 = <p>...</p>之间的潜在嵌入
    cond_embed = LatentEmbedding(h_seg)
    # 掩码查询 = 可学习查询 + 条件嵌入
    mask_queries = LearnableQueries + cond_embed
    # 交叉注意力解码
    masks = MaskedCrossAttention(mask_queries, F_ms)
    # 分类（含背景嵌入处理忽略类）
    classes = Classify(mask_queries, background_embed)
    M.append(FilterByClass(masks, classes))

return T, M
```

### 方法详细解释

**统一任务建模与输入格式设计。** X-SAM 的核心创新之一在于将多样化的分割任务统一为两种查询范式。对于文本查询任务（通用分割、指代分割、推理分割、GCG 分割），输入文本中使用 `<p>category_name</p>` 标记包裹目标类别或短语描述，LLM 在理解语义后输出 `<SEG>` 特殊令牌来触发分割解码器。对于视觉查询任务（交互分割、VGD 分割），输入中使用 `<region>` 令牌作为视觉提示的占位符，该令牌在实际处理时被替换为从 SAM 编码器提取的对应区域特征嵌入。这种设计使得 LLM 能够同时处理文本和视觉两种模态的查询输入，而无需针对不同任务设计不同的模型架构。特别值得注意的是，`<p>` 和 `</p>` 之间的潜在嵌入（latent embeddings）被用作分割解码器的条件嵌入，为掩码生成提供了丰富的语义引导信息。

**双编码器与多尺度特征融合架构。** X-SAM 采用了精心设计的双编码器架构来同时获取语义理解和细粒度空间信息。SigLIP2-so400m 作为图像编码器，经过大规模图文对比预训练，能够提供强大的语义视觉表示；SAM-L 作为分割编码器，经过大规模分割数据训练，能够提供精确的空间细节特征。两路特征分别通过各自的 MLP 投影器映射到 LLM 的嵌入空间后进行拼接，形成统一的视觉嵌入序列。消融实验（Tab. 7）证明了双编码器设计的有效性：相比仅使用 ViT 单编码器，加入 SAM 编码器在 A150-OV 上提升 4.5% AP，在 GCG-Val 上提升 4.6% mIoU，在 COCO-VGD 上提升 7.2% AP。此外，分割连接器通过对 SAM 特征进行不同比率的像素洗牌操作，构建了 1/8、1/16、1/32 三个尺度的特征金字塔，为分割解码器提供了多尺度的空间信息。消融实验（Tab. 9）表明，多尺度特征相比单尺度带来了显著的性能提升（10.7% PQ）。

**Mask2Former 风格分割解码器的设计。** X-SAM 用 Mask2Former 风格的解码器替换了 SAM 原始的轻量级解码器，以支持通用分割任务中需要的多实例、多类别掩码生成能力。解码器接收三类输入：(1) `<SEG>` 令牌的嵌入作为条件查询，携带了 LLM 对目标的语义理解；(2) 一组可学习的掩码查询（mask queries），用于生成多个候选掩码；(3) 分割连接器提供的多尺度特征。解码器通过多层掩码交叉注意力（masked cross-attention）机制，让掩码查询与多尺度特征进行交互，逐步细化掩码预测。为了处理通用分割中的"忽略"类别（如背景区域），X-SAM 引入了一个潜在背景嵌入（latent background embedding），在分类阶段与掩码查询的嵌入进行匹配，从而区分前景实例和背景区域。训练时使用匈牙利匹配算法将预测掩码与真值进行一对一匹配，损失函数包含分类损失 \(\mathcal{L}_{cls}\)、二值掩码损失 \(\mathcal{L}_{mask}\) 和 Dice 损失 \(\mathcal{L}_{dice}\)。

**三阶段渐进式训练策略。** X-SAM 的训练分为三个精心设计的阶段。**Stage 1（分割器微调）**：在 COCO-Panoptic 数据集上训练分割编码器、分割连接器和分割解码器，使用分割损失 \(\mathcal{L}_{seg}\)，训练 36 个 epoch，batch size 64，SAM 编码器学习率 1e-5，其他参数 1e-4。此阶段为分割器建立强大的基础分割能力，消融实验表明 Stage 1 带来了 9.3% PQ 的提升。**Stage 2（对齐预训练）**：在 LLaVA-558K 数据集上仅训练双投影器参数，使用自回归损失 \(\mathcal{L}_{regressive}\)，冻结编码器和 LLM，训练 1 个 epoch，batch size 256，学习率 1e-3。此阶段将视觉特征与 LLM 的语言空间对齐，消融实验表明 Stage 2 在对话基准 MMB 上额外提升 2.1% 准确率，在 GCG-Val 上提升 4.0% mIoU。**Stage 3（混合微调）**：端到端训练所有参数，混合使用图像对话数据集和五类分割数据集，使用数据集平衡重采样策略，训练 1 个 epoch，batch size 64，双编码器学习率 4e-6，其他参数 4e-5。消融实验（Tab. 6）表明，混合微调在域外基准上带来显著提升（A150-OV +6.0% AP，Reason-Val +8.9% gIoU），但在域内 COCO-Pan 上略有下降（-0.8% PQ），体现了多源训练中的平衡挑战。

**VGD 分割：新任务与新基准。** X-SAM 提出了 Visual GrounDed（VGD）分割这一全新任务，要求模型根据视觉提示（点、涂鸦、框、掩码）分割图像中所有相关的实例对象。与传统交互分割（仅分割提示指向的单个对象）不同，VGD 分割要求模型理解视觉提示所指示的语义类别，并分割出图像中该类别的所有实例。这一任务支持单图和跨图两种场景：单图场景中，视觉提示和目标对象在同一张图像中；跨图场景中，视觉提示来自参考图像，目标对象在另一张图像中。X-SAM 在自建的 COCO-VGD 数据集上评估，AP 达到 47.9-49.7（不同提示类型），远超 PSALM 的 2.0-3.7，证明了该框架在视觉查询理解方面的强大能力。

## 🧪 练习题

1. **[概念理解]** X-SAM 中 `<p>...</p>` 标记和 `<region>` 令牌分别在什么场景下使用？它们如何被转化为分割解码器的条件输入？

2. **[架构设计]** 为什么 X-SAM 需要同时使用 SigLIP2 和 SAM-L 两个编码器？如果只使用其中一个，会对哪些任务的性能产生最大影响？请结合 Tab. 7 的消融结果分析。

3. **[训练策略]** X-SAM 的三阶段训练中，Stage 1 和 Stage 2 分别解决什么问题？如果跳过 Stage 1 直接进行 Stage 3 混合微调，根据 Tab. 8 的结果，COCO-Pan 的 PQ 会下降多少？

4. **[任务对比]** VGD 分割与传统交互分割（Interactive Segmentation）的核心区别是什么？为什么 PSALM 在 VGD 任务上表现极差（AP 仅 2-3.7）而 X-SAM 能达到 47.9+？

5. **[开放思考]** X-SAM 在混合微调中观察到域内性能略有下降（COCO-Pan -0.8% PQ），这是多任务学习中的常见问题。你能提出哪些可能的改进策略来缓解这一问题？