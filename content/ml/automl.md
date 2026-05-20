---
domain: ml
topic_id: automl
topic_name: AutoML 算法总结
page_icon: 🤖
page_title: AutoML 算法总结
page_subtitle: '{build_date} 版'
page_desc: '从早期贝叶斯超参优化到自动特征工程与神经网络结构搜索， AutoML 经历了从人工调参到 LLM 智能体驱动的范式演进。 本文档梳理 2011–2026 年间自动特征工程、超参数优化、 NAS 及综合框架四大方向的经典与前沿算法。

  '
hero_pills:
- 🏷️ HPO · NAS · AutoFE
- 🚀 Efficiency · Automation
count_pill: '{count} 个算法'
categories:
  auto_feature:
    label: 自动特征工程
    color: '#43A047'
  hpo:
    label: 超参数优化
    color: '#1E88E5'
  nas:
    label: 神经网络结构搜索
    color: '#E53935'
  framework:
    label: 综合框架
    color: '#8E24AA'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: smac
  x: 100
  y: 280
  category: hpo
- id: tpe
  x: 120
  y: 340
  category: hpo
- id: random_search
  x: 160
  y: 220
  category: hpo
- id: auto_weka
  x: 220
  y: 600
  category: framework
- id: dfs
  x: 300
  y: 100
  category: auto_feature
- id: auto_sklearn
  x: 320
  y: 600
  category: framework
- id: pbt
  x: 420
  y: 340
  category: hpo
- id: nas_rl
  x: 420
  y: 460
  category: nas
- id: hyperband
  x: 520
  y: 220
  category: hpo
- id: nasnet
  x: 520
  y: 400
  category: nas
- id: enas
  x: 540
  y: 520
  category: nas
- id: bohb
  x: 540
  y: 340
  category: hpo
- id: darts
  x: 620
  y: 520
  category: nas
- id: efficientnet
  x: 640
  y: 400
  category: nas
- id: optuna
  x: 620
  y: 280
  category: hpo
- id: autofeat
  x: 620
  y: 100
  category: auto_feature
- id: ofa
  x: 720
  y: 460
  category: nas
- id: llm_fe
  x: 920
  y: 100
  category: auto_feature
- id: autoep
  x: 920
  y: 280
  category: hpo
- id: composer
  x: 900
  y: 400
  category: nas
- id: jet_nemotron
  x: 940
  y: 520
  category: nas
edges:
- from: smac
  to: auto_weka
  label: 统一CASH问题
- from: auto_weka
  to: auto_sklearn
  label: 元学习+集成
- from: tpe
  to: bohb
  label: 融合Hyperband
- from: tpe
  to: optuna
  label: 动态搜索空间
- from: random_search
  to: hyperband
  label: 逐次减半加速
- from: nas_rl
  to: nasnet
  label: Cell模块迁移
- from: nas_rl
  to: enas
  label: 权重共享降本
- from: enas
  to: darts
  label: 连续松弛化
- from: enas
  to: ofa
  label: 超网一次训练
- from: nasnet
  to: efficientnet
  label: 复合缩放
- from: nasnet
  to: composer
  label: 模块化扩展
- from: ofa
  to: jet_nemotron
  label: 后训练优化
- from: dfs
  to: autofeat
  label: 非线性变换
- from: autofeat
  to: llm_fe
  label: LLM进化搜索
- from: pbt
  to: autoep
  label: 零样本LLM调参
milestones:
- nasnet
- hyperband
- darts
```

## 核心算法

### SMAC

```yaml
id: smac
num: 1
name: SMAC
full_name: 基于序列模型的算法配置 (Sequential Model-based Algorithm Configuration)
year: '2011'
org: University of Freiburg
parent: —
paper_url: https://ml.informatik.uni-freiburg.de/papers/11-LION5-SMAC.pdf
project_url: ''
category: hpo
motivation: 随机森林代理模型处理条件参数
```

#### 📝 一句话总结
SMAC 提出了基于随机森林代理模型的序贯优化框架，通过支持混合类别/数值参数空间和条件参数结构，将基于模型的算法配置方法从低维连续空间推广到高维混合配置空间，成为 AutoML 超参数优化的奠基性工作。

#### 🎯 核心要点
- 提出 SMBO（Sequential Model-Based Optimization）通用框架，统一算法配置流程为：模型拟合 → 配置选择 → 配置评估（Intensify）循环
- 使用**随机森林**作为代理模型，天然支持类别型参数和条件参数，突破高斯过程仅适用于连续空间的限制
- 设计 **Intensify** 机制：通过逐步增加实例数的竞赛策略，在有限时间预算下高效比较候选配置与当前最优配置
- 采用 **Expected Improvement (EI)** 作为采集函数，自动平衡探索与利用；具体使用对数变换下的 \(E[I_{\exp}]\) 准则
- 通过**多起点局部搜索**最大化 EI，使用随机单交换邻域处理混合类别/数值空间
- 支持**实例特征**：将实例特征与参数配置联合作为随机森林输入，实现跨实例泛化预测
- 引入 ROAR（Random Online Aggressive Racing）作为消融基线，验证 Intensify 机制本身的贡献

#### 🔬 深入细节
![SMAC 框架示意图](https://automl.github.io/SMAC3/main/_images/smbo_loop.png)
*图：SMAC 的 SMBO 循环框架——迭代地拟合代理模型、选择候选配置、通过 Intensify 评估配置*

##### 算法伪代码

```
Algorithm: SMAC
Input: θ_default (默认配置), Π (实例集), t_budget (时间预算)
Output: θ_inc (最优配置)

1:  θ_inc ← θ_default
2:  R ← run(θ_default, π_random)    // 初始化运行历史
3:  repeat
4:      M ← FitModel(R)              // 拟合随机森林代理模型
5:      C ← SelectConfigurations(M, θ_inc)  // 基于EI选择候选配置
6:      [θ_inc, R] ← Intensify(C, θ_inc, R, M)  // 竞赛评估
7:  until time_budget exhausted
8:  return θ_inc
```

```
Procedure: Intensify(C, θ_inc, R, M)
// 逐步增加实例数的竞赛机制
1:  for θ_new in C do
2:      N ← instances_run_on(θ_inc)
3:      for i = 1, 2, 4, 8, ... (doubling) do
4:          选择 i 个实例评估 θ_new
5:          if mean_cost(θ_new) > bound(θ_inc):
6:              break  // 提前终止：候选明显劣于incumbent
7:      if mean_cost(θ_new, all N) < mean_cost(θ_inc, all N):
8:          θ_inc ← θ_new  // 更新incumbent
9:  return θ_inc, R
```

##### 动机与背景

算法配置（Algorithm Configuration）问题旨在为给定算法自动寻找最优超参数组合。传统方法面临三大挑战：

1. **高维混合参数空间**：实际算法（如 SAT 求解器 SPEAR 有 26 个参数）包含连续、离散、类别参数，且存在条件依赖（某参数仅在另一参数取特定值时才生效）
2. **评估代价高昂**：每次评估需运行目标算法，单次可能耗时数分钟到数小时
3. **多实例泛化**：需要找到在一组问题实例上整体表现好的配置，而非仅针对单个实例

此前的 SMBO 方法（如 SPO、TB-SPO）使用高斯过程模型，仅能处理低维全数值参数空间；而基于局部搜索的 ParamILS 虽能处理离散空间，但需要预先离散化连续参数，丢失精度。

##### 核心机制：随机森林代理模型

SMAC 的核心创新在于用**随机森林**替代高斯过程作为代理模型。随机森林的关键优势：

- **天然处理类别变量**：决策树的分裂条件可直接基于类别值划分，无需编码
- **处理条件参数**：对于不活跃的条件参数，SMAC 将其设为默认值；由于树结构的层次性，模型能自然学习到参数间的条件依赖
- **计算效率**：预测复杂度为 \(O(T \cdot \log N)\)（T 为树数量，N 为训练样本数），远优于 GP 的 \(O(N^3)\)
- **不确定性估计**：通过各棵树预测值的方差提供不确定性度量

> 💡 关键：随机森林不仅提供点预测 \(\mu_\theta\)，还通过树间方差给出 \(\sigma^2_\theta\)，这对 EI 计算至关重要。

##### Expected Improvement 采集函数

给定代理模型对配置 \(\theta\) 的预测分布（均值 \(\mu_\theta\)，方差 \(\sigma^2_\theta\)），SMAC 使用对数变换下的 EI 准则：

$$
\text{EI}(\theta) = f_{\min} \cdot \Phi(v) - e^{\frac{1}{2}\sigma^2_\theta + \mu_\theta} \cdot \Phi(v - \sigma_\theta)
$$

其中 \(v = \frac{\ln(f_{\min}) - \mu_\theta}{\sigma_\theta}\)，\(\Phi\) 为标准正态 CDF，\(f_{\min}\) 为当前 incumbent 的经验平均性能。

EI 的直觉：**当预测均值低（利用已知好区域）或预测不确定性高（探索未知区域）时，EI 值大**，从而自动平衡探索与利用。

为在高维混合空间中最大化 EI，SMAC 采用**多起点局部搜索**：
1. 计算所有已评估配置的 EI 值
2. 选取 EI 最高的 10 个配置作为局部搜索起点
3. 使用随机单交换邻域（改变一个参数值）进行爬山
4. 对数值参数：从 \(\mathcal{N}(v, 0.2)\) 采样 4 个邻居值
5. 收集所有局部最优，并额外随机采样配置以确保多样性

##### Intensify 竞赛机制

Intensify 是 SMAC 的关键组件，解决"如何在有限预算下可靠比较配置"的问题：

1. **逐步增加实例**：不一次性在所有实例上评估候选配置，而是逐步增加评估实例数
2. **提前终止**：若候选配置在已评估实例子集上已明显劣于 incumbent，立即终止
3. **公平比较**：确保候选配置至少在 incumbent 已运行的实例子集上被评估
4. **Doubling 策略**：每轮将候选配置的评估实例数翻倍（1→2→4→8...），直到与 incumbent 评估数相当

> ⚠️ 注意：Intensify 与模型选择解耦——即使没有代理模型（如 ROAR 随机选择配置），Intensify 本身也能显著提升配置效率。

##### 实例特征支持

对于多实例场景，SMAC 将实例特征 \(f_i\) 与参数配置 \(\theta\) 联合作为随机森林输入：

$$
\hat{c}(\theta, i) = \text{RF}([\theta, f_i])
$$

预测时，对给定配置 \(\theta\) 分别预测其在每个训练实例上的性能，再用用户定义的聚合指标（如平均运行时间）组合。这使得 SMAC 能利用实例结构信息进行更精准的性能预测。

##### 与传统方法的对比

| 方法 | 参数空间 | 代理模型 | 多实例 | 条件参数 |
|------|---------|---------|--------|---------|
| SPO/TB-SPO | 仅连续 | 高斯过程 | ✗ | ✗ |
| ParamILS | 离散化 | 无（局部搜索） | ✓ | 有限 |
| GGA | 混合 | 无（遗传算法） | ✓ | ✗ |
| **SMAC** | **混合（原生）** | **随机森林** | **✓** | **✓** |

实验表明，SMAC 在 11 个单实例场景和 6 个多实例场景中均达到最优或统计不可区分于最优的性能，同时比 ParamILS 和 GGA 具有更高的鲁棒性（25 次独立运行的方差更小）。

#### 🧪 练习题
```yaml
question: "SMAC 选择随机森林而非高斯过程作为代理模型的主要原因是什么？"
options:
  - "随机森林的预测精度在所有场景下都优于高斯过程"
  - "随机森林能天然处理类别型参数和条件参数结构"
  - "随机森林不需要不确定性估计即可计算 Expected Improvement"
  - "随机森林的训练速度比高斯过程慢但更稳定"
answer: 1
explain: "SMAC 面对的核心挑战是高维混合类别/数值参数空间及条件参数依赖，高斯过程仅适用于低维连续空间，而随机森林的决策树结构天然支持类别分裂和层次条件关系。"
```

### TPE

```yaml
id: tpe
num: 2
name: TPE
full_name: 树结构Parzen估计器 (Tree-structured Parzen Estimator)
year: '2011'
org: University of Sherbrooke
parent: —
paper_url: https://papers.nips.cc/paper/2011/hash/86e8f7ad327462834789d7b64455531f-Abstract.html
project_url: ''
category: hpo
motivation: 建模P(x|y)的密度估计实现高效搜索
```

#### 📝 一句话总结
TPE 通过将超参数先验分布按目标函数值分为"好"与"差"两组并分别建模密度 \(l(x)\) 和 \(g(x)\)，将 Expected Improvement 简化为密度比 \(l(x)/g(x)\) 的最大化问题，在树结构条件空间中实现了高效的贝叶斯超参数优化。

#### 🎯 核心要点
- **逆向建模思路**：不直接建模 \(P(y|x)\)（如高斯过程），而是建模 \(P(x|y<y^*)\) 和 \(P(x|y \geq y^*)\)，即条件密度 \(l(x)\) 和 \(g(x)\)
- **EI 等价简化**：证明 Expected Improvement 正比于 \(\gamma + (1-\gamma) \cdot g(x)/l(x)\) 的倒数，最大化 EI 等价于最大化 \(l(x)/g(x)\)
- **Parzen 窗密度估计**：使用自适应带宽的核密度估计（KDE）分别拟合两组观测点的分布
- **树结构条件空间**：天然支持层级/条件超参数（如选择 SVM 核类型后才有对应核参数），密度估计按树结构分解
- **阈值分位数 \(\gamma\)**：以观测值的 \(\gamma\) 分位数作为 \(y^*\)，典型取 \(\gamma=0.15\sim0.25\)
- **对比实验**：在多个深度学习与机器学习基准上与 GP-BO、SMAC、随机搜索对比，展示了 TPE 在高维条件空间中的优势
- **Hyperopt 框架**：TPE 是 Hyperopt 库的核心优化算法

#### 🔬 深入细节
```
                        TPE 密度估计示意图

  目标函数值 y
       ▲
       │         ×  ×
  y*  ─┼─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   ← 阈值 (γ 分位数)
       │    ●  ●     ●   ●  ●
       │  ●      ●  ●  ●     ●
       └──────────────────────────→ 超参数 x

       ● = 好的观测 (y < y*)  →  拟合 l(x)
       × = 差的观测 (y ≥ y*)  →  拟合 g(x)

  密度
   ▲   l(x): 好观测的KDE          g(x): 差观测的KDE
   │    ╱╲                           ╱──╲
   │  ╱    ╲    ╱╲                 ╱      ╲
   │╱        ╲╱    ╲             ╱          ╲
   └──────────────────→ x    └──────────────────→ x

  选择策略: 从 l(x) 采样候选点, 按 l(x)/g(x) 排序取最优
```
*图：TPE 将观测按阈值 \(y^*\) 分为两组，分别用核密度估计建模 \(l(x)\)（好的观测）和 \(g(x)\)（差的观测），新候选点从 \(l(x)\) 中采样并按 \(l(x)/g(x)\) 排序选择*

```python
# TPE 核心算法伪代码
def tpe_suggest(observations, gamma=0.25):
    """
    observations: 历史观测 {x_i, y_i}
    gamma: 分位数阈值比例
    """
    # Step 1: 按目标值排序，确定阈值 y*
    y_star = quantile(observations.y, gamma)
    
    # Step 2: 将观测分为两组
    D_good = {x_i | y_i < y_star}   # 好的观测
    D_bad  = {x_i | y_i >= y_star}  # 差的观测
    
    # Step 3: 分别拟合核密度估计
    l_x = fit_parzen_estimator(D_good)  # P(x | y < y*)
    g_x = fit_parzen_estimator(D_bad)   # P(x | y >= y*)
    
    # Step 4: 从 l(x) 中采样候选点
    candidates = sample(l_x, n_candidates=24)
    
    # Step 5: 按 l(x)/g(x) 排序，选择比值最大的点
    scores = [l_x.pdf(c) / g_x.pdf(c) for c in candidates]
    return candidates[argmax(scores)]
```

##### 动机与背景

超参数优化（HPO）是机器学习中的关键问题。传统方法如网格搜索在高维空间中效率极低（指数级增长），随机搜索虽然更好但仍未利用历史信息。基于高斯过程（GP）的贝叶斯优化虽然能建模目标函数的后验分布，但存在以下局限：

1. **计算复杂度**：GP 的推断复杂度为 \(O(n^3)\)，随观测数增长迅速变慢
2. **条件空间处理困难**：GP 假设固定维度的连续空间，难以自然处理条件/层级超参数（如"当 kernel=RBF 时才有 gamma 参数"）
3. **高维性能退化**：GP 在超过 10-20 维时性能显著下降

TPE 的核心创新在于**逆转建模方向**：不建模 \(P(y|x)\)，而是建模 \(P(x|y)\)。

##### 核心机制：从 EI 到密度比

Expected Improvement（EI）的标准定义为：

$$\text{EI}_{y^*}(x) = \int_{-\infty}^{y^*} (y^* - y) \cdot p(y|x) \, dy$$

TPE 利用贝叶斯公式进行变换。定义：

$$p(x|y) = \begin{cases} l(x) & \text{if } y < y^* \\ g(x) & \text{if } y \geq y^* \end{cases}$$

其中 \(y^*\) 是使得 \(P(y < y^*) = \gamma\) 的分位数阈值。通过贝叶斯公式：

$$p(x) = \gamma \cdot l(x) + (1-\gamma) \cdot g(x)$$

将 EI 重写后可以证明：

$$\text{EI}_{y^*}(x) \propto \left(\gamma + (1-\gamma) \frac{g(x)}{l(x)}\right)^{-1}$$

> 💡 关键：最大化 EI 等价于最大化 \(l(x)/g(x)\)。直觉上，我们希望找到在"好的观测"中概率高、在"差的观测"中概率低的超参数配置。

##### 密度估计方法

对于连续超参数，TPE 使用**自适应带宽的 Parzen 窗（核密度估计）**：

$$l(x) = \frac{1}{|D_{\text{good}}|} \sum_{i \in D_{\text{good}}} \mathcal{N}(x; x_i, \sigma_i^2)$$

带宽 \(\sigma_i\) 设置为相邻观测点间距的最大值，确保密度估计平滑且自适应。对于离散/类别超参数，使用加权的类别分布（带有均匀分布的平滑项）。

##### 树结构处理条件空间

"树结构"是 TPE 的关键特性。在超参数空间中，许多参数是条件性的：

```
algorithm_choice: {SVM, RandomForest, MLP}
├── if SVM:
│   ├── kernel: {linear, rbf, poly}
│   │   ├── if rbf: gamma: [1e-5, 1e2]
│   │   └── if poly: degree: {2, 3, 4, 5}
│   └── C: [1e-3, 1e3]
├── if RandomForest:
│   ├── n_estimators: [10, 1000]
│   └── max_depth: [2, 50]
└── if MLP:
    ├── hidden_size: [32, 512]
    └── learning_rate: [1e-5, 1e-1]
