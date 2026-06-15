### 感知运动控制 (Perceptive Locomotion)

```yaml
id: perceptive_loco
name: Perceptive Locomotion
full_name: 感知运动控制 (Perceptive Locomotion)
year: '2022'
org: ETH Zurich
paper_url: https://arxiv.org/abs/2206.08392
category: rl_locomotion
parent: teacher_student
motivation: 引入视觉感知的地形自适应控制
```

#### 📝 一句话总结

Perceptive Locomotion 提出一种把本体感知与外部地形感知融合到循环 belief state 的 Teacher-Student 强化学习控制器，解决四足机器人在野外面对噪声高度图、遮挡、雪地、植被和传感器失效时既要提前规划落脚又要保持鲁棒的问题。

#### 🎯 核心要点

- **Teacher-Student 特权学习**：Teacher 在仿真中访问无噪声地形、摩擦、扰动等特权信息；Student 只使用真实机器人可获得的本体感知和高度采样
- **注意力门控循环编码器**：用 GRU 维护隐式环境 belief，并通过门控机制自适应决定外感信息在当前时刻是否可信
- **外感退化建模**：训练时注入高度偏移、逐点噪声、逐足噪声和整 episode 偏置，模拟位姿漂移、软地形、遮挡和传感器故障
- **双损失蒸馏**：Student 同时最小化对 Teacher 动作的行为克隆损失和对特权环境状态/高度样本的重建损失
- **传感器无关接口**：以机器人中心 2.5D elevation map 的高度采样作为外感输入，可由 LiDAR 或深度相机产生
- **零射 Sim-to-Real**：策略在仿真训练后直接部署到 ANYmal C，控制器 50 Hz 运行，地图约 20 Hz 更新
- **鲁棒性-速度折中**：外感可靠时提前抬脚、调姿和加速；外感不可靠时退化为本体感知驱动的稳健行走

#### 🔬 深入细节

##### 资料依据与框架图

> ⚠️ 注意：清单中的 `paper_url`（`arXiv:2206.08392`）实际指向一篇数学论文，不是该算法论文。以下精读基于同名公开论文 *Learning robust perceptive locomotion for quadrupedal robots in the wild*（`arXiv:2201.08117`）和 ETH 官方项目页；YAML 元信息仍按清单原样保留。

