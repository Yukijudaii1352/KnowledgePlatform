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

ALIGN 提出用 18 亿规模噪声网页 alt-text 图文对训练简单双编码器，解决视觉语言预训练长期依赖昂贵人工清洗数据的问题。它的核心结论是：在足够大规模下，轻量过滤的噪声数据配合标准对比学习，也能得到强零样本分类和大规模图文检索表示。

#### 🎯 核心要点

- 数据路线：从网页 alt-text 构建约 1.8B 图文对，只做色情、尺寸、宽高比、重复、过短/过长文本、高频模板文本等轻量过滤
- 架构路线：采用图像编码器 EfficientNet 与文本编码器 BERT 的双塔结构，图像和文本可独立编码为同一维度的 L2 归一化向量
- 训练目标：使用双向 normalized softmax 对比损失，batch 内正确图文对为正样本，其他组合自动作为 in-batch negatives
- 工程缩放：跨 TPU 核心 all-gather 嵌入扩大负样本池，并把温度参数 \(\sigma\) 设为可学习变量
- 任务迁移：同一嵌入空间支持零样本分类、text-to-image、image-to-text、image+text 组合查询和 CxC 跨/同模态相似检索
- 与 CLIP 的差异：ALIGN 不依赖人工构造高频概念 allowlist，而是更直接地利用网页原始 alt-text 分布验证“规模抵消噪声”

#### 🔬 深入细节

![ALIGN 方法总览](https://ar5iv.labs.arxiv.org/html/2102.05918/assets/x1.png)
*图：论文 Figure 1。ALIGN 从噪声图文对学习共享嵌入，训练后同一表示可迁移到零样本分类、图文互检索以及图像+文本组合查询。*

```python
# ALIGN 双塔对比学习伪代码
for images, alt_texts in noisy_web_pairs:
    image_emb = image_encoder(images)        # EfficientNet family
    text_emb = text_encoder(alt_texts)       # BERT [CLS] representation

    image_emb = l2_normalize(project_image(image_emb))
    text_emb = l2_normalize(project_text(text_emb))

    # 分布式训练中聚合所有设备上的嵌入，扩大 in-batch negatives
    image_global = all_gather(image_emb)
    text_global = all_gather(text_emb)

    logits = image_global @ text_global.T / sigma
    labels = arange(global_batch_size)

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    loss = loss_i2t + loss_t2i

    loss.backward()
    optimizer.step()
```

ALIGN 的动机来自一个很具体的瓶颈：传统视觉模型通常依赖 ImageNet、OpenImages、JFT 等显式类别标签，视觉语言模型又依赖 Conceptual Captions、MSCOCO、Visual Genome 这类经过复杂清洗或人工标注的数据。清洗越精细，数据规模越难继续扩大；而网页 alt-text 虽然有文件名、模板、广告词和错误描述等噪声，却覆盖大量长尾实体、商品、艺术作品和事件。ALIGN 的取舍是放弃重度语义清洗，只做低成本过滤，把算法问题改写成“一个简单对比目标能否吃下足够大的噪声分布”。

数据过滤策略体现了这种取舍。图像侧过滤色情内容、短边小于 200 像素、宽高比过大、同一图片关联 alt-text 过多以及和评测集近重复的样本；文本侧移除被过多图片共享的模板文本、包含极罕见 token 的文本，以及少于 3 个 unigram 或多于 20 个 unigram 的文本。这些规则不能保证每个 caption 都正确，但能移除最明显的垃圾样本，同时保留网页分布中的长尾多样性。论文中随机样例也显示，数据仍然有明显噪声，因此 ALIGN 的贡献不是“构造干净数据集”，而是验证噪声可被规模与对比学习吸收。

模型结构刻意保持工业检索友好。图像塔用 EfficientNet，文本塔用 BERT 的 \([CLS]\) 表示，再通过线性层投影到同一嵌入维度；两个向量都做 L2 归一化，因此相似度就是余弦相似度。给定一个 batch 中 \(N\) 个匹配图文对，归一化图像向量为 \(x_i\)，文本向量为 \(y_j\)，image-to-text 损失为：

$$
\mathcal{L}_{i2t}=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(x_i^\top y_i/\sigma)}
{\sum_{j=1}^{N}\exp(x_i^\top y_j/\sigma)}
$$

text-to-image 损失完全对称：

$$
\mathcal{L}_{t2i}=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(y_i^\top x_i/\sigma)}
{\sum_{j=1}^{N}\exp(y_i^\top x_j/\sigma)},\qquad
\mathcal{L}=\mathcal{L}_{i2t}+\mathcal{L}_{t2i}
$$

这里的 \(\sigma\) 是可学习温度。由于 \(x_i\) 和 \(y_j\) 都被归一化，点积被限制在 \([-1,1]\)，softmax 的尖锐程度高度依赖温度；如果温度过大，正负样本概率差异不足，如果过小，梯度会被少数 hardest negatives 主导。ALIGN 让温度和模型参数一起学习，减少在不同 batch size、噪声强度和模型规模下手工扫参的成本。

> 💡 关键：ALIGN 的负样本不是额外标注出来的，而是 batch 中其他图文组合。跨设备 all-gather 让每次 softmax 看到更大的候选集合，因此 batch size 同时影响统计效率、负样本难度和通信成本。

训练完成后，ALIGN 的双塔结构带来两类能力。第一类是检索：图像库和文本库都可以离线编码，在线阶段只需 ANN 向量检索或矩阵点积排序，因此比跨注意力融合模型适合大规模服务。第二类是零样本分类：把类别名写成 prompt，编码成文本向量，图像向量与这些类别文本向量比较即可得到分类器。这与 CLIP 的推理方式一致，但 ALIGN 的经验重点在于更原始、更噪声、更大的网页 alt-text 训练语料。

与 OSCAR、ViLT、UNITER 等融合式视觉语言模型相比，ALIGN 不在编码阶段做 token-region 交互，也不依赖目标检测器产生区域特征；它牺牲了一部分细粒度推理能力，换来向量可预计算、库规模可扩展和任务接口统一。与 CLIP 相比，二者共享双塔对比学习范式，但 CLIP 的 WebImageText 构建依赖高频视觉概念筛选，ALIGN 则强调最小清洗的自然 alt-text 分布。这个差异使 ALIGN 成为后续 WebLI、LAION、SigLIP 等大规模图文预训练工作的直接前序。

ALIGN 还展示了“组合查询”的实用意义：将图像嵌入与文本嵌入按一定比例相加，再用归一化后的混合向量检索图像，可以表达“像这张图但带有某个文本属性”的需求。这个能力不是来自额外的组合模块，而是来自图像和语言被压到同一几何空间后，属性方向在嵌入空间中近似可加。实际系统仍需处理偏见、网页有害文本和文化分布不均等风险，但从算法角度看，ALIGN 把多模态检索问题简化成了可大规模部署的向量空间学习问题。

#### 🧪 练习题

```yaml
question: "ALIGN 能在噪声 alt-text 数据上取得强检索效果，最关键的算法与工程组合是什么？"
options:
  - "复杂跨注意力模型逐 token 重排序所有候选"
  - "人工清洗每一条 caption 后再训练小规模分类器"
  - "超大规模图文对、双塔编码器、双向 in-batch softmax 对比学习"
  - "只训练文本编码器并固定图像特征"
answer: 2
explain: "ALIGN 的核心是用 18 亿级噪声图文对训练可独立编码的图文双塔，并通过双向对比损失利用 batch 内负样本对齐共享嵌入空间。"
```
