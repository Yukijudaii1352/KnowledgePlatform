### Reptile: A Scalable Metalearning Algorithm

```yaml
id: reptile
name: Reptile
full_name: "Reptile: A Scalable Metalearning Algorithm"
year: 2018
org: OpenAI
paper_url: https://arxiv.org/abs/1803.02999
category: meta_learning
parent: MAML
motivation: "通过反复采样任务并在任务上执行SGD，然后将模型权重向学习后的权重移动，实现无需计算二阶梯度的元学习初始化"
```

#### 📝 一句话总结

Reptile 提出了一种极简的元学习初始化算法：反复采样任务、在每个任务上执行多步 SGD、然后将模型参数向训练后的参数方向移动，无需计算二阶梯度即可学到良好的初始化，理论上通过最大化不同 minibatch 梯度的内积来促进快速适应。

#### 🎯 核心要点

- **极简算法设计**：仅需在任务上执行标准 SGD，然后将初始化参数向训练后参数线性插值移动，无需计算二阶导数或展开计算图
- **两种变体**：Serial 版本（逐个任务更新）和 Batched 版本（并行采样多个任务取平均方向更新）
- **理论分析**：通过 Taylor 展开证明 Reptile 梯度包含 AvgGrad（联合训练梯度）和 AvgGradInner（最大化同任务不同 minibatch 梯度内积的方向）
- **与 MAML/FOMAML 的统一视角**：三者的期望梯度都是 AvgGrad 和 AvgGradInner 的线性组合，仅系数不同
- **实验验证**：在 Omniglot 和 Mini-ImageNet 的 few-shot 分类任务上达到与 MAML 相当的性能
- **Transduction 技巧**：利用测试样本的 batch normalization 统计信息可显著提升性能

#### 🔬 深入细节

