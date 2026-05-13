### ProtoNet

```yaml
id: proto_net
name: ProtoNet
full_name: 原型网络 (Prototypical Networks)
year: '2017'
org: 多伦多大学
paper_url: https://arxiv.org/abs/1703.05175
category: metric
parent: matching_net
motivation: 以类均值原型做欧氏距离分类，简洁高效
```

#### 📝 一句话总结

Prototypical Networks 提出在嵌入空间中以每类支持集样本的均值作为类原型，通过计算查询样本到各原型的欧氏距离进行 softmax 分类，以极简的归纳偏置实现了高效且强大的少样本学习。

#### 🎯 核心要点

- 类原型表示：将每类支持集样本通过嵌入网络映射后取均值，作为该类的原型（prototype）
- 基于距离的分类：查询样本在嵌入空间中通过 softmax over 负距离进行分类
- 欧氏距离优于余弦距离：实验表明平方欧氏距离显著优于余弦相似度
- 等价于混合密度估计：当距离为 Bregman 散度时，原型网络等价于指数族混合模型的密度估计
- 等价于线性分类器：使用欧氏距离时，模型等价于嵌入空间中的线性模型
- Episode 训练策略：训练时使用更高的 way 数（类别数）可显著提升测试性能
- 可扩展至零样本学习：用类元数据的嵌入替代支持集均值作为原型
- 在 Omniglot 和 miniImageNet 上达到当时最优性能

#### 🔬 深入细节

![Prototypical Networks 示意图](https://ar5iv.labs.arxiv.org/html/1703.05175/assets/x1.png)
*图：Prototypical Networks 在 few-shot（左）和 zero-shot（右）场景下的工作流程。彩色区域为各类原型的 Voronoi 划分，\(\mathbf{c}_k\) 为类原型，查询点通过到各原型的距离进行 softmax 分类。*

##### 算法伪代码

```python
# Prototypical Networks 训练 episode 损失计算
def proto_net_episode(support_set, query_set, f_phi, n_classes):
    """
    support_set: dict {class_k: [x_1, ..., x_Ns]}
    query_set: dict {class_k: [x_1, ..., x_Nq]}
    f_phi: embedding network
    """
    # Step 1: 计算每类原型（支持集嵌入的均值）
    prototypes = {}
    for k in range(n_classes):
        embeddings = [f_phi(x) for x in support_set[k]]
        prototypes[k] = mean(embeddings)  # c_k = (1/|S_k|) * Σ f_φ(x_i)
    
    # Step 2: 对每个查询样本计算损失
    loss = 0
    for k in range(n_classes):
        for x in query_set[k]:
            z = f_phi(x)
            # 计算到所有原型的负平方欧氏距离
            dists = [-euclidean_dist(z, prototypes[j]) for j in range(n_classes)]
            # Softmax 得到类别概率
            log_probs = log_softmax(dists)
            loss += -log_probs[k]  # 负对数似然
    
    return loss / (n_classes * n_query)
```

##### 动机与背景

少样本学习（few-shot learning）要求模型在仅见过极少量新类样本的情况下完成分类。传统方法面临严重的过拟合问题。先前的 Matching Networks 使用注意力加权的最近邻分类器，而 Meta-Learner LSTM 则训练一个 LSTM 来生成分类器更新。这些方法要么架构复杂（FCE 双向 LSTM），要么引入大量额外参数。

ProtoNet 的核心洞察是：**在数据极度稀缺时，分类器应当具有尽可能简单的归纳偏置**。作者假设存在一个嵌入空间，使得同类样本聚集在单一原型周围，分类只需找最近原型即可。

##### 核心机制

**1. 原型计算**

给定嵌入函数 \(f_\phi: \mathbb{R}^D \to \mathbb{R}^M\)，每类原型为该类支持集嵌入的均值：

$$\mathbf{c}_k = \frac{1}{|S_k|} \sum_{(\mathbf{x}_i, y_i) \in S_k} f_\phi(\mathbf{x}_i)$$

**2. 基于距离的 Softmax 分类**

查询点 \(\mathbf{x}\) 的类别概率通过到各原型的距离的 softmax 给出：

$$p_\phi(y=k|\mathbf{x}) = \frac{\exp(-d(f_\phi(\mathbf{x}), \mathbf{c}_k))}{\sum_{k'} \exp(-d(f_\phi(\mathbf{x}), \mathbf{c}_{k'}))}$$

