### SMAC — Sequential Model-based Algorithm Configuration

```yaml
id: smac
name: SMAC
full_name: "Sequential Model-based Algorithm Configuration"
year: 2011
org: UBC
paper_url: "https://ml.informatik.uni-freiburg.de/papers/11-LION5-SMAC.pdf"
category: foundation
parent: "—"
motivation: "用随机森林代理模型处理条件参数"
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