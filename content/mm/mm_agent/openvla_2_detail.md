### OpenVLA 2.0

```yaml
id: openvla_2
name: OpenVLA 2.0
full_name: "开源VLA 2.0 (OpenVLA 2.0)"
year: "2026"
org: "Stanford"
paper_url: "https://robotwale.com/openvla-2-released-with-improved-generalisation/"
category: "frontier_2026"
parent: "openvla"
motivation: "自适应推理模块提升泛化性30%"
```

#### 📝 一句话总结

OpenVLA 2.0 条目对应的 release 信息强调在 OpenVLA 基础上引入自适应推理、多机器人协作和低延迟边缘推理，以提升机器人跨任务泛化。由于清单链接是新闻稿而非正式论文，方法细节可用 OneTwoVLA 这类自适应推理 VLA 论文来理解其核心机制：统一模型在关键时刻显式推理，其余时刻直接输出动作。

#### 🎯 核心要点

- OpenVLA 2 release 信息声称相对 OpenVLA 1.0 有约 30% 任务泛化提升
- 关键技术方向包括 Adaptive Reasoning、Multi-Robot Coordination、Low-Latency Inference
- 自适应推理思想对应“什么时候需要想、什么时候直接做”的模式选择，而不是每一步都生成长推理
- 可参考 OneTwoVLA 的统一 System One/System Two 模型：同一 VLA 同时具备 reasoning mode 和 acting mode
- 使用特殊决策 token 在推理时选择进入 `[BOR]` reasoning 或 `[BOA]` action chunk 生成
- 通过具身推理数据与机器人数据共同训练，提升长程规划、错误恢复、人机交互和开放世界视觉定位

#### 🔬 深入细节

##### 框架总览

![自适应推理 VLA 总览](https://arxiv.org/html/2505.11917v2/x1.png)
*图：OneTwoVLA 的统一 reasoning/acting 框架，可作为理解 OpenVLA 2.0 自适应推理模块的公开论文参照。*

清单给出的 `paper_url` 是新闻稿，不是可复现实验论文；RobotWale 页面提到 OpenVLA 2 引入 Adaptive Reasoning、Multi-Robot Coordination 和 Low-Latency Inference。为了满足论文精读的机制解释，下面以公开论文 OneTwoVLA 的自适应推理 VLA 设计作为方法参照，但 YAML 元信息保持清单原样。

##### 自适应推理伪代码

```python
# Adaptive reasoning VLA 的通用推理流程
reasoning_state = None
history = []

while not task_finished:
    obs = capture_multiview_images()
    prefix = build_prefix(obs, instruction, history, reasoning_state)
    decision = vla.predict_decision_token(prefix)  # [BOR] or [BOA]

    if decision == "[BOR]":
        reasoning_state = vla.generate_text_reasoning(prefix)
        history.append(("reason", reasoning_state))
    else:
        action_chunk = vla.generate_action_chunk(prefix, proprioception)
        execute_robot_actions(action_chunk)
        history.append(("act", action_chunk))
```

##### 方法细节

OpenVLA 一类 VLA 模型把视觉、语言和动作统一到一个策略里，但第一代模型通常更偏反应式：看当前观测和指令，直接输出动作。长程操作、错误恢复和开放世界物体泛化需要更强的显式推理；但如果每一步都调用大型推理模块，延迟又会显著上升，尤其不适合机器人闭环控制。

自适应推理的核心是让策略学习模式切换。通常机器人任务中只有少数关键节点需要慢思考：开始任务时规划步骤，完成一个子任务后更新计划，检测到抓取失败时恢复，遇到人类插话或指令歧义时澄清。其余高频控制步骤应直接用最近一次推理结果生成 action chunk，以保持低延迟。

OneTwoVLA 给出了一个清晰实现：同一模型既能输出自然语言 reasoning，也能输出连续动作 chunk。模型先预测决策 token，若为 `[BOR]` 就进入 reasoning mode，生成场景描述、历史摘要、任务计划和下一步指令；若为 `[BOA]` 就进入 acting mode，根据多视角图像、机器人本体状态和最新 reasoning 生成动作块。这样避免了 dual-system 中高层 VLM 与低层 VLA 互不了解、通信延迟和指令过期的问题。

训练数据也要同时支持两种模式。轨迹被切成 reasoning intervals 和 acting intervals：reasoning intervals 出现在子任务完成、错误检测或人机交互等关键点，监督模型输出 `[BOR]` 和推理文本；acting intervals 则监督 `[BOA]` 和动作序列。具身推理中心的视觉语言数据还会和机器人数据共同训练，使模型能从互联网尺度图像/文本中获得物体属性、空间关系和语义目标的泛化能力。

如果把它映射回 OpenVLA 2.0 release 的三项方向：Adaptive Reasoning 对应上述模式切换；Low-Latency Inference 对应多数时间处于 acting mode 并输出 action chunk；Multi-Robot Coordination 则可理解为多个机器人共享高层语言-视觉推理模型，但在各自硬件上执行低延迟动作头或适配器。

> 💡 关键：自适应推理不是“给 VLA 加更多 CoT”这么简单，而是把推理当作稀疏触发的控制变量，在任务关键点提供计划更新，在普通控制步保持动作生成速度。

#### 🧪 练习题

```yaml
question: "自适应推理 VLA 相比每一步都显式推理的主要优势是什么？"
options:
  - "完全去掉视觉输入"
  - "只在关键节点生成推理，其余步骤直接输出动作，从而兼顾长程规划和低延迟控制"
  - "把所有动作都改成文本摘要"
  - "不再需要机器人示范数据"
answer: 1
explain: "机器人闭环控制需要低延迟，但长程任务又需要规划；自适应推理通过模式切换把两者结合起来。"
```
