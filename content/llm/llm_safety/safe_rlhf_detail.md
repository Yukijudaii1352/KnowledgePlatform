### Safe RLHF：安全RLHF (Safe Reinforcement Learning from Human Feedback)
```yaml
id: safe_rlhf
name: Safe RLHF
full_name: 安全RLHF (Safe Reinforcement Learning from Human Feedback)
year: '2024'
org: PKU
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/dd1577afd396928ed64216f3f1fd5556-Abstract-Conference.html
category: alignment
parent: dpo
motivation: 安全约束平衡有用与安全
```

#### 📝 一句话总结
Safe RLHF 将有用性奖励和安全性成本解耦，使用约束优化而不是单一标量奖励来平衡 helpfulness 与 harmlessness。

#### 🎯 核心要点
- 将人类反馈分成 helpfulness preference 和 safety preference，分别训练 reward model 与 cost model。
- 把对齐目标写成 constrained optimization：最大化奖励，同时约束安全成本不超过阈值。
- 使用拉格朗日乘子动态调节安全成本权重，避免固定 reward shaping 难以权衡不同目标。
- 在 Alpaca-7B 等模型上进行多轮 fine-tuning，展示比普通 RLHF 更好的安全性和可用性平衡。
- 该方法把安全偏好从“奖励扣分”提升为显式约束，是后续安全对齐方法的重要基础。

#### 🔬 深入细节
![Safe RLHF 安全对齐图](https://raw.githubusercontent.com/PKU-Alignment/safe-rlhf/main/images/safe-alignment.png)
*图：PKU-Alignment Safe RLHF 项目图源，展示奖励模型和成本模型共同约束安全对齐目标。*

```python
# Safe RLHF 简化伪代码
reward_model = train_reward_model(helpfulness_preferences)
cost_model = train_cost_model(safety_preferences)
policy = initialize_from_sft()
lambda_cost = 0.0

for iteration in range(num_updates):
    prompts, responses = rollout(policy)
    reward = reward_model(prompts, responses)
    cost = cost_model(prompts, responses)

    objective = reward - lambda_cost * (cost - safety_threshold)
    policy = ppo_update(policy, objective, reference_model)

    observed_cost = cost.mean()
    lambda_cost = max(0.0, lambda_cost + lr_lambda * (observed_cost - safety_threshold))
```

传统 RLHF 往往把“回答有帮助”和“回答安全”压成一个奖励分数。这样做简单，但会产生权衡问题：安全权重太小，模型可能给出危险内容；安全权重太大，模型可能过度拒答，降低有用性。Safe RLHF 选择把二者拆开建模。

约束目标可以写为：
$$
\max_{\pi_\theta} J_R(\pi_\theta)
\quad \mathrm{s.t.} \quad
J_C(\pi_\theta) \le d
$$
其中 \(J_R\) 是 helpfulness reward，\(J_C\) 是 safety cost，\(d\) 是可接受风险阈值。拉格朗日形式为：
$$
\mathcal{L}(\theta,\lambda)=J_R(\pi_\theta)-\lambda(J_C(\pi_\theta)-d)
$$
当模型输出成本超过阈值时，\(\lambda\) 增大，训练更重视安全；当成本低于阈值时，\(\lambda\) 降低，模型可以更多优化有用性。

Safe RLHF 的工程流程仍然接近 RLHF：先做 SFT，再训练评估模型，再用 RL 优化策略。区别在于评估模型有两个头或两个模型，一个看帮助性，一个看安全成本。这个拆分使训练信号更可解释，也更容易诊断模型是“没用”还是“不安全”。

与 DPO 相比，Safe RLHF 更强调显式安全约束和在线策略优化。DPO 简化偏好优化流程，Safe RLHF 则保留 RL 框架以表达成本约束。两者可视为不同方向：一个降低训练复杂度，一个提高安全目标表达能力。

#### 🧪 练习题
```yaml
question: "Safe RLHF 为什么要单独训练 cost model？"
options:
  - "为了替代 tokenizer"
  - "为了把安全性作为显式约束，而不是混入单一奖励分数"
  - "为了减少上下文长度"
  - "为了生成更多训练提示"
answer: 1
explain: "cost model 估计安全风险，使策略优化可以最大化 helpfulness 的同时约束风险阈值。"
```
