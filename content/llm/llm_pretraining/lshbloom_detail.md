### LSHBloom去重 (LSHBloom Deduplication)

```yaml
id: lshbloom
name: LSHBloom
full_name: LSHBloom去重 (LSHBloom Deduplication)
year: "2026"
org: 学术界
paper_url: https://arxiv.org/abs/2501.02404
category: data
parent: fed_dedup
motivation: Bloom Filter节省18倍空间
```

> 注：任务元信息中的 `paper_url` 指向无关 arXiv 页面；本节方法解读依据 LSHBloom 的真实论文 `https://arxiv.org/abs/2411.04257`，但 YAML 保持任务清单原样。

#### 📝 一句话总结

LSHBloom 用一组 Bloom filters 替代传统 MinHashLSH 的树或哈希表索引，解决互联网规模文本近重复去重时索引过大、插入查询过慢的问题。它保留 MinHashLSH 基于 Jaccard 相似度的近重复判定框架，同时把额外误差限制为可解析控制的 Bloom false positive 开销。

#### 🎯 核心要点

- 目标场景：面向 LLM 预训练、RAG、全文搜索等持续数据摄入流程中的大规模文本近重复去重。
- 基线问题：传统 MinHashLSH 需要存储每个 band 的签名索引，规模上升后磁盘、内存和随机访问成为瓶颈。
- 核心结构：为 MinHash signature matrix 的每个 band 建一个 Bloom filter，而不是保存完整 band 签名到 prefix tree/hashmap。
- 插入方式：文档先计算 MinHash 签名，再按 \(b\) 个 bands、每 band \(r\) 行分组，最后把每个 band 压缩成一个整数写入对应 Bloom filter。
- 查询方式：新文档只要在任一 band 的 Bloom filter 中命中，就被判为候选重复或重复。
- 误差控制：Bloom filter 不产生 false negative，只增加可设定的 false positive overhead \(p_{\text{effective}}=1-(1-p)^b\)。
- 空间收益：在 peS2o 全量实验中，LSHBloom 约 11GB 磁盘，MinHashLSH 超过 200GB，约 18 倍节省。
- 扩展估计：处理 5B 文档时，MinHashLSH 估计需要约 277TB 索引，而保守 Bloom FP 设置下 LSHBloom 约 15.5TB。
- 工程优化：用 Rust/128-bit arithmetic 优化 band 向量哈希，替换 Python 大整数逻辑，端到端墙钟时间提升约 11 倍。

#### 🔬 深入细节

