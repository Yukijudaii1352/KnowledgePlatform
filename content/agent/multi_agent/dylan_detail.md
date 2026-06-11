### DyLAN: 动态LLM智能体网络 (Dynamic LLM-Powered Agent Network)

```yaml
id: dylan
name: DyLAN
full_name: 动态LLM智能体网络 (Dynamic LLM-Powered Agent Network)
year: '2023.10'
org: Tsinghua AIR
paper_url: https://arxiv.org/abs/2310.02170
category: communication
parent: agentverse
motivation: 按任务自选团队并动态连边
```

#### 📝 一句话总结
DyLAN 将多 LLM-Agent 协作建模为一个**动态前馈网络**，在每层推理时通过 LLM 赋能的 Ranker 动态选择最相关的 Agent 子集参与信息传递，并提出无监督的 **Agent Importance Score (AIS)** 在推理后进行 Agent Team 优化，在 MATH、MMLU、HumanEval 等复杂推理任务上显著超越单 Agent 和静态多 Agent 基线，同时大幅降低 API 调用开销。

#### 🎯 核心要点
1. **Problem**: 现有 Multi-Agent 协作框架（如 Multi-Agent Debate、LLM-Blender）采用**静态全连接架构**，所有 Agent 在所有时刻都参与协作，导致：(a) 计算和 API 调用开销巨大；(b) 低质量 Agent 的噪声会传播并污染整个讨论过程；(c) 无法根据任务难度自适应调整协作深度。

2. **Core Idea — DyLAN 动态网络**：
   - 将多 Agent 协作用 **T 层前馈网络** 建模，层间全连接（每层所有 Agent 都能看到上一层所有 Agent 的输出）
   - 在每层推理**时 (Inference-Time)**，引入 **LLM-empowered Ranker** 动态筛选 top-k 最相关的 Agent 响应，其余被剪枝
   - 引入 **Early Stopping** 机制：当连续两层 top-1 Agent 答案一致时提前终止，自适应任务难度
   - 在推理**后 (Post-Inference)**，通过 **Agent Importance Score (AIS)** 评估每个 Agent 的整体贡献，自动找出最优 Agent 子集用于下游任务或下一轮迭代

3. **Agent Importance Score (AIS)** — 三步无监督评估：
   - **Step 1 — Propagation**: 计算每一层中 Agent j 对 Agent i 的贡献：`c_{i←j}^{(t)} = softmax(cos(e_i^{(t)}, e_j^{(t-1)}) / τ)`，其中 embeddings 由 Ranker LLM 的 hidden states 得到
   - **Step 2 — Aggregation**: 逐层聚合贡献分数，通过递推公式 `s_i^{(t)} = Σ_j c_{i←j}^{(t)}·s_j^{(t-1)}` 将重要性从输入层传播到输出层，最终得到每个 Agent 的全局 AIS
   - **Step 3 — Selection**: 按 AIS 降序排列，选取 top-k 组成优化后的 Agent Team，或剔除低分噪声 Agent

4. **实验亮点**：
   - **MATH**（极难数学推理）：DyLAN 达到 37.6% (+3.5 vs Single CoT, +4.1 vs Single)，超越 LLM-Debate (+2.2)
   - **MMLU**（多学科知识）：70.5% (+4.1 vs Single)，部分学科（如 College Mathematics, Formal Logic）提升高达 25%
   - **HumanEval**（代码生成）：pass@1 约 13.3% 的相对提升，证实动态协作对代码任务也有效
   - **效率**：API 调用量仅为 LLM-Blender 的 ~30-50%，且在 Agent 数量增大时优势更明显
   - **消融实验**：证明了 (a) 动态选择优于静态全连接；(b) Early Stopping 减少 ~40% 推理开销且不损性能；(c) AIS 筛选的 top-k 团队优于随机选择