![Reptile 算法示意图](https://ar5iv.labs.arxiv.org/html/1803.02999/assets/x1.png)
*图：Reptile 算法的几何直觉。黑色实线为不同任务的最优流形，灰色线为 SGD 在各任务上的优化轨迹，Reptile 将初始化向各任务训练后的参数方向移动，寻找距离所有任务最优解都近的初始化点。*

```python
# Reptile 算法伪代码
# Serial Version
initialize φ  # 模型参数初始化

for iteration in range(num_iterations):
    τ = sample_task(task_distribution)  # 采样一个任务
    
    # 内循环：在任务 τ 上执行 k 步 SGD
    θ = φ.clone()
    for step in range(k):
        minibatch = sample_from_task(τ)
        θ = θ - α * ∇L(θ, minibatch)  # 标准 SGD
    
    # 外循环：将初始化向训练后参数移动
    φ = φ + ε * (θ - φ)  # 等价于 φ = (1-ε)φ + ε·θ

# Batched Version
for iteration in range(num_iterations):
    sample n tasks τ_1, ..., τ_n
    for each τ_i:
        θ_i = SGD(L_τi, φ, k)  # k 步内循环
    φ = φ + ε * (1/n) * Σ(θ_i - φ)  # 平均方向更新
```

##### 动机与背景

元学习（Meta-Learning）的目标是学习一个能够快速适应新任务的模型。MAML（Model-Agnostic Meta-Learning）通过优化初始化参数使得模型在新任务上经过少量梯度步即可达到良好性能，但其训练过程需要对内循环的梯度下降进行反向传播，涉及**二阶梯度计算**（Hessian-向量积），带来显著的计算和内存开销。

FOMAML（First-Order MAML）通过忽略二阶项简化了计算，但仍需要明确区分"训练集"和"测试集"来计算元梯度。Reptile 进一步简化了这一过程：**完全不需要区分训练/测试数据划分**，只需在任务上执行标准 SGD 然后移动初始化即可。

##### 核心机制：为什么 Reptile 能工作？

Reptile 的核心洞察来自对元梯度的 Taylor 展开分析。对于内循环执行 \(k\) 步 SGD 的情况，定义：

$$\text{AvgGrad} = \mathbb{E}_{\tau,i}[\bar{g}_i]$$

这是所有任务上的平均梯度，等价于联合训练（joint training）的梯度方向。

$$\text{AvgGradInner} = \mathbb{E}_{\tau,i \neq j}[\bar{g}_i^T \bar{H}_j]$$

这个项的**负方向**对应于增大同一任务内不同 minibatch 梯度内积 \(\bar{g}_i \cdot \bar{g}_j\) 的方向。直觉上，它寻找这样的参数点：在该点上，对任务的一个 minibatch 做梯度下降也能改善在同任务其他 minibatch 上的表现——这正是**快速学习**（few-shot generalization）的关键。

对于 \(k=2\) 的情况，三种算法的期望梯度为：

$$\mathbb{E}[g_{\text{MAML}}] = (1)\text{AvgGrad} - (2\alpha)\text{AvgGradInner} + O(\alpha^2)$$

$$\mathbb{E}[g_{\text{FOMAML}}] = (1)\text{AvgGrad} - (\alpha)\text{AvgGradInner} + O(\alpha^2)$$

$$\mathbb{E}[g_{\text{Reptile}}] = (2)\text{AvgGrad} - (\alpha)\text{AvgGradInner} + O(\alpha^2)$$

> 💡 **关键洞察**：三种算法的元梯度都是 AvgGrad 和 AvgGradInner 的线性组合！它们在本质上做着相同的事情——先将参数推向所有任务损失的最小值（AvgGrad），然后通过 AvgGradInner 项使得参数位于一个"容易快速适应"的位置。

对于一般的 \(k \geq 2\)：

$$\mathbb{E}[g_{\text{Reptile}}] = k \cdot \text{AvgGrad} - \frac{k(k-1)}{2}\alpha \cdot \text{AvgGradInner} + O(\alpha^2)$$

##### 与 MAML 的关键区别

| 特性 | MAML | FOMAML | Reptile |
|------|------|--------|---------|
| 二阶梯度 | ✅ 需要 | ❌ 不需要 | ❌ 不需要 |
| 训练/测试集划分 | ✅ 需要 | ✅ 需要 | ❌ 不需要 |
| 计算图展开 | ✅ 需要 | ❌ 不需要 | ❌ 不需要 |
| 实现复杂度 | 高 | 中 | **低** |
| AvgGradInner 系数 | \(2(k-1)\alpha\) | \((k-1)\alpha\) | \(\frac{k(k-1)}{2}\alpha\) |

> ⚠️ **注意**：Reptile 要求内循环使用**不同的 minibatch**（而非重复使用同一 batch），否则 AvgGradInner 项退化，算法等价于普通的联合训练。这也解释了为什么内循环使用 Adam 时需要设置 \(\beta_1 = 0\)（关闭动量），因为动量会让一个 minibatch 影响后续多步，削弱不同 minibatch 间的独立性。

##### 训练流程与实验设置

在实际实验中，作者采用了以下设置：
- **内循环优化器**：Adam（\(\beta_1=0\)），避免动量减弱不同 minibatch 的独立性
- **外循环优化器**：Vanilla SGD
- **网络架构**：与 MAML 论文相同的 CNN（4 层卷积 + BN + ReLU + MaxPool）
- **Transduction**：测试时 batch normalization 统计量使用所有训练样本 + 单个测试样本计算

实验结果表明：
- **Mini-ImageNet 5-way 1-shot**：Reptile+Transduction 达到 49.97±0.32%（MAML+Transduction: 48.70±1.84%）
- **Mini-ImageNet 5-way 5-shot**：Reptile+Transduction 达到 65.99±0.58%（MAML+Transduction: 63.11±0.92%）
- **Omniglot**：Reptile 略低于 MAML，但加上 Transduction 后差距缩小

##### 梯度组合实验的验证

作者通过一个精巧的实验验证了理论分析：在内循环中使用 4 个不重叠的 minibatch 产生梯度 \(g_1, g_2, g_3, g_4\)，然后比较不同线性组合作为外循环更新方向的效果。实验证实：
- 仅使用 \(g_1\)（等价于联合训练）效果最差
- 使用后面的梯度（如 \(g_4\)，对应 FOMAML）或梯度之和（对应 Reptile）效果更好
- 这验证了 AvgGradInner 项对元学习的重要性

#### 🧪 练习题

```yaml
question: "Reptile 算法与普通的多任务联合训练（joint training）的本质区别是什么？"
options:
  - "Reptile 使用了更复杂的网络架构"
  - "Reptile 内循环执行多步 SGD 使用不同 minibatch，引入了促进任务内泛化的 AvgGradInner 项"
  - "Reptile 需要计算二阶梯度来获得更精确的更新方向"
  - "Reptile 使用了特殊的数据增强策略"
answer: 1
explain: "Reptile 通过在内循环中对同一任务使用不同 minibatch 执行多步 SGD，其元梯度中除了联合训练的 AvgGrad 项外，还包含 AvgGradInner 项，该项最大化不同 minibatch 梯度的内积，促进快速适应能力。若内循环只用一步或重复同一 batch，则退化为普通联合训练。"
```