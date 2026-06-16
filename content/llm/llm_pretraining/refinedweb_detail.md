### RefinedWeb：用 MDR 把 CommonCrawl 纯网页数据提升到可训练 Falcon 的质量
```yaml
id: refinedweb
name: RefinedWeb
full_name: RefinedWeb数据集 (RefinedWeb Dataset)
year: "2023"
org: TII
paper_url: https://arxiv.org/abs/2306.01116
category: data
parent: c4
motivation: 5T纯网页数据MDR方法论
```

#### 📝 一句话总结
RefinedWeb 提出了 MacroData Refinement（MDR）数据处理流程，用严格过滤、行级清理、MinHash 近重复去重和精确子串去重，把 CommonCrawl 纯网页数据加工成约 5T tokens 的高质量英文预训练语料。它解决了“大模型必须依赖人工策划语料混合”的假设，证明充分清洗和去重的网页数据也能训练出与 curated corpora 相当甚至更强的语言模型。

#### 🎯 核心要点
- 提出 MDR：面向 CommonCrawl 的大规模“文档准备 → 过滤 → 去重”流水线。
- 目标数据规模为 3T 到 6T tokens，最终得到约 5T tokens 的英文 RefinedWeb。
- 数据源坚持 web-only，不依赖书籍、Wikipedia、arXiv、社交媒体等人工精选语料。
- 文档准备使用 WARC 原始 HTML、`warcio`、`trafilatura` 和 fastText/CCNet 语言识别。
- 过滤阶段组合 URL blocklist、URL scoring、重复片段检测、文档级质量规则和行级 corrections。
- 去重阶段组合 MinHash 近似文档去重、ExactSubstr 精确子串去重、跨 CommonCrawl dump 的 URL 去重。
- 论文释放约 600B tokens 公共子集，并训练 1.3B/7.5B 级别模型验证数据质量。
- 核心实证结论是：RefinedWeb-only 模型可超过 The Pile 训练模型，并在论文评测设置中接近 GPT-3 系列表现。

