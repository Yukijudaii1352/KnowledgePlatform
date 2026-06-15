### RefinedWeb

```yaml
id: refinedweb
name: RefinedWeb
full_name: RefinedWeb数据集 (RefinedWeb Dataset)
year: '2023'
org: TII
paper_url: https://arxiv.org/abs/2306.01116
category: data
parent: c4
motivation: 5T纯网页数据MDR方法论
```

#### 📝 一句话总结

RefinedWeb 提出一种大规模网页数据精炼方法，证明经过强过滤和严格去重的纯 Common Crawl 网页数据也能训练出超过 curated corpora 基线的语言模型。它构建了 5T token 级英文网页语料，并公开 600B token 子集和 Falcon 系列基线模型。

#### 🎯 核心要点

- 反驳“必须混入书籍、论文、代码、社交媒体等 curated corpora 才能训练强模型”的常见假设
- 从 Common Crawl 中通过 trafilatura 抽取正文，再进行文档级和行级规则过滤
- 使用 NSFW URL blocklist、语言过滤、质量规则、行级修复和低质样本剔除
- 同时使用精确子串去重和 MinHash 模糊去重，强调网页语料中重复问题的规模效应
- 产出 5T tokens 的英文 web-only RefinedWeb，并公开 600B tokens 版本
- 训练 1.3B 和 7.5B 参数模型，在 zero-shot 聚合评测上超过使用 The Pile 等 curated corpora 的公开模型
- 提出 Macrodata Refinement 思路：在宏观数据规模上迭代过滤、去重、消融和模型评估，而不是手工堆叠小型高质量源

#### 🔬 深入细节

![RefinedWeb web-only 模型表现](https://ar5iv.labs.arxiv.org/html/2306.01116/assets/x1.png)
*图：RefinedWeb 论文 Figure 1，纯 RefinedWeb 训练模型在相同计算预算下超过多个 curated-corpora 基线。*

```python
# RefinedWeb Macrodata Refinement pipeline 伪代码
def build_refinedweb(common_crawl_warc):
    docs = []
    for page in stream_warc(common_crawl_warc):
        if url_in_nsfw_or_malicious_blocklist(page.url):
            continue

        text = trafilatura_extract_main_text(page.html)
        text = normalize_and_fix_lines(text)
        if not is_english(text):
            continue
        if fails_document_quality_rules(text):
            continue
        if fails_line_level_rules(text):
            continue
        docs.append(text)

    docs = exact_substring_dedup(docs, min_tokens=50)
    docs = minhash_fuzzy_dedup(docs, ngram_size=5, similarity_threshold=0.8)
    return sample_release_subset(docs, tokens=600_000_000_000)
```

**动机与背景：curated data 真的不可替代吗？** The Pile 之后，主流观点是强 LLM 需要把网页、书籍、论文、代码和论坛等多种“高质量源”混在一起。RefinedWeb 质疑这一点：如果 curated sources 的人工处理成本高、规模有限、许可复杂，那么持续按 Chinchilla 需求扩大数据会很困难。论文的问题是：能否只用 Common Crawl 网页数据，通过更好的自动化清洗和去重，达到甚至超过 curated mixture？

**核心机制：MDR 不是单个过滤器，而是大规模处理方法论。** RefinedWeb 的 Macrodata Refinement 可以理解为“宏观数据精炼”：不迷信某个小型高质量源，而是在 Common Crawl 级别做可扩展的抽取、过滤、去重和训练验证。pipeline 先用 trafilatura 从 WARC/HTML 中抽取正文，再用 URL blocklist 和文档/行级规则去掉 NSFW、模板噪声、乱码、低质量文本等，随后做精确和模糊两级去重。

**去重是 RefinedWeb 的关键质量杠杆。** 网页数据的重复会导致训练浪费、评测污染和模型记忆。RefinedWeb 结合 ExactSubstr 与 MinHash：前者去除长段逐字重复，后者发现整篇文档近重复。论文把这一点视为规模化网页数据区别于早期 C4/OSCAR 的关键，因为 5T token 级数据中，少量重复比例也会变成巨量重复样本。

**训练/评估流程：用模型表现反向验证数据质量。** RefinedWeb 不只报告数据规模，还训练 1.3B/7.5B 模型，在 zero-shot aggregate 上与 GPT-3、The Pile 训练模型等比较。结果显示，在相似计算预算下，纯网页数据训练模型能超过 The Pile 等 curated-corpora 模型。这说明“网页数据低质”并非来源天然决定，而很大程度取决于抽取、过滤、去重是否做到位。

> 💡 关键：RefinedWeb 的贡献是把网页语料从 C4 式启发式清洗推进到 5T token 级可扩展数据精炼，并用模型训练结果证明纯网页数据可以成为强基线。

#### 🧪 练习题

```yaml
question: "RefinedWeb 最想挑战的常见假设是什么？"
options:
  - "语言模型不能使用 Common Crawl"
  - "强语言模型必须依赖大量人工 curated corpora，纯网页数据不够好"
  - "去重会降低所有模型性能"
  - "网页数据只能用于英文分类任务"
answer: 1
explain: "RefinedWeb 通过强过滤和严格去重证明，纯 Common Crawl 网页数据也可以训练出超过 curated-corpora 基线的模型。"
```
