### SAGE: 技能增强组相对策略优化 (SAGE)

```yaml
id: sage
name: SAGE
full_name: 技能增强组相对策略优化 (SAGE)
year: '2025.12'
org: AWS Agentic AI
paper_url: https://arxiv.org/abs/2512.17102
category: self_improve
parent: voyager
motivation: 让技能生成与调用获得联合奖励
```

#### 📝 一句话总结
SAGE 提出 Sequential Rollout 与 Skill-integrated Reward 两大机制，将技能库（Skill Library）系统性地融入 GRPO 强化学习框架，使 LLM Agent 能够在任务链中持续积累和复用可执行技能，在 AppWorld 基准上将 Scenario Goal Completion 提升 8.9% 的同时减少 59% 的生成 Token。

#### 🎯 核心要点
- 统一技能生成与任务执行的格式：Agent 在交互时生成可编程函数（skill function）并调用，而非直接使用原始 API
- Sequential Rollout 机制：在同场景任务链上依次执行 rollout，前序任务生成的技能自动积累到技能库并供后续任务使用
- Skill-integrated Reward 设计：将 Outcome Reward 与 Skill Reward 加权组合，显式奖励高质量的技能生成与复用
- 基于 GRPO 扩展：在组内相对优势计算中引入技能库条件，重要性采样项中加入技能库信息
- 三步训练流程：Prompt-based Skill Library Agent → SFT（Claude 3.5 Sonnet V2 专家轨迹）→ SAGE（RL）
- 在 AppWorld Test Normal 上达到 72.0% TGC、60.7% SGC（SGC 比 GRPO 高 8.9%），平均仅需 12.1 步交互、1475 Token
- 消融实验验证：技能库使用带来显著 SGC 增益；Skill-integrated Reward 优于纯 Outcome-based 和 Chain-based Reward

#### 🔬 深入细节
##### 动机与背景

传统 LLM Agent 面临两大核心挑战：(1) RL 训练后难以在新环境中持续自我提升（self-improvement）；(2) 现有技能库方法（如 Voyager, Agent Skill Induction）依赖 Prompt 工程进行技能生成和调用，受限于基座模型的指令遵循能力。SAGE 的目标是通过 RL 训练让 Agent 学会"何时生成技能、生成什么技能、何时调用技能"，从而实现真正的自进化。

##### 技能库 Agent（Skill Library Agent）

SAGE 沿用 DynaSaur 的统一格式设计：Agent 在执行任务时，首先生成一个 Python 函数（skill function），再以函数调用方式执行，而非直接拼装 API 调用序列。形式化地，给定任务 \( q \) 和技能库 \( \mathcal{M} \)（初始可为空），Agent 先检索相关技能子集 \( [a_1, \dots, a_k] \) 加入上下文，随后交替执行三类原子操作：

- **Skill Usage**：调用已有技能 \( a_i \)
- **Skill Generation**：从当前交互轨迹中提炼新技能并存入 \( \mathcal{M} \)
- **Direct API Call**：直接调用环境 API

此统一格式使得任务执行和技能生成过程在 RL rollout 中保持一致，避免了传统方法中"先完成全部任务再回头定义技能"导致的上下文过长和训练不一致问题。

##### Sequential Rollout（序列化展开）

这是 SAGE 的核心创新。传统 GRPO 对每个独立任务的多个 rollout（group）并行采样，而 SAGE 将其改造为**任务链上的序列化展开**：

