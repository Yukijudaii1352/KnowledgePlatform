### HCC — 层次认知缓存 (Hierarchical Cognitive Caching for Ultra-Long-Horizon Agentic ML)

```yaml
id: hcc
name: HCC
full_name: 层次认知缓存 (Hierarchical Cognitive Caching)
year: '2025'
org: SJTU / EigenAI
paper_url: https://arxiv.org/abs/2601.10402
category: embodied_rl
parent: —
motivation: 通过三层缓存与上下文迁移机制解决LLM Agent在超长时间跨度任务中的上下文爆炸与认知遗忘问题
```

#### 📝 一句话总结

HCC（Hierarchical Cognitive Caching）提出了一种受CPU缓存层次结构启发的三层认知缓存架构（Evolving Experience → Refined Knowledge → Prior Wisdom），配合上下文预取、命中与晋升三种迁移机制，使LLM Agent在24小时超长ML任务中将上下文从200k+压缩至~70k tokens而不丢失关键策略信息，在MLE-Bench上以56.4%平均奖牌率达到SOTA。

#### 🎯 核心要点

- **三层缓存架构**：L1 Evolving Experience（工作记忆，原始交互trace）、L2 Refined Knowledge（中期策略记忆，phase级蒸馏摘要）、L3 Prior Wisdom（跨任务长期记忆，embedding检索的可迁移策略）
- **三种上下文迁移机制**：Context Prefetching（L3→任务初始化）、Context Hit（L1优先/L2回退的缓存命中策略）、Context Promotion（P1 phase级压缩 + P2 task级蒸馏）
- **层次研究计划**：每个phase生成 m 个探索方向 × q 个具体建议，并行执行后由P1算子压缩为精炼知识单元
- **跨任务迁移**：L3使用语义embedding + cosine相似度阈值δ检索历史任务wisdom，407个Kaggle竞赛预热构建先验库
- **骨干模型**：DeepSeek-V3.2-Speciale（编码/研究）+ DeepSeek-V3.2 with thinking（上下文晋升），24h/task，双RTX 4090
- **SOTA结果**：MLE-Bench 75题，56.4%平均奖牌率（Low 75.8%/Medium 50.9%/High 42.2%），超越Leeroo（50.7%）、Thesis（48.4%）等闭源方案
- **消融验证**：去L1→22.7%（崩溃），去L2→59.1%（下降），去L3→54.5%（轻微下降），证明三层缺一不可

#### 🔬 深入细节

##### 动机与背景

现有LLM Agent在处理超长时间跨度的科学研究任务（如24小时Kaggle竞赛）时面临根本性瓶颈：**上下文窗口爆炸**。随着Agent与环境交互步数增加，原始执行日志（代码、终端输出、调试信息）呈指数级增长，很快超出LLM的有效上下文窗口。简单的截断或滑动窗口策略会导致**认知遗忘**——Agent丢失早期关键决策和实验洞察，陷入重复探索。

传统方法的缺陷：
- **线性上下文保留**（如OpenHands、AIDE）：保留全部历史或简单截断，无法区分信息价值层次
- **固定摘要**：一次性压缩丢失决策理由和实验细节
- **无跨任务迁移**：每个任务从零开始，无法利用历史经验

HCC的核心洞察是：**Agent的认知应像CPU缓存一样分层管理**——热数据（当前执行trace）保持原始精度，温数据（已完成phase的洞察）压缩为策略摘要，冷数据（跨任务经验）蒸馏为可迁移的先验知识。

