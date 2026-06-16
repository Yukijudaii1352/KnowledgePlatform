### LVSum (2026)
```yaml
id: lvsum
name: LVSum
full_name: 长视频摘要基准 (Long Video Summarization)
year: '2026'
org: —
paper_url: https://arxiv.org/abs/2604.10024
category: frontier_2026
parent: hmt
motivation: 时间戳感知长视频摘要
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/lvsum_detail.md
```

#### 📝 一句话总结
LVSum 提出了一个带时间戳、区间级重要性分数和多人工参考的长视频摘要基准，用来评估 MLLM 是否既能选中重要片段，又能生成与视频/音频内容一致的摘要描述。

#### 🎯 核心要点
- 构建 72 个长视频样本，覆盖 13 个类别，视频时长 10-55 分钟，平均约 16 分钟。
- 每个视频最多包含 10 份独立人工摘要，标注内容包括开始/结束时间戳、片段描述和 1-3 的重要性分数。
- 标注流程要求总摘要区间长度控制在视频时长约 15% 以内，强调压缩能力而不是简单覆盖。
- 评测在秒级时间轴上计算 Kendall's \(\tau\) 与 Spearman's \(\rho\)，比帧级 F1 更适合长视频摘要排序。
- 引入 Content Relevance (CR) 与 Modality Coherence (MC) 两个 MLLM-as-Judge 指标，分别衡量语义覆盖与跨模态一致性。
- 对 Opus-4.5、Gemini-2.5-Pro、Qwen3-VL-235B 等代表性 MLLM 进行系统评测，暴露过度覆盖、时间错位和跨模态幻觉三类失败模式。

#### 🔬 深入细节
![LVSum CR/MC 失败模式示意](https://arxiv.org/html/2604.10024v1/figs/failure_modes_metrics_3.png)
*图：LVSum 论文中的失败模式示例，展示低 Content Relevance 与低 Modality Coherence 对传统排序指标的补充价值。*

LVSum 的核心不是提出新的摘要模型，而是把“长视频摘要”重新定义为带时间戳的 V2VT 评测问题：输入是视频及其转录文本，输出是若干个时间区间及对应描述。一个预测摘要可以写成

$$
\hat{S}=\{(\hat{s}_i,\hat{e}_i,\hat{d}_i,\hat{r}_i)\}_{i=1}^{M},\qquad
\sum_i(\hat{e}_i-\hat{s}_i)\le 0.15\,T
$$

其中 \(\hat{s}_i,\hat{e}_i\) 是秒级边界，\(\hat{d}_i\) 是片段描述，\(\hat{r}_i\) 是模型给出的重要性或排序信号，\(T\) 是视频总时长。这个约束很关键：如果没有 15% 左右的长度预算，模型可以把大量片段都放进摘要，从而在语义覆盖上看似更好，但失去“摘要”的压缩意义。

```python
# LVSum 数据构建与评测流程伪代码
videos = crawl_web_videos(min_duration_minutes=10)
category_labels = gemini_label_open_categories(videos)
taxonomy = gemini_cluster_to_13_categories(category_labels)
sampled = weighted_sample(videos, taxonomy, target_count=100)

lvsum = []
for video in sampled:
    if contains_sensitive_content(video) or violates_usage_restriction(video):
        continue
    annotations = []
    for annotator in independent_annotators(max_count=10):
        segments = annotator.watch_and_mark_segments(
            video,
            fields=["start", "end", "description", "importance_1_to_3"],
            length_budget_ratio=0.15,
        )
        if passes_manual_review(segments):
            annotations.append(segments)
    lvsum.append((video, annotations))

for model in evaluated_mllms:
    pred = model.summarize(video_frames_96, timestamped_transcript)
    saliency_pred = convert_segments_to_second_level_scores(pred)
    saliency_ref = aggregate_human_second_level_scores(annotations)
    tau = kendall_tau(saliency_pred, saliency_ref)
    rho = spearman_rho(saliency_pred, saliency_ref)
    cr = mllm_judge_content_relevance(pred, annotations)
    mc = mllm_judge_modality_coherence(pred, video_audio_intervals=pred)
```

数据集构建先从约 4000 个至少 10 分钟的视频开始，用 Gemini-2.5-Pro 给视频打开放式语义标签，再聚类成 13 个高层类别，并按类别分布进行加权采样。这个设计保留了真实长视频内容的长尾分布，同时避免只用均匀采样导致热门类别被过度代表。最终 100 个候选里，11 个因敏感或可识别内容被过滤，17 个因来源站点使用限制变化被移除，保留 72 个视频。

人工标注协议强调“先理解完整叙事，再选择关键区间”。标注者需要看完整视频，重看片段，记录开始/结束时间、简短描述和 1-3 重要性分数，并反复调整到总长度预算内。这与传统关键帧摘要不同：LVSum 监督的是连续时间区间，模型必须判断事件范围，而不是只挑单帧或生成无边界文本。

评测上，LVSum 将人工标注与模型预测都映射成秒级 saliency 序列，再计算 Kendall's \(\tau\) 和 Spearman's \(\rho\)。两者关注排序一致性：

$$
\rho = \operatorname{corr}(\operatorname{rank}(y), \operatorname{rank}(\hat{y}))
$$

其中 \(y\) 是人工重要性序列，\(\hat{y}\) 是模型预测重要性序列。论文采用秒级粒度而非短视频基准常见的帧级粒度，是因为 MLLM 的输出边界通常以秒为单位，过细的帧级评价会放大无意义的微小偏差。

CR 与 MC 解决的是排序指标看不到的问题。CR 评估生成摘要是否覆盖了参考摘要中的关键事件、对象和结果；MC 则检查模型在某个预测时间区间内写出的描述是否真的被该区间的视频帧、语音或声音支持。两者都按 1-5 分打分，直觉上可以写成：

$$
\operatorname{MC}(\hat{S})=\frac{1}{M}\sum_{i=1}^{M}
\operatorname{Judge}(\hat{d}_i,\;V_{\hat{s}_i:\hat{e}_i},\;A_{\hat{s}_i:\hat{e}_i})
$$

这能惩罚一种常见 MLLM 失败：模型选中了看似合理的时间段，文字也通顺，但文字说的人物、动作或声音并不在对应视频区间里。论文的实验证明，当前强 MLLM 往往已有较强语义理解，但仍会出现过度覆盖、时间压缩不足、描述与真实片段不一致等问题。

> 💡 关键：LVSum 的价值在于把“摘要质量”拆成时间排序、内容相关性、跨模态一致性和长度约束四个维度；这比只看 F1 或 rank correlation 更接近真实长视频摘要需求。

#### 🧪 练习题
```yaml
question: "LVSum 引入 Modality Coherence (MC) 的主要目的是什么？"
options:
  - "衡量预测摘要区间的文字描述是否被对应视频/音频内容支持"
  - "计算模型摘要与人工摘要之间的词面 BLEU 分数"
  - "增加模型输入帧数以提升视觉分辨率"
  - "用随机区间替代人工时间戳以降低标注成本"
answer: 0
explain: "MC 专门评估生成描述与预测时间区间内视觉/音频证据的一致性，用来发现跨模态幻觉和时间-描述错配。"
```
