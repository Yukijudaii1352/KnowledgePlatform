### DoReMi

```yaml
id: doremi
name: DoReMi
full_name: "DoReMi数据配比优化 (DoReMi: Optimizing Data Mixtures)"
year: '2023'
org: Stanford
paper_url: https://arxiv.org/abs/2305.10429
category: data
parent: —
motivation: 极小极大优化自动确定数据配比
```

#### 📝 一句话总结

DoReMi 用小型代理模型和 Group DRO 极小极大优化自动学习预训练数据的领域采样权重，避免靠人工直觉或下游任务网格搜索确定数据配比。它先训练 reference model，再训练 DRO proxy model 产生 domain weights，最后用这些权重训练大模型，从而加速预训练并提升多域表现。

#### 🎯 核心要点

- 全名 Domain Reweighting with Minimax Optimization，目标是自动优化多域预训练数据 mixture proportions
- 输入是一组领域数据，如 Wikipedia、Books、Web、GitHub、ArXiv 等，以及初始 reference weights
- 先按参考权重训练小 reference model，用于估计每个样本/领域的基线难度
- 再训练小 proxy model，用 Group DRO 最小化最坏领域的 excess loss
- excess loss 是 proxy loss 相对 reference loss 的差值，用来强调“可学但当前学得不够好”的领域
- 训练过程中用 exponentiated gradient 更新领域权重，最终取平均权重作为大模型数据配比
- 在 The Pile 上用 280M proxy 为 8B 模型定权重，平均 few-shot 准确率提升 6.5 个百分点，并以 2.6x 更少步数达到基线

#### 🔬 深入细节

![DoReMi 三阶段流程](https://ar5iv.labs.arxiv.org/html/2305.10429/assets/x1.png)
*图：DoReMi 论文 Figure 1，先训练 reference model，再用 Group DRO 训练 proxy model 得到领域权重，最后训练大模型。*

```python
# DoReMi 数据配比优化伪代码
def doremi(domain_datasets, reference_weights):
    # Step 1: 训练小 reference model
    ref_model = train_lm(domain_datasets, domain_weights=reference_weights, size="small")

    # Step 2: 用 Group DRO 训练 proxy，并在线更新领域权重
    q = uniform_weights(domain_datasets)
    proxy = init_model(size="small")
    q_history = []
    for step in range(T):
        batch = sample_domains(domain_datasets, weights=uniform_weights(domain_datasets))
        excess = {}
        for domain, examples in batch.by_domain().items():
            proxy_loss = token_nll(proxy, examples)
            ref_loss = token_nll(ref_model, examples)
            excess[domain] = mean(max(proxy_loss - ref_loss, 0.0))

        q = q * exp(eta * vector(excess))
        q = smooth_and_normalize(q, epsilon=1e-3)
        proxy = optimizer_step(proxy, weighted_loss(batch, q))
        q_history.append(q)

    optimized_weights = average(q_history)

    # Step 3: 用优化后的权重训练大模型
    large_model = train_lm(domain_datasets, domain_weights=optimized_weights, size="large")
    return optimized_weights, large_model
```

**动机与背景：数据配比是 LLM 训练里昂贵但关键的超参数。** 预训练语料通常由许多领域组成：网页、百科、书籍、论文、代码、对话、法律等。不同权重会显著影响模型能力，但直接在大模型上搜索配比代价极高，而且用下游任务调权重容易过拟合某个 benchmark。DoReMi 的目标是用小模型、无下游任务标签的方式，找到对所有领域都更稳健的采样比例。

**核心机制：优化最坏领域的 excess loss。** DoReMi 不直接最大化某个下游指标，而是使用 Group DRO：

$$
\min_\theta \max_{q\in \Delta_m} \sum_{i=1}^{m} q_i \cdot \ell_i^{\text{excess}}(\theta)
$$

其中 \(q_i\) 是第 \(i\) 个领域的权重，\(\ell_i^{\text{excess}}\) 是 proxy model 相对 reference model 的额外损失。reference loss 的作用是校准领域难度：如果某个领域本身熵很高，原始 loss 高不一定代表应该加权；只有 reference 已经能较好处理、但 proxy 仍落后的领域，才更值得上调。

**训练流程：小模型调权，大模型受益。** DoReMi 分三步：先训练 reference model；再训练 DRO proxy model，同时根据每个领域的 excess loss 用 exponentiated gradient 调整领域权重；最后把平均后的权重用于训练更大的主模型。论文实验中，280M proxy/reference 的额外成本只占训练 8B 模型的一小部分，但能显著改善 The Pile 上所有领域的 perplexity，并提升 few-shot 下游准确率。

**与人工配比和下游网格搜索的区别。** 人工配比依赖经验，例如上采样 Wikipedia、代码或论文；下游调权需要训练许多候选模型，且会绑定到某组任务。DoReMi 则把数据配比转化为训练时可优化的问题：谁的 excess loss 高，谁就被加权；谁已经相对 reference 学得足够好，就不再盲目增加。这样得到的权重不是“哪个领域最干净”，而是“哪个领域对当前模型训练最有边际价值”。

> 💡 关键：DoReMi 的 domain weights 是小模型训练动态的产物，而不是静态数据统计；它优化的是跨领域稳健性和学习效率。

#### 🧪 练习题

```yaml
question: "DoReMi 为什么要使用 reference model 的 loss？"
options:
  - "为了估计样本/领域本身的难度，避免只因高熵领域 loss 高就过度加权"
  - "为了替代 proxy model，不再训练代理模型"
  - "为了把所有领域权重固定为相同值"
  - "为了只优化下游任务准确率"
answer: 0
explain: "excess loss = proxy loss - reference loss，可突出 reference 已能处理但 proxy 仍学得不足的领域，减少对天然高难度/高熵领域的误加权。"
```
