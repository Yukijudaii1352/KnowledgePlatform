### AdaPlanner: 自适应规划器 (AdaPlanner)

```yaml
id: adaplanner
name: AdaPlanner
full_name: 自适应规划器 (AdaPlanner)
year: '2023.05'
org: Georgia Tech
paper_url: https://arxiv.org/abs/2305.16653
category: closed_loop
parent: react
motivation: 按反馈重写计划并断点续跑
```

#### 📝 一句话总结
AdaPlanner 提出基于代码生成的自适应闭环规划方法，让 LLM Agent 能根据环境反馈动态重写计划并断点续跑，在仅 1～2 次反馈迭代内显著超越 ReAct 等强基线。

#### 🎯 核心要点
- 将任务规划表达为可执行的 Python 代码（plan-as-code），而非自然语言步骤或 JSON 序列
- 引入自适应闭环规划：LLM 在每一步执行后根据环境反馈重写剩余计划，并能从断点续跑（in-progress re-planning）
- 设计两阶段规划生成：plan generation → plan refinement，refinement 阶段仅基于反馈增删改动最小代码块
- 引入代码级技能封装（skill library）：将高频环境操作（如 navigate, pick, put）抽象为预定义 Python 函数，LLM 只需组合调用
- 在 ALFWorld（6 个任务）和 MiniWoB++（多个网页任务）两个基准上全面评估，GPT-3.5 驱动的 AdaPlanner 在 ALFWorld 上平均成功率 85.7%（ReAct 64.6%），GPT-4 达 97.3%
- 对比多种规划范式：open-loop（一次生成全部计划）、implicit closed-loop（隐式闭环，如 ReAct 的 observation→action 循环）、explicit closed-loop（明确改写计划的闭环）

#### 🔬 深入细节
##### 核心示意图

![开环 vs 隐式闭环 vs 显式闭环对比](https://ar5iv.labs.arxiv.org/html/2305.16653/assets/x2.png)
*图：开环规划、隐式闭环（如 ReAct）、显式闭环（AdaPlanner）三者的对比。*

![ALFWorld 示例：自适应闭环规划](https://ar5iv.labs.arxiv.org/html/2305.16653/assets/x3.png)
*图：从 ALFWorld 任务展示 AdaPlanner 通过代码表达计划并在环境反馈后调整。*

##### 算法伪代码

```
AdaPlanner 自适应闭环规划主循环（伪代码重建):
Phase 1: plan_code = LLM.generate_plan(task)
Phase 2 (on failure):
  LLM.refine_plan(task, plan_code, executed_steps, feedback)
  -- 仅修改失败相关代码块，跳过已执行的步骤
```

##### 动机与背景

传统方案（ReAct, SayCan）采用 open-loop 或 implicit closed-loop，缺乏显式计划级更新。AdaPlanner 核心洞察：计划应该是活的代码，而非死的文本。代码形式支持条件判断、循环，失败时精确修改而非重头思考。

##### 核心机制

**1. Plan-as-Code**: LLM 输出包含 plan() 函数和技能函数调用的 Python 代码。优势：天然控制流、利用代码语料先验、增量修改。

**2. Adaptive Closed-Loop**: 两阶段——Plan Generation（一次生成完整代码计划）→ Plan Refinement（失败时仅局部修改代码，保留已验证部分）。实现断点续跑+局部修复。

**3. Skill Library**: 预定义经过验证的技能函数（goto, take, clean, put 等），解耦高层推理与底层执行。

##### 与传统方法区别

| 维度 | Open-loop | ReAct | AdaPlanner |
|------|-----------|-------|------------|
| 计划形式 | 自然语言列表 | thought+action | Python 代码 |
| 闭环方式 | 无 | 每步观察后生成下一步 | 失败后重写剩余计划 |
| 断点续跑 | ❌ | ❌ | ✅ |
| 反馈利用 | 无 | 即时 | 即时+计划级调整 |

> 💡 关键：计划从静态文本升级为可执行可修改的代码对象。
> ⚠️ 注意：AdaPlanner 依赖环境提供结构化文本反馈，本身不涉及视觉感知。

##### 实验效果

- ALFWorld（6类任务）：GPT-3.5 成功率 85.7% vs ReAct 64.6%（+21.1pp），GPT-4 达 97.3%
- MiniWoB++：多步推理任务显著提升
- 消融实验：自适应闭环与代码表达各自独立贡献，组合效果最优，仅需 1-2 次反馈迭代

#### 🧪 练习题
```yaml
question: "AdaPlanner 的 plan-as-code 相比自然语言计划的核心优势是什么？"
options:
  - "代码执行速度比自然语言快 10 倍"
  - "代码允许 LLM 利用预训练代码语料，且支持控制流和局部修改"
  - "代码可以绕过环境反馈直接生成正确计划"
  - "代码消除了对 LLM 的所有依赖"
answer: 1
explain: "Plan-as-code 让 LLM 能利用代码语料的先验知识生成结构化计划，且天然支持条件判断/循环等控制流。失败时仅需局部修改代码块而非重写全局。"
```
