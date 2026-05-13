### Contextual Attention — 基于上下文注意力的生成式图像修复

```yaml
id: contextual-attention
name: Contextual Attention
full_name: 基于上下文注意力的生成式图像修复 (Generative Image Inpainting with Contextual Attention)
year: 2018
org: UIUC/Adobe
paper_url: https://arxiv.org/abs/1801.07892
category: local_editing
parent: context-encoders
motivation: 远距离特征借用实现精准修复
```

#### 📝 一句话总结

提出 **Contextual Attention** 机制，通过在特征空间中显式匹配前景缺失区域与背景已知区域的 patch 相似度来借用远距离纹理和结构信息，结合 coarse-to-fine 两阶段生成网络，显著提升了图像修复的视觉质量和语义一致性。

#### 🎯 核心要点

- **Coarse-to-fine 两阶段架构**：第一阶段用简单编码器-解码器生成粗略结果，第二阶段在此基础上精细化修复
- **Contextual Attention 层**：将前景 patch 与背景 patch 通过余弦相似度匹配，经 softmax 得到注意力权重，再用背景 patch 加权重建前景（可微分、全卷积）
- **注意力传播（Attention Propagation）**：通过邻域累加鼓励注意力图的空间一致性，使相邻前景像素倾向于关注相邻背景区域
- **双编码器并行结构**：refinement 网络包含两个并行编码器——膨胀卷积分支负责语义幻觉生成，contextual attention 分支负责从背景借用特征，两者合并后送入单一解码器
- **Spatially Discounted 重建损失**：对缺失区域中心像素降低重建权重（\(\gamma^l\)，\(\gamma=0.99\)），允许网络对远离边界的像素有更大生成自由度
- **WGAN-GP 对抗训练**：使用全局判别器和局部判别器（仅关注缺失区域），以 Wasserstein 距离 + 梯度惩罚替代原始 GAN 损失

#### 🔬 深入细节

##### 问题背景与动机

传统图像修复方法（如 PatchMatch）依赖低级特征匹配来搜索和粘贴相似 patch，在纹理合成上效果好但缺乏语义理解。基于深度学习的方法（如 Context Encoders）虽然具备语义理解能力，但使用标准卷积逐层扩散信息，**无法有效利用远距离的已知区域特征**，导致生成结果模糊、纹理不一致。

> 💡 **核心洞察**：Contextual Attention 将传统 patch 匹配的思想引入深度网络的特征空间，让网络能够显式地从远处"借用"最相似的背景特征来填充缺失区域，兼具语义理解和纹理精准复制的优势。

##### 整体架构

