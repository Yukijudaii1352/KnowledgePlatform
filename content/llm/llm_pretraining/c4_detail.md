### C4数据集 (Colossal Clean Crawled Corpus)
```yaml
id: c4
name: C4
full_name: C4数据集 (Colossal Clean Crawled Corpus)
year: "2020"
org: Google
paper_url: https://arxiv.org/abs/1910.10683
category: data
parent: —
motivation: T5基石数据集启发式规则清洗
```

#### 📝 一句话总结
C4 从 Common Crawl 的网页抽取文本中通过启发式规则清洗出大规模英文自然文本，解决了早期 NLP 预训练缺少公开、干净、可复现实验语料的问题。它作为 T5 的核心预训练数据集，把“数据清洗策略”提升为影响迁移学习效果的关键算法组件。

#### 🎯 核心要点
- 数据来源是 Common Crawl 的 web extracted text，T5 论文使用 April 2019 dump 构建基础 C4。
- 清洗目标是去掉菜单、样板页、错误消息、脏词、占位文本、源码、重复片段和非英文网页。
- 关键过滤规则包括句末标点、最少句子数、最少词数、坏词列表、Javascript 行、lorem ipsum、花括号代码页、Wikipedia citation markers、隐私/ cookie 模板行。
- 使用 langdetect 只保留英文概率至少 0.99 的页面，贴合 T5 主要英文下游任务设置。
- 使用三句 span 级去重，丢弃重复出现的三句窗口，只保留一个副本。
- 产物约 750GB，显著大于 Wikipedia、Toronto Books Corpus、WebText-like 等对照语料。
- 论文在 T5 框架中比较 C4、Unfiltered C4、RealNews-like、WebText-like、Wikipedia、Wikipedia+TBC 等数据源，证明预训练语料的清洁度、规模和领域覆盖都会影响迁移效果。

#### 🔬 深入细节

