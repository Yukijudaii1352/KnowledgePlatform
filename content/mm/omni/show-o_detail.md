### 展示-全模态 (Show-o)

```yaml
id: show-o
name: Show-o
full_name: 展示-全模态 (Show-o)
year: '2024'
org: NUS
paper_url: https://arxiv.org/abs/2408.12528
category: autoregressive
parent: chameleon
motivation: 自回归+离散扩散混合建模
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/show-o_detail.md
```

#### 📝 一句话总结

Show-o 提出在一个 Transformer 内同时使用自回归建模和离散扩散建模：文本 token 继续按因果方式生成，图像 token 则通过 mask token prediction 以全注意力迭代去噪。它解决了 Chameleon 类纯自回归模型生成高分辨率图像需要大量逐 token 采样步的问题，同时保留 MLLM 的文本推理和视觉理解能力。

#### 🎯 核心要点

- **单 Transformer 双建模范式**：一个模型同时承担 multimodal understanding、text-to-image、inpainting/extrapolation 和 mixed-modality generation
- **离散图像 token 空间**：默认使用 MAGVIT-v2 风格 tokenizer，codebook size 为 8192，将 \(256\times256\) 图像编码为 \(16\times16\) 离散 token
- **预训练 LLM 初始化**：Show-o 基于 Phi-1.5 等预训练 LLM，扩展 8192 个图像 token embedding，并在 attention 层前加入 QK-Norm
- **统一 prompting 格式**：用 `[MMU]`、`[T2I]` 区分理解与生成任务，用 `[SOT]`/`[EOT]` 包裹文本，用 `[SOI]`/`[EOI]` 包裹图像 token
- **Omni-Attention**：文本 token 使用 causal attention，图像 token 使用 full attention；同一输入序列中根据任务格式自动混合两类注意力
- **双训练目标**：文本理解使用 next-token prediction，图像生成使用 mask token prediction，整体损失为 \(\mathcal{L}=\mathcal{L}_{\mathrm{MTP}}+\alpha\mathcal{L}_{\mathrm{NTP}}\)
- **迭代去 mask 推理**：生成图像时从全 `[MASK]` 图像 token 开始，多步预测并替换 mask token，天然支持局部 inpainting 和画布 extrapolation

#### 🔬 深入细节

##### 框架总览

