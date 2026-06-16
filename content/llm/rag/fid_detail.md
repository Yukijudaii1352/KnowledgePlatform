### FiD：解码器融合 (Fusion-in-Decoder)
```yaml
id: fid
name: FiD
full_name: 解码器融合 (Fusion-in-Decoder)
year: '2021.04'
org: INRIA/Meta
paper_url: https://arxiv.org/abs/2007.01282
category: foundation
parent: rag
motivation: 解码器端多文档独立编码与联合注意力融合
```

#### 📝 一句话总结
FiD 提出把多个检索段落在编码器端独立编码、在解码器端统一交叉注意力融合的开放域问答架构，解决了多文档拼接编码开销高和逐文档生成难以聚合证据的问题。

#### 🎯 核心要点
- 两阶段开放域 QA：先用 BM25 或 DPR 检索支持段落，再用生成式 seq2seq reader 生成答案
- 输入模板明确：每个段落独立构造成 `question: {q} title: {t} context: {p}`
- 编码器独立处理段落：共享同一 T5/BART 编码器参数，但每个 passage 只在自身 token 内做 self-attention
- 解码器统一融合证据：把所有 encoder hidden states 拼接后交给 decoder cross-attention
- 复杂度优势：encoder 计算随段落数近似线性增长，能扩展到 100 个 retrieved passages
- 多证据聚合能力：decoder 在每个生成步可同时关注所有段落表示，而不是对单段落答案概率做后验加权
- 实验结果突出：在 Natural Questions 和 TriviaQA open benchmarks 上取得当时 SOTA，且段落数从 10 增至 100 时仍持续提升

#### 🔬 深入细节
![FiD 架构图](https://aman.ai/images/papers/FiD.jpg)
*图：FiD 架构。问题分别与多个 passage 拼接后独立编码，decoder 对拼接后的所有 encoder 表示做交叉注意力并生成答案。*

```python
# Fusion-in-Decoder 推理/训练流程伪代码
def fusion_in_decoder(question, passages, encoder, decoder, answer=None):
    encoded_blocks = []

    for passage in passages:
        x_i = (
            "question: " + question
            + " title: " + passage.title
            + " context: " + passage.text
        )
        tokens_i = tokenize(x_i, max_length=250)
        h_i = encoder(tokens_i)          # 每个 passage 独立 self-attention
        encoded_blocks.append(h_i)

    h_all = concatenate(encoded_blocks, dim="sequence")

    if answer is None:
        return decoder.generate(encoder_hidden_states=h_all)

    y = tokenize(answer)
    logits = decoder(y[:-1], encoder_hidden_states=h_all)
    return cross_entropy(logits, y[1:])
```

FiD 处理的是开放域问答：给定问题 \(q\)，系统先从 Wikipedia 等外部语料检索 \(K\) 个候选段落，再生成答案 \(y\)。闭卷生成模型可以把知识压进参数，但需要极大的模型；抽取式 reader 可以利用检索文本，却通常只能从单个段落抽 span。FiD 的选择是保留检索系统的显式知识，同时用生成式 decoder 在答案生成时聚合多段证据。

方法上，FiD 对每个段落 \(p_i\) 都构造一个独立输入 \(x_i=[q;t_i;p_i]\)，再用共享编码器得到：

$$
H_i=\mathrm{Encoder}_{\theta}(x_i), \qquad
H=\mathrm{Concat}(H_1,H_2,\ldots,H_K).
$$

随后 decoder 以 \(H\) 作为统一的 cross-attention memory，按自回归方式生成答案：

$$
P(y\mid q,p_{1:K})=\prod_t P(y_t\mid y_{<t},H).
$$

这种设计的关键取舍是把跨段落交互推迟到 decoder。若把 \(K\) 个 passage 直接拼接进 encoder，self-attention 复杂度约为 \(O((Kn)^2)\)；FiD 则对每个长度为 \(n\) 的 passage 独立编码，encoder 复杂度约为 \(O(Kn^2)\)。由于开放域 QA 的答案通常很短，decoder 对 \(K n\) 个 hidden states 做 cross-attention 的额外代价可控。

与 RAG 的区别在融合位置。RAG 类方法通常对每个 passage 独立计算生成概率，再按检索概率边际化；这意味着每条生成路径主要看见单个 passage。FiD 的 decoder 在同一生成步可以同时关注所有 passage 表示，因此更适合处理证据分散、需要比较多个段落或需要从多个候选中排除错误信息的问题。

训练上，论文初始化 T5-base 或 T5-large，冻结或单独训练检索器不是重点；reader 直接用答案的负对数似然优化。实验中 Wikipedia 被切分为不重叠的 100-word passages，训练和测试默认检索 100 个 passage，并将每个输入截断到 250 word pieces。这个设置展示了 FiD 的核心价值：reader 的性能随着可读证据数量增加仍能提升，而不是在 10 到 20 个段落后迅速饱和。

FiD 对后续 RAG 系统的影响在于明确了一个简单结构原则：检索文档可以先独立编码以控制成本，再在生成端用 cross-attention 进行深融合。后来的 RAG reader、multi-passage reranker 和轻量化 FiD 变体大多沿用了这个“独立编码、解码融合”的思想，只是在压缩 encoder 输出、选择证据 token 或加速 decoder attention 上做改进。

#### 🧪 练习题
```yaml
question: "FiD 为什么把多个 passage 的融合放到 decoder 而不是 encoder？"
options:
  - "为了让 encoder 的 self-attention 随 passage 数线性扩展，同时保留 decoder 聚合多证据的能力"
  - "因为 decoder 不能访问 encoder 输出"
  - "为了完全取消检索模块"
  - "因为 FiD 只能生成单 token 答案"
answer: 0
explain: "独立编码避免了拼接 passage 带来的二次方 self-attention 成本；decoder 对拼接后的 hidden states 做 cross-attention，仍能在生成时融合多段证据。"
```
