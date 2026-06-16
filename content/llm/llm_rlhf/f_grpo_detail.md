### f散度GRPO (f-GRPO)
```yaml
id: f_grpo
full_name: f散度GRPO (f-GRPO)
year: "2026.02"
paper_url: https://arxiv.org/abs/2602.05946
motivation: 散度泛化的GRPO改进
parent: grpo
category: rl_based
```

#### 📝 一句话总结
f-GRPO 将 GRPO 的“组内相对优势更新”重新解释为奖励诱导的 aligned / unaligned 分布之间的 \(f\)-divergence 估计，从而把偏好对齐里的散度优化推广到只有标量奖励的 RLVR 场景。论文同时提出 f-HAL，把 on-policy 的 f-GRPO 与 off-policy 偏好监督相插值，用于在奖励模型不可靠时缓解 reward hacking。

#### 🎯 核心要点
- 将 preference alignment 中“chosen vs. rejected 分布的散度估计”推广到 RLVR 中“高于组均值奖励 vs. 低于组均值奖励”的分布估计。
- 每个 prompt 采样一组响应，用标准化 advantage 将响应分成 reward-aligned 与 reward-unaligned 两侧。
- 用截断 importance weighting 与 softmax reward weighting 估计 \(D_r^+\) 和 \(D_r^-\) 相对于旧策略采样分布的密度比。
- 用 \(f\)-divergence 的变分表示构造统一损失，可实例化为 Hellinger、JS、KL、Pearson、Reverse KL、Total Variation 等不同版本。
- f-GRPO 的核心差异不是简单替换 GRPO 的 advantage，而是把更新目标改成“分离奖励好样本和坏样本”的散度估计。
- f-HAL 通过 \(\lambda\mathcal{L}_{\mathrm{FDO}}+(1-\lambda)\mathcal{L}_{f\text{-}\mathrm{GRPO}}\) 融合偏好数据和 on-policy reward feedback。
- 理论结果给出 divergence estimation、alignment consistency 与期望奖励提升；与 GRPO 相比，canonical link 下的 f-GRPO 对低于均值的响应压制更强。

