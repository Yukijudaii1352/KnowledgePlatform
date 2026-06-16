### GPQA：研究生级防搜索问答 (Graduate-Level Google-Proof QA)
```yaml
id: gpqa
name: GPQA
full_name: 研究生级防搜索问答 (Graduate-Level Google-Proof QA)
year: "2024"
org: NYU
paper_url: https://arxiv.org/abs/2311.12022
category: specialized
parent: scibench
motivation: Google-proof专家级科学推理金标准
```

#### 📝 一句话总结
GPQA 提出了由领域专家编写、专家复核、跨领域高能力非专家联网验证的研究生级科学问答基准，解决普通 QA 题可被搜索或表面模式轻易破解的问题。它用专家和非专家之间的真实知识鸿沟，为可扩展监督和高难度科学推理评测提供了更接近前沿能力边界的金标准。

#### 🎯 核心要点
- 主集 GPQA 包含 448 道多选题，扩展集 GPQA Extended 包含 546 道题，最高质量子集 GPQA Diamond 包含 198 道题。
- 题目由拥有或正在攻读相关领域 PhD 的专家撰写，覆盖生物、物理、化学及其子领域。
- 每道题经历问题写作、第一轮专家验证、作者修订、第二轮专家验证、三名跨领域非专家验证。
- 非专家不是普通众包工人，而是其他科学领域的高能力验证者，可使用互联网但不能使用语言模型助手，平均每题花费约 37 分钟。
- 专家准确率约 65%，扣除可回溯识别的明显失误后约 74%；联网非专家准确率约 34%，接近但高于四选一随机基线 25%。
- 最强 GPT-4 基线约 39% accuracy，说明 GPQA 在论文发表时对前沿模型仍未饱和。
- 核心筛选目标不是“题目冷门”，而是同时满足 ground truth 可由专家确认、错误选项对非专家有迷惑性、搜索资源不能直接解决。
- 论文特别面向 scalable oversight：测试非专家是否能借助不可靠 AI 系统逼近专家判断，而不是直接依赖专家监督每个答案。

