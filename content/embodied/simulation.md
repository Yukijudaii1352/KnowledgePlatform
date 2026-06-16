---
domain: embodied
topic_id: simulation
topic_name: 具身智能仿真
page_icon: 🎮
page_title: 具身智能仿真技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 从早期物理引擎到GPU大规模并行仿真，再到生成式数字孪生的技术演进历程，涵盖Isaac Sim、MuJoCo、Genesis等核心平台与基准测试体系。
hero_pills:
- 🏷️ Physics Engine · Sim2Real · Parallel Simulation
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 基础物理引擎
    color: '#22a06b'
  interactive:
    label: 交互式视觉仿真
    color: '#5b63d3'
  benchmark:
    label: 基准测试平台
    color: '#e8820c'
  parallel:
    label: 大规模并行仿真
    color: '#c9302c'
  generative:
    label: 生成式仿真
    color: '#9c27b0'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/embodied/simulation/overview/zhihu__综述：从物理模拟器和世界模型中学习具身智能（上）__4e61adb8/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/embodied/simulation/latest/zhihu__仿真器_vs_世界模型,具身智能的两条主路终于被画进同一张地图__2395500c/article.md

## 算法演化关系

```yaml
nodes:
- id: gazebo
  x: 50
  y: 50
  category: foundation
- id: mujoco
  x: 150
  y: 60
  category: foundation
- id: vrep
  x: 180
  y: 50
  category: foundation
- id: pybullet
  x: 250
  y: 50
  category: foundation
- id: dm_control
  x: 300
  y: 60
  category: foundation
- id: brax
  x: 450
  y: 70
  category: foundation
- id: ai2thor
  x: 270
  y: 150
  category: interactive
- id: virtualhome
  x: 310
  y: 180
  category: interactive
- id: habitat
  x: 360
  y: 160
  category: interactive
- id: sapien
  x: 400
  y: 190
  category: interactive
- id: igibson
  x: 450
  y: 170
  category: interactive
- id: tdw
  x: 450
  y: 200
  category: interactive
- id: procthor
  x: 520
  y: 150
  category: interactive
- id: omnigibson
  x: 600
  y: 180
  category: interactive
- id: habitat_3
  x: 650
  y: 160
  category: interactive
- id: robosuite
  x: 400
  y: 280
  category: benchmark
- id: rlbench
  x: 400
  y: 310
  category: benchmark
- id: metaworld
  x: 400
  y: 330
  category: benchmark
- id: calvin
  x: 520
  y: 300
  category: benchmark
- id: maniskill3
  x: 650
  y: 290
  category: benchmark
- id: robocasa
  x: 650
  y: 320
  category: benchmark
- id: embodied_arena
  x: 800
  y: 300
  category: benchmark
- id: rbench
  x: 780
  y: 330
  category: benchmark
- id: isaac_gym
  x: 450
  y: 420
  category: parallel
- id: isaac_sim
  x: 600
  y: 420
  category: parallel
- id: mujoco_playground
  x: 730
  y: 450
  category: parallel
- id: newton
  x: 800
  y: 420
  category: parallel
- id: mo_playground
  x: 800
  y: 460
  category: parallel
- id: genesis
  x: 670
  y: 550
  category: generative
- id: embodied_gen
  x: 750
  y: 560
  category: generative
- id: gs_playground
  x: 820
  y: 570
  category: generative
edges:
- from: mujoco
  to: dm_control
  label: 标准化控制
- from: mujoco
  to: brax
  label: 可微分优化
- from: mujoco
  to: robosuite
  label: 模块化封装
- from: mujoco
  to: metaworld
  label: 多任务基准
- from: mujoco
  to: mujoco_playground
  label: 高速训练
- from: vrep
  to: rlbench
  label: 基准测试
- from: ai2thor
  to: procthor
  label: 程序化生成
- from: habitat
  to: habitat_3
  label: 社交协作
- from: igibson
  to: omnigibson
  label: 光追渲染
- from: sapien
  to: maniskill3
  label: GPU并行
- from: robosuite
  to: robocasa
  label: 家庭场景
- from: isaac_gym
  to: isaac_sim
  label: 高保真化
- from: isaac_gym
  to: mo_playground
  label: 多目标优化
- from: isaac_sim
  to: newton
  label: 物理稳定性
- from: genesis
  to: embodied_gen
  label: 生成式构建
- from: genesis
  to: gs_playground
  label: 3DGS渲染
- from: mujoco
  to: isaac_gym
  label: GPU加速
- from: isaac_gym
  to: genesis
  label: 统一求解器
milestones:
- mujoco
- isaac_gym
- genesis
```

## 核心算法

### Gazebo

```yaml
id: gazebo
num: 1
name: Gazebo
full_name: Gazebo机器人仿真器 (Gazebo Robot Simulator)
year: '2004'
org: OSF
parent: —
paper_url: https://robotics.usc.edu/publications/394/
project_url: ''
category: foundation
motivation: 开启开源3D多机器人仿真时代，ROS深度集成
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

### MuJoCo

```yaml
id: mujoco
num: 2
name: MuJoCo
full_name: 多关节接触动力学引擎 (Multi-Joint dynamics with Contact)
year: '2012'
org: UW/DeepMind
parent: —
paper_url: https://mujoco.org/
project_url: ''
category: foundation
motivation: 奠定模型预测控制与接触动力学仿真基础
```

#### 📝 一句话总结
MuJoCo 提出了面向模型预测控制和机器人学习的高性能多关节接触动力学引擎，通过广义坐标递归动力学与稳定的 velocity-stepping 接触求解，解决弹簧阻尼式接触难以同时兼顾速度、稳定性和可控性的难题。

#### 🎯 核心要点
- **广义坐标建模**：用关节坐标直接表示多体系统，避免把每个刚体都转成笛卡尔约束后再求解的低效表示
- **前向/逆向动力学统一**：既可从力矩求加速度，也可从期望加速度反推约束力和控制力，适合 MPC 与 trajectory optimization
- **velocity-stepping 接触模型**：用速度层面的约束和软接触参数处理碰撞、摩擦与关节限制，避免刚性冲击造成数值不稳定
- **MJCF/XML 模型格式**：用紧凑 XML 描述 body、joint、geom、actuator、sensor 和 equality constraint
- **快而稳定的连续控制基准**：后来成为 DDPG、TRPO、PPO、SAC、DM Control 等连续控制研究的事实标准仿真后端
- **依据限制**：清单中的 `paper_url` 指向 MuJoCo 项目主页而非论文页，本文同时依据官方文档与 2012 IROS 论文 “MuJoCo: A physics engine for model-based control” 解读

#### 🔬 深入细节
![MuJoCo hello 示例](https://mujoco.readthedocs.io/en/3.2.6/_images/hello.png)
*图：MuJoCo 官方文档中的基础模型渲染示例。它体现了 MuJoCo 的核心使用方式：从 MJCF 模型加载多体系统，再用统一仿真循环推进动力学。*

```python
# MuJoCo 动力学步进伪代码
model = load_mjcf("robot.xml")
data = init_state(model)

while running:
    data.ctrl[:] = controller(data.qpos, data.qvel, data.sensordata)

    # 1. 由广义坐标计算运动学、惯量、偏置力
    M, c = compute_recursive_dynamics(model, data.qpos, data.qvel)

    # 2. 碰撞检测并构造接触/关节/摩擦约束
    contacts = collision_detection(model, data)
    J, cone, params = build_constraints(contacts, model.equality, model.limits)

    # 3. 在速度层面求解约束冲量/接触力
    lambda_c = solve_velocity_step(M, c, data.ctrl, J, cone, params)

    # 4. 积分得到下一状态
    qacc = inv(M) @ (actuator_force(data.ctrl) - c + J.T @ lambda_c)
    data.qvel += dt * qacc
    data.qpos = integrate_position(data.qpos, data.qvel, dt)
```

**动机与背景：控制研究需要“可优化”的物理引擎**

传统游戏物理引擎往往优先考虑视觉可信和实时运行，而机器人控制需要的是可重复、可查询、可被优化器频繁调用的动力学模型。模型预测控制要在每个控制周期内展开大量候选轨迹；如果接触模型不稳定，优化器会被不连续冲击、穿透修正和弹簧参数调节困住。MuJoCo 的设计目标就是把接触丰富的多关节系统变成适合控制优化的计算对象。

**核心机制：广义坐标与约束力求解**

MuJoCo 用广义坐标 \(q\) 表示铰链、滑轨、球关节和自由关节等自由度，多体动力学可以写成：

$$
M(q)\dot{v} + c(q,v) = \tau + J(q)^T f
$$

其中 \(M(q)\) 是广义惯量矩阵，\(c(q,v)\) 汇总科氏力、离心力、重力等偏置项，\(\tau\) 是执行器力，\(J^T f\) 是接触、摩擦、关节限制等约束产生的广义力。与直接用笛卡尔刚体坐标加大量约束相比，广义坐标天然消除了机器人关节内部的约束冗余，因此高自由度机器人更容易快速求解。

**接触为何采用 velocity stepping**

接触动力学最难的部分是非穿透和摩擦。弹簧阻尼模型会把接触写成“穿透越深，回复力越大”，实现简单但步长、刚度和阻尼非常敏感。MuJoCo 采用 velocity-stepping 思路，在每个时间步求一个满足约束的速度更新：非穿透约束限制法向速度，摩擦锥限制切向力，软约束参数则控制接触的顺应性。直觉上，求解器不是等物体穿进去再大力弹出来，而是在速度层面提前决定“下一步允许怎样运动”。

**训练/推理流程：为什么它成为 RL 基准后端**

在强化学习中，环境每一步只需要执行 `ctrl -> mj_step -> observation/reward`。MuJoCo 的优势在于这个循环快、确定性强、任务建模紧凑，并且能表达半猎豹、蚂蚁、人形、机械臂等多关节接触任务。DM Control 和 OpenAI Gym MuJoCo 任务都建立在这一点上：策略学习算法不需要理解底层约束求解，只要把动作当作关节力矩或目标位置输入，就能得到高频、稳定的连续控制转移。

**与传统方法的区别**

相比 Gazebo 这类完整机器人中间件仿真平台，MuJoCo 更像一个为动力学计算和控制优化打磨的核心引擎：场景管理和机器人软件接口不是重点，快速稳定的多体接触求解才是重点。相比游戏物理引擎，MuJoCo 更重视广义坐标、逆动力学、可重复数值行为和模型可调参数，这使它特别适合 MPC、系统辨识、轨迹优化和连续控制 RL。

> ⚠️ 注意：MuJoCo 的“准确”并不意味着所有现实接触都被完整建模；它的价值在于提供可控、稳定、速度足够高的近似动力学，使优化和学习算法能在接触丰富任务上反复迭代。

#### 🧪 练习题
```yaml
question: "MuJoCo 选择广义坐标和 velocity-stepping 接触求解的主要目的是什么？"
options:
  - "把所有机器人都简化成二维质点"
  - "提升多关节接触系统在控制优化中的速度和数值稳定性"
  - "避免使用任何摩擦模型"
  - "只支持图像渲染，不支持动力学"
answer: 1
explain: "MuJoCo 面向模型预测控制和机器人学习，广义坐标减少约束冗余，velocity stepping 让接触和摩擦在速度层面稳定求解。"
```

### CoppeliaSim

```yaml
id: vrep
num: 3
name: CoppeliaSim
full_name: CoppeliaSim仿真平台 (CoppeliaSim)
year: '2013'
org: Coppelia
parent: —
paper_url: https://www.coppeliarobotics.com/
project_url: ''
category: foundation
motivation: 分布式控制架构，支持多种物理引擎集成
```

#### 📝 一句话总结
CoppeliaSim/V-REP 提出了以场景对象、嵌入式脚本、插件和远程 API 组合的通用机器人仿真框架，用分布式控制架构解决复杂机器人系统难以在单一控制循环中建模、调试和复用的问题。

#### 🎯 核心要点
- **分布式控制模型**：每个模型、对象或子系统可拥有自己的 child script、插件或远程控制进程，支持异步协同
- **多物理引擎后端**：支持将动力学求解交给不同物理引擎，便于在速度、稳定性和接触效果之间取舍
- **场景对象层级**：把机器人、传感器、碰撞体、路径、脚本和 UI 统一组织在可编辑场景树中
- **多接口集成**：内置 Lua 脚本、C/C++ 插件、remote API、ROS/ROS2 接口，适合教学、原型和机器人学习
- **模型部署便利性**：论文强调减少仿真模型部署复杂度，让用户能直接加载机器人模型并组合控制策略
- **依据限制**：清单中的 `paper_url` 是项目主页而非论文页，本文依据官方主页与 2013 IROS 论文 “V-REP: A Versatile and Scalable Robot Simulation Framework” 解读

#### 🔬 深入细节
![CoppeliaSim 官方框架示意](https://www.coppeliarobotics.com/assets/img/illustrations/hero.svg)
*图：CoppeliaSim 官方主页的仿真平台示意。论文原图多在 PDF 中，未提供稳定图片直链；这里用官方公开图表示其“场景 + 机器人 + 外部控制程序”式工作流。*

```python
# CoppeliaSim/V-REP 分布式控制伪代码
scene = load_scene("factory_or_home.ttt")
physics_backend = choose_engine(["Bullet", "ODE", "Vortex", "Newton"])

while simulation_running:
    for script in scene.child_scripts:
        script.sysCall_actuation()          # 每个对象/模型可有局部控制逻辑

    for plugin in loaded_plugins:
        plugin.handle_callbacks(scene)

    remote_commands = remote_api.poll()     # Python/C++/ROS 外部控制器
    apply_commands(scene, remote_commands)

    physics_backend.step(scene.dynamic_objects, dt)
    update_sensors(scene.vision_sensors, scene.proximity_sensors)

    for script in scene.child_scripts:
        script.sysCall_sensing()

    remote_api.publish(scene.state, sensor_packets)
```

**动机与背景：复杂机器人系统不是单控制器问题**

许多机器人仿真平台把控制逻辑集中在一个主程序里，这对简单移动机器人足够，但对含机械臂、移动底盘、传感器阵列、输送线、多个协作机器人和外部算法的系统就会变得笨重。V-REP 的论文动机是提供一个“通用、可扩展、可移植”的框架，让不同控制技术可以直接嵌入同一场景：有些逻辑写在模型内部脚本里，有些由插件处理，有些通过网络 API 从外部程序控制。

**核心机制：场景树与脚本生命周期**

CoppeliaSim 的场景树类似机器人系统的运行时对象图。每个 object 不只是几何体，也可以携带传感器、碰撞属性、动力学属性和脚本。脚本按仿真生命周期被调用，例如初始化、actuation、sensing 和清理阶段。这个设计让一个夹爪模型可以自带闭合控制逻辑，一个移动底盘可以自带里程计发布逻辑，一个外部强化学习程序只负责更高层动作。

可以把一次仿真步抽象为：

$$
x_{t+1} = F_{\text{engine}}\left(x_t,\; u_t^{\text{script}},\; u_t^{\text{plugin}},\; u_t^{\text{remote}}\right)
$$

其中 \(x_t\) 是场景状态，控制输入来自嵌入脚本、插件和远程 API。CoppeliaSim 的关键不是指定唯一的 \(F\)，而是允许用户在不同物理引擎和不同控制来源之间组合。

**训练/推理流程：机器人学习中的典型用法**

在机器人学习中，研究者通常把场景建成 `.ttt` 或模型文件，启动 CoppeliaSim 后由 Python 远程 API 或 PyRep 连接仿真。RL loop 在外部执行：读取相机、深度、关节状态和物体位姿，输出夹爪、机械臂或移动底盘动作；CoppeliaSim 则负责碰撞、传感器渲染和动力学推进。与 Gazebo/ROS 更偏机器人中间件集成不同，CoppeliaSim 的优势在于 GUI 场景编辑、脚本化模型封装和多控制入口。

**与传统仿真框架的区别**

CoppeliaSim/V-REP 的创新点在于“分布式控制架构”。在传统仿真器中，模型多半是被动资产，控制器在外部统一调用；在 V-REP 中，模型可以携带自己的脚本和行为，仿真世界更像由多个可编程实体构成的系统。这样做的代价是调试时需要理解不同脚本和插件的调用顺序，但收益是模型复用和系统集成更自然。

> 💡 关键：CoppeliaSim 的价值不只在物理引擎，而在把场景编辑、脚本生命周期、多后端动力学和远程控制接口组织成一个可组合的机器人实验平台。

#### 🧪 练习题
```yaml
question: "CoppeliaSim/V-REP 论文中最有辨识度的系统设计是什么？"
options:
  - "只允许所有机器人共用一个集中式控制脚本"
  - "通过 child script、插件和远程 API 形成分布式控制架构"
  - "完全不支持物理引擎"
  - "只能运行二维导航场景"
answer: 1
explain: "V-REP 的核心是将控制逻辑分散到对象脚本、插件和外部 API 中，从而支持复杂机器人系统的组合与复用。"
```

### PyBullet

```yaml
id: pybullet
num: 4
name: PyBullet
full_name: PyBullet物理引擎 (PyBullet Physics Engine)
year: '2016'
org: Bullet
parent: —
paper_url: https://pybullet.org/
project_url: ''
category: foundation
motivation: 开源轻量级物理引擎，广泛用于Sim2Real
```

#### 📝 一句话总结
PyBullet 把 Bullet 物理引擎封装成易用的 Python 机器人仿真接口，使研究者能快速加载 URDF/SDF/MJCF 模型、执行刚体接触仿真并构建强化学习与 Sim2Real 实验。

#### 🎯 核心要点
- **Python-first 接口**：用 `connect/loadURDF/setJointMotorControl/stepSimulation` 等函数直接搭建机器人环境
- **Bullet 刚体与约束求解**：继承 Bullet 的碰撞检测、顺序冲量约束求解、关节、接触和摩擦模型
- **多模型格式支持**：可加载 URDF、SDF、MJCF 与 mesh，方便复用 ROS、Gazebo、MuJoCo 生态资产
- **轻量 RL 环境构建**：不强依赖大型 GUI 或中间件，适合在 Python 中批量生成控制任务和调试策略
- **Sim2Real 常用组件**：支持动力学参数随机化、相机/深度/碰撞查询、逆运动学和状态读取
- **依据限制**：`paper_url` 是项目主页，PyBullet 本身没有对应的标准论文；本文依据 PyBullet 官网、PyPI/Quickstart 公开说明和 Bullet 引擎公开资料总结

#### 🔬 深入细节
![PyBullet 官方示例图](https://pybullet.org/wordpress/wp-content/uploads/2021/04/download-1.png)
*图：PyBullet 官网公开示例图。PyBullet 的重点是通过 Python API 快速搭建可交互物理仿真，而不是提供独立论文中的单一算法框图。*

```python
# PyBullet 机器人控制环境伪代码
import pybullet as p

client = p.connect(p.DIRECT)          # 或 p.GUI
p.setGravity(0, 0, -9.81)
plane = p.loadURDF("plane.urdf")
robot = p.loadURDF("robot.urdf", useFixedBase=False)

for episode in range(num_episodes):
    reset_robot_and_objects(robot)
    obs = read_observation(robot)

    while not done:
        action = policy(obs)
        for j, target in enumerate(action):
            p.setJointMotorControl2(robot, j, p.POSITION_CONTROL, targetPosition=target)

        p.stepSimulation()
        obs = read_observation(robot)
        reward, done = task_reward(obs)
