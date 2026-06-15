### LLaVA — 大型语言视觉助手 (Large Language and Vision Assistant)

```yaml
id: llava
name: LLaVA
full_name: "大型语言视觉助手 (Large Language and Vision Assistant)"
year: "2023.04"
org: "UW-Madison"
paper_url: "https://arxiv.org/abs/2304.08485"
category: mm_cot
parent: "blip2"
motivation: "视觉指令微调，线性投影实现强大通用推理"
```

#### 📝 一句话总结

LLaVA 首次系统地把 GPT-4 生成的视觉指令数据用于训练开源多模态助手，用 CLIP 视觉编码器、线性投影和 Vicuna 语言模型构成简单端到端架构，解决了早期 VLM 缺少指令跟随与通用视觉对话能力的问题。

#### 🎯 核心要点

- GPT-assisted 数据生成：用 COCO caption 与 bounding box 的文本化信息提示 GPT-4 生成视觉指令样本
- LLaVA-Instruct-158K：包含 conversation、detailed description、complex reasoning 三类指令数据
- 简洁模型结构：CLIP ViT-L/14 视觉编码器 + 线性投影矩阵 + Vicuna LLM
- 两阶段训练：先在 CC-595K 上做视觉-语言特征对齐，再在 158K 指令数据上微调
- 视觉编码器冻结：主要训练投影层和语言模型，降低视觉侧训练成本
- 统一自回归目标：只对 assistant 回答 token 计算语言建模损失
- ScienceQA 上结合 GPT-4 达到强视觉推理表现，推动后续开源多模态助手路线

#### 🔬 深入细节

##### 核心架构示意图

![LLaVA 网络架构](https://ar5iv.labs.arxiv.org/html/2304.08485/assets/x1.png)
*图：LLaVA 用投影矩阵 \(W\) 将 CLIP 视觉特征映射到 Vicuna 词嵌入空间，再与语言指令一起输入 LLM。*

##### 算法伪代码

```python
# 数据生成
for coco_image in coco:
    symbolic_context = captions(coco_image) + bounding_boxes(coco_image)
    instructions = gpt4_generate(symbolic_context,
                                 types=["conversation", "detail", "reasoning"])
    save(image=coco_image, conversations=instructions)

# Stage 1: feature alignment
for image, caption in cc595k:
    z_v = frozen_clip_vit(image)
    h_v = projection_W(z_v)
    prompt = "<image>\nDescribe the image briefly."
    loss = lm_loss(frozen_vicuna, prefix=h_v, prompt=prompt, target=caption)
    optimize(W)

# Stage 2: visual instruction tuning
for image, dialogue in llava_instruct_158k:
    z_v = frozen_clip_vit(image)
    h_v = projection_W(z_v)
    loss = autoregressive_loss(vicuna, visual_tokens=h_v,
                               dialogue=dialogue,
                               mask_only_assistant_tokens=True)
    optimize(W, vicuna)
```

##### 动机与背景

指令微调让语言模型从“补全文本”变成“遵循用户任务”的助手，但多模态领域当时缺少大规模高质量视觉指令数据。已有 VLM 可以 caption 或 VQA，却不擅长多轮对话、开放式解释和复杂视觉推理。LLaVA 的核心贡献是把语言模型指令微调的思路迁移到图像-语言空间。

由于 GPT-4 当时是文本输入，LLaVA 不能直接把图像交给 GPT-4 生成标注，于是把 COCO 图像的 caption 和 bounding boxes 转成符号化文本上下文。这些文本描述物体、位置和场景，再由 GPT-4 生成三类回答：多轮对话、详细描述和复杂推理。这样用少量已有视觉标注撬动了更丰富的指令数据。

##### 模型结构：线性视觉 tokenizer

LLaVA 选择非常简单的连接器。给定图像 \(X_v\)，CLIP ViT-L/14 输出视觉特征 \(Z_v\)，投影矩阵 \(W\) 将其映射到 LLM 词嵌入维度：

$$
H_v = W Z_v
$$

得到的 \(H_v\) 被当作一串视觉 token，与用户语言指令 token 拼接后输入 Vicuna。与 BLIP-2 的 Q-Former 或 Flamingo 的多层 gated cross-attention 相比，LLaVA 的连接器表达力更弱，但训练和复现成本低，便于快速验证“数据与指令微调是否足够重要”。

##### 两阶段训练流程

第一阶段是 feature alignment。模型在过滤后的 CC3M 子集 CC-595K 上训练，视觉编码器和 Vicuna 都冻结，只训练 \(W\)。输入通常是让模型简要描述图像的单轮指令，目标是原始 caption。这个阶段把视觉特征对齐到语言模型 embedding 空间，相当于训练一个兼容 Vicuna 的视觉 tokenizer。

第二阶段是 visual instruction tuning。视觉编码器继续冻结，投影层和 Vicuna 一起训练。多轮对话被组织成 Vicuna 风格的 prompt，损失只作用于 assistant 的回答部分：

$$
\mathcal{L}=-\sum_{t \in \text{assistant}} \log p_\theta(y_t \mid y_{<t}, H_v, X_q)
$$

这样模型不会被要求预测用户问题本身，而是学习在图像条件下给出符合指令的回答。

> 💡 关键：LLaVA 的性能提升很大程度来自视觉指令数据，而不只是架构。它证明了简单投影连接器配合高质量 instruction tuning 就能产生强多模态助手。

##### 数据类型与推理能力

LLaVA-Instruct-158K 包含约 58K conversation、23K detailed description 和 77K complex reasoning。前两类提高视觉对话和描述能力，complex reasoning 让模型练习基于场景信息进行因果、空间、常识推断。

在 ScienceQA 中，LLaVA 把题目、选项、图像和推理要求组织成单轮问答，训练模型输出 reasoning 和 answer。论文还展示了 LLaVA 与 GPT-4 协同后在 ScienceQA 上达到当时很强的准确率，说明视觉模型生成的中间推理可以与更强语言模型互补。

##### 与 BLIP-2、Flamingo 的区别

BLIP-2 重点是用 Q-Former 高效桥接冻结视觉编码器和冻结 LLM；Flamingo 重点是大规模交错图文预训练和少样本上下文学习。LLaVA 的重点则是 instruction tuning：它并不追求最复杂的桥接结构，而是用简单结构证明“面向用户指令的视觉对话数据”可以显著改变模型行为。

#### 🧪 练习题

```yaml
question: "LLaVA 第一阶段 feature alignment 的主要训练对象是什么？"
options:
  - "CLIP 视觉编码器的全部参数"
  - "Vicuna 的全部参数"
  - "连接视觉特征和语言嵌入空间的投影矩阵"
  - "GPT-4 数据生成器"
answer: 2
explain: "第一阶段冻结视觉编码器和 LLM，只训练线性投影矩阵，使 CLIP 视觉特征能作为 Vicuna 可读的视觉 token。"
```
