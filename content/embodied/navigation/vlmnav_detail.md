### VLMnav — VLM导航框架 (VLM Navigation Framework)

```yaml
id: vlmnav
name: VLMnav
full_name: "VLM导航框架 (VLM Navigation Framework)"
year: "2026"
org: "Stanford"
paper_url: "https://arxiv.org/abs/2601.vlmnav"
category: "visual_navigation"
parent: "vtnet"
motivation: "通用VLM直接驱动导航策略"
```

#### 📝 一句话总结

VLMnav 将视觉语言模型转化为零样本端到端导航策略，通过深度可达性分析生成离散可行动作、把动作投影到第一视角图像并让 VLM 选择，从而避免训练专用导航策略和复杂模块化语义地图规划。

#### 🎯 核心要点

- **问题重写**：把导航动作选择转化为 VLM 擅长的“看图回答选择题”
- **零样本策略**：不对 VLM 做导航数据微调，直接通过 prompt 驱动通用 VLM 选择动作
- **RGB-D + Pose 输入**：使用第一视角 RGB-D、机器人位姿和语言/图像目标作为输入
- **可达性计算**：利用深度图估计局部 navigability mask，生成不会撞障碍的候选极坐标动作
- **探索偏置 Action Proposer**：维护 explored/unexplored voxel map，优先提出指向未探索区域且视觉间距足够的动作
- **视觉投影标注**：把候选动作编号/箭头投影到 RGB 图像，让 VLM 在图像空间中理解动作含义
- **分离终止判断**：使用单独 VLM prompt 判断是否 stop，并要求连续两次 stop 以降低误停
- **依据限制说明**：清单 URL 疑似占位符；公开论文为 `End-to-End Navigation with Vision-Language Models: Transforming Spatial Reasoning into Question-Answering`，arXiv `2411.05755`

#### 🔬 深入细节

![VLMnav 方法总览](https://jirl-upenn.github.io/VLMnav/static/images/main.png)
*图：VLMnav 项目页方法图。系统生成可导航动作、投影到第一视角图像，再由 VLM 根据目标和图像标注选择动作。*

> ⚠️ 依据限制：清单中的 `paper_url` 为 `https://arxiv.org/abs/2601.vlmnav` 且机构写为 Stanford，当前公开可检索的 VLMnav 论文是 2024 arXiv / 2025 PMLR 版本，作者来自 UC Berkeley 和 University of Pennsylvania。以下内容基于该公开版本整理，YAML 元信息保持清单原样。

```python
# VLMnav 核心流程伪代码
def vlmnav(goal, rgbd_stream, pose_stream, vlm):
    voxel_map = VoxelMap()
    stop_votes = 0

    for rgbd, pose in zip(rgbd_stream, pose_stream):
        # 1. 用深度估计局部可达区域
        navigable = compute_navigability_mask(rgbd.depth)
        polar_actions = farthest_collision_free_actions(navigable)

        # 2. 更新 explored / unexplored voxel map
        voxel_map.update(rgbd.depth, pose)

        # 3. 动作提议：优先未探索方向，并保持动作之间视觉间距
        actions = propose_actions_with_explore_bias(polar_actions, voxel_map)
        if len(actions) == 0:
            actions = [turn_around_action()]

        # 4. 把动作编号投影到 RGB 图像
        annotated = project_actions_to_image(rgbd.rgb, actions, pose)

        # 5. VLM 选择动作
        prompt = build_action_prompt(goal, actions)
        action_id = vlm.choose(prompt, annotated)
        execute(actions[action_id])

        # 6. 单独终止 prompt，连续两次 stop 才结束
        stop_prompt = build_termination_prompt(goal)
        if vlm.should_stop(stop_prompt, rgbd.rgb):
            stop_votes += 1
        else:
            stop_votes = 0
        if stop_votes >= 2:
            break
```

##### 动机与背景

传统视觉导航通常把系统拆成感知、建图、语义理解、全局规划、局部控制等模块。这样可解释但复杂，并且每个模块都可能需要任务特化训练。直接端到端策略则需要大量导航数据，泛化到新目标和新环境困难。

VLMnav 的核心假设是：现代 VLM 已经具备一定空间和语义推理能力，但不擅长输出连续控制量。因此系统不让 VLM 直接回归坐标，而是先用几何模块生成可行动作集合，再把动作变成图像上的编号选择题。

##### 可达性与动作生成

输入深度图后，系统估计机器人前方哪些像素对应可到达区域，并对每个方向计算无碰撞前进距离。动作被表示为极坐标：

$$
a_i=(r_i,\theta_i)
$$

其中 \(r_i\) 是可前进距离，\(\theta_i\) 是相对航向角。这样，动作空间从连续控制变成有限候选集合 \(\mathcal{A}_t=\{a_1,\dots,a_K\}\)，VLM 只需选择一个编号。

##### 探索偏置

VLM 本身不维护可靠的空间覆盖记忆，所以 VLMnav 使用一个轻量 top-down voxel map 标记 explored 与 unexplored。Action Proposer 会优先保留朝向未探索区域的动作，并要求动作之间有足够角度间距，避免图像上编号挤在一起导致 VLM 混淆。

如果机器人卡在角落、没有可前进动作，系统加入特殊的 `turn around` 动作。这使得 VLM 不必自己推导复杂局部避障，只需在可行候选中做语义和探索权衡。

##### 图像投影与 Prompt

候选动作被投影到第一视角 RGB 图像上，形成带编号的 annotated image。Prompt 要求 VLM 描述空间布局、制定高层计划，再输出动作编号。这个设计把“空间坐标推理”转换成“图像中哪个箭头更合理”的问题，符合 VLM 的视觉问答能力。

对于图像目标导航，目标图像也会一起输入 VLM；对于语言目标导航，prompt 中写明目标类别或描述。VLMnav 因此能覆盖 ObjectNav 和 GOAT 这类目标可能是语言、图像或类别的任务。

##### 终止机制

导航任务必须在接近目标时 stop。VLMnav 不使用低层 point-goal policy，因此需要单独判断终止。系统用没有动作箭头干扰的图像和独立 prompt 询问是否应该停止，并要求连续两次 stop 才真正结束，以减少看见相似物体但距离不够时的误停。

> 💡 关键：VLMnav 不是让 VLM 做所有事情。几何模块负责“哪些动作可走”，VLM 负责“哪个可行动作最符合目标和语义布局”。

#### 🧪 练习题

```yaml
question: "VLMnav 为什么要先生成离散候选动作并投影到图像上，而不是让 VLM 直接输出连续坐标？"
options:
  - "因为 VLM 更擅长在视觉标注中做选择，连续几何坐标推理不稳定"
  - "因为深度图无法用于判断障碍物"
  - "因为导航任务不需要探索"
  - "因为所有动作都必须由人工输入"
answer: 0
explain: "VLMnav 用深度和位姿生成可行离散动作，再把动作标到图像中，让 VLM 以视觉问答方式选择，避免直接回归连续控制带来的空间推理误差。"
```
