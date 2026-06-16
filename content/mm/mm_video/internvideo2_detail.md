### InternVideo2：面向多模态视频理解的可扩展视频基础模型

```yaml
id: internvideo2
name: InternVideo2
full_name: 视频基础模型 (InternVideo2)
year: '2024'
org: Shanghai AI Lab
paper_url: https://arxiv.org/abs/2403.15377
category: video_llm
parent: llava_video
motivation: 大规模缩放增强多模态对齐
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/internvideo2_detail.md
```

#### 📝 一句话总结

InternVideo2 提出三阶段渐进式视频基础模型训练方案，把掩码视频 token 重建、视频-音频-语音-文本对齐和视频中心 next-token prediction 串联起来，解决大规模视频模型既要时空感知、又要跨模态语义对齐和开放式对话能力的问题。

#### 🎯 核心要点

- 构建最大到 6B 参数的视频 ViT 编码器，输入稀疏采样视频帧并使用 3D 位置编码与 attention pooling 建模时空 token
- Stage 1 使用 InternVL-6B 与 VideoMAEv2-g 作为语义/运动教师，通过未掩码 token 的 MSE 蒸馏学习基础时空表示
- Stage 2 扩展到视频、图像、音频、语音、文本多模态，用跨模态对比、匹配和 masked language modeling 进行统一对齐
- Stage 3 通过 Q-Former/Video BLIP 连接 LLM，用视频中心指令数据和 next-token prediction 强化视频问答、描述、长视频推理
- 数据侧强调时空一致性，构建包含 2M 视频、50M 视频-文本、50M 视频-音频-语音-文本、300M 图文样本的 402M 级训练集合
- InternVid2 对视频先做语义切分，再分别生成视频、音频、语音 caption 并融合，减少 clip 描述与真实事件错位
- 高分辨率后训练把输入切分为多个局部子视频加一个全局子视频，并从 8 帧过渡到 16 帧以增强细粒度与长时序能力

#### 🔬 深入细节