![Show-o 统一理解与生成架构](https://arxiv.org/html/2408.12528v6/x2.png)
*图：Show-o 将输入统一 token 化并格式化成序列；文本部分用自回归因果注意力，图像部分用离散扩散式 full attention 进行 mask token prediction。*

Show-o 的核心问题意识来自 Chameleon：既然一个 Transformer 可以同时处理文本和图像 token，是否必须把图像也按严格自回归顺序一个 token 一个 token 生成？纯自回归图像生成在 \(16\times16\)、\(32\times32\) token 网格上需要数百到上千步采样，而且早期 token 错误会因因果顺序累积。Show-o 因此保留文本的自回归建模，但把图像生成改成离散扩散/MaskGIT 风格的并行去 mask。

##### 核心流程伪代码

```python
# Show-o 统一训练与生成流程
for example in multimodal_batch:
    text_tokens = text_tokenizer(example.text)
    image_tokens = image_tokenizer.encode(example.image)  # 256x256 -> 16x16 ids

    if example.task == "mmu":
        seq = ["[MMU]", "[SOI]", *image_tokens, "[EOI]",
               "[SOT]", *text_tokens, "[EOT]"]
        logits = show_o(seq, attention="omni")
        loss = next_token_loss(logits, target_text_tokens=text_tokens)

    elif example.task == "t2i":
        masked_image, mask_positions = random_mask(image_tokens, timestep=random_t())
        seq = ["[T2I]", "[SOT]", *text_tokens, "[EOT]",
               "[SOI]", *masked_image, "[EOI]"]
        logits = show_o(seq, attention="omni")
        loss = mask_token_loss(logits, targets=image_tokens, positions=mask_positions)

    update(show_o, loss)

# 图像推理：从全 mask 开始迭代预测
image_seq = ["[MASK]"] * num_image_tokens
for step in range(T):
    logits = show_o(["[T2I]", *prompt_tokens, "[SOI]", *image_seq, "[EOI]"])
    selected = choose_low_confidence_masks(image_seq, schedule=step)
    image_seq[selected] = sample_image_tokens(logits[selected], guidance_scale=w)

image = image_tokenizer.decode(image_seq)
```

##### 统一 prompting 把任务类型显式写进序列

Show-o 使用特殊 token 把不同任务都表示成结构化序列。多模态理解通常是：

$$
[\mathrm{MMU}]\,[\mathrm{SOI}]\,u_{1:M}\,[\mathrm{EOI}]\,[\mathrm{SOT}]\,v_{1:N}\,[\mathrm{EOT}]
$$

文本到图像生成则是：

$$
[\mathrm{T2I}]\,[\mathrm{SOT}]\,v_{1:N}\,[\mathrm{EOT}]\,[\mathrm{SOI}]\,u_{1:M}\,[\mathrm{EOI}]
$$

其中 \(u\) 是图像 token，\(v\) 是文本 token。这个格式的意义是把“当前是在回答问题还是生成图像”变成模型可见的 token 条件，而不是依赖外部路由器。对于 mixed-modality generation，Show-o 可以把文本描述和关键帧 token 交错排列，文本段按自回归预测，单帧内部的图像 token 按 mask prediction 生成。

##### Omni-Attention 同时容纳因果文本和全局图像

文本生成天然需要因果约束：第 \(i\) 个文本 token 只能看之前的文本 token 以及输入图像条件。图像生成则不同，一个待生成图像的 token 网格内部更适合双向交互，因为局部区域可以由全局布局共同决定。Show-o 的 Omni-Attention 因此按 token 类型和任务格式混合 mask：文本块使用 causal attention，图像块使用 full attention。

这种设计是 Show-o 区别于 Chameleon 的关键。Chameleon 对图像 token 也使用自回归顺序，而 Show-o 允许图像 token 之间在每一次 denoising step 中全连接通信。因此图像生成不再被固定 raster order 绑死，模型可以同时利用左上角、右下角、文本条件和未遮盖区域来恢复被 mask 的 token。

##### NTP 负责语言，MTP 负责视觉生成

在多模态理解中，Show-o 对文本答案使用标准 next-token prediction：

$$
\mathcal{L}_{\mathrm{NTP}}
=-\sum_i \log p_\theta(v_i\mid v_{<i},u_{1:M})
$$

在图像生成中，Show-o 随机把一部分图像 token 替换为 `[MASK]`，只在这些 mask 位置上预测原始 token：

$$
\mathcal{L}_{\mathrm{MTP}}
=-\sum_{j\in\mathcal{M}}\log p_\theta(u_j\mid u^*,v_{1:N})
$$

整体目标是：

$$
\mathcal{L}
=\mathcal{L}_{\mathrm{MTP}}+\alpha\mathcal{L}_{\mathrm{NTP}}
$$

论文把这种 mask token prediction 解释为简化的 absorbing discrete diffusion：图像 token 在前向 corruption 中要么保持原值，要么变成 `[MASK]`；反向过程学习从被 mask 的序列恢复原始 token。相比连续扩散，它不预测高维噪声，而是在离散 codebook 上做分类；相比纯自回归，它可以并行修复多个图像位置。

##### 推理时的离散扩散让生成更适合图像编辑

文本到图像时，Show-o 用全 `[MASK]` 图像 token 初始化，然后在 \(T\) 个步骤中逐步替换 mask token。每一步都可以依据模型置信度选择哪些位置先确定，剩余低置信度位置继续保留为 mask。classifier-free guidance 通过以一定概率把条件文本替换为空文本训练得到，推理时可用条件/无条件 logits 差增强 prompt alignment。

这个机制天然支持 inpainting 和 extrapolation：inpainting 时保留未编辑区域的图像 token，只把待编辑区域置为 `[MASK]`；extrapolation 时把原图 token 放在已知区域，新扩展画布填 `[MASK]`。模型不需要额外训练一个修补网络，因为“局部 mask 恢复”本来就是它的视觉生成目标。

##### 混合模态生成把视频关键帧看成“时间上的自回归，帧内的扩散”

Show-o 的 mixed-modality generation 示例把视频拆成文本描述和关键帧序列。序列层面，下一段文本或下一帧依赖前面所有文本和关键帧，这是时间自回归；但对于某一帧内部，图像 token 是通过离散扩散式 mask prediction 生成的。可概括为：

$$
p(\text{sequence})
=\prod_k p(\text{text}_k,\text{frame}_k\mid \text{history}_{<k}),
\quad
p(\text{frame}_k)\ \text{由 MTP 迭代近似}
$$

这让 Show-o 介于 Chameleon 和扩散模型之间：它不像 Chameleon 那样对每个视觉 token 做长链式 AR，也不像传统扩散系统那样把理解模型和生成模型拆成两个网络，而是在同一 Transformer 内根据模态选择合适的建模假设。

> 💡 关键：Show-o 的“统一”不是强迫所有模态使用同一种生成顺序，而是在一个 Transformer 里共享 token、prompt 和参数，同时让文本走 causal AR、图像走 full-attention discrete diffusion。

#### 🧪 练习题

```yaml
question: "Show-o 相比 Chameleon 的关键方法差异是什么？"
options:
  - "Show-o 不再使用图像 token，只使用连续像素"
  - "Show-o 用两个完全独立的模型分别做理解和生成"
  - "Show-o 保留文本自回归建模，但用 mask token prediction/离散扩散生成图像 token"
  - "Show-o 只能做视觉问答，不能生成图像"
answer: 2
explain: "Show-o 的核心是混合建模：文本答案用 NTP，图像 token 用 MTP 和 full attention 迭代去 mask，从而减少纯自回归图像生成的采样瓶颈。"
```
