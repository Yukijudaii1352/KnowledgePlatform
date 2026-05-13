### Matching Networks

```yaml
id: matching_networks
name: Matching Networks
full_name: "匹配网络 (Matching Networks for One Shot Learning)"
year: "2016"
org: "Google DeepMind"
paper_url: "https://arxiv.org/abs/1606.04080"
category: metric_learning
parent: "—"
motivation: "提出基于注意力和记忆的少样本学习框架，用端到端可微的最近邻实现one-shot分类"
```

#### 📝 一句话总结

Matching Networks 提出了一种基于注意力机制的端到端可微最近邻分类框架，通过 episodic 训练策略使训练过程与测试条件一致，在 one-shot 学习任务上取得了突破性表现。

#### 🎯 核心要点

- 提出端到端可微的最近邻分类器：\(\hat{y} = \sum_{i=1}^{k} a(\hat{x}, x_i) y_i\)，基于注意力核的加权求和
- 注意力核使用 cosine 相似度 + softmax：\(a(\hat{x}, x_i) = \text{softmax}(c(f(\hat{x}), g(x_i)))\)
- Full Context Embeddings (FCE)：用 bidirectional LSTM 编码支持集，用 attention LSTM 编码查询样本，使嵌入依赖于整个支持集上下文
- Episodic 训练策略：训练时模拟测试场景，每个 episode 随机采样少量类别和样本构成支持集与查询集
- 在 Omniglot（98.1% 5-way 1-shot）和 miniImageNet（46.6% 5-way 1-shot）上验证了有效性

#### 🔬 深入细节