![T5 text-to-text 框架图](https://arxiv.org/html/1910.10683/x1.png)
*图：T5 将所有任务统一为 text-to-text 形式，C4 是该框架中用于无监督预训练的核心大规模语料来源。*

C4 不是一个模型结构算法，而是一个数据构建算法。T5 论文的主线是“统一的 text-to-text Transformer + 系统性迁移学习实验”，但 C4 是其中非常关键的一环：如果预训练数据太小，模型很快受限于覆盖度；如果直接使用 Common Crawl，又会被网页模板、导航、广告、错误页、代码和重复内容污染。C4 的贡献在于给出一套可复现的启发式过滤流水线，把每月约 20TB 级别的网页抽取文本变成约 750GB 的相对干净英文语料。

```python
# C4 数据清洗算法伪代码
# 输入：Common Crawl web extracted text pages
# 输出：C4 clean English text corpus

clean_pages = []
seen_three_sentence_spans = set()

for page in common_crawl_april_2019:
    lines = extract_text_lines(page)

    # 页面级过滤
    if langdetect(page).language != "en" or langdetect(page).prob < 0.99:
        continue
    if count_sentences(page) < 3:
        continue
    if contains_bad_word(page):
        continue
    if contains_phrase(page, "lorem ipsum"):
        continue
    if contains_character(page, "{"):
        continue

    kept_lines = []
    for line in lines:
        if word_count(line) < 5:
            continue
        if not ends_with_terminal_punctuation(line):
            continue
        if contains_case_insensitive(line, "javascript"):
            continue
        if contains_policy_boilerplate(line):
            continue
        line = remove_wikipedia_citation_markers(line)
        kept_lines.append(line)

    sentences = split_into_sentences(join_lines(kept_lines))
    deduped = []
    for span in sliding_window(sentences, size=3):
        key = normalize(span)
        if key in seen_three_sentence_spans:
            continue
        seen_three_sentence_spans.add(key)
        deduped.extend(new_sentences_from(span))

    if deduped:
        clean_pages.append(join_sentences(deduped))

return clean_pages
```

C4 的过滤器可以形式化为一个谓词组合。设原始网页集合为 \(\mathcal{W}\)，页面 \(w\) 的语言检测概率为 \(P_{\text{en}}(w)\)，文本行集合为 \(\ell(w)\)，过滤后语料可以写作：

$$
\mathcal{C4}=\operatorname{Dedup}_{3\text{-sent}}\left(\{\ell\in w:\; w\in\mathcal{W},\;P_{\text{en}}(w)\ge 0.99,\;F_{page}(w)=1,\;F_{line}(\ell)=1\}\right).
$$

其中 \(F_{page}\) 覆盖页面级规则，例如至少 3 句、没有坏词、没有 `lorem ipsum`、没有花括号代码痕迹；\(F_{line}\) 覆盖行级规则，例如至少 5 个词、以终止标点结尾、不包含 Javascript 和 policy boilerplate。最后的 \(\operatorname{Dedup}_{3\text{-sent}}\) 表示三句窗口去重，它比简单逐行去重更适合网页语料，因为许多网页模板和转载内容会以短段落形式重复。

C4 的动机来自 Common Crawl 的双重属性：规模巨大但噪声巨大。Common Crawl 的 web extracted text 已经移除了 HTML 标记，但并不等于自然语言语料。网页抽取文本会包含导航菜单、cookie 声明、隐私政策、404 页面、脚本提示、版权页脚、自动生成列表、论坛模板和重复转载。直接拿这些内容训练语言模型，会把 token 预算浪费在非任务相关模式上，并可能让模型学习到不自然的文本分布。C4 的启发式规则看起来朴素，但每条都对应一种高频网页污染源。

句末标点和最少词数规则主要过滤碎片化文本。网页菜单常见的 “Home”、“Contact”、“Read more” 等短行虽然是英文，却不是完整自然句；要求以句号、问号、感叹号或结束引号结尾，可以提高保留行的叙述性。页面至少 3 句则避免把极短页面或抽取失败页面误认为高质量文档。坏词列表和 `lorem ipsum` 规则处理内容安全与占位模板；花括号规则处理网页源码或代码片段；Javascript 与 cookie/policy 字符串规则处理浏览器提示和法律模板；Wikipedia citation marker 清理则减少百科页面抽取残留。

去重是 C4 中特别重要的机制。网页语料的重复不只是整页重复，还包括相同新闻稿、产品说明、版权段落、模板段落在不同站点或同一站点多次出现。三句 span 去重相当于用较长上下文作为指纹，比单句去重更不容易误删常见短句，又能捕捉大段重复内容。对预训练而言，去重降低了模型在重复样本上的过拟合，也让固定 token 预算覆盖更多独立语言现象。

C4 与 T5 的关系还体现在预训练目标上。T5 最终采用 span corruption 式 denoising objective：从 C4 文本中采样连续 span，用 sentinel tokens 替换输入中的被污染片段，并让模型在输出端恢复这些 span。简化损失为：

$$
\mathcal{L}_{\text{denoise}}(\theta)=-\sum_{t=1}^{|y|}\log p_{\theta}(y_t\mid y_{<t},\tilde{x}),
$$

其中 \(\tilde{x}\) 是被 sentinel tokens corruption 后的输入，\(y\) 是按顺序拼接的被遮盖 span。C4 的清洁度直接影响这个目标的有效性：如果输入中大量是菜单、样板和乱码，模型就会把容量用于复原网页噪声；如果输入是相对自然的英文段落，denoising 才更接近学习通用语言知识。

论文在数据集实验中把 C4 与多个替代语料比较。Unfiltered C4 保留了更多 Common Crawl 噪声，规模更大但质量更差；RealNews-like 更像新闻域，规模较小且领域偏窄；WebText-like 借鉴 Reddit upvote 过滤，但从同一时期 Common Crawl 可得到的内容有限；Wikipedia 和 Wikipedia+TBC 较干净但规模和领域覆盖不足。这个对照说明，预训练数据不是“越大越好”的单变量问题，而是规模、清洁度、领域多样性和可复现性之间的折中。

> 💡 关键：C4 的算法价值在于把网页清洗变成可复现实验条件。T5 不是只靠模型架构取胜，C4 让不同预训练目标、架构和迁移策略能在统一的大规模干净语料上被系统比较。

从后续 LLM 发展看，C4 也暴露出启发式清洗的局限：规则简单、英文中心、对质量的定义依赖表面模式，且不能充分处理事实质量、版权、毒性、PII、跨语言覆盖和数据混入 benchmark 等问题。但在 2020 年的背景下，C4 的意义非常明确：它提供了一个公开、足够大、相对干净、可通过 TensorFlow Datasets 使用的预训练基准语料，成为 T5 以及许多后续数据工程研究的参照点。

#### 🧪 练习题
```yaml
question: "C4 构建流程中，三句 span 去重的主要作用是什么？"
options:
  - "把所有英文网页翻译成多语言语料"
  - "删除重复出现的长片段，减少网页模板和转载内容对预训练的污染"
  - "把文本转换成 T5 的 sentinel token 格式"
  - "提高 langdetect 的英文概率阈值"
answer: 1
explain: "C4 使用三句窗口作为较稳定的重复指纹，能去掉模板、转载和重复段落，让固定 token 预算覆盖更多独立自然文本。"
```
