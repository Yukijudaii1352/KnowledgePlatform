### C-Eval：中文多级多学科基础模型评测

```yaml
id: c_eval
name: C-Eval
full_name: 中文综合能力评测 (Chinese Evaluation Suite)
year: "2023"
org: 清华大学/上海交通大学
paper_url: https://arxiv.org/abs/2305.08322
category: general
parent: mmlu
motivation: 中文学术能力4级难度分层评测
```

#### 📝 一句话总结
C-Eval 提出了首个面向中文语境的多级、多学科基础模型评测套件，用 52 个学科、13,948 道四选一考试题系统评估模型的中文知识、推理和专业能力。它解决了直接翻译英文 MMLU 无法覆盖中国文化、法律、教育和职业考试语境的问题，并用 C-Eval Hard 专门放大复杂中文推理短板。

#### 🎯 核心要点
- 评测集包含 13,948 道中文多选题，覆盖 52 个学科、4 个难度层级：初中、高中、大学、职业资格。
- 学科按主题聚合为 STEM、人文、社会科学和 Other 四类，兼顾基础教育、大学专业和现实职业考试。
- 数据切分为 Dev 260、Valid 1,346、Test 12,342，其中每个学科 Dev 集有 5 个示例用于 five-shot 评测。
- 数据主要来自 mock exams、小规模地方考试、PDF/Word 文档和部分授权题库，避免直接使用高曝光国家考试题以降低污染风险。
- 所有题目统一为四个选项且仅一个正确答案，复杂数学和理工题中的公式被人工转换为标准 LaTeX。
- Dev 集示例额外提供解释，解释先由 GPT-4 生成 step-by-step reasoning，再经人工修订，用于 few-shot chain-of-thought 设置。
- C-Eval Hard 由 8 个高难 STEM 科目组成，包括高等数学、离散数学、概率统计、大学物理、大学化学、高中数学、高中物理、高中化学。
- 评测设置包括 zero-shot/five-shot answer-only 和 five-shot chain-of-thought，通过正则抽取 A/B/C/D 并计算准确率。
- 测试集标签不公开，官方通过网站提交预测返回 test accuracy，以维持排行榜公平性。

#### 🔬 深入细节

![C-Eval 学科与难度总览](https://raw.githubusercontent.com/hkust-nlp/ceval/main/resources/overview.png)
*图：C-Eval 官方仓库中的 overview 图，对应论文 Figure 1，展示 52 个学科及其初中、高中、大学、职业四级难度分布。*

C-Eval 的出发点是中文 LLM 评测与中文 LLM 发展之间存在明显错位。MMLU、BIG-bench、HELM 等基准主要以英文知识和英文用户语境为中心，即使翻译成中文，也会保留原始数据的地域和文化偏置。例如美国法律、美国历史、英文教育体系中的知识点，并不能充分评估模型服务中文用户时是否理解中国历史、思想政治、中文法律职业考试、教师资格、导游资格、公务员考试、注册会计师等真实场景。C-Eval 因此不是 MMLU 的简单翻译，而是按中文教育与职业考试体系重新构造的评测集。

C-Eval 的学科选择遵循“多维能力画像”原则。初中和高中层级选取中国标准教育体系中的主要科目，但排除以写作为主、缺少稳定四选一题型的部分语文学科；大学层级从中国教育部本科专业目录的 13 个门类中选 25 个代表学科，保证高等教育知识覆盖；职业层级参考国家职业资格目录选出 12 个代表性考试，如医师、法律职业资格、公务员、注册会计师等。这样构成的 52 个学科不是随机拼盘，而是从基础教育、大学专业、职业准入三个维度模拟中文用户所关心的真实知识结构。

从数据处理看，C-Eval 对“污染风险”做了专门控制。论文指出，普通高考或全国职业资格考试题在互联网上传播广，很可能已被 LLM 预训练语料抓取。为降低模型见过原题的概率，C-Eval 优先收集 mock exams、小规模地方考试、学校资料和 PDF/Word 文档。PDF/Word 题目需要 OCR、解析、清洗、去重、结构化和公式转换，这虽然增加了构建成本，但也减少了纯文本网页被预训练语料直接包含的概率。

数据统一为四选一格式。若原题少于四个选项则剔除，多于四个选项则随机删除错误选项，确保每题恰好四个候选且只有一个正确答案。对高等数学、物理、化学、离散数学等公式密集学科，作者人工转换 LaTeX，保证模型看到的是可解析、可复现的文本表达。最终数据统计为 STEM 20 科 4,495 题，人文 11 科 2,676 题，社会科学 10 科 2,845 题，Other 11 科 3,932 题，总计 13,948 题。

C-Eval 的基本 answer-only 评测可以抽象为“提示生成 + 答案抽取 + 准确率统计”。设第 \(i\) 题的题干和选项为 \(q_i\)，模型生成文本为 \(r_i=M_\theta(\mathrm{prompt}(q_i))\)，正则抽取函数为 \(g(\cdot)\)，则预测为：

$$
\hat{y}_i=g(r_i), \quad g(r_i)\in\{A,B,C,D,\varnothing\}
$$

其中 \(\varnothing\) 表示未能抽取有效选项，通常按错误计。准确率为：

$$
\mathrm{Acc}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}[\hat{y}_i=y_i]
$$

