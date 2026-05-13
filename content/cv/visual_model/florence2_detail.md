### Florence-2

```yaml
id: florence2
name: "Florence-2"
full_name: "Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks"
year: "2024"
org: "Microsoft"
paper_url: "https://arxiv.org/abs/2311.06242"
category: "visual_model"
parent: "—"
motivation: "统一序列到序列架构处理多粒度视觉任务"
```

#### 📝 一句话总结

Florence-2 提出了一种基于序列到序列架构的统一视觉基础模型，通过构建包含 5.4B 多粒度注释的大规模数据集 FLD-5B 进行多任务预训练，使单一模型能够以统一的文本生成范式处理从图像级到像素级的多种视觉任务，在仅 0.77B 参数下实现了超越数十倍大模型的零样本性能。

#### 🎯 核心要点

- **统一 seq2seq 架构**：将所有视觉任务（分类、描述、检测、分割、Grounding 等）统一为"图像 + 文本提示 → 文本输出"的序列到序列范式
- **FLD-5B 大规模多任务数据集**：包含 126M 图片、5.4B 注释（500M 文本 + 1.3B 区域-文本 + 3.6B 文本-短语-区域），覆盖从粗到细的多粒度语义
- **数据引擎三阶段流水线**：专家模型初始标注 → 数据过滤与增强 → 迭代精炼，自动化构建高质量多任务标注
- **位置 token 量化**：将坐标归一化后量化为 1000 个 bin，作为新词加入 tokenizer，统一表示 bounding box 和多边形区域
- **DaViT 视觉编码器 + 多模态 Encoder-Decoder**：视觉特征经线性投影后与文本 embedding 拼接，输入标准 Transformer encoder-decoder
- **两种规模**：Florence-2-B（232M 参数）和 Florence-2-L（771M 参数），均以极小参数量实现 SOTA 零样本性能
- **多任务零样本能力**：单一模型在 COCO Caption、Flickr30k Grounding、RefCOCO 等多个基准上超越 Flamingo（80B）和 Kosmos-2（1.6B）

#### 🔬 深入细节

![Florence-2 模型总览](https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x1.png)
*图 1：Florence-2 以统一的 prompt-based 范式处理多种视觉任务，涵盖图像级（分类、描述、VQA）、区域级（检测、Grounding、OCR）和像素级（分割、指代分割）*

![Florence-2 架构图](https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x2.png)
*图 2：Florence-2 的模型架构——DaViT 视觉编码器提取图像特征，经线性投影后与文本 prompt embedding 拼接，送入多模态 encoder-decoder 生成目标文本序列*

##### 统一多任务训练的伪代码

