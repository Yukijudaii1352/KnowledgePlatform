### 宪法AI (Constitutional AI)

```yaml
id: constitutional_ai
name: Constitutional AI (CAI)
full_name: 宪法AI：基于AI反馈的无害性训练
year: "2022"
org: Anthropic
paper_url: https://arxiv.org/abs/2212.08073
category: safety
parent: RLHF
motivation: 通过AI自我改进训练无害助手，无需人类标注有害输出，仅用宪法原则监督
```

#### 📝 一句话总结
Constitutional AI (CAI) 提出了使用AI反馈替代人类反馈来训练无害AI的两阶段方法——监督学习(SL)阶段通过自我批判和修正消除有害输出，强化学习(RL)阶段基于AI偏好模型（RLAIF）进一步优化，全程仅需一套宪法原则而不依赖人类对有害行为的标注。

#### 🎯 核心要点
- 两阶段训练流程：监督学习(SL)阶段 + 强化学习(RL)阶段
- SL阶段：初始模型采样→自我批判→根据宪法原则修正回复→微调原始模型
- RL阶段：微调模型采样→AI评估偏好评级→训练偏好模型→用偏好模型作为奖励信号进行RL训练（RLAIF）
- 宪法原则(Constitution)：一小组人类编写的规则/原则，指导批判和AI反馈的全过程
- Chain-of-Thought推理：在批判评估和偏好比较中引入思维链，提升透明度和人类评判表现
- 最终模型RL-CAI在无害性上优于之前仅用人类反馈标签训练的所有模型
- 消除了传统RLHF训练的回避行为(evasive responses)，模型能通过解释反对理由来回应有害请求
- 完全不需要人类对有害输出的标注标签，大幅降低监督成本

#### 🔬 深入细节

##### 核心示意图

![CAI流程图](https://ar5iv.org/html/2212.08073/assets/fig1.png)
*图：Constitutional AI (CAI) 的两阶段流程。上方为监督学习(SL)阶段：从初始模型采样有害prompt的回复→生成批判→根据宪法修订→在修订后的回复上微调。下方为强化学习(RL)阶段：从SL微调模型采样→AI根据宪法比较两条回复→训练偏好模型→用RL训练（RLAIF）。*

##### 算法流程伪代码

```python
# Constitutional AI 训练流程
# 阶段1: 监督学习 (Supervised Learning)
for harmful_prompt in harmful_dataset:
    response = initial_model.generate(harmful_prompt)
    critique = model.critique(harmful_prompt, response, constitution)
    revised_response = model.revise(harmful_prompt, response, critique, constitution)
    # 使用修订后的回复微调初始模型
    finetune(initial_model, harmful_prompt, revised_response)

# 阶段2: 强化学习 (RL from AI Feedback)
for prompt in helpful_prompts + harmful_prompts:
    response_a, response_b = sl_model.generate(prompt, num=2)
    # AI根据宪法评估哪个更好（含思维链推理）
    preference = ai_model.compare(prompt, response_a, response_b, constitution)
    
# 训练偏好模型
preference_model.train(preference_dataset)

# RL训练，用偏好模型作为奖励
for prompt in all_prompts:
    response = rl_policy.generate(prompt)
    reward = preference_model.score(prompt, response)
    rl_policy.optimize(reward)  # PPO with KL penalty
```

##### 方法详解

**动机与背景**：传统的RLHF（Reinforcement Learning from Human Feedback）依赖大量人类标注数据来训练无害AI，但随着AI能力超越人类水平，人类将越来越难以有效监督。同时，现有的RLHF方法存在两个关键问题：(1) 模型学会了回避(evasion)——遇到有害请求时直接拒绝而无法解释原因，导致helpfulness和harmlessness之间存在张力；(2) 需要大量人工标注有害输出，成本高昂且可扩展性差。CAI旨在直接用AI替代人类执行监督，仅通过一套简短的宪法原则来约束整个过程。

**SL阶段核心机制**：第一阶段利用模型自身的批判和修订能力。对于每个有害prompt，初始模型首先生成一个回复，然后根据宪法原则对该回复进行自我批判（如"该回复是否违反了帮助有害行为的禁令？"），最后基于批判结果修订回复（如"我应该解释为什么不能帮助，而非简单拒绝"）。这些修订后的回复构成微调数据集，用于微调初始模型。这一阶段的独特之处在于**完全不需要人类演示数据**，仅靠AI的自我改进即可显著提升无害性。宪法原则包含如"选择最不有害、最有帮助、最诚实的回复"、"避免给出令人反感或有害的内容"等简短指令。

**RL阶段（RLAIF）核心机制**：第二阶段从SL微调模型中采样多条回复，使用AI（同一模型或更强模型）根据宪法原则比较两条回复并选择偏好，构建偏好数据集来训练偏好模型。偏好模型的训练类似于传统RLHF中的奖励模型训练，但偏好标签完全由AI生成而非人类。之后使用PPO算法结合KL惩罚项进行RL训练，偏好模型作为奖励信号。这就是**RL from AI Feedback (RLAIF)**。关键创新在于：AI评估时使用思维链推理（Chain-of-Thought），显式地写出比较理由，这不仅提升了评判准确性，也使得AI决策过程更加透明可审计。

**与传统RLHF的区别**：传统RLHF的奖励模型依赖人类对有害输出的标注，而CAI的偏好模型完全由AI标注；传统方法训练的模型倾向于简单拒绝（"我不能帮助"），CAI训练的模型会解释拒绝理由（"我不能帮助，因为这可能导致X危害"），即非回避式(non-evasive)无害；CAI将监督从人类标注中解耦，实现了监督的可扩展性(Scaling Supervision)。实验表明，RL-CAI在人群工作者评估中优于之前所有仅使用人类反馈标签训练的模型，且有效缓解了helpfulness-harmlessness张力。

> 💡 关键：CAI的核心洞察是"AI可以监督AI"——只要给出一套清晰的宪法原则作为评判标准，AI就能自我批判、自我修正、自我评判，从而替代人类完成大部分监督工作。

> ⚠️ 注意：宪法原则的设计至关重要，它是整个过程的唯一人类输入。如果宪法存在漏洞或偏见，AI的自我改进也会放大这些问题。

#### 🧪 练习题

```yaml
question: "Constitutional AI的RL阶段（RLAIF）与传统RLHF的核心区别是什么？"
options:
  - "RLAIF使用更大的模型进行训练"
  - "RLAIF的偏好标签由AI根据宪法原则生成，而非人类标注"
  - "RLAIF不需要偏好模型，直接优化宪法原则"
  - "RLAIF使用有监督学习替代强化学习"
answer: 1
explain: "RLAIF的核心创新在于偏好模型的训练数据来自AI对回复的比较评判（基于宪法原则），而非传统RLHF中的人类标注偏好。这使得监督过程可扩展且成本更低。"
```