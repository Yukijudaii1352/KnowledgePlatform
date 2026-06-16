### Gemini 3 Pro：百万 token 原生多模态推理模型

```yaml
id: gemini3pro
name: Gemini 3 Pro
full_name: Gemini 3专业版 (Gemini 3 Pro)
year: '2026'
org: Google
paper_url: https://deepmind.google/technologies/gemini/
category: frontier_2026
parent: internvideo2
motivation: 百万token超长上下文窗口
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/gemini3pro_detail.md
```

#### 📝 一句话总结

Gemini 3 Pro 是 Google 发布的原生多模态稀疏 MoE Transformer，把文本、图像、音频、视频和代码放入最高 1M token 上下文中进行统一推理，解决长视频、长文档和大代码库任务中“信息放不进模型、跨模态证据难以同时对齐”的问题。

#### 🎯 核心要点

- 架构上采用 sparse mixture-of-experts Transformer，按 token 动态路由到部分专家，解耦总参数容量与每 token 推理成本
- 原生支持文本、图像、音频、视频输入，输出文本，官方 Model Card 标注最高 1M token 输入上下文与 64K token 输出
- 训练数据覆盖公开网页文档、文本、代码、图像、音频、语音和视频；后训练包含指令微调、强化学习数据和人类偏好数据
- 面向复杂推理引入 Deep Think 模式，在推理时增强复杂问题求解能力，但官方未公开其内部搜索、验证或采样细节
- 长上下文能力使长视频问答可以把视频帧、音频/字幕、镜头级描述、检索到的网页和用户问题放在同一上下文中联合推理
- 评测覆盖 reasoning、multimodal、agentic tool use、multilingual 与 long-context，官方发布页强调 MMMU-Pro、Video-MMMU、Terminal-Bench、SWE-bench 等能力
- 与 InternVideo2 这类显式视频编码器路线相比，Gemini 3 Pro 的关键在于把视频理解并入通用原生多模态大模型和长上下文推理栈

#### 🔬 深入细节

![Gemini 3 Pro 官方评测总览](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini_3_table_final_HLE_Tools_on.gif)
*图：Google 官方 Gemini 3 发布页给出的评测总览。Google 未公开 Gemini 3 Pro 的完整内部架构图，因此这里用官方发布图作为模型能力总览，并在下文基于 Model Card 解读公开可确认的架构与流程。*

Gemini 3 Pro 的公开 Model Card 把它定义为“natively multimodal, reasoning models”，而不是在纯文本 LLM 外面外挂一个视觉编码器的单任务 Video-LLM。对视频理解来说，这意味着视频帧、音频、字幕、用户问题、工具返回结果和代码片段最终都进入同一个推理上下文，由同一个模型栈完成跨模态证据聚合。官方没有披露视频 tokenizer、帧采样策略、位置编码或专家数量；因此更稳妥的理解是：Gemini 3 Pro 公开层面的算法贡献在于把 MoE Transformer、原生多模态预训练、后训练推理能力和 1M context 组合成一个可产品化的统一模型。

稀疏 MoE 是 Model Card 明确披露的核心架构。普通 Transformer 的每个 token 都经过同一组 FFN 参数，计算量随模型宽度直接增长；MoE 层则用路由器为每个 token 选择少数专家，只激活一部分参数。可以抽象为：

$$
p(e \mid h_t)=\operatorname{softmax}(W_r h_t)_e,\quad
\mathcal{E}_t=\operatorname{TopK}_e\,p(e \mid h_t)
$$

$$
\operatorname{MoE}(h_t)=
\sum_{e\in\mathcal{E}_t}
p(e \mid h_t)\operatorname{FFN}_e(h_t)
$$

其中 \(h_t\) 是第 \(t\) 个 token 的隐藏状态，\(\mathcal{E}_t\) 是被激活的专家集合。这个设计对多模态尤其重要：语言、代码、图像 patch、音频片段和视频帧 token 的统计结构不同，动态路由允许不同 token 走向更合适的专家，同时不要求每个 token 都跑完整模型容量。

百万 token 上下文是它在长视频任务里的直接动机。传统长视频问答常见做法是先切片、摘要或检索，再把少量片段喂给模型；这会把“哪些片段重要”的判断提前交给外部系统，容易丢掉远距离线索。Gemini 3 Pro 的 1M context 让工程流程可以更接近“把完整材料交给模型”：采样帧序列、ASR 字幕、镜头边界、OCR、音频事件、用户问题、检索结果都作为同一个上下文 \(X\) 输入：

$$
X=[x_{\text{text}},x_{\text{video}},x_{\text{audio}},x_{\text{image}},x_{\text{code}},x_{\text{tool}}],\quad |X|\le 10^6
$$

$$
p_\theta(y\mid X)=\prod_{i=1}^{T}p_\theta(y_i\mid y_{<i},X),\quad T\le 64K
$$

这种能力不等于“所有 1M token 都会被完美使用”。更准确的说法是，它把瓶颈从上下文容量转移到长距离证据选择和多跳推理质量：模型需要在海量上下文中找到相关帧、对齐语音和画面，再把多个时刻的证据组合成答案。因此官方评测方法把 long-context、multimodal 和 agentic tool use 分开报告，是在区分“能装下材料”“能读懂多模态材料”和“能持续执行任务”三种能力。

