### Causal-CoT：因果思维链 (Causal CoT)
```yaml
id: causal_cot
name: Causal-CoT
full_name: 因果思维链 (Causal CoT)
year: '2026.01'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html
category: frontier_2026
parent: cot
motivation: 因果分析消除幻觉提升逻辑严密性
```

#### 📝 一句话总结
Causal-CoT 将多跳推理中的中间事实组织成因果结构，通过区分有效依赖、伪相关和知识缺口，减少模型在复杂问答中的跳步与幻觉。

#### 🎯 核心要点
- 面向多跳问答中常见的信息缺失、伪逻辑依赖和幻觉问题
- 在普通 CoT 之外显式构建结构化因果变量与依赖关系
- 将模型内部知识、外部知识和自生成知识放入统一推理图中校验
- 通过置信度动态决定是否引入外部知识或重新推理
- 目标不是生成更长解释，而是让每一步推理有可追踪的因果前提
- 适用于需要跨事实组合、反事实排除和证据约束的问答任务

#### 🔬 深入细节
[论文公开摘要页](https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html)；[NeurIPS 论文 PDF 图源](https://proceedings.neurips.cc/paper_files/paper/2025/file/b7870bd43b2d133a1ed95582ae5d82a4-Paper-Conference.pdf)。

```python
# Causal-CoT / Knowledge-driven Inference 风格伪代码
def causal_cot_answer(question, llm, retriever, confidence_threshold=0.7):
    internal_knowledge = llm.generate_facts(question)
    external_knowledge = retriever.search(question)
    variables = extract_entities_events(question, internal_knowledge, external_knowledge)

    scm = build_structural_causal_model(variables)
    scm = infer_edges_with_llm(scm, question)
    scm = prune_spurious_edges(scm)

    confidence = estimate_reasoning_confidence(scm, internal_knowledge)
    if confidence < confidence_threshold:
        scm = integrate_external_evidence(scm, external_knowledge)

    rationale = llm.generate_causal_chain(question, scm)
    answer = llm.generate_final_answer(question, rationale)
    return answer, rationale, scm
```

普通 CoT 往往把多跳推理写成线性句子，但线性文本很难表达“哪些事实是真正原因，哪些只是相关背景”。Causal-CoT 的思路是先把问题中的实体、事件、属性和证据抽象成变量，再显式判断变量之间的依赖关系。这样模型在生成答案前，需要先回答“这个中间结论由哪些前提导致”。

因果结构可以抑制两类幻觉。第一类是知识缺口导致的补全幻觉：模型不知道某个事实，却沿着流畅语言继续推断。第二类是伪依赖：两个事实在文本中相邻，但并不构成推理所需的因果或逻辑边。通过结构化图和置信度检查，系统可以在低置信路径上检索外部知识或重新生成中间事实。

这类方法通常会把模型自生成知识与检索知识分开处理。自生成知识便宜但可能错；外部知识更可靠但引入噪声和成本。动态置信度机制的作用是避免无差别检索：当内部因果链已经完整且一致时直接回答；当图中存在断边、冲突或低置信结论时再引入外部证据。

与“让 CoT 更长”不同，Causal-CoT 的收益来自结构约束。一个短但因果边清晰的推理链，通常比一段冗长但没有证据关系的解释更可信。它也为后续验证提供接口：可以检查某条边是否有证据、某个反事实是否改变答案、某个中间节点是否被错误知识支撑。

#### 🧪 练习题
```yaml
question: "Causal-CoT 相比普通 CoT 最强调什么？"
options:
  - "把推理链写得尽可能长"
  - "显式建模中间事实之间的因果或逻辑依赖"
  - "完全禁止使用外部知识"
  - "只输出答案不输出解释"
answer: 1
explain: "Causal-CoT 的重点是用因果结构约束多跳推理，减少伪依赖和幻觉。"
```
