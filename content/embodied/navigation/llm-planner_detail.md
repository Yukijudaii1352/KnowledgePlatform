### LLM-Planner — 少样本具身高层规划器

```yaml
id: "llm-planner"
name: "LLM-Planner"
full_name: "LLM规划器 (LLM Planner)"
year: "2023"
org: "arXiv"
paper_url: "https://arxiv.org/abs/2305.llmplanner"
category: "task_planning"
parent: "saycan"
motivation: "少样本提示动态调整任务计划"
```

#### 📝 一句话总结

LLM-Planner 用少量示例提示让 LLM 生成 ALFRED 等具身任务的高层计划，并通过检索相似示例、环境物体 logit bias 与失败触发的 grounded re-planning，使计划能随视觉环境反馈动态修正。

#### 🎯 核心要点

- **高层计划 HLP**：LLM 输出形如 `(GotoLocation, PickupObject, PutObject, ToggleObject)` 的高层动作序列，再交给低层执行器。
- **少样本学习设定**：只使用少量 paired training data，避免全量模仿学习对大量人工标注的依赖。
- **kNN 示例检索**：用冻结 BERT embedding 找到与当前任务最相似的 in-context examples，而不是随机拼接提示。
- **物理接地提示**：把当前已观察物体列表、已完成子目标和失败信息注入 prompt。
- **logit bias 对齐物体名**：对环境中已观察对象施加输出偏置，缓解“lamp/DeskLamp”“bin/GarbageCan”等命名差异。
- **动态重规划**：当前子目标失败或执行超时后，基于已完成计划前缀和观察对象重新生成剩余计划。

#### 🔬 深入细节

##### 框架图

![LLM-Planner 框架](https://ar5iv.labs.arxiv.org/html/2212.04088/assets/x1.png)
*图：LLM-Planner 让 LLM 生成高层计划，并在执行期间用环境观察与失败反馈进行 grounded re-planning。清单中的 `paper_url` 是占位符，实际公开论文为 arXiv:2212.04088。*

##### 算法伪代码

```python
# LLM-Planner: few-shot high-level planning with grounded re-planning
examples = retrieve_knn_examples(task_instruction, small_training_set)
observed_objects = []
completed_subgoals = []

plan = LLM.generate_plan(
    task=task_instruction,
    examples=examples,
    observed_objects=observed_objects,
    completed=completed_subgoals,
    logit_bias=objects_seen_bias(observed_objects),
)

k = 0
while k < len(plan):
    subgoal = plan[k]
    ok, new_objects = low_level_agent.execute(subgoal)
    observed_objects.extend(new_objects)

    if ok:
        completed_subgoals.append(subgoal)
        k += 1
    elif failed_or_timeout(subgoal):
        plan = LLM.generate_continuation(
            task=task_instruction,
            completed=completed_subgoals,
            observed_objects=observed_objects,
            examples=retrieve_knn_examples(task_instruction, small_training_set),
        )
        k = 0
```

##### 方法拆解

LLM-Planner 针对 ALFRED 这类需要导航、找物、交互和状态变化的长程任务。端到端模型需要大量示范才能学会高层顺序，而 LLM 已经从文本中学到“先找到土豆，再放进微波炉，再打开微波炉”这类常识。问题是，纯 LLM 计划容易提到环境中不存在的物体或坚持错误子目标，因此论文重点放在 few-shot prompting 与物理接地。

提示结构包含任务说明、允许的高层动作集合、检索来的示例、当前测试任务和可选的环境信息。示例检索用 BERT embedding 的距离实现：当前任务“heat a potato”更应检索“cook an egg”而不是“clean a plate”。这降低了少样本设定下 prompt 空间的噪声。

高层计划并不直接控制机器人，而是类似：

```text
1. GotoLocation(CounterTop)
2. PickupObject(Potato)
3. GotoLocation(Microwave)
4. PutObject(Potato, Microwave)
5. ToggleObjectOn(Microwave)
```

低层 agent 负责把这些子目标映射到视觉导航和交互动作。论文中可接入 HLSM 等已有具身执行器，因此 LLM-Planner 是一个高层模块。

Grounded re-planning 是核心闭环。当执行失败、长时间卡住或发现新对象时，LLM-Planner 把已完成子目标和观察到的对象列表加入 prompt，生成剩余计划。若寻找 cup 失败但看见 cabinet，LLM 可以基于常识改为打开 cabinet；若指令说 lamp 而环境标签是 DeskLamp，logit bias 可促使模型输出环境中真实对象名。

相比 SayCan，LLM-Planner 更偏向“生成完整高层计划 + 必要时重规划”，而不是每一步在技能集合上用 affordance 乘积打分。相比 Code as Policies，它输出结构化高层动作而非任意 Python 代码，因此更容易和已有 ALFRED/HLSM 执行器对接。

> ⚠️ 注意：LLM-Planner 的 grounding 主要来自观察对象列表和执行失败信号，而不是连续几何地图。若低层执行器感知错误或无法报告对象，重规划质量会明显下降。

#### 🧪 练习题

```yaml
question: "LLM-Planner 中 kNN 示例检索的作用是什么？"
options:
  - "从少量训练集中选择与当前任务相似的 in-context examples，提高提示相关性"
  - "为机器人计算最短路径"
  - "训练新的视觉编码器"
  - "替代低层动作执行器"
answer: 0
explain: "LLM-Planner 用 BERT embedding 检索相似任务示例，让少样本 prompt 更贴近当前任务类型，从而提升高层计划质量。"
```
