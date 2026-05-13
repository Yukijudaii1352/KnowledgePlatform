### 堆叠交叉注意力网络 (Stacked Cross Attention Network for Image-Text Matching)

```yaml
id: scan
name: SCAN
full_name: "堆叠交叉注意力网络 (Stacked Cross Attention Network)"
year: 2018
org: "Microsoft Research / UNC Chapel Hill"
paper_url: "https://arxiv.org/abs/1803.08024"
category: foundation
parent: "—"
motivation: "通过细粒度的图像区域与文本词语对齐，实现更精确的跨模态图文匹配检索"
```

#### 📝 一句话总结

SCAN 提出堆叠交叉注意力机制（Stacked Cross Attention），通过两阶段注意力推断图像区域与句子词语之间的潜在细粒度对应关系，在不依赖显式对齐标注的情况下实现了图文跨模态检索的 SOTA 性能，在 Flickr30K 和 MS-COCO 上大幅超越此前方法。

#### 🎯 核心要点

- **堆叠交叉注意力（SCA）**：两阶段注意力机制——第一阶段计算跨模态注意力权重，第二阶段基于注意力加权特征评估区域/词语重要性
- **两种对称变体**：Image-Text（以图像区域为查询注意文本词语）和 Text-Image（以词语为查询注意图像区域），捕获不同方面的对齐信息
- **两种聚合策略**：LogSumExp（LSE）池化关注最难对齐片段，Average（AVG）池化关注全局对齐，可组合使用
- **底层注意力（Bottom-Up Attention）**：使用 Faster R-CNN 提取 36 个显著目标区域特征作为图像表示，替代传统网格特征
- **硬负样本三元组损失**：在 mini-batch 中选取最难负样本进行训练，提升判别能力
- **模型集成**：不同变体（t-i/i-t × AVG/LSE）捕获数据不同方面，集成后进一步提升性能
- **可解释性**：注意力权重可视化直观展示模型学到的区域-词语对应关系

#### 🔬 深入细节

##### 核心架构示意图

