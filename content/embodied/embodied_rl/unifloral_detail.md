### Unifloral — 统一离线RL协议 (Unified Offline RL Protocol)

```yaml
id: unifloral
name: Unifloral
full_name: 统一离线RL协议 (Unified Offline RL Protocol)
year: '2025'
org: NeurIPS
paper_url: https://neurips.cc/virtual/2025/oral/105555
category: offline_rl
parent: cql
motivation: 统一评估协议量化在线调参预算
```

#### 📝 一句话总结

Unifloral 在论文 “A Clean Slate for Offline Reinforcement Learning” 中提出统一的离线 RL 评估协议和统一算法空间，用显式在线调参预算衡量方法性能，并把多种离线 RL 设计拆成可组合超参数。它的核心贡献不是单一损失函数，而是让离线 RL 的算法比较、消融和新方法搜索变得更可复现。

#### 🎯 核心要点

- **官方对应关系**：NeurIPS 2025 oral 条目对应 OpenReview `8P3QNSckMp` 与 arXiv `2504.11453`，题名为 “A Clean Slate for Offline Reinforcement Learning”
- **问题重定义**：指出许多离线 RL 论文隐含使用大量在线评估调参，导致“离线”算法比较不公平
- **在线调参预算量化**：用预部署评估 episode 数 \(N\) 表示可用在线交互预算，并模拟 bandit 式 policy selection
- **统一算法空间**：把模型设计、critic objective、actor objective、dynamics modeling 四类设计做成统一超参数空间
- **单文件重实现**：提供简洁一致的 model-free/model-based 离线 RL 实现，减少 boilerplate 差异
- **Unifloral 作为元算法**：不是固定一组超参数，而是一个覆盖多种既有方法和新组合的配置空间
- **派生新方法**：用统一空间提出 TD3-AWR（model-free）和 MoBRAC（model-based），展示组合式研究流程

#### 🔬 深入细节

##### 方法示意图

![Unifloral 离线 RL 变体分类图](https://ar5iv.labs.arxiv.org/html/2504.11453/assets/x1.png)

*图：Unifloral 论文中的离线 RL 变体形式化图。论文区分零样本部署、预部署 policy selection、部署后选择和在线微调等设置，强调必须报告在线调参预算。*

##### 算法伪代码

```python
# Unifloral evaluation protocol + unified search space
method_space = {
    "model_design": sample_arch_optimizer_and_ensemble(),
    "critic_objective": sample_value_target_bc_entropy_diversity(),
    "actor_objective": sample_q_bc_entropy_awr_weights(),
    "dynamics_modeling": sample_model_based_options(),
}

policies = []
for i in range(P):
    config = sample(method_space)
    policy = train_offline(config, dataset=D)
    scores = evaluate_policy(policy, episodes=R)  # collected once for analysis
    policies.append((policy, scores))

for online_budget_N in budgets:
    selected = simulate_ucb_policy_selection(policies, budget=online_budget_N)
    report(best_arm_performance(selected))
```

##### 动机与背景

离线 RL 名义上不允许训练时与环境交互，但很多论文会在目标任务上训练大量超参数配置，再用在线评估挑选最好的结果。这相当于把“在线调参”藏在实验流程里，而不同方法的超参数空间大小、调参次数和报告方式并不一致。Unifloral 的第一项贡献就是把这个隐含成本显式化：一个离线 RL 方法不仅包含算法，还包含固定超参数范围和允许的在线 policy selection 预算。

论文形式化了多种离线 RL 变体。最严格的是训练一个策略后直接部署；更常见的是训练多个策略，通过 \(N\) 次目标环境评估在部署前选择；还有部署后选择和在线 fine-tuning。Unifloral 认为若使用了预部署评估，就应报告对应预算，而不是只报告无限调参后的最好结果。

评估协议可以抽象为：先从算法的固定超参数范围采样 \(P\) 个配置，离线训练得到策略集合；再用一个 UCB bandit 在有限在线 episode 预算下模拟策略选择：

$$
\pi_{\mathrm{deploy}}
=
\mathrm{BanditSelect}(\{\pi_i\}_{i=1}^P, N)
$$

这样同一算法可以画出随在线调参预算变化的性能曲线。若一个方法只有在大量在线选择下表现好，而小预算下不稳，就能被直接看出来。

Unifloral 的第二项贡献是统一算法空间。它把既有方法拆成四类组件：模型设计、critic 目标、actor 目标、动力学建模。比如 critic 可以选择 IQL 式 value target 或 TD3 式 target policy smoothing，可以加入 BC/entropy/diversity 项；actor 可以组合 Q 最大化、行为克隆、熵和 AWR 权重：

$$
\mathcal{L}_{\mathrm{actor}}
=
\beta_q\mathcal{L}_q
+\beta_{\mathrm{BC}}\mathcal{L}_{\mathrm{BC}}
-\beta_{\mathcal{H}}\mathcal{H}(\pi(\cdot|s))
$$

其中 \(\mathcal{L}_{\mathrm{BC}}\) 可进一步变为 AWR：

$$
\mathcal{L}_{\mathrm{BC}}
=
d(a_t,\hat{a}_t)
\cdot
\min(A_{\max}, \exp(\eta(Q(s_t,a_t)-V(s_t))))
$$

统一空间的意义是研究者可以在同一个实现里组合 IQL、TD3-BC、ReBRAC、EDAC、MOPO 等思想，而不是每次比较一套代码库。论文用这个框架提出 TD3-AWR：把 ReBRAC/TD3-BC 的 actor Q 优化与 IQL 的优势加权行为克隆结合；又提出 MoBRAC：把 MOPO 式模型 rollout 与 ReBRAC 式 policy optimizer 结合。

> 💡 关键：Unifloral 不是“又一个离线 RL 单点算法”，而是把算法、超参数范围和在线评估预算绑定成可比较对象。

##### 与传统离线 RL 论文的区别

| 维度 | 常规报告方式 | Unifloral |
|---|---|---|
| 超参数 | 常按任务调优，预算不透明 | 固定范围，显式采样 |
| 在线评估 | 往往只报告最佳配置 | 报告随预算变化的选择性能 |
| 实现 | 多代码库混合比较 | 单文件、组件化一致实现 |
| 方法开发 | 增加新算法整体 | 在统一空间内组合和消融 |

这使 Unifloral 更像一个离线 RL “实验协议 + 元算法空间”。对于具身任务，尤其是机器人离线数据昂贵、真实评估成本高的场景，这种预算意识比单纯追求最高表格分数更接近真实部署。

#### 🧪 练习题

```yaml
question: "Unifloral 评估协议为什么要显式量化在线调参预算？"
options:
  - "因为离线 RL 不需要任何数据集"
  - "因为目标环境评估本身是一种在线交互，会显著影响最终报告性能"
  - "因为所有算法都必须使用同一个神经网络宽度"
  - "因为只能评估 model-based 方法"
answer: 1
explain: "很多离线 RL 结果隐含用在线评估挑选超参数；Unifloral 将评估 episode 数作为预算报告，避免不同方法因隐藏调参成本而不可比。"
```