```python
# Florence-2 统一多任务训练流程
# 所有任务共享同一模型，仅通过 text prompt 区分任务类型

for batch in multitask_dataloader:
    image, prompt, target = batch
    # prompt 示例: "<OD>" (检测), "<CAPTION>" (描述), "<REFERRING_EXPRESSION>" (指代)
    
    # 1. 视觉编码: DaViT 提取图像特征
    V = DaViT(image)                    # V ∈ R^{N_v × D_v}
    V_proj = LayerNorm(Linear(V))       # V' ∈ R^{N_v × D}
    
    # 2. 文本编码: tokenize prompt (含 location tokens)
    T = text_embedding(tokenize(prompt))  # T ∈ R^{N_t × D}
    
    # 3. 拼接视觉与文本 token
    X = concat(V_proj, T)               # X ∈ R^{(N_v + N_t) × D}
    
    # 4. Encoder-Decoder 生成目标序列
    # target 可包含普通文本 token 和 location tokens (<loc_0>...<loc_999>)
    logits = encoder_decoder(X, target_shifted)
    
    # 5. 标准交叉熵损失
    loss = cross_entropy(logits, target)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

传统视觉模型通常针对单一任务设计专门的架构和训练流程：分类模型输出类别标签，检测模型输出 bounding box，分割模型输出像素 mask。这种碎片化的设计导致：
1. **每个任务需要独立的模型和训练数据**，无法共享跨任务的视觉知识；
2. **缺乏统一的表征空间**，难以同时理解图像级语义和区域级/像素级细节；
3. **现有大规模预训练数据集**（如 CLIP 的 WIT-400M、SAM 的 SA-1B）通常只覆盖单一层级的标注。

Florence-2 的核心思想是：**视觉理解本质上是一个从图像到结构化文本的映射问题**，无论是"这张图片描述了什么"还是"图中猫的位置在哪里"，都可以用文本序列来表达答案。

##### 核心机制：统一的序列到序列框架

**任务统一化设计**

Florence-2 将所有视觉任务转化为统一的 seq2seq 格式：

$$\mathcal{L} = -\sum_{i=1}^{|y|} \log P_\theta(y_i | y_{<i}, x)$$

其中 \(x\) 是图像与文本 prompt 的组合输入，\(y\) 是目标输出序列。不同任务通过不同的 prompt 触发：

| 任务类型 | Prompt 示例 | 输出格式 |
|---------|------------|---------|
| 图像描述 | `<CAPTION>` | 自然语言文本 |
| 目标检测 | `<OD>` | `<loc_x1><loc_y1><loc_x2><loc_y2> 类别名` |
| 视觉定位 | `Locate: {phrase}` | `<loc_x1><loc_y1><loc_x2><loc_y2>` |
| 指代分割 | `<REFERRING_EXPRESSION_SEGMENTATION> {expr}` | 多边形坐标序列 |
| OCR | `<OCR>` | 识别文本 + 位置 |

> 💡 **关键创新**：位置信息的文本化表示。Florence-2 将图像坐标归一化到 [0, 1000) 范围，每个整数值对应一个特殊 token `<loc_0>` 到 `<loc_999>`。这样 bounding box `(x1, y1, x2, y2)` 就变成了 4 个 token 的序列，多边形区域则是更长的坐标 token 序列。这种设计使得位置信息可以无缝融入标准的语言模型生成框架。

**模型架构**

Florence-2 采用 encoder-decoder 架构，由三个核心组件构成：

1. **视觉编码器（DaViT）**：采用 Dual-attention Vision Transformer，结合空间注意力和通道注意力，将输入图像编码为视觉 token 序列 \(\mathbf{V} \in \mathbb{R}^{N_v \times D_v}\)。
2. **线性投影层 + LayerNorm**：将视觉特征维度对齐到语言模型维度 \(D\)，得到 \(\mathbf{V}' \in \mathbb{R}^{N_v \times D}\)。
3. **多模态 Encoder-Decoder**：基于标准 Transformer 架构，encoder 接收视觉 token 与文本 prompt token 的拼接序列，decoder 自回归生成目标文本序列。权重初始化自 BART 预训练模型。

> ⚠️ **注意**：与 BLIP-2 等使用 Q-Former 桥接视觉和语言的方法不同，Florence-2 采用简单的线性投影 + 拼接方式，没有引入额外的跨模态对齐模块。这种简洁设计依赖于大规模多任务数据的充分训练来隐式学习跨模态对齐。

##### FLD-5B 数据引擎

![Florence-2 数据引擎](https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x3.png)
*图 3：Florence-2 数据引擎的三阶段流水线：专家模型初始标注 → 数据过滤 → 迭代精炼*

FLD-5B 的构建是 Florence-2 成功的关键。数据引擎包含三个阶段：

**阶段一：专家模型初始标注**
- 从 ImageNet-22k、Object 365、Open Images、Conceptual Captions、LAION 等数据集收集 126M 图片
- 使用多个专家模型为每张图片生成多粒度标注：图像描述模型生成文本、DINO 检测器生成区域框、Grounding DINO 生成短语-区域对、SAM 生成分割 mask

**阶段二：数据过滤与增强**
- 文本过滤：基于 SpaCy 解析工具提取对象/属性/动作，过滤噪声过多的文本
- 区域过滤：置信度阈值 + 非极大值抑制（NMS）去除低质量和冗余框

**阶段三：迭代精炼**
- 用过滤后的数据训练初版多任务模型
- 用该模型重新预测训练集，发现其预测质量优于原始噪声标注
- 将更新后的标注与原始标注合并，进行下一轮训练
- 对于初始数据不足的任务（如详细描述），利用迭代模型预训练后在小数据集上微调，再用微调模型标注全量数据

最终 FLD-5B 包含三种粒度的标注：
- **文本**（500M）：简短描述（~8 tokens）、详细描述（~32 tokens）、更详细描述（~71 tokens）
- **区域-文本对**（1.3B）：bounding box + 类别短语/简短描述
- **文本-短语-区域三元组**（3.6B）：图像描述 + 名词短语 + 对应区域框/mask

##### 训练与推理流程

**预训练**：
- 所有任务混合训练，共享模型参数，使用标准交叉熵损失
- 图像编码器初始化自 UniCL，encoder-decoder 初始化自 BART
- 训练 3B 有效样本，先 384×384 分辨率，再高分辨率微调至 768×768
- Base 模型 batch size 2048，Large 模型 batch size 3072

**推理**：
- 输入图像和任务 prompt，模型自回归生成输出序列
- 后处理：将输出中的 location token 转换回坐标，文本 token 直接作为结果

##### 与传统方法的区别

| 对比维度 | 传统专家模型 | Florence-2 |
|---------|------------|-----------|
| 模型数量 | 每个任务一个模型 | 单一统一模型 |
| 输出格式 | 任务特定（类别/框/mask） | 统一文本序列 |
| 位置表示 | 连续坐标回归 | 离散化 location token |
| 预训练数据 | 单任务标注 | 多粒度 5.4B 标注 |
| 参数量 | 通常 >1B（大模型） | 0.23B / 0.77B |
| 零样本能力 | 无 | 强零样本多任务能力 |

Florence-2-L 以 0.77B 参数在 COCO Caption 上达到 135.6 CIDEr（零样本），远超 80B 参数的 Flamingo（84.3 CIDEr）；在 Flickr30k Grounding 上达到 84.4 R@1，超越 1.6B 的 Kosmos-2（78.7）约 5.7 个点。这证明了**高质量多粒度数据 + 统一架构**的巨大潜力。

#### 🧪 练习题

```yaml
question: "Florence-2 如何在统一的序列到序列框架中表示目标检测任务的 bounding box 输出？"
options:
  - "使用连续浮点数坐标直接回归"
  - "将坐标归一化后量化为离散的 location token（如 <loc_0> 到 <loc_999>）作为文本序列生成"
  - "使用额外的检测头输出框坐标，与文本生成分离"
  - "将 bounding box 编码为固定长度的二进制向量"
answer: 1
explain: "Florence-2 将归一化坐标量化为 1000 个 bin 对应的特殊 token，使位置信息可以像普通文本一样通过自回归生成，实现了检测、分割等任务与语言生成的统一。"
```