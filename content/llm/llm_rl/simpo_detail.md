### SimPO：简单偏好优化 (Simple Preference Optimization)

```yaml
id: simpo
name: SimPO
full_name: 简单偏好优化 (Simple Preference Optimization)
year: '2024.05'
org: Princeton
paper_url: https://arxiv.org/abs/2405.14734
category: preference
parent: dpo
motivation: 长度归一化消除长度偏见
```

#### 📝 一句话总结

SimPO 提出了一种无参考模型的直接偏好优化方法，用序列平均对数概率作为隐式奖励，并用目标奖励间隔增强 winner 和 loser 的区分。它重点解决 DPO 奖励与生成概率不一致、以及 token 累加奖励导致的长度偏见问题。

#### 🎯 核心要点

- **长度归一化奖励**：把 \(\log \pi_\theta(y|x)\) 除以响应长度 \(|y|\)，使用平均 token 对数概率比较长短回答。
- **无参考模型**：移除 DPO 中的 \(\pi_{\mathrm{ref}}\)，训练时不再需要参考模型前向传播，降低显存与计算开销。
- **目标奖励间隔**：在 Bradley-Terry 偏好目标中加入 \(\gamma\)，要求 chosen response 的奖励不仅高于 rejected response，还要高出指定 margin。
- **训练-推理对齐**：SimPO 的奖励形式直接对应推理中常用的平均 log-likelihood，减少 DPO 中“训练奖励排序”和“生成概率排序”不一致的问题。
- **与 DPO 家族的关系**：保留 DPO 的成对偏好监督形式，但把奖励从 log-ratio 改成 reference-free 的长度归一化概率。
- **经验验证范围**：论文在 Mistral、Llama 3、Gemma 2 的 base/instruct 设置上，与 DPO、IPO、KTO、CPO、ORPO 等偏好优化方法比较，并在 AlpacaEval 2、MT-Bench、Arena-Hard 等聊天评测上报告提升。

#### 🔬 深入细节

![SimPO 与 DPO 奖励对比](https://arxiv.org/html/2405.14734v3/x1.png)
*图：论文 Figure 1 展示了 DPO 和 SimPO 的奖励形式差异。DPO 使用相对参考模型的 log-ratio，SimPO 直接使用当前策略的长度归一化平均对数概率。*

```python
# SimPO preference optimization, simplified from the paper objective
for x, y_w, y_l in preference_batches:
    # y_w: preferred/chosen response, y_l: rejected response
    logp_w = policy.log_prob(x, y_w).sum()
    logp_l = policy.log_prob(x, y_l).sum()

    reward_w = beta * logp_w / len(y_w)
    reward_l = beta * logp_l / len(y_l)

    # target reward margin gamma enforces reward_w - reward_l >= gamma
    margin = reward_w - reward_l - gamma
    loss = -log_sigmoid(margin).mean()

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

DPO 的隐式奖励为

$$
r_{\mathrm{DPO}}(x,y)=\beta \log \frac{\pi_\theta(y|x)}{\pi_{\mathrm{ref}}(y|x)}
$$

这个奖励依赖参考模型，并且由整段响应的 token log-probability 累加得到。由于长响应包含更多 token，累加概率和长度会发生耦合，模型可能学到“更长就是更优”的捷径。SimPO 的核心改动是把奖励改成

$$
r_{\mathrm{SimPO}}(x,y)=\frac{\beta}{|y|}\log \pi_\theta(y|x)
$$

这里的 \(|y|\) 是响应长度。直觉上，SimPO 比较的是“平均每个 token 有多符合当前策略”，而不是“整段响应累计得分多高”。这使短而高质量的回答不会因为 token 少而在偏好损失中天然吃亏，也让训练目标更接近推理阶段的长度归一化解码标准。

目标奖励间隔 \(\gamma\) 是第二个关键设计。SimPO 的训练损失写作

$$
\mathcal{L}_{\mathrm{SimPO}}=
-\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}
\left[
\log \sigma\left(
\frac{\beta}{|y_w|}\log\pi_\theta(y_w|x)
-
\frac{\beta}{|y_l|}\log\pi_\theta(y_l|x)
-
\gamma
\right)
\right].
$$

如果没有 \(\gamma\)，模型只需要让 chosen 的奖励略高于 rejected 就能降低损失，偏好边界可能较弱。加入 \(\gamma\) 后，优化目标要求两者拉开一个明确间隔，等价于在 Bradley-Terry 成对比较里加入 margin。这个 margin 不能无限增大，过大时会迫使模型过度拉开奖励分布，可能损害生成质量。

SimPO 与 DPO 的另一处重要差异是训练成本。DPO 每个 batch 通常要计算 policy 和 reference policy 的 log-probability；SimPO 只需要当前 policy，因此更适合大模型后训练。它并不是完全放弃约束，而是用长度归一化和 reward margin 让偏好学习更贴近生成目标，同时保留 SFT 初始化带来的语言能力。

从优化流程看，SimPO 仍然是离线偏好优化：输入是固定的 \((x,y_w,y_l)\) 偏好三元组，不需要在线 rollout、奖励模型训练或 PPO。相对 ORPO、CPO 等同样试图简化 RLHF 的方法，SimPO 的特点是损失形式非常紧凑：一个 reference-free reward 加一个 margin logistic loss，主要复杂度都集中在 \(\beta\) 和 \(\gamma\) 两个超参数的尺度选择上。

> 💡 关键：SimPO 的“简单”不只是少了参考模型，更重要的是奖励和推理时的平均 log-probability 对齐；长度归一化是它消除长度偏见的主要机制。

#### 🧪 练习题

```yaml
question: "SimPO 中把 \\(\\log\\pi_\\theta(y|x)\\) 除以响应长度 \\(|y|\\) 的主要目的是什么？"
options:
  - "把序列累计对数概率变成平均 token 对数概率，减少长度偏见"
  - "让模型必须生成更长的回答"
  - "替代 tokenizer 的分词规则"
  - "把离线偏好优化改成在线 PPO"
answer: 0
explain: "长度归一化让长短响应在同一平均概率尺度上比较，避免仅因 token 数更多而获得系统性奖励优势。"
```
