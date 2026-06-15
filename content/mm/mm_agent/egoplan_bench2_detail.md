### EgoPlan-Bench2

```yaml
id: egoplan_bench2
name: EgoPlan-Bench2
full_name: "第一人称规划基准2.0 (EgoPlan-Bench2)"
year: "2026"
org: "MIT"
paper_url: "https://link.springer.com/article/10.1007/s11263-026-02826-y"
category: "frontier_2026"
parent: "—"
motivation: "评估MLLM在真实场景的复杂规划能力"
```

#### 📝 一句话总结

EgoPlan-Bench2 提出了一个面向真实第一人称场景的 MLLM 规划能力基准，用 1,321 个多选式“下一步动作预测”问题评估模型是否能结合历史任务进展、当前观察状态和语言目标做出合理决策。它进一步证明，当前 MLLM 的瓶颈不只是视觉理解，还包括时间顺序建模、细粒度人-物交互感知和显式推理能力。

#### 🎯 核心要点

- **真实场景覆盖**：基于 Ego4D 第一人称视频构建，包含 1,321 个高质量 QA、1,113 段视频、4 个生活领域和 24 个细粒度场景
- **规划式评测协议**：输入历史任务进展视频 \(H_{l,a_i}\)、当前观察图像 \(I_{l,a_i}\) 和任务目标 \(l\)，要求模型从 4 个候选项中选择下一步动作 \(a_i\)
- **三阶段构造流水线**：GPT-4 层次化抽取任务目标与子目标，基于目标-动作对生成多选题，再用模型验证和人工验证过滤样本
- **自适应观察帧选择**：用 InternVL-1.5 与 GPT-4 检查候选当前帧，既要求下一步相关物体可见，又避免模型仅靠当前图像提前“偷看”答案
- **强诊断性评测**：评估 25 个主流 MLLM，多数模型总准确率接近 25% 随机猜测，最佳 Gemini-2.5-Pro 达到 44.05%
- **提示增强发现**：Action-seq-GPT、关键物体框、逐步 rationale 与 self-consistency 组合，使 GPT-4V 在 869 个分析样本上从 32.80% 提升到 43.04%
- **视频推理基准属性**：Gemini-2.5-Flash thinking 模式比 no-thinking 高 10.83%，Qwen2.5-VL 经过 SFT+GRPO 后比 Direct SFT 高 5.52%

#### 🔬 深入细节

##### 核心示意图

![EgoPlan-Bench2 场景覆盖与题目形式](https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs11263-026-02826-y/MediaObjects/11263_2026_2826_Fig1_HTML.png)
*图：EgoPlan-Bench2 覆盖 Work、Daily Life、Hobbies、Recreation 四大领域；每道题由历史视频、当前观察图像、任务目标和候选下一步动作组成。*

![EgoPlan-Bench2 数据构造流水线](https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs11263-026-02826-y/MediaObjects/11263_2026_2826_Fig2_HTML.png)
*图：半自动数据构造流程，包括任务目标抽取、多选 QA 生成、模型验证和人工验证。*

![EgoPlan-Bench2 训练无关多模态提示流程](https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs11263-026-02826-y/MediaObjects/11263_2026_2826_Fig16_HTML.png)
*图：用预测动作序列表示历史进展，用关键物体框强化当前观察，再结合逐步 rationale 和 self-consistency 提升规划判断。*

##### 核心流程伪代码

