### LayoutLMv3：面向文档AI的统一多模态预训练

```yaml
id: layoutlmv3
name: LayoutLMv3
full_name: "LayoutLMv3：面向文档AI的统一多模态预训练"
year: 2022
org: MSRA
paper_url: "https://arxiv.org/abs/2204.08387"
category: document_ai
parent: layoutlm
motivation: "统一MIM+MLM去除CNN"
```

#### 📝 一句话总结

LayoutLMv3 提出首个无需 CNN 的文档 AI 多模态预训练模型，通过统一的文本掩码语言建模（MLM）与图像掩码建模（MIM）目标，配合词-图块对齐（WPA）任务学习跨模态表示，在文本中心和图像中心的文档理解任务上均达到 SOTA。

#### 🎯 核心要点

- **去除 CNN 依赖**：用线性 Patch Embedding 替代 ResNet/ResNeXt 等 CNN 骨干提取图像特征，大幅简化架构并减少参数（133M vs LayoutLMv2 200M）
- **统一离散 token 重建目标**：文本端 MLM 重建词汇 ID，图像端 MIM 重建 DALL-E dVAE 离散 token，两者形式统一
- **Word-Patch Alignment (WPA)**：预测未掩码文本 token 对应的图像 patch 是否被掩码，学习细粒度跨模态对齐
- **Segment-level 2D 布局位置编码**：以 OCR segment（而非 word）为单位共享 2D 坐标，减少位置噪声
- **通用预训练模型**：同一模型在表单理解（FUNSD F1=92.08）、票据理解（CORD F1=97.46）、文档分类（RVL-CDIP Acc=95.93）、文档 VQA（DocVQA ANLS=83.37）和版面分析（PubLayNet mAP=95.1）上均 SOTA

#### 🔬 深入细节

##### 架构总览

