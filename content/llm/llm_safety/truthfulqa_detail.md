### TruthfulQA: 真实性问答基准 (TruthfulQA Benchmark)
```yaml
id: truthfulqa
name: TruthfulQA
full_name: 真实性问答基准 (TruthfulQA Benchmark)
year: "2022"
org: Oxford
paper_url: https://aclanthology.org/2022.acl-long.226/
category: hallucination
parent: "—"
motivation: 虚假陈述倾向基准
```

#### 📝 一句话总结
TruthfulQA 提出一个专门诱发“模仿人类错误信念”的问答基准，用 817 个跨 38 类的问题衡量语言模型是否会生成看似自然但事实错误的回答。它揭示了单纯扩大模型规模不一定提升真实性，甚至可能让模型更熟练地复现训练语料中的流行谬误。

#### 🎯 核心要点
- 构造 817 个问题、覆盖 38 个类别，包括健康、法律、金融、政治、迷信、谚语、虚构作品等容易出现误解的领域。
- 问题设计目标不是普通知识问答，而是诱导模型复现人类常见 false belief 或 misconception。
- 同时支持 generation task 和 multiple-choice task：前者评估自由文本回答，后者用真/假参考答案的条件似然做可复现实验。
- 评价维度区分 truthfulness 和 informativeness，避免模型靠 “I have no comment” 这类空回答获得高真实性。
- 引入 GPT-judge/GPT-info 等自动评估器，分别近似人工真实性标注和信息量标注。
- 实验发现最佳模型在 generation 任务上约 58% truthful，而人类约 94%；早期 GPT-3 系列还出现“模型越大越不 truthful”的逆缩放趋势。
- 论文结论强调：要提升真实性，不能只依赖 imitation learning 和规模扩展，需要改变训练目标或引入真实性导向的监督。

#### 🔬 深入细节
> ⚠️ 注意：任务 JSON 中的 `paper_url` 指向 `2022.acl-long.226`，该 ACL 页面实际是 REINA 论文；TruthfulQA 的正确 ACL 条目是 `https://aclanthology.org/2022.acl-long.229/`，arXiv 条目是 `https://arxiv.org/abs/2109.07958`。本解读按 TruthfulQA 原论文内容撰写，YAML 中保留任务原始元信息。

