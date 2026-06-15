### 视频JEPA 2.1 (Understanding Physical World)

```yaml
id: vjepa21
name: V-JEPA 2.1
full_name: 视频JEPA 2.1 (Understanding Physical World)
year: "2026.02"
org: Meta AI
paper_url: "https://ai.meta.com/blog/v-jepa-2-1-physical-world/"
category: predictive
parent: vjepa2
motivation: "扩展至20亿参数实现80%零样本抓取成功率"
```

#### 📝 一句话总结

V-JEPA 2.1 在 V-JEPA 2 的全局视频理解基础上加入 dense predictive loss、deep self-supervision 和多模态 tokenizer，使自监督视频表征同时具备局部空间密度、时间一致性和机器人可用性。

#### 🎯 核心要点

- **Dense Predictive Loss**：对 masked tokens 和 visible context tokens 都施加预测损失，显式保留局部时空结构
- **Context loss 加权**：对靠近 mask 区域的 context token 赋予更高权重，增强 mask 与可见区域之间的局部连续性
- **Deep Self-Supervision**：在多个中间 encoder 层级施加自监督目标，避免最终层只保留全局语义而损失局部细节
- **Multi-Modal Tokenizers**：使用图像和视频专用 patch embedding，在共享 encoder 中联合训练静态图像和视频
- **规模化到 ViT-G 2B**：模型容量、VisionMix163M 图像数据、高分辨率 cooldown 共同提升 dense 与 global 任务表现
- **具身任务收益**：论文报告短期物体交互预测、动作预测、深度估计、语义分割、机器人抓取和导航均受益
- **依据限制**：YAML 的 `paper_url` 指向 Meta 博客；方法细节主要依据公开 arXiv 论文 `V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning`

#### 🔬 深入细节

##### 核心示意图

![V-JEPA 2.1 架构](https://arxiv.org/html/2603.14482v2/diagrams/architecture_vjepa2_1.jpg)
*图：V-JEPA 2.1 使用图像/视频 tokenizers、3D RoPE、multi-level encoder features 和 predictor，对 masked 与 context tokens 同时做自监督预测。*

##### 动机与背景

V-JEPA 2 擅长 motion understanding、action anticipation 和机器人目标规划，但其 feature map 对 dense prediction 不够友好。直观地说，原始 JEPA 目标主要监督 masked patch，visible context token 可以退化成全局信息汇聚器，导致局部边界、物体部件和深度结构在最后层表示中不够清晰。

V-JEPA 2.1 的关键改动是把“预测被遮挡部分”扩展为“让所有 token 都承担局部表征责任”。设 \(M\) 是 masked token 集合，\(C\) 是 context token 集合，原始预测损失可写作：

$$
\mathcal{L}_{\text{pred}} =
\frac{1}{|M|}
\sum_{i \in M}
d(\hat y_i, \text{sg}(y_i))
$$

V-JEPA 2.1 额外引入 context loss：

$$
\mathcal{L}_{\text{ctx}} =
\frac{1}{|C|}
\sum_{i \in C}
\lambda_i d(\hat y_i, \text{sg}(y_i))
$$

其中 \(d(\cdot,\cdot)\) 是特征距离，\(\lambda_i\) 与 context token 到最近 mask token 的距离有关。靠近缺失区域的 context token 更需要携带精确局部信息，因此被更强监督。总损失不只作用在最终层，还作用在多个中间层：

$$
\mathcal{L}_{\text{V-JEPA 2.1}} =
\sum_{\ell \in \mathcal{S}}
\left(
\mathcal{L}_{\text{pred}}^{(\ell)}
+ \mathcal{L}_{\text{ctx}}^{(\ell)}
\right)
$$

##### 算法伪代码

```python
# V-JEPA 2.1 dense self-supervised training
for sample in image_video_batches:
    tokens = modality_tokenizer(sample)       # 2D image patches or 3D video tubelets
    visible, masked, mask_info = random_mask(tokens)

    # Shared encoder produces multi-level context features
    layer_features = encoder(visible, return_layers=selected_layers)
    fused_context = mlp_fuse(layer_features)

    # Predictor receives context tokens plus learnable mask tokens
    predictions = predictor(fused_context, mask_tokens(mask_info))

    loss = 0.0
    for layer in selected_layers:
        target = stopgrad(target_encoder(tokens, layer=layer))
        loss += distance(predictions.masked[layer], target.masked)
        loss += weighted_context_loss(predictions.context[layer], target.context)

    optimize(encoder, predictor, modality_tokenizers, loss)
    update_ema(target_encoder, encoder)
```

##### 方法机制拆解

Dense Predictive Loss 解决的是“表征是否能被像素级下游任务线性读出”的问题。传统 V-JEPA 表征更偏向全局语义，适合分类和动作预测；V-JEPA 2.1 要求 visible context token 自己也被预测到 target 表征，因此每个 patch 需要保留更强的位置、边界和物体部件信息。

Deep Self-Supervision 解决的是“中间层有局部信息，最终层有语义信息”之间的矛盾。模型把若干中间层和最终层特征拼接，经 MLP 融合后送入 predictor，并在多个层级计算损失。这样最终层不必为了分类而完全丢掉局部结构，dense downstream task 也不再强依赖多层 probing。

Multi-Modal Tokenizer 让同一个 encoder 同时吃图像和视频。图像提供大规模外观、物体和边界多样性，视频提供运动、时序和物理连续性。V-JEPA 2.1 通过模态专用 patch embedding、3D RoPE 和 modality embedding 把二者纳入统一表征学习流程。

在机器人任务中，dense feature 的价值尤其直接。抓取和导航不仅需要知道“这是什么物体”，还需要知道物体边界、深度关系和相对位置。V-JEPA 2.1 改善的局部空间结构可以让后续 latent planner 更准确地估计目标物和夹爪之间的几何关系。

> 💡 关键：V-JEPA 2.1 不是把 V-JEPA 变成像素重建模型，而是在表征预测目标中补上 context token 和中间层监督，使 latent feature 同时服务全局理解和局部控制。

#### 🧪 练习题

```yaml
question: "V-JEPA 2.1 中 context loss 的核心作用是什么？"
options:
  - "让可见 token 也被自监督约束，从而保留局部空间结构"
  - "把所有视频帧压缩成单个全局分类 token"
  - "替代 target encoder 的 EMA 更新"
  - "只提升文本问答任务，与视觉密集任务无关"
answer: 0
explain: "context loss 对 visible context tokens 也施加预测约束，避免它们只做全局汇聚，从而提升分割、深度和机器人几何理解。"
```
