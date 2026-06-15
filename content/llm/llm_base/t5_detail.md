### T5: 文本到文本迁移 Transformer (Text-to-Text Transfer Transformer)

```yaml
id: t5
name: T5
full_name: 文本到文本迁移 Transformer (Text-to-Text Transfer Transformer)
year: "2019.10"
org: Google Research
paper_url: https://arxiv.org/abs/1910.10683
category: architecture
parent: transformer
motivation: 所有任务转成文本生成
```

![T5 文本到文本统一框架](https://ar5iv.labs.arxiv.org/html/1910.10683/assets/fig1.png)
*图：T5 将所有 NLP 任务统一为 "输入文本 -> 输出文本" 的格式。分类、翻译、摘要、问答、回归等任务都通过任务前缀和目标文本表达。*

#### 📝 一句话总结

T5 提出了 Text-to-Text Transfer Transformer 框架，把所有 NLP 任务统一成条件文本生成问题，并通过 C4 语料、encoder-decoder Transformer、span corruption 预训练和大规模消融实验，总结出一套影响后续预训练与 prompt 范式的实践准则。

#### 🎯 核心要点

- **文本到文本统一范式**：输入总是字符串，输出也总是字符串；分类任务输出类别名，回归任务输出数字文本，翻译和摘要输出目标文本。
- **任务前缀机制**：输入中显式加入 `"translate English to German:"`、`"summarize:"`、`"cola sentence:"` 等自然语言前缀，用同一模型区分任务。
- **C4 数据集**：提出 Colossal Clean Crawled Corpus，从 Common Crawl 中经过去重、语言过滤、质量过滤、坏词/模板过滤等流程构建大规模英文预训练语料。
- **Span Corruption 预训练目标**：随机遮盖连续文本片段而不是孤立 token，用 `<extra_id_0>` 等 sentinel token 替换输入片段，并要求 decoder 依次生成被遮盖片段。
- **系统性消融**：围绕架构、目标、数据集、训练策略和迁移方法进行了约 70 个实验，比较 encoder-decoder、decoder-only、prefix LM、MLM、span corruption 等选择。
- **相对位置偏置**：使用相对位置表示，让模型更自然地处理不同长度输入，并支撑从 small/base 到 11B 的规模扩展。
- **多任务迁移经验**：T5 显示数据清洗质量、合适预训练目标、充分训练步数和统一输出格式比堆叠任务特定 head 更关键。

#### 🔬 深入细节

##### 1. 为什么需要 text-to-text 统一

在 T5 之前，NLP 预训练模型通常要为不同任务接不同的 head：分类任务用 softmax 分类头，抽取式问答预测 span 起止位置，翻译或摘要使用 seq2seq decoder。这导致预训练目标、微调目标和任务接口并不统一。T5 的核心判断是：如果所有任务都能被表示成“给定输入文本，生成目标文本”，那么模型结构、损失函数、推理方式和迁移方式都能统一。

形式上，T5 使用标准条件生成概率：

$$
p_\theta(y \mid x)=\prod_{t=1}^{|y|}p_\theta(y_t \mid y_{<t}, x)
$$

其中 \(x\) 是带任务前缀的输入文本，\(y\) 是目标答案文本。分类任务不再输出类别 id，而是输出 `"positive"`、`"entailment"`、`"acceptable"` 等标签字符串；回归任务输出类似 `"4.2"` 的数字字符串。这个设计牺牲了一点任务特定 head 的直接性，但换来了统一的建模接口。

##### 2. Span Corruption 预训练目标

T5 比较了语言模型、BERT-style MLM、deshuffling、span corruption 等多个目标，最终发现 span corruption 是最稳健的选择。它不是随机遮盖单个 token，而是随机选择若干连续 span，用不同 sentinel token 代替，decoder 再按顺序恢复这些 span。

```python
def t5_span_corruption(tokens, noise_density=0.15, mean_span_len=3):
    """
    简化版 T5 span corruption:
    输入: 原始 token 序列
    输出: corrupted_input, target_output
    """
    spans = sample_non_overlapping_spans(
        tokens,
        total_masked=int(len(tokens) * noise_density),
        mean_len=mean_span_len,
    )

    corrupted = []
    target = []
    cursor = 0
    for i, (start, end) in enumerate(spans):
        sentinel = f"<extra_id_{i}>"
        corrupted.extend(tokens[cursor:start])
        corrupted.append(sentinel)
        target.append(sentinel)
        target.extend(tokens[start:end])
        cursor = end

    corrupted.extend(tokens[cursor:])
    target.append(f"<extra_id_{len(spans)}>")
    return corrupted, target
```

例如原文：

```text
Thank you for inviting me to your party last week.
```

可能被变成：

```text
input : Thank you <extra_id_0> me to your party <extra_id_1> week.
target: <extra_id_0> for inviting <extra_id_1> last <extra_id_2>
```

这个目标有三个好处：第一，连续片段遮盖比单 token MLM 更依赖长程上下文；第二，只需要生成被遮盖文本，训练比完整自回归 LM 更高效；第三，sentinel token 让输入与输出之间有清晰对齐，适合 encoder-decoder 架构。

##### 3. 架构选择：为什么 encoder-decoder 胜出

T5 的实验重点不是发明一种全新 Transformer，而是系统比较已有结构在迁移学习中的表现。论文比较了三类架构：

| 架构 | 输入注意力 | 输出注意力 | 典型用途 | T5 结论 |
|------|------------|------------|----------|---------|
| Encoder-Decoder | 双向 | 因果 | 翻译、摘要、问答 | 综合效果最好 |
| Decoder-only LM | 因果 | 因果 | 自回归语言建模 | 可用但迁移较弱 |
| Prefix LM | prefix 双向、target 因果 | 因果 | 条件生成 | 接近但不如完整 encoder-decoder 稳定 |

Encoder-decoder 的优势在于职责分离：encoder 可以双向读取完整输入，适合理解分类、问答和摘要上下文；decoder 负责自回归生成目标文本。相比 decoder-only，T5 在输入理解任务上不用让模型通过单向上下文“绕路”重建输入信息。

##### 4. C4 数据清洗与训练策略

C4 的意义不只是“数据量大”，而是强调可复现的清洗流程。T5 从 Common Crawl 中抽取英文网页文本，移除重复、低质量、非自然语言、代码片段、模板化内容和不适合建模的页面。论文的一个重要经验是：在固定训练预算下，干净语料通常比更大的脏语料更有价值。

训练时，T5 使用相同的 text-to-text 接口做预训练和微调。微调阶段只改变输入前缀和目标文本，不改变模型结构。例如：

```text
translate English to German: That is good.
-> Das ist gut.

sst2 sentence: This movie is surprisingly warm.
-> positive

summarize: <long article>
-> <short summary>
```

这种格式后来直接影响了指令微调和 prompt engineering：任务说明不再是模型外的控制逻辑，而是输入序列本身的一部分。

##### 5. 核心实验发现

T5 的价值很大程度来自消融结论：

- **span corruption 优于普通 MLM 和 deshuffling**：连续片段恢复更贴近真实文本生成，也能更好利用 encoder-decoder。
- **encoder-decoder 是最稳健的迁移架构**：尤其在需要理解完整输入后生成答案的任务上表现更好。
- **数据清洗很关键**：C4 的高质量过滤显著提升预训练收益。
- **多任务预训练并非总是无条件更好**：任务混合比例、训练步数和模型容量都会影响迁移效果。
- **规模扩展有效但不是唯一因素**：T5-11B 表现强，但论文同样强调目标、数据和格式的系统选择。

> 💡 关键：T5 把“预训练模型如何迁移到所有 NLP 任务”从零散技巧整理成可比较的工程系统。它不是只贡献一个模型，而是贡献了统一接口、统一目标和统一实验框架。

##### 6. 与 BERT、GPT 的差异

| 模型 | 架构 | 预训练目标 | 下游接口 | 代表优势 |
|------|------|------------|----------|----------|
| BERT | encoder-only | MLM + NSP | 多任务 head | 双向理解 |
| GPT/GPT-2 | decoder-only | causal LM | prompt/生成 | 自回归生成 |
| T5 | encoder-decoder | span corruption | text-to-text | 统一理解与生成 |

BERT 更像通用文本编码器，GPT 更像通用文本生成器，T5 则把“理解后生成”作为统一入口。因此在摘要、翻译、问答、分类等任务上，它能用同一训练和推理路径完成任务。

#### 🧪 练习题

```yaml
question: "T5 的 span corruption 与 BERT-style MLM 的关键区别是什么？"
options:
  - "T5 只遮盖标点符号，BERT 遮盖普通词"
  - "T5 遮盖连续文本片段并用 sentinel token 让 decoder 生成这些片段"
  - "T5 不使用 Transformer，只使用 RNN"
  - "T5 只用于分类任务，不能用于生成任务"
answer: 1
explain: "T5 将连续 span 替换为 <extra_id_k>，decoder 按顺序生成被遮盖片段；这比单 token MLM 更强调长程上下文和条件生成能力。"
```
