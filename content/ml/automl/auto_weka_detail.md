### Auto-WEKA

```yaml
id: auto_weka
name: Auto-WEKA
full_name: "联合分类算法选择与超参数优化 (Combined Selection and Hyperparameter Optimization of Classification Algorithms)"
year: 2013
org: UBC (University of British Columbia)
paper_url: "https://arxiv.org/abs/1208.3719"
category: foundation
parent: "—"
motivation: "将算法选择与HPO统一为CASH问题，通过贝叶斯优化在联合空间中自动搜索最优分类器及其超参数"
```

#### 📝 一句话总结

Auto-WEKA 提出了 CASH（Combined Algorithm Selection and Hyperparameter Optimization）问题，将机器学习算法选择与超参数优化统一为一个层次化的超参数优化问题，并利用基于序贯模型的贝叶斯优化方法（SMAC 和 TPE）在 WEKA 全部分类器空间中自动搜索最优配置，显著优于传统的独立选择方法。

#### 🎯 核心要点

- 定义 CASH 问题：将算法选择本身视为一个超参数，与各算法的超参数一起构成层次化搜索空间
- 搜索空间覆盖 WEKA 全部分类器：27 个基分类器 + 10 个元方法 + 2 个集成方法 + 特征选择（3 种搜索策略 × 8 种评估器）
- 采用 SMBO（Sequential Model-Based Optimization）框架，具体使用 SMAC 和 TPE 两种贝叶斯优化方法
- SMAC 基于随机森林代理模型，天然支持条件超参数和混合（连续+离散）搜索空间
- TPE 使用树结构 Parzen 估计器，通过分层采样处理条件依赖关系
- 在 21 个 UCI 数据集、KDD Cup 09、MNIST 变体和 CIFAR-10 上验证，性能显著优于默认配置和网格搜索
- 交叉验证用于评估泛化性能，设置时间预算限制单次评估时间

#### 🔬 深入细节

