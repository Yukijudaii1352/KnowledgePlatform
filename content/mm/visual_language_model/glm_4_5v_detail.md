### GLM-4.5V — 用原生视觉分辨率、思考模式与课程化多域 RL 提升多模态推理

```yaml
id: glm_4_5v
name: GLM-4.5V
year: '2026'
category: frontier_2026
institution: 智谱AI
paper: —
motivation: 3D-RoPE思考模式
parent: cogvlm
description: 3D-RoPE空间感知技术，支持"思考模式"切换，科学推理能力大幅提升。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/glm_4_5v_detail.md
```

#### 📝 一句话总结
GLM-4.5V 基于 GLM-4.5-Air 的 106B-A12B MoE 语言底座，采用 ViT Encoder + MLP Projector + LLM Decoder 的多模态架构，并通过“思考/非思考”模式与 RLCS 课程化强化学习提升 STEM、GUI、长文档、视频和空间推理能力。

#### 🎯 核心要点
- 模型主干由视觉编码器、MLP projector 和 GLM-4.5-Air decoder 组成；公开技术报告标注 GLM-4.5V 为 106B 总参数、12B 激活参数
- 视觉侧以 AIMv2-Huge 初始化，使用 3D convolution 处理视频时间维，并在 ViT self-attention 中加入 2D-RoPE 以适配原生分辨率和极端长宽比
- Thinking 与 Non-Thinking 两种模式让同一模型在快速响应和长链路推理之间切换，适用于科学解题、文档理解、GUI agent 和视觉 grounding 等任务
- 训练框架分为大规模知识密集多模态预训练、标准化推理格式 SFT、多域 RLCS 强化学习三个阶段
- RLCS 使用 GRPO 目标，并按子领域难度、当前正确率与 rollout 有效性动态调整采样，避免大量“全对 batch”浪费梯度
- 奖励系统按 STEM、OCR/Chart/Doc、Grounding、Spatial、GUI、Video 等域分别设计 verifier，强调弱 verifier 会导致 reward hacking 与跨域崩塌
- 官方报告在 42 个公开视觉语言 benchmark 上评估 GLM-4.5V，并报告其在同规模开源模型中取得 SOTA 或接近 SOTA 的综合表现
- 输入元信息中的“3D-RoPE”可理解为空间/时间位置建模动机；公开报告中可核验的具体做法是视频 3D convolution、ViT 2D-RoPE、时间 index token 与原生分辨率处理

#### 🔬 深入细节
##### 核心示意图

