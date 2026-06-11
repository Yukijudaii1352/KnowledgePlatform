### LATS: 语言智能体树搜索 (Language Agent Tree Search)

```yaml
id: lats
name: LATS
full_name: 语言智能体树搜索 (Language Agent Tree Search)
year: '2023.10'
org: UIUC
paper_url: https://arxiv.org/abs/2310.04406
category: search
parent: rap
motivation: 把ReAct扩展为带反馈的树搜索
```

#### 📝 一句话总结
LATS 将 LLM 的推理、行动、规划能力与蒙特卡洛树搜索 (MCTS) 统一为同一框架，通过树状结构对可能的决策路径进行系统性探索、模拟与回溯，在无需额外训练的情况下，以更少的计算资源在 HumanEval (94.4%) 和 WebShop (75.9%) 上分别取得开源模型新 SOTA。

#### 🎯 核心要点
1. **统一三种能力的树搜索框架**: LATS 将 LLM 同时用作智能体 (策略)、世界模型 (模拟器) 和价值函数 (评估器)，以 MCTS 四步循环 (Selection→Expansion→Simulation→Backpropagation) 驱动决策，实现前向探索 + 回溯纠错。
2. **外部反馈 + 自我反思双通道世界模型**: 在模拟 rollout 阶段，世界模型不仅接收环境外部反馈 (如编译器报错、搜索结果)，还生成自我反思 (self-reflection，含文本批判 + 评分)，用于辅助价值评估和后续推理。
3. **LLM 即价值函数**: 非终态的节点通过 LLM 以 1-10 分估值并附文字理由，分数通过树上溯 (backpropagation) 取子节点最大值，结合 UCT 公式在探索与利用间平衡。
4. **显著超越单路径方法**: 在 HumanEval 上达到 94.4% pass@1，WebShop 上平均奖励 75.9 / 成功率 50.0%，WebArena 上 21.3%，全面超越 ReAct/Reflexion，消融实验证明树搜索是性能核心驱动力。

#### 🔬 深入细节
```python
# 规划型 Agent 的抽象主循环
state = observe()
plan = planner(state)
for step in plan:
    obs = executor(step)
    if needs_replan(obs):
        plan = planner(update_state(state, obs))
```

