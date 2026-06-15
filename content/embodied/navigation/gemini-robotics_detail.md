### Gemini Robotics-ER — Gemini机器人具身推理 (Gemini Robotics Embodied Reasoning)

```yaml
id: gemini-robotics
name: Gemini Robotics-ER
full_name: "Gemini机器人具身推理 (Gemini Robotics Embodied Reasoning)"
year: "2026"
org: "Google"
paper_url: "https://deepmind.google/technologies/gemini/robotics/"
category: "vla_model"
parent: "openvla"
motivation: "高层空间推理任务编排"
```

#### 📝 一句话总结

Gemini Robotics-ER 将 Gemini 的多模态推理扩展到机器人场景，重点承担空间理解、任务分解、工具/动作编排和执行验证，而不是像 OpenVLA 或 π0 那样直接作为低层连续控制策略。

#### 🎯 核心要点

- 公开资料主要来自 Google DeepMind Gemini Robotics 页面、ER 1.6 博客和 Gemini API 文档，形态更接近产品/技术发布而非传统论文。
- Gemini Robotics-ER 强调 embodied reasoning：多视角场景理解、空间关系、物体属性、可达性和任务约束推理。
- API 侧提供 `gemini-robotics-er-1.6-preview` 等模型，用于机器人上层 reasoning、plan generation 和 verification。
- 典型使用方式是 ER 模型输出结构化计划、空间断言或工具调用，再由低层控制器/VLA/技能库执行。
- 相比端到端 VLA，优势在开放世界推理、跨任务编排和解释性；短板是仍需要可靠的底层执行闭环。
- 适合作为导航/操作系统中的高层任务编排器，与 SLAM、抓取、运动规划和 VLA policy 组合。

#### 🔬 深入细节

![Gemini Robotics-ER 官方示例图](https://ai.google.dev/static/gemini-api/docs/images/robotics/point-to-object.png)
*图：Gemini Robotics-ER 文档示例展示了模型在机器人桌面场景中输出物体点位和标签，用作下游控制器/VLA 的结构化输入。*

```python
# Gemini Robotics-ER 高层编排伪代码
def embodied_reasoning_loop(task, camera_views, robot_state, skill_api):
    scene = gemini_er.analyze(
        images=camera_views,
        text=f"Describe objects, spatial relations, constraints for: {task}",
        state=robot_state,
    )
    plan = gemini_er.generate_plan(
        task=task,
        scene=scene,
        available_skills=skill_api.schema(),
        output_format="json",
    )

    for step in plan["steps"]:
        if not gemini_er.check_precondition(step, scene, robot_state):
            plan = gemini_er.replan(task, scene, failed_step=step)
            continue
        result = skill_api.execute(step["skill"], step["arguments"])
        scene = gemini_er.verify_and_update(camera_views, result, task)
    return gemini_er.judge_success(scene, task)
```

Gemini Robotics-ER 的定位更像 embodied reasoning model。输入是多视角图像、语言任务、可能的机器人状态和工具/技能描述，输出不是连续关节命令，而是空间理解、计划步骤和验证判断。可将系统分解为：

$$
z_t = f_\theta(o_t^{1:V}, \ell, q_t),\quad
p_t = g_\theta(z_t, \mathcal{S}),\quad
a_t = \mathrm{SkillExec}(p_t),
$$

其中 \(\mathcal{S}\) 是可用技能集合，\(p_t\) 是结构化计划或工具调用，低层动作 \(a_t\) 由外部控制器执行。这种分层方式适合“先理解再执行”的开放任务，例如读仪表、比较多个物体位置、选择合适工具或规划跨房间操作顺序。

空间推理是它与普通 VLM 的主要差异。机器人需要知道的不只是图像 caption，而是可行动的几何/关系判断：物体是否可达、遮挡是否会影响抓取、按钮是否在机械臂工作空间内、下一步是否会违反安全约束。可抽象为在场景图上推理：

$$
\mathcal{G}_t=(\mathcal{V},\mathcal{E}),\quad
\mathcal{E}_{ij}=\{\text{left-of},\text{inside},\text{supporting},\text{reachable}\}.
$$

ER 模型根据多模态输入估计这些关系，并把它们转化为 plan precondition 和 postcondition。

与 OpenVLA/π0 的端到端动作模型相比，Gemini Robotics-ER 的优势是高层泛化和可解释性：输出可以是 JSON plan、自然语言理由或工具调用，便于安全审计和人机协作。劣势是控制闭环依赖外部模块，如果 grasp skill、navigation stack 或 VLA policy 失败，ER 本身只能重新推理而不能保证低层轨迹可行。因此更合理的系统设计是把它放在 planner/verifier 层，而不是替代运动控制器。

> ⚠️ 注意：该条目公开来源不是单篇论文；本精读基于 Google DeepMind 官方 Gemini Robotics/ER 1.6 页面和 Gemini API 文档整理，保留 YAML 原始 `paper_url`。

#### 🧪 练习题

```yaml
question: "Gemini Robotics-ER 在机器人系统中最适合承担哪一层职责？"
options:
  - "直接以 1kHz 频率输出电机电流"
  - "高层空间推理、任务分解、工具调用和执行验证"
  - "只做图像压缩，不参与规划"
  - "替代所有底层运动规划和控制模块"
answer: 1
explain: "Gemini Robotics-ER 的公开定位是 embodied reasoning，更适合作为高层编排器，与底层技能或 VLA 控制器配合。"
```
