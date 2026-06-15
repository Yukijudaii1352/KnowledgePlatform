### CLIP — 对比语言图像预训练 (CLIP)

```yaml
id: clip
name: CLIP
full_name: 对比语言图像预训练 (CLIP)
year: '2021'
org: OpenAI
paper_url: https://arxiv.org/abs/2103.00020
category: dual_encoder
parent: —
motivation: 大规模对比学习实现零样本迁移
```

#### 📝 一句话总结

CLIP 用 4 亿互联网图文对训练图像编码器和文本编码器，通过对比学习把自然语言监督转化为可迁移的视觉表示，解决传统视觉模型依赖固定标签空间的问题。预训练后，类别名或 prompt 就能直接构造零样本分类器。

#### 🎯 核心要点

- 采用双编码器结构：图像塔可用 ResNet 或 ViT，文本塔为 Transformer
- 训练数据是大规模 WebImageText 图文对，监督信号来自自然语言描述而非固定类别标签
- 使用对称图文对比损失，让 batch 内正确图文对位于相似度矩阵对角线
- 通过可学习温度缩放 logits，稳定大 batch 对比学习
- 推理时图像和文本可独立编码，天然支持文本搜图、图搜文和向量库检索
- 零样本分类通过 prompt 模板编码类别文本，再与图像嵌入做相似度匹配

#### 🔬 深入细节

![CLIP 方法总览](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png)
*图：论文 Figure 1。CLIP 训练时预测 batch 内正确的图文配对，测试时用文本编码器把类别描述转成零样本分类器。*

```python
# CLIP 核心训练伪代码
for images, texts in dataloader:
    image_features = l2_normalize(image_encoder(images))
    text_features = l2_normalize(text_encoder(texts))

    logits = exp(logit_scale) * image_features @ text_features.T
    labels = arange(batch_size)

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    loss = (loss_i2t + loss_t2i) / 2
    loss.backward()
    optimizer.step()

# 零样本分类
class_texts = [f"a photo of a {name}" for name in class_names]
class_emb = l2_normalize(text_encoder(class_texts))
pred = argmax(l2_normalize(image_encoder(image)) @ class_emb.T)
```

CLIP 的核心转变是把视觉监督从“人工标注类别”改为“图像旁边自然出现的文本”。传统 ImageNet 分类器只能预测训练时定义好的 1000 个类别，迁移到新任务需要再收集标签并微调；CLIP 直接学习图像和语言描述之间的对应关系，因此新类别可以用文本描述临时定义。

设一个 batch 有 \(N\) 个匹配图文对，归一化后的图像嵌入为 \(I_i\)，文本嵌入为 \(T_j\)。相似度矩阵为：

$$
S_{ij}=\exp(t)\cdot I_i^\top T_j
$$

其中 \(t\) 是可学习的 logit scale。训练目标是让每一行的正确文本为第 \(i\) 个，同时让每一列的正确图像也是第 \(i\) 个：

$$
\mathcal{L}=\frac{1}{2}\left(\operatorname{CE}(S, y)+\operatorname{CE}(S^\top,y)\right),\quad y_i=i
$$

这相当于同时做 image-to-text 和 text-to-image 两个方向的 \(N\) 类分类。batch 中其他 \(N-1\) 个样本自动成为 in-batch negatives，不需要显式标注负样本。

> 💡 关键：CLIP 的文本塔不只是 caption encoder，它在推理时承担“动态分类器生成器”的角色。类别名、属性描述、prompt 模板都会影响最终决策边界。

与 SCAN、OSCAR、ViLT 等融合模型相比，CLIP 的双塔结构牺牲了一部分细粒度交互，但换来了大规模检索和零样本迁移的工程优势。图像和文本向量可以离线预计算，在线检索只需点积；这也是后续 ALIGN、SigLIP 和大量多模态嵌入模型沿用双塔范式的原因。

#### 🧪 练习题

```yaml
question: "CLIP 为什么能进行零样本图像分类？"
options:
  - "它在预训练时已经见过所有下游数据集标签"
  - "它可以把类别名称或 prompt 编码成文本向量，并与图像向量直接比较"
  - "它使用目标检测器输出类别框"
  - "它在推理时生成图像描述再做字符串匹配"
answer: 1
explain: "CLIP 学到共享图文嵌入空间，因此新类别可由自然语言 prompt 表达，文本向量即可充当分类权重。"
```
