### Universal VTG MLLM：用生成式 MLLM 做通用视频时序定位

```yaml
id: universal_vtg_mllm
name: Universal VTG MLLM
full_name: 通用时序定位大模型 (Universal VTG with Generative MLLM)
year: '2026'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/5d2e24df9cfaad3189833b819c40b392-Abstract-Conference.html
category: frontier_2026
parent: internvideo2
motivation: 生成式大模型实现通用定位
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/universal_vtg_mllm_detail.md
```

#### 📝 一句话总结

Universal VTG MLLM 对应 UniTime，提出用生成式多模态大模型直接输出视频时间区间，并通过时间戳 token、adaptive frame scaling 和 coarse-to-fine 推理解决不同领域、不同视角、不同长度视频的通用时序定位问题。

#### 🎯 核心要点

- 提出 UniTime：面向 universal video temporal grounding 的生成式 MLLM，而不是只服务单一数据集的判别式检索器
- 用 timestamp-interleaved sequence 把时间戳文本 token 插入视频 token 序列，让 LLM 直接生成可解析的时间边界
- 采用 adaptive frame scaling：根据视频帧数动态调整每帧 token 预算，短视频保留高空间分辨率，长视频降低空间粒度
- 对超长视频使用多阶段 coarse-to-fine inference：先粗粒度找候选片段，再在候选范围内细粒度重采样
- 训练目标是标准自回归负对数似然，只监督目标时间文本，不需要额外边界回归头
- 使用 video-centric training：同一视频的多个查询和对应时间段尽量合并进一次前向，减少重复视频编码开销
- 在 Ego4D-NLQ、TACoS、Charades-STA、ActivityNet Captions、QVHighlights 等公开时序定位基准上评估，并作为长视频 QA 的前置检索器

#### 🔬 深入细节

