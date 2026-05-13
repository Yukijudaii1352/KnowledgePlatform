### Causal-LLM

```yaml
id: causal_llm
name: Causal-LLM
full_name: 因果大语言模型框架 (Causal-LLM Framework)
year: '2026.05'
org: 亚马逊
paper_url: https://dl.acm.org/doi/abs/10.1145/3801228.3801315
category: causal_inference
parent: scm
motivation: 自动化因果发现与LLM结合
```

#### 📝 一句话总结

Causal-LLM 提出了一种将约束型因果发现算法与大语言模型（LLM）相结合的混合框架，用于自动化企业预算差异的根因诊断与可解释推理，在真实制造业数据上实现了 0.87 的 top-1 根因识别准确率，并将分析时间从数小时缩短至 10 秒以内。

#### 🎯 核心要点

- 提出混合架构：约束型因果推断（Constraint-based Causal Inference）构建财务因果图 + LLM 驱动的上下文推理生成可解释诊断
- 构建领域专用的金融因果知识图谱（Financial Causal Knowledge Graph, FCKG），桥接统计相关性与真实因果关系
- 三阶段流水线：因果图构建 → 根因定位 → LLM 解释生成
- 在 240 个标注差异案例（24 个月真实企业数据）上评估，top-1 准确率 0.87（95% CI: [0.82, 0.91]）
- 显著优于传统统计方法（0.68）、纯 LLM 方法（0.76）和独立因果方法（0.72）
- 可解释性评分 0.92（评估者间一致性 ICC=0.84），调查时间从 2–4 小时降至 <10 秒

#### 🔬 深入细节

##### 框架总览

Causal-LLM 的核心架构由三个协同模块组成：

```
┌─────────────────────────────────────────────────────────────────┐
│                    Causal-LLM Framework                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────┐  │
│  │  Module 1:   │    │   Module 2:      │    │  Module 3:   │  │
│  │  Causal      │───▶│   Root Cause     │───▶│  LLM-based   │  │
│  │  Discovery   │    │   Localization   │    │  Reasoning   │  │
│  │  Engine      │    │                  │    │  & Explain   │  │
│  └──────┬───────┘    └────────┬─────────┘    └──────────────┘  │
│         │                     │                                 │
│         ▼                     ▼                                 │
│  ┌──────────────┐    ┌──────────────────┐                      │
│  │  Financial   │    │  Domain-Specific │                      │
│  │  Causal      │◀──▶│  FCKG (Knowledge │                      │
│  │  Graph (DAG) │    │  Graph)          │                      │
│  └──────────────┘    └──────────────────┘                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

输入: ERP 系统中的预算差异数据 (Budget vs. Actual)
输出: 根因诊断 + 自然语言解释报告
```

*图：Causal-LLM 框架三模块协同架构示意*

##### 算法伪代码

```python
# Causal-LLM 根因诊断流程伪代码
def causal_llm_diagnose(variance_data, fckg, llm):
    """
    variance_data: ERP系统导出的预算差异数据 (时间序列)
    fckg: 金融因果知识图谱 (Financial Causal Knowledge Graph)
    llm: 大语言模型 (用于推理和解释生成)
    """
    # Phase 1: 因果图构建 (Constraint-based Causal Discovery)
    skeleton = estimate_skeleton(variance_data, alpha=0.05)  # 条件独立性检验
    dag = orient_edges(skeleton, fckg)  # 结合领域知识定向边
    causal_graph = prune_with_domain_constraints(dag, fckg)
    
    # Phase 2: 根因定位 (Root Cause Localization)
    anomaly_nodes = detect_anomalous_variables(variance_data)
    candidate_causes = trace_causal_paths(causal_graph, anomaly_nodes)
    ranked_causes = score_candidates(
        candidate_causes, 
        method="intervention_effect",  # 估计干预效应
        data=variance_data
    )
    
    # Phase 3: LLM 推理与解释生成
    context = build_prompt(
        ranked_causes=ranked_causes[:top_k],
        causal_graph=causal_graph,
        domain_knowledge=fckg.get_relevant_context(ranked_causes),
        variance_summary=summarize_variance(variance_data)
    )
    explanation = llm.generate(
        prompt=context,
        task="root_cause_explanation",
        constraints=["actionable", "human_interpretable"]
    )
    
    return ranked_causes[0], explanation
```

##### 动机与背景

传统企业资源规划（ERP）系统在预算管理中擅长量化差异（如实际支出与预算的偏差百分比），但无法回答**"为什么会产生这个差异"**这一关键问题。财务分析师通常需要 2–4 小时的人工调查来追溯根因，涉及跨部门数据关联、历史趋势分析和领域经验判断。

现有自动化方法的局限：
- **纯统计方法**（相关分析、回归）：只能发现关联，无法区分因果，准确率仅 0.68
- **纯 LLM 方法**（直接提问 GPT 等）：缺乏结构化因果推理能力，容易产生幻觉，准确率 0.76
- **独立因果方法**（PC/FCI 算法）：缺乏领域知识约束，在高维财务数据中产生大量伪因果边，准确率 0.72

