---
domain: multimodal
topic_id: mm_reasoning
topic_name: 多模态推理
page_icon: "\U0001F9E0"
page_title: 多模态推理技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 涵盖从视觉问答、多模态CoT到2026年原生多模态长链推理（Think with Images）的技术发展历程
hero_pills:
- "\U0001F3F7️ Multimodal CoT · Visual Reasoning · Think with Images"
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 视觉语言对齐基础
    color: '#888888'
  mm_cot:
    label: 多模态思维链
    color: '#888888'
  compositional:
    label: 组合推理与神经符号
    color: '#888888'
  frontier_2026:
    label: 2026前沿技术
    color: '#888888'
image_base: ../../content/mm/mm_reasoning/assets/
---

## 领域综述

### 待定
待定。

## 算法演化关系

```yaml
nodes:
- id: vilbert
  x: 100
  y: 100
  category: foundation
- id: clip
  x: 200
  y: 100
  category: foundation
- id: flamingo
  x: 300
  y: 100
  category: foundation
- id: blip2
  x: 400
  y: 100
  category: foundation
- id: llava
  x: 420
  y: 250
  category: mm_cot
- id: mm_cot
  x: 410
  y: 300
  category: mm_cot
- id: ddcot
  x: 480
  y: 300
  category: mm_cot
- id: t_sciq
  x: 550
  y: 300
  category: mm_cot
- id: visual_cot
  x: 620
  y: 300
  category: mm_cot
- id: image_of_thought
  x: 680
  y: 280
  category: mm_cot
- id: llava_cot
  x: 750
  y: 250
  category: mm_cot
- id: visprog
  x: 450
  y: 450
  category: compositional
- id: vipergpt
  x: 520
  y: 450
  category: compositional
- id: genome
  x: 600
  y: 450
  category: compositional
- id: cot_vla
  x: 760
  y: 450
  category: compositional
- id: mvot
  x: 720
  y: 550
  category: frontier_2026
- id: latent_sketchpad
  x: 780
  y: 580
  category: frontier_2026
- id: visual_thoughts
  x: 850
  y: 550
  category: frontier_2026
- id: covt
  x: 920
  y: 570
  category: frontier_2026
- id: zebra_cot
  x: 920
  y: 530
  category: frontier_2026
- id: reason_rft
  x: 850
  y: 350
  category: frontier_2026
- id: visionthink
  x: 920
  y: 330
  category: frontier_2026
- id: vl_rethinker
  x: 920
  y: 370
  category: frontier_2026
- id: think_or_not
  x: 990
  y: 350
  category: frontier_2026
- id: grounded_rl
  x: 990
  y: 390
  category: frontier_2026
- id: ssr_cot
  x: 850
  y: 600
  category: frontier_2026
- id: muslr
  x: 850
  y: 450
  category: frontier_2026
- id: med_r1
  x: 990
  y: 310
  category: frontier_2026
edges:
- from: clip
  to: flamingo
  label: 少样本学习
- from: clip
  to: blip2
  label: Q-Former桥接
- from: blip2
  to: llava
  label: 指令微调
- from: blip2
  to: mm_cot
  label: 两阶段推理
- from: mm_cot
  to: ddcot
  label: 职责分离
- from: mm_cot
  to: t_sciq
  label: LLM教导
- from: mm_cot
  to: visual_cot
  label: 数据集构建
- from: visual_cot
  to: image_of_thought
  label: 证据锚定
- from: llava
  to: llava_cot
  label: 逐步推理
- from: blip2
  to: visprog
  label: 程序合成
- from: visprog
  to: vipergpt
  label: 代码执行
- from: vipergpt
  to: genome
  label: 模块重用
- from: llava_cot
  to: cot_vla
  label: 具身智能
- from: visual_cot
  to: mvot
  label: 视觉想象
- from: mvot
  to: latent_sketchpad
  label: 潜空间草图
- from: mvot
  to: visual_thoughts
  label: 统一框架
- from: visual_thoughts
  to: covt
  label: 连续Token
- from: visual_thoughts
  to: zebra_cot
  label: 交错数据
- from: visual_cot
  to: ssr_cot
  label: 空间推理
- from: llava_cot
  to: reason_rft
  label: GRPO微调
- from: reason_rft
  to: visionthink
  label: Token压缩
- from: reason_rft
  to: vl_rethinker
  label: 自反思
- from: reason_rft
  to: think_or_not
  label: 选择性推理
- from: reason_rft
  to: grounded_rl
  label: 接地推理
- from: reason_rft
  to: med_r1
  label: 医学应用
- from: genome
  to: muslr
  label: 符号逻辑
milestones:
- clip
- mm_cot
- reason_rft
```

## 核心算法

### ViLBERT

```yaml
id: vilbert
num: 1
name: ViLBERT
full_name: 视觉语言BERT (Vision-and-Language BERT)
year: '2019'
org: Georgia Tech / Meta
parent: —
paper_url: https://proceedings.neurips.cc/paper/2019/hash/c74d97b59837b67032d2d4d6208c1d39-Abstract.html
project_url: ''
category: foundation
motivation: 首个多模态BERT扩展，双流架构实现跨模态注意力
```

#### 📝 一句话总结
ViLBERT 的核心目标是：首个多模态BERT扩展，双流架构实现跨模态注意力。

#### 🎯 核心要点
- 核心动机：首个多模态BERT扩展，双流架构实现跨模态注意力
- 代表机构：Georgia Tech / Meta

#### 🔬 深入细节
首个多模态BERT扩展，双流架构实现跨模态注意力


### CLIP

