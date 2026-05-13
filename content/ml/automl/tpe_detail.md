### TPE — 树结构Parzen估计器 (Tree-structured Parzen Estimator)

```yaml
id: tpe
name: TPE
full_name: 树结构Parzen估计器 (Tree-structured Parzen Estimator)
year: '2011'
org: University of Sherbrooke
paper_url: https://papers.nips.cc/paper/2011/hash/86e8f7ad327462834789d7b64455531f-Abstract.html
category: hpo
parent: —
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