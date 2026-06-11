### AgentRL: 多轮多任务代理强化学习框架 (AgentRL)

```yaml
id: agentrl
name: AgentRL
full_name: 多轮多任务代理强化学习框架 (AgentRL)
year: '2025.10'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2510.04206
category: online_rl
parent: agent_lightning
motivation: 扩展到异步多任务多轮训练
```

#### 📝 一句话总结
AgentRL 针对“多轮、多任务、在线 agent RL 难以扩展”的核心瓶颈，同时提出了全异步生成-训练基础设施与两项稳定训练算法：cross-policy sampling 用于提升多轮探索多样性，task advantage normalization 用于缓解多任务优势值分布失衡，从而把通用 agent RL 从单任务实验推进到可扩展框架。

#### 🎯 核心要点
- 目标是把 agent RL 从单任务、同步 rollout 的实验配置扩展到真正的 multi-turn + multi-task online RL 框架
- 基础设施侧采用 fully-asynchronous generation-training pipeline，把 rollout、训练与环境执行解耦，提高吞吐
- 设计统一的 function-call API、容器化环境开发方式和 centralized controller，降低异构任务接入成本
- 提出 cross-policy sampling：从模型池而非单一当前策略采样，缓解多轮任务中探索塌缩
- 提出 task advantage normalization：在 task 级轨迹上做优势归一化，减少多任务 reward scale 不一致带来的训练震荡
- 在五类 agent 任务上做多任务训练，论文报告其结果超过 GPT-5、Claude Sonnet 4、DeepSeek-R1 等强基线，并接近或匹配各任务专门训练模型
- 框架已开源，并被用于 AutoGLM 的构建，说明它强调的是“可复用的 agent RL 工程底座 + 算法组合”

#### 🔬 深入细节
![AgentRL 整体性能示意图](https://ar5iv.labs.arxiv.org/html/2510.04206/assets/x1.png)
*图：论文首先给出 AgentRL 相对 base model 的整体收益与 RL 训练进程，强调它是一套同时关心吞吐与稳定性的 agent RL 框架。*

```python
# AgentRL 的抽象训练循环（按论文方法概括）
policy_pool = [policy_t, policy_t_minus_1, reference_policy]
while training:
    task = controller.sample_task()
    policy = sample_from_pool(policy_pool)
    traj = rollout_worker.run(task, policy, api="function_call")
    buffer.add(task, traj)
    batch = trainer.sample(buffer, by_task=True)
    rewards = compute_task_rewards(batch)
    advantages = normalize_within_task(rewards)
    trainer.grpo_update(batch, advantages)
```

AgentRL 要解决的不是某个单一 benchmark 上“再提几分”，而是 agent RL 在工程上根本跑不起来的问题。多轮 agent 任务涉及 stateful 环境、异步工具调用、任务间数据模式差异以及很高的 rollout 成本，因此论文先从系统层重构训练架构。

在接口层，论文强调统一的 function-call API、容器化环境开发和 centralized controller。直觉上，这是把不同 benchmark 的环境接入方式抽象成同一协议，让异构任务共享一套 rollout 与训练基础设施。

算法上最关键的是 cross-policy sampling 与 task advantage normalization。前者让训练期 rollout 保持探索多样性，后者让不同任务的优势值分布更可比，减少某些任务因为回报尺度更大而主导更新。

因此 AgentRL 更像“agent 版训练操作系统”：它既提供异步系统底座，又补了两块最影响稳定性的算法部件。

> 💡 关键：cross-policy sampling 的目的不是做推理集成，而是保持训练期探索多样性。

> ⚠️ 注意：task advantage normalization 只缓解任务间尺度失衡，不会自动修复奖励定义错误。

#### 🧪 练习题
```yaml
question: AgentRL 中 task advantage normalization 的直接作用是什么？
options:
- 把所有任务的工具调用次数压缩到相同长度
- 降低多任务间 reward 尺度差异对梯度更新的干扰
- 把旧策略蒸馏到新策略中
- 在 rollout 前先过滤困难任务
answer: 1
explain: 该设计的目的就是让不同任务的优势值分布更可比，减少某些任务因为回报尺度更大而主导训练。
```
