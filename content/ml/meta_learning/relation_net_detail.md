### Relation Network — Learning to Compare: Relation Network for Few-Shot Learning

```yaml
id: relation_net
name: Relation Network
full_name: "Learning to Compare: Relation Network for Few-Shot Learning"
year: 2018
org: "University of Technology Sydney / University of Edinburgh"
paper_url: "https://arxiv.org/abs/1711.06025"
category: "metric_learning"
parent: "—"
motivation: "用可学习的神经网络替代手工设计的度量函数"
```

#### 📝 一句话总结

Relation Network 提出用端到端可学习的关系模块（Relation Module）替代传统度量学习中手工设计的距离函数（如欧氏距离、余弦相似度），通过将 support 和 query 样本的嵌入拼接后送入深度网络来直接学习样本间的"关系分数"，在 few-shot 分类任务上取得了优异性能。

#### 🎯 核心要点

- 双模块架构：Embedding Module \(f_\varphi\) 提取特征 + Relation Module \(g_\phi\) 计算关系分数
- 核心思想：用可学习的非线性神经网络替代固定的距离度量（欧氏距离/余弦距离）
- Episode-based 训练：模拟测试时的 N-way K-shot 场景进行训练
- K-shot 聚合策略：对同类 K 个 support 样本的嵌入做 element-wise summation
- 损失函数：MSE 回归损失（而非交叉熵），将关系分数回归到 0/1 目标
- 零样本扩展：通过异构嵌入模块将语义属性向量映射到与视觉特征相同的空间
- 在 Omniglot、miniImageNet 上达到当时 SOTA 或接近 SOTA 的 few-shot 分类精度

#### 🔬 深入细节

##### 核心架构图

