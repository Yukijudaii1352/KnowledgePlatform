### MetaWorld — MetaWorld元学习基准 (MetaWorld)

```yaml
id: metaworld
name: MetaWorld
full_name: MetaWorld元学习基准 (MetaWorld)
year: "2020"
org: Berkeley
paper_url: https://arxiv.org/abs/1910.10897
category: benchmark
parent: mujoco
motivation: 50个操作任务，评估元学习与多任务泛化
```

#### 📝 一句话总结
MetaWorld 用 MuJoCo 中 50 个 Sawyer 机械臂桌面操作任务系统评估多任务强化学习和元强化学习，揭示当任务分布足够宽时现有算法的泛化能力仍然有限。

#### 🎯 核心要点
- **任务设计**：50 个任务共享机器人和工作台，但目标、物体和交互模式不同，避免只评估微小参数变化。
- **协议清晰**：提供 MT10/MT50 多任务学习、ML1/ML10/ML45 元学习等标准划分。
- **评价重点**：关注训练任务成功率、新任务适应速度和跨任务泛化，而非单任务最高分。
- **结论影响**：论文显示主流 multi-task RL 和 meta-RL 在广泛操作分布上仍有明显性能瓶颈。

#### 🔬 深入细节

##### 核心示意图
![MetaWorld 50 manipulation tasks](https://ar5iv.labs.arxiv.org/html/1910.10897/assets/x1.png)

*图示展示 MetaWorld 的 50 个操作任务，以及用于训练和测试的任务划分。*

##### 算法伪代码
```python
def evaluate_metaworld(protocol, algorithm):
    train_tasks, test_tasks = protocol.split_tasks()
    for iteration in range(protocol.train_steps):
        task = sample(train_tasks)
        rollout = collect_rollout(task.env, algorithm.policy(task))
        algorithm.update(rollout, task_id=task.id if protocol.uses_task_id else None)

    results = {}
    for task in test_tasks:
        adapted_policy = algorithm.adapt(task.support_data)
        results[task.name] = measure_success_rate(task.env, adapted_policy)
    return aggregate(results)
```

##### 背景与动机
在 MetaWorld 之前，很多元强化学习基准只在同一任务的参数变化上评估，例如目标点不同、速度不同或物体位置不同。这样的设置可能高估泛化能力，因为算法只需学会在一个窄分布内快速调参。MetaWorld 则把分布扩展到 50 个语义不同的桌面操作任务，如开门、按按钮、推物体、取放、插拔等。

多任务强化学习目标可写为：

$$
\max_{\pi}\ \mathbb{E}_{\mathcal{T}\sim p(\mathcal{T})}
\left[\mathbb{E}_{\pi}\sum_{t=0}^{T}\gamma^t r_{\mathcal{T}}(s_t,a_t)\right]
$$

MetaWorld 的关键是让 \(p(\mathcal{T})\) 足够宽，使该目标真正考验共享技能、任务识别和快速适应。

##### 协议设计
MetaWorld 区分多任务学习和元学习。MT10/MT50 要求算法同时学习 10 或 50 个训练任务，通常可使用任务 ID；ML10/ML45 则把一部分任务保留为 meta-test，训练时见到的是任务分布，测试时需要利用少量交互适应新任务。ML1/MT1 则用于分析单个任务内部变化。

成功指标通常基于末端或物体到目标的距离，例如：

$$
\text{success}=\mathbb{1}[\lVert o-g\rVert_2<\epsilon]
$$

这种二值指标虽简单，但能跨任务统一比较。奖励函数则常加入 shaped distance reward，帮助 RL 训练。

##### 实验启示
论文评估了多任务 PPO/TRPO/SAC、带任务嵌入的策略以及 RL^2、MAML、PEARL 等 meta-RL 方法。结果显示，算法在少量任务上可以取得不错表现，但任务数增大后成功率显著下降；meta-test 新任务上的快速适应也远未达到理想水平。

MetaWorld 的价值在于提供了“难但受控”的测试床。它不像真实家庭环境那样视觉和物理复杂，也不涉及语言，但在任务分布维度上足够系统。对于研究多任务表征、策略条件化、上下文推断和元学习，它仍然是一个常用基准。
