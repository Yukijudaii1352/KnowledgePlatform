### ChemGPT — 化学生成预训练Transformer (ChemGPT)

```yaml
id: chemgpt
name: ChemGPT
full_name: 化学生成预训练Transformer (ChemGPT)
year: '2022'
org: Insilico Medicine
paper_url: https://arxiv.org/abs/2209.11436
category: generation
parent: molgpt
motivation: 大规模预训练化学语言模型
```

#### 📝 一句话总结

ChemGPT 将 GPT 风格的自回归语言模型迁移到分子字符串建模中，用 SELFIES/SMILES token 序列学习小分子的生成分布，并系统研究模型规模、数据规模和训练超参数对化学语言模型损失的缩放规律。

#### 🎯 核心要点

- **GPT-Neo/GPT-3 风格分子语言模型**：把一个分子表示为 SELFIES 或 SMILES token 序列，用 decoder-only Transformer 预测下一个 token
- **化学有效性优先的表示**：论文主实验使用 SELFIES tokenization，利用 SELFIES 的化学约束降低无效分子生成风险，同时说明模型也可换用 SMILES
- **大规模缩放实验**：训练从小模型到超过 10 亿非 embedding 参数的 ChemGPT，并使用最多 1000 万个 PubChem 分子研究预训练损失
- **训练目标简单但可扩展**：核心目标是 causal language modeling 的交叉熵，即最大化 \(p(s_i \mid s_{<i})\)
- **训练速度估计加速 HPO**：用 early training loss 预测最终收敛 loss，提前淘汰较差 learning rate/batch size 配置，降低大规模化学模型调参成本
- **经验缩放规律**：验证化学语言模型 loss 会随模型参数、数据量和 compute 增加而下降，并观察到类似 power-law 或 broken power-law 的区域
- **来源限制**：任务给定的 arXiv 链接当前指向一篇 open-set recognition 论文；本文方法解读追溯到 ChemGPT 对应的开放论文页 `https://www.nature.com/articles/s42256-023-00740-3` 和 ChemRxiv 预印本 `https://chemrxiv.org/doi/10.26434/chemrxiv-2022-3s512`

#### 🔬 深入细节

##### 论文图示与可访问来源

![ChemGPT 缩放实验总览](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs42256-023-00740-3/MediaObjects/42256_2023_740_Fig1_HTML.png)
*图：ChemGPT 被放在“化学语言模型 + 神经力场”的统一缩放实验框架中。核心流程是先用训练速度估计筛选超参数，再在模型规模和数据规模维度上训练大模型并拟合 neural scaling relation。*

![ChemGPT 模型规模与数据规模缩放曲线](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs42256-023-00740-3/MediaObjects/42256_2023_740_Fig4_HTML.png)
*图：ChemGPT validation loss 随模型参数量和数据规模变化而下降。图中显示数据量越大、模型越大，next-token prediction loss 通常越低，但在不同区间会出现收益递减。*

##### 算法核心流程

```python
# ChemGPT 预训练与缩放实验伪代码
datasets = sample_pubchem_subsets(max_molecules=10_000_000)
model_sizes = [small, medium, large, billion_scale]
candidate_hparams = grid(learning_rate, batch_size)

for hparams in candidate_hparams:
    model = ChemGPT(size="probe", tokenizer="SELFIES")
    partial_curve = train_for_first_epochs(
        model,
        data=sample(datasets, molecules=2_000_000),
        hparams=hparams,
    )
    predicted_final_loss = training_speed_estimator(partial_curve)
    keep_if_promising(hparams, predicted_final_loss)

best_hparams = select_lowest_predicted_loss(candidate_hparams)

for data_size in datasets:
    tokenized = SELFIES_tokenize(data_size)
    for model_size in model_sizes:
        model = GPTNeoLikeDecoder(
            num_parameters=model_size,
            causal_attention=True,
        )
        for batch in dataloader(tokenized, best_hparams):
            logits = model(batch.input_tokens[:, :-1])
            target = batch.input_tokens[:, 1:]
            loss = cross_entropy(logits, target)
            loss.backward()
            optimizer.step()

        record_validation_loss(model_size, data_size, loss)

# 生成阶段
prefix = [BOS]
for t in range(max_len):
    probs = softmax(model(prefix)[-1] / temperature)
    next_token = sample(probs, top_p=0.95)
    prefix.append(next_token)
    if next_token == EOS:
        break
molecule = SELFIES_decode(prefix)
```

##### 动机与背景

MolGPT 等早期分子 Transformer 已经证明 GPT 结构可以学习 SMILES 语法并生成分子，但它们通常在百万级以下数据、百万级参数模型上评估。ChemGPT 的核心问题不是提出复杂的新生成头，而是回答一个更基础的问题：化学语言模型是否像自然语言模型一样能从更大模型、更大数据和更多 compute 中持续受益。

