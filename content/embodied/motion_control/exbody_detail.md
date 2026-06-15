### 表现力全身控制 (Expressive Whole-Body Control, ExBody)

```yaml
id: exbody
name: ExBody
full_name: 表现力全身控制 (Expressive Whole-Body Control)
year: '2024'
org: CMU
paper_url: https://arxiv.org/abs/2402.16759
category: rl_locomotion
parent: teacher_student
motivation: 人形机器人表现力全身控制
```

#### 📝 一句话总结

ExBody 提出一种面向真实人形机器人的全身强化学习控制器：上半身尽量模仿人类动作以获得表现力，下半身放松逐关节模仿并主要跟踪根部运动命令，从而在 Unitree H1 等平台上实现跳舞、挥手、握手和风格化行走等真实世界动作。

#### 🎯 核心要点

- **分解 imitation 目标**：上半身跟踪参考关节和关键点，下半身不强制逐关节模仿，只要求稳健完成 root movement goal
- **双目标输入**：策略同时接收 expression goal \(g^e\) 和 root movement goal \(g^m\)，部署时 \(g^m\) 可由摇杆给出
- **多源人类动作数据**：可使用 CMU MoCap、生成模型、video-to-pose 等来源，经 retargeting 转换为机器人可执行动作片段
- **运动重定向到硬件约束**：将人类动作映射到 H1 的 19 DoF 结构，显式处理人-机器人自由度和能力差异
- **Guided State Initialization**：训练初始状态从重定向动作分布采样，提高探索效率，避免策略只在默认站姿附近学习
- **奖励设计替代 AMP 依赖**：通过上身关键点/关节跟踪、根运动跟踪、稳定性和正则项组合，比直接全身 AMP 更适合真实硬件
- **Sim-to-Real 部署**：在仿真中训练单一策略，真实机器人无需针对每个动作单独调控制器

#### 🔬 深入细节

##### 资料依据与框架图

> ⚠️ 注意：清单中的 `paper_url` 为 `arXiv:2402.16759`，公开可检索的 ExBody 论文编号为 `arXiv:2402.16796`。以下内容基于该公开论文和项目页；YAML 元信息按清单保留。

