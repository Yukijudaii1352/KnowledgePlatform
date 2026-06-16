### 直接偏好优化 (DPO)

```yaml
id: dpo
full_name: 直接偏好优化 (DPO)
year: 2023
paper_url: https://arxiv.org/abs/2305.18290
motivation: 去除奖励模型，直接偏好分类优化
parent: rlhf
category: direct_preference
```

#### 📝 一句话总结

DPO 将 RLHF 的“训练奖励模型 + 用 RL 优化策略”改写成一个直接作用在偏好样本上的二分类损失，从而不需要显式 reward model、在线采样或 PPO。它利用 KL 约束最优策略与奖励函数之间的闭式关系，让语言模型本身同时扮演 policy 和隐式 reward model。

#### 🎯 核心要点

- 核心目标：在给定偏好数据 \((x,y_w,y_l)\) 时，直接提高 chosen response 相对 rejected response 的 log-probability。
- 理论起点与 RLHF 相同：最大化 reward，同时用 KL penalty 限制 policy 偏离 reference policy。
- 关键变换：KL 约束最优解满足 \(\pi_r(y|x) \propto \pi_{ref}(y|x)\exp(r(x,y)/\beta)\)，因此 reward 可由 policy/reference 的 log-ratio 表示。
- 在 Bradley-Terry 偏好模型下，两个回答的 partition function 抵消，得到只依赖 \(\pi_\theta\) 和 \(\pi_{ref}\) 的偏好概率。
- DPO 损失是 logistic binary cross-entropy，不需要训练独立 RM，也不需要在微调时从 policy rollout 后再跑 PPO。
- \(\beta\) 控制偏离 reference 的强度：越大越保守，越小越允许 policy 为满足偏好而远离参考模型。
- 实验覆盖 sentiment control、summarization、single-turn dialogue，论文报告 DPO 与 PPO-based RLHF 相当或更好，同时实现更简单。

#### 🔬 深入细节

![DPO 避免显式强化学习流程](https://arxiv.org/html/2305.18290v3/figures/diagrams/teaser.png)
*图：论文 Figure 1。传统 RLHF 先拟合 reward model 再用 RL 优化；DPO 直接把偏好数据转成 policy 的分类损失。*

DPO 要解决的是 RLHF 工程复杂度和训练不稳定性。标准 RLHF 通常有三步：先 SFT 得到参考模型，再用偏好数据训练 reward model，最后用 PPO 或类似 RL 算法让 policy 最大化 reward，同时用 KL 约束防止偏离参考模型。这个流程有多个脆弱点：reward model 可能被过优化，PPO 需要在线采样和大量超参调试，语言生成又是离散动作空间，导致端到端训练成本高。DPO 的核心观察是：如果 RLHF 的目标本身包含 KL 约束，那么最优 policy 与 reward 之间存在闭式映射；既然偏好数据只关心 reward 差值，就可以把 reward model 消去，直接优化 policy。

DPO 沿用 RLHF 的 KL-constrained reward maximization 目标。给定 prompt \(x\)、policy \(\pi_\theta\)、reference policy \(\pi_{ref}\)、奖励 \(r(x,y)\)，传统目标可写为：

$$
\max_{\pi_\theta}\; \mathbb{E}_{x\sim\mathcal{D}, y\sim\pi_\theta(y|x)}[r(x,y)] - \beta D_{KL}(\pi_\theta(y|x)\,||\,\pi_{ref}(y|x))
$$

其中 \(\beta\) 是 KL 温度。对任意固定 reward，这个目标的最优解为：

$$
\pi_r(y|x)=\frac{1}{Z(x)}\pi_{ref}(y|x)\exp\left(\frac{1}{\beta}r(x,y)\right)
$$

等价地，reward 可以写成：

$$
r(x,y)=\beta\log\frac{\pi_r(y|x)}{\pi_{ref}(y|x)}+\beta\log Z(x)
$$

这一步是 DPO 的关键。\(Z(x)\) 是对所有可能回答求和的 partition function，直接估计很困难；但偏好模型只使用两个回答的 reward 差，因此同一个 prompt 下的 \(\beta\log Z(x)\) 会抵消。

```python
# DPO training loop on static preference pairs
reference = freeze(sft_model)
policy = initialize_from(sft_model)

for x, y_w, y_l in preference_loader:
    logp_w = policy.logprob(x, y_w)
    logp_l = policy.logprob(x, y_l)
    ref_logp_w = reference.logprob(x, y_w)
    ref_logp_l = reference.logprob(x, y_l)

    chosen_adv = logp_w - ref_logp_w
    rejected_adv = logp_l - ref_logp_l
    logits = beta * (chosen_adv - rejected_adv)
    loss = -log_sigmoid(logits)
    update(policy, loss)
```

在 Bradley-Terry 偏好模型中，人类偏好概率由 reward 差决定：

$$
p^*(y_w \succ y_l|x)=\sigma(r^*(x,y_w)-r^*(x,y_l))
$$

把上面的 reward-policy 关系代入并消去 \(Z(x)\)，得到 DPO 对偏好样本的概率模型：

$$
p_\theta(y_w \succ y_l|x)=\sigma\left(\beta\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)}-\beta\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)
$$

