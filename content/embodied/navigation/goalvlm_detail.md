### GoalVLM — 多智能体 VLM 开放词汇目标导航

```yaml
id: "goalvlm"
name: "GoalVLM"
full_name: "VLM驱动目标导航 (VLM-driven Object Goal Navigation)"
year: "2026.03"
org: "arXiv"
paper_url: "https://arxiv.org/abs/2603.18210"
category: "object_navigation"
parent: "cow"
motivation: "VLM多智能体开放词汇导航"
```

#### 📝 一句话总结

GoalVLM 提出一个无需任务特定训练的多智能体开放词汇 ObjectNav 框架，把 SAM3 文本检测分割、深度投影 BEV 建图、VLM 空间推理和多智能体 frontier 分配结合起来寻找自由语言目标。

#### 🎯 核心要点

- **多智能体开放词汇导航**：多个 agent 共享融合 BEV 语义地图与 frontier 评分，减少重复探索。
- **SAM3 零样本目标检测**：用文本提示检测和分割目标，并通过多视角确认降低误检。
- **Goal Projector**：把图像检测 mask 通过校准深度反投影到 BEV 地图，获得可规划的目标位置。
- **VLM 结构化推理链**：用 scene captioning、room-type classification、perception gating、multi-frontier ranking 为 frontier 注入常识先验。
- **BEV semantic mapping**：每个 agent 从 RGB-D 观测生成体素 splatting，再切片为障碍、探索与语义热力图。
- **GOAT-Bench 评估**：在 val_unseen 的多子任务开放词汇目标链上，双智能体版本报告 55.8% subtask SR 和 18.3% SPL。

#### 🔬 深入细节

##### 框架图

![GoalVLM 多智能体框架](https://arxiv.org/html/2603.18210v1/x2.png)
*图：GoalVLM 中每个智能体执行感知、VLM 推理、局部规划，并通过共享全局地图和分布式信念协议协调 frontier 分配。*

##### 算法伪代码

```python
# GoalVLM: decentralized multi-agent open-vocabulary ObjectNav
shared_map = GlobalBEVMap()
while episode_not_done:
    for agent in agents:
        rgb, depth, pose = agent.observe()
        local_map = voxel_splat_to_bev(rgb, depth, pose)
        shared_map.fuse(local_map)

        detections = SAM3.detect_and_segment(rgb, text_goal)
        if confirmed_by_multiview(detections):
            goal_xy = GoalProjector.backproject(detections.mask, depth, pose)
            selected_goal = shared_map.project_goal(goal_xy)
        else:
            frontiers = shared_map.extract_frontiers(agent.pose)
            prompt_state = {
                "scene_caption": VLM.caption(rgb),
                "room_type": VLM.classify_room(rgb),
                "goal": text_goal,
                "frontiers": summarize(frontiers),
            }
            selected_goal = VLM.rank_frontiers(prompt_state)

        local_path = FMM(shared_map.obstacles, agent.pose, selected_goal)
        action = discretize_path_gradient(local_path)
        agent.execute(action)

        if agent.goal_reached(selected_goal) and detections:
            agent.execute("stop")
    shared_map.resolve_frontier_assignments(agents)
```

##### 方法拆解

GoalVLM 针对的是 GOAT-Bench 风格的开放词汇目标链：一个 episode 内要连续找到 5-7 个自由语言目标，且类别数远超传统 ObjectNav 固定集合。单机器人方法在大场景中探索慢，闭集多机器人方法又依赖预定义类别图。GoalVLM 用多智能体覆盖面积，用 VLM 常识给 frontier 排序，用 SAM3 解决开放词汇视觉定位。

感知层先从 RGB-D 构造 BEV 语义地图。深度像素按相机内参反投影到 3D 点云，再经过相机高度和姿态变换进入全局坐标，最后用 voxel splatting 累积到俯视网格。障碍图来自可通行高度区间的体素切片；探索图记录哪些区域已观测；语义热图记录目标或场景类别证据。

目标一旦被 SAM3 检测到，Goal Projector 会把分割 mask 中的深度点反投影到 BEV，取目标 centroid 或置信区域作为可规划坐标。这一步很重要：纯图像检测只能说“画面里有目标”，但导航必须知道地图上的目标位置。论文还特别讨论了非均匀 resize 下相机内参修正，否则 portrait 传感器会造成投影畸变，污染障碍图。

如果尚未检测到目标，系统进入 VLM frontier reasoning。提示链先让 VLM 生成场景描述，再判断房间类型和目标相关性，随后对多个 candidate frontier 排名。例如目标是 microwave 时，厨房方向的 frontier 应比卧室方向更优。这个过程不是让 VLM 输出低层动作，而是只选择高层探索目标。

多智能体协作通过共享地图和 frontier 分配实现。各 agent 上传局部 BEV 信息到全局地图，依据共享语义热力图、Bayesian value map 或 frontier score 分配不同探索区域。这样两个 agent 不会都走向同一 frontier，探索覆盖率提高。论文消融显示从双智能体降为单智能体会明显降低成功率，说明协作不是装饰模块。

与 CoW 相比，GoalVLM 从单体开放词汇定位推进到多智能体、连续子任务和 VLM 空间推理；与 LOAT 相比，它不是离线对象亲和力激活，而是在线把视觉观察、房间判断和 frontier 候选交给 VLM 排序。代价是路径效率仍受 frontier 探索和局部规划影响，SPL 明显低于端到端强记忆策略。

> ⚠️ 注意：GoalVLM 的公开论文为 2026 年 arXiv 预印本，方法中提到 SAM3 与 SpaceOM 等组件；若这些外部模型版本更新，复现实验时需要固定模型接口与阈值。

#### 🧪 练习题

```yaml
question: "GoalVLM 中 Goal Projector 的主要作用是什么？"
options:
  - "把 BEV 地图翻译成自然语言"
  - "把文本目标变成 one-hot 类别"
  - "把图像中的目标检测 mask 结合深度反投影为 BEV 地图上的目标坐标"
  - "训练多智能体通信协议"
answer: 2
explain: "SAM3 的输出位于图像平面，机器人规划需要地图坐标。Goal Projector 使用深度和相机标定把检测结果投影到 BEV 地图。"
```
