### ABSE：自适应贝叶斯语义熵 (Adaptive Bayesian Semantic Entropy)
```yaml
id: abse
name: ABSE
full_name: 自适应贝叶斯语义熵 (Adaptive Bayesian Semantic Entropy)
year: "2026.01"
org: AAAI
paper_url: https://doi.org/10.1609/aaai.v40i44.41074
category: hallucination
parent: rag
motivation: 自适应语义熵平衡精度效率
```

> 论文定位说明：任务元信息中的 `paper_url` DOI 当前解析到另一篇 AAAI 论文；本文按算法名 ABSE 对应的论文 **Efficient Hallucination Detection: Adaptive Bayesian Estimation of Semantic Entropy with Guided Semantic Exploration** 精读，实际可访问版本为 `https://arxiv.org/abs/2603.22812`。

#### 📝 一句话总结
ABSE 提出用层次贝叶斯后验估计语义熵，并用方差阈值自适应决定是否继续采样，解决了固定采样预算在简单问题上浪费、在复杂问题上探索不足的问题。它进一步通过 guided semantic exploration 扰动语义关键 token，以重要性采样发现更多语义簇，在低预算幻觉检测中提升 AUROC 并减少采样次数。

#### 🎯 核心要点
- 将回答空间按语义等价关系聚类，用语义分布的熵作为幻觉不确定性分数
- 用层次贝叶斯建模未知语义类别数 \(K\) 与类别概率 \(\mathbf{p}\)，而不是假设已观察到的类别就是完整语义空间
- 用 Poisson 先验 \(p(K)\) 表示潜在语义类别数，先验参数由语义关键 token 加权困惑度估计
- 用带生成概率下界约束的截断 Dirichlet 后验估计每个语义类别概率，显式利用已采样序列概率
- 用后验语义熵方差 \(\mathrm{Var}[\mathbf{h}|\mathcal{D}]\) 作为自适应停止条件，达到阈值后停止继续调用 LLM
- 用 guided semantic exploration 在高语义重要性位置替换 top-k 备选 token，再用重要性权重校正偏差
- 在 CoQA、TriviaQA、TruthfulQA、SimpleQA 等 QA 数据集上验证，低预算场景约少用一半样本，并在相同采样预算下带来平均 AUROC 提升

