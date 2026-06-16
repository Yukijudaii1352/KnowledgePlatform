### MedQA：医学问答评测 (Medical Question Answering)

```yaml
id: medqa
name: MedQA
full_name: 医学问答评测 (Medical Question Answering)
year: "2020"
org: UCSD
paper_url: https://arxiv.org/abs/2009.13081
category: specialized
parent: —
motivation: 基于USMLE执业医师考试诊断能力
```

#### 📝 一句话总结

MedQA 提出了一个来自美国、中国大陆和中国台湾医学执照考试的大规模开放域多选医学问答基准，要求模型先从医学教材中检索证据，再进行临床知识推理并选择答案。它解决了既有医学 QA 多为消费者健康检索或 span extraction、难以评估专业诊断推理能力的问题。

#### 🎯 核心要点

- 数据集总计 61,097 道医学考试多选题，覆盖英文、简体中文和繁体中文三种语言或地区来源。
- 三个子集分别是 USMLE 12,723 题、MCMLE 34,251 题、TWMLE 14,123 题，按问题随机划分 80% 训练、10% 开发、10% 测试。
- 任务输入由 question、answer candidates、document collection 三部分构成，模型需要依赖文档集合选择最合适答案。
- 文档集合来自 18 本英文医学教材和 33 本简体中文医学教材，经 OCR、清洗后切分为段落。
- 论文实现了 PMI、Elasticsearch BM25、定制 BM25、MetaMap 医学实体过滤、Max-out reader 和 BERT/BioBERT/ClinicalBERT 等预训练模型 baseline。
- 核心系统遵循 retriever-reader 两阶段 OpenQA 范式：先检索 top-N 医学证据，再用阅读理解模型对每个候选答案打分。
- MedQA 的难点在于 type 2 临床病例题，需要从症状、体征、家族史、检查结果到疾病机制进行多跳推理。
- 实验显示当时最强 baseline 在三类语言问题上仍只有 36.7%、42.0%、70.1% 量级准确率，主要瓶颈来自检索阶段无法完成多跳证据发现。

#### 🔬 深入细节

