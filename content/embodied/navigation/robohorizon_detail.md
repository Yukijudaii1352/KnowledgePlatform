### RoboHorizon — LLM辅助多视角世界模型 (LLM-Assisted Multi-View World Model)

```yaml
id: robohorizon
name: RoboHorizon
full_name: "LLM辅助多视角世界模型 (LLM-Assisted Multi-View World Model)"
year: "2025"
org: "arXiv"
paper_url: "https://arxiv.org/abs/2501.06605"
category: "task_planning"
parent: "fltrnn"
motivation: "世界模型多视角长程规划"
```

#### 📝 一句话总结

RoboHorizon 提出 Recognize-Sense-Plan-Act 框架，把 LLM 生成的多阶段奖励、关键帧多视角表征和 Dreamer 风格世界模型结合起来，解决长程机器人操作中“任务分解难、奖励稀疏、视觉状态难压缩”的问题。

#### 🎯 核心要点

- RSPA 四阶段框架：Recognize 用 LLM 生成子任务描述与奖励代码，Sense 学习关键帧多视角表征，Plan 训练 RSSM 世界模型，Act 在想象轨迹中优化策略。
- LLM 不直接输出动作，而是把自然语言目标转为密集的多阶段奖励 \(r_t^{(k)}\)，为长程任务提供可学习的中间信号。
- KMV-MAE 利用演示中的关节速度和夹爪状态发现 key-horizon，并通过多视角遮蔽重建学习对关键状态敏感的视觉表示。
- RoboHorizon 世界模型继承 Dreamer/MWM 的 latent dynamics 思路，在冻结表征空间里预测未来 latent、reward 和 continuation。
- 策略优化采用 DreamerV2 式 actor-critic，通过模型想象 rollout 计算 \(\lambda\)-return，减少真实交互成本。
- 实验覆盖 RLBench 与 FurnitureBench，重点验证长程多阶段操作、少奖励场景和多视角输入下的规划收益。

#### 🔬 深入细节

![RoboHorizon 框架图](https://arxiv.org/html/2501.06605v1/x2.png)
*图：RoboHorizon 将 LLM 任务识别、关键视角感知、latent 世界模型和 actor-critic 控制串成 RSPA 闭环。*

```python
# RoboHorizon / RSPA 伪代码
def train_robohorizon(task_text, demos, env):
    stages = llm_expand_task(task_text)                 # Recognize: 语言目标 -> 多阶段动作语义
    reward_fns = llm_generate_reward_code(stages)       # 为每个阶段生成状态奖励函数

    keyframes = discover_key_horizons(demos)            # 关节近静止且夹爪状态变化附近
    encoder = train_kmv_mae(demos, keyframes)           # Sense: 多视角遮蔽重建 + reward 预测

    world_model = RSSM()
    for batch in replay_buffer(env, reward_fns):
        z = encoder(batch.multi_view_images)
        loss_model = rssm_reconstruction_loss(world_model, z, batch.actions, batch.rewards)
        update(world_model, loss_model)

    actor, critic = init_actor_critic()
    for _ in range(num_updates):
        imagined = world_model.rollout(actor, horizon=H)
        returns = lambda_return(imagined.rewards, imagined.values)
        update(actor, -returns.mean())
        update(critic, mse(critic(imagined.states), returns))
    return actor
```

RoboHorizon 的核心动机是：长程操作任务通常需要多个中间里程碑，例如“打开抽屉、抓取物体、放到目标位置”。传统 RL 如果只用终点奖励，学习信号过稀疏；如果人工设计奖励，又需要大量任务工程。RoboHorizon 让 LLM 承担“语义分解器”和“奖励生成器”的角色：给定自然语言目标、机器人状态接口和 prompt 模板，LLM 先把任务扩写成多阶段 motion description，再把每个阶段翻译成可执行奖励代码。这样奖励可写成阶段加权形式：

$$
r_t = \sum_{k=1}^{K} \alpha_k r_t^{(k)}(s_t, a_t, g_k),
$$

其中 \(g_k\) 是第 \(k\) 个语义子目标，\(\alpha_k\) 控制阶段权重。LLM 生成的奖励不是最终策略，因此系统仍通过 RL 和世界模型学习动作闭环，降低了语言模型直接控制机械臂时的安全和精度风险。

Sense 阶段的关键是 KMV-MAE。它不是对所有视频帧平均建模，而是从演示中找出 key-horizon：当关节速度接近 0、夹爪状态保持或发生关键切换时，往往对应“接触、对齐、完成子步骤”的状态。多视角图像 \(o_t^{1:V}\) 经编码器得到 \(z_t\)，训练目标同时包含遮蔽视角重建和奖励/关键帧预测：

$$
\mathcal{L}_{\text{KMV}} =
\mathcal{L}_{\text{recon}}(\hat{o}_t^{\mathcal{M}}, o_t^{\mathcal{M}})
+ \beta \mathcal{L}_{\text{key}}(\hat{y}_t, y_t)
+ \gamma \mathcal{L}_{\text{reward}}(\hat{r}_t, r_t).
$$

这个设计让表示既保留多视角几何信息，又偏向对长期规划有意义的状态变化，而不是只拟合像素细节。

Plan 阶段使用 RSSM 式 latent dynamics。给定上一隐状态 \(h_t\)、随机状态 \(z_t\) 和动作 \(a_t\)，世界模型学习先验 \(p(z_{t+1}\mid h_t,a_t)\)、后验 \(q(z_{t+1}\mid h_t,a_t,o_{t+1})\)、奖励预测与 continuation 预测。典型目标可概括为：

$$
\mathcal{L}_{\text{wm}} =
\mathcal{L}_{\text{obs}} + \mathcal{L}_{\text{reward}} + \mathcal{L}_{\text{cont}}
+ \mathrm{KL}\left(q(z_t\mid h_t,o_t)\,\|\,p(z_t\mid h_t)\right).
$$

Act 阶段再在世界模型中想象未来轨迹，用 \(\lambda\)-return 训练 actor 和 critic。与直接 model-free RL 相比，它把昂贵的真实环境交互转为 latent rollout；与只做视觉语言规划相比，它能在连续控制层面学习夹爪、关节和接触动态。RoboHorizon 的新意不在某个单独模块，而在把 LLM 奖励、关键多视角表征和 latent imagination 三者对齐到长程操作目标上。

> 💡 关键：RoboHorizon 让 LLM 负责“任务语义与奖励结构”，让世界模型负责“可控动态与策略优化”，两者分工明确。

#### 🧪 练习题

```yaml
question: "RoboHorizon 中 LLM 的主要作用是什么？"
options:
  - "把自然语言任务分解为多阶段描述，并生成可执行奖励函数"
  - "直接输出每个控制周期的机械臂关节角"
  - "替代世界模型预测未来图像"
  - "只用于给实验结果生成文字解释"
answer: 0
explain: "RoboHorizon 使用 LLM 产生阶段化任务语义和奖励代码，连续动作仍由世界模型与 actor-critic 学习。"
```