![LayoutLMv3 架构图](https://ar5iv.labs.arxiv.org/html/2204.08387/assets/x2.png)
*图：LayoutLMv3 模型架构与预训练目标。左侧为输入嵌入，右侧为三个预训练目标 MLM、MIM 和 WPA。*

![与现有方法对比](https://ar5iv.labs.arxiv.org/html/2204.08387/assets/x1.png)
*图：LayoutLMv3 与 DocFormer、SelfDoc 在图像嵌入方式和预训练目标上的对比。LayoutLMv3 使用线性 patch 投影替代 CNN，使用离散 token 分类替代像素/区域特征回归。*

##### 算法核心流程

```python
# LayoutLMv3 预训练伪代码
# 输入: 文档图像 I, OCR文本序列 w, 布局坐标 bbox

# === 嵌入层 ===
# 文本嵌入 (初始化自 RoBERTa)
text_emb = WordEmbed(w) + Pos1D(w) + LayoutPos2D(bbox)  # segment-level 2D pos

# 图像嵌入 (无CNN, 线性投影)
patches = reshape(I, [M, P*P*C])  # M=196 patches, P=16
image_emb = Linear(patches) + Pos1D_learnable(1..M)

# 拼接输入统一 Transformer
x = concat([CLS, text_emb, SEP, image_emb])
h = Transformer(x)  # 12/24 layers

# === 预训练目标 ===
# 1. MLM: 30% span masking (Poisson λ=3)
L_MLM = CrossEntropy(h[masked_text], vocab_ids[masked_text])

# 2. MIM: 40% blockwise masking → 重建 DALL-E dVAE tokens
dvae_tokens = DALL_E_Tokenizer(I)  # 离散化为 8192 类
L_MIM = CrossEntropy(h[masked_patches], dvae_tokens[masked_patches])

# 3. WPA: 对齐预测 (未掩码text ↔ 对应patch是否被掩码)
aligned = (patch_of(unmasked_word) is NOT masked)  # binary label
L_WPA = BinaryCrossEntropy(align_head(h[unmasked_text]), aligned)

# 总损失
L = L_MLM + L_MIM + L_WPA
```

##### 动机与背景

现有文档 AI 预训练模型面临两个关键问题：

1. **图像特征提取依赖重型 CNN**：LayoutLMv2 使用 ResNeXt101-FPN 提取网格特征，不仅参数量大、计算开销高，还需要额外的目标检测预训练（如在 COCO 上训练 Faster R-CNN）。这使得整个预训练流程复杂且难以端到端优化。

2. **文本与图像预训练目标不统一**：文本端使用 MLM 预测离散词汇 ID，但图像端的目标五花八门——DocFormer 重建原始像素（倾向学习噪声细节），SelfDoc 回归区域特征（连续空间更难优化）。这种不对称性增加了多模态融合的难度。

> 💡 关键洞察：LayoutLMv3 的核心思想是将 NLP 中成熟的"掩码-预测"范式统一应用到文本和图像两个模态，通过将图像离散化为 token 来消除模态间的目标函数差异。

##### 核心机制详解

**1. 线性 Patch Embedding（去 CNN）**

将文档图像 \(I \in \mathbb{R}^{3 \times 224 \times 224}\) 切分为 \(M = 14 \times 14 = 196\) 个大小为 \(16 \times 16\) 的 patch，每个 patch 展平后通过一个线性层投影到 \(D\) 维：

$$\mathbf{v}_i = \text{Linear}(\text{flatten}(P_i)) + \mathbf{e}_i^{1D}, \quad i = 1, \ldots, M$$

其中 \(\mathbf{e}_i^{1D}\) 是可学习的 1D 位置嵌入。这比 ResNeXt101-FPN 减少了约 67M 参数，且无需预训练目标检测器。

**2. Segment-level 2D 布局位置编码**

与 LayoutLMv2 对每个 word token 独立编码 2D 坐标不同，LayoutLMv3 以 OCR segment（通常是一个完整短语或单词组）为单位，segment 内所有 subword token 共享相同的 2D 坐标。这减少了 BPE 分词导致的坐标噪声。

2D 位置嵌入由 6 个可学习嵌入表组成：

$$\text{LayoutPos2D} = \text{Emb}(x_0) + \text{Emb}(y_0) + \text{Emb}(x_1) + \text{Emb}(y_1) + \text{Emb}(w) + \text{Emb}(h)$$

**3. Masked Image Modeling (MIM)**

采用 blockwise masking 策略（约 40% 的 patch 被掩码），被掩码区域用可学习的 [MASK] embedding 替代。重建目标不是原始像素，而是预训练好的 DALL-E discrete VAE tokenizer 生成的离散 token（词表大小 8192）：

$$\mathcal{L}_{\text{MIM}} = -\sum_{i \in \mathcal{M}_I} \log p(z_i | \mathbf{h}_i)$$

其中 \(z_i\) 是第 \(i\) 个 patch 对应的 dVAE token ID。

> ⚠️ 注意：消融实验表明，如果只有 MLM 而没有 MIM，模型在图像中心任务（如 PubLayNet 版面分析）上会出现 loss 发散，无法收敛。MIM 是使模型具备视觉理解能力的关键。

**4. Word-Patch Alignment (WPA)**

WPA 是一个轻量级的跨模态对齐任务。对于每个**未被掩码**的文本 token，模型需要预测其对应位置的图像 patch 是否被掩码（二分类）：

$$\mathcal{L}_{\text{WPA}} = -\sum_{j \in \mathcal{U}_T} \left[ y_j \log p_j + (1-y_j) \log(1-p_j) \right]$$

其中 \(y_j = 1\) 表示文本 token \(j\) 对应的 patch 未被掩码（即"对齐"），\(y_j = 0\) 表示对应 patch 被掩码。

> 💡 设计巧思：WPA 只在未掩码的文本 token 上计算，避免了掩码 token 本身语义不确定带来的噪声。同时，它利用了 MIM 的掩码策略作为天然的正负样本生成器，无需额外标注。

**5. 总预训练损失**

$$\mathcal{L} = \mathcal{L}_{\text{MLM}} + \mathcal{L}_{\text{MIM}} + \mathcal{L}_{\text{WPA}}$$

##### 消融实验关键发现

| 配置 | 图像嵌入 | 预训练目标 | FUNSD F1 | PubLayNet mAP |
|------|---------|-----------|----------|---------------|
| #1 | 无 | MLM | 88.64 | N/A |
| #2 | Linear | MLM | 89.39 | Loss 发散 |
| #3 | Linear | MLM+MIM | 89.19 | 94.38 |
| #4 | Linear | MLM+MIM+WPA | 89.78 | 94.43 |

关键结论：
- 仅添加图像 patch 而不加 MIM 目标，会导致视觉任务 loss 发散（#2）
- MIM 是视觉能力的必要条件（#3 vs #2）
- WPA 在文本中心和图像中心任务上均有提升（#4 vs #3）

##### 与前代方法对比

| 特性 | LayoutLM | LayoutLMv2 | LayoutLMv3 |
|------|----------|------------|------------|
| 图像编码 | ResNet-101 (fine-tune) | ResNeXt101-FPN | Linear Patch |
| 需要预训练检测器 | ✓ | ✓ | ✗ |
| 图像预训练目标 | 无 | 对比学习 | MIM (离散token) |
| 跨模态对齐 | 无 | MVLM+TIA+TIM | WPA |
| 参数量 (BASE) | 160M | 200M | 133M |
| FUNSD F1 | 79.27 | 82.76 | 90.29 |

##### 训练配置

- **预训练数据**：IIT-CDIP Test Collection（1100 万文档图像），使用其中部分数据
- **BASE 模型**：12 层 Transformer，D=768，12 头，FFN=3072
- **LARGE 模型**：24 层 Transformer，D=1024，16 头，FFN=4096
- **文本初始化**：从 RoBERTa 权重初始化
- **图像输入**：224×224，patch size=16，共 196 个 patch token
- **文本长度**：最大 512 token
- **训练稳定性**：采用 CogView 的 PB-Relax 注意力计算避免数值溢出

#### 🧪 练习题

```yaml
question: "LayoutLMv3 在预训练时，如果去掉 MIM 目标只保留 MLM，会出现什么问题？"
options:
  - "文本理解任务性能大幅下降"
  - "图像中心任务（如版面分析）的 loss 发散，无法收敛"
  - "模型参数量显著增加"
  - "跨模态对齐能力完全丧失"
answer: 1
explain: "消融实验表明，仅用 MLM 训练时图像 patch embedding 缺乏有效监督信号，导致视觉任务 loss 发散。MIM 通过重建离散 dVAE token 为图像模态提供了必要的自监督信号。"
```