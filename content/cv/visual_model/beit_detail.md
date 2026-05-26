### BEiT

```yaml
id: beit
name: BEiT
full_name: "BERT式图像Transformer预训练 (BERT Pre-Training of Image Transformers)"
year: "2021.06"
org: "Microsoft Research"
paper_url: "https://arxiv.org/abs/2106.08254"
category: representation
parent: vit
motivation: "首创掩码图像建模"
```

#### 📝 一句话总结
BEiT 首次把 BERT 式掩码建模系统性迁移到视觉预训练中，用离散 visual token 作为预测目标而不是直接回归像素，从而显著提升了 ViT 的自监督表征质量。

#### 🎯 核心要点
- 提出 Masked Image Modeling，把图像 patch 的恢复任务改写成离散 token 分类任务。
- 引入双视图：patch 序列作为 Transformer 输入，dVAE 生成的 visual token 作为监督信号。
- 使用 block-wise masking，而不是独立随机 mask，迫使模型利用更大范围上下文推断语义。
- 采用 DALL-E 风格 dVAE 作为图像 tokenizer，词表大小为 8192。
- 在 ImageNet 分类和 ADE20K 分割上优于 DeiT、DINO、MoCo v3 等同时代方法。

#### 🔬 深入细节

![BEiT 预训练流程图](https://ar5iv.labs.arxiv.org/html/2106.08254/assets/x1.png)
*图：BEiT 将图像同时表示为 patch 序列和离散 visual token，模型输入被遮挡后的 patch，目标则是预测原图对应位置的 token。*

```python
# BEiT 预训练伪代码
image = load_image()
patches = patch_embed(image)                     # Transformer 输入
tokens = dvae_tokenizer(image)                   # 离散监督目标
masked_patches, mask_idx = blockwise_mask(patches, ratio=0.4)
hidden = vit_encoder(masked_patches)
logits = classifier(hidden[mask_idx])
loss = cross_entropy(logits, tokens[mask_idx])
loss.backward()
optimizer.step()
```

BEiT 的出发点很直接：直接预测像素值虽然也能形成重建任务，但模型往往更容易学到局部纹理和颜色连续性，而不一定真正掌握高层语义。论文因此把监督目标切换成 dVAE 生成的离散 visual token，相当于先用 tokenizer 把图像压缩成“视觉词汇”，再让 ViT 去做类似 BERT 的分类恢复。

这一设计的关键在于“输入视图”和“目标视图”分离。输入端仍然是标准 patch embedding，因此编码器结构和 ViT 完全兼容；目标端则是 dVAE 产生的离散 token。这样模型既能复用成熟的 Transformer 架构，又能避免像素重建带来的低层细节偏置。预训练目标可以写成：

$$
\mathcal{L}_{\text{MIM}} =
\sum_{i \in \mathcal{M}}
-\log p_\theta(z_i \mid x^\mathcal{M})
$$

其中 \(\mathcal{M}\) 是被遮挡位置集合，\(z_i\) 是对应的 visual token，\(x^\mathcal{M}\) 是 mask 后的输入图像。直观上，模型必须根据周围上下文判断“这里最可能是什么语义单元”，而不是做逐像素插值。

BEiT 还特别强调 block-wise masking。原因是视觉 patch 之间局部相关性极强，如果只随机遮掉零散 patch，模型可以凭附近纹理轻松补全，任务难度偏低。将掩码做成连续块状区域后，模型必须利用更远距离的语义线索，比如“这里应当是狗的头部”而不是“这里颜色与周围相近”。这也是后来大量 MIM 工作沿用区域化 masking 的原因。

从结果看，BEiT 证明了“预测离散语义 token”是一条有效路线，也直接催生了后续 MAE、EVA 等视觉预训练分支。它的重要性不只在于性能提升，更在于给视觉自监督预训练提供了一个与 NLP MLM 对齐的统一范式。

#### 🧪 练习题
```yaml
question: "BEiT 相比直接重建像素，为什么改为预测离散 visual token？"
options:
  - "为了减小 patch 数量，降低输入分辨率"
  - "为了把恢复任务转成更偏语义的分类任务，避免模型只学习低层纹理"
  - "为了让 Transformer 可以使用卷积解码器"
  - "为了彻底去掉位置编码"
answer: 1
explain: "BEiT 的核心思想是用 dVAE 生成的离散 token 作为监督目标，让模型恢复高层语义单元，而不是只做像素级纹理补全。"
```
