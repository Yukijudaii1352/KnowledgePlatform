### FELM：细粒度事实错误评测 (Factuality Evaluation of LLMs)

```yaml
id: felm
name: FELM
full_name: 细粒度事实错误评测 (Factuality Evaluation of LLMs)
year: "2023"
org: Microsoft Research
paper_url: https://arxiv.org/abs/2310.00741
category: alignment
parent: halueval
motivation: 跨科学法律金融的细粒度事实检测
```

#### 📝 一句话总结
FELM 提出了一个面向 LLM 长文本输出的细粒度事实性评测基准，用 segment 级标注、错误类型和参考链接解决传统事实性评测只看整体答案、只覆盖世界知识的问题。它不是训练一个新的事实检测器，而是给事实检测器本身提供跨领域、可定位、可解释的元评测标准。

#### 🎯 核心要点
- 覆盖 5 类事实性场景：World Knowledge、Science and Technology、Writing/Recommendation、Reasoning、Math
- 数据粒度采用 segment 而非整段 response：每个回答被切分为可直接高亮的文本片段
- 标注内容不仅包含正确/错误标签，还包含错误类型、错误原因和支持或反驳该片段的 reference links
- 数据构造流程为 Prompt Collection → ChatGPT Response Generation → Response Segmentation → Human Annotation/Verification
- 错误类型包括 knowledge error、reasoning error、irrelevant error、fooled error，用于区分知识幻觉、推理链错误、答非所问和被问题前提误导
- 评测对象包括 vanilla LLM judge、CoT judge、retrieval-link judge、retrieval-doc judge，以及 segment-based 与 claim-based 两种输出格式
- 指标同时看 segment-level 与 response-level，避免只判断“整段是否有错”而无法定位具体错误

#### 🔬 深入细节

![FELM 事实性评测示意图](https://hkust-nlp.github.io/felm/static/images/felm_examples.png)
*图：FELM 的目标输出形式是直接在 LLM 回答中标出错误 span，并给出解释与参考来源。*

FELM 的核心动机是：LLM 事实错误不再只发生在 Wikipedia 风格的实体问答中，也会出现在科学论文引用、数学计算、推荐理由、推理步骤和开放写作里。传统 factuality benchmark 常把任务简化为“给定 claim 和证据，判断 entailment”，或者只在 summarization / QA 中判断整段回答是否可信。FELM 把问题重新定义为面向用户的“错误定位”：用户真正需要知道的是哪个片段错、为什么错、有什么来源能证明它错，而不是只得到一个 response-level 的二分类标签。

FELM 因此选择 segment 作为基本单位。一个回答先被拆成若干语义自洽的文本片段，片段拼接后必须还原原始回答；标注者再对每个片段给出 factual / non-factual 标签。segment 比 response 更可解释，因为它能直接映射回用户看到的文本；segment 又比 atomic claim 更贴近产品形态，因为 claim extraction 虽有利于自动判断，但抽出的原子事实常不能直接高亮原文。论文实验也指出 claim-based evaluator 往往更强，因此合理的检测器可以“内部抽 claim，外部映射回 segment”。

数据构造上，FELM 从 TruthfulQA、MMLU、GSM8K、MATH、Quora、在线错误案例、ChatGPT 自生成问题和作者手写问题中收集 prompts，再用 ChatGPT 在 zero-shot 设置下生成回答。随后对回答做 segment 切分，并由人工标注每个 segment 的事实性、错误类型、错误解释和参考链接。论文表格统计的规模为 847 个样本、4,425 个 segment，整体错误率约三分之一；这种规模不追求海量，而强调跨场景覆盖和标注密度。

FELM 的评测可抽象为 segment 集合上的二分类问题。给定问题 \(q\)、LLM 回答 \(r\)，切分器得到 \(S=\{s_1,\dots,s_n\}\)，人工标签为 \(y_i\in\{0,1\}\)，其中 \(1\) 表示该 segment 含事实错误。事实检测器 \(E\) 输出 \(\hat{y}_i=E(q,s_i,\mathcal{R})\)，\(\mathcal{R}\) 可以为空、reference links 或检索文档。segment-level F1 衡量错误片段定位能力：

$$
P=\frac{TP}{TP+FP},\quad R=\frac{TP}{TP+FN},\quad F1=\frac{2PR}{P+R}
$$

response-level 标签则由 segment 聚合得到：

$$
Y = \mathbb{1}\left[\sum_i y_i > 0\right],\qquad \hat{Y}=\mathbb{1}\left[\sum_i \hat{y}_i > 0\right]
$$

这组设计的关键是把“发现事实错误”和“定位事实错误”拆开。一个检测器可能 response-level 很强，只要知道整段有问题即可；但如果它不能指出哪个 segment 有错，在真实应用中仍难以帮助用户修正回答。FELM 用 segment-level F1/precision/recall 约束这种定位能力，同时用 response-level 指标保留传统风险告警能力。

```python
# FELM 数据构造与评测伪代码
for domain in ["world_knowledge", "science_tech", "writing_recommendation", "reasoning", "math"]:
    prompts = collect_prompts(domain, sources=["benchmarks", "online", "ChatGPT", "manual"])
    for q in prompts:
        response = chatgpt_generate(q, setting="zero-shot")
        segments = split_into_semantic_segments(response)
        for s in segments:
            label, error_type, reason, refs = human_annotate(q, s)
            save(q, response, s, label, error_type, reason, refs)

# evaluator 可以是 vanilla LLM、CoT LLM、retrieval-link/doc LLM 或 claim-based pipeline
for sample in FELM:
    pred_error_segments = evaluator(sample.question, sample.segments, sample.references)
    score_segment_level(pred_error_segments, sample.gold_error_segments)
    score_response_level(any(pred_error_segments), any(sample.gold_error_segments))
```

FELM 的实验设置也体现了它的“评测事实检测器”定位。论文比较了 Vicuna-33B、ChatGPT、GPT-4 等 LLM judge，并测试了四类增强：直接判断、加入 chain-of-thought、只给 reference links、给检索文档内容。结论很明确：检索增强通常能提升事实判断，CoT 不一定稳定有益，而当前 LLM 即使很强也远未达到可靠检测所有事实错误的水平。尤其在数学和推理场景中，错误可能来自中间步骤而非外部知识，reference retrieval 的帮助有限。

> 💡 关键：FELM 的贡献不是“更大的幻觉数据集”，而是把事实评测输出规范化为可定位、可解释、可引用的细粒度结构。它要求检测器不仅说“有错”，还要说明“哪一段错、错在哪里、依据是什么”。

#### 🧪 练习题
```yaml
question: "FELM 为什么优先采用 segment-level 标注，而不是只做 response-level 标注？"
options:
  - "因为 segment-level 可以直接定位并高亮具体事实错误"
  - "因为 segment-level 可以完全避免人工标注"
  - "因为 segment-level 不需要参考链接"
  - "因为 segment-level 只适用于数学题"
answer: 0
explain: "FELM 的目标是构建可解释的事实性评测，segment-level 能把错误映射回原文片段，比 response-level 的整体二分类更适合用户理解和修正。"
```
