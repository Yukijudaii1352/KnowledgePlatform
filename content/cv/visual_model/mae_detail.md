### MAE

```yaml
id: mae
name: MAE
full_name: 掩码自编码器 (Masked Autoencoders)
year: '2021.11'
org: Meta AI
paper_url: https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper
category: representation
parent: beit
motivation: 75%掩码率极简高效
```

#### 📝 一句话总结

MAE 提出了一种非对称编码器-解码器架构的掩码自编码方法，通过随机掩盖 75% 的图像 patch 并重建像素值来进行自监督预训练，在大幅降低计算成本（3× 以上加速）的同时使 ViT 在 ImageNet-1K 上达到 87.8% 的最优精度，并在下游任务中展现出优异的迁移能力。

#### 🎯 核心要点

- **非对称编码器-解码器架构**：编码器仅处理可见 patch（约 25%），解码器轻量化（计算量不到编码器的 10%），大幅减少预训练计算量
- **极高掩码率（75%）**：远高于 BERT 的 15% 和视觉领域此前的 20%–50%，消除图像空间冗余，迫使模型学习全局语义理解
- **像素级重建目标**：直接预测被掩盖 patch 的像素值（MSE 损失），无需额外的离散 tokenizer（如 BEiT 的 dVAE），更简单高效
- **仅在掩码 patch 上计算损失**：类似 BERT，不对可见 patch 计算重建损失
- **归一化像素作为重建目标**：对每个 patch 内像素做归一化后作为目标可进一步提升表征质量
- **Shuffle/Unshuffle 实现**：无需稀疏操作，通过随机打乱 + 截断 + 恢复顺序实现高效掩码，引入的额外开销可忽略
- **强大的可扩展性**：ViT-H/14 在仅使用 ImageNet-1K 数据下达到 87.8% top-1 精度；COCO 检测 53.3 AP\(^{\text{box}}\)，ADE20K 语义分割 53.6 mIoU

#### 🔬 深入细节

##### 核心架构示意图

![MAE 架构示意图](https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png)
*图：MAE 预训练架构。输入图像被划分为 patch 后随机掩盖 75%，编码器仅处理可见 patch，解码器接收编码表示与 mask token 后重建完整图像。预训练完成后丢弃解码器，编码器用于下游任务。*

![MAE 重建示例](https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x2.png)
*图：ImageNet 验证集上的重建示例。每组三张图分别为掩码图像（左）、MAE 重建结果（中）、原始图像（右），掩码率 80%。*

##### 算法伪代码

```python
# MAE 预训练伪代码
def mae_pretrain_step(image, encoder, decoder, mask_ratio=0.75):
    # 1. Patch 嵌入
    patches = patchify(image)                    # [N, patch_dim]
    tokens = linear_embed(patches) + pos_embed   # [N, D]
    
    # 2. 随机掩码（Shuffle + 截断）
    shuffled_indices = random_permutation(N)
    num_visible = int(N * (1 - mask_ratio))      # e.g., 49 out of 196
    visible_tokens = tokens[shuffled_indices[:num_visible]]   # [num_visible, D]
    
    # 3. 编码（仅处理可见 patch）
    latent = encoder(visible_tokens)             # [num_visible, D_enc]
    
    # 4. 拼接 mask token 并恢复顺序（Unshuffle）
    mask_tokens = repeat(learnable_mask_token, N - num_visible)
    full_tokens = concat(latent, mask_tokens)    # [N, D_dec]
    full_tokens = unshuffle(full_tokens, shuffled_indices)
    full_tokens = full_tokens + decoder_pos_embed
    
    # 5. 解码
    reconstructed = decoder(full_tokens)         # [N, patch_pixel_dim]
    
    # 6. 仅在掩码位置计算 MSE 损失
    loss = MSE(reconstructed[masked_indices], target_pixels[masked_indices])
    return loss
```

##### 动机与背景

**NLP 中掩码自编码的成功与视觉领域的差距。** BERT 通过掩盖 15% 的 token 并预测被掩盖内容，在 NLP 领域取得了巨大成功。然而，将这一范式迁移到计算机视觉面临三个核心挑战：

1. **架构差异**：此前视觉领域以 CNN 为主导，卷积操作在规则网格上运行，难以自然地引入 mask token 和位置编码等"指示符"。ViT 的出现消除了这一障碍。

2. **信息密度差异**：语言是高度语义化、信息密集的人工信号，掩盖少量词即可构成有意义的预测任务。图像则是自然信号，存在大量空间冗余——缺失的 patch 往往可以通过邻近 patch 简单插值恢复，无需高层语义理解。因此需要**极高的掩码率**来消除冗余，迫使模型进行全局推理。

3. **解码器角色差异**：在 NLP 中解码器预测的是富含语义的词，因此 BERT 的解码器可以很简单（一个 MLP）。而在视觉中解码器重建的是像素——语义层级较低——因此解码器的设计对学到的表征质量至关重要。

> 💡 关键洞察：图像的空间冗余是视觉掩码自编码与 NLP 的根本差异。MAE 通过极高掩码率（75%）将"简单的插值任务"转化为"需要全局语义理解的困难任务"。

##### 核心机制详解

**1. 非对称编码器-解码器设计**

MAE 的核心创新在于编码器和解码器的**非对称**设计：

