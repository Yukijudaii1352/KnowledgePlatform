### CAI

```yaml
id: constitutional_ai
name: CAI
full_name: 宪法AI (Constitutional AI)
year: "2022.12"
org: Anthropic
paper_url: https://arxiv.org/abs/2212.08073
category: rlhf
parent: instructgpt
motivation: 基于原则的自我批判与修订
```

#### 📝 一句话总结

CAI 把“人类逐条标注什么有害”替换成“一小组自然语言原则”，先让模型按原则自我批判和修订，再用 AI 反馈替代人类 harmlessness 偏好标签做 RL，从而训练出更无害且不回避问题的助手。

#### 🎯 核心要点

- 两阶段训练：SL-CAI 的 critique-revision 监督阶段，加上 RL-CAI/RLAIF 的 AI 反馈强化学习阶段
- 监督信号来自 constitution，而不是逐条 harmlessness 人工标签
- 16 条自然语言原则随机采样，用于驱动批判、修订和偏好判断
- SL 阶段把 helpful RLHF 模型的有害回答改写成无害且更透明的回答
- RL 阶段使用 AI feedback 生成 harmlessness 比较标签，再与人类 helpfulness 标签混合训练 preference model
- 支持 chain-of-thought 形式的 AI 评审，并发现 CoT 下需做概率 clamping 才更稳健
- 核心目标不是单纯“更安全”，而是减少 evasiveness，让模型学会解释为何拒绝有害请求

#### 🔬 深入细节

##### 核心框架图

