### HDMI — 人形交互模仿 (HumanoiD iMitation for Interaction)

```yaml
id: hdmi
name: HDMI
full_name: 人形交互模仿 (HumanoiD iMitation for Interaction)
year: '2026'
org: CVPR
paper_url: https://arxiv.org/abs/2602.12345
category: sim2real
parent: viral
motivation: 互联网视频学习全身交互技能
```

#### 📝 一句话总结

HDMI 可理解为面向人形机器人交互技能的互联网视频模仿学习框架：从视频中抽取人体、物体和接触关系，将其 retarget 到人形机器人，再通过仿真模仿强化学习获得可执行策略。给定 `paper_url` 实际指向理论物理论文而非该算法，以下解读基于 YAML 元信息和视频模仿/人形控制的公开通用范式完成。

#### 🎯 核心要点

- **依据限制**：`https://arxiv.org/abs/2602.12345` 标题为 “Lazarides-Shafi axion models as Dijkgraaf-Witten theories”，与 HDMI 元信息不匹配，未能获取匹配论文原文或原图
- **互联网视频作为示范源**：从大规模公开视频中挖掘坐、推、拿、开门、搬运等全身交互行为
- **三类中间表示**：人体姿态/根轨迹、物体 6D 轨迹、接触事件或手脚接触标签
- **人形 retargeting**：把人类骨架动作映射到机器人关节，约束足底接触、质心稳定、关节限位和自碰撞
- **交互模仿奖励**：同时奖励身体姿态跟踪、末端执行器轨迹、物体状态变化和接触时序一致性
- **仿真到真实迁移**：结合动力学随机化、扰动注入和低层 PD/力控接口，让策略在真实人形机器人上更稳
- **区别于纯运动模仿**：HDMI 的重点不是复现人体动作本身，而是复现“身体动作如何改变外部物体”

#### 🔬 深入细节

##### 概念示意图

![HDMI 概念流程图](https://placehold.co/1200x480/png?text=HDMI+Video-to-Humanoid+Interaction+Imitation)

*图：给定 URL 未提供匹配论文原图，上图为结构占位。HDMI 的核心流程可抽象为：互联网视频 → 3D 人体/物体/接触重建 → 人形 retargeting → 仿真模仿 RL → 真实交互。*

##### 算法伪代码

```python
# HDMI conceptual pipeline
videos = crawl_interaction_videos(keywords=["sit", "push", "open", "carry"])
demos = []

for video in videos:
    human_pose = estimate_3d_human_motion(video)
    object_traj = estimate_object_pose(video)
    contacts = infer_contact_events(human_pose, object_traj)
    robot_motion = retarget_to_humanoid(
        human_pose,
        constraints=[feet_contact, joint_limits, balance, contacts],
    )
    demos.append((robot_motion, object_traj, contacts))

policy = initialize_humanoid_policy()
for update in range(num_updates):
    demo = sample(demos)
    rollout = simulate(policy, randomized_physics=True)
    reward = (
        w_pose * pose_tracking(rollout, demo.robot_motion)
        + w_ee * end_effector_tracking(rollout, demo)
        + w_obj * object_state_match(rollout, demo.object_traj)
        + w_contact * contact_timing_match(rollout, demo.contacts)
        - w_energy * action_penalty(rollout)
    )
    policy = rl_update(policy, rollout, reward)
```

##### 动机与背景

人形机器人要完成真实交互任务，难点不只是“走得像人”，而是要让全身运动、接触力和物体状态变化协调起来。传统 motion imitation 数据多来自动作捕捉，质量高但规模小、场景单一；互联网视频规模大，但没有机器人关节标签、力信息和精确 3D 状态。HDMI 的动机就是把大规模视频中的交互先验转化为可被机器人策略学习的中间表示。

一个合理的 HDMI 管线会先把视频转成结构化示范：

$$
v \rightarrow \{q^{\mathrm{human}}_{1:T},\; o_{1:T},\; c_{1:T}\}
$$

其中 \(q^{\mathrm{human}}\) 是人体姿态，\(o_t\) 是物体状态，\(c_t\) 是接触事件。相比只跟踪人体姿态，接触和物体状态是交互任务的核心，因为机器人最终要改变的是外部世界，而不是在空中复现一段动作。

retargeting 阶段需要解决身体结构差异。人类动作不能直接投到人形机器人关节上，否则会产生足底滑动、质心越界、关节超限或手部无法接触物体等问题。通常会优化：

$$
\min_{q^{\mathrm{robot}}_{1:T}}
\sum_t
\left[
\|f_{\mathrm{ee}}(q_t)-x^{\mathrm{human}}_{\mathrm{ee},t}\|^2
+ \lambda_c \mathcal{L}_{\mathrm{contact}}
+ \lambda_b \mathcal{L}_{\mathrm{balance}}
+ \lambda_j \mathcal{L}_{\mathrm{joint}}
\right]
$$

模仿强化学习阶段再把 retargeted motion 转成闭环策略。闭环策略比直接播放轨迹更重要，因为真实交互中的物体位置、摩擦、接触时机都会有偏差。奖励通常由姿态跟踪、末端位置、物体目标和接触一致性组成：

$$
r_t =
w_p r^{\mathrm{pose}}_t
+w_e r^{\mathrm{ee}}_t
+w_o r^{\mathrm{object}}_t
+w_c r^{\mathrm{contact}}_t
-w_a\|a_t\|^2
$$

> 💡 关键：HDMI 类方法的价值在于把“视频里的人做了什么”拆成机器人可优化的状态、接触和目标，而不是直接让机器人逐帧模仿像素或人体骨架。

##### 与纯视频模仿的区别

| 维度 | 纯视频动作模仿 | HDMI 式交互模仿 |
|---|---|---|
| 学习目标 | 人体姿态相似 | 物体变化和接触成功 |
| 数据表示 | 视频帧或人体关键点 | 人体姿态 + 物体轨迹 + 接触标签 |
| 控制对象 | 多为身体运动 | 全身运动与环境交互 |
| sim-to-real 重点 | 姿态稳定 | 接触鲁棒性、物体动力学、延迟 |

真正落地时，HDMI 还需要处理视频中的遮挡、相机运动、物体尺度不确定和不可观测接触力。可行做法通常是引入多候选重建、用物理仿真筛掉不可行轨迹，并在 RL 训练中加入随机扰动让策略学会从偏差中恢复。

##### 依据限制说明

由于清单中的 `paper_url` 与 HDMI 不匹配，无法确认原论文中的模型结构、实验机器人或具体指标。本文将 HDMI 解释为“互联网视频到人形机器人交互技能”的算法族抽象，保留 YAML 中的动机，不声称包含原文未公开的实验结论。

#### 🧪 练习题

```yaml
question: "HDMI 类人形交互模仿方法相比只模仿人体姿态，最需要额外建模什么？"
options:
  - "视频压缩码率"
  - "物体轨迹与接触事件"
  - "图像背景颜色"
  - "策略网络的参数命名"
answer: 1
explain: "交互技能的成败取决于机器人如何通过接触改变物体状态，因此物体轨迹和接触时序比单纯姿态相似更关键。"
```
