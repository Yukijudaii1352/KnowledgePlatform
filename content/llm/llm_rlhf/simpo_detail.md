### SimPO：简单偏好优化 (SimPO)

```yaml
id: simpo
full_name: 简单偏好优化 (SimPO)
year: 2024
paper_url: https://arxiv.org/abs/2405.14734
motivation: 长度归一化奖励，去参考模型
parent: dpo
category: direct_preference
```

#### 📝 一句话总结
SimPO 提出一种无需参考模型的直接偏好优化方法，用序列平均 log probability 作为隐式奖励，并在 Bradley-Terry 目标中加入目标奖励间隔，解决 DPO 奖励与生成时似然指标不一致、训练成本较高的问题。

#### 🎯 核心要点
- 参考模型移除：训练目标只依赖当前策略模型 `πθ`，不再需要同时加载 `πref`。
- 长度归一化奖励：用 response token 的平均 log probability 作为隐式奖励，缓解长回答天然累积更大 log probability 差异的问题。
- 目标奖励间隔：在偏好概率中加入 margin `γ`，要求 winning response 比 losing response 至少高出固定间隔。
- 与生成目标对齐：训练时优化的平均 token log likelihood 更接近推理时 greedy、beam search 或采样近似追求的生成准则。
- 经验基准覆盖 AlpacaEval 2、MT-Bench、Arena-Hard，并在 Mistral、Llama 3、Gemma 2 等 base 与 instruct 设置上比较 DPO、IPO、KTO、ORPO 等方法。

#### 🔬 深入细节
![SimPO 与 DPO 奖励形式对比](https://arxiv.org/html/2405.14734v3/x1.png)
*图：论文 Figure 1 展示 SimPO 与 DPO 的核心差异在奖励形式：DPO 使用相对参考模型的 log-ratio，SimPO 直接使用当前策略的长度归一化平均 log probability，并展示其在 AlpacaEval 2 与 Arena-Hard 上相对 DPO 的优势。*

```python
# SimPO 核心训练逻辑，省略 tokenizer/padding/optimizer 细节
for batch in preference_loader:
    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected

    # 只前向当前策略模型，不再前向 reference model
    logp_w_tokens = policy.log_probs(x, y_w)      # shape: [B, len_w]
    logp_l_tokens = policy.log_probs(x, y_l)      # shape: [B, len_l]

    # 长度归一化隐式奖励：平均 token log probability
    reward_w = beta * logp_w_tokens.sum(dim=-1) / len(y_w)
    reward_l = beta * logp_l_tokens.sum(dim=-1) / len(y_l)

    # Bradley-Terry 偏好目标 + 目标奖励间隔 gamma
    logits = reward_w - reward_l - gamma
    loss = -log_sigmoid(logits).mean()

    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
```

DPO 的出发点是把 RLHF 中“先学 reward model，再做 KL 正则化 RL”的流程改写成一个直接分类式目标。它的隐式奖励通常写作：

$$
r_{\mathrm{DPO}}(x,y)=\beta\log\frac{\pi_\theta(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}+\beta\log Z(x)
$$

其中 `πref` 通常是 SFT 模型。这个形式的好处是稳定，但 SimPO 论文指出它有两个直接代价：训练时必须加载参考模型，显存和计算几乎增加一份；更重要的是，DPO 奖励衡量的是“相对参考模型提高了多少”，而推理时模型实际用来生成的是当前策略自己的 token likelihood。也就是说，DPO 可能把某个回答判为高奖励，只是因为它比参考模型更偏向该回答，并不代表当前模型在生成时真的更倾向产生它。

SimPO 的核心改动是把隐式奖励改成当前策略的平均 log probability：

$$
r_{\mathrm{SimPO}}(x,y)=\frac{\beta}{|y|}\sum_{t=1}^{|y|}\log \pi_\theta(y_t\mid x,y_{<t})
$$

这里的 `|y|` 是 response token 数。这个长度归一化不是装饰项，而是 SimPO 与普通序列 log probability 的关键区别：如果直接用整段 log probability，长回答会因为累加更多负 log probability 而被系统性压低；如果完全不考虑长度，又容易鼓励模型通过变长输出钻评测指标空子。平均 log probability 更接近解码时按 token 做局部选择的机制，因此论文称它更 aligned with generation likelihood。

在偏好学习层面，SimPO 仍然保留 Bradley-Terry 形式，但加入目标奖励间隔 `γ`：

$$
\mathcal{L}_{\mathrm{SimPO}}=-\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}
\left[\log\sigma\left(
\frac{\beta}{|y_w|}\log\pi_\theta(y_w\mid x)
-\frac{\beta}{|y_l|}\log\pi_\theta(y_l\mid x)
-\gamma
\right)\right]
$$

直觉上，普通 BT 目标只要求 `y_w` 的奖励大于 `y_l`；加入 `γ` 后，模型必须把 winning response 推到“明显更好”的区域，才会得到低损失。这相当于把偏好对从二分类边界附近推开，减少模型只学到微弱排序差异的情况。`β` 控制 log probability 差异的尺度，`γ` 控制 winning 与 losing 的最小分离度，两者共同决定训练信号强弱。

SimPO 与 ORPO、IPO、KTO 等参考模型较弱或无参考模型方法的区别在于，它不是额外设计一个 odds ratio 或替代偏好统计量，而是直接把“模型生成时自己最大化什么”拿来作为奖励。这样实现上非常轻量：一次 policy forward 就能得到 chosen/rejected 的 token log probability；没有 reference forward，也没有 reward model rollout。论文在 v3 中还讨论了必要时加入 SFT regularization 来防止灾难性遗忘，但主算法本身不依赖 KL reference 约束。

> 💡 关键：SimPO 的“简单”不是少写一个模型而已，而是把奖励定义从“相对参考模型的偏离”换成“当前模型对答案本身的平均生成倾向”。这个改动同时影响优化目标、显存成本、长度偏置和训练-推理一致性。

#### 🧪 练习题
```yaml
question: "SimPO 相比 DPO 最核心的奖励设计变化是什么？"
options:
  - "把奖励模型替换为更大的奖励模型"
  - "用当前策略的长度归一化平均 log probability 作为隐式奖励"
  - "把 Bradley-Terry 目标替换为交叉熵监督微调"
  - "只优化 winning response，完全忽略 rejected response"
answer: 1
explain: "SimPO 的核心是 reference-free reward：用当前策略对整段回答的平均 token log probability 表示奖励，并通过 margin 拉开 chosen 与 rejected。"
```
