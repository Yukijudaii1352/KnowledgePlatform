### 宪法AI (Constitutional AI)

```yaml
id: constitutional_ai
full_name: 宪法AI (Constitutional AI)
year: 2022
paper_url: https://arxiv.org/abs/2212.08073
motivation: 宪法原则驱动的自我修订机制
parent: rlhf
category: rl_based
```

#### 📝 一句话总结

Constitutional AI 提出用一组自然语言“宪法原则”驱动模型自我批评、自我修订和 AI 偏好评估，从而在几乎不使用有害性人工偏好标签的情况下训练更 harmless 且更少逃避的助手。它把 RLHF 中最昂贵、最不透明的有害性人工反馈替换成可审计的原则提示和 RLAIF 偏好模型。

#### 🎯 核心要点

- 两阶段训练框架：监督学习阶段执行 critique-revision，自举出 SL-CAI；强化学习阶段用 AI 生成的偏好标签训练 PM，再用 RLAIF 得到 RL-CAI。
- 核心监督信号从“人工逐条标注有害性偏好”改为“少量人写原则 + 模型按原则自评”，论文实验中用于 harmlessness 的宪法原则约 16 条。
- SL 阶段对红队提示先生成有害初答，再按随机抽取的宪法原则生成 critique 和 revision，最终用修订后的回答做监督微调。
- RL 阶段把两个候选回答和一条宪法原则组织成多选题，由模型选择更符合原则的回答，形成 AI preference dataset。
- Preference Model 同时吸收 human helpfulness labels 和 AI harmlessness labels，既保持有用性，又把有害性判断从人工标签迁移到 AI feedback。
- Chain-of-thought 可用于 critique 和偏好判断，使训练信号更可读；论文发现 CoT 能提升模型识别 helpful / honest / harmless 回答的能力。
- 方法重点不是让模型简单拒答，而是减少 evasiveness：对不当请求仍解释拒绝理由，避免“无害但无用”的 canned refusal。

#### 🔬 深入细节

