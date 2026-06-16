### SciGLM

```yaml
id: sciglm
name: SciGLM
full_name: 科学GLM (Scientific GLM)
year: '2024'
org: 清华大学/智谱AI
paper_url: https://proceedings.neurips.cc/paper_files/paper/2024/hash/02ee6b7295f720407b56c457b34c54d5-Abstract-Datasets_and_Benchmarks_Track.html
category: science_llm
parent: —
motivation: 自反思指令标注大学水平科学推理
```

#### 📝 一句话总结

SciGLM 通过 SciInstruct 数据集和自反思指令标注流程，把 ChatGLM 系列模型调优为面向大学水平科学推理的语言模型，解决了高质量科学 CoT 指令数据稀缺、普通 LLM 在公式推导和数值计算上不稳的问题。

#### 🎯 核心要点

- **核心产物是模型+数据流程**：SciGLM 是用 SciInstruct 微调得到的科学语言模型，SciInstruct 是其关键训练数据资产
- **自反思指令标注**：先收集无完整推理步骤的科学题，再让 LLM 生成 CoT reasoning，随后通过 critic-and-revise 补充和修正推理过程
- **覆盖大学科学推理**：数据包含物理/化学、数学和 Lean 形式化证明，强调复杂概念理解、符号方程推导和高级数值计算
- **254,051 条验证指令**：论文统计最终数据包括 123,869 条物理与化学、89,934 条数学、40,248 条形式化证明指令
- **质量过滤器**：训练 instruction-quality classifier，对生成推理打分并过滤低质量样本，降低计算错误、理解错误和伪推理进入训练集的概率
- **ChatGLM 系列验证**：主要在 ChatGLM3-6B-Base 和 ChatGLM3-32B-Base 上进行 SFT，也对 Llama3-8B-Instruct、Mistral-7B 等模型验证数据有效性
- **低学习率 SFT**：论文使用 HuggingFace Transformers、DeepSpeed，6B/32B 模型学习率 \(3\times10^{-6}\)，linear scheduler，训练 2 epochs
- **科学任务稳定提升**：在 CEval-Sci、SciEval、SciBench、MMLU-Sci 等科学任务和 MATH/SAT-Math 等数学任务上提升，同时基本不牺牲通用语言理解能力
- **跨学科混合有迁移收益**：leave-one-out 分析显示，物理/化学、数学和形式证明数据对非本学科任务也有贡献，说明模型学到的是通用推理格式而非只记题型

#### 🔬 深入细节

##### 框架总览