训练目标为最小化查询样本真实类别的负对数概率：\(J(\phi) = -\log p_\phi(y=k|\mathbf{x})\)。

**3. 距离函数的选择至关重要**

作者发现**平方欧氏距离**远优于余弦距离。理论上，这是因为欧氏距离是 Bregman 散度的一种，而 Bregman 散度具有以下关键性质：

> 💡 关键：对于 Bregman 散度，使聚类内距离之和最小的代表点恰好是聚类均值。这为"用均值作原型"提供了理论最优性保证。

余弦距离不是 Bregman 散度，因此不具备这一性质。

**4. 等价于线性模型**

展开欧氏距离：

$$-\|f_\phi(\mathbf{x}) - \mathbf{c}_k\|^2 = 2\mathbf{c}_k^\top f_\phi(\mathbf{x}) - \mathbf{c}_k^\top \mathbf{c}_k + \text{const}$$

这等价于线性分类器 \(\mathbf{w}_k^\top f_\phi(\mathbf{x}) + b_k\)，其中 \(\mathbf{w}_k = 2\mathbf{c}_k\)，\(b_k = -\mathbf{c}_k^\top \mathbf{c}_k\)。

> ⚠️ 注意：虽然分类头是线性的，但所有非线性都被嵌入网络 \(f_\phi\) 学习了。这与现代深度分类网络的设计理念一致（特征提取 + 线性分类头）。

**5. 等价于混合密度估计**

当距离为 Bregman 散度时，ProtoNet 的分类规则等价于等权重指数族混合模型的后验推断。具体地，对于均匀先验的混合模型：

$$p(y=k|\mathbf{z}) = \frac{\exp(-d_\varphi(\mathbf{z}, \boldsymbol{\mu}_k))}{\sum_{k'} \exp(-d_\varphi(\mathbf{z}, \boldsymbol{\mu}_{k'}))}$$

这与 ProtoNet 的分类公式完全一致。平方欧氏距离对应球形高斯分布假设。

##### 训练流程与设计选择

**Episode 训练**：每个训练 episode 随机采样 \(N_C\) 个类，每类 \(N_S\) 个支持样本和 \(N_Q\) 个查询样本。

**关键发现**：
- 训练时使用**更高的 way 数**（如训练 20-way 但测试 5-way）能显著提升性能
- 训练和测试时的 shot 数应保持一致
- 这些简单的设计选择可以替代 Matching Networks 中复杂的 FCE 机制

##### 与 Matching Networks 的对比

| 特性 | Matching Networks | Prototypical Networks |
|------|------------------|----------------------|
| 分类方式 | 加权最近邻 | 最近类原型（线性分类器） |
| 距离度量 | 余弦距离 | 平方欧氏距离 |
| 类表示 | 所有支持点 | 单一原型（均值） |
| 1-shot 情况 | 两者等价 | 两者等价 |
| 额外机制 | FCE、双向 LSTM | 无 |
| 计算复杂度 | O(NK) per query | O(K) per query |

> 💡 关键：在 one-shot 情况下，每类只有一个支持样本，原型就是该样本本身，此时 ProtoNet 退化为 Matching Networks。

##### 零样本扩展

ProtoNet 可自然扩展到零样本学习：用类元数据（如属性向量）\(\mathbf{v}_k\) 通过独立嵌入网络 \(g_\vartheta\) 生成原型 \(\mathbf{c}_k = g_\vartheta(\mathbf{v}_k)\)，查询样本仍通过 \(f_\phi\) 嵌入后计算距离分类。

#### 🧪 练习题

```yaml
question: "Prototypical Networks 选择平方欧氏距离而非余弦距离的理论依据是什么？"
options:
  - "欧氏距离计算更快，减少推理时间"
  - "欧氏距离是 Bregman 散度，保证均值是最优类代表点"
  - "余弦距离无法用于高维空间"
  - "欧氏距离使嵌入网络更容易训练"
answer: 1
explain: "平方欧氏距离属于 Bregman 散度，其性质保证了聚类均值是使类内距离和最小的最优代表点，为'用均值作原型'提供了理论支撑；余弦距离不具备此性质。"
```