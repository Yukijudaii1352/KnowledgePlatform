### RTAB-MAP — 实时外观建图 (Real-Time Appearance-Based Mapping)

```yaml
id: rtab-map
name: RTAB-MAP
full_name: "实时外观建图 (Real-Time Appearance-Based Mapping)"
year: "2019"
org: "Laval University"
paper_url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/rob.21831"
category: "slam"
parent: "—"
motivation: "外观闭环大规模长期在线SLAM"
```

#### 📝 一句话总结

RTAB-Map 将外观词袋闭环检测、图优化和 STM/WM/LTM 记忆管理组合成一个长期在线 SLAM 框架，解决了大规模运行时闭环检测和地图更新计算量随地图无限增长的问题。

#### 🎯 核心要点

- **外观闭环检测**：使用视觉词袋估计当前观测与历史位置的相似度，发现重访位置
- **图式 SLAM 后端**：节点保存传感器数据和里程计位姿，边表示邻接、闭环与近邻约束
- **记忆管理机制**：将节点划分为 Short-Term Memory、Working Memory、Long-Term Memory，以固定时间预算处理长期运行
- **多传感器输入**：支持 RGB-D、双目、2D LiDAR、3D LiDAR、外部 odometry、IMU 等组合
- **ROS 工程化输出**：直接发布 MapData、MapGraph、/map→/odom 校正、OctoMap、点云和 2D occupancy grid
- **多会话建图**：机器人重启或进入已有地图时，可通过闭环将新会话地图与旧地图对齐
- **长期在线约束**：当处理时间或工作记忆节点数超过阈值时，将低权重节点转入长期记忆，保持实时性

#### 🔬 深入细节

![RTAB-Map ROS 主节点输入输出](https://arxiv.org/html/2403.06341v1/x1.png)
*图：RTAB-Map 的 rtabmap 主节点。外部 odometry、相机/LiDAR 数据同步后进入图式 SLAM，输出图、点云、OctoMap、2D 栅格和 map 到 odom 的校正。*

```python
# RTAB-Map 核心流程伪代码
def rtab_map(sensor_stream, odometry_stream):
    graph = PoseGraph()
    STM, WM, LTM = ShortTermMemory(), WorkingMemory(), LongTermMemory()

    for synced_obs, odom in synchronize(sensor_stream, odometry_stream):
        # 1. 创建节点：保存原始传感器、局部栅格、视觉词等
        node = STM.create_node(obs=synced_obs, pose=odom.pose)
        graph.add_neighbor_edge(previous_node(), node, odom.delta)

        # 2. 与工作记忆中的节点做外观闭环和空间近邻检测
        visual_words = extract_bow(node)
        loop = detect_loop_closure(visual_words, WM)
        proximity = detect_proximity(node, WM)

        if loop.accepted:
            graph.add_loop_edge(node, loop.node, loop.transform)
        if proximity.accepted:
            graph.add_proximity_edge(node, proximity.node, proximity.transform)

        # 3. 图优化传播闭环误差
        if loop.accepted or proximity.accepted:
            graph.optimize()
            recall_neighbors_from_LTM(loop.node, LTM, WM)

        # 4. 根据时间/容量阈值做记忆管理
        WM.add(node)
        while update_time_too_high() or WM.too_large():
            old = select_low_weight_old_node(WM)
            WM.move_to_LTM(old, LTM)

        # 5. 发布可导航地图
        publish_map_graph(graph)
        publish_occupancy_grid(assemble_local_grids(graph, WM))
```

##### 动机与背景

RTAB-Map 最初不是一个单纯的视觉里程计，而是为“长期在线建图”设计的外观闭环系统。普通图式 SLAM 随着节点越来越多，会在闭环检测、图优化和地图拼接上越来越慢；如果机器人要在建筑物、校园或工厂里持续运行，系统必须在固定时间预算内输出可用地图，而不是等全部历史节点都参与计算。

论文扩展版强调 RTAB-Map 的工程目标：让同一个框架支持视觉 SLAM、LiDAR SLAM 以及混合传感器配置，并直接服务 ROS 导航。它把 odometry 作为外部输入，因此前端既可以是视觉里程计，也可以是 LiDAR scan matching、轮速计/IMU 融合或其他系统输出。

##### 图结构与节点内容

RTAB-Map 的地图是一个位姿图。每个节点代表一个时间点或关键观测，保存 odometry 位姿、原始传感器数据、局部 occupancy grid、视觉词袋等信息。边分为三类：相邻边连接连续节点，闭环边连接外观上匹配的历史位置，近邻边连接空间上接近但未必由外观闭环触发的位置。

当闭环或近邻约束加入图中时，后端执行图优化，把 odometry 漂移分配到整张图上。优化后系统重新组合局部栅格、点云或 OctoMap，并通过 `/map -> /odom` 变换发布全局校正，使下游导航模块获得一致坐标系。

##### 外观闭环与词袋检索

RTAB-Map 的核心闭环检测来自 appearance-based retrieval。当前图像被转换成视觉词集合 \(W_t\)，历史节点也保存各自的视觉词，系统计算当前观测属于历史位置的概率或相似度：

$$
s(i,t)=\text{sim}(W_i, W_t)
$$

相似度最高的候选不会直接成为闭环，还需要几何验证来估计相对变换。通过验证后，闭环边才会加入图中。这样可以降低重复纹理、光照变化或动态物体造成的误匹配风险。

##### STM / WM / LTM 记忆管理

RTAB-Map 最有辨识度的设计是记忆分层。Short-Term Memory 负责刚进入系统的新节点；Working Memory 包含当前可用于闭环检测、近邻检测和地图组装的活跃节点；Long-Term Memory 保存暂时被转出的旧节点。系统根据时间阈值 `Rtabmap/TimeThr` 或容量阈值 `Rtabmap/MemoryThr` 控制 WM 大小。

节点是否留在 WM 由权重机制决定。反复被观察到、与邻近节点外观相似、对定位更有价值的位置权重较高；低权重且较老的节点会优先转入 LTM。当机器人重新进入某个旧区域并发生闭环时，闭环节点附近的 LTM 节点可以被召回到 WM，逐步恢复历史地图。

> 💡 关键：RTAB-Map 并不是简单丢弃旧地图，而是在“实时计算预算”和“长期记忆”之间做动态交换。闭环会触发记忆召回，使系统既在线又能长期定位。

##### 与传统视觉 SLAM 的区别

ORB-SLAM2 等系统强调特征跟踪、局部 BA 和稀疏地图，常常没有直接可用于导航的 2D/3D occupancy 输出。RTAB-Map 更像一个工程化 SLAM 中枢：前端 odometry 可替换，后端闭环与图优化稳定，输出直接适配导航栅格和点云。它的创新不在单个特征描述子，而在长期运行时的闭环、记忆管理和多传感器统一。

#### 🧪 练习题

```yaml
question: "RTAB-Map 中 Working Memory 转入 Long-Term Memory 的主要目的是什么？"
options:
  - "提高相机图像分辨率"
  - "把闭环检测、图优化和地图组装限制在实时可处理规模内"
  - "让所有历史节点永远参与每次匹配"
  - "完全删除旧地图以节省磁盘空间"
answer: 1
explain: "RTAB-Map 通过 STM/WM/LTM 控制活跃节点数量，使长期在线运行时每次更新仍能满足固定时间预算；旧节点可在闭环时从 LTM 召回。"
```
