### Jumpy WM：跳跃式世界模型 (Compositional Planning with Jumpy WM)

```yaml
id: jumpy_wm
name: Jumpy WM
full_name: "跳跃式世界模型 (Compositional Planning with Jumpy WM)"
year: "2026.02"
org: DeepMind
paper_url: "https://icml.cc/Conferences/2026"
category: planning
parent: tdmpc2
motivation: "跳跃式动力学解决长程规划误差累积"
```

#### 📝 一句话总结

Jumpy WM 提出学习跨多个时间尺度的“跳跃式”多步动力学模型，用它在测试时组合预训练策略而不是逐步规划原始动作，从而缓解长程规划中一步模型误差累积和任务特定层级训练成本的问题。

#### 🎯 核心要点

- **资料限制**：清单 `paper_url` 是 ICML 2026 会议首页，正文基于可访问 arXiv 论文 `Compositional Planning with Jumpy World Models`
- **策略级规划**：把预训练策略作为 temporally extended actions，在测试时规划策略序列
- **Jumpy world model / GHM**：学习 policy-conditioned、horizon-conditioned 的未来状态分布
- **多时间尺度预测**：用几何折扣 horizon 表达短期到长期 successor occupancy
- **Horizon consistency**：提出 Temporal Difference Horizon Consistency，使不同时间尺度预测彼此一致
- **CompPlan**：用 learned GHM 估计任意策略序列的价值，并通过随机 shooting 选择组合
- **OGBench 验证**：在 antmaze 和 cube manipulation 长程任务上，组合规划显著优于 zero-shot 策略和 action-level planning

#### 🔬 深入细节

##### 论文图与框架说明

