### CAI: 宪法AI (Constitutional AI)
```yaml
id: cai
name: CAI
full_name: 宪法AI (Constitutional AI)
year: "2022"
org: Anthropic
paper_url: https://arxiv.org/abs/2212.08073
category: alignment
parent: rlhf
motivation: 宪法原则自我监督对齐
```

#### 📝 一句话总结
Constitutional AI 提出用一组自然语言原则替代大量有害性人工偏好标签，让模型先自我批判并修订回答，再用 AI 反馈训练偏好模型和 RL 策略。它解决了 RLHF 在 harmlessness 上依赖人工标注、目标不透明、模型容易过度拒答的问题。

#### 🎯 核心要点
- 训练目标由显式 constitution 驱动：少量原则定义助手应如何处理危险、违法、冒犯或不诚实请求。
- 包含两个阶段：监督学习阶段 SL-CAI 和强化学习阶段 RL-CAI。
- SL-CAI 让初始 helpful 模型对有害提示作答，再依据宪法原则自我 critique、revision，并用修订后的回答做 supervised finetuning。
- RL-CAI 用模型自己对成对回答做 harmlessness 比较，形成 AI preference labels，再训练 preference model。
- RL 阶段保留人类 helpfulness 标签，但 harmlessness 标签由 AI feedback 产生，形成 RLAIF。
- 使用多条原则随机采样/集成，使反馈模型不只过拟合单一安全措辞，并提升探索多样性。
- Chain-of-thought 式 critique 和 comparison reasoning 可提升反馈质量，也让训练时的价值判断更可检查。
- 目标不是让模型一味拒答，而是训练出能解释拒绝理由、在无害部分继续帮助用户的 non-evasive assistant。

