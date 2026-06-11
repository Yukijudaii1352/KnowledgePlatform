### Multi^2: 分层多智能体决策 (Multi^2)

```yaml
id: multi2
name: Multi^2
full_name: 分层多智能体决策 (Multi^2)
year: '2026.06'
org: Sungkyunkwan University
paper_url: https://arxiv.org/abs/2606.03698
category: organization
parent: magentic_one
motivation: 高低层双Agent缓解长程目标漂移
```

#### 📝 一句话总结
Multi^2 用“高层子目标生成器 + 低层动作执行器”的双系统设计，把长程多步决策中的 objective drift 问题拆开处理：System 1 负责提出语义稳定的子目标，System 2 负责在具体环境中优化动作，从而缓解长时规划容易偏航的问题。

#### 🎯 核心要点
- 论文聚焦 long-horizon interaction 中的 objective drift：步数越长，agent 越容易偏离原始目标
- 使用分层双 agent：高层负责生成子目标，低层负责围绕子目标执行动作
- 高层 System 1 通过 SFT 学习把长期任务拆成更稳定、更可执行的中间意图
- 低层 System 2 采用 offline-to-online RL，在子目标约束下学动作策略
- 配套构建层次化数据集与训练流程，而不是只在推理期临时加一步 decomposition
- 论文强调该设计能提升长程 horizon 下的 token efficiency 与目标保持能力
- 本质上是把“想做什么”和“如何一步步做”拆成两套优化问题分别训练

#### 🔬 深入细节
![Multi^2 分层决策框架](https://ar5iv.labs.arxiv.org/html/2606.03698/assets/x1.png)
*图：Multi^2 将长期任务拆成高层子目标规划与低层动作执行两层，以减少长链路交互中的目标漂移。*

```python
# Multi^2 的层次化决策循环（按论文方法概括）
state = env.reset(task)
while not done:
    subgoal = system1.propose_subgoal(task, state, history)
    for _ in range(k):
        action = system2.act(state, subgoal)
        state, reward, done = env.step(action)
        system2.update_offline_to_online(state, reward, subgoal)
        if subgoal_reached(state, subgoal) or done:
            break
```

Multi^2 的问题定义并不新奇，但非常关键：长链路 agent 往往不是不会做某一步，而是做着做着忘了最初目标。论文把这种现象明确命名为 objective drift，并指出单体 policy 在 horizon 拉长后容易同时承担“长期意图维持”和“局部动作优化”两类负担。

为此，作者采用了一个经典但在 agent 场景下重新工程化的分层思路。System 1 只负责生成当前最值得追的子目标，相当于把长期任务映射到语义上更稳的中间状态；System 2 则只关注“在这个子目标下，下一步怎么动最优”。

论文进一步把这种分层写进训练流程，而不是只在推理期做 decomposition。System 1 通过监督数据学习子目标生成，System 2 则走 offline-to-online RL 路径，在已有行为数据上初始化，再通过在线交互细化。

因此 Multi^2 的代表意义，在于它把“分层”从 prompt 技巧推进到训练范式。

> 💡 关键：Multi^2 的两层并非简单串联，而是分别承担“目标保持”和“动作优化”两种不同优化目标。

> ⚠️ 注意：如果高层子目标定义得不稳定，低层再强也只会把错误子目标执行得更彻底。

#### 🧪 练习题
```yaml
question: Multi^2 设计高层 System 1 的直接目的是什么？
options:
- 替代所有环境交互，只输出最终答案
- 缓解长程交互中的 objective drift，持续给出稳定子目标
- 把低层 RL 完全改成监督学习
- 减少工具调用的 JSON 解析错误
answer: 1
explain: System 1 的职责就是维持长期目标一致性，把原任务拆成更稳的中间子目标。
```
