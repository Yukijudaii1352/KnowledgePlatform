### VAGEN

```yaml
id: vagen
name: VAGEN
full_name: "VAGEN: 通过强化学习训练 VLM 智能体作为世界模型进行推理"
year: "2025"
org: "Northwestern University"
paper_url: "https://openreview.net/forum?id=vXFm0LXCEN"
category: "world_model"
parent: "—"
motivation: "让 VLM 智能体在多轮交互中显式地进行状态估计与转移预测（即世界建模），并通过 RL 优化推理质量与信用分配"
```

#### 📝 一句话总结

VAGEN 提出将 VLM 智能体训练为显式的世界模型（World Model），通过状态估计（State Estimation）和转移预测（Transition Modeling）两种推理策略增强多轮视觉决策能力，并设计了 WorldModeling Reward 与 Bi-Level GAE 机制实现细粒度的奖励塑形与信用分配，在 Qwen2.5-VL-3B 上超越 GPT-5 等大规模闭源模型。

#### 🎯 核心要点

- **POMDP 建模**：将多轮视觉智能体任务形式化为部分可观测马尔可夫决策过程，每轮接收图像观测并输出动作
- **5 种推理策略**：NoThink、FreeThink、StateEstimation、TransitionModeling、WorldModeling（前两者组合），通过结构化 `<think>` 标签控制推理内容
- **VAGEN-Base 训练框架**：基于 PPO 的多轮 RL 训练，关键创新为 Observation Token Masking——将图像 token 排除在策略梯度之外
- **WorldModeling Reward**：利用 LLM-as-a-Judge 评估智能体的状态估计与转移预测质量，提供密集的推理质量奖励信号
- **Bi-Level GAE**：两层优势估计机制——先在 turn 级别用 \(\gamma_{\text{turn}}\) 计算每轮优势，再在 token 级别用 \(\gamma_{\text{token}}\) 向回传播，解决稀疏奖励下的信用分配问题
- **视觉状态表征研究**：对比自然语言、符号化、结构化三种表征格式，发现最优格式依赖于任务特性
- **6 个评测环境**：Sokoban、FrozenLake、PrimitiveSkill（4 子任务）、Navigation（2 子任务）、SVG Reconstruction，覆盖规划、操控、导航、推理
- **VAGEN-Full（3B）得分 0.82**，超越 GPT-5（0.75）、Claude 4.5 Sonnet（0.64）等闭源模型

#### 🔬 深入细节

##### 框架总览

![VAGEN 框架总览与五种推理策略](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x1.png)
*图 1：VAGEN 框架。左侧展示多轮交互流程（观测→推理→动作→环境反馈），右侧展示五种推理策略的结构化输出格式。WorldModeling 策略同时包含 `<observation>`（状态估计）和 `<prediction>`（转移预测）字段。*

![VAGEN-Base 多轮 RL 训练流程](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x2.png)
*图 2：VAGEN-Base 训练流程。智能体在环境中执行多轮交互生成轨迹，通过 PPO 优化策略，其中 Observation Token Masking 确保只对动作 token 计算策略梯度。*

![Bi-Level GAE 与 Token-Level GAE 对比](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x3.png)
*图 3：标准 Token-Level GAE（左）将稀疏的终端奖励逐 token 回传；Bi-Level GAE（右）先在 turn 级别分配奖励（紫色箭头），再在 token 级别传播（橙色箭头），实现层次化信用分配。*

##### 算法伪代码

