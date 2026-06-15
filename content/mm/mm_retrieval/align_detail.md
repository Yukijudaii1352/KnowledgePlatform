### ALIGN — 大规模图像噪声文本嵌入 (ALIGN)

```yaml
id: align
name: ALIGN
full_name: 大规模图像噪声文本嵌入 (ALIGN)
year: '2021'
org: Google
paper_url: https://arxiv.org/abs/2102.05918
category: dual_encoder
parent: clip
motivation: 18亿规模噪声数据对比学习
```

#### 📝 一句话总结

ALIGN 使用 18 亿噪声网页 alt-text 图文对训练简单双编码器，证明数据规模可以显著抵消弱清洗文本噪声，解决视觉语言预训练受昂贵数据清洗限制的问题。它把 CLIP 式对比学习进一步推向“更大、更噪、更简单”的路线。

#### 🎯 核心要点

- 训练数据来自约 1.8B noisy image-alt-text pairs，只做轻量过滤而非复杂语义清洗
- 双编码器架构：EfficientNet-L2 图像塔与 BERT-Large 文本塔分别输出归一化向量
- 使用双向 normalized softmax 对比损失和 in-batch negatives
- 温度参数 \(\sigma\) 可学习，缓解余弦相似度值域受限带来的调参问题
- 训练采用超大 batch，通过跨 TPU 核心聚合嵌入扩大负样本池
- 支持零样本分类、图文检索、跨模态搜索和图像+文本组合查询

#### 🔬 深入细节

![ALIGN 方法总览](https://ar5iv.labs.arxiv.org/html/2102.05918/assets/x1.png)
*图：论文 Figure 1。ALIGN 从噪声图文对联合学习视觉和语言表示，得到的嵌入可用于零样本分类、文本搜图、图搜文和组合查询。*

```python
# ALIGN 对比学习伪代码
for images, alt_texts in noisy_web_loader:
    img = l2_normalize(efficientnet_l2(images))
    txt = l2_normalize(bert_large(alt_texts).cls)

    img = all_gather(img)   # 扩大 in-batch negatives
    txt = all_gather(txt)

    logits = img @ txt.T / sigma   # sigma 为可学习温度
    labels = arange(global_batch_size)

    loss = cross_entropy(logits, labels)
    loss += cross_entropy(logits.T, labels)
    loss.backward()
```

ALIGN 的出发点是：高质量图文数据集如 Conceptual Captions 需要复杂清洗，规模很难继续扩大；而网页上天然存在海量图像和 alt-text，虽然噪声大，但包含丰富长尾概念。论文选择只做基础过滤，例如去掉极小图像、异常宽高比、色情内容、空文本、过短文本、极高频模板文本和极罕见 token 文本。

模型结构刻意保持简单。图像侧用 EfficientNet-L2 输出视觉向量，文本侧用 BERT-Large 的 \([CLS]\) 表示输出文本向量，二者线性投影并 L2 归一化后做点积。给定 batch 中 \(N\) 个配对样本，image-to-text 损失为：

$$
\mathcal{L}_{i2t}=-\frac{1}{N}\sum_i \log\frac{\exp(x_i^{img}\cdot x_i^{txt}/\sigma)}{\sum_j\exp(x_i^{img}\cdot x_j^{txt}/\sigma)}
$$

text-to-image 损失对称定义，总损失为：

$$
\mathcal{L}=\mathcal{L}_{i2t}+\mathcal{L}_{t2i}
$$

这里 \(\sigma\) 是可学习温度。因为嵌入被归一化，点积范围有限，温度控制 softmax 分布的尖锐程度；把它设为可学习参数可以减少不同 batch size 和数据噪声下的手工调参。

> 💡 关键：ALIGN 的主要贡献不在复杂网络结构，而在验证“极大规模噪声图文对 + 简单双塔对比学习”可以超过许多精心设计的跨注意力模型。

与 CLIP 相比，ALIGN 使用更大的噪声数据规模，并采用 EfficientNet-L2 与 BERT-Large 这类强预训练/成熟组件；与 OSCAR、ViLT 等融合模型相比，ALIGN 的向量可独立预计算，因此更适合工业级检索系统。代价是它不在编码阶段执行细粒度 token-region 交互，复杂推理任务通常需要额外模型或重排序器。

#### 🧪 练习题

```yaml
question: "ALIGN 为什么仍采用双编码器而不是跨注意力融合模型？"
options:
  - "双编码器可以离线预计算图像和文本向量，适合大规模检索"
  - "双编码器不需要任何负样本"
  - "双编码器只能用于有监督分类"
  - "双编码器可以自动去除所有网页文本噪声"
answer: 0
explain: "ALIGN 的目标之一是大规模跨模态检索，双编码器能把候选库预先编码成向量，在线阶段只需相似度计算。"
```
