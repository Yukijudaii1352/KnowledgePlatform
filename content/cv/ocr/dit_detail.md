### DiT: 文档图像Transformer (Document Image Transformer)

```yaml
id: dit
name: DiT
full_name: "文档图像Transformer (Document Image Transformer)"
year: "2022"
org: Microsoft Research Asia
paper_url: https://arxiv.org/abs/2203.02378
category: document_ai
parent: layoutlm
motivation: 海量无标注自监督预训练
```

#### 📝 一句话总结

DiT 将 BEiT 式 Masked Image Modeling 引入文档图像领域，用 4200 万无标注文档图像训练 ViT 主干，解决了文档视觉任务缺少 ImageNet 级监督预训练的问题。它为版面分析、表格检测、文档分类和 OCR 文本检测提供了文档专用视觉 backbone。

#### 🎯 核心要点

- 使用纯视觉 Document Image Transformer，不依赖 OCR 文本输入，目标是学习通用文档图像表示
- 采用 ViT 架构：文档图像切成 patch，加 1D position embedding 后送入 Transformer encoder
- 使用 BEiT 风格 MIM：mask 部分图像 patch，根据上下文预测离散 visual token
- 重新在 IIT-CDIP 4200 万文档图像上训练 dVAE tokenizer，避免 DALL-E 自然图像 tokenizer 与文档域不匹配
- 预训练模型包括 DiT-B 和 DiT-L，并可接入 Mask R-CNN/Cascade R-CNN 等检测框架
- 在 RVL-CDIP、PubLayNet、ICDAR 2019 cTDaR、FUNSD 文本检测等视觉 Document AI 任务上刷新或接近 SOTA

#### 🔬 深入细节

##### 核心架构图

![DiT MIM 预训练架构](https://ar5iv.labs.arxiv.org/html/2203.02378/assets/x1.png)
*图：DiT 将文档图像切分为 patch，随机 mask 后输入 ViT，并预测由文档 dVAE tokenizer 产生的离散 visual token。*

![DiT 检测框架接入方式](https://ar5iv.labs.arxiv.org/html/2203.02378/assets/x2.png)
*图：DiT 作为 ViT backbone 接入检测框架时，通过分辨率调整模块产生多尺度特征，供 Mask R-CNN 或 Cascade R-CNN 使用。*

##### 算法伪代码

```python
# DiT 自监督预训练伪代码
def pretrain_dit(document_image):
    image = resize(document_image, (224, 224))

    # 1. patch view for Transformer input
    patches = split_into_patches(image, patch_size=16)  # 14x14 patches
    mask = random_mask(patches)
    masked_patches = replace(patches, mask, token="[MASK]")

    # 2. token view for supervision
    # document-domain dVAE is trained on IIT-CDIP document images
    visual_tokens = document_dvae_tokenizer(image)      # 14x14 token ids

    # 3. masked image modeling
    h = ViT(masked_patches + position_embedding)
    logits = token_classifier(h[mask])
    loss = cross_entropy(logits, visual_tokens[mask])
    return loss
```

##### 方法详解

**1. 动机与背景**

自然图像视觉模型有 ImageNet、COCO 等大规模监督数据支撑，文档图像却缺少同等规模的人工标注。直接把 ImageNet 预训练模型迁移到文档任务会遇到域差异：文档图像以文字、表格线、版面块和扫描噪声为主，视觉统计与自然图像完全不同。

DiT 的目标是构建一个文档图像专用的自监督视觉 backbone。它不直接做文本理解，而是学习文档页面的视觉结构，为版面分析、表格检测、文档分类和 OCR 前置检测等任务提供初始化。

**2. ViT 文档图像编码**

DiT 遵循 ViT：输入图像被 resize 到固定大小并划分为不重叠 patch，每个 patch 线性投影为 token，再加入位置编码：

$$
\mathbf{x}_i = \text{Linear}(\text{patch}_i) + \mathbf{p}_i
$$

这些 patch token 经过 Transformer encoder 输出上下文化视觉表示。由于文档图像包含长距离版面关系，Transformer 的全局注意力适合建模跨段落、跨表格和跨区域的结构。

**3. 文档域 dVAE tokenizer**

BEiT 使用 DALL-E dVAE tokenizer 生成 visual token，但 DALL-E tokenizer 训练在自然图像上，对黑白文档、细线和密集文字不够匹配。DiT 因此在 IIT-CDIP 的 4200 万文档图像上重新训练 dVAE tokenizer，codebook size 为 8192。

给定图像，tokenizer 输出离散 token map，作为 MIM 的分类监督。论文展示文档 tokenizer 的重建更接近文档结构，而自然图像 tokenizer 容易丢失细粒度文本/线条。

**4. Masked Image Modeling**

DiT 随机 mask 一部分 patch，Transformer 根据未 mask 上下文预测被 mask 位置的 visual token：

$$
\mathcal{L}_{MIM} = -\sum_{i \in \mathcal{M}} \log p(z_i | \mathbf{x}_{\setminus \mathcal{M}})
$$

其中 \(z_i\) 是文档 dVAE 对第 \(i\) 个 patch 生成的离散 token。相比像素重建，离散 token 分类更强调语义/结构模式，而不是逐像素噪声。

**5. 下游适配**

分类任务中，DiT 对 patch 表示做平均池化后接线性分类器。检测任务中，ViT 原生单尺度输出不适合 FPN，因此论文在不同 Transformer block 输出处增加上采样/下采样模块，形成多尺度特征，接入 Mask R-CNN 或 Cascade R-CNN。

> ⚠️ 注意：DiT 与 LayoutLM 系列关注点不同。LayoutLM 以 OCR 文本和布局为核心，DiT 以原始文档图像为核心；DiT 可以作为后续多模态文档模型的视觉基础。

**6. 结果意义**

DiT 的实验证明，文档视觉任务需要文档域预训练。它在 RVL-CDIP 分类、PubLayNet 版面分析、cTDaR 表格检测和 FUNSD 文本检测上均优于同等规模的自然图像预训练 ViT/DeiT/BEiT/MAE，说明预训练数据域比单纯模型结构更关键。

#### 🧪 练习题

```yaml
question: "DiT 为什么要重新训练文档域 dVAE tokenizer，而不是直接使用 BEiT 的 DALL-E tokenizer？"
options:
  - "DALL-E tokenizer 只能输出连续像素，无法用于分类损失"
  - "自然图像 tokenizer 与文档图像域不匹配，容易丢失文字、线条和版面结构"
  - "DALL-E tokenizer 参数量太大，无法部署"
  - "文档域 tokenizer 可以替代 Transformer encoder"
answer: 1
explain: "文档图像的视觉统计与自然图像差异很大，DiT 在 IIT-CDIP 上训练 dVAE，使 MIM 预测目标更贴近文档结构。"
```
