### GAIA：面向通用 AI 助手的现实任务评测

```yaml
id: gaia
name: GAIA
full_name: 通用AI助手评测 (GAIA)
year: 2024
org: Meta/HuggingFace
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/25ae35b5b1738d80f1f03a8713e405ec-Abstract-Conference.html
category: benchmark
parent: agentbench
motivation: 现实世界复杂任务评测
```

#### 📝 一句话总结

GAIA 用需要推理、检索、工具使用和多模态理解的真实问题评估通用 AI 助手，强调答案可自动验证但求解过程接近人类日常任务。

#### 🎯 核心要点

- **核心问题**：现有基准常偏向考试题或封闭知识，而真实助手任务需要搜索、文件理解、视觉和多步推理。
- **数据规模**：GAIA 包含数百个精心设计的问题，并按难度分成多个等级。
- **评测原则**：问题对人类通常清晰可解，答案短且明确，便于自动打分。
- **能力要求**：模型需要网页浏览、工具调用、多模态处理、长程计划和可靠验证。
- **代表结论**：人类表现远高于当时的强模型，说明通用助手仍存在明显现实任务差距。

#### 🔬 深入细节

![GAIA benchmark thumbnail](https://cdn-thumbnails.huggingface.co/social-thumbnails/gaia-benchmark.png)

*图源：Hugging Face GAIA benchmark 公开页面缩略图；论文图与数据说明见 ICLR 2024 GAIA 摘要页。*

```python
def solve_gaia_question(agent, question, attachments):
    workspace = load_attachments(attachments)
    plan = agent.plan(question, workspace)
    evidence = []

    for step in plan:
        if step.kind == "web_search":
            evidence.append(search_web(step.query))
        elif step.kind == "tool":
            evidence.append(run_tool(step.tool, step.args, workspace))
        elif step.kind == "vision":
            evidence.append(inspect_image(step.file, step.query))
        plan = agent.update_plan(question, evidence)

    answer = agent.final_answer(question, evidence)
    return normalize(answer)
```

**方法动机**：GAIA 试图区分“会答题的模型”和“能当助手的系统”。许多问题不难读懂，但需要跨网页、图片、文件和计算工具收集证据；可将求解过程看作寻找证据集 $E$，使最终答案满足 $answer=g(question,E)$。

**任务设计**：GAIA 的问题避免开放式主观评价，要求最终答案短、明确、可自动匹配。与此同时，它保留真实任务的多步骤特征，例如查找网页信息、读取附件、比较数据、进行计算或识别图像内容。

**难度分层**：问题按需要的步骤数、工具复杂度和推理深度划分等级。低等级可能只需一次搜索和简单推理，高等级则要求多轮证据整合和错误排除；这种分层有助于分析模型到底卡在检索、工具使用还是最终推理。

**评测意义**：GAIA 的重要发现是人类在该基准上表现很高，而当时具备插件能力的强模型仍显著落后。这说明通用 AI 助手的瓶颈不只是知识缺口，还包括任务分解、证据追踪、工具可靠使用和最终答案校验。

#### 🧪 练习题

```yaml
question: GAIA 题目的一个重要设计原则是什么？
options:
  - A. 最终答案短且明确，便于自动评测
  - B. 所有题目都必须是主观作文
  - C. 禁止使用任何外部工具
  - D. 只测试闭卷数学题
answer: A
explain: GAIA 强调现实任务复杂性，但仍让最终答案可自动验证。
```
