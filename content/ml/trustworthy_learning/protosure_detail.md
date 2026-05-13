### ProtoSurE

```yaml
id: protosure
name: ProtoSurE
full_name: "基于原型的代理解释器 (Prototype-based Surrogate Explainer)"
year: 2025
org: George Mason University
paper_url: "https://ojs.aaai.org/index.php/AAAI/article/view/33451"
category: trustworthy_learning
parent: "—"
motivation: "通过原型网络蒸馏LLM行为，提供句子级忠实且可解释的解释"
```

#### 📝 一句话总结

ProtoSurE 提出了一种基于原型网络的代理解释器，通过将黑盒 LLM 的行为蒸馏为句子-原型匹配的可解释模型，在忠实性和人类可理解性之间实现了最优平衡，仅需 128 个样本即可逼近最优性能。

#### 🎯 核心要点

- **代理模型范式**：训练轻量可解释模型模拟黑盒 LLM 的输入-输出行为，而非直接解释 LLM 内部机制
- **句子级粒度解释**：将输入文本分割为句子，提供句子级别的重要性归因，比 token 级更符合人类阅读习惯
- **原型匹配机制**：每个类别维护 K 个可学习原型向量，通过句子与原型的余弦相似度进行分类决策
- **Token 归因增强编码**：利用目标 LLM 的 token 级注意力/梯度归因分数加权句子嵌入，提升对 LLM 推理的对齐
- **注意力聚合**：通过可学习注意力机制将多句子表示聚合为文档级表示
- **高数据效率**：仅需 128–256 个训练样本即可达到接近最优的准确率和忠实性
- **广泛适用性**：支持开源 (Llama-3.1-8B, Llama-3.2-3B, Qwen2.5-7B) 和闭源 (GPT-4o-mini) LLM
- **7 项忠实性指标全面领先**：在 Comprehensiveness、Sufficiency、DFF、DFS、Deletion、Insertion 等指标上超越 SHAP、IG、Occlusion、DeepLift 等基线

#### 🔬 深入细节

##### 问题动机与背景

现有 LLM 解释方法存在三大缺陷：

1. **后验归因方法**（SHAP、LIME、Integrated Gradients）：需要大量前向传播（SHAP 对 n 个特征需 \(2^n\) 次查询），计算代价高昂；且仅提供 token 级分数，缺乏语义可理解性
2. **自解释方法**（Chain-of-Thought、Self-Explanation）：依赖 LLM 自身生成解释，研究表明这些解释往往不忠实于模型实际推理过程
3. **注意力可视化**：注意力权重与特征重要性之间的关系尚有争议，不能直接作为可靠解释

ProtoSurE 的核心思路是：训练一个**可解释的代理模型**来模拟 LLM 行为，该代理模型本身的决策过程就是透明的——通过"这个句子像哪个原型"来做出预测。

##### 模型架构总览

