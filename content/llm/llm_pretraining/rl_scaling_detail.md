### RL Scaling Laws

```yaml
id: rl_scaling
name: RL Scaling Laws
full_name: 强化学习规模定律 (RL Scaling Laws)
year: '2026'
org: 多机构
paper_url: https://www.machinelearningplus.com/llm/llm-scaling-laws/
category: scaling
parent: kaplan_scaling
motivation: 强化学习阶段能力-计算量预测
```

#### 📝 一句话总结

RL Scaling Laws 研究 LLM 强化学习后训练阶段中，验证奖励或任务准确率如何随 RL 计算量增长而变化，并用可拟合曲线预测扩大训练的收益。与预训练 loss 的幂律不同，LLM RL 常表现为带上限的 S 型曲线：配方决定上限，计算量主要决定接近上限的速度。

#### 🎯 核心要点

- manifest 给出的 `paper_url` 是 LLM scaling laws 综述页；方法细节可由公开论文 *The Art of Scaling Reinforcement Learning Compute for LLMs* 和 LLM RL scaling 论文补足
- 预训练通常预测 held-out next-token loss；RL scaling 更常预测 reward、pass rate 或任务准确率等下游指标
- ScaleRL 将 RL 计算量与性能拟合为 sigmoidal compute-performance curves，而不是简单无界幂律
- 不同 RL recipe 的 asymptote 不同，loss 聚合、归一化、课程、off-policy 设计更多影响计算效率
- 小规模 run 可用于拟合曲线并外推大规模 run，论文报告了大规模 GPU-hour 级验证
- 与 IsoCompute 思路互补：RL 计算还需在并行 rollouts、问题 batch、顺序 update steps 之间分配

#### 🔬 深入细节

![ScaleRL 强化学习规模定律主图](https://ar5iv.labs.arxiv.org/html/2510.13786/assets/x1.png)
*图：ScaleRL 论文主图，用可预测的计算量-性能曲线分析 RL 后训练扩展。*

```python
# RL Scaling Laws 曲线拟合与外推伪代码
def fit_rl_scaling_law(rl_runs):
    # 每条 run 包含 RL 采样/训练计算 C、验证 reward 或 pass rate R
    data = [(run.compute, run.validation_reward) for run in rl_runs]

    # RL 指标有上界，常用 sigmoid 而不是无界 power law
    curve = fit_sigmoid(
        x=[log(C) for C, _ in data],
        y=[R for _, R in data],
        formula="R_min + (R_max - R_min) / (1 + exp(-a * (logC - b)))",
    )

    # 用小预算点预测大预算收益，并比较不同 RL recipe 的上限和效率
    forecasts = []
    for C_future in candidate_large_budgets:
        forecasts.append((C_future, curve.predict(log(C_future))))
    return curve, forecasts
```

**动机与背景：RL 后训练缺少类似预训练的预算尺子。** Kaplan 和 Chinchilla 的对象是预训练 loss，训练数据是静态语料，计算近似清晰；RL 后训练则不同，数据由当前策略 rollout 产生，奖励稀疏且任务相关，策略更新还会改变未来样本分布。因此 RL scaling 的核心不是简单回答“loss 随 FLOPs 如何下降”，而是回答：给定一个 base model、任务分布和 RL 配方，继续投入采样/优化计算能把 reward 提高到哪里，是否值得扩大。

**核心机制：性能曲线通常有上限。** 对许多 RLVR 或 outcome-reward 任务，指标是准确率、pass rate、验证 reward，本身被限制在 \([0,1]\)。因此 RL scaling 常用 S 型曲线：

$$
R(C)=R_{\min}+\frac{R_{\max}-R_{\min}}{1+\exp(-a(\log C-b))}
$$

这里 \(R_{\max}\) 是该 recipe 在当前数据和 base model 下可达到的近似上限，\(b\) 描述达到半程收益所需的计算量，\(a\) 描述曲线陡峭程度。这个形式能表达 RL 常见现象：早期 reward 提升慢，中期快速上升，后期接近平台。

**训练流程：先固定健康 recipe，再做 scaling。** 论文强调，只有训练过程稳定，曲线才可预测。实际流程通常是：选择 base model 和问题集；确定 RL 算法（如 GRPO/PPO 变体）、reward、KL/entropy 正则和 loss 聚合；运行多个小到中等预算的 RL 实验；拟合 reward-compute 曲线；再外推大预算并用大 run 验证。若配方本身不稳定，例如熵崩塌、奖励过稀、batch 归一化不当，曲线会出现非平滑波动，无法可靠外推。

**与预训练 scaling 的区别：曲线用途更偏工程决策。** 预训练规模定律主要决定大训练前的 \(N,D,C\) 配比；RL scaling 更多用于比较 recipe、预测 ROI 和分配采样计算。比如两个 recipe 在小预算下 reward 相近，但一个 \(R_{\max}\) 更高、另一个只是到达平台更快，那么长期扩展应选择前者。IsoCompute 类工作进一步指出，RL 预算还要在每个 prompt 的并行 rollouts \(n\)、每步问题数 \(B_p\)、顺序 update 数 \(M\) 之间权衡；更多 rollouts 能降低方差和扩大成功轨迹覆盖，但过大也会减少更新次数。

> ⚠️ 注意：RL scaling 的“定律”比预训练幂律更依赖任务、base model、reward 和算法实现。它更适合作为可验证的实验预测框架，而不是跨所有 RL 任务通用的一组固定指数。

#### 🧪 练习题

```yaml
question: "LLM RL Scaling Laws 为什么常使用 S 型曲线而不是简单无界幂律？"
options:
  - "因为 RL 指标通常是有上界的 reward 或准确率，并会出现平台期"
  - "因为 RL 不需要计算量估计"
  - "因为 S 型曲线可以保证所有 recipe 上限相同"
  - "因为预训练 loss 也一定是 S 型曲线"
answer: 0
explain: "RL 后训练常预测 reward、pass rate 等有界指标，扩展计算后会接近任务和 recipe 决定的上限，因此 sigmoid 更自然。"
```