![ExBody 方法框架](https://arxiv.org/html/2402.16796v1/extracted/5431719/figures/method.png)
*图：ExBody 将多源人类动作重定向到机器人，提取 expression goal 与 root movement goal，再用 goal-conditioned RL 训练可真实部署的全身控制器。*

##### 动机与背景

人形机器人控制通常把重点放在“不摔倒”和“跟踪速度”上，因此动作稳定但缺乏人类式表现力。图形学中的物理角色控制可以全身模仿大规模动捕数据，但这些方法常假设仿真角色具有更丰富自由度、更强力矩和仿真可见的特权状态，直接迁移到真实 H1 这类机器人会失败。

ExBody 的关键取舍是：不要让机器人完整复制人类全身轨迹。上半身的手臂、肩部、手部关键点主要负责表达意图和风格，应该尽量模仿；下半身则承担平衡和移动，必须服从真实机器人动力学能力。因此论文把问题定义为“表达目标 + 根运动目标”的联合控制，而非传统全身逐关节 tracking。

##### 控制目标形式化

命令条件运动控制通常只跟踪根部速度、朝向或高度：

$$
\pi(a_t \mid o_t, g_t^m)
$$

ExBody 扩展为：

$$
\pi(a_t \mid o_t, g_t^m, g_t^e)
$$

其中 \(g_t^m\) 是 root movement goal，例如线速度、朝向误差、根高度等；\(g_t^e\) 是 expression goal，包括上半身 9 个 actuated joints 的目标角度，以及肩、肘、手等关键点的 3D 位置。策略输出低层关节控制目标，由仿真中的 RL 学习如何在满足表达动作的同时保持站立和移动。

关键奖励可概括为：

$$
r_t =
w_m r_t^{\text{root}}
+ w_e r_t^{\text{expression}}
+ w_s r_t^{\text{stability}}
- w_r c_t^{\text{regularization}}
$$

上半身表达项使用关键点和关节误差：

$$
r_t^{\text{expression}} =
\exp(-\alpha \|q_{upper} - q_{upper}^{ref}\|^2)
+ \exp(-\beta \|p_{key} - p_{key}^{ref}\|^2)
$$

下半身不使用同等强度的关节模仿项，这让机器人可以弯膝、调整步态和足端高度，以真实硬件可承受的方式完成同一个表达动作。

##### 训练流程伪代码

```python
# ExBody 训练流程伪代码
motion_dataset = load_human_motions(CMU_MoCap, generated_motion, video_to_pose)
robot_clips = []
for human_clip in motion_dataset:
    robot_clip = retarget_to_humanoid(
        human_clip,
        robot_dof=19,
        preserve_upper_body_keypoints=True,
        relax_lower_body_constraints=True,
    )
    robot_clips.append(robot_clip)

for iteration in range(PPO_updates):
    clip = sample(robot_clips)
    state = guided_state_initialization(clip)  # 从动作片段附近初始化
    for t in rollout:
        g_e = extract_expression_goal(clip, t)
        g_m = extract_root_movement_goal(clip, t)  # 或部署时来自 joystick
        action = policy(obs=state, expression_goal=g_e, root_goal=g_m)
        state = sim.step(action)
        reward = root_tracking + upper_body_tracking + stability - regularization
    PPO_update(policy, reward)
```

Guided State Initialization 很重要：如果所有 episode 都从默认站姿开始，策略很难探索到挥手、击掌、舞蹈等高维上身姿态；从数据集状态附近初始化相当于把训练分布推向真实动作流形，让策略更快学会在这些姿态附近恢复平衡。

##### 为什么不做全身强模仿

完整全身 tracking 看似最直接，但真实人形机器人和人类身体存在明显差异：髋、肩等关节自由度不同，脚掌接触模型不同，腿长和力矩限制也不同。若强制 H1 的膝、踝、髋完全跟随人类动作，策略会为了追逐不可实现的腿部姿态牺牲稳定性，常表现为膝盖过直、足端净空不足或直接跌倒。

ExBody 的“上身严格、下身放松”让策略保留了人类动作的可识别部分。例如挥手、拥抱、握手、僵尸步的表达主要来自手臂和躯干，上身关键点必须接近参考；但腿部可以选择更弯的膝、更高的摆脚或更保守的支撑步态。这正是它能从动捕/生成动作迁移到真实硬件的关键。

##### 与 AMP/图形学方法的区别

AMP 通过判别器鼓励动作片段看起来像数据集，但当数据集很大且目标机器人能力受限时，判别器容易推动策略追求“像人类”的全身分布，而不是“真实机器人可稳定执行”的动作。ExBody 更像一个任务条件控制器：给出表达目标和根运动目标，奖励直接约束哪些部分必须像参考、哪些部分优先稳定。

与传统 WBC 或 MPC 相比，ExBody 不显式求解接触力和全身动力学优化，而是在大规模仿真中学习一个神经策略。优势是动作风格丰富、可复用人类动作数据；劣势是安全约束主要来自奖励和训练分布，面对未覆盖的高风险接触仍不如模型控制器可解释。

> 💡 关键：ExBody 的贡献不是“人形机器人会模仿动作”本身，而是明确指出真实硬件上应把表达性和运动稳定性拆开：上半身承载表达，下半身负责稳健移动。

#### 🧪 练习题

```yaml
question: "ExBody 为什么放松下半身的人类动作模仿约束？"
options:
  - "因为人形机器人的下半身没有传感器"
  - "因为表达性主要由上半身体现，而下半身需要优先满足真实机器人平衡和运动能力"
  - "因为 PPO 不能训练腿部控制"
  - "因为论文只研究静态站立，不涉及行走"
answer: 1
explain: "真实机器人与人类腿部自由度和动力学能力不同，强制全身逐关节模仿会破坏稳定性。ExBody 让上半身跟踪表达动作，下半身通过根运动目标保持可执行行走。"
```
