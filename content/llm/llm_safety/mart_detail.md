### MART：多轮自动红队 (Multi-round Automatic Red-Teaming)
```yaml
id: mart
name: MART
full_name: 多轮自动红队 (Multi-round Automatic Red-Teaming)
year: '2024'
org: Academic
paper_url: https://aclanthology.org/2024.naacl-long.107/
category: alignment
parent: —
motivation: 自动化多轮红队对抗测试
```

#### 📝 一句话总结
MART 把红队测试做成攻击者模型与目标模型的多轮自博弈循环，用自动发现的失败样本持续训练更强攻击者和更安全目标模型。

#### 🎯 核心要点
- 包含 adversarial LLM、target LLM 和 evaluator，形成“生成攻击、目标响应、自动评估、数据回流”的闭环。
- 多轮训练中，成功攻击样本用于强化红队模型，安全且有用的响应用于改进目标模型。
- 评估器同时关注 safety 和 helpfulness，避免目标模型通过一律拒答降低 violation rate。
- 论文报告经过多轮 MART 后，目标模型安全违规率显著下降，同时保持帮助性。
- MART 从一次性 benchmark 评测扩展为持续对抗训练框架，适合模型发布前的压力测试。

#### 🔬 深入细节
![MART 方法流程图](https://figures.semanticscholar.org/709af143f78bc62413c50ea1a7ee75b0702c4f59/2-Figure1-1.png)
*图：Semantic Scholar 论文 Figure 1，展示 MART 的多轮自动红队流程，攻击者和目标模型在评估反馈下交替改进。*

```python
# MART 简化伪代码
attacker = initialize_red_team_model()
target = initialize_target_model()

for round_id in range(num_rounds):
    attack_data = []
    safe_data = []

    for seed in seed_prompts:
        red_prompt = attacker.generate(seed)
        response = target.generate(red_prompt)
        safety_score = safety_evaluator(red_prompt, response)
        helpful_score = helpfulness_evaluator(red_prompt, response)

        if safety_score < safety_threshold:
            attack_data.append((seed, red_prompt, response))
        if safety_score >= safety_threshold and helpful_score >= helpful_threshold:
            safe_data.append((red_prompt, response))

    attacker = finetune_attacker(attacker, attack_data)
    target = finetune_target(target, safe_data, attack_data)
```

MART 的动机是静态红队数据很快过时。模型经过一次安全训练后，旧攻击样本可能失效，但新的攻击策略会继续出现。MART 通过自动攻击者持续生成新样本，让目标模型面对不断变化的测试分布。

方法上，MART 将红队攻击和蓝队修复放在同一个循环中。攻击者模型学习哪些提示更容易触发违规响应，目标模型则学习如何在这些困难输入下保持安全且有帮助。评估器是闭环的关键，它决定哪些样本算成功攻击，哪些响应可以作为高质量安全数据。

多轮机制让 MART 不同于 PAIR。PAIR 主要在一次攻击过程中迭代优化某个候选提示；MART 关注跨轮训练，把上一轮发现的失败样本纳入下一轮模型更新。它更接近 adversarial training，只是攻击者和目标都是语言模型。

MART 的风险是评估器偏差会被闭环放大。如果 safety evaluator 漏判某类风险，攻击者和目标都可能围绕错误信号优化。因此实际使用 MART 时，需要人工抽检、策略覆盖检查和多评估器交叉验证，确保自动红队不会变成只优化某个判定器。

#### 🧪 练习题
```yaml
question: "MART 中多轮训练的主要目的是什么？"
options:
  - "让攻击者和目标模型在新发现的失败样本上持续改进"
  - "减少模型参数量"
  - "替代所有人工审计"
  - "只提升回答长度"
answer: 0
explain: "MART 把成功攻击和安全响应回流到后续训练轮次，从而形成持续红队闭环。"
```
