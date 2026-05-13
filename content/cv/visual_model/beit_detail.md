### BEiT: BERT Pre-Training of Image Transformers

```yaml
id: beit
arxiv: "2106.08254"
tags: [self-supervised, vision-transformer, masked-image-modeling, pre-training]
aliases: [BEiT, 掩码图像建模]
```

#### 📝 一句话总结

BEiT 将 BERT 的掩码语言建模思想迁移到视觉领域，提出**掩码图像建模（Masked Image Modeling, MIM）**：将图像分为 patch 和 visual token 两种视图，预训练时随机掩码约 40% 的 patch，让 Vision Transformer 预测被掩码位置对应的离散 visual token（由预训练的 dVAE 生成），从而学到强大的视觉表征。

---

#### 🎯 关键要点

- **核心创新**：首次提出 Masked Image Modeling（MIM），将 BERT 的 MLM 范式系统地迁移到 Vision Transformer 预训练中，使用离散 visual token 作为预测目标而非原始像素。
- **双视图设计**：图像同时具有两种表示——**image patches**（16×16 像素，作为 Transformer 输入）和 **visual tokens**（由 dVAE tokenizer 生成的离散编码，作为预测目标）。
- **Image Tokenizer**：采用 DALL-E 的 discrete VAE（dVAE），词表大小 |𝒱| = 8192，将 224×224 图像编码为 14×14 = 196 个离散 token。
- **Blockwise Masking**：不是随机选择单个 patch 掩码，而是以**块状（block）**方式掩码，每个块最小 16 个 patch，宽高比在 [0.3, 1/0.3] 之间随机采样，总掩码比例约 40%。
- **预训练目标**：最大化被掩码位置的 visual token 的对数似然：$\max \sum_{x \in \mathcal{D}} \mathbb{E}_{\mathcal{M}} \left[ \sum_{i \in \mathcal{M}} \log p_{\text{MIM}}(z_i | x^{\mathcal{M}}) \right]$
- **下游任务**：在 ImageNet 图像分类和 ADE20K 语义分割上均超越 DeiT、DINO、MoCo v3 等方法，且自注意力机制能自动学习到语义区域和物体边界。
- **理论解释**：从变分自编码器（VAE）视角提供了 MIM 的理论解释。

---

#### 🔬 深入理解

##### 整体架构