```yaml
id: clip
num: 2
name: CLIP
full_name: 对比语言图像预训练 (Contrastive Language-Image Pre-training)
year: '2021.01'
org: OpenAI
parent: —
paper_url: https://openai.com/index/clip/
project_url: ''
category: foundation
motivation: 4亿图文对对比学习，零样本视觉理解奠基
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

### Flamingo

```yaml
id: flamingo
num: 3
name: Flamingo
full_name: '少样本视觉语言模型 (Flamingo: Few-Shot VLM)'
year: '2022'
org: DeepMind
parent: clip
paper_url: https://arxiv.org/abs/2204.14198
project_url: ''
category: foundation
motivation: Perceiver+门控交叉注意力，少样本推理突破
```

#### 📝 一句话总结
Flamingo 的核心目标是：Perceiver+门控交叉注意力，少样本推理突破。

#### 🎯 核心要点
- 核心动机：Perceiver+门控交叉注意力，少样本推理突破
- 演化来源：继承或改进自 clip
- 代表机构：DeepMind

#### 🔬 深入细节
Perceiver+门控交叉注意力，少样本推理突破


### BLIP-2

```yaml
id: blip2
num: 4
name: BLIP-2
full_name: 引导式语言图像预训练2 (Bootstrapping Language-Image Pre-training 2)
year: '2023'
org: Salesforce
parent: clip
paper_url: https://proceedings.mlr.press/v202/li23q
project_url: ''
category: foundation
motivation: Q-Former轻量桥接，冻结编码器高效训练
```

#### 📝 一句话总结
BLIP-2 的核心目标是：Q-Former轻量桥接，冻结编码器高效训练。

#### 🎯 核心要点
- 核心动机：Q-Former轻量桥接，冻结编码器高效训练
- 演化来源：继承或改进自 clip
- 代表机构：Salesforce

#### 🔬 深入细节
Q-Former轻量桥接，冻结编码器高效训练


### LLaVA

```yaml
id: llava
num: 5
name: LLaVA
full_name: 大型语言视觉助手 (Large Language and Vision Assistant)
year: '2023.04'
org: UW-Madison
parent: blip2
paper_url: https://arxiv.org/abs/2304.08485
project_url: ''
category: mm_cot
motivation: 视觉指令微调，线性投影实现强大通用推理
```

#### 📝 一句话总结
LLaVA 的核心目标是：视觉指令微调，线性投影实现强大通用推理。

#### 🎯 核心要点
- 核心动机：视觉指令微调，线性投影实现强大通用推理
- 演化来源：继承或改进自 blip2
- 代表机构：UW-Madison

#### 🔬 深入细节
视觉指令微调，线性投影实现强大通用推理


### Multimodal-CoT

```yaml
id: mm_cot
num: 6
name: Multimodal-CoT
full_name: 多模态思维链 (Multimodal Chain-of-Thought)
year: '2023.02'
org: Amazon
parent: blip2
paper_url: https://arxiv.org/abs/2302.00923
project_url: ''
category: mm_cot
motivation: 两阶段框架生成推理理由，首超人类水平
```

#### 📝 一句话总结
Multimodal-CoT 的核心目标是：两阶段框架生成推理理由，首超人类水平。

#### 🎯 核心要点
- 核心动机：两阶段框架生成推理理由，首超人类水平
- 演化来源：继承或改进自 blip2
- 代表机构：Amazon

#### 🔬 深入细节
两阶段框架生成推理理由，首超人类水平


### DDCoT

```yaml
id: ddcot
num: 7
name: DDCoT
full_name: 职责分离思维链 (Duty-Distinct Chain-of-Thought)
year: '2023'
org: Tsinghua
parent: mm_cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/108030643e640ac050e0ed5e6aace48f-Abstract-Conference.html
project_url: ''
category: mm_cot
motivation: 职责分离减轻幻觉，提升推理可靠性
```

#### 📝 一句话总结
DDCoT 的核心目标是：职责分离减轻幻觉，提升推理可靠性。

#### 🎯 核心要点
- 核心动机：职责分离减轻幻觉，提升推理可靠性
- 演化来源：继承或改进自 mm_cot
- 代表机构：Tsinghua

#### 🔬 深入细节
职责分离减轻幻觉，提升推理可靠性


### T-SciQ

```yaml
id: t_sciq
num: 8
name: T-SciQ
full_name: 教学式科学问答 (Teaching Multimodal CoT via LLM Signals)
year: '2024'
org: HKUST
parent: mm_cot
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/29884
project_url: ''
category: mm_cot
motivation: LLM信号教导多模态推理，解决数据稀缺
```

#### 📝 一句话总结
T-SciQ 的核心目标是：LLM信号教导多模态推理，解决数据稀缺。

#### 🎯 核心要点
- 核心动机：LLM信号教导多模态推理，解决数据稀缺
- 演化来源：继承或改进自 mm_cot
- 代表机构：HKUST

#### 🔬 深入细节
LLM信号教导多模态推理，解决数据稀缺


### Visual CoT

```yaml
id: visual_cot
num: 9
name: Visual CoT
full_name: 视觉思维链数据集 (Visual Chain-of-Thought Dataset)
year: '2024'
org: NTU
parent: mm_cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2024/hash/0ff38d72a2e0aa6dbe42de83a17b2223-Abstract-Datasets_and_Benchmarks_Track.html
project_url: ''
category: mm_cot
motivation: 首个综合视觉CoT数据集，定义标注规范
```

#### 📝 一句话总结
Visual CoT 构建了一个包含 438k 样本的视觉思维链（Visual Chain-of-Thought）数据集，并提出一种让多模态大语言模型在推理时**先预测关键区域边界框、再裁剪放大该区域重新编码**的两阶段推理流程，使模型能够像人类一样"聚焦细节再回答"，在多个 VQA 基准上以更少的视觉 token 实现了超越更大模型和更高分辨率方案的性能。

#### 🎯 核心要点
- **视觉 CoT 数据集**：438k VQA 样本，覆盖 5 大领域（文档/文字识别、图表理解、通用 VQA、关系推理、细粒度识别），其中约 98k 样本附带详细推理步骤标注，数据来源于 12 个公开数据集
- **CoT 边界框标注流水线**：利用 GPT-4 生成推理步骤，再通过专用检测/OCR 模型将文本描述的关键区域自动转化为精确的边界框坐标
- **Visual Sampler 机制**：基于模型预测的边界框，以中心扩展方式裁剪出正方形子区域，经 CLIP 视觉编码器重新编码后与全局特征拼接，实现"先定位后精读"
- **两阶段推理流程**：第一阶段输出关键区域坐标 \([x_1, y_1, x_2, y_2]\)，第二阶段将裁剪区域的视觉特征追加到序列中再生成最终答案
- **Token 效率优势**：224×224 全局 + CoT 裁剪区域（共约 500 token）即可超越 448×448 全图方案（约 1024 token），证明"智能聚焦"比"暴力提分辨率"更高效
- **多任务兼容**：同一模型同时支持 VQA 问答和 Referring Expression Comprehension（REC）目标检测任务，REC 性能超越专用模型

#### 🔬 深入细节
##### 整体框架

![Visual CoT 整体框架](https://arxiv.org/html/2403.16999v2/x1.png)
*图：Visual CoT 的完整流程。给定图像和问题，模型首先预测关键区域的边界框，Visual Sampler 据此裁剪并重新编码该区域，最后将新增的视觉特征拼接到已有序列中生成最终答案。*

Visual CoT 的核心思想是将人类"先扫视全局、再聚焦细节"的视觉推理模式引入多模态大语言模型。传统 MLLM（如 LLaVA）将整张图像编码为固定分辨率的视觉 token 后直接回答问题，当关键信息位于图像的小区域时（如文档中的某个数字、图表中的某条曲线），低分辨率编码会丢失细节。Visual CoT 通过让模型"自己决定看哪里"来解决这一问题。

##### 数据集构建流水线

![数据集构建与示例](https://arxiv.org/html/2403.16999v2/x2.png)
*图：Visual CoT 数据集的构建流程与各领域示例。*

数据集构建分为三个关键步骤：

**步骤一：推理步骤生成。** 对于每个 VQA 样本，将图像、问题和答案输入 GPT-4，要求其生成逐步推理过程，并在推理中明确指出需要关注的图像区域（以自然语言描述）。

**步骤二：区域定位与边界框生成。** 根据 GPT-4 输出的区域描述，使用专用模型将其转化为精确坐标：
- 对于**文档/文字类**数据，使用 OCR 引擎（如 PaddleOCR）定位文字区域
- 对于**通用物体类**数据，使用开放词汇检测器（如 Grounding DINO）定位目标
- 对于**图表类**数据，结合 OCR 和检测器处理混合内容

**步骤三：质量过滤。** 通过 IoU 阈值、面积比例等规则过滤掉定位不准确的样本，确保边界框确实指向回答问题所需的关键区域。

最终数据集涵盖 5 个领域、12 个来源数据集：

| 领域 | 来源数据集 | 样本数 |
|------|-----------|--------|
| 文档/文字 | SROIE, TextVQA, TextCaps, STVQA | ~120k |
| 图表 | ChartQA, DVQA, PlotQA | ~95k |
| 通用 VQA | VQAv2, OK-VQA, GQA | ~150k |
| 关系推理 | VSR | ~10k |
| 细粒度 | Hateful Memes | ~8.5k |

##### Visual Sampler 裁剪策略

![Visual Sampler 示意](https://arxiv.org/html/2403.16999v2/x3.png)
*图：Visual Sampler 的裁剪策略。以预测框中心为基准，取半宽、半高、半分辨率三者的最大值作为扩展半径，裁剪出正方形区域。*

Visual Sampler 是连接"定位"与"精读"的关键组件。给定模型预测的边界框 \([x_1, y_1, x_2, y_2]\)，裁剪过程如下：

```python
# Visual Sampler 裁剪伪代码
def visual_sampler(image, bbox, input_resolution):
    x1, y1, x2, y2 = bbox
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2          # 边界框中心
    w_half, h_half = (x2 - x1) / 2, (y2 - y1) / 2   # 半宽、半高
    res_half = input_resolution / 2                    # 输入分辨率的一半

    # 取三者最大值作为正方形半边长
    half_len = max(w_half, h_half, res_half)

    # 以中心扩展为正方形，并裁剪到图像边界内
    crop_x1 = max(0, cx - half_len)
    crop_y1 = max(0, cy - half_len)
    crop_x2 = min(image.width, cx + half_len)
    crop_y2 = min(image.height, cy + half_len)

    cropped = image.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    # 缩放到与全局图像相同的输入分辨率
    cropped = cropped.resize((input_resolution, input_resolution))
    return cropped
