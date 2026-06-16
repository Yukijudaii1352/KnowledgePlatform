### 组相对策略优化 (GRPO)

```yaml
id: grpo
full_name: 组相对策略优化 (GRPO)
year: "2025"
paper_url: https://arxiv.org/abs/2501.12948
motivation: 组相对评分取代Critic模型
parent: rlhf
category: rl_based
```

#### 📝 一句话总结
GRPO 用同一问题下多条候选回答的组内相对奖励来估计优势函数，解决 PPO 在大语言模型 RL 训练中必须额外训练同规模 Critic/Value Model 的高成本问题。它保留 PPO 的裁剪式稳定更新，同时把 baseline 从学习到的价值函数改为组内 reward 归一化，是 DeepSeek-R1/R1-Zero 进行大规模可验证奖励强化学习的核心优化器。

#### 🎯 核心要点
- 无 Critic 设计：不再训练与策略模型同规模的 Value Model，而用同一 prompt 的多条采样回答构成 group baseline。
- 组相对优势估计：对每个问题采样 \(G\) 个输出，用 \((r_i-\mathrm{mean}(\mathbf r))/\mathrm{std}(\mathbf r)\) 作为该输出所有 token 的优势信号。
- PPO 裁剪目标保留：仍使用新旧策略概率比和 \(\operatorname{clip}(\cdot,1-\epsilon,1+\epsilon)\) 抑制单步策略漂移。
- KL 正则独立进入目标函数：不把 KL 惩罚混入 reward，而是在优化目标中直接约束 \(\pi_\theta\) 与 reference policy 的距离。
- 适配可验证奖励 RL：DeepSeek-R1-Zero 使用规则型 accuracy reward 与 format reward，避免训练神经奖励模型带来的 reward hacking 和额外资源开销。
- 支持 outcome/process 两类监督：结果监督把归一化组奖励赋给整段输出，过程监督可在推理步骤级别分配奖励并回传到相关 token。

#### 🔬 深入细节