> 💡 关键洞察：单独使用因果发现或 LLM 都不足以解决问题——因果发现提供结构但缺乏语义理解，LLM 提供语义但缺乏因果结构。Causal-LLM 的核心贡献在于将两者有机融合。

##### 核心机制详解

**1. 约束型因果发现引擎**

框架采用改进的 PC（Peter-Clark）算法进行因果图构建。标准 PC 算法通过条件独立性检验逐步消除变量间的非因果边：

$$
X \perp\!\!\!\perp Y \mid \mathbf{Z} \implies \text{删除边 } X - Y
$$

其中条件独立性通过偏相关检验或互信息估计判定，显著性水平 \(\alpha = 0.05\)。

Causal-LLM 的改进在于引入 FCKG 作为先验约束：
- **白名单边**：FCKG 中已确认的因果关系（如"原材料价格 → 生产成本"）不参与删除检验
- **黑名单边**：违反领域常识的边（如"利润 → 收入"）直接禁止
- **方向约束**：利用财务时序逻辑（预算编制在前，执行在后）辅助边定向

$$
\text{Score}(G) = \underbrace{\sum_{(i,j) \in E} \log P(X_i \not\perp X_j \mid \mathbf{Pa}_j)}_{\text{数据拟合项}} + \underbrace{\lambda \sum_{(i,j) \in E} \mathbb{1}[(i,j) \in \text{FCKG}]}_{\text{领域知识奖励}}
$$

**2. 金融因果知识图谱（FCKG）**

FCKG 是一个领域专用的有向知识图谱，编码了财务变量间的因果语义：
- **节点**：财务指标（收入、成本、利润率、产能利用率等）
- **边**：因果关系及其强度、方向、时滞
- **属性**：行业特定的因果模式（如制造业中"设备故障 → 产能下降 → 交付延迟 → 收入减少"）

FCKG 由领域专家构建并持续更新，作为因果发现的先验知识和 LLM 推理的上下文锚点。

**3. LLM 驱动的上下文推理**

在根因定位完成后，LLM 负责：
- 将结构化因果路径转化为自然语言解释
- 结合 FCKG 中的领域上下文丰富解释内容
- 生成可操作的改进建议

Prompt 构建策略采用结构化模板：

$$
\text{Prompt} = [\text{SystemRole}] \oplus [\text{CausalPath}] \oplus [\text{FCKG\_Context}] \oplus [\text{VarianceData}] \oplus [\text{Task}]
$$

> ⚠️ 注意：LLM 不直接参与因果发现过程，避免了 LLM 幻觉对因果结构的污染。LLM 仅在因果图已确定后，负责"解释"和"推理"环节。

##### 与传统方法的区别

| 维度 | 传统统计 | 纯 LLM | 独立因果 | **Causal-LLM** |
|------|---------|--------|---------|---------------|
| 因果识别 | ✗ (仅相关) | 部分 (隐式) | ✓ | ✓ (领域增强) |
| 可解释性 | 低 | 高但不可靠 | 中 | **高且可靠** |
| 领域适配 | 需手动 | 通用但浅 | 需手动 | **FCKG 自动** |
| Top-1 准确率 | 0.68 | 0.76 | 0.72 | **0.87** |
| 处理时间 | 分钟级 | 秒级 | 分钟级 | **<10 秒** |

##### 实验验证

评估在一家制造业企业的 24 个月真实数据上进行，包含 240 个由高级财务分析师标注的预算差异案例。主要发现：

- **准确率**：Causal-LLM 的 top-1 根因识别准确率为 0.87（95% CI: [0.82, 0.91]），相比最强基线（纯 LLM, 0.76）提升 14.5%
- **可解释性**：由 5 位高级分析师评估，平均可解释性评分 0.92/1.0，评估者间一致性 ICC=0.84（优秀水平）
- **效率**：单案例处理时间 <10 秒，相比人工调查（均值 3.2 小时）提升约 1150 倍
- **消融实验**：去除 FCKG 后准确率降至 0.79，去除 LLM 解释模块后可解释性降至 0.61，验证了各模块的必要性

#### 🧪 练习题

```yaml
question: "Causal-LLM 框架中，LLM 的核心作用是什么？"
options:
  - "直接执行因果发现算法，构建因果图"
  - "替代传统统计方法进行条件独立性检验"
  - "在因果图确定后，将结构化因果路径转化为可解释的自然语言诊断"
  - "训练金融因果知识图谱（FCKG）中的节点嵌入"
answer: 2
explain: "Causal-LLM 中 LLM 不参与因果发现过程（避免幻觉污染），而是在约束型因果算法构建好因果图并定位根因后，负责生成人类可理解的解释和可操作建议。"
```