```

这一设计有三个关键考量：

1. **正方形裁剪**：CLIP ViT 的输入为正方形，直接裁剪正方形避免了额外的形变
2. **最小尺寸保证**（\(\text{res\_half}\) 下界）：即使预测框很小，裁剪区域也不会小于输入分辨率的一半，防止过度放大导致的模糊
3. **中心对齐**：以预测框中心为裁剪中心，保留目标周围的上下文信息

> 💡 **关键直觉**：Visual Sampler 的本质是一个"可微的数字变焦镜头"——模型通过预测坐标来控制镜头对准哪里，然后用相同的视觉编码器对放大后的区域重新提取特征。

##### 两阶段推理流程

完整的推理过程可以形式化为：

**第一阶段（定位）：**

$$\text{bbox} = [x_1, y_1, x_2, y_2] = f_{\text{LLM}}(H_0, T_q)$$

其中 \(H_0 = g_{\text{ViT}}(I)\) 是全局图像特征，\(T_q\) 是问题的文本 token。模型在生成答案之前，先输出一个特殊格式的边界框坐标。

**第二阶段（精读与回答）：**

$$I_{\text{crop}} = \text{VisualSampler}(I, \text{bbox})$$

$$H_1 = g_{\text{ViT}}(I_{\text{crop}})$$

$$\text{answer} = f_{\text{LLM}}([H_0; H_1], T_q)$$

裁剪后的图像经同一 CLIP ViT 编码得到 \(H_1\)，与原始全局特征 \(H_0\) 拼接后，模型基于"全局+局部"的双重视觉信息生成最终答案。

> ⚠️ **注意**：整个流程只需要一个 ViT 和一个 LLM，不引入额外的检测模型。边界框预测完全由 LLM 自身完成，这使得模型在推理时保持端到端的简洁性。

##### 训练策略

模型基于 LLaVA-1.5 架构（CLIP ViT-L/14 + Vicuna-7B/13B），采用两阶段训练：

| 阶段 | 数据 | 学习率 | 训练参数 | Epoch |
|------|------|--------|----------|-------|
| 预训练 | 558k 图文对齐数据 | 2e-3 | 仅投影层 | 1 |
| 微调 | 665k 指令数据 + 438k VisCoT 数据 | 2e-5 | 全参数 | 1 |

训练在 32 张 A100 GPU 上使用 FSDP ZeRO-3 策略完成。训练数据中的 CoT 样本格式为：

```
Question: {question}
Answer: To answer this question, I need to focus on [x1, y1, x2, y2].
{reasoning steps}
The answer is {answer}.
```

##### 实验结果与分析

**主要结果：** VisCoT-7B（336×336）在 8 个 VQA 基准上的平均得分达到 0.580，超越了 LLaVA-1.5-13B（0.478）这一参数量近两倍的模型。

关键发现包括：

1. **CoT 的显著增益**：在消融实验中，移除 CoT 机制后平均性能从 0.580 降至 0.443（-13.7%），证明视觉思维链的核心价值
2. **GT 边界框上界**：使用 ground-truth 边界框时性能可达 0.752，说明更精准的定位还有巨大提升空间
3. **Token 效率**：224 分辨率 + CoT 裁剪（~500 token）的性能优于 448 分辨率无 CoT（~1024 token），以约一半的 token 量实现更好效果
4. **文档场景的巨大提升**：在 SROIE（收据信息提取）任务上，VisCoT 相比基线提升约 8 倍（从 5.8% 到 47.8%），因为文档中的关键文字通常集中在小区域
5. **REC 能力**：模型在 RefCOCO/RefCOCO+/RefCOCOg 上的目标检测性能超越了 KOSMOS-2、Shikra 等专用模型，证明 CoT 训练带来的定位能力具有通用性

> 💡 **关键洞察**：Visual CoT 揭示了一个重要设计原则——对于需要细节理解的视觉任务，"智能地选择看哪里"比"盲目提高全图分辨率"更有效且更经济。这与人类视觉系统中注视点（foveation）机制的原理一致。

#### 🧪 练习题
```yaml
- question: "Visual CoT 中 Visual Sampler 裁剪区域的最小尺寸由什么决定？"
  options:
    - "预测边界框的面积"
    - "输入分辨率的一半（res_half）"
    - "图像原始分辨率"
    - "CLIP ViT 的 patch 大小"
  answer: 1
  explain: "Visual Sampler 取 w_half、h_half、res_half 三者的最大值作为裁剪半边长，其中 res_half（输入分辨率的一半）作为下界，确保裁剪区域不会过小导致放大后模糊。"

- question: "Visual CoT 的两阶段推理中，第二阶段的视觉输入是什么？"
  options:
    - "仅裁剪区域的特征 H1"
    - "全局特征 H0 与裁剪区域特征 H1 的拼接 [H0; H1]"
    - "全局特征 H0 与 H1 的加权平均"
    - "将裁剪区域覆盖到原图后重新编码"
  answer: 1
  explain: "第二阶段将裁剪区域经 ViT 编码得到 H1，与全局特征 H0 直接拼接后输入 LLM，使模型同时获得全局上下文和局部细节信息。"

- question: "Visual CoT 数据集中，边界框标注是如何生成的？"
  options:
    - "人工标注员逐一标注每个样本的关键区域"
    - "使用 GPT-4 直接输出边界框坐标"
    - "GPT-4 生成推理步骤描述关键区域，再用检测/OCR 模型转化为坐标"
    - "从原始数据集的已有标注中直接复用"
  answer: 2
  explain: "数据集构建采用两步流水线：先用 GPT-4 生成包含区域描述的推理步骤，再用 Grounding DINO、PaddleOCR 等专用模型将自然语言描述转化为精确的边界框坐标。"
