### Reactome — 药用反应数据集与 HiTEA 分析框架

```yaml
id: reactome
name: Reactome
full_name: 药用反应数据集与预测模型 (Reactome)
year: '2026.04'
org: 剑桥大学 / Pfizer
paper_url: https://www.earth.com/news/ai-predicts-how-molecules-react-in-the-lab-drug-discovery/
category: reaction
parent: molecular_transformer
motivation: 3.9万药用反应数据集，预测实验室真实反应性
```

#### 📝 一句话总结

Reactome 对应的可追溯论文提出 HiTEA：一个面向高通量实验反应数据的统计机器学习分析框架，用随机森林、Z-score ANOVA-Tukey 和 PCA 从 39,000+ 药物化学 HTE 反应中抽取反应组分、条件与真实实验结果之间的相关性。它更像“实验反应性地图”和可解释分析器，而不是单一端到端产物生成模型。

#### 🎯 核心要点

- 数据来自 Cambridge / Pfizer 公开的 10 年以上历史药物化学 HTE 数据，包含 39,000+ 反应条件、350+ 目标产物、多种反应类别
- HiTEA 的目标是推断 HTE reactome：数据集中隐含的反应变量重要性、最佳/最差试剂类别、数据偏置和未充分探索区域
- 三个正交统计模块：随机森林回答“哪些变量重要”，Z-score ANOVA-Tukey 回答“哪些试剂显著好/坏”，PCA 回答“这些试剂在化学空间中如何分布”
- 支持不完整组合设计，不要求每个底物和每个试剂全因子交叉，适合真实 HTE 数据的稀疏、偏置和类别不均衡特征
- 分析对象包括 Buchwald-Hartwig 偶联、Ullmann 偶联、非均相氢化和均相氢化等药物化学常见反应
- 通过保留 0% 和低产率反应，框架能识别负相关变量和失败条件，这是文献正例数据难以提供的信息
- worker 给出的链接是新闻页；可追溯论文为 Nature Chemistry 2024 的 “Probing the chemical reactome with high-throughput experimentation data”

#### 🔬 深入细节

![Reactome / HiTEA 总览图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41557-023-01393-w/MediaObjects/41557_2023_1393_Fig1_HTML.png)
*图：HiTEA 框架将 HTE 数据与化学文献知识并行分析，比较 HTE reactome 与 literature reactome；右侧展示 39,000+ 反应条件在不同反应类别中的分布。*

##### 算法伪代码

```python
# HiTEA / chemical reactome analysis
def hitea(reaction_table, reagent_descriptors, literature_reactome):
    results = {}
    for reaction_class in split_by_reaction_class(reaction_table):
        subdatasets = make_subreactomes(
            reaction_class,
            min_reactions=80,
            min_reacting_pairs=2,
        )

        for D in subdatasets:
            # 1. Normalize experimental outcome within substrate/target context
            D["z_yield"] = zscore_by_group(
                values=D["yield"],
                group=D["reacting_pair_or_target"],
            )

            # 2. Random forest: variable importance
            X = encode_reactants_reagents_conditions(D)
            y = D["yield_or_z_yield"]
            rf = RandomForestRegressor(oob_score=True).fit(X, y)
            variable_importance = rf.feature_importances_

            # 3. ANOVA + Tukey: statistically best/worst reagents
            significant_variables = anova(D["z_yield"], D["variable"])
            best_worst = {}
            for var in significant_variables:
                pairs = tukey_hsd(D["z_yield"], groups=D[var])
                best_worst[var] = rank_by_mean_zscore(pairs)

            # 4. PCA: locate best/worst reagents in descriptor space
            Z = reagent_descriptors.loc[unique_reagents(D)]
            pc_scores = PCA(n_components=2).fit_transform(standardize(Z))

            results[D.name] = compare_to_literature(
                variable_importance, best_worst, pc_scores, literature_reactome
            )
    return results
```

##### 关键计算

为分离试剂作用与底物本身难易度，HiTEA 先在同一目标产物或反应对内部对产率做 Z-score 标准化：

$$
z_{ij}=\frac{y_{ij}-\mu_j}{\sigma_j}
$$

