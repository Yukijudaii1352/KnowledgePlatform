### 多模态DPO (MM-DPO)

```yaml
id: mm_dpo
full_name: "多模态DPO (MM-DPO)"
year: "2026"
paper_url: "https://mm-rlhf.github.io/"
motivation: "动态奖励缩放多模态对齐"
parent: "dpo"
category: "token_multimodal"
```

#### 📝 一句话总结

MM-DPO 将高质量多模态 reward model 的 reward margin 注入 DPO，把每个偏好对的更新强度动态缩放，从而让清晰、高置信的人类偏好样本对 MLLM 对齐产生更大影响，并降低低置信或噪声 pair 的训练干扰。

#### 🎯 核心要点

- MM-DPO 是 MM-RLHF 项目中的多模态对齐算法，建立在 120K 级人工标注多模态偏好比较数据和 critique-based reward model 之上。
- 相比传统 DPO 对所有 preference pairs 使用固定 \(\beta\)，MM-DPO 根据 reward margin \(\delta=r(y_w)-r(y_l)\) 动态调整更新强度。
- 对同一 query 的多个 ranked responses，MM-DPO 不只训练 hardest pair，而是枚举所有 rank 不同的有效比较对，保留更完整的排序信息。
- Dynamic Reward Scaling 使用有界函数把 reward margin 映射到 \([\beta_{ori},(1+w)\beta_{ori}]\)，避免高 margin 样本造成过激更新。
- 训练依赖 MM-RLHF-Reward-7B 提供可靠 reward signal；论文指出公开模型在该数据上的打分质量不足，直接用弱 reward 会影响动态缩放稳定性。
- 实验覆盖 10 个评估维度和 27 个 benchmark，项目页还提供 MM-RLHF-RewardBench 与 MM-RLHF-SafeBench 来评估 reward model 和安全对齐。

#### 🔬 深入细节