```

**动机与背景：把物理引擎变成 Python 研究工具**

Bullet 最初面向实时物理、游戏和机器人仿真，核心是 C++ 引擎。机器人学习社区需要的是更短的实验路径：在 Python 中加载机器人、随机化环境、执行控制、读取状态并接入 PyTorch/TensorFlow 策略。PyBullet 的贡献就在这个工程接口层：把物理仿真变成一个可脚本化、可批量运行、可直接嵌入 RL loop 的 Python 模块。

**核心机制：碰撞、约束与关节控制**

PyBullet 的底层动力学仍可抽象成受约束多体系统：

$$
M(q)\dot{v} = \tau + J_c(q)^T\lambda_c + J_j(q)^T\lambda_j + f_{\text{ext}}
$$

其中 \(J_c^T\lambda_c\) 表示接触约束，\(J_j^T\lambda_j\) 表示关节或闭链约束，\(\tau\) 来自电机控制模式。Bullet 通常使用迭代式约束求解器，把接触和关节约束转换为一系列速度/冲量修正。直觉上，每个时间步不是一次性求精确解析解，而是反复修正速度，让穿透、摩擦和关节误差逐步满足约束。

**训练/推理流程：为什么适合 RL**

PyBullet 环境的控制循环非常接近 Gym 风格：`reset()` 加载或重置世界，`step(action)` 设置电机命令并调用若干次 `p.stepSimulation()`，最后返回观测、奖励和终止标志。观测可以来自关节状态、物体位姿、碰撞点、相机图像或深度图；动作可以是位置、速度、力矩或笛卡尔末端目标。由于所有接口都在 Python 中，研究者可以很容易插入 domain randomization，例如随机质量、摩擦、关节阻尼、相机位姿和物体初始位置。

**与 MuJoCo/Gazebo 的区别**

与 MuJoCo 相比，PyBullet 通常不以高精度模型预测控制为核心卖点，而是强调开源、轻量、模型格式兼容和 Python 易用性。与 Gazebo 相比，PyBullet 不提供完整 ROS 世界管理范式和大型 GUI 工作流，但构建实验脚本更直接。对 Sim2Real 来说，这种轻量性很重要：大量训练任务可以直接由 Python 代码生成和随机化，策略网络也能在同一进程中快速迭代。

> ⚠️ 注意：PyBullet 的便利性不等同于无成本真实迁移。接触、摩擦和执行器模型仍需要校准，Sim2Real 往往依赖随机化、系统辨识和真实数据微调。

#### 🧪 练习题
```yaml
question: "PyBullet 在机器人学习中流行的主要原因是什么？"
options:
  - "它只能通过大型 GUI 手动控制"
  - "它把 Bullet 物理引擎封装成易脚本化的 Python API，方便构建 RL/Sim2Real 环境"
  - "它完全不支持碰撞检测"
  - "它要求所有模型必须使用专有格式"
answer: 1
explain: "PyBullet 的核心优势是 Python-first、开源轻量、支持 URDF/SDF/MJCF，并能直接嵌入强化学习训练循环。"
```

### DM Control

```yaml
id: dm_control
num: 5
name: DM Control
full_name: DeepMind控制套件 (DeepMind Control Suite)
year: '2018'
org: DeepMind
parent: mujoco
paper_url: https://arxiv.org/abs/1801.00690
project_url: ''
category: foundation
motivation: 标准化连续控制基准，统一奖励结构
```

#### 📝 一句话总结
DM Control 提出了基于 MuJoCo 的标准化连续控制任务套件，用统一 API、任务结构和奖励约定解决连续控制论文之间环境不一致、奖励不可比和复现实验成本高的问题。

#### 🎯 核心要点
- **标准化任务集合**：覆盖 acrobot、ball-in-cup、cart-pole、cheetah、finger、fish、hopper、humanoid、manipulator、pendulum、point-mass、reacher、swimmer、walker 等领域
- **统一 MDP 接口**：每个环境提供 `action_spec()`、`observation_spec()`、`reset()`、`step()` 和 `TimeStep`
- **奖励范围统一**：除 LQR 外，任务奖励通常规范化到 \([0,1]\)，便于跨任务比较学习曲线
- **Physics/Task/Environment 分层**：MuJoCo 负责底层物理，Task 负责初始状态、观测和奖励，Environment 负责交互协议
- **像素与状态观测兼容**：既可使用低维状态特征，也可通过 wrapper 使用像素观测
- **基准验证流程**：论文用多种 RL agent 检查任务可解性和物理稳定性，并区分 benchmarking 与 extra 任务

#### 🔬 深入细节
![DM Control 任务示例](https://ar5iv.labs.arxiv.org/html/1801.00690/assets/figures/humanoid.png)
*图：DeepMind Control Suite 论文 Figure 1 的 Humanoid 任务面板。ar5iv 将 Figure 1 多个任务域拆成独立图片资源，整张图展示了套件中的连续控制基准集合。*

```python
# DM Control 标准环境循环伪代码
from dm_control import suite

env = suite.load(domain_name="cartpole", task_name="swingup")
action_spec = env.action_spec()
time_step = env.reset()

while not time_step.last():
    obs = time_step.observation
    action = policy(obs, action_spec)
    time_step = env.step(action)

    reward = time_step.reward          # 通常在 [0, 1]
    discount = time_step.discount      # 区分有限终止与截断
```

**动机与背景：连续控制需要可复现实验协议**

DM Control 论文指出，连续控制研究长期依赖 MuJoCo，但不同论文往往使用不同模型文件、奖励 shaping、episode 截断方式和观测定义，导致“同名任务”并不完全可比。DM Control 的目标不是发明一个新的物理引擎，而是在 MuJoCo 之上提供可复现的任务定义和软件接口，让算法比较从“环境实现差异”回到“算法差异”。

**核心机制：MDP 抽象与分层实现**

论文把连续控制任务写成 MDP：

$$
\mathcal{M} = (\mathcal{S}, \mathcal{A}, f, o, r)
$$

其中 \(\mathcal{S}\) 是连续状态空间，\(\mathcal{A}\) 是连续动作空间，\(f(s,a)\) 由 MuJoCo 动力学给出，\(o(s,a)\) 是观测函数，\(r(s,a)\) 是标量奖励。DM Control 的 `Physics` 类包装 MuJoCo 模型和状态查询，`Task` 类定义 episode 初始化、观测和奖励，`Environment` 则统一 `reset/step` 协议。这样的分层让同一个物理模型可以派生多个任务，例如 cartpole 可以有 balance、swingup 等不同目标。

**奖励设计：统一范围与可解释 shaping**

DM Control 的奖励通常由若干个 tolerance 项组合而成，每个项返回 \([0,1]\) 内的达成度。例如“站立”可以奖励 torso 高度，“前进”可以奖励速度，“控制成本”可以惩罚过大动作。可抽象为：

$$
r(s,a) = \prod_i \mathrm{tolerance}_i(g_i(s,a);\; \text{bounds}_i,\; \text{margin}_i)
$$

这种设计的直觉是：奖励不只是稀疏成功标志，而是连续地告诉 agent 哪些物理目标已经接近满足；同时把总奖励限制在统一范围，避免某个任务仅因奖励尺度大而显得学习更快。

**训练/推理流程：TimeStep 约定**

`reset()` 和 `step()` 都返回 `TimeStep`，字段包括 `step_type`、`reward`、`discount` 和 `observation`。`discount` 不只是强化学习公式里的 \(\gamma\)，也用来表达任务终止语义：\(\gamma=0\) 表示真正 terminal，\(\gamma=1\) 可以表示无限时域任务被时间上限截断。这个细节让算法能区分“失败终止”和“评估窗口结束”。

**与传统 MuJoCo Gym 任务的区别**

MuJoCo 是引擎，DM Control 是任务套件和 API 规范。它把模型、奖励、观测、episode 语义和像素 wrapper 统一起来，使不同算法在同一基准上训练和评估。相比直接复制某个 Gym 环境，DM Control 更强调任务定义的透明性和组合性，也因此成为后续世界模型、像素控制和连续控制算法的常用基准。

> 💡 关键：DM Control 的创新在“标准化控制实验”而不在“新动力学求解器”。它把 MuJoCo 的物理能力包装成可复现、可扩展、可比较的连续控制基准。

#### 🧪 练习题
```yaml
question: "DM Control 相比直接使用 MuJoCo 引擎的主要贡献是什么？"
options:
  - "替代 MuJoCo 的底层动力学求解器"
  - "提供统一任务、奖励、观测和 TimeStep API，使连续控制实验可复现可比较"
  - "只支持离散动作 Atari 游戏"
  - "取消物理仿真，只保留监督学习数据集"
answer: 1
explain: "DM Control 构建在 MuJoCo 之上，核心贡献是标准化任务套件和交互协议，而不是新的物理引擎。"
```

### Brax

```yaml
id: brax
num: 6
name: Brax
full_name: Brax可微分引擎 (Brax Differentiable Engine)
year: '2021'
org: Google
parent: mujoco
paper_url: https://arxiv.org/abs/2106.13281
project_url: ''
category: foundation
motivation: JAX原生可微分引擎，支持梯度优化策略
```

#### 📝 一句话总结
Brax 提出了用 JAX 编写的可微分、大规模并行刚体仿真与强化学习套件，使环境步进、策略网络和优化算法能在同一 GPU/TPU 上 JIT 编译并并行运行，解决传统 CPU 物理仿真成为 RL 训练瓶颈的问题。

#### 🎯 核心要点
- **JAX 原生物理引擎**：仿真状态更新是纯函数，可被 `jit`、`vmap`、`pmap` 编译并在加速器上运行
- **大规模并行 rollout**：同一设备上同时推进成千上万个环境，减少 Python 调度和 CPU-GPU 数据传输
- **可微分模拟**：物理步进对状态、动作和参数可求导，支持 analytic policy gradient 和直接轨迹优化
- **MuJoCo-like 任务复刻**：提供 ant、humanoid、halfcheetah、walker 等连续控制任务，便于迁移既有 RL 基准
- **算法与环境同编译**：PPO、SAC、ES、ARS 等算法可与环境处理一起在 JAX 中编译运行
- **多物理 pipeline 演化**：后续仓库提供 MJX、generalized、positional、spring 等 pipeline；本文聚焦 2021 原始论文贡献

#### 🔬 深入细节
![Brax Humanoid 示例](https://raw.githubusercontent.com/google/brax/main/docs/img/humanoid_v2.gif)
*图：Brax 官方仓库中的 Humanoid 示例。ar5iv 未稳定导出论文图像，因此使用官方 README 公开动图说明 Brax 面向大规模连续控制任务的仿真形态。*

```python
# Brax + JAX 大规模并行训练伪代码
import jax
import jax.numpy as jnp

sys = load_brax_system("humanoid")
params = init_policy()

@jax.jit
def rollout_and_update(params, rng):
    state = reset_batch(sys, rng, batch_size=8192)

    def env_step(carry, _):
        state, rng = carry
        action = policy_apply(params, state.obs, rng)
        next_state = brax_step(sys, state, action)   # JAX 纯函数
        return (next_state, rng), (state.obs, action, next_state.reward)

    (_, _), trajectory = jax.lax.scan(env_step, (state, rng), None, length=horizon)
    loss = ppo_or_apg_loss(params, trajectory)
    grads = jax.grad(lambda p: ppo_or_apg_loss(p, trajectory))(params)
    return apply_optimizer(params, grads), loss
```

**动机与背景：环境不应成为 RL 的慢环节**

连续控制 RL 的样本需求很大，传统流程通常是 CPU 仿真器生成状态，GPU 训练神经网络，两者之间频繁传输数据。即使单个物理步足够快，成千上万次 rollout 的 Python 调度、进程通信和 CPU-GPU copy 也会成为瓶颈。Brax 的核心动机是把“仿真 + 策略 + 优化”全部写成 JAX 计算图，让加速器既负责神经网络，也负责环境批量推进。

**核心机制：纯函数物理步进与并行化**

Brax 的环境状态可以抽象为 \(s_t=(q_t, v_t, \text{obs}_t)\)，动作 \(a_t\) 由策略给出，物理引擎实现一个可组合的状态转移：

$$
s_{t+1} = f_{\phi}(s_t, a_t)
$$

这里 \(\phi\) 表示系统参数，如质量、惯量、关节、接触和执行器配置。因为 \(f_\phi\) 是 JAX 函数，批量环境可以直接写成：

$$
\{s_{t+1}^{(i)}\}_{i=1}^{N} =
\mathrm{vmap}(f_{\phi})\left(\{s_t^{(i)}\}_{i=1}^{N}, \{a_t^{(i)}\}_{i=1}^{N}\right)
$$

直觉上，Brax 不是开 8192 个 Python 环境进程，而是把 8192 个环境变成一个大张量计算，让 XLA 在 GPU/TPU 上一次性调度。

**可微分性的意义**

传统 RL 常把环境视为黑盒，只能用策略梯度估计 \(\nabla_\theta \mathbb{E}[R]\)。如果环境转移可微，回报梯度可以沿着时间展开反传：

$$
\nabla_{\theta} R
= \sum_t
\frac{\partial r_t}{\partial s_t}
\frac{\partial s_t}{\partial a_t}
\frac{\partial a_t}{\partial \theta}
$$

这使 analytic policy gradient、轨迹优化和系统参数优化成为可能。当然，接触和摩擦处的真实动力学并不总是光滑；Brax 的设计是在物理近似、可微性和大规模并行速度之间取舍。

**训练流程：RL 算法和环境在同一设备闭环**

在 Brax 中，PPO/SAC/ES 不再只是调用一个外部环境 API，而是和环境 rollout 一起被 JIT 编译。训练过程通常是：批量 reset 环境，使用当前策略并行 rollout，计算 advantage 或回报，执行优化器更新，再继续下一轮。由于 rollout 和学习都在同一设备上，吞吐量可以达到传统 CPU 仿真难以接近的规模，论文强调常见 MuJoCo-like 任务可以在分钟级训练出有效策略。

**与 MuJoCo/DM Control 的区别**

MuJoCo 重视高质量接触动力学和控制建模，DM Control 重视标准任务定义；Brax 的重点则是“加速器原生”和“可微并行”。它更适合需要海量 rollout、可微物理或端到端 JAX 训练的研究。代价是物理近似和接触行为与 MuJoCo 并不完全等价，后续 MJX 的出现也说明社区在继续寻找“MuJoCo 物理精度 + JAX 并行能力”的结合点。

> 💡 关键：Brax 把环境从 CPU 黑盒变成 JAX 计算图，真正改变的是 RL 系统的计算拓扑，而不仅是替换一个物理引擎。

#### 🧪 练习题
```yaml
question: "Brax 相比传统 CPU 物理仿真器最核心的系统优势是什么？"
options:
  - "只能运行单个环境以提高精度"
  - "将环境步进、策略和优化写成 JAX 计算图，在加速器上大规模并行运行"
  - "完全不使用神经网络策略"
  - "只支持离散网格世界"
answer: 1
explain: "Brax 的关键是 JAX 原生、可 JIT/vmap/pmap，并能把成千上万个环境 rollout 与学习算法放在同一 GPU/TPU 上。"
```

### AI2-THOR

```yaml
id: ai2thor
num: 7
name: AI2-THOR
full_name: AI2交互式3D环境 (AI2-THOR Interactive 3D Environment)
year: '2017'
org: Allen AI
parent: —
paper_url: https://arxiv.org/abs/1712.05474
project_url: ''
category: interactive
motivation: 具身智能从静态数据转向交互式环境
```

#### 📝 一句话总结
AI2-THOR 提出了可通过 Python 控制的近真实室内 3D 交互环境，使视觉智能体能够在 Unity 场景中导航、改变物体状态并接收多模态观测，推动具身视觉从静态图像识别转向交互式学习。

#### 🎯 核心要点
- **交互式室内场景**：提供厨房、卧室、客厅、浴室等室内环境，包含可打开、切片、加热、拾取、放置等可交互物体
- **Python-Unity 闭环**：前端 Python API 发送动作，后端 Unity 执行动作与渲染，再返回 `Event`、图像和元数据
- **动作类别完整**：支持导航动作、抽象物体交互、机械臂交互、环境查询和环境状态随机化
- **多模态观测**：可返回 RGB、深度、语义分割、实例分割、法向、可达位置、物体 bounding box 等信息
- **多 embodied agent 扩展**：从抽象导航 agent 扩展到 LoCoBot、ManipulaTHOR、Stretch、Drone 等形态
- **下游任务广泛**：支撑 ObjectNav、交互问答、指令跟随、ALFRED、TEACh、物体关系学习和多智能体协作等研究

#### 🔬 深入细节
![AI2-THOR agent-simulator loop](https://ar5iv.labs.arxiv.org/html/1712.05474/assets/x1.png)
*图：AI2-THOR 的 agent-simulator loop。Python API 通过本地服务控制 Unity 后端，Unity 返回图像观测和环境元数据。*

```python
# AI2-THOR 交互循环伪代码
from ai2thor.controller import Controller

controller = Controller(scene="FloorPlan1")
event = controller.step(action="Initialize")

while not done:
    obs = {
        "rgb": event.frame,
        "depth": event.depth_frame,
        "objects": event.metadata["objects"],
        "agent": event.metadata["agent"],
    }
    action = policy(obs)

    # 例如 MoveAhead、RotateRight、OpenObject、PickupObject、SliceObject
    event = controller.step(action=action["name"], **action.get("params", {}))
    done = task_success(event.metadata)
```

**动机与背景：视觉理解需要主动交互**

传统视觉模型主要从静态图片或离线视频中学习，目标通常是分类、检测或分割。但具身智能体需要知道“我能对这个物体做什么”“动作会如何改变场景”“从另一个视角能看到什么”。AI2-THOR 的论文动机正是把视觉 AI 放进可交互的室内世界，让 agent 通过动作改变环境并从结果中学习。

**核心机制：Python 前端与 Unity 后端**

AI2-THOR 的系统结构可以写成一个闭环：

$$
e_{t+1} = \mathrm{UnityStep}(e_t, a_t), \quad
o_{t+1} = \mathrm{RenderAndMetadata}(e_{t+1})
$$

其中 \(e_t\) 是 Unity 中完整环境状态，\(a_t\) 是 Python API 发来的动作，\(o_t\) 是返回给学习算法的观测。论文特别强调返回的 `Event` 不只是 RGB 图像，还包含环境元数据，例如物体是否可见、是否可交互、当前位置、开合状态、可达位置和分割标注。这使 AI2-THOR 同时适合纯视觉任务和闭环决策任务。

**动作设计：从导航到因果交互**

AI2-THOR 的动作不只是 `MoveAhead`、`RotateRight` 这类导航命令，还包括 `OpenObject`、`PickupObject`、`PutObject`、`ToggleObjectOn`、`SliceObject`、`FillObjectWithLiquid` 等状态改变。抽象动作通常要求物体在视野中且距离足够近；机械臂 agent 则可以执行更连续的抓取和开门过程。这样的分层让研究者可以选择关注高层规划、视觉 grounding 或低层操作。

**训练/推理流程：从交互数据到任务学习**

一个 ObjectNav agent 可以在每一步根据 RGB-D 与目标类别选择移动或转向；一个 ALFRED 式指令跟随 agent 则需要把语言指令分解为导航和物体操作序列。环境每一步返回的元数据可以用于奖励计算、专家轨迹生成或评估，但训练时也可以只暴露视觉观测。这个灵活性让 AI2-THOR 成为具身视觉和语言任务的重要基础设施。

**与传统视觉数据集的区别**

静态数据集固定了观察点，模型无法主动寻找信息；AI2-THOR 允许 agent 改变视角、打开容器、拿起物体和触发因果状态变化。相比 Gazebo/MuJoCo 这类物理控制仿真，AI2-THOR 的重点是语义丰富、视觉真实和室内交互，而不是高精度关节动力学。它因此更适合视觉导航、物体状态理解和语言指令执行。

> 💡 关键：AI2-THOR 的贡献是把视觉 AI 的训练单位从“标注图片”变成“可行动、可观察、可改变的室内世界状态”。

#### 🧪 练习题
```yaml
question: "AI2-THOR 的 Python-Unity 架构中，Unity 后端每步主要返回什么？"
options:
  - "只返回一个离散奖励数字"
  - "返回渲染图像、传感器模态和包含物体/agent 状态的 Event 元数据"
  - "只返回源代码文本"
  - "不返回任何环境状态"
