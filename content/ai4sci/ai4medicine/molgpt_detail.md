### MolGPT — 分子生成预训练Transformer (MolGPT)

```yaml
id: molgpt
name: MolGPT
full_name: 分子生成预训练Transformer (MolGPT)
year: '2021'
org: AstraZeneca
paper_url: https://pubs.acs.org/doi/10.1021/acs.jcim.1c00600
category: generation
parent: reinvent
motivation: GPT架构支持scaffold条件生成
```

#### 📝 一句话总结

MolGPT 将 decoder-only GPT 架构用于 SMILES 自回归生成，通过 masked self-attention 学习长程语法依赖，并把分子性质向量和 Bemis-Murcko scaffold token 作为条件前缀，实现可控的性质条件与 scaffold 条件分子生成。相比 REINVENT 依赖外部奖励微调，MolGPT 把“按条件生成”直接写进语言模型训练目标。

#### 🎯 核心要点

- **GPT-style Transformer decoder**：8 个 decoder block，每个 block 包含 masked multi-head self-attention 和前馈网络
- **小型参数规模**：token/位置/segment 嵌入均为 256 维，前馈隐藏层为 1024 维，总参数量约 6M
- **下一 token 预测训练**：SMILES 通过 tokenizer 切分，模型以 causal mask 预测下一个 token
- **条件生成机制**：性质条件经线性层映射到 256 维后拼接到 SMILES 嵌入前；scaffold 条件用同一 SMILES token embedding 编码后作为前缀
- **支持多性质控制**：论文使用 logP、SAS、TPSA、QED 等属性，并测试单性质和多性质条件生成
- **支持 scaffold + property 联合条件**：在 MOSES scaffold 测试集上，生成分子保持目标骨架并控制性质
- **两个基准数据集**：MOSES 约 1.9M lead-like 分子，GuacaMol 约 1.6M ChEMBL 分子
- **解释性分析**：使用输入 saliency map 展示模型在生成环闭合、支链和原子 token 时关注的历史 token
- **评估指标完整**：validity、uniqueness、novelty、internal diversity、FCD、KL divergence、scaffold similarity ratio 等

#### 🔬 深入细节

##### 图示与可访问来源

![MolGPT 训练流水线和模型架构，见 PDF 第 2 页 Figure 2/3](https://cdn.iiit.ac.in/cdn/hai.iiit.ac.in/assets/img/publication/journal/2021/molgpt.pdf#page=2)
*图示来源说明：ACS 论文页面的图片资源需要页面脚本/权限环境，不适合作为稳定图片直链；本文引用作者机构托管的可访问 PDF。PDF 第 2 页包含 Figure 2（训练与生成 pipeline）和 Figure 3（MolGPT 架构），PubMed 页面也可访问摘要与 DOI 元信息：https://pubmed.ncbi.nlm.nih.gov/34694798/。*

##### 算法伪代码

```python
# MolGPT 条件分子生成伪代码
for batch in dataloader:
    smiles = batch["smiles"]
    tokens = smiles_tokenizer(smiles)             # [B, L]

    token_emb = token_embedding(tokens)           # [B, L, 256]
    pos_emb = position_embedding(arange(L))       # [L, 256]
    seg_emb = segment_embedding(smiles_segment)   # [B, L, 256]
    x = token_emb + pos_emb + seg_emb

    prefixes = []
    if use_property_condition:
        prop = normalize(batch["logP_SAS_TPSA_QED"])
        prop_emb = property_linear(prop)          # [B, 1, 256] or multiple condition slots
        prefixes.append(prop_emb)

    if use_scaffold_condition:
        scaffold_tokens = smiles_tokenizer(batch["scaffold"])
        scaffold_emb = token_embedding(scaffold_tokens)
        scaffold_emb += segment_embedding(scaffold_segment)
        prefixes.append(scaffold_emb)

    model_input = concat(prefixes + [x[:, :-1]], dim=1)
    logits = transformer_decoder(model_input, causal_mask=True)

    # 只对 SMILES next-token 部分计算交叉熵
    loss = cross_entropy(logits_for_smiles_positions, tokens[:, 1:])
    update(model, loss)


def generate(condition=None, scaffold=None, max_len=128, temperature=1.0):
    context = encode_condition_prefix(condition, scaffold)
    token = weighted_random_first_token(training_first_token_freq)
    generated = [token]

    for _ in range(max_len):
        logits = model(context + embed(generated), causal_mask=True)[-1]
        next_token = sample(softmax(logits / temperature))
        generated.append(next_token)
        if next_token == "<eos>":
            break

    return detokenize(generated)
```

##### 动机与背景

SMILES 是离散字符串，天然适合语言模型，但分子生成比普通文本更依赖长程约束。例如括号必须匹配、环编号必须闭合、原子价态要满足化学规则。早期 RNN 生成模型可以学习局部 token 规律，但捕捉长距离依赖相对困难；REINVENT 一类方法再用 RL 将分布推向高分分子，却需要设计外部奖励和调参。MolGPT 的核心思路是：直接把 GPT 的 causal self-attention 用到 SMILES，先学好下一 token 分布，再通过条件前缀让模型在生成时“看到”目标属性或 scaffold。

论文使用两个成熟基准。MOSES 由约 1.9M 个 lead-like ZINC 分子组成，适合评估标准分子生成和 scaffold 条件生成；GuacaMol 来自 ChEMBL，约 1.6M 分子，属性分布更宽，适合测试性质条件控制。论文用 RDKit 计算 logP、SAS、TPSA、QED，并提取 Bemis-Murcko scaffolds。

##### Transformer decoder 结构

MolGPT 是 mini GPT。每个 SMILES token 先映射到 256 维，位置嵌入和 segment 嵌入也映射到 256 维，三者相加作为输入：

$$
\mathbf{e}_t =
\mathbf{e}^{token}_t
+\mathbf{e}^{pos}_t
+\mathbf{e}^{seg}_t
$$

segment embedding 的作用是在条件训练时区分“这是条件 token/向量”还是“这是分子 SMILES token”。模型包含 8 个 decoder block。每个 block 中，masked self-attention 输出 256 维向量，前馈网络先扩展到 1024 维，经过 GELU，再投回 256 维。

Scaled dot-product attention 的核心公式为：

$$
\mathrm{Attention}(Q,K,V)=
\mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}+M\right)V
$$

