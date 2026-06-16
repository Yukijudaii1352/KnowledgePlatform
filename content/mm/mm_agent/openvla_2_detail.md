### OpenVLA 2.0

```yaml
id: openvla_2
name: OpenVLA 2.0
full_name: 开源VLA 2.0 (OpenVLA 2.0)
year: '2026'
org: Stanford
paper_url: https://robotwale.com/openvla-2-released-with-improved-generalisation/
category: frontier_2026
parent: openvla
motivation: 自适应推理模块提升泛化性30%
```

#### 📝 一句话总结

OpenVLA 2.0 条目描述的是在 OpenVLA 基础上加入自适应推理、低延迟动作生成和多机器人协作的升级方向，核心目标是在保留开源 VLA 泛化能力的同时，让机器人只在关键状态显式推理、在普通控制步快速输出动作。

#### 🎯 核心要点

- 继承 OpenVLA 路线：视觉观测和语言指令进入 VLA backbone，模型输出机器人动作或动作块
- 清单来源声称通过 Adaptive Reasoning 模块提升约 30% 泛化性，但给定链接是新闻页而非正式论文
- 自适应推理的核心是 mode gate：在 plan/reason 与 act 两种模式之间动态切换
- 低延迟执行依赖 action chunking 或并行动作解码，避免每个控制步都自回归生成长 token 序列
- 泛化能力来自大规模视觉语言预训练、跨 embodiment 机器人轨迹和关键节点的显式任务状态更新
- 多机器人协作可建模为共享高层任务计划、按机器人能力和局部观测分配子目标，再由各自动作头闭环执行
- 与 OpenVLA 1.0 的主要差别在于：1.0 偏“指令+观测→动作 token”，2.0 条目强调“何时推理、何时动作、如何协调”

#### 🔬 深入细节

##### 框架总览

