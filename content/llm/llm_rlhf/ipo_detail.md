### IPO：身份偏好优化（Identity Preference Optimisation）

```yaml
id: ipo
full_name: "身份偏好优化 (IPO)"
year: "2024"
paper_url: "https://arxiv.org/abs/2310.12036"
motivation: "MSE正则化解决DPO过拟合"
parent: "dpo"
category: "direct_preference"
```

#### 📝 一句话总结

IPO 将偏好学习从 DPO 的 logistic 分类目标改写为带固定目标间隔的均方误差回归，解决了 DPO 在确定性或近确定性偏好样本上让 KL 正则失效、过度远离参考模型的问题。

#### 🎯 核心要点

- 提出统一的 \(\Psi\)-Preference Optimisation（\(\Psi\)PO）框架，把 RLHF、DPO 与 IPO 都表示为“偏好函数收益 + KL 正则”的离线策略优化问题。
- 指出 DPO 对应 \(\Psi(q)=\log(q/(1-q))\)，当经验偏好 \(q\) 接近 0 或 1 时目标无界，容易忽略 KL 正则并过拟合偏好数据。
- IPO 选择恒等映射 \(\Psi(q)=q\)，直接优化总偏好概率 \(p^*_\rho(\pi \succ \mu)\)，保持偏好收益有界。
- 核心损失是 MSE：把新旧策略的 winner/loser 对数似然比差回归到 \(\frac{1}{2\tau}\)，而不是像 DPO 那样持续放大偏好 margin。
- 训练不需要显式奖励模型，也不需要 PPO 采样；只需要偏好三元组 \((x,y_w,y_l)\) 和冻结参考策略 \(\pi_\text{ref}\)。
- 理论上给出 root-finding 形式和唯一最优性证明，说明 IPO 的经验损失仍会把解拉向带 KL 约束的最优策略。

#### 🔬 深入细节

