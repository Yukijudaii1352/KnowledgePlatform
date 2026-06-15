### FineWeb

```yaml
id: fineweb
name: FineWeb
full_name: FineWeb数据集 (FineWeb Dataset)
year: '2024'
org: HuggingFace
paper_url: https://huggingface.co/datasets/HuggingFaceFW/fineweb
category: data
parent: refinedweb
motivation: 15T最高质量开源网页语料
```

#### 📝 一句话总结

FineWeb 是 HuggingFace 对 RefinedWeb 思路的开放复现与强化版，使用 datatrove 从 Common Crawl 构建超大规模英文网页语料。它最初以约 15T tokens 发布，当前 dataset card 已扩展到 18.5T+ tokens，并公开完整处理脚本、消融模型和评测结果。

#### 🎯 核心要点

- 数据来源为 Common Crawl，最初处理 2013 到 2024 年 4 月的 96 个 crawl dump
- 当前 HuggingFace dataset card 显示规模已从原始 15T 扩展到 18.5T+ tokens
- 使用 HuggingFace `datatrove` 执行可复现 pipeline，并公开 FineWeb 处理脚本
- 处理流程：URL 过滤 → Trafilatura 正文抽取 → fastText 英文过滤 → Gopher/C4/FineWeb 质量过滤 → MinHash 去重 → PII 格式化
- fastText 英文阈值为 `en` language score >= 0.65
- MinHash 去重按每个 crawl 单独执行，使用 5-grams 和 14x8 hash functions；消融显示逐 crawl 去重优于全局去重采样
- 避免使用 Wikipedia 相似度质量分类器或毒性分类器作为主过滤器，以减少对方言/身份相关文本的系统性误删

#### 🔬 深入细节

![FineWeb 官方数据集图](https://huggingface.co/datasets/HuggingFaceFW/admin/resolve/main/fineweb-logo.png)
*图：FineWeb dataset card 官方视觉；完整处理脚本公开在 datatrove 的 FineWeb 示例中。*

```python
# FineWeb datatrove pipeline 伪代码
def build_fineweb(common_crawl_warc_dumps):
    all_docs = []
    for crawl in common_crawl_warc_dumps:
        docs = []
        for page in stream_warc(crawl):
            if bad_url(page.url, blocklists=["malicious", "nsfw"]):
                continue

            text = trafilatura_extract(page.html)
            if fasttext_language_score(text, "en") < 0.65:
                continue
            if fails_gopher_quality_or_repetition(text):
                continue
            if fails_c4_quality_except_terminal_punct(text):
                continue
            if fails_fineweb_custom_filters(text):
                continue

            text = anonymize_email_and_public_ip(text)
            docs.append(text)

        # FineWeb 消融选择：每个 crawl 单独 MinHash 去重
        docs = minhash_dedup(docs, ngrams=5, hash_bands="14x8")
        all_docs.extend(docs)
    return all_docs
```

**动机与背景：复现 RefinedWeb，并把数据处理完全开源。** RefinedWeb 证明纯网页数据也能训练强模型，但完整数据和处理细节并非完全开放到每个工程步骤。FineWeb 的目标是用公开库 datatrove 复现并改进这一路线：从 Common Crawl 原始 HTML 出发，公开脚本、评测任务、消融模型和结果，让研究者能检查每个过滤选择对下游性能的影响。

**核心机制：多层启发式过滤，而不是单一模型打分。** FineWeb 先过滤恶意和 NSFW URL，再用 Trafilatura 抽取正文，随后使用 fastText 语言识别保留英文文档。质量过滤组合了 Gopher repetition/quality、C4 quality filters（但不使用 terminal punctuation 规则）和 FineWeb 自定义规则，后者针对列表型文档、重复行和疑似错误换行格式。这个组合继承了 C4、Gopher、RefinedWeb 的经验，同时针对网页常见格式噪声做了补充。

**去重策略：逐 crawl MinHash 是关键消融结论。** FineWeb 原本考虑对全数据集整体去重，但消融发现，对每个 Common Crawl dump 单独去重后再采样训练，效果优于全局去重。直觉上，全局去重会过度删除跨时间重复但仍有代表性的网页内容，而逐 crawl 去重更像清理单次抓取内部的镜像和模板重复。MinHash 参数使用 5-grams 和 14x8 hash functions，与大规模网页近重复检测相匹配。

**与 RefinedWeb 的区别：开放性和实证迭代更强。** FineWeb 明确发布完整数据、datatrove pipeline、nanotron 消融模型、评测结果和 benchmark 配置。它也更谨慎地避免某些 ML 质量/毒性过滤器，因为这类模型可能偏向 Wikipedia 风格文本或误伤特定身份相关文本。换言之，FineWeb 的质量策略不是“越像黄金语料越好”，而是通过可复现实验寻找对 LLM 预训练表现真正有益的过滤组合。

> 💡 关键：FineWeb 的工程价值在于把网页语料构建从论文级描述推进到可运行、可消融、可复现的公开 pipeline。

#### 🧪 练习题

```yaml
question: "FineWeb 为什么选择逐 crawl 进行 MinHash 去重？"
options:
  - "因为逐 crawl 去重在消融中优于全局去重采样"
  - "因为 MinHash 不能处理多个 crawl"
  - "因为 FineWeb 不需要任何去重"
  - "因为逐 crawl 去重会保留所有重复文档"
answer: 0
explain: "FineWeb dataset card 说明，团队原本计划全局去重，但消融显示逐个 Common Crawl dump 去重后采样训练效果更好。"
```