![GLM-4.5V 系列架构图](https://arxiv.org/html/2507.01006v6/x2.png)
*图：GLM-4.1V-Thinking、GLM-4.5V 与 GLM-4.6V 的共享架构，包含 ViT Encoder、MLP Projector 和 LLM Decoder；视频帧后插入 time index token，图像/视频以原生分辨率和长宽比进入视觉编码器。*

![GLM-4.5V 强化学习收益图](https://arxiv.org/html/2507.01006v6/x1.png)
*图：官方报告展示 GLM-4.5V 相对同类模型的性能，以及 RL 对 GLM-4.5V 的性能提升。*

公开来源：技术报告 `https://arxiv.org/abs/2507.01006`，论文 HTML `https://arxiv.org/html/2507.01006v6`，官方项目 `https://github.com/zai-org/GLM-V`，官方模型卡 `https://huggingface.co/zai-org/GLM-4.5V`。

##### 核心流程代码

```python
# GLM-4.5V reasoning-centric training and inference sketch

def encode_visual_input(image_or_video):
    frames = sample_frames(image_or_video)
    if len(frames) == 1:
        frames = duplicate_single_image(frames)  # keep the video-style temporal path consistent

    # 3D conv handles temporal downsampling for videos; 2D-RoPE handles spatial coordinates.
    patch_tokens = vit_3d_patch_embed(frames, temporal_stride=2)
    patch_tokens = vit_self_attention_with_2d_rope(patch_tokens)
    visual_tokens = mlp_projector(patch_tokens)

    if is_video(image_or_video):
        visual_tokens = insert_time_index_tokens(visual_tokens)
    return visual_tokens


def train_glm45v(base_vlm, pretrain_corpus, sft_data, rl_domains):
    # Stage 1: knowledge-intensive multimodal pre-training.
    for batch in pretrain_corpus:
        x = mix_text_image_video_doc_grounding(batch)
        loss = autoregressive_lm_loss(base_vlm, x)
        update(base_vlm, loss)

    # Stage 2: SFT teaches a standardized reasoning / answer format.
    for sample in sft_data:
        prompt, answer = sample.prompt, sample.answer
        loss = next_token_loss(base_vlm(prompt), answer)
        update(base_vlm, loss)

    # Stage 3: RLCS, multi-domain GRPO with curriculum sampling.
    for step in range(num_rl_steps):
        domain = sample_domain_by_budget_and_difficulty(rl_domains)
        prompts = select_prompts_with_effective_accuracy(domain, target_range=(0.1, 0.9))
        rollouts = [sample_group(base_vlm, p, group_size=G) for p in prompts]
        rewards = domain.verifier.score(rollouts)  # rule, model judge, IoU, edit distance, etc.
        loss = grpo_loss(base_vlm, rollouts, rewards)
        update(base_vlm, loss)


def infer_glm45v(request, thinking=True):
    visual_tokens = encode_visual_input(request.media)
    mode = "thinking" if thinking else "non_thinking"
    prompt = build_prompt(request.text, visual_tokens, mode=mode)
    return glm45v_decoder.generate(prompt)
```

##### 关键公式

ViT 侧的 2D-RoPE 可以看成把 patch 的二维坐标 \((u,v)\) 显式写入 Query/Key 旋转中，而不是把任意分辨率图像强行压到固定位置表：

$$
\operatorname{Attn}(q_i,k_j,v_j)
=
\operatorname{softmax}_j
\left(
\frac{
\left(R_{\theta}(u_i,v_i)q_i\right)^\top
\left(R_{\theta}(u_j,v_j)k_j\right)
}{\sqrt{d}}
\right)v_j
$$

多域 RLCS 的策略优化沿用 GRPO 的组内相对优势思想。对同一提示 \(x\) 采样 \(G\) 个回答 \(y_i\)，先在组内归一化奖励：

$$
\widehat{A}_i=
\frac{r(x,y_i)-\operatorname{mean}(\{r(x,y_j)\}_{j=1}^{G})}
{\operatorname{std}(\{r(x,y_j)\}_{j=1}^{G})+\epsilon}
$$

再用 clipped ratio 约束策略更新幅度：

$$
\mathcal{L}_{\mathrm{GRPO}}
=
-\frac{1}{G}\sum_{i=1}^{G}
\min\left(
\rho_i\widehat{A}_i,\;
\operatorname{clip}(\rho_i,1-\varepsilon,1+\varepsilon)\widehat{A}_i
\right),
\qquad
\rho_i=\frac{\pi_\theta(y_i\mid x)}
{\pi_{\theta_{\mathrm{old}}}(y_i\mid x)}
$$

课程采样的直觉可写成基于有效样本率的重加权。若某子域 \(d\) 的近期正确率为 \(a_d\)，则样本难度权重应压低“几乎全对”和“几乎全错”的 batch：

$$
w_d \propto \operatorname{EMA}\left(a_d(1-a_d)\right)\cdot b_d
$$

其中 \(b_d\) 是人工设定或试验得到的领域预算。\(a_d(1-a_d)\) 在 \(a_d\approx 0.5\) 时最大，表示 rollout 里同时有正负样本，GRPO 才能产生有效相对优势。

##### 方法解读

GLM-4.5V 的架构延续了“视觉编码器 + 投影器 + 语言解码器”的主流 VLM 路线，但关键点在于视觉输入没有被过早规整成固定方形分辨率。报告说明它用 3D convolution 替代原始 2D convolution 来处理视频输入，时间维做 2 倍下采样；单图输入会复制成一致的时间路径。空间侧则在 ViT self-attention 中加入 2D-RoPE，同时保留原始 learnable absolute position embedding，并对可变分辨率输入做插值。这种组合让模型可以处理极端长宽比、4K 以上高分辨率图像、长文档页面和视频帧，而不是依赖裁剪后的小图。

“思考模式”解决的是推理预算分配问题。Non-Thinking 适合 OCR、简单 VQA、格式转换等低延迟场景；Thinking 则允许模型在输出最终答案前展开更长的中间推理，适合数学、科学、空间关系、GUI 操作规划和代码生成。它不是单独的模型，而是同一底座上的推理行为切换：SFT 阶段先让模型学会规范化的 reasoning/answer 格式，RL 阶段再通过可验证奖励强化长链路推理中真正带来正确答案的行为。

RLCS 的核心不是简单“多跑 RL”，而是让多域 RL 的 rollout 更有信息量。VLM 的任务分布跨度很大：STEM 题可以用数值/符号 verifier，grounding 要算 IoU，OCR 可以用 edit distance，GUI agent 可能要比较 action 与目标坐标。若所有子域按固定比例采样，训练后期会出现大量全对或全错 batch，GRPO 的组内优势接近零，既浪费计算又增加不稳定性。课程采样根据子域难度、改进潜力和当前准确率动态扩展采样，使模型持续看到“刚好可学”的问题。

奖励系统是 GLM-4.5V 报告里最值得注意的工程细节。论文明确指出，多域 VLM RL 中某个弱 verifier 会拖垮整体训练：例如 chart、multi-image QA 或 GUI verifier 被模型找到漏洞后，reward 上升但真实准确率下降，还会连带影响 STEM 等本来 reward 稳定的领域。因此 GLM-V 把 reward 拆成可复用的格式检查、boxed answer 抽取、精确匹配、Sympy 数值判断、LLM 语义判断、IoU、编辑距离和领域特定函数评估，并建议对每个 verifier 做单元测试。

与 CogVLM 的 visual expert 路线相比，GLM-4.5V 的公开报告没有强调在 LLM 每层加入独立视觉专家，而是更偏系统化地把基础视觉模型、原生分辨率处理、思考格式、RLCS 和 reward 工程串起来。也就是说，它的能力提升主要来自三层叠加：视觉输入表示更适配复杂文档/视频/空间任务，语言底座具备强 MoE 推理能力，后训练阶段用多域可验证反馈把复杂任务的 reasoning 行为推上去。

> 💡 关键：GLM-4.5V 的“空间感知 + 思考模式”不是一个单点模块，而是视觉位置建模、时间索引、标准化推理格式和多域 RLCS 共同形成的训练/推理范式。

#### 🧪 练习题

```yaml
question: "GLM-4.5V 的 RLCS 为什么要动态选择 rollout 样本？"
options:
  - "因为全对或全错的 rollout batch 几乎不给 GRPO 提供有效相对优势，难以继续学习"
  - "因为 RLCS 只训练视觉编码器，不更新语言模型"
  - "因为动态采样可以完全替代奖励系统，不再需要 verifier"
  - "因为 GLM-4.5V 只能处理固定分辨率图片"
answer: 0
explain: "GRPO 依赖同一 prompt 下多条回答的相对奖励；当样本太简单或太难时，组内奖励缺少区分度，课程采样能把训练预算集中到仍有学习信号的问题上。"
```