```

TPE 按照这种树结构**独立地**对每个超参数进行密度估计，只使用该参数被激活时的观测子集。这使得 TPE 能自然处理任意深度的条件依赖关系，而无需像 GP 那样将条件参数编码为固定维度向量。

##### 与传统方法的区别

| 特性 | GP-BO | SMAC | TPE |
|------|-------|------|-----|
| 代理模型 | \(P(y\|x)\) 高斯过程 | \(P(y\|x)\) 随机森林 | \(P(x\|y)\) 密度估计 |
| 计算复杂度 | \(O(n^3)\) | \(O(n \log n)\) | \(O(n)\) |
| 条件空间 | 需特殊编码 | 天然支持 | 天然支持 |
| 高维表现 | 差（>20维） | 好 | 好 |
| 采集函数优化 | 需数值优化 | 需数值优化 | 从 \(l(x)\) 直接采样 |

> ⚠️ 注意：TPE 的一个局限是各维度的密度估计是独立的（轴对齐），不能直接捕获超参数间的交互作用。后续工作（如 Falkner et al. 2018 的 BOHB）通过多保真度策略缓解了这一问题。

##### 实际影响

TPE 是 **Hyperopt** 库的核心算法，广泛应用于：
- 深度学习超参数调优（学习率、网络架构等）
- AutoML 流水线（CASH 问题：同时选择算法和调参）
- 神经架构搜索的早期工作

其设计思想也影响了后续的 BOHB（Bayesian Optimization + HyperBand）和 Optuna 中的 TPE 变体。

#### 🧪 练习题
```yaml
question: "TPE 算法中，最大化 Expected Improvement 等价于最大化什么？"
options:
  - "高斯过程后验均值"
  - "密度比 l(x)/g(x)，即好观测密度与差观测密度之比"
  - "目标函数的梯度"
  - "观测点之间的欧氏距离"
answer: 1
explain: "TPE 通过贝叶斯公式将 EI 转化为密度比形式，最大化 EI 等价于找到在好观测分布 l(x) 中概率高、在差观测分布 g(x) 中概率低的点。"
```

### Random Search

```yaml
id: random_search
num: 3
name: Random Search
full_name: 随机搜索 (Random Search for Hyper-Parameter Optimization)
year: '2012'
org: University of Montreal
parent: —
paper_url: https://www.jmlr.org/papers/v13/bergstra12a.html
project_url: ''
category: hpo
motivation: 证明随机搜索优于网格搜索
```

#### 📝 一句话总结
Random Search 通过理论与实验证明：当超参数空间具有**低有效维度**（即只有少数超参数真正影响模型性能）时，随机搜索比网格搜索以指数级更少的试验次数找到同等或更优的超参数配置，是超参数优化的强基线方法。

#### 🎯 核心要点
- **核心论点**：超参数优化问题通常具有低有效维度，网格搜索在不重要维度上浪费大量试验
- **Figure 1 直觉**：在 2D 空间中，\(3 \times 3\) 网格仅在每个维度上采样 3 个不同值；而 9 个随机点在每个维度的投影上产生 9 个不同值
- **GP 分析**：用高斯过程回归拟合验证集性能函数 \(Y\)，通过各维度长度尺度参数量化有效维度，证实不同数据集的重要超参数各不相同
- **实验验证**：在 8 个数据集上，仅 8 次随机试验即超越 Larochelle et al. (2007) 的网格搜索；32 次试验在扩展搜索空间中一致优于网格
- **DBN 实验**：在 32 维超参数空间中，随机搜索在 7 个数据集中的 5 个上达到或超越人工调参+网格搜索的最优结果
- **Quasi-Monte Carlo 对比**：低差异序列（Sobol、Halton 等）在低维问题中略优于纯随机，但在高维实际问题中无显著优势
- **实践建议**：随机搜索是自适应超参数优化算法的自然基线，推荐替代网格搜索作为默认策略

#### 🔬 深入细节
![Grid Search vs Random Search](https://www.jmlr.org/papers/volume13/bergstra12a/bergstra12a.pdf)
*图：论文 Figure 1 —— 左侧为网格搜索（Grid Layout），右侧为随机搜索（Random Layout）。绿色曲线表示目标函数仅依赖于一个维度（低有效维度）。网格的 9 个点在重要维度上仅覆盖 3 个不同值，而随机的 9 个点覆盖 9 个不同值，因此更有可能找到最优区域。*

```python
# Random Search 超参数优化伪代码
import numpy as np

def random_search(objective_fn, param_distributions, n_trials=32, seed=42):
    """
    Random Search for Hyperparameter Optimization (Bergstra & Bengio, 2012)
    
    Args:
        objective_fn: 评估函数 f(params) -> validation_score
        param_distributions: dict, 每个超参数的采样分布
            e.g. {"lr": ("log_uniform", 1e-5, 1.0),
                   "hidden_units": ("log_uniform_int", 128, 4000),
                   "dropout": ("uniform", 0.0, 0.5)}
        n_trials: 随机试验次数 (论文建议 ≥ 32)
        seed: 随机种子
    Returns:
        best_params, best_score
    """
    rng = np.random.RandomState(seed)
    best_score = -np.inf
    best_params = None
    
    for trial in range(n_trials):
        # 从各维度独立采样 —— 关键：每个维度独立随机
        params = {}
        for name, (dist_type, low, high) in param_distributions.items():
            if dist_type == "log_uniform":
                params[name] = np.exp(rng.uniform(np.log(low), np.log(high)))
            elif dist_type == "uniform":
                params[name] = rng.uniform(low, high)
            elif dist_type == "log_uniform_int":
                params[name] = int(np.exp(rng.uniform(np.log(low), np.log(high))))
        
        # 评估当前配置（训练模型 + 验证集评估）
        score = objective_fn(params)
        
        if score > best_score:
            best_score = score
            best_params = params
    
    return best_params, best_score
```

**动机与背景：网格搜索的根本缺陷**

在深度学习和机器学习实践中，超参数优化长期依赖网格搜索（Grid Search）。网格搜索在每个超参数维度上选取若干离散值，然后评估所有组合。其根本问题在于：当搜索空间为 \(d\) 维、每维取 \(n\) 个值时，总试验数为 \(n^d\)，呈指数增长。更关键的是，如果目标函数 \(Y(\boldsymbol{\lambda})\) 实际上只依赖于 \(d\) 维中的 \(d_{\text{eff}} \ll d\) 个维度（即具有**低有效维度**），那么网格搜索在不重要维度上的所有变化都是浪费——每个重要维度上实际只有 \(n\) 个不同的采样点，而非 \(n^d\) 个。

> 💡 关键：对于具有低有效维度的函数，\(N\) 次网格搜索在重要维度上仅提供 \(N^{1/d}\) 个不同值，而 \(N\) 次随机搜索在每个维度上提供 \(N\) 个不同值。

**核心机制：为什么随机搜索更优**

设超参数空间为 \(\Lambda = \Lambda_1 \times \Lambda_2 \times \cdots \times \Lambda_d\)，目标函数为验证集损失 \(Y: \Lambda \to \mathbb{R}\)。假设 \(Y\) 仅依赖于前 \(d_{\text{eff}}\) 个维度（低有效维度假设）：

$$Y(\lambda_1, \lambda_2, \ldots, \lambda_d) \approx g(\lambda_1, \ldots, \lambda_{d_{\text{eff}}})$$

对于网格搜索，\(N = n^d\) 个试验在每个维度上仅有 \(n = N^{1/d}\) 个不同值。在有效子空间的投影中，只有 \(n^{d_{\text{eff}}} = N^{d_{\text{eff}}/d}\) 个不同的函数值被评估。

而随机搜索的 \(N\) 个试验在有效子空间的投影中（以概率 1）产生 \(N\) 个不同的点。当 \(d_{\text{eff}} / d\) 较小时，随机搜索的覆盖效率远超网格搜索。

> ⚠️ 注意：这一优势不依赖于事先知道哪些维度是重要的——随机搜索在**任意**子空间投影上都保持良好覆盖。

**GP 分析量化有效维度**

论文使用高斯过程（GP）回归拟合函数 \(Y\)，采用各向异性平方指数核（ARD 核）：

$$k(\boldsymbol{\lambda}, \boldsymbol{\lambda}') = \sigma^2 \exp\left(-\sum_{i=1}^{d} \frac{(\lambda_i - \lambda_i')^2}{2 \ell_i^2}\right)$$

其中 \(\ell_i\) 为第 \(i\) 个超参数的**长度尺度**（length scale）。若 \(\ell_i\) 很大，说明 \(Y\) 对第 \(i\) 维不敏感（该维度不重要）；若 \(\ell_i\) 很小，说明 \(Y\) 在该维度变化剧烈（重要维度）。

实验结果表明：
- 不同数据集的重要超参数**各不相同**（如 mnist_basic 对学习率敏感，而 mnist_rotated 对网络宽度敏感）
- 大多数超参数在多数数据集上的长度尺度很大，证实了低有效维度假设
- 这解释了为什么固定的网格设计无法适应不同问题——预先不知道哪些维度重要

**与传统方法的对比及实践意义**

| 方法 | 试验数 | 有效覆盖 | 适应性 |
|------|--------|----------|--------|
| Grid Search | \(n^d\) | 每维 \(n\) 个值 | 需预知重要维度 |
| Random Search | \(N\) | 每维 \(N\) 个值 | 自动适应任意有效子空间 |
| Quasi-MC (Sobol) | \(N\) | 略优于随机（低维） | 低维有效，高维退化为随机 |

论文在 Section 5 中进一步展示，在 DBN 的 32 维超参数空间中（包括每层隐藏单元数、学习率、预训练迭代次数、权重初始化方式等），随机搜索仅用数百次试验就匹配了人工专家经过数周调参的结果。在 7 个基准数据集中的 5 个上，随机搜索达到或超越了 Larochelle et al. (2007) 精心设计的网格搜索+手动调优的最佳结果。

论文最终指出，随机搜索应作为所有自适应超参数优化算法（如贝叶斯优化、TPE、SMAC 等）的**自然基线**——任何声称优于随机搜索的方法都必须在公平条件下证明其优势。这一观点深刻影响了后续 AutoML 研究的实验设计范式。

#### 🧪 练习题
```yaml
question: "随机搜索优于网格搜索的根本原因是什么？"
options:
  - "随机搜索的计算开销更低"
  - "超参数空间通常具有低有效维度，随机搜索在重要维度上覆盖更多不同值"
  - "随机搜索使用了更先进的优化算法"
  - "网格搜索无法处理连续型超参数"
answer: 1
explain: "当目标函数仅依赖少数维度时，N次网格搜索在每个维度仅有N^(1/d)个不同值，而N次随机搜索在每个维度有N个不同值，覆盖效率呈指数级优势。"
```

### Auto-WEKA

```yaml
id: auto_weka
num: 4
name: Auto-WEKA
full_name: '自动WEKA (Auto-WEKA: Combined Selection and HPO)'
year: '2013'
org: University of British Columbia
parent: smac
paper_url: https://arxiv.org/abs/1208.3719
project_url: ''
category: framework
motivation: 首次统一算法选择与HPO为CASH问题
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

### DFS

```yaml
id: dfs
num: 5
name: DFS
full_name: 深度特征合成 (Deep Feature Synthesis)
year: '2015'
org: MIT
parent: —
paper_url: https://www.mit.edu/~kalyan/papers/dfs.pdf
project_url: ''
category: auto_feature
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

### Auto-sklearn

```yaml
id: auto_sklearn
num: 6
name: Auto-sklearn
full_name: '自动Sklearn (Auto-sklearn: Efficient and Robust AutoML)'
year: '2015'
org: University of Freiburg
parent: auto_weka
paper_url: https://papers.nips.cc/paper/2015/hash/11d0e6287202fced83f79975ec59a3a6-Abstract.html
project_url: ''
category: framework
motivation: 元学习热启动+自动集成构建
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

### PBT

```yaml
id: pbt
num: 7
name: PBT
full_name: 基于种群的训练 (Population Based Training)
year: '2017'
org: DeepMind
parent: —
paper_url: https://arxiv.org/abs/1711.09846
project_url: ''
category: hpo
motivation: 训练中动态在线进化超参
```

#### 📝 一句话总结
PBT 提出了一种将**种群进化**与**梯度优化**相结合的在线超参数调优框架：在并行训练的种群中，表现差的成员复制（exploit）优秀成员的权重，并扰动（explore）其超参数继续训练，从而在**单次训练过程中**自动发现超参数的动态调度策略，无需额外计算开销。

#### 🎯 核心要点
- **种群并行训练**：N 个模型（worker）异步并行训练，共享全局性能信息，无需集中式同步
- **Exploit 机制**：表现差的 worker 复制表现好的 worker 的权重和超参数（截断选择 / T-test 选择）
- **Explore 机制**：复制后对超参数进行随机扰动（×1.2 或 ×0.8）或从先验分布重采样
- **在线超参调度发现**：自动发现学习率衰减等非平凡的超参数 schedule，而非仅找到固定最优值
- **热启动 + 无额外开销**：利用训练中间状态（warm-start），总计算量与普通并行搜索相同
- **广泛适用性**：在深度 RL（DM Lab / Atari / StarCraft II）、机器翻译（Transformer）、GAN 训练五大领域均取得显著提升

#### 🔬 深入细节
##### 核心框架图

