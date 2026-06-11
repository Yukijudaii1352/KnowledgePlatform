### Vote/Consensus: 投票还是共识 (Voting or Consensus?)

```yaml
id: vote_consensus
name: Vote/Consensus
full_name: 投票还是共识 (Voting or Consensus?)
year: '2025.02'
org: University of Göttingen
paper_url: https://arxiv.org/abs/2502.19130
category: deliberation
parent: mad
motivation: 系统比较投票与共识协议优劣
```

#### 📝 一句话总结
这篇工作在严格控制其他讨论参数不变的前提下，系统比较了 7 种多智能体决策协议，发现 voting 在 reasoning 任务上更强，而 consensus 在 knowledge 任务上更稳，并进一步提出 AAD 与 CI 两种提升答案多样性和协作修正质量的新协议。

#### 🎯 核心要点
- 只改变 decision protocol，其余讨论参数尽量固定，避免过去多 agent debate 研究里“同时改太多变量”
- 系统比较 7 种协议，包括 majority voting、unanimity consensus 等常见多 agent 决策机制
- 结论具有任务差异：voting 对 reasoning task 平均更优，consensus 对 knowledge task 更有优势
- 增加 agent 数量通常有益，但在投票前加入过多 discussion round 反而会降低表现
- 提出 All-Agents Drafting (AAD) 与 Collective Improvement (CI) 两种新方法，提高答案多样性与协同修正能力
- AAD 最多带来约 3.3% 提升，CI 最多带来约 7.4% 提升
- 论文的核心贡献是把“如何做最终决策”单独抽出来研究，而不是只关注多 agent 是否存在

#### 🔬 深入细节
![Vote/Consensus 决策协议研究示意图](https://ar5iv.labs.arxiv.org/html/2502.19130/assets/x1.png)
*图：论文围绕多智能体讨论后的最终决策协议展开，比较 voting、consensus 等不同聚合方式。*

```python
# 决策协议对比的统一实验框架（按论文方法概括）
def debate_and_decide(question, protocol, agents, rounds):
    drafts = [agent.initial_answer(question) for agent in agents]
    for _ in range(rounds):
        drafts = protocol.discuss(drafts, agents)
    return protocol.decide(drafts)
```

多 agent debate 领域里一个长期被忽略的问题是：大家讨论完之后，到底应该怎样定最终答案？很多工作把 agent 数量、轮数、prompt、工具和聚合方式一起改掉，导致很难判断性能变化究竟来自 debate 本身还是最后那一步协议。

实验发现很有意思。对需要演绎和计算的 reasoning 任务，voting 往往更强，因为它鼓励答案多样性；但对更依赖事实一致性的 knowledge 任务，consensus 更稳定，因为多 agent 被迫在达成一致前对冲突事实进行对齐。

论文还指出一个常见误区：更多 discussion round 并不总是更好。尤其在投票协议下，讨论轮次增加会让 agent 的答案越来越相似，反而损失了 voting 赖以工作的差异性。AAD 与 CI 正是为了保住多样性并把集体改进进一步结构化。

因此，这篇工作的真正贡献不是再发明一种 debate prompt，而是把多 agent 系统里最常被当成细节处理的“最终决策协议”提升为一等研究对象。

> 💡 关键：voting 的优势建立在答案差异性之上，所以过多讨论轮次可能先把这个优势抹平。

> ⚠️ 注意：consensus 看起来更“合作”，但在 reasoning 任务里也可能因为过早趋同而把错误结论放大。

#### 🧪 练习题
```yaml
question: 为什么论文发现“在投票前增加过多 discussion rounds”可能降低表现？
options:
- 因为会让 agent 更快耗尽上下文窗口
- 因为多轮讨论会降低答案多样性，从而削弱 voting 的优势
- 因为所有协议都必须在两轮内停止
- 因为投票协议不能与工具调用共存
answer: 1
explain: Voting 依赖不同 agent 提供互补答案；如果讨论过多导致答案收敛，投票就失去多样性带来的收益。
```
