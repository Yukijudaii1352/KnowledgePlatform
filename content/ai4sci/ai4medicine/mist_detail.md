### MIST — 分子信息系统Transformer (MIST)

```yaml
id: mist
name: MIST
full_name: 分子信息系统Transformer (MIST)
year: '2026'
org: University of Michigan
paper_url: https://ai.engin.umich.edu/stories/mist-ai-model-for-molecular-property-prediction
category: generation
parent: gp_molformer
motivation: 18亿参数支持400+性质预测
```

#### 📝 一句话总结

MIST 提出一族 Molecular Insight SMILES Transformers，用 Smirk tokenizer 和 encoder-only Transformer 在数十亿分子上做 masked language modeling 预训练，再通过小型任务网络微调到 400+ 分子、材料和配方性质预测任务。

#### 🎯 核心要点

- **分子 foundation model 家族**：包含从小模型到 MIST-1.8B 的多种规模，最大模型 18 亿参数
- **Smirk tokenizer**：比普通 atom-wise tokenizer 更完整地保留核素、电子、几何和手性信息，可表示同位素、非四面体手性和有机金属复合物
- **encoder-only MLM 预训练**：基于 HuggingFace RoBERTa-PreLayerNorm，用 masked language modeling 从 SMILES 上学习分子 embedding
- **超大训练规模**：MIST-1.8B 使用 28 层、hidden size 2304、18 heads，训练约 2B 分子、116B tokens、17B masked tokens
- **400+ 下游性质预测**：预训练 encoder 后接两层 MLP 或专用 mixture task network，覆盖量子、热力学、生化、嗅觉、同位素半衰期和混合物性质
- **Bayesian neural scaling**：用带超参数惩罚项的缩放律选择 compute-optimal 模型和训练配置，减少开发大模型所需试验成本
- **可解释表示分析**：线性 probe 和 embedding 投影显示模型学到 Lipinski Rule of Five、芳香性/反芳香性、\(\pi\)-bonding 等未显式标注的化学概念
- **来源限制**：任务给定 URL 是新闻页；可访问方法细节主要来自论文 `https://arxiv.org/html/2510.18900v1`，下文据此解读

#### 🔬 深入细节

##### 模型图示

