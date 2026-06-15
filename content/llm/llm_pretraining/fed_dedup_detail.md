### FED框架

```yaml
id: fed_dedup
name: FED框架
full_name: FED去重框架 (Fast and Efficient Dataset Deduplication)
year: '2026'
org: 学术界
paper_url: https://arxiv.org/abs/2501.02404
category: data
parent: minhash_dedup
motivation: GPU加速MinHash快107倍
```

#### 📝 一句话总结

FED/SEDD 类 GPU 去重框架把 MinHash LSH 的签名生成、分桶和候选相似度验证搬到多 GPU 流水线上，解决了万亿 token 级语料去重中 CPU MinHash 过慢、GPU 数据搬移过重的问题。其核心贡献是用可复用 rolling hash、流式通信和硬件感知参数选择显著提高端到端吞吐。

#### 🎯 核心要点

- 公开可读的对应实现论文为 SEDD: Scalable and Efficient Dataset Deduplication with GPUs
- 沿用 MinHash LSH 的文档级近重复检测思想，目标是保持与标准 MinHash 高相似的重复集合
- 用部分可复用哈希函数加速 n-gram MinHash 签名生成，减少重复计算
- 用 GPU kernel 并行完成 MinHash 生成、bucket 扫描和 pairwise similarity verification
- 用 streaming-based approach 替代物理数据 shuffle，降低多 GPU/多节点通信瓶颈
- 在 30M 文档上相对 CPU SlimPajama 工具最高 158×，相对 NeMo Curator GPU baseline 最高 7.8×
- 在 8 节点 32 GPU V100 集群上完成 1.2T tokens 去重约 3 小时，并保持与标准 MinHash 重复集合 Jaccard 相似度大于 0.95

#### 🔬 深入细节

![SEDD GPU 去重框架总览](https://ar5iv.labs.arxiv.org/html/2501.01046/assets/x3.png)
*图：SEDD 论文 Figure 3，展示多 GPU 文档加载、MinHash 生成、按 band 分配 bucket、GPU 候选验证和流式通信。Manifest 中 paper_url 指向不相关论文，正文依据公开论文 arXiv:2501.01046 补足。*

```python
# GPU 加速 MinHash LSH 去重伪代码
def gpu_fed_dedup(documents, num_hashes=128, bands=16, threshold=0.8):
    gpu_streams = init_gpu_streams()
    duplicate_edges = []

    for batch in stream_documents(documents):
        tokens = tokenize_on_cpu(batch)
        shingles = build_ngrams(tokens, n=5)

        # GPU 上用可复用 rolling hash 生成 MinHash 签名
        signatures = gpu_minhash(shingles, num_hashes, reusable_hash=True)
        band_keys = gpu_split_and_hash_bands(signatures, bands)

        # 不做全量物理 shuffle，而是按 band/rank 流式派发候选桶
        for rank, bucket_stream in stream_buckets_by_rank(band_keys):
            candidates = gpu_collect_candidate_pairs(bucket_stream)
            verified = gpu_verify_similarity(candidates, signatures, threshold)
            duplicate_edges.extend(verified)

    clusters = union_find(duplicate_edges)
    return keep_representatives(documents, clusters)
```

**动机与背景：MinHash LSH 可扩展，但传统实现不是硬件友好的。** 文档级近重复去重通常先把每篇文档转成 n-gram 集合，再生成 MinHash 签名，通过 LSH bands 找候选重复对。算法复杂度比全量两两比较低很多，但在 C4、SlimPajama、Common Crawl 级规模上，签名生成和分桶仍会消耗大量 CPU 时间；朴素 GPU 版本又容易被数据 shuffle、bucket 不均衡和 GPU occupancy 不足拖慢。

**核心机制一：复用哈希计算。** 标准 MinHash 对每个 shingle 施加多个 hash permutation，生成 \(H\) 个最小值。SEDD/FED 的关键优化是把相邻 n-gram 的哈希计算改成部分可复用形式，类似 rolling hash：当窗口从 \(g_t\) 滑到 \(g_{t+1}\) 时，只更新离开和进入窗口的 token 贡献。这样 MinHash signature generation 不再重复处理大部分相邻上下文。

$$
\text{sig}_h(d)=\min_{s\in \text{shingles}(d)} h(s)
$$

**核心机制二：分桶和验证都围绕 GPU 占用率设计。** MinHash LSH 会把签名切成 \(b\) 个 band，每个 band 产生 bucket key。传统分布式实现常把同一 bucket 的文档物理 shuffle 到同一 worker；SEDD/FED 则让 GPU process 负责特定 band 子集，通过流式方式读入 bucket 并立刻验证候选对。这样避免大规模中间状态落盘或跨节点搬移，同时让 bucket 内 pairwise comparison 在 GPU 上以较大 batch 执行。

**训练数据管线中的作用：快，但不牺牲重复集合质量。** 论文不是用启发式精确哈希替代 MinHash，而是尽量保持 MinHash LSH 的候选召回和判定逻辑。实验用标准 MinHash 或 exact MinHash 近似作为 oracle，报告重复集合 Jaccard overlap 通常在 0.95 以上。这一点很重要，因为预训练去重错误会改变数据分布：过度去重会丢内容，漏去重会增加记忆化和评测污染。

**与 CPU MinHash 和 NeMo Curator 的区别：端到端瓶颈不同。** CPU baseline 的瓶颈主要是签名生成；早期 GPU baseline 虽然加速了部分 kernel，但物理 shuffle 和小 bucket 使 GPU 利用率低。SEDD/FED 的设计把 hash、bucket、candidate verification 和通信方式一起改，因而端到端收益高于单个 CUDA kernel 的局部优化。

> ⚠️ 注意：该类框架仍是 MinHash LSH 去重，不会发现语义等价但 n-gram 不相似的文档；它优化的是网页级近重复去重的工程吞吐。

#### 🧪 练习题

```yaml
question: "FED/SEDD 加速 MinHash 去重的主要瓶颈改造是什么？"
options:
  - "把所有文档翻译成英文"
  - "用 GPU 并行 MinHash/候选验证，并用流式分桶降低通信开销"
  - "只做 MD5 精确去重"
  - "训练一个语言模型判断重复"
answer: 1
explain: "框架保留 MinHash LSH 逻辑，但把签名生成、分桶和候选验证做成 GPU 友好流水线。"
```
