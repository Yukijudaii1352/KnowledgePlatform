### MAML — 模型无关元学习 (Model-Agnostic Meta-Learning)

```yaml
id: maml
name: MAML
full_name: "模型无关元学习 (Model-Agnostic Meta-Learning)"
year: 2017
org: UC Berkeley
paper_url: "https://arxiv.org/abs/1703.03400"
category: foundation
parent: "—"
motivation: "通过学习良好的模型初始化参数，使模型能在少量梯度步骤内快速适应新任务，实现few-shot学习的梯度适应"
```

#### 📝 一句话总结

MAML 提出了一种模型无关的元学习算法，通过双层优化学习一组对任务变化敏感的初始化参数，使得模型仅需少量梯度更新步骤即可快速适应新任务，适用于回归、分类和强化学习等多种场景。

#### 🎯 核心要点

- **模型无关性**：适用于任何使用梯度下降训练的模型，不限制网络架构
- **双层优化框架**：内层循环在单个任务上执行少量梯度步适应，外层循环优化跨任务的初始化参数
- **核心目标**：学习一个对任务分布敏感的参数初始化点 \(\theta\)，使其经过少量梯度步后在新任务上表现优异
- **内层更新**：\(\theta'_i = \theta - \alpha \nabla_\theta \mathcal{L}_{T_i}(f_\theta)\)，对每个任务执行一步或多步梯度下降
- **外层更新**：\(\theta \leftarrow \theta - \beta \nabla_\theta \sum_{T_i} \mathcal{L}_{T_i}(f_{\theta'_i})\)，基于适应后参数的损失优化初始参数
- **一阶近似 (FOMAML)**：忽略二阶导数以降低计算开销，实验表明性能接近完整版本
- **广泛适用**：在 few-shot 图像分类（Omniglot、MiniImageNet）、回归和强化学习任务上均取得优异效果

#### 🔬 深入细节

![MAML 梯度方向示意图](https://ar5iv.labs.arxiv.org/html/1703.03400v2/assets/x1.png)
*图：MAML 学习的初始参数 θ 位于参数空间中对多个任务都能快速适应的位置。灰色线条表示不同任务的梯度方向，粗黑箭头表示 MAML 的元梯度方向。*

##### 算法伪代码

```python
# MAML 元学习算法 (Algorithm 1)
# 输入: 任务分布 p(T), 内层学习率 α, 外层学习率 β

随机初始化模型参数 θ
while not converged:
    # 采样一批任务
    batch_tasks = sample_tasks(p(T))
    
    for each task T_i in batch_tasks:
        # 内层循环：任务适应
        # 从 T_i 中采样 K 个样本 (support set)
        D_train = sample(T_i, K)
        # 计算任务损失的梯度
        grad = ∇_θ L(f_θ, D_train)
        # 一步梯度更新得到适应后的参数
        θ'_i = θ - α * grad
    
    # 外层循环：元优化
    # 从每个 T_i 中采样新数据 (query set)
    D_test = {sample(T_i) for T_i in batch_tasks}
    # 基于适应后参数在新数据上的损失更新 θ
    θ = θ - β * ∇_θ Σ_i L(f_{θ'_i}, D_test_i)
```

##### 动机与背景

传统深度学习模型需要大量数据和长时间训练才能学习新任务，而人类可以从极少样本中快速学习。元学习（learning to learn）旨在解决这一差距。在 MAML 之前，元学习方法主要分为两类：

1. **基于记忆的方法**（如 MANN、Matching Networks）：通过学习嵌入空间或注意力机制实现 few-shot 学习，但受限于特定架构
2. **基于优化器的方法**（如 Learning to Learn by Gradient Descent）：学习一个 LSTM 优化器来生成参数更新，但引入了额外的学习器网络

MAML 的核心洞察是：**与其学习一个复杂的元学习器，不如直接学习一个好的初始化点**。这个初始化点应该位于参数空间中一个"万能"的位置——从这里出发，对任何新任务只需几步梯度下降就能达到良好性能。

##### 核心机制详解

**1. 双层优化结构**

MAML 的核心是一个嵌套的优化问题：

$$\min_\theta \sum_{T_i \sim p(T)} \mathcal{L}_{T_i}\left(f_{\theta - \alpha \nabla_\theta \mathcal{L}_{T_i}(f_\theta)}\right)$$

这个目标函数的含义是：找到一个参数 \(\theta\)，使得对从任务分布中采样的任务 \(T_i\)，经过一步梯度适应后的参数 \(\theta'_i\) 在该任务上的损失最小。

> 💡 关键直觉：MAML 不是要找一个在所有任务上都表现好的参数（那是多任务学习），而是要找一个经过少量适应后能在各任务上表现好的参数。这两者有本质区别。

**2. 内层循环（Task-Level Adaptation）**

对于每个采样的任务 \(T_i\)，使用该任务的少量支持集（support set）数据计算梯度并更新：

$$\theta'_i = \theta - \alpha \nabla_\theta \mathcal{L}_{T_i}(f_\theta)$$

这里 \(\alpha\) 是内层学习率（可以是固定的超参数，也可以是可学习的）。虽然论文中以一步更新为主要讨论对象，但该框架自然支持多步更新：

$$\theta'_i = \theta - \alpha \nabla_\theta \mathcal{L}_{T_i}(f_{\theta^{(k-1)}})$$

**3. 外层循环（Meta-Optimization）**

外层循环使用每个任务的查询集（query set）数据评估适应后参数的性能，并更新初始参数：

$$\theta \leftarrow \theta - \beta \nabla_\theta \sum_{T_i \sim p(T)} \mathcal{L}_{T_i}(f_{\theta'_i})$$

> ⚠️ 注意：外层梯度 \(\nabla_\theta \mathcal{L}_{T_i}(f_{\theta'_i})\) 需要对 \(\theta'_i = \theta - \alpha \nabla_\theta \mathcal{L}_{T_i}(f_\theta)\) 求导，这涉及**二阶导数**（梯度的梯度），即 Hessian-vector product。

**4. 二阶导数与一阶近似**

完整的 MAML 元梯度包含二阶项：

$$\nabla_\theta \mathcal{L}_{T_i}(f_{\theta'_i}) = \nabla_{\theta'_i} \mathcal{L}_{T_i}(f_{\theta'_i}) \cdot (I - \alpha \nabla^2_\theta \mathcal{L}_{T_i}(f_\theta))$$

其中 \(\nabla^2_\theta \mathcal{L}_{T_i}(f_\theta)\) 是 Hessian 矩阵。计算完整 Hessian 的开销较大，因此论文提出了**一阶近似（First-Order MAML, FOMAML）**：

$$\nabla_\theta \mathcal{L}_{T_i}(f_{\theta'_i}) \approx \nabla_{\theta'_i} \mathcal{L}_{T_i}(f_{\theta'_i})$$

即直接忽略 Hessian 项，仅使用适应后参数处的一阶梯度。实验表明 FOMAML 在多数任务上性能接近完整 MAML，说明梯度方向信息比曲率信息更为重要。

##### 训练与推理流程

**训练阶段（Meta-Training）：**
1. 从任务分布 \(p(T)\) 中采样一批任务
2. 对每个任务，用 K-shot 支持集执行内层适应（1 步或多步梯度下降）
3. 用查询集评估适应后的模型，计算元损失
4. 对元损失求关于 \(\theta\) 的梯度，更新初始参数

**测试阶段（Meta-Testing）：**
1. 给定新任务的 K-shot 支持集
2. 从学到的 \(\theta\) 出发，执行少量梯度步适应
3. 在查询集上评估适应后的模型

##### 与传统方法的对比

| 特性 | 预训练+微调 | Matching Networks | MAML |
|------|------------|-------------------|------|
| 模型无关 | ✓ | ✗（需特定架构） | ✓ |
| 优化目标 | 单任务损失 | 嵌入空间距离 | 适应后的跨任务损失 |
| 适应方式 | 大量数据微调 | 无需微调（前馈） | 少量梯度步 |
| 初始化设计 | 无针对性 | 不适用 | 专门优化快速适应能力 |
| 二阶信息 | 不使用 | 不适用 | 利用 Hessian 优化适应方向 |

MAML 的独特优势在于：它不改变模型架构，不引入额外参数，仅通过改变训练目标（从"在当前参数下表现好"变为"适应后表现好"）就实现了快速适应能力。这使得 MAML 可以无缝应用于任何现有的神经网络架构。

#### 🧪 练习题

```yaml
question: "MAML 外层优化中计算元梯度时涉及二阶导数，其原因是什么？"
options:
  - "因为内层使用了二阶优化器（如 Adam）"
  - "因为外层损失是关于适应后参数 θ' 计算的，而 θ' 本身是 θ 的函数（包含梯度运算）"
  - "因为需要计算 Hessian 矩阵来确定学习率"
  - "因为多任务损失的求和引入了额外的导数阶数"
answer: 1
explain: "θ' = θ - α∇L(θ) 使得 θ' 是 θ 的函数，对外层损失 L(f_{θ'}) 关于 θ 求导时，需要通过链式法则对内层梯度再求导，产生二阶导数（Hessian-vector product）。"
```