### MO-Playground多目标强化学习平台 (MO-Playground)

```yaml
id: mo_playground
name: MO-Playground
full_name: MO-Playground多目标强化学习平台 (MO-Playground)
year: '2026.03'
org: PKU
paper_url: https://arxiv.org/abs/2603.09237
category: parallel
parent: isaac_gym
motivation: 针对多目标强化学习的大规模并行化平台
```

#### 📝 一句话总结
MO-Playground 提出 GPU 并行多目标强化学习框架 MORLAX 和一组多目标 MJX 环境，用偏好向量条件化 hypernetwork 连续近似 Pareto 策略族，解决传统 MORL 难以大规模并行、训练耗时过长的问题。

#### 🎯 核心要点
- 将单目标 MDP 扩展为 MOMDP，奖励为 \(R:S\times A\rightarrow\mathbb{R}^m\)，目标是学习 Pareto-optimal policy family。
- 提出 MORLAX：JAX/GPU-native 的多目标 actor-critic 算法，使用 actor hypernetwork 和 critic hypernetwork。
- 输入 trade-off vector \(w\in\Delta^{m-1}\)，输出对应偏好下的 actor/critic 参数，实现连续 Pareto set 表示。
- 在 rollout 时并行采样多个偏好向量，并把每个偏好对应策略分配到大量并行环境中采集数据。
- 使用多目标 PPO：对每个目标独立估计 GAE，再用 \(w^\top A_t\) 标量化优势函数更新 hypernetwork。
- 提供 Cheetah、Walker、Ant、Humanoid、Hopper 等多目标 MJX 环境，并支持 numpy/jax backend。
- 相比 CPU HYPER-MORL，论文报告 21-270x 速度提升和更高 Pareto front hypervolume；BRUCE 人形机器人 6 目标 locomotion 约 2 小时完成 Pareto set 训练。

#### 🔬 深入细节
![MORLAX 架构](https://arxiv.org/html/2603.09237v1/x1.png)
*图：MORLAX 选择 trade-off vector，经过 policy hypernetwork 生成策略，并通过并行 sample-rollout-update 学习 Pareto 策略族。*

```python
# MORLAX 训练伪代码
envs = make_mo_env(num_envs=N, reward_dim=m, backend="jax")
H_pi = ActorHyperNetwork()   # w -> actor parameters
H_v = CriticHyperNetwork()   # w -> vector-value critic parameters

for iteration in range(num_iterations):
    W = sample_dirichlet_tradeoffs(K, dim=m)      # K 个偏好向量
    W_rep = repeat_to_num_envs(W, N)              # 每个偏好跑多个环境

    rollout = []
    for env_i, w_i in zip(envs, W_rep):
        theta_i = H_pi(w_i)
        phi_i = H_v(w_i)
        traj = rollout_policy(env_i, theta_i, phi_i)
        rollout.append((traj, w_i))

    A_vec = generalized_advantage_estimation_per_objective(rollout)
    A_scalar = [w_i @ A_i for A_i, w_i in zip(A_vec, W_rep)]

    loss_actor = clipped_ppo_surrogate(H_pi, rollout, A_scalar)
    loss_critic = vector_value_loss(H_v, rollout)
    update(H_pi, loss_actor)
    update(H_v, loss_critic)
```

多目标强化学习的难点是：现实机器人目标很少能自然压成一个固定 reward。例如人形行走同时关心速度跟踪、能耗、平滑性、关节跟踪、手臂摆动和上肢稳定；不同用户或场景下这些目标权重不同。单目标 RL 只能在训练前写死一个权重，MORL 则希望训练后仍能调节偏好。

MOMDP 中策略的期望回报是向量：

$$
J^\pi=\mathbb{E}_{s_0\sim D_{s_0}}\left[V^\pi(s_0)\right]\in\mathbb{R}^m
$$

若策略 \(\pi'\) 在所有目标上不差于 \(\pi\)，且至少一个目标更好，则 \(\pi'\) Pareto dominates \(\pi\)。不被任何策略支配的策略组成 Pareto set，对应 objective space 中的 Pareto front。MORLAX 用线性标量化：

$$
w^\top R,\quad w\in\Delta^{m-1},\quad \sum_i w_i=1,\ w_i\ge 0
$$

把每个偏好方向转成一个可训练的 RL 目标。

MORLAX 的核心是 hypernetwork 表示。它不为每个 Pareto 策略单独训练一个网络，而是训练映射：

$$
H_\pi:\Delta^{m-1}\rightarrow\Theta_\pi,\qquad
H_V:\Delta^{m-1}\rightarrow\Theta_V
$$

给定偏好向量 \(w\)，actor hypernetwork 输出策略参数 \(\theta=H_\pi(w)\)，critic hypernetwork 输出向量价值网络参数 \(\phi=H_V(w)\)。论文采用低秩/仿射形式 \(H_\pi(w)=M_\pi f_\pi(w)+b_\pi\)，降低参数维度并提高连续 Pareto set 表达效率。

并行化是另一个关键。每轮先从 Dirichlet 分布采样 \(K\) 个 trade-off vectors，再复制到 \(N\) 个并行环境中；同一 \(w\) 可对应多个 stochastic rollout，提高估计稳定性。更新时对每个目标单独算 GAE 得到向量优势 \(A_t\in\mathbb{R}^m\)，再用 \(w^\top A_t\) 标量化进入 PPO 裁剪目标。这样既保留 PPO 的稳定性，又能让不同偏好方向共享 hypernetwork 参数。

相比 HYPER-MORL，MORLAX 的优势不只是“跑在 GPU 上”，还包括 actor/critic hypernetwork 分离更新、Dirichlet 偏好采样、无需 warm-up 以及对 MJX 环境的批量 rollout 支持。实验中，MORLAX 在五个多目标控制环境上获得更高 hypervolume，并在达到同等目标 hypervolume 的时间上快 21-270x。

> ⚠️ 注意：线性标量化主要发现凸 Pareto front；若真实 Pareto front 有明显凹段，MORLAX 仍可能漏掉一部分非凸权衡。

#### 🧪 练习题
```yaml
question: "MORLAX 中 trade-off vector w 的作用是什么？"
options:
  - "表示机器人观测向量"
  - "表示不同目标的偏好权重，用于从 hypernetwork 生成对应策略并标量化优势函数"
  - "表示环境随机种子"
  - "只用于初始化网络权重，训练后不再使用"
answer: 1
explain: "w 位于目标权重 simplex 上，指定当前优化方向；MORLAX 根据 w 输出策略，并用 wᵀA 更新。"
```