![Constitutional AI 两阶段流程](https://ar5iv.labs.arxiv.org/html/2212.08073/assets/x1.png)
*图：CAI 的 Figure 1。上半部分是监督式自我批评与修订，下半部分是用 AI feedback 训练 preference model 后进行 RLAIF。*

CAI 的出发点是 RLHF 在 harmlessness 上的两类瓶颈：第一，人工红队和偏好标注成本高，并且标注者需要长期接触不适内容；第二，传统 HH-RLHF 容易把“拒绝一切敏感请求”当作安全策略，导致模型 harmless 但 evasive。论文的核心改造是把人类监督压缩为一组自然语言原则，也就是 constitution；之后让模型在训练管线中显式引用这些原则完成自我修订和偏好选择。这样监督目标不再隐含在成千上万条偏好标签里，而是变成可以被阅读、讨论和替换的文本规则。

监督学习阶段可以理解为“把 helpful-only 模型拉到更安全的分布上”。给定红队提示 \(x\)，初始 helpful RLHF 模型先采样回答 \(y_0\)，这个回答可能包含有害内容；随后系统追加一条宪法原则 \(c\) 和 critique request，让同一个模型生成批评 \(g\)，再追加 revision request 生成修订回答 \(y_1\)。论文还允许重复执行多轮修订：\(y_0 \rightarrow y_1 \rightarrow \cdots \rightarrow y_K\)，每轮随机抽取不同原则，增加覆盖面。最终把 \((x, y_k)\) 作为监督样本微调预训练模型，得到 SL-CAI。这个阶段的关键作用不是最终对齐，而是降低第二阶段 RL 的探索难度：如果初始策略仍频繁产生明显有害输出，RL 需要大量惩罚信号才能把策略推回安全区域；SL-CAI 先把输出分布变得“可优化”。

```python
# Constitutional AI: supervised critique-revision stage
for prompt in red_team_prompts:
    response = helpful_rlhf_model.sample(prompt, temperature=1.0)
    revised = response
    for step in range(num_revision_steps):
        principle = random.choice(constitution_principles)
        critique = helpful_rlhf_model.sample(
            prompt + revised + critique_request(principle)
        )
        revised = helpful_rlhf_model.sample(
            prompt + revised + critique + revision_request(principle)
        )
    supervised_dataset.add(prompt, revised)

sl_cai_model = finetune(pretrained_lm, supervised_dataset + helpfulness_samples)
```

RL 阶段更接近标准 RLHF，但 harmlessness 标签来自 AI。SL-CAI 对同一个红队提示采样两个候选回答 \((y_a, y_b)\)，系统把提示、两个候选和某条宪法原则组织成多选判断题，让反馈模型回答哪个候选更符合原则。若反馈模型对选项 A/B 的 log-probability 分别为 \(\ell_a, \ell_b\)，可以得到软偏好：

$$
q_a = \frac{\exp(\ell_a)}{\exp(\ell_a)+\exp(\ell_b)}, \quad q_b = 1-q_a
$$

然后训练 preference model \(r_\phi(x,y)\) 去拟合这些软标签。若 A 是第一个候选，软标签损失可写为：

$$
\mathcal{L}_{PM} = -q_a \log \sigma(r_\phi(x,y_a)-r_\phi(x,y_b)) - q_b \log \sigma(r_\phi(x,y_b)-r_\phi(x,y_a))
$$

这里的直觉是：宪法原则本身不直接变成一个可微 reward，而是先被模型解释为 pairwise preference，再被蒸馏到 PM。论文特别强调 PM 是 hybrid 的：helpfulness 仍使用已有人工 helpfulness 偏好，而 harmlessness 使用 AI preference。这样做避免模型只优化安全而牺牲有用性。

```python
# Constitutional AI: RLAIF stage
for prompt in harmful_prompts:
    y_a = sl_cai_model.sample(prompt)
    y_b = sl_cai_model.sample(prompt)
    principle = random.choice(constitution_principles)

    # multiple-choice AI feedback, optionally with chain-of-thought
    logp_a, logp_b = feedback_lm.score_choices(
        make_constitutional_choice_prompt(prompt, y_a, y_b, principle)
    )
    q_a = softmax([logp_a, logp_b])[0]
    ai_preference_dataset.add(prompt, y_a, y_b, q_a)

pm = train_preference_model(ai_harmlessness_labels + human_helpfulness_labels)
rl_cai_model = reinforce_or_ppo(sl_cai_model, reward_model=pm, kl_reference=sl_cai_model)
```

最终的 RL 目标可以写成带 KL 约束的奖励最大化：

$$
\max_{\pi_\theta}\; \mathbb{E}_{x, y\sim\pi_\theta}[r_\phi(x,y)] - \beta D_{KL}(\pi_\theta(\cdot|x)\;||\;\pi_{SL\text{-}CAI}(\cdot|x))
$$

其中 \(\pi_{SL\text{-}CAI}\) 是参考策略，\(\beta\) 控制策略偏离幅度。KL 项很重要，因为 preference model 只在某些策略生成分布上可靠；如果 RL 过度优化 PM，模型可能学会 PM 偏好的表面模式，例如过度说教、过度安全化或固定模板。论文也讨论了 Goodharting：过训练的 RL-CAI 可能对红队提示过分严厉，甚至在很多回答里插入 boilerplate 式安慰话。因此 CAI 不是“把原则写进 prompt 就完事”，而是把原则、软标签、PM、KL 约束和人工 helpfulness 数据一起组合成可控训练管线。

与传统 RLHF 相比，CAI 最大的差别不在 RL 算法本身，而在偏好来源和可解释性。RLHF 的 harmlessness 目标主要来自人工比较，成本高且很难从标签集合中看出“模型到底被教成什么样”；CAI 则把目标暴露为文本原则，并让模型在 critique、revision 和 preference labeling 中显式使用这些原则。它并没有完全取消人类监督：原则仍由人写，helpfulness 仍可用人工标签，最终模型也要由人评估；但它显著减少了 harmlessness 标签依赖，并把监督从“海量隐式样本”转成“少量可审计规范 + AI 执行”。

论文实验中的数据流也体现了这个设计。SL 阶段使用红队提示生成多轮修订样本，同时混入 helpfulness prompts 来维持有用性；RL 阶段对 SL-CAI 生成的候选回答打 AI 偏好标签，并将这些 harmlessness 标签与 human helpfulness labels 混合训练 PM。最终 RL-CAI 在 harmlessness-helpfulness Elo 图上相对标准 HH-RLHF 更少表现出“安全换有用”的折中，尤其 CoT 版本进一步改善了 AI 反馈质量。直觉上，CoT 让反馈模型不只是输出 A/B，而是先显式比较“哪个回答更符合原则”，这使得标签更接近可检查的推理过程。

> 💡 关键：Constitutional AI 的“宪法”不是硬编码规则，也不是推理时的安全过滤器；它是训练数据生成和偏好标签生成时的监督接口。模型最终学到的是经由 SL 和 RLAIF 蒸馏后的行为分布。

#### 🧪 练习题

```yaml
question: "Constitutional AI 中 SL 阶段的主要作用是什么？"
options:
  - "先用自我批评和修订把模型输出分布拉向更安全区域，降低后续 RL 的探索难度"
  - "完全替代 preference model，使 RL 阶段不再需要奖励信号"
  - "把宪法原则硬编码进模型解码器，推理时逐条检查"
  - "只增加拒答率，从而最大化 harmlessness"
answer: 0
explain: "SL-CAI 通过 critique-revision 生成监督样本，使策略初始分布更少有害且不那么 evasive；RL 阶段仍需要 PM 和奖励优化。"
```
