### PubMedQA

```yaml
id: pubmedqa
name: PubMedQA
full_name: 生物医学文献问答 (PubMed Question Answering)
year: "2019"
org: Georgia Tech
paper_url: https://arxiv.org/abs/1909.06146
category: specialized
parent: medqa
motivation: 生物医学文献理解与推理评测
```

#### 📝 一句话总结
PubMedQA 提出了面向生物医学研究论文的 yes/no/maybe 问答基准，把 PubMed 论文标题、结构化摘要正文和结论组织成需要定量推理的 QA 实例，解决了传统医学问答缺少真实科研语境与推理强度不足的问题。

#### 🎯 核心要点
- 数据实例由 4 部分组成：研究问题标题、去掉结论段的摘要上下文、作为长答案的结论段、yes/no/maybe 短答案标签。
- 三个数据子集：PQA-L 含 1k 医学专家标注样本，PQA-U 含 61.2k 未标注但可回答样本，PQA-A 含 211.3k 由陈述标题自动转换得到的弱监督样本。
- 评测强调 reasoning-required 设置：模型只能看到问题和摘要上下文，不能看到结论，需要从实验设计、组间比较和统计结果中推断答案。
- 论文给出 reasoning-free 设置作为辅助：训练或标注阶段可使用长答案，因为结论通常直接表达 yes/no/maybe。
- 强基线采用 BioBERT 多阶段微调：先在 PQA-A 预训练，再用 reasoning-free 伪标注 PQA-U，最后回到 PQA-L 进行 reasoning-required 微调。
- 长答案被用作额外监督信号：通过预测结论的 bag-of-words 分布约束 `[CLS]` 表征，使分类器不仅记住标签，还对结论语义敏感。
- 任务难点来自生物医学定量推理：论文分析样本中绝大多数需要理解统计数字，多数问题涉及多个实验组或人群亚组之间的比较。

