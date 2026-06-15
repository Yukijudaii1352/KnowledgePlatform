### RWML — 强化世界模型学习 (Reinforcement World Model Learning)

```yaml
id: rwml
name: RWML
full_name: 强化世界模型学习 (Reinforcement World Model Learning)
year: '2026'
org: ICML
paper_url: https://arxiv.org/abs/2602.05842
category: world_model
parent: dreamerv3
motivation: 帮助LLM智能体预测动作后果
```

#### 📝 一句话总结

RWML 提出用强化学习训练 LLM agent 的动作条件世界模型，让模型根据交互历史和候选动作预测真实下一状态，并用 embedding 空间中的 sim-to-real gap 奖励优化，解决 SFT 预测下一状态过度追求字面复现而忽略语义等价的问题。该方法完全自监督，可在没有专家轨迹、强模型标注或任务成功奖励的情况下提升 ALFWorld 与 \(\tau^2\) Bench 中的代理表现。

#### 🎯 核心要点

- **动作条件世界模型**：LLM 输入历史 \(h_t\) 和动作 \(a_t\)，先生成 reasoning tokens，再预测 simulated next state \(\hat s_{t+1}\)
- **Sim-to-real gap reward**：比较 \(\hat s_{t+1}\) 与真实环境返回 \(s_{t+1}\) 的 embedding 距离，而非要求 token 完全一致
- **二值奖励更稳健**：论文使用阈值化的相似度奖励，降低连续 reward 被 hacking 的风险
- **GRPO 优化**：用 group-relative policy optimization 最大化世界模型奖励，并加入 KL 正则约束
- **自采样数据**：目标模型自己与环境交互收集 rollout，再转换成 \((h_t,a_t,s_{t+1})\) 训练三元组
- **难例子采样**：先用少量数据训练 next-state predictor，过滤过于容易的样本，让 RL 更关注非平凡世界知识
- **组合训练收益**：RWML 单独提升 base agent；与 task-success reward RL 结合时超过直接 policy RL
- **评测环境**：ALFWorld 文本具身任务和 \(\tau^2\) Bench 工具调用任务，均需要预测动作后果和环境动态

#### 🔬 深入细节

##### RWML 流程示意图

![RWML 训练流程](https://arxiv.org/html/2602.05842v2/x1.png)

*图：RWML 先由目标模型在环境中收集交互，把轨迹转成动作条件下一状态预测样本，再用 embedding 相似度构成奖励，通过 GRPO 训练模型的世界模拟能力。*

##### 算法伪代码

```python
# Reinforcement World Model Learning for LLM agents
input: base LLM policy pi_theta, environments E

# 1. Collect self-supervised transition data
D = []
for task in training_tasks:
    for rollout_id in range(M):
        history = env.reset(task)
        while not done:
            action = pi_theta.generate_action(history)
            next_state = env.step(action)
            D.append((history, action, next_state))
            history = history + [action, next_state]

# 2. Subsample hard world-model examples
wm_sft = train_next_state_predictor(D[:10%])
D_hard = []
for sample in D[10%:]:
    rewards = evaluate_multiple_predictions(wm_sft, sample)
    if mean(rewards) < easy_threshold or random() < keep_easy_prob:
        D_hard.append(sample)

# 3. RL train world model with GRPO
for batch in sample_batches(D_hard):
    completions = pi_theta.generate_world_predictions(batch.history, batch.action, n=G)
    rewards = []
    for y_hat, y_real in zip(completions, batch.next_state):
        sim = cosine(embed(y_hat), embed(y_real))
        rewards.append(1 if sim >= tau else 0)
    advantages = group_relative_advantage(rewards)
    update pi_theta with GRPO objective + KL_to_reference

# 4. Optional: continue with task-success policy RL
pi_theta = policy_RL(pi_theta, task_success_reward)
```

##### 动机与背景

LLM agent 在 ALFWorld 或工具调用环境中不仅要知道“下一步说什么”，还要预判动作会如何改变世界。例如执行 `open fridge` 后会看到哪些物品，调用某个客服工具后系统会返回什么字段。若模型不能预测动作后果，规划就会退化成短视试错。

直接用 SFT 训练 next-state prediction 有一个缺陷：文本状态存在大量语义等价表述，SFT 会惩罚所有非字面匹配的输出。模型可能学会复述训练集格式，而不是学会“动作导致状态变化”的语义规律，严重时还会出现 model collapse。

RWML 把世界模型学习写成 RL 目标。模型生成：

$$\hat s_{t+1} \sim \pi_\theta(\cdot \mid h_t, a_t)$$

然后用 embedding 模型比较预测状态和真实状态：

$$d(\hat s_{t+1}, s_{t+1}) = 1 - \cos\big(E(\hat s_{t+1}), E(s_{t+1})\big)$$

奖励可阈值化为：

$$r^{WM} = \mathbb{1}\left[\cos(E(\hat s_{t+1}),E(s_{t+1})) \ge \tau\right]$$

这样，语义正确但措辞不同的预测仍可得到奖励，模型更关注状态转移是否对，而不是 token 是否逐字一致。

##### GRPO 世界模型训练

RWML 使用 GRPO。对同一输入采样一组候选下一状态，计算组内相对优势，再更新当前模型：

$$\mathcal{L}_{GRPO} =
-\mathbb{E}\left[
\min\left(\rho_t A_t,\operatorname{clip}(\rho_t,1-\epsilon,1+\epsilon)A_t\right)
-\beta D_{KL}(\pi_\theta \| \pi_{ref})
\right]$$

其中优势 \(A_t\) 来自同组候选的世界模型奖励。KL 项防止模型为了相似度奖励而偏离原始语言能力。论文还发现二值奖励比连续相似度更不容易被 hacking，因为模型不能通过投机地生成 embedding 友好但人类不可读的文本来获得细粒度奖励。

##### 与传统世界模型的区别

Dreamer/MBPO 学习的是连续或离散环境的状态转移模型，训练信号通常是图像、奖励或 latent 重构误差；RWML 学习的是文本状态空间中的世界模型，核心挑战从像素预测变成语义状态等价。它不直接训练动作策略，而是先提高 LLM 对“动作后果”的内部模拟能力，再与 task-success policy RL 组合。

这种方法尤其适合长期任务：单步任务成功奖励太稀疏，专家轨迹又昂贵；但环境交互自然提供了大量 \((history, action, next_state)\) 三元组。RWML 利用这些自监督转移，把 agent 后训练的一部分目标从“完成任务”拆成“先学会世界如何变化”。

> 💡 关键：RWML 的奖励不是任务成功，而是“我模拟的下一状态是否语义上接近真实下一状态”。这让世界模型学习成为可规模化的自监督 RL 问题。

#### 🧪 练习题

```yaml
question: "RWML 为什么不用普通 SFT 的 token-level next-state prediction 作为主要训练目标？"
options:
  - "因为环境没有真实下一状态"
  - "因为 token-level SFT 会惩罚语义等价但措辞不同的预测，且可能导致模型只学表面复现"
  - "因为 GRPO 不能处理文本输出"
  - "因为世界模型只能用图像状态训练"
answer: 1
explain: "RWML 用 embedding 空间的 sim-to-real gap 奖励评估语义一致性，避免把等价表述视为错误，并降低 next-token SFT 对格式复现的依赖。"
```
