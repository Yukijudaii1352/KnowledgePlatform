### MAE — 掩码自编码器 (Masked Autoencoders)

```yaml
id: mae
name: MAE
full_name: 掩码自编码器 (Masked Autoencoders)
year: '2022'
org: Meta AI
paper_url: https://arxiv.org/abs/2111.06377
category: pretrain
parent: mlm
motivation: 高比例掩码图像块重建学习视觉特征
```

#### 📝 一句话总结

MAE 提出了一种非对称编码器-解码器架构，通过随机掩码 75% 的图像块并重建像素值来进行自监督预训练，以极低计算成本学习高质量视觉表征，使 vanilla ViT-Huge 在 ImageNet-1K 上达到 87.8% 的最优精度。

#### 🎯 核心要点

- **非对称编码器-解码器架构**：编码器仅处理可见（未掩码）的 25% 图像块，解码器轻量化（<10% 编码器计算量），大幅降低预训练开销
- **高掩码比例**（75%）：消除图像冗余，迫使模型学习全局语义理解而非局部插值
- **像素级重建目标**：直接预测被掩码区域的归一化像素值，使用 MSE 损失，无需额外的 tokenizer（如 dVAE）
- **仅对掩码区域计算损失**：类似 BERT 的设计，只在被遮挡的 patch 上计算重建损失
- **高效实现**：通过 shuffle/unshuffle 操作避免稀疏计算，训练速度比 BEiT 快 3.5×
- **强扩展性**：模型越大收益越明显，ViT-H 在 ImageNet-1K 达到 87.8%，下游迁移性能优于有监督预训练

#### 🔬 深入细节

![MAE 架构示意图](https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png)
*图：MAE 预训练架构。输入图像被分割为 patch 后随机掩码 75%，编码器仅处理可见 patch，解码器接收编码特征和 mask token 后重建完整图像像素。预训练完成后丢弃解码器，编码器用于下游任务。*

```python
# MAE 预训练伪代码
def mae_pretrain(image, mask_ratio=0.75):
    # 1. Patch Embedding
    patches = patchify(image)                    # [N, patch_dim]
    tokens = linear_proj(patches) + pos_embed    # [N, D]
    
    # 2. Random Masking (shuffle + remove)
    shuffled_indices = random_permutation(N)
    num_visible = int(N * (1 - mask_ratio))      # 25% visible
    visible_tokens = tokens[shuffled_indices[:num_visible]]
    
    # 3. Encoder (only visible tokens)
    encoded = transformer_encoder(visible_tokens) # [num_visible, D]
    
    # 4. Decoder preparation
    mask_tokens = learnable_mask_token.repeat(N - num_visible)
    full_tokens = concat(encoded, mask_tokens)
    full_tokens = unshuffle(full_tokens, shuffled_indices)
    full_tokens += decoder_pos_embed
    
    # 5. Decoder (lightweight)
    decoded = transformer_decoder(full_tokens)    # [N, patch_pixels]
    
    # 6. Loss: MSE only on masked patches
    loss = MSE(decoded[masked_indices], patches[masked_indices])
    return loss
```

##### 动机与背景

NLP 领域中，BERT 的掩码语言模型（MLM）和 GPT 的自回归预训练已经证明了自监督学习的巨大潜力，能够训练超过千亿参数的通用模型。然而在计算机视觉领域，自监督预训练的效果长期落后于有监督预训练。MAE 的作者认为这种差距源于两个关键差异：

1. **信息密度不同**：语言是高度语义化、信息密集的信号，而图像具有大量空间冗余——相邻像素高度相关。因此，掩码少量图像区域（如 BERT 的 15%）可以通过简单插值恢复，无法迫使模型学习深层语义。
2. **解码器角色不同**：在 NLP 中解码器输出离散 token（词汇表中的词），具有丰富语义；而视觉重建的目标是像素，语义层级较低，需要不同的架构设计来弥合表征与像素之间的鸿沟。

> 💡 关键洞察：将掩码比例大幅提高到 75%，可以有效消除图像的空间冗余，创造一个不可通过局部外推轻易解决的自监督任务。

##### 核心机制详解

**1. 非对称编码器-解码器设计**

MAE 的核心创新在于编码器和解码器的非对称设计：

- **编码器**：标准 ViT 架构，但**仅处理可见的 25% patch**。由于 mask token 不进入编码器，计算量降低为全量处理的约 1/4。这使得训练超大模型（如 ViT-Huge，632M 参数）在计算上变得可行。

- **解码器**：轻量级 Transformer，仅有 8 层、宽度 512（编码器 ViT-L 为 24 层、宽度 1024）。解码器接收编码后的可见 patch 特征和可学习的 mask token，加上位置编码后重建完整图像。

