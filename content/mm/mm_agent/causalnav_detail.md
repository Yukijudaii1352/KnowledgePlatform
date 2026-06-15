### CausalNav

```yaml
id: causalnav
name: CausalNav
full_name: 因果导航 (CausalNav)
year: '2026'
org: CMU
paper_url: https://ieeexplore.ieee.org/abstract/document/11345948/
category: frontier_2026
parent: indooruav
motivation: 因果推理增强动态户外长程导航鲁棒性
```

#### 📝 一句话总结

CausalNav 提出面向动态户外环境的长程语义导航系统，通过 LLM 构建多层级 Embodied Graph，并结合 RAG 检索、动态物体时空过滤和全局-局部层次规划，实现开放词汇语言指令下的鲁棒移动机器人导航。

#### 🎯 核心要点

- Embodied Graph：融合离线地图中的建筑节点、在线感知的物体节点、自车历史节点和 LLM 聚类节点
- 开放词汇感知：用 YOLO-World 提取 2D 检测框与分割掩码，结合 LiDAR 投影得到世界坐标下的 3D 物体节点
- 动态过滤：用 CenterPoint + LIOsegmot 跟踪动态物体，并通过 spatial-temporal corridor 移除移动节点
- 层次聚类：根据空间距离与语义 embedding 相似度自底向上聚类，LLM 为聚类节点生成摘要
- RAG 检索：把 Embodied Graph 作为可检索知识库，根据语言查询逐层选择候选目标并做空间-语义重排序
- 分层规划：全局路径由历史轨迹、离线地图或外部地图 API 给出，局部路径由 RH-Map、informed-RRT*、B-spline 和 NMPC-CBF 执行
- 实验验证：在 Gazebo 仿真和校园真实机器人中完成 100m 到 500m+ 长程动态户外导航

#### 🔬 深入细节

##### 框架示意图

![CausalNav 系统框架](https://arxiv.org/html/2601.01872v1/x2.png)
*图：CausalNav 包含开放词汇目标跟踪与自运动估计、动态物体过滤与 Embodied Graph 构建、图更新与语言导航三个主要阶段。*

##### 核心算法伪代码

```python
# CausalNav 在线 Embodied Graph 更新与导航伪代码
G = EmbodiedGraph()

while robot_is_running:
    rgb, lidar, imu = read_sensors()
    ego_pose = lidar_inertial_odometry(lidar, imu)

    detections = yolo_world(rgb)              # open-vocabulary boxes + masks
    tracks = bytetrack(detections)
    for obj in tracks:
        point_cloud = project_lidar_into_mask(lidar, obj.mask)
        bbox3d, obj_pose = fit_3d_bbox(point_cloud, ego_pose)
        G.upsert_object(description=obj.label, bbox=bbox3d, pose=obj_pose)

    dynamic_tracks = centerpoint_liosegmot(lidar, ego_pose)
    for track in dynamic_tracks:
        corridor = update_spatiotemporal_corridor(track)
        if corridor.displacement_steps > k:
            G.remove_dynamic_object(track.id)

    G.add_ego_node(ego_pose)
    G.hierarchical_cluster_with_llm()

    if user_query_available():
        target = G.semantic_retrieve(user_query)
        global_path = plan_global_route(G, target)
        local_traj = informed_rrt_star_with_rhmap(global_path)
        control = nmpc_cbf_track(local_traj, dynamic_obstacles())
        robot.execute(control)
```

##### 方法解释

CausalNav 解决的是户外长程语言导航中的三类问题：语义查询开放、环境动态变化、路径跨度很长。传统视觉导航策略往往依赖固定目标图像或局部拓扑图，难以回答“去靠近消防栓旁边的入口”这类开放词汇指令；同时，车辆和行人会在地图中留下动态残影，导致全局路径和局部避障不稳定。

系统的核心数据结构是 Embodied Graph。物体节点包含描述、3D 包围盒和世界坐标；建筑节点来自离线地图；自车节点记录历史轨迹；聚类节点由 LLM 对相邻物体和建筑区域做语义摘要。静态环境的空间-语义相似度可写为：

$$
\kappa_{ij} = (1-\alpha)\kappa_{ij}^{spatial} + \alpha \kappa_{ij}^{semantic}
$$

其中空间相似度基于地理距离，语义相似度基于 embedding 余弦相似度。这样可以把“垃圾桶/garbage bin”这类标签变体聚到相似区域。

动态物体过滤是 CausalNav 相对普通语义地图的重要改进。系统不只看瞬时速度，而是把对象历史轨迹编码成 spatial-temporal corridor：

$$
\mathcal{T}=\{(T_i^{obj}, \mathrm{3DBBox}_i, t_i)\}_{i=1}^{n}
$$

若对象在时间窗口内位移超过阈值，就从 Embodied Graph 的静态结构中剔除。这能减少路口车辆、行人等暂态对象对长期语义地图的污染。

> 💡 关键：CausalNav 的“因果”直觉在于区分稳定环境结构与短时动态干扰，让长期导航决策依赖可持续的空间-语义因果线索，而不是被瞬态障碍物误导。

语言检索时，系统逐层让 LLM 根据查询 \(q\) 和节点描述 \(C(n_l)\) 打分：

$$
\pi(n_l \mid q) =
\frac{\exp(\gamma \cdot \mathrm{LLM}(q, C(n_l)))}
{\sum_{n' \in \mathcal{L}_l}\exp(\gamma \cdot \mathrm{LLM}(q, C(n')))}
$$

再结合父子链接约束和空间邻近度得到最终候选。检索出的目标进入规划模块：如果目标连接到历史轨迹，就用 Dijkstra；否则调用离线地图或外部地图 API 产生全局航点。局部规划使用 RH-Map 移除动态障碍残影，informed-RRT* 生成初始路径，B-spline 平滑后由 NMPC-CBF 跟踪并保证安全约束。

实验中，CausalNav 在短程和长程仿真任务中保持高成功率，并显著降低动态环境碰撞；真实校园环境中，约 130m 的物体级指令和 512m 的建筑级指令展示了其对大尺度开放词汇导航的适应能力。

#### 🧪 练习题

```yaml
question: "CausalNav 中 spatial-temporal corridor 的主要作用是什么？"
options:
  - "把语言指令翻译成自然语言解释"
  - "记录动态物体的时间轨迹并从长期 Embodied Graph 中移除瞬态移动对象"
  - "压缩大语言模型参数"
  - "替代 LiDAR 完成全部定位"
answer: 1
explain: "时空走廊通过历史 3D 包围盒和时间戳判断对象是否持续移动，避免车辆和行人等动态实体污染长期语义图。"
```