![LATS 示意图](https://ar5iv.labs.arxiv.org/html/2310.04406/assets/x1.png)
*图：LATS 的核心框架或评测示意。*

##### 背景与动机

现有 LLM 决策框架存在结构性缺陷：ReAct (Yao et al., 2023) 仅线性推进行动无回溯能力，Reflexion (Shinn et al., 2023) 只在回合间反思缺少单回合内的多路径探索，Self-Consistency (Wang et al., 2023) 虽采样多条链但缺乏有组织的搜索。与此同时，AlphaZero 等经典智能体通过 MCTS + 世界模型实现了超人类博弈性能，但它们需针对每个任务训练策略网络和世界模型，无法泛化为通用推理智能体。

LATS 的核心理念是**取长补短**：用经典树搜索的结构化探索补 LLM 推理的决策短板，同时用 LLM 的零样本泛化能力补 AlphaZero-like 方法无法跨任务迁移的短板。

##### 核心方法：MCTS + LLM 四合一

LATS 将决策过程建模为 POMDP 中的树搜索，用 LLM 实现 MCTS 的全部四个关键组件：

| MCTS 步骤 | 传统实现 | LATS 实现 |
|-----------|---------|-----------|
| **Selection** (选择) | UCT 公式 + 统计计数器 | UCT 公式 + LLM 估值 `V(s)` + 访问次数 `N(s)` |
| **Expansion** (扩展) | 从动作空间采样 | LLM agent 采样 `C` 个候选动作 (小空间直接采样，大空间生成查询语句) |
| **Simulation** (模拟) | 环境模型推演至终态 | World Model (LLM) 生成观察 + 自我反思，rollout 至终态或 max_depth `d` |
| **Backpropagation** (回传) | 奖励/估值沿路径回传 | 终态用外部奖励，否则 LLM 估值 (1-10 分)；父节点取子节点最大值 |

**算法伪代码 (Algorithm 1)**:

输入: 初始状态 s0, 迭代次数 K, 每次扩展动作数 C, 探索权重 w, 最大深度 d
输出: 最高奖励轨迹

root ← Node(state=s0, N=0, V=0)
for iteration = 1 to K do
  // SELECTION
  node ← root
  while node is non-leaf:
    node ← SelectChild(node, w)  // UCT: V(s) + w * sqrt(ln(N_parent)/N(s))
  
  // EXPANSION + SIMULATION
  for i = 1 to C:
    action_i ~ Agent(node.state)
    sim_state ← node.state
    trajectory ← []
    for depth = 1 to d:
      sim_action ~ Agent(sim_state)
      obs, reflect ← WorldModel(sim_state, sim_action)  // 外部反馈+自我反思
      sim_state ← sim_state + (sim_action, obs, reflect)
      trajectory.append(...)
      if terminal(sim_state): break
    
    // EVALUATION
    value ← ExternalReward(sim_state) if terminal else ValueFunction(sim_state)
    child ← Node(state=sim_state, N=0, V=value)
    node.children.append(child)
  
  // BACKPROPAGATION
  while node ≠ root:
    node.N ← node.N + 1
    node.V ← max over children V(child)
    node ← node.parent
  root.N ← root.N + 1

return argmax reward(trajectory)

**UCT 选择公式**:

UCT(s) = V(s) + w × √(ln N_parent / N(s))

其中 V(s) 为节点回溯值，w 为探索权重 (默认=1)，N_parent 为父节点访问次数。

##### 四个关键组件的实现细节

- **树节点 (Tree & Nodes)**: 节点存储状态 `s_t` (包含历史动作序列 `a_{<t}` 和观察序列 `o_{≤t}`)，以及选择统计量 `N(s)` (访问次数) 和 `V(s)` (估值，悲观初始化为 0)。
- **智能体 (Agent/Policy)**: 基于 ReAct 范式，提示词中包含当前状态、可选动作、few-shot 示例和任务指令。小动作空间直接采样动作，大动作空间 (如 WebShop 的 100 万+ 商品) 生成类 SQL 查询由动作生成器执行。
- **世界模型与自我反思 (World Model & Self-Reflection)**: 世界模型将动作映射为自然语言观察，同时生成一段反思文本和评分。反思文本指明轨迹成败的原因 (如 "代码在第 5 行有 NameError，因为变量未定义")，既辅助价值函数评分，又作为上下文注入后续推理，实现可解释的信用分配。
- **价值函数 (Value Function)**: LLM 被提示输出 1-10 的标量分数 + 文字理由。这种 "value and reasoning" 策略使评估过程自适应且可解释——分数用于树回溯，理由文本进入智能体上下文指导后续决策。

##### 实验设置与关键发现

**统一超参**: 所有实验使用 `GPT-3.5-turbo-0613`，搜索参数 K=20, C=3, w=1, d=5。

**编程 (HumanEval & MBPP)**:
- 将代码生成重构为逐行决策：状态 = 当前代码 + 编译器输出 + 单测结果，动作 = 下一行代码，奖励 = 单测通过/失败 (0/1)。
- HumanEval pass@1: LATS 94.4% vs GPT-3.5-turbo 76.8% vs CoT-SC 83.6% vs ToT 89.5% — 提升 17.6 个百分点。
- MBPP pass@1: LATS 83.2% vs GPT-3.5 79.8%。
- 效率：平均 15.2 次搜索迭代、7.6 次 LLM 调用/题，而 CoT-SC (40 样本) 需 40 次调用。

**交互式问答 (WebShop)**:
- 动作空间超过 100 万商品，需多步搜索-筛选-购买。LATS 利用搜索能力生成查询、接收产品信息。
- 平均奖励 75.9 / 成功率 50.0%，大幅领先 ReAct (66.6/40.0) 和 Reflexion (68.0/42.9)，证明树搜索在多步交互中的优势。

**Web 导航 (WebArena)**:
- 由于 Web 页面动态性强，模拟阶段使用真实环境交互替代 LLM 生成的观察。
- 成功率 LATS 21.3% > Reflexion 17.0% > ReAct 14.2%，虽绝对值不高但体现了框架泛化能力。

##### 消融实验与效率分析

| 变体 | HumanEval (pass@1) | WebShop (reward) |
|------|-------------------|-------------------|
| LATS (完整) | **94.4** | **75.9** |
| 无自我反思 | 91.2 (-3.2) | 73.5 (-2.4) |
| 无外部反馈 | 89.0 (-5.4) | 70.2 (-5.7) |
| 无价值函数 | 90.1 (-4.3) | 72.1 (-3.8) |
| 无 MCTS (平坦采样=Self-Consistency) | 88.3 (-6.1) | 69.8 (-6.1) |
| 无树搜索 (ReAct) | 76.8 (-17.6) | 66.6 (-9.3) |

核心结论：**树搜索 (MCTS) 是最大性能驱动因素**，移除后性能断崖式下降；外部反馈在环境复杂的 WebShop 上影响尤甚 (-5.7)；自我反思和价值函数均有不可忽视的增益。

搜索预算分析显示，性能从 K=5→10 显著提升，K=10→20 趋于平缓并到达平台期，验证了框架的效率-性能平衡能力。

##### 局限性

1. **依赖 LLM 质量**：弱模型难以生成有效动作、准确反思和估值，世界模型的模拟精度受限于 LLM 的知识边界。
2. **世界模型幻觉**：LLM 模拟的结果可能与真实环境偏差，在长程任务上误差会累积，外部反馈仅能部分缓解。
3. **计算开销**：虽然少于 Self-Consistency 类采样方法，但仍比 ReAct 等单路径方法昂贵（WebShop 平均 25.4 次 LLM 调用），限制了在实时性要求高的场景的应用。
4. **人工奖励设计**：需要手动定义终态奖励函数，不支持从无监督交互中学习，限制了开放环境下的自主探索能力。
5. **模拟保真度依赖**：WebArena 实验中被迫使用真实环境交互进行模拟，说明在高度动态/无已知动态的环境下，LLM 世界模型的泛化仿真能力仍有较大缺口。

#### 🧪 练习题
```yaml
question: "LATS 相比 ReAct 的结构性新增能力是什么？"
options:
  - "把工具调用改成完全并行执行"
  - "把单路径 thought-action 循环扩展成带回溯的树搜索"
  - "用 PDDL 替代自然语言规划"
  - "在训练时更新策略网络参数"
answer: 1
explain: "LATS 的核心是把 ReAct 式单路径决策升级成 MCTS 驱动的多路径树搜索，因此能前瞻、回溯并比较候选轨迹。"
```