$$\text{Encoder Input: } \{x_i + e_i^{pos}\}_{i \in \mathcal{V}}, \quad |\mathcal{V}| = 0.25N$$

$$\text{Decoder Input: } \{z_i\}_{i \in \mathcal{V}} \cup \{m\}_{i \in \mathcal{M}} + e^{dec\_pos}$$

其中 \(\mathcal{V}\) 为可见 patch 集合，\(\mathcal{M}\) 为掩码 patch 集合，\(m\) 为共享的可学习 mask token，\(e^{pos}\) 为位置编码。

> ⚠️ 注意：解码器仅在预训练阶段使用。下游任务中直接使用编码器处理完整图像（所有 patch），不需要解码器。

**2. 高比例随机掩码策略**

MAE 采用均匀随机采样（无替换）来选择被掩码的 patch，掩码比例默认为 75%。实验表明：

| 掩码比例 | Fine-tuning Acc. | Linear Probing Acc. |
|---------|-----------------|-------------------|
| 25%     | ~83.5%          | ~60%              |
| 50%     | ~84.5%          | ~70%              |
| **75%** | **84.9%**       | **73.5%**         |
| 90%     | ~84.0%          | ~68%              |

75% 是最优比例，因为：
- 过低的比例使任务过于简单（局部插值即可解决）
- 过高的比例使信息过少，重建质量下降
- 均匀分布避免了中心偏差（center bias）

**3. 重建目标与损失函数**

MAE 直接重建像素值，损失函数为仅在掩码区域计算的 MSE：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \|f_\theta(x)_i - x_i\|^2$$

进一步，论文发现对每个 patch 内的像素值进行归一化（减均值除标准差）作为重建目标，可以提升表征质量：

$$\hat{x}_i = \frac{x_i - \mu_i}{\sigma_i}, \quad \mathcal{L}_{norm} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \|f_\theta(x)_i - \hat{x}_i\|^2$$

归一化像素目标使 fine-tuning 精度从 84.9% 提升至 85.4%（ViT-L）。

> 💡 关键：与 BEiT 使用 dVAE token 作为重建目标不同，MAE 直接重建像素值，更简单且效果更好。BEiT 在使用像素重建时精度下降 1.8%，而 MAE 无此问题。

**4. 高效实现：Shuffle-Unshuffle**

MAE 的实现不需要任何稀疏操作：

1. 对所有 patch token 进行随机 shuffle
2. 取前 25% 作为可见 token 送入编码器（等价于无替换随机采样）
3. 编码后，将 mask token 追加到编码特征后
4. 执行 unshuffle（逆 shuffle）恢复原始位置顺序
5. 解码器处理完整序列

这种设计使得 MAE 训练速度比 BEiT 快 **3.5×**（每 epoch），且总预训练时间更短（ViT-L 在 128 TPU-v3 上：MAE 1600 epochs = 31 小时 vs MoCo v3 300 epochs = 36 小时）。

##### 与传统方法的关键区别

| 特性 | MAE | BEiT | MoCo v3 | 有监督预训练 |
|------|-----|------|---------|------------|
| 预训练信号 | 像素重建 | dVAE token 预测 | 对比学习 | 标签分类 |
| 需要额外模型 | ❌ | ✅ (dVAE) | ✅ (动量编码器) | ❌ |
| 编码器处理 | 仅可见 patch | 全部 patch + mask token | 全部 patch | 全部 patch |
| 训练效率 | ⭐⭐⭐ | ⭐ | ⭐⭐ | ⭐⭐ |
| ViT-L Fine-tune | 85.9% | 85.2% | 84.1% | 82.5% |
| ViT-H Fine-tune | **87.8%** | — | — | — |

##### 主要实验结果

- **ImageNet-1K 分类**：ViT-H/14 达到 87.8%（448 尺寸 fine-tune），仅使用 IN1K 数据即超越所有先前方法
- **目标检测（COCO）**：MAE 预训练的 ViT-L 作为 Mask R-CNN 骨干，box AP 达到 53.3%，超越有监督预训练
- **语义分割（ADE20K）**：MAE 预训练的 ViT-L 达到 mIoU 53.6%，显著优于有监督基线
- **扩展性**：模型从 ViT-B → ViT-L → ViT-H 持续提升，未出现饱和

#### 🧪 练习题

```yaml
question: "MAE 中编码器为什么不处理 mask token？"
options:
  - "因为 mask token 没有位置信息，编码器无法处理"
  - "为了降低计算开销，使编码器仅处理 25% 的 token，实现 3× 以上加速"
  - "因为 mask token 会导致编码器过拟合"
  - "因为 ViT 架构不支持处理特殊 token"
answer: 1
explain: "MAE 的非对称设计核心在于编码器仅处理可见 patch（25%），避免了对大量 mask token 的冗余计算，使训练大模型的计算量降至约 1/4，实现 3× 以上加速。"
```