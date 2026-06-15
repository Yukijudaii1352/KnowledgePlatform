### Mask TextSpotter v3: 掩码文本检测器v3 (Mask TextSpotter v3)

```yaml
id: mask_textspotter_v3
name: Mask TextSpotter v3
full_name: "掩码文本检测器v3 (Mask TextSpotter v3)"
year: "2020"
org: Huazhong University of Science and Technology
paper_url: https://arxiv.org/abs/2007.09482
category: e2e_spotting
parent: mask_textspotter
motivation: SPN解决极端长宽比文本
```

#### 📝 一句话总结

Mask TextSpotter v3 用 Segmentation Proposal Network (SPN) 取代 RPN 生成任意形状多边形 proposal，解决了 RPN 锚框和轴对齐矩形在极端长宽比、弯曲文本和密集旋转文本中 proposal 不准的问题。它进一步用 hard RoI masking 去除邻近实例噪声，使检测和识别都更稳健。

#### 🎯 核心要点

- 提出 anchor-free 的 SPN：从融合特征图直接预测文本分割图，再由连通域/轮廓生成多边形 proposal
- 用多边形 proposal 替代 RPN 的轴对齐矩形 proposal，适配弯曲文本、长文本行和密集旋转文本
- 在 RoI 特征上执行 hard RoI masking，将 proposal 外的背景和邻近文本置零，降低识别分支污染
- 主干采用 ResNet-50，后续包含 Fast R-CNN proposal refine、文本实例分割、字符分割和空间注意力识别模块
- 标签生成沿用收缩多边形思想，SPN 分割标签由原始标注向内收缩得到
- 在 Rotated ICDAR2013、MSRA-TD500、Total-Text、ICDAR2015 上验证旋转、长宽比、形状和小文本鲁棒性

#### 🔬 深入细节

##### 核心架构图

![Mask TextSpotter v3 总览](https://ar5iv.labs.arxiv.org/html/2007.09482/assets/x2.png)
*图：Mask TextSpotter v3 用 SPN 生成分割式 proposal，再送入 Fast R-CNN、文本实例分割、字符分割和空间注意力识别模块。*

![RPN 与 SPN 对比](https://ar5iv.labs.arxiv.org/html/2007.09482/assets/x1.png)
*图：RPN 的矩形 RoI 往往包含多个相邻文本实例；SPN 的多边形 proposal 更贴合文本区域，能为识别分支提供更干净的 RoI 特征。*

##### 算法伪代码

```python
# Mask TextSpotter v3 推理核心流程
def inference(image):
    features = resnet50_fpn(image)

    # 1. SPN: anchor-free proposal generation
    fused = unet_like_fusion(features)
    text_score = sigmoid(seg_head(fused))
    binary = text_score > 0.5
    polygon_proposals = contours(connected_components(binary))

    # 2. proposal refinement and masked RoI feature
    results = []
    for poly in polygon_proposals:
        roi_feat = roi_align(features, bounding_rect(poly))
        mask = rasterize_polygon(poly, roi_feat.shape[-2:])
        roi_feat = roi_feat * mask          # hard RoI masking

        refined_box = fast_rcnn_head(roi_feat)
        instance_mask = text_mask_head(roi_feat)
        char_logits = char_seg_head(roi_feat)
        text = spatial_attention_recognizer(roi_feat, char_logits)
        results.append((instance_mask, refined_box, text))
    return results
```

##### 方法详解

**1. 动机与背景**

Mask TextSpotter v1/v2 已经证明了基于 Mask R-CNN 的端到端任意形状文本 spotting 可行，但其 proposal 仍依赖 RPN。RPN 的两个假设在文本中很脆弱：一是 anchor 需要预设尺度和长宽比，难覆盖极长文本行；二是 proposal 是轴对齐矩形，遇到弯曲或旋转文本时会包含大量背景和邻近文本。

这些问题在端到端 spotting 中会被放大。检测阶段 proposal 不准会导致实例分割边界变差；识别阶段 RoI 特征中混入相邻文本，会让字符序列出现插入、替换或漏识别。Mask TextSpotter v3 因此把 proposal 生成改成分割式。

**2. SPN：从分割图生成 proposal**

SPN 采用 U-Net 风格的多尺度融合结构，生成大小为 \(1 \times H \times W\) 的文本分割概率图 \(S\)。与 FPN-RPN 在多个尺度上放置 anchor 不同，SPN 在融合特征图上直接预测文本区域：

$$
S = \sigma(f_{\text{seg}}(F)), \quad F \in \mathbb{R}^{C \times H/4 \times W/4}
$$

二值化后通过连通域和轮廓提取即可得到多边形 proposal。多边形 proposal 的几何形状来自分割区域本身，因此天然支持长文本、弯曲文本和不规则文本。

**3. SPN 标签生成**

为了避免相邻文本标注在训练时粘连，SPN 的分割标签由原始多边形向内收缩得到。收缩距离为：

$$
D = \frac{A(1-r^2)}{L}
$$

其中 \(A\) 是文本多边形面积，\(L\) 是周长，论文中 \(r\) 经验设为 0.4。这个策略与 PSENet/DBNet 类似：用更保守的核心区域监督文本存在性，减少密集文本的边界歧义。

**4. Hard RoI Masking**

SPN 的 proposal 是多边形，但 RoIAlign 通常仍在其外接矩形中采样。为防止外接矩形内的背景和邻近文本影响后续模块，论文在 RoI 特征上乘以多边形掩码：

$$
F_{\text{masked}} = F_{\text{roi}} \odot M
$$

其中 \(M\) 是将 proposal 多边形栅格化后的二值 mask。消融中 direct-hard masking 最有效，因为它直接、严格地把 proposal 外特征置零，而不是间接或软权重地削弱噪声。

**5. 检测与识别流程**

SPN 产生候选多边形后，Fast R-CNN 模块进一步 refine proposal；文本实例分割模块给出更精确的检测区域；字符分割模块和空间注意力识别模块负责识别。相比原始 Mask TextSpotter，v3 的核心变化不是识别器本身，而是 proposal 质量和 RoI 特征纯净度。

> 💡 关键：SPN 不只是更换 proposal 生成器。它让 proposal 的表示从“矩形框”变为“贴合文本实例的多边形区域”，再通过 hard mask 把这个几何优势传递给识别分支。

**6. 与 RPN 方案的区别**

RPN 对普通目标检测有效，因为许多目标可由矩形近似；但文本行常常又细又长、方向变化大、实例密集。SPN 避免了 anchor 长宽比设计问题，也避免了矩形 RoI 同时覆盖多个文本行的问题，因此在旋转鲁棒性、长宽比鲁棒性和形状鲁棒性上都优于 v2。

#### 🧪 练习题

```yaml
question: "Mask TextSpotter v3 中 hard RoI masking 的主要目的是什么？"
options:
  - "把多边形 proposal 转换成固定长度字符序列"
  - "删除 RoI 中 proposal 外的背景和邻近文本特征，降低检测识别噪声"
  - "用 softmax 归一化 SPN 的分割概率"
  - "替代 Fast R-CNN 进行边界框回归"
answer: 1
explain: "SPN 生成的是多边形 proposal，但 RoI 特征仍可能来自外接矩形。hard RoI masking 用多边形 mask 过滤 RoI 特征，使识别分支更少受到邻近文本污染。"
```