![Auto-WEKA 层次化超参数空间示意](https://ar5iv.labs.arxiv.org/html/1208.3719v2/assets/x1.png)
*图：Auto-WEKA 的层次化超参数空间结构——算法选择作为根节点，各算法的超参数作为条件子节点*

```python
# Algorithm 1: Sequential Model-Based Optimization (SMBO) 伪代码
def SMBO(time_budget, D_train, D_valid):
    M_L = initialize_model()       # 初始化代理模型（随机森林/TPE）
    H = []                          # 历史观测集合 {(λ, cost)}
    
    while not time_budget_exhausted():
        # 1. 从代理模型中选择候选配置
        lambda_candidate = select_candidate(M_L)  # 基于 acquisition function (EI)
        
        # 2. 评估候选配置（交叉验证误差）
        cost = evaluate(A_lambda_candidate, D_train, D_valid)
        
        # 3. 更新历史
        H.append((lambda_candidate, cost))
        
        # 4. 用新数据更新代理模型
        M_L = update_model(M_L, H)
    
    # 返回历史中表现最好的配置
    return argmin(H, key=lambda x: x[1])
```

##### 动机与背景

机器学习实践中，用户面临两个关键选择：（1）选择哪个学习算法；（2）如何设置该算法的超参数。传统方法将这两个问题独立处理——先通过模型选择确定算法，再对选定算法进行超参数优化。这种分离策略存在明显缺陷：

- **次优组合**：最佳算法在默认超参数下可能表现不佳，而非最佳算法在精心调参后可能更优
- **搜索空间浪费**：独立搜索忽略了算法选择与超参数之间的交互效应
- **用户负担**：非专家用户难以做出合理选择，往往依赖算法声誉或直觉

> 💡 关键洞察：将算法选择本身视为一个"根超参数"，各算法的具体超参数作为条件超参数（仅在对应算法被选中时激活），整个问题就变成了一个统一的层次化超参数优化问题。

##### CASH 问题形式化定义

给定算法集合 \(\mathcal{A} = \{A^{(1)}, \ldots, A^{(K)}\}\)，每个算法 \(A^{(j)}\) 有对应的超参数空间 \(\Lambda^{(j)}\)，CASH 问题定义为：

$$A^*_{\lambda^*} \in \underset{A^{(j)} \in \mathcal{A}, \lambda \in \Lambda^{(j)}}{\text{argmin}} \frac{1}{k} \sum_{i=1}^{k} \mathcal{L}(A^{(j)}_\lambda, \mathcal{D}^{(i)}_{\text{train}}, \mathcal{D}^{(i)}_{\text{valid}})$$

其中 \(\mathcal{L}(A^{(j)}_\lambda, \mathcal{D}^{(i)}_{\text{train}}, \mathcal{D}^{(i)}_{\text{valid}})\) 是算法 \(A^{(j)}\) 在超参数 \(\lambda\) 下，于第 \(i\) 折训练集上训练、验证集上评估的损失。

> ⚠️ 注意：CASH 搜索空间是**层次化**的——只有当特定算法被选中时，其超参数才"激活"；集成方法的基分类器选择又引入了更深层的条件依赖。

##### 求解方法：SMBO 框架

Auto-WEKA 采用 Sequential Model-Based Optimization（SMBO）框架来求解 CASH 问题。SMBO 的核心思想是：

1. **构建代理模型**：用一个概率模型 \(\mathcal{M}_L\) 来近似目标函数（交叉验证误差关于超参数配置的映射）
2. **采集函数引导搜索**：利用 Expected Improvement（EI）等采集函数，在探索（exploration）和利用（exploitation）之间平衡
3. **迭代更新**：每次评估后用新观测更新代理模型，逐步逼近最优

Auto-WEKA 具体使用了两种 SMBO 实例：

**SMAC（Sequential Model-based Algorithm Configuration）**：
- 代理模型：随机森林（Random Forest）
- 优势：天然处理离散/条件超参数，对高维空间鲁棒
- 通过随机森林预测均值和方差来计算 EI
- 使用 local search + random sampling 来优化采集函数

**TPE（Tree-structured Parzen Estimator）**：
- 代理模型：树结构 Parzen 估计器
- 将超参数空间组织为树形结构，条件超参数自然对应树的分支
- 将观测分为"好"（\(l(x)\)）和"差"（\(g(x)\)）两组，最大化 \(l(x)/g(x)\) 比值
- 假设同一路径上的超参数之间独立

##### Auto-WEKA 搜索空间

Auto-WEKA 的搜索空间覆盖了 WEKA 中几乎所有分类相关组件：

| 类别 | 数量 | 示例 |
|------|------|------|
| 基分类器 | 27 | SVM, KNN, 决策树, 朴素贝叶斯, 逻辑回归, 随机森林等 |
| 元方法 | 10 | Bagging, AdaBoost, Stacking 等（接受一个基分类器作为参数） |
| 集成方法 | 2 | Vote, Stacking（接受最多 5 个基分类器） |
| 特征选择搜索 | 3 | BestFirst, GreedyStepwise, Ranker |
| 特征选择评估 | 8 | CfsSubset, InfoGain, GainRatio 等 |

总超参数空间包含 786 个超参数（含条件超参数），形成一个深度层次化的搜索空间。

##### 与传统方法的对比

| 方面 | 传统方法 | Auto-WEKA (CASH) |
|------|---------|-----------------|
| 算法选择 | 人工选择或独立模型选择 | 自动化，作为优化变量 |
| 超参数优化 | 网格搜索/随机搜索 | 贝叶斯优化（SMAC/TPE） |
| 搜索空间 | 单一算法的超参数 | 所有算法 × 所有超参数的联合空间 |
| 条件依赖 | 不处理 | 层次化建模，天然支持 |
| 用户参与 | 需要专家知识 | 全自动，仅需提供数据和时间预算 |

##### 实验结果

在 21 个数据集上的实验表明：
- Auto-WEKA（SMAC）在大多数数据集上显著优于使用默认超参数的最佳算法
- 在大型数据集上优势更为明显，因为搜索空间中存在更多可利用的结构
- SMAC 整体表现优于 TPE，可能因为随机森林更好地处理了高维条件空间
- 30 分钟的优化时间预算即可获得显著改进

#### 🧪 练习题

```yaml
question: "Auto-WEKA 中 CASH 问题的核心创新在于什么？"
options:
  - "使用集成学习组合多个分类器的预测结果"
  - "将算法选择视为超参数，与算法超参数一起在联合空间中优化"
  - "使用网格搜索遍历所有可能的算法和超参数组合"
  - "通过迁移学习将一个数据集上的最优配置迁移到新数据集"
answer: 1
explain: "CASH 的核心创新是将'选择哪个算法'本身也视为一个超参数，与各算法的具体超参数构成层次化搜索空间，然后用贝叶斯优化统一求解。"
```