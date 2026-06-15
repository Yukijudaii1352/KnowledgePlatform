### OmniGibson — OmniGibson全能仿真平台 (OmniGibson)

```yaml
id: omnigibson
name: OmniGibson
full_name: OmniGibson全能仿真平台 (OmniGibson)
year: "2023"
org: Stanford
paper_url: https://arxiv.org/abs/2311.01014
category: interactive
parent: igibson
motivation: 结合Omniverse光追渲染，支持千种家务活动
```

#### 📝 一句话总结
OmniGibson 是 iGibson 思路在 NVIDIA Omniverse/PhysX 上的高保真延伸，用 BEHAVIOR-1K 任务定义、丰富物体状态和可组合谓词支撑上千种日常家务活动仿真。

#### 🎯 核心要点
- **资料限制**：清单中的 `paper_url` 指向的 arXiv 条目并非 OmniGibson 论文；本精读依据公开的 BEHAVIOR-1K/OmniGibson 论文与项目资料整理。
- **平台定位**：相比 iGibson，OmniGibson 更强调 Omniverse 光线追踪渲染、PhysX 5 物理和大规模日常活动基准。
- **任务语言**：BEHAVIOR Domain Definition Language 用谓词描述初始条件和目标条件，使任务可自动检查和组合。
- **状态建模**：系统继续扩展温度、浸湿、清洁、开关、容纳、接触等 object states，并用 transition rules 近似复杂过程。

#### 🔬 深入细节

##### 核心示意图
![OmniGibson and BEHAVIOR-1K overview](https://ar5iv.labs.arxiv.org/html/2403.09227/assets/x1.png)

*图示来自 BEHAVIOR-1K 公开论文，展示人类中心日常活动基准以及 OmniGibson 仿真环境在其中的角色。*

##### 算法伪代码
```python
def run_omnigibson_behavior_task(activity_bddl):
    scene = sample_scene(activity_bddl.scene_requirements)
    objects = load_required_objects(activity_bddl.object_scope)
    state = sample_initial_state(scene, objects, activity_bddl.initial_conditions)

    env = omnigibson.load(scene, objects, state)
    while not env.done():
        obs = env.get_observations()
        action = policy(obs, activity_bddl.goal_conditions)
        env.step(action)
        apply_transition_rules(env.object_states)
        success = all(eval_predicate(g, env.state) for g in activity_bddl.goal_conditions)
    return success, env.log
```

##### 背景与动机
OmniGibson 延续 iGibson 的核心问题：家庭任务的难点在于物体状态和长程交互，而不只是导航。BEHAVIOR-1K 进一步把目标扩展到 1000 种来自人类调查的日常活动，覆盖清理、整理、烹饪、搬运、布置等任务类型。为了表达这些任务，仅有物体类别和位姿是不够的，还需要可检查的逻辑谓词。

一个 BEHAVIOR 风格任务通常由初始条件 \(I\) 和目标条件 \(G\) 定义。执行成功可以写成：

$$
\text{success}(s_t)=\mathbb{1}\left[\bigwedge_{g\in G}g(s_t)\right]
$$

其中 \(g(s_t)\) 可能表示“杯子在柜子里”“盘子是干净的”“灶台处于关闭状态”等。OmniGibson 的工作就是让这些谓词能够在仿真状态中被初始化、更新和检测。

##### 平台机制
OmniGibson 建立在 Omniverse 和 PhysX 之上，因此比早期家居仿真更重视渲染和物理一致性。它支持刚体、关节物体、部分可变形物体、流体相关近似，以及更高质量的材质和光照。对机器人学习而言，这让视觉观测、接触状态和任务谓词之间更紧密。

复杂家务活动经常包含仿真器难以完全建模的过程，例如“清洗”“加热”“弄湿”“污染”。OmniGibson 使用 object states 和 transition rules 处理这类过程：当物体满足接触、温度、容器、液体等前置条件时，规则更新其高层状态。这不是完全精确的物理化学仿真，而是面向任务学习的可计算抽象。

##### 与 iGibson 的关系
从谱系上看，iGibson 提供了以物体状态为中心的交互框架，OmniGibson 则把它推向更大规模任务、更丰富资产和更高保真图形物理。若把任务看作谓词图，策略要学习的是动作如何改变图中节点与边：

$$
P(s_{t+1}\mid s_t,a_t)=P_{\text{physics}}(s_{t+1})\cdot P_{\text{rules}}(z_{t+1}\mid z_t,s_{t+1})
$$

这里 \(s_t\) 是连续物理状态，\(z_t\) 是离散/符号物体状态。OmniGibson 的实用意义在于让二者同时存在：低层控制和视觉由物理世界提供，高层任务由谓词系统提供。

##### 局限与使用建议
由于清单 paper_url 与 OmniGibson 不匹配，严格论文复现需要以 OmniGibson/BEHAVIOR-1K 官方论文和代码文档为准。使用该平台时应明确区分三类信息：真实物理仿真的结果、规则系统更新的高层状态、以及 BDDL 任务定义中的符号谓词。混淆这三层会导致对模型能力的过度解释。
