### InternVL 3.0 — 用原生多模态预训练和 V2PE 扩展开放 VLM 的长上下文能力

```yaml
id: internvl_3_0
name: InternVL 3.0
year: '2025.04'
category: native_multimodal
institution: 上海AI Lab
paper: —
motivation: V2PE原生多模态预训练
parent: internvl_3_5
description: 原生多模态预训练，V2PE可变位置编码，支持万级token，在MMMU上达到72.2。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/internvl_3_0_detail.md
```

#### 📝 一句话总结
InternVL 3.0 提出 native multimodal pre-training，把纯文本语料和图文/视频/交错多模态数据放在同一自回归预训练阶段中联合优化，并用 V2PE 为视觉 token 分配更小可变位置增量，从而缓解后接式多模态对齐和长上下文位置窗口压力。

#### 🎯 核心要点
- 架构延续 InternVL 系列 ViT-MLP-LLM 范式，视觉编码器采用 InternViT-300M 或 InternViT-6B，语言侧初始化自 Qwen2.5 系列或 InternLM3-8B base 模型
- 与先训练文本 LLM 再做多模态 adapter 对齐的 post-hoc 流程不同，InternVL3 在预训练阶段同时学习语言能力和多模态能力
- Pixel unshuffle 将每个 448×448 tile 的视觉 token 数降到原来的四分之一，使每个 tile 表示为 256 个视觉 token
- V2PE 对文本 token 使用位置增量 1，对视觉 token 使用 \(\delta\in\{1,\frac12,\frac14,\dots,\frac1{256}\}\)，用更小视觉位置步长容纳更多图像、视频帧或文档页
- 预训练目标仍是自回归 next-token prediction，但通过 token-level weight \(w_i\) 对不同模态/输出位置控制损失贡献
- Post-training 使用 SFT 和 Mixed Preference Optimization (MPO)，在指令遵循、复杂推理、OCR、文档、图表、GUI、工业图像和空间感知等数据上继续增强
- 推理阶段采用 test-time scaling，可通过多次采样、答案重排序或更大视觉/文本上下文预算提高复杂任务表现
- InternVL3-78B 在 MMMU 上报告 72.2，成为当时开放 MLLM 中的强基线，并保持较强纯语言能力

#### 🔬 深入细节
##### 核心示意图

