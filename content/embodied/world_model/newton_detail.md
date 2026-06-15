### Newton 1.0：牛顿物理引擎 (Newton Physics Engine)

```yaml
id: newton
name: Newton 1.0
full_name: "牛顿物理引擎 (Newton Physics Engine)"
year: "2026.03"
org: NVIDIA
paper_url: "https://blogs.nvidia.com/blog/2026/04/gtc26-robots/"
category: physics
parent: gns
motivation: "开源物理引擎实现精确刚体流体动力学"
```

#### 📝 一句话总结

Newton 1.0 提出面向机器人学习的开源、GPU 加速、可扩展物理引擎，用统一的 OpenUSD/Warp 架构把刚体、接触、变形体、自定义求解器和 Isaac/MuJoCo 工作流连接起来，解决高保真接触仿真与大规模强化学习训练难以兼得的问题。

#### 🎯 核心要点

- **开源物理引擎定位**：由 NVIDIA、Google DeepMind、Disney Research 发起，Linux Foundation 治理，面向机器人仿真与学习
- **统一架构**：以 OpenUSD 作为场景与资产数据层，以 NVIDIA Warp/CUDA 作为 GPU 计算层
- **多求解器设计**：包含 MuJoCo Warp、Kamino、变形体求解器、规范求解器与用户自定义求解器
- **高保真接触建模**：支持 SDF 碰撞、hydroelastic contact、摩擦与复杂闭链机构，用于接触丰富的操控和装配任务
- **可微与可扩展**：支持通过仿真反传梯度，便于系统辨识、控制优化和学习算法集成
- **机器人学习工作流**：可作为 Isaac Lab/Isaac Sim 的后端，使同一 MDP、奖励、PPO 训练循环在不同物理后端间切换
- **视觉 RL 支持**：Warp tiled camera sensor 支持 RGB、深度、法线、实例分割等批量观测生成

#### 🔬 深入细节

##### 资料来源说明

> ⚠️ 注意：清单中的 `paper_url` 指向 NVIDIA 新闻/博客页，而不是同行评审论文。以下内容基于 NVIDIA 官方 Newton 技术博客、Newton Developer 页面和开源仓库 README 中公开的架构与接口说明整理；因此这里更接近“系统/算法精读”，而不是传统论文复现。

![Newton 架构图](https://developer-blogs.nvidia.com/wp-content/uploads/2026/03/newton-architecture.webp)
*图：Newton 以 OpenUSD 连接 Isaac、MuJoCo、Warp 和内部多求解器；核心模块包含 collision、contact、sensor、control 与多种 solver。*

##### 核心仿真循环

```python
# Newton 典型仿真/训练后端伪代码
builder = newton.ModelBuilder()
builder.add_usd("robot_or_scene.usd")      # 统一资产入口，也可来自 URDF/MJCF
model = builder.finalize()                 # 上传到 GPU

solver = newton.solvers.SolverKamino(model)  # 或 MuJoCo Warp / custom solver
state_0 = model.state()
state_1 = model.state()
control = model.control()
contacts = model.contacts()

for step in range(num_steps):
    state_0.clear_forces()
    policy_action = policy(observation(state_0))
    control.apply(policy_action)

    model.collide(state_0, contacts)       # 碰撞检测和接触生成
    solver.step(state_0, state_1, control, contacts, sim_dt)

    reward = task_reward(state_1)
    replay.add(state_0, policy_action, reward, state_1)
    state_0, state_1 = state_1, state_0
```

##### 动机与背景

机器人世界模型有两类常见瓶颈：一类是学习式世界模型容易在接触、摩擦、闭链机构和变形体上产生不可控误差；另一类是传统物理引擎虽可解释，但在大规模 RL 中常受限于 CPU 性能、求解器耦合和资产格式割裂。Newton 的目标不是学习一个神经动力学模型，而是提供一个可用于学习的物理底座：把高保真物理、GPU 并行、可微分和通用场景描述整合成同一后端。

其核心抽象可以写成：

$$s_{t+1} = \mathrm{Solver}_{\phi}(s_t, a_t, c_t, \Delta t)$$

其中 \(s_t\) 是系统状态，\(a_t\) 是控制输入，\(c_t\) 是由碰撞检测与接触模型生成的约束/接触信息，\(\phi\) 表示求解器和物理参数。与纯神经世界模型不同，Newton 把动力学先验写进求解器，把需要学习的部分留给策略、参数辨识或自定义模块。

##### 核心机制：模块化物理栈

Newton 的设计重点是“可替换但统一”。OpenUSD 负责表达机器人、环境、材质、传感器和资产组合；Newton 中的 collision、contact、sensor、control 模块把场景转换为求解器可处理的运行时数据；不同 solver 再负责推进物理状态。这样做的价值在于，研究者可以在同一个机器人学习任务中替换物理后端，观察策略是否依赖某个求解器的偏差。

接触丰富任务是 Newton 重点覆盖的场景。传统点接触模型在插拔、装配、手内操控中容易出现不稳定或不真实的摩擦行为。Newton 引入 SDF 碰撞和 hydroelastic contact，使接触不再只是单点冲量，而可以表达接触面积、压力分布和扭转摩擦。对工业装配来说，这比只关心质心运动的粗糙刚体仿真更接近真实任务。

##### 与学习式世界模型的关系

在 KnowledgePipeline 的世界模型谱系里，Newton 更像“可微物理世界模型”而不是“数据驱动潜在动力学模型”。它不直接学习 \(p(s_{t+1}|s_t,a_t)\)，而是提供一个可批量调用的近似物理转移函数。训练时，策略可以通过 Isaac Lab 的 RL 环境调用 Newton：

$$\pi_\theta(a_t|o_t) \rightarrow \text{Newton step} \rightarrow (o_{t+1}, r_t, d_t)$$

如果启用可微仿真，还可以把目标函数对物理参数或控制变量的梯度反传：

$$\nabla_\phi J = \frac{\partial J}{\partial s_T}\prod_{t=0}^{T-1}\frac{\partial s_{t+1}}{\partial s_t}\frac{\partial s_t}{\partial \phi}$$

这使 Newton 同时支持两种用途：作为大规模 RL 的快速环境，以及作为系统辨识和轨迹优化的可微动力学模型。

##### 与传统仿真器的区别

Newton 相比单一物理引擎的关键区别在于它把“求解器生态”作为一等公民。MuJoCo Warp 提供 GPU 化 MuJoCo 能力；Kamino 处理闭链机构和复杂机制；变形体求解器覆盖软物体；自定义 solver 允许研究者接入新物理模型。OpenUSD 则降低了不同机器人资产、仿真器和渲染管线之间的转换成本。

> 💡 关键：Newton 的算法价值不在某一个新损失函数，而在把机器人学习需要的物理求解、资产表达、传感器生成和训练后端统一到可扩展 GPU 运行时中。

#### 🧪 练习题

```yaml
question: "Newton 1.0 相比纯学习式世界模型的核心优势是什么？"
options:
  - "只通过视频预测未来帧，不需要物理约束"
  - "用可扩展物理求解器提供高保真、可并行、可微的状态转移"
  - "完全替代强化学习策略，不再需要奖励函数"
  - "只支持单一 MuJoCo 场景格式"
answer: 1
explain: "Newton 的核心是 GPU 加速、多求解器、OpenUSD 统一资产和可微物理，使机器人学习可以在物理约束下获得高吞吐仿真。"
```
