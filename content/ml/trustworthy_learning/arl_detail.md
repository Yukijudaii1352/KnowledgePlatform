### ARL: 对抗重加权学习 (Adversarially Reweighted Learning)

```yaml
id: arl
name: ARL
full_name: 对抗重加权学习 (Adversarially Reweighted Learning)
year: "2020"
org: Google Research
paper_url: https://arxiv.org/abs/2006.13114
venue: NeurIPS 2020
category: trustworthy_learning
parent: —
motivation: 在无人口统计标签条件下，通过对抗网络识别计算可辨识的高损失子群并重加权样本，实现Rawlsian Max-Min公平
```

#### 📝 一句话总结

ARL 提出了一种对抗重加权学习框架，通过训练一个对抗网络自动识别模型表现最差的"计算可辨识"子群并对其样本上调权重，在**无需访问受保护人口统计特征**的条件下实现了 Rawlsian Max-Min 公平性，显著优于分布鲁棒优化（DRO）等基线方法。

#### 🎯 核心要点

- **问题设定**：无人口统计标签的公平学习（Fairness without Demographics）——训练和推理时均无受保护群体标签 \(S\)
- **公平目标**：Rawlsian Max-Min 公平性 \(h^* = \arg\max_h \min_s U_{D_s}(h)\)，最大化最差子群的效用
- **核心假设**：受保护群体 \(S\) 与可观测特征 \(X\) 和标签 \(Y\) 存在相关性，使得高损失区域"计算可辨识"
- **对抗框架**：Learner \(h_\theta\) 与 Adversary \(f_\phi\) 构成 minimax 博弈，Adversary 输出样本权重 \(\lambda_\phi(x_i, y_i) \in [0,1]\)
- **与 DRO 的关键区别**：DRO 关注任意最坏情况分布（易过拟合噪声/离群点），ARL 仅关注由 Adversary 网络"计算可辨识"的子群
- **实验验证**：在 Adult、LSAC、COMPAS 三个数据集上，ARL 在 AUC(min) 和 AUC(minority) 上均优于 ERM、DRO 和 IPW 基线
- **额外发现**：ARL 不仅提升最差子群性能，还同时提升了整体 AUC（约 1pp），打破了公平-效用权衡的传统假设

#### 🔬 深入细节

```
┌─────────────────────────────────────────────────────────┐
│                    ARL 框架示意图                          │
│                                                         │
│   训练数据 (X, Y)                                        │
│        │                                                │
│        ├──────────────────┐                             │
│        ▼                  ▼                             │
│  ┌──────────┐      ┌──────────────┐                    │
│  │ Adversary │      │   Learner    │                    │
│  │  f_φ(X,Y) │      │   h_θ(X)     │                    │
│  │  →[0,1]   │      │   →预测 Ŷ    │                    │
│  └─────┬─────┘      └──────┬───────┘                    │
│        │ λ_φ(样本权重)       │ ℓ(Ŷ,Y)(逐样本损失)        │
│        └────────┬───────────┘                           │
│                 ▼                                       │
│     加权损失 = Σ λ_φ(xi,yi) · ℓ(h_θ(xi), yi)           │
│                 │                                       │
│        ┌────────┴────────┐                              │
│        ▼                 ▼                              │
│  Learner: min_θ     Adversary: max_φ                    │
│  (减小加权损失)      (增大加权损失)                        │
└─────────────────────────────────────────────────────────┘
```
*图：ARL 对抗重加权框架——Adversary 网络 f_φ 根据 (X, Y) 为每个样本生成权重 λ，Learner h_θ 在加权损失上最小化，形成 minimax 博弈*

