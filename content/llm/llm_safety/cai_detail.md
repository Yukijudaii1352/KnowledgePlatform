### CAI：宪法AI (Constitutional AI)
```yaml
id: cai
name: CAI
full_name: 宪法AI (Constitutional AI)
year: '2022'
org: Anthropic
paper_url: https://arxiv.org/abs/2212.08073
category: alignment
parent: rlhf
motivation: 宪法原则自我监督对齐
```

#### 📝 一句话总结
Constitutional AI 用一组自然语言原则替代大量人工有害性偏好标注，让模型通过自我批评、自我修订和 AI 反馈学习更有帮助且更无害的行为。

#### 🎯 核心要点
- 核心输入是一组 constitution，即安全、伦理、隐私、非歧视等自然语言原则。
- 监督阶段让模型先生成回答，再依据宪法原则自我批评并修订，用修订答案做 SFT。
- 强化学习阶段让模型比较候选回答，依据宪法原则生成 AI preference，再训练偏好模型并做 RLAIF。
- 目标是减少有害输出，同时避免模型过度回避，使其在拒答时仍尽量有帮助。
- 相比传统 RLHF，CAI 显著减少了人类对有害内容逐条标注的需求。

#### 🔬 深入细节
![Constitutional AI 流程图源入口](https://arxiv.org/pdf/2212.08073)
*图源入口：CAI 原论文 PDF 的 Figure 1，两阶段流程先自我修订监督微调，再用 AI 反馈做偏好优化。*

```python
# CAI 简化伪代码
constitution = load_principles()

# Stage 1: supervised self-revision
sft_data = []
for prompt in harmful_or_edge_case_prompts:
    draft = model.generate(prompt)
    critique = model.generate(ask_critique(prompt, draft, constitution))
    revision = model.generate(ask_revision(prompt, draft, critique, constitution))
    sft_data.append((prompt, revision))

model_sft = supervised_finetune(model, sft_data)

# Stage 2: RLAIF preference learning
pref_data = []
for prompt in prompts:
    y1, y2 = sample_two_answers(model_sft, prompt)
    preference = ai_judge(prompt, y1, y2, constitution)
    pref_data.append((prompt, y1, y2, preference))

preference_model = train_preference_model(pref_data)
aligned_model = rl_optimize(model_sft, preference_model)
```

CAI 的动机是降低 RLHF 对人类有害内容标注的依赖。传统 RLHF 需要标注者比较大量潜在有害回答，成本高且有心理负担。CAI 把“什么是更好的回答”显式写成一组原则，再让模型根据原则产生批评、修订和偏好判断。

第一阶段是 supervised learning。模型先对有风险提示生成初稿，再被要求根据某条或多条原则指出问题，最后生成更安全的修订版。训练数据不是人类直接写出的理想答案，而是模型在宪法约束下自我修订得到的答案。这个阶段让模型学会在局部回答层面修正危险表达。

第二阶段是 RLAIF，即 Reinforcement Learning from AI Feedback。模型对同一提示采样两个回答，再由 AI judge 根据宪法原则选择更合适的一个。偏好模型学习这些 AI preference，最后用 RL 方式优化助手模型。与 RLHF 相比，人类主要设计原则和检查流程，而不是逐条偏好标注。

CAI 的关键不是“没有人类价值”，而是把人类价值前置到 constitution 中。原则写得越清楚，AI 反馈越可解释；原则冲突或覆盖不足时，模型也会继承这些问题。因此 CAI 的工程重点包括原则设计、冲突处理、反馈质量审计和拒答有用性平衡。

#### 🧪 练习题
```yaml
question: "CAI 中 constitution 的作用是什么？"
options:
  - "作为自然语言原则，指导自我批评、修订和 AI 偏好判断"
  - "替代语言模型的 tokenizer"
  - "只用于加速推理"
  - "保存训练日志"
answer: 0
explain: "CAI 把安全和伦理要求写成原则，让模型在监督修订和 RLAIF 阶段都围绕这些原则优化。"
```