![Relation Network 架构图](https://ar5iv.labs.arxiv.org/html/1711.06025/assets/x1.png)
*图：5-way 1-shot 场景下 Relation Network 的完整架构。左侧为 support set 和 query 的嵌入过程，右侧为关系模块的比较与评分。*

##### 算法伪代码

```python
# Relation Network Episode Training (C-way K-shot)
for episode in range(num_episodes):
    # 1. 采样 episode
    sample C classes, K support + Q query per class
    
    # 2. Embedding
    for each support sample x_i:
        z_i = f_phi(x_i)  # 64-dim feature maps
    
    # 3. K-shot 聚合 (element-wise sum per class)
    for each class c:
        z_c = sum(z_i for x_i in class c)  # shape 不变
    
    # 4. 拼接 & 计算关系分数
    for each query x_j:
        z_j = f_phi(x_j)
        for each class c:
            combined = concat(z_c, z_j, dim=channel)  # depth concatenation
            r_cj = g_phi(combined)  # scalar in [0,1] via sigmoid
    
    # 5. MSE Loss
    loss = sum((r_cj - 1(y_j == c))^2) for all pairs
    
    # 6. 更新 f_phi 和 g_phi (Adam, lr=1e-3)
    optimizer.step(loss)
```

##### 动机与背景

传统 few-shot 学习中的度量学习方法（如 Siamese Network、Matching Network、Prototypical Network）都依赖**固定的距离函数**来衡量样本间的相似度：

| 方法 | 距离度量 |
|------|---------|
| Siamese Network | 加权 L1 距离 |
| Matching Network | 余弦相似度 |
| Prototypical Network | 欧氏距离 |

这些手工设计的距离函数虽然简单有效，但缺乏灵活性——它们假设嵌入空间中的距离结构是线性的或预定义的。Relation Network 的核心洞察是：

> 💡 关键：既然我们可以学习嵌入函数，为什么不能同时学习比较函数？让网络自己决定"什么叫相似"。

##### 核心机制详解

**1. Embedding Module \(f_\varphi\)**

嵌入模块由 4 个卷积块组成，每个块包含：
- 3×3 卷积（64 个滤波器），padding=1
- Batch Normalization
- ReLU 激活
- 前两个块后接 2×2 Max Pooling（后两个不接，保留空间信息供关系模块使用）

输出为 64 通道的特征图（而非向量），这是与 Prototypical Network 等方法的关键区别——保留了空间结构信息。

**2. 关系分数计算**

给定 support 样本 \(x_i\) 和 query 样本 \(x_j\)，关系分数定义为：

$$r_{i,j} = g_\phi\big(\mathcal{C}(f_\varphi(x_i),\; f_\varphi(x_j))\big)$$

其中 \(\mathcal{C}(\cdot, \cdot)\) 表示在通道维度上的拼接（depth-wise concatenation）。

对于 K-shot 场景，先对同类 K 个 support 样本的嵌入做 element-wise summation 得到类原型：

$$r_{c,j} = g_\phi\left(\mathcal{C}\left(\sum_{k=1}^{K} f_\varphi(x_k^c),\; f_\varphi(x_j)\right)\right)$$

> ⚠️ 注意：这里使用的是 **element-wise sum** 而非 mean，作者认为这在实验中效果更好。

**3. Relation Module \(g_\phi\)**

关系模块接收拼接后的 128 通道特征图，结构为：
- 2 个卷积块（3×3, 64 filters, BN, ReLU, 2×2 Max Pool）
- Flatten
- 全连接层：→ 8 维（ReLU）
- 全连接层：→ 1 维（Sigmoid）

Sigmoid 确保输出 \(r \in [0, 1]\)，可解释为"关系强度"或"相似概率"。

**4. MSE 损失函数**

不同于常见的交叉熵分类损失，Relation Network 使用均方误差：

$$\mathcal{L} = \sum_{i=1}^{m} \sum_{j=1}^{n} \left(r_{i,j} - \mathbf{1}(y_i = y_j)\right)^2$$

其中目标值为 1（同类）或 0（异类）。

> 💡 关键：使用 MSE 而非交叉熵的原因是——关系分数被视为一个 [0,1] 区间的回归目标，MSE 对中间值的梯度更平滑，配合 Sigmoid 输出更自然。作者实验表明 MSE 略优于交叉熵。

##### 训练与推理流程

**训练**：采用 episodic training，每个 episode 模拟一个 N-way K-shot 任务：
1. 从训练集随机采样 N 个类，每类 K 个 support + 若干 query
2. 通过嵌入模块提取所有样本的特征图
3. 对 support 按类聚合，与每个 query 拼接后送入关系模块
4. 计算 MSE 损失，通过 Adam 优化器（lr=10⁻³，每 100k episode 减半）端到端更新两个模块

**推理**：给定新的 N-way K-shot 任务，对 query 样本计算其与 N 个类的关系分数，取最大分数对应的类作为预测：

$$\hat{y}_j = \arg\max_{c \in \{1,...,N\}} r_{c,j}$$

##### 与传统方法的核心区别

| 特性 | Prototypical Net | Matching Net | **Relation Net** |
|------|-----------------|--------------|-----------------|
| 距离函数 | 固定欧氏距离 | 固定余弦距离 | **可学习神经网络** |
| 嵌入输出 | 向量 | 向量 | **特征图（保留空间信息）** |
| 损失函数 | 交叉熵 | 交叉熵 | **MSE** |
| 比较方式 | 计算距离 | 注意力加权 | **拼接+网络前向** |

Relation Network 的优势在于：关系模块可以学习到比固定距离更复杂的非线性相似性度量，且嵌入模块无需将所有判别信息压缩到一个"好的"距离空间中——两个模块可以协同优化。

##### 零样本学习扩展

Relation Network 可自然扩展到零样本学习：将类别的语义属性向量（如 word embedding 或人工标注属性）通过一个独立的嵌入模块映射到与视觉特征相同的空间，然后用相同的关系模块计算视觉-语义关系分数。

#### 🧪 练习题

```yaml
question: "Relation Network 相比 Prototypical Network 的核心创新是什么？"
options:
  - "使用了更深的嵌入网络提取特征"
  - "用可学习的神经网络替代固定的距离度量函数"
  - "引入了数据增强策略提升泛化能力"
  - "使用 Transformer 注意力机制进行样本比较"
answer: 1
explain: "Relation Network 的核心贡献是用端到端可学习的 Relation Module（神经网络）替代 Prototypical Network 中固定的欧氏距离，使相似性度量本身也成为可学习的组件。"
```