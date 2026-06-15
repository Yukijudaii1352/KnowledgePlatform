### Sim2Real-VLA

```yaml
id: sim2real_vla
name: Sim2Real-VLA
full_name: 仿真到现实VLA (Sim2Real-VLA)
year: '2026'
org: Stanford
paper_url: https://openreview.net/forum?id=H4SyKHjd4c
category: frontier_2026
parent: atomvla
motivation: 合成技能零样本迁移消除Sim2Real差距
```

#### 📝 一句话总结

Sim2Real-VLA 提出一种只用合成数据训练、却能零样本迁移到真实机器人操控的 VLA 模型，通过“高层可供性规划 + 低层动作执行”的双系统架构缓解合成仿真到真实世界的视觉与动力学差距。

#### 🎯 核心要点

- 双系统架构：高层 Planner 预测 object-centered chain-of-affordances，低层 Actor 将可供性计划转成实时机器人动作
- 纯合成训练：模型训练不依赖真实机器人微调，目标是用自动生成技能数据实现 hands-free scaling
- 物体中心表示：通过对象掩码和视觉编码过滤背景、纹理等操控无关信息，突出接触点、目标物和运动关键区域
- Tokenized action space：将连续控制转为离散或半离散动作 token，便于 VLA 自回归生成与执行验证
- 执行闭环：Actor 执行当前 affordance 后由 motion validation 判断是否完成，未完成则重复当前 affordance，完成后进入下一步
- 覆盖任务：论文评估包含双臂、灵巧手和长时程操控任务，重点验证不同真实环境和域偏移下的零样本 Sim2Real 泛化

#### 🔬 深入细节

##### 框架示意图

![Sim2Real-VLA 双系统框架](https://assets.getliner.com/web/pseo/represent_iclr_1636.jpg)
*图：Sim2Real-VLA 的公开索引图。左侧规划系统从语言指令与历史观测中预测可供性链，右侧执行系统按可供性逐步生成动作并用运动验证决定继续、重复或切换子目标。*

##### 核心算法伪代码

```python
# Sim2Real-VLA 推理流程伪代码
def sim2real_vla_execute(instruction, history_observations, robot_state):
    masked_obs = object_mask_and_encode(history_observations)
    affordance_chain = planner.generate(
        language=instruction,
        observations=masked_obs,
    )

    for affordance in affordance_chain:
        finished = False
        while not finished:
            action_tokens = actor.generate_tokens(
                affordance=affordance,
                observation=get_current_observation(),
                proprioception=robot_state,
            )
            actions = detokenize_actions(action_tokens)
            robot_state = robot.execute(actions)
            finished = motion_validator(
                affordance=affordance,
                observation=get_current_observation(),
                robot_state=robot_state,
            )
    return "task_finished"
```

##### 方法解释

Sim2Real-VLA 针对的是合成训练数据常见的 Sim2Real gap：合成画面可以规模化生成，但纹理、光照、遮挡、接触误差和真实机械臂动力学都与现实不同。直接把标准 VLA 在合成轨迹上训练后部署到真实机器人，模型容易过拟合像素细节或短期动作模式，一旦真实摄像头视角、桌面材质或物体外观变化就失效。

论文的关键做法是把“想做什么”和“怎么执行”拆成两个紧耦合系统。高层规划器不直接输出每一帧动作，而是预测一串以物体为中心的可供性：

$$
q_{1:K} \sim p_{\theta}(q_{1:K} \mid I, O_{t-H:t})
$$

其中 \(I\) 是语言指令，\(O_{t-H:t}\) 是历史观测，\(q_k\) 表示第 \(k\) 个可供性子目标，例如接近杯口、对齐容器、倾倒或放置。可供性链比自然语言计划更贴近机器人控制，因为它绑定了目标物、交互区域和运动意图。

低层 Actor 接收当前 affordance、视觉观测和机器人本体状态，生成动作 token 序列：

$$
a_{t:t+h} = \mathrm{Detokenize}\left(g_{\phi}(O_t, s_t, q_k)\right)
$$

这种 tokenized action space 的优势是让动作生成与 VLA 的序列建模形式对齐，同时避免直接在长时程任务中一次性预测完整轨迹。执行后，motion validator 判断当前 affordance 是否达成：若未完成，则重复当前 affordance；若完成，则推进到下一个 affordance。

> 💡 关键：Sim2Real-VLA 不是单纯“让合成图像更真实”，而是把策略表示改成更抗域偏移的中层可供性链。真实与仿真的纹理差异会被对象掩码和可供性抽象削弱，真正被保留下来的是“哪个物体、哪个区域、做什么交互”。

训练数据侧，论文强调与自动化技能生成管线集成：通过真实先验投影到仿真、生成式场景扩展和自动技能获取持续生产合成轨迹。这样模型可以在大量物理一致的合成交互中学习，而不是为每个真实任务采集人工演示。

与传统 VLA 相比，Sim2Real-VLA 的不同点在于层次化接口。OpenVLA/RT-2 类模型通常从图像和指令直接输出动作，表示链路短但对数据分布敏感；Sim2Real-VLA 在中间插入 affordance chain，使长时程任务可以被拆成稳定的物体级子目标，再由 Actor 做局部闭环控制。

#### 🧪 练习题

```yaml
question: "Sim2Real-VLA 缓解仿真到现实差距的核心机制是什么？"
options:
  - "在真实机器人上收集大量人工演示后再微调"
  - "将任务拆成物体中心可供性链，并由低层 Actor 闭环执行"
  - "只提升合成图像分辨率，使其更接近真实照片"
  - "完全移除语言指令，只使用机器人状态控制"
answer: 1
explain: "论文的核心是双系统架构：Planner 预测 object-centered affordance chain，Actor 执行并验证每个 affordance，从而保留操控关键结构并削弱仿真纹理差异。"
```
