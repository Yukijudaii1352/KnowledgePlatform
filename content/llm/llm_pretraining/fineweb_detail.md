### FineWeb：用数据消融驱动的 CommonCrawl 清洗与去重配方
```yaml
id: fineweb
name: FineWeb
full_name: FineWeb数据集 (FineWeb Dataset)
year: "2024"
org: HuggingFace
paper_url: https://huggingface.co/datasets/HuggingFaceFW/fineweb
category: data
parent: refinedweb
motivation: 15T最高质量开源网页语料
```

#### 📝 一句话总结
FineWeb 提出了一个完全公开、可复现、以实验消融选择规则的网页预训练数据构建流程，把 96 个 CommonCrawl 快照加工成论文版本约 15T tokens 的高质量英文语料。它解决了 RefinedWeb 之后“配方公开但全量数据和设计选择仍不够透明”的问题，用小模型预训练评测来决定抽取、过滤、去重和自定义启发式规则。

#### 🎯 核心要点
- 发布 FineWeb：论文版本为 15T tokens，来自 96 个 CommonCrawl snapshots 的英文网页数据。
- Hugging Face 数据集页后续版本继续追加快照，当前数据卡描述为超过 18.5T tokens。
- 使用 `datatrove` 作为可复现的大规模数据处理库，并公开完整处理脚本。
- 方法核心不是单条过滤规则，而是训练 1.82B ablation models 来验证每个数据处理选择。
- 文本抽取从 WARC 原始 HTML 出发，使用 `trafilatura`，避免 WET 中残留的菜单和 boilerplate。
- 基础过滤包括 URL 过滤、fastText 英文识别、Gopher repetition、Gopher quality、C4 quality 和 FineWeb 自定义质量规则。
- 去重采用 per-crawl MinHash，而不是把所有 dump 合并后做全局去重。
- MinHash 配置采用 5-grams、14 buckets、8 hashes per bucket，并对每个 CommonCrawl dump 独立去重。
- 公开 sample-10BT、sample-100BT、sample-350BT、代码、评测配置和 ablation checkpoints，强调数据集科学的可审计性。

