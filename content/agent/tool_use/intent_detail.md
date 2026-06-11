### INTENT: 意图感知预算规划 (INTENT)

```yaml
id: intent
name: INTENT
full_name: 意图感知预算规划 (INTENT)
year: '2026.02'
org: RUC/SUFE/Baidu
paper_url: https://arxiv.org/abs/2602.11541
category: orchestration
parent: llm_compiler
motivation: 在预算约束下规划高成本工具调用
```

#### 📝 一句话总结
INTENT 提出了一种面向高成本工具调用的推理时规划框架：它先用语言 world model 预演未来工具使用，再用“意图满足概率”对每一步成本做风险校准，从而在硬预算约束下显著提升 Agent 的任务成功率。

#### 🎯 核心要点
- 形式化了 **预算约束工具代理**：每个任务由查询 \(q\)、预算 \(B\) 和动态工具市场快照 \(\mathcal{M}\) 构成。
- 训练 **Language World Model** 预测工具调用后的观测结构，用于轻量 lookahead，而不是昂贵的树搜索。
- 提出 **Monte Carlo Oracle (MCO)**：通过单条前瞻 rollout 预估未来成本，超预算时拦截当前动作并返回失败轨迹。
- 提出 **INTENT**：把 world model 分解成 **意图预测器** 与 **条件生成器**，显式估计工具结果是否满足当前推理意图。
- 用 **几何分布成本校准** 把单步实际成本 \(c\) 修正为 \(\hat{c}=c/\rho\)，对低成功率工具进行风险惩罚。
- 在 cost-augmented StableToolBench 上，相比 Raw / Prompt / DFSDT / BTP / BATS / MCO，INTENT 在两类 backbone 上都取得了最佳预算内性能。

