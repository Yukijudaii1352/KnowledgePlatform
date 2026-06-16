### EmboCoach-Bench：具身教练基准 (EmboCoach-Bench)

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
EmboCoach-Bench 对应论文中的 RoboCoach / RoboCoach-Bench，提出一个评测 LLM Agent 是否能自主开发、训练、诊断和修正机器人策略的具身工程基准，解决以往 benchmark 只评估最终策略而不评估“从任务说明到物理成功”的闭环开发能力问题。

#### 🎯 核心要点
- 系统与基准：论文提出 RoboCoach 自主多模态 agent 系统，以及 RoboCoach-Bench 32 任务具身策略开发基准。
- 任务形式化：每个任务是 \(\mathcal{T}=(\mathcal{D}_{\mathrm{prd}},\mathcal{P}_{\mathrm{sys}},\mathcal{C}_{\mathrm{env}})\)，分别表示语义任务说明、数字操作接口和开发/仿真环境。
- 闭环工作流：agent 从自然语言任务说明出发，生成训练方案和代码，执行调试/训练，读取日志、曲线、成功率和 rollout 视频，再迭代修正策略。
- 三类物理反馈：textual execution signals、quantitative training signals、video rollout observations，分别诊断实现错误、优化失败和行为级物理失败。
- 树状记忆与分支搜索：每个节点保存一次完整物理实验，feedback agent 可选择继续当前分支、回滚到最佳节点或从 baseline 重启。
- 双智能体循环：coding agent 负责 Draft / Debug / Improve 局部编辑，feedback agent 负责基于物理证据选择下一轮父节点和改进方向。
- 覆盖范围：32 个专家构造任务，来自 ManiSkill、RoboTwin、Robomimic、MetaWorld 四个平台，覆盖 RL、IL、MLP、RNN、ACT、Diffusion Policy、VLA 等策略类型。
- 评价指标：所有仿真任务统一用 100 episodes 的二元任务完成率，不用代码质量、reward 大小或人工偏好替代物理成功。
- 主要结果：七个前沿模型上，RoboCoach 平均成功率 0.730，高于平台人类专家参考 0.602；单模型聚合中从 non-agentic 0.40 提升到 RoboCoach 0.80，高于 human reference 0.60。

#### 🔬 深入细节

