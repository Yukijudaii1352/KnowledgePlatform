### Molecular Transformer - 分子 Transformer 反应预测模型

```yaml
id: molecular_transformer
name: Molecular Transformer
full_name: "分子Transformer (Molecular Transformer)"
year: "2018"
org: IBM Research / ETH Zurich
paper_url: "https://pubs.acs.org/doi/10.1021/acscentsci.9b00576"
category: reaction
parent: —
motivation: "将反应预测类比为机器翻译，Top-1准确率超90%"
```

#### 📝 一句话总结

Molecular Transformer 将正向化学反应预测建模为 SMILES 到 SMILES 的机器翻译任务，用多头注意力 encoder-decoder 取代模板规则和 RNN，在 USPTO_MIT 等基准上达到超过 90% 的 Top-1 准确率，并用生成 token 概率给出可校准的不确定性分数。

#### 🎯 核心要点

- **模板无关反应预测**：不依赖手工反应模板、反应中心标注或原子映射，直接从反应 SMILES 学习输入到产物的映射
- **机器翻译视角**：将反应物/试剂 SMILES 视作源语言，将产物 SMILES 视作目标语言
- **Transformer encoder-decoder**：使用多头 scaled-dot attention 捕获 SMILES 序列中远距离 token 的依赖关系
- **支持混合输入**：不仅能处理反应物与试剂分离的输入，也能处理不区分 reactant/reagent 的 mixed 输入
- **SMILES 数据增强**：用随机等价 SMILES 扩充训练集，降低模型对单一规范化字符串顺序的过拟合
- **beam search 解码**：使用 beam size 5 输出 Top-k 产物候选，Top-2 准确率显著高于 Top-1
- **不确定性估计**：用预测产物 token 概率的乘积作为 confidence，用于区分正确和错误预测，ROC-AUC 约 0.89
- **强基准表现**：单模型在 USPTO_MIT separated 设置达到 90.4% Top-1、93.7% Top-2；mixed 设置仍达到 88.6% Top-1

#### 🔬 深入细节

![Molecular Transformer 性能图](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7081/6764164/679744a6414d/oc9b00576_0001.jpg)
*图：Molecular Transformer 在常见和稀有反应模板桶中均超过先前图模型。来源为 PMC 开放全文 Figure 1。*

![Molecular Transformer 不确定性 ROC](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7081/6764164/fe4b019e71bc/oc9b00576_0007.jpg)
*图：基于预测 token 概率的不确定性分数，用于区分正确和错误反应预测。来源为 PMC 开放全文 Figure 7。*

##### 算法伪代码

```python
# Molecular Transformer 训练与预测伪代码
def smiles_tokenize(smi):
    pattern = r"(\[[^\]]+]|Br?|Cl?|N|O|S|P|F|I|b|c|n|o|s|p|\(|\)|\.|=|#|-|\+|\\\\|\/|:|~|@|\?|>|\*|\$|\%[0-9]{2}|[0-9])"
    return regex_find_all(pattern, smi)

def train_step(reaction):
    src = smiles_tokenize(canonicalize(reaction.reactants_and_reagents))
    tgt = smiles_tokenize(canonicalize(reaction.products))

    # 可选：随机等价 SMILES 做数据增强
    if use_augmentation:
        src = smiles_tokenize(random_equivalent_smiles(src))

    memory = transformer_encoder(src)
    logits = transformer_decoder(tgt[:-1], memory)
    loss = cross_entropy(logits, tgt[1:])
    update(loss)

def predict(reaction):
    src = smiles_tokenize(canonicalize(reaction.reactants_and_reagents))
    memory = transformer_encoder(src)
    beams = beam_search_decode(transformer_decoder, memory, beam_size=5)

    candidates = []
    for seq in beams:
        product = detokenize(seq.tokens)
        confidence = product_of_token_probabilities(seq)
        candidates.append((product, confidence))
    return rank_by_confidence(candidates)
```

##### 动机与背景

传统反应预测方法通常依赖反应模板：先识别反应中心，再套用人工或数据挖掘得到的变换规则。这类方法的弱点是模板覆盖有限，稀有反应表现差，并且对原子映射和 reactant/reagent 分离等预处理非常敏感。早期 seq2seq RNN 方法证明了 SMILES 翻译可行，但 RNN 对序列距离有强归纳偏置，容易把 SMILES 中相邻 token 误认为化学上更相关。

Molecular Transformer 的关键观察是：SMILES 的字符串距离不等于分子中的拓扑距离，也不等于反应中的化学相关性。多头注意力可以让模型在每一步同时关注多个远距离 token，更适合捕获官能团、催化剂、离去基和立体信息之间的长程依赖。

