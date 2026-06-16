### ORPO：比值比偏好优化（Odds Ratio Preference Optimization）

```yaml
id: orpo
full_name: "比值比偏好优化 (ORPO)"
year: "2024"
paper_url: "https://arxiv.org/abs/2403.07691"
motivation: "单阶段对齐，无需参考模型"
parent: "dpo"
category: "direct_preference"
```

#### 📝 一句话总结

ORPO 将 SFT 的负对数似然损失与 odds ratio 偏好惩罚合并到一个单阶段目标中，在不使用冻结参考模型和额外 DPO/RLHF 阶段的情况下同时完成指令适配与偏好对齐。

#### 🎯 核心要点

- 提出 reference-free、monolithic 的偏好优化流程：一个训练阶段内同时做 SFT 和偏好对齐。
- 观察到普通 SFT 只提升 chosen response 的概率并不够，rejected response 的概率也可能随领域适配一起升高。
- 使用 odds \(P/(1-P)\) 而非单纯概率比来衡量 chosen 相对 rejected 的可生成性优势。
- 总损失为 \(\mathcal{L}_\text{SFT}+\lambda\mathcal{L}_\text{OR}\)，其中 \(\mathcal{L}_\text{OR}\) 用 log-sigmoid 最大化 chosen/rejected odds ratio。
- 不需要 DPO 中的 \(\pi_\text{ref}\)，因此训练时少一个冻结模型，也减少每个 batch 的 forward 计算和显存占用。
- 在 HH-RLHF、Binarized UltraFeedback、AlpacaEval、MT-Bench 等实验中验证了 125M 到 7B 规模模型上的有效性。

#### 🔬 深入细节

