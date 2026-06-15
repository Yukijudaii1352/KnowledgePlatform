### 语言智能体树搜索 (LATS)

```yaml
id: lats
name: LATS
full_name: 语言智能体树搜索 (LATS)
year: '2023'
org: UIUC
paper_url: https://arxiv.org/abs/2310.04406
category: planning
parent: tot
motivation: 统一推理行动于蒙特卡洛树搜索
```

#### 📝 一句话总结

LATS 将语言模型的推理、行动和规划统一到 Monte Carlo Tree Search 中，用环境反馈、LM 价值评估和自反思指导搜索，比单条 ReAct 或纯 ToT 更适合交互式决策。

#### 🎯 核心要点

- **MCTS 框架**：包含 selection、expansion、simulation/evaluation、backpropagation
- **节点语义**：树节点表示部分状态或部分轨迹，边表示下一步语言行动或推理步骤
- **LM 作为策略**：用 LLM 生成候选动作或 thought，扩展搜索树
- **LM 作为价值函数**：用 LLM 评估候选状态的未来成功潜力
- **环境反馈**：动作会与真实环境交互，Observation 和 reward 进入搜索状态
- **自反思增强**：失败轨迹可生成反思，作为后续节点扩展的上下文
- **统一多类任务**：覆盖编程、交互问答、网页导航和数学推理等场景

#### 🔬 深入细节

##### 核心示意图

![LATS 总览图](https://ar5iv.labs.arxiv.org/html/2310.04406/assets/x1.png)
*图：LATS 结合外部环境、自反思和 MCTS 搜索，统一语言模型的推理、行动与规划。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# LATS 简化伪代码
def lats(root_state, lm_policy, lm_value, environment, budget):
    root = Node(state=root_state)
    for _ in range(budget):
        node = root

        # 1. Selection: 用 UCT 选择最有前景的叶子
        while node.is_fully_expanded() and not node.is_terminal():
            node = argmax(node.children, key=lambda c: uct_score(c))

        # 2. Expansion: LLM 生成候选行动
        if not node.is_terminal():
            actions = lm_policy.propose_actions(node.trajectory)
            for action in actions:
                obs, reward, done = environment.step(node.state, action)
                reflection = maybe_reflect(lm_policy, node.trajectory, obs, reward)
                node.add_child(action, obs, reward, done, reflection)
            node = select_new_child(node)

        # 3. Evaluation: 环境奖励 + LLM 价值评估
        value = node.reward
        if not node.done:
            value += lm_value.estimate(node.trajectory)

        # 4. Backpropagation
        while node is not None:
            node.visit_count += 1
            node.value_sum += value
            node = node.parent

    return best_child(root).trajectory
```

##### 方法解读

ReAct 让 agent 拥有“思考 - 行动 - 观察”的闭环，但它通常只沿一条轨迹前进；ToT 允许树搜索，但主要面向内部推理问题，通常没有真实环境反馈。LATS 把两者合并：每个搜索节点既可以包含语言推理，也可以包含环境交互后的观察。

MCTS 的选择阶段常用 UCT 平衡探索与利用：

$$\operatorname{UCT}(i)=Q_i+c\sqrt{\frac{\ln N}{n_i}}$$

其中 \(Q_i\) 是节点平均价值，\(N\) 是父节点访问次数，\(n_i\) 是子节点访问次数，\(c\) 控制探索。这样，LATS 不会只追随当前最高分分支，也会探索访问较少但可能有潜力的候选行动。

扩展阶段由 LLM 生成候选动作。动作可以是编程中的代码修改、问答中的搜索请求、网页环境中的点击/输入，也可以是数学推理中的下一步 thought。每个动作会进入环境执行，得到 observation、reward 和 done 标记，从而让搜索树包含真实反馈，而不是纯文本自评。

评估阶段结合两类信号：环境可提供的即时奖励或终局成功信息，以及 LLM 对非终局状态的价值估计。对失败或低分轨迹，LATS 还能生成 self-reflection，用自然语言总结错误并注入后续搜索上下文，减少重复犯错。

与 ToT 相比，LATS 的关键增加是 backpropagation。一次 rollout 的价值会沿路径回传，更新祖先节点统计，使后续 selection 更偏向已被证明有效的方向。与 Reflexion 相比，LATS 不是一轮失败后再尝试，而是在单个搜索预算内系统性探索多条行动路径。

> 💡 关键：LATS 把 LLM 既当策略模型又当价值模型，并让真实环境反馈参与 MCTS 的价值回传。

#### 🧪 练习题

```yaml
question: "LATS 中 MCTS 相比单条 ReAct 轨迹的主要作用是什么？"
options:
  - "让 agent 系统性探索多条行动/推理分支，并用价值回传更新选择策略"
  - "删除所有外部环境反馈"
  - "只保留最短的自然语言回答"
  - "把工具调用全部并行化"
answer: 0
explain: "LATS 使用 selection、expansion、evaluation 和 backpropagation，在树中比较多条候选轨迹，而不是只沿一条 ReAct 路径前进。"
```