##### Transformer 反应翻译机制

输入序列是反应物和试剂的 token：

$$
X = (x_1, x_2, \ldots, x_m)
$$

输出序列是产物 SMILES token：

$$
Y = (y_1, y_2, \ldots, y_n)
$$

训练目标是最大化条件似然：

$$
\log p_\theta(Y \mid X)
= \sum_{t=1}^{n}\log p_\theta(y_t \mid y_{<t}, X)
$$

实现上使用标准 Transformer encoder-decoder。encoder 对输入 SMILES token 做双向编码；decoder 是自回归的，先通过 masked self-attention 只看已生成产物 token，再通过 cross-attention 读取 encoder 输出。

单个 scaled-dot attention 头的计算为：

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

多头注意力把多个 attention head 并行计算后拼接：

$$
\mathrm{MultiHead}(Q,K,V)=\mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_h)W^O
$$

论文使用比原始 Transformer 小的配置：4 层、隐藏维度 256、8 个 attention heads，总参数约 12M；训练使用 Adam、Noam 风格学习率 schedule、8000 warmup steps、约 4096 token batch，并基于 OpenNMT-py 实现。

##### SMILES 预处理与数据增强

模型使用正则表达式对 SMILES 切分，确保 `Cl`、`Br`、括号、环编号、键型、手性符号等化学 token 不被拆坏。论文比较了两种输入设置：

- **separated**：反应物和试剂用 `>` 弱分隔，隐含使用了一些产物相关信息
- **mixed**：不区分反应物和试剂，所有输入分子混在一起，更接近实际使用场景

数据增强通过为同一分子生成随机等价 SMILES 实现。一个分子可以有多个合法 SMILES 写法，随机化后模型不能只记住规范化字符串中的局部模式，而必须学习更稳定的反应语义。

##### 不确定性估计

反应预测在多步合成规划中需要知道“这一步是否可信”。Molecular Transformer 使用生成序列的 token 概率构造 confidence：

$$
\mathrm{conf}(Y \mid X) = \prod_{t=1}^{n} p_\theta(y_t \mid y_{<t}, X)
$$

也可写成平均负对数似然形式，避免长序列概率过小：

$$
\mathrm{NLL}(Y \mid X) = -\frac{1}{n}\sum_{t=1}^{n}\log p_\theta(y_t \mid y_{<t}, X)
$$

confidence 越高，模型越相信该产物。论文发现 label smoothing 会略微影响准确率，但会显著削弱 confidence 对正确/错误预测的区分能力，因此最终将 label smoothing 设为 0。这个不确定性分数在测试中达到约 0.89 ROC-AUC，可用于给反应路线排序或把高风险步骤提前验证。

> 💡 关键：这里的不确定性不是外部校准模型给出的，而是 Transformer 自回归生成过程天然产生的 token 概率。

##### 与模板和 RNN 方法的区别

| 维度 | 模板/图规则方法 | RNN seq2seq | Molecular Transformer |
|---|---|---|---|
| 规则依赖 | 需要模板或反应中心 | 不需要模板 | 不需要模板 |
| 长程依赖 | 依赖特征工程 | 受递归顺序偏置影响 | 多头注意力直接建模远距离 token |
| reactant/reagent | 常需显式区分 | 通常依赖预处理 | separated 和 mixed 都可用 |
| 立体信息 | 受模板覆盖限制 | 能处理但较弱 | 支持 USPTO_STEREO 设置 |
| 置信度 | 通常需额外模型 | 有概率但校准较弱 | 用 token 概率得到可用 uncertainty score |

在稀有模板桶中，Molecular Transformer 相比先前图模型的优势更明显，这说明模型不是单纯记忆常见模板，而是在更大程度上迁移了常见反应中学到的化学模式。它仍然受训练数据分布限制，例如错误标注、缺失试剂、稀少立体选择性样本都会降低预测质量，但它把正向反应预测从模板工程推进到端到端神经翻译范式。

#### 🧪 练习题

```yaml
question: "Molecular Transformer 用什么方式估计单步反应预测的不确定性？"
options:
  - "统计训练集中相同模板出现次数"
  - "计算生成产物序列中各 token 概率的乘积或平均负对数似然"
  - "用 DFT 重新计算所有候选产物能量"
  - "让人工专家给每个预测打分"
answer: 1
explain: "Transformer 解码每个产物 token 时都会给出条件概率，整条序列的概率可作为 confidence，用于区分更可信和更不可信的预测。"
```
