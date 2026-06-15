### ActivePrune

```yaml
id: activeprune
name: ActivePrune
full_name: 主动剪枝蒸馏 (ActivePrune)
year: 2026
org: EACL
paper_url: https://aclanthology.org/2026.findings-eacl.229/
category: distillation
parent: minillm
motivation: 结合数据剪枝与蒸馏的主动学习
```

#### 📝 一句话总结

ActivePrune 提出用于主动学习的大规模未标注池数据剪枝策略，先用 n-gram 困惑度快速筛选，再用量化 LLM 质量分数精选样本，并通过困惑度重加权保持多样性，解决了主动学习 acquisition function 在大数据池上计算过慢的问题。

#### 🎯 核心要点

- 是 plug-and-play 的 unlabeled pool pruning 方法，可接入多种主动学习 acquisition function
- 第一阶段使用 KenLM 5-gram 等轻量语言模型计算困惑度，快速缩小候选池
- 第二阶段用量化 LLM 估计数据质量分数，提升筛选质量
- 提出 perplexity reweighting，让历史上未覆盖的样本区域在后续轮次更容易被选中
- 评估覆盖翻译、情感分析、主题分类、摘要等任务
- 相比 LLM score-only 剪枝，在选择质量和端到端主动学习时间之间取得更好折中

#### 🔬 深入细节

![ActivePrune 框架图](https://arxiv.org/html/2410.04275v1/x1.png)
*图：ActivePrune 先用 n-gram 困惑度快速评估全量未标注池，再用量化 LLM 质量分数和重加权策略生成精简候选池。*

```python
# ActivePrune 主动学习数据剪枝伪代码
for al_round in range(num_rounds):
    ppl = kenlm_perplexity(unlabeled_pool)                 # cheap global scan
    candidates = select_by_reweighted_perplexity(ppl, history)
    quality = quantized_llm_quality_score(candidates)      # expensive but smaller set
    pruned_pool = combine_scores(candidates, ppl, quality, budget=M)

    query_batch = acquisition_function(model, pruned_pool, budget=B)
    labels = annotator(query_batch)
    train_set += labels
    unlabeled_pool -= query_batch
    history = update_perplexity_reweighting(history, query_batch)
```

主动学习的瓶颈在于每轮都要从巨大未标注池中找最值得标注的样本。很多 acquisition function 需要模型推理、不确定性计算或多样性检索，直接扫全量池会让专家等待时间和计算成本不可接受。ActivePrune 的目标不是替代 acquisition function，而是在它之前先把池子缩小。

第一阶段使用轻量 n-gram LM 的困惑度：

$$
\mathrm{PPL}(x)=\exp\left(-\frac{1}{N}\sum_{i=1}^N\log p(w_i|w_{<i})\right)
$$

困惑度能快速发现语言上异常或信息密度较高的样本，但单独使用会偏向某些分布区域。第二阶段再用量化 LLM 对小候选集打质量分，避免全量调用大模型。

> 💡 关键：ActivePrune 的效率来自“便宜模型全量扫 + 量化 LLM 小集精选”，质量来自把困惑度、LLM 质量和主动学习 acquisition 组合起来。

Perplexity reweighting 用来处理多样性。若前几轮总是选中相似困惑度区间，后续轮次会提高未覆盖区间的权重，让 underrepresented instances 更早进入候选集。这避免了主动学习只在局部高分区域反复采样。

虽然任务元信息把它放在 distillation 链条下，ActivePrune 本质上更接近数据剪枝与高效主动学习。它与模型压缩的联系在于：用量化 LLM 作为低成本质量评估器，把昂贵的样本选择流程压缩到更小候选池上。

#### 🧪 练习题

```yaml
question: "ActivePrune 的两阶段剪枝为什么比直接用 LLM 给全量样本打分更高效？"
options:
  - "它先用轻量 n-gram 困惑度缩小候选池，再只对小集合运行量化 LLM"
  - "它完全不使用语言模型"
  - "它删除主动学习中的标注步骤"
  - "它只适用于图像分类"
answer: 0
explain: "全量 LLM 评分成本高，ActivePrune 用便宜困惑度做第一轮过滤，把昂贵质量评分限制在较小候选集。"
```
