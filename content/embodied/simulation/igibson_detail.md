### iGibson — iGibson物体中心仿真 (iGibson)

```yaml
id: igibson
name: iGibson
full_name: iGibson物体中心仿真 (iGibson)
year: "2021"
org: Stanford
paper_url: https://arxiv.org/abs/2108.03272
category: interactive
parent: "—"
motivation: 以物体为中心的仿真，支持大规模家务任务
```

#### 📝 一句话总结
iGibson 2.0 将 Gibson 系列从静态视觉导航扩展为以物体状态、交互谓词和人类示教为核心的家务活动仿真器，使机器人能够在真实尺度室内场景中学习清洁、加热、浸湿、开关等可组合任务。

#### 🎯 核心要点
- **问题定位**：早期室内仿真更偏导航和几何感知，缺少对家庭任务中“物体是否干净、是否湿、是否被加热、是否被切开”等状态的显式建模。
- **核心设计**：在物理仿真之上加入 object states、symbolic predicates、generative functions，把连续物理变量映射到任务可读的逻辑条件。
- **数据与任务**：基于语义丰富的室内场景和可交互物体，构造可复现的家务任务，并提供 VR 接口采集人类演示。
- **工程价值**：它不是单个策略算法，而是为 embodied AI 提供任务定义、状态检查、演示采集与物理交互统一闭环的基础设施。

#### 🔬 深入细节

##### 核心示意图
![iGibson object-centric simulation](https://ar5iv.labs.arxiv.org/html/2108.03272/assets/x1.png)

*图示展示 iGibson 2.0 如何把真实家居场景、可交互物体、扩展物体状态和 VR 人类示教连接起来，用于复杂日常活动仿真。*

##### 算法伪代码
```python
def build_igibson_task(scene, symbolic_goal):
    objects = populate_scene_with_interactive_assets(scene)
    states = initialize_physical_states(objects)

    for predicate in symbolic_goal.preconditions:
        # generative function maps symbolic predicates to valid physical states
        states = sample_state_conditioned_on_predicate(states, predicate)

    env = load_physics_scene(scene, objects, states)
    while not env.done():
        obs = env.render_multimodal_observation()
        action = policy(obs, symbolic_goal)
        env.step(action)
        logical_state = evaluate_object_predicates(env.object_states)
        reward = compute_task_reward(logical_state, symbolic_goal)
    return env.trajectory
```

##### 背景与动机
iGibson 的关键判断是：家庭机器人任务并不只是“从 A 点走到 B 点”，而是围绕物体及其可变状态展开。一个盘子的位置重要，但盘子是否干净同样重要；一个炉灶可见并不等价于它处于开启状态；毛巾、杯子、食材等对象还会涉及湿度、温度、切分、覆盖、装载等状态。因此，仿真器如果只提供几何、碰撞和图像渲染，就很难表达“把杯子洗干净”“把食物加热”这类任务。

论文的主要贡献是把物理状态和符号任务定义接起来。若用 \(x_o\) 表示物体 \(o\) 的连续物理状态，用 \(p_k\) 表示某个逻辑谓词，则任务检查可写为：

$$
p_k(o)=\mathbb{1}[f_k(x_o)>\tau_k]
$$

这里 \(f_k\) 可以是温度、湿度、清洁度或开关状态的检测函数，\(\tau_k\) 是任务阈值。这样，策略和任务语言可以使用符号条件，底层仿真仍然保留连续物理变量。

##### 机制拆解
iGibson 2.0 引入了 object states，例如 temperature、wetness、cleanliness、toggled、sliced 等。这些状态一方面参与物理和渲染，另一方面被映射成任务谓词，如 Cooked、Soaked、Clean、On、Sliced。论文还强调 generative functions：当任务要求“水槽里有一个脏杯子”时，系统不仅检查状态，还能采样出满足该谓词的初始物理配置。

这个设计让任务定义更像一个约束满足问题。给定目标谓词集合 \(G=\{g_1,\ldots,g_m\}\)，初始化和成功判定都可以围绕下面的条件展开：

$$
\text{success}(s_t)=\prod_{g_i\in G}\mathbb{1}[g_i(s_t)=\text{true}]
$$

因此，研究者可以把任务重点放在“机器人如何改变世界状态”，而不是为每个任务手写大量脆弱的场景检查代码。

##### 交互与示教
iGibson 还提供 VR 人类示教接口，用于记录人类在同一仿真世界中的操作轨迹。对 imitation learning 或 offline RL 来说，这很重要：示教轨迹不只是关节动作序列，还能与物体状态变化、相机观测、任务谓词同步记录。换言之，它把“人做了什么”和“世界变成了什么状态”对齐到了同一个仿真日志里。

与传统导航基准相比，iGibson 的难点从空间搜索扩展到对象操作、状态变化和长程任务组合。策略需要理解可见物体、可操作 affordance、动作后果以及目标谓词之间的关系；这也是后来 BEHAVIOR、OmniGibson 等系统继续扩展的方向。
