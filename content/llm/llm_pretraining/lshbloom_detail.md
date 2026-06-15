### LSHBloom

```yaml
id: lshbloom
name: LSHBloom
full_name: LSHBloom去重 (LSHBloom Deduplication)
year: '2026'
org: 学术界
paper_url: https://arxiv.org/abs/2501.02404
category: data
parent: fed_dedup
motivation: Bloom Filter节省18倍空间
```

#### 📝 一句话总结

LSHBloom 将 MinHash LSH 中昂贵的 hashmap/tree LSHIndex 替换为按 band 组织的 Bloom filter 数组，在近似保持 MinHashLSH 去重效果的同时大幅降低磁盘和内存占用。它解决的是数十亿文档规模下 LSH 索引膨胀到无法落地的问题。

#### 🎯 核心要点

- 正确公开论文为 LSHBloom: Memory-efficient, Extreme-scale Document Deduplication, arXiv:2411.04257
- 保留 MinHash signature 和 LSH banding 机制，只替换候选检索索引结构
- 每个 LSH band 对应一个 Bloom filter，band hash 命中任一 filter 即标记为候选重复
- Bloom filter 不引入 false negative，只引入可配置 false positive overhead
- 实验在 peS2o 数据集上报告约 12× 吞吐提升和约 18× 磁盘占用降低
- 极端规模外推显示，在数十亿文档上可获得约 54× 空间优势
- 适合在线 ingestion pipeline：新文档查询 filter 后再插入，重复文档可直接丢弃或标记

#### 🔬 深入细节

![LSHBloom 与 MinHashLSH 时间分解](https://ar5iv.labs.arxiv.org/html/2411.04257/assets/x1.png)
*图：LSHBloom 论文 Figure 1，对比传统 MinHashLSH 与 LSHBloom 在 peS2o 子集上的 wall-clock time breakdown。Manifest 中 paper_url 指向不相关论文，正文依据 arXiv:2411.04257 补足。*

```python
# LSHBloom 在线文档去重伪代码
def lshbloom_dedup(stream, num_hashes=128, bands=9, fp_rate=1e-5):
    filters = [BloomFilter(expected_items=N, fp_rate=fp_rate) for _ in range(bands)]
    kept = []

    for doc in stream:
        shingles = set(ngrams(tokenize(doc), n=5))
        sig = minhash_signature(shingles, num_hashes)
        band_values = []
        is_duplicate = False

        for band_id, rows in enumerate(split_signature(sig, bands)):
            band_hash = universal_hash_tuple(rows)
            band_values.append((band_id, band_hash))
            if band_hash in filters[band_id]:
                is_duplicate = True

        if not is_duplicate:
            kept.append(doc)
            for band_id, band_hash in band_values:
                filters[band_id].add(band_hash)

    return kept
```

**动机与背景：MinHashLSH 的索引比签名本身更难扩展。** MinHash LSH 通过 band collision 避免全量两两比较，但传统实现通常要保存 band key 到文档列表的映射。几十亿文档时，这些 hash table、指针、列表和落盘结构会产生巨大的空间放大，还会带来随机访问和 pointer chasing latency。LSHBloom 的判断是：对很多语料 ingest 场景，只需要知道“之前是否见过相似 band”，不一定要立刻返回完整候选列表。

**核心机制：每个 band 一个近似 membership filter。** 给定签名矩阵，LSH 把每篇文档的 \(k\) 个 MinHash 值分成 \(b\) 个 band，每个 band 含 \(r\) 行。传统 MinHashLSH 记录 \((band\_id, band\_hash)\rightarrow doc\_ids\)。LSHBloom 改为把每个 band 的 hash 插入独立 Bloom filter。查询时只要任一 band 命中，就认为该文档可能与已有文档近重复。

$$
p_{\text{effective}} = 1-(1-p)^b
$$

其中 \(p\) 是单个 Bloom filter 的误报率，\(b\) 是 band 数。由于 Bloom filter 没有 false negative，LSHBloom 不会因为索引替换漏掉 MinHashLSH 本应命中的 band collision；代价是少量额外 false positive，可能多删少量非重复文档。

**流程直觉：用“候选存在性”替代“候选列表”。** 对于训练语料构建，常见目标是去掉额外副本，而非保存所有重复边。LSHBloom 因此把索引退化为相似感知的 approximate membership query：如果某个 band 已存在，当前文档大概率与之前文档超过 Jaccard 阈值，直接标记重复；如果所有 band 都未命中，则保留并插入索引。这使在线处理和低内存部署更简单。

**与 FED/SEDD 的关系：一个优化计算，一个压缩索引。** GPU MinHash 框架主要解决签名生成、分桶和候选验证的吞吐；LSHBloom 主要解决 LSHIndex 的空间和随机访问开销。二者可以互补：前者让 hash 产生更快，后者让候选存在性查询更小、更顺序、更 cache-friendly。

> 💡 关键：LSHBloom 的设计牺牲“返回全部候选文档”的能力，换取了互联网规模去重中更重要的空间可行性和在线吞吐。

#### 🧪 练习题

```yaml
question: "LSHBloom 为什么通常不会增加 MinHashLSH 的 false negative？"
options:
  - "因为 Bloom filter 对已插入元素没有假阴性"
  - "因为它不使用 MinHash"
  - "因为它计算完整编辑距离"
  - "因为它只处理短文档"
answer: 0
explain: "Bloom filter 可能误报存在，但不会把已插入的 band hash 判为不存在，因此不会漏掉原本的 band collision。"
```