#### 🔬 深入细节
![f-GRPO divergence estimation framework](https://arxiv.org/html/2602.05946v3/nips_figs_tabs/figs/f-grpo_HQ.png)
*图：论文 Figure 1，将 RLVR、Preference Alignment 和 Hybrid Alignment 统一为 aligned / unaligned 分布之间的散度估计。*

```python
# f-GRPO / f-HAL 的核心训练逻辑，按论文 Algorithm 1 简化整理
for step in training_steps:
    prompts = sample_prompts(batch_size=B)
    old_policy = copy(policy)
    on_policy_grad = 0

    for x in prompts:
        ys = [old_policy.generate(x) for _ in range(G)]
        rewards = [reward_fn(x, y) for y in ys]
        adv = normalize(rewards)  # (r_i - mean(r)) / std(r)

        # above-average -> reward-aligned; below-average -> reward-unaligned
        w_pos = truncated_softmax_importance(rewards, adv > 0, old_policy)
        w_neg = truncated_softmax_importance([-r for r in rewards], adv < 0, old_policy)

        for y_i, a_i, wp_i, wn_i in zip(ys, adv, w_pos, w_neg):
            r_theta = beta * logprob_ratio(policy, ref_policy, x, y_i)
            if a_i > 0:
                psi = -wp_i * link_g(r_theta)
            else:
                psi =  wn_i * convex_conjugate_f_star(link_g(r_theta))
            on_policy_grad += a_i * grad(psi)

    off_policy_grad = fdo_gradient(preference_batch) if use_preference_data else 0
    grad_total = (1 - lambda_) * on_policy_grad + lambda_ * off_policy_grad
    policy.update(grad_total)
```

传统 GRPO 的出发点是：对同一个 prompt 采样 \(G\) 个候选回答，计算组内标准化优势 \(A_i\)，再提高正优势回答的概率、降低负优势回答的概率。它的隐含奖励可写为
$$
r_\theta(x,y)=\beta\log\frac{\pi_\theta(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)},
$$
组内优势常写成
$$
A_i=\frac{r(x,y_i)-\frac{1}{G}\sum_{j=1}^{G}r(x,y_j)}{\mathrm{std}(\{r(x,y_j)\}_{j=1}^{G})+\epsilon}.
$$
GRPO 直接把 \(A_i\) 当作策略梯度权重，因此它更像“按奖励相对大小做局部 reweighting”。f-GRPO 的关键改动是：不只问某个样本 advantage 有多大，而是先用 advantage 的符号定义两个分布，\(D_r^+\) 表示高于均值的 reward-aligned 响应，\(D_r^-\) 表示低于均值的 reward-unaligned 响应，然后优化二者的 \(f\)-divergence。

由于 RLVR 没有偏好数据里直接给出的 chosen / rejected 样本，论文用旧策略 \(\pi_{\theta_{\mathrm{old}}}\) 采样到的一组响应来做 importance sampling。直观上，正侧权重要偏向高奖励样本，负侧权重要偏向低奖励样本，同时还要校正这些样本来自旧策略而不是目标 aligned / unaligned 分布。可简化写成
$$
\hat w_i^+\propto \mathbf{1}\{A_i>0\}\frac{\operatorname{softmax}(r_1,\ldots,r_G)_i}{\pi_{\theta_{\mathrm{old}}}(y_i\mid x)},\quad
\hat w_i^-\propto \mathbf{1}\{A_i<0\}\frac{\operatorname{softmax}(-r_1,\ldots,-r_G)_i}{\pi_{\theta_{\mathrm{old}}}(y_i\mid x)}.
$$
这里的 indicator 是“截断”的来源：正侧只从 above-average 样本估计，负侧只从 below-average 样本估计。这样做避免了把奖励中性的样本强行解释为偏好信号，也使更新更聚焦于区分好坏行为的样本。

有了 \(\hat w_i^+\) 与 \(\hat w_i^-\)，f-GRPO 把 preference alignment 中的 FDO 目标搬到 on-policy RL 中。对任意凸函数 \(f\)、共轭函数 \(f^*\) 和单调 link function \(g\)，局部项可写成
$$
\psi_{f,g}(r_\theta,A_i)=
\begin{cases}
-\hat w_i^+\,g(r_\theta(x,y_i)), & A_i>0,\\
\hat w_i^-\,f^*(g(r_\theta(x,y_i))), & A_i<0.
\end{cases}
$$
训练时再用 advantage 的幅度调节梯度尺度，得到与标准 on-policy RL 相近的优化动态。不同 \(f\) 选择对应不同的“分离形状”：例如 KL 更强调覆盖 aligned 分布，Reverse KL 更强调模式选择，Total Variation 更像最大化可分性边界。论文的价值在于给出一套统一 recipe，而不是只提出一个固定损失。

f-HAL 则面向奖励模型不完美的安全对齐场景。纯 on-policy RL 使用 learned reward model 时容易 reward hacking：模型找到奖励模型漏洞，却偏离真实人类偏好。f-HAL 将 off-policy preference supervision 当作锚点：
$$
\mathcal{L}_{f\text{-}\mathrm{HAL}}(\theta)=\lambda\mathcal{L}_{\mathrm{FDO}}(\theta)+(1-\lambda)\mathcal{L}_{f\text{-}\mathrm{GRPO}}(\theta).
$$
当 \(\lambda=0\) 时退化为 f-GRPO，当 \(\lambda=1\) 时退化为 FDO；中间值同时利用 reward feedback 的探索能力和偏好数据的稳定约束。论文将其解释为 aligned mixture 与 unaligned mixture 之间的散度估计，因此 hybrid 不是简单加 loss，而是在分布层面混合两类对齐信号。

与 GRPO 的差别可以用固定点直觉理解。未裁剪 GRPO 会按照标准化奖励对参考策略做指数 reweighting，因此低于均值的响应通常仍保留非零概率；f-GRPO 在 canonical link 条件下更接近“把质量集中到 above-average 响应集合”，对 below-average 响应的压制更尖锐。这个差别解释了论文在数学推理 RLVR 上看到的收益：模型不只是平滑地偏向高分样本，而是更明确地最大化 reward-aligned 与 reward-unaligned 行为之间的分离。

> 💡 关键：f-GRPO 的“f”不是装饰性超参数，而是决定 aligned / unaligned 两侧如何被拉开；f-HAL 的“hybrid”也不是普通多任务训练，而是把偏好分布与奖励诱导分布混合后再做散度估计。

#### 🧪 练习题
```yaml
question: "f-GRPO 相比标准 GRPO 的核心变化是什么？"
options:
  - "把所有奖励都替换为人工偏好标签"
  - "把组内优势更新解释并改造为 reward-aligned 与 reward-unaligned 分布之间的 f-divergence 估计"
  - "只增加 KL 惩罚系数以防止策略偏离参考模型"
  - "去掉 on-policy 采样，完全依赖离线数据训练"
answer: 1
explain: "f-GRPO 仍使用 on-policy 组采样，但用奖励诱导两侧分布并通过 f-divergence 变分目标优化二者分离；这比 GRPO 的简单 advantage reweighting 更结构化。"
```
