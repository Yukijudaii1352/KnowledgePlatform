### GS-Playground

```yaml
id: gs_playground
name: "GS-Playground"
full_name: "GS-Playground高通量光真实仿真器 (GS-Playground)"
year: "2026.04"
org: "THU"
paper_url: "https://arxiv.org/abs/2604.25459"
category: "generative"
parent: "genesis"
motivation: "引入3DGS技术，10k+ FPS超高性能渲染"
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
