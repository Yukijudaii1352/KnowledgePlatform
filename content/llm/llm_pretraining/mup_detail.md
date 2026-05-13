### μP/μTransfer — 最大更新参数化 (Maximal Update Parameterization)

```yaml
id: mup
name: μP/μTransfer
full_name: 最大更新参数化 (Maximal Update Parameterization)
year: '2022.03'
org: Microsoft Research
paper_url: https://arxiv.org/abs/2203.03466
category: scaling
parent: —
motivation: 实现超参数跨规模零次迁移
```

#### 📝 一句话总结

μP（Maximal Update Parameterization）通过重新设计神经网络各层参数的初始化方差与学习率随宽度的缩放规则，使得最优超参数在不同模型规模间保持稳定，从而实现 **μTransfer**——在小模型上调优超参数后零次迁移到大模型，无需对大模型进行任何额外调参。

#### 🎯 核心要点

- **abc-参数化框架**：将参数化抽象为三元组 (a=参数乘子缩放, b=初始化方差缩放, c=学习率缩放)，SP 和 μP 都是其特例；论文证明 μP 是唯一允许超参数跨宽度零次迁移的 abc-参数化
- **三类权重差异化缩放**：将网络参数分为输入权重（含偏置）、隐藏权重、输出权重三类，分别制定不同的初始化方差和学习率缩放规则（Table 3）
- **注意力缩放修正**：Transformer 中注意力 logit 使用 \(q^\top k / d\) 而非标准的 \(q^\top k / \sqrt{d}\)，确保训练中注意力分数随宽度稳定
- **μTransfer 流程**：三步法——(1) 用 μP 参数化目标模型，(2) 在小版本模型上调优超参数，(3) 将超参数直接复制到大模型
- **可迁移超参数范围**：学习率、动量、Adam beta、LR schedule、初始化方差、参数乘子等均可迁移；宽度、深度、batch size 等作为迁移维度
- **Coord Check 诊断工具**：通过检查各层激活值随宽度变化的稳定性，验证 μP 实现的正确性
- **大规模验证**：从 13M 参数迁移超参数超越 BERT-large (350M) 发布结果；从 40M 参数迁移超参数超越 GPT-3 6.7B 发布结果，调参成本仅为预训练的 7%

#### 🔬 深入细节

##### 动机：标准参数化的缺陷

在标准参数化（Standard Parameterization, SP）下，不同宽度的模型具有不同的最优学习率——随着模型变宽，最优学习率会发生漂移。这意味着在小模型上调好的超参数无法直接用于大模型，而大模型的超参数搜索代价极其昂贵。更严重的是，SP 下宽模型的训练激活值会在训练过程中发散（blow up），本质原因是各层的有效学习率不平衡。