于是 DPO 损失就是负对数似然：

$$
\mathcal{L}_{DPO}(\pi_\theta;\pi_{ref}) = -\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}\left[\log\sigma\left(\beta\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)}-\beta\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)\right]
$$

这个式子有两个直觉层次。第一，\(\log \pi_\theta(y_w|x)-\log \pi_\theta(y_l|x)\) 鼓励模型更偏向 chosen 而不是 rejected。第二，减去 reference 的 log-ratio 后，DPO 鼓励的是“相对参考模型更偏好 chosen”，而不是无约束地把 chosen 概率推到极高、把 rejected 概率推到极低。这相当于把 KL 约束内化到了分类 logits 里，避免 naive unlikelihood 那种容易导致语言质量崩坏的目标。

DPO 与 reward modeling 的关系也很重要。DPO 并不是说 reward 不存在，而是使用了一个隐式 reward：

$$
r_\theta(x,y)=\beta\log\frac{\pi_\theta(y|x)}{\pi_{ref}(y|x)} + C(x)
$$

其中 \(C(x)\) 是任意只依赖 prompt 的常数。Bradley-Terry 只看同一 prompt 下两个回答的 reward 差，所以 \(C(x)\) 不影响偏好概率。这解释了论文副标题 “Your Language Model is Secretly a Reward Model”：当前 policy 相对 reference 增加某个回答概率的幅度，本身就可以被解释为该回答的隐式奖励。

与 PPO-based RLHF 相比，DPO 的训练数据流更短。PPO 需要先训练 RM，然后循环采样 response、计算 reward、估计 advantage、更新 policy 和 value model，还要调 KL penalty、reward normalization、rollout batch 等参数；DPO 只需要静态偏好数据和 frozen reference model，像普通监督学习一样跑 binary cross-entropy。这降低了实现门槛，也减少了 reward hacking 的一部分来源：没有独立 RM 就没有“policy 钻 RM 漏洞”的同样形式。不过 DPO 仍然可能过拟合偏好数据或学到数据中的偏差，因此 reference model、\(\beta\)、数据质量和 chosen/rejected 的覆盖范围仍然关键。

DPO 的 \(\beta\) 可以理解为“偏好优化力度”。当 \(\beta\) 较大时，同样的 log-ratio 差异会产生更尖锐的偏好概率，训练会更强烈地区分 chosen/rejected；但从 KL 目标角度看，\(\beta\) 也对应偏离 reference 的惩罚尺度。实践中它控制了模型在遵循偏好与保持原模型语言分布之间的折中。过小可能让更新太弱，过大可能让模型过度追随偏好对中的局部模式。

> 💡 关键：DPO 的“直接”不是直接最大化 chosen 的似然，而是直接最大化一个从 RLHF KL 目标推导出的偏好概率；reference log-probability 是防止它退化成普通偏好分类的重要项。

#### 🧪 练习题

```yaml
question: "DPO 为什么可以不训练显式 reward model？"
options:
  - "因为 KL 约束 RLHF 目标给出了 reward 与最优 policy 的闭式关系，偏好差值中 partition function 会抵消"
  - "因为 DPO 假设所有 chosen responses 都来自同一个人工专家"
  - "因为 DPO 只做 SFT，不使用 rejected responses"
  - "因为 Bradley-Terry 模型不需要任何奖励概念"
answer: 0
explain: "DPO 将 reward 写成 policy/reference log-ratio；在同一 prompt 的两个回答比较中 Z(x) 抵消，因此可直接用 policy 参数化偏好概率。"
```