```python
# ARL 对抗重加权学习 伪代码
# 输入: 训练数据 D = {(x_i, y_i)}, 学习率 η_θ, η_φ
# Learner h_θ: 主分类器
# Adversary f_φ: 权重生成网络, f_φ(x,y) → [0,1]

for epoch in range(num_epochs):
    for batch (X, Y) in D:
        # Step 1: Adversary 生成样本权重
        raw_weights = f_phi(X, Y)  # sigmoid输出 ∈ [0,1]
        lambda_weights = raw_weights / sum(raw_weights)  # 归一化为分布
        
        # Step 2: 计算加权损失
        losses = cross_entropy(h_theta(X), Y)  # 逐样本损失
        weighted_loss = sum(lambda_weights * losses)
        
        # Step 3: 更新 Learner (最小化加权损失)
        theta = theta - eta_theta * grad(weighted_loss, theta)
        
        # Step 4: 更新 Adversary (最大化加权损失)
        phi = phi + eta_phi * grad(weighted_loss, phi)
```

##### 动机与背景

现实中的机器学习公平性面临一个核心矛盾：**大多数公平性方法需要受保护群体标签（如种族、性别），但出于隐私法规和数据收集限制，这些标签往往不可用**。例如，欧盟 GDPR 严格限制了敏感属性的收集，美国多个州也禁止在信贷决策中使用种族信息。

在此约束下，先前工作主要采用分布鲁棒优化（DRO）方法，试图优化任意最坏情况分布下的性能。然而，DRO 存在根本性缺陷：

> ⚠️ 注意：DRO 优化的是**任意**最坏情况分布，这意味着它可能将大量优化资源花费在噪声离群点上，而非真正的受保护子群。当数据存在标签噪声时，DRO 的性能会显著退化。

ARL 的核心洞察是：与其优化任意最坏情况，不如聚焦于**计算可辨识**（computationally-identifiable）的高损失区域——即那些可以被一个函数类从输入特征和标签中识别出来的子群。

##### 核心机制：对抗重加权

**1. 计算可辨识性假设**

ARL 的理论基础建立在以下假设上：未观测的受保护群体 \(S\) 与可观测特征 \(X\) 和标签 \(Y\) 之间存在统计相关性。形式化地：

$$P(S | X, Y) \neq P(S)$$

这意味着即使不直接观测 \(S\)，也可以通过 \((X, Y)\) 的模式间接识别出受保护子群的高损失区域。

**2. Minimax 优化目标**

ARL 将公平学习形式化为一个 minimax 博弈：

$$J(\theta, \phi) = \min_\theta \max_\phi \sum_{i=1}^{n} \lambda_\phi(x_i, y_i) \cdot \ell(h_\theta(x_i), y_i)$$

其中：
- \(h_\theta\)：主分类器（Learner），参数为 \(\theta\)
- \(f_\phi\)：对抗网络（Adversary），参数为 \(\phi\)，输出 \(f_\phi(x_i, y_i) \in [0,1]\)
- \(\lambda_\phi(x_i, y_i) = \frac{f_\phi(x_i, y_i)}{\sum_j f_\phi(x_j, y_j)}\)：归一化后的样本权重

> 💡 关键：Adversary 的作用是找到当前 Learner 表现最差的"计算可辨识"区域，并通过上调这些区域样本的权重来迫使 Learner 改善对它们的预测。

**3. Adversary 的设计**

Adversary 网络 \(f_\phi\) 接受 \((X, Y)\) 作为输入，输出经 sigmoid 激活的标量权重。论文发现：

- **线性 Adversary**（即逻辑回归）在小数据集上效果最佳，因为其容量有限，不会过拟合到单个噪声样本
- 非线性 Adversary 在某些设置下可能过拟合，行为退化为类似 DRO 的逐样本上调
- Adversary 同时接收特征 \(X\) 和标签 \(Y\) 作为输入，这使其能够识别特定 \((X, Y)\) 组合下的系统性错误模式

**4. 与 DRO 的形式化对比**

DRO 的目标可以写为：

$$\min_\theta \max_{\lambda \in \Delta_n} \sum_{i=1}^{n} \lambda_i \cdot \ell(h_\theta(x_i), y_i)$$

