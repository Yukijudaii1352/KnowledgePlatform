### DFS — 深度特征合成 (Deep Feature Synthesis)

```yaml
id: dfs
name: DFS
full_name: 深度特征合成 (Deep Feature Synthesis)
year: '2015'
org: MIT
paper_url: https://www.mit.edu/~kalyan/papers/dfs.pdf
category: auto_feature
parent: —
motivation: 跨关系表堆叠聚合原语合成深层特征
```

#### 📝 一句话总结

DFS 提出了一种自动化特征工程算法，通过在关系型数据库的实体关系图上递归地堆叠聚合（Aggregation）与转换（Transform）原语，自动合成具有语义深度的特征，使机器在多个数据科学竞赛中达到与人类数据科学家相当的水平。

#### 🎯 核心要点

- **实体关系图建模**：将关系型数据库的多表结构抽象为实体-关系图（Entity-Relationship Graph），节点为实体（表），边为外键关系
- **两类特征原语**：定义 Transform 原语（作用于单实体的列，如 `log`、`abs`、`weekend`）和 Aggregation 原语（跨关系聚合子实体，如 `SUM`、`MEAN`、`COUNT`、`MODE`、`STD`）
- **深度堆叠机制**："深度"指多层原语的递归堆叠——先从深层子表聚合到父表，再对聚合结果施加转换，再继续向上聚合，形成高阶复合特征
- **回溯式图遍历**：算法沿实体关系图进行深度优先搜索（DFS traversal），在每一层应用原语，通过回溯路径构建跨多表的深层特征
- **Data Science Machine (DSM)**：DFS 是 DSM 系统的核心组件，DSM 还包含自动模型选择与调参，端到端自动化数据科学流程
- **竞赛验证**：在 3 个数据科学竞赛（KDD Cup 2014、Kaggle）中，DSM 的表现超过了 615/906 支人类参赛队伍

#### 🔬 深入细节

