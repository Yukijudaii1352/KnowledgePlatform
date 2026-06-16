### FActScore: 细粒度原子事实评估 (Fine-grained Atomic Evaluation of Factual Precision)
```yaml
id: factscore
name: FActScore
full_name: 细粒度原子事实评估 (Fine-grained Atomic Evaluation of Factual Precision)
year: "2023"
org: UW+Meta
paper_url: https://arxiv.org/abs/2305.14251
category: hallucination
parent: "—"
motivation: 原子事实精度评估
```

#### 📝 一句话总结
FActScore 提出把长文本回答拆成“原子事实”并逐条验证的事实精度指标，解决了长答案里真假信息混杂时二元评分过粗、人工评估成本过高的问题。它进一步用检索增强的强语言模型自动估计原子事实是否被可信知识源支持，使长文本幻觉评估可以规模化。

#### 🎯 核心要点
- 评价单位从整句/整段改为 atomic fact：每个原子事实只承载一个可验证信息点。
- 评分目标是 factual precision：统计被指定知识源支持的原子事实比例，而不是衡量回答覆盖了多少事实。
- 知识源显式化：论文在人物传记任务中以英文 Wikipedia 作为可信证据源，避免把“事实性”定义成无上下文的全局真理。
- 人工评估流程包含实体采样、模型生成、原子事实拆解、Supported/Not-supported/Irrelevant 标注。
- 自动估计器使用“检索 → LLM 判别”的框架，将相关 Wikipedia 段落与 atomic fact 拼接后判断 True/False。
- 论文比较 No-context LM、Retrieve→LM、Nonparametric Probability、Retrieve→LM+NP 等估计变体，验证检索对事实判定非常关键。
- 实验显示 InstructGPT、ChatGPT、PerplexityAI 的人工 FActScore 分别约为 42.5%、58.3%、71.5%，说明即便有搜索增强，长传记仍会出现大量局部事实错误。

#### 🔬 深入细节
![FActScore 原子事实评估流程](https://ar5iv.labs.arxiv.org/html/2305.14251/assets/x1.png)
*图：FActScore 将一段人物传记拆成多个 atomic facts，并逐条判断是否被知识源支持；同样被传统二元指标判为 0 的回答，在 FActScore 下可以得到不同的细粒度分数。*

FActScore 的核心动机是：长文本生成不是一个“全对/全错”的对象。一个 biography 回答中可能同时包含正确出生地、错误职业、正确作品名和虚构奖项；如果按整句或整段打分，局部错误会被淹没，或者一个句子只要包含一个错误就被整体归零。论文因此把最小评价单元降到 atomic fact，例如“某人出生于 X”“某人获得过 Y 奖”“某人毕业于 Z 大学”，每条只判断 supported 或 not-supported。

形式化地，给定待评估语言模型 \(M\)、提示集合 \(X\)、知识源 \(S\)，模型对提示 \(x\) 生成回答 \(y=M(x)\)，再将回答拆成原子事实集合 \(A(y)\)。若 \(v(a,S)=1\) 表示原子事实 \(a\) 被知识源 \(S\) 支持，则一个常用写法是：

$$
\mathrm{FActScore}(M;X,S)=\frac{1}{|X|}\sum_{x\in X}\mathbf{1}[M\ \text{responds to}\ x]\cdot\frac{1}{|A(M(x))|}\sum_{a\in A(M(x))}\mathbf{1}[v(a,S)=1].
$$

这个公式有两个重要含义：第一，它衡量的是 precision，不奖励模型“少说但全对”之外的 recall，因此不能单独代表回答完整性；第二，它把“是否真实”改写为“是否被用户信任的知识源支持”，所以同一个 atomic fact 在不同知识源下可能有不同判定。论文选择人物传记和 Wikipedia，是因为人物事实通常客观、可验证，且 Wikipedia 覆盖相对充足。

```python
# FActScore 核心流程伪代码

def compute_factscore(model, prompts, knowledge_source):
    scores = []
    for x in prompts:
        y = model.generate(f"Tell me a bio of {x}")
        if abstains_or_empty(y):
            scores.append(0.0)
            continue

        atomic_facts = decompose_into_atomic_facts(y)
        labels = []
        for fact in atomic_facts:
            evidence = retrieve(knowledge_source, query=fact, top_k=K)
            label = judge_supported(fact, evidence)  # Supported / Not-supported / Irrelevant
            if label != "Irrelevant":
                labels.append(1 if label == "Supported" else 0)

        scores.append(sum(labels) / max(len(labels), 1))
    return sum(scores) / len(scores)
```

人工评估管线分三层：先从 Wikidata/Wikipedia 采样人物实体；再让 InstructGPT、ChatGPT、PerplexityAI 等模型回答 “Tell me a bio of <entity>”；最后让标注者拆 atomic facts，并在 Wikipedia 证据下标注 Supported、Not-supported 或 Irrelevant。Irrelevant 不是事实真假标签，而是说明该片段与题目人物无关或依赖前文错误事实，通常会从有效事实集合中剔除。这个设计让评估既能发现“捏造事实”，也能发现“答非所问的复制/检索污染”。

自动估计器是论文面向规模化评估的关键。最朴素的 No-context LM 只把 `<atomic fact> True or False?` 输入评估模型，这容易让模型凭内部记忆猜测。Retrieve→LM 则先从知识源中取相关段落，再把证据、atomic fact 和 True/False 问题一起交给评估 LM；这更接近人工查证流程，也显著降低错误率。Nonparametric Probability 变体用非参数 masked LM 对 atomic fact 的 token 似然做判断，Retrieve→LM+NP 则尝试融合检索判别和非参数证据。论文结果表明，检索增强比单靠 LLM 内部知识可靠得多。

> 💡 关键：FActScore 不是“让另一个大模型给答案打分”，而是先把答案结构化成可验证断言，再把每个断言绑定到显式证据源。这个拆解步骤是它区别于传统 factuality scorer 的主要贡献。

和早期事实一致性指标相比，FActScore 的差异在于评价对象从摘要/QA 的短输出扩展到 100 词以上的长文本，并且不把句子当成不可分割单位。一个句子可能包含 4 个以上事实点，其中部分正确、部分错误；FActScore 可以把它拆开后分别计分。与 SelfCheck 类方法相比，它不只依赖模型自洽性，而是要求外部知识源支持，因此更适合衡量“事实精度”而非“模型是否对自己的生成感到不确定”。

局限也来自同一设计：atomic fact 默认等权，但现实中“出生年份错误”和“获奖年份错误”的影响可能不同；它衡量 precision 而非 recall，模型可以通过少说话提升分数；知识源覆盖不足时，真实但未被记录的事实会被误判。论文因此把人物传记作为主要场景，而不是直接宣称它能无条件覆盖所有开放域生成。

#### 🧪 练习题
```yaml
question: "FActScore 相比整段二元事实性评分的核心优势是什么？"
options:
  - "直接提升被评估模型的事实准确率"
  - "把长回答拆成原子事实，分别验证每个信息点是否被知识源支持"
  - "用模型内部置信度替代外部证据检索"
  - "同时衡量 factual precision 和 factual recall"
answer: 1
explain: "FActScore 的关键是 atomic fact decomposition 和证据支持判定；它主要衡量 precision，不直接衡量 recall。"
```
