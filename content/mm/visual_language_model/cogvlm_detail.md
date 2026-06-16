### CogVLM — Visual Expert for Pretrained Language Models

```yaml
id: cogvlm
name: CogVLM
year: '2023'
category: connector
institution: 智谱AI
paper: arXiv
motivation: 视觉专家模块深度融合
parent: llava
description: 17B参数，在LLM每一层引入独立的视觉QKV矩阵和MLP层，实现视觉优先的深度融合。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/cogvlm_detail.md
```

#### 📝 一句话总结

CogVLM 提出在冻结语言模型的每一层加入可训练 visual expert，为图像 token 单独配置 QKV 矩阵和 FFN/MLP，从而解决浅层投影方法只在输入端对齐、跨模态融合深度不足的问题。

#### 🎯 核心要点

- 深层融合架构：由 EVA2-CLIP-E ViT、两层 SwiGLU MLP adapter、Vicuna-1.5-7B、逐层 visual expert 组成。
- 视觉专家模块：每个 LLM block 中，图像 token 使用独立可训练的 QKV 矩阵与 FFN，文本 token 继续使用原始冻结 LLM 参数。
- 不牺牲文本能力：无图输入时只走冻结语言模型原路径，因此保留 Vicuna 的纯文本行为；有图输入时图像 token 通过 visual expert 对齐到各层语义空间。
- 训练数据与流程：先用约 1.5B 公开图文对做 caption 预训练，再混合 image captioning 与 referring expression comprehension，引入约 40M grounding 数据。
- 消融结论明确：只训练 adapter 的浅层对齐明显弱于每层 visual expert；从 LLM 权重初始化 visual expert 优于随机初始化。

#### 🔬 深入细节

##### 框架图

