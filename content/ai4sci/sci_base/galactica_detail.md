### Galactica

```yaml
id: galactica
name: Galactica
full_name: Galactica (Galactica)
year: '2022'
org: Meta AI
paper_url: https://arxiv.org/abs/2211.09085
category: science_llm
parent: —
motivation: 120B参数科学专用分词LaTeX/SMILES
```

#### 📝 一句话总结

Galactica 提出了一组面向科学知识的 decoder-only Transformer 语言模型，通过 curated 科学语料、特殊科学模态 token 和 prompt pre-training，解决通用 LLM 在论文、公式、引用、SMILES 与蛋白序列等科学文本上表示低效的问题。

#### 🎯 核心要点

- **科学专用语料**：训练语料约 106B tokens，包含 48M 篇论文、代码、参考材料、知识库、过滤 CommonCrawl、prompt 数据和其他科学来源
- **模型规模族**：发布 GAL 125M、1.3B、6.7B、30B、120B 五个规模，最大模型 120B 参数
- **decoder-only Transformer**：使用 2048 上下文窗口、GeLU、无 bias dense/layer norm、学习式位置编码和 50k BPE 词表
- **科学模态 tokenization**：对引用、数学符号、数字、SMILES、氨基酸序列、DNA 序列使用特殊起止 token 和字符级拆分策略
- **引用建模接口**：用 `[START_REF]... [END_REF]` 表示论文引用，使模型可在上下文中预测可能的文献引用
- **工作记忆 token**：用 `<work>...</work>` 包裹中间推理步骤，为数学和科学推理提供类似 scratchpad 的训练格式
- **Prompt pre-training**：把问答、化学性质、摘要、实体抽取、推理等 prompt 数据混入预训练，而不是只在后期 instruction tuning
- **重复 token 训练**：在 curated corpus 上训练约 450B tokens，约 4.25 个 epoch，论文报告验证损失在多轮重复后仍持续下降
- **科学任务收益**：在 LaTeX 方程、PubMedQA、MedMCQA、MATH、数学 MMLU、分子与蛋白相关任务上相对通用模型表现更强

#### 🔬 深入细节

##### 框架总览