训练流程方面，Model Card 只公开了高层数据和后训练类型：预训练覆盖网页、文本、代码、图像、音频和视频；后训练包含 instruction tuning、reinforcement learning data 和 human-preference data，并强调可利用多步推理、问题求解和定理证明数据。可以把公开流程抽象成三段：先做大规模多模态自监督/自回归预训练，学会跨模态表征和 next-token prediction；再用指令数据把模型对齐到问答、代码、工具调用和视频理解等交互任务；最后用偏好或奖励信号约束回答质量、安全性与推理风格。

$$
\mathcal{L}_{\text{pretrain}}
=-\sum_{(X,Y)\in\mathcal{D}_{mm}}
\sum_{t=1}^{|Y|}
\log p_\theta(y_t\mid y_{<t},X)
$$

$$
\max_\theta\ 
\mathbb{E}_{\tau\sim \pi_\theta}[R(\tau)]
-\beta\,D_{\mathrm{KL}}(\pi_\theta\|\pi_{\mathrm{ref}})
$$

第二个式子是对偏好/强化学习后训练的通用抽象，不代表 Google 公开了 Gemini 3 Pro 的具体 RL 算法。它表达的直觉是：在保持模型不偏离参考策略太远的同时，让回答在有用性、指令遵循、安全性、事实性和多步推理上获得更高奖励。

```python
# Gemini 3 Pro 公开资料可支持的长视频推理流程抽象
def gemini3pro_long_video_qa(video, question, tools=None, deep_think=False):
    # 1. 多模态上下文构造：具体采样器/tokenizer 未公开
    visual_tokens = encode_video_frames(video.frames)       # frames, OCR, spatial cues
    audio_tokens = encode_audio(video.audio)                # speech and non-speech events
    text_tokens = tokenize([video.subtitles, question])
    context = pack_context(
        text=text_tokens,
        video=visual_tokens,
        audio=audio_tokens,
        max_tokens=1_000_000,
    )

    # 2. 原生多模态 MoE Transformer：每个 token 动态选择少量专家
    hidden = context
    for layer in transformer_layers:
        hidden = self_attention(hidden)                     # long-context evidence mixing
        hidden = sparse_moe_ffn(hidden, route="top_k")       # expert routing per token

    # 3. 可选推理增强：Deep Think 的内部算法未公开，只能抽象为更高推理预算
    if deep_think:
        hidden = allocate_more_inference_budget(hidden)

    # 4. 生成答案，必要时通过工具补充外部证据
    answer = autoregressive_decode(hidden, max_output_tokens=64_000)
    if tools and answer.requests_tool_call:
        observation = tools.call(answer.tool_name, answer.tool_args)
        return gemini3pro_long_video_qa(
            video=video,
            question=question + format_observation(observation),
            tools=tools,
            deep_think=deep_think,
        )
    return answer
```

从视频理解谱系看，InternVideo2 的路线是“先训练强视频编码器，再接入 LLM”，优势是视频表征、检索和时序定位能力更透明；Gemini 3 Pro 的路线则更像“把视频作为通用多模态上下文的一种输入”，优势是能直接处理长材料、工具调用、代码生成和跨文档推理。对于长视频 QA，后者可以一次性接纳更多上下文，但解释性较弱：外部用户通常看不到帧级 attention、专家路由或中间证据选择，只能通过提示结构、引用要求、分段检查和工具日志来约束输出。

在工程使用上，1M context 不应被理解为可以无脑堆所有内容。更稳健的流程是保留原始视频证据，同时加入结构化索引：镜头时间戳、ASR 段落、OCR 文本、人物/物体候选、事件标签和用户问题。这样模型既能利用超长上下文做全局回看，又能在回答中定位到具体证据。对于“某人什么时候拿起物体”“前后两段对话是否矛盾”“整部讲座如何组织成学习材料”这类任务，长上下文提供的是统一证据池，MoE 多模态推理负责把池中的远距离线索连起来。

> 💡 关键：Gemini 3 Pro 的可公开技术核心不是单一新损失函数，而是原生多模态、稀疏 MoE、长上下文和推理后训练的系统组合；其中许多内部细节未公开，解读时应把官方披露与合理抽象区分开。

公开资料：

- Google DeepMind Gemini 3 Pro Model Card: https://deepmind.google/models/model-cards/gemini-3-pro
- Google Gemini 3 发布页: https://blog.google/products-and-platforms/products/gemini/gemini-3/
- Gemini API Long Context 文档: https://ai.google.dev/gemini-api/docs/long-context
- Gemini 3 Pro Evaluation Methodology: https://deepmind.google/models/evals-methodology/gemini-3-pro

#### 🧪 练习题

```yaml
question: "Gemini 3 Pro 的 sparse MoE Transformer 对长视频多模态理解最直接的作用是什么？"
options:
  - "把所有视频帧压缩成一个固定类别标签，避免语言推理"
  - "让每个 token 动态路由到少量专家，在扩大模型容量的同时控制每 token 计算成本"
  - "保证 1M token 中任意远距离证据都能被完美召回"
  - "把视频任务完全转化为纯字幕检索，不需要视觉或音频输入"
answer: 1
explain: "MoE 的核心是按 token 激活部分专家，从而解耦总容量和单 token 计算；它有利于多模态 token 的专业化处理，但不等于自动解决所有长距离推理问题。"
```
