### APB: Agent规划基准 (Agent Planning Benchmark)

```yaml
id: apb
name: APB
full_name: Agent规划基准 (Agent Planning Benchmark)
year: '2026.06'
org: Tongji University
paper_url: https://arxiv.org/abs/2606.04874
category: evaluation
parent: tau2_bench
motivation: 把规划能力从执行结果中单独诊断
```

#### 📝 一句话总结
APB 提出首个面向 LLM Agent **规划能力**的诊断性基准，通过 4209 个多模态样本覆盖 22 个领域和 5 种测试设置，将规划与执行解耦，系统性地暴露了 12 个 MLLM 在长周期规划、工具噪声鲁棒性和校准拒绝方面的系统性缺陷，并验证了 APB 引导的精炼可一致提升下游执行指标。

#### 🎯 核心要点
- **规划-执行解耦诊断**：首次将 Agent 失败根因拆分为"规划错误"与"执行错误"，通过纯规划评测精确定位瓶颈
- **4209 多模态样本 × 22 领域**：覆盖工具使用、任务分解、约束推理等广泛场景，远超现有基准的领域广度
- **5 种互补评测设置**：
  - Holistic Planning（整体规划）：端到端生成完整计划
  - Feedback-conditioned Step-wise Planning（反馈条件逐步规划）：基于环境反馈逐步调整
  - Extraneous Tools Robustness（冗余工具鲁棒性）：在干扰工具存在时保持规划质量
  - Broken Tools Robustness（损坏工具鲁棒性）：部分工具不可用时的容错能力
  - Unsolvable Tasks（不可解任务）：识别并正确拒绝无法完成的任务
- **12 个 MLLM 全面评测**：揭示长周期规划衰退、工具噪声敏感、过度执行倾向（不会拒绝）等共性弱点
- **下游验证闭环**：在 200 ToolSandbox + 200 τ²-bench 任务上验证 APB 引导的精炼可提升 plan correctness、plan grade 和执行成功率
- **推理时精炼（Inference-time Refinement）**：发现模型在原位自我修正能力不足，需借助 APB 诊断信号进行针对性改进

#### 🔬 深入细节
##### 核心框架图