论文报告分类内平均和整体平均，使研究者既能看到总分，也能分析模型在 STEM、人文、社会科学、Other 或单个学科上的短板。

```python
# C-Eval answer-only / chain-of-thought 评测伪代码
subjects = load_52_subjects()
results = []

for subject in subjects:
    dev = load_dev(subject)      # 5 exemplars with answers and optional explanations
    valid_or_test = load_split(subject)

    for item in valid_or_test:
        if mode == "answer_only":
            prompt = build_ao_prompt(subject, dev[:k_shot], item)
            # 要求模型直接给出 A/B/C/D
        else:
            prompt = build_cot_prompt(subject, dev[:k_shot], item)
            # few-shot 示例包含解释，要求模型先推理再给答案

        response = model.generate(prompt)
        pred = regex_extract_choice(response)  # A/B/C/D or invalid
        results.append(pred == item.gold_answer)

accuracy = mean(results)
```

C-Eval 的 CoT 设计体现了它与普通多选题集的区别。Dev split 中每个学科 5 道样例不仅给答案，还给 reasoning explanation；这些解释先由 GPT-4 根据标准答案生成，再由人工修订。five-shot CoT 评测时，提示中会展示“题目、选项、答案、解释”的完整格式，再要求模型对新题作答。这使 C-Eval 既可以作为传统四分类评测，也可以作为中文推理链评测，尤其适合分析模型是否能把数学、物理、化学等复杂题拆成中间步骤。

C-Eval Hard 是论文最有诊断价值的子集之一。它选取 8 个需要复杂公式和非平凡推理的 STEM 学科，目标不是扩大覆盖面，而是提高“难题密度”。普通综合平均可能被记忆型、人文型题目拉高，掩盖模型在严格推理上的弱点；C-Eval Hard 则专门考察高等数学、离散数学、概率统计、大学物理等高门槛能力。论文报告 GPT-4 在 C-Eval Hard 上也只有 53.3% 左右准确率，说明中文复杂推理远未被现有模型解决。

与 MMLU 相比，C-Eval 的创新不是改变多选题评测接口，而是把评测语境本地化、难度分层化，并引入中文考试体系中的职业与地区知识。MMLU 证明了多任务学科考试可以衡量模型广域知识，C-Eval 则进一步说明“广域知识”必须与目标语言用户的社会现实对齐。一个在英文 MMLU 上高分的模型，未必理解中国法律职业资格、思想政治、中文历史、注册工程师考试或中文公式表达。

实验设置也反映了中文评测的实用性。C-Eval 同时评估 GPT-4、ChatGPT、Claude、Bloomz-mt、LLaMA、GLM-130B、ChatGLM、MOSS、Chinese-LLaMA/Alpaca 等模型，覆盖闭源 API、多语开源模型和中文定向模型。结果显示 GPT-4 是唯一平均超过 60% 的模型，零样本 answer-only 平均约 66.4%；但很多中文定向模型在中文知识题上能缩小与 ChatGPT 的差距，在 C-Eval Hard 这类推理题上仍接近随机。这说明中文语料适配和复杂推理能力是两条不同能力轴。

> 💡 关键：C-Eval 的价值在于给中文 LLM 一个可拆解的能力坐标系。总分告诉你模型是否强，52 个学科告诉你模型哪里强，四级难度告诉你强到什么层级，C-Eval Hard 则专门暴露复杂推理的上限。

#### 🧪 练习题
```yaml
question: "C-Eval Hard 的主要作用是什么？"
options:
  - "提高题库中初中题目的比例"
  - "通过 8 个高难 STEM 学科集中评估中文复杂推理能力"
  - "将所有中文题翻译为英文后再评测"
  - "只评估模型的开放式写作能力"
answer: 1
explain: "C-Eval Hard 由高等数学、离散数学、概率统计、大学/高中理化等高难科目组成，用于放大模型在中文复杂推理中的短板。"
```