```python
# EgoPlan-Bench2 构造与评测伪代码
for video in Ego4D:
    narrations = filter_narrations(
        video.narrations,
        remove_unsure=True,
        min_words=3,
        remove_other_person_actions=True,
    )
    actions = gpt_normalize_to_verb_object(narrations)
    action_spans = estimate_action_start_end(actions)

    # Stage I: 层次化任务目标抽取
    for segment in split_by_ego4d_summary(video):
        goals = GPT4.extract_overall_goal_subgoals_and_actions(segment)
        goals = keep_goals_with_4_to_20_actions(goals)

        # Stage II: 多选下一步动作问题生成
        for goal in goals:
            semantic_groups = GPT4.group_actions_by_semantics(goal.actions)
            for i, answer_action in enumerate(goal.actions):
                negatives = sample_three_actions_from_other_groups(
                    semantic_groups, answer_action
                )
                question = make_mcq(goal.text, answer_action, negatives)

                candidates = crop_frames_around(
                    timestamp=answer_action.start_time - 0.5,
                    step_seconds=0.25,
                    count=5,
                )
                observation = None
                for frame in candidates:
                    image_only_pred = InternVL15.predict_next_action(frame, question)
                    objects_visible = InternVL15.check_required_objects(frame, answer_action)
                    if image_only_pred != answer_action and objects_visible:
                        observation = frame
                        break

                if observation is None:
                    continue
                history_clip = crop_video_until(video, observation.timestamp)

                # Stage III: 模型验证 + 人工验证
                if GPT4.circular_eval_text_only(question).is_correct:
                    continue
                if human_annotators_answer(history_clip, observation, question) == answer_action:
                    dataset.add(history_clip, observation, question, answer_action)

for model in evaluated_mllms:
    correct = 0
    for sample in dataset:
        prompt = (
            "Select the best answer based on the video. "
            "Considering the progress shown in the video and my current "
            "observation in the last frame, what action should I take next "
            f"in order to {sample.goal}?"
        )
        pred = model.predict(sample.video_with_last_frame, prompt, sample.options)
        correct += normalize_choice(pred) == sample.answer
    accuracy = correct / len(dataset)
```

##### 任务定义与数据构造

EgoPlan-Bench2 的核心任务不是“看完整视频回答理解题”，而是模拟第一人称执行任务时的动态决策：模型已经看到一段历史进展，还看到当前瞬间的观察，需要判断下一步最合理的动作。这种设置更接近具身助手、AR 助手或机器人规划器的输入形态，因为真实环境中的智能体通常无法一次性预知完整未来轨迹，只能基于当前状态滚动决策。

论文先从 Ego4D 的带时间戳叙述中得到动作。为了降低噪声，构造过程过滤含 `#unsure` 的叙述、少于三个词的叙述，以及由非摄像头佩戴者执行的 `#O` 动作；随后用 GPT 将原始叙述统一成 “verb-object” 短语，例如 `close washing machine`。由于 Ego4D 给出的通常是动作发生时间点而非持续区间，论文用相邻叙述平均时间间隔估计动作起止范围：

$$
[t_i^{start}, t_i^{end}]
=
\left[t_i-\frac{\beta_i}{2\alpha},\ t_i+\frac{\beta_i}{2\alpha}\right],
\quad \alpha=4.9
$$

其中 \(t_i\) 是动作发生时间，\(\beta_i\) 是该视频中相邻叙述的平均时间距离。这个估计只作为初始化；真正用于题目的“当前观察图像”还会经过后续自适应选择。

任务目标抽取采用层次化策略。Ego4D 视频常常很长，而且可能混杂多个任务或无目的活动，因此论文先按视频 summary 的时间段切分，再让 GPT-4 根据该片段 summary 与动作序列抽取 overall goal、sub-goal 和对应动作链。随后只保留包含 4 到 20 个动作的目标，避免目标过短导致没有规划难度，也避免目标过长导致题目复杂度失控。

##### 多选题与当前观察对齐

给定一个任务目标 \(l\) 和动作序列 \(\{a_1,\dots,a_N\}\)，构造器会生成 \(N\) 个目标-动作对：

$$
[l,a_i],\quad i=1,2,\dots,N
$$

其中 \(a_i\) 是该题的正确下一步动作。负选项不是从无关视频随机取，而是从同一任务目标的不同时刻动作中抽取，并先用 GPT-4 做语义分组，再从不同于正确答案的类别中采样三个动作。这样设计的目的，是让错误选项也与当前任务相关，迫使模型理解“哪些步骤已经完成、当前处于哪一阶段”，而不是只靠常识或词面相关性猜答案。

视觉输入由两部分组成：历史任务进展 \(H_{l,a_i}\) 和当前观察 \(I_{l,a_i}\)。最终给模型的视频 \(V_{l,a_i}\) 把二者合在一起，并让最后一帧表示当前状态。难点在于 \(I_{l,a_i}\) 不能太早也不能太晚：太早可能缺少下一步所需物体，太晚则可能已经出现执行下一步的手-物交互线索。EgoPlan-Bench2 因此围绕正确动作开始时间附近截取 5 个候选帧，每隔 0.25 秒取一帧，并用两个准则筛选：

