### MMLU：大规模多任务语言理解评测

```yaml
id: mmlu
name: MMLU
full_name: 大规模多任务语言理解 (Massive Multitask Language Understanding)
year: "2021"
org: UC Berkeley
paper_url: https://arxiv.org/abs/2009.03300
category: general
parent: "—"
motivation: 57学科多选题覆盖，奠定多任务知识评测标准
```

#### 📝 一句话总结
MMLU 提出了一个覆盖 57 个学科、从基础教育到专业考试的多任务多选题评测集，用零样本/少样本提示直接测量语言模型从预训练中获得的广域知识与问题求解能力。它解决了 GLUE、SuperGLUE 等传统基准过窄、过快饱和、难以暴露模型知识盲区的问题，成为后续大模型通用能力评测的核心标准。

#### 🎯 核心要点
- 57 个任务覆盖 STEM、人文、社会科学和 Other 四大类，题目难度从 elementary/high school 到 college/professional。
- 数据由研究者从公开练习题、标准化考试、大学课程材料和专业考试资料中人工收集，总计 15,908 道四选一题。
- 数据切分为每学科 5 道 few-shot development 题、1,540 道 validation 题和 14,079 道 test 题，用于提示、调参和最终评测。
- 评测强调 zero-shot 与 few-shot，而不是在大训练集上微调，以检验模型在预训练阶段是否真正吸收并能应用知识。
- 模型判题采用候选答案 token “A/B/C/D”的概率，取概率最大者作为预测，指标为分类准确率。
- 论文同时分析模型校准问题，发现 GPT-3 的平均置信度可能显著偏离真实准确率，说明“会答题”和“知道自己是否会”是两回事。
- 实验显示 175B GPT-3 few-shot 平均准确率为 43.9%，明显高于随机 25%，但仍远低于估计专家水平约 89.8%。
- MMLU 揭示了模型能力分布不均：语言模型在描述性知识上较强，在计算密集 STEM、法律、伦理等任务上存在明显短板。

#### 🔬 深入细节

