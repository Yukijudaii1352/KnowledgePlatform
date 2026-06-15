### Flamingo — 少样本视觉语言模型 (Flamingo: Few-Shot VLM)

```yaml
id: flamingo
name: Flamingo
full_name: "少样本视觉语言模型 (Flamingo: Few-Shot VLM)"
year: "2022"
org: "DeepMind"
paper_url: "https://arxiv.org/abs/2204.14198"
category: foundation
parent: "clip"
motivation: "Perceiver+门控交叉注意力，少样本推理突破"
```

#### 📝 一句话总结

Flamingo 在冻结视觉编码器和冻结语言模型之间加入 Perceiver Resampler 与门控交叉注意力层，使模型能读取任意交错的图像/视频与文本提示，解决了 CLIP 类模型只能匹配、不能开放式生成和少样本适配的问题。

#### 🎯 核心要点

- 冻结视觉模型：使用预训练 NFNet 从图像或视频中提取高分辨率视觉特征
- Perceiver Resampler：把可变数量的空间/时间视觉特征压缩为固定数量视觉 token
- 冻结 Chinchilla 语言模型：保留大语言模型的文本生成和少样本学习能力
- Gated XAttn-Dense 层：在语言模型层之间插入可训练交叉注意力和前馈层，并用零初始化门控保持训练稳定
- 支持交错多模态上下文：输入可以是 `<image> text <image> text ...` 的任意序列
- 图像因果注意力：每个文本位置只直接 cross-attend 到最近相关视觉输入，历史视觉依赖通过 LM 自注意力传递
- 训练数据混合：M3W 网页交错图文、ALIGN/LTIP 图文对和 VTP 视频文本对共同训练

#### 🔬 深入细节

##### 核心架构示意图

![Flamingo 架构总览](https://ar5iv.labs.arxiv.org/html/2204.14198/assets/x38.png)
*图：Flamingo 用 Perceiver Resampler 将视觉特征变成少量视觉 token，再通过门控交叉注意力注入冻结语言模型。*

##### 算法伪代码

```python
# Flamingo 视觉条件语言建模
for sequence in multimodal_web_corpus:
    text_tokens, visual_inputs = parse_interleaved_sequence(sequence)

    visual_tokens_by_input = []
    for image_or_video in visual_inputs:
        feats = frozen_nfnet(image_or_video)             # spatial / temporal grid
        tokens = perceiver_resampler(feats, n_latents=64)
        visual_tokens_by_input.append(tokens)

    h = token_embedding(text_tokens)
    for lm_block, gated_xattn_dense in flamingo_layers:
        relevant_visual = image_causal_select(visual_tokens_by_input, h.position)
        h = h + tanh(alpha_xattn) * cross_attention(h, relevant_visual)
        h = h + tanh(alpha_ffw) * feed_forward(h)
        h = frozen_lm_block(h)

    loss = next_token_lm_loss(h, text_tokens)
    optimize(trainable_perceiver_and_gated_layers_only(loss))
```

##### 动机与背景

CLIP 证明了自然语言监督能训练强大的开放词表视觉表征，但它的输出是相似度分数，天然适合分类和检索，不适合开放式 VQA、captioning、多轮对话或少样本视觉推理。另一方面，大语言模型已经具备 in-context learning 能力，但只能读取文本。Flamingo 的问题设定就是：如何在尽量不破坏预训练能力的前提下，让大语言模型接收视觉上下文。

Flamingo 采用“冻结强模型 + 训练桥接层”的策略。视觉编码器负责感知，语言模型负责生成和推理，中间模块只学习如何把视觉信息压缩并送入语言模型。这样既减少训练成本，也避免大规模端到端训练导致的灾难性遗忘。

##### Perceiver Resampler：固定长度视觉接口

图像和视频会产生大量 patch 或时空网格特征，直接让语言模型对所有视觉特征 cross-attend 代价很高。Perceiver Resampler 引入一组可学习 latent query，对视觉特征做交叉注意力，输出固定数量的视觉 token：

$$
Z=\mathrm{Transformer}\left(Q_{\text{latent}}, K=V_{\text{vision}}, V=V_{\text{vision}}\right)
$$

无论输入是一张图还是多帧视频，输出都被压缩为固定大小，例如 64 个视觉 token。直觉上，这些 latent query 像一组可学习的“视觉摘要槽”，从高维视觉网格中抽取对语言生成最有用的信息。

##### 门控交叉注意力注入语言模型

Flamingo 不把视觉 token 拼进词序列，而是在冻结 LM 层之间插入新训练的 Gated XAttn-Dense block。该 block 先以语言隐藏状态为 query、视觉 token 为 key/value 做 cross-attention，再经过前馈层：

$$
h' = h + \tanh(\alpha_{\text{xattn}})\cdot \mathrm{CrossAttn}(h, Z)
$$

$$
h'' = h' + \tanh(\alpha_{\text{ffw}})\cdot \mathrm{FFW}(h')
$$

