### PyBullet

```yaml
id: pybullet
name: "PyBullet"
full_name: "PyBullet物理引擎 (PyBullet Physics Engine)"
year: "2016"
org: "Bullet"
paper_url: "https://pybullet.org/"
category: "foundation"
parent: "—"
motivation: "开源轻量级物理引擎，广泛用于Sim2Real"
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