#### 🔬 深入细节
![Constitutional AI 两阶段训练流程](https://ar5iv.labs.arxiv.org/html/2212.08073/assets/x1.png)
*图：CAI 由上方的监督阶段和下方的 RL 阶段组成；critique、revision 和 AI preference feedback 都由 constitution 中的原则引导。*

CAI 的出发点是扩展监督能力。RLHF 通常需要大量人类偏好比较，尤其在 harmlessness 上，标注者要阅读高风险、有害、违法或冒犯内容，不仅成本高，而且标签集合很难被外部审计。CAI 把人类监督压缩成一组自然语言原则：人类不再逐条判断每个有害样本，而是先写出“模型应该遵循什么原则”，再让模型在训练过程中解释、应用和蒸馏这些原则。

第一阶段是监督式自我修订。论文先用 helpful-only assistant 在 red-team/harmful prompts 上生成初始回答，这些回答往往会顺从危险请求。然后把回答和一条宪法原则交给模型，让它批判原回答有什么问题；接着再要求模型依据批判修订回答。这个 critique → revision 可以重复多轮，每轮随机抽取不同原则。最终用修订后的回答微调原模型，得到 SL-CAI。这个阶段的作用不是最终对齐，而是把模型响应分布拉到更安全、更可训练的区域，降低后续 RL 探索难度。

```python
# CAI 两阶段训练伪代码

# Stage 1: Supervised Constitutional AI
revised_dataset = []
for prompt in harmful_prompts:
    response = helpful_model.generate(prompt)
    for _ in range(num_revision_rounds):
        principle = sample(constitution)
        critique = helpful_model.generate(make_critique_prompt(prompt, response, principle))
        response = helpful_model.generate(make_revision_prompt(prompt, response, critique, principle))
    revised_dataset.append((prompt, response))

sl_cai = supervised_finetune(base_model, revised_dataset)

# Stage 2: RL from AI Feedback
preference_data = []
for prompt in harmful_prompts:
    y_a, y_b = sample_two(sl_cai, prompt)
    principle = sample(constitution)
    p_a = feedback_lm.probability("A", make_comparison_prompt(prompt, y_a, y_b, principle))
    p_b = feedback_lm.probability("B", make_comparison_prompt(prompt, y_a, y_b, principle))
    preference_data.append((prompt, y_a, y_b, normalize(p_a, p_b)))

pm = train_preference_model(preference_data, helpful_human_labels)
rl_cai = ppo_train(sl_cai, reward_model=pm, kl_reference=sl_cai)
```

第二阶段是 RLAIF。它复用 RLHF 的 preference model → RL 管线，但把 harmlessness 的人类比较替换成 AI comparison evaluations。具体做法是：对同一 prompt 从 SL-CAI 采样两个候选回答，把对话、候选 A/B 和一条宪法原则放入 feedback model，让它以多选形式判断哪个回答更符合原则。论文使用选项 A/B 的归一化概率作为软标签，而不是只取硬标签，这样可以保留反馈模型的不确定性。

偏好模型训练可用 Bradley-Terry 形式理解。若 \(r_\phi(x,y)\) 是 preference model 给回答 \(y\) 的奖励分数，则它认为 A 优于 B 的概率为：

$$
P_\phi(y_A \succ y_B\mid x)=\frac{\exp(r_\phi(x,y_A))}{\exp(r_\phi(x,y_A))+\exp(r_\phi(x,y_B))}.
$$

AI feedback model 产生的软目标记为 \(p_{AI}\)，则偏好模型可以最小化交叉熵：

$$
\mathcal{L}_{PM}=-p_{AI}\log P_\phi(y_A\succ y_B\mid x)-(1-p_{AI})\log P_\phi(y_B\succ y_A\mid x).
$$

训练好偏好模型后，RL 阶段与 PPO/RLHF 类似：最大化偏好模型奖励，同时用 KL 惩罚约束新策略不要偏离参考策略太远：

$$
\max_\theta\ \mathbb{E}_{x,y\sim\pi_\theta}\left[r_\phi(x,y)-\beta\,\mathrm{KL}(\pi_\theta(\cdot\mid x)\,\|\,\pi_{ref}(\cdot\mid x))\right].
$$

> 💡 关键：CAI 并不是“没有人类监督”，而是把人类监督从海量样本级标签转移到原则级规范；AI 负责把原则应用到大量具体样本上。

CAI 相比 RLHF 的核心差异在监督接口。RLHF 的价值信息主要隐藏在成千上万条人类比较中，很难读出“模型到底被教了什么”；CAI 的价值信息首先以 constitution 的形式出现，训练者可以直接审查、修改、添加或删除原则。对齐目标因此更透明，也更容易做版本控制。当然，原则如何被模型解释仍可能出错，所以论文强调使用 critique/revision、few-shot comparison 和多原则采样来提升鲁棒性。

另一个重要设计是 non-evasiveness。很多 harmless 模型会把安全性学成“遇到敏感主题就拒绝”，导致 helpfulness 大幅下降。CAI 的修订阶段会鼓励模型说明为什么不能提供有害帮助，同时尽量给出安全替代信息；RL 阶段的偏好比较也可通过原则约束“更少伤害但不无意义拒答”。这让模型在面对危险请求时可以解释边界，而不是简单结束对话。

Chain-of-thought 在 CAI 中扮演训练辅助角色：模型可以先写出 critique 或比较理由，再给出修订/选择。这一方面提升复杂规范判断的准确率，另一方面把部分决策过程显式化，便于研究者观察模型是否真的在应用原则。不过在部署时是否展示这些推理是另一个问题；论文关心的是训练阶段用 reasoning 改善 AI feedback 和 self-revision 的质量。

局限在于，CAI 的质量受 constitution 覆盖度、反馈模型能力和提示格式影响。如果原则之间冲突、反馈模型误解原则，错误偏好仍会被蒸馏进 PM；如果只用 AI 反馈，可能继承模型自身偏见。因此 CAI 更像是 RLHF 的可扩展补充：用原则和 AI feedback 替换最昂贵、最不透明的一部分 harmlessness 标注，而不是彻底消除人类在目标设定与审计中的责任。

#### 🧪 练习题
```yaml
question: "Constitutional AI 中 RL-CAI 与传统 RLHF 在 harmlessness 监督上的主要区别是什么？"
options:
  - "RL-CAI 不训练偏好模型"
  - "RL-CAI 用宪法原则引导的 AI feedback 产生 harmlessness 比较标签，而不是依赖大量人工 harmlessness 标签"
  - "RL-CAI 只做监督微调，不做强化学习"
  - "RL-CAI 删除 KL 约束，让策略自由偏离参考模型"
answer: 1
explain: "CAI 的 RL 阶段复用偏好模型和 RL 管线，但 harmlessness 偏好由反馈模型依据 constitution 自动标注。"
```
