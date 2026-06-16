### Safe RLHF：安全RLHF (Safe Reinforcement Learning from Human Feedback)

```yaml
id: safe_rlhf
name: Safe RLHF
full_name: 安全RLHF (Safe Reinforcement Learning from Human Feedback)
year: "2024"
org: PKU
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/dd1577afd396928ed64216f3f1fd5556-Abstract-Conference.html
category: alignment
parent: dpo
motivation: 安全约束平衡有用与安全
```

#### 📝 一句话总结

Safe RLHF 提出把“有用性”和“无害性”偏好显式解耦，分别训练 Reward Model 与 Cost Model，再用带拉格朗日乘子的安全强化学习目标动态平衡两者。它解决了普通 RLHF 把 helpfulness 与 harmlessness 混成单一偏好后容易过度拒答或牺牲安全的问题。

#### 🎯 核心要点

- 将人类反馈拆成两条独立标注轴：helpfulness preference 与 harmlessness preference。
- 训练两个偏好模型：Reward Model 评估有用性，Cost Model 评估潜在危害成本。
- Cost Model 不只使用成对排序，还利用 safe/unsafe 二分类标签建立安全边界。
- 把 LLM 安全对齐形式化为约束优化：最大化期望奖励，同时约束期望成本不超过阈值。
- 使用 Lagrangian 方法把约束问题转成可优化目标，并动态更新惩罚系数 \(\lambda\)。
- 三轮 Safe RLHF 迭代包含数据收集、双维度标注、RM/CM 训练、安全 RL 微调与红队补充。
- 论文以 Alpaca-7B 为初始模型，得到 Beaver 系列模型，并发布 PKU-SafeRLHF 数据与代码。

#### 🔬 深入细节

![Safe RLHF 流程图](https://ar5iv.labs.arxiv.org/html/2310.12773/assets/x1.png)
*图：Safe RLHF 相比传统 RLHF，在标注和偏好建模阶段拆分 helpfulness 与 harmlessness，并在策略优化阶段用安全约束动态合成。*

```python
# Safe RLHF 简化伪代码：双偏好模型 + 拉格朗日安全约束
for round_id in range(3):
    prompts = collect_prompts(open_data=True, red_team=(round_id > 0))
    responses = sample_policy(policy, prompts)

    helpful_pairs, harmless_pairs, safety_labels = human_annotate_two_axes(responses)
    reward_model = train_reward_model(helpful_pairs)
    cost_model = train_cost_model(harmless_pairs, safety_labels)

    for step in rl_steps:
        y = policy.generate(prompts)
        reward = reward_model(prompts, y)
        cost = cost_model(prompts, y)

        # maximize reward while enforcing cost <= d
        policy_loss = -(reward - lambda_ * (cost - d))
        update_policy_with_ppo(policy_loss)
        lambda_ = max(0, lambda_ + lr_lambda * (cost.mean() - d))
```

Safe RLHF 的核心问题意识是：安全对齐并不等同于“让人类给一个总体偏好分数”。同一个回答可能更完整、更听话，因此更 helpful；但如果它满足了危险请求，就更 harmful。反过来，一个直接拒答的回答可能很 safe，却不够 helpful。传统 RLHF 用单一 reward model 学“总体偏好”时，标注者需要在两个冲突维度中做隐式折中，模型训练时也只能优化一个混合目标，容易导致安全和能力之间的不可控摆动。

论文因此把标注拆成两个任务。对每个 prompt 的多个回答，标注者分别比较“哪个更有帮助”和“哪个更无害”，同时给每个 QA 对标注 safe/unsafe 元标签。得到的数据可记为 helpfulness 数据集 \(\mathcal{D}_R\) 与 harmlessness 数据集 \(\mathcal{D}_C\)。Reward Model 使用常规 Bradley-Terry pairwise loss：

$$
\mathcal{L}_R(\phi)=-\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}_R}\left[
\log\sigma\left(R_\phi(x,y_w)-R_\phi(x,y_l)\right)
\right]
$$

Cost Model 的设计更特殊。它同样学习“哪个回答更有害”的相对排序，但还利用 safe/unsafe 标签加入分类项。若 \(C_\psi(x,y)\) 越大表示危害成本越高，则可以把安全边界视为一个虚拟响应 \(y_0\)，满足 \(C_\psi(x,y_0)=0\)。unsafe 回答应位于边界上方，safe 回答应位于边界下方。简化写法如下：