![CAI 两阶段流程图](https://ar5iv.labs.arxiv.org/html/2212.08073/assets/x1.png)
*图：论文 Figure 1。上半部分是自我批判与修订的监督阶段，下半部分是 AI 反馈驱动的偏好建模与 RL 阶段。*

##### 算法伪代码

```python
# Constitutional AI: SL-CAI -> RL-CAI

# 1. Supervised Constitutional AI
for prompt in red_team_prompts:
    response = helpful_rlhf.sample(prompt)
    for _ in range(num_revisions):
        principle = sample(constitution)
        critique = model.critique(prompt, response, principle)
        response = model.revise(prompt, response, critique, principle)
    save_supervised_pair(prompt, response)

sl_cai = finetune(pretrained_lm, supervised_pairs + helpfulness_pairs)

# 2. RL from AI Feedback
for prompt in prompts:
    y_a, y_b = sample_two_responses(sl_cai, prompt)
    principle = sample(constitution)
    q = feedback_model.preference_prob(prompt, y_a, y_b, principle)
    save_ai_preference(prompt, y_a, y_b, q)

pm = train_preference_model(human_helpfulness_pairs + ai_harmlessness_pairs)
policy = ppo_train(init=sl_cai, reward_model=pm)
```

##### 1. 它到底想修复 RLHF 的什么问题

CAI 的直接出发点不是“让模型更安全”这么泛，而是针对早期 RLHF 的两个具体缺陷。第一，harmlessness 的人工偏好标注太贵，而且很难规模化。第二，传统 HH-RLHF 往往把“无害”学成“回避”，模型遇到敏感问题时会大量输出“我不能回答这个”，看起来安全，但其实既不透明，也不够有帮助。

论文因此提出一个更激进的问题：能不能不用人类逐条告诉模型“哪个回答更无害”，而只给它一小组人类写下的原则，让模型自己按这些原则做批判、修订和评估？如果能做到，就相当于把监督从“海量隐式标签”压缩成“少量显式规则”。

##### 2. SL-CAI：先让模型学会自我批判与修订

第一阶段是监督学习，但不是普通的 instruction tuning。具体做法是：先让 helpful-only 的 RLHF 模型对红队 prompt 生成初始回答，这些回答往往很危险；然后随机抽一条 constitution principle，让模型先批判自己的回答，再根据批判重写出一个更合规的新回答。

论文强调这个过程可以多轮迭代，而且每轮都可以随机切换原则。这样做的好处是，模型学到的不只是“拒绝某个具体 prompt”，而是把“按原则检查并修订回答”的行为模式内化进参数里。文中使用了 16 条原则，并指出它们是以研究为目的手工写出的自然语言规则。

在数据规模上，SL-CAI 使用了 42,496 条人工 red-team prompts，加上 140,335 条模型生成 red-team prompts，总共 182,831 条；每条 red-team prompt 采样 4 个 critique-revision 对。与此同时，还混入 135,296 条 helpfulness prompts，避免模型只学会“安全”而遗忘“帮助用户”。

##### 3. 为什么自我批判比直接改写更重要

论文专门比较了两条路线：一条是先 critique 再 revision，另一条是直接 revision。结果是，小模型上 critique 明显更重要，大模型上差距缩小但仍略有优势。

这背后的直觉很清楚：批判步骤强迫模型先显式说出“哪里错了、为什么违反原则”，等于先把隐含判断展开成自然语言中间变量，再据此改写回答。对能力没那么强的模型，这个中间推理支架尤其重要。后面很多 self-refine、self-critique 类工作，本质上都在重复这个发现。

##### 4. RL-CAI：把 harmlessness 偏好标签从“人类给”改成“AI 给”

第二阶段才是这篇论文真正与 InstructGPT 分叉的地方。它保留了 RLHF 的总体框架，但把 harmlessness 比较标签改成 AI feedback 生成。具体来说，对同一 prompt 采样两条回答 \(y_A\) 和 \(y_B\)，再给反馈模型一条 constitution principle，让它回答“哪条更符合原则”。

偏好模型依旧学习一个标量奖励：

$$
p_\psi(A \succ B \mid x)
=
\sigma\!\left(r_\psi(x,y_A)-r_\psi(x,y_B)\right).
$$

不同之处在于监督目标不一定是硬标签 \(0/1\)，而可以是反馈模型给出的软概率 \(q\)。因此 preference model 的训练更像：

$$
\mathcal{L}_{\mathrm{PM}}(\psi)
=
- q \log p_\psi(A \succ B \mid x)
- (1-q)\log\!\left(1-p_\psi(A \succ B \mid x)\right).
$$

这就是论文里“soft labels 比 hard labels 更好”的核心原因。模型不是只学“谁赢了”，而是连同“不确定程度”一起学进去。

##### 5. CoT、soft labels 和 clamping 为什么关键

论文一个非常有价值的发现是：如果反馈模型不用 CoT，那么 normalized log-probabilities 形成的 soft labels 往往校准得不错；但一旦用了 CoT，模型通常会在推理文本里过早承诺某一选项，导致概率接近 0 或 1，反而不稳定。

因此 CAI 在 CoT 版本里没有直接使用原始 soft labels，而是把概率钳在更窄的区间里。论文报告 20-80 的 clamping 有提升，而 40-60 更稳，最终主结果采用了 40-60。这个结论很重要，因为它说明“更会推理”不自动等于“更适合作为教师信号”，中间还要做校准。

> ⚠️ 注意：CAI 的关键并不是简单把“人类标签”换成“模型标签”，而是要把模型反馈重新设计成一个足够稳定、足够可蒸馏的监督分布，否则 RL 阶段会学到过度极端的偏好。

##### 6. 为什么它比普通 HH-RLHF 更少回避

CAI 的一个核心成果是 non-evasive。传统 HH-RLHF 在很多危险 prompt 上会学到模板化拒绝，因为历史人工标注经常把“最无害”近似成“最不回答”。CAI 则把原则写得更显式，并在评测时要求比较者更偏好“既无害又解释清楚为什么拒绝”的回答。

这样一来，模型学到的不是“避开风险内容即可”，而是“用理由化、透明化的方式处理风险内容”。论文明确写到 RL-CAI 几乎不会像旧 HH-RLHF 那样持续输出 canned refusal，而更常给出有解释的拒绝或重定向回答。这也是它被称为“constitutional”而不是普通 harmlessness tuning 的原因之一。

##### 7. 它和 InstructGPT 的关系

如果说 InstructGPT 定义了“人类偏好 -> 奖励模型 -> PPO”这条主干，那么 CAI 做的就是把其中一大块昂贵的人类监督，替换成“原则 + AI 反馈”。所以它不是脱离 RLHF 的另一条路线，而是 RLHF 的一次监督源重写。

从结构上看，CAI 没有推翻 InstructGPT，反而承认 InstructGPT 框架是对的：仍然需要 SFT、仍然需要 preference model、仍然需要 RL。它改变的是“偏好从哪里来”。这也解释了为什么后续 RLAIF、AI judge、self-rewarding 等工作都能自然接到 CAI 之后。

#### 🧪 练习题

```yaml
question: "CAI 相比标准 RLHF 的最核心变化是什么？"
options:
  - "完全去掉了偏好模型，只保留监督微调"
  - "把 harmlessness 的大量人工偏好标签替换为 constitution 驱动的 AI feedback"
  - "不再使用强化学习，只做对比学习"
  - "用更大的基础模型替换 PPO"
answer: 1
explain: "CAI 仍然保留 preference model 和 RL，但把 harmlessness 监督从大量人工比较标签改成了原则驱动的 AI 反馈。"
```
