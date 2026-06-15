### Habitat 1.0

```yaml
id: habitat
name: "Habitat 1.0"
full_name: "Habitat具身AI平台 (Habitat Platform)"
year: "2019"
org: "Meta AI"
paper_url: "https://arxiv.org/abs/1904.01201"
category: "interactive"
parent: "—"
motivation: "实现万帧级超高速渲染，加速大规模RL"
```

#### 📝 一句话总结

Habitat 1.0 提出了由 Habitat-Sim 和 Habitat-API 组成的高性能具身 AI 平台，通过通用 3D 数据集接入、超高速渲染和任务 API 解决真实室内环境中大规模训练与标准评测难以兼得的问题。

#### 🎯 核心要点

- **Habitat-Sim**：C++ 后端高性能渲染器，支持可配置 agent、传感器和多种 3D 场景数据集
- **Habitat-API**：高层 Python 框架，用于定义任务、episode、测度、基线、训练和评测流程
- **通用数据集支持**：通过 scene graph 和资源管理器接入 Matterport3D、Gibson、Replica 等真实扫描环境
- **超高速渲染**：论文报告 Matterport3D 场景单线程数千 FPS，多进程单 GPU 可超过 10,000 FPS
- **标准导航评测**：用 PointGoal Navigation 和 SPL 等指标比较学习式 agent 与经典导航方法
- **模块化软件栈**：将 3D assets、simulator、task/benchmark 分层，便于替换数据集、传感器、任务和算法

#### 🔬 深入细节

![Habitat 软件栈](https://ar5iv.labs.arxiv.org/html/1904.01201/assets/x1.png)
*图：Habitat Figure 1。平台把 3D assets、仿真器和具身任务组织成统一软件栈，其中 Habitat-Sim 负责高性能渲染，Habitat-API 负责任务和评测。*

```python
# Habitat 训练/评估流程伪代码
import habitat

config = habitat.get_config("pointnav_rgbd.yaml")
env = habitat.Env(config)

for episode in env.episodes:
    obs = env.reset()
    path_length = 0.0

    while not env.episode_over:
        action = policy(obs)                 # STOP, MOVE_FORWARD, TURN_LEFT, ...
        obs = env.step(action)
        path_length += env.get_last_distance()

    metrics = env.get_metrics()              # success, distance_to_goal, spl
```

**动机与背景：具身 AI 的瓶颈是可扩展真实感模拟**

具身智能体需要在大量三维环境中学习导航、问答和指令执行。真实机器人实验昂贵且慢，而早期室内仿真器要么渲染慢，要么数据集和任务接口不统一。Habitat 的动机是建立一个社区级软件栈：底层能高速渲染真实扫描环境，上层能标准化定义任务与指标，从而让大规模 RL 和公平评测同时成立。

**核心机制：Habitat-Sim 与 Habitat-API 分层**

Habitat-Sim 负责加载 3D 资源、维护 scene graph、配置 agent 和 sensors，并输出 RGB、depth、semantic 等观测。Habitat-API 则定义：

- `Simulator`：后端仿真接口
- `Agent`：具身体、动作空间和传感器
- `Task`：动作扩展、终止条件、成功标准和奖励
- `Environment`：episode、reset/step、metrics 的统一入口

这种分层可抽象为：

$$
o_t = \mathrm{SensorSuite}(\mathrm{SceneGraph}, x_t), \quad
x_{t+1} = \mathrm{Simulator}(x_t, a_t), \quad
m = \mathrm{TaskMetrics}(\tau)
$$

其中 \(\tau\) 是完整轨迹，metrics 由任务层统一计算。

**高性能渲染为什么重要**

在视觉导航 RL 中，环境帧数可能达到千万级。如果仿真器只有几十 FPS，训练时间会被渲染拖垮。Habitat-Sim 使用 C++ 后端、Magnum 图形中间件和高效 shader，把真实扫描场景的 RGB-D/语义渲染速度提升到单线程数千 FPS，并支持多进程共享单 GPU。论文的关键判断是：当仿真达到 10,000 FPS 量级时，瓶颈从“生成图像”转移到“优化神经网络”。

**评测流程：SPL 指标**

Habitat 采用 PointGoal Navigation 展示平台能力。导航成功率之外，论文使用 SPL 衡量路径效率：

$$
\mathrm{SPL} = \frac{1}{N}\sum_{i=1}^{N} S_i \frac{l_i}{\max(p_i, l_i)}
$$

其中 \(S_i\) 表示第 \(i\) 个 episode 是否成功，\(l_i\) 是最短路径长度，\(p_i\) 是 agent 实际路径长度。这个指标鼓励 agent 不仅到达目标，还要接近最短路径。

**与 AI2-THOR/VirtualHome 的区别**

AI2-THOR 更强调物体状态交互和语义动作，VirtualHome 更强调家庭活动程序；Habitat 1.0 的核心是高速视觉导航和标准评测。它在 1.0 论文中对物体交互不是重点，但通过 scene graph、agent API 和 task API 为后续 Habitat 2.0 等交互式版本奠定了架构基础。

> 💡 关键：Habitat 让真实扫描室内环境中的视觉导航训练从“仿真太慢”变成“算法优化和泛化能力才是瓶颈”。

#### 🧪 练习题

```yaml
question: "Habitat 1.0 中 SPL 指标衡量的是什么？"
options:
  - "只统计每秒渲染帧数"
  - "同时考虑导航是否成功以及实际路径相对最短路径的效率"
  - "只衡量 RGB 图像清晰度"
  - "只统计模型参数量"
answer: 1
explain: "SPL = success 加权的 shortest-path efficiency；成功但绕远路会被惩罚，失败则该 episode 贡献为 0。"
```
