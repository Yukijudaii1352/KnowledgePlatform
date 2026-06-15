### MuJoCo

```yaml
id: mujoco
name: "MuJoCo"
full_name: "多关节接触动力学引擎 (Multi-Joint dynamics with Contact)"
year: "2012"
org: "UW/DeepMind"
paper_url: "https://mujoco.org/"
category: "foundation"
parent: "—"
motivation: "奠定模型预测控制与接触动力学仿真基础"
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
