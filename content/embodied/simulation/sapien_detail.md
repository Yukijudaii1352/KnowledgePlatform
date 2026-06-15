### SAPIEN

```yaml
id: sapien
name: "SAPIEN"
full_name: "SAPIEN关节物体交互环境 (SAPIEN)"
year: "2020"
org: "UCSD"
paper_url: "https://sapien.ucsd.edu/"
category: "interactive"
parent: "—"
motivation: "专注关节物体交互，提供精细部件数据集"
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
