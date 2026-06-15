### SCAN — 堆叠交叉注意力 (Stacked Cross Attention)

```yaml
id: scan
name: SCAN
full_name: 堆叠交叉注意力 (Stacked Cross Attention)
year: '2018'
org: Microsoft
paper_url: http://openaccess.thecvf.com/content_ECCV_2018/html/Kuang-Huei_Lee_Stacked_Cross_Attention_ECCV_2018_paper.html
category: foundation
parent: —
motivation: 细粒度图像区域与文本对齐
```

#### 📝 一句话总结

SCAN 提出堆叠交叉注意力，在没有显式区域-词标注的情况下推断图像区域与句子词语的潜在对齐，解决全局向量匹配忽略细粒度语义对应的问题。它让图文检索从“整图对整句”推进到“区域对词语”的可解释匹配。

#### 🎯 核心要点

- 使用 Faster R-CNN bottom-up attention 提取显著图像区域，而不是只用整图 CNN 特征
- 文本端用双向 GRU 编码词序列，保留每个词的上下文表示
- 提出 Image-Text 与 Text-Image 两个方向的 Stacked Cross Attention
- 第一阶段跨模态注意力生成局部对齐表示，第二阶段计算局部对齐质量并聚合为全局相似度
- 提供 AVG 与 LogSumExp 聚合，分别强调整体一致性和高置信局部匹配
- 训练使用 hardest negative triplet loss，继承并强化 VSE++ 的困难负样本思想

#### 🔬 深入细节

![SCAN Image-Text 堆叠交叉注意力](https://ar5iv.labs.arxiv.org/html/1803.08024/assets/x2.png)
*图：论文 Figure 2 的 Image-Text SCAN。每个图像区域先注意句子词语生成 attended sentence vector，再与原区域比较得到区域级对齐分数。*

![SCAN Text-Image 堆叠交叉注意力](https://ar5iv.labs.arxiv.org/html/1803.08024/assets/x3.png)
*图：论文 Figure 3 的 Text-Image SCAN。每个词反向注意图像区域，适合突出句子中最关键的实体、属性和动作。*

```python
# SCAN 相似度与训练伪代码
def scan_similarity(regions, words, direction="image_text"):
    sim = cosine_matrix(regions, words)
    sim = relu(sim)  # thresholded similarity, 去除负相关噪声

    if direction == "image_text":
        alpha = softmax(lambda1 * sim, dim="words")
        attended_text = alpha @ words
        local_scores = cosine(regions, attended_text)
    else:
        beta = softmax(lambda1 * sim, dim="regions")
        attended_regions = beta.T @ regions
        local_scores = cosine(words, attended_regions)

    return logsumexp(lambda2 * local_scores) / lambda2  # 或 mean(local_scores)

for image, caption in batch:
    pos = scan_similarity(image, caption)
    neg_caption = argmax_caption_in_batch(scan_similarity(image, other_caption))
    neg_image = argmax_image_in_batch(scan_similarity(other_image, caption))
    loss = relu(margin - pos + sim(image, neg_caption))
    loss += relu(margin - pos + sim(neg_image, caption))
```

SCAN 的动机来自 VSE/VSE++ 的局限：全局图像向量和全局句子向量能表达整体语义，却很难说明“哪一个区域对应哪一个词”。对于 “a young boy holding a tennis racket” 这类句子，检索失败通常不是整图主题错了，而是实体、属性或动作局部对不上。

在 Image-Text 方向，给定区域特征 \(V=\{v_i\}_{i=1}^k\) 和词特征 \(E=\{e_j\}_{j=1}^n\)，先计算区域-词相似度，并用截断后的 softmax 得到注意力：

$$
\alpha_{ij}=\frac{\exp(\lambda_1[\cos(v_i,e_j)]_+)}{\sum_{j'=1}^{n}\exp(\lambda_1[\cos(v_i,e_{j'})]_+)}
$$

其中 \([\cdot]_+\) 把负相似度置零，避免无关词被强行纳入对齐。随后每个区域得到一个对应的文本语义向量：

$$
a_i^t=\sum_{j=1}^{n}\alpha_{ij}e_j,\quad R_i=\cos(v_i,a_i^t)
$$

最终将局部分数 \(R_i\) 聚合成图文相似度。AVG 适合整体描述都准确的情况；LogSumExp 是 max pooling 的平滑形式，更强调少数高度匹配的关键区域：

$$
S_{LSE}(I,T)=\frac{1}{\lambda_2}\log\sum_i \exp(\lambda_2R_i)
$$

Text-Image 方向完全对称，只是查询从“区域”变为“词”。这让模型能回答另一个问题：句子中的某个词是否能在图像中找到对应区域。两个方向和两种聚合方式可以互补集成。

> 💡 关键：SCAN 的“堆叠”不是多层 Transformer，而是先做跨模态软对齐，再基于对齐结果估计局部重要性。它把相似度计算拆成了“找对应关系”和“评估对应关系”两步。

训练目标仍是硬负样本三元组损失。对于正样本 \((I,T)\)，在 batch 中找最相似的错误文本 \(\hat{T}\) 和错误图像 \(\hat{I}\)：

$$
\mathcal{L}=[\alpha-S(I,T)+S(I,\hat{T})]_+ + [\alpha-S(I,T)+S(\hat{I},T)]_+
$$

因此 SCAN 同时结合了区域级细粒度对齐和 VSE++ 的 hardest negative 训练信号，成为后续 OSCAR 等对象锚点预训练方法的重要前序。

#### 🧪 练习题

```yaml
question: "SCAN 的第一阶段交叉注意力主要在做什么？"
options:
  - "把整张图像压缩成一个全局向量"
  - "为每个区域或词语寻找另一模态中最相关的软对齐表示"
  - "直接生成图像描述文本"
  - "用对象标签替换视觉区域特征"
answer: 1
explain: "SCAN 先根据区域-词相似度计算注意力权重，生成 attended text 或 attended image，再用第二阶段评估局部对齐质量。"
```
