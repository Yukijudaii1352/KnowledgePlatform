### Suffix Array Deduplication：后缀数组子串去重
```yaml
id: suffix_array_dedup
name: Suffix Array去重
full_name: 后缀数组去重 (Suffix Array Deduplication)
year: "2022"
org: Google
paper_url: https://aclanthology.org/2022.acl-long.577/
category: data
parent: minhash_dedup
motivation: 后缀数组子串去重防重复生成
```

#### 📝 一句话总结
Suffix Array Deduplication 使用后缀数组在线性扫描中发现跨文档重复的长精确子串，解决文档整体不相似但局部大段文本被重复复制的问题。论文中的 ExactSubstr 方法选择 50 个 BPE token 作为重复阈值，从训练数据中删除重复片段，从而降低语言模型直接背诵训练文本的概率。

#### 🎯 核心要点
- 目标是子串级精确去重：不是删除整篇近重复文档，而是删除跨样本重复出现的长 verbatim span。
- 将整个语料的 BPE token 字节序列拼接成一个大序列 \(S\)，在 \(S\) 上构建后缀数组 \(A(S)\)。
- 后缀数组按字典序排列所有后缀，因此共享长前缀的重复片段会在数组中相邻出现。
- 线性扫描相邻后缀，计算 longest common prefix（LCP），当公共前缀长度 \(\ge 50\) BPE tokens 且来自不同样本时记录重复 span。
- 选择 50-token 阈值是保守策略：论文观察到 10 token 左右是重复概率曲线拐点，人工检查 25-token 匹配无明显误报，因此翻倍为 50。
- 与 MinHash/NearDup 互补：MinHash 删除近重复整文档，ExactSubstr 删除跨文档共享的精确片段；前者处理模板化改写，后者处理长引用、复制段落和训练/验证泄漏。
- 工程实现采用并行 SA-IS、分块构建、partial suffix array merge 与磁盘流式输出，支持 C4 这类数百 GB 语料。
- 在 C4 上构建 350GB 语料后缀数组耗时约 12 小时，后续去重不到 1 小时；后缀数组约需 8 倍空间，350GB C4 的后缀数组约 1.5TB。

