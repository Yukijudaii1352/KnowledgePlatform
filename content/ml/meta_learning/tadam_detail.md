### TADAM — 任务依赖自适应度量 (Task Dependent Adaptive Metric)

```yaml
id: tadam
name: TADAM
full_name: "任务依赖自适应度量 (Task Dependent Adaptive Metric)"
year: 2018
org: Element AI
paper_url: "https://arxiv.org/abs/1805.10123"
category: metric_learning
parent: prototypical_networks
motivation: "通过任务相关的度量缩放和特征调节提升少样本学习"
```

#### 📝 一句话总结

TADAM 提出了任务依赖的度量缩放（Task-Dependent Metric, TDM）和基于 FiLM 的任务条件特征提取（Task Conditioning, TC）两大机制，结合辅助协同训练策略，显著提升了原型网络在少样本分类任务上的性能。

#### 🎯 核心要点

- 基于原型网络（Prototypical Networks）框架，引入任务自适应机制
- 任务依赖度量缩放（TDM）：学习任务特定的缩放向量 \(\alpha\)，对欧氏距离各维度加权
- 任务条件特征提取（TC）：通过 FiLM（Feature-wise Linear Modulation）层将任务表示注入特征提取器
- 辅助协同训练：在 episode 训练的同时对基类进行标准分类训练，正则化特征提取器
- 理论证明（Lemma 1）：度量缩放可以改善类间分离度，降低分类错误率
- 骨干网络采用 ResNet-12，在 miniImageNet 和 tieredImageNet 上取得当时 SOTA

#### 🔬 深入细节

![TADAM 架构示意图](https://ar5iv.labs.arxiv.org/html/1805.10123/assets/x1.png)
*图：TADAM 整体架构。虚线边框表示参数共享的模块。任务表示 (Task Embedding) 通过 FiLM 层调制特征提取器，同时生成度量缩放参数 α。*

```python
# TADAM 核心流程伪代码
def tadam_episode(support_set, query_set, feature_extractor, task_embedding_net, metric_scaler):
    # 1. 计算初始原型（用于生成任务表示）
    initial_features = feature_extractor(support_set)  # 无 FiLM 调制
    prototypes = compute_prototypes(initial_features, labels)
    
    # 2. 生成任务表示
    task_repr = task_embedding_net(mean(prototypes))  # 所有原型的均值
    
    # 3. 用 FiLM 生成调制参数 gamma, beta
    gamma, beta = film_generator(task_repr)  # 对每个 ResBlock 生成 γ, β
    
    # 4. 任务条件特征提取
    support_features = feature_extractor(support_set, gamma, beta)  # FiLM 调制
    query_features = feature_extractor(query_set, gamma, beta)
    
    # 5. 计算调制后的原型
    prototypes = compute_prototypes(support_features, labels)
    
    # 6. 任务依赖度量缩放
    alpha = metric_scaler(task_repr)  # 生成缩放向量 α ∈ R^d
    
    # 7. 计算缩放后的距离并分类
    for query in query_features:
        distances = [sum(alpha * (query - proto)**2) for proto in prototypes]
        prediction = softmax(-distances)
    
    return cross_entropy_loss(prediction, true_labels)
```

##### 动机与背景

少样本学习（Few-Shot Learning）要求模型在仅有少量标注样本的情况下快速适应新类别。基于度量学习的方法（如原型网络）通过学习一个通用的嵌入空间来比较样本间的相似度，但存在两个核心缺陷：

1. **固定度量的局限性**：传统原型网络使用固定的欧氏距离，对所有任务一视同仁，无法根据具体任务调整距离度量的侧重维度。
2. **任务无关的特征提取**：特征提取器对所有任务产生相同的特征表示，缺乏对当前任务上下文的感知能力。

TADAM 的核心思想是：**让度量空间和特征提取都依赖于当前任务的上下文信息**，从而实现更灵活的少样本适应。

##### 核心机制一：任务依赖度量缩放（TDM）

标准原型网络的距离计算为：

$$d(\mathbf{x}, \mathbf{c}_k) = \|\phi(\mathbf{x}) - \mathbf{c}_k\|^2$$

TADAM 引入可学习的任务依赖缩放向量 \(\boldsymbol{\alpha} \in \mathbb{R}^d\)：

$$d_\alpha(\mathbf{x}, \mathbf{c}_k) = \sum_{i=1}^{d} \alpha_i \cdot (\phi(\mathbf{x})_i - (\mathbf{c}_k)_i)^2$$

其中 \(\boldsymbol{\alpha}\) 由任务表示通过一个小型网络生成：\(\boldsymbol{\alpha} = g_\alpha(\mathbf{t})\)，\(\mathbf{t}\) 是当前任务的表示向量。

> 💡 关键：缩放向量 \(\alpha\) 的作用是对嵌入空间的不同维度赋予不同权重——对当前任务区分性强的维度放大，对无关维度缩小。

**理论保证（Lemma 1）**：论文证明，对于任意两个类别 \(k, l\)，存在缩放向量 \(\boldsymbol{\alpha}^*\) 使得缩放后的类间距离严格大于未缩放时的距离：

$$d_{\alpha^*}(\mathbf{c}_k, \mathbf{c}_l) \geq d(\mathbf{c}_k, \mathbf{c}_l)$$

当且仅当原型在各维度上的差异不均匀时（即 \(\exists i,j: |\mathbf{c}_k^i - \mathbf{c}_l^i| \neq |\mathbf{c}_k^j - \mathbf{c}_l^j|\)），不等式严格成立。这从理论上保证了度量缩放不会损害分类性能，且在绝大多数实际情况下能改善类间分离度。

##### 核心机制二：任务条件特征提取（TC）

TADAM 使用 **FiLM（Feature-wise Linear Modulation）** 机制将任务信息注入特征提取器。对于特征提取器中每个残差块的激活 \(\mathbf{h}\)，FiLM 执行仿射变换：

$$\text{FiLM}(\mathbf{h}) = \boldsymbol{\gamma} \odot \mathbf{h} + \boldsymbol{\beta}$$

其中 \(\boldsymbol{\gamma}\) 和 \(\boldsymbol{\beta}\) 由任务表示 \(\mathbf{t}\) 通过线性映射生成。

**任务表示的生成**：
1. 首先用未调制的特征提取器计算 support set 各类原型
2. 对所有原型取均值得到任务表示 \(\mathbf{t}\)
3. 将 \(\mathbf{t}\) 通过 Task Embedding Network（TEN）映射为各层的 FiLM 参数

> ⚠️ 注意：FiLM 调制应用在 Batch Normalization 之后、ReLU 激活之前，这样可以有效地对归一化后的特征进行任务特定的重新缩放和偏移。

##### 核心机制三：辅助协同训练

为了防止 episode 训练中特征提取器过拟合，TADAM 引入辅助分类损失：

$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{proto}} + \lambda \cdot \mathcal{L}_{\text{aux}}$$

