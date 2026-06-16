### 统一大语言模型 (OneLLM)

```yaml
id: onellm
name: OneLLM
full_name: 统一大语言模型 (OneLLM)
year: '2024'
org: 上海AI Lab
paper_url: https://github.com/csuhan/OneLLM
category: encoder_llm_decoder
parent: next-gpt
motivation: 8种模态统一映射对齐
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/onellm_detail.md
```

#### 📝 一句话总结

OneLLM 提出用一个冻结的通用 CLIP-ViT 编码器、轻量模态 tokenizer 和 Universal Projection Module 将 8 种模态统一对齐到 LLaMA2 语言空间，解决以往多模态 LLM 为每种模态单独设计 encoder/projector 的扩展困难。

#### 🎯 核心要点

- **8 种模态统一接入**：支持图像、音频、视频、点云、深度图、法线图、IMU 和 fMRI 脑活动信号
- **轻量模态 tokenizer**：每种模态用 1D/2D 卷积把原始信号转为 token 序列，保留必要的形态差异但避免大型专用编码器
- **冻结通用编码器**：使用 CLIP-ViT 作为所有模态共享的 universal encoder，训练时保持冻结
- **Universal Projection Module (UPM)**：多个图文预训练投影专家加动态 router，把任意模态映射为 LLM 可消费的固定长度 modality tokens
- **learnable modality tokens**：为不同模态引入可学习查询 token，用于模态切换、信息汇聚和统一输出长度
- **渐进式多模态对齐**：先做 image-text alignment，再扩展到视频/音频/点云，最后扩展到深度/法线/IMU/fMRI，缓解数据规模不均衡和遗忘
- **2M instruction 数据**：构建覆盖 captioning、QA、reasoning、conversation 的多模态指令数据，最终在 25 个 benchmark 上评估

#### 🔬 深入细节

##### 框架总览

