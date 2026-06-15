### FLARE：前瞻性主动检索

```yaml
id: flare
name: FLARE
full_name: 前瞻性主动检索 (Forward-Looking Active Retrieval)
year: '2023.05'
org: CMU
paper_url: https://arxiv.org/abs/2305.06983
category: architecture
parent: rag
motivation: 低置信度Token触发检索，主动式知识增强
```

#### 📝 一句话总结

FLARE 提出 Forward-Looking Active Retrieval：先临时生成下一句，再用低置信度 token 判断是否检索，并把前瞻句改写成查询来重新生成，解决长文本生成中固定检索过度或单次检索不足的问题。

#### 🎯 核心要点

- **主动检索框架**：把 RAG 从“输入前检索一次”扩展为生成过程中的动态检索。
- **低置信触发**：当临时句中存在概率低于阈值 \(\theta\) 的 token 时触发检索。
- **前瞻式查询**：用即将生成的下一句，而不是已生成历史，表达当前知识缺口。
- **两种查询策略**：FLARE_direct 掩码低置信 token 后直接检索，FLARE_instruct 让 LM 生成显式搜索查询。
- **免训练部署**：只需要语言模型 logprobs 和外部检索器，不要求额外训练检索策略。
- **评测任务**：在 2WikiMQA、StrategyQA、ASQA、WikiAsp 等长文本知识密集任务上验证效果。

#### 🔬 深入细节

![FLARE 工作流程](https://ar5iv.labs.arxiv.org/html/2305.06983/assets/x2.png)

*图源：ar5iv 论文图 2，展示 FLARE 先预测下一句、检测低置信 token、检索并重新生成的循环。*

```python
def flare_generate(question, lm, retriever, theta=0.5, top_k=5):
    answer = ""
    evidence = []
    while not lm.finished(answer):
        draft, token_probs = lm.generate_next_sentence(question, answer, evidence)

        if min(token_probs) < theta:
            query = mask_low_confidence_tokens(draft, token_probs, theta)
            docs = retriever.search(query, top_k=top_k)
            evidence.extend(docs)
            sentence = lm.regenerate_sentence(question, answer, evidence)
        else:
            sentence = draft

        answer += sentence
    return answer
```

FLARE 的动机来自长文本生成的动态信息需求。传统 RAG 往往在用户问题到来时检索一次，这适合答案集中在少数段落的场景；但长答案会逐句展开，模型在后续句子中才暴露新的实体、时间或事件需求。固定每句检索虽然能覆盖这些需求，却会把无关文档频繁塞进上下文，增加成本并放大噪声。

核心机制是把模型自身的 token 概率当作不确定性信号。给定临时下一句 \(\hat{s}_t=[w_1,\dots,w_n]\)，FLARE 用如下条件判断是否检索：

$$
\operatorname{Retrieve}(\hat{s}_t)=\mathbb{1}\left[\exists i,\ p(w_i\mid x,y_{<t}) < \theta\right].
$$

这里的直觉很直接：如果模型对下一句中的某些 token 信心不足，说明它可能正在凭参数记忆猜测事实；此时用外部证据重新约束生成，比等错误写进答案后再补救更有效。

查询构造体现了“forward-looking”的关键差异。回顾式检索使用已经生成的文本，容易检索到上一段话的主题；FLARE 使用临时下一句表达即将写出的内容，更贴近当前缺口。FLARE_direct 会删除或掩码低置信 token，避免错误 token 污染检索；FLARE_instruct 则让 LM 根据问题和生成历史写出搜索查询，适合复杂推理任务。

推理流程是句级闭环：生成草稿、检查置信度、必要时检索、基于证据重写这一句，然后进入下一句。它与 Self-RAG 的区别是 FLARE 不训练反射 token，而是使用现成模型的 logprob；代价是它依赖可访问 token 概率的模型接口，并且阈值 \(\theta\) 需要按任务调节。

#### 🧪 练习题

```yaml
question: "FLARE 为什么用临时生成的下一句作为检索查询？"
options:
  - "因为下一句通常比用户问题更短，能减少检索器参数量"
  - "因为下一句直接暴露即将生成内容的知识缺口，更能匹配当前检索需求"
  - "因为下一句可以替代语言模型的最终答案"
  - "因为下一句一定包含所有证据引用"
answer: 1
explain: "FLARE 的前瞻式查询利用草稿句预测未来内容，在低置信位置触发检索，从而在错误写入答案前补充证据。"
```