其中 \(\mathcal{L}_{\text{aux}}\) 是在所有基类上的标准交叉熵分类损失（使用一个额外的全连接分类头）。这一策略：
- 提供更丰富的梯度信号，加速特征提取器的训练
- 起到正则化作用，防止特征空间坍缩
- 辅助分类头在测试时丢弃，不增加推理开销

##### 网络架构

- **骨干网络**：ResNet-12（4 个残差块，每块含 3 个 3×3 卷积层），输出 512 维特征
- **Task Embedding Network**：以原型均值为输入，输出任务表示向量
- **FiLM 生成器**：线性层将任务表示映射为每个残差块的 \(\gamma, \beta\)
- **度量缩放网络**：将任务表示映射为 \(\alpha \in \mathbb{R}^{512}\)

##### 与传统方法的区别

| 方法 | 度量 | 特征提取 | 任务适应 |
|------|------|----------|----------|
| Prototypical Networks | 固定欧氏距离 | 任务无关 | 无 |
| Matching Networks | 余弦相似度 | 任务无关 | 无 |
| TADAM | 任务依赖缩放欧氏距离 | FiLM 任务条件调制 | 度量+特征双重适应 |

TADAM 的关键创新在于**同时在度量空间和特征空间两个层面引入任务依赖性**，而非仅依赖单一的适应机制。

#### 🧪 练习题

```yaml
question: "TADAM 中任务依赖度量缩放 (TDM) 的核心作用是什么？"
options:
  - "减少特征提取器的参数量"
  - "对嵌入空间各维度进行任务特定的加权，增强类间区分度"
  - "替代原型网络中的原型计算方式"
  - "加速模型的训练收敛"
answer: 1
explain: "TDM 通过学习任务依赖的缩放向量 α 对距离度量的各维度加权，放大对当前任务有区分力的维度，论文 Lemma 1 证明这能改善类间分离度。"
```