```

### Image-of-Thought

```yaml
id: image_of_thought
num: 10
name: Image-of-Thought
full_name: 图像思维提示 (Image-of-Thought Prompting)
year: '2024.05'
org: CUHK
parent: visual_cot
paper_url: https://arxiv.org/abs/2405.13872
project_url: ''
category: mm_cot
motivation: 每步锚定文本与视觉证据，精细化推理
```

#### 📝 一句话总结
Image-of-Thought 的核心目标是：每步锚定文本与视觉证据，精细化推理。

#### 🎯 核心要点
- 核心动机：每步锚定文本与视觉证据，精细化推理
- 演化来源：继承或改进自 visual_cot
- 代表机构：CUHK

#### 🔬 深入细节
每步锚定文本与视觉证据，精细化推理


### LLaVA-CoT

```yaml
id: llava_cot
num: 11
name: LLaVA-CoT
full_name: LLaVA思维链推理 (LLaVA Chain-of-Thought)
year: '2025'
org: ByteDance
parent: llava
paper_url: https://openaccess.thecvf.com/content/ICCV2025/html/Xu_LLaVA-CoT_Let_Vision_Language_Models_Reason_Step-by-Step_ICCV_2025_paper.html
project_url: ''
category: mm_cot
motivation: 让VLM逐步推理，结构化提升多步准确性
```

#### 📝 一句话总结
LLaVA-CoT 提出将视觉语言模型的推理过程分解为四个结构化阶段（摘要→描述→推理→结论），并配合阶段级束搜索与回溯机制（SWIRES），在仅 100k 训练数据的条件下使 11B 模型在多个推理基准上超越 GPT-4o-mini，实现了多模态 CoT 推理的系统性突破。

#### 🎯 核心要点
- **四阶段结构化推理**：将响应分为 `<SUMMARY>`、`<CAPTION>`、`<REASONING>`、`<CONCLUSION>` 四个 XML 标签包裹的阶段，强制模型先规划、再观察、再推理、最后总结
- **LLaVA-CoT-100k 数据集**：从 ShareGPT4V、ChartQA、A-OKVQA、GeoQA+ 等 10 个 VQA 数据集中筛选 99k 样本，由 GPT-4o 生成四阶段格式的推理标注
- **基座模型**：Llama-3.2-11B-Vision-Instruct，全参数 SFT，8×H100 训练
- **SWIRES（Stage-wise Beam Search with Backtracking）**：测试时在每个推理阶段生成多个候选、用奖励模型评分筛选、不满足阈值则回溯重试，实现阶段级 test-time scaling
- **奖励模型**：InternLM-XComposer2.5-Reward（IXC-2.5-Reward），用于在线评估各阶段输出质量
- **性能**：6 个基准平均从基座 56.6 提升至 62.4（训练后）→ 65.5（+SWIRES），在 MMStar、MMBench、MathVista 等推理密集型任务上超越 GPT-4o-mini 和 Gemini-1.5-pro
- **消融发现**：直接训练 CoT 数据（无标签）= 59.0，加标签但无结构 = 60.9，完整四阶段 = 62.4，证明结构化标签是关键

#### 🔬 深入细节
##### 动机与背景

当前视觉语言模型（VLM）在面对复杂推理任务时存在两个关键问题：

1. **仓促回答**：模型未充分组织问题信息就直接给出答案，例如 Llama-3.2-11B-Vision-Instruct 在看到"这个人接下来会做什么？"的问题时，误将选项中的"cry"理解为自杀倾向而拒绝回答
2. **推理偏离**：模型在推理过程中偏离逻辑路径，草率得出"问题无意义"等错误结论

这些问题的根源在于：VLM 缺乏系统性的推理框架来组织"看什么→想什么→怎么推→得什么"的完整思维链。传统的 CoT prompting 虽然在 LLM 中有效，但直接应用于 VLM 时效果有限（实验显示基座模型加 CoT 提示后平均分不变，仍为 56.9）。

> 💡 关键洞察：VLM 的推理不仅需要语言层面的链式思考，还需要在**视觉感知**和**逻辑推理**之间建立显式的阶段划分。

##### 核心方法：四阶段结构化推理

![LLaVA-CoT 四阶段推理框架](assets/llava_cot_framework.png)
*图：LLaVA-CoT 将推理过程分解为 Summary → Caption → Reasoning → Conclusion 四个阶段*

LLaVA-CoT 的核心创新是将模型的推理过程显式分解为四个阶段，每个阶段用 XML 标签包裹：

**Stage 1 — Summary（问题摘要）**：模型首先概述解题思路，规划后续步骤。这迫使模型在回答前先"想清楚要做什么"，避免仓促回答。

**Stage 2 — Caption（视觉描述）**：模型描述图像中与问题相关的细节。这一阶段将视觉感知与推理解耦，确保模型充分"看清楚图片内容"。

**Stage 3 — Reasoning（逻辑推理）**：基于前两个阶段的信息，模型进行逐步的逻辑推理。这是传统 CoT 的核心部分，但因为有了前置的规划和观察，推理质量显著提升。

**Stage 4 — Conclusion（最终结论）**：给出简洁直接的最终答案。

模型输出格式示例：
```
<SUMMARY>我需要分析图中的几何关系来求解角度...</SUMMARY>
<CAPTION>图中显示一个三角形ABC，其中角A=60°，边AB上有一点D...</CAPTION>
<REASONING>由三角形内角和定理，角B+角C=120°。又因为AD是角平分线...</REASONING>
<CONCLUSION>角BDC = 120°</CONCLUSION>
```

> ⚠️ 注意：标签结构不是简单的 prompt 工程——模型通过 SFT 学会了在生成过程中自主切换阶段，标签成为模型内部推理流程的一部分。

##### 数据集构建：LLaVA-CoT-100k

数据集构建流程：

1. **来源选择**：从 10 个 VQA 数据集中采样，覆盖通用 VQA（ShareGPT4V, A-OKVQA）、图表理解（ChartQA, DVQA）、文档/OCR（DocVQA, SynthDoG-EN）、数学推理（GeoQA+, CLEVR-Math）、科学推理（AI2D）等多种任务类型
2. **GPT-4o 标注**：将原始问题、图像和标准答案提供给 GPT-4o，要求其按四阶段格式生成推理过程
3. **格式验证**：过滤不符合 XML 标签格式的输出
4. **答案一致性检查**：用 GPT-4o 验证生成的 CONCLUSION 与原始标准答案是否一致，过滤拒绝回答或答案不匹配的样本

最终得到约 99k 高质量样本。

##### 训练细节

| 参数 | 值 |
|------|-----|
| 基座模型 | Llama-3.2-11B-Vision-Instruct |
| 训练方式 | 全参数 SFT（FSDP） |
| 学习率 | \(1 \times 10^{-5}\) |
| Epochs | 3 |
| Batch size | 4 |
| Context length | 4096 |
| 混合精度 | True |
| 硬件 | 8 × H100 GPU |

##### SWIRES：阶段级测试时搜索

![SWIRES 阶段级束搜索与回溯机制](assets/llava_cot_swires.png)
*图：SWIRES 在每个推理阶段生成多个候选，用奖励模型评分筛选，不满足条件则回溯*

SWIRES（Stage-wise Beam Search with Backtracking）是 LLaVA-CoT 的测试时缩放方法，其核心思想是：**利用四阶段结构的天然分界点，在每个阶段独立进行束搜索和质量控制**。

算法伪代码：

```python
# SWIRES: Stage-wise Retrace Algorithm
# M=4 (candidates per stage), N=2 (keep top), C=3 (max backtracks)
def swires(question, image, reward_model, M=4, N=2, C=3):
    # Stage 1: Generate one summary
    summary = generate_summary(question, image)
    
    backtrack_count = 0
    candidates, scores = [], []
    
    while backtrack_count < C:
        # Stage 2: Generate M captions, keep top N
        captions = [generate_caption(summary) for _ in range(M)]
        caption_scores = [reward_model.score(c) for c in captions]
        top_captions = top_k(captions, caption_scores, N)
        
        # Stage 3: Generate M reasonings per caption
        for caption in top_captions:
            reasonings = [generate_reasoning(caption) for _ in range(M)]
            for r in reasonings:
                candidates.append(r)
                scores.append(reward_model.score(r))
        
        # Check backtrack condition
        sorted_scores = sorted(scores, reverse=True)
        threshold = reward_mean + Z * reward_std  # Z=0.2533
        if sorted_scores[1] >= threshold:  # 2nd best passes
            break
        backtrack_count += 1
    
    # Stage 4: Generate conclusion for top N reasonings
    top_reasonings = top_k(candidates, scores, N)
    conclusions = [generate_conclusion(r) for r in top_reasonings]
    conclusion_scores = [reward_model.score(c) for c in conclusions]
    
    return conclusions[argmax(conclusion_scores)]
```

**回溯阈值设计**：

回溯条件基于奖励分数的统计分布：

$$\text{backtrack\_cutoff} = \mu_{\text{reward}} + Z \times \sigma_{\text{reward}}$$

其中 \(\mu_{\text{reward}} = -0.77\)，\(\sigma_{\text{reward}} = 2.08\)，\(Z = 0.2533\)。这个 Z 值对应标准正态分布中 top 40% 的分位点——即只要第二好的候选分数超过此阈值（意味着它在分布中排名前 40%），就认为当前候选集质量足够，无需回溯。

> 💡 关键：SWIRES 与传统 Best-of-N 搜索的本质区别在于**阶段级粒度**。传统方法在完整响应级别搜索，而 SWIRES 在每个阶段独立搜索，允许不同阶段的最优候选自由组合，搜索效率更高。

##### 与传统方法的对比

| 方法 | 搜索粒度 | 回溯能力 | 适用场景 |
|------|---------|---------|---------|
| Best-of-N | 完整响应 | 无 | 通用 |
| Beam Search | Token 级 | 无 | 生成质量 |
| SWIRES | 推理阶段级 | 有（阶段间回溯） | 结构化推理 |

实验表明，SWIRES 在相同计算预算下显著优于 Best-of-N：在 MMStar 上，Best-of-N（32 次采样）达到 59.5，而 SWIRES（等效计算量）达到 61.2。

##### 实验结果

**主要结果（6 个推理基准）**：

| 模型 | MMStar | MMBench | MMVet | MathVista | AI2D | Hallusion | Avg |
|------|--------|---------|-------|-----------|------|-----------|-----|
| Llama-3.2-11B (base) | 49.8 | 65.8 | 57.6 | 47.6 | 77.0 | 41.9 | 56.6 |
| GPT-4o-mini | 54.9 | 76.9 | 66.9 | 52.4 | 77.8 | 46.1 | 62.5 |
| **LLaVA-CoT** | **57.6** | 73.8 | 60.0 | **54.8** | **85.0** | 43.1 | **62.4** |
| **LLaVA-CoT + SWIRES** | **61.2** | **75.3** | **63.2** | **57.4** | **85.7** | **50.1** | **65.5** |

**消融实验（训练策略）**：

| 训练方式 | MMStar | Avg |
|---------|--------|-----|
| 基座直接推理 | 49.8 | 56.6 |
| 直接训练 CoT（无标签） | 51.8 | 59.0 |
| 加标签但无结构 | 54.3 | 60.9 |
| **完整四阶段（LLaVA-CoT）** | **57.6** | **62.4** |

消融结果清晰表明：(1) CoT 训练本身带来 +2.4 的提升；(2) XML 标签结构额外带来 +1.9；(3) 完整四阶段设计再带来 +1.5。结构化标签不仅是格式约束，更是帮助模型建立内部推理流程的关键机制。

**MMStar 技能维度分析**显示，LLaVA-CoT 的增益主要来自推理密集型维度（Instance Reasoning +10.7, Logical Reasoning +9.3, Math +10.0, Science & Tech +8.0），而在感知维度（Coarse/Fine-grained Perception）上提升较小（+3.3/+4.0），验证了方法确实增强了推理而非感知能力。

#### 🧪 练习题
```yaml
question: "LLaVA-CoT 的 SWIRES 测试时搜索方法与传统 Best-of-N 采样的核心区别是什么？"
options:
  - "SWIRES 使用更大的采样温度来增加多样性"
  - "SWIRES 在每个推理阶段独立进行束搜索和回溯，而非在完整响应级别搜索"
  - "SWIRES 使用更强的奖励模型进行评分"
  - "SWIRES 通过微调模型参数来提升推理质量"
