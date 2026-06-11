### ReWOO: 无观测推理 (ReWOO)

```yaml
id: rewoo
name: ReWOO
full_name: 无观测推理 (ReWOO)
year: '2023.05'
org: Microsoft
paper_url: https://arxiv.org/abs/2305.18323
category: decomposition
parent: react
motivation: 先产蓝图再执行工具减少串行依赖
```

#### 📝 一句话总结
ReWOO 提出将推理（Reasoning）与工具观察（Observations）解耦，先用 Planner 生成完整推理蓝图，再由 Worker 并行执行工具调用，最后 Solver 综合生成答案，从而消除了 ReAct 范式中的串行依赖，在 6 个基准上平均降低 64% token 消耗且绝对准确率提升 4.4%。

#### 🎯 核心要点
- 三模块架构：Planner（生成推理计划与工具调用蓝图）→ Worker（执行工具并填充证据）→ Solver（综合计划与证据生成最终答案）
- 根本创新：将 ReAct 的 Thought-Action-Observation 串行交织改为"先计划、后执行、再求解"的解耦范式
- Token 效率提升约 5×：HotpotQA 上 ReAct 消耗 9795 tokens，ReWOO 仅需 1986 tokens，成本从 $19.59 降至 $3.97（GPT-3.5）
- 支持 Planner 独立微调：解耦使 Planner 可在不暴露工具噪声的情况下微调，通用规划能力更强（基于 LoRA 微调 LLaMA 7B）
- 鲁棒性提升：工具调用失败或返回噪声时，Solver 可依据蓝图跳过劣质观察，避免级联错误
- 6 个公开基准 + 1 个策划数据集全面超越 ReAct，且 Planner 微调后性能进一步提升（微调版 Planner 7B + Solver 175B 在 HotpotQA 上 F1 达 47.5）
- 支持多种工具：Wikipedia、搜索引擎、计算器、LLM-based 工具（如翻译、推荐）等