![CogVLM visual expert 架构](https://ar5iv.labs.arxiv.org/html/2311.03079/assets/figures/cogvlm.png)
*图：CogVLM 先用 ViT 与 MLP adapter 生成图像 token，再在 LLM 每层为图像 token 走独立的视觉 QKV 与 FFN 分支，实现深层视觉-语言融合。*

##### 训练流程伪代码

```python
# CogVLM visual expert 简化流程
vit = EVA2_CLIP_E(remove_last_layer=True)
adapter = SwiGLUMLP(vit_dim, llm_hidden_dim)
llm = FrozenVicuna15_7B()
visual_experts = init_from_llm_weights(llm.layers)  # per-layer visual QKV + FFN

def cogvlm_block(block, x_img, x_txt):
    # 图像 token 使用 visual expert，文本 token 使用冻结 LLM 原参数
    q_i, k_i, v_i = block.visual_qkv(x_img)
    q_t, k_t, v_t = block.text_qkv_frozen(x_txt)

    q = concat(q_i, q_t)
    k = concat(k_i, k_t)
    v = concat(v_i, v_t)
    y = causal_attention(q, k, v)
    y_img, y_txt = split_image_text(y)

    x_img = x_img + block.visual_ffn(y_img)       # trainable expert FFN
    x_txt = x_txt + block.text_ffn_frozen(y_txt)  # frozen language FFN
    return x_img, x_txt

for image, prompt, answer in multimodal_batches:
    x_img = adapter(vit(image))
    x_txt = llm.word_embedding(prompt)
    for block in llm.layers:
        x_img, x_txt = cogvlm_block(block, x_img, x_txt)
    logits = llm.output_head(concat(x_img, x_txt))
    loss = next_token_loss(logits, answer_positions=answer)
    update([vit, adapter, visual_experts], loss)
```

##### 关键公式

设某层输入 hidden states 拆成图像 token \(X_I\) 与文本 token \(X_T\)。CogVLM 为两类 token 使用不同参数生成注意力的 Q/K/V：

$$
Q = [X_I W_I^Q;\; X_T W_T^Q],\quad
K = [X_I W_I^K;\; X_T W_T^K],\quad
V = [X_I W_I^V;\; X_T W_T^V]
$$

其中 \(W_I^\*\) 是 visual expert 的可训练参数，\(W_T^\*\) 是冻结语言模型参数。注意力仍在拼接序列上计算：

$$
\operatorname{Attn}(X)
= \operatorname{softmax}
\left(
\frac{QK^\top}{\sqrt{d}} + M_{\text{causal}}
\right)V
$$

FFN 也按模态分支处理：

$$
Y_I = \operatorname{FFN}_I(H_I),\qquad
Y_T = \operatorname{FFN}_T(H_T)
$$

总体生成目标仍是答案部分的 next-token prediction：

$$
\mathcal{L}
= - \sum_{t \in \mathcal{A}}
\log p_\theta(x_t \mid X_I, X_{T,<t})
$$

##### 方法解读

CogVLM 的出发点是反思“浅层对齐”。LLaVA、BLIP-2 一类方法通常先把视觉特征映射成 LLM 输入 token，再依赖原语言模型层去融合图文信息。这类似只学习一个前缀或输入投影：视觉信息进入了序列，但每一层的注意力头和 FFN 仍主要是在语言预训练分布上形成的。CogVLM 认为，视觉 token 需要在每个 Transformer block 中拥有自己的可训练变换，才能对齐到不同层、不同 attention head 所表达的语义空间。

visual expert 的设计非常直接：文本 token 不动，继续使用冻结 Vicuna 的 QKV 与 FFN；图像 token 走一套同形状的 QKV 与 FFN 参数，这些参数从 LLM 原权重初始化后再训练。注意力计算仍发生在图像和文本拼接后的同一个序列中，所以图像 token 可以参与跨模态交互；但图像 token 的投影和非线性变换由视觉专家负责，避免把视觉分布硬塞进语言参数。

这种结构的工程优势是“深融合但不破坏文本模型”。当输入没有图像时，路径退化为冻结的原始语言模型，纯文本能力不被多模态训练改写；当输入包含图像时，额外参数只服务图像 token，给模型足够容量学习视觉特征在每层的表示转换。论文也指出 visual expert 会增加参数量，但由于序列计算路径基本不变，推理 FLOPs 不会按参数量同比例增加。

位置编码处理也体现了对 LLM 结构的适配。CogVLM 让所有视觉 token 在 RoPE 中共享同一个 position id，因为图像 token 已经从 ViT 中带有空间信息。如果把数百到上千个视觉 token 当作普通文本 token 逐个递增位置，后面的文本 query 会被推到很远的位置，还可能更偏向图像序列末端；共享视觉 position id 能缓解这种由长视觉前缀引入的位置衰减。

训练流程分为大规模图文预训练与 grounding 强化。第一阶段用 LAION-2B、COYO-700M 等公开数据清洗后的约 1.5B 图文对做 captioning next-token prediction；第二阶段混合图像描述和 referring expression comprehension，并构建约 40M 带框 grounding 数据，把目标定位写成 VQA 风格的文本输出。这个训练设置让 CogVLM 不只是会聊天，也在 RefCOCO 系列与 OCR/VQA 类任务上获得强视觉定位和细粒度理解能力。

> 💡 关键：CogVLM 把“连接器”从输入端推进到 LLM 的每一层。视觉专家不是单独的检测器，而是让视觉 token 在语言模型内部拥有逐层可训练的注意力和 FFN 变换。

#### 🧪 练习题

```yaml
question: "CogVLM 的 visual expert 相比只训练 MLP adapter 的核心优势是什么？"
options:
  - "它把图像压缩成更少的 token，但完全不参与 LLM 内部计算"
  - "它在每个 LLM 层为图像 token 提供独立 QKV 与 FFN，实现深层跨模态对齐"
  - "它用检测器替代自回归语言模型"
  - "它要求文本 token 也全部随机初始化"
answer: 1
explain: "CogVLM 的视觉专家分布在每个 Transformer block 中，图像 token 用可训练 QKV 和 FFN 对齐各层语义空间，而文本 token 保留冻结 LLM 参数。"
```
