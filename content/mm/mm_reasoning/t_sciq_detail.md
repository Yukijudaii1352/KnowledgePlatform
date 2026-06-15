### T-SciQ — 教学式科学问答 (Teaching Multimodal CoT via LLM Signals)

```yaml
id: t_sciq
name: T-SciQ
full_name: "教学式科学问答 (Teaching Multimodal CoT via LLM Signals)"
year: "2024"
org: "HKUST"
paper_url: "https://ojs.aaai.org/index.php/AAAI/article/view/29884"
category: mm_cot
parent: "mm_cot"
motivation: "LLM信号教导多模态推理，解决数据稀缺"
```

#### 📝 一句话总结

T-SciQ 用大语言模型 SciTeacher 自动生成并混合普通 CoT 与计划式 PCoT 教学信号，再微调小型多模态学生模型，解决了 ScienceQA 中人工 rationale 获取昂贵且质量受限的问题。

#### 🎯 核心要点

- Teacher-student 框架：SciTeacher 生成 CoT/PCoT 教学数据，SciStudent 通过监督微调学习
- QA-CoT 样本：用问题、上下文、选项和正确答案提示 LLM 生成详细解释
- QA-PCoT 样本：通过 lecture generation、plan generation、rationale generation 三步生成计划式推理
- 数据混合策略：按 ScienceQA skill 在验证集上选择 CoT 或 PCoT 教学信号
- 学生模型沿用 Multimodal-CoT 两阶段结构：先学 rationale generation，再学 answer inference
- 不依赖人工 CoT：用 LLM 生成信号替换 ScienceQA 原始人工解释
- 在 ScienceQA 上显著提升小模型，Multimodal-T-SciQ 最高达到 96.18% 准确率

#### 🔬 深入细节

##### 核心架构示意图

![T-SciQ 三阶段教学流程](https://ar5iv.labs.arxiv.org/html/2305.03453/assets/figures/aaai2024_main.png)
*图：T-SciQ 先生成 CoT 与 PCoT 两类教学数据，再按验证效果混合，最后用混合信号微调学生模型。*

##### 算法伪代码

```python
# 1. 生成两类教学信号
for example in scienceqa_train:
    qa_cot = sci_teacher(
        question=example.question,
        context=example.context,
        options=example.options,
        correct_answer=example.answer,
        instruction="Please give me a detailed explanation."
    )

for skill, examples in group_by_skill(scienceqa_train):
    lecture = sci_teacher(f"Skill: {skill}. QA pairs: {examples}. Give a lecture.")
    plan = sci_teacher(f"Skill: {skill}. Lecture: {lecture}. Devise a step-by-step plan.")
    for example in examples:
        qa_pcot = sci_teacher(
            f"Skill: {skill}. Lecture: {lecture}. Plan: {plan}. "
            f"QA pair: {example}. Carry out the plan step by step."
        )

# 2. 按 skill 选择更有效的教学信号
for skill in skills:
    err_cot = validate_student(skill, signal="CoT")
    err_pcot = validate_student(skill, signal="PCoT")
    chosen_signal[skill] = "PCoT" if err_pcot < err_cot else "CoT"

# 3. 用混合教学信号训练学生
for example in scienceqa_train:
    rationale = generated_signal[chosen_signal[example.skill]][example.id]
    train_multimodal_cot_student(example, rationale, example.answer)
```

##### 动机与背景

ScienceQA 提供了题目、图像、选项和解释，但高质量 CoT 标注昂贵，且人工解释可能缺少外部知识或不适合训练小模型。T-SciQ 的核心问题是：能否让强 LLM 作为老师，自动生成更适合学生模型学习的推理信号。

与直接让 GPT-4/GPT-3.5 推理不同，T-SciQ 关注的是“教学数据”。SciTeacher 不在测试时替学生答题，而是在训练前生成 rationale，随后由小得多的 SciStudent 通过监督学习掌握多模态 CoT 能力。

##### QA-CoT：普通解释式教学

QA-CoT 使用非常直接的零样本模板，把 question、context、options 和 correct answer 都填入 prompt，并要求 LLM 给出详细解释。正确答案作为 hint 可以减少老师生成错误 rationale 的概率：

$$
R_{\text{CoT}} = \mathrm{LLM}(Q,C,M,A,\text{instruction})
$$

这种信号适合相对简单的问题，因为老师只需解释为什么正确答案成立，不必显式规划解题步骤。

##### QA-PCoT：计划式教学

复杂 science question 往往需要先知道解题知识，再制定步骤。T-SciQ 因此生成 plan-based CoT，分三步完成。第一步按 skill 生成一条通用 lecture；第二步基于 lecture 和同 skill 的样例生成解题 plan；第三步将 lecture、plan 和具体 QA pair 一起输入 LLM，让其按计划执行并生成 rationale。

可以把 PCoT 看成：

$$
R_{\text{PCoT}}=\mathrm{LLM}(Q,C,M,A,\mathrm{Plan}(\mathrm{Lecture}(\text{skill})))
$$

它比普通 CoT 更适合复杂问题，因为学生看到的不只是结论解释，还有可复用的领域知识和解题流程。

##### 混合教学数据：按 skill 选择

T-SciQ 没有假设 PCoT 总是更好。对于简单问题，过长的计划式解释可能引入噪声；对于复杂问题，普通 CoT 又可能缺少分解。论文用验证集为每个 skill 选择更合适的信号：

$$
z_s^\*=\arg\min_{z\in\{\text{CoT},\text{PCoT}\}}\mathrm{Err}_{\text{val}}(s,z)
$$

如果某个 skill 上 PCoT 验证错误更少，就对该 skill 的训练样本使用 PCoT；否则使用 CoT。这个按技能粒度的选择比全局混合更稳，因为 ScienceQA 的不同技能难度差异很大。

> 💡 关键：T-SciQ 的“mixed LLM signals”不是简单拼接两份数据，而是用验证反馈决定每类科学技能更需要解释还是规划。

##### 学生训练流程

学生模型沿用 Multimodal-CoT 的两阶段范式。第一阶段学习从题目、选项和视觉输入生成老师提供的 rationale；第二阶段学习在题目、视觉输入和 rationale 条件下预测答案。区别在于监督信号从人工 annotated rationale 换成 T-SciQ 生成的混合 teacher rationale。

论文默认使用 GPT-3.5 text-davinci-003 作为 teacher，并在 UnifiedQA、Multimodal-CoT 等学生架构上验证。学生模型比 teacher 小约 200 倍，但通过高质量教学信号在 ScienceQA 上取得显著提升，最强 Multimodal-T-SciQ 达到 96.18%。

##### 与 Multimodal-CoT、DDCoT 的区别

Multimodal-CoT 主要设计了两阶段学生架构，并使用已有 rationale 标注训练；T-SciQ 主要解决训练信号来源和质量问题。DDCoT 强调推理/识别职责分离与幻觉控制；T-SciQ 强调把 LLM 生成的不同类型教学信号按问题技能混合，提升小模型学习效率。

#### 🧪 练习题

```yaml
question: "T-SciQ 为什么要混合 QA-CoT 和 QA-PCoT 两类教学信号？"
options:
  - "因为所有问题都只适合最长的推理链"
  - "因为简单问题更适合普通解释，复杂问题更需要计划式分解"
  - "因为学生模型不能读取图像"
  - "因为 CoT 和 PCoT 分别对应不同的答案选项编号"
answer: 1
explain: "T-SciQ 按 skill 在验证集上选择 CoT 或 PCoT，避免简单问题被过度规划干扰，同时让复杂问题获得更清晰的解题计划。"
```