![OpenVLA-OFT 框架图](https://openvla-oft.github.io/static/images/openvla_oft_figure_1.jpeg)
*图：OpenVLA-OFT 官方项目图展示了 OpenVLA 系列从基础 VLA 到高频控制策略的优化方向，包括连续动作表示、action chunking 和更快的动作解码。*

截至 2026-06-16，清单中的 OpenVLA 2.0 `paper_url` 不是 Stanford 官方论文链接；公开、可复现的 Stanford OpenVLA 系列论文包括 OpenVLA 和 OpenVLA-OFT。下面的精读保留清单元信息，并把“自适应推理模块”写成 OpenVLA 系列可落地的通用机制：在 OpenVLA/OFT 策略外加入 mode gate 和任务记忆，使模型在关键时刻生成推理，在普通控制步输出低延迟动作块。

##### 自适应 VLA 伪代码

```python
# OpenVLA 2.0 式自适应推理 + 动作块执行的抽象流程
task_memory = None
robot_states = init_robot_states()

while not all_tasks_done(robot_states):
    observations = {r: capture_obs(r) for r in robots}

    # 高层门控：判断是否需要重新规划、纠错或协调
    mode = vla.predict_mode(
        instruction=user_instruction,
        observations=observations,
        task_memory=task_memory,
        recent_failures=detect_failures(robot_states),
    )

    if mode == "reason":
        task_memory = vla.generate_reasoning(
            instruction=user_instruction,
            observations=observations,
            previous_memory=task_memory,
        )
        subgoals = coordinator.assign_subgoals(task_memory, robots)
    else:
        for robot in robots:
            action_chunk = vla.decode_action_chunk(
                observation=observations[robot],
                proprioception=robot_states[robot],
                subgoal=subgoals[robot],
                task_memory=task_memory,
            )
            execute(robot, action_chunk)
            robot_states[robot] = update_state(robot)
```

##### 方法细节

OpenVLA 1.0 的核心范式是把机器人控制改写成视觉语言上下文中的动作预测：图像编码器提供空间和语义特征，语言模型接收指令和视觉 token，最后生成离散动作 token。这个设计开源、通用、可微调，但在长程任务中容易遇到两个瓶颈：一是每一步都直接反应式出动作时，策略可能忘记高层任务状态；二是如果每一步都让大模型长推理，又会拖慢闭环控制频率。

自适应推理模块的目标就是解决这个权衡。设机器人在时刻 \(t\) 的观测为 \(o_t\)，语言指令为 \(x\)，历史任务记忆为 \(r_{<t}\)。模型先预测一个模式变量：

$$
m_t\sim p_\theta(m\mid o_{\le t},x,r_{<t}),\qquad m_t\in\{\text{reason},\text{act}\}
$$

当 \(m_t=\text{reason}\) 时，模型更新任务记忆 \(r_t\)，例如生成子目标、错误解释、约束检查或多机器人分工；当 \(m_t=\text{act}\) 时，模型直接输出动作块：

$$
\hat{A}_t=g_\theta(o_t,x,r_t,q_t)\in\mathbb{R}^{H\times d_a}
$$

其中 \(q_t\) 是机器人本体状态，\(H\) 是 action chunk 长度，\(d_a\) 是动作维度。这样，显式推理只在状态切换、失败恢复、指令歧义、跨机器人协调等关键节点触发，而不是在每个 20-50Hz 控制步都触发。

训练目标可以写成一个混合损失：

$$
\mathcal{L}
=\mathcal{L}_{mode}
+\lambda_r\mathbb{1}[m_t=\text{reason}]\mathcal{L}_{reason}
+\lambda_a\mathbb{1}[m_t=\text{act}]\lVert \hat{A}_t-A_t^\star\rVert_1
$$

其中 \(\mathcal{L}_{mode}\) 监督何时推理，\(\mathcal{L}_{reason}\) 监督高层推理文本或结构化计划，最后的 L1 项来自 OpenVLA-OFT 式连续动作学习。如果沿用 OpenVLA 1.0 的离散动作 token，也可以把动作项替换为动作 token 交叉熵：

$$
\mathcal{L}_{act}=-\sum_{h=1}^{H}\log p_\theta(a_{t+h}^\star\mid o_t,x,r_t,a_{<t+h}^\star)
$$

这种设计的直觉是：推理负责“任务状态”和“为什么这样做”，动作块负责“接下来几步怎么做”。对机器人来说，许多连续控制步只是沿着同一子目标移动夹爪或底盘，不需要重新思考；但一旦检测到抓取失败、目标物不在预期位置、另一个机器人占用了路径，就应重新进入 reason 模式。

多机器人协作可以在同一框架中表示。给定全局任务 \(x\) 和机器人集合 \(\mathcal{R}\)，高层协调器根据机器人能力 \(c_i\)、局部观测 \(o_t^{(i)}\) 和当前任务记忆 \(r_t\) 分配子目标：

$$
\{g_t^{(i)}\}_{i\in\mathcal{R}}
=\operatorname{Coord}_\theta(x,r_t,\{o_t^{(i)},c_i\}_{i\in\mathcal{R}})
$$

每个机器人再执行自己的条件策略 \(\pi_\theta(a^{(i)}\mid o_t^{(i)},g_t^{(i)},r_t)\)。这比让一个单体策略直接输出所有机器人动作更可扩展，因为高层语言计划可以共享，而底层动作头可以按 embodiment 适配。

与 OpenVLA 1.0 相比，OpenVLA 2.0 条目强调的是系统层升级：从单步动作 token 预测，转向“任务记忆 + 稀疏推理 + 动作块 + 协调器”的闭环结构。它的收益主要来自两个方向：泛化上，reason 模式能显式检查语义约束和失败原因；效率上，act 模式能连续执行多个低层动作，减少大模型调用次数。

> ⚠️ 注意：由于缺少正式 OpenVLA 2.0 论文，约 30% 泛化提升应视作发布页说法，而不是这里能独立复现实验表格的论文结论。可复现的技术支撑主要来自 OpenVLA 与 OpenVLA-OFT 的公开论文、代码和项目页。

#### 🧪 练习题

```yaml
question: "自适应推理 VLA 为什么不在每个控制步都生成长推理？"
options:
  - "因为机器人任务不需要视觉输入"
  - "因为多数控制步只需执行既定子目标，长推理会增加延迟；关键节点再推理可以兼顾规划和实时控制"
  - "因为动作块不能表示连续动作"
  - "因为多机器人协作只能由规则系统完成"
answer: 1
explain: "自适应推理的核心是稀疏触发：在失败恢复、子目标切换或协调时更新计划，在普通控制步快速输出动作块。"
```
