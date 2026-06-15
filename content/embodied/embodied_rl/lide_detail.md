### LIDE — 规划引导扩散 (Planning-Guided Diffusion)

```yaml
id: lide
name: LIDE
full_name: 规划引导扩散 (Planning-Guided Diffusion)
year: '2026'
org: MIT
paper_url: https://arxiv.org/abs/2602.15678
category: sim2real
parent: domain_rand
motivation: 规划引导扩散解决双臂接触任务
```

#### 📝 一句话总结

LIDE 可理解为将任务规划/运动规划约束注入扩散策略的双臂接触控制方法：扩散模型负责生成多模态动作轨迹，规划器在采样过程中提供可达性、碰撞、接触和目标约束引导。给定 `paper_url` 实际指向文学大模型论文而非该算法，以下内容基于 YAML 元信息和 diffusion policy + planning guidance 的通用技术路线整理。

#### 🎯 核心要点

- **依据限制**：`https://arxiv.org/abs/2602.15678` 标题为 “Revisiting Northrop Frye's Four Myths Theory with Large Language Models”，与 LIDE 元信息不匹配
- **扩散轨迹生成**：用条件扩散模型表示 \(p(\tau|o,g)\)，生成双臂动作或末端轨迹，天然支持多峰解
- **规划引导采样**：在 denoising 每一步加入来自规划代价的梯度或重打分，如碰撞、可达性、同步抓取、接触顺序
- **双臂接触建模**：显式考虑两臂协同、闭链约束、接触切换和物体稳定性
- **仿真训练与迁移**：在随机化动力学和接触参数下训练，减少真实部署时摩擦/刚度误差影响
- **与纯 Diffusion Policy 区别**：不是只拟合示范分布，而是在采样时用规划器把生成结果推向物理可行且任务可达的区域
- **典型任务**：双臂搬运、插拔、开合、推拉、协同装配等长接触序列任务

#### 🔬 深入细节

##### 概念示意图

![LIDE 概念流程图](https://placehold.co/1200x480/png?text=LIDE+Planning-Guided+Diffusion+for+Bimanual+Contact)

*图：给定 URL 未提供匹配论文原图，上图为结构占位。LIDE 的抽象流程是：观测/目标条件 → 扩散轨迹采样 → 规划代价引导 → 低层控制执行 → 接触反馈修正。*

##### 算法伪代码

```python
# LIDE conceptual planning-guided diffusion
diffusion = train_diffusion_policy(demos, condition=["observation", "goal"])
planner = build_planner(costs=["collision", "reachability", "contact", "goal"])

def sample_action_sequence(obs, goal):
    x = gaussian_noise(shape=(horizon, action_dim))
    for k in reversed(range(num_diffusion_steps)):
        score = diffusion.score(x, obs, goal, step=k)
        plan_grad = grad(planner.cost(x, obs, goal), x)
        x = denoise_step(x, score - guidance_scale * plan_grad, step=k)
        x = project_to_constraints(x, planner.hard_constraints)
    return x

for control_step in range(T):
    action_seq = sample_action_sequence(current_obs, task_goal)
    execute(action_seq[0])
    current_obs = observe()
```

##### 动机与背景

双臂接触任务的困难来自两个方面：一是动作解高度多模态，例如同一个物体可以从不同侧抓取、不同顺序插入；二是物理约束很硬，轻微碰撞、闭链误差或接触时机错误都会让任务失败。传统规划器能处理约束，但在高维连续动作和复杂接触中搜索困难；纯行为克隆或扩散策略能学习示范分布，却可能生成看似合理但不可达或碰撞的动作。

LIDE 式方法的核心思想是把两者结合。扩散模型学习示范轨迹分布：

$$
p_\theta(\tau|o,g)
$$

其中 \(\tau\) 可以是双臂末端轨迹、关节轨迹或低层动作序列，\(o\) 是当前观测，\(g\) 是任务目标。扩散模型通过从噪声逐步 denoise 生成轨迹，因此每一步都可以被外部代价函数引导。

规划器定义可微或可近似求梯度的代价：

$$
C(\tau)=
\lambda_{\mathrm{goal}}C_{\mathrm{goal}}
+\lambda_{\mathrm{col}}C_{\mathrm{collision}}
+\lambda_{\mathrm{reach}}C_{\mathrm{reach}}
+\lambda_{\mathrm{contact}}C_{\mathrm{contact}}
+\lambda_{\mathrm{sync}}C_{\mathrm{bimanual}}
$$

采样时不只是沿扩散模型 score \(\nabla_\tau \log p_\theta(\tau|o,g)\) 走，而是加入规划引导：

$$
\tilde{s}(\tau)
=
\nabla_\tau \log p_\theta(\tau|o,g)
- \eta \nabla_\tau C(\tau)
$$

这样生成轨迹既保持示范分布的自然性，又被推向满足任务约束的低代价区域。对于不可微约束，也可以采用候选轨迹重采样、MPC 打分或投影步骤来实现规划引导。

在双臂任务中，规划代价应特别关注闭链与同步。比如搬运刚性物体时，两只手的相对位姿必须维持物体几何；插入任务中，一只手固定、另一只手施加位移时接触力方向必须稳定。这些约束很难仅靠示范模仿自动学到，规划引导能在推理时持续纠偏。

> 💡 关键：扩散模型解决“生成多种可行候选”，规划器解决“筛掉物理不可行候选”。LIDE 的价值在于把规划代价放进采样过程，而不是采样后才简单选择。

##### 与传统规划和 Diffusion Policy 的区别

| 方法 | 优点 | 局限 |
|---|---|---|
| 传统运动规划 | 约束清晰，可解释 | 高维接触搜索成本高，示范先验弱 |
| Diffusion Policy | 多模态、动作自然 | 可能生成不可达/碰撞轨迹 |
| LIDE 式规划引导扩散 | 多模态生成 + 约束引导 | 依赖规划代价设计和实时采样效率 |

sim-to-real 阶段，LIDE 需要把接触参数、物体质量、摩擦和控制延迟纳入随机化。否则扩散轨迹在仿真中可行，真实接触中仍可能因为力学偏差失败。一个实用实现通常会在 MPC 执行层加入短视野反馈，让每次只执行轨迹前几步并持续重采样。

##### 依据限制说明

由于清单中的 `paper_url` 与 LIDE 不匹配，无法确认原论文的命名、公式、实验或机器人平台。本文只依据 YAML 中“规划引导扩散解决双臂接触任务”的元信息，给出符合该技术路线的精读式结构化说明。

#### 🧪 练习题

```yaml
question: "LIDE 式规划引导扩散中，规划器最主要在采样阶段提供什么？"
options:
  - "随机噪声初始化"
  - "可达性、碰撞、接触和目标等约束代价的引导"
  - "图像数据增强"
  - "价值函数的 Bellman backup"
answer: 1
explain: "扩散模型负责生成候选轨迹，规划器通过代价梯度、投影或重打分把轨迹推向物理可行且满足任务目标的区域。"
```
