### MaskFormer：基于掩码分类的语义分割

```yaml
id: maskformer
name: MaskFormer
full_name: "Per-Pixel Classification is Not All You Need for Semantic Segmentation"
year: "2021"
org: "FAIR (Meta AI) & UIUC"
paper_url: "https://arxiv.org/abs/2107.06278"
category: "semantic_segmentation"
parent: "—"
motivation: "将语义分割从逐像素分类范式转变为掩码分类范式，统一语义级和实例级分割任务"
```

#### 📝 一句话总结

MaskFormer 提出将语义分割从传统的逐像素分类（per-pixel classification）转变为掩码分类（mask classification）范式，通过预测一组二值掩码及其对应类别来完成分割，使用同一模型架构、损失函数和训练流程即可统一处理语义分割和全景分割任务，在大类别数数据集上显著超越逐像素分类方法，在 ADE20K 上达到 55.6 mIoU 的新 SOTA。

#### 🎯 核心要点

- **范式转变**：将语义分割从逐像素分类重新定义为掩码分类，每个预测由一个类别概率和一个二值掩码组成
- **统一架构**：同一个 MaskFormer 模型无需修改即可同时处理语义分割和全景分割任务
- **三模块设计**：像素级模块（backbone + pixel decoder）、Transformer 模块（DETR 风格 decoder）、分割模块（类别预测 + 掩码预测）
- **集合预测训练**：采用匈牙利匹配进行预测与 GT 的二部图匹配，损失函数结合交叉熵分类损失和二值掩码损失（focal loss + dice loss）
- **双推理策略**：语义推理（semantic inference，对每个像素在所有掩码上取 argmax）和通用推理（general inference，先过滤低置信度掩码再赋标签）
- **大类别数优势**：在类别数较多的数据集（ADE20K 150类、COCO-Stuff 171类、ADE20K-Full 847类）上显著优于逐像素分类方法
- **SOTA 结果**：ADE20K val 55.6 mIoU（Swin-L backbone），ADE20K test 49.67 mIoU，COCO panoptic 53.3 PQ

#### 🔬 深入细节

##### 核心示意图

