### 强化Token优化 (RTO)

```yaml
id: rto
full_name: 强化Token优化 (RTO)
year: "2025"
paper_url: https://arxiv.org/abs/2505.11058
motivation: MDP建模提取Token级奖励
parent: tdpo
category: token_multimodal
```

> 注：任务清单中的 `paper_url` 指向一篇同态加密侧信道论文，和 RTO 元信息不匹配。下面的精读依据算法名与动机对应的实际论文 *DPO Meets PPO: Reinforced Token Optimization for RLHF*，arXiv: https://arxiv.org/abs/2404.18922，ICML 2025/PMLR 版本同题。

#### 📝 一句话总结
RTO 把 RLHF 从“整句只有一个最终奖励”的 bandit 问题改写成 token-level MDP，并用 DPO 模型与参考模型的逐 token 概率比提取密集奖励，再交给 PPO 优化。它解决了标准 PPO 只能依赖稀疏句级奖励、样本效率低且开源复现效果弱的问题，把 DPO 的离线偏好建模和 PPO 的在线策略改进连接起来。

#### 🎯 核心要点
- MDP 建模：状态 \(s_h\) 是 prompt 加已生成前缀，动作 \(a_h\) 是下一个 token，轨迹奖励按 token 累积。
- 两阶段框架：先从偏好数据学习 token-wise reward，再用 PPO 等 RL 算法最大化该密集奖励。
- DPO 提取隐式 token 奖励：用 \(\beta\log(\pi_{dpo}(a_h|s_h)/\pi_{ref}(a_h|s_h))\) 表示 token 对偏好的贡献。
- 与传统 PPO 区分：PPO 主要优化句级 reward model 的末端分数，RTO 把 DPO 产生的 token 信号作为 reward shaping 注入每一步。
- 理论目标：在 MDP 设定下证明 token-wise 框架相对 sentence-wise bandit 有更好的可识别性和样本效率，并给出近最优策略学习保证。
- 实验设定：基于 UltraFeedback 偏好数据，Llama-3-8B/SFT 初始化，在 AlpacaEval 2 与 Arena-Hard 上优于 PPO、DPO、R-DPO、SimPO、TDPO 等基线。

#### 🔬 深入细节

