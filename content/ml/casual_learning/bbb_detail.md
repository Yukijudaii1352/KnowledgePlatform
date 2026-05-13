### Bayes by Backprop (BBB)

```yaml
id: bbb
name: Bayes by Backprop
full_name: 权重不确定性神经网络 (Weight Uncertainty in Neural Networks)
year: 2015
org: DeepMind
paper_url: https://arxiv.org/abs/1505.05424
category: foundation
parent: —
motivation: 通过变分推断学习神经网络权重的后验分布
```

#### 📝 一句话总结

Bayes by Backprop 提出了一种可扩展的变分推断算法，通过重参数化技巧（reparameterization trick）学习神经网络权重的后验概率分布（而非点估计），实现了正则化、模型压缩和不确定性量化的统一框架。

#### 🎯 核心要点

- 将神经网络权重建模为概率分布（对角高斯），通过最小化变分自由能进行训练
- 重参数化技巧：\(w = \mu + \log(1+\exp(\rho)) \circ \epsilon\)，\(\epsilon \sim \mathcal{N}(0, I)\)，使梯度可通过标准反向传播计算
- 损失函数分解为复杂度代价（KL散度）和数据似然代价：\(\mathcal{F}(\mathcal{D}, \theta) = \text{KL}[q(w|\theta) \| P(w)] - \mathbb{E}_{q}[\log P(\mathcal{D}|w)]\)
- Scale Mixture 先验：\(P(w) = \pi \mathcal{N}(0, \sigma_1^2) + (1-\pi)\mathcal{N}(0, \sigma_2^2)\)，鼓励权重稀疏分布
- Minibatch KL 重加权策略：\(\pi_i = \frac{2^{M-i}}{2^M - 1}\)，使训练早期更受先验约束
- 信噪比剪枝：利用 \(|\mu_i|/\sigma_i\) 排序权重，移除95%权重后性能几乎不降
- Thompson Sampling 应用：从后验采样权重实现探索-利用平衡，适用于上下文赌博机问题

#### 🔬 深入细节

![Bayes by Backprop 框架示意](https://arxiv.org/html/1505.05424v1/extracted/figures/fig1.png)
*图：Bayes by Backprop 通过学习权重分布参数 \(\theta = (\mu, \rho)\) 替代传统点估计，每次前向传播从分布中采样权重*

##### 算法伪代码

```python
# Bayes by Backprop 核心算法
# 输入: 变分参数 θ = (μ, ρ), 训练数据 D

def bayes_by_backprop(D, θ, num_samples=1):
    """
    θ = (μ, ρ) 为变分后验参数
    σ = log(1 + exp(ρ))  # softplus 确保正值
    """
    f_total = 0
    for _ in range(num_samples):
        # 1. 采样噪声
        ε ~ N(0, I)
        # 2. 重参数化得到权重样本
        w = μ + log(1 + exp(ρ)) ⊙ ε
        # 3. 计算变分自由能
        f = log q(w|θ) - log P(w) - log P(D|w)
        #     复杂度代价        数据似然代价
        f_total += f
    
    f_total /= num_samples
    
    # 4. 计算梯度（通过标准反向传播）
    Δμ = ∂f/∂w + ∂f/∂μ           # = ∂f/∂w · 1 + ∂(log q)/∂μ
    Δρ = ∂f/∂w · ε/(1+exp(-ρ)) + ∂f/∂ρ  # 链式法则
    
    # 5. 更新参数
    μ ← μ - α · Δμ
    ρ ← ρ - α · Δρ
```

##### 动机与背景

传统神经网络训练通过最大似然估计（MLE）或最大后验估计（MAP）获得权重的**点估计**。这种方法存在三个根本缺陷：

1. **过拟合**：点估计容易过度拟合训练数据，尤其在数据稀少区域
2. **无法量化不确定性**：模型无法表达"我不确定"，在分布外区域仍给出高置信度预测
3. **探索不足**：在强化学习/决策场景中，点估计无法自然实现探索

贝叶斯方法通过维护权重的完整后验分布 \(P(w|\mathcal{D})\) 来解决这些问题。然而，精确贝叶斯推断在神经网络中是不可计算的（后验无解析形式），因此需要近似方法。

##### 核心机制：变分推断框架

**变分自由能目标**

Bayes by Backprop 的核心思想是用一个参数化的简单分布 \(q(w|\theta)\) 来近似真实后验 \(P(w|\mathcal{D})\)。优化目标为最小化变分自由能（即 ELBO 的负数）：

$$\mathcal{F}(\mathcal{D}, \theta) = \text{KL}[q(w|\theta) \| P(w)] - \mathbb{E}_{q(w|\theta)}[\log P(\mathcal{D}|w)]$$

其中：
- **复杂度代价** \(\text{KL}[q(w|\theta) \| P(w)]\)：衡量学到的后验与先验的偏离程度，起正则化作用
- **数据似然代价** \(-\mathbb{E}_{q}[\log P(\mathcal{D}|w)]\)：衡量模型对数据的拟合能力

> 💡 关键直觉：这个目标自动平衡了"拟合数据"和"保持简单"——正是奥卡姆剃刀原则的数学化表达。

**重参数化技巧**

直接对 \(\theta\) 求 \(\mathbb{E}_{q(w|\theta)}[f(w, \theta)]\) 的梯度是困难的，因为期望的分布本身依赖于 \(\theta\)。重参数化技巧将随机性从参数中分离：

$$w = t(\theta, \epsilon) = \mu + \log(1 + \exp(\rho)) \circ \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)$$