![IPO 与 DPO 在确定性偏好下的行为对比](https://ar5iv.labs.arxiv.org/html/2310.12036/assets/x1.png)
*图：论文中的确定性偏好实验。DPO 在偏好样本完全偏向某个动作时倾向于收敛到贪心策略；IPO 会随 \(\tau\) 保留对参考策略的正则约束。*

IPO 的出发点不是“再设计一个 DPO 变体”，而是先把偏好优化抽象成一个统一目标。给定行为策略 \(\mu\)、参考策略 \(\pi_\text{ref}\)、真实 pairwise preference \(p^*(y \succ y'|x)\)，论文定义：

$$
\max_\pi\;\mathbb{E}_{x\sim\rho,\,y\sim\pi(\cdot|x),\,y'\sim\mu(\cdot|x)}
\left[\Psi\left(p^*(y \succ y'|x)\right)\right]
-\tau D_\text{KL}(\pi\|\pi_\text{ref}).
$$

当 \(\Psi(q)=\log\frac{q}{1-q}\) 且 Bradley-Terry 假设成立时，这个目标与 RLHF/DPO 的最优策略一致。问题在于 \(\log\frac{q}{1-q}\) 是无界函数：如果经验数据里某个 winner 总是胜过 loser，\(\hat q=1\)，那么 logit 偏好趋向无穷大，任何有限的 KL 系数 \(\tau\) 都难以阻止策略把 loser 概率压到 0。这解释了论文所谓的 DPO overfitting：DPO 不是没有正则项，而是偏好项在确定性样本上会变得过强。

IPO 的关键替换是设 \(\Psi(q)=q\)，也就是直接优化“一个策略输出相对行为策略输出被偏好的概率”：

$$
\max_\pi\;p^*_\rho(\pi \succ \mu)-\tau D_\text{KL}(\pi\|\pi_\text{ref}).
$$

由于偏好概率天然落在 \([0,1]\)，偏好收益不会像 logit preference 那样爆炸。论文进一步把这个目标推导成 root-finding 问题。定义

$$
h_\pi(y,y',x)=\log\frac{\pi(y|x)\pi_\text{ref}(y'|x)}{\pi(y'|x)\pi_\text{ref}(y|x)},
$$

它度量的是“当前策略相对参考策略，把 \(y\) 放到 \(y'\) 前面的 log-ratio 变化”。若最优策略为 \(\pi^*\)，则该 log-ratio 应等于偏好收益差除以正则强度。IPO 用平方误差去拟合这个条件。

论文先给出 population loss：

$$
L(\pi)=\mathbb{E}_{y,y'\sim\mu}\left[\left(h_\pi(y,y')-
\frac{p^*(y\succ\mu)-p^*(y'\succ\mu)}{\tau}\right)^2\right].
$$

实际训练时我们拿到的是偏好样本 \((x,y_w,y_l)\)，而不是完整的 \(p^*\)。利用 \((y_w,y_l,I=1)\) 与反向样本 \((y_l,y_w,I=0)\) 的对称性，论文把经验损失化简为：

$$
\mathcal{L}_\text{IPO}
=\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}
\left[\left(h_\pi(y_w,y_l,x)-\frac{\tau^{-1}}{2}\right)^2\right].
$$

这条公式体现了 IPO 与 DPO 的本质差异。DPO 的 \(-\log\sigma(\cdot)\) 会在 winner margin 不够大时继续推动 margin 增大；IPO 则只要求 margin 接近固定目标 \(\frac{1}{2\tau}\)。当 margin 已经足够时，继续增大反而会产生 MSE 惩罚，因此 IPO 自带“不要离参考模型太远”的机制。

```python
# IPO sampled loss, simplified from Algorithm 1 in the paper
for batch in preference_loader:
    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected

    # sequence log-probabilities under trainable policy
    logp_w = policy.logprob(x, y_w)
    logp_l = policy.logprob(x, y_l)

    # frozen reference model log-probabilities
    with no_grad():
        ref_logp_w = ref_policy.logprob(x, y_w)
        ref_logp_l = ref_policy.logprob(x, y_l)

    h = (logp_w - logp_l) - (ref_logp_w - ref_logp_l)
    target_margin = 1.0 / (2.0 * tau)
    loss = mean((h - target_margin) ** 2)

    loss.backward()
    optimizer.step()
```

从训练流程看，IPO 与 DPO 一样可以直接作用在离线偏好数据上：先用 SFT 或其他方式得到 \(\pi_\text{ref}\)，冻结它；然后对当前策略 \(\pi_\theta\) 计算 winner 和 loser 的序列级 log probability；最后最小化上面的平方误差。它不需要奖励模型，也不需要像 PPO 那样从当前策略 rollout 新样本，因此工程复杂度接近 DPO。

> 💡 关键：IPO 的“正则化”不只是外部 KL 项，而是被折进了目标 margin 本身。\(\tau\) 越大，\(\frac{1}{2\tau}\) 越小，策略相对参考模型的 winner/loser log-ratio 变化就越受限制。

这也解释了论文中 deterministic preference 的实验现象。如果数据只告诉模型“\(y_a\) 总是优于 \(y_b\)”，DPO 会不断强化 \(y_a\) 相对 \(y_b\) 的概率比；IPO 则只把该比值推到与 \(\tau\) 匹配的有限间隔。对于 LLM 对齐，这一点很重要，因为偏好数据常常是稀疏的、单次标注的、带采样偏差的；把一次胜负当成无限强的偏好证据，会使模型牺牲多样性和参考模型中已有的语言能力。

与传统 RLHF 相比，IPO 避免了 reward model 的外推问题：不需要先拟合 \(r(x,y)\)，再假设该奖励能泛化到当前策略新采样的分布。与 DPO 相比，IPO 保留了“直接从偏好更新策略”的便利，但用有界 identity preference 和 MSE margin 避免了 DPO 的无界 logit 偏好。代价是 IPO 的目标更像“回归到一个固定偏好间隔”，当任务确实需要非常强的偏好压制时，\(\tau\) 的选择会直接决定对齐强度。

#### 🧪 练习题

```yaml
question: "IPO 为什么能缓解 DPO 在确定性偏好样本上的过拟合？"
options:
  - "它用 PPO rollout 生成更多负样本"
  - "它把 winner/loser 的相对 log-ratio 回归到有限目标，而不是无限放大偏好 margin"
  - "它删除了参考模型，避免 KL 计算误差"
  - "它只训练 reward model，不直接更新策略"
answer: 1
explain: "IPO 的 sampled loss 是 MSE，目标间隔为 1/(2τ)。当 margin 超过目标时继续增大会被惩罚，因此不会像 DPO 的 logit preference 那样在 q=1 时趋向无界。"
```
