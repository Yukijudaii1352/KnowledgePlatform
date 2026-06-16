### TDPO：Token级直接偏好优化 (TDPO)

```yaml
id: tdpo
full_name: Token级直接偏好优化 (TDPO)
year: 2024
paper_url: https://proceedings.mlr.press/v235/zeng24b.html
motivation: Token级前向KL约束保持多样性
parent: dpo
category: token_multimodal
```

#### 📝 一句话总结
TDPO 将 DPO 的整段回答级偏好优化改写为 token 级序列决策问题，在每个生成状态上引入 forward KL 约束，从而更细粒度地平衡偏好对齐与生成多样性。

#### 🎯 核心要点
- Token 级建模：把 response 生成视为自回归 MDP，每个 prefix state 下选择下一个 token action。
- Sequential KL 诊断：论文观察到 DPO 对 preferred 与 dispreferred responses 的 KL 增长不均衡，尤其 dispreferred 子集 KL 漂移更快。
- Forward KL 约束：在 token 分布层面约束 `D_KL(πref || πθ)`，缓解 reverse KL 的 mode-seeking 与多样性下降。
- Bradley-Terry token 化：通过 advantage/regret 形式把句级 BT 偏好概率连接到 token 级奖励差。
- 两个实用版本：`TDPO_1` 直接加入 token-level KL 差异项，`TDPO_2` 用系数 `α` 与 stop-gradient 改善梯度稳定性。
- 实验覆盖 IMDb 控制情感生成、Anthropic-HH 单轮对话、MT-Bench，并与 DPO、PPO-style RLHF 等基线比较。

#### 🔬 深入细节
> ⚠️ 元信息说明：任务 JSON 中的 `paper_url` 指向 PMLR `zeng24b`，该页实际是 tnGPS；TDPO 的官方 PMLR 条目为 `https://proceedings.mlr.press/v235/zeng24c.html`，arXiv 版本为 `https://arxiv.org/abs/2404.11999`。以下精读按 TDPO 官方论文正文整理，同时保留上方 YAML 与任务元信息一致。

