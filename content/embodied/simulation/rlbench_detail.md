### RLBench — RLBench机器人学习基准 (RLBench)

```yaml
id: rlbench
name: RLBench
full_name: RLBench机器人学习基准 (RLBench)
year: "2020"
org: Imperial
paper_url: https://arxiv.org/abs/1909.12271
category: benchmark
parent: vrep
motivation: 提供100个手工任务，支持少样本学习测试
```

#### 📝 一句话总结
RLBench 基于 CoppeliaSim/V-REP 和 PyRep 提供 100 个手工设计机器人操作任务，用自动演示生成、语言变化和少样本协议评估机器人学习算法的泛化能力。

#### 🎯 核心要点
- **任务规模**：包含 100 个独特任务，而不只是同一任务的参数扰动。
- **演示生成**：每个任务通过 waypoint 和运动规划自动生成大量专家演示，降低人工采集成本。
- **观测丰富**：提供多视角 RGB、深度、分割、末端相机和 proprioception，适合视觉模仿学习。
- **评估协议**：定义 task、variation、episode 和 K-shot 设置，测试模型对新任务/新变化的快速适应。

#### 🔬 深入细节

##### 核心示意图
![RLBench task grid](https://ar5iv.labs.arxiv.org/html/1909.12271/assets/task_grid.png)

*图示展示 RLBench 100 个机器人操作任务中的一部分，体现其任务类型和物体交互多样性。*

##### 算法伪代码
```python
def evaluate_rlbench_few_shot(train_tasks, test_task, k, learner):
    demos = {}
    for task in train_tasks:
        demos[task] = generate_waypoint_demos(task, num_episodes="many")
    learner.meta_train(demos)

    support = generate_waypoint_demos(test_task, num_episodes=k)
    learner.adapt(support)

    scores = []
    for variation in test_task.heldout_variations:
        obs = test_task.reset(variation)
        scores.append(rollout_success(learner.policy, obs))
    return mean(scores)
```

##### 背景与动机
机器人学习需要多任务、多变化和可复现演示，但真实机器人上收集 100 个任务的数据几乎不可承受。RLBench 的目标是提供一个任务丰富、演示可自动生成、评估协议清晰的仿真基准。它使用 Franka Panda 机械臂和 CoppeliaSim/V-REP，通过 PyRep 暴露 Python 接口。

一个任务可以表示为变化分布上的轨迹集合：

$$
\tau=\{(o_t,a_t)\}_{t=1}^{T}, \quad v\sim p_{\text{variation}}(\mathcal{T})
$$

其中 \(v\) 可以改变物体颜色、位置、目标抽屉、按钮或语言描述。RLBench 强调算法不能只记住固定场景，而要从少量示例中理解任务结构。

##### 任务与演示
RLBench 的每个任务由手工编写的场景、成功条件、变化采样器和 waypoint 组成。系统用运动规划器从 waypoint 生成专家轨迹，并记录图像、深度、分割和机器人状态。这种方法兼顾了任务多样性和演示可扩展性：人工只需设计任务逻辑，不必手动遥操作每一条轨迹。

任务还配有自然语言描述，同一个任务变化可以对应不同指令。例如“把红色块放进抽屉”与“按下绿色按钮”都需要视觉 grounding 和动作执行。语言在这里不是装饰，而是定义变化条件和目标对象的重要信息。

##### 少样本评估
RLBench 的少样本挑战把训练任务和测试任务分开，测试时只给新任务的 \(K\) 条演示，常见设置包括 1-shot、5-shot 和 20-shot。理想算法应从支持集 \(D_K=\{\tau_i\}_{i=1}^{K}\) 快速适应，并在新变化上成功执行：

$$
\pi_{\mathcal{T}} = \text{Adapt}(\pi_0, D_K)
$$

这使 RLBench 成为评估 meta-learning、imitation learning 和视觉语言策略的早期重要平台。它的局限是仿真任务仍由人工设计，物理复杂度有限；但其标准化任务数量和自动演示机制对后续机器人基准影响很大。