![ProtoSurE 架构示意图](https://ojs.aaai.org/index.php/AAAI/article/view/33451)
*图：ProtoSurE 框架包含三个核心步骤：(1) 句子分割与 Token 归因加权编码；(2) 注意力聚合为文档表示；(3) 原型匹配与分类预测。每个原型代表一个语义概念（如"清洁度"、"服务质量"），解释通过句子-原型相似度自然产生。*

##### 核心技术细节

**Step 1: 句子分割与 Token 归因增强编码**

输入文本 \(x\) 被分割为句子序列 \(\{s_1, s_2, ..., s_n\}\)。每个句子通过预训练句子编码器（如 all-mpnet-base-v2）获得基础嵌入。

关键创新在于**Token 归因加权**：从目标 LLM 提取 token 级归因分数 \(a_t\)（通过注意力或梯度方法），对句子内 token 嵌入进行加权聚合：

$$e_i = \text{Encoder}(s_i, \{a_t\}_{t \in s_i})$$

这使得句子表示更加对齐目标 LLM 的关注模式。实验表明该设计平均提升 0.6-0.8% 准确率。

**Step 2: 注意力聚合**

多个句子嵌入通过可学习注意力机制聚合为文档级表示：

$$\alpha_i = \frac{\exp(w^\top e_i)}{\sum_{j=1}^n \exp(w^\top e_j)}$$

$$d = \sum_{i=1}^n \alpha_i \cdot e_i$$

其中 \(w\) 为可学习注意力向量。注意力权重 \(\alpha_i\) 直接反映了每个句子对最终预测的贡献程度，是句子级解释的核心来源。

**Step 3: 原型匹配与分类**

每个类别 \(c\) 维护 \(K\) 个可学习原型向量 \(\{p_1^c, p_2^c, ..., p_K^c\}\)。分类通过计算文档表示与各类原型的相似度完成：

$$\text{sim}(d, p_k^c) = \frac{d \cdot p_k^c}{\|d\| \cdot \|p_k^c\|}$$

最终预测为：

$$\hat{y} = \arg\max_c \sum_{k=1}^K w_k^c \cdot \text{sim}(d, p_k^c)$$

其中 \(w_k^c\) 为各原型的类别权重。原型通过 K-means 初始化后在训练中持续更新。

##### 算法伪代码

```python
# ProtoSurE 训练与推理流程
def protosure_train(texts, llm_predictions, encoder, K, num_classes):
    # 初始化：K-means 聚类初始化原型
    prototypes = kmeans_init(encoder, texts, K * num_classes)
    
    for epoch in range(num_epochs):
        for text, y_llm in zip(texts, llm_predictions):
            # Step 1: 句子分割与编码
            sentences = sent_tokenize(text)
            token_attrs = get_llm_attribution(text)  # 从目标LLM获取token归因
            embeddings = [encoder(s, token_attrs[s]) for s in sentences]
            
            # Step 2: 注意力聚合
            attn_weights = softmax(W @ embeddings)
            doc_repr = sum(attn_weights * embeddings)
            
            # Step 3: 原型匹配
            similarities = cosine_sim(doc_repr, prototypes)
            logits = class_weights @ similarities
            pred = argmax(logits)
            
            # 损失：交叉熵 + 多样性正则
            loss = CE(logits, y_llm) + lam * diversity_loss(prototypes)
            loss.backward()
            optimizer.step()  # 更新编码器、注意力、原型、权重

def protosure_explain(text, model):
    sentences = sent_tokenize(text)
    embeddings = model.encode(sentences)
    attn_weights = model.attention(embeddings)  # 句子重要性
    
    # 解释 = 每个句子的注意力权重 + 最匹配的原型语义标签
    for s, w, emb in zip(sentences, attn_weights, embeddings):
        proto_match = most_similar_prototype(emb)
        print(f"Sentence: {s}")
        print(f"  Importance: {w:.3f}, Matches Prototype: {proto_match.label}")
```

##### 训练目标与损失函数

ProtoSurE 的训练目标是最小化代理模型与目标 LLM 预测之间的交叉熵损失，同时加入原型多样性正则化：

$$\mathcal{L} = \mathcal{L}_{CE}(\hat{y}, y_{LLM}) + \lambda \mathcal{L}_{div}$$

其中多样性损失确保同类原型之间保持足够差异，避免退化为相同表示。

> 💡 **关键设计思想**：ProtoSurE 的解释不是事后附加的，而是模型决策过程本身——"模型认为这个句子像'清洁度'原型（相似度 0.92），所以判定为正面评价"。这种 case-based reasoning 天然具有可解释性。

##### 忠实性评估体系

论文采用 7 项互补的忠实性指标：

| 指标 | 含义 | 方向 |
|------|------|------|
| Comprehensiveness | 移除重要特征后预测变化幅度 | ↑ |
| Sufficiency | 仅保留重要特征时预测保持程度 | ↓ |
| DFF (Decision Flip Fraction) | 移除最重要句子后决策翻转比例 | ↓ |
| DFS (Decision Flip with Sentence) | 仅用最重要句子能复现决策的比例 | ↑ |
| Deletion | 按重要性递减删除时排序相关性 | ↑ |
| Insertion | 按重要性递增添加时排序相关性 | ↑ |

##### 与现有方法的关键区别

| 维度 | SHAP/LIME | 注意力方法 | 自解释 | ProtoSurE |
|------|-----------|-----------|--------|-----------|
| 粒度 | Token | Token | 自由文本 | 句子 |
| 计算代价 | \(O(2^n)\) 查询 | 单次前向 | 单次生成 | 单次前向 |
| 忠实性 | 中等 | 有争议 | 不忠实 | 高 |
| 可理解性 | 低（数值分数） | 低 | 高但不可靠 | 高且可靠 |
| 需要模型内部访问 | 否/是 | 是 | 否 | 否 |

> ⚠️ **注意**：ProtoSurE 作为代理模型，其忠实性上限取决于代理模型对目标 LLM 的模拟精度。实验显示平均准确率达 89.6%，意味着约 10% 的情况下解释可能偏离 LLM 的真实推理。

##### 实验亮点

- **数据效率**：Hotel 数据集上 Llama-3.1-8B 仅用 128 样本即达 96.5% 准确率（最优 1024 样本为 98.4%）
- **原型数量鲁棒**：K=3~10 范围内性能稳定，K=5 通常为最优
- **编码器无关**：all-mpnet-base-v2、BGE-M3、E5-large 等编码器性能差异仅 0.007 个百分点
- **可训练原型优于固定原型**：更新策略平均提升 1.0-1.2% 准确率
- **Token 归因增强**：集成 LLM 归因分数平均提升 0.6-0.8% 准确率
- **GPT-4o-mini 扩展**：在闭源模型上同样全面超越 SHAP、Occlusion、SELF-EXP 基线

#### 🧪 练习题

```yaml
question: "ProtoSurE 相比传统 SHAP 方法的核心优势是什么？"
options:
  - "使用更大的预训练模型作为编码器"
  - "通过原型匹配提供句子级语义解释，同时避免指数级查询开销"
  - "直接访问 LLM 内部注意力权重进行解释"
  - "利用 Chain-of-Thought 让 LLM 自己生成解释"
answer: 1
explain: "ProtoSurE 训练代理模型一次后仅需单次前向传播即可生成解释，避免了 SHAP 的 O(2^n) 查询开销；同时通过原型匹配提供语义层面的句子级解释（如'该句匹配清洁度原型'），比 SHAP 的数值分数更具人类可理解性。"
```