### AI2-THOR

```yaml
id: ai2thor
name: "AI2-THOR"
full_name: "AI2交互式3D环境 (AI2-THOR Interactive 3D Environment)"
year: "2017"
org: "Allen AI"
paper_url: "https://arxiv.org/abs/1712.05474"
category: "interactive"
parent: "—"
motivation: "具身智能从静态数据转向交互式环境"
```

#### 📝 一句话总结

AI2-THOR 提出了可通过 Python 控制的近真实室内 3D 交互环境，使视觉智能体能够在 Unity 场景中导航、改变物体状态并接收多模态观测，推动具身视觉从静态图像识别转向交互式学习。

#### 🎯 核心要点

- **交互式室内场景**：提供厨房、卧室、客厅、浴室等室内环境，包含可打开、切片、加热、拾取、放置等可交互物体
- **Python-Unity 闭环**：前端 Python API 发送动作，后端 Unity 执行动作与渲染，再返回 `Event`、图像和元数据
- **动作类别完整**：支持导航动作、抽象物体交互、机械臂交互、环境查询和环境状态随机化
- **多模态观测**：可返回 RGB、深度、语义分割、实例分割、法向、可达位置、物体 bounding box 等信息
- **多 embodied agent 扩展**：从抽象导航 agent 扩展到 LoCoBot、ManipulaTHOR、Stretch、Drone 等形态
- **下游任务广泛**：支撑 ObjectNav、交互问答、指令跟随、ALFRED、TEACh、物体关系学习和多智能体协作等研究

#### 🔬 深入细节

![AI2-THOR agent-simulator loop](https://ar5iv.labs.arxiv.org/html/1712.05474/assets/x1.png)
*图：AI2-THOR 的 agent-simulator loop。Python API 通过本地服务控制 Unity 后端，Unity 返回图像观测和环境元数据。*

```python
# AI2-THOR 交互循环伪代码
from ai2thor.controller import Controller

controller = Controller(scene="FloorPlan1")
event = controller.step(action="Initialize")

while not done:
    obs = {
        "rgb": event.frame,
        "depth": event.depth_frame,
        "objects": event.metadata["objects"],
        "agent": event.metadata["agent"],
    }
    action = policy(obs)

    # 例如 MoveAhead、RotateRight、OpenObject、PickupObject、SliceObject
    event = controller.step(action=action["name"], **action.get("params", {}))
    done = task_success(event.metadata)
```

**动机与背景：视觉理解需要主动交互**

传统视觉模型主要从静态图片或离线视频中学习，目标通常是分类、检测或分割。但具身智能体需要知道“我能对这个物体做什么”“动作会如何改变场景”“从另一个视角能看到什么”。AI2-THOR 的论文动机正是把视觉 AI 放进可交互的室内世界，让 agent 通过动作改变环境并从结果中学习。

**核心机制：Python 前端与 Unity 后端**

AI2-THOR 的系统结构可以写成一个闭环：

$$
e_{t+1} = \mathrm{UnityStep}(e_t, a_t), \quad
o_{t+1} = \mathrm{RenderAndMetadata}(e_{t+1})
$$

其中 \(e_t\) 是 Unity 中完整环境状态，\(a_t\) 是 Python API 发来的动作，\(o_t\) 是返回给学习算法的观测。论文特别强调返回的 `Event` 不只是 RGB 图像，还包含环境元数据，例如物体是否可见、是否可交互、当前位置、开合状态、可达位置和分割标注。这使 AI2-THOR 同时适合纯视觉任务和闭环决策任务。

**动作设计：从导航到因果交互**

AI2-THOR 的动作不只是 `MoveAhead`、`RotateRight` 这类导航命令，还包括 `OpenObject`、`PickupObject`、`PutObject`、`ToggleObjectOn`、`SliceObject`、`FillObjectWithLiquid` 等状态改变。抽象动作通常要求物体在视野中且距离足够近；机械臂 agent 则可以执行更连续的抓取和开门过程。这样的分层让研究者可以选择关注高层规划、视觉 grounding 或低层操作。

**训练/推理流程：从交互数据到任务学习**

一个 ObjectNav agent 可以在每一步根据 RGB-D 与目标类别选择移动或转向；一个 ALFRED 式指令跟随 agent 则需要把语言指令分解为导航和物体操作序列。环境每一步返回的元数据可以用于奖励计算、专家轨迹生成或评估，但训练时也可以只暴露视觉观测。这个灵活性让 AI2-THOR 成为具身视觉和语言任务的重要基础设施。

**与传统视觉数据集的区别**

静态数据集固定了观察点，模型无法主动寻找信息；AI2-THOR 允许 agent 改变视角、打开容器、拿起物体和触发因果状态变化。相比 Gazebo/MuJoCo 这类物理控制仿真，AI2-THOR 的重点是语义丰富、视觉真实和室内交互，而不是高精度关节动力学。它因此更适合视觉导航、物体状态理解和语言指令执行。

> 💡 关键：AI2-THOR 的贡献是把视觉 AI 的训练单位从“标注图片”变成“可行动、可观察、可改变的室内世界状态”。

#### 🧪 练习题

```yaml
question: "AI2-THOR 的 Python-Unity 架构中，Unity 后端每步主要返回什么？"
options:
  - "只返回一个离散奖励数字"
  - "返回渲染图像、传感器模态和包含物体/agent 状态的 Event 元数据"
  - "只返回源代码文本"
  - "不返回任何环境状态"
answer: 1
explain: "AI2-THOR 的 Event 同时包含 RGB/深度/分割等视觉观测和物体、agent、可交互状态等元数据，是交互式任务的核心接口。"
```
