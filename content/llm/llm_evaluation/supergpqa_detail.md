### SuperGPQA

```yaml
id: supergpqa
name: SuperGPQA
full_name: 超级研究生级问答 (SuperGPQA)
year: "2025"
org: ByteDance
paper_url: https://arxiv.org/abs/2501.12345
category: frontier_2026
parent: gpqa
motivation: 285学科26K问题大规模扩展
```

#### 📝 一句话总结

SuperGPQA 将 GPQA 式研究生级专业评测扩展到 285 个学科和 26,529 道问题，并用 Human-LLM 协同过滤去除平凡或歧义题，衡量模型在长尾专业知识上的真实覆盖。

#### 🎯 核心要点

- 覆盖 13 个大类、72 个领域、285 个研究生级学科，总计 26,529 道问题
- 每个学科至少 50 道题，显著扩展 GPQA 对生物、物理、化学之外的覆盖
- 使用 Human-LLM collaborative filtering，通过模型作答与专家反馈迭代删除简单、歧义或低质量题
- 标注组织包含 80 多名专家标注者和交互式协作系统
- 结果显示当前强模型在许多长尾领域仍有明显短板，DeepSeek-R1 在公开报告中最高约 61.82%
- Manifest 中的 paper_url 为不可直接读取的占位链接，正文补充参考官方项目页与实际 arXiv:2502.14739

#### 🔬 深入细节

![SuperGPQA 总览](https://raw.githubusercontent.com/SuperGPQA/SuperGPQA/main/images/main_final.png)
*图：SuperGPQA 官方仓库中的总览图，展示学科层级、数据规模和协同过滤流程。*

```python
# SuperGPQA 构造与评测伪代码
for discipline in graduate_disciplines:
    candidates = expert_annotators.write_questions(discipline, min_count=50)
    for question in candidates:
        llm_answers = [model.solve(question) for model in screening_models]
        expert_feedback = expert_review(question, llm_answers)
        if expert_feedback.is_trivial or expert_feedback.is_ambiguous:
            continue
        if not expert_feedback.has_unique_correct_answer:
            continue
        supergpqa.append(question)

for model in evaluated_models:
    for question in supergpqa:
        pred = extract_choice(model.generate(format_mcq(question)))
        update_scores(model, question.discipline, pred == question.answer)

report(sample_level=True, subfield_level=True, field_level=True, discipline_level=True)
```

##### 动机与背景

GPQA 证明了“专家可解、非专家难解”的科学题可以有效检验前沿模型，但它主要集中在生物、物理和化学。人类知识远远超过这几个主流 STEM 学科，轻工业、农业、服务科学、工程分支和大量交叉学科在现有基准中覆盖不足。

SuperGPQA 的目标是让评测从少数高关注学科扩展到大规模研究生级知识谱系。它关心的不只是模型在热门学科的峰值能力，而是跨 285 个学科时是否存在明显的长尾短板。

##### 核心机制

数据层级被组织为 discipline、field、subfield 等多层标签，方便从样本、子领域、领域和学科多个粒度汇总分数。这样一个模型的总体分数不会掩盖某些细分专业的系统性失败，例如在计算机科学强但在农业工程、食品科学或材料工艺弱。

Human-LLM 协同过滤是质量控制核心。模型先尝试作答候选题，专家再结合模型表现判断题目是否太简单、是否有歧义、是否答案唯一。这个循环既利用 LLM 加速筛查，又保留专家对专业正确性的最终把关。

##### 评测指标

SuperGPQA 的准确率可以在多个层级聚合：

$$Acc_g=\frac{1}{|D_g|}\sum_{(x,y)\in D_g}\mathbb{1}[\hat{y}=y]$$

其中 \(g\) 可以是样本总体、某个子领域、某个领域或某个学科。多层聚合能减少热门学科题量对总体分数的支配，帮助观察模型知识覆盖是否均衡。

##### 与 GPQA 的区别

GPQA 更像高质量小规模专家金标准，SuperGPQA 则是大规模长尾扩展。前者强调 Google-proof 与深度科学推理，后者强调专业覆盖面、标注管理和协同过滤流程。两者互补：GPQA 适合高强度专家监督研究，SuperGPQA 适合发现模型知识图谱中的覆盖缺口。

> ⚠️ 注意：此条 YAML 保留 manifest 中的 `paper_url`，但该链接不可直接读取；实际论文公开页为 `https://arxiv.org/abs/2502.14739`，官方项目页为 `https://supergpqa.github.io/`。

#### 🧪 练习题

```yaml
question: "SuperGPQA 相比 GPQA 的主要扩展是什么？"
options:
  - "只保留物理、化学、生物三类题"
  - "扩展到 285 个研究生级学科，并用 Human-LLM 协同过滤控制题目质量"
  - "把所有题目改为开放作文"
  - "取消专家标注以提升规模"
answer: 1
explain: "SuperGPQA 的核心是大规模学科覆盖和专家参与的 Human-LLM 过滤，而不是简单增加题量。"
```
