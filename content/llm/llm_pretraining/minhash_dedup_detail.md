### MinHash LSH：文档级近重复去重
```yaml
id: minhash_dedup
name: MinHash LSH
full_name: MinHash局部敏感哈希去重 (MinHash LSH Deduplication)
year: "2022"
org: 学术界
paper_url: https://aclanthology.org/2022.acl-long.577/
category: data
parent: —
motivation: 局部敏感哈希实现文档级去重
```

#### 📝 一句话总结
MinHash LSH 去重用 n-gram 集合的 Jaccard 相似度近似来发现大规模语料中的近重复文档，解决网页预训练数据里模板化、轻微改写、字段替换导致的“非精确但高度重复”问题。论文中的 NearDup 方法先用 MinHash 快速召回候选文档对，再用编辑相似度和连通分量聚类决定要删除的重复样本。

#### 🎯 核心要点
- 目标是文档级近重复去重：处理“主体相同但城市、日期、URL、商品名等字段略有变化”的网页模板文本。
- 将文档表示为 5-gram 集合，用 Jaccard 相似度衡量两个文档的 n-gram 重叠程度。
- 使用 MinHash 签名近似 Jaccard，相比全量文档两两比较，将候选召回扩展到 C4、RealNews、Wiki-40B、LM1B 等大规模语料。
- 论文实现中使用 5-gram、9000 维签名，并按论文记号设置 \(b=20,r=450\) 控制相似文档发生碰撞的概率曲线。
- 对 MinHash 召回的候选对再计算 edit similarity，只有编辑相似度大于 0.8 才判定为重复。
- 将重复文档对构成图，边表示一对近重复文档，再用连通分量形成重复簇，每簇只保留一个代表文档。
- 发现 C4、RealNews 等网页语料中存在大量近重复；C4 中 3.04% 训练样本被 NearDup 标记为近重复，最大近重复簇可达 250,933 个样本。
- 去重后模型无提示生成中复制训练文本的 token 比例下降约一个数量级，并且在若干验证集上不损害甚至改善困惑度。

#### 🔬 深入细节
![NearDup 在 C4 上发现的近重复簇规模分布](https://ar5iv.labs.arxiv.org/html/2107.06499/assets/x1.png)
*图：NearDup 在 C4 上得到的近重复簇规模分布；绝大多数簇很小，但也存在数千甚至数十万样本的大簇，说明网页模板重复会形成长尾风险。*

```python
# NearDup / MinHash LSH 文档级近重复去重伪代码
for doc_id, text in corpus:
    tokens = bpe_tokenize(text)
    shingles = set(ngrams(tokens, n=5))
    signature[doc_id] = minhash(shingles, signature_size=9000)

candidate_pairs = set()
for bucket in lsh_buckets(signature, b=20, r=450):
    for doc_i, doc_j in all_pairs(bucket):
        candidate_pairs.add((doc_i, doc_j))

graph = UnionFind()
for doc_i, doc_j in candidate_pairs:
    jaccard = exact_jaccard(ngrams(doc_i, 5), ngrams(doc_j, 5))
    if jaccard < 0.8:
        continue
    sim = 1 - edit_distance(tokens(doc_i), tokens(doc_j)) / max(len(doc_i), len(doc_j))
    if sim > 0.8:
        graph.union(doc_i, doc_j)

for cluster in graph.connected_components():
    keep = choose_representative(cluster, prefer_validation_or_test=True)
    remove_all_except(cluster, keep)
```

MinHash LSH 的动机是，精确哈希只能删除完全相同的段落或文档，却无法捕捉网页语料中更常见的“近重复”：广告页、旅游页、商品页、新闻聚合页往往共享大段模板，只替换地点、日期、价格或标题。论文给出的 C4 例子中，两段航班广告文本结构几乎相同，但出发地、目的地和月份不同；如果只做字符串完全匹配，这类重复会留在训练集中，模型会反复看到同一种模板，从而更容易记忆模板化文本并污染验证集。

形式化地，每个文档 \(x_i\) 被转为 n-gram 集合 \(d_i\)。两个文档的真实相似度可用 Jaccard 指数表示：

$$
J(d_i,d_j)=\frac{|d_i\cap d_j|}{|d_i\cup d_j|}
$$

如果对所有文档对都精确计算 \(J\)，复杂度接近 \(O(N^2)\)，在数亿文档规模上不可行。MinHash 的关键性质是：对集合应用随机哈希并取最小哈希值时，两个集合得到相同最小哈希的概率等于它们的 Jaccard 相似度。多个 hash 组成签名后，签名相同/部分相同的概率就能作为 Jaccard 的近似筛选器。

论文的 NearDup 采用 5-gram 与 9000 个 MinHash 值，并给出候选召回概率：

$$
\Pr(d_i,d_j\mid J(d_i,d_j)=s_{ij})=1-(1-s_{ij}^{b})^{r}
$$

其中按论文记号 \(b=20,r=450\)。这个函数的作用是形成一条陡峭的 S 型过滤曲线：当 \(s_{ij}\) 接近 0.8 时，文档对很可能进入候选集；当相似度明显低于阈值时，碰撞概率迅速下降。这样可以用局部敏感哈希把“可能重复”的对召回出来，而不是枚举所有文档对。

召回候选后，NearDup 不直接删除，而是再做精确过滤。论文要求候选对的实际 Jaccard 足够高，并计算 token 序列的编辑相似度：

$$
\operatorname{EditSim}(x_i,x_j)=1-\frac{\operatorname{EditDistance}(x_i,x_j)}{\max(|x_i|,|x_j|)}
$$

只有当 \(\operatorname{EditSim}>0.8\) 时，这对文档才被连边。这个二阶段设计很重要：MinHash 负责高召回、低成本地缩小搜索空间，edit similarity 负责减少误删，避免仅共享大量常见 n-gram 的不同文档被错误合并。

最后，NearDup 把所有判定重复的文档对构成图，图中的连通分量就是近重复簇。删除策略不是按边逐对删除，而是按簇保留一个代表，其余移除；当重复跨越 train/validation/test 时，论文优先保留测试或验证样本，从训练集中移除重叠内容，以降低评测泄漏。这个策略解决了一个常见陷阱：如果 A 近似 B、B 近似 C，即使 A 和 C 未直接比较成重复，它们也应被视为同一模板族。

实验层面，NearDup 在网页数据上的影响很大：论文报告 C4 有 3.04% 训练样本被标记为近重复，RealNews 达到 13.63%，而人工整理程度更高的 Wiki-40B 只有 0.39%。去重不仅减少数据体积，还显著降低模型生成训练集原文的比例；无提示生成中，原始 C4 训练的 XL 模型有超过 1% token 属于 50-token 训练集拷贝片段，而 NearDup/ExactSubstr 去重模型下降到约十分之一量级。

> 💡 关键：MinHash LSH 去重的价值在于“近似召回 + 精确复核 + 簇级删除”，它不是为了找完全相同文档，而是为了在数亿网页文档中高效发现模板化近重复。

#### 🧪 练习题
```yaml
question: "NearDup 为什么在 MinHash 候选召回后还要计算 edit similarity？"
options:
  - "因为 MinHash 只能处理图片，不能处理文本"
  - "为了在高召回候选中进一步过滤，降低共享常见 n-gram 导致的误删"
  - "为了把文档转换成 UTF-8 字节并训练 tokenizer"
  - "为了让所有文档长度完全一致"
answer: 1
explain: "MinHash 用于快速找到可能相似的文档对，但候选中仍可能有假阳性；edit similarity > 0.8 是更严格的复核条件。"
```
