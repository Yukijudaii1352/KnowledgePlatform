### CALVIN — CALVIN语言条件长程操作基准 (CALVIN)

```yaml
id: calvin
name: CALVIN
full_name: CALVIN语言条件长程操作基准 (CALVIN)
year: "2022"
org: Freiburg
paper_url: https://arxiv.org/abs/2112.03227
category: benchmark
parent: "—"
motivation: 语言条件长程操作，评估零样本指令泛化
```

#### 📝 一句话总结
CALVIN 用语言指令、视觉观测和连续控制构造长程桌面操作基准，重点评估策略能否在新环境中连续完成多条自然语言子任务。

#### 🎯 核心要点
- **长程目标**：评估连续执行 5 条语言指令的能力，而不是只完成单个短任务。
- **数据来源**：包含约 24 小时遥操作 play data 和大量语言标注，覆盖抽屉、门、按钮、开关、灯和积木操作。
- **泛化协议**：使用四个环境划分，常见设置是在三个环境训练、第四个环境零样本测试。
- **基准意义**：推动语言条件 imitation learning 从短程单任务走向组合式、开放顺序的机器人操作。

#### 🔬 深入细节

##### 核心示意图
![CALVIN tabletop environment](https://ar5iv.labs.arxiv.org/html/2112.03227/assets/figures/scene.png)

*图示展示 CALVIN 的桌面操作环境与传感器布局，用于语言条件机器人控制。*

##### 算法伪代码
```python
def evaluate_calvin_sequence(env, policy, instruction_chain):
    obs = env.reset()
    completed = 0
    for instruction in instruction_chain:
        for t in range(env.max_steps_per_instruction):
            action = policy(obs, instruction)
            obs, _, _, info = env.step(action)
            if env.subtask_success(instruction):
                completed += 1
                break
        else:
            break
    return completed
```

##### 背景与动机
许多语言条件机器人基准关注“给一句话，完成一个动作”。真实家务任务更接近一串开放顺序的子目标：打开抽屉、取出物体、按下按钮、移动积木、再关闭抽屉。CALVIN 的核心贡献是把语言条件控制放到长程组合评估中，检查策略是否能在连续执行中保持状态、处理误差累积并根据新指令切换行为。

策略可写为：

$$
a_t \sim \pi_{\theta}(a_t\mid o_{\le t}, l_k)
$$

其中 \(o_{\le t}\) 是视觉和本体历史，\(l_k\) 是当前语言指令。长程评估中，一条 episode 包含多个 \(l_k\)，策略必须在完成当前指令后切换到下一条，而不是仅优化单个短程成功率。

##### 数据与环境
CALVIN 使用 Franka Panda 机械臂、平行夹爪和桌面环境，包含抽屉、滑门、按钮、开关、灯光以及不同颜色/形状的积木。观测包括静态相机、腕部相机、深度、本体状态和触觉等。数据来自遥操作 play data，而不是严格分段的任务演示，这使数据更贴近真实交互中的连续探索。

语言标注把 play data 中的行为片段映射到自然语言指令。这样，模型可以从非结构化操作流中学习动作语义，并在评估时根据新指令组合这些技能。CALVIN 的四个环境 A-D 共享任务语义但布局和外观不同，用于检验视觉和语言 grounding 的环境泛化。

##### 长程指标
CALVIN 的代表性评估是给定 1000 条长度为 5 的指令链，统计模型连续完成的平均子任务数。若第 \(i\) 个子任务成功记为 \(S_i\)，完成前 \(k\) 个任务的概率可写为：

$$
P(\text{complete } k)=\prod_{i=1}^{k}P(S_i\mid S_1,\ldots,S_{i-1})
$$

这个指标对误差累积非常敏感：单步成功率看似不低的模型，连续 5 步后可能迅速下降。正因如此，CALVIN 对评估机器人 foundation policy、语言条件 imitation learning 和长程规划非常有代表性。
