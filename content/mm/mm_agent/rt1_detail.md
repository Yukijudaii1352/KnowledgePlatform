### RT-1

```yaml
id: rt1
name: RT-1
full_name: "机器人Transformer (Robotics Transformer)"
year: "2022"
org: "Google"
paper_url: "https://arxiv.org/abs/2212.06817"
category: "embodied"
parent: "—"
motivation: "Transformer架构建模机器人动作序列"
```

#### 📝 一句话总结

RT-1 提出面向真实机器人控制的 Robotics Transformer，把图像观察和自然语言指令映射为离散化机器人动作 token，解决大规模多任务机器人策略既要高容量又要实时执行的问题。它用 130K+ 真实演示训练 35M 参数模型，在数百条指令上展现强泛化和数据吸收能力。

#### 🎯 核心要点

- **端到端语言条件控制**：输入机器人相机图像和自然语言指令，输出机械臂、夹爪、底盘等低层动作
- **高效架构**：FiLM 条件化 EfficientNet 编码图像，TokenLearner 压缩视觉 token，Transformer 建模动作序列
- **离散动作建模**：连续动作维度被离散成动作 token，用分类/序列建模方式进行行为克隆
- **大规模真实数据**：约 130K demonstration episodes，覆盖 700+ 指令、13 台机器人、17 个月采集
- **实时控制**：35M 参数模型可约 3 Hz 执行，适合真实机器人闭环控制
- **泛化与数据吸收**：能泛化到新任务、干扰物和背景，并可吸收仿真数据和其他机器人数据而不明显损害原任务表现

#### 🔬 深入细节

##### 框架总览

![RT-1 架构概览](https://ar5iv.labs.arxiv.org/html/2212.06817/assets/x1.png)
*图：RT-1 接收图像和语言指令，经过 EfficientNet、TokenLearner 和 Transformer，输出离散化的机器人动作。*

##### 算法流程

```python
# RT-1 行为克隆训练
for episode in robot_demonstrations:
    instruction = episode.language_instruction
    history = []

    for image_t, action_t in episode:
        # 1. 视觉编码，语言通过 FiLM 调制视觉特征
        visual_tokens = efficientnet_film(image_t, instruction)

        # 2. TokenLearner 压缩空间 token，降低 Transformer 成本
        compact_tokens = token_learner(visual_tokens)

        # 3. Transformer 根据历史和当前观察预测动作 token
        pred_action_tokens = transformer(compact_tokens, instruction, history)

        # 4. 连续动作已离散成分类标签
        target_tokens = discretize(action_t)
        loss = cross_entropy(pred_action_tokens, target_tokens)
        update(loss)

        history.append((compact_tokens, target_tokens))

# 推理时循环执行
while not done:
    image = robot.camera()
    action_tokens = policy(image, instruction, history)
    action = undiscretize(action_tokens)
    robot.execute(action)
```

##### 方法细节

**1. 动机与背景**

机器人控制需要同时满足两个目标：模型要有足够容量理解语言、视觉和多任务结构；又必须足够快，能在真实机器人上闭环执行。纯 CNN 策略容量有限，难以吸收海量多任务数据；大型 Transformer 又可能太慢。RT-1 的贡献是在这两个约束之间做出工程上可运行的折中。

论文把语言条件机器人控制建模为序列决策。给定指令 \(i\) 和到当前时刻的视觉观察 \(\{x_j\}_{j=0}^{t}\)，策略输出动作分布：

$$
\pi_\theta(a_t \mid i, x_{\le t})
$$

训练使用行为克隆，即最大化人类/专家演示动作的似然。

**2. 架构拆解**

RT-1 的视觉前端是 EfficientNet。语言指令不只是拼接到末端，而是通过 FiLM 调制视觉特征，让视觉编码器在早期就根据任务关注相关物体和区域。之后 TokenLearner 从密集视觉特征中学习少量关键 token，减少 Transformer 处理的序列长度。

Transformer 负责整合时间上下文和任务条件，输出动作 token。与直接回归连续控制量相比，离散化动作让训练变成稳定的分类问题，也便于沿用序列模型的 next-token 风格目标。

**3. 动作离散化与损失**

设动作向量被拆成多个维度 \(a_t=(a_t^1,\ldots,a_t^D)\)，每个连续维度离散到固定 bins。训练目标可以写作：

$$
\mathcal{L}_{BC}
=-\sum_t\sum_{d=1}^{D}\log p_\theta(b_t^d \mid i,x_{\le t},b_t^{<d})
$$

其中 \(b_t^d\) 是第 \(d\) 个动作维度的离散 token。直觉上，模型不是一次输出一个浮点向量，而是像语言模型一样输出动作“词”。

**4. 大规模真实数据的作用**

RT-1 的训练数据来自 Everyday Robots 平台，包含 130K+ 演示和 700+ 训练指令。论文报告模型在训练指令上可达到高成功率，并且相对 BC-Z、Gato 等基线在新任务、干扰物、背景变化上更鲁棒。这说明 Transformer 的容量和数据规模配合后，可以学习跨任务共享的视觉-动作结构。

更有意义的是数据吸收实验：RT-1 可以加入仿真数据或其他机器人形态的数据，在不明显降低原有任务表现的情况下改善新场景泛化。这为后续 Open X-Embodiment、RT-X、OpenVLA 等“混合多机器人数据”路线奠定了方向。

**5. 与传统机器人策略的区别**

传统机器人策略常为单一任务训练，或者依赖显式状态估计、任务规划和手工控制器。RT-1 则把多任务语言条件控制尽量压缩成一个可扩展的序列模型：图像和指令进来，动作 token 出去。它仍是模仿学习，不保证超越示范者，也难以凭空学会训练数据完全没有的新运动模式，但它证明了真实机器人数据规模化后 Transformer 策略可以稳定工作。

> 💡 关键：RT-1 的“Transformer”价值不在于模型很大，而在于把机器人控制改写成可扩展的数据吸收问题。

#### 🧪 练习题

```yaml
question: "RT-1 使用 TokenLearner 的主要目的是什么？"
options:
  - "把自然语言翻译成机器人代码"
  - "从密集视觉特征中压缩出少量关键 token，降低 Transformer 实时控制成本"
  - "为每个任务训练独立策略头"
  - "替代机器人底层控制器完成电机驱动"
answer: 1
explain: "RT-1 需要在真实机器人上闭环运行，TokenLearner 将视觉 token 压缩后再交给 Transformer，使模型兼顾容量和推理速度。"
```
