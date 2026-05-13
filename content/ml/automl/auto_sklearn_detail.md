### Auto-sklearn

```yaml
id: auto_sklearn
name: Auto-sklearn
full_name: "自动Sklearn (Auto-sklearn: Efficient and Robust AutoML)"
year: 2015
org: University of Freiburg
paper_url: "https://papers.nips.cc/paper/2015/hash/11d0e6287202fced83f79975ec59a3a6-Abstract.html"
category: framework
parent: auto_weka
motivation: "元学习热启动+自动集成构建"
```

#### 📝 一句话总结

Auto-sklearn 在 Auto-WEKA 的 CASH 框架基础上，引入**元学习热启动**（利用历史数据集的元特征初始化贝叶斯优化）和**自动集成构建**（从优化过程中评估过的模型中贪心选择集成成员），在 scikit-learn 生态上构建了一个高效且鲁棒的全自动机器学习系统，赢得了首届 ChaLearn AutoML 挑战赛冠军。

#### 🎯 核心要点

- 基于 scikit-learn 构建完整 ML pipeline：15 个分类器 + 14 个特征预处理方法 + 4 个数据预处理方法，共 110 个超参数
- 元学习热启动：利用 140 个数据集上的 38 维元特征，通过 \(k\)-NN 选择相似数据集的最优配置来初始化 SMAC
- 自动集成构建：基于 Caruana et al. (2004) 的贪心集成选择方法，从优化过程中评估过的所有模型中构建加权集成
- 优化器采用 SMAC（基于随机森林的贝叶斯优化），天然支持条件超参数和混合搜索空间
- 在 140 个 OpenML 数据集上进行系统评估，显著优于 Auto-WEKA 和 hyperopt-sklearn
- 赢得首届 ChaLearn AutoML 挑战赛第一阶段冠军

#### 🔬 深入细节

