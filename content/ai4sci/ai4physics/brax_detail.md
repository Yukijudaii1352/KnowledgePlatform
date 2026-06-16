### Brax — JAX刚体引擎 (Brax)

```yaml
id: brax
name: Brax
full_name: JAX刚体引擎 (Brax)
year: '2021'
org: Google
paper_url: https://github.com/google/brax
category: fluid_simulation
parent: jax_md
motivation: 高性能刚体动力学引擎
```

#### 📝 一句话总结

Brax 是用 JAX 编写的可微分刚体仿真与强化学习环境库，通过 JIT 编译、批量向量化和多设备并行，把大量环境步进和策略优化放到同一 GPU/TPU 上执行，大幅降低 RL 训练中的仿真吞吐瓶颈。

#### 🎯 核心要点

- **JAX 原生物理引擎**：仿真状态、环境 step、奖励计算和 RL 更新都可表示为 JAX 函数，直接使用 `jit`、`vmap`、`pmap` 和自动微分
- **最大坐标刚体表示**：每个刚体独立跟踪位置、旋转、线速度和角速度，论文中的核心状态数据结构称为 QP
- **批量并行设计**：QP 等状态张量带有环境批量维和物体维，使上千个独立环境可以在一个 accelerator 上并行 step
- **减少分支的接触建模**：用连续函数近似碰撞/接触逻辑，或把静态分支提前到 JIT 编译期，提升 SIMD/SIMT 设备上的执行一致性
- **同设备训练闭环**：PPO、SAC、ES 和 analytic policy gradients 等算法可与环境一起编译，避免传统 CPU 仿真器与 GPU 学习器之间的数据搬运
- **基准环境套件**：初始论文包含 Ant、Fetch、Grasp、HalfCheetah、Humanoid 等 MuJoCo/Gym 风格任务
- **性能目标**：单个现代 accelerator 上达到数百万 physics steps/s，多 accelerator 扩展到更高吞吐，Google Research 博客报告训练加速约 \(100\times\) 到 \(1000\times\)

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 `paper_url` 是 Brax GitHub 项目页。方法细节主要参考论文 arXiv/html 版本：https://ar5iv.labs.arxiv.org/html/2106.13281，当前项目说明参考 GitHub README：https://github.com/google/brax。arXiv HTML 页面中若干 `overpic` 图没有转换成可直接嵌入的图片，因此下图使用 Google Research 官方博客的公开图源。