![OneLLM 模型架构](https://arxiv.org/html/2312.03700v2/x2.png)
*图：OneLLM 由轻量模态 tokenizer、冻结 CLIP-ViT universal encoder、UPM 和 LLaMA2 组成；对齐阶段训练 tokenizer 与 UPM，指令微调阶段主要训练 LLM。*

OneLLM 的核心问题是可扩展性。许多多模态 LLM 沿用“每种模态一个 encoder + 一个 projector”的结构，图像、音频、视频还能依赖成熟预训练模型，但点云、IMU、fMRI 这类模态很难找到同等质量的专用 encoder。OneLLM 的假设是：一个强视觉-语言 Transformer 已经学到足够通用的 token 处理能力，可以作为跨模态 universal encoder；真正需要针对模态变化适配的是输入 tokenizer 和投影模块。

##### 核心流程伪代码

```python
# OneLLM 渐进式统一对齐流程
modalities_stage = [
    ["image"],
    ["video", "audio", "point_cloud"],
    ["depth", "normal", "imu", "fmri"],
]

# stage 0: 先用图文数据训练 image projection，并复制初始化多个 UPM experts
P_image = train_image_text_projection(image_text_pairs, frozen_clip_vit, frozen_llama2)
UPM.experts = [copy(P_image) for _ in range(K)]

for current_modalities in modalities_stage:
    replay = sample_previous_modalities()
    batch = sample(current_modalities) + replay

    for x, modality, caption in batch:
        tokens = modality_tokenizer[modality](x)
        feats = frozen_clip_vit(tokens)
        q_bar = UPM(feats, modality_tokens[modality])
        loss = lm_caption_loss(frozen_llama2, q_bar, caption)
        update(modality_tokenizer[modality], UPM, loss)

# instruction tuning: 冻结 tokenizer/encoder/UPM，训练 LLM 遵循多模态指令
for q_bar, prompt, answer in multimodal_instruction_data:
    loss = response_ce_loss(llama2, [q_bar, system_prompt, prompt], answer)
    update(llama2, loss)
```

##### UPM：共享投影而不是模态专用投影

OneLLM 的 UPM 是论文最关键的结构。对模态 \(m\)，先把输入信号经过轻量 tokenizer 得到 \(\mathbf{x}_m\in\mathbb{R}^{L\times D}\)，再拼接该模态的可学习查询 token \(\mathbf{q}_m\)。UPM 用多个投影专家 \(P_k\) 和 router 权重 \(\mathbf{w}_m\) 进行软混合：

$$
[\bar{\mathbf{q}}_m,\bar{\mathbf{x}}_m]
=\mathrm{UPM}([\mathbf{q}_m,\mathbf{x}_m])
=\sum_{k=1}^{K}\mathbf{w}_m\cdot P_k([\mathbf{q}_m,\mathbf{x}_m])
$$

$$
\mathbf{w}_m=\sigma\left(R_m([\mathbf{q}_m,\mathbf{x}_m])\right),\quad
\sum_{k=1}^{K}\mathbf{w}_{m,k}=1
$$

最终只取 \(\bar{\mathbf{q}}_m\) 作为输入信号摘要送入 LLM。这一步相当于把任意长度、任意模态的输入统一压缩成固定长度的“语言前缀 token”，避免 LLM 上下文被视频帧、音频帧或点云点数拖垮。

##### 为什么先训练图文投影

直接把 8 种模态混在一起训练会遇到数据不均衡：图文数据巨大，IMU/fMRI 数据小且噪声高，模型容易偏向高资源模态或遗忘早期能力。OneLLM 先训练基础 vision LLM：CLIP-ViT + image projection + LLaMA2。图像投影 \(P_I\) 学会把 CLIP 表示映射进 LLM embedding space 后，再复制它初始化 UPM 的多个专家：

$$
\mathrm{UPM}=\{P_k\}=\{\mathrm{Init}(P_I)\}
$$

这样做的直觉是，CLIP-ViT 本来就与语言强对齐，图文投影是最稳定的起点。后续音频、视频、点云等模态不必从随机 projector 开始学习“怎么接到 LLM”，而是在已有图文对齐接口上迁移。

##### 渐进式对齐与指令微调分离

OneLLM 将训练分成两类目标。第一类是 multimodal-text alignment：给定任意模态输入，让冻结 LLaMA2 生成 caption 或文本描述，训练 tokenizer 与 UPM。该阶段不加复杂 system prompt，重点是把模态表示对齐到语言空间。对齐顺序按照数据规模分组：先 image，再 video/audio/point cloud，最后 depth/normal/IMU/fMRI；每个新阶段都会均匀采样旧模态数据，减少 catastrophic forgetting。

第二类是 unified multimodal instruction tuning。对齐完成后，OneLLM 已经像一个“多模态 captioning 模型”，但还不一定会遵循开放式指令。作者整理约 2M 条 instruction 数据，包括图像 VQA、视频 QA、音频 caption、点云描述、深度/法线衍生指令、IMU 动作描述和 fMRI 场景描述等。该阶段冻结 tokenizer、CLIP-ViT 和 UPM，主要全量微调 LLaMA2-7B，使其学会在统一 modality tokens 前缀条件下回答、推理和对话。

##### 与 NExT-GPT 的关系

OneLLM 可以看作对 NExT-GPT 输入侧扩展性的进一步收敛。NExT-GPT 更强调 any-to-any 生成，输出侧连接多个扩散解码器；OneLLM 重点解决“如何把更多输入模态统一接进 LLM”，因此不追求统一生成图像/音频/视频，而是追求统一理解、caption、QA 和 reasoning。它牺牲了一部分输出模态生成能力，换来更强的模态扩展性和更少的专用 encoder 依赖。

> 💡 关键：OneLLM 的统一不是把所有原始信号变成同一 tokenizer，而是用轻量 tokenizer 保留模态入口差异，再用共享 CLIP-ViT + UPM 把它们压到同一个 LLM 前缀空间。

#### 🧪 练习题

```yaml
question: "OneLLM 中 UPM 的主要作用是什么？"
options:
  - "把不同模态的 token 通过多个投影专家和动态路由映射为固定长度的 LLM 输入 token"
  - "替代 LLaMA2 完成文本生成"
  - "把所有模态直接解码成图像"
  - "只用于压缩图像分辨率"
answer: 0
explain: "UPM 是 OneLLM 的统一 X-to-language 接口，它用投影专家和 soft router 对不同模态进行共享映射，并输出固定长度 modality tokens。"
```
