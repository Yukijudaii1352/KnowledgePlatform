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

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

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
Gazebo 的核心目标是：开启开源3D多机器人仿真时代，ROS深度集成。

#### 🎯 核心要点
- 核心动机：开启开源3D多机器人仿真时代，ROS深度集成
- 代表机构：OSF

#### 🔬 深入细节
开启开源3D多机器人仿真时代，ROS深度集成


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
MuJoCo 的核心目标是：奠定模型预测控制与接触动力学仿真基础。

#### 🎯 核心要点
- 核心动机：奠定模型预测控制与接触动力学仿真基础
- 代表机构：UW/DeepMind

#### 🔬 深入细节
奠定模型预测控制与接触动力学仿真基础


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
CoppeliaSim 的核心目标是：分布式控制架构，支持多种物理引擎集成。

#### 🎯 核心要点
- 核心动机：分布式控制架构，支持多种物理引擎集成
- 代表机构：Coppelia

#### 🔬 深入细节
分布式控制架构，支持多种物理引擎集成


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
PyBullet 的核心目标是：开源轻量级物理引擎，广泛用于Sim2Real。

#### 🎯 核心要点
- 核心动机：开源轻量级物理引擎，广泛用于Sim2Real
- 代表机构：Bullet

#### 🔬 深入细节
开源轻量级物理引擎，广泛用于Sim2Real


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
DM Control 的核心目标是：标准化连续控制基准，统一奖励结构。

#### 🎯 核心要点
- 核心动机：标准化连续控制基准，统一奖励结构
- 演化来源：继承或改进自 mujoco
- 代表机构：DeepMind

#### 🔬 深入细节
标准化连续控制基准，统一奖励结构


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
Brax 的核心目标是：JAX原生可微分引擎，支持梯度优化策略。

#### 🎯 核心要点
- 核心动机：JAX原生可微分引擎，支持梯度优化策略
- 演化来源：继承或改进自 mujoco
- 代表机构：Google

#### 🔬 深入细节
JAX原生可微分引擎，支持梯度优化策略


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
AI2-THOR 的核心目标是：具身智能从静态数据转向交互式环境。

#### 🎯 核心要点
- 核心动机：具身智能从静态数据转向交互式环境
- 代表机构：Allen AI

#### 🔬 深入细节
具身智能从静态数据转向交互式环境


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
VirtualHome 的核心目标是：将家庭活动表示为可执行程序，训练逻辑理解。

#### 🎯 核心要点
- 核心动机：将家庭活动表示为可执行程序，训练逻辑理解
- 代表机构：MIT

#### 🔬 深入细节
将家庭活动表示为可执行程序，训练逻辑理解


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
Habitat 1.0 的核心目标是：实现万帧级超高速渲染，加速大规模RL。

#### 🎯 核心要点
- 核心动机：实现万帧级超高速渲染，加速大规模RL
- 代表机构：Meta AI

#### 🔬 深入细节
实现万帧级超高速渲染，加速大规模RL


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
SAPIEN 的核心目标是：专注关节物体交互，提供精细部件数据集。

#### 🎯 核心要点
- 核心动机：专注关节物体交互，提供精细部件数据集
- 代表机构：UCSD

#### 🔬 深入细节
专注关节物体交互，提供精细部件数据集


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
iGibson 的核心目标是：以物体为中心的仿真，支持大规模家务任务。

#### 🎯 核心要点
- 核心动机：以物体为中心的仿真，支持大规模家务任务
- 代表机构：Stanford

#### 🔬 深入细节
以物体为中心的仿真，支持大规模家务任务


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
ThreeDWorld 的核心目标是：多模态平台，支持视觉与物理音频同步模拟。

#### 🎯 核心要点
- 核心动机：多模态平台，支持视觉与物理音频同步模拟
- 代表机构：MIT-IBM

#### 🔬 深入细节
多模态平台，支持视觉与物理音频同步模拟


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
ProcTHOR 的核心目标是：实现一万个室内房屋场景的程序化自动生成。

#### 🎯 核心要点
- 核心动机：实现一万个室内房屋场景的程序化自动生成
- 演化来源：继承或改进自 ai2thor
- 代表机构：Allen AI

#### 🔬 深入细节
实现一万个室内房屋场景的程序化自动生成


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
OmniGibson 的核心目标是：结合Omniverse光追渲染，支持千种家务活动。

#### 🎯 核心要点
- 核心动机：结合Omniverse光追渲染，支持千种家务活动
- 演化来源：继承或改进自 igibson
- 代表机构：Stanford

#### 🔬 深入细节
结合Omniverse光追渲染，支持千种家务活动


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
Habitat 3.0 的核心目标是：从静态导航演进至社交人机协作。

#### 🎯 核心要点
- 核心动机：从静态导航演进至社交人机协作
- 演化来源：继承或改进自 habitat
- 代表机构：Meta AI

#### 🔬 深入细节
从静态导航演进至社交人机协作


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
robosuite 的核心目标是：模块化机器人学习框架，支持多种控制器。

#### 🎯 核心要点
- 核心动机：模块化机器人学习框架，支持多种控制器
- 演化来源：继承或改进自 mujoco
- 代表机构：Stanford

