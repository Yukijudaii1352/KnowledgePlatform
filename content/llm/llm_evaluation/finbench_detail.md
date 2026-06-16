### FinBench

```yaml
id: finbench
name: FinBench
full_name: 金融领域评测 (Financial Benchmark)
year: "2024"
org: 多机构联合
paper_url: https://arxiv.org/abs/2407.00365
category: specialized
parent: "—"
motivation: 金融知识风险评估市场分析专项
```

#### 📝 一句话总结
FinBench 在论文中以 IDEA-FinBench 形式提出，用 CPA 与 CFA 等权威金融考试题构建双语、多题型、多学科评测，并配套 IDEA-FinKER 检索式金融知识增强流程来分析大语言模型的金融知识掌握与推理能力。

#### 🎯 核心要点
- IDEA-FinBench 使用中国 CPA 与国际 CFA 试题作为主要来源，总计 4,617 道金融专业题，其中 CPA 2,616 道、CFA 2,001 道。
- 覆盖中英文、4 类题型和 16 个金融学科，CPA 包括会计、审计、经济法、财务管理、战略、税法，CFA 包括伦理、数量方法、经济学、财报分析、公司金融、权益、固收、衍生品、另类投资、组合管理。
- 数据按 dev/val/test 组织；dev 每个科目给出少量题干、选项、答案和解析，用于 few-shot prompt 构造。
- 评测设置包含 zero-shot 与 few-shot，也包含 chain-of-thought 和 answer-only 两种回答模式。
- answer-only 模式把输出限制在选项词表，如 A/B/C/D，用于减少自由生成解析误差并直接估计选项概率偏好。
- 论文评测最多 21 个通用与金融领域 LLM，并提供模块化评测套件，支持并行评测、日志记录、跨语言 prompt 和不同模型接口。
- 同一论文提出 IDEA-FinKER：用 FinCorpus 检索相似金融题作为 few-shot 示例，通过 Retrieval-based Few-shot Learning 将金融知识软注入上下文。

