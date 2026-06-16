### KTO：Kahneman-Tversky 优化（Kahneman-Tversky Optimization）

```yaml
id: kto
full_name: "Kahneman-Tversky优化 (KTO)"
year: "2024"
paper_url: "https://arxiv.org/abs/2402.01306"
motivation: "前景理论，仅需二元好坏反馈"
parent: "dpo"
category: "direct_preference"
```

#### 📝 一句话总结

KTO 把 LLM 对齐目标解释为前景理论下的人类效用最大化，用“好/坏”二元反馈替代成对偏好数据，在不构造 preference pair 的情况下达到接近或超过 DPO 的对齐效果。

#### 🎯 核心要点

- 提出 Human-Aware Losses（HALOs）视角，说明 DPO、PPO-Clip 等有效对齐损失隐式包含类似人类决策的参考点、收益递减和损失敏感性。
- KTO 不最大化 preference likelihood，而是直接最大化单个生成样本的 Kahneman-Tversky 式主观效用。
- 训练数据只需要 \((x,y,\text{desirable/undesirable})\) 标签，不要求同一个 prompt 下的 winner/loser 成对比较。
- 使用隐式奖励 \(r_\theta(x,y)=\log\frac{\pi_\theta(y|x)}{\pi_\text{ref}(y|x)}\)，并以 KL 参考点 \(z_0\) 判断该输出是相对收益还是相对损失。
- 对 desirable 与 undesirable 样本分别设置 \(\lambda_D,\lambda_U\)，可处理正负反馈比例严重不均衡的数据。
- 实践中对 \(z_0\) 停止梯度，并用 batch 内错配输出估计 KL 参考点，以提高训练稳定性。

#### 🔬 深入细节

