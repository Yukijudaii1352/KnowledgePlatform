### Hyperband

```yaml
id: hyperband
name: Hyperband
full_name: 超级带 (Hyperband: A Novel Bandit-Based Approach)
year: '2018'
org: UC Berkeley
paper_url: https://www.jmlr.org/papers/v18/16-065.html
category: hpo
parent: random_search
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