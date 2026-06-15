### RBench视频生成物理评估基准 (RBench)

```yaml
id: rbench
name: RBench
full_name: RBench视频生成物理评估基准 (RBench)
year: '2026.01'
org: THU
paper_url: https://arxiv.org/abs/2601.15282
category: benchmark
parent: —
motivation: 针对视频生成模型的物理真实性评估基准
```

#### 📝 一句话总结
RBench 提出面向机器人视频生成的系统评估基准，用任务完成、物理语义合理性、动作完整性和视觉质量等指标衡量视频模型是否真正生成可用于具身智能的物理交互视频。

#### 🎯 核心要点
- 构建 650 个 image-text 评测样本，覆盖 5 类任务维度和 4 类机器人 embodiment。
- 5 类任务包括 common manipulation、long-horizon planning、multi-entity collaboration、spatial relationship、visual reasoning。
- 4 类 embodiment 包括 single-arm、dual-arm、quadruped、humanoid，用于评估跨机器人形态的视频生成能力。
- 指标同时覆盖 task completion 和 visual quality，包含 physical-semantic plausibility、task-adherence consistency、motion amplitude、robot-subject stability、motion smoothness。
- 使用 MLLM/VQA 式自动评估，并在 10 个模型子集上达到与人类偏好 Spearman \(\rho=0.96\) 的高相关。
- 评估 25 个开源、商业和机器人专用视频模型，发现当前模型在接触、动作顺序、结构稳定和细粒度操作上仍明显不足。
- 进一步提出 RoVid-X 四阶段数据管线，构建约 4M 条带任务描述和物理属性标注的机器人视频片段。

#### 🔬 深入细节
![RBench 与 RoVid-X 总览](https://arxiv.org/html/2601.15282v1/x1.png)
*图：RBench 提供机器人视频生成评测集和自动指标；RoVid-X 则提供面向视频生成训练的大规模机器人视频数据。*

```python
# RBench 自动评估伪代码
for sample in rbench:  # image, prompt, metadata
    videos = [model.generate(sample.image, sample.prompt) for _ in range(3)]
    for video in videos:
        frames = uniform_sample(video)

        task_scores = mllm_vqa_checklist(
            frames,
            checks=[
                "physical_semantic_plausibility",
                "floating_or_penetration",
                "spontaneous_emergence",
                "incorrect_grasp",
                "task_responsiveness",
                "key_action_order",
            ],
        )

        masks = segment_robot_and_object(frames)
        tracks = cotracker(frames, masks)
        visual_scores = {
            "motion_amplitude": compute_subject_motion(tracks),
            "robot_subject_stability": contrast_reference_frames(frames),
            "motion_smoothness": qalign_temporal_stability(frames),
        }

        score = aggregate(task_scores, visual_scores)
    report_average(sample, videos)
```

RBench 的出发点是：通用视频生成指标经常奖励清晰、流畅、好看的视频，但机器人视频更需要“物理动作正确”。例如，机械臂靠近物体但没有真正抓取，物体却跟着移动；夹爪或手指形态漂移；物体穿透桌面；长程任务少做一步。传统 FVD、CLIP 相似度或审美分数容易给这类视频较高分，因此 RBench 把评测重点转向 task-level correctness 与 physical plausibility。

基准构造分两条轴。任务轴包含 5 类代表性机器人视频任务：普通操作、长程规划、多实体协作、空间关系和视觉推理，每类 50 个样本，共 250 个 image-text pairs。embodiment 轴包含单臂、双臂、四足、人形四类，每类 100 个样本，共 400 个 image-text pairs。每个样本由高质量机器人视频关键帧和重新设计的任务 prompt 组成，并人工确认不与训练数据库重叠。

指标上，RBench 将任务完成拆为 physical-semantic plausibility 与 task-adherence consistency。前者关注漂浮/穿透、无因果出现消失、无接触附着、错误抓取等物理语义错误；后者检查 prompt 中要求的动作是否发生、顺序是否正确、目标状态是否达成。视觉质量则不只看清晰度，还看机器人主体运动幅度、结构稳定性和运动平滑度。

论文中的运动幅度分数可写成：

$$
\mathrm{MAS}=\frac{1}{T}\sum_{t=1}^{T}\min(\bar D_t, 1)
$$

其中 \(\bar D_t\) 是机器人主体被跟踪点的平均位移。这个指标用于惩罚“画面很稳但主体几乎没动”的无效视频。运动平滑度则基于相邻帧审美/质量分数变化：

$$
\mathrm{MSS}=1-\frac{1}{T}\sum_{t=2}^{T}\mathbb{I}(\Delta Q_t > \tau_s(t))
$$

其中阈值 \(\tau_s(t)\) 会考虑机器人主体运动，避免把合理大动作误判为抖动。

RoVid-X 是 RBench 之后的训练数据补充，目标是让模型不只被评估，还能用更物理、更机器人化的数据训练。四阶段管线包括：从互联网和 20+ 开源机器人数据集中收集视频；进行机器人相关性、清晰度、动态性、OCR 等质量过滤；用视频理解模型做任务分段和 caption；再用 FlashVSR、AllTracker、Video Depth Anything 等工具增强分辨率、光流和深度等物理属性。最终数据规模约 4M 条机器人视频片段，覆盖 1300+ 技能和多种机器人形态。

> ⚠️ 注意：RBench 仍主要评估生成视频的可观察物理合理性，并不直接证明视频可反推出可执行机器人动作。论文也把 IDM/动作恢复和闭环控制列为后续方向。

#### 🧪 练习题
```yaml
question: "RBench 相比通用视频生成评测的核心差异是什么？"
options:
  - "只评价视频分辨率是否达到 720P"
  - "把任务动作完成、物理语义合理性和机器人主体稳定性纳入评估"
  - "只使用人工主观打分，不使用自动指标"
  - "只评估文本到图像模型"
answer: 1
explain: "机器人视频需要动作与物理交互正确，RBench 因此设计了 task completion 和 physical plausibility 等细粒度指标。"
```
