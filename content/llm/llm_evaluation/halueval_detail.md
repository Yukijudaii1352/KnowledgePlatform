### HaluEval：幻觉评测基准 (Hallucination Evaluation)
```yaml
id: halueval
name: HaluEval
full_name: 幻觉评测基准 (Hallucination Evaluation)
year: "2023"
org: Tsinghua University
paper_url: https://arxiv.org/abs/2305.11747
category: alignment
parent: truthfulqa
motivation: 35K样本覆盖问答对话摘要幻觉
```

#### 📝 一句话总结
HaluEval 提出了一个包含自动生成和人工标注样本的大规模 LLM 幻觉识别基准，用 sampling-then-filtering 构造高迷惑性的幻觉答案，并覆盖问答、知识型对话、摘要和通用用户查询。它解决了早期幻觉评测规模小、任务单一、缺少系统化幻觉模式控制的问题。

#### 🎯 核心要点
- 基准总规模约 35,000 条，包括 30,000 条任务特定样本和 5,000 条通用用户查询响应标注。
- 任务特定样本覆盖 question answering、knowledge-grounded dialogue、text summarization 三类典型生成任务。
- 自动构造采用两阶段 sampling-then-filtering：先生成多样幻觉候选，再选择最像正确答案且最难识别的候选。
- 幻觉采样同时使用 one-pass instruction 和 conversational instruction，提升候选答案的多样性。
- QA 幻觉模式包括 comprehension、factualness、specificity、inference；对话和摘要也分别设计任务特定幻觉模式。
- 通用查询部分从 Alpaca 指令数据出发，让 ChatGPT 对同一 query 采样三次，保留语义相似度最低的一批高风险 query。
- 人工标注要求三名标注者判断 ChatGPT 响应是否包含 hallucination，并标注 unverifiable、non-factual、irrelevant 等幻觉片段，最终多数投票。
- 实验显示 LLM 自身识别幻觉仍很困难，例如 ChatGPT 在摘要幻觉识别上仅 58.53%，接近随机水平。