#### 🔬 深入细节
![RefinedWeb MDR 流水线](https://ar5iv.labs.arxiv.org/html/2306.01116/assets/x2.png)
*图：论文 Figure 2 展示 MDR 从 CommonCrawl 到 RW 的主要阶段，以及每一步过滤或去重后保留的数据比例。*

```python
# MacroData Refinement (MDR) 简化伪代码
for dump in common_crawl_dumps:
    for page in read_warc_with_warcio(dump):
        if blocked_by_domain_or_url_score(page.url):
            continue

        text = trafilatura_extract_main_content(page.html)
        text = normalize_newlines_and_remove_urls(text)

        lang, score = fasttext_ccnet_language_id(text)
        if lang != "en" or score < 0.65:
            continue

        if has_excessive_repetition(text):
            continue
        if violates_document_quality_rules(text):
            continue

        text = remove_bad_lines(text)  # navigation, call-to-action, counters
        if removed_line_fraction(text) > 0.05:
            continue

        emit_to_rw_filtered(text, metadata={"url": page.url, "dump": dump})

# 为了可扩展性，将过滤后的语料分片后去重
for shard in split_rw_filtered_into_100_parts():
    clusters = minhash_lsh_clusters(shard, ngram=5, hashes=9000)
    keep_one_document_per_cluster(clusters)
    remove_exact_substrings_longer_than_50_tokens(shard)
    drop_urls_seen_in_previous_dumps(shard)

write_refinedweb()
```

RefinedWeb 的动机不是“再做一个 CommonCrawl 清洗版”，而是挑战一个当时很强的经验判断：强 LLM 需要把网页、书籍、论文、代码、Wikipedia、论坛等人工策划语料混在一起训练。论文指出，Chinchilla 式 scaling law 会把数据需求推到数万亿 tokens，人工精选源既难以扩展，也带来授权和覆盖范围问题。因此 MDR 的设计原则是 scale first：从 CommonCrawl 这种可持续增量的数据源出发，不靠人工挑选高价值站点，而靠可复现的处理规则把低质量网页剔除出去。

MDR 的第一段是文档准备。作者没有直接用 CommonCrawl WET，因为 WET 会保留大量菜单、广告、页脚和站点模板文本；他们从 WARC 原始 HTML 开始，用 `trafilatura` 提取正文，再用正则清理 URL 和过多换行。语言识别使用 CCNet 的 fastText 分类器，保留 top language score 不低于 0.65 的英文文档。这个阈值的直觉是：如果最高语言概率仍然很低，文本通常不是正常自然语言，而是混杂、模板、乱码或抽取失败的页面。

第二段是过滤。RefinedWeb 避免在质量过滤上依赖“像 Wikipedia 才是好文本”的 ML 分类器，因为这会把公开网页中合法但风格不同的群体语言、方言、医学法律内容误删。相反，论文使用相对中性的启发式规则：URL 层面用 4.6M 量级域名 blocklist 和 URL 词项打分过滤欺诈、成人、赌博等站点；文档层面移除重复行、重复段落、异常符号比例、过短或过长等低质量样本；行级 corrections 则删除“subscribe”、“click here”、社交计数、导航按钮等被正文抽取器漏进来的 boilerplate。若行级清理删掉超过 5% 的文档内容，整篇文档会被认为页面结构污染严重而丢弃。

去重是 MDR 的核心质量杠杆。网页数据的重复不是简单的整篇复制，还包括许可证模板、页脚、隐私声明、SEO 伪原创、同一网页跨月份重复抓取，以及不同站点之间的转载。RefinedWeb 先做文档级 MinHash 近似去重，再做 token 序列级 ExactSubstr 精确子串去重。MinHash 把文档看成 5-gram 集合，用 sketch 近似 Jaccard 相似度；若两个文档的 n-gram 集合相似度为 \(s\)，LSH 至少命中一个 bucket 的概率可写为：

$$
P(\text{match} \mid s) = 1 - (1 - s^b)^r
$$

其中 \(b\) 是每个 bucket 中的哈希数，\(r\) 是 bucket 数。这个公式的作用是把“所有文档两两比较”的不可行问题变成“只比较落在同一 bucket 的候选文档”。RefinedWeb 使用大量哈希来提高召回，目的是尽可能发现模板化近重复，而不是只抓完全相同的网页。

ExactSubstr 处理的是 MinHash 不擅长的局部重复。一个文档可能整体并不相似，但其中包含 100 tokens 的免责声明、引用、页脚或转载段落；文档级 MinHash 可能认为它们不重复，但语言模型仍会反复看到这些片段并产生记忆化。论文采用 Lee et al. 的 suffix array 实现，在拼接后的长 token 序列上查找超过 50 连续 tokens 的精确重复，并删除重复片段。可以把最终保留语料理解成：

$$
D_{\text{RW}} = \operatorname{ExactSubstr}\bigl(\operatorname{MinHash}(\operatorname{Filter}(\operatorname{Extract}(D_{\text{CC}})))\bigr)
$$

这里每个算子都不是独立追求“删得越多越好”，而是服务于最终预训练质量。论文通过 ablation 发现，raw → filtered → deduplicated 的每个阶段都带来下游 zero-shot 提升，尤其去重对网页语料非常关键。相比 The Pile 这类混合 curated corpus，RefinedWeb 的优势来自规模、统一处理和低重复率，而不是人工选择“高端文本”。

训练与验证流程也体现了数据集论文的评价方法。作者用相同预训练设置比较 C4、OSCAR、The Pile 和 RefinedWeb，并训练 1B/3B 小规模模型到近似最优 tokens，再扩展到 1B/7B 模型在 350B tokens 上训练。评测聚合了常识、推理、问答等 zero-shot 任务，结论是 RefinedWeb-only 模型显著优于 The Pile-only 对照，甚至在论文的评测环境中接近 GPT-3 相关点位。这意味着 MDR 的关键贡献不是某一个过滤规则，而是一个可规模化、可复现、以去重为中心的网页数据工程方法论。

> 💡 关键：RefinedWeb 的“纯网页”并不等于“原始网页”。它把 CommonCrawl 当作原矿，MDR 的抽取、过滤和去重才是把网页数据变成预训练燃料的冶炼过程。

#### 🧪 练习题
```yaml
question: "RefinedWeb 中同时使用 MinHash 和 ExactSubstr 的主要原因是什么？"
options:
  - "MinHash 负责语言识别，ExactSubstr 负责去除非英文文本"
  - "MinHash 找文档级近重复，ExactSubstr 找局部精确重复片段"
  - "MinHash 用于压缩模型参数，ExactSubstr 用于提升推理速度"
  - "二者都是 URL blocklist 的不同实现"
answer: 1
explain: "网页重复既有整篇或模板化近重复，也有局部免责声明、页脚等精确重复片段；两种去重粒度互补。"
```
