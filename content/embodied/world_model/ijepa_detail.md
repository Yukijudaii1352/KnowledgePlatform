### 图像JEPA (Image-JEPA)

```yaml
id: ijepa
name: I-JEPA
full_name: 图像JEPA (Image-JEPA)
year: "2023.06"
org: Meta AI
paper_url: "https://arxiv.org/abs/2301.08243"
category: predictive
parent: jepa
motivation: "通过掩码块预测学习强语义特征训练效率高"
```

#### 📝 一句话总结

I-JEPA 将 JEPA 落地到图像自监督学习：从单个上下文块预测同一图像中多个目标块的 latent representations，而不是重建像素，从而在不依赖手工数据增强的情况下高效学到语义表征。

#### 🎯 核心要点

- **单视图自监督**：不生成多种 crop/color jitter 视图，只从同一图像采样 context block 和 target blocks
- **表征空间预测**：target encoder 先编码完整图像 patch 表征，predictor 只预测被 mask 目标块的表征
- **EMA target encoder**：target encoder 由 context encoder 的指数滑动平均更新，配合 stop-gradient 防止坍塌
- **语义尺度 mask**：target blocks 采样较大连续区域，context block 保持足够信息但移除与 target 重叠部分
- **ViT 可扩展性**：结合 Vision Transformer，ViT-H/14 可在 ImageNet 上用 16 张 A100 于 72 小时内完成训练
- **下游泛化**：在线性分类、少样本分类、目标计数和深度预测等任务上表现强，说明表征不只服务分类

#### 🔬 深入细节

##### 核心示意图

![I-JEPA 架构](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x5.png)
*图：I-JEPA 用 context encoder 处理可见上下文块，predictor 结合目标位置 mask tokens 预测目标块表征，target encoder 提供 stop-gradient 目标。*

##### 动机与背景

图像自监督学习主流有两类：对比/不变性方法依赖手工增强构造正样本视图，生成式方法通过 MAE 等方式重建缺失像素。前者的增强不一定适合所有任务，后者会把容量花在低层纹理和颜色细节上。I-JEPA 的目标是学习“无需手工增强、无需像素解码”的图像语义表征。

给定图像 \(x\)，I-JEPA 先把它切成 patch token。target encoder \(E_{\bar\theta}\) 编码完整图像，得到每个 patch 的目标表征；context encoder \(E_\theta\) 只处理 context block 中未被遮挡的 patch；predictor \(P_\phi\) 接收 context 表征和目标位置 mask tokens，预测多个 target block 的 patch-level 表征。

##### 算法伪代码

```python
# I-JEPA pretraining
for image in dataloader:
    target_masks = sample_large_semantic_blocks(image, num_blocks=M)
    context_mask = sample_context_block(image)
    context_mask = remove_overlap(context_mask, target_masks)

    with stop_gradient():
        target_repr = target_encoder(image)          # EMA encoder, full image
        targets = [target_repr[mask] for mask in target_masks]

    context_tokens = image_patches(image)[context_mask]
    context_repr = context_encoder(context_tokens)

    preds = []
    for mask in target_masks:
        mask_tokens = positional_mask_tokens(mask)
        preds.append(predictor(context_repr, mask_tokens))

    loss = mean_distance(preds, targets)
    optimize(context_encoder, predictor, loss)
    update_ema(target_encoder, context_encoder)
```

##### 损失函数

I-JEPA 的目标是让预测表征接近 target encoder 给出的表征。若第 \(i\) 个目标块的 patch 表征为 \(s_{y_i}\)，预测为 \(\hat{s}_{y_i}\)，可写作：

$$
\mathcal{L}
=
\frac{1}{M}\sum_{i=1}^{M}
D\left(
P_\phi(E_\theta(x_{\mathrm{ctx}}), m_i),
\mathrm{sg}(E_{\bar\theta}(x)_{m_i})
\right)
$$

其中 \(m_i\) 表示目标块位置，\(\mathrm{sg}\) 表示 stop-gradient。target encoder 参数用 EMA 更新：

$$
\bar\theta \leftarrow \tau\bar\theta + (1-\tau)\theta
$$

这种结构与 BYOL/data2vec 的 target network 思路相近，但 I-JEPA 的关键是“预测空间”和“mask 采样策略”。

##### mask 设计为什么关键

如果 target block 太小，模型可利用局部纹理补全，学到的是低层边缘和颜色；如果 context 太窄，预测任务过难且不稳定。论文强调两个条件：

- target blocks 要足够大，迫使目标表征偏向对象和语义区域
- context block 要信息充足且空间分布合理，但不能与 target 大量重叠

> 💡 关键：I-JEPA 的语义性很大程度来自 mask 任务设计，而不仅是“把 MAE 的 decoder 换成 predictor”。

##### 与 MAE / 对比学习的区别

MAE 预测像素，decoder 必须重建局部纹理，因此预训练表征往往需要大量 fine-tuning 才释放性能。I-JEPA 预测 target encoder 的 latent representation，避免像素解码器，计算更省，也更偏向高层语义。

对比学习和 DINO/iBOT 等方法通常依赖多视图增强来定义不变性。I-JEPA 只处理单个图像视图，不需要手工设计“哪些变化应保持不变”。这让它更接近 JEPA 的一般目标：通过预测上下文与目标之间的表征关系，让系统自己形成有用抽象。

##### 实验意义

论文报告 I-JEPA 在 ImageNet linear evaluation 上优于不使用手工增强的 MAE、CAE、data2vec 等方法，并展现良好规模化。更重要的是，I-JEPA 的表征可迁移到目标计数、深度预测等非分类任务，说明它保留了比分类标签更丰富的图像结构信息。这也是它成为 V-JEPA 和后续具身世界模型表征基础的原因。

#### 🧪 练习题

```yaml
question: "I-JEPA 为什么强调 target blocks 要足够大？"
options:
  - "为了让模型直接复制像素纹理"
  - "为了让预测任务偏向语义区域，而不是只靠局部低层线索完成"
  - "为了减少 target encoder 的参数量"
  - "为了让 context encoder 可以看到完整目标块"
answer: 1
explain: "大块目标更难用局部纹理猜出，迫使模型学习对象级和场景级语义表征；同时 context 会移除与目标重叠区域以避免泄漏。"
```