![SAGE 核心流程图](https://ar5iv.labs.arxiv.org/html/2512.17102/assets/x1.png)
*图 1：技能库 Agent 及 Sequential Rollout 与 Skill-integrated Reward 的整体示意图*

具体流程：对于一个包含多个相似任务的 Scenario（如 AppWorld 中同一场景的 3 个子任务），Agent 按序逐个执行。在任务 \( q_i^k \) 执行完毕后，生成的技能被加入技能库 \( \mathcal{M}_{i}^{k} \)，并传递给下一个任务 \( q_i^{k+1} \)。这意味着：
- 同一 group 内，每个任务的技能库条件 \( \mathcal{M}_i^k \) 是**不同的**（与原始 GRPO 中所有生成来自相同 query 完全不同）
- 第一个任务 \( \mathcal{M}_i^1 = \emptyset \)，第二个任务可使用第一个任务积累的技能

##### Skill-integrated Reward（技能融合奖励）

为鼓励 Agent 在任务链中生成和利用高质量技能，SAGE 设计了复合奖励：

$$R_i^k = \lambda \cdot R_{\text{outcome}} + (1 - \lambda) \cdot R_{\text{skill}}$$

其中：
- \( R_{\text{outcome}} \in \{0, 1\} \)：任务完成与否的二元奖励
- \( R_{\text{skill}} \)：技能质量奖励，评估生成技能的可复用性、正确性和实际被后续任务调用的频率
- \( \lambda \)：平衡系数（实验中 \(\lambda = 0.5\)）

##### SAGE 目标函数

SAGE 的损失函数继承 GRPO 的 Clip 机制，但重要性采样中条件于技能库：

```python
# SAGE 核心目标函数（简化伪代码）
for group_i in task_chain:
    for task_k in [1, 2, 3]:  # 同一 scenario 的 3 个任务
        # 获取当前技能库（前序任务积累的技能）
        M_k = skill_library if k > 1 else {}
        # 从旧策略采样（推理阶段）
        o_k = policy_old.generate(query, M_k)
        # 计算技能融合奖励
        R_k = lambda * outcome_reward(o_k) + (1-lambda) * skill_reward(o_k)
        # 组内优势（GRPO 风格：组内均值归一化）
        A_k = R_k - mean(R_i for i in group)

    for epoch in range(K):
        for minibatch in data:
            ratio = πθ(o|q, M) / πθ_old(o|q, M)
            clipped_ratio = clip(ratio, 1-ε, 1+ε)
            loss = -min(ratio * A, clipped_ratio * A)
            optimizer.step(loss)
```

> ⚠️ 注意：SAGE 中的 ratio 计算比原始 GRPO 多了一项条件——技能库 \( \mathcal{M} \)。同一 group 内不同任务的 \( \mathcal{M}_i^k \) 各不相同，这是 SAGE 与原始 GRPO 的关键差异（论文中红色高亮标注）。

##### 训练流程

1. **Skill Library Agent 构建**：基于 Qwen2.5-32B-Instruct，设计专用 In-context Example 和指令，使其具备技能生成/调用能力。此时仅靠 Prompt，性能有限（TGC 30.7%）。
2. **SFT 阶段**：使用 Claude 3.5 Sonnet V2 作为专家在 AppWorld Train 集上生成高质量交互轨迹，进行监督微调。SFT 后 TGC 提升至 55.2%，但仍未超越 GRPO baseline（无技能库）。
3. **SAGE 阶段**：在 SFT 模型基础上应用 Sequential Rollout + Skill-integrated Reward 进行强化学习。最终 TGC 达 72.0%、SGC 60.7%，超越所有 baseline（包括 GRPO 的 69.2% TGC / 51.8% SGC）。

##### 关键实验结果

| 方法 | TGC (Test Normal) | SGC (Test Normal) | Avg. Steps | Avg. Tokens |
|------|-------------------|-------------------|------------|-------------|
| Qwen2.5 32B + ReAct (Training Free) | 39.2 ± 3.5 | 18.6 ± 2.0 | - | - |
| GRPO (无技能库) | 69.2 ± 2.7 | 51.8 ± 5.8 | 16.4 ± 0.2 | 3,613 ± 200 |
| Skill Library Agent (仅 Prompt) | 30.7 ± 3.1 | 19.6 ± 1.4 | 13.4 ± 0.4 | 2,988 ± 73 |
| **+ SFT** | 55.2 ± 1.5 | 41.7 ± 1.7 | 11.4 ± 0.5 | 1,340 ± 65 |
| **+ SAGE (Ours)** | **72.0 ± 1.5** | **60.7 ± 1.5** | **12.1 ± 0.2** | **1,475 ± 127** |

> 💡 关键：SAGE 不仅提升了任务完成率，还大幅降低了推理成本——相比 GRPO baseline，生成 Token 减少 59%，交互步数减少 26%。

##### 消融实验关键发现

- **技能库作用**：移除技能库后，SAGE 的 SGC 从 60.7% 降至 54.8%（-5.9pp），验证技能库对跨任务迁移的核心贡献。
- **Reward 设计**：Skill-integrated Reward 的 SGC（60.7%）优于 Outcome-based（55.4%）和 Chain-based（56.6%），证明显式奖励技能质量的重要性。
- **初始化方式**：直接从 Base Model 启动 SAGE 仅达 25.6% SGC，远低于 SFT 初始化（60.7%），说明 SFT 对技能格式先验至关重要。

#### 🧪 练习题
```yaml
question: "SAGE 的 Sequential Rollout 机制与传统 GRPO 的 rollout 方式有何本质区别？"
options:
  - "SAGE 使用更大的 group size 来增加采样多样性"
  - "SAGE 在任务链上顺序执行 rollout，前序任务生成的技能累积到库中并条件化后续任务的策略"
  - "SAGE 对每个任务独立采样多个 trajectory，然后取平均奖励"
  - "SAGE 将 rollout 过程限定在单个任务上以降低计算开销"
answer: 1
explain: "传统 GRPO 对独立任务并行采样 group 内多个 rollout（共享相同 query），而 Sequential Rollout 在 3 个相似任务组成的 chain 上顺序执行，前序任务积累的技能库条件化后续任务，使 group 内各 rollout 来自不同的技能库状态。"
```
