### COVT — 连续视觉思维链 (Chain-of-Visual-Thought)

```yaml
id: covt
name: COVT
full_name: "连续视觉思维链 (Chain-of-Visual-Thought)"
year: "2025"
org: "SJTU"
paper_url: "https://arxiv.org/abs/2501.covt"
category: "frontier_2026"
parent: "visual_thoughts"
motivation: "连续视觉Token推理，无需外部工具"
```

#### 📝 一句话总结

COVT 将视觉语言模型的中间推理从离散文本空间扩展到连续视觉 token 空间，让模型在 `<think>` 中生成少量承载分割、深度、边缘和语义特征的 visual thought tokens，从而在无需外部工具的情况下提升细粒度感知和空间推理。

#### 🎯 核心要点

- **连续视觉 token 推理**：在语言 token 之外插入连续 latent visual tokens，使 VLM 能直接在视觉空间中思考
- **约 20 个 visual thought tokens**：用小预算 token 表达密集视觉线索，兼顾效率和感知保真度
- **多专家蒸馏**：从 SAM、DepthAnything、PIDINet、DINO 等轻量视觉专家中对齐分割、深度、边缘和语义特征
- **四阶段训练管线**：comprehension → generation → reasoning → efficient reasoning，逐步让模型理解、生成并使用视觉思维 token
- **可解释解码**：推理时可只使用 latent；需要解释时可把 visual tokens 解码为 mask、depth、edge 等密集预测
- **广泛基准提升**：在 CV-Bench、MMVP、RealWorldQA、MMStar、WorldMedQA、HRBench 等十余个感知/推理基准上带来 3% 到 16% 增益

#### 🔬 深入细节

##### 核心示意图