其中 \(M\) 是 causal mask：当前位置只能关注当前位置及其之前的 token，不能偷看未来 token。多头注意力并行计算多个 \(Q,K,V\) 子空间，再拼接输出，使模型能同时关注环编号、支链括号、芳香环片段和性质/scaffold 条件。

训练目标是标准自回归交叉熵：

$$
\mathcal{L}_{LM}
=-\sum_{t=1}^{L}\log p_\theta(x_t\mid x_{<t}, c)
$$

这里 \(c\) 可以为空，也可以是性质向量、scaffold token，或二者组合。

##### 条件生成机制

MolGPT 的条件不是后验打分筛选，而是直接输入模型。性质条件先归一化，再通过可训练线性层映射到 256 维表示，拼接在 SMILES token 序列之前：

$$
\mathbf{c}_{prop}=W_p\mathbf{p}+\mathbf{b}_p
$$

scaffold 条件则使用与 SMILES 相同的 tokenizer 和 token embedding。直觉上，性质向量告诉模型“目标在哪里”，scaffold token 告诉模型“核心骨架必须长什么样”。生成时给定条件前缀和起始 token，模型逐 token 采样直到 EOS。

这种设计与 REINVENT 有明显区别。REINVENT 生成完整分子后才由 scoring function 打分，再通过 RL 调整策略；MolGPT 在每一步生成时都能通过注意力访问条件前缀，因此条件会影响所有后续 token 的概率分布。对 scaffold 条件尤其重要：模型可以在生成支链和环闭合时持续参考 scaffold token，而不是生成后再过滤。

##### 训练、评价和实验发现

论文训练 10 个 epoch，优化器为 Adam，学习率 \(6\times10^{-4}\)。无条件生成时，MolGPT 在 MOSES 上达到接近 0.994 的 validity 和 1.0 的 unique@10K；在 GuacaMol 上达到约 0.981 validity、0.998 uniqueness、1.0 novelty，并在 FCD/KL 等分布指标上与强基线相当或更优。

条件生成部分更能体现 MolGPT 的贡献。单性质与多性质条件下，生成分子的属性分布会围绕用户给定值集中；scaffold 条件下，论文随机选取 MOSES 测试 scaffold，为每个 scaffold 生成 100 个分子，并计算生成分子 scaffold 与条件 scaffold 的 Tanimoto 相似度。论文报告所有 scaffolds 的 similarity ratio 都高于 0.8，且精确保留条件 scaffold 的比例约 0.9897。联合 scaffold + property 条件时，性质控制会更难，因为 scaffold 本身限制可行化学空间，但模型仍能在保持核心骨架的同时移动属性分布。

##### Saliency map 的解释性

MolGPT 使用 saliency map 分析生成过程：对某个待生成 token，计算历史 token 对该输出的影响强度。论文示例显示，在生成氧原子时模型关注前面的双键和氮原子；生成支链相关 token 时关注括号平衡；生成环编号时关注非芳香环内邻近 token；生成芳香碳时关注尚未闭合的芳香环。这说明模型不是只记忆局部 n-gram，而是在一定程度上学习了 SMILES 的长程语法和化学约束。

> 💡 关键：MolGPT 的优势来自“条件前缀 + causal attention”的组合。条件负责控制目标，attention 负责在长 SMILES 序列中传播这些约束。

##### 局限性

MolGPT 仍是 SMILES 语言模型，因此不能像 JT-VAE 或 SELFIES 那样从表示层面保证 100% 有效。属性条件也不是硬约束，给定目标值过于极端或与 scaffold 冲突时，模型只能在训练分布附近折中。此外，模型没有显式 3D 构象、蛋白口袋或可合成路线信息，生成分子还需要后续 ADMET、合成可及性和实验验证。

#### 🧪 练习题

```yaml
question: "MolGPT 实现 scaffold 条件生成的关键方式是什么？"
options:
  - "先无条件生成大量分子，再用 RDKit 过滤出含目标 scaffold 的分子"
  - "将 scaffold SMILES token 编码为条件前缀，使自回归生成每一步都能通过注意力访问该条件"
  - "用强化学习奖励惩罚不含目标 scaffold 的分子"
  - "把分子图邻接矩阵输入 Relational-GCN 生成 SMILES"
answer: 1
explain: "MolGPT 将 scaffold token 嵌入拼接到序列前端，并用 masked self-attention 在生成过程中持续参考条件，因此能直接进行 scaffold 条件生成。"
```