其中 \(y_{ij}\) 是第 \(j\) 个底物/目标上下文中使用第 \(i\) 个条件得到的产率，\(\mu_j,\sigma_j\) 是该上下文内的均值与标准差。直觉上，\(z_{ij}>0\) 表示这个条件比同底物的平均水平更好，\(z_{ij}<0\) 表示更差。

随机森林变量重要性可写作对树中分裂带来的 impurity decrease 求和：

$$
I_m=\frac{1}{T}\sum_{t=1}^{T}\sum_{n:\,v(n)=m}p(n)\Delta i(n)
$$

其中 \(m\) 是变量，\(v(n)\) 是节点 \(n\) 使用的分裂变量，\(p(n)\) 是到达该节点的样本比例。它适合捕捉非线性和变量交互，不要求产率与描述符之间是线性关系。

ANOVA-Tukey 模块先检验某一变量分组均值是否显著不同：

$$
F=\frac{\mathrm{MS}_{\mathrm{between}}}{\mathrm{MS}_{\mathrm{within}}}
$$

若变量显著，再用 Tukey HSD 对试剂组两两比较：

$$
|\bar z_a-\bar z_b| >
q_{\alpha,k,N-k}\sqrt{\frac{\mathrm{MS}_{\mathrm{within}}}{n}}
$$

PCA 模块将试剂描述符矩阵中心化后分解：

$$
X_c = U\Sigma V^\top,\quad
T_{1:2}=X_cV_{1:2}
$$

二维主成分得分 \(T_{1:2}\) 用来观察最佳/最差试剂是否形成清晰化学簇，从而判断模型结论是否有化学解释。

##### 方法机制解释

这项工作与 Molecular Transformer 一类端到端反应预测的差异很大。后者通常学习 \(p(\text{product}\mid \text{reactants, reagents})\)，强调给定输入后直接生成产物；HiTEA 则从真实实验矩阵中学习“反应类别、底物、试剂、条件和产率之间有哪些稳定统计结构”。因此它的主要产出不是单条预测，而是一个反应类别的 reactome：哪些因素支配结果，哪些条件普遍有效，哪些失败条件揭示了偏置或机制限制。

真实 HTE 数据的难点在于它不是干净的机器学习 benchmark。实验设计常常是 campaign-driven：某些底物、某些配体或某些反应类别被反复探索，另一些区域很稀疏；产率可能来自 UV 吸收比而非分离产率；大量 0% 产率在文献数据库中不常出现，却对理解“不该做什么”非常关键。HiTEA 的设计重点就是让统计分析在这种不完整、偏置但实验真实性很高的数据上仍然可用。

三模块的组合具有互补性。随机森林给出变量重要性，但无法直接告诉研究者某个配体是好还是坏；Z-score ANOVA-Tukey 能给出最佳/最差试剂列表，但不显示这些试剂是否覆盖了足够宽的化学空间；PCA 则把试剂放回描述符空间，帮助判断“好试剂簇”是化学规律，还是数据只采样了很窄的一类试剂。

论文特别强调 HTE reactome 与 literature reactome 的比较。如果二者一致，说明 HTE 数据支持已有机理认知；如果不一致，可能意味着数据存在选择偏置，也可能揭示文献未充分报道的负结果或条件依赖。例如某些子反应中，HiTEA 发现底物身份比配体更重要，这提示现有筛选可能没有覆盖足够多的底物，不能简单把结论推广为通用反应规律。

> ⚠️ 来源限制：worker 元信息中的年份和新闻链接保留不变；实际可追溯论文公开发表于 2024 年 1 月 2 日，论文内容把该系统称为 HiTEA 和 chemical reactome，而非名为 Reactome 的单一神经网络。

#### 🧪 练习题

```yaml
question: "HiTEA 为什么要先对同一底物或目标上下文中的产率做 Z-score 标准化？"
options:
  - "为了把所有产率强制变成 0% 或 100%"
  - "为了削弱底物本身难易度的影响，更公平地比较试剂和条件"
  - "为了让随机森林只能学习线性关系"
  - "为了删除所有失败反应，避免负样本干扰"
answer: 1
explain: "Z-score 在同一反应上下文内比较条件相对表现，能把底物固有难度与试剂/条件效果部分分离；论文还强调保留失败反应对识别负相关变量很重要。"
```