![HCC 框架总览](https://ar5iv.labs.arxiv.org/html/2601.10402/assets/x1.png)
*图1：ML-Master 2.0 的 HCC 架构总览。左侧为三层缓存结构（L1/L2/L3），右侧为上下文迁移的三种操作（预取/命中/晋升）。*

##### 问题形式化

将Agent与环境的交互建模为序列决策过程。在时间步 \(t\)，Agent观察上下文 \(C_{t-1}\) 并生成动作 \(a_t = \pi_\theta(C_{t-1})\)，环境返回事件 \(e_t\)。核心挑战是设计上下文构造函数 \(g(\cdot)\)，使得：

$$C_{t-1} = g(\mathcal{E}_{t-1})$$

其中 \(\mathcal{E}_{t-1} = \{e_0, e_1, \ldots, e_{t-1}\}\) 是完整历史事件序列。朴素方法直接拼接所有事件，导致 \(|C_{t-1}|\) 线性增长直至超出窗口。HCC通过三层缓存和迁移机制重新定义 \(g(\cdot)\)。

##### 三层缓存架构

**L1: Evolving Experience（工作记忆）**

L1存储当前活跃phase的原始交互trace，是Agent的"工作记忆"。在phase \(p\) 的时间步 \(t \in [t_{p-1}, t_p)\)：

$$\mathcal{L}_1(t) = \mathcal{E}_{t_0:t_{p-2}} \cup \{P_{p-1}\} \cup \mathcal{E}_{t_{p-1}+1:t}$$

其中 \(\mathcal{E}_{t_0:t_{p-2}}\) 是历史phase边界事件，\(P_{p-1}\) 是上一个研究计划，\(\mathcal{E}_{t_{p-1}+1:t}\) 是当前phase的完整trace。L1保持原始精度，支持精细调试和代码修正。

**L2: Refined Knowledge（中期策略记忆）**

L2存储已完成phase的蒸馏摘要，由P1算子从L1压缩而来。定义 \(\kappa_{i:j}\) 为事件段 \(\mathcal{E}_{i:j}\) 的紧凑知识摘要：

$$\mathcal{L}_2(t) = \{\kappa_{t_{r-1}+1:t_r-1}\}_{r=1}^{p-1}$$

每个 \(\kappa_p\) 保留关键判断（如"特征X有害"）、实验洞察（如"CV在split Y上泄漏"）和决策理由，同时移除冗长的执行日志。这使Agent能回顾已验证的决策而无需携带完整执行记录。

**L3: Prior Wisdom（跨任务长期记忆）**

L3存储从历史任务蒸馏的可迁移策略，以embedding-value对形式持久化：

$$\mathcal{L}_3 \triangleq \{(\mathbf{h}_n, w_n)\}_{n=1}^{N}$$

其中 \(\mathbf{h}_n = E(d_n)\) 是任务描述符的语义embedding，\(w_n\) 是对应的蒸馏wisdom文本。L3跨任务持久化，仅在任务完成时通过P2算子更新。

##### 上下文迁移机制

![上下文迁移示例](https://ar5iv.labs.arxiv.org/html/2601.10402/assets/x2.png)
*图2：在plant-pathology-2021-fgvc8任务中的上下文迁移示例，展示预取、命中和晋升的完整流程。*

**1. Context Prefetching（预取：L3 → 初始化）**

任务开始前，计算当前任务描述符的embedding \(\mathbf{q} = E(d_\tau)\)，通过cosine相似度阈值检索相关先验：

$$\Omega_\tau = \{w_n \mid (\mathbf{h}_n, w_n) \in \mathcal{L}_3, \cos(\mathbf{q}, \mathbf{h}_n) > \delta\}$$

初始上下文构造为：\(e_0 = \text{concat}(d_\tau, u_{\text{user}}, \Omega_\tau)\)，确保Agent从强先验启动。

**2. Context Hit（命中：L1优先 / L2回退）**

上下文构造函数 \(g(\cdot)\) 实现类缓存命中策略：

$$\Psi_t(k) = \begin{cases} e_k, & e_k \in \mathcal{L}_1(t) \\ \kappa_{t_{r-1}+1:t_r-1}, & e_k \notin \mathcal{L}_1(t), e_k \in \mathcal{L}_2(t) \\ \varnothing, & \text{otherwise} \end{cases}$$

当前phase的事件从L1以原始形式检索（缓存命中），已完成phase的事件回退到L2的精炼摘要（缓存未命中），最终上下文为所有命中结果的拼接。

**3. Context Promotion（晋升：L1 → L2 → L3）**

晋升分两级：

- **Phase级晋升（P1算子）**：每个phase完成时，P1将该phase的 \(m \times q\) 条并行探索轨迹压缩为单个知识单元 \(\kappa_p\)，写入L2并从L1移除原始trace：

$$\kappa_p = P_1(\{\sigma_{p,i,j}\}_{(i,j) \in \mathcal{I}_p}), \quad \mathcal{L}_2 \leftarrow \mathcal{L}_2 \cup \{\kappa_p\}, \quad \mathcal{L}_1 \leftarrow \mathcal{L}_1 \setminus \{e \mid e \in \sigma_{p,i,j}\}$$

- **Task级晋升（P2算子）**：任务完成时，P2从完整任务历史（L1+L2）蒸馏出可迁移的wisdom \(w_\tau\)，写入L3：

$$w_\tau = P_2(C_{t_{\max}-1}), \quad \mathcal{L}_3 \leftarrow \mathcal{L}_3 \cup \{(E(d_\tau), w_\tau)\}$$

##### 整体工作流伪代码

```python
# HCC Agent 工作流伪代码
def hcc_agent(task_description, L3_wisdom_store):
    # Phase 0: Context Prefetching
    q = embed(task_description)
    Omega = {w for (h, w) in L3 if cosine(q, h) > delta}
    context = concat(task_description, user_instructions, Omega)
    
    # Generate initial code submission
    initial_code = LLM(context, prompt="generate baseline code")
    submit(initial_code)
    
    for phase_p in range(1, max_phases + 1):
        # Step 1: Hierarchical Research Plan
        plan = LLM(context, prompt="propose m directions × q suggestions")
        
        # Step 2: Parallel Execution
        trajectories = {}
        for direction_i in range(m):
            for suggestion_j in range(q):
                sigma_ij = execute_suggestion(plan[i][j])  # code → run → debug
                trajectories[(i,j)] = sigma_ij
        
        # Step 3: Context Hit (build context for next phase)
        # Current phase traces from L1 (raw), past phases from L2 (summaries)
        
        # Step 4: Phase-level Promotion (P1)
        kappa_p = P1_summarize(trajectories)  # LLM-based compression
        L2.add(kappa_p)
        L1.remove(raw_traces_of_phase_p)
        
        # Update context via hit policy
        context = build_context_with_hit_policy(L1, L2)
    
    # Task-level Promotion (P2)
    wisdom = P2_distill(full_task_history)
    L3.add((embed(task_description), wisdom))
```

##### 上下文压缩效果

![Token统计](https://ar5iv.labs.arxiv.org/html/2601.10402/assets/figures/token_count.png)
*图3：在random-acts-of-pizza任务中的上下文长度增长曲线。橙线为无HCC的原始上下文（>200k tokens），蓝线为HCC管理后的上下文（~70k tokens）。Agent在第4次研究计划迭代中成功获得奖牌。*

HCC的关键效果是将上下文从超过200k tokens压缩至约70k tokens，同时保留了所有关键的策略洞察和实验结论。这使得Agent能在有限的上下文窗口内维持跨越数十小时的战略连贯性。

##### 实验结果

在MLE-Bench（75个真实Kaggle任务）上的评估结果：

| Agent | Backbone | Low(%) | Medium(%) | High(%) | Avg Medal(%) |
|-------|----------|--------|-----------|---------|--------------|
| MLAB | gpt-4o | 4.6 | 0.0 | 0.0 | 1.6 |
| OpenHands | gpt-4o | 12.1 | 1.8 | 2.2 | 4.9 |
| AIDE | o1-preview | 35.9 | 8.5 | 11.7 | 17.1 |
| R&D-Agent | gpt-5 | 68.2 | 21.1 | 22.2 | 35.1 |
| FM Agent | Gemini-2.5-Pro | 62.1 | 36.8 | 33.3 | 43.6 |
| Thesis | gpt-5-codex | 65.2 | 45.6 | 31.1 | 48.4 |
| Leeroo* | Gemini-3-pro | 68.2 | 44.7 | 40.0 | 50.7 |
| ML-Master | DeepSeek-R1 | 48.5 | 20.2 | 24.4 | 29.3 |
| **ML-Master 2.0** | **DS-V3.2-Speciale** | **75.8** | **50.9** | **42.2** | **56.4** |

消融实验（MLE-Bench-Lite, 22题）：

| 配置 | Valid(%) | Median+(%) | Medal(%) |
|------|----------|------------|----------|
| ① 去L1（无迭代交互） | 54.5 | 36.4 | 22.7 |
| ② 去L2（无上下文压缩） | 95.5 | 81.8 | 59.1 |
| ③ 去L3（无跨任务迁移） | 95.5 | 72.7 | 54.5 |
| ④ 完整HCC | 95.5 | 81.8 | **72.7** |

> 💡 **关键发现**：L1是基础（去除后奖牌率暴跌至22.7%），L2提升顶尖表现（59.1%→72.7%），L3提供强初始化（54.5%→72.7%）。三层协同效果远超各层独立贡献之和。

##### 与传统方法的核心区别

| 维度 | 线性保留（OpenHands等） | 固定摘要 | HCC |
|------|------------------------|---------|-----|
| 上下文增长 | 线性，终将溢出 | 固定大小但信息损失 | 分层压缩，动态平衡 |
| 历史访问 | 全部或截断 | 仅摘要 | 热数据原始+冷数据摘要 |
| 跨任务迁移 | 无 | 无 | L3 embedding检索 |
| 认知连贯性 | 截断后丢失 | 摘要粒度粗 | Phase级精炼保留决策理由 |

#### 🧪 练习题

```yaml
question: "在HCC架构中，当Agent需要回顾一个已完成phase的实验结论时，上下文构造函数g(·)会从哪一层缓存获取信息？"
options:
  - "L1 Evolving Experience，因为它保存了所有原始交互记录"
  - "L2 Refined Knowledge，因为已完成phase的原始trace已被P1算子压缩并迁移至此"
  - "L3 Prior Wisdom，因为所有历史信息最终都会蒸馏到长期记忆"
  - "直接从LLM的参数记忆中检索，无需显式缓存"
answer: 1
explain: "HCC的Context Hit机制实现L1优先/L2回退策略：当前phase的事件从L1获取原始形式，而已完成phase的原始trace在Phase级晋升时已被P1算子压缩为精炼知识单元κ并存入L2，同时从L1中移除。因此回顾已完成phase时，g(·)从L2获取压缩后的摘要。"
```