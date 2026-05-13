### Dolma

```yaml
id: dolma
name: Dolma
full_name: "Dolma: an Open Corpus of Three Trillion Tokens for Language Model Pretraining Research"
year: 2024
org: AI2
paper_url: "https://arxiv.org/abs/2402.00159"
category: data
parent: the_pile
motivation: "3T全透明开源预训练语料库，支持OLMo等开放语言模型研究"
```

#### 📝 一句话总结

Dolma 构建了一个包含 3 万亿 token 的英文预训练语料库，融合 Web、代码、学术论文、书籍、社交媒体和百科等 7 类数据源，并开源了完整的数据处理工具链（语言过滤、质量过滤、内容过滤、去重），通过系统性消融实验验证了各处理步骤的有效性，为开放语言模型 OLMo 的训练提供了可复现的数据基础。

#### 🎯 核心要点

- **7 大数据源、3T tokens**：Common Crawl（2281B）、The Stack（411B）、C4（198B）、Reddit（89B）、PeS2o（70B）、Project Gutenberg（6B）、Wikipedia+Wikibooks（4.3B）
- **四阶段处理 Pipeline**：语言过滤（fastText）→ 质量过滤（Gopher+C4 启发式规则）→ 内容过滤（Jigsaw 毒性分类器 + PII 正则）→ 去重（URL/文档/段落级 Bloom filter）
- **Web 数据处理**：基于 CCNet 处理 25 个 Common Crawl 快照（2020-05 至 2023-06），过滤掉 84.2% 的原始内容
- **质量过滤策略**：拒绝 CCNet 的模型打分，采用 Gopher All + C4 NoPunc 启发式规则组合，消融实验证明其优于单独使用任一规则集
- **毒性过滤**：使用 Jigsaw 毒性分类器对 hate/NSFW 内容进行阈值过滤，提供高/低两档阈值选择
- **去重机制**：URL 精确去重 + 基于 Bloom filter 的段落级去重，Web 数据去重率达 61.7%
- **基准去污染**：段落匹配方式移除与 Paloma 评测集重叠的文档，实验证明不会降低模型性能
- **混合策略实验**：代码数据（5%~15%）显著提升推理任务表现；多源混合比例通过 1B 模型消融实验确定
- **完全开源**：数据集（HuggingFace）+ 数据处理工具链（GitHub）+ 处理文档全部公开

#### 🔬 深入细节

