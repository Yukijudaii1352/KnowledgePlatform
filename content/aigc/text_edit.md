---
domain: aigc
topic_id: text_edit
topic_name: 图像编辑技术演进图谱
page_icon: 🎨
page_title: 图像编辑技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 梳理从GAN时代到Diffusion时代的图像编辑算法演进脉络，涵盖局部重绘、风格迁移、可控生成及2026年最新的DiT架构编辑与精准控制技术。
hero_pills:
- 🏷️ Image Editing · Diffusion Models · Controllable Generation
count_pill: '{count} 个算法'
categories:
  local_editing:
    label: 局部编辑与修复
    color: '#2ecc71'
  style_transfer:
    label: 风格迁移
    color: '#3498db'
  controllable_gen:
    label: 可控生成
    color: '#e67e22'
  identity_preserve:
    label: 身份/保真度保持
    color: '#9b59b6'
  instruction_edit:
    label: 指令驱动编辑
    color: '#e74c3c'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: context-encoders
  x: 100
  y: 100
  category: local_editing
- id: contextual-attention
  x: 300
  y: 100
  category: local_editing
- id: deep-image-prior
  x: 300
  y: 150
  category: local_editing
- id: blended-diffusion
  x: 550
  y: 100
  category: local_editing
- id: diffedit
  x: 550
  y: 150
  category: local_editing
- id: hifi-inpaint
  x: 950
  y: 100
  category: local_editing
- id: neural-style-transfer
  x: 100
  y: 250
  category: style_transfer
- id: fast-style-transfer
  x: 100
  y: 300
  category: style_transfer
- id: adain
  x: 200
  y: 250
  category: style_transfer
- id: wct
  x: 200
  y: 300
  category: style_transfer
- id: pix2pix
  x: 200
  y: 400
  category: controllable_gen
- id: cyclegan
  x: 200
  y: 450
  category: controllable_gen
- id: stylegan
  x: 400
  y: 400
  category: controllable_gen
- id: image2stylegan
  x: 400
  y: 450
  category: controllable_gen
- id: controlnet
  x: 650
  y: 400
  category: controllable_gen
- id: uni-controlnet
  x: 650
  y: 450
  category: controllable_gen
- id: t2i-adapter
  x: 750
  y: 400
  category: controllable_gen
- id: dc-controlnet
  x: 950
  y: 400
  category: controllable_gen
- id: relactrl
  x: 950
  y: 450
  category: controllable_gen
- id: pi-light
  x: 950
  y: 500
  category: controllable_gen
- id: ip-adapter
  x: 650
  y: 600
  category: identity_preserve
- id: photomaker
  x: 750
  y: 600
  category: identity_preserve
- id: instantid
  x: 750
  y: 650
  category: identity_preserve
- id: consistentid
  x: 950
  y: 650
  category: identity_preserve
- id: emojidiff
  x: 950
  y: 600
  category: identity_preserve
- id: pixperfect
  x: 950
  y: 700
  category: identity_preserve
- id: prompt-to-prompt
  x: 550
  y: 800
  category: instruction_edit
- id: null-text-inversion
  x: 650
  y: 800
  category: instruction_edit
- id: instructpix2pix
  x: 650
  y: 850
  category: instruction_edit
- id: ledits
  x: 650
  y: 900
  category: instruction_edit
- id: icedit
  x: 850
  y: 850
  category: instruction_edit
- id: ieap
  x: 850
  y: 900
  category: instruction_edit
- id: edit2perceive
  x: 950
  y: 850
  category: instruction_edit
- id: if-edit
  x: 950
  y: 900
  category: instruction_edit
- id: geometric-editing
  x: 950
  y: 950
  category: instruction_edit
- id: chronoedit
  x: 950
  y: 1000
  category: instruction_edit
- id: draw-in-mind
  x: 950
  y: 1050
  category: instruction_edit
- id: poem
  x: 950
  y: 1100
  category: instruction_edit
- id: editreward
  x: 950
  y: 1150
  category: instruction_edit
edges:
- from: context-encoders
  to: contextual-attention
  label: 远距离借用
- from: blended-diffusion
  to: diffedit
  label: 自动掩码
- from: neural-style-transfer
  to: fast-style-transfer
  label: 实时化
- from: fast-style-transfer
  to: adain
  label: 任意风格
- from: adain
  to: wct
  label: 白化着色
- from: pix2pix
  to: cyclegan
  label: 无配对
- from: stylegan
  to: image2stylegan
  label: GAN反演
- from: controlnet
  to: uni-controlnet
  label: 多条件统一
- from: controlnet
  to: t2i-adapter
  label: 轻量适配
- from: controlnet
  to: dc-controlnet
  label: 解耦控制
- from: controlnet
  to: relactrl
  label: 相关性引导
- from: controlnet
  to: ip-adapter
  label: 图像提示
- from: ip-adapter
  to: photomaker
  label: 堆叠ID
- from: ip-adapter
  to: instantid
  label: 强身份
- from: instantid
  to: consistentid
  label: 多模态
- from: photomaker
  to: emojidiff
  label: 表情控制
- from: prompt-to-prompt
  to: null-text-inversion
  label: 精确反演
- from: prompt-to-prompt
  to: instructpix2pix
  label: 端到端
- from: null-text-inversion
  to: ledits
  label: 语义引导
- from: instructpix2pix
  to: icedit
  label: 上下文学习
- from: icedit
  to: ieap
  label: 程序化
- from: icedit
  to: edit2perceive
  label: 感知适配
- from: icedit
  to: geometric-editing
  label: 几何变换
milestones:
- id: neural-style-transfer
  label: 神经风格迁移开创
  desc: 首次证明深度特征可用于艺术风格化，开创神经风格迁移研究方向
- id: controlnet
  label: 可控生成标准范式
  desc: 实现精确空间条件控制，成为扩散模型可控生成的标准范式
- id: icedit
  label: DiT时代高效编辑
  desc: 上下文学习突破数据效率瓶颈，0.1%数据达SOTA，引领DiT编辑新范式
```

## 核心算法

### Context Encoders

```yaml
id: context-encoders
num: 1
name: Context Encoders
full_name: 上下文编码器 (Context Encoders)
year: '2016'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/1604.07379
project_url: ''
category: local_editing
motivation: 编码器+对抗损失实现语义级修复
```

#### 📝 一句话总结
Context Encoders 的核心目标是：编码器+对抗损失实现语义级修复。

#### 🎯 核心要点
- 核心动机：编码器+对抗损失实现语义级修复
- 代表机构：UC Berkeley

#### 🔬 深入细节
编码器+对抗损失实现语义级修复


### Contextual Attention

```yaml
id: contextual-attention
num: 2
name: Contextual Attention
full_name: 上下文注意力修复 (Contextual Attention)
year: '2018'
org: UIUC/Adobe
parent: context-encoders
paper_url: https://arxiv.org/abs/1801.07892
project_url: ''
category: local_editing
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

### Deep Image Prior

```yaml
id: deep-image-prior
num: 3
name: Deep Image Prior
full_name: 深度图像先验 (Deep Image Prior)
year: '2018'
org: Skoltech
parent: —
paper_url: https://arxiv.org/abs/1711.10925
project_url: ''
category: local_editing
motivation: CNN结构本身作为图像恢复先验
```

#### 📝 一句话总结
Deep Image Prior 揭示了卷积神经网络的**结构本身**就蕴含了强大的图像先验——通过将随机初始化的 CNN 拟合到单张退化图像，网络会优先学习自然图像结构而抵抗噪声，从而在**无需任何外部训练数据**的情况下实现去噪、超分辨率、修复等多种图像恢复任务。

#### 🎯 核心要点
- **核心发现**：CNN 的 encoder-decoder（hourglass）架构对自然图像具有隐式先验偏好，对噪声具有高阻抗、对信号具有低阻抗
- **无需训练数据**：仅使用单张退化图像，通过优化随机初始化网络参数来恢复图像，不依赖任何外部数据集
- **统一框架**：同一方法适用于去噪、超分辨率、修复（inpainting）、JPEG 去伪影、flash-no flash 重建等多种任务
- **参数化重构**：将图像恢复问题转化为 \(\theta^* = \arg\min_\theta E(f_\theta(z); x_0)\)，用网络参数空间替代像素空间优化
- **早停策略**：利用网络先学信号后学噪声的特性，通过限制迭代次数实现正则化
- **架构选择**：采用带 skip connection 的 U-Net/hourglass 架构，bilinear 上采样，LeakyReLU 激活，ADAM 优化器
- **噪声正则化**：每次迭代对输入 \(z\) 添加微小扰动以增强鲁棒性

#### 🔬 深入细节
##### 核心框架图

![Deep Image Prior 核心流程](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/cropped_pipeline3.jpg)
*图 1：Deep Image Prior 方法流程。将固定随机输入 z 通过随机初始化的 CNN \(f_\theta\) 生成图像，通过最小化与退化图像 \(x_0\) 的数据项来优化参数 \(\theta\)。*

![噪声阻抗直觉](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/cropped_intuition.jpg)
*图 3：Deep Image Prior 的直觉解释。左：标准正则化在像素空间中约束解集；右：Deep Image Prior 通过网络参数化隐式约束解集，限制迭代次数等价于投影到网络可快速表达的图像子集。*

![学习曲线对比](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/bill_curve_t.jpg)
*图 4：不同类型图像的拟合速度对比。自然图像（绿线）拟合最快，噪声图像（红线）拟合最慢——网络结构对自然图像具有天然偏好。*

##### 算法伪代码

```python
# Deep Image Prior 核心算法
import torch

def deep_image_prior(x0, task_loss_fn, net_arch='unet', 
                     num_iter=3000, lr=0.01, sigma_p=1/30):
    """
    x0: 退化图像 (观测)
    task_loss_fn: 任务相关的数据项 E(x; x0)
      - 去噪:   ||x - x0||^2
      - 超分:   ||downsample(x) - x0||^2
      - 修复:   ||(x - x0) ⊙ mask||^2
    net_arch: 网络架构 (encoder-decoder with skip connections)
    num_iter: 最大迭代次数 (早停正则化)
    sigma_p: 输入噪声扰动标准差
    """
    # 1. 随机初始化
    z = torch.rand(1, C, H, W) * 0.1       # 固定随机输入
    net = build_network(net_arch)            # 随机初始化参数 θ
    optimizer = torch.optim.Adam(net.parameters(), lr=lr)
    
    best_loss = float('inf')
    best_out = None
    
    # 2. 迭代优化
    for i in range(num_iter):
        # 输入噪声正则化
        z_perturbed = z + torch.randn_like(z) * sigma_p
        
        # 前向传播: x = f_θ(z)
        x = net(z_perturbed)
        
        # 计算任务损失: E(f_θ(z); x0)
        loss = task_loss_fn(x, x0)
        
        # 反向传播优化 θ
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        
        # 跟踪最优 (防止destabilization)
        if loss.item() < best_loss:
            best_loss = loss.item()
            best_out = x.detach()
    
    return best_out  # 恢复后的图像
```

##### 方法深入解析

**1. 动机与背景：为什么 CNN 结构本身就是先验？**

传统图像恢复方法将问题建模为：

$$x^* = \arg\min_x E(x; x_0) + R(x)$$

其中 \(E(x; x_0)\) 是数据保真项，\(R(x)\) 是显式先验（如 Total Variation、BM3D 等）。近年来基于深度学习的方法通过在大规模数据集上训练 CNN 来隐式学习先验，取得了巨大成功。

> 💡 **关键洞察**：Deep Image Prior 的核心发现是——即使**完全不使用训练数据**，CNN 的网络结构本身就对自然图像有强烈偏好。这意味着深度学习在图像恢复中的成功，很大程度上来自网络架构的归纳偏置（inductive bias），而非仅仅是从数据中学到的统计规律。

**2. 核心机制：参数化重构**

Deep Image Prior 将图像恢复问题重新参数化。不再直接优化像素 \(x\)，而是用神经网络 \(f_\theta\) 将固定随机编码 \(z\) 映射为图像：

$$\theta^* = \arg\min_\theta E(f_\theta(z); x_0)$$

$$x^* = f_{\theta^*}(z)$$

这里 \(z\) 是固定的随机张量（从 \(U(0, 0.1)\) 采样），\(\theta\) 是网络参数。关键在于：**网络结构限制了 \(f_\theta(z)\) 可以表达的图像集合**，这个集合天然偏向自然图像。

> ⚠️ **注意**：理论上，给定足够的迭代次数，网络最终能拟合任何图像（包括纯噪声）。但自然图像的拟合速度远快于噪声——这就是"噪声阻抗"特性。

**3. 噪声阻抗与早停正则化**

论文通过实验（图 4）展示了关键现象：
- 拟合自然图像：收敛极快（~几百次迭代）
- 拟合自然图像+噪声：先快速学到信号，再缓慢拟合噪声
- 拟合随机排列像素/纯噪声：收敛极慢

这意味着在优化过程中存在一个"甜蜜点"——信号已被充分学习但噪声尚未被拟合。通过**早停**（限制迭代次数），可以自然地实现去噪效果，无需显式正则化项。

**4. 网络架构：Hourglass + Skip Connections**

![网络架构](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/x1.png)
*图 21：实验中使用的 encoder-decoder（hourglass）架构，带有 skip connections（黄色箭头）。*

论文采用 U-Net 风格的 encoder-decoder 架构：
- **Encoder（下采样路径）**：使用带步长的卷积进行下采样，逐层提取多尺度特征
- **Decoder（上采样路径）**：使用双线性插值上采样 + 卷积恢复空间分辨率
- **Skip Connections**：在对应尺度的 encoder 和 decoder 之间建立跳跃连接，每个 skip 包含一个卷积层
- **激活函数**：LeakyReLU
- **填充方式**：反射填充（reflection padding）

> 💡 **为什么 hourglass + skip 有效？** 论文通过"采样"实验（图 5）揭示：不同深度的 hourglass 网络生成具有不同尺度自相似结构的图像。Skip connections 使网络能同时捕获多尺度结构——这正是自然图像的典型特征。卷积操作在整个视觉域上共享滤波器，天然施加了平移不变性和局部自相似性。

