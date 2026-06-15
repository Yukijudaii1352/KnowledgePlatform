### SemExp — 语义探索 (Semantic Exploration)

```yaml
id: semexp
name: SemExp
full_name: "语义探索 (Semantic Exploration)"
year: "2020"
org: "CMU"
paper_url: "https://proceedings.neurips.cc/paper/2020/hash/2c75cf2681788adaca63aa95ae028b22-Abstract.html"
category: "object_navigation"
parent: "neural-slam"
motivation: "语义探索目标位置预测"
```

#### 📝 一句话总结

SemExp 提出 Goal-Oriented Semantic Exploration，把目标导航拆成语义建图、学习式长程目标选择和确定性局部规划，解决端到端 ObjectNav 在未知环境中探索低效、缺乏语义先验和长程规划的问题。

#### 🎯 核心要点

- **模块化 ObjectNav**：由 Semantic Mapping、Goal-Oriented Semantic Policy、Local Policy 三个模块组成
- **显式语义地图**：维护 \(K=C+2\) 通道的 2D metric map，包含障碍、已探索区域和每个语义类别
- **目标导向探索**：高层策略根据语义地图和目标类别预测 long-term goal，而不是直接输出低层动作
- **语义先验学习**：通过 RL 学习物体共现与空间布局，例如电视更可能在客厅、床更可能在卧室
- **确定性局部规划**：用 analytical planner / Fast Marching Method 从当前位置走向 long-term goal
- **Habitat ObjectNav 表现**：在 Gibson/Habitat ObjectNav 中优于端到端和普通探索基线，并赢得 CVPR 2020 Habitat ObjectNav Challenge
- **可迁移设计**：模块边界与具体仿真域弱耦合，论文展示了向真实移动机器人迁移的能力

#### 🔬 深入细节

![SemExp 模型总览](https://raw.githubusercontent.com/devendrachaplot/Object-Goal-Navigation/master/docs/overview.jpg)
*图：SemExp 官方 GitHub README 中的框架图。语义建图模块构建 episodic semantic map，高层语义策略选择 long-term goal，局部规划器执行低层动作。*

```python
# SemExp 核心流程伪代码
def semexp_objectnav(goal_category, rgbd_stream, pose_stream):
    semantic_map = zeros(channels=C + 2)  # obstacles, explored, object categories
    pose = initial_pose()

    for obs, pose_reading in zip(rgbd_stream, pose_stream):
        # 1. 语义建图：RGB-D + pose -> 障碍、已探索、类别通道
        semantic_seg = semantic_segmentation(obs.rgb)
        point_cloud = backproject(obs.depth, pose_reading)
        semantic_map = update_egocentric_to_global_map(
            semantic_map, point_cloud, semantic_seg, pose_reading
        )

        # 2. 高层策略：根据地图和目标类别选择长程目标
        long_term_goal = goal_oriented_semantic_policy(
            semantic_map, goal_category, pose_reading
        )

        # 3. 局部规划：用确定性规划器走向长程目标
        short_term_goal = fast_marching_planner(
            obstacle_map=semantic_map["obstacle"],
            start=pose_reading.xy,
            goal=long_term_goal,
        )
        action = local_policy(short_term_goal, pose_reading)
        execute(action)

        # 4. 发现目标并足够接近时停止
        if target_visible_and_close(semantic_map, goal_category, pose_reading):
            execute("stop")
            break
```

##### 动机与背景

Object Goal Navigation 要求智能体在未知环境中找到某类物体，例如“chair”或“bed”。端到端 RL 直接从 RGB-D 输入到动作，容易学到局部反应式策略：看见目标就靠近，看不见就随机探索。问题在于大多数时间目标并不在视野里，智能体必须根据房间结构和物体共现先验做高效探索。

SemExp 的核心主张是：ObjectNav 不应该完全隐式地记忆环境。显式语义地图能让策略知道哪里已经探索、哪里有障碍、哪里发现了哪些物体；学习式策略则负责从语义布局推断下一步该探索哪里。

##### 语义地图表示

系统维护一个二维 metric semantic map：

$$
m_t\in\mathbb{R}^{K\times M\times M},\quad K=C+2
$$

其中前两个通道分别表示 obstacle 和 explored area，后 \(C\) 个通道分别表示语义类别。论文中每个 grid cell 对应物理世界中的小方格，RGB-D 观测通过相机位姿投影到全局地图中，语义分割结果写入对应类别通道。

这种表示把历史观测压缩成结构化状态。高层策略不需要回看整段视频，而是读取当前地图、当前位置和目标类别，就能判断已探索区域边界、房间布局和可能目标位置。

##### Goal-Oriented Semantic Policy

高层策略的输出不是低层动作，而是 long-term goal \(g_t\)，即地图上的一个目标点。策略通过强化学习训练，奖励来自成功找到目标和路径效率。由于输入包含语义地图，它可以学到隐式常识：如果目标是“toilet”，优先探索像卫生间的区域；如果目标是“tv”，客厅相关线索更有价值。

形式上，高层策略可写为：

$$
g_t=\pi_{\theta}(m_t, x_t, c_{goal})
$$

其中 \(x_t\) 是当前位置，\(c_{goal}\) 是目标类别。策略学习的是“往哪里探索”，而不是“下一步左转还是右转”。

##### Local Policy 与规划

低层控制由确定性局部规划器完成。给定 obstacle map、当前位置和 long-term goal，系统使用 Fast Marching Method 或类似规划算法得到 short-term goal，再转换为 `move_forward`、`turn_left`、`turn_right`、`stop` 等离散动作。

这种分层设计把困难拆开：学习模块处理语义先验和探索决策，经典规划模块处理避障和局部路径。相比端到端策略，它更样本高效，也更容易迁移到真实机器人，因为局部避障和地图坐标都有明确含义。

##### 与 Neural SLAM 的关系

SemExp 继承了 Active Neural SLAM 的模块化思想：建图、全局策略、局部策略分离。但 Active Neural SLAM 主要面向空间探索，SemExp 把地图扩展为语义地图，并让全局策略以目标类别为条件选择探索点。它从“尽量探索未知区域”升级为“为了找到某类物体而探索最可能的位置”。

> 💡 关键：SemExp 的优势来自显式语义记忆。它不要求策略在 RNN 隐状态里记住整栋房子，而是把空间、障碍和语义都写进地图，再学习如何利用这张图找目标。

#### 🧪 练习题

```yaml
question: "SemExp 中 Goal-Oriented Semantic Policy 输出的是什么？"
options:
  - "每一步的低层电机扭矩"
  - "语义地图上的 long-term goal，由局部规划器再转换为导航动作"
  - "完整的 RGB 图像重建"
  - "每个物体的 3D Gaussian 参数"
answer: 1
explain: "SemExp 的高层策略根据语义地图和目标类别预测长程目标点，低层局部规划器再负责避障并执行离散动作。"
```
