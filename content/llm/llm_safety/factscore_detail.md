### FActScore：细粒度原子事实评估 (Fine-grained Atomic Evaluation of Factual Precision)
```yaml
id: factscore
name: FActScore
full_name: 细粒度原子事实评估 (Fine-grained Atomic Evaluation of Factual Precision)
year: '2023'
org: UW+Meta
paper_url: https://arxiv.org/abs/2305.14251
category: hallucination
parent: —
motivation: 原子事实精度评估
```

#### 📝 一句话总结
FActScore 将长文本回答拆成可独立验证的原子事实，并计算其中被可信知识源支持的比例，用细粒度 precision 衡量事实幻觉。

#### 🎯 核心要点
- 面向长篇生成，尤其是人物传记类回答，解决整体打分难以定位具体幻觉的问题。
- 将一个回答分解为 atomic facts，每个原子事实只表达一个可验证断言。
- 使用检索到的可信知识源，论文主要以 Wikipedia 为背景知识，逐条判断事实是否 supported。
- 指标定义为 supported atomic facts 占全部 atomic facts 的比例，强调 factual precision 而非 recall。
- 论文还研究了自动估计器，包括 LLM 分解、检索增强判断和非参数模型组合。

#### 🔬 深入细节
![FActScore 模型比较图](https://arxiv.org/html/2305.14251/x4.png)
*图：FActScore 论文中的模型事实性比较结果，展示不同 LM 在原子事实精度上的差异。*

```python
# FActScore 简化伪代码
def factscore(question, generated_answer):
    atomic_facts = decompose_into_atomic_facts(generated_answer)
    supported = 0

    for fact in atomic_facts:
        evidence_docs = retrieve_from_wikipedia(question, fact)
        label = fact_verifier(fact, evidence_docs)  # supported / unsupported
        if label == "supported":
            supported += 1

    if not atomic_facts:
        return 0.0
    return supported / len(atomic_facts)
```

FActScore 的出发点是：长文本回答不能只问“整体是否正确”。一个模型生成的人物传记可能有 20 个事实，其中 17 个正确、3 个编造；整体二分类会丢失细节，也不利于比较模型。原子事实分解把回答拆成最小可验证断言，使幻觉定位和统计都更精确。

指标形式很直接：
$$
\mathrm{FActScore}(y)=\frac{1}{|A(y)|}\sum_{a\in A(y)}\mathbb{1}[\mathrm{Supported}(a, K)]
$$
其中 \(A(y)\) 是回答 \(y\) 的原子事实集合，\(K\) 是可信知识库。这个定义强调 precision：模型说出的事实有多少被支持。它不惩罚模型漏说某些事实，因此更适合作为“不要编造”的评估，而不是完整性评估。

流程上有两个难点：事实拆分和证据判断。拆分需要把复杂句子变成单一断言，例如把“某人出生于某地并获得某奖”拆成两个事实。证据判断则需要检索相关页面，并区分支持、矛盾和证据不足。论文中的自动版本通常结合 LLM 和检索，以降低人工标注成本。

FActScore 与 TruthfulQA 的区别在评估粒度。TruthfulQA 是问答基准，问题预先设计，用来测试模型是否会复述常见误解；FActScore 是后处理指标，可以应用到任意长回答。前者测“面对陷阱问题是否真实”，后者测“生成内容里的每个事实是否有证据”。

#### 🧪 练习题
```yaml
question: "FActScore 主要衡量什么？"
options:
  - "回答是否覆盖所有相关知识"
  - "回答中原子事实被可信证据支持的比例"
  - "回答是否更长"
  - "模型推理速度"
answer: 1
explain: "FActScore 是 factual precision 指标，分母是生成回答中的原子事实数量，分子是被证据支持的数量。"
```