#### 🔬 深入细节
![GPQA 数据创建与验证流程](https://ar5iv.labs.arxiv.org/html/2311.12022/assets/x1.png)
*图：GPQA 的数据创建流程。题目先由专家撰写，再经过同领域专家验证、问题修订、第二专家验证和跨领域非专家验证，最终形成 main 与 diamond 子集。*

```python
# GPQA 数据构造与评测伪代码
for domain in ["biology", "physics", "chemistry"]:
    writer = hire_phd_expert(domain)
    q, choices, answer, explanation = writer.create_google_proof_question()

    ev1 = hire_phd_expert(domain, exclude=writer)
    ev1_answer, ev1_feedback = ev1.answer_and_review(q, choices)

    q_revised = writer.revise(q, ev1_feedback)

    ev2 = hire_phd_expert(domain, exclude=[writer, ev1])
    ev2_answer, ev2_feedback = ev2.answer_and_review(q_revised, choices)

    non_expert_answers = []
    for validator in hire_cross_domain_experts(k=3, allow_web=True, forbid_llm=True):
        non_expert_answers.append(validator.answer(q_revised, choices, min_minutes=15))

    expert_agree = posthoc_agreement(ev1_answer, ev2_answer, ev2_feedback, answer)
    non_expert_correct = count_correct(non_expert_answers, answer)
    split = assign_split(expert_agree, non_expert_correct)  # Extended / GPQA / Diamond
    save(q_revised, choices, answer, explanation, split)

for model in baseline_models:
    pred = model.answer_multiple_choice(prompt_gpqa(question))
    accuracy += int(parse_choice(pred) == gold_choice)
```

GPQA 的核心问题不是“模型会不会答科学题”，而是“当监督者自己无法轻易验证答案时，如何评测 AI 是否可信”。普通 QA 基准往往可以通过网页检索、题库记忆或表面线索解决；这类数据对 scalable oversight 不够有用，因为非专家监督者只要搜索一下就能判断模型输出。GPQA 反过来要求题目位于真实专业知识边界：专家知道或能推导 ground truth，但高能力跨领域非专家即使有搜索引擎和足够激励也很难答对。

数据创建流程的第一层约束是 objectivity。题目作者不仅给出正确选项，还必须写解释，说明为什么正确答案成立、为什么其他选项虽然看似合理但错误。第一位同领域专家先答题并给反馈，作者再修订题目；第二位同领域专家答修订后的题目，并在看到正确解释后给 post-hoc feedback。这个反馈很重要，因为专家答错并不一定表示题目有争议，也可能只是题目太难导致专家犯错。

论文用“专家同意”而不是简单的“专家初答正确”来估计题目可靠性。可以把专家验证抽象为：

$$
E(q)=\frac{1}{2}\sum_{j=1}^{2}\mathbb{1}\left[a^{(E)}_j=y \;\lor\; \operatorname{posthoc\_agree}(j,q,y)\right]
$$

其中 \(a^{(E)}_j\) 是第 \(j\) 个专家的答案，\(y\) 是题目作者给出的 gold answer。若专家初答错，但复盘后清楚指出自己的错误或展示理解了作者解释，也可被视为支持题目客观性。这样做避免把“专家一时算错”误判为“题目没有唯一答案”。

第二层约束是 Google-proof difficulty。非专家验证者同样很强：他们本身是其他领域的题目作者或专家验证者，可以无限制使用互联网，只禁止使用语言模型助手，并且每题至少花 15 分钟、平均约 37 分钟。难度可用专家和非专家的能力差近似：

$$
\Delta(q)=\operatorname{Acc}_{expert}(q)-\operatorname{Acc}_{nonexpert}(q)
$$

当 \(\Delta\) 较大时，题目更能体现“需要领域训练才能判断”的属性。论文报告联网非专家总体约 34% accuracy，而四选一随机基线是 25%；这说明题目不是靠简单搜索就能解决，但也不是完全无意义的猜谜。

GPQA 的 split 设计反映了质量控制取舍。Extended 保留 546 道公开题；main set 去掉“两个专家都错且三个非专家都对”的明显可疑题，形成 448 道推荐主评测题；Diamond 更严格，要求两个专家都支持或可通过明确 post-hoc mistake 支持正确答案，并且多数非专家答错，最终得到 198 道最高质量题。Diamond 的样本更少，但更适合做高置信度对比；main set 更适合常规模型评测。

与 SciBench 这类开放数值科学题相比，GPQA 选择四选一形式不是为了降低难度，而是为了让评测可稳定复现。四选一带来 25% 随机基线，但题目作者被要求设计“合理但错误”的干扰项，并写出每个选项的解释。这样模型不能只依赖关键词匹配，还必须理解专业机制、边界条件和隐藏假设。论文中的 GPT-4 few-shot CoT 仍只有约 39%，说明多选格式并没有使问题变简单。

GPQA 对可扩展监督的意义在于：它创建了一个非专家真的会失败、专家又能给出 ground truth 的中间地带。未来若一个模型声称能帮助科研，监督者可能无法直接验证模型答案；GPQA 可用于测试 debate、market-making、recursive reward modeling 或其他人机交互监督协议，是否能让非专家借助模型达到更接近专家的判断质量。

> ⚠️ 注意：GPQA 的“Google-proof”不等于答案无法出现在互联网上，而是高能力非专家在自由搜索、长时间作答和高奖金激励下仍难以可靠定位和整合足够证据。

#### 🧪 练习题
```yaml
question: "GPQA 中三名跨领域非专家验证者的主要作用是什么？"
options:
  - "替代同领域专家来决定唯一正确答案"
  - "测试题目是否在联网搜索条件下仍对非专家足够困难"
  - "为模型训练提供更多人工推理链"
  - "把开放题自动转换为四选一格式"
answer: 1
explain: "GPQA 的核心是专家与高能力非专家之间的知识鸿沟；非专家验证用于确认题目不是简单搜索即可解决。"
```
