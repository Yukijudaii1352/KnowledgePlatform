### CinePile：基于音频描述对齐的长视频问答基准

```yaml
id: cinepile
name: CinePile
full_name: 长视频QA基准 (CinePile)
year: '2024'
org: Google
paper_url: https://arxiv.org/abs/2405.08813
category: classic
parent: movieqa
motivation: 真实长视频音频对齐基准
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/cinepile_detail.md
```

#### 📝 一句话总结

CinePile 构建了一个面向真实长视频理解的多选问答基准，用电影音频描述（Audio Descriptions）作为高质量视觉代理标注，再通过 LLM 模板生成、质量过滤和人工审查得到大规模长视频 QA 数据。

#### 🎯 核心要点

- 数据来自英文电影片段，最终保留 9,396 个视频片段，平均长度约 160 秒
- 规模为 303,828 个 MCQ，其中训练集 298,887 条、测试集 4,941 条，每个视频约 32 个问题
- 利用 Audio Descriptions 对齐 YouTube MovieClips 片段，把专为视障人群编写的场景旁白转化为视觉描述代理
- 用 WhisperX 转录音频，用 WhereIsAI/UAE-Large-V1 句向量和 rolling window 将电影级 AD 定位到片段级 AD
- 从 MovieQA、TVQA、Perception Test 的约 30,000 个人工问题中抽取模板，最终人工合并为 86 个问题模板
- 问题类别覆盖 CRD、NPA、STA、TEMP、TH，强调角色关系、叙事、场景技术、时间推理和主题理解
- 引入退化问题检测、educated guessing 检测、adversarial refinement、vision reliance、hardness 等质量控制指标
- 模型评测显示 Gemini 1.5 Pro 约 60.12%，普通人类 73.21%，作者 86.00%，长视频多模态理解仍有明显差距

#### 🔬 深入细节

