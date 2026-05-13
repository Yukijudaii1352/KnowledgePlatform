### ALIGN

```yaml
id: align
name: "ALIGN"
year: 2021
category: contrastive
paper_url: "https://arxiv.org/abs/2102.05918"
parent: clip
```

## 📝 一句话总结

ALIGN利用**18亿**未经精细清洗的网络图文对，通过双塔对比学习（EfficientNet + BERT），证明了**数据规模可以弥补噪声**，在零样本分类和跨模态检索上达到与CLIP相当甚至更优的性能。

## 🎯 核心要点

1. **数据规模压倒质量**：使用1.8B noisy image-alt-text pairs（仅做频率过滤和最小清洗），相比CLIP的400M精选数据，ALIGN证明了在足够大的规模下，噪声数据的负面影响可被稀释——仅需4倍于干净数据的规模即可反超（Table 10: noisy 12M > clean CC-3M）。

2. **极简双塔架构**：图像端使用EfficientNet-L2，文本端使用BERT-Large，两者独立编码后通过L2归一化投影到共享嵌入空间（维度640），无需复杂的跨模态交互模块，推理时可高效预计算索引。

3. **归一化Softmax对比损失**：采用双向（image-to-text + text-to-image）归一化softmax损失，以batch内所有其他样本为负例（batch size=16384），学习温度参数σ（收敛至~1/64），并使用0.1的label smoothing。

4. **零样本与微调双强**：ImageNet零样本76.4%（vs CLIP 76.2%），微调后88.64%；Flickr30K零样本text→image R@1达75.7%（超CLIP 7%），微调后image→text R@1达95.3%，刷新当时所有SOTA。

5. **跨模态 > 单模态**：ALIGN在跨模态检索（image↔text）上大幅领先，但在单模态检索（text↔text, image↔image）上提升有限，说明对比学习目标天然偏向跨模态对齐而非单模态聚类。

## 🔬 深入细节

### 架构示意图

