### VideoMAE

```yaml
id: videomae
name: VideoMAE
full_name: 视频掩码自编码器 (Video Masked Autoencoders)
year: "2022"
org: Nanjing University / Tencent
paper_url: https://arxiv.org/abs/2203.12602
category: self-supervised
parent: MAE
motivation: 通过极高比例的管状掩码和视频重建任务实现高效的视频自监督预训练
```

#### 📝 一句话总结

VideoMAE 提出了针对视频数据的掩码自编码预训练方法，通过管状掩码（tube masking）策略和极高掩码比率（90-95%）克服视频时间冗余导致的信息泄漏问题，在多个视频理解基准上以极少数据实现了优异性能。

#### 🎯 核心要点

- 提出 Tube Masking 策略：对所有帧施加相同的空间掩码模式，防止时间维度的信息泄漏
- 采用极高掩码比率（90-95%），远超图像 MAE 的 75%，利用视频的时间冗余特性
- 使用 Cube Embedding 将视频 token 化：每个 token 为 \(2 \times 16 \times 16\) 的时空立方体
- 非对称 Encoder-Decoder 架构：Encoder 仅处理可见 token（10%），Decoder 轻量（4层，宽度为 Encoder 一半）
- 骨干网络为 vanilla ViT + Joint Space-Time Attention，无需归纳偏置
- 在像素空间使用 MSE 损失进行重建
- 数据高效：仅用 3.5k 视频（SSv2）即可达到有竞争力的性能
- 主要结果：Kinetics-400 87.4%、Something-Something V2 75.4%、UCF101 91.3%

#### 🔬 深入细节