- **编码器**：标准 ViT，但仅接收**可见 patch**（约 25%）的 token 序列。被掩盖的 patch 完全不参与编码器计算——不使用 mask token 占位。这意味着编码器的计算量仅为处理全部 patch 的 \(\sim\)25%，带来巨大的效率提升。

- **解码器**：轻量级 Transformer，接收编码器输出的可见 patch 表示 + 可学习的 mask token（共享参数），加上位置编码后处理完整的 token 序列。默认配置为 8 层、宽度 512，计算量不到编码器每 token 计算量的 10%。

$$\text{Encoder input: } \{x_i + e_i \mid i \in \mathcal{V}\}, \quad |\mathcal{V}| \approx 0.25N$$

$$\text{Decoder input: } \{z_i + d_i \mid i \in \mathcal{V}\} \cup \{m + d_j \mid j \in \mathcal{M}\}$$

其中 \(x_i\) 为 patch 嵌入，\(e_i, d_i\) 为位置编码，\(z_i\) 为编码器输出，\(m\) 为共享的 mask token，\(\mathcal{V}, \mathcal{M}\) 分别为可见和掩码 patch 集合。

> ⚠️ 注意：将 mask token 从编码器移到解码器是效率的关键。如果编码器也处理 mask token（如 BEiT），计算量增加 3.3×，且精度反而下降（fine-tuning 84.2% vs 84.9%）。

**2. 高掩码率策略**

消融实验表明，75% 的掩码率在 fine-tuning 和 linear probing 两种评估协议下均为最优。这一比例远高于：
- BERT 的 15%（NLP）
- iGPT 的 50%、BEiT 的 40%（视觉）

过低的掩码率（如 50%）使任务过于简单，模型可通过局部插值完成重建而无需学习语义；过高的掩码率（如 95%）则信息过少导致任务过难。75% 恰好在"足够困难以学习语义"和"足够可行以收敛"之间取得平衡。

**3. 重建目标：像素 vs Token**

MAE 直接以**像素值**作为重建目标，使用 MSE 损失：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{j \in \mathcal{M}} \| \hat{x}_j - x_j \|_2^2$$

其中 \(\hat{x}_j\) 为解码器对第 \(j\) 个掩码 patch 的预测像素值，\(x_j\) 为真实像素值。

进一步地，对每个 patch 内的像素进行**归一化**（减均值除标准差）后作为目标，可提升表征质量（fine-tuning 85.4% vs 84.9%）。这种 per-patch 归一化鼓励模型关注局部对比和纹理结构，而非绝对亮度。

与 BEiT 使用 dVAE token 作为目标相比，MAE 的像素级目标更简单（无需预训练 tokenizer），且精度相当甚至更优。

**4. 高效实现：Shuffle/Unshuffle**

MAE 的实现极为简洁，无需稀疏操作：

1. 对所有 patch token 进行**随机打乱**（shuffle）
2. **截取前 25%** 作为可见 token 送入编码器
3. 编码后，将编码输出与 mask token 拼接，**恢复原始顺序**（unshuffle）
4. 送入解码器

这种实现等价于无放回均匀随机采样，且 shuffle/unshuffle 操作的计算开销可忽略不计。

##### 与 BEiT 的关键区别

| 维度 | MAE | BEiT |
|------|-----|------|
| 重建目标 | 像素值（MSE） | dVAE 离散 token（交叉熵） |
| 编码器输入 | 仅可见 patch | 全部 patch（含 mask token） |
| 掩码率 | 75% | 40% |
| 额外依赖 | 无 | 需预训练 dVAE tokenizer |
| 训练速度 | 3.5× 更快（每 epoch） | 基准 |
| ViT-L fine-tune | 85.9% → 86.9%（ViT-H） | 85.2% |

##### 主要实验结果

**ImageNet-1K 分类：**
- ViT-B：83.6%（fine-tune）
- ViT-L：85.9%（fine-tune）
- ViT-H (224)：86.9%（fine-tune）
- ViT-H (448)：**87.8%**（仅用 IN1K 数据的 SOTA）

**下游迁移任务（ViT-L）：**
- COCO 目标检测：53.3 AP\(^{\text{box}}\)（超越监督预训练 4.0 点）
- COCO 实例分割：47.2 AP\(^{\text{mask}}\)
- ADE20K 语义分割：53.6 mIoU（超越监督预训练 3.7 点）

**训练效率：** ViT-L 在 128 TPU-v3 上预训练 1600 epochs 仅需 31 小时，而 MoCo v3 训练 300 epochs 需 36 小时。

> 💡 关键发现：MAE 的线性探测（linear probing）精度与 fine-tuning 精度**不相关**。MAE 的线性探测精度低于对比学习方法（如 MoCo v3），但只要 fine-tune 1 个 Transformer block，精度就从 73.5% 跃升至 81.0%，说明 MAE 学到的是强大但非线性的特征表示。

#### 🧪 练习题

```yaml
question: "MAE 将 mask token 从编码器移到解码器的主要好处是什么？"
options:
  - "提升重建图像的视觉质量"
  - "使编码器仅处理约 25% 的 token，大幅减少预训练计算量"
  - "让解码器能学到更好的位置编码"
  - "避免编码器过拟合到掩码模式"
answer: 1
explain: "编码器不处理 mask token 意味着其输入序列长度仅为全部 patch 的约 25%，Transformer 的计算量与序列长度平方成正比，因此计算量大幅降低（约 3× 以上加速），这是 MAE 高效训练的核心设计。"
```