其中 \(\Delta_n\) 是 \(n\) 维单纯形上的所有分布。关键区别在于：
- DRO 中 \(\lambda\) 是自由优化变量，可以将所有权重集中在单个最高损失样本上
- ARL 中 \(\lambda_\phi\) 受限于 Adversary 网络 \(f_\phi\) 的函数类，只能识别**系统性**的高损失模式

$$\text{DRO}: \lambda^* = \arg\max_{\lambda \in \Delta_n} \quad \text{vs} \quad \text{ARL}: \lambda^*_\phi = \frac{f_\phi^*(\cdot)}{\sum f_\phi^*(\cdot)}, \; f_\phi \in \mathcal{F}$$

##### 训练与优化流程

ARL 采用交替优化策略：

1. **固定 Adversary，更新 Learner**：在当前权重分布下最小化加权损失
2. **固定 Learner，更新 Adversary**：找到使加权损失最大的权重分配

实践中的关键细节：
- Learner 和 Adversary 使用不同的学习率（Adversary 通常更小）
- 权重归一化确保 \(\sum \lambda_i = 1\)，形成有效的概率分布
- 训练使用标准 SGD/Adam，无需特殊优化器

##### 实验结果与分析

在三个标准公平性基准数据集上的结果：

| 数据集 | 方法 | AUC(avg) | AUC(min) | AUC(minority) |
|--------|------|----------|----------|---------------|
| Adult | ERM | 0.906 | 0.870 | 0.877 |
| Adult | DRO | 0.901 | 0.871 | 0.892 |
| Adult | **ARL** | **0.907** | **0.881** | **0.942** |
| LSAC | ERM | 0.814 | 0.789 | 0.793 |
| LSAC | DRO | 0.817 | 0.795 | 0.797 |
| LSAC | **ARL** | **0.823** | **0.798** | **0.832** |

关键发现：
- ARL 在 Adult 数据集上将少数群体 AUC 提升了 **+6.5pp**（0.877→0.942）
- ARL 同时提升了整体 AUC，打破公平-效用权衡假设
- 在 COMPAS 数据集上 ARL 无显著提升，原因是该数据集的受保护群体不满足"计算可辨识性"条件，且标签噪声严重
- ARL 优于 IPW（逆概率加权），即使后者拥有完整的群体标签信息

> 💡 关键：ARL 学到的权重具有可解释性——被误分类的样本被上调权重，且 ARL 自动学会了处理类别不平衡问题（对少数类整体赋予更高权重）。

##### 鲁棒性分析

论文通过合成实验验证了 ARL 对不同类型偏差的鲁棒性：
- **表征偏差**（Representation Bias）：少数群体在训练数据中比例不足——ARL 表现稳健
- **标签偏差**（Label Bias）：少数群体标签被系统性翻转——ARL 对中等程度标签噪声鲁棒，但极端噪声下性能下降
- **计算可辨识性验证**：通过训练分类器预测群体标签，验证了 Adult/LSAC 中群体可辨识（AUC>0.8），而 COMPAS 中不可辨识（AUC≈0.5）

#### 🧪 练习题

```yaml
question: "ARL 相比 DRO 的核心优势是什么？"
options:
  - "ARL 使用更复杂的神经网络架构，因此拟合能力更强"
  - "ARL 通过 Adversary 网络限制了权重分配的函数类，避免过拟合到噪声离群点"
  - "ARL 需要访问受保护群体标签，因此信息更充分"
  - "ARL 采用了更先进的优化算法，收敛速度更快"
answer: 1
explain: "DRO 允许权重在整个单纯形上自由优化，可能将权重集中在单个噪声样本上；ARL 的权重受限于 Adversary 网络的函数类，只能识别系统性的高损失模式（计算可辨识子群），从而避免过拟合离群点。"
```