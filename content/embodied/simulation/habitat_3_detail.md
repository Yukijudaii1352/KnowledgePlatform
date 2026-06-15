### Habitat 3.0 — Habitat 3.0社交协作平台 (Habitat 3.0)

```yaml
id: habitat_3
name: Habitat 3.0
full_name: Habitat 3.0社交协作平台 (Habitat 3.0)
year: "2024"
org: Meta AI
paper_url: https://arxiv.org/abs/2310.13724
category: interactive
parent: habitat
motivation: 从静态导航演进至社交人机协作
```

#### 📝 一句话总结
Habitat 3.0 将 Habitat 从静态室内导航扩展到有人类化身参与的协作仿真，使机器人能在同一家庭环境中学习跟随、避让、协作搬运和社交重排等任务。

#### 🎯 核心要点
- **范式变化**：研究对象从“机器人独自在静态场景中导航”转向“机器人与人类在动态家庭中协作”。
- **人类仿真**：平台提供可动画化 humanoid，支持外观、运动轨迹、速度和碰撞等因素。
- **交互接口**：支持脚本化 humanoid、键鼠控制和 VR human-in-the-loop，便于收集人机协作数据。
- **任务集合**：提出 Social Navigation 和 Social Rearrangement，考验机器人在有人类活动的环境中完成任务。

#### 🔬 深入细节

##### 核心示意图
![Habitat 3.0 human robot collaboration](https://ar5iv.labs.arxiv.org/html/2310.13724/assets/x1.png)

*图示展示 Habitat 3.0 中人类化身与机器人共同处于室内环境，用于社交导航和协作重排任务。*

##### 算法伪代码
```python
def run_habitat3_social_task(scene, human_controller, robot_policy):
    env = habitat3.load(scene, agents=["humanoid", "robot"])
    env.reset_with_collaborative_goal()

    while not env.episode_over():
        human_obs = env.observe("humanoid")
        human_action = human_controller(human_obs)

        robot_obs = env.observe("robot")
        robot_action = robot_policy(robot_obs, env.goal)

        env.step({"humanoid": human_action, "robot": robot_action})
        env.update_social_metrics()
    return env.task_success(), env.metrics
```

##### 背景与动机
Habitat 1.x/2.x 已经让 embodied agent 在真实扫描或可交互场景中进行导航、重排和操作，但许多家庭场景的关键变量是“人”。机器人如果要进入真实家庭，需要处理人类移动、停留、占用空间、请求协助以及与机器人共享路径的问题。Habitat 3.0 的核心贡献就是把人类作为可模拟、可控制、可评估的动态 agent 纳入环境。

这改变了任务目标函数。传统导航可近似写为最短路或 SPL 优化；社交导航还要惩罚不舒适距离、碰撞和阻挡：

$$
R_t = R_{\text{task}}(s_t,a_t)-\lambda\mathbb{1}[\text{collision}]-\mu\,\max(0,d_{\text{safe}}-d_{\text{human}})
$$

因此，成功不再只是到达目标点，而是以社会可接受的方式到达，并在必要时配合人类动作。

##### Humanoid 与交互
Habitat 3.0 的 humanoid 不是简单圆柱障碍物。论文描述了基于人体骨架、网格、线性蒙皮和动作数据的化身系统，使人类可以执行自然的行走、转身和手部动作。平台还支持缓存动作轨迹并把它们适配到不同场景中，从而在大规模训练时保持高吞吐。

在人机协作任务里，人类既可以由脚本驱动，也可以由真实用户通过键鼠或 VR 控制。这个 human-in-the-loop 设计很重要，因为社交行为很难完全预先脚本化；真实用户的临场决策能暴露机器人策略在让路、跟随、等待和协同方面的缺陷。

##### 任务与评估
Social Navigation 要求机器人在有移动人类的环境中寻找、跟随或保持合适距离。Social Rearrangement 则进一步要求机器人和人类一起改变物体位置，例如人类移动某些物品，机器人需要理解协作目标并完成剩余工作。二者都迫使策略处理非平稳世界：同一个动作在不同人类运动状态下会产生不同结果。

Habitat 3.0 的工程亮点是效率。论文报告在加入 humanoid 后仍保持高帧率，这意味着研究者可以训练强化学习策略，而不是只能进行少量离线评估。对 embodied AI 来说，这个平台把社交约束从后处理指标前移到了仿真和训练循环中。
