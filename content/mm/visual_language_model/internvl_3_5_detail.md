### InternVL 3.5 — 用 Cascade RL、ViR 与 DvD 同时提升推理能力和推理效率

```yaml
id: internvl_3_5
name: InternVL 3.5
year: '2025'
category: connector
institution: 上海AI Lab
paper: arXiv
motivation: 级联RL逻辑对齐
parent: internvl_2_5
description: 引入级联式强化学习进行逻辑对齐，采用解耦部署架构（DvD），响应速度提升4倍。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/internvl_3_5_detail.md
```

#### 📝 一句话总结
InternVL 3.5 在既有 ViT-MLP-LLM 多模态架构上加入 Cascade RL，把离线 MPO 的稳定热启动和在线 GSPO 的自生成探索串联起来解决复杂视觉推理对齐问题；同时通过 ViR 动态压缩视觉 token、DvD 解耦视觉与语言部署，使模型在保持性能的同时显著降低推理延迟。

#### 🎯 核心要点
- 维持 InternVL 系列的 “ViT-MLP-LLM” connector 范式，视觉侧使用 InternViT-300M/6B，语言侧覆盖 Qwen3 与 GPT-OSS，模型规模从 1B 到 241B-A28B
- 训练流程分为原生多模态预训练、SFT、Cascade RL，并为 Flash 版本追加 Visual Consistency Learning 与 router training
- Cascade RL 先用离线 MPO 训练偏好/质量/生成三类损失，再用在线 GSPO 基于模型自采样 rollout 继续提升推理上限
- GSPO 使用同一 query 下多候选 response 的归一化 reward 作为优势，并用序列级几何均值 ratio 代替逐 token ratio
- Visual Resolution Router (ViR) 对图像 patch 按语义信息量选择 \(1/4\) 或 \(1/16\) 压缩率，使高信息 patch 保留更多视觉 token
- Visual Consistency Learning (ViCO) 用 KL 约束不同视觉压缩率下的输出分布，让 Flash 版本压缩视觉 token 时尽量保持原模型行为
- Decoupled Vision-Language Deployment (DvD) 将 ViT/MLP/ViR 与 LLM 分别部署在视觉服务器和语言服务器，用异步流水线重叠视觉编码、特征传输和语言解码
- 公开来源显示 InternVL3.5 相比 InternVL3 最高获得 +16.0% 推理性能提升，并在 DvD+ViR 设置下报告最高 4.05x 推理加速

#### 🔬 深入细节
##### 核心示意图