门控参数 \(\alpha\) 初始化为 0，因此训练刚开始时模型几乎等价于原始语言模型。随着训练推进，模型逐步学会在需要时读取视觉 token。

> 💡 关键：零初始化门控不是装饰性技巧，而是让一个已训练好的大语言模型在新增视觉通道后仍保持稳定生成的核心设计。

##### 交错输入与训练目标

Flamingo 的输入是图像/视频和文本交错的序列，例如少样本 VQA 可以写成“图1 + 问答示例1 + 图2 + 问答示例2 + 测试图 + 问题”。训练目标仍然是自回归语言建模：

$$
\mathcal{L}=-\sum_t \log p(y_t \mid y_{<t}, x_{\le t}^{\text{visual}})
$$

其中文本 token 只能利用当前位置之前的视觉输入。论文还设计了 per-image/video attention masking：一个文本位置直接 cross-attend 到最近对应的视觉输入，而更早图像的信息通过语言模型自注意力保留。这使模型训练时只见过有限图像数，也能在评估时扩展到更多 shots。

##### 数据混合与少样本适配

Flamingo 使用三类网页数据：M3W 从约 4300 万网页中恢复图文在 DOM 中的交错位置；ALIGN 与 LTIP 提供大规模图文对；VTP 提供视频文本对。不同数据集的负对数似然加权求和，权重需要调节，因为网页交错数据对 few-shot 能力尤其重要，而图文/视频对提供更密集的视觉描述监督。

推理时 Flamingo 不需要梯度更新，只要把少量示例放进 prompt，就可以做 captioning、open-ended VQA、multiple-choice VQA、视频问答等任务。这是它和“每个任务单独微调”的传统视觉语言系统之间最关键的差异。

##### 与前序方法的区别

与 CLIP 相比，Flamingo 是生成式模型，能输出自由文本而不仅是相似度。与 ViLBERT/BLIP 这类中等规模 VLP 模型相比，Flamingo 直接借用大语言模型的 in-context learning 能力，并通过少量可训练模块把视觉接入进去。与后来的 BLIP-2 相比，Flamingo 的桥接方式更深：它把交叉注意力插入 LM 多层，而 BLIP-2 主要通过 Q-Former 输出软视觉前缀。

#### 🧪 练习题

```yaml
question: "Flamingo 中 Gated XAttn-Dense 层的零初始化门控主要解决什么问题？"
options:
  - "让视觉编码器完全不参与训练"
  - "使新增视觉交叉注意力在训练初期不破坏冻结语言模型的原有行为"
  - "把图像 token 数量固定为 1 个"
  - "强制模型只做图文检索"
answer: 1
explain: "门控参数初始为 0 时，新插入层的输出几乎不影响原语言模型，训练过程再逐步学习如何利用视觉信息。"
```
