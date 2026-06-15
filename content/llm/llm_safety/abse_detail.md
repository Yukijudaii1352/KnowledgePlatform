### ABSE: 自适应贝叶斯语义熵幻觉检测

```yaml
id: abse
name: ABSE
full_name: 自适应贝叶斯语义熵 (Adaptive Bayesian Semantic Entropy)
year: '2026.01'
org: AAAI
paper_url: https://doi.org/10.1609/aaai.v40i44.41074
category: hallucination
parent: rag
motivation: 自适应语义熵平衡精度效率
```

#### 📝 一句话总结

ABSE 用贝叶斯后验不确定性自适应决定需要采样多少个回答，并通过语义探索更快覆盖可能答案簇，从而以更低采样成本估计语义熵并检测幻觉。

#### 🎯 核心要点

- **背景方法**：语义熵把多次采样答案按语义等价类聚类，答案分布越分散，模型越可能不确定或幻觉。
- **核心问题**：固定采样预算浪费明显，简单问题不需要很多样本，困难问题又可能样本不够。
- **贝叶斯估计**：把语义簇概率看作随机变量，维护后验均值和方差，用不确定性阈值决定是否继续采样。
- **语义探索**：在关键 token 处引导生成替代续写，以重要性采样方式更快发现新的语义簇。
- **工程价值**：在 RAG 或问答系统中，可以按问题难度动态花费检测预算。

#### 🔬 深入细节

![ABSE 方法示意图](https://arxiv.org/html/2603.22812v1/2603.22812v1/figures/teaser-1.png)

图源：`Efficient Hallucination Detection: Adaptive Bayesian Estimation of Semantic Entropy with Guided Semantic Exploration` 公开论文页面。

```text
Algorithm: Adaptive Bayesian Semantic Entropy
Input:
  prompt x, generator M
  semantic equivalence classifier C
  variance threshold tau
  max sample budget B
Output:
  estimated semantic entropy H and hallucination decision

1. Initialize a Dirichlet-style posterior over semantic clusters.
2. For n = 1..B:
     sample answer y_n from M(x), or guided variant y'_n.
     assign y_n to semantic cluster c_n using C.
     update posterior counts, with importance weight if guided.
     estimate cluster probabilities p(c | x).
     compute semantic entropy H = - sum_c p(c | x) log p(c | x).
     compute posterior variance Var(H).
     if Var(H) < tau:
         break.
3. Return H and flag hallucination if H exceeds deployment threshold.
```

语义熵的直觉是：如果模型真正知道答案，多次采样虽然措辞不同，但语义应集中在少数等价类；如果模型不确定，采样会分散到多个互相矛盾的答案簇。ABSE 继承这个思想，但不再固定采样次数，而是估计“当前 entropy 估计有多可靠”。

贝叶斯部分把每个语义簇的概率当作后验分布，而不是只用频数点估计。每新增一个样本，后验均值会更新，后验方差会下降。当方差已经低于阈值时，继续采样带来的收益很小，算法提前停止；当答案簇仍不稳定时，算法继续投入预算。

Guided Semantic Exploration 解决另一个问题：普通采样可能长时间重复高概率答案，错过低概率但语义不同的候选。方法在生成过程中选择关键 token 位置，替换为 top-k 替代 token 并继续生成，再用重要性权重校正由引导分布带来的偏差。这样可以更快发现隐藏的语义分歧。

在 RAG 系统里，ABSE 可以作为“回答置信度后验估计器”。对证据充分、答案稳定的问题，它很快停止；对证据冲突或模型知识不足的问题，它会看到更高语义熵并触发检索增强、拒答或人工复核。实际落地要校准两个阈值：后验方差停止阈值和语义熵风险阈值。

#### 🧪 练习题

1. 为什么语义熵比 token-level entropy 更适合检测开放问答幻觉？
2. 自适应停止如何同时降低成本和保持检测精度？
3. Guided Semantic Exploration 为什么需要重要性权重校正？