![TDPO 损失函数对比](https://arxiv.org/html/2404.11999v2/x4.png)
*图：论文 Figure 2 对比 DPO、TDPO_1 与 TDPO_2 的损失结构。TDPO 在 DPO 的 log-ratio 偏好项之外，加入 preferred/dispreferred response 的 token 级 sequential KL 差异控制项。*

```python
# TDPO 训练伪代码，概括论文 Algorithm 1 与 Appendix B 实现
for batch in preference_loader:
    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected

    # policy 与 reference 都在 token 级输出词表分布
    pi_logits_w, pi_logits_l = policy(x, y_w), policy(x, y_l)
    ref_logits_w, ref_logits_l = reference(x, y_w), reference(x, y_l)

    # token log-ratio reward: log πθ(token|prefix) - log πref(token|prefix)
    delta_w = gather_logp(pi_logits_w, y_w) - gather_logp(ref_logits_w, y_w)
    delta_l = gather_logp(pi_logits_l, y_l) - gather_logp(ref_logits_l, y_l)

    # sequential forward KL: sum_t KL(πref(.|s_t) || πθ(.|s_t))
    seqkl_w = forward_kl(ref_logits_w, pi_logits_w).sum(dim=-1)
    seqkl_l = forward_kl(ref_logits_l, pi_logits_l).sum(dim=-1)

    if method == "TDPO_1":
        value = delta_w.sum(dim=-1) - delta_l.sum(dim=-1) - (seqkl_l - seqkl_w)
    else:  # TDPO_2
        value = delta_w.sum(dim=-1) - delta_l.sum(dim=-1) - alpha * (seqkl_l - stop_grad(seqkl_w))

    loss = -log_sigmoid(beta * value).mean()
    optimizer.step(loss)
```

DPO 把一个完整回答 `y` 当作 bandit arm，对偏好对 `(x, y_w, y_l)` 直接比较整段 log probability ratio。TDPO 的问题意识是：LLM 并不是一次性吐出整段回答，而是在状态 `s_t=(x,y_{<t})` 下逐 token 采样。因此，只在 response 级别控制 KL 会掩盖 token 轨迹中的漂移。论文 Figure 1 先做了一个诊断：DPO 训练过程中 preferred 与 dispreferred response 的 sequential KL 增长不同步，dispreferred 子集往往偏离 reference 更快，这意味着 DPO 虽然在总体偏好上变好，却可能以牺牲局部 token 分布稳定性和多样性为代价。

TDPO 先定义 token 级 log-ratio 奖励：

$$
\delta_t(y)=\log \pi_\theta(y_t\mid x,y_{<t})-\log \pi_{\mathrm{ref}}(y_t\mid x,y_{<t})
$$

这仍然继承了 DPO 的“当前策略相对参考策略”思想，但粒度从整段回答拆到每个 token。然后定义 sequential forward KL：

$$
\mathrm{SeqKL}(y)=\sum_{t=1}^{|y|}D_{\mathrm{KL}}\left(\pi_{\mathrm{ref}}(\cdot\mid x,y_{<t})\,\Vert\,\pi_\theta(\cdot\mid x,y_{<t})\right)
$$

forward KL 的方向很关键。DPO/RLHF 中常见的 reverse KL 更偏 mode-seeking，容易让模型集中到少数高奖励模式；forward KL 更强调覆盖 reference 分布中有概率的 token，因此对保持语言多样性更友好。TDPO 并不是简单把 KL 加到整段 loss，而是比较 preferred 与 dispreferred 两条轨迹上的 KL 差异，让优化知道哪条轨迹偏离得更多。

`TDPO_1` 可以写成如下形式：

$$
\mathcal{L}_{\mathrm{TDPO_1}}=-\mathbb{E}\left[\log\sigma\left(\beta\left(
\sum_t\delta_t(y_w)-\sum_t\delta_t(y_l)-\left(\mathrm{SeqKL}(y_l)-\mathrm{SeqKL}(y_w)\right)
\right)\right)\right]
$$

这个式子比 DPO 多了 `SeqKL(y_l)-SeqKL(y_w)`。如果 rejected response 的 KL 漂移过大，损失会惩罚这种“通过把坏回答推得很远来获得偏好差”的行为；如果 chosen response 需要适度偏离 reference 才能更好，则该项不会一刀切地禁止偏离。换句话说，TDPO 追求的不是让所有 token 都贴近 reference，而是让偏好改进与 KL 使用效率匹配。

`TDPO_2` 进一步引入系数 `α` 和 stop-gradient：

$$
\mathcal{L}_{\mathrm{TDPO_2}}=-\mathbb{E}\left[\log\sigma\left(\beta\left(
\sum_t\delta_t(y_w)-\sum_t\delta_t(y_l)-\alpha\left(\mathrm{SeqKL}(y_l)-\mathrm{sg}(\mathrm{SeqKL}(y_w))\right)
\right)\right)\right]
$$

这里 `sg` 表示 stop-gradient。直觉上，preferred response 的 KL 项可以作为比较基准，但不让其梯度直接牵引模型；训练主要通过 rejected response 的 KL 约束来抑制不必要漂移。`α` 则提供一个连续旋钮：较大时更保守、更多样，较小时更接近 DPO 的偏好拉开方式。论文实验表明 TDPO 能在 reward/KL frontier 上取得比 DPO 更好的折中。

> 💡 关键：TDPO 的创新不只是“按 token 求和”，而是把偏好优化中的奖励差、BT 概率和 KL 正则都放回自回归 token 轨迹里，让模型知道每个 prefix state 下的分布偏移是否值得。

#### 🧪 练习题
```yaml
question: "TDPO 为什么要引入 token 级 forward KL？"
options:
  - "为了完全移除 reference model"
  - "为了只训练回答的最后一个 token"
  - "为了在每个生成前缀上约束策略偏移，改善偏好对齐与多样性的折中"
  - "为了把偏好数据改成多标签分类数据"
answer: 2
explain: "TDPO 认为整段级 KL 难以控制自回归生成轨迹中的局部漂移，因此用 token 级 forward KL 约束每个 prefix 下的分布变化。"
```