#### 🔬 深入细节
模块化机器人学习框架，支持多种控制器


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
RLBench 的核心目标是：提供100个手工任务，支持少样本学习测试。

#### 🎯 核心要点
- 核心动机：提供100个手工任务，支持少样本学习测试
- 演化来源：继承或改进自 vrep
- 代表机构：Imperial

#### 🔬 深入细节
提供100个手工任务，支持少样本学习测试


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
MetaWorld 的核心目标是：50个操作任务，评估元学习与多任务泛化。

#### 🎯 核心要点
- 核心动机：50个操作任务，评估元学习与多任务泛化
- 演化来源：继承或改进自 mujoco
- 代表机构：Berkeley

#### 🔬 深入细节
50个操作任务，评估元学习与多任务泛化


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
CALVIN 的核心目标是：语言条件长程操作，评估零样本指令泛化。

#### 🎯 核心要点
- 核心动机：语言条件长程操作，评估零样本指令泛化
- 代表机构：Freiburg

#### 🔬 深入细节
语言条件长程操作，评估零样本指令泛化


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
ManiSkill3 的核心目标是：关节物体引擎支撑大规模并行操作基准。

#### 🎯 核心要点
- 核心动机：关节物体引擎支撑大规模并行操作基准
- 演化来源：继承或改进自 sapien
- 代表机构：UCSD

#### 🔬 深入细节
关节物体引擎支撑大规模并行操作基准


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
RoboCasa 的核心目标是：构建大规模家庭任务仿真，扩展环境多样性。

#### 🎯 核心要点
- 核心动机：构建大规模家庭任务仿真，扩展环境多样性
- 演化来源：继承或改进自 robosuite
- 代表机构：UT Austin

#### 🔬 深入细节
构建大规模家庭任务仿真，扩展环境多样性


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
Embodied Arena 的核心目标是：统一评估平台，覆盖30+模型在22个基准。

#### 🎯 核心要点
- 核心动机：统一评估平台，覆盖30+模型在22个基准
- 代表机构：Community

#### 🔬 深入细节
统一评估平台，覆盖30+模型在22个基准


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
RBench 的核心目标是：针对视频生成模型的物理真实性评估基准。

#### 🎯 核心要点
- 核心动机：针对视频生成模型的物理真实性评估基准
- 代表机构：THU

#### 🔬 深入细节
针对视频生成模型的物理真实性评估基准


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
Isaac Gym 的核心目标是：开创GPU全并行仿真范式，效率提升数千倍。

#### 🎯 核心要点
- 核心动机：开创GPU全并行仿真范式，效率提升数千倍
- 代表机构：NVIDIA

#### 🔬 深入细节
开创GPU全并行仿真范式，效率提升数千倍


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
Isaac Sim 的核心目标是：从纯并行训练演进至高保真工业仿真。

#### 🎯 核心要点
- 核心动机：从纯并行训练演进至高保真工业仿真
- 演化来源：继承或改进自 isaac_gym
- 代表机构：NVIDIA

#### 🔬 深入细节
从纯并行训练演进至高保真工业仿真


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
MuJoCo Playground 的核心目标是：高速Sim2Real框架，分钟级完成策略训练。

#### 🎯 核心要点
- 核心动机：高速Sim2Real框架，分钟级完成策略训练
- 演化来源：继承或改进自 mujoco
- 代表机构：DeepMind

#### 🔬 深入细节
高速Sim2Real框架，分钟级完成策略训练


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
Newton 1.0 的核心目标是：大幅提升接触密集型任务的仿真稳定性。

#### 🎯 核心要点
- 核心动机：大幅提升接触密集型任务的仿真稳定性
- 演化来源：继承或改进自 isaac_sim
- 代表机构：NVIDIA

#### 🔬 深入细节
大幅提升接触密集型任务的仿真稳定性


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
MO-Playground 的核心目标是：针对多目标强化学习的大规模并行化平台。

#### 🎯 核心要点
- 核心动机：针对多目标强化学习的大规模并行化平台
- 演化来源：继承或改进自 isaac_gym
- 代表机构：PKU

#### 🔬 深入细节
针对多目标强化学习的大规模并行化平台


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
Genesis 的核心目标是：统一物理求解+生成式场景构建，43M FPS。

#### 🎯 核心要点
- 核心动机：统一物理求解+生成式场景构建，43M FPS
- 代表机构：CMU/MIT

#### 🔬 深入细节
统一物理求解+生成式场景构建，43M FPS


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
EmbodiedGen 的核心目标是：从单张图片或文本生成交互式3D世界。

#### 🎯 核心要点
- 核心动机：从单张图片或文本生成交互式3D世界
- 演化来源：继承或改进自 genesis
- 代表机构：ByteDance

#### 🔬 深入细节
从单张图片或文本生成交互式3D世界


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
GS-Playground 的核心目标是：引入3DGS技术，10k+ FPS超高性能渲染。

#### 🎯 核心要点
- 核心动机：引入3DGS技术，10k+ FPS超高性能渲染
- 演化来源：继承或改进自 genesis
- 代表机构：THU

#### 🔬 深入细节
引入3DGS技术，10k+ FPS超高性能渲染
