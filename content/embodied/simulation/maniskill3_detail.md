### ManiSkill3 — ManiSkill3 GPU并行操作基准 (ManiSkill3)

```yaml
id: maniskill3
name: ManiSkill3
full_name: ManiSkill3 GPU并行操作基准 (ManiSkill3)
year: "2024"
org: UCSD
paper_url: https://arxiv.org/abs/2410.00425
category: benchmark
parent: sapien
motivation: 关节物体引擎支撑大规模并行操作基准
```

#### 📝 一句话总结
ManiSkill3 在 SAPIEN/PhysX 之上提供 GPU 并行仿真与渲染，把操作任务、机器人、演示生成和主流 RL/LfD/VLA 基线整合成面向大规模 embodied AI 的高速基准。

#### 🎯 核心要点
- **核心升级**：同时并行物理仿真和视觉渲染，显著提高状态和视觉强化学习吞吐。
- **异构环境**：支持每个并行环境加载不同物体、关节结构或场景，而不仅是同一任务的复制。
- **任务覆盖**：包含多类操作任务、二十余种机器人和状态/RGB/点云/体素等观测。
- **算法生态**：内置 PPO、SAC、TD-MPC2、BC、Diffusion Policy、ACT、PerACT 以及 VLA 评估流程。

#### 🔬 深入细节

##### 核心示意图
![ManiSkill3 GPU parallel task suite](https://ar5iv.labs.arxiv.org/html/2410.00425/assets/x1.png)

*图示展示 ManiSkill3 覆盖的多类 GPU 并行机器人操作任务和环境形态。*

##### 算法伪代码
```python
def train_maniskill3_gpu(task_config, policy):
    envs = make_vectorized_gpu_envs(
        task=task_config.task,
        num_envs=task_config.num_envs,
        heterogeneous_assets=task_config.heterogeneous_assets,
        observation_mode=task_config.obs_mode,
    )

    obs = envs.reset()
    while not converged(policy):
        actions = policy(obs)
        next_obs, rewards, dones, infos = envs.step(actions)
        policy.update(obs, actions, rewards, next_obs, dones)
        obs = envs.reset_done(next_obs, dones)
    return policy
```

##### 背景与动机
机器人操作 RL 的训练成本长期受仿真吞吐限制。CPU 串行环境在状态任务上尚可，但一旦加入 RGB、深度或点云渲染，数据生成速度会成为主要瓶颈。ManiSkill3 的目标是把物理、渲染和环境批处理尽可能搬到 GPU 上，使研究者可以在较短时间内训练和比较复杂策略。

向量化仿真可表示为：

$$
S_{t+1}^{1:N}=\text{SimGPU}(S_t^{1:N},A_t^{1:N})
$$

其中 \(N\) 是并行环境数。关键不只是批量推进同一个世界，而是支持异构环境：不同副本可以拥有不同物体实例、关节物体、房间或初始状态。这对泛化训练尤其重要。

##### 系统机制
ManiSkill3 基于 SAPIEN 和 PhysX，提供 GPU parallelized simulation/rendering，并支持 state、RGB、depth、point cloud、voxel 等观测模式。它覆盖单臂、双臂、移动操作、关节物体交互等任务类别，并提供二十余种机器人配置。相比只追求任务数量的基准，ManiSkill3 更强调“高速训练 + 多模态观测 + 可复现实验脚本”的组合。

论文还提供演示生成和回放流水线。演示可以来自运动规划、RL 或遥操作，并能在 CPU/GPU 路径间回放、转换动作表示。这对 imitation learning 很关键，因为示教格式、控制频率和动作空间不一致常常阻碍算法比较。

##### 基线与意义
ManiSkill3 把 RL、LfD 和 VLA 放在同一平台中评估。对于 RL，它提供 PPO、SAC、TD-MPC2 等基线；对于模仿学习，提供 BC、Diffusion Policy、ACT、PerACT；对于视觉语言动作模型，还包括 Octo、RT-X、RDT 等评估入口。统一平台降低了“不同任务/不同仿真器/不同观测管线”带来的比较噪声。

高速并行也改变了实验设计。过去研究者可能因为训练成本只报告少量种子或小规模任务，现在可以更系统地做 ablation、domain randomization 和大规模视觉训练。ManiSkill3 的局限是仿真到真实仍需额外验证，但作为大规模操作算法开发平台，它显著提高了迭代效率。
