### Suffix Array去重

```yaml
id: suffix_array_dedup
name: Suffix Array去重
full_name: 后缀数组去重 (Suffix Array Deduplication)
year: '2022'
org: Google
paper_url: https://aclanthology.org/2022.acl-long.577/
category: data
parent: minhash_dedup
motivation: 后缀数组子串去重防重复生成
```

#### 📝 一句话总结

Suffix Array 去重通过在整个语料的 token 序列上构造后缀数组，线性扫描相邻后缀来发现长的逐字重复子串。ACL 2022 去重论文将其实现为 ExactSubstr，用于删除跨文档重复的 50-token 以上片段，从而减少模型逐字记忆训练数据。

#### 🎯 核心要点

- ExactSubstr 关注“长子串完全一致”，不同于 MinHash 的整篇文档近似相似
- 将语料按 BPE token 字节串表示，构造后缀数组 \(\mathcal{A}(\mathcal{S})\)
- 若两个文档共享足够长的子串，这两个子串对应的后缀会在排序后的后缀数组中相邻
- 论文选择 50 个 BPE token 作为最小重复子串阈值
- 对重复子串只从其中一个文档中删除，尽量保留非重复内容
- C4 上 ExactSubstr 删除了大量重复内容，例如约 7.18% token
- 训练在 ExactSubstr 去重数据上的模型，逐字复制训练文本的无提示生成比例显著降低

#### 🔬 深入细节

![ExactSubstr 阈值分析图](https://ar5iv.labs.arxiv.org/html/2107.06499/assets/x5.png)
*图：论文附录 Figure 5，分析不同长度 \(k\) 的子串重复概率，用于选择 50 BPE token 的阈值。*

```python
# Suffix Array 精确子串去重伪代码
def suffix_array_exact_dedup(documents, min_match_tokens=50):
    # 1. 拼接所有文档，并记录每个 token 属于哪个文档
    S, doc_of_pos = concatenate_bpe_tokens_with_boundaries(documents)

    # 2. 构造后缀数组：A 是所有后缀起点按字典序排序后的列表
    A = build_suffix_array(S)

    spans_to_remove = []
    # 3. 相邻后缀若有长公共前缀，则对应重复子串
    for p, q in adjacent_pairs(A):
        if doc_of_pos[p] == doc_of_pos[q]:
            continue
        lcp = longest_common_prefix_length(S, p, q)
        if lcp >= min_match_tokens:
            loser = choose_span_to_delete(doc_of_pos[p], doc_of_pos[q])
            spans_to_remove.append((loser, min_match_tokens, lcp))

    return remove_marked_spans(documents, spans_to_remove)
```

**动机与背景：有些危险重复不是整篇文档重复，而是长段落复制。** 网页、书籍、代码和论坛数据中经常出现长段相同文本嵌在不同文档中，例如版权声明、转载段落、章节摘录、模板说明。MinHash 文档级去重可能不会删除这种情况，因为两篇文档整体相似度不一定高；但语言模型仍会学习到这些逐字重复片段，并在生成时复制训练数据。

**核心机制：后缀数组把长公共子串搜索变成邻接扫描。** 对一个总 token 序列 \(\mathcal{S}\)，后缀数组是所有后缀的字典序排列：

$$
\mathcal{A}(\mathcal{S})=\operatorname{argsort}(\text{all_suffixes}(\mathcal{S}))
$$

如果位置 \(i\) 和 \(j\) 开始的两个后缀共享长公共前缀，那么它们在后缀数组中会排得很近，通常可通过相邻或局部相邻扫描找到。这样避免了枚举所有文档对和所有子串的二次方复杂度。论文指出后缀数组比后缀树更省内存，尽管仍有较高空间开销。

**流程解释：ExactSubstr 删除重复片段而不是整篇文档。** 论文选择 \(k=50\) BPE token 作为重复阈值：短重复很常见，可能只是常用短语；50 token 以上逐字相同更可能代表训练污染或记忆风险。一旦发现两个不同文档共享长度至少 50 的子串，就从其中一个样本中删除该片段。这样可以保留文档中仍然有价值的非重复上下文，尤其适合长文档。

**与 MinHash 的互补：一个管段落，一个管页面。** ExactSubstr 对完全一致的长片段非常敏感，但无法发现加了少量字段、改了几个词的近重复页面；MinHash 正好相反，能处理文档级近重复但通常会删除整篇文档。论文在 C4、Wiki-40B、LM1B、RealNews 等数据上比较后发现，两种方法都能减少记忆化；C4 中 NearDup 删除的训练样本里，许多也含有 ExactSubstr 能检测到的 50-token verbatim match。

> 💡 关键：Suffix Array 去重的目标不是“文档相似”，而是“任何跨文档长子串完全相同”；这直接对应语言模型逐字背诵的风险。

#### 🧪 练习题

```yaml
question: "ExactSubstr 为什么使用后缀数组？"
options:
  - "为了近似估计文档 Jaccard 相似度"
  - "为了让长公共子串出现在排序后相邻后缀附近，从而高效扫描"
  - "为了训练数据质量分类器"
  - "为了把所有文档翻译成英文"
answer: 1
explain: "后缀数组将所有后缀按字典序排序，拥有长公共前缀的后缀会相邻或接近，因此可高效发现长重复子串。"
```
