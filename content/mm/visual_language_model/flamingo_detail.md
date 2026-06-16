### Flamingo — 冻结视觉与语言模型的少样本视觉语言连接器

```yaml
id: flamingo
name: Flamingo
year: '2022'
category: connector
institution: DeepMind
paper: NeurIPS 2022
motivation: 冻结双塔+门控交叉注意力
parent: —
description: 80B参数，通过Perceiver Resampler和Gated Cross-Attention连接冻结的视觉与语言模型，实现少样本学习。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/flamingo_detail.md
```

#### 📝 一句话总结

Flamingo 通过 Perceiver Resampler 将任意数量的图像/视频特征压缩成固定视觉 token，再用从零训练的 gated cross-attention-dense 层接入冻结语言模型，使一个 80B 视觉语言模型可以用少量图文示例完成 captioning、VQA、视觉对话和视频问答。

#### 🎯 核心要点

- **冻结双塔再连接**：冻结预训练 NFNet-F6 视觉编码器和 Chinchilla 语言模型，只训练 Perceiver Resampler 与 gated xattn-dense 适配层。
- **Perceiver Resampler**：把可变分辨率图像或多帧视频的时空特征压缩为固定 64 个视觉 token，降低语言模型跨注意力成本。
- **门控交叉注意力注入视觉信息**：在冻结 LM 层之间插入新训练的 cross-attention + FFN，并用 \(\tanh(\alpha)\) 门控使初始状态等价于原语言模型。
- **支持任意图文交错序列**：输入可包含多张图片/视频与文本，借助 per-image/video attention masking 控制每个文本 token 可看的视觉上下文。
- **网页级多模态预训练数据**：使用 M3W interleaved webpages、ALIGN image-text pairs、LTIP long image-text pairs 和 VTP video-text pairs 的加权语言建模目标。
- **少样本任务适配**：推理时用交错的 support examples 和 query 组成 prompt，不需要为每个任务更新模型参数。

#### 🔬 深入细节

##### 架构图与核心模块

