### AdaPlanner: Adaptive Planning from Feedback with Language Models

**作者**: Haotian Sun*, Yuchen Zhuang*, Lingkai Kong, Bo Dai, Chao Zhang (*equal contribution)  
**机构**: Georgia Institute of Technology  
**发表**: arXiv 2023 (2305.16653)  
**代码**: https://github.com/haotiansun14/AdaPlanner  

---

#### 核心贡献（一句话总结）
提出**闭环自适应规划框架AdaPlanner**，让LLM智能体根据环境反馈动态调整自身生成的计划（in-plan/out-of-plan双粒度修正），配合code-style prompting与skill discovery机制，在ALFWorld和MiniWoB++上分别以**2×和600×更少的样本**超越SOTA 3.73%/4.11%。

---

#### 一、问题背景与动机

| 已有方法 | 局限 |
|----------|------|
| **开环方法**（CoT, Zero-Shot Planner, HuggingGPT等） | 执行前生成固定计划，无法响应环境反馈 |
| **隐式闭环方法**（ReAct, Reflexion, ProgPrompt等） | 固定计划结构，仅通过当前观察调整动作，不修改计划本身 |
| **显式闭环方法**（DEPS） | 可修改计划，但需要大量任务演示（training），泛化性不足 |

**核心缺口**：现有LLM智能体要么无计划、要么计划僵硬不可变，导致任务复杂度增加时性能急剧退化。**如何让LLM智能体在交互过程中自主生成计划并主动调整？**

---

#### 二、方法框架（AdaPlanner的四大组件）

| 序号 | 组件 | 功能 |
|------|------|------|
| ① | **Code-style Prompting** | 用Python代码结构定义任务（目标g、动作space A、环境上下文c），约束LLM输出合法动作序列。函数签名`def act(observation, goal): return action`有效缓解幻觉和格式错误 |
| ② | **In-Plan Refinement** | 环境返回新信息（如物体位置、状态变化）时，将信息**合并到现有计划上下文中**，**不改变**计划结构，仅更新后续动作的条件 |
| ③ | **Out-of-Plan Refinement** | 当前计划完全无法匹配环境状态时（连续失败/无法执行的动作），LLM**完全重新生成计划** |
| ④ | **Skill Discovery** | 将历史成功plan存储为**few-shot exemplar**，供后续任务复用。抽取公共子规划（skill）进行结构化存储，大幅减少新任务所需演示样本数 |

**伪代码（Algorithm 1 核心流程）**:

```
function AdaPlanner(task, environment):
    P = generate_initial_plan(task, few_shot_skills)  // Code-style
    while not task_complete:
        action = execute_next_step(P, environment)
        obs = environment.step(action)
        
        if action_failed or obs_unexpected:
            if can_in_plan_refine(obs):
                h = extract_new_info(obs)      // 提取反馈信息
                P = update_context(P, h)        // In-plan: 更新context
            else:
                P = regenerate_plan(task, obs)  // Out-of-plan: 重新生成
                store_failed_plan(P_old)
        
        if task_success:
            skills = extract_skill(P)           // 提取可复用skill
            skill_library.add(skills)
    return trajectory
```

**Table 1: AdaPlanner在方法谱系中的定位**  

| Method Category | Examples | Feedback Type | Plan Adaptability |
|-----------------|----------|---------------|-------------------|
| Open-Loop | CoT, Zero-Shot Planner | None | 无计划调整 |
| Implicit Closed-Loop (Fixed Plan) | ReAct, Reflexion, ProgPrompt | Action-level | 固定计划，仅调整动作 |
| Explicit Closed-Loop (Plan Refinement) | DEPS | Plan-level | 可修正计划 |
| **AdaPlanner (Ours)** | **Code + Dual Refine** | **Action & Plan** | **In-plan + Out-of-plan 双粒度调整** |

---

#### 三、实验设计与关键结果

**实验环境**:

- **ALFWorld**: 6类具身任务（Pick, Clean, Heat, Cool, Look, Put），基于TextWorld的文本交互
- **MiniWoB++**: 51个Web操作任务（点击、填表、导航等）

**对比基线**: ReAct, Reflexion, ProgPrompt, Code-as-Policies, DEPS等

| 环境 | AdaPlanner 准确率 | 最佳Baseline | 相对提升 | 样本效率提升 |
|------|-------------------|--------------|----------|--------------|
| ALFWorld | **86.7%** | Reflexion 83.0% | +3.73% | 2x fewer samples |
| MiniWoB++ | **95.3%** | RCI 91.2% | +4.11% | 600x fewer samples |

**消融实验（Ablation）关键结论**:

- 去掉 In-Plan Refinement → 性能下降约5-8%（无法利用新信息纠偏）
- 去掉 Out-of-Plan Refinement → 性能下降约10-12%（陷入失败计划无法跳出）
- Code-style → Language-style → 幻觉增多，可执行动作比例下降约15%
- Skill Discovery → 无Skill Discovery → 低样本场景下性能骤降（需5-10x更多演示）

**图1 (Figure 1)**: AdaPlanner框架概览图——展示任务目标 → Code-style Plan生成 → In-Plan/Out-of-Plan分支 → Skill Library的闭环流程。  
**图2 (Figure 2)**: ALFWorld各子任务的成功率对比柱状图（AdaPlanner在所有6类任务上均最优）。  
**图3 (Figure 3)**: MiniWoB++任务复杂度与成功率关系——随着任务步骤增加，AdaPlanner的闭环优势更加显著。  
**图4 (Figure 4)**: 样本效率曲线——AdaPlanner在极低shot场景下（1-5 examples）仍保持较高成功率。

---

#### 四、关键公式

**In-Plan Refinement**（环境信息注入现有计划）:  
```
pi(a'_{>t} | g, c_{>t} union {h_t}, P_0)
```

**Out-of-Plan Refinement**（完全重新生成计划）:  
```
rho(P_t | g, c_t, P_{t-1})
```

**Skill Discovery**（成功计划存储为exemplar）:  
```
Memory <- {P_success | task_id, 提取的sub-plan skill}
```

---

#### 五、局限性与潜在风险

1. **仍需few-shot演示**: 对复杂任务仍需少量（1-3个）专家示例，无法完全zero-shot
2. **Code-style依赖**: 要求环境有清晰的action space定义，对开放域/模糊任务适配性存疑
3. **策略安全**: 代码执行环境需沙箱隔离，避免恶意/错误代码在真实系统执行
4. **Skill库膨胀**: 长期运行下skill数量增长，需聚类/去重机制防止retrieval退化

---

#### 六、总结与启示

AdaPlanner首次系统性地在LLM智能体中引入**计划级别的闭环自适应**，通过**code-style约束**克服幻觉、**双粒度修正**应对不同反馈类型、**skill memory**提升样本效率。该框架为后续的LLM Agent方向提供了清晰的技术路标：**计划即程序**（Plan-as-Code）和**记忆即技能库**（Memory-as-Skills）的设计范式。

对构建通用Agent系统的启示：①动态调整计划而非固定执行是应对复杂环境的关键；②结构化输出（代码）比自然语言更适合多步动作序列生成；③成功经验的复用（skill discovery）可以显著降低样本成本。