answer: 1
explain: "SWIRES 利用四阶段结构化推理的天然分界点，在 Caption、Reasoning、Conclusion 每个阶段独立生成多个候选并用奖励模型筛选，还支持阶段间回溯。这种阶段级粒度的搜索比完整响应级别的 Best-of-N 更高效，因为它允许不同阶段的最优候选自由组合。"
```

### VisProg

```yaml
id: visprog
num: 12
name: VisProg
full_name: 视觉编程 (Visual Programming)
year: '2023'
org: UW
parent: blip2
paper_url: http://openaccess.thecvf.com/content/CVPR2023/html/Gupta_Visual_Programming_Compositional_Visual_Reasoning_Without_Training_CVPR_2023_paper.html
project_url: ''
category: compositional
motivation: LLM生成Python调用视觉API，无需训练
```

#### 📝 一句话总结
VisProg 的核心目标是：LLM生成Python调用视觉API，无需训练。

#### 🎯 核心要点
- 核心动机：LLM生成Python调用视觉API，无需训练
- 演化来源：继承或改进自 blip2
- 代表机构：UW

#### 🔬 深入细节
LLM生成Python调用视觉API，无需训练


### ViperGPT

```yaml
id: vipergpt
num: 13
name: ViperGPT
full_name: Python执行视觉推理 (Visual Inference via Python Execution)
year: '2023'
org: Columbia
parent: visprog
paper_url: https://openaccess.thecvf.com/content/ICCV2023/html/Suris_ViperGPT_Visual_Inference_via_Python_Execution_for_Reasoning_ICCV_2023_paper.html
project_url: ''
category: compositional
motivation: 代码执行实现可解释可调试的视觉推理
```

#### 📝 一句话总结
ViperGPT 的核心目标是：代码执行实现可解释可调试的视觉推理。

#### 🎯 核心要点
- 核心动机：代码执行实现可解释可调试的视觉推理
- 演化来源：继承或改进自 visprog
- 代表机构：Columbia

#### 🔬 深入细节
代码执行实现可解释可调试的视觉推理


### GENOME

```yaml
id: genome
num: 14
name: GENOME
full_name: 生成式神经符号推理 (Generative Neuro-Symbolic Reasoning)
year: '2024'
org: MIT
parent: vipergpt
paper_url: https://openreview.net/forum?id=GENOME2024
project_url: ''
category: compositional
motivation: 模块生长与重用，动态扩展组合泛化
```

#### 📝 一句话总结
GENOME 的核心目标是：模块生长与重用，动态扩展组合泛化。

#### 🎯 核心要点
- 核心动机：模块生长与重用，动态扩展组合泛化
- 演化来源：继承或改进自 vipergpt
- 代表机构：MIT

#### 🔬 深入细节
模块生长与重用，动态扩展组合泛化


### CoT-VLA

```yaml
id: cot_vla
num: 15
name: CoT-VLA
full_name: 视觉语言动作思维链 (Chain-of-Thought for Vision-Language-Action)
year: '2025'
org: Stanford
parent: llava_cot
paper_url: http://openaccess.thecvf.com/content/CVPR2025/html/Zhao_CoT-VLA_Visual_Chain-of-Thought_Reasoning_for_Vision-Language-Action_Models_CVPR_2025_paper.html
project_url: ''
category: compositional
motivation: CoT扩展至具身智能，提升机器人决策
```

#### 📝 一句话总结
CoT-VLA 提出在视觉-语言-动作模型中引入**视觉思维链（Visual Chain-of-Thought）**机制，在预测动作之前先自回归生成未来子目标图像作为隐式推理步骤，结合混合注意力机制和动作分块策略，显著提升了机器人在仿真与真实环境中的长时操作任务成功率。

#### 🎯 核心要点
- **视觉思维链（Visual CoT）**：在动作预测前先生成未来子目标图像（预测未来约 0.4 秒的场景），作为视觉推理的中间步骤，替代传统文本 CoT
- **基础模型 VILA-U 7B**：基于统一视觉-语言模型，使用离散视觉 tokenizer 将图像编码为 \(16 \times 16 \times 4 = 1024\) 个 token，实现图像理解与生成的统一
- **混合注意力机制（Hybrid Attention）**：图像/文本 token 使用因果注意力，动作 token 使用全注意力（bidirectional），使动作预测能同时利用所有上下文信息
- **动作分块（Action Chunking）**：每步预测 10 个连续动作（7-DoF，256 bins 离散化），减少自回归步数，提升推理效率
- **两阶段训练**：先在 OpenX-Embodiment、EPIC-KITCHENS、Something-Something V2 上预训练视觉预测能力，再在目标机器人数据上微调
- **三大评估基准**：LIBERO 仿真（4 个任务套件）、Bridge-V2 真实机器人、Franka 桌面操作，均取得 SOTA 或竞争性结果

#### 🔬 深入细节
##### 整体架构

![CoT-VLA 与传统 VLA 对比](https://ar5iv.labs.arxiv.org/html/2503.22020/assets/x1.png)
*图 1：传统 VLA 直接从观测预测动作（System-1 快思考），CoT-VLA 先生成子目标图像再预测动作（System-2 慢思考），实现视觉推理*

![CoT-VLA 模型架构](https://ar5iv.labs.arxiv.org/html/2503.22020/assets/x2.png)
*图 2：CoT-VLA 完整架构。输入为当前观测图像 + 语言指令，模型先自回归生成子目标图像 token，再基于混合注意力预测动作 chunk*

CoT-VLA 的核心思想源自认知科学中的 **System-1 / System-2 双系统理论**：传统 VLA（如 OpenVLA、π₀）类似 System-1 的快速反射式决策，直接从观测映射到动作；而 CoT-VLA 引入 System-2 的慢思考过程——在输出动作前，先"想象"未来场景会是什么样子，再据此做出决策。

##### 视觉思维链机制

**为什么用视觉 CoT 而非文本 CoT？** 机器人操作任务的推理本质上是空间性的——物体在哪里、手臂该往哪移动、目标状态是什么样。这些信息用自然语言描述既冗长又不精确，而一张子目标图像可以直接编码丰富的空间几何信息。

**子目标图像的定义**：给定当前时刻 \(t\) 的观测，子目标图像为未来 \(t + k\) 时刻的图像帧（\(k\) 对应约 0.4 秒后的场景）。训练时直接从演示轨迹中取对应帧作为监督信号，无需额外标注。

**图像 token 化**：使用 VILA-U 的离散视觉 tokenizer，将 \(256 \times 256\) 的图像编码为 \(16 \times 16\) 的空间网格，每个位置有 4 层残差深度（residual depth），共 \(1024\) 个离散 token。生成子目标图像时按光栅扫描顺序自回归生成这些 token。

训练损失函数为：

$$\mathcal{L} = \mathcal{L}_{\text{visual}} + \mathcal{L}_{\text{action}}$$

其中：

$$\mathcal{L}_{\text{visual}} = -\sum_{i=1}^{N_{\text{img}}} \log p_\theta(v_i \mid v_{<i}, \mathbf{o}, \mathbf{l})$$

$$\mathcal{L}_{\text{action}} = -\sum_{j=1}^{N_{\text{act}}} \log p_\theta(a_j \mid a_{<j}, \hat{\mathbf{s}}, \mathbf{o}, \mathbf{l})$$

> 💡 **关键**：视觉损失 \(\mathcal{L}_{\text{visual}}\) 迫使模型学习预测未来场景的能力（即世界模型），而动作损失 \(\mathcal{L}_{\text{action}}\) 确保生成的子目标图像能有效指导动作预测。两者联合优化使模型同时具备"想象"和"执行"能力。

##### 混合注意力机制

![混合注意力机制](https://ar5iv.labs.arxiv.org/html/2503.22020/assets/x3.png)
*图 3：混合注意力设计。图像和文本 token 使用因果注意力（下三角掩码），动作 token 使用全注意力（可看到所有 token）*

传统 LLM 使用纯因果注意力（每个 token 只能看到之前的 token），这对文本生成是合理的，但对动作预测并非最优——一个动作 chunk 中的各个动作应该相互协调。

CoT-VLA 的混合注意力设计：
- **图像 token 和文本 token**：保持因果注意力，维持自回归生成能力
- **动作 token**：使用全注意力（bidirectional），每个动作 token 可以看到所有其他 token（包括后续的动作 token）

> ⚠️ **注意**：这种设计使得动作 token 不再是严格自回归的，而是类似 BERT 的双向编码。这意味着动作 chunk 内的所有动作可以并行解码，既提升了质量又不增加推理延迟。

##### 动作表示与分块

- **动作空间**：7-DoF（6 维末端执行器位姿 + 1 维夹爪开合）
- **离散化**：每个维度均匀量化为 256 个 bin
- **动作分块**：每次预测 \(C = 10\) 个连续动作，共 \(10 \times 7 = 70\) 个 token
- 执行时使用时序集成（temporal ensembling）平滑相邻 chunk 的重叠动作

##### 核心算法伪代码

```python
# CoT-VLA 推理流程
def cot_vla_inference(observation, language_instruction, model):
    # Step 1: 编码输入
    img_tokens = visual_tokenizer.encode(observation)  # 1024 tokens
    text_tokens = text_tokenizer.encode(language_instruction)
    
    # Step 2: Visual Chain-of-Thought — 自回归生成子目标图像
    subgoal_tokens = []
    for i in range(1024):  # 16x16x4 tokens
        next_token = model.generate_next(
            context=[img_tokens, text_tokens, subgoal_tokens],
            attention="causal"  # 因果注意力
        )
        subgoal_tokens.append(next_token)
    subgoal_image = visual_tokenizer.decode(subgoal_tokens)
    
    # Step 3: 动作预测 — 全注意力并行解码
    action_chunk = model.predict_actions(
        context=[img_tokens, text_tokens, subgoal_tokens],
        num_actions=10,  # chunk size C=10
        attention="full"  # 动作 token 间全注意力
    )  # shape: (10, 7), 每个动作 7-DoF
    
    # Step 4: 离散 bin → 连续动作值
    actions = dequantize(action_chunk, num_bins=256)
    return actions, subgoal_image
