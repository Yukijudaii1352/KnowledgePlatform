### RAP: 通过规划进行推理 (Reasoning via Planning)

```yaml
id: rap
name: RAP
full_name: 通过规划进行推理 (Reasoning via Planning)
year: '2023.05'
org: UC San Diego
paper_url: https://arxiv.org/abs/2305.14992
category: search
parent: react
motivation: 将LLM重塑为世界模型并做MCTS
```

#### 📝 一句话总结
RAP 将大语言模型的推理过程重新定义为马尔可夫决策过程（MDP），引入世界模型与蒙特卡洛树搜索（MCTS）进行战略性前瞻探索，从而替代传统从左到右的链式解码，显著提升了数学推理、逻辑推理和规划任务的准确性。

#### 🎯 核心要点
- 将 LLM 推理建模为 **MDP**：状态为当前推理上下文（中间步骤序列），动作为推理子步骤的生成
- 引入 **世界模型（World Model）**：利用 LLM 自身模拟状态转移，预测采取某动作后的下一个推理状态
- 设计 **多层次奖励函数**：包含自评估奖励（Self-evaluation）、动作似然奖励（Action Likelihood）、任务特定奖励（Task-specific）和置信度奖励（Confidence）
- 提出 **MCTS 四阶段搜索**：选择（Selection）→ 扩展（Expansion）→ 模拟（Simulation）→ 反向传播（Backpropagation），在推理树中进行前瞻探索
- 提出 **RAP-Aggregate** 方法：聚合多条高奖励推理路径，进一步提升推理准确性
- 在 GSM8k（数学推理）、PrOntoQA（逻辑推理）、Blocksworld（规划）三大基准上均取得显著提升

#### 🔬 深入细节
##### 1. 核心框架：推理即规划