![RoboCoach 闭环具身策略开发框架](https://arxiv.org/html/2601.21570v2/x3.png)
*图：论文 Figure 2。RoboCoach 将任务说明、代码仓库和开发工具接入 LLM Agent，通过执行日志、训练信号、rollout 视频诊断和树状记忆形成反馈驱动的具身策略开发闭环。*

这篇论文的问题设定非常具体：数字 agent 已经能写代码、跑实验、调试机器学习工程，但这些能力是否能转化为物理能力？在机器人任务中，“代码能跑”远远不等于“策略能完成任务”。策略可能无报错、loss 下降、reward 上升，却仍然因为抓取姿态错误、接触不稳定、轨迹偏离或视觉对齐失败而无法完成实际任务。RoboCoach-Bench 因此评估的不是机器人 policy 本身，也不是 LLM 的一次性代码生成能力，而是 LLM Agent 是否能像机器人研究员一样闭环地开发 policy。

论文把每个具身工程任务形式化为三元组：

$$
\mathcal{T}=\bigl(\mathcal{D}_{\mathrm{prd}},\;\mathcal{P}_{\mathrm{sys}},\;\mathcal{C}_{\mathrm{env}}\bigr)
$$

其中 \(\mathcal{D}_{\mathrm{prd}}\) 是结构化自然语言任务说明，包含优化目标、资源预算、不可修改的评价指标、文件访问限制和物理先验，但不提供演示、奖励梯度或标注轨迹；\(\mathcal{P}_{\mathrm{sys}}\) 是数字操作接口，包括 terminal、file editor、task tracker 等，agent 只能通过代码和工具间接影响环境；\(\mathcal{C}_{\mathrm{env}}\) 是开发底座，可能是可运行但次优的人类代码库，也可能是缺少核心逻辑的 skeleton。这个形式化把“数字动作”和“物理成功”之间的缺口明确暴露出来。

```python
# RoboCoach / EmboCoach-Bench 闭环开发伪代码

def robocoach(task_tuple, base_model, max_rounds):
    D_prd, P_sys, C_env = task_tuple
    tree = ExperimentTree(root=C_env.initial_codebase())

    for round_id in range(max_rounds):
        parent = feedback_agent.select_parent(
            tree,
            policy=["extend_current", "rollback_best", "restart_baseline"]
        )

        workspace = P_sys.clone_workspace(parent.code_state)

        proposal = coding_agent.draft_debug_improve(
            task_spec=D_prd,
            workspace=workspace,
            feedback=parent.feedback_summary
        )

        exec_log = P_sys.debug_test(proposal, episodes=10)
        train_record = P_sys.launch_training(proposal)
        metrics = P_sys.query_training_curves(train_record)
        rollout_video = C_env.rollout_best_checkpoint(train_record)
        video_diag = vlm_agent.summarize_behavior(rollout_video)

        success_rate = C_env.evaluate(train_record.policy, episodes=100)
        node = tree.add_node(
            parent=parent,
            code_state=proposal,
            exec_log=exec_log,
            metrics=metrics,
            video_diag=video_diag,
            success_rate=success_rate
        )

        if success_rate >= task_success_threshold(D_prd):
            return node.best_policy

    return tree.best_node().best_policy
```

RoboCoach 的第一层反馈是 textual execution signals。它负责发现语法错误、依赖配置错误、运行时异常、实验脚本逻辑错误等实现层失败。论文中特别提到轻量 `debug_test`：在提交完整训练前先跑短验证，以便尽早发现代码不可运行的问题。这一层很像普通 coding agent 的调试能力，但在具身任务中只是最低门槛，因为可运行代码仍可能产生完全无效的机器人行为。

第二层是 quantitative training signals。agent 会读取训练曲线、reward、loss、running success rate 等数值信号，用于判断优化是否发散、停滞、奖励坍塌或超参设置失败。这个层次解决的是“训练有没有学到东西”，但仍然不能保证物理正确性。特别是 imitation learning 或 diffusion policy 场景中，loss 曲线可能平滑下降，而 rollout 时手臂仍可能抖动、偏离、撞开物体或没有形成有效接触。

第三层是 video rollout observations，也是这篇论文相对普通代码 agent 最具具身特色的部分。RoboCoach 用视觉语言模型分析 rollout 视频，把机器人行为转成结构化自然语言诊断，例如“接近阶段动作不连续导致物体被碰开，而不是稳定抓取”。这类行为级失败通常不会直接出现在日志或标量 reward 中，却是人类机器人研究员调试 policy 时最依赖的信息。论文把它称为 physically grounded feedback：agent 不直接控制机器人传感器和执行器，但通过视频诊断获得物理世界后果的可读表示。

RoboCoach 的记忆不是普通对话历史，而是 tree-structured memory。每个树节点保存一次完整具身实验：代码状态、执行结果、训练动态、rollout 观察、成功率和诊断摘要。边表示从哪个实验继承或分叉。feedback agent 每轮根据物理证据选择下一轮父节点，可以继续当前分支、回滚到全局最佳节点，或从 baseline 重启。这样，搜索依据的是真实成功率和物理行为，而不是最近一次回复或表面上看起来合理的代码 diff。

> 💡 关键：RoboCoach 的“搜索”不是传统 AutoML 超参网格搜索。它会同时修改奖励设计、模型容量、训练稳定性、数据增强、验证逻辑、checkpoint 策略、动作平滑和基础设施错误，并用物理任务完成率统一裁决这些改动是否有效。

RoboCoach-Bench 的基准设计同样重要。它包含 32 个专家构造任务，分为 21 个 improving setting 和 11 个 from-scratch setting。前者给 agent 一个可运行但次优的人类代码库，测试它能否进一步改进；后者只给 simulator binding 和高层模板，要求 agent 补全核心训练流程。平台覆盖 ManiSkill、RoboTwin、Robomimic、MetaWorld，学习范式覆盖强化学习与模仿学习，策略架构覆盖 MLP、RNN、Diffusion Policy、Action Chunking Transformer 和 VLA。

所有仿真任务的指标是二元任务完成率：

$$
\mathrm{SR}(\pi)=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\{\pi \text{ completes task in episode } i\},\quad N=100
$$

这个设计避免了具身 AI 中常见的指标错位：reward 变高、代码更整洁或 loss 更低，并不一定意味着机器人真的完成了任务。论文明确不允许用代码质量、reward magnitude 或人工主观判断替代 ground-truth completion。真实机器人迁移实验则在两个硬件实验室、四个任务上评估仿真收益是否能保留到物理机器人上。

实验结论说明，agentic workflow 的收益不只是来自更强 base model。non-agentic 条件已经给模型任务说明和完整代码库，但只做一次性生成，没有执行反馈；RoboCoach 激活闭环后，七模型平均从低于人类参考提升到 0.730，高于平台专家参考 0.602。单模型聚合中，Gemini 3.0 Pro 条件下 non-agentic 为 0.40，RoboCoach 为 0.80，人类参考为 0.60。消融结果显示，移除文本执行反馈、分支搜索、视频观察或数值训练信号都会降低成功率，其中文本执行反馈和分支搜索下降最大。

论文也给出边界：主证据仍以仿真为主，真实机器人只覆盖四个任务；分支搜索带来明显计算成本；任务说明、评价协议和可编辑接口都是受控且固定的。这意味着 RoboCoach-Bench 证明的是“有边界的 Level-2 自主具身策略开发”，还不是开放世界机器人自我进化。但它提供了一个很关键的评测范式：衡量数字 agent 能否把代码级干预，通过物理反馈、记忆和搜索，转化为可验证的机器人任务成功。

```yaml
question: "RoboCoach-Bench 为什么坚持用物理任务完成率作为唯一核心指标？"
options:
  - "因为代码质量、reward 和 loss 都无法稳定替代机器人是否真的完成任务"
  - "因为它只评估自然语言回答是否流畅"
  - "因为所有任务都没有仿真环境，只能人工打分"
  - "因为它不允许 agent 读取执行日志或视频反馈"
answer: 0
explain: "论文的核心是评估数字 agent 是否产生物理能力；可运行代码、较高 reward 或较低 loss 都可能与实际完成任务脱节，因此必须以任务完成率作为 grounded metric。"
```
