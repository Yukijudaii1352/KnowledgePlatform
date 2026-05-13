### MAE — Masked Autoencoder

```yaml
id: mae
name: MAE
full_name: Masked Autoencoder
year: '2022'
org: Meta
paper_url: https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper.html
category: frontier
parent: bert
motivation: 通过重建像素学习视觉特征
```

#### 📝 一句话总结

MAE 提出了一种非对称编码器-解码器架构的掩码自编码器，通过随机遮蔽 75% 的图像 patch 并重建缺失像素来学习视觉表征，将 BERT 式自监督预训练成功迁移到计算机视觉领域，在 ImageNet-1K 上以 vanilla ViT-Huge 达到 87.8% 的最优精度。

#### 🎯 核心要点

- **非对称编码器-解码器架构**：编码器仅处理可见 patch（约 25%），解码器轻量化（计算量不到编码器的 10%），大幅降低预训练计算开销
- **高遮蔽比率（75%）**：远高于 NLP 中 BERT 的 15%，消除图像冗余信息，迫使模型学习高层语义而非局部插值
- **像素级重建目标**：直接预测被遮蔽 patch 的像素值，使用 MSE 损失，仅在遮蔽区域计算损失，无需额外的 tokenizer（如 dVAE）
- **高效实现**：通过 shuffle/unshuffle 操作避免稀疏运算，编码器仅处理 25% token，训练速度比 BEiT 快 3.5 倍以上
- **强大的可扩展性**：模型从 ViT-Base 到 ViT-Huge 持续提升，ViT-H 在 ImageNet-1K 达到 87.8%，超越所有仅用 IN1K 数据的方法
- **优秀的迁移能力**：在目标检测（COCO）、语义分割（ADE20K）等下游任务上均取得显著提升

#### 🔬 深入细节

##### 核心架构示意图

![MAE 架构示意图](https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png)
*图：MAE 预训练架构。输入图像被随机遮蔽 75% 的 patch，编码器仅处理可见 patch，解码器接收编码后的可见 patch 与 mask token 的完整序列并重建原始图像像素。预训练完成后丢弃解码器，仅用编码器进行下游识别任务。*

##### 算法伪代码

```python
# MAE 预训练伪代码
def mae_pretrain(image, mask_ratio=0.75):
    # 1. Patch Embedding
    patches = patchify(image)                    # [N, patch_size^2 * 3]
    tokens = linear_proj(patches) + pos_embed    # [N, D]
    
    # 2. Random Masking (shuffle-based)
    shuffled_indices = random_permutation(N)
    num_visible = int(N * (1 - mask_ratio))      # e.g., 25% of 196 = 49
    visible_tokens = tokens[shuffled_indices[:num_visible]]   # [49, D]
    
    # 3. Encoder (only visible tokens)
    encoded = encoder(visible_tokens)            # [49, D] — 标准 ViT
    
    # 4. Decoder (full set)
    mask_tokens = repeat(learnable_mask_token, N - num_visible)
    full_tokens = concat(encoded, mask_tokens)   # [196, D_dec]
    full_tokens = unshuffle(full_tokens) + decoder_pos_embed
    decoded = decoder(full_tokens)               # [196, patch_size^2 * 3]
    
    # 5. Loss (only on masked patches)
    loss = MSE(decoded[masked_indices], patches[masked_indices])
    return loss
```

##### 动机与背景

BERT 在 NLP 领域通过掩码语言建模（Masked Language Modeling）取得了巨大成功，自然引发了一个问题：**能否将同样的自监督范式迁移到计算机视觉？** 然而，视觉与语言之间存在三个关键差异：

1. **架构差异**：CNN 难以自然地引入 mask token 和位置编码等"指示符"，直到 Vision Transformer（ViT）的出现才消除了这一障碍。
2. **信息密度差异**：语言是高度语义化、信息密集的，而图像具有大量空间冗余——相邻像素高度相关。因此，在视觉中需要远高于 NLP 的遮蔽比率（75% vs. 15%）才能构造有意义的预测任务。
3. **解码器角色差异**：在 NLP 中，解码器只需预测离散的词 token（语义丰富）；而在视觉中，解码器需要重建像素（语义层次较低），编码器与解码器的语义抽象层级存在显著差距。

> 💡 关键：正是这三个差异的深刻理解，驱动了 MAE 中非对称架构和高遮蔽比率两个核心设计决策。

##### 核心机制详解

**1. 随机遮蔽策略（Random Masking）**

