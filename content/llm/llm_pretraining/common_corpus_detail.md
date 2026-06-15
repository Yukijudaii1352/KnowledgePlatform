### Common Corpus

```yaml
id: common_corpus
name: Common Corpus
full_name: Common Corpus数据集 (Common Corpus Dataset)
year: '2026'
org: ICLR社区
paper_url: https://openreview.net/forum?id=Submission25369
category: data
parent: dolma
motivation: 2T完全合规多语言数据集
```

#### 📝 一句话总结

Common Corpus 构建了约 2T tokens 的多语言开放预训练语料，所有数据都来自公有领域或开放许可来源，并记录 provenance、license 和处理信息。它将 LLM 预训练数据从“可抓取网页”推进到“可审计、可合规、可复用的开放数据基础设施”。

#### 🎯 核心要点

- manifest 中 `paper_url` 使用提交号形式；公开页面可由 OpenReview ICLR 2026 Oral 页面和 arXiv 2506.01732 技术报告补足
- 目标是 largest truly open multilingual dataset，规模约 2T tokens
- 六大集合：Open Government、Open Culture、Open Science、Open Code、Open Web、Open Semantic
- token 量级包括 Open Culture 约 886B、Open Government 约 406B、Open Science 约 281B、Open Code 约 283B、Open Web 约 73B、Open Semantic 约 68B
- 数据对象携带 license、language、collection/domain 和 provenance metadata，便于按许可和用途过滤
- 覆盖高资源欧洲语言，也包含低资源语言；至少多个语言达到十亿级 token
- 清洗包含来源级许可验证、OCR 修正、语言识别、毒性过滤、PII 移除和集合专属质量处理
- 训练小模型验证其可用于多语言预训练，并作为开放科学 LLM 数据基础设施发布

#### 🔬 深入细节

![Common Corpus 语言分布地图](https://ar5iv.labs.arxiv.org/html/2506.01732/assets/x1.png)
*图：Common Corpus 技术报告 Figure 1，用世界地图展示多语言文档分布。*

```python
# Common Corpus 合规数据构建伪代码
def build_common_corpus(source_catalog):
    corpus = []
    for source in source_catalog:
        license_info = verify_license(source)
        if not license_info.is_public_domain_or_open_license:
            continue

        raw_docs = collect_from_api_dump_or_archive(source)
        docs = extract_text_with_source_specific_parser(raw_docs)
        docs = repair_ocr_when_needed(docs)
        docs = normalize_metadata(docs, fields=["url", "license", "language", "date", "collection"])

        docs = language_identification(docs, model="fastText")
        docs = quality_filter_by_collection(docs, collection=source.collection)
        docs = toxicity_filter(docs)
        docs = remove_pii(docs)

        corpus.extend(docs)

    return publish_as_parquet_shards(corpus, include_provenance=True)
```

**动机与背景：开放权重不等于开放数据。** 许多开源或开放权重模型并不公开训练数据，或者训练语料含有版权、服务条款、来源不清的问题。随着欧盟 AI Act、版权诉讼和 robots/TOS 限制增加，单纯依赖“网页可访问”已不足以支撑可审计的开放 LLM。Common Corpus 的目标是从源头保证每条数据属于 public domain 或开放许可，并公开 provenance 与 license 元数据。

**核心机制：六大集合组成合规多语言语料。** Common Corpus 不以 Common Crawl 为主体，而是聚合政府、文化遗产、科学出版、代码、开放网页和语义结构数据。Open Culture 提供大量公版书籍、报刊和文化遗产文本；Open Government 提供法律、行政和金融文档；Open Science 基于开放许可论文和学术资源；Open Code 来自自由许可代码；Open Web 和 Open Semantic 补充开放网页与结构化知识。这样的组成让它与 C4/FineWeb 这种 web-first 数据集明显不同。

**处理流程：先许可与来源，再文本质量。** 传统网页语料通常先抓取再过滤，Common Corpus 则先建立 source catalog，确认许可、来源和可再利用条件，再做文本抽取与清洗。对文化遗产和扫描文档，OCR 质量是核心问题；对代码，文件类型和许可证过滤是核心问题；对科学文档，开放许可和元数据链接是核心问题。统一发布时，每个数据对象都携带 license、language、collection/domain 等字段，便于下游按法规或商业需求筛选。

**与 Dolma/FineWeb 的区别：合规性是第一等目标。** Dolma 强调透明开放 pipeline，FineWeb 强调高质量英文网页和可复现消融；Common Corpus 则把“能否合法、可审计地使用”提升为主约束。因此它牺牲了一部分网页语料的规模优势，换来更清楚的 provenance 和开放许可边界。它也更强调多语言，特别是欧洲语言和一些低资源语言，而不是只追求英文 benchmark。

> 💡 关键：Common Corpus 的创新不只是 2T tokens，而是把 license、provenance、PII、OCR、语言覆盖和开放发布一起纳入预训练数据工程。

#### 🧪 练习题

```yaml
question: "Common Corpus 与 FineWeb/C4 最核心的差异是什么？"
options:
  - "Common Corpus 完全不做清洗"
  - "Common Corpus 以公有领域或开放许可来源和 provenance 合规为核心约束"
  - "Common Corpus 只包含英文 Common Crawl"
  - "Common Corpus 只用于训练代码模型"
answer: 1
explain: "Common Corpus 的核心目标是构建可审计、开放许可、合规的多语言预训练数据，而不是单纯扩大网页语料规模。"
```
