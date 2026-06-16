### LLaVA — Visual Instruction Tuning

```yaml
id: llava
name: LLaVA
year: '2023'
category: connector
institution: UW-Microsoft
paper: NeurIPS 2023 Oral
motivation: 视觉指令微调开创者
parent: clip
description: 首次将指令微调引入多模态，通过GPT-4生成15万条对话数据，开启开源多模态对话模型浪潮。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/llava_detail.md
```

#### 📝 一句话总结

LLaVA 提出 Visual Instruction Tuning：用 GPT-4 将图像 caption、检测框等符号信息改写成 158K 多模态指令数据，并用一个轻量投影层把 CLIP 视觉特征接入 Vicuna，解决了开源模型缺少视觉对话指令监督的问题。

#### 🎯 核心要点

- 架构极简：冻结 CLIP ViT-L/14 视觉编码器，用线性投影 \(W\) 将视觉 patch 特征映射到 Vicuna 的词嵌入空间。
- 数据创新：用 caption 与 bounding box 作为图像的文本化代理，让语言模型 GPT-4 生成 conversation、detailed description、complex reasoning 三类视觉指令数据。
- 两阶段训练：先在 595K 过滤后的 CC3M 图文对上只训练投影层做特征对齐，再在 158K LLaVA-Instruct 数据上微调投影层与 LLM。
- 统一自回归目标：把图像 token、用户问题、历史对话拼成同一序列，只对 assistant answer token 计算 next-token loss。
- 影响力关键：它证明“高质量指令数据 + 简单 connector”足以产生强视觉对话能力，成为后续 MiniGPT-4、LLaVA-1.5、LLaVA-NeXT 等开源 VLM 的直接起点。

#### 🔬 深入细节

##### 框架图

![LLaVA 网络架构](https://ar5iv.labs.arxiv.org/html/2304.08485/assets/x1.png)
*图：LLaVA 用 CLIP 视觉编码器抽取图像特征，经投影矩阵 \(W\) 转成视觉 token，再与语言指令一起送入 Vicuna 生成回答。*

##### 训练流程伪代码

```python
# LLaVA Visual Instruction Tuning 简化流程
vision_encoder = FrozenCLIPViTL14()
llm = Vicuna()
projector = Linear(clip_dim, llm_hidden_dim)

# Stage 1: feature alignment，只训练 projector
freeze(vision_encoder)
freeze(llm)
for image, caption in cc3m_595k:
    z_v = vision_encoder(image)          # patch-level visual features
    h_v = projector(z_v)                 # visual tokens in LLM space
    prompt = "<image>\nDescribe the image briefly."
    target = caption
    loss = next_token_loss(llm([h_v, prompt]), target)
    update(projector, loss)

# Stage 2: visual instruction tuning，冻结视觉编码器，训练 projector + LLM
unfreeze(projector)
unfreeze(llm)
freeze(vision_encoder)
for image, dialog in llava_instruct_158k:
    z_v = vision_encoder(image)
    h_v = projector(z_v)
    sequence, answer_mask = format_multiturn_dialog(h_v, dialog)
    logits = llm(sequence)
    loss = cross_entropy(logits[answer_mask], sequence.next_tokens[answer_mask])
    update([projector, llm], loss)
```

##### 关键公式

CLIP 输出的视觉特征记为 \(Z_v\)，线性连接器把它投影到语言模型的 hidden size：

$$
H_v = W Z_v
$$

对多轮样本，模型仍使用标准自回归语言建模目标，只是条件中加入视觉 token、当前问题与历史回答：

$$
p_\theta(X_a \mid X_v, X_q)
= \prod_{i=1}^{L} p_\theta(x_i \mid X_v, X_q, X_{a,<i})
$$

训练损失只作用在 assistant 的答案 token 上：

$$
\mathcal{L}
= - \sum_{i \in \mathcal{A}} \log p_\theta(x_i \mid X_v, X_{<i})
$$

##### 方法解读

LLaVA 的核心问题不是“如何设计更复杂的跨模态注意力”，而是“如何让一个已经会遵循文本指令的 LLM 学会在视觉条件下遵循指令”。此前 BLIP-2、Flamingo 等模型已经能把图像输入语言模型，但训练目标主要来自 caption、VQA 或 few-shot transfer，缺少面向开放对话的 instruction-following 信号。LLaVA 把 NLP 中 instruction tuning 的思想搬到图像-语言场景，直接优化“用户看图提问，助手按指令回答”的交互格式。

数据生成是论文最重要的工程创新。GPT-4 当时不能直接读取图像，所以作者没有把图片喂给 GPT-4，而是把 COCO 图像的 caption 与检测框转换成文本上下文，让 GPT-4 生成三类响应：面向多轮问答的 conversation、面向密集描述的 detailed description、面向常识和空间推理的 complex reasoning。这个设计把昂贵的人类标注替换成“已有视觉标注 + 强语言模型重写”，使 158K 样本虽然规模不大，却高度贴近聊天助手的输出分布。

模型连接器故意保持简单：CLIP ViT-L/14 产生 patch grid 特征，线性层 \(W\) 把每个视觉向量投到 Vicuna 的词嵌入维度，作为一串 pseudo tokens 放在文本指令前。这样做的好处是训练稳定、复现实验成本低、能够快速验证数据质量的价值；代价是视觉和语言只在 LLM 内部通过自注意力融合，连接器本身没有显式的定位、压缩或跨注意力推理能力。

两阶段训练对应两个不同的对齐目标。第一阶段只训练投影层，等价于为冻结 LLM 学一个“视觉 tokenizer”，让视觉 token 的分布落到 Vicuna 能理解的嵌入空间；第二阶段在视觉指令数据上更新 projector 和 LLM，使模型学会把图像内容、用户指令和对话历史共同作为条件。视觉编码器始终冻结，这降低了训练成本，也保留了 CLIP 的开放词汇视觉表征。

与传统 VLP 方法相比，LLaVA 的突破点在交互范式而不是底层视觉能力。它不引入检测头、不设计复杂任务专用输出，而是把所有任务都变成自然语言生成。因此，模型可以用同一套接口回答描述、计数、解释异常现象、做简单视觉推理；但它对 OCR、精确 grounding、高分辨率细节的支持较弱，这些短板后来推动了 LLaVA-NeXT、Qwen-VL、CogVLM 等后续工作在分辨率、位置编码和深层融合上继续改进。

> 💡 关键：LLaVA 的经验是，开源多模态模型的瓶颈不只在模型结构，也在“回答应该长什么样”的监督分布。GPT-4 生成的视觉指令数据给 LLM 提供了对话式视觉行为的模板。

#### 🧪 练习题

```yaml
question: "LLaVA 第一阶段只训练线性投影层的主要目的是什么？"
options:
  - "让 CLIP 视觉特征对齐到 Vicuna 可消费的词嵌入空间"
  - "提升 CLIP 在 ImageNet 上的分类准确率"
  - "让 GPT-4 直接读取原始图像像素"
  - "训练一个独立的目标检测器输出 bounding box"
answer: 0
explain: "第一阶段冻结视觉编码器和 LLM，只更新投影矩阵 W，相当于学习一个把 CLIP patch 特征转成 LLM 视觉 token 的轻量视觉 tokenizer。"
```