![DFS 实体关系图 (EntitySet)](https://raw.githubusercontent.com/alteryx/featuretools/main/docs/source/_static/images/entity_set.png)
*图：Featuretools 中的 EntitySet 结构示意——多张实体表通过外键关系相连，DFS 沿这些关系路径递归应用聚合与转换原语，自动为目标实体合成特征矩阵。*

```python
# DFS 核心算法伪代码
def deep_feature_synthesis(target_entity, entityset, primitives, max_depth):
    """
    target_entity: 目标实体（需要生成特征的主表）
    entityset: 实体关系图（所有表 + 外键关系）
    primitives: {transform: [log, abs, ...], aggregation: [sum, mean, count, ...]}
    max_depth: 最大堆叠深度
    """
    features = get_base_features(target_entity)  # 初始化：目标实体的原始列

    for depth in range(1, max_depth + 1):
        new_features = []

        # 1. 对当前特征应用 Transform 原语
        for feat in features:
            for trans_prim in primitives['transform']:
                if is_compatible(trans_prim, feat.dtype):
                    new_features.append(trans_prim(feat))

        # 2. 沿关系路径应用 Aggregation 原语
        for relationship in entityset.get_relationships(target_entity):
            child_entity = relationship.child_entity
            # 递归：先对子实体做 DFS 获取其特征
            child_features = deep_feature_synthesis(
                child_entity, entityset, primitives, max_depth=depth - 1
            )
            for child_feat in child_features:
                for agg_prim in primitives['aggregation']:
                    if is_compatible(agg_prim, child_feat.dtype):
                        # 按外键分组聚合子实体特征
                        new_features.append(
                            agg_prim(child_feat, group_by=relationship.parent_key)
                        )

        features = features + new_features

    return filter_and_select(features)  # 去重、过滤冗余特征
```

##### 动机与背景

在传统的数据科学工作流中，**特征工程**被公认为最耗时且最依赖领域知识的环节。面对关系型数据库中的多表数据，数据科学家需要手动编写大量 SQL JOIN 和聚合查询，将分散在多张表中的信息汇总到目标实体上。这一过程不仅繁琐，而且高度依赖个人经验——不同的特征设计可能导致模型性能的巨大差异。

Kanter 和 Veeramachaneni 观察到，人类数据科学家在构造特征时，实际上遵循着一套可形式化的模式：**沿着表间关系路径，反复执行聚合和转换操作**。例如，要预测某客户是否会流失，数据科学家会从交易表中计算该客户的"平均交易金额"（聚合），再对其取对数（转换），甚至进一步聚合该客户所在地区所有客户的"平均交易金额的对数的标准差"（深层堆叠）。DFS 的核心思想就是将这一人工模式自动化。

##### 核心机制：实体关系图与原语堆叠

DFS 的输入是一个 **EntitySet**——由多张数据表及其外键关系构成的实体关系图 \(\mathcal{G} = (\mathcal{E}, \mathcal{R})\)，其中 \(\mathcal{E}\) 为实体集合（每张表是一个实体），\(\mathcal{R}\) 为关系集合（外键连接）。

算法的核心是两类**原语（Primitives）**：

1. **Transform 原语** \(T\)：作用于单个实体内的一列或多列，生成新列。例如：
   - 数值型：\(T_{\text{log}}(x) = \log(x)\)，\(T_{\text{abs}}(x) = |x|\)
   - 时间型：\(T_{\text{weekend}}(t) = \mathbb{1}[\text{day}(t) \in \{6,7\}]\)，\(T_{\text{month}}(t) = \text{month}(t)\)
   - 多列：\(T_{\text{diff}}(x_1, x_2) = x_1 - x_2\)

2. **Aggregation 原语** \(A\)：跨关系聚合子实体的特征到父实体。给定父实体 \(e_p\) 与子实体 \(e_c\) 的关系 \(r\)，对子实体特征 \(f\) 按父键分组聚合：

$$A_{\text{agg}}(f, r) = \text{GroupBy}(e_c, r.\text{parent\_key}).\text{agg}(f)$$

其中 \(\text{agg} \in \{\text{SUM}, \text{MEAN}, \text{COUNT}, \text{STD}, \text{MODE}, \text{MIN}, \text{MAX}, \text{N\_UNIQUE}, \text{TREND}, ...\}\)。

> 💡 **关键**："深度"的含义在于原语的递归堆叠。深度为 1 的特征是直接对子表的原始列做一次聚合（如 `MEAN(transactions.amount)`）；深度为 2 的特征则是先对子表的子表聚合，再对结果聚合（如 `STD(customers.MEAN(transactions.amount))`），或者先转换再聚合（如 `MEAN(transactions.LOG(amount))`）。

##### 图遍历与特征构建流程

DFS 的特征构建过程可以形式化为对实体关系图的**深度优先遍历**：

1. **初始化**：从目标实体 \(e_{\text{target}}\) 出发，收集其所有原始列作为基础特征 \(\mathcal{F}_0\)
2. **递归展开**：对于 \(e_{\text{target}}\) 的每条关系 \(r_i\)，找到关联的子实体 \(e_{c_i}\)，递归地对 \(e_{c_i}\) 执行 DFS（深度减 1）
3. **聚合回传**：将子实体的特征通过 Aggregation 原语聚合回目标实体
4. **转换增强**：对目标实体上的所有特征（包括聚合得到的新特征）应用 Transform 原语
5. **深度控制**：通过 `max_depth` 参数控制递归深度，防止特征爆炸

特征数量随深度指数增长。设原始特征数为 \(n\)，Transform 原语数为 \(|T|\)，Aggregation 原语数为 \(|A|\)，关系数为 \(|R|\)，则深度 \(d\) 时的特征数量级约为：

$$|\mathcal{F}_d| \approx n \cdot (|T| + |A| \cdot |R|)^d$$

因此实际使用中 `max_depth` 通常设为 2 或 3，并配合特征选择来控制维度。

##### 与传统方法的区别

| 维度 | 传统手工特征工程 | DFS |
|------|-----------------|-----|
| **执行者** | 人类数据科学家 | 自动化算法 |
| **多表处理** | 手写 SQL JOIN + GROUP BY | 自动沿实体关系图遍历 |
| **特征深度** | 通常 1-2 层，受人工精力限制 | 可系统性地探索任意深度 |
| **领域知识** | 强依赖 | 通过原语库编码通用模式 |
| **可复现性** | 低（依赖个人经验） | 高（算法确定性输出） |
| **时间成本** | 数天到数周 | 数分钟到数小时 |

> ⚠️ **注意**：DFS 生成的特征数量可能非常庞大（深度 2 时可达数千维），因此在实际应用中通常需要配合特征选择（如基于模型重要性的筛选）来降维。论文中 DSM 系统使用随机森林等模型的特征重要性进行后筛选。

##### DSM 系统与竞赛评估

DFS 作为 Data Science Machine（DSM）的特征引擎，与自动模型选择和超参调优模块协同工作。在论文的实验评估中：

- **KDD Cup 2014**（预测教育项目资助）：DSM 排名前 **30%**
- **Kaggle Acquire Valued Shoppers**（预测优惠券使用）：DSM 排名前 **16%**  
- **Kaggle Walmart Trip Type**（购物行程分类）：DSM 排名前 **34%**

综合三个竞赛，DSM 的表现优于 **615/906（67.8%）** 的人类参赛队伍。这一结果首次证明了自动化特征工程在真实竞赛场景中的可行性，也为后续的 Featuretools 开源库奠定了基础。

#### 🧪 练习题

```yaml
question: "DFS 中"深度"（Deep）的含义是什么？"
options:
  - "使用深度神经网络提取特征"
  - "对实体关系图进行深度优先搜索遍历并递归堆叠聚合/转换原语"
  - "特征矩阵的行数很深（样本量大）"
  - "使用深度强化学习搜索最优特征组合"
answer: 1
explain: "DFS 的"深度"指沿实体关系图递归堆叠多层聚合与转换原语，生成高阶复合特征，而非深度学习中的"深度"。"
```