![Matching Networks 架构图](https://ar5iv.labs.arxiv.org/html/1606.04080/assets/x1.png)
*图：Matching Networks 模型架构。左侧为支持集样本通过嵌入函数 g 编码，右侧为查询样本通过嵌入函数 f 编码，通过注意力机制计算相似度并输出预测。*

```python
# Matching Networks 核心推理伪代码
def matching_network_predict(support_set, query, f_embed, g_embed):
    """
    support_set: [(x_1, y_1), ..., (x_k, y_k)]  支持集
    query: x_hat  查询样本
    """
    # 编码支持集样本（可选 FCE: 使用 biLSTM）
    support_embeddings = [g_embed(x_i) for x_i, y_i in support_set]
    
    # 编码查询样本（可选 FCE: 使用 attention LSTM）
    query_embedding = f_embed(query)
    
    # 计算注意力权重（cosine similarity + softmax）
    similarities = [cosine(query_embedding, s_i) for s_i in support_embeddings]
    attention_weights = softmax(similarities)
    
    # 加权求和得到预测
    y_hat = sum(a_i * y_i for a_i, (_, y_i) in zip(attention_weights, support_set))
    return y_hat  # 输出为类别概率分布
```

**动机与背景**

传统深度学习方法需要大量标注数据才能训练有效的分类器，而人类可以仅凭一个示例就学会识别新类别。One-shot learning 旨在解决这一问题：给定每个类别仅一个（或极少数）标注样本，如何对新样本进行准确分类？

此前的方法（如 Siamese Networks）虽然利用了度量学习的思想，但训练目标与测试场景存在不一致——训练时在大量类别上做标准分类，测试时却要在全新类别上做 few-shot 分类。Matching Networks 同时解决了两个问题：(1) 设计了一个端到端可微的非参数化分类器；(2) 提出了使训练与测试条件一致的 episodic 训练策略。

**核心机制：注意力分类器**

Matching Networks 的核心思想是将分类问题建模为一个条件概率：

$$P(\hat{y} | \hat{x}, S) = \sum_{i=1}^{k} a(\hat{x}, x_i) y_i$$

其中 \(S = \{(x_i, y_i)\}_{i=1}^k\) 是支持集，\(\hat{x}\) 是查询样本。注意力核 \(a\) 定义为：

$$a(\hat{x}, x_i) = \frac{e^{c(f(\hat{x}), g(x_i))}}{\sum_{j=1}^{k} e^{c(f(\hat{x}), g(x_j))}}$$

其中 \(c\) 为 cosine 距离，\(f\) 和 \(g\) 分别是查询样本和支持集样本的嵌入函数。

> 💡 关键：这本质上是一个"软"最近邻分类器——如果注意力集中在单个样本上，就退化为标准 kNN；如果注意力分散，则相当于加权投票。整个过程完全可微，可以端到端训练。

**Full Context Embeddings (FCE)**

简单版本中 \(f\) 和 \(g\) 是独立的 CNN/VGG 编码器。但作者指出，好的嵌入应该依赖于整个支持集的上下文——例如，如果支持集中两个类别非常相似，嵌入应该更关注区分性特征。

FCE 通过两个机制实现上下文感知：

1. **支持集编码** \(g(x_i, S)\)：先用 CNN 提取特征 \(g'(x_i)\)，再通过 bidirectional LSTM 处理整个支持集，使每个样本的嵌入融合其他样本的信息：

$$g(x_i, S) = \overrightarrow{h_i} + \overleftarrow{h_i} + g'(x_i)$$

2. **查询编码** \(f(\hat{x}, S)\)：使用带注意力的 LSTM，在 K 步中不断"读取"支持集来精炼查询嵌入：

$$\hat{h}_k, c_k = \text{LSTM}(f'(\hat{x}), [h_{k-1}, r_{k-1}], c_{k-1})$$

$$h_k = \hat{h}_k + f'(\hat{x})$$

$$r_{k-1} = \sum_{i=1}^{|S|} a(h_{k-1}, g(x_i)) \cdot g(x_i)$$

其中 \(a\) 是对支持集嵌入的 softmax 注意力。经过 K 步后，最终的查询嵌入 \(f(\hat{x}, S) = h_K\) 融合了支持集的全局信息。

> ⚠️ 注意：FCE 的引入使得嵌入不再是固定的，而是随支持集动态变化。这是 Matching Networks 区别于简单 Siamese Networks 的关键创新。

**Episodic 训练策略**

训练目标为最大化：

$$\theta = \arg\max_\theta E_{L \sim T} \left[ E_{S \sim L, B \sim L} \left[ \sum_{(x,y) \in B} \log P_\theta(y | x, S) \right] \right]$$

具体做法：每个训练 episode 从训练集标签集合 \(T\) 中随机采样一个子集 \(L\)（如 5 个类），再从 \(L\) 中采样支持集 \(S\)（每类 1 或 5 个样本）和查询集 \(B\)，然后在这个 mini-task 上计算损失并更新参数。

> 💡 关键：这种"学会学习"的训练方式确保了模型在训练时就习惯了 few-shot 场景，避免了训练-测试不一致的问题。这一策略后来成为 meta-learning 领域的标准范式。

**与传统方法的区别**

| 方面 | 传统分类器 | Siamese Networks | Matching Networks |
|------|-----------|-----------------|-------------------|
| 分类方式 | 参数化 softmax | 成对相似度判断 | 非参数化注意力分类 |
| 新类别适应 | 需要重新训练 | 可泛化但无上下文 | 支持集条件化，即时适应 |
| 训练策略 | 标准分类损失 | 对比/三元组损失 | Episodic 训练 |
| 嵌入特性 | 固定嵌入 | 固定嵌入 | FCE 动态嵌入 |

**实验结果**

- Omniglot 5-way 1-shot: **98.1%**（FCE），20-way 1-shot: **93.8%**（FCE）
- miniImageNet 5-way 1-shot: **46.6%**（FCE），5-way 5-shot: **60.0%**（FCE）
- 在 full ImageNet 上也展示了从 rand → lstm → FCE 的持续提升

#### 🧪 练习题

```yaml
question: "Matching Networks 中 Full Context Embeddings (FCE) 的核心作用是什么？"
options:
  - "增加模型参数量以提升拟合能力"
  - "使样本嵌入依赖于整个支持集上下文，实现动态表征"
  - "替代 CNN 特征提取器以减少计算量"
  - "在训练时引入数据增强以防止过拟合"
answer: 1
explain: "FCE 通过 biLSTM 编码支持集、attention LSTM 编码查询，使嵌入不再固定而是随支持集动态调整，从而更好地捕捉类间区分性信息。"
```