![Flamingo 总体架构](https://ar5iv.labs.arxiv.org/html/2204.14198/assets/x38.png)
*图：Flamingo 用 Perceiver Resampler 处理视觉特征，并在冻结 LM 中插入 gated xattn-dense 层来注入视觉上下文。*

![Flamingo Perceiver Resampler](https://ar5iv.labs.arxiv.org/html/2204.14198/assets/x42.png)
*图：Perceiver Resampler 以可学习 latent queries 查询图像/视频时空特征，输出固定数量视觉 token。*

![Flamingo Gated XAttn-Dense](https://ar5iv.labs.arxiv.org/html/2204.14198/assets/x39.png)
*图：gated xattn-dense 块由 cross-attention 和 dense FFN 组成，两个残差分支都带可学习 tanh 门控。*

##### 算法/流程伪代码

```python
# Flamingo 预训练与少样本推理伪代码
vision_encoder = FrozenNFNetF6()
language_model = FrozenChinchillaLM()
resampler = PerceiverResampler(num_latents=64)
gated_layers = insert_gated_xattn_dense(language_model, frequency="model_size_dependent")

def encode_visual(media):
    # media 可以是单张图像，也可以是视频帧序列
    grid = vision_encoder(media)              # [T, H, W, D] or [H, W, D]
    grid = add_temporal_embedding(grid)
    visual_tokens = resampler(flatten(grid))  # [64, D_lm]
    return visual_tokens

for batch in mixed_datasets:  # M3W / ALIGN / LTIP / VTP
    text_tokens, media_positions, media_items = batch
    visual_cache = [encode_visual(m) for m in media_items]

    loss = 0
    for token_index, target_token in enumerate(text_tokens):
        visible_media = last_media_before(token_index, media_positions)
        xattn_mask = allow_only(visual_cache[visible_media])

        logits = language_model.forward_with_gated_xattn(
            prefix=text_tokens[:token_index],
            visual_tokens=visual_cache,
            visual_mask=xattn_mask,
            trainable_layers=gated_layers,
        )
        loss += cross_entropy(logits, target_token)

    update([resampler, gated_layers], loss)  # vision encoder 和 LM 均冻结

# 推理：把少量示例和待回答图像拼成交错 prompt
prompt = [
    image_1, "Question: ... Answer: ... <EOC>",
    image_2, "Question: ... Answer: ... <EOC>",
    query_image, "Question: ... Answer:"
]
answer = autoregressive_decode(language_model, prompt)
```

##### 1. 动机：让大语言模型获得视觉 in-context learning

Flamingo 解决的问题不是单个 VQA benchmark 上的微调精度，而是“能否像 GPT-3 处理文本任务一样，用几个多模态示例快速适配新视觉任务”。早期视觉语言模型通常依赖任务特定头或大规模任务内微调；CLIP/ALIGN 的双塔表示适合检索和分类，却不自然地产生开放文本答案；把视觉 token 直接拼进语言模型又会带来序列长度和稳定性问题。

Flamingo 的取舍很明确：保留已经很强的预训练视觉模型和语言模型，不反向更新它们的大部分参数；在二者之间训练一个可扩展连接器。这样既减少训练成本，又降低“多模态训练破坏语言模型能力”的风险。门控层初始化为近似关闭，使模型一开始等价于原始 LM，然后逐步学习何时读取视觉信息。

##### 2. Perceiver Resampler：把可变视觉输入压成固定接口

视觉编码器输出的是空间网格；视频还多一个时间维。若让语言模型对所有 patch/帧做 cross-attention，代价会随分辨率和帧数快速增长。Flamingo 用 Perceiver Resampler 建立固定带宽的视觉接口：先把视觉特征 \(X \in \mathbb{R}^{T \times S \times d}\) 展平为 \(X_f \in \mathbb{R}^{TS \times d}\)，再用 \(R=64\) 个可学习 latent queries \(Z \in \mathbb{R}^{R \times d}\) 反复 cross-attend 到视觉特征。

一层 Resampler 可抽象为：

$$
Z \leftarrow Z + \operatorname{Attn}(Q=Z,\ K=[X_f;Z],\ V=[X_f;Z]),
$$

$$
Z \leftarrow Z + \operatorname{FFN}(Z).
$$

论文中一个细节是 keys/values 不只来自视觉特征 \(X_f\)，还拼接了当前 latents \(Z\)。这让 latent token 之间也能在重采样过程中交换信息。最终输出固定 64 个视觉 token，无论输入是一张图、不同分辨率图像，还是多帧视频，都给语言模型一个一致的视觉上下文形状。

##### 3. Gated XAttn-Dense：在不破坏冻结 LM 的前提下注入视觉

Flamingo 不把视觉 token 直接拼到文本序列里，而是在冻结 LM block 之间插入新训练的 gated xattn-dense 层。给定语言隐藏状态 \(y\) 和视觉 token \(x\)，新增层的核心计算可写为：

$$
y \leftarrow y + \tanh(\alpha_{\text{xattn}})
\operatorname{CrossAttn}(Q=y,\ K=x,\ V=x),
$$

$$
y \leftarrow y + \tanh(\alpha_{\text{ffn}})
\operatorname{FFN}(y).
$$

\(\alpha_{\text{xattn}}\) 和 \(\alpha_{\text{ffn}}\) 是逐层可学习标量，初始化为 0；因此 \(\tanh(0)=0\)，训练开始时新分支不会改变 LM 输出。这是 Flamingo 稳定训练的关键：它不是强行让 LM 立刻消费视觉特征，而是在语言先验保持完整的情况下逐步打开视觉通道。

##### 4. 图文交错输入：视觉注意力也要因果化

Flamingo 的训练样本可以来自网页：文本中间插入 `<image>`，每个 chunk 以 `<EOC>` 标记结束。对第 \(\ell\) 个文本 token，模型只允许 cross-attend 到它前面最近一张图像/视频的视觉 token，而不是看所有历史图片。目标似然可概括为：

$$
p_\theta(y \mid x)
= \prod_{\ell=1}^{L}
p_\theta(y_\ell \mid y_{<\ell},\ \mathcal{V}_{<\ell}),
$$

其中 \(\mathcal{V}_{<\ell}\) 是当前位置之前可见的视觉输入。虽然 cross-attention 一次只看最近视觉输入，冻结 LM 的 self-attention 仍然能把早先图片对应的文本描述带到后续上下文里。这种 masking 让训练时最多 5 张图的模型，在评估时仍可用 32-shot 图文示例 prompt。

##### 5. 训练目标与数据混合

Flamingo 的主训练目标是多数据源加权的文本负对数似然：

$$
\mathcal{L}
= \sum_{m=1}^{M} \lambda_m
\mathbb{E}_{(x,y)\sim \mathcal{D}_m}
\left[-\sum_{\ell=1}^{L}\log p_\theta(y_\ell \mid y_{<\ell}, x)\right].
$$

数据源包括 M3W（约 4300 万网页抽取的交错图文）、ALIGN（18 亿图文对）、LTIP（3.12 亿更长描述图文对）和 VTP（2700 万视频文本对）。成对图文数据会被改写成类似 M3W 的格式，即 caption 前后加 `<image>` 和 `<EOC>`，统一成语言建模问题。这样 Flamingo 不需要为 captioning、VQA、分类分别设计 loss；任务差异主要由 prompt 表达。

##### 6. 与传统连接器方法的区别

Flamingo 的连接器思想和后来的 BLIP-2/Q-Former、LLaVA 投影层都不同。它面向的是“冻结巨大 LM 的少样本通用性”：Perceiver Resampler 控制视觉 token 数，gated xattn-dense 控制视觉信息进入 LM 的强度，per-image masking 控制交错序列的因果结构。代价是新增适配层参数并不小，80B 模型中 gated xattn-dense 约 10B 参数；但换来的是不必对每个下游任务微调，就能通过上下文示例完成开放式视觉语言任务。

#### 🧪 练习题

```yaml
question: "Flamingo 的 gated cross-attention 为什么要用 tanh 门控并初始化为 0？"
options:
  - "让新增视觉分支在训练初始不改变冻结语言模型输出，从而提升稳定性"
  - "把 64 个视觉 token 压缩成 1 个全局 token"
  - "强制语言模型只能处理单张图片"
  - "替代所有文本 self-attention 层"
answer: 0
explain: "门控参数初始为 0 时 tanh 输出为 0，新增 cross-attention 和 FFN 残差分支暂时关闭，模型初始行为接近原始冻结 LM，随后再学习使用视觉信息。"
```