![ALIGN Architecture](https://ar5iv.labs.arxiv.org/html/2102.05918/assets/x1.png)

*图1: ALIGN双塔架构。图像经EfficientNet编码，文本经BERT编码，两个嵌入通过L2归一化后在共享空间中进行对比学习。*

### 核心算法伪代码

```python
# ALIGN: Normalized Softmax Contrastive Learning
# I: batch of images, T: batch of texts, N = batch_size = 16384

# 1. Encode
img_emb = l2_normalize(image_encoder(I))   # [N, 640] EfficientNet-L2
txt_emb = l2_normalize(text_encoder(T))     # [N, 640] BERT-Large

# 2. Compute similarity matrix (cosine similarity scaled by temperature)
# σ is a learnable scalar, initialized to 1.0, converges to ~1/64
logits = (img_emb @ txt_emb.T) / sigma      # [N, N]

# 3. Bidirectional normalized softmax loss with label smoothing (eps=0.1)
labels = torch.arange(N)  # diagonal = positive pairs
loss_i2t = cross_entropy_with_label_smoothing(logits, labels, eps=0.1)
loss_t2i = cross_entropy_with_label_smoothing(logits.T, labels, eps=0.1)
loss = (loss_i2t + loss_t2i) / 2
```

### 方法详解

**数据管线：规模换质量的工程哲学。** ALIGN的核心洞察是：互联网上的图片alt-text天然构成了海量的弱监督图文对。与CLIP使用精心设计的50万查询词从网络爬取并过滤400M数据不同，ALIGN直接从超过10亿的网页中提取原始的image-alt-text对，仅进行极简的清洗：(1) 过滤色情/有害内容；(2) 去除alt-text过短（<3 unigrams）或过长的样本；(3) 基于图片尺寸和宽高比进行基本过滤；(4) 去除出现频率极高的无意义alt-text（如"click to enlarge"）。这套流程将数据从原始的数十亿缩减到1.8B对，但保留了大量噪声——许多alt-text只是部分描述图片内容，或完全无关。论文通过精心设计的消融实验（Table 10）证明：虽然同等规模下noisy数据远不如clean数据（3M noisy vs 3M CC: 8.1 vs 18.9 I2T R@1），但只需4倍规模（12M noisy）即可反超clean数据，而当规模达到1.8B时，模型性能远超任何clean小数据集训练的结果。

**双塔编码器：独立编码的效率优势。** 图像端采用EfficientNet-L2（480M参数），输入分辨率289×289，使用全局平均池化后接线性投影层映射到640维嵌入空间。文本端采用BERT-Large，输入最长64个wordpiece token（因alt-text通常不超过20个单词），取[CLS] token的表示经线性投影到同一640维空间。两个编码器的输出均经过L2归一化，使得余弦相似度等价于归一化内积。这种双塔设计的核心优势在于推理效率：图像和文本可以独立预计算嵌入向量，检索时只需计算向量内积，支持大规模近似最近邻搜索。相比UNITER、Oscar等需要将图文拼接后送入Transformer进行联合编码的方法，ALIGN在检索场景下的计算成本降低了数个数量级。

**训练策略：大batch与温度学习。** ALIGN在1024个Cloud TPUv3核心上训练，每个核心处理16个正样本对，总batch size为16384。所有核心的嵌入向量会被concatenate，使得每个样本有16383个in-batch负例。消融实验（Table 8）显示，减少负例数量（50%或25%）会显著降低性能，验证了大batch对对比学习的重要性。温度参数σ从1.0初始化，在训练过程中快速下降（前100k步即达到收敛值的~1.2倍），最终收敛到约1/64。消融显示手动设定σ=1/128或1/64可略优于学习值，但σ=1/32则性能急剧下降，说明温度过高会使分布过于平滑而丧失判别力。优化器使用LAMB（而非SGD或Adam），学习率在10k步内线性warmup到1e-3，然后在1.2M步（约12个epoch）内线性衰减到0，权重衰减1e-5，label smoothing 0.1。

**损失函数的数学形式。** 给定一个batch中的N个图文对 $$\{(x_i, y_i)\}_{i=1}^{N}$$，图像编码器输出 $$f(x_i)$$，文本编码器输出 $$g(y_i)$$，经L2归一化后的嵌入分别为 $$\hat{f}(x_i)$$ 和 $$\hat{g}(y_i)$$。image-to-text损失定义为：

$$\mathcal{L}_{i2t}(x_i) = -\frac{1}{\sigma} \hat{f}(x_i)^T \hat{g}(y_i) + \log \sum_{j=1}^{N} \exp\left(\frac{1}{\sigma} \hat{f}(x_i)^T \hat{g}(y_j)\right)$$

对称地定义text-to-image损失 $$\mathcal{L}_{t2i}$$，总损失为两者之和在batch上的均值。其中σ为可学习温度参数，控制softmax分布的锐度。

**与CLIP的关键差异。** 虽然ALIGN和CLIP几乎同时提出且思路相似，但存在几个关键区别：(1) **数据策略**：CLIP使用精心构建的50万查询词从网络爬取并过滤出400M高质量数据，ALIGN则使用1.8B原始noisy数据，验证了"规模>质量"的假设；(2) **编码器选择**：CLIP的最强版本使用ViT-L/14作为图像编码器，ALIGN使用EfficientNet-L2，两者参数量相近但架构不同；(3) **损失函数**：两者都使用对称对比损失，但ALIGN额外使用了label smoothing；(4) **结果对比**：在ImageNet零样本上两者接近（76.4 vs 76.2），但在跨模态检索上ALIGN显著领先（Flickr30K text→image R@1: 75.7 vs 68.7），这可能归因于更大的训练数据规模和label smoothing的正则化效果。

## 🧪 练习题

### 概念理解

1. **为什么ALIGN使用L2归一化后的内积作为相似度度量，而不是直接使用未归一化的内积？** 请从梯度稳定性和温度参数的物理意义两个角度分析。

2. **ALIGN的消融实验（Table 10）显示，12M noisy数据优于3M clean数据。请解释为什么噪声数据在规模足够大时反而有优势？** 提示：考虑数据多样性、正则化效果和长尾分布。

3. **为什么温度参数σ=1/32时性能急剧下降（Table 8: I2T R@1从52.2降至39.6），而σ=1/64和1/128差异不大？** 请从softmax分布的角度解释。

### 代码实践

4. **实现ALIGN的核心对比损失函数**，包括双向softmax损失和label smoothing，并验证当batch_size=4、embedding_dim=8时的输出shape和梯度流。

```python
import torch
import torch.nn.functional as F

def align_loss(img_emb, txt_emb, sigma, label_smoothing=0.1):
    """
    Args:
        img_emb: [N, D] L2-normalized image embeddings
        txt_emb: [N, D] L2-normalized text embeddings
        sigma: learnable temperature scalar
        label_smoothing: smoothing parameter
    Returns:
        loss: scalar
    """
    # TODO: 实现双向归一化softmax对比损失
    pass
```

### 论文拓展

5. **ALIGN在单模态检索（text↔text, image↔image）上表现不如跨模态检索。** 请设计一种改进方案，使模型在保持跨模态对齐能力的同时提升单模态检索性能。提示：参考论文中提到的multitask learning方向。