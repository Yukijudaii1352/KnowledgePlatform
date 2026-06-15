### DPO：直接偏好优化 (Direct Preference Optimization)
```yaml
id: dpo
name: DPO
full_name: 直接偏好优化 (Direct Preference Optimization)
year: '2023'
org: Stanford
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html
category: alignment
parent: rlhf
motivation: 直接偏好优化无需奖励模型
```

#### 📝 一句话总结
DPO 将 KL 约束下的偏好优化目标重写成一个二分类损失，直接用偏好对训练策略模型，避免了显式奖励模型和 PPO 式强化学习流程。

#### 🎯 核心要点
- 从 Bradley-Terry 偏好模型和 KL-regularized RLHF 目标推导出直接优化策略的闭式形式。
- 训练数据是 \((x, y_w, y_l)\) 偏好三元组，其中 \(y_w\) 是 preferred response，\(y_l\) 是 rejected response。
- 使用参考模型 \(\pi_{\mathrm{ref}}\) 约束新策略 \(\pi_\theta\)，避免偏离 SFT 模型过远。
- DPO 损失本质上提高 chosen 相对 rejected 的 log probability margin，同时减去参考模型已有偏好。
- 相比 PPO-RLHF，DPO 不需要在线 rollout、价值模型、奖励模型部署和复杂 RL 超参调试。

#### 🔬 深入细节
![DPO 与 RLHF 流程对比](https://arxiv.org/html/2305.18290v3/figures/diagrams/teaser.png)
*图：DPO 直接从偏好数据优化语言模型，而传统 RLHF 先训练奖励模型再用 RL 优化策略。*

```python
# DPO 简化伪代码
policy = load_sft_model()
ref = freeze(copy(policy))

for batch in preference_loader:  # x, chosen, rejected
    x, yw, yl = batch

    logp_w = policy.logprob(yw, x)
    logp_l = policy.logprob(yl, x)
    ref_w = ref.logprob(yw, x)
    ref_l = ref.logprob(yl, x)

    margin = beta * ((logp_w - logp_l) - (ref_w - ref_l))
    loss = -log_sigmoid(margin).mean()
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

DPO 的理论起点是标准 RLHF 目标：最大化奖励，同时用 KL 项限制策略不要偏离参考模型太远。传统做法先用人类偏好训练一个奖励模型，再用 PPO 优化语言模型。DPO 证明，在 Bradley-Terry 偏好假设下，可以把最优奖励和最优策略之间的关系代回偏好损失，直接得到策略参数上的监督式损失。

核心损失为：
$$
\mathcal{L}_{\mathrm{DPO}}(\pi_\theta)=
-\mathbb{E}_{(x,y_w,y_l)}
\log\sigma\left(
\beta\left[
\log\frac{\pi_\theta(y_w|x)}{\pi_{\mathrm{ref}}(y_w|x)}
-
\log\frac{\pi_\theta(y_l|x)}{\pi_{\mathrm{ref}}(y_l|x)}
\right]\right)
$$
直觉上，如果当前策略相对于参考模型更偏好 chosen 而不是 rejected，括号里的 margin 变大，loss 变小。参考模型项很重要，因为它扣除了 SFT 模型本来就有的倾向，避免把所有概率都盲目推向 chosen。

参数 \(\beta\) 控制偏好优化强度和 KL 约束的平衡。较大的 \(\beta\) 会更强烈地区分 chosen/rejected，但也可能让策略偏离参考模型；较小的 \(\beta\) 更保守。因为训练形式接近普通二分类或 pairwise ranking，DPO 在工程上比 PPO 简单得多。

DPO 与 RLHF 的区别不是目标完全不同，而是优化路径不同。它仍然隐式优化 KL-regularized reward objective，只是把 reward model 融入了策略的 log probability ratio 中。因此 DPO 可以看成“语言模型自己就是隐式奖励模型”，这也是论文标题的含义。

#### 🧪 练习题
```yaml
question: "DPO 相比 PPO-RLHF 省掉了哪个关键组件？"
options:
  - "tokenizer"
  - "显式奖励模型和在线 RL 优化流程"
  - "偏好数据"
  - "参考模型"
answer: 1
explain: "DPO 仍需要偏好对和参考模型，但不需要先训练显式奖励模型再用 PPO 做强化学习。"
```
