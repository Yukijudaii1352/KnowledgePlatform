### PROBE: 面向幻觉检测的过程化基准

```yaml
id: probe
name: PROBE
full_name: 过程化基准 (PROcess-Based BEnchmark)
year: '2026.01'
org: EACL
paper_url: https://openreview.net/forum?id=GleVekx5ut
category: hallucination
parent: selfcheckgpt
motivation: 过程化分解幻觉检测步骤
```

#### 📝 一句话总结

PROBE 将幻觉检测从“最终答案是否正确”拆成声明抽取、证据查找、证据蕴含和聚合判定等过程步骤，用过程级标签诊断模型到底在哪里出错。

#### 🎯 核心要点

- **问题定位**：终局标签只能告诉我们回答是否幻觉，却难以解释错误来自抽取、检索、推理还是聚合。
- **过程化评测**：把回答拆成 atomic claims，并对每个 claim 的证据支持关系做标注或自动判定。
- **继承关系**：相较 SelfCheckGPT 的自一致性信号，PROBE 更强调可检查的中间过程和分步骤错误归因。
- **输出价值**：既可评估完整 hallucination detector，也可单独评估 claim splitter、retriever、NLI judge 等模块。
- **适用场景**：长答案问答、RAG 系统、摘要事实性检查和需要可解释审计的知识密集型任务。

#### 🔬 深入细节

![PROBE 公开论文页面](https://openreview.net/pdf?id=GleVekx5ut)

图源：OpenReview 公开论文 PDF。若 PDF 中包含框架图，可从该页面定位原始图示。

```text
Algorithm: PROBE-style process-based hallucination detection
Input:
  question q
  model answer y
  evidence corpus C
  process labels or evaluators E
Output:
  final hallucination score and per-step diagnosis

1. Decompose y into atomic factual claims c_1..c_n.
2. For each claim c_i:
     retrieve candidate evidence passages e_i from C.
     classify relation r_i in {supported, contradicted, not_enough_info}.
     record confidence and evidence provenance.
3. Aggregate claim-level labels:
     hallucination_score = weighted fraction of contradicted or unsupported claims.
4. Evaluate intermediate steps separately:
     claim segmentation quality,
     retrieval recall,
     entailment accuracy,
     final aggregation accuracy.
5. Return final label and an error trace for model or pipeline debugging.
```

PROBE 的基本动机是：一个幻觉检测系统由多个子问题组成。如果最终判断错了，可能是没有把答案拆成正确的事实单元，可能是证据没找全，也可能是 NLI 判定器误把相关证据当成支持。只给最终 accuracy 会掩盖这些错误来源，导致研究者难以改进系统。

过程化分解使 benchmark 更像调试器。对每个 atomic claim，系统需要给出证据和支持关系；这样就可以分别计算 claim extraction、retrieval 和 verification 的指标。一个检测器即使最终 F1 高，也可能依赖脆弱捷径；PROBE 的分步标签能揭示这种情况。

与 SelfCheckGPT 相比，PROBE 不只看同一模型多次采样之间是否自相矛盾。自一致性适合无外部知识时的弱监督信号，但它无法判断模型一致地编造事实的情况。PROBE 引入证据和过程标签后，更适合知识密集型问答和 RAG 场景。

在工程部署中，PROBE 式评测能指导组件优先级。例如如果错误主要来自 retrieval recall，应该改索引、切分和召回；如果错误主要来自 entailment，应该换 judge 或加入领域规则；如果错误来自 aggregation，则需要更细的 claim 权重和不确定性处理。

#### 🧪 练习题

1. 为什么最终答案级标签不足以调试复杂 hallucination detector？
2. claim decomposition 过粗或过细分别会造成什么评测问题？
3. PROBE 式过程标签如何帮助改进 RAG 系统？