![MM-DPO 动态奖励缩放框架](https://mm-rlhf.github.io/static/images/mm_dpo.png)
*图：MM-DPO framework。Reward model 对 preferred/rejected response 打分，reward margin 控制 DPO 中的动态缩放项，使高置信 pair 获得更大更新强度。*

MM-DPO 的背景是多模态 LLM 对齐数据与 reward signal 的质量差异很大。同一个图像或视频 query 往往有多个模型回答，人工标注会给出排序、打分和原因。如果只取最难的 pair，很多有用的 ranking 信息会被丢弃；如果像传统 DPO 一样把所有 pair 等权处理，rank 差距很小、reward margin 很低的样本会和 rank 差距很大的高置信样本产生同样更新强度，训练效率和鲁棒性都会受影响。

MM-RLHF 项目先构造了大规模多模态偏好数据：从千万级多模态 instruction 来源中聚类、去重、采样，再用 GPT-4o、Qwen2-VL-72B 等强模型生成候选回答，最后由人工进行分数、排序和文本解释标注。为了让 reward signal 更可解释，论文训练了 critique-based reward model：模型先生成对回答的 critique，再基于 critique 给分。这一点很重要，因为 MM-DPO 的动态缩放直接依赖 reward margin；如果 reward model 自身排序不可靠，动态 \(\beta\) 会放大错误信号。

传统 DPO 的 pairwise loss 可以写作：

$$
\ell_{\mathrm{DPO}}(\theta)=
-\log\sigma\left(
\beta\left[
\log\frac{\pi_\theta(y_w\mid x)}{\pi_{ref}(y_w\mid x)}
-
\log\frac{\pi_\theta(y_l\mid x)}{\pi_{ref}(y_l\mid x)}
\right]
\right)
$$

其中 \(y_w\) 是 preferred response，\(y_l\) 是 rejected response，\(\beta\) 控制偏好 margin 的更新强度。传统 DPO 使用全局固定 \(\beta\)，默认所有 pair 的偏好确定性相同。MM-DPO 将 reward model 分数引入这个位置，先计算：

$$
\delta=r(y_w)-r(y_l)
$$

再用有界动态缩放函数：

$$
\beta(\delta)=\beta_{ori}\left(1+w(1-e^{-k\delta})\right)
$$

其中 \(k\) 控制 reward margin 到 scaling factor 的敏感度，\(w\) 控制动态修正强度。由于 \(1-e^{-k\delta}\in[0,1]\)，\(\beta(\delta)\) 被限制在 \([\beta_{ori},(1+w)\beta_{ori}]\)。直觉上，\(\delta\) 越大，reward model 越确信 \(y_w\) 明显优于 \(y_l\)，DPO 更新就应该更强；\(\delta\) 很小时，pair 可能只是细微差异或存在标注/模型不确定性，更新强度就接近默认值。

```python
# MM-DPO 动态奖励缩放伪代码
policy = init_from(sft_model)
reference = freeze_copy(sft_model)
reward_model = load_mm_rlhf_reward_7b()

for batch in mm_rlhf_queries:
    pairs = []
    for x, ranked_responses in batch:
        for y_w, y_l in all_pairs_with_different_rank(ranked_responses):
            score_w = reward_model.score(x, y_w)
            score_l = reward_model.score(x, y_l)
            delta = score_w - score_l
            beta_delta = beta_ori * (1 + w * (1 - exp(-k * delta)))
            beta_delta = clip(beta_delta, beta_ori, (1 + w) * beta_ori)
            pairs.append((x, y_w, y_l, beta_delta))

    loss = 0
    for x, y_w, y_l, beta_delta in pairs:
        margin = logprob(policy, y_w, x) - logprob(reference, y_w, x)
        margin -= logprob(policy, y_l, x) - logprob(reference, y_l, x)
        loss += -logsigmoid(beta_delta * margin)

    loss += lambda_sft * supervised_loss(policy, batch)
    update(policy, loss)
```

> 💡 关键：MM-DPO 不是替换 DPO 的 pairwise logistic 形式，而是替换固定 \(\beta\) 的假设。它把“这个偏好对有多可信、多值得学习”编码进 \(\beta(\delta)\)，让 reward margin 成为样本级训练强度。

与普通文本 DPO 相比，多模态场景的难点在于 response 质量维度更多，包括视觉感知、OCR、图表理解、视频理解、事实性、帮助性和安全性等。一个 response 可能在文本流畅性上很好，却在图像证据上犯错；另一个 response 可能短但更忠实。MM-RLHF 的 critique-based reward model 试图把这些细粒度评价转化为可用于训练的标量分数，并通过解释提升 reward 的可学习性。MM-DPO 则把这些分数差用于调节优化强度，而不是简单丢给 DPO 等权训练。

枚举所有有效比较对是 MM-DPO 的另一个关键点。假设一个 query 有四个回答，人工排序为 \(1>2>3>4\)，传统做法可能只选 \((1,4)\) 或若干 hardest pairs。MM-DPO 会把所有 rank 不同的组合都作为偏好 pair，这能让模型学习更完整的排序结构。不过，这也会引入大量小 margin pair，例如 \((2,3)\) 或 \((3,4)\)。动态奖励缩放正是为了解决这个副作用：大 margin pair 强更新，小 margin pair 弱更新，所有 pair 都能参与训练但不会等权噪声化。

论文附录还说明了实现稳定性：MM-DPO 训练中加入 SFT loss 作为常见稳定项，通过网格搜索选择 SFT loss 权重和学习率；视觉编码器保持冻结以稳定且高效训练；初始 \(\beta_{ori}\) 设置为较小默认值 0.1，因为训练中会动态调整。超参数 \(k\) 和 \(w\) 分别控制 reward margin 映射速度和动态修正幅度，默认 \(w=0.5,k=0.5\) 表现较好。这样做的目标是避免 outlier reward margin 导致 \(\beta\) 过大，从而维持训练稳定。

从结果解释看，MM-DPO 的贡献不只是“多模态版 DPO”。如果只把 MM-RLHF 数据配合传统 DPO 使用，模型已经能获得一定提升；如果再用隐式 reward 或不可靠动态策略，提升可能不稳定。MM-DPO 的有效性来自三者组合：高质量人工偏好数据提供比较对，critique-based reward model 提供可信 margin，bounded dynamic scaling 把 margin 转换成稳定的样本级学习率。项目页展示了对 conversation、hallucination、general、chart、OCR、math、multi-image、video、real-world 和 safety 等维度的广泛提升，并强调安全相关 unsafe behavior 明显下降。

#### 🧪 练习题

```yaml
question: "MM-DPO 中 Dynamic Reward Scaling 的核心目的是什么？"
options:
  - "根据 reward margin 调整每个偏好对的 DPO 更新强度，让高置信 pair 影响更大"
  - "用 reward model 直接替代语言模型生成最终答案"
  - "只保留 hardest pair，删除所有低 margin pair"
  - "把视觉编码器也纳入强化学习在线 rollout"
answer: 0
explain: "MM-DPO 先用 reward model 计算 preferred 与 rejected 的分数差，再把该 margin 映射成有界的动态 beta，用于调节 DPO loss。"
```
