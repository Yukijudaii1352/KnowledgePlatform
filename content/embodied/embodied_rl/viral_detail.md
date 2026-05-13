### VIRAL — 视觉 Sim-to-Real 大规模迁移实现人形机器人移动操作

```yaml
id: viral
name: VIRAL
full_name: "视觉Sim2Real大规模迁移 (VIsual Sim-to-Real trAnsfer at scaLe)"
year: 2025
org: UPenn / NVIDIA
paper_url: "https://arxiv.org/abs/2511.15200"
project_url: "https://viral-humanoid.github.io"
category: sim2real
parent: domain_rand
motivation: "通过 Teacher-Student 范式和大规模视觉域随机化，实现人形机器人仅凭 RGB 图像完成移动操作任务的零样本 Sim-to-Real 迁移"
```

#### 📝 一句话总结

VIRAL 提出了一套完整的 Teacher-Student 视觉 Sim-to-Real 框架，通过特权教师 RL 训练 + RGB 学生蒸馏 + 大规模视觉/物理域随机化，使 29-DoF 人形机器人仅凭单目 RGB 图像即可零样本部署完成长时程移动操作（行走-放置-抓取-转身），在 59 次连续真实世界试验中达到 91.5% 成功率，速度超越人类专家遥操作。

#### 🎯 核心要点

- **Teacher-Student 两阶段范式**：Teacher 使用特权状态观测（物体位姿、阶段标签等）+ PPO 训练；Student 使用 RGB 图像 + 本体感知，通过蒸馏学习
- **Teacher 四大关键设计**：
  - 分阶段奖励设计（walk / place / grasp / turn 四类奖励）
  - Delta 动作空间（输出增量而非绝对关节角，显著加速训练）
  - WBC（HOMIE）作为底层 API（策略输出高层命令而非底层力矩）
  - 参考状态初始化 RSI（从 200 条仿真遥操作演示中采样初始状态）
- **Student 三大关键设计**：
  - DAgger + BC 混合蒸馏（\(\alpha=0.5\) 混合教师/学生 rollout）
  - DINOv3 视觉骨干网络提取 RGB 特征
  - 分布式仿真训练系统（最高 64 GPU 并行，近线性加速）
- **Sim-to-Real 三大关键设计**：
  - 灵巧手系统辨识 SysID（校准手指 armature/stiffness/damping）
  - 相机外参对齐 + 外参随机化
  - 大规模视觉域随机化（材质/光照/图像质量/相机延迟）
- **实验结果**：59 次连续试验 54 次成功（91.5%），周期时间 20.2s 快于专家 21.4s
- **全面消融**：验证了 RSI、delta action、DINOv3、DAgger-BC 比例、历史架构、域随机化、GPU 规模等 10 个设计选择的必要性

#### 🔬 深入细节