![RTO 流程图](https://arxiv.org/html/2404.18922v4/x1.png)
*图：RTO Figure 1。传统 RLHF 在 bandit 框架下用 PPO 优化句级奖励；RTO 在 MDP 框架下先用 DPO 导出 token-level reward，再用 PPO 强化这些逐 token 信号。*

RTO 的出发点是指出经典 RLHF 的建模粒度过粗。若把一次回答 \(y\) 看成一个 action，整个问题就是 contextual bandit：策略一次性输出完整句子，reward model 只给终端分数。这种建模忽略了自回归解码的序列结构，也无法回答“是哪几个 token 让回答变好或变坏”。对于长回答，尤其是对话、推理和代码场景，句级 reward 会让 credit assignment 变得困难，PPO 需要从稀疏、延迟、高方差的反馈中学习。

RTO 改用 token-level MDP：状态 \(s_h=(x,y_{<h})\) 表示 prompt 和当前已生成前缀，动作 \(a_h=y_h\) 表示下一个 token，转移函数只是把 token 追加到上下文。偏好概率可写为两条轨迹累计奖励的 Bradley-Terry 比较：

$$
\mathbb P(\tau^1\succ\tau^2)=\sigma\left(\sum_{h=1}^{H}r(s_h^1,a_h^1)-\sum_{h=1}^{H}r(s_h^2,a_h^2)\right).
$$

这个形式把“人更喜欢哪条回答”拆成了每个 token 的局部贡献之和。RTO 的关键洞察是：DPO 虽然从响应级偏好推导出来，但其最优策略与参考策略的 log-ratio 本身可以解释为隐式 reward。对于某个 token，DPO 模型给出的密集奖励为：

$$
r_{DPO}(s_h,a_h)=\beta_1\log\frac{\pi_{dpo}(a_h\mid s_h)}{\pi_{ref}(a_h\mid s_h)}.
$$

沿轨迹求和后得到

$$
\sum_{h=1}^{H}r_{DPO}(s_h,a_h)
=\beta_1\log\frac{\pi_{dpo}(y\mid x)}{\pi_{ref}(y\mid x)}.
$$

直觉上，如果 DPO 模型相比参考模型更愿意生成某个 token，那么该 token 更可能与偏好方向一致；如果 DPO 明显压低其概率，则该 token 可能是负贡献。这样，DPO 从“直接偏好优化算法”变成了“token reward estimator”。RTO 再把这些密集奖励接入 PPO，使策略能够在生成过程中逐步收到反馈，而不是等到回答结束才得到一个总分。

```python
# RTO Practical Version 的简化伪代码
# 输入：离线偏好数据 D、参考模型 pi_ref、DPO 算法、PPO trainer
pi_dpo = train_dpo(pi_ref, D)          # 用偏好对训练 DPO oracle
policy = pi_ref.copy()                 # PPO/RL 阶段的初始策略

for step in range(T):
    prompts = sample_prompts(D)
    rollouts = []
    for x in prompts:
        y = policy.generate(x)
        token_rewards = []
        for h, token in enumerate(y):
            state = (x, y[:h])
            dpo_reward = beta1 * log(pi_dpo.prob(token, state) / pi_ref.prob(token, state))
            kl_penalty = -beta2 * log(policy.prob(token, state) / pi_ref.prob(token, state))
            token_rewards.append(dpo_reward + kl_penalty)
        token_rewards[-1] += sentence_reward_model(x, y)  # 实践中可叠加句级 r_MLE
        rollouts.append((x, y, token_rewards))

    policy = ppo_update(policy, rollouts)                 # 用密集 token reward 更新策略
```

RTO 与“先 DPO 再 PPO”的简单串联不同。简单串联只是把 DPO 模型当成 PPO 的初始化点；RTO 是把 DPO 模型固定为 reward provider，让它在每个 token 位置给出 log-ratio 奖励。论文的实用版本还叠加一个句级 reward \(r_{MLE}(x,y)\)，用于保留传统 reward model 对整体质量的判断；DPO reward 的作用更像 reward shaping：它改变奖励在 token 维度上的分布，让 PPO 的 advantage 更容易定位到具体片段。论文的消融结论也强调，RTO 的收益主要来自这种 shaping，而不是简单用 DPO 隐式奖励替代句级 reward。

把 DPO 和 PPO放在一起看，RTO 的优势更清楚。DPO 是离线直接优化，它稳定、省资源，但更新受限于已有偏好对，不会在线探索策略生成的新分布；PPO 可以在线采样和改进策略，但如果 reward 只有句级终端分数，训练信号稀疏且实现敏感。RTO 用 DPO 学到的偏好方向构造 dense reward，再用 PPO 做在线策略改进，相当于让 DPO 提供局部地图，让 PPO 负责沿着这张地图继续搜索。

理论部分服务于同一个主张：LLM 解码天然是序列决策，不应被压缩为单步 bandit。MDP 视角可以区分不同前缀下同一 token 的贡献，也可以把偏好比较转化为轨迹累计 reward 的比较。只要 token reward 学得足够好，PPO/策略优化就不必从纯终端分数中反推所有 token 的责任，样本效率自然更好。实践结果与这个判断一致：论文在 AlpacaEval 2 和 Arena-Hard 上报告 RTO 相比 PPO 有明显提升，尤其体现了密集 token reward 对开放式对话生成的优化价值。

> ⚠️ 注意：RTO 不是把每个 token 都人工标注奖励，而是用 DPO 模型和参考模型的概率比自动估计 reward。它的质量取决于偏好数据、DPO 训练质量以及参考模型是否合适。

#### 🧪 练习题
```yaml
question: "RTO 中 DPO 模型的核心作用是什么？"
options:
  - "替代语言模型的 tokenizer"
  - "作为逐 token 隐式奖励估计器，为 PPO 提供密集 reward shaping"
  - "只负责在推理时重排序最终答案"
  - "删除 PPO 中的 KL 约束"
answer: 1
explain: "RTO 使用 DPO 模型相对参考模型的 token log-ratio 构造奖励，再用 PPO 对这些 token-level signals 进行策略优化。"
```
