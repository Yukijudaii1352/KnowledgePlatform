### Common Corpus：面向可审计 LLM 预训练的 2T 开放许可多语言语料
```yaml
id: common_corpus
name: Common Corpus
full_name: Common Corpus数据集 (Common Corpus Dataset)
year: "2026"
org: ICLR社区
paper_url: https://openreview.net/forum?id=Submission25369
category: data
parent: dolma
motivation: 2T完全合规多语言数据集
```

#### 📝 一句话总结
Common Corpus 提出了一个约 2T tokens、517M 文档量级的多语言开放许可预训练数据集，通过 provenance 记录、许可过滤、OCR 修复、PII 替换和毒性检测，解决大规模 LLM 训练数据难以公开审计和法律合规的问题。它证明不依赖未授权网页抓取，也可以构建覆盖政府、文化、科学、代码、开放网页和语义数据的可训练语料基础设施。

#### 🎯 核心要点
- ICLR 2026 Oral 论文，OpenReview submission number 为 25369，对应公开页面题名为 Common Corpus: The Largest Collection of Ethical Data for LLM Pre-Training。
- 数据总量为 1,998,647,168,282 tokens，约 517,033,648 documents。
- 数据均来自 public domain 或开放许可来源，并在元数据中记录 source URL、license、language、collection/domain 等字段。
- 六大 collection 为 Open Government、Open Culture、Open Science、Open Code、Open Web、Open Semantic。
- 不是传统 web-only corpus，包含法律金融行政文本、文化遗产、科学出版、开源代码、Creative Commons 网页和 Wikidata 语义数据。
- 多语言覆盖强，英语约 969B tokens，法语约 275B tokens，德语约 112B tokens，并有至少九种语言超过 10B tokens。
- 清洗工具链包括 Segmentext 文本分段、OCRoscope/OCRerrcr OCR 错误检测、OCRonos OCR 修复、Presidio PII 替换、Celadon 多语言毒性分类器。
- 设计目标是“fully open and auditable LLMs”，让训练数据本身也能被发布、检查、过滤和复现。
- 作者训练 Pleias 系列小模型验证 Common Corpus 可用于多语言预训练，并指出其仍受开放数据可见性不足的 open data paradox 限制。