```python
# VAGEN-Full 多轮 RL 训练框架伪代码
def vagen_full_training(env, policy_vlm, critic, llm_judge):
    for iteration in range(N_iterations):
        # === Rollout 阶段 ===
        trajectories = []
        for episode in range(batch_size):
            obs = env.reset()  # 初始图像观测
            trajectory = []
            for turn in range(max_turns):
                # 智能体生成结构化输出：<think><observation>...</observation><prediction>...</prediction>...</think><answer>action</answer>
                response = policy_vlm.generate(obs, strategy="WorldModeling")
                action = parse_action(response)
                obs_belief = parse_observation(response)   # 状态估计 ŝ_t
                pred_belief = parse_prediction(response)   # 转移预测 ŝ_{t+1}
                
                next_obs, task_reward, done = env.step(action)
                
                # WorldModeling Reward: LLM-as-Judge 评估推理质量
                gt_state = env.get_ground_truth_state()
                gt_next_state = env.get_ground_truth_state()
                r_reason = β_s * judge_match(obs_belief, gt_state) \
                         + β_w * judge_match(pred_belief, gt_next_state)
                
                r_turn = r_reason + r_format + task_reward
                trajectory.append((obs, response, action, r_turn, next_obs))
                obs = next_obs
                if done: break
            trajectories.append(trajectory)
        
        # === Bi-Level GAE 优势估计 ===
        for traj in trajectories:
            # 第一层：Turn-Level GAE
            turn_advantages = compute_turn_gae(
                rewards=[t.r_turn for t in traj],
                values=critic.evaluate(traj),
                gamma=gamma_turn, lambda_=lambda_turn
            )
            # 第二层：Token-Level GAE（以 turn advantage 初始化末尾 token）
            token_advantages = []
            for t, turn_adv in enumerate(turn_advantages):
                token_advs = compute_token_gae(
                    kl_penalties=compute_kl(traj[t].response),
                    values=critic.token_values(traj[t]),
                    gamma=gamma_token, lambda_=lambda_token,
                    terminal_advantage=turn_adv  # 关键：用 turn 级优势初始化
                )
                token_advantages.extend(token_advs)
        
        # === PPO 优化（带 Observation Token Masking）===
        for epoch in range(K_epochs):
            # 仅对 action tokens 计算策略梯度，mask 掉 observation tokens
            ratio = policy_vlm.prob(actions) / old_policy.prob(actions)
            clipped = clip(ratio, 1-ε, 1+ε)
            loss = -min(ratio * token_advantages, clipped * token_advantages)
            loss = loss * action_token_mask  # Observation Token Masking
            policy_vlm.update(loss)
```

##### 方法详解

**1. 动机与问题定义：多轮视觉智能体的推理瓶颈**

当前 VLM（视觉语言模型）在单轮视觉问答任务上表现出色，但在需要多轮交互的智能体任务中（如推箱子、机器人操控、迷宫导航）表现显著下降。论文将这一问题归因于两个核心缺陷：（1）VLM 缺乏对视觉状态的显式推理能力——它们不会主动"描述当前看到了什么"以及"执行动作后世界会变成什么样"；（2）现有 RL 训练方法（如 GRPO、标准 PPO）无法有效处理多轮交互中的信用分配问题——稀疏的终端奖励难以指导中间每一步的决策质量。

VAGEN 的核心洞察是：**让 VLM 像世界模型一样思考**。具体来说，在每轮决策前，智能体需要显式地完成两项推理任务：**状态估计**（State Estimation，用自然语言描述当前观测到的环境状态 \(\hat{s}_t\)）和**转移预测**（Transition Modeling，预测执行动作后环境将变成什么状态 \(\hat{s}_{t+1}\)）。这种设计受到认知科学中"内部世界模型"概念的启发——人类在行动前会在脑中模拟动作的后果。

**2. 核心机制：结构化推理策略与 VAGEN-Base**

论文设计了 5 种推理策略来系统性地研究不同推理深度的影响。所有策略都通过结构化的 XML 标签控制输出格式：

- **NoThink**：直接输出动作，不进行任何推理（`<answer>action</answer>`）
- **FreeThink**：在 `<think>` 标签中自由推理，类似 Chain-of-Thought
- **StateEstimation**：在 `<think>` 中必须包含 `<observation>` 字段，描述当前视觉状态
- **TransitionModeling**：在 `<think>` 中必须包含 `<prediction>` 字段，预测下一状态
- **WorldModeling**：同时包含 `<observation>` 和 `<prediction>`，完整的世界建模

> 💡 **关键发现**：StateEstimation 在导航任务中表现最佳（理解当前位置是关键），TransitionModeling 在操控任务中表现最佳（预测物体运动是关键），而 WorldModeling 在所有任务上都表现稳定且最优。

VAGEN-Base 的训练框架基于 PPO，但引入了一个关键创新——**Observation Token Masking**。在多轮交互中，轨迹由交替出现的观测 token（图像编码）和动作 token（模型生成）组成。由于观测 token 不是由智能体策略生成的，对其计算策略梯度在理论上是错误的，且冗长的观测序列会主导梯度权重分布。因此，VAGEN 在计算 PPO 损失时将所有观测 token 的 mask 设为 0，仅对动作 token 进行优化。

