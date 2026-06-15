### tdpo: Token级直接偏好优化 (TDPO)

```yaml
id: tdpo
full_name: Token级直接偏好优化 (TDPO)
year: "2024"
paper_url: https://proceedings.mlr.press/v235/zeng24b.html
motivation: Token级前向KL约束保持多样性
parent: dpo
category: token_multimodal
```

#### 📝 一句话总结

TDPO 将 DPO 的句子级偏好优化细化到 token 级 MDP 视角，用 token 级前向 KL 约束保持生成多样性并缓解 DPO 的过度集中。

#### 🎯 核心要点

- **来源说明**：manifest 中的 PMLR 链接指向相邻论文页；可读 TDPO 来源为 arXiv:2404.11999 和 PMLR v235/zeng24c。
- **token 级视角**：把生成过程视为逐 token 决策，而不是只在完整回答上比较总分。
- **前向 KL**：显式关注 $\mathrm{KL}(\pi_{ref}\|\pi_\theta)$，避免模型丢失参考分布中仍有价值的多样回答。
- **DPO 兼容**：仍使用偏好对训练，不需要单独奖励模型或在线 PPO。
- **目标效果**：在提高偏好胜率的同时，降低输出多样性坍缩风险。

#### 🔬 深入细节

##### 示意图/图源

![TDPO token-level KL analysis](https://ar5iv.labs.arxiv.org/html/2404.11999/assets/x1.png)

图源：TDPO 论文 HTML 图 1 的一个面板；完整公开来源见 https://arxiv.org/abs/2404.11999 和 https://proceedings.mlr.press/v235/zeng24c.html。

##### 算法/流程伪代码

```python
pi_ref = frozen_reference_model
pi_theta = copy(pi_ref)

for x, y_win, y_lose in preference_dataset:
    chosen_terms = []
    rejected_terms = []

    for t in tokens(y_win):
        prefix = y_win[:t]
        log_ratio = logp(pi_theta, y_win[t], x, prefix) - logp(pi_ref, y_win[t], x, prefix)
        fwd_kl = kl(pi_ref.next_token_dist(x, prefix), pi_theta.next_token_dist(x, prefix))
        chosen_terms.append(log_ratio - alpha * fwd_kl)

    for t in tokens(y_lose):
        prefix = y_lose[:t]
        log_ratio = logp(pi_theta, y_lose[t], x, prefix) - logp(pi_ref, y_lose[t], x, prefix)
        fwd_kl = kl(pi_ref.next_token_dist(x, prefix), pi_theta.next_token_dist(x, prefix))
        rejected_terms.append(log_ratio - alpha * fwd_kl)

    margin = beta * (sum(chosen_terms) - sum(rejected_terms))
    loss = -log_sigmoid(margin)
    update(pi_theta, loss)
```

##### 方法解读

**1. TDPO 认为句子级 KL 过粗。** DPO 在完整回答层面计算 log-ratio 差，无法直接约束每个生成前缀下的 next-token 分布。若某些 token 位置被过度推向单一高偏好模式，模型可能在局部丢失多样性。

**2. token 级 MDP 更贴近自回归生成。** LLM 生成天然是状态 $s_t=(x,y_{<t})$、动作 $a_t=y_t$ 的序列决策。TDPO 将偏好优化拆到这些状态动作上，使每个 token 的策略变化都能被衡量和约束。

**3. 前向 KL 针对 mode covering。** 反向 KL 更偏向 mode seeking，容易集中到少数高概率模式；前向 KL 更强调覆盖参考分布支持集。TDPO 在 token 级引入前向 KL，目的是让模型在偏好优化后仍保留合理备选表达。

**4. 与 DPO 的关系是细化而非推翻。** TDPO 仍然从偏好对出发，保留直接优化的工程优点。它改变的是正则粒度：从完整序列层面的隐式约束，变成每个前缀状态下的分布约束，因此更适合分析和控制生成多样性。

#### 🧪 练习题

```yaml
question: TDPO 相比 DPO 主要把什么从句子级细化到了 token 级？
options:
  - A. KL 约束和偏好优化中的策略变化分析
  - B. tokenizer 的词表构造
  - C. 人工标注员的身份信息
  - D. 基础模型的预训练语料清洗
answer: A
explain: TDPO 将自回归生成看作逐 token 决策过程，并在 token 级施加前向 KL 约束。
```

