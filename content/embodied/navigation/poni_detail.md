### PONI — 目标导航势函数 (Potential Functions for ObjectNav)

```yaml
id: "poni"
name: "PONI"
full_name: "目标导航势函数 (Potential Functions for ObjectNav)"
year: "2022"
org: "UT Austin"
paper_url: "https://arxiv.org/abs/2202.poni"
category: "object_navigation"
parent: "semexp"
motivation: "势函数引导高效目标导航"
```

#### 📝 一句话总结

PONI 提出用监督学习得到的目标导航势函数来回答“应该去哪里找目标”，把 ObjectNav 中的语义搜索从昂贵的交互式强化学习改成基于被动语义地图的感知预测问题。

#### 🎯 核心要点

- **三段式模块化导航**：语义建图器构建 allocentric 语义地图，势函数网络选择长程目标，解析局部规划器执行移动。
- **交互无关训练**：势函数网络只用离线 top-down 语义地图训练，不需要在仿真器中用 RL 反复试错。
- **双势函数设计**：Area Potential 估计 frontier 背后可探索区域，Object Potential 估计 frontier 到目标实例成功区域的地理距离价值。
- **frontier 上预测价值**：只在已探索与未知区域边界上定义势函数，因为任意未知区域的可达路径都必须经过 frontier。
- **UNet 编码-解码网络**：共享语义地图编码器，分别输出 1 通道面积势函数和多类别目标势函数。
- **训练成本优势**：论文报告在 Gibson 与 Matterport3D 上达到或超过强 ObjectNav 基线，同时训练计算量相比 RL 搜索策略低得多。

#### 🔬 深入细节

##### 框架图

![PONI 架构图](https://ar5iv.labs.arxiv.org/html/2201.10029/assets/x2.jpg)
*图：PONI 的三段式架构。语义建图器产生俯视语义地图，势函数网络预测 area/object potentials 并选取长程目标，局部策略用解析规划到达该目标。清单中的 `paper_url` 是占位符，实际公开论文为 arXiv:2201.10029。*

##### 算法伪代码

```python
# PONI: interaction-free ObjectNav
semantic_map = zeros_map()
while not timeout:
    rgb, depth, pose = observe()
    semantic_map = update_allocentric_semantic_map(rgb, depth, pose)

    # 势函数网络只负责“去哪里找”
    area_pf, object_pf_all = potential_net(semantic_map)
    object_pf = object_pf_all[goal_category]
    frontier_mask = extract_frontiers(semantic_map)

    score = lambda_area * area_pf + (1 - lambda_area) * object_pf
    score = score * frontier_mask
    long_term_goal = argmax(score)

    # 局部移动不再学习，直接用地图上的最短路
    path = fast_marching_method(semantic_map.obstacle_channel, long_term_goal)
    action = deterministic_local_controller(path)
    execute(action)

    if goal_visible_and_near(goal_category):
        execute("stop")
        break
```

##### 方法拆解

ObjectNav 的困难不只是走到一个坐标，而是目标位置在开始时未知。SemExp 等模块化方法已经证明“显式语义地图 + 长程目标 + 局部规划”很有效，但长程目标采样策略仍靠 RL 交互学习。PONI 的关键判断是：找目标的高层搜索本质上是“从当前部分语义地图推断哪里更可能通向目标”的感知问题，因此可以用完整语义标注地图构造监督信号，而不是让智能体在环境里反复撞墙和探索。

PONI 在 partial semantic map 的 frontier 上定义势函数。Area Potential 衡量一个 frontier 背后能带来多少新 free space，它提供早期探索驱动力；Object Potential 衡量从 frontier 到目标类别成功区域的 geodesic proximity，它提供语义搜索驱动力。可以把二者理解为探索与利用的组合：

$$P(x, c)=\lambda P_{\text{area}}(x)+(1-\lambda)P_{\text{obj}}(x,c)$$

其中 \(x\) 是 frontier 位置，\(c\) 是目标类别。Object Potential 常按到最近目标成功区域的地理距离衰减：

$$P_{\text{obj}}(x,c)=\exp\left(-\frac{d_g(x,\mathcal{G}_c)}{\tau}\right)$$

直觉上，frontier 背后空间越大、离目标成功区越近，越值得去看。只在 frontier 上评分也降低了学习难度，因为已探索区域通常无需再次作为探索目标，未知区域又不能直接规划到达。

训练数据来自 Gibson 和 Matterport3D 等数据集的 3D 语义标注投影。作者先得到完整俯视语义地图，再随机采样两点间最短路径，把路径附近的 patch 视为“已探索”，其余区域视为未知，由此构造 partial map。完整地图用于离线计算 area/object potential 的监督标签，模型输入 partial map，输出势函数图，损失是 frontier 像素上的均方误差。

推理时，语义建图器使用 RGB-D、位姿和分割模型更新 top-down semantic map。势函数网络输出长程目标后，局部策略用 Fast Marching Method 在障碍地图上求最短路，再执行离散动作。这个设计刻意把“在哪里找”与“如何走过去”分离，使学习模块聚焦于语义搜索，几何避障交给确定性规划。

与端到端 RL 相比，PONI 的优势是样本效率与可解释性：长程目标可视化为势函数热力图，失败时能判断是建图、分割、势函数还是局部规划出了问题。与普通 frontier-based exploration 相比，它不会盲目探索最近边界，而会利用“床旁有床头柜、马桶在卫生间、电视在客厅”等对象-房间与对象-对象先验。

> 💡 关键：PONI 并不是学习完整导航策略，而是学习一个可插入模块化导航栈的“frontier 价值函数”。这让它继承 SemExp 式语义建图的泛化能力，同时避免 RL 长程探索训练的高成本。

#### 🧪 练习题

```yaml
question: "PONI 为什么只在 frontier 上定义势函数？"
options:
  - "因为 frontier 总是目标物体的真实位置"
  - "因为任意未知区域的可达路径都必须经过 frontier，足以决定下一步探索方向"
  - "因为局部规划器不能处理已探索区域"
  - "因为语义分割模型只在 frontier 上输出类别"
answer: 1
explain: "frontier 是已探索 free space 与未知区域的边界。目标未知时，去任意新区域都要先经过某个 frontier，因此在 frontier 上评分即可选择长程探索目标。"
```