answer: 1
explain: "AI2-THOR 的 Event 同时包含 RGB/深度/分割等视觉观测和物体、agent、可交互状态等元数据，是交互式任务的核心接口。"
```

### VirtualHome

```yaml
id: virtualhome
num: 8
name: VirtualHome
full_name: 虚拟家庭活动仿真 (VirtualHome)
year: '2018'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/1806.07011
project_url: ''
category: interactive
motivation: 将家庭活动表示为可执行程序，训练逻辑理解
```

#### 📝 一句话总结
VirtualHome 提出了把家庭活动表示为可执行程序的仿真框架，通过众包自然语言任务、程序化步骤和 Unity 家庭环境执行，解决复杂日常活动缺少明确可执行语义表示的问题。

#### 🎯 核心要点
- **活动即程序**：把 “make coffee”“watch TV” 等家庭任务转写为动作和对象参数组成的程序序列
- **众包知识库**：先收集自然语言活动描述，再用类似 Scratch 的图形界面让标注者补全可执行步骤
- **Unity3D 执行环境**：实现常见原子动作和交互，如 walk、grab、put、open、switch on/off、sit、stand up
- **程序到视频数据集**：用程序驱动虚拟人执行任务，并生成 RGB、深度、光流、姿态、分割和动作时间戳等监督信号
- **从语言/视频生成程序**：论文训练模型从自然语言描述或视频片段预测程序步骤
- **可执行性评估**：除 LCS 类似的程序匹配指标外，还关注生成程序是否能在模拟器中真正执行

#### 🔬 深入细节
![VirtualHome 总体流程](https://ar5iv.labs.arxiv.org/html/1806.07011/assets/x1.png)
*图：VirtualHome Figure 1。系统先众包家庭任务与程序，再在 VirtualHome/VirtualHouse 中执行程序，并训练从文本或视频生成程序的模型。*

```python
# VirtualHome 程序执行伪代码
description = "Get an empty glass. Take milk from refrigerator and pour it."
program = program_generator(description)

# 程序由动作和对象参数组成
# [WALK] <fridge> (1)
# [OPEN] <fridge> (1)
# [GRAB] <milk> (2)
# [POUR] <milk> (2) <glass> (3)

env = VirtualHome(scene="kitchen")
for step in program:
    action, objects = parse_step(step)
    if env.preconditions_satisfied(action, objects):
        env.execute(action, objects)
        record_video_frame_and_ground_truth()
    else:
        mark_program_not_executable()
        break
```

**动机与背景：自然语言活动描述不等于机器人可执行计划**

人类说“去看电视”时，可能省略拿遥控器、走到沙发、坐下、打开电视等常识步骤。机器人或虚拟智能体却需要完整、明确、可执行的动作序列。VirtualHome 的核心问题是：如何把日常家庭活动从模糊自然语言变成结构化程序，并在三维环境中执行和验证？

**核心机制：程序表示**

论文把每个时间步写成动作和对象参数的组合：

$$
\mathrm{step}_t =
[\mathrm{action}_t]\;
\langle \mathrm{object}_{t,1}\rangle(id_{t,1})\;...\;
\langle \mathrm{object}_{t,n}\rangle(id_{t,n})
$$

例如 `[GRAB] <remote_control> (1)` 或 `[PUTBACK] <milk> (2) <fridge> (1)`。这种表示比自然语言更严格：动作来自有限动作集合，对象绑定到场景中的实例 ID，执行前还要满足前置条件，例如物体可达、容器已打开、手上有可放置物等。

**数据收集：先语言，后程序**

VirtualHome 先让众包工作者写家庭活动描述，再让另一批标注者用图形化编程界面把描述翻译成程序。论文强调标注者需要补全“没有明说但执行所需”的步骤。这一点非常重要：数据集不只是把句子切分成动作，而是在收集家庭活动的可执行常识。

**训练/推理流程：文本/视频到程序**

从文本生成程序时，模型用 RNN 编码语言描述，再逐步预测程序 token。论文中的 reward/评分结合了最长公共子序列相似度和程序本身的合理性，可概括为：

$$
r(w^s, g) = r_{\mathrm{LCS}}(w^s, g) + 0.1 \cdot r_{\mathrm{sim}}(w^s)
$$

其中 \(w^s\) 是生成程序，\(g\) 是目标程序，\(r_{\mathrm{LCS}}\) 衡量步骤顺序相似，\(r_{\mathrm{sim}}\) 鼓励程序在模拟器中可执行。从视频生成程序时，论文把视频切成短片段，预测每段对应的动作-对象-对象指令，再由序列模型组合成完整程序。

**与传统活动识别的区别**

传统视频活动识别通常输出一个标签，如 “making coffee”。VirtualHome 则要求输出可执行过程：先走到哪里，打开什么，拿起什么，放到哪里。这使它更接近机器人任务规划和具身语言理解。它的局限也来自这里：可执行性依赖模拟器中已实现的动作和对象，真实家庭中丰富的动作细节会被抽象化。

> 💡 关键：VirtualHome 的核心不是“生成更逼真的家庭视频”，而是把家庭活动变成可执行、可验证、可学习的程序语义。

#### 🧪 练习题
```yaml
question: "VirtualHome 中“活动即程序”的主要优势是什么？"
options:
  - "把复杂家庭任务表示为明确的动作-对象序列，可在模拟器中执行和验证"
  - "只保留活动类别标签，删除步骤信息"
  - "避免使用任何三维环境"
  - "让模型只能从静态图片学习"
answer: 0
explain: "VirtualHome 的程序表示包含动作、对象和顺序，能驱动虚拟 agent 执行任务，并为语言/视频到计划提供监督。"
```

### Habitat 1.0

```yaml
id: habitat
num: 9
name: Habitat 1.0
full_name: Habitat具身AI平台 (Habitat Platform)
year: '2019'
org: Meta AI
parent: —
paper_url: https://arxiv.org/abs/1904.01201
project_url: ''
category: interactive
motivation: 实现万帧级超高速渲染，加速大规模RL
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

### SAPIEN

```yaml
id: sapien
num: 10
name: SAPIEN
full_name: SAPIEN关节物体交互环境 (SAPIEN)
year: '2020'
org: UCSD
parent: —
paper_url: https://sapien.ucsd.edu/
project_url: ''
category: interactive
motivation: 专注关节物体交互，提供精细部件数据集
```

#### 📝 一句话总结
SAPIEN 提出了面向关节物体理解与机器人交互的物理真实仿真环境，把 PhysX 引擎、PartNet-Mobility 关节资产和可渲染任务结合起来，解决室内机器人缺少大规模可操作 articulated objects 的问题。

#### 🎯 核心要点
- **三组件架构**：SAPIEN Engine、SAPIEN Asset/PartNet-Mobility、SAPIEN Renderer 共同支撑感知与交互任务
- **关节物体数据集**：PartNet-Mobility 包含约 2,346 个 3D 关节物体模型、14K 可动部件、46 个室内物体类别
- **物理真实交互**：集成 NVIDIA PhysX，支持刚体、关节约束、接触、机器人控制和 articulated object 操作
- **细粒度部件标注**：为可动部件提供语义、运动类型、运动轴、关节范围和交互属性
- **视觉任务基准**：评估可动部件分割、运动属性识别、关节轴/支点预测等 part-level perception
- **依据限制**：清单中的 `paper_url` 是项目主页而非论文页；本文依据官方主页与 CVPR 2020/arXiv 2003.08515 “SAPIEN: A SimulAted Part-based Interactive ENvironment” 解读