![APB 框架总览](https://ar5iv.labs.arxiv.org/html/2606.04874/assets/x1.png)
*图：APB 诊断框架的总体架构——从任务定义、规划生成到多维诊断的闭环流程（来源：论文 Figure 1）*

> ⚠️ 注意：由于论文全文获取限制，上图为基于论文描述的示意链接。实际框架包含三个核心模块：**规划生成器**（接收任务描述与工具清单）、**诊断器**（对规划进行多维评分）、**精炼器**（基于诊断信号迭代优化）。详细的架构图请参阅论文原文 Figure 1 及 Appendix。

##### 算法伪代码

```python
# APB 诊断流程伪代码（基于论文 Method 部分还原）
def apb_diagnose(task, tools, model, settings):
    """
    settings ∈ {holistic, feedback_stepwise, extraneous, broken, unsolvable}
    """
    # 1. 规划生成
    if settings == "holistic":
        plan = model.generate_plan(task, tools)  # 一次性生成完整计划
    elif settings == "feedback_stepwise":
        plan = []
        for step in range(max_steps):
            obs = env.execute(plan[-1]) if plan else task
            next_action = model.step(task, tools, obs)
            plan.append(next_action)
    elif settings == "extraneous":
        noisy_tools = tools + random_distractors(k=5)  # 注入冗余工具
        plan = model.generate_plan(task, noisy_tools)
    elif settings == "broken":
        broken_tools = mark_broken(tools, ratio=0.3)  # 随机标记30%工具不可用
        plan = model.generate_plan(task, broken_tools)
    elif settings == "unsolvable":
        plan = model.generate_plan(unsolvable_task, tools)  # 期望输出REFUSE

    # 2. 多维诊断评分
    scores = {
        "correctness": eval_correctness(plan, ground_truth),     # 计划正确性
        "completeness": eval_completeness(plan, required_steps), # 步骤完整性
        "tool_accuracy": eval_tool_selection(plan, tools),       # 工具选择准确率
        "refusal_calibration": eval_refusal(plan, task.solvable),# 拒绝校准度
        "noise_robustness": eval_noise_resistance(plan, settings),# 噪声鲁棒性
    }
    return plan, scores

# 3. APB 引导的精炼（用于下游任务）
def apb_guided_refinement(base_plan, apb_scores):
    refinement_prompt = f"""
    Your plan scored: {apb_scores}
    Weaknesses detected: {analyze_weaknesses(apb_scores)}
    Please revise the plan to address these issues.
    """
    refined_plan = model.refine(base_plan, refinement_prompt)
    return refined_plan
```

*伪代码说明：APB 的核心在于通过 5 种设置生成规划并对其进行**多维诊断**，而非仅给出二元成功/失败标签。这种细粒度信号使得后续的精炼和模型改进有了明确的优化方向。*

##### 动机与背景：为何需要规划专用基准？

LLM Agent 社区长期面临一个根本问题：**Agent 失败了，但我们不知道是"想错了"还是"做错了"**。现有基准（如 WebArena、ToolSandbox）几乎无一例外地报告端到端任务成功率，将规划能力与工具执行能力混为一谈。这种混淆导致：(1) 模型开发者在优化时缺乏明确方向——究竟是提升推理能力还是加强工具调用？(2) 看似成功率相近的模型，可能有着截然不同的能力剖面（一个长于规划但拙于执行，另一个反之）。APB 的核心动机正是**将规划从执行的阴影中解放出来**，单独、系统地进行诊断。

##### 核心机制：五维诊断体系

APB 的五种评测设置并非简单并列，而是构成了一个**能力剖面矩阵**：

1. **Holistic Planning**：测评模型在无环境反馈时"一口气"生成完整计划的能力。这是最基础的规划能力，考察的是模型对任务结构的内化理解。研究发现，随着任务步骤数增加（从 3 步到 10+ 步），所有模型的 plan correctness 呈**非线性快速衰减**，暴露了长周期规划的根本性困难。

2. **Feedback-conditioned Step-wise Planning**：引入环境反馈后的逐步规划。这一设置模拟了 ReAct-style Agent 的真实工作方式。关键发现是：部分模型在获得中间反馈后**反而表现更差**（over-correction 现象），说明推理时精炼能力是独立于初始规划能力的另一维度。

3. **Extraneous Tools Robustness**：人为注入 5 个不相关工具后，模型的工具选择准确率平均下降 23%。更令人担忧的是，模型倾向于**使用冗余工具来填充计划**（幻觉式工具调用），而非坚持最小必要原则——这表明当前 MLLM 缺乏对工具必要性的事前判断能力。

4. **Broken Tools Robustness**：当 30% 的工具被标记为不可用时，多数模型的任务成功率接近**腰斩**。更关键的是，模型很少主动寻找替代方案（如用通用工具组合模拟损坏工具的预期效果），而是倾向于在检测到损坏后直接放弃或陷入循环重试。

5. **Unsolvable Tasks**：这是最具区分度的设置。表现最差的模型在 87% 的不可解任务上仍然生成了"详细计划"——它们**宁可胡说也不拒绝**。这与安全对齐的目标直接冲突：一个不会说"不"的 Agent 在生产环境中是危险的。

##### 关键发现与下游验证

论文在 200 ToolSandbox 和 200 τ²-bench 任务上的验证实验表明，APB 诊断信号具有**可迁移的改进价值**。具体而言，将 APB 评分作为精炼提示的一部分输入模型后，三个代表性模型的 plan grade 平均提升 12-18%，且这一提升**一致地传递到了下游执行指标**（任务成功率提升 8-15%）。这确认了 APB 作为"上游诊断补集"的定位：它不替代执行基准，而是提供执行基准无法提供的细粒度信号，形成**诊断→精炼→执行验证**的完整闭环。

> 💡 关键：APB 的最大贡献不在于"又一个基准"，而在于它对 Agent 失败模式的**解剖学视角**。正如医学诊断需要验血、CT、心电图等多维度检查，Agent 评估也需要从规划正确性、工具选择、鲁棒性、拒绝校准等多个角度进行——这正是 APB 的设计哲学。

##### 与传统方法的区别

| 维度 | 传统 Agent 基准（WebArena 等） | APB |
|------|-------------------------------|-----|
| 评测目标 | 端到端任务成功率 | 纯规划能力（解耦执行） |
| 反馈粒度 | 二元成功/失败 | 多维诊断评分（5个维度） |
| 鲁棒性测试 | 通常无 | 系统地注入冗余/损坏工具 |
| 拒绝能力 | 不涉及 | 专门设不可解任务测试校准 |
| 改善路径 | 缺乏直接指导 | APB 信号可直接引导精炼 |

#### 🧪 练习题
```yaml
question: "APB 为何要将规划能力与执行能力解耦进行评测？"
options:
  - "因为规划比执行更重要，应该单独优化"
  - "因为端到端评测无法区分失败根因是'想错了'还是'做错了'，解耦后可精确定位瓶颈并针对性改进"
  - "因为规划模块和执行模块在代码实现上是完全分离的"
  - "因为执行能力的评测已有足够多的基准，不需要再添加"
answer: 1
explain: "端到端成功率将规划错误与执行错误混淆，导致开发者无法定位问题源头。APB 通过纯规划评测将二者解耦，使得'诊断→精炼→验证'的闭环成为可能。"
```