#### 🔬 深入细节
![ABSE 自适应采样示意图](https://arxiv.org/html/2603.22812v1/figures/teaser-1.png)
*图：固定采样与 ABSE 自适应贝叶斯采样的对比。简单问题很快收敛，复杂问题继续探索更多语义分支。*

```python
# ABSE: Adaptive Bayesian Semantic Entropy
# 输入: prompt x, LLM P_theta, 方差阈值 gamma, 初始样本数 N0, top-k 扰动候选
samples = sample_llm(P_theta, x, N0)
for r in samples:
    r.meaning = semantic_cluster(r)
    r.prob = sequence_probability(P_theta, r, x)

lambda_hat = mean(weighted_perplexity(r) for r in samples)
prior_K = Poisson(lambda_hat)
posterior = initialize_hierarchical_posterior(samples, prior_K)

while posterior.var_entropy > gamma:
    seed = choose_sample(samples)
    pos = rank_tokens_by_semantic_importance(seed)[0]
    alt = choose_top_k_alternative(P_theta, seed.prefix(pos), k)
    r_new = continue_generation_after_replacement(P_theta, seed, pos, alt)
    w = importance_weight(P_theta, r_new, pos)
    r_new.meaning = semantic_cluster(r_new)
    r_new.prob = sequence_probability(P_theta, r_new, x)
    samples.append(r_new)
    posterior.update_weighted_counts(r_new.meaning, weight=w)
    posterior.update_truncated_dirichlet_constraints(samples)
    posterior.update_posterior_over_K()

H_sem_hat = posterior.expected_entropy
```

ABSE 的出发点是语义熵检测：同一个问题如果稳定生成同一语义答案，说明模型对事实更确定；如果不同采样落入多个互相矛盾的语义簇，幻觉风险更高。论文将响应空间 \(\mathcal{R}_x\) 映射到语义集合 \(\mathcal{M}_x\)，语义类别概率定义为：

$$
p(m|x)=\sum_{r\in\mathcal{R}_x:f_x(r)=m}P_\theta(r|x)
$$

语义熵就是这些语义类别概率的 Shannon 熵：

$$
H_{sem}=-\sum_{m\in\mathcal{M}_x}p(m|x)\log p(m|x)
$$

传统 Semantic Entropy 通常固定采样 \(N\) 次，然后把出现过的语义簇计数归一化。这个估计隐含两个弱假设：一是已经观察到足够多的语义类别，二是所有 prompt 需要相同采样预算。ABSE 反过来把 \(H_{sem}\) 看成随机变量 \(\mathbf{h}\)，并对未知类别数 \(K=|\mathcal{M}_x|\) 做边缘化：

$$
\mathbb{E}[\mathbf{h}|\mathcal{D}]=\sum_{K=1}^{\infty}\mathbb{E}[\mathbf{h}|K,\mathcal{D}]p(K|\mathcal{D})
$$

$$
\mathrm{Var}[\mathbf{h}|\mathcal{D}]=\mathbb{E}_K[\mathrm{Var}[\mathbf{h}|K,\mathcal{D}]]+\mathrm{Var}_K[\mathbb{E}[\mathbf{h}|K,\mathcal{D}]]
$$

这两个式子是“自适应”的核心：如果后验方差已经低于阈值 \(\gamma\)，继续采样的边际收益很小；如果方差仍高，说明语义类别数或类别概率仍不确定，需要继续探索。简单事实问答往往在少量样本后方差快速下降，复杂或歧义问题则会保留高方差，从而获得更多预算。

在固定 \(K\) 时，ABSE 用 Dirichlet 分布建模类别概率 \(\mathbf{p}=(p_1,\ldots,p_K)\)。标准后验是 \(\mathrm{Dir}(\alpha_0+n_1,\ldots,\alpha_0+n_K)\)，但论文进一步加入生成概率约束：若某些已观测序列属于语义类 \(j\)，那么该语义类总概率至少要覆盖这些序列概率之和：

$$
p_j\ge b_j=\sum_{r_i\in\mathcal{D}:f_x(r_i)=j}P_\theta(r_i|x)
$$

于是后验不是普通 Dirichlet，而是限制在 \(\mathcal{C}=\{\mathbf{p}\in\Delta^{K-1}:p_j\ge b_j\}\) 上的截断 Dirichlet。直觉上，这避免后验给已明确观察到的高概率语义类分配过低质量，从而收紧熵估计的不确定性。

ABSE 对 \(K\) 的先验使用 Poisson 分布 \(p(K)=\lambda^Ke^{-\lambda}/K!\)。关键不是固定 \(\lambda\)，而是用 prompt 相关的加权困惑度估计 \(\hat{\lambda}\)。每个 token 的语义重要性由删除该 token 前后的语义相似度变化表示：

$$
w_{i,j}=1-\mathrm{sim}(r_i,r_i\setminus\{t_{i,j}\})
$$

加权困惑度为：

$$
\mathrm{WPL}_i=\exp\left(-\frac{\sum_j w_{i,j}\log P_\theta(t_{i,j}|t_{i,<j},x)}{\sum_j w_{i,j}}\right)
$$

如果关键 token 处的概率分布更不确定，\(\mathrm{WPL}\) 更高，先验就允许更多潜在语义类别。这样做比只看普通 perplexity 更贴近“语义分支”数量，因为停用词或格式 token 的不确定性不会被过度放大。

Guided semantic exploration 解决另一个问题：普通多次采样可能反复生成同义回答，看似样本数增加，实际没有发现新的语义簇。ABSE 先按 \(w_{i,j}\) 排序找语义关键位置，再从该位置的条件分布里取 top-k 替代 token，替换后继续生成。因为这改变了原始采样分布，论文定义 proposal \(q(\mathbf{r}|x)\) 并用重要性权重校正：

$$
w(\mathbf{r})=\frac{P_\theta(\mathbf{r}|x)}{q(\mathbf{r}|x)}=P_\theta(t_j|\mathbf{t}_{<j},x)
$$

加权样本进入贝叶斯更新时，不是简单 \(+1\)，而是更新有效计数：

$$
n_j^{(N)}=n_j^{(N-1)}+w^{(N)},\quad \alpha_j^{(N)}=\alpha_0+n_j^{(N)}
$$

> 💡 关键：ABSE 不是“少采样”的启发式，而是把“是否继续采样”转化为后验方差是否足够小的问题；同时用扰动式探索主动寻找语义分支，再用重要性采样保持估计无偏。

#### 🧪 练习题
```yaml
question: "ABSE 为什么要同时建模语义类别数 K 和类别概率 p？"
options:
  - "因为只估计类别概率会默认已观察到完整语义空间，无法表达未发现语义簇的不确定性"
  - "因为 K 越大，LLM 的参数量越小"
  - "因为 Dirichlet 分布只能处理二分类问题"
  - "因为语义熵必须依赖人工标注的固定类别表"
answer: 0
explain: "ABSE 用 p(K|D) 表达潜在语义类别数的不确定性，再在每个 K 下估计类别概率分布，从而能决定是否需要继续采样。"
```
