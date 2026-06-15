### CAI 2026: Claude's Constitution 2026 Update

```yaml
id: cai_2026
name: CAI 2026
full_name: "Claude宪法2026更新 (Claude's Constitution: 2026 Update)"
year: '2026.01'
org: Anthropic
paper_url: https://www.anthropic.com/news/claudes-constitution
category: alignment
parent: cai
motivation: 推理框架提升自主伦理决策
```

#### 📝 一句话总结

CAI 2026 将 Claude 的 constitution 从“原则列表”升级为面向模型自身的价值、优先级和推理说明文档，用更完整的情境解释来指导合成数据生成、偏好排序和后训练。

#### 🎯 核心要点

- 官方 2026 更新发布在 Anthropic “Claude's new constitution”和完整 constitution 页面
- 从 2023 版 standalone principles 转向解释“为什么这样做”的长文档
- 四级核心优先级：Broadly safe → Broadly ethical → Compliant with Anthropic’s guidelines → Genuinely helpful
- 明确区分 hard constraints 与需要情境判断的价值权衡
- Constitution 作为训练最终权威，用于合成训练数据、价值理解数据、响应示例和偏好排序
- 强调 principal hierarchy：Anthropic、API operator、end user 等不同主体的指令和利益需要加权
- 将透明度纳入方法设计，公开 constitution 以便外界理解 intended behavior 与 observed behavior 的差距

#### 🔬 深入细节

##### 示意图/图源

![Claude 2026 Constitution 官方头图](https://cdn.sanity.io/images/4zrzovbb/website/b296093596b38f0a5fb56b85760baed37ea6798b-2400x1260.png)
*图源：Anthropic “Claude's new constitution” 官方页面。完整 constitution 页面为 `https://www.anthropic.com/constitution`。*

##### 算法/流程伪代码

```python
# Constitutional AI with the 2026 Claude Constitution
def constitutional_training_2026(base_model, constitution, seed_tasks):
    # 1. Parse constitution into priorities and hard constraints
    priorities = [
        "broadly_safe",
        "broadly_ethical",
        "anthropic_guidelines",
        "genuinely_helpful",
    ]
    hard_constraints = extract_hard_constraints(constitution)
    judgment_guidance = extract_reasoning_guidance(constitution)

    # 2. Generate constitution-aware synthetic data
    critique_revision_data = []
    preference_pairs = []
    for task in seed_tasks:
        draft = base_model.generate(task)
        critique = base_model.generate_critique(draft, constitution)
        revised = base_model.revise(draft, critique, constitution)
        critique_revision_data.append((task, draft, critique, revised))

        candidates = sample_responses(base_model, task, n=2)
        ranking = constitutional_judge(
            task, candidates,
            priorities=priorities,
            hard_constraints=hard_constraints,
            guidance=judgment_guidance,
        )
        preference_pairs.append((task, candidates, ranking))

    # 3. Supervised phase: learn critique/revision and constitution-following responses
    sft_model = supervised_finetune(base_model, critique_revision_data)

    # 4. Preference phase: use AI feedback under constitution as labels
    reward_or_preference_model = train_preference_model(preference_pairs)
    aligned_model = preference_optimize(sft_model, reward_or_preference_model)

    # 5. Evaluate gap between intended behavior and actual behavior
    return run_system_card_evals(aligned_model, constitution)
```

##### 方法解读

2026 版 CAI 的关键变化不是新增一个单一损失函数，而是改变“宪法”在训练中的信息形态。2023 版 Claude constitution 更像原则清单，模型在 critique/revision 或 RLAIF 排序时抽取原则来评估回答；2026 版则把价值、背景、优先级、例外、hard constraints 和判断理由写成更完整的说明文档。Anthropic 明确表示，新 constitution 主要写给 Claude，本身是训练工件而不仅是对外政策文本。

该更新给 Claude 设定四个优先级：第一是 broadly safe，即不破坏当前阶段人类监督、纠正和控制 AI 的机制；第二是 broadly ethical，即诚实、良好价值和避免危险/伤害；第三是遵守 Anthropic 的具体 guidelines；第四是 genuinely helpful。优先级不是机械 if-else，而是当价值冲突出现时的总体权重结构。这样的设计意图是让模型在未预见场景中进行价值推理，而不是只匹配固定规则。

训练流程上，constitution 可以进入多类合成数据：帮助模型理解 constitution 的解释数据、constitution 相关对话、符合价值的响应示例、以及多个候选回答的排序标签。这延续了 Constitutional AI 的两阶段思想：先让模型基于原则 critique/revise 自己的输出，再用 AI feedback 对候选响应做偏好比较，训练更安全但仍有帮助性的模型。

2026 版还强调 hard constraints 与 judgment 的分层。某些高风险能力，如对生物武器攻击提供显著 uplift，应当是不可跨越边界；但大量日常任务需要模型权衡 helpfulness、用户自主、真实表达、敏感信息保护和长远福祉。与简单拒答策略相比，这要求模型学习“为什么某些帮助是好的，为什么某些帮助会越界”。

从算法角度看，CAI 2026 的价值在于提高对齐监督的可解释性和可扩展性：人类不必为所有危险或伦理边界手工标注偏好对，而是把可审查的 constitution 交给模型参与数据生成和排序。风险也相应存在：constitution 写得不清、互相冲突或覆盖不足时，模型可能学到错误的泛化。因此官方也强调 constitution 是持续更新的 living document，并通过 system cards 披露模型行为与目标之间的差距。

#### 🧪 练习题

```yaml
question: "Claude 2026 Constitution 相比早期原则列表的核心变化是什么？"
options:
  - "删除所有安全原则，只保留有用性"
  - "从独立原则列表转为解释价值、优先级和理由的训练文档"
  - "只用于产品文案，不参与训练"
  - "把所有场景都改为固定规则匹配"
answer: 1
explain: "2026 更新强调向模型解释为什么要这样判断，并将 constitution 用于合成数据、响应排序和后训练，而不仅是列出可抽取的原则。"
```
