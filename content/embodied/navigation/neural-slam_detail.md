### Neural SLAM — 主动神经SLAM (Active Neural SLAM)

```yaml
id: neural-slam
name: Neural SLAM
full_name: 主动神经SLAM (Active Neural SLAM)
year: '2020'
org: CMU
paper_url: https://arxiv.org/abs/2004.05155
category: visual_navigation
parent: cmp
motivation: 模块化神经SLAM三层架构
```

#### 📝 一句话总结

Active Neural SLAM（ANS）提出了一种模块化层次化的视觉导航架构，将端到端导航任务解耦为 **Neural SLAM 建图**、**Global Policy 全局规划** 和 **Local Policy 局部控制** 三个独立可训练模块，结合经典路径规划器（Fast Marching Method），在探索和 PointGoal 导航任务上大幅超越端到端基线，并赢得 Habitat Challenge 2019 冠军。

#### 🎯 核心要点

- **模块化三层架构**：Neural SLAM Module（建图+位姿估计）→ Global Policy（长期目标选择）→ Planner（FMM 最短路径）→ Local Policy（底层动作执行），各模块独立训练、可替换
- **Neural SLAM 模块**：包含 Mapper（RGB → 自中心 2D 占据地图，通过空间变换注册到全局地图）和 Pose Estimator（对比连续帧地图预测位姿修正，替代传统里程计）
- **Global Policy**：CNN 网络接收 \(4 \times G \times G\) 的地图张量（障碍物、已探索区域、当前位置、已访问区域），输出 \(G \times G\) 空间中的长期目标点；使用 PPO 训练，奖励为覆盖面积增量
- **Local Policy**：基于 ResNet18 的循环网络，接收 RGB 观测和相对短期目标（距离+角度），通过模仿学习训练，将短期目标转化为底层导航动作
- **Fast Marching Method 规划器**：在预测地图上计算从当前位置到长期目标的最短路径，提取短期目标作为 Local Policy 的输入，桥接全局与局部决策
- **真实噪声建模**：基于 LoCoBot 实机数据采集，用高斯混合模型（GMM）分别拟合执行噪声和传感器噪声，注入 Habitat 仿真器实现 sim-to-real 对齐
- **Exploration 任务**：Gibson Val 上 94.8% 覆盖率 vs 最佳基线 78.9%；跨域迁移 Gibson→MP3D 达 52.1% vs 37.8%
- **PointGoal 任务**：Habitat Challenge 2019 冠军，RGB 赛道 SPL 0.805，RGB-D 赛道 SPL 0.948

#### 🔬 深入细节

##### 核心架构示意图