MAE 将输入图像划分为不重叠的 patch（遵循 ViT 的 \(16 \times 16\) 划分），然后以均匀分布无放回地随机采样，遮蔽其中 75% 的 patch。

高遮蔽比率的设计意图是：
- **消除冗余**：图像中相邻 patch 高度相关，低遮蔽比率下模型可以通过简单插值完成重建，无法学到高层语义
- **避免中心偏差**：均匀随机采样确保遮蔽分布无空间偏置
- **提升效率**：仅 25% 的 token 进入编码器，大幅减少计算量

**2. 非对称编码器-解码器（Asymmetric Encoder-Decoder）**

这是 MAE 最核心的架构创新：

- **编码器**：标准 ViT，但**仅处理可见的 25% patch token**。遮蔽的 patch 被完全移除（而非用 mask token 替代），这意味着编码器的计算量仅为全量的 \(\sim\)25%。编码器可以是任意大容量模型（ViT-Base/Large/Huge）。

- **解码器**：轻量级 Transformer，接收编码后的可见 token 与共享的可学习 mask token 拼接而成的完整序列。解码器的宽度和深度远小于编码器（默认配置下计算量不到编码器的 10%）。解码器仅在预训练阶段使用，下游任务中被丢弃。

> ⚠️ 注意：编码器不使用 mask token 是 MAE 效率的关键。如果将 mask token 也送入编码器（如 BEiT），编码器需要处理全部 196 个 token，计算量增加约 3.7 倍。论文实验验证了这一设计使训练加速 3× 以上且不损失精度。

**3. 重建目标与损失函数**

MAE 的重建目标是被遮蔽 patch 的**原始像素值**。损失函数为均方误差（MSE）：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - x_i \|^2$$

其中 \(\mathcal{M}\) 为被遮蔽 patch 的索引集合，\(\hat{x}_i\) 为解码器对第 \(i\) 个 patch 的像素预测，\(x_i\) 为原始像素值。

论文还研究了一种变体：对每个 patch 的像素值进行归一化（减均值除标准差）后作为重建目标，发现这种 **per-patch normalization** 能进一步提升表征质量。

> 💡 关键：与 BEiT 需要先训练一个 dVAE tokenizer 将图像转为离散 token 不同，MAE 直接重建像素，方案更简洁，且实验表明像素重建在 MAE 框架下反而优于 token 预测。

**4. 高效实现（Shuffle-based）**

MAE 的实现巧妙地避免了稀疏运算：

1. 对所有 patch token 进行随机 shuffle
2. 取前 25% 作为可见 token 送入编码器
3. 编码后，将 mask token 追加到编码输出后
4. 对完整序列执行 unshuffle（逆置换）恢复原始位置顺序
5. 加上位置编码后送入解码器

这一过程仅需标准的索引操作，无需任何稀疏矩阵运算，额外开销可忽略不计。

##### 与传统方法的区别

| 特性 | MAE | BEiT | iGPT |
|------|-----|------|------|
| 重建目标 | 像素值 | 离散视觉 token（dVAE） | 像素值（低分辨率） |
| 是否需要额外 tokenizer | ❌ | ✅（dVAE 预训练） | ❌ |
| 编码器输入 | 仅可见 patch（25%） | 全部 patch（含 mask token） | 全部像素 |
| 遮蔽比率 | 75% | 40% | — |
| 训练效率 | 高（3.5× faster than BEiT） | 较低 | 极低（像素级自回归） |
| ViT-H ImageNet-1K | **87.8%** | 86.3%* | — |

MAE 的核心优势在于**简洁性与可扩展性**：无需额外预训练步骤，架构设计使得大模型训练高效可行，且随模型规模增大持续获得收益。

#### 🧪 练习题

```yaml
question: "MAE 为什么采用 75% 的高遮蔽比率，而非 BERT 中常用的 15%？"
options:
  - "为了减少训练数据量，节省存储空间"
  - "因为图像具有高空间冗余，低遮蔽比率下模型可通过局部插值完成重建，无法学到高层语义"
  - "为了与 BEiT 的遮蔽比率保持一致"
  - "因为 ViT 的注意力机制要求输入序列尽可能短"
answer: 1
explain: "图像的空间冗余远高于文本，相邻 patch 高度相关。若遮蔽比率过低，模型仅需简单插值即可重建，无法被迫学习高层语义特征。75% 的高遮蔽比率消除了这种捷径，构造了有意义的自监督任务。"
```