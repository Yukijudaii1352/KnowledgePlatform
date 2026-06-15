### LLM-as-Judge

```yaml
id: llm_judge
name: LLM-as-Judge
full_name: LLM裁判评测范式 (LLM-as-Judge)
year: "2023"
org: UC Berkeley
paper_url: https://arxiv.org/abs/2306.05685
category: frontier_2026
parent: helm
motivation: 自动化评测解决人工成本高问题
```

#### 📝 一句话总结

LLM-as-Judge 使用强模型作为自动裁判评估开放式聊天回复，并通过 MT-Bench 与 Chatbot Arena 验证其与人类偏好高度一致，同时系统分析位置偏差、冗长偏差和自我增强偏差。

#### 🎯 核心要点

- 论文提出 MT-Bench，多轮开放问题集用于评估聊天助手的指令跟随、推理、写作和角色能力
- Chatbot Arena 采用众包成对对战收集人类偏好，用 Elo/Bradley-Terry 类方法排名模型
- GPT-4 等强 LLM 裁判在人类偏好一致性上达到 80% 以上，接近人类之间一致性
- 支持 single-answer grading、pairwise comparison、pairwise against baseline 等评测模式
- 系统识别 LLM 裁判的 position bias、verbosity bias、self-enhancement bias 和有限推理能力
- 通过交换回答顺序、使用参考答案、成对比较和提示约束缓解部分偏差

#### 🔬 深入细节

![MT-Bench 雷达图](https://raw.githubusercontent.com/lm-sys/FastChat/main/fastchat/llm_judge/data/mt_bench/misc/radar.png)
*图：FastChat 官方 `llm_judge` 目录中的 MT-Bench 雷达图，用于展示模型在不同开放任务类别上的表现。*

```python
# LLM-as-Judge / MT-Bench 评测伪代码
for model in candidate_models:
    for question in mt_bench_questions:
        answer = model.generate_multi_turn_answer(question)
        save_answer(model, question, answer)

for question in mt_bench_questions:
    for model in candidate_models:
        judgment = judge_model.generate(
            prompt=build_judge_prompt(
                question=question,
                answer=candidate_answers[model, question],
                rubric="score 1-10 with explanation",
            )
        )
        score[model].append(parse_score(judgment))

for pair in model_pairs:
    verdict_ab = judge_pairwise(question, answer_a, answer_b)
    verdict_ba = judge_pairwise(question, answer_b, answer_a)  # order-swap mitigation
    update_win_rate(pair, reconcile(verdict_ab, verdict_ba))
```

##### 动机与背景

开放式聊天模型很难用精确匹配或单一标准答案评估。一个回答可能风格更好、信息更完整、推理更清楚，但和参考答案字面差异很大。人工评测可靠但昂贵、慢且难以频繁回归测试。LLM-as-Judge 的核心动机就是用强模型近似人类偏好，降低开放式评测成本。

MT-Bench 提供控制环境：固定多轮问题，收集不同模型回复，再让 GPT-4 等强裁判按提示打分或比较。Chatbot Arena 提供真实用户环境：用户同时看到两个匿名模型回答并投票，最终通过大量对战形成偏好排名。

##### 核心机制

Single-answer grading 要求裁判对一个模型回答给出 1-10 分和解释；pairwise comparison 要求裁判在两个回答之间选胜者。前者成本低且易解释，后者更接近人类偏好投票。两者都可以看成用裁判模型估计质量函数：

$$\hat{q}(x, y)=J_\phi(x, y)$$

或成对偏好：

$$P(y_a \succ y_b \mid x)=J_\phi(x, y_a, y_b)$$

##### 偏差与缓解

论文重要贡献不是只说“GPT-4 可以当裁判”，而是明确列出裁判偏差。Position bias 指裁判偏好某个固定位置的回答；verbosity bias 指偏好更长答案；self-enhancement bias 指模型偏好自己家族的输出；有限推理能力则会在复杂数学、逻辑或事实题上误判。

缓解策略包括交换回答顺序并合并结果、要求裁判先解释再打分、提供参考答案、使用 pairwise-baseline 降低比较成本，以及对裁判输出做一致性检查。即便如此，LLM-as-Judge 仍不应被视为完全替代人工评审。

##### 与传统基准的区别

HELM、MMLU 等基准适合可标准化答案的任务；LLM-as-Judge 适合开放式、多目标和偏好驱动任务。它把评测从“答案是否等于 gold”转向“回答质量是否更符合人类偏好”，因此成为聊天模型迭代中的核心评测范式。

> ⚠️ 注意：LLM 裁判越强，评测越有用；但如果被评模型能力接近或超过裁判，裁判可靠性会下降。

#### 🧪 练习题

```yaml
question: "LLM-as-Judge 论文中交换回答顺序的主要目的是什么？"
options:
  - "增加模型回复长度"
  - "缓解裁判对第一个或第二个位置的固定偏好"
  - "让所有模型使用同一个答案"
  - "取消 pairwise comparison"
answer: 1
explain: "位置偏差会让裁判偏好某个展示位置，交换顺序后合并判定可以检测并缓解这种偏差。"
```