![μTransfer 核心对比：SP vs μP 下学习率-损失曲线](https://ar5iv.labs.arxiv.org/html/2203.03466/assets/x1.png)
*图 1：不同宽度 Transformer 在 Adam 下的训练损失 vs 学习率。左图（SP）：不同宽度的最优学习率不一致，宽模型不一定优于窄模型；右图（μP）：最优学习率跨宽度稳定，宽模型始终更优。*

![μTransfer 流程示意](https://ar5iv.labs.arxiv.org/html/2203.03466/assets/x2.png)
*图 2：μTransfer 流程——在小模型上进行超参数搜索，找到最优超参数后直接迁移到大模型。*

##### μP 参数化规则

μP 的核心思想是：确保每一层在训练过程中的**更新幅度**（对激活值的影响）与宽度无关。具体地，对于一个宽度为 \(n\) 的网络，μP 将参数分为三类并分别制定缩放规则：

**Table 3 核心规则（Adam 优化器）：**

|  | 输入权重 & 偏置 | 输出权重 | 隐藏权重 |
|---|---|---|---|
| **初始化方差** | \(1/\text{fan\_in}\) | \(1/\text{fan\_in}^2\)（SP: \(1/\text{fan\_in}\)） | \(1/\text{fan\_in}\) |
| **Adam 学习率** | \(1\) | \(1/\text{fan\_in}\)（SP: \(1\)） | \(1/\text{fan\_in}\)（SP: \(1\)） |

> 💡 **关键直觉**：在 SP 下，隐藏层和输出层的学习率相对于宽度过大，导致宽模型训练时激活值爆炸。μP 通过对输出权重和隐藏权重的学习率乘以 \(1/\text{fan\_in}\) 来补偿，确保参数更新对激活值的影响与宽度无关。

对于一个简单的两隐藏层 MLP（宽度 \(n\)），μP 的基本形式为：

$$W^1 \sim \mathcal{N}(0, 1/d_{in}), \quad W^2 \sim \mathcal{N}(0, 1/n), \quad W^3 \sim \mathcal{N}(0, 1/n^2)$$

SGD 学习率分别为：

$$\eta_{W^1} = \eta_{b^1} = \eta_{b^2} = \eta \cdot n, \quad \eta_{W^2} = \eta, \quad \eta_{W^3} = \eta \cdot n^{-1}$$

##### Transformer 特殊处理：注意力缩放

标准 Transformer 中注意力分数计算为 \(q^\top k / \sqrt{d}\)，其中 \(d\) 是 head 维度。这一缩放基于初始化时 \(q\) 和 \(k\) 不相关的假设（中心极限定理）。然而在训练过程中，\(q\) 和 \(k\) 会变得相关，此时 \(q^\top k\) 实际上按 \(d\)（而非 \(\sqrt{d}\)）的量级增长（大数定律）。因此 μP 要求：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{d}\right)V$$

> ⚠️ **注意**：这里使用 \(1/d\) 而非 \(1/\sqrt{d}\)，这是 μP 在 Transformer 上的关键修改，确保注意力 logit 在训练过程中不随宽度发散。

##### μTransfer 算法

```python
# Algorithm 1: μTransfer — 通过小模型调优大模型超参数
# 输入：目标大模型架构 M_target

# Step 1: 用 μP 参数化目标模型
model_target = apply_muP(M_target)  # 修改初始化方差和学习率缩放

# Step 2: 构建小版本模型并调优
model_small = shrink(M_target, width=small_width)  # 缩小宽度（和/或深度）
model_small = apply_muP(model_small)
best_hps = hyperparameter_search(model_small)  # 在小模型上搜索最优 HP
# 可调参数：学习率、LR schedule、初始化方差、正则化等

# Step 3: 零次迁移
model_target.set_hyperparameters(best_hps)  # 直接复制，无需修改
train(model_target)  # 以迁移的超参数训练大模型
```

##### abc-参数化理论框架

论文将参数化形式化为 **abc-参数化**：对于每个参数张量，定义三个缩放指数：
- **a**（参数乘子）：前向传播中参数的缩放因子
- **b**（初始化）：初始化标准差随宽度的缩放
- **c**（学习率）：学习率随宽度的缩放

SP 和 μP 都是 abc-参数化的特例。论文的核心理论结果是：**μP 是唯一允许超参数零次迁移的 abc-参数化**。直觉上，只有当每层的"特征学习"强度（即参数更新对激活值的影响）与宽度无关时，最优超参数才能跨宽度保持稳定。SP 下隐藏层实际上退化为"核regime"（kernel regime），即特征几乎不更新，而 μP 确保了"最大化"的特征学习。

> 💡 **核心洞察**：μP 不仅仅是让最优学习率可迁移——它还确保了宽模型能充分进行特征学习（而非退化为核方法），因此 μP 模型在最优超参数下通常**优于** SP 模型即使后者也经过了学习率调优。

##### Coord Check：实现正确性验证

论文提出了 **Coord Check**（坐标检查）作为验证 μP 实现正确性的诊断工具。其原理是：在 μP 下，各层激活值的坐标均值应在训练初期保持与宽度无关的稳定性。具体做法是：

1. 用不同宽度（如 64, 128, 256, ...）初始化模型
2. 训练若干步，记录每层激活值的坐标均值
3. 如果各宽度的曲线重合，说明 μP 实现正确；如果发散，说明存在缩放错误

##### 与标准参数化的关键区别

| 特性 | 标准参数化 (SP) | μP |
|---|---|---|
| 最优 LR 随宽度 | 漂移 | 稳定 |
| 宽模型特征学习 | 退化（核 regime） | 最大化 |
| 输出层初始化 | \(1/\text{fan\_in}\) | \(1/\text{fan\_in}^2\) |
| 隐藏层 Adam LR | 固定 | \(\propto 1/\text{fan\_in}\) |
| 注意力缩放 | \(1/\sqrt{d}\) | \(1/d\) |
| 超参数迁移 | 不可靠 | 零次迁移 |

#### 🧪 练习题

```yaml
question: "在 μP 中，Transformer 的注意力 logit 缩放因子应使用什么？"
options:
  - "1/√d，与标准 Transformer 相同"
  - "1/d，因为训练中 query 和 key 相关导致内积按 d 量级增长"
  - "1/d²，为了进一步抑制注意力分数的方差"
  - "不需要缩放，μP 的学习率调整已经补偿了这一点"
answer: 1
explain: "训练过程中 q 和 k 变得相关，q⊤k 按 d（而非 √d）量级增长（大数定律而非中心极限定理），因此需要除以 d 而非 √d 来保持注意力 logit 的稳定性。"
```