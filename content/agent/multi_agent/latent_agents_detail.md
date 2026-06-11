### Latent Agents: 潜在智能体 (Latent Agents)

```yaml
id: latent_agents
name: Latent Agents
full_name: 潜在智能体 (Latent Agents)
year: '2026.04'
org: Boston University
paper_url: https://arxiv.org/abs/2604.24881
category: optimization
parent: mad
motivation: 把显式辩论蒸馏进单模型
```

#### 📝 一句话总结
Latent Agents 提出了一种通过两阶段微调（SFT 辩论结构学习 + RL 动态奖励调度与长度裁剪）将显式多智能体辩论蒸馏进单模型的后训练方法，在 GSM8K/MMLU 等基准上匹配甚至超越显式辩论性能，同时推理时 token 消耗减少达 93%。

#### 🎯 核心要点
- **问题定义**：多智能体辩论（MAD）虽能提升推理能力，但需生成冗长的多轮辩论文本，推理开销极高
- **两阶段训练流水线**：① SFT 辩论结构学习 → ② RL 内化阶段（DPO/GRPO + 动态奖励调度 + 长度裁剪）
- **动态奖励调度**：RL 阶段逐步降低对输出长度的奖励权重，引导模型自主缩短推理链
- **长度裁剪机制**：在 token 采样时设置硬性上限，防止内化阶段生成过长序列
- **Agent-Specific Subspace 发现**：内化后模型的激活空间中存在与不同智能体视角对应的可解释子空间
- **负面应用与控制**：通过注入恶意智能体并用负向激活引导（negative steering），可更精准地定位和抑制有害行为

#### 🔬 深入细节
##### 1. 背景与动机

多智能体辩论（Multi-Agent Debate, MAD）是近年来提升 LLM 推理性能的重要技术：让多个 LLM 实例扮演不同角色，通过多轮交互辩论达成更可靠的答案。然而，MAD 的根本缺陷在于其推理成本——每个问题需要生成完整的辩论记录（transcript），包含所有智能体的发言和历史。这导致即使完成辩论后，模型仍需基于长文本进行最终推理，token 消耗巨大。

> 💡 关键洞察：辩论过程的价值在于其**结构化的推理对比和修正模式**，而非显式的多智能体交互本身。如果这种模式可以被模型内化吸收，推理时只需单一模型走过类似推理路径，无需实际生成完整的辩论记录。

