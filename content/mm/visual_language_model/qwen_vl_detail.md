### Qwen-VL — 位置感知 VL Adapter 的通用视觉语言模型

```yaml
id: qwen_vl
name: Qwen-VL
year: '2023.08'
category: connector
institution: 阿里巴巴
paper: arXiv
motivation: 位置感知跨注意力适配器
parent: llava
description: 单层Cross-attention适配器支持细粒度定位和强OCR能力，首个原生支持中文的开源多模态大模型。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/qwen_vl_detail.md
```

#### 📝 一句话总结

Qwen-VL 在 OpenCLIP ViT-bigG 与 Qwen-7B 之间加入位置感知的单层 cross-attention adapter，用 256 个可学习查询压缩视觉序列并保留 2D 空间信息，解决了通用 VLM 在中文、多图、OCR 与 grounding 上能力不足的问题。

#### 🎯 核心要点

- 三组件架构：OpenCLIP ViT-bigG 视觉编码器、0.08B 参数的 position-aware VL adapter、Qwen-7B 语言模型，总规模约 9.6B。
- 位置感知适配器：单层交叉注意力用 256 个 learnable query 聚合可变长图像 patch，并在 query-key 中注入 2D absolute position encoding。
- 统一 I/O 表示：用 `<img>...</img>` 包裹视觉 token，用 `<box>...</box>` 与 `<ref>...</ref>` 将定位、引用表达和 grounded caption 统一为文本生成。
- 三阶段训练：1.4B 清洗图文对做低分辨率预训练，随后 448 分辨率多任务预训练，最后用指令数据训练 Qwen-VL-Chat。
- 原生中英与多图能力：训练语料包含英文、中文与交错图文格式，使模型可处理中文问答、多图比较和文档/OCR 场景。

#### 🔬 深入细节

##### 框架图

