### MuJoCo Playground高速Sim2Real框架 (MuJoCo Playground)

```yaml
id: mujoco_playground
name: MuJoCo Playground
full_name: MuJoCo Playground高速Sim2Real框架 (MuJoCo Playground)
year: '2025.02'
org: DeepMind
paper_url: https://arxiv.org/abs/2502.08844
category: parallel
parent: mujoco
motivation: 高速Sim2Real框架，分钟级完成策略训练
```

#### 📝 一句话总结
MuJoCo Playground 提出基于 MJX/JAX 的开源机器人学习框架，把 MuJoCo 物理、Madrona 批渲染和 RL 训练环境整合到单 GPU 端到端管线中，实现分钟级训练和多类机器人零样本 sim-to-real。

#### 🎯 核心要点
- 基于 MuJoCo XLA (MJX) 将物理仿真放到 JAX/GPU 上，保持 MuJoCo 资产生态和接触建模优势。
- 提供 DM Control、locomotion、manipulation 三类环境，覆盖四足、人形、灵巧手、Franka、Aloha 等平台。
- 集成 Madrona GPU batch renderer，使像素观测训练也能在设备端完成，减少 vision policy 的 teacher-student 蒸馏依赖。
- 支持 Brax/JAX 与 RSL-RL/PyTorch 风格训练库，主要使用 PPO/SAC 等 RL 算法。
- 展示 Unitree Go1、Berkeley Humanoid、Unitree G1、Booster T1、LEAP Hand、Franka 等实机迁移。
- 通过 domain randomization、课程学习、延迟随机化和视觉随机化改善状态输入与像素输入的 zero-shot sim-to-real。

#### 🔬 深入细节
![MuJoCo Playground 环境预览](https://arxiv.org/html/2502.08844v1/extracted/6199808/figures/env_grid.png)
*图：MuJoCo Playground 覆盖 locomotion 与 manipulation 环境，论文展示其中多个策略已迁移到真实硬件。*

```python
# MuJoCo Playground 端到端训练/部署伪代码
env = playground.make(
    task="Go1JoystickFlatTerrain",
    backend="mjx",
    num_envs=8192,
    domain_randomization={
        "mass": True,
        "friction": True,
        "sensor_noise": True,
        "latency": True,
    },
)

policy = PPO(obs_encoder="state_or_pixels", device="cuda")

for update in range(num_updates):
    batch = jax_vmap_rollout(env, policy)  # physics, obs, reward all on device
    policy = ppo_update(policy, batch)
    if curriculum_success(batch):
        env.expand_command_range()

export_policy(policy)
deploy_on_robot(control_rate=real_robot.rate, no_finetune=True)
```

MuJoCo Playground 的核心目标是缩短“time-to-robot”：从修改奖励或环境参数，到看到真实机器人表现之间的时间。论文指出，RL 的 reward design 往往需要反复试错；如果每次训练要几天，研究迭代会很慢。MJX 把 MuJoCo 物理搬到 JAX/XLA/GPU 上，使大批量环境 rollout 与策略优化在同一设备上完成，和 Isaac Gym 类似地消除 CPU 采样瓶颈，但保留 MuJoCo 开源生态。

框架包含三类环境。DM Control Suite 用于基础连续控制；locomotion 包含 Unitree Go1、Spot、Barkour、Berkeley Humanoid、Unitree H1/G1、Booster T1、Robotis OP3 等；manipulation 包含 LEAP Hand 方块重定向、Franka yoga block 非抓取重定向、Franka 像素 pick-cube、Aloha 双臂 peg insertion 等。这个覆盖面使它不仅是 benchmark，也是 sim-to-real 配方集合。

Madrona batch renderer 是视觉策略部分的关键。传统像素 RL 往往因为渲染慢而先训练状态策略，再蒸馏到视觉策略。MuJoCo Playground 通过 Madrona 的 CUDA batch ray tracer，把光照、阴影、纹理、材质和相机随机化纳入 GPU 批渲染。论文在 Cartpole 和 Franka pixel 环境中报告高吞吐渲染步进，并展示单相机 64×64 RGB 输入的 Franka pick-cube 策略可直接零样本部署。

训练配方通常包括 domain randomization 和 curriculum。四足/人形 locomotion 随机化传感器噪声、动力学参数、地形和扰动；LEAP Hand 随机化手部参数、方块质量和摩擦，并逐步增加噪声和动作正则；Franka 非抓取重定向加入随机延迟和目标范围课程。策略目标仍是标准 RL，例如 PPO：

$$
\max_\theta\ \mathbb{E}\left[
\min(r_t(\theta)\hat A_t,\operatorname{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat A_t)
\right]
$$

但环境采样由 MJX/JAX 大规模并行提供。

与 Isaac Gym/Isaac Lab 相比，MuJoCo Playground 的优势是开源、轻量、MuJoCo 资产兼容、安装和复现实验门槛低；不足是继承 JAX 静态形状限制，JIT 编译可能较慢，接触计算按 possible contacts 而非 active contacts 扩展，复杂可变接触场景还不如更灵活的 Warp/Taichi 类框架方便。

> 💡 关键：MuJoCo Playground 把“训练速度”变成 sim-to-real 研究体验的一部分，让奖励设计、随机化和真实部署能快速闭环。

#### 🧪 练习题
```yaml
question: "MuJoCo Playground 集成 Madrona batch renderer 的主要目的是什么？"
options:
  - "只用于离线生成论文插图"
  - "让像素观测、物理仿真和 RL 训练尽量保持在 GPU 端到端执行"
  - "替代 MuJoCo 的所有接触求解器"
  - "移除 domain randomization"
answer: 1
explain: "Madrona 提供 GPU 批渲染，使视觉策略可直接在仿真中高吞吐训练，并支持光照、材质、相机等视觉随机化。"
```