![ORPO 与 RLHF/DPO/SFT 流程对比](https://ar5iv.labs.arxiv.org/html/2403.07691/assets/x2.png)
*图：ORPO 将偏好惩罚直接附加到 SFT 目标中，不再需要先 SFT 再执行 DPO/RLHF，也不需要保留单独的参考模型。*

ORPO 的动机来自一个很实际的现象：SFT 在 chosen responses 上训练时，会把模型推向目标对话/指令域，但这种领域适配也可能提升 rejected responses 的概率。也就是说，模型学会了“像这个数据集一样说话”，却未必学会了“避开坏回答风格”。传统 DPO 通常在 SFT 后再做一轮偏好优化，并依赖冻结的 SFT 模型作为参考；ORPO 试图把这两步合并。

首先定义序列级平均 log-likelihood：

$$
\log P_\theta(y|x)=\frac{1}{m}\sum_{t=1}^{m}\log P_\theta(y_t|x,y_{<t}).
$$

ORPO 不直接比较 \(P_\theta(y_w|x)\) 和 \(P_\theta(y_l|x)\)，而是比较 odds：

$$
\mathbf{odds}_\theta(y|x)=\frac{P_\theta(y|x)}{1-P_\theta(y|x)}.
$$

chosen over rejected 的 odds ratio 为：

$$
\mathbf{OR}_\theta(y_w,y_l)=
\frac{\mathbf{odds}_\theta(y_w|x)}{\mathbf{odds}_\theta(y_l|x)}.
$$

ORPO 的总目标由两部分组成：

$$
\mathcal{L}_\text{ORPO}=\mathbb{E}_{(x,y_w,y_l)}
\left[\mathcal{L}_\text{SFT}+\lambda\mathcal{L}_\text{OR}\right],
$$

其中 \(\mathcal{L}_\text{SFT}\) 是对 chosen response 的常规 causal LM NLL，\(\mathcal{L}_\text{OR}\) 是偏好项：

$$
\mathcal{L}_\text{OR}=-\log\sigma\left(
\log\frac{\mathbf{odds}_\theta(y_w|x)}{\mathbf{odds}_\theta(y_l|x)}
\right).
$$

这个形式可以理解为：如果 chosen 的 odds 已经明显大于 rejected，log-sigmoid 损失接近 0；如果 rejected 的 odds 不低，损失会变大，迫使模型降低 rejected 或提高 chosen。与 DPO 的最大区别是公式里没有 \(\pi_\text{ref}\)。ORPO 不需要衡量“当前策略相对参考策略变化多少”，而是在当前模型自身的 SFT 过程中直接塑造 chosen/rejected 的 odds 对比。

```python
# ORPO single-stage objective
for batch in preference_loader:
    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected

    logp_w = model.avg_logprob(x, y_w)
    logp_l = model.avg_logprob(x, y_l)

    p_w = exp(logp_w)
    p_l = exp(logp_l)
    odds_w = p_w / (1.0 - p_w + eps)
    odds_l = p_l / (1.0 - p_l + eps)

    sft_loss = -mean(logp_w)
    odds_ratio_logit = log(odds_w + eps) - log(odds_l + eps)
    or_loss = -mean(logsigmoid(odds_ratio_logit))

    loss = sft_loss + lambda_or * or_loss
    loss.backward()
    optimizer.step()
```

论文还通过梯度解释 odds ratio 为什么适合放进 SFT。偏好项的梯度可写为两个因子的乘积：

$$
\nabla_\theta\mathcal{L}_\text{OR}=\delta(d)\cdot h(d),
$$

其中

$$
\delta(d)=\left[1+\frac{\mathbf{odds}_\theta(y_w|x)}{\mathbf{odds}_\theta(y_l|x)}\right]^{-1},
$$

$$
h(d)=\frac{\nabla_\theta\log P_\theta(y_w|x)}{1-P_\theta(y_w|x)}-
\frac{\nabla_\theta\log P_\theta(y_l|x)}{1-P_\theta(y_l|x)}.
$$

当 chosen odds 已经高于 rejected odds 时，\(\delta(d)\) 变小，偏好项自动减弱；当模型仍然更容易生成 rejected response 时，\(\delta(d)\) 较大，更新会更强。\(h(d)\) 则把 chosen 和 rejected 的梯度做对比，分母 \(1-P\) 会在相应概率较高时改变梯度尺度，使模型在适配 chosen 风格的同时抑制 rejected 风格。

> 💡 关键：ORPO 不是“只在 SFT 上加一个负样本交叉熵”。它用 odds ratio 建模 chosen 与 rejected 的相对可生成性，因此偏好信号始终是成对、动态的，而不是预先定义一个固定的禁用 token 集合。

为什么不用简单 probability ratio？论文认为，在 SFT 与偏好对齐合并时，模型还处于领域适配阶段，过强地压低 rejected 可能导致退化。odds ratio 对 \(P\) 接近 0 或 1 的区域更敏感，配合 log-sigmoid 后能提供更合适的区分尺度：既让 chosen 相对 rejected 获得优势，又避免像单独的概率比目标那样需要通过过度压制 rejected 来制造 margin。

从系统角度看，ORPO 的优势很直接。DPO 通常需要当前模型和参考模型都对 \(y_w,y_l\) 做 forward；RLHF 还要奖励模型与 PPO rollout。ORPO 只有一个正在训练的模型，对 chosen/rejected 各算一次 likelihood 即可。论文因此称其为 monolithic preference optimization：同一个目标同时承担领域适配、偏好区分和拒绝风格惩罚。

ORPO 的局限也来自这个设计。由于没有参考模型，\(\lambda\) 控制的偏好项强度非常关键：太小会退化成普通 SFT，太大则可能牺牲语言建模和多样性。它适合已有明确 chosen/rejected pair 的训练集，并且特别适合希望降低显存、减少训练阶段、快速做指令模型对齐的场景。

#### 🧪 练习题

```yaml
question: "ORPO 相比 DPO 的核心工程简化是什么？"
options:
  - "ORPO 删除了 chosen response，只训练 rejected response"
  - "ORPO 不需要冻结参考模型，而是在 SFT 损失中直接加入 odds ratio 偏好项"
  - "ORPO 必须先训练 reward model，再做 PPO"
  - "ORPO 只适用于无标签预训练数据"
answer: 1
explain: "ORPO 的目标是 L_SFT + λL_OR，偏好项只依赖当前模型对 chosen/rejected 的 odds ratio，不需要 DPO 中的参考模型。"
```
