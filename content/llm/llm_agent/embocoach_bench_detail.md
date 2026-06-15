### EmboCoach-Bench：评测数字 Agent 作为具身策略开发教练

```yaml
id: embocoach_bench
name: EmboCoach-Bench
full_name: 具身教练基准 (EmboCoach-Bench)
year: 2026
org: arXiv
paper_url: https://arxiv.org/abs/2601.21570
category: frontier_2026
parent: agentbench
motivation: 首个具身机器人开发Agent基准
```

#### 📝 一句话总结

EmboCoach-Bench 评估数字 Agent 是否能像具身学习教练一样，根据日志、训练曲线和 rollout 视频改写奖励、损失、结构或超参数来提升机器人策略。

#### 🎯 核心要点

- **核心问题**：现有具身智能基准多评估训练好的策略，而不是评估能否自动开发和改进策略的 Agent。
- **系统对象**：论文提出 RoboCoach，让 LLM/VLM Agent 在训练反馈中迭代修改机器人学习代码。
- **基准范围**：覆盖 ManiSkill、RoboTwin、Robomimic 和 MetaWorld 等模拟平台，包含强化学习与模仿学习任务。
- **反馈来源**：文本日志、错误栈、奖励曲线、成功率和 rollout 视频共同驱动修正。
- **评测重点**：看 Agent 的代码修改是否可运行、可训练，并最终提升策略成功率。

#### 🔬 深入细节

![EmboCoach-Bench overview](https://youngsoul0731.github.io/images/embocoach-bench.png)

*图源：论文作者公开主页图片，展示 EmboCoach/RoboCoach 基准面向具身策略开发的任务结构。*

```python
def robocoach(task_spec, simulator, initial_code):
    tree_memory = TreeMemory(root=initial_code)
    current_code = initial_code

    for iteration in range(MAX_ITERS):
        logs, metrics, videos = train_and_rollout(simulator, current_code)
        diagnosis = analyze_feedback(
            task_spec=task_spec,
            logs=logs,
            metrics=metrics,
            videos=videos,
        )
        if diagnosis.success:
            break
        proposal = llm_edit_code(
            code=current_code,
            diagnosis=diagnosis,
            targets=["reward", "loss", "architecture", "hyperparameters"],
        )
        if passes_static_and_runtime_checks(proposal):
            tree_memory.add_child(current_code, proposal, diagnosis)
            current_code = proposal
        else:
            current_code = tree_memory.backtrack()

    return select_best_policy(tree_memory)
```

**方法动机**：EmboCoach-Bench 关注“开发策略的 Agent”，而不是单个机器人策略。具身学习中的成功率 $S(\theta)$ 受奖励函数、损失、网络结构、超参数和数据处理影响；RoboCoach 的目标是通过代码修改 $\Delta c_t$ 使 $S(\theta(c_t+\Delta c_t))$ 提升。

**闭环教练系统**：RoboCoach 接收自然语言任务说明和操作接口，运行训练，读取终端日志、数值指标和 rollout 视频，再判断是继续训练、回滚还是重写某部分代码。这个闭环使 Agent 不只是建议文本，而是直接参与策略开发过程。

**多模态反馈**：具身任务的失败常体现在视觉行为中，例如抓取偏移、接触失败或动作顺序错误，仅看 reward 曲线不够。系统引入 VLM 分析 rollout 视频，把“机器人为什么失败”转成可操作诊断，再指导奖励设计或模型结构修改。

**基准意义**：EmboCoach-Bench 将 AgentBench 式交互评测推进到机器人开发场景。它评估的是可运行性、训练稳定性和最终策略效果，能暴露 Agent 在代码理解、实验设计、长期迭代和物理直觉上的综合短板。

#### 🧪 练习题

```yaml
question: EmboCoach-Bench 主要评估 Agent 的哪类能力？
options:
  - A. 根据训练和视频反馈迭代改进具身机器人策略开发代码
  - B. 只回答常识问答
  - C. 只生成网页 CSS
  - D. 只压缩图片
answer: A
explain: 该基准关注数字 Agent 能否在具身学习闭环中修改奖励、损失、结构或超参数并提升策略表现。
```