![PPO 与 GRPO 对比示意图](https://arxiv.org/html/2402.03300v3/x2.png)
*图：DeepSeekMath Figure 4 展示 PPO 与 GRPO 的关键差别：PPO 依赖 Value Model 估计 baseline，GRPO 改用同一问题多条回答的组内分数估计 baseline，从而省去 Critic。DeepSeek-R1 论文沿用该 GRPO 框架进行大规模推理 RL。*

GRPO 的直接动机来自 LLM 场景下 PPO 的资源瓶颈。传统 PPO 是 actor-critic 算法，除了策略模型 \(\pi_\theta\)，还需要训练价值函数 \(V_\psi\) 估计每个 token 位置的未来回报；当策略模型已经是数十亿到数千亿参数时，一个同规模 Critic 会显著增加显存、通信和优化成本。更麻烦的是，RLHF/推理 RL 中 reward 往往只在回答末尾出现，例如最终答案是否正确、格式是否满足 `<think>`/`<answer>`，这使得 token 级 value fitting 既稀疏又噪声较大。GRPO 的核心判断是：对于同一个问题，多条候选回答之间天然具有可比较性，因此可以用组内平均分作为 baseline，而不是额外学习一个价值网络。

其目标函数继承 PPO 的 clipped surrogate。对于问题 \(q\)，先从旧策略 \(\pi_{\theta_{old}}\) 采样 \(G\) 条输出 \(\{o_1,\ldots,o_G\}\)，对每条输出逐 token 优化：

$$
\begin{aligned}
\mathcal J_{GRPO}(\theta)
= \mathbb E\Bigg[\frac{1}{G}\sum_{i=1}^{G}\frac{1}{|o_i|}\sum_{t=1}^{|o_i|}
\Bigg( &\min\Big[\rho_{i,t}(\theta)\hat A_{i,t},
\operatorname{clip}(\rho_{i,t}(\theta),1-\epsilon,1+\epsilon)\hat A_{i,t}\Big] \\
&-\beta D_{KL}(\pi_\theta\|\pi_{ref})\Bigg)\Bigg],
\end{aligned}
$$

其中

$$
\rho_{i,t}(\theta)=\frac{\pi_\theta(o_{i,t}\mid q,o_{i,<t})}{\pi_{\theta_{old}}(o_{i,t}\mid q,o_{i,<t})}.
$$

优势函数不再来自 GAE + Value Model，而是来自组内 reward 标准化。若 \(\mathbf r=\{r_1,\ldots,r_G\}\)，结果监督版本令同一输出中所有 token 共享同一个优势：

$$
\hat A_{i,t}=\widetilde r_i=\frac{r_i-\operatorname{mean}(\mathbf r)}{\operatorname{std}(\mathbf r)}.
$$

这个式子体现了“组相对”的含义：绝对 reward 高不一定重要，重要的是该回答是否优于同一 prompt 下的其他回答。若某个样本得分高于组均值，所有生成它的 token 都被强化；低于组均值则被抑制。标准差归一化还能缓解不同 prompt reward 尺度不一致的问题，使数学题、代码题、格式题等不同任务的 reward 更容易混合训练。

KL 项的处理也是 GRPO 与早期 RLHF PPO 的差别之一。标准 PPO 常把 KL 惩罚作为每 token reward 的一部分，例如 \(r_t=r_\varphi-\beta\log(\pi_\theta/\pi_{ref})\)，这会把 reward shaping、优势估计和正则项耦合在一起。GRPO 论文把 KL 直接放进目标函数，并用正值估计器近似：

$$
D_{KL}(\pi_\theta\|\pi_{ref}) \approx
\frac{\pi_{ref}(o_{i,t}\mid q,o_{i,<t})}{\pi_\theta(o_{i,t}\mid q,o_{i,<t})}
-\log\frac{\pi_{ref}(o_{i,t}\mid q,o_{i,<t})}{\pi_\theta(o_{i,t}\mid q,o_{i,<t})}-1.
$$

这样做的直觉是把“该回答相对组内其他回答是否更好”和“新策略是否偏离参考模型过远”分开处理。前者决定学习方向，后者限制分布漂移，避免模型为了拿到规则奖励而走向不可读、语言混杂或 reward hacking 的区域。

```python
# GRPO 核心训练伪代码
for iteration in range(num_iterations):
    old_policy = policy.snapshot()
    for prompts in dataloader:
        groups = []
        for q in prompts:
            outputs = old_policy.sample(q, n=G)       # 同一问题采样 G 个回答
            rewards = reward_fn(q, outputs)           # accuracy reward / format reward / reward model
            advantages = (rewards - rewards.mean()) / (rewards.std() + 1e-8)
            groups.append((q, outputs, advantages))

        for _ in range(grpo_epochs):
            loss = 0
            for q, outputs, advantages in groups:
                for i, output in enumerate(outputs):
                    for t, token in enumerate(output):
                        ratio = policy.prob(token, q, output[:t]) / old_policy.prob(token, q, output[:t])
                        clipped = clip(ratio, 1 - eps, 1 + eps)
                        surrogate = min(ratio * advantages[i], clipped * advantages[i])
                        kl = kl_estimator(policy, ref_policy, token, q, output[:t])
                        loss += -(surrogate - beta * kl)
            optimizer.step(loss)
```

在 DeepSeek-R1-Zero 中，GRPO 和规则奖励结合得很紧密。accuracy reward 根据数学答案、代码测试等可验证信号给分，format reward 要求模型把推理过程和答案分别放在指定标签中。论文明确避免使用 outcome/process 神经奖励模型，因为大规模 RL 中神经 RM 容易被策略利用并产生 reward hacking，同时还要反复重训。GRPO 正好适合这种设置：每个 prompt 采多条候选，规则奖励快速打分，组内归一化后即可更新策略。

与 PPO 相比，GRPO 的牺牲是 baseline 从“跨状态泛化的价值函数”变成了“当前 prompt 的采样统计量”。这会带来组大小 \(G\)、采样多样性和 reward 方差之间的权衡：\(G\) 太小，组均值/方差估计不稳定；\(G\) 太大，rollout 成本上升。但在 LLM 推理任务中，同一问题多采样本来就是常见做法，而且省掉 Critic 后总体工程复杂度显著下降，因此 GRPO 在 reasoning RL 中比标准 PPO 更容易扩展。

> 💡 关键：GRPO 并不是简单“去掉 Value Model”。它用同 prompt 多响应比较把偏好数据和可验证奖励的相对性质转化为 advantage，从而保留 PPO 稳定更新的同时，大幅降低 RLHF/RLVR 的训练资源。

#### 🧪 练习题
```yaml
question: "GRPO 为什么可以不训练 PPO 中常见的 Critic/Value Model？"
options:
  - "因为 GRPO 完全不需要优势函数"
  - "因为 GRPO 用同一 prompt 下多条回答的组内奖励均值和标准差估计优势"
  - "因为 GRPO 只做监督学习，不进行策略梯度更新"
  - "因为 GRPO 把 KL 正则全部删除了"
answer: 1
explain: "GRPO 仍然需要优势函数和策略梯度，但优势由组内相对 reward 计算，不再依赖额外训练的价值网络。"
```