![Qwen-VL 三阶段训练流程](https://ar5iv.labs.arxiv.org/html/2308.12966/assets/x2.png)
*图：Qwen-VL 的三阶段训练。第一阶段冻结 QwenLM 做视觉-语言对齐，第二阶段全模型多任务高分辨率训练，第三阶段冻结 ViT 做指令微调。*

##### 训练与推理流程伪代码

```python
# Qwen-VL position-aware adapter 简化流程
vit = OpenCLIP_ViT_bigG()
adapter = PositionAwareCrossAttention(num_queries=256)
llm = Qwen7B()

def encode_image(image):
    patches = vit(resize(image))                 # [num_patches, d_v]
    q = learnable_queries(256) + pos2d_queries()
    k = linear_k(patches) + pos2d_patches(patches)
    v = linear_v(patches)
    visual_tokens = softmax(q @ k.T / sqrt(d)) @ v
    return visual_tokens                         # fixed 256 tokens

for sample in training_data:
    image_tokens = [encode_image(img) for img in sample.images]
    prompt = interleave(sample.text, image_tokens, tags=["<img>", "</img>"])
    target = sample.answer                       # caption, VQA answer, OCR text, boxes, dialog
    logits = llm(prompt)
    loss = cross_entropy(logits[target_positions], target)
    update_trainable_modules(loss)

# grounding 输出也作为普通文本生成
# <ref>the red bus</ref><box>(125,230),(640,812)</box>
```

##### 关键公式

位置感知 VL adapter 的核心是 cross-attention 压缩。设 ViT patch 特征为 \(V \in \mathbb{R}^{N \times d}\)，256 个可学习查询为 \(Q \in \mathbb{R}^{256 \times d}\)，2D 位置编码为 \(P_q, P_k\)：

$$
Y = \operatorname{softmax}
\left(
\frac{(Q + P_q)(VW_k + P_k)^\top}{\sqrt{d}}
\right) VW_v
$$

其中 \(Y \in \mathbb{R}^{256 \times d}\) 是送入 Qwen-7B 的固定长度视觉 token。对 grounding，边界框坐标被归一化到 \([0,1000)\) 的离散整数空间：

$$
b = \left(
\left\lfloor 1000 \frac{x_1}{W} \right\rfloor,
\left\lfloor 1000 \frac{y_1}{H} \right\rfloor,
\left\lfloor 1000 \frac{x_2}{W} \right\rfloor,
\left\lfloor 1000 \frac{y_2}{H} \right\rfloor
\right)
$$

最终仍然用自回归语言建模目标训练：

$$
\mathcal{L}_{\text{LM}}
= - \sum_{t \in \mathcal{T}_{\text{answer}}}
\log p_\theta(x_t \mid x_{<t}, Y)
$$

##### 方法解读

Qwen-VL 针对 LLaVA 式线性投影的两个短板做了改造：一是高分辨率图像会产生很长的 patch 序列，直接塞给 LLM 成本高；二是线性投影缺少显式空间建模，模型在 grounding、OCR、文档问答等细粒度任务上容易丢失位置。Qwen-VL 的 position-aware adapter 用 256 个查询把任意图像压缩成固定长度 token，同时在 cross-attention 的 query-key 交互中加入 2D 绝对位置编码，让压缩后的 token 仍携带空间布局。

这个 adapter 介于 LLaVA 的线性投影和 BLIP-2 的多层 Q-Former 之间。它比线性投影多了内容选择能力：query 可以主动从 patch 中聚合与语言任务相关的信息；又比 Q-Former 更轻，只用单层 cross-attention 控制参数和计算。256 个 token 的选择也服务于细粒度任务：相比 32 个查询，它保留更多局部信息；相比直接保留 1024 个高分辨率 patch，它显著降低 LLM 的上下文压力。

输入输出接口是 Qwen-VL 的第二个关键。图像被 `<img>...</img>` 标记包裹后与文本交错输入，因此模型天然支持多图对比和图文混排。定位任务不额外接检测头，而是把框坐标作为普通 token 输出：`<ref>` 表示被引用短语，`<box>` 表示其边界框。这样 caption、VQA、OCR、grounding、grounded caption 都能共享同一个 decoder 和同一个 next-token objective。

三阶段训练使模型逐步获得能力。第一阶段在从约 5B 原始图文对清洗出的 1.4B 图文对上训练，冻结 QwenLM，只优化 ViT 与 adapter，目标是让视觉表示对齐语言模型；第二阶段把输入分辨率从 224 提升到 448，解冻全模型，在 caption、VQA、OCR、grounding、grounded caption、纯文本等任务上联合训练；第三阶段冻结 ViT，用多模态指令数据训练对话格式，得到 Qwen-VL-Chat。

与 LLaVA 相比，Qwen-VL 的创新点不是更强的聊天模板，而是把位置、OCR、中文和多图交互放进基础训练闭环。它的 box-as-text 方案让 grounding 与生成统一，但也带来坐标离散化和格式依赖问题：模型必须稳定生成合法标签与坐标，且精确检测能力受视觉分辨率、adapter 压缩率和训练框质量共同限制。

> 💡 关键：Qwen-VL 的 2D position-aware adapter 是“压缩但不忘位置”的折中设计，正好服务于 OCR、文档理解和 refer expression grounding 这类需要细粒度空间信息的任务。

#### 🧪 练习题

```yaml
question: "Qwen-VL 在 VL adapter 中加入 2D 绝对位置编码的主要原因是什么？"
options:
  - "减少 Qwen-7B 的词表大小"
  - "让压缩后的视觉 token 保留 patch 的空间位置信息"
  - "替代自回归语言建模目标"
  - "让模型只能处理单张图片"
answer: 1
explain: "adapter 会把高分辨率 patch 压缩成固定 256 个视觉 token，2D 位置编码帮助 cross-attention 在压缩过程中保留行列位置，对 OCR 与 grounding 尤其关键。"
```
