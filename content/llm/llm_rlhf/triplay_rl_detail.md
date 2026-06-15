### 三角色自博弈RL (TriPlay-RL)

```yaml
id: triplay_rl
full_name: 三角色自博弈RL (TriPlay-RL)
year: '2026.01'
paper_url: https://arxiv.org/abs/2601.18292
motivation: 多角色自博弈安全对齐
parent: grpo
category: rl_based
```

#### 📝 一句话总结
TriPlay-RL 把安全对齐拆成 Red 攻击者、Blue 防御者和 Eval 裁判三种角色，在闭环自博弈中同时提升攻击多样性、防御鲁棒性和评估可信度。

#### 🎯 核心要点
- 三角色框架：\(M_{\mathrm{Red}}\) 生成 adversarial prompts，\(M_{\mathrm{Blue}}\) 学习安全响应，\(M_{\mathrm{Eval}}\) 给出细粒度安全评价。
- Red 奖励结合攻击成功、语义相关性和多样性惩罚，避免只生成模板化 jailbreak。
- Blue 奖励来自 Eval 对 unsafe/refusal/helpful guidance 等类别的判断，用 RL 方式强化安全且有用的回答。
- Eval 使用多专家投票构造训练标签，降低单一 reward model 被攻击者利用的风险。
- 闭环训练让攻击者和防御者共同进化，比固定红队数据更能暴露后期策略漏洞。

#### 🔬 深入细节
![TriPlay-RL 三角色框架](https://arxiv.org/html/2601.18292v2/x1.png)
*图：TriPlay-RL 的 Red、Blue、Eval 三个模型在同一训练循环中互相产生数据、奖励和反馈。*

```python
# TriPlay-RL 简化训练循环
for round in range(T):
    attacks = M_Red.generate(seed_prompts, templates, temperature=high)
    blue_outputs = [M_Blue.respond(a) for a in attacks]
    eval_labels = M_Eval.classify(attacks, blue_outputs)

    red_reward = attack_success(eval_labels)
    red_reward += semantic_relevance(attacks, seed_prompts)
    red_reward -= diversity_penalty(attacks)  # self-BLEU / cosine penalty
    update_with_rl(M_Red, attacks, red_reward)

    blue_reward = map_label_to_reward(eval_labels)  # unsafe=-1, reject=0, safe_helpful=1
    update_with_rl(M_Blue, blue_outputs, blue_reward)

    voted_labels = multi_expert_vote(attacks, blue_outputs)
    finetune(M_Eval, attacks, blue_outputs, voted_labels)
```

TriPlay-RL 的动机是传统安全 RLHF 往往把红队数据、奖励模型和防御模型分开训练：攻击数据很快过时，防御模型只学会拒绝已知模式，reward model 也可能被固定攻击模板利用。三角色自博弈把这些模块放进同一个在线系统，使攻击者持续寻找新漏洞，防御者持续补洞，评估器持续校准。

Red 角色的奖励不是单纯攻击成功率。论文把攻击有效性与语义相关奖励相加，再减去多样性惩罚，例如基于 self-BLEU 和 embedding cosine 的 \(P_{\mathrm{div}}\)。这能防止 Red 只复读少量高成功 jailbreak，同时保持攻击仍围绕原始有害意图而不是漂移到无关文本。

Blue 角色面对 Red 生成的 adversarial prompt，需要在拒绝有害请求和提供安全替代帮助之间取得平衡。Eval 的标签被映射成 RL reward：明显 unsafe 得负分，机械拒绝通常不是最高分，安全且有建设性的回答得正分。这一点把安全对齐从“只会拒答”推进到“有边界地帮助”。

Eval 角色是闭环中最容易被 reward hacking 的环节，因此论文用多专家投票数据训练它，并让它处理 prompt-response-label 三元组。相比单一安全分类器，Eval 在训练中不断看到 Red 的新攻击和 Blue 的新防御，能为两侧策略提供更稳定的相对反馈。

> 💡 关键：TriPlay-RL 的“博弈”不是两个模型互怼，而是攻击、响应、评估三条学习曲线共同更新，目标是让安全策略在更强攻击分布下仍然稳定。

#### 🧪 练习题
```yaml
question: "TriPlay-RL 为什么需要单独的 Eval 角色？"
options:
  - "为了把 Red 和 Blue 的输出都翻译成英文"
  - "为了给 Red/Blue 提供细粒度、可更新的安全奖励信号"
  - "为了替代所有人工数据"
  - "为了只优化攻击成功率"
answer: 1
explain: "Eval 是闭环中的裁判，负责把攻击和响应转化为训练奖励，并通过多专家投票降低 reward hacking 风险。"
```
