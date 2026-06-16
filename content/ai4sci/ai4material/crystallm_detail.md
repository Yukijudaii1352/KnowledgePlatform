### CrystaLLM — 晶体语言模型 (Crystal Language Model)

```yaml
id: crystallm
name: CrystaLLM
full_name: "晶体语言模型 (Crystal Language Model)"
year: "2024"
org: "UCL"
paper_url: "https://www.nature.com/articles/s41467-024-54639-7"
category: foundation_model
parent: —
motivation: "CIF作为语言的生成式模型"
```

#### 📝 一句话总结

CrystaLLM 把晶体结构文件 CIF 直接当作文本序列，用 decoder-only Transformer 做自回归下一个 token 预测，从而在不显式构造晶体图或扩散过程的情况下生成语法正确且物理上可行的无机晶体结构。

#### 🎯 核心要点

- **CIF-as-language**：直接训练标准化后的 CIF 文本，而不是把 CIF 先转换为图、点云、晶格矩阵或对称操作特征
- **自回归 Transformer**：模型是 GPT-2/nanoGPT 风格的 decoder-only Transformer，按上下文 token 预测下一个 token
- **大规模晶体语料**：训练数据来自 2.3M 个无机结构 CIF；训练/验证/测试划分为 2,047,889 / 227,544 / 10,286 个 CIF
- **371 词表与数字级建模**：词表包含 CIF 标签、空间群符号、元素符号、数字和标点；训练集 token 数约 768M
- **可条件生成**：推理时可用 `data_` 加 cell composition 作为 prompt，也可加入空间群条件，逐 token 采样生成完整 CIF
- **标准语言模型损失**：最大化 \(\sum_i \log P(u_i|u_{i-c},\dots,u_{i-1})\)，等价于最小化 next-token cross entropy
- **有效性检查**：生成后用 pymatgen/spglib 检查空间群一致性、键长合理性和 atom-site multiplicity 与组成是否匹配
- **MCTS 解码增强**：用 CrystaLLM 的 token 概率扩展搜索树，并用 ALIGNN 形成能预测作为快速 reward，引导采样到更低能结构

#### 🔬 深入细节

##### 模型示意图

![CrystaLLM CIF 语言建模流程](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41467-024-54639-7/MediaObjects/41467_2024_54639_Fig1_HTML.png)
*图：CrystaLLM Figure 1。CIF 文件被 token 化后输入 decoder-only Transformer，训练时预测右移一位的目标 token；生成时从组成 prompt 开始逐 token 采样 CIF。图源为 Nature Communications 论文公开图片。*

##### 算法伪代码

```python
# ===== 训练阶段：CIF 自回归语言建模 =====
cifs = load_cif_corpus(num_structures=2_300_000)
cifs = standardize_cifs(cifs, round_float_decimals=4, symmetry_tolerance=0.1)
tokens = tokenize_cifs(cifs, vocab_size=371)

model = DecoderOnlyTransformer(
    n_layers=8,
    n_heads=8,
    embedding_dim=512,
    num_parameters="25M",
)

for batch in sample_token_windows(tokens, context_length=c):
    input_tokens = batch[:, :-1]
    target_tokens = batch[:, 1:]
    logits = model(input_tokens)
    loss = cross_entropy(logits, target_tokens)
    optimizer.step(loss)

# ===== 普通生成：按组成或空间群条件采样 CIF =====
prompt = tokenize("data_" + sorted_cell_composition)  # optionally add space group
generated = prompt
while not stop_condition(generated):
    logits = model(generated[-c:])
    next_token = sample_top_k(logits[-1], k=10, temperature=1.0)
    generated.append(next_token)

cif = detokenize(generated)
valid = check_space_group(cif) and check_bond_lengths(cif) and check_multiplicity(cif)

# ===== MCTS 解码：用 ALIGNN 形成能引导采样 =====
root = TreeNode(prompt)
for iteration in range(num_mcts_iters):
    node = select_by_puct(root)
    child = expand_with_model_probabilities(node, model)
    completed_cif = rollout_until_terminal(child, model, max_tokens=1000)
    if is_valid_cif(completed_cif):
        energy = ALIGNN.predict_formation_energy(completed_cif)
        reward = -energy
    else:
        reward = invalid_penalty
    backpropagate(child, reward)

best_cif = best_valid_sequence(root)
```

##### 动机与背景

晶体结构生成通常要同时满足周期性、空间群、元素组成、晶胞参数、原子分数坐标和合理键长。许多生成模型会先把晶体编码成图或连续几何变量，再用 VAE、扩散或优化过程生成结构。CrystaLLM 选择了更直接的路线：CIF 本来就是材料数据库交换结构的标准语言，里面已经包含组成、对称性、晶胞和原子位点，因此可以把“生成晶体”改写成“生成一段合法 CIF 文本”。

这种做法的难点在于，CIF 里的数字坐标和晶格参数不是普通自然语言词汇。论文没有把坐标离散成特殊几何对象，而是让模型逐符号、逐数字预测。若模型真正学会 CIF 语法和晶体统计规律，它不仅应能闭合括号、标签和循环结构，还应能生成与空间群和组成相容的坐标。