![UniTime 架构图](https://lzq5.github.io/UniTime/resources/arch.png)
*图：UniTime 通过 adaptive frame scaling 构造多尺度视频输入，并在视觉 token 间插入时间戳 token，使生成式 MLLM 能从粗到细输出时间区间。项目页为 https://lzq5.github.io/UniTime/。*

传统视频时序定位通常是判别式框架：先编码视频和文本，再对候选窗口打分，或用 DETR 类查询回归边界。这类方法在单一数据集内很有效，但面对第一人称/第三人称、电影/烹饪/日常活动、几十秒到数小时的视频时，泛化会变差。UniTime 的目标是把时序定位改造成 MLLM 可处理的生成问题：

$$
Y=\Phi_{\text{UniTime}}(V,T,Q),\qquad
Y=\{(s_1,e_1),\ldots,(s_K,e_K)\}
$$

其中 \(V=\{f_1,\ldots,f_{N_f}\}\) 是视频帧，\(T=\{t_1,\ldots,t_{N_f}\}\) 是对应时间戳，\(Q\) 是自由形式查询。模型输出不再是隐空间分数，而是类似 `From 15.0s to 18.0s` 的文本答案，之后可直接解析为时间边界。

第一个核心机制是 adaptive frame scaling。对于固定总视觉 token 预算 \(N_{\text{total}}\)，如果视频帧数为 \(N_f\)，每帧可分配的 token 近似为：

$$
N_{\text{res}}=\left\lfloor\frac{N_{\text{total}}}{N_f}\right\rfloor
$$

当 \(N_f\) 较小，模型可以通过 resize 保留更高空间分辨率；当 \(N_f\) 较大，则在特征层做 token compression，以牺牲部分空间细节换取更长时间覆盖；当 \(N_f\) 超过长视频阈值，则把视频分成多个 clip 做分治处理。这个设计比固定抽帧更稳，因为固定抽帧会在长视频里丢失大量动作细节，在短视频里又浪费可用分辨率。

第二个机制是 timestamp-interleaved sequence。对细粒度定位，可以在每个帧特征前插入时间戳；对粗粒度定位，可以在每个 segment 前插入一个代表该 segment 起点的时间戳：

$$
S=[T_1;S_1;T_2;S_2;\cdots;T_{N_s};S_{N_s};Q],
\qquad
T_i=\phi_{\text{tokenizer}}(\tau_{s_i})
$$

这里 \(S_i\) 是第 \(i\) 个视频 segment 的视觉 token 序列，\(T_i\) 是文本时间戳 token。时间戳作为普通文本 token 进入语言空间，不需要学习额外的时间 embedding 对齐；LLM 在生成答案时可以“指向”它已经读过的时间文本。这也是 UniTime 相比纯视觉位置编码更容易外推到不同视频长度的原因。

```python
# UniTime / Universal VTG MLLM 推理流程伪代码
def unitime_ground(video, query, model, token_budget, long_threshold):
    if num_frames(video) <= long_threshold:
        frames = sample_frames(video)
        visual_tokens = adaptive_frame_scaling(frames, token_budget)
        seq = interleave_timestamps(visual_tokens, timestamps(frames), query)
        return parse_span(model.generate(seq))

    # 超长视频：先粗后细
    clips = split_video(video, max_frames=long_threshold)
    coarse_candidates = []
    for clip in clips:
        coarse_frames = sparse_sample(clip)
        coarse_tokens = adaptive_frame_scaling(coarse_frames, token_budget)
        coarse_seq = interleave_segment_timestamps(
            coarse_tokens,
            segment_start_times(coarse_frames),
            query,
        )
        coarse_candidates.append(parse_span(model.generate(coarse_seq)))

    merged = aggregate_candidates(coarse_candidates)
    while needs_refinement(merged):
        local_video = crop(video, merged)
        fine_frames = dense_sample(local_video)
        fine_tokens = adaptive_frame_scaling(fine_frames, token_budget)
        fine_seq = interleave_timestamps(fine_tokens, timestamps(fine_frames), query)
        merged = parse_span(model.generate(fine_seq))

    return merged
```

训练上，UniTime 没有引入专门的边界回归损失，而是沿用生成式 MLLM 的自回归目标。给定构造好的输入序列 \(S\) 和目标答案 token \(Y=(y_1,\ldots,y_{N_y})\)，只在答案部分计算负对数似然：

$$
\mathcal{L}(S,Y)
=-\sum_{i=1}^{N_y}\log P(y_i\mid S,y_{<i};\theta)
$$

这让模型的定位能力和语言生成能力共享同一个训练接口：同样可以处理描述式查询、问题式查询，也可以在下游 VideoQA 中先检索相关片段，再交给 QA 模型回答。相比为每种数据集设计不同 head，生成式接口更适合统一多任务、多领域、多时长的 VTG 数据。

为了提高训练效率，UniTime 使用 video-centric training。很多 VTG 数据集里，一个视频对应多个查询；传统 query-centric 采样会反复加载和编码同一个视频。UniTime 尽量把同一视频的多个 \((Q^{(k)},Y^{(k)})\) 拼到一次训练样本中，使视觉 token 只编码一次，随后让 LLM 对多个查询生成多个时间答案。这对长视频尤其重要，因为视频 token 是主要计算瓶颈。

UniTime 与 InternVideo2 类视频基础模型的差异在于任务接口。InternVideo2 更强调大规模视频表示学习和多模态对齐，可作为强视频特征或预训练 backbone；UniTime 则把时间戳文本化，并用 MLLM 的生成能力直接输出时间范围。它牺牲了一部分判别式模型的轻量推理优势，但换来更强的查询表达能力、跨数据集泛化能力和与长视频 QA 流水线的自然衔接。

> 💡 关键：UniTime 的“通用”来自三件事叠加：输入粒度随视频长度自适应，时间戳以文本 token 暴露给 LLM，超长视频通过 coarse-to-fine 推理逐步缩小搜索范围。

#### 🧪 练习题

```yaml
question: "UniTime 为什么要把时间戳 token 与视频 token 交错插入？"
options:
  - "让 LLM 在语言空间中直接读取并生成时间边界，减少额外时间 embedding 对齐需求"
  - "替代视觉编码器，使模型只处理字幕"
  - "把所有视频都压缩成一个固定长度向量"
  - "强制模型只输出单帧分类结果"
answer: 0
explain: "时间戳作为文本 token 与视觉证据相邻出现，LLM 生成答案时可直接引用这些时间线索，从而更稳定地输出 start/end。"
```
