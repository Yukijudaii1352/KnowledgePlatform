### 域随机化 (Domain Randomization)

```yaml
id: domain_rand
name: Domain Randomization
full_name: 域随机化 (Domain Randomization)
year: '2018'
org: Google Brain
paper_url: https://arxiv.org/abs/1804.10332
category: sim2real
parent: —
motivation: 随机化物理参数弥合仿真差异
```

#### 📝 一句话总结

Domain Randomization 将机器人训练环境中的质量、惯量、摩擦、延迟、执行器、地形和扰动等物理因素随机化，使策略在一簇仿真域上优化期望回报，从而把真实世界看成随机域分布中的一个样本，缓解从仿真到真实机器人的现实差距。

#### 🎯 核心要点

- **随机化物理参数**：在 episode 级别采样机体质量、腿部质量、惯量、摩擦、阻尼、电机强度和执行器响应等参数
- **随机化外部扰动**：训练中加入随机推力/冲击，提升策略对真实碰撞、打滑和未知地形的恢复能力
- **执行器建模**：论文链接对应的 Minitaur 工作包含电机动力学拟合和控制延迟建模，减少策略在真实硬件上的动作失真
- **仿真域期望优化**：优化目标不是某个标称仿真，而是随机参数分布下的平均性能
- **无需真实数据微调**：策略只在仿真中训练，通过覆盖足够宽的参数范围直接迁移到硬件
- **与系统辨识互补**：系统辨识让仿真中心更接近真实，domain randomization 让策略对剩余误差不敏感
- **四足运动验证**：在 Minitaur 上学习 trot/gallop 等步态，并展示随机化显著缩小 sim-to-real gap

#### 🔬 深入细节

##### 核心示意图

![随机化对 Sim-to-Real 性能的影响](https://ar5iv.labs.arxiv.org/html/1804.10332/assets/x3.png)
*图：不同仿真质量和随机扰动组合下，仿真性能与真实机器人性能的差异。改进仿真模型并加入随机扰动后，真实性能更接近仿真。*

![惯量随机化泛化实验](https://ar5iv.labs.arxiv.org/html/1804.10332/assets/x4.png)
*图：对不同机体惯量进行测试时，带随机化训练的控制器比未随机化控制器泛化更稳定。*

##### 动机与背景

强化学习可以在仿真中产生复杂运动，但真实机器人和仿真总有差异：摩擦系数不准、执行器有延迟、接触模型不完全、质量和惯量存在制造误差，地面也不是理想刚体。若策略只在一个“标称仿真”上训练，它会利用仿真细节，例如刚好踩在某个接触模型的稳定区域，真实硬件上这些细节不存在，策略就会摔倒。

Domain Randomization 的思路很直接：与其试图把仿真调到完全等于真实，不如让训练时的仿真不断变化。只要真实世界落在这组变化范围内，策略就会学到对参数不敏感的行为。

##### 数学形式

令 \(\xi\) 表示仿真域参数，包括动力学、接触、执行器和观测噪声：

$$
\xi = [m,\ I,\ \mu,\ k_d,\ \tau_{\text{delay}},\ \eta_{\text{motor}},\ h_{\text{terrain}},\ldots]
$$

训练时从分布 \(p(\xi)\) 采样：

$$
\xi_i \sim p(\xi)
$$

策略优化目标为：

$$
\pi^* =
\arg\max_\pi
\mathbb{E}_{\xi\sim p(\xi)}
\left[
\mathbb{E}_{\tau\sim P_\xi(\tau|\pi)}
\sum_{t=0}^{T}\gamma^t r(s_t,a_t;\xi)
\right]
$$

这个目标的含义是：策略不追求在某个固定世界最优，而是在一组可能世界里平均表现好。若参数分布覆盖真实机器人，真实部署时的性能可看作该期望目标中的一个样本点。

##### 训练流程伪代码

```python
# Domain Randomization for locomotion
for iteration in range(num_policy_updates):
    trajectories = []
    for env in parallel_envs:
        # episode 开始时随机化域
        xi = sample({
            "base_mass": uniform(m0 * 0.8, m0 * 1.2),
            "link_inertia": uniform(I0 * 0.7, I0 * 1.3),
            "ground_friction": uniform(0.5, 1.5),
            "motor_strength": uniform(0.8, 1.2),
            "control_latency": uniform(0, 20_ms),
            "terrain_profile": random_roughness(),
        })
        env.set_physics(xi)

        for t in range(horizon):
            if random_event():
                env.apply_push(force=random_force())
            action = policy(observation)
            observation, reward, done = env.step(action)
            trajectories.append((observation, action, reward, done))

    update_policy_with_rl(trajectories)
```

##### 关键设计一：随机范围不能只靠“越大越好”

随机范围太窄，真实世界可能落在分布外，策略仍然脆弱；随机范围太宽，策略会为了覆盖所有情况变得极度保守，训练也更难收敛。因此实际工程常采用两步：

1. **系统辨识**：用真实硬件数据估计仿真参数中心，例如电机响应、质量、关节摩擦；
2. **围绕中心随机化**：在可信误差范围内扰动参数，让策略对剩余建模误差鲁棒。

论文链接对应的 Minitaur 工作就不仅随机化参数，还改进了电机模型和硬件控制链路。图中对比显示，单纯 baseline 仿真、baseline+扰动、改进仿真+扰动的真实效果逐步提升。

##### 关键设计二：动作与观测也要随机化

真实硬件差异不仅来自动力学参数，还来自控制接口。电机命令可能延迟，关节角有噪声，IMU 有偏置，足端接触并非精确二值。因此 domain randomization 通常要覆盖：

- **动作侧**：电机强度缩放、命令延迟、动作低通滤波、PD 增益扰动；
- **观测侧**：关节角/速度噪声、IMU 噪声、延迟观测、随机丢帧；
- **环境侧**：摩擦、地形高度、坡度、外部推力；
- **形体侧**：质量、惯量、质心偏移、腿长误差。

如果只随机化地面摩擦，而忽略执行器延迟，策略可能在真实机器人上因为相位滞后而失败。

##### 与其他 Sim-to-Real 方法的区别

Domain Randomization 是一种“训练分布扩展”方法，不需要在线估计真实参数；RMA 则在部署时从历史观测估计 extrinsics 并动态调节策略；Isaac Gym/Isaac Lab 提供大规模并行仿真，使随机化可以在数千环境中高效执行。三者关系并非替代：现代腿足 RL 往往同时使用 GPU 并行仿真、广泛 domain randomization 和在线适应模块。

> 💡 关键：Domain Randomization 的目标不是让仿真更真实，而是让策略不依赖仿真的某个脆弱细节。真实世界只要处在训练域族内，策略就更可能零射成功。

#### 🧪 练习题

```yaml
question: "Domain Randomization 缩小 sim-to-real gap 的核心思路是什么？"
options:
  - "把真实机器人数据全部加入监督学习数据集"
  - "训练时随机化仿真参数，使策略在一组可能世界上都表现稳定"
  - "只使用更高分辨率渲染图像"
  - "部署时实时求解精确接触动力学方程"
answer: 1
explain: "Domain Randomization 将真实世界视为随机化仿真域中的一个样本，通过优化域分布下的期望回报提升策略对建模误差的鲁棒性。"
```