```

##### 训练流程

**阶段一：预训练（视觉预测能力）**
- 数据：OpenX-Embodiment 子集（Bridge-V2、Fractal 等）+ EPIC-KITCHENS（人手操作视频）+ Something-Something V2（人-物交互视频）
- 目标：仅优化 \(\mathcal{L}_{\text{visual}}\)，训练模型预测未来图像帧的能力
- 预训练带来 **46.7% 的相对性能提升**，说明视觉预测预训练对下游任务至关重要

**阶段二：微调（目标任务）**
- 数据：目标机器人的演示轨迹
- 目标：联合优化 \(\mathcal{L}_{\text{visual}} + \mathcal{L}_{\text{action}}\)
- 超参数：学习率 \(2 \times 10^{-5}\)，batch size 128（LIBERO）/ 256（Bridge-V2），训练 100 epoch

##### 与传统方法的区别

| 特性 | OpenVLA | π₀ | CoT-VLA |
|------|---------|-----|---------|
| 推理方式 | 直接映射 | 扩散去噪 | 视觉 CoT + 动作预测 |
| 动作表示 | 离散 token | 连续（flow matching） | 离散 token（分块） |
| 注意力 | 纯因果 | 因果 | 混合（因果 + 全） |
| 世界模型 | 无 | 无 | 隐式（子目标生成） |
| 推理速度 | 快 | 中等 | 较慢（7× overhead） |

##### 实验结果

**LIBERO 仿真基准**（4 个任务套件，每套 10 个任务，每任务 20 次评估）：

| 方法 | LIBERO-Spatial | LIBERO-Object | LIBERO-Goal | LIBERO-Long | 平均 |
|------|---------------|---------------|-------------|-------------|------|
| Diffusion Policy | 78.3% | 92.5% | 68.3% | 50.5% | 72.4% |
| OpenVLA | 84.7% | 88.4% | 51.6% | 46.7% | 67.8% |
| π₀ (fine-tuned) | 82.3% | 90.0% | 75.0% | 62.5% | 77.5% |
| **CoT-VLA** | **86.3%** | **91.0%** | **79.0%** | **68.2%** | **81.1%** |

CoT-VLA 在所有 4 个套件上均取得最佳或接近最佳结果，尤其在需要长期推理的 LIBERO-Long 上优势明显（+5.7% vs π₀）。

**消融实验关键发现**：
- 动作分块（+8.4%）、混合注意力（+6.1%）、视觉 CoT（+4.9%）各自贡献显著
- 使用 **GT 目标图像**替代生成的子目标图像时，成功率提升约 **40%**，表明提升视觉生成质量是重要的未来方向
- 预训练带来 46.7% 的相对提升，验证了跨域视觉预测迁移的有效性

![子目标图像可视化](https://ar5iv.labs.arxiv.org/html/2503.22020/assets/x5.png)
*图 5：CoT-VLA 生成的子目标图像示例。尽管图像质量不如扩散模型，但已足够捕捉物体位置和机械臂姿态的关键变化*

##### 局限性

- **推理延迟**：生成 1024 个图像 token 导致约 **7 倍推理减速**（约 1 秒/步），限制了实时应用
- **图像质量**：离散 tokenizer 生成的图像质量低于扩散模型，存在伪影
- **动作 chunk 不连续**：相邻 chunk 之间可能出现不平滑过渡，时序集成仅部分缓解

#### 🧪 练习题
```yaml
question: "CoT-VLA 中视觉思维链（Visual CoT）的核心作用是什么？"
options:
  - "用文本描述未来场景，指导动作生成"
  - "在动作预测前生成子目标图像作为隐式推理步骤，提供空间规划信息"
  - "通过扩散模型生成高质量目标图像用于奖励计算"
  - "将动作序列可视化为图像以便人类监督"