#### 🔬 深入细节
```python
# 多智能体协作抽象循环
plan = coordinator.decompose(task)
for subtask in plan:
    result = coordinator.assign(subtask).run()
    coordinator.update(result)
return coordinator.final_answer()
```

##### 1. 模型架构：T 层前馈 Agent 网络

![DyLAN Overview](https://ar5iv.labs.arxiv.org/html/2310.02170/assets/figs/overview2.png)

*Figure 1: DyLAN 整体架构示意图。左侧展示了 T 层前馈网络结构，每层包含 N 个 Agent；右侧展示了 Inference-Time Agent Selection 和 Post-Inference AIS 计算的完整流程。*

DyLAN 将多 Agent 协作形式化为一个 **T 层前馈网络**，核心组件：

- **Node（节点）**: 位置 (t, i) 处的节点代表第 i 个 Agent 在第 t 层的 "状态"，其值 `x_i^(t)` 是该 Agent 看到上一层所有 Agent 的输出后重新生成的响应
- **Edge（边）**: 从 (t-1, j) 到 (t, i) 的有向边表示 Agent i 在 t 层 "参考" 了 Agent j 在 t-1 层的输出。每条边有权重，由 Ranker 动态计算
- **Message Passing**: 标准的前馈信息流：`x_i^(t) = f_i( {x_j^(t-1) | j ∈ TopK^(t)(i)} )`，其中 TopK 操作由 LLM-empowered Ranker 完成

**关键创新**：不同于 Transformer 中固定的全连接或 GNN 中预定义的图结构，DyLAN 的**连接模式是动态且 query-dependent 的**——同一网络面对不同输入问题时，Ranker 会选择不同的 Agent 子集进行信息聚合。

##### 2. Inference-Time: LLM-empowered Ranker

这是 DyLAN 实现动态架构的核心机制。Ranker 本身也是一个 LLM（实验中与 Agent 共享同一基础模型），在每一层 t 对每个 Agent i 执行：

**伪代码**：
def ranker_layer_t(agent_i, all_agent_outputs_prev_layer, query):
    """
    Input:
        agent_i: 当前要被 "喂入" 信息的 Agent
        all_agent_outputs_prev_layer: 上一层所有 Agent 的输出列表
        query: 原始任务问题
    Output:
        top_k_responses: 筛选后的 top-k 个最相关响应
    """
    prompt = f"""
    You are evaluating which agents' responses are
    most relevant for Agent {i} to consider.
    Task: {query}
    Agent {i}'s current draft: {agent_i.current_draft}

    Evaluate each response below on a 1-5 scale for
    relevance and usefulness:
    """
    for each response_j in all_agent_outputs_prev_layer:
        prompt += f"Agent {j}: {response_j}\n"

    scores = LLM(prompt)  # LLM 打分
    top_k_indices = argmax_k(scores)
    return [all_agent_outputs_prev_layer[idx]
            for idx in top_k_indices]

**实际实现细节**：
- Ranker 使用与 Agent 相同的基础 LLM（如 GPT-3.5-Turbo），但通过专门的 prompt 模板引导其扮演 "评判者" 角色
- Top-k 中的 k 是一个关键超参数：论文实验发现 k=3 在大部分任务上达到最佳精度-效率平衡
- Ranker 输出的 scores 除了用于 top-k 筛选外，还被用来计算后续的 AIS
- **Early Stopping** 逻辑：每层结束后，比较当前层 top-1 Agent 的最终答案与上一层 top-1 的答案；若连续两次一致，则终止推理并输出该答案

##### 3. Post-Inference: Agent Importance Score (AIS)

推理结束后，DyLAN 利用整个推理轨迹进行 Agent 贡献度评估：

**Step 1 — Contribution Quantification (Propagation)**:
对于层 t，Agent j (t-1 层) 对 Agent i (t 层) 的贡献定义为：
c_{i←j}^(t) = softmax( cos(e_i^(t), e_j^(t-1)) / τ )
其中 `e_i^(t)` 和 `e_j^(t-1)` 分别是 Ranker 在评估时产生的 Agent i 和 Agent j 对应输出的 embedding 表示（取 Ranker LLM 最后一层 hidden state）。τ 是温度系数（实验中设为 0.1，使分布更尖锐，区分度更高）。

**为什么用 cosine similarity？** 因为 Ranker 在对 Agent i 评估 Agent j 的输出时，其内部的 hidden state 编码了两者的 "匹配程度"：如果 Agent j 的输出确实对 Agent i 有帮助，Ranker 在处理时会自然地将两者的表示对齐，cosine similarity 自然较高。

**Step 2 — Aggregation across Layers**:
从第一层向后递推聚合：
s_i^(1) = 1/|N|  （初始化为均匀分布）
s_i^(t) = Σ_{j=1}^{N} c_{i←j}^(t) · s_j^(t-1)
最终，Agent j 的全局 AIS = `s_j^(T)`（第 T 层的聚合值）。这个递推公式本质上是一种 **PageRank 变体**：一个 Agent 的重要性不仅取决于它在某一层被多少 Agent 引用，还取决于引用它的那些 Agent 本身是否重要。

**Step 3 — Team Optimization (Selection)**:
获得所有 Agent 的 AIS 后：
- 按 AIS 降序排序
- 选取 top-k 组成优化后的 Agent Team
- 可用于：(a) 下一轮更高效的推理（仅保留高 AIS Agent）；(b) 对同一任务族的下游任务直接复用筛选好的团队；或 (c) 剔除低质量/噪声 Agent

**实验验证**：论文在 MMLU 上进行了 AIS-guided team selection 实验，发现仅保留 top-3 (AIS) Agent 的团队，其性能（68.2%）接近全 5 Agent 团队（70.5%），但 API 调用量减少 40%。

##### 4. 为什么 DyLAN 优于静态方法？—— 深层分析

**(a) 动态连接对抗噪声传播**：在静态全连接框架（如 Multi-Agent Debate）中，一个产生错误推理的 Agent 的输出会被所有其他 Agent 看到，错误可能在多次迭代中被放大。DyLAN 的 Ranker 倾向于给不一致或低质量的输出打低分，从而在消息传递阶段就将其剪枝，阻止噪声扩散。论文在 MATH 数据集的 case study 中展示了这一点：一个持续产生错误代数运算的 Agent 在 DyLAN 中从第 2 层起基本被排除在 Top-K 之外。

**(b) 自适应深度提升效率**：Early Stopping 使简单问题在 2-3 层后即可终止，只有极难问题才走到 T=5 的满深度。MATH 数据集上平均推理层数为 3.2 层，相比固定深度 5 层节省约 36% 开销。

**(c) AIS 实现了 "推理诊断"**：传统多 Agent 系统对 "哪些 Agent 真正有用" 是黑箱的。AIS 提供了可解释的贡献度量，论文发现 AIS 高的 Agent 往往是那些：(i) 推理链更完整（包含更多中间步骤）；(ii) 能发现并纠正其他 Agent 错误的 "批判者" 类型 Agent；(iii) 在问题相关领域有更强专业知识的 Agent（如 College Math 问题上，被分配了 "数学家" persona 的 Agent AIS 显著更高）。

#### 🧪 练习题
```yaml
question: "DyLAN 中“dynamic”最核心地体现在哪两个阶段？"
options:
  - "只在训练阶段动态增删参数"
  - "推理时动态选择 top-k agent 信息源，推理后再用 AIS 优化 agent team"
  - "只在数据预处理阶段做动态采样"
  - "只在最终投票阶段改动权重"
answer: 1
explain: "DyLAN 的动态性一部分发生在 inference-time ranking，另一部分发生在 post-inference 的 AIS team optimization；这两者共同区别于静态全连接协作。"
```
