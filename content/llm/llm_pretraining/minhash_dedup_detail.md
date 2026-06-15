### MinHash LSH

```yaml
id: minhash_dedup
name: MinHash LSH
full_name: MinHash局部敏感哈希去重 (MinHash LSH Deduplication)
year: '2022'
org: 学术界
paper_url: https://aclanthology.org/2022.acl-long.577/
category: data
parent: —
motivation: 局部敏感哈希实现文档级去重
```

#### 📝 一句话总结

MinHash LSH 去重通过把文档转成 n-gram 集合并用短签名近似 Jaccard 相似度，在海量语料中高效发现近重复文档。ACL 2022 去重论文将其实现为 NearDup，用于移除 C4 等数据集中的文档级近重复，从而降低记忆化和训练/验证污染。

#### 🎯 核心要点

- 来源于 ACL 2022 *Deduplicating Training Data Makes Language Models Better*，论文同时提出 NearDup 和 ExactSubstr 两类去重工具
- MinHash 利用“签名相等概率等于 Jaccard 相似度”的性质，避免对所有文档做二次方两两比较
- NearDup 先对文档做空格分词，再构造连续 5-gram 集合，并保留哈希最小值组成签名
- LSH 将相似签名放入同一桶中，只对候选对做精确或近似相似度验证
- 论文将 edit similarity 大于 0.8 的候选文档视为重复，并按 cluster 删除副本
- 对 C4 可发现大规模重复簇，包括数千乃至数十万级的近重复文档簇
- 去重后的模型在无提示生成中复制训练文本的比例显著下降，训练/验证重叠也更可控

#### 🔬 深入细节

![NearDup 在 C4 上发现的近重复簇](https://ar5iv.labs.arxiv.org/html/2107.06499/assets/x1.png)
*图：论文 Figure 1，NearDup 在 C4 上得到的近重复簇大小分布，显示网页语料存在大量重复文档簇。*

```python
# MinHash LSH 文档级近重复去重伪代码
def minhash_lsh_dedup(documents, ngram_size=5, threshold=0.8):
    signatures = {}
    for doc_id, text in enumerate(documents):
        tokens = whitespace_tokenize(text)
        shingles = set(ngrams(tokens, ngram_size))
        signatures[doc_id] = minhash_signature(shingles, num_hashes=K)

    buckets = defaultdict(list)
    for doc_id, sig in signatures.items():
        for band in split_into_lsh_bands(sig):
            buckets[(band.index, band.hash())].append(doc_id)

    duplicate_edges = []
    for candidate_ids in buckets.values():
        for i, j in candidate_pairs(candidate_ids):
            if edit_similarity(documents[i], documents[j]) > threshold:
                duplicate_edges.append((i, j))

    clusters = union_find(duplicate_edges)
    return keep_one_document_per_cluster(documents, clusters)
```

**动机与背景：网页数据的重复并不总是完全相同。** Common Crawl 中常见镜像站、模板页面、转载文章、带不同时间戳或广告栏的页面。如果只做精确哈希，许多“几乎一样”的文档不会被识别；如果做全量编辑距离比较，复杂度又是 \(O(n^2)\)，无法处理亿级文档。MinHash LSH 的价值在于用可控误差把候选对数量降到可处理范围。

**核心机制：用集合相似度近似文档相似度。** 对文档 \(x_i\) 和 \(x_j\)，把它们表示成 5-gram 集合 \(S_i,S_j\)，Jaccard 相似度为：

$$
J(S_i,S_j)=\frac{|S_i\cap S_j|}{|S_i\cup S_j|}
$$

MinHash 的关键性质是：对随机哈希排列，两个集合最小哈希值相同的概率等于它们的 Jaccard 相似度。因此只需保存若干个最小哈希值作为签名，就能用签名相似度估计文档相似度。LSH 再把签名切成 bands，使高相似文档更可能落入同一桶，低相似文档大多不会比较。

**训练流程中的作用：候选生成和验证分开。** NearDup 并不是只看 MinHash 桶就删除文档，而是把 LSH 作为候选生成器：先快速找可能重复的文档对，再计算 edit similarity 做验证，阈值大于 0.8 才建边。所有重复边形成图，连通分量就是近重复簇；保留一个代表文档，删除其余副本。这样做兼顾召回、精度和工程可扩展性。

**与 suffix array 去重的区别：文档级近似 vs 子串级精确。** MinHash 适合发现整篇文档高度相似但局部字段不同的情况；suffix array 更适合发现长段文本逐字重复但所在文档整体并不相似的情况。论文发现两者互补：网页语料既有近重复页面，也有长重复段落。MinHash 删除的是整篇文档，通常更干净；suffix array 删除的是重复子串，能保留文档中非重复部分。

> 💡 关键：MinHash LSH 的工程意义是把“所有文档两两比较”的不可行问题，转化为“只验证高概率候选对”的可扩展去重问题。

#### 🧪 练习题

```yaml
question: "MinHash 在文档去重中的核心用途是什么？"
options:
  - "训练语言模型的 tokenizer"
  - "近似估计 n-gram 集合的 Jaccard 相似度并生成候选重复文档"
  - "逐字扫描所有重复子串"
  - "替代语言识别模型"
answer: 1
explain: "MinHash 签名相似度可近似 Jaccard 相似度，配合 LSH 能高效找到可能近重复的文档对。"
```