![SCAN Image-Text Stacked Cross Attention](https://ar5iv.labs.arxiv.org/html/1803.08024v1/assets/x1.png)
*图：Image-Text 堆叠交叉注意力示意。第一阶段对每个图像区域计算其对句子各词语的注意力，得到加权文本特征；第二阶段通过比较区域特征与其对应文本特征的相似度，确定各区域的重要性权重。*

![SCAN Text-Image Stacked Cross Attention](https://ar5iv.labs.arxiv.org/html/1803.08024v1/assets/x2.png)
*图：Text-Image 堆叠交叉注意力示意。方向相反——第一阶段对每个词语计算其对图像各区域的注意力，第二阶段评估各词语的重要性。*

##### 算法伪代码

```python
# SCAN 核心算法伪代码
def scan_similarity(V, E, mode="image-text", pool="avg"):
    """
    V: 图像区域特征 [k, D]  (Faster R-CNN 提取的 k=36 个区域)
    E: 句子词语特征 [n, D]  (bi-GRU 编码的 n 个词)
    """
    # Step 0: 计算跨模态余弦相似度矩阵
    cos_sim = cosine(V, E)  # [k, n]
    
    if mode == "image-text":
        # === Image-Text: 以图像区域为查询 ===
        # Stage 1: 对每个区域 v_i, 注意句子中的词语
        # 阈值归一化: 将负值截断为0
        cos_sim_clamp = clamp(cos_sim, min=0)  # [ReLU]
        alpha = softmax(lambda_1 * cos_sim_clamp, dim=1)  # [k, n] 对词语维度
        a_t = alpha @ E  # [k, D] 每个区域对应的加权文本特征
        
        # Stage 2: 评估每个区域的重要性
        R = cosine(V, a_t)  # [k] 每个区域与其文本对应的相似度
        
    elif mode == "text-image":
        # === Text-Image: 以词语为查询 ===
        cos_sim_clamp = clamp(cos_sim, min=0)
        beta = softmax(lambda_2 * cos_sim_clamp, dim=0)  # [k, n] 对区域维度
        a_v = beta.T @ V  # [n, D] 每个词语对应的加权图像特征
        
        R = cosine(E, a_v)  # [n] 每个词语与其图像对应的相似度
    
    # 最终聚合: 将所有片段相似度汇总为全局相似度
    if pool == "avg":
        S = mean(R)
    elif pool == "lse":
        S = log(mean(exp(lambda * R)))  # LogSumExp
    
    return S

# 训练: 硬负样本三元组损失
def triplet_loss_hard(I, T, margin=0.2):
    S_pos = scan_similarity(I, T)
    T_hard_neg = argmax_{T' != T} scan_similarity(I, T')  # 最难负文本
    I_hard_neg = argmax_{I' != I} scan_similarity(I', T)  # 最难负图像
    loss = max(0, margin - S_pos + scan_similarity(I, T_hard_neg)) \
         + max(0, margin - S_pos + scan_similarity(I_hard_neg, T))
    return loss
```

##### 动机与背景

传统的图文跨模态检索方法（如 VSE++、Order Embeddings）将整张图像和整个句子分别编码为单一的全局向量，然后在联合嵌入空间中计算相似度。这种方法存在一个根本性缺陷：**它忽略了图像区域与句子词语之间的细粒度对应关系**。

> 💡 关键直觉：当人们描述一张图片时，句子中的每个词语通常对应图像中的某个特定区域——"狗"对应图中的狗、"红色"对应某个物体的颜色属性。这种对应关系是潜在的（latent），没有显式标注，但对准确理解图文关系至关重要。

SCAN 的核心思想是：**不直接比较全局表示，而是先推断图像区域与词语之间的潜在对齐，再基于对齐结果计算整体相似度**。

##### 核心机制：堆叠交叉注意力

SCAN 的"堆叠"体现在两阶段串联的注意力计算：

**第一阶段——跨模态注意力对齐：** 给定图像区域特征 \(V = \{v_1, ..., v_k\}\) 和词语特征 \(E = \{e_1, ..., e_n\}\)，首先计算所有区域-词语对的余弦相似度矩阵。以 Image-Text 变体为例，对每个图像区域 \(v_i\)，通过 softmax 归一化得到其对各词语的注意力权重：

$$\alpha_{i,j} = \frac{\exp(\lambda_1 [\cos(v_i, e_j)]_+)}{\sum_{j'=1}^{n} \exp(\lambda_1 [\cos(v_i, e_{j'})]_+)}$$

其中 \([\cdot]_+ = \max(\cdot, 0)\) 是阈值截断（CLAMP），将语义不相关的负相似度归零，防止噪声干扰。\(\lambda_1\) 是逆温度参数，控制注意力分布的尖锐程度。然后计算加权文本特征：

$$a_i^t = \sum_{j=1}^{n} \alpha_{i,j} \cdot e_j$$

> ⚠️ 注意：阈值归一化（CLAMP）是一个关键设计。论文消融实验表明，不使用 CLAMP 会导致性能显著下降，因为负相似度会引入语义无关的噪声。

**第二阶段——重要性评估：** 将每个区域 \(v_i\) 与其对应的加权文本特征 \(a_i^t\) 计算余弦相似度 \(R(v_i, a_i^t)\)，得到该区域的"对齐质量分数"。直觉上，如果一个区域能在文本中找到高度匹配的语义对应，其分数就高。

**最终聚合：** 将所有片段的对齐分数聚合为全局图文相似度。论文提出两种池化策略：

$$S_{AVG}(I, T) = \frac{1}{k} \sum_{i=1}^{k} R(v_i, a_i^t) \quad \text{(平均池化)}$$

$$S_{LSE}(I, T) = \log\left(\sum_{i=1}^{k} \frac{\exp(\lambda_2 \cdot R(v_i, a_i^t))}{k}\right)^{1/\lambda_2} \quad \text{(LogSumExp 池化)}$$

