### ALIGN

```yaml
id: align
name: ALIGN
year: '2021'
category: contrastive
institution: Google
paper: ICML 2021
motivation: 验证规模胜于质量的假设
parent: clip
description: 使用18亿对原始噪声Alt-text数据，证明简单架构在大规模数据下的强大生命力。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/align_detail.md
```

#### 📝 一句话总结
ALIGN 用 18 亿 noisy image-alt-text 对训练极简图文双塔，证明在图文对比学习中，大规模弱清洗数据可以弥补噪声，并在零样本分类和跨模态检索上获得强性能。

#### 🎯 核心要点
- 数据策略极端简化：从网页 alt-text 构造 1.8B 图文对，只做基础安全、尺寸、长度、频率和去重过滤
- 双塔架构直接有效：图像端用 EfficientNet，文本端用 BERT 的 `[CLS]` 表示，经线性层映射到共享嵌入空间
- 从零训练：论文强调图像编码器和文本编码器均从头训练，避免依赖人工标签预训练
- 归一化 softmax 对比损失：同时优化 image-to-text 和 text-to-image 两个方向，把 batch 内其他样本作为负例
- 大 batch 与温度学习：跨 TPU core 拼接嵌入形成 16384 全局 batch，并学习共享温度 \(\sigma\)
- 规模胜过清洗：消融显示同规模 noisy 数据不如 CC-3M，但 12M noisy 数据已超过 3M clean 数据
- 强迁移结果：ImageNet 零样本 top-1 达 76.4%，线性/微调视觉迁移和 Flickr30K、MSCOCO 检索均很强

#### 🔬 深入细节
##### 核心示意图

![ALIGN 方法总览图](https://ar5iv.labs.arxiv.org/html/2102.05918/assets/x1.png)
*图：ALIGN Figure 1。模型从 noisy image-alt-text 数据中学习图像和文本表征，并用于零样本分类、跨模态检索和图文组合查询。*

公开来源：论文 `https://arxiv.org/abs/2102.05918`。

##### 核心流程代码

```python
# ALIGN: normalized softmax contrastive learning on noisy alt-text pairs

def align_train_step(images, alt_texts, image_encoder, text_encoder, sigma):
    img = image_encoder(images)                 # EfficientNet + global pooling
    txt = text_encoder(alt_texts).cls_token     # BERT [CLS]

    img_emb = l2_normalize(img_projection(img))
    txt_emb = l2_normalize(txt_projection(txt))

    # Embeddings from all TPU cores are concatenated before this step.
    logits = img_emb @ txt_emb.T / sigma
    labels = arange(len(images))

    loss_i2t = cross_entropy(logits, labels, label_smoothing=0.1)
    loss_t2i = cross_entropy(logits.T, labels, label_smoothing=0.1)
    return (loss_i2t + loss_t2i) / 2
```

##### 关键公式

设 \(x_i\) 是第 \(i\) 张图像的归一化嵌入，\(y_i\) 是其 alt-text 的归一化嵌入，\(\sigma\) 是温度参数。ALIGN 的 image-to-text 损失为：

$$
L_{i2t}
= -\frac{1}{N}\sum_{i=1}^{N}
\log
\frac{\exp(x_i^\top y_i / \sigma)}
{\sum_{j=1}^{N}\exp(x_i^\top y_j / \sigma)}
$$

text-to-image 损失对称定义：

$$
L_{t2i}
= -\frac{1}{N}\sum_{i=1}^{N}
\log
\frac{\exp(y_i^\top x_i / \sigma)}
{\sum_{j=1}^{N}\exp(y_i^\top x_j / \sigma)}
$$

总目标为 \(\mathcal{L}=L_{i2t}+L_{t2i}\)。由于 \(x\) 和 \(y\) 都经过 L2 归一化，\(\sigma\) 直接控制余弦相似度 softmax 的锐度。

##### 方法解读

ALIGN 的问题意识非常工程化：视觉-语言预训练的数据通常依赖精细清洗或人工标注，规模受限；互联网网页的 alt-text 虽然噪声很大，却天然提供了海量图文弱配对。论文保留了 Conceptual Captions 式的数据来源，但移除了大量昂贵的语义清洗，只过滤色情内容、异常图片尺寸/宽高比、过短或过长文本、出现频率过高的模板化 alt-text，以及下游评测集近重复样本。最终得到的 1.8B 数据噪声更高，但覆盖面远大于干净小数据集。

模型本身几乎没有复杂结构。图像端是 EfficientNet，经 global pooling 得到视觉表示；文本端是 BERT，用 `[CLS]` token 表示整段 alt-text，并生成 100k wordpiece 词表。二者各自接线性层映射到同一维度，再做 L2 归一化。这个设计与跨注意力 VLP 模型的差异很大：ALIGN 不在训练或检索时逐 token 做深度交互，而是先把图像和文本独立编码成向量，所以可以直接服务于大规模检索系统。

损失函数与 CLIP 同属对称对比学习，但 ALIGN 更强调“超大 batch + noisy 数据”的组合。训练时每个 TPU core 处理 16 个正样本对，1024 个 Cloud TPUv3 core 拼接后形成 16384 的全局 batch，因此每个样本都有大量 in-batch 负例。论文还使用 label smoothing 0.1、LAMB 优化器、10k step warmup 到 \(10^{-3}\)，再在约 1.2M steps 内线性衰减；温度 \(\sigma\) 从 1.0 初始化并可学习，消融中收敛到约 \(1/64\)。

“规模胜于质量”不是说噪声无害，而是说在模型容量和数据规模足够大时，数据多样性会压过单样本噪声。论文消融显示，3M noisy ALIGN 子集明显差于 3M clean Conceptual Captions，但 6M、12M noisy 子集迅速追上并超过 clean 数据。这说明 noisy alt-text 的价值在于覆盖长尾实体、场景、属性和语言表达；单条标注可能错，但海量弱相关信号可以在对比学习中形成统计优势。

ALIGN 与 CLIP 的主要区别集中在数据策略和工程取舍。CLIP 使用更有意图的数据收集和过滤流程，ALIGN 则尽量顺着网页 alt-text 原始分布扩张规模；CLIP 的公开代表模型大量使用 ViT，ALIGN 的主模型使用 EfficientNet-L2 + BERT-Large；两者都避免跨注意力，因此都能高效检索。ALIGN 进一步展示了图像向量和文本向量可以相加用于 image+text query，这为“用一张图加一句话检索相似但带指定属性变化的图片”提供了早期范式。

#### 🧪 练习题

```yaml
question: "ALIGN 为什么能从 noisy alt-text 数据中获得强表示？"
options:
  - "它使用了人工清洗到接近标注数据质量的文本"
  - "它用跨注意力过滤掉所有错误图文对"
  - "它用极大规模数据和 batch 内负例让统计相关性压过单样本噪声"
  - "它只在 ImageNet 类别名上训练文本编码器"
answer: 2
explain: "ALIGN 的核心论点是数据规模可以补偿噪声。模型仍然会受到噪声影响，但 1.8B 图文对提供了足够多样的弱监督信号，对比学习能从总体统计中学习跨模态对齐。"
```
