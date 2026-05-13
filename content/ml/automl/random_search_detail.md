### Random Search for Hyper-Parameter Optimization

```yaml
id: random_search
name: Random Search
full_name: 随机搜索超参数优化 (Random Search for Hyper-Parameter Optimization)
year: 2012
org: U Montreal
paper_url: https://www.jmlr.org/papers/volume13/bergstra12a/bergstra12a.pdf
category: hpo
parent: —
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