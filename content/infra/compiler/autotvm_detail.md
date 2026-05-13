### AutoTVM — Learning to Optimize Tensor Programs

```yaml
id: autotvm
title: "Learning to Optimize Tensor Programs"
authors: "Tianqi Chen, Lianmin Zheng, Eddie Yan, Ziheng Jiang, Thierry Moreau, Luis Ceze, Carlos Guestrin, Arvind Krishnamurthy"
year: "2018"
venue: "NeurIPS 2018"
paper_url: "https://arxiv.org/abs/1805.08166"
tags: ["compiler", "auto-tuning", "tensor-program", "cost-model", "transfer-learning"]
one_sentence_summary: "AutoTVM 提出基于统计代价模型（GBT/TreeGRU）和迁移学习的张量程序自动优化框架，通过学习调度参数空间搜索策略，在多种硬件后端上生成高性能算子实现，端到端推理性能超越手工优化库 1.2×–3.8×。"
motivation: "参数空间搜索"
```

#### 📝 一句话总结

AutoTVM 提出了一种基于机器学习的张量程序自动优化框架，使用统计代价模型（梯度提升树或 TreeGRU）替代黑盒搜索或手工代价模型来指导调度参数空间探索，并通过可迁移的不变特征表示实现跨工作负载/跨硬件的迁移学习，在 GPU、ARM CPU、ARM GPU 等多种后端上无需外部算子库即可生成超越 cuDNN/TFLite 等专用库的高性能代码。

#### 🎯 核心要点

- **问题建模**：将张量算子优化形式化为 \(\min_{s \in \mathcal{S}_e} f(g(e, s))\)，其中 \(e\) 为计算表达式，\(s\) 为调度配置，\(g\) 为代码生成器，\(f\) 为硬件执行代价；搜索空间可达数十亿量级
- **统计代价模型**：提出两种代价模型——(1) 基于 XGBoost 的梯度提升树（GBT），使用手工设计的循环特征；(2) 基于 TreeGRU 的神经网络模型，直接在低层循环 AST 上学习表示
- **排序目标函数**：采用 pairwise rank loss 而非回归损失训练代价模型，绕过绝对代价值建模的困难，只需预测配置间的相对优劣
- **探索策略**：使用模拟退火（Simulated Annealing）在调度空间中采样候选配置，结合 ε-greedy 策略和子模函数多样性目标选择批量评估点
- **迁移学习**：设计跨工作负载/跨算子类型的可迁移不变表示——GBT 使用 Context Relation Features，TreeGRU 使用 Context Encoded Embedding；全局模型 + 局部模型组合实现 2×–10× 的搜索加速
- **端到端评估**：在 NVIDIA TITAN X、ARM Cortex-A53、ARM Mali-T860 三种硬件上，对 ResNet、MobileNet、LSTM、DQN、DCGAN 等工作负载实现 1.2×–3.8× 的端到端加速

#### 🔬 深入细节

##### 4.1 核心框架图

![AutoTVM 框架总览](https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/overview.png)
*图 1：AutoTVM 整体框架。左侧为调度空间定义，中间为统计代价模型 + 探索模块的迭代优化循环，右侧为在真实硬件上的评估反馈。*

![代价模型架构](https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/model.png)
*图 2：两种代价模型架构。(a) GBT 模型使用手工提取的循环特征向量；(b) TreeGRU 模型直接在低层循环 AST 上递归编码。*

