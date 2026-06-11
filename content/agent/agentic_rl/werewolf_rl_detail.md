### Werewolf-RL: 狼人杀战略语言代理 (Strategic Play in the Werewolf Game)

```yaml
id: werewolf_rl
name: Werewolf-RL
full_name: 狼人杀战略语言代理 (Strategic Play in the Werewolf Game)
year: '2023.10'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2310.18940
category: foundation
parent: saycan
motivation: 用RL纠正语言动作的固有偏置
```

#### 📝 一句话总结
Werewolf-RL 提出“LLM推理+RL决策”的双层框架，用强化学习策略从LLM生成的多样化语言候选动作中做出最优选择，解决了纯LLM代理在复杂决策任务中存在固有不均衡行为偏置的问题，成为 Agentic RL 的重要奠基工作。

#### 🎯 核心要点
- 提出双层框架：LLM负责演绎推理并生成多个候选语言动作，RL策略负责从候选集中选出最优动作
- 首次在狼人杀这一高社交推理游戏中对LLM代理进行强化学习训练，实现人类水平表现
- 系统性地揭示了纯LLM代理的“内在行为偏置”问题：推理正确，但动作分布受预训练数据影响而偏离最优
- 离散动作空间设计：将每个候选语言动作编码为固定维度的嵌入向量，动作空间可随LLM输出动态变化
- 奖励设计：以游戏胜率为奖励信号，必要时加入中间奖励（存活回合数），在冒险社区环境中训练以获得鲁棒策略
- 与 Cicero（Diplomacy）对比：Cicero 使用固定预定义动作集，而 Werewolf-RL 的动作空间由LLM动态生成，支持自由形式语言交互

#### 🔬 深入细节
##### 核心架构图

![图1：纯LLM代理的内在偏置](https://ar5iv.labs.arxiv.org/html/2310.18940/assets/fig1.png)
*图：即使LLM正确推理出“应随机出拳”的策略（100/100次），实际动作分布仍严重偏向“石头”，揭示了推理与决策之间的偏置鸿沟。*

![图2：狼人杀游戏示例](https://ar5iv.labs.arxiv.org/html/2310.18940/assets/fig2.png)
*图：狼人杀游戏中的多角色交互示例——狼人需要欺骗，村民需要推理并投票驱逐隐藏的狼人。*

##### 算法伪代码

```python
# Werewolf-RL 双层框架核心流程
for each game_round:
    # 阶段1: LLM 推理与候选生成
    context = build_prompt(game_history, role, status)
    reasoning, candidates = LLM.generate(context)  # 生成k个候选语言动作
    
    # 阶段2: 候选动作编码
    embeddings = [text_encoder(c) for c in candidates]
    
    # 阶段3: RL策略选择
    state = build_state(game_history, embeddings)
    action_idx = RL_policy.sample(state)  # 从k个候选中选择最优动作
    chosen_action = candidates[action_idx]
    
    # 阶段4: 执行与反馈
    execute(chosen_action)
    reward = get_reward(game_outcome)  # 胜+1 / 负-1，可加中间奖励
    RL_policy.update(state, action_idx, reward)
```

##### 动机与背景

在复杂多代理交互任务中，LLM虽能完成逻辑推理，但其动作选择存在“内在偏置”：模型在预训练过程中学习到的分布会系统性地偏向某些高频动作。例如在石头剪刀布中，LLM能100%正确识别纳什均衡策略（随机出拳），但实际出拳却偏向“石头”。这种偏置在狼人杀等战略游戏中更为致命——对手一旦发现行为模式，便可轻易利用。

传统做法如 Cicero 采用“预定义动作集+LLM对话填充”的方式，动作空间固定且依赖游戏特定设计。而真实世界中的人机交互往往需要自由形式的语言表达，因此需要一个能在“无界语言空间”中做出最优决策的方案。

##### 核心机制

Werewolf-RL 的核心创新在于将“语言生成”与“战略决策”解耦：

1. **LLM推理层**：基于当前游戏上下文（历史对话、角色身份、存活状态），LLM首先进行演绎推理，然后生成 \(k\) 个候选语言动作（如“投票给玩家3”、“声称自己是预言家”等），保证语法正确和语义连贯。

2. **候选编码层**：每个候选动作通过文本嵌入模型转换为固定维度向量 \(\mathbf{e}_i \in \mathbb{R}^{1536}\)，使得RL策略可以在一个规范的数学空间中比较不同候选的质量。

3. **RL决策层**：策略网络接收由游戏状态和所有候选嵌入构成的联合状态 \(\mathbf{s}=[\mathbf{h}_{\text{game}}, \mathbf{e}_1, \ldots, \mathbf{e}_k]\)，输出一个在 \(k\) 个候选项上的概率分布 \(\pi(\mathbf{s})\)。训练时使用 PPO 算法，以游戏胜率为最终奖励信号。

##### 与本领域之前方法的区别

| 方法 | 推理方式 | 动作空间 | 决策机制 |
|------|---------|---------|---------|
| 纯LLM (如GPT-4) | 思维链提示 | 自由文本 | 模型采样，存在偏置 |
| Cicero | 规则+LLM | 固定预定义 | RL策略从有限集选择 |
| **Werewolf-RL** | **LLM推理+候选** | **LLM动态生成** | **RL策略从动态候选集选择** |

关键区别在于：(1) Werewolf-RL 的动作空间由LLM实时生成，不依赖任何游戏特定的预定义动作模板，具有更强的泛化能力；(2) RL策略仅需从 \(k\) 个候选中选择，而非直接生成文本，大幅降低了学习难度。

##### 实验与结果

在 5 人局、6 人局狼人杀游戏中，Werewolf-RL 在所有配置下均显著超越纯LLM基准（GPT-3.5、GPT-4）。人类评估实验表明，代理能达到人类水平表现，且展现出强战略行为——包括有策略的撒谎、团队协作、以及适应对手策略的能力。

> 💡 关键：框架的核心洞察是“推理与决策应分离”——推理交给LLM（保证语言质量和多样性），决策交给RL（保证最优性和无偏性），两者优势互补。

> ⚠️ 注意：候选动作的数量 \(k\) 是一个关键超参数——过小会限制策略选择空间，过大会增加RL训练的样本复杂度。

#### 🧪 练习题
```yaml
question: "Werewolf-RL 为什么要将LLM推理与RL决策分离，而不是直接让LLM输出最终动作？"
options:
  - "因为LLM推理速度太慢，需要RL加速"
  - "因为纯LLM存在内在行为偏置，推理正确但动作选择可能偏离最优策略"
  - "因为RL可以直接生成更流畅的自然语言"
  - "因为狼人杀规则太复杂，LLM无法理解"
answer: 1
explain: "论文通过石头剪刀布实验证明：LLM能100%正确推理出最优策略，但实际动作分布仍严重偏向特定选项。将推理与决策分离后，RL策略可无偏地从候选集中选出最优动作。"
```