![Latent Agents 框架总览](https://ar5iv.labs.arxiv.org/html/2604.24881/assets/x1.png)
*图1：IMAD (Internalized Multi-Agent Debate) 流水线概览。① 收集辩论数据集 → ② 两阶段训练（SFT + RL）→ ③ 内化后的单模型推理*

##### 2. 方法核心：两阶段训练流水线

**阶段一：辩论结构学习（Debate Structure Learning, SFT）**

首先在多个推理任务（含 GSM8K、MMLU-Pro 等）上，让三个 LLM 智能体进行多轮辩论，收集完整的辩论记录作为训练数据集。使用这些数据对目标模型进行监督微调（SFT），目标是让模型学会**模仿辩论的格式、推理结构和交互模式**。此时模型输出仍然是完整的辩论记录——包含多智能体对话、声明、反驳等。

**阶段二：强化学习内化（RL Internalization）**

这是整个方法的核心创新点。通过强化学习（DPO 或 GRPO）进一步训练模型，使其在保持推理质量的前提下，**逐步压缩输出长度**，最终直接产出答案或极简的推理链。关键设计包括：

- **动态奖励调度（Dynamic Reward Scheduling）**：
  RL 奖励由两部分组成：
  \[
  R = R_{\text{accuracy}} + \alpha_t \cdot R_{\text{length}}
  \]
  其中 \\(R_{\text{accuracy}}\\) 衡量答案正确性，\\(R_{\text{length}}\\) 鼓励短输出（负相关）。\\(\alpha_t\\) 是随时间变化的动态权重，训练初期设为高值以鼓励缩短，后期逐步降低让模型专注准确率。这种调度类似于退火过程，避免模型陷入"过短但错误"的局部最优。

- **长度裁剪（Length Clipping）**：
  在 RL 训练的 token 采样阶段，对生成序列施加硬性最大长度限制。初始限制较宽松，随后逐步收紧。这为模型提供了一个"自我约束（straitjacket）"，迫使其在有限的 token 预算内完成推理。

> ⚠️ 注意：长度裁剪与奖励调度的结合是关键——仅用奖励信号模型可能通过模糊答案（hallucination）来缩短输出；裁剪则强制模型在有限预算内完成推理，二者互为补充。

**伪代码表示：**
```python
# 第二阶段 RL 内化训练
for epoch in range(total_epochs):
    for batch in debate_data:
        # DPO loss with length penalty
        outputs = model.generate(batch.question, max_new_tokens=max_len)
        
        # 动态长度裁剪
        max_len = max_len_init - (max_len_init - max_len_final) * epoch / total_epochs
        
        # 奖励计算
        acc_reward = compute_accuracy(outputs, batch.answer)
        len_reward = -len(outputs) / max_len  # 标准化长度惩罚
        
        # 动态权重
        alpha = alpha_start * (1 - epoch / total_epochs) ** decay_rate
        total_reward = acc_reward + alpha * len_reward
        
        # DPO 损失
        loss = dpo_loss(model, outputs, total_reward)
        optimizer.step(loss)
```

##### 3. 激活空间与 Agent Subspace

论文进一步通过**激活引导（Activation Steering）** 实验揭示了内化的深层机理：

- 使用多个具有不同推理风格（Chain-of-Thought、Self-Critique、Program-of-Thought）的智能体构建多样辩论数据集，进行 SFT 和 RL 内化
- 从内化模型中提取与特定智能体行为对应的 **steering vector**（激活方向）
- 实验表明：对这些方向进行正向/负向干预，可以稳定地增强/抑制目标智能体的推理风格
- 这些 **agent-specific subspace** 是可解释的、独立的方向，说明内化过程并非简单的模式压缩，而是在激活空间中建立了结构化的表示

![Agent Subspace 分析](https://ar5iv.labs.arxiv.org/html/2604.24881/assets/x11.png)
*图11：不同智能体引导方向对 GSM8K 任务性能的影响。正/负向引导可稳定控制推理风格*

##### 4. 恶意智能体控制实验

作为实用验证，论文设计了如下实验：
1. 在辩论数据集中混入"恶意"智能体（有意给出错误答案、散播有害信息）
2. 通过内化训练将恶意模式嵌入模型
3. 用负向激活引导抵消恶意行为

结果显示：内化模型中的恶意行为比直接在基座模型上进行引导更容易定位和抑制，且对通用性能的损害更小（ROUGE AUC 指标更高）。这一发现为 AI 安全中对齐和控制提供了新视角：**蒸馏后内化的有害模式比原生模型中的更有结构、更易干预**。

##### 5. 实验结果

- **性能保持**：内化后的单模型在 GSM8K、MMLU-Pro 等基准上匹配或超越显式多智能体辩论的准确率
- **效率提升**：推理 token 消耗最多减少 93%
- **鲁棒性**：对 OOD 任务（如摘要生成）保持良好的泛化能力
- **可控性**：激活引导可在小幅性能代价下稳定控制推理风格

#### 🧪 练习题
```yaml
question: "Latent Agents 的 RL 内化阶段中，动态奖励调度 α_t 在训练过程中如何变化？"
options:
  - "始终保持较大学 α 以最大化长度压缩"
  - "训练初期 α 较大鼓励缩短，后期逐渐减小以专注准确率"
  - "训练初期 α 较小以学习准确推理，后期逐渐增大以压缩长度"
  - "α 在训练中随机扰动，每次从均匀分布中采样"
answer: 1
explain: "动态奖励调度采用退火策略，训练初期赋予长度惩罚较高权重以引导压缩，后期逐步降低权重确保准确率不被牺牲。"
```