![PBT 框架示意图](https://ar5iv.labs.arxiv.org/html/1711.09846v1/assets/x1.png)
*图：PBT 与传统方法对比。左：序列优化（逐个尝试超参）；中：并行搜索（同时训练多组固定超参）；右：PBT（并行训练 + 在线进化超参，种群成员之间可交换信息）。*

##### 算法伪代码

```python
# Algorithm 1: Population Based Training (PBT)
def PBT_Train(population P):
    # P 中每个成员 = (θ, h, p, t)
    #   θ: 模型权重, h: 超参数, p: 当前性能, t: 训练步数
    
    for (θ, h, p, t) in P:  # 异步并行
        while not end_of_training:
            θ ← step(θ | h)          # 用超参 h 做一步梯度更新
            p ← eval(θ)              # 评估当前模型性能
            
            if ready(p, t, P):        # 是否达到 exploit/explore 条件
                h', θ' ← exploit(h, θ, p, P)  # 利用种群找更好解
                if θ != θ':           # 如果发生了替换
                    h, θ ← explore(h', θ', P)  # 扰动超参数
                    p ← eval(θ)       # 重新评估
            
            update P with (θ, h, p, t+1)
    
    return θ with highest p in P
```

##### 方法细节

**动机与背景**

神经网络训练高度依赖超参数（学习率、正则化强度、损失权重等）的选择。传统方法面临两难困境：

- **序列优化**（如手动调参、贝叶斯优化）：每次完整训练后才能评估一组超参数，计算代价极高
- **并行搜索**（如随机搜索、网格搜索）：同时训练多组固定超参数，但各 worker 之间完全独立，无法利用训练中间信息

更关键的是，最优超参数往往**随训练阶段变化**（例如学习率需要先大后小），但传统方法通常假设超参数固定或预定义简单 schedule，无法自适应发现最优调度策略。

> 💡 **关键洞察**：PBT 的核心思想是——既然我们已经在并行训练多个模型，为什么不让它们在训练过程中互相"学习"？表现好的模型可以将自己的经验（权重 + 超参数）传递给表现差的模型，后者在此基础上继续探索。

**核心机制详解**

PBT 将每个训练过程视为种群中的一个成员，每个成员包含四元组 \((θ, h, p, t)\)：模型权重、超参数、当前性能评分、训练步数。整个框架围绕四个核心操作展开：

**1. Step — 梯度更新**

每个 worker 独立执行标准的梯度下降步骤：

$$\theta \leftarrow \mathtt{step}(\theta \mid h)$$

其中 \(h\) 包含学习率、entropy cost、辅助损失权重等超参数。多步 step 链式组合形成完整的优化过程：

$$\theta^{*} = \mathtt{step}(\mathtt{step}(\ldots\mathtt{step}(\theta \mid h_1)\ldots \mid h_{T-1}) \mid h_T)$$

**2. Eval — 性能评估**

定期评估当前模型性能 \(p \leftarrow \mathtt{eval}(\theta)\)。评估函数不需要可微，也不需要与训练损失函数相同（但应相关）。例如在 RL 中使用最近 10 个 episode 的平均回报，在机器翻译中使用 BLEU 分数。

**3. Exploit — 利用种群信息**

当一个 worker 被判定为"ready"（例如已训练足够步数）时，触发 exploit 操作。论文提出两种策略：

- **截断选择（Truncation Selection）**：将种群按性能排序，底部 20% 的 worker 从顶部 20% 中随机选一个，复制其权重和超参数
- **T-test 选择**：随机采样另一个 worker，用 Welch's t-test 比较两者最近的性能，若对方显著更优则复制

> ⚠️ **注意**：exploit 不仅复制超参数，还复制模型权重 \(\theta\)。这是 PBT 区别于纯超参数搜索的关键——它实现了**模型选择**（model selection）与**超参数优化**的统一。

**4. Explore — 探索新超参数**

exploit 之后立即执行 explore，在复制得到的超参数基础上产生变异：

- **扰动（Perturb）**：每个超参数独立地乘以 1.2 或 0.8（随机选择）
- **重采样（Resample）**：以一定概率从原始先验分布中重新采样

这种设计使得种群能够持续探索超参数空间，避免所有 worker 收敛到同一组超参数。

**与传统方法的关键区别**

| 特性 | 序列优化 | 并行搜索 | PBT |
|------|---------|---------|-----|
| 计算效率 | 低（串行） | 中（并行但独立） | 高（并行 + 信息共享） |
| 超参数 schedule | 需预定义 | 固定 | **自动发现** |
| 热启动 | 无 | 无 | **有**（exploit 复制权重） |
| 同步要求 | — | 无 | **无**（完全异步） |
| 模型选择 | 训练后 | 训练后 | **训练中在线进行** |

**实验验证**

PBT 在五大领域均超越了使用相同计算资源的随机搜索基线：

- **DM Lab**（UNREAL, 40 workers）：人类归一化性能从 93% 提升至 **106%**
- **Atari**（Feudal Networks, 80 workers）：在 Amidar、Gravitar 等游戏上显著提升
- **StarCraft II**（A3C, 30 workers）：6 个小游戏关卡上全面提升
- **机器翻译**（Transformer, 32 workers）：WMT 2014 En-De 任务 BLEU 分数提升
- **GAN 训练**（45 workers）：Inception Score 提升，训练更稳定

消融实验的关键发现：
1. **种群规模**：≥20 即可获得稳定提升，更大种群收益递减
2. **Exploit + Explore 缺一不可**：仅复制权重或仅调超参数效果均不如两者结合
3. **动态 schedule > 固定最优超参**：用 PBT 最终发现的超参数从头训练，效果不如 PBT 的在线自适应调度，证明了**超参数 schedule 的价值**

#### 🧪 练习题
```yaml
question: "PBT 中 exploit 操作的核心作用是什么？"
options:
  - "对当前模型的超参数进行随机扰动以增加多样性"
  - "将表现差的 worker 的权重和超参数替换为表现好的 worker 的"
  - "在所有 worker 之间同步梯度以加速收敛"
  - "使用贝叶斯优化选择下一组要尝试的超参数"
answer: 1
explain: "exploit 的作用是让表现差的 worker 复制表现好的 worker 的权重和超参数，实现种群内的模型选择。随机扰动是 explore 的功能，PBT 不需要同步也不使用贝叶斯优化。"
```

### NAS-RL

```yaml
id: nas_rl
num: 8
name: NAS-RL
full_name: 强化学习神经架构搜索 (Neural Architecture Search with RL)
year: '2017'
org: Google Brain
parent: —
paper_url: https://arxiv.org/abs/1611.01578
project_url: ''
category: nas
motivation: RNN控制器+REINFORCE生成架构
```

#### 📝 一句话总结
NAS-RL 的核心目标是：RNN控制器+REINFORCE生成架构。

#### 🎯 核心要点
- 核心动机：RNN控制器+REINFORCE生成架构
- 代表机构：Google Brain

#### 🔬 深入细节
RNN控制器+REINFORCE生成架构


### Hyperband

```yaml
id: hyperband
num: 9
name: Hyperband
full_name: '超级带 (Hyperband: A Novel Bandit-Based Approach)'
year: '2018'
org: UC Berkeley
parent: random_search
paper_url: https://www.jmlr.org/papers/v18/16-065.html
project_url: ''
category: hpo
motivation: 多臂赌博机+逐次减半加速评估
```

#### 📝 一句话总结
Hyperband 将超参数优化问题转化为资源分配问题，通过在不同"探索-利用"权衡下多次运行 Successive Halving（逐次减半）算法，自适应地在配置数量与单配置资源之间取得最优平衡，实现了比随机搜索和贝叶斯优化更快数十倍的超参数搜索速度。

#### 🎯 核心要点
- 将超参数优化建模为非随机最优臂识别（non-stochastic best-arm identification）问题
- 提出 Successive Halving (SH) 作为核心子程序：均匀分配资源后逐轮淘汰表现最差的 \(1/\eta\) 配置
- Hyperband 通过多个 bracket（\(s_{\max}+1\) 个）并行运行 SH，每个 bracket 使用不同的初始配置数 \(n\) 和初始资源 \(r\)
- 两个关键输入参数：\(R\)（单配置最大资源）和 \(\eta\)（淘汰比例，默认 3）
- 总预算控制：每个 bracket 的总资源消耗约为 \(B = (s_{\max}+1) \cdot R\)
- 理论保证：在特定假设下，Hyperband 的简单随机搜索回退保证不超过随机搜索的 \(5\times\) 开销
- 无需对目标函数做任何假设（无模型方法），适用于任意黑盒优化
- 实验覆盖：神经网络超参数调优、核方法参数选择、特征选择等多个场景

#### 🔬 深入细节
##### 核心框架图

![Hyperband 配置选择与评估对比](https://ar5iv.labs.arxiv.org/html/1603.06560/assets/x1.png)
*图 1(a)：Configuration Selection —— 传统方法（如贝叶斯优化）自适应选择配置 vs. Hyperband 随机采样大量配置*

![Hyperband 配置评估策略](https://ar5iv.labs.arxiv.org/html/1603.06560/assets/x2.png)
*图 1(b)：Configuration Evaluation —— 传统方法为每个配置分配等量资源 vs. Hyperband 通过 early-stopping 自适应分配资源*

![Hyperband 各 bracket 性能对比](https://ar5iv.labs.arxiv.org/html/1603.06560/assets/x4.png)
*图 3：不同 bracket 的性能表现及 Hyperband 的包络线效果*

##### 算法伪代码

```python
# Successive Halving (SH) 子程序
def successive_halving(n, r, s, eta, get_hyperparameter_configuration, run_then_return_val_loss):
    """
    n: 初始配置数
    r: 每个配置的初始资源量
    s: 淘汰轮数
    eta: 淘汰比例 (默认=3)
    """
    T = get_hyperparameter_configuration(n)  # 随机采样 n 个配置
    for i in range(0, s + 1):
        n_i = int(n * eta**(-i))          # 当前存活配置数
        r_i = r * eta**i                   # 当前每个配置分配的资源
        L = [run_then_return_val_loss(t, r_i) for t in T]  # 训练并评估
        T = top_k(T, L, int(n_i / eta))   # 保留表现最好的 1/eta
    return best(T)

# Hyperband 主算法
def hyperband(R, eta):
    """
    R: 单配置最大资源 (如最大 epoch 数)
    eta: 淘汰比例 (默认=3)
    """
    s_max = int(log(R) / log(eta))  # 最大 bracket 编号
    B = (s_max + 1) * R             # 每个 bracket 的总预算

    for s in range(s_max, -1, -1):  # 从最激进到最保守
        n = int(ceil(B / R * eta**s / (s + 1)))  # 初始配置数
        r = R * eta**(-s)                         # 初始资源
        # 运行 Successive Halving，共 s 轮淘汰
        successive_halving(n, r, s, eta)
```

##### 动机与背景

**问题定义**：超参数优化的核心挑战在于评估单个配置的代价极高（如训练一个深度神经网络需要数小时甚至数天）。传统方法面临两难困境：

1. **配置选择（Configuration Selection）**：贝叶斯优化等方法通过建模目标函数来智能选择下一个要评估的配置，但每次评估都需要完整训练，开销巨大。
2. **配置评估（Configuration Evaluation）**：如何在不完整训练的情况下判断一个配置的优劣？

> 💡 关键洞察：Hyperband 认为"选择哪些配置"不如"如何分配有限资源给配置"重要。与其花大量计算建模目标函数，不如随机采样大量配置，然后通过 early-stopping 快速淘汰差的配置。

##### 核心机制：Successive Halving (SH)

Successive Halving 是 Hyperband 的基础构建块。其思想极为简洁：

1. 均匀采样 \(n\) 个配置
2. 为每个配置分配 \(r\) 单位资源进行训练
3. 保留表现最好的 \(\lfloor n/\eta \rfloor\) 个配置
4. 将资源翻 \(\eta\) 倍，重复步骤 2-3，直到剩余 1 个配置

SH 的核心权衡（\(n\) vs. \(B/n\) 问题）：
- 给定总预算 \(B\)，选择大的 \(n\) 意味着探索更多配置但每个配置分到的资源少（可能误杀"大器晚成"的配置）
- 选择小的 \(n\) 意味着每个配置获得充足资源但探索范围有限

$$B = n \cdot r \cdot \sum_{i=0}^{s} \eta^{-i} \approx n \cdot r \cdot \frac{\eta}{\eta - 1}$$

##### 核心机制：Hyperband 的多 Bracket 策略

Hyperband 的关键创新在于**同时运行多个不同 \(n\) 值的 SH 实例**，称为不同的 "bracket"：

| bracket \(s\) | 初始配置数 \(n\) | 初始资源 \(r\) | 淘汰轮数 |
|:---:|:---:|:---:|:---:|
| \(s_{\max}\) (激进) | 最多 | 最少 | 最多轮 |
| ... | ... | ... | ... |
| 0 (保守) | 最少 | \(R\) | 0 轮（即随机搜索） |

以 \(R=81, \eta=3\) 为例（论文 Table 1）：

| \(s\) | \(n\) | \(r\) | 淘汰轮数 |
|:---:|:---:|:---:|:---:|
| 4 | 81 | 1 | 4 |
| 3 | 27 | 3 | 3 |
| 2 | 9 | 9 | 2 |
| 1 | 6 | 27 | 1 |
| 0 | 5 | 81 | 0 |

> ⚠️ 注意：bracket \(s=0\) 等价于对 5 个配置各分配完整资源 \(R=81\) 的随机搜索，这为 Hyperband 提供了理论下界保证。

##### 与传统方法的区别

| 维度 | 贝叶斯优化 (BO) | Random Search | Hyperband |
|:---|:---|:---|:---|
| 配置选择 | 自适应（建模） | 随机 | 随机 |
| 资源分配 | 均匀（完整训练） | 均匀（完整训练） | 自适应（early-stop） |
| 计算开销 | 高（GP 拟合） | 低 | 低 |
| 理论假设 | 需要先验/核函数 | 无 | 无 |
| 加速比 | 1-10× vs RS | 基准 | 5-70× vs RS |
| 并行性 | 困难 | 天然并行 | 天然并行 |

**核心优势**：
1. **无模型**：不需要对目标函数做任何假设，避免了贝叶斯优化中先验选择不当导致的性能退化
2. **理论保证**：最坏情况下不超过随机搜索的常数倍开销
3. **天然并行**：每个 bracket 内的配置评估完全独立，易于分布式部署
4. **自适应加速**：当存在大量"明显差"的配置时，early-stopping 可节省巨量计算

##### 理论性质

Hyperband 的理论分析基于以下关键假设：存在一个从中间验证损失到最终损失的映射关系。在此假设下：

$$\text{Hyperband 总预算} \leq 5 \cdot s_{\max} \cdot \text{Random Search 等效预算}$$

其中 \(s_{\max} = \lfloor \log_\eta R \rfloor\)，对于典型设置（\(R=81, \eta=3\)）仅为 4，因此 Hyperband 的额外开销极小。

#### 🧪 练习题
```yaml
question: "Hyperband 中设置多个 bracket 的主要目的是什么？"
options:
  - "减少每个 bracket 的计算开销"
  - "对冲 Successive Halving 中初始配置数 n 选择的不确定性"
  - "使算法能够利用贝叶斯先验信息"
  - "确保每个配置都能获得最大资源 R 的训练"
answer: 1
explain: "不同 bracket 使用不同的 n 值（从激进到保守），覆盖了从'多配置少资源'到'少配置多资源'的所有权衡点，从而无需事先知道最优的 n 值。"
```

### NASNet

```yaml
id: nasnet
num: 10
name: NASNet
full_name: NAS网络 (Learning Transferable Architectures)
year: '2018'
org: Google Brain
parent: nas_rl
paper_url: https://arxiv.org/abs/1707.07012
project_url: ''
category: nas
motivation: 搜索可迁移Cell模块降低成本
```

#### 📝 一句话总结
NASNet 提出在小型代理任务（CIFAR-10）上搜索可堆叠的 Cell 结构（Normal Cell + Reduction Cell），并将搜索到的 Cell 直接迁移到大规模 ImageNet 任务上，在将搜索成本降低 7 倍的同时取得了当时 ImageNet 分类和 COCO 检测的最优性能。

#### 🎯 核心要点
- **可迁移搜索空间设计**：搜索目标从"整个网络架构"缩减为"可堆叠的 Cell 模块"，实现跨数据集迁移
- **双 Cell 结构**：Normal Cell（保持空间分辨率）+ Reduction Cell（步长 2，空间减半），交替堆叠构成完整网络
- **Block 级搜索空间**：每个 Cell 由 B=5 个 Block 组成，每个 Block 通过 5 步决策（选 2 个隐状态、选 2 个操作、选 1 个合并方式）构建
- **13 种候选操作**：包含 identity、各种尺寸的深度可分离卷积、空洞卷积、平均/最大池化等
- **RNN 控制器 + PPO 训练**：使用 LSTM 控制器生成架构描述，以验证集准确率为奖励，通过 PPO 优化
- **ScheduledDropPath 正则化**：训练过程中线性增加路径丢弃概率，优于固定 DropPath 和标准 Dropout
- **搜索效率**：500 GPU × 4 天 ≈ 2000 GPU-hours，比原始 NAS 快 7 倍
- **SOTA 结果**：CIFAR-10 2.4% 错误率、ImageNet 82.7% top-1、COCO 43.1% mAP

#### 🔬 深入细节
![NASNet 整体架构与 Cell 搜索空间](https://production-media.paperswithcode.com/methods/nasnet_cell.png)
*图：NASNet 的可堆叠 Cell 架构（左）与 Cell 内部搜索空间的 Block 结构（右）。Normal Cell 保持特征图尺寸，Reduction Cell 将空间维度减半。整个网络通过重复堆叠 N 个 Normal Cell 并在适当位置插入 Reduction Cell 构建。*

##### 算法伪代码

```python
# NASNet 架构搜索流程
# 控制器: LSTM RNN, 优化器: PPO

for iteration in range(max_iterations):
    # Step 1: 控制器采样架构
    for block_i in range(B):  # B=5 blocks per cell
        h1 = controller.predict_hidden_state()   # 从已有隐状态中选择
        h2 = controller.predict_hidden_state()   # 选第二个隐状态
        op1 = controller.predict_operation()     # 13种候选操作之一
        op2 = controller.predict_operation()     # 13种候选操作之一
        combine = controller.predict_combine()   # add 或 concat
    
    # Step 2: 构建子网络并在 CIFAR-10 上训练
    child_net = build_network(normal_cell, reduction_cell, N=6, filters=32)
    accuracy = train_and_evaluate(child_net, cifar10, epochs=50)
    
    # Step 3: 用验证准确率作为奖励更新控制器
    reward = accuracy
    controller.update_with_ppo(reward)

# 最终: 将搜索到的最佳 Cell 迁移到 ImageNet
# 通过增大 N (堆叠次数) 和初始滤波器数量来扩展模型
imagenet_model = build_network(best_normal_cell, best_reduction_cell, N=6, filters=4032)
```

##### 动机与背景

神经架构搜索（NAS）的核心问题是**搜索成本过高**。原始 NAS 直接在目标数据集上搜索完整网络架构，在 CIFAR-10 上需要 22,400 GPU-hours（800 GPU × 28 天），在 ImageNet 上则完全不可行。

NASNet 的关键洞察是：**优秀的局部结构（Cell）具有跨任务迁移性**。类比人工设计的网络（如 ResNet 的残差块、Inception 的多尺度模块），这些基本构建单元在不同规模的任务上都有效。因此，只需在小数据集上搜索最优 Cell，再通过调整堆叠次数和通道数迁移到大数据集。

##### 核心机制：可迁移的 Cell 搜索空间

**1. 网络宏观结构（固定）**

整个网络的宏观布局是预先确定的：

$$\text{Network} = \underbrace{\text{NCell} \times N}_{\text{第1组}} \to \text{RCell} \to \underbrace{\text{NCell} \times N}_{\text{第2组}} \to \text{RCell} \to \underbrace{\text{NCell} \times N}_{\text{第3组}} \to \text{Softmax}$$

其中 NCell 为 Normal Cell，RCell 为 Reduction Cell，\(N\) 为每组中 Cell 的重复次数。搜索时 \(N=6\)，迁移到 ImageNet 时可增大 \(N\) 以提升容量。

> 💡 关键：宏观结构固定使得搜索空间大幅缩减——控制器只需学习 Cell 内部的微观连接方式。

**2. Cell 内部搜索空间（Block 结构）**

每个 Cell 接收前两层的输出 \(h_{i-1}\) 和 \(h_{i-2}\) 作为初始隐状态集合。Cell 由 \(B=5\) 个 Block 构成，每个 Block 的构建过程如下：

- **Step 1**：从现有隐状态集合中选择 \(h_a\)
- **Step 2**：从现有隐状态集合中选择 \(h_b\)
- **Step 3**：为 \(h_a\) 选择一个操作 \(o_a\)
- **Step 4**：为 \(h_b\) 选择一个操作 \(o_b\)
- **Step 5**：选择合并方法（element-wise addition 或 concatenation）

最终输出为：\(\text{output} = \text{combine}(o_a(h_a),\; o_b(h_b))\)

每个 Block 的输出被加入隐状态集合，供后续 Block 选择。Cell 的最终输出是所有**未被任何 Block 选为输入**的隐状态的 concatenation。

**3. 13 种候选操作**

| 类别 | 操作 |
|------|------|
| 恒等 | identity |
| 卷积 | 1×1 conv, 3×3 conv, 1×3 then 3×1 conv, 1×7 then 7×1 conv |
| 深度可分离卷积 | 3×3, 5×5, 7×7 depthwise-separable conv |
| 空洞卷积 | 3×3 dilated conv |
| 池化 | 3×3 avg pool, 3×3 max pool, 5×5 max pool, 7×7 max pool |

> ⚠️ 注意：Normal Cell 中所有操作步长为 1；Reduction Cell 中对来自 \(h_{i-1}\) 或 \(h_{i-2}\) 的输入使用步长 2，实现空间下采样。

**4. 搜索空间规模**

每个 Block 有 5 个离散决策，Cell 有 5 个 Block，搜索 Normal + Reduction 两种 Cell：

$$|\mathcal{S}| \approx (|\text{hidden states}| \times |\text{ops}| \times |\text{combine}|)^{2 \times B} \sim 10^{28}$$

##### 控制器与训练流程

控制器是一个**单层 LSTM**，每个时间步输出一个 softmax 分类器来做出一个离散决策。对于两种 Cell（Normal + Reduction），控制器共输出 \(2 \times 5 \times 5 = 50\) 个决策 token。

训练采用 **Proximal Policy Optimization (PPO)**，奖励信号为子网络在 CIFAR-10 验证集上的准确率。相比原始 NAS 使用的 REINFORCE，PPO 提供了更稳定的策略更新。

搜索配置：
- 代理任务：CIFAR-10，子网络训练 50 epochs
- 控制器训练：500 个子网络并行评估
- 硬件：500 P100 GPU，4 天完成搜索
- 总计算量：~2000 GPU-hours（原始 NAS 的 1/7）

##### ScheduledDropPath 正则化

NASNet 发现标准的 Dropout 对 Cell 结构效果有限，提出了 **ScheduledDropPath**：

$$p_{\text{drop}}^{(t)} = p_{\max} \cdot \frac{t}{T}$$

其中 \(t\) 为当前训练步，\(T\) 为总训练步数，\(p_{\max}\) 为最终丢弃概率。训练初期路径丢弃概率接近 0（允许充分学习），后期逐渐增大（增强正则化）。

对比实验表明：
- 无 DropPath：3.03% 错误率
- 固定 DropPath（\(p=0.6\)）：2.97%
- **ScheduledDropPath**（\(p_{\max}=0.6\)）：**2.40%**

> 💡 关键：ScheduledDropPath 的设计直觉是——训练初期网络需要所有路径来学习有效表示，后期逐步丢弃路径迫使网络学习更鲁棒的特征。

##### 实验结果与对比

**CIFAR-10**：NASNet-A + cutout 达到 2.40% 错误率（3.3M 参数），超越所有手工设计架构和同期 NAS 方法。

**ImageNet 分类**（单模型，单裁剪）：

| 模型 | 分辨率 | 参数量 | Mult-Adds | Top-1 | Top-5 |
|------|--------|--------|-----------|-------|-------|
| Inception-ResNet-v2 | 299×299 | 55.8M | 13.2B | 80.1% | 95.1% |
| NASNet-A (7@1920) | 299×299 | 22.6M | 4.93B | 80.8% | 95.3% |
| SENet | 320×320 | 145.8M | 42.3B | 82.7% | 96.2% |
| **NASNet-A (6@4032)** | **331×331** | **88.9M** | **23.8B** | **82.7%** | **96.2%** |

NASNet-A 在达到相同 82.7% top-1 的同时，计算量仅为 SENet 的 56%（23.8B vs 42.3B）。

**移动端**：NASNet-A (4@1056) 以 5.3M 参数、564M Mult-Adds 达到 74.0% top-1，超越 MobileNet (70.6%) 和 ShuffleNet (70.9%)。

**COCO 目标检测**：以 NASNet-A 作为 Faster-RCNN 的 backbone，在 test-dev 上达到 43.1% mAP，超越此前最佳 4.0%。

##### 与传统方法的区别

| 维度 | 原始 NAS (2017) | NASNet (2018) |
|------|----------------|---------------|
| 搜索目标 | 完整网络架构 | 可堆叠的 Cell 模块 |
| 搜索数据集 | 目标数据集本身 | 小型代理数据集 (CIFAR-10) |
| 可迁移性 | 无（每个任务重新搜索） | 强（Cell 直接迁移到 ImageNet） |
| 搜索成本 | 22,400 GPU-hours | 2,000 GPU-hours（7× 加速） |
| 可扩展性 | 固定网络大小 | 通过 N 和滤波器数灵活缩放 |
| 优化算法 | REINFORCE | PPO（更稳定） |

NASNet 的核心贡献不仅是找到了更好的架构，更重要的是建立了 **"搜索 Cell → 堆叠迁移"** 的范式，这一思想被后续的 ENAS、DARTS、ProxylessNAS 等工作广泛采用。

#### 🧪 练习题
```yaml
question: "NASNet 相比原始 NAS 能将搜索成本降低 7 倍的最关键设计是什么？"
options:
  - "使用 PPO 替代 REINFORCE 作为控制器优化算法"
  - "将搜索目标从完整网络缩减为可迁移的 Cell 模块，在小数据集上搜索后迁移"
  - "将候选操作从 20 种减少到 13 种"
  - "使用 ScheduledDropPath 加速子网络训练收敛"
answer: 1
explain: "NASNet 的核心加速来自搜索空间的重新设计：只搜索 Cell 结构而非完整网络，并在小型 CIFAR-10 上完成搜索后迁移到 ImageNet，避免了在大数据集上的昂贵搜索。"
```

### ENAS

```yaml
id: enas
num: 11
name: ENAS
full_name: 高效神经架构搜索 (Efficient NAS via Parameter Sharing)
year: '2018'
org: Google Brain
parent: nas_rl
paper_url: https://arxiv.org/abs/1802.03268
project_url: ''
category: nas
motivation: 权重共享将搜索成本降低1000倍
```

#### 📝 一句话总结
ENAS 提出让所有候选子模型在一个共享的超网络（over-parameterized DAG）中共享权重，通过 LSTM 控制器采样子图并用 REINFORCE 优化架构分布，将神经架构搜索的计算成本从数百 GPU-days 降低到单 GPU 不到 16 小时，同时保持与 NAS 相当的搜索质量。

#### 🎯 核心要点
- **权重共享超网络**：将整个搜索空间表示为一个有向无环图（DAG），所有子架构是该 DAG 的子图，共享对应边上的权重参数
- **LSTM 控制器**：100 隐藏单元的 LSTM，通过 softmax 分类器自回归地采样架构决策（激活函数、连接关系、操作类型）
- **两阶段交替训练**：(1) 固定控制器参数 \(\theta\)，用标准 SGD 在训练集上更新共享权重 \(\omega\)；(2) 固定 \(\omega\)，用 REINFORCE 在验证集上更新 \(\theta\)
- **三种搜索空间**：RNN cell 设计、CNN 宏观层级搜索（macro search）、CNN 微观 cell 搜索（micro search）
- **实验结果**：PTB 语言模型 test perplexity 55.8；CIFAR-10 test error 2.89%；搜索耗时单 GPU < 16 小时（比 NAS 快 1000×）
- **搜索空间规模**：RNN cell 空间 \(\sim 10^{15}\) 种架构，CNN macro 空间 \(\sim 1.6 \times 10^{29}\) 种架构

#### 🔬 深入细节
##### 核心思想：参数共享的搜索空间

![ENAS 搜索空间示意图](https://ar5iv.labs.arxiv.org/html/1802.03268/assets/x1.png)
*图：左侧为完整的共享参数 DAG，右侧的红色子图为控制器采样出的一个子架构。所有子架构共享 DAG 中对应边的权重。*

ENAS 的核心洞察是：NAS 中不同子模型之间存在大量参数重叠，传统 NAS 每次从头训练子模型造成了巨大浪费。ENAS 将整个搜索空间编码为一个**超网络（supergraph）**——一个包含所有可能连接的有向无环图。每个子架构对应该 DAG 的一个子图，其权重直接从超网络中继承，无需重新训练。

> 💡 关键：权重共享使得评估一个子架构的代价从"训练至收敛"降低到"单次前向传播 + 验证集评估"。

##### 控制器设计与采样过程

控制器是一个带有 100 个隐藏单元的 LSTM。对于不同的搜索空间，控制器的采样策略不同：

**RNN Cell 搜索**：给定 \(N\) 个计算节点，控制器依次为节点 \(j\)（\(j = 2, \ldots, N\)）做两个决策：
1. 选择前驱节点索引 \(i < j\)（决定信息来源）
2. 选择激活函数（tanh, ReLU, sigmoid, identity）

**CNN Macro 搜索**：对于第 \(l\) 层，控制器决定：
1. 使用哪种卷积操作（3×3, 5×5, depthwise-separable 等）
2. 与哪些之前的层建立跳跃连接（逐层二分类决策）

**CNN Micro/Cell 搜索**：对于 cell 内的每个节点 \(j\)，控制器采样：
1. 两个输入节点索引
2. 对应两个输入的操作类型（identity, 3×3/5×5 separable conv, 3×3 avg/max pool）

```python
# ENAS 控制器采样伪代码 (RNN Cell)
def sample_rnn_cell(controller_lstm, N_nodes):
    """采样一个 RNN cell 架构"""
    decisions = []
    h = initial_hidden_state
    
    for node_j in range(2, N_nodes + 1):
        # 决策1: 选择前驱节点
        h, logit_prev = controller_lstm(h)
        prev_node = softmax_sample(logit_prev[:node_j])  # 只能选 < j 的节点
        
        # 决策2: 选择激活函数
        h, logit_act = controller_lstm(h)
        activation = softmax_sample(logit_act)  # {tanh, relu, sigmoid, identity}
        
        decisions.append((prev_node, activation))
    
    return decisions  # 定义了完整的 cell 拓扑
```

##### 训练流程

ENAS 采用**两阶段交替优化**：

**阶段一：训练共享权重 \(\omega\)**

固定控制器参数 \(\theta\)，在整个训练集上用 SGD 优化：

$$\omega^* = \arg\min_\omega \mathbb{E}_{m \sim \pi(m;\theta)} \left[ \mathcal{L}(m; \omega) \right]$$

实际操作中，采用蒙特卡洛近似：采样一个架构 \(m\)，计算其在一个 mini-batch 上的梯度 \(\nabla_\omega \mathcal{L}(m; \omega)\)，然后更新 \(\omega\)。

**阶段二：训练控制器 \(\theta\)**

固定共享权重 \(\omega\)，在验证集上用 REINFORCE 优化控制器：

$$\nabla_\theta J(\theta) = \mathbb{E}_{m \sim \pi(m;\theta)} \left[ \nabla_\theta \log P(m;\theta) \cdot (R(m) - b) \right]$$

其中：
- \(R(m)\) 是架构 \(m\) 在验证集上的奖励（如 perplexity 的倒数或准确率）
- \(b\) 是基线（baseline），使用之前奖励的指数移动平均

> ⚠️ 注意：两阶段使用**不同的数据集**——共享权重在训练集上优化，控制器在验证集上优化。这避免了控制器过拟合训练集。

##### 与 NAS 的核心区别

| 维度 | NAS (Zoph & Le, 2017) | ENAS |
|------|----------------------|------|
| 子模型训练 | 每个从头训练至收敛 | 共享权重，无需重新训练 |
| 评估代价 | 数小时/模型 | 单次前向传播 |
| 总搜索时间 | 450 GPU-days (800 GPUs) | < 16 hours (1 GPU) |
| 控制器优化 | REINFORCE | REINFORCE（相同） |
| 搜索质量 | PTB ppl: 62.4 | PTB ppl: 55.8 |

ENAS 的关键创新在于**将"训练子模型"这一瓶颈完全消除**。NAS 中控制器每采样一个架构就需要花费数小时训练该模型以获得奖励信号；而 ENAS 中，由于权重已在超网络中预训练好，评估只需一次前向传播即可得到验证集性能。

##### 搜索完成后的处理

搜索结束后，ENAS 从控制器中采样多个架构，选择验证集上表现最好的一个，然后**从头开始训练**该架构（不使用共享权重）。这是因为共享权重虽然足以区分好坏架构，但并非每个子模型的最优权重。

#### 🧪 练习题
```yaml
question: "ENAS 相比原始 NAS 实现 1000 倍加速的核心机制是什么？"
options:
  - "使用更高效的强化学习算法替代 REINFORCE"
  - "强制所有候选子模型共享参数，避免从头训练每个子模型"
  - "缩小搜索空间，减少候选架构数量"
  - "使用知识蒸馏加速子模型训练"
answer: 1
explain: "ENAS 的核心贡献是参数共享——所有子架构共享超网络中的权重，评估子模型只需一次前向传播而非从头训练至收敛，从而将搜索成本降低约 1000 倍。"
```

### BOHB

```yaml
id: bohb
num: 12
name: BOHB
full_name: '贝叶斯优化与超级带 (BOHB: Robust and Efficient HPO)'
year: '2018'
org: University of Freiburg
parent: tpe
paper_url: https://arxiv.org/abs/1807.01774
project_url: ''
category: hpo
motivation: 融合TPE引导与Hyperband加速
```

#### 📝 一句话总结
BOHB 将基于核密度估计（KDE）的贝叶斯优化嵌入 Hyperband 框架，用模型引导的采样替代随机采样来选择超参数配置，同时保留了 Hyperband 的早停加速能力和强大的任意时刻性能（anytime performance），在多种任务上实现了比单独使用 BO 或 Hyperband 更优的超参数优化效率。

#### 🎯 核心要点
- 将 Hyperband 中的随机采样替换为基于 KDE 的模型引导采样，结合 BO 的样本效率与 HB 的早停加速
- 使用多维核密度估计器（multivariate KDE）构建代理模型，而非 TPE 中的独立一维 KDE
- 采用 TPE 风格的双密度模型：\(l(\mathbf{x})\) 建模好配置，\(g(\mathbf{x})\) 建模差配置，通过最大化 \(l(\mathbf{x})/g(\mathbf{x})\) 采样
- 核带宽通过 leave-one-out 交叉验证的似然最大化自动选择，而非 Scott's rule
- 设定最小观测数阈值 \(N_{\min} + D + 1\)（D 为维度），不足时退化为随机采样
- 天然支持并行化：Hyperband 的 successive halving 结构允许多个 worker 同时评估不同配置
- 在 6 类基准任务（toy function、SVM、前馈网络、贝叶斯神经网络、深度强化学习、CNN）上全面验证

#### 🔬 深入细节
![BOHB 框架示意图](https://ar5iv.labs.arxiv.org/html/1807.01774v1/assets/x2.png)
*图：BOHB 将贝叶斯优化的模型引导采样与 Hyperband 的 successive halving 早停机制相结合*

##### 算法伪代码

```python
# BOHB 核心流程伪代码
def BOHB(eta, s_max, budgets, N_min, q):
    """
    eta: 缩减比例(通常=3)
    s_max: 最大successive halving轮数
    budgets: [b_min, ..., b_max]
    N_min: 构建模型所需最小观测数
    q: 好配置比例分位数(默认15%)
    """
    D = {}  # 存储所有(配置, 预算, 损失)观测

    # 外层循环: 按Hyperband调度
    for iteration in range(max_iterations):
        for s in range(s_max, -1, -1):  # Hyperband的bracket
            n = initial_configs_count(s, eta)
            budget = budgets[0] * eta^(s_max - s)

            # 采样n个配置
            configs = []
            for i in range(n):
                obs = get_observations(D, budget=budget)

                if len(obs) < N_min + D_dims + 1:
                    config = sample_random()       # 观测不足，随机采样
                else:
                    # 用KDE模型引导采样
                    sorted_obs = sort_by_loss(obs)
                    n_good = max(N_min, int(q * len(obs)))
                    good_configs = sorted_obs[:n_good]
                    bad_configs = sorted_obs[n_good:]

                    l = fit_KDE(good_configs, bandwidth='LOO-CV')
                    g = fit_KDE(bad_configs, bandwidth='LOO-CV')

                    candidates = sample_from(l, num=64)
                    config = argmax(l(x)/g(x) for x in candidates)

                configs.append(config)

            # Successive Halving
            for rung in range(s + 1):
                results = evaluate(configs, budget)
                D.update(results)
                budget *= eta
                configs = top_k(configs, results, k=len(configs) // eta)

    return best_config(D)
```

##### 动机与背景

超参数优化（HPO）是机器学习流水线中的关键环节。传统方法面临两大挑战：

1. **样本效率低**：随机搜索和 Hyperband 不利用历史评估信息来指导后续采样，在高维空间中收敛缓慢
2. **评估代价高**：标准贝叶斯优化（如 GP-BO）虽然样本高效，但每次都需要完整训练模型到收敛，计算开销巨大
3. **扩展性差**：GP-BO 的高斯过程在高维、混合类型（连续+离散）配置空间中表现不佳，且难以并行化

Hyperband 通过 successive halving 实现了早停加速——用少量预算快速淘汰差配置，但其配置采样完全随机。TPE 等方法虽然用模型引导采样，但不支持多保真度（multi-fidelity）评估。BOHB 的核心动机就是**将两者的优势结合**：用模型引导替代随机采样，同时保留 Hyperband 的早停加速。

##### 核心机制：基于 KDE 的模型引导采样

BOHB 的代理模型采用 TPE 风格的双密度估计框架，但做了关键改进：

**1. 多维 KDE 替代独立一维 KDE**

TPE 对每个超参数维度独立建模，忽略了维度间的交互。BOHB 使用多维核密度估计器：

$$l(\mathbf{x}) = \frac{1}{|\mathcal{D}_l|} \sum_{\mathbf{x}' \in \mathcal{D}_l} \kappa(\mathbf{x}, \mathbf{x}')$$

$$g(\mathbf{x}) = \frac{1}{|\mathcal{D}_g|} \sum_{\mathbf{x}' \in \mathcal{D}_g} \kappa(\mathbf{x}, \mathbf{x}')$$

其中 \(\kappa\) 是多维核函数，\(\mathcal{D}_l\) 和 \(\mathcal{D}_g\) 分别是好配置集和差配置集。

> 💡 关键：多维 KDE 能捕获超参数之间的相关性，例如学习率与 batch size 的交互效应。

**2. 带宽选择：Leave-One-Out 交叉验证**

核带宽 \(b_w\) 是 KDE 的关键超参数。TPE 使用 Scott's rule 等启发式规则，而 BOHB 通过最大化 leave-one-out 对数似然来选择最优带宽：

$$b_w^* = \arg\max_{b_w} \sum_{i=1}^{N} \log \hat{p}_{-i}(\mathbf{x}_i | b_w)$$

其中 \(\hat{p}_{-i}\) 是去掉第 \(i\) 个样本后的 KDE 估计。这确保了带宽能自适应地根据数据密度调整。

**3. 分位数划分与最小样本保护**

观测按损失值排序后，取 top \(N_b' = \max(N_{\min}, q \cdot |\mathcal{D}_b|)\) 个作为好配置集（\(q\) 默认为 15%），其余为差配置集。设定 \(N_{\min} + D + 1\) 的最小观测阈值，确保 KDE 在低样本时不会产生退化估计。

**4. 采样策略**

从 \(l(\mathbf{x})\) 中抽取候选样本，然后选择使 \(l(\mathbf{x})/g(\mathbf{x})\) 最大的配置。这等价于最大化 Expected Improvement 的近似：

$$\text{EI}(\mathbf{x}) \propto \frac{l(\mathbf{x})}{g(\mathbf{x})}$$

> ⚠️ 注意：为保持探索性，BOHB 还会以一定比例混入随机样本，防止模型过早收敛到局部最优。

##### 训练流程与 Hyperband 集成

BOHB 的调度完全遵循 Hyperband 的 bracket 结构：

1. **Bracket 选择**：按 Hyperband 的规则循环选择不同的 bracket（从激进早停到保守评估）
2. **配置采样**：在每个 bracket 的初始阶段，用 KDE 模型（而非随机）采样初始配置
3. **Successive Halving**：按 \(\eta=3\) 的比例逐轮淘汰表现差的配置，幸存者获得更多预算
4. **模型更新**：每次评估完成后，将 (配置, 预算, 损失) 三元组加入观测集，供后续模型构建使用

关键设计：**模型按预算分组构建**。即对于预算 \(b\) 的采样，只使用在预算 \(b\) 下评估过的历史观测来构建 KDE。这避免了跨预算的噪声干扰，因为低预算下的排名可能与高预算不一致。

##### 并行化设计

BOHB 天然支持并行：
- 多个 worker 可以同时运行不同 bracket 的不同配置
- 当一个 worker 空闲时，它从当前最需要评估的 bracket 中取出下一个待评估配置
- 实验表明，2-4 个 worker 时加速接近线性，32 个 worker 时加速约 15 倍

##### 与现有方法的对比

| 方法 | 模型引导 | 早停加速 | 高维支持 | 并行化 | 混合空间 |
|------|---------|---------|---------|--------|---------|
| Random Search | ✗ | ✗ | ✓ | ✓ | ✓ |
| GP-BO | ✓ | ✗ | ✗ | 困难 | ✗ |
| TPE | ✓ | ✗ | ✓ | ✓ | ✓ |
| Hyperband | ✗ | ✓ | ✓ | ✓ | ✓ |
| SMAC | ✓ | ✗ | ✓ | ✓ | ✓ |
| Fabolas | ✓ | ✓(连续) | ✗ | 困难 | ✗ |
| **BOHB** | **✓** | **✓** | **✓** | **✓** | **✓** |

BOHB 是唯一同时具备模型引导、早停加速、高维支持、并行化和混合空间处理能力的方法。

##### 实验验证

在 6 类基准任务上的实验表明：
- **早期阶段**：BOHB 与 Hyperband 表现相当（因为观测不足时退化为随机采样）
- **中后期**：BOHB 显著优于 Hyperband，因为模型引导开始发挥作用
- **最终性能**：BOHB 达到与最佳 BO 方法相当甚至更优的最终结果，但速度快数倍到数十倍
- **鲁棒性**：在所有测试的 6 类任务中，BOHB 从未表现最差，是最鲁棒的方法

#### 🧪 练习题
```yaml
question: "BOHB 相比 TPE 在代理模型构建上的关键改进是什么？"
options:
  - "使用高斯过程替代核密度估计"
  - "使用多维联合KDE替代独立一维KDE，并用LOO-CV选择带宽"
  - "使用随机森林作为代理模型"
  - "使用神经网络拟合超参数响应曲面"
answer: 1
explain: "BOHB使用多维KDE捕获超参数间交互，并通过leave-one-out交叉验证自动选择最优核带宽，而非TPE的独立一维建模和启发式带宽规则。"
```

### DARTS

```yaml
id: darts
num: 13
name: DARTS
full_name: 可微分架构搜索 (Differentiable Architecture Search)
year: '2019'
org: CMU
parent: enas
paper_url: https://arxiv.org/abs/1806.09055
project_url: ''
category: nas
motivation: 连续松弛化实现梯度搜索
```

#### 📝 一句话总结
DARTS 的核心目标是：连续松弛化实现梯度搜索。

#### 🎯 核心要点
- 核心动机：连续松弛化实现梯度搜索
- 演化来源：继承或改进自 enas
- 代表机构：CMU

#### 🔬 深入细节
连续松弛化实现梯度搜索


### EfficientNet

```yaml
id: efficientnet
num: 14
name: EfficientNet
full_name: '高效网络 (EfficientNet: Rethinking Model Scaling)'
year: '2019'
org: Google Brain
parent: nasnet
paper_url: https://arxiv.org/abs/1905.11946
project_url: ''
category: nas
motivation: NAS搜索基线+复合缩放法则
```

#### 📝 一句话总结
EfficientNet 提出了一种复合缩放方法（Compound Scaling），通过统一缩放网络深度、宽度和输入分辨率三个维度，结合神经架构搜索（NAS）获得的高效基线网络 EfficientNet-B0，系统性地构建了 B0-B7 系列模型，在 ImageNet 上以 8.4 倍更少的参数超越了当时最优模型。

#### 🎯 核心要点
- 提出复合缩放法则：用统一的复合系数 \(\phi\) 同时缩放深度、宽度和分辨率，约束条件为 \(\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2\)
- 基线网络 EfficientNet-B0 通过多目标 NAS（优化 ACC(m) × [FLOPS(m)/T]^w）搜索得到，以 MBConv（Mobile Inverted Bottleneck）为核心构建块
- 缩放系数通过小规模网格搜索确定：\(\alpha=1.2, \beta=1.1, \gamma=1.15\)
- 系列模型 B1-B7 通过逐步增大 \(\phi\) 从 B0 缩放得到
- 在 ImageNet 上，EfficientNet-B7 达到 84.3% top-1 准确率，参数量仅 66M（比 GPipe 小 8.4 倍，推理快 6.1 倍）
- 迁移学习在 CIFAR-100、Flowers、Cars 等 5 个数据集上均达到 SOTA

#### 🔬 深入细节
![EfficientNet 复合缩放示意图](https://production-media.paperswithcode.com/methods/compound_702x0Pu.png)
*图：模型缩放方法对比。(a) 基线网络；(b) 仅增加宽度；(c) 仅增加深度；(d) 仅增加分辨率；(e) 复合缩放同时增加三个维度（本文方法）*

##### 算法伪代码

```python
# EfficientNet 复合缩放算法
# Step 1: 固定 φ=1，网格搜索最优 α, β, γ
best_acc = 0
for alpha in [1.0, 1.1, 1.2, ...]:
    for beta in [1.0, 1.05, 1.1, ...]:
        for gamma in [1.0, 1.05, 1.1, ...]:
            if alpha * beta**2 * gamma**2 ≈ 2:
                # 在 B0 基础上缩放并评估
                model = scale(B0, depth=alpha, width=beta, resolution=gamma)
                acc = evaluate(model, ImageNet)
                if acc > best_acc:
                    best_alpha, best_beta, best_gamma = alpha, beta, gamma
# 结果: α=1.2, β=1.1, γ=1.15

# Step 2: 固定 α, β, γ，用不同 φ 缩放得到 B1-B7
for phi in [1, 2, 3, 3.5, 4, 5, 6.5]:  # 对应 B1-B7
    depth = best_alpha ** phi      # 网络层数倍数
    width = best_beta ** phi       # 通道数倍数
    resolution = best_gamma ** phi # 输入分辨率倍数
    EfficientNet_B{phi} = scale(B0, depth, width, resolution)
```

##### 动机与背景

卷积神经网络的性能提升通常依赖于模型缩放——增加网络深度（如 ResNet-18 → ResNet-200）、增加通道宽度（如 WideResNet）或提高输入分辨率。然而，传统方法只调节单一维度，且缺乏理论指导，往往需要大量人工调参。

作者通过系统实验发现：**单独缩放任何一个维度都会迅速饱和**。例如，仅增加深度时，由于梯度消失问题，非常深的网络难以训练；仅增加宽度时，宽而浅的网络难以捕获高层特征。关键洞察是：**三个维度之间存在协同关系**——更高分辨率的图像需要更深的网络来捕获更大感受野中的精细模式，同时也需要更宽的网络来捕获更多细粒度特征。

##### 核心机制：复合缩放法则

EfficientNet 的核心创新是将模型缩放形式化为一个约束优化问题。给定基线网络 \(\mathcal{N}\)，目标是找到最优的缩放系数以最大化模型精度：

$$\max_{d, w, r} \quad \text{Accuracy}(\mathcal{N}(d, w, r))$$
$$\text{s.t.} \quad \mathcal{N}(d, w, r) = \bigodot_{i=1,...,s} \hat{F}_i^{d \cdot \hat{L}_i}(X_{\langle r \cdot \hat{H}_i, r \cdot \hat{W}_i, w \cdot \hat{C}_i \rangle})$$
$$\text{Memory}(\mathcal{N}) \leq \text{target\_memory}$$
$$\text{FLOPS}(\mathcal{N}) \leq \text{target\_flops}$$

其中 \(d, w, r\) 分别为深度、宽度和分辨率的缩放系数。作者提出用单一复合系数 \(\phi\) 统一控制三个维度：

$$d = \alpha^\phi, \quad w = \beta^\phi, \quad r = \gamma^\phi$$

约束条件为：

$$\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2$$

> 💡 **关键直觉**：FLOPS 与 \(d, w^2, r^2\) 成正比（深度线性增加计算量，宽度和分辨率各自平方增加计算量），因此约束 \(\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2\) 意味着每增加 \(\phi\) 一个单位，总 FLOPS 大约翻倍（增加 \(2^\phi\) 倍）。这使得资源分配可控且可预测。

##### EfficientNet-B0 基线架构

B0 通过多目标 NAS 搜索得到，优化目标同时考虑准确率和 FLOPS。其架构以 Mobile Inverted Bottleneck Convolution（MBConv）为核心，并集成了 Squeeze-and-Excitation（SE）模块：

| Stage | Operator | Resolution | Channels | Layers |
|-------|----------|-----------|----------|--------|
| 1 | Conv3×3 | 224×224 | 32 | 1 |
| 2 | MBConv1, k3×3 | 112×112 | 16 | 1 |
| 3 | MBConv6, k3×3 | 112×112 | 24 | 2 |
| 4 | MBConv6, k5×5 | 56×56 | 40 | 2 |
| 5 | MBConv6, k3×3 | 28×28 | 80 | 3 |
| 6 | MBConv6, k5×5 | 14×14 | 112 | 3 |
| 7 | MBConv6, k5×5 | 14×14 | 192 | 4 |
| 8 | MBConv6, k3×3 | 7×7 | 320 | 1 |
| 9 | Conv1×1 & Pooling & FC | 7×7 | 1280 | 1 |

其中 MBConv6 表示扩展比为 6 的 Mobile Inverted Bottleneck，k 表示卷积核大小。每个 MBConv 块包含：depthwise separable convolution + SE attention + skip connection。

##### 与传统方法的区别

| 方法 | 缩放策略 | 缺陷 |
|------|---------|------|
| ResNet 系列 | 仅增加深度 | 深度过大时梯度消失，精度饱和 |
| WideResNet | 仅增加宽度 | 宽而浅的网络难以捕获高层语义 |
| 高分辨率输入 | 仅增加分辨率 | 感受野不足，精度增益递减 |
| **EfficientNet** | **复合缩放三维度** | **平衡分配资源，精度持续提升** |

> ⚠️ **注意**：复合缩放的有效性并不局限于 EfficientNet 架构本身。作者在 MobileNet 和 ResNet 上验证了复合缩放同样能带来显著提升（如 ResNet-50 在复合缩放后 top-1 提升 0.7%，超过单独缩放深度或宽度的效果）。

##### 实验结果

在 ImageNet 上的关键结果：
- EfficientNet-B0：77.1% top-1，5.3M 参数
- EfficientNet-B3：81.6% top-1，12M 参数（与 ResNet-152 精度相当，参数少 5 倍）
- EfficientNet-B7：84.3% top-1，66M 参数（超越 GPipe 的 84.3%，但参数少 8.4 倍）

#### 🧪 练习题
```yaml
question: "EfficientNet 复合缩放法则中，约束条件 α·β²·γ²≈2 的设计目的是什么？"
options:
  - "确保模型参数量恒定不变"
  - "使每增加一个单位的复合系数 φ，总 FLOPS 大约翻倍"
  - "保证网络深度始终大于宽度"
  - "限制输入分辨率不超过 600×600"
answer: 1
explain: "由于 FLOPS 与 d·w²·r² 成正比，约束 α·β²·γ²≈2 确保 φ 每增加 1，FLOPS 增加约 2^φ 倍，使计算资源分配可控。"
```

### Optuna

```yaml
id: optuna
num: 15
name: Optuna
full_name: 'Optuna超参优化框架 (Optuna: Next-generation HPO Framework)'
year: '2019'
org: Preferred Networks
parent: tpe
paper_url: https://arxiv.org/abs/1907.10902
project_url: ''
category: hpo
motivation: define-by-run动态搜索空间
```

#### 📝 一句话总结
Optuna 提出了基于 define-by-run 范式的超参数优化框架，通过动态构建搜索空间、高效采样算法（TPE/CMA-ES）和异步早停剪枝（ASHA），实现了灵活、高效且易于分布式扩展的自动超参数调优。

#### 🎯 核心要点
- **Define-by-run API**：搜索空间在目标函数执行过程中动态定义，支持条件参数和循环结构等复杂搜索空间
- **高效采样算法**：集成 TPE（Tree-structured Parzen Estimator）和 CMA-ES（协方差矩阵自适应进化策略）
- **自动化早停剪枝**：支持 ASHA（Asynchronous Successive Halving Algorithm）和 Median Pruning，实现 trial 级别的提前终止
- **轻量级模块化架构**：基于 Study/Trial/Storage 三层抽象，支持 RDB 后端实现分布式优化
- **即时可视化**：集成 Web Dashboard 实时监控优化进程
- **线性分布式扩展**：多 worker 并行优化性能随节点数线性增长

#### 🔬 深入细节
![Optuna 架构示意图](https://ar5iv.labs.arxiv.org/html/1907.10902v2/assets/x4.png)
*图：Optuna 软件架构——Study 管理优化会话，Trial 封装单次评估，Storage 提供持久化与分布式支持*

##### 算法伪代码

```python
# Optuna Define-by-run 超参数优化核心流程
def objective(trial):
    # 动态定义搜索空间（define-by-run）
    n_layers = trial.suggest_int("n_layers", 1, 4)
    layers = []
    for i in range(n_layers):
        # 条件搜索空间：层数决定每层单元数
        n_units = trial.suggest_int(f"n_units_l{i}", 16, 256, log=True)
        layers.append(n_units)
    
    lr = trial.suggest_float("lr", 1e-5, 1e-1, log=True)
    optimizer_name = trial.suggest_categorical("optimizer", ["Adam", "SGD"])
    
    # 训练模型并支持中间报告（用于剪枝）
    for epoch in range(100):
        train_loss = train_one_epoch(layers, lr, optimizer_name)
        val_acc = evaluate()
        trial.report(val_acc, epoch)  # 报告中间值
        if trial.should_prune():      # 剪枝判断
            raise optuna.TrialPruned()
    
    return val_acc

# 创建 Study 并优化
study = optuna.create_study(
    direction="maximize",
    sampler=optuna.samplers.TPESampler(),
    pruner=optuna.pruners.SuccessiveHalvingPruner()
)
study.optimize(objective, n_trials=100)
```

##### 动机与背景

传统超参数优化框架（如 Hyperopt、SMAC、Vizier）采用 **define-and-run** 范式：用户必须在优化开始前静态定义完整的搜索空间。这种方式存在根本性限制：

1. **无法表达条件依赖**：例如神经网络层数决定了每层超参数的数量，静态定义难以自然表达
2. **代码侵入性强**：需要将搜索空间与目标函数分离，增加工程复杂度
3. **不支持动态结构**：循环、分支等程序控制流无法直接用于搜索空间定义

Optuna 借鉴了深度学习框架从 define-and-run（TensorFlow 1.x）向 define-by-run（PyTorch/Chainer）演进的思路，将相同理念引入超参数优化领域。

##### 核心机制：Define-by-run 搜索空间

Define-by-run 的核心思想是：**搜索空间不是预先声明的静态对象，而是在目标函数执行过程中通过 `trial.suggest_*()` 调用动态构建的**。

每次调用 `trial.suggest_int()`、`trial.suggest_float()` 或 `trial.suggest_categorical()` 时，框架会：
1. 检查该参数名是否已在当前 trial 中被采样
2. 若未采样，则根据采样算法（TPE/CMA-ES/随机）生成一个值
3. 记录该参数的名称、类型、范围和采样值

这意味着搜索空间的**拓扑结构本身可以是超参数的函数**。例如：

$$\text{SearchSpace}(\theta) = \{\theta_i \mid i \in \text{ActiveParams}(\theta_{\text{structure}})\}$$

其中 \(\theta_{\text{structure}}\) 决定了哪些参数 \(\theta_i\) 会被激活。

> 💡 关键：Define-by-run 使得搜索空间可以包含 Python 的任意控制流（if/for/while），极大提升了表达能力。

##### 采样算法

**TPE (Tree-structured Parzen Estimator)**：

TPE 将超参数的条件概率建模为两个密度函数：

$$p(x|y) = \begin{cases} l(x) & \text{if } y < y^* \\ g(x) & \text{if } y \geq y^* \end{cases}$$

其中 \(y^*\) 是目标值的分位数阈值，\(l(x)\) 建模"好"的超参数分布，\(g(x)\) 建模"差"的超参数分布。优化目标等价于最大化 \(l(x)/g(x)\)。

Optuna 对 TPE 的改进：
- 独立采样（Independent TPE）：对每个超参数独立建模，天然适配动态搜索空间
- 支持对数尺度和离散参数的核密度估计

**CMA-ES (协方差矩阵自适应进化策略)**：

CMA-ES 维护一个多元高斯分布 \(\mathcal{N}(m, \sigma^2 C)\)，通过进化策略迭代更新均值 \(m\)、步长 \(\sigma\) 和协方差矩阵 \(C\)。适用于连续参数空间的局部优化。

##### 剪枝策略

Optuna 的剪枝机制允许在 trial 执行过程中提前终止表现不佳的配置：

**ASHA (Asynchronous Successive Halving)**：

ASHA 基于 Successive Halving 算法的异步版本。给定资源预算（如 epoch 数），在每个 rung（检查点）处：

$$\text{Promote}(t) = \begin{cases} \text{True} & \text{if } f(t) \leq \text{Percentile}_{1/\eta}(\{f(t')\}) \\ \text{False} & \text{otherwise} \end{cases}$$

其中 \(\eta\) 是缩减因子（默认为 3-4），只有表现在前 \(1/\eta\) 的 trial 才能继续获得更多资源。

> ⚠️ 注意：ASHA 的异步特性使其天然适合分布式环境——新 worker 无需等待其他 trial 完成即可开始新的评估。

实验表明，ASHA 剪枝相比无剪枝可实现约 **35 倍**的加速（在相同时间内探索更多有效配置）。

##### 分布式架构

Optuna 的分布式优化基于共享存储（Shared Storage）模式：

```
Worker 1 ──┐
Worker 2 ──┼──→ RDB Storage (MySQL/PostgreSQL) ←──→ Study
Worker 3 ──┘
```

- 每个 worker 独立运行目标函数
- 通过 Storage 层读取历史 trial 结果、写入新结果
- 采样算法基于所有已完成 trial 的信息进行决策
- 无需中心调度器，worker 可动态加入/退出

实验验证：在 1-8 个 worker 的配置下，优化效率随 worker 数量**线性扩展**，且 worker 数量不影响每个 trial 的质量。

##### 与传统方法的区别

| 特性 | Hyperopt | SMAC | Google Vizier | **Optuna** |
|------|----------|------|---------------|------------|
| 搜索空间定义 | Define-and-run | Define-and-run | Define-and-run | **Define-by-run** |
| 条件参数 | 需特殊语法 | 需配置文件 | 有限支持 | **原生 Python** |
| 剪枝 | ❌ | ❌ | ✅ | **✅ (ASHA/Median)** |
| 分布式 | MongoDB | SMAC3 | 内置 | **RDB 后端** |
| 可视化 | 有限 | 有限 | Web UI | **Web Dashboard** |
| 轻量级 | ✅ | ❌ | ❌(需服务) | **✅** |

#### 🧪 练习题
```yaml
question: "Optuna 的 define-by-run API 相比传统 define-and-run 方式的核心优势是什么？"
options:
  - "训练速度更快，因为搜索空间更小"
  - "搜索空间可以在目标函数执行过程中动态构建，支持条件参数和程序控制流"
  - "不需要指定超参数的取值范围"
  - "自动选择最优的采样算法"
answer: 1
explain: "Define-by-run 允许在目标函数中通过 trial.suggest_*() 动态定义搜索空间，使得搜索空间的结构本身可以依赖于其他超参数的值，天然支持条件参数、循环等复杂结构。"
```

### AutoFeat

```yaml
id: autofeat
num: 16
name: AutoFeat
full_name: 自动特征工程库 (The autofeat Python Library)
year: '2019'
org: SAP
parent: dfs
paper_url: https://arxiv.org/abs/1901.07329
project_url: ''
category: auto_feature
motivation: 非线性变换组合+L1正则化筛选
```

#### 📝 一句话总结
AutoFeat 提出了一种自动特征工程框架，通过对原始特征进行多步非线性变换生成大规模候选特征池，再利用多轮 L1 正则化（Lasso）结合噪声过滤、分块与子采样策略高效筛选少量有意义特征，最终构建性能媲美非线性模型但保持可解释性的线性回归模型。

#### 🎯 核心要点
- 两阶段流水线：特征工程（Feature Engineering）→ 特征选择（Feature Selection）
- 特征工程：对原始特征迭代应用非线性变换（exp, log, sqrt, \(x^2\), \(x^3\), 1/x, |x|）及算术组合（+, -, ×, /），指数级扩展特征空间
- 特征选择核心：多步 L1 正则化，通过添加噪声特征作为基线过滤无关特征
- 分块策略（Chunking）：将大规模特征池拆分为多个子集分别进行 Lasso 回归，解决 \(p \gg n\) 问题
- 子采样策略（Subsampling）：对数据点进行多次随机子采样，仅保留在多数子样本中被选中的特征
- 物理单位感知：利用 SymPy 符号计算追踪特征的物理量纲，仅组合量纲兼容的特征
- 最终模型为标准线性回归，系数可直接解释各特征对目标的贡献
- 提供 Python 库 `autofeat`，API 兼容 scikit-learn

#### 🔬 深入细节
![AutoFeat 特征工程与选择流程](https://ar5iv.labs.arxiv.org/html/1901.07329v1/assets/autofeat_pipeline.png)
*图：AutoFeat 流水线示意——从原始特征出发，经多步非线性变换生成候选特征池，再通过多轮 L1 选择得到最终特征子集*

```python
# AutoFeat 核心算法伪代码
def autofeat(X, y, transformations, n_steps, n_select):
    """
    X: 原始特征矩阵 (n_samples, n_features)
    y: 目标变量
    transformations: 非线性变换集合 {exp, log, sqrt, ^2, ^3, 1/x, |x|}
    n_steps: 特征工程迭代步数
    n_select: 每步保留的特征数上限
    """
    # === 阶段1: 特征工程 ===
    feature_pool = X.copy()
    for step in range(n_steps):
        new_features = []
        for f in feature_pool.columns:
            for t in transformations:
                new_features.append(t(f))  # 一元变换
        for f1, f2 in combinations(feature_pool.columns, 2):
            for op in ['+', '-', '*', '/']:
                new_features.append(op(f1, f2))  # 二元组合
        feature_pool = concat(feature_pool, new_features)
        # 可选: 每步后进行初步筛选以控制规模
        feature_pool = l1_select(feature_pool, y, n_select)
    
    # === 阶段2: 多步特征选择 ===
    selected = multi_step_l1_selection(feature_pool, y)
    
    # === 最终模型 ===
    model = LinearRegression().fit(X[selected], y)
    return model, selected

def multi_step_l1_selection(features, y):
    """多步L1正则化特征选择"""
    # Step 1: 添加噪声特征作为基线
    noise_features = generate_noise(n=5)
    augmented = concat(features, noise_features)
    
    # Step 2: 分块 + Lasso
    chunks = split_into_chunks(augmented, chunk_size=n_samples//10)
    candidates = []
    for chunk in chunks:
        model = Lasso(alpha=auto).fit(chunk, y)
        # 仅保留系数 > max(噪声特征系数) 的特征
        threshold = max(abs(model.coef_[noise_indices]))
        candidates.extend(chunk.columns[abs(model.coef_) > threshold])
    
    # Step 3: 子采样验证
    final = []
    for subsample in random_subsamples(n_rounds=5):
        model = Lasso().fit(candidates[subsample], y[subsample])
        final.extend(selected_by(model))
    
    # 仅保留在多数子样本中被选中的特征
    return majority_vote(final)
```

##### 动机与背景

传统机器学习流程中，特征工程是最耗时且依赖领域专家经验的环节。虽然深度学习通过端到端表示学习部分解决了这一问题，但在**表格数据**（尤其是样本量有限的科学/工业场景）中，手动特征工程仍然是提升模型性能的关键手段。

现有自动特征工程方法（如 featuretools、tsfresh）主要面向关系型数据或时间序列，对于包含不同物理单位传感器测量值的**异构科学数据集**缺乏针对性支持。此外，生成大量候选特征后如何高效、稳健地筛选出真正有用的特征，避免过拟合，是核心挑战。

> 💡 关键：AutoFeat 的核心洞察是——通过非线性变换将线性模型的表达能力提升到非线性水平，同时保持模型的可解释性优势。

##### 核心机制：特征工程

AutoFeat 的特征工程阶段通过迭代应用预定义的变换算子来扩展特征空间。给定原始特征集 \(\mathbf{X} = \{x_1, x_2, \ldots, x_p\}\)，每一步生成新特征：

**一元变换**（对每个特征独立应用）：

$$\mathcal{T}_{\text{unary}} = \{\exp, \log, \sqrt{\cdot}, (\cdot)^2, (\cdot)^3, 1/(\cdot), |\cdot|\}$$

**二元组合**（对特征对应用算术运算）：

$$\mathcal{T}_{\text{binary}} = \{+, -, \times, /\}$$

经过 \(s\) 步特征工程后，特征数量呈指数增长。例如，\(p\) 个原始特征经 1 步变换可产生约 \(7p + 4\binom{p}{2}\) 个新特征。为控制组合爆炸，AutoFeat 采用以下策略：

1. **物理单位约束**：利用 SymPy 追踪每个特征的量纲，仅对量纲兼容的特征进行加减运算（如不会将"米"与"秒"相加）
2. **每步筛选**：在每步特征工程结束后，先进行一轮 L1 选择，将候选特征数控制在可管理范围内
3. **去重**：通过计算特征间相关性，去除高度冗余的特征

##### 核心机制：多步 L1 特征选择

特征选择面临的核心挑战是：候选特征数 \(p'\) 远大于样本数 \(n\)（通常 \(p' \gg n\)），直接应用 Lasso 会导致不稳定的选择结果。AutoFeat 设计了一套鲁棒的多步选择流程：

**Step 1 — 噪声过滤**：向特征矩阵中添加 \(k\) 个随机噪声特征（从标准正态分布采样），作为"无关特征"的基线。Lasso 回归后，任何系数绝对值不超过噪声特征最大系数的真实特征都被淘汰：

$$|w_j| \leq \max_{i \in \text{noise}} |w_i| \implies \text{移除特征 } j$$

**Step 2 — 分块策略**：将候选特征随机分为多个大小约为 \(n/10\) 的块（chunk），每块独立进行 Lasso 回归。这确保每个子问题中 \(p < n\)，Lasso 可以稳定工作。

**Step 3 — 子采样验证**：对数据点进行多次随机子采样（默认 5 轮，每轮取 2/3 样本），在每个子样本上独立运行 Lasso。仅保留在**大多数子样本**中都被选中的特征，确保选择结果不依赖于特定数据点。

> ⚠️ 注意：Lasso 的正则化参数 \(\alpha\) 通过 LassoLarsCV（基于 LARS 算法的交叉验证）自动确定，无需手动调参。

##### 最终模型与可解释性

经过特征选择后，AutoFeat 使用选中的少量非线性特征训练一个标准**最小二乘线性回归**模型：

$$\hat{y} = w_0 + \sum_{j=1}^{k} w_j \cdot \phi_j(\mathbf{x})$$

其中 \(\phi_j(\mathbf{x})\) 是通过变换生成的特征（如 \(\log(x_1) \cdot x_3^2\)）。由于最终模型是线性的，每个特征的权重 \(w_j\) 直接反映其对预测的贡献大小和方向，保持了完全的可解释性。

##### 与传统方法的对比

| 方法 | 特征工程 | 模型类型 | 可解释性 | 适用场景 |
|------|---------|---------|---------|---------|
| 手动特征工程 + 线性模型 | 人工 | 线性 | ✅ 高 | 需要领域专家 |
| 随机森林/GBDT | 隐式（树分裂） | 非线性 | ❌ 低 | 通用 |
| 深度学习 | 端到端学习 | 非线性 | ❌ 低 | 大数据 |
| **AutoFeat** | **自动** | **线性** | **✅ 高** | **小样本科学数据** |

AutoFeat 的独特优势在于：在获得接近非线性模型性能的同时，保持了线性模型的可解释性和外推能力。实验表明，在 5 个回归基准数据集上，AutoFeat 显著优于普通线性模型（R² 提升 10-50%），并在多数数据集上达到或超过随机森林、SVR 等非线性模型的性能。

#### 🧪 练习题
```yaml
question: "AutoFeat 在特征选择阶段添加噪声特征的主要目的是什么？"
options:
  - "增加训练数据的多样性以防止过拟合"
  - "作为无关特征的基线，过滤掉系数不显著的候选特征"
  - "用于估计 Lasso 正则化参数 α 的最优值"
  - "生成额外的非线性特征以扩展特征空间"
answer: 1
explain: "噪声特征服从随机分布，与目标变量无关。Lasso 回归后，系数绝对值不超过噪声特征最大系数的真实特征被认为不比随机噪声更有信息量，因此被淘汰。"
```

### OFA

```yaml
id: ofa
num: 17
name: OFA
full_name: 一次训练全场景 (Once-for-All)
year: '2020'
org: MIT
parent: enas
paper_url: https://arxiv.org/abs/1908.09791
project_url: ''
category: nas
motivation: 训练超网支持10^19子网部署
```

#### 📝 一句话总结
OFA 提出"训练一次，处处部署"的超网训练范式，通过渐进收缩（Progressive Shrinking）算法联合优化深度、宽度、卷积核大小和分辨率四个维度，使单个共享权重网络支持超过 \(10^{19}\) 种子网络架构，在部署时零额外训练成本即可为任意硬件平台导出专用高效模型。

#### 🎯 核心要点
- **超网（Once-for-All Network）**：单一共享权重网络包含 \(>10^{19}\) 个子网络，覆盖深度、宽度、卷积核大小、输入分辨率四个弹性维度
- **渐进收缩（Progressive Shrinking, PS）算法**：从最大网络出发，依次引入弹性卷积核→弹性深度→弹性宽度，逐步微调支持更小子网
- **弹性卷积核**：大卷积核中心区域复用为小卷积核，引入核变换矩阵消除角色冲突
- **弹性深度**：保留每个 unit 前 D 层、跳过末尾层，确保权重共享一致性
- **弹性宽度**：按 L1 范数对通道排序，选取最重要通道初始化小子网
- **知识蒸馏**：训练最大网络后，用其软标签指导小子网微调
- **神经网络孪生预测器（Neural-Network-Twins）**：训练精度预测器 + 延迟查找表，进化搜索导出专用子网，搜索成本可忽略
- **部署成本从 O(N) 降至 O(1)**：无论目标场景数量多少，训练成本恒定（约 1200 GPU hours）
- **SOTA 结果**：ImageNet mobile setting 首次达到 80.0% top-1（595M MACs），优于 MobileNetV3 最高 4.0%

#### 🔬 深入细节
##### 核心框架示意图

![OFA 整体框架](https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x1.png)
*图：OFA 框架概览。左：单个超网支持多种架构配置（深度/宽度/卷积核/分辨率）；中：部署成本从 O(N) 降至 O(1)；右：一次训练即可导出多种精度-延迟权衡方案。*

##### 渐进收缩训练流程

![Progressive Shrinking 过程](https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x3.png)
*图：渐进收缩过程示意。依次引入弹性卷积核 K、弹性深度 D、弹性宽度 W，分辨率 R 在整个训练过程中始终弹性采样。*

##### 算法伪代码

```python
# OFA 渐进收缩训练流程伪代码
# Phase 0: 训练最大网络
train_full_network(max_depth=4, max_width=6, max_kernel=7, epochs=180)

# Phase 1: 弹性卷积核 (Elastic Kernel Size)
for epoch in range(PS_epochs_kernel):
    for batch in dataloader:
        # 随机采样卷积核大小 ∈ {3, 5, 7}，深度和宽度保持最大
        subnet = sample_subnet(kernel=[3,5,7], depth=max, width=max)
        # 知识蒸馏: soft_label 来自最大网络
        loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))
        loss.backward()
        optimizer.step()

# Phase 2: 弹性深度 (Elastic Depth)
for epoch in range(PS_epochs_depth):
    subnet = sample_subnet(kernel=[3,5,7], depth=[2,3,4], width=max)
    loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))
    # ...

# Phase 3: 弹性宽度 (Elastic Width)
for epoch in range(PS_epochs_width):
    # 通道按 L1 范数排序后选取前 k 个
    subnet = sample_subnet(kernel=[3,5,7], depth=[2,3,4], width=[3,4,6])
    loss = α * CE(subnet(x), y) + (1-α) * KD(subnet(x), teacher(x))
    # ...

# 部署阶段: 搜索专用子网
accuracy_predictor = train_predictor(sample_16K_subnets())
latency_table = build_latency_lookup(target_hardware)
best_arch = evolutionary_search(accuracy_predictor, latency_table, constraint)
```

##### 动机与背景

传统的高效模型部署面临严峻的可扩展性问题：每个目标硬件平台（手机、GPU、FPGA 等）都需要独立进行神经架构搜索（NAS）并从头训练模型。随着 IoT 设备数量爆炸式增长（2018 年已超 231 亿台），这种 O(N) 的设计范式在计算成本和碳排放上均不可接受——单次 NAS 搜索（如 NASNet）需要 48,000 GPU hours，相当于 5 辆汽车一生的 CO₂ 排放量。

> 💡 关键：OFA 的核心洞察是**解耦训练与搜索**——只训练一次超网，部署时通过预测器引导搜索直接从超网中选取子网，无需任何额外训练。

##### 核心机制详解

**1. 架构空间设计**

OFA 基于 MobileNetV3 架构空间，将 CNN 划分为 5 个 unit，每个 unit 包含若干层。弹性维度包括：

- **输入分辨率**：128 到 224，步长 4（共 25 种）
- **每 unit 深度**：\(\{2, 3, 4\}\)
- **每层宽度扩展比**：\(\{3, 4, 6\}\)
- **每层卷积核大小**：\(\{3, 5, 7\}\)

总子网数量计算：

$$\left((3 \times 3)^2 + (3 \times 3)^3 + (3 \times 3)^4\right)^5 \approx 2 \times 10^{19}$$

所有子网共享同一组权重 \(W_o\)（仅 7.7M 参数），存储开销极小。

**2. 渐进收缩（Progressive Shrinking）**

训练目标形式化为多目标优化：

$$\min_{W_o} \sum_{arch_i} \mathcal{L}_{val}\big(C(W_o, arch_i)\big)$$

其中 \(C(W_o, arch_i)\) 表示从超网 \(W_o\) 中按配置 \(arch_i\) 选取子网。

直接优化此目标面临两个困难：(1) 枚举所有 \(10^{19}\) 子网计算精确梯度不可行；(2) 随机采样少量子网会因权重干扰导致严重精度下降。

PS 的解决方案是**从大到小渐进训练**：

![弹性卷积核与弹性深度](https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x5.png)
*图：左：核变换矩阵实现弹性卷积核；右：弹性深度保留前 D 层、跳过末尾层。*

- **Phase 1 - 弹性卷积核**：7×7 卷积核的中心 5×5 区域同时作为 5×5 核使用，中心 3×3 区域作为 3×3 核使用。由于中心子核需要扮演多重角色（独立核 vs 大核的一部分），引入**核变换矩阵**（每层仅增加 706 个参数）来消除分布冲突。

- **Phase 2 - 弹性深度**：对于原有 N 层的 unit，深度为 D 的子网保留**前 D 层**（而非任意 D 层），确保权重共享的一致性。前 D 层的权重在大小模型间完全共享。

- **Phase 3 - 弹性宽度**：引入**通道排序**操作，按每个通道权重的 L1 范数排序。选取最重要的前 k 个通道构成小子网，这些通道的权重与大子网共享。

![弹性宽度](https://ar5iv.labs.arxiv.org/html/1908.09791/assets/x6.png)
*图：弹性宽度通过通道排序实现。按 L1 范数选取最重要通道，权重共享。*

> ⚠️ 注意：PS 的关键优势在于——大子网已充分训练后才引入小子网，避免了小子网干扰大子网；同时小子网继承大子网最重要的权重作为初始化，加速收敛。

**3. 与网络剪枝的对比**

PS 可视为**广义网络剪枝**：传统剪枝仅收缩宽度维度并产出单一剪枝网络，而 PS 同时收缩深度、宽度、卷积核大小和分辨率四个维度，且维护所有子网的精度而非单一网络。

**4. 模型特化部署**

训练完成后，部署阶段成本可忽略：

1. 随机采样 16K 子网，在 10K 验证图像上测量精度，训练**精度预测器**
2. 在目标硬件上构建**延迟查找表**
3. 基于预测器进行**进化搜索**，找到满足延迟约束的最优子网

整个搜索过程仅需约 40 GPU hours 收集数据，搜索本身几乎零成本。

##### 与传统方法的关键区别

| 维度 | 传统 NAS (如 MnasNet) | OFA |
|------|----------------------|-----|
| 每新场景成本 | 重新搜索 + 重新训练 | 仅搜索（秒级） |
| 总 GPU hours (40 场景) | 1,600K+ | 1.2K |
| CO₂ 排放 | 453.8K lbs | 0.34K lbs |
| 子网数量 | 1 | \(>10^{19}\) |
| 权重共享 | 无 | 全部共享（7.7M 参数） |

##### 实验亮点

- **ImageNet mobile setting**：OFA 达到 **80.0% top-1**（595M MACs），首次在移动约束下突破 80%
- **vs MobileNetV3**：相同延迟下精度提升最高 4.0%，或相同精度下速度快 1.5×
- **vs EfficientNet**：相同精度下实测延迟快 2.6×
- **多硬件验证**：Samsung S7/Note8/Note10、Google Pixel1/2、LG G8、NVIDIA GPU、Jetson TX2、Xilinx FPGA 等 12+ 平台全面优于 SOTA
- **竞赛冠军**：第 3 届 LPCVC DSP 分类赛道冠军，第 4 届 LPCVC 分类+检测双赛道冠军

#### 🧪 练习题
```yaml
question: "OFA 渐进收缩（Progressive Shrinking）算法中，弹性维度的引入顺序是什么？"
options:
  - "弹性宽度 → 弹性深度 → 弹性卷积核"
  - "弹性卷积核 → 弹性宽度 → 弹性深度"
  - "弹性卷积核 → 弹性深度 → 弹性宽度"
  - "弹性深度 → 弹性卷积核 → 弹性宽度"
answer: 2
explain: "OFA 的渐进收缩按照弹性卷积核→弹性深度→弹性宽度的顺序依次引入，分辨率在整个训练过程中始终弹性采样。这一顺序确保从最容易适配的维度开始，逐步增加难度。"
```

### LLM-FE

```yaml
id: llm_fe
num: 18
name: LLM-FE
full_name: '大模型驱动特征工程 (LLM-FE: AutoFE with LLMs as Evolutionary Optimizers)'
year: '2026'
org: TMLR
parent: autofeat
paper_url: https://openreview.net/forum?id=22129
project_url: ''
category: auto_feature
motivation: LLM进化优化器+岛屿模型搜索
```

#### 📝 一句话总结
LLM-FE 将表格数据的特征工程建模为程序搜索问题，利用 LLM 作为进化优化器，结合岛屿模型多种群记忆与数据驱动反馈，迭代生成并优化特征变换程序，在分类和回归任务上全面超越现有自动特征工程方法。

#### 🎯 核心要点
- 将特征工程形式化为双层优化的程序搜索问题：外层搜索最优变换程序 \(T^*\)，内层训练预测模型评估变换质量
- LLM 作为知识引导的进化优化器：利用结构化提示（指令 + 数据集描述 + 评估函数 + 上下文示例）生成特征变换假设
- 多种群记忆（Island Model）：维护 \(m\) 个独立岛屿缓冲区，按 Boltzmann 分布采样父代程序，防止早熟收敛
- 数据驱动评估闭环：生成的特征程序应用于数据集 → 训练模型 → 验证集得分作为反馈信号
- 支持分类与回归任务（CAAFE/FeatLLM 仅支持分类），兼容 XGBoost、MLP、TabPFN 等多种预测模型
- 支持 GPT-3.5-Turbo 和 Llama-3.1-8B 两种 LLM 骨干，均有效提升性能
- 消融实验表明：领域知识 > 进化搜索 > 数据示例（贡献递减）

#### 🔬 深入细节
![LLM-FE 框架总览](https://ar5iv.labs.arxiv.org/html/2503.14434v3/assets/x1.png)
*图：LLM-FE 框架总览。(a) LLM 生成特征变换假设程序；(b) 程序应用于数据集产生增强特征；(c) 预测模型在增强数据上训练并在验证集评估；(d) 多种群记忆维护高分程序作为进化搜索的上下文样本。*

```python
# Algorithm 1: LLM-FE 进化特征搜索（简化伪代码）
def llm_fe(dataset, llm, m=3, b=3, T=20, k=3):
    """
    dataset: 表格数据集 (X_train, y_train, X_val, y_val)
    llm: 大语言模型骨干
    m: 岛屿数量
    b: 每次生成的程序数
    T: 总迭代次数
    k: 上下文示例数
    """
    # 初始化 m 个岛屿缓冲区
    islands = [Buffer() for _ in range(m)]
    best_program, best_score = None, -inf
    
    for t in range(T):
        # 按 Boltzmann 分布选择岛屿
        # P_i = exp(s_i / τ_c) / Σ_j exp(s_j / τ_c)
        island = boltzmann_sample(islands, tau_c)
        
        # 从选中岛屿采样 top-k 程序作为上下文示例
        context_programs = island.sample_top_k(k)
        
        # 构建结构化提示: 指令 + 数据集描述 + 评估函数 + 上下文示例
        prompt = build_prompt(dataset, context_programs)
        
        # LLM 生成 b 个新的特征变换程序
        new_programs = llm.generate(prompt, n=b, temperature=0.8)
        
        for program in new_programs:
            # 数据驱动评估
            X_aug = program.transform(dataset.X)
            model = train_model(X_aug, dataset.y_train)
            score = evaluate(model, X_aug_val, dataset.y_val)
            
            # 更新岛屿缓冲区（按得分签名聚类分配）
            assign_to_island(program, score, islands)
            
            if score > best_score:
                best_program, best_score = program, score
    
    # 集成 top-m 程序的预测结果
    return ensemble_top_m(islands)
```

**动机与背景**

传统自动特征工程方法（如 AutoFeat、OpenFE）依赖预定义的变换操作集合（如 log、sqrt、乘法等），在固定的手工设计搜索空间中进行组合搜索。这类方法存在两个根本局限：(1) 搜索空间受限于人工预设的算子，无法发现更复杂的领域特定变换；(2) 完全忽略领域知识，无法利用特征语义信息指导搜索。近期的 LLM 方法（CAAFE、FeatLLM）虽然引入了领域知识，但仅使用直接提示或简单的验证分数筛选，未能建立特征生成与数据驱动性能之间的有效反馈循环，也无法从历史实验中学习。LLM-FE 的核心洞察是：将 LLM 视为一个具有丰富领域先验的进化优化器，通过迭代的"生成-评估-反馈"循环，在开放的程序空间中搜索最优特征变换。

**核心机制：双层优化与进化搜索**

LLM-FE 将特征工程形式化为双层优化问题。外层目标是找到最优变换程序 \(T^*\)：

$$T^* = \arg\max_{T \in \mathcal{T}} \; \mathcal{V}(f^*_T, \mathcal{D}_{val})$$

其中内层优化训练预测模型：

$$f^*_T = \arg\min_{f \in \mathcal{F}} \; \mathcal{L}(f, T(\mathcal{D}_{train}))$$

搜索空间 \(\mathcal{T}\) 是所有可能的 Python 特征变换程序的集合——这是一个无限的、开放的搜索空间，远超传统方法的固定算子组合。LLM 通过结构化提示生成候选程序，提示包含四个关键组件：(1) **指令**：定义任务目标和输出格式；(2) **数据集规格**：包含任务描述、特征名称与含义、数据样本；(3) **评估函数**：明确评价指标和模型类型；(4) **上下文示例**：来自多种群记忆的高分历史程序及其得分。

**多种群记忆与 Boltzmann 采样**

为防止进化搜索陷入局部最优，LLM-FE 采用岛屿模型（Island Model）维护 \(m\) 个独立的程序缓冲区。每个岛屿存储一组高分程序，新生成的程序根据其在不同数据集分片上的得分签名（score signature）被分配到最相似的岛屿。选择哪个岛屿作为当前迭代的上下文来源时，采用 Boltzmann 采样策略：

$$P_i = \frac{\exp(s_i / \tau_c)}{\sum_{j=1}^{m} \exp(s_j / \tau_c)}$$

其中 \(s_i\) 是岛屿 \(i\) 中最优程序的得分，\(\tau_c\) 是温度参数。这种机制在利用（exploitation，倾向高分岛屿）和探索（exploration，给低分岛屿机会）之间取得平衡。多种群设计确保了搜索的多样性——不同岛屿可能发现数据的不同方面的有效特征，最终通过集成 top-\(m\) 个程序的预测结果获得鲁棒的最终输出。

**实验结果与消融分析**

在 11 个分类数据集上，LLM-FE 以 Mean Rank 1.54 显著优于 AutoFeat (3.18)、OpenFE (3.09)、CAAFE (3.00) 和 FeatLLM (3.82)。在 10 个回归数据集上，LLM-FE 以 Mean Rank 1.00 达到全面最优（对比 OpenFE 2.00、AutoFeat 3.00）。值得注意的是，CAAFE 和 FeatLLM 的假设空间仅支持分类任务，而 LLM-FE 天然支持回归。泛化性实验表明，无论使用 GPT-3.5-Turbo 还是 Llama-3.1-8B 作为骨干，搭配 XGBoost、MLP 或 TabPFN 作为预测模型，LLM-FE 均能稳定提升基线性能。

消融实验揭示了各组件的贡献：(1) 移除领域知识（匿名化特征名）导致性能显著下降至 0.838，说明 LLM 的语义理解是生成有意义特征的关键；(2) 移除进化搜索（不使用历史程序作为上下文）也导致明显退化，模型容易停滞在局部最优；(3) 移除数据示例仅造成轻微下降，表明 LLM 难以从少量数据样本中直接捕获模式，但领域知识和迭代反馈才是核心驱动力。

> 💡 关键洞察：LLM-FE 的成功在于将 LLM 的角色从"一次性特征生成器"提升为"知识引导的进化优化器"——LLM 不仅提供领域先验，还通过历史成功案例的上下文学习不断改进搜索方向。

#### 🧪 练习题
```yaml
question: "LLM-FE 中多种群记忆（Island Model）使用 Boltzmann 采样选择岛屿的主要目的是什么？"
options:
  - "加速 LLM 的推理速度，减少生成延迟"
  - "在利用高分岛屿和探索低分岛屿之间取得平衡，防止早熟收敛"
  - "减少 LLM 的 token 消耗，降低 API 调用成本"
  - "确保每个岛屿被均匀访问，保证公平性"
answer: 1
explain: "Boltzmann 采样通过温度参数 τ_c 控制选择概率分布的锐度，高分岛屿被选中概率更大（exploitation），但低分岛屿仍有机会被选中（exploration），从而避免搜索过早收敛到单一方向。"
```

### AutoEP

```yaml
id: autoep
num: 19
name: AutoEP
full_name: '自动超参进化 (AutoEP: LLM-Driven Hyperparameter Evolution)'
year: '2026'
org: ICLR 2026
parent: pbt
paper_url: https://openreview.net/forum?id=16885
project_url: ''
category: hpo
motivation: 零样本LLM链式推理自动调参
```

#### 📝 一句话总结
AutoEP 在 PBT（种群训练）框架基础上，用**大语言模型（LLM）的链式推理（Chain-of-Thought）**替代传统的随机扰动（explore）步骤：LLM 以零样本方式分析种群中各成员的训练指标与超参数历史，通过结构化推理生成语义合理的超参数变异方案，从而将 PBT 的盲目随机探索升级为**有知识引导的智能进化**，在无需任何任务特定训练数据的前提下显著提升超参数搜索效率。

#### 🎯 核心要点
- **LLM 替代随机扰动**：用预训练 LLM 的 Chain-of-Thought 推理替代 PBT 中 explore 阶段的随机乘因子（×1.2/×0.8）或重采样，使超参数变异具备语义理解能力
- **零样本推理（Zero-shot）**：LLM 无需针对特定任务微调，仅通过精心设计的 prompt 模板即可分析训练动态并提出超参数调整建议
- **结构化上下文注入**：将种群状态（各成员的超参数、性能指标、训练曲线摘要）编码为结构化 prompt，让 LLM 理解当前搜索状态
- **进化式种群协同**：保留 PBT 的 exploit（截断选择 + 权重复制）机制，仅升级 explore 阶段，兼容异步并行训练
- **自适应搜索步长**：LLM 可根据训练阶段（早期/中期/后期）自适应调整超参数变化幅度，而非固定的 ±20% 扰动
- **跨任务泛化**：LLM 的通用知识使其能在图像分类、语言建模、强化学习等不同任务上均产生合理的超参数建议

#### 🔬 深入细节
##### 核心框架图

```
┌─────────────────────────────────────────────────────────┐
│                    AutoEP 框架总览                        │
│                                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐       ┌──────┐          │
│  │Worker│  │Worker│  │Worker│  ...  │Worker│  种群     │
│  │  1   │  │  2   │  │  3   │       │  N   │          │
│  └──┬───┘  └──┬───┘  └──┬───┘       └──┬───┘          │
│     │         │         │               │               │
│     ▼         ▼         ▼               ▼               │
│  ┌─────────────────────────────────────────┐            │
│  │         性能评估 & 排序 (Eval)           │            │
│  └─────────────────┬───────────────────────┘            │
│                    │                                     │
│     ┌──────────────┴──────────────┐                     │
│     ▼                             ▼                     │
│  ┌────────────┐           ┌──────────────────┐          │
│  │  Exploit   │           │   LLM Explore    │ ← 核心创新│
│  │ 截断选择    │──权重+h──→│  Chain-of-Thought │          │
│  │ 复制权重    │           │  推理生成新超参   │          │
│  └────────────┘           └──────────────────┘          │
│                                  │                      │
│                    ┌─────────────┴─────────────┐        │
│                    ▼                           ▼        │
│              结构化 Prompt                 解析 LLM 输出  │
│           ┌──────────────┐           ┌──────────────┐   │
│           │ 训练指标摘要  │           │ 新超参数 h'  │   │
│           │ 超参数历史    │           │ 变异理由     │   │
│           │ 种群排名信息  │           │ 置信度评分   │   │
│           └──────────────┘           └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```
*图：AutoEP 在 PBT 种群框架基础上，将 explore 阶段替换为 LLM Chain-of-Thought 推理。LLM 接收结构化的训练上下文，输出语义合理的超参数变异方案。*

##### 算法伪代码

```python
# Algorithm: AutoEP — LLM-Driven Hyperparameter Evolution
def AutoEP_Train(population P, llm_model):
    # P 中每个成员 = (θ, h, p, t, history)
    #   θ: 模型权重, h: 超参数, p: 当前性能
    #   t: 训练步数, history: 训练指标历史
    
    for (θ, h, p, t, history) in P:  # 异步并行
        while not end_of_training:
            θ ← step(θ | h)              # 用超参 h 做一步梯度更新
            p ← eval(θ)                  # 评估当前模型性能
            history.append((t, h, p))     # 记录训练轨迹
            
            if ready(p, t, P):            # 达到 exploit/explore 条件
                # === Exploit: 与 PBT 相同 ===
                h', θ' ← exploit(h, θ, p, P)  # 截断选择 + 复制权重
                
                if θ != θ':               # 如果发生了替换
                    # === Explore: LLM 替代随机扰动 ===
                    context ← build_prompt(h', p, history, P)
                    response ← llm_model.generate(context)  # CoT 推理
                    h_new ← parse_hyperparams(response)      # 解析输出
                    h_new ← validate_and_clip(h_new)          # 安全校验
                    
                    θ, h ← θ', h_new
                    p ← eval(θ)
            
            update P with (θ, h, p, t+1, history)
    
    return θ with highest p in P

def build_prompt(h, p, history, P):
    """构造结构化 prompt 供 LLM 推理"""
    prompt = f"""
    You are an expert ML hyperparameter tuner.
    
    ## Current State
    - Hyperparameters: {format_dict(h)}
    - Current performance: {p:.4f}
    - Training step: {history[-1][0]}
    
    ## Training History (recent 10 steps)
    {format_history(history[-10:])}
    
    ## Population Statistics
    - Best performance: {max(m.p for m in P):.4f}
    - Median performance: {median(m.p for m in P):.4f}
    - Best member's hyperparams: {format_dict(best_member(P).h)}
    
    ## Task
    Analyze the training dynamics and suggest improved hyperparameters.
    Think step by step:
    1. Is the learning rate too high/low for this training stage?
    2. Is regularization appropriate given the train/val gap?
    3. What adjustments would most likely improve performance?
    
    Output your suggested hyperparameters as JSON.
    """
    return prompt
```

##### 方法细节

**动机与背景**

PBT（Population Based Training）成功地将种群进化与梯度优化相结合，实现了在线超参数调度的自动发现。然而，PBT 的 explore 阶段依赖**随机扰动**（每个超参数独立地乘以 1.2 或 0.8，或从先验分布重采样），这种盲目探索存在明显局限：

- **无语义理解**：随机扰动不理解超参数之间的关联（如学习率与 batch size 的耦合关系），也不理解训练阶段对超参数的不同需求
- **固定步长**：±20% 的扰动幅度在训练早期可能太小（需要大范围探索），在训练后期可能太大（需要精细微调）
- **无历史利用**：每次扰动独立于之前的尝试，无法从失败的探索中学习

与此同时，大语言模型（LLM）展现出了强大的零样本推理能力。OPRO（Yang et al., 2024）证明 LLM 可以作为优化器，通过分析历史评估结果提出更好的解；FunSearch（Romera-Paredes et al., 2024）展示了 LLM 与进化搜索结合可以发现数学新知识。这些工作启发了一个自然的问题：**能否用 LLM 的推理能力替代 PBT 中的随机扰动，实现有知识引导的超参数进化？**

> 💡 **关键洞察**：AutoEP 的核心思想是——LLM 在预训练过程中已经"阅读"了大量关于机器学习训练技巧的论文和代码，因此它天然具备关于超参数调优的丰富知识。通过将训练状态编码为结构化 prompt，LLM 可以像一个经验丰富的研究员一样，分析训练动态并给出有理有据的超参数调整建议。

**核心机制详解**

AutoEP 保留了 PBT 的种群框架和 exploit 机制，核心创新集中在 explore 阶段的三个组件：

**1. 结构化上下文构建（Context Builder）**

为了让 LLM 有效推理，AutoEP 将种群的训练状态编码为结构化 prompt，包含四类信息：

- **当前超参数**：被 exploit 后复制得到的超参数值（学习率、权重衰减、dropout 等）
- **训练轨迹摘要**：最近 K 步的性能变化趋势（上升/下降/震荡）、训练损失与验证损失的差距（过拟合指标）
- **种群统计**：最优/中位/最差成员的性能及其超参数配置，帮助 LLM 理解当前搜索空间的分布
- **任务描述**：模型架构类型、数据集规模等元信息（可选）

> ⚠️ **注意**：prompt 的设计需要平衡信息量与 token 开销。过多的历史信息会增加推理成本且可能引入噪声，过少则无法支撑有效推理。AutoEP 采用**滑动窗口 + 统计摘要**的策略，将原始训练日志压缩为紧凑的结构化表示。

**2. Chain-of-Thought 推理引擎（CoT Reasoning）**

AutoEP 要求 LLM 在输出超参数之前，先进行显式的分步推理：

- **Step 1 — 诊断训练状态**：判断当前是否过拟合/欠拟合、学习率是否合适、训练是否已进入平台期
- **Step 2 — 分析种群信息**：比较当前成员与最优成员的超参数差异，识别可能的改进方向
- **Step 3 — 提出调整方案**：基于诊断结果，给出具体的超参数修改值及理由

这种 CoT 机制不仅提升了超参数建议的质量，还提供了**可解释性**——研究者可以阅读 LLM 的推理过程，理解为什么做出特定调整。

**3. 输出解析与安全校验（Parser & Validator）**

LLM 的输出经过两层处理：
- **JSON 解析器**：从 LLM 的自然语言输出中提取结构化的超参数值
- **安全校验器**：确保输出值在合法范围内（如学习率 > 0），对异常值进行裁剪（clip），并在 LLM 输出解析失败时回退到 PBT 的随机扰动作为兜底策略

**与 PBT 的关键区别**

| 特性 | PBT | AutoEP |
|------|-----|--------|
| Explore 策略 | 随机扰动（×1.2/×0.8）或重采样 | **LLM Chain-of-Thought 推理** |
| 语义理解 | 无 | **有**（理解超参数含义与关联） |
| 步长自适应 | 固定 ±20% | **动态**（LLM 根据训练阶段调整） |
| 历史利用 | 无 | **有**（prompt 包含训练轨迹） |
| 可解释性 | 无 | **有**（CoT 推理链可审查） |
| 额外开销 | 无 | LLM 推理延迟（每次 explore ~1-3s） |
| 零样本泛化 | 需手动设计扰动分布 | **跨任务通用**（同一 prompt 模板） |

**实验验证**

AutoEP 在多个基准任务上与 PBT 及其他超参数优化方法进行对比：

- **图像分类**（ResNet/ViT on ImageNet）：相比 PBT 的随机扰动，AutoEP 在相同种群规模下收敛速度提升约 **30-40%**，最终精度提升 0.3-0.5%
- **语言建模**（Transformer on WikiText-103）：AutoEP 自动发现了先大后小的学习率 schedule 与逐步增加 dropout 的策略，困惑度（PPL）优于 PBT 约 1.5 点
- **强化学习**（PPO on Atari）：在 Atari 游戏上，AutoEP 的种群多样性更高，避免了 PBT 中常见的种群坍缩（所有成员收敛到相同超参数）问题

消融实验的关键发现：
1. **CoT vs 直接输出**：要求 LLM 先推理再输出超参数，比直接输出超参数效果提升约 15%
2. **上下文信息量**：包含种群统计信息比仅包含当前成员信息效果更好，但超过 10 步历史后收益递减
3. **LLM 规模效应**：更大的 LLM（如 GPT-4 级别）比小模型（如 7B）产生更好的超参数建议，但 70B 级别模型已接近饱和
4. **回退机制必要性**：约 5-8% 的情况下 LLM 输出解析失败，回退到随机扰动的兜底策略对系统鲁棒性至关重要

#### 🧪 练习题
```yaml
question: "AutoEP 相比 PBT 的核心创新是什么？"
options:
  - "用贝叶斯优化替代种群进化框架"
  - "用 LLM 的 Chain-of-Thought 推理替代 explore 阶段的随机扰动"
  - "取消 exploit 机制，完全依赖 LLM 生成超参数"
  - "用强化学习训练一个超参数控制器"
answer: 1
explain: "AutoEP 的核心创新是用 LLM 的 Chain-of-Thought 推理替代 PBT 中 explore 阶段的随机扰动（×1.2/×0.8），使超参数变异具备语义理解能力。AutoEP 保留了 PBT 的种群框架和 exploit 机制，仅升级了 explore 策略。它不使用贝叶斯优化，也不取消 exploit，更不需要训练额外的控制器。"
```

### Composer

```yaml
id: composer
num: 20
name: Composer
full_name: '混合架构搜索 (Composer: Hybrid Neural Architecture Search)'
year: '2026'
org: ICLR 2026
parent: nasnet
paper_url: https://openreview.net/forum?id=13934
project_url: ''
category: nas
motivation: 模块化混合搜索+堆叠拉伸至8B
```

#### 📝 一句话总结
Composer 提出了一种模块化混合架构搜索框架，在异构算子库（Attention、SSM、Conv、MLP 等）中搜索最优层级组合模式，并通过"堆叠-拉伸"缩放策略将搜索到的小型代理架构无损扩展至 8B 参数规模，在语言建模任务上以更低计算成本超越纯 Transformer 架构。

#### 🎯 核心要点
- **异构算子搜索空间**：定义包含 Multi-Head Attention、Grouped-Query Attention、Mamba-2 SSM、Gated Conv1D、SwiGLU MLP、Linear Attention 共 6 类算子的模块化搜索空间
- **组合模式搜索（Composition Pattern Search）**：以"段（Segment）"为单位搜索算子排列，每段包含 \(K\) 层，搜索最优的算子类型分配
- **双阶段搜索策略**：Stage-1 在 150M 代理模型上用进化搜索确定组合模式，Stage-2 通过超网络权重共享微调算子内部超参数
- **堆叠-拉伸缩放法则（Stack-and-Stretch）**：将搜索到的段模式重复堆叠增加深度，同时按幂律拉伸隐藏维度，从 150M 无损扩展至 8B
- **缩放一致性定理**：证明在特定初始化条件下，堆叠-拉伸保持各层梯度范数比例不变，保证训练稳定性
- **多目标帕累托搜索**：同时优化困惑度（PPL）、推理吞吐量（tokens/s）和峰值显存，输出帕累托前沿架构族
- **搜索效率**：仅需 256 GPU-hours 完成全部搜索（含 Stage-1 + Stage-2），约为同规模随机搜索的 1/40
- **SOTA 结果**：Composer-8B 在 C4/Pile 上以 6.8/7.2 PPL 超越同参数量 Llama 架构（7.3/7.8），推理吞吐量提升 1.7×

#### 🔬 深入细节
![Composer 混合架构搜索框架](https://production-media.paperswithcode.com/methods/composer_framework.png)
*图：Composer 框架总览。左侧为异构算子库，中间为组合模式搜索过程（进化算法在代理模型上评估不同算子排列），右侧为堆叠-拉伸缩放策略将最优模式扩展至目标规模。*

##### 算法伪代码

```python
# Composer: 混合架构搜索流程
# Stage 1: 组合模式搜索 (Evolutionary Search)

operator_library = [MultiHeadAttn, GQA, Mamba2, GatedConv1D, SwiGLU, LinearAttn]
segment_length = K  # 每段包含 K 层 (e.g., K=4)

# 初始化种群: 随机生成 P 个组合模式
population = [random_composition(segment_length, operator_library) for _ in range(P)]

for generation in range(G):
    # 评估每个候选架构 (150M proxy model, 训练 2B tokens)
    fitness = []
    for pattern in population:
        model = build_proxy_model(pattern, hidden_dim=768, num_segments=6)
        ppl = train_and_eval(model, data="C4_subset", tokens=2e9)
        throughput = measure_throughput(model, batch_size=32, seq_len=2048)
        fitness.append(pareto_score(ppl, throughput))
    
    # 选择 + 交叉 + 变异
    parents = tournament_select(population, fitness, top_k=P//4)
    offspring = crossover(parents) + mutate(parents, prob=0.1)
    population = elitism_merge(population, offspring, fitness)

best_pattern = pareto_front(population, fitness)[0]  # e.g., [Attn, Mamba2, Mamba2, GatedConv1D]

# Stage 2: 堆叠-拉伸缩放至目标规模
def scale_to_target(pattern, target_params=8e9):
    # 堆叠: 重复段模式直到达到目标深度
    num_segments = compute_depth(target_params, pattern)  # e.g., 16 segments → 64 layers
    # 拉伸: 按幂律扩展隐藏维度
    hidden_dim = compute_width(target_params, num_segments)  # e.g., 4096
    return build_model(pattern, hidden_dim, num_segments)

final_model = scale_to_target(best_pattern, target_params=8e9)
# 全量预训练 final_model on 2T tokens
```

##### 动机与背景

近年来，大语言模型（LLM）领域出现了一个重要趋势：**纯 Transformer 架构并非所有场景的最优选择**。Mamba、RWKV、Hyena 等亚二次复杂度模型在长序列建模上展现出优势，而实践中 Jamba、Zamba 等工作表明，混合架构（交替使用 Attention 和 SSM 层）往往能兼顾两者优点。

然而，混合架构的设计面临两个核心挑战：

1. **组合爆炸**：假设有 6 种算子、64 层网络，可能的排列组合为 \(6^{64} \approx 10^{50}\)，远超人工试错能力
2. **缩放不确定性**：在小规模验证的最优组合，放大后是否仍然最优？不同算子的缩放行为（scaling law）可能不同

Composer 的核心洞察继承自 NASNet 的"搜索-迁移"范式：**在小型代理模型上搜索最优的算子组合模式（而非完整架构），再通过理论保证的缩放法则扩展至目标规模**。

##### 核心机制：模块化组合搜索空间

**1. 异构算子库**

Composer 定义了 6 种标准化算子模块，每种算子统一为相同的输入输出接口 \(\mathbf{x} \in \mathbb{R}^{B \times L \times D} \to \mathbf{y} \in \mathbb{R}^{B \times L \times D}\)：

| 算子 | 复杂度 | 特点 |
|------|--------|------|
| Multi-Head Attention (MHA) | \(O(L^2 D)\) | 全局依赖，KV cache 线性增长 |
| Grouped-Query Attention (GQA) | \(O(L^2 D)\) | 减少 KV heads，推理更高效 |
| Mamba-2 SSM | \(O(LD)\) | 线性复杂度，硬件友好的选择性扫描 |
| Gated Conv1D | \(O(LDk)\) | 局部感受野，极低延迟 |
| SwiGLU MLP | \(O(LD_{\text{ff}})\) | 纯前馈，无序列交互 |
| Linear Attention | \(O(LD^2)\) | 线性复杂度的全局注意力近似 |

> 💡 关键：所有算子共享相同的 Pre-RMSNorm + Residual 包装结构，使得任意算子可在任意位置即插即用，搜索空间完全正交。

**2. 段级组合模式（Segment-Level Composition）**

与 NASNet 搜索 Cell 内部连接不同，Composer 搜索的是**层级算子类型分配**。网络被划分为等长的"段"，每段包含 \(K\) 层：

$$\text{Segment}(k_1, k_2, \ldots, k_K) \quad \text{where } k_i \in \{\text{MHA, GQA, Mamba2, Conv1D, SwiGLU, LinAttn}\}$$

整个网络由 \(S\) 个相同段重复堆叠构成：

$$\text{Network} = \text{Embed} \to \underbrace{\text{Seg} \to \text{Seg} \to \cdots \to \text{Seg}}_{S \text{ 次}} \to \text{LM-Head}$$

> ⚠️ 注意：段内的算子排列顺序是搜索目标，但所有段共享相同模式——这是实现可缩放堆叠的关键约束。

**3. 搜索空间规模分析**

对于段长 \(K=4\)，6 种算子的排列数为：

$$|\mathcal{S}| = 6^K = 6^4 = 1296$$

这比 NASNet 的 \(10^{28}\) 小得多，但每个候选需要实际训练评估，因此采用进化搜索而非穷举。加入算子内部超参数（如 attention head 数、SSM state 维度）后，有效搜索空间约为 \(10^5\)。

##### 堆叠-拉伸缩放法则（Stack-and-Stretch）

这是 Composer 最核心的理论贡献。给定代理模型的最优段模式 \(\mathcal{P}^*\)，如何将 150M 模型扩展至 8B？

**堆叠（Stack）**：增加段重复次数 \(S\)

$$S_{\text{target}} = S_{\text{proxy}} \cdot \alpha_d, \quad \alpha_d = \left(\frac{N_{\text{target}}}{N_{\text{proxy}}}\right)^{r_d}$$

**拉伸（Stretch）**：增加隐藏维度 \(D\)

$$D_{\text{target}} = D_{\text{proxy}} \cdot \alpha_w, \quad \alpha_w = \left(\frac{N_{\text{target}}}{N_{\text{proxy}}}\right)^{r_w}$$

其中 \(r_d + 2r_w \approx 1\)（因为参数量 \(N \propto S \cdot D^2\)），论文通过网格搜索确定最优比例为 \(r_d = 0.4, r_w = 0.3\)。

**缩放一致性定理**：

$$\text{若 } \frac{\|\nabla_{\ell} \mathcal{L}\|}{\|\nabla_{\ell'} \mathcal{L}\|} = c_{\ell,\ell'} \text{ 在 proxy 模型中成立，则在 Stack-and-Stretch 后仍成立}$$

条件是使用 μP（Maximal Update Parameterization）初始化，并对不同算子类型使用各自的学习率乘子。这保证了小模型上的最优组合在放大后仍然是最优的。

> 💡 关键：缩放一致性是 Composer 能够在 150M 上搜索、8B 上部署的理论基石。没有这一保证，代理模型的搜索结果可能在大规模上失效。

##### 多目标进化搜索

Composer 使用 NSGA-II 风格的多目标进化算法，同时优化三个指标：

1. **困惑度（PPL）**：在 C4 验证集上评估语言建模质量
2. **推理吞吐量**：在 A100 GPU 上测量 tokens/s（batch=1, seq=2048）
3. **峰值显存**：推理时的 GPU 内存占用

适应度函数为帕累托支配关系，最终输出一组帕累托前沿架构，用户可根据部署约束选择。

搜索超参数：
- 种群大小：\(P = 128\)
- 进化代数：\(G = 50\)
- 代理模型：150M 参数，训练 2B tokens（约 4 GPU-hours/个体）
- 总搜索预算：128 × 4 × 50 / 并行度 ≈ 256 GPU-hours

##### 实验结果与对比

**语言建模（8B 规模，2T tokens 训练）**：

| 模型 | 架构类型 | 参数量 | C4 PPL | Pile PPL | 吞吐量 (tok/s) |
|------|----------|--------|--------|----------|----------------|
| Llama-2 | 纯 Transformer (GQA) | 7B | 7.3 | 7.8 | 4,200 |
| Mamba-2 | 纯 SSM | 7.8B | 7.5 | 7.9 | 6,800 |
| Jamba | 手工混合 (Attn+Mamba) | 7.4B | 7.1 | 7.5 | 5,100 |
| **Composer-8B** | **搜索混合** | **8.0B** | **6.8** | **7.2** | **7,100** |

**搜索发现的最优模式**（段长 K=4）：

$$\mathcal{P}^* = [\text{GQA},\; \text{Mamba2},\; \text{Mamba2},\; \text{GatedConv1D}]$$

即每 4 层中仅 1 层使用注意力机制，其余使用亚二次复杂度算子。这一比例（25% Attention）显著低于手工设计的混合架构（通常 50%），但在搜索验证中被证明是 PPL-吞吐量帕累托最优的。

##### 与传统方法的区别

| 维度 | NASNet (2018) | DARTS (2019) | Composer (2026) |
|------|---------------|--------------|-----------------|
| 搜索目标 | CNN Cell 内部连接 | CNN Cell 内部连接 | LLM 层级算子类型分配 |
| 算子类型 | 同构（卷积/池化） | 同构（卷积/池化） | 异构（Attn/SSM/Conv/MLP） |
| 搜索方法 | RL (PPO) | 梯度松弛 | 多目标进化 (NSGA-II) |
| 缩放策略 | 增加 N 和滤波器数 | 增加 N 和滤波器数 | 堆叠-拉伸 + μP + 缩放一致性定理 |
| 目标规模 | ~100M (ImageNet) | ~10M (CIFAR) | **8B (LLM)** |
| 搜索成本 | 2000 GPU-hours | 1 GPU-day | 256 GPU-hours |
| 多目标 | 否 | 否 | 是（PPL + 吞吐 + 显存） |

Composer 的核心贡献在于将 NAS 的"搜索-迁移"范式从 CV 领域的同构算子搜索，推广到 LLM 领域的**异构算子组合搜索**，并通过缩放一致性定理解决了"小模型搜索结果能否迁移到大模型"这一关键问题。

#### 🧪 练习题
```yaml
question: "Composer 能够将 150M 代理模型的搜索结果可靠迁移到 8B 规模的关键理论保证是什么？"
options:
  - "使用 NSGA-II 多目标进化算法确保帕累托最优性"
  - "所有算子共享 Pre-RMSNorm + Residual 包装结构"
  - "堆叠-拉伸缩放法则在 μP 初始化下保持各层梯度范数比例不变（缩放一致性定理）"
  - "段内算子排列顺序在所有段中保持一致"
answer: 2
explain: "缩放一致性定理证明在 μP 初始化条件下，Stack-and-Stretch 操作保持各层梯度范数比例不变，确保小模型上的最优组合在放大后仍然最优，这是跨规模迁移的理论基石。"
```

### Jet-Nemotron

```yaml
id: jet_nemotron
num: 21
name: Jet-Nemotron
full_name: '后训练NAS (Jet-Nemotron: Post Neural Architecture Search)'
year: '2026'
org: NVIDIA
parent: ofa
paper_url: https://arxiv.org/abs/2508.15884v1
project_url: ''
category: nas
motivation: 冻结权重后训练结构优化加速53x
```

#### 📝 一句话总结
Jet-Nemotron 提出 PostNAS（后训练神经架构搜索）方法，通过四步系统化流程将预训练的全注意力 Transformer 转换为高效的混合注意力架构，在保持甚至超越原模型精度的同时实现高达 53× 的推理吞吐提升。

#### 🎯 核心要点
- 提出 PostNAS 框架：后训练阶段对已有模型进行架构搜索，无需从头预训练
- 四步搜索流程：全注意力层放置 → 线性注意力变体选择 → JetBlock 设计 → 硬件感知滑动窗口搜索
- JetBlock 设计：线性注意力 + 动态卷积（DyConv），用输入依赖的卷积核补偿线性注意力的局部建模缺陷
- 关键发现：KV cache 大小是决定解码吞吐的主导因素，而非 FLOPs
- 两阶段训练：第一阶段冻结 MLP 用蒸馏损失训练 50B tokens，第二阶段全模型训练 350B tokens
- 模型家族：Jet-Nemotron-2B（基于 Qwen2.5-1.5B）和 Jet-Nemotron-4B（基于 Qwen2.5-3B）
- 性能：Jet-Nemotron-2B 相比 Llama-3.2-3B 实现 53× 吞吐提升，相比 Qwen3-1.7B 实现 47× 吞吐提升，精度更优

#### 🔬 深入细节
![Jet-Nemotron PostNAS 框架总览](https://arxiv.org/html/2508.15884v1/x1.png)
*图：PostNAS 四步搜索流程示意。从预训练的全注意力模型出发，逐步确定全注意力层位置、线性注意力变体、注意力块设计和滑动窗口层配置。*

```python
# PostNAS 四步搜索伪代码
def PostNAS(pretrained_model):
    # Step 1: 确定保留全注意力的层（用检索任务评估）
    full_attn_layers = search_full_attention_placement(
        model=pretrained_model,
        task="retrieval",  # NIAH/RULER
        metric="accuracy"
    )
    
    # Step 2: 选择最佳线性注意力变体（用困惑度评估）
    linear_attn_type = select_linear_attention(
        candidates=["HGRN2", "GLA", "DeltaNet", "Mamba2", ...],
        metric="perplexity",
        data="pretraining_corpus"
    )
    
    # Step 3: 设计 JetBlock（线性注意力 + 动态卷积）
    jet_block = JetBlock(
        linear_attention=linear_attn_type,
        dynamic_conv=DyConv(kernel_size=searched)
    )
    
    # Step 4: 硬件感知搜索滑动窗口注意力层
    swa_layers = hardware_aware_search(
        model=model,
        task="MMLU",
        constraint="maximize_throughput"
    )
    
    # 组装最终混合架构
    hybrid_model = assemble(full_attn_layers, jet_block, swa_layers)
    
    # 两阶段训练
    stage1_train(hybrid_model, tokens=50B, freeze_mlp=True, loss="distillation")
    stage2_train(hybrid_model, tokens=350B, freeze_mlp=False)
    
    return hybrid_model
```

##### 动机与背景

大语言模型（LLM）的推理效率受限于标准 Transformer 中 softmax 注意力的 \(O(n^2)\) 复杂度和线性增长的 KV cache。虽然线性注意力、状态空间模型等替代方案已被提出，但它们通常需要从头预训练，且在关键能力（如长距离检索）上存在明显不足。

> 💡 关键洞察：**KV cache 大小是推理吞吐的决定性瓶颈**，而非计算 FLOPs。即使模型参数量更大，只要 KV cache 足够小，解码吞吐就能大幅提升。

PostNAS 的核心思路是：**不从头训练，而是将已有的高质量全注意力模型"改造"为混合架构**，通过系统化的搜索确定最优的层级配置，再用少量训练恢复精度。

##### Step 1：全注意力层放置

并非所有注意力层都可以被替换。论文发现，某些层对长距离信息检索至关重要。搜索策略如下：

1. 使用 Needle-in-a-Haystack（NIAH）和 RULER 等检索任务作为评估标准
2. 逐层测试：将某一层替换为线性注意力后，观察检索精度下降程度
3. 保留那些替换后精度显著下降的层作为全注意力层

对于 Jet-Nemotron-2B（基于 Qwen2.5-1.5B 的 28 层），最终保留第 15 和第 20 层为全注意力层。对于 Jet-Nemotron-4B（基于 Qwen2.5-3B 的 36 层），保留第 18、21、33 层。

##### Step 2：线性注意力变体选择

在确定哪些层需要替换后，需要选择最优的线性注意力变体。论文比较了多种候选方案：

- **HGRN2**：基于门控线性循环的模型
- **GLA**（Gated Linear Attention）：门控线性注意力
- **DeltaNet**：基于增量规则的线性注意力
- **Mamba2**：结构化状态空间模型

评估方法是将所有可替换层统一替换为某一变体，然后在预训练语料上测量困惑度（perplexity）。实验发现 **DeltaNet** 在困惑度指标上表现最优，因此被选为 JetBlock 的线性注意力组件。

##### Step 3：JetBlock 设计——线性注意力 + 动态卷积

JetBlock 是本文的核心架构创新。其设计动机来自对线性注意力局限性的分析：

$$\text{LinearAttn}(Q, K, V) = \frac{\phi(Q) \cdot (\phi(K)^T V)}{\phi(Q) \cdot \phi(K)^T \mathbf{1}}$$

线性注意力通过将 softmax 替换为特征映射 \(\phi\) 来实现线性复杂度，但这导致其**局部建模能力不足**——softmax 注意力天然具有的局部聚焦特性（近距离 token 获得更高权重）在线性注意力中丢失。

> ⚠️ 注意：线性注意力的固定大小状态无法精确保留所有历史信息，尤其是近距离的局部模式。

为此，JetBlock 引入**动态卷积（DyConv）**来补偿局部建模能力：

$$\text{JetBlock}(X) = \text{LinearAttn}(X) + \text{DyConv}(X)$$

动态卷积的核心是**输入依赖的卷积核**：

$$\text{DyConv}(X)_t = \sum_{k=0}^{K-1} w_k(X_t) \cdot X_{t-k}$$

其中卷积核权重 \(w_k(X_t)\) 由当前输入动态生成（通过一个小型线性层），而非固定参数。这使得模型能够根据上下文自适应地聚焦局部信息。

##### Step 4：硬件感知滑动窗口注意力搜索

论文发现，某些任务（如 MMLU 等多选题）主要依赖 softmax 操作的模式匹配特性来将知识路由到选项。完全移除 softmax 会导致这类任务精度下降。

解决方案是引入**滑动窗口注意力（SWA）**层——它保留了 softmax 的模式匹配能力，但窗口大小有限（如 4096 tokens），因此 KV cache 增长受限，不会显著影响吞吐。

搜索策略：
1. 以 MMLU 精度为目标，逐步添加 SWA 层
2. 同时监控吞吐影响，确保添加的 SWA 层不会过度降低推理速度
3. 最终 Jet-Nemotron-2B 使用 2 个 SWA 层，Jet-Nemotron-4B 使用 7 个 SWA 层

##### 训练流程

训练分为两个阶段：

**第一阶段（蒸馏，50B tokens）：**
- 冻结所有 MLP 层参数（保留原模型知识）
- 仅训练新引入的线性注意力和动态卷积参数
- 使用蒸馏损失，以原始全注意力模型为教师
- 数据：Nemotron-CC + Redstone-QA

**第二阶段（全模型训练，350B tokens）：**
- 解冻所有参数进行端到端训练
- 加入更多高质量数学和代码数据
- 总训练量仅为原始预训练的约 2%（Qwen2.5-1.5B 预训练用了 18T tokens）

##### 与传统方法的区别

| 维度 | 传统混合模型 | PostNAS (Jet-Nemotron) |
|------|-------------|----------------------|
| 训练起点 | 从头预训练 | 复用已有预训练模型 |
| 架构设计 | 人工设计或简单规则 | 系统化四步搜索 |
| 搜索代价 | 需要完整预训练验证 | 仅需少量 token 评估 |
| 训练成本 | 数万亿 tokens | 400B tokens（~2%） |
| 吞吐优化 | 关注 FLOPs | 关注 KV cache 大小 |

> 💡 关键优势：PostNAS 将架构搜索与预训练解耦，使得任何高质量的全注意力模型都可以被高效地转换为混合架构，大幅降低了开发高效 LLM 的成本。

#### 🧪 练习题
```yaml
question: "Jet-Nemotron 中 JetBlock 引入动态卷积（DyConv）的主要目的是什么？"
options:
  - "减少模型参数量以提升推理速度"
  - "补偿线性注意力在局部模式建模上的不足"
  - "替代 MLP 层以降低计算复杂度"
  - "增强模型在长距离检索任务上的能力"
answer: 1
explain: "线性注意力用固定大小状态替代了 KV cache，丢失了 softmax 注意力天然的局部聚焦特性。动态卷积通过输入依赖的卷积核显式建模局部依赖，补偿了这一缺陷。"
```
