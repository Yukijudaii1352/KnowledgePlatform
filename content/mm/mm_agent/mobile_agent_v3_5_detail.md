### Mobile-Agent-v3.5

```yaml
id: mobile_agent_v3_5
name: Mobile-Agent-v3.5
full_name: "移动智能体v3.5 (Mobile-Agent-v3.5)"
year: "2026"
org: "ByteDance"
paper_url: "https://arxiv.org/abs/2602.16855"
category: "frontier_2026"
parent: "dart_gui"
motivation: "多智能体协作实现跨平台统一操作"
```

#### 📝 一句话总结

Mobile-Agent-v3.5 提出 GUI-Owl-1.5 多尺寸 GUI Agent 模型族，用混合数据飞轮、统一能力增强和多平台 MRPO 强化学习解决跨移动端、桌面端、浏览器环境的长程 GUI 操作泛化问题。它把单体端到端模型与 Manager/Worker/Reflector/Notetaker 多智能体协作统一到同一套训练和部署范式中。

#### 🎯 核心要点

- GUI-Owl-1.5 模型族覆盖 2B/4B/8B/32B/235B instruct 与 thinking 变体，面向端侧实时操作、云端复杂规划和云边协作
- 混合数据飞轮结合 GUI grounding 数据、DAG 任务合成、自动轨迹采集、人工示范和虚拟环境轨迹生产
- 统一能力增强包含 GUI 知识注入、世界建模监督、统一 CoT 合成、工具/MCP 调用、记忆管理和多智能体协作数据
- Mobile-Agent-v3.5 框架显式划分 Manager、Worker、Reflector、Notetaker 四类角色，支持规划、执行、验证和持久记忆闭环
- MRPO 通过设备条件化策略、在线 rollout buffer、token-id transport 和交替多平台优化缓解多设备 RL 的冲突与低效率
- 在 OSWorld-Verified、AndroidWorld、WebArena、ScreenSpot-Pro、OSWorld-MCP 等 20+ GUI 基准上刷新开源模型表现

#### 🔬 深入细节

##### 框架总览

![Mobile-Agent-v3.5 总览](https://arxiv.org/html/2602.16855v1/x2.png)
*图：Mobile-Agent-v3.5/GUI-Owl-1.5 的多平台 GUI Agent 总览，强调跨设备支持、能力增强和多智能体协作。*

Mobile-Agent-v3.5 的核心问题不是让模型会点一个按钮，而是让同一策略能在手机、桌面、浏览器和工具调用环境中持续完成任务。论文把每一步 GUI 交互建模为多轮决策：输入是当前截图、用户指令和压缩后的历史上下文，输出是动作结论与结构化工具调用；执行后环境返回新截图，模型继续闭环。

##### 核心流程伪代码

```python
# Mobile-Agent-v3.5 多角色执行与 MRPO 训练的简化流程
for task in task_stream:
    state = observe_device(task.device)
    notes, feedback = "", None
    subgoals = Manager.plan(task.instruction, state)

    while not done(subgoals):
        action = Worker.act(state, subgoals, notes, feedback)
        next_state = execute_on_device(action)
        feedback = Reflector.verify(state, action, next_state)
        notes = Notetaker.update(notes, state, action, feedback)
        subgoals = Manager.update(subgoals, feedback, notes)
        state = next_state

for epoch in range(num_rl_epochs):
    for device_type in cycle(["mobile", "desktop", "browser"]):
        group = online_buffer.sample_on_policy(device_type)
        rewards = task_reward(group) + format_reward(group)
        loss = mrpo_group_policy_loss(group, rewards, reference_policy)
        update_policy(loss)
```

##### 方法细节

传统 GUI Agent 常见瓶颈有三个：真实轨迹采集慢且昂贵，移动端/桌面端/网页端动作和界面结构异构，纯 SFT 模型在长程任务中容易因一步错误导致后续全部偏移。Mobile-Agent-v3.5 的设计顺序正是围绕这三点展开：先造出足够多、足够干净、覆盖不同平台的轨迹，再把模型训练成具备定位、推理、记忆、工具调用和多角色协作的 GUI 原生模型，最后用多平台环境 RL 修正 SFT 的分布偏移。

数据侧的 Hybrid Data Flywheel 把轨迹生产拆成多条互补管线。DAG 任务合成让标注者把应用流程写成子任务节点和可行转移边，从中采样路径并生成可验证指令；自动轨迹生成会在真实设备上执行任务，并用 checkpoint 判定最长正确前缀，错误轨迹会被截断和修复；虚拟环境则用网页渲染模拟文档编辑、拖拽、滚动、弹窗等高频场景，提供更精确的子任务反馈；最后少量人工示范覆盖自动系统难以解决的复杂应用。

能力增强阶段把 GUI Agent 需要的“看、想、记、验、调工具”全部写进训练数据。GUI 知识注入来自软件文档、论坛和教程 QA/VQA；世界建模监督要求模型根据截图和动作预测界面会如何变化；统一 CoT 合成在每个轨迹步骤生成观察、记忆、反思、任务进度和工具选择推理；多智能体数据则让同一模型能扮演规划者、执行者、验证者或记忆维护者。

MRPO 是论文中最直接面向 RL 稳定性的部分。设设备类型为 \(d\)，策略写作 \(\pi_\theta(a_t \mid o_t, q, h_t, d)\)。同一策略条件化到不同平台，而不是给每个平台单独训练模型。由于 GUI 任务 group rollout 很容易全成或全败，普通 GRPO 会得到无信息组；MRPO 先在线过采样，再从同一当前策略样本中挑选成功/失败更均衡的小组，从而保持近似 on-policy 同时降低 outcome collapse。

Token-ID transport 处理另一个工程上很关键的问题：环境侧推理与训练侧优化的 tokenization 必须一致，否则 log probability 会错位。论文把动作、元素 ID、工具参数在环境端保留为 token id 再传回训练端，避免字符串重新分词造成的概率不一致。多平台优化也不是简单混 batch，而是在移动端、桌面端、浏览器端之间交替训练，减少梯度互相抵消。

> 💡 关键：Mobile-Agent-v3.5 的贡献不只是“多智能体框架”，而是把数据生成、GUI 专项能力、角色协作和多平台 RL 串成了统一训练闭环，使模型可以在不同设备上共享策略而不依赖单个平台的脆弱脚本。

#### 🧪 练习题

```yaml
question: "MRPO 中在线 rollout buffer 的主要作用是什么？"
options:
  - "把所有平台的 GUI 元素转换成同一种截图分辨率"
  - "通过在线过采样和选择减少同组 rollout 全成或全败造成的无效 GRPO 更新"
  - "替代监督微调阶段的人类示范轨迹"
  - "只在推理时缓存截图以降低浏览器渲染开销"
answer: 1
explain: "GUI 长程任务的 group rollout 容易 outcome collapse；在线 buffer 在保持当前策略采样的前提下提高组内结果多样性，使优势估计更有信息量。"
```
