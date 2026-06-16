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

ActivePrune 提出一种可插拔的主动学习数据剪枝框架，用 KenLM 5-gram 困惑度快速扫描全量未标注池，再用 Gemma-2B 等量化 LLM 对小候选集打质量分，解决大规模主动学习中 acquisition function 逐样本评估过慢的问题。

#### 🎯 核心要点

- 定位不是新的 acquisition function，而是放在 acquisition function 之前的 unlabeled pool pruning 模块
- 第一阶段使用 KenLM 5-gram 与 SentencePiece 对全量未标注池计算困惑度，保留低困惑度样本进入过滤池
- 第二阶段从剩余高困惑度区域抽取候选，用量化 Gemma-2B 计算 LLM 数据质量分，保留高质量样本
- LLM 质量分由任务提示生成 yes/no 判断，并取 yes token 的 softmax 概率作为 \(q(x_i)\)
- Perplexity reweighting 在每轮标注后降低远离已选样本的候选困惑度，使未覆盖区域更容易进入下一轮过滤池
- 可与 Least Confidence、Coreset、IDDS、NSP 等不同主动学习策略组合，实验覆盖翻译、情感分类、主题分类和摘要
- 在 IT domain 数据集上，剪枝时间相对 Perplexity/ASK-LLM 这类全量 LLM 方法下降约 97%，端到端主动学习时间最高减少约 74.5%

#### 🔬 深入细节