![BEiT 预训练流程](https://ar5iv.labs.arxiv.org/html/2106.08254/assets/x1.png)

> **图 1**：BEiT 预训练概览。预训练前，先通过 dVAE 学习 image tokenizer；预训练时，图像同时拥有 image patches 和 visual tokens 两种视图，随机掩码部分 patch 后送入 Transformer，目标是预测原始图像对应位置的 visual token。

##### 预训练伪代码

```
算法：BEiT 预训练

输入：图像数据集 D，预训练好的 dVAE tokenizer
输出：预训练的 Vision Transformer 参数 θ

1. 对每张图像 x ∈ D：
   a. Image Patch 视图：将 x (224×224) 切分为 14×14 = 196 个 patch (每个 16×16)
      线性投影为 patch embedding，加上可学习的位置编码和 [S] (CLS) token
   b. Visual Token 视图：用 dVAE tokenizer 将 x 编码为 196 个离散 token z = {z_1, ..., z_N}，z_i ∈ {1,...,8192}
   c. Blockwise Masking：
      - 初始化 M = {}
      - 重复：
        · 采样块大小 s ∈ [16, 0.4N - |M|]
        · 采样宽高比 r ∈ [0.3, 1/0.3]
        · 计算块尺寸 a = √(s·r), b = √(s/r)
        · 随机选择左上角位置 (t, l)
        · M = M ∪ {块内所有 patch 位置}
      - 直到 |M| > 0.4N（约 40% 被掩码）
   d. 将被掩码位置的 patch embedding 替换为可学习的 [M] embedding
   e. 送入 L 层 Transformer 编码器，得到输出 {h_i^L}
   f. 对每个掩码位置 i ∈ M，用 softmax 分类器预测 visual token：
      p_MIM(z' | x^M) = softmax_{z'}(W_c · h_i^L + b_c)
   g. 损失：最大化 Σ_{i∈M} log p_MIM(z_i | x^M)

2. 通过梯度下降优化 θ（不更新 dVAE 参数）
```

##### 为什么预测 Visual Token 而非原始像素？

BEiT 的一个核心设计决策是**预测离散 visual token 而非原始像素值**。这一选择背后有深刻的考量。如果直接预测原始像素（即回归任务），模型会倾向于学习低层次的纹理和高频细节，浪费大量建模能力在局部像素相关性上，而非捕获高层语义信息。这与 NLP 中 BERT 预测词汇表中的离散 token 的思路一致——离散化迫使模型学习更抽象的语义表示。

dVAE（discrete Variational Autoencoder）充当了"视觉词汇表"的角色。它通过编码器将图像映射到离散的 latent code（从 8192 个候选中选择），再通过解码器重建图像。这个过程天然地压缩了视觉信息，去除了冗余的像素级细节，保留了对重建最关键的语义特征。因此，当 BEiT 被训练去预测这些 visual token 时，它实际上是在学习理解图像的高层语义结构。

值得注意的是，dVAE tokenizer 是预训练好后固定的，在 BEiT 训练过程中不更新其参数。这种"两阶段"设计（先训练 tokenizer，再训练 Transformer）虽然增加了流程复杂度，但有效地将"学习视觉词汇"和"学习上下文表示"两个任务解耦，使得每个阶段的优化目标更加清晰。

##### Blockwise Masking 的设计动机

与 BERT 中随机掩码单个 token 不同，BEiT 采用了**块状掩码（blockwise masking）**策略。这是因为图像 patch 之间存在强烈的局部相关性——相邻的 patch 在视觉上高度相似。如果只随机掩码单个 patch，模型可以轻易地通过相邻 patch 的像素插值来"猜出"被掩码的内容，而无需真正理解图像的语义。

块状掩码通过一次性遮挡一个连续区域，迫使模型必须依赖更远距离的上下文信息来推断被掩码区域的内容。这类似于完形填空中遮挡整个短语而非单个字——模型需要更深层的理解才能完成任务。算法中，每个块的最小面积为 16 个 patch，宽高比在 0.3 到 1/0.3 之间随机变化，这确保了掩码区域的形状多样性，防止模型对特定掩码模式过拟合。

##### 从 VAE 视角的理论解释

论文还从变分自编码器（VAE）的角度为 MIM 提供了理论解释。可以将整个 BEiT 预训练过程看作是在优化一个变分下界：visual token 是图像的离散隐变量，dVAE 提供了先验分布和似然函数，而 BEiT 的 Transformer 则在学习一个条件后验分布——给定部分可见的 patch，推断被掩码位置的隐变量（visual token）。这一视角将 MIM 与经典的生成模型理论联系起来，为其有效性提供了理论基础。

##### 下游微调与实验结果

预训练完成后，BEiT 可以通过添加任务特定的头部进行微调。在 **ImageNet-1K 图像分类**任务上，BEiT-Base（86M 参数）超越了 DeiT-Base（从零训练）、DINO、MoCo v3 等自监督方法，甚至与使用 3 亿张图像预训练的 ViT-JFT300M 相当。在 **ADE20K 语义分割**任务上，BEiT 同样展现了显著优势。

更令人印象深刻的是，可视化分析表明 BEiT 的自注意力机制能够自动学习到**语义区域和物体边界**，尽管预训练过程中没有使用任何人工标注。这说明 MIM 任务确实引导模型学习到了有意义的视觉语义表示。此外，BEiT 与有监督预训练是互补的——先自监督预训练再用 ImageNet 标签微调，可以进一步提升性能。

---

#### 🧪 练习与思考题

1. **概念理解**：为什么 BEiT 选择预测离散 visual token 而非原始像素？如果改为预测像素值（MSE loss），你预期模型会学到什么样的表示？会有什么局限性？

2. **对比分析**：BEiT 的 MIM 与 BERT 的 MLM 在设计上有哪些关键差异？为什么不能直接将 MLM 照搬到视觉领域？（提示：考虑输入空间的连续性、局部相关性、词汇表的存在性）

3. **消融思考**：如果将 blockwise masking 替换为随机 patch masking（保持 40% 掩码率不变），你预期对预训练效果有什么影响？为什么？

4. **架构设计**：BEiT 使用预训练好的 dVAE 作为 tokenizer，这引入了一个额外的预训练阶段。你能想到什么方法来消除对外部 tokenizer 的依赖？（提示：参考后续工作 MAE、data2vec 等）

5. **扩展思考**：BEiT 的 MIM 思想如何扩展到视频理解或多模态学习？在这些场景中，"visual token"和"masking strategy"应该如何调整？