![MMLU few-shot 提示示例](https://ar5iv.labs.arxiv.org/html/2009.03300/assets/x1.png)
*图：论文 Figure 1(a)，展示 GPT-3 在 MMLU 中的少样本提示形式：先给出同一学科的若干带答案样例，再要求模型补全最后一题的选项。*

![MMLU 与传统基准的规模效应对比](https://ar5iv.labs.arxiv.org/html/2009.03300/assets/x2.png)
*图：论文 Figure 1(b)，对比 HellaSwag、SuperGLUE 和 MMLU。传统基准上小模型已明显高于随机水平，而 MMLU 只有最大规模 GPT-3 才开始显著超过随机。*

MMLU 的关键动机是重新定义“语言理解”的测量方式。GLUE 和 SuperGLUE 主要围绕自然语言推断、情感分析、问答等 NLP 任务，它们能测语言建模和局部推理能力，但不要求模型掌握大量人类学科知识。论文指出，大规模 Transformer 在预训练时读过 Wikipedia、书籍、网页和专业文本，理论上接触过大量专业知识；如果评测仍停留在狭窄的语言技能题上，就无法判断这些知识是否被模型可用地吸收。MMLU 因此将评测对象从“能否完成某个 NLP 任务”转为“能否像一个广谱考试参与者一样，在陌生学科题目上做出正确判断”。

数据设计上，MMLU 故意采用四选一多项选择题，而不是开放式生成题。这样做有两个直接好处：第一，评价指标清晰，正确/错误可以直接计算准确率；第二，它能把不同学科统一到同一个推理接口，使法律、医学、数学、计算机、伦理、历史等题目都可被同一模型用同一流程回答。每个学科至少有 100 道测试题，避免单个学科因题量太少导致估计不稳定；每个学科固定 5 道 development 题，既能用于 few-shot 提示，也能保证不同模型看到的示例一致。

MMLU 的标准 few-shot 评测不是让模型长篇生成，而是比较下一个 token 是候选字母的概率。对第 \(i\) 道题，设提示文本为 \(x_i\)，四个候选答案字母集合为 \(\mathcal{A}=\{A,B,C,D\}\)，语言模型参数为 \(\theta\)。预测为：

$$
\hat{y}_i=\arg\max_{a\in\mathcal{A}} P_\theta(t_a\mid x_i)
$$

其中 \(t_a\) 是答案字母对应的 token。整体准确率为：

$$
\mathrm{Acc}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}[\hat{y}_i=y_i]
$$

这个公式看似简单，但它避免了自由生成评测中的答案抽取歧义。例如模型生成“我认为答案应该是 B，因为……”或“B.”时，正则提取可能失败；而 next-token 概率直接把评测压缩为四分类问题，更稳定地反映模型对候选答案的偏好。

```python
# MMLU zero-shot / few-shot 评测伪代码
subjects = load_mmlu_subjects()  # 57 subjects
all_results = []

for subject in subjects:
    dev_examples = load_dev(subject)      # fixed 5 examples per subject
    test_examples = load_test(subject)

    for q in test_examples:
        prompt = f"The following are multiple choice questions (with answers) about {subject}.\n"
        if k_shot > 0:
            prompt += format_examples(dev_examples[:k_shot], include_answer=True)
        prompt += format_question(q, include_answer=False)
        prompt += "Answer:"

        probs = model.next_token_probs(prompt, candidates=["A", "B", "C", "D"])
        pred = argmax(probs)
        all_results.append(pred == q.gold_answer)

accuracy = mean(all_results)
```

少样本提示的机制重点不在“训练”模型，而是在推理时给模型建立任务格式。提示开头说明“以下是关于某学科的多选题”，dev 示例展示题目、选项和答案，最后一个测试题只保留 `Answer:`。这相当于把任务、领域和输出约束都编码进上下文。论文强调这种设置更接近人类考试：人类通常通过阅读教材和练习少量样题理解考试格式，而不是用成千上万道同分布题目训练一个分类器。

MMLU 与传统监督式基准的核心差异是它弱化了“训练集”概念。传统 NLP benchmark 往往给出大量训练样本，模型可以通过微调学习数据集特定模式，甚至利用标注伪线索取得高分。MMLU 只给每个学科 5 道 few-shot 题，主体能力必须来自预训练阶段的知识积累和推理能力。论文在 Discussion 中明确把互联网预训练视为模型学习知识的主要阶段，MMLU 则是一次下游考试：它评估模型能否从大规模语料中提取并迁移知识，而不是能否拟合某个小任务训练集。

MMLU 的学科覆盖也刻意追求“广度 + 深度”。STEM 题要求数学、物理、化学、计算机等程序性推理；人文题包含法律、哲学、历史、逻辑谬误、道德场景；社会科学题涉及经济学、政治、心理学、社会学；Other 则收纳医学、会计、管理、营销、全球事实等难以归类但现实重要的领域。这样的设计使得一个模型不能只在常识问答或语言推断上表现良好，它必须暴露自己在专业知识、符号计算、价值判断和长尾事实上的真实能力分布。

论文一个重要发现是模型表现“偏科”。GPT-3 X-Large few-shot 的整体平均准确率达到 43.9%，但各学科差异很大，在部分 verbal knowledge 题上明显较好，在 College Chemistry、Elementary Mathematics 等计算或过程性题目上较差。论文用 PEMDAS 例子说明：模型可能知道“先乘除后加减”的文字规则，却不能稳定把规则应用到具体计算题。这说明 MMLU 不只是知识检索测试，也在测试模型把知识转化为步骤化求解的能力。

MMLU 还把校准作为方法分析的一部分。对每个预测，可把模型对所选答案的概率看作置信度：

$$
\mathrm{conf}_i=\max_{a\in\mathcal{A}}P_\theta(t_a\mid x_i)
$$

若按学科聚合，理想模型应满足平均置信度接近真实准确率。论文发现 GPT-3 在很多学科中置信度与准确率并不匹配，Elementary Mathematics 的 zero-shot RMS calibration error 达到 19.4%。这对大模型应用很关键：一个模型即使平均准确率上升，如果不能可靠表达不确定性，在法律、医学、伦理等高风险领域仍然危险。

> 💡 关键：MMLU 的贡献不是提出复杂模型结构，而是提出一种可扩展、可复用、低歧义的通用能力测量协议。它把“多任务学科考试 + 少样本提示 + 选项 token 概率 + 准确率/校准分析”组合成了后续 LLM benchmark 的模板。

#### 🧪 练习题
```yaml
question: "MMLU 为什么主要采用 zero-shot/few-shot 多选题评测，而不是为每个学科提供大量训练题进行微调？"
options:
  - "为了减少模型参数量"
  - "为了评估模型从预训练中获得并迁移学科知识的能力，避免依赖同分布训练集拟合"
  - "为了让所有模型只能输出自然语言解释"
  - "为了把所有题目都转换成二分类任务"
answer: 1
explain: "MMLU 的核心是测量预训练模型在少量任务格式提示下的广域知识和推理能力，而不是测量模型对某个学科训练集的监督拟合能力。"
```