![CinePile 自动 QA 生成与过滤流程](https://ar5iv.labs.arxiv.org/html/2405.08813/assets/x3.png)
*图：CinePile 从场景文本标注和问题模板出发，生成 MCQ 并通过多阶段过滤/修复得到最终数据*

CinePile 的核心洞察是：很多电影已经存在由专业人员编写的 Audio Descriptions（AD），这些旁白会在对话间隙描述角色动作、表情、空间位置、关键物体和场景变化。传统视频 caption 往往过度描述表面视觉内容，而 AD 更接近“为了理解剧情必须知道的视觉信息”。因此，CinePile 不直接让人工逐帧标注，而是把 AD 当作视觉代理标注，用它生成需要看视频才能回答的问题。

数据对齐分两层。第一层是音频转录：论文用 WhisperX 转录 YouTube 电影片段音频和整部电影的 AD 音轨，以获得更准确的词级时间戳。第二层是片段定位：取 YouTube 片段转录的开头 3 行和结尾 3 行，用 WhereIsAI/UAE-Large-V1 编码，再在整部电影 AD 转录中用 rolling window 搜索最匹配的开始和结束位置。对齐后得到的片段级文本同时包含 visual description 和 dialogue，论文称为 scene-text-annotation。

由于 AD 转录混合了视觉旁白和角色台词，CinePile 还训练了一个句子分类器来拆分二者。具体做法是在 MAD 数据集标注上 fine-tune BERT-Base，加二分类头区分 visual description 与 dialogue，80/20 划分训练和验证，验证准确率约 96%。这个步骤很关键，因为后续的 vision reliance 与纯视觉/对话依赖分析都需要知道问题是否真的依赖视觉描述。

模板生成不是手写几个固定问题类型，而是从现有人工视频 QA 数据集中抽象出来。CinePile 从 MovieQA、TVQA、Perception Test 收集约 30,000 个问题，先用 GPT-3.5 把人名和实体替换成代词，避免句向量聚类被专名主导；去重后得到 17,575 个唯一问题。随后用 WhereIsAI/UAE-Large-V1 嵌入并 k-means 聚类，MovieQA/TVQA 侧实验 \(k=10,50,100\) 后选 \(k=50\)，Perception Test 因主题较少选 \(k=20\)。每个 cluster 随机抽 10 个问题给 GPT-4 归纳模板，生成约 300 个候选模板，再人工删并合并为 86 个。

QA 生成阶段先让 Gemini 从 86 个模板中为每个场景选出 20 个相关模板，再随机取 5-6 个模板交给 GPT-4/Gemini 生成多选题。输入包括 scene-text-annotation、模板名、prototype question 和系统提示。论文特别强调两个 prompt 细节：给 prototype question 能减少幻觉并提升干扰项质量；要求模型给 rationale 能提升问题可验证性。最终每个视频大约生成 32 个 MCQ，每个问题包含 1 个正确答案和 4 个干扰项。

```python
# CinePile 数据构建流程伪代码
for clip in youtube_movie_clips:
    clip_transcript = whisperx_transcribe(clip.audio)
    movie_ad_transcript = whisperx_transcribe(full_movie_audio_description(clip.movie))

    start_query = embed(first_3_lines(clip_transcript))
    end_query = embed(last_3_lines(clip_transcript))
    start, end = rolling_window_match(movie_ad_transcript, start_query, end_query)

    scene_text = movie_ad_transcript[start:end]
    visual_desc, dialogue = bert_sentence_classifier(scene_text)
    scene_annotation = merge_with_timestamps(visual_desc, dialogue)

    relevant_templates = gemini_select_top20(scene_annotation, template_bank)
    sampled_templates = random_sample(relevant_templates, k=5_or_6)

    mcqs = []
    for template in sampled_templates:
        mcqs.extend(gpt_or_gemini_generate_mcq(scene_annotation, template))

    for q in mcqs:
        q.degenerate = lm_answers_without_context(q.question, q.choices)
        q.vision_reliant = not gemini_answers_with_dialogue_only(q, dialogue)
        q.hard = not gemini_answers_with_full_scene_text(q, scene_annotation)
        if q.degenerate:
            q = adversarial_refine_until_unanswerable(q, max_rounds=5)

    save_valid_questions(mcqs)
```

质量控制比普通自动合成数据更重。退化问题指答案已经隐含在问题中，例如“粉色房子是什么颜色”；educated guessing 指不用看视频也能靠常识猜中。论文用 Gemini、GPT-3.5 Turbo、Phi-1.5 在“只给问题和选项、不提供上下文”的条件下检测弱问题。如果多个模型都能答对，就说明题目可能泄漏答案。随后使用 LLaMA 3.1 70B 做 adversarial refinement：让模型解释为什么能猜中，再把这个 rationale 反馈给生成模型改写问题或选项，最多迭代 5 轮。最终约 90.94% 的训练弱问答、90.24% 的测试弱问答被修复，无法修复的约 80 条测试问题被移除。

Vision reliance 与 hardness 是 CinePile 的两个诊断指标。可以把视觉依赖写成：

$$
\operatorname{VR}(q)=
\mathbb{1}[\hat{a}_{\text{Gemini}}(q,\text{dialogue only}) \ne a^\star]
$$

如果只给 dialogue 时 Gemini 答错，则该问题被标记为依赖视觉。Hardness 则更严格：给模型用于生成问题的完整 scene-text-annotation（包含 visual descriptions 和 subtitles）仍答错的问题，会被认为对模型困难，并由作者进一步审查。

退化检测也可以抽象为：

$$
\operatorname{Weak}(q)=
\mathbb{1}\left[
\frac{1}{|\mathcal{M}|}
\sum_{m\in\mathcal{M}}
\mathbb{1}[\hat{a}_m(q,\text{choices only})=a^\star]
\ge \tau
\right]
$$

其中 \(\mathcal{M}\) 是用于检测的语言模型集合。这个指标不直接评价视频理解，而是保护 benchmark：如果只靠问题和选项就能答对，那么它不应进入评测集。

CinePile 的评测协议是多选准确率，但模型输出并不总是规整的 A-E 选项。因此论文使用两阶段解析：先规范化模型回答，抽取选项字母和可能出现的选项文本；再与答案 key 比较，允许在只有字母或只有文本出现时按对应部分匹配。这个细节对开源模型尤其重要，因为许多模型会复述字幕、生成长段解释或输出未列出的选项。

实验结果显示，CinePile 不是只靠单帧或字幕就能解决的简单 benchmark。普通人类约 73.21%，作者在仔细观看和回看条件下约 86.00%；商业模型中 Gemini 1.5 Pro--001 约 60.12%，GPT-4o 约 56.06%；开源模型中 LLaVA-OV 7B 约 49.34%。同时，使用 CinePile 训练集对 Video-LLaVA 进行 LoRA 微调后，准确率从 25.72% 提升到 44.16%，说明这个数据集不仅能评测长视频理解，也能作为 instruction tuning 数据改善开源视频模型。

#### 🧪 练习题

```yaml
question: "CinePile 为什么使用 Audio Descriptions 作为视觉代理标注？"
options:
  - "AD 是自动目标检测器输出，包含更精确的边界框"
  - "AD 是为视障人群编写的人工场景旁白，通常覆盖理解剧情所需的关键视觉信息"
  - "AD 只包含角色对话，适合训练纯文本问答模型"
  - "AD 可以替代所有模型评测，不需要原始视频输入"
answer: 1
explain: "CinePile 利用 AD 中的人写视觉描述来低成本构造长视频 QA；评测时模型仍需要从原始视频和对话中回答，不会看到 AD。"
```