#### 🔬 深入细节
![Common Corpus 时间与语义分布概览](https://arxiv.org/html/2506.01732v1/x2.png)
*图：论文 Figure 2a 展示 Common Corpus 主要 collection 的历史时间覆盖，体现它不只是现代网页抓取数据。*

```python
# Common Corpus 简化构建流程
allowed_licenses = {
    "Public Domain", "CC-By", "CC-By-SA", "CC0-1.0",
    "MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause",
    "Open license",
}

collections = [
    "Open Government", "Open Culture", "Open Science",
    "Open Code", "Open Web", "Open Semantic",
]

for source in registered_open_sources(collections):
    assert source.license in allowed_licenses
    raw_docs = ingest(source)

    for doc in raw_docs:
        doc = attach_metadata(
            doc,
            source_url=source.url,
            license=source.license,
            collection=source.collection,
        )

        segments = Segmentext(doc.text)
        ocr_quality = OCRoscope(segments)
        if ocr_quality < source.min_quality:
            segments = OCRonos.correct(segments)

        segments = Presidio.detect_and_replace_with_realistic_fake_values(segments)

        toxicity = Celadon.score(segments)
        if toxicity.above_threshold():
            segments = remove_or_rewrite_harmful_spans(segments)

        language = fasttext_language_id(segments)
        write_parquet(segments, metadata={**doc.metadata, "language": language})
```

Common Corpus 的核心问题设定和 FineWeb/RefinedWeb 不同。后两者主要问“如何把 CommonCrawl 变成高质量训练数据”，Common Corpus 问的是“如果必须公开训练数据本身，并且不能依赖版权或 ToS 不明确的内容，能否仍然构建万亿 token 规模语料”。论文把 open 定义得很强：不仅数据可下载，还要允许任意目的使用，且提供 provenance、处理流程和内容信息。这个目标直接面向欧盟等严格监管环境下的 LLM 研发：如果训练语料不能被发布、审计或按许可证过滤，就很难称为真正开放的模型基础。

数据组成上，Common Corpus 是多域聚合而非网页清洗。Open Government 覆盖金融、法律、行政文本；Open Culture 聚合公共领域文化遗产、期刊和书籍；Open Science 包含开放科学出版物；Open Code 来自开源代码；Open Web 收集许可明确的开放网页；Open Semantic 将 Wikidata 结构化三元组转成自然语言式序列。论文表格给出的 collection token 量显示，Open Culture 约 886B tokens，Open Government 约 407B tokens，Open Code 约 283B tokens，Open Science 约 281B tokens，Open Web 约 73B tokens，Open Semantic 约 68B tokens。这个分布说明它的差异化价值不是抓取更多网页，而是把过去不容易进入 LLM 预训练的数据源纳入同一可审计框架。

许可过滤可以形式化为一个集合选择问题。设 \(S_s\) 是每个来源的原始文档集合，\(\mathcal{L}_{open}\) 是允许任意使用的许可集合，Common Corpus 的第一层约束是：

$$
D_{\text{license}} = \{d \in \bigcup_s S_s : \operatorname{license}(d) \in \mathcal{L}_{open}\}
$$

这一步和常见网页数据集的“抓到再过滤质量”不同，它先限定数据权利边界，再做清洗。每个文档保留 license、source URL、language、collection/domain 等元数据，因此下游用户可以根据商业用途、署名要求、语言或领域再筛选。对 LLM 训练来说，这种 metadata-rich corpus 的价值在于可追责：模型出问题时可以回溯数据来源，部署前也可以按组织政策移除某些许可证类型。

清洗流程的难点来自历史和多语言数据。Open Culture 与 Open Government 中大量文本来自扫描件和 OCR，错误类型包括断词、粘连、乱码、版面顺序错乱和古旧拼写。论文为此开发 Segmentext 做抗噪文本分段，用 OCRoscope 统计无法识别的 7-gram 比例作为 OCR 质量信号，用更重的 OCRerrcr 做高精度错误检测，再用 OCRonos 修复严重损坏文本。OCR 质量可以写成：

$$
q_{\text{ocr}}(d)=1-\frac{\#\text{unknown 7-grams}(d)}{\#\text{all 7-grams}(d)}
$$

当 \(q_{\text{ocr}}\) 太低时，文档不是简单丢弃，而可能进入 OCRonos 修复。这个选择很重要，因为公共领域文化遗产常常是高价值但低可用性的文本，如果只按现代网页规则过滤，许多低资源语言和历史材料会被误删。

PII 和毒性处理体现了“合规”不只等于“有开放许可证”。论文使用 Microsoft Presidio 检测个人可识别信息，并通过自定义正则把电话识别准确率提升到更高水平；处理方式不是简单替换成 `[PHONE]` 这类标签，而是换成虚构但格式真实的值，避免破坏模型学习真实文本格式。毒性处理则用 Celadon，一个从 2M 标注样本训练的 DeBERTa-v3-small 多语言分类器，检测 race/origin、gender/sexuality、religion、ability、violence/abuse 等维度的有害内容。对公共领域历史文本而言，即便没有版权风险，也可能包含过时歧视性表达，因此需要删除或合成改写。

整体目标可以写成一个多约束筛选与修复过程：

$$
D_{\text{CC}} = \{\operatorname{clean}(d): d \in D_{\text{license}},\ q_{\text{ocr}}(d) > \gamma,\ \operatorname{pii}(d)=\varnothing,\ \operatorname{tox}(d)<\tau\}
$$

这里的 \(\operatorname{clean}\) 不是单一函数，而是分段、OCR 修复、PII 替换、毒性删除或改写、语言识别和元数据写入的组合。对于 Wikidata，论文还把 RDF triples 转成自然语言式序列，例如把实体和属性 ID 展开为“Franz Liszt country of citizenship Kingdom of Hungary”一类文本，使结构化知识也能进入自回归语言模型训练。

与 Dolma、FineWeb、C4、ROOTS 等数据集相比，Common Corpus 的创新点在四个条件同时满足：多域、超越网页抓取、多语言、开放数据。论文指出，FineWeb 这类高质量网页语料在性能上很强，但主要仍是 web crawl；Common Corpus 与其 top domains 的重叠很低，提供的是互补内容。它的局限也很明确：2T tokens 对中小模型预训练已经有价值，但对 frontier-scale 大模型仍不够；同时开放数据本身存在 open data paradox，即许多合法开放资源并不容易被搜索引擎和 CommonCrawl 抓到，需要专门的社区、机构和工具去整理。

> 💡 关键：Common Corpus 的“算法”不是一个新模型结构，而是一套可审计数据治理流水线；它把许可证、来源、语言、OCR 质量、PII 和毒性都变成预训练语料构建中的显式约束。

#### 🧪 练习题
```yaml
question: "Common Corpus 与 FineWeb/RefinedWeb 的最核心区别是什么？"
options:
  - "Common Corpus 只包含英文网页，FineWeb/RefinedWeb 主要包含代码"
  - "Common Corpus 优先保证开放许可、provenance 和多域多语言合规性，而不只是清洗 CommonCrawl 网页"
  - "Common Corpus 不做任何文本清洗或 PII 处理"
  - "Common Corpus 的主要创新是更大的 Transformer 架构"
answer: 1
explain: "Common Corpus 的核心贡献是构建可发布、可审计、许可明确的多语言多域预训练数据，并配套 OCR、PII、毒性等治理流程。"
```
