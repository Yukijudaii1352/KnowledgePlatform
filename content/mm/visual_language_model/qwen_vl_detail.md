### Qwen-VL: A Versatile Vision-Language Model for Understanding, Localization, Text Reading, and Beyond

```yaml
id: qwen_vl
name: Qwen-VL
year: 2023.08
category: connector
parent: llava
arxiv: "2308.12966"
motivation: 通过位置感知的视觉-语言适配器（Position-aware VL Adapter）实现细粒度视觉理解与定位能力，同时支持多图交错输入、多语言和多任务统一建模
```

## 📝 一句话总结

Qwen-VL 在 ViT-bigG 视觉编码器与 Qwen-7B 语言模型之间引入**位置感知的单层交叉注意力适配器**（256个可学习查询 + 2D位置编码），通过三阶段训练（预训练→多任务→SFT）实现了视觉理解、目标定位、文字阅读等多任务统一建模，在同规模模型中取得全面领先。

## 🎯 核心要点

1. **位置感知 VL 适配器**：采用单层交叉注意力机制，用 256 个可学习查询将可变长度的视觉特征压缩为固定长度序列，并通过 2D 绝对位置编码注入空间位置信息，使模型具备细粒度定位能力
2. **统一的边界框表示**：引入 `<box>`/`</box>` 和 `<ref>`/`</ref>` 特殊标记，将边界框坐标归一化到 [0, 1000) 整数范围，以文本形式 `(X_tl, Y_tl), (X_br, Y_br)` 统一表达，实现定位与生成的双向能力
3. **三阶段渐进训练**：Stage 1 在 1.4B 图文对上低分辨率预训练对齐视觉-语言表示；Stage 2 在 448×448 高分辨率上进行 7 类多任务联合训练；Stage 3 用 350K 指令数据微调获得对话能力
4. **多图交错与多语言支持**：通过 `<img>`/`</img>` 标记支持任意数量图片的交错输入，训练数据涵盖中英双语，是当时少有的原生支持中文的多模态大模型
5. **全面的 Benchmark 表现**：在 Zero-shot Captioning、General VQA、Text-oriented VQA、Refer Expression Comprehension 等多个维度超越同规模甚至更大规模的模型

## 🔬 深入细节

### 1. 整体架构