![VideoMAE 框架总览图](https://ar5iv.labs.arxiv.org/html/2203.12602/assets/x1.png)
*图：VideoMAE 整体框架。视频经 Cube Embedding 后施加 Tube Masking，仅可见 token 送入 Encoder，Decoder 在完整 token 序列上重建被掩码的像素。*

![Masking 策略对比](https://ar5iv.labs.arxiv.org/html/2203.12602/assets/x2.png)
*图：不同掩码策略对比。(a) Frame Random：每帧独立随机掩码；(b) Tube Masking：所有帧共享同一掩码模式，有效防止时间信息泄漏。*

##### 算法伪代码

```python
# VideoMAE 预训练伪代码
def videomae_pretrain(video, mask_ratio=0.9):
    # 1. Cube Embedding: 将视频分割为时空 token
    # video: [T, H, W, 3] → tokens: [T/2 × H/16 × W/16, D]
    tokens = cube_embed(video, patch_size=(2, 16, 16))
    
    # 2. Tube Masking: 生成空间掩码并跨时间复制
    spatial_mask = random_mask(H//16 * W//16, mask_ratio)  # 空间维度
    tube_mask = repeat(spatial_mask, T//2)  # 时间维度复制
    
    # 3. Encoder: 仅处理可见 token (约10%)
    visible_tokens = tokens[~tube_mask]
    visible_tokens += positional_embedding[~tube_mask]
    encoded = encoder(visible_tokens)  # ViT-Base/Large/Huge
    
    # 4. Decoder: 在完整序列上重建
    full_tokens = concat(encoded, mask_tokens)  # 补回 mask token
    full_tokens += positional_embedding
    decoded = decoder(full_tokens)  # 4层, 宽度为encoder一半
    
    # 5. Loss: 仅对被掩码位置计算 MSE
    pred_pixels = linear_proj(decoded[tube_mask])
    target_pixels = original_pixels[tube_mask]
    loss = MSE(pred_pixels, target_pixels)
    return loss
```

##### 动机与背景

视频自监督学习面临的核心挑战是**时间冗余**。与图像不同，视频相邻帧之间存在极高的相似性，这使得简单地将图像 MAE 扩展到视频时，模型可以通过"偷看"相邻帧中对应位置的可见 patch 来轻松完成重建任务，而无需真正学习语义表示。

传统的对比学习方法（如 MoCo、BYOL 的视频扩展）需要大量负样本和精心设计的数据增强，且对小数据集效果有限。VideoMAE 的核心洞察是：**通过设计合适的掩码策略，可以将视频重建变成一个具有挑战性的自监督任务**。

##### 核心机制详解

**1. Cube Embedding（时空立方体嵌入）**

VideoMAE 将输入视频 \(V \in \mathbb{R}^{T \times H \times W \times 3}\) 通过 3D 卷积划分为不重叠的时空立方体 token。每个 token 覆盖 \(2 \times 16 \times 16\) 的时空区域，总共生成 \(\frac{T}{2} \times \frac{H}{16} \times \frac{W}{16}\) 个 token。

时间维度的下采样率为 2（而非 16），这是因为输入视频已经经过了时间采样（stride \(\tau = 4\) 或 2），进一步的时间压缩会丢失运动信息。

**2. Tube Masking（管状掩码）**

> 💡 关键：Tube Masking 是 VideoMAE 最核心的设计创新。

传统的 frame-level random masking 对每帧独立采样掩码位置，导致同一空间位置在不同帧中可能被掩码或可见。由于视频时间连续性，模型可以从相邻帧的可见 patch "复制" 信息来完成重建，使预训练任务过于简单。

Tube Masking 的解决方案极其简洁：**在空间维度生成一次随机掩码 \(M \in \{0,1\}^{\frac{H}{16} \times \frac{W}{16}}\)，然后将其沿时间维度复制到所有帧**。这样，如果某个空间位置被掩码，它在所有帧中都不可见，彻底消除了时间维度的信息泄漏。

$$M_{tube} = \text{repeat}(M_{spatial}, \frac{T}{2})$$

消融实验验证：在 SSv2 数据集上，tube masking（75.4%）显著优于 frame random masking（72.0%），证明了防止时间泄漏的重要性。

**3. 极高掩码比率（90-95%）**

> ⚠️ 注意：视频 MAE 的最优掩码率远高于图像 MAE（75%）。

由于视频的时间冗余，即使使用 tube masking，较低的掩码率（如 75%）仍然使任务过于简单。VideoMAE 发现 **90%** 的掩码率在 Kinetics-400 上最优，**95%** 在 Something-Something V2 上最优。

这带来了显著的计算优势：Encoder 仅需处理 10% 的 token，使得预训练效率极高。对于 ViT-Base 处理 16 帧 224×224 视频，总 token 数为 \(8 \times 14 \times 14 = 1568\)，90% 掩码后 Encoder 仅处理约 157 个 token。

**4. 非对称 Encoder-Decoder 架构**

- **Encoder**：标准 ViT（Base/Large/Huge），使用 Joint Space-Time Attention，仅处理可见 token
- **Decoder**：轻量设计，4 个 Transformer block，嵌入维度为 Encoder 的一半（如 ViT-B Encoder 768 维，Decoder 384 维）

Decoder 接收完整的 token 序列（可见 token 的 Encoder 输出 + 可学习的 mask token），添加位置编码后进行自注意力处理，最终通过线性层投影到像素空间。

**5. 重建目标**

VideoMAE 使用简单的像素级 MSE 损失，仅在被掩码的 token 位置计算：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - x_i \|^2$$

其中 \(\mathcal{M}\) 为被掩码 token 的索引集合，\(\hat{x}_i\) 为预测像素，\(x_i\) 为原始像素。

消融实验表明，简单的归一化像素值作为目标即可获得最佳效果，无需使用 tokenizer（如 dVAE）或其他复杂目标。

##### 训练与微调流程

**预训练阶段：**
- 输入：16 帧视频片段，分辨率 224×224
- 时间采样：stride \(\tau = 4\)（K400）或 \(\tau = 2\)（SSv2）
- 训练 800/1600/2400 epochs（数据集越小需要越多 epochs）
- 优化器：AdamW，学习率 1.5e-4，cosine schedule

**微调阶段：**
- 移除 Decoder，仅使用 Encoder
- 在 Encoder 输出的 [CLS] token 或全局平均池化上添加分类头
- 微调所有参数，学习率较低

##### 与传统方法的区别

| 方面 | 对比学习（MoCo/BYOL） | VideoMAE |
|------|----------------------|----------|
| 预训练任务 | 实例判别/不变性学习 | 像素重建 |
| 数据增强依赖 | 高（需精心设计） | 低（仅基本增强） |
| 负样本需求 | 需要大量负样本 | 无需负样本 |
| 小数据集表现 | 较差 | 优异（3.5k视频即有效） |
| 计算效率 | 需要动量编码器 | 90%掩码大幅降低计算量 |
| 时间建模 | 通常较弱 | 通过掩码重建强制学习时间关系 |

与图像 MAE 相比，VideoMAE 的关键创新在于：(1) tube masking 解决时间泄漏；(2) 更高掩码率适应视频冗余；(3) 证明了视频领域 vanilla ViT 无需时间归纳偏置即可通过 MAE 预训练获得强表示。

#### 🧪 练习题

```yaml
question: "VideoMAE 采用 Tube Masking 而非 Frame Random Masking 的主要原因是什么？"
options:
  - "Tube Masking 计算效率更高，减少了掩码生成的开销"
  - "防止模型利用相邻帧中同一空间位置的可见 patch 泄漏信息"
  - "Tube Masking 能生成更多训练样本，增加数据多样性"
  - "Tube Masking 使得 Decoder 结构可以更简单"
answer: 1
explain: "视频相邻帧高度相似，Frame Random Masking 下同一空间位置在不同帧可能可见，模型可直接'复制'而非学习语义。Tube Masking 确保被掩码位置在所有帧中都不可见，迫使模型学习真正的时空表示。"
```