answer: 1
explain: "CoT-VLA 的核心创新是在预测动作前先自回归生成未来子目标图像（而非文本），这些图像编码了丰富的空间信息，作为视觉推理的中间步骤指导后续动作预测。"
```

### MVoT

```yaml
id: mvot
num: 16
name: MVoT
full_name: 多模态可视化思维 (Multimodal Visualization-of-Thought)
year: '2025.01'
org: PKU
parent: visual_cot
paper_url: https://arxiv.org/abs/2501.07542
project_url: ''
category: frontier_2026
motivation: 生成图像想象推理过程，空间推理优势
```

#### 📝 一句话总结
MVoT 的核心目标是：生成图像想象推理过程，空间推理优势。

#### 🎯 核心要点
- 核心动机：生成图像想象推理过程，空间推理优势
- 演化来源：继承或改进自 visual_cot
- 代表机构：PKU

#### 🔬 深入细节
生成图像想象推理过程，空间推理优势


### Latent Sketchpad

```yaml
id: latent_sketchpad
num: 17
name: Latent Sketchpad
full_name: 潜空间草图板 (Latent Sketchpad)
year: '2025'
org: Google
parent: mvot
paper_url: https://arxiv.org/abs/2501.latentsketchpad
project_url: ''
category: frontier_2026
motivation: 潜空间草图绘制，高效辅助复杂推理
```

#### 📝 一句话总结
Latent Sketchpad 的核心目标是：潜空间草图绘制，高效辅助复杂推理。

#### 🎯 核心要点
- 核心动机：潜空间草图绘制，高效辅助复杂推理
- 演化来源：继承或改进自 mvot
- 代表机构：Google

#### 🔬 深入细节
潜空间草图绘制，高效辅助复杂推理


### Visual Thoughts

```yaml
id: visual_thoughts
num: 18
name: Visual Thoughts
full_name: '视觉思维统一视角 (Visual Thoughts: Unified Perspective)'
year: '2026'
org: Tsinghua
parent: mvot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/8a57d66b8e0cc468dbb6574114f60f0c-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 统一视觉思维框架，整合多种操作
```

#### 📝 一句话总结
Visual Thoughts 的核心目标是：统一视觉思维框架，整合多种操作。

#### 🎯 核心要点
- 核心动机：统一视觉思维框架，整合多种操作
- 演化来源：继承或改进自 mvot
- 代表机构：Tsinghua

#### 🔬 深入细节
统一视觉思维框架，整合多种操作


### COVT

```yaml
id: covt
num: 19
name: COVT
full_name: 连续视觉思维链 (Chain-of-Visual-Thought)
year: '2025'
org: SJTU
parent: visual_thoughts
paper_url: https://arxiv.org/abs/2501.covt
project_url: ''
category: frontier_2026
motivation: 连续视觉Token推理，无需外部工具
```

#### 📝 一句话总结
COVT 的核心目标是：连续视觉Token推理，无需外部工具。

#### 🎯 核心要点
- 核心动机：连续视觉Token推理，无需外部工具
- 演化来源：继承或改进自 visual_thoughts
- 代表机构：SJTU

#### 🔬 深入细节
连续视觉Token推理，无需外部工具


### Zebra-CoT

```yaml
id: zebra_cot
num: 20
name: Zebra-CoT
full_name: 交错视觉语言推理数据集 (Zebra Chain-of-Thought Dataset)
year: '2025'
org: Meta
parent: visual_thoughts
paper_url: https://arxiv.org/abs/2507.16746
project_url: ''
category: frontier_2026
motivation: 交错视觉语言推理数据，训练基础
```

#### 📝 一句话总结
Zebra-CoT 的核心目标是：交错视觉语言推理数据，训练基础。

#### 🎯 核心要点
- 核心动机：交错视觉语言推理数据，训练基础
- 演化来源：继承或改进自 visual_thoughts
- 代表机构：Meta

#### 🔬 深入细节
交错视觉语言推理数据，训练基础


### Reason-RFT

```yaml
id: reason_rft
num: 21
name: Reason-RFT
full_name: 视觉推理强化微调 (Reinforcement Fine-Tuning for Visual Reasoning)
year: '2026'
org: NTU
parent: llava_cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/08d70284b013c03ba89cd2b642bc864b-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: GRPO强化微调，提升推理泛化能力
```

#### 📝 一句话总结
Reason-RFT 的核心目标是：GRPO强化微调，提升推理泛化能力。

#### 🎯 核心要点
- 核心动机：GRPO强化微调，提升推理泛化能力
- 演化来源：继承或改进自 llava_cot
- 代表机构：NTU

#### 🔬 深入细节
GRPO强化微调，提升推理泛化能力


### VisionThink

```yaml
id: visionthink
num: 22
name: VisionThink
full_name: 智能高效视觉语言模型 (Smart and Efficient VLM via RL)
year: '2026'
org: CUHK
parent: reason_rft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/88be023075a5a3ff3dc3b5d26623fa22-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: RL+Token压缩，效率与性能平衡
```

#### 📝 一句话总结
VisionThink 提出了一种动态分辨率视觉语言模型范式：模型先接收低分辨率图像进行推理，通过强化学习（Multi-Turn GRPO）自主决定是否需要请求高分辨率图像，结合 LLM-as-Judge 评估开放式 VQA 答案，在保持甚至超越全分辨率模型性能的同时大幅降低视觉 token 数量和推理时间。

#### 🎯 核心要点
- **动态分辨率推理范式**：模型首先接收低分辨率图像（如 384×384），在推理过程中自主决定是否调用 `<resize>` 工具获取高分辨率图像（如 768×768），实现"按需升分辨率"
- **Multi-Turn GRPO 训练**：将 GRPO（Group Relative Policy Optimization）扩展为多轮交互场景，模型在第一轮输出后可能触发工具调用，工具返回的 token 被 mask 不参与策略梯度计算
- **LLM-as-Judge 奖励机制**：使用 Qwen2.5-72B-Instruct 作为裁判模型评估开放式 VQA 答案的正确性，解决传统精确匹配无法处理同义表达的问题
- **Penalty 控制机制**：通过阈值 \(\theta\)（默认 0.2）控制高分辨率请求比例——仅当 resize 比例超过阈值时施加惩罚，平衡性能与效率
- **训练数据**：仅需 20K 样本（10K 高分辨率依赖 + 10K 低分辨率可解），涵盖 MathVerse、AI2D、ChartQA、DocVQA 等多类型数据
- **显著效率提升**：相比全分辨率基线，视觉 token 减少约 62%，推理时间减少约 66%，同时在多数基准上性能持平或提升

#### 🔬 深入细节
##### 核心框架

![VisionThink 框架总览](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x2.png)
*图：VisionThink 框架。(a) 左图展示推理流程——模型先接收低分辨率图像，自主决定是否调用 resize 工具获取高分辨率图像；(b) 右图展示 Multi-Turn GRPO 训练流程，包含 LLM-as-Judge 奖励评估。*

##### 动机与背景

当前视觉语言模型（VLM）为追求高性能，普遍采用高分辨率图像输入，导致视觉 token 数量急剧增长。例如，将图像从 384×384 提升到 768×768，视觉 token 数量从约 729 增加到约 2916（4 倍增长）。然而，论文的关键观察是：**并非所有任务都需要高分辨率输入**。

![关键观察](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x1.png)
*图：(a) 不同分辨率下的性能对比——部分基准（如 MathVerse）在低分辨率下即可达到高性能，而 OCR 类基准（如 DocVQA）确实需要高分辨率；(b)(c) VisionThink 在性能和效率上的优势。*

传统的高效 VLM 方法（如 FastV、FitPrune）通过注意力分数剪枝或合并 token 来减少冗余，但它们：
1. 对所有样本施加**固定比例**的 token 削减，无法区分简单/困难样本
2. 在 OCR 相关基准上性能下降严重
3. 是**被动的后处理策略**，而非让模型主动决策

VisionThink 提出了一种全新范式：让模型**主动思考**是否需要更多视觉信息，将分辨率选择从工程启发式转变为模型的内生能力。

##### 核心技术方案

**1. Multi-Turn 推理流程**

推理过程分为两种路径：

- **路径 A（低分辨率足够）**：模型接收低分辨率图像 → 思考 → 直接输出答案
- **路径 B（需要高分辨率）**：模型接收低分辨率图像 → 思考 → 输出 `<resize>` 工具调用 → 环境返回高分辨率图像 → 继续思考 → 输出答案

```python
# VisionThink 推理伪代码
def visionthink_inference(model, image, question):
    # Step 1: 输入低分辨率图像
    low_res_image = resize(image, 384)
    low_res_tokens = vision_encoder(low_res_image)  # ~729 tokens
    
    # Step 2: 模型第一轮推理
    prompt = f"<image>{low_res_tokens}</image>\n{question}"
    response_turn1 = model.generate(prompt)
    
    # Step 3: 检查是否请求高分辨率
    if "<resize>" in response_turn1:
        # 环境返回高分辨率图像
        high_res_image = resize(image, 768)
        high_res_tokens = vision_encoder(high_res_image)  # ~2916 tokens
        
        # Step 4: 模型第二轮推理（拼接高分辨率信息）
        prompt_turn2 = prompt + response_turn1 + f"<image>{high_res_tokens}</image>"
        response_turn2 = model.generate(prompt_turn2)
        return extract_answer(response_turn2)
    else:
        return extract_answer(response_turn1)