这样梯度变为：

$$\frac{\partial}{\partial \theta} \mathbb{E}_{q(w|\theta)}[f(w, \theta)] = \mathbb{E}_{\mathcal{N}(\epsilon|0,I)}\left[\frac{\partial f(w, \theta)}{\partial w}\frac{\partial w}{\partial \theta} + \frac{\partial f(w, \theta)}{\partial \theta}\right]$$

> ⚠️ 注意：使用 \(\sigma = \log(1 + \exp(\rho))\)（softplus函数）而非直接参数化 \(\sigma\)，是为了确保标准差始终为正，同时避免 \(\exp\) 的数值溢出问题。

**Scale Mixture 先验**

论文提出使用两个高斯分布的混合作为先验：

$$P(w) = \pi \mathcal{N}(w|0, \sigma_1^2) + (1-\pi)\mathcal{N}(w|0, \sigma_2^2)$$

其中 \(\sigma_1\) 较大（如 \(\exp(-1)\) 到 \(\exp(0)\)），\(\sigma_2\) 很小（如 \(\exp(-6)\) 到 \(\exp(-8)\)）。这种设计类似于 spike-and-slab 先验：
- 宽高斯允许重要权重取较大值
- 窄高斯将不重要权重压向零附近

这比单一高斯先验更灵活，能学到更稀疏的网络结构。

**Minibatch KL 重加权**

在使用 minibatch 训练时，KL 项需要合理分配到各个 batch。论文提出非均匀加权：

$$\pi_i = \frac{2^{M-i}}{2^M - 1}, \quad i = 1, \ldots, M$$

其中 \(M\) 是总 batch 数，\(i\) 是当前 batch 索引。这使得训练初期 KL 权重更大（更受先验约束），后期更多关注数据拟合。

> 💡 直觉：类似于"先学规则，再学例外"——早期让先验引导网络结构，后期让数据精调细节。

##### 训练与推理流程

**训练阶段**：
1. 对每个 minibatch，从 \(\mathcal{N}(0, I)\) 采样 \(\epsilon\)
2. 通过重参数化计算权重 \(w = \mu + \text{softplus}(\rho) \circ \epsilon\)
3. 前向传播计算损失（复杂度代价 + 数据似然代价）
4. 反向传播计算 \(\nabla_\mu\) 和 \(\nabla_\rho\) 的梯度
5. 更新 \(\mu\) 和 \(\rho\)

**推理阶段**：
- 可以采样多组权重进行贝叶斯模型平均
- 或直接使用均值权重 \(\mu\) 作为点预测
- 不确定性通过多次采样的预测方差估计

##### 与传统方法的对比

| 方法 | 权重表示 | 正则化 | 不确定性 | 探索能力 |
|------|---------|--------|---------|---------|
| SGD (MLE) | 点估计 | 无 | 无 | 无 |
| L2 正则化 (MAP) | 点估计 | 高斯先验 | 无 | 无 |
| Dropout | 点估计+随机掩码 | 隐式 | 近似 | 有限 |
| **Bayes by Backprop** | **概率分布** | **KL散度** | **显式** | **Thompson采样** |

关键优势：
1. **vs Dropout**：BBB 显式学习每个权重的不确定性，而 dropout 只是二值掩码的近似
2. **vs 变分 Dropout (Graves 2011)**：BBB 使用更好的梯度估计器（重参数化 vs REINFORCE），方差更低
3. **vs 集成方法**：BBB 是隐式无限集成（对所有可能权重配置积分），且可通过信噪比剪枝压缩

##### 实验亮点

**MNIST 分类**：两层 1200 ReLU 单元网络，BBB 达到 **1.32%** 测试错误率，优于 dropout 的 1.34%。

**权重剪枝**：按信噪比 \(|\mu|/\sigma\) 排序后移除 95% 的权重（从 2.4M 降至 120K），错误率仅从 1.24% 升至 1.29%，展示了极强的压缩能力。

**回归不确定性**：在无数据区域，BBB 的置信区间自然发散，而标准网络错误地给出零方差预测。

**Thompson Sampling**：在蘑菇分类赌博机任务中，BBB 通过从后验采样权重实现探索，累积遗憾显著低于 \(\epsilon\)-greedy 和 UCB 等基线方法。

#### 🧪 练习题

```yaml
question: "Bayes by Backprop 中使用重参数化技巧的主要目的是什么？"
options:
  - "减少模型参数量，提高推理速度"
  - "将随机性与可学习参数分离，使梯度可通过反向传播计算"
  - "确保权重分布始终为高斯分布"
  - "避免 KL 散度的计算"
answer: 1
explain: "重参数化将 w = μ + σ⊙ε 中的随机性转移到固定分布 ε~N(0,I)，使得损失对 μ 和 ρ 的梯度可以通过标准反向传播获得无偏估计。"
```