![Dolma 数据处理 Pipeline 总览](https://ar5iv.labs.arxiv.org/html/2402.00159/assets/x1.png)
*图：Dolma 数据处理 Pipeline 总览——每个数据源经过语言过滤、质量过滤、内容过滤和去重四个阶段*

```python
# Dolma Web 数据处理 Pipeline 伪代码
def dolma_web_pipeline(common_crawl_snapshots):
    """处理 25 个 Common Crawl 快照 (2020-05 ~ 2023-06)"""
    documents = []
    for snapshot in common_crawl_snapshots:
        # Step 1: 语言过滤 (CCNet + fastText)
        docs = ccnet_extract(snapshot)
        docs = [d for d in docs if fasttext_en_score(d) >= 0.5]  # 移除 61.7%

        # Step 2: 质量过滤 (Gopher All + C4 NoPunc)
        docs = gopher_filter(docs)       # 移除 15.23% UTF-8 字符
        docs = c4_nopunc_filter(docs)     # 移除无标点段落, 22.73% 字符
        docs = remove_repeated_ngrams(docs, max_len=100)  # 移除重复 n-gram

        # Step 3: 内容过滤
        docs = jigsaw_toxicity_filter(docs, hate_threshold, nsfw_threshold)
        docs = pii_mask_or_remove(docs, regex_patterns=['email', 'ip', 'phone'])

        # Step 4: 去重
        docs = url_dedup(docs)                        # URL 精确去重
        docs = bloom_filter_paragraph_dedup(docs)      # 段落级 Bloom filter
        docs = bloom_filter_document_dedup(docs)       # 文档级去重

        documents.extend(docs)

    # Step 5: 基准去污染
    documents = decontaminate(documents, benchmark='paloma',
                               method='paragraph_match', min_tokens=13)
    return documents  # 175.1 TB → 27.7 TB (CCNet) → 最终 ~9 TB
```

**动机与背景：为什么需要 Dolma？**

当前最强大的语言模型（如 GPT-4、PaLM）几乎不公开其训练数据的任何信息，即使是开源模型（如 LLaMA）也很少释放完整的训练语料或可复现的构建方案。这导致了一个根本性的研究瓶颈：研究者无法系统地研究训练数据如何影响模型能力和局限性。Dolma 的核心动机是打破这一信息壁垒——不仅提供一个 3T token 规模的高质量英文语料库，更重要的是开源整个数据处理工具链和详细的构建文档，使得任何研究者都能复现、修改和改进数据处理流程。Dolma 的设计遵循三个原则：(1) 语料规模需达到 2-3T tokens 以支持大规模训练实验；(2) 数据来源需多样化以覆盖不同领域知识；(3) 整个流程必须完全透明和可复现。

**核心机制：四阶段处理 Pipeline 详解**

Dolma 的数据处理 Pipeline 由四个串行阶段组成，每个阶段都经过了严格的消融实验验证：

**（1）语言过滤**：使用 CCNet 框架集成的 fastText 语言识别模型，对每个文档计算英文概率分数，保留分数 \(\geq 0.5\) 的文档。仅此一步就过滤掉了 61.7% 的 Web 页面。CCNet 还会在每个快照内按分片分组，移除高频重复段落（主要是导航栏和页头），此步骤移除了约 70% 的段落。整个 CCNet 阶段将 Common Crawl 从 175.1 TB 压缩至 27.7 TB，过滤率达 84.2%。

**（2）质量过滤**：这是 Dolma 最具特色的设计决策之一。CCNet 原生提供基于 KenLM 困惑度的质量分桶（高/中/低），但 Dolma 团队经过人工检查发现这种模型打分方式并不可靠——它倾向于保留"类维基百科"的文本而过度过滤其他有价值的内容。因此，Dolma 选择了纯启发式规则组合：Gopher All（来自 DeepMind 的 Gopher 论文，包含文档长度、符号比例、重复行比例等规则）+ C4 NoPunc（来自 T5 的 C4 数据集，仅保留"移除不以标点结尾的段落"这一条规则）。消融实验（Figure 2）表明，这一组合在困惑度和下游任务（HellaSwag）上均优于单独使用任一规则集。此外，团队还发现即使经过 Gopher+C4 过滤，仍存在大量重复 n-gram（如连续 100 个 '-' 出现超过 6000 万次），因此额外实现了移除超过 100 个 UTF-8 字符的重复序列的规则。

**（3）内容过滤**：包含毒性过滤和 PII（个人身份信息）处理两部分。毒性过滤使用 Jigsaw Toxic Comments 分类器对每个文档的 hate、NSFW 等维度进行打分，提供高阈值（保守，移除约 5-7% 内容）和低阈值（激进，移除约 29-35% 内容）两种选择。消融实验（Figure 3）显示低阈值在语言建模和下游任务上表现更好，但移除的内容更多。PII 处理采用正则表达式检测邮箱、IP 地址和电话号码，默认策略是将检测到的 PII 替换为特殊标记（如 `{{EMAIL}}`），而非直接删除整个文档。实验（Figure 4）表明 PII 过滤策略对模型性能几乎没有影响。

**（4）去重**：采用多层级去重策略。URL 去重在同一快照内移除相同 URL 的重复文档；段落级去重使用 Bloom filter 在所有快照间识别重复段落；文档级去重同样基于 Bloom filter。去重是移除数据量最大的步骤，Web 数据的去重率达到 61.7%。

> 💡 关键：Dolma 明确拒绝了基于模型的质量过滤（如 KenLM 困惑度打分），转而采用可解释的启发式规则组合。这一设计选择的核心理由是：模型打分会引入隐式偏见，偏好"类维基百科"文本，而启发式规则更加透明、可控、可复现。

**混合策略与代码数据的作用**

Dolma 作为多源数据集，训练时需要确定各源的混合比例。团队通过 1B 参数模型在 150B tokens 上的消融实验探索了两个关键问题：

*代码数据的比例*：通过对比 0%、5%、15% 代码混合比例的模型，发现代码数据显著提升推理任务表现（Table 4）。在 bAbI 任务上，0% 代码的模型完全失败（0.0），而 15% 代码的模型达到 10.1；在 WebNLG 上从 16.8 提升至 22.0。更有趣的是，在 GSM8K 数学推理任务上，所有模型在标准设置下都失败了，但当使用 Program-Aided Language（PAL）方式——即让模型生成 Python 代码来解题时，预训练含代码的模型显著优于纯文本模型（14.7 vs 11.8）。

*多源混合比例*：团队实验了多种混合配置（Table 5），发现排除代码会增加代码数据集上的困惑度，而上采样学术论文和维基百科则降低了 S2ORC 上的困惑度。最终 Dolma 不强制规定单一混合策略，而是提供灵活的混合工具，让研究者根据需求自行调整。

> ⚠️ 注意：Dolma 的基准去污染实验（Table 3）表明，段落匹配方式移除与 Paloma 评测集重叠的文档后，模型在困惑度和下游任务上均无一致性性能下降，验证了去污染策略的安全性。

#### 🧪 练习题

```yaml
question: "Dolma 在质量过滤阶段为什么拒绝使用 CCNet 原生的 KenLM 困惑度打分？"
options:
  - "KenLM 模型计算开销太大，无法处理 3T 规模的数据"
  - "KenLM 打分偏好类维基百科文本，引入隐式偏见，且与启发式规则相关性低"
  - "KenLM 只支持英文，无法处理多语言数据"
  - "KenLM 的过滤效果不如直接使用 GPT-2 困惑度打分"
answer: 1
explain: "论文明确指出 CCNet 的 KenLM 质量分桶与 Gopher+C4 启发式规则的相关性极低（过滤后文档在高/中/低桶的分布几乎不变），且基于模型的过滤会引入偏向维基百科风格文本的隐式偏见，因此选择了更透明可控的启发式规则组合。"
```