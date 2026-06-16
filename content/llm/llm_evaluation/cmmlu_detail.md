### CMMLU：中文大规模多任务语言理解评测

```yaml
id: cmmlu
name: CMMLU
full_name: 中文大规模多任务语言理解 (Chinese MMLU)
year: "2023"
org: 复旦大学
paper_url: https://arxiv.org/abs/2306.09212
category: general
parent: c_eval
motivation: 扩展中文评测覆盖面与题目多样性
```

#### 📝 一句话总结
CMMLU 提出了一个面向普通话中文语境的大规模多任务评测集，用 67 个主题和约 1.15 万道四选一题评估模型在中文知识、文化常识、专业学科与推理任务上的综合能力。它在 C-Eval 的中文考试路线之外进一步扩展了日常生活、地域文化和中国特定知识覆盖，强调英文 benchmark 翻译无法替代本地语境评测。

#### 🎯 核心要点
- 覆盖 67 个中文主题，包含 STEM、人文、社会科学和 Other 四大类，统计表中测试题总量为 11,582 道。
- 学科分布为 17 个 STEM、13 个 humanities、22 个 social science、15 个 other，并包含 15 个中国特定主题。
- 主题不仅包括数学、物理、机器学习、法律、医学等通用学科，也包括中国驾驶规则、中国饮食文化、中国外交政策、古汉语、中医中药等本地化内容。
- 数据由 4 名本科及以上标注者人工收集，来源包括非公开材料、mock exams、quiz shows 和经 OCR 处理的 PDF，其中超过 80% 来自 PDF。
- 每道题为四选一且仅一个正确答案，化学式和数学表达使用 LaTeX 与无歧义纯文本混合呈现。
- 数据质量检查随机抽取每学科 5% 题目核验，论文估计答案缺失或标注错误噪声约 2%。
- 每个学科至少 105 道题，切分为 5 道 few-shot development 示例和 100 道以上 test 题。
- 对闭源商业模型采用 free generation 加正则抽取，对开源模型主要采用 next-token prediction 比较 A/B/C/D 概率。
- 论文比较了 next-token、perplexity comparison 和 free generation 三种多选判题策略，认为 next-token prediction 效率最高。

#### 🔬 深入细节