![InternVL3 多模态性能对比](https://arxiv.org/html/2504.10479v1/x1.png)
*图：InternVL3 相比 InternVL 系列前代和其他开放/闭源 MLLM 的多模态能力对比。*

![InternVL3 OpenCompass 榜单表现](https://arxiv.org/html/2504.10479v1/x2.png)
*图：InternVL3 在 OpenCompass 多模态学术榜单中的表现，官方报告强调 InternVL3-78B 接近 Gemini-2.5-Pro 等闭源强模型。*

公开来源：InternVL3 论文 `https://arxiv.org/abs/2504.10479`，论文 HTML `https://arxiv.org/html/2504.10479v1`，官方项目页 `https://internvl.github.io/blog/2025-04-11-InternVL-3.0/`，官方仓库 `https://github.com/OpenGVLab/InternVL`，V2PE 论文 `https://arxiv.org/abs/2412.09616`。

##### 核心流程代码

```python
# InternVL3 native multimodal pre-training and V2PE sketch

DELTA_SET = [1, 1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256]

def build_v2pe_positions(tokens, delta):
    pos = [0]
    for i in range(1, len(tokens)):
        if tokens[i].modality == "text":
            step = 1.0
        else:  # image patch, video patch, document visual token
            step = delta
        pos.append(pos[-1] + step)
    return pos


def encode_image_tiles(image):
    tiles = dynamic_tile(image, tile_size=448)
    patch_tokens = internvit(tiles)
    patch_tokens = pixel_unshuffle(patch_tokens)  # reduce token count to 1/4
    visual_tokens = mlp_projector(patch_tokens)   # 256 visual tokens per tile
    return visual_tokens


def native_pretrain(model, mixed_corpus):
    for sample in mixed_corpus:
        # sample can be pure text, image-text, video-text, or interleaved image-text.
        tokens = tokenize_and_pack(sample, encode_image_tiles)
        delta = random_choice(DELTA_SET)
        positions = build_v2pe_positions(tokens, delta)

        logits = model(tokens, position_ids=positions)
        loss = 0.0
        for i in range(1, len(tokens)):
            if tokens[i].is_training_target:
                loss += tokens[i].weight * cross_entropy(logits[i - 1], tokens[i])
        update(model, loss)


def post_train(model, sft_data, preference_pairs):
    train_sft(model, sft_data)
    for batch in preference_pairs:
        loss_pref = preference_loss(model, batch.chosen, batch.rejected)
        loss_quality = quality_loss(model, batch.quality_labels)
        loss_gen = lm_loss(model, batch.reference)
        update(model, wp * loss_pref + wq * loss_quality + wg * loss_gen)
```

##### 关键公式

Native multimodal pre-training 把任意训练样本表示成统一 token 序列：

$$
\mathbf{x}=(x_1,x_2,\dots,x_L),
$$

其中 \(x_i\) 可以是文本 token、图像 tile token、视频 patch token 或交错文档 token。完整自回归目标为：

$$
\mathcal{L}_{\text{full}}(\theta)
=
-\sum_{i=2}^{L}
w_i\log p_\theta(x_i\mid x_1,\dots,x_{i-1})
$$

V2PE 递归构造位置索引。传统做法不分模态统一 \(+1\)，V2PE 则让视觉 token 用更小步长：

$$
p_i=
\begin{cases}
0, & i=1,\\
p_{i-1}+1, & x_i \text{ is a textual token},\\
p_{i-1}+\delta, & x_i \text{ is a visual token},
\end{cases}
\qquad
\delta\in
\left\{1,\frac12,\frac14,\frac18,\frac1{16},\frac1{32},\frac1{64},\frac1{128},\frac1{256}\right\}
$$

MPO 后训练可以概括成偏好、质量和生成保持三项的加权和：

$$
\mathcal{L}_{\mathrm{MPO}}
=
w_p\mathcal{L}_{p}
+w_q\mathcal{L}_{q}
+w_g\mathcal{L}_{g}
$$

##### 方法解读

InternVL3 的核心转变是从“后接多模态”走向“原生多模态”。传统 MLLM 通常先得到一个纯文本 LLM，再冻结或部分冻结它，接入视觉 encoder 和 adapter，最后用图文数据做 alignment。这种路线工程上高效，但会产生明显的模态间隙：LLM 的预训练分布从未见过视觉 token，adapter 必须把视觉特征硬塞进语言空间，同时还要避免破坏原有语言能力。InternVL3 仍使用已有 ViT/LLM 初始化来节约成本，但训练目标上把纯文本和多模态数据统一到同一个自回归预训练阶段，让语言能力和视觉语言能力共同形成。

V2PE 解决的是多模态长上下文中的位置预算问题。假设一页文档或一帧高分辨率图像被切成大量视觉 token，如果每个视觉 token 都像文本一样让 position id 加 1，那么后面的文本 query 会被推到非常靠后的位置，视频、多图、长文档很快超过上下文窗口。V2PE 对视觉 token 使用 \(\delta<1\) 的可变步长，把大量视觉 token “压缩”到更短的位置跨度内，但不减少 token 本身，因此它不同于 pooling 式视觉 token 压缩。模型仍能看到细粒度视觉表示，只是 RoPE/位置索引增长更慢。

这个设计的细节在于 \(\delta\) 是可变的，而不是固定小数。训练时从 \(\{1,\frac12,\dots,\frac1{256}\}\) 中采样，让模型习惯不同视觉位置密度；推理时根据实际序列长度选择 \(\delta\)，在不越过位置窗口的前提下尽量保留位置分辨率。若输入较短，\(\delta=1\) 退化为 InternVL2.5 的常规位置编码；若输入包含多图、视频帧或长 PDF，可以选择更小 \(\delta\) 支持万级甚至更长的多模态 token。

Pixel unshuffle 是另一个实用的可扩展性设计。InternVL3 继续把图像拆成 448×448 tile，但经过 pixel unshuffle 后，每个 tile 只保留 256 个视觉 token，相当于把视觉 token 数降到原来的四分之一。它和 V2PE 的作用互补：pixel unshuffle 减少实际 token 数，降低计算成本；V2PE 减少视觉 token 对 position window 的占用，提升长上下文可用性。两者结合，使 InternVL3 能处理更高分辨率图像、更多图像和更长文档。

后训练阶段的 SFT/MPO 用于把预训练得到的通用能力转成可用助手能力。SFT 让模型遵循指令、输出规范答案，并覆盖 GUI、OCR、chart、document、industrial image、3D/spatial 等新场景；MPO 则利用 preference pair、质量标签和生成保持项继续优化输出分布。相比只用 SFT，MPO 能显式压低劣质回答；相比只做偏好优化，加入生成保持项能减少模型在格式、语言和通用问答上的退化。

与 InternVL2.5 相比，InternVL3 的贡献不只是 benchmark 更高。它把训练范式、位置编码和工程扩展性三个问题一起解决：native pre-training 减少模态间隙，V2PE 让多模态长上下文不被视觉 token 位置撑爆，pixel unshuffle 控制视觉 token 成本，SFT/MPO/test-time scaling 再把能力推向实际任务。InternVL3-78B 在 MMMU 上达到 72.2 的意义也在这里：它证明开放 VLM 可以在保持语言能力的同时，通过更原生的训练范式接近闭源多模态模型的复杂学科推理表现。

> 💡 关键：V2PE 不是“删掉视觉 token”，而是让视觉 token 的 position index 以更小可变步长增长；native multimodal pre-training 则让这些视觉 token 从预训练阶段就参与语言模型的自回归学习。

#### 🧪 练习题

```yaml
question: "InternVL3 中 V2PE 的主要作用是什么？"
options:
  - "让视觉 token 使用更小可变位置增量，从而在长多模态序列中降低位置窗口压力"
  - "把所有视觉 token 全部删除，只保留 OCR 文本"
  - "把语言模型替换成扩散模型"
  - "只用于训练 reward model，与位置编码无关"
answer: 0
explain: "V2PE 对文本 token 保持 +1，对视觉 token 使用可变的 δ 小步长，使多图、视频和长文档能占用更少位置跨度，同时保留视觉 token 表示。"
```