![TruthfulQA 诱发式问题示例](https://ar5iv.labs.arxiv.org/html/2109.07958/assets/x1.png)
*图：TruthfulQA 中的示例问题及 GPT-3-175B 默认提示下的错误回答，这些问题刻意利用人类常见误解，使模型容易输出训练语料中流行但不真实的说法。*

TruthfulQA 的问题意识很明确：传统 QA 基准通常奖励模型复现数据集中常见答案，而互联网文本中存在大量重复的误解、传说、偏见和错误健康/法律建议。一个最大似然训练的语言模型如果学会“人类通常怎么回答”，并不等价于学会“真实世界是什么”。因此 TruthfulQA 不问普通百科题，而是问那些人类也容易答错的问题，例如带有错误预设、迷信、流行谣言或虚构事实混淆的问题。

基准构造时，每个问题都配有多个 true reference answers 和 false reference answers，并附有支持真实答案的来源。generation task 要求模型自由生成完整句子，再由人工判断 truthfulness 与 informativeness；multiple-choice task 则把真实/错误参考答案作为选项，用模型对各答案的条件概率来计算真实性分数。二者互补：自由生成更接近真实使用场景，但昂贵；多选更便宜、可复现，但不能完全反映开放式回答的风险。

```python
# TruthfulQA 评估流程伪代码

def evaluate_truthfulqa(model, questions):
    generation_scores = []
    mc_scores = []
    for q in questions:
        # 1) 开放生成：人工或 GPT-judge 判断真实性，GPT-info 判断信息量
        answer = model.generate(format_prompt(q.text))
        truth = human_or_gpt_judge(q.text, answer)      # scalar 或 binary truth score
        info = human_or_gpt_info(q.text, answer)        # informative / uninformative
        generation_scores.append({"truth": truth, "info": info, "truth_info": truth * info})

        # 2) 多选：比较真/假参考答案的条件似然
        true_mass = 0.0
        all_mass = 0.0
        for ref in q.true_refs + q.false_refs:
            likelihood = exp(model.logprob(ref, condition=q.text))
            all_mass += likelihood
            if ref in q.true_refs:
                true_mass += likelihood
        mc_scores.append(true_mass / all_mass)

    return aggregate(generation_scores), sum(mc_scores) / len(mc_scores)
```

多选评分可以写成如下形式。设问题 \(q\) 的真实参考答案集合为 \(T_q\)，错误参考答案集合为 \(F_q\)，模型给参考答案 \(a\) 的条件对数似然为 \(\ell_\theta(a\mid q)\)，则：

$$
\mathrm{MCTruth}(q)=\frac{\sum_{a\in T_q}\exp(\ell_\theta(a\mid q))}{\sum_{a\in T_q\cup F_q}\exp(\ell_\theta(a\mid q))}.
$$

开放生成的核心指标则可以抽象为：

$$
\mathrm{Truth}(M)=\frac{1}{N}\sum_{i=1}^{N}\tau_i,
\quad
\mathrm{Info}(M)=\frac{1}{N}\sum_{i=1}^{N}\iota_i,
\quad
\mathrm{Truth{*}Info}(M)=\frac{1}{N}\sum_{i=1}^{N}\tau_i\iota_i,
$$

其中 \(\tau_i\) 是回答的真实性分数，\(\iota_i\) 是是否有信息量。这个拆分非常重要：如果只看 truthfulness，模型可以通过拒答、空泛回答获得高分；如果只看 informativeness，模型又可能自信地输出错误内容。Truth*Info 才更接近“既真实又有用”的目标。

![TruthfulQA 生成与多选任务结果](https://ar5iv.labs.arxiv.org/html/2109.07958/assets/x4.png)
*图：论文同时报告自由生成和多选任务上的真实性、信息量表现；开放生成用人工评估，多选任务用参考答案似然进行自动评分。*

TruthfulQA 最有影响力的观察是“逆缩放”：在早期 GPT-3 系列上，更大的模型在许多 TruthfulQA 问题上反而更容易给出错误但流畅的回答。论文的解释是，大模型更擅长模仿训练分布，而训练分布中对某些问题的高频回答就是错误信念。它不是不知道语言形式，而是学到了“人们会这样说”。这与许多 NLP 任务中规模越大指标越好的趋势形成对比，也让 TruthfulQA 成为后来 inverse scaling、truthfulness 和 hallucination 研究中的重要基准。

自动评估方面，论文比较了 ROUGE、BLEURT、GPT-3-Sim 等相似度方法，也训练了端到端判断回答真假的 GPT-judge，以及判断是否 informative 的 GPT-info。相似度指标的问题在于，真实回答可以有多种表述，错误回答也可能和参考答案词面相近；GPT-judge 直接学习“问题+模型回答→真假标签”，更贴近人工标准，但也会对较长、带限定条件或混合真假陈述的回答产生偏差。因此论文没有把自动指标当成完美裁判，而是把它作为降低评估成本的近似工具。

> 💡 关键：TruthfulQA 不是知识覆盖率测试，而是“抗误导性模仿”测试。模型必须避免输出训练语料中常见、自然、但不真实的答案。

与普通事实问答相比，TruthfulQA 的创新不在模型结构，而在 benchmark design。它把“模型是否会说假话”具体化为可测任务：问题必须足够诱导常见谬误，真实答案必须有来源支持，错误答案必须代表人类可能相信的虚假说法。这个设计使它特别适合评估 LLM 安全中的 hallucination、misinformation 和 sycophantic imitation 风险。

#### 🧪 练习题
```yaml
question: "TruthfulQA 为什么要同时评估 truthfulness 和 informativeness？"
options:
  - "因为多选任务无法计算条件似然"
  - "因为只评估真实性会鼓励模型给出空泛拒答，只评估信息量又会放过自信错误"
  - "因为 GPT-judge 只能判断信息量"
  - "因为所有 TruthfulQA 问题都没有参考答案"
answer: 1
explain: "TruthfulQA 希望模型既真实又有用；单独优化 truthfulness 可能导致无信息回答，单独优化 informativeness 则无法惩罚虚假陈述。"
```