![CMMLU task overview](https://arxiv.org/html/2306.09212v2/x1.png)
*图：论文 Figure 1，CMMLU task overview，概览 67 个中文主题以及中文文化、学科和专业知识覆盖。*

CMMLU 的核心问题意识与 MMLU/C-Eval 一脉相承，但更强调“语言与文化不可分离”。MMLU 是英文语境下的广域学科考试，C-Eval 是面向中文教育和职业考试体系的综合评测；CMMLU 进一步指出，很多能力不是把英文题翻译成中文就能测出来。例如古汉语、现代汉语、中国饮食文化、中国驾驶规则、中医中药、马克思主义理论、中国外交政策等主题，其正确答案依赖中国制度、历史、语言表达和日常文化背景。模型如果只在翻译题上得分，仍可能无法服务真实中文用户。

数据收集上，CMMLU 明确投入人力寻找低污染来源。论文雇佣 4 名本科及以上标注者，以约 250 小时人工收集题目和答案，并特别寻找非公开材料、mock exam questions 和 quiz shows，以减少题目已进入 LLM 训练集的概率。超过 80% 的数据来自 PDF 并经过 OCR，这与直接抓取网页题库相比更难被预训练语料原样包含。这个选择牺牲了构建便利性，但提高了评测对“真实泛化能力”的诊断价值。

CMMLU 的题目格式统一为四选一，每题只有一个正确答案。题型包括填空式单选和直接问答式单选；对数学公式、化学式等符号内容，论文使用约 50:50 的 LaTeX 和纯文本表达，纯文本只在常见且不易歧义的表达中使用，例如 `H2O`。这种格式设计既保留中文考试中的真实表达，又让自回归语言模型可以用标准多选接口作答。

在学科结构上，CMMLU 比 C-Eval 更重视生活和区域文化主题。统计表显示，67 个主题中 STEM 17 个、人文 13 个、社会科学 22 个、Other 15 个；其中中国特定主题约 15 个。这些题目不仅考查“知识是否在模型参数中”，还考查模型是否能理解本地语义细节。例如“中国驾驶规则”的答案可能由中国交通法规决定，“中国饮食文化”涉及民族与地域生活知识，“古汉语/中国文学”则依赖无法自然翻译成英文的语言现象。

CMMLU 的主要开源模型评测采用 next-token prediction。给定提示 \(x_i\) 后，模型只需在下一个 token 的四个候选字母上给出概率：

$$
\hat{y}_i=\arg\max_{a\in\{A,B,C,D\}}P_\theta(a\mid x_i)
$$

对商业闭源模型，如 GPT-4 和 ChatGPT，无法直接获得 logits，因此论文采用 free generation：让模型生成答案文本，再用正则表达式匹配最终选项。这个区别非常实际：开放权重模型适合概率判题，API 模型通常只能用生成结果判题。两者最终都映射到同一个四分类准确率。

```python
# CMMLU 多选评测伪代码：开源模型与闭源模型分流
for subject in cmmlu_subjects:  # 67 subjects
    demos = load_dev_examples(subject, max_k=5)
    for item in load_test(subject):
        prompt = build_prompt(
            intro=f"以下是关于{subject}的单项选择题，请直接给出正确答案的选项。",
            demonstrations=demos,
            question=item.question,
            choices=item.choices,
            suffix="答案是："
        )

        if model.has_logits:
            probs = model.next_token_probs(prompt, candidates=["A", "B", "C", "D"])
            pred = argmax(probs)
        else:
            response = model.generate(prompt)
            pred = regex_match_choice(response)

        record(subject, pred == item.gold_answer)
```

论文还讨论了 perplexity comparison 作为第三种策略。该策略把每个候选答案拼接到题目后面，计算完整序列困惑度，选困惑度最低的候选：

$$
\mathrm{PPL}(z)=\exp\left(-\frac{1}{|z|}\sum_{t=1}^{|z|}\log P_\theta(z_t\mid z_{<t})\right)
$$

$$
\hat{y}=\arg\min_{a\in\{A,B,C,D\}}\mathrm{PPL}(x\oplus a)
$$

这个方法比 next-token 更贴近“答案文本整体是否自然”，但每题需要对四个候选分别前向计算，约为四倍成本。CMMLU 因此主要报告 next-token prediction，因为它在效率、稳定性和与 MMLU 兼容性之间更平衡。

Prompt 设计也体现了中文本地化。CMMLU 使用类似“以下是关于[主题]的单项选择题，请直接给出正确答案的选项”的中文指令，并在 few-shot 时插入最多 5 个带答案示例。若模型上下文长度不足，论文会动态删除最长示例，以保证当前测试题能够完整进入上下文。这一点对于中文长题尤其重要，因为专业题、法律题、历史题常包含较长题干，简单截断可能改变题意。

实验发现，CMMLU 对现有模型仍然很难。论文评估 GPT-4、ChatGPT 以及 20 多个多语/中文开源模型，五样本设置下 GPT-4 平均约 70.95%，ChatGPT 约 55.51%，多数模型难以达到中国考试中常见的 60% 及格线。更有意思的是，模型在不同主题上高度不均衡：人文、社会科学和 Other 通常更接近记忆型知识，成绩相对高；STEM 需要复杂推理，成绩更低；中国特定主题则受训练语料中地区知识覆盖影响明显。

CMMLU 的分析部分还指出，chain-of-thought 并不总能提升性能。对很多已有模型，CoT 提示可能因为中文推理链质量、输出格式漂移或模型自身推理能力不足而收益有限；few-shot 示例对基础模型有帮助，能让模型理解任务格式和答案风格，但对已经 SFT/RLHF 的聊天模型不一定有帮助。含否定词的问题和含子选项的问题也更难，说明评测不仅在考知识记忆，还能捕捉语言细节和组合推理难点。

与 C-Eval 的关系上，CMMLU 更像是中文 MMLU 的“覆盖面扩展版”。C-Eval 强调四级难度和中国考试体系，CMMLU 强调中文语言文化、生活知识、地区特定答案和更宽主题分布。二者结合后，中文 LLM 评测能同时观察“学校/职业考试能力”和“本地文化/日常知识能力”，避免只用单一排行榜分数概括模型中文能力。

> 💡 关键：CMMLU 的方法贡献不是更复杂的指标，而是更贴近中文现实世界的任务选择。它证明中文能力评测必须包含中国特定、中文表达特定、文化语境特定的题目，否则高分模型可能只是会处理翻译过来的英文考试。

#### 🧪 练习题
```yaml
question: "CMMLU 为什么同时使用 next-token prediction 和 free generation 两种判题方式？"
options:
  - "因为所有模型都必须输出完整推理过程"
  - "因为开源模型可读取 logits，适合比较 A/B/C/D 概率；闭源 API 通常只能生成文本，需要正则抽取答案"
  - "因为 next-token prediction 只能用于英文，不能用于中文"
  - "因为 free generation 一定比概率判题更准确"
answer: 1
explain: "CMMLU 根据模型可访问性选择判题策略：开放权重模型用候选 token 概率更高效稳定，商业闭源模型无法取 logits，只能生成答案后抽取选项。"
```
