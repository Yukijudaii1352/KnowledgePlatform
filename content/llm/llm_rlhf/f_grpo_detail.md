### f散度GRPO (f-GRPO)

```yaml
id: f_grpo
full_name: f散度GRPO (f-GRPO)
year: '2026.02'
paper_url: https://arxiv.org/abs/2602.05946
motivation: 散度泛化的GRPO改进
parent: grpo
category: rl_based
```

#### 📝 一句话总结
f-GRPO 将 GRPO 的组内相对奖励视为一种散度估计问题，用一般 \(f\)-divergence 和 canonical link 统一并改进 RLVR/偏好对齐目标。

#### 🎯 核心要点
- 从 \(f\)-divergence 视角统一 preference optimization、RLVR 和 GRPO 的 reward-aligned / unaligned 分布分离。
- 用组内高奖励样本近似 aligned distribution，低奖励样本近似 unaligned distribution，再估计两者散度。
- 通过 canonical link \(g\) 把模型 log-ratio 映射到 \(f^*\) 的有效域，避免不同散度下目标不稳定。
- f-GRPO 可作为 GRPO 的替换目标，也可与 FDO 组合成 f-HAL 混合对齐算法。
- 实验覆盖数学推理和安全对齐，强调更好的样本效率、鲁棒性和 reward hacking 缓解。

#### 🔬 深入细节
![f-GRPO 散度估计框架](https://arxiv.org/html/2602.05946v3/nips_figs_tabs/figs/f-grpo_HQ.png)
*图：论文把偏好/RLVR 训练统一成对 aligned 与 unaligned 分布的散度估计。*

```python
# f-GRPO / f-HAL 简化伪代码
for prompts in dataloader:
    groups = [policy.sample(prompt, n=G) for prompt in prompts]
    rewards = verifier_or_reward_model(groups)

    aligned = select(groups, rewards >= group_mean(rewards))
    unaligned = select(groups, rewards < group_mean(rewards))

    z_pos = logratio(policy, reference, aligned)
    z_neg = logratio(policy, reference, unaligned)
    loss_f_grpo = -mean(g(z_pos)) + mean(f_conjugate(g(z_neg)))

    if use_hybrid:
        loss = lambda_ * loss_fdo(preference_pairs) + (1 - lambda_) * loss_f_grpo
    else:
        loss = loss_f_grpo
    update(policy, loss)
```

标准 GRPO 用组内标准化奖励构造 advantage，再做策略更新。f-GRPO 重新解释这件事：一个 prompt 下高于组均值的样本形成“奖励对齐”分布，低于组均值的样本形成“未对齐”分布，训练目标应该让策略更接近前者、远离后者。这个视角把 RLVR 从启发式 advantage 推进到分布距离最小化。

公式上，\(f\)-divergence 写作 \(D_f(P\|Q)=\mathbb{E}_Q[f(\frac{dP}{dQ})]\)。不同 \(f\) 对应 KL、reverse-KL、JS 等不同偏好形状。f-GRPO 使用 Fenchel conjugate 和 canonical link \(g\) 构造可优化目标，使模型分数 \(r_\theta=\log\frac{\pi_\theta}{\pi_{\mathrm{ref}}}\) 能稳定进入散度估计。

f-GRPO 的实际训练仍保留 GRPO 的 group sampling：对每个 prompt 采样多条 completion，用 reward/verifier 评分，然后根据组内相对高低分配正负集合。区别在于，loss 不只依赖线性 advantage，而是根据选择的 \(f\) 调整正负样本的梯度形状；这让算法可以在保守性、探索性和尾部惩罚之间切换。

论文还提出 f-HAL，把 FDO 的离线偏好损失与 f-GRPO 的在线组内强化结合：\(\mathcal{L}_{f\text{-HAL}}=\lambda\mathcal{L}_{\mathrm{FDO}}+(1-\lambda)\mathcal{L}_{f\text{-GRPO}}\)。直觉是离线偏好对提供稳定方向，在线 verifier 提供任务反馈，\(f\)-divergence 决定二者怎样平衡。

> 💡 关键：f-GRPO 不是简单给 GRPO 换一个系数，而是把“高分样本 vs 低分样本”的训练信号提升为可选择散度族的分布对齐问题。

#### 🧪 练习题
```yaml
question: "f-GRPO 中选择不同 f-divergence 的意义是什么？"
options:
  - "改变 tokenizer 的分词粒度"
  - "改变 aligned 与 unaligned 分布之间的优化几何和梯度形状"
  - "完全取消 reward/verifier"
  - "只用于可视化实验结果"
answer: 1
explain: "不同 f 对应不同散度与 conjugate，决定正负样本 log-ratio 被怎样惩罚或放大。"
```
