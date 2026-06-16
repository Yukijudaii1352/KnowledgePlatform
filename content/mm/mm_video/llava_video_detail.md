### LLaVA-Video：用大规模合成数据提升视频指令模型

```yaml
id: llava_video
name: LLaVA-Video
full_name: 视频指令模型 (LLaVA-Video)
year: '2024'
org: ByteDance
paper_url: https://arxiv.org/abs/2410.02713
category: video_llm
parent: videollama
motivation: 大规模合成数据提升性能
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/llava_video_detail.md
```

#### 📝 一句话总结

LLaVA-Video 通过构建 LLaVA-Video-178K 合成视频指令数据集，并配合 SlowFast 式视频 token 分配策略，解决高质量视频指令数据稀缺和长视频帧数受上下文窗口限制的问题。

#### 🎯 核心要点

- 提出 LLaVA-Video-178K：178,510 个视频、约 2K 小时内容、1.3M instruction samples
- 数据覆盖三类任务：178K detailed captions、960K open-ended QA、196K multiple-choice QA
- 从十类主流视频源构建视频池，优先选择动态、未裁剪、情节完整的视频，而不是大量静态短片
- 用 GPT-4o 进行合成标注，采用 1 FPS 密集采样和三层递归 caption 生成流程支持任意长度视频
- 基于 detailed caption 生成 16 类视频问答，并通过去重与拒答模式过滤提升 QA 可用性
- 在 LLaVA-OneVision 基础上混合视频指令数据与图像指令数据微调，形成 LLaVA-Video 模型族
- 引入 \(\text{LLaVA-Video}_{\mathtt{SlowFast}}\) 表示，用更多帧加更少单帧 token 的方式提升时序覆盖

#### 🔬 深入细节

