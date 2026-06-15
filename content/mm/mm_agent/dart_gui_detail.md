### DART-GUI

```yaml
id: dart_gui
name: DART-GUI
full_name: "解耦智能体强化学习 (DART-GUI)"
year: "2026"
org: "UC Berkeley"
paper_url: "https://openreview.net/forum?id=fNFnJ9thLa"
category: "frontier_2026"
parent: "ui_voyager"
motivation: "异步采样与训练提升RL吞吐量"
```

#### 📝 一句话总结

DART-GUI 提出了解耦式 GUI Agent 强化学习训练框架，将环境交互、rollout 推理、数据管理和训练更新拆成异步模块，解决 GUI 多轮 RL 中环境慢、GPU 等待和高质量交互样本不足的问题。它通过自适应数据整理和异步训练，在 OSWorld 上显著提升 7B GUI Agent 成功率与系统吞吐。

#### 🎯 核心要点

- DART 表示 Decoupled Agentic RL Training，面向 VLM GUI Agent 的多轮 RL
- 四个异步模块：Environment Cluster、Rollout Service、Data Manager、Trainer
- rollout-wise trajectory sampling 将整条轨迹作为调度单元，减少空闲环境和空闲 GPU
- per-worker model synchronization 让 worker 渐进同步新权重，避免全局阻塞
- adaptive data curation 包含任务难度自适应 rollout、经验池、高熵步骤筛选和截断重要性采样
- Trainer 使用 step-wise GRPO 更新，重点训练高不确定性关键步骤
- 项目页报告 DART-GUI-7B 在 OSWorld 达到 42.13% task success rate，并提升 rollout GPU 利用率、训练吞吐和环境利用率

#### 🔬 深入细节

##### 框架总览

![DART-GUI 解耦训练框架](https://computer-use-agents.github.io/dart-gui/stats/framework.png)
*图：DART-GUI 将 GUI Agent RL 拆为环境集群、rollout 服务、数据管理器和训练器四个异步模块。*

##### 算法流程

```python
# DART-GUI 异步 RL 训练伪代码
env_cluster = launch_desktop_envs(num_envs=hundreds)
rollout_service = launch_policy_workers(policy)
data_manager = TrajectoryStore()
trainer = GRPOTrainer(policy)

while training:
    # Environment Cluster: 并行执行 GUI 任务
    for env in env_cluster.ready_envs():
        task = data_manager.assign_task(env)
        rollout_service.enqueue(env, task)

    # Rollout Service: 以轨迹为单位生成动作与思考
    for worker in rollout_service.idle_workers():
        traj = worker.sample_trajectory(max_len=data_manager.length_for(task))
        data_manager.add(traj, reward=evaluate(traj))

    # Data Manager: 自适应筛选训练样本
    batch = data_manager.sample(
        include_experience_pool=True,
        select_high_entropy_steps=True,
        adjust_rollout_by_task_difficulty=True,
    )

    # Trainer: 异步执行 step-wise GRPO
    loss = trainer.step(batch, truncated_importance_sampling=True)
    rollout_service.sync_weights_per_worker(policy)
```

##### 方法细节

DART-GUI 的主要矛盾不是“奖励函数怎么写”，而是 GUI 环境交互太慢导致 RL 系统低效。每一步 GUI 操作都要等待桌面或浏览器响应、截图、解析状态、再调用大模型生成下一步。若使用传统同步 RL 流程，所有环境必须等待最慢 rollout，GPU 也会在环境执行期间空转。

DART 将系统拆成四个异步模块。Environment Cluster 负责启动大量桌面环境并并行执行任务；Rollout Service 负责用当前策略生成 thought/action；Data Manager 负责存储、打分、过滤和调度轨迹；Trainer 负责从筛选后的样本中做策略更新。模块之间非阻塞通信，不要求环境采样和模型训练严格交替。

rollout-wise sampling 是系统效率的关键。传统 batch sampling 往往要求一批环境对齐步数，DART 把一条完整轨迹作为独立调度单元：哪个 worker 空闲，就接一个轨迹；哪个环境完成，就立即开始下一个任务。这样可以减少由于任务长度差异和 GUI 响应时间差异带来的等待。

数据整理方面，DART 不把所有 rollout 平等用于训练。它根据任务学习进度动态调整采样次数和最大轨迹长度：容易任务减少 rollout，困难任务保留更多探索；任务的轨迹长度参考历史成功轨迹，避免在短任务上浪费 100 步预算。对于极难任务，系统维护成功轨迹经验池，当在线采样全失败时也能给训练器至少一个正向学习信号。

高熵步骤筛选用于定位关键决策。对每个 step，系统计算生成 token 的平均熵，优先保留高不确定性步骤进行优化。直觉是很多 GUI 步骤是机械重复或低风险操作，训练它们收益有限；真正决定成败的是少数需要选择菜单、文件夹、按钮或输入内容的分叉步骤。

由于 rollout policy 和 trainer policy 在异步系统中可能不同步，DART 使用截断重要性采样稳定训练：

$$
\rho_t=\text{clip}\left(\frac{\pi_\theta(a_t\mid s_t)}{\pi_{\text{rollout}}(a_t\mid s_t)}, 0, c\right)
$$

梯度按 \(\rho_t\) 重加权，既利用异步采样带来的吞吐提升，又限制策略漂移导致的训练不稳定。Trainer 采用 step-wise GRPO 形式更新，使 GUI Agent 能从多步轨迹中更细粒度地学习。

项目页报告 DART-GUI-7B 在 OSWorld 上达到 42.13% 成功率，相比基线 UI-TARS-1.5-7B 有明显提升；系统效率上，rollout GPU 利用率、训练吞吐和环境利用率均提升。需要注意的是，任务清单给出的 OpenReview id 当前不如项目页和可检索公开条目稳定，但 YAML 中仍保留原始 `paper_url`。

> 💡 关键：DART-GUI 的创新点在“系统解耦 + 数据自适应”，它让 GUI RL 从慢速同步流程变成可持续流水线。

#### 🧪 练习题

```yaml
question: "DART-GUI 为什么要将环境、rollout、数据管理和训练解耦？"
options:
  - "为了让所有环境必须等待同一条轨迹完成"
  - "为了减少 GUI 交互延迟导致的 GPU/环境空闲，并支持异步采样与训练"
  - "为了取消所有奖励信号"
  - "为了只训练低熵、确定性最高的步骤"
answer: 1
explain: "GUI 环境交互慢且轨迹长度不一致，同步 RL 会造成大量等待。DART 的四模块异步设计能让环境、rollout 和训练持续并行运行。"
```
