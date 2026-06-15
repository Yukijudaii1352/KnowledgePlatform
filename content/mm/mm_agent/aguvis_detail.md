### Aguvis

```yaml
id: aguvis
name: Aguvis
full_name: "统一纯视觉GUI智能体 (Aguvis)"
year: "2025"
org: "UIUC"
paper_url: "https://aguvis-project.github.io/"
category: "frontier_2026"
parent: "cogagent"
motivation: "摆脱DOM依赖的纯视觉像素操作"
```

#### 📝 一句话总结

Aguvis 提出了统一纯视觉 GUI Agent 框架，只依赖屏幕图像、自然语言指令和统一动作空间完成跨 web、desktop、mobile 的自动化操作，解决了传统 GUI Agent 对 DOM、accessibility tree 或闭源大模型协作的依赖问题。它通过两阶段训练先学习 GUI grounding，再学习规划、推理和 inner monologue。

#### 🎯 核心要点

- 纯视觉输入：直接基于屏幕截图操作，不依赖 DOM、HTML、accessibility tree 或平台专属文本结构
- 跨平台统一：面向 web、desktop、mobile 使用一致的视觉观测和动作空间
- 插件化动作系统：通过统一动作接口适配不同 GUI 环境
- 大规模 GUI Agent 轨迹数据集，包含多模态 grounding、规划与推理信号
- 两阶段训练：Stage 1 训练通用 GUI grounding，Stage 2 训练 planning and reasoning trajectories
- 引入 inner monologue，让模型显式生成计划、状态理解和下一步操作理由
- 在 ScreenSpot、Multimodal-Mind2Web、AndroidControl、Mind2Web-Live、AndroidWorld、OSWorld 等离线/在线场景评估

#### 🔬 深入细节

##### 框架总览

![Aguvis 总览图](https://aguvis-project.github.io/static/images/overview.jpg)
*图：Aguvis 以纯视觉截图作为统一观测，结合自然语言指令和跨平台动作接口执行 GUI 任务。*

##### 算法流程

```python
# Aguvis 两阶段训练与推理伪代码

# Stage 1: GUI grounding
for sample in aguvis_stage1_grounding:
    screenshot, element_instruction, target_region = sample
    pred_region = model.ground(screenshot, element_instruction)
    loss = grounding_loss(pred_region, target_region)
    update(model, loss)

# Stage 2: planning + reasoning
for trajectory in aguvis_stage2_reasoning:
    history, screenshot, user_goal = trajectory.context
    inner_monologue = trajectory.thought
    action = trajectory.action
    output = model(screenshot, user_goal, history)
    loss = sft_loss(output.thought, inner_monologue) + sft_loss(output.action, action)
    update(model, loss)

# Inference
while not task_done:
    screenshot = capture_screen()
    thought, action = model.plan_and_act(screenshot, goal, previous_actions)
    execute_unified_action(action)
    previous_actions.append(action)
```

##### 方法细节

Aguvis 的核心立场是“GUI Agent 不应该绑定某一种平台文本结构”。Web Agent 常依赖 DOM 或 HTML，手机 Agent 常依赖 accessibility tree，桌面 Agent 又有不同 API。这些结构在平台间差异很大，且很多真实场景并不稳定可用。Aguvis 因此选择只看屏幕图像，将 GUI 自动化问题统一为视觉 grounding、规划和动作执行。

纯视觉设定带来的第一项挑战是定位。模型必须从自然语言描述或任务目标中找到屏幕上的可操作元素，而不能读取 DOM id 或 accessibility label。Stage 1 训练专注于 grounding：给定截图和元素/操作描述，预测区域、点位或可操作目标。这个阶段让模型获得跨设备、跨 UI 风格的视觉定位能力。

第二项挑战是长程任务规划。即使能点中按钮，Agent 仍需要理解任务进度、判断当前屏幕语义、决定下一步操作并处理失败。Stage 2 使用包含规划和推理的轨迹数据训练模型，目标不仅是模仿动作，还要生成 inner monologue：

$$
(\text{screenshot}_t, g, h_t) \rightarrow (r_t, a_t)
$$

其中 \(g\) 是用户目标，\(h_t\) 是历史动作，\(r_t\) 是显式推理/计划，\(a_t\) 是下一步统一动作。inner monologue 的直觉是把 GUI 操作从反射式点击变成可解释的状态评估和计划更新。

统一动作空间是跨平台泛化的另一个关键。虽然不同平台底层执行接口不同，但模型输出层尽量保持一致，例如 click/tap、type、scroll、back、wait、finish 等高层动作，再由插件系统转换为具体平台操作。这样模型学到的是“在屏幕上操作”的通用策略，而不是某个 API 的语法。

项目 README 明确给出两个训练数据入口：`aguvis-stage1` 用于 grounding，`aguvis-stage2` 用于 planning and reasoning。训练时通过 `SFT_TASK` 指定阶段。这个流程体现了论文的工程判断：先把“看准”学好，再学“怎么连续完成任务”。

与 CogAgent、SeeClick 等 GUI 模型相比，Aguvis 更强调完全摆脱文本结构依赖；与基于 GPT-4V 的 Agent 系统相比，它强调开源模型独立完成真实在线任务，不依赖外部闭源模型做高层 reasoning。其代价是纯视觉模型必须自己承担 OCR、布局理解和元素功能推断，训练数据质量对表现影响很大。

> 💡 关键：Aguvis 的统一性来自输入和动作空间的统一，而不是把每个平台的 DOM/API 都硬编码进模型。

#### 🧪 练习题

```yaml
question: "Aguvis 的两阶段训练为什么先做 grounding，再做 planning and reasoning？"
options:
  - "因为模型必须先学会在纯视觉截图中定位可操作元素，才能稳定学习长程任务规划"
  - "因为 grounding 阶段会删除所有截图，只保留 DOM"
  - "因为 planning 阶段不需要任何动作监督"
  - "因为 Aguvis 只支持网页 HTML，不支持移动或桌面"
answer: 0
explain: "纯视觉 GUI Agent 的基础能力是看懂并定位屏幕元素；在此基础上，Stage 2 才能通过 inner monologue 和动作轨迹学习连续规划。"
```