![Galactica Prompt Pre-training 示意图](https://ar5iv.labs.arxiv.org/html/2211.09085/assets/figs/prompt_pretraining_new.png)
*图：Galactica 将 prompt pre-training 放在普通预训练和 instruction tuning 之间，以较弱的任务偏置提升下游科学任务，同时尽量保留通用生成能力。来源为 ar5iv 论文 Figure 5。*

论文来源：arXiv 论文页 https://arxiv.org/abs/2211.09085；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/2211.09085。论文没有给出新的注意力层结构图，核心创新主要在科学语料构造、token 接口和预训练配方；上图展示的是其训练范式，而模型主体仍是标准自回归 Transformer。

Galactica 的基本建模目标与 GPT 类模型相同：给定 token 序列 \(x_1,\ldots,x_T\)，最大化每个 token 在过去上下文下的条件概率。训练损失是 causal language modeling 交叉熵：

$$
\mathcal{L}_{\mathrm{LM}}
= -\frac{1}{T}\sum_{t=1}^{T}
\log p_{\theta}(x_t \mid x_{<t})
$$

差异在于 \(x_t\) 不只是普通网页文本 token。Galactica 把论文、公式、引用、代码、化学式、蛋白序列和 prompt 都转换成统一 markdown-like 序列，使同一个自回归模型同时学习“科学文献语言”和“自然对象序列语言”。

##### 核心算法伪代码

```python
# Galactica pre-training pipeline
def galactica_pretrain(raw_sources):
    documents = []
    for source in raw_sources:
        doc = normalize_to_markdown(source)
        doc = wrap_citations(doc, start="[START_REF]", end="[END_REF]")
        doc = wrap_smiles(doc, start="[START_SMILES]", end="[END_SMILES]")
        doc = wrap_amino_acids(doc, start="[START_AMINO]", end="[END_AMINO]")
        doc = wrap_dna(doc, start="[START_DNA]", end="[END_DNA]")
        doc = wrap_reasoning_steps(doc, start="<work>", end="</work>")
        documents.append(doc)

    tokenizer = train_bpe(documents_sample=sample(documents, ratio=0.02),
                          vocab_size=50_000)
    token_stream = tokenizer.encode(documents)
    token_stream += tokenizer.encode(prompt_pretraining_tasks())

    model = DecoderOnlyTransformer(
        context_length=2048,
        activation="GeLU",
        learned_position_embeddings=True,
        use_bias=False,
    )

    for batch in make_causal_lm_batches(token_stream):
        logits = model(batch.input_ids)
        loss = cross_entropy(logits[:, :-1], batch.input_ids[:, 1:])
        adamw_step(model, loss, grad_clip=1.0)
    return model
```

##### 为什么语料设计是 Galactica 的核心

通用 LLM 常从大规模网页抓取语料学习语言规律，但科学任务有几个明显不同点。第一，科学文本的信息密度高，公式、单位、变量和引用都很重要；第二，许多对象本身就是序列，例如 SMILES、DNA 和蛋白质；第三，科研工作流经常需要从自然语言跳到文献引用、数学推导或结构化标签。Galactica 因此采用 curated corpus，而不是简单扩大通用网页数据。

论文给出的 Galactica Corpus 约 106B tokens，其中论文占最大比例，约 88B tokens；代码和参考材料各约 7B tokens；知识库约 2B tokens；prompt 数据约 0.4B tokens。这个规模小于许多通用 LLM 语料，但作者强调语料质量和领域匹配，使模型可以在同一批高价值 token 上训练多个 epoch。

重复训练的假设可以写成一种数据效率权衡。若高质量领域语料集合为 \(\mathcal{D}_{sci}\)，通用网页语料为 \(\mathcal{D}_{web}\)，Galactica 选择提高

$$
\mathbb{E}_{x\sim \mathcal{D}_{sci}}[-\log p_{\theta}(x)]
$$

上的优化深度，而不是无条件扩大 \(\mathcal{D}_{web}\)。论文报告 120B 模型在第五个 epoch 初期才出现过拟合迹象，这支持了“curated scientific tokens 可被重复利用”的经验判断。

##### 科学 tokenization 机制

Galactica 的 tokenization 不是只训练一个 BPE 词表后结束，而是在科学模态边界上显式加入控制 token。几个关键规则如下：

```text
Citations:
  [START_REF]Attention Is All You Need, Vaswani[END_REF]

SMILES:
  [START_SMILES]C(C(=O)O)N[END_SMILES]
  -> C, (, C, (, =, O, ), O, ), N

Amino acid sequence:
  [START_AMINO]MIRLGAPQTL[END_AMINO]
  -> M, I, R, L, G, A, P, Q, T, L

DNA:
  [START_DNA]CGGTACCCTC[END_DNA]
  -> C, G, G, T, A, C, C, C, T, C

Reasoning:
  <work> intermediate derivation or executable calculation trace </work>
```

字符级拆分对 SMILES、氨基酸和 DNA 特别重要。若直接依赖普通 BPE，模型可能把低频化学片段切成不稳定子词，难以泛化到新分子或新序列；字符级 token 则保留了自然字母表。引用 token 的作用是把论文中的 citation graph 变成语言模型可预测的序列片段，使模型在生成综述或回答问题时能学习“什么上下文通常引用什么工作”。

##### `<work>` 与 prompt pre-training

`<work>` 不是新网络模块，而是一种训练时显式暴露推理中间态的文本接口。对数学题或科学计算题，训练样本将推导步骤包在 `<work>...</work>` 中；有些样本还展示写 Python 脚本并读取结果的格式。模型仍然只做 next-token prediction，但它在预训练阶段已经见过“先展开工作区，再给出答案”的格式。

这与纯 chain-of-thought prompting 的区别在于：Galactica 不依赖测试时临时发现提示词，而是在预训练数据中直接植入这种接口。prompt pre-training 也类似。论文把化学性质预测、多选问答、摘要、实体抽取、推理、对话等任务转成文本 prompt 后混入预训练，使模型在保持生成式语言模型目标的同时，增加任务格式的先验。

可以把总训练目标理解为普通语料和 prompt 语料的混合：

$$
\mathcal{L}
= \mathbb{E}_{x\sim \mathcal{D}_{corpus}}
\mathcal{L}_{\mathrm{LM}}(x)
+ \alpha\,
\mathbb{E}_{x\sim \mathcal{D}_{prompt}}
\mathcal{L}_{\mathrm{LM}}(x)
$$

其中 \(\alpha\) 并不是论文中显式给出的单独超参数，而是由 prompt tokens 在混合 token 流中的比例隐式决定。直觉上，prompt pre-training 比 instruction tuning 更早、更弱；它不是把模型强行压到某个助手风格，而是让任务格式成为预训练分布的一部分。

##### 模型结构与训练配方

Galactica 使用 decoder-only Transformer。对第 \(l\) 层，简化残差形式为：

$$
\mathbf{z}^{l}
= \mathbf{h}^{l}
+ \mathrm{MHA}(\mathrm{LN}(\mathbf{h}^{l}))
$$

$$
\mathbf{h}^{l+1}
= \mathbf{z}^{l}
+ \mathrm{FFN}_{\mathrm{GeLU}}(\mathrm{LN}(\mathbf{z}^{l}))
$$

模型使用 2048 token 上下文窗口、学习式位置编码、GeLU 激活，并按 PaLM 风格去掉 dense kernel 和 layer norm 中的 bias。词表大小为 50k，由训练数据 2% 随机子集训练 BPE 得到。训练使用 AdamW、梯度全局范数裁剪到 1.0、学习率线性衰减到最大值的 10%。最大 120B 模型用更长 warmup，以缓解大模型早期初始化对优化器状态的影响。

模型规模配置覆盖从 125M 到 120B。120B 的意义不只是绝对规模，而是作者把“单个 A100 节点可推理”作为上限约束，希望科学社区能更容易复现和使用。论文结果显示，规模提升对引用预测、公式知识、MMLU/MATH 和生物医学问答都有明显收益。

##### 能力边界与可靠性

Galactica 论文把模型定位为“科学知识接口”，但它仍然是自回归语言模型，训练目标并不会自动保证事实正确、引用真实或实验结论可复现。引用 token 让模型能学习引用分布，但也可能生成看似合理却不存在或不匹配的引用；SMILES 和蛋白序列 token 让模型能处理科学序列，但不等同于具备物理模拟或实验验证能力。

因此更稳妥的使用方式是把 Galactica 看成科学语料预训练和科学 token 接口的一次系统化尝试：它展示了 curated corpus、模态 token 和 prompt pre-training 的价值，也暴露了科学 LLM 必须面对的可靠性问题。后续科学助手通常会进一步引入检索、工具调用、引用校验和结构化数据库，以弥补纯 weight memory 的不足。

> 💡 关键：Galactica 的算法贡献主要在“把科学对象序列化成语言模型可学习的接口”。它没有发明新的 Transformer 层，而是通过语料、token 和预训练任务设计，让标准 decoder-only Transformer 更适合科学知识建模。

#### 🧪 练习题

```yaml
question: "Galactica 对 SMILES、蛋白质和 DNA 序列使用特殊起止 token 与字符级 tokenization 的主要目的是什么？"
options:
  - "让这些科学序列以稳定、可泛化的字母表形式进入同一个语言模型上下文"
  - "把 Transformer 改成图神经网络"
  - "避免模型学习自然语言"
  - "让模型只训练一次 epoch，防止重复 token"
answer: 0
explain: "SMILES、氨基酸和 DNA 本身具有自然字符字母表。特殊 token 标记模态边界，字符级拆分避免普通 BPE 对低频科学片段的不可控切分。"
```
