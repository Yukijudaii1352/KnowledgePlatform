### CLIP

```yaml
id: clip
name: CLIP
year: '2021'
category: contrastive
institution: OpenAI
paper: ICML 2021
motivation: 利用自然语言监督学习通用视觉表征
parent: —
description: 在4亿图文对上进行对比学习，通过双塔架构（ViT+Transformer）实现零样本分类，成为多模态AI的视觉基石。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/clip_detail.md
```

#### 📝 一句话总结
CLIP 提出 Contrastive Language-Image Pre-training，用 4 亿图文对训练图像/文本双塔，把图像分类从固定标签头改造成“图像与文本描述匹配”问题，解决了传统视觉模型换任务就要重训分类器的限制。

#### 🎯 核心要点
- 大规模自然语言监督：构建约 4 亿个网络图文对，用原始文本而不是人工类别标签监督视觉表征
- 双塔对齐架构：图像编码器使用 ResNet 或 ViT，文本编码器使用 Transformer，二者映射到同一个归一化嵌入空间
- 对称对比损失：在一个 batch 内构造 \(N \times N\) 图文相似度矩阵，同时优化 image-to-text 与 text-to-image 交叉熵
- 可学习温度参数：用 logit scale 控制 softmax 锐度，使归一化余弦相似度具有足够判别性
- 零样本分类器合成：把类别名写入 prompt 模板，用文本编码器生成分类权重，再与图像嵌入做相似度匹配
- Prompt engineering 与 prompt ensembling：通过自然语言模板缓解类别名歧义，并提升跨数据集零样本表现
- 迁移能力强：在 30 多个视觉数据集上验证 OCR、动作识别、细粒度分类、地理定位等开放任务迁移

#### 🔬 深入细节
##### 核心示意图

![CLIP 总览图](https://raw.githubusercontent.com/openai/CLIP/main/CLIP.png)
*图：OpenAI CLIP 官方仓库中的方法总览。训练时预测 batch 内哪段文本与哪张图像匹配；推理时用文本编码器把类别描述变成零样本分类器。*

公开来源：论文 `https://arxiv.org/abs/2103.00020`，官方项目 `https://github.com/openai/CLIP`。

##### 核心流程代码

```python
# CLIP: symmetric image-text contrastive learning

def train_clip_step(images, texts, image_encoder, text_encoder, logit_scale):
    image_features = image_encoder(images)          # [N, D]
    text_features = text_encoder(texts)             # [N, D]

    image_emb = l2_normalize(linear_i(image_features))
    text_emb = l2_normalize(linear_t(text_features))

    logits = exp(logit_scale) * image_emb @ text_emb.T
    labels = arange(len(images))                    # diagonal pairs are positives

    loss_i2t = cross_entropy(logits, labels)
    loss_t2i = cross_entropy(logits.T, labels)
    return (loss_i2t + loss_t2i) / 2

def zero_shot_predict(image, class_names, templates):
    image_emb = l2_normalize(encode_image(image))
    text_embs = []
    for name in class_names:
        prompts = [tmpl.format(name) for tmpl in templates]
        text_embs.append(mean(l2_normalize(encode_text(prompts))))
    return argmax(image_emb @ stack(text_embs).T)
```

##### 关键公式

给定 batch 内 \(N\) 个图文对，图像嵌入 \(\hat{i}_k\) 与文本嵌入 \(\hat{t}_k\) 都经过 L2 归一化，CLIP 先计算相似度：

$$
s_{ij} = \exp(\alpha)\,\hat{i}_i^\top \hat{t}_j
$$

其中 \(\alpha\) 是可学习的 logit scale。对称训练目标为：

$$
\mathcal{L}
= \frac{1}{2N}\sum_{i=1}^{N}
\left[
-\log \frac{\exp(s_{ii})}{\sum_{j=1}^{N}\exp(s_{ij})}
-\log \frac{\exp(s_{ii})}{\sum_{j=1}^{N}\exp(s_{ji})}
\right]
$$

第一项让每张图像找回正确文本，第二项让每段文本找回正确图像；同一个 batch 中其余 \(N-1\) 个样本自然成为负例。

##### 方法解读

CLIP 的核心动机不是再做一个更大的 ImageNet 分类器，而是把监督信号从封闭的类别集合扩展到自然语言。传统监督视觉模型学习的是固定标签空间，例如 1000 个 ImageNet 类；当任务换成 OCR、地理定位或细粒度物种分类时，模型必须重新收集标注并训练新头。CLIP 直接学习“图像和文本是否匹配”，使模型在预训练阶段接触开放词汇、属性、动作和上下文描述，推理时可以用任意自然语言描述指定目标概念。

架构上，CLIP 保持了非常清晰的双塔设计。图像塔可以是改造过的 ResNet，也可以是 Vision Transformer；文本塔是 Transformer，处理 BPE token 序列，并取句末表示映射到共享嵌入空间。两个塔最后都接线性投影和 L2 归一化，所以相似度就是余弦相似度。双塔没有跨注意力，牺牲了一部分细粒度交互能力，但换来极高的检索和零样本推理效率：文本类别向量可以预先算好，图像只需编码一次。

对比目标是 CLIP 的效率关键。论文早期尝试过图像到文本的生成式 caption 预测，但生成精确文本需要建模大量语言细节，学习视觉可迁移概念的效率低。CLIP 改成只判断哪段文本与哪张图像配对，在 batch 中形成 \(N \times N\) 个候选配对，真实配对在对角线上。这样每个样本都会同时收到大量负例信号，训练目标直接服务于跨模态检索和零样本分类。

零样本分类时，CLIP 不再学习一个固定的线性分类头，而是把类别名写成自然语言 prompt，例如 `a photo of a {label}`。文本编码器输出的类别向量相当于动态分类器权重，图像向量与所有类别文本向量做相似度，最高者就是预测类别。Prompt 的作用不是装饰文本，而是把孤立类别名放回训练分布中：`crane` 可能是鸟也可能是机械，模板和 prompt ensemble 可以显著降低歧义。

CLIP 对后续 VLM 的影响在于它把“视觉编码器 + 语言空间对齐”变成了通用前端。后来的 LLaVA、BLIP、Flamingo 等模型大量复用或继承这条路径：先用大规模图文对学到开放词汇视觉特征，再通过连接器、跨注意力或指令微调补上细粒度推理与对话能力。CLIP 本身的限制也很清楚：它擅长全局语义匹配，但对精确计数、空间关系、细粒度 OCR 和需要复杂组合推理的任务并不充分。

#### 🧪 练习题

```yaml
question: "CLIP 能做零样本分类的关键原因是什么？"
options:
  - "图像编码器在 ImageNet 上有监督预训练"
  - "文本编码器可以把类别描述编码成动态分类器权重"
  - "模型使用跨注意力逐区域比较图文 token"
  - "训练时为每个下游数据集都保留了分类头"
answer: 1
explain: "CLIP 将类别名或类别描述写成 prompt，用文本编码器得到类别向量，再与图像向量比较相似度，因此可以在没有下游训练样本的情况下构造分类器。"
```