- **不能只靠当前帧答题**：如果 InternVL-1.5 仅凭候选帧就能预测正确下一步，说明该帧泄露了动作线索，需要丢弃
- **下一步所需物体必须可见**：如果候选帧中看不到动作涉及的关键物体，模型即使理解历史进展也无法做出公平判断

> 💡 关键：这个筛选让题目保持“规划”属性。模型必须同时使用历史进展和当前观察，而不是退化成单帧动作识别或静态物体识别。

##### 评测协议与指标

EgoPlan-Bench2 使用四选一准确率作为主指标：

$$
\mathrm{Acc}=\frac{1}{M}\sum_{j=1}^{M}\mathbb{1}[\hat{y}_j=y_j]
$$

论文评估 25 个 MLLM，包括图像 MLLM、视频 MLLM、闭源图像/视频 MLLM。视频模型通常采样 32 帧，并显式包含首帧和末帧；图像模型使用 8 个关键帧，必要时因上下文限制减少帧数。评测 prompt 要求模型只输出 A/B/C/D，不使用 GPT 等第三方模型判分，减少开放式生成带来的判定噪声。

主结果显示，随机猜测为 25%，而多数模型只在 23%-27% 左右徘徊。GPT-4V 总准确率为 32.63%，InternVideo-2.5-7B 为 33.61%，Video-XL-2-7B 为 33.00%，Gemini-2.5-Flash 为 31.94%，最佳 Gemini-2.5-Pro 达到 44.05%。这说明即使强模型能识别场景和物体，面对真实第一人称长过程中的下一步决策，仍然缺少稳定的任务进展追踪和推理能力。

论文还分析了视频长度和帧数。大多数模型在长视频上下降，因为固定采样帧数会漏掉短暂但关键的动作；不过 Gemini-2.5-Pro 在长视频上没有明显退化，可能与更密集的采样和更强长视频处理能力有关。进一步实验发现，对 Qwen2.5-VL-7B 而言，把同一批帧作为多张独立图片输入，准确率从 24.52% 提升到 38.22%，说明瓶颈不只是采样帧不够，也包括视频编码压缩过程中丢失细粒度视觉 token。

##### 提示增强与推理机制

论文把失败原因归纳为五类：当前状态误感知、历史任务进展误解、时间顺序混淆、采样帧数量限制，以及综合推理能力不足。基于这些瓶颈，作者设计了训练无关的多模态提示策略，分别补强历史进展、当前观察和集成推理过程。

历史进展提示中，最有效的是动作序列。Action-seq-GPT 用 GPT-4V 把历史视频总结成简洁、有时间结构的动作链；相比之下，视频级描述、帧级描述和关键物体轨迹并没有明显收益。原因是规划最需要知道“哪些动作已按什么顺序发生”，而普通描述容易停留在场景概览，缺少可用于下一步决策的时间结构。

当前观察提示中，关键物体 bounding box 最有效。BoundingBox-obj 先让 GPT-4 根据问题和候选项挑出不超过 5 个关键物体，再用 Grounding DINO 标注候选图像中这些物体的位置。它比纯图像描述、scene graph 或只裁剪物体状态更有用，因为下一步动作往往依赖人手、工具、目标物体之间的空间关系和交互状态。

集成推理阶段要求模型显式生成 rationale：先分析已完成动作和历史进展，再描述当前观察状态，然后逐一判断候选动作是否符合当前任务阶段、是否能在当前状态下执行，最后选择答案。仅在 BoundingBox-obj 上加入 rationale，就能把 GPT-4V 从 37.63% 提升到 39.82%；结合 Action-seq-GPT、BoundingBox-obj、rationale 和 self-consistency 后，达到 43.04%，比无额外提示的 32.80% 提升 10.24%。

```python
# 训练无关多模态提示增强伪代码
def prompted_planning(sample, model):
    action_seq = GPT4V.summarize_temporal_actions(sample.history_video)
    key_objects = GPT4.select_key_objects(sample.question, sample.options, max_count=5)
    boxed_observation = GroundingDINO.draw_boxes(sample.current_image, key_objects)

    answers = []
    for _ in range(5):  # self-consistency
        rationale = model.reason(
            video=sample.history_video,
            image=boxed_observation,
            text={
                "goal": sample.goal,
                "action_sequence": action_seq,
                "options": sample.options,
                "steps": [
                    "analyze completed actions",
                    "describe current observation",
                    "check feasibility of each option",
                    "choose the best next action",
                ],
            },
        )
        answers.append(extract_choice(rationale))
    return majority_vote(answers)
```