这个问题对药物设计很关键。若自回归模型只是在小数据上记住常见官能团，那么继续放大参数没有太大意义；如果预训练 loss 和生成质量随规模有稳定改善，就说明可以把分子生成模型做成可复用的化学 foundation model，再通过条件约束、奖励模型或实验反馈做定向优化。

##### 表示与自回归建模

ChemGPT 把分子 \(x\) 写成 token 序列：

$$
x = (s_1, s_2, \ldots, s_n)
$$

自回归语言模型把分子概率分解为逐 token 条件概率：

$$
p_\theta(x)=\prod_{i=1}^{n}p_\theta(s_i \mid s_1,\ldots,s_{i-1})
$$

训练时最小化 next-token cross entropy：

$$
\mathcal{L}_{\text{CLM}}(\theta)
=-\sum_{x \in \mathcal{D}}\sum_{i=1}^{|x|}
\log p_\theta(s_i \mid s_{<i})
$$

这里的关键不是公式新颖，而是它把分子生成变成了标准语言建模问题：decoder-only Transformer 只看左侧上下文，用 causal attention 学习 token 之间的长程依赖。对 SELFIES 来说，token 本身带有价键约束，随机采样后更容易解码成有效分子；对 SMILES 来说，模型需要自己学会括号、环编号、芳香性符号等语法规律。

##### 模型机制

ChemGPT 基于 GPT-Neo/GPT-3 风格 decoder-only Transformer：输入 token 先映射为 embedding，加上位置信息后进入多层 masked self-attention block。每层用 causal mask 阻止当前位置看到未来 token，因此第 \(i\) 个位置只能利用 \(s_{<i}\) 预测 \(s_i\)。

模型生成分子时从起始 token 开始递推采样。温度、top-k/top-p 或 beam search 会改变探索性：温度较高时更容易产生新颖结构，但也可能偏离训练分布；温度较低时更像训练集中高概率分子，novelty 通常下降。ChemGPT 的贡献之一是把这些现象放在 scale 维度下看，而不是只报告单个模型的一组生成指标。

> 💡 关键：ChemGPT 的“化学知识”主要来自大规模自监督 token 统计，而不是显式 3D 几何或反应规则；因此它适合作为分子字符串生成底座，但仍需要外部分子验证、性质模型或实验闭环来完成药物发现任务。

##### 缩放规律与训练速度估计

论文采用 neural scaling 的视角分析预训练 loss。经典形式可以写成：

$$
L(R)=\alpha R^{-\beta}
$$

其中 \(R\) 可以是模型参数量、数据量或 compute，\(\beta\) 表示扩展资源带来的 loss 改善速度。实际化学模型中可能出现 broken scaling：某一段近似幂律，另一段因为数据不足或模型容量不足而收益变缓。

ChemGPT 还使用 training speed estimation 来减少超参数搜索成本。直觉是：如果一个学习率和 batch size 在早期训练曲线中已经明显落后，它在完整训练后也很可能落后。可把早期曲线特征 \(g(\mathcal{C}_{0:T})\) 映射到最终 loss：

$$
\hat{L}_{\text{final}} = a \cdot g(\mathcal{C}_{0:T}) + b
$$

在论文实验中，早期 20% 训练预算就能较好预测最终 loss，从而把大模型 HPO 从“完整训练所有配置”改成“短训筛选 + 全训少量候选”。这对十亿参数化学模型很实用，因为一次错误的 learning rate 选择就会消耗大量 GPU 时间。

##### 与 MolGPT 的关系

MolGPT 更像“把 GPT 用于分子生成并做条件控制”的早期示范，关注 scaffold、性质 token 或条件生成任务。ChemGPT 的重点转向 foundation model 的工程科学问题：模型要多大、数据要多大、超参数如何迁移、化学领域是否存在类似 NLP 的缩放收益。

因此 ChemGPT 可以被看作 MolGPT 之后的规模化版本：基础训练目标仍是 next-token prediction，但研究对象从单个生成任务扩展到“化学语言模型能否通过规模化获得更强、更稳定的分子分布建模能力”。

##### 局限性

ChemGPT 仍然是分子字符串模型，不直接建模构象、蛋白口袋、反应可合成性或实验噪声。SELFIES 提高了语法有效性，但不等于生成分子一定有合适药效、ADMET 或合成路线。论文也主要从预训练 loss 和缩放规律出发，并不等价于证明所有下游药物设计任务都会随参数规模单调提升。

#### 🧪 练习题

```yaml
question: "ChemGPT 中自回归语言建模目标的核心作用是什么？"
options:
  - "直接最小化分子的合成路线长度"
  - "预测下一个 SELFIES/SMILES token，从而学习分子字符串的生成分布"
  - "用 3D 坐标约束每个原子的空间位置"
  - "通过 docking score 端到端训练蛋白-配体结合"
answer: 1
explain: "ChemGPT 的基础训练目标是 causal language modeling：给定前缀 token 预测下一个 token。它学习的是分子字符串分布，后续生成或优化需要额外采样策略和性质评估。"
```
