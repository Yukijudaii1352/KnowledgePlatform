### BOHB — 贝叶斯优化与Hyperband (Bayesian Optimization and Hyperband)

```yaml
id: bohb
name: BOHB
full_name: "贝叶斯优化与Hyperband (Bayesian Optimization and Hyperband)"
year: 2018
org: University of Freiburg
paper_url: "https://arxiv.org/abs/1807.01774"
category: automl
parent: hyperband
motivation: "用KDE替代随机采样指导Hyperband配置选择，结合BO的样本效率与Hyperband加速"
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