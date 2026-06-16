### MIST: 分子基础模型与 Smirk Tokenizer

```yaml
id: mist
name: MIST
full_name: 分子交互结构Tokenizer (MIST)
year: '2026.04'
org: 密歇根大学
paper_url: https://midas.umich.edu/events/aiir-symposium-2026/
category: representation
parent: unimol
motivation: 18亿参数基础模型，捕获核、电子与几何信息
```

#### 📝 一句话总结

公开论文和项目页中，MIST 指 **Molecular Insight SMILES Transformers**，Tokenizer 名称是 **Smirk**；它用 Smirk 把 SMILES 中的核素、电子、手性和几何相关标记编码为 token，再以 RoBERTa PreLayerNorm 编码器做 masked language modeling 预训练。最大 MIST-1.8B 在约 20 亿分子、116B token 上训练，用分子序列基础模型支撑 400 多个分子/混合物性质预测和化学空间探索任务。

#### 🎯 核心要点

- **来源限制说明**：任务给出的 `paper_url` 是 2026 AIIR Symposium 活动页；可追溯的主要技术来源是 arXiv:2510.18900、scifm 项目页、ALCF/Hugging Face 模型页，以及 Smirk tokenizer 论文 arXiv:2409.15370
- **MIST 不是 tokenizer 本身**：公开论文将 MIST 展开为 Molecular Insight SMILES Transformers；捕获核、电子和几何信息的 tokenizer 是 Smirk
- **编码器式分子基础模型**：生产模型采用 HuggingFace `RoBERTa-PreLayerNorm` encoder-only Transformer、绝对位置编码和 MLM 目标
- **模型规模**：MIST-28M 为 8 层、512 hidden、8 heads；MIST-1.8B 为 28 层、2304 hidden、18 heads、最大序列长 2048
- **预训练数据**：主要来自 Enamine REALSpace 的 SMILES；MIST-28M 约 246M 分子/12B tokens，MIST-1.8B 约 2B 分子/116B tokens
- **Smirk 表示能力**：相较普通字符/BPE tokenizer，Smirk 显式覆盖同位素、电荷、手性、非四面体立体化学、环与键等 SMILES 语义片段
- **下游任务**：单分子性质用 pooled encoder embedding + 两层 MLP；混合物性质使用 permutation-invariant 或物理启发 task network
- **缩放律贡献**：提出 hyperparameter-penalized Bayesian neural scaling laws，用模型大小 \(N\)、数据量 \(D\) 和超参惩罚项预测 MLM loss

#### 🔬 深入细节

##### 核心架构示意