![MedQA 检索阅读流程示意图](https://quickchart.io/graphviz?graph=digraph%7Brankdir%3DLR%3BQuestion%5Bshape%3Dbox%5D%3BOptions%5Bshape%3Dbox%5D%3BTextbooks%5Bshape%3Dcylinder%5D%3BRetriever%5Bshape%3Dbox%5D%3BReader%5Bshape%3Dbox%5D%3BAnswer%5Bshape%3Ddoublecircle%5D%3BQuestion-%3ERetriever%3BOptions-%3ERetriever%3BTextbooks-%3ERetriever%3BRetriever-%3EReader%3BQuestion-%3EReader%3BOptions-%3EReader%3BReader-%3EAnswer%3B%7D)
*图：论文源码中没有独立 Figure 环境，因此这里按论文方法整理为远程可访问流程图：问题和选项先与教材库交互检索证据，再由 reader 对候选答案排序。*

MedQA 的任务可以写成：给定问题 \(q\)、候选答案集合 \(A=\{a_1,\dots,a_m\}\) 和医学文档集合 \(C\)，模型选择：

$$
\hat{a}=\arg\max_{a_i\in A} s(q,a_i,C)
$$

与封闭书本的医学多选题不同，MedQA 明确要求模型可访问教材文档集合；与 SQuAD 式阅读理解不同，答案不是从给定段落中抽取 span，而是从候选项中选择最合理的医学结论。论文中两个典型例子都是长临床病例：模型需要识别尿痛、白细胞酯酶阳性、无明显尿道炎表现等线索，或把上/下运动神经元体征、家族史和 SOD1 突变联系起来。这类问题考验的是检索、医学概念归纳和多跳推理的组合能力。

```python
# MedQA retriever-reader baseline 伪代码
for question in medqa_split:
    option_scores = []

    for option in question.options:
        qa = question.text + " " + option.text
        query = preprocess(qa)
        if question.language == "en":
            query = snowball_stem(query)
            query = keep_medical_concepts_with_metamap(query)

        passages = bm25_retriever.search(query, corpus=textbooks, top_n=N)
        context = concatenate(passages)
        score = document_reader.score(context, question.text, option.text)
        option_scores.append(score)

    prediction = argmax(option_scores)
```

最简单的 rule-based baseline 是 PMI。它从问题和候选答案中抽取 unigram、bigram、trigram 和 skip-bigram，计算题目 n-gram 与选项 n-gram 在医学文档集合中的共现强度：

$$
\operatorname{PMI}(x,y)=\log\frac{p(x,y)}{p(x)p(y)}
$$

其中 \(p(x,y)\) 是 \(x\) 和 \(y\) 在文档集合 \(C\) 的固定窗口内共同出现的概率，\(p(x)\) 和 \(p(y)\) 是各自出现概率。对每个候选答案，系统平均所有问题 n-gram 与答案 n-gram 的 PMI，并选平均分最高的选项。这个方法不训练模型，但能测试医学术语共现是否足够回答题目；对需要隐含诊断链的病例题，它通常会被表面共现误导。

检索 baseline 使用 Elasticsearch 的倒排索引和 BM25。论文先把每个 \(q+a_i\) 作为查询，分别检索 top-N 句子或段落，并用搜索引擎分数对选项排序。定制版本 IR-Custom 又加入 BM25 re-weighting、英文 Snowball stemming 和 MetaMap 医学实体过滤。BM25 的核心直觉是：一个医学概念如果在候选证据中频繁出现、但在全库中不太常见，就应该贡献更高检索分数。可用如下形式概括：

$$
\operatorname{BM25}(q_i,D)=\frac{\operatorname{IDF}(q_i)\cdot f(q_i,D)\cdot(k_D+1)}{f(q_i,D)+k_D\left(1-b_D+b_D\frac{|D|}{\operatorname{avgdl}}\right)}
$$

其中 \(q_i\) 是查询项，\(D\) 是候选文档片段，\(f(q_i,D)\) 是词频，\(\operatorname{IDF}\) 降低常见词权重，\(k_D\) 和 \(b_D\) 控制词频饱和与文档长度归一化。论文还为 query 和 document 两侧分别调节超参数，以适配医学问题长、选项短、教材段落噪声大的特点。

神经 baseline 遵循 DrQA 风格的 retriever-reader 管线。Document Retriever 先取 top-N 段落并拼成上下文 \(c\)，然后对每个候选构造 \(qa_i=q+a_i\)，由 Document Reader 计算 \(p(q,a_i\mid c)\)。Max-out reader 使用同一个 BiGRU 编码上下文和问题-答案对，max pooling 后得到 \(\vec{h_c}\) 与 \(\vec{h_{qa_i}}\)，再组合四类匹配特征：

$$
\vec{h}=\left[\vec{h_c};\vec{h_{qa_i}};\vec{h_c}\odot\vec{h_{qa_i}};\left|\vec{h_c}-\vec{h_{qa_i}}\right|\right]
$$

$$
p(q,a_i\mid c)=W_1\tanh(W_2\vec{h})
$$

预训练模型版本则把输入组织为 `[CLS] context [SEP] question + option [SEP]`，取 `[CLS]` hidden state \(\vec{h}\) 计算候选 logit：

$$
p(q,a_i\mid c)=W\vec{h},\quad \hat{a}=\arg\max_i \operatorname{softmax}_i(W\vec{h})
$$

这种做法能利用 BERT、BioBERT、ClinicalBERT、RoBERTa 等模型的语言和生物医学预训练知识，但仍严重依赖检索器把关键证据放进上下文窗口。

> ⚠️ 注意：MedQA 的主要难点不只是医学词汇，而是检索阶段的多跳召回。Reader 再强，如果 top-N 段落只覆盖了病例的第一步线索，最终也很难推出正确诊断或机制。

论文的数据设计也解释了为什么 MedQA 后来成为医学 LLM 的重要基准。USMLE 子集问题平均长度达到 116.6 tokens，最大 530 tokens，常常是完整病例描述；MCMLE 和 TWMLE 则提供跨中文变体的医学推理评测。每个题目被整理为 4 个选项，并且文档库尽量模拟医学生备考时可查阅的教材材料。相比 LiveQA、Medication QA、MedQuAD 等面向消费者健康检索的数据，MedQA 更接近真实医学考试中的专业决策压力。

与普通开放域 QA 相比，MedQA 的错误模式更集中在“检索错了就全错”。论文的失败分析显示，IR 系统常把常见症状相关段落排在前面，却漏掉能区分疾病的关键证据；有时它能检索到母亲疾病的信息，但问题实际询问新生儿后果，导致推理焦点错位。这个结论对后续 RAG 医疗问答很直接：医学 QA 不能只优化 reader，也必须让 retriever 理解问题目标、医学实体关系和多跳证据链。

#### 🧪 练习题

```yaml
question: "MedQA baseline 中 retriever-reader 管线的主要作用是什么？"
options:
  - "直接从模型参数中生成开放式长答案"
  - "先从医学教材中检索候选证据，再让阅读器对每个选项打分排序"
  - "只统计候选答案在训练集中出现的频率"
  - "把所有医学题翻译成英文后用 BLEU 评分"
answer: 1
explain: "MedQA 被定义为开放域多选医学 QA，系统需要依赖文档集合检索证据，并基于证据选择最合适答案。"
```