![InternVL3.5 总体架构](https://arxiv.org/html/2508.18265v1/x2.png)
*图：InternVL3.5 仍采用 ViT-MLP-LLM 主干；InternVL3.5-Flash 在视觉 token 压缩路径上加入 ViR，为不同 patch 选择不同压缩率。*

![InternVL3.5 DvD 部署框架](https://arxiv.org/html/2508.18265v1/x4.png)
*图：DvD 将视觉模块和语言模块拆到不同服务，视觉编码与 LLM prefill/decoding 可以异步重叠执行。*

公开来源：论文 `https://arxiv.org/abs/2508.18265`，论文 HTML `https://arxiv.org/html/2508.18265v1`，官方项目 `https://github.com/OpenGVLab/InternVL`。

##### 核心流程代码

```python
# InternVL3.5: post-training, Flash compression, and DvD inference sketch

def train_internvl35(model, sft_data, mmpr_pairs, online_queries, vico_data):
    # 1) Native pretraining is inherited from the InternVL3-style ViT-MLP-LLM setup.
    # 2) SFT teaches instruction following, thinking traces, GUI/embodied/SVG skills.
    train_sft(model, sft_data, max_context=32_000)

    # 3) Cascade RL, stage A: offline MPO warm-up from existing preference pairs.
    for batch in mmpr_pairs:
        loss_pref = dpo_loss(model, batch.chosen, batch.rejected)
        loss_quality = bco_loss(model, batch.quality_labels)
        loss_gen = lm_loss(model, batch.reference_responses)
        loss_mpo = wp * loss_pref + wq * loss_quality + wg * loss_gen
        update(model, loss_mpo)

    # 4) Cascade RL, stage B: online GSPO on model-sampled rollouts.
    for query in online_queries:
        responses = sample_group(model.old_policy, query, group_size=G)
        rewards = score_with_rule_or_reward_model(query, responses)
        advantages = normalize_within_query(rewards)
        loss_gspo = clipped_sequence_policy_loss(model, query, responses, advantages)
        update(model, -loss_gspo)  # maximize clipped objective

    # 5) ViCO: make compressed visual tokens imitate the full-resolution policy.
    ref = freeze(copy_model(model))
    for sample in vico_data:
        xi = random_choice([1 / 4, 1 / 16])
        compressed_image = compress_visual_tokens(sample.image, rate=xi)
        loss_vico = kl(ref(sample.image), model(compressed_image))
        update(model, loss_vico)

    # 6) Router training: freeze MLLM, train ViR to select compression per patch.
    freeze(model.vit, model.mlp, model.llm)
    for patch in visual_patches(vico_data):
        r = vico_loss(patch, rate=1 / 16) / vico_loss(patch, rate=1 / 4)
        target = 1 if r >= dynamic_percentile_threshold() else 0
        update(model.visual_resolution_router, cross_entropy(router(patch), target))


def dvd_inference(request):
    # Vision server: high-throughput image-side batching.
    visual_features = vision_server.encode_with_vit_mlp_vir(request.images)
    send_bf16_features_to_language_server(visual_features)

    # Language server: only LLM prefill/decoding, overlapped with vision work.
    prompt = fuse_text_and_visual_features(request.text, visual_features)
    return language_server.decode(prompt)
```

##### 关键公式

离线阶段使用 Mixed Preference Optimization，将偏好学习、质量约束和生成保持合为一个目标：

$$
\mathcal{L}_{\text{MPO}}
=w_p\mathcal{L}_p+w_q\mathcal{L}_q+w_g\mathcal{L}_g
$$

在线 GSPO 对同一输入 \(x\) 采样 \(G\) 个回答，先在组内标准化 reward 得到优势：

$$
\widehat{A}_i=
\frac{r(x,y_i)-\operatorname{mean}(\{r(x,y_i)\}_{i=1}^{G})}
{\operatorname{std}(\{r(x,y_i)\}_{i=1}^{G})}
$$

然后用序列级几何均值 ratio 做裁剪策略优化：

$$
s_i(\theta)=
\left(
\frac{\pi_{\theta}(y_i\mid x)}
{\pi_{\theta_{\text{old}}}(y_i\mid x)}
\right)^{1/|y_i|}
=
\exp\left(
\frac{1}{|y_i|}\sum_{t=1}^{|y_i|}
\log\frac{\pi_{\theta}(y_{i,t}\mid x,y_{i,<t})}
{\pi_{\theta_{\text{old}}}(y_{i,t}\mid x,y_{i,<t})}
\right)
$$

$$
\mathcal{L}_{\mathrm{GSPO}}(\theta)=
\mathbb{E}\left[
\frac{1}{G}\sum_{i=1}^{G}
\min\left(
s_i(\theta)\widehat{A}_i,\;
\operatorname{clip}(s_i(\theta),1-\varepsilon,1+\varepsilon)\widehat{A}_i
\right)
\right]
$$

Flash 版本的 ViCO 用未压缩参考模型约束压缩视觉输入下的策略输出：

$$
\mathcal{L}_{\text{ViCO}}=
\mathbb{E}_{\xi\sim\mathcal{R}}
\left[
\frac{1}{N}\sum_{i=1}^{N}
\mathrm{KL}\left(
\pi_{\theta_{\mathrm{ref}}}(y_i\mid y_{<i},I)
\;\|\;
\pi_{\theta_{\mathrm{policy}}}(y_i\mid y_{<i},I_{\xi})
\right)
\right]
$$

其中 \(\xi\in\{\frac{1}{4},\frac{1}{16}\}\)。Router 训练时用压缩带来的相对损失增长给 patch 打标签：

$$
r_i=
\frac{\mathcal{L}_{\text{ViCO}}(y_i\mid I_{1/16})}
{\mathcal{L}_{\text{ViCO}}(y_i\mid I_{1/4})},
\qquad
y_i^{\text{router}}=
\begin{cases}
0,& r_i<\tau\\
1,& r_i\ge\tau
\end{cases}
$$

##### 方法解读

InternVL3.5 的主要矛盾不是“如何再接一个更大的 LLM”，而是如何让多模态模型在复杂数学、科学、图表和视觉推理任务上形成更稳定的长链路推理行为。纯 SFT 能注入高质量 thinking 数据，但它主要学习正样本分布，缺少显式压低坏答案的信号；纯在线 RL 又昂贵、采样噪声大，尤其在多模态高分辨率输入和大模型规模下 rollout 成本很高。Cascade RL 的设计就是把这两个阶段拆开：先用已有偏好数据做离线 MPO，把模型从 SFT 分布推到更好的区域，再让在线 GSPO 在这个更强的初始策略上继续采样和优化。

离线 MPO 的直觉是“三种约束同时拉住模型”。\(\mathcal{L}_p\) 负责偏好方向，通常对应 chosen 优于 rejected；\(\mathcal{L}_q\) 负责质量判别，避免模型只学会形式上偏好某类输出；\(\mathcal{L}_g\) 维持语言建模能力，防止偏好优化过度破坏基础生成分布。这样做比只做 DPO 更保守，但更适合 MLLM：图像理解、OCR、数学推理和对话格式都需要保留，不能为了某一类 reward 把通用能力牺牲掉。

在线 GSPO 与常见 PPO/GRPO 的关键差异在于 ratio 的粒度。它不用逐 token 的重要性比率直接驱动整个序列，而是把 per-token log ratio 求平均后指数化，形成 \(s_i(\theta)\)。这相当于用“整段回答的平均策略变化”作为裁剪对象，减少长答案因为少数 token ratio 极端而导致的优化不稳定。优势 \(\widehat{A}_i\) 在同一个 query 的多条回答内部标准化，使 reward 更像相对排序信号：同题下更好的推理链被增强，更差的推理链被压低。

ViR 解决的是另一个瓶颈：动态高分辨率视觉输入会把很多 patch 送入 ViT 和 LLM，但并不是每个 patch 都同等重要。文档、图表、公式或小目标区域需要较高视觉 token 密度，背景或低信息区域可以更强压缩。ViCO 先让模型适应 \(1/4\) 与 \(1/16\) 两种压缩率，并通过 KL 让压缩输入下的输出贴近 full token 参考模型；随后 router 用压缩前后损失比 \(r_i\) 学习哪些 patch 不能压缩。这个监督来自模型自身输出分布，而不是人工标注区域，因此能规模化应用到 SFT 数据。

DvD 则是工程层面的 connector 优化。传统 MLLM 推理把 ViT、MLP、LLM 串行放在同一服务路径里，高分辨率或多图输入会阻塞 LLM prefill，语言解码又会让视觉 GPU 利用率不稳定。DvD 把视觉侧作为独立服务批量编码图像，再把 BF16 视觉特征单向传给语言服务；语言服务只负责融合视觉 token 与文本上下文并解码。由于视觉编码高度并行、LLM 解码强依赖 KV cache 和内存带宽，二者拆开后可以分别调度硬件，减少互相等待。

与 InternVL2.5/InternVL3 相比，InternVL3.5 的贡献不只是“更大模型 + 更多数据”。它把 post-training、视觉 token 预算和线上部署三个层面串起来：Cascade RL 提高复杂推理能力，ViR/ViCO 降低视觉 token 成本，DvD 把视觉与语言计算重叠起来。这个组合使它更像一个可落地的多模态系统方案，而不是单一模型架构改动。

> 💡 关键：Cascade RL 提升的是输出空间的推理分布，ViR/ViCO 优化的是输入视觉 token 的预算，DvD 优化的是服务端执行图；三者分别对应能力、输入成本和系统吞吐。

#### 🧪 练习题

```yaml
question: "InternVL3.5 为什么要先做离线 MPO 再做在线 GSPO？"
options:
  - "离线 MPO 用已有偏好样本稳定热启动，在线 GSPO 再用模型自采样 rollout 提高性能上限"
  - "离线 MPO 只训练视觉编码器，在线 GSPO 只训练语言模型"
  - "离线 MPO 负责压缩视觉 token，在线 GSPO 负责把 ViT 部署到独立服务器"
  - "离线 MPO 会删除所有负样本，在线 GSPO 再恢复负样本"
answer: 0
explain: "Cascade RL 的核心是把高效稳定的离线偏好优化放在前面，再用在线采样继续细化策略分布；这降低直接在线 RL 的成本和不稳定性。"
```
