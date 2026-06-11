### Debate or Vote: 辩论还是投票 (Debate or Vote)

```yaml
id: debate_or_vote
name: Debate or Vote
full_name: 辩论还是投票 (Debate or Vote)
year: '2025.08'
org: University of Wisconsin-Madison
paper_url: https://arxiv.org/abs/2508.17536
category: deliberation
parent: vote_consensus
motivation: 证明多数投票贡献大于互辩
```

#### 📝 一句话总结
本文通过大规模实验和理论分析，将多智能体辩论(Multi-Agent Debate, MAD)拆解为"集成(ensembling)"与"通信(communication)"两个独立组成部分，证明简单的多数投票(Majority Voting)几乎解释了MAD的全部性能增益；并在理论上建立Dirichlet-Compound-Multinomial(DCM)模型，证明辩论过程是一个**鞅(martingale)**——期望信念在辩论中不发生变化，从而从理论上解释了多数投票的有效性。

#### 🎯 核心要点
- 将MAD分解为**多智能体集成(multi-agent ensembling)**和**智能体间通信(inter-agent communication)**两个独立组件，实验表明前者解释了主要增益
- 在7个基准(Arithmetics, GSM8K, MMLU, MMLU-Form.Log., HellaSwag, CommonSenseQA, HH-RLHF)上对比了Decentralized/Sparse/Centralized三种MAD变体与Majority Voting
- **Majority Voting全面碾压或持平MAD**：Qwen2.5-7B上MV平均0.7691 vs 最优MAD(Decentralized T=2) 0.7377；Llama3.1-8B上MV 0.7242 vs 最优MAD(Sparse T=2) 0.6990
- 建立**DCM理论框架**：每个智能体建模为Dirichlet先验+Multinomial采样的生成过程，辩论视为贝叶斯后验信念更新
- **理论核心定理**：证明辩论过程诱导**鞅(martingale)**——\( \mathbb{E}[\boldsymbol{\theta}_{i,t+1} \mid \mathcal{F}_t] = \boldsymbol{\theta}_{i,t} \)，即期望信念在辩论中不变，Peer influence只是随机扰动
- 定理1(Hoeffding下界)：若单智能体正确率\(p_0 > 0.5\)，多数投票成功率 \( \geq 1 - \exp(-2N(p_0-0.5)^2) \)，随N指数增长
- 基于理论设计两种干预：**MAD-Conformist**(与多数一致则保留)和**MAD-Follower**(以30%概率采纳多数意见)，均超越vanilla MAD
- 扩展验证包括更大模型Qwen2.5-32B、异构智能体组合、开放式自然语言任务，多数投票持续保持竞争力

#### 🔬 深入细节
##### 1. 核心框架图

论文的核心贡献框架可概括为"拆解→实验验证→理论建模→指导干预"四步：

