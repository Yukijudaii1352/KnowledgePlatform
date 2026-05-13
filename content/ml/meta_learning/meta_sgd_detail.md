### Meta-SGD: Learning to Learn Quickly for Few-Shot Learning

```yaml
id: meta_sgd
name: Meta-SGD
full_name: "Meta-SGD: Learning to Learn Quickly for Few-Shot Learning"
year: "2017"
org: "Huawei Noah's Ark Lab"
paper_url: "https://arxiv.org/abs/1707.09835"
category: "meta_learning"
parent: "MAML"
motivation: "元学习参数学习率，同时学习初始化、更新方向和逐参数学习率，提升元学习器的容量"
```

#### 📝 一句话总结

Meta-SGD 在 MAML 的基础上，将逐参数学习率（含方向）也作为可学习的元参数，通过端到端元学习同时优化网络初始化和自适应更新策略，以更高的元学习器容量实现更快速、更准确的少样本学习。

#### 🎯 核心要点

- **核心更新规则**：\(\boldsymbol{\theta}' = \boldsymbol{\theta} - \boldsymbol{\alpha} \circ \nabla \mathcal{L}_{\mathcal{T}}(\boldsymbol{\theta})\)，其中 \(\boldsymbol{\alpha}\) 与 \(\boldsymbol{\theta}\) 同维度，通过逐元素乘法（Hadamard 积）实现逐参数自适应学习率
- **三要素同时学习**：不同于 MAML 仅学习初始化，Meta-SGD 同时学习初始化（\(\boldsymbol{\theta}\)）、更新方向和学习率（\(\boldsymbol{\alpha}\)）
- **元目标函数**：\(\min_{\boldsymbol{\theta}, \boldsymbol{\alpha}} \mathbb{E}_{\mathcal{T}} [\mathcal{L}_{\text{test}}(\boldsymbol{\theta} - \boldsymbol{\alpha} \circ \nabla \mathcal{L}_{\text{train}}(\boldsymbol{\theta}))]\)
- **\(\boldsymbol{\alpha}\) 可为负值**：当某个 \(\alpha_i < 0\) 时，更新方向反转为梯度上升方向，使得优化器能学习非梯度下降的更新策略
- **一步自适应**：仅需一步梯度更新即可适应新任务，计算开销极低
- **统一框架**：提供监督学习（Algorithm 1）和强化学习（Algorithm 2）两个版本
- **对比优势**：比 MAML 容量更高（多学习 \(\boldsymbol{\alpha}\)）；比 Meta-LSTM 复杂度更低（无需 LSTM 参数化优化器）
- **实验覆盖**：在回归（正弦曲线）、分类（Omniglot、MiniImagenet）、强化学习（2D 导航）三类任务上均超越 MAML

#### 🔬 深入细节

##### 核心框架示意

![Meta-SGD 与相关方法对比](https://arxiv.org/html/1707.09835v2/extracted/figures/meta_learner.png)

*图：Meta-SGD 与 MAML、Meta-LSTM 的对比。MAML 仅学习初始化 \(\boldsymbol{\theta}\)，Meta-LSTM 用 LSTM 学习所有要素但复杂度高，Meta-SGD 以极简方式同时学习初始化、方向和学习率。*

Meta-SGD 的核心思想可以从"元学习器作为优化器"的视角理解：

| 方法 | 学习的要素 | 优化器形式 | 复杂度 |
|------|-----------|-----------|--------|
| MAML | 初始化 \(\boldsymbol{\theta}\) | 标准 SGD（固定 \(\alpha\)） | 低 |
| Meta-LSTM | 初始化 + 方向 + 学习率 | LSTM 参数化 | 高 |
| **Meta-SGD** | 初始化 + 方向 + 学习率 | 可学习向量 \(\boldsymbol{\alpha}\) | 低 |

##### 算法伪代码

```python
# Meta-SGD for Supervised Learning (Algorithm 1)
# 输入: 任务分布 p(T), 元学习率 β
# 元参数: θ (初始化), α (逐参数学习率/方向, 与θ同维度)

# 初始化
θ = random_init()
α = uniform_init(0.005, 0.1)  # 每个元素独立初始化

for iteration in range(max_iters):
    # 采样一批任务
    tasks = sample_tasks(p_T, batch_size)
    
    for T_i in tasks:
        # 内循环: 一步自适应
        grad = compute_gradient(L_train(T_i), θ)
        θ_i_prime = θ - α * grad  # 逐元素乘法 (Hadamard product)
        
        # 计算测试集上的损失
        meta_loss_i = L_test(T_i)(θ_i_prime)
    
    # 外循环: 更新元参数
    total_meta_loss = sum(meta_loss_i for T_i in tasks)
    (θ, α) = (θ, α) - β * gradient(total_meta_loss, (θ, α))
```

```python
# Meta-SGD for Reinforcement Learning (Algorithm 2)
# 使用 TRPO 替代 SGD 进行外循环更新

for iteration in range(max_iters):
    tasks = sample_tasks(p_T, batch_size)
    
    for T_i in tasks:
        # 采样 N1 条轨迹，计算策略梯度
        trajectories_1 = rollout(f_θ, N1)
        policy_grad = compute_policy_gradient(T_i, θ)
        
        # 一步自适应
        θ_i_prime = θ - α * policy_grad
        
        # 采样 N2 条轨迹用于元更新
        trajectories_2 = rollout(f_θ_i_prime, N2)
        compute_meta_gradient(T_i, θ_i_prime, (θ, α))
    
    # 使用 TRPO 更新 (θ, α)
    (θ, α) = TRPO_update((θ, α), meta_gradients)
```

##### 方法细节深入解析

**1. 动机与背景：为什么需要学习学习率？**

传统梯度下降使用固定的标量学习率 \(\alpha\)，这存在两个根本问题：
- **敏感性**：不同参数对学习率的需求不同，全局统一的 \(\alpha\) 难以兼顾所有参数
- **方向局限**：标准 SGD 只能沿负梯度方向更新，无法利用跨任务的结构信息

MAML 虽然通过元学习找到了好的初始化 \(\boldsymbol{\theta}\)，但仍然依赖固定学习率的梯度下降进行任务自适应。实验表明，MAML 对学习率选择非常敏感（将 \(\alpha\) 从 0.01 改为 0.1 会导致性能严重下降）。

Meta-SGD 的核心洞察是：**如果我们能同时学习"从哪里出发"（初始化）和"怎么走"（更新策略），元学习器的容量将大幅提升。**

**2. 核心机制：可学习的逐参数更新向量**

Meta-SGD 的更新规则为：

$$\boldsymbol{\theta}' = \boldsymbol{\theta} - \boldsymbol{\alpha} \circ \nabla \mathcal{L}_{\mathcal{T}}(\boldsymbol{\theta})$$

其中 \(\boldsymbol{\alpha} \in \mathbb{R}^d\) 是与模型参数 \(\boldsymbol{\theta} \in \mathbb{R}^d\) 同维度的可学习向量。这个设计有三层含义：

- **逐参数学习率**：\(|\alpha_i|\) 控制第 \(i\) 个参数的更新步长
- **更新方向**：\(\text{sign}(\alpha_i)\) 决定更新方向——当 \(\alpha_i > 0\) 时为梯度下降，当 \(\alpha_i < 0\) 时为梯度上升
- **参数间耦合**：虽然形式上是逐元素操作，但通过元学习过程，\(\boldsymbol{\alpha}\) 隐式编码了参数间的更新协调关系

> 💡 关键：\(\boldsymbol{\alpha}\) 不仅仅是"自适应学习率"，它实质上定义了一个**可学习的线性预条件器**，将梯度空间映射到更优的更新空间。

**3. 元优化目标与双层优化**

Meta-SGD 的元目标函数为：

$$\min_{\boldsymbol{\theta}, \boldsymbol{\alpha}} \mathbb{E}_{\mathcal{T} \sim p(\mathcal{T})} \left[ \mathcal{L}_{\mathcal{T}}^{\text{test}} \left( \boldsymbol{\theta} - \boldsymbol{\alpha} \circ \nabla \mathcal{L}_{\mathcal{T}}^{\text{train}}(\boldsymbol{\theta}) \right) \right]$$

这是一个双层优化问题：
- **内层**（任务自适应）：给定 \((\boldsymbol{\theta}, \boldsymbol{\alpha})\)，对每个任务 \(\mathcal{T}_i\) 执行一步更新得到 \(\boldsymbol{\theta}_i'\)
- **外层**（元学习）：在所有任务的测试集损失上优化 \((\boldsymbol{\theta}, \boldsymbol{\alpha})\)

外层更新通过标准梯度下降实现：

$$(\boldsymbol{\theta}, \boldsymbol{\alpha}) \leftarrow (\boldsymbol{\theta}, \boldsymbol{\alpha}) - \beta \nabla_{(\boldsymbol{\theta}, \boldsymbol{\alpha})} \sum_{\mathcal{T}_i} \mathcal{L}_{\mathcal{T}_i}^{\text{test}}(\boldsymbol{\theta}_i')$$

由于 \(\boldsymbol{\theta}_i'\) 是 \((\boldsymbol{\theta}, \boldsymbol{\alpha})\) 的可微函数，整个过程可以通过自动微分端到端训练。

> ⚠️ 注意：外层梯度需要计算二阶导数（梯度的梯度），这与 MAML 的计算复杂度相同。但 Meta-SGD 额外学习的 \(\boldsymbol{\alpha}\) 参数量等于模型参数量，存储开销翻倍。

**4. 与 MAML 和 Meta-LSTM 的本质区别**

- **vs MAML**：MAML 等价于 Meta-SGD 中 \(\boldsymbol{\alpha}\) 固定为标量常数的特殊情况。Meta-SGD 通过释放 \(\boldsymbol{\alpha}\) 的自由度，获得了指数级更大的搜索空间（从 1 维到 \(d\) 维）。
- **vs Meta-LSTM**：Meta-LSTM 用 LSTM 网络参数化优化器，理论容量更高但实际中：(1) 训练困难；(2) 参数独立处理，忽略参数间关系；(3) 计算开销大。Meta-SGD 以极简的向量参数化实现了相近的表达能力。

**5. 实验结果概览**

| 任务 | 数据集 | Meta-SGD vs MAML |
|------|--------|-----------------|
| 5-shot 回归 | 正弦曲线 | MSE 0.90±0.16 vs 1.13±0.18 |
| 5-way 1-shot 分类 | Omniglot | 99.53% vs 98.7% |
| 5-way 1-shot 分类 | MiniImagenet | 50.47±1.87% vs 48.70±1.84% |
| 5-way 5-shot 分类 | MiniImagenet | 64.03±0.94% vs 63.11±0.92% |
| 2D 导航 (固定起点) | RL | -8.64±0.68 vs -9.12±0.66 |

在所有实验设置中，Meta-SGD 均一致性地优于 MAML，验证了学习更新策略的有效性。

#### 🧪 练习题

```yaml
question: "Meta-SGD 中可学习向量 α 的维度与什么相同？"
options:
  - "任务数量"
  - "模型参数 θ 的维度"
  - "训练样本数量"
  - "网络层数"
answer: 1
explain: "Meta-SGD 的核心设计是 α 与 θ 同维度，实现逐参数的学习率和方向控制，更新规则为 θ' = θ - α ∘ ∇L(θ)，其中 ∘ 为逐元素乘法。"
```