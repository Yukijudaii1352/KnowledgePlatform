### DINO — 带去噪锚框的改进DETR

```yaml
id: dino
name: DINO
full_name: "带去噪锚框的改进DETR (DETR with Improved Denoising)"
year: "2022"
org: "IDEA"
paper_url: "https://arxiv.org/abs/2203.03605"
category: "transformer_based"
parent: "deformable_detr"
motivation: "对比去噪训练提升性能"
```

#### 📝 一句话总结

DINO 在 Deformable DETR 系列上系统整合对比去噪训练、混合 query 选择和 look forward twice 框更新，使 DETR-like 检测器在收敛速度、定位质量和大规模性能上显著提升。

#### 🎯 核心要点

- Contrastive DeNoising (CDN)：同时构造正负噪声锚框，训练模型区分接近目标和偏离目标的 queries
- Mixed Query Selection：用 encoder top-K 特征初始化位置 query / anchor box，内容 query 仍保持可学习
- Look Forward Twice：让当前层框回归同时受当前层和下一层预测监督，改善逐层框细化
- 继承多尺度 Deformable Attention：保留 Deformable DETR 的高效多尺度特征读取
- 快速高精度：R50 多尺度设置下 12/24 epoch 即显著优于 DN-DETR
- 可扩展性强：结合 Objects365 预训练和 Swin-L backbone 后达到当时 COCO 领先结果

#### 🔬 深入细节

![DINO 框架图](https://ar5iv.labs.arxiv.org/html/2203.03605/assets/x2.png)
*图：DINO 在 Transformer encoder-decoder 中加入 contrastive denoising、mixed query selection 和改进的框更新。*

##### 1. 动机与背景

DETR 的慢收敛很大程度上来自二分匹配不稳定：训练早期预测框和类别都很差，一个真值目标在不同 epoch 可能匹配到不同 query，监督信号抖动。DN-DETR 通过把带噪声的真值框和标签送入 decoder，并要求模型重建原始真值，缓解了匹配不稳定。

DINO 进一步指出，单纯重建带噪声正样本还不够。检测器不仅要把接近目标的 query 拉回目标，还要学会拒绝那些“看起来也接近但不该匹配”的负 query，尤其是在多个 anchor 靠近同一个物体时避免重复预测。

##### 2. 对比去噪训练

CDN 为每个真值框构造两类 denoising queries：正样本是轻微扰动后的 GT label/box，负样本是更大扰动或类别干扰后的样本。模型需要把正样本恢复为对应目标，同时把负样本分类为背景或远离该目标。

```python
# DINO Contrastive DeNoising 伪代码
dn_queries = []
for gt_label, gt_box in targets:
    pos_box = add_small_noise(gt_box)
    pos_label = maybe_keep_label(gt_label)
    dn_queries.append((pos_label, pos_box, "reconstruct_gt"))

    neg_box = add_larger_noise(gt_box)
    neg_label = corrupt_or_keep_label(gt_label)
    dn_queries.append((neg_label, neg_box, "reject_as_background"))

decoder_inputs = concat(dn_queries, matching_queries)
outputs = transformer_decoder(decoder_inputs, encoder_memory)

loss = set_prediction_loss(outputs.matching_part, targets)
loss += denoising_reconstruction_loss(outputs.dn_part, targets)
```

直觉上，CDN 把训练任务从“看到模糊 query 后回归目标”变成“判断这个 query 是否真的属于目标，并只把合格 query 拉向目标”。这直接减少相邻 anchor 对同一目标的混淆，是 DINO 名称中 Improved DeNoising Anchor Boxes 的核心。

##### 3. Mixed Query Selection

![DINO query 初始化对比](https://ar5iv.labs.arxiv.org/html/2203.03605/assets/x7.png)
*图：DINO 只用 encoder top-K 特征增强位置 query，内容 query 仍保持静态可学习。*

两阶段 Deformable DETR 会从 encoder 输出中选择 top-K 特征，同时初始化 decoder 的位置 query 和内容 query。DINO 认为 encoder top-K 特征虽然位置先验强，但内容语义仍可能混杂，例如一个特征覆盖多个物体或只覆盖物体局部；如果直接把它作为内容 query，可能误导 decoder。

因此 DINO 采用混合 query 选择：位置部分来自 encoder top-K 候选框，内容部分仍是可学习参数。这样 decoder 既获得图像自适应的位置锚点，又保留稳定、可训练的内容查询容量：

$$
q^{pos}_i = \text{TopKAnchor}(\text{Encoder}(x)), \quad
q^{content}_i = e_i
$$

##### 4. Look Forward Twice 框更新

![DINO 框更新机制](https://ar5iv.labs.arxiv.org/html/2203.03605/assets/x8.png)
*图：DINO 让相邻层的框预测参与当前层参数更新，增强迭代细化监督。*

Deformable DETR 的 iterative box refinement 会逐层更新参考框，但为了稳定训练，更新后的参考框常被 detach，导致早期层只能从自身辅助损失得到监督。DINO 提出 look forward twice：当前层预测的 offset 不仅形成当前层输出，也会影响下一层用于预测的参考框，因此当前层参数同时受到当前层和下一层 box loss 影响。

可以把它理解为更密集的框细化监督。若第 \(i\) 层预测偏移 \(\Delta b_i\)，它既用于得到 \(b'_i\)，也参与形成 \(b^{pred}_{i+1}\)。这让早期层学会产生对后续层真正有帮助的参考框，而不是只优化本层辅助输出。

##### 5. 与 Deformable DETR 的关系

DINO 并不是替换 Deformable DETR 的底层注意力，而是在其强多尺度检测骨架上补齐 query 训练和框细化策略。Deformable DETR 解决“看哪里”和“如何高效看”的问题；DINO 主要解决“query 如何初始化、如何稳定训练、如何避免混淆”的问题。

> 💡 关键：DINO 的贡献是组合式但不简单堆料，三项机制都围绕 DETR 的 query-匹配不稳定展开：CDN 稳定监督，mixed query selection 提供更好锚点，look forward twice 改善逐层定位。

#### 🧪 练习题

```yaml
question: "DINO 的 Contrastive DeNoising 相比 DN-DETR 去噪训练多解决了什么问题？"
options:
  - "把所有 query 都改成 CNN anchor"
  - "引入负噪声样本，训练模型拒绝不合格锚框并减少相近 query 混淆"
  - "去掉匈牙利匹配"
  - "只对分类头做蒸馏"
answer: 1
explain: "CDN 同时构造正负 denoising queries，让模型学会恢复正样本并排斥负样本，从而减少重复预测和错误 anchor 选择。"
```