#### 🔬 深入细节
![HaluEval 构造流程](https://ar5iv.labs.arxiv.org/html/2305.11747/assets/x1.png)
*图：HaluEval 的构造流程。上半部分用 ChatGPT 自动生成和过滤任务特定幻觉样本，下半部分对通用用户查询响应进行人工标注。*

```python
# HaluEval sampling-then-filtering 与评测伪代码
for seed in task_datasets:  # HotpotQA / OpenDialKG / CNN-DailyMail
    instruction = build_hallucination_instruction(seed.task, patterns=task_specific_patterns)

    # 两条采样路径：一次性提示和分步对话式提示
    cand_1 = chatgpt.generate(one_pass_prompt(instruction, seed), temperature=1.0)
    cand_2 = chatgpt.generate(conversational_prompt(instruction, seed), temperature=1.0)

    # 过滤器要求在两个幻觉候选中选择更可信、更接近正确答案、更难识别的一个
    selected = chatgpt.choose_best_hallucination(seed.knowledge, seed.question, cand_1, cand_2)
    save_pair(normal_answer=seed.gold_or_reference, hallucinated_answer=selected)

for query in alpaca_queries:
    responses = [chatgpt.generate(query) for _ in range(3)]
    if average_bertscore_similarity(responses) is low:
        label = majority_vote([human.annotate(response) for human in three_labelers])
        save_general_query(query, response, label, hallucinated_spans)

for model in evaluated_llms:
    sample = random_choice([normal_output, hallucinated_output])
    pred = model.classify(sample, label_space=["hallucinated", "not hallucinated"])
    accuracy += int(pred == gold_label)
```

HaluEval 的核心思想是把“幻觉评测”从事后收集错误案例，转化为可控生成的对照数据。对于每条任务样本，基准通常保留一个正常输出和一个幻觉输出；评测时随机给模型其中之一，让模型判断是否含有幻觉。这样每个样本都可以形成二分类问题，随机水平约为 50%，便于横向比较不同 LLM 的幻觉识别能力。

自动生成阶段首先定义任务特定的幻觉模式。QA 中的四类模式分别针对题意理解错误、事实冲突、答案粒度不当和无法从知识推出的错误推理；知识型对话中关注 extrinsic-soft、extrinsic-hard、extrinsic-grouped 等与外部知识不一致的响应；摘要中关注 factual、non-factual、intrinsic 等摘要事实性错误。通过把模式写进提示词，ChatGPT 不只是随机编造，而是在指定错误机制下生成“看起来合理但事实不成立”的答案。

两路采样设计解决的是多样性问题。one-pass schema 把完整指令、幻觉类型和示例一次性输入模型，让模型直接生成候选；conversational schema 则让模型逐步学习幻觉模式，确认掌握后再生成。若把两个候选记为 \(h_1,h_2\)，过滤阶段不是选择正确答案，而是选择更难被识别的幻觉：

$$
h^*=\arg\max_{h\in\{h_1,h_2\}} \operatorname{Plausibility}(h\mid x,k)-\lambda\operatorname{Detectability}(h\mid x,k)
$$

其中 \(x\) 是问题或输入，\(k\) 是相关知识。论文实际用 ChatGPT judge 根据带示例的 filtering instruction 在两个候选中选择“更好”的一个；上式表达的是这种筛选的直觉：幻觉越贴近正确答案、越自然、越少表面破绽，就越适合作为评测样本。

人工标注阶段用于覆盖更真实的 ChatGPT 通用响应。作者从 Alpaca 指令数据中取用户 query，让 ChatGPT 对同一 query 生成三条响应，并用 BERTScore 计算平均语义相似度。低相似度意味着模型对同一问题说法分歧大，按 SelfCheckGPT 一类观察，这类 query 更可能诱发幻觉。之后每条响应由三名人类标注者判断是否包含幻觉，并标注具体片段，最终通过 max-voting/多数投票决定标签。

HaluEval 的评测目标可形式化为二分类准确率：

$$
\operatorname{Acc}=\frac{1}{N}\sum_{i=1}^{N}\mathbb{1}\left[f_\theta(x_i, y_i, k_i)=z_i\right]
$$

其中 \(y_i\) 是待判断输出，\(k_i\) 是可用知识或源文档，\(z_i\in\{0,1\}\) 表示是否幻觉。这个设定迫使模型不只生成答案，还要进行事实核验、源文档对齐和不确定性判断。若幻觉只改动关键事实片段，表面流畅度与正常输出非常接近，模型就很容易被语言自然性误导。

实验结果揭示了 alignment 模型的盲点。ChatGPT 在 QA、对话、摘要、通用四类上分别约为 62.59、72.40、58.53、79.44 accuracy；GPT-3 在前三个任务上接近 50% 随机水平；部分开源指令模型甚至低于随机。论文解释是：生成出的幻觉样本和真实样本高度相似，只在关键事实 span 上不同，而许多 LLM 更擅长判断文本是否流畅、是否像答案，不擅长执行细粒度事实比对。

论文还比较了几种缓解识别失败的策略。给模型提供外部知识通常能提高识别准确率，例如通用查询上 ChatGPT 加知识可从 86.22 提升到 90.73；加入 CoT 在摘要上有一定帮助；但把 hallucinated sample 和 ground truth 直接对比的 contrast 策略反而可能让模型混淆。这个结果说明“更多上下文”不是自动等于更好事实性判断，关键在于模型是否能把证据与待判断 span 正确对齐。

与 TruthfulQA 侧重模型是否会给出真实回答不同，HaluEval 更关注“模型能否识别已经生成的内容是否幻觉”。这种能力在实际部署中很重要：一个系统可能先生成候选答案，再由同模型或另一个 verifier 做事实审查。HaluEval 的 sampling-then-filtering 机制专门把样本推向“难以识别”的区域，因此比简单错误集合更适合评估 verifier 的上限。

> 💡 关键：HaluEval 的价值不只是 35K 规模，而是把幻觉样本构造为有正常对照、模式可控、难度经过过滤的评测对象，从而直接考察 LLM 的 hallucination recognition 能力。

#### 🧪 练习题
```yaml
question: "HaluEval 中 sampling-then-filtering 的主要目的是什么？"
options:
  - "用人工逐条编写所有幻觉样本"
  - "先生成多样幻觉候选，再筛选最可信、最难识别的样本用于评测"
  - "把所有开放任务改成四选一选择题"
  - "让模型只根据文本流畅度判断答案质量"
answer: 1
explain: "HaluEval 先用两种提示方式生成候选幻觉，再用过滤指令选择更迷惑的候选，从而提高幻觉识别评测难度。"
```