#### 🔬 深入细节
![SAPIEN 系统示意图](https://sapien.ucsd.edu/assets/SAPIEN_Diagram.png)
*图：SAPIEN 官方系统图。平台围绕 articulated assets、物理引擎和渲染器构建，可同时支持机器人操作和部件级视觉任务。*

```python
# SAPIEN 关节物体交互伪代码
engine = sapien.Engine()
renderer = sapien.Renderer()
scene = engine.create_scene()
scene.set_timestep(1 / 240)

robot = scene.load_urdf("panda.urdf")
cabinet = scene.load_partnet_mobility("cabinet_0001")
camera = scene.add_camera(width=640, height=480)

for t in range(horizon):
    rgbd = camera.get_observation()
    part_mask, joint_axis = perception_model(rgbd)
    action = manipulation_policy(robot.state, cabinet.state, part_mask, joint_axis)

    robot.set_drive_targets(action.joint_targets)
    scene.step()                # PhysX 刚体、接触和关节约束
    scene.update_render()
```

**动机与背景：机器人要操作的不是静态物体**

很多室内仿真环境提供房间、家具和可导航空间，但物体常是静态 mesh，最多支持拾取和放置。真实家庭任务却大量依赖 articulated objects：打开冰箱门、拉抽屉、旋转水龙头、翻开笔记本、按下开关。SAPIEN 的动机是把“部件级结构 + 运动学约束 + 物理交互”作为仿真环境的核心，使机器人不仅能识别物体，还能理解物体的可动部分并与其交互。

**核心机制：PartNet-Mobility 资产**

SAPIEN 资产从 PartNet 的部件层级出发，为可动部件添加运动标注。一个 articulated object 可抽象为部件图：

$$
\mathcal{O} = \{(p_i,\; T_i,\; \mathbf{d}_i,\; \mathbf{o}_i,\; [l_i,u_i])\}_{i=1}^{K}
$$

其中 \(p_i\) 是部件，\(T_i\) 是关节类型（如 revolute 或 prismatic），\(\mathbf{d}_i\) 是运动轴方向，\(\mathbf{o}_i\) 是轴/支点位置，\([l_i,u_i]\) 是运动范围。这样的表示可以直接转成 URDF-like articulated body，由物理引擎处理接触和关节限制。

**SAPIEN Engine 与 Renderer**

SAPIEN Engine 封装 PhysX，用于刚体动力学、碰撞、摩擦、关节约束和机器人控制。Renderer 则提供可配置视觉输出，包括快速 rasterization 和更高真实感的渲染路径。对于机器人学习，这意味着同一环境既能产生物理交互轨迹，也能生成用于视觉模型训练的 RGB-D、分割和姿态监督。

**视觉与交互任务**

论文中的视觉任务包括可动部件分割和运动属性识别。运动属性识别模型需要从 RGB-D 和部件 mask 预测关节类型、轴方向和支点位置。方向误差可用余弦距离表示：

$$
L_d = 1 - \left|
\frac{\mathbf{d}\cdot\hat{\mathbf{d}}}{\|\mathbf{d}\|\|\hat{\mathbf{d}}\|}
\right|
$$

这类监督直接服务于操作：如果 agent 知道抽屉是 prismatic joint 且轴方向向外，就能规划拉动动作；如果知道门是 revolute joint，就应围绕铰链施力。

**与 AI2-THOR/Habitat 的区别**

AI2-THOR 提供丰富语义交互，Habitat 1.0 强调高速视觉导航；SAPIEN 的独特性在 articulated object。它更接近“机器人操作需要的对象物理实验室”：对象不是静态语义标签，而是带部件、关节、运动范围和物理约束的可操作系统。这让它适合研究部件级感知、可供性、操作策略和 sim-to-real 物体交互。

> 💡 关键：SAPIEN 把“打开、拉出、旋转、按压”等家庭机器人关键能力落到可标注、可渲染、可物理执行的关节物体模型上。

#### 🧪 练习题
```yaml
question: "SAPIEN 相比一般室内导航仿真器最突出的能力是什么？"
options:
  - "只提供静态房间渲染"
  - "提供带部件、关节类型、运动轴和物理约束的 articulated object 交互"
  - "完全不支持机器人控制"
  - "只用于文本分类任务"
answer: 1
explain: "SAPIEN 的核心是 PartNet-Mobility 关节资产和 PhysX 物理交互，使机器人能感知并操作抽屉、门、开关等可动部件。"
```

### iGibson

```yaml
id: igibson
num: 11
name: iGibson
full_name: iGibson物体中心仿真 (iGibson)
year: '2021'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/2108.03272
project_url: ''
category: interactive
motivation: 以物体为中心的仿真，支持大规模家务任务
```

#### 📝 一句话总结
iGibson 2.0 将 Gibson 系列从静态视觉导航扩展为以物体状态、交互谓词和人类示教为核心的家务活动仿真器，使机器人能够在真实尺度室内场景中学习清洁、加热、浸湿、开关等可组合任务。

#### 🎯 核心要点
- **问题定位**：早期室内仿真更偏导航和几何感知，缺少对家庭任务中“物体是否干净、是否湿、是否被加热、是否被切开”等状态的显式建模。
- **核心设计**：在物理仿真之上加入 object states、symbolic predicates、generative functions，把连续物理变量映射到任务可读的逻辑条件。
- **数据与任务**：基于语义丰富的室内场景和可交互物体，构造可复现的家务任务，并提供 VR 接口采集人类演示。
- **工程价值**：它不是单个策略算法，而是为 embodied AI 提供任务定义、状态检查、演示采集与物理交互统一闭环的基础设施。

#### 🔬 深入细节
##### 核心示意图
![iGibson object-centric simulation](https://ar5iv.labs.arxiv.org/html/2108.03272/assets/x1.png)

*图示展示 iGibson 2.0 如何把真实家居场景、可交互物体、扩展物体状态和 VR 人类示教连接起来，用于复杂日常活动仿真。*

##### 算法伪代码
```python
def build_igibson_task(scene, symbolic_goal):
    objects = populate_scene_with_interactive_assets(scene)
    states = initialize_physical_states(objects)

    for predicate in symbolic_goal.preconditions:
        # generative function maps symbolic predicates to valid physical states
        states = sample_state_conditioned_on_predicate(states, predicate)

    env = load_physics_scene(scene, objects, states)
    while not env.done():
        obs = env.render_multimodal_observation()
        action = policy(obs, symbolic_goal)
        env.step(action)
        logical_state = evaluate_object_predicates(env.object_states)
        reward = compute_task_reward(logical_state, symbolic_goal)
    return env.trajectory
```

##### 背景与动机
iGibson 的关键判断是：家庭机器人任务并不只是“从 A 点走到 B 点”，而是围绕物体及其可变状态展开。一个盘子的位置重要，但盘子是否干净同样重要；一个炉灶可见并不等价于它处于开启状态；毛巾、杯子、食材等对象还会涉及湿度、温度、切分、覆盖、装载等状态。因此，仿真器如果只提供几何、碰撞和图像渲染，就很难表达“把杯子洗干净”“把食物加热”这类任务。

论文的主要贡献是把物理状态和符号任务定义接起来。若用 \(x_o\) 表示物体 \(o\) 的连续物理状态，用 \(p_k\) 表示某个逻辑谓词，则任务检查可写为：

$$
p_k(o)=\mathbb{1}[f_k(x_o)>\tau_k]
$$

这里 \(f_k\) 可以是温度、湿度、清洁度或开关状态的检测函数，\(\tau_k\) 是任务阈值。这样，策略和任务语言可以使用符号条件，底层仿真仍然保留连续物理变量。

##### 机制拆解
iGibson 2.0 引入了 object states，例如 temperature、wetness、cleanliness、toggled、sliced 等。这些状态一方面参与物理和渲染，另一方面被映射成任务谓词，如 Cooked、Soaked、Clean、On、Sliced。论文还强调 generative functions：当任务要求“水槽里有一个脏杯子”时，系统不仅检查状态，还能采样出满足该谓词的初始物理配置。

这个设计让任务定义更像一个约束满足问题。给定目标谓词集合 \(G=\{g_1,\ldots,g_m\}\)，初始化和成功判定都可以围绕下面的条件展开：

$$
\text{success}(s_t)=\prod_{g_i\in G}\mathbb{1}[g_i(s_t)=\text{true}]
$$

因此，研究者可以把任务重点放在“机器人如何改变世界状态”，而不是为每个任务手写大量脆弱的场景检查代码。

##### 交互与示教
iGibson 还提供 VR 人类示教接口，用于记录人类在同一仿真世界中的操作轨迹。对 imitation learning 或 offline RL 来说，这很重要：示教轨迹不只是关节动作序列，还能与物体状态变化、相机观测、任务谓词同步记录。换言之，它把“人做了什么”和“世界变成了什么状态”对齐到了同一个仿真日志里。

与传统导航基准相比，iGibson 的难点从空间搜索扩展到对象操作、状态变化和长程任务组合。策略需要理解可见物体、可操作 affordance、动作后果以及目标谓词之间的关系；这也是后来 BEHAVIOR、OmniGibson 等系统继续扩展的方向。

### ThreeDWorld

```yaml
id: tdw
num: 12
name: ThreeDWorld
full_name: 三维世界多模态平台 (ThreeDWorld)
year: '2021'
org: MIT-IBM
parent: —
paper_url: https://arxiv.org/abs/2007.04954
project_url: ''
category: interactive
motivation: 多模态平台，支持视觉与物理音频同步模拟
```

#### 📝 一句话总结
ThreeDWorld 是一个基于 Unity 的多模态交互仿真平台，把高质量视觉渲染、物理、音频、机器人/虚拟体控制和程序化场景生成统一到可脚本化的实验环境中。

#### 🎯 核心要点
- **多模态目标**：TDW 不只追求视觉逼真，还把物理接触声、布料/液体/软体等动态效果纳入仿真。
- **系统结构**：Python Controller 向 Unity Build 发送命令，Build 负责渲染、物理和传感器输出，二者形成外部可控的闭环。
- **资产与场景**：平台提供室内外环境、物体库、程序化摆放和可定制 agent，适合构造受控感知实验。
- **研究用途**：可服务于视觉推理、物理预测、因果交互、多智能体、VR 和机器人学习等任务。

#### 🔬 深入细节
##### 核心示意图
![ThreeDWorld multimodal simulation](https://ar5iv.labs.arxiv.org/html/2007.04954/assets/figure/teaser.png)

*图示概括 TDW 的多模态能力：室内外渲染、机器人交互、多智能体场景、VR、布料物理和碰撞音频。*

##### 算法伪代码
```python
def run_tdw_experiment(controller, scene_spec, agent_policy):
    controller.launch_unity_build()
    controller.send_commands(create_scene(scene_spec))
    controller.send_commands(load_assets(scene_spec.objects))

    while not controller.terminated():
        obs = controller.receive_output_data(
            modalities=["rgb", "depth", "segmentation", "audio", "physics"]
        )
        commands = agent_policy(obs)
        controller.send_commands(commands)

    return controller.collect_logs()
```

##### 背景与动机
许多 embodied AI 仿真器在设计上偏向单一任务：导航基准强调相机和几何，机器人平台强调接触和关节控制，视觉合成平台强调图像质量。TDW 的出发点是把这些需求统一起来，尤其强调人类感知和认知研究常常需要跨模态同步刺激：看到一个物体掉落，同时听到它撞击桌面的声音，并观察其后续物理运动。

平台的核心抽象可以理解为：

$$
o_t = R_{\theta}(s_t), \quad s_{t+1}=P(s_t, a_t)
$$

其中 \(s_t\) 是 Unity 中的世界状态，\(P\) 是物理更新，\(R_{\theta}\) 则根据相机、麦克风和传感器配置输出 RGB、深度、分割、音频或物理元数据。TDW 的价值在于 \(R_{\theta}\) 不是一个单一图像渲染器，而是一组同步传感器。

##### 系统机制
TDW 使用外部 Python Controller 控制 Unity Build。Controller 发送 JSON 风格命令，例如创建场景、加载物体、设置材质、施加力、移动 agent 或调整传感器；Build 执行命令后返回图像、物理状态、音频和对象元数据。这个架构让实验脚本可以像普通 Python 程序一样批量生成数据，同时保留游戏引擎级别的交互能力。

物理层面，TDW 结合刚体物理、布料、软体、液体和碰撞音频。对 embodied AI 来说，这意味着任务不再局限于“识别静态图像中的物体”，而可以研究动作带来的可观察变化。例如同一个杯子被推倒、碰撞、滚动、发声，会在多个模态中留下同步证据。

##### 与机器人仿真的关系
TDW 本身不是专门的机械臂基准，但它提供 agent、场景和物体控制能力，适合研究从感知到交互的中间问题。相比 MuJoCo 风格平台，它的优势在于丰富视觉和音频；相比纯视觉合成数据集，它的优势在于场景可以被动作改变。TDW 因而更像一个实验室级“世界生成器”，用于构造可重复、可干预、可多模态观察的 embodied AI 实验。

如果把一个实验看作命令序列 \(C=\{c_1,\ldots,c_T\}\) 和观测序列 \(O=\{o_1,\ldots,o_T\}\)，TDW 的设计目标就是让研究者能够精确控制 \(C\)，并在每一步获得同步、结构化的 \(O\)。这对分析模型是否真正理解物理因果关系尤其有用。

### ProcTHOR

```yaml
id: procthor
num: 13
name: ProcTHOR
full_name: ProcTHOR程序化场景生成 (ProcTHOR)
year: '2022'
org: Allen AI
parent: ai2thor
paper_url: https://arxiv.org/abs/2206.06994
project_url: ''
category: interactive
motivation: 实现一万个室内房屋场景的程序化自动生成
```

#### 📝 一句话总结
ProcTHOR 在 AI2-THOR 之上用程序化规则自动生成大规模、可交互、可定制的室内房屋，使 embodied agent 能在上万套多样化家庭环境中训练并提升零样本泛化。

#### 🎯 核心要点
- **核心问题**：人工制作交互式室内场景成本高，场景数量不足会导致 agent 对少量房屋过拟合。
- **生成流程**：先采样房屋结构和房间布局，再根据语义类别、空间约束和物理可行性放置资产。
- **规模优势**：论文发布 ProcTHOR-10K，可在普通工作站上快速生成大量可交互房屋。
- **实证结论**：用程序化房屋训练的简单视觉导航 agent，在多个 embodied AI benchmark 上表现出更好的零样本迁移。

#### 🔬 深入细节
##### 核心示意图
![ProcTHOR procedurally generated houses](https://ar5iv.labs.arxiv.org/html/2206.06994/assets/figures/procthor-cover.jpg)

*图示展示 ProcTHOR 从程序规则生成多样、可交互、可定制室内房屋的整体目标。*

##### 算法伪代码
```python
def generate_procthor_house(seed):
    rng = Random(seed)
    room_spec = sample_room_spec(rng)
    floorplan = sample_floorplan(room_spec, rng)
    doors = connect_rooms_with_doors(floorplan, rng)

    house = create_empty_house(floorplan, doors)
    for room in house.rooms:
        asset_groups = sample_semantic_asset_groups(room.type, rng)
        for group in asset_groups:
            placement = sample_valid_placement(group, room, house)
            if satisfies_geometry_and_physics(placement):
                house.add(group.instantiate(placement))

    randomize_materials_lighting_and_small_objects(house, rng)
    return export_to_ai2thor(house)
```

##### 背景与动机
Embodied AI 的泛化瓶颈很大程度来自场景规模。真实机器人数据昂贵，手工 3D 场景也昂贵；如果训练只覆盖几十个环境，模型很容易记住纹理、房型和物体共现模式。ProcTHOR 的核心思想是把“制作房屋”转化为程序采样问题，用可控规则生成数量巨大但仍然符合家庭常识的交互场景。

这个过程可抽象为房屋分布建模：

$$
p(H)=p(L)\,p(R\mid L)\,p(A\mid R,L)\,p(M\mid A)
$$

其中 \(L\) 是整体布局，\(R\) 是房间类型和连接关系，\(A\) 是物体/家具资产，\(M\) 是材质、颜色和局部随机化。ProcTHOR 的贡献不在于学习这个分布，而在于把人工知识、资产库和几何约束编码为可扩展的采样器。

##### 生成机制
ProcTHOR 先采样房屋规格和房间平面图，再生成门、墙和房间连接。随后系统按房间类型放置语义资产组，例如卧室中的床和床头柜、厨房中的橱柜和电器、客厅中的沙发和桌子。每个资产组都要满足几何约束，避免穿墙、重叠或不可达等问题。

论文的一个重要细节是“资产组”而不是孤立物体。真实家庭中的物体往往成组出现，单独随机撒物体会造成不自然场景。ProcTHOR 用语义组合保留常识结构，再通过材质、位置和实例替换制造多样性。这使生成结果既可变，又不像完全随机布局那样不可用。

##### 训练与泛化
ProcTHOR-10K 的实验重点是零样本迁移：在程序生成房屋中训练，然后到 AI2-THOR、RoboTHOR、Habitat 等不同环境评估。论文显示，即便使用相对简单的 RGB-only CNN+RNN agent，大规模多样化训练场景也能显著提升泛化。

从算法角度看，ProcTHOR 改变的是数据分布而不是策略结构。若 agent 优化目标为：

$$
\max_{\pi}\ \mathbb{E}_{H\sim p_{\text{ProcTHOR}}}\left[\sum_{t=0}^{T}\gamma^t r_t\right]
$$

那么关键在于 \(p_{\text{ProcTHOR}}\) 覆盖足够多的房型、物体组合和视觉变化，使学到的策略更接近环境不变的导航与交互技能，而不是记忆训练房屋。

### OmniGibson

```yaml
id: omnigibson
num: 14
name: OmniGibson
full_name: OmniGibson全能仿真平台 (OmniGibson)
year: '2023'
org: Stanford
parent: igibson
paper_url: https://arxiv.org/abs/2311.01014
project_url: ''
category: interactive
motivation: 结合Omniverse光追渲染，支持千种家务活动
```

#### 📝 一句话总结
OmniGibson 是 iGibson 思路在 NVIDIA Omniverse/PhysX 上的高保真延伸，用 BEHAVIOR-1K 任务定义、丰富物体状态和可组合谓词支撑上千种日常家务活动仿真。

#### 🎯 核心要点
- **资料限制**：清单中的 `paper_url` 指向的 arXiv 条目并非 OmniGibson 论文；本精读依据公开的 BEHAVIOR-1K/OmniGibson 论文与项目资料整理。
- **平台定位**：相比 iGibson，OmniGibson 更强调 Omniverse 光线追踪渲染、PhysX 5 物理和大规模日常活动基准。
- **任务语言**：BEHAVIOR Domain Definition Language 用谓词描述初始条件和目标条件，使任务可自动检查和组合。
- **状态建模**：系统继续扩展温度、浸湿、清洁、开关、容纳、接触等 object states，并用 transition rules 近似复杂过程。

#### 🔬 深入细节
##### 核心示意图
![OmniGibson and BEHAVIOR-1K overview](https://ar5iv.labs.arxiv.org/html/2403.09227/assets/x1.png)

*图示来自 BEHAVIOR-1K 公开论文，展示人类中心日常活动基准以及 OmniGibson 仿真环境在其中的角色。*

##### 算法伪代码
```python
def run_omnigibson_behavior_task(activity_bddl):
    scene = sample_scene(activity_bddl.scene_requirements)
    objects = load_required_objects(activity_bddl.object_scope)
    state = sample_initial_state(scene, objects, activity_bddl.initial_conditions)

    env = omnigibson.load(scene, objects, state)
    while not env.done():
        obs = env.get_observations()
        action = policy(obs, activity_bddl.goal_conditions)
        env.step(action)
        apply_transition_rules(env.object_states)
        success = all(eval_predicate(g, env.state) for g in activity_bddl.goal_conditions)
    return success, env.log
```

##### 背景与动机
OmniGibson 延续 iGibson 的核心问题：家庭任务的难点在于物体状态和长程交互，而不只是导航。BEHAVIOR-1K 进一步把目标扩展到 1000 种来自人类调查的日常活动，覆盖清理、整理、烹饪、搬运、布置等任务类型。为了表达这些任务，仅有物体类别和位姿是不够的，还需要可检查的逻辑谓词。

一个 BEHAVIOR 风格任务通常由初始条件 \(I\) 和目标条件 \(G\) 定义。执行成功可以写成：

$$
\text{success}(s_t)=\mathbb{1}\left[\bigwedge_{g\in G}g(s_t)\right]
$$

其中 \(g(s_t)\) 可能表示“杯子在柜子里”“盘子是干净的”“灶台处于关闭状态”等。OmniGibson 的工作就是让这些谓词能够在仿真状态中被初始化、更新和检测。

##### 平台机制
OmniGibson 建立在 Omniverse 和 PhysX 之上，因此比早期家居仿真更重视渲染和物理一致性。它支持刚体、关节物体、部分可变形物体、流体相关近似，以及更高质量的材质和光照。对机器人学习而言，这让视觉观测、接触状态和任务谓词之间更紧密。

复杂家务活动经常包含仿真器难以完全建模的过程，例如“清洗”“加热”“弄湿”“污染”。OmniGibson 使用 object states 和 transition rules 处理这类过程：当物体满足接触、温度、容器、液体等前置条件时，规则更新其高层状态。这不是完全精确的物理化学仿真，而是面向任务学习的可计算抽象。

##### 与 iGibson 的关系
从谱系上看，iGibson 提供了以物体状态为中心的交互框架，OmniGibson 则把它推向更大规模任务、更丰富资产和更高保真图形物理。若把任务看作谓词图，策略要学习的是动作如何改变图中节点与边：

$$
P(s_{t+1}\mid s_t,a_t)=P_{\text{physics}}(s_{t+1})\cdot P_{\text{rules}}(z_{t+1}\mid z_t,s_{t+1})
$$

这里 \(s_t\) 是连续物理状态，\(z_t\) 是离散/符号物体状态。OmniGibson 的实用意义在于让二者同时存在：低层控制和视觉由物理世界提供，高层任务由谓词系统提供。

##### 局限与使用建议
由于清单 paper_url 与 OmniGibson 不匹配，严格论文复现需要以 OmniGibson/BEHAVIOR-1K 官方论文和代码文档为准。使用该平台时应明确区分三类信息：真实物理仿真的结果、规则系统更新的高层状态、以及 BDDL 任务定义中的符号谓词。混淆这三层会导致对模型能力的过度解释。

### Habitat 3.0

```yaml
id: habitat_3
num: 15
name: Habitat 3.0
full_name: Habitat 3.0社交协作平台 (Habitat 3.0)
year: '2024'
org: Meta AI
parent: habitat
paper_url: https://arxiv.org/abs/2310.13724
project_url: ''
category: interactive
motivation: 从静态导航演进至社交人机协作
```

#### 📝 一句话总结
Habitat 3.0 将 Habitat 从静态室内导航扩展到有人类化身参与的协作仿真，使机器人能在同一家庭环境中学习跟随、避让、协作搬运和社交重排等任务。

#### 🎯 核心要点
- **范式变化**：研究对象从“机器人独自在静态场景中导航”转向“机器人与人类在动态家庭中协作”。
- **人类仿真**：平台提供可动画化 humanoid，支持外观、运动轨迹、速度和碰撞等因素。
- **交互接口**：支持脚本化 humanoid、键鼠控制和 VR human-in-the-loop，便于收集人机协作数据。
- **任务集合**：提出 Social Navigation 和 Social Rearrangement，考验机器人在有人类活动的环境中完成任务。

#### 🔬 深入细节
##### 核心示意图
![Habitat 3.0 human robot collaboration](https://ar5iv.labs.arxiv.org/html/2310.13724/assets/x1.png)

*图示展示 Habitat 3.0 中人类化身与机器人共同处于室内环境，用于社交导航和协作重排任务。*

##### 算法伪代码
```python
def run_habitat3_social_task(scene, human_controller, robot_policy):
    env = habitat3.load(scene, agents=["humanoid", "robot"])
    env.reset_with_collaborative_goal()

    while not env.episode_over():
        human_obs = env.observe("humanoid")
        human_action = human_controller(human_obs)

        robot_obs = env.observe("robot")
        robot_action = robot_policy(robot_obs, env.goal)

        env.step({"humanoid": human_action, "robot": robot_action})
        env.update_social_metrics()
    return env.task_success(), env.metrics
```

##### 背景与动机
Habitat 1.x/2.x 已经让 embodied agent 在真实扫描或可交互场景中进行导航、重排和操作，但许多家庭场景的关键变量是“人”。机器人如果要进入真实家庭，需要处理人类移动、停留、占用空间、请求协助以及与机器人共享路径的问题。Habitat 3.0 的核心贡献就是把人类作为可模拟、可控制、可评估的动态 agent 纳入环境。

这改变了任务目标函数。传统导航可近似写为最短路或 SPL 优化；社交导航还要惩罚不舒适距离、碰撞和阻挡：

$$
R_t = R_{\text{task}}(s_t,a_t)-\lambda\mathbb{1}[\text{collision}]-\mu\,\max(0,d_{\text{safe}}-d_{\text{human}})
$$

因此，成功不再只是到达目标点，而是以社会可接受的方式到达，并在必要时配合人类动作。

##### Humanoid 与交互
Habitat 3.0 的 humanoid 不是简单圆柱障碍物。论文描述了基于人体骨架、网格、线性蒙皮和动作数据的化身系统，使人类可以执行自然的行走、转身和手部动作。平台还支持缓存动作轨迹并把它们适配到不同场景中，从而在大规模训练时保持高吞吐。

在人机协作任务里，人类既可以由脚本驱动，也可以由真实用户通过键鼠或 VR 控制。这个 human-in-the-loop 设计很重要，因为社交行为很难完全预先脚本化；真实用户的临场决策能暴露机器人策略在让路、跟随、等待和协同方面的缺陷。

##### 任务与评估
Social Navigation 要求机器人在有移动人类的环境中寻找、跟随或保持合适距离。Social Rearrangement 则进一步要求机器人和人类一起改变物体位置，例如人类移动某些物品，机器人需要理解协作目标并完成剩余工作。二者都迫使策略处理非平稳世界：同一个动作在不同人类运动状态下会产生不同结果。

Habitat 3.0 的工程亮点是效率。论文报告在加入 humanoid 后仍保持高帧率，这意味着研究者可以训练强化学习策略，而不是只能进行少量离线评估。对 embodied AI 来说，这个平台把社交约束从后处理指标前移到了仿真和训练循环中。

### robosuite

```yaml
id: robosuite
num: 16
name: robosuite
full_name: robosuite模块化机器人学习框架 (robosuite)
year: '2020'
org: Stanford
parent: mujoco
paper_url: https://arxiv.org/abs/2009.12293
project_url: ''
category: benchmark
motivation: 模块化机器人学习框架，支持多种控制器
```

#### 📝 一句话总结
robosuite 是一个基于 MuJoCo 的模块化机器人学习框架，用统一 API 组合机器人、夹爪、控制器、场景和任务，便于系统比较操作策略与控制接口。

#### 🎯 核心要点
- **模块化目标**：将 robot model、gripper、arena、object、task、controller 拆开，使实验者能系统替换组件。
- **控制接口**：支持关节空间、笛卡尔空间、逆运动学和 Operational Space Control 等多种控制模式。
- **任务覆盖**：包含 Lift、Stack、PickPlace、Door、NutAssembly、Wipe、双臂协作等标准操作任务。
- **研究价值**：它为 manipulation RL 提供可重复 benchmark，并降低从低层控制到高层策略的实验耦合。

#### 🔬 深入细节
##### 核心示意图
![robosuite procedural robot environments](https://ar5iv.labs.arxiv.org/html/2009.12293/assets/gallery.png)

*图示展示 robosuite 中由机器人、场景、物体和任务组合得到的多种 MuJoCo 操作环境。*

##### 算法伪代码
```python
def create_robosuite_episode(config, policy):
    robot = RobotModel(config.robot)
    gripper = GripperModel(config.gripper)
    arena = Arena(config.arena)
    objects = [ObjectModel(o) for o in config.objects]
    task = Task(robot, gripper, arena, objects)

    env = MujocoEnv(task.to_mjcf(), controller=config.controller)
    obs = env.reset()
    while not env.done:
        action = policy(obs)
        torque = env.controller.convert_action_to_torque(action)
        obs, reward, done, info = env.step(torque)
    return env.trajectory
```

##### 背景与动机
机器人操作研究常常被两个因素限制：一是环境实现重复劳动多，二是不同论文的控制接口不一致。一个策略如果在末端位置控制下有效，不一定能直接与关节力矩控制策略公平比较；同一个拾取任务，如果机器人、夹爪、相机和奖励都不同，实验结论也很难复现。robosuite 的目标就是把这些自由度模块化并标准化。

控制器可以写成从策略动作 \(a_t\) 到 MuJoCo 力矩 \(\tau_t\) 的映射：

$$
\tau_t = C(q_t,\dot q_t,a_t;\theta_C)
$$

其中 \(C\) 可以是关节位置控制、关节速度控制、末端位姿控制或 Operational Space Control。策略看到的是统一动作空间，底层控制器负责转换到仿真力矩。

##### 模块化架构
robosuite 的 Modeling API 负责构建 MJCF 世界：机器人模型、夹爪、桌面/场景、物体和任务约束被组合成可加载的 MuJoCo XML。Simulation API 则提供类似 Gym 的 `reset`、`step`、观测和奖励接口。这样的拆分让研究者可以只替换一部分组件，例如把 Panda 换成 Sawyer，或把 OSC 控制换成关节速度控制。

平台包含多种传感器，包括 RGB-D 相机、机器人本体状态、末端位姿、力/接触信息等。它也支持键盘、SpaceMouse 等人类输入设备，便于示教采集和调试。这使 robosuite 既可用于强化学习，也可用于 imitation learning 和控制器研究。

##### Benchmark 意义
robosuite 的任务覆盖单臂、双臂和接触丰富场景。Lift 和 Stack 适合基础抓取与堆叠，Door 和 Wipe 考验接触约束，TwoArmLift、TwoArmPegInHole、TwoArmHandoff 则测试协作操作。论文中的基线实验显示，控制器选择会显著影响学习效率；例如在某些任务中 OSC 比更低层的控制接口更容易训练。

从 benchmark 角度看，robosuite 的重点不是提供最大规模场景，而是提供干净的实验分解。它让研究者能够回答“策略提升来自算法本身，还是来自更合适的控制接口/机器人模型/奖励设计”这类问题。

### RLBench

```yaml
id: rlbench
num: 17
name: RLBench
full_name: RLBench机器人学习基准 (RLBench)
year: '2020'
org: Imperial
parent: vrep
paper_url: https://arxiv.org/abs/1909.12271
project_url: ''
category: benchmark
motivation: 提供100个手工任务，支持少样本学习测试
```

#### 📝 一句话总结
RLBench 基于 CoppeliaSim/V-REP 和 PyRep 提供 100 个手工设计机器人操作任务，用自动演示生成、语言变化和少样本协议评估机器人学习算法的泛化能力。

#### 🎯 核心要点
- **任务规模**：包含 100 个独特任务，而不只是同一任务的参数扰动。
- **演示生成**：每个任务通过 waypoint 和运动规划自动生成大量专家演示，降低人工采集成本。
- **观测丰富**：提供多视角 RGB、深度、分割、末端相机和 proprioception，适合视觉模仿学习。
- **评估协议**：定义 task、variation、episode 和 K-shot 设置，测试模型对新任务/新变化的快速适应。

#### 🔬 深入细节
##### 核心示意图
![RLBench task grid](https://ar5iv.labs.arxiv.org/html/1909.12271/assets/task_grid.png)

*图示展示 RLBench 100 个机器人操作任务中的一部分，体现其任务类型和物体交互多样性。*

##### 算法伪代码
```python
def evaluate_rlbench_few_shot(train_tasks, test_task, k, learner):
    demos = {}
    for task in train_tasks:
        demos[task] = generate_waypoint_demos(task, num_episodes="many")
    learner.meta_train(demos)

    support = generate_waypoint_demos(test_task, num_episodes=k)
    learner.adapt(support)

    scores = []
    for variation in test_task.heldout_variations:
        obs = test_task.reset(variation)
        scores.append(rollout_success(learner.policy, obs))
    return mean(scores)
```

##### 背景与动机
机器人学习需要多任务、多变化和可复现演示，但真实机器人上收集 100 个任务的数据几乎不可承受。RLBench 的目标是提供一个任务丰富、演示可自动生成、评估协议清晰的仿真基准。它使用 Franka Panda 机械臂和 CoppeliaSim/V-REP，通过 PyRep 暴露 Python 接口。

一个任务可以表示为变化分布上的轨迹集合：

$$
\tau=\{(o_t,a_t)\}_{t=1}^{T}, \quad v\sim p_{\text{variation}}(\mathcal{T})
$$

其中 \(v\) 可以改变物体颜色、位置、目标抽屉、按钮或语言描述。RLBench 强调算法不能只记住固定场景，而要从少量示例中理解任务结构。

##### 任务与演示
RLBench 的每个任务由手工编写的场景、成功条件、变化采样器和 waypoint 组成。系统用运动规划器从 waypoint 生成专家轨迹，并记录图像、深度、分割和机器人状态。这种方法兼顾了任务多样性和演示可扩展性：人工只需设计任务逻辑，不必手动遥操作每一条轨迹。

任务还配有自然语言描述，同一个任务变化可以对应不同指令。例如“把红色块放进抽屉”与“按下绿色按钮”都需要视觉 grounding 和动作执行。语言在这里不是装饰，而是定义变化条件和目标对象的重要信息。

##### 少样本评估
RLBench 的少样本挑战把训练任务和测试任务分开，测试时只给新任务的 \(K\) 条演示，常见设置包括 1-shot、5-shot 和 20-shot。理想算法应从支持集 \(D_K=\{\tau_i\}_{i=1}^{K}\) 快速适应，并在新变化上成功执行：

$$
\pi_{\mathcal{T}} = \text{Adapt}(\pi_0, D_K)
$$

这使 RLBench 成为评估 meta-learning、imitation learning 和视觉语言策略的早期重要平台。它的局限是仿真任务仍由人工设计，物理复杂度有限；但其标准化任务数量和自动演示机制对后续机器人基准影响很大。

### MetaWorld

```yaml
id: metaworld
num: 18
name: MetaWorld
full_name: MetaWorld元学习基准 (MetaWorld)
year: '2020'
org: Berkeley
parent: mujoco
paper_url: https://arxiv.org/abs/1910.10897
project_url: ''
category: benchmark
motivation: 50个操作任务，评估元学习与多任务泛化
```

#### 📝 一句话总结
MetaWorld 用 MuJoCo 中 50 个 Sawyer 机械臂桌面操作任务系统评估多任务强化学习和元强化学习，揭示当任务分布足够宽时现有算法的泛化能力仍然有限。

#### 🎯 核心要点
- **任务设计**：50 个任务共享机器人和工作台，但目标、物体和交互模式不同，避免只评估微小参数变化。
- **协议清晰**：提供 MT10/MT50 多任务学习、ML1/ML10/ML45 元学习等标准划分。
- **评价重点**：关注训练任务成功率、新任务适应速度和跨任务泛化，而非单任务最高分。
- **结论影响**：论文显示主流 multi-task RL 和 meta-RL 在广泛操作分布上仍有明显性能瓶颈。

#### 🔬 深入细节
##### 核心示意图
![MetaWorld 50 manipulation tasks](https://ar5iv.labs.arxiv.org/html/1910.10897/assets/x1.png)

*图示展示 MetaWorld 的 50 个操作任务，以及用于训练和测试的任务划分。*

##### 算法伪代码
```python
def evaluate_metaworld(protocol, algorithm):
    train_tasks, test_tasks = protocol.split_tasks()
    for iteration in range(protocol.train_steps):
        task = sample(train_tasks)
        rollout = collect_rollout(task.env, algorithm.policy(task))
        algorithm.update(rollout, task_id=task.id if protocol.uses_task_id else None)

    results = {}
    for task in test_tasks:
        adapted_policy = algorithm.adapt(task.support_data)
        results[task.name] = measure_success_rate(task.env, adapted_policy)
    return aggregate(results)
```

##### 背景与动机
在 MetaWorld 之前，很多元强化学习基准只在同一任务的参数变化上评估，例如目标点不同、速度不同或物体位置不同。这样的设置可能高估泛化能力，因为算法只需学会在一个窄分布内快速调参。MetaWorld 则把分布扩展到 50 个语义不同的桌面操作任务，如开门、按按钮、推物体、取放、插拔等。

多任务强化学习目标可写为：

$$
\max_{\pi}\ \mathbb{E}_{\mathcal{T}\sim p(\mathcal{T})}
\left[\mathbb{E}_{\pi}\sum_{t=0}^{T}\gamma^t r_{\mathcal{T}}(s_t,a_t)\right]
$$

MetaWorld 的关键是让 \(p(\mathcal{T})\) 足够宽，使该目标真正考验共享技能、任务识别和快速适应。

##### 协议设计
MetaWorld 区分多任务学习和元学习。MT10/MT50 要求算法同时学习 10 或 50 个训练任务，通常可使用任务 ID；ML10/ML45 则把一部分任务保留为 meta-test，训练时见到的是任务分布，测试时需要利用少量交互适应新任务。ML1/MT1 则用于分析单个任务内部变化。

成功指标通常基于末端或物体到目标的距离，例如：

$$
\text{success}=\mathbb{1}[\lVert o-g\rVert_2<\epsilon]
$$

这种二值指标虽简单，但能跨任务统一比较。奖励函数则常加入 shaped distance reward，帮助 RL 训练。

##### 实验启示
论文评估了多任务 PPO/TRPO/SAC、带任务嵌入的策略以及 RL^2、MAML、PEARL 等 meta-RL 方法。结果显示，算法在少量任务上可以取得不错表现，但任务数增大后成功率显著下降；meta-test 新任务上的快速适应也远未达到理想水平。

MetaWorld 的价值在于提供了“难但受控”的测试床。它不像真实家庭环境那样视觉和物理复杂，也不涉及语言，但在任务分布维度上足够系统。对于研究多任务表征、策略条件化、上下文推断和元学习，它仍然是一个常用基准。

### CALVIN

```yaml
id: calvin
num: 19
name: CALVIN
full_name: CALVIN语言条件长程操作基准 (CALVIN)
year: '2022'
org: Freiburg
parent: —
paper_url: https://arxiv.org/abs/2112.03227
project_url: ''
category: benchmark
motivation: 语言条件长程操作，评估零样本指令泛化
```

#### 📝 一句话总结
CALVIN 用语言指令、视觉观测和连续控制构造长程桌面操作基准，重点评估策略能否在新环境中连续完成多条自然语言子任务。

#### 🎯 核心要点
- **长程目标**：评估连续执行 5 条语言指令的能力，而不是只完成单个短任务。
- **数据来源**：包含约 24 小时遥操作 play data 和大量语言标注，覆盖抽屉、门、按钮、开关、灯和积木操作。
- **泛化协议**：使用四个环境划分，常见设置是在三个环境训练、第四个环境零样本测试。
- **基准意义**：推动语言条件 imitation learning 从短程单任务走向组合式、开放顺序的机器人操作。

#### 🔬 深入细节
##### 核心示意图
![CALVIN tabletop environment](https://ar5iv.labs.arxiv.org/html/2112.03227/assets/figures/scene.png)

*图示展示 CALVIN 的桌面操作环境与传感器布局，用于语言条件机器人控制。*

##### 算法伪代码
```python
def evaluate_calvin_sequence(env, policy, instruction_chain):
    obs = env.reset()
    completed = 0
    for instruction in instruction_chain:
        for t in range(env.max_steps_per_instruction):
            action = policy(obs, instruction)
            obs, _, _, info = env.step(action)
            if env.subtask_success(instruction):
                completed += 1
                break
        else:
            break
    return completed
```

##### 背景与动机
许多语言条件机器人基准关注“给一句话，完成一个动作”。真实家务任务更接近一串开放顺序的子目标：打开抽屉、取出物体、按下按钮、移动积木、再关闭抽屉。CALVIN 的核心贡献是把语言条件控制放到长程组合评估中，检查策略是否能在连续执行中保持状态、处理误差累积并根据新指令切换行为。

策略可写为：

$$
a_t \sim \pi_{\theta}(a_t\mid o_{\le t}, l_k)
$$

其中 \(o_{\le t}\) 是视觉和本体历史，\(l_k\) 是当前语言指令。长程评估中，一条 episode 包含多个 \(l_k\)，策略必须在完成当前指令后切换到下一条，而不是仅优化单个短程成功率。

##### 数据与环境
CALVIN 使用 Franka Panda 机械臂、平行夹爪和桌面环境，包含抽屉、滑门、按钮、开关、灯光以及不同颜色/形状的积木。观测包括静态相机、腕部相机、深度、本体状态和触觉等。数据来自遥操作 play data，而不是严格分段的任务演示，这使数据更贴近真实交互中的连续探索。

语言标注把 play data 中的行为片段映射到自然语言指令。这样，模型可以从非结构化操作流中学习动作语义，并在评估时根据新指令组合这些技能。CALVIN 的四个环境 A-D 共享任务语义但布局和外观不同，用于检验视觉和语言 grounding 的环境泛化。

##### 长程指标
CALVIN 的代表性评估是给定 1000 条长度为 5 的指令链，统计模型连续完成的平均子任务数。若第 \(i\) 个子任务成功记为 \(S_i\)，完成前 \(k\) 个任务的概率可写为：

$$
P(\text{complete } k)=\prod_{i=1}^{k}P(S_i\mid S_1,\ldots,S_{i-1})
$$

这个指标对误差累积非常敏感：单步成功率看似不低的模型，连续 5 步后可能迅速下降。正因如此，CALVIN 对评估机器人 foundation policy、语言条件 imitation learning 和长程规划非常有代表性。

### ManiSkill3

```yaml
id: maniskill3
num: 20
name: ManiSkill3
full_name: ManiSkill3 GPU并行操作基准 (ManiSkill3)
year: '2024'
org: UCSD
parent: sapien
paper_url: https://arxiv.org/abs/2410.00425
project_url: ''
category: benchmark
motivation: 关节物体引擎支撑大规模并行操作基准
```

#### 📝 一句话总结
ManiSkill3 在 SAPIEN/PhysX 之上提供 GPU 并行仿真与渲染，把操作任务、机器人、演示生成和主流 RL/LfD/VLA 基线整合成面向大规模 embodied AI 的高速基准。

#### 🎯 核心要点
- **核心升级**：同时并行物理仿真和视觉渲染，显著提高状态和视觉强化学习吞吐。
- **异构环境**：支持每个并行环境加载不同物体、关节结构或场景，而不仅是同一任务的复制。
- **任务覆盖**：包含多类操作任务、二十余种机器人和状态/RGB/点云/体素等观测。
- **算法生态**：内置 PPO、SAC、TD-MPC2、BC、Diffusion Policy、ACT、PerACT 以及 VLA 评估流程。

#### 🔬 深入细节
##### 核心示意图
![ManiSkill3 GPU parallel task suite](https://ar5iv.labs.arxiv.org/html/2410.00425/assets/x1.png)

*图示展示 ManiSkill3 覆盖的多类 GPU 并行机器人操作任务和环境形态。*

##### 算法伪代码
```python
def train_maniskill3_gpu(task_config, policy):
    envs = make_vectorized_gpu_envs(
        task=task_config.task,
        num_envs=task_config.num_envs,
        heterogeneous_assets=task_config.heterogeneous_assets,
        observation_mode=task_config.obs_mode,
    )

    obs = envs.reset()
    while not converged(policy):
        actions = policy(obs)
        next_obs, rewards, dones, infos = envs.step(actions)
        policy.update(obs, actions, rewards, next_obs, dones)
        obs = envs.reset_done(next_obs, dones)
    return policy
```

##### 背景与动机
机器人操作 RL 的训练成本长期受仿真吞吐限制。CPU 串行环境在状态任务上尚可，但一旦加入 RGB、深度或点云渲染，数据生成速度会成为主要瓶颈。ManiSkill3 的目标是把物理、渲染和环境批处理尽可能搬到 GPU 上，使研究者可以在较短时间内训练和比较复杂策略。

向量化仿真可表示为：

$$
S_{t+1}^{1:N}=\text{SimGPU}(S_t^{1:N},A_t^{1:N})
$$

其中 \(N\) 是并行环境数。关键不只是批量推进同一个世界，而是支持异构环境：不同副本可以拥有不同物体实例、关节物体、房间或初始状态。这对泛化训练尤其重要。

##### 系统机制
ManiSkill3 基于 SAPIEN 和 PhysX，提供 GPU parallelized simulation/rendering，并支持 state、RGB、depth、point cloud、voxel 等观测模式。它覆盖单臂、双臂、移动操作、关节物体交互等任务类别，并提供二十余种机器人配置。相比只追求任务数量的基准，ManiSkill3 更强调“高速训练 + 多模态观测 + 可复现实验脚本”的组合。

论文还提供演示生成和回放流水线。演示可以来自运动规划、RL 或遥操作，并能在 CPU/GPU 路径间回放、转换动作表示。这对 imitation learning 很关键，因为示教格式、控制频率和动作空间不一致常常阻碍算法比较。

##### 基线与意义
ManiSkill3 把 RL、LfD 和 VLA 放在同一平台中评估。对于 RL，它提供 PPO、SAC、TD-MPC2 等基线；对于模仿学习，提供 BC、Diffusion Policy、ACT、PerACT；对于视觉语言动作模型，还包括 Octo、RT-X、RDT 等评估入口。统一平台降低了“不同任务/不同仿真器/不同观测管线”带来的比较噪声。

高速并行也改变了实验设计。过去研究者可能因为训练成本只报告少量种子或小规模任务，现在可以更系统地做 ablation、domain randomization 和大规模视觉训练。ManiSkill3 的局限是仿真到真实仍需额外验证，但作为大规模操作算法开发平台，它显著提高了迭代效率。

### RoboCasa

```yaml
id: robocasa
num: 21
name: RoboCasa
full_name: RoboCasa大规模家庭任务仿真 (RoboCasa)
year: '2024'
org: UT Austin
parent: robosuite
paper_url: https://arxiv.org/abs/2406.02523
project_url: ''
category: benchmark
motivation: 构建大规模家庭任务仿真，扩展环境多样性
```

#### 📝 一句话总结
RoboCasa 提出面向家庭厨房任务的大规模机器人仿真框架，通过 120 个厨房场景、2,509 个物体资产、100 个任务和 100K+ 演示轨迹，解决机器人学习中环境、任务与数据规模不足的问题。

#### 🎯 核心要点
- 基于 robosuite/MuJoCo 扩展到房间尺度厨房场景，支持移动机械臂、人形、四足带臂等跨 embodiment 机器人。
- 构建 10 种厨房平面布局、12 种厨房风格，组合成 120 个厨房场景，并用 AI 生成纹理增强视觉多样性。
- 提供 2,509 个高质量厨房物体资产，覆盖 153 个类别，包含可交互橱柜、抽屉、微波炉、炉灶旋钮等关节对象。
- 设计 100 个任务：25 个原子任务覆盖 8 类基础技能，75 个复合任务由 GPT-4/Gemini 辅助生成厨房活动蓝图。
- 结合人类遥操作演示与 MimicGen 自动轨迹生成，形成 1,250 条人工原子任务演示和 100K+ 机器生成轨迹。
- 使用行为克隆训练多任务策略，实验显示合成演示数据可以改善仿真泛化，并在真实厨房任务中提升少样本实机学习效果。

#### 🔬 深入细节
![RoboCasa 任务生成流程](https://arxiv.org/html/2406.02523v1/x3.png)
*图：RoboCasa 使用 LLM 从高层厨房活动生成可执行复合任务蓝图，再落到 pick、place、close_door、press 等技能序列。*

```python
# RoboCasa 数据与策略训练伪代码
scenes = build_kitchens(floor_plans=10, styles=12, ai_textures=True)
assets = load_assets(objaverse=True, text_to_3d=True, articulated_appliances=True)
atomic_tasks = define_atomic_tasks(skills=[
    "pick_place", "open_close_door", "open_close_drawer", "twist_knob",
    "turn_lever", "press_button", "insertion", "navigation",
])

activities = llm.generate("common everyday kitchen activities")
composite_tasks = []
for activity in activities:
    task_blueprints = llm.generate_tasks(activity, available_skills=atomic_tasks)
    composite_tasks.extend(filter_and_implement(task_blueprints))

human_demos = teleoperate(tasks=atomic_tasks + composite_tasks, device="SpaceMouse")
generated_demos = []
for demo in human_demos.atomic_subset():
    segments = annotate_object_centric_subtasks(demo)
    for scene in sample(scenes):
        traj = mimicgen_retarget(segments, scene, assets)
        if task_success(traj):
            generated_demos.append(traj)

policy = train_behavior_cloning(human_demos + generated_demos)
evaluate(policy, heldout_scenes=True, heldout_objects=True, real_kitchen=True)
```

RoboCasa 的核心动机是把“机器人仿真环境”从单一桌面任务扩展到更接近真实家庭的房间尺度任务。传统 robosuite、MetaWorld、RLBench 等环境在控制接口和物理交互上很成熟，但通常场景、物体、任务语义比较有限；而 Habitat、AI2-THOR 等视觉环境场景更大，却未必具备精细接触和可训练的机器人控制闭环。RoboCasa 选择在 robosuite/MuJoCo 上扩展，是为了保留物理接触、控制器和机器人学习接口，同时补齐家庭场景多样性。

场景层面，论文把厨房拆成“平面布局 × 装修风格 × 可替换纹理 × 可交互资产”。10 种布局覆盖 one-wall、L-shape、U-shape、island 等常见厨房结构；12 种风格覆盖 industrial、Scandinavian、coastal、modern、traditional 等视觉设计。再加上墙面、地面、台面、柜门等 AI 生成纹理，训练集可以在同一任务语义下呈现大量视觉变化。这个设计本质上是在做更结构化的 domain randomization：不是随机噪声，而是保持家庭厨房常识的可控变化。

任务层面，RoboCasa 先定义 8 类基础 sensorimotor 技能，再构造 25 个原子任务作为行为基元。复合任务则来自 LLM 辅助设计：先让 GPT-4 给出常见厨房活动，例如洗碗、做吐司、补货、蒸蔬菜；再让 GPT-4/Gemini 在可用物体、fixture 和技能约束下生成具体任务蓝图。由于 LLM 会产生逻辑错误，论文仍然保留人工过滤和代码实现步骤。关键不是让 LLM 直接控制机器人，而是用它扩大任务语义覆盖面。

数据层面，人工遥操作只提供高质量种子演示。RoboCasa 再用 MimicGen 将演示拆成 object-centric subtasks，并根据新场景中新物体的位姿重定向、拼接和回放轨迹。可以把生成流程理解为：

$$
\tau_{\text{new}} = \operatorname{stitch}\left(
T(o_1)\tau_1,\; T(o_2)\tau_2,\; \ldots,\; T(o_k)\tau_k
\right)
$$

其中 \(\tau_i\) 是原始演示中的子轨迹，\(T(o_i)\) 是根据当前目标物体位姿计算的空间变换。只有成功完成任务的重放轨迹会被保留，因此数据生成带有 rejection sampling。

与传统仿真基准相比，RoboCasa 的贡献不在单个控制算法，而在把“多场景、多资产、多任务、多演示”的四个规模维度放进同一训练基准。论文用行为克隆和 diffusion policy 等离线模仿学习方法验证：仅 50 条人工演示不足以覆盖任务和场景变化，而大量 MimicGen 轨迹能显著改善泛化。真实厨房实验也显示，仿真数据与少量真实演示联合训练比只用真实演示更有效。

> 💡 关键：RoboCasa 的“规模化”不是简单复制环境数量，而是让布局、风格、物体类别、任务组合和演示轨迹都能系统性扩展。

#### 🧪 练习题
```yaml
question: "RoboCasa 使用 MimicGen 扩展数据集的核心机制是什么？"
options:
  - "直接让 LLM 生成机器人关节轨迹"
  - "把人工演示拆成对象中心子任务，并按新场景物体位姿重定向与拼接轨迹"
  - "只对图像做颜色增强，不改变轨迹"
  - "用真实机器人自动试错收集全部数据"
answer: 1
explain: "MimicGen 利用少量人工演示生成大量成功轨迹，关键是 object-centric 子轨迹重定向和成功过滤。"
```

### Embodied Arena

```yaml
id: embodied_arena
num: 22
name: Embodied Arena
full_name: 具身智能统一评估平台 (Embodied Arena)
year: '2026.03'
org: Community
parent: —
paper_url: https://embodied-arena.com/
project_url: ''
category: benchmark
motivation: 统一评估平台，覆盖30+模型在22个基准
```

#### 📝 一句话总结
Embodied Arena 提出统一、可演进的具身智能评估平台，把 22 个基准、30+ 模型和 7 类具身能力 taxonomy 对齐，解决跨基准结果不可比、能力定义不清和评测数据难扩展的问题。

#### 🎯 核心要点
- 建立三层能力视角：感知、推理、任务执行，细化为 7 个核心能力和 25 个细粒度能力维度。
- 统一整合 2D/3D Embodied Q&A、Navigation、Task Planning 三类任务，共 22+ 基准和 64K+ 任务实例。
- 支持 30+ 商业/开源/专用具身模型，通过 API、参数部署或自定义接口接入统一评测。
- 设计 benchmark view 与 capability view 两种 leaderboard，使模型可按单基准排名或按能力维度诊断。
- 提出 LLM 驱动的数据生成与演化流程，自动构建室内场景、生成能力定向样本并根据模型短板补充新数据。
- 评测指标覆盖精确匹配、模糊文本指标、LLM 语义评估、导航成功率/SPL、任务规划完成率等不同任务范式。

#### 🔬 深入细节
![Embodied Arena 总览](https://arxiv.org/html/2509.15273v1/x1.png)
*图：Embodied Arena 将多来源模型、多类基准和 LLM 生成数据统一映射到 7 类具身能力与 3 类排行榜。*

> ⚠️ 依据限制：清单中的 `paper_url` 是项目网站而非论文页面。以下内容基于项目官网和公开论文 arXiv:2509.15273，YAML 元信息保持任务清单原样。

```python
# Embodied Arena 统一评测伪代码
taxonomy = load_taxonomy(core_capabilities=7, fine_dimensions=25)
benchmarks = load_benchmarks(domains=["qa", "navigation", "task_planning"])
models = load_models(api_models=True, open_weights=True, custom_adapters=True)

for benchmark in benchmarks:
    adapter = build_io_adapter(benchmark)
    mapped_dims = map_benchmark_dimensions(benchmark, taxonomy)
    for model in models:
        predictions = []
        for sample in benchmark.samples:
            x = adapter.to_unified_input(sample)
            y_hat = model.predict(x)
            predictions.append(adapter.from_model_output(y_hat))
        scores = evaluate(predictions, benchmark.metric)
        update_benchmark_view(model, benchmark, scores)
        update_capability_view(model, mapped_dims, scores)

gaps = analyze_model_failures(leaderboards=True)
new_data = llm_generate_targeted_data(gaps, simulation=True)
benchmarks.extend(filter_high_quality(new_data))
```

Embodied Arena 首先解决“评什么”的问题。论文把具身能力划分为 object perception、spatial perception、temporal perception、embodied knowledge、embodied reasoning、embodied navigation、embodied task planning 七类。前四类是基础感知和知识能力，reasoning 是建立在基础能力之上的高级能力，navigation 与 planning 是任务执行层能力。这样做的价值在于，模型不再只得到一个总分，而能看到是空间定位、可供性预测、时间顺序、任务分解还是导航跟随出了问题。

第二个核心是基准对齐。不同具身基准的数据格式和指标差异很大：OpenEQA、ScanQA、SQA3D 更像问答；MP3D、HM3D、R2R-CE、RxR-CE 是导航；EB-ALFRED、EB-Habitat、ET-Plan-Bench 是任务规划。Embodied Arena 用统一 I/O adapter 包装模型输入输出，再把每个基准原有维度映射到 25 个 taxonomy 维度。单基准能力分数可以写成：

$$
S_m^n = \frac{c_m^n}{k_m^n}\times 100
$$

其中 \(k_m^n\) 是第 \(n\) 个基准第 \(m\) 个能力维度的问题数，\(c_m^n\) 是正确数。跨基准总分再对维度或基准聚合。这个分层聚合避免了“一个 benchmark 偏好一种能力就代表整体具身智能”的问题。

第三个核心是数据演化。传统评测集构建后就静态不变，容易被模型针对性训练或过拟合。Embodied Arena 的自动数据生成模块分两部分：Automated Scenario Generation 负责生成多房间室内场景，包括 floor planning、functional zoning、layout planning；Capability-Oriented Data Generation & Evolution 负责围绕七类能力生成视觉-指令-答案样本。系统还引入难度阶梯，从场景复杂度、语言复杂度、任务复杂度逐步加难。

推理/执行类任务的评测方法不能完全统一成字符串匹配，因此平台采用多种 metric。问答任务可使用 exact matching、CIDEr/BLEU/ROUGE/MRA 或 LLM-based semantic evaluation；导航任务使用 success rate 和 SPL；任务规划使用 task completion success rate。最终 leaderboard 同时提供 benchmark view 和 capability view：前者方便论文引用，后者更适合诊断模型短板。

论文的经验发现也解释了平台价值：大规模通用多模态模型在总分上通常强，但同规模下专用具身模型会在特定能力上超过通用模型；单个基准的排名波动很大，说明孤立 benchmark 容易产生偏见；基础 object/spatial perception 与高级 embodied reasoning 有强相关，基础能力不足会直接限制推理和规划。

> 💡 关键：Embodied Arena 不是新控制器，而是把具身模型评测从“跑一个数据集”升级为“按能力 taxonomy 进行持续、跨基准、可演进的诊断”。

#### 🧪 练习题
```yaml
question: "Embodied Arena 的 capability view 主要解决什么问题？"
options:
  - "只展示模型在单个 benchmark 上的排行榜名次"
  - "把不同基准结果映射到统一能力 taxonomy，诊断模型具体强弱项"
  - "替代所有导航仿真器"
  - "将所有任务统一成一个二分类准确率"
answer: 1
explain: "capability view 聚合到 7 类核心能力和 25 个细粒度维度，比单基准总分更适合分析模型能力短板。"
```

### RBench

```yaml
id: rbench
num: 23
name: RBench
full_name: RBench视频生成物理评估基准 (RBench)
year: '2026.01'
org: THU
parent: —
paper_url: https://arxiv.org/abs/2601.15282
project_url: ''
category: benchmark
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

### Isaac Gym

```yaml
id: isaac_gym
num: 24
name: Isaac Gym
full_name: Isaac Gym GPU并行仿真 (Isaac Gym)
year: '2021'
org: NVIDIA
parent: —
paper_url: https://arxiv.org/abs/2108.10470
project_url: ''
category: parallel
motivation: 开创GPU全并行仿真范式，效率提升数千倍
```

#### 📝 一句话总结
Isaac Gym 提出端到端 GPU 强化学习仿真管线，将物理仿真、状态张量读写、策略前向和优化都放在 GPU 上，解决传统 CPU 仿真与 GPU 训练之间的数据搬运瓶颈。

#### 🎯 核心要点
- 使用 GPU PhysX 后端并行模拟刚体、关节、接触和约束，面向数千到上万个环境同时 rollout。
- 提出 Tensor API，将 actor root state、rigid body state、DOF state、force sensor 等物理状态直接暴露为 PyTorch 可包装的 GPU tensor。
- 消除传统 `CPU simulator → CPU buffer → GPU network → CPU action` 的反复拷贝，使仿真和学习共享同一设备内存。
- 支持 Ant、Humanoid、ANYmal、Shadow Hand、Franka cube stack、TriFinger 等复杂运动控制和灵巧操作任务。
- 论文报告整体 RL 训练管线通常获得 100-1000x 级吞吐提升，部分任务训练时间从天级降到分钟/小时级。
- 大规模并行环境天然适合 domain randomization、课程学习、扰动采样和 sim-to-real 策略鲁棒性训练。

#### 🔬 深入细节
![Isaac Gym GPU 机器人训练示意](https://developer-blogs.nvidia.com/wp-content/uploads/2020/12/rl-isaac-gym.png)
*图：NVIDIA 官方博客展示的 Isaac Gym 机器人训练示意；论文中的关键机制是 Tensor API 让 Python/RL 代码直接在 GPU 上 step PhysX 后端并读写仿真状态。*

```python
# Isaac Gym 风格端到端 GPU PPO
sim = create_gpu_physx_sim(num_envs=8192)
root_states = acquire_actor_root_state_tensor(sim)  # CUDA tensor view
dof_states = acquire_dof_state_tensor(sim)

for update in range(num_updates):
    rollout = []
    for t in range(horizon):
        refresh_physics_tensors(sim)
        obs = build_observations(root_states, dof_states, commands)

        with torch.no_grad():
            action, logprob, value = policy(obs)

        set_dof_actuation_force_tensor(sim, action_to_torque(action))
        simulate(sim)
        refresh_physics_tensors(sim)

        reward, done = compute_reward_and_reset(root_states, dof_states)
        rollout.append((obs, action, logprob, value, reward, done))

    adv = compute_gae(rollout)
    ppo_update(policy, rollout, adv)  # rollout buffer 仍在 GPU 上
```

Isaac Gym 的核心洞察是：机器人 RL 的瓶颈通常不是神经网络训练，而是环境交互吞吐。传统仿真器多在 CPU 上运行，策略网络在 GPU 上运行；每一步都需要把观测从 CPU 拷贝到 GPU，再把动作从 GPU 拷回 CPU。单步成本看似不高，但在 PPO 这类需要海量 rollout 的算法中，数据搬运和进程同步会主导总时间。

Tensor API 是 Isaac Gym 最重要的接口创新。仿真场景中所有 actor、rigid body、DOF 和传感器状态被组织成大张量，例如：

$$
X_{\text{body}}\in\mathbb{R}^{N_B\times 13},\qquad
X_{\text{dof}}\in\mathbb{R}^{N_D\times 2}
$$

其中刚体状态通常包含位置、四元数、线速度和角速度，DOF 状态包含关节位置和速度。策略不再对每个环境逐个调用 getter，而是通过 tensor slice 一次性构造观测、计算奖励和判断 reset。

在物理求解上，Isaac Gym 使用 GPU PhysX 和 Temporal Gauss-Seidel 类约束求解流程，使大量相似环境可以在 GPU 上批量推进。对强化学习来说，这意味着 `num_envs` 从几十提升到几千时，采样不是线性拖慢，而是在 GPU 并行度允许范围内继续提升吞吐。论文在 Ant、Humanoid 等任务上展示了数十万到数百万级 step/s 的量级，并在 ANYmal 粗糙地形、Shadow Hand、TriFinger 等任务上验证复杂接触训练。

训练流程上，Isaac Gym 不改变 PPO、SAC 或行为克隆等算法的数学形式，而是改变它们的数据来源和执行位置。策略优化目标仍可写作 PPO 裁剪目标：

$$
L^{\text{CLIP}}(\theta)=
\mathbb{E}_t\left[\min\left(r_t(\theta)\hat A_t,\,
\operatorname{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat A_t\right)\right]
$$

但 \(s_t,a_t,r_t\) 的采集、优势函数计算和 minibatch 训练都在 GPU 侧完成，避免 CPU round-trip。

与 MuJoCo/PyBullet/robosuite 等传统 CPU 管线相比，Isaac Gym 的取舍非常明确：牺牲一部分复杂场景编辑和高保真渲染生态，换取 RL 数据吞吐的数量级提升。后续 Isaac Sim、Orbit、Isaac Lab 继承了 GPU 并行思路，并补上 Omniverse/RTX/资产/传感器生态。

> 💡 关键：Isaac Gym 不是一种控制策略，而是重塑了机器人 RL 的成本结构，让大规模 domain randomization 和快速迭代成为常规工作流。

#### 🧪 练习题
```yaml
question: "Isaac Gym 相比传统 CPU 仿真训练管线的核心优势是什么？"
options:
  - "用更复杂的奖励函数替代 PPO"
  - "将物理仿真状态以 GPU tensor 暴露给策略网络，避免 CPU-GPU 数据搬运瓶颈"
  - "完全不需要物理引擎"
  - "只能训练单个机器人环境但精度更高"
answer: 1
explain: "Isaac Gym 的 Tensor API 让仿真 step、状态读写、策略前向和优化都在 GPU 侧完成，支持数千环境并行。"
```

### Isaac Sim

```yaml
id: isaac_sim
num: 25
name: Isaac Sim
full_name: Isaac Sim高保真工业仿真 (Isaac Sim)
year: '2023'
org: NVIDIA
parent: isaac_gym
paper_url: https://arxiv.org/abs/2301.04195
project_url: ''
category: parallel
motivation: 从纯并行训练演进至高保真工业仿真
```

#### 📝 一句话总结
Isaac Sim 将 Isaac Gym 的 GPU 并行训练思想推进到 Omniverse/RTX/OpenUSD 生态中的高保真机器人仿真，而 ORBIT 论文展示了如何把 Isaac Sim 封装成可复用的机器人学习框架。

#### 🎯 核心要点
- 清单中的论文链接对应 ORBIT：一个由 NVIDIA Isaac Sim 驱动的统一机器人学习框架，而非 Isaac Sim 产品白皮书。
- Isaac Sim 提供 PhysX 5.1、Omniverse RTX、USD 资产、刚体/软体/布料、RGB-D/语义/LiDAR/contact 等传感器能力。
- ORBIT 把仿真抽象为 World 与 Agent：World 管理机器人、对象、传感器和场景，Agent 管理感知、规划、控制计算图。
- 支持 16 个机器人平台、4 类传感器模态、10 个运动生成器、20+ benchmark tasks，并提供 4 个学习库 wrapper。
- 支持 RL、teleoperation、imitation learning、motion planning、digital twin 和 sim-to-real 部署。
- 相比 Isaac Gym，重点从“极致并行 RL 采样”扩展到“高保真传感器、资产、任务编辑和工业工作流”。

#### 🔬 深入细节
![ORBIT/Isaac Sim 抽象](https://arxiv.org/html/2301.04195v2/x1.png)
*图：ORBIT 在 Isaac Sim 上定义 World 与 Agent 抽象，任务可通过对 Agent 计算图的裁剪得到观测、动作和奖励接口。*

> ⚠️ 依据限制：`paper_url` 是 ORBIT 论文，论文主题是 Isaac Sim 上的机器人学习框架。以下将 Isaac Sim 作为底层高保真仿真平台，结合 ORBIT 的方法细节进行解读。

```python
# Isaac Sim / ORBIT 风格任务定义与训练流程
world = World(
    scene=load_usd_scene("warehouse_or_kitchen.usd"),
    robots=[load_robot_usd("franka.usd")],
    objects=load_task_objects(),
    sensors=["rgb", "depth", "semantic", "contact"],
)

agent = AgentGraph()
agent.add_node("camera_to_obs", frequency=30)
agent.add_node("ik_controller", frequency=50)
agent.add_node("joint_controller", frequency=1000)

task = RLTask(
    world=world,
    agent_cut=["policy_obs", "policy_action"],
    reward_fn=compute_reward,
    reset_fn=domain_randomized_reset,
)

for update in range(num_updates):
    batch = task.rollout(num_envs=2048)
    ppo_update(policy, batch)
```

Isaac Gym 证明了 GPU 并行物理可以极大降低 RL 训练成本，但它不是完整工业仿真生态。真实机器人开发还需要高保真视觉、材质、传感器、USD 资产管理、GUI 场景编辑、ROS/ROS2 接入、软体/布料和数字孪生工作流。Isaac Sim 的定位就是把 Omniverse 的 3D 工作流与机器人仿真结合起来，让仿真不仅能快，还能更接近真实部署环境。

ORBIT 论文的关键工程抽象是 World/Agent 分离。World 类似真实世界，包含机器人、传感器、静态/动态对象和可视化 marker；Agent 是机器人上的“智能计算图”，包含感知节点、运动生成器、控制器和策略节点。一个学习任务不必重新定义整个世界，而是通过指定观测、动作、奖励和 reset 逻辑，在同一世界上构造不同 MDP。

这个抽象对多频率系统很重要。真实机器人里相机可能 30Hz，IK 50Hz，关节控制 1000Hz，策略 20-50Hz。ORBIT 允许传感器和 agent 节点都有自己的 internal timer，避免所有模块被迫同步到同一频率。对 sim-to-real 而言，这比“每 step 所有传感器都刷新一次”的简化环境更接近真实系统。

Isaac Sim 的 OpenUSD 资产生态是另一个关键。机器人、材质、碰撞体、语义标签、传感器和光照都可以通过 USD 组织。ORBIT 提供从 URDF/OBJ/STL 到 USD 的转换脚本，并自动添加 collider、friction material 等物理属性。这使任务可以脚本化生成，也可以通过 GUI 交互式设计，兼顾程序化扩展和工程调试。

在任务与学习工作流上，ORBIT 提供刚体操作、软体/布料操作、移动操作、腿足 locomotion 等环境，支持 PPO、RSL-RL、rl-games、stable-baselines3、robomimic 等生态。论文报告在刚体任务上相对 CPU 向量化框架可获得约 10x 吞吐，在 deformable cloth 任务上约 3x；同时展示了 Franka/Allegro 数字孪生和 ANYmal-D 策略 sim-to-real。

> 💡 关键：Isaac Sim/ORBIT 的创新不在某个单一损失函数，而在把高保真物理、RTX 传感器、USD 场景、任务抽象和学习库接口组织成可复用机器人学习平台。

#### 🧪 练习题
```yaml
question: "ORBIT 在 Isaac Sim 上引入 World/Agent 抽象的主要目的是什么？"
options:
  - "让所有传感器和控制器必须以同一频率运行"
  - "把场景物理对象与机器人决策计算图解耦，便于复用世界并定义不同学习任务"
  - "移除 USD 资产格式"
  - "只支持离线视频渲染，不支持机器人控制"
answer: 1
explain: "World 管理仿真世界，Agent 管理感知和控制计算图；任务通过选择观测、动作、奖励等接口复用同一世界。"
```

### MuJoCo Playground

```yaml
id: mujoco_playground
num: 26
name: MuJoCo Playground
full_name: MuJoCo Playground高速Sim2Real框架 (MuJoCo Playground)
year: '2025.02'
org: DeepMind
parent: mujoco
paper_url: https://arxiv.org/abs/2502.08844
project_url: ''
category: parallel
motivation: 高速Sim2Real框架，分钟级完成策略训练
```

#### 📝 一句话总结
MuJoCo Playground 提出基于 MJX/JAX 的开源机器人学习框架，把 MuJoCo 物理、Madrona 批渲染和 RL 训练环境整合到单 GPU 端到端管线中，实现分钟级训练和多类机器人零样本 sim-to-real。

#### 🎯 核心要点
- 基于 MuJoCo XLA (MJX) 将物理仿真放到 JAX/GPU 上，保持 MuJoCo 资产生态和接触建模优势。
- 提供 DM Control、locomotion、manipulation 三类环境，覆盖四足、人形、灵巧手、Franka、Aloha 等平台。
- 集成 Madrona GPU batch renderer，使像素观测训练也能在设备端完成，减少 vision policy 的 teacher-student 蒸馏依赖。
- 支持 Brax/JAX 与 RSL-RL/PyTorch 风格训练库，主要使用 PPO/SAC 等 RL 算法。
- 展示 Unitree Go1、Berkeley Humanoid、Unitree G1、Booster T1、LEAP Hand、Franka 等实机迁移。
- 通过 domain randomization、课程学习、延迟随机化和视觉随机化改善状态输入与像素输入的 zero-shot sim-to-real。

#### 🔬 深入细节
![MuJoCo Playground 环境预览](https://arxiv.org/html/2502.08844v1/extracted/6199808/figures/env_grid.png)
*图：MuJoCo Playground 覆盖 locomotion 与 manipulation 环境，论文展示其中多个策略已迁移到真实硬件。*

```python
# MuJoCo Playground 端到端训练/部署伪代码
env = playground.make(
    task="Go1JoystickFlatTerrain",
    backend="mjx",
    num_envs=8192,
    domain_randomization={
        "mass": True,
        "friction": True,
        "sensor_noise": True,
        "latency": True,
    },
)

policy = PPO(obs_encoder="state_or_pixels", device="cuda")

for update in range(num_updates):
    batch = jax_vmap_rollout(env, policy)  # physics, obs, reward all on device
    policy = ppo_update(policy, batch)
    if curriculum_success(batch):
        env.expand_command_range()

export_policy(policy)
deploy_on_robot(control_rate=real_robot.rate, no_finetune=True)
```

MuJoCo Playground 的核心目标是缩短“time-to-robot”：从修改奖励或环境参数，到看到真实机器人表现之间的时间。论文指出，RL 的 reward design 往往需要反复试错；如果每次训练要几天，研究迭代会很慢。MJX 把 MuJoCo 物理搬到 JAX/XLA/GPU 上，使大批量环境 rollout 与策略优化在同一设备上完成，和 Isaac Gym 类似地消除 CPU 采样瓶颈，但保留 MuJoCo 开源生态。

框架包含三类环境。DM Control Suite 用于基础连续控制；locomotion 包含 Unitree Go1、Spot、Barkour、Berkeley Humanoid、Unitree H1/G1、Booster T1、Robotis OP3 等；manipulation 包含 LEAP Hand 方块重定向、Franka yoga block 非抓取重定向、Franka 像素 pick-cube、Aloha 双臂 peg insertion 等。这个覆盖面使它不仅是 benchmark，也是 sim-to-real 配方集合。

Madrona batch renderer 是视觉策略部分的关键。传统像素 RL 往往因为渲染慢而先训练状态策略，再蒸馏到视觉策略。MuJoCo Playground 通过 Madrona 的 CUDA batch ray tracer，把光照、阴影、纹理、材质和相机随机化纳入 GPU 批渲染。论文在 Cartpole 和 Franka pixel 环境中报告高吞吐渲染步进，并展示单相机 64×64 RGB 输入的 Franka pick-cube 策略可直接零样本部署。

训练配方通常包括 domain randomization 和 curriculum。四足/人形 locomotion 随机化传感器噪声、动力学参数、地形和扰动；LEAP Hand 随机化手部参数、方块质量和摩擦，并逐步增加噪声和动作正则；Franka 非抓取重定向加入随机延迟和目标范围课程。策略目标仍是标准 RL，例如 PPO：

$$
\max_\theta\ \mathbb{E}\left[
\min(r_t(\theta)\hat A_t,\operatorname{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat A_t)
\right]
$$

但环境采样由 MJX/JAX 大规模并行提供。

与 Isaac Gym/Isaac Lab 相比，MuJoCo Playground 的优势是开源、轻量、MuJoCo 资产兼容、安装和复现实验门槛低；不足是继承 JAX 静态形状限制，JIT 编译可能较慢，接触计算按 possible contacts 而非 active contacts 扩展，复杂可变接触场景还不如更灵活的 Warp/Taichi 类框架方便。

> 💡 关键：MuJoCo Playground 把“训练速度”变成 sim-to-real 研究体验的一部分，让奖励设计、随机化和真实部署能快速闭环。

#### 🧪 练习题
```yaml
question: "MuJoCo Playground 集成 Madrona batch renderer 的主要目的是什么？"
options:
  - "只用于离线生成论文插图"
  - "让像素观测、物理仿真和 RL 训练尽量保持在 GPU 端到端执行"
  - "替代 MuJoCo 的所有接触求解器"
  - "移除 domain randomization"
answer: 1
explain: "Madrona 提供 GPU 批渲染，使视觉策略可直接在仿真中高吞吐训练，并支持光照、材质、相机等视觉随机化。"
```

### Newton 1.0

```yaml
id: newton
num: 27
name: Newton 1.0
full_name: Newton 1.0新一代物理引擎 (Newton 1.0)
year: '2026.03'
org: NVIDIA
parent: isaac_sim
paper_url: https://nvidianews.nvidia.com/news/nvidia-cosmos-world-foundation-model-platform-physical-ai
project_url: ''
category: parallel
motivation: 大幅提升接触密集型任务的仿真稳定性
```

#### 📝 一句话总结
Newton 1.0 是面向机器人学习的开源 GPU 物理引擎，基于 NVIDIA Warp 与 OpenUSD，整合 MuJoCo Warp、Kamino、可变形体和高保真接触能力，重点解决接触密集操作和 locomotion 中速度、稳定性与可扩展性难以兼顾的问题。

#### 🎯 核心要点
- 清单中的 `paper_url` 是 NVIDIA 新闻稿，不是论文；以下基于 NVIDIA 开发者页、官方技术博客和 Newton GitHub/文档。
- Newton 由 NVIDIA、Google DeepMind、Disney Research 发起，并作为 Linux Foundation 项目开源治理。
- 底层基于 NVIDIA Warp 和 OpenUSD，强调 GPU 加速、可微分、可扩展、自定义 solver 与机器人资产互操作。
- 集成 MuJoCo Warp 作为关键刚体后端，并引入 Disney Research 的 Kamino 求解器处理闭链机构、被动驱动和复杂机械系统。
- 强化接触建模，包括 CAD mesh 碰撞、hydroelastic contact、SDF contact、触觉数据生成和接触密集插拔/抓取任务。
- 支持 deformable simulation：VBD 处理 cable/cloth/rubber，iMPM 处理颗粒材料，并可与 MuJoCo Warp 显式耦合。
- 与 Isaac Sim、Isaac Lab、MuJoCo Playground 等机器人学习框架衔接，面向并行训练、系统辨识和 sim-to-real。

#### 🔬 深入细节
![Newton 架构图](https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/newton-architecture.webp)
*图：Newton 官方技术博客中的架构图，展示其基于 Warp/OpenUSD，并连接 MuJoCo Warp、Kamino、Isaac Sim 和 Isaac Lab。*

> ⚠️ 依据限制：Newton 1.0 当前公开资料主要是新闻稿、官方博客、开发者页、GitHub 和文档，而非论文式方法报告。因此下面按平台设计和公开技术说明进行精读。

```python
# Newton / Isaac Lab 中接触密集机器人训练伪代码
world = load_openusd_scene("industrial_cell.usd")
robot = load_robot("allegro_hand_or_franka", format="USD/URDF/MJCF")

physics = NewtonEngine(
    backend="warp",
    rigid_solver="mujoco_warp",
    mechanism_solver="kamino",
    contact_model="hydroelastic_or_sdf",
    deformable_solvers=["vbd", "impm"],
)

envs = vectorize(world, robot, num_envs=4096)
for update in range(num_updates):
    for t in range(horizon):
        contact_state = physics.compute_contacts(envs)
        obs = build_obs(envs, contact_state, sensors=True)
        action = policy(obs)
        physics.step(envs, action, dt)
        reward = contact_rich_reward(envs)
    policy.update(ppo_loss(envs.rollout))

validate_in_isaac_sim(policy, high_fidelity_assets=True)
```

Newton 的背景是机器人仿真正从“刚体 locomotion 够快”走向“接触、软体、触觉、复杂机构都要稳定且可并行”。接触密集任务，例如灵巧手抓取、连接器插拔、螺栓装配、布料/线缆操作，对碰撞几何、摩擦、接触面建模和求解稳定性要求更高。传统点接触模型在这类场景中容易出现抖动、穿透或不稳定；CPU 高精度求解又很难支撑大规模 RL。

Newton 的基础层是 Warp。Warp 允许用 Python 写空间计算/仿真 kernel，并编译到 GPU 执行，因此适合把求解器、接触检测和传感器计算作为可扩展模块实现。OpenUSD 则承担场景和资产数据层，统一机器人、材质、碰撞、传感器、环境和工业 CAD/数字孪生资产。两者结合后，Newton 不只是一个 solver，而是一个可接入机器人学习栈的物理引擎框架。

MuJoCo Warp 是 Newton 的核心刚体后端之一。它把 MuJoCo 社区信任的刚体动力学与接触建模迁移到 GPU 规模，适合 thousands-of-envs 的训练场景。官方博客还强调 MuJoCo Warp 相对 MJX 在特定 locomotion/manipulation 工作负载上的速度提升。Kamino 则补上复杂机构能力，特别是闭链 linkage、被动关节、机械手和腿足系统中的结构约束，使机械设计不必为了“仿真好算”而简化过多真实结构。

接触建模是 Newton 1.0 的重点。Hydroelastic contact 用有限面积接触面上的连续压力分布替代少量点接触，更适合触觉、软接触和紧公差装配。SDF/CAD mesh 碰撞减少了把复杂几何粗糙近似成简单形状的需求。对于可变形体，VBD 覆盖线缆、布料和橡胶件，iMPM 覆盖颗粒材料；这些 solver 可与刚体后端显式耦合，支持“机器人 + 柔性物体 + 接触”的训练数据生成。

与 Isaac Gym 的关系可以理解为：Isaac Gym 开启了端到端 GPU RL；Isaac Sim/Isaac Lab 提供高保真工程环境；Newton 则把下一代物理求解器和 OpenUSD/Warp 插件化能力放进这个栈里。它不是单一算法，而是用于降低接触密集机器人任务 sim-to-real gap 的基础设施。

> 💡 关键：Newton 的价值在于把“高速并行”和“高保真接触/可变形/复杂机构”放到同一个可扩展物理引擎中，而不是只追求单一 FPS 指标。

#### 🧪 练习题
```yaml
question: "Newton 1.0 中 hydroelastic contact 的主要作用是什么？"
options:
  - "把所有接触简化成无摩擦点接触以提升速度"
  - "用有限面积上的连续压力分布提升软接触、触觉和紧公差操作的稳定性与真实性"
  - "只用于渲染材质，不参与物理求解"
  - "替代 OpenUSD 资产格式"
answer: 1
explain: "Hydroelastic contact 更适合接触密集 manipulation，因为它比少量点接触更能表达接触面和压力分布。"
```

### MO-Playground

```yaml
id: mo_playground
num: 28
name: MO-Playground
full_name: MO-Playground多目标强化学习平台 (MO-Playground)
year: '2026.03'
org: PKU
parent: isaac_gym
paper_url: https://arxiv.org/abs/2603.09237
project_url: ''
category: parallel
motivation: 针对多目标强化学习的大规模并行化平台
```

#### 📝 一句话总结
MO-Playground 提出 GPU 并行多目标强化学习框架 MORLAX 和一组多目标 MJX 环境，用偏好向量条件化 hypernetwork 连续近似 Pareto 策略族，解决传统 MORL 难以大规模并行、训练耗时过长的问题。

#### 🎯 核心要点
- 将单目标 MDP 扩展为 MOMDP，奖励为 \(R:S\times A\rightarrow\mathbb{R}^m\)，目标是学习 Pareto-optimal policy family。
- 提出 MORLAX：JAX/GPU-native 的多目标 actor-critic 算法，使用 actor hypernetwork 和 critic hypernetwork。
- 输入 trade-off vector \(w\in\Delta^{m-1}\)，输出对应偏好下的 actor/critic 参数，实现连续 Pareto set 表示。
- 在 rollout 时并行采样多个偏好向量，并把每个偏好对应策略分配到大量并行环境中采集数据。
- 使用多目标 PPO：对每个目标独立估计 GAE，再用 \(w^\top A_t\) 标量化优势函数更新 hypernetwork。
- 提供 Cheetah、Walker、Ant、Humanoid、Hopper 等多目标 MJX 环境，并支持 numpy/jax backend。
- 相比 CPU HYPER-MORL，论文报告 21-270x 速度提升和更高 Pareto front hypervolume；BRUCE 人形机器人 6 目标 locomotion 约 2 小时完成 Pareto set 训练。

#### 🔬 深入细节
![MORLAX 架构](https://arxiv.org/html/2603.09237v1/x1.png)
*图：MORLAX 选择 trade-off vector，经过 policy hypernetwork 生成策略，并通过并行 sample-rollout-update 学习 Pareto 策略族。*

```python
# MORLAX 训练伪代码
envs = make_mo_env(num_envs=N, reward_dim=m, backend="jax")
H_pi = ActorHyperNetwork()   # w -> actor parameters
H_v = CriticHyperNetwork()   # w -> vector-value critic parameters

for iteration in range(num_iterations):
    W = sample_dirichlet_tradeoffs(K, dim=m)      # K 个偏好向量
    W_rep = repeat_to_num_envs(W, N)              # 每个偏好跑多个环境

    rollout = []
    for env_i, w_i in zip(envs, W_rep):
        theta_i = H_pi(w_i)
        phi_i = H_v(w_i)
        traj = rollout_policy(env_i, theta_i, phi_i)
        rollout.append((traj, w_i))

    A_vec = generalized_advantage_estimation_per_objective(rollout)
    A_scalar = [w_i @ A_i for A_i, w_i in zip(A_vec, W_rep)]

    loss_actor = clipped_ppo_surrogate(H_pi, rollout, A_scalar)
    loss_critic = vector_value_loss(H_v, rollout)
    update(H_pi, loss_actor)
    update(H_v, loss_critic)
```

多目标强化学习的难点是：现实机器人目标很少能自然压成一个固定 reward。例如人形行走同时关心速度跟踪、能耗、平滑性、关节跟踪、手臂摆动和上肢稳定；不同用户或场景下这些目标权重不同。单目标 RL 只能在训练前写死一个权重，MORL 则希望训练后仍能调节偏好。

MOMDP 中策略的期望回报是向量：

$$
J^\pi=\mathbb{E}_{s_0\sim D_{s_0}}\left[V^\pi(s_0)\right]\in\mathbb{R}^m
$$

若策略 \(\pi'\) 在所有目标上不差于 \(\pi\)，且至少一个目标更好，则 \(\pi'\) Pareto dominates \(\pi\)。不被任何策略支配的策略组成 Pareto set，对应 objective space 中的 Pareto front。MORLAX 用线性标量化：

$$
w^\top R,\quad w\in\Delta^{m-1},\quad \sum_i w_i=1,\ w_i\ge 0
$$

把每个偏好方向转成一个可训练的 RL 目标。

MORLAX 的核心是 hypernetwork 表示。它不为每个 Pareto 策略单独训练一个网络，而是训练映射：

$$
H_\pi:\Delta^{m-1}\rightarrow\Theta_\pi,\qquad
H_V:\Delta^{m-1}\rightarrow\Theta_V
$$

给定偏好向量 \(w\)，actor hypernetwork 输出策略参数 \(\theta=H_\pi(w)\)，critic hypernetwork 输出向量价值网络参数 \(\phi=H_V(w)\)。论文采用低秩/仿射形式 \(H_\pi(w)=M_\pi f_\pi(w)+b_\pi\)，降低参数维度并提高连续 Pareto set 表达效率。

并行化是另一个关键。每轮先从 Dirichlet 分布采样 \(K\) 个 trade-off vectors，再复制到 \(N\) 个并行环境中；同一 \(w\) 可对应多个 stochastic rollout，提高估计稳定性。更新时对每个目标单独算 GAE 得到向量优势 \(A_t\in\mathbb{R}^m\)，再用 \(w^\top A_t\) 标量化进入 PPO 裁剪目标。这样既保留 PPO 的稳定性，又能让不同偏好方向共享 hypernetwork 参数。

相比 HYPER-MORL，MORLAX 的优势不只是“跑在 GPU 上”，还包括 actor/critic hypernetwork 分离更新、Dirichlet 偏好采样、无需 warm-up 以及对 MJX 环境的批量 rollout 支持。实验中，MORLAX 在五个多目标控制环境上获得更高 hypervolume，并在达到同等目标 hypervolume 的时间上快 21-270x。

> ⚠️ 注意：线性标量化主要发现凸 Pareto front；若真实 Pareto front 有明显凹段，MORLAX 仍可能漏掉一部分非凸权衡。

#### 🧪 练习题
```yaml
question: "MORLAX 中 trade-off vector w 的作用是什么？"
options:
  - "表示机器人观测向量"
  - "表示不同目标的偏好权重，用于从 hypernetwork 生成对应策略并标量化优势函数"
  - "表示环境随机种子"
  - "只用于初始化网络权重，训练后不再使用"
answer: 1
explain: "w 位于目标权重 simplex 上，指定当前优化方向；MORLAX 根据 w 输出策略，并用 wᵀA 更新。"
```

### Genesis

```yaml
id: genesis
num: 29
name: Genesis
full_name: Genesis通用生成式物理引擎 (Genesis)
year: '2024.12'
org: CMU/MIT
parent: —
paper_url: https://arxiv.org/abs/2412.17492
project_url: ''
category: generative
motivation: 统一物理求解+生成式场景构建，43M FPS
```

#### 📝 一句话总结
Genesis 是面向 Physical AI 的通用仿真平台，尝试把统一多物理求解、照片级渲染、跨平台编译和 Pythonic 机器人学习接口放到一个栈中，解决传统仿真器在多物理、可扩展性和场景构建上的割裂问题。

#### 🎯 核心要点
- 清单中的 arXiv:2412.17492 当前解析为一篇 k-mer/minimizer 理论论文，并非 Genesis；以下基于 Genesis World 官方 README、文档和公开项目资料。
- Genesis World 由四层组成：Simulation Interface、Physics、Render、Compiler，上层可接机器人环境、ML pipeline、数据生成和 agentic simulation。
- Physics 层整合 Rigid、FEM、MPM、PBD/SPH particle、uipc、显式 coupler、SAP 等多求解器，共享统一 scene 和 state。
- Render 层提供 Nyx、Luisa、Pyrender 等路径，面向机器人相机传感器和照片级渲染。
- Compiler 层 Quadrants 将 Python kernel 降到 CUDA、AMD ROCm、Apple Metal、Vulkan、x86、ARM64 等后端。
- Interface 层支持 URDF、MJCF、OBJ、GLB、USD 等资产，提供控制器、传感器、并行/异构环境、GUI、domain randomization。
- YAML 中的 43M FPS 是该项目公开宣传和元信息中的高吞吐指标；由于给定 paper_url 不对应技术报告，本文不把它当作论文实验表逐项复述。

#### 🔬 深入细节
![Genesis World 技术栈](https://raw.githubusercontent.com/YilingQiao/Genesis/readme-assets/videos/diagram_white_lum.png)
*图：Genesis World README 中的技术栈示意，展示接口、物理、渲染和编译四层如何支撑机器人环境与数据生成。*

> ⚠️ 依据限制：`paper_url` 指向的 arXiv 页面不是 Genesis 论文；公开资料以官方仓库/文档为主，且项目在 2026 年资料中已称为 Genesis World。YAML 元信息按清单原样保留。

```python
# Genesis World 多物理仿真伪代码
import genesis as gs

gs.init(backend=gs.gpu)
scene = gs.Scene(
    sim_options=gs.options.SimOptions(dt=0.01),
    renderer=gs.renderers.NyxRenderer(),
)

robot = scene.add_entity(gs.morphs.URDF(file="franka.urdf"))
cloth = scene.add_entity(gs.morphs.Mesh(file="towel.obj"), solver="pbd")
fluid = scene.add_entity(gs.morphs.Particles(file="water"), solver="sph")
rigid_object = scene.add_entity(gs.morphs.MJCF(file="cube.xml"), solver="rigid")

scene.build(n_envs=4096)
for step in range(horizon):
    action = policy(scene.get_state_tensor())
    robot.control(action)
    scene.step()  # rigid/FEM/MPM/PBD/SPH 通过 coupler 显式交互
    obs = scene.render_cameras()
    reward = compute_reward(scene)
```

Genesis 的设计动机是把机器人仿真中经常分散的能力统一起来。MuJoCo 擅长刚体和机器人控制，Isaac 系列擅长 GPU 并行和工业资产，SAPIEN/Omniverse 在视觉和关节对象上有优势，但真实 embodied AI 任务经常同时需要刚体、软体、颗粒、流体、布料、触觉、照片级渲染和大规模并行。Genesis 把这些能力组织成统一 scene/state，再通过 coupler 处理多 solver 之间的交互。

Physics 层是 Genesis 的核心。Rigid solver 负责机器人和刚体接触；FEM 适合弹性体；MPM 适合沙、水泥、可塑材料等连续介质；PBD/SPH 适合布料、液体或粒子；uipc/IPC 和 SAP 处理更复杂的接触和耦合。传统做法往往需要在不同引擎之间切换，Genesis 的目标是让这些对象同处一个场景，并可在同一仿真循环中交互。

Compiler 层 Quadrants 的意义在于跨硬件可移植和高性能。它将 Python kernel 降到 CUDA、ROCm、Metal、Vulkan、x86、ARM64 等后端，同时承载 autodiff、GPU graph 和 fastcache 机制。对研究者来说，这意味着可以用相对 Pythonic 的方式写仿真逻辑，又不完全牺牲底层并行性能。

Render 层则服务于视觉和数字孪生。Genesis README 描述了 Nyx、Luisa、Pyrender 三条相机渲染路径，包含 PBR、3D Gaussian Splatting、object picking、多相机多环境等能力。对于 VLA 或视觉策略训练，渲染不是装饰，而是观测生成的一部分；渲染质量和速度直接影响 sim-to-real。

生成式属性主要体现在资产、场景和数据构建方向，而非传统意义上的“一个神经网络生成物理”。Genesis 公开生态强调仿真平台可嵌入数据生成、机器人环境和 agentic simulation，并支持多种资产格式和程序化/异构环境。与 EmbodiedGen 这类专门生成 URDF/3DGS/场景资产的系统结合时，Genesis 更像高吞吐物理执行和渲染底座。

> 💡 关键：Genesis 的目标不是只替代 MuJoCo 或 Isaac，而是把多物理求解、渲染、编译和机器人接口统一成一个可扩展 Physical AI 仿真栈。

#### 🧪 练习题
```yaml
question: "Genesis World 的多物理统一设计主要解决什么问题？"
options:
  - "只能模拟单个刚体方块，避免复杂接触"
  - "让刚体、FEM、MPM、PBD/SPH 等不同物理对象共享同一 scene/state 并可耦合交互"
  - "用纯文本替代所有 3D 资产"
  - "只提供网页可视化，不参与策略训练"
answer: 1
explain: "Genesis 的 Physics 层整合多个 solver，并通过统一状态和 coupler 支持机器人、软体、颗粒、流体等对象共同仿真。"
```

### EmbodiedGen

```yaml
id: embodied_gen
num: 30
name: EmbodiedGen
full_name: EmbodiedGen生成式3D世界引擎 (EmbodiedGen)
year: '2025.06'
org: ByteDance
parent: genesis
paper_url: https://arxiv.org/abs/2506.10600
project_url: ''
category: generative
motivation: 从单张图片或文本生成交互式3D世界
```

#### 📝 一句话总结
EmbodiedGen 提出面向具身智能的生成式 3D 世界工具包，从图像或文本生成带真实尺度、物理属性、URDF、mesh/3DGS 表示和场景布局的交互式资产，解决传统 3D 资产昂贵、缺物理语义、难直接进仿真的问题。

#### 🎯 核心要点
- 论文公开作者单位主要为 Horizon Robotics、GigaAI、SJTU 等；YAML 中 `org: ByteDance` 按清单原样保留。
- 包含六个模块：Image-to-3D、Text-to-3D、Texture Generation、Articulated Object Generation、Scene Generation、Layout Generation。
- Image-to-3D 从单图生成 mesh 与 3DGS，再进行质量检查、物理属性恢复、真实尺度估计和 URDF 转换。
- Text-to-3D 采用 text-to-image → image-to-3D 两阶段设计，便于在 2D 阶段提前过滤语义/分割失败样本。
- Texture Generation 使用 GeoLifter 将几何条件注入扩散模型，生成多视角一致、可控风格的 2K UV 纹理。
- Articulated Object Generation 使用 dual-state image pair 与图推理生成关节对象结构，支持抽屉、柜门、家电等可操作资产。
- Scene Generation 从文本或图像生成 panorama，再恢复 mesh/3DGS、尺度和坐标，用于构建可交互 3D 场景。
- RoboSplatter 将 3DGS 渲染接入 MuJoCo/Isaac Lab 等物理仿真，提高视觉真实感。

#### 🔬 深入细节
![EmbodiedGen 框架图](https://arxiv.org/html/2506.10600v1/x2.png)
*图：EmbodiedGen 可从真实图像创建 digital twin，也可从任务描述自动生成场景布局、3D 物体资产和可交互世界。*

```python
# EmbodiedGen 从文本/图像到仿真资产的伪代码
def generate_asset(input):
    if input.type == "image":
        mesh, gs = trellis_image_to_3d(input.image)
    else:
        image = text_to_image(input.prompt)
        if not semantic_and_segmentation_check(image):
            image = retry_text_to_image(input.prompt)
        mesh, gs = trellis_image_to_3d(image)

    if not quality_check(mesh, image, checks=["aesthetic", "segmentation", "geometry"]):
        return regenerate_with_new_seed(input)

    scale = physics_expert.estimate_real_scale(mesh, context=input.context)
    mass, friction, category = physics_expert.estimate_physical_properties(mesh)
    texture = geolifter_texture(mesh, prompt=input.texture_prompt)
    urdf = convert_to_urdf(mesh, texture, scale, mass, friction)
    return {"mesh": mesh, "3dgs": gs, "urdf": urdf}

scene = generate_scene(prompt_or_image)
assets = [generate_asset(obj) for obj in scene.objects]
export_to_simulator(scene, assets, target=["MuJoCo", "IsaacLab", "SAPIEN"])
```

EmbodiedGen 的动机是具身智能数据很难像互联网文本/图像那样无成本扩展。机器人需要与物体接触、碰撞、抓取和导航，因此 3D 资产不仅要好看，还要有真实尺度、闭合几何、质量、摩擦、关节结构和仿真器可读格式。许多图形学 3D 资产缺少这些属性，直接导入仿真会导致碰撞不准、物体漂浮、尺度错误或无法交互。

Image-to-3D 模块以 Trellis 等开源 3D 生成模型为基础，生成 mesh 和 3DGS 双表示。EmbodiedGen 在其后增加 robotics-specific 后处理：AestheticChecker 检查纹理质量，ImageSegChecker 检查前景分割，MeshGeoChecker 检查几何完整性和合理性；失败样本会调整设置和 seed 后重试。通过 GPT-4o/Qwen 构建的 physics expert agent 估计真实高度、质量、摩擦系数和类别，并把资产转换成 URDF。

Text-to-3D 采用两阶段路线，而不是端到端直接文本生成 3D。先 text-to-image，再复用统一 Image-to-3D 服务。这样可以在 2D 阶段用质量检查提前淘汰语义不符或分割困难样本，减少昂贵 3D 生成浪费，也让系统能持续受益于新的 text-to-image 和 image-to-3D 模型。

纹理生成模块 GeoLifter 将 normal map、position map、mask 等几何条件注入文本到图像扩散模型，生成六视角一致纹理。随后使用去光照和超分辨率，再通过多视角 back-projection 合成 UV map。论文中的纹理融合可以概括为对每个视角按法线朝向、边缘遮挡和视角置信度加权：

$$
T(u,v)=\frac{\sum_i C_i(u,v) I_i(u,v)}{\sum_i C_i(u,v)+\epsilon}
$$

其中 \(C_i\) 包含可见性、法线夹角、边缘过滤和视角权重。

Articulated Object Generation 解决柜门、抽屉、家电等可动对象。论文使用 DIPO，从 resting/open 双状态图像对中推断部件、连接关系和运动结构，并用 chain-of-thought 图推理生成 articulation graph。Scene Generation 则从文本或图像得到 panorama，再用 Pano2Room 风格流程恢复 mesh/3DGS，经过 PanoSelector、inpainting、mesh repair、super-resolution、scale alignment，得到尺度一致的场景背景。

与 Genesis 的关系可以理解为：EmbodiedGen 更偏“生成仿真资产和世界”，Genesis 更偏“执行多物理仿真和渲染”。EmbodiedGen 输出的 URDF/mesh/3DGS 资产可导入 MuJoCo、Isaac Lab、OpenAI Gym、SAPIEN 等平台；若与 Genesis/Isaac/MuJoCo 这类高吞吐仿真器结合，就能形成从文本/单图到交互式仿真任务的数据生成闭环。

> 💡 关键：EmbodiedGen 的真正贡献不是单纯 3D 生成，而是把生成结果补齐成“可仿真、可交互、带物理属性和真实尺度”的机器人资产。

#### 🧪 练习题
```yaml
question: "EmbodiedGen 为什么要把生成资产转换为 URDF 并恢复真实尺度和物理属性？"
options:
  - "为了让资产只适合静态图片展示"
  - "为了让生成的 3D 物体能直接进入物理仿真器进行碰撞、控制和任务评估"
  - "为了删除 mesh 和 3DGS 表示"
  - "为了避免任何质量检查"
answer: 1
explain: "机器人仿真需要尺度、质量、摩擦、碰撞几何和关节等信息；URDF/物理属性使生成资产可交互、可训练、可评估。"
```

### GS-Playground

```yaml
id: gs_playground
num: 31
name: GS-Playground
full_name: GS-Playground高通量光真实仿真器 (GS-Playground)
year: '2026.04'
org: THU
parent: genesis
paper_url: https://arxiv.org/abs/2604.25459
project_url: ''
category: generative
motivation: 引入3DGS技术，10k+ FPS超高性能渲染
```

#### 📝 一句话总结
GS-Playground 提出了一个把自研并行物理引擎、Batch 3D Gaussian Splatting 渲染器和自动 Image-to-Physics 资产流程合在一起的光真实仿真框架，解决视觉机器人学习中高保真渲染太慢、真实场景难以变成可交互资产的问题。它在 \(640\times480\) 分辨率下达到约 \(10^4\) FPS，并支持大规模视觉强化学习和 Sim2Real。

#### 🎯 核心要点
- **三层系统架构**：并行物理引擎、内存高效 Batch-3DGS 渲染器、自动 Real2Sim 资产生成流程
- **速度-冲量物理求解器**：用广义坐标下的 velocity-impulse formulation、严格互补条件和摩擦速度钳制提升接触稳定性
- **大规模接触优化**：通过 Constraint Islands 并行求解独立约束图，并用上一帧冲量 warm start 降低 PGS 迭代次数
- **Batch-3DGS 渲染**：对 3D Gaussian 做超过 90% 的点裁剪，保持极小 PSNR 损失，同时支持 2048 个并行场景和约 10,000 FPS
- **RLGK 同步机制**：Rigid-Link Gaussian Kinematics 将 Gaussian 簇绑定到刚体，使物理姿态变化以批量 GPU 变换同步到渲染表示
- **Image-to-Physics 流程**：Grounding DINO + SAM/SAM2 分割，LaMa 补全背景，SAM-3D 重建物体 3DGS/mesh，AnySplat 重建背景 3DGS
- **多模态和生态兼容**：提供 RGB、深度、LiDAR、接触力/力矩等传感器，兼容 MuJoCo MJCF，支持 Windows/Linux/macOS 原型开发
- **下游验证广泛**：覆盖四足/人形运动、视觉导航、机械臂抓取等任务，并展示零样本真实机器人部署能力

#### 🔬 深入细节
![GS-Playground 系统架构图](https://arxiv.org/html/2604.25459v1/x1.png)
*图：GS-Playground 的系统架构。左侧是从真实 RGB 图像生成可仿真资产的 Image-to-Physics 流程，中间是物理与 Batch-3DGS 渲染核心，右侧是大规模 RL、操作和导航应用。*

```python
# GS-Playground 中 Batched RLGK 与视觉 RL 的核心流程伪代码
template_gaussians = load_pruned_3dgs_scene()
index_map = assign_each_gaussian_to_rigid_body(template_gaussians)
local_pose = store_local_pose_in_body_frame(template_gaussians)

envs = create_parallel_envs(B=2048, assets=template_gaussians)
policy = init_policy()

for step in range(num_steps):
    actions = policy(observations)

    # 1. 物理引擎推进所有并行环境，输出每个刚体的位姿
    body_states = physics.step(actions)  # shape: [B, N_bodies, 7]

    # 2. RLGK 批量收集每个 Gaussian 绑定的刚体位姿
    linked_states = gather(body_states, index_map)  # [B, M, 7]
    p_world = transform(local_pose.position, linked_states.position, linked_states.rotation)
    q_world = linked_states.rotation * local_pose.rotation

    # 3. Batch-3DGS 渲染 RGB/Depth，并和 LiDAR/接触传感器组成观测
    rgb, depth = batch_3dgs_render(p_world, q_world)
    lidar, contacts = sensors.read(body_states)
    observations = build_observation(rgb, depth, lidar, contacts)

    # 4. 用 PPO 或模仿学习更新视觉策略
    policy.update(observations, rewards, dones)
```

**动机与背景：视觉 RL 卡在“真实”和“高吞吐”之间**

大规模并行仿真已经让四足、人形和灵巧操作的强化学习能够收集海量样本，但这些成功大多依赖本体状态、低维状态或简化几何。视觉策略需要高保真 RGB/Depth 反馈，一旦把光线追踪或复杂材质渲染接到上千个并行环境中，显存和算力会快速成为瓶颈。另一侧的问题是资产构建：真实场景要变成既能渲染又能碰撞的数字孪生，通常需要人工建模、碰撞体简化、材质调参和姿态对齐。

GS-Playground 的核心判断是：机器人学习不一定需要传统路径追踪式渲染，但需要足够真实、足够快、和物理状态严格同步的视觉反馈。因此它用 3D Gaussian Splatting 作为视觉表示，用自研物理引擎提供稳定接触，用 RLGK 把低维刚体位姿映射到百万级 Gaussian，并用自动 Real2Sim 流程降低资产制作成本。

**物理求解：用速度-冲量和互补条件处理硬接触**

论文中的离散动力学写成：

$$
\mathbf{M}(\mathbf{v}^+ - \mathbf{v}) =
\mathbf{J}_e^T \boldsymbol{\lambda}_e^+
+ \mathbf{J}_n^T \boldsymbol{\lambda}_n^+
+ h(\boldsymbol{\tau}_{ext} - \mathbf{c})
$$

其中 \(\mathbf{M}\) 是质量矩阵，\(\mathbf{v}\) 和 \(\mathbf{v}^+\) 是步进前后的广义速度，\(\mathbf{J}_e\) 与 \(\mathbf{J}_n\) 分别对应等式约束和不等式接触约束，\(\boldsymbol{\lambda}\) 是约束冲量。直觉上，求解器不是先算“柔软穿透后再修正”，而是在速度层面直接解出能满足接触、摩擦和关节约束的冲量，因此更适合堆叠、抓取、碰撞等接触密集任务。

为了兼容软约束，论文把隐式冲量关系线性化，并得到标准 compliance 形式：

$$
\mathbf{u}^+ = -\mathbf{C}\boldsymbol{\lambda}^+ + \boldsymbol{\zeta}
$$

随后通过 Schur complement 消去等式约束，把问题化成不等式约束上的线性系统：

$$
\mathbf{u}_n^+ = \mathbf{A}\boldsymbol{\lambda}_n^+ + \mathbf{b}
$$

接触和摩擦被建模成 Mixed Complementarity Problem。对第 \(i\) 个约束分量，求解结果要满足：

$$
\begin{cases}
w_i \ge 0, & \lambda_i^+ = l_i \\
w_i = 0, & l_i < \lambda_i^+ < u_i \\
w_i \le 0, & \lambda_i^+ = u_i
\end{cases}
$$

法向接触的边界是 \([0,\infty)\)，摩擦边界是 \([-\mu\lambda_{\perp}^+,\mu\lambda_{\perp}^+]\)。这使系统可以表达“接触力不能拉开物体”“摩擦冲量不能超过库仑锥”等物理限制。实际求解时使用 Projected Gauss-Seidel，并加入两个工程优化：先把互不相关的刚体约束图切成 Constraint Islands 并行求解，再用上一帧收敛的 \(\lambda_{t-1}\) 作为当前初值，利用时间连续性减少迭代。

**Batch-3DGS 与 RLGK：让渲染跟着物理刚体同步动**

3DGS 的每个 Gaussian 可理解为一个带位置、方向、尺度、透明度和颜色的小椭球。普通 3DGS 适合重建与新视角渲染，但直接把每个并行环境都复制一份百万级点云会造成巨大显存压力。GS-Playground 先用点裁剪保留对策略有用的视觉结构，静态场景可只保留约 30% 的 Gaussian，动态物体和机器人还可更激进地裁剪，同时维持较小视觉质量损失。

RLGK 解决的是动态一致性问题。初始化时，系统只上传一份模板 Gaussian，并记录每个 \(g_i\) 绑定的刚体索引 \(k_i\) 以及它在该刚体坐标系下的局部位姿。运行时物理引擎输出批量刚体状态 \(\mathbf{S}_t \in \mathbb{R}^{B \times N_{bodies} \times 7}\)，RLGK 对所有并行环境和所有 Gaussian 做一次 batched gather 与刚体变换：

$$
p_{world}^{(j,i)} = R(q_{k_i}^{(j,t)})p_{local}^i + t_{k_i}^{(j,t)}
$$

$$
q_{world}^{(j,i)} = q_{k_i}^{(j,t)} \otimes q_{local}^i
$$

这里 \(j\) 是第 \(j\) 个并行环境，\(i\) 是第 \(i\) 个 Gaussian，\(R(q)\) 是由四元数得到的旋转矩阵。这个设计把高维视觉状态更新降维成“模板点云 + 刚体位姿广播”，避免为每个环境维护完整独立点云，因此能把 2048 个场景同时送入 Batch-3DGS 渲染。

**Image-to-Physics：从一张 RGB 图像到可交互数字孪生**

资产流程从单张 RGB 图像开始。系统先用 Grounding DINO 检测目标，用 SAM1/SAM2 生成实例 mask，并通过 mask IoU、包含关系和边界重叠去重，避免开放词汇检测中的重复实例。被遮挡区域通过“扩张 mask、逐个移除、重新检测、LaMa 补全背景”的循环逐步恢复，这一步的目标不是只生成好看的图片，而是把前景物体和背景场景拆开，便于分别生成可交互资产。

对象级资产由 SAM-3D 根据原图和 \(M_{obj}\) 重建 3DGS、mesh、姿态和尺度；背景级资产由 AnySplat 根据补全后的背景生成 3DGS、深度图 \(D_{bg}\)、相机内外参。对齐时，系统先让对象渲染深度 \(D_{obj}\) 与背景深度 \(D_{bg}\) 对齐，再按对象渲染 mask 和原始 \(M_{obj}\) 的像素面积匹配尺度，最后用 SpeedySplat 类裁剪进一步降低显存占用。结果是一个既能渲染真实外观，又能给物理引擎提供碰撞和刚体状态的 sim-ready 场景。

**训练和推理流程：视觉观测闭环进入策略学习**

在训练中，物理引擎先根据动作推进所有环境，RLGK 把刚体状态同步到 3DGS 表示，Batch Renderer 输出 RGB 和深度，LiDAR 与接触传感器输出点云、力和力矩。这些模态共同组成策略观测，可以接 PPO 的 actor-critic，也可以接模仿学习策略。论文在四足 Go2、人形 G1、视觉导航和 Airbot Play 抓取上验证了这条流程：Go2 可用 1024 并行环境在约 10 分钟收敛，人形用 2048 并行环境训练，机械臂 RGB 策略在真实抓取中展示 90% 零样本成功率。

**与传统仿真的区别**

相比 MuJoCo、IsaacLab、Genesis 这类以物理吞吐为中心的仿真器，GS-Playground 的重点是把大规模物理采样和光真实视觉同时放进同一个闭环。相比昂贵的 ray tracing 渲染，它用 3DGS 换取更高吞吐；相比只做静态 3DGS 重建的 Real2Sim 工作，它通过 RLGK、mesh/pose 对齐和物理求解让资产真正参与接触与控制；相比只面向低维状态的并行 RL，它让视觉编码器直接在仿真中获得高保真训练数据。

> 💡 关键：GS-Playground 的创新不是单独“把 3DGS 放进仿真器”，而是把资产生成、刚体物理、Gaussian 同步和批量渲染做成一个可训练视觉策略的高吞吐闭环。

> ⚠️ 注意：论文也指出 3DGS 对随机光照和阴影处理仍有限，当前 RLGK 假设物体是刚体；布料、流体和软体操作仍需要后续扩展。

#### 🧪 练习题
```yaml
question: "GS-Playground 中 RLGK 的主要作用是什么？"
options:
  - "用语言模型自动生成强化学习奖励函数"
  - "把 3D Gaussian 簇绑定到物理刚体，并用批量刚体变换同步动态渲染状态"
  - "用光线追踪替代所有 Gaussian Splatting 渲染"
  - "只负责把 MJCF 文件转换成 URDF 文件"
answer: 1
explain: "RLGK 记录每个 Gaussian 在刚体坐标系下的局部位姿，运行时根据批量刚体状态更新全局位置和旋转，从而让渲染与物理运动保持同步。"
```
