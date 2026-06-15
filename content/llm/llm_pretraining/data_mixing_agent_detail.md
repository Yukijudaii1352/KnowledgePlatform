### Data Mixing Agent

```yaml
id: data_mixing_agent
name: Data Mixing Agent
full_name: 数据混合代理 (Data Mixing Agent)
year: '2026'
org: 学术界
paper_url: https://arxiv.org/abs/2604.16380
category: data
parent: doremi
motivation: 强化学习动态数据加权
```

#### 📝 一句话总结

Data Mixing Agent 将持续预训练中的领域配比更新建模为 MDP，并用大量数据混合轨迹和 CQL 离线强化学习训练一个轻量代理来动态输出下一阶段领域权重。它解决的是 DoReMi/RegMix 等静态或代理模型方法难以随训练状态变化、且难以跨领域泛化的问题。

#### 🎯 核心要点

- 正确方法论文为 Data Mixing Agent: Learning to Re-weight Domains for Continual Pre-training, arXiv:2507.15640
- 将 domain re-weighting step 形式化为 MDP：状态包含历史混合轨迹、环境反馈和训练进度，动作是概率 simplex 上的领域分布
- 先随机采样大量 data mixing trajectories，每条轨迹含多次固定 budget 的领域重加权步骤
- 对每个轨迹训练小型 proxy model，并通过评测环境获得 reward/feedback
- 用监督学习初始化 agent，再用 Conservative Q-Learning (CQL) 做离线 off-policy 强化学习
- 目标训练时无需重新采样轨迹，agent 根据历史状态在线预测下一阶段混合比例
- 实验显示 agent 可跨 source fields、target models 和 domain spaces 泛化，并在数学推理/代码等持续预训练中优于静态和动态 baselines

#### 🔬 深入细节

![Data Mixing Agent 总览](https://ar5iv.labs.arxiv.org/html/2507.15640/assets/x2.png)
*图：Data Mixing Agent 论文 Figure 2，展示轨迹采样、proxy model 环境反馈、CQL 训练 agent，以及目标模型持续预训练时在线预测混合比例的流程。Manifest 的 paper_url 是 data mixing survey，正文用具体方法论文补足。*

```python
# Data Mixing Agent 训练与使用伪代码
def train_data_mixing_agent(domain_space, proxy_model, eval_env):
    replay = []
    for traj_id in range(num_trajectories):
        trajectory = sample_random_mixing_trajectory(domain_space, steps=T)
        ckpts = train_proxy_with_trajectory(proxy_model, trajectory)
        feedback = [eval_env.evaluate(ckpt) for ckpt in ckpts]
        replay.extend(to_transitions(trajectory, feedback))

    agent = supervised_warm_start(replay)  # imitate good observed actions
    agent = conservative_q_learning(agent, replay)  # offline actor-critic
    return agent

def continual_pretrain_with_agent(target_model, agent, domains, budget):
    history = []
    while budget.remaining_tokens > 0:
        state = encode_state(history, validation_feedback(target_model))
        weights = agent.predict_distribution(state)  # action on simplex
        batch_stream = sample_domains(domains, weights)
        target_model.train_for_one_stage(batch_stream)
        history.append((weights, validation_feedback(target_model)))
    return target_model
```

**动机与背景：数据混合不是一次性超参数。** DoReMi 用 proxy model 和 group DRO 思想找静态领域权重，RegMix 等方法从候选混合中拟合性能预测器；这些方法能减少人工调配，但通常把“混合比例”当成训练前确定的 recipe。持续预训练不同：模型在不同阶段的短板会变化，早期需要补基础分布，后期可能需要更多目标领域或互补领域。Data Mixing Agent 因此把配比看成序列决策，而不是单点优化。

**MDP 表述：动作是整个 domain distribution。** 在第 \(t\) 个 re-weighting step，agent 观察历史混合比例、阶段评测反馈、目标领域表现等状态 \(s_t\)，输出动作 \(a_t\in \Delta^K\)，即 \(K\) 个领域上的采样概率。环境用该动作训练 proxy 或 target model 一段 token budget 后返回 reward。优化目标是最大化整条轨迹的累计收益：

$$
\max_\pi \mathbb{E}_{a_t\sim \pi(\cdot|s_t)}\left[\sum_{t=1}^{T}\gamma^{t-1} r(s_t,a_t)\right]
$$

**为什么用 CQL：离线轨迹不能随意外推。** 采样一条真实预训练轨迹很贵，因此 agent 主要在离线 replay buffer 上学习。如果普通 Q-learning 对未见过动作过度乐观，agent 可能输出训练数据里没有覆盖的极端配比。Conservative Q-Learning 通过惩罚 out-of-distribution action 的 Q 值，降低离线 RL 的过估计风险，使连续 simplex 动作空间中的策略更稳。

**使用方式：小 agent 替代大规模反复搜索。** 训练完后，agent 被直接插入目标模型持续预训练循环。每经过一个阶段，系统把当前反馈和历史轨迹编码给 agent，agent 预测下一阶段领域权重。论文强调泛化性：一个在数学 reasoning 轨迹上训练的 agent，可以迁移到不同 target model、不同 domain classifier 定义，甚至代码生成目标，而不必每次重新跑昂贵轨迹采样。

**与 DoReMi 的区别：静态 minimax 配比 vs. 状态条件策略。** DoReMi 学到的是一组或若干组固定权重，适合训练前做数据配比优化；Data Mixing Agent 学到的是 \(s_t\mapsto a_t\) 的策略函数，能根据训练反馈调整。代价是需要构建离线轨迹和评测环境，但收益是可以把经验压缩进一个小模型，并在新场景复用。

> 💡 关键：Data Mixing Agent 的“agent”含义不是聊天代理，而是一个根据训练状态输出下一阶段数据配比的策略模型。

#### 🧪 练习题

```yaml
question: "Data Mixing Agent 中的动作 action 表示什么？"
options:
  - "下一个 token 的词表分布"
  - "下一阶段各数据领域的采样概率分布"
  - "模型层数和隐藏维度"
  - "去重阈值"
answer: 1
explain: "该方法把领域重加权建模为 MDP，动作是在 domain simplex 上的混合权重。"
```