#### 🔬 深入细节
![FinKER 检索式 few-shot 流程图](https://arxiv.org/html/2407.00365v1/x9.png)
*图：论文 Figure 4.2 展示 Retrieval-based Few-shot Learning 的工作流；FinBench 负责评测，FinKER 则用外部金融题库检索相似示例来增强模型在该类题目上的回答。*

FinBench 的核心动机是：通用大模型在 MMLU、数学、代码等综合基准上的表现并不能说明它具备金融从业所需的专业知识。金融任务同时要求概念记忆、法规理解、数值计算、风险判断和案例分析。论文因此选择 CPA 与 CFA 这两类高度制度化的考试作为题源，因为它们天然覆盖金融行业的关键知识结构，并且答案具有相对明确的标准。

```python
# IDEA-FinBench 评测流程与 FinKER/RBFL 增强流程的合并伪代码
for subject in finbench_subjects:
    dev_examples = load_dev_examples(subject, k=5)  # 含题干、选项、答案、解析
    test_items = load_eval_items(subject)

    for item in test_items:
        if mode == "zero-shot":
            context = []
        elif mode == "few-shot":
            context = dev_examples
        elif mode == "retrieval-based-few-shot":
            context = retrieve_top_k(FinCorpus_index, item.question, K)

        prompt = build_finance_prompt(context, item.question, item.options)

        if decoding == "answer-only":
            pred = argmax_option(model, prompt, vocab=["A", "B", "C", "D"])
        else:
            reasoning = model.generate(prompt + "请逐步推理并给出最终选项")
            pred = parse_final_option(reasoning)

        score(item, pred)
```

FinBench 的数据组织强调“考试题可复现”。原始数据采用 JSON 格式；对于 CFA Level 2 中常见的案例题、表格和图示，论文使用表格识别 API 将图片中的表格转为结构化 JSON，再转换为 Markdown 放回题面，避免模型因无法读取图片而被不公平惩罚。每个科目进一步拆成 CSV：dev 集包含题干、四个选项、答案和详细解析；val 集保留答案但去掉解析；test 集去掉答案和解析。这个设计使评测既能支持 few-shot，也能支持只看题干的 zero-shot。

题目类型上，CPA 既有单选也有多选，CFA Level 1 主要是较直接的单选，CFA Level 2 更偏案例分析，题干可能包含背景材料、财务表格和多个相关问题。论文的统计表显示总题数为：

$$
N_{\text{total}}=N_{\text{CPA}}+N_{\text{CFA}}=2616+2001=4617
$$

若按学科记分，某学科 \(s\) 的 accuracy 可写为：

$$
\text{Acc}_s=\frac{1}{N_s}\sum_{i=1}^{N_s}\mathbf{1}[\hat{a}_i=a_i]
$$

对于多选题，实际评测应使用集合精确匹配：

$$
\mathbf{1}[\hat{A}_i=A_i]=\mathbf{1}[\text{set}(\hat{A}_i)=\text{set}(A_i)]
$$

这比单选更严格，因为模型漏选一个正确项或多选一个干扰项都会失败，也更贴近金融考试对完整判断的要求。

论文比较了 zero-shot/few-shot 与 CoT/answer-only 两类推理设置。zero-shot 更适合观察经过 instruction tuning 的模型能否直接理解金融题；few-shot 则提供同科目示例，帮助模型对齐题型和答案格式。CoT 要求模型先展开推理再给答案，适合复杂计算或案例题；answer-only 则约束下一 token 只能来自候选选项，例如：

$$
\hat{a}=\arg\max_{o\in\{A,B,C,D\}}p_\theta(o\mid \text{prompt})
$$

answer-only 的优点是减少“解释正确但最终选项解析失败”或“输出多个候选答案”的工程噪声；缺点是无法观察模型的推理链，也可能掩盖它凭先验猜答案的问题。因此 FinBench 把两种模式都保留，用于区分“能选对”和“能解释为什么选对”。

IDEA-FinKER 是论文中与 FinBench 配套的知识增强框架。它构建 FinCorpus，包含约 50 万个中文金融问题，覆盖金融、经济、保险、资格认证等内容。其 soft-injecting 范式不微调模型参数，而是把输入问题 \(p\) 编码成向量，从 FinCorpus 检索相似题，把这些题作为 demonstrations 加入上下文。论文中的 Retrieval-based Few-shot Learning 可抽象为：

$$
e_i=(p_i,o_i,a_i),\quad D=\{I,e_1,\ldots,e_k\}
$$

其中 \(I\) 是系统指令，\(e_i\) 是由问题、选项、答案构成的示例。检索器希望选择与当前题 \(p\) 相似的 \(K\) 个示例：

$$
\text{topK}(p)=\arg\max_{e\in \text{FinCorpus}} \text{sim}(\text{Enc}(p),\text{Enc}(e.p))
$$

随后构建上下文 \(\texttt{ctx}=\text{topK}(p)\cup\{p\}\)，交给 LLM 生成答案 \(\alpha\)。直觉是，同题型、同知识点的金融题比随机 few-shot 示例更能激活模型内部相关概念，尤其对会计分录、税法条款、组合管理公式等局部知识有效。

> 💡 关键：FinBench 不是只问“金融常识”的静态问答集，而是用考试题结构测试模型能否在受限选项中完成专业判断。FinKER 则说明论文作者认为金融 LLM 的提升路径不仅是更大模型，还包括从外部金融题库中检索更相关的示例来做上下文知识注入。

与通用基准相比，FinBench 的优势是覆盖金融职业知识体系，能够区分记忆型科目和计算/推理型科目。例如 CPA 的审计、战略更偏法规和概念记忆，会计、财务管理、税法更偏计算与规则适用；CFA Level 2 的 case study 则要求模型从背景材料中提取条件并连续推断。对金融大模型评估来说，这些维度比单一 overall accuracy 更有诊断价值：模型可能在伦理和概念题上表现稳定，却在多选、表格、衍生品定价或税法计算上明显失败。

#### 🧪 练习题
```yaml
question: "FinBench/IDEA-FinBench 中 answer-only 模式的主要目的是什么？"
options:
  - "让模型生成更长的金融分析报告"
  - "把输出限制在候选选项上，减少自由生成解析误差并直接比较选项概率"
  - "用检索器替代大语言模型完成全部推理"
  - "只评估模型的中文能力，不评估英文 CFA 题"
answer: 1
explain: "answer-only 将输出空间约束到 A/B/C/D 等选项，适合客观题自动评分；CoT 模式则用于观察推理过程。"
```