![KTO 只需要二元好坏反馈](https://ar5iv.labs.arxiv.org/html/2402.01306/assets/figures/teaser.png)
*图：传统 RLHF/DPO 依赖成对偏好；KTO 只需要判断单个输出对输入是否 desirable，因此能利用更便宜、更丰富的二元反馈。*

KTO 的核心问题是：LLM 对齐是否一定需要 \((y_w,y_l)\) 这种 pairwise preference？论文认为不一定。DPO 的成功并不只来自 pair 数据本身，还来自损失函数带有合适的 inductive bias。作者把这类损失称为 HALO：它们不是简单地最大化 token likelihood，而是围绕“相对某个参考点的收益/损失”塑造效用，这与 Kahneman 和 Tversky 的前景理论相似。

前景理论中的 value function 通常写作：

$$
v(z;\lambda,\alpha,z_0)=
\begin{cases}
(z-z_0)^\alpha, & z\ge z_0 \\
-\lambda(z_0-z)^\alpha, & z<z_0
\end{cases}
$$

其中 \(z_0\) 是参考点，\(\alpha\) 控制曲率，\(\lambda\) 控制损失厌恶。KTO 将这个思想迁移到 LLM：输出 \(y\) 的“收益”不是金钱，而是当前模型相对参考模型对该输出增加了多少 log probability。也就是隐式奖励：

$$
r_\theta(x,y)=\log\frac{\pi_\theta(y|x)}{\pi_\text{ref}(y|x)}.
$$

为了避免原始幂函数数值不稳定，KTO 用 sigmoid 作为效用函数的平滑替代，并引入 \(\beta\) 控制饱和速度。默认损失为：

$$
L_\text{KTO}(\pi_\theta,\pi_\text{ref})=
\mathbb{E}_{x,y\sim D}\left[\lambda_y-v(x,y)\right],
$$

其中

$$
\begin{aligned}
r_\theta(x,y)&=\log\frac{\pi_\theta(y|x)}{\pi_\text{ref}(y|x)},\\
z_0&=D_\text{KL}(\pi_\theta(\cdot|x)\|\pi_\text{ref}(\cdot|x)),\\
v(x,y)&=
\begin{cases}
\lambda_D\sigma\left(\beta(r_\theta(x,y)-z_0)\right), & y\sim y_\text{desirable}|x,\\
\lambda_U\sigma\left(\beta(z_0-r_\theta(x,y))\right), & y\sim y_\text{undesirable}|x.
\end{cases}
\end{aligned}
$$

这组公式的直觉很直接：如果一个输出被标记为 desirable，模型应该提高它相对参考模型的隐式奖励，并且这个提升要超过参考点 \(z_0\)；如果输出是 undesirable，模型应该让它的隐式奖励低于参考点。\(z_0\) 的作用类似“人类最近看过的平均质量基准”：不是所有概率提升都值得奖励，只有超过基准的提升才是收益。

```python
# KTO training loop, simplified from the paper's implementation notes
for batch in binary_feedback_loader:
    x, y, label = batch.prompt, batch.output, batch.is_desirable

    logp = policy.logprob(x, y)
    with no_grad():
        ref_logp = ref_policy.logprob(x, y)

    reward = logp - ref_logp

    # Biased but stable KL/reference-point estimate using mismatched outputs.
    y_shift = shift_outputs_within_microbatch(y)
    kl_hat = mean(policy.logprob(x, y_shift) - ref_policy.logprob(x, y_shift))
    z0 = stop_gradient(max(0.0, kl_hat))

    value_good = lambda_D * sigmoid(beta * (reward - z0))
    value_bad = lambda_U * sigmoid(beta * (z0 - reward))

    loss = where(label == "desirable",
                 lambda_D - value_good,
                 lambda_U - value_bad)
    loss = mean(loss)

    loss.backward()
    optimizer.step()
```

KTO 的训练流程与 DPO 最大的不同是数据组织。DPO 必须看到同一个 prompt 下的 \(y_w\) 和 \(y_l\)，因为它优化的是二者的相对偏好概率；KTO 只需要知道一个输出是好还是坏。因此，一份偏好数据可以拆成两条 KTO 样本，真实生产系统中的 thumbs-up/thumbs-down、审核通过/拒绝、用户采纳/丢弃等二元信号也可以直接使用。

> 💡 关键：KTO 并不是把 binary label 当作 +1/-1 reward 直接做分类，而是把 label 放进“相对参考点的效用函数”里。KL 参考点让模型不能用整体抬高所有输出概率的方式投机，必须学到哪些模式真正对应 desirable。

论文还强调 \(\lambda_D\) 与 \(\lambda_U\) 的工程价值。如果正样本远少于负样本，可以提高 desirable 一侧的权重，或者反过来降低 undesirable 一侧的权重，使两类反馈在期望梯度上保持平衡。这就是 KTO 能处理极端数据不均衡的原因之一：它不要求每个好样本都有一个对应坏样本，只要求整体上用权重校准正负反馈的贡献。

与 IPO/DPO 相比，KTO 的参考模型仍然存在，但它服务于隐式奖励和 KL 参考点，而不是 pairwise log-ratio。与 RLHF 相比，KTO 不训练单独的 reward model，也不需要在线 rollout；与 DPO 相比，KTO 放弃 Bradley-Terry preference likelihood，改为优化人类效用形状。这样做的代价是需要选择 \(\beta,\lambda_D,\lambda_U\) 以及 KL 估计方式；但收益是可以使用更便宜、更自然的二元反馈，并能在论文实验中匹配或超过 DPO。

#### 🧪 练习题

```yaml
question: "KTO 相比 DPO 对数据格式的主要放宽是什么？"
options:
  - "KTO 不需要任何参考模型"
  - "KTO 只需要单个输出的 desirable/undesirable 标签，不要求成对偏好"
  - "KTO 只使用无监督预训练语料"
  - "KTO 必须使用人工打分的连续 reward"
answer: 1
explain: "KTO 的损失作用在 (x, y, binary label) 上，通过前景理论式效用区分好坏输出；DPO 则需要 (x, y_w, y_l) 成对偏好。"
```
