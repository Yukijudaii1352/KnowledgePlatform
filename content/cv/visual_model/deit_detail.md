### DeiT

```yaml
id: deit
name: DeiT
full_name: "数据高效图像Transformer (Data-efficient Image Transformers)"
year: "2020.12"
org: "Facebook AI Research"
paper_url: "https://arxiv.org/abs/2012.12877"
category: foundation
parent: vit
motivation: "知识蒸馏解决数据依赖"
```

#### 📝 一句话总结
DeiT 通过一套专门面向 ViT 的高效训练配方和 distillation token 蒸馏机制，让 Transformer 仅用 ImageNet-1K 就能达到接近大规模预训练 ViT 的性能，显著缓解了视觉 Transformer 的数据依赖问题。

#### 🎯 核心要点
- 只使用 ImageNet-1K 训练，不依赖 JFT-300M 等超大规模额外数据。
- 提出 distillation token，使学生模型在 Transformer 内部直接接收教师监督。
- 发现 hard distillation 比经典 soft distillation 更适合与强数据增强共同使用。
- 使用 RegNetY 等 CNN 作为教师时，蒸馏效果优于 Transformer 教师。
- 配套采用 AdamW、RandAugment、Mixup、CutMix、Repeated Augmentation 等完整训练配方。

#### 🔬 深入细节

![DeiT 蒸馏框架图](https://ar5iv.labs.arxiv.org/html/2012.12877/assets/x3.png)
*图：DeiT 在标准 class token 之外引入 distillation token，由教师网络对其进行监督。*

```python
# DeiT 训练伪代码
patch_tokens = patch_embed(image)
tokens = concat([cls_token, dist_token, patch_tokens]) + pos_embed
hidden = transformer(tokens)
cls_logits = head(hidden[:, 0])
dist_logits = head_dist(hidden[:, 1])

teacher_label = teacher(image).argmax(dim=-1)
loss = 0.5 * CE(cls_logits, gt_label) + 0.5 * CE(dist_logits, teacher_label)
loss.backward()
optimizer.step()
```

ViT 的第一个现实问题是：它在大数据预训练场景下很强，但在只用 ImageNet-1K 从头训练时，性能并不稳定，也难以和成熟 CNN 竞争。DeiT 的工作不是重新设计主干，而是回答一个更实际的问题：能否只靠更好的训练方法，把 ViT 训练得像卷积网络一样“省数据”。

论文最核心的结构创新是 distillation token。标准 ViT 只有一个 class token 用于汇聚全局信息，而 DeiT 增加了第二个可学习 token，让它和 patch token 一起参与自注意力计算，但最终单独接收教师网络的监督。于是蒸馏不再发生在模型输出层之外，而是直接嵌入 Transformer 的内部表征学习过程。推理时，class token 和 distillation token 的预测做平均，得到最终结果。

DeiT 比较了 soft distillation 和 hard distillation。soft 版本用教师输出分布做 KL 约束，hard 版本则直接把教师的 argmax 类别当作额外标签。论文发现后者更稳定，因为它与 Mixup、CutMix、label smoothing 等训练技巧的耦合更自然。目标函数可写成：

$$
\mathcal{L} =
\frac{1}{2}\,\mathcal{L}_{\text{CE}}(y_{\text{cls}}, y)
\;+\;
\frac{1}{2}\,\mathcal{L}_{\text{CE}}(y_{\text{dist}}, y_t)
$$

其中 \(y\) 是真实标签，\(y_t\) 是教师预测的硬标签。直觉上，学生同时学习“数据本身的监督”和“成熟教师给出的归纳偏置”，后者尤其弥补了 ViT 缺少卷积先验的问题。

另一个重要结论是：CNN 教师往往比 Transformer 教师更有效。原因在于 CNN 本身携带局部性和平移等变等视觉归纳偏置，恰好能补齐 ViT 的短板。DeiT 因此并不是否定 CNN，而是把 CNN 的归纳偏置通过蒸馏传递给 Transformer，这也是它成为“数据高效 ViT”代表作的关键。

#### 🧪 练习题
```yaml
question: "DeiT 中 distillation token 的主要作用是什么？"
options:
  - "替代所有 patch token 参与编码"
  - "专门承接教师模型监督，并在 Transformer 内部学习蒸馏表征"
  - "只用于位置编码插值"
  - "把图像切成更小 patch"
answer: 1
explain: "DeiT 新增 distillation token，让教师监督直接进入 Transformer 编码过程，而不是只在最终 logits 上做外部蒸馏。"
```
