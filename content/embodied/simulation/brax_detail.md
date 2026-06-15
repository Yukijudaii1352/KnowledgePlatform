### Brax

```yaml
id: brax
name: "Brax"
full_name: "Brax可微分引擎 (Brax Differentiable Engine)"
year: "2021"
org: "Google"
paper_url: "https://arxiv.org/abs/2106.13281"
category: "foundation"
parent: "mujoco"
motivation: "JAX原生可微分引擎，支持梯度优化策略"
```

#### 📝 一句话总结

Brax 提出了用 JAX 编写的可微分、大规模并行刚体仿真与强化学习套件，使环境步进、策略网络和优化算法能在同一 GPU/TPU 上 JIT 编译并并行运行，解决传统 CPU 物理仿真成为 RL 训练瓶颈的问题。

#### 🎯 核心要点

- **JAX 原生物理引擎**：仿真状态更新是纯函数，可被 `jit`、`vmap`、`pmap` 编译并在加速器上运行
- **大规模并行 rollout**：同一设备上同时推进成千上万个环境，减少 Python 调度和 CPU-GPU 数据传输
- **可微分模拟**：物理步进对状态、动作和参数可求导，支持 analytic policy gradient 和直接轨迹优化
- **MuJoCo-like 任务复刻**：提供 ant、humanoid、halfcheetah、walker 等连续控制任务，便于迁移既有 RL 基准
- **算法与环境同编译**：PPO、SAC、ES、ARS 等算法可与环境处理一起在 JAX 中编译运行
- **多物理 pipeline 演化**：后续仓库提供 MJX、generalized、positional、spring 等 pipeline；本文聚焦 2021 原始论文贡献

#### 🔬 深入细节

![Brax Humanoid 示例](https://raw.githubusercontent.com/google/brax/main/docs/img/humanoid_v2.gif)
*图：Brax 官方仓库中的 Humanoid 示例。ar5iv 未稳定导出论文图像，因此使用官方 README 公开动图说明 Brax 面向大规模连续控制任务的仿真形态。*

```python
# Brax + JAX 大规模并行训练伪代码
import jax
import jax.numpy as jnp

sys = load_brax_system("humanoid")
params = init_policy()

@jax.jit
def rollout_and_update(params, rng):
    state = reset_batch(sys, rng, batch_size=8192)

    def env_step(carry, _):
        state, rng = carry
        action = policy_apply(params, state.obs, rng)
        next_state = brax_step(sys, state, action)   # JAX 纯函数
        return (next_state, rng), (state.obs, action, next_state.reward)

    (_, _), trajectory = jax.lax.scan(env_step, (state, rng), None, length=horizon)
    loss = ppo_or_apg_loss(params, trajectory)
    grads = jax.grad(lambda p: ppo_or_apg_loss(p, trajectory))(params)
    return apply_optimizer(params, grads), loss
```

**动机与背景：环境不应成为 RL 的慢环节**

连续控制 RL 的样本需求很大，传统流程通常是 CPU 仿真器生成状态，GPU 训练神经网络，两者之间频繁传输数据。即使单个物理步足够快，成千上万次 rollout 的 Python 调度、进程通信和 CPU-GPU copy 也会成为瓶颈。Brax 的核心动机是把“仿真 + 策略 + 优化”全部写成 JAX 计算图，让加速器既负责神经网络，也负责环境批量推进。

**核心机制：纯函数物理步进与并行化**

Brax 的环境状态可以抽象为 \(s_t=(q_t, v_t, \text{obs}_t)\)，动作 \(a_t\) 由策略给出，物理引擎实现一个可组合的状态转移：

$$
s_{t+1} = f_{\phi}(s_t, a_t)
$$

这里 \(\phi\) 表示系统参数，如质量、惯量、关节、接触和执行器配置。因为 \(f_\phi\) 是 JAX 函数，批量环境可以直接写成：

$$
\{s_{t+1}^{(i)}\}_{i=1}^{N} =
\mathrm{vmap}(f_{\phi})\left(\{s_t^{(i)}\}_{i=1}^{N}, \{a_t^{(i)}\}_{i=1}^{N}\right)
$$

直觉上，Brax 不是开 8192 个 Python 环境进程，而是把 8192 个环境变成一个大张量计算，让 XLA 在 GPU/TPU 上一次性调度。

**可微分性的意义**

传统 RL 常把环境视为黑盒，只能用策略梯度估计 \(\nabla_\theta \mathbb{E}[R]\)。如果环境转移可微，回报梯度可以沿着时间展开反传：

$$
\nabla_{\theta} R
= \sum_t
\frac{\partial r_t}{\partial s_t}
\frac{\partial s_t}{\partial a_t}
\frac{\partial a_t}{\partial \theta}
$$

这使 analytic policy gradient、轨迹优化和系统参数优化成为可能。当然，接触和摩擦处的真实动力学并不总是光滑；Brax 的设计是在物理近似、可微性和大规模并行速度之间取舍。

**训练流程：RL 算法和环境在同一设备闭环**

在 Brax 中，PPO/SAC/ES 不再只是调用一个外部环境 API，而是和环境 rollout 一起被 JIT 编译。训练过程通常是：批量 reset 环境，使用当前策略并行 rollout，计算 advantage 或回报，执行优化器更新，再继续下一轮。由于 rollout 和学习都在同一设备上，吞吐量可以达到传统 CPU 仿真难以接近的规模，论文强调常见 MuJoCo-like 任务可以在分钟级训练出有效策略。

**与 MuJoCo/DM Control 的区别**

MuJoCo 重视高质量接触动力学和控制建模，DM Control 重视标准任务定义；Brax 的重点则是“加速器原生”和“可微并行”。它更适合需要海量 rollout、可微物理或端到端 JAX 训练的研究。代价是物理近似和接触行为与 MuJoCo 并不完全等价，后续 MJX 的出现也说明社区在继续寻找“MuJoCo 物理精度 + JAX 并行能力”的结合点。

> 💡 关键：Brax 把环境从 CPU 黑盒变成 JAX 计算图，真正改变的是 RL 系统的计算拓扑，而不仅是替换一个物理引擎。

#### 🧪 练习题

```yaml
question: "Brax 相比传统 CPU 物理仿真器最核心的系统优势是什么？"
options:
  - "只能运行单个环境以提高精度"
  - "将环境步进、策略和优化写成 JAX 计算图，在加速器上大规模并行运行"
  - "完全不使用神经网络策略"
  - "只支持离散网格世界"
answer: 1
explain: "Brax 的关键是 JAX 原生、可 JIT/vmap/pmap，并能把成千上万个环境 rollout 与学习算法放在同一 GPU/TPU 上。"
```
