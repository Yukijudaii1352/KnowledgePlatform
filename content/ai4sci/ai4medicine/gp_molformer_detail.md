### GP-MoLFormer — 通用性质分子Transformer (GP-MoLFormer)

```yaml
id: gp_molformer
name: GP-MoLFormer
full_name: 通用性质分子Transformer (GP-MoLFormer)
year: '2025'
org: IBM Research
paper_url: https://doi.org/10.1039/D5DD00122F
category: generation
parent: chemgpt
motivation: 11亿SMILES预训练支持pair-tuning
```

#### 📝 一句话总结

GP-MoLFormer 是 IBM 提出的 46.8M 参数 decoder-only 分子语言模型，在 6.5 亿到 11 亿条 canonical SMILES 上用因果语言建模预训练，并通过 scaffold prompt 和 pair-tuning 支持从无条件生成到性质优化的分子设计任务。

#### 🎯 核心要点

- **大规模自回归 SMILES 生成器**：使用 MoLFormer block 的 decoder-only 版本，在 PubChem + ZINC 的 11 亿 SMILES 上预训练
- **高效 Transformer 结构**：12 层、12 个 attention heads、hidden size 768，结合 linear attention 和 rotary positional embedding 降低长序列训练成本
- **两种数据版本**：GP-MoLFormer 使用 1.1B SMILES；GP-MoLFormer-Uniq 使用去重后的 650M SMILES，减少重复分子带来的 memorization
- **无额外训练的 scaffold decoration**：把 scaffold 的 randomized SMILES 作为前缀，让 causal decoder 自然补全侧链和片段
- **pair-tuning 性质优化**：只学习 20 个 soft prompt embeddings，用“低性质 seed 分子 → 高性质 target 分子”的有序分子对引导生成方向
- **三类评估任务**：de novo generation、scaffold-constrained molecular decoration、QED/penalized logP/DRD2 的 property-guided optimization
- **规模化生成分析**：报告 30K 到 10B 生成规模下的 novelty、validity、uniqueness，并指出训练数据重复会提高记忆化、降低新颖性

#### 🔬 深入细节

##### 模型图示