![Perceptive Locomotion 训练与部署框架](https://ar5iv.labs.arxiv.org/html/2201.08117/assets/x4.png)
*图：先训练带特权信息的 Teacher，再把 Teacher 的动作和环境 belief 蒸馏到只使用真实传感器输入的 Student，最后在真实 ANYmal 上零射部署。*

##### 动机与背景

纯本体感知的四足策略已经能在粗糙地形上保持鲁棒，但它必须“踩到之后才知道”地形性质，因此遇到台阶、树根、坑洞时速度和能耗都会受限。外部感知可以让机器人提前抬脚和调整身体姿态，但真实野外的深度信息并不可靠：雪和水可能反光，草和软泡沫看起来像可踩的硬面，树枝和低矮障碍会被 2.5D 高度图错误地当成地面障碍，位姿漂移还会让地图整体偏移。

论文的核心判断是：不要把 elevation map 当作绝对可信的几何真值，而是让策略在训练中学习“什么时候相信外感、什么时候回退到本体感知”。因此控制器没有手写的传感器置信度规则，而是在循环网络里形成一个 belief state，用过去的身体反馈修正当前高度图。

##### 方法机制：Teacher、Student 与 belief state

Teacher 策略在仿真中通过 PPO 训练，输入包括机器人本体状态、速度命令、无噪声地形高度、摩擦/扰动等特权量。Teacher 的目标是先学到“如果知道真实环境，最优应该怎么走”。Student 之后只看到真实可用的观测：

$$
o_t^{\text{student}} = [o_t^{\text{prop}},\ h_t^{\text{noisy}},\ c_t]
$$

其中 \(o_t^{\text{prop}}\) 是关节、IMU、历史动作等本体信息，\(h_t^{\text{noisy}}\) 是从机器人中心 elevation map 查询得到的高度采样，\(c_t\) 是期望速度命令。Student 的循环编码器先生成中间状态，再用注意力门控融合外感特征：

$$
\tilde{b}_t = \mathrm{GRU}([o_t^{\text{prop}}, e_t], b_{t-1}), \qquad
g_t = \sigma(f_g(\tilde{b}_t))
$$

$$
b_t = [\tilde{b}_t,\ g_t \odot e_t]
$$

这里 \(e_t\) 是高度采样编码，\(g_t\) 是逐维门控系数。直觉上，门控系数高表示“当前外感对控制有用”，系数低表示“高度图可能错了，应更多依赖身体反馈和记忆”。

##### 训练流程与损失函数

```python
# Perceptive Locomotion 核心训练伪代码
for iter in teacher_rl:
    obs_T = concat(proprioception, privileged_terrain, friction, disturbances, velocity_cmd)
    action_T = teacher_policy(obs_T)
    reward = velocity_tracking + terrain_progress - energy_cost - instability_penalty
    PPO_update(teacher_policy, reward)

for iter in student_distillation:
    noisy_height = corrupt_height_samples(
        clean_height,
        point_noise=True,
        foot_offset=True,
        episode_bias=True,
        failure_modes=["nominal", "large_offset", "large_noise"],
    )
    belief = gated_gru_encoder(proprioception, noisy_height, history)
    action_S = student_policy(belief, velocity_cmd)
    action_T = teacher_policy(privileged_obs).detach()

    loss_bc = mean_squared_error(action_S, action_T)
    loss_rec = reconstruct_privileged_state(belief, clean_height, friction)
    update(student_policy, encoder, loss_bc + lambda_rec * loss_rec)

deploy_zero_shot(student_policy, onboard_elevation_map)
```

Student 的行为克隆损失可写为：

$$
\mathcal{L}_{\text{BC}} =
\mathbb{E}_t \left[\|\pi_S(o_t^{\text{prop}}, h_t^{\text{noisy}}, b_{t-1}) -
\pi_T(s_t^{\text{priv}})\|_2^2\right]
$$

重建损失则要求 belief state 能解码出真实地形/摩擦等特权量：

$$
\mathcal{L}_{\text{rec}} =
\|D(b_t) - y_t^{\text{priv}}\|_2^2
$$

这不是为了部署时真的使用解码器，而是为了约束隐藏状态包含“可用于控制的环境解释”。例如当机器人踩到软泡沫时，高度图仍显示前方可踩，但身体反馈会显示足端下陷，循环 belief 会快速修正对地形高度和可支撑性的估计。

##### 噪声建模为什么关键

论文将高度采样噪声分为多个作用域：逐采样点噪声模拟深度测量随机误差，逐足噪声模拟局部地形注册偏差，episode 级偏置模拟整张地图漂移。训练 episode 中还按比例切换三种地图质量：正常噪声、大偏移、大噪声。这样 Student 不会只学会“读高度图”，而会学会用本体反馈判别高度图可信度。

这种设计与传统“先建图、再规划脚点”的方法有明显区别。传统方法通常假设地图是正确的，再用规则或优化器选脚点；Perceptive Locomotion 把地图看作不完整观测，并把“地图是否可信”交给策略网络从交互历史中学习。它也不同于纯本体感知策略：可靠外感存在时，机器人能提前抬腿跨过 30 cm 级台阶，并在平地上以更高速度前进。

##### 部署流程

真实机器人上，LiDAR 或深度相机点云被融合为机器人中心 elevation map，策略在固定查询点采样局部高度；若某个查询点没有地图信息，则填入随机值，使输入分布接近训练时的“缺失地图”模式。策略输出 12 个关节目标位置，再由底层 PD/执行器控制实现。

> 💡 关键：外感在这里不是单独的规划模块，而是 Student belief 的一个观测来源。控制器可以使用外感获得前瞻性，也可以在外感坏掉时保留本体感知策略的鲁棒性。

#### 🧪 练习题

```yaml
question: "Perceptive Locomotion 中注意力门控循环编码器的主要作用是什么？"
options:
  - "把高度图压缩成更小的图像，减少显存占用"
  - "根据历史本体反馈和当前外感，自适应决定外部高度信息的可信程度"
  - "用显式规则检测雪地、玻璃和植被"
  - "替代底层关节 PD 控制器直接输出电机电流"
answer: 1
explain: "门控 GRU 维护环境 belief，并学习在外感可靠时利用高度图、在外感缺失或误导时回退到本体感知与历史记忆。"
```
