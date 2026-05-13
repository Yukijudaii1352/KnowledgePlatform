### MAE — 掩码自编码器 (Masked Autoencoders Are Scalable Self-Supervised Learners)

```yaml
id: mae
name: MAE
full_name: "掩码自编码器 (Masked Autoencoders Are Scalable Self-Supervised Learners)"
year: 2021
org: Meta AI (FAIR)
paper_url: https://arxiv.org/abs/2111.06377
category: foundation
parent: "—"
motivation: "用非对称编码器-解码器架构和高比例掩码实现视觉自监督预训练"
```

#### 📝 一句话总结

MAE 提出了一种非对称编码器-解码器架构的掩码自编码器，通过随机遮挡 75% 的图像 patch 并仅用可见 patch 进行编码，实现了高效且可扩展的视觉自监督预训练，在 ImageNet-1K 上以 ViT-H 达到 87.8% 的 fine-tuning 精度。

#### 🎯 核心要点

- **非对称编码器-解码器架构**：编码器仅处理可见 patch（约 25%），解码器在编码后引入 mask token 重建完整图像，大幅降低计算量（3× 以上加速）
- **极高掩码比例（75%）**：远高于 NLP 中 BERT 的 15%，迫使模型学习全局语义而非局部纹理插值
- **像素级重建目标**：使用 MSE 损失在像素空间直接重建被遮挡 patch，无需离散 tokenizer（如 dVAE）
- **逐 patch 归一化**：对每个目标 patch 独立做均值-方差归一化，提升重建质量和表征效果
- **可扩展性强**：从 ViT-B 到 ViT-H 持续提升，ViT-H/14 在 ImageNet-1K 上达到 87.8%（448 尺寸），仅用 IN1K 数据即超越此前所有方法
- **训练效率高**：编码器跳过 mask token，配合 shuffle/unshuffle 操作，1600 epoch 预训练 ViT-L 仅需 31 小时（128 TPU-v3），快于 MoCo v3 的 300 epoch（36 小时）

#### 🔬 深入细节

##### 核心架构图

![MAE 架构示意图](https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png)
*图：MAE 的非对称编码器-解码器架构。编码器仅处理可见 patch（无 mask token），解码器在编码后插入 mask token 重建完整图像。*

##### 算法伪代码

```python
# MAE 预训练伪代码
def mae_pretrain_step(image, mask_ratio=0.75):
    # 1. Patch 化 + 位置编码
    patches = patchify(image)                    # [N, patch_dim]
    patches = patches + pos_embed                # 加位置编码

    # 2. 随机掩码：保留 25% 的 patch
    visible_ids, masked_ids = random_mask(N, mask_ratio)
    visible_patches = patches[visible_ids]       # [N_vis, patch_dim]

    # 3. 编码器：仅处理可见 patch（标准 ViT）
    latent = encoder(visible_patches)            # [N_vis, D]

    # 4. 解码器输入：拼接编码结果 + mask tokens，恢复原始顺序
    mask_tokens = learnable_mask_token.repeat(N_masked)
    full_tokens = concat(latent, mask_tokens)    # unshuffle 恢复位置
    full_tokens = full_tokens + decoder_pos_embed
    decoded = decoder(full_tokens)               # [N, D_dec]

    # 5. 损失：仅在被遮挡 patch 上计算 MSE
    pred = linear_proj(decoded[masked_ids])      # 预测像素值
    target = normalize_per_patch(patches[masked_ids])  # patch 归一化
    loss = mse_loss(pred, target)
    return loss
```

##### 动机与背景

自监督学习在 NLP 领域（GPT、BERT）取得了巨大成功，其核心范式——掩码语言建模（Masked Language Modeling）——通过遮挡部分输入并预测被遮挡内容来学习表征。然而，将这一思路迁移到计算机视觉领域面临三大挑战：

1. **架构差异**：卷积网络难以自然地引入 mask token 或位置编码，而 ViT 的出现消除了这一障碍。
2. **信息密度差异**：语言是高度语义化的离散信号，遮挡一个词就丢失大量信息；而图像具有强烈的空间冗余——相邻像素高度相关，低掩码率下模型可以通过简单插值"作弊"而无需理解语义。
3. **解码器角色差异**：在 NLP 中解码器可以很简单（一个线性层预测词汇），但在视觉中重建像素需要更复杂的解码器，且解码器的设计会显著影响学到的表征质量。

MAE 针对这三个挑战给出了统一的解决方案：使用 ViT 作为骨干、采用极高掩码率（75%）消除冗余、设计非对称的轻量解码器。

##### 核心机制详解

**1. 掩码策略（Masking）**