![ANS 整体架构](https://arxiv.org/html/2004.05155v2/extracted/3629058/figures/model.png)
*图：Active Neural SLAM 整体架构。RGB 观测经 Neural SLAM 模块生成 2D 地图和位姿估计，Global Policy 在地图上选择长期目标，Planner 规划路径并提取短期目标，Local Policy 输出底层动作。*

##### 算法伪代码

```python
# Active Neural SLAM 主循环伪代码
Initialize: map m_0, pose x_0, global_goal g_long

for t in range(T):
    # 1. Neural SLAM: 更新地图和位姿
    s_t = get_rgb_observation()
    x_t_sensor = get_sensor_pose()
    
    # Mapper: RGB → egocentric 2D map → register to global map
    p_t = Mapper(s_t)                          # 预测自中心占据地图 (2×V×V)
    m_t = SpatialTransform(m_{t-1}, p_t, x_t)  # 注册到全局坐标系
    
    # Pose Estimator: 对比连续帧地图修正位姿
    dx_t = PoseEstimator(p_t, p_{t-1}, x_t_sensor - x_{t-1}_sensor)
    x_t = x_{t-1} + dx_t                       # 修正后的全局位姿
    
    # 2. Global Policy: 每 H 步选择长期目标
    if t % H == 0:
        map_input = [obstacle, explored, current_pos, visited]  # 4×G×G
        g_long = GlobalPolicy(map_input)        # 输出 G×G 空间中的目标点
    
    # 3. Planner: FMM 最短路径 → 短期目标
    path = FastMarchingMethod(m_t, x_t, g_long)
    g_short = path[short_term_distance]         # 提取短期目标
    
    # 4. Local Policy: 短期目标 → 动作
    rel_dist, rel_angle = relative_goal(x_t, g_short)
    a_t = LocalPolicy(s_t, rel_dist, rel_angle) # 输出: forward/left/right
    execute(a_t)
```

##### 动机与背景

传统端到端（end-to-end）导航方法试图用单一神经网络直接从像素映射到动作。这种方法存在三个根本性问题：

1. **样本效率低下**：策略需要同时隐式学习建图、规划和控制，导致训练所需样本量巨大
2. **泛化能力差**：端到端策略容易过拟合训练环境的视觉外观，难以迁移到新场景
3. **长程推理困难**：RNN/LSTM 难以维持长时间步的空间记忆，导致智能体在大场景中反复访问已探索区域

> 💡 关键：ANS 的核心洞察是——导航问题天然具有层次结构，应当将"在哪里建图"（感知）、"去哪里"（规划）和"怎么去"（控制）解耦为独立模块，各自用最适合的方式训练。

##### Neural SLAM 模块详解

Neural SLAM 模块由 **Mapper** 和 **Pose Estimator** 两个子模块组成，负责从 RGB 观测构建 2D 俯视占据地图。

**Mapper** 的处理流程：
1. 输入 RGB 图像 \(s_t \in \mathbb{R}^{3 \times H \times W}\)（128×128）
2. 通过 5 层反卷积网络预测自中心（egocentric）2D 占据地图 \(p_t \in [0,1]^{2 \times V \times V}\)，两个通道分别表示障碍物概率和已探索概率
3. 使用基于位姿估计的空间变换（Spatial Transformation），将自中心地图注册到全局地图坐标系

地图更新采用加权平均：

$$m_t(i,j) = \frac{m_{t-1}(i,j) \cdot c_{t-1}(i,j) + \hat{m}_t(i,j)}{c_{t-1}(i,j) + 1}$$

其中 \(c_{t-1}(i,j)\) 是像素 \((i,j)\) 被观测到的次数，\(\hat{m}_t\) 是当前帧注册后的地图预测。这种聚合方式使地图随时间推移越来越精确。

**Pose Estimator** 的设计动机在于：真实机器人的里程计存在累积漂移，尤其在旋转动作中误差显著。Pose Estimator 接收连续两帧的自中心地图 \(p_{t-1}, p_t\) 和传感器位姿差 \(\Delta x'_t\)，通过 3 层卷积 + 3 层全连接网络预测位姿修正量 \(\Delta \hat{x}_t = (\Delta \hat{x}, \Delta \hat{y}, \Delta \hat{o})\)。

> ⚠️ 注意：Pose Estimator 的输入是**地图空间**的特征对比，而非原始 RGB 图像。这使得位姿估计与视觉外观解耦，大幅提升了跨域泛化能力。

##### Global Policy 与 Planner

Global Policy 是一个 5 层 CNN，每 \(H=25\) 个时间步被调用一次。其输入是一个 \(4 \times G \times G\)（\(G=240\)）的张量，4 个通道分别编码：
- 障碍物地图（0/1）
- 已探索区域（0/1）  
- 当前智能体位置（one-hot）
- 历史访问区域（0/1）

此外，智能体朝向通过 Embedding 层单独编码并注入全连接层。Global Policy 输出一个 \(G \times G\) 的概率分布，采样得到长期目标坐标。

训练使用 PPO，奖励函数为覆盖面积增量（\(m^2\)）乘以 0.02 的缩放系数。值得注意的是，Global Policy 的一个"步"对应底层 25 个时间步，因此 PPO 的 horizon=40 实际对应 1000 个底层步。

**Fast Marching Method（FMM）规划器** 是连接 Global Policy 和 Local Policy 的桥梁。给定当前位置和长期目标，FMM 在预测地图的可通行区域上计算最短路径，然后在路径上距当前位置一定距离处提取短期目标。这种设计的优势在于：

1. 利用经典算法的最优性保证，避免学习路径规划
2. 将长程导航分解为一系列短程目标跟踪问题
3. 短期目标始终在可达范围内，降低 Local Policy 的学习难度

##### Local Policy 与训练策略

Local Policy 基于 ResNet18 + GRU 循环网络，接收 RGB 观测和相对短期目标（离散化的距离和角度），输出三个动作之一：前进 25cm、左转 10°、右转 10°。

> 💡 关键：Local Policy 使用**模仿学习**而非强化学习训练。训练数据通过在仿真器中用最短路径规划器生成专家轨迹获得。这种方式比 RL 收敛更快，且不依赖奖励工程。

**三个模块的训练完全独立**：
- **Neural SLAM**：监督学习，使用仿真器提供的地面真值地图和位姿，损失 = 二元交叉熵（地图）+ MSE（位姿，系数 10000）
- **Global Policy**：强化学习（PPO），72 个并行线程，每线程对应一个 Gibson 训练场景
- **Local Policy**：模仿学习（二元交叉熵），专家策略由最短路径规划器提供

这种独立训练策略带来两个重要优势：（1）避免了端到端训练中梯度传播困难的问题；（2）每个模块可以用最适合其任务性质的学习范式。

##### 与传统方法的对比

| 维度 | 端到端 RL | 经典 SLAM + 规划 | ANS（本文） |
|------|----------|-----------------|------------|
| 建图 | 隐式（RNN 记忆） | 几何方法（特征匹配） | 学习型 Mapper + Pose Estimator |
| 规划 | 隐式（策略网络） | A*/Dijkstra | Global Policy（学习）+ FMM（经典） |
| 控制 | 端到端策略 | PID 控制器 | Local Policy（学习） |
| 泛化 | 差（过拟合外观） | 好（几何不变） | 好（模块化解耦） |
| 样本效率 | 低 | N/A | 高（独立训练） |

ANS 的核心创新在于**在学习型组件和经典算法之间找到最优平衡**：需要从数据中学习的部分（视觉建图、目标选择、底层控制）使用神经网络，而有成熟解析解的部分（路径规划）直接使用经典算法。

##### 实验结果亮点

**Exploration 任务**（Gibson Val，1000 步）：

| 方法 | 覆盖率 (%) |
|------|-----------|
| Frontier-Based Exploration (FBE) | 73.2 |
| RL + Occupancy Anticipation | 78.9 |
| **ANS (本文)** | **94.8** |

**消融实验**关键发现：
- 移除 Pose Estimator：覆盖率下降 3.2%（最大影响）
- 用 FBE 替换 Global Policy：下降 2.3%
- 移除 Local Policy（直接用规划器动作）：下降 0.7%

**跨域泛化**（Gibson 训练 → MP3D 测试）：ANS 52.1% vs 最佳基线 37.8%，展示了模块化架构的强泛化能力。

**PointGoal 导航**（Habitat Challenge 2019）：
- RGB 赛道：SPL = 0.805（冠军）
- RGB-D 赛道：SPL = 0.948（冠军）

#### 🧪 练习题

```yaml
question: "Active Neural SLAM 中，Pose Estimator 的输入是什么？"
options:
  - "连续两帧 RGB 图像和 IMU 读数"
  - "连续两帧的自中心预测地图和传感器位姿差"
  - "全局地图和当前 RGB 图像"
  - "激光雷达点云和里程计数据"
answer: 1
explain: "Pose Estimator 接收连续两帧的自中心占据地图 p_{t-1}、p_t 和传感器位姿差 Δx'_t，在地图空间而非图像空间进行位姿修正，这使其与视觉外观解耦，提升跨域泛化能力。"
```