![MIST 总体框架](https://ar5iv.labs.arxiv.org/html/2510.18900/assets/x1.png)
*图：MIST 用 Smirk tokenized SMILES 训练 encoder-only Transformer，生成分子 embedding；微调阶段把 embedding 输入小型 task network，用于不同材料和分子性质预测任务。*

![MIST 化学空间应用](https://ar5iv.labs.arxiv.org/html/2510.18900/assets/x2.png)
*图：MIST 在电解液筛选、嗅觉描述符、生成分子 Pareto front 等任务中的应用示意，展示 foundation model 在多个化学子域上的迁移能力。*

##### 算法核心流程

```python
# MIST 预训练：Smirk + masked language modeling
tokenizer = SmirkTokenizer(
    preserve_isotopes=True,
    preserve_charge=True,
    preserve_stereochemistry=True,
    preserve_geometry=True,
)

encoder = RoBERTaPreLayerNormEncoder(
    layers=28,              # MIST-1.8B
    hidden_size=2304,
    attention_heads=18,
    max_sequence_length=2048,
)

for smiles_batch in enamine_realspace_loader():
    tokens = tokenizer(smiles_batch)
    masked_tokens, mask_positions, labels = random_mask(tokens, p=0.15)

    hidden = encoder(masked_tokens)
    logits = lm_head(hidden[mask_positions])
    loss = cross_entropy(logits, labels)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# 下游单分子性质微调
for task in property_tasks:
    task_head = MLP(input_dim=encoder.hidden_size, hidden_layers=2)
    for smiles, y in task.dataset:
        z = encoder.pool(tokenizer(smiles))
        y_pred = task_head(z)
        loss = task.loss(y_pred, y)  # regression: MSE/MAE; classification: BCE/CE
        update(encoder, task_head, loss)

# 混合物性质预测：对每个组分编码后进入物理启发 task network
z_components = [encoder.pool(tokenizer(s)) for s in mixture_smiles]
prediction = mixture_network(z_components, mole_fractions)
```

##### 动机与背景

分子性质预测长期受限于标注数据稀缺。许多 QSAR、GNN 或小型 Transformer 在单个 benchmark 上表现不错，但遇到同位素、有机金属、混合物或嗅觉感知这类跨子域任务时，泛化能力会下降。MIST 的目标是训练一个覆盖更广化学空间的通用 encoder，使少量标签也能适配新任务。

与 GP-MoLFormer 这种自回归生成模型不同，MIST 主要是 property prediction foundation model。它不是逐 token 生成下一个 SMILES，而是通过 masked language modeling 学习双向上下文表示。生成任务如果需要候选分子，MIST 常作为筛选器或性质预测器参与高通量设计流程，而不是直接作为 decoder 采样分子。

##### Smirk tokenizer：为什么不是普通 SMILES tokenization

普通 SMILES tokenizer 往往按原子、括号、键符号等局部规则切分，容易丢失或弱化核素、电子态、手性构型等细节。MIST 的 Smirk tokenizer 明确面向更宽的化学空间：它能保留 `[2H]`、`[13C]` 这类同位素信息，也能区分非四面体配位环境中的手性标签，例如 `@SP1` 与 `@SP3`。

这对 MIST 的下游能力很关键。若 tokenizer 在输入层就把同位素或手性差异压平，Transformer 再大也难以恢复这些信息；Smirk 的作用是让模型在预训练阶段就看到结构、核素、电子和几何差异，从而为同位素半衰期、有机金属量子性质和混合物性质预测提供表示基础。

##### MLM 预训练目标

MIST 使用 masked language modeling。给定 token 序列 \(x=(x_1,\ldots,x_T)\)，随机选择 mask 集合 \(M\)，把这些位置替换为 `[MASK]` 或扰动 token，模型根据双向上下文预测原 token：

$$
\mathcal{L}_{\text{MLM}}
=-\sum_{i\in M}\log p_\theta(x_i \mid \tilde{x}_{\setminus M})
$$

其中 \(\tilde{x}\) 是 mask 后的输入。与自回归模型只看左侧上下文不同，MIST 的 encoder 可以同时利用分子字符串两侧上下文，因此更适合作为全分子表征模型。微调时，encoder 输出的 pooled embedding \(z=f_\theta(x)\) 进入任务头：

$$
\hat{y}=g_\phi(z)
$$

回归任务通常最小化：

$$
\mathcal{L}_{\text{reg}}=\frac{1}{N}\sum_{j=1}^{N}\lVert y_j-\hat{y}_j\rVert_2^2
$$

分类任务则使用 binary cross entropy 或 cross entropy。论文中大多数普通任务头是两层 MLP；混合物任务使用专门的 mixture network，以便把组分 embedding 和摩尔分数结合起来。

##### 模型规模与训练配置

论文重点报告两个基础模型：

| 模型 | 参数量 | 层数 | Hidden size | Attention heads | 分子数 | 总 tokens | Masked tokens |
|---|---:|---:|---:|---:|---:|---:|---:|
| MIST-28M | 28M | 8 | 512 | 8 | 246M | 12B | 2B |
| MIST-1.8B | 1.8B | 28 | 2304 | 18 | 2B | 116B | 17B |

预训练数据来自 Enamine REALSpace，偏向可合成有机分子。一个有意思的发现是：即便预训练数据本身不覆盖所有下游化学类型，MIST 在更复杂的同位素、有机金属和混合物任务上仍能从预训练受益。这说明模型学到的不是纯粹的训练集 ID，而是可迁移的 token-结构-性质关系。

##### Bayesian neural scaling：如何选大模型

训练 MIST-1.8B 之前，作者先训练大量较小模型拟合 scaling law。基础形式把 cross-entropy loss 写为参数量 \(N\) 与数据量 \(D\) 的函数：

$$
L(N,D)=\frac{A}{N^\alpha}+\frac{B}{D^\beta}+E
$$

MIST 进一步加入超参数惩罚项，显式建模 learning rate、batch size、encoder shape 等偏离最优值的影响：

$$
\hat{L}(N,D,\lambda)
=
\left(\frac{A}{N^\alpha}+\frac{B}{D^\beta}+E\right)
\times
\prod_i \exp(P_i(\lambda_i))
$$

其中：

$$
P_i(\lambda_i)=c_i\left(\ln\lambda_i-\ln\lambda_{\star,i}\right)^2
$$

这个设计的直觉是：如果某个 learning rate 或架构比例偏离最优点，它会乘性地抬高预期 loss。用 Bayesian parameter estimation 拟合后，作者可以带着不确定性估计 compute-optimal frontier，减少盲目 grid search。论文报告这种带惩罚项的 scaling law 比不带惩罚项的版本有更好的预测质量。

##### 下游任务机制

MIST 的微调范式很直接：将 SMILES 输入同一个预训练 encoder，取 pooled embedding，再接任务网络。对小样本性质预测，预训练 embedding 提供结构先验，使 MLP 不必从头学习化学语法和局部官能团规律。

在电解液筛选中，MIST-28M 的多个微调头分别预测 HOMO/LUMO、donor number、Kamlet-Taft 参数、熔点/沸点等性质，然后高通量评估候选分子。论文报告用 8 张 A100 在 8 小时内评估 9000 万个分子，并筛出 63 个 Pareto-front 候选。

在嗅觉任务中，MIST-1.8B 变体对 135 个 scent descriptors 做多标签分类。模型输出的 logit 相关性经层次聚类后出现符合人类理解的气味簇，例如 meat/roasted/savory 一类相关。这说明分子 embedding 不只服务数值性质，也能承载感知性质。

##### 可解释性与化学概念

MIST 还用 linear probes 检查中间层是否编码化学规则。线性分类器可写作：

$$
y_i=\sigma(\vec{f}_i\cdot \vec{x}+b_i)
$$

其中 \(\vec{x}\) 是某层 hidden state，\(y_i\) 是某个 Lipinski Rule of Five 条件或其他二分类化学属性。若简单线性 probe 就能恢复这些规则，说明预训练 representation 中已经线性可分地包含相关化学概念。

论文还用低维投影分析 MIST-1.8B embedding，发现与 \(\pi\)-bonding、环计数、多环芳烃子类相关的方向，并观察到区分芳香/反芳香化合物的 banding pattern。这类证据支持 MIST 学到了一部分通用化学结构规律，而不只是背诵训练 token。

##### 与 GP-MoLFormer 的区别

GP-MoLFormer 是 decoder-only 生成模型，擅长采样 SMILES、补全 scaffold、通过 pair-tuning 做性质优化。MIST 是 encoder-only 预测模型，擅长把分子编码成 embedding 并迁移到性质预测任务。两者可以组合：GP-MoLFormer 生成候选，MIST 快速预测多目标性质，最后再用实验或高精度模拟验证。

> 💡 关键：MIST 的“400+ 性质预测”来自预训练 encoder + 下游任务头，而不是一个单一输出头同时预测所有性质；实际使用时需要按任务选择或微调对应 head。

#### 🧪 练习题

```yaml
question: "MIST 使用 Smirk tokenizer 的主要原因是什么？"
options:
  - "让 decoder 更快地逐 token 生成 SMILES"
  - "在 token 层面保留核素、电子、几何和手性信息，支撑更广化学空间的性质预测"
  - "把所有分子强制转换成同一种 scaffold"
  - "替代下游任务中的 MLP 性质预测头"
answer: 1
explain: "Smirk 的作用是在输入表示中保留普通 tokenization 容易弱化的化学细节，例如同位素和非四面体手性；这些信息对同位素、有机金属和混合物等任务很重要。"
```
