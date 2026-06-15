### SPMamba

```yaml
id: spmamba
name: SPMamba
full_name: "脊柱Mamba (SPMamba)"
year: "2026"
org: "多机构"
paper_url: "https://www.sciencedirect.com/science/article/pii/S1746809425008754"
category: "frontier"
parent: "vmamba"
motivation: "层级特征融合脊柱图像分割"
```

#### 📝 一句话总结

SPMamba 面向脊柱医学图像分割，把 Mamba 的长程建模能力与层级特征融合、通道排序结合，解决脊柱结构细长、相邻组织相似和局部卷积难以捕获全局形态连续性的问题。

#### 🎯 核心要点

- 论文题名：SPMamba: Spinal image segmentation via Mamba framework with hierarchical feature fusion and channel sorting。
- 发表信息：Biomedical Signal Processing and Control, 112, Article 108364, DOI `10.1016/j.bspc.2025.108364`。
- 任务场景：脊柱 CT/MRI/X-ray 等医学影像的语义分割，强调椎体、椎间盘或脊柱相关结构边界。
- Mamba 主干：利用状态空间模型线性复杂度建模长程依赖，适合高分辨率医学图像。
- Hierarchical Feature Fusion：融合浅层边缘纹理与深层结构语义，缓解小结构和边界丢失。
- Channel Sorting：对通道响应进行重排或筛选，让重要解剖结构通道优先参与融合。
- 页面受限说明：ScienceDirect 正文部分不可直接抓取，以下基于公开题名、DOI 元信息、图像资源和医学 Mamba 分割常见设计做保守解读。

#### 🔬 深入细节

![SPMamba 图 1](https://ars.els-cdn.com/content/image/1-s2.0-S1746809425008754-gr1.jpg)
*图：ScienceDirect 公开的 SPMamba 图 1，用于展示论文核心框架。*

##### 算法伪代码

```python
def spmamba_segment(image):
    pyramid = []
    x = patch_embed(image)

    # 编码：局部卷积/patch embedding + Mamba 长程建模
    for stage in encoder_stages:
        x = stage.local_block(x)
        x = stage.mamba_block(x)
        pyramid.append(x)
        x = downsample(x)

    # 层级融合：深层语义逐级回流到浅层边界
    y = pyramid[-1]
    for skip in reversed(pyramid[:-1]):
        skip = channel_sort(skip)     # 强调与脊柱结构相关的通道
        y = upsample(y)
        y = hierarchical_fuse(y, skip)

    return segmentation_head(y)
```

##### 方法解读

脊柱分割比普通器官分割更依赖形态连续性：椎体沿脊柱方向排列，局部边界可能被噪声、病变、低对比或邻近软组织干扰。如果只看局部卷积窗口，模型容易把相邻椎体或背景组织混在一起；如果只看全局，又可能损失精细边缘。

Mamba 的价值在于以线性复杂度处理长序列。将二维或三维医学图像 patch 展平成序列后，选择性状态空间模型可用递推方式传播远距离信息：

$$
h_t=A(x_t)h_{t-1}+B(x_t)x_t,\quad y_t=C(x_t)h_t
$$

这比全局 self-attention 的二次复杂度更适合高分辨率医学图像。对脊柱而言，长程状态能捕获“多个椎体沿轴线连续排列”的结构先验。

Hierarchical Feature Fusion 解决的是多尺度问题。浅层特征包含边缘、骨皮质纹理和局部灰度变化；深层特征包含椎体/椎间盘等结构语义。融合可抽象为：

$$
F_{fuse}^{l}=\phi\left([F_{dec}^{l+1}\uparrow,\;F_{enc}^{l}]\right)
$$

其中 \(\phi\) 可以是卷积、门控或注意力融合。若没有这一步，Mamba 的全局上下文可能不足以恢复小结构的像素边界。

Channel Sorting 的直觉是不同通道对结构分割贡献不均。通过通道重要性度量 \(s_c\) 对通道重排或加权：

$$
\tilde{F}=F_{\operatorname{argsort}(s)}
$$

它让与脊柱解剖结构相关的响应在融合时更突出，减少背景噪声通道干扰。这个思想类似通道注意力，但强调“排序后的层级融合”。

训练通常采用 Dice + Cross Entropy 的组合以处理医学图像类别不均衡：

$$
\mathcal{L}=\mathcal{L}_{ce}+\lambda(1-\operatorname{Dice})
$$

与 U-Net 类 CNN 相比，SPMamba 的优势在全局形态；与纯 Transformer 相比，它的优势在序列长度线性复杂度；与普通 VMamba 分割网络相比，它把层级融合和通道排序针对脊柱细长结构做了适配。

> ⚠️ 注意：由于公开摘要/页面可访问内容有限，本文未写入无法核验的具体 Dice、mIoU 或数据集数值。

#### 🧪 练习题

```yaml
question: "SPMamba 中层级特征融合最直接解决什么问题？"
options:
  - "让模型只输出图像级分类"
  - "把深层全局语义与浅层边界细节结合，改善脊柱结构分割"
  - "删除所有跳连以减少显存"
  - "把医学图像转换成自然语言描述"
answer: 1
explain: "脊柱分割既需要全局连续形态，也需要精细边界；层级融合正是连接这两类信息。"
```