#### 🔬 深入细节
![FineWeb 处理步骤带来的性能提升](https://arxiv.org/html/2406.17557v1/x9.png)
*图：论文 Figure 9 展示 FineWeb 从 base filtering 到 per-crawl MinHash、C4 filters、自定义 filters 的逐步性能收益。*

```python
# FineWeb / datatrove 简化伪代码
for dump in common_crawl_snapshots_96:
    raw_docs = WarcReader(f"s3://commoncrawl/crawl-data/{dump}/segments/*/warc/*")

    filtered = []
    for doc in raw_docs:
        if URLFilter(doc.url):
            continue

        text = Trafilatura(favour_precision=True)(doc.html)
        if LanguageFilter(language="en", min_score=0.65)(text):
            continue
        if GopherRepetitionFilter(text):
            continue
        if GopherQualityFilter(text):
            continue
        if C4QualityFilter(selected_rules=True)(text):
            continue
        if FineWebQualityFilter(text):
            continue

        text = PIIFormatter.replace_email_and_public_ip(text)
        filtered.append(text)

    # 论文和数据卡强调每个 crawl 独立 MinHash 去重
    signatures = MinhashDedupSignature(
        filtered,
        n_grams=5,
        num_buckets=14,
        hashes_per_bucket=8,
        hash_fc="sha1",
        precision=64,
    )
    clusters = MinhashDedupBuckets(signatures)
    deduped = MinhashDedupFilter(filtered, clusters)
    write_parquet(deduped, dump=dump)
```

FineWeb 的出发点是：数据处理规则本身需要像模型结构一样被实验验证。过去网页数据集常给出一套经验规则，例如“删掉不以标点结尾的行”或“用某个 bad-word list”，但这些规则是否真正提升预训练模型并不总是清楚。FineWeb 论文把数据构建变成一系列可控消融：固定模型规模、架构、训练 tokens 和评测任务，只替换训练数据版本，然后比较下游 benchmark 聚合分数。作者使用 1.82B Llama-style ablation models、2048 context、约 2M tokens global batch，并在 CommonSenseQA、HellaSwag、OpenBookQA、PIQA、SIQA、WinoGrande、ARC、MMLU 等任务上验证早期训练信号。

文本抽取阶段继承但强化了 RefinedWeb 的经验。CommonCrawl 提供 WARC 和 WET 两类数据，WET 虽然已经是纯文本，但通常保留菜单、导航、广告、页脚和模板文本。FineWeb 选择从 WARC 原始 HTML 重新抽取，用 `trafilatura` 获取正文，牺牲一部分处理成本换取更干净的训练样本。这个选择通过 ablation 验证，而不是只凭直觉决定；如果抽取器让模型反复学习网页框架文本，预训练损失可能仍下降，但下游能力会被无意义 token 消耗掉。

基础过滤由多类启发式构成。URL 过滤删除恶意、NSFW 和低可信来源；fastText 语言过滤保留英文分数足够高的文档；Gopher repetition 和 Gopher quality 针对重复段落、异常字符比例、过短或过长文档等低质量模式；C4 filters 提供一组传统网页清洗规则；FineWeb 自定义 filters 则针对 list-like documents、重复行、疑似错误换行等在消融中暴露出来的问题。可以把过滤器组合写成：

$$
D_{\text{base}} = \{d \in D_{\text{WARC}} : f_i(d)=0,\ \forall f_i \in \mathcal{F}_{\text{url,lang,gopher,c4,fineweb}}\}
$$

这里 \(f_i(d)=1\) 表示某个过滤器判定文档应删除。关键点在于，FineWeb 不把“过滤比例”当作目标，而把“同样 token 预算训练出的模型表现”当作目标。论文中自定义过滤规则合计会删除相当数量 tokens，但只有当 28B 或 350B token ablation 显示性能提升时才被纳入最终配方。

FineWeb 最值得注意的差异是去重策略。RefinedWeb 强调大规模严格去重，而 FineWeb 发现“全局跨 dump 去重”并不一定产生最好的训练数据；在他们的实验中，对每个 crawl/snapshot 独立做 MinHash 去重，再从多个 dump 采样训练，效果优于把所有 dump 合起来做一次全局去重。直觉上，跨 dump 重复可能代表网页在不同时间的稳定内容，也可能保留时间分布和域分布；过度全局去重会削弱这种分布结构。FineWeb 的 MinHash LSH 命中概率可写为：

$$
P(\text{duplicate} \mid s)=1-(1-s^8)^{14}
$$

其中 \(s\) 是两个文档 5-gram 集合的 Jaccard 相似度，8 是每个 bucket 的哈希数，14 是 bucket 数。这个配置让高相似文档更容易聚到同一候选桶，同时避免对所有文档做平方级比较。与 RefinedWeb 的“MinHash + ExactSubstr”相比，FineWeb 更强调配方在完整训练评价上的收益，并把 per-crawl 作为一个经验证有效的工程选择。

FineWeb 的另一个贡献是公开性。数据集页不仅提供全量数据和不同大小 sample，还给出 `datatrove` 处理脚本、ablation checkpoints、评测结果和 benchmark 定义。这样做的价值是把“数据质量”从黑箱口碑变成可重复实验：研究者可以替换某个过滤器、改 MinHash 参数、只处理一个 dump，或用 sample-100BT 快速训练代理模型。对于 LLM 预训练来说，这种公开 pipeline 比单纯发布一个大文件更重要，因为后续模型开发者需要知道数据为什么长这样、哪些规则可以迁移到其他语言、哪些规则只对英文网页成立。

训练流程上，FineWeb 的最终 15T tokens 足以支持 Chinchilla-optimal 级别的大模型数据需求。论文同时提出 FineWeb-Edu 作为教育内容子集，用 Llama-3-70B-Instruct 产生 0 到 5 的教育质量标注，再训练轻量分类器扩展到全量 FineWeb；虽然本条目关注 FineWeb 本体，但 FineWeb-Edu 说明同一开放数据底座还能继续派生任务导向的数据切片。FineWeb 因此不是一个静态语料，而是一套“CommonCrawl → 可复现处理 → 小模型消融 → 发布数据与证据”的开放数据工程范式。

> 💡 关键：FineWeb 的核心创新不是“比 RefinedWeb 多几个过滤器”，而是用代理模型训练结果来选择过滤和去重策略，避免把看似合理但伤害模型表现的清洗规则固化进数据集。

#### 🧪 练习题
```yaml
question: "FineWeb 为什么选择 per-crawl MinHash 去重，而不是简单地把所有 CommonCrawl dump 合并后全局去重？"
options:
  - "因为 per-crawl 去重在实验中带来更好的模型表现，并保留跨时间快照的有用分布信息"
  - "因为全局去重无法计算任何 MinHash 签名"
  - "因为 FineWeb 完全不需要去重"
  - "因为 per-crawl 去重只适用于非英文数据"
answer: 0
explain: "论文的消融显示，独立 crawl 去重的采样训练效果优于全局去重；这说明重复删除强度和时间分布保留之间存在质量权衡。"
```