![Auto-sklearn 系统架构图](https://ar5iv.labs.arxiv.org/html/1507.04528v2/assets/x1.png)
*图：Auto-sklearn 系统总览——在传统 AutoML 系统（虚线框）外围增加了元学习（左）和自动集成构建（右）两个模块*

```python
# Auto-sklearn 核心流程伪代码
def auto_sklearn(D_train, time_budget, meta_knowledge):
    # ====== 阶段 1: 元学习热启动 ======
    meta_features = extract_meta_features(D_train)  # 38 维元特征
    # 从 140 个历史数据集中找到最相似的 k=25 个
    similar_datasets = kNN(meta_features, meta_knowledge, k=25)
    # 获取这些数据集上的最优配置作为初始化点
    initial_configs = [best_config(d) for d in similar_datasets]

    # ====== 阶段 2: 贝叶斯优化 (SMAC) ======
    evaluated_models = []
    smac = SMAC(config_space, initial_configs)
    
    while not time_budget_exhausted():
        config = smac.suggest()              # 基于随机森林代理模型 + EI
        score = cross_validate(config, D_train)
        smac.update(config, score)
        evaluated_models.append((config, trained_model, score))

    # ====== 阶段 3: 自动集成构建 ======
    ensemble = greedy_ensemble_selection(
        evaluated_models, 
        max_size=50,
        with_replacement=True              # 允许重复选择（加权效果）
    )
    return ensemble
```

##### 动机与背景

Auto-WEKA 首次将算法选择与超参数优化统一为 CASH 问题，但仍存在两个关键局限：

- **冷启动问题**：贝叶斯优化在搜索初期缺乏先验知识，需要大量随机探索才能找到有希望的区域。对于复杂的 ML pipeline 搜索空间（110 个超参数），这种冷启动代价尤为高昂
- **单模型输出**：传统 AutoML 系统只返回优化过程中找到的单一最优配置，浪费了搜索过程中评估的大量其他高质量模型，且单模型预测的鲁棒性不如集成

> 💡 关键洞察：Auto-sklearn 的核心思想是"不浪费任何信息"——用历史数据集的经验加速搜索启动，用搜索过程中产生的所有模型构建集成，从而在效率和鲁棒性两个维度同时提升。

##### 搜索空间：结构化 ML Pipeline

Auto-sklearn 的搜索空间定义了一个完整的机器学习 pipeline，包含三个层次：

| 层次 | 组件数 | 示例 |
|------|--------|------|
| 数据预处理 | 4 种 | 缺失值填充（均值/中位数/众数）、独热编码、类别特征处理、特征缩放 |
| 特征预处理 | 14 种 | PCA、核 PCA、随机厨房水槽、多项式特征、特征选择（基于方差/互信息/L1）等 |
| 分类器 | 15 种 | AdaBoost、随机森林、梯度提升、SVM（线性/RBF）、KNN、朴素贝叶斯、LDA、QDA 等 |

整个搜索空间包含 110 个超参数，形成一个层次化的条件配置空间。CASH 问题的形式化定义为：

$$\mathcal{A}^*_{\lambda^*} \in \underset{\mathcal{A}^{(j)} \in \mathcal{A},\; \lambda \in \Lambda^{(j)}}{\text{argmin}} \; \frac{1}{k} \sum_{i=1}^{k} \mathcal{L}\!\left(\mathcal{A}^{(j)}_\lambda,\; \mathcal{D}^{(i)}_{\text{train}},\; \mathcal{D}^{(i)}_{\text{valid}}\right)$$

其中 \(\mathcal{A}\) 包含所有可能的 pipeline 配置（数据预处理 + 特征预处理 + 分类器），\(\Lambda^{(j)}\) 是第 \(j\) 种 pipeline 的超参数空间。

##### 核心机制一：元学习热启动

元学习模块的目标是利用在历史数据集上积累的经验，为新数据集提供高质量的初始化配置，从而跳过贝叶斯优化的冷启动阶段。

**元特征提取**：对每个数据集提取 38 维元特征，包括：
- **简单特征**：样本数、特征数、类别数、缺失值比例等
- **统计特征**：特征的偏度、峰度均值/标准差
- **信息论特征**：类别熵、特征-类别互信息
- **PCA 特征**：前几个主成分的解释方差比例

**热启动流程**：
1. 离线阶段：在 140 个 OpenML 数据集上运行 Auto-sklearn，记录每个数据集的元特征和最优配置
2. 在线阶段：对新数据集提取元特征，计算与历史数据集的 L1 距离
3. 选择最近的 \(k=25\) 个数据集的最优配置，作为 SMAC 的初始评估点

> ⚠️ 注意：元学习并不替代贝叶斯优化，而是为其提供更好的起点。在时间预算充足时，贝叶斯优化最终会收敛到相似的解；但在时间有限时（实际应用中的常见场景），元学习热启动能带来显著的性能提升。

##### 核心机制二：自动集成构建

传统 AutoML 系统只返回单一最优模型，但优化过程中可能评估了数百个不同配置的模型。Auto-sklearn 采用 Caruana et al. (2004) 提出的**贪心集成选择**方法，从这些模型中构建集成：

**贪心集成选择算法**：

$$\text{Ensemble}_{t+1} = \text{Ensemble}_t \cup \underset{m \in \mathcal{M}}{\text{argmin}} \; \mathcal{L}\!\left(\text{Ensemble}_t \cup \{m\},\; \mathcal{D}_{\text{valid}}\right)$$

具体步骤：
1. 初始化：从所有已评估模型的验证集预测中，选择验证损失最小的模型
2. 迭代添加：每轮从候选模型库中选择一个加入后能最大程度降低集成验证损失的模型
3. **允许重复选择**：同一模型可被多次选入，等价于为其分配更高的权重
4. 集成大小上限设为 50，最终预测为所有成员预测的加权平均

> 💡 关键优势：这种方法几乎零额外计算成本——所有模型在优化阶段已经训练完毕，集成选择只需操作验证集上的预测概率矩阵。同时，集成天然具有正则化效果，能显著提升鲁棒性。

##### 优化引擎：SMAC

Auto-sklearn 使用 SMAC（Sequential Model-based Algorithm Configuration）作为贝叶斯优化引擎：

- **代理模型**：随机森林，预测配置的性能均值和不确定性
- **采集函数**：Expected Improvement (EI)，平衡探索与利用
- **条件空间处理**：随机森林天然支持条件超参数——未激活的超参数在分裂时被忽略
- **鲁棒性机制**：对超时或崩溃的配置赋予最差性能值，防止搜索陷入不稳定区域

##### 与前序工作的对比

| 方面 | Auto-WEKA | hyperopt-sklearn | Auto-sklearn |
|------|-----------|-----------------|--------------|
| ML 框架 | WEKA (Java) | scikit-learn | scikit-learn |
| 搜索空间 | 786 个超参数 | 未报告 | 110 个超参数 |
| 优化方法 | SMAC / TPE | TPE | SMAC |
| 元学习 | ❌ | ❌ | ✅ 38 维元特征 + kNN |
| 集成构建 | ❌ | ❌ | ✅ 贪心集成选择 |
| 数据预处理 | 有限 | 有限 | 系统化（4 种方法） |
| 特征预处理 | 特征选择 | 有限 | 14 种方法 |

##### 实验结果

在 140 个 OpenML 数据集上的系统评估表明：

- **整体性能**：Auto-sklearn 在大多数数据集上显著优于 Auto-WEKA 和 hyperopt-sklearn
- **元学习贡献**：在搜索早期（前 10 分钟），元学习热启动带来的性能提升最为显著，平均排名从 ~3.5 降至 ~2.5
- **集成贡献**：自动集成构建在几乎所有数据集上都优于或等于单一最优模型，平均提升约 1-2 个百分点
- **两者结合**：元学习 + 集成的完整 Auto-sklearn 系统在所有时间预算下均表现最优
- **ChaLearn 挑战赛**：在首届 AutoML 挑战赛第一阶段的 5 个数据集上排名第一

#### 🧪 练习题

```yaml
question: "Auto-sklearn 相比 Auto-WEKA 的两个核心改进分别解决了什么问题？"
options:
  - "元学习解决过拟合问题，集成构建解决欠拟合问题"
  - "元学习解决冷启动问题，集成构建提升单模型输出的鲁棒性"
  - "元学习解决特征选择问题，集成构建解决算法选择问题"
  - "元学习加速模型训练，集成构建减少内存占用"
answer: 1
explain: "元学习通过历史数据集经验为贝叶斯优化提供高质量初始点，解决冷启动问题；集成构建从搜索过程中的多个模型中选择成员组成集成，比单一最优模型更鲁棒。"
```