#### 🔬 深入细节
![ReWOO 架构对比图](https://ar5iv.labs.arxiv.org/html/2305.18323/assets/x1.png)
*图：ReAct（左）的串行交织 vs ReWOO（右）的解耦并行架构。Planner 一次性生成完整计划，Worker 并行执行工具，Solver 汇总求解。*

##### 动机：串行依赖引发 Token 爆炸

ReAct 范式中，每步推理都需将前面所有 Thought-Action-Observation 重新作为提示输入，导致 token 消耗呈二次增长：

$$\#\text{Token}_I^{\text{ReAct}} = k\Theta(Q) + k\Theta(C) + k\Theta(\bm{S}) + \sum_{j=1}^{k-1}(k-j)\Theta(T_j+A_j+O_j)$$

其中 \(Q\) 为用户问题，\(C\) 为上下文，\(\bm{S}\) 为示例，\(T_j, A_j, O_j\) 分别为第 \(j\) 步的思考、动作、观察。随推理步数 \(k\) 增加，\(T_j, A_j, O_j\) 被重复编码，令牌消耗急剧膨胀。

##### 解耦方案：Planner → Worker → Solver

ReWOO 将过程切分为三个阶段：

1. **Planner（规划器）**：接收用户问题 \(Q\)、系统提示 \(C_{\text{planner}}\) 与示例 \(\bm{S}\)，输出一个包含推理步骤和工具调用槽位标记的**计划文本** \(\mathcal{P}\)，其中工具调用以 `#E` 等变量标记。

2. **Worker（执行器）**：解析计划中的工具调用，并行执行（如 Wikipedia 检索 `Search(Paris population)`），将结果填入对应证据变量 \(E_j\)。

3. **Solver（求解器）**：接收原问题 \(Q\)、完整计划 \(\mathcal{P}\) 及所有证据 \(\{E_1,...,E_k\}\)，在 \(C_{\text{solver}}\) 的提示下生成最终答案 \(\hat{A}\)。

其 Token 消耗仅为常量级叠加：

$$\#\text{Token}_I^{\texttt{ReWOO}} \approx 2\Theta(Q) + 2\Theta(C) + \Theta(\bm{S}) + \sum_{j=1}^{k}\Theta(P_j+E_j)$$

与 ReAct 相比，\(Q, C, \bm{S}\) 只被编码 1-2 次（vs \(k\) 次），且无冗余的 Thought-Action 重复。

##### 算法伪代码

```python
# ReWOO 伪代码（三步解耦）
def rewoo(question: str, tools: dict) -> str:
    # Step 1: Planner 生成蓝图
    plan = Planner.generate(question, system_prompt, exemplars)
    # plan 示例: "To answer, I need to find #E1 = Search(population of Paris)"

    # Step 2: Worker 并行执行工具
    evidence = {}
    tool_calls = parse_tool_calls(plan)  # 提取 #E1, #E2...
    for var, (tool_name, arg) in tool_calls.items():
        evidence[var] = tools[tool_name].execute(arg)

    # Step 3: Solver 综合求解
    answer = Solver.solve(question, plan, evidence, solver_prompt)
    return answer
```

> 💡 关键：Worker 的各工具调用**彼此独立**，可批量并行执行，进一步降低延迟。

##### 为什么 Planner 可独立微调？

传统范式（如 ReAct）中，微调需构造完整的 Thought-Action-Observation 轨迹，工具返回结果混杂噪声，导致模型暴露于不稳定的工具反馈下。ReWOO 的 Planner 仅需生成结构化计划文本，而不需接触工具输出，因此可以在**纯文本规划数据**上进行微调（LoRA on LLaMA 7B），训出的 Planner 具有更强且更通用的推理规划能力，且对未见过的工具组合有更好的零样本适应力。

##### 主要实验结果

| Benchmark | Metric | ReAct | ReWOO | 提升 |
|-----------|--------|-------|-------|------|
| HotpotQA  | Acc    | 40.8  | 42.4  | +1.6 |
| HotpotQA  | Tokens | 9795  | 1986  | -79.7% |
| TriviaQA  | Acc    | 59.4  | 66.6  | +7.2 |
| GSM8K     | Acc    | 62.0  | 62.4  | +0.4 |
| StrategyQA| Acc    | 64.6  | 66.6  | +2.0 |
| PhysicsQA | Acc    | 64.1  | 66.0  | +1.9 |
| SportsU.  | Acc    | 58.6  | 61.3  | +2.7 |
| SOTUQA    | Acc    | 64.8  | 70.2  | +5.4 |

- 6 个公开基准平均：Token 减少 **64%**，绝对准确率提升 **4.4%**。
- Planner 7B（LoRA 微调）+ Solver ChatGPT 组合在 HotpotQA F1 达 47.5，超越全量 ReAct（F1 39.6）近 8 个点。

##### 与 ReAct 的本质区别

| 维度 | ReAct | ReWOO |
|------|-------|-------|
| 推理-行动耦合 | 交替：Thought → Action → Obs | 解耦：Plan → (Worker) → Solve |
| Token 增长 | 随步数二次增长 | 随步数线性增长 |
| 工具调用 | 串行，依赖前一步观测 | 并行，无步间依赖 |
| 规划器微调 | 需完整轨迹（含工具噪声） | 仅需计划文本 |
| 工具失败鲁棒性 | 观测污染后续推理链 | Solver 可忽略失败证据 |

#### 🧪 练习题
```yaml
question: "ReWOO 的三个核心模块按执行顺序是什么？"
options:
  - "Solver → Worker → Planner"
  - "Planner → Worker → Solver"
  - "Worker → Planner → Solver"
  - "Planner → Solver → Worker"
answer: 1
explain: "ReWOO 先由 Planner 生成推理蓝图，Worker 填充工具证据，最后 Solver 汇总输出最终答案。"
```