```

**2. LLM-as-Judge 奖励设计**

传统 RL 训练中，VQA 答案的正确性通常通过精确字符串匹配判断。但开放式问答中，语义等价的不同表达（如 "2/3" vs "0.667"、"New York" vs "NYC"）会被误判为错误。VisionThink 引入 LLM-as-Judge 解决此问题：

$$r_{\text{acc}}(q, a, a^*) = \text{LLM-Judge}(q, a, a^*) \in \{0, 1\}$$

其中 \(q\) 为问题，\(a\) 为模型预测答案，\(a^*\) 为标准答案。裁判模型（Qwen2.5-72B-Instruct）综合考虑问题语境，判断语义等价性。

> 💡 **关键**：LLM-as-Judge 不仅提升了奖励信号的准确性，还使得训练数据中可以包含更多开放式 VQA 样本，扩大了可用训练数据的范围。

**3. Multi-Turn GRPO**

标准 GRPO 的目标函数为：

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{q \sim P(Q), \{o_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(O|q)} \left[ \frac{1}{G} \sum_{i=1}^G \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} \min\left(\rho_{i,t} \hat{A}_{i}, \text{clip}(\rho_{i,t}, 1-\varepsilon, 1+\varepsilon) \hat{A}_{i}\right) - \beta D_{\text{KL}} \right]$$

其中 \(\rho_{i,t} = \frac{\pi_\theta(o_{i,t} | q, o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t} | q, o_{i,<t})}\) 为新旧策略的概率比，\(\hat{A}_i\) 为基于组内奖励归一化的优势值。

VisionThink 将其扩展为 **Multi-Turn** 版本，关键修改是：**工具返回的 token（高分辨率图像 token）不参与策略梯度计算**，因为这些 token 由环境生成，不属于模型策略的一部分：

$$\mathcal{J}_{\text{MT-GRPO}}(\theta) = \mathbb{E}\left[ \frac{1}{G} \sum_{i=1}^G \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} \mathbf{m}_{i,t} \cdot \min\left(\rho_{i,t} \hat{A}_{i}, \text{clip}(\rho_{i,t}, 1-\varepsilon, 1+\varepsilon) \hat{A}_{i}\right) - \beta D_{\text{KL}} \right]$$

其中 \(\mathbf{m}_{i,t}\) 为 mask 向量：模型生成的 token 处为 1，工具返回的 token 处为 0。

> ⚠️ **注意**：如果不对工具返回 token 进行 mask，这些 token 的梯度会干扰策略优化，因为模型无法控制环境返回的内容。

**4. 奖励函数与 Penalty 机制**

总奖励由三部分组成：

$$R = r_{\text{acc}} + r_{\text{format}} + r_{\text{penalty}}$$

- **准确性奖励** \(r_{\text{acc}} \in \{0, 1\}\)：由 LLM-as-Judge 评估
- **格式奖励** \(r_{\text{format}}\)：鼓励模型使用 `<think>...</think>` 和 `<answer>...</answer>` 标签的规范输出格式
- **Penalty 惩罚** \(r_{\text{penalty}}\)：控制高分辨率请求比例

Penalty 的设计尤为精巧。直接对所有 resize 请求施加惩罚会导致模型完全放弃使用高分辨率，在 OCR 类任务上性能崩溃。因此采用**阈值控制**：

$$r_{\text{penalty}} = \begin{cases} -\lambda & \text{if resize ratio} > \theta \text{ and sample requests resize} \\ 0 & \text{otherwise} \end{cases}$$

其中 \(\theta = 0.2\) 表示允许最多 20% 的样本请求高分辨率。只有当当前 batch 中 resize 比例超过阈值时，才对请求 resize 的样本施加惩罚。

![Penalty 消融实验](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x3.png)
*图：(a) Penalty 比例的影响——全部惩罚或完全不惩罚都不是最优策略；(b) 不同 θ 值对性能和 resize 比例的影响。*

**5. 训练数据构建**

训练数据仅需 20K 样本，按以下策略构建：

- **10K 高分辨率依赖样本**：从 DocVQA、ChartQA、InfoVQA 等 OCR 密集型数据集中筛选，这些样本在低分辨率下性能显著下降
- **10K 低分辨率可解样本**：从 MathVerse、AI2D、ScienceQA 等数据集中筛选，这些样本在低分辨率下即可正确回答

这种混合构建确保模型学会**区分**何时需要高分辨率、何时低分辨率即可。

##### 效率与性能分析

![推理效率对比](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x4.png)
*图：VisionThink 与传统高效 VLM 方法的推理时间和性能对比。VisionThink 在保持高性能的同时显著降低推理时间。*

VisionThink 的效率优势来源于：大部分样本（约 80%）仅使用低分辨率图像（729 tokens），仅约 20% 的困难样本使用高分辨率（2916 tokens）。平均视觉 token 数量从 2916 降至约 1166，减少约 60%。

![自适应 Resize 比例](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x5.png)
*图：VisionThink 在不同基准上的 resize 比例——OCR 类任务（DocVQA、ChartQA）的 resize 比例显著高于数学/科学类任务，验证了模型确实学会了"按需升分辨率"。*

> 💡 **关键洞察**：VisionThink 不是一种特定的 token 削减策略，而是一种**新范式**，可以与现有的高效 VLM 方法（如 FastV、FitPrune）正交组合，进一步提升效率。

#### 🧪 练习题
```yaml
question: "VisionThink 在 Multi-Turn GRPO 训练中，为什么要对工具返回的 token 进行 mask 处理？"
options:
  - "为了减少显存占用，加速训练"
  - "因为工具返回的 token 由环境生成，不属于模型策略，其梯度会干扰策略优化"
  - "为了防止模型过拟合到高分辨率图像特征"
  - "因为工具返回的 token 数量过多，会导致梯度爆炸"
answer: 1
explain: "工具返回的高分辨率图像 token 由环境（视觉编码器）生成，不受模型策略控制。如果不 mask，这些 token 的概率比会产生无意义的梯度信号，干扰策略优化方向。"
```

### VL-Rethinker

```yaml
id: vl_rethinker
num: 23
name: VL-Rethinker
full_name: 视觉语言自反思 (VL Self-Reflection via RL)
year: '2026'
org: PKU
parent: reason_rft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/2c84844a559e4f962752570bff456ae4-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: RL激励自反思，提升复杂推理性能
```

#### 📝 一句话总结
VL-Rethinker 的核心目标是：RL激励自反思，提升复杂推理性能。

#### 🎯 核心要点
- 核心动机：RL激励自反思，提升复杂推理性能
- 演化来源：继承或改进自 reason_rft
- 代表机构：PKU

#### 🔬 深入细节
RL激励自反思，提升复杂推理性能


### Think or Not

```yaml
id: think_or_not
num: 24
name: Think or Not
full_name: 选择性推理 (Selective Reasoning via RL)
year: '2026'
org: Tsinghua
parent: reason_rft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/a168b27492ec2eb7aa184815fa0cd046-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: GRPO选择性推理，动态调整推理深度
```

#### 📝 一句话总结
Think or Not 的核心目标是：GRPO选择性推理，动态调整推理深度。

#### 🎯 核心要点
- 核心动机：GRPO选择性推理，动态调整推理深度
- 演化来源：继承或改进自 reason_rft
- 代表机构：Tsinghua

#### 🔬 深入细节
GRPO选择性推理，动态调整推理深度


### Grounded-RL

```yaml
id: grounded_rl
num: 25
name: Grounded-RL
full_name: 接地强化学习 (Grounded Reinforcement Learning)
year: '2026'
org: CMU
parent: reason_rft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/ddbd83ac1ad27304a72b873124c2dac2-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 推理步骤锚定视觉证据，减少幻觉
```

#### 📝 一句话总结
Grounded-RL 的核心目标是：推理步骤锚定视觉证据，减少幻觉。

#### 🎯 核心要点
- 核心动机：推理步骤锚定视觉证据，减少幻觉
- 演化来源：继承或改进自 reason_rft
- 代表机构：CMU

#### 🔬 深入细节
推理步骤锚定视觉证据，减少幻觉


### SSR-CoT

```yaml
id: ssr_cot
num: 26
name: SSR-CoT
full_name: 空间推理思维链 (Spatial Reasoning Chain-of-Thought)
year: '2026'
org: SJTU
parent: visual_cot
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/b3732a13897c4cea145c3bdece80de64-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 百万级空间推理数据，增强深度感知
```

#### 📝 一句话总结
SSR-CoT 的核心目标是：百万级空间推理数据，增强深度感知。

#### 🎯 核心要点
- 核心动机：百万级空间推理数据，增强深度感知
- 演化来源：继承或改进自 visual_cot
- 代表机构：SJTU

#### 🔬 深入细节
百万级空间推理数据，增强深度感知


### MuSLR

```yaml
id: muslr
num: 27
name: MuSLR
full_name: 多模态符号逻辑推理 (Multimodal Symbolic Logical Reasoning)
year: '2026'
org: NUS
parent: genome
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/4a69d58b1a64fd931ef72cd93b71dcbe-Abstract-Conference.html
project_url: ''
category: frontier_2026
motivation: 增强鲁棒性与逻辑严密性
```

#### 📝 一句话总结
MuSLR 的核心目标是：增强鲁棒性与逻辑严密性。

#### 🎯 核心要点
- 核心动机：增强鲁棒性与逻辑严密性
- 演化来源：继承或改进自 genome
- 代表机构：NUS

#### 🔬 深入细节
增强鲁棒性与逻辑严密性


### Med-R1

```yaml
id: med_r1
num: 28
name: Med-R1
full_name: 医学多模态推理 (Medical Multimodal Reasoning via RL)
year: '2026'
org: Stanford Med
parent: reason_rft
paper_url: https://ieeexplore.ieee.org/abstract/document/11371404/
project_url: ''
category: frontier_2026
motivation: GRPO医学推理，跨模态跨任务泛化
```

#### 📝 一句话总结
Med-R1 的核心目标是：GRPO医学推理，跨模态跨任务泛化。

#### 🎯 核心要点
- 核心动机：GRPO医学推理，跨模态跨任务泛化
- 演化来源：继承或改进自 reason_rft
- 代表机构：Stanford Med

#### 🔬 深入细节
GRPO医学推理，跨模态跨任务泛化