![Jumpy WM 结果图](https://arxiv.org/html/2602.19634v1/x1.png)
*图：论文 Figure 1 展示 ActionPlan、GPI 和 CompPlan 在长程任务上的成功率变化。arXiv HTML 暴露的主图偏结果对比，方法框架见下方流程图。*

```text
离线数据 + 一组预训练策略 π_i
      │
      ▼
训练 policy-conditioned GHM:
    p_\theta(s' | s, policy_id / policy_embedding, horizon γ)
      │
      ├── td-flow: 学习多步 successor distribution
      └── td-hc: 对齐不同 horizon 的预测
      ▼
测试时 CompPlan:
    采样候选策略序列和切换时间尺度
      │
      ▼
用 GHM 估计执行该策略序列后的 future occupancy 和 return
      │
      ▼
执行第一段策略，随后 receding-horizon replanning
```

##### 算法伪代码

```python
# Jumpy WM / CompPlan simplified pseudocode
pretrained_policies = [pi_1, pi_2, ..., pi_n]
GHM = train_geometric_horizon_model(
    offline_dataset,
    condition_on=["state", "policy_embedding", "discount_horizon"],
    losses=["td_flow", "temporal_difference_horizon_consistency"]
)

def compplan(state, goal_or_reward):
    candidates = []
    for _ in range(num_random_shooting_samples):
        # 候选是策略序列，而不是原始动作序列
        policy_seq = sample_policy_sequence(pretrained_policies)
        switch_probs = sample_or_fix_switching_probabilities()

        value = evaluate_policy_sequence_with_GHM(
            GHM, state, policy_seq, switch_probs, reward=goal_or_reward
        )
        candidates.append((value, policy_seq, switch_probs))

    best = max(candidates, key=lambda x: x[0])
    return best.policy_seq[0]  # 执行第一段策略，之后重新规划
```

##### 动机与背景

长程任务中，一步世界模型会遇到典型误差累积问题。即使每一步预测误差很小，规划 horizon 一长，模型 rollout 也会逐渐偏离真实可达状态。层级强化学习试图用 options 或 high-level policies 缩短规划长度，但通常需要为目标任务训练层级结构，泛化到新任务时不够灵活。

Jumpy WM 采取不同路线：给定一组已经训练好的 base policies，不再学习新的高层策略，而是在测试时直接规划“执行哪个策略、执行多久”。这把动作空间从 primitive actions 提升到 behavior level。世界模型也从一步转移：

$$p(s_{t+1}|s_t,a_t)$$

变成策略和时间尺度条件的多步 occupancy 预测：

$$p_\theta(s'|s, \pi, \gamma)$$

其中 \(\gamma\) 可理解为几何分布的时间尺度或折扣 horizon。

##### Jumpy world model：预测 successor occupancy

论文把模型称为 Geometric Horizon Model (GHM)。它不是预测固定 \(k\) 步后的单一状态，而是预测某个策略在几何时间尺度下诱导的状态分布。直观上，如果从状态 \(s\) 开始执行策略 \(\pi\)，GHM 预测“若在未来某个随机时间截断，可能落到哪里”。

这种表示比一步模型更适合行为组合：当 base policy 自身已经能完成局部导航或局部操控时，规划器不必逐动作模拟每个细节，只需要知道执行该策略一段时间后状态分布如何变化。

##### Horizon consistency：跨时间尺度对齐

多 horizon 模型的风险是各时间尺度彼此不一致：短 horizon 预测说能到 A，长 horizon 预测却像是从另一套动力学产生。Jumpy WM 基于 Temporal Difference Flows 加入 horizon consistency，让长时间尺度预测可由短时间尺度预测 bootstrap：

$$\text{long-horizon occupancy}
\approx \text{short-horizon step}
\circ \text{remaining-horizon occupancy}$$

对应损失可概括为：

$$\mathcal{L}_{\text{td-hc}}
= \mathcal{L}_{\text{td-flow}}
+ \beta \cdot D\left(
p_\theta(\cdot|s,\pi,\gamma_{\text{long}}),
\tilde{p}_\theta(\cdot|s,\pi,\gamma_{\text{short}},\gamma_{\text{long}})
\right)$$

其中 \(D\) 是分布匹配项，\(\tilde{p}\) 表示由短 horizon 预测递推组合出的目标。实践中只对部分 mini-batch 使用 consistency 项，以免模型早期错误自举造成偏差。

##### CompPlan：把策略当动作组合

给定奖励函数或目标，CompPlan 要找一段策略序列：

$$\pi_{i_1}, \pi_{i_2}, \ldots, \pi_{i_m}$$

每段策略有自己的 switching probability，控制执行时间尺度。GHM 负责估计执行该序列后的状态分布和期望回报。优化上，论文使用 random shooting：采样候选策略序列和中间 subgoals，用 GHM 快速评分，选择最高值方案，并只执行第一段，之后重新规划。

这个框架包含多个已有方法作为特例：若每一步都切换，就退化成 action-level MPC；若只选择一个策略并执行到结束，就接近 GPI；若固定几何切换时间，则对应 GGPI。CompPlan 的优势在于允许不同策略和不同时间尺度灵活组合。

##### 与 TD-MPC2 的关系

TD-MPC2 仍是在 action space 中做短 horizon latent MPC；Jumpy WM 把规划粒度提升到 policy space。前者依赖 learned latent dynamics 对短期动作序列排序，后者依赖 GHM 对“执行一个已有策略一段时间后会到哪里”建模。对长程稀疏任务，policy-level jump 可以显著缩短有效规划深度。

> 💡 关键：Jumpy WM 的“jump”不是跳过建模，而是把模型预测对象从一步动作转移提升到多步策略诱导状态分布，从而让组合规划避开长链一步误差。

#### 🧪 练习题

```yaml
question: "Jumpy WM 中 CompPlan 规划的基本单元是什么？"
options:
  - "单个 primitive action"
  - "像素级未来帧"
  - "预训练策略及其执行时间尺度"
  - "人工标注的任务子目标文本"
answer: 2
explain: "CompPlan 把预训练策略视作 temporally extended actions，并用 jumpy world model 估计策略序列的未来 occupancy 和价值。"
```
