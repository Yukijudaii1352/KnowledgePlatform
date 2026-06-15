### FELM

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

FELM 提出细粒度事实性评测基准，把 LLM 回复切分为语义片段并逐段标注真假、错误类型和参考链接，用来评估事实性检测器能否定位具体错误而非只给整段文本打分。

#### 🎯 核心要点

- 包含 847 个实例、5 个领域和 4,427 个片段级标签
- 覆盖 world knowledge、science/technology、writing/recommendation、reasoning、math 等多样任务
- 每个回复被拆成 segment，标注 factuality label、错误原因、错误类型和支持/反驳链接
- 评估对象是 factuality evaluator，包括普通 LLM、检索增强 LLM 和 CoT 辅助判断
- 论文发现检索能提升事实判断，但现有 LLM 对细粒度错误检测仍远不可靠
- 指标关注 F1 与 Balanced Accuracy，避免只偏向多数“正确片段”

#### 🔬 深入细节

![FELM 各领域样例](https://raw.githubusercontent.com/hkust-nlp/felm/main/image/felm_examples.png)
*图：FELM 官方仓库中的跨领域样例，展示回复片段、标签和参考证据。*

```python
# FELM 事实性检测评测伪代码
for item in felm:
    segments = item.segmented_response
    for seg, gold_label, refs in zip(segments, item.labels, item.ref):
        evidence = retrieve(seg) if evaluator_uses_retrieval else refs
        pred_label = evaluator.judge(
            prompt=item.prompt,
            response_segment=seg,
            context=evidence,
            require_explanation=True,
        )
        update_confusion_matrix(pred_label, gold_label)

f1 = compute_f1(error_class="factual_error")
balanced_acc = compute_balanced_accuracy()
report_by_domain(f1, balanced_acc)
```

##### 动机与背景

幻觉检测常被简化为“整段回答是否有错”的二分类，但真实应用中的错误往往只出现在某个句子、数字、实体或推理步骤上。整段标签会掩盖这种局部性：一个回复可能大部分正确，只在关键数字上错；也可能整体方向错误但含有若干真实陈述。

FELM 的核心改进是 segment-level annotation。标注者先把 ChatGPT 回复拆成可独立核查的语义片段，再判断每个片段是否事实正确，并记录支持或反驳证据。这样评估器必须指出具体哪一段错，不能靠笼统的“这段回答不可信”过关。

##### 核心机制

FELM 的一个数据点包含 prompt、response、segmented_response、labels、comment、type、ref 等字段。标签是片段级的布尔值，错误片段还带有错误类型和解释。评估器输出同样被映射为片段级预测，再计算 F1 和 Balanced Accuracy。

这种设计对应一个细粒度判别函数：

$$\hat{y}_i = f_\theta(q, s_i, e_i)$$

其中 \(q\) 是原始问题，\(s_i\) 是第 \(i\) 个回复片段，\(e_i\) 是参考证据或检索结果。评估器不仅要理解片段，还要判断它是否被证据支持。

##### 检索与 CoT 的作用

FELM 特别比较了 vanilla LLM、retrieval-augmented LLM 和 CoT 设置。检索的作用是给模型外部证据，降低凭记忆判断的错误率；CoT 的作用是让模型显式比较陈述与证据。但如果检索返回噪声文档，或模型不能严格根据证据裁决，检测结果仍会不稳定。

> 💡 关键：FELM 评估的是“事实性评估器”的能力，不是直接评估被生成回复的模型能力。

##### 与 HaluEval 的区别

HaluEval 主要测试模型能否识别样本整体是否幻觉，适合衡量二分类检测能力；FELM 更进一步要求定位到片段级，并给出错误类型与证据链。因此 FELM 更适合开发可解释的事实核查器、检索增强质检器和细粒度模型监控系统。

#### 🧪 练习题

```yaml
question: "FELM 相比整段幻觉检测基准的关键改进是什么？"
options:
  - "只评测数学题"
  - "把回复切分为片段并逐段标注事实性、错误类型和证据"
  - "完全取消人工标注"
  - "只用模型自评作为最终分数"
answer: 1
explain: "FELM 的核心是 segment-level factuality annotation，能定位局部事实错误并评估检测器的细粒度判断能力。"
```