![Debate or Vote 核心框架](https://arxiv.org/html/2508.17536v1/assets/fig1_overview.png)
*图1：MAD被拆解为Ensembling与Communication两部分，实验表明Ensembling(即Majority Voting)占主导*

##### 2. MAD形式化定义与三种变体

论文首先给出MAD的形式化定义。设N个智能体，问题q，每轮t各智能体i生成回答 \( y_{i,t} \)，基于上一轮其他智能体的回答进行更新：

**Decentralized MAD** (Liang et al., 2023)：每个智能体观察到所有其他智能体的回答，然后独立更新。通信拓扑为全连接。

**Sparse MAD** (Liu et al., 2024)：通信拓扑稀疏化以提升效率，智能体只与部分邻居通信。

**Centralized MAD** (Chan et al., 2024)：存在一个中心智能体汇总所有peer response并生成更新，再分发给各智能体。

**Majority Voting**：没有任何辩论，仅聚合所有智能体的初始回答，取多数票作为最终答案。可视为MAD在T=0时的特例。

##### 3. 实验核心发现

**Table 1 关键数据**（Qwen2.5-7B-Instruct, 平均准确率）：

| 方法 | Average |
|------|---------|
| Single-Agent | 0.7205 |
| Decentralized MAD (T=2) | 0.7377 |
| Sparse MAD (T=2) | 0.7330 |
| Centralized MAD (T=2) | 0.6551 |
| **Majority Voting** | **0.7691** |

Llama3.1-8B-Instruct上同样趋势：MV 0.7242 > 所有MAD变体。

**消融实验**(Figure 3)：随着智能体数量从1增加到5，性能单调提升，进一步佐证集成效应(而非通信)是主要驱动力。更大模型Qwen2.5-32B场景下MV仍保持竞争力。

##### 4. DCM理论框架（核心贡献）

**定义1 (DCM生成模型)**：每轮t，智能体i持有信念向量 \( \boldsymbol{\alpha}_{i,t} \in \mathbb{R}_+^K \)，两步生成回答：
1. **信念采样**：\( \boldsymbol{\theta}_{i,t} \sim \text{Dirichlet}(\boldsymbol{\alpha}_{i,t}) \)
2. **回答生成**：\( y_{i,t} \sim \text{Categorical}(\boldsymbol{\theta}_{i,t}) \)

这完美捕捉了LLM的双重不确定性——知识不确定性(Dirichlet先验的集中度)和采样随机性(Multinomial采样，对应temperature/nucleus sampling)。

**定义2 (贝叶斯信念更新)**：在辩论中，智能体观察邻居回答后，通过贝叶斯共轭更新：
\[
\boldsymbol{\alpha}_{i,t+1} = \boldsymbol{\alpha}_{i,t} + \mathbf{c}_{i,t}
\]
其中 \( \mathbf{c}_{i,t} \) 是邻居回答的计数向量。这是MAD的理论核心——辩论就是累积观测证据。

**定理(鞅性质)**：令 \( \mathbf{p}_{i,t} = \boldsymbol{\alpha}_{i,t} / \sum_k \alpha_{i,t}^{(k)} \) 为归一化信念。则有：
\[
\mathbb{E}[\mathbf{p}_{i,t+1} \mid \mathcal{F}_t] = \mathbf{p}_{i,t}
\]

> 💡 **关键直觉**：辩论是鞅意味着——**期望意义上，辩论既不提升也不降低智能体信念的正确性**。Peer influence只是随机噪声。这从理论上解释了为什么Majority Voting就已经足够：辩论没有系统性纠偏能力，增益完全来自初始回答的集成。

**定理1 (多数投票成功概率下界)**：
\[
P(\bar{X} > 0.5) \geq 1 - \exp(-2N(p_0 - 0.5)^2)
\]
其中 \( p_0 \) 是单智能体正确概率。只要 \( p_0 > 0.5 \)，多数投票成功率随N指数提升至1。这解释了为什么即使弱智能体(略好于随机)，足够多的集成也能获得高准确率。

##### 5. 基于理论的干预设计

从鞅定理出发，要提升辩论效果必须**打破鞅的对称性**——使信念更新偏向正确答案。由于多数投票在初始轮就是正确答案的良好代理(\(p_0 > 0.5\)时)，论文设计了两种干预：

- **MAD-Conformist**：若智能体回答与上一轮多数一致，则保留不更新；否则正常辩论
- **MAD-Follower**：以30%概率直接采纳上一轮的多数答案，其余70%正常辩论

这两种策略均使MAD性能超越vanilla baseline，验证了理论指导的有效性。但即便如此，它们仍未达到Oracle上界(用ground truth偏向)，表明设计更好的更新偏置仍是开放问题。

##### 算法伪代码

```python
# Majority Voting (核心baseline)
def majority_voting(agents, question):
    responses = [agent.answer(question) for agent in agents]
    return most_common(responses)

# Multi-Agent Debate (通用框架)
def mad_debate(agents, question, T):
    # Round 0: initial responses
    responses = {i: agents[i].answer(question) for i in range(N)}
    for t in range(1, T+1):
        for i in range(N):
            # Agent i observes peers (via communication topology)
            peer_responses = get_neighbor_responses(responses, i)
            responses[i] = agents[i].update(question, peer_responses)
    return majority_vote(responses)

# MAD-Conformist 干预
def mad_conformist(agents, question, T):
    responses = {i: agents[i].answer(question) for i in range(N)}
    for t in range(1, T+1):
        majority_ans = most_common(responses)
        for i in range(N):
            if responses[i] == majority_ans:
                continue  # 与多数一致，保留不变
            peer_responses = get_neighbor_responses(responses, i)
            responses[i] = agents[i].update(question, peer_responses)
    return majority_ans
```

#### 🧪 练习题
```yaml
question: "论文证明多智能体辩论(MAD)是一个鞅(martingale)过程，其核心理论含义是什么？"
options:
  - "辩论能够系统性提升智能体信念的正确性"
  - "期望意义上，辩论既不提升也不降低信念正确性，Peer influence仅为随机扰动"
  - "辩论轮数越多，多数投票的优势越小"
  - "集中式辩论(Centralized MAD)的收敛速度最快"
answer: 1
explain: "鞅性质意味着条件期望不变：E[θ_{t+1}|F_t]=θ_t，因此辩论在期望意义上不会改善或恶化信念，这从理论上解释了为何简单多数投票已占主导增益。"
```
