### RoboCasa大规模家庭任务仿真 (RoboCasa)

```yaml
id: robocasa
name: RoboCasa
full_name: RoboCasa大规模家庭任务仿真 (RoboCasa)
year: '2024'
org: UT Austin
paper_url: https://arxiv.org/abs/2406.02523
category: benchmark
parent: robosuite
motivation: 构建大规模家庭任务仿真，扩展环境多样性
```

#### 📝 一句话总结
RoboCasa 提出面向家庭厨房任务的大规模机器人仿真框架，通过 120 个厨房场景、2,509 个物体资产、100 个任务和 100K+ 演示轨迹，解决机器人学习中环境、任务与数据规模不足的问题。

#### 🎯 核心要点
- 基于 robosuite/MuJoCo 扩展到房间尺度厨房场景，支持移动机械臂、人形、四足带臂等跨 embodiment 机器人。
- 构建 10 种厨房平面布局、12 种厨房风格，组合成 120 个厨房场景，并用 AI 生成纹理增强视觉多样性。
- 提供 2,509 个高质量厨房物体资产，覆盖 153 个类别，包含可交互橱柜、抽屉、微波炉、炉灶旋钮等关节对象。
- 设计 100 个任务：25 个原子任务覆盖 8 类基础技能，75 个复合任务由 GPT-4/Gemini 辅助生成厨房活动蓝图。
- 结合人类遥操作演示与 MimicGen 自动轨迹生成，形成 1,250 条人工原子任务演示和 100K+ 机器生成轨迹。
- 使用行为克隆训练多任务策略，实验显示合成演示数据可以改善仿真泛化，并在真实厨房任务中提升少样本实机学习效果。

#### 🔬 深入细节
![RoboCasa 任务生成流程](https://arxiv.org/html/2406.02523v1/x3.png)
*图：RoboCasa 使用 LLM 从高层厨房活动生成可执行复合任务蓝图，再落到 pick、place、close_door、press 等技能序列。*

```python
# RoboCasa 数据与策略训练伪代码
scenes = build_kitchens(floor_plans=10, styles=12, ai_textures=True)
assets = load_assets(objaverse=True, text_to_3d=True, articulated_appliances=True)
atomic_tasks = define_atomic_tasks(skills=[
    "pick_place", "open_close_door", "open_close_drawer", "twist_knob",
    "turn_lever", "press_button", "insertion", "navigation",
])

activities = llm.generate("common everyday kitchen activities")
composite_tasks = []
for activity in activities:
    task_blueprints = llm.generate_tasks(activity, available_skills=atomic_tasks)
    composite_tasks.extend(filter_and_implement(task_blueprints))

human_demos = teleoperate(tasks=atomic_tasks + composite_tasks, device="SpaceMouse")
generated_demos = []
for demo in human_demos.atomic_subset():
    segments = annotate_object_centric_subtasks(demo)
    for scene in sample(scenes):
        traj = mimicgen_retarget(segments, scene, assets)
        if task_success(traj):
            generated_demos.append(traj)

policy = train_behavior_cloning(human_demos + generated_demos)
evaluate(policy, heldout_scenes=True, heldout_objects=True, real_kitchen=True)
```

RoboCasa 的核心动机是把“机器人仿真环境”从单一桌面任务扩展到更接近真实家庭的房间尺度任务。传统 robosuite、MetaWorld、RLBench 等环境在控制接口和物理交互上很成熟，但通常场景、物体、任务语义比较有限；而 Habitat、AI2-THOR 等视觉环境场景更大，却未必具备精细接触和可训练的机器人控制闭环。RoboCasa 选择在 robosuite/MuJoCo 上扩展，是为了保留物理接触、控制器和机器人学习接口，同时补齐家庭场景多样性。

场景层面，论文把厨房拆成“平面布局 × 装修风格 × 可替换纹理 × 可交互资产”。10 种布局覆盖 one-wall、L-shape、U-shape、island 等常见厨房结构；12 种风格覆盖 industrial、Scandinavian、coastal、modern、traditional 等视觉设计。再加上墙面、地面、台面、柜门等 AI 生成纹理，训练集可以在同一任务语义下呈现大量视觉变化。这个设计本质上是在做更结构化的 domain randomization：不是随机噪声，而是保持家庭厨房常识的可控变化。

任务层面，RoboCasa 先定义 8 类基础 sensorimotor 技能，再构造 25 个原子任务作为行为基元。复合任务则来自 LLM 辅助设计：先让 GPT-4 给出常见厨房活动，例如洗碗、做吐司、补货、蒸蔬菜；再让 GPT-4/Gemini 在可用物体、fixture 和技能约束下生成具体任务蓝图。由于 LLM 会产生逻辑错误，论文仍然保留人工过滤和代码实现步骤。关键不是让 LLM 直接控制机器人，而是用它扩大任务语义覆盖面。

数据层面，人工遥操作只提供高质量种子演示。RoboCasa 再用 MimicGen 将演示拆成 object-centric subtasks，并根据新场景中新物体的位姿重定向、拼接和回放轨迹。可以把生成流程理解为：

$$
\tau_{\text{new}} = \operatorname{stitch}\left(
T(o_1)\tau_1,\; T(o_2)\tau_2,\; \ldots,\; T(o_k)\tau_k
\right)
$$

其中 \(\tau_i\) 是原始演示中的子轨迹，\(T(o_i)\) 是根据当前目标物体位姿计算的空间变换。只有成功完成任务的重放轨迹会被保留，因此数据生成带有 rejection sampling。

与传统仿真基准相比，RoboCasa 的贡献不在单个控制算法，而在把“多场景、多资产、多任务、多演示”的四个规模维度放进同一训练基准。论文用行为克隆和 diffusion policy 等离线模仿学习方法验证：仅 50 条人工演示不足以覆盖任务和场景变化，而大量 MimicGen 轨迹能显著改善泛化。真实厨房实验也显示，仿真数据与少量真实演示联合训练比只用真实演示更有效。

> 💡 关键：RoboCasa 的“规模化”不是简单复制环境数量，而是让布局、风格、物体类别、任务组合和演示轨迹都能系统性扩展。

#### 🧪 练习题
```yaml
question: "RoboCasa 使用 MimicGen 扩展数据集的核心机制是什么？"
options:
  - "直接让 LLM 生成机器人关节轨迹"
  - "把人工演示拆成对象中心子任务，并按新场景物体位姿重定向与拼接轨迹"
  - "只对图像做颜色增强，不改变轨迹"
  - "用真实机器人自动试错收集全部数据"
answer: 1
explain: "MimicGen 利用少量人工演示生成大量成功轨迹，关键是 object-centric 子轨迹重定向和成功过滤。"
```