![迁移学习表示](https://ar5iv.labs.arxiv.org/html/1805.08166/assets/img/transfer.png)
*图 3：不同特征表示的迁移能力对比。配置空间特征仅在域内有效，AST 特征可跨同类算子迁移，Context Relation Features 可跨算子类型迁移。*

##### 4.2 算法伪代码

```python
# AutoTVM 迭代优化主循环
def autotvm_optimize(expression e, schedule_space S_e, hardware H):
    D = []  # 历史数据集 {(x_i, c_i)}
    f_hat = initialize_cost_model()  # 统计代价模型
    
    for iteration in range(T):
        # Step 1: 探索 — 模拟退火采样候选配置
        candidates = []
        for i in range(n_parallel):
            s_init = random_sample(S_e)
            s_best = simulated_annealing(
                s_init, S_e, 
                objective=f_hat,  # 用代价模型评估
                temperature_schedule=exponential_decay
            )
            candidates.append(s_best)
        
        # Step 2: 多样性感知批量选择
        batch = greedy_submodular_select(
            candidates, f_hat, 
            diversity_weight=lambda_,
            batch_size=B
        )
        
        # Step 3: 在真实硬件上评估
        for s in batch:
            x = lower_to_ast(g(e, s))  # 生成低层循环 AST
            c = measure_on_hardware(x, H)  # 真实执行代价
            D.append((x, c))
        
        # Step 4: 更新代价模型
        f_hat.fit(D, objective="rank_loss")
    
    return best_config(D)
```

```python
# 迁移学习：全局模型 + 局部模型
def transfer_optimize(expression e, S_e, H, D_source):
    # 用源域数据训练全局模型（使用不变表示）
    f_global = train_model(D_source, representation="invariant")
    f_local = initialize_cost_model()
    
    for iteration in range(T):
        # 组合预测
        f_hat = lambda x: f_global(x) + f_local(x)
        
        # 同上迭代优化流程...
        batch = explore_and_select(S_e, f_hat)
        D_local = evaluate_on_hardware(batch, H)
        f_local.fit(D_local, objective="rank_loss")
    
    return best_config(D_local)
```

##### 4.3 方法细节

**动机与背景：为什么需要学习优化张量程序？**

深度学习系统的性能高度依赖底层张量算子（如卷积、矩阵乘法）的实现效率。传统方法依赖两条路径：一是使用硬件厂商提供的手工优化库（如 cuDNN、MKL），但这些库覆盖的算子有限，无法支持新兴的融合算子和非标准数据布局；二是使用基于多面体模型（Polyhedral）的自动优化，但其手工代价模型难以精确捕捉现代硬件的复杂行为（缓存层次、流水线、线程调度等）。AutoTVM 的核心洞察是：可以将张量程序优化视为一个统计学习问题——通过在真实硬件上收集少量样本来训练代价模型，用学到的模型指导搜索，从而在庞大的调度参数空间中高效找到高性能配置。

**统计代价模型的设计**

AutoTVM 提出了两种互补的代价模型。第一种是基于 XGBoost 的梯度提升树（GBT）模型：对于每个调度配置 \(s\)，首先通过代码生成器 \(g(e,s)\) 产生低层循环程序，然后从循环嵌套结构中提取特征向量——包括循环的内存访问模式、循环长度、并行度、向量化宽度、展开因子等。这些特征被组织为一个上下文矩阵 \(Z \in \mathbb{R}^{n \times d}\)，其中 \(n\) 为循环层数，\(d\) 为每层的特征维度。GBT 模型直接在展平的特征向量上进行训练。第二种是基于 TreeGRU 的神经网络模型：它将低层循环 AST 视为一棵树，使用 Tree-structured GRU 自底向上递归编码每个节点，最终在根节点获得整个程序的表示向量。TreeGRU 的优势在于无需手工设计特征，可以自动学习程序结构中的关键模式。

两种模型的训练目标都采用 pairwise rank loss 而非传统的回归损失。具体而言，给定一对样本 \((x_i, x_j)\) 及其真实代价 \(c_i < c_j\)，排序损失要求模型预测 \(\hat{f}(x_i) < \hat{f}(x_j)\)。这一设计的动机在于：绝对执行时间受硬件状态波动影响较大，而相对排序更加稳定；优化过程只需要找到最优配置，不需要精确预测绝对代价值。

**探索与利用的平衡**

在调度空间的探索中，AutoTVM 使用模拟退火（SA）作为核心搜索算法。SA 从随机初始配置出发，在每一步随机扰动当前配置（如改变某个 tile 大小或展开因子），根据代价模型的预测值决定是否接受新配置。温度参数随迭代逐步降低，使搜索从全局探索逐渐收敛到局部精化。为了进一步提高搜索效率，AutoTVM 引入了两个机制：(1) ε-greedy 策略——以概率 ε 随机选择候选而非选择模型预测最优的，防止过早陷入局部最优；(2) 子模函数多样性目标——在选择批量评估点时，不仅考虑模型预测的质量，还通过子模函数 \(L(S) = \sum_{s \in S} \hat{f}(s) + \lambda \cdot \text{diversity}(S)\) 鼓励选择彼此差异较大的配置，以最大化每批评估的信息增益。

**迁移学习：跨工作负载的知识复用**

AutoTVM 的一个关键创新是迁移学习机制。在实际部署中，编译器需要优化大量不同的算子（不同输入形状、不同算子类型），如果每个算子都从零开始搜索，代价极高。AutoTVM 的核心观察是：调度配置 \(s\)（如 tile 大小）在不同工作负载间不具有可比性（因为最优 tile 大小取决于输入尺寸），但低层循环 AST 表示 \(x = g(e,s)\) 具有跨工作负载的不变性——无论输入形状如何变化，好的循环结构模式（如良好的内存局部性、充分的并行度）是通用的。

对于 GBT 模型，AutoTVM 设计了 **Context Relation Features**：将上下文矩阵 \(Z\) 视为一组点的集合，通过 log2 间隔的阈值 \(\beta_t\) 提取跨特征的关系：

$$R_t^{(ij)} = \max_{k: Z_{kj} < \beta_t} Z_{ki}$$

这种表示捕捉了"当某个特征低于某阈值时，另一个特征的最大值"这样的关系模式，对输入形状变化具有鲁棒性。对于 TreeGRU 模型，AutoTVM 设计了 **Context Encoded TreeGRU**：将循环节点中的标识符嵌入替换为上下文向量（包含循环长度、访问步长等信息），使模型能够泛化到训练时未见过的循环配置。

迁移学习的最终预测采用全局模型与局部模型的加法组合：

$$\hat{f}(x) = \hat{f}^{(\text{global})}(x) + \hat{f}^{(\text{local})}(x)$$

全局模型在源域数据 \(\mathcal{D}'\) 上使用不变表示训练，提供有效的初始预测；局部模型在目标域的少量样本上在线更新，逐步修正全局模型的偏差。实验表明，这种迁移机制可以将搜索速度提升 2×–10×。

**端到端系统集成**

AutoTVM 被集成到 TVM 编译器栈中，实现了从高层计算图到低层硬件代码的全自动优化。与依赖外部库的传统方案不同，AutoTVM 直接生成优化代码，这使得算子融合等图级优化成为可能——传统方案中，如果某个融合算子在库中没有对应实现，就无法进行融合。在 NVIDIA TITAN X 上，AutoTVM 生成的单算子性能与 cuDNN v7 持平甚至更优；在 ARM Cortex-A53 上超越 TFLite；在 ARM Mali GPU 上超越 ARM Compute Library。端到端评估中，AutoTVM 在 ResNet、MobileNet、LSTM、DQN、DCGAN 等工作负载上实现了 1.2×–3.8× 的加速。

##### 4.4 核心公式

**优化目标**：

$$s^* = \arg\min_{s \in \mathcal{S}_e} f(g(e, s))$$

其中 \(\mathcal{S}_e\) 为表达式 \(e\) 的调度空间，\(g\) 为代码生成器，\(f\) 为真实硬件执行代价。

**排序损失函数**（用于训练代价模型）：

$$\mathcal{L}_{\text{rank}} = \sum_{(i,j): c_i < c_j} \max\left(0, \hat{f}(x_i) - \hat{f}(x_j) + \gamma\right)$$

> 💡 **关键**：排序损失只要求模型正确预测配置间的相对优劣，不需要精确预测绝对执行时间，对硬件噪声更鲁棒。

**多样性感知批量选择**：

$$L(S) = \sum_{s \in S} \hat{f}(s) + \lambda \sum_{s \in S} \min_{s' \in S, s' \neq s} d(s, s')$$

> ⚠️ **注意**：\(\lambda\) 控制质量与多样性的权衡。实验表明多样性选择在大多数工作负载上无显著负面影响，但在部分工作负载（如 C6）上有正向收益。

**迁移学习组合预测**：

$$\hat{f}(x) = \hat{f}^{(\text{global})}(x) + \hat{f}^{(\text{local})}(x)$$

**Context Relation Features**（GBT 迁移表示）：

$$R_t^{(ij)} = \max_{k: Z_{kj} < \beta_t} Z_{ki}$$

其中 \(\beta_t\) 为 log2 间隔的阈值序列，\(Z \in \mathbb{R}^{n \times d}\) 为循环上下文矩阵。

#### 🧪 练习题

```yaml
question: "AutoTVM 使用排序损失（rank loss）而非回归损失训练代价模型的主要原因是什么？"
options:
  - "排序损失的计算速度更快，可以加速模型训练"
  - "回归损失需要归一化处理，实现更复杂"
  - "优化只需找到最优配置的相对排序，且排序对硬件测量噪声更鲁棒"
  - "排序损失可以直接优化端到端推理延迟"
answer: 2
explain: "AutoTVM 的目标是找到最优调度配置，只需要代价模型正确预测配置间的相对优劣即可，不需要精确的绝对代价值。排序目标绕过了绝对代价建模的困难，对硬件状态波动导致的测量噪声更加鲁棒。"
```