AVG 池化平等对待所有区域，关注全局一致性；LSE 池化是 max 的平滑近似，更关注最匹配的区域片段——类似于"只要有一个区域高度匹配，就认为整体相似"。

##### 对称变体与模型集成

SCAN 提出两种对称的注意力方向：

| 变体 | 第一阶段查询 | 第一阶段键 | 第二阶段评估 |
|------|------------|-----------|------------|
| **Image-Text (i-t)** | 图像区域 \(v_i\) | 词语 \(e_j\) | 区域重要性 |
| **Text-Image (t-i)** | 词语 \(e_j\) | 图像区域 \(v_i\) | 词语重要性 |

两种变体捕获不同方面的对齐信息。论文发现将不同变体的预测相似度取平均进行集成（如 t-i AVG + i-t LSE）能进一步提升性能，这表明它们具有互补性。

##### 图像与文本表示

- **图像端**：采用 Anderson et al. 提出的 Bottom-Up Attention，即使用在 Visual Genome 上预训练的 Faster R-CNN 检测图像中的显著区域（默认 36 个 ROI），提取每个区域的 2048 维特征，经线性变换映射到 1024 维联合空间。
- **文本端**：词语先通过 300 维词嵌入，再经双向 GRU 编码，取各时间步的隐状态作为词语特征（1024 维）。

##### 训练策略

采用硬负样本三元组损失（Hard Negative Triplet Loss）。对于正样本对 \((I, T)\)，在 mini-batch 中选取最难的负样本：

$$\hat{T}_h = \arg\max_{d \neq T} S(I, d), \quad \hat{I}_h = \arg\max_{m \neq I} S(m, T)$$

$$\mathcal{L}_{hard}(I, T) = [\alpha - S(I, T) + S(I, \hat{T}_h)]_+ + [\alpha - S(I, T) + S(\hat{I}_h, T)]_+$$

其中 \(\alpha = 0.2\) 为间隔超参数。使用 Adam 优化器，学习率分阶段衰减。

##### 实验结果

SCAN 在 Flickr30K 和 MS-COCO 两个基准上全面超越此前 SOTA：

| 数据集 | 指标 | 此前 SOTA | SCAN (最佳单模型) | SCAN (集成) | 相对提升 |
|--------|------|----------|-----------------|------------|---------|
| Flickr30K | 句子检索 R@1 | 55.6 (DPC) | 67.9 (i-t AVG) | 67.4 | +22.1% |
| Flickr30K | 图像检索 R@1 | 41.1 (SCO) | 45.8 (t-i AVG) | 48.6 | +18.2% |
| MS-COCO 1K | 句子检索 R@1 | 69.9 (SCO) | 72.7 (t-i AVG) | 74.8 | +7.0% |
| MS-COCO 5K | 句子检索 R@1 | 42.8 (SCO) | 50.4 (t-i AVG) | 51.4 | +17.8% |

> 💡 关键发现：消融实验证实了几个重要设计选择的有效性：(1) 堆叠交叉注意力本身是性能提升的核心来源；(2) CLAMP 阈值归一化至关重要；(3) 不同的池化策略和注意力方向具有互补性。

#### 🧪 练习题

```yaml
question: "SCAN 中堆叠交叉注意力的第一阶段（以 Image-Text 变体为例）的作用是什么？"
options:
  - "直接计算图像和句子的全局相似度"
  - "对每个图像区域，通过注意力机制找到其在句子中最相关的词语语义表示"
  - "使用 Faster R-CNN 检测图像中的显著区域"
  - "通过 GRU 编码句子中每个词语的上下文特征"
answer: 1
explain: "第一阶段的核心是跨模态注意力对齐：对每个图像区域 v_i，计算其对所有词语的注意力权重，加权求和得到该区域对应的文本语义表示 a_i^t，从而建立区域-词语的软对齐关系。"
```