![Brax 将仿真和学习放在同一 accelerator 上](https://1.bp.blogspot.com/-Za-dyrqXP24/YPBB_LLLRHI/AAAAAAAAH48/2R922TQkSwsh38UEPztNA86DqAZqAMBfACLcBGAsYHQ/w640-h326/image1.gif)
*图：传统工作站、分布式仿真和 Brax 工作流对比。Brax 的关键是让大批量仿真和学习器在同一 GPU/TPU 上并排运行。*

![Brax 刚体仿真步进示意](https://1.bp.blogspot.com/-xzTE4RTKkHg/YPBCTEmN4CI/AAAAAAAAH5E/vgQLCCI-eKw93j46VtHAyVtgLAde7M0MgCLcBGAsYHQ/w640-h440/image9.png)
*图：三个球体、墙、关节和执行器组成的 Brax 示例；每个 timestep 计算力和力矩并更新刚体位置、旋转和速度。*

##### 算法伪代码

```python
# Brax 风格的批量环境 step 与训练循环伪代码

@jax.jit
def physics_step(sys, qp, action, rng):
    # qp 保存每个刚体的位置、姿态、线速度、角速度
    force_act = actuator_forces(sys, qp, action)
    force_joint = joint_constraints(sys, qp)
    force_contact = contact_forces_branch_free(sys, qp)
    force_gravity = gravity(sys, qp)

    total_force = force_act + force_joint + force_contact + force_gravity
    qp_next = integrate_rigid_bodies(qp, total_force, sys.dt)
    return qp_next

@jax.jit
def env_step(state, action, rng):
    qp_next = physics_step(state.sys, state.qp, action, rng)
    obs_next = observe(qp_next)
    reward = reward_fn(state.qp, qp_next, action)
    done = termination_fn(qp_next)
    return state.replace(qp=qp_next, obs=obs_next), reward, done

# vmap 让一个函数同时跑成千上万个独立环境
batched_env_step = jax.vmap(env_step, in_axes=(0, 0, 0))

@jax.jit
def train_update(train_state, env_states, rngs):
    actions = policy(train_state.params, env_states.obs)
    env_states, rewards, dones = batched_env_step(env_states, actions, rngs)
    loss = rl_loss(train_state.params, env_states, rewards, dones)
    grads = jax.grad(loss_fn)(train_state.params)
    train_state = optimizer_update(train_state, grads)
    return train_state, env_states
```

##### 刚体状态：QP 数据结构

Brax 论文把物理系统写在最大坐标系中：场景里的每个可运动刚体都独立维护自己的动态状态。简化表示为：

$$
\mathrm{QP}_i(t)
=
\left(
x_i(t),\ q_i(t),\ v_i(t),\ \omega_i(t)
\right),
$$

其中 \(x_i\) 是位置，\(q_i\) 是旋转姿态四元数，\(v_i\) 是线速度，\(\omega_i\) 是角速度。一个批量仿真张量通常带有形如：

$$
[\text{num_envs},\ \text{num_bodies},\ \text{state_dim}]
$$

的前导维度。这一点很关键：Brax 不是在 Python 循环里逐个环境 step，而是把环境批量维交给 XLA 编译器和 accelerator。

##### 物理 step 的核心计算

一个 timestep 可以抽象成：

$$
F_t
=
F_\mathrm{act}(s_t,a_t)
+F_\mathrm{joint}(s_t)
+F_\mathrm{contact}(s_t)
+F_g,
$$

$$
v_{t+\Delta t}
=
v_t+\Delta t\,M^{-1}F_t,
\qquad
x_{t+\Delta t}
=
x_t+\Delta t\,v_{t+\Delta t}.
$$

旋转部分同理需要根据转动惯量、力矩和角速度更新四元数。论文强调的工程设计不是提出一种全新的刚体动力学方程，而是把执行器、关节、碰撞和积分步骤组织成 JAX 可编译的张量变换。

接触处理尤其影响 accelerator 性能。传统物理引擎常有大量 “if contact then resolve collision” 的离散分支，不同环境在同一步会走不同代码路径。Brax 尽量用连续近似替代硬分支，例如把几何接触写成 signed distance \(\phi\) 的函数：

$$
F_\mathrm{contact}
\approx
k\,\max(0,-\phi)\,n
-c\,v_n,
$$

其中 \(\phi<0\) 表示穿透，\(n\) 是接触法向，\(v_n\) 是法向相对速度。实际实现会包含稳定性和约束细节；这个式子表达的是“用连续张量计算近似接触力”的核心直觉。

##### 为什么 JAX 改变 RL 仿真吞吐

传统 RL 工作流常把环境仿真放在 CPU 进程里，把策略网络训练放在 GPU/TPU 上。每个 rollout 周期都要在仿真器、队列、序列化格式和学习器之间搬运观测、动作和奖励。Brax 的设计把环境 step 也变成 JAX 函数，使下面的组合成为可能：

$$
\text{rollout}
=
\mathrm{scan}\left(
s_{t+1}=f_\mathrm{Brax}(s_t,\pi_\theta(o_t))
\right),
$$

并且整个 rollout 可被 `jit` 编译、可被 `vmap` 批量化、可被 `pmap` 分发到多个设备。这样，环境吞吐不再主要受 Python 调度和 CPU-GPU 通信限制。

> 💡 关键：Brax 的“快”主要来自系统设计：纯 JAX 张量程序、编译期优化、大批量并行和同设备训练闭环，而不是单独某个动力学公式的改变。

##### 强化学习算法如何嵌入

论文随引擎提供了 PPO、SAC、ES 和 analytic policy gradients。以 PPO 为例，Brax 可以先在 accelerator 上并行收集 rollout，再直接计算裁剪目标：

$$
L^\mathrm{CLIP}(\theta)
=
\mathbb{E}_t
\left[
\min
\left(
r_t(\theta)\hat{A}_t,
\mathrm{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat{A}_t
\right)
\right],
$$

其中：

$$
r_t(\theta)
=
\frac{\pi_\theta(a_t|s_t)}
{\pi_{\theta_\mathrm{old}}(a_t|s_t)}.
$$

对可微仿真更直接的用法是 analytic policy gradient。若奖励和物理 step 都可微，可将短轨迹目标写成：

$$
J(\theta)
=
\sum_{t=0}^{H-1}
r\left(s_t,\pi_\theta(s_t)\right),
\qquad
s_{t+1}
=
f_\mathrm{Brax}\left(s_t,\pi_\theta(s_t)\right),
$$

然后通过自动微分计算 \(\nabla_\theta J(\theta)\)。论文也谨慎指出，长轨迹可微优化容易遇到局部最小值和梯度稳定性问题，因此 APG 在初版中更多是证明能力，而 PPO/SAC/ES 是更成熟的训练路径。

##### 与 MuJoCo/Gym 工作流的区别

| 维度 | 传统 MuJoCo/Gym 常见工作流 | Brax |
|------|-----------------------------|------|
| 仿真位置 | 多在 CPU 进程或分布式 worker | GPU/TPU 上的 JAX 程序 |
| 并行方式 | 多进程、线程或集群调度 | `vmap`/`pmap` 批量张量并行 |
| 与学习器通信 | 观测/动作/奖励跨设备或跨进程搬运 | 环境和策略更新可在同设备闭环 |
| 可微性 | 引擎通常作为黑盒使用 | step 函数可参与自动微分 |
| 主要取舍 | 物理逼真度和生态成熟 | 吞吐、可编译性、可微和快速实验 |

这也是 Brax 在 AI4Physics 中的定位：它不是 PDE 求解器，而是面向刚体控制、机器人和强化学习的高吞吐仿真平台。它把“物理环境”变成可微、可批量化的机器学习组件。

##### 来源限制与当前项目状态

论文和 Google Research 博客描述的是 2021 年 Brax 初始设计。GitHub README 的当前说明显示，Brax 后续演化出多个 physics pipelines，包括 MJX、Generalized、Positional 和 Spring，并提示较新的维护重点更多放在 `brax/training` 以及与 MJX/MuJoCo Playground 相关的训练流程上。因此，本文的方法解读以 2021 论文中的原始 Brax 设计为主，同时把 GitHub README 作为项目现状来源。

> ⚠️ 注意：Brax 为了大规模并行和可微性做了工程取舍。若任务要求最高物理保真度、复杂接触稳定性或严格 sim-to-real，一般需要进一步验证与 MuJoCo、MJX、Isaac Gym 等引擎的差异。

#### 🧪 练习题

```yaml
question: "Brax 相比传统 CPU 物理引擎在 RL 训练中的核心优势是什么？"
options:
  - "把环境 step、批量 rollout 和策略优化写成 JAX 程序，在同一 accelerator 上编译并并行执行"
  - "完全省略碰撞、关节和执行器计算，只保留奖励函数"
  - "通过 Fourier 变换求解刚体动力学方程"
  - "每个环境使用一个独立 Python 进程以提高可解释性"
answer: 0
explain: "Brax 的关键优势来自 JAX 原生实现、批量向量化、JIT 编译和同设备训练闭环，从而显著减少仿真吞吐和数据搬运瓶颈。"
```