![SciInstruct 自反思指令构造流程](https://sciglm.github.io/static/images/SciInstruct.png)
*图：SciGLM 项目页 Figure 2，展示从多学科题库收集、LLM 自反思标注、质量过滤到保留高质量指令的流程。*

![SciGLM 科学基准平均准确率](https://sciglm.github.io/static/images/models_sci_v3.png)
*图：SciGLM 项目页 Figure 1，展示不同参数规模模型在 CEval-Sci、SciEval、SciBench、MATH 和 SAT-Math 上的平均准确率。*

可访问来源：NeurIPS 2024 Datasets and Benchmarks 论文页为 `https://proceedings.neurips.cc/paper_files/paper/2024/hash/02ee6b7295f720407b56c457b34c54d5-Abstract-Datasets_and_Benchmarks_Track.html`；arXiv HTML 为 `https://arxiv.org/html/2401.07950v2`；项目页和图示为 `https://sciglm.github.io/`。

##### 核心流程伪代码

```python
# SciGLM / SciInstruct 的高层构造与训练流程
def build_scinstruct(raw_questions, teacher_llms, labeled_seed_set):
    candidate_instructions = []
    for q in raw_questions:
        # q 通常已有题目和最终答案，但缺少稳定、可读的推理链
        draft_reasoning = teacher_llms.generate_cot(question=q.text)
        critique = teacher_llms.critic(
            question=q.text,
            answer=q.answer,
            reasoning=draft_reasoning,
        )
        revised_reasoning = teacher_llms.revise(
            question=q.text,
            answer=q.answer,
            reasoning=draft_reasoning,
            critique=critique,
        )
        candidate_instructions.append(format_chat(q.text, revised_reasoning, q.answer))

    positives, negatives = synthesize_quality_labels(labeled_seed_set, teacher_llms)
    quality_clf = train_quality_classifier(positives, negatives)
    scored = [(quality_clf.score(x), x) for x in candidate_instructions]
    return keep_high_quality(scored)


def train_sciglm(base_chatglm, scinstruct):
    for batch in dataloader(scinstruct):
        prompt, target = batch.prompt, batch.reasoning_and_answer
        loss = -log_prob(base_chatglm, target, condition=prompt)
        optimizer.step(loss)
    return base_chatglm
```

##### 动机：科学推理缺的不是题目，而是高质量推理过程

数学、物理和化学题库并不少，但很多数据只有题目和最终答案，缺少可监督模型学习的中间推导。对于科学 LLM，这个缺口比通用聊天更严重：模型不仅要选择概念，还要写出公式、代入数值、检查单位，并在多步推理中避免早期错误传导。

SciGLM 的判断是：继续预训练科学文本不一定能直接得到解题能力，因为论文语料和教材语料通常不以“问题-推导-答案”的交互格式出现；只用现成数学 CoT 数据又覆盖不了大学物理、化学和形式化证明。因此，方法重点放在构造高质量科学 instruction tuning 数据，而不是提出一个新的 Transformer 架构。

##### 自反思标注：生成、批判、修正

对一个问题 \(Q\) 和参考答案 \(A\)，普通 CoT 蒸馏可写成让教师模型直接生成推理：

$$
\hat{R} = \pi_{teacher}(Q, A)
$$

但科学题中，\(\hat{R}\) 可能出现“答案对、过程错”的情况，例如套错公式后通过数值巧合得到正确选项。SciGLM 加入 critic-and-revise，把生成过程拆成：

$$
C = \pi_{critic}(Q, A, \hat{R})
$$

$$
R^{*} = \pi_{revise}(Q, A, \hat{R}, C)
$$

其中 \(C\) 是对推理错误的批判性反馈，\(R^{*}\) 是修订后的推理链。这样得到的训练目标不是“模仿第一次生成”，而是模仿经过自我检查后的推理过程。

> 💡 关键：SciGLM 的自反思不是推理时让模型多想一遍，而是在数据构造阶段用反思机制提高 instruction 的监督质量。

##### 质量分类器：把“看起来像 CoT”的噪声过滤掉

论文指出，生成推理的错误主要来自两类：一是 LLM 中间推理错误，即使最终答案正确也可能有伪推理；二是 OCR 或题库转换导致题目/解答不完整。为此，SciGLM 训练 instruction-quality classifier。它基于 ChatGLM3-6B-Base 的特征，对候选解答输出从低到高的质量分数。

质量分类器的训练可抽象成二分类：

$$
h = \operatorname{ChatGLM3Feature}(Q, R, A)
$$

$$
s = w^\top h + b
$$

$$
\mathcal{L}_{clf}
= -y\log\sigma(s) - (1-y)\log(1-\sigma(s))
$$

其中正样本来自人工/已标注高质量解答，负样本来自 ChatGLM2-6B、GPT-3.5、GPT-4 等生成但经检查不可靠的推理。过滤阶段按 \(s\) 排序，移除低分候选；论文消融显示，过滤后的数据在科学和数学平均指标上优于未过滤版本。

##### 指令微调目标

最终 SciGLM 的模型训练是标准监督微调。把题目格式化为聊天式 prompt \(x\)，把修订后的推理链和答案拼成目标输出 \(y=(y_1,\dots,y_T)\)，优化自回归负对数似然：

$$
\mathcal{L}_{SFT}
= -\sum_{t=1}^{T}
\log p_\theta(y_t \mid x, y_{<t})
$$

这个目标本身并不新，关键在于 \(y\) 的质量。SciInstruct 让目标输出包含“识别知识点 -> 选择公式/定理 -> 分步计算/证明 -> 给出答案”的结构，因而模型学习到的是科学问题解决流程，而不只是答案模板。

##### 数据组成与跨学科迁移

论文最终保留 254,051 条 verified instructions，其中物理与化学占 123,869 条，数学占 89,934 条，形式化证明占 40,248 条。项目页的领域分布图显示，物理/化学约 48.8%，数学约 35.4%，Lean 约 15.8%；题型包括填空、选择、简单解答和复杂解答。

![SciInstruct 领域与题型分布](https://sciglm.github.io/static/images/domain_question_type.png)
*图：SciGLM 项目页 Figure 3，展示 SciInstruct 的学科占比和题型占比。*

有意思的是，leave-one-out 数据混合分析显示，删除某一学科会影响其他学科任务。例如数学和形式证明数据能帮助 SciBench，物理/化学数据也能帮助部分数学评测。这说明 SciInstruct 的价值不只是学科知识覆盖，更在于训练模型形成可迁移的符号推理、单位检查、公式选择和逐步验证行为。

##### 与 Galactica 或普通继续预训练的区别

Galactica 代表的是“用大量科学文本继续预训练”的路线，优势是覆盖论文、公式、引用和科学术语；但科学问答需要模型在交互格式下完成多步推导。SciGLM 的路线更接近“科学 CoT 指令调优”：不试图从原始论文中无监督学会解题，而是把大学科学题构造成高质量问题-推理-答案样本。

因此，SciGLM 的核心创新不是参数规模，而是数据闭环：收集题目、补全推理、反思修订、质量过滤、SFT 验证。论文报告 ChatGLM3-6B-Base 经 SciInstruct 训练后在科学与数学加权平均上提升，32B 模型也有稳定收益，并且 MMLU、CEval 等通用语言理解任务没有明显被牺牲。

#### 🧪 练习题

```yaml
question: "SciGLM 中 self-reflective instruction annotation 的主要作用是什么？"
options:
  - "在推理时让用户手动检查模型答案"
  - "在数据构造阶段为缺少推理链的科学题生成、批判并修订 CoT，再过滤低质量样本"
  - "把所有科学题转换成蛋白质结构预测任务"
  - "用更大的词表替换 ChatGLM 的分词器"
answer: 1
explain: "SciGLM 的关键贡献是 SciInstruct 构造流程：先让 LLM 补充推理步骤，再通过 critic-and-revise 和质量分类器提升训练指令质量。"
```
