### Gazebo

```yaml
id: gazebo
name: Gazebo
full_name: "Gazebo机器人仿真器 (Gazebo Robot Simulator)"
year: "2004"
org: "OSF"
paper_url: "https://robotics.usc.edu/publications/394/"
category: "foundation"
parent: "—"
motivation: "开启开源3D多机器人仿真时代，ROS深度集成"
```

#### 📝 一句话总结

Gazebo 提出了面向户外移动机器人研究的开源 3D 动态多机器人仿真器，用真实物理、可配置传感器和客户端/服务器架构解决 2D Stage 类仿真难以复现实景动力学与传感器反馈的问题。

#### 🎯 核心要点

- **3D 多机器人动态仿真**：从二维几何占据仿真扩展到三维刚体世界，支持多个机器人、物体和传感器同时存在
- **物理引擎驱动**：早期 Gazebo 基于 ODE 刚体动力学，强调重力、碰撞、摩擦、接触和关节约束的物理一致性
- **传感器仿真**：通过相机、激光雷达、GPS、IMU 等模型生成接近真实机器人系统的数据流
- **客户端/服务器架构**：仿真服务器维护世界状态并推进物理时间，GUI 和控制程序作为客户端连接
- **Player/Stage/ROS 生态兼容**：早期与 Player 接口结合，后来成为 ROS 机器人软件栈中最常用的仿真后端之一
- **SDF/World 建模范式**：把世界、模型、链接、关节、传感器、插件显式写入场景描述，使机器人和环境可复用

#### 🔬 深入细节

![Gazebo 早期多机器人仿真界面](https://playerstage.sourceforge.net/gazebo/wxgazebo.gif)
*图：Player/Stage/Gazebo 官方历史页面中的 Gazebo 三维仿真界面。原论文 PDF 可访问，但未提供稳定的单图直链，因此这里使用同一项目公开站点的界面图作为框架示意。*

```python
# Gazebo 服务器-客户端仿真流程伪代码
world = load_world("world.sdf")
physics = ODEPhysics(world.gravity, world.contact_params)
sensors = instantiate_sensors(world.models)
plugins = load_model_and_world_plugins(world)

while server.running:
    commands = receive_client_commands()        # Player/ROS/插件输入
    for model in world.models:
        model.apply_actuator_commands(commands)

    contacts = physics.detect_contacts(world.collision_geometries)
    physics.solve_constraints(contacts, world.joints)
    physics.integrate(world.state, dt)

    for sensor in sensors:
        measurement = sensor.render_or_sample(world.state)
        publish(sensor.topic, measurement)

    publish("/world/state", world.state)
```

**动机与背景：为什么需要 Gazebo**

Gazebo 论文的出发点是：移动机器人开始从室内、平面、低速场景走向户外复杂场景，仅靠 Stage 这类二维仿真器很难验证真实机器人会遇到的三维几何、动力学接触和传感器噪声。真实户外实验成本高、可重复性差，还容易损坏硬件；但如果仿真器只提供几何级别的碰撞检测，又无法暴露控制器在坡面、惯性、摩擦和传感器视角变化下的问题。Gazebo 因此把“多机器人 + 三维世界 + 刚体动力学 + 传感器反馈”放进同一开源平台。

**核心机制：世界模型、物理步进与传感器闭环**

Gazebo 的基本对象层级可以抽象为 world → model → link/joint → geometry/sensor/plugin。物理层把每个 link 视为带质量和惯量的刚体，关节和接触通过约束求解器处理。一个典型刚体系统可写成：

$$
M(q)\dot{v} + C(q,v) = \tau + J(q)^T\lambda
$$

其中 \(q\) 是位姿和关节坐标，\(v\) 是广义速度，\(\tau\) 是执行器输入，\(J^T\lambda\) 表示接触与关节约束施加的广义力。Gazebo 的每个仿真步都在“接收控制命令 → 求解物理约束 → 更新世界状态 → 渲染/采样传感器 → 发布数据”之间闭环运行。对机器人算法来说，它看到的不是直接的真值状态，而是传感器模型返回的激光点、图像、里程计或 IMU 数据，这一点使仿真更接近真实机器人系统。

**训练/推理流程：从模型文件到控制算法**

使用 Gazebo 时，研究者先用 SDF/URDF 描述机器人结构、碰撞形状、惯量、关节限制和传感器安装位姿，再用 world 文件描述地形、障碍物、光照和其他机器人。控制器可以作为插件运行在仿真进程内，也可以通过 Player/ROS topic 在外部进程运行。外部算法只需要订阅传感器消息并发布速度、力矩或关节位置命令，就能形成与真实机器人类似的软件闭环。

**与传统仿真的区别**

相比二维 Stage，Gazebo 的关键提升不是“画面更像真实世界”，而是把算法测试从几何路径规划推向物理闭环验证。二维仿真更适合大规模群体行为和快速导航实验，Gazebo 则牺牲一部分速度，换来三维传感器、刚体动力学、碰撞接触和机器人中间件接口。这个设计也解释了 Gazebo 在 ROS 社区长期占据核心位置：它既能让同一套 ROS 节点在仿真与真实机器人之间迁移，又能通过插件和模型库扩展传感器、执行器和场景。

> 💡 关键：Gazebo 的贡献不是单个新动力学算法，而是一种开源机器人仿真的系统范式：用统一世界描述和服务器式物理循环把机器人、环境、传感器和控制软件连接起来。

#### 🧪 练习题

```yaml
question: "Gazebo 相比早期二维 Stage 仿真器最核心的提升是什么？"
options:
  - "只提升了图形渲染分辨率"
  - "把多机器人实验放入三维刚体动力学和传感器闭环中"
  - "取消物理引擎以获得更快仿真速度"
  - "只支持单机器人导航，不支持环境交互"
answer: 1
explain: "Gazebo 的关键是 3D 世界、刚体物理、传感器模型和客户端/服务器控制闭环，而不是单纯视觉效果。"
```