![Coarse-to-fine 两阶段网络架构](https://ar5iv.labs.arxiv.org/html/1801.07892/assets/fig/framework.jpg)
*图：两阶段 coarse-to-fine 修复网络。第一阶段为简单编码器-解码器，第二阶段包含两个并行编码器（膨胀卷积分支 + contextual attention 分支）合并到单一解码器。*

网络输入为被 mask 的图像 \(\mathbf{z} = \mathbf{x} \odot \mathbf{m}\) 与 mask \(\mathbf{m}\) 的拼接。第一阶段（coarse network）输出粗略修复结果；第二阶段（refinement network）以粗略结果为输入，通过双编码器并行处理后合并解码，输出最终精细结果。

![Unified Inpainting Network with dual encoders](https://ar5iv.labs.arxiv.org/html/1801.07892/assets/fig/full_model.jpg)
*图：完整的 refinement 网络结构。下方编码器使用膨胀卷积进行语义幻觉生成，上方编码器使用 contextual attention 从背景借用特征。右侧展示了注意力图的颜色编码方式。*

##### Contextual Attention 层

![Contextual Attention 层示意图](https://ar5iv.labs.arxiv.org/html/1801.07892/assets/fig/contextual_attention_layer.jpg)
*图：Contextual Attention 层的三步流程——卷积计算匹配分数 → softmax 归一化得到注意力权重 → 反卷积重建前景。*

Contextual Attention 层的核心流程分为三步：

**Step 1: 提取与匹配。** 从背景区域提取 \(3 \times 3\) patch \(\{b_{x',y'}\}\) 作为卷积核，对前景特征图进行卷积运算，计算每个前景位置 \((x,y)\) 与每个背景位置 \((x',y')\) 之间的余弦相似度：

$$s_{x,y,x',y'} = \left\langle \frac{f_{x,y}}{\|f_{x,y}\|}, \frac{b_{x',y'}}{\|b_{x',y'}\|} \right\rangle$$

**Step 2: Softmax 注意力。** 对相似度在背景维度 \((x',y')\) 上施加带温度参数 \(\lambda\) 的 softmax，得到归一化注意力分数：

$$s^{*}_{x,y,x',y'} = \text{softmax}_{x',y'}(\lambda \cdot s_{x,y,x',y'})$$

其中 \(\lambda\) 为缩放常数（论文中取 \(\lambda = 10\)），较大的 \(\lambda\) 使注意力更集中于最匹配的 patch。

**Step 3: 反卷积重建。** 将背景 patch \(\{b_{x',y'}\}\) 作为反卷积核，以注意力分数为权重，对前景区域进行加权重建。重叠像素取平均值。

> ⚠️ **实现细节**：整个过程完全用卷积和 channel-wise softmax 实现，因此是可微分的、全卷积的，支持任意分辨率输入。

##### 注意力传播（Attention Propagation）

原始的逐像素独立注意力可能导致空间不连贯。论文引入注意力传播机制来鼓励空间一致性：如果前景位置 \((x,y)\) 关注背景位置 \((x',y')\)，那么相邻的前景位置 \((x+1,y)\) 很可能也应关注 \((x'+1,y')\)。

传播通过先左右、再上下的累加实现：

$$\hat{s}_{x,y,x',y'} = \sum_{i \in \{-k, \ldots, k\}} s^{*}_{x+i, y, x'+i, y'}$$

这等价于用单位矩阵作为卷积核进行卷积操作，计算高效。传播后再次归一化，显著提升了修复结果的纹理连贯性。

##### 训练策略

**Spatially Discounted 重建损失：** 对缺失区域的每个像素赋予权重 \(\gamma^l\)（\(\gamma = 0.99\)，\(l\) 为该像素到最近已知像素的距离）。靠近边界的像素权重接近 1（强约束），中心区域权重衰减（弱约束），允许网络对中心区域有更大的生成自由度。

**WGAN-GP 对抗损失：** 使用两个判别器（critic）：
- **全局判别器**：输入完整图像，判断整体一致性
- **局部判别器**：仅输入缺失区域的裁剪，判断局部真实性

采用 Wasserstein 距离替代交叉熵，配合梯度惩罚（gradient penalty）稳定训练。判别器每更新 5 次，生成器更新 1 次。

```python
# 训练伪代码 (Algorithm 1)
while not converged:
    for i in range(5):  # 判别器更新 5 次
        x = sample_batch()                    # 采样真实图像
        m = generate_random_mask(x)           # 生成随机 mask
        z = x * m                             # 构造输入
        x_tilde = z + G(z, m) * (1 - m)      # 生成修复结果
        t = uniform(0, 1)
        x_hat = (1 - t) * x + t * x_tilde    # 插值样本 (GP)
        update_critics(x, x_tilde, x_hat)     # 更新全局+局部判别器

    # 生成器更新 1 次
    x = sample_batch()
    m = generate_random_mask(x)
    z = x * m
    x_tilde = z + G(z, m) * (1 - m)
    L_rec = spatially_discounted_l1(x_tilde, x, m, gamma=0.99)
    L_adv = -D_global(x_tilde) - D_local(crop(x_tilde, m))
    update_generator(L_rec + L_adv)
```

##### 与传统方法的对比

| 特性 | PatchMatch 等传统方法 | Context Encoders | **Contextual Attention (本文)** |
|------|----------------------|------------------|-------------------------------|
| 特征匹配 | 像素级 patch 搜索 | 无显式匹配 | 特征空间 patch 匹配 |
| 语义理解 | ❌ | ✅ | ✅ |
| 远距离借用 | ✅ (但无语义) | ❌ (逐层扩散) | ✅ (注意力机制) |
| 可微分 | ❌ | ✅ | ✅ |
| 后处理需求 | 通常需要 | 需要 blending | 不需要 |

在 Places2 数据集上，本文方法在 \(\ell_1\)、\(\ell_2\)、PSNR 等指标上均优于基线模型，且注意力图的可视化表明网络确实学会了从语义相关的远距离区域借用特征。

#### 🧪 练习题

```yaml
question: "Contextual Attention 层中，注意力传播（Attention Propagation）的核心假设是什么？"
options:
  - "所有前景像素应关注同一个背景位置"
  - "相邻前景像素的注意力偏移量应相近，即空间平移一致性"
  - "注意力权重应均匀分布在所有背景 patch 上"
  - "距离缺失区域边界越远的像素需要越强的注意力"
answer: 1
explain: "注意力传播基于空间一致性假设：前景中相邻像素倾向于关注背景中同样相邻的位置，即 s*_{x,y,x',y'} 与 s*_{x+1,y,x'+1,y'} 应接近。通过邻域累加实现这一约束。"
```