**3. WorldModeling Reward：基于 LLM 裁判的推理质量奖励**

为了监督智能体的世界建模推理质量，VAGEN 引入了 WorldModeling Reward。其核心思路是：从环境中获取真实状态信息（如 Sokoban 中玩家/箱子/目标的 2D 坐标），然后评估智能体在 `<observation>` 和 `<prediction>` 中的描述与真实状态的匹配程度。

论文最初尝试使用 CLIP 计算图文相似度作为奖励，但发现 CLIP 对细粒度的空间和几何细节不够敏感。最终采用 **LLM-as-a-Judge** 方案：将智能体的推理文本和真实状态文本一起输入 LLM，由 LLM 直接判断匹配程度（二元判断或提取结构化信息后进行 F1 评分）。每轮的推理奖励定义为：

$$r^{\text{reason}}_t = \beta_s \cdot \mathcal{I}_{\text{SE}}(\hat{s}_t, s_t) + \beta_w \cdot \mathcal{I}_{\text{TM}}(\hat{s}_{t+1}, s_{t+1})$$

其中 \(\mathcal{I}\) 为匹配得分函数，\(\beta_s, \beta_w\) 为奖励系数（默认均为 0.5）。

**4. Bi-Level GAE：层次化信用分配**

标准 GAE 在多轮交互中面临严重的信用分配问题：稀疏的终端奖励需要跨越数十个 turn、数百个 token 进行回传，信号极度衰减。VAGEN 提出 **Bi-Level GAE**，将优势估计分解为两个层次：

**Turn 级别**（外层）：将每轮的复合奖励 \(r_t = r^{\text{reason}}_t + r^{\text{format}}_t + R(s_t, a_t)\) 作为该轮的即时奖励，使用 critic 在每轮动作末尾的价值估计计算 TD 误差：

$$\delta^{\text{turn}}_t = r_t + \gamma_{\text{turn}} V_\phi(\bar{\tau}_{\leq a_{t+1}}) - V_\phi(\bar{\tau}_{\leq a_t})$$

然后通过标准 GAE 递推计算 turn 级优势：\(A^{\text{turn}}_t = \delta^{\text{turn}}_t + \gamma_{\text{turn}} \lambda_{\text{turn}} A^{\text{turn}}_{t+1}\)。

**Token 级别**（内层）：在每个 turn 内部，以 KL 惩罚作为 token 级奖励，计算 token 级 TD 误差和优势。**关键连接**：每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势 \(A^{\text{turn}}_t\)，从而将 turn 级别的反馈注入 token 级别并向前传播。

> ⚠️ **与传统方法的区别**：Vanilla PPO 不做 observation masking 导致训练失败；GRPO 因场景变化导致轨迹多样性过高，需要不可承受的样本量；Turn-level PPO 对同一 turn 内所有 token 使用均匀优势估计，无法区分各 token 的贡献。Bi-Level GAE 同时解决了这三个问题。

**5. 消融实验与关键发现**

消融实验揭示了两个组件的互补性：Bi-Level GAE 单独使用时提升显著但不稳定（对奖励稀疏性和准确性敏感）；WorldModeling Reward 单独使用时一致性提升但受限于粗粒度的轨迹级信用分配。两者结合的 VAGEN-Full 在所有任务上都是最稳定且表现最优的方法。特别值得注意的是，在 PrimitiveSkill 任务上，VAGEN-Base 和 VAGEN-Full 的训练准确率相近，但 VAGEN-Full 的测试准确率显著更高，表明世界建模推理增强了泛化能力。

#### 🧪 练习题

```yaml
question: "VAGEN 中 Bi-Level GAE 的 token 级优势估计是如何与 turn 级优势关联的？"
options:
  - "将所有 turn 级优势求平均后作为每个 token 的优势"
  - "每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势，然后向前传播"
  - "token 级优势独立计算，与 turn 级优势相加得到最终优势"
  - "使用 turn 级优势对 token 级优势进行归一化"
answer: 1
explain: "Bi-Level GAE 的关键连接机制是将每个 turn 最后一个 action token 的优势初始化为预先计算好的 turn 级优势 A^turn_t，然后通过 token 级 GAE 的反向递推将该信号传播到 turn 内所有 token，实现层次化的信用分配。"
```