![LSHBloom 运行时间分解](https://arxiv.org/html/2411.04257v3/figs/scaling2/breakdown_time.jpg)
*图：LSHBloom 与其他去重方法在 peS2o 扩展实验中的时间分解。论文指出 MinHashing 是主要时间来源，而 Bloom filter 索引显著降低插入/查询索引的成本。*

```python
# LSHBloom 近重复去重伪代码
class LSHBloomIndex:
    def __init__(self, num_bands, rows_per_band, bloom_fpr):
        self.b = num_bands
        self.r = rows_per_band
        self.filters = [BloomFilter(false_positive_rate=bloom_fpr) for _ in range(num_bands)]

    def band_hash(self, band_values, modulus):
        # 论文使用通用哈希思想：把 r 个 MinHash 值压缩成一个整数
        return sum(hash_i(x) for hash_i, x in zip(universal_hashes, band_values)) % modulus

    def query(self, document):
        sig = minhash(document)              # length ~= b * r
        for j in range(self.b):
            band = sig[j * self.r : (j + 1) * self.r]
            key = self.band_hash(band, N)
            if key in self.filters[j]:       # 任一 band 命中即视作重复
                return True
        return False

    def insert_if_new(self, document):
        if self.query(document):
            return "duplicate"
        sig = minhash(document)
        for j in range(self.b):
            band = sig[j * self.r : (j + 1) * self.r]
            key = self.band_hash(band, N)
            self.filters[j].add(key)
        return "inserted"
```

传统 MinHashLSH 的基本思想是避免 \(O(n^2)\) 文档两两比较。先把文档表示为 n-gram 集合，两个文档的相似度用 Jaccard：

$$
J(A,B)=\frac{|A\cap B|}{|A\cup B|}
$$

MinHash 的性质是 \(\Pr[h_{\min}(A)=h_{\min}(B)] = J(A,B)\)，因此多个随机排列产生的签名可以近似估计 Jaccard。LSH 再把签名矩阵切成 \(b\) 个 band，每个 band 有 \(r\) 行；如果两个文档在任一 band 完全相同，就把它们作为相似候选。给定真实相似度 \(t\)，至少一个 band 命中的概率是：

$$
P_{\mathrm{candidate}}(t)=1-(1-t^r)^b
$$

这会形成一个 S 型曲线，\(b,r\) 控制阈值 \(T\) 附近的 false positive / false negative trade-off。

MinHashLSH 的瓶颈不在 MinHash 数学本身，而在索引。传统实现需要把每个 band 的签名作为 key 存入 prefix tree 或 hashmap，并维护 key 到文档 ID 的映射。随着文档数、MinHash 位宽和 permutations 增加，索引线性膨胀，而且随机访问和 pointer chasing 会拖慢吞吐。论文给出的典型例子是 peS2o 仅 39M 学术文档，MinHashLSH 就需要超过 200GB 磁盘；扩展到数十亿文档时，索引会进入 TB 甚至 PB 级难以操作。

LSHBloom 的关键替换是：不再保存“谁和谁匹配”的完整倒排索引，而只回答“这个 band 值之前是否出现过”。每个 band 对应一个 Bloom filter，插入文档时把该 band 的 \(r\) 个 MinHash 值压缩成一个整数。论文使用通用哈希式的向量哈希：

$$
h(\bar{x})=\left(\sum_{i=1}^{r} h_i(x_i)\right)\bmod N
$$

这里 \(\bar{x}\) 是某个 band 的 \(r\) 个签名值，\(N\) 是哈希值空间大小。然后把 \(h(\bar{x})\) 写入对应 Bloom filter。查询时重复同样过程，只要任一 Bloom filter 报告“可能存在”，就判为重复。这使索引变成连续 bit arrays，空间由预计文档数和目标 false positive rate 决定，而不再随原始 band key 的存储开销线性爆炸。

> 💡 关键：LSHBloom 牺牲的是“返回所有匹配文档 ID”的能力，换来“在线判断是否重复”的极低空间索引。对预训练数据摄入来说，常见需求正是保留或丢弃当前文档，而不是枚举所有重复对。

误差分析说明了为什么 Bloom 替换是可控的。若每个 Bloom filter 的 false positive rate 是 \(p\)，共有 \(b\) 个 bands，则任一 filter 误报的有效概率为：

$$
p_{\text{effective}}=1-(1-p)^b
$$

如果用户想指定整体额外误报率 \(p_{\text{effective}}\)，可以反推单个 Bloom filter 的 \(p\)：

$$
p=1-(1-p_{\text{effective}})^{1/b}
$$

Bloom filter 不会 false negative，因此 LSHBloom 的 false negative 主要来自 MinHashLSH 本身；Bloom 的额外 false positive 还会把一小部分原本的 LSH false negatives 变为 positives。论文给出的整体 false positive 近似为：

$$
FP_{\mathrm{bloom}}=FP_{\mathrm{lsh}}+(1-FP_{\mathrm{lsh}})(p_{\mathrm{effective}}+b/N)
$$

false negative 则为：

$$
FN_{\mathrm{bloom}}=(1-(p_{\mathrm{effective}}+b/N))FN_{\mathrm{lsh}}
$$

其中 \(b/N\) 是把 band 向量压缩成整数时的哈希碰撞项。由于 \(p_{\text{effective}}\) 可以通过分配更多 bit 降到很小，LSHBloom 的额外误差在实际设置中可以近似忽略。

Bloom filter 的空间公式解释了 18 倍节省的来源。若预计插入 \(n\) 个元素，单个 Bloom filter 目标 false positive rate 为 \(p\)，最优 bit 数为：

$$
m=-\frac{n\log p}{(\log 2)^2}\ \text{bits}
$$

LSHBloom 需要 \(b\) 个这样的 filters，但其大小只依赖 \(n,b,p\)，不依赖 MinHash hashvalue 是 32-bit、64-bit 还是 128-bit。相反，传统 MinHashLSH 需要存储签名 key，hashvalue 位宽和 permutations 增加都会线性推高索引。论文举例：\(T=0.8\)、128 permutations、9 bands、10B 文档、\(p_{\text{effective}}=10^{-10}\) 时，LSHBloom 约 590GB，而传统 MinHashLSH 约 46TB，近 80 倍差距。

工程部分同样重要。论文 profiling 发现原始 LSHBloom 中，对 band 整数向量做哈希占插入/查询时间超过 90%，原因是 Python extended-precision integer 表示低效。由于 64-bit MinHash 值累加最多需要约 71-bit 无符号精度，作者改用 Rust 和 128-bit arithmetic，实现无溢出的向量化累加，并用硬件 `adc`/carry 机制降低成本。这个函数比 Python 版本快 94% 以上，带来约 11 倍端到端墙钟提升。最终系统还利用 `/dev/shm` 的 node-local shared memory 放置 Bloom filters，减少网络文件系统 I/O。

与 DOLMA/CCNet 这类段落级 exact-ish Bloom 去重相比，LSHBloom 仍保留 MinHashLSH 对近重复的敏感性；与传统 MinHashLSH 相比，它不再保存重复对映射，因而更适合在线摄入。这个取舍非常贴合 LLM 数据管线：如果目标是“当前文档是否应被丢弃”，Bloom membership 足够；如果目标是构建完整重复簇、做可解释数据溯源，则可能仍需要传统索引或后处理来恢复文档对。

#### 🧪 练习题

```yaml
question: "LSHBloom 为什么能比传统 MinHashLSH 显著节省索引空间？"
options:
  - "它完全不计算 MinHash，直接按字符串精确匹配"
  - "它用每个 band 一个 Bloom filter 的近似 membership 结构替代树或哈希表索引"
  - "它降低 Jaccard 阈值，因此保留更少文档"
  - "它只处理短文档，跳过长文档"
answer: 1
explain: "LSHBloom 仍使用 MinHashLSH 的 banding 逻辑，但把 band key 是否出现过存入 Bloom filters，不再存储完整 key 到文档 ID 的索引。"
```