![RAP 核心框架图](https://ar5iv.labs.arxiv.org/html/2305.14992/assets/x1.png)
*图：RAP 将推理建模为世界模型驱动的规划问题，并在推理树上执行 MCTS 前瞻搜索。*

RAP 的核心洞察是：**传统 LLM 推理采用自回归式一步接一步生成，缺乏全局前瞻能力**，容易在推理早期走入死胡同而不自知。RAP 通过将推理重新定义为规划问题来解决这一根本缺陷：

- **状态 \(s_t\)**：当前推理上下文，包含已生成的所有中间步骤
- **动作 \(a_t\)**：从当前状态出发的下一步推理子步骤——例如数学推理中的下一行计算、逻辑推理中的下一跳推理、或规划任务中的下一个操作
- **策略 \(\pi(a|s)\)**：LLM 根据当前状态决定下一步动作的概率分布

> 💡 关键：这种 MDP 建模将推理从"被动生成"转变为"主动规划"——模型不再仅仅根据前缀预测下一个 token，而是基于当前状态评估多个可能的方向，再选择最优路径。

##### 2. 世界模型与状态转换

世界模型是 RAP 的基础组件之一，负责模拟动作的后果。在标准 MCTS 中，世界模型需要预测执行动作后环境将转移到的下一个状态。RAP 巧妙地**复用 LLM 自身作为世界模型**：

$$s_{t+1} = \text{LLM}(s_t, a_t)$$

具体而言，给定当前状态 \(s_t\)（例如 "Step 1: …\nStep 2: …"）和候选动作 \(a_t\)（例如 "下一步：计算 x + y = …"），世界模型将两者拼接后输入 LLM，生成下一个状态 \(s_{t+1}\)。这种设计使得世界模型天然具备语义理解能力，能够处理自然语言推理步骤中的复杂状态转换。

> ⚠️ 注意：与强化学习中精确的环境模型不同，RAP 的世界模型是概率性的且可能产生错误。这也正是 MCTS 需要探索多条路径的原因。

##### 3. 奖励函数设计

RAP 设计了**四类互补的奖励**来评估推理路径的质量：

**（1）自评估奖励（Self-evaluation Reward）**\(R_{\text{self}}\)：
LLM 本身对当前状态是否"在正确轨道上"给出置信度评分。Prompt 设计为：
- 给定问题、当前部分推理、可能的下步行动，评估该行动后状态是否合理
- 输出 0-1 之间的分数

**（2）动作似然奖励（Action Likelihood Reward）**\(R_{\text{action}}\)：
基于 LLM 生成动作时的对数似然来评估动作的"自然程度"：
$$R_{\text{action}}(a_t|s_t) = \frac{1}{|a_t|}\sum_{i=1}^{|a_t|} \log P_{\text{LLM}}(w_i|s_t, w_{<i})$$

这在结构化推理任务（如 Blocksworld 中的操作）中尤其有效，因为合理的动作通常具有更高的生成概率。

**（3）任务特定奖励（Task-specific Reward）**\(R_{\text{task}}\)：
根据任务目标定义的确定性奖励，例如 Blocksworld 中判断是否达到目标布局。这类奖励最为可靠但仅在规划类任务中可用。

**（4）置信度奖励（Confidence Reward）**\(R_{\text{conf}}\)：
评估状态转换的确定性，即 LLM 对生成下一个状态的置信度。这反映了世界模型对该状态预测的把握程度。

最终奖励为加权组合：
$$R(s_t, a_t, s_{t+1}) = w_1 R_{\text{self}} + w_2 R_{\text{action}} + w_3 R_{\text{task}} + w_4 R_{\text{conf}}$$

##### 4. MCTS 四阶段搜索

RAP 利用 MCTS 在推理树上执行**迭代式前瞻搜索**，每个节点存储访问次数 \(N(s)\) 和累计价值 \(Q(s)\)。每次迭代包含四个阶段：

```
# RAP MCTS 搜索算法
while not terminal and iterations < max_iter:
    # 阶段 1: 选择 (Selection)
    node = root
    while node.children:
        node = argmax_child(Q(child) + c_puct * P(child) * sqrt(N(parent)) / (1 + N(child)))
    
    # 阶段 2: 扩展 (Expansion)
    actions = LLM.generate_actions(node.state, k=top_k)
    for action in actions:
        next_state = WorldModel.predict(node.state, action)
        reward = RewardModel.evaluate(node.state, action, next_state)
        node.add_child(action, next_state, reward)
    
    # 阶段 3: 模拟 (Simulation)
    leaf = select_best_child(node)  # 基于奖励选择最有希望的子节点
    value = rollout(leaf.state, depth=simulation_depth)
    
    # 阶段 4: 反向传播 (Backpropagation)
    while node:
        node.N += 1
        node.Q += (value - node.Q) / node.N
        node = node.parent
```

**阶段 1 — 选择（Selection）**：从根节点开始，递归选择最优子节点直至到达未完全扩展的节点。选择策略使用 PUCT（Predictor + UCT）公式，平衡探索与利用。其中 \(P(\text{child})\) 是 LLM 对动作的先验概率，\(c_{\text{puct}}\) 控制探索强度。

**阶段 2 — 扩展（Expansion）**：利用 LLM 生成当前节点的 top-k 候选动作，通过世界模型预测每个动作产生的下一个状态，并计算即时奖励。每个（动作，状态）对被添加为当前节点的子节点。

**阶段 3 — 模拟（Simulation）**：从新扩展的节点中选择一条路径，进行有限深度的快速推演（rollout），利用奖励信号估计该路径的长期价值。模拟过程无需展开所有分支，大幅节省计算开销。

**阶段 4 — 反向传播（Backpropagation）**：将模拟得到的价值沿着搜索路径反向传播，更新所有经过节点的访问次数和平均价值。这确保了未来搜索时，被证明有效的节点会获得更高的选择优先级。

> 💡 关键：MCTS 的核心优势在于**战略性前瞻**——在推理早期就能检测到死胡同并返回尝试替代路径，类似于人类"先试探几步再决定方向"的思考模式。

##### 5. RAP-Aggregate：多路径聚合

MCTS 搜索结束后得到一棵推理树，RAP 从中提取多条高奖励路径（而非仅选最优的一条）进行聚合：

- 按访问次数和平均价值对所有叶节点排序
- 选取 top-m 条完整推理链
- 重新组合这些链条中的关键推理步骤，生成最终的聚合推理

这种方法类似于 Self-Consistency 的改进——不是简单地多数投票，而是基于搜索过程中的奖励信号选择高质量路径进行智能融合。在数学推理任务中，RAP-Aggregate 在 RAP 基础上额外提升了约 3% 的准确率。

##### 6. 实验表现

RAP 在三大推理基准上取得了显著提升：

| 任务 | 基准 (CoT/COT-SC) | RAP | RAP-Agg |
|------|--------------------|-----|---------|
| GSM8k 数学推理 | 39.2% / 44.3% | 48.8% | ~51.7% |
| PrOntoQA 逻辑推理 (整体证明正确率) | 8%~13% (CoT) | 65% | — |
| PrOntoQA 逻辑推理 (最终答案正确率) | — / 89.8% | 94.2% | — |
| Blocksworld (Llama-2 70B, 4步) | ~20% (CoT) | ~91% | — |

消融实验（Table 6, GSM8k 前300例）进一步揭示了奖励设计的重要性：
- 仅使用置信度奖励：RAP(1) = 0.350，RAP(10) = 0.447
- 置信度 + 动作似然奖励：RAP(1) = 0.373，RAP(10) = 0.423
- 置信度 + 自评估奖励（完整）：RAP(1) = **0.410**，RAP(10) = **0.450**，+Agg = **0.503**

自评估奖励在所有配置中均表现最优，且计算效率高，是 RAP 的核心驱动力。

#### 🧪 练习题
```yaml
question: "RAP 框架中，世界模型（World Model）主要用于完成什么功能？"
options:
  - "替代 LLM 直接生成最终答案"
  - "预测给定当前状态和动作后的下一个推理状态"
  - "计算 MCTS 搜索树中每个节点的访问次数"
  - "评估整个推理任务的最终难度等级"
answer: 1
explain: "RAP 中的世界模型复用 LLM 自身来模拟状态转换——给定当前推理状态s_t和候选动作a_t，预测下一步推理状态s_{t+1}。这使得系统能前瞻性地评估不同动作的后果，而无需实际执行到底。"
```