#### 🔬 深入细节
![ExactSubstr 的重复长度阈值分析](https://ar5iv.labs.arxiv.org/html/2107.06499/assets/x6.png)
*图：不同长度 \(k\) 的精确重复子串出现概率；论文观察到 10 token 以下重复很常见，最终选用 50 BPE token 作为保守阈值。*

```python
# ExactSubstr / Suffix Array 子串级去重伪代码
S = []
owner = []  # 每个 token 位置属于哪个文档/数据切分
for doc_id, text in corpus:
    tokens = bpe_tokenize_to_bytes(text)
    S.extend(tokens + [DOC_SEPARATOR])
    owner.extend([doc_id] * (len(tokens) + 1))

A = suffix_array(S)  # A 中每个元素是某个后缀的起始位置，按后缀字典序排列
spans_to_remove = []

for t in range(len(A) - 1):
    i, j = A[t], A[t + 1]
    if owner[i] == owner[j]:
        continue
    lcp = longest_common_prefix_length(S, i, j)
    if lcp >= 50:
        # 重复片段出现在两个不同样本中；优先保留 validation/test 或先出现代表
        loser_span = choose_training_span_to_remove(i, j, lcp, owner)
        spans_to_remove.append(loser_span)

corpus = delete_spans(corpus, spans_to_remove)
```

ExactSubstr 的动机与 NearDup 不同。NearDup 关注“整篇文档是否近似重复”，但很多训练集泄漏和模型记忆并不表现为整篇文档重复：一篇网页可能只复制了一个长免责声明、一段诗、一段新闻模板、一段论坛签名，或者验证集中的一个长句子被嵌入到训练文档里。整篇文档的 Jaccard 可能不高，但那段局部文本足够长，语言模型多次看到后就可能逐字复现。因此 ExactSubstr 直接寻找跨样本共享的长连续 token 片段。

后缀数组提供了规模化解决方案。对总序列 \(S\) 的所有后缀按字典序排序，得到：

$$
A(S)=\operatorname{argsort}(\operatorname{all\_suffixes}(S))
$$

如果一个片段 \(s\) 在位置 \(i\) 和 \(j\) 处重复出现，即：

$$
S_{i:i+k}=S_{j:j+k},\quad k\ge 50
$$

那么从 \(i\) 与 \(j\) 开始的两个后缀会共享至少 \(k\) 个 token 的公共前缀。由于所有后缀按字典序排列，共享长前缀的后缀会聚在一起；因此不需要做所有位置两两比较，只要扫描后缀数组中的相邻元素并计算 LCP，就能找出候选重复片段。

论文将文本先经过 BPE tokenization，再在 token 的字节表示上构造大序列。这样做有两个好处：第一，重复判定与语言模型实际训练 token 更一致，50 个 BPE token 大致对应足够长的可记忆片段；第二，字节序列避免了复杂 Unicode 字符边界问题，也便于后缀数组库处理。后缀数组相比后缀树更节省内存，论文引用的经验是 10-100 倍更省，实际实现仍需要约 8 bytes per input token 的空间开销。

50-token 阈值不是任意设置。论文定义不同长度 \(k\) 的重复概率：

$$
m(k)=\Pr_{i\in[N]}\left[\exists j\ne i: S_{i:i+k}=S_{j:j+k}\right]
$$

图中显示，长度小于 10 的重复很常见，且这些短重复覆盖了大量 token；这类重复多为常用短语、HTML 片段或普通搭配，删除会产生大量误报。论文观察到曲线在约 10 token 附近出现拐点，人工检查 25-token 匹配没有明显 false positive，于是进一步加倍到 50 token，以更保守地只删除几乎可以确定为复制的长片段。

工程上，ExactSubstr 的难点不在理论，而在 C4 这种 350GB 语料无法轻松放入普通内存。论文实现了并行后缀数组构建：先把数据切成多个 split，各自用 SA-IS 构建 partial suffix array，再通过比较跨 split 后缀前缀并用 min-heap/merge sort 合并为全局后缀数组。为了降低内存压力，后缀数组可从磁盘流式处理，不要求整个数组常驻内存；但语料本身仍需支持随机索引，因为计算 LCP 时需要访问任意位置。

与 MinHash LSH 的关系是互补而非替代。MinHash/NearDup 适合删除高度相似的整篇网页模板，但如果两篇文档只有一段 80-token 引文相同，整体 Jaccard 可能不够高；后缀数组会直接命中这段精确重复。反过来，如果两篇网页大体相同但字段交错不同，ExactSubstr 可能只能删除若干片段，而 NearDup 会把整篇文档归为同一簇并删除冗余样本。论文结果也显示，两者删除的内容高度相关但不完全相同，组合使用才能同时降低训练数据浪费、评测泄漏和生成式记忆。

> ⚠️ 注意：Suffix Array 去重只处理“完全相同的长连续片段”。它不会发现轻微改写、同义替换或模板字段变化，这些情况仍需要 MinHash LSH、SimHash 或 embedding-based dedup 等近似方法补充。

#### 🧪 练习题
```yaml
question: "ExactSubstr 为什么选择后缀数组而不是对所有文档片段两两比较？"
options:
  - "后缀数组能按字典序聚集共享长前缀的后缀，使重复子串可通过线性扫描发现"
  - "后缀数组会自动训练一个语言模型来预测重复内容"
  - "后缀数组只能用于删除整篇近重复文档，不能处理子串"
  - "后缀数组要求所有文档长度相同，因此更容易批处理"
answer: 0
explain: "重复子串对应共享长前缀的后缀；后缀数组排序后这些后缀相邻，扫描 LCP 即可避免二次复杂度的全量比较。"
```
