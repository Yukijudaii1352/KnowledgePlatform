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

CLIP 用 4 亿互联网图文对训练图像编码器和文本编码器，通过对称对比学习把自然语言描述变成可迁移的视觉监督，解决传统分类模型只能预测固定标签空间、迁移到新任务依赖再标注的问题。

#### 🎯 核心要点

- 训练数据是 WebImageText：约 4 亿个从互联网收集的图像-文本对
- 采用双编码器结构：图像塔为 ResNet 或 ViT，文本塔为 Transformer，二者输出同维度归一化向量
- 使用 batch 内所有非配对样本作为负样本，训练目标是让正确图文对在相似度矩阵对角线上得分最高
- 损失是对称的 image-to-text 与 text-to-image 交叉熵，配合可学习温度参数控制 softmax 尖锐度
- 零样本分类通过 prompt 模板把类别名转成文本嵌入，文本嵌入直接充当分类器权重
- 推理阶段图像和文本可以独立编码，因此天然适合大规模图文检索、向量库召回和开放词表分类
- 论文系统展示了自然语言监督的可扩展性，同时也指出 CLIP 对分布偏移、细粒度计数和抽象推理仍有限制

#### 🔬 深入细节

##### 框架总览

![CLIP 方法总览](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png)
*图：论文 Figure 1。CLIP 训练时预测 batch 内正确图文配对；测试时用文本编码器把类别 prompt 转成零样本分类器。*

##### CLIP 训练与零样本分类伪代码

```python
# CLIP 的核心训练循环
for images, texts in web_image_text_loader:
    image_features = image_encoder(images)      # ResNet 或 ViT
    text_features = text_encoder(texts)         # Transformer

    image_features = l2_normalize(image_projection(image_features))
    text_features = l2_normalize(text_projection(text_features))

    # N x N 相似度矩阵；对角线是正确配对
    logits = exp(logit_scale) * image_features @ text_features.T
    labels = arange(batch_size)

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    loss = (loss_i2t + loss_t2i) / 2

    loss.backward()
    optimizer.step()

# 零样本分类：类别名经 prompt 模板变成文本分类器
prompts = [f"a photo of a {class_name}" for class_name in class_names]
class_emb = l2_normalize(text_encoder(prompts))
image_emb = l2_normalize(image_encoder(image))
prediction = argmax(image_emb @ class_emb.T)
```

##### 方法细节

CLIP 的出发点是监督信号瓶颈。传统 ImageNet 训练把图像映射到固定的 1000 类，这种监督很干净，但标签空间窄、扩展成本高，而且迁移到新类别需要重新标注。互联网图像天然带有标题、alt-text、周边文字或用户描述，虽然噪声大，却覆盖了更开放的概念空间。CLIP 的关键判断是：与其继续人工扩充固定标签集，不如直接学习图像和自然语言之间的匹配关系。

结构上，CLIP 刻意选择双编码器而不是跨注意力融合模型。图像编码器 \(f_\theta(I)\) 和文本编码器 \(g_\phi(T)\) 独立输出向量，再投影到同一嵌入空间并做 L2 归一化：

$$
v_i=\frac{f_\theta(I_i)}{\lVert f_\theta(I_i)\rVert_2},\qquad
u_j=\frac{g_\phi(T_j)}{\lVert g_\phi(T_j)\rVert_2}
$$

给定一个 batch 的 \(N\) 个匹配图文对，CLIP 构造相似度矩阵：

$$
S_{ij}=\exp(\tau)\,v_i^\top u_j
$$

其中 \(\tau\) 是可学习的 logit scale。因为向量被归一化，点积本质上是余弦相似度；温度缩放控制 softmax 分布的尖锐程度，避免 batch 很大时正负样本分数差异过小。

训练目标是对称 InfoNCE。每张图像要在 \(N\) 条文本中找回自己的文本，每条文本也要在 \(N\) 张图像中找回自己的图像：

$$
\mathcal{L}_{i2t}
=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(S_{ii})}{\sum_{j=1}^{N}\exp(S_{ij})}
$$

$$
\mathcal{L}_{t2i}
=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(S_{ii})}{\sum_{j=1}^{N}\exp(S_{ji})}
$$

$$
\mathcal{L}_{CLIP}=\frac{1}{2}\left(\mathcal{L}_{i2t}+\mathcal{L}_{t2i}\right)
$$

这个损失的工程价值很高：batch 中其他 \(N-1\) 个样本自动成为负样本，不需要人工构造 hard negatives；图像和文本塔也可以分布式并行训练，只需在计算相似度前聚合 embedding。

CLIP 的零样本分类来自同一个嵌入空间。对一个下游类别集合 \(\mathcal{C}\)，不是训练新的线性层，而是把类别名写入 prompt，例如 “a photo of a {label}”，得到文本向量 \(u_c\)。图像 \(I\) 的类别概率可以写成：

$$
p(y=c\mid I)=
\frac{\exp(\exp(\tau)\,v_I^\top u_c)}
{\sum_{c'\in\mathcal{C}}\exp(\exp(\tau)\,v_I^\top u_{c'})}
$$

因此，文本编码器在推理时相当于动态分类器生成器。改变 prompt 模板、加入同义词或对多个模板做 ensemble，都会改变分类边界；这也是论文中 prompt engineering 能显著影响零样本精度的原因。

与早期视觉语言模型相比，CLIP 的取舍非常清楚。跨注意力模型能做更细粒度的 token-region 交互，但每个图文候选对都要一起前向，无法高效服务亿级检索库。CLIP 的双塔结构让图像库和文本库都能离线编码，在线阶段只需点积或近似最近邻搜索，因此更适合开放词表检索和大规模召回。

CLIP 也不是“理解视觉语言”的终点。它主要学习全局图文对齐，容易受数据偏见、prompt 表达和语境歧义影响；对计数、空间关系、细粒度属性组合、OCR 长文本和需要多步推理的任务并不稳定。后续 ALIGN、SigLIP、LiT、BLIP 系列和多模态大模型，很大程度上都是在 CLIP 打开的自然语言监督路线基础上继续改进数据规模、损失函数、模型交互方式或生成能力。

> 💡 关键：CLIP 的核心贡献不是某个复杂模块，而是证明“大规模噪声图文对 + 双塔对比学习 + prompt 形式的标签描述”可以把视觉模型从封闭标签空间推向开放词表迁移。

#### 🧪 练习题

```yaml
question: "CLIP 为什么可以做零样本图像分类？"
options:
  - "它在预训练时已经见过所有下游测试图像"
  - "它可以把类别名称或 prompt 编码成文本向量，并直接与图像向量比较"
  - "它在推理时先训练一个新的线性分类头"
  - "它使用目标检测器输出所有候选类别框"
answer: 1
explain: "CLIP 学到共享图文嵌入空间，类别文本向量可以充当分类器权重，因此新类别可通过自然语言 prompt 动态定义。"
```
