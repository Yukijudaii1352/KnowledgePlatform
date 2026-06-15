### CLIP — 对比语言图像预训练 (Contrastive Language-Image Pre-training)

```yaml
id: clip
name: CLIP
full_name: "对比语言图像预训练 (Contrastive Language-Image Pre-training)"
year: "2021.01"
org: "OpenAI"
paper_url: "https://openai.com/index/clip/"
category: foundation
parent: "—"
motivation: "4亿图文对对比学习，零样本视觉理解奠基"
```

#### 📝 一句话总结

CLIP 在 4 亿互联网图文对上训练图像编码器和文本编码器，用对比学习把两种模态对齐到同一嵌入空间，解决了传统视觉分类器依赖封闭标签集、难以零样本迁移的问题。

#### 🎯 核心要点

- 双编码器架构：图像编码器使用 ResNet 或 ViT，文本编码器使用 Transformer
- 训练数据 WIT：约 4 亿个从互联网收集的 image-text pairs
- 对称对比目标：同时优化 image-to-text 与 text-to-image 的 InfoNCE 交叉熵
- 大 batch 负样本：一个 batch 内 \(N\) 个正样本构成 \(N^2-N\) 个隐式负样本
- 可学习温度参数：缩放余弦相似度 logits，控制对比学习分布锐度
- 零样本分类：用 prompt 模板把类别名变成文本嵌入，将分类转化为图文匹配
- Prompt engineering 与 prompt ensembling 显著提升开放集识别稳定性

#### 🔬 深入细节

##### 核心架构示意图

![CLIP 训练与零样本推理流程](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png)
*图：CLIP 先做图文对比预训练，再用文本 prompt 生成零样本分类器，最后通过图像-文本相似度完成预测。*

##### 算法伪代码

```python
# CLIP 对比预训练核心逻辑
for images, texts in dataloader:
    image_features = image_encoder(images)       # [N, d_i]
    text_features = text_encoder(texts)          # [N, d_t]

    image_emb = l2_normalize(image_features @ W_i)
    text_emb = l2_normalize(text_features @ W_t)

    logits = exp(logit_scale) * image_emb @ text_emb.T
    labels = arange(len(images))                 # 对角线是匹配图文对

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    loss = (loss_i2t + loss_t2i) / 2
    optimize(loss)

# 零样本分类
class_texts = [template.format(label) for label in class_names]
class_emb = l2_normalize(text_encoder(class_texts) @ W_t)
pred = argmax(l2_normalize(image_encoder(image) @ W_i) @ class_emb.T)
```

##### 动机与背景

传统视觉识别依赖 ImageNet 这类人工标注标签，训练好的分类器只能输出固定类别。CLIP 的核心判断是：互联网上天然存在海量图像及其文字描述，自然语言本身可以提供更开放、更可组合的监督信号。只要模型能把“图片”和“描述图片的文字”对齐，就能把任意类别名、属性短语或任务描述变成分类器。

论文比较了预测式目标和对比目标。逐词生成 caption 虽然直观，但训练成本高且要求模型学习完整语言建模；CLIP 只要求匹配图像和文本是否成对，把任务化简为 batch 内 \(N\) 路检索，因此能扩展到 4 亿图文对。

##### 核心机制：对称 InfoNCE

对一个 batch 的 \(N\) 个图文对，CLIP 计算图像嵌入 \(I_i\) 与文本嵌入 \(T_j\) 的余弦相似度矩阵：

$$
s_{ij}=\exp(t)\cdot \frac{I_i^\top T_j}{\|I_i\|\|T_j\|}
$$

其中 \(t\) 是可学习的 logit scale。对称损失为：

$$
\mathcal{L}=\frac{1}{2}\left[
\frac{1}{N}\sum_i -\log\frac{\exp(s_{ii})}{\sum_j\exp(s_{ij})}
+
\frac{1}{N}\sum_i -\log\frac{\exp(s_{ii})}{\sum_j\exp(s_{ji})}
\right]
$$

第一项让每张图像找对文本，第二项让每段文本找对图像。对角线是正样本，其余位置都是负样本。batch 越大，模型看到的对比候选越多，图文空间的语义边界越清晰。

##### 图像编码器、文本编码器与共享空间

CLIP 的图像编码器包含两条路线：改造 ResNet 的版本使用 attention pooling 替代普通全局平均池化；ViT 版本把图像切成 patch 后用 Transformer 编码。文本编码器是 Transformer，使用 BPE 分词，并取文本末尾 token 的表示作为句子特征。

两个编码器输出后分别乘上线性投影矩阵 \(W_i\)、\(W_t\)，映射到同一维共享空间并做 L2 归一化。这样相似度就是超球面上的角度关系，训练目标不会依赖某个模态的特征范数。

> 💡 关键：文本编码器在零样本分类时相当于“动态生成分类器权重”。类别不再是训练时固定的 index，而是自然语言描述。

##### 零样本推理流程

给定一个新数据集，CLIP 不微调模型，而是为每个类别构造 prompt，例如 `a photo of a {label}`。文本编码器把这些 prompt 变成类别原型向量；图像编码器把测试图像变成图像向量；最终选择相似度最高的文本类别。

Prompt engineering 解决了两个问题：类别名通常太短，和训练时的自然语言 caption 分布不一致；某些类别名还有歧义。使用领域相关模板和多个 prompt 的 embedding 平均，可以显著改善 ImageNet 等数据集上的零样本准确率。

##### 与传统方法的区别

监督分类器学习的是固定标签空间中的 \(p(y\mid x)\)，迁移到新类别需要重新标注和训练。CLIP 学习的是 \(p(\text{text matches image})\) 的跨模态相似度，类别、属性、风格甚至任务描述都可以写成文本参与匹配。

与 ViLBERT 这类细粒度交互模型相比，CLIP 的双塔结构不在每个样本内部做 token-region 交互，因此训练和检索极其高效；代价是它更擅长全局对齐与开放分类，对需要复杂多步视觉推理的任务通常需要后续模型在其表征上继续构建。

#### 🧪 练习题

```yaml
question: "CLIP 能进行零样本分类的关键原因是什么？"
options:
  - "它在训练时见过所有下游数据集标签"
  - "它把类别名通过文本编码器转成可匹配的文本嵌入"
  - "它只使用图像编码器，不需要文本输入"
  - "它在推理时重新训练最后一层分类头"
answer: 1
explain: "CLIP 将类别描述写成 prompt 并编码为文本向量，再与图像向量比较相似度，因此可以在未微调的情况下处理新类别。"
```