![LLaVA-Video 三层数据生成流程](https://llava-vl.github.io/blog/2024-09-30-llava-video/static/images/llava_video_data_creation_pages-to-jpg-0001.jpg)
*图：LLaVA-Video-178K 的三层递归 caption 生成流程，短片段描述、中段摘要和全局描述互相提供历史上下文。*

![LLaVA-Video 视频表示](https://llava-vl.github.io/blog/2024-09-30-llava-video/static/images/llava_video_arch_page-0001.jpg)
*图：LLaVA-Video 的视频表示设计，不同帧使用不同数量的视觉 token，以在上下文预算内覆盖更多时间点。*

LLaVA-Video 的核心贡献首先是数据工程。论文认为 Web 级原始视频很难直接变成高质量 instruction data：字幕常常不描述画面，人工标注又太贵，已有合成数据的帧采样过稀会遗漏细节。因此它构建 LLaVA-Video-178K，形式上可以看作：

$$
\mathcal{D}_{178K}
=\{(v_i, c_i, Q_i^{\text{open}}, Q_i^{\text{mc}})\}_{i=1}^{178510}
$$

其中 \(c_i\) 是详细视频描述，\(Q_i^{\text{open}}\) 是开放问答集合，\(Q_i^{\text{mc}}\) 是多选问答集合。数据总量约为：

$$
|\mathcal{C}|=178K,\qquad
|\mathcal{Q}^{\text{open}}|=960K,\qquad
|\mathcal{Q}^{\text{mc}}|=196K
$$

数据生成流程采用密集时间覆盖。模型以 1 FPS 抽帧，但不是把所有帧一次性塞给 GPT-4o，而是递归维护三层描述：Level-1 每 10 秒描述当前片段，Level-2 每 30 秒总结近期情节，Level-3 在视频末尾综合全局内容。这样做的直觉是，长视频标注需要“滚动记忆”：局部描述保证细节，周期性摘要控制上下文长度，最终描述整合完整剧情。

```python
# LLaVA-Video-178K 合成标注流程伪代码
for video in selected_dynamic_untrimmed_videos:
    frames = sample_frames(video, fps=1)
    level1_buffer = []
    level2_summary = ""

    for clip in split(frames, seconds=10):
        level1 = gpt4o_describe(
            current_frames=clip,
            recent_level1=level1_buffer,
            latest_level2=level2_summary,
        )
        level1_buffer.append(level1)

        if elapsed_seconds(clip) % 30 == 0:
            level2_summary = gpt4o_summarize(
                recent_level1=last_k(level1_buffer, k=3),
                previous_level2=level2_summary,
            )
            level1_buffer = keep_unsummarized(level1_buffer)

    detailed_caption = gpt4o_global_caption(
        remaining_level1=level1_buffer,
        latest_level2=level2_summary,
    )

    qa_pairs = []
    for question_type in sixteen_video_qa_types:
        qa = gpt4o_generate_qa(detailed_caption, question_type, in_context_examples=3)
        if qa is not None and not is_duplicate(qa) and not starts_with_refusal(qa.answer):
            qa_pairs.append(qa)

    save(video, detailed_caption, qa_pairs)
```

问答生成建立在 detailed caption 之上，而不是直接从稀疏帧中硬生成问题。每个 question type 最多生成一个 QA，并使用三条同类型 in-context examples 约束输出风格；过滤阶段删除语义重复问题，也丢弃以“未提及”“未显示”等拒答模板开头的答案。这个设计把 GPT-4o 的能力用于生成“可训练的监督信号”，同时尽量避免无信息或不忠实样本进入指令微调。

模型训练侧，LLaVA-Video 在 LLaVA-OneVision 的基础上加入视频数据，并混合已有图像指令数据。官方项目页给出的联合训练集约包含 1.6M video-language samples 和 1.1M image-language pairs，其中视频侧包括 LLaVA-Video-178K 以及 ActivityNet-QA、NExT-QA、PerceptionTest、LLaVA-Hound-255K 等数据。其重点不在于发明一个全新 LLM 架构，而是验证：高质量、细粒度、动态视频的合成 instruction data 可以显著提升开源 video LMM。

第二个方法点是 SlowFast 式视频表示。简单表示会给每一帧相同数量的 token，但 LLM 上下文和 GPU 显存固定，增加帧数就会线性增加 token。LLaVA-Video 将视频表示写作：

$$
\mathcal{V}=(T,M,s,p)
$$

其中 \(T\) 是帧数，\(M\) 是每帧原始视觉 token 数，\(s\) 是 slow frame 的抽样步长，\(p\) 是池化率。每隔 \(s\) 帧选为 slow group，其余帧是 fast group：

$$
\mathcal{S}=\{f_t\mid t\bmod s=0\}, \qquad
\mathcal{F}=\{f_t\mid t\bmod s\neq 0\}
$$

slow frames 使用 \(p\times p\) pooling，fast frames 使用 \(2p\times 2p\) pooling，因此总 token 近似为：

$$
N_{\text{tokens}}
=|\mathcal{S}|\frac{M}{p^2}
+|\mathcal{F}|\frac{M}{(2p)^2}
$$

这个公式表达了 LLaVA-Video 的取舍：关键帧保留更细视觉分辨率，非关键帧保留较粗时间证据。相比只用少量高分辨率帧，SlowFast 表示更适合动态视频，因为许多问题依赖“什么时候发生”“动作如何变化”，需要覆盖更多时间点；相比盲目增加帧数，它又通过降低 fast frames 的 token 密度控制总上下文成本。

LLaVA-Video 与 VideoLLaMA 的差异也很清楚。VideoLLaMA 强调音频-视觉双分支架构，LLaVA-Video 则把主要火力放在数据质量、时间覆盖和视频 token 预算上。它说明在 2024 年的 Video-LMM 竞争中，性能提升不只来自更复杂的连接器，也来自更贴近视频本质的训练监督：动态、未裁剪、密集帧、长程描述、多任务问答。

> 💡 关键：LLaVA-Video 把“合成数据”从简单 caption 扩展为层级描述和多类型视频 QA，并用 SlowFast token 分配让模型在有限上下文里看见更多时间过程。

#### 🧪 练习题

```yaml
question: "LLaVA-Video 的 SlowFast 视频表示主要解决什么问题？"
options:
  - "让音频和视频在同一个 ImageBind 空间中对齐"
  - "在固定上下文和显存预算下，用更多帧覆盖时间变化，同时减少非关键帧的单帧 token 数"
  - "把视频全部转写成字幕，避免视觉编码"
  - "只保留第一帧和最后一帧，减少数据标注成本"
answer: 1
explain: "SlowFast 表示将帧分为 slow 和 fast 两组，对 fast frames 使用更强池化，从而在 token 预算近似固定时纳入更多时间点。"
```