##### 视频推理扩展

2026 版论文进一步把 EgoPlan-Bench2 作为视频推理基准验证。Gemini-2.5-Flash 在 no-thinking 模式下总体准确率为 31.94%，开启 thinking 并给 2048 个 thinking tokens 后达到 42.77%，提升 10.83%。这表明该基准能区分“直接反射式回答”和“先整合历史、当前状态、候选项再决策”的模型行为。

作者还用 Qwen2.5-VL-Instruct-7B 验证 R1 范式后训练。训练分为 SFT 和 GRPO 两阶段，SFT 用带 CoT 标注的数据学习 `<think>`、`</think>`、`<answer>`、`</answer>` 结构，GRPO 则用答案正确性和格式正确性作为规则奖励，鼓励模型探索更好的推理路径。其核心目标可概括为：

$$
\mathcal{J}_{\mathrm{GRPO}}(\theta)
=
\mathbb{E}_{x,\{o_g\}}
\frac{1}{G}\sum_{g=1}^{G}\frac{1}{|o_g|}\sum_i
\left[
\min\left(
r_{g,i}(\theta)\hat{A}_{g,i},
\operatorname{clip}(r_{g,i}(\theta),1-\varepsilon,1+\varepsilon)\hat{A}_{g,i}
\right)
-
\beta D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\mathrm{ref}})
\right]
$$

其中 \(r_{g,i}(\theta)\) 是新旧策略在第 \(i\) 个 token 上的概率比，\(\hat{A}_{g,i}\) 来自组内相对奖励。实验中 Qwen2.5-VL-Instruct-7B 原始基线为 30.43%，Direct SFT 为 52.23%，CoT SFT 为 53.36%，SFT+GRPO 达到 57.75%。相比只学答案的 Direct SFT，SFT+GRPO 高 5.52%，说明显式推理和 RL 后训练确实能改善真实规划任务。

##### 与传统基准的区别

传统视频 QA 基准更强调对完整视频内容的理解，例如识别事件、回答空间关系或总结视频；EgoPlan-Bench2 则要求模型在任务尚未完成时预测下一步动作，因而更关注决策。它与 EgoPlan-Bench 的区别也很明确：后者集中在厨房/烹饪场景，而 EgoPlan-Bench2 扩展到工作、日常生活、兴趣和娱乐四大领域，覆盖实验室、黑smith、机械维修、购物、园艺、运动等更丰富的真实任务。

这种设计带来的直接价值，是把模型错误暴露得更具体。模型可能知道画面里有什么，却不知道哪些动作已经发生；可能看到关键物体，却误判它与手或工具的交互状态；也可能理解历史和当前图像，却缺少世界知识推理能力，例如不知道在收纳肉之前需要先折叠袋子。EgoPlan-Bench2 因此不仅是排行榜，更像是一个定位 MLLM 规划瓶颈的诊断工具。

> ⚠️ 注意：EgoPlan-Bench2 仍是静态多选题基准。它便于大规模评测，但受限于封闭候选动作、单步预测和单一录制轨迹；真实智能体还需要在开放动作空间中连续执行、观察反馈并纠错。

#### 🧪 练习题

```yaml
question: "EgoPlan-Bench2 的自适应当前观察帧选择中，为什么要丢弃“仅凭当前帧就能预测正确下一步”的候选帧？"
options:
  - "为了减少视频文件大小，降低模型推理成本"
  - "为了避免题目退化成单帧线索识别，确保模型必须结合历史任务进展进行规划"
  - "为了让所有候选帧都来自动作完成后的同一时间点"
  - "为了提升负选项之间的语义相似度"
answer: 1
explain: "如果模型只看当前帧就能答对，说明该帧泄露了下一步动作线索。EgoPlan-Bench2 希望评估的是历史进展、当前状态和任务目标的综合规划能力，而不是单帧动作识别。"
```
