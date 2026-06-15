### HaluEval

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

HaluEval 提出大规模幻觉识别基准，通过 ChatGPT 采样-过滤生成高迷惑性幻觉样本，并结合人工标注评估模型能否识别问答、对话、摘要和通用指令中的虚假内容。

#### 🎯 核心要点

- 总计 35K 样本：30K 任务样本和 5K 通用用户查询样本
- 覆盖问答、知识接地对话、文本摘要三类任务，以及 Alpaca 来源的通用指令回复
- 自动构造采用 sampling-then-filtering，两种生成策略产生候选幻觉，再由 ChatGPT 过滤最难样本
- 通用用户查询部分对 ChatGPT 回复进行人工幻觉标注，用于估计真实聊天回复中的幻觉比例
- 评测任务是二分类：判断给定文本是否包含幻觉，而不是直接生成答案
- 论文发现外部知识和显式推理步骤有助于模型识别幻觉

#### 🔬 深入细节

![HaluEval 数据生成流程](https://raw.githubusercontent.com/RUCAIBox/HaluEval/main/assets/pipeline.png)
*图：HaluEval 官方仓库中的 sampling-then-filtering 数据生成流程。*

```python
# HaluEval sampling-then-filtering 伪代码
for task in ["qa", "dialogue", "summarization"]:
    seeds = load_seed_dataset(task)
    for seed in sample(seeds, n=10000):
        candidates = []
        candidates.append(chatgpt_generate_hallucination(seed, strategy="one_turn"))
        candidates.append(chatgpt_generate_hallucination(seed, strategy="multi_turn"))
        hard_negative = chatgpt_filter_most_plausible(seed, candidates)
        dataset.append(make_pair(seed.ground_truth_output, hard_negative))

for example in dataset:
    text = random_choice([example.truthful, example.hallucinated])
    pred = llm_judge_hallucination(text, context=example.source_knowledge)
    score += int(pred == example.label)
```

##### 动机与背景

幻觉评测有两个难点：一是需要大量“看起来合理但实际错误”的负例，二是要区分模型生成能力和模型识别能力。HaluEval 选择先构造可控的幻觉样本，再让模型判断文本是否含幻觉，这样可以直接测量模型的事实核查意识。

传统人工构造负例成本高，而且容易产生过于明显的错误。HaluEval 借助 ChatGPT 生成候选幻觉，再用过滤提示选出最容易迷惑模型的样本，使负例更接近真实 LLM 输出中“流畅但不可靠”的错误。

##### 核心机制

问答任务以 HotpotQA 等数据为种子，保留知识、问题和正确答案，再生成对应 hallucinated_answer；对话任务基于 OpenDialKG 的知识接地对话，生成错误回复；摘要任务基于 CNN/Daily Mail，生成与原文不一致的摘要。每类任务都形成正确输出与幻觉输出的成对数据。

评测时，模型看到上下文和候选输出，需要回答是否包含幻觉。这个二分类设定可以写成：

$$\hat{y} = f_\theta(x, c),\quad y \in \{\text{hallucinated}, \text{not hallucinated}\}$$

其中 \(x\) 是待判断文本，\(c\) 是问题、知识或原文上下文。

##### 通用聊天样本

除任务样本外，HaluEval 还从 Alpaca 指令中抽取通用用户查询，让 ChatGPT 多次生成回复，并用回复之间的低相似度筛出更可能包含幻觉的查询，再由人工标注。论文报告 ChatGPT 在这类开放查询中约 19.5% 回复含幻觉，说明幻觉不只是知识密集任务中的边缘现象。

##### 方法解读

HaluEval 的贡献在于把“生成幻觉”转化为“识别幻觉”的标准化测验。模型如果能够识别外部知识与回复之间的冲突，就有机会用于检索增强系统、模型监控或自动质检。反过来，若模型本身也被流畅幻觉欺骗，就说明简单地用另一个 LLM 做事实裁判仍有风险。

> ⚠️ 注意：HaluEval 的负例由 ChatGPT 辅助生成，可能继承特定模型的错误风格，因此用于评估不同模型时应关注数据生成偏差。

#### 🧪 练习题

```yaml
question: "HaluEval 的 sampling-then-filtering 流程主要目的是什么？"
options:
  - "生成尽可能短的答案以便人工标注"
  - "构造流畅且具有迷惑性的幻觉负例，再筛选最适合评测的样本"
  - "只保留模型最容易识别的错误样本"
  - "把所有问答任务转换成数学题"
answer: 1
explain: "HaluEval 先生成候选幻觉，再过滤出更 plausible、更困难的负例，用于测试模型识别幻觉的能力。"
```
