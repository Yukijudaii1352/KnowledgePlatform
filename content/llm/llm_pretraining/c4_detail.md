### C4

```yaml
id: c4
name: C4
full_name: C4数据集 (Colossal Clean Crawled Corpus)
year: '2020'
org: Google
paper_url: https://arxiv.org/abs/1910.10683
category: data
parent: —
motivation: T5基石数据集启发式规则清洗
```

#### 📝 一句话总结

C4 是 T5 论文提出的英文网页预训练语料，通过一组简单可复现的启发式规则从 Common Crawl 中抽取较干净的自然语言文本。它证明了大规模网页数据只要经过语言过滤、行级清洗和去重，就能成为通用 text-to-text 预训练的核心数据底座。

#### 🎯 核心要点

- 来源于 Common Crawl 的 Web Extracted Text，目标是构建数百 GB 级英文无标注预训练语料
- 只保留被 `langdetect` 判为英文且概率至少 0.99 的页面
- 行级过滤：保留以终止标点结尾的行，并要求行至少包含 5 个词
- 页面级过滤：丢弃少于 3 个句子的页面，移除低质量、非自然语言和敏感词相关内容
- 去重策略：丢弃重复出现的三句 span，只保留其中一个副本
- 最终得到约 750GB 的 clean English web text，并随 TensorFlow Datasets 发布
- 成为 T5、后续网页语料清洗规则和 Dolma/FineWeb 等数据 pipeline 的重要参照

#### 🔬 深入细节

![T5 与 C4 所在的 text-to-text 框架](https://ar5iv.labs.arxiv.org/html/1910.10683/assets/x1.png)
*图：T5 论文 Figure 1，C4 是支撑统一 text-to-text 预训练实验的主要无标注语料来源。*

```python
# C4 启发式清洗 pipeline 伪代码
def build_c4(common_crawl_wet_files):
    documents = []
    for page in stream_wet_text(common_crawl_wet_files):
        if langdetect(page.text).language != "en":
            continue
        if langdetect(page.text).probability < 0.99:
            continue

        lines = []
        for line in page.text.splitlines():
            line = normalize_whitespace(line)
            if word_count(line) < 5:
                continue
            if not ends_with_terminal_punctuation(line):
                continue
            if contains_badword_or_boilerplate(line):
                continue
            lines.append(line)

        if sentence_count(lines) < 3:
            continue
        documents.append("\n".join(lines))

    documents = remove_duplicate_three_sentence_spans(documents)
    return documents
```

**动机与背景：T5 需要一个足够大、足够通用、又可复现的英文网页语料。** 2019 年前后的预训练数据常来自 Wikipedia、BookCorpus、WebText 或未经充分公开的网页抓取。T5 论文希望系统比较预训练目标、架构、数据源和迁移方式，因此需要一个统一的大规模无标注数据集。Common Crawl 每月提供大量网页文本，但原始 WET 包含菜单、脚本残留、短碎片、非英语页面和重复模板，不能直接作为高质量语言模型语料。

**核心机制：简单规则优先，避免复杂模型过滤。** C4 的设计是把 Common Crawl 变成“看起来像自然英文段落”的文本集合。它先用语言识别筛出英文页面，再做行级过滤：短行、没有句末标点的行、明显非自然语言片段都会被移除。页面层面则要求至少包含 3 个句子，避免把导航栏、广告块、错误页当作文档。最后通过三句 span 去重减少复制模板和镜像页面。

**流程解释：C4 是网页清洗范式的起点。** C4 的清洗并不复杂，但它影响了后续几乎所有开放网页语料构建：先抽取文本、再语言过滤、再质量规则、最后去重。相比训练一个“高质量文本分类器”，C4 的优势是规则透明、工程成本低、容易复现；缺点是规则粗糙，可能错误删除非标准写作、低资源方言、列表式知识或合法但不符合标点模式的文本。

**与后续数据集的区别：规模足够大，但质量目标相对早期。** The Pile 强调多源多领域，RefinedWeb/FineWeb 强调更严格的大规模网页过滤和 MinHash 去重，Dolma 强调全流程透明和消融。C4 更像第一代大规模干净网页语料的基线：它把网页语料从“可用”推进到“可训练”，但没有解决更细粒度的来源透明、版权、毒性、近重复和跨语言覆盖问题。

> 💡 关键：C4 的价值不在于规则最优，而在于它把 Common Crawl 清洗成了可公开复现、可大规模训练的标准数据基线。

#### 🧪 练习题

```yaml
question: "C4 去重的核心单位是什么？"
options:
  - "重复出现的三句 span"
  - "完全相同的 URL"
  - "语义相似的整篇文档 embedding"
  - "同一域名下的所有网页"
answer: 0
explain: "T5 论文描述 C4 会丢弃重复出现的三句片段，只保留一个副本，从而降低网页模板和重复内容。"
```
