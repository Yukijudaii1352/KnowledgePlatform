### ISR-LLM — 迭代自精炼的长程任务规划

```yaml
id: "isr-llm"
name: "ISR-LLM"
full_name: "迭代自精炼LLM (Iterative Self-Refined LLM)"
year: "2024"
org: "ICRA 2024"
paper_url: "https://ieeexplore.ieee.org/document/10610065"
category: "task_planning"
parent: "llm-planner"
motivation: "生成-验证-修正迭代自精炼"
```

#### 📝 一句话总结

ISR-LLM 提出“翻译成 PDDL → LLM 生成计划 → 验证器反馈 → LLM 修正”的迭代自精炼框架，用验证反馈提高 LLM 长程顺序任务计划的可行性和正确性。

#### 🎯 核心要点

- **三阶段流程**：preprocessing 用 LLM translator 把自然语言转为 PDDL domain/problem，planning 用 LLM planner 生成动作序列，self-refinement 用 validator 迭代修正。
- **两类验证器**：LLM-based self-validator 成本低、通用；external validator 反馈更精确，但需要外部工具或定制实现。
- **PDDL 中间表示**：把任务、对象、前置条件和目标状态显式化，使验证与错误定位更系统。
- **CoT 计划提示**：在 planner 和 self-validator prompt 中引入 chain-of-thought 风格中间推理，改善复杂任务分解。
- **错误驱动修正**：验证器指出首个错误动作或整体错误原因，LLM planner 基于反馈生成新计划。
- **多规划域评估**：在 Cooking、Blocksworld、Ball Moving 等长程顺序规划域中，相比直接 LLM planning 提升成功率。

#### 🔬 深入细节

##### 框架图

![ISR-LLM 框架图](https://www.researchgate.net/figure/figure/Overview-of-the-proposed-ISR-LLM-framework-It-consists-of-three-steps-preprocessing_fig1_373450692/download)
*图：ISR-LLM Figure 1 的公开预览/下载入口。论文图直链在 ResearchGate 与 IEEE 页面上受限；本精读依据 IEEE 元信息、arXiv:2308.13724 源文件和作者公开 PDF，源文件确认 Figure 1 为 preprocessing、planning、iterative self-refinement 三阶段框架。*

##### 算法伪代码

```python
# ISR-LLM: iterative self-refined planning
domain_pddl, problem_pddl = LLM_translator(natural_language_task, examples)

plan = LLM_planner(
    domain=domain_pddl,
    problem=problem_pddl,
    chain_of_thought=True,
)

for i in range(max_refine_iters):
    ok, feedback = validator.check(plan, domain_pddl, problem_pddl)
    if ok:
        return plan

    plan = LLM_planner.refine(
        domain=domain_pddl,
        problem=problem_pddl,
        previous_plan=plan,
        validator_feedback=feedback,
    )

return plan  # 若仍未通过，返回最后一次计划并标记失败
```

##### 方法拆解

LLM 在长程任务规划中常犯两类错误：一是物理或逻辑不可行，例如没打开容器就取物，手里已有物体还继续抓取；二是目标不完整，例如完成前几个子目标后提前结束。ISR-LLM 不假设一次生成就正确，而是把规划变成可验证、可反馈、可修正的循环。

第一阶段是 preprocessing。LLM translator 把自然语言任务转成 PDDL 表示，包括 objects、predicates、initial state 和 goal。PDDL 的作用不是让传统 planner 全权接管，而是提供形式化状态机，使后续 validator 能判断动作前置条件、状态变化和目标达成情况。相比纯自然语言上下文，PDDL 更容易暴露“这个动作在当前状态不能执行”的错误。

第二阶段是 planning。LLM planner 读取 domain/problem PDDL，并结合 few-shot examples 和 CoT 提示生成动作序列。可以把初始计划表示为：

$$\pi_0 = \operatorname{LLM}_{\text{plan}}(D_{\text{PDDL}}, P_{\text{PDDL}}, \mathcal{E})$$

其中 \(D\) 是 domain，\(P\) 是 problem，\(\mathcal{E}\) 是示例和推理提示。

第三阶段是 iterative self-refinement。验证器检查 \(\pi_t\)，若发现错误则生成反馈 \(f_t\)，LLM planner 再基于反馈修正：

$$\pi_{t+1}=\operatorname{LLM}_{\text{refine}}(D_{\text{PDDL}}, P_{\text{PDDL}}, \pi_t, f_t)$$

循环直到无错误或达到最大迭代次数。外部验证器通常能精确指出第几个动作违反了哪个前置条件，因此修正更有效；LLM self-validator 不需要额外工程，但反馈可能更粗糙。

与 LLM-Planner 相比，ISR-LLM 更强调形式化验证与错误反馈，而不是只在执行失败后重规划。与 Code as Policies 相比，它不让 LLM 生成任意可执行程序，而是生成受 PDDL 约束的动作序列，更适合需要严谨前置条件和目标条件检查的任务规划域。

> 💡 关键：ISR-LLM 的“自精炼”不是让模型反思一句话，而是用验证器把计划错误转成结构化反馈，再喂回 planner 生成修正版。

#### 🧪 练习题

```yaml
question: "ISR-LLM 中 PDDL 中间表示的主要作用是什么？"
options:
  - "替代所有 LLM 调用"
  - "显式描述对象、状态、动作前置条件和目标，使验证器能系统检查计划错误"
  - "把机器人视觉图像压缩成向量"
  - "只用于论文排版"
answer: 1
explain: "PDDL 将规划问题形式化，validator 可以据此检查动作是否满足前置条件、状态是否正确更新、目标是否达成。"
```
