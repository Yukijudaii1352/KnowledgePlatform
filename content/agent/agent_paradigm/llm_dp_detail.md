### LLM-DP: 动态规划器 (Dynamic Planning with a LLM)

```yaml
id: llm_dp
name: LLM-DP
full_name: 动态规划器 (Dynamic Planning with a LLM)
year: '2023.08'
org: University of Edinburgh
paper_url: https://arxiv.org/abs/2308.06391
category: decomposition
parent: react
motivation: LLM与经典规划器协同求解任务
```

#### 📝 一句话总结
LLM-DP 是一种神经-符号框架，让 LLM 从自然语言指令和环境观察中即时生成 PDDL 问题文件，搭配经典符号规划器（如 Fast-Forward）求解最优动作序列，从而在 Alfworld 等具身推理任务上比 ReAct 基线更快、更高效。

#### 🎯 核心要点
1. **动机与问题定位**：
   - 纯 LLM（如 ReAct）在长程多步推理中面临上下文窗口膨胀、计算成本高、容易幻觉等问题
   - 符号规划器（如 FF、BF(f)）能快速找到最优解，但要求完整准确的环境描述（PDDL），无法应对部分可观察场景
   - LLM-DP 弥合二者鸿沟：LLM 处理噪声和不确定性，规划器负责高效搜索

2. **技术架构（三阶段）**：
   - **Grounding（接地）**：LLM 将自然语言观察转化为逻辑谓词，为环境中每个相关对象采样生成 plausible predicates（看似合理的谓词）
   - **PDDL 生成**：基于接地谓词，LLM 即时写出当前状态下可用的 PDDL problem 文件，动作 schema 由人类预先定义的 domain 文件提供
   - **求解与执行**：经典规划器求解 PDDL 得到计划；Action Selector 决定执行、重新审视理解或提问

3. **核心创新——谓词采样（Predicate Sampling）**：
   - 面对未观测或未知对象，LLM 通过语义和语用推理生成可能的谓词
   - 多次采样可产生多个候选计划，增强鲁棒性
   - 免去人工预先编码所有对象与关系，实现了从交互中学习

4. **Action Selector 决策机制**：
   - 不仅决定"下一步做什么"，还判断是否需要对当前状态理解进行修正
   - 可主动向用户提出澄清问题，增强人机协同

5. **实验与性能**：
   - 在 Alfworld 基准上评估，LLM-DP 完成任务的成功率更高，且平均推理步数显著少于 ReAct 基线
   - 验证了"LLM 接地 + 规划器求解"范式在具身任务上的有效性和效率优势

6. **对比 ReAct 的关键差异**：
   - ReAct：每一步都调用 LLM 决策（思考→行动→观察循环）
   - LLM-DP：LLM 仅负责生成 PDDL（阶段性调用），规划器负责全局多步推理，LLM 调用次数大幅减少

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

![LLM-DP 示意图](https://ar5iv.labs.arxiv.org/html/2308.06391/assets/x1.png)
*图：LLM-DP 的核心框架或评测示意。*

##### 1. 问题形式化

LLM-DP 处理的是部分可观察的具身规划问题。Agent 接收自然语言指令（如"把冷的苹果放进微波炉加热"），通过与环境交互逐步获得观察，最终达成目标状态。关键挑战是：初始状态下 Agent 并不知道环境中所有对象及其属性，需要边探索边规划。

##### 2. PDDL 生成流程

- **Domain 文件**：由人类专家预先编写，定义可用的动作类型（如 pick、put、open）及其前提条件和效果
- **Problem 文件**：由 LLM 在每一步/每阶段即时生成，包含：
  - Objects（对象列表，从观察中提取）
  - Initial state（初始谓词，由 LLM 接地生成）
  - Goal state（目标谓词，从指令中解析）

LLM 的 prompt 包含 few-shot 示例，展示如何将自然语言观察映射为 PDDL 谓词。

##### 3. 谓词接地的具体实现

LLM 被要求为每个观察到的对象生成一组谓词，例如：
- 观察："一个绿色的苹果在桌子上"
- 接地后：`(apple obj1)`, `(on obj1 table)`, `(color obj1 green)`, `(edible obj1)`...

对于未观察到的属性（如苹果是否可食用），LLM 利用常识推理进行合理推断，这就是"plausible predicates"的含义。若后续观察发现推断错误，Action Selector 可触发重新接地。

##### 4. 多次采样与计划选择

- LLM 对不确定的属性进行多次采样，每次采样生成不同的谓词集合
- 每个谓词集合产生一个 PDDL problem，交给规划器求解
- 若有多个可行计划，选择成功率最高（或启发式最佳）的执行
- 这种采样机制天然提供了对不确定性的处理能力

##### 5. Action Selector 的三类决策

1. **执行（Act）**：规划器给出了可行计划，选择一个动作执行
2. **重新审视（Review）**：执行后观察与预期不符，重新让 LLM 接地以修正谓词
3. **提问（Ask）**：当不确定性过高时，向用户请求澄清

##### 6. Alfworld 实验详情

Alfworld 是一个基于文本的具身环境，包含 6 类任务（如 pick、clean、heat、cool、look、pick two）。LLM-DP 在以下维度与 ReAct 对比：
- **成功率**：LLM-DP 在多个任务类型上超越 ReAct
- **效率**：LLM-DP 的平均动作步数更少，说明规划更优
- **LLM 调用次数**：LLM-DP 显著减少了对 LLM 的调用，降低了计算成本

##### 7. 局限与未来方向

- 依赖人工编写的 PDDL domain 文件，对全新领域需要人工介入
- 谓词接地的准确性依赖 LLM 的常识推理质量，极端情况下可能出错
- 未在连续控制或视觉输入环境中验证
- 未来可探索自动学习 domain 文件、与视觉模型集成等方向

##### 8. 与 ReAct 的详细对比

| 维度 | ReAct | LLM-DP |
|------|-------|--------|
| 推理机制 | 每步 LLM 思考+行动 | LLM 阶段性生成 PDDL + 规划器全局多步推理 |
| LLM 调用频率 | 每步 1 次 | 仅当需要重新接地时 |
| 长期规划能力 | 受上下文窗口限制 | 规划器保证最优/近似最优 |
| 对不确定性的处理 | 隐式依赖 LLM 理解 | 显式谓词采样 + 多重计划 |
| 可解释性 | 低（黑盒推理） | 高（PDDL 可读、计划可追溯） |

##### 9. 框架可扩展性

LLM-DP 的设计具有模块化特点：LLM 组件可选择不同模型（GPT-3.5/4 等），规划器可选择不同后端（FF、BF 等），PDDL domain 可适配不同任务域。这种灵活性使得该框架可推广到其他需要长期规划的具身场景。

#### 🧪 练习题
```yaml
question: "LLM-DP 中 LLM 与经典规划器的职责分工是什么？"
options:
  - "LLM 负责穷举搜索，规划器只做结果润色"
  - "LLM 负责把自然语言观察接地成 PDDL 问题，规划器负责求解动作序列"
  - "LLM 和规划器都各自独立输出完整答案，再投票"
  - "规划器只负责判断动作是否合法，LLM 负责整条长程搜索"
answer: 1
explain: "LLM-DP 的核心是神经符号分工：LLM 解决自然语言到符号状态的桥接，经典规划器负责真正的全局搜索与计划求解。"
```
