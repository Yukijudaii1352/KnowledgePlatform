### MuZero：无模型零 (MuZero)

```yaml
id: muzero
name: MuZero
full_name: "无模型零 (MuZero)"
year: "2020.12"
org: DeepMind
paper_url: "https://www.nature.com/articles/s41586-020-03051-4"
category: planning
parent: mbpo
motivation: "学习对价值奖励策略有用的潜在动力学"
```

#### 📝 一句话总结

MuZero 提出只学习对规划有用的潜在动力学、奖励、价值和策略，而不重建环境观测本身，从而在不知道规则的情况下把 AlphaZero 式 MCTS 扩展到 Atari、Go、Chess 和 Shogi。

#### 🎯 核心要点

- **三网络世界模型**：representation \(h_\theta\)、dynamics \(g_\theta\)、prediction \(f_\theta\)
- **不预测原始观测**：潜在状态只需保留能预测 reward、value、policy 的信息
- **潜在空间 MCTS**：树搜索在 learned hidden state 上展开，不需要真实环境模拟器
- **搜索策略监督**：训练目标中的 policy target 来自 MCTS visit distribution
- **奖励和值联合训练**：unroll 多步后同时预测即时奖励、折扣回报和值
- **跨领域统一**：同一算法同时处理已知完美规则游戏和未知视觉 Atari 环境
- **Reanalyze 思想**：可用最新网络重新分析历史轨迹，提升数据利用效率

#### 🔬 深入细节

##### 规划示意

![MuZero 潜在空间规划](https://storage.googleapis.com/gdm-deepmind-com-prod-public/media/original_images/62277f565ad61d23ae431c30_Fig202.gif)
*图：MuZero 先用 representation function \(h\) 把历史观测映射到隐藏状态，再用 dynamics \(g\) 和 prediction \(f\) 在搜索树中评估未来动作。*

##### 算法伪代码

```python
# MuZero training and acting
for iteration in range(num_iterations):
    # Acting: 用 MCTS 改进当前策略
    history = env.reset()
    while not done:
        s0 = h_theta(history)
        search_tree = MCTS(root=s0, dynamics=g_theta, prediction=f_theta)
        pi_search = visit_count_distribution(search_tree)
        action = sample_or_argmax(pi_search)
        obs, reward, done = env.step(action)
        replay.add(history, action, reward, pi_search)
        history = history + [action, obs]

    # Training: 对真实轨迹做 recurrent unroll
    batch = replay.sample_sequences()
    for history_t, actions, rewards, value_targets, policy_targets in batch:
        s = h_theta(history_t)
        losses = prediction_loss(f_theta(s), policy_targets[0], value_targets[0])
        for k, a in enumerate(actions):
            s, r_hat = g_theta(s, a)
            p_hat, v_hat = f_theta(s)
            losses += reward_loss(r_hat, rewards[k])
            losses += value_loss(v_hat, value_targets[k + 1])
            losses += policy_loss(p_hat, policy_targets[k + 1])
        theta = optimizer.step(losses)
```

##### 动机与背景

AlphaZero 的强大来自 MCTS 与深度策略/价值网络的闭环：搜索产生更强的动作分布，网络再学习搜索结果。但 AlphaZero 依赖已知规则模拟器；它能在棋盘游戏中展开未来局面，却不能直接用于 Atari 这类只有像素观测、规则未知的环境。传统模型式 RL 试图学习完整环境模型 \(p(o_{t+1}|o_t,a_t)\)，但精确预测每个像素既难又未必与决策相关。

MuZero 的核心洞察是：规划不需要知道完整世界，只需要知道“动作会如何改变未来的奖励、价值和可选策略”。因此它学习的是 value-equivalent model，而不是 reconstruction model。

##### 三个函数：h、g、f

MuZero 的内部模型由三个函数组成：

$$s^0 = h_\theta(o_{1:t})$$

$$r^k, s^k = g_\theta(s^{k-1}, a^k)$$

$$p^k, v^k = f_\theta(s^k)$$

\(h_\theta\) 把历史观测编码为初始潜在状态；\(g_\theta\) 在潜在空间执行动作并预测即时奖励；\(f_\theta\) 从潜在状态预测策略先验 \(p\) 和价值 \(v\)。注意这里没有 decoder，也没有 \(\hat{o}_{t+1}\)。隐藏状态 \(s\) 只要能支持搜索和训练目标即可。

##### 潜在 MCTS 与动作选择

在每个真实环境步，MuZero 以 \(s^0\) 为根节点执行 MCTS。每条边维护访问次数 \(N(s,a)\)、平均价值 \(Q(s,a)\)、先验概率 \(P(s,a)\)、奖励 \(R(s,a)\) 和后继隐藏状态。选择动作时使用 PUCT 类规则：

$$a = \arg\max_a \left[ Q(s,a) + U(s,a) \right]$$

其中 \(U(s,a)\) 随先验 \(P(s,a)\) 和父节点访问次数增加，随该动作访问次数增加而下降。搜索结束后，真实动作不是直接由网络 policy 输出，而是由访问次数分布 \(\pi(a|s) \propto N(s,a)^{1/\tau}\) 产生。这使网络每次训练都在模仿一个比自己更强的搜索策略。

##### 训练目标：奖励、价值、策略三重监督

对一段真实轨迹，MuZero 从时间 \(t\) 的历史观测开始，在模型中按真实动作 unroll \(K\) 步，并在每一步监督：

$$\mathcal{L}_t(\theta)=
\sum_{k=0}^{K}\ell^v(v_t^k, z_{t+k})
+ \sum_{k=0}^{K}\ell^p(p_t^k, \pi_{t+k})
+ \sum_{k=1}^{K}\ell^r(r_t^k, u_{t+k})
+ c\|\theta\|^2
$$

其中 \(z\) 是 n-step bootstrapped return，\(\pi\) 是 MCTS visit distribution，\(u\) 是真实环境奖励。这个目标把“学模型”和“学规划”绑在一起：模型只会被奖励、价值和策略误差塑形，不会被像素重建误差牵引到任务无关细节。

##### 与 SimPLe/MBPO 的区别

SimPLe 和 MBPO 都使用模型生成经验再训练策略，因此模型误差可能直接污染策略梯度。MuZero 不把模型 rollout 当作 replay 数据，而是用模型在搜索树中评估候选动作；真实训练目标仍来自真实轨迹和搜索改进策略。相对 AlphaZero，MuZero 去掉了规则模拟器依赖；相对视频预测世界模型，它去掉了观测重建负担。

> 💡 关键：MuZero 的“世界模型”不是为了看见未来画面，而是为了让搜索树在隐藏空间里可靠地比较动作。

#### 🧪 练习题

```yaml
question: "MuZero 为什么不需要预测下一帧原始观测？"
options:
  - "因为它只在棋盘游戏中使用，没有像素输入"
  - "因为它学习的潜在模型只需预测奖励、价值和策略，足够支持规划"
  - "因为 MCTS 可以直接访问真实环境未来状态"
  - "因为策略网络完全不参与动作选择"
answer: 1
explain: "MuZero 的核心是 value-equivalent latent model；隐藏状态不重建观测，只服务于 reward/value/policy 预测和 MCTS。"
```
