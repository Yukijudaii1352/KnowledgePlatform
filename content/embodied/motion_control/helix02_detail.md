### Helix-02：Figure AI 全身端到端 Loco-Manipulation 系统

```yaml
id: helix02
name: Helix-02
full_name: Figure AI VLA系统 (Helix VLA System)
year: "2026"
org: Figure AI
paper_url: https://www.figure.ai/blog/helix-02
category: foundation_model
parent: pi0
motivation: 端到端Loco-manipulation控制
```

#### 📝 一句话总结

Helix-02 将 Figure 的 Helix VLA 扩展到人形机器人全身控制，通过 System 2 语义推理、System 1 视觉运动策略和 System 0 千赫兹全身运动控制，把行走、平衡、双手操作和触觉反馈统一到端到端 loco-manipulation 流程中。

#### 🎯 核心要点

- 目标从上半身 manipulation 扩展到全身 loco-manipulation：边走、边拿、边保持平衡
- 采用三层系统：System 2 语义推理，System 1 视觉运动策略，System 0 低层全身控制
- System 0 以约 1kHz 控制全身关节，学习人体运动先验并负责平衡、接触和协调
- System 1 融合头部相机、手掌相机、触觉、本体感知等输入，以高频输出全身关节目标
- System 2 处理自然语言、场景语义和长时域任务目标，不手工规划每个关节动作
- 展示厨房整理等长时域任务：机器人连续移动、开关门、搬运餐具、使用身体其他部位辅助操作
- 强调 “all sensors in, all actuators out”，减少传统状态机和分模块控制的接口断裂

#### 🔬 深入细节

##### 核心示意图

![Helix-02 官方展示图](https://images.ctfassets.net/qx5k8y1u9drj/7qpJLAT9FKWaptebSQgA0Y/4e2bdb81cbecddfd7cbea49f8ab143ac/Open_Graph_Image__4_.jpg)
*图：Figure AI 官方 Helix-02 页面展示的全身自主任务场景。公开页面还提供 System 0/1/2 架构动画和厨房整理演示视频。*

##### 算法伪代码

```python
# Helix-02 conceptual control loop

while robot_is_active:
    # System 2: low-frequency semantic reasoning
    if need_replan():
        scene_tokens = encode_scene(head_camera)
        task_latent = system2_vlm(scene_tokens, language_instruction, memory)

    # System 1: visuomotor whole-body policy
    obs = {
        "head_rgb": head_camera.read(),
        "palm_rgb": palm_cameras.read(),
        "tactile": fingertip_tactile.read(),
        "proprio": joint_states.read(),
        "task": task_latent,
    }
    whole_body_targets = system1_policy(obs)  # arms, hands, torso, legs

    # System 0: high-frequency feasibility and balance controller
    for _ in range(low_level_steps):
        motor_cmd = system0_controller(
            current_state=joint_states.read(),
            target=whole_body_targets,
            contacts=contact_sensors.read(),
        )
        actuators.apply(motor_cmd)
```

##### 方法详解

**动机与背景：为什么 loco-manipulation 难？**

人形机器人不是“机械臂装在移动底盘上”这么简单。行走会改变身体重心和双手可达空间，抓取重物会反过来影响平衡，打开门、拉抽屉、搬餐具都涉及接触力、足底支撑和全身协调。传统系统通常把导航、站定、机械臂操作、恢复平衡拆成状态机，一旦任务需要边走边操作或用身体其他部位辅助，就会出现接口脆弱和切换迟缓。

Helix-02 的目标是用统一学习系统处理这种耦合。高层只需要表达任务意图，中层策略直接从多传感器输入产生全身目标，底层控制器以高频保证物理可执行性。

**核心机制一：System 2 语义推理**

System 2 类似慢速思考模块，负责语言、场景理解和长时域任务分解。它不直接输出每个关节的轨迹，而是为 System 1 提供目标 latent。例如“把洗碗机里的盘子拿到柜台”这种任务，System 2 需要理解物体、容器、空间关系和顺序约束。

这种分层可以避免把 VLM 放进毫秒级控制环。语义推理更新频率低，但影响任务方向；运动执行更新频率高，但只需处理局部感知和动作。

**核心机制二：System 1 多模态视觉运动策略**

System 1 是从传感器到全身动作目标的桥。输入不只是头部相机，还包括手掌相机、触觉和本体状态。手掌相机解决近距离遮挡问题，触觉解决接触确认和握力调节问题，本体状态提供平衡与关节约束。

可以把策略抽象为：

$$
y_t = \pi_{\theta}^{S1}(I_t^{head}, I_t^{palm}, h_t^{tactile}, q_t, z_t^{S2})
$$

其中 \(y_t\) 是全身关节目标或低层控制目标，\(z_t^{S2}\) 是 System 2 给出的语义条件。与只输出末端执行器动作的 VLA 不同，Helix-02 强调全身输出：腿、躯干、手臂、手腕和手指都在同一策略中协调。

**核心机制三：System 0 高频全身控制**

System 0 是物理可执行性的底座。它以约 1kHz 的频率运行，处理平衡、接触、关节限制和执行器响应。公开资料中强调 System 0 学习了人体运动数据和仿真强化学习得到的全身运动先验，用来替代大量手写控制逻辑。

从控制角度看，System 1 给出的是“想做什么姿态/动作”，System 0 负责“在当前接触和动力学约束下如何安全做”。这与传统 WBC/MPC 的职责类似，但控制律主要通过学习获得。

**与传统模块化控制的区别**

传统 humanoid pipeline 常是：

$$
\text{Task Planner} \rightarrow \text{Footstep Planner} \rightarrow \text{Arm Planner} \rightarrow \text{WBC}
$$

Helix-02 更接近：

$$
\text{Language + Sensors} \rightarrow \text{Whole-body Neural Policy} \rightarrow \text{Learned Low-level Control}
$$

优势是全身耦合动作可以端到端学习，例如双手拿盘时用身体保持平衡、手被占用时用髋部关抽屉、用脚辅助门体动作。风险是系统细节未以论文形式完全公开，外部难以独立复现实验和评估边界。

> ⚠️ 注意：Helix-02 目前主要是官方技术发布与演示，未提供完整论文、数据集和可复现训练细节；因此应把它理解为工业 VLA/全身控制系统案例，而不是完全开放的学术算法基线。

#### 🧪 练习题

```yaml
question: "Helix-02 中 System 0 的核心职责是什么？"
options:
  - "低频解释自然语言并生成任务计划"
  - "以高频执行全身平衡、接触和关节协调控制"
  - "只负责图像分类，不参与动作控制"
  - "离线生成训练数据，不在机器人上运行"
answer: 1
explain: "System 0 是底层全身控制模块，以高频处理物理可执行性；System 2 才负责语义推理，System 1 负责多模态视觉运动策略。"
```
