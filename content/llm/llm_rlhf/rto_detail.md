### rto: 强化Token优化 (RTO)

```yaml
id: rto
full_name: 强化Token优化 (RTO)
year: "2025"
paper_url: https://arxiv.org/abs/2505.11058
motivation: MDP建模提取Token级奖励
parent: tdpo
category: token_multimodal
```

#### 📝 一句话总结

RTO 将 RLHF 建模从句子级 bandit 推向 token 级 MDP，从 DPO 隐式奖励中提取稠密 token 奖励，再用 PPO 式强化学习优化生成过程。

#### 🎯 核心要点

- **来源说明**：manifest 中 arXiv:2505.11058 指向无关论文；RTO 可读公开来源为 arXiv:2404.18922 和 PMLR v267/zhong25b。
- **MDP 建模**：把每个前缀看作状态、下一个 token 看作动作，奖励可分配到 token 级。
- **DPO meets PPO**：从 DPO 的隐式奖励提取 token reward，再用 PPO 优化。
- **稠密反馈**：相比句子末端单一奖励，token 级奖励能提供更细粒度 credit assignment。
- **目标**：缓解开源 LLM 上 PPO 不稳定、DPO 缺乏在线 RL 探索的折中问题。

#### 🔬 深入细节

##### 示意图/图源

![RTO framework](https://ar5iv.labs.arxiv.org/html/2404.18922/assets/x1.png)

图源：RTO 论文 HTML 图 1；正确公开来源见 https://arxiv.org/abs/2404.18922 和 https://proceedings.mlr.press/v267/zhong25b.html。

##### 算法/流程伪代码

```python
pi_ref = frozen_reference_model
pi_theta = initialized_policy

# Step 1: learn or compute DPO-style implicit sequence reward
for x, y_win, y_lose in preference_dataset:
    dpo_loss = dpo_objective(pi_theta, pi_ref, x, y_win, y_lose)
    update(pi_theta, dpo_loss)

# Step 2: extract token-level rewards from implicit reward decomposition
for prompt in rl_prompts:
    y = sample(pi_theta, prompt)
    token_rewards = []
    for t in range(len(y)):
        prefix = y[:t]
        token_reward = beta * (
            logp(pi_theta, y[t], prompt, prefix)
            - logp(pi_ref, y[t], prompt, prefix)
        )
        token_rewards.append(token_reward)

    advantages = compute_gae_or_returns(token_rewards)
    pi_theta = ppo_update(pi_theta, prompt, y, advantages, kl_reference=pi_ref)
```

##### 方法解读

**1. RTO 认为句子级 bandit 过于粗糙。** 许多 RLHF 实现把完整回答视为一个动作，只在回答末端给一个奖励。这种建模忽略了自回归生成的逐步决策结构，也让 credit assignment 变得困难。

**2. token 级奖励来自 DPO 隐式奖励。** DPO 已经给出相对参考模型的隐式奖励形式。RTO 将这个奖励沿自回归因子分解到 token 级，使每个生成动作都能获得更稠密的训练信号，而不是只在序列末尾接收总分。

**3. PPO 提供在线策略改进能力。** DPO 的优点是稳定和简单，但主要利用离线偏好对；PPO 可以基于当前策略采样继续改进，但奖励稀疏和 value 训练会带来不稳定。RTO 试图结合二者：用 DPO 奖励分解改善 PPO 的信号质量。

**4. 与 TDPO 的区别在优化路径。** TDPO 仍主要是直接偏好优化目标的 token 级细化；RTO 则明确回到 MDP 和 PPO 更新，把 token 级奖励用于强化学习。两者都重视 token 粒度，但一个偏 direct preference，一个偏 RL。

#### 🧪 练习题

```yaml
question: RTO 中 token 级奖励的主要作用是什么？
options:
  - A. 为自回归生成的每一步提供更细粒度的 credit assignment
  - B. 删除所有序列级偏好信息
  - C. 让模型只能生成单 token 回答
  - D. 替代位置编码
answer: A
explain: RTO 将奖励分配到 token 级，使 PPO 更新能利用更稠密的反馈。
```