![GP-MoLFormer 总览](https://pubs.rsc.org/image/article/2025/DD/d5dd00122f/d5dd00122f-f1.gif)
*图：GP-MoLFormer 的两种使用方式。A 部分展示自回归 SMILES 生成；B 部分展示 pair-tuning，通过可学习 prompt vector 把 seed molecule 的表示推向性质更优的分子区域。*

![GP-MoLFormer 生成分布示例](https://pubs.rsc.org/image/article/2025/DD/d5dd00122f/d5dd00122f-f2.gif)
*图：GP-MoLFormer-Uniq 生成分子的 logP、QED、合成可及性和分子量分布与 held-out test distribution 的对比，用于验证生成分布是否贴近训练化学空间。*

##### 算法核心流程

```python
# GP-MoLFormer 预训练
model = DecoderOnlyMoLFormer(
    layers=12,
    heads=12,
    hidden_size=768,
    attention="linear",
    position_embedding="rotary",
)

for batch_smiles in billion_scale_smiles_loader():
    tokens = tokenize_canonical_smiles(batch_smiles, vocab_size=2362)
    input_tokens = tokens[:, :-1]
    target_tokens = tokens[:, 1:]

    logits = model(input_tokens, causal_mask=True)
    loss = cross_entropy(logits, target_tokens)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# scaffold-constrained generation: scaffold 直接作为前缀
prefix = tokenize(randomized_scaffold_smiles)
generated = sample_until_eos(model, prefix, temperature=1.0, top_p=0.95)

# pair-tuning: 冻结基础模型，仅学习 soft prompt
soft_prompt = Parameter(shape=(20, hidden_size))
for seed_smiles, target_smiles in ordered_pairs:
    seed = embed(tokenize(seed_smiles))
    target = tokenize(target_smiles)

    # 训练序列: prompt + <bos> + seed + <unk> + target + <eos>
    context = concat(soft_prompt, BOS, seed, UNK, embed(target[:-1]))
    logits = frozen_model(context)
    loss = cross_entropy(logits[-len(target):], target)
    update(soft_prompt, loss)

# pair-tuned 推理
context = concat(soft_prompt, BOS, embed(tokenize(seed_smiles)), UNK)
optimized = sample_until_eos(frozen_model, context)
```

##### 动机与背景

ChemGPT 证明了分子语言模型可以被规模化，但药物设计真正需要的是一个可执行的生成底座：既能无条件探索化学空间，又能围绕 scaffold 做局部设计，还能朝着高 QED、高 penalized logP 或高 DRD2 活性方向优化。GP-MoLFormer 的动机就是把 MoLFormer 在分子表征上的缩放经验迁移到生成任务。

与许多小数据集生成模型不同，GP-MoLFormer 不只在 MOSES 这类百万级 benchmark 上训练，而是合并 ZINC 和 PubChem，训练到 11 亿条 canonical SMILES。这样做的优势是覆盖更广的化学结构和 scaffold；代价是公共化学数据库中有大量重复、热门或偏置分子，模型可能更容易记忆训练样本。论文因此同时训练了去重版本 GP-MoLFormer-Uniq。

##### 模型机制：linear attention + RoPE 的 decoder

GP-MoLFormer 沿用 MoLFormer 的高效 Transformer block，但从 masked-language encoder 改成 causal decoder。普通 attention 的复杂度是 \(O(n^2)\)，长 SMILES 或大 batch 训练会很贵；linear attention 用特征映射 \(\phi(\cdot)\) 改写 attention：

$$
\operatorname{Att}(Q,K,V)
=
\frac{\phi(Q)\left(\phi(K)^\top V\right)}
{\phi(Q)\left(\phi(K)^\top \mathbf{1}\right)}
$$

这样可以避免显式构造完整 \(n \times n\) attention matrix。RoPE 则把相对位置信息注入 query/key，使模型更好地区分 SMILES 中 token 顺序。对 SMILES 来说，顺序不是自然语言语序，而是图遍历顺序；括号、环闭合编号和支链位置都依赖长程 token 关系，因此位置编码仍然关键。

预训练目标是标准 next-token prediction：

$$
\mathcal{L}_{\text{CLM}}
=-\sum_{t=1}^{T}\log p_\theta(x_t \mid x_{<t})
$$

论文构建了 2362 个 token 的 vocabulary，并将序列长度限制到 202 token 以内；由于超过 99.4% 的训练分子短于这个阈值，截断对覆盖率影响较小，却能显著减少训练成本。

##### scaffold-constrained generation

GP-MoLFormer 的 scaffold 设计不需要重新训练一个条件模型。做法是把 scaffold 的 randomized SMILES 放在序列前缀里，然后让 decoder 继续生成剩余 token。因为模型训练时学习的是：

$$
p_\theta(x_{t:T}\mid x_{<t})
$$

如果 scaffold prefix 是合法上下文，模型会按训练分布补全后续片段。论文在 DRD2 scaffold decoration 上展示了这种能力：即使没有针对 scaffold decoration 做 task-specific finetuning，GP-MoLFormer 也能产生更多被分类器判定为 active 的候选。

##### pair-tuning：用有序分子对学习优化方向

pair-tuning 是 GP-MoLFormer 最有代表性的机制。它不是把性质分数作为回归标签，也不是用 RL 直接更新整个语言模型，而是用“seed 分子 + target 分子”的有序对学习一个 soft prompt。若 \(x\) 是性质较低的 seed，\(y\) 是性质较高的 target，则训练序列为：

$$
[p_1,\ldots,p_m],\langle bos\rangle,x,\langle unk\rangle,y,\langle eos\rangle
$$

其中 \(p_1,\ldots,p_m\) 是可学习 prompt embeddings。训练损失为：

$$
\mathcal{L}_{\text{pair}}
=-\sum_{t=1}^{|y|}
\log p_\theta(y_t \mid p_{1:m}, \langle bos\rangle, x, \langle unk\rangle, y_{<t})
$$

推理时只输入：

$$
[p_1,\ldots,p_m],\langle bos\rangle,x,\langle unk\rangle
$$

然后从模型分布中采样生成候选分子。这个设计的直觉是：soft prompt 学到“如何把一个分子移动到性质更好区域”的方向，而基础模型继续负责化学语法和分布合理性。由于只调 prompt，参数效率高，也减少了小规模性质数据把大模型过拟合坏的风险。

##### 训练数据、记忆化与规模化生成

GP-MoLFormer 的 1.1B 训练集由约 1B ZINC SMILES 和 111M PubChem SMILES 组成。去重后的 GP-MoLFormer-Uniq 数据集约 650M 条，说明原始集合中存在大量重复或 canonicalization 后合并的分子。

论文特别强调：在 billion-scale chemical language model 中，只看 10K 或 30K 生成样本的 novelty/validity/uniqueness 不够。模型生成数量扩大到 1B、10B 后，重复和训练集命中的概率都会变化。实验显示 GP-MoLFormer 在 10B 生成规模下仍保持高 validity，但 novelty 和 uniqueness 会下降；去重训练通常能提高 novelty。

> ⚠️ 注意：高 validity 并不等于高新颖性。对于超大化学数据库训练的模型，生成分子完全可能是训练集中出现过的高频分子，因此需要把 novelty 和训练集去重策略一起报告。

##### 与 ChemGPT 的区别

ChemGPT 更关注“化学语言模型能否随模型/数据规模缩放”，GP-MoLFormer 则把这个方向落到可用的生成 foundation model 上：它选择更轻量的 46.8M 参数架构，用 linear attention 和 bucketing 支撑 11 亿 SMILES 训练，并增加 pair-tuning 这种面向性质优化的参数高效适配方法。

因此 GP-MoLFormer 的核心价值不是最大参数量，而是“训练数据足够大 + decoder 生成效率足够高 + 下游控制接口足够简单”。这使它可以作为后续 test-time optimization、soft prompting 或 RL 微调方法的底座。

#### 🧪 练习题

```yaml
question: "GP-MoLFormer 的 pair-tuning 为什么属于参数高效的性质优化方法？"
options:
  - "它只学习一组 soft prompt embeddings，引导冻结的基础语言模型从 seed 分子生成更优 target 风格分子"
  - "它重新训练全部 46.8M 参数，使模型完全拟合每个性质数据集"
  - "它不需要任何成对分子数据，只依靠随机采样"
  - "它把 SMILES 转换为 3D docking pose 后再训练图神经网络"
answer: 0
explain: "pair-tuning 使用有序分子对训练 20 个 prompt embeddings；基础 GP-MoLFormer 主要保持冻结，由 prompt 学习优化方向，因此比全量微调更轻量。"
```