![InternVideo2 三阶段训练框架](https://ar5iv.labs.arxiv.org/html/2403.15377/assets/x2.png)
*图：InternVideo2 的整体框架，由未掩码视频 token 重建、多模态对齐、连接 LLM 的 next-token prediction 三个阶段组成。*

InternVideo2 的核心不是单独换一个视频编码器，而是把视频基础模型需要的三种能力按训练阶段拆开：第一阶段学低层和中层时空结构，第二阶段把这些结构对齐到文本、音频、语音等语义空间，第三阶段再把视频表示接入大语言模型。这个顺序很关键，因为直接用视频问答数据训练 LLM 接口，容易得到会“说”的模型，却不一定有稳定的视频时空表征；只做 masked video modeling 或 video-text contrastive，又难以支撑开放式对话。

第一阶段采用“教师蒸馏式”的 masked token reconstruction。学生视频编码器随机初始化，视频 token 中约 80% 被按帧掩码；InternVL-6B 提供多模态语义教师，VideoMAEv2-g 提供运动敏感教师。与传统 MAE 重建像素不同，InternVideo2 对未掩码 token 做特征级对齐，让学生同时靠近图文语义空间和视频运动空间。一个简化目标可以写成：

$$
\mathcal{L}_{\text{stage1}}
= \sum_{i \in \Omega}
\left(
\lambda_v \left\| P_v h_i - t_i^{\text{InternVL}} \right\|_2^2
+ \lambda_m \left\| P_m h_i - t_i^{\text{VideoMAE}} \right\|_2^2
\right)
$$

其中 \(\Omega\) 表示未被掩码的 token 集合，\(h_i\) 是 InternVideo2 编码得到的 token，\(P_v,P_m\) 是训练时使用的投影层。训练结束后这些投影层会被丢弃，只保留基础视频编码器。这种做法的直觉是：用强教师告诉模型“这个可见局部应该是什么语义、属于什么运动模式”，比让 6B 级编码器从像素重建信号中慢慢摸索更高效。

第二阶段把视频编码器放入更大的多模态对齐系统。视频、图像、音频、语音等输入被映射到与文本可比较的表示空间；音频编码器来自 BEATs，文本/语音侧使用 BERT-Large 结构的编码器和带 cross-attention 的多模态解码器。训练目标由跨模态对比、匹配分类和 masked language modeling 组成：

$$
\mathcal{L}_{\text{stage2}}
= \mathcal{L}_{\text{contrastive}}
+ \mathcal{L}_{\text{matching}}
+ \mathcal{L}_{\text{mlm}}
$$

对比损失负责把配对的视频/音频/图像与文本拉近，把 batch 内负样本推远：

$$
\mathcal{L}_{\text{contrastive}}
= -\frac{1}{B}\sum_i
\log
\frac{\exp(\operatorname{sim}(z_i^m,z_i^t)/\tau)}
{\sum_j \exp(\operatorname{sim}(z_i^m,z_j^t)/\tau)}
$$

匹配损失进一步判断输入对是否真实配对，MLM 则要求模型在跨模态上下文中恢复被 mask 的 caption token。论文还把 Stage 2 拆成“masked visual-language-audio alignment”和“unmasked post-pretraining”：前者提高训练效率，后者在较小但更接近推理形态的数据上校准完整 token 表示。

第三阶段把 InternVideo2 接入 LLM。视频编码器输出先经 Q-Former/Video BLIP 类型连接器压缩和重排，再作为视觉前缀送入语言模型做自回归生成：

$$
\mathcal{L}_{\text{ntp}}
= -\sum_{t=1}^{T}
\log p_\theta(y_t \mid y_{<t}, q(V))
$$

这里 \(q(V)\) 是 Q-Former 从视频 token 中抽取出的少量查询表示。高分辨率后训练进一步把一个视频拆成最多 6 个局部 224x224 子视频和 1 个全局子视频，第一轮用 8 帧、第二轮用 16 帧；视频编码器与 Q-Former 继续更新，LLM 通过 LoRA 更新。这样既保留局部细节，又避免把所有高分辨率帧直接塞进 LLM 上下文。

```python
# InternVideo2 渐进式训练流程伪代码
video_encoder = VideoViT(scale="up_to_6B")

# Stage 1: semantic/motion teacher distillation on unmasked video tokens
for video in kmash_videos:
    frames = sparse_sample(video, num_frames=8)
    visible_tokens, mask = mask_video_tokens(frames, ratio=0.80)
    student_tokens = video_encoder(visible_tokens)
    semantic_targets = internvl_teacher(frames)       # multimodal-friendly semantics
    motion_targets = videomae_teacher(frames)         # motion-aware representation
    loss = mse(project_sem(student_tokens), semantic_targets, where=~mask)
    loss += mse(project_motion(student_tokens), motion_targets, where=~mask)
    update(video_encoder, loss)

# Stage 2: align video/image/audio/speech to text
for batch in multimodal_pairs:
    z_modality = encode_modality(batch.signal)        # video, image, audio, speech
    z_text = text_encoder(batch.caption)
    loss = contrastive_loss(z_modality, z_text)
    loss += matching_loss(z_modality, z_text, batch.is_pair)
    loss += masked_lm_loss(multimodal_decoder, batch.caption)
    update(alignment_modules, loss)

# Stage 3: video-centric instruction tuning with next-token prediction
for sample in video_dialogue_data:
    video_tokens = video_encoder(sample.video)
    query_tokens = q_former(video_tokens)
    logits = llm(prefix=query_tokens, text=sample.prompt_and_answer)
    loss = autoregressive_ce(logits, sample.answer_tokens)
    update(video_encoder, q_former, lora(llm), loss)
```

InternVideo2 的数据设计服务于同一个目标：让视频 token 和文字描述在时间上对齐。普通 web video caption 常常只描述整个视频的大意，和具体 clip 的动作并不精确；InternVid2 先按语义边界切分视频片段，再分别根据视觉、音频、语音生成描述，最后融合成更完整的 caption。这样 Stage 2 的对比学习看到的是更干净的“片段-语义”对应关系，减少了长视频中事件错位带来的噪声。

相对 LLaVA-Video 一类主要把现成视觉编码器接到 LLM 的方法，InternVideo2 更强调“先把视频编码器做成基础模型”。它在 Stage 1/2 中学习可迁移的视频表征，再在 Stage 3 中获得对话能力；因此同一个编码器既能用于动作识别、时序定位、视频检索、音频相关任务，也能作为视频对话模型的感知底座。代价是训练系统更重、数据工程更复杂，但好处是能力不局限在单一指令微调任务上。

> 💡 关键：InternVideo2 的“scale”不只是参数规模扩大，而是模型、数据和目标函数同时扩展；三阶段分别解决感知、对齐和生成三个瓶颈。

#### 🧪 练习题

```yaml
question: "InternVideo2 在 Stage 1 同时使用 InternVL-6B 和 VideoMAEv2-g 作为教师，主要目的是什么？"
options:
  - "让学生模型只学习静态图像分类能力"
  - "同时注入多模态语义知识和运动敏感的视频表示"
  - "避免 Stage 2 使用任何文本数据"
  - "把 LLM 参数完全冻结，从而不需要指令微调"
answer: 1
explain: "InternVL-6B 更偏语义和图文对齐，VideoMAEv2-g 更偏视频运动结构；二者共同蒸馏能让视频编码器同时具备语义友好性和时序敏感性。"
```