![Qwen-VL 训练流程](https://ar5iv.labs.arxiv.org/html/2308.12966/assets/x3.png)
*图：Qwen-VL 三阶段训练流程。Stage 1 冻结 LLM 进行视觉-语言对齐预训练；Stage 2 解冻全部参数进行多任务高分辨率训练；Stage 3 冻结 ViT 进行指令微调。*

Qwen-VL 由三个核心组件构成：

| 组件 | 具体实现 | 参数量 |
|------|---------|--------|
| 视觉编码器 | OpenCLIP ViT-bigG/14 | 1.9B |
| VL 适配器 | 位置感知单层交叉注意力 | 0.08B |
| 语言模型 | Qwen-7B (Transformer Decoder) | 7.7B |
| **总计** | | **9.6B** |

**输入处理流程**：图像经 ViT-bigG 编码后产生一系列视觉特征，通过 VL 适配器压缩为固定 256 个 token，再与文本 token 拼接后送入 Qwen-7B 进行自回归生成。

### 2. 位置感知 VL 适配器（核心创新）

适配器的核心是一个**单层交叉注意力**模块，其关键设计：

```
输入：
  - 视觉特征 V ∈ R^(L×D)    # L = (H/14)×(W/14), D = ViT hidden dim
  - 可学习查询 Q ∈ R^(256×D)  # 固定 256 个查询向量

位置编码：
  - 2D 绝对位置编码 PE_2d，编码每个 patch 的 (row, col) 位置
  - 分别加到 Cross-Attention 的 Query 和 Key 上

计算过程：
  Q' = Q + PE_2d(query_positions)
  K' = Linear_K(V) + PE_2d(patch_positions)  
  V' = Linear_V(V)
  Output = softmax(Q'·K'^T / √d) · V'    # → R^(256×D)
```

**为什么需要 2D 位置编码？**
- 标准 ViT 的 1D 位置编码在经过交叉注意力压缩后会丢失空间位置信息
- 2D PE 显式编码了每个 patch 的行列坐标，使压缩后的 256 个视觉 token 仍保留空间位置感知
- 这对于细粒度定位任务（如 grounding、OCR）至关重要

**与其他适配器的对比**：

| 方法 | 压缩方式 | 位置信息 | 输出 token 数 |
|------|---------|---------|--------------|
| LLaVA | 线性投影（无压缩） | 隐式保留 | 576 (24×24) |
| BLIP-2 | Q-Former (多层交叉注意力) | 无显式位置编码 | 32 |
| **Qwen-VL** | **单层交叉注意力 + 2D PE** | **显式 2D 位置编码** | **256** |
| Flamingo | Perceiver Resampler | 无显式位置编码 | 64 |

### 3. 统一的边界框与引用表示

Qwen-VL 通过特殊标记实现了**定位（grounding）与引用（referring）的统一文本表示**：

```
特殊标记：
  <img> ... </img>    # 包裹图像 token（256个视觉 token）
  <box> ... </box>    # 包裹边界框坐标
  <ref> ... </ref>    # 包裹引用的文本描述

边界框格式：
  <box>(X_topleft, Y_topleft),(X_bottomright, Y_bottomright)</box>
  坐标归一化到 [0, 1000) 整数范围

示例 - Grounded Captioning：
  输入: <img>image_tokens</img> Describe the image with grounding.
  输出: <ref>A dog</ref><box>(120,50),(450,380)</box> is playing in <ref>the park</ref><box>(0,100),(999,600)</box>.

示例 - Referring Expression Comprehension：
  输入: <img>image_tokens</img> <ref>the red car on the left</ref>
  输出: <box>(23,150),(340,420)</box>
```

这种设计的优势：
- **双向能力**：既能根据图像生成带定位的描述（grounded captioning），也能根据文本描述定位目标（referring）
- **与 LLM 原生兼容**：边界框以文本 token 形式参与自回归生成，无需额外的检测头
- **灵活组合**：可以在一次生成中混合使用多个 box 和 ref 标记

### 4. 三阶段训练策略

#### Stage 1：视觉-语言对齐预训练

| 配置 | 详情 |
|------|------|
| 数据 | 1.4B 图文对（从 5B 清洗而来），来源包括 LAION-en/zh、DataComp、CC12M、COCO 等 |
| 分辨率 | 224 × 224 |
| 冻结策略 | 冻结 LLM，训练 ViT + VL 适配器 |
| 优化器 | AdamW, lr=2e-4, cosine schedule |
| 批大小 | 30,720 |
| 训练步数 | 50,000 |
| 目标 | 下一个 token 预测（仅计算文本部分的 loss） |

**数据清洗流程**：从公开数据集出发，经过以下步骤：
1. 基于 CLIP ViT-bigG 的图文相似度过滤
2. 去重（图像级和文本级）
3. 过滤低质量文本（过短、过多特殊字符等）
4. 最终从 5B 筛选到 1.4B 高质量图文对

#### Stage 2：多任务高分辨率训练

| 配置 | 详情 |
|------|------|
| 分辨率 | 448 × 448（从 224 提升） |
| 冻结策略 | **全部解冻**（ViT + 适配器 + LLM） |
| 任务数 | 7 类任务 |

7 类训练任务：

| 任务 | 数据来源 | 说明 |
|------|---------|------|
| Image Captioning | COCO, CC3M, CC12M, SBU 等 | 图像描述生成 |
| Visual QA | VQAv2, OKVQA, GQA, OCRVQA 等 | 视觉问答 |
| Grounding | GRIT-20M, RefCOCO/+/g | 文本→边界框 |
| Ref. Grounding | RefCOCO/+/g | 表达式→边界框 |
| Grounded Captioning | Flickr30K Entities, RefCOCO/+/g | 带定位的描述生成 |
| OCR | SynthDoG, SROIE, DocVQA 等 | 文字识别与理解 |
| Pure Text | 纯文本语料 | 防止语言能力退化 |

**关键设计**：
- 分辨率从 224 提升到 448，使 ViT 输出从 16×16=256 patches 增加到 32×32=1024 patches，但经过适配器仍压缩为 256 token
- 混入纯文本数据防止 LLM 语言能力退化（"catastrophic forgetting"）
- 多任务联合训练使模型同时具备理解、定位、OCR 等多种能力

#### Stage 3：指令微调（SFT）

| 配置 | 详情 |
|------|------|
| 数据 | 350K 多任务指令数据 |
| 冻结策略 | 冻结 ViT，训练 LLM + 适配器 |
| 目标 | 对话式指令跟随 |

SFT 后的模型称为 **Qwen-VL-Chat**，具备多轮对话、指令跟随能力。

### 5. 关键实验结果

![Qwen-VL 性能对比](https://ar5iv.labs.arxiv.org/html/2308.12966/assets/x1.png)
*图：Qwen-VL 在多个 benchmark 上与同期模型的性能对比。*

#### Zero-shot Image Captioning

| 模型 | Flickr30K CIDEr | NoCaps CIDEr |
|------|----------------|--------------|
| Flamingo-9B | 61.5 | - |
| Flamingo-80B | 67.2 | - |
| **Qwen-VL (9.6B)** | **85.8** | **121.4** |

#### General VQA

| 模型 | VQAv2 | GQA | OKVQA |
|------|-------|-----|-------|
| InstructBLIP-13B | - | 49.5 | - |
| Shikra-13B | 77.4 | - | 47.2 |
| **Qwen-VL** | **79.5** | **59.3** | **58.6** |

#### Referring Expression Comprehension (Grounding)

| 模型 | RefCOCO val | RefCOCO+ val | RefCOCOg val |
|------|------------|-------------|-------------|
| Shikra-13B | 87.83 | 81.60 | 82.27 |
| **Qwen-VL** | **89.36** | **83.12** | **85.58** |

#### Text-oriented VQA

| 模型 | DocVQA | ChartQA | TextVQA |
|------|--------|---------|---------|
| mPLUG-DocOwl | 62.2 | 57.4 | 52.6 |
| **Qwen-VL** | **65.1** | **65.7** | **63.8** |

### 6. 消融实验关键发现

**分辨率的影响**：从 224→448，在 DocVQA 上提升 +18.1%，在 ChartQA 上提升 +12.2%，对文档/OCR 类任务影响巨大。

**2D 位置编码的影响**：移除 2D PE 后，RefCOCO grounding 准确率下降约 2-3 个百分点，验证了位置编码对定位任务的重要性。

**多任务训练的影响**：联合训练 grounding 任务不仅提升定位能力，还对 VQA 等理解任务有正向迁移效果。

### 7. 设计思考与局限

**为什么选择 256 个查询而非更少（如 BLIP-2 的 32）？**
- 256 token 在效率和信息保留之间取得平衡
- 对于 448×448 输入（1024 patches），256 token 提供约 4:1 的压缩比
- 过少的 token 会丢失细粒度视觉信息，影响 OCR 和定位任务

**局限性**：
- 仅支持单一固定分辨率（448×448），对极端长宽比图像不友好
- 边界框精度受限于 [0, 1000) 的离散化（约 0.1% 的量化误差）
- 9.6B 参数量在部署时仍有一定开销

## 🧪 练习题

### Q1：位置感知适配器的作用
**问题**：如果将 Qwen-VL 的位置感知 VL 适配器替换为 BLIP-2 的 Q-Former（不含 2D 位置编码），在以下哪个任务上性能下降最为显著？
A. Image Captioning  
B. Referring Expression Comprehension  
C. 纯文本问答  
D. Image Classification  

<details><summary>答案</summary>

**B. Referring Expression Comprehension**

Referring Expression Comprehension 需要根据文本描述精确定位图像中的目标区域，这强烈依赖于视觉 token 中保留的空间位置信息。Qwen-VL 的 2D 位置编码正是为此设计的——它在交叉注意力的 Q-K 对上注入了 patch 的行列坐标，使得压缩后的 256 个视觉 token 仍能编码空间位置。移除 2D PE 后，模型难以将文本描述映射到精确的空间坐标，定位任务性能显著下降。而 Image Captioning 更依赖全局语义理解，对精确位置信息的需求相对较低。

</details>

### Q2：训练策略分析
**问题**：Qwen-VL 在 Stage 2 多任务训练中混入了纯文本数据，这一设计的主要目的是什么？如果去掉纯文本数据，最可能出现什么问题？

<details><summary>答案</summary>

**主要目的**：防止语言模型在多模态训练过程中发生**灾难性遗忘（catastrophic forgetting）**。

Stage 2 解冻了 LLM 的全部参数，如果训练数据全部是视觉-语言任务，LLM 的参数会被大幅更新以适应多模态输入，导致其原有的纯文本理解和生成能力退化。混入纯文本数据相当于一种**正则化**手段，确保 LLM 在学习视觉能力的同时保持语言能力。

去掉纯文本数据后，最可能出现：
1. 纯文本对话质量下降（语法错误、逻辑不连贯）
2. 语言知识遗忘（常识推理能力下降）
3. 在需要复杂语言推理的 VQA 任务上反而性能下降

</details>

### Q3：架构设计对比
**问题**：对比 LLaVA（线性投影，576 token）和 Qwen-VL（交叉注意力，256 token）的视觉-语言连接方式，分析各自的优劣势，并解释为什么 Qwen-VL 在 448×448 分辨率下仍能保持 256 个视觉 token。

<details><summary>答案</summary>

**LLaVA（线性投影）**：
- 优势：实现简单，无信息损失（每个 patch 一一映射为一个 token）
- 劣势：视觉 token 数量随分辨率平方增长（224→576, 336→1296），增加 LLM 推理开销；无显式的视觉信息筛选和压缩

**Qwen-VL（交叉注意力 + 2D PE）**：
- 优势：输出 token 数固定为 256，不随输入分辨率变化；交叉注意力机制可以学习选择性地关注重要的视觉区域；2D PE 保留空间位置信息
- 劣势：引入额外的可学习参数（0.08B）；信息压缩可能丢失部分细节；需要精心设计位置编码

**为什么 448×448 仍是 256 token**：
Qwen-VL 的适配器使用固定数量（256）的可学习查询作为交叉注意力的 Query。无论 ViT 输出多少 patch（224→256 patches, 448→1024 patches），这些 patch 都作为 Key/Value 被 256 个 Query 查询和聚合。因此输出维度由 Query 数量决定，与输入分辨率无关。这是 Perceiver/Q-Former 类架构的核心优势——**将可变长度输入映射为固定长度输出**。

</details>