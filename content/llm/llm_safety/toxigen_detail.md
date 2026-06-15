### ToxiGen：ToxiGen数据集 (ToxiGen Dataset)
```yaml
id: toxigen
name: ToxiGen
full_name: ToxiGen数据集 (ToxiGen Dataset)
year: '2022'
org: Microsoft
paper_url: https://aclanthology.org/2022.acl-long.234/
category: content_safety
parent: —
motivation: 隐性毒性检测数据集
```

#### 📝 一句话总结
ToxiGen 构造了大规模、以隐性仇恨和目标群体攻击为重点的毒性数据集，用对抗式生成提高内容安全分类器对微妙毒性的识别能力。

#### 🎯 核心要点
- 数据集包含约 27 万条针对 13 个少数群体的 toxic 与 benign 陈述。
- 强调 implicit toxicity，即没有明显脏话或 slur 但仍表达贬损、排斥或刻板印象的文本。
- 使用 demonstration prompting 生成候选文本，并通过 ALICE 对抗式解码让样本更能挑战现有分类器。
- 人类评估显示生成文本具有较强自然性，后续微调能提升分类器在隐性毒性检测上的表现。
- ToxiGen 将内容安全从显性辱骂检测推进到更难的细粒度群体伤害识别。

#### 🔬 深入细节
![ToxiGen 数据集图源](https://www.microsoft.com/en-us/research/wp-content/uploads/2022/05/1400x788_Detoxigen_hero_image-1024x577.jpg)
*图：Microsoft Research 博客 Figure 1 图源，展示 ToxiGen 通过常规与对抗式解码扩展隐性仇恨检测数据。*

```python
# ToxiGen 数据构造简化伪代码
groups = load_target_groups()
toxicity_modes = ["toxic", "benign"]
dataset = []

for group in groups:
    for mode in toxicity_modes:
        demos = sample_demonstrations(group, mode)
        for _ in range(num_samples_per_group):
            candidate = lm_generate_with_demos(demos, group, mode)
            candidate = alice_adversarial_decode(
                model=generator,
                classifier=toxicity_classifier,
                prompt_context=demos,
                target_mode=mode,
            )
            label = validate_or_filter(candidate, group, mode)
            dataset.append((candidate, group, label))
```

ToxiGen 的核心问题是，很多毒性检测器擅长识别显性辱骂，却漏掉更隐蔽的群体伤害。隐性毒性可能通过刻板印象、伪装成事实陈述、排斥性概括或委婉表达出现，不一定包含明显敏感词。关键词过滤和普通 toxic 数据集难以覆盖这类样本。

数据生成采用 demonstration-based prompting：给语言模型展示某个群体、某种标签下的示例，让模型生成风格相似的新句子。为了让样本更有挑战性，论文引入 ALICE，即 classifier-in-loop 的对抗式解码。生成过程会考虑现有分类器的判断，使新样本更容易暴露分类器盲点。

ToxiGen 同时生成 toxic 和 benign 文本，这一点很重要。只收集有害样本会让分类器把群体词本身误判为 toxic，造成对少数群体相关讨论的过度封禁。benign 样本帮助模型学习区分“提到某群体”和“攻击某群体”。

与 TruthfulQA 或 FActScore 不同，ToxiGen 不是事实性评测，而是内容安全数据集。它可用于训练或评估 moderation classifier、LLM safety reward model 和 red-teaming evaluator，尤其适合检查模型是否能识别无显性辱骂的歧视性内容。

#### 🧪 练习题
```yaml
question: "ToxiGen 最强调哪类内容安全难点？"
options:
  - "显性数学错误"
  - "隐性毒性和群体刻板印象"
  - "代码编译失败"
  - "长上下文摘要"
answer: 1
explain: "ToxiGen 的重点是没有明显脏话或 slur 但仍具有群体伤害的隐性 toxic 文本。"
```