#### 🔬 深入细节
![PubMedQA 数据集架构图](https://ar5iv.labs.arxiv.org/html/1909.06146/assets/x1.png)
*图：PubMedQA 被划分为 PQA-A、PQA-U、PQA-L 三个子集；核心思想是用 PubMed 结构化摘要构造“问题-上下文-长答案-短标签”的科研问答样本。*

PubMedQA 的关键不是把医学事实问答做成普通文本分类，而是把科研论文的写作结构转化为可评测的推理任务。给定一篇带问号标题的 PubMed 文章，标题自然成为问题 \(q\)，摘要中除结论外的部分成为上下文 \(c\)，结论段成为长答案 \(a\)，医学专家再把结论归纳为 \(l \in \{\text{yes}, \text{no}, \text{maybe}\}\)。因此模型在正式评测时输入是 \((q,c)\)，输出是三分类标签；它必须判断摘要中实验组、对照组、显著性、风险因素或疗效描述是否支持标题中的科研假设。

```python
# PubMedQA PQA-L 标注与构造流程（依据论文 Algorithm 1 简化）
for inst in pre_PQA_U:
    if not answerable_by_yes_no_maybe(inst.question):
        continue

    # annotator_1 可看 question + context + long_answer，属于 reasoning-free
    l1 = annotate(inst.question, inst.context, inst.long_answer)

    # annotator_2 只能看 question + context，属于 reasoning-required
    l2 = annotate(inst.question, inst.context)

    if l1 == l2:
        gold = l1
    else:
        gold = adjudicate(l1, l2)

    if gold is not None:
        PQA_L.append((inst.question, inst.context, inst.long_answer, gold))
```

PQA-L 和 PQA-U 的来源是“标题本身就是问题”的 PubMed 论文。论文先筛选带问号标题、且具有结构化摘要和结论段的文章，再人工排除不能用 yes/no/maybe 回答的问题。PQA-L 中 1k 样本由两名医学背景标注者处理：第一名标注者可以看结论段，第二名不能看结论段，只能依靠摘要正文推理；若二者不一致则讨论得到最终标签。这个设计同时给出了两种人类表现：reasoning-free 反映“读结论归纳答案”的上限，reasoning-required 反映“只读证据推断结论”的真实评测难度。

PQA-A 则服务于低资源预训练。论文从陈述式标题中寻找类似 NP-(VBP/VBZ) 的结构，把陈述句改写为疑问句，并依据动词的否定状态自动生成 yes/no 标签。例如“某因素预测某疾病风险”可以转成“Does 某因素 predict 某疾病风险?”。这种弱监督数据噪声更大、标签分布也不均衡，但规模达到 211.3k，能让模型先学习医学问题格式、摘要证据位置和标签空间，再迁移到 1k 专家标注样本。

BioBERT 基线把问题和上下文拼接为 `[CLS] question [SEP] context [SEP]`，取 `[CLS]` 表征 \(h_{\text{CLS}}\) 做三分类：

$$
p_\theta(l \mid q,c)=\text{softmax}(W h_{\text{CLS}} + b)
$$

常规分类损失是交叉熵：

$$
\mathcal{L}_{\text{QA}}=-\sum_{k \in \{yes,no,maybe\}} y_k \log p_\theta(k \mid q,c)
$$

论文进一步利用“训练时可见、测试时不可见”的长答案作为额外监督。它不要求模型生成完整结论，而是预测长答案的二值 bag-of-words 向量 \(b_i\)，即判断词表中第 \(i\) 个词是否出现在结论段中：

$$
\mathcal{L}_{\text{BoW}}=-\frac{1}{N}\sum_i b_i\log\hat{b}_i+(1-b_i)\log(1-\hat{b}_i)
$$

总损失为：

$$
\mathcal{L}=\mathcal{L}_{\text{QA}}+\beta\mathcal{L}_{\text{BoW}}
$$

直觉上，\(\mathcal{L}_{\text{QA}}\) 只告诉模型最终标签，\(\mathcal{L}_{\text{BoW}}\) 则迫使同一个 `[CLS]` 表征保留“结论会说什么”的信息。对于 biomedical QA，这很重要：正确标签往往取决于结论是否表达“显著改善”“无统计学差异”“证据不足”等语义，而这些语义在上下文中可能分散在实验数字和组间比较里。

多阶段训练把三个子集的不同可靠性显式纳入流程。第一阶段在 PQA-A 上学习弱监督格式，得到 \(\theta_I\)；随后利用 reasoning-free 输入 \((q,a)\) 在 PQA-A 和 PQA-L 上训练一个更容易做判断的模型，并用它给 PQA-U 选择高置信伪标签 \(l^{U}_{\text{pseudo}}\)；第二阶段回到 reasoning-required 输入 \((q,c)\)，在伪标注 PQA-U 上训练；最终阶段用 PQA-L 的专家标签收敛到测试分布。可写成：

$$
\theta_I \leftarrow \arg\min_\theta \mathcal{L}(\text{BioBERT}_\theta(q^A,c^A),l^A)
$$

$$
\theta_{II} \leftarrow \arg\min_\theta \mathcal{L}(\text{BioBERT}_\theta(q^U,c^U),l^{U}_{\text{pseudo}})
$$

$$
\theta_F \leftarrow \arg\min_\theta \mathcal{L}(\text{BioBERT}_\theta(q^L,c^L),l^L),\quad
l_{\text{pred}}=\text{BioBERT}_{\theta_F}(q^L,c^L)
$$

> 💡 关键：PubMedQA 的难点不在医学实体识别，而在“结论未给出时能否从摘要证据推出结论”。因此它比只问事实的医学 QA 更接近科研文献阅读，也更容易暴露模型对统计证据、否定表达和不确定结论的误解。

实验结果也支持这一点：论文报告最佳 BioBERT 多阶段模型达到约 68.1% accuracy，而单人 reasoning-required 表现约 78.0%，多数类基线约 55.2%。这说明 PubMedQA 在 2019 年并不是被预训练语言模型轻松解决的三分类任务，而是一个低资源、强领域、强推理的评测集。对于今天的大模型评测，PubMedQA 仍可作为医学 RAG、科研摘要推理、医学结论一致性判断的基础测试单元。

#### 🧪 练习题
```yaml
question: "PubMedQA 中 reasoning-required 设置的核心约束是什么？"
options:
  - "模型只能使用问题和摘要正文，不能使用结论段"
  - "模型必须生成完整医学论文摘要"
  - "模型只能使用 PQA-A 的自动标签训练，不能看专家标签"
  - "模型需要预测 PubMed 文章的 MeSH 主题"
answer: 0
explain: "reasoning-required 只给 question 和 context，长答案结论在测试时不可见，因此模型必须从摘要证据推断 yes/no/maybe。"
```
