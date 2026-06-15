### robosuite — robosuite模块化机器人学习框架 (robosuite)

```yaml
id: robosuite
name: robosuite
full_name: robosuite模块化机器人学习框架 (robosuite)
year: "2020"
org: Stanford
paper_url: https://arxiv.org/abs/2009.12293
category: benchmark
parent: mujoco
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
