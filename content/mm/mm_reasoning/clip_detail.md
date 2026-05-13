### CLIP — 对比语言-图像预训练 (Contrastive Language-Image Pre-training)

```yaml
id: clip
name: CLIP
full_name: "对比语言-图像预训练 (Contrastive Language-Image Pre-training)"
year: 2021
org: OpenAI
paper_url: "https://arxiv.org/abs/2103.00020"
category: foundation
parent: "—"
motivation: "用自然语言监督学习视觉表征，为多模态视觉理解奠基"
```

#### 📝 一句话总结

CLIP 通过在 4 亿图文对上进行对比学习预训练，将图像和文本映射到共享嵌入空间，实现了强大的零样本视觉分类能力，无需任何标注数据即可匹配 ResNet-50 在 ImageNet 上的监督学习性能。

#### 🎯 核心要点

- **对比学习目标**：使用对称的 InfoNCE 损失，最大化匹配图文对的余弦相似度，最小化非匹配对的相似度
- **大规模数据集 WIT**：从互联网收集的 4 亿（图像, 文本）对，覆盖 50 万条搜索查询
- **双编码器架构**：图像编码器（ResNet / ViT）+ 文本编码器（Transformer），各自独立编码后在共享空间对齐
- **可学习温度参数**：温度 \(\tau\) 作为 log 参数化的可学习标量直接优化，控制 softmax 的 logits 范围
- **零样本迁移**：通过自然语言描述类别名，将分类问题转化为图文匹配问题，无需微调
- **Prompt Engineering & Ensembling**：使用 "A photo of a {label}." 等模板和多 prompt 集成，在 ImageNet 上提升约 5%
- **训练规模**：batch size = 32,768，最大模型 RN50x64 在 592 块 V100 上训练 18 天

#### 🔬 深入细节

##### 核心架构示意图

![CLIP 训练与零样本推理流程](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png)
*图 1：CLIP 的三阶段流程——(1) 对比预训练：联合训练图像编码器和文本编码器，使匹配的图文对在嵌入空间中对齐；(2) 创建零样本分类器：将数据集的类别名嵌入文本模板生成文本嵌入；(3) 零样本预测：计算图像嵌入与所有类别文本嵌入的相似度，选择最高者。*

##### 算法伪代码

![CLIP 核心实现伪代码](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x3.png)
*图 3：CLIP 核心实现的 NumPy 风格伪代码。*

以下为整理后的伪代码：

```python
# CLIP 对比学习核心伪代码
# image_encoder: ResNet 或 Vision Transformer
# text_encoder:  Transformer
# I[n, h, w, c]: 一个 mini-batch 的图像
# T[n, l]:       一个 mini-batch 的文本

# 分别提取特征
I_f = image_encoder(I)    # [n, d_i]
T_f = text_encoder(T)     # [n, d_t]

# 线性投影到共享的多模态嵌入空间
I_e = l2_normalize(I_f @ W_i, axis=1)  # [n, d_e]
T_e = l2_normalize(T_f @ W_t, axis=1)  # [n, d_e]

# 计算缩放的余弦相似度矩阵
logits = (I_e @ T_e.T) * exp(t)  # [n, n], t 为可学习的 log 温度

# 对称交叉熵损失（InfoNCE）
labels = arange(n)  # 对角线为正样本对
loss_i = cross_entropy_loss(logits, labels, axis=0)   # 图像→文本
loss_t = cross_entropy_loss(logits, labels, axis=1)   # 文本→图像
loss   = (loss_i + loss_t) / 2
```

##### 动机与背景

传统视觉模型依赖人工标注的固定类别标签（如 ImageNet 的 1000 类），这带来两个根本问题：**标注成本高昂**和**泛化能力受限**——模型只能识别训练时见过的类别。自然语言处理领域已经证明，从互联网原始文本中学习的预训练模型（如 GPT 系列）具有强大的零样本迁移能力。CLIP 的核心动机是：**能否用自然语言作为监督信号来训练视觉模型，从而继承 NLP 的开放世界泛化能力？**

早期工作如 VirTex、ICMLM 和 ConVIRT 已探索了图文联合学习，但规模有限。CLIP 的关键洞察是：**对比学习目标比预测式目标（如逐词生成图像描述）在计算效率上高出 4 倍**。这使得在 4 亿规模的数据上训练成为可能。

##### 核心机制：对比学习目标

CLIP 的训练目标是一个**对称的对比损失**。给定一个 batch 中的 \(N\) 个图文对，CLIP 构造一个 \(N \times N\) 的相似度矩阵，其中对角线元素为正样本对（匹配的图文），其余 \(N^2 - N\) 个为负样本对。

损失函数为对称的 InfoNCE：

$$\mathcal{L} = \frac{1}{2} \left[ \frac{1}{N}\sum_{i=1}^{N} -\log \frac{\exp(\text{sim}(\mathbf{I}_i, \mathbf{T}_i)/\tau)}{\sum_{j=1}^{N}\exp(\text{sim}(\mathbf{I}_i, \mathbf{T}_j)/\tau)} + \frac{1}{N}\sum_{i=1}^{N} -\log \frac{\exp(\text{sim}(\mathbf{T}_i, \mathbf{I}_i)/\tau)}{\sum_{j=1}^{N}\exp(\text{sim}(\mathbf{T}_i, \mathbf{I}_j)/\tau)} \right]$$