![ActivePrune 框架图](https://arxiv.org/html/2410.04275v1/x1.png)
*图：来自论文 Figure 1 的 ActivePrune 流程。未标注池先经 KenLM 5-gram 计算困惑度，再对候选子集运行量化 LLM 质量评分，合并后的过滤池交给主动学习 acquisition function。*

```python
# ActivePrune 的核心流程，整理自论文 Algorithm 1
def active_prune(unlabeled_pool, total_budget, query_budget, prune_size, beta):
    labeled_set = []
    ppl = compute_kenlm_perplexity(unlabeled_pool)

    while len(labeled_set) < total_budget:
        filtered_pool = set()

        low_ppl = select_bottom_k(unlabeled_pool, score=ppl, k=prune_size)
        filtered_pool.update(low_ppl)

        llm_candidates = unlabeled_pool - low_ppl
        quality = compute_llm_quality_scores(llm_candidates)
        high_quality = select_top_k(llm_candidates, score=quality, k=prune_size)
        filtered_pool.update(high_quality)

        selected = acquisition_function(filtered_pool, budget=query_budget)
        labels = human_oracle(selected)
        labeled_set.extend(labels)
        unlabeled_pool -= selected

        ppl = reweight_perplexity(ppl, unlabeled_pool, selected, beta)

    return labeled_set
```

主动学习的标准循环可以写成：给定未标注池 \(\mathcal{U}=\{x_i\}_{i=1}^{N}\)、已标注集 \(\mathcal{L}\) 和 acquisition function \(\mathcal{Q}\)，每轮从 \(\mathcal{U}\) 中挑选最值得标注的样本，再用新标签训练 acquisition model \(\mathcal{M}\)。问题在于，当 \(\mathcal{U}\) 很大时，\(\mathcal{Q}\) 需要对海量样本做模型推理、不确定性估计或多样性计算，交互式标注流程会被长时间等待打断。ActivePrune 的设计点是只构造一个较小但高质量的过滤池 \(\mathcal{F}\)，让 \(\mathcal{Q}\) 面对 \(\mathcal{F}\) 而不是全量 \(\mathcal{U}\)。

第一阶段使用 n-gram LM 的困惑度做便宜的全局扫描。对样本 \(x=(w_1,\ldots,w_N)\)，困惑度可理解为语言模型对该序列的平均惊讶程度：

$$
\mathrm{PPL}(x)=\exp\left(-\frac{1}{N}\sum_{i=1}^{N}\log p(w_i\mid w_{<i})\right)
$$

论文选择 KenLM 5-gram 是工程上很关键的取舍：它不是最强的语义模型，但查询快、内存友好，适合每轮覆盖全量未标注池。ActivePrune 将困惑度升序排序，选取最低困惑度的 bottom-\(k\) 样本加入 \(\mathcal{F}\)。直觉是，极高困惑度样本往往包含噪声、格式异常或分布外文本；先保留流畅、可学习的样本，可以避免 acquisition function 被大量低质量输入拖慢。

第二阶段专门处理第一阶段没有直接保留的高困惑度区域。论文对 \(x\in\mathcal{U}\setminus\mathcal{P}_s\) 构造任务相关提示 \(P(x_i,\tau)\)，询问该样本是否适合用于任务 \(\tau\) 的训练，并要求 LLM 只回答 yes/no。若 LLM 输出 logits 为 \(L\)，质量分定义为 yes token 的 softmax 概率：

$$
q(x_i)=\mathrm{softmax}(L)_{\text{yes}}=
\frac{\exp(L_{\text{yes}})}{\sum_j \exp(L_j)}
$$

这样做的细节价值在于，它没有把高困惑度样本全部丢弃。某些样本困惑度高是因为领域术语、长句或信息密度大，但这类样本对主动学习可能很有价值。量化 LLM 只在较小候选集上运行，承担更昂贵的语义质量判断；最终过滤池 \(\mathcal{F}=\mathcal{P}_s\cup\mathcal{Q}_s\) 同时包含语言上稳定的低困惑度样本和 LLM 认为值得学习的高质量样本。

Perplexity reweighting 解决的是跨轮多样性。若每轮都按原始困惑度取 bottom-\(k\)，采样会反复落在相似困惑度区间。ActivePrune 在第 \(t\) 轮结束后，对未标注样本 \(x_i\) 计算它与最新标注样本集合 \(\mathcal{S}\) 在困惑度空间中的平均距离：

$$
A(x_i,\mathcal{S})=\frac{1}{|\mathcal{S}|}\sum_{l\in\mathcal{S}}|P(x_i)-P(l)|
$$

随后更新困惑度：

$$
P_{\mathrm{new}}(x_i)=P_{\mathrm{old}}(x_i)-\beta\cdot A(x_i,\mathcal{S})
$$

由于 ActivePrune 下一轮仍会优先取低困惑度样本，距离最近标注样本较远的候选会被降低困惑度，从而更容易被选入过滤池。这个机制不是给 acquisition function 本身加 diversity loss，而是在剪枝层面改变候选池分布，因此可以和不同主动学习策略组合。论文给出的命题说明，若某个子集在困惑度上持续不同于已选样本，重加权会逐步提高它被选中的概率。

> 💡 关键：ActivePrune 的效率来自“便宜的全量困惑度扫描 + 昂贵的局部 LLM 评分”，质量来自“低困惑度稳定样本 + 高 LLM 质量样本 + 跨轮重加权”的组合。

从模型压缩视角看，ActivePrune 压缩的不是模型参数，而是主动学习每轮交给 acquisition function 的候选空间。它和蒸馏/压缩链条的关系在于：使用量化 LLM 作为低成本数据质量评估器，把全量大模型评分替换成两阶段近似流程。相比 Random 或 UPS，它更有语义质量意识；相比 Perplexity/ASK-LLM 全量 LLM 打分，它显著减少推理成本，同时保持主动学习选择质量。

#### 🧪 练习题

```yaml
question: "ActivePrune 中 perplexity reweighting 的主要作用是什么？"
options:
  - "让与近期已选样本困惑度差异较大的未标注样本在后续轮次更容易进入过滤池"
  - "把 KenLM 替换成 full attention Transformer"
  - "直接训练最终下游模型的分类头"
  - "删除主动学习中的人工标注步骤"
answer: 0
explain: "重加权会降低远离近期已选样本的候选困惑度，而下一轮会优先选择低困惑度样本，因此 underrepresented 区域会被逐步带入候选池。"
```
