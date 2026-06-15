### Newton 1.0新一代物理引擎 (Newton 1.0)

```yaml
id: newton
name: Newton 1.0
full_name: Newton 1.0新一代物理引擎 (Newton 1.0)
year: '2026.03'
org: NVIDIA
paper_url: https://nvidianews.nvidia.com/news/nvidia-cosmos-world-foundation-model-platform-physical-ai
category: parallel
parent: isaac_sim
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