![Per-pixel classification vs Mask classification](https://ar5iv.labs.arxiv.org/html/2107.06278/assets/x1.png)
*图1：（左）传统逐像素分类对每个像素独立预测类别；（右）掩码分类预测一组二值掩码并为每个掩码分配一个类别标签。匹配可通过二部图匹配或固定匹配完成。*

![MaskFormer 架构总览](https://ar5iv.labs.arxiv.org/html/2107.06278/assets/x2.png)
*图2：MaskFormer 架构。包含三个模块：像素级模块提取逐像素嵌入，Transformer 模块计算 N 个 per-segment 嵌入，分割模块生成最终的类别-掩码预测对。*

##### 算法核心流程

```python
# MaskFormer 前向推理伪代码
def maskformer_forward(image):
    # 1. 像素级模块
    F = backbone(image)                    # 特征图 F ∈ R^{C_F × H/S × W/S}
    E_pixel = pixel_decoder(F)             # 逐像素嵌入 E_pixel ∈ R^{C_E × H × W}

    # 2. Transformer 模块
    Q = transformer_decoder(F, queries)    # N 个 per-segment 嵌入 Q ∈ R^{C_Q × N}

    # 3. 分割模块
    p = softmax(linear_classifier(Q))      # 类别概率 {p_i ∈ Δ^{K+1}}, 含 ∅ 类
    E_mask = MLP(Q)                        # 掩码嵌入 E_mask ∈ R^{C_E × N}
    m = sigmoid(E_mask.T @ E_pixel)        # 二值掩码 {m_i ∈ [0,1]^{H×W}}

    # 4. 推理：语义分割
    # 对每个像素 (h,w)，计算 c = argmax_k Σ_i p_i(k) · m_i(h,w)
    return assemble_semantic(p, m)
```

##### 动机与背景

自 FCN 以来，语义分割几乎被等价为逐像素分类问题——对图像中每个像素独立预测其类别。然而，实例级分割任务（如实例分割、全景分割）天然采用掩码分类的思路：先检测目标区域，再为每个区域分配类别。这种范式差异导致语义分割和实例分割使用完全不同的模型架构和训练方式，阻碍了图像分割领域的统一发展。

MaskFormer 的核心观察是：**掩码分类具有足够的通用性，可以同时解决语义级和实例级分割任务**。事实上，在 FCN 之前，最好的语义分割方法（如 O2P、SDS）就使用了掩码分类的形式。基于这一洞察，作者提出了一个自然的问题：能否用一个统一的掩码分类模型取代逐像素分类，并在语义分割上取得更好的效果？

##### 掩码分类的形式化定义

传统逐像素分类将图像分割为 \(K\) 个类别，对每个像素 \((h, w)\) 预测类别概率分布 \(y \in \{1, \ldots, K\}^{H \times W}\)。

掩码分类则将分割问题分解为：预测 \(N\) 个概率-掩码对 \(z = \{(p_i, m_i)\}_{i=1}^{N}\)，其中 \(p_i \in \Delta^{K+1}\) 是第 \(i\) 个掩码的类别概率分布（包含一个"无对象" \(\varnothing\) 类），\(m_i \in [0, 1]^{H \times W}\) 是对应的二值掩码预测。

> 💡 **关键洞察**：当 \(N = K\) 且使用固定匹配时，掩码分类退化为逐像素分类的特殊情况。因此掩码分类严格地比逐像素分类更通用。

##### 三模块架构详解

**1. 像素级模块（Pixel-level Module）**

该模块由一个 backbone 网络和一个 pixel decoder 组成。Backbone（如 ResNet、Swin Transformer）提取低分辨率特征图 \(\mathcal{F} \in \mathbb{R}^{C_{\mathcal{F}} \times \frac{H}{S} \times \frac{W}{S}}\)（stride \(S=32\)）。Pixel decoder 逐步上采样特征，生成全分辨率的逐像素嵌入 \(\mathcal{E}_{\text{pixel}} \in \mathbb{R}^{C_{\mathcal{E}} \times H \times W}\)。

> ⚠️ **设计亮点**：任何现有的逐像素分类分割模型都可以直接作为像素级模块使用，MaskFormer 可以无缝地将其转换为掩码分类模型。

**2. Transformer 模块**

采用标准 Transformer decoder（与 DETR 类似），输入为图像特征 \(\mathcal{F}\) 和 \(N\) 个可学习的位置嵌入（queries），输出 \(N\) 个 per-segment 嵌入 \(\mathcal{Q} \in \mathbb{R}^{C_{\mathcal{Q}} \times N}\)。每个嵌入编码了对应分割区域的全局信息，所有预测并行生成。

**3. 分割模块（Segmentation Module）**

- **类别预测**：对 per-segment 嵌入 \(\mathcal{Q}\) 施加线性分类器 + softmax，得到 \(K+1\) 类的概率分布（含 \(\varnothing\) 类）
- **掩码预测**：通过 2 层隐藏层的 MLP 将 \(\mathcal{Q}\) 转换为掩码嵌入 \(\mathcal{E}_{\text{mask}} \in \mathbb{R}^{C_{\mathcal{E}} \times N}\)，然后与逐像素嵌入做点积 + sigmoid 得到二值掩码：

$$m_i[h, w] = \text{sigmoid}(\mathcal{E}_{\text{mask}}[:, i]^{\top} \cdot \mathcal{E}_{\text{pixel}}[:, h, w])$$

> 💡 **关键设计**：掩码预测之间不施加互斥约束（不用 softmax），而是使用独立的 sigmoid。这使得同一像素可以属于多个掩码，提高了模型的灵活性。

##### 训练：匈牙利匹配 + 混合损失

训练时，使用匈牙利算法在 \(N\) 个预测和 GT 分割之间进行最优二部图匹配。匹配代价综合考虑分类损失和掩码损失。

匹配完成后，总损失为：

$$\mathcal{L}_{\text{mask-cls}} = \sum_{j=1}^{N} \left[ -\log p_{\sigma(j)}(c_j) + \mathbf{1}_{c_j \neq \varnothing} \mathcal{L}_{\text{mask}}(m_{\sigma(j)}, m_j^{\text{gt}}) \right]$$

其中 \(\sigma\) 为最优匹配，掩码损失 \(\mathcal{L}_{\text{mask}}\) 结合了 focal loss 和 dice loss：

$$\mathcal{L}_{\text{mask}} = \lambda_{\text{focal}} \cdot \mathcal{L}_{\text{focal}} + \lambda_{\text{dice}} \cdot \mathcal{L}_{\text{dice}}$$

默认超参数：\(\lambda_{\text{focal}} = 20\)，\(\lambda_{\text{dice}} = 1\)，\(\lambda_{\text{cls}} = 1\)。

##### 推理策略

MaskFormer 设计了两种推理策略以适配不同任务：

**语义推理（Semantic Inference）**：对每个像素 \((h, w)\)，计算所有 \(K\) 个类别的加权概率并取 argmax：

$$\text{label}(h, w) = \arg\max_{c \in \{1, \ldots, K\}} \sum_{i=1}^{N} p_i(c) \cdot m_i[h, w]$$

这种方式自然地将多个预测同一类别的掩码聚合起来，适合语义分割。

**通用推理（General Inference）**：先用阈值（0.3）过滤低置信度掩码，再为剩余掩码分配类别标签，适合全景分割等需要区分实例的任务。

##### 与传统方法的关键区别

| 特性 | 逐像素分类（FCN 范式） | MaskFormer（掩码分类） |
|------|----------------------|----------------------|
| 预测单元 | 每个像素独立分类 | 预测 N 个掩码-类别对 |
| 类别数依赖 | 输出通道数 = 类别数 K | 输出掩码数 N 与 K 解耦 |
| 大类别数扩展 | 内存随 K 线性增长 | 内存与 K 无关 |
| 全局上下文 | 依赖感受野大小 | Transformer decoder 天然捕获全局信息 |
| 任务统一性 | 仅适用于语义分割 | 统一语义分割和全景分割 |

> 💡 **为什么大类别数时掩码分类更优？** 逐像素分类需要为每个像素预测 K 维概率向量，当 K 很大时（如 ADE20K-Full 的 847 类），分类头的参数量和内存消耗急剧增加。而掩码分类将类别预测解耦到 N 个掩码上（N 远小于像素数），每个掩码只需一次 K+1 维分类，大幅降低了计算和内存开销。实验表明，在 ADE20K-Full（847类）上，MaskFormer 仅需 6529M 训练内存，而 PerPixelBaseline+ 需要 26698M。

#### 🧪 练习题

```yaml
question: "MaskFormer 在语义分割推理时，如何将多个掩码预测组合为最终的逐像素标签？"
options:
  - "对每个像素选择置信度最高的单个掩码的类别"
  - "对每个像素，将所有掩码的类别概率与掩码值加权求和后取 argmax"
  - "使用非极大值抑制（NMS）去除重叠掩码后直接赋值"
  - "通过 CRF 后处理优化掩码边界后逐像素投票"
answer: 1
explain: "MaskFormer 的语义推理策略对每个像素计算 Σ_i p_i(c) · m_i[h,w]，即将所有掩码的类别概率与对应掩码值加权求和，然后对类别维度取 argmax，自然聚合了预测同一类别的多个掩码。"
```