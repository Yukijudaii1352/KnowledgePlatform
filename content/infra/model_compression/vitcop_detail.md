### ViTCoP

```yaml
id: vitcop
name: ViTCoP
full_name: 视觉文本协同剪枝 (ViTCoP)
year: 2026
org: arXiv
paper_url: https://arxiv.org/abs/2601.17818
category: pruning
parent: saap
motivation: 视觉与文本语义协同加速多模态
```

#### 📝 一句话总结

ViTCoP 提出视觉与文本语义协同的 LVLM token 剪枝框架，先在视觉编码器过滤冗余视觉 token，再在 LLM 浅层和深层逐步结合视觉多样性与文本相关性剪枝，解决了早剪丢关键信息、晚剪保留冗余 token 的矛盾。

#### 🎯 核心要点

- 面向 LLaVA 等大视觉语言模型中的视觉 token 冗余
- 三阶段流程：视觉编码器粗剪、LLM 浅层协同剪枝、LLM 深层文本显著性剪枝
- 在视觉编码器中利用 `[CLS]` attention 识别初始重要视觉 token
- 在浅层使用 VIC clustering 和 K-norm merging 保留多样且关键的视觉证据
- 在深层使用 Key 向量 L2 norm 作为与 FlashAttention 兼容的 token saliency
- 同时降低推理延迟和 GPU 显存，极端剪枝率下优于单纯视觉或单纯文本剪枝

#### 🔬 深入细节

![ViTCoP 框架图](https://arxiv.org/html/2601.17818v1/x7.png)
*图：ViTCoP 的三阶段流程：视觉编码器粗剪、浅层视觉文本协同剪枝、深层文本显著性激进剪枝。*

```python
# ViTCoP 多阶段视觉 token 剪枝伪代码
visual_tokens = vision_encoder(image)
visual_tokens = coarse_prune_by_cls_attention(visual_tokens, keep_ratio_stage1)

for layer_id, layer in enumerate(llm.layers):
    if layer_id in shallow_layers:
        saliency = key_norm(layer, visual_tokens)
        clusters = VIC_cluster(visual_tokens)
        visual_tokens = co_prune_and_merge(visual_tokens, saliency, clusters)
    elif layer_id in deep_layers:
        saliency = key_norm(layer, visual_tokens, text_tokens)
        visual_tokens = keep_topk(visual_tokens, saliency, keep_ratio_stage3)
    text_tokens, visual_tokens = layer(text_tokens, visual_tokens)
```

LVLM 的视觉编码器会为高分辨率图片或长视频产生大量视觉 token，而 Transformer 复杂度随序列长度平方增长。已有方法若在 vision encoder 过早剪枝，可能删除后续回答需要的细节；若只在 LLM 内部晚剪，虽然能利用文本信息，但前面层已经为大量冗余 token 付出了计算成本。

ViTCoP 的设计是分阶段逐步收缩视觉 token。第一阶段在视觉编码器中做粗剪，利用 `[CLS]` attention 找到明显重要的视觉区域，快速去掉大批低贡献 token。该阶段重在减少后续输入规模，因此剪枝不能过于激进。

第二阶段发生在 LLM 浅层。此时文本和视觉已经开始交互，但语义尚未完全聚焦，ViTCoP 同时考虑视觉 token 的多样性与重要性：VIC clustering 避免所有保留 token 集中在同一物体或区域，K-norm merging 则用 Key 向量范数衡量 token 在注意力中的潜在影响，并把被删 token 的信息合并到代表 token。

深层阶段的 LLM 已更明确地围绕问题形成语义焦点，因此 ViTCoP 转向更激进的文本相关剪枝。Key 向量 L2 norm 被用作 saliency：

$$
s_i=\|\mathbf{k}_i\|_2
$$

相比直接读取 attention score，该指标实现轻量，并且更容易与 FlashAttention 等高效 attention kernel 兼容。

> 💡 关键：ViTCoP 不是单一阈值 token pruning，而是随着层深改变剪枝准则：早期保多样性，中期协同视觉文本，后期保与问题最相关的证据。

与 SparseVLM、VisionZip 等方法相比，ViTCoP 更强调层级特征：浅层视觉信息仍分散，深层才适合强文本引导。这样能在极端剪枝率下减少“看错区域”或“保留重复区域”的风险，尤其适合图像问答和视频理解等需要定位细节的任务。

#### 🧪 练习题

```yaml
question: "ViTCoP 为什么要分浅层和深层采用不同剪枝策略？"
options:
  - "因为浅层只处理文本，深层只处理图像"
  - "因为 LVLM 的文本语义聚焦随层深增强，浅层应保留多样视觉证据，深层可按文本相关性激进剪枝"
  - "因为 FlashAttention 只能用于第一层"
  - "因为视觉编码器不能输出 token"
answer: 1
explain: "ViTCoP 利用 LVLM 层级语义变化，先避免过早丢失视觉信息，再在深层保留最相关 token。"
```