![COVT teaser](https://github.com/Wakals/CoVT/raw/main/assets/teaser.png)
*图：COVT 在文本推理链中插入连续视觉 token，使 VLM 不再只能把视觉信息翻译成离散语言。*

##### 动机与背景

标准 VLM 把图像编码成视觉 embedding，再通过投影层送入语言模型。后续推理基本在离散语言空间中展开，这对数学、逻辑和知识推理很有效，但对边界、深度、布局、相对位置等连续视觉信息非常低效。模型必须先把高维视觉关系说成文字，再用文字推理，形成明显的信息瓶颈。

工具增强方法可以调用检测、分割或深度估计模型，但这种方式把感知能力委托给外部模块，成本高，且最终效果受工具能力限制。生成或裁剪中间图像也仍然需要重新投影回文本空间，细粒度信息依然容易丢失。

COVT 的目标是让 VLM 在内部直接拥有“视觉思维链”：模型可以在生成 rationale 时输出少量连续视觉 token，这些 token 不是词表符号，而是携带视觉专家知识的 latent 表征。

##### CoVT Token 设计

![COVT pipeline](https://github.com/Wakals/CoVT/raw/main/assets/pipeline.png)
*图：COVT visual tokens 可对齐分割、深度、边缘、DINO 特征等视觉专家，也可按需解码为可视化结果。*

COVT 把输出序列从纯文本扩展为混合序列：

$$y_t \in \mathcal{V}_{text} \cup \mathbb{R}^{d_v}$$

其中 \(\mathcal{V}_{text}\) 是离散文本词表，\(\mathbb{R}^{d_v}\) 是连续视觉 token 空间。生成时，模型在 `<think>` 内既可以输出文本 token，也可以输出视觉 token：

$$p_\theta(y_t \mid x, y_{<t})$$

当 \(y_t\) 是文本 token 时使用常规交叉熵；当 \(y_t\) 是视觉 token 时，用 projection layer 输出连续向量，并通过专家监督对齐。

论文中典型 token 分配为：

- SAM mask prompts：8 个 visual tokens，用于分割/实例定位
- DepthAnything：4 个 visual tokens，用于深度结构
- PIDINet：4 个 visual tokens，用于边缘结构
- DINO：4 个 visual tokens，用于 patch-level 语义特征

这组约 20 个 tokens 不是要重建完整图像，而是把最关键的感知线索压缩进推理链。

##### 训练目标

COVT 的损失由语言建模和视觉对齐两部分组成：

$$\mathcal{L}=\mathcal{L}_{text}+\lambda_{seg}\mathcal{L}_{seg}+\lambda_{depth}\mathcal{L}_{depth}+\lambda_{edge}\mathcal{L}_{edge}+\lambda_{dino}\mathcal{L}_{dino}$$

其中：

- \(\mathcal{L}_{text}\)：普通 next-token prediction，保持 VLM 的回答能力
- \(\mathcal{L}_{seg}\)：让视觉 token 作为 prompt 重建 SAM 风格 mask
- \(\mathcal{L}_{depth}\)：对齐深度图或深度排序线索
- \(\mathcal{L}_{edge}\)：对齐边缘结构
- \(\mathcal{L}_{dino}\)：匹配 DINO patch 特征，保留语义与局部对应关系

> 💡 关键：视觉专家只用于训练监督；推理阶段 COVT 不需要再调用这些专家，因此它是 self-contained 的视觉推理框架。

##### 四阶段训练流程

```python
# COVT 训练流程伪代码
def train_covt(vlm, data):
    # Stage 1: comprehension
    # 让模型理解带视觉 token 标记的输入/输出格式
    train_text_reasoning_format(vlm, data.caption_and_qa)

    # Stage 2: generation
    # 学会在推理链中生成连续 visual thought tokens
    for batch in data.visual_alignment:
        z = vlm.generate_visual_tokens(batch.image, batch.question)
        loss = align_to_experts(
            z,
            sam_mask=batch.sam_mask,
            depth=batch.depth_map,
            edge=batch.edge_map,
            dino=batch.dino_features,
        )
        update(vlm, loss)

    # Stage 3: reasoning
    # 用带视觉 token 的 CoT 训练最终回答
    train_multimodal_reasoning(vlm, data.reasoning)

    # Stage 4: efficient reasoning
    # 压缩 visual token 数量，只保留能带来收益的视觉思维预算
    train_with_token_budget(vlm, max_visual_tokens=20)
```

##### 推理流程

推理时，COVT 输入图像和问题，先在 `<think>` 中生成文本 reasoning 与 visual thought tokens。最终答案仍以文本输出：

```python
def covt_inference(model, image, question, visualize=False):
    response, visual_tokens = model.generate_interleaved_thoughts(
        image=image,
        question=question,
        format="<think> ... visual_tokens ... </think><answer> ... </answer>",
    )

    if visualize:
        dense_maps = decode_visual_tokens(visual_tokens)
        return extract_answer(response), dense_maps

    return extract_answer(response)
```

如果用户需要解释，visual tokens 可以解码成 segmentation mask、depth map 或 edge map；如果只追求效率，则不解码，模型直接使用 latent token 完成推理。

##### 与传统方法的区别

| 方法 | 推理空间 | 工具依赖 | 密集视觉信息 | 主要限制 |
|---|---|---|---|---|
| Text CoT | 离散文本 | 否 | 弱 | 视觉细节被语言压缩 |
| Tool-augmented VLM | 文本 + 外部输出 | 是 | 强 | 成本高、受工具上限限制 |
| Visual image CoT | 图像/文本交错 | 可能需要 | 中到强 | 生成或重编码成本高 |
| COVT | 文本 + 连续视觉 token | 否 | 强 | 需要训练视觉 token 对齐 |

COVT 的创新点在于把“工具”内化为连续 visual thought tokens。它不是调用 SAM 或 DepthAnything 来回答问题，而是用这些专家训练一个可被 VLM 自回归生成和消费的视觉思维空间。

#### 🧪 练习题

```yaml
question: "COVT 中连续 visual thought tokens 的主要作用是什么？"
options:
  - "替代所有文本 token，使模型只输出图像"
  - "在推理链中编码分割、深度、边缘等细粒度视觉线索，减少纯文本推理的信息瓶颈"
  - "把输入图像压缩成更小的 JPEG 文件"
  - "在推理阶段调用 SAM、DepthAnything 等外部工具"
answer: 1
explain: "COVT 的 visual tokens 是可由模型内部生成和消费的连续 latent，训练时对齐视觉专家，推理时无需外部工具即可保留密集视觉信息。"
```