![VIRAL 框架总览](https://arxiv.org/html/2511.15200v1/x2.png)
*图：VIRAL 训练流程。左侧 Teacher 使用特权状态观测 + PPO 训练；右侧 Student 通过 DAgger/BC 蒸馏，以 RGB 图像 + 本体感知作为输入，最终部署到真实机器人。*

##### 算法伪代码

```python
# ========== 阶段 1: Teacher 训练 (PPO + 特权观测) ==========
teacher = PolicyNetwork(input_dim=226)  # 特权状态观测
wbc = HOMIE_Controller()  # 全身控制器作为底层 API
demo_buffer = load_teleop_demos(n=200)  # 200 条仿真遥操作演示

for episode in range(N_episodes):
    # 参考状态初始化 (RSI): 从演示中采样场景快照
    snapshot = sample(demo_buffer)
    env.reset(robot=snapshot.robot, objects=snapshot.objects, tables=snapshot.tables)
    
    for t in range(T):
        o_t = [o_proprio, o_exte_priv]  # 本体感知 + 特权外感知
        delta_a = teacher(o_t)           # 输出 delta 动作增量
        wbc_cmd += delta_a               # 累加到 WBC 命令
        wbc.execute(wbc_cmd)             # WBC 执行底层控制
        
        # 分阶段奖励: r = Σ w_i * 1(stage==i) * r_i
        r = stage_weighted_reward(walk=r_walk, place=r_place, 
                                   grasp=r_grasp, turn=r_turn)
    PPO_update(teacher, trajectories)

# ========== 阶段 2: Student 蒸馏 (DAgger + BC) ==========
student = VisionPolicy(backbone=DINOv3(), input_dim=113+128)
alpha = 0.5  # teacher/student rollout 混合比例

for iteration in range(M):
    # 混合 rollout: α 比例用 teacher, (1-α) 比例用 student
    obs_teacher = rollout(env, teacher, frac=alpha)    # BC 数据
    obs_student = rollout(env, student, frac=1-alpha)  # DAgger 数据
    
    # 蒸馏损失: MSE(teacher_action, student_action)
    for o_t, o_s in mix(obs_teacher, obs_student):
        rgb_feat = DINOv3(o_t.image)  # 108×192 RGB → 128-dim
        a_student = student(rgb_feat, o_t.proprio)
        a_teacher = teacher(o_t.privileged)
        loss = MSE(a_teacher, a_student)
        optimizer.step(loss)
```

##### 动机与背景

人形机器人的移动操作（loco-manipulation）要求机器人在行走的同时完成抓取、放置等精细操作，是通往通用家庭服务机器人的关键能力。现有方法面临三大困境：

1. **纯遥操作 + 模仿学习**：需要大量真实世界数据采集，成本高昂且难以泛化
2. **纯 Sim-to-Real 运动控制**：虽然盲行走已经成熟，但缺乏视觉感知无法完成操作任务
3. **视觉 Sim-to-Real 操作**：主要局限于桌面场景，未扩展到全身移动操作

VIRAL 的核心洞察是：将成熟的 Sim-to-Real 运动控制（通过 WBC 封装）与大规模视觉域随机化结合，通过 Teacher-Student 范式实现端到端的 RGB 移动操作策略。

##### 核心机制详解

**1. Delta 动作空间 vs 绝对动作空间**

传统腿式运动 RL 通常输出绝对关节目标角度。VIRAL 发现对于移动操作任务，delta 动作空间（输出增量）至关重要：

$$a_t^{\text{abs}} = a_{t-1}^{\text{abs}} + \Delta a_t, \quad \Delta a_t = \pi_\theta(o_t)$$

直觉上，delta 动作提供了一种隐式的"位置记忆"——策略只需关注"如何微调"而非"从零开始到达目标"，这大幅降低了学习难度。消融实验（Figure 9）表明，绝对动作空间完全无法收敛。

**2. 参考状态初始化 (RSI)**

长时程任务（行走→放置→抓取→转身）的探索空间极大，从零开始的 RL 几乎无法发现有效行为。VIRAL 收集 200 条仿真遥操作演示，在每个 episode 重置时随机采样一个演示快照作为初始状态：

> 💡 **关键**：RSI 不是模仿学习——它不约束策略动作，只是将机器人"传送"到任务中间的各种状态，让策略从一开始就能体验到抓取成功等稀疏奖励信号。

消融表明（Figure 9），没有 RSI 的 Teacher 成功率停滞在 10% 以下，而有 RSI 的达到 95%。

**3. WBC 作为安全 API 层**

VIRAL 不直接输出底层关节力矩，而是输出 HOMIE 全身控制器的高层命令（速度/高度跟踪 + 上半身关节 + 手指动作）：

$$\text{Action Space} = [\underbrace{v_x, v_y, \omega, h}_{\text{locomotion}} , \underbrace{q_{\text{upper}}}_{\text{upper body}} , \underbrace{q_{\text{finger}}}_{\text{fingers}}]$$

这将策略的动作空间限制在安全可靠的运动区域内，显著提升了 Sim-to-Real 的可部署性。

**4. DAgger + BC 混合蒸馏**

纯 BC（\(\alpha=1\)）只在教师分布上训练，学生遇到自身误差导致的分布偏移时无法纠错；纯 DAgger（\(\alpha=0\)）收敛慢。VIRAL 采用混合策略：

$$\rho^o = \alpha \cdot \rho^o_{\pi_{\text{teacher}}} + (1-\alpha) \cdot \rho^o_{\pi_{\text{student}}}$$

$$\mathcal{L}_{\text{distill}} = \mathbb{E}_{o_t \sim \rho^o} \left[ \| \pi_{\text{teacher}}(o_t^{\text{teacher}}) - \pi_{\text{student}}(o_t^{\text{student}}) \|_2^2 \right]$$

\(\alpha=0.5\) 在训练速度和部署鲁棒性之间取得最佳平衡（Figure 11）。

**5. 大规模视觉域随机化**

为弥合 Sim-to-Real 视觉差距，VIRAL 在训练中随机化：
- **图像质量**：亮度、对比度、色调、饱和度、高斯噪声、模糊
- **相机外参**：模拟硬件制造公差和漂移
- **全局光照**：穹顶光环境贴图
- **材质属性**：地板、桌子、物体、机器人部件的颜色和材质

消融（Figure 13）表明关闭所有随机化导致性能下降 35.1%，且各组件互补。

**6. 计算规模的关键作用**

VIRAL 发现 GPU 规模不仅加速训练，还直接影响最终性能：
- **Teacher**：1-2 GPU 永远无法达到高成功率，8-16 GPU 才能突破 90%（Figure 14）
- **Student**：64 GPU 训练不仅更快收敛，还获得更高的最终成功率和更平滑的优化曲线（Figure 15）

> ⚠️ **注意**：大规模计算不是"锦上添花"而是"必要条件"——不充分的计算资源会导致策略永远无法收敛到可部署水平。

##### 分阶段奖励设计

任务被分解为 5 个阶段（行走→预放置→放置→抓取提升→转身），总奖励为阶段加权和：

$$r_t = \sum_{i=0}^{4} w_i \cdot \mathbb{1}(\text{stage} = i) \cdot r_i$$

四类核心奖励：

| 奖励 | 公式 | 直觉 |
|------|------|------|
| 行走 | \(r_{\text{walk}} = \exp(-4(\|p_{\text{robot}} - p_{\text{obj}}\| - 0.45)^2)\) | 引导机器人走向目标物体，0.45m 为最佳抓取距离 |
| 放置 | \(r_{\text{place}} = -\|f_{\text{PlaceObj}}\| \cdot \mathbb{1}(\|p_{\text{obj}} - p_{\text{tray}}\| < 0.3)\) | 在托盘附近时鼓励松手（减小指尖力） |
| 抓取 | \(r_{\text{grasp}} = \min(h_{\text{obj}} - h_{\text{table}}, 0.15)\) | 鼓励将物体提升离桌面，上限 0.15m |
| 转身 | \(r_{\text{turn}} = -|y_{\text{robot}} - y_{\text{desired}}|\) | 最小化当前朝向与目标朝向的偏差 |

##### 与现有方法的对比

| 维度 | 遥操作+模仿学习 | 盲 Sim-to-Real 运动 | VIRAL |
|------|-----------------|---------------------|-------|
| 感知模态 | RGB（真实数据） | 无/深度 | RGB（仿真数据） |
| 操作能力 | ✅ 灵巧 | ❌ 无 | ✅ 灵巧手 |
| 移动能力 | ✅ | ✅ | ✅ |
| 真实数据需求 | 大量 | 零 | 零 |
| 泛化性 | 依赖数据覆盖 | 强（运动） | 强（视觉+运动） |
| 部署速度 | 受遥操作者限制 | 实时 | 实时（20.2s/周期） |

#### 🧪 练习题

```yaml
question: "VIRAL 框架中，参考状态初始化 (RSI) 的核心作用是什么？"
options:
  - "约束策略动作使其模仿演示轨迹"
  - "将 episode 初始状态设置为演示中的多样化中间状态，加速稀疏奖励的探索"
  - "替代奖励函数，直接用演示作为监督信号"
  - "减少仿真环境的域随机化需求"
answer: 1
explain: "RSI 不约束策略动作（非模仿学习），而是在每次 episode 重置时从 200 条遥操作演示中采样场景快照作为初始状态，使策略从一开始就能体验到任务各阶段的奖励信号，解决长时程任务的探索瓶颈。消融实验表明没有 RSI 成功率停滞在 10% 以下。"
```