![MIST 框架图](https://arxiv.org/html/2510.18900v1/x1.png)
*图：MIST 论文的总览图，展示从 Smirk tokenization、MLM 预训练到多类下游化学空间任务的流程。*

![Smirk Tokenizer 示意](https://scifm.ai/assets/img/mist-figures/smirk.svg)
*图：scifm 项目页提供的 Smirk tokenizer 图示。Smirk 是 MIST 使用的分子 tokenization 方案，而不是 MIST 模型本身。*

##### 算法伪代码

```python
# MIST 预训练与微调核心逻辑
def mist_pretrain_step(smiles_batch, mask_ratio=0.15):
    # 1. Smirk tokenizer: 把 SMILES 解析成带化学语义的 token 序列
    token_ids = smirk_tokenize(smiles_batch, max_length=2048)

    # 2. MLM corruption: 随机选择约 15% token 替换为 [MASK]
    masked_ids, labels, mask_positions = random_mask(token_ids, ratio=mask_ratio)

    # 3. RoBERTa-PreLayerNorm encoder
    hidden = roberta_prelayernorm_encoder(masked_ids)

    # 4. 只在被 mask 的位置计算交叉熵
    logits = lm_head(hidden[mask_positions])
    loss = cross_entropy(logits, labels[mask_positions])
    return loss

def mist_finetune_single_molecule(smiles, target):
    token_ids = smirk_tokenize(smiles)
    hidden = pretrained_mist_encoder(token_ids)
    mol_embedding = hidden[first_token_index]  # 论文采用首 token hidden state pooling
    pred = two_layer_mlp(mol_embedding)
    return task_loss(pred, target)

def mist_finetune_binary_mixture(smiles_1, smiles_2, x_1, x_2, target_property):
    e1 = pooled_mist_embedding(smiles_1)
    e2 = pooled_mist_embedding(smiles_2)
    # permutation-invariant task network: 交换组分顺序不改变混合物性质
    linear_part = x_1 * property_head(e1) + x_2 * property_head(e2)
    excess_part = x_1 * x_2 * excess_head(abs(e1 - e2), e1 + e2, x_1, x_2)
    pred = linear_part + excess_part
    return mse(pred, target_property)
```

##### 来源与命名澄清

任务元信息把 `full_name` 写为“分子交互结构Tokenizer (MIST)”。但可访问论文 `Foundation Models for Discovery and Exploration in Chemical Space` 明确把 MIST 定义为 **Molecular Insight SMILES Transformers**，并把 tokenizer 称为 **Smirk**。因此这篇解读按公开论文的方法写 MIST，同时保留任务 YAML 元信息原文。

Smirk 的关键价值在于减少“SMILES 是文本但又不是普通自然语言”的错配。普通字符 tokenizer 会把同位素、手性、电荷、环闭合等化学语义拆散；通用 BPE 又可能学到频繁但化学意义不稳定的片段。Smirk 则面向 SMILES 语法设计 token，使模型能更直接看到核素、电子状态和立体化学相关符号。

##### 预训练目标：Masked Language Modeling

MIST 采用 encoder-only Transformer，训练方式与 RoBERTa/BERT 类似。给定 token 序列 \(X=(x_1,\ldots,x_T)\)，随机选择约 15% 的位置集合 \(\mathcal{M}\)，把输入替换为 `[MASK]` 或扰动 token，模型根据上下文预测原 token：

$$
\mathcal{L}_{\text{MLM}}
= -\sum_{i\in\mathcal{M}}\log p_{\theta}(x_i \mid X_{\setminus \mathcal{M}})
$$

这种目标不会直接输出 3D 坐标，也不显式求力；它学习的是可迁移的分子序列表示。下游性质预测时，通常取首 token 的 final hidden state 作为分子 embedding：

$$
\mathbf{e}_{\text{mol}}=\mathbf{h}^{(L)}_{\text{first}}
$$

再接任务网络：

$$
\hat{y}=g_{\phi}(\mathbf{e}_{\text{mol}})
$$

其中 \(g_{\phi}\) 可以是两层 MLP，也可以是为混合物或电解液任务设计的物理启发网络。

##### 模型与训练规模

论文列出的两个主模型如下：

| 模型 | 参数量 | 层数 | hidden | heads | 最大长度 | 训练分子 | 总 token |
|---|---:|---:|---:|---:|---:|---:|---:|
| MIST-28M | 28M | 8 | 512 | 8 | 2048 | 246M | 12B |
| MIST-1.8B | 1.8B | 28 | 2304 | 18 | 2048 | 2B | 116B |

MIST-1.8B 使用 500,000 training steps、有效 batch size 4096、FusedLAMB 优化器，并用线性 warmup + cosine decay。这里的规模重点不是“比 3D GNN 更懂几何”，而是把大规模可合成分子库的 SMILES 表示压缩成一个可迁移 encoder。

> ⚠️ 注意：MIST 论文也指出 SMILES 本身是有损的结构表示。Smirk 可以编码很多 SMILES 内显式存在的核、电子和立体信息，但不能凭空恢复输入里没有的真实 3D 构象分布。

##### 缩放律：为什么能训练到 1.8B？

论文的一项方法贡献是 hyperparameter-penalized Bayesian neural scaling laws。标准 Chinchilla/Hoffmann 式缩放律将交叉熵损失写成模型非嵌入参数量 \(N\) 和数据量 \(D\) 的函数：

$$
L(N,D)=\frac{A}{N^{\alpha}}+\frac{B}{D^{\beta}}+E
$$

MIST 进一步把学习率、FFN 宽度比例、模型形状等超参 \(\lambda_i\) 的偏离影响建模为乘性惩罚：

$$
\hat{L}(N,D,\lambda)
=
\left(\frac{A}{N^{\alpha}}+\frac{B}{D^{\beta}}+E\right)
\times \prod_i \exp(P_i(\lambda_i))
$$

这样做的工程意义是：不必在每个模型规模上做完整网格搜索，而是用较少训练实验拟合后验分布，再选择更接近 compute-optimal frontier 的大模型配置。论文报告 MIST 的数据/模型平衡指数 \(\alpha/\beta\) 大于 1，暗示继续扩展时数据多样性和质量会比单纯堆参数更快成为瓶颈。

##### 下游机制：从单分子到混合物

单分子任务中，MIST encoder 输出 \(\mathbf{e}_{\text{mol}}\)，接两层 MLP 做分类或回归即可。论文覆盖了 MoleculeNet、量子化学、药物相似规则、同位素半衰期、气味感知等多类任务。

混合物任务不能简单拼接，因为组分顺序不应改变性质。一个典型物理启发形式是把混合物性质分解为线性混合项和 excess 项：

$$
P_{\text{mix}} = P_L + P_E,\qquad
P_L=x_1P_1+x_2P_2
$$

其中 \(P_E\) 由对称网络根据两种组分 embedding 和摩尔分数预测，常用 \(x_1x_2\) 这类因子保证纯组分边界 \(x_1=0\) 或 \(x_2=0\) 时 excess 项为 0。这个设计让 MIST 不只是单分子性质预测器，也能作为配方/电解液搜索中的组分表示模型。

##### 与 Uni-Mol 的关系和区别

YAML 中把 MIST 的 parent 标为 Uni-Mol，但两者技术路线并不相同。Uni-Mol 是直接输入 3D 坐标和距离矩阵的 SE(3)-invariant Transformer，适合构象、对接和 3D 几何任务；MIST 是 SMILES encoder，靠 Smirk tokenizer 尽量保留 SMILES 中的结构语义，优势在于可以用数十亿级文本化分子库预训练。

因此，MIST 更像“化学语言模型 + 化学语义 tokenizer + 下游任务网络”的组合；它的几何能力主要来自 SMILES 中显式编码的手性/构型符号、训练数据统计和下游监督，而不是像 SchNet/GemNet/Uni-Mol 那样直接对原子坐标做几何消息传递。

#### 🧪 练习题

```yaml
question: "根据公开论文，MIST 与 Smirk 的关系是什么？"
options:
  - "MIST 是 tokenizer，Smirk 是下游性质预测头"
  - "MIST 是 encoder-only 分子基础模型家族，Smirk 是其使用的 SMILES tokenization 方案"
  - "MIST 是 3D 坐标去噪模型，Smirk 是力场优化器"
  - "MIST 和 Smirk 都只用于蛋白质序列建模"
answer: 1
explain: "公开来源中 MIST 指 Molecular Insight SMILES Transformers；Smirk 是面向 SMILES 化学语义设计的 tokenizer，用于 MIST 的 MLM 预训练输入。"
```