MAE 将输入图像划分为不重叠的 patch（如 16×16），然后按均匀随机采样选择一部分 patch 进行遮挡。论文发现 **75% 的掩码率** 是最优的，这一比例远高于 BERT 的 15%，也高于视觉领域此前工作（如 BEiT 的 40%）。

> 💡 关键：高掩码率不仅是一个超参数选择，而是 MAE 设计哲学的核心。它确保剩余的可见 patch 不足以通过局部纹理插值完成重建，迫使编码器学习对物体形状、语义结构的全局理解。

**2. 非对称编码器（Asymmetric Encoder）**

编码器是标准的 ViT，但有一个关键设计：**编码器仅处理可见 patch，不包含任何 mask token**。可见 patch 加上位置编码后直接送入 Transformer。

这一设计带来了巨大的计算优势。在 75% 掩码率下，编码器仅处理 25% 的 token，计算量和显存占用降为原来的约 \(\frac{1}{4}\)（由于 Transformer 的二次复杂度，实际加速超过 3 倍）。这使得 MAE 可以高效地训练超大模型（如 ViT-H，632M 参数）。

**3. 轻量解码器（Lightweight Decoder）**

解码器仅在预训练阶段使用，其输入由两部分组成：
- 编码器输出的可见 patch 表征
- 共享的可学习 mask token（代表被遮挡位置）

两者通过 unshuffle 操作恢复到原始空间位置，加上解码器专用的位置编码后，送入一个较浅的 Transformer 解码器。论文默认使用 **8 层 Transformer block，宽度 512**，远小于编码器（如 ViT-L 为 24 层、宽度 1024）。

> 💡 关键：解码器的设计体现了"表征学习与重建任务解耦"的思想。编码器负责学习语义表征（用于下游任务），解码器仅负责将表征映射回像素空间（仅在预训练时使用）。轻量解码器不仅节省计算，还避免了解码器过强导致编码器"偷懒"的问题。

**4. 重建目标（Reconstruction Target）**

MAE 直接在像素空间重建被遮挡的 patch，使用均方误差（MSE）作为损失函数：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - \text{norm}(x_i) \|^2$$

其中 \(\mathcal{M}\) 是被遮挡 patch 的索引集合，\(\hat{x}_i\) 是模型预测，\(\text{norm}(x_i)\) 是对目标 patch 进行逐 patch 归一化后的像素值。

> ⚠️ 注意：损失**仅在被遮挡的 patch 上计算**，类似于 BERT 只预测被 mask 的 token。逐 patch 归一化（减去该 patch 的均值、除以标准差）是一个重要的细节，它提升了表征质量，可能是因为归一化后模型更关注 patch 内部的相对结构而非绝对亮度。

**5. 高效实现：Shuffle & Unshuffle**

为避免在编码器中处理大量无意义的 mask token，MAE 采用了 shuffle/unshuffle 策略：
1. 对所有 patch 生成随机排列
2. 按排列顺序取前 25% 作为可见 patch 送入编码器
3. 编码完成后，将编码结果与 mask token 拼接，通过 unshuffle（逆排列）恢复原始位置顺序
4. 送入解码器

这一实现无需稀疏操作，完全基于索引操作，在 GPU 上非常高效。

##### 与相关方法的对比

| 特性 | MAE | BEiT | MoCo v3 |
|------|-----|------|---------|
| 预训练范式 | 掩码重建 | 掩码 token 预测 | 对比学习 |
| 重建目标 | 像素 | 离散 visual token | — |
| 需要额外 tokenizer | ❌ | ✅ (dVAE) | ❌ |
| 掩码率 | 75% | 40% | — |
| 编码器处理 mask token | ❌ | ✅ | — |
| ViT-L 精度 (IN1K) | **85.9%** | 85.2% | 84.1% |
| 训练速度 (vs BEiT) | **3.5× 更快** | 1× | — |

MAE 相比 BEiT 更简单（无需预训练 dVAE tokenizer）、更快（编码器不处理 mask token）、更准确（ViT-L 上高 0.7%）。相比对比学习方法（MoCo v3），MAE 在大模型上优势更明显，且不需要数据增强、动量编码器等复杂组件。

#### 🧪 练习题

```yaml
question: "MAE 的编码器在预训练时为什么不处理 mask token？"
options:
  - "因为 mask token 会引入噪声，降低表征质量"
  - "因为跳过 mask token 可以大幅减少计算量，且不影响编码器学到的表征"
  - "因为 ViT 架构不支持处理 mask token"
  - "因为 mask token 需要在解码器中才能获得正确的位置编码"
answer: 1
explain: "编码器跳过 mask token 是 MAE 的核心设计之一。在 75% 掩码率下，编码器仅处理 25% 的 token，计算量降至约 1/4，实现 3× 以上加速，同时实验表明这不会损害甚至能改善学到的表征质量。"
```