其中 \(\text{sim}(\mathbf{I}, \mathbf{T}) = \frac{\mathbf{I} \cdot \mathbf{T}}{|\mathbf{I}||\mathbf{T}|}\) 为余弦相似度，\(\tau\) 为可学习的温度参数。

> 💡 **关键直觉**：这个损失函数本质上是在做一个 \(N\) 路分类——对于每张图像，要从 \(N\) 个文本中找到匹配的那一个（反之亦然）。batch size 越大，负样本越多，对比信号越强。这就是为什么 CLIP 使用了 32,768 的超大 batch size。

##### 双编码器架构

**图像编码器**提供两种选择：
1. **ResNet 系列**：基于 ResNet-50，加入 ResNet-D 改进、抗锯齿模糊池化，并将全局平均池化替换为**注意力池化**（单层 Transformer 风格的 QKV 注意力，query 以全局平均池化表示为条件）。通过 EfficientNet 风格的宽度-深度-分辨率联合缩放，扩展到 RN50x4、RN50x16、RN50x64。
2. **Vision Transformer (ViT)**：紧跟 ViT 原始实现，仅增加了对 patch + position embeddings 的额外 LayerNorm。训练了 ViT-B/32、ViT-B/16、ViT-L/14 三个规模。

**文本编码器**为 Transformer（63M 参数，12 层，512 宽度，8 头注意力），使用 BPE 分词（词表大小 49,152），最大序列长度 76。文本序列以 `[SOS]` 和 `[EOS]` 括起，取 `[EOS]` 位置最高层的激活作为文本表征，经 LayerNorm 后线性投影到共享嵌入空间。使用**掩码自注意力**以保留未来初始化预训练语言模型的能力。

> ⚠️ **注意**：两个编码器的输出分别通过各自的线性投影层 \(W_i\) 和 \(W_t\) 映射到**同一维度的共享嵌入空间**，然后进行 L2 归一化。这意味着图像和文本在几何上被约束在同一个超球面上。

##### 零样本推理流程

CLIP 的零样本分类本质上是将分类问题转化为**检索问题**：

1. **构造文本分类器**：将目标数据集的每个类别名填入 prompt 模板（如 "A photo of a {label}."），通过文本编码器生成类别嵌入向量
2. **编码测试图像**：通过图像编码器提取图像嵌入
3. **匹配预测**：计算图像嵌入与所有类别嵌入的余弦相似度，选择最高相似度的类别

> 💡 **关键洞察**：从这个角度看，文本编码器实际上是一个**超网络 (Hypernetwork)**——它根据自然语言描述动态生成线性分类器的权重。每一步 CLIP 预训练都可以看作在优化一个随机创建的代理分类器（32,768 类，每类 1 个样本）。

##### Prompt Engineering 与集成

直接使用类别名作为文本输入效果欠佳，原因有二：(1) **多义性**——如 "crane" 既可以是建筑起重机也可以是鹤；(2) **分布偏移**——预训练数据中文本通常是完整句子而非单词。

解决方案：
- **Prompt 模板**：使用 "A photo of a {label}." 作为默认模板，在 ImageNet 上提升 1.3%
- **领域定制**：如宠物数据集用 "A photo of a {label}, a type of pet."，卫星图用 "a satellite photo of a {label}."
- **Prompt 集成**：对同一类别使用多个不同 prompt（如 "A photo of a big {label}" 和 "A photo of a small {label}"），在嵌入空间中平均。ImageNet 上使用 80 个 prompt 集成，额外提升 3.5%

##### 训练细节与规模

| 配置 | 值 |
|------|-----|
| 数据集 | WIT (WebImageText)，4 亿图文对 |
| Batch Size | 32,768 |
| 训练轮数 | 32 epochs |
| 优化器 | AdamW（解耦权重衰减） |
| 学习率调度 | Cosine schedule |
| 温度初始化 | \(\tau\) 初始化为 0.07，logits 裁剪至最大 100 |
| 精度 | 混合精度训练 + 梯度检查点 + 半精度 Adam 统计量 |
| 最大模型训练时间 | RN50x64: 592 V100 × 18 天; ViT-L/14: 256 V100 × 12 天 |
| 最佳模型 | ViT-L/14@336px（额外 1 epoch 高分辨率微调） |

##### 与传统方法的区别

| 维度 | 传统监督学习 | CLIP |
|------|-------------|------|
| 监督信号 | 人工标注的固定类别标签 | 自然语言文本（互联网自动采集） |
| 类别空间 | 封闭集（如 1000 类） | 开放集（任意自然语言描述） |
| 迁移方式 | 微调或线性探测 | 零样本（无需任何标注数据） |
| 训练目标 | 交叉熵分类 | 对比学习（图文匹配） |
| 鲁棒性 | 对分布偏移敏感 | 显著更强的分布偏移鲁棒性 |

#### 🧪 练习题

```yaml
question: "CLIP 选择对比学习目标而非预测式目标（如图像描述生成）的主要原因是什么？"
options:
  - "对比学习目标的分类精度更高"
  - "预测式目标无法处理图文对数据"
  - "对比学习目标的训练效率高出约 4 倍"
  - "对比学习目标不需要负样本"
answer: 2
explain: "论文实验表明，对比目标比等价的预测目标（bag-of-words 或 autoregressive）在相同计算量下效率高约 4 倍，这使得在 4 亿规模数据上训练成为可能。"
```