#### 🔬 深入细节
![INTENT 框架图](https://ar5iv.labs.arxiv.org/html/2602.11541/assets/x1.png)

*图：预算约束下的三种推理时规划范式对比。INTENT 不做重型树搜索，而是用意图感知的单轨迹模拟与风险校准完成预算控制。*

##### 问题设定：Agent 面对的是“动态工具市场”

这篇论文要解决的不是普通的工具调用，而是 **有预算上限的工具调用**。每次请求都带着一个市场快照：

```python
task_instance = {
    "query": q,
    "budget": B,
    "market": [(tool_1, cost_1), (tool_2, cost_2), ...]
}
```

这里最关键的现实假设有两个：

- **工具有价格**，每调用一次就要扣钱；
- **市场是动态的**，工具是否可用、每次调用多少钱，都可能在不同任务里变化。

这使得传统 offline 训练出来的固定策略不够用。模型在训练时见过的工具市场，和推理时遇到的市场不一定一致，所以作者选择做 **inference-time planning**，而不是再训一个重型后训练策略。

##### 为什么不用 MCTS

论文先解释为什么标准在线规划算法不合适：

- 工具参数是自然语言、代码或查询，**动作空间几乎无限**；
- LLM 每次推理都贵，**没法像 MCTS 那样做大量模拟**；
- 文本历史不断增长，状态很难压缩复用。

所以论文只保留“向前模拟”这个思想，但把它压缩成 **单轨迹轻量 lookahead**。

##### 第一层：Language World Model

作者先训练一个语言 world model \(\mathcal{W}_{\phi}\)，输入工具调用与参数，预测工具返回的观测结构：

$$
\tilde{o}_t \sim \mathcal{W}_{\phi}(\cdot \mid [T_t, u_t]).
$$

重点不是让 world model 真的预测出精确事实值，而是预测：

- 返回结果的结构；
- 结果大致是否可用；
- 这一步会不会把 Agent 带向成功还是失败循环。

换句话说，INTENT 要的是 **“能否看出这条计划会不会超预算”**，而不是做一个完美的环境模拟器。

##### 基线 Oracle：Monte Carlo Oracle (MCO)

MCO 的逻辑很直接。Agent 给出当前动作 \(a_t\) 后，Oracle 用 world model 和当前策略向前 rollout 到最终答案，得到一条模拟轨迹 \(\tilde{\tau}\)，并计算其总成本：

$$
C(\tilde{\tau}) = \sum_{\tilde{a}\in\tilde{\tau}} \textsc{Cost}(\tilde{a}).
$$

如果总成本不超过剩余预算，就放行；否则拦截当前动作，并把导致超预算的未来动作序列回传给 Agent 作为反馈。

```python
def mco_decide(history, reasoning, action, budget):
    rollout = simulate_future(history, reasoning, action)
    projected_cost = sum(cost(a) for a in rollout)
    if projected_cost <= budget:
        return "accept", None
    return "reject", failure_trace(rollout)
```

这个设计已经很有用，但它有一个明显缺陷：**只采一条未来轨迹，方差太大**。如果模拟恰好抽到“幸运路径”，就会低估真实成本。

##### INTENT 的关键观察：真正决定 replanning 的是“是否满足意图”

INTENT 的核心思想是：Agent 后续是否会改变高层计划，不取决于工具返回内容的每个细节，而更取决于 **当前结果是否满足了这一步的意图**。

比如搜索失败、返回无关结果、数据库查不到记录，Agent 往往会继续重试或改写参数。于是论文引入一个二值潜变量：

$$
z_t \in \{0,1\},
$$

其中 \(z_t=1\) 表示“这次工具结果满足了当前推理意图”。

于是观测生成被分解为：

$$
P_{\mathcal{W}}(o_t \mid r_t, a_t)
=
\sum_{z_t \in \{0,1\}}
P(o_t \mid a_t, z_t)\cdot P(z_t \mid r_t, a_t).
$$

这对应两个子模块：

- **Intention Predictor**：预测成功满足意图的概率 \(\rho_t\)；
- **Conditional Generator**：在给定 \(z_t\) 的条件下生成观测内容。

##### 理想轨迹 + 悲观定价

INTENT 的妙处在于它不去显式采样失败分支，而是做：

- **乐观模拟**：强制每一步都满足意图，生成一条“理想轨迹” \(\tilde{\tau}^{*}\)；
- **悲观定价**：不用原始单次成本，而是把每一步成本按成功概率膨胀。

如果某一步原始成本为 \(c_k\)，成功满足意图的概率为 \(\rho_k\)，则其有效成本定义为：

$$
\tilde{c}_k = \frac{c_k}{\rho_k}.
$$

直觉很简单：如果一条工具调用一次成功的概率只有 0.25，那平均要试四次，真实期望成本就不该按一次算。

最终接受规则是：

$$
\gamma \sum_{\tilde{a}_k \in \tilde{\tau}^{*}} \tilde{c}_k \le B_t,
$$

其中 \(\gamma\) 是风险偏好系数：

- \(\gamma \ge 1\)：更保守；
- \(\gamma < 1\)：更激进。

> 💡 关键：INTENT 不是直接“搜索最便宜路线”，而是先抽出 Agent 眼中的潜在计划，再用成功概率给这条计划重新定价。

##### 完整流程

```python
def intent_oracle(history, reasoning, action, budget):
    ideal_traj = simulate_with_forced_success(history, reasoning, action)
    effective_cost = 0.0
    for step in ideal_traj:
        rho = intention_predictor(step.reasoning, step.tool, step.args)
        effective_cost += raw_cost(step.action) / rho
    if raw_cost(action) <= budget and gamma * effective_cost <= budget:
        return "accept", None
    return "reject", annotated_failure_trace(ideal_traj)
```

论文还加入了 **simulation reuse**：如果下一步真实动作和上一步缓存的理想轨迹对齐，就直接复用已有模拟，减少额外开销。

##### 实验结果

INTENT 在 cost-augmented StableToolBench 上，与多类基线比较：

- **Soft baselines**：Raw、Prompt
- **Enforce baselines**：DFSDT、BTP、BATS、MCO

在 **Non-Reasoning backbone（GPT-4.1 mini）** 上：

- INTENT 的 PR 为 **63.8**
- 高于 MCO 的 **58.9**
- 且 FR 为 **100.0**，实现严格预算可行

在 **Reasoning backbone（GPT-5 nano）** 上：

- INTENT 的 PR 为 **76.0**
- 高于 MCO 的 **71.4**
- WR、OR 也都是全表最佳

论文还展示了它对 **价格变化、预算变化、新工具引入** 的鲁棒性，说明这种 world-model + oracle 的做法比把预算约束硬塞进 prompt 更稳定。

##### 这篇工作的意义

INTENT 的代表性不在于又提出了一个新 Agent prompt，而在于它把预算控制从“口头要求节省调用”推进成了一个真正的推理时控制机制：

- 先预测未来；
- 再估算风险；
- 再决定是否拦截当前动作。

这条路线很适合高成本工具市场，比如付费搜索、企业内部 API、昂贵代码执行或多服务编排。

> ⚠️ 注意：INTENT 依赖于 world model 和意图预测器的质量。如果这两个模块严重偏差，Oracle 也会系统性误判预算风险。

#### 🧪 练习题
```yaml
question: "INTENT 中把单步工具成本从 c 修正为 c/ρ 的直接目的是什么？"
options:
  - "把所有工具价格统一到同一个常数"
  - "根据意图满足概率估计重试开销，对高风险调用做悲观定价"
  - "让 world model 不再需要生成观测"
  - "把多步轨迹压缩成一步"
answer: 1
explain: "ρ 表示该工具结果满足当前意图的概率。若 ρ 很低，模型往往需要多次重试，因此 INTENT 用 c/ρ 估计更真实的期望成本。"
```