![不同架构的随机采样](https://ar5iv.labs.arxiv.org/html/1711.10925/assets/skip_0_bilinear.jpg)
*图 5d：带 skip connections 的 hourglass 网络随机采样结果，展示了多尺度自相似结构。*

**5. 各任务的数据项设计**

Deep Image Prior 的通用性体现在：只需更换数据项 \(E(x; x_0)\)，同一框架即可应用于不同任务：

| 任务 | 数据项 \(E(x; x_0)\) | 说明 |
|------|----------------------|------|
| 去噪 | \(\|x - x_0\|^2\) | 直接拟合含噪图像，依赖早停 |
| 超分辨率 | \(\|d(x) - x_0\|^2\) | \(d(\cdot)\) 为下采样算子 |
| 修复 | \(\|(x - x_0) \odot m\|^2\) | \(m\) 为已知区域的二值掩码 |
| JPEG 去伪影 | \(\|x - x_0\|^2\) | 同去噪，利用早停去除块效应 |

**6. 与传统方法及学习方法的对比**

| 特性 | 传统先验 (TV/BM3D) | 学习方法 (DnCNN等) | Deep Image Prior |
|------|-------------------|-------------------|-----------------|
| 需要训练数据 | ❌ | ✅ 大量 | ❌ |
| 先验来源 | 手工设计 | 数据驱动 | 网络结构 |
| 通用性 | 任务特定 | 任务特定 | 多任务统一 |
| 推理速度 | 快 | 极快 | 慢（需迭代优化） |
| 恢复质量 | 中等 | 最优 | 接近学习方法 |

在超分辨率任务上，Deep Image Prior 在 Set14 数据集 4× 上采样中取得平均 27.00 dB PSNR，优于 Bicubic（26.05 dB）和 TV prior（26.42 dB），接近需要大量训练数据的 LapSRN（28.13 dB）。

**7. 技术细节**

- **输入 \(z\)**：32 通道随机噪声 \(z \sim U(0, 0.1)\)；修复任务可用 meshgrid 输入增强平滑性
- **优化器**：ADAM，学习率 0.01
- **输入扰动**：每次迭代对 \(z\) 添加 \(\sigma_p = 1/30\) 的高斯噪声
- **防崩溃机制**：监控损失，若相邻迭代损失差异过大则回退参数
- **典型超参数**：\(n_u = n_d = [128, 128, 128, 128, 128]\)，\(n_s = [4, 4, 4, 4, 4]\)，\(k_u = k_d = [3, 3, 3, 3, 3]\)，\(k_s = [1, 1, 1, 1, 1]\)

#### 🧪 练习题
```yaml
question: "Deep Image Prior 方法能够实现图像去噪的根本原因是什么？"
options:
  - "网络在大规模图像数据集上预训练后学到了去噪能力"
  - "CNN 的卷积结构对自然图像有隐式偏好，拟合噪声的速度远慢于拟合信号"
  - "使用了特殊设计的去噪损失函数来抑制噪声"
  - "通过对抗训练使网络学会区分信号和噪声"
answer: 1
explain: "Deep Image Prior 的核心发现是 CNN 架构本身对自然图像具有结构性偏好（低阻抗），而对噪声具有高阻抗。因此在优化过程中，网络会优先拟合图像的自然结构，通过早停即可在噪声被拟合之前获得去噪结果，整个过程无需任何训练数据。"
```

### Blended Diffusion

```yaml
id: blended-diffusion
num: 4
name: Blended Diffusion
full_name: 混合扩散 (Blended Diffusion)
year: '2022'
org: Hebrew Univ
parent: —
paper_url: https://arxiv.org/abs/2111.14818
project_url: ''
category: local_editing
motivation: 潜在空间掩码引导扩散混合
```

#### 📝 一句话总结
Blended Diffusion 提出在 DDPM 扩散采样的每一步中，将 CLIP 引导生成的前景区域与原图加噪的背景区域按 mask 进行混合，利用扩散模型的去噪投影自然恢复前景-背景一致性，实现了**无需训练、背景完美保留**的文本驱动局部图像编辑。

#### 🎯 核心要点
- **CLIP + DDPM 联合引导**：利用 CLIP 的文本-图像对齐能力提供语义方向，利用预训练 DDPM 的强大图像先验保证生成质量，二者结合实现文本驱动的图像编辑
- **逐步混合（Blending）机制**：在扩散过程的每个时间步 $t$，将 CLIP 引导的前景 latent 与原图加噪后的背景 latent 按 mask 混合，再由 DDPM 去噪投影到自然图像流形上，自动恢复前景-背景的一致性
- **背景完美保留**：通过在噪声空间中直接替换背景区域为原图的加噪版本，确保背景在编辑过程中完全不受影响
- **扩展增强（Extending Augmentations）**：对中间估计结果施加多个投影变换后再计算 CLIP 梯度并取平均，有效防止对抗样本现象，确保编辑产生真实的高层语义变化
- **零样本、无需训练**：直接使用预训练的 CLIP 和 DDPM 模型，无需任何微调或额外训练，即可在真实图像上进行编辑
- **结果排序机制**：利用 CLIP 对多个生成结果进行自动排序，选出最佳编辑结果

#### 🔬 深入细节
##### 核心架构示意图

![Blended Diffusion 方法总览 — 文本驱动的前景/背景编辑示例](https://ar5iv.labs.arxiv.org/html/2111.14818/assets/x1.png)
*图：Blended Diffusion 方法概览。上排为前景编辑（替换/添加对象），下排为背景编辑（改变场景）。用户提供原图、mask 和文本描述，方法自动在 mask 区域生成与文本匹配且与背景自然融合的内容*

![Blended Diffusion 流水线详细示意](https://ar5iv.labs.arxiv.org/html/2111.14818/assets/x2.png)
*图：Blended Diffusion 核心流水线。每个扩散时间步中：(1) 用 CLIP 引导生成前景区域；(2) 对原图加噪得到背景；(3) 按 mask 混合前景和背景；(4) DDPM 去噪投影恢复一致性*

##### 算法伪代码

```python
# Blended Diffusion 核心算法伪代码
# 输入: x_orig (原图), mask m, text_desc (文本描述), DDPM模型, CLIP模型
# 输出: 编辑后的图像

# === Algorithm 1: Local CLIP-Guided Diffusion (基线方法) ===
def local_clip_guided_diffusion(text_desc, mask, x_orig, T, lambda_):
    """CLIP引导的局部扩散生成"""
    x_T = sample_noise()  # 从N(0,I)采样
    for t in range(T, 0, -1):
        # 1. 估计 x_0（利用DDPM的去噪能力）
        x0_hat = estimate_x0(x_t, t)  # Eq.5: x̂₀ = (x_t - √(1-ᾱ_t)·ε_θ(x_t,t)) / √ᾱ_t
        
        # 2. 计算CLIP引导梯度（带扩展增强）
        grad = 0
        for aug in augmentations:  # 多个投影变换
            x0_aug = aug(x0_hat)
            # D_CLIP: 编辑区域的CLIP方向损失 (Eq.6)
            clip_loss = D_CLIP(x0_aug, text_desc, mask)
            # D_bg: 背景保留损失 (Eq.7)
            bg_loss = D_bg(x0_aug, x_orig, mask)
            grad += gradient(clip_loss + bg_loss, x_t)
        grad = grad / len(augmentations)
        
        # 3. DDPM采样步 + CLIP梯度引导
        x_{t-1} = ddpm_sample_step(x_t, t) - lambda_ * grad
    return x_0

# === Algorithm 2: Blended Diffusion (核心方法) ===
def blended_diffusion(text_desc, mask, x_orig, T, lambda_):
    """混合扩散 — 逐步混合前景与背景"""
    x_T = sample_noise()
    for t in range(T, 0, -1):
        # Step 1: CLIP引导的前景生成（同Algorithm 1）
        x0_hat = estimate_x0(x_t, t)
        grad = compute_augmented_clip_grad(x0_hat, text_desc, mask, x_orig)
        x_fg = ddpm_sample_step(x_t, t) - lambda_ * grad  # 前景latent
        
        # Step 2: 原图加噪得到背景latent
        x_bg = q_sample(x_orig, t-1)  # 对原图加噪到t-1步: √ᾱ_{t-1}·x_orig + √(1-ᾱ_{t-1})·ε
        
        # Step 3: 按mask混合前景和背景 ← 核心操作!
        x_{t-1} = mask * x_fg + (1 - mask) * x_bg
        
        # 扩散模型的下一步去噪会自然地"修复"混合边界的不一致
    return x_0
```

##### 动机与背景

现有的文本驱动图像编辑方法面临几个关键挑战：

1. **GAN-based 方法**（如 PaintByWord）：仅能编辑 GAN 生成的图像，无法处理真实照片；且编辑时常导致全局变化，无法精确保留背景
2. **VQGAN-CLIP**：虽然可以处理真实图像，但缺乏局部编辑能力，且生成质量受限于 VQGAN 的重建能力
3. **直接 CLIP 优化**：容易产生对抗样本——像素级别的微小扰动可以降低 CLIP 损失，但不会产生人类可感知的语义变化

> 💡 **核心洞察**：扩散模型（DDPM）具有一个关键特性——在去噪过程中，它会将任何输入"投影"到自然图像流形上。因此，即使在噪声空间中粗暴地将两个不同来源的 latent 按 mask 拼接，DDPM 的后续去噪步骤也能自然地恢复拼接边界的一致性，就像图像修复（inpainting）一样。

##### 核心机制详解

**1. 从 DDPM 去噪中估计 $\hat{x}_0$**

在扩散过程的每个时间步 $t$，利用训练好的噪声预测网络 $\epsilon_\theta$ 估计原始图像：

$$\hat{x}_0 = \frac{x_t - \sqrt{1 - \bar{\alpha}_t} \cdot \epsilon_\theta(x_t, t)}{\sqrt{\bar{\alpha}_t}}$$

这个估计值虽然在早期步骤中较为粗糙，但足以用于计算 CLIP 梯度方向。

**2. 局部 CLIP 方向损失（$\mathcal{D}_{CLIP}$）**

为了使编辑区域匹配目标文本描述，定义 CLIP 损失：

$$\mathcal{D}_{CLIP}(\hat{x}_0, t_{desc}, m) = D_{cos}\big(\text{CLIP}_{img}(\hat{x}_0 \odot m),\ \text{CLIP}_{txt}(t_{desc})\big)$$

其中 $D_{cos}$ 为余弦距离，$m$ 为编辑区域的 mask。仅对 mask 区域计算 CLIP 相似度，确保编辑的局部性。

**3. 背景保留损失（$\mathcal{D}_{bg}$）**

$$\mathcal{D}_{bg}(\hat{x}_0, x_{orig}, m) = \|\hat{x}_0 \odot (1 - m) - x_{orig} \odot (1 - m)\|_2^2$$

直接约束非编辑区域与原图一致。

> ⚠️ **关键发现**：仅靠 $\mathcal{D}_{bg}$ 损失无法完美保留背景（Algorithm 1 的局限），因为梯度更新是全局的。Blended Diffusion 通过在噪声空间中直接替换背景来彻底解决这个问题。

**4. 逐步混合（Blending）— 核心创新**

在每个时间步 $t$，执行以下操作：

$$x_{t-1} = m \odot x_{t-1}^{fg} + (1 - m) \odot x_{t-1}^{bg}$$

其中：
- $x_{t-1}^{fg}$：CLIP 引导的 DDPM 采样结果（前景）
- $x_{t-1}^{bg} = \sqrt{\bar{\alpha}_{t-1}} \cdot x_{orig} + \sqrt{1 - \bar{\alpha}_{t-1}} \cdot \epsilon$：原图加噪到 $t-1$ 步（背景）

> 💡 **为什么这样做有效？** 在高噪声水平（大 $t$）时，前景和背景的 latent 都接近纯噪声，混合边界几乎不可见。随着 $t$ 减小，DDPM 的去噪过程会逐步"修复"混合边界，自然地使前景与背景融合。这本质上利用了扩散模型的 inpainting 能力。

**5. 扩展增强（Extending Augmentations）**

为防止 CLIP 引导产生对抗样本，对每步的 $\hat{x}_0$ 施加多个随机投影变换（perspective transforms），分别计算 CLIP 梯度后取平均：

$$\nabla = \frac{1}{N} \sum_{i=1}^{N} \nabla_{x_t} \mathcal{D}_{CLIP}(\text{Aug}_i(\hat{x}_0), t_{desc}, m)$$

> 💡 **直觉理解**：要同时"欺骗"多个不同视角下的 CLIP 评估，仅靠像素级对抗扰动是不够的，必须产生真正的高层语义变化。

**6. 结果排序**

由于扩散过程的随机性，同一输入可生成多个不同结果。利用 CLIP 对编辑区域与文本描述的匹配度进行自动排序，选出最佳结果。

##### 实验结果与对比

| 方法 | 真实感 ↑ | 背景保留 ↑ | 文本匹配 ↑ |
|------|---------|-----------|-----------|
| PaintByWord | 3.31±1.38 | 3.25±1.33 | 3.14±1.31 |
| Local CLIP GD | 3.50±1.19 | 3.11±1.24 | 3.86±1.32 |
| PaintByWord++ | 1.94±1.36 | 3.37±1.30 | 3.01±1.38 |
| **Blended Diffusion (Ours)** | **3.93±1.08** | **4.73±0.61** | **4.63±0.77** |

*表：用户研究结果（Likert 1-5 量表）。Blended Diffusion 在真实感、背景保留和文本匹配三个维度上均显著优于所有基线方法*

##### 局限性

- **推理速度慢**：由于 DDPM 的序列化去噪特性，单张图像生成约需 30 秒，加上多次采样排序，不适合实时应用
- **排序不完美**：排序仅考虑编辑区域与文本的匹配度，缺乏对全局上下文一致性的评估
- **继承 CLIP 偏差**：CLIP 的 typographic attack 弱点会传递到生成结果中（如生成文字标签而非对应物体）

##### 与相关方法的关键区别

| 特性 | PaintByWord | VQGAN-CLIP | Blended Diffusion |
|------|------------|------------|-------------------|
| 输入图像 | 仅 GAN 生成图 | 真实图像 | **真实图像** |
| 背景保留 | 不完美 | 不完美 | **完美保留** |
| 生成质量 | 受限于 GAN | 受限于 VQGAN | **DDPM 高质量先验** |
| 局部编辑 | 支持 | 有限 | **精确 mask 控制** |
| 额外训练 | 需要 | 不需要 | **不需要** |
| 对抗样本 | 进化策略缓解 | 存在 | **增强策略有效缓解** |

> 💡 **Blended Diffusion 的核心贡献**：首次将 CLIP 的语义理解能力与 DDPM 的高质量图像先验相结合，通过巧妙的逐步混合机制实现了背景完美保留的局部文本驱动编辑，为后续的扩散模型编辑方法（如 SDEdit、DiffEdit 等）奠定了重要基础。

#### 🧪 练习题
```yaml
question: "Blended Diffusion 中，为什么在扩散过程的每一步将前景和背景 latent 按 mask 混合后，不会产生明显的拼接痕迹？"
options:
  - "因为 mask 的边缘经过了高斯模糊平滑处理"
  - "因为 CLIP 损失会自动优化混合边界的一致性"
  - "因为在噪声空间中混合后，DDPM 的后续去噪步骤会自然地将结果投影到自然图像流形上，修复边界不一致"
  - "因为前景和背景使用了相同的随机噪声种子"
answer: 2
explain: "Blended Diffusion 的核心洞察在于利用扩散模型的去噪投影特性。在高噪声水平时，前景和背景 latent 都接近纯噪声，混合几乎无缝；随着去噪进行，DDPM 会将混合结果投影到自然图像流形上，自动修复拼接边界的不一致，类似于 inpainting 的效果。这不依赖于 mask 模糊、CLIP 优化或噪声种子。"
```

### DiffEdit

```yaml
id: diffedit
num: 5
name: DiffEdit
full_name: 差分编辑 (DiffEdit)
year: '2022'
org: Meta
parent: blended-diffusion
paper_url: https://arxiv.org/abs/2210.11427
project_url: ''
category: local_editing
motivation: 自动掩码生成实现语义编辑
```

#### 📝 一句话总结
DiffEdit 提出了一种无需手动提供掩码的文本引导语义图像编辑方法，通过对比不同文本条件下扩散模型的噪声估计差异自动推断编辑区域，并结合 DDIM 编码与掩码引导解码，在仅修改目标区域的同时保持背景不变。

#### 🎯 核心要点
- **自动掩码生成**：通过对比查询文本与参考文本条件下的噪声估计差异，自动推断需要编辑的图像区域，无需用户手动标注
- **DDIM 编码保真**：使用 DDIM 确定性编码（而非 SDEdit 的随机加噪）将原始图像映射到隐空间，理论上可完美重建原图，最大程度保留非编辑区域信息
- **掩码引导解码**：在 DDIM 解码过程中，每一步将掩码外区域替换为 DDIM 编码的对应时间步隐变量，确保背景像素精确还原
- **编码比率 \(r\) 控制编辑强度**：较大的 \(r\) 允许更强的编辑以匹配查询文本，较小的 \(r\) 则更贴近原图
- **理论优势**：从 ODE 视角证明 DDIM 编码相比 SDEdit 的随机加噪方式，在条件解码后与原图的偏差更小
- **在 ImageNet 上验证**：在 ImageNet 数据集上进行定量评估，使用 FID 和 CLIP 相似度衡量编辑质量

#### 🔬 深入细节
![DiffEdit 核心三步流程图](https://ar5iv.labs.arxiv.org/html/2210.11427/assets/x2.png)
*图：DiffEdit 的三个步骤示意。Step 1：自动推断编辑掩码；Step 2：DDIM 编码输入图像；Step 3：掩码引导的条件 DDIM 解码。*

##### 动机与背景

文本引导的图像编辑是一个重要任务：给定一张输入图像和一段描述目标编辑的文本（如将"马"变为"斑马"），模型需要修改图像中的相关区域，同时保持其余部分不变。

已有方法存在两个关键问题：
1. **需要手动掩码**：如 Blended Diffusion 等方法要求用户手动指定编辑区域，限制了自动化程度
2. **背景保真度差**：如 SDEdit 通过向原图添加随机噪声再去噪来实现编辑，但随机噪声会导致非编辑区域也发生不必要的变化

DiffEdit 同时解决了这两个问题：自动推断掩码，并通过 DDIM 编码保证背景精确还原。

##### 核心算法伪代码

```python
# DiffEdit 三步编辑流程
def diffedit(x_0, query_text, ref_text, model, r, n=10):
    """
    x_0: 输入图像
    query_text: 目标编辑文本 (如 "zebra")
    ref_text: 参考文本 (如 "horse") 或空文本
    r: 编码比率，控制编辑强度
    n: 掩码估计的平均次数
    """
    # === Step 1: 自动推断编辑掩码 ===
    diffs = []
    for i in range(n):
        noise = sample_gaussian()
        x_t = add_noise(x_0, noise, strength=0.5)
        # 分别用查询文本和参考文本去噪
        eps_query = model.denoise(x_t, t, cond=query_text)
        eps_ref   = model.denoise(x_t, t, cond=ref_text)
        diffs.append(abs(eps_query - eps_ref))
    
    mask_raw = mean(diffs)           # 空间平均
    mask_raw = rescale_to_01(mask_raw)  # 归一化到 [0,1]
    M = binarize(mask_raw, threshold=0.5)  # 二值化
    
    # === Step 2: DDIM 编码 ===
    x_r = ddim_encode(x_0, ratio=r, cond=None)  # 无条件编码
    
    # === Step 3: 掩码引导的 DDIM 解码 ===
    y_r = x_r
    for t in reversed(range(r)):
        y_t = ddim_step(y_r, t, cond=query_text)  # 条件去噪
        x_t = ddim_encode_at_step(x_0, t)          # 对应时间步的编码隐变量
        y_tilde = M * y_t + (1 - M) * x_t          # 掩码引导融合
        y_r = y_tilde
    
    return y_r  # 编辑后的图像
```

##### Step 1：自动掩码推断机制

> 💡 **核心直觉**：当扩散模型在不同文本条件下去噪同一张带噪图像时，噪声估计的差异恰好反映了文本语义变化所影响的图像区域。

具体而言，给定带噪图像 \(\mathbf{x}_t\)，分别计算查询文本 \(Q\)（如"zebra"）和参考文本 \(R\)（如"horse"）条件下的噪声估计：

$$\Delta = |\epsilon_\theta(\mathbf{x}_t, t, Q) - \epsilon_\theta(\mathbf{x}_t, t, R)|$$

在动物身体区域，两种条件下模型会预测不同的纹理和颜色，因此噪声估计差异大；而在背景区域，两种条件下的预测几乎相同，差异接近零。

为提高稳定性，DiffEdit 采用以下策略：
- 使用 50% 强度的高斯噪声（即 \(t\) 对应中间时间步）
- 移除噪声预测中的极端值
- 对 \(n=10\) 个不同噪声样本的空间差异取平均
- 将结果归一化到 \([0, 1]\) 后以阈值 0.5 二值化

> ⚠️ **注意**：掩码通常会略微超出实际需要编辑的区域，这实际上是有益的——它允许编辑区域与背景之间的平滑过渡。

##### Step 2：DDIM 确定性编码

DiffEdit 使用 DDIM 的确定性编码过程将输入图像 \(\mathbf{x}_0\) 映射到隐空间表示 \(\mathbf{x}_r\)。DDIM 的关键性质是**可逆性**：对 \(\mathbf{x}_r\) 进行无条件 DDIM 解码可以近似恢复原始图像 \(\mathbf{x}_0\)。

DDIM 更新规则为：

$$\mathbf{x}_{t-1} = \sqrt{\alpha_{t-1}} \left( \frac{\mathbf{x}_t - \sqrt{1-\alpha_t}\,\epsilon_\theta(\mathbf{x}_t, t)}{\sqrt{\alpha_t}} \right) + \sqrt{1-\alpha_{t-1}}\,\epsilon_\theta(\mathbf{x}_t, t)$$

其中 \(\alpha_t\) 定义噪声水平，是时间步 \(t\) 的递减函数，\(\alpha_0 = 1\)（无噪声），\(\alpha_T \approx 0\)（近似纯噪声）。

编码过程是上述解码的逆过程，将 \(\mathbf{x}_0\) 映射到 \(\mathbf{x}_r = E_r(\mathbf{x}_0)\)。编码使用**无条件模型**（即不使用任何文本输入）。

> 💡 **关键优势**：与 SDEdit 的随机加噪 \(G_r(\mathbf{x}_0, \epsilon) = \sqrt{\alpha_r}\mathbf{x}_0 + \sqrt{1-\alpha_r}\epsilon\) 不同，DDIM 编码是确定性的，所有原始图像信息都被编码在 \(\mathbf{x}_r\) 中，可通过 DDIM 采样完整访问。

##### Step 3：掩码引导的条件解码

获得隐变量 \(\mathbf{x}_r\) 后，使用查询文本 \(Q\) 条件下的 DDIM 解码生成编辑结果。关键创新在于**掩码引导**：

$$\tilde{\mathbf{y}}_t = M \cdot \mathbf{y}_t + (1 - M) \cdot \mathbf{x}_t$$

其中：
- \(\mathbf{y}_t\) 是条件 DDIM 解码的中间结果（受查询文本引导）
- \(\mathbf{x}_t\) 是 DDIM 编码过程中对应时间步的隐变量（包含原始图像信息）
- \(M\) 是 Step 1 推断的二值掩码

这意味着：
- **掩码内**（\(M=1\)）：使用文本条件解码结果，实现语义编辑
- **掩码外**（\(M=0\)）：使用 DDIM 编码的隐变量，自然映射回原始像素

##### 编码比率 \(r\) 的作用

编码比率 \(r\) 决定了编辑的强度：
- **较大的 \(r\)**：允许更强的编辑，更好地匹配查询文本，但可能偏离原图较多
- **较小的 \(r\)**：编辑较弱，更贴近原图，但可能无法完全实现目标语义变化

##### 与 SDEdit 的理论对比

论文从理论角度证明了 DDIM 编码优于 SDEdit 的随机加噪方式。核心论点是：

对于 DDIM 编码，无条件解码 \(\mathbf{x}_r\) 可以精确恢复 \(\mathbf{x}_0\)。当改用条件解码时，由于条件和无条件噪声估计器 \(\epsilon_\theta\) 和 \(\epsilon_\theta(\cdot, Q)\) 通常产生相似的估计，解码行为也相似，因此编辑后的图像与原图距离较小。

而 SDEdit 的随机加噪引入了额外的随机性，即使无条件解码也无法精确恢复原图，导致编辑后图像与原图的偏差更大。

![DiffEdit 编辑示例](https://ar5iv.labs.arxiv.org/html/2210.11427/assets/x1.png)
*图：DiffEdit 在多种场景下的编辑效果示例，展示了从"马→斑马"、"碗中水果→蔬菜"等多种语义编辑任务。*

#### 🧪 练习题
```yaml
question: "DiffEdit 自动生成编辑掩码的核心原理是什么？"
options:
  - "使用图像分割模型检测目标物体区域"
  - "对比不同文本条件下扩散模型噪声估计的空间差异"
  - "通过 CLIP 模型计算图像与文本的注意力图"
  - "利用边缘检测算法识别物体轮廓"
answer: 1
explain: "DiffEdit 通过对比查询文本和参考文本条件下的噪声估计差异来推断掩码——差异大的区域即为需要编辑的区域，无需额外的分割或检测模型。"
```

### Hifi-Inpaint

```yaml
id: hifi-inpaint
num: 6
name: Hifi-Inpaint
full_name: 高保真参考修复 (Hifi-Inpaint)
year: '2026'
org: —
parent: —
paper_url: https://arxiv.org/abs/2603.02210
project_url: ''
category: local_editing
motivation: 参考图引导细节保留修复
```

#### 📝 一句话总结
HiFi-Inpaint 提出了一种基于高频图引导的参考图修复框架，通过 Shared Enhancement Attention（SEA）捕获精细商品特征、Detail-Aware Loss（DAL）实现高频区域像素级监督，并构建了 HP-Image-40K 数据集，在人物-商品合成任务中显著超越现有方法的细节保真度。

#### 🎯 核心要点
- **HP-Image-40K 数据集**：利用 FLUX.1-Dev 生成 diptych（左商品右人物）图像，经 Sobel 边缘分割 + YOLO/CLIP 语义过滤 + InternVL 文本过滤，构建 40K 高质量人物-商品配对数据
- **高频图引导**：对参考商品图做 DFT 高通滤波提取高频细节图，与原图拼接后通过 Token Merging 送入 DiT，引导模型关注纹理/logo/文字等细节
- **Shared Enhancement Attention (SEA)**：在 DiT 每个 block 中引入可学习权重 \(\alpha_i\)，将参考图注意力特征融合到生成路径，参数共享仅新增一个标量，几乎零额外开销
- **Detail-Aware Loss (DAL)**：对预测图和 GT 分别做高通滤波后在 mask 区域计算 MSE，专门监督高频细节重建质量
- **SOTA 性能**：在 HP-Image-40K 测试集上 CLIP-I 95.0%、DINO 91.9%、SSIM-HF 42.9%，全面超越 AnyDoor、Paint-by-Example、PowerPaint 等方法

#### 🔬 深入细节
##### 框架总览

![HiFi-Inpaint 框架总览](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x2.png)
*图：HiFi-Inpaint 整体架构。左侧为高频图提取与 Token Merging，中间为基于 FLUX.1-Dev DiT 的生成主干（含 SEA 模块），右侧为 Detail-Aware Loss 的高频监督。*

HiFi-Inpaint 构建在 FLUX.1-Dev（一种 DiT 架构的文生图模型）之上。整体流程为：

1. **输入构造**：将参考商品图 \(I_{ref}\)、其高频图 \(H(I_{ref})\)、带 mask 的人物图 \(I_{masked}\) 分别编码为 token 序列，通过 Token Merging 拼接为统一输入
2. **DiT 生成**：在每个 DiT block 中，SEA 机制将参考图的注意力特征以可学习权重注入生成路径
3. **损失计算**：标准 MSE 重建损失 + DAL 高频细节损失联合优化

##### HP-Image-40K 数据集构建

![数据集统计](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x7.png)
*图：HP-Image-40K 的 mask 面积比分布直方图，覆盖从小面积到大面积的多样化场景。*

现有数据集（如 VITON-HD、DeepFashion）仅覆盖服装试穿场景，缺乏通用商品类别。HiFi-Inpaint 提出了一套自动化数据构建流水线：

1. **Diptych 生成**：使用 FLUX.1-Dev 生成"左侧商品 + 右侧人物持有/佩戴该商品"的双联图，确保左右两侧为同一商品的不同视角
2. **Sobel 边缘分割**：对 diptych 中线位置做 Sobel 边缘检测，自动定位分割线并裁切为独立的商品图和人物图。论文特别指出 Sobel 比 Canny 更适合此任务——Canny 检测所有边缘导致大量噪声，而 Sobel 仅响应强梯度方向，能精准定位中线

![Sobel vs Canny](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x3.png)
*图：Sobel 与 Canny 的对比。Canny 检测所有边缘导致噪声，Sobel 精准定位中线分割。*

3. **语义过滤**：YOLO 检测人物区域 + CLIP 计算商品-人物语义一致性，过滤不匹配的样本
4. **文本过滤**：InternVL 多模态模型判断商品图中是否包含文字/logo 等高频细节，优先保留含丰富细节的样本

最终数据集包含约 40K 对高质量 (商品图, 人物图, mask) 三元组，涵盖手表、包、鞋、手机等多种商品类别。

##### 高频图引导机制

传统参考图修复方法直接将参考图编码后送入生成模型，但 DiT 的自注意力机制倾向于捕获全局语义而忽略局部高频细节。HiFi-Inpaint 的核心洞察是：**显式提取高频信息作为额外条件，迫使模型关注纹理级细节**。

具体做法：对参考商品图 \(I_{ref}\) 做离散傅里叶变换（DFT），在频域中用高通滤波器滤除低频分量，再做逆 DFT 得到高频图 \(H(I_{ref})\)。高频图仅保留边缘、纹理、logo 等细节信息，去除了颜色和形状等低频语义。

Token Merging 将三路输入拼接：

$$\mathbf{z} = \text{Concat}[\text{Enc}(I_{masked}),\; \text{Enc}(I_{ref} \oplus H(I_{ref})),\; \text{Enc}(z_t)]$$

其中 \(I_{ref} \oplus H(I_{ref})\) 表示参考图与其高频图的通道拼接，\(z_t\) 为加噪的 GT latent。

##### Shared Enhancement Attention (SEA)

> 💡 **关键洞察**：参考图和生成图共享同一个 DiT backbone 的参数，但需要一种机制让参考图的注意力特征"增强"生成路径，而不引入大量新参数。

SEA 的设计极为精巧。在 DiT 的第 \(i\) 个 block 中：

1. 参考图 token 和生成图 token 共同经过同一个 block \(B_i\)，得到各自的输出
2. 对参考图的输出，用 mask \(M_{ds}\)（下采样到 latent 分辨率）提取 mask 区域的特征
3. 用一个**可学习标量** \(\alpha_i\) 加权后叠加到生成图的对应位置

公式表达：

$$z_i = B_i(z_{i-1}) + \alpha_i \cdot \text{Mask}(B_i(z'_{i-1}),\; M_{ds})$$

其中 \(z_{i-1}\) 是生成路径的第 \(i-1\) 层输出，\(z'_{i-1}\) 是参考路径的第 \(i-1\) 层输出，\(B_i\) 是共享的第 \(i\) 个 DiT block。

![SEA 可学习权重 vs 固定权重](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x4.png)
*图：可学习 \(\alpha_i\) vs 固定权重的对比。可学习权重让不同层自适应调节参考信息的注入强度，生成更自然的结果。*

> ⚠️ **注意**：SEA 的参数开销极低——整个模型仅新增 N 个标量参数（N 为 DiT block 数），所有注意力权重完全共享。这使得 HiFi-Inpaint 在 FLUX.1-Dev 基础上几乎不增加模型大小。

##### Detail-Aware Loss (DAL)

标准的 MSE 损失对所有像素一视同仁，但高频细节（logo 文字、纹理图案）仅占图像的少量像素，容易被低频区域的梯度淹没。DAL 专门针对这一问题：

$$\mathcal{L}_{DA} = \| H(\hat{I}_{gt}) \odot M - H(I_{gt}) \odot M \|_2^2$$

其中 \(H(\cdot)\) 是高通滤波操作，\(M\) 是 mask，\(\hat{I}_{gt}\) 是模型预测的去噪结果，\(I_{gt}\) 是 GT。

总损失为：

$$\mathcal{L} = \mathcal{L}_{MSE} + \mathcal{L}_{DA}$$

> 💡 **直觉理解**：DAL 相当于在频域空间中对 mask 区域做了一次"高频放大镜"——只关注预测图和 GT 在高频分量上的差异，迫使模型精确重建纹理和边缘。

##### 伪代码

```python
# HiFi-Inpaint 训练伪代码
for batch in dataloader:
    I_ref, I_gt, M = batch  # 参考商品图, GT人物图, mask
    
    # 1. 高频图提取
    H_ref = high_pass_filter(DFT(I_ref))  # 参考图高频
    
    # 2. 输入构造
    I_masked = I_gt * (1 - M)  # masked 人物图
    z_t = add_noise(VAE_encode(I_gt), t)  # 加噪 GT latent
    
    # 3. Token Merging
    tokens = concat(encode(I_masked), encode(I_ref, H_ref), encode(z_t))
    
    # 4. DiT Forward with SEA
    z_gen = z_t
    z_ref = encode(I_ref, H_ref)
    for i, block in enumerate(dit_blocks):
        z_gen = block(z_gen) + alpha[i] * mask_select(block(z_ref), M_ds)
    
    # 5. 损失计算
    I_pred = VAE_decode(z_gen)
    L_mse = MSE(I_pred * M, I_gt * M)
    L_da = MSE(high_pass(I_pred) * M, high_pass(I_gt) * M)
    loss = L_mse + L_da
    loss.backward()
```

##### 实验结果

![定性对比](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x5.png)
*图：与 AnyDoor、Paint-by-Example、PowerPaint、FLUX-Fill 的定性对比。HiFi-Inpaint 在 logo、文字、纹理等高频细节上保真度显著更高。*

**定量结果**（HP-Image-40K 测试集）：

| 方法 | CLIP-I ↑ | DINO ↑ | SSIM ↑ | SSIM-HF ↑ |
|------|----------|--------|--------|------------|
| AnyDoor | 89.3% | 72.1% | 53.1% | 28.3% |
| Paint-by-Example | 87.3% | 68.3% | 49.5% | 25.5% |
| PowerPaint | 91.1% | 79.1% | 56.2% | 33.3% |
| FLUX-Fill | 93.5% | 88.5% | 60.3% | 39.3% |
| **HiFi-Inpaint** | **95.0%** | **91.9%** | **63.4%** | **42.9%** |

其中 SSIM-HF 是论文提出的高频 SSIM 指标，专门衡量高频细节的重建质量。HiFi-Inpaint 在所有指标上均取得 SOTA。

**消融实验**（5 组配置 A→E）：
- 合成数据 vs 真实数据：合成数据训练效果更优（DINO +3.1%）
- DAL 贡献：加入 DAL 后 SSIM-HF 从 40.1% 提升到 41.7%
- SEA 贡献：加入 SEA 后 SSIM-HF 从 41.7% 进一步提升到 42.9%，DINO 从 90.0% 到 91.9%

**用户研究**：在 4 种方法的对比中，HiFi-Inpaint 获得 36-41% 的用户偏好率（4 选 1 中最高）。

![消融定性分析](https://ar5iv.labs.arxiv.org/html/2603.02210/assets/x6.png)
*图：消融实验定性结果。SEA 和 DAL 各自对细节保真度有明显贡献。*

##### 与现有方法的关键区别

| 维度 | 传统方法 (AnyDoor/PbE) | HiFi-Inpaint |
|------|----------------------|--------------|
| 参考图编码 | CLIP/DINOv2 语义编码，丢失高频 | 原图 + 高频图双路编码，保留纹理 |
| 注意力机制 | 独立编码器，参数不共享 | SEA 参数共享 + 可学习权重注入 |
| 损失函数 | 标准 MSE/感知损失 | MSE + DAL 高频专项监督 |
| 数据集 | 真实数据（类别受限） | 合成 diptych 数据（类别丰富） |
| 额外参数 | 通常需要独立适配器 | 仅 N 个标量 \(\alpha_i\) |

#### 🧪 练习题
```yaml
question: "HiFi-Inpaint 中 Shared Enhancement Attention (SEA) 的核心设计是什么？"
options:
  - "为参考图和生成图分别训练独立的注意力模块"
  - "在每个 DiT block 中用可学习标量权重将参考图注意力特征注入生成路径，参数完全共享"
  - "使用交叉注意力机制将参考图特征与文本 prompt 融合"
  - "在 VAE 解码器中加入参考图的跳跃连接"
answer: 1
explain: "SEA 的核心是参数共享——参考图和生成图经过同一个 DiT block，仅通过一个可学习标量 α_i 控制参考特征的注入强度，几乎零额外参数开销。"
```

### Neural Style Transfer

```yaml
id: neural-style-transfer
num: 7
name: Neural Style Transfer
full_name: 神经风格迁移 (Neural Style Transfer)
year: '2016'
org: Tubingen
parent: —
paper_url: https://arxiv.org/abs/1508.06576
project_url: ''
category: style_transfer
motivation: Gram矩阵匹配实现风格融合
```

#### 📝 一句话总结
Neural Style Transfer 提出利用预训练 CNN（VGG-19）的特征表示将图像的**内容**与**风格**分离，通过优化一张噪声图像使其同时匹配内容图像的高层特征和风格图像的 Gram 矩阵统计量，首次实现了高质量的艺术风格迁移。

#### 🎯 核心要点
- **基于 VGG-19 的特征提取**：利用预训练 VGG-19 网络不同层的特征响应分别表征图像的内容和风格信息
- **内容表示**：使用网络高层（如 conv4\_2）的特征图直接表示图像内容，高层特征捕获语义结构而忽略像素级细节
- **风格表示（Gram 矩阵）**：通过计算多层特征图之间的 Gram 矩阵（特征通道间的内积）来捕获纹理和风格的统计信息，与空间位置无关
- **基于优化的图像生成**：从白噪声图像出发，通过梯度下降同时最小化内容损失和风格损失，直接优化像素值生成结果图像
- **多层风格匹配**：在 conv1\_1 到 conv5\_1 五个层级同时匹配风格表示，低层捕获颜色和纹理，高层捕获全局风格结构
- **内容-风格权重平衡**：通过 \(\alpha/\beta\) 比值控制内容保留与风格化强度之间的权衡

#### 🔬 深入细节
##### 核心架构示意图

![Neural Style Transfer 网络架构与特征可视化](https://ar5iv.labs.arxiv.org/html/1508.06576/assets/network_model.png)
*图：左侧为 VGG-19 网络结构，右上展示不同层的内容重建效果（浅层保留像素细节，深层保留语义结构），右下展示不同层的风格重建效果（多层组合产生越来越完整的风格纹理）。*

![风格迁移效果示例](https://ar5iv.labs.arxiv.org/html/1508.06576/assets/examples.png)
*图：将不同艺术作品的风格迁移到同一张照片上的效果。A 为原始照片，各行分别对应不同风格画作（《星夜》、《呐喊》、《坐着的裸女》、《构成 VII》）。*

##### 算法伪代码

```python
# Neural Style Transfer 核心算法
import torch
from torchvision.models import vgg19

# 1. 加载预训练 VGG-19，提取指定层特征
model = vgg19(pretrained=True).features  # 固定权重，仅用于特征提取

# 2. 定义内容层和风格层
content_layers = ['conv4_2']
style_layers = ['conv1_1', 'conv2_1', 'conv3_1', 'conv4_1', 'conv5_1']

# 3. 提取内容图像和风格图像的目标特征
P = extract_features(content_image, model, content_layers)   # 内容目标
A = extract_features(style_image, model, style_layers)        # 风格目标（Gram 矩阵）

# 4. 初始化生成图像（白噪声）
x = torch.randn_like(content_image, requires_grad=True)

# 5. 迭代优化
optimizer = torch.optim.LBFGS([x])
for step in range(num_steps):
    F = extract_features(x, model, content_layers + style_layers)
    
    # 内容损失：高层特征的 MSE
    L_content = 0.5 * sum((F[l] - P[l])**2)
    
    # 风格损失：各层 Gram 矩阵的 MSE
    L_style = 0
    for l in style_layers:
        G_l = gram_matrix(F[l])          # 生成图像的 Gram 矩阵
        A_l = gram_matrix(A[l])          # 风格图像的 Gram 矩阵
        N_l, M_l = F[l].shape[1], F[l].shape[2] * F[l].shape[3]
        E_l = (1 / (4 * N_l**2 * M_l**2)) * sum((G_l - A_l)**2)
        L_style += w_l * E_l            # w_l 为各层权重
    
    # 总损失
    L_total = alpha * L_content + beta * L_style
    L_total.backward()
    optimizer.step()
```

##### 动机与背景

在深度学习兴起之前，图像风格迁移主要依赖于非参数化的纹理合成方法，这些方法只能处理低层纹理特征，无法捕获高层语义风格。2015 年 Gatys 等人发现，预训练的深度卷积神经网络（CNN）在物体识别任务中学到的特征表示，天然地将图像的**内容信息**和**风格信息**编码在不同的特征统计量中。这一发现使得首次通过 CNN 实现高质量的艺术风格迁移成为可能。

> 💡 关键：CNN 的层级结构天然形成了从低级纹理到高级语义的特征层次，这为内容-风格分离提供了理论基础。

##### 内容表示与内容损失

网络中每一层 \(l\) 有 \(N_l\) 个滤波器，每个滤波器产生大小为 \(M_l\) 的特征图（\(M_l = H_l \times W_l\)）。层 \(l\) 的特征响应可以存储为矩阵 \(F^l \in \mathbb{R}^{N_l \times M_l}\)，其中 \(F^l_{ij}\) 表示第 \(i\) 个滤波器在位置 \(j\) 的激活值。

给定内容图像 \(\vec{p}\) 和生成图像 \(\vec{x}\)，设它们在层 \(l\) 的特征表示分别为 \(P^l\) 和 \(F^l\)，**内容损失**定义为：

$$\mathcal{L}_{\text{content}}(\vec{p}, \vec{x}, l) = \frac{1}{2} \sum_{i,j} \left( F^l_{ij} - P^l_{ij} \right)^2$$

论文发现，**高层特征**（如 conv4\_2、conv5\_2）捕获的是图像的高级语义结构（物体排列、场景布局），而低层特征则保留了更多像素级细节。因此内容匹配通常选择网络的中高层。

##### 风格表示与 Gram 矩阵

风格表示的核心创新在于使用 **Gram 矩阵**。对于层 \(l\) 的特征图 \(F^l\)，Gram 矩阵 \(G^l \in \mathbb{R}^{N_l \times N_l}\) 定义为：

$$G^l_{ij} = \sum_k F^l_{ik} F^l_{jk}$$

Gram 矩阵计算的是不同滤波器响应之间的相关性，它编码了特征的**共现模式**——即哪些纹理元素倾向于同时出现。由于对空间位置求和，Gram 矩阵丢弃了空间信息，只保留了纹理的统计特性，这正是"风格"的本质。

> 💡 关键：Gram 矩阵 \(G^l_{ij} = \sum_k F^l_{ik} F^l_{jk}\) 本质上是特征通道间的非中心化协方差矩阵，它捕获了"哪些特征一起激活"的模式，这正是纹理/风格的统计签名。

给定风格图像 \(\vec{a}\) 的 Gram 矩阵 \(A^l\) 和生成图像的 Gram 矩阵 \(G^l\)，**单层风格损失**为：

$$E_l = \frac{1}{4 N_l^2 M_l^2} \sum_{i,j} \left( G^l_{ij} - A^l_{ij} \right)^2$$

**总风格损失**在多层上加权求和：

$$\mathcal{L}_{\text{style}}(\vec{a}, \vec{x}) = \sum_{l=0}^{L} w_l \, E_l$$

其中 \(w_l\) 为各层权重。论文使用 conv1\_1 到 conv5\_1 五个层，每层权重 \(w_l = 1/5\)。多层匹配确保风格在不同尺度上都得到复现——低层匹配颜色和小尺度纹理，高层匹配大尺度结构和全局风格模式。

##### 总损失与优化过程

最终的**总损失函数**将内容损失和风格损失加权组合：

$$\mathcal{L}_{\text{total}}(\vec{p}, \vec{a}, \vec{x}) = \alpha \, \mathcal{L}_{\text{content}}(\vec{p}, \vec{x}) + \beta \, \mathcal{L}_{\text{style}}(\vec{a}, \vec{x})$$

其中 \(\alpha\) 和 \(\beta\) 分别控制内容保真度和风格化强度。论文中探索了 \(\alpha/\beta\) 从 \(10^{-5}\) 到 \(10^{-2}\) 的不同比值：
- **高 \(\alpha/\beta\)**：生成图像更忠实于原始内容，风格化程度较弱
- **低 \(\alpha/\beta\)**：风格化效果更强烈，但内容结构可能被扭曲

优化过程使用 **L-BFGS** 算法（一种拟牛顿法），直接对生成图像的像素值进行梯度下降。生成图像从白噪声初始化，VGG-19 网络权重始终固定不变，仅作为特征提取器使用。

> ⚠️ 注意：这是一种**基于优化的方法**（optimization-based），每生成一张图像都需要数百次前向-反向传播迭代，计算开销较大。后续工作（如 Johnson et al. 2016、Ulyanov et al. 2016）通过训练前馈网络来加速推理。

##### 与传统方法的区别

| 维度 | 传统纹理合成 | Neural Style Transfer |
|------|-------------|----------------------|
| 特征层次 | 仅低层纹理统计 | 多层级语义特征（conv1→conv5） |
| 内容保持 | 无法保持内容结构 | 通过高层特征约束保持语义布局 |
| 风格表示 | 手工设计的纹理描述子 | Gram 矩阵自动捕获多尺度风格 |
| 通用性 | 需针对特定纹理设计 | 任意风格图像均可使用 |
| 生成质量 | 局限于重复纹理 | 可生成具有艺术表现力的图像 |

本文的核心贡献在于揭示了 CNN 特征空间中内容与风格的可分离性，并提出了 Gram 矩阵作为风格表示的范式，这一思想深刻影响了后续所有风格迁移工作（WCT、AdaIN、StyleGAN 等）。

![不同内容-风格权重比的效果对比](https://ar5iv.labs.arxiv.org/html/1508.06576/assets/kandinsky_composition7_detailed.png)
*图：以康定斯基《构成 VII》为风格图像，展示不同 \(\alpha/\beta\) 比值下的风格迁移结果。从左到右风格化强度递增，内容保留递减。*

#### 🧪 练习题
```yaml
question: "Neural Style Transfer 中使用 Gram 矩阵表示风格的核心原因是什么？"
options:
  - "Gram 矩阵能保留特征图的空间位置信息"
  - "Gram 矩阵计算特征通道间的相关性，捕获与位置无关的纹理统计特性"
  - "Gram 矩阵能降低特征维度，加速计算"
  - "Gram 矩阵是 VGG 网络训练时使用的标准损失函数"
answer: 1
explain: "Gram 矩阵通过对空间维度求和计算通道间内积，丢弃了空间位置信息而保留了特征共现的统计模式，这正是纹理/风格的本质特征。"
```

### Fast Style Transfer

```yaml
id: fast-style-transfer
num: 8
name: Fast Style Transfer
full_name: 快速风格迁移 (Fast Style Transfer)
year: '2016'
org: Stanford
parent: neural-style-transfer
paper_url: https://arxiv.org/abs/1603.08155
project_url: ''
category: style_transfer
motivation: 感知损失训练实时变换网络
```

#### 📝 一句话总结
Fast Style Transfer 提出用**感知损失函数（Perceptual Loss）**训练前馈变换网络，将 Gatys 等人基于逐像素优化的风格迁移从数分钟压缩到**单次前向传播（实时）**，同时在超分辨率任务上也取得了优异效果。

#### 🎯 核心要点
- **双网络架构**：Image Transformation Network（前馈生成）+ Loss Network（固定 VGG-16 提取感知特征），训练时仅更新变换网络权重
- **感知损失替代像素损失**：在 VGG-16 的高层特征空间计算内容损失，而非逐像素 MSE，使输出在语义层面与目标一致
- **Gram 矩阵风格损失**：通过多层 Gram 矩阵的 Frobenius 范数差异捕获风格纹理统计信息
- **残差网络 + 下采样/上采样架构**：2 层 stride-2 卷积下采样 → 5 个残差块 → 2 层 fractional-strided 卷积上采样，扩大感受野同时保持分辨率
- **每种风格训练一个网络**：推理速度比 Gatys 优化方法快约 **1000 倍**（~3 个数量级）
- **同框架适用于超分辨率**：将风格损失替换为特征重建损失即可用于单图超分辨率任务

#### 🔬 深入细节
##### 系统架构总览

![Fast Style Transfer 系统架构](https://ar5iv.labs.arxiv.org/html/1603.08155/assets/x1.png)
*图：系统由 Image Transformation Network \(f_W\) 和 Loss Network \(\phi\)（VGG-16）组成。变换网络将输入图像 \(x\) 映射为输出 \(\hat{y} = f_W(x)\)，Loss Network 在固定权重下提取 \(\hat{y}\) 和目标图像的特征，计算感知损失用于反向传播更新 \(f_W\)。*

##### 动机与背景

Gatys 等人（2015）开创性地证明了通过优化一张噪声图像，使其在 VGG 网络的特征空间中同时匹配内容图像的特征表示和风格图像的 Gram 矩阵统计，可以生成令人惊艳的风格迁移结果。然而，这种方法需要对**每张图像**运行数百步梯度下降优化，耗时数分钟，无法实际部署。

> 💡 **核心洞察**：既然优化目标是固定的（给定风格图像），为什么不直接训练一个前馈网络来"一步到位"地学会这个映射？

Johnson 等人正是基于这一思路，将"逐图优化"转化为"一次训练、实时推理"的范式。

##### Image Transformation Network 架构

变换网络 \(f_W\) 是一个全卷积残差网络，不使用任何池化层：

```python
# Image Transformation Network 架构伪代码
def ImageTransformNet(x):
    # x: [B, 3, 256, 256] 输入图像
    
    # === 下采样阶段 ===
    h = Conv2d(3, 32, kernel=9, stride=1, pad=4)(x)   # [B, 32, 256, 256]
    h = BN(h); h = ReLU(h)
    h = Conv2d(32, 64, kernel=3, stride=2, pad=1)(h)   # [B, 64, 128, 128]
    h = BN(h); h = ReLU(h)
    h = Conv2d(64, 128, kernel=3, stride=2, pad=1)(h)  # [B, 128, 64, 64]
    h = BN(h); h = ReLU(h)
    
    # === 残差块阶段（5个残差块）===
    for _ in range(5):
        h = ResidualBlock(h)  # 每块: Conv3x3→BN→ReLU→Conv3x3→BN + skip
    
    # === 上采样阶段 ===
    h = ConvTranspose2d(128, 64, kernel=3, stride=2)(h)  # [B, 64, 128, 128]
    h = BN(h); h = ReLU(h)
    h = ConvTranspose2d(64, 32, kernel=3, stride=2)(h)   # [B, 32, 256, 256]
    h = BN(h); h = ReLU(h)
    h = Conv2d(32, 3, kernel=9, stride=1, pad=4)(h)      # [B, 3, 256, 256]
    
    # 缩放 tanh 输出到 [0, 255]
    out = (tanh(h) + 1) / 2 * 255
    return out
```

> ⚠️ **关键设计**：使用 stride-2 卷积而非池化进行下采样，使用 fractional-strided 卷积（转置卷积）进行上采样。下采样后每个 3×3 卷积的有效感受野增大 \(2D\) 倍（\(D\) 为下采样因子），用更少的层覆盖更大的空间范围。

##### 感知损失函数体系

整体训练目标为：

$$W^* = \arg\min_W \; \mathbb{E}_{x} \left[ \lambda_c \cdot \ell_{feat}^{\phi,j}(\hat{y}, y_c) + \lambda_s \cdot \ell_{style}^{\phi,J}(\hat{y}, y_s) + \lambda_{TV} \cdot \ell_{TV}(\hat{y}) \right]$$

其中 \(\hat{y} = f_W(x)\) 为变换网络输出，\(y_c\) 为内容目标（即输入 \(x\) 本身），\(y_s\) 为风格目标图像。

**① 特征重建损失（Content Loss）**

在 VGG-16 的第 \(j\) 层特征空间中度量内容差异：

$$\ell_{feat}^{\phi,j}(\hat{y}, y) = \frac{1}{C_j H_j W_j} \left\| \phi_j(\hat{y}) - \phi_j(y) \right\|_2^2$$

其中 \(\phi_j(x)\) 是 VGG-16 第 \(j\) 层的特征图（形状 \(C_j \times H_j \times W_j\)）。论文中风格迁移任务使用 `relu2_2` 层作为内容损失层。

> 💡 **直觉**：低层特征（如 `relu1_2`）重建出的图像几乎与原图像素级一致；高层特征（如 `relu4_3`）则只保留整体空间结构和语义，丢失颜色和纹理细节。选择中间层可以在"保留内容结构"和"允许风格变化"之间取得平衡。

**② 风格重建损失（Style Loss）**

首先计算 Gram 矩阵，捕获特征通道之间的相关性统计：

$$G_j^{\phi}(x)_{c,c'} = \frac{1}{C_j H_j W_j} \sum_{h=1}^{H_j} \sum_{w=1}^{W_j} \phi_j(x)_{h,w,c} \cdot \phi_j(x)_{h,w,c'}$$

Gram 矩阵 \(G_j^{\phi}(x) \in \mathbb{R}^{C_j \times C_j}\) 本质上是特征通道的**非中心化协方差矩阵**，它丢弃了空间位置信息，只保留"哪些纹理特征倾向于共同出现"的统计规律。

> 💡 **高效计算**：将 \(\phi_j(x)\) reshape 为 \(\psi \in \mathbb{R}^{C_j \times H_j W_j}\)，则 \(G_j^{\phi}(x) = \psi \psi^T / (C_j H_j W_j)\)，一次矩阵乘法即可完成。

风格损失定义为 Gram 矩阵差异的 Frobenius 范数：

$$\ell_{style}^{\phi,j}(\hat{y}, y) = \left\| G_j^{\phi}(\hat{y}) - G_j^{\phi}(y) \right\|_F^2$$

实际使用时在多层 \(J\) 上求和：\(\ell_{style}^{\phi,J} = \sum_{j \in J} \ell_{style}^{\phi,j}\)。论文使用 `relu1_2`、`relu2_2`、`relu3_3`、`relu4_3` 四层。

**③ 全变分正则化（Total Variation Loss）**

$$\ell_{TV}(\hat{y}) = \sum_{i,j} \left( (\hat{y}_{i+1,j} - \hat{y}_{i,j})^2 + (\hat{y}_{i,j+1} - \hat{y}_{i,j})^2 \right)$$

鼓励输出图像的空间平滑性，抑制棋盘格伪影。

##### 训练与推理流程

```python
# 训练流程伪代码
vgg = VGG16(pretrained=True).eval()          # 冻结 Loss Network
transform_net = ImageTransformNet()            # 待训练
style_image = load_image("starry_night.jpg")   # 固定风格图

# 预计算风格图的 Gram 矩阵（只需一次）
style_grams = {j: gram_matrix(vgg.layer_j(style_image)) for j in style_layers}

for epoch in range(2):
    for content_batch in MSCOCO_dataloader:    # 80K 张 COCO 图像
        y_hat = transform_net(content_batch)   # 前向生成
        
        # 内容损失：relu2_2 层
        L_content = feature_loss(vgg.relu2_2(y_hat), vgg.relu2_2(content_batch))
        
        # 风格损失：relu1_2, relu2_2, relu3_3, relu4_3
        L_style = sum(style_loss(gram(vgg.layer_j(y_hat)), style_grams[j])
                      for j in style_layers)
        
        # 总损失
        loss = λ_c * L_content + λ_s * L_style + λ_TV * TV_loss(y_hat)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# 推理：单次前向传播，~15ms/帧 (GPU)
output = transform_net(new_image)  # 实时！
```

> 💡 **关键对比**：Gatys 方法对每张新图像需要运行 ~500 步 L-BFGS 优化（数分钟）；本方法训练完成后，推理仅需**一次前向传播**（~15ms），速度提升约 **1000 倍**。代价是每种风格需要单独训练一个网络。

##### 风格迁移效果

![风格迁移目标示意](https://ar5iv.labs.arxiv.org/html/1603.08155/assets/style_objective.png)
*图：风格迁移的目标是将风格图像的纹理特征迁移到内容图像上，同时保留内容图像的空间结构。*

##### 与 Gatys 方法的对比

| 维度 | Gatys (2015) 优化方法 | Johnson (2016) 前馈方法 |
|------|----------------------|------------------------|
| 推理方式 | 每张图迭代优化 ~500 步 | 单次前向传播 |
| 推理速度 | ~数分钟/张 | ~15ms/张 (GPU) |
| 训练需求 | 无需训练 | 需预训练（~4h/风格） |
| 风格灵活性 | 任意风格 | 每种风格一个网络 |
| 质量 | 基准 | 质量相当 |
| 损失函数 | 相同（感知损失） | 相同（感知损失） |

##### 超分辨率应用

同一框架也适用于单图超分辨率：将输入改为低分辨率图像，去掉风格损失，仅使用特征重建损失训练。与传统 per-pixel MSE 损失相比，感知损失训练的超分辨率网络在视觉质量上更优（更锐利、更少模糊），尽管 PSNR 数值可能略低。

#### 🧪 练习题
```yaml
question: "Fast Style Transfer 中 Gram 矩阵的作用是什么？"
options:
  - "编码图像的空间位置信息，保留内容结构"
  - "捕获特征通道间的相关性统计，表征纹理风格"
  - "计算输出图像与目标图像的像素级差异"
  - "对特征图进行降维以加速计算"
answer: 1
explain: "Gram 矩阵计算特征通道之间的非中心化协方差，丢弃空间位置信息，只保留'哪些纹理特征倾向于共同出现'的统计规律，因此能有效表征风格/纹理特征。"
```

### AdaIN

```yaml
id: adain
num: 9
name: AdaIN
full_name: 自适应实例归一化 (AdaIN)
year: '2017'
org: Cornell
parent: fast-style-transfer
paper_url: https://arxiv.org/abs/1703.06868
project_url: ''
category: style_transfer
motivation: 自适应归一化任意风格迁移
```

#### 📝 一句话总结
AdaIN 的核心目标是：自适应归一化任意风格迁移。

#### 🎯 核心要点
- 核心动机：自适应归一化任意风格迁移
- 演化来源：继承或改进自 fast-style-transfer
- 代表机构：Cornell

#### 🔬 深入细节
自适应归一化任意风格迁移


### WCT

```yaml
id: wct
num: 10
name: WCT
full_name: 白化着色变换 (WCT)
year: '2017'
org: Cornell
parent: adain
paper_url: https://arxiv.org/abs/1705.08086
project_url: ''
category: style_transfer
motivation: 白化与着色变换通用风格化
```

#### 📝 一句话总结
WCT 提出利用白化（Whitening）和着色（Coloring）变换直接对深度特征进行统计匹配，配合仅需重建损失训练的编码器-解码器对，实现了无需针对特定风格训练的**通用风格迁移**方法。

#### 🎯 核心要点
- **编码器-解码器架构**：使用预训练 VGG-19 作为编码器（固定权重），训练对称的解码器网络仅用像素重建损失 + 特征重建损失，不涉及任何风格相关训练
- **白化与着色变换（WCT）**：通过 SVD 分解特征协方差矩阵，先白化内容特征去除原始风格信息，再用风格特征的统计量着色，实现特征空间的风格匹配
- **多级 Coarse-to-Fine 流水线**：从 Relu\_5\_1 到 Relu\_1\_1 逐级应用 WCT，粗层捕获全局风格结构，细层补充纹理细节
- **Alpha 混合控制**：通过 \(\alpha\) 参数在变换后特征与原始内容特征之间插值，灵活控制风格化强度
- **Learning-free 风格化**：WCT 本身不需要学习参数，风格迁移过程完全基于特征统计量的线性变换
- **通用性**：单一模型可处理任意风格图像，无需为每种风格单独训练网络

#### 🔬 深入细节
##### 核心架构示意图

![WCT 通用风格迁移流水线 - 解码器训练](https://ar5iv.labs.arxiv.org/html/1705.08086/assets/x1.png)
*图 (a)：预训练五个解码器网络（Decoder 5 到 Decoder 1），每个解码器对应 VGG-19 的一个 Relu\_i\_1 层，仅使用重建损失训练*

![WCT 通用风格迁移流水线 - 单级WCT](https://ar5iv.labs.arxiv.org/html/1705.08086/assets/x2.png)
*图 (b)：单级 WCT 操作流程 — 编码器提取特征后，先白化内容特征、再用风格特征着色，最后通过解码器重建图像*

![WCT 通用风格迁移流水线 - 多级流水线](https://ar5iv.labs.arxiv.org/html/1705.08086/assets/x3.png)
*图 (c)：多级 Coarse-to-Fine 流水线 — 从 Relu\_5\_1 到 Relu\_1\_1 逐级串联应用 WCT*

##### 算法伪代码

```python
# WCT 通用风格迁移伪代码
# 输入: content_img, style_img
# 输出: stylized_img

# === 第一阶段: 预训练解码器 (离线, 仅一次) ===
for i in [5, 4, 3, 2, 1]:
    encoder_i = VGG19_up_to_Relu_i_1()  # 固定权重
    decoder_i = SymmetricDecoder(encoder_i)
    # 训练目标: 重建损失
    # L = ||decoder_i(encoder_i(I)) - I||^2 + λ·||feat(decoder_i(encoder_i(I))) - feat(I)||^2
    train(decoder_i, reconstruction_loss)

# === 第二阶段: 风格迁移 (推理时) ===
def WCT_transform(f_c, f_s, alpha=1.0):
    """白化与着色变换"""
    # 1. 白化内容特征: 去除内容图的风格信息
    # f_c: C×(H·W), 先中心化
    f_c_centered = f_c - mean(f_c)
    # SVD 分解内容特征协方差
    D_c, E_c = eigen_decompose(f_c_centered @ f_c_centered.T / N)
    f_whitened = E_c @ diag(D_c^{-1/2}) @ E_c.T @ f_c_centered

    # 2. 着色: 注入风格图的统计信息
    f_s_centered = f_s - mean(f_s)
    D_s, E_s = eigen_decompose(f_s_centered @ f_s_centered.T / N)
    f_colored = E_s @ diag(D_s^{1/2}) @ E_s.T @ f_whitened + mean(f_s)

    # 3. Alpha 混合控制风格化强度
    f_out = alpha * f_colored + (1 - alpha) * f_c
    return f_out

# 多级 Coarse-to-Fine 流水线
result = content_img
for i in [5, 4, 3, 2, 1]:  # 从粗到细
    f_c = encoder_i(result)
    f_s = encoder_i(style_img)
    f_transformed = WCT_transform(f_c, f_s, alpha)
    result = decoder_i(f_transformed)

stylized_img = result
```

##### 动机与背景

传统的神经风格迁移方法主要分为两类，各有明显缺陷：

1. **基于优化的方法**（如 Gatys et al., 2016）：通过迭代优化像素值来最小化内容损失和风格损失（Gram 矩阵匹配）。效果好但**速度极慢**，每张图需要数百次前向-反向传播。
2. **基于前馈网络的方法**（如 Johnson et al., 2016; Ulyanov et al., 2016）：训练一个前馈网络直接生成风格化图像，速度快但**每个网络只能处理一种风格**，缺乏通用性。

> 💡 **核心洞察**：风格迁移的本质是**特征空间中的统计量匹配**。与其让网络隐式学习这种匹配，不如直接在特征空间中进行显式的统计变换。

WCT 的关键创新在于将风格迁移问题分解为两个独立的子问题：
- **特征提取与重建**：由编码器-解码器负责，与风格无关
- **特征变换**：由白化-着色变换完成，无需学习参数

##### 核心机制详解

**1. 编码器-解码器网络**

编码器直接使用预训练的 VGG-19 网络（固定权重），截取到不同深度的 Relu\_i\_1 层。解码器是编码器的对称结构（将池化替换为上采样），训练目标仅为重建：

$$L_{rec} = \|D_i(E_i(I)) - I\|_2^2 + \lambda \|\Phi(D_i(E_i(I))) - \Phi(I)\|_2^2$$

其中 \(E_i\) 为编码器，\(D_i\) 为解码器，\(\Phi\) 提取中间特征用于感知损失。

> ⚠️ **关键设计**：解码器训练**完全不涉及风格信息**，只需要能从特征准确重建图像即可。这使得同一组解码器可以处理任意风格。

**2. 白化变换（Whitening Transform）**

给定内容特征 \(f_c \in \mathbb{R}^{C \times HW}\)，白化的目的是去除特征通道之间的相关性（即去除原始风格信息）：

$$\hat{f}_c = E_c D_c^{-1/2} E_c^T f_c$$

其中 \(D_c\) 和 \(E_c\) 分别是内容特征协方差矩阵 \(f_c f_c^T\) 的特征值对角矩阵和特征向量矩阵。

> 💡 **直觉理解**：白化操作将特征变换到一个"无风格"的标准化空间，各通道变为不相关且方差为 1。这相当于"擦除"了内容图像的风格特征，只保留结构信息。

**3. 着色变换（Coloring Transform）**

将白化后的特征用风格特征的统计量进行着色：

$$\hat{f}_{cs} = E_s D_s^{1/2} E_s^T \hat{f}_c$$

其中 \(D_s\) 和 \(E_s\) 来自风格特征 \(f_s f_s^T\) 的特征分解。

> 💡 **直觉理解**：着色是白化的逆操作 — 将标准化空间中的特征"染上"风格图像的协方差结构。变换后的特征 \(\hat{f}_{cs}\) 拥有与风格特征相同的协方差矩阵，但保留了内容特征的空间结构。

**4. Alpha 混合与风格化强度控制**

$$f_{out} = \alpha \cdot \hat{f}_{cs} + (1 - \alpha) \cdot f_c$$

当 \(\alpha = 1\) 时为完全风格化，\(\alpha = 0\) 时保持原始内容。用户可以通过调节 \(\alpha\) 在内容保持和风格迁移之间取得平衡。

**5. 多级 Coarse-to-Fine 流水线**

单层 WCT 只能捕获对应层级的特征模式。为了同时获得全局风格结构和局部纹理细节，WCT 采用从 Relu\_5\_1 到 Relu\_1\_1 的**五级串联流水线**：

- **Relu\_5\_1**（最粗层）：捕获全局语义和大尺度风格结构
- **Relu\_4\_1 → Relu\_3\_1**：中间层级的纹理模式
- **Relu\_2\_1 → Relu\_1\_1**（最细层）：精细纹理和颜色细节

每一级的输出作为下一级的输入内容图像，逐步细化风格化效果。

![多级风格化中间结果](https://ar5iv.labs.arxiv.org/html/1705.08086/assets/figs/step/05_5.jpg)
![多级风格化 Relu5+4](https://ar5iv.labs.arxiv.org/html/1705.08086/assets/figs/step/05_54.jpg)
![多级风格化 Relu5→1完整结果](https://ar5iv.labs.arxiv.org/html/1705.08086/assets/figs/step/05_54321.jpg)
*图：多级 Coarse-to-Fine 风格化的中间结果。从左到右：仅 Relu\_5\_1 → Relu\_5+4 → Relu\_5→1 完整流水线，逐步增加纹理细节*

##### 与传统方法的关键区别

| 特性 | Gatys 优化方法 | 前馈网络方法 | WCT |
|------|---------------|-------------|-----|
| 速度 | 慢（迭代优化） | 快（单次前向） | 快（单次前向 + SVD） |
| 通用性 | 任意风格 | 单一风格/网络 | **任意风格** |
| 训练需求 | 无需训练 | 每种风格需训练 | **仅训练解码器（与风格无关）** |
| 风格化机制 | Gram 矩阵匹配 | 隐式学习 | **显式特征统计变换** |
| 控制灵活性 | 权重调节 | 有限 | Alpha 混合 + 多级控制 |

> 💡 **WCT 的核心优势**：将"学习风格化"转变为"学习特征重建 + 显式统计变换"，实现了通用性与效率的统一。

#### 🧪 练习题
```yaml
question: "WCT 方法中白化变换的主要作用是什么？"
options:
  - "增强内容特征的风格信息以便更好地融合"
  - "去除内容特征中的风格相关统计信息，将特征映射到标准化空间"
  - "直接将内容特征变换为风格特征的分布"
  - "降低特征维度以加速后续的着色计算"
answer: 1
explain: "白化通过 E_c D_c^{-1/2} E_c^T 将特征协方差矩阵变为单位矩阵，去除通道间相关性（即原始风格信息），为后续着色变换提供'无风格'的中间表示。"
```

### Pix2Pix

```yaml
id: pix2pix
num: 11
name: Pix2Pix
full_name: 像素到像素 (Pix2Pix)
year: '2017'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/1611.07004
project_url: ''
category: controllable_gen
motivation: 条件GAN实现成对图像翻译
```

#### 📝 一句话总结
Pix2Pix 提出了一个基于条件 GAN 的通用图像到图像翻译框架，通过 U-Net 生成器与 PatchGAN 判别器的组合，配合 cGAN + L1 联合损失，在语义分割图→照片、边缘图→照片、黑白→彩色等多种成对图像翻译任务上均取得了高质量结果，证明了条件 GAN 作为图像翻译通用方案的可行性。

#### 🎯 核心要点
- **通用条件 GAN 框架**：将图像到图像翻译统一建模为条件 GAN 问题，同一架构无需针对不同任务做特殊设计
- **U-Net 生成器**：在编码器-解码器基础上添加跳跃连接（skip connections），保留低层细节信息，避免信息瓶颈
- **PatchGAN 判别器**：仅在 \(N \times N\) 局部图像块上判断真假（默认 70×70），捕捉高频纹理结构，参数更少、速度更快，可应用于任意尺寸图像
- **cGAN + L1 联合损失**：cGAN 损失负责高频细节的真实感，L1 损失负责低频结构的正确性，两者互补
- **噪声注入策略**：发现生成器会忽略显式输入的随机噪声 \(z\)，改用 dropout 在训练和测试时注入随机性
- **广泛的任务验证**：在语义标签↔照片、建筑标签→照片、地图↔航拍、黑白→彩色、边缘→照片、白天→夜晚等 9 类任务上验证了方法的通用性

#### 🔬 深入细节
##### 问题定义与动机

传统的图像翻译方法针对每个任务都需要设计专门的损失函数和网络结构。例如，超分辨率用感知损失，着色用分类损失，语义分割用交叉熵损失。Pix2Pix 的核心洞察是：**条件 GAN 可以作为一种"学习损失函数"的通用框架**——判别器自动学习区分生成图像与真实图像的标准，无需人工设计任务特定的损失。

![Pix2Pix 多任务概览](https://ar5iv.labs.arxiv.org/html/1611.07004/assets/x1.png)
*图 1：Pix2Pix 在多种图像翻译任务上的结果，包括标签→街景、标签→立面、黑白→彩色、航拍→地图、白天→夜晚、边缘→照片等*

##### 训练框架

![cGAN 训练流程](https://ar5iv.labs.arxiv.org/html/1611.07004/assets/x2.png)
*图 2：条件 GAN 训练流程。生成器 G 接收输入图像 x 生成 G(x)，判别器 D 同时观察输入 x 和输出（真实 y 或生成 G(x)），判断真假*

与标准 GAN 学习 \(G: z \rightarrow y\) 不同，条件 GAN 学习 \(G: \{x, z\} \rightarrow y\)，其中 \(x\) 是条件输入图像，\(z\) 是随机噪声。判别器 \(D\) 同时接收 \(x\) 和输出图像，判断该对是否为真实配对。

##### 损失函数设计

Pix2Pix 的最终目标函数由两部分组成：

**条件 GAN 损失**（对抗损失）：

$$\mathcal{L}_{cGAN}(G, D) = \mathbb{E}_{x,y}[\log D(x, y)] + \mathbb{E}_{x,z}[\log(1 - D(x, G(x, z)))]$$

**L1 重建损失**：

$$\mathcal{L}_{L1}(G) = \mathbb{E}_{x,y,z}[\|y - G(x, z)\|_1]$$

**最终联合目标**：

$$G^* = \arg\min_G \max_D \; \mathcal{L}_{cGAN}(G, D) + \lambda \mathcal{L}_{L1}(G)$$

> 💡 **关键设计直觉**：L1 损失倾向于产生模糊但结构正确的结果（负责低频），cGAN 损失则驱动生成器产生锐利、真实的纹理细节（负责高频）。两者互补，缺一不可。实验中 \(\lambda = 100\)。

> ⚠️ **注意**：论文选择 L1 而非 L2 距离，因为 L2 会导致更严重的模糊（L2 对大误差惩罚更重，倾向于回归均值）。

##### 生成器架构：U-Net

![U-Net vs Encoder-Decoder](https://ar5iv.labs.arxiv.org/html/1611.07004/assets/x3.png)
*图 3：两种生成器架构对比。左：标准编码器-解码器；右：U-Net，添加了对称层之间的跳跃连接*

图像翻译任务中，输入和输出共享大量底层结构信息（如边缘位置、整体布局）。标准编码器-解码器必须将所有信息压缩到瓶颈层再解码，导致细节丢失。U-Net 通过在编码器第 \(i\) 层和解码器第 \(n-i\) 层之间添加跳跃连接，直接传递低层特征（边缘、纹理等），让解码器同时利用高层语义和低层细节。

具体结构为 8 层编码器 + 8 层解码器，每层使用 Convolution-BatchNorm-ReLU 模块。跳跃连接通过 concatenation 实现（将编码器特征图与解码器特征图在通道维度拼接）。

##### 判别器架构：PatchGAN

传统 GAN 判别器输出一个标量（整张图像的真/假概率）。PatchGAN 的核心创新是：**判别器只在局部 \(N \times N\) 图像块上判断真假**，然后对所有块的响应取平均。

这一设计基于以下观察：
- L1 损失已经能很好地约束低频结构的正确性
- GAN 判别器只需要关注**高频纹理细节**
- 高频结构本质上是局部的，不需要全局感受野

论文实验了不同的 patch 尺寸：1×1（PixelGAN）、16×16、70×70、286×286（全图）。**70×70 PatchGAN 取得了最佳效果**，既能产生锐利的纹理，又避免了全图判别器的过多参数和伪影。

> 💡 **关键洞察**：PatchGAN 本质上将图像建模为马尔可夫随机场（MRF），假设超过 patch 直径距离的像素之间相互独立。这与纹理/风格建模中的常见假设一致，因此 PatchGAN 可以理解为一种**纹理/风格损失**。

##### 训练伪代码

```python
# Pix2Pix 训练伪代码
G = UNetGenerator()       # U-Net 生成器
D = PatchGANDiscriminator()  # 70x70 PatchGAN 判别器
optimizer_G = Adam(G.parameters(), lr=0.0002, betas=(0.5, 0.999))
optimizer_D = Adam(D.parameters(), lr=0.0002, betas=(0.5, 0.999))
lambda_L1 = 100

for epoch in range(num_epochs):
    for x, y in dataloader:  # x: 输入图像, y: 目标图像
        # --- 训练判别器 D ---
        fake = G(x)                          # 生成假图
        pred_real = D(x, y)                  # D 判断真实对
        pred_fake = D(x, fake.detach())      # D 判断生成对
        loss_D = 0.5 * (BCE(pred_real, 1) + BCE(pred_fake, 0))
        optimizer_D.step(loss_D)             # D 的损失除以 2 减缓学习

        # --- 训练生成器 G ---
        pred_fake = D(x, fake)               # D 重新评估
        loss_G_cGAN = BCE(pred_fake, 1)      # 欺骗 D（最大化 log D）
        loss_G_L1 = L1_loss(fake, y)         # L1 重建
        loss_G = loss_G_cGAN + lambda_L1 * loss_G_L1
        optimizer_G.step(loss_G)
```

##### 噪声与随机性

条件 GAN 理论上需要噪声输入 \(z\) 来建模输出的多样性。然而作者发现生成器会学会**忽略**显式输入的高斯噪声 \(z\)，这与 Mathieu et al. 的发现一致。最终方案是通过 **dropout**（在生成器的多个层上，训练和测试时均启用）注入随机性。但作者承认输出的随机性仍然有限，如何让条件 GAN 产生高度多样化的输出仍是开放问题。

##### 推理时的特殊处理

推理时保持与训练完全一致的行为：
- **Dropout 保持开启**（不同于常规做法）
- **Batch Normalization 使用测试 batch 的统计量**而非训练集的累积统计量（batch size=1 时等价于 Instance Normalization）

##### 损失函数消融实验

![损失函数消融](https://ar5iv.labs.arxiv.org/html/1611.07004/assets/x4.png)
*图 4：不同损失函数组合的效果对比。仅 L1 产生模糊结果；仅 cGAN 产生锐利但有伪影的结果；L1 + cGAN 兼具结构正确性和纹理真实感*

实验表明：
- 仅 L1：结构合理但模糊
- 仅 cGAN：纹理锐利但颜色/结构可能出错
- **L1 + cGAN**：最佳组合，兼具两者优势
- 条件判别器（观察 x）优于无条件判别器

#### 🧪 练习题
```yaml
question: "Pix2Pix 中 PatchGAN 判别器的核心设计思想是什么？"
options:
  - "在整张图像上输出单一真假概率，提升全局一致性"
  - "仅在局部图像块上判断真假，专注于高频纹理结构"
  - "使用多尺度金字塔结构，同时捕捉低频和高频信息"
  - "将判别器替换为预训练分类网络的感知损失"
answer: 1
explain: "PatchGAN 仅在 N×N 局部块上判断真假并取平均，因为 L1 损失已约束低频结构，判别器只需关注局部高频纹理，这使其参数更少、速度更快且可处理任意尺寸图像。"
```

### CycleGAN

```yaml
id: cyclegan
num: 12
name: CycleGAN
full_name: 循环生成网络 (CycleGAN)
year: '2017'
org: UC Berkeley
parent: pix2pix
paper_url: https://arxiv.org/abs/1703.10593
project_url: ''
category: controllable_gen
motivation: 循环一致性损失无配对翻译
```

#### 📝 一句话总结
CycleGAN 的核心目标是：循环一致性损失无配对翻译。

#### 🎯 核心要点
- 核心动机：循环一致性损失无配对翻译
- 演化来源：继承或改进自 pix2pix
- 代表机构：UC Berkeley

#### 🔬 深入细节
循环一致性损失无配对翻译


### StyleGAN

```yaml
id: stylegan
num: 13
name: StyleGAN
full_name: 风格生成网络 (StyleGAN)
year: '2019'
org: NVIDIA
parent: —
paper_url: https://arxiv.org/abs/1812.04948
project_url: ''
category: controllable_gen
motivation: 风格调制生成架构
```

#### 📝 一句话总结
StyleGAN 提出了一种基于样式（Style）的生成器架构，通过映射网络（Mapping Network）将隐码映射到中间潜在空间 \(\mathcal{W}\)，再利用自适应实例归一化（AdaIN）在各分辨率层级注入"风格"信息，从而实现对生成图像从粗粒度（姿态、脸型）到细粒度（肤色、发丝）的层级化、解纠缠控制，同时引入随机噪声注入机制来建模随机细节变化。

#### 🎯 核心要点
- **映射网络（Mapping Network）**：8 层全连接 MLP 将输入隐码 \(\mathbf{z} \in \mathcal{Z}\) 映射为中间隐码 \(\mathbf{w} \in \mathcal{W}\)，解纠缠潜在空间
- **自适应实例归一化（AdaIN）**：通过学习到的仿射变换将 \(\mathbf{w}\) 转化为每层的缩放/偏移参数，注入合成网络各层实现风格调制
- **常量输入替代随机输入**：生成器从学习到的 \(4 \times 4 \times 512\) 常量开始合成，不再依赖传统的随机隐码直接输入
- **逐层噪声注入**：每个卷积层后添加独立的高斯噪声，建模头发丝、毛孔等随机性细节
- **风格混合正则化（Style Mixing）**：训练时以一定概率使用两个不同的 \(\mathbf{w}\) 向量分别控制不同层级，防止相邻层风格相关性过高
- **截断技巧（Truncation Trick）**：在 \(\mathcal{W}\) 空间中对偏离均值过远的样本进行截断，平衡生成质量与多样性
- **FFHQ 数据集**：发布了包含 70,000 张 \(1024 \times 1024\) 高质量人脸图像的新数据集
- **解纠缠度量**：提出感知路径长度（PPL）和线性可分性两个定量指标评估潜在空间的解纠缠程度

#### 🔬 深入细节
##### 核心架构示意图

![StyleGAN 生成器架构](https://ar5iv.labs.arxiv.org/html/1812.04948/assets/x1.png)
*图：(a) 传统 GAN 生成器直接将隐码 z 送入网络；(b) StyleGAN 生成器通过映射网络 f 将 z 映射为 w，再通过学习到的仿射变换 A 在每层以 AdaIN 方式注入风格，同时在每层注入独立噪声 B。*

##### 算法伪代码

```python
# StyleGAN 生成器前向传播伪代码
def StyleGenerator(z, noise_inputs):
    # 1. 映射网络：z → w
    w = MappingNetwork(z)  # 8层MLP, z∈R^512 → w∈R^512
    
    # 2. 截断技巧（推理时）
    w_avg = ExponentialMovingAverage(w)  # 训练中维护 w 均值
    w = w_avg + psi * (w - w_avg)        # ψ∈[0,1] 控制截断强度
    
    # 3. 从学习到的常量开始合成
    x = learned_constant  # 4×4×512
    
    # 4. 逐层合成（4×4 → 8×8 → ... → 1024×1024）
    for layer_idx in range(num_layers):
        # 上采样（除第一层外）
        if layer_idx > 0:
            x = upsample(x)
        
        # 卷积
        x = conv(x)
        
        # 噪声注入：逐通道缩放的高斯噪声
        x = x + B[layer_idx] * noise_inputs[layer_idx]
        
        # AdaIN 风格调制
        y_s, y_b = AffineTransform(w)  # w → (scale, bias)
        x = AdaIN(x, y_s, y_b)
        # AdaIN(x_i) = y_{s,i} * (x_i - μ(x_i)) / σ(x_i) + y_{b,i}
    
    return to_rgb(x)
```

##### 动机与背景

传统 GAN 生成器（如 ProGAN）将随机隐码 \(\mathbf{z}\) 直接通过输入层送入网络，这种设计存在两个根本问题：

1. **潜在空间纠缠**：输入空间 \(\mathcal{Z}\) 必须服从训练数据的概率密度分布，导致不同语义属性（如性别、年龄、发色）在 \(\mathcal{Z}\) 中不可避免地纠缠在一起。例如，当训练数据中长发与女性高度相关时，\(\mathcal{Z}\) 空间中这两个属性就会耦合。
2. **缺乏层级控制**：所有语义信息通过单一输入点注入，无法对不同抽象层级的属性进行独立控制。

StyleGAN 的核心洞察是：**将"风格"概念引入生成器设计**，借鉴风格迁移（Style Transfer）中 AdaIN 的成功经验，让每一层的特征统计量（均值和方差）携带不同层级的语义信息。

##### 核心机制详解

**1. 映射网络（Mapping Network）**

映射网络 \(f: \mathcal{Z} \rightarrow \mathcal{W}\) 是一个 8 层全连接网络，每层 512 维，使用 Leaky ReLU 激活。其关键作用是将服从均匀/正态分布的 \(\mathbf{z}\) 映射到一个**不需要服从固定分布**的中间空间 \(\mathcal{W}\)。

> 💡 **关键直觉**：\(\mathcal{Z}\) 空间受制于采样分布（如正态分布），其形状是固定的超球面，必须"弯曲"自身来匹配训练数据分布，导致纠缠。而 \(\mathcal{W}\) 空间没有这个约束，可以自由学习一个更"展开"的表示，使得不同变化因子对应线性子空间。

**2. 自适应实例归一化（AdaIN）**

每个合成层中，中间隐码 \(\mathbf{w}\) 通过一个学习到的仿射变换 \(A\) 生成该层的风格参数 \((\mathbf{y}_s, \mathbf{y}_b)\)，然后通过 AdaIN 注入：

$$\text{AdaIN}(\mathbf{x}_i, \mathbf{y}) = y_{s,i} \frac{\mathbf{x}_i - \mu(\mathbf{x}_i)}{\sigma(\mathbf{x}_i)} + y_{b,i}$$

其中 \(\mathbf{x}_i\) 是第 \(i\) 个特征图，\(\mu\) 和 \(\sigma\) 分别计算其空间均值和标准差。这一机制的本质是：**先通过归一化"擦除"上一层的风格信息，再通过缩放和偏移"写入"新的风格**。

不同分辨率层级控制不同粒度的属性：
- **粗粒度层（4×4 — 8×8）**：控制姿态、脸型、眼镜等高层语义
- **中粒度层（16×16 — 32×32）**：控制面部特征、发型、眼睛睁闭
- **细粒度层（64×64 — 1024×1024）**：控制颜色方案（肤色、发色）和微观结构

**3. 随机噪声注入**

在每个卷积层之后，StyleGAN 注入独立的逐像素高斯噪声，通过可学习的逐通道缩放因子 \(B\) 控制噪声强度：

$$\mathbf{x}' = \mathbf{x} + B \cdot \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})$$

> 💡 **关键直觉**：噪声只影响随机性的视觉细节（如头发的精确位置、毛孔、背景纹理），而不影响高层语义（如身份、姿态）。这是因为判别器对这些随机变化施加了一致性约束——改变噪声不应改变"这是谁"。

**4. 风格混合正则化（Style Mixing Regularization）**

训练时，以一定概率使用两个隐码 \(\mathbf{z}_1, \mathbf{z}_2\) 生成对应的 \(\mathbf{w}_1, \mathbf{w}_2\)，在随机选择的交叉点之前使用 \(\mathbf{w}_1\)，之后使用 \(\mathbf{w}_2\)。这一正则化防止网络假设相邻层的风格是相关的，从而改善各层风格的局部化。

![风格混合效果](https://ar5iv.labs.arxiv.org/html/1812.04948/assets/figures/Stylemix/seed888-coarse-var639.jpg)
*图：风格混合示例——将一个源图像的粗粒度风格（姿态、脸型）与另一个源图像的细粒度风格（颜色、纹理）组合。*

**5. 截断技巧（Truncation Trick in \(\mathcal{W}\)）**

低概率密度区域的 \(\mathbf{w}\) 往往对应训练数据中罕见的样本组合，生成质量较差。截断技巧通过将 \(\mathbf{w}\) 拉向均值来提升质量：

$$\mathbf{w}' = \bar{\mathbf{w}} + \psi (\mathbf{w} - \bar{\mathbf{w}})$$

其中 \(\bar{\mathbf{w}} = \mathbb{E}_{\mathbf{z}}[f(\mathbf{z})]\) 是 \(\mathcal{W}\) 空间的均值，\(\psi < 1\) 控制截断强度。\(\psi = 0\) 时所有图像收敛到"平均脸"，\(\psi = 1\) 时无截断。实践中只对低分辨率层（控制高层语义的层）应用截断，高分辨率层保持不变。

##### 解纠缠度量

StyleGAN 提出了两个定量指标来衡量潜在空间的解纠缠程度：

**感知路径长度（Perceptual Path Length, PPL）**：衡量在潜在空间中沿小步插值时，生成图像在感知上的变化是否均匀。解纠缠的空间应该具有更短的路径长度：

$$l_{\mathcal{W}} = \mathbb{E}\left[\frac{1}{\epsilon^2} d\big(G(f(\text{lerp}(\mathbf{z}_1, \mathbf{z}_2, t))),\; G(f(\text{lerp}(\mathbf{z}_1, \mathbf{z}_2, t+\epsilon)))\big)\right]$$

其中 \(d(\cdot, \cdot)\) 使用 VGG16 的感知距离。

**线性可分性（Linear Separability）**：训练线性 SVM 在潜在空间中分类二元属性（如男/女），分类准确度越高说明该属性在潜在空间中越接近线性子空间，即解纠缠程度越高。

![解纠缠示意](https://ar5iv.labs.arxiv.org/html/1812.04948/assets/x2.png)
*图：传统输入空间 Z 与映射后的中间空间 W 的解纠缠对比示意。*

##### 与传统方法的区别

| 特性 | 传统 GAN (ProGAN) | StyleGAN |
|------|-------------------|----------|
| 输入方式 | \(\mathbf{z}\) 直接送入第一层 | 常量输入 + \(\mathbf{w}\) 通过 AdaIN 逐层注入 |
| 潜在空间 | \(\mathcal{Z}\)（受采样分布约束） | \(\mathcal{W}\)（自由学习，更解纠缠） |
| 随机变化 | 完全由 \(\mathbf{z}\) 控制 | 由逐层噪声独立控制 |
| 属性控制 | 全局纠缠 | 层级化：粗/中/细粒度分离 |
| 风格混合 | 不支持 | 天然支持，可在任意层交换风格 |

> ⚠️ **注意**：StyleGAN 的判别器和训练损失函数（WGAN-GP / R1 正则化）与 ProGAN 相同，所有改进都集中在生成器架构上。这说明生成器的架构设计对 GAN 的生成质量有决定性影响。

#### 🧪 练习题
```yaml
question: "StyleGAN 中映射网络（Mapping Network）的主要作用是什么？"
options:
  - "将图像编码为隐码，用于图像重建"
  - "将隐码 z 映射到中间空间 W，获得更解纠缠的表示"
  - "对生成图像进行判别，区分真假"
  - "直接生成最终的 RGB 图像像素"
answer: 1
explain: "映射网络是一个 8 层 MLP，将服从固定分布的 z 映射到不受分布约束的中间空间 W，使得不同语义属性更容易线性分离（解纠缠），从而实现更好的属性控制。"
```

### Image2StyleGAN

```yaml
id: image2stylegan
num: 14
name: Image2StyleGAN
full_name: 图像到StyleGAN (Image2StyleGAN)
year: '2019'
org: KAUST
parent: stylegan
paper_url: https://arxiv.org/abs/1904.03189
project_url: ''
category: controllable_gen
motivation: GAN反演嵌入真实图像编辑
```

#### 📝 一句话总结
Image2StyleGAN 提出了一种基于优化的方法，将任意真实图像嵌入预训练 StyleGAN 的扩展潜空间 \(W+\)，从而实现高质量的图像重建与语义编辑（包括图像变形、风格迁移和表情迁移），是 GAN Inversion 领域的开创性工作。

#### 🎯 核心要点
- 提出将图像嵌入 StyleGAN 扩展潜空间 \(W+\)（每层独立的 \(w\) 向量），而非原始 \(Z\) 空间或单一 \(W\) 空间，显著提升重建质量
- 损失函数结合感知损失（VGG-16 特征匹配）和像素级 MSE 损失，平衡语义保真与像素精度
- 基于嵌入的潜码实现三大语义编辑操作：图像变形（Morphing）、风格迁移（Style Transfer）、表情迁移（Expression Transfer）
- 系统性分析了 StyleGAN 潜空间的性质：哪些图像可嵌入、如何嵌入、嵌入的语义意义
- 发现人脸图像嵌入具有最强语义意义，非人脸图像虽可高质量重建但语义编辑效果有限
- 对人脸使用平均脸潜码初始化优于随机初始化，非人脸图像则随机初始化更优
- 提出"crossover"实验揭示不同 StyleGAN 层控制不同语义属性（粗粒度 vs 细粒度）

#### 🔬 深入细节
##### 核心框架图

![Image2StyleGAN 嵌入结果总览](https://ar5iv.labs.arxiv.org/html/1904.03189/assets/pics/all_major.jpg)
*图 1：Image2StyleGAN 嵌入与编辑结果总览。第一行为原始图像，第二行为嵌入重建结果，后续行展示变形、风格迁移等编辑操作。*

![W 空间 vs W+ 空间嵌入对比](https://ar5iv.labs.arxiv.org/html/1904.03189/assets/pics/w_space-min.jpg)
*图 5：在 \(W\) 空间（左）和 \(W+\) 空间（右）中嵌入的对比。\(W+\) 空间能更精确地重建输入图像。*

##### 算法伪代码

```python
# Image2StyleGAN 嵌入算法伪代码
# 输入: 目标图像 I, 预训练 StyleGAN 生成器 G
# 输出: 嵌入的潜码 w+ ∈ W+

# 步骤 1: 初始化潜码
if is_face_image(I):
    w_init = mean_latent_code  # 平均脸潜码（从随机采样中计算均值）
else:
    w_init = sample_from_uniform(-1, 1, shape=(18, 512))  # 随机初始化

# 步骤 2: 将 w_init 复制到 W+ 空间的每一层
w_plus = [w_init.clone() for _ in range(num_layers)]  # 18 层，每层 512 维

# 步骤 3: 优化
optimizer = Adam(params=w_plus, lr=0.01, betas=(0.9, 0.999))
for step in range(5000):
    I_gen = G.forward(w_plus)  # 通过 StyleGAN 生成图像
    
    # 感知损失 (VGG-16 conv1_1, conv1_2, conv3_2, conv4_2)
    L_percep = sum(||F_l(I_gen) - F_l(I)||_1 for l in selected_layers)
    
    # 像素级 MSE 损失（仅在后 2000 步加入）
    if step >= 3000:
        L_mse = ||I_gen - I||_2^2
    else:
        L_mse = 0
    
    loss = L_percep + L_mse
    optimizer.step(loss)

return w_plus
```

##### 动机与背景

StyleGAN 能够生成极高质量的人脸图像，但其生成过程是从随机噪声出发的"正向"过程——给定潜码生成图像。**如何将一张已有的真实图像"反向"映射回 StyleGAN 的潜空间**，是实现真实图像编辑的关键问题，即 GAN Inversion。

传统的 GAN Inversion 方法主要有两类：(1) 训练一个编码器网络直接预测潜码，速度快但精度有限；(2) 基于优化的方法，直接在潜空间中搜索使生成图像与目标图像最匹配的潜码。Image2StyleGAN 采用后者，但关键创新在于**选择了正确的嵌入空间**。

> 💡 关键：StyleGAN 的架构特点是在不同分辨率层注入不同的 style 向量。如果所有层共享同一个 \(w\)（即 \(W\) 空间），表达能力受限；而 \(W+\) 空间允许每层使用独立的 \(w\) 向量，极大扩展了表示能力。

##### 核心机制：潜空间选择

论文系统比较了三种潜空间的嵌入效果：

1. **\(Z\) 空间**：原始高斯噪声空间，维度为 512。嵌入质量最差，因为 \(Z\) 到图像的映射高度非线性。
2. **\(W\) 空间**：经过 Mapping Network 变换后的空间，维度为 512。嵌入质量有所提升，但仍受限于单一向量。
3. **\(W+\) 空间**：扩展潜空间，维度为 \(18 \times 512 = 9216\)。StyleGAN 有 18 层 AdaIN，每层可接收独立的 style 向量。

$$W+ = \{(w_1, w_2, \ldots, w_{18}) \mid w_i \in \mathbb{R}^{512}\}$$

实验表明，\(W+\) 空间的嵌入在所有指标（MSE、感知损失、MS-SSIM）上均显著优于 \(Z\) 和 \(W\) 空间。

> ⚠️ 注意：\(W+\) 空间的高维度意味着它可以表示更多图像，但也意味着部分嵌入结果可能落在 StyleGAN 的"有效分布"之外，导致编辑操作的语义性下降。这是一个重建质量与编辑语义性之间的权衡。

##### 损失函数设计

嵌入优化使用两阶段损失函数：

**感知损失（Perceptual Loss）**：基于预训练 VGG-16 网络提取的多层特征，计算生成图像与目标图像在语义特征空间的 L1 距离：

$$\mathcal{L}_{\text{percep}}(I, \hat{I}) = \sum_{l \in \{1,2,3,4\}} \frac{1}{N_l} \|F_l(I) - F_l(\hat{I})\|_1$$

其中 \(F_l\) 表示 VGG-16 的第 \(l\) 层特征（conv1_1, conv1_2, conv3_2, conv4_2），\(N_l\) 为该层特征的元素数量。

**像素级 MSE 损失**：在优化后期（第 3000 步之后）加入，用于精细化像素级细节：

$$\mathcal{L}_{\text{pixel}}(I, \hat{I}) = \|I - \hat{I}\|_2^2$$

> 💡 关键：先用感知损失捕获全局语义结构，再用 MSE 损失微调像素细节。这种两阶段策略避免了 MSE 损失在早期主导优化导致陷入局部最优的问题。

##### 语义编辑操作

基于 \(W+\) 空间的嵌入，论文实现了三种编辑操作：

**1. 图像变形（Morphing）**：在两张图像的潜码之间进行线性插值：

$$w_{\text{morph}} = \alpha \cdot w_1^+ + (1 - \alpha) \cdot w_2^+, \quad \alpha \in [0, 1]$$

由于 \(W+\) 空间的平滑性，插值结果能产生自然的渐变过渡。

**2. 风格迁移（Style Transfer）**：利用 StyleGAN 不同层控制不同属性的特性，将一张图像的粗粒度层潜码与另一张图像的细粒度层潜码组合：

$$w_{\text{style}}^+ = (w_1^{1:k}, w_2^{k+1:18})$$

其中 \(w_1^{1:k}\) 取自内容图像的前 \(k\) 层，\(w_2^{k+1:18}\) 取自风格图像的后续层。粗粒度层（4×4 到 8×8）控制姿态、脸型等，细粒度层（64×64 到 1024×1024）控制颜色、纹理等。

**3. 表情迁移（Expression Transfer）**：计算表情变化的潜码差异并迁移到目标人脸：

$$w_{\text{expr}}^+ = w_{\text{target}}^+ + (w_{\text{source\_expr}}^+ - w_{\text{source\_neutral}}^+)$$

这种向量算术操作能有效地将微笑、惊讶等表情从一张脸迁移到另一张脸。

##### Crossover 实验与层级语义分析

![Crossover 实验](https://ar5iv.labs.arxiv.org/html/1904.03189/assets/pics/cartooon-min.jpg)
*图 6：Crossover 实验。将一张图像的前 k 层潜码与另一张图像的后续层潜码组合，揭示不同层控制的语义属性。*

论文设计了 crossover 实验：给定两张嵌入图像 A 和 B，生成图像使用 A 的前 \(k\) 层潜码和 B 的后 \(18-k\) 层潜码。实验发现：
- **层 1-3**（4×4 - 8×8）：控制粗粒度属性（姿态、脸型、整体结构）
- **层 4-8**（16×16 - 64×64）：控制中等粒度属性（面部特征、发型）
- **层 9-18**（128×128 - 1024×1024）：控制细粒度属性（颜色、光照、纹理细节）

##### 训练细节

- **优化器**：Adam，学习率 0.01，\(\beta_1 = 0.9\)，\(\beta_2 = 0.999\)，\(\epsilon = 10^{-8}\)
- **优化步数**：5000 步（人脸约 1000 步收敛，非人脸约 3000-5000 步）
- **硬件**：32GB NVIDIA TITAN V100 GPU，每张图像约 7 分钟
- **预训练模型**：StyleGAN（1024×1024 人脸模型，基于 FFHQ 数据集训练）
- **初始化策略**：人脸用平均潜码，非人脸用均匀分布随机采样

##### 与传统方法的区别

| 方面 | 传统 GAN Inversion | Image2StyleGAN |
|------|-------------------|----------------|
| 嵌入空间 | \(Z\) 空间 | \(W+\) 扩展空间 |
| 方法 | 编码器 / 简单优化 | 两阶段损失优化 |
| 图像类型 | 仅限训练域内 | 任意图像（跨域） |
| 编辑能力 | 有限 | 变形/风格迁移/表情迁移 |
| 重建质量 | 中等 | 高（尤其人脸） |

论文的一个重要发现是：**任何类型的图像**（人脸、猫、狗、汽车、绘画）都可以被高质量地嵌入到人脸 StyleGAN 的 \(W+\) 空间中，但只有人脸图像的嵌入具有语义意义（即编辑操作产生有意义的结果）。

#### 🧪 练习题
```yaml
question: "Image2StyleGAN 为什么选择 W+ 空间而非 W 空间进行图像嵌入？"
options:
  - "W+ 空间的优化速度更快"
  - "W+ 空间允许每层使用独立的 style 向量，表达能力更强，重建质量更高"
  - "W+ 空间的维度更低，更容易优化"
  - "W 空间无法用于 StyleGAN 的前向生成"
answer: 1
explain: "W+ 空间为 StyleGAN 的 18 个 AdaIN 层各分配独立的 512 维向量（共 9216 维），相比 W 空间的单一 512 维向量，表达能力大幅提升，能更精确地重建输入图像。"
```

### ControlNet

```yaml
id: controlnet
num: 15
name: ControlNet
full_name: 控制网 (ControlNet)
year: '2023'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/2302.05543
project_url: ''
category: controllable_gen
motivation: 可训练副本支路强空间控制
```

#### 📝 一句话总结
ControlNet 的核心目标是：可训练副本支路强空间控制。

#### 🎯 核心要点
- 核心动机：可训练副本支路强空间控制
- 代表机构：Stanford

#### 🔬 深入细节
可训练副本支路强空间控制


### Uni-ControlNet

```yaml
id: uni-controlnet
num: 16
name: Uni-ControlNet
full_name: 统一控制网 (Uni-ControlNet)
year: '2023'
org: Tsinghua/Microsoft
parent: controlnet
paper_url: https://arxiv.org/abs/2305.16322
project_url: ''
category: controllable_gen
motivation: 统一多条件控制框架
```

#### 📝 一句话总结
Uni-ControlNet 的核心目标是：统一多条件控制框架。

#### 🎯 核心要点
- 核心动机：统一多条件控制框架
- 演化来源：继承或改进自 controlnet
- 代表机构：Tsinghua/Microsoft

#### 🔬 深入细节
统一多条件控制框架


### T2I-Adapter

```yaml
id: t2i-adapter
num: 17
name: T2I-Adapter
full_name: 文生图适配器 (T2I-Adapter)
year: '2024'
org: Tencent ARC
parent: controlnet
paper_url: https://arxiv.org/abs/2302.08453
project_url: ''
category: controllable_gen
motivation: 轻量适配器多条件组合
```

#### 📝 一句话总结
T2I-Adapter 提出了一种轻量级适配器（约 77M 参数、300MB 存储），通过简单的特征加法将外部控制信号（草图、深度、分割、关键点、颜色等）注入预训练 Stable Diffusion 模型的 UNet 编码器，实现即插即用的精细可控生成，且多个适配器可通过加权求和自由组合，无需额外训练。

#### 🎯 核心要点
- **极轻量适配器架构**：仅 ~77M 参数（约为 SD 模型的 1/10），4 个特征提取块 + 3 个下采样块，使用 Pixel Unshuffle 将 512×512 输入快速降至 64×64
- **简单高效的特征注入**：适配器多尺度特征通过逐元素加法直接注入 UNet 编码器的 4 个分辨率层，无需修改原模型结构
- **多类型条件控制**：支持结构条件（sketch、canny edge、depth/MiDaS、segmentation、keypose/OpenPose）和颜色条件（空间颜色调色板）
- **适配器可组合性**：多个适配器的特征通过加权求和 \(F_c = \sum_k \omega_k \cdot F_{AD}^k(C_k)\) 组合，无需联合训练即可实现多条件控制
- **即插即用泛化性**：冻结 SD 参数仅训练适配器，可直接迁移到从同一基础模型微调的自定义模型（如 Anything V4.0）
- **非均匀时间步采样**：使用三次函数 \(t' = 1 - (1-t)^3\) 偏向早期去噪步骤，提升结构控制效果

#### 🔬 深入细节
##### 整体框架

![T2I-Adapter 整体架构图](https://ar5iv.labs.arxiv.org/html/2302.08453/assets/x2.png)
*图：T2I-Adapter 整体架构。左侧为参数冻结的预训练 Stable Diffusion 模型，右侧为多个可训练的 T2I-Adapter。不同适配器的特征可通过加权求和直接组合。右下角展示了适配器的详细网络结构。*

##### 背景与动机

预训练文本到图像（T2I）扩散模型（如 Stable Diffusion）虽然能生成高质量图像，但仅依靠文本提示难以精确控制生成结果的空间结构、颜色分布等细节。例如，用户可能希望生成的图像严格遵循某个草图的轮廓、某张深度图的空间布局或某个颜色方案。

现有方法要么需要对整个大模型进行微调（如 ControlNet，需复制完整的 UNet 编码器，参数量约 361M），要么通过文本反演（Textual Inversion）等方式在有限的文本嵌入空间中操作，表达能力受限。

T2I-Adapter 的核心思路是：**预训练 T2I 模型已经在其内部特征空间中编码了丰富的结构和颜色知识，只需要一个轻量级的"桥梁"将外部控制信号对齐到这个内部知识空间即可**。这种设计理念使得适配器可以非常小巧，同时保持强大的控制能力。

##### 适配器网络结构

T2I-Adapter 的网络结构设计简洁高效，核心目标是将条件图像 \(C\)（如草图、深度图等）编码为与 UNet 编码器各层匹配的多尺度特征。

**输入预处理 — Pixel Unshuffle：**

输入条件图像 \(C \in \mathbb{R}^{H \times W \times 3}\)（512×512×3）首先通过 Pixel Unshuffle 操作降采样 8 倍：

$$C_{down} = \text{PixelUnshuffle}(C, r=8) \in \mathbb{R}^{64 \times 64 \times 192}$$

Pixel Unshuffle 将空间维度的信息重排到通道维度，无信息损失且无需学习参数，比卷积下采样更高效。

**四级特征提取：**

每一级由 1 个卷积层 + 2 个残差块组成，相邻级之间通过步长为 2 的卷积进行下采样：

| 级别 | 输入分辨率 | 输出通道数 | 输出分辨率 |
|------|-----------|-----------|-----------|
| 第 1 级 | 64×64 | 320 | 64×64 |
| 第 2 级 | 32×32 | 640 | 32×32 |
| 第 3 级 | 16×16 | 1280 | 16×16 |
| 第 4 级 | 8×8 | 1280 | 8×8 |

这四级输出的通道数（320, 640, 1280, 1280）恰好与 Stable Diffusion UNet 编码器四个分辨率层的通道数一一对应。

**特征注入 — 逐元素加法：**

适配器输出的多尺度特征 \(F_c = \{f_c^1, f_c^2, f_c^3, f_c^4\}\) 通过最简单的逐元素加法注入 UNet 编码器：

$$F_{enc}^i = F_{enc}^i + f_c^i, \quad i = 1, 2, 3, 4$$

其中 \(F_{enc}^i\) 是 UNet 编码器第 \(i\) 层的中间特征。这种加法操作不引入任何额外参数，也不改变原始 UNet 的结构。

> 💡 **关键设计直觉**：加法注入之所以有效，是因为预训练 SD 模型的编码器特征已经包含了丰富的结构信息（如边缘、深度等），适配器只需要提供一个"偏移量"来引导这些特征朝着目标条件的方向调整。

##### 颜色适配器 — 空间调色板

对于颜色控制，T2I-Adapter 设计了一种"空间调色板"（Spatial Palette）表示：将输入图像下采样至极低分辨率（如 8×8 或 16×16），保留区域颜色分布但去除结构细节。这种表示：

1. 保留了空间颜色布局信息
2. 天然去除了高频结构信息，避免与结构适配器冲突
3. 可以由用户手动绘制简单的颜色块来指定

颜色适配器的网络结构与结构适配器类似，但输入是低分辨率的颜色调色板。

##### 多适配器组合

T2I-Adapter 的一个重要特性是多个适配器可以自由组合，无需联合训练。给定 \(K\) 个适配器和对应的条件输入 \(\{C_k\}_{k=1}^K\)，组合特征为：

$$F_c = \sum_{k=1}^{K} \omega_k \cdot F_{AD}^k(C_k)$$

其中 \(\omega_k\) 是每个适配器的权重系数，用户可以手动调节以平衡不同条件的影响力。例如，可以同时使用草图适配器控制结构 + 颜色适配器控制色彩，生成既符合轮廓又符合配色的图像。

> ⚠️ **注意**：这种组合之所以可行，是因为所有适配器都独立训练并通过加法注入同一个冻结的 UNet。加法的交换律和结合律保证了组合的数学一致性。

##### 训练策略

```python
# T2I-Adapter 训练伪代码
# 冻结 Stable Diffusion 全部参数，仅优化 Adapter
for x, text, condition in dataloader:
    # 1. 编码图像到潜空间
    z = VAE_encode(x)  # z ∈ R^{64×64×4}
    
    # 2. 采样时间步（非均匀三次分布）
    t_uniform = uniform(0, 1)
    t = 1 - (1 - t_uniform) ** 3  # 偏向早期步骤
    
    # 3. 前向扩散加噪
    noise = randn_like(z)
    z_t = sqrt(alpha_bar_t) * z + sqrt(1 - alpha_bar_t) * noise
    
    # 4. 适配器提取条件特征
    F_c = Adapter(condition)  # 输出 4 个尺度的特征
    
    # 5. UNet 预测噪声（注入适配器特征）
    noise_pred = UNet(z_t, t, text_emb, adapter_features=F_c)
    
    # 6. 计算损失并更新适配器参数
    loss = MSE(noise_pred, noise)
    loss.backward()  # 梯度仅流过 Adapter
    optimizer.step()
```

**非均匀时间步采样**：训练时使用三次函数 \(t' = 1 - (1-t)^3\) 对时间步进行重映射，使采样偏向较大的 \(t\) 值（即去噪早期阶段）。这是因为扩散模型在早期步骤主要确定全局结构，而适配器的结构控制信号正是在这个阶段发挥最大作用。

##### 与 ControlNet 的对比

| 特性 | T2I-Adapter | ControlNet |
|------|------------|------------|
| 额外参数量 | ~77M | ~361M（复制完整编码器） |
| 存储开销 | ~300MB | ~1.4GB |
| 注入方式 | 加法注入编码器 | 零卷积连接编码器+解码器 |
| 训练数据 | 较少即可收敛 | 需要较多数据 |
| 多条件组合 | 原生支持加权求和 | 需要额外设计 |
| 推理速度 | 几乎无额外开销 | 约增加 50% 计算量 |
| 控制精度 | 略低于 ControlNet | 更精确 |

##### 实验结果

在语义分割引导生成任务上，T2I-Adapter 在 COCO-Stuff 数据集上取得了 FID 16.78，显著优于 SPADE（23.44）和 PITI（24.15）等方法，同时 mIoU 达到 42.38，验证了生成图像与输入分割图的语义一致性。

在草图引导生成中，T2I-Adapter 在保持文本语义的同时，能够准确遵循输入草图的轮廓结构。在深度和关键点引导场景中同样展现出良好的控制效果。

多适配器组合实验表明，草图+颜色、深度+颜色等组合能够同时控制结构和色彩，且通过调节权重 \(\omega_k\) 可以灵活平衡各条件的影响程度。

#### 🧪 练习题
```yaml
question: "T2I-Adapter 将适配器特征注入 Stable Diffusion UNet 的方式是什么？"
options:
  - "通过交叉注意力机制将条件特征作为额外的 key/value 注入"
  - "通过零卷积（zero convolution）连接到 UNet 的跳跃连接"
  - "通过逐元素加法直接加到 UNet 编码器的多尺度特征上"
  - "通过拼接（concatenation）将条件特征与噪声潜变量合并后输入 UNet"
answer: 2
explain: "T2I-Adapter 采用最简单的逐元素加法，将适配器输出的 4 个尺度特征直接加到 UNet 编码器对应层的中间特征上，不引入额外参数也不改变原始 UNet 结构。"
```

### DC-ControlNet

```yaml
id: dc-controlnet
num: 18
name: DC-ControlNet
full_name: 解耦控制网 (DC-ControlNet)
year: '2026'
org: 360 AI
parent: controlnet
paper_url: https://arxiv.org/abs/2601.00000
project_url: ''
category: controllable_gen
motivation: 解耦元素级多条件控制
```

#### 📝 一句话总结
DC-ControlNet 的核心目标是：解耦元素级多条件控制。

#### 🎯 核心要点
- 核心动机：解耦元素级多条件控制
- 演化来源：继承或改进自 controlnet
- 代表机构：360 AI

#### 🔬 深入细节
解耦元素级多条件控制


### RelaCtrl

```yaml
id: relactrl
num: 19
name: RelaCtrl
full_name: 相关性控制 (RelaCtrl)
year: '2026'
org: —
parent: controlnet
paper_url: https://arxiv.org/abs/2601.00001
project_url: ''
category: controllable_gen
motivation: 相关性引导减15%参数高效控制
```

#### 📝 一句话总结
RelaCtrl 的核心目标是：相关性引导减15%参数高效控制。

#### 🎯 核心要点
- 核心动机：相关性引导减15%参数高效控制
- 演化来源：继承或改进自 controlnet
- 代表机构：—

#### 🔬 深入细节
相关性引导减15%参数高效控制


### PI-Light

```yaml
id: pi-light
num: 20
name: PI-Light
full_name: 物理启发重光照 (PI-Light)
year: '2026'
org: MMLab@NTU
parent: —
paper_url: https://arxiv.org/abs/2601.00002
project_url: ''
category: controllable_gen
motivation: 物理启发扩散模型重光照
```

#### 📝 一句话总结
PI-Light 的核心目标是：物理启发扩散模型重光照。

#### 🎯 核心要点
- 核心动机：物理启发扩散模型重光照
- 代表机构：MMLab@NTU

#### 🔬 深入细节
物理启发扩散模型重光照


### IP-Adapter

```yaml
id: ip-adapter
num: 21
name: IP-Adapter
full_name: 图像提示适配器 (IP-Adapter)
year: '2023'
org: Tencent
parent: controlnet
paper_url: https://arxiv.org/abs/2308.06721
project_url: ''
category: identity_preserve
motivation: 解耦交叉注意力图像提示
```

#### 📝 一句话总结
IP-Adapter 的核心目标是：解耦交叉注意力图像提示。

#### 🎯 核心要点
- 核心动机：解耦交叉注意力图像提示
- 演化来源：继承或改进自 controlnet
- 代表机构：Tencent

#### 🔬 深入细节
解耦交叉注意力图像提示


### PhotoMaker

```yaml
id: photomaker
num: 22
name: PhotoMaker
full_name: 照片生成器 (PhotoMaker)
year: '2024'
org: Tencent
parent: ip-adapter
paper_url: https://arxiv.org/abs/2312.04461
project_url: ''
category: identity_preserve
motivation: 堆叠ID嵌入多参考图融合
```

#### 📝 一句话总结
PhotoMaker 提出了 **Stacked ID Embedding** 机制，将多张参考人脸图像的 CLIP 特征与文本类别词嵌入融合后堆叠，注入扩散模型的交叉注意力层，实现了无需 test-time fine-tuning 的高保真人物身份定制生成。

#### 🎯 核心要点
- **Stacked ID Embedding**：将多张参考图的 CLIP 图像特征分别与类别词（如 "man"/"woman"）文本嵌入通过 MLP 融合，再沿 token 维度堆叠，形成统一的身份表示
- **统一 ID 表示**：融合图像语义与文本语义，使模型同时保持身份保真度和文本可控性
- **Cross-Attention 注入**：用 Stacked ID Embedding 替换文本 prompt 中类别词对应位置的 token，直接参与 UNet 的交叉注意力计算
- **LoRA 微调策略**：仅在注意力层添加 LoRA 适配器，保持预训练 SDXL 的生成能力
- **ID-oriented 数据构建流水线**：自动化的名人图像采集→人脸检测→质量过滤→背景分割→字幕生成流程
- **多样化应用**：支持身份重上下文化、身份混合、风格迁移、年龄/性别变换等，无需额外训练
- **推理加速**：无需 test-time 微调，单次前向推理即可完成身份定制，比 DreamBooth 快数十倍

#### 🔬 深入细节
##### 整体架构

![PhotoMaker 架构总览](https://ar5iv.labs.arxiv.org/html/2312.04461/assets/x2.png)
*图：(a) PhotoMaker 整体框架——多张参考图经 CLIP 图像编码器提取特征后，与类别词嵌入融合并堆叠，替换 prompt 中对应位置后送入 UNet 交叉注意力；(b) ID-oriented 数据构建流水线。*

##### 算法伪代码

```python
# PhotoMaker 训练伪代码
# 输入: 同一身份的 1~4 张参考图 {I_1, ..., I_N}, 文本 prompt T (含类别词 c_class)
# 模型: CLIP ViT-L/14 图像编码器 (冻结), SDXL UNet (LoRA), MLP 融合层

# === 1. 构建 Stacked ID Embedding ===
for i in range(N):
    # 对参考图做人脸裁剪+背景 mask
    I_masked_i = face_crop_and_mask(I_i)
    # CLIP 图像编码 (取 CLS token + 最后一层 penultimate 特征)
    v_i = CLIP_image_encoder(I_masked_i)          # [1, D_img]
    # 获取类别词的文本嵌入
    t_class = text_encoder.get_embedding(c_class)  # [1, D_text]
    # MLP 融合: 将图像特征与文本嵌入合并
    s_i = MLP(concat(v_i, t_class))                # [1, D_text]

# 沿 token 维度堆叠
S_id = stack([s_1, s_2, ..., s_N], dim=1)          # [1, N, D_text]

# === 2. 替换文本嵌入中的类别词位置 ===
T_emb = text_encoder(T)                            # [1, L, D_text]
T_emb[class_pos] = S_id                            # 替换 → [1, L-1+N, D_text]

# === 3. 扩散模型训练 ===
t = random_timestep()
noise = randn_like(x_0)
x_t = add_noise(x_0, noise, t)
noise_pred = UNet_LoRA(x_t, t, T_emb)

# Masked diffusion loss: 仅在人脸区域加权
loss = MSE(noise_pred * face_mask, noise * face_mask)
loss.backward()
optimizer.step()
```

##### 核心机制详解

**1. 动机与背景**

现有的身份定制方法主要分为两类：(1) **test-time fine-tuning** 方法（如 DreamBooth、Textual Inversion），每个新身份需要数分钟到数十分钟的微调，实用性受限；(2) **encoder-based** 方法（如 IP-Adapter），虽然推理快速，但通常只支持单张参考图且身份保真度不足。PhotoMaker 的核心目标是：**在不需要 test-time 微调的前提下，利用多张参考图实现高保真身份保持**。

> 💡 关键洞察：将图像特征与文本类别词嵌入融合（而非简单拼接或替换），可以让身份信息"继承"文本空间的语义结构，从而在保持身份的同时不损失文本可控性。

**2. Stacked ID Embedding 机制**

这是 PhotoMaker 的核心创新。给定 \(N\) 张同一身份的参考图 \(\{I_1, I_2, \ldots, I_N\}\)，每张图经过以下处理：

**Step 1: 图像编码。** 使用冻结的 CLIP ViT-L/14 图像编码器提取特征：

$$\mathbf{v}_i = \text{CLIP}_{\text{img}}(I_i^{\text{masked}})$$

其中 \(I_i^{\text{masked}}\) 是经过人脸裁剪和背景分割后的图像，去除无关背景信息以聚焦身份特征。

**Step 2: 与类别词融合。** 获取 prompt 中类别词（如 "man"、"woman"）的文本嵌入 \(\mathbf{t}_{\text{class}}\)，通过 MLP 将图像特征与文本嵌入融合：

$$\mathbf{s}_i = \text{MLP}([\mathbf{v}_i; \mathbf{t}_{\text{class}}])$$

> ⚠️ 注意：这里的融合不是简单的加法或拼接后直接使用，而是通过可学习的 MLP 将两种模态的信息映射到统一的文本嵌入空间。类别词提供了"人物"的语义先验，图像特征提供了具体身份信息。

**Step 3: 堆叠。** 将所有融合后的嵌入沿 token 维度堆叠：

$$\mathbf{S}_{\text{id}} = [\mathbf{s}_1; \mathbf{s}_2; \ldots; \mathbf{s}_N] \in \mathbb{R}^{N \times D}$$

这个 Stacked ID Embedding 替换文本嵌入序列中类别词对应位置的 token。由于交叉注意力机制天然支持变长 key/value 序列，替换后序列长度从 \(L\) 变为 \(L - 1 + N\)，无需修改模型架构。

**3. 交叉注意力中的身份注入**

在 UNet 的交叉注意力层中，修改后的文本嵌入作为 key 和 value：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right) V$$

其中 \(Q\) 来自图像特征，\(K, V\) 来自包含 Stacked ID Embedding 的文本嵌入。身份信息通过注意力机制自然地融入生成过程。

**4. 训练策略**

- **基础模型**：SDXL（1024×1024 分辨率）
- **可训练参数**：MLP 融合层 + UNet 注意力层的 LoRA 适配器 + CLIP 图像编码器最后两层
- **训练数据**：每个样本包含同一身份的 1~4 张图像，训练时随机采样
- **Masked Diffusion Loss**：在人脸区域施加更高的损失权重，引导模型关注身份特征

$$\mathcal{L} = \mathbb{E}_{t, \epsilon}\left[\|\mathbf{M} \odot (\epsilon - \epsilon_\theta(\mathbf{x}_t, t, \mathbf{c}))\|^2\right]$$

其中 \(\mathbf{M}\) 是人脸区域的 mask（50% 概率启用），\(\mathbf{c}\) 是包含 Stacked ID Embedding 的条件信息。

- **Classifier-Free Guidance**：10% 概率将文本 prompt 置空，训练无条件生成能力
- **硬件**：8×A100 GPU，训练约 2 周；batch size 48，学习率 LoRA 部分 1e-4、其余 1e-5

**5. 推理技巧**

- **Delayed Subject Conditioning**：在去噪的前若干步不注入身份条件，让模型先建立整体构图，再逐步引入身份信息，提升生成质量和多样性
- **Identity Mixing**：输入不同身份的参考图，模型可以生成融合多个身份特征的新面孔
- **无需微调**：推理时仅需前向传播，50 步 DDIM 采样，CFG scale = 5

**6. 与先前方法的对比**

| 方法 | 需要微调 | 多参考图 | 推理速度 | 身份保真度 |
|------|---------|---------|---------|-----------|
| DreamBooth | ✅ (数分钟) | ❌ | 慢 | 高 |
| Textual Inversion | ✅ (数小时) | ❌ | 慢 | 中 |
| IP-Adapter | ❌ | ❌ (单图) | 快 | 中 |
| **PhotoMaker** | **❌** | **✅** | **快** | **高** |

![定性对比结果](https://ar5iv.labs.arxiv.org/html/2312.04461/assets/x3.png)
*图：与 IP-Adapter、InstantID 等方法的定性对比。PhotoMaker 在身份保真度和文本一致性上均表现优异。*

**7. 消融实验：堆叠 vs 其他融合策略**

![输入图片数量对指标的影响](https://ar5iv.labs.arxiv.org/html/2312.04461/assets/x7.png)
*图：输入参考图数量对 CLIP-I、DINO、CLIP-T 和 Face Similarity 指标的影响。更多参考图提升身份保真度（CLIP-I、DINO、Face Sim 上升），但文本一致性（CLIP-T）略有下降。*

消融实验表明：
- **Stacking > Averaging**：堆叠保留了每张参考图的独立信息，而平均会丢失细节
- **Stacking > Linear Projection**：线性投影将多图压缩为固定维度，信息损失更大
- **更多参考图 → 更高身份保真度**：但存在 ID 保真度与文本可控性的 trade-off

#### 🧪 练习题
```yaml
question: "PhotoMaker 中 Stacked ID Embedding 的核心操作是什么？"
options:
  - "将多张参考图的 CLIP 特征取平均后替换文本嵌入中的类别词"
  - "将每张参考图的 CLIP 特征与类别词嵌入融合后，沿 token 维度堆叠替换类别词位置"
  - "将参考图特征通过额外的交叉注意力层注入 UNet，不修改文本嵌入"
  - "将多张参考图拼接为一张大图后送入 CLIP 编码器"
answer: 1
explain: "PhotoMaker 的核心是将每张参考图的 CLIP 图像特征与类别词文本嵌入通过 MLP 融合，然后将 N 个融合嵌入沿 token 维度堆叠，替换文本序列中类别词的位置，利用交叉注意力的变长特性自然注入身份信息。"
```

### InstantID

```yaml
id: instantid
num: 23
name: InstantID
full_name: 即时身份 (InstantID)
year: '2024'
org: InstantX
parent: ip-adapter
paper_url: https://arxiv.org/abs/2401.07519
project_url: ''
category: identity_preserve
motivation: ControlNet+强身份零样本生成
```

#### 📝 一句话总结
InstantID 的核心目标是：ControlNet+强身份零样本生成。

#### 🎯 核心要点
- 核心动机：ControlNet+强身份零样本生成
- 演化来源：继承或改进自 ip-adapter
- 代表机构：InstantX

#### 🔬 深入细节
ControlNet+强身份零样本生成


### ConsistentID

```yaml
id: consistentid
num: 24
name: ConsistentID
full_name: 一致身份 (ConsistentID)
year: '2026'
org: —
parent: instantid
paper_url: https://arxiv.org/abs/2404.16771
project_url: ''
category: identity_preserve
motivation: 多模态细粒度身份保持
```

#### 📝 一句话总结
ConsistentID 提出了多模态面部提示生成器与 ID 保持网络两大模块，通过将面部分割为多个语义区域并分别提取视觉-文本多模态特征，结合面部注意力定位策略约束交叉注意力图与面部区域对齐，实现了仅需单张参考图、无需测试时微调的细粒度身份保持文本到图像生成。

#### 🎯 核心要点
- **多模态面部提示生成器**：包含细粒度多模态特征提取器和面部 ID 特征提取器两个子模块，分别捕获面部局部细节和全局身份信息
- **细粒度面部区域分割**：利用 BiSeNet 将面部分割为 5 个语义区域（面部轮廓、鼻子、眼睛、耳朵、嘴巴），每个区域独立编码
- **视觉-文本多模态融合**：对每个面部区域同时提取 CLIP 视觉特征和 LLaVA 生成的文本描述特征，通过 FacialEncoder 融合为统一的面部提示
- **ID 保持网络**：提出面部注意力定位策略（Facial Attention Localization Strategy），通过平衡 \(L_1\) 损失 \(\mathcal{L}_{loc}\) 约束交叉注意力图与面部分割掩码对齐
- **FGID 数据集**：构建包含 525,258 张面部图像的细粒度身份数据集，整合 FFHQ、CelebA、SFHQ 并添加多模态标注
- **FGIS 评估指标**：提出细粒度身份相似度（Fine-Grained Identity Similarity）指标，分区域评估面部身份保持质量
- **零样本推理**：基于 Stable Diffusion 1.5，仅需单张参考图即可生成身份一致的多样化图像，无需测试时微调

#### 🔬 深入细节
##### 整体框架

![ConsistentID 整体框架图](https://ar5iv.labs.arxiv.org/html/2404.16771/assets/x3.png)
*图：ConsistentID 整体框架。上方为多模态面部提示生成器（包含细粒度多模态特征提取器和面部 ID 特征提取器），下方为 ID 保持网络中的面部注意力定位策略。面部图像经 BiSeNet 分割后，各区域分别通过 CLIP 视觉编码和 LLaVA 文本描述编码，再由 FacialEncoder 融合后注入 UNet 的交叉注意力层。*

##### 背景与动机

个性化文本到图像生成（Personalized T2I Generation）旨在根据用户提供的参考图像生成保持特定身份的新图像。现有方法存在以下核心问题：

1. **测试时微调方法**（如 DreamBooth、Textual Inversion）需要针对每个新身份进行数分钟到数小时的微调，效率低下且容易过拟合，导致生成多样性不足。
2. **免微调方法**（如 IP-Adapter、PhotoMaker）虽然实现了零样本推理，但通常仅使用全局面部特征（如 ArcFace 嵌入），难以保留面部局部细节（如痣、疤痕、特定五官形状等），导致生成结果"形似而神不似"。
3. **现有方法缺乏对面部不同区域的精细化建模**，将整张面部作为单一特征处理，丢失了大量细粒度身份信息。

ConsistentID 的核心洞察是：**身份保持不仅需要全局面部 ID 特征，更需要对面部各局部区域进行细粒度的多模态（视觉+文本）特征提取和精确的空间定位**。

##### 多模态面部提示生成器（Multimodal Facial Prompt Generator）

该模块是 ConsistentID 的核心创新之一，包含两个并行的子模块：

**1. 细粒度多模态特征提取器（Fine-Grained Multimodal Feature Extractor）**

首先，使用预训练的 BiSeNet 对输入面部图像进行语义分割，将面部划分为 5 个关键区域：面部轮廓（facial contour）、鼻子（nose）、眼睛（eyes）、耳朵（ears）和嘴巴（mouth）。

对于每个区域 \(k\)，同时提取两种模态的特征：
- **视觉特征**：将裁剪后的区域图像送入 CLIP 视觉编码器，得到视觉嵌入 \(\mathbf{v}_k\)
- **文本特征**：利用多模态大语言模型 LLaVA-1.5 对每个区域生成自然语言描述（如"尖尖的鼻子"、"棕色的大眼睛"），再通过 CLIP 文本编码器得到文本嵌入 \(\mathbf{t}_k\)

随后，通过一个可训练的 **FacialEncoder**（基于 Transformer 架构）将所有区域的视觉和文本特征融合为统一的面部提示嵌入：

$$\mathbf{F}_{multi} = \text{FacialEncoder}(\{\mathbf{v}_k, \mathbf{t}_k\}_{k=1}^{5})$$

FacialEncoder 的设计参考了 IP-Adapter 中的解耦交叉注意力机制，使用独立的交叉注意力层将面部提示注入 UNet，避免干扰原始文本条件。

**2. 面部 ID 特征提取器（Facial ID Feature Extractor）**

与细粒度特征互补，该子模块使用预训练的 ArcFace 模型提取全局面部身份嵌入，并通过一个可训练的 MLP 投影层将其映射到与 CLIP 特征兼容的空间：

$$\mathbf{F}_{id} = \text{MLP}(\text{ArcFace}(\mathbf{I}_{face}))$$

两种特征通过拼接后共同注入 UNet 的交叉注意力层，实现全局身份一致性与局部细节保真的统一。

> 💡 **关键设计**：细粒度多模态特征捕获面部局部细节（"是什么样的鼻子"），而全局 ID 特征确保整体身份一致性（"是同一个人"），两者互补不可或缺。

##### ID 保持网络与面部注意力定位策略

仅通过特征注入并不能保证生成图像中面部各区域的精确空间对应。为此，ConsistentID 提出了**面部注意力定位策略（Facial Attention Localization Strategy）**。

核心思想是：**交叉注意力图中，面部相关 token 的注意力响应应当与对应的面部分割掩码在空间上对齐**。

具体而言，在 UNet 的交叉注意力层中，面部提示 token 会产生注意力图 \(\mathbf{A} \in \mathbb{R}^{H \times W}\)。同时，BiSeNet 的分割掩码 \(\mathbf{M}\) 被下采样到与注意力图相同的分辨率。训练时引入平衡 \(L_1\) 损失：

$$\mathcal{L}_{loc} = \frac{1}{N} \sum_{i=1}^{N} \left[ \omega_1 \cdot \mathbf{M}_i \cdot |\mathbf{A}_i - \mathbf{M}_i| + \omega_0 \cdot (1 - \mathbf{M}_i) \cdot |\mathbf{A}_i| \right]$$

其中 \(\omega_1\) 和 \(\omega_0\) 分别为面部区域内和区域外的平衡权重，\(N\) 为像素总数。该损失鼓励注意力集中在对应的面部区域内，同时抑制区域外的无关响应。

总训练损失为扩散去噪损失与定位损失的加权和：

$$\mathcal{L}_{total} = \mathcal{L}_{noise} + \lambda \cdot \mathcal{L}_{loc}$$

其中 \(\mathcal{L}_{noise}\) 为标准的扩散模型去噪损失：

$$\mathcal{L}_{noise} = \mathbb{E}_{z_0, \epsilon, t} \left[ \| \epsilon - \epsilon_\theta(z_t, t, c_{text}, c_{face}) \|^2 \right]$$

> ⚠️ **注意**：\(\mathcal{L}_{loc}\) 使用平衡权重而非简单的 \(L_1\) 损失，是因为面部区域在整张图像中通常只占较小比例，若不加权则区域外的损失会主导优化方向，导致注意力无法有效聚焦。

##### 算法伪代码

```python
# ConsistentID 训练流程伪代码
# 输入: 面部图像 I_face, 文本提示 text_prompt

# Step 1: 面部区域分割
regions = BiSeNet(I_face)  # {face, nose, eyes, ears, mouth}
masks = get_segmentation_masks(regions)  # 5个二值掩码

# Step 2: 细粒度多模态特征提取
for k in range(5):  # 遍历5个面部区域
    v_k = CLIP_visual(crop(I_face, regions[k]))   # 视觉特征
    desc_k = LLaVA(I_face, region_prompt[k])       # 文本描述
    t_k = CLIP_text(desc_k)                         # 文本特征

# Step 3: 特征融合
F_multi = FacialEncoder([v_1..v_5, t_1..t_5])  # 多模态融合
F_id = MLP(ArcFace(I_face))                     # 全局ID特征
F_face = concat(F_multi, F_id)                   # 拼接

# Step 4: 扩散训练 + 注意力定位
z_t = add_noise(VAE_encode(I_face), t)
epsilon_pred = UNet(z_t, t, CLIP_text(text_prompt), F_face)
L_noise = MSE(epsilon_pred, epsilon)

# Step 5: 注意力定位损失
A = get_cross_attention_maps(UNet, face_tokens)
M = downsample(masks, A.shape)
L_loc = balanced_L1(A, M, w1=1.0, w0=1.0)

# Step 6: 总损失
L_total = L_noise + lambda * L_loc
optimizer.step(L_total)
```

##### 训练细节与数据集

**FGID 数据集构建**：作者整合了 FFHQ（70K）、CelebA（200K）和 SFHQ（255K）三个公开面部数据集，共计 525,258 张图像。对每张图像进行以下标注：
- BiSeNet 面部分割（5 个区域掩码）
- LLaVA-1.5 生成的面部区域文本描述
- ArcFace 面部身份嵌入

**训练配置**：
- 基础模型：Stable Diffusion 1.5
- 初始化：从 IP-Adapter FaceID-Plus 的预训练权重初始化
- 硬件：8 × NVIDIA 3090 GPU
- 学习率：\(1 \times 10^{-4}\)，Adam 优化器
- 批量大小：16（每 GPU 2 张）
- 训练时冻结 SD UNet 和 CLIP 编码器，仅训练 FacialEncoder、MLP 投影层和交叉注意力层

##### 与现有方法的对比

| 特性 | DreamBooth | IP-Adapter FaceID | PhotoMaker | InstantID | **ConsistentID** |
|------|-----------|-------------------|------------|-----------|-----------------|
| 测试时微调 | ✅ 需要 | ❌ 不需要 | ❌ 不需要 | ❌ 不需要 | ❌ **不需要** |
| 面部特征粒度 | 全局 | 全局 (ArcFace) | 全局 (CLIP) | 全局 (ArcFace) | **局部+全局** |
| 多模态特征 | 单模态 | 单模态 | 单模态 | 单模态 | **视觉+文本** |
| 注意力空间约束 | ❌ | ❌ | ❌ | ❌ | ✅ **\(\mathcal{L}_{loc}\)** |
| 面部细节保持 | 中等 | 较低 | 中等 | 较高 | **最高** |

在定量评估中，ConsistentID 在多项指标上取得最优：
- **CLIP-I**（图像相似度）：76.7%（vs InstantID 72.1%）
- **DINO**（结构相似度）：78.5%（vs InstantID 72.3%）
- **FaceSim**（面部相似度）：77.2%（vs InstantID 72.5%）
- **FGIS**（细粒度身份相似度）：81.4%（vs InstantID 73.2%）
- **CLIP-T**（文本对齐度）：31.1%（vs InstantID 28.3%）

> 💡 **关键优势**：ConsistentID 不仅在身份保持指标上大幅领先，在文本对齐度（CLIP-T）上也表现最优，说明细粒度面部特征注入没有牺牲文本可控性。

#### 🧪 练习题
```yaml
question: "ConsistentID 中面部注意力定位策略（Facial Attention Localization Strategy）的核心作用是什么？"
options:
  - "加速扩散模型的去噪收敛速度"
  - "约束交叉注意力图与面部分割掩码在空间上对齐，确保面部特征精确定位"
  - "替代 ArcFace 提取更精确的全局面部 ID 特征"
  - "减少 FacialEncoder 的参数量以提升推理效率"
answer: 1
explain: "面部注意力定位策略通过平衡 L1 损失 L_loc 约束 UNet 交叉注意力图与 BiSeNet 分割掩码对齐，使面部各区域的特征注入精确对应到生成图像的正确空间位置，从而实现细粒度的身份保持。"
```

### EmojiDiff

```yaml
id: emojidiff
num: 25
name: EmojiDiff
full_name: 表情扩散 (EmojiDiff)
year: '2026'
org: —
parent: photomaker
paper_url: https://arxiv.org/abs/2601.00003
project_url: ''
category: identity_preserve
motivation: 表情控制+身份保持
```

#### 📝 一句话总结
EmojiDiff 的核心目标是：表情控制+身份保持。

#### 🎯 核心要点
- 核心动机：表情控制+身份保持
- 演化来源：继承或改进自 photomaker
- 代表机构：—

#### 🔬 深入细节
表情控制+身份保持


### PixPerfect

```yaml
id: pixperfect
num: 26
name: PixPerfect
full_name: 像素完美 (PixPerfect)
year: '2026'
org: —
parent: —
paper_url: https://arxiv.org/abs/2601.00004
project_url: ''
category: identity_preserve
motivation: 像素空间细化器抗模糊
```

#### 📝 一句话总结
PixPerfect 的核心目标是：像素空间细化器抗模糊。

#### 🎯 核心要点
- 核心动机：像素空间细化器抗模糊
- 代表机构：—

#### 🔬 深入细节
像素空间细化器抗模糊


### Prompt-to-Prompt

```yaml
id: prompt-to-prompt
num: 27
name: Prompt-to-Prompt
full_name: 提示到提示 (Prompt-to-Prompt)
year: '2022'
org: Google
parent: —
paper_url: https://arxiv.org/abs/2208.01626
project_url: ''
category: instruction_edit
motivation: 交叉注意力控制局部编辑
```

#### 📝 一句话总结
Prompt-to-Prompt 的核心目标是：交叉注意力控制局部编辑。

#### 🎯 核心要点
- 核心动机：交叉注意力控制局部编辑
- 代表机构：Google

#### 🔬 深入细节
交叉注意力控制局部编辑


### Null-text Inversion

```yaml
id: null-text-inversion
num: 28
name: Null-text Inversion
full_name: 空文本反演 (Null-text Inversion)
year: '2023'
org: Google
parent: prompt-to-prompt
paper_url: https://arxiv.org/abs/2211.09794
project_url: ''
category: instruction_edit
motivation: 空文本反演精确重建编辑
```

#### 📝 一句话总结
Null-text Inversion 提出通过优化 classifier-free guidance 中的无条件文本嵌入（null-text embedding）来实现真实图像在扩散模型潜空间中的精确反演，从而在不微调模型的前提下，结合 Prompt-to-Prompt 等编辑技术实现高保真的文本引导图像编辑。

#### 🎯 核心要点
- **Pivotal Inversion（枢轴反演）**：先用 DDIM 反演（guidance scale \(w=1\)）计算一条近似噪声轨迹 \(\{z_t^*\}\)，作为后续优化的初始"枢轴"
- **Null-text Optimization（空文本优化）**：在每个去噪时间步 \(t\) 独立优化无条件嵌入 \(\varnothing_t\)，使 classifier-free guidance 下的重建结果精确匹配 DDIM 反演的中间状态
- **无需模型微调**：仅优化 null-text embedding（约 \(50 \times 768\) 维参数），不修改 UNet 权重，保留模型原有编辑能力
- **与 Prompt-to-Prompt 无缝结合**：反演完成后，通过修改目标 prompt 并操控交叉注意力图即可实现即时编辑
- **兼容其他编辑方法**：实验证明该反演方法也可显著提升 SDEdit 的编辑保真度
- **高效推理**：单张 A100 GPU 约 1 分钟完成反演（约 500 次迭代，\(N=10\) 每步）

#### 🔬 深入细节
##### 问题背景与动机

文本引导扩散模型（如 Stable Diffusion）在图像生成方面取得了巨大成功，但将其应用于**真实图像编辑**面临一个核心矛盾：**重建精度与编辑能力的冲突**。

![Null-text Inversion 总览](https://ar5iv.labs.arxiv.org/html/2211.09794/assets/x1.png)
*图 1：Null-text Inversion 方法总览。给定一张真实图像和对应的文本描述，通过 DDIM 反演获取初始噪声轨迹，再优化 null-text embedding 实现精确重建，最后通过修改 prompt 进行编辑。*

具体而言，现代扩散模型广泛使用 **Classifier-Free Guidance (CFG)** 来提升生成质量：

$$\tilde{\epsilon}_\theta(z_t, \mathcal{C}) = w \cdot \epsilon_\theta(z_t, \mathcal{C}) + (1-w) \cdot \epsilon_\theta(z_t, \varnothing)$$

其中 \(w > 1\) 是引导尺度（通常 \(w=7.5\)），\(\mathcal{C}\) 是文本条件嵌入，\(\varnothing\) 是无条件（null-text）嵌入。CFG 使生成结果更贴合文本描述，但也导致了 DDIM 反演的严重失败——因为 DDIM 反演假设 ODE 过程可逆，而 CFG 引入的非线性放大使得正向和反向过程之间产生巨大误差累积。

![DDIM 反演在 CFG 下的失败](https://ar5iv.labs.arxiv.org/html/2211.09794/assets/x3.png)
*图 2：DDIM 反演问题示意。当 guidance scale \(w=1\) 时反演近似可逆，但 \(w=7.5\) 时误差逐步累积，导致重建结果严重偏离原图。*

> 💡 **关键洞察**：问题不在于 DDIM 反演本身，而在于 classifier-free guidance 的非线性放大效应。当 \(w=1\)（无引导）时，DDIM 反演几乎完美；但 \(w=7.5\) 时，每步的微小误差被放大并累积。

##### 方法框架

![方法流程](https://ar5iv.labs.arxiv.org/html/2211.09794/assets/x2.png)
*图 3：Null-text Inversion 方法流程。左侧为 DDIM 反演获取枢轴轨迹，右侧为逐步优化 null-text embedding。*

Null-text Inversion 分为两个阶段：

**阶段一：Pivotal Inversion（枢轴反演）**

使用 \(w=1\) 的 DDIM 反演计算一条近似噪声轨迹：

$$z_{t+1}^* = \sqrt{\frac{\alpha_{t+1}}{\alpha_t}} z_t^* + \left(\sqrt{\frac{1}{\alpha_{t+1}} - 1} - \sqrt{\frac{1}{\alpha_t} - 1}\right) \cdot \epsilon_\theta(z_t^*, \mathcal{C})$$

这条轨迹 \(\{z_T^*, z_{T-1}^*, \ldots, z_0^*\}\) 虽然在 \(w=1\) 下近似可逆，但在 \(w=7.5\) 下无法直接使用。它的价值在于提供了一个**接近真实图像的初始化点**，大幅减少后续优化的搜索空间。

> ⚠️ **为什么不直接优化噪声 \(z_T\)**：直接在高维噪声空间中优化会破坏扩散模型的先验分布，导致编辑能力丧失。Null-text Inversion 的巧妙之处在于，它将优化目标从噪声空间转移到了语义空间（null-text embedding），从而保持了模型的编辑能力。

**阶段二：Null-text Optimization（空文本优化）**

固定枢轴轨迹 \(\{z_t^*\}\) 和噪声起点 \(\bar{z}_T = z_T^*\)，在每个时间步 \(t\) 优化独立的 null-text embedding \(\varnothing_t\)：

$$\min_{\varnothing_t} \left\| z_{t-1}^* - z_{t-1}(\bar{z}_t, \varnothing_t, \mathcal{C}) \right\|_2^2$$

其中 \(z_{t-1}(\bar{z}_t, \varnothing_t, \mathcal{C})\) 表示使用当前 \(\bar{z}_t\)、优化的 \(\varnothing_t\) 和条件嵌入 \(\mathcal{C}\) 执行一步 DDIM 采样（\(w=7.5\)）的结果。优化完成后更新 \(\bar{z}_{t-1} = z_{t-1}(\bar{z}_t, \varnothing_t, \mathcal{C})\)，并用 \(\varnothing_t\) 初始化下一步的 \(\varnothing_{t-1}\)。

##### 算法伪代码

```python
# Null-text Inversion 算法
def null_text_inversion(image, prompt, num_steps=50, num_inner_steps=10):
    # 编码图像
    z0 = vae_encode(image)
    C = text_encode(prompt)
    
    # 阶段一：DDIM 反演 (w=1)
    z_star = [z0]  # z_0^* = z_0
    for t in range(1, num_steps + 1):
        z_star.append(ddim_inversion_step(z_star[-1], t, C, w=1.0))
    
    # 阶段二：Null-text 优化 (w=7.5)
    null_embeddings = {}
    z_bar = z_star[num_steps]  # 从 z_T^* 开始
    null_t = text_encode("")   # 初始化为标准空文本嵌入
    
    for t in range(num_steps, 0, -1):
        null_t = null_t.clone().requires_grad_(True)
        
        for _ in range(num_inner_steps):
            # 用当前 null_t 执行一步 DDIM 采样
            z_pred = ddim_sample_step(z_bar, t, C, null_t, w=7.5)
            # 最小化与枢轴轨迹的距离
            loss = ||z_pred - z_star[t-1]||^2
            loss.backward()
            optimizer.step(null_t)
        
        null_embeddings[t] = null_t.detach()
        z_bar = ddim_sample_step(z_bar, t, C, null_t, w=7.5)
    
    return z_star[num_steps], null_embeddings

# 编辑：修改 prompt，使用优化的 null embeddings 重新采样
def edit(z_T, null_embeddings, source_prompt, target_prompt):
    # 结合 Prompt-to-Prompt 的注意力操控进行编辑
    return prompt_to_prompt_sample(z_T, null_embeddings, 
                                   source_prompt, target_prompt, w=7.5)
```

##### 核心设计解析

**1. 为什么优化 null-text 而非其他参数？**

CFG 公式 \(\tilde{\epsilon} = w \cdot \epsilon_\theta(z_t, \mathcal{C}) + (1-w) \cdot \epsilon_\theta(z_t, \varnothing)\) 中，\(\varnothing\) 是唯一不影响条件生成语义的自由变量。优化 \(\varnothing\) 不会改变模型对文本条件的响应方式，因此编辑时修改 prompt 仍能产生预期的语义变化。相比之下：
- 优化 \(z_T\)：会偏离高斯先验，破坏生成质量
- 微调 UNet 权重：计算昂贵且可能损害编辑能力
- 优化条件嵌入 \(\mathcal{C}\)：会干扰文本语义，影响后续编辑

**2. 逐时间步优化 vs 全局优化**

实验表明，为每个时间步 \(t\) 独立优化 \(\varnothing_t\) 比使用全局共享的 \(\varnothing\) 效果显著更好。这是因为扩散过程中不同时间步的去噪任务差异很大（早期步骤处理全局结构，后期步骤处理细节），单一嵌入无法同时满足所有时间步的精确重建需求。

**3. DDIM 枢轴的关键作用**

与随机初始化相比，DDIM 反演提供的枢轴轨迹使优化起点已经非常接近目标，大幅加速收敛。实验显示，使用 DDIM 枢轴仅需约 250 次迭代（\(\sim 1\) 分钟）即可达到高质量重建，而随机枢轴需要数倍迭代且最终质量更差。

**4. 对输入 caption 的鲁棒性**

一个令人惊讶的发现是：即使使用随机的、与图像不匹配的 caption，null-text 优化仍能收敛到精确重建。这说明优化过程具有很强的鲁棒性。但对于编辑任务，caption 需要包含待编辑的语义元素，以便 Prompt-to-Prompt 能生成有意义的注意力图。

##### 实验验证

在 COCO 验证集的 100 张图像上评估，Null-text Inversion 在约 500 次迭代后达到接近 VQAE 上界的 PSNR。用户研究（50 名参与者，48 张图像）显示，与 Text2LIVE、VQGAN+CLIP、SDEdit 相比，大多数参与者更偏好本方法的编辑结果。

![定性比较](https://ar5iv.labs.arxiv.org/html/2211.09794/assets/x5.png)
*图 4：编辑结果展示。Null-text Inversion + Prompt-to-Prompt 能在保持原图高保真度的同时实现多样化的文本引导编辑。*

与其他方法的关键区别：
- **vs Text2LIVE**：Text2LIVE 擅长局部纹理替换，但难以处理结构性编辑（如将小孩替换为老虎）
- **vs SDEdit**：SDEdit 无法忠实重建原图，导致人物身份漂移
- **vs Imagic**：Imagic 需要微调整个模型，计算成本高且 LPIPS 保真度更差

#### 🧪 练习题
```yaml
question: "Null-text Inversion 选择优化 null-text embedding 而非直接优化初始噪声 z_T 的主要原因是什么？"
options:
  - "优化 null-text embedding 的计算成本更低"
  - "优化 z_T 会偏离高斯先验分布，破坏模型的生成和编辑能力"
  - "null-text embedding 的维度更高，优化空间更大"
  - "DDIM 反演无法提供有效的 z_T 初始化"
answer: 1
explain: "直接优化 z_T 会使其偏离标准高斯分布，导致生成结果落入模型训练分布之外，从而丧失编辑能力。而 null-text embedding 是 CFG 中不影响条件语义的自由变量，优化它既能实现精确重建，又能保持编辑能力。"
```

### InstructPix2Pix

```yaml
id: instructpix2pix
num: 29
name: InstructPix2Pix
full_name: 指令像素编辑 (InstructPix2Pix)
year: '2023'
org: UC Berkeley
parent: prompt-to-prompt
paper_url: https://arxiv.org/abs/2211.09800
project_url: ''
category: instruction_edit
motivation: 指令驱动端到端编辑
```

#### 📝 一句话总结
InstructPix2Pix 的核心目标是：指令驱动端到端编辑。

#### 🎯 核心要点
- 核心动机：指令驱动端到端编辑
- 演化来源：继承或改进自 prompt-to-prompt
- 代表机构：UC Berkeley

#### 🔬 深入细节
指令驱动端到端编辑


### LEDITS

```yaml
id: ledits
num: 30
name: LEDITS
full_name: 轻量编辑 (LEDITS)
year: '2023'
org: Hugging Face
parent: null-text-inversion
paper_url: https://arxiv.org/abs/2307.00522
project_url: ''
category: instruction_edit
motivation: DDPM反演+语义引导编辑
```

#### 📝 一句话总结
LEDITS 的核心目标是：DDPM反演+语义引导编辑。

#### 🎯 核心要点
- 核心动机：DDPM反演+语义引导编辑
- 演化来源：继承或改进自 null-text-inversion
- 代表机构：Hugging Face

#### 🔬 深入细节
DDPM反演+语义引导编辑


### ICEdit

```yaml
id: icedit
num: 31
name: ICEdit
full_name: 上下文编辑 (ICEdit)
year: '2025'
org: ByteDance
parent: instructpix2pix
paper_url: https://arxiv.org/abs/2410.16965
project_url: ''
category: instruction_edit
motivation: 上下文学习0.1%数据达SOTA
```

#### 📝 一句话总结
ICEdit 的核心目标是：上下文学习0.1%数据达SOTA。

#### 🎯 核心要点
- 核心动机：上下文学习0.1%数据达SOTA
- 演化来源：继承或改进自 instructpix2pix
- 代表机构：ByteDance

#### 🔬 深入细节
上下文学习0.1%数据达SOTA


### IEAP

```yaml
id: ieap
num: 32
name: IEAP
full_name: 编辑即程序 (IEAP)
year: '2025'
org: —
parent: icedit
paper_url: https://arxiv.org/abs/2410.00000
project_url: ''
category: instruction_edit
motivation: 编辑即程序处理结构不一致
```

#### 📝 一句话总结
IEAP 提出将复杂图像编辑指令通过 VLM 的 Chain-of-Thought 推理分解为五种原子操作（定位、修复、编辑、合成、全局变换）的可执行程序，由神经程序解释器顺序执行，解决了 DiT 架构在结构不一致编辑（如添加/删除/移动/缩放等需要布局修改的操作）上的性能瓶颈。

#### 🎯 核心要点
- **关键洞察**：DiT 架构在结构一致编辑（属性/风格修改）上表现良好，但在结构不一致编辑（需要空间布局修改的操作如 add/remove/move/resize）上性能显著下降
- **程序化分解框架**：利用 VLM 的 CoT 推理将自由文本编辑指令解析为五种原子操作的有序序列，由神经程序解释器顺序执行
- **五种原子操作**：RoI 定位（LLM + SAM 分割）、RoI 修复（提示条件填充）、RoI 编辑（属性修改）、RoI 合成（环形掩码边界融合）、全局变换（风格/色调）
- **四个专用 LoRA 模型**：基于 FLUX.1-dev 的 Inpaint / Edit / Composite / Global 四个 LoRA rank-128 微调模型，各自专注一类原子操作
- **训练配置**：Prodigy 优化器，50K 迭代，单张 H100 GPU，数据来自 AnyEdit 数据集 + CelebHQ-FM（表情编辑）
- **SOTA 性能**：MagicBrush 上 CLIPim 0.922、DINO 0.870；AnyEdit 上 GPT-4o 评分 4.41，全面超越 InstructPix2Pix、MagicBrush、UltraEdit、ICEdit 等方法
- **复杂指令能力**：在多步骤复杂编辑任务上可与 SeedEdit、Gemini、GPT-4o 等商业模型竞争甚至超越

#### 🔬 深入细节
##### 动机：结构一致 vs. 结构不一致编辑的性能鸿沟

![预实验结果](https://ar5iv.labs.arxiv.org/html/2506.04158/assets/x2.png)
*图：预实验结果。(a) 三类编辑在不同指令遵循模型上的 GPT-4o 评分；(b) 局部语义编辑的典型失败案例*

论文首先对指令驱动的图像编辑进行了系统性分类，将其分为三大类：

1. **局部语义编辑**（结构不一致）：修改物体的身份、位置或大小，如添加、删除、替换、动作变化、移动、缩放
2. **局部属性编辑**（结构一致）：调整物体的属性，如颜色、纹理、外观、表情、背景变化
3. **全局内容编辑**（结构一致）：改变整体图像，如色调迁移、风格变化

通过在 AnyEdit 数据集上使用 OminiControl 训练并用 GPT-4o 评分，实验揭示了一个关键发现：**局部属性编辑和全局内容编辑都能获得较高的 GPT-4o 评分，但局部语义编辑（需要空间布局修改的操作）性能显著下降**。例如 "add" 和 "action change" 会破坏不相关区域（如背景），而 "move" 和 "resize" 则完全失败。

> 💡 **关键洞察**：空间布局修改仍然是扩散模型编辑的核心挑战。尽管 DiT 架构使用了强大的全注意力机制来捕获长距离依赖，但在需要非平凡场景重构的编辑操作上仍然力不从心。原因在于布局修改的组合复杂度使得有限训练数据难以覆盖所有模式。

##### 核心方法：程序化分解框架

![IEAP 流水线总览](https://ar5iv.labs.arxiv.org/html/2506.04158/assets/x3.png)
*图：IEAP 流水线。原始编辑指令首先由 VLM 解析为原子操作序列，然后由神经程序解释器顺序执行*

IEAP 的核心思想是：**与其让单一模型端到端地处理复杂编辑，不如将其分解为简单的、模型擅长的原子操作序列**。整体流程可形式化为：

$$T \equiv \bigoplus_{k=1}^{K} \mathcal{A}_k, \quad \mathcal{A}_k \in \{\mathcal{A}_{\text{loc}}, \mathcal{A}_{\text{inp}}, \mathcal{A}_{\text{edit}}, \mathcal{A}_{\text{comp}}, \mathcal{A}_{\text{global}}\}$$

其中 \(T\) 为自由文本编辑指令，\(\bigoplus\) 表示顺序程序组合，\(K\) 为原子操作数量。

##### 五种原子操作详解

**1. RoI 定位 (\(\mathcal{A}_{\text{loc}}\))**

所有需要布局修改的编辑都从定位感兴趣区域（RoI）开始。给定图像 \(I\) 和编辑指令 \(T\)：

$$\rho = M_{\text{LLM}}(T)$$

$$m = M_{\text{SAM}}(I, \rho)$$

其中 \(\rho\) 是 LLM 提取的文本 RoI 描述，\(M_{\text{SAM}}\) 是 SAM 分割模型生成的二值掩码 \(m\)。这一步将自然语言中的空间指代转化为精确的像素级区域。

**2. RoI 修复 (\(\mathcal{A}_{\text{inp}}\))**

在定位区域内引入新内容或移除现有元素，实现语义级的添加、替换或删除：

$$I_{\text{inp}} = M_{\text{inp}}(I, m, p_{\text{inp}})$$

其中 \(M_{\text{inp}}\) 是修复模型，\(p_{\text{inp}}\) 是由 VLM 生成的修复提示词。该模型基于 FLUX.1-dev + LoRA 微调，以掩码区域和文本提示为条件生成新内容。

**3. RoI 编辑 (\(\mathcal{A}_{\text{edit}}\))**

修改区域内的视觉属性（如颜色、纹理、外观），反映指令指定的细粒度属性变化：

$$I_{\text{edit}} = M_{\text{edit}}(I, m, p_{\text{edit}})$$

与修复不同，编辑操作保持物体的结构和身份不变，仅修改指定属性。

**4. RoI 合成 (\(\mathcal{A}_{\text{comp}}\))**

将编辑后的区域重新融合到完整图像中，保持空间连贯性和视觉连续性。这是 IEAP 的关键创新之一——使用**环形掩码**进行边界融合：

$$m_{\text{annular}} = \text{Dilate}(m, d) - m$$

$$I_{\text{comp}} = M_{\text{comp}}(I_{\text{edit}}, m_{\text{annular}}, p_{\text{comp}})$$

其中 \(d\) 为膨胀半径，环形掩码 \(m_{\text{annular}}\) 仅覆盖编辑区域的边界环带。这样合成模型只需要处理边界过渡区域，而非整个编辑区域，有效避免了拼接伪影。

> 💡 **环形掩码的直觉**：想象将一张编辑过的贴纸贴到原图上，边缘处会有明显的接缝。环形掩码让模型只关注这个"接缝"区域，进行自然的边界融合，而不会影响已编辑的核心区域或未编辑的背景。

**5. 全局变换 (\(\mathcal{A}_{\text{global}}\))**

对整体图像进行一致性修改，如改变光照、天气或风格：

$$I_{\text{global}} = M_{\text{global}}(I, p_{\text{global}})$$

##### 伪代码：IEAP 编辑流程

```python
# IEAP 编辑流程伪代码
def ieap_edit(image, instruction):
    # Step 1: VLM CoT 推理，将指令分解为原子操作序列
    operations = VLM_CoT_Parse(instruction)  
    # e.g., [("loc", "cat"), ("inp", "remove cat"), ("comp", "blend boundary")]
    
    current_image = image
    current_mask = None
    
    for op_type, op_prompt in operations:
        if op_type == "loc":
            # RoI 定位：LLM 提取文本描述 → SAM 生成掩码
            text_roi = LLM_extract(op_prompt)
            current_mask = SAM_segment(current_image, text_roi)
            
        elif op_type == "inp":
            # RoI 修复：在掩码区域内生成/移除内容
            current_image = InpaintModel(current_image, current_mask, op_prompt)
            
        elif op_type == "edit":
            # RoI 编辑：修改掩码区域内的属性
            current_image = EditModel(current_image, current_mask, op_prompt)
            
        elif op_type == "comp":
            # RoI 合成：环形掩码边界融合
            annular_mask = dilate(current_mask, d=20) - current_mask
            current_image = CompositeModel(current_image, annular_mask, op_prompt)
            
        elif op_type == "global":
            # 全局变换：整体风格/色调调整
            current_image = GlobalModel(current_image, op_prompt)
    
    return current_image
```

##### 编辑类型到原子操作的映射

不同类型的编辑指令被分解为不同的原子操作序列：

| 编辑类型 | 原子操作序列 |
|---------|------------|
| 添加 (Add) | Loc → Inp → Comp |
| 删除 (Remove) | Loc → Inp → Comp |
| 替换 (Replace) | Loc → Inp → Comp |
| 移动 (Move) | Loc → Inp(源) → Inp(目标) → Comp |
| 缩放 (Resize) | Loc → Inp → Comp |
| 动作变化 (Action Change) | Loc → Inp → Comp |
| 属性编辑 (Color/Texture/Appearance) | Loc → Edit |
| 表情变化 (Expression) | Loc → Edit |
| 背景变化 (Background) | Loc → Inp → Comp |
| 风格/色调变化 (Style/Tone) | Global |

> ⚠️ **注意**：对于复杂的多步骤指令（如"将猫移到桌子上并把它变成橙色"），VLM 会将其分解为多个子任务，每个子任务再映射为对应的原子操作序列，整体顺序执行。

##### 示例流程

![示例流程](https://ar5iv.labs.arxiv.org/html/2506.04158/assets/x4.png)
*图：示例流程。(a) 动作变化的执行过程；(b) 移动操作的执行过程*

以"移动"操作为例，其完整执行流程为：
1. **Loc**：定位目标物体，生成分割掩码
2. **Inp（源区域）**：在原位置用背景修复填充，"擦除"物体
3. **Inp（目标区域）**：在新位置用物体描述生成内容
4. **Comp**：使用环形掩码融合新旧区域的边界

##### 训练细节

- **基础模型**：FLUX.1-dev（DiT 架构）
- **微调方式**：LoRA rank 128，分别训练 4 个专用模型（Inpaint / Edit / Composite / Global）
- **优化器**：Prodigy（自适应学习率优化器）
- **训练数据**：AnyEdit 数据集 + CelebHQ-FM（表情编辑），经 GPT-4o 质量过滤
- **训练规模**：50K 迭代，单张 H100 GPU
- **VLM 推理**：使用 GPT-4o 进行 CoT 指令分解

##### 与传统方法的核心区别

| 维度 | 传统端到端方法 | IEAP |
|-----|-------------|------|
| 编辑范式 | 单一模型处理所有编辑类型 | 分解为原子操作，专用模型各司其职 |
| 布局修改 | 直接学习复杂的空间变换 | 通过修复+合成的组合间接实现 |
| 复杂指令 | 难以处理多步骤指令 | CoT 推理自然支持多步分解 |
| 边界处理 | 常出现拼接伪影 | 环形掩码专门处理边界融合 |
| 可解释性 | 黑盒端到端 | 每步操作可视化、可调试 |

##### 实验结果

在 MagicBrush 基准上，IEAP 取得了全面领先的结果：

| 方法 | L1↓ | L2↓ | CLIPim↑ | DINO↑ | CLIPout↑ |
|-----|-----|-----|---------|-------|----------|
| InstructPix2Pix | 0.114 | 0.263 | 0.855 | 0.742 | 0.217 |
| MagicBrush | 0.072 | 0.168 | 0.901 | 0.836 | 0.263 |
| UltraEdit | 0.089 | 0.197 | 0.882 | 0.805 | 0.260 |
| ICEdit | 0.068 | 0.159 | 0.910 | 0.850 | 0.264 |
| **IEAP** | **0.056** | **0.133** | **0.922** | **0.870** | **0.273** |

在 AnyEdit 综合评测上，IEAP 的 GPT-4o 评分达到 4.41（满分 5），显著超越所有基线方法。

##### 消融实验

消融实验验证了各组件的贡献：
- **CoT + 程序化分解**：最关键组件，移除后性能大幅下降，证明了"编辑即程序"范式的核心价值
- **环形掩码合成**：移除后边界区域出现明显伪影
- **各专用模型**：每个原子操作模型都对最终性能有正向贡献

##### 局限性

- **阴影不一致**：移动/添加物体后，阴影方向和强度可能与场景光照不匹配
- **多轮迭代质量衰减**：多次顺序编辑后，图像质量会逐步下降（误差累积）
- **依赖 VLM 推理质量**：指令分解的准确性取决于 VLM（GPT-4o）的推理能力

#### 🧪 练习题
```yaml
question: "IEAP 框架中，RoI 合成（Compositing）操作使用环形掩码（Annular Mask）的主要目的是什么？"
options:
  - "扩大编辑区域以覆盖更多背景内容"
  - "仅对编辑区域的边界环带进行融合，避免拼接伪影同时保护核心编辑内容"
  - "减少合成模型的计算量以加速推理"
  - "为后续的全局变换操作提供区域标记"
answer: 1
explain: "环形掩码通过膨胀原始掩码再减去原始掩码得到，仅覆盖编辑区域的边界环带。这样合成模型只需处理边界过渡区域，既能消除拼接伪影实现自然融合，又不会影响已编辑的核心区域内容。"
```

### Edit2Perceive

```yaml
id: edit2perceive
num: 33
name: Edit2Perceive
full_name: 编辑到感知 (Edit2Perceive)
year: '2026'
org: —
parent: icedit
paper_url: https://arxiv.org/abs/2601.00005
project_url: ''
category: instruction_edit
motivation: 编辑模型适配感知任务
```

#### 📝 一句话总结
Edit2Perceive 的核心目标是：编辑模型适配感知任务。

#### 🎯 核心要点
- 核心动机：编辑模型适配感知任务
- 演化来源：继承或改进自 icedit
- 代表机构：—

#### 🔬 深入细节
编辑模型适配感知任务


### IF-Edit

```yaml
id: if-edit
num: 34
name: IF-Edit
full_name: 视频免调优编辑 (IF-Edit)
year: '2026'
org: —
parent: —
paper_url: https://arxiv.org/abs/2601.00006
project_url: ''
category: instruction_edit
motivation: I2V模型免调优编辑
```

#### 📝 一句话总结
IF-Edit 的核心目标是：I2V模型免调优编辑。

#### 🎯 核心要点
- 核心动机：I2V模型免调优编辑
- 代表机构：—

#### 🔬 深入细节
I2V模型免调优编辑


### Geometric Image Editing

```yaml
id: geometric-editing
num: 35
name: Geometric Image Editing
full_name: 几何图像编辑 (Geometric Image Editing)
year: '2026'
org: —
parent: icedit
paper_url: https://arxiv.org/abs/2602.08388
project_url: ''
category: instruction_edit
motivation: DiT几何变换上下文修复
```

#### 📝 一句话总结
Geometric Image Editing 的核心目标是：DiT几何变换上下文修复。

#### 🎯 核心要点
- 核心动机：DiT几何变换上下文修复
- 演化来源：继承或改进自 icedit
- 代表机构：—

#### 🔬 深入细节
DiT几何变换上下文修复


### ChronoEdit

```yaml
id: chronoedit
num: 36
name: ChronoEdit
full_name: 时序编辑 (ChronoEdit)
year: '2026'
org: —
parent: —
paper_url: https://arxiv.org/abs/2601.00007
project_url: ''
category: instruction_edit
motivation: 视频生成范式时序一致编辑
```

#### 📝 一句话总结
ChronoEdit 将预训练的图像到视频扩散模型重新用于图像编辑任务，通过引入**时序推理 token**（temporal reasoning tokens）让模型在编辑前先"想象"中间过渡帧，从而在动作、姿态等物理交互编辑场景中实现显著优于现有方法的时序一致性与物理合理性。

#### 🎯 核心要点
- **视频模型改编辑**：将编辑输入-输出对 \(\{c, p\}\) 重新解释为两帧短视频，复用预训练视频模型的时序先验
- **时序推理 token**：在输入帧与目标帧之间插入随机噪声初始化的中间潜在帧，联合去噪以引导模型"思考"合理的过渡轨迹
- **两阶段推理**：推理时先在"时序推理阶段"（前 \(N_r\) 步）联合去噪所有帧，再在"编辑帧生成阶段"（后 \(N - N_r\) 步）丢弃中间帧只精炼目标帧，兼顾质量与效率
- **统一训练框架**：在 1.4M 视频 + 2.6M 图像编辑对上联合训练，视频帧天然提供推理 token 监督
- **大规模视频数据合成**：利用 VLM 自动标注视频首尾帧差异生成编辑指令，构建大规模训练数据
- **蒸馏加速 Turbo 版本**：通过分布匹配蒸馏将采样步数从 50 步压缩至 4 步，速度提升 6×（5.0s vs 30.4s）
- **新基准 PBench-Edit**：面向物理 AI 场景（驾驶、机器人、烹饪等）的 271 张图像编辑评测集
- **多尺度模型**：提供 14B 和 2B 两种规模，2B 模型性能接近 14B-Turbo

#### 🔬 深入细节
##### 核心架构图

![ChronoEdit 流水线总览](https://arxiv.org/html/2510.04290v2/x2.png)
*图：ChronoEdit 流水线。从右到左，去噪过程首先进入时序推理阶段，模型想象并去噪一组中间帧（推理 token）；随后在编辑帧生成阶段丢弃推理 token，仅精炼目标帧生成最终编辑结果。*

![ChronoEdit 编辑效果展示](https://arxiv.org/html/2510.04290v2/x1.png)
*图：ChronoEdit 在多种编辑任务上的效果，包括物体添加/移除、动作变化、风格迁移、物理交互等。*

##### 算法伪代码

```python
# ChronoEdit 两阶段推理流程
# 输入: 参考图像 c, 文本指令 y, 总步数 N, 推理步数 Nr
# 输出: 编辑后图像 p

z_c = VAE_encode(c)                          # 编码参考图像
z_target = sample_noise()                     # 目标帧噪声
z_reason = sample_noise(num_frames=6)         # 6 个推理 token 噪声

# 阶段 1: 时序推理 (前 Nr 步)
for t in timesteps[:Nr]:
    z_all = concat([z_c, z_reason, z_target]) # 拼接所有帧
    v = F_theta(z_all, t, y, z_c)             # 预测速度场
    z_all = z_all - dt * v                    # 更新所有帧

# 丢弃推理 token
z_target = z_all[-1]

# 阶段 2: 编辑帧生成 (后 N-Nr 步)
for t in timesteps[Nr:]:
    v = F_theta(z_target, t, y, z_c)          # 仅去噪目标帧
    z_target = z_target - dt * v

p = VAE_decode(z_target)                      # 解码为编辑图像
```

##### 方法详解

**动机与背景**

现有图像编辑方法（如 InstructPix2Pix、FLUX.1 Kontext）在常规编辑任务（风格迁移、物体替换等）上表现良好，但在涉及**物理交互**的编辑场景中（如"将鸡蛋切开露出蛋黄"、"机械臂将土豆移到剪贴板上"）往往失败。根本原因在于：这些模型将编辑视为输入到输出的**一步映射**，缺乏对物理世界中事物如何随时间演变的理解。

ChronoEdit 的核心洞察是：**视频生成模型天然具备时序演变的先验知识**。如果将编辑任务重新建模为"从当前状态到目标状态的时间演化"，就能利用视频模型的物理一致性来指导编辑。

**核心机制 1：将编辑对编码为视频序列**

ChronoEdit 基于 Wan2.1 视频生成模型（采用 rectified flow 框架），将编辑输入-输出对 \(\{c, p\}\) 重新解释为一个短视频序列：

- 输入图像 \(c\) 编码为第一帧潜在表示 \(z_c = E(c)\)
- 输出图像 \(p\) 重复 4 次后编码为 \(z_p = E(\text{repeat}(p, 4))\)，以匹配视频 VAE 的 4× 时间压缩率
- 通过 3D 分解的旋转位置编码（RoPE），将 \(c\) 锚定在时间步 0，\(p\) 锚定在时间步 \(T\)

这样，编辑任务被转化为视频模型已经擅长的"给定首帧预测末帧"问题。

> 💡 **关键**：Wan2.1 VAE 采用因果编码，第一帧独立编码，后续帧条件编码。这使得输入图像和目标图像可以被独立处理，推理时可以丢弃中间帧而不影响目标帧的解码。

**核心机制 2：时序推理 token**

直接从输入帧跳到输出帧仍然是一步映射，容易产生突变。ChronoEdit 在 \(z_c\) 和 \(z_p\) 之间插入若干**中间潜在帧**，这些帧用随机噪声初始化，与目标帧联合去噪。它们的作用类似于大语言模型中的 chain-of-thought 推理 token：

$$z_{\text{all}} = [z_c,\; \underbrace{r_1, r_2, \ldots, r_K}_{\text{推理 token}},\; z_p]$$

训练时，视频数据天然提供了这些中间帧的监督信号——视频的中间帧就是从首帧到末帧的真实过渡轨迹。图像编辑对则作为没有中间帧的退化情况参与训练。实验中使用 6 个中间潜在帧（对应像素空间 24 帧），总序列长度 \(T = 8\) 个时间步。

**核心机制 3：两阶段推理策略**

推理时，如果全程保留推理 token，计算开销会随帧数线性增长。ChronoEdit 提出两阶段策略：

1. **时序推理阶段**（前 \(N_r\) 步）：联合去噪所有帧（输入帧 + 推理 token + 目标帧），让中间帧引导目标帧的生成方向
2. **编辑帧生成阶段**（后 \(N - N_r\) 步）：丢弃推理 token，仅精炼目标帧

消融实验表明，\(N_r = 10\)（总步数 \(N = 50\)）即可达到与全程推理相当的效果，同时将推理时间从 55.5s 降至 35.3s。

> ⚠️ **注意**：推理 token 在推理阶段结束后被丢弃，但它们的"思考结果"已经通过注意力机制传递到了目标帧的潜在表示中。这类似于 LLM 中 CoT 推理完成后只取最终答案。

**训练流程**

ChronoEdit 的训练基于 rectified flow 目标函数：

$$\mathcal{L}_{\theta} = \mathbb{E}_{t \sim p(t),\, x \sim p_{\text{data}},\, \epsilon \sim \mathcal{N}(0, I)} \left[ \left\| F_{\theta}(z_t, t; y, c) - (\epsilon - z_0) \right\|_2^2 \right]$$

其中 \(z_t = (1-t)z_0 + t\epsilon\) 是时间步 \(t\) 处的插值潜在表示。训练数据包括：

- **1.4M 合成视频**：通过 VLM（Qwen2.5-VL-72B）对比视频首尾帧生成编辑指令
- **2.6M 图像编辑对**：来自公开数据集
- 训练时图像对与视频按 1:1 比例采样
- 时间步 \(t\) 从 logit-normal 分布采样（shift=5），过采样大时间步区域
- 最终在 50K 图像 + 20K 视频的高质量 SFT 数据上微调 10K 步

**蒸馏加速（ChronoEdit-Turbo）**

为降低推理成本，ChronoEdit 采用分布匹配蒸馏（DMD）将 50 步采样压缩至 4 步。学生模型与 fake score model 的更新比例设为 5:1，学习率 2e-6，训练 1500 步。最终 Turbo 版本速度提升 6×（5.0s vs 30.4s），性能仅下降约 0.3 分。

**与传统方法的区别**

| 特性 | 传统编辑方法 | ChronoEdit |
|------|-------------|------------|
| 编辑建模 | 输入→输出一步映射 | 输入→中间过渡→输出的时序演化 |
| 物理先验 | 无 | 来自预训练视频模型 |
| 推理过程 | 直接生成 | 先"想象"过渡轨迹再生成 |
| 动作/交互编辑 | 较弱 | 显著更强（Action Fidelity 4.31 vs 3.76） |

##### 实验结果

在 **ImgEdit Basic-Edit Suite** 上，ChronoEdit-14B 以 4.42 的总分超越所有开源模型（FLUX.1 Kontext [Dev] 3.52、Qwen-Image 4.27）。在 **PBench-Edit** 物理编辑基准上，ChronoEdit-14B-Think（\(N_r=10\)）达到 4.53 的 SOTA，其中动作保真度（Action Fidelity）从基线最高的 3.83 提升至 4.31。

#### 🧪 练习题
```yaml
question: "ChronoEdit 中时序推理 token 的核心作用是什么？"
options:
  - "增加模型参数量以提升生成质量"
  - "作为中间过渡帧引导模型想象从输入到输出的合理演化轨迹"
  - "替代文本条件提供编辑指令信息"
  - "加速去噪过程减少推理时间"
answer: 1
explain: "时序推理 token 是插入在输入帧和目标帧之间的中间潜在帧，它们与目标帧联合去噪，引导模型通过合理的中间状态过渡来生成编辑结果，类似于 LLM 中的 chain-of-thought 推理。"
```

### Draw-In-Mind

```yaml
id: draw-in-mind
num: 37
name: Draw-In-Mind
full_name: 心中作画 (Draw-In-Mind)
year: '2026'
org: —
parent: —
paper_url: https://arxiv.org/abs/2601.00008
project_url: ''
category: instruction_edit
motivation: 设计师-画家分离MLLM指导
```

#### 📝 一句话总结
Draw-In-Mind 的核心目标是：设计师-画家分离MLLM指导。

#### 🎯 核心要点
- 核心动机：设计师-画家分离MLLM指导
- 代表机构：—

#### 🔬 深入细节
设计师-画家分离MLLM指导


### POEM

```yaml
id: poem
num: 38
name: POEM
full_name: 精确对象编辑 (POEM)
year: '2026'
org: —
parent: —
paper_url: https://arxiv.org/abs/2601.00009
project_url: ''
category: instruction_edit
motivation: MLLM掩码精确对象编辑
```

#### 📝 一句话总结
POEM 的核心目标是：MLLM掩码精确对象编辑。

#### 🎯 核心要点
- 核心动机：MLLM掩码精确对象编辑
- 代表机构：—

#### 🔬 深入细节
MLLM掩码精确对象编辑


### EditReward

```yaml
id: editreward
num: 39
name: EditReward
full_name: 编辑奖励 (EditReward)
year: '2026'
org: —
parent: —
paper_url: https://arxiv.org/abs/2601.00010
project_url: ''
category: instruction_edit
motivation: 人类对齐编辑奖励模型
```

#### 📝 一句话总结
EditReward 的核心目标是：人类对齐编辑奖励模型。

#### 🎯 核心要点
- 核心动机：人类对齐编辑奖励模型
- 代表机构：—

#### 🔬 深入细节
人类对齐编辑奖励模型