$$
\mathcal{L}_C(\psi)=
-\mathbb{E}_{\mathcal{D}_C}\left[\log\sigma(C_\psi(x,y_{\mathrm{harm}})-C_\psi(x,y_{\mathrm{safe}}))\right]
-\mathbb{E}_{(x,y,s)}\left[
\mathbf{1}_{s=1}\log\sigma(C_\psi(x,y))+
\mathbf{1}_{s=0}\log\sigma(-C_\psi(x,y))
\right]
$$

这个 Cost Model 的意义不是替代 Reward Model，而是为策略优化提供可约束的安全信号。论文中的 Figure 2 显示 reward 与 cost 可以形成不同分布：高 reward 不必然低 cost，低 cost 也不必然高 reward。因此，安全训练不能只靠把 reward 改成 \(R-\alpha C\) 的固定线性组合；固定 \(\alpha\) 在不同训练阶段可能过强或过弱，导致过度拒答或安全约束失效。

在策略优化阶段，Safe RLHF 把目标写成约束优化：

$$
\max_\theta J_R(\theta)\quad\mathrm{s.t.}\quad J_C(\theta)\le d
$$

其中

$$
J_R(\theta)=\mathbb{E}_{x\sim\mathcal{D},y\sim\pi_\theta(\cdot\mid x)}[R_\phi(x,y)],\quad
J_C(\theta)=\mathbb{E}_{x\sim\mathcal{D},y\sim\pi_\theta(\cdot\mid x)}[C_\psi(x,y)]
$$

\(d\) 是可接受成本阈值，用来控制模型生成有害回答的概率或强度。通过拉格朗日松弛，训练目标变为：

$$
\mathcal{L}(\theta,\lambda)=J_R(\theta)-\lambda\left(J_C(\theta)-d\right),\quad \lambda\ge0
$$

当当前策略的 cost 超过阈值时，\(\lambda\) 增大，安全惩罚变强；当 cost 已经低于阈值时，\(\lambda\) 可以减小，策略重新把优化重心放回 helpfulness。这就是 Safe RLHF 相比 reward shaping 的关键区别：它不是预先指定一个永远不变的 helpful/safe 权重，而是在训练中根据约束违反程度自适应调整。

训练流程上，Safe RLHF 仍然保留 RLHF 的生成-评价-优化循环，但把评价器拆成 RM 和 CM。第一轮使用已有安全相关与无关 prompt；后续轮次加入 red-teaming prompt，持续补充模型仍无法安全处理的场景。每轮都会重新收集偏好数据、训练或更新偏好模型，再进行安全 RL 微调。论文报告三轮迭代后，模型在人工和 GPT-4 评估下同时提升 helpfulness 与 harmlessness，说明解耦标注和约束优化能缓解“安全越强越没用”这一常见退化。

与 DPO 这类离线偏好优化相比，Safe RLHF 更接近完整的安全控制框架：它需要生成、偏好模型和 RL 优化，工程成本更高，但可以直接表达“安全成本必须低于阈值”的硬约束语义。DPO 的优势是简单稳定，Safe RLHF 的优势是能把安全目标从奖励偏好中独立出来，适合需要显式安全预算、红队迭代和动态风险控制的模型训练。

> ⚠️ 注意：Safe RLHF 中的“cost”不是负奖励的别名，而是单独建模的安全风险信号；把它作为约束处理，才是该方法区别于普通多目标加权 RLHF 的核心。

#### 🧪 练习题

```yaml
question: "Safe RLHF 使用拉格朗日乘子 λ 的主要目的是什么？"
options:
  - "固定提高所有回答的长度，从而提升 helpfulness"
  - "在训练中根据成本约束违反程度动态调整安全惩罚强度"
  - "把 Reward Model 和 Cost Model 合并为同一个分类器"
  - "替代人类标注，自动产生所有偏好标签"
answer: 1
explain: "λ 对应安全约束的惩罚系数；当策略生成的期望成本超过阈值时，λ 增大，使优化更重视降低风险。"
```