##### 训练目标

设 token 序列为 \(\mathcal{U}=(u_1,\ldots,u_n)\)，词表为 \(\mathcal{V}\)，上下文窗口大小为 \(c\)。CrystaLLM 最大化自回归似然：

$$
\mathcal{L}(\theta;\mathcal{U})
=\sum_i \log P(u_i \mid u_{i-c},\ldots,u_{i-1};\theta)
$$

实际训练最小化负对数似然：

$$
\mathcal{J}(\theta;\mathcal{U})=-\mathcal{L}(\theta;\mathcal{U})
$$

这就是标准 next-token cross entropy。模型结构是 25M 参数的多层 Transformer decoder，包含 8 层、8 个 attention head 和 512 维嵌入；学习率从 \(10^{-3}\) 衰减到 \(10^{-4}\)，batch size 为 32。

##### 数据标准化与 token 化

训练前，论文先把 2.3M 个结构转换为 CIF，并用 pymatgen 做标准化。为了减少无意义格式差异，浮点数保留 4 位小数；对于同一 cell composition 和 space group 的重复结构，保留每化学式体积更低的结构。token 词表由 371 个符号构成，包括 CIF tag、空间群符号、元素符号、数字和标点。

> 💡 关键：CrystaLLM 的归纳偏置主要来自 CIF 格式本身。标准化让同一结构尽量对应稳定文本模式，token 化则让模型能够同时学习语法 token 和数字 token 的统计关系。

##### 条件生成流程

生成时，模型从 prompt 开始逐 token 采样。最常见 prompt 是 `data_` 拼接目标 cell composition；如果希望约束空间群，也可以把空间群相关字段放进前缀。每一步：

$$
u_t \sim P_\theta(\cdot \mid u_{t-c},\ldots,u_{t-1})
$$

论文基准中使用 top-k sampling，\(k=10\)，temperature 为 1.0，并给每个测试结构最多 20 次生成尝试。生成结束后，CIF 不是直接接受，而要经过三类验证：声明空间群与结构一致、键长在预期键长 30% 范围内、atom-site multiplicity 与 cell composition 一致。

##### MCTS 解码：把语言模型采样和能量模型结合

普通 top-k 采样只按语言模型概率生成，容易偏向“训练集中常见且语法自然”的结构，但不一定能量低。CrystaLLM 进一步把 Monte Carlo Tree Search 用作解码器：树节点表示当前已经生成的 CIF token 前缀，子节点是候选下一 token。选择阶段使用 PUCT 在“高价值分支”和“尚未探索分支”之间平衡：

$$
a^*=\arg\max_a
\left[
Q(s,a)+c_{\mathrm{puct}}P_\theta(a|s)
\frac{\sqrt{N(s)}}{1+N(s,a)}
\right]
$$

扩展后，CrystaLLM 从该前缀继续 rollout 到终止条件，得到完整 CIF；若 CIF 有效，就用预训练 ALIGNN 预测形成能 \(E_f\)，并把 reward 设为与能量相反的方向：

$$
R(s)\approx -E_f(s)
$$

随后把 reward 回传到路径上的节点，提升后续选择低形成能结构的概率。论文报告，在挑战集中最困难的 20 个案例上，MCTS 相比随机 top-k 采样通常提高有效率并降低最小形成能；对 102 个无条件生成的新成分，MCTS 后 ALIGNN 能量平均下降，DFT 计算的 hull distance 也平均改善。

##### 与传统晶体生成方法的区别

与 CDVAE、DiffCSP 一类显式几何生成模型相比，CrystaLLM 不直接在连续坐标空间建模噪声或潜变量，而是在 CIF 文本空间学习联合分布。这带来两个优点：第一，空间群、组成、晶胞和坐标天然在同一序列中，条件控制可以通过 prompt 完成；第二，可以复用成熟语言模型训练和解码技术，例如 top-k sampling、temperature、MCTS 和外部 reward reranking。

局限也同样清楚：CIF 语法正确不等于热力学稳定，生成结构仍需要后处理验证、能量模型筛选以及 DFT 复算。CrystaLLM 的实用定位更像晶体结构预测工作流中的 proposal generator，而不是最终稳定性判定器。

#### 🧪 练习题

```yaml
question: "CrystaLLM 与许多晶体扩散模型最核心的建模差异是什么？"
options:
  - "CrystaLLM 不生成晶体结构，只做分类"
  - "CrystaLLM 直接在标准化 CIF 文本 token 上做自回归语言建模，而不是在显式几何表示上扩散采样"
  - "CrystaLLM 只能生成已有训练集中的 CIF"
  - "CrystaLLM 完全不需要验证空间群和键长"
answer: 1
explain: "CrystaLLM 把 CIF 当作语言序列，用 next-token objective 生成完整 CIF；生成后仍要用结构解析、键